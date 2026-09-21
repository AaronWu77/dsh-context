/**
 * The Context Dashboard panel — the cross-session insight surface opened
 * from the sidebar foot (overviewButton.tsx). Rendered from the frame-wide
 * `shell.overlay` slot behind the module store's flag; data rides the
 * root-scope `useSessions` standard kit (every list row's host-cached
 * projection values), so the panel draws every session's insight without
 * opening one log.
 *
 * The body is a 3:7 column pair: the insight column (the KPI 2×3 block over
 * the activity heatmap) beside the session column (search, group chips, and
 * the card grid); the heatmap keeps its own fixed 8-week window and PINs the
 * list to a picked day (the panel's drill-down gesture). A session card
 * click jumps to that session through the harness's own `sessions.open` and
 * closes the panel.
 */

import { useEffect, useMemo, useState, useSyncExternalStore, type ReactElement } from 'react'
import { estimateSessionCost, formatCost, type CostCurrency, type ModelPrices } from '../cost'
import { fmt } from '../format'
import { useModelPrices } from '../modelPrices'
import { balanceEntryOf, fetchPlatformBalance } from '../balance'
import type { PlatformBalance } from '../../shared/types'
import {
  aggregateDays, filterRows, groupCountsOf, inGroup, kpisOf, openSession,
  pageOf, refreshSessions, requestActivityBackfill, rowsOfSnapshot,
  sessionGroupsOf, sessionsSnapshotOf, sortRows,
  UNGROUPED_KEY, workspacesSnapshotOf,
  type OverviewRange, type OverviewRow, type OverviewSort,
} from '../overview'
import { overviewStore } from '../overviewStore'
import type { ClientCtx } from '../services'
import type { ViewKit } from '../viewkit'
import { IconGaugeOutline16 } from '@deepseek-ai/dsh-client-ui-primitives'
import { makeBalanceCapsule } from './balanceCapsule'
import { makeErrorBoundary } from './errorBoundary'
import { useEscapeClose } from './escapeClose'
import { makeHeatmap, todayKey } from './heatmap'
import { ContextIcon } from '../icon'
import { makeOverviewCard } from './overviewCard'

export interface OverviewPanelProps {
  /** The root standard kit's sessions seat (absent on a harness without it). */
  useSessions?: unknown
  /** The root standard kit's workspaces seat (the cards' breadcrumb grouping). */
  useWorkspaces?: unknown
}

const RANGES: readonly OverviewRange[] = ['7d', '30d', 'all']
const SORTS: readonly OverviewSort[] = ['recent', 'tokens', 'context']

