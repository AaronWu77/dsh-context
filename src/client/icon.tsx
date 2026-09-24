/**
 * The Quota & Usage emblem: the harness gauge dial. Every seat the plugin
 * owns renders THIS component — the right-Sidebar guide capsule, the tab
 * chip title, the `/context` command row, the sidebar-foot entry and its
 * wide widget, and the dashboard header — so one glyph means the plugin
 * everywhere.
 *
 * The dial geometry matches the harness `IconGaugeOutlineRegular` artwork and is
 * vendored rather than imported: the plugin's type dependency on
 * `@deepseek-ai/dsh-client-ui-primitives` predates that export (while the
 * running shell already ships it), so an import would fail this package's
 * own typecheck. Strokes use `currentColor`, so the glyph follows whichever
 * theme and chip seat places it, and it is decorative (`aria-hidden`): the
 * label beside it carries the accessible name.
 */

import type { ReactElement } from 'react'
import type { Translate } from './i18n'

/** The emblem's props, matching the harness `IconProps` the guide capsule hands it. */
export interface ContextIconProps {
  /** Square edge in px. */
  size?: number
  /** Extra class for layout placement. */
  className?: string
}

/** The gauge dial at the requested square edge. */
export function ContextIcon({ size = 20, className }: ContextIconProps): ReactElement {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3.49 13.26A6.375 6.375 0 1 1 12.51 13.26" stroke="currentColor" strokeWidth="1.25" />
      <path d="M8 8.75L11.4 5.35" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="8" cy="8.75" r="1.55" fill="currentColor" />
    </svg>
  )
}

/**
 * The tab chip's title seat (`sidebar.right.pane.tab.title`): the emblem before
 * the label, so the chip reads as the files chip does. The label comes from the
 * plugin's own bound translate — read at render, so the chip follows the active
 * locale — rather than the tab-information hook, which a foreign or
 * not-yet-committed tab record can throw on. It carries a trailing gutter
 * (`.lc-title-label`) so the active chip's fade lands past the text, never on
 * the last glyphs.
 * @param t - the plugin-namespace translate bound in `apply`.
 * @returns the title component to register under the tab type id.
 */
export function makeContextTabTitle(t: Translate): () => ReactElement {
  return function ContextTabTitle(): ReactElement {
    return (
      <>
        <ContextIcon size={16} className="lc-title-icon" />
        <span className="lc-title-label">{t('tab')}</span>
      </>
    )
  }
}
