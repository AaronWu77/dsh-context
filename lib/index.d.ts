import { z } from "zod";
import "@deepseek-ai/dsh-session";
import z$1 from "@deepseek-ai/schemastery";
import { Context } from "@deepseek-ai/cordis";
//#region src/host/activity.d.ts
/** The persisted fold state (the registry's `stateSchema` contract). */
interface ActivityState {
  days: Record<string, {
    tokens: number;
    requests: number;
  }>;
}
//#endregion
//#region src/host/headers.d.ts
/**
 * One stored tool: the v1 row shape carried the producer description and the
 * raw schema; folds since the #37 slim-down append metadata-only entries.
 */
interface StoredHeaderTool {
  name: string;
  tokens: number;
  description?: string;
  plugin?: string;
  schema?: unknown;
}
/** One stored epoch: v1 rows carried `system`; folds since carry `systemTokens`. */
interface StoredHeaderRecord {
  seq: number;
  time: number;
  system?: string;
  systemTokens?: number;
  tools: StoredHeaderTool[];
}
interface HeadersState {
  headers: StoredHeaderRecord[];
}
//#endregion
//#region src/host/logShapes.d.ts
/**
 * The decode bucket a stream's `block-start.blockType` names: the model's
 * thinking, the answer text, or the tool-call arguments. Undefined for an
 * unknown/hostile marker, whose interval then stays unattributed rather than
 * poisoning a bucket.
 */
type DecodeKind = 'reasoning' | 'text' | 'toolarg';
//#endregion
//#region src/host/fold.d.ts
/**
 * History retention bounds (configurable since 0.11 — see config.ts; these
 * are the defaults' values). The fold keeps per-STEP request records; once the
 * newest run count exceeds `maxKeptTurns`, the timeline is trimmed to the
 * most recent whole TURN runs (never cutting a turn in half), so turn
 * granularity can always show the full recent turn range instead of a
 * step-count fragment. The turn-run trim runs whenever the cap is crossed
 * (not only when the raw step bound is), so the bounded state stays at the
 * newest ~`maxKeptTurns` turns deterministically as a live log grows.
 */
