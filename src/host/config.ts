/**
 * dsh-context host configuration — the `config:` block of the `dsh-context`
 * loader row in cordis.yml.
 *
 * Cordis validates the entry config against this exported `Config` schema (a
 * Standard Schema v1 validator — the DSH schemastery fork) before `apply`
 * runs, fills per-field defaults, and fails the load loudly on invalid values.
 * Schemastery's object resolver MERGES undeclared keys instead of rejecting
 * them (there is no zod-style `.strict()`), so the exported schema wraps its
 * Standard Schema `validate` to report them as issues — the same pre-apply
 * point cordis validates. The wrapper leaves `dict` and `toJSON()` untouched,
 * which is what the settings service's volatile-form walk reads.
 *
 * The bounds are deployment-level and stay ordinary config fields, so they
 * never appear in the settings form. The six per-user preferences below are
 * the settings namespace the browser half edits: marked `.volatile()`, the
 * 0.1.7 settings service projects exactly them into the Plugin configuration
 * card (`describe()` keeps only volatile fields). Older harness lines ship a
 * schemastery without `.volatile()`; {@link preferVolatile} then leaves the
 * fields ordinary, so this module still imports and the plugin still loads —
 * their settings service has no volatile-form seam anyway.
 *
 * The persisted projection state shape is independent of these bounds — they
 * only tune the fold's retention / presentation slice, so changing them never
 * requires a projection `stateVersion` bump.
 */

import z from '@deepseek-ai/schemastery'
import type { DefaultFileSort, DefaultGranularity, DefaultPlacement, DefaultToolSort, DefaultTrendMode, InsightsEntry } from '../shared/types'

export interface Config {
  /** Cap on kept per-step request records (the hard step backstop). */
  maxRequestSteps?: number
  /** Newest whole-turn window kept; trimming crosses whole turns, never mid-turn. */
  maxKeptTurns?: number
  maxEvents?: number
  /**
    * Served surface nodes (newest carry the signal; live inject nodes are pinned — they land first and are few). Deliberately generous:
    * auto-compaction keeps healthy surfaces far below it, so the browser effectively lists every live node; the bound is a
    * pathological-session backstop (each push ships the whole value, ~150B/node).
   */
  maxNodes?: number
  /** Removed (shadowed) surface nodes kept for per-step reconstruction. */
  maxArchiveNodes?: number
  /** Fold-derived file-operation records kept (the File Activity card's raw material). */
  maxFileOps?: number
  /** Where the Context view is offered: the conversation tab, the right Sidebar, or both. */
  defaultPlacement?: DefaultPlacement
  /** Whether the history chart counts whole-turn windows or per-step slices. */
  defaultGranularity?: DefaultGranularity
  /** Whether the trend chart reads cumulative totals or per-step deltas. */
  defaultTrendMode?: DefaultTrendMode
  /** Tool-definition row order: largest schema first, most call hits first, or name ascending. */
  defaultToolSort?: DefaultToolSort
  /** File Activity row order: most operations first, most-recently-touched first, or path ascending. */
  defaultFileSort?: DefaultFileSort
  /** Whether the Context Insights panel's sidebar entry is offered at all. */
  insightsEntry?: InsightsEntry
}

/** The six resolved deployment bounds. */
export interface FoldBounds {
  maxRequestSteps: number
  maxKeptTurns: number
  maxEvents: number
  maxNodes: number
  maxArchiveNodes: number
  maxFileOps: number
}

export const DEFAULT_BOUNDS: FoldBounds = {
  maxRequestSteps: 1500,
  maxKeptTurns: 300,
  maxEvents: 400,
  maxNodes: 2000,
  maxArchiveNodes: 400,
  maxFileOps: 400,
}

/**
 * Mark one preference field `.volatile()` where the running schemastery
 * supports it (>= 3.18.4, dsh 0.1.7+); an older harness keeps the field
 * ordinary instead of failing the module import.
 * @param field - the preference schema to mark.
 * @returns the same schema, volatile on a supporting runtime.
 */
