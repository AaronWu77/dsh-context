// The Context Dashboard's sidebar-foot entry (src/client/components/
// overviewButton.tsx): wide/rail rendering, the running badge, and the
// store flip on click.

import { createElement as h } from 'react'
import assert from 'node:assert/strict'
import { afterEach, describe, test } from 'vitest'
import { makeOverviewButton } from '../../../src/client/components/overviewButton'
import { overviewStore } from '../../../src/client/overviewStore'
import { click, makeKit, mount, query, queryAll } from '../helpers/kit'

const kit = makeKit()
const Button = makeOverviewButton(kit)

afterEach(() => {
  overviewStore.set(false)
})

/** A useSessions stand-in over a static snapshot. */
const useSessionsOf = (snapshot: unknown) => (<T>(sel: (s: unknown) => T): T => sel(snapshot))

describe('OverviewButton', () => {
  test('the wide column renders icon and label; the rail renders the icon alone', async () => {
    const wide = await mount(h(Button, { wide: true }))
    assert.equal(query(wide.container, '.lc-ov-entry-label').textContent, 'Context Insights')
    assert.equal(query(wide.container, 'button.lc-ov-entry').getAttribute('aria-label'), 'Context Insights')
    await wide.unmount()

    const rail = await mount(h(Button, { wide: false }))
    assert.equal(queryAll(rail.container, '.lc-ov-entry-label').length, 0)
    assert.ok(query(rail.container, '.lc-ov-entry-icon'))
    await rail.unmount()

    // An absent wide flag (a foreign owner) keeps the label hidden.
    const bare = await mount(h(Button, {}))
    assert.equal(queryAll(bare.container, '.lc-ov-entry-label').length, 0)
    await bare.unmount()
  })

  test('the badge counts running sessions and hides at zero', async () => {
    const running = useSessionsOf({ byId: { a: { running: true }, b: { running: false }, c: { running: true } } })
    const m = await mount(h(Button, { wide: true, useSessions: running }))
    assert.equal(query(m.container, '.lc-ov-badge').textContent, '2')
    await m.unmount()

    const idle = useSessionsOf({ byId: { a: { running: false } } })
    const calm = await mount(h(Button, { wide: true, useSessions: idle }))
    assert.equal(queryAll(calm.container, '.lc-ov-badge').length, 0)
    await calm.unmount()

    // No sessions seat at all: no badge, no throw.
    const seatless = await mount(h(Button, { wide: true }))
    assert.equal(queryAll(seatless.container, '.lc-ov-badge').length, 0)
    await seatless.unmount()
  })

  test('clicking opens the overview through the shared store', async () => {
    assert.equal(overviewStore.getSnapshot(), false)
    const m = await mount(h(Button, { wide: true }))
    await click(query(m.container, 'button.lc-ov-entry'))
    assert.equal(overviewStore.getSnapshot(), true)
    await m.unmount()
  })

  test('the zh locale renders the translated label', async () => {
    const ZhButton = makeOverviewButton(makeKit('zh'))
    const m = await mount(h(ZhButton, { wide: true }))
    assert.equal(query(m.container, '.lc-ov-entry-label').textContent, '上下文洞察')
    await m.unmount()
  })
})
