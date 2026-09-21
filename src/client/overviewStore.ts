/**
 * The Context Dashboard's open-state store. Module-level so the footer entry
 * (sidebar.footer.action) and the overlay (shell.overlay) — two separate
 * slot registrations — share the one flag: the button flips it, the panel
 * subscribes and renders. Root-scoped and global (unlike the /context
 * modal's per-session stores): the overview is a frame-wide surface, one
 * instance across sessions.
 */

export interface OverviewStore {
  subscribe: (listener: () => void) => () => void
  getSnapshot: () => boolean
  set: (open: boolean) => void
  /**
   * Open the dashboard, optionally pinned to one day — the widget's "today"
   * drill-down lands the session list on that date.
   * @param day - the day key to pin, or omitted for no pin.
   */
  open: (day?: string) => void
  /** The day the panel should pin on its next open (null when unpinned). */
  day: () => string | null
}

function createStore(): OverviewStore {
  let open = false
  let pinned: string | null = null
  const listeners = new Set<() => void>()
  // Arrow properties: the useSyncExternalStore call passes them unbound.
  return {
    subscribe: (listener) => {
      listeners.add(listener)
      return () => { listeners.delete(listener) }
    },
    getSnapshot: () => open,
    set: (next) => {
      if (next === open) return
      open = next
      for (const listener of listeners) listener()
    },
    open: (day) => {
      pinned = day ?? null
      if (open) {
        // Already open: a fresh pin still has to reach the panel.
        for (const listener of listeners) listener()
        return
      }
      open = true
      for (const listener of listeners) listener()
    },
    day: () => pinned,
  }
}

export const overviewStore: OverviewStore = createStore()
