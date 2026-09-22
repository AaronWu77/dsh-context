// The shared account/quota grid (src/client/components/quotaCells.tsx): one
// cell per signed-in account window, the rank chips and legend that map cells
// to accounts, and every cell drill-down.

import { createElement as h } from 'react'
import assert from 'node:assert/strict'
import { describe, test } from 'vitest'
import { makeQuotaGrid } from '../../../src/client/components/quotaCells'
import { TestClientCtx, asClientCtx } from '../helpers/harness'
import { click, makeKit, mount, query, queryAll, text } from '../helpers/kit'

const TODAY = '2026-09-21'
const DAYS = { [TODAY]: { tokens: 1234, requests: 7, sessions: 3 } }
const RESET_5H = Math.floor(Date.now() / 1000) + 3_600
const RESET_7D = Math.floor(Date.now() / 1000) + 86_400 * 4

/** One window fixture. */
function window5h(percent: number): Record<string, unknown> {
  return { bucketId: 'five', remainingPercent: percent, windowSeconds: 18_000, resetAt: RESET_5H }
}
/** The weekly window fixture. */
function window7d(percent: number): Record<string, unknown> {
  return { bucketId: 'week', remainingPercent: percent, windowSeconds: 604_800, resetAt: RESET_7D }
}

/** A codexQuota stand-in republishing one fixed snapshot. */
function serviceOf(snapshot: unknown): { snapshot: () => unknown; subscribe: () => () => void } {
  return { snapshot: () => snapshot, subscribe: () => () => {} }
}

async function mountGrid(
  quota: unknown,
  onSelectDay?: (day: string | null) => void,
): Promise<ReturnType<typeof mount> extends Promise<infer M> ? M : never> {
  const ctx = asClientCtx(new TestClientCtx({
    services: quota === undefined ? {} : { codexQuota: serviceOf(quota) },
  }))
  const Grid = makeQuotaGrid(ctx, makeKit())
  return mount(h(Grid, { days: DAYS, today: TODAY, ...(onSelectDay === undefined ? {} : { onSelectDay }) }))
}

/** The two-account snapshot: the active one plus a second subscription. */
const TWO_ACCOUNTS = {
  windows: [window5h(62)],
  accounts: [
    { accountKey: 'acct_a', label: 'acct 43a31b', active: true, windows: [window5h(62), window7d(34)], fetchedAt: Date.now() - 120_000 },
    { accountKey: 'acct_b', label: 'acct e730b0', active: false, windows: [window5h(88), window7d(51)], fetchedAt: Date.now() - 60_000 },
  ],
}

