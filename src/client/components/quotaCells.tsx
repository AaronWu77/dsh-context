/**
 * The account and quota grid shared by the sidebar's always-visible widget and
 * the dashboard's detail panel: the platform balance, the tokens recorded for
 * one day, and the rolling Codex windows of EVERY signed-in account the
 * `codexQuota` service reports (active account first). A cell whose figure is
 * absent renders nothing rather than a placeholder, so a signed-out or
 * key-less deployment shows a shorter grid.
 *
 * Every cell is a drill-down: clicking it opens a detail block under the grid
 * with that cell's breakdown (balance split, the day's session count, a
 * window's length, exact reset instant and last refresh). The today cell also
 * offers to pin the day in the session list wherever the caller owns one.
 */
import { useEffect, useState, useSyncExternalStore, type ReactElement } from 'react'
import { balanceEntryOf, fetchPlatformBalance } from '../balance'
import type { CostCurrency } from '../cost'
import { fmt } from '../format'
import type { DayTotals } from '../overview'
import type { PlatformBalance } from '../../shared/types'
import type { ClientCtx } from '../services'
import type { ViewKit } from '../viewkit'

/** One rolling Codex quota window as the codexQuota service publishes it. */
export interface CodexQuotaWindow {
  bucketId: string
  bucketName?: string
  remainingPercent: number
  windowSeconds: number
  resetAt?: number
}

/** Prepaid credits as that service reports them. */
export interface CodexQuotaCredits {
  unlimited: boolean
  balance?: string
}

/**
 * One signed-in account's quota, as the service publishes it alongside the
 * legacy active-account fields. Older service versions omit `accounts`, and
 * the grid then falls back to the single active account.
 */
export interface CodexQuotaAccount {
  accountKey: string
  label: string
  active: boolean
  windows: readonly CodexQuotaWindow[]
  credits?: CodexQuotaCredits
  fetchedAt?: number
  unavailable?: boolean
}

/** The quota snapshot that service exposes. */
export interface CodexQuota {
  windows: readonly CodexQuotaWindow[]
  credits?: CodexQuotaCredits
  /** Every signed-in account, active first; absent on older service versions. */
  accounts?: readonly CodexQuotaAccount[]
  /** Unix ms of the newest successful read across accounts. */
  fetchedAt?: number
}

/** The optional cross-plugin service (absent when that plugin is not mounted). */
export interface CodexQuotaService {
  snapshot(): CodexQuota | null
  subscribe(listener: () => void): () => void
}

/** Props both occupants render from. */
export interface QuotaGridProps {
  /** Merged daily ledger (day key -> figures) backing the today cell. */
  days: Record<string, DayTotals>
  /** Today's key from the caller's calendar. */
  today: string
  /** Compact type scale for the sidebar widget. */
  compact?: boolean
  /** Preferred platform currency ('cny' default; the panel follows its locale). */
  currency?: CostCurrency
  /**
   * Pin one day in the caller's session list (the dashboard owns one; the
   * sidebar widget leaves it out and opens the dashboard instead).
   */
  onSelectDay?: (day: string | null) => void
}

/** Stable fallbacks so the grid subscribes unconditionally. */
const NO_QUOTA = (): CodexQuota | null => null
const NEVER_CHANGES = (): (() => void) => () => {}

/** The rolling windows one cell row shows, longest first. */
const WINDOWS_PER_ACCOUNT = 2

/** Currency symbol for the balance cells the platform serves. */
function symbolOf(currency: string): string {
  if (currency === 'CNY') return String.fromCharCode(0x00a5)
  if (currency === 'USD') return String.fromCharCode(0x0024)
  return currency + ' '
}

/** One rolling window length as a compact label (5h, 7d). */
function windowLabel(seconds: number): string {
  if (seconds % 86400 === 0) return String(seconds / 86400) + 'd'
  if (seconds % 3600 === 0) return String(seconds / 3600) + 'h'
  return String(Math.round(seconds / 60)) + 'm'
}

/** The account rows to render: the service's list, or the active account alone. */
function accountsOf(quota: CodexQuota | null): CodexQuotaAccount[] {
  if (quota === null) return []
  const listed = quota.accounts
  if (listed !== undefined && listed.length > 0) return [...listed]
  if (quota.windows.length === 0) return []
  return [{ accountKey: 'active', label: '', active: true, windows: quota.windows, ...(quota.credits === undefined ? {} : { credits: quota.credits }) }]
}

