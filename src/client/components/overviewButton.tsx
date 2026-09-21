/**
 * The Context insight entry at the sidebar foot, directly above Settings.
 *
 * On the wide column this IS the always-visible panel: a small frosted widget
 * carrying the account and quota grid, so the figures need no click. On the
 * 56px rail the same seat stays the plugin's icon button. Clicking either
 * opens the detailed dashboard overlay, which is where the full dashboard
 * lives.
 */
import { useMemo, useSyncExternalStore, type ReactElement } from 'react'
import { ContextIcon } from '../icon'
import { overviewStore } from '../overviewStore'
import { aggregateDays, rowsOfSnapshot, sessionsSnapshotOf } from '../overview'
import { todayKey } from './heatmap'
import { makeQuotaGrid } from './quotaCells'
import type { ContextSettings, InsightsEntry } from '../settings'
import type { ClientCtx } from '../services'
import type { ViewKit } from '../viewkit'

export interface OverviewButtonProps {
  /** The footer-action owner share: false on the collapsed 56px rail. */
  wide?: boolean
  /** Root standard kit: every session row's host-cached projections. */
  useSessions?: unknown
}

/** Stable subscription faces for the settings-less degrade (no re-subscribes). */
const subscribeNever = (): (() => void) => () => {}
const entryShown = (): 'show' => 'show'

/**
 * Build the sidebar-foot occupant.
 * @param kit - the slot kit (locale and formatting seats).
 * @param ctx - the client context (optional codexQuota service lookup).
 * @param settings - the plugin preferences, when the settings face is served.
 * @returns the widget/button component for the `sidebar.footer.action` seat.
 */
export function makeOverviewButton(
  kit: ViewKit,
  ctx: ClientCtx,
  settings?: ContextSettings,
): (props: OverviewButtonProps) => ReactElement | null {
  const { t } = kit
  const QuotaGrid = makeQuotaGrid(ctx, kit)
  // Stable per-factory faces: useSyncExternalStore resubscribes when the
  // subscribe identity changes, so both wrappers are made once, here.
  const subscribeEntry = settings === undefined
    ? subscribeNever
    : (listener: () => void): (() => void) => settings.store.subscribe(listener)
  const getEntry = settings === undefined ? entryShown : (): InsightsEntry => settings.insightsEntry()
  return function OverviewButton(props: OverviewButtonProps): ReactElement | null {
    // The entry toggle: subscribed, so a preference flip takes effect live.
    const entry = useSyncExternalStore(subscribeEntry, getEntry)
    // The day ledger behind the widget's "today" cell (root standard kit).
    const snapshot = sessionsSnapshotOf(props)
    const days = useMemo(() => {
      const rows = rowsOfSnapshot(snapshot, undefined)
      return rows === null ? {} : aggregateDays(rows)
    }, [snapshot])
    const open = (): void => { overviewStore.open() }
    if (entry === 'hide') return null
    if (props.wide !== true) {
      return (
        <button
          type="button"
          className="lc-ov-entry lc-ov-entry-rail"
          title={t('ov.entry')}
          aria-label={t('ov.entry')}
          onClick={open}
        >
          <ContextIcon size={18} className="lc-ov-entry-icon" />
        </button>
      )
    }
    return (
      <div
        className="lc-ov-widget"
        role="button"
        tabIndex={0}
        title={t('ov.entry')}
        aria-label={t('ov.entry')}
        onClick={open}
        onKeyDown={(event) => {
          // A focused cell owns its own keys; only the card body opens the panel.
          if (event.target !== event.currentTarget) return
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            open()
          }
        }}
      >
        <div className="lc-ov-widget-head">
          <ContextIcon size={14} className="lc-ov-entry-icon" />
          <span className="lc-ov-widget-title">{t('ov.entry')}</span>
          <span className="lc-ov-widget-more" aria-hidden="true">{String.fromCharCode(0x203a)}</span>
        </div>
        <QuotaGrid
          days={days}
          today={todayKey()}
          compact
          onSelectDay={(day) => { overviewStore.open(day ?? undefined) }}
        />
      </div>
    )
  }
}
