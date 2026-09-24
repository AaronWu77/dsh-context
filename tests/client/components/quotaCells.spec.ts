// The shared account/quota grid (src/client/components/quotaCells.tsx): one
// cell per signed-in account window, the rank chips and legend that map cells
// to accounts, and every cell drill-down.

import { act, createElement as h } from 'react'
import assert from 'node:assert/strict'
import { afterEach, beforeEach, describe, test, vi } from 'vitest'
import { makeQuotaGrid } from '../../../src/client/components/quotaCells'
import { resetPlatformBalance } from '../../../src/client/balance'
import { TestClientCtx, asClientCtx } from '../helpers/harness'
import { click, flush, keydown, makeKit, mount, query, queryAll, text } from '../helpers/kit'

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
    // No account is marked as "active": both subscriptions are usable, so the
    // rank chips are the only account identity on the grid.
    assert.equal(queryAll(m.container, '.lc-ov-quota-rank-on').length, 0)
    assert.equal(queryAll(m.container, '.lc-ov-quota-legend-active').length, 0)
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


describe('QuotaGrid platform balance and staleness paths', () => {
  beforeEach(() => { resetPlatformBalance() })
  afterEach(() => {
    vi.unstubAllGlobals()
    resetPlatformBalance()
  })

  /** Serve the platform balance route with these entries. */
  function stubBalance(balances: unknown[]): void {
    resetPlatformBalance()
    vi.stubGlobal('fetch', async () => ({
      ok: true,
      json: async () => ({ ok: true, value: { isAvailable: true, balances } }),
    }))
  }

  /** A codexQuota service whose snapshot the test can replace live. */
  function liveService(initial: unknown): { snapshot: () => unknown; subscribe: (l: () => void) => () => void; set: (v: unknown) => void } {
    let current = initial
    const listeners = new Set<() => void>()
    return {
      snapshot: () => current,
      subscribe: (listener) => { listeners.add(listener); return () => { listeners.delete(listener) } },
      set: (value) => { current = value; for (const listener of listeners) listener() },
    }
  }

  test('the platform balance leads the grid; its drill-down splits it, and the panel closes', async () => {
    stubBalance([{ currency: 'CNY', total: 110, granted: 10, toppedUp: 100 }])
    const m = await mountGrid(TWO_ACCOUNTS)
    await flush()
    const cells = queryAll<HTMLButtonElement>(m.container, '.lc-ov-quota-cell')
    assert.ok(text(cells[0]!).includes('¥110.00'), 'the balance cell leads the grid')
    await click(cells[0]!)
    assert.deepEqual(
      queryAll(m.container, '.lc-ov-quota-detail-label').map(el => el.textContent),
      ['Total', 'Granted', 'Topped up', 'Currency'],
    )
    assert.deepEqual(
      queryAll(m.container, '.lc-ov-quota-detail-value').map(el => el.textContent),
      ['¥110.00', '¥10.00', '¥100.00', 'CNY'],
    )
    // Clicking the panel body itself exercises its propagation stop.
    await click(query(m.container, '.lc-ov-quota-detail-title'))
    assert.equal(queryAll(m.container, '.lc-ov-quota-detail').length, 1)
    await click(query<HTMLButtonElement>(m.container, '.lc-ov-quota-detail-close'))
    assert.equal(queryAll(m.container, '.lc-ov-quota-detail').length, 0)
    await m.unmount()
  })

  test('a USD balance reads with the dollar sign', async () => {
    stubBalance([{ currency: 'USD', total: 12.5, granted: 2.5, toppedUp: 10 }])
    const m = await mountGrid(TWO_ACCOUNTS)
    await flush()
    assert.ok(text(queryAll(m.container, '.lc-ov-quota-cell')[0]!).includes('$12.50'))
    await m.unmount()
  })

  test('a currency the platform names without a symbol shows its code', async () => {
    stubBalance([{ currency: 'EUR', total: 5, granted: 0, toppedUp: 5 }])
    const m = await mountGrid(TWO_ACCOUNTS)
    await flush()
    assert.ok(text(queryAll(m.container, '.lc-ov-quota-cell')[0]!).includes('EUR 5.00'))
    await m.unmount()
  })

  test('a minute-length window labels in minutes and omits unknown instants', async () => {
    const account = {
      accountKey: 'acct_m', label: '', active: true,
      windows: [{ bucketId: 'm', remainingPercent: 50, windowSeconds: 90 }],
    }
    const m = await mountGrid({ windows: [], accounts: [account] })
    const cell = queryAll<HTMLButtonElement>(m.container, '.lc-ov-quota-cell')[1]!
    assert.ok(text(cell).includes('Codex 2m quota'), 'a 90s window reads as 2m')
    await click(cell)
    const labels = queryAll(m.container, '.lc-ov-quota-detail-label').map(el => el.textContent)
    assert.deepEqual(labels, ['Window', 'Remaining'], 'an unknown reset and refresh are omitted')
    await m.unmount()
  })

  test('windows of the same length keep the scarcer value', async () => {
    // A looser later window never displaces an earlier one; a scarcer later one does.
    const account = { accountKey: 'acct_d', label: 'acct dedupe', active: true, windows: [window5h(40), window5h(62), window5h(30)] }
    const m = await mountGrid({ windows: [], accounts: [account] })
    const cells = queryAll(m.container, '.lc-ov-quota-cell')
    assert.equal(cells.length, 2, 'today plus the one kept window')
    assert.ok(text(cells[1]!).includes('30%'), 'the most constrained window wins')
    await m.unmount()
  })

  test('a today detail without a pin relay renders no filter action', async () => {
    const m = await mountGrid(TWO_ACCOUNTS)
    await click(query(m.container, '.lc-ov-quota-cell'))
    assert.equal(queryAll(m.container, '.lc-ov-quota-detail').length, 1)
    assert.equal(queryAll(m.container, '.lc-ov-quota-detail-action').length, 0, 'no relay, no action')
    await m.unmount()
  })

  test('a window whose reset instant has passed or is unreadable omits it', async () => {
    const account = {
      accountKey: 'acct_r', label: '', active: true,
      windows: [
        { bucketId: 'past', remainingPercent: 10, windowSeconds: 3600, resetAt: Math.floor(Date.now() / 1000) - 60 },
        { bucketId: 'bad', remainingPercent: 20, windowSeconds: 7200, resetAt: Number.NaN },
      ],
    }
    const m = await mountGrid({ windows: [], accounts: [account] })
    const cells = queryAll<HTMLButtonElement>(m.container, '.lc-ov-quota-cell')
    // cells[0] is the today summary; the two window cells follow.
    await click(cells[1]!)
    assert.ok(queryAll(m.container, '.lc-ov-quota-detail-label').map(el => el.textContent).includes('Resets at'), 'a passed reset instant is still readable')
    await click(cells[1]!)
    await click(cells[2]!)
    assert.ok(!queryAll(m.container, '.lc-ov-quota-detail-label').map(el => el.textContent).includes('Resets at'), 'an unreadable reset instant is omitted')
    await click(cells[2]!)
    await m.unmount()
  })

  test('an empty account list draws only the local day', async () => {
    const m = await mountGrid({ windows: [] })
    assert.equal(queryAll(m.container, '.lc-ov-quota-cell').length, 1)
    await m.unmount()
  })

  test('a legacy credits-only service folds its credits into the active account', async () => {
    const m = await mountGrid({ windows: [window5h(62)], credits: { unlimited: true } })
    assert.equal(queryAll(m.container, '.lc-ov-quota-cell').length, 2)
    await m.unmount()
  })

  test('a codexQuota value missing its subscribe face is ignored', async () => {
    const ctx = asClientCtx(new TestClientCtx({ services: { codexQuota: { snapshot: () => null } } }))
    const Grid = makeQuotaGrid(ctx, makeKit())
    const m = await mount(h(Grid, { days: DAYS, today: TODAY }))
    assert.equal(queryAll(m.container, '.lc-ov-quota-cell').length, 1)
    await m.unmount()
  })

  test('a kit-less ctx (no get) renders only the local day', async () => {
    const Grid = makeQuotaGrid({} as never, makeKit())
    const m = await mount(h(Grid, { days: DAYS, today: TODAY }))
    assert.equal(queryAll(m.container, '.lc-ov-quota-cell').length, 1)
    await m.unmount()
  })

  test('a cell key stays inside the cell', async () => {
    const m = await mountGrid(TWO_ACCOUNTS)
    await keydown('Enter', query(m.container, '.lc-ov-quota-cell'))
    assert.equal(queryAll(m.container, '.lc-ov-quota-detail').length, 0, 'a cell key never opens a detail')
    await m.unmount()
  })

  test('a compact grid with no day and no accounts renders nothing', async () => {
    const ctx = asClientCtx(new TestClientCtx({ services: {} }))
    const Grid = makeQuotaGrid(ctx, makeKit())
    const m = await mount(h(Grid, { days: {}, today: TODAY, compact: true }))
    assert.equal(m.container.childElementCount, 0)
    await m.unmount()
  })

  test('a named grid labels a label-less account as current in the legend and window detail', async () => {
    const accounts = [
      { accountKey: 'a1', label: '', active: true, windows: [window5h(62)] },
      { accountKey: 'a2', label: 'acct two', active: false, windows: [window5h(50)] },
    ]
    const m = await mountGrid({ windows: [], accounts })
    assert.deepEqual(queryAll(m.container, '.lc-ov-quota-legend-label').map(el => el.textContent), ['current', 'acct two'])
    await click(queryAll<HTMLButtonElement>(m.container, '.lc-ov-quota-cell')[1]!)
    assert.deepEqual(queryAll(m.container, '.lc-ov-quota-detail-label').map(el => el.textContent).slice(0, 2), ['Account', 'Window'])
    assert.equal(queryAll(m.container, '.lc-ov-quota-detail-value')[0]!.textContent, 'current')
    await m.unmount()
  })

  test('a compact account row opens on click and ignores keys; the current account is named', async () => {
    const ctx = asClientCtx(new TestClientCtx({ services: { codexQuota: serviceOf({ windows: [window5h(62)] }) } }))
    const Grid = makeQuotaGrid(ctx, makeKit())
    const m = await mount(h(Grid, { days: DAYS, today: TODAY, compact: true }))
    const row = query<HTMLButtonElement>(m.container, '.lc-ov-quota-account')
    assert.ok(text(row).includes('current'), 'a label-less account reads as current')
    await keydown('Enter', row)
    assert.equal(queryAll(m.container, '.lc-ov-quota-detail').length, 0, 'a row key is a no-op')
    await click(row)
    assert.deepEqual(queryAll(m.container, '.lc-ov-quota-detail-label').map(el => el.textContent).slice(0, 1), ['Codex 5h quota'])
    await click(row)
    assert.equal(queryAll(m.container, '.lc-ov-quota-detail').length, 0, 'a second click closes the row detail')
    await m.unmount()
  })

  test('a compact account detail lists its windows, marking unknown resets', async () => {
    const account = { accountKey: 'a1', label: '', active: true, windows: [{ bucketId: 'm', remainingPercent: 50, windowSeconds: 90 }] }
    const ctx = asClientCtx(new TestClientCtx({ services: { codexQuota: serviceOf({ windows: [], accounts: [account] }) } }))
    const Grid = makeQuotaGrid(ctx, makeKit())
    const m = await mount(h(Grid, { days: DAYS, today: TODAY, compact: true }))
    await click(query(m.container, '.lc-ov-quota-account'))
    assert.equal(queryAll(m.container, '.lc-ov-quota-detail-value')[0]!.textContent, '50% left', 'no reset suffix for an unknown instant')
    await m.unmount()
  })

  test('a live service dropping an account degrades an open window detail', async () => {
    const service = liveService({ windows: [], accounts: [{ accountKey: 'a1', label: 'acct one', active: true, windows: [window5h(62)], fetchedAt: Date.now() }] })
    const ctx = asClientCtx(new TestClientCtx({ services: { codexQuota: service } }))
    const Grid = makeQuotaGrid(ctx, makeKit())
    const m = await mount(h(Grid, { days: DAYS, today: TODAY }))
    await click(queryAll<HTMLButtonElement>(m.container, '.lc-ov-quota-cell')[1]!)
    assert.equal(queryAll(m.container, '.lc-ov-quota-detail').length, 1)
    await act(async () => { service.set({ windows: [], accounts: [] }) })
    assert.equal(queryAll(m.container, '.lc-ov-quota-detail').length, 0, 'the stale window detail drops')
    await m.unmount()
  })

  test('a live service dropping an account degrades an open account detail', async () => {
    const service = liveService({ windows: [], accounts: [{ accountKey: 'a1', label: 'acct one', active: true, windows: [window5h(62)] }] })
    const ctx = asClientCtx(new TestClientCtx({ services: { codexQuota: service } }))
    const Grid = makeQuotaGrid(ctx, makeKit())
    const m = await mount(h(Grid, { days: DAYS, today: TODAY, compact: true }))
    await click(query(m.container, '.lc-ov-quota-account'))
    assert.equal(queryAll(m.container, '.lc-ov-quota-detail').length, 1)
    await act(async () => { service.set({ windows: [], accounts: [] }) })
    assert.equal(queryAll(m.container, '.lc-ov-quota-detail').length, 0, 'the stale account detail drops')
    await m.unmount()
  })
})