interface TimelineState {
  /** Model-visible surface, newest last. */
  surface: SurfaceNode[];
  sums: Record<Category, number>;
  systemTokens: number;
  /**
   * The live system-prompt nodes, oldest first — a V3 log's `system/message`
   * surface nodes, or the single entry a V0/V2 `request/header.header.system`
   * envelope defines. `systemTokens` is the LAST entry with tokens > 0 (the
   * harness's own "last nonempty surviving system" rule), so an empty dormant
   * node keeps its position without clearing the prompt. Bounded by
   * SYSTEM_NODES_MAX. ABSENT on rows folded before this field existed — the
   * wire then serves no `systems` and the client falls back to the header
   * epoch's own envelope figure.
   */
  systems?: SystemPromptNode[];
  /**
   * Whether `systems` was built from the V0/V2 request ENVELOPE
   * (`header.system`) rather than from V3 `system/message` events. Only then
   * may a system-less header CLEAR the list: its canonical V0 meaning is
   * "this request has no system prompt", while a V3 header never carries one
   * (its prompt lives in the message history). Absent = log-sourced, and
   * never materialized as an `undefined`-valued property (plain-JSON
   * precondition — see the note above `model`).
   */
  systemsFromHeader?: true;
  toolsTokens: number;
  /**
   * The projection-cache precondition is plain JSON: a property whose value
   * is `undefined` makes the whole checkpoint unserializable
   * (`snapshotJsonValue` rejects it), which fails EVERY cache write for the
   * session — including the `title` projection row that powers the session
   * list after a restart. Optional fields therefore use absent properties
   * (`model`/`provider`/`lastModel`/`contextWindow` are simply not set until
   * a value is known) instead of `undefined`-valued ones. Reads via
   * `state.model` are identical for both shapes (`undefined` on miss).
   */
  model?: string;
  provider?: string;
  lastModel?: string;
  contextWindow?: number;
  requests: RequestRecord[];
  events: ContextEventRecord[];
  /**
   * Recently removed surface nodes (stamped COPIES carrying `gone`), in
   * removal order. Feeds the Context browser's per-step reconstruction.
   * Bounded two ways in trimState: capped to `maxArchiveNodes`, and pruned
   * to removals after the oldest retained request (older removals can only
   * serve steps the requests trim already forgot).
   */
  archived: SurfaceNode[];
  /**
   * Session-cost raw material: cumulative billed-token totals per
   * (provider, model), split into pricing periods for DeepSeek (see
   * SessionCostUsage / CostModelUsage). Running totals — never trimmed, so
   * the estimate always covers the COMPLETE session log even after the
   * request/event retention bounds cut in. Absent until a usage-reporting
   * request with a known model folds.
   */
  cost?: SessionCostUsage;
  /**
   * Whole-session human-input tally (see Snapshot.humanInputs): every
   * non-injection `user/message` plus every answered `ask_user_question`
   * result. Running total — never trimmed, like `cost`/`timing`. Absent until
   * the first human input folds.
   */
  humanInputs?: number;
  /**
   * The user's newest own message as a bounded one-line preview (the surface
   * node's first-text line). Last-wins — a newer human input replaces it, a
   * text-less one (images only) keeps the previous line. Additive-optional
   * like the 0.47 fields: cached rows folded before the field existed read
   * without it and the card just hides its preview line.
   */
  lastUser?: string;
  archiveFloor?: number;
  /**
   * The detail collections' revision marker (see ContextTimelineDetail):
   * bumped by every fold that mutates the request records, context events,
   * live surface, or the removed-node archive — the slim wire head carries
   * it so an open tab knows its fetched detail went stale. Absent until the
   * first detail fold (undefined reads as 0; never materialize an
   * `undefined`-valued property — the plain-JSON precondition above).
   */
  detailRev?: number;
  /**
   * Whole-session timing totals (see TimingTotals) — running sums over the
   * COMPLETE session log, like `cost`. Absent until the first step or tool
   * lifecycle folds in; created once and cloned-on-touch afterwards (the
   * object is shared with the persisted previous state — see `ensure`).
   */
  timing?: TimingTotals;
  /**
   * The open step's start instant, armed by `step/start` and consumed by the
   * `assistant/message` (TTFT/generation split) and `step/end` (wall time)
   * that follow it; `assistant/chunk` stamps `firstToken` on the step's first
   * token delta — absent when the stream carried none (legacy or aborted
   * steps), which leaves that call's model time unattributed. One slot, not a
   * map: steps are sequential in the log, so the newest `step/start` is the
   * one those events close — a hostile interleaved log degrades to skipped
   * durations, never to unbounded state. Same arm/remove lifecycle as
   * `pendingShadowedSeqs`.
   *
   * `decode` and `block` carry the generation split (reasoning / answer text /
   * tool arguments — see TimingTotals): a V0 log's `assistant/chunk`
   * `block-start` markers open `block` and close the previous one into
   * `decode`; a V2+ log carries no such events, so `decode` stays absent and
   * `assistant/message` reads the spans off its embedded stream instead.
   */
  stepStart?: {
    time: number;
    firstToken?: number;
    decode?: Record<DecodeKind, number>;
    block?: {
      kind: DecodeKind;
      since: number;
    };
  };
  /**
   * Tool callId → the call's name, start instant, and raw arguments, armed by
   * `tool/call` and DELETED when its `tool/result` folds in (one result per
   * call, in log order) — the map stays at pending-call size instead of
   * growing for the session's whole lifetime (it is persisted state,
   * shallow-copied by every fold step). The start instant prices the call's
   * duration into `timing.toolsMs` when the result arrives; the raw arguments
   * feed the file-op derivation (shared/fileOps.ts) at that same moment.
   */
  callNames: Record<string, {
    name: string;
    start: number;
    argsRaw?: string;
  }>;
  /**
   * Seq list of the surface nodes the next replacement will shadow, armed by
   * the metering event (`compaction/summary` | `compaction/prune`) and
   * consumed by the replacement that must follow it synchronously. The
   * producer's shadow price covers exactly these seqs — which can differ
   * from the replacement's declared range (pruned replacement nodes keep
   * their own seqs, beyond the range end) — so removal must follow the seqs.
   * Absent until armed, and REMOVED (not set to `undefined`) when consumed,
   * to keep the state plain JSON for the projection cache.
   */
  pendingShadowedSeqs?: number[];
  /**
   * The seq of the compaction/prune event that armed `pendingShadowedSeqs` —
   * the shadowed path rewrites that event's `tokens` from the gross shadow
   * price to the NET freed amount (removed nodes minus the synchronous
   * replacement), so the row matches the drop the trend chart shows. Same
   * arm/remove lifecycle as `pendingShadowedSeqs`.
   */
  pendingShadowEventSeq?: number;
  /**
   * The fold-derived file-operation log (the File Activity card's raw
   * material, shared/fileOps.ts): one record per executed file op, appended
   * in log order — at `tool/result` (the armed call's arguments + the
   * result's meta) and at a run_code result's flush of its nested
   * dispatches. Bounded by `maxFileOps`; the trim stamps `fileOpsFloor`.
   */
  fileOps: FileOpRecord[];
  /** The newest dropped op's seq (the card's coverage floor for the served op log). */
  fileOpsFloor?: number;
  /**
   * Nested Code-Mode ops buffered by their top run_code call id until the
   * parent's result folds (the dispatch events land BEFORE it, and the ops'
   * locate target is that result's seq). Flushed (and the key deleted) when
   * the result with that callId folds; absent until the first dispatch books
   * an op. Bounded by PENDING_CODE_OPS_MAX — a hostile log that never
   * settles a run_code cannot grow it.
   */
  pendingCodeOps?: Record<string, FileOpRecord[]>;
}
//#endregion
//#region src/shared/types.d.ts
declare module '@deepseek-ai/dsh-session-projection/types' {
  interface SessionProjectionMap {
    /**
     * The plugin's context timeline: current composition, counters, and the
     * headline anchor. Since the split generation the wire value is the SLIM
     * head (every delivery channel — session.list rows, control baselines,
     * push frames — carries it whole); the per-request history, context
     * events, and the surface/archive collections ride the on-demand detail
     * channel ({@link ContextTimelineDetail}, host/detail.ts). Channel-less
     * hosts keep the inline generation (the collections stay in the value).
     * Key absence = the plugin's host half is not composed.
     */
    contextTimeline: ContextTimeline;
    /**
     * The request-header CONTENT epochs (full system prompt + tool schemas)
     * behind the timeline's envelope figures. A separate unit so the hot
     * `contextTimeline` value stays lean: headers change rarely, so this
     * value (and its pushes) change only when a `request/header` lands.
     * The Context browser card reads it to show the actual prompt/schema
     * content of a picked step (key absence = older host: tokens only).
     */
    contextHeaders: ContextHeaders;
    /**
     * The per-day activity ledger (billed tokens + completed requests keyed
     * by local day) behind the Context Dashboard's heatmap — the timeline's
     * "current snapshot" cannot draw a per-day chart, so the overview reads
     * this off every session-list row's projection column. Tiny (one small
     * record per day, retention-capped), so riding every list row costs
     * nothing next to the timeline head. Key absence = older host: the
     * heatmap degrades to its empty note.
     */
    contextActivity: ContextActivity;
  }
  interface SessionProjectionStateMap {
    contextTimeline: TimelineState;
    contextHeaders: HeadersState;
    contextActivity: ActivityState;
  }
}
/**
 * The priced surface buckets. `skill` carries every skill-machinery content
 * the harness injects (issue #66): the `<available_skills>` catalog digest,
 * a user-explicit `/name` invocation's instructions message, and the content
 * a `skill`-tool load returns (modeled as a tool result by the harness).
 */
