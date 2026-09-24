/**
 * The plugin's user-settings binding (browser half). The Host-served
 * `dsh-context` namespace carries per-user display preferences; the Context
 * tab reads them at mount, and the Plugin configuration card (Settings →
 * Plugins) writes them through the harness's client configuration form
 * (`ctx.configForms.get(NS)`). Both degrade to the schema defaults when the
 * settings surface is absent (older host) or read-only (remote browser in
 * memory mode).
 *
 * The configForms faces are minimally re-typed here (the services.ts
 * discipline): the runtime service comes from the user's harness, and
 * type-only imports of the contract package would still be erased — spelling
 * the consumed members keeps the dependency graph honest.
 */

import type { DefaultFileSort, DefaultGranularity, DefaultPlacement, DefaultToolSort, DefaultTrendMode, InsightsEntry, SettingsField } from '../shared/types'

// The preference vocabulary is declared once in shared/types.ts; re-exported
// here so client-side consumers keep their canonical import path.
export type { DefaultFileSort, DefaultGranularity, DefaultPlacement, DefaultToolSort, DefaultTrendMode, InsightsEntry, SettingsField } from '../shared/types'

/** One namespace's client form (`ctx.configForms.get(NS)`), as consumed. */
export interface SettingsFormLike {
  getSnapshot(): { status: string; value: unknown; writable: boolean }
  subscribe(listener: () => void): () => void
  set(field: string, value: unknown): Promise<unknown>
}

/**
 * The `ctx.configForms` service face, as consumed: one form per Host profile
 * entry, plus the served-namespace watch the card registration follows.
 */
export interface ConfigFormsFace {
  get(namespace: string): SettingsFormLike
  whileServed(namespaces: readonly string[], register: (served: ReadonlySet<string>) => () => void): () => void
}

/** The preference snapshot the card renders and the view reads at mount. */
export interface SettingsState {
  /** Form sync: loading until the first Host section, unavailable when unserved. */
  status: 'loading' | 'ready' | 'unavailable'
  placement: DefaultPlacement
  granularity: DefaultGranularity
  mode: DefaultTrendMode
  toolSort: DefaultToolSort
  fileSort: DefaultFileSort
  insightsEntry: InsightsEntry
  writable: boolean
}

export interface ContextSettings {
  /** Observable snapshot store, bound onto card props as `useContextSettings`. */
  store: { subscribe(listener: () => void): () => void; getSnapshot(): SettingsState }
  defaultPlacement(): DefaultPlacement
  defaultGranularity(): DefaultGranularity
  defaultTrendMode(): DefaultTrendMode
  defaultToolSort(): DefaultToolSort
  defaultFileSort(): DefaultFileSort
  insightsEntry(): InsightsEntry
  attach(form: SettingsFormLike): () => void
  /** Persist one preference choice (local echo, then the fenced form write). */
  set(field: SettingsField, value: string): void
}

type Prefs = {
  placement?: DefaultPlacement
  granularity?: DefaultGranularity
  mode?: DefaultTrendMode
  toolSort?: DefaultToolSort
  fileSort?: DefaultFileSort
  insightsEntry?: InsightsEntry
}

function prefsOf(value: unknown): Prefs {
  if (value === null || typeof value !== 'object') return {}
  const v = value as Record<string, unknown>
  return {
    ...(v.defaultPlacement === 'all' || v.defaultPlacement === 'tab' || v.defaultPlacement === 'sidebar' ? { placement: v.defaultPlacement } : {}),
    ...(v.defaultGranularity === 'step' || v.defaultGranularity === 'turn' ? { granularity: v.defaultGranularity } : {}),
    ...(v.defaultTrendMode === 'total' || v.defaultTrendMode === 'delta' ? { mode: v.defaultTrendMode } : {}),
    ...(v.defaultToolSort === 'size' || v.defaultToolSort === 'count' || v.defaultToolSort === 'name' ? { toolSort: v.defaultToolSort } : {}),
    ...(v.defaultFileSort === 'count' || v.defaultFileSort === 'latest' || v.defaultFileSort === 'path' ? { fileSort: v.defaultFileSort } : {}),
    ...(v.insightsEntry === 'show' || v.insightsEntry === 'hide' ? { insightsEntry: v.insightsEntry } : {}),
  }
}