/** One drill-down target, identified by the cell that opened it. */
interface Detail {
  kind: 'balance' | 'today' | 'window'
  /** Window cells key their detail by account + window length. */
  key?: string
}

/**
 * Build the grid occupant.
 * @param ctx - the client context (optional codexQuota service lookup).
 * @param kit - the slot kit (locale + duration formatting).
 * @returns the component both the sidebar widget and the panel render.
 */
export function makeQuotaGrid(ctx: ClientCtx, kit: ViewKit): (props: QuotaGridProps) => ReactElement | null {
  const { t, fmtDuration } = kit
  /** Read the optional codexQuota client service without requiring it. */
  function codexQuotaOf(): CodexQuotaService | null {
    // A kit-less surface (a spec, a harness seat that passed no ctx) degrades to
    // no quota cells instead of throwing through the render.
    const probe = ctx as unknown as { get?: (name: string) => unknown } | undefined
    if (probe === undefined || typeof probe.get !== 'function') return null
    const value = probe.get('codexQuota')
    if (value === null || typeof value !== 'object') return null
    const candidate = value as Partial<CodexQuotaService>
    return typeof candidate.snapshot === 'function' && typeof candidate.subscribe === 'function'
      ? candidate as CodexQuotaService
      : null
  }
  /** Remaining time until one window resets, or null when unknown. */
  function resetInOf(win: CodexQuotaWindow): string | null {
    if (win.resetAt === undefined) return null
    const left = win.resetAt * 1000 - Date.now()
    return left > 0 ? fmtDuration(left) : null
  }
  /** The exact reset instant in the reader's own locale and time zone. */
  function resetAtOf(win: CodexQuotaWindow): string | null {
    if (win.resetAt === undefined) return null
    const at = new Date(win.resetAt * 1000)
    return Number.isNaN(at.getTime()) ? null : at.toLocaleString()
  }
  return function QuotaGrid(props: QuotaGridProps): ReactElement | null {
    const [balance, setBalance] = useState<PlatformBalance | null>(null)
    const [detail, setDetail] = useState<Detail | null>(null)
    useEffect(() => {
      let on = true
      // Sticky: a later read that reports nothing keeps the last real figure
      // instead of blanking the cell between refreshes.
      void fetchPlatformBalance().then((value) => { if (on && value !== null) setBalance(value) })
      return () => { on = false }
    }, [])
    const service = codexQuotaOf()
    const quota = useSyncExternalStore(service?.subscribe ?? NEVER_CHANGES, service?.snapshot ?? NO_QUOTA)
    const entry = balanceEntryOf(balance, props.currency ?? 'cny')
    const today = props.days[props.today]
    const accounts = accountsOf(quota)
    const named = accounts.length > 1
    const toggle = (next: Detail): void => {
      setDetail((current) => (current !== null && current.kind === next.kind && current.key === next.key ? null : next))
    }
    const cell = (
      key: string,
      label: ReactElement | string,
      value: string,
      sub: string | null,
      target: Detail,
      extra?: ReactElement,
    ): ReactElement => {
      const open = detail !== null && detail.kind === target.kind && detail.key === target.key
      return (
        <button
          type="button"
          key={key}
          className={'lc-ov-quota-cell' + (open ? ' lc-ov-quota-on' : '')}
          aria-expanded={open}
          onClick={(event) => { event.stopPropagation(); toggle(target) }}
          onKeyDown={(event) => { event.stopPropagation() }}
        >
          <span className="lc-ov-quota-label">{label}</span>
          <span className="lc-ov-quota-value">{value}</span>
          {sub !== null && <span className="lc-ov-quota-sub">{sub}</span>}
          {extra}
        </button>
      )
    }
    const cells: ReactElement[] = []
    if (entry !== null) {
      cells.push(cell(
        'balance',
        t('ov.quota.balance'),
        symbolOf(entry.currency) + entry.total.toFixed(2),
        t('ov.quota.balanceSub', { granted: entry.granted.toFixed(2), topped: entry.toppedUp.toFixed(2) }),
        { kind: 'balance' },
      ))
    }
    if (today !== undefined && today.tokens > 0) {
      cells.push(cell(
        'today',
        t('ov.quota.today'),
        fmt(today.tokens),
        t('ov.kpi.tokens'),
        { kind: 'today' },
      ))
    }
    for (const account of accounts) {
      const windows = [...account.windows]
        .sort((left, right) => left.windowSeconds - right.windowSeconds)
        .slice(0, WINDOWS_PER_ACCOUNT)
      for (const win of windows) {
        const reset = resetInOf(win)
        const key = account.accountKey + ':' + win.windowSeconds
        const accountBadge = named
          ? <span className={'lc-ov-quota-acct' + (account.active ? ' lc-ov-quota-acct-on' : '')}>{account.label === '' ? t('ov.quota.accountCurrent') : account.label}</span>
          : null
        cells.push(cell(
          key,
          <>{t('ov.quota.codexWindow', { w: windowLabel(win.windowSeconds) })}{accountBadge}</>,
          t('ov.quota.remaining', { p: Math.round(win.remainingPercent) }),
          reset === null ? null : t('ov.quota.resetIn', { d: reset }),
          { kind: 'window', key },
        ))
      }
    }
    if (cells.length === 0) return null
    const rows: Array<[string, string]> = []
    let detailTitle = ''
    let action: ReactElement | null = null
    if (detail !== null && detail.kind === 'balance' && entry !== null) {
      detailTitle = t('ov.quota.balance')
      rows.push([t('ov.quota.detail.total'), symbolOf(entry.currency) + entry.total.toFixed(2)])
      rows.push([t('ov.quota.detail.granted'), symbolOf(entry.currency) + entry.granted.toFixed(2)])
      rows.push([t('ov.quota.detail.topped'), symbolOf(entry.currency) + entry.toppedUp.toFixed(2)])
      rows.push([t('ov.quota.detail.currency'), entry.currency])
    }
    if (detail !== null && detail.kind === 'today' && today !== undefined) {
      detailTitle = t('ov.quota.today')
      rows.push([t('ov.kpi.tokens'), fmt(today.tokens)])
      rows.push([t('ov.quota.detail.sessions'), String(today.sessions)])
      rows.push([t('ov.quota.detail.requests'), fmt(today.requests)])
      if (props.onSelectDay !== undefined) {
        action = (
          <button
            type="button"
            className="lc-ov-quota-detail-action"
            onClick={(event) => { event.stopPropagation(); props.onSelectDay?.(props.today) }}
          >
            {t('ov.quota.detail.filterDay')}
          </button>
        )
      }
    }
    if (detail !== null && detail.kind === 'window') {
      const [accountKey, seconds] = String(detail.key).split(':')
      const account = accounts.find(candidate => candidate.accountKey === accountKey)
      const win = account?.windows.find(candidate => String(candidate.windowSeconds) === seconds)
      if (account !== undefined && win !== undefined) {
        detailTitle = t('ov.quota.codexWindow', { w: windowLabel(win.windowSeconds) })
        if (named) rows.push([t('ov.quota.detail.account'), account.label === '' ? t('ov.quota.accountCurrent') : account.label])
        rows.push([t('ov.quota.detail.length'), fmtDuration(win.windowSeconds * 1000)])
        rows.push([t('ov.quota.detail.remaining'), t('ov.quota.remaining', { p: Math.round(win.remainingPercent) })])
        const at = resetAtOf(win)
        if (at !== null) rows.push([t('ov.quota.detail.resetAt'), at])
        const refreshed = account.fetchedAt
        if (refreshed !== undefined) rows.push([t('ov.quota.detail.refreshed'), fmtDuration(Date.now() - refreshed) + ' ' + t('ov.quota.detail.ago')])
      }
    }
    const panel = rows.length === 0 ? null : (
      <div className="lc-ov-quota-detail" role="group" aria-label={detailTitle} onClick={(event) => { event.stopPropagation() }}>
        <div className="lc-ov-quota-detail-head">
          <span className="lc-ov-quota-detail-title">{detailTitle}</span>
          <button
            type="button"
            className="lc-ov-quota-detail-close"
            aria-label={t('cmd.close')}
            onClick={(event) => { event.stopPropagation(); setDetail(null) }}
          >{String.fromCharCode(0x00d7)}</button>
        </div>
        {rows.map(([label, value]) => (
          <div className="lc-ov-quota-detail-row" key={label}>
            <span className="lc-ov-quota-detail-label">{label}</span>
            <span className="lc-ov-quota-detail-value">{value}</span>
          </div>
        ))}
        {action}
      </div>
    )
    return (
      <div className={'lc-ov-quota' + (props.compact === true ? ' lc-ov-quota-compact' : '')}>
        {cells}
        {panel}
      </div>
    )
  }
}
