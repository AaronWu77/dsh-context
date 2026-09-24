// The Host settings face (src/host/settings.ts + src/host/config.ts). Since
// dsh 0.1.7 the settings service builds one form per ACTIVE profile entry from
// that entry's Cordis Config and keeps only the fields marked .volatile(), so
// this suite drives the REAL service over the plugin Config: the namespace,
// its defaults, the revision-fenced write path, and the page policy the Host
// half claims through its own inject.

import assert from 'node:assert/strict'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, test } from 'vitest'
import { Context } from '@deepseek-ai/cordis'
import SettingsForms from '@deepseek-ai/dsh-settings'
import { Config, DEFAULT_BOUNDS } from '../../src/host/config'
import { installSettings, SETTINGS_NAMESPACE } from '../../src/host/settings'

// FiberState.ACTIVE is an ambient const enum in cordis; its value inlines at
// build. The settings service compares entry.fiber.state against it.
const ACTIVE = 2

const PREFERENCE_DEFAULTS = {
  defaultPlacement: 'all',
  defaultGranularity: 'step',
  defaultTrendMode: 'total',
  defaultToolSort: 'count',
  defaultFileSort: 'count',
  insightsEntry: 'show',
}

interface Harness {
  settings: SettingsForms
  override: Record<string, unknown>
}

/** The real service over one ACTIVE dsh-context profile entry with a live user layer. */
function harness(): Harness {
  const ctx = new Context()
  ctx.provide('loader', { await: () => Promise.resolve() })
  ctx.provide('profileContext', { home: tmpdir(), name: 'test' })
  const override: Record<string, unknown> = {}
  const entry = {
    id: SETTINGS_NAMESPACE,
    options: { id: SETTINGS_NAMESPACE, config: {} },
    fiber: { uid: 1, state: ACTIVE, runtime: { Config }, config: Config({}), ctx },
  }
  const editor = {
    documentPath: join(tmpdir(), 'cordis.patch.yml'),
    configuration: () => [{ entry, inherited: {}, override }],
    entries: () => [entry],
    edit: (_entry: unknown, change: (raw: unknown, inherited: unknown, schema: unknown) => unknown) => {
      const next = change(override, {}, Config) as Record<string, unknown>
      for (const key of Object.keys(override)) delete override[key]
      Object.assign(override, next)
      // The live fiber re-resolves from the written user layer, as the loader does.
      entry.fiber.config = Config(override)
      return Promise.resolve()
    },
  }
  ctx.provide('configEditor', editor)
  return { settings: new SettingsForms(ctx), override }
}

/** The described section value for the plugin namespace. */
function sectionOf(settings: SettingsForms): Record<string, unknown> {
  const row = settings.describe().find(candidate => String(candidate.ns) === SETTINGS_NAMESPACE)
  assert.ok(row !== undefined, 'the dsh-context namespace is described')
  return row.value as Record<string, unknown>
}

describe('the dsh-context settings namespace', () => {
  test('the namespace is the plugin short name', () => {
    assert.equal(SETTINGS_NAMESPACE, 'dsh-context')
  })

  test('describe() serves the six volatile preferences with the schema defaults', () => {
    const { settings } = harness()
    assert.deepEqual(sectionOf(settings), PREFERENCE_DEFAULTS)
    assert.deepEqual(Object.keys(sectionOf(settings)).filter(key => key in DEFAULT_BOUNDS), [], 'the bounds stay out of the form')
  })

  test('update() persists a preference and describe() reflects it', async () => {
    const { settings, override } = harness()
    await settings.update(SETTINGS_NAMESPACE, { defaultGranularity: 'turn' })
    assert.deepEqual(override, { defaultGranularity: 'turn' }, 'the user layer carries only the edit')
    assert.deepEqual(sectionOf(settings), { ...PREFERENCE_DEFAULTS, defaultGranularity: 'turn' })
  })

  test('a stale loose preference degrades at read; the raw value stays in the user layer', async () => {
    const { settings, override } = harness()
    await settings.update(SETTINGS_NAMESPACE, { defaultPlacement: 'window', defaultFileSort: 'net', defaultToolSort: 'alpha', insightsEntry: 'gone' })
    assert.deepEqual(sectionOf(settings), PREFERENCE_DEFAULTS, 'every loose field degrades to its default')
    assert.deepEqual(override, { defaultPlacement: 'window', defaultFileSort: 'net', defaultToolSort: 'alpha', insightsEntry: 'gone' })
  })

  test('a non-loose preference rejects an unknown value', async () => {
    const { settings } = harness()
    await assert.rejects(settings.update(SETTINGS_NAMESPACE, { defaultGranularity: 'week' }))
  })

  test('a deployment bound is not editable through the form', async () => {
    const { settings, override } = harness()
    await assert.rejects(settings.update(SETTINGS_NAMESPACE, { maxNodes: 5 }), /not volatile/)
    assert.deepEqual(override, {}, 'nothing persisted')
  })
})

describe('installSettings', () => {
  test('claims the plugin page policy (auto: false) when a settings service is composed', async () => {
    const calls: { presentation: unknown; owner: unknown }[] = []
    const ctx = new Context()
    ctx.provide('settings', {
      configure: (presentation: unknown, owner: unknown) => {
        calls.push({ presentation, owner })
        return () => {}
      },
    })
    installSettings(ctx)
    await new Promise(resolve => setTimeout(resolve, 0))
    assert.equal(calls.length, 1, 'the policy is claimed once')
    assert.deepEqual(calls[0]?.presentation, { auto: false })
    assert.equal(calls[0]?.owner, ctx.fiber, 'the policy is owned by the plugin fiber')
  })

  test('without a settings service the install is inert', async () => {
    const ctx = new Context()
    assert.doesNotThrow(() => installSettings(ctx))
    assert.equal(ctx.get('settings'), undefined, 'no service composed, nothing claimed')
    await ctx.fiber.dispose()
  })
})
