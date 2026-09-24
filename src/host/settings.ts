/**
 * dsh-context user settings — the Host half of the per-user preference
 * namespace served to browsers through the harness settings seam
 * (`ctx.settings`).
 *
 * Distinct from the cordis `config:` block (config.ts), which carries both the
 * deployment bounds and the preference vocabulary. Since dsh 0.1.7 the settings
 * service builds one form per ACTIVE profile entry from that entry's Cordis
 * Config schema and keeps only the fields marked `.volatile()`; `describe()`
 * keys each form by the profile entry id, and this plugin's entry id IS its
 * name, so the `settings.plugin.item` card keyed by SETTINGS_NAMESPACE stays
 * aligned with the form with no registration call of its own. The Host half
 * therefore only claims its page policy: `auto: false` keeps the harness from
 * generating a second page beside the plugin's own card. Nothing here is
 * consumed on the Host — every field is a client-side display preference.
 *
 * Optional composition: a deployment without a settings provider never runs
 * the inject callback and the plugin still loads; browsers then fall back to
 * the schema defaults.
 */

import type { Context } from '@deepseek-ai/cordis'
// Type-only: pulls the `ctx.settings` Context augmentation (the 0.1.7 form service).
import type { } from '@deepseek-ai/dsh-settings'

/** The namespace is the join key between the Host Config entry and the browser card. */
export const SETTINGS_NAMESPACE = 'dsh-context'

// The preference vocabulary is declared once in shared/types.ts; re-exported
// here so host-side consumers keep their canonical import path.
export type { DefaultFileSort, DefaultGranularity, DefaultPlacement, DefaultToolSort, DefaultTrendMode, InsightsEntry, PluginSettings } from '../shared/types'

/** Claim the plugin's settings page policy while a settings provider is composed; inert otherwise. */
export function installSettings(ctx: Context): void {
  ctx.inject(['settings'], (settingsCtx) => {
    settingsCtx.effect(
      () => settingsCtx.settings.configure({ auto: false }, ctx.fiber),
      'dsh-context: custom settings page policy',
    )
  })
}
