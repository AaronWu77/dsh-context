// The Quota & Usage sidebar-foot entry (src/client/components/
// overviewButton.tsx): the wide widget vs the collapsed rail, the store flip on
// click, and the per-user insights-entry toggle.

import { createElement as h, act } from 'react'
import assert from 'node:assert/strict'
import { afterEach, describe, test } from 'vitest'
import { makeOverviewButton } from '../../../src/client/components/overviewButton'
import { overviewStore } from '../../../src/client/overviewStore'
import { createContextSettings } from '../../../src/client/settings'
import { TestClientCtx, asClientCtx } from '../helpers/harness'
import { click, keydown, makeKit, mount, query, queryAll } from '../helpers/kit'
import { todayKey } from '../../../src/client/components/heatmap'

const kit = makeKit()
const ctx = asClientCtx(new TestClientCtx({ services: { sessions: {} } }))
const Button = makeOverviewButton(kit, ctx)

afterEach(() => {
  overviewStore.set(false)
})

describe('OverviewButton', () => {
  test('the wide column renders the frosted widget; the rail renders the icon alone', async () => {
    const wide = await mount(h(Button, { wide: true }))
    assert.equal(query(wide.container, '.lc-ov-widget-title').textContent, 'Quota & Usage')
    assert.equal(query(wide.container, '.lc-ov-widget').getAttribute('aria-label'), 'Quota & Usage')
    assert.equal(queryAll(wide.container, '.lc-ov-entry-rail').length, 0)
    await wide.unmount()

    const rail = await mount(h(Button, { wide: false }))
    assert.equal(queryAll(rail.container, '.lc-ov-widget-title').length, 0)
    assert.ok(query(rail.container, '.lc-ov-entry-icon'))
    assert.ok(query(rail.container, 'button.lc-ov-entry-rail'))
    await rail.unmount()

    // An absent wide flag (a foreign owner) keeps the collapsed rail.
    const bare = await mount(h(Button, {}))
    assert.equal(queryAll(bare.container, '.lc-ov-widget-title').length, 0)
    assert.ok(query(bare.container, 'button.lc-ov-entry-rail'))
    await bare.unmount()
  })

  test('clicking opens the overview through the shared store', async () => {
    assert.equal(overviewStore.getSnapshot(), false)
    const m = await mount(h(Button, { wide: true }))
    await click(query(m.container, '.lc-ov-widget'))
    assert.equal(overviewStore.getSnapshot(), true)
    await m.unmount()
  })

  test('the zh locale renders the translated label', async () => {
    const ZhButton = makeOverviewButton(makeKit('zh'), ctx)
    const m = await mount(h(ZhButton, { wide: true }))
    assert.equal(query(m.container, '.lc-ov-widget-title').textContent, '额度与用量')
    await m.unmount()
  })

  test('the insights-entry toggle takes the entry down and back live', async () => {
    // The real store: a local echo flips the rendering without a scope.
    const settings = createContextSettings()
    const Toggled = makeOverviewButton(kit, ctx, settings)
    const m = await mount(h(Toggled, { wide: true }))
    assert.ok(query(m.container, '.lc-ov-widget'), 'the default (show) renders the entry')

    await act(async () => { settings.set('insightsEntry', 'hide') })
    assert.equal(queryAll(m.container, '.lc-ov-widget').length, 0, 'hide renders nothing')

    await act(async () => { settings.set('insightsEntry', 'show') })
    assert.ok(query(m.container, '.lc-ov-widget'), 'flipping back restores the entry')
    await m.unmount()
  })

  test('the widget opens on Enter/Space; a key from a child cell does not', async () => {
    overviewStore.set(false)
    const m = await mount(h(Button, { wide: true }))
    const widget = query(m.container, '.lc-ov-widget')
    await keydown('Enter', widget)
    assert.equal(overviewStore.getSnapshot(), true, 'Enter on the card body opens')
    overviewStore.set(false)
    await keydown(' ', widget)
    assert.equal(overviewStore.getSnapshot(), true, 'Space on the card body opens')
    overviewStore.set(false)
    await keydown('Enter', query(m.container, '.lc-ov-widget-title'))
    assert.equal(overviewStore.getSnapshot(), false, 'a key from a focused child cell is ignored')
    await keydown('a', widget)
    assert.equal(overviewStore.getSnapshot(), false, 'an unrelated key does not open')
    await m.unmount()
  })

  test('a sessions snapshot feeds the widget and its today pin opens the panel on that day', async () => {
    overviewStore.set(false)
    const today = todayKey()
    const snapshot = {
      ids: ['s1'],
      byId: { s1: { updatedAt: Date.now(), projectionValues: { contextActivity: { days: { [today]: { tokens: 5, requests: 1 } } } } } },
      current: 's1',
      phase: 'ready',
    }
    const Wired = makeOverviewButton(kit, ctx)
    const m = await mount(h(Wired, {
      wide: true,
      useSessions: <T,>(selector: (snapshot: unknown) => T): T => selector(snapshot),
    }))
    await click(query(m.container, '.lc-ov-quota-cell'))
    await click(query<HTMLButtonElement>(m.container, '.lc-ov-quota-detail-action'))
    assert.equal(overviewStore.day(), today, 'the day rides the open')
    await m.unmount()
  })

  test('an unpersisted hide (a rejected write) rolls back to a visible entry', async () => {
    // The fail-open contract, end to end: a settings store whose scope died
    // before the write landed must not leave the entry hidden.
    const settings = createContextSettings()
    const Toggled = makeOverviewButton(kit, ctx, settings)
    let rejectSet: ((err: unknown) => void) | undefined
    settings.attach({
      getSnapshot: () => ({ status: 'ready', value: {}, writable: true }),
      subscribe: () => () => {},
      set: () => new Promise((_, reject) => { rejectSet = reject }),
    })
    const m = await mount(h(Toggled, { wide: true }))
    await act(async () => { settings.set('insightsEntry', 'hide') })
    assert.equal(queryAll(m.container, '.lc-ov-widget').length, 0, 'the optimistic echo hides first')
    await act(async () => { rejectSet?.(new Error('transport down')) })
    assert.ok(query(m.container, '.lc-ov-widget'), 'the rollback restores the entry')
    await m.unmount()
  })
})
