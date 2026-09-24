/**
 * dsh-context — Client half (installed package bundle entry).
 *
 * Registers a "上下文/Context" tab in the conversation view ring
 * (`conversation.view` slot, beside Chat/Trajectory) and renders the
 * context-composition timeline: current makeup, per-request stacked-bar
 * history, context events, and the live message list.
 *
 * Since v0.9 the tab rides the harness's session-projection pipeline
 * (`contextTimeline` projection key), read from the framework standard kit
 * (`useProjection('contextTimeline')`, a standard prop on every session-scope
 * slot component). The wire value is the split generation's slim head; the
 * heavy collections arrive on demand from the host's detail endpoint, one
 * read per viewing client (timelineSource.ts). No polling, no stale-while-
 * revalidate cache.
 *
 * This module is the body of the package's `./client` bundle: tsdown
 * (tsdown.config.ts) bundles it (external `react` — the browser module table
 * supplies it via the injected `require`) into the web boot handoff
 * (`window.__ModuleLoader__.load({id, factory})`). All imports from other
 * client modules are inlined by the bundler; everything here is zero-runtime
 * beyond the bundled source.
 */

import { createElement as h } from 'react'
import { DICT_EN, DICT_ZH } from './i18n'
import { registerContextCommand } from './command'
import { makeContextModal } from './components/contextModal'
import { makeOverviewButton } from './components/overviewButton'
import { makeOverviewPanel } from './components/overviewPanel'
import { makeSettingsCard } from './components/settingsCard'
import { modalStoreOf } from './modalStore'
import type { ClientCtx } from './services'
import { createContextSettings, type ConfigFormsFace, type SettingsField } from './settings'
import { makeContextView } from './components/contextView'
import { makeContextJumpButton } from './components/contextJump'
import { watchHistoryFaces } from './historyPage'
import { watchPlacement } from './placement'
import { watchSidebarContextTab } from './sidebar'
import { overviewStore } from './overviewStore'
import { makeViewKit } from './viewkit'

// Theme-native styles: the bundle's global-CSS channel injects each sheet as
// a plugin-owned <style data-plugin> tag at factory execution (the web boot
// loader and the HMR receiver claim tags carrying data-plugin). Import order
// IS cascade order across same-specificity rules: the Tailwind utilities
// first (the sibling sheets keep winning same-specificity ties), then base,
// then the per-component sheets in their original section order.
import './styles/tailwind.css'
import './styles/base.css'
import './styles/stats.css'
import './styles/jump.css'
import './styles/settings.css'
import './styles/stackedBar.css'
import './styles/trendChart.css'
import './styles/requestDetail.css'
import './styles/events.css'
import './styles/fileCard.css'
import './styles/modal.css'
import './styles/browser.css'
import './styles/detailSections.css'
import './styles/attachments.css'
import './styles/agentGraph.css'
import './styles/overview.css'

const NS = 'dsh-context'

