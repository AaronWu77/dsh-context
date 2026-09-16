/**
 * One session card in the Context Dashboard's grid: the row's title, last-
 * activity time and directory over a mini composition donut (the same
 * seven-category ring the stats board draws, at card scale) and the three
 * figures a user scans for — billed tokens, turns, estimated cost. A row
 * whose host folded nothing yet degrades to a metadata-only card (never an
 * error). The whole card is one button: clicking opens the session (the
 * panel's `onOpen`).
 */

import type { ReactElement } from 'react'
import { billedOf, projectOf, relativeTime, turnsOf, type OverviewRow } from '../overview'
import { partsOf } from '../categories'
import { fmt, fmtShare } from '../format'
import type { ViewKit } from '../viewkit'
import { makeDonut } from './donut'

export interface OverviewCardProps {
  row: OverviewRow
  /** The workspace title claiming this session, when one does (the breadcrumb's group). */
  group?: string
  /** The priced cost label ('—' until the price book lands or nothing billed). */
  costLabel: string
  /** Render instant for the relative-time label. */
  now: number
  onOpen(id: string): void
}

export function makeOverviewCard(kit: ViewKit): (props: OverviewCardProps) => ReactElement {
  const { t } = kit
  const Donut = makeDonut(kit)
  return function OverviewCard(props: OverviewCardProps): ReactElement {
    const { row } = props
    const timeline = row.timeline
    const billed = billedOf(timeline)
    const occupancy = timeline !== null && typeof timeline.contextWindow === 'number' && timeline.contextWindow > 0
      ? fmtShare(timeline.current.total, timeline.contextWindow)
      : null
    // The breadcrumb: group (workspace title) / project (cwd basename); a
    // session with neither drops the row, and the full path stays on the tip.
    // A workspace whose title IS the project (the common single-repo case)
    // shows the name ONCE — never "dsh-context / dsh-context".
    const project = projectOf(row.cwd)
    const group = props.group !== undefined && props.group !== project ? props.group : undefined
    return (
      <button
        type="button"
        className={'lc-ov-session' + (row.current ? ' lc-ov-session-current' : '')}
        onClick={() => { props.onOpen(row.id) }}
      >
        <span className="lc-ov-session-head">
          {row.running && <span className="lc-ov-running" title={t('ov.running')} />}
          <span className="lc-ov-session-title" title={row.title}>{row.title}</span>
          {row.current && <span className="lc-ov-current">{t('ov.current')}</span>}
          <span className="lc-ov-session-time">{relativeTime(t, row.updatedAt, props.now)}</span>
        </span>
        {(group !== undefined || project !== undefined) && (
          <span className="lc-ov-session-crumb" title={row.cwd}>
            {group !== undefined && <span className="lc-ov-crumb-group">{group}</span>}
            {group !== undefined && project !== undefined && <span className="lc-ov-crumb-sep">/</span>}
            {project !== undefined && <span className="lc-ov-crumb-project">{project}</span>}
          </span>
        )}
        {timeline === null ? (
          <span className="lc-ov-session-empty">{t('ov.list.noData')}</span>
        ) : (
          <span className="lc-ov-session-body">
            <Donut
              size={64}
              segments={partsOf(timeline.current)}
              centerTop={fmt(timeline.current.total)}
              centerSub={occupancy ?? undefined}
            />
            <span className="lc-ov-mini-stats">
              <span className="lc-ov-mini-stat">
                <span className="lc-ov-mini-label">{t('tokens.total')}</span>
                <span className="lc-ov-mini-value">{billed === null ? '—' : fmt(billed)}</span>
              </span>
              <span className="lc-ov-mini-stat">
                <span className="lc-ov-mini-label">{t('stats.turns')}</span>
                <span className="lc-ov-mini-value">{turnsOf(timeline)}</span>
              </span>
              <span className="lc-ov-mini-stat">
                <span className="lc-ov-mini-label">{t('stats.cost')}</span>
                <span className="lc-ov-mini-value">{props.costLabel}</span>
              </span>
            </span>
          </span>
        )}
      </button>
    )
  }
}