type Category = 'user' | 'inject' | 'skill' | 'assistant' | 'tool';
/**
 * One live system-prompt node (Snapshot.systems) — the harness models the
 * system prompt as a surface node, so its TEXT is fetched on demand from the
 * event at `seq`: a V3 `system/message` event, or the V0/V2 `request/header`
 * whose envelope carried `header.system`. `tokens` is the node's heuristic
 * price (0 for a dormant empty node, which the harness reads as "no system
 * prompt"); the effective figure is the LAST node with `tokens > 0`.
 */
interface SystemPromptNode {
  seq: number;
  time: number;
  tokens: number;
}
/**
 * The stats board's count figures, precomputed host-side over the RETAINED
 * request/event records (the same set the detail payload serves). Carried by
 * the split-generation wire head so the board — and the Agent card's
 * per-session request tally — never need the collections themselves.
 * `steps` doubles as the retained request-record count.
 */
interface TimelineCounts {
  turns: number;
  steps: number;
  injects: number;
  compactions: number;
  prunes: number;
}
/**
 * The newest retained request record's billing summary — the headline's
 * derived-occupancy anchor (`prompt + surface movement since`), carried by
 * the split-generation wire head so the headline never needs the request
 * records themselves.
 */
interface TimelineLast {
  seq: number;
  total: number;
  prompt?: number;
}
/** One day's ledger entry in the `contextActivity` projection. */
interface ActivityDay {
  /**
   * Billed tokens folded from provider-reported usage that day (prompt-side
   * input + cache read/write + output). Requests without a usage settlement
   * count only toward `requests` — a fabricated 0 never understates the day.
   */
  tokens: number;
  /** Completed model calls (assistant settlements) that day. */
  requests: number;
}
/**
 * The per-session daily activity ledger (`contextActivity` wire value):
 * day key (`YYYY-MM-DD`, host-local — see shared/days.ts) → that day's
 * billed volume, retention-capped by the fold. The Context Dashboard merges
 * every listed session's ledger into its activity heatmap.
 */
