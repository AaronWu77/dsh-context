// The Quota & Usage emblem (src/client/icon.tsx): the harness gauge primitive
// that fills the right-Sidebar tab type's two glyph seats — the guide capsule
// and the chip title — so the plugin's own seats carry the same glyph as the
// footer widget.

import { createElement as h } from 'react'
import assert from 'node:assert/strict'
import { describe, test } from 'vitest'
import { ContextIcon, makeContextTabTitle } from '../../src/client/icon'
import { makeKit, mount, query, queryAll, text } from './helpers/kit'

describe('ContextIcon', () => {
  test('draws the harness gauge at the requested edge', async () => {
    const m = await mount(h(ContextIcon, { size: 16, className: 'lc-title-icon' }))
    const svg = query<SVGSVGElement>(m.container, 'svg')
    assert.equal(svg.getAttribute('width'), '16')
    assert.equal(svg.getAttribute('height'), '16')
    assert.equal(svg.getAttribute('viewBox'), '0 0 16 16')
    assert.equal(svg.getAttribute('class'), 'lc-title-icon')
    // Decorative: the label beside the glyph carries the accessible name.
    assert.equal(svg.getAttribute('aria-hidden'), 'true')
    // The glyph strokes and its hub inherit the surrounding text colour, so the
    // emblem follows whichever theme seats it.
    const paths = queryAll<SVGPathElement>(m.container, 'path')
    assert.equal(paths.length, 2)
    assert.ok(paths.every(path => path.getAttribute('stroke') === 'currentColor'))
    assert.equal(query<SVGCircleElement>(m.container, 'circle').getAttribute('fill'), 'currentColor')
    await m.unmount()
  })

  test('defaults to a size and can drop the class', async () => {
    const m = await mount(h(ContextIcon, {}))
    const svg = query<SVGSVGElement>(m.container, 'svg')
    assert.equal(svg.getAttribute('width'), '20')
    assert.equal(svg.getAttribute('height'), '20')
    assert.equal(svg.getAttribute('class'), null)
    await m.unmount()
  })
})

describe('makeContextTabTitle — the chip-title seat', () => {
  test('renders the emblem beside the plugin label in the active locale', async () => {
    const { t } = makeKit()
    const Title = makeContextTabTitle(t)
    const m = await mount(h(Title))
    assert.equal(query<SVGSVGElement>(m.container, 'svg').getAttribute('width'), '16')
    const label = query<HTMLSpanElement>(m.container, '.lc-title-label')
    assert.equal(text(label), 'Quota & Usage')
    await m.unmount()
  })

  test('follows the bound translate at render (zh label)', async () => {
    const Title = makeContextTabTitle(makeKit('zh').t)
    const m = await mount(h(Title))
    assert.equal(text(m.container), '额度与用量')
    await m.unmount()
  })
})