function preferVolatile<S>(field: S): S {
  const mark = (field as { volatile?: () => S }).volatile
  /* v8 ignore next -- a pre-0.1.7 harness ships schemastery < 3.18.4 without
     `.volatile()`; the fallback keeps the module importable there and is
     unreachable on the test runtime. */
  return typeof mark === 'function' ? mark.call(field) : field
}

const configSchema = z.object({
  maxRequestSteps: z.number().step(1).min(1).default(DEFAULT_BOUNDS.maxRequestSteps),
  maxKeptTurns: z.number().step(1).min(1).default(DEFAULT_BOUNDS.maxKeptTurns),
  maxEvents: z.number().step(1).min(1).default(DEFAULT_BOUNDS.maxEvents),
  maxNodes: z.number().step(1).min(1).default(DEFAULT_BOUNDS.maxNodes),
  maxArchiveNodes: z.number().step(1).min(1).default(DEFAULT_BOUNDS.maxArchiveNodes),
  maxFileOps: z.number().step(1).min(1).default(DEFAULT_BOUNDS.maxFileOps),
  // Loose: a stale persisted value degrades to the default instead of breaking the section.
  defaultPlacement: preferVolatile(z.union(['all', 'tab', 'sidebar']).default('all').loose()),
  defaultGranularity: preferVolatile(z.union(['step', 'turn']).default('step')),
  defaultTrendMode: preferVolatile(z.union(['total', 'delta']).default('total').loose()),
  defaultToolSort: preferVolatile(z.union(['size', 'count', 'name']).default('count').loose()),
  defaultFileSort: preferVolatile(z.union(['count', 'latest', 'path']).default('count').loose()),
  // Loose so a stale value also reads as the default (`show`): a config
  // problem must never take the panel's entry away.
  insightsEntry: preferVolatile(z.union(['show', 'hide']).default('show').loose()),
})

// Schemastery merges undeclared keys into the parsed object; wrap the Standard
// Schema validate so cordis's pre-apply validation reports them (and fails the
// load) instead of silently keeping them.
const declaredKeys = new Set(Object.keys(configSchema.dict as Record<string, unknown>))
const baseStandard = configSchema['~standard']
const strictStandard = {
  ...baseStandard,
  validate: (value: unknown) => {
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      const unknown = Object.keys(value).filter(key => !declaredKeys.has(key))
      if (unknown.length > 0) {
        return { issues: unknown.map(key => ({ message: `unknown config key "${key}"`, path: [key] })) }
      }
    }
    return baseStandard.validate(value)
  },
}
Object.defineProperty(configSchema, '~standard', { configurable: true, get: () => strictStandard })

/**
  * The cordis `Config` validator: rejects unknown keys, validates the bounds, fills per-field defaults, and tolerates
  * `undefined` (a patch row without a `config:` block — defaults win). The six preference fields are volatile, so
  * the parsed value carries references for them; the Host never reads them.
 */
export const Config = configSchema

/**
 * The effective deployment bounds. Cordis has already validated and defaulted
 * `Config` before `apply` runs, so this reads the declared fields straight off
 * the parsed value (re-parsing it would reject the volatile preference
 * references).
 */
export function resolveBounds(config: Config | undefined): FoldBounds {
  return {
    maxRequestSteps: config?.maxRequestSteps ?? DEFAULT_BOUNDS.maxRequestSteps,
    maxKeptTurns: config?.maxKeptTurns ?? DEFAULT_BOUNDS.maxKeptTurns,
    maxEvents: config?.maxEvents ?? DEFAULT_BOUNDS.maxEvents,
    maxNodes: config?.maxNodes ?? DEFAULT_BOUNDS.maxNodes,
    maxArchiveNodes: config?.maxArchiveNodes ?? DEFAULT_BOUNDS.maxArchiveNodes,
    maxFileOps: config?.maxFileOps ?? DEFAULT_BOUNDS.maxFileOps,
  }
}