interface ContextActivity {
  days: Record<string, ActivityDay>;
}
/**
 * The per-user display-preference vocabulary of the `dsh-context` settings
 * namespace — the ONE declaration both halves share: the Host registers the
 * namespace schema against it (host/settings.ts), the Client binds the scope
 * and edits fields by name (client/settings.ts). Type-only, so both bundles
 * erase it.
 */
type DefaultGranularity = 'step' | 'turn';
type DefaultTrendMode = 'total' | 'delta';
/** File Activity row order: most operations first, most-recently-touched first, or path ascending. */
type DefaultFileSort = 'count' | 'latest' | 'path';
/** Tool-definition row order: largest schema first, most call hits first, or name ascending. */
type DefaultToolSort = 'size' | 'count' | 'name';
/** Where the Context view is offered: the conversation tab, the right Sidebar, or both. */
type DefaultPlacement = 'all' | 'tab' | 'sidebar';
/** Whether the Context Insights panel's sidebar entry is offered at all. */
type InsightsEntry = 'show' | 'hide';
interface Snapshot {
  ok: boolean;
  /**
   * The host's baseline-gate record, present ONLY when the running harness
   * is below the plugin's supported baseline: the host then folds nothing
   * and every figure in this snapshot is zero/empty. The client keeps
   * rendering the (blank) cards and pops the upgrade gate modal naming
   * `current` (the detected harness version) and `minimum` (the baseline).
   */
  unsupported?: {
    current: string;
    minimum: string;
  };
  model?: string;
  provider?: string;
  contextWindow?: number;
  current: {
    system: number;
    tools: number;
    user: number;
    inject: number;
    skill: number;
    assistant: number;
    tool: number;
    total: number;
  };
  /**
   * Image blocks live in the CURRENT context (user uploads plus tool-result
   * images, nested blocks included) — the sum over the live surface nodes'
   * `imgs`, so compaction/prune shrink it. Absent from older hosts; clients
   * treat absence as zero.
   */
  images?: number;
  /**
   * Tool calls whose result is live in the CURRENT context (one `tool/result`
   * folds to one `tool` surface node). Calls still in flight and results
   * compacted/pruned out of the surface are not counted. Absent from older
   * hosts; clients treat absence as zero.
   */
  toolCalls?: number;
  /**
   * Whole-session human-input tally: every non-injection `user/message`
   * (the user's own messages) plus every answered `ask_user_question`
   * result (one per answer submission). A running total over the COMPLETE
   * log — turns the retained window no longer holds still count. Absent
   * from older hosts; clients treat absence as zero.
   */
  humanInputs?: number;
  /**
   * The user's newest own message as a one-line bounded preview (first text
   * block, whitespace collapsed, ~80 chars): the session cards' footer line.
   * Additive-optional — absent from rows folded before the field existed
   * (older hosts, idle sessions' cached rows); clients hide the line then.
   */
  lastUser?: string;
  /**
   * Split-generation head fields — present exactly when the host serves the
   * SLIM head (the heavy collections moved to the on-demand detail channel,
   * host/detail.ts) and absent on the inline generation (older or
   * channel-less hosts serve the collections in place). `detailRev` is the
   * detail's revision marker: it bumps whenever the detail collections
   * change, so an open tab refetches on the push alone.
   */
  counts?: TimelineCounts;
  last?: TimelineLast;
  detailRev?: number;
  /**
   * The per-request history / context-event collections. On the split
   * generation these stay ABSENT from the wire value (every session.list row,
   * control baseline, and push frame would carry them whole otherwise); the
   * client fills them from the detail channel ({@link ContextTimelineDetail}).
   */
  requests: RequestRecord[];
  events: ContextEventRecord[];
  /**
   * Cumulative session-cost raw material (per-provider, per-model billed
   * token totals — see SessionCostUsage). Absent until a request with a
   * known model reports usage.
   */
  cost?: SessionCostUsage;
  /**
   * Whole-session timing totals (see TimingTotals). Absent until the first
   * step lifecycle completes in the log (older plugin builds never folded
   * one — clients treat absence as an empty timing card).
   */
  timing?: TimingTotals;
  /**
   * The live system-prompt nodes, oldest first — the browser's per-step source
   * for the System section. Absent when the log carried no system prompt, and
   * on older plugin builds (the client then falls back to the header epoch's
   * own `systemTokens`, the pre-V3 shape).
   */
  systems?: SystemPromptNode[];
  /**
   * The served live surface: the newest `maxNodes` tail PLUS every live inject node older than the tail (injections land first and are
   * few,
   * so they are pinned). Seq-ordered, oldest first.
   */
  nodes: SurfaceNode[];
  /** Live nodes not served (the overflow beyond `maxNodes`, minus pinned injects — see `nodes`). */
  droppedNodes: number;
  /**
   * Recently REMOVED surface nodes (compaction/prune shadows), each stamped
   * with `gone` (the replacing event's seq). Together with `nodes` this lets
   * the Context browser reconstruct the assembled surface of any retained
   * step: alive at request R = seq < R.seq && (gone undefined || gone > R.seq).
   */
  archive: SurfaceNode[];
  /**
   * Coverage floor of the served live `nodes`: the newest seq among the
   * `droppedNodes` live nodes not served. Present only when droppedNodes > 0.
   */
  surfaceFloor?: number;
  /**
   * Coverage floor of `archive`: the newest `gone` among archive entries the
   * retention bounds dropped. Steps with seq < archiveFloor may miss removed
   * nodes (the browser shows the reconstruction as approximate).
   */
  archiveFloor?: number;
  /**
   * The fold-derived file-operation log and its trim floor — present on the
   * INLINE wire value (channel-less hosts) and on the detail payload
   * (ContextTimelineDetail), absent from the slim head (they ride the detail
   * channel there).
   */
  fileOps?: FileOpRecord[];
  fileOpsFloor?: number;
}
/**
 * The on-demand DETAIL payload of the split `contextTimeline` generation —
 * the heavy collections (per-request records, context events, the served
 * surface window, and the removed-node archive) that the slim wire head no
 * longer carries through every delivery channel. The host serves it off the
 * live fold state at the `/dsh-context` `detail` endpoint (host/detail.ts);
 * `rev` mirrors the head's `detailRev` at build time and acts as the
 * client's latest-wins cursor.
 */