export function createContextSettings(): ContextSettings {
  let state: SettingsState = { status: 'loading', placement: 'all', granularity: 'step', mode: 'total', toolSort: 'count', fileSort: 'count', insightsEntry: 'show', writable: false }
  let form: SettingsFormLike | undefined
  const listeners = new Set<() => void>()
  const publish = (next: SettingsState): void => {
    if (next.status === state.status && next.placement === state.placement && next.granularity === state.granularity
      && next.mode === state.mode && next.toolSort === state.toolSort && next.fileSort === state.fileSort
      && next.insightsEntry === state.insightsEntry && next.writable === state.writable) return
    state = next
    for (const listener of listeners) listener()
  }
  // Republish from the attached form's current snapshot; the attach sync and
  // the failed-write rollback share this one read. Returns the form's valid
  // placement and insights entry, if it carries them.
  const sync = (attached: SettingsFormLike): { placement?: DefaultPlacement; insightsEntry?: InsightsEntry } => {
    const snap = attached.getSnapshot()
    const prefs = prefsOf(snap.value)
    // Fail open: a config problem must never leave an entry hidden. A valid
    // value wins; one the plugin cannot understand degrades to the field's
    // default; a section without the field (older Host half) keeps the
    // current state.
    const raw = snap.value !== null && typeof snap.value === 'object'
      ? snap.value as Record<string, unknown>
      : undefined
    publish({
      status: snap.status === 'ready' || snap.status === 'unavailable' ? snap.status : 'loading',
      placement: prefs.placement ?? (raw?.defaultPlacement === undefined ? state.placement : 'all'),
      granularity: prefs.granularity ?? state.granularity,
      mode: prefs.mode ?? state.mode,
      toolSort: prefs.toolSort ?? state.toolSort,
      fileSort: prefs.fileSort ?? state.fileSort,
      insightsEntry: prefs.insightsEntry ?? (raw?.insightsEntry === undefined ? state.insightsEntry : 'show'),
      writable: snap.writable,
    })
    return { placement: prefs.placement, insightsEntry: prefs.insightsEntry }
  }
  return {
    store: {
      subscribe(listener) {
        listeners.add(listener)
        return () => { listeners.delete(listener) }
      },
      getSnapshot: () => state,
    },
    defaultPlacement: () => state.placement,
    defaultGranularity: () => state.granularity,
    defaultTrendMode: () => state.mode,
    defaultToolSort: () => state.toolSort,
    defaultFileSort: () => state.fileSort,
    insightsEntry: () => state.insightsEntry,
    attach(attached) {
      form = attached
      sync(attached)
      return attached.subscribe(() => { sync(attached) })
    },
    set(field, value) {
      publish({ ...state, ...prefsOf({ [field]: value }) })
      // The form write settles asynchronously and its promise REJECTS on a
      // transport failure (a refused write resolves false and the form's own
      // recovery re-reads the Host, republishing via subscribe) — never let it
      // float unhandled. Roll the optimistic echo back to the form's truth.
      const attached = form
      if (attached === undefined) return
      void attached.set(field, value).catch(() => {
        const truth = sync(attached)
        // A visibility gate that failed to persist must not keep an entry
        // hidden on an unpersisted echo: with no valid value in the form's
        // truth, degrade each gate to its default.
        if (field === 'defaultPlacement' && truth.placement === undefined) {
          publish({ ...state, placement: 'all' })
        }
        if (field === 'insightsEntry' && truth.insightsEntry === undefined) {
          publish({ ...state, insightsEntry: 'show' })
        }
      })
    },
  }
}
