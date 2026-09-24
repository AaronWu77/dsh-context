// The cordis `config:` block contract (src/host/config.ts): defaults fill,
// unknown keys are rejected, and integer/lower-bound validation runs through
// the REAL Standard Schema validator cordis applies before `apply`. The six
// per-user preferences are volatile and carry their schema defaults; the
// deployment bounds stay ordinary so they never reach the settings form.

import assert from 'node:assert/strict'
import { describe, test } from 'vitest'
import { Config, DEFAULT_BOUNDS, resolveBounds } from '../../src/host/config'

/** Parse a raw value through the schema (invalid inputs typed loosely for the call). */
function parse(value: unknown): unknown {
  return Config(value as never)
}

/** The issue list the Standard Schema face reports (cordis's pre-apply gate). */
function issuesOf(value: unknown): readonly { message: string }[] {
  const result = Config['~standard'].validate(value) as { issues?: readonly { message: string }[] }
  return result.issues ?? []
}

/** One schema node's metadata, as the settings service's volatile walk reads it. */
function metaOf(field: string): { volatile?: boolean; default?: unknown } | undefined {
  const node = Config.dict?.[field] as { meta?: { volatile?: boolean; default?: unknown } } | undefined
  return node?.meta
}

const PREFERENCE_DEFAULTS: ReadonlyArray<readonly [string, string]> = [
  ['defaultPlacement', 'all'],
  ['defaultGranularity', 'step'],
  ['defaultTrendMode', 'total'],
  ['defaultToolSort', 'count'],
  ['defaultFileSort', 'count'],
  ['insightsEntry', 'show'],
]

describe('Config validator', () => {
  test('an absent config (a loader row without config:) resolves to defaults', () => {
    assert.deepEqual(resolveBounds(undefined), DEFAULT_BOUNDS)
    assert.deepEqual(resolveBounds({}), DEFAULT_BOUNDS)
  })

  test('each field overrides independently', () => {
    assert.equal(resolveBounds({ maxRequestSteps: 7 }).maxRequestSteps, 7)
    assert.equal(resolveBounds({ maxKeptTurns: 7 }).maxKeptTurns, 7)
    assert.equal(resolveBounds({ maxEvents: 7 }).maxEvents, 7)
    assert.equal(resolveBounds({ maxNodes: 7 }).maxNodes, 7)
    assert.equal(resolveBounds({ maxArchiveNodes: 7 }).maxArchiveNodes, 7)
    assert.equal(resolveBounds({ maxFileOps: 7 }).maxFileOps, 7)
    // Untouched fields keep their defaults.
    assert.equal(resolveBounds({ maxNodes: 7 }).maxEvents, DEFAULT_BOUNDS.maxEvents)
  })

  test('rejects zero/negative bounds (min 1)', () => {
    assert.throws(() => parse({ maxRequestSteps: 0 }))
    assert.throws(() => parse({ maxNodes: -1 }))
  })

  test('rejects non-integer bounds', () => {
    assert.throws(() => parse({ maxEvents: 1.5 }))
  })

  test('rejects non-number bounds', () => {
    assert.throws(() => parse({ maxKeptTurns: '300' }))
  })

  test('strict: unknown top-level keys fail the Standard Schema gate', () => {
    assert.deepEqual(
      issuesOf({ unknown: 1 }).map(issue => issue.message),
      ['unknown config key "unknown"'],
    )
  })

  test('strict: well-formed, absent, and non-object configs pass the key check', () => {
    assert.deepEqual(issuesOf({ maxRequestSteps: 7 }), [])
    assert.deepEqual(issuesOf(undefined), [])
    assert.deepEqual(issuesOf(null), [], 'null is left to the schema default, not the key check')
    assert.equal(issuesOf([1, 2]).length, 1, 'an array is left to the object schema, not the key check')
  })

  test('the six preferences are volatile and carry the schema defaults', () => {
    for (const [field, fallback] of PREFERENCE_DEFAULTS) {
      assert.equal(metaOf(field)?.volatile, true, `${field} is volatile`)
      assert.equal(metaOf(field)?.default, fallback, `${field} keeps its default`)
    }
  })

  test('the deployment bounds stay non-volatile (out of the settings form)', () => {
    for (const field of Object.keys(DEFAULT_BOUNDS)) {
      assert.notEqual(metaOf(field)?.volatile, true, `${field} is not volatile`)
    }
  })

  test('volatile preferences validate their unions; loose ones degrade', () => {
    const parsed = parse({ defaultGranularity: 'turn', defaultPlacement: 'window', insightsEntry: 'gone' }) as Record<string, { get(): unknown }>
    assert.equal(parsed.defaultGranularity.get(), 'turn')
    assert.equal(parsed.defaultPlacement.get(), 'all', 'a stale placement degrades to its default')
    assert.equal(parsed.insightsEntry.get(), 'show', 'a stale insights entry degrades to show')
    assert.throws(() => parse({ defaultGranularity: 'week' }), 'a non-loose preference still rejects')
  })
})