interface ContextTimelineDetail {
  rev: number;
  /**
   * The slim wire head at the SAME fold cut as the collections: the
   * composition scalars (`current`), the window/model envelope, and the
   * precomputed counts. Sessions listed cold (never attached since the
   * requesting unit last changed) carry no `contextTimeline` projection row
   * for the browser's list reads, so the Agent network card fetches this
   * head per node to render their composition rings. The host always serves
   * it; optional so a payload missing it still serves the collections (the
   * detail cards) and only the ring composition degrades.
   */
  head?: ContextTimeline;
  requests: RequestRecord[];
  events: ContextEventRecord[];
  nodes: SurfaceNode[];
  droppedNodes: number;
  archive: SurfaceNode[];
  surfaceFloor?: number;
  archiveFloor?: number;
  /**
   * The fold-derived file-operation log (shared/fileOps.ts): one record per
   * executed file op, newest-retained, covering the full log (never
   * window-bound like the client-side join derivation it replaces on this
   * generation). Code-Mode nested dispatches book ops located on their
   * parent run_code result (`parent`).
   */
  fileOps?: FileOpRecord[];
  /** The newest dropped op's seq when the op log trimmed (coverage honesty, same family as archiveFloor). */
  fileOpsFloor?: number;
}
/**
 * One executed file operation (a settled file-tool call with a resolved
 * target), folded host-side from the durable tool lifecycle: the call's
 * name+arguments (`tool/call`), the result's presentation meta and error
 * (`tool/result`), or a nested Code-Mode settle (`tool/code-dispatch`,
 * located on its parent run_code result via `parent` + `program`).
 *
 * `gone` is NOT host-stamped: the client joins it from the detail's archive
 * at render time (the op's result node leaving the live surface marks where
 * its content is still viewable). Line deltas are estimates read off the
 * call ARGUMENTS (an edit's old/new strings, a write's content), never off
 * result payloads.
 */
interface FileOpRecord {
  seq: number;
  /** The op's file; for a pathless search the searched PATTERN (`pattern: true`). */
  path: string;
  kind: 'read' | 'write' | 'search';
  tool: string;
  time?: number;
  err: boolean;
  added: number;
  removed: number;
  /** What was searched for, when a search named both a path and a pattern. */
  detail?: string;
  /** Meta-attributed search op only: matched lines the result reported for this file. */
  hits?: number;
  /** Read ops only: the exact 1-based window the result meta reported, else the `limit`-argument estimate (`est: true`). */
  read?: {
    start: number;
    count: number;
  } | {
    count: number;
    est: true;
  };
  /** Nested Code-Mode op only: the run_code result node the op ran under (the locate target). */
  parent?: number;
  /** Nested Code-Mode op only: the run_code program's model-authored description. */
  program?: string;
  /** The searched-pattern marker: `path` is a pattern, not a file — display must not relativize it. */
  pattern?: true;
  /** Client-joined archive stamp (see the type note); absent on the wire. */
  gone?: number;
}
/**
 * The `contextTimeline` projection's whole value — the same snapshot the Client has always rendered. `ok` is always `true` here (a
 * delivered projection is by definition available); kept for wire compatibility with the snapshot shape.
 */
