/**
 * The account and quota grid shared by the sidebar's always-visible widget and
 * the dashboard's detail panel: the platform balance, the signed-in Codex
 * account's rolling windows, and the tokens recorded for one day. A cell whose
 * figure is absent renders nothing rather than a placeholder, so a signed-out
 * or key-less deployment shows a shorter grid.
 */
import { useEffect, useState, useSyncExternalStore, type ReactElement } from 'react'
import { balanceEntryOf, fetchPlatformBalance } from '../balance'
import { fmt } from '../format'
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

/** The quota snapshot that service exposes. */
export interface CodexQuota {
  windows: readonly CodexQuotaWindow[]
  credits?: { unlimited: boolean; balance?: string }
}

/** The optional cross-plugin service (absent when that plugin is not mounted). */
export interface CodexQuotaService {
  snapshot(): CodexQuota | null
  subscribe(listener: () => void): () => void
}

/** Props both occupants render from. */
export interface QuotaGridProps {
  /** Merged daily ledger (day key -> figures) backing the today cell. */
  days: Record<string, { tokens: number }>
  /** Today's key from the caller's calendar. */
  today: string
  /** Compact type scale for the sidebar widget. */
  compact?: boolean
}

/** Stable fallbacks so the grid subscribes unconditionally. */
const NO_QUOTA = (): CodexQuota | null => null
const NEVER_CHANGES = (): (() => void) => () => {}

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
    const probe = ctx as unknown as { get?: (name: string) => unknown }
    if (typeof probe.get !== 'function') return null
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
  return function QuotaGrid(props: QuotaGridProps): ReactElement | null {
    const [balance, setBalance] = useState<PlatformBalance | null>(null)
    useEffect(() => {
      let on = true
      void fetchPlatformBalance().then((value) => { if (on) setBalance(value) })
      return () => { on = false }
    }, [])
    const service = codexQuotaOf()
    const quota = useSyncExternalStore(service?.subscribe ?? NEVER_CHANGES, service?.snapshot ?? NO_QUOTA)
    const entry = balanceEntryOf(balance, 'cny')
    const today = props.days[props.today]
    const cells: ReactElement[] = []
    if (entry !== null) {
      cells.push(
        <div className="lc-ov-quota-cell" key="balance">
          <span className="lc-ov-quota-label">{t('ov.quota.balance')}</span>
          <span className="lc-ov-quota-value">{symbolOf(entry.currency) + entry.total.toFixed(2)}</span>
          <span className="lc-ov-quota-sub">{t('ov.quota.balanceSub', { granted: entry.granted.toFixed(2), topped: entry.toppedUp.toFixed(2) })}</span>
        </div>,
      )
    }
    const windows = [...(quota?.windows ?? [])]
      .sort((left, right) => left.windowSeconds - right.windowSeconds)
      .slice(0, 2)
    for (const win of windows) {
      const reset = resetInOf(win)
      cells.push(
        <div className="lc-ov-quota-cell" key={win.bucketId + ':' + win.windowSeconds}>
          <span className="lc-ov-quota-label">{t('ov.quota.codexWindow', { w: windowLabel(win.windowSeconds) })}</span>
          <span className="lc-ov-quota-value">{t('ov.quota.remaining', { p: Math.round(win.remainingPercent) })}</span>
          {reset !== null && <span className="lc-ov-quota-sub">{t('ov.quota.resetIn', { d: reset })}</span>}
        </div>,
      )
    }
    if (today !== undefined && today.tokens > 0) {
      cells.push(
        <div className="lc-ov-quota-cell" key="today">
          <span className="lc-ov-quota-label">{t('ov.quota.today')}</span>
          <span className="lc-ov-quota-value">{fmt(today.tokens)}</span>
          <span className="lc-ov-quota-sub">{t('ov.kpi.tokens')}</span>
        </div>,
      )
    }
    if (cells.length === 0) return null
    return <div className={'lc-ov-quota' + (props.compact === true ? ' lc-ov-quota-compact' : '')}>{cells}</div>
  }
}