export function makeOverviewPanel(ctx: ClientCtx, kit: ViewKit): (props: OverviewPanelProps) => ReactElement | null {
  const { t, fmtDuration } = kit
  const Heatmap = makeHeatmap(kit)
  const OverviewCard = makeOverviewCard(kit)
  const BalanceCapsule = makeBalanceCapsule(ctx, kit)
  const ErrorBoundary = makeErrorBoundary(t)

  /** One rolling Codex quota window as the codexQuota service publishes it. */
  interface CodexQuotaWindow {
    bucketId: string
    bucketName?: string
    remainingPercent: number
    windowSeconds: number
    resetAt?: number
  }
  /** The quota snapshot that service exposes. */
  interface CodexQuota {
    windows: readonly CodexQuotaWindow[]
    credits?: { unlimited: boolean; balance?: string }
  }
  /** The optional cross-plugin service (absent when that plugin is not mounted). */
  interface CodexQuotaService {
    snapshot(): CodexQuota | null
    subscribe(listener: () => void): () => void
  }

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

  /** Remaining time until one window resets, or null when unknown. */
  function resetInOf(win: CodexQuotaWindow): string | null {
    if (win.resetAt === undefined) return null
    const left = win.resetAt * 1000 - Date.now()
    return left > 0 ? fmtDuration(left) : null
  }

  /**
   * The account and quota grid above the KPI band: the platform balance, the
   * signed-in Codex account rolling windows, and the tokens recorded for
   * today. A cell whose figure is absent renders nothing rather than a
   * placeholder.
   */
  function QuotaGrid({ days, currency }: { days: Record<string, { tokens: number }>; currency: CostCurrency }): ReactElement | null {
    const [balance, setBalance] = useState<PlatformBalance | null>(null)
    useEffect(() => {
      let on = true
      void fetchPlatformBalance().then((value) => { if (on) setBalance(value) })
      return () => { on = false }
    }, [])
    const service = codexQuotaOf()
    const quota = useSyncExternalStore(service?.subscribe ?? NEVER_CHANGES, service?.snapshot ?? NO_QUOTA)
    const entry = balanceEntryOf(balance, currency)
    const today = days[todayKey()]
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
    return cells.length === 0 ? null : <div className="lc-ov-quota">{cells}</div>
  }

  function activeCurrency(): CostCurrency {
    const locale = ctx.locale
    const active = typeof locale.getLocale === 'function' ? locale.getLocale().active : 'en'
    return active === 'zh' ? 'cny' : 'usd'
  }

  function OverviewBody(props: OverviewPanelProps): ReactElement | null {
    const open = useSyncExternalStore(overviewStore.subscribe, overviewStore.getSnapshot)
    const { prices } = useModelPrices()
    // The hook-level standard-kit reads (unconditional; guarded inside).
    const snapshot = sessionsSnapshotOf(props)
    const wsSnapshot = workspacesSnapshotOf(props)
    const [range, setRange] = useState<OverviewRange>('30d')
    const [day, setDay] = useState<string | null>(null)
    const [query, setQuery] = useState('')
    const [group, setGroup] = useState<string | null>(null)
    const [sort, setSort] = useState<OverviewSort>('recent')
    /** Heatmap window: the last 30 days by default, 7 on request. */
    const [heatDays, setHeatDays] = useState<number>(30)
    const [page, setPage] = useState(0)
    const close = (): void => { overviewStore.set(false) }
    useEscapeClose(open, close)

    const rows = useMemo(() => rowsOfSnapshot(snapshot, wsSnapshot), [snapshot, wsSnapshot])
    const groups = useMemo(() => sessionGroupsOf(wsSnapshot), [wsSnapshot])

    // On open, summon the host's projection warm-up (this panel is the
    // rows' only reader — one pass per host process) and re-pull the list
    // once, so backfilled rows reach a long-connected page.
    useEffect(() => {
      if (open) {
        requestActivityBackfill()
        refreshSessions(ctx)
      }
    }, [open])

    // Any filter change re-anchors the pager at the first page.
    useEffect(() => { setPage(0) }, [range, day, query, group, sort])

    if (!open) return null

    const currency = activeCurrency()
    const now = Date.now()
    const allRows = rows ?? []
    // The range scopes the KPI band, the composition donut, and the grid;
    // the heatmap keeps its own fixed window over the whole list.
    const ranged = filterRows(allRows, { range, day: null, query: '' }, now)
    // The group chips count the day/query-scoped rows BEFORE the group filter
    // applies, so selecting a chip never collapses the row itself.
    const scoped = filterRows(ranged, { range: 'all', day, query }, now)
    const counts = groupCountsOf(scoped, wsSnapshot)
    // A selection whose group fell out of scope keeps a phantom chip (count
    // 0) so the active filter stays visible and one click out of it.
    const chips = group !== null && !counts.some(c => c.key === group)
      ? [...counts, { key: group, count: 0 }]
      : counts
    const visible = sortRows(
      group === null ? scoped : scoped.filter(row => inGroup(row, group, groups)),
      sort,
    )
    const paged = pageOf(visible, page)
    const kpi = kpisOf(ranged, allRows.length, prices, currency)
    const days = aggregateDays(allRows)
    const openOne = (id: string): void => {
      openSession(ctx, id)
      overviewStore.set(false)
    }

    return (
      <div className="lc-ov-backdrop" onClick={close}>
        <div className="lc-ov-card" onClick={(ev) => { ev.stopPropagation() }}>
          <div className="lc-ov-head">
            <IconGaugeOutline16 size={18} className="lc-ov-head-icon" />
            <span className="lc-ov-title">{t('ov.title')}</span>
            {/* The DeepSeek platform balance (client/balance.ts): renders nothing
                until a live figure lands, so the header row never reflows for it. */}
            <BalanceCapsule />
            <div className="lc-gran lc-ov-range" role="group" aria-label={t('ov.range.label')}>
              {RANGES.map(r => (
                <button
                  key={r}
                  type="button"
                  className={'lc-gran-btn' + (range === r ? ' lc-gran-on' : '')}
                  onClick={() => { setRange(r) }}
                >{t('ov.range.' + r)}</button>
              ))}
            </div>
            <button type="button" className="lc-modal-close hover:text-(--dsw-alias-label-primary) hover:bg-(--dsw-alias-bg-layer-2)" aria-label={t('cmd.close')} onClick={close}>×</button>
          </div>

          {rows === null ? (
            <div className="lc-empty">{t('ov.unavailable')}</div>
          ) : (
            <div className="lc-ov-body">
              <div className="lc-ov-left">
                <QuotaGrid days={days} currency={currency} />
                <div className="lc-ov-kpis">
                  <div className="lc-stat lc-ov-kpi">
                    <span className="lc-stat-label">{t('ov.kpi.sessions')}</span>
                    <span className="lc-stat-value">{kpi.sessions}</span>
                    <span className="lc-stat-sub">{t('ov.kpi.ofTotal', { n: kpi.listed })}</span>
                  </div>
                  <div className="lc-stat lc-ov-kpi">
                    <span className="lc-stat-label">{t('ov.kpi.tokens')}</span>
                    <span className="lc-stat-value">{fmt(kpi.tokens)}</span>
                    <span className="lc-stat-sub">{t('stats.turns')} {fmt(kpi.turns)}</span>
                  </div>
                  <div className="lc-stat lc-ov-kpi">
                    <span className="lc-stat-label">{t('stats.cost')}</span>
                    <span className="lc-stat-value">{kpi.cost === null ? '—' : formatCost(kpi.cost, currency)}</span>
                    <span className="lc-stat-sub">{t('ov.kpi.sessionsSub', { n: kpi.costSessions })}</span>
                  </div>
                  <div className="lc-stat lc-ov-kpi">
                    <span className="lc-stat-label">{t('stats.cacheHit')}</span>
                    <span className="lc-stat-value">{kpi.cacheHit === null ? '—' : kpi.cacheHit + '%'}</span>
                    <span className="lc-stat-sub">{t('ov.kpi.sessionsSub', { n: kpi.usageSessions })}</span>
                  </div>
                  <div className="lc-stat lc-ov-kpi">
                    <span className="lc-stat-label">{t('stats.toolCalls')}</span>
                    <span className="lc-stat-value">{fmt(kpi.toolCalls)}</span>
                    <span className="lc-stat-sub">{t('ov.kpi.toolSub', { dur: fmtDuration(kpi.toolsMs) })}</span>
                  </div>
                  <div className="lc-stat lc-ov-kpi">
                    <span className="lc-stat-label">{t('timing.total')}</span>
                    <span className="lc-stat-value">{fmtDuration(kpi.wallMs)}</span>
                    <span className="lc-stat-sub">{t('ov.kpi.wallSub', { n: fmt(kpi.calls) })}</span>
                  </div>
                </div>
                <div className="lc-card lc-ov-heat-card">
                  <div className="lc-card-title">
                    <span className="lc-card-title-text">{t('ov.heat.title')}</span>
                    <span className="lc-card-sub">{t('ov.heat.sub')}</span>
                    <div className="lc-gran lc-ov-heat-range" role="group" aria-label={t('ov.heat.title')}>
                      {[7, 30].map(n => (
                        <button
                          key={n}
                          type="button"
                          className={'lc-gran-btn' + (heatDays === n ? ' lc-gran-on' : '')}
                          onClick={() => { setHeatDays(n) }}
                        >{t(n === 7 ? 'ov.range.7d' : 'ov.range.30d')}</button>
                      ))}
                    </div>
                  </div>
                  <Heatmap days={days} windowDays={heatDays} selected={day} onSelect={setDay} today={todayKey()} />
                </div>
              </div>

              <div className="lc-ov-right">
                <div className="lc-ov-list-head">
                  <span className="lc-ov-list-title">{t('ov.list.title')}</span>
                  <span className="lc-ov-list-count">{visible.length}</span>
                  {day !== null && (
                    <button type="button" className="lc-ov-day-chip" title={t('ov.list.dayClear')} onClick={() => { setDay(null) }}>
                      {t('ov.list.dayFilter', { day })} ×
                    </button>
                  )}
                  <input
                    className="lc-ov-search"
                    type="search"
                    value={query}
                    placeholder={t('ov.list.search')}
                    aria-label={t('ov.list.search')}
                    onChange={(ev) => { setQuery(ev.target.value) }}
                  />
                  <div className="lc-gran" role="group" aria-label={t('ov.list.sortLabel')}>
                    {SORTS.map(s => (
                      <button
                        key={s}
                        type="button"
                        className={'lc-gran-btn' + (sort === s ? ' lc-gran-on' : '')}
                        onClick={() => { setSort(s) }}
                      >{t('ov.list.sort.' + s)}</button>
                    ))}
                  </div>
                </div>

                {chips.length > 0 && (
                  <div className="lc-ov-groups" role="group" aria-label={t('ov.group.label')}>
                    <button
                      type="button"
                      className={'lc-ov-chip' + (group === null ? ' lc-ov-chip-on' : '')}
                      onClick={() => { setGroup(null) }}
                    >{t('ov.range.all')}<span className="lc-ov-chip-n">{scoped.length}</span></button>
                    {chips.map(c => (
                      <button
                        key={c.key}
                        type="button"
                        className={'lc-ov-chip' + (group === c.key ? ' lc-ov-chip-on' : '')}
                        onClick={() => { setGroup(group === c.key ? null : c.key) }}
                      >{c.key === UNGROUPED_KEY ? t('ov.group.ungrouped') : c.key}<span className="lc-ov-chip-n">{c.count}</span></button>
                    ))}
                  </div>
                )}

                {visible.length === 0 ? (
                  <div className="lc-empty">{t(allRows.length === 0 ? 'ov.list.empty' : 'ov.list.noMatch')}</div>
                ) : (
                  <>
                    <div className="lc-ov-grid">
                      {paged.items.map(row => (
                        <OverviewCard
                          key={row.id}
                          row={row}
                          {...(groups?.[row.id] !== undefined ? { group: groups[row.id] } : {})}
                          costLabel={cardCostOf(row, prices, currency)}
                          now={now}
                          onOpen={openOne}
                        />
                      ))}
                    </div>
                    {paged.count > 1 && (
                      <div className="lc-ov-pager" role="navigation" aria-label={t('ov.list.pager')}>
                        <button
                          type="button"
                          className="lc-ov-pager-btn"
                          disabled={paged.index === 0}
                          aria-label={t('ov.list.prev')}
                          onClick={() => { setPage(paged.index - 1) }}
                        >‹</button>
                        <span className="lc-ov-pager-n">{t('ov.list.page', { n: paged.index + 1, total: paged.count })}</span>
                        <button
                          type="button"
                          className="lc-ov-pager-btn"
                          disabled={paged.index === paged.count - 1}
                          aria-label={t('ov.list.next')}
                          onClick={() => { setPage(paged.index + 1) }}
                        >›</button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return function OverviewPanel(props: OverviewPanelProps): ReactElement | null {
    return <ErrorBoundary><OverviewBody {...props} /></ErrorBoundary>
  }
}

/** One card's priced cost label, or the dash (no book yet, nothing billed, unpriceable model). */
function cardCostOf(row: OverviewRow, prices: ModelPrices | null, currency: CostCurrency): string {
  if (row.timeline?.cost === undefined) return '—'
  const cost = estimateSessionCost(row.timeline.cost, prices, currency)
  return cost === null ? '—' : formatCost(cost, currency)
}