type ContextTimeline = Snapshot;
/**
 * Cumulative billed-token totals for one pricing bucket of the session-cost
 * estimate (host-folded, never trimmed — running totals over the COMPLETE
 * session log, immune to the request/event retention bounds).
 */
interface CostBucketTotals {
  uncached: number;
  cacheRead: number;
  cacheWrite: number;
  output: number;
}
/**
 * One completed tool name's whole-session call tally behind the timing
 * card's top-tools ranking (running totals, never trimmed).
 */
interface ToolTimingTotals {
  calls: number;
  ms: number;
}
/**
 * Whole-session timing totals, host-folded from the durable `step/start` /
 * `step/end` / `tool/call` / `tool/result` lifecycle plus the model call's
 * first token (running totals over the COMPLETE session log — the same
 * never-trimmed framing as `cost`). The first token comes from a V0
 * `assistant/chunk` delta or from the call's own embedded stream
 * (`assistant/message.data.stream` / `assistant/attempt.data.stream`, the
 * V2+ settlement) — whichever the log carries, matching the harness's own
 * session-stats fold. Durations are wall-clock milliseconds: `wallMs` sums
 * whole steps, `ttftMs` the step-start → first-token slice (the model wait)
 * and `genMs` the first-token → assistant-message slice (the generation) —
 * both only over calls whose stream carried a token delta, `toolsMs` the sum
 * of per-call tool durations (parallel calls each count, so it can overlap).
 * Absent until the first step lifecycle completes in the log.
 *
 * The generation window itself splits by WHAT was being decoded, off the
 * stream's `block-start` framing (`blockType`): `reasoningMs` (the model's
 * thinking), `textMs` (the answer text), and `toolArgMs` (the tool-call
 * arguments). Each marker owns the interval up to the next one (the last one
 * up to the assistant message), so the three tile the marker span and together
 * account for essentially all of `genMs` — the span opens at the first marker,
 * which can sit marginally before the first token, so it is not an exact
 * partition. They are ADDITIVE-OPTIONAL: cached projection rows written before
 * the split carry `genMs` without them, so the card falls back to the
 * un-split shape instead of the cache row being discarded (the
 * stateVersion-15 rationale in host/timeline.ts).
 */
interface TimingTotals {
  /** Summed wall time of completed steps (the session's active time). */
  wallMs: number;
  /** Summed step-start → first-token time (the model wait, TTFT). */
  ttftMs: number;
  /** Summed first-token → assistant-message time (the generation). */
  genMs: number;
  /** Reasoning-decode slice of `genMs` (the model's thinking). */
  reasoningMs?: number;
  /** Answer-text decode slice of `genMs`. */
  textMs?: number;
  /** Tool-call-argument decode slice of `genMs`. */
  toolArgMs?: number;
  /** Completed model calls (assistant messages folded). */
  calls: number;
  /** Summed per-call durations of completed tool calls. */
  toolsMs: number;
  /** Completed tool calls (call/result pairs folded). */
  toolCalls: number;
  /** Per-tool-name tallies behind the timing card's ranking (bounded). */
  tools: Record<string, ToolTimingTotals>;
}
/**
 * One billed model's cumulative totals split by pricing period. Providers
 * without period-based pricing book everything under `peak` (the list-price
 * period); DeepSeek splits at fold time — peak windows bill at list price,
 * off-peak (all other hours) at half.
 */
interface CostModelUsage {
  peak?: CostBucketTotals;
  off?: CostBucketTotals;
}
/**
 * The session-cost estimate's raw material: cumulative provider-reported
 * billed-token totals, keyed by the request envelope's DSH provider id (''
 * when a log carries none) and then by its model id — the exact (provider,
 * model) faces the Client's model-price book resolves (the models.dev
 * registry, client/modelPrices.ts). Running totals per key; absent until a
 * request with a known model reports usage.
 */
