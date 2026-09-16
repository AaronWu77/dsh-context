/**
 * The Context Dashboard's sidebar entry: a footer action stacked directly
 * above Settings (the harness's own foot layout: footer actions, then the
 * settings row), mirroring the Settings trigger's geometry in both column
 * widths. The button carries the plugin emblem and, on the wide
 * column, its label; a badge counts the sessions currently running (the one
 * glanceable live fact a footer can carry). Clicking opens the overview
 * overlay through the shared module store (overviewStore.ts).
 */

import type { ReactElement } from 'react'
import { ContextIcon } from '../icon'
import { runningCountOf, sessionsSnapshotOf } from '../overview'
import { overviewStore } from '../overviewStore'
import type { ViewKit } from '../viewkit'

export interface OverviewButtonProps {
  /** The footer-action owner share: false on the collapsed 56px rail (icon only). */
  wide?: boolean
  /** The root standard kit's sessions seat (absent on a harness without it). */
  useSessions?: unknown
}

export function makeOverviewButton(kit: ViewKit): (props: OverviewButtonProps) => ReactElement {
  const { t } = kit
  return function OverviewButton(props: OverviewButtonProps): ReactElement {
    // The hook-level read (unconditional, guarded inside); the badge hides at 0.
    const running = runningCountOf(sessionsSnapshotOf(props))
    return (
      <button
        type="button"
        className={props.wide === true ? 'lc-ov-entry' : 'lc-ov-entry lc-ov-entry-rail'}
        title={t('ov.entry')}
        aria-label={t('ov.entry')}
        onClick={() => { overviewStore.set(true) }}
      >
        <ContextIcon size={props.wide === true ? 16 : 18} className="lc-ov-entry-icon" />
        {props.wide === true && <span className="lc-ov-entry-label">{t('ov.entry')}</span>}
        {running > 0 && <span className="lc-ov-badge" aria-hidden="true">{running}</span>}
      </button>
    )
  }
}