function apply(ctx: ClientCtx): void {
  // Bilingual dictionaries, registered via ctx.effect so a stop or HMR reload
  // disposes them; the tab label thunk and all UI text follow the active
  // locale through the bound translate — missing keys resolve through the
  // harness chain (en fallback, then the key).
  ctx.effect(() => {
    return ctx.locale.register(NS, { zh: DICT_ZH, en: DICT_EN })
  }, 'dsh-context: dictionaries')
  const t = ctx.locale.bind(NS)

  const kit = makeViewKit(t)
  // History face of the harness gateway remotes, resolved through the
  // DECLARED inject — a non-declared read of the traced `remote.session`
  // proxy throws ("cannot get property … without inject") and would take
  // the browser down with the view. Injection waits for the service; a
  // harness that never composes the namespace never fires the callback and
  // the targeted fetches simply stay absent.
  watchHistoryFaces(ctx)
  const settings = createContextSettings()
  const ContextView = makeContextView(ctx, kit, settings)

  // Placement: the per-user `defaultPlacement` preference picks which
  // registration carries the view — the conversation tab, the right Sidebar
  // (dsh 0.1.5-rc.1+, optional by contract), or both (the default). Each
  // mount owns its disposer so the watcher takes down exactly what a
  // preference flip drops (see placement.ts).
  ctx.effect(() => watchPlacement(settings, {
    tab: () => ctx.slots.inject('conversation.view', () => {
      return ctx.slots.register(
        // order 20 renders right of Chat (0) and Trajectory (10); the locale
        // namespace put the framework `t` seat on the component's props too.
        { name: 'conversation.view', id: 'context', order: 20, locale: NS, label: () => t('tab') },
        props => h(ContextView, props),
      )
    }),
    sidebar: () => watchSidebarContextTab(ctx, ContextView, t, NS),
  }), 'dsh-context: placement')

  // Chat → Context jump: an icon in each finalized reply's action row that
  // opens the Context tab on the right Sidebar pinned to that reply's turn —
  // falling back to the conversation tab wherever the sidebar serves no tab
  // (see contextJump.tsx; the relay and view activation live in viewFocus.ts).
  const ContextJump = makeContextJumpButton(ctx, kit)
  ctx.slots.inject('conversation.chat.assistant-actions', () => {
    return ctx.slots.register(
      // After the shipped feedback entry (10), still inside the icon row.
      { name: 'conversation.chat.assistant-actions', id: 'context-jump', order: 20, locale: NS },
      props => h(ContextJump, props),
    )
  })

  // `/context` slash command: opens the context modal (see command.ts for
  // the trigger source). The modal itself renders from the input overlay
  // slot, opened per session through the hooks-compartment store.
  registerContextCommand(ctx, kit)
  const ContextModal = makeContextModal(ctx, kit, settings)
  ctx.slots.inject('conversation.input.overlay', () => {
    return ctx.slots.register(
      { name: 'conversation.input.overlay', id: 'context-modal', order: 10, locale: NS,
        inject: (sessionId = '') => ({ hooks: { contextModal: modalStoreOf(sessionId) } }) },
      props => h(ContextModal, props),
    )
  })

  // The Context Dashboard (see components/overviewPanel.tsx): the cross-session
  // insight surface. The entry is a footer action — the harness stacks those
  // directly above Settings on the sidebar foot; the overlay it opens renders
  // from the frame-wide shell.overlay seat, and the module store
  // (overviewStore.ts) carries the open flag between the two registrations.
  // Both seats are root-scope list slots present since the supported baseline.
  const OverviewButton = makeOverviewButton(kit, ctx, settings)
  ctx.slots.inject('sidebar.footer.action', () => {
    return ctx.slots.register(
      { name: 'sidebar.footer.action', id: 'context-overview', order: 10, locale: NS },
      // Root-scope seats: the owner props (wide, the standard kit) arrive untyped.
      props => h(OverviewButton, props as unknown as Parameters<typeof OverviewButton>[0]),
    )
  })
  const OverviewPanel = makeOverviewPanel(ctx, kit)

  // The dashboard is a cross-plugin SURFACE: the usage cells live here, but
  // the figures come from whoever provides them (codex-connect publishes
  // `codexQuota`). A plugin that owns usage data opens THIS panel from its own
  // card, so publish the smallest handle for that: open (optionally pinned to
  // one day) plus the current pin. Consumers read it optionally through
  // `ctx.get("contextOverview")`; it is owned by this plugin fiber and goes
  // away with it.
  ctx.provide('contextOverview', {
    /** Open the dashboard, optionally pinned to one day key. */
    open: (day?: string) => { overviewStore.open(day) },
    /** The day the panel is pinned to (null when unpinned). */
    day: () => overviewStore.day(),
  })
  ctx.slots.inject('shell.overlay', () => {
    return ctx.slots.register(
      { name: 'shell.overlay', id: 'context-overview', order: 10, locale: NS },
      props => h(OverviewPanel, props as unknown as Parameters<typeof OverviewPanel>[0]),
    )
  })

  // Per-user display preferences: bind the Host-served `dsh-context`
  // configuration form and claim its Plugins settings tab while the Host serves
  // the namespace. Optional composition — a deployment without the
  // configuration-form service (or with no settings service behind it) keeps
  // the schema defaults and shows no tab. `whileServed` watches the describe
  // mirror, so the tab appears exactly when the entry is served and goes away
  // when it is not.
  ctx.inject(['configForms'], (raw) => {
    const c = raw as ClientCtx & { configForms?: ConfigFormsFace }
    const forms = c.configForms
    if (forms === undefined) return
    c.effect(() => settings.attach(forms.get(NS)), 'dsh-context: settings form')
    const SettingsCard = makeSettingsCard(kit)
    c.effect(() => forms.whileServed([NS], () => {
      // slots.inject returns its declaration-watch disposer; the minimal
      // services.ts face types it unknown, and whileServed needs the callable.
      return c.slots.inject('settings.plugins.tab', () => {
        return c.slots.register(
          { name: 'settings.plugins.tab', id: NS, order: 50, locale: NS,
            label: () => kit.t('settings.title'),
            inject: () => ({
              hooks: { contextSettings: settings.store },
              set: (field: SettingsField, value: string) => { settings.set(field, value) },
            }) },
          // Root-scope list slot: no sessionId on these props — the face
          // (hooks + set) arrives through the registration's inject.
          props => h(SettingsCard, props as unknown as Parameters<typeof SettingsCard>[0]),
        )
      }) as () => void
    }), 'dsh-context: settings card')
  })
}

module.exports = {
  name: 'dsh-context',
  inject: ['slots', 'locale'],
  apply,
}