interface SessionCostUsage {
  [provider: string]: {
    [model: string]: CostModelUsage;
  };
}
/** One model-visible message on the surface, with its heuristic token price. */
interface SurfaceNode {
  seq: number;
  time?: number;
  cat: Category;
  tokens: number;
  /** Image blocks inside this node's message (absent when zero). */
  imgs?: number;
  /**
   * Removal marker, present only on `archive` entries: the seq of the
   * replacement surface event that shadowed this node (compaction/prune).
   * The node is part of the assembled context of every request with
   * seq > this node.seq and seq < gone.
   */
  gone?: number;
  form?: string;
  /**
   * The producer identity the matching inject event names (host pricing.ts
   * `injectionSourceName`: the plugin id, the reconciled instruction files,
   * or the durable kind). Stamped on injection nodes alongside the event, so
   * the browser rows label them the way the events card does; absent when the
   * source carries no readable identity or the node predates the stamp.
   */
  name?: string;
  text?: string;
  tool?: string;
  err?: boolean;
  skill?: string;
  calls?: string[];
}
/** One answered model call (a step); consecutive records of one turn form it. */
interface RequestRecord {
  turn?: number;
  step?: number;
  time: number;
  seq: number;
  system: number;
  tools: number;
  user: number;
  inject: number;
  assistant: number;
  tool: number;
  total: number;
  prompt?: number;
  /**
   * Skill-machinery tokens of this request (the `skill` composition
   * category — catalog digests, invocation instructions, `skill`-tool
   * loads). Always written by the current fold; absent on rows folded
   * before the category existed (read as 0).
   */
  skill?: number;
  /**
   * Billed cache-read (served) prompt tokens of this request — the
   * hit-rate numerator against `prompt` (input + cacheRead + cacheWrite).
   * Absent on older hosts / usage-less requests; zero is a real value.
   */
  cacheRead?: number;
  output?: number;
  /**
   * Turn-mode aggregate marker, set by the Client's aggregateByTurn (one bar
   * per turn shows its LAST step's record). The Host never sets it.
   */
  stepCount?: number;
  /**
   * Delta-mode signed net change, set by the Client's deltaOf (only present
   * on the delta-transformed records the TrendChart plots). The Host never
   * sets it.
   */
  net?: number;
}
/** A notable context event (compaction, prune, injection, model switch). */
interface ContextEventRecord {
  seq: number;
  time: number;
  kind: 'compaction' | 'prune' | 'inject' | 'model' | 'mode';
  form?: string;
  tokens?: number;
  count?: number;
  sub?: string;
  name?: string;
  /** One-line producer account (notice-form summary), shown after the name. */
  detail?: string;
  from?: string;
  to?: string;
  /** Turn/step of the request logged right BEFORE the event (host-stamped). */
  fromTurn?: number;
  fromStep?: number;
  /** Turn/step of the request this event contributed to (host-stamped). */
  turn?: number;
  step?: number;
}
/** One tool of a request-header epoch, with its display price. */
interface HeaderTool {
  name: string;
  tokens: number;
  /**
   * The registering plugin's label, when attribution is known: the host's
   * best-effort attribution (`mcp:<server>` for MCP tools, or the pinned
   * first-party package map), or a `plugin` field carried by the raw header
   * entry — no supported-baseline harness path writes one, but the read
   * stays defensive for foreign/newer producers. `UNKNOWN_TOOL_SOURCE` marks
   * a tool whose provider predates the attribution hook; absent means
   * nothing is known and the browser shows no tag.
   */
  plugin?: string;
}
/**
 * One request-header epoch's METADATA: the epoch boundaries and token prices
 * in force from this event's seq until the next epoch. The epoch CONTENT
 * (full system prompt text, tool descriptions/schemas) is not projected —
 * every session.list row, control baseline, push frame, and projection-cache
 * checkpoint would otherwise carry it per session × epoch. The client
 * fetches one epoch's content on demand (a seq-anchored history read off
 * `seq`) as a {@link HeaderEpochContent}.
 */
interface HeaderRecord {
  seq: number;
  time: number;
  /** The epoch's estimated system-prompt tokens; absent when it logged no system prompt. */
  systemTokens?: number;
  tools: HeaderTool[];
}
/** The `contextHeaders` projection value: the bounded epoch list (newest last). */
interface ContextHeaders {
  headers: HeaderRecord[];
}
/** One currency's DeepSeek open-platform balance figures. */
interface PlatformBalanceEntry {
  /** The ISO code the platform reported (`CNY` / `USD`). */
  currency: string;
  /** Total available funds: the granted and topped-up balances summed. */
  total: number;
  /** The not-expired granted (gift) balance. */
  granted: number;
  /** The topped-up balance. */
  toppedUp: number;
}
/**
 * The DeepSeek open-platform balance, served by the plugin's
 * `/api/dsh-context/balance` fetch route (host/balance.ts). `null` on the
 * wire — and nothing rendered client-side — whenever the platform is not
 * configured or the read fails: the capsule only ever shows a live figure.
 */