describe('QuotaGrid', () => {
  test('renders one window cell per account and maps them with rank chips', async () => {
    const m = await mountGrid(TWO_ACCOUNTS)
    // Today plus two accounts x two windows.
    assert.equal(queryAll(m.container, '.lc-ov-quota-cell').length, 5)
    const ranks = queryAll(m.container, '.lc-ov-quota-rank').map(el => el.textContent)
    assert.deepEqual(ranks, ['#1', '#1', '#2', '#2', '#1', '#2'], 'the four cells then the legend')
    assert.deepEqual(queryAll(m.container, '.lc-ov-quota-legend-label').map(el => el.textContent), ['acct 43a31b', 'acct e730b0'])
    assert.equal(queryAll(m.container, '.lc-ov-quota-legend-active').length, 1, 'only the active account is marked')
    await m.unmount()
  })

  test('a window drill-down names the account, the length, the reset instant and the refresh', async () => {
    const m = await mountGrid(TWO_ACCOUNTS)
    await click(queryAll<HTMLButtonElement>(m.container, '.lc-ov-quota-cell')[1]!)
    const labels = queryAll(m.container, '.lc-ov-quota-detail-label').map(el => el.textContent)
    assert.deepEqual(labels, ['Account', 'Window', 'Remaining', 'Resets at', 'Last refreshed'])
    assert.ok(query(m.container, '.lc-ov-quota-detail-value').textContent !== '')
    // A second click on the same cell closes it again.
    await click(queryAll<HTMLButtonElement>(m.container, '.lc-ov-quota-cell')[1]!)
    assert.equal(queryAll(m.container, '.lc-ov-quota-detail').length, 0)
    await m.unmount()
  })

  test('the today drill-down splits the day and can pin it in the list', async () => {
    const pinned: Array<string | null> = []
    const m = await mountGrid(TWO_ACCOUNTS, day => { pinned.push(day) })
    await click(query(m.container, '.lc-ov-quota-cell'))
    const labels = queryAll(m.container, '.lc-ov-quota-detail-label').map(el => el.textContent)
    assert.deepEqual(labels, ['Tokens Used', 'Active sessions', 'Requests'])
    const values = queryAll(m.container, '.lc-ov-quota-detail-value').map(el => el.textContent)
    assert.deepEqual(values, ['1.2k', '3', '7'])
    await click(query<HTMLButtonElement>(m.container, '.lc-ov-quota-detail-action'))
    assert.deepEqual(pinned, [TODAY])
    await m.unmount()
  })

  test('the sidebar widget renders one row per account instead of cells', async () => {
    const ctx = asClientCtx(new TestClientCtx({ services: { codexQuota: serviceOf(TWO_ACCOUNTS) } }))
    const Grid = makeQuotaGrid(ctx, makeKit())
    const m = await mount(h(Grid, { days: DAYS, today: TODAY, compact: true }))
    const rows = queryAll(m.container, '.lc-ov-quota-account')
    assert.equal(rows.length, 2, 'one row per account')
    assert.equal(queryAll(m.container, '.lc-ov-quota-cell').length, 1, 'only the today summary cell')
    assert.equal(queryAll(m.container, '.lc-ov-quota-legend').length, 0, 'the rows carry the keys themselves')
    const texts = rows.map(row => text(row).replace(/\s+/gu, ' '))
    assert.ok(texts[0]!.includes('acct 43a31b') && texts[0]!.includes('5h') && texts[0]!.includes('62%'), texts[0])
    assert.ok(texts[0]!.includes('7d') && texts[0]!.includes('34%'), texts[0])
    assert.ok(texts[1]!.includes('acct e730b0') && texts[1]!.includes('88%') && texts[1]!.includes('51%'), texts[1])
    assert.deepEqual(queryAll(m.container, '.lc-ov-quota-rank').map(el => el.textContent), ['#1', '#2'])
    // The row drill-down reports both windows of THAT account.
    await click(rows[0]!)
    const labels = queryAll(m.container, '.lc-ov-quota-detail-label').map(el => el.textContent)
    assert.deepEqual(labels.slice(0, 2), ['Codex 5h quota', 'Codex 7d quota'])
    assert.equal(labels[2], 'Last refreshed', 'the row also reports when it was read')
    const values = queryAll(m.container, '.lc-ov-quota-detail-value').map(el => el.textContent)
    assert.ok(values[0]!.startsWith('62% left'), values[0])
    await m.unmount()
  })

  test('a compact widget with no service renders only the day summary', async () => {
    const ctx = asClientCtx(new TestClientCtx({ services: {} }))
    const Grid = makeQuotaGrid(ctx, makeKit())
    const m = await mount(h(Grid, { days: DAYS, today: TODAY, compact: true }))
    assert.equal(queryAll(m.container, '.lc-ov-quota-cell').length, 1)
    assert.equal(queryAll(m.container, '.lc-ov-quota-account').length, 0)
    await m.unmount()
  })
  test('a single-account service keeps the plain grid: no ranks, no legend', async () => {
    const m = await mountGrid({ windows: [window5h(62), window7d(34)] })
    assert.equal(queryAll(m.container, '.lc-ov-quota-cell').length, 3)
    assert.equal(queryAll(m.container, '.lc-ov-quota-rank').length, 0)
    assert.equal(queryAll(m.container, '.lc-ov-quota-legend').length, 0)
    await m.unmount()
  })

  test('a missing service renders only the local day cell', async () => {
    const m = await mountGrid(undefined)
    assert.equal(queryAll(m.container, '.lc-ov-quota-cell').length, 1)
    assert.equal(queryAll(m.container, '.lc-ov-quota-legend').length, 0)
    await m.unmount()
  })
})
