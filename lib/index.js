import { createRequire } from "node:module";
import { z } from "zod";
import { SessionLogOffset, deriveEventMessage, interruptedTurnClosers } from "@deepseek-ai/dsh-session";
import { existsSync, readFileSync } from "node:fs";
import { dirname, isAbsolute, join, normalize, relative } from "node:path";
import { fileURLToPath } from "node:url";
import z$1 from "@deepseek-ai/schemastery";
import { randomUUID } from "node:crypto";
//#region src/shared/providers.ts
/**
* The provider-id seam between dsh request envelopes and the models.dev
* registry: client/cost.ts resolves price-book branches through it, and
* host/fold.ts uses the DeepSeek resolution to split the session-cost totals
* into peak/off-peak periods. Only the renames live here — an id absent
* from the table passes through verbatim.
*/
const MODELS_DEV_PROVIDER_IDS = {
	"deepseek-official": "deepseek",
	"kimi-coding": "moonshotai",
	"minimax-cn": "minimax",
	"zai-coding-cn": "zhipuai"
};
/** The models.dev provider id that prices a dsh provider (identity for unmapped ids). */
function modelsDevProviderOf(dshProviderId) {
	return MODELS_DEV_PROVIDER_IDS[dshProviderId] ?? dshProviderId;
}
/** Whether a dsh provider prices through DeepSeek's period-based list (peak / half-price off-peak). */
function isDeepSeekProvider(dshProviderId) {
	return modelsDevProviderOf(dshProviderId) === "deepseek";
}
//#endregion
//#region src/shared/estimate.ts
/**
* Token heuristics shared by the host fold and the client boundary — the
* harness token-meter's own fixed-density figure (dsh-token-meter/estimate.ts:
* ~4 chars ≈ 1 token, +4 role framing). Priced identically on both sides so a
* legacy value normalized at the client boundary matches what the host view
* would have served.
*/
const CHARS_PER_TOKEN$1 = 4;
const ROLE_OVERHEAD$1 = 4;
/** Price rendered system-prompt text; 0 for absent/empty/non-string input. */
function estimateSystemTokens(text) {
	if (typeof text !== "string" || text.length === 0) return 0;
	return Math.ceil(text.length / CHARS_PER_TOKEN$1) + ROLE_OVERHEAD$1;
}
/**
* Price a `system/message` payload's content exactly like the harness's
* token-meter (`estimateSystemMessage`): text density over EVERY text block
* plus role framing, with no per-block overhead — an adapter serializes the
* prompt as plain text, so a text block costs its characters alone. Any other
* block (or a hostile element) falls back to its JSON length. 0 for empty
* content, which the harness reads as "no system prompt".
*/
function estimateSystemContent(blocks) {
	if (!Array.isArray(blocks) || blocks.length === 0) return 0;
	let characters = 0;
	for (const block of blocks) {
		const text = block !== null && typeof block === "object" && block.type === "text" ? block.text : void 0;
		if (typeof text === "string") {
			characters += text.length;
			continue;
		}
		try {
			const json = JSON.stringify(block);
			if (typeof json === "string") characters += json.length;
		} catch {}
	}
	return Math.ceil(characters / CHARS_PER_TOKEN$1) + ROLE_OVERHEAD$1;
}
//#endregion
//#region src/shared/imageTokens.ts
/**
* Per-image token estimate for DeepSeek's vision model — a faithful port of
* the official "图片 Token 计算器" (Image Token Calculator) shipped on the
* DeepSeek API docs (https://api-docs.deepseek.com/zh-cn/quick_start/token_usage),
* which implements the provider's own image→token conversion:
*
*   - every image is aspect-preserved rescaled before entering the model:
*     below ~384×384 total pixels it is enlarged, above it is shrunk;
*   - tokens follow the patch grid (patch 14px, downsample 3), so every
*     image costs at least 117 and at most ~384 tokens (the documented cap).
*
* Verified against the docs calculator itself: 2048×1365→313, 800×600→341,
* 2048×2048→349, 512×512→201, 100×100→117, 1920×1080→369, 400×900→249.
* The DSH request pipeline's own 640k-pixel pre-resize does not change the
* result (the provider formula rescales to the same patch grid), so the
* durable attachment dimensions can be fed in directly.
*
* Pure math shared by the Host fold (message pricing) and the Client
* (attachment card token badges) — no dependencies, never mutates.
*/
const PATCH_SIZE = 14;
const DOWNSAMPLE_RATIO = 3;
const MAX_WH_RATIO = 8;
/** ~384×384 total pixels: smaller images are enlarged before patching. */
const MIN_PIXELS = 147456;
const floorDiv = (a, b) => Math.floor(a / b);
const ceilDiv = (a, b) => Math.floor((a + b - 1) / b);
function gridTokens(rows, cols) {
	let n = rows * (cols + 1) + 2;
	if (rows % 2 === 1) n += cols + 1;
	n += ceilDiv(rows, 2) * (cols + 1) % 2 * 2;
	return n;
}
/** Solve the largest in-grid resize whose token count fits `budget`. */
function solveResizeRatio(height, width, budget) {
	const ratio = height / width;
	const gridW = Math.sqrt((budget - 2) / ratio + .25) - .5;
	const gridH = gridW * ratio;
	const unit = 42;
	let bestHeight;
	let bestWidth;
	if (gridW < 1) {
		let rows = floorDiv(budget - 2, 2);
		/* v8 ignore else -- budget enters at 381 and the tall solve always fits
		(never decrements), so rows is always odd here; parity-defensive. */
		if (rows % 2 === 1) rows -= 1;
		bestWidth = unit;
		bestHeight = rows * unit;
	} else if (gridH < 2) {
		const cols = floorDiv(budget - 2, 2) - 1;
		if (cols <= 1) throw new Error("image tokens: budget too small to solve");
		bestHeight = 84;
		bestWidth = cols * unit;
	} else {
		const cols = Math.trunc(gridW);
		let rows = Math.trunc(gridH);
		if (rows % 2 === 1) rows -= 1;
		const scale = Math.min(cols * unit / width, rows * unit / height);
		bestWidth = Math.trunc(width * scale / PATCH_SIZE) * PATCH_SIZE;
		bestHeight = Math.trunc(height * scale / PATCH_SIZE) * PATCH_SIZE;
	}
	const nLlmH = ceilDiv(floorDiv(bestHeight, PATCH_SIZE), DOWNSAMPLE_RATIO);
	const nLlmW = ceilDiv(floorDiv(bestWidth, PATCH_SIZE), DOWNSAMPLE_RATIO);
	return {
		nLlmH,
		nLlmW,
		bestHeight,
		bestWidth,
		numTokens: gridTokens(nLlmH, nLlmW)
	};
}
/** Resize so the patch grid fits the cap, then re-add the pad reserve. */
function safeResize(height, width, paddedHeight, paddedWidth) {
	const nLlmH = ceilDiv(floorDiv(paddedHeight, PATCH_SIZE), DOWNSAMPLE_RATIO);
	const nLlmW = ceilDiv(floorDiv(paddedWidth, PATCH_SIZE), DOWNSAMPLE_RATIO);
	const pad = 3;
	const budget = 381;
	let result = {
		nLlmH,
		nLlmW,
		bestHeight: paddedHeight,
		bestWidth: paddedWidth,
		numTokens: gridTokens(nLlmH, nLlmW)
	};
	if (result.numTokens > budget) {
		result = solveResizeRatio(height, width, budget);
		let nextBudget = budget;
		while (result.numTokens > budget) {
			nextBudget -= 1;
			result = solveResizeRatio(height, width, nextBudget);
		}
	}
	result.numTokens += pad;
	return result;
}
function calcResizeInner(width, height) {
	let w = width;
	let h = height;
	if (w > h * MAX_WH_RATIO) w = h * MAX_WH_RATIO;
	const pixels = w * h;
	if (pixels < MIN_PIXELS && pixels > 0) {
		const scale = Math.sqrt(MIN_PIXELS / pixels);
		w = Math.trunc(w * scale);
		h = Math.trunc(h * scale);
	}
	const paddedWidth = ceilDiv(w, PATCH_SIZE) * PATCH_SIZE;
	const paddedHeight = ceilDiv(h, PATCH_SIZE) * PATCH_SIZE;
	return safeResize(h, w, paddedHeight, paddedWidth);
}
/**
* Estimate the tokens one image consumes in a DeepSeek vision request from its pixel dimensions. Returns null for non-positive/non-finite
* dimensions or when the official iteration fails to converge — callers fall back to the generic structural price.
*/
function estimateImageTokens(width, height) {
	if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) return null;
	try {
		let result = calcResizeInner(width, height);
		for (let i = 1; i < 10; i++) {
			const next = calcResizeInner(result.bestWidth, result.bestHeight);
			if (next.nLlmH === result.nLlmH && next.nLlmW === result.nLlmW && next.bestHeight === result.bestHeight && next.bestWidth === result.bestWidth && next.numTokens === result.numTokens) return result.numTokens;
			result = next;
		}
		return null;
	} catch {
		/* v8 ignore next -- the only throw site is the clamped-away budget guard
		above; the catch keeps a hostile dimension from ever breaking the fold. */
		return null;
	}
}
//#endregion
//#region src/host/pricing.ts
/**
* Token pricing — the same fixed-density heuristic as the harness's own
* token-meter (`dsh-token-meter/estimate.ts`): ~4 chars ≈ 1 token, +4 per
* content block, +4 role framing. Pure functions over message payloads.
*
* One deliberate refinement over the meter: `image` blocks. The meter prices
* them through its generic JSON branch (~40 tokens for the durable ref),
* while DeepSeek's vision model actually bills 117-384 tokens per image by
* pixel dimensions (https://api-docs.deepseek.com/zh-cn/guides/vision/).
* Image blocks therefore price through the official docs calculator port
* (shared/imageTokens.ts), falling back to the meter's JSON price when the
* attachment's dimensions are unknown.
*/
const CHARS_PER_TOKEN = 4;
const BLOCK_OVERHEAD = 4;
const ROLE_OVERHEAD = 4;
function estimateToolsTotal(tools) {
	return tools.length > 0 ? Math.ceil(JSON.stringify(tools).length / CHARS_PER_TOKEN) + BLOCK_OVERHEAD : 0;
}
/** The `ContentBlock` walkers take `unknown`: block arrays ride the untrusted
* log, so their element shapes (null and primitives included) are re-proved
* here, not trusted from the declared message types. */
function estimateBlocks(blocks) {
	let tokens = 0;
	if (!Array.isArray(blocks)) return 0;
	for (const item of blocks) {
		if (item === null || typeof item !== "object") {
			tokens += BLOCK_OVERHEAD;
			continue;
		}
		const block = item;
		switch (block.type) {
			case "text":
			case "reasoning":
				tokens += Math.ceil((block.text || "").length / CHARS_PER_TOKEN) + BLOCK_OVERHEAD;
				break;
			case "tool-call":
				tokens += Math.ceil((block.name || "").length / CHARS_PER_TOKEN) + Math.ceil((block.arguments || "").length / CHARS_PER_TOKEN) + BLOCK_OVERHEAD;
				break;
			case "tool-result":
				tokens += estimateBlocks(block.content) + BLOCK_OVERHEAD;
				break;
			case "image": {
				const ref = block.attachment;
				const priced = ref !== null && typeof ref === "object" && typeof ref.width === "number" && typeof ref.height === "number" ? estimateImageTokens(ref.width, ref.height) : null;
				tokens += (priced ?? Math.ceil(JSON.stringify(block).length / CHARS_PER_TOKEN)) + BLOCK_OVERHEAD;
				break;
			}
			default: tokens += BLOCK_OVERHEAD + Math.ceil(JSON.stringify(block).length / CHARS_PER_TOKEN);
		}
	}
	return tokens;
}
/**
* Price one surface message exactly like dsh's token-meter estimate:
* an empty-content assistant/message projects to NO message (it only hosts
* usage), so it prices 0; every other message pays content + role framing.
*/
function estimateMessage(message, emptyIsZero = false) {
	if (emptyIsZero && (message === null || message === void 0 || !Array.isArray(message.content) || message.content.length === 0)) return 0;
	return estimateBlocks(message?.content) + ROLE_OVERHEAD;
}
/** The shared meter heuristic over rendered system-prompt text (shared/estimate.ts). */
/** Per-tool price for the top-tools display (the total uses dsh's whole-array price). */
function estimateToolSchema(tool) {
	return Math.ceil(JSON.stringify(tool).length / CHARS_PER_TOKEN) + BLOCK_OVERHEAD;
}
/**
* Count image blocks in a message payload, recursing into nested content (tool-result blocks carry their inner blocks) — seeds each node's
* `imgs`, which the stats board's image cell sums over the LIVE surface (compacted/pruned messages stop counting).
*/
function imageCountOf(blocks) {
	let count = 0;
	if (!Array.isArray(blocks)) return 0;
	for (const item of blocks) {
		if (item === null || typeof item !== "object") continue;
		const block = item;
		if (block.type === "image") count++;
		else if (Array.isArray(block.content)) count += imageCountOf(block.content);
	}
	return count;
}
function firstText(blocks) {
	if (!Array.isArray(blocks)) return "";
	for (const item of blocks) {
		if (item === null || typeof item !== "object") continue;
		const b = item;
		if (b.type === "text" && typeof b.text === "string" && b.text.trim() !== "") return b.text.replace(/\s+/g, " ").trim().slice(0, 80);
	}
	return "";
}
function toolCallNames(blocks) {
	const names = [];
	if (!Array.isArray(blocks)) return names;
	for (const item of blocks) {
		if (item === null || typeof item !== "object") continue;
		const b = item;
		if (b.type === "tool-call" && typeof b.name === "string") names.push(b.name);
	}
	return names;
}
/**
* Producer label for an injection event, mirroring the dsh transcript's
* context provenance (client-runtime context-provenance.ts): workspace
* instructions name the files they were reconciled from, a plugin source its
* plugin id, and any other producer its own durable kind. Returns '' when
* the source is missing or carries no readable identity at all.
*/
function injectionSourceName(source) {
	if (source?.kind === "agent-instructions" && Array.isArray(source.changes)) {
		const paths = [];
		for (const change of source.changes) {
			const path = change?.path;
			if (typeof path === "string" && path !== "" && !paths.includes(path)) paths.push(path);
		}
		if (paths.length > 0) return paths.join(", ");
	}
	const plugin = source?.plugin;
	if (typeof plugin === "string" && plugin !== "") return plugin;
	const kind = source?.kind;
	return typeof kind === "string" && kind !== "" ? kind : "";
}
function isInjection(source) {
	return source !== null && source !== void 0 && (typeof source.kind === "string" && source.kind !== "" && source.kind !== "user" || typeof source.form === "string");
}
//#endregion
//#region src/host/logShapes.ts
/**
* Shape-driven readers over the durable session-event vocabulary — the ONE
* place the plugin reconciles the two supported log generations:
*
*   - V0 (dsh 0.1.2-rc.1): `request/header.header.system`, `assistant/chunk`
*     stream events, `SurfaceOp { start, end }`, `tool/code-dispatch`.
*   - V3 (dsh 0.1.5-alpha.x+): `system/message` surface nodes,
*     `assistant/message.data.stream` / `assistant/attempt.data.stream`,
*     `SurfaceOp { startSeq, endSeq }`, `tool/ptc-dispatch`.
*
* The fold reads SHAPES, never a detected harness version: a session log is
* written by exactly one generation, the two spellings are mutually
* exclusive within it, and a deployment's version probe can be wrong (a
* healed profile mirror may name a different release than the running
* harness). Every reader is total over untrusted input — a malformed record
* yields "nothing here", never a throw (the projection registry drives the
* fold without an error boundary; one throw stalls the unit's push feed and
* the browser waits on "loading" forever).
*
* @module dsh-context/host/log-shapes
*/
/**
* Whether one raw stream chunk carries a token delta — the first-token marker
* both generations share. Mirrors dsh-llm's `isTokenDelta` (a non-empty text
* or reasoning fragment, or any Tool-call delta carrying arguments or a name);
* a malformed chunk is simply not a token.
*/
function isTokenChunk(chunk) {
	if (chunk === null || typeof chunk !== "object") return false;
	const c = chunk;
	switch (c.type) {
		case "text-delta":
		case "reasoning-delta": return typeof c.text === "string" && c.text !== "";
		case "tool-call-delta": return typeof c.argumentsDelta === "string" && c.argumentsDelta !== "" || c.name !== void 0;
		default: return false;
	}
}
/** Map one `blockType` to its timing bucket (see {@link DecodeKind}). */
function decodeKindOfBlock(blockType) {
	if (blockType === "reasoning") return "reasoning";
	if (blockType === "text") return "text";
	if (blockType === "tool-call") return "toolarg";
}
/**
* Per-kind decode spans inside one embedded assistant stream, tiling
* [first block-start, endTime]: each `block-start` record owns the interval up
* to the next one, the last one up to `endTime`. This is the V2+ shape, whose
* timed stream rides the settlement (`assistant/message.data.stream`) instead
* of separate `assistant/chunk` events. Total over untrusted input — a
* malformed record is skipped, a non-finite boundary yields zero, and a stream
* with no marker (or not an array) yields all zeros.
*/
function decodeSpansOfStream(stream, endTime) {
	const spans = {
		reasoning: 0,
		text: 0,
		toolarg: 0
	};
	if (!Array.isArray(stream) || !Number.isFinite(endTime)) return spans;
	let kind;
	let since = 0;
	for (const record of stream) {
		if (record === null || typeof record !== "object") continue;
		const r = record;
		if (r.type !== "chunk" || r.chunk === null || typeof r.chunk !== "object") continue;
		const chunk = r.chunk;
		if (chunk.type !== "block-start") continue;
		const time = r.time;
		if (typeof time !== "number" || !Number.isFinite(time)) continue;
		if (kind !== void 0) spans[kind] += Math.max(0, time - since);
		kind = decodeKindOfBlock(chunk.blockType);
		since = time;
	}
	if (kind !== void 0) spans[kind] += Math.max(0, endTime - since);
	return spans;
}
/**
* The first token's instant inside one PACKED delta run (`text-chunks` /
* `reasoning-chunks` / `tool-call-chunks`): the run's base time plus the
* accumulated inter-member deltas, taken at the first qualifying member —
* a name-bearing Tool-call run starts at its first member. Mirrors dsh-llm's
* `runFirstTokenTime`; a non-finite base or delta yields undefined rather
* than a NaN instant.
*/
function runFirstTokenTime(record) {
	const time0 = record.time0;
	if (typeof time0 !== "number" || !Number.isFinite(time0)) return void 0;
	if (record.type === "tool-call-chunks" && record.name !== void 0) return time0;
	const fragments = record.type === "tool-call-chunks" ? record.args : record.texts;
	if (!Array.isArray(fragments)) return void 0;
	const dt = Array.isArray(record.dt) ? record.dt : [];
	let time = time0;
	for (const [index, fragment] of fragments.entries()) {
		if (index > 0) {
			const step = dt[index - 1];
			if (typeof step !== "number" || !Number.isFinite(step)) return void 0;
			time += step;
		}
		if (typeof fragment === "string" && fragment !== "") return time;
	}
}
/**
* The first token's instant inside an embedded assistant stream
* (`assistant/message.data.stream`, `assistant/attempt.data.stream` — the V2+
* settlement that replaced the V0 `assistant/chunk` events), or undefined
* when the stream carries no token. Mirrors dsh-llm's
* `assistantStreamFirstTokenTime` over the compact record union.
*/
function firstTokenTimeOfStream(stream) {
	if (!Array.isArray(stream)) return void 0;
	for (const record of stream) {
		if (record === null || typeof record !== "object") continue;
		const r = record;
		if (r.type === "chunk") {
			const time = r.time;
			if (typeof time === "number" && Number.isFinite(time) && isTokenChunk(r.chunk)) return time;
			continue;
		}
		const time = runFirstTokenTime(r);
		if (time !== void 0) return time;
	}
}
/**
* The inclusive surface range a replacement op covers, or null for `append`
* and for any unrecognized/hostile op (which the fold treats as an append).
* Reads BOTH endpoint spellings: V3's `startSeq`/`endSeq` first, then V0's
* `start`/`end` — each accepted only as a finite number, so a hostile op
* with one good and one malformed endpoint degrades to append.
*/
function replaceRangeOf(surfaceOp) {
	if (surfaceOp === null || typeof surfaceOp !== "object") return null;
	const op = surfaceOp;
	if (op.op !== "replace") return null;
	const start = typeof op.startSeq === "number" ? op.startSeq : op.start;
	const end = typeof op.endSeq === "number" ? op.endSeq : op.end;
	if (typeof start !== "number" || !Number.isFinite(start)) return null;
	if (typeof end !== "number" || !Number.isFinite(end)) return null;
	return {
		start,
		end
	};
}
//#endregion
//#region src/shared/fileOps.ts
/** Parse a call's raw JSON arguments; non-string/malformed/non-record inputs yield null. */
function parseCallArgs(raw) {
	if (typeof raw !== "string" || raw === "") return null;
	try {
		const parsed = JSON.parse(raw);
		return parsed !== null && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : null;
	} catch {
		return null;
	}
}
const KIND_BY_TOOL = {
	read: "read",
	read_image: "read",
	write: "write",
	edit: "write",
	grep: "search",
	glob: "search"
};
/** The file purpose of a tool, or null for non-file tools (bash, web_search…). */
function kindOfTool(tool) {
	if (tool === void 0) return null;
	return KIND_BY_TOOL[tool] ?? null;
}
/**
* The file purpose of one executed call. Like {@link kindOfTool} except for
* the one file tool whose purpose follows its arguments: `str_replace_editor`
* reads on `view` and writes on every other command (create / str_replace /
* insert — an unknown command writes too; the call failed and the row keeps
* its error flag).
*/
function kindOfCall(tool, args) {
	if (tool === "str_replace_editor") return args !== null && args.command === "view" ? "read" : "write";
	return kindOfTool(tool);
}
/**
* The operation's target path: the path-ish argument of read/write tools;
* for searches the narrowing `path`, else the pattern itself (a pathless
* grep/glob's target IS the pattern — the workspace-wide search text).
*/
function pathOfArgs(tool, args) {
	if (args === null) return null;
	if (tool === "grep" || tool === "glob") {
		const p = args.path;
		if (typeof p === "string" && p !== "") return p;
		const pattern = args.pattern;
		return typeof pattern === "string" && pattern !== "" ? pattern : null;
	}
	for (const k of [
		"file_path",
		"filePath",
		"path"
	]) {
		const v = args[k];
		if (typeof v === "string" && v !== "") return v;
	}
	return null;
}
/** Rendered line count: '' is 0, a trailing newline closes its own line. */
function linesOf(s) {
	if (s === "") return 0;
	let n = 0;
	for (let i = 0; i < s.length; i++) if (s[i] === "\n") n++;
	return s.endsWith("\n") ? n : n + 1;
}
/** The added/removed pair of one content-bearing argument set, or zeros. */
function pairOf(added, removed) {
	return {
		added: typeof added === "string" ? linesOf(added) : 0,
		removed: typeof removed === "string" ? linesOf(removed) : 0
	};
}
/**
* The signed line footprint of one call: an edit removes its old string and
* adds its new one; a write adds its content (the pre-existing body, if any,
* is unknowable from the arguments — the estimate stays honest about that);
* `str_replace_editor` splits the same shapes across its commands. Callers
* reach here only with parsed args (a null parse yields no path).
*/
function deltaOf(tool, args) {
	if (tool === "edit") return pairOf(args.new_string, args.old_string);
	if (tool === "write") return pairOf(args.content, void 0);
	if (tool === "str_replace_editor") {
		if (args.command === "str_replace") return pairOf(args.new_str, args.old_str);
		if (args.command === "insert") return pairOf(args.new_str, void 0);
		if (args.command === "create") return pairOf(args.file_text, void 0);
	}
	return {
		added: 0,
		removed: 0
	};
}
/** The exact window a read's result meta reports: `offset` plus the retained
* `lines` array (the same bounded payload the read card renders from). Null
* for a foreign or malformed meta. */
function readWindowOf(meta) {
	if (meta === null || typeof meta !== "object") return null;
	const m = meta;
	if (typeof m.path !== "string" || m.path === "") return null;
	if (typeof m.offset !== "number" || !Number.isFinite(m.offset) || m.offset < 1) return null;
	if (!Array.isArray(m.lines) || m.lines.length === 0) return null;
	return {
		start: m.offset,
		count: m.lines.length
	};
}
/** The limit estimate: the tool reads up to `limit` lines from `offset`;
* absent when the call reads unbounded. */
function readEstimateOf(args) {
	const limit = args.limit;
	return typeof limit === "number" && Number.isFinite(limit) && limit > 0 ? {
		count: Math.floor(limit),
		est: true
	} : void 0;
}
/** What a read op shows: the exact window off the result meta, else the
* limit estimate, else nothing (an unbounded read names no footprint). */
function readOf(meta, args) {
	const win = readWindowOf(meta);
	if (win !== null) return {
		start: win.start,
		count: win.count
	};
	return readEstimateOf(args);
}
/**
* A search op's detail: the pattern, with the include filter appended when
* one narrowed the call. A patternless (malformed) search has no detail.
*/
function searchDetailOf(args) {
	const pattern = args?.pattern;
	if (typeof pattern !== "string" || pattern === "") return void 0;
	const include = args?.include;
	return typeof include === "string" && include !== "" ? `${pattern} (${include})` : pattern;
}
/**
* The files a search demonstrably reached, read off the result's bounded
* presentation meta (grep groups matched lines by file; glob lists paths).
* Only the COMPLETE list attributes: a capped search (`truncated`) names a
* partial file set, and a malformed meta names none — both fall back to the
* call's own target. Each entry carries the reported match count.
*/
function searchFilesOf(meta) {
	if (meta === null || typeof meta !== "object") return null;
	const m = meta;
	if (m.truncated !== false) return null;
	const files = [];
	if (m.shape === "matches" && Array.isArray(m.files)) for (const f of m.files) {
		if (f === null || typeof f !== "object") continue;
		const group = f;
		if (typeof group.path === "string" && group.path !== "" && Array.isArray(group.matches)) files.push({
			path: group.path,
			hits: group.matches.length
		});
	}
	else if (m.shape === "paths" && Array.isArray(m.paths)) {
		for (const p of m.paths) if (typeof p === "string" && p !== "") files.push({
			path: p,
			hits: 0
		});
	}
	return files.length > 0 ? files : null;
}
/**
* The one-shot per-call op assembly, uniform across every producer: the
* host's call/result pairing (args off the armed call, meta off the
* result), the nested Code-Mode settle (no meta exists on a dispatch — the
* read window and per-file search attribution degrade to the argument-only
* forms), and the client's inline-generation join fallback. Returns zero to
* N records: a search with the complete matched-file meta rows per file;
* any other file call rows once; a non-file tool (or a call whose arguments
* resolve no target) rows nothing.
*/
function opsOfCall(input) {
	const args = parseCallArgs(input.argsRaw);
	const kind = kindOfCall(input.tool, args);
	if (kind === null) return [];
	const stamp = {
		seq: input.seq,
		kind,
		tool: input.tool,
		err: input.err === true,
		added: 0,
		removed: 0,
		path: "",
		...input.time !== void 0 ? { time: input.time } : {},
		...input.gone !== void 0 ? { gone: input.gone } : {},
		...input.parent !== void 0 ? { parent: input.parent } : {},
		...input.program !== void 0 ? { program: input.program } : {}
	};
	if (kind === "search") {
		const files = searchFilesOf(input.meta);
		if (files !== null) {
			const detail = searchDetailOf(args);
			const target = args !== null ? pathOfArgs(input.tool, args) : null;
			const narrowed = args !== null && typeof args.path === "string" && args.path !== "";
			return [...target !== null && !files.some((f) => f.path === target) ? [{
				...stamp,
				path: target,
				...narrowed && detail !== void 0 ? { detail } : {},
				...narrowed ? {} : { pattern: true }
			}] : [], ...files.map((f) => ({
				...stamp,
				path: f.path,
				...detail !== void 0 ? { detail } : {},
				...f.hits > 0 ? { hits: f.hits } : {}
			}))];
		}
	}
	if (args === null) return [];
	const path = pathOfArgs(input.tool, args);
	if (path === null) return [];
	const { added, removed } = deltaOf(input.tool, args);
	const narrowed = typeof args.path === "string" && args.path !== "";
	const detail = kind === "search" && narrowed ? searchDetailOf(args) : void 0;
	const read = kind === "read" ? readOf(input.meta, args) : void 0;
	return [{
		...stamp,
		path,
		added,
		removed,
		...detail !== void 0 ? { detail } : {},
		...read !== void 0 ? { read } : {},
		...kind === "search" && !narrowed ? { pattern: true } : {}
	}];
}
//#endregion
//#region src/host/fold.ts
function trimToLastTurns(requests, maxTurns) {
	let runs = 0;
	let start = requests.length;
	let prevTurn;
	for (let i = requests.length - 1; i >= 0; i--) {
		const turn = requests[i].turn;
		if (turn !== prevTurn) {
			if (runs >= maxTurns) break;
			runs++;
			prevTurn = turn;
		}
		start = i;
	}
	return requests.slice(start);
}
function countTurnRuns(requests) {
	let runs = 0;
	let prevTurn;
	for (const r of requests) if (r.turn !== prevTurn) {
		runs++;
		prevTurn = r.turn;
	}
	return runs;
}
function trimState(st, bounds) {
	if (countTurnRuns(st.requests) > bounds.maxKeptTurns) st.requests = trimToLastTurns(st.requests, bounds.maxKeptTurns);
	if (st.requests.length > bounds.maxRequestSteps) st.requests = st.requests.slice(-bounds.maxRequestSteps);
	if (st.events.length > bounds.maxEvents) st.events = st.events.slice(-bounds.maxEvents);
	if (st.fileOps.length > bounds.maxFileOps) {
		const drop = st.fileOps.length - bounds.maxFileOps;
		st.fileOpsFloor = Math.max(st.fileOpsFloor ?? 0, st.fileOps[drop - 1].seq);
		st.fileOps = st.fileOps.slice(drop);
	}
	if (st.archived.length > 0) {
		let drop = 0;
		const oldestReq = st.requests.length > 0 ? st.requests[0].seq : void 0;
		if (oldestReq !== void 0) while (drop < st.archived.length && (st.archived[drop].gone ?? Infinity) <= oldestReq) drop++;
		if (st.archived.length - drop > bounds.maxArchiveNodes) drop = st.archived.length - bounds.maxArchiveNodes;
		if (drop > 0) {
			const floor = st.archived[drop - 1].gone;
			if (floor !== void 0) st.archiveFloor = Math.max(st.archiveFloor ?? 0, floor);
			st.archived = st.archived.slice(drop);
		}
	}
}
function createTimelineState() {
	return {
		surface: [],
		sums: {
			user: 0,
			inject: 0,
			skill: 0,
			assistant: 0,
			tool: 0
		},
		systemTokens: 0,
		toolsTokens: 0,
		requests: [],
		events: [],
		archived: [],
		callNames: {},
		fileOps: []
	};
}
function categoryOf(type, message) {
	if (type === "assistant/message") return "assistant";
	if (type === "tool/result") return "tool";
	const kind = message?.source?.kind;
	if (kind === "skill-invocation" || kind === "skill-catalog") return "skill";
	if (isInjection(message?.source)) return "inject";
	return "user";
}
/**
* Mark the detail collections dirty (TimelineState.detailRev). Every caller
* is a fold branch that just mutated the requests/events/surface/archive;
* branches that touch only the working slots (stepStart, callNames, the
* shadow claim) or the envelope scalars do NOT bump — the served detail is
* unchanged, and an open tab has nothing to refetch.
*/
function bumpDetailRev(st) {
	st.detailRev = (st.detailRev ?? 0) + 1;
}
/**
* Bound on the live system-prompt nodes (TimelineState.systems). The
* effective figure is the LAST nonempty node, so dropping the oldest can only
* under-report a pathological log whose newest SYSTEM_NODES_MAX nodes are all
* empty while an older one still carried text.
*/
const SYSTEM_NODES_MAX = 8;
/** The effective system-prompt price: the last nonempty node, else 0 (the harness's own rule). */
function systemTokensOf(systems) {
	for (let i = systems.length - 1; i >= 0; i--) if (systems[i].tokens > 0) return systems[i].tokens;
	return 0;
}
/** Append one system-prompt node, bounding the list (see SYSTEM_NODES_MAX). */
function pushSystem(st, node) {
	const systems = [...st.systems ?? [], node];
	st.systems = systems.length > SYSTEM_NODES_MAX ? systems.slice(-8) : systems;
	st.systemTokens = systemTokensOf(st.systems);
}
/**
* Bound on the buffered nested Code-Mode ops (TimelineState.pendingCodeOps)
* — a hostile log that dispatches without settling the parent run_code
* cannot grow the persisted state past this.
*/
const PENDING_CODE_OPS_MAX = 200;
/** JSON-stringify an unknown argument payload; a hostile (cyclic) value yields no args. */
function argsRawOf(value) {
	if (typeof value === "string") return value;
	if (value === void 0 || value === null) return void 0;
	try {
		return JSON.stringify(value);
	} catch {
		return;
	}
}
/** Append op records to the fold-derived log (the trim lives in trimState, with the other collections). */
function pushFileOps(st, ops) {
	for (const op of ops) st.fileOps.push(op);
}
/**
* Buffer nested Code-Mode ops under their top run_code call id (they flush
* when the parent's result folds — the ops' locate target). A full buffer
* drops new arrivals wholesale (defensive logs only).
*/
function bufferCodeOps(st, rootCallId, ops) {
	const pending = st.pendingCodeOps ?? {};
	let total = 0;
	for (const k in pending) total += pending[k].length;
	if (total + ops.length > PENDING_CODE_OPS_MAX) return;
	st.pendingCodeOps = {
		...pending,
		[rootCallId]: [...pending[rootCallId] ?? [], ...ops]
	};
}
/**
* Archive removed surface nodes as stamped COPIES — the objects leaving
* `st.surface` are shared with the persisted previous state, so `gone` must
* never be written onto them directly.
*/
function archiveRemoved(st, removed, goneSeq) {
	for (const n of removed) st.archived.push({
		...n,
		gone: goneSeq
	});
}
/**
* Remove every live surface node whose seq the replacement claims, keeping the
* per-category sums equal to the surviving nodes and archiving the removals.
* Removal follows the SEQ list, not the declared range: pruned replacement
* nodes keep their own seqs beyond the range end, so a range-based removal
* would leave them behind and overcount. Returns the removed nodes.
*/
function removeSurfaceSeqs(st, claimed, goneSeq) {
	if (claimed.size === 0) return [];
	const kept = [];
	const removed = [];
	for (const n of st.surface) if (claimed.has(n.seq)) {
		st.sums[n.cat] -= n.tokens;
		removed.push(n);
	} else kept.push(n);
	archiveRemoved(st, removed, goneSeq);
	st.surface = kept;
	return removed;
}
/**
* The message nested under an event payload's `message` field
* (`system/message`, `assistant/message`, `tool/result`) — read structurally
* rather than through `deriveEventMessage`, whose 0.1.2-rc.1 generation knows
* nothing of the V3 `system/message` variant. A malformed payload reads null.
*/
function messageOf$1(data) {
	const message = data?.message;
	return message !== null && typeof message === "object" ? message : null;
}
/**
* The first full text block, recursing through nested content blocks (a tool
* result wraps its text in a `tool-result` block). Unlike `firstText` this
* must NOT truncate/normalize: the skill name is matched off the raw
* `<skill_content name="…">` wrapper.
*/
function nestedText(blocks) {
	if (!Array.isArray(blocks)) return "";
	for (const item of blocks) {
		if (item === null || typeof item !== "object") continue;
		const block = item;
		if (block.type === "text" && typeof block.text === "string" && block.text !== "") return block.text;
		if (block.content !== void 0) {
			const nested = nestedText(block.content);
			if (nested !== "") return nested;
		}
	}
	return "";
}
/**
* The skill name a `skill`-tool result carries. Loaded skills are rendered as
* `<skill_content name="…">…</skill_content>` in the result's text, so the name
* is recovered from the content rather than trusted from the call envelope.
*/
function skillNameOf(msg) {
	const match = nestedText(msg?.content).match(/<skill_content\s+name="([^"]+)"/);
	return match === null ? "" : match[1];
}
function applySurface(st, ev, type, data, message) {
	const cat = categoryOf(type, message ?? void 0);
	const node = {
		seq: ev.seq,
		time: ev.time,
		cat,
		tokens: estimateMessage(message, type === "assistant/message")
	};
	const imgs = imageCountOf(message?.content);
	if (imgs > 0) node.imgs = imgs;
	const source = message?.source;
	const form = source?.form;
	if (typeof form === "string") node.form = form;
	if (type === "assistant/message") {
		const text = firstText(message?.content);
		if (text !== "") node.text = text;
		else {
			const names = toolCallNames(message?.content);
			if (names.length > 0) node.calls = names.slice(0, 3);
		}
	} else if (type === "tool/result") {
		const srcId = source?.callId;
		const blockId = (message?.content?.[0])?.toolCallId;
		const srcEntry = typeof srcId === "string" ? st.callNames[srcId] : void 0;
		const blockEntry = srcEntry === void 0 && typeof blockId === "string" ? st.callNames[blockId] : void 0;
		const toolEntry = srcEntry ?? blockEntry;
		if (toolEntry !== void 0) {
			node.tool = toolEntry.name;
			const timing = ensureTiming(st);
			const dur = durOf(toolEntry.start, ev.time);
			timing.toolsMs += dur;
			timing.toolCalls += 1;
			bumpToolTotals(timing, toolEntry.name, dur);
		}
		if (typeof srcId === "string" || typeof blockId === "string") {
			const kept = {};
			for (const k in st.callNames) if (k !== srcId && k !== blockId) kept[k] = st.callNames[k];
			st.callNames = kept;
		}
		if (data?.error) node.err = true;
	} else if (source?.kind === "skill-invocation") node.skill = typeof source.name === "string" ? source.name : "?";
	else if (source?.kind === "plugin") {
		if (source.form === "notice" && typeof source.summary === "string") node.text = source.summary;
		else if (source.form === "snapshot" && Array.isArray(source.sections)) node.text = source.sections.map((s) => s?.name).filter(Boolean).join(", ").slice(0, 80);
		else {
			const ptext = firstText(message?.content);
			if (ptext !== "") node.text = ptext;
		}
	} else {
		const utext = firstText(message?.content);
		if (utext !== "") node.text = utext;
	}
	const shadowedSeqs = st.pendingShadowedSeqs;
	const shadowEventSeq = st.pendingShadowEventSeq;
	delete st.pendingShadowedSeqs;
	delete st.pendingShadowEventSeq;
	const op = replaceRangeOf(ev.surfaceOp);
	if (op !== null) {
		if (Array.isArray(shadowedSeqs) && shadowedSeqs.length > 0) {
			const removed = removeSurfaceSeqs(st, new Set(shadowedSeqs), ev.seq);
			st.sums[cat] += node.tokens;
			st.surface.push(node);
			if (shadowEventSeq !== void 0) {
				const removedSum = removed.reduce((sum, n) => sum + n.tokens, 0);
				const i = st.events.findIndex((e) => e.seq === shadowEventSeq);
				if (i >= 0) st.events[i] = {
					...st.events[i],
					tokens: Math.max(0, removedSum - node.tokens)
				};
			}
			return node;
		}
		let si = -1;
		let ei = -1;
		for (let i = 0; i < st.surface.length; i++) {
			if (si < 0 && st.surface[i].seq === op.start) si = i;
			if (st.surface[i].seq === op.end) {
				ei = i;
				break;
			}
		}
		if (si >= 0 && ei >= si) {
			const removed = st.surface.splice(si, ei - si + 1, node);
			archiveRemoved(st, removed, ev.seq);
			for (const r of removed) st.sums[r.cat] -= r.tokens;
			st.sums[cat] += node.tokens;
			return node;
		}
	}
	st.surface.push(node);
	st.sums[cat] += node.tokens;
	return node;
}
/**
* One provider-reported usage bucket as a billed count, or null when the
* field carries no readable number. Accepts finite numbers and numeric
* strings; fractions round (some gateways report fractional counts) and
* negatives clamp to 0 — a mis-accounting gateway that reports
* `cached_tokens > prompt_tokens` drives the disjoint uncached-input figure
* below zero, and one raw figure in the state would fail the wire and state
* schemas' `.int().nonnegative()` gates on EVERY later delivery, permanently
* freezing the projection feed for the session (issue #44). NaN, infinities,
* and non-numeric values read as absent.
*
* Exported for the activity unit (host/activity.ts): the daily ledger re-proves
* the same durable usage buckets with the same sanitizer, so one raw figure
* can never enter either fold's state.
*/
function tokenCountOf(value) {
	if (typeof value === "number") return Number.isFinite(value) ? Math.max(0, Math.round(value)) : null;
	if (typeof value === "string" && value.trim() !== "") {
		const parsed = Number(value);
		return Number.isFinite(parsed) ? Math.max(0, Math.round(parsed)) : null;
	}
	return null;
}
/**
* DeepSeek's peak windows (the official list: UTC 01:00–04:00 and 06:00–10:00,
* Monday through Friday — Beijing Time 09:00–12:00 and 14:00–18:00). All other
* hours, plus entire weekends, bill at the half-price off-peak rate.
*/
function isPeakUtc(time) {
	const at = new Date(time);
	const day = at.getUTCDay();
	if (day === 0 || day === 6) return false;
	const h = at.getUTCHours();
	return h >= 1 && h < 4 || h >= 6 && h < 10;
}
/**
* Fold one billed request into the session-cost totals, cloning along the
* mutated path only (the untouched branch stays shared with the persisted
* previous state — the apply contract never mutates it in place). The
* buckets arrive sanitized ({@link BilledUsage}), so the totals stay at the
* schemas' non-negative safe integers no matter what the provider reported.
* The key is the request envelope's (provider, model) face — the exact
* lookup the Client's model-price book resolves (models.dev). A request
* without a provider still accumulates (under the '' key) and the Client
* prices it when the model id is unambiguous; without a model there is
* nothing to price. DeepSeek's period-based list splits the buckets
* (peak windows at list price, all other hours half price); every other
* provider books everything under the list-price period.
*/
function accumulateCost(st, time, usage) {
	const model = st.model;
	if (model === void 0) return;
	const provider = st.provider ?? "";
	const period = isDeepSeekProvider(provider) && !isPeakUtc(time) ? "off" : "peak";
	const models = st.cost?.[provider] ?? {};
	const periods = models[model] ?? {};
	const b = periods[period] ?? {
		uncached: 0,
		cacheRead: 0,
		cacheWrite: 0,
		output: 0
	};
	const nextPeriods = { ...periods };
	nextPeriods[period] = {
		uncached: b.uncached + usage.input,
		cacheRead: b.cacheRead + usage.cacheRead,
		cacheWrite: b.cacheWrite + usage.cacheWrite,
		output: b.output + usage.output
	};
	const nextModels = {
		...models,
		[model]: nextPeriods
	};
	st.cost = {
		...st.cost ?? {},
		[provider]: nextModels
	};
}
/**
* Advance the fold over ONE committed session event under the projection
* contract. Uninteresting events return the same reference (`Object.is` gates
* the change feed); any change returns a new reference over a lazy shallow
* clone, so the persisted state is never mutated in place by the caller.
* `bounds` come from the plugin config (config.ts) — retention only, they
* never change the state shape.
*/
/** The timing card's per-tool ranking cap: the busiest 16 names are kept. */
const TOOL_TIMING_CAP = 16;
/**
* The interactive Q&A tool (`dsh-tool-ask-user`): its settled result IS the
* user's answer, so it folds into the human-input tally alongside the user's
* own messages. One result = one answer submission, however many questions
* the prompt carried.
*/
const ASK_USER_TOOL = "ask_user_question";
/** The decode buckets of the generation split, in card order (see TimingTotals). */
const DECODE_KINDS = [
	"reasoning",
	"text",
	"toolarg"
];
/** Non-negative, NaN-proof duration between two instants (hostile times degrade to 0). */
function durOf(from, to) {
	if (!Number.isFinite(from) || !Number.isFinite(to)) return 0;
	return Math.max(0, to - from);
}
/**
* The fold's private timing accumulator: created on first use, and CLONED on
* every later ensure() (see `applyTimeline`) — the object left in the
* persisted previous state is never written into in place.
*/
function ensureTiming(st) {
	if (st.timing === void 0) st.timing = {
		wallMs: 0,
		ttftMs: 0,
		genMs: 0,
		calls: 0,
		toolsMs: 0,
		toolCalls: 0,
		tools: {}
	};
	return st.timing;
}
/**
* Fold one block's decode span into the totals' generation split (see
* TimingTotals). A zero span stays ABSENT — the field then carries the
* "no time was decoded in this bucket" fact without adding dead properties to
* every pre-split-shaped state, and the card reads absence as 0.
*/
function addDecode(timing, kind, ms) {
	if (!(ms > 0)) return;
	if (kind === "reasoning") timing.reasoningMs = (timing.reasoningMs ?? 0) + ms;
	else if (kind === "text") timing.textMs = (timing.textMs ?? 0) + ms;
	else timing.toolArgMs = (timing.toolArgMs ?? 0) + ms;
}
/**
* Tally one completed tool call into the per-name ranking, bounded to
* TOOL_TIMING_CAP names: repeated names update in place, a new name beyond
* the cap evicts the smallest tally first (the ranking's tail), so state
* stays bounded even over a hostile log of unique names.
*/
function bumpToolTotals(timing, name, ms) {
	if (!Object.hasOwn(timing.tools, name)) {
		if (Object.keys(timing.tools).length >= TOOL_TIMING_CAP) {
			let minKey = "";
			let minMs = Infinity;
			for (const k in timing.tools) if (timing.tools[k].ms < minMs) {
				minMs = timing.tools[k].ms;
				minKey = k;
			}
			const kept = {};
			for (const k in timing.tools) if (k !== minKey) kept[k] = timing.tools[k];
			timing.tools = kept;
		}
		timing.tools[name] = {
			calls: 1,
			ms
		};
		return;
	}
	const cur = timing.tools[name];
	timing.tools[name] = {
		calls: cur.calls + 1,
		ms: cur.ms + ms
	};
}
function applyTimeline(state, event, bounds) {
	let st;
	const ensure = () => st ??= {
		...state,
		surface: [...state.surface],
		sums: { ...state.sums },
		requests: [...state.requests],
		events: [...state.events],
		archived: [...state.archived],
		callNames: { ...state.callNames },
		fileOps: [...state.fileOps],
		...state.pendingCodeOps !== void 0 ? { pendingCodeOps: { ...state.pendingCodeOps } } : {},
		...state.timing !== void 0 ? { timing: {
			...state.timing,
			tools: { ...state.timing.tools }
		} } : {}
	};
	const data = event.data;
	try {
		switch (event.type) {
			case "request/header": {
				const header = data?.header ?? {};
				const tools = Array.isArray(header.tools) ? header.tools : [];
				const s = ensure();
				s.toolsTokens = estimateToolsTotal(tools);
				const systemText = header.system;
				if (typeof systemText === "string" && systemText !== "") {
					s.systems = [{
						seq: event.seq,
						time: event.time,
						tokens: estimateSystemTokens(systemText)
					}];
					s.systemsFromHeader = true;
					s.systemTokens = systemTokensOf(s.systems);
				} else if (s.systemsFromHeader === true) {
					s.systems = [];
					delete s.systemsFromHeader;
					s.systemTokens = 0;
				}
				if (header.config && typeof header.config.model === "string") s.model = header.config.model;
				if (header.config && typeof header.config.provider === "string") s.provider = header.config.provider;
				if ((data?.reason === "change" || data?.reason === "resume") && s.model && s.lastModel && s.model !== s.lastModel) {
					s.events.push({
						seq: event.seq,
						time: event.time,
						kind: "model",
						from: s.lastModel,
						to: s.model
					});
					bumpDetailRev(s);
				}
				if (s.model) s.lastModel = s.model;
				break;
			}
			case "system/message": {
				const s = ensure();
				delete s.pendingShadowedSeqs;
				delete s.pendingShadowEventSeq;
				const op = replaceRangeOf(event.surfaceOp);
				if (op !== null) {
					s.systems = (s.systems ?? []).filter((n) => n.seq < op.start || n.seq > op.end);
					const claimed = /* @__PURE__ */ new Set();
					for (const n of s.surface) if (n.seq >= op.start && n.seq <= op.end) claimed.add(n.seq);
					if (removeSurfaceSeqs(s, claimed, event.seq).length > 0) bumpDetailRev(s);
				}
				delete s.systemsFromHeader;
				pushSystem(s, {
					seq: event.seq,
					time: event.time,
					tokens: estimateSystemContent(messageOf$1(data)?.content)
				});
				break;
			}
			case "request/context": {
				const s = ensure();
				if (data && typeof data.contextWindow === "number") s.contextWindow = data.contextWindow;
				if (data && typeof data.model === "string") s.model = data.model;
				if (data && typeof data.provider === "string") s.provider = data.provider;
				break;
			}
			case "tool/call":
				if (data && typeof data.callId === "string" && typeof data.name === "string") {
					const s = ensure();
					const argsRaw = argsRawOf(data.arguments);
					s.callNames[data.callId] = {
						name: data.name,
						start: event.time,
						...argsRaw !== void 0 ? { argsRaw } : {}
					};
				}
				break;
			case "tool/code-dispatch":
			case "tool/ptc-dispatch": {
				const rootCallId = data?.rootCallId;
				const name = data?.name;
				if (typeof rootCallId === "string" && typeof name === "string") {
					const ops = opsOfCall({
						seq: event.seq,
						time: event.time,
						tool: name,
						argsRaw: argsRawOf(data?.arguments),
						err: data?.isError === true
					});
					if (ops.length > 0) bufferCodeOps(ensure(), rootCallId, ops);
				}
				break;
			}
			case "assistant/chunk": {
				const start = state.stepStart;
				if (start === void 0) return state;
				const chunk = data?.chunk;
				if (chunk !== null && typeof chunk === "object" && chunk.type === "block-start") {
					const kind = decodeKindOfBlock(chunk.blockType);
					if (start.block === void 0 && kind === void 0) return state;
					const s = ensure();
					const decode = { ...start.decode ?? {
						reasoning: 0,
						text: 0,
						toolarg: 0
					} };
					if (start.block !== void 0) decode[start.block.kind] += durOf(start.block.since, event.time);
					s.stepStart = {
						time: start.time,
						...start.firstToken !== void 0 ? { firstToken: start.firstToken } : {},
						decode,
						...kind !== void 0 ? { block: {
							kind,
							since: event.time
						} } : {}
					};
					break;
				}
				if (start.firstToken !== void 0) return state;
				if (!isTokenChunk(data?.chunk)) return state;
				const s = ensure();
				s.stepStart = {
					...start,
					firstToken: event.time
				};
				break;
			}
			case "assistant/attempt": {
				const start = state.stepStart;
				if (start === void 0 || start.firstToken !== void 0) return state;
				const first = firstTokenTimeOfStream(data?.stream);
				if (first === void 0) return state;
				const s = ensure();
				s.stepStart = {
					time: start.time,
					firstToken: first
				};
				break;
			}
			case "step/start": {
				const s = ensure();
				s.stepStart = { time: event.time };
				break;
			}
			case "step/end": {
				const start = state.stepStart;
				if (start === void 0) return state;
				const s = ensure();
				ensureTiming(s).wallMs += durOf(start.time, event.time);
				delete s.stepStart;
				break;
			}
			case "user/message": {
				const msg = deriveEventMessage(event);
				const s = ensure();
				bumpDetailRev(s);
				const node = applySurface(s, event, event.type, data, msg);
				const source = msg?.source;
				if (isInjection(source)) {
					const rec = {
						seq: event.seq,
						time: event.time,
						kind: "inject",
						form: source.form || "context",
						tokens: node.tokens
					};
					if (source.kind === "skill-invocation") {
						rec.sub = "skill";
						rec.name = typeof source.name === "string" ? source.name : "?";
					} else {
						const label = injectionSourceName(source);
						if (label !== "") {
							rec.name = label;
							node.name = label;
						}
						if (source.form === "notice" && typeof source.summary === "string" && source.summary !== "") rec.detail = source.summary;
					}
					s.events.push(rec);
				} else {
					s.humanInputs = (s.humanInputs ?? 0) + 1;
					if (node.text !== void 0 && node.text !== "") s.lastUser = node.text;
				}
				break;
			}
			case "tool/result": {
				const toolMsg = deriveEventMessage(event);
				const srcId = (toolMsg?.source)?.callId;
				const firstBlock = toolMsg?.content?.[0];
				const blockId = firstBlock?.toolCallId;
				const pendingEntry = (typeof srcId === "string" ? state.callNames[srcId] : void 0) ?? (typeof blockId === "string" ? state.callNames[blockId] : void 0);
				const buffered = (typeof srcId === "string" ? state.pendingCodeOps?.[srcId] : void 0) ?? (typeof blockId === "string" ? state.pendingCodeOps?.[blockId] : void 0);
				const s = ensure();
				bumpDetailRev(s);
				const node = applySurface(s, event, event.type, data, toolMsg);
				if (node.tool === ASK_USER_TOOL) s.humanInputs = (s.humanInputs ?? 0) + 1;
				if (pendingEntry !== void 0) pushFileOps(s, opsOfCall({
					seq: event.seq,
					time: event.time,
					tool: pendingEntry.name,
					argsRaw: pendingEntry.argsRaw,
					meta: data?.meta,
					err: Boolean(data?.error) || firstBlock?.isError === true
				}));
				if (buffered !== void 0 && buffered.length > 0) {
					const program = parseCallArgs(pendingEntry?.argsRaw)?.description;
					pushFileOps(s, buffered.map((op) => ({
						...op,
						parent: event.seq,
						...typeof program === "string" && program !== "" ? { program } : {}
					})));
					const kept = {};
					for (const k in s.pendingCodeOps) if (k !== srcId && k !== blockId) kept[k] = s.pendingCodeOps[k];
					if (Object.keys(kept).length > 0) s.pendingCodeOps = kept;
					else delete s.pendingCodeOps;
				}
				if (node.tool === "skill" || node.tool === void 0) {
					const name = skillNameOf(toolMsg);
					if (name !== "") {
						node.skill = name;
						if (node.tool === void 0) node.tool = "skill";
						s.sums.tool -= node.tokens;
						node.cat = "skill";
						s.sums.skill += node.tokens;
						s.events.push({
							seq: event.seq,
							time: event.time,
							kind: "inject",
							form: "instructions",
							sub: "skill",
							name,
							tokens: node.tokens
						});
					}
				}
				break;
			}
			case "assistant/message": {
				const usage = data?.usage;
				const s = ensure();
				bumpDetailRev(s);
				const total = s.systemTokens + s.toolsTokens + s.sums.user + s.sums.inject + s.sums.skill + s.sums.assistant + s.sums.tool;
				const record = {
					time: event.time,
					seq: event.seq,
					system: s.systemTokens,
					tools: s.toolsTokens,
					user: s.sums.user,
					inject: s.sums.inject,
					skill: s.sums.skill,
					assistant: s.sums.assistant,
					tool: s.sums.tool,
					total
				};
				if (data && typeof data.turn === "number") record.turn = data.turn;
				if (data && typeof data.step === "number") record.step = data.step;
				if (usage !== null && typeof usage === "object") {
					const input = tokenCountOf(usage.inputTokens);
					const cacheRead = tokenCountOf(usage.cacheReadTokens);
					const cacheWrite = tokenCountOf(usage.cacheWriteTokens);
					const output = tokenCountOf(usage.outputTokens);
					if (input !== null || cacheRead !== null || cacheWrite !== null || output !== null) {
						record.prompt = (input ?? 0) + (cacheRead ?? 0) + (cacheWrite ?? 0);
						if (cacheRead !== null) record.cacheRead = cacheRead;
						if (output !== null) record.output = output;
						accumulateCost(s, event.time, {
							input: input ?? 0,
							cacheRead: cacheRead ?? 0,
							cacheWrite: cacheWrite ?? 0,
							output: output ?? 0
						});
					}
				}
				s.requests.push(record);
				const timing = ensureTiming(s);
				timing.calls += 1;
				const stepStart = state.stepStart;
				if (stepStart !== void 0) {
					const firstToken = stepStart.firstToken ?? firstTokenTimeOfStream(data?.stream);
					if (firstToken !== void 0) {
						timing.ttftMs += durOf(stepStart.time, firstToken);
						timing.genMs += durOf(firstToken, event.time);
						if (stepStart.decode !== void 0) {
							const decode = { ...stepStart.decode };
							if (stepStart.block !== void 0) decode[stepStart.block.kind] += durOf(stepStart.block.since, event.time);
							for (const kind of DECODE_KINDS) addDecode(timing, kind, decode[kind]);
						} else {
							const spans = decodeSpansOfStream(data?.stream, event.time);
							for (const kind of DECODE_KINDS) addDecode(timing, kind, spans[kind]);
						}
					}
				}
				const asstMsg = deriveEventMessage(event);
				applySurface(s, event, event.type, data, asstMsg);
				break;
			}
			case "plan/mode":
				if (data && typeof data.active === "boolean") {
					const s = ensure();
					s.events.push({
						seq: event.seq,
						time: event.time,
						kind: "mode",
						name: data.active ? "plan.on" : "plan.off"
					});
					bumpDetailRev(s);
				}
				break;
			case "compaction/summary":
			case "compaction/prune": {
				const s = ensure();
				bumpDetailRev(s);
				if (data && Array.isArray(data.shadowedSeqs)) {
					s.pendingShadowedSeqs = data.shadowedSeqs.filter((x) => typeof x === "number");
					s.pendingShadowEventSeq = event.seq;
				}
				s.events.push({
					seq: event.seq,
					time: event.time,
					kind: event.type === "compaction/summary" ? "compaction" : "prune",
					tokens: data && typeof data.shadowedTokenCount === "number" ? data.shadowedTokenCount : 0,
					...event.type === "compaction/summary" && data && Array.isArray(data.shadowedSeqs) ? { count: data.shadowedSeqs.length } : {}
				});
				break;
			}
			default: return state;
		}
	} catch {
		st = void 0;
	}
	if (st !== void 0) {
		trimState(st, bounds);
		return st;
	}
	return state;
}
/**
* The envelope scalars both wire generations share: current composition, the
* live-surface counters, and the copied cost/timing totals. Served value
* fields are COPIES — the served value must never alias persisted state.
* Optional scalars use conditional spread: an unknown value must not
* materialize an `undefined`-valued property (the lossless-JSON pipeline —
* a single such property can fail the whole push, the failure mode behind
* issue #29).
*/
function headFieldsOf(state) {
	const surfaceTotal = state.sums.user + state.sums.inject + state.sums.skill + state.sums.assistant + state.sums.tool;
	const result = {
		ok: true,
		...state.model !== void 0 ? { model: state.model } : {},
		...state.provider !== void 0 ? { provider: state.provider } : {},
		...state.contextWindow !== void 0 ? { contextWindow: state.contextWindow } : {},
		current: {
			system: state.systemTokens,
			tools: state.toolsTokens,
			user: state.sums.user,
			inject: state.sums.inject,
			skill: state.sums.skill,
			assistant: state.sums.assistant,
			tool: state.sums.tool,
			total: surfaceTotal + state.systemTokens + state.toolsTokens
		},
		images: state.surface.reduce((n, node) => n + (node.imgs ?? 0), 0),
		toolCalls: state.surface.reduce((n, node) => node.cat === "tool" || node.cat === "skill" && node.tool !== void 0 ? n + 1 : n, 0),
		humanInputs: state.humanInputs ?? 0,
		...state.lastUser !== void 0 ? { lastUser: state.lastUser } : {},
		requests: [],
		events: [],
		nodes: [],
		droppedNodes: 0,
		archive: []
	};
	if (state.cost !== void 0) {
		const cost = {};
		for (const provider in state.cost) {
			const models = {};
			for (const model in state.cost[provider]) {
				const periods = state.cost[provider][model];
				const copy = {};
				if (periods.peak !== void 0) copy.peak = { ...periods.peak };
				if (periods.off !== void 0) copy.off = { ...periods.off };
				models[model] = copy;
			}
			cost[provider] = models;
		}
		result.cost = cost;
	}
	if (state.timing !== void 0) {
		const tools = {};
		for (const k in state.timing.tools) tools[k] = { ...state.timing.tools[k] };
		result.timing = {
			...state.timing,
			tools
		};
	}
	if (state.systems !== void 0 && state.systems.length > 0) result.systems = state.systems.map((n) => ({ ...n }));
	return result;
}
/**
* The heavy collections: copies of the retained request records and context
* events (each event attached to the requests around it — the chart's ✂
* anchoring), the bounded served surface window, and the removed-node
* archive. Shared verbatim by the inline wire view (channel-less hosts) and
* the on-demand detail payload (host/detail.ts).
*/
function detailCollectionsOf(state, bounds) {
	const result = {
		requests: state.requests.map((r) => ({ ...r })),
		events: state.events.map((e) => ({ ...e })),
		nodes: [],
		droppedNodes: 0,
		archive: state.archived.map((n) => ({ ...n })),
		fileOps: state.fileOps.map((o) => ({ ...o })),
		...state.fileOpsFloor !== void 0 ? { fileOpsFloor: state.fileOpsFloor } : {}
	};
	const overflowCount = Math.max(0, state.surface.length - bounds.maxNodes);
	const overflow = state.surface.slice(0, overflowCount);
	const tail = state.surface.slice(overflowCount);
	const pinned = overflow.filter((n) => n.cat === "inject" || n.cat === "skill");
	result.nodes = pinned.length > 0 ? [...pinned, ...tail] : tail;
	result.droppedNodes = overflowCount - pinned.length;
	if (result.droppedNodes > 0) {
		let floor = 0;
		for (const n of overflow) if (n.cat !== "inject" && n.cat !== "skill") floor = Math.max(floor, n.seq);
		result.surfaceFloor = floor;
	}
	if (state.archiveFloor !== void 0) result.archiveFloor = state.archiveFloor;
	const requests = result.requests;
	const events = result.events;
	let ri = 0;
	for (const ev of events) {
		while (ri < requests.length && requests[ri].seq <= ev.seq) ri++;
		const next = requests.at(ri);
		const prev = ri > 0 ? requests.at(ri - 1) : void 0;
		if (next !== void 0 && typeof next.turn === "number" && typeof next.step === "number") {
			ev.turn = next.turn;
			ev.step = next.step;
		}
		if (prev !== void 0 && typeof prev.turn === "number" && typeof prev.step === "number") {
			ev.fromTurn = prev.turn;
			ev.fromStep = prev.step;
		}
	}
	return result;
}
/**
* The split generation's SLIM wire head: the envelope scalars plus the
* precomputed count figures, the newest request's billing summary (the
* headline's derived anchor), and the detail revision marker. Small enough
* to ride every delivery channel whole (~1KB) — the heavy collections moved
* to the on-demand detail channel (host/detail.ts).
*/
function buildTimelineHead(state) {
	const result = headFieldsOf(state);
	const turns = /* @__PURE__ */ new Set();
	for (const r of state.requests) turns.add(r.turn ?? 0);
	let injects = 0;
	let compactions = 0;
	let prunes = 0;
	for (const e of state.events) if (e.kind === "inject") injects++;
	else if (e.kind === "compaction") compactions++;
	else if (e.kind === "prune") prunes++;
	result.counts = {
		turns: turns.size,
		steps: state.requests.length,
		injects,
		compactions,
		prunes
	};
	const last = state.requests.at(-1);
	if (last !== void 0) result.last = {
		seq: last.seq,
		total: last.total,
		...typeof last.prompt === "number" ? { prompt: last.prompt } : {}
	};
	result.detailRev = state.detailRev ?? 0;
	return result;
}
/**
* The on-demand detail payload (host/detail.ts serves it off the live fold
* state): the heavy collections, the slim head at the SAME cut (the Agent
* network's cold-node ring fetch renders composition off it), and the
* revision marker the head carries.
*/
function buildTimelineDetail(state, bounds) {
	return {
		rev: state.detailRev ?? 0,
		head: buildTimelineHead(state),
		...detailCollectionsOf(state, bounds)
	};
}
/**
* Serve the INLINE projection wire view (channel-less hosts): the head
* scalars with the detail collections in place — the shape every delivery
* channel carried before the split generation. Bound the surface nodes to
* the newest tail and attach each event to the request around it; stamp
* COPIES — the persisted state objects are never mutated.
*/
function buildTimelineView(state, bounds) {
	return {
		...headFieldsOf(state),
		...detailCollectionsOf(state, bounds)
	};
}
//#endregion
//#region src/shared/days.ts
/** Zero-pad to two digits (no Intl allocation on the hot path). */
function pad2(n) {
	return n < 10 ? "0" + String(n) : String(n);
}
/**
* The local calendar-day key of an epoch-ms instant, or null when the time
* is not a finite number or falls outside the representable date range —
* untrusted log data can never produce a garbage key.
*/
function dayKeyOf(time) {
	if (!Number.isFinite(time)) return null;
	const d = new Date(time);
	const y = d.getFullYear();
	if (!Number.isFinite(y) || y < 1970 || y > 9999) return null;
	return `${String(y).padStart(4, "0")}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}
//#endregion
//#region src/host/activity.ts
/**
* The `contextActivity` session projection unit — the per-day activity
* ledger behind the Context Dashboard's heatmap.
*
* The timeline unit (fold.ts) is a "current snapshot" fold: it prices the
* context as it stands NOW, which cannot draw a per-day chart. This unit
* folds the same committed event stream into a ledger keyed by local
* calendar day (shared/days.ts): every assistant settlement adds one
* completed request to its day and, when the provider reported a usage
* object, the day's billed-token figure grows by the disjoint buckets
* (uncached input + cache read + cache write + output — the same semantics
* the timeline's request records and the official token meter use). The
* overview merges every listed session's ledger off the session list's
* projection column (no per-session open needed) and colors its heatmap.
*
* One wire contract, one small state: a day entry is two integers and the
* retention cap keeps at most {@link MAX_KEPT_DAYS} keys, so the value
* riding every session-list row stays trivial next to the timeline head.
* Same projection contract as the sibling units: pure init/apply/view,
* unknown or malformed events return the state unchanged, and no
* `undefined`-valued property ever materializes (the plain-JSON persisted-
* state precondition).
*/
/**
* Retention cap on ledger days. A little over a year of daily-active
* sessions; the oldest keys drop first (key order IS chronological order).
*/
const MAX_KEPT_DAYS = 400;
const activityDaySchema = z.object({
	tokens: z.number().int().nonnegative(),
	requests: z.number().int().nonnegative()
}).strict();
/** Validate the wire payload before it leaves the host (strict: no drift). */
const contextActivitySchema = z.object({ days: z.record(z.string(), activityDaySchema) }).strict();
/** The persisted fold-state schema — identical shape, validated before a checkpoint row seeds a fold. */
const activityStateSchema = z.object({ days: z.record(z.string(), activityDaySchema) });
/**
* The day's billed increment from one durable usage object: the four
* disjoint buckets summed after the shared per-bucket sanitizer
* ({@link tokenCountOf} — fractions round, negatives clamp, garbage reads
* absent). A usage object with NO readable bucket contributes nothing, so a
* settlement that carried no usage still counts its request without
* fabricating tokens.
*/
function billedOfUsage(value) {
	if (value === null || typeof value !== "object") return 0;
	const usage = value;
	let any = false;
	let total = 0;
	for (const bucket of [
		usage.inputTokens,
		usage.cacheReadTokens,
		usage.cacheWriteTokens,
		usage.outputTokens
	]) {
		const count = tokenCountOf(bucket);
		if (count !== null) {
			total += count;
			any = true;
		}
	}
	return any ? total : 0;
}
/**
* Fold one committed event into the ledger. Only `assistant/message` (the
* step settlement — both supported log generations) advances a day; every
* other type returns the state reference unchanged, as does a settlement
* with an unreadable time. The next state is a copy along the mutated path
* only — the persisted previous state is never mutated in place.
*/
function applyActivity(state, event) {
	if (event.type !== "assistant/message") return state;
	const key = dayKeyOf(event.time);
	if (key === null) return state;
	const data = event.data;
	const tokens = billedOfUsage(data?.usage);
	const prev = state.days[key];
	const entry = {
		tokens: prev === void 0 ? tokens : prev.tokens + tokens,
		requests: prev === void 0 ? 1 : prev.requests + 1
	};
	let days = {
		...state.days,
		[key]: entry
	};
	const keys = Object.keys(days);
	if (keys.length > MAX_KEPT_DAYS) {
		keys.sort();
		const drop = new Set(keys.slice(0, keys.length - MAX_KEPT_DAYS));
		days = Object.fromEntries(Object.entries(days).filter(([k]) => !drop.has(k)));
	}
	return { days };
}
/**
* The daily-activity projection unit, registered alongside the timeline and
* headers units (host/index.ts); the overview reads it through the session
* list's projection column. `stateVersion` 1: the ledger's first shape.
*/
function createContextActivityDefinition() {
	return {
		key: "contextActivity",
		stateSchema: activityStateSchema,
		init: () => ({ days: {} }),
		apply: (state, event) => applyActivity(state, event),
		wire: {
			viewSchema: contextActivitySchema,
			view: (state) => ({ days: Object.fromEntries(Object.entries(state.days).map(([k, v]) => [k, { ...v }])) })
		},
		stateVersion: 1
	};
}
/**
* Recover the MCP server display label from a proxied tool name, or undefined
* for non-MCP names. `dsh-mcp-client` names tools `mcp__<server>__<rawName>`
* (normalized, and hash-appended when overlong/invalid — the label then shows
* whatever of the server survived the truncation). The separating `__` is the
* LAST one in the name, and it must sit AFTER the `mcp__` prefix: the prefix's
* own separator (or an empty server right after it) is not a server.
*/
function mcpServerOf(name) {
	if (!name.startsWith("mcp__")) return void 0;
	const cut = name.lastIndexOf("__");
	if (cut < 5) return void 0;
	const server = name.slice(5, cut);
	return server.length > 0 ? server : void 0;
}
/** The `mcp:<server>` display label of a proxied tool name, or undefined. */
function mcpSourceOf(name) {
	const server = mcpServerOf(name);
	return server !== void 0 ? `mcp:${server}` : void 0;
}
/** The pinned package of a first-party tool name, or undefined. */
function pinnedSourceOf(name) {
	return FIRST_PARTY_SOURCES[name];
}
/**
* Pinned first-party tool → plugin package map (see header comment). One entry
* per model-facing name of the shipped tool packages in the official
* tool-schema catalog of the supported dsh baseline; names are verified
* stable across the supported harness range. Packages that mount under
* distinct names per composition (bash/pwsh persistent variants, the
* `subagent_fork` fixed-route alias) map to their primary package.
*/
const FIRST_PARTY_SOURCES = Object.freeze({
	read: "@deepseek-ai/dsh-tool-fs",
	write: "@deepseek-ai/dsh-tool-fs",
	edit: "@deepseek-ai/dsh-tool-fs",
	read_image: "@deepseek-ai/dsh-tool-fs",
	glob: "@deepseek-ai/dsh-tool-fs-search",
	grep: "@deepseek-ai/dsh-tool-fs-search",
	str_replace_editor: "@deepseek-ai/dsh-tool-str-replace-editor",
	bash: "@deepseek-ai/dsh-tool-bash",
	pwsh: "@deepseek-ai/dsh-tool-pwsh",
	web_search: "@deepseek-ai/dsh-tool-web",
	web_fetch: "@deepseek-ai/dsh-tool-web",
	job_output: "@deepseek-ai/dsh-tool-jobs",
	job_list: "@deepseek-ai/dsh-tool-jobs",
	job_kill: "@deepseek-ai/dsh-tool-jobs",
	ask_user_question: "@deepseek-ai/dsh-tool-ask-user",
	plan: "@deepseek-ai/dsh-plan-mode",
	exit_plan_mode: "@deepseek-ai/dsh-plan-mode",
	skill: "@deepseek-ai/dsh-tool-skill",
	todo_write: "@deepseek-ai/dsh-tool-todo",
	subagent: "@deepseek-ai/dsh-tool-subagent",
	subagent_fork: "@deepseek-ai/dsh-tool-subagent",
	send_message: "@deepseek-ai/dsh-tool-subagent-control",
	interrupt_agent: "@deepseek-ai/dsh-tool-subagent-control",
	list_agents: "@deepseek-ai/dsh-tool-subagent-control",
	ralph: "@deepseek-ai/dsh-tool-ralph",
	workflow: "@deepseek-ai/dsh-tool-workflow",
	run_code: "@deepseek-ai/dsh-tools",
	schedule_create: "@deepseek-ai/dsh-schedule",
	schedule_list: "@deepseek-ai/dsh-schedule",
	schedule_delete: "@deepseek-ai/dsh-schedule",
	create_goal: "@deepseek-ai/dsh-tool-goal",
	get_goal: "@deepseek-ai/dsh-tool-goal",
	update_goal: "@deepseek-ai/dsh-tool-goal",
	lsp: "@deepseek-ai/dsh-tool-lsp"
});
//#endregion
//#region src/host/attribution.ts
/**
* Live tool→plugin attribution layered on the static recovery in
* toolSources.ts.
*
* The session log records tools as plain `ToolSchema` entries (name /
* description / parameters) — the registering plugin is not in there.
* toolSources.ts derives the deterministic sources (harness-logged field,
* `mcp:<server>` naming, pinned first-party map). This module additionally
* watches RUNTIME registrations: cordis fires the `internal/get` waterfall on
* every context read of a service property, passing the READING context as the
* first argument, so `reader.fiber.name` identifies the plugin that is about
* to call `register()`.
*
* - The `internal/get` handler records who last read the `tools` service and
*   wraps that instance's `register` (once — an earlier wrapper of a previous
*   hook incarnation is peeled back to the original, so a plugin reload
*   re-wraps without stacking) to capture the reader at registration time
*   into a live map. Every wrapper is undone when the plugin unloads: the
*   original `register` goes back on the instance, unless a newer hook
*   incarnation re-wrapped it first (that incarnation's own cleanup then
*   owns the restore).
* - When the reader slot is missing, root-named, or this plugin's own (e.g.
*   LOCAL-LINK plugins — dev installs via `dsh plugin add <path>` or
*   npm/pnpm link — whose anonymous entrypoints make cordis fall back to the
*   root name), the wrapped `register` falls back to the call stack: the first
*   frame outside this package is resolved to its nearest `package.json`
*   `name`. That covers both npm installs (`node_modules/<pkg>`) and local
*   links (any directory carrying a package.json), which never pass through
*   node_modules. Frames that resolve back to this package are skipped.
* - `ownerOf(name)` prefers the name-derived `mcp:<server>` label (it names
*   the actual provider, where the live record would only ever name the MCP
*   proxy client), then the LIVE record — for a post-boot registration it is
*   the truth, even when the name collides with a pinned first-party tool —
*   then the pinned map (the boot-time guess for tools registered before the
*   hook), and finally tags tools that were ALREADY registered when the hook
*   installed (the boot snapshot — third-party bundles, e.g. local links like
*   dsh-file-claim, that applied before dsh-context) with the
*   `UNKNOWN_TOOL_SOURCE` sentinel: their registering plugin is unknowable,
*   and a bare gap would read as "no plugin" instead of "unknown plugin".
*
* Best-effort by design: a read separated from `register()` by an `await` can
* be overwritten by another plugin's read (misattribution) and the stack
* fallback needs a resolvable package.json — both degrade to the name/pinned
* chain; registrations that predate the hook degrade to the unknown tag. The
* hook costs roughly +1.4us per service-property read and is negligible on
* the rare register path (the stack walk only runs when the reader slot is
* unusable, and its package lookups are cached per directory).
*/
/** This module's own file URL — the stack walk skips its own frames. */
const selfUrl = normalize(fileURLToPath(import.meta.url));
/** Directory → package-name cache for the synchronous walk below. */
const packageCache = /* @__PURE__ */ new Map();
/**
* Best-effort package name for a module file: walk up to the nearest
* `package.json` carrying a `name`. Works for dependencies installed under
* `node_modules` as well as local links whose package root is any on-disk
* directory. The per-directory results are cached.
* @param file - absolute path of a module file.
*/
function packageNameFrom(file) {
	let dir = dirname(file);
	for (let depth = 0; depth < 12; depth++) {
		const cached = packageCache.get(dir);
		if (cached !== void 0) return cached;
		const packageFile = join(dir, "package.json");
		if (existsSync(packageFile)) try {
			const name = JSON.parse(readFileSync(packageFile, "utf8")).name;
			if (typeof name === "string" && name) {
				packageCache.set(dir, name);
				return name;
			}
		} catch {}
		const parent = dirname(dir);
		packageCache.set(dir, void 0);
		if (parent === dir) return void 0;
		dir = parent;
	}
}
const FRAME_POSITION = /:\d+:\d+$/;
/** Package name of this module's own package (self-fallbacks are filtered). */
const selfPackage = packageNameFrom(selfUrl);
/**
* Resolve the registering package from a stack trace: walk frames from the
* innermost out, skipping this module's own frames and frames that resolve to
* this package, and return the package name of the first frame that resolves
* elsewhere. Works with both `file://` URLs and bare absolute paths
* (transpiled modules render without a scheme), with optional `fn (...)` and
* `async` wrappers.
* @param stack - `Error().stack`, or undefined when no fallback is desired.
*/
function callerPackageFrom(stack) {
	if (!stack) return void 0;
	for (const raw of stack.split("\n").slice(1)) {
		let line = raw.trim();
		if (!line.startsWith("at ")) continue;
		line = line.slice(3);
		if (line.startsWith("async ")) line = line.slice(6);
		line = line.replace(/\)\s*$/, "");
		const position = FRAME_POSITION.exec(line);
		if (!position) continue;
		let target = line.slice(0, -position[0].length);
		if (target.includes("(")) target = target.slice(target.lastIndexOf("(") + 1);
		if (target.startsWith("file://")) try {
			target = normalize(fileURLToPath(target));
		} catch {
			continue;
		}
		else if (!/^[A-Za-z]:[\\/]/.test(target) && !target.startsWith("/") && !target.startsWith("\\\\")) continue;
		else target = normalize(target);
		if (target === selfUrl) continue;
		const name = packageNameFrom(target);
		if (name !== void 0 && name !== selfPackage) return name;
	}
}
/**
* Install the runtime-attribution hook on a cordis app context. The hook
* rides the calling fiber's lifetime (`ctx.on`, and an effect that restores
* every patched `register`), so it is disposed with the plugin.
* @param ctx - the context the dsh-context plugin runs in; its fiber name is
* excluded from attributions.
*/
function createToolAttribution(ctx) {
	const live = /* @__PURE__ */ new Map();
	const wrapped = /* @__PURE__ */ new WeakSet();
	const self = ctx.fiber.name;
	let lastReader;
	const patched = [];
	const wrapInstance = (tools) => {
		if (!tools || typeof tools !== "object" || wrapped.has(tools)) return;
		const register = tools.register;
		if (typeof register !== "function") return;
		wrapped.add(tools);
		const original = register.attributedOriginal ?? register;
		if (typeof original !== "function") return;
		const instance = tools;
		const wrappedRegister = function(definition) {
			const toolName = definition?.name;
			let owner = lastReader?.fiber.name;
			if (!owner || owner === "root" || owner === self) owner = callerPackageFrom((/* @__PURE__ */ new Error()).stack);
			const dispose = original.call(this, definition);
			if (typeof toolName === "string" && owner && owner !== "root" && owner !== self && owner !== selfPackage) {
				live.set(toolName, owner);
				if (typeof dispose === "function") return () => {
					try {
						return dispose();
					} finally {
						live.delete(toolName);
					}
				};
			}
			return dispose;
		};
		wrappedRegister.attributedOriginal = original;
		instance.register = wrappedRegister;
		patched.push(() => {
			if (instance.register === wrappedRegister) instance.register = original;
		});
	};
	ctx.on("internal/get", (reader, name, _error, next) => {
		if (name !== "tools") return next();
		const tools = next();
		lastReader = reader;
		wrapInstance(tools);
		return tools;
	});
	ctx.effect(() => () => {
		for (const restore of patched.splice(0)) restore();
	}, "tools.register attribution");
	const toolsService = ctx.get("tools", false);
	wrapInstance(toolsService);
	const boot = /* @__PURE__ */ new Set();
	try {
		const toolEntries = toolsService?.layers?.global?.tools;
		if (toolEntries !== void 0 && typeof toolEntries.entries === "function") for (const [name] of toolEntries.entries()) boot.add(name);
	} catch {}
	return { ownerOf: (name) => mcpSourceOf(name) ?? live.get(name) ?? pinnedSourceOf(name) ?? (boot.has(name) ? "<unknown-plugin>" : void 0) };
}
//#endregion
//#region src/host/balance.ts
/** The plugin's balance route, under the authenticated `/api` fence. */
const BALANCE_ROUTE = "/api/dsh-context/balance";
/** The settings namespace llm-deepseek installs its connection section under. */
const DEEPSEEK_SETTINGS_NS = "llm-deepseek";
/** llm-deepseek's default credential ref (the env-var name its section resolves). */
const DEFAULT_API_KEY_ENV = "DEEPSEEK_API_KEY";
/** The platform's public API root (llm-deepseek's PUBLIC_BASE_URL default). */
const PUBLIC_BASE_URL = "https://api.deepseek.com";
/** A settled read serves identical reads for this long; failures decay faster. */
const CACHE_TTL_MS = 3e5;
const CACHE_FAIL_TTL_MS = 6e4;
/** One platform read's whole budget — never worth blocking the route longer. */
const FETCH_TIMEOUT_MS = 1e4;
/** Narrow an unknown value to a string-keyed record, or null. */
function asRecord$1(value) {
	return value !== null && typeof value === "object" && !Array.isArray(value) ? value : null;
}
/** One platform amount ('110.00', or an already-numeric producer variant), or null. */
function amountOf(value) {
	const n = typeof value === "string" ? Number(value) : value;
	return typeof n === "number" && Number.isFinite(n) && n >= 0 ? n : null;
}
/**
* Read llm-deepseek's live section across the settings service's two read
* faces: `get(ns)` on harnesses up to 0.1.5 and the `describe()` descriptor
* list (whose entries carry `value`) from 0.1.7 on, where `get` was removed.
* @param settings - the host settings service, when composed.
* @returns the section record, or null when neither face serves it.
*/
function readDeepSeekSection(settings) {
	if (typeof settings?.get === "function") try {
		const direct = asRecord$1(settings.get(DEEPSEEK_SETTINGS_NS));
		if (direct !== null) return direct;
	} catch (error) {}
	if (typeof settings?.describe === "function") try {
		return asRecord$1(settings.describe().find((candidate) => candidate.ns === DEEPSEEK_SETTINGS_NS)?.value);
	} catch (error) {}
	return null;
}
/**
* Resolve the DeepSeek connection facts exactly as llm-deepseek serves its
* requests: its settings section for the credential ref and endpoint, the
* credentials service for the key. `null` whenever any fact is missing —
* the platform is simply not configured for this deployment.
*/
async function resolveFacts(ctx) {
	const section = readDeepSeekSection(ctx.get("settings"));
	if (section === null) return null;
	const apiKeyEnv = typeof section.apiKeyEnv === "string" && section.apiKeyEnv !== "" ? section.apiKeyEnv : DEFAULT_API_KEY_ENV;
	const baseUrl = typeof section.baseURL === "string" && section.baseURL !== "" ? section.baseURL : PUBLIC_BASE_URL;
	const credentials = ctx.get("credentials");
	const resolve = typeof credentials?.resolve === "function" ? credentials.resolve.bind(credentials) : void 0;
	if (resolve === void 0) return null;
	let hit;
	try {
		hit = await resolve(apiKeyEnv);
	} catch {
		return null;
	}
	const apiKey = typeof hit?.value === "string" ? hit.value : "";
	return apiKey === "" ? null : {
		baseUrl,
		apiKey
	};
}
/**
* Narrow the platform's payload to the wire value (the boundary rigor every
* parser owes untrusted input): each entry's currency and three amounts are
* re-proved, an entry failing the shape drops whole, and a payload with no
* valid entry is no balance at all.
*/
function balanceOfPayload(value) {
	const data = asRecord$1(value);
	if (data === null) return null;
	const infos = Array.isArray(data.balance_infos) ? data.balance_infos : [];
	const balances = [];
	for (const info of infos) try {
		const entry = asRecord$1(info);
		if (entry === null) continue;
		const currency = entry.currency;
		const total = amountOf(entry.total_balance);
		const granted = amountOf(entry.granted_balance);
		const toppedUp = amountOf(entry.topped_up_balance);
		if (typeof currency !== "string" || currency === "" || total === null || granted === null || toppedUp === null) continue;
		balances.push({
			currency,
			total,
			granted,
			toppedUp
		});
	} catch {
		continue;
	}
	return balances.length > 0 ? {
		isAvailable: data.is_available === true,
		balances
	} : null;
}
/** The outbound platform fetch through the real global fetch. */
const defaultFetcher = (url, init) => fetch(url, init);
let fetcher = defaultFetcher;
let cache = null;
let inFlight = null;
/**
* One platform read for these facts, shared across identical concurrent
* reads and remembered briefly: successes for CACHE_TTL_MS, failures for
* CACHE_FAIL_TTL_MS (a blip must not pin the capsule away for the full
* window). Every failure path — transport, timeout, non-ok status, malformed
* payload — resolves `null`; the route never throws into the transport.
*/
async function readBalance(facts) {
	const key = facts.baseUrl + "\0" + facts.apiKey;
	if (cache !== null && cache.key === key && Date.now() - cache.at < (cache.value === null ? CACHE_FAIL_TTL_MS : CACHE_TTL_MS)) return cache.value;
	if (inFlight !== null) return inFlight;
	inFlight = (async () => {
		let value = null;
		try {
			const response = await fetcher(facts.baseUrl.replace(/\/+$/, "") + "/user/balance", {
				headers: {
					accept: "application/json",
					authorization: "Bearer " + facts.apiKey
				},
				signal: AbortSignal.timeout(FETCH_TIMEOUT_MS)
			});
			if (response.ok) value = balanceOfPayload(await response.json());
		} catch {}
		cache = {
			key,
			at: Date.now(),
			value
		};
		return value;
	})();
	const settled = inFlight;
	try {
		return await settled;
	} finally {
		inFlight = null;
	}
}
/**
* Serve the balance route whenever the connection service composes (see
* host/detail.ts for the load-order contract). The registration rides the
* injected fiber: the service unloading withdraws the route. A rejecting
* registry only closes the capsule — never the plugin.
*/
function watchBalanceChannel(ctx) {
	ctx.inject(["connection"], (c) => {
		const connection = c.get("connection");
		const register = typeof connection?.fetch?.register === "function" ? connection.fetch.register.bind(connection.fetch) : void 0;
		if (register === void 0) return;
		const handler = async () => {
			const facts = await resolveFacts(ctx);
			const value = facts !== null ? await readBalance(facts) : null;
			return Response.json({
				ok: true,
				value
			}, { headers: { "cache-control": "no-store" } });
		};
		try {
			c.effect(() => register({
				path: BALANCE_ROUTE,
				methods: ["POST"],
				requestBody: "buffered",
				fetch: handler
			}), "dsh-context: balance route");
		} catch {
			return;
		}
	});
}
//#endregion
//#region src/host/backfill.ts
/** The plugin's warm-up trigger route, under the authenticated `/api` fence. */
const BACKFILL_ROUTE = "/api/dsh-context/backfill";
/**
* Inter-session pacing so a multi-hundred-session backfill never starve the
* host: each cold read is a full durable-log decode, and a boot-time host
* under sustained read pressure stalls its own client handshake (the
* workspace sidebar rides it), so the pass breathes between sessions.
*/
const YIELD_MS = 100;
/**
* The `name` family dsh raises for a durable log it cannot interpret. The
* format edge throws `SessionFormatUnsupportedMigrationError`, but the
* persistence seam translates it — together with every other "intact yet not
* interpretable" refusal — into `SessionFormatUnsupportedError` before the
* error escapes (issue #75): classify by the family prefix, since either
* exact name may be the one that arrives.
*/
const UNSUPPORTED_FORMAT = "SessionFormatUnsupported";
function asRecord(value) {
	return value !== null && typeof value === "object" ? value : null;
}
/** One listed record's header, re-proved: id and cwd are the two fields the run relies on. */
function headerOf(record) {
	const header = asRecord(asRecord(record)?.header);
	if (header === null) return null;
	if (typeof header.id !== "string" || header.id === "") return null;
	return header;
}
/** Whether the cache already serves BOTH projection rows for this header (nothing to backfill). */
function servesRows(cache, header) {
	try {
		const values = asRecord(asRecord(cache.cachedSnapshot(header, SessionLogOffset(0), ["contextActivity", "contextTimeline"]))?.values);
		return values !== null && values.contextActivity !== void 0 && values.contextTimeline !== void 0;
	} catch {
		return false;
	}
}
/** Read one stored log through a read handle, mirroring dsh-session-query's readColdSessionLog. */
async function readColdLog(persistence, id, signal) {
	const handle = await persistence.open(id, "read", { signal });
	let events;
	try {
		const result = asRecord(await handle.read(0, void 0, { signal }))?.events;
		events = Array.isArray(result) ? result : [];
	} catch (error) {
		try {
			await handle.close();
		} catch {}
		throw error;
	}
	await handle.close();
	return {
		header: handle.header,
		inheritedEventCount: handle.inheritedEventCount,
		events: [...events, ...interruptedTurnClosers(events)]
	};
}
/**
* Whether one session is live (folds for itself — a cold write would only
* race its own checkpoints). A throwing registry read conservatively skips
* the session too: better to leave a row unfolded than to write over a
* possibly-live one.
*/
function isLive(sessions, id) {
	if (sessions === null || typeof sessions.get !== "function") return false;
	try {
		return sessions.get(id) !== void 0;
	} catch {
		return true;
	}
}
/**
* Whether the cold read failed because the running harness refuses this log's
* format — a permanent, source-side refusal (the artifact is left unchanged,
* so retrying cannot succeed). Matched by the error's documented `name`, so no
* dsh symbol needs importing and every supported baseline classifies alike: an
* unknown error shape just falls to the warn path.
*/
function isUnsupportedFormat(error) {
	try {
		return String(asRecord(error)?.name).startsWith(UNSUPPORTED_FORMAT);
	} catch {
		return false;
	}
}
/** The error's printable form — a hostile error may throw on its own toString. */
function messageOf(error) {
	try {
		return String(error);
	} catch {
		return "unprintable error";
	}
}
/**
* Arm the warm-up behind its trigger route. The route flips `requested`
* when the dashboard first opens; the cold-path faces compose `launch`.
* Either half may land first; the first request after both launches the one
* pass, and every later request is a no-op. Returns the deferred injects'
* disposer (abort on unload).
*/
function watchActivityBackfill(ctx) {
	let requested = false;
	let started = false;
	let launch = null;
	const tryLaunch = () => {
		if (!requested || started || launch === null) return;
		started = true;
		launch();
	};
	const routeFiber = ctx.inject(["connection"], (c) => {
		const connection = c.get("connection");
		const register = typeof connection?.fetch?.register === "function" ? connection.fetch.register.bind(connection.fetch) : void 0;
		if (register === void 0) return;
		try {
			c.effect(() => register({
				path: BACKFILL_ROUTE,
				methods: ["POST"],
				requestBody: "buffered",
				fetch: () => {
					requested = true;
					tryLaunch();
					return Response.json({ ok: true }, { headers: { "cache-control": "no-store" } });
				}
			}), "dsh-context: backfill route");
		} catch {
			return;
		}
	});
	const runnerFiber = ctx.inject([
		"sessionQuery",
		"sessionProjectionCache",
		"sessionPersistence",
		"sessions"
	], (raw) => {
		const injected = raw;
		const query = asRecord(injected.sessionQuery);
		const cache = asRecord(injected.sessionProjectionCache);
		const persistence = asRecord(injected.sessionPersistence);
		if (query === null || typeof query.listSessions !== "function") return;
		if (cache === null || typeof cache.cachedSnapshot !== "function" || typeof cache.coldSnapshot !== "function") return;
		if (persistence === null || typeof persistence.open !== "function") return;
		const sessions = asRecord(injected.sessions);
		const abort = new AbortController();
		const run = async () => {
			const listed = await query.listSessions(abort.signal);
			if (!Array.isArray(listed)) return;
			let folded = 0;
			let refused = 0;
			for (const record of listed) {
				if (abort.signal.aborted) return;
				const header = headerOf(record);
				if (header === null || typeof header.cwd !== "string") continue;
				if (isLive(sessions, header.id)) continue;
				if (servesRows(cache, header)) continue;
				try {
					const log = await readColdLog(persistence, header.id, abort.signal);
					cache.coldSnapshot(log.header, log.inheritedEventCount, log.events);
					folded++;
				} catch (error) {
					if (isUnsupportedFormat(error)) {
						refused++;
						ctx.logger.debug(`dsh-context: projection backfill skipped "${header.id}" (${messageOf(error)})`);
					} else ctx.logger.warn(`dsh-context: projection backfill skipped "${header.id}" (${messageOf(error)})`);
				}
				await new Promise((resolve) => setTimeout(resolve, YIELD_MS));
			}
			if (folded > 0) ctx.logger.info(`dsh-context: projection rows backfilled for ${folded} session(s)`);
			if (refused > 0) ctx.logger.info(`dsh-context: projection backfill skipped ${refused} session(s) (legacy log format is not migratable; sources left unchanged)`);
		};
		launch = () => {
			run().catch((error) => {
				if (!abort.signal.aborted) ctx.logger.warn(`dsh-context: projection backfill stopped early (${messageOf(error)})`);
			});
		};
		tryLaunch();
		return () => {
			abort.abort();
		};
	});
	return () => {
		for (const fiber of [routeFiber, runnerFiber]) fiber?.dispose?.();
	};
}
//#endregion
//#region src/host/config.ts
/**
* dsh-context host configuration — the `config:` block of the `dsh-context`
* loader row in cordis.yml.
*
* Cordis validates the entry config against this exported `Config` schema
* (any Standard Schema v1 validator — zod is ours) before `apply` runs, fills
* per-field defaults, and fails the load loudly on invalid or unknown keys
* (`.strict()`). The official plugin-config principle this answers: "anything
* that two deployments may want to set differently is a configuration field".
*
* The persisted projection state shape is independent of these bounds — they
* only tune the fold's retention / presentation slice, so changing them never
* requires a projection `stateVersion` bump.
*/
const DEFAULT_BOUNDS = {
	maxRequestSteps: 1500,
	maxKeptTurns: 300,
	maxEvents: 400,
	maxNodes: 2e3,
	maxArchiveNodes: 400,
	maxFileOps: 400
};
/**
* The cordis `Config` validator: strict on keys, defaults on the schema fields; tolerates `undefined` (a patch row without a `config:`
* block — defaults win).
*/
const Config = z.preprocess((v) => v ?? {}, z.object({
	maxRequestSteps: z.number().int().min(1).default(DEFAULT_BOUNDS.maxRequestSteps),
	maxKeptTurns: z.number().int().min(1).default(DEFAULT_BOUNDS.maxKeptTurns),
	maxEvents: z.number().int().min(1).default(DEFAULT_BOUNDS.maxEvents),
	maxNodes: z.number().int().min(1).default(DEFAULT_BOUNDS.maxNodes),
	maxArchiveNodes: z.number().int().min(1).default(DEFAULT_BOUNDS.maxArchiveNodes),
	maxFileOps: z.number().int().min(1).default(DEFAULT_BOUNDS.maxFileOps)
}).strict());
function resolveBounds(config) {
	return Config.parse(config ?? {});
}
//#endregion
//#region src/host/detail.ts
/** The plugin's detail route, under the authenticated `/api` fence. */
const DETAIL_ROUTE = "/api/dsh-context/detail";
/** One JSON reply of the detail route. */
function reply(value) {
	return Response.json(value, { headers: { "cache-control": "no-store" } });
}
/** The typed failure envelope (the same shape the Connection RPC carried). */
function failure(code, message) {
	return reply({
		ok: false,
		error: {
			code,
			message
		}
	});
}
/**
* Serve the detail route whenever the connection and sessions services are
* both composed (see the module header for the load-order contract). The
* registration rides the injected fiber: either service unloading withdraws
* the route and closes the gate.
*/
function watchDetailChannel(ctx, bounds) {
	const gate = { live: false };
	ctx.inject(["connection", "sessions"], (c) => {
		const connection = c.get("connection");
		const sessions = c.get("sessions");
		const register = typeof connection?.fetch?.register === "function" ? connection.fetch.register.bind(connection.fetch) : void 0;
		const getSession = typeof sessions?.get === "function" ? sessions.get.bind(sessions) : void 0;
		if (register === void 0 || getSession === void 0) return;
		const projections = ctx.sessionProjections;
		const handler = async (request) => {
			let sessionId;
			try {
				const body = await request.json();
				sessionId = body !== null && typeof body === "object" ? body.sessionId : void 0;
			} catch {
				return failure("dsh-context/bad-request", "body is not JSON");
			}
			if (typeof sessionId !== "string" || sessionId === "") return failure("dsh-context/bad-request", "missing sessionId");
			try {
				const session = getSession(sessionId);
				if (session !== void 0 && session !== null) {
					const state = projections.stateOf(session, "contextTimeline");
					if (state === void 0) return reply({
						ok: true,
						value: null
					});
					return reply({
						ok: true,
						value: buildTimelineDetail(state, bounds)
					});
				}
				const query = ctx.get("sessionQuery");
				const observe = typeof query?.observeSession === "function" ? query.observeSession.bind(query) : void 0;
				if (observe === void 0) return reply({
					ok: true,
					value: null
				});
				const observation = await observe(sessionId, { projectionMode: "none" });
				const events = observation?.events;
				if (!Array.isArray(events)) return reply({
					ok: true,
					value: null
				});
				let state = createTimelineState();
				try {
					for (const ev of events) state = applyTimeline(state, ev, bounds);
				} finally {
					const dispose = observation?.[Symbol.dispose];
					if (typeof dispose === "function") dispose.call(observation);
				}
				return reply({
					ok: true,
					value: buildTimelineDetail(state, bounds)
				});
			} catch (err) {
				return failure("gateway/internal", err instanceof Error ? err.message : String(err));
			}
		};
		try {
			c.effect(() => register({
				path: DETAIL_ROUTE,
				methods: ["POST"],
				requestBody: "buffered",
				fetch: handler
			}), "dsh-context: detail route");
		} catch {
			return;
		}
		gate.live = true;
		return () => {
			gate.live = false;
		};
	});
	return gate;
}
//#endregion
//#region src/shared/version.ts
/**
* The harness-version gate's shared arithmetic — the supported dsh baseline
* and the version compare behind it. Runtime code shared by BOTH halves (the
* host probes and gates; the client displays what the wire record carries),
* so this module must stay dependency-free.
*
* The baseline mirrors the support matrix (docs/compatibility.md and the
* package's `dsh.compatibility.dshReleases` declaration): the oldest dsh
* release this plugin works on. A harness BELOW it gets the fallback units
* (host/fallback.ts) instead of the real folds.
*/
/** The oldest supported dsh release (see the matrix note above). */
const BASELINE_DSH_VERSION = "0.1.2-rc.1";
/**
* Release-channel rank at an equal X.Y.Z: a final release outranks its
* release candidates, which outrank betas, which outrank alphas
* (正式版 > RC > Beta > Alpha).
*/
function channelRank(channel) {
	return channel === "rc" ? 3 : channel === "beta" ? 2 : 1;
}
const RELEASE_RANK = 4;
/**
* Parse `v?[major].[minor].[patch][-(alpha|beta|rc)[.N]][+build]`, or null
* when the string is not that shape. Channels other than alpha/beta/rc
* (nightly, dev, …) do not parse — the gate fails open on them.
*/
function parseVersion(version) {
	const match = /^v?(\d+)\.(\d+)\.(\d+)(?:-(alpha|beta|rc)(?:\.(\d+))?)?(?:\+[0-9a-z.-]+)?$/i.exec(version.trim());
	if (match === null) return null;
	const channel = match[4]?.toLowerCase();
	return {
		major: Number(match[1]),
		minor: Number(match[2]),
		patch: Number(match[3]),
		rank: channel === void 0 ? RELEASE_RANK : channelRank(channel),
		serial: match[5] ? Number(match[5]) : 0
	};
}
/**
* Total order over parsed versions: X.Y.Z numerically first, then the
* channel rank, then the prerelease serial.
*/
function compareParsed(a, b) {
	if (a.major !== b.major) return a.major - b.major;
	if (a.minor !== b.minor) return a.minor - b.minor;
	if (a.patch !== b.patch) return a.patch - b.patch;
	if (a.rank !== b.rank) return a.rank - b.rank;
	return a.serial - b.serial;
}
/**
* Whether `version` satisfies the supported baseline. FAIL OPEN by design: a
* version that cannot be parsed (a dev/nightly harness build) must not blank
* a working deployment, so it passes — the gate trips only on a proven
* below-baseline release.
*/
function meetsBaseline(version, baseline = BASELINE_DSH_VERSION) {
	const v = parseVersion(version);
	const b = parseVersion(baseline);
	if (v === null || b === null) return true;
	return compareParsed(v, b) >= 0;
}
//#endregion
//#region src/host/headers.ts
/**
* The `contextHeaders` session projection unit — the request-header EPOCH
* METADATA behind the timeline's envelope figures.
*
* The hot `contextTimeline` unit carries only token prices of the system
* prompt and tool schemas; this companion unit keeps the per-epoch METADATA
* (epoch seq/time boundaries, per-tool token prices and plugin attribution)
* so the Context browser can pick the header epoch in force at any step and
* size its sections immediately. The epoch CONTENT (full system prompt text,
* full tool JSON schemas) deliberately does NOT ride the projection VALUE:
* session projections are served whole in every `session.list` row, control
* baseline, push frame, and change notification, so carrying content here
* multiplied it by sessions × epochs across every channel. The client
* fetches one epoch's `request/header` event on demand — a seq-anchored
* history read off the epoch's `seq`, the same targeted read the browser
* already uses for message content — and caches it per session (history is
* immutable).
*
* Read-compat over the persisted state (the pinned decision behind keeping
* `stateVersion` at 1): the harness serves a cold session's projections from
* its CACHED checkpoint rows and has no refresh channel for an idle session
* — a version bump invalidates every row and orphans the key until the
* session goes live again (the #37 regression). The state therefore still
* ACCEPTS the v1 content-bearing record shape, current folds append
* metadata-only records alongside any seeded legacy ones, and the view
* normalizes BOTH to the metadata-only wire shape (pricing the legacy system
* text at read time). Cached v1 rows keep working, new checkpoint writes
* shrink as legacy epochs age out of the capped list, and the wire — the
* part every delivery channel carries — is metadata-only from day one.
*
* Same projection contract as the timeline unit: pure init/apply/view,
* `Object.is` reference stability for uninteresting events, plain-JSON
* bounded state (epoch list capped — see HEADERS_MAX).
*/
/** Retention cap on header epochs (metadata only; changes are rare; 50 is generous). */
const HEADERS_MAX = 50;
/**
* The persisted-state schema: the SUPERSET of both record generations, so a
* cached v1 row (content-bearing) seeds the fold instead of being discarded.
*/
const storedToolSchema = z.object({
	name: z.string(),
	tokens: z.number().int().nonnegative(),
	description: z.string().optional(),
	plugin: z.string().optional(),
	schema: z.unknown().optional()
}).strict();
const storedEpochSchema = z.object({
	seq: z.number(),
	time: z.number(),
	system: z.string().optional(),
	systemTokens: z.number().int().nonnegative().optional(),
	tools: z.array(storedToolSchema)
}).strict();
const contextHeadersStateSchema = z.object({ headers: z.array(storedEpochSchema) }).strict();
/** The wire schema: strict metadata — the shape every delivery channel carries. */
const headerToolWireSchema = z.object({
	name: z.string(),
	tokens: z.number().int().nonnegative(),
	plugin: z.string().optional()
}).strict();
/** Exported for the fallback unit (fallback.ts): one wire contract, one schema. */
const contextHeadersSchema = z.object({ headers: z.array(z.object({
	seq: z.number(),
	time: z.number(),
	systemTokens: z.number().int().nonnegative().optional(),
	tools: z.array(headerToolWireSchema)
}).strict()) }).strict();
function recordOf(event) {
	if (event.type !== "request/header") return null;
	const rawHeader = event.data.header;
	if (rawHeader === null || rawHeader === void 0 || typeof rawHeader !== "object") return null;
	const header = rawHeader;
	const tools = Array.isArray(header.tools) ? header.tools : [];
	const record = {
		seq: event.seq,
		time: event.time,
		tools: tools.map((t) => {
			const tool = t !== null && typeof t === "object" ? t : {};
			const entry = {
				name: typeof tool.name === "string" ? tool.name : "?",
				tokens: estimateToolSchema(t)
			};
			if (typeof tool.plugin === "string" && tool.plugin !== "") entry.plugin = tool.plugin;
			return entry;
		})
	};
	if (typeof header.system === "string" && header.system.length > 0) record.systemTokens = estimateSystemTokens(header.system);
	return record;
}
/**
* The context-headers projection unit; registered alongside the timeline unit (host/index.ts); clients read it through
* `useProjection('contextHeaders')` and fetch an epoch's full content on demand via the session history (historyPage.ts).
* Contract mirror with a REQUIRED `wire` block (see compat.ts).
* @param resolve - best-effort tool-to-plugin attribution (see toolSources.ts); fills a missing `plugin` at view time so
* epochs folded without attribution still render a tag when the source is known.
*/
function createContextHeadersDefinition(resolve) {
	const view = (state) => ({ headers: state.headers.map((h) => {
		const record = {
			seq: h.seq,
			time: h.time,
			tools: h.tools.map((t) => {
				const entry = {
					name: t.name,
					tokens: t.tokens
				};
				const plugin = t.plugin ?? (resolve !== void 0 ? resolve(t.name) : void 0);
				if (plugin !== void 0) entry.plugin = plugin;
				return entry;
			})
		};
		const systemTokens = h.systemTokens ?? (typeof h.system === "string" && h.system !== "" ? estimateSystemTokens(h.system) : void 0);
		if (systemTokens !== void 0) record.systemTokens = systemTokens;
		return record;
	}) });
	return {
		key: "contextHeaders",
		stateSchema: contextHeadersStateSchema,
		wire: {
			viewSchema: contextHeadersSchema,
			view
		},
		init: () => ({ headers: [] }),
		apply: (state, event) => {
			const record = recordOf(event);
			if (record === null) return state;
			const last = state.headers.at(-1);
			if (last !== void 0 && last.seq === record.seq) return state;
			const headers = [...state.headers, record];
			return { headers: headers.length > HEADERS_MAX ? headers.slice(-50) : headers };
		},
		stateVersion: 1
	};
}
//#endregion
//#region src/host/timeline.ts
/**
* The `contextTimeline` session projection unit — the plugin's data plane.
*
* This is the whole Host half after the v0.9 data-path migration: instead of
* serving snapshots over a custom `/dsh-context` RPC channel, the plugin
* registers one pure projection unit on the harness's
* `ctx.sessionProjections` registry. The framework then:
*   - drives the fold per committed `session/event` (eager, incremental),
*   - persists the unit state through `ctx.sessionProjectionCache`
*     (checkpointed rows, cold-read ladder, resume-safe),
*   - delivers finished values to the browser as a `session/projection` push
*     frame plus a tail-page baseline, where the Client reads them through
*     the framework-standard `useProjection('contextTimeline')` seat.
*
* The unit is pure mathematics (init/apply/view) — it holds no subscriptions
* and never touches the client. The wire value is the same Snapshot the UI
* has always rendered (shared/types.ts), so the Client renders unchanged.
*/
/** Validate the wire payload before it leaves the host (strict: no drift). */
const surfaceNodeSchema = z.object({
	seq: z.number().int().nonnegative(),
	time: z.number().optional(),
	cat: z.enum([
		"user",
		"inject",
		"skill",
		"assistant",
		"tool"
	]),
	tokens: z.number().int().nonnegative(),
	imgs: z.number().int().nonnegative().optional(),
	gone: z.number().int().nonnegative().optional(),
	form: z.string().optional(),
	name: z.string().optional(),
	text: z.string().optional(),
	tool: z.string().optional(),
	err: z.boolean().optional(),
	skill: z.string().optional(),
	calls: z.array(z.string()).optional()
}).strict();
/** One live system-prompt node (shared/types.ts SystemPromptNode). */
const systemPromptNodeSchema = z.object({
	seq: z.number().int().nonnegative(),
	time: z.number(),
	tokens: z.number().int().nonnegative()
}).strict();
const requestRecordSchema = z.object({
	turn: z.number().optional(),
	step: z.number().optional(),
	time: z.number(),
	seq: z.number(),
	system: z.number().int().nonnegative(),
	tools: z.number().int().nonnegative(),
	user: z.number().int().nonnegative(),
	inject: z.number().int().nonnegative(),
	assistant: z.number().int().nonnegative(),
	tool: z.number().int().nonnegative(),
	total: z.number().int().nonnegative(),
	prompt: z.number().int().nonnegative().optional(),
	/**
	* Skill-machinery tokens (issue #66). The fold writes it on every record;
	* optional so rows folded before the category existed still parse.
	*/
	skill: z.number().int().nonnegative().optional(),
	cacheRead: z.number().int().nonnegative().optional(),
	output: z.number().int().nonnegative().optional(),
	stepCount: z.number().int().positive().optional()
}).strict();
const contextEventSchema = z.object({
	seq: z.number(),
	time: z.number(),
	kind: z.enum([
		"compaction",
		"prune",
		"inject",
		"model",
		"mode"
	]),
	form: z.string().optional(),
	tokens: z.number().optional(),
	count: z.number().optional(),
	sub: z.string().optional(),
	name: z.string().optional(),
	detail: z.string().optional(),
	from: z.string().optional(),
	to: z.string().optional(),
	fromTurn: z.number().optional(),
	fromStep: z.number().optional(),
	turn: z.number().optional(),
	step: z.number().optional()
}).strict();
/** The fold-derived file-operation record (shared/types.ts FileOpRecord). */
const fileOpSchema = z.object({
	seq: z.number().int().nonnegative(),
	path: z.string(),
	kind: z.enum([
		"read",
		"write",
		"search"
	]),
	tool: z.string(),
	time: z.number().optional(),
	err: z.boolean(),
	added: z.number().int().nonnegative(),
	removed: z.number().int().nonnegative(),
	detail: z.string().optional(),
	hits: z.number().int().positive().optional(),
	read: z.union([z.object({
		start: z.number().int().positive(),
		count: z.number().int().nonnegative()
	}).strict(), z.object({
		count: z.number().int().positive(),
		est: z.literal(true)
	}).strict()]).optional(),
	parent: z.number().int().nonnegative().optional(),
	program: z.string().optional(),
	pattern: z.literal(true).optional(),
	gone: z.number().int().nonnegative().optional()
}).strict();
const currentSchema = z.object({
	system: z.number().int().nonnegative(),
	tools: z.number().int().nonnegative(),
	user: z.number().int().nonnegative(),
	inject: z.number().int().nonnegative(),
	skill: z.number().int().nonnegative(),
	assistant: z.number().int().nonnegative(),
	tool: z.number().int().nonnegative(),
	total: z.number().int().nonnegative()
}).strict();
const costBucketsSchema = z.object({
	uncached: z.number().int().nonnegative(),
	cacheRead: z.number().int().nonnegative(),
	cacheWrite: z.number().int().nonnegative(),
	output: z.number().int().nonnegative()
}).strict();
const costModelSchema = z.object({
	peak: costBucketsSchema.optional(),
	off: costBucketsSchema.optional()
}).strict();
const costModelsSchema = z.record(z.string(), costModelSchema);
const costUsageSchema = z.record(z.string(), costModelsSchema);
const toolTimingSchema = z.object({
	calls: z.number().int().nonnegative(),
	ms: z.number().nonnegative()
}).strict();
const timingTotalsSchema = z.object({
	wallMs: z.number().nonnegative(),
	ttftMs: z.number().nonnegative(),
	genMs: z.number().nonnegative(),
	reasoningMs: z.number().nonnegative().optional(),
	textMs: z.number().nonnegative().optional(),
	toolArgMs: z.number().nonnegative().optional(),
	calls: z.number().int().nonnegative(),
	toolsMs: z.number().nonnegative(),
	toolCalls: z.number().int().nonnegative(),
	tools: z.record(z.string(), toolTimingSchema)
}).strict();
/** The baseline-gate record the fallback unit serves (see fallback.ts). */
const unsupportedSchema = z.object({
	current: z.string(),
	minimum: z.string()
}).strict();
/** The stats board's precomputed count figures (the split head — see Snapshot.counts). */
const countsSchema = z.object({
	turns: z.number().int().nonnegative(),
	steps: z.number().int().nonnegative(),
	injects: z.number().int().nonnegative(),
	compactions: z.number().int().nonnegative(),
	prunes: z.number().int().nonnegative()
}).strict();
/** The newest retained request's billing summary (the split head's headline anchor). */
const lastSchema = z.object({
	seq: z.number(),
	total: z.number().int().nonnegative(),
	prompt: z.number().int().nonnegative().optional()
}).strict();
/**
* One wire contract for both generations: the SPLIT head (envelope scalars +
* counts/last/detailRev; the heavy collections stay absent — they ride the
* on-demand detail channel, host/detail.ts) and the INLINE value
* (channel-less hosts and the fallback unit carry the collections in place).
* The collections are therefore optional on the schema; the split marker is
* `detailRev` (present ⟺ split).
*/
const contextTimelineSchema = z.object({
	ok: z.literal(true),
	unsupported: unsupportedSchema.optional(),
	model: z.string().optional(),
	provider: z.string().optional(),
	contextWindow: z.number().optional(),
	current: currentSchema,
	images: z.number().int().nonnegative().optional(),
	toolCalls: z.number().int().nonnegative().optional(),
	humanInputs: z.number().int().nonnegative().optional(),
	lastUser: z.string().optional(),
	counts: countsSchema.optional(),
	last: lastSchema.optional(),
	detailRev: z.number().int().nonnegative().optional(),
	requests: z.array(requestRecordSchema).optional(),
	events: z.array(contextEventSchema).optional(),
	cost: costUsageSchema.optional(),
	timing: timingTotalsSchema.optional(),
	systems: z.array(systemPromptNodeSchema).optional(),
	nodes: z.array(surfaceNodeSchema).optional(),
	droppedNodes: z.number().int().nonnegative().optional(),
	archive: z.array(surfaceNodeSchema).optional(),
	surfaceFloor: z.number().int().nonnegative().optional(),
	archiveFloor: z.number().int().nonnegative().optional(),
	fileOps: z.array(fileOpSchema).optional(),
	fileOpsFloor: z.number().int().nonnegative().optional()
}).strict();
/**
* The persisted fold-state schema (the registry's `stateSchema`
* contract). Validates the plain-JSON `TimelineState` before a checkpoint
* row seeds a fold — the same shape guarantee the projection cache's
* plain-JSON precondition already enforces at write time.
*/
const timelineStateSchema = z.object({
	surface: z.array(surfaceNodeSchema),
	sums: z.object({
		user: z.number().int().nonnegative(),
		inject: z.number().int().nonnegative(),
		skill: z.number().int().nonnegative(),
		assistant: z.number().int().nonnegative(),
		tool: z.number().int().nonnegative()
	}).strict(),
	systemTokens: z.number().int().nonnegative(),
	systems: z.array(systemPromptNodeSchema).optional(),
	systemsFromHeader: z.literal(true).optional(),
	toolsTokens: z.number().int().nonnegative(),
	model: z.string().optional(),
	provider: z.string().optional(),
	lastModel: z.string().optional(),
	contextWindow: z.number().optional(),
	requests: z.array(requestRecordSchema),
	events: z.array(contextEventSchema),
	archived: z.array(surfaceNodeSchema),
	cost: costUsageSchema.optional(),
	archiveFloor: z.number().optional(),
	timing: timingTotalsSchema.optional(),
	humanInputs: z.number().int().nonnegative().optional(),
	lastUser: z.string().optional(),
	stepStart: z.object({
		time: z.number(),
		firstToken: z.number().optional(),
		decode: z.object({
			reasoning: z.number(),
			text: z.number(),
			toolarg: z.number()
		}).strict().optional(),
		block: z.object({
			kind: z.enum([
				"reasoning",
				"text",
				"toolarg"
			]),
			since: z.number()
		}).strict().optional()
	}).strict().optional(),
	callNames: z.record(z.string(), z.object({
		name: z.string(),
		start: z.number(),
		argsRaw: z.string().optional()
	}).strict()),
	pendingShadowedSeqs: z.array(z.number()).optional(),
	pendingShadowEventSeq: z.number().optional(),
	detailRev: z.number().int().nonnegative().optional(),
	fileOps: z.array(fileOpSchema),
	fileOpsFloor: z.number().int().nonnegative().optional(),
	pendingCodeOps: z.record(z.string(), z.array(fileOpSchema)).optional()
});
/**
* The context-timeline projection unit, created per plugin instance with its
* config-resolved retention bounds (config.ts), and registered on
* `ctx.sessionProjections`. Registry lifecycle notes (mirrored from the
* harness contract): registration is an effect on the caller's fiber — an
* unloaded Host half removes the key, and clients read it as capability
* absence. `stateVersion` must be bumped whenever the persisted state shape
* or fold semantics change (invalidation of cached rows); config-only
* changes never require it (bounds tune retention, not state shape).
*
* The definition carries the session-projection contract served by every
* supported harness (see compat.ts): `stateSchema` + a REQUIRED `wire` block.
* (The return type is the mirrored contract, not the installed dts
* `ProjectionDefinition`: the registry's wired-register overload demands
* `wire` PRESENT, which the dts's optional `wire?` fails.) Without the
* `wire` block the registry treats the unit as host-only and never delivers
* `contextTimeline` to the browser (the Context tab would stay on its
* loading screen forever).
*
* `slim` selects the wire generation PER SERVE (a liveness probe, not a
* fixed flag): while the on-demand detail channel is live (host/detail.ts),
* the wire value is the SLIM head (buildTimelineHead) — the heavy
* collections no longer ride every session.list row, control baseline,
* follow snapshot, and push frame. Before the channel arms (the connection
* service may activate after this plugin) or on a deployment whose
* connection/sessions services never compose, the unit serves the INLINE
* value so the tab keeps working end to end. Both generations validate
* against the same schema (the collections are optional on it), and both
* fold the SAME state — the split is view-only, so no `stateVersion` bump
* and no cached-row invalidation comes with it (the `detailRev` state field
* is additive-optional: older rows restore without it and read as revision
* 0).
*/
function createContextTimelineDefinition(config, slim) {
	const bounds = resolveBounds(config);
	const view = (state) => slim() ? buildTimelineHead(state) : buildTimelineView(state, bounds);
	return {
		key: "contextTimeline",
		stateSchema: timelineStateSchema,
		wire: {
			viewSchema: contextTimelineSchema,
			view
		},
		init: () => createTimelineState(),
		apply: (state, event) => applyTimeline(state, event, bounds),
		stateVersion: 20
	};
}
//#endregion
//#region src/host/fallback.ts
/**
* The baseline gate's fallback projection units (see host/index.ts).
*
* On a harness below the supported baseline (shared/version.ts) the plugin
* registers these INSTEAD of the real folds: the log's event shapes on such
* a harness are outside the compat matrix, so nothing is parsed at all —
* `apply` is the identity over an opaque empty state, and `view` serves a
* fixed value whose timeline snapshot carries the gate record (`unsupported`:
* the detected harness version and the baseline). The client's cards render
* the blank data and its gate modal urges the upgrade; the registry pipeline
* (fold, cache, push feed) keeps working end to end, so nothing hangs on a
* loading screen.
*
* The definition carries BOTH registry contract generations: the modern
* `stateSchema` + `wire` block (dsh 0.1.1-rc.1+, the realistic below-baseline
* case) and the pre-0.1.1 top-level `schema` + `view` aliases that line's
* registry reads instead. Each registry ignores the other generation's
* fields, so one definition serves the gate on every harness that can
* deliver projections to clients at all.
*
* `stateVersion` is pinned at 1. Downgrade/upgrade cache choreography: a
* downgrade to a gated harness refolds the timeline key from scratch (no
* ver-1 rows exist for it) and seeds the headers key from the real unit's
* ver-1 rows — stripped to the empty state, which the gate never reads. An
* upgrade back discards the fallback's ver-1 timeline rows and REJECTS its
* ver-1 headers rows at the real unit's stricter state schema, refolding
* both from the log. Nothing stale survives in either direction.
*/
/**
* The opaque fold state: the gate folds nothing, so any cached row seeds it
* (strip-mode object — never a discard, never a throw), and the plain-JSON
* cache-write gate trivially holds.
*/
const fallbackStateSchema = z.object({});
/** One gate unit: identity fold over the opaque state, constant view, both contract generations. */
function fallbackDefinition(key, wireSchema, value) {
	const view = () => value;
	return {
		key,
		stateSchema: fallbackStateSchema,
		init: () => ({}),
		apply: (state) => state,
		wire: {
			viewSchema: wireSchema,
			view
		},
		schema: wireSchema,
		view,
		stateVersion: 1
	};
}
/**
* The fallback `contextTimeline` unit: serves the fixed zeroed snapshot
* naming the detected harness `current` version against the baseline.
*/
function createFallbackTimelineDefinition(current) {
	return fallbackDefinition("contextTimeline", contextTimelineSchema, {
		ok: true,
		unsupported: {
			current,
			minimum: BASELINE_DSH_VERSION
		},
		current: {
			system: 0,
			tools: 0,
			user: 0,
			inject: 0,
			skill: 0,
			assistant: 0,
			tool: 0,
			total: 0
		},
		requests: [],
		events: [],
		nodes: [],
		droppedNodes: 0,
		archive: []
	});
}
/**
* The fallback `contextHeaders` unit: an empty epoch list — the browser's
* header sections degrade to their metadata-free rendering.
*/
function createFallbackHeadersDefinition() {
	return fallbackDefinition("contextHeaders", contextHeadersSchema, { headers: [] });
}
/**
* The fallback `contextActivity` unit: an empty ledger — the overview's
* heatmap renders its empty note instead of waiting on a key that the gate
* would never deliver.
*/
function createFallbackActivityDefinition() {
	return fallbackDefinition("contextActivity", contextActivitySchema, { days: {} });
}
//#endregion
//#region src/host/settings.ts
/** The namespace is the join key between the Host registration and the browser card. */
const SETTINGS_NAMESPACE = "dsh-context";
/** Section schema: also the wire envelope the browser scope validates against. */
const SettingsSchema = z$1.object({
	defaultPlacement: z$1.union([
		"all",
		"tab",
		"sidebar"
	]).default("all").loose(),
	defaultGranularity: z$1.union(["step", "turn"]).default("step"),
	defaultTrendMode: z$1.union(["total", "delta"]).default("total").loose(),
	defaultToolSort: z$1.union([
		"size",
		"count",
		"name"
	]).default("count").loose(),
	defaultFileSort: z$1.union([
		"count",
		"latest",
		"path"
	]).default("count").loose(),
	insightsEntry: z$1.union(["show", "hide"]).default("show").loose()
});
/** Serve the namespace while a settings provider is composed; inert otherwise. */
function installSettings(ctx) {
	ctx.inject(["settings"], (sctx) => {
		sctx.settings.register(SETTINGS_NAMESPACE, SettingsSchema);
	});
}
//#endregion
//#region src/host/stepIdentity.ts
/**
* Step-boundary message identity guard (issue #51 compatibility).
*
* The harness refuses to LOAD any session whose durable log carries a
* `user/message` event whose message lacks a non-empty string `id`
* (`assertMessageEventShape`) — while the runtime append path runs no such
* check. One unidentified message therefore persists silently and permanently
* bricks the session at its next load (`... failed validation: session event
* at seq N lacks an identified message`). The observed archive held a wrap-up
* notice whose `id` (and `summary`) had been stripped upstream of the append —
* a shape no shipped harness producer emits, i.e. a delivery-boundary rebuild
* outside the audited paths of both this plugin and the harness.
*
* This guard hardens the durability boundary from the plugin side. The agent
* loop appends every step-boundary `user/message` from the `agent/pre-step`
* decision's `messages` — the one seam all claimed inbox input (prompts,
* steering, tool-deferred context) flows through before it persists. A
* prepended listener sits OUTERMOST in that waterfall, so after `next()`
* resolves it sees the final message list: any message that would persist
* unidentified gets a fresh id; everything else passes by reference, and the
* decision object is copied only when a mint happened.
*
* Fail-open by contract: a hostile entry (one that throws on property access),
* a missing list, or any unexpected shape leaves the decision verbatim — a
* guard must never break the turn it protects. Minted ids carry the `dshctx-`
* prefix so a backfilled message stays identifiable in the wild.
*/
/** Prefix marking an id this guard minted (forensically distinguishable). */
const MINTED_ID_PREFIX = "dshctx-";
/**
* Whether the message fails the harness's restore-time identity check (a
* non-empty string id). Non-object entries are unfixable (an id needs a
* container) and stay verbatim.
*/
function lacksId(message) {
	if (typeof message !== "object" || message === null) return false;
	const id = message.id;
	return typeof id !== "string" || id === "";
}
/**
* Mint ids for the messages that would persist unidentified.
* @param messages - the decision's message list, in append order.
* @returns the rewritten list (untouched entries by reference), or undefined
*   when every entry already carries an identity.
*/
function identifiedMessages(messages) {
	let copy;
	for (const [index, message] of messages.entries()) {
		if (!lacksId(message)) {
			copy?.push(message);
			continue;
		}
		copy ??= messages.slice(0, index);
		copy.push({
			...message,
			id: MINTED_ID_PREFIX + randomUUID()
		});
	}
	return copy;
}
/** Arm the prepended `agent/pre-step` guard on the plugin's context. */
function watchStepIdentity(ctx) {
	ctx.on("agent/pre-step", async (_input, next) => {
		const decision = await next();
		try {
			if (decision.kind !== "enter" || !Array.isArray(decision.messages)) return decision;
			const identified = identifiedMessages(decision.messages);
			return identified === void 0 ? decision : {
				...decision,
				messages: identified
			};
		} catch {
			return decision;
		}
	}, { prepend: true });
}
//#endregion
//#region src/host/version.ts
/**
* Runtime harness-version probe behind the baseline gate (host/index.ts).
*
* The probe never imports a harness package for its version; it reads
* manifests through Node resolution from two anchors, in order:
*
*  1. This module's own ESM resolution of the library packages the Host half
*     imports at runtime. That is the very pipeline the process resolves those
*     imports through, so an embedding shell that redirects plugin imports —
*     the packaged Desktop's ASAR resolver bridge does exactly this — redirects
*     the probe identically, and the answer names the module instances the
*     harness is actually running. A witness that lands inside this package's
*     own tree is the plugin's dependency closure (a `link:`-installed dev
*     checkout's pinned devDependencies), never the harness, so it is discarded
*     for the home anchor.
*  2. The harness home's healed `profiles/node_modules` mirror (located via
*     the app-boot `dshHomePath` service). It names the installation that last
*     healed it: authoritative for a dev checkout, whose own tree holds pinned
*     devDependencies, but only as fresh as the last CLI profile boot. A
*     packaged Desktop never heals it, so a stale global-CLI mirror can outlive
*     the CLI and misname the running harness — that is why it answers only
*     when the running anchor has nothing it can trust.
*
* The `@deepseek-ai/dsh` CLI package is probed ONLY through the home anchor:
* the plugin never imports it, so a hit from the running anchor can only be an
* ambient install above the plugin's tree (e.g. a global copy under
* ~/node_modules) — not necessarily the RUNNING harness.
*
* Every step is guarded: any failure (absent service, unresolvable package,
* non-file URL, unreadable/invalid manifest, non-string version) degrades to
* `undefined`, and the gate treats an unknown version as SATISFIED — a probe
* misfire must never blank a working deployment.
*/
/**
* Library packages whose manifest version IS the harness release version (the
* dsh monorepo versions every package in lockstep). The home anchor probes
* them after the CLI package; the running anchor probes the two first- and
* second-ordered.
*/
const LIBRARY_PROBE_PACKAGES = ["@deepseek-ai/dsh-session-projection", "@deepseek-ai/dsh-session"];
/**
* Running-anchor probe order: the package the Host half genuinely imports at
* runtime first (host/fold.ts imports it, so it MUST resolve whenever this
* plugin runs), then its co-versioned sibling.
*/
const RUNNING_PROBE_PACKAGES = ["@deepseek-ai/dsh-session", "@deepseek-ai/dsh-session-projection"];
/** Home-anchor probe order: the user-facing CLI version first, then the libraries. */
const HOME_PROBE_PACKAGES = ["@deepseek-ai/dsh", ...LIBRARY_PROBE_PACKAGES];
/**
* This package's root. A running-anchor witness under it belongs to the
* plugin's own dependency closure, not to the harness.
*
* Located through the package's own `./package.json` self-reference: Node
* resolves that against the nearest package.json, so the answer is the package
* root in the source tree and in the bundled profile install alike — a fixed
* number of `..` steps cannot be, since `src/host/` and `lib/` differ by a
* level. A loader that cannot self-resolve (an exotic loader, or a fork renamed
* without a matching `exports`) falls back to this module's own directory: the
* guard then covers less of the package, but it still can never mistake the
* plugin's own `node_modules` for the harness.
*/
function ownPackageRoot() {
	try {
		return dirname(fileURLToPath(import.meta.resolve("dsh-context/package.json")));
	} catch {
		/* v8 ignore next -- a loader that cannot resolve one of its own package's
		published subpaths is out of the suite's reach; the fallback keeps one
		probe path (an unanswered probe fails open either way). */
		return dirname(fileURLToPath(import.meta.url));
	}
}
const PLUGIN_ROOT = ownPackageRoot();
/** One manifest's `version`, or undefined on any read/shape failure. */
function versionOfManifest(manifestPath, expectedName) {
	try {
		const parsed = JSON.parse(readFileSync(manifestPath, "utf8"));
		if (parsed === null || typeof parsed !== "object") return void 0;
		const record = parsed;
		if (expectedName !== void 0 && record.name !== expectedName) return void 0;
		return typeof record.version === "string" && record.version !== "" ? record.version : void 0;
	} catch {
		return;
	}
}
/** Probe the package's published `./package.json` subpath. */
function versionViaManifest(resolve, packageName) {
	try {
		return versionOfManifest(resolve(packageName + "/package.json"));
	} catch {
		return;
	}
}
/**
* Probe via the package's entry point, ascending to its owning manifest.
* Covers the packaged-executable module proxies: their generated manifests
* carry the real version but export only entry stubs, and Node's exports
* gate refuses the direct `./package.json` subpath.
*/
function versionViaEntry(resolve, packageName) {
	let dir;
	try {
		dir = dirname(resolve(packageName));
	} catch {
		return;
	}
	for (;;) {
		const version = versionOfManifest(join(dir, "package.json"), packageName);
		if (version !== void 0) return version;
		const parent = dirname(dir);
		if (parent === dir) return void 0;
		dir = parent;
	}
}
/** One anchor's answer: the first probe package that yields a version. */
function probeAnchor(resolve, packageNames) {
	for (const packageName of packageNames) {
		const version = versionViaManifest(resolve, packageName) ?? versionViaEntry(resolve, packageName);
		if (version !== void 0) return version;
	}
}
/**
* Whether `candidate` lies inside `root`'s tree. A `..`-prefixed relative path
* escapes it; a sibling such as `dsh-context-extra` is reached through `..` too,
* so it never counts as a child. A pathological child literally named `..foo`
* would degrade to the home anchor, which is the safe direction.
*/
function isInside(root, candidate) {
	const rel = relative(root, candidate);
	return rel !== "" && !rel.startsWith("..") && !isAbsolute(rel);
}
/**
* The running module tree's answer, or undefined when it cannot be trusted.
* Each probe package is checked on its own: a witness inside the plugin's own
* closure is the plugin's dependency, not the harness, and a trusted witness
* whose manifest cannot be read is no answer either — the next package may
* still resolve to one.
*/
function probeRunningTree(resolve, pluginRoot) {
	for (const packageName of RUNNING_PROBE_PACKAGES) {
		let witness;
		try {
			witness = resolve(packageName);
		} catch {
			continue;
		}
		if (isInside(pluginRoot, witness)) continue;
		const version = versionViaManifest(resolve, packageName) ?? versionViaEntry(resolve, packageName);
		if (version !== void 0) return version;
	}
}
/** The default running anchor: this module's own ESM resolution. */
function resolveRunningModule(specifier) {
	return import.meta.resolve(specifier);
}
/**
* The running harness's version string, or undefined when nothing answers
* (the gate fails open on it — see the header note).
* @param resolveUrl - the running anchor's URL resolver (injectable for hermetic tests).
* @param pluginRoot - this package's root for the own-closure check (injectable for hermetic tests).
*/
function detectHarnessVersion(ctx, resolveUrl = resolveRunningModule, pluginRoot = PLUGIN_ROOT) {
	const running = probeRunningTree((specifier) => {
		const url = resolveUrl(specifier);
		if (!url.startsWith("file:")) throw new Error(`dsh-context: non-file module URL for ${specifier}`);
		return fileURLToPath(url);
	}, pluginRoot);
	if (running !== void 0) return running;
	try {
		const homePath = ctx.get("dshHomePath");
		if (typeof homePath === "function") {
			const req = createRequire(homePath("profiles", "dsh-context-version-probe.cjs"));
			const home = probeAnchor((specifier) => req.resolve(specifier), HOME_PROBE_PACKAGES);
			if (home !== void 0) return home;
		}
	} catch {}
}
//#endregion
//#region src/host/index.ts
const name = "dsh-context";
const inject = ["sessionProjections"];
function apply(ctx, config) {
	watchBalanceChannel(ctx);
	const harnessVersion = detectHarnessVersion(ctx);
	if (harnessVersion !== void 0 && !meetsBaseline(harnessVersion)) {
		ctx.sessionProjections.register(createFallbackTimelineDefinition(harnessVersion));
		ctx.sessionProjections.register(createFallbackHeadersDefinition());
		ctx.sessionProjections.register(createFallbackActivityDefinition());
		return;
	}
	const attribution = createToolAttribution(ctx);
	watchStepIdentity(ctx);
	const gate = watchDetailChannel(ctx, resolveBounds(config));
	ctx.sessionProjections.register(createContextTimelineDefinition(config, () => gate.live));
	ctx.sessionProjections.register(createContextHeadersDefinition((name) => attribution.ownerOf(name)));
	ctx.sessionProjections.register(createContextActivityDefinition());
	watchActivityBackfill(ctx);
	installSettings(ctx);
}
//#endregion
export { Config, apply, inject, name };