interface PlatformBalance {
  /** Whether the platform reports the balance sufficient for API calls. */
  isAvailable: boolean;
  /** One entry per currency the account holds; at least one. */
  balances: PlatformBalanceEntry[];
}
//#endregion
//#region src/host/config.d.ts
export interface Config {
  /** Cap on kept per-step request records (the hard step backstop). */
  maxRequestSteps?: number;
  /** Newest whole-turn window kept; trimming crosses whole turns, never mid-turn. */
  maxKeptTurns?: number;
  maxEvents?: number;
  /**
   * Served surface nodes (newest carry the signal; live inject nodes are pinned — they land first and are few). Deliberately generous:
   * auto-compaction keeps healthy surfaces far below it, so the browser effectively lists every live node; the bound is a
   * pathological-session backstop (each push ships the whole value, ~150B/node).
   */
  maxNodes?: number;
  /** Removed (shadowed) surface nodes kept for per-step reconstruction. */
  maxArchiveNodes?: number;
  /** Fold-derived file-operation records kept (the File Activity card's raw material). */
  maxFileOps?: number;
  /** Where the Context view is offered: the conversation tab, the right Sidebar, or both. */
  defaultPlacement?: DefaultPlacement;
  /** Whether the history chart counts whole-turn windows or per-step slices. */
  defaultGranularity?: DefaultGranularity;
  /** Whether the trend chart reads cumulative totals or per-step deltas. */
  defaultTrendMode?: DefaultTrendMode;
  /** Tool-definition row order: largest schema first, most call hits first, or name ascending. */
  defaultToolSort?: DefaultToolSort;
  /** File Activity row order: most operations first, most-recently-touched first, or path ascending. */
  defaultFileSort?: DefaultFileSort;
  /** Whether the Context Insights panel's sidebar entry is offered at all. */
  insightsEntry?: InsightsEntry;
}
/**
 * The cordis `Config` validator: rejects unknown keys, validates the bounds, fills per-field defaults, and tolerates
 * `undefined` (a patch row without a `config:` block — defaults win). The six preference fields are volatile, so
 * the parsed value carries references for them; the Host never reads them.
 */
export declare const Config: z$1<Schemastery.ObjectS<NoInfer<{
  maxRequestSteps: z$1<number, number, "defined">;
  maxKeptTurns: z$1<number, number, "defined">;
  maxEvents: z$1<number, number, "defined">;
  maxNodes: z$1<number, number, "defined">;
  maxArchiveNodes: z$1<number, number, "defined">;
  maxFileOps: z$1<number, number, "defined">;
  defaultPlacement: z$1<"all" | "sidebar" | "tab", "all" | "sidebar" | "tab", "defined">;
  defaultGranularity: z$1<"step" | "turn", "step" | "turn", "defined">;
  defaultTrendMode: z$1<"delta" | "total", "delta" | "total", "defined">;
  defaultToolSort: z$1<"count" | "name" | "size", "count" | "name" | "size", "defined">;
  defaultFileSort: z$1<"count" | "latest" | "path", "count" | "latest" | "path", "defined">;
  insightsEntry: z$1<"hide" | "show", "hide" | "show", "defined">;
}>>, Schemastery.ObjectT<NoInfer<{
  maxRequestSteps: z$1<number, number, "defined">;
  maxKeptTurns: z$1<number, number, "defined">;
  maxEvents: z$1<number, number, "defined">;
  maxNodes: z$1<number, number, "defined">;
  maxArchiveNodes: z$1<number, number, "defined">;
  maxFileOps: z$1<number, number, "defined">;
  defaultPlacement: z$1<"all" | "sidebar" | "tab", "all" | "sidebar" | "tab", "defined">;
  defaultGranularity: z$1<"step" | "turn", "step" | "turn", "defined">;
  defaultTrendMode: z$1<"delta" | "total", "delta" | "total", "defined">;
  defaultToolSort: z$1<"count" | "name" | "size", "count" | "name" | "size", "defined">;
  defaultFileSort: z$1<"count" | "latest" | "path", "count" | "latest" | "path", "defined">;
  insightsEntry: z$1<"hide" | "show", "hide" | "show", "defined">;
}>>, "plain">;
//#endregion
//#region src/host/index.d.ts
export declare const name = "dsh-context";
export declare const inject: string[];
export declare function apply(ctx: Context, config: Config): void;
//#endregion
export type { ActivityDay, ActivityState, Category, ContextActivity, ContextEventRecord, ContextHeaders, ContextTimeline, ContextTimelineDetail, HeaderRecord, HeaderTool, HeadersState, PlatformBalance, PlatformBalanceEntry, RequestRecord, Snapshot, SurfaceNode, TimelineCounts, TimelineLast, TimelineState };