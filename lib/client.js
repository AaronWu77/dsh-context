window.__ModuleLoader__.load({
	id: "dsh-context",
	factory: (require) => {
		var module = { exports: {} };
		module.exports;
		let react = require("react");
		let react_jsx_runtime = require("react/jsx-runtime");
		let react_dom = require("react-dom");
		let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		//#region src/client/i18n.ts
		const DICT_ZH = {
			"tab": "上下文",
			"sidebar.guideDescription": "查看上下文的构成、统计、演变。",
			"cat.system": "系统提示词",
			"cat.tools": "工具定义",
			"cat.user": "用户消息",
			"cat.inject": "注入内容",
			"cat.skill": "技能注入",
			"cat.assistant": "助手消息",
			"cat.tool": "工具结果",
			"overview.title": "当前上下文",
			"overview.estimate": "tokens（估算）",
			"overview.free": "剩余窗口",
			"overview.used": "上下文已用",
			"overview.ofUsed": "占已用上下文",
			"overview.compactReserve": "自动压缩预留：占用达 {pct}% 窗口时触发压缩，此区域一般不实际占用",
			"stats.title": "上下文统计",
			"stats.turns": "轮次",
			"stats.steps": "步数",
			"stats.humanInputs": "用户输入",
			"stats.humanInputsTip": "当前会话中的用户消息与问题回答次数。",
			"stats.toolCalls": "工具调用",
			"stats.cacheHit": "缓存命中",
			"stats.cacheHitTip": "整个会话累计的缓存读取占计费输入的比例。",
			"stats.cost": "费用",
			"stats.costTip": "估算当前 Agent 与其所有子 Agent 的累计费用：单价取自 models.dev 刊例价，人民币按 1 元 = 0.15 美元换算，仅供参考。",
			"stats.costTipDeepseek": "DeepSeek 高峰时段（北京时间工作日 9:00–12:00、14:00–18:00）按挂牌价计费，其余时段半价。",
			"stats.subCost": "子 Agent 费用",
			"stats.subCostTip": "所有子 Agent 会话各自累计费用（同口径估算）的合计，不含当前 Agent 自身。",
			"stats.costPriceHead": "每百万 tokens 价格：",
			"stats.costPriceHeadPair": "每百万 tokens 价格（高峰|空闲）：",
			"stats.costHit": "命中",
			"stats.costMiss": "未命中",
			"stats.costWrite": "写入",
			"stats.costOut": "输出",
			"stats.costUnavailable": "模型价格暂不可用（自动重试中），费用暂无法估算。",
			"timing.title": "耗时统计",
			"timing.total": "活跃时长",
			"timing.ttft": "模型等待",
			"timing.gen": "模型生成",
			"timing.reasoning": "模型思考",
			"timing.text": "模型输出",
			"timing.toolArgs": "工具参数",
			"timing.tools": "工具执行",
			"timing.other": "其他开销",
			"timing.callTimes": "{n}次",
			"timing.toolTimes": "{n}次",
			"timing.empty": "暂无耗时数据 · 对话开始后这里会显示时长分布",
			"tokens.title": "Token 统计",
			"tokens.total": "总用量",
			"tokens.output": "输出",
			"tokens.outputNote": "含思考",
			"plugin.title": "插件信息",
			"plugin.hint": "The best DSH context plugin ⭐",
			"plugin.name": "插件",
			"plugin.github": "GitHub",
			"plugin.settings": "设置",
			"plugin.settingsOpen": "打开设置",
			"trend.title": "上下文趋势",
			"gran.step": "步骤",
			"gran.turn": "轮次",
			"settings.title": "上下文",
			"settings.desc": "dsh-context 插件中上下文面板的偏好设置",
			"settings.placement": "入口位置",
			"placement.tab": "标签页",
			"placement.sidebar": "侧边栏",
			"placement.all": "全部",
			"settings.insightsEntry": "上下文洞察入口",
			"insightsEntry.show": "显示",
			"insightsEntry.hide": "隐藏",
			"settings.gran": "趋势图 · 默认粒度",
			"settings.mode": "趋势图 · 默认展示方式",
			"settings.toolSort": "工具定义 · 默认排序",
			"settings.fileSort": "文件活动 · 默认排序",
			"settings.expand": "展开",
			"settings.collapse": "收起",
			"settings.readOnly": "当前环境的设置为只读",
			"gran.total": "全量",
			"gran.delta": "增量",
			"gran.modeHint": "全量：累计构成；增量：相对上一条请求的变化量",
			"trend.focus": "仅展示 {cat}",
			"trend.adaptive": "自适应",
			"trend.adaptiveHint": "按当前可视范围内的柱子重新缩放高度，滚动时随之变化",
			"trend.empty": "发起一轮对话后，这里会展示每次模型请求的上下文构成",
			"detail.step": "第 {t} 轮 · 第 {s} 步 (共 {n} 步)",
			"detail.turn": "第 {t} 轮 · 共 {n} 步",
			"detail.lastStep": "末步",
			"detail.estTotal": "估算合计 ≈ {n}",
			"detail.actual": "实际 {n}",
			"detail.output": "输出 {n}",
			"detail.cache": "缓存 {n}%",
			"brief.turn": "本轮",
			"brief.input": "输入",
			"brief.reply": "回复",
			"brief.more": "+{n}",
			"brief.noInputs": "（无新增）",
			"brief.locate": "在上下文浏览器中查看",
			"jump.title": "在上下文视图中查看此轮",
			"brief.turnTip": "这一轮开场时用户发送的消息；回合内的每一步都会回显同一条",
			"brief.inputTip": "上一步回复之后、本次请求发出前新进入上下文的内容——通常是上一步所调工具的结果；每轮的第一步无新增",
			"brief.replyTip": "这一步模型返回的内容（文本回复或工具调用）；此步发起的调用，其结果会出现在下一柱的「输入」行",
			"events.title": "上下文事件",
			"events.empty": "暂无上下文事件（压缩、注入、模型切换会出现在这里）",
			"events.at": "第 {t} 轮 · 第 {s} 步",
			"events.range": "第 {t} 轮 · 第 {a}→{b} 步",
			"events.rangeTo": "第 {a} 轮 · 第 {as} 步 → 第 {b} 轮 · 第 {bs} 步",
			"kind.inject": "注入",
			"kind.compaction": "压缩",
			"kind.prune": "剪枝",
			"kind.model": "切换",
			"kind.mode": "模式",
			"files.title": "文件活动",
			"files.scopeLatest": "截至最新 · 跟随趋势图的选择",
			"files.kind.all": "全部",
			"files.kind.read": "读取",
			"files.kind.write": "写入",
			"files.kind.search": "搜索",
			"files.kind.image": "图片",
			"files.chipTip": "{files} 个文件 · {ops} 次操作",
			"files.search": "按路径过滤…",
			"files.sort.count": "按次数",
			"files.sort.latest": "按最新",
			"files.sort.path": "按路径",
			"files.sortTip": "文件排序：按操作次数（选中分类时按该分类的次数）、最近操作时间或路径",
			"files.files": "{n} 个文件",
			"files.deltaTip": "按 edit/write 调用参数估算的累计行数变化：+ 新增 / − 删除",
			"files.empty": "该范围内没有文件读取、写入或搜索操作",
			"files.noMatch": "没有匹配当前过滤条件的文件",
			"files.locate": "在上下文浏览器中查看此次操作",
			"files.hits": "{n} 处命中",
			"files.readTip": "读取第 {a}–{b} 行",
			"files.open": "在系统中打开",
			"files.preview": "在侧边栏预览",
			"files.readEst": "按调用参数 limit 估算的读取行数",
			"files.errs": "{n} 次失败",
			"files.form.image": "图片",
			"files.form.dir": "目录",
			"files.form.text": "文件",
			"files.glyph.root": "工作区根",
			"files.glyph.tests": "测试",
			"files.glyph.docs": "文档目录",
			"files.glyph.deps": "依赖",
			"files.glyph.build": "构建产物",
			"files.glyph.scripts": "脚本",
			"files.glyph.config": "配置",
			"files.glyph.assets": "静态资源",
			"files.glyph.hidden": "元数据目录",
			"files.glyph.lock": "锁文件",
			"files.glyph.docker": "Docker",
			"files.glyph.ignore": "忽略规则",
			"files.glyph.license": "许可证",
			"files.glyph.python": "Python",
			"files.glyph.notebook": "Notebook",
			"files.glyph.shell": "Shell",
			"files.glyph.style": "样式",
			"files.glyph.database": "数据库",
			"files.glyph.data": "数据清单",
			"files.glyph.markdown": "标记文档",
			"files.glyph.log": "日志",
			"files.glyph.sheet": "表格",
			"files.glyph.document": "文档",
			"files.glyph.archive": "压缩包",
			"files.glyph.font": "字体",
			"files.glyph.media": "媒体",
			"files.glyph.lang.ts": "TypeScript",
			"files.glyph.lang.js": "JavaScript",
			"files.glyph.lang.go": "Go",
			"files.glyph.lang.rust": "Rust",
			"files.glyph.lang.java": "Java",
			"files.glyph.lang.kotlin": "Kotlin",
			"files.glyph.lang.ruby": "Ruby",
			"files.glyph.lang.php": "PHP",
			"files.glyph.lang.c": "C",
			"files.glyph.lang.cpp": "C++",
			"files.glyph.lang.csharp": "C#",
			"files.glyph.lang.scala": "Scala",
			"files.glyph.lang.lua": "Lua",
			"files.glyph.lang.dart": "Dart",
			"files.glyph.lang.swift": "Swift",
			"files.glyph.lang.vue": "Vue",
			"files.glyph.lang.svelte": "Svelte",
			"files.glyph.lang.html": "HTML",
			"agents.title": "Agent 网络",
			"agents.sub": "当前 Agent 与子 Agent 的实时上下文 · 点击节点跳转会话",
			"agents.chip.count": "{n} 个 Agent",
			"agents.chip.running": "{n} 个运行中",
			"agents.chip.tokens": "上下文合计 {n}",
			"agents.more": "另有 {n} 个未显示",
			"agents.solo": "还没有子 Agent — 当 Agent 通过 subagent 工具委派任务时，协作网络会在这里展开",
			"agents.self": "当前",
			"agents.running": "运行中",
			"agents.legend.free": "空闲窗口",
			"agents.oneshot": "一次性",
			"agents.continuable": "多轮",
			"agents.requests": "{n} 次请求",
			"agents.billed": "累计计费 {n}",
			"agents.open": "点击打开会话 →",
			"loading": "正在读取会话日志…",
			"detail.loading": "正在加载历史数据…",
			"detail.loadFailed": "历史数据加载失败，点击重试",
			"error": "上下文数据读取失败：",
			"error.retry": "重试",
			"gate.title": "请更新 DeepSeek Harness 版本",
			"gate.body": "dsh-context 插件支持 DeepSeek Harness v{minimum} 或更新版本。",
			"gate.current": "当前版本",
			"gate.minimum": "最低要求",
			"gate.orNewer": "及更新的版本",
			"gate.ok": "知道了",
			"footer": "Token 数量统计：「估算」与 DeepSeek Harness 内置 tokenMeter 相同的固定密度启发式（约 4 字符 ≈ 1 token）；「实际」为供应商上报用量。",
			"tip.step": "第 {t} 轮 · 第 {s} 步 (共 {n} 步)",
			"tip.turn": "第 {t} 轮 · 共 {n} 步",
			"tip.turn1": "第 {t} 轮 · 共 1 步",
			"tip.total": "合计 ≈ {n}",
			"tip.cat": "{cat} ≈ {n}",
			"tip.delta": "Δ {n}",
			"ev.compaction": "压缩上下文（摘要替换 {n} 条消息）",
			"ev.prune": "剪枝工具输出",
			"ev.skill": "Skill 注入（{name}）",
			"ev.model": "模型切换：{a} → {b}",
			"ev.mode.plan.on": "进入计划模式",
			"ev.mode.plan.off": "退出计划模式",
			"form.instructions": "指令注入",
			"form.catalog": "目录更新",
			"form.snapshot": "状态快照",
			"form.notice": "通知",
			"form.relay": "代理转发",
			"form.recall": "历史召回",
			"form.context": "上下文注入",
			"node.toolResult": "工具结果",
			"node.calls": "调用 ",
			"node.empty": "(空回复)",
			"node.nonText": "(非文本消息)",
			"node.snapshot": "快照: ",
			"node.skillTag": "技能 · {name}",
			"cmd.label": "上下文",
			"cmd.section": "上下文",
			"cmd.desc": "查看当前上下文构成，浏览各步骤组成",
			"cmd.close": "关闭",
			"browser.title": "上下文浏览器",
			"browser.live": "当前（下一次请求）",
			"browser.liveNow": "当前 · 下一次请求",
			"browser.items": "{n} 项",
			"browser.missingLive": "… 另有 {n} 条更早的消息也在上下文中（超出展示窗口）",
			"browser.approx": "该步骤涉及的部分已移除消息超出保留范围，以下为近似构成",
			"browser.deltaHint": "对比上轮末步的变动",
			"browser.dna": "DNA 模式",
			"browser.dnaTip": "按模型读取上下文的次序逐条展示每一项：系统提示词、工具定义，然后是按时间排列的消息；悬停查看条目，点击定位到下方列表",
			"browser.noHeader": "此数据来自旧版插件：仅提供 token 估算，无实际内容",
			"browser.noEpoch": "该步骤的头部内容（系统提示词 / 工具定义）不在保留范围内",
			"browser.headerMetaOnly": "此环境不支持按需读取头部内容，仅显示 token 估算",
			"browser.noSystem": "该请求头部未包含系统提示词",
			"browser.noContent": "完整内容不在当前加载的消息窗口内（在聊天页加载更早历史后可查看）",
			"browser.search.user": "按消息内容过滤…",
			"browser.search.inject": "按注入内容过滤…",
			"browser.search.skill": "按技能过滤…",
			"browser.search.assistant": "按回复或调用过滤…",
			"browser.search.tool": "按工具或参数过滤…",
			"browser.rowNoMatch": "没有匹配当前过滤条件的行",
			"browser.loading": "正在从更早的会话历史加载完整内容…",
			"browser.notInLog": "会话日志中未找到该条目的完整内容（可能已被压缩或清理）",
			"browser.loadFailed": "内容加载失败，点击重试",
			"tool.desc": "描述",
			"tool.params": "参数",
			"tool.paramsEmpty": "（无参数）",
			"tool.plugin": "该工具的注册插件（仅供参考）",
			"tool.unknown": "未知插件",
			"tool.unknownTitle": "因早于上下文插件加载或原插件已卸载，无法查询该工具的提供者",
			"tool.jsonToggle": "查看原始 JSON",
			"tool.jsonHide": "收起",
			"tool.search": "按名称、描述或参数过滤…",
			"tool.sort.size": "按大小",
			"tool.sort.count": "按次数",
			"tool.sort.name": "按名称",
			"tool.sortTip": "工具排序：按当前步骤中的调用次数（默认）、token 大小或名称",
			"tool.hitsTip": "当前展示步骤的上下文中，该工具被调用并返回结果的次数",
			"tool.noMatch": "没有匹配当前过滤条件的工具",
			"rich.raw": "原文",
			"rich.md": "Markdown",
			"rich.toMd": "按 Markdown 渲染查看",
			"rich.toRaw": "查看原始文本",
			"rich.copy": "复制原文",
			"rich.copied": "已复制",
			"rich.md.copy": "复制",
			"rich.md.copied": "已复制",
			"rich.md.footnotes": "脚注",
			"block.thinking": "思考",
			"block.answer": "回答",
			"block.content": "内容",
			"block.result": "结果",
			"block.summary": "摘要",
			"block.line": "{n} 行",
			"block.lines": "{n} 行",
			"call.ok": "正常",
			"call.fail": "失败",
			"call.exit": "exit {n}",
			"node.failed": "工具执行失败",
			"attach.images": "图片附件",
			"attach.other": "其他内容",
			"attach.image": "图片",
			"attach.open": "查看原图",
			"attach.preview": "图片预览",
			"attach.close": "关闭",
			"attach.loading": "…",
			"attach.loadFailed": "加载失败 · 点击重试",
			"attach.raw": "原图",
			"attach.sent": "发送",
			"attach.token": "Token",
			"attach.tokensTip": "按 DeepSeek 官方图片尺寸换算（单图上限 384 tokens）估算的 token 消耗",
			"ov.entry": "上下文洞察",
			"ov.title": "上下文洞察",
			"ov.unavailable": "会话列表暂不可用",
			"ov.range.label": "统计范围",
			"ov.range.7d": "近 7 天",
			"ov.range.30d": "近 30 天",
			"ov.range.all": "全部",
			"ov.kpi.sessions": "活跃会话",
			"ov.kpi.ofTotal": "共 {n} 个",
			"ov.kpi.tokens": "累计消耗",
			"ov.kpi.sessionsSub": "含 {n} 个会话",
			"ov.kpi.toolSub": "工具执行 {dur}",
			"ov.kpi.wallSub": "模型调用 {n}",
			"ov.quota.balance": "账户余额",
			"ov.quota.balanceSub": "赠金 {granted} · 充值 {topped}",
			"ov.quota.codex5h": "Codex 5 小时额度",
			"ov.quota.codexWeek": "Codex 周额度",
			"ov.quota.resetIn": "{d} 后重置",
			"ov.quota.codexWindow": "Codex {w} 额度",
			"ov.quota.remaining": "剩余 {p}%",
			"ov.quota.today": "今日用量",
			"balance.title": "DeepSeek 余额",
			"balance.tip.total": "总余额",
			"balance.tip.granted": "赠送余额",
			"balance.tip.toppedUp": "充值余额",
			"ov.heat.title": "活跃度",
			"ov.heat.sub": "按日期筛选",
			"ov.heat.empty": "暂无活跃数据 — 会话产生模型请求后，这里会显示每日用量",
			"ov.heat.sessions": "{n} 个活跃会话",
			"ov.heat.wd.1": "一",
			"ov.heat.wd.3": "三",
			"ov.heat.wd.5": "五",
			"ov.heat.mon.01": "1月",
			"ov.heat.mon.02": "2月",
			"ov.heat.mon.03": "3月",
			"ov.heat.mon.04": "4月",
			"ov.heat.mon.05": "5月",
			"ov.heat.mon.06": "6月",
			"ov.heat.mon.07": "7月",
			"ov.heat.mon.08": "8月",
			"ov.heat.mon.09": "9月",
			"ov.heat.mon.10": "10月",
			"ov.heat.mon.11": "11月",
			"ov.heat.mon.12": "12月",
			"ov.list.title": "会话",
			"ov.list.search": "搜索标题或目录…",
			"ov.list.sortLabel": "排序",
			"ov.list.sort.recent": "最近更新",
			"ov.list.sort.tokens": "Token 总用量",
			"ov.list.sort.context": "当前 Context",
			"ov.list.empty": "还没有会话 — 发起一轮对话后，这里会列出每个会话的上下文画像",
			"ov.list.noMatch": "没有匹配当前筛选条件的会话",
			"ov.list.noData": "暂无上下文数据 — 该会话产生模型请求后才会统计",
			"ov.list.dayFilter": "{day} 当日活跃",
			"ov.list.dayClear": "清除日期筛选",
			"ov.list.pager": "会话分页",
			"ov.list.page": "第 {n} / {total} 页",
			"ov.list.prev": "上一页",
			"ov.list.next": "下一页",
			"ov.group.label": "分组",
			"ov.group.ungrouped": "未分组",
			"ov.running": "运行中",
			"ov.current": "当前",
			"ov.card.turns": "{n} 轮 {s} 步",
			"ov.card.lastUser": "最后消息",
			"ov.time.now": "刚刚",
			"ov.time.m": "{n} 分钟前",
			"ov.time.h": "{n} 小时前",
			"ov.time.d": "{n} 天前"
		};
		const DICT_EN = {
			"tab": "Context",
			"sidebar.guideDescription": "Inspect context composition, stats, and evolution.",
			"cat.system": "System Prompt",
			"cat.tools": "Tool Schemas",
			"cat.user": "User Messages",
			"cat.inject": "Injected Context",
			"cat.skill": "Skill Injections",
			"cat.assistant": "Assistant Messages",
			"cat.tool": "Tool Results",
			"overview.title": "Current Context",
			"overview.estimate": "tokens (estimated)",
			"overview.free": "Free Window",
			"overview.used": "of context used",
			"overview.ofUsed": "of used context",
			"overview.compactReserve": "Auto-compaction reserve: auto-compaction triggers at {pct}% of the window — this area is normally kept as headroom, not actually used",
			"stats.title": "Context Stats",
			"stats.turns": "Turns",
			"stats.steps": "Steps",
			"stats.humanInputs": "Human Inputs",
			"stats.humanInputsTip": "User messages and question answerings in current session.",
			"stats.toolCalls": "Tool Calls",
			"stats.cacheHit": "Cache Hit",
			"stats.cacheHitTip": "Cumulative cache-read share of billed input across the session.",
			"stats.cost": "Cost",
			"stats.costTip": "Estimates the cumulative cost of this agent and all its subagents: rates come from the models.dev list prices; the CNY display converts at 1 CNY = 0.15 USD. Prices are for reference only.",
			"stats.costTipDeepseek": "DeepSeek bills peak windows (Beijing Time weekdays 09:00–12:00, 14:00–18:00) at list price; all other hours are half price.",
			"stats.subCost": "Subagent Cost",
			"stats.subCostTip": "Summed estimates of every subagent session’s own cumulative cost (same basis); the current agent is not included.",
			"stats.costPriceHead": "Per-1M-token rates:",
			"stats.costPriceHeadPair": "Per-1M-token rates (peak|off-peak):",
			"stats.costHit": "hit",
			"stats.costMiss": "miss",
			"stats.costWrite": "write",
			"stats.costOut": "output",
			"stats.costUnavailable": "Model prices are unavailable (retrying automatically) — the cost cannot be estimated yet.",
			"timing.title": "Timing Stats",
			"timing.total": "Active Time",
			"timing.ttft": "TTFT",
			"timing.gen": "LLM Gen",
			"timing.reasoning": "Thinking",
			"timing.text": "Answer",
			"timing.toolArgs": "Tool args",
			"timing.tools": "Tool runs",
			"timing.other": "Overhead",
			"timing.callTimes": "{n} calls",
			"timing.toolTimes": "{n} runs",
			"timing.empty": "No timing data yet — durations appear as the conversation runs",
			"tokens.title": "Token Stats",
			"tokens.total": "Total",
			"tokens.output": "Output",
			"tokens.outputNote": "incl. reasoning",
			"plugin.title": "Plugin Info",
			"plugin.hint": "The best DSH context plugin ⭐",
			"plugin.name": "Plugin",
			"plugin.github": "GitHub",
			"plugin.settings": "Settings",
			"plugin.settingsOpen": "Open in Settings",
			"trend.title": "Context Trend",
			"gran.step": "Step",
			"gran.turn": "Turn",
			"settings.title": "Context",
			"settings.desc": "Preferences for Context panel in dsh-context plugin",
			"settings.placement": "Entry Options",
			"placement.tab": "Tab",
			"placement.sidebar": "Sidebar",
			"placement.all": "All",
			"settings.insightsEntry": "Context Insights entry",
			"insightsEntry.show": "Show",
			"insightsEntry.hide": "Hide",
			"settings.gran": "Trend Chart · Default granularity",
			"settings.mode": "Trend Chart · Default display",
			"settings.toolSort": "Tool Schemas · Default sort",
			"settings.fileSort": "File Activity · Default sort",
			"settings.expand": "Expand",
			"settings.collapse": "Collapse",
			"settings.readOnly": "Settings are read-only in this environment",
			"gran.total": "Total",
			"gran.delta": "Delta",
			"gran.modeHint": "Total: cumulative makeup; Delta: change vs the previous request",
			"trend.focus": "Showing {cat} only",
			"trend.adaptive": "Adaptive",
			"trend.adaptiveHint": "Rescale bar heights to the visible range, following the scroll",
			"trend.empty": "Send a message and each model request’s context makeup shows up here",
			"detail.step": "Turn {t} · Step {s} of {n}",
			"detail.turn": "Turn {t} · {n} steps",
			"detail.lastStep": "Last Step",
			"detail.estTotal": "Estimated ≈ {n}",
			"detail.actual": "Actual {n}",
			"detail.output": "Output {n}",
			"detail.cache": "Cache {n}%",
			"brief.turn": "User",
			"brief.input": "In",
			"brief.reply": "Response",
			"brief.more": "+{n}",
			"brief.noInputs": "(nothing new)",
			"brief.locate": "Reveal in Context Browser",
			"jump.title": "View this turn in the Context view",
			"brief.turnTip": "The user message that opened this turn — every step of the turn recalls it",
			"brief.inputTip": "What entered after the previous reply and before this request went out — usually the previous tool-call results; a turn opener has nothing new",
			"brief.replyTip": "What the model returned on this step (a text reply or tool calls) — results of calls made here appear in the In row of the next bar",
			"events.title": "Context Events",
			"events.empty": "No context events yet (compaction, injections, model switches appear here)",
			"events.at": "Turn {t} · Step {s}",
			"events.range": "Turn {t} · Step {a}→{b}",
			"events.rangeTo": "Turn {a} · Step {as} → Turn {b} · Step {bs}",
			"kind.inject": "Inject",
			"kind.compaction": "Compact",
			"kind.prune": "Prune",
			"kind.model": "Switch",
			"kind.mode": "Mode",
			"files.title": "File Activity",
			"files.scopeLatest": "Up to latest · follows the trend chart pick",
			"files.kind.all": "All",
			"files.kind.read": "Read",
			"files.kind.write": "Written",
			"files.kind.search": "Searched",
			"files.kind.image": "Images",
			"files.chipTip": "{files} files · {ops} ops",
			"files.search": "Filter by path…",
			"files.sort.count": "Most active",
			"files.sort.latest": "Latest",
			"files.sort.path": "By path",
			"files.sortTip": "Sort files by operation counts (of the selected kind when a kind chip is active), most recent activity, or path",
			"files.files": "{n} files",
			"files.deltaTip": "Cumulative line change estimated from edit/write call arguments: + added / − removed",
			"files.empty": "No file reads, writes, or searches in this range",
			"files.noMatch": "No files match the current filters",
			"files.locate": "Reveal this operation in the Context Browser",
			"files.hits": "{n} hits",
			"files.readTip": "Read lines {a}–{b}",
			"files.open": "Open on your system",
			"files.preview": "Preview in the sidebar",
			"files.readEst": "Lines read, estimated from the limit argument",
			"files.errs": "{n} failed",
			"files.form.image": "Image",
			"files.form.dir": "Directory",
			"files.form.text": "File",
			"files.glyph.root": "Workspace root",
			"files.glyph.tests": "Tests",
			"files.glyph.docs": "Docs",
			"files.glyph.deps": "Dependencies",
			"files.glyph.build": "Build output",
			"files.glyph.scripts": "Scripts",
			"files.glyph.config": "Config",
			"files.glyph.assets": "Assets",
			"files.glyph.hidden": "Metadata directory",
			"files.glyph.lock": "Lockfile",
			"files.glyph.docker": "Docker",
			"files.glyph.ignore": "Ignore rules",
			"files.glyph.license": "License",
			"files.glyph.python": "Python",
			"files.glyph.notebook": "Notebook",
			"files.glyph.shell": "Shell",
			"files.glyph.style": "Styles",
			"files.glyph.database": "Database",
			"files.glyph.data": "Data / manifest",
			"files.glyph.markdown": "Markup document",
			"files.glyph.log": "Log",
			"files.glyph.sheet": "Spreadsheet",
			"files.glyph.document": "Document",
			"files.glyph.archive": "Archive",
			"files.glyph.font": "Font",
			"files.glyph.media": "Media",
			"files.glyph.lang.ts": "TypeScript",
			"files.glyph.lang.js": "JavaScript",
			"files.glyph.lang.go": "Go",
			"files.glyph.lang.rust": "Rust",
			"files.glyph.lang.java": "Java",
			"files.glyph.lang.kotlin": "Kotlin",
			"files.glyph.lang.ruby": "Ruby",
			"files.glyph.lang.php": "PHP",
			"files.glyph.lang.c": "C",
			"files.glyph.lang.cpp": "C++",
			"files.glyph.lang.csharp": "C#",
			"files.glyph.lang.scala": "Scala",
			"files.glyph.lang.lua": "Lua",
			"files.glyph.lang.dart": "Dart",
			"files.glyph.lang.swift": "Swift",
			"files.glyph.lang.vue": "Vue",
			"files.glyph.lang.svelte": "Svelte",
			"files.glyph.lang.html": "HTML",
			"agents.title": "Agent Network",
			"agents.sub": "Live context of this agent and its subagents · click a node to open its session",
			"agents.chip.count": "{n} agents",
			"agents.chip.running": "{n} running",
			"agents.chip.tokens": "{n} tokens in context",
			"agents.more": "{n} more not shown",
			"agents.solo": "No subagents yet — when the agent delegates work through the subagent tool, the network unfolds here",
			"agents.self": "current",
			"agents.running": "running",
			"agents.legend.free": "free window",
			"agents.oneshot": "one-shot",
			"agents.continuable": "continuable",
			"agents.requests": "{n} requests",
			"agents.billed": "{n} billed",
			"agents.open": "click to open →",
			"loading": "Reading the session log…",
			"detail.loading": "Loading history…",
			"detail.loadFailed": "History failed to load — click to retry",
			"error": "Failed to read context data: ",
			"error.retry": "Retry",
			"gate.title": "Update DeepSeek Harness",
			"gate.body": "dsh-context supports DeepSeek Harness v{minimum} or newer.",
			"gate.current": "Current",
			"gate.minimum": "Minimum required",
			"gate.orNewer": "or newer",
			"gate.ok": "Got it",
			"footer": "Token amount: “Estimated” uses the same fixed-density heuristic as DeepSeek Harness’s built-in tokenMeter (~4 chars ≈ 1 token); “Actual” is provider-reported usage.",
			"tip.step": "Turn {t} · Step {s} of {n}",
			"tip.turn": "Turn {t} · {n} steps",
			"tip.turn1": "Turn {t} · 1 step",
			"tip.total": "Total ≈ {n}",
			"tip.cat": "{cat} ≈ {n}",
			"tip.delta": "Δ {n}",
			"ev.compaction": "Context compacted (summary replaced {n} messages)",
			"ev.prune": "Tool output pruned",
			"ev.skill": "Skill injected ({name})",
			"ev.model": "Model switched: {a} → {b}",
			"ev.mode.plan.on": "Plan mode on",
			"ev.mode.plan.off": "Plan mode off",
			"form.instructions": "Instructions",
			"form.catalog": "Catalog Update",
			"form.snapshot": "State Snapshot",
			"form.notice": "Notice",
			"form.relay": "Agent Relay",
			"form.recall": "Recall",
			"form.context": "Context Injection",
			"node.toolResult": "Tool Result",
			"node.calls": "Calls ",
			"node.empty": "(empty reply)",
			"node.nonText": "(non-text message)",
			"node.snapshot": "Snapshot: ",
			"node.skillTag": "Skill · {name}",
			"cmd.label": "Context",
			"cmd.section": "Context",
			"cmd.desc": "View current context makeup, browse per-step composition",
			"cmd.close": "Close",
			"browser.title": "Context Browser",
			"browser.live": "Live (Next Request)",
			"browser.liveNow": "Live · Next Request",
			"browser.items": "{n} Items",
			"browser.missingLive": "… {n} earlier messages are also part of the context (outside the served window)",
			"browser.approx": "Some removed messages of this step exceed retention — the makeup below is approximate",
			"browser.deltaHint": "vs previous turn",
			"browser.dna": "DNA Mode",
			"browser.dnaTip": "One band per item in the order the model reads the context — system prompt, tool schemas, then messages chronologically; hover for details, click to open its row below",
			"browser.noHeader": "Served by an older plugin build: token estimates only, no content",
			"browser.noEpoch": "The header content (System Prompt / Tool Schemas) of this step is outside retention",
			"browser.headerMetaOnly": "This environment cannot fetch header content on demand; token estimates only",
			"browser.noSystem": "This request header carried no system prompt",
			"browser.noContent": "Full content is outside the loaded message window (load older history in Chat to view)",
			"browser.search.user": "Filter by message text…",
			"browser.search.inject": "Filter injected context…",
			"browser.search.skill": "Filter skills…",
			"browser.search.assistant": "Filter by reply or calls…",
			"browser.search.tool": "Filter by tool or arguments…",
			"browser.rowNoMatch": "No rows match the current filter",
			"browser.loading": "Loading full content from older session history…",
			"browser.notInLog": "This item is not in the session log anymore (it may have been compacted away or cleared)",
			"browser.loadFailed": "Load failed — click to retry",
			"tool.desc": "Description",
			"tool.params": "Parameters",
			"tool.paramsEmpty": "(no parameters)",
			"tool.plugin": "The registering plugin of this tool (for reference)",
			"tool.unknown": "Unknown plugin",
			"tool.unknownTitle": "The tool was registered before the context plugin loaded, or its plugin has been unloaded, so its provider cannot be determined",
			"tool.jsonToggle": "View Raw JSON",
			"tool.jsonHide": "Collapse",
			"tool.search": "Filter by name, description, or parameters…",
			"tool.sort.size": "By size",
			"tool.sort.count": "By calls",
			"tool.sort.name": "By name",
			"tool.sortTip": "Sort tools by call count in the shown step (default), token size, or name",
			"tool.hitsTip": "Times this tool was called and answered within the shown step’s context",
			"tool.noMatch": "No tools match the current filter",
			"rich.raw": "Raw",
			"rich.md": "Markdown",
			"rich.toMd": "View as Markdown",
			"rich.toRaw": "View Raw Text",
			"rich.copy": "Copy Raw Text",
			"rich.copied": "Copied",
			"rich.md.copy": "Copy",
			"rich.md.copied": "Copied",
			"rich.md.footnotes": "Footnotes",
			"block.thinking": "Reasoning",
			"block.answer": "Response",
			"block.content": "Content",
			"block.result": "Result",
			"block.summary": "Summary",
			"block.line": "1 line",
			"block.lines": "{n} lines",
			"call.ok": "OK",
			"call.fail": "Failed",
			"call.exit": "exit {n}",
			"node.failed": "Tool execution failed",
			"attach.images": "Images",
			"attach.other": "Other content",
			"attach.image": "Image",
			"attach.open": "Open full image",
			"attach.preview": "Image preview",
			"attach.close": "Close",
			"attach.loading": "…",
			"attach.loadFailed": "Load failed · click to retry",
			"attach.raw": "Raw",
			"attach.sent": "Sent",
			"attach.token": "Token",
			"attach.tokensTip": "Estimated token cost via DeepSeek's official image-size conversion (384-token cap per image)",
			"ov.entry": "Context Insights",
			"ov.title": "Context Insights",
			"ov.unavailable": "The session list is unavailable",
			"ov.range.label": "Range",
			"ov.range.7d": "Last 7 days",
			"ov.range.30d": "Last 30 days",
			"ov.range.all": "All",
			"ov.kpi.sessions": "Active Sessions",
			"ov.kpi.ofTotal": "of {n} total",
			"ov.kpi.tokens": "Tokens Used",
			"ov.kpi.sessionsSub": "across {n} sessions",
			"ov.kpi.toolSub": "tool runs {dur}",
			"ov.kpi.wallSub": "{n} model calls",
			"ov.quota.balance": "Balance",
			"ov.quota.balanceSub": "granted {granted} · topped up {topped}",
			"ov.quota.codex5h": "Codex 5-hour quota",
			"ov.quota.codexWeek": "Codex weekly quota",
			"ov.quota.resetIn": "resets in {d}",
			"ov.quota.codexWindow": "Codex {w} quota",
			"ov.quota.remaining": "{p}% left",
			"ov.quota.today": "Today",
			"balance.title": "DeepSeek balance",
			"balance.tip.total": "Total balance",
			"balance.tip.granted": "Granted balance",
			"balance.tip.toppedUp": "Topped-up balance",
			"ov.heat.title": "Activity",
			"ov.heat.sub": "Filter by date",
			"ov.heat.empty": "No activity yet — daily usage appears once sessions make model requests",
			"ov.heat.sessions": "{n} active sessions",
			"ov.heat.wd.1": "M",
			"ov.heat.wd.3": "W",
			"ov.heat.wd.5": "F",
			"ov.heat.mon.01": "Jan",
			"ov.heat.mon.02": "Feb",
			"ov.heat.mon.03": "Mar",
			"ov.heat.mon.04": "Apr",
			"ov.heat.mon.05": "May",
			"ov.heat.mon.06": "Jun",
			"ov.heat.mon.07": "Jul",
			"ov.heat.mon.08": "Aug",
			"ov.heat.mon.09": "Sep",
			"ov.heat.mon.10": "Oct",
			"ov.heat.mon.11": "Nov",
			"ov.heat.mon.12": "Dec",
			"ov.list.title": "Sessions",
			"ov.list.search": "Search title or path…",
			"ov.list.sortLabel": "Sort",
			"ov.list.sort.recent": "Last updated",
			"ov.list.sort.tokens": "Total Tokens",
			"ov.list.sort.context": "Current Context",
			"ov.list.empty": "No sessions yet — each session’s context profile appears here once you start one",
			"ov.list.noMatch": "No sessions match the current filters",
			"ov.list.noData": "No context data yet — stats appear once the session makes model requests",
			"ov.list.dayFilter": "active on {day}",
			"ov.list.dayClear": "Clear the day filter",
			"ov.list.pager": "Session pagination",
			"ov.list.page": "Page {n} of {total}",
			"ov.list.prev": "Previous page",
			"ov.list.next": "Next page",
			"ov.group.label": "Group",
			"ov.group.ungrouped": "Ungrouped",
			"ov.running": "Running",
			"ov.current": "current",
			"ov.card.turns": "{n} turns · {s} steps",
			"ov.card.lastUser": "Last message",
			"ov.time.now": "just now",
			"ov.time.m": "{n}m ago",
			"ov.time.h": "{n}h ago",
			"ov.time.d": "{n}d ago"
		};
		//#endregion
		//#region src/client/icon.tsx
		/** The sheet's strokes, in paint order, as `[path, fill]` pairs. */
		const SHEET_PATHS = [
			["M899.984 19.873h-3.452c-26.123 0-47.296 21.172-47.296 47.296v888.508c0 26.127 21.173 47.298 47.296 47.298h3.452c26.119 0 47.297-21.171 47.297-47.298V67.169c0-26.124-21.177-47.296-47.297-47.296z", "#4A5699"],
			["M132.643 19.873h-3.449c-26.12 0-47.296 21.172-47.296 47.296v888.508c0 26.127 21.177 47.298 47.296 47.298h3.449c26.123 0 47.299-21.171 47.299-47.298V67.169c0-26.124-21.176-47.296-47.299-47.296z", "#C45FA0"],
			["M899.463 19.873H129.194c-26.12 0-47.296 21.172-47.296 47.296v3.377c0 26.12 21.177 47.299 47.296 47.299h770.269c26.123 0 47.296-21.179 47.296-47.299v-3.377c0-26.124-21.173-47.296-47.296-47.296z", "#6277BA"],
			["M899.463 905.006H129.194c-26.12 0-47.296 21.17-47.296 47.29v3.381c0 26.127 21.177 47.298 47.296 47.298h770.269c26.123 0 47.296-21.171 47.296-47.298v-3.381c0-26.12-21.173-47.29-47.296-47.29z", "#C45FA0"],
			["M717.962 543.153H542.047c-26.121 0-47.298 21.175-47.298 47.297v3.724c0 26.123 21.177 47.293 47.298 47.293h175.915c26.121 0 47.297-21.17 47.297-47.293v-3.724c0-26.122-21.176-47.297-47.297-47.297z", "#E5594F"],
			["M689.268 198.849H513.355c-26.122 0-47.298 21.175-47.298 47.297v3.722c0 26.12 21.176 47.297 47.298 47.297h175.912c26.122 0 47.298-21.177 47.298-47.297v-3.722c0-26.122-21.175-47.297-47.297-47.297z", "#F0D043"],
			["M757.789 353.081H261.17c-26.121 0-47.297 21.172-47.297 47.296v3.377c0 26.121 21.177 47.299 47.297 47.299h496.619c26.121 0 47.296-21.178 47.296-47.299v-3.377c0-26.125-21.175-47.296-47.296-47.296z", "#E5594F"],
			["M762.638 726.225h-496.62c-26.12 0-47.294 21.18-47.294 47.301v3.377c0 26.12 21.174 47.3 47.294 47.3h496.62c26.122 0 47.296-21.18 47.296-47.3v-3.377c0-26.122-21.174-47.301-47.296-47.301z", "#6277BA"],
			["M355.734 543.328H281.41c-26.122 0-47.297 21.17-47.297 47.293v3.378c0 26.118 21.175 47.297 47.297 47.297h74.324c26.123 0 47.296-21.179 47.296-47.297v-3.378c0-26.123-21.174-47.293-47.296-47.293z", "#F39A2B"],
			["M334.85 248.006m-48.986 0a48.986 48.986 0 1 0 97.972 0 48.986 48.986 0 1 0-97.972 0Z", "#F39A2B"]
		];
		/** The colourful document sheet at the requested square edge. */
		function ContextIcon({ size = 20, className }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
				width: size,
				height: size,
				viewBox: "0 0 1024 1024",
				className,
				"aria-hidden": "true",
				xmlns: "http://www.w3.org/2000/svg",
				children: SHEET_PATHS.map(([d, fill]) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
					d,
					fill
				}, d))
			});
		}
		/**
		* The tab chip's title seat (`sidebar.right.pane.tab.title`): the emblem before
		* the label, so the chip reads as the files chip does. The label comes from the
		* plugin's own bound translate — read at render, so the chip follows the active
		* locale — rather than the tab-information hook, which a foreign or
		* not-yet-committed tab record can throw on. It carries a trailing gutter
		* (`.lc-title-label`) so the active chip's fade lands past the text, never on
		* the last glyphs.
		* @param t - the plugin-namespace translate bound in `apply`.
		* @returns the title component to register under the tab type's id.
		*/
		function makeContextTabTitle(t) {
			return function ContextTabTitle() {
				return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ContextIcon, {
					size: 16,
					className: "lc-title-icon"
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "lc-title-label",
					children: t("tab")
				})] });
			};
		}
		//#endregion
		//#region src/client/modalStore.ts
		const stores$1 = /* @__PURE__ */ new Map();
		function modalStoreOf(sessionId) {
			const existing = stores$1.get(sessionId);
			if (existing !== void 0) return existing;
			let open = false;
			const listeners = /* @__PURE__ */ new Set();
			const store = {
				subscribe(listener) {
					listeners.add(listener);
					return () => {
						listeners.delete(listener);
					};
				},
				getSnapshot: () => open,
				set(next) {
					if (next === open) return;
					open = next;
					for (const listener of listeners) listener();
				}
			};
			stores$1.set(sessionId, store);
			return store;
		}
		const pendingConsume = /* @__PURE__ */ new Map();
		function setPendingConsume(sessionId, guard) {
			pendingConsume.set(sessionId, guard);
		}
		function takePendingConsume(sessionId) {
			const guard = pendingConsume.get(sessionId);
			if (guard !== void 0) pendingConsume.delete(sessionId);
			return guard;
		}
		//#endregion
		//#region src/client/command.ts
		/**
		* `/context` — a client-owned slash command that opens the context modal
		* (current composition + recent trend) in the center of the page.
		*
		* Implemented as the plugin's own '/' trigger source instead of a host
		* command: nothing is dispatched to the host, no session log records are
		* written, and nothing becomes model-visible — the invocation never enters
		* the message history. Both paths answer `'handled'` and open the modal,
		* leaving the `/context` token in the composer while it is open; the modal's
		* close path consumes the token then (see modalStore.ts).
		*/
		const COMMAND = "context";
		const LINE = "/context";
		function registerContextCommand(ctx, kit) {
			ctx.inject(["inputTriggers"], (ictx) => {
				const inputTriggers = ictx.get("inputTriggers");
				if (inputTriggers === void 0 || typeof inputTriggers.registerSource !== "function") return;
				ictx.effect(() => inputTriggers.registerSource({
					trigger: "/",
					name: COMMAND,
					order: 1,
					candidates: (_session, req) => {
						if (req.position !== "leading") return Promise.resolve([]);
						const query = req.query.trim().toLowerCase();
						if (query !== "" && !COMMAND.startsWith(query)) return Promise.resolve([]);
						return Promise.resolve([{
							name: COMMAND,
							label: kit.t("cmd.label"),
							icon: ContextIcon,
							section: kit.t("cmd.section"),
							description: kit.t("cmd.desc")
						}]);
					},
					onPick: (pick) => {
						setPendingConsume(pick.session.sessionId, {
							kind: "span",
							span: pick.span
						});
						modalStoreOf(pick.session.sessionId).set(true);
						return "handled";
					},
					matchEnter: (session, line) => {
						if (line !== LINE) return Promise.resolve(void 0);
						setPendingConsume(session.sessionId, {
							kind: "bare-token",
							token: LINE
						});
						modalStoreOf(session.sessionId).set(true);
						return Promise.resolve("handled");
					}
				}), "dsh-context: /context command");
			});
		}
		//#endregion
		//#region src/client/dockMeasure.ts
		const LEADING_PX_TRACK = /^(\d+(?:\.\d+)?)px/;
		/** Measure the sidebar track width from the backdrop's ancestor chain, or resolve to the full-viewport mask. */
		function measureDock(start) {
			try {
				for (let el = start?.parentElement ?? null; el !== null; el = el.parentElement) {
					const template = el.style.gridTemplateColumns;
					if (template === "") continue;
					const track = LEADING_PX_TRACK.exec(template.trim());
					if (track === null) return {
						left: 0,
						frame: null
					};
					return {
						left: Number(track[1]),
						frame: el
					};
				}
			} catch {}
			return {
				left: 0,
				frame: null
			};
		}
		//#endregion
		//#region src/client/categories.ts
		const CATS = [
			{
				key: "system",
				color: "var(--color-indigo-500)"
			},
			{
				key: "tools",
				color: "var(--color-amber-500)"
			},
			{
				key: "user",
				color: "var(--color-green-500)"
			},
			{
				key: "inject",
				color: "var(--color-purple-500)"
			},
			{
				key: "skill",
				color: "var(--color-orange-500)"
			},
			{
				key: "assistant",
				color: "var(--color-blue-500)"
			},
			{
				key: "tool",
				color: "var(--color-teal-500)"
			}
		];
		/** Category key → bar color, for per-item bands (the browser's DNA mode) that bypass the CATS-order part builders. */
		const CAT_COLOR = Object.fromEntries(CATS.map((c) => [c.key, c.color]));
		const MESSAGE_CATS = [
			"user",
			"inject",
			"skill",
			"assistant",
			"tool"
		];
		function partsOf(breakdown) {
			return CATS.map((c) => {
				return {
					key: c.key,
					color: c.color,
					value: breakdown[c.key] || 0
				};
			});
		}
		/**
		* Build the pie-consistent raw parts: system/tools/messages take the
		* OFFICIAL `contextBreakdown` figures when delivered (the exact counts the
		* chat ring's panel shows), with the message bucket subdivided into the
		* four surface categories by the fold's per-category ratios (rounding
		* residue lands on the largest category, so the four always sum exactly to
		* the official message figure). Absent the projection, the fold's own sums
		* serve — the same fixed estimator, so identical on image-free sessions.
		*/
		function officialParts(current, breakdown) {
			const foldSurface = current.user + current.inject + current.skill + current.assistant + current.tool;
			const system = breakdown?.systemTokens ?? current.system;
			const tools = breakdown?.toolsTokens ?? current.tools;
			const messages = breakdown?.messageTokens ?? foldSurface;
			const shares = {
				system,
				tools
			};
			if (foldSurface > 0) {
				let assigned = 0;
				let largest = "user";
				for (const cat of MESSAGE_CATS) {
					const count = Math.round(messages * (current[cat] / foldSurface));
					shares[cat] = count;
					assigned += count;
					if (current[cat] > current[largest]) largest = cat;
				}
				shares[largest] = Math.max(0, shares[largest] + messages - assigned);
			} else for (const cat of MESSAGE_CATS) shares[cat] = 0;
			return CATS.map((c) => ({
				key: c.key,
				color: c.color,
				/* v8 ignore next 1 -- `shares` is initialized with system/tools and both
				foldSurface arms assign every MESSAGE_CATS key, so each key is always
				defined; the fallback is defensive. */
				value: shares[c.key] ?? 0
			}));
		}
		/**
		* Reproportion heuristic parts so they sum to a provider-anchored target —
		* the same trick the official ContextMeter uses: the heuristic breakdown
		* supplies the composition RATIOS, the provider sample the total. The
		* anchored figure rides `value` (bar widths); the heuristic count stays on
		* `raw` for the legend and tooltips. Returns the parts unchanged when no
		* anchor applies.
		*/
		function anchoredParts(parts, target) {
			const sourced = parts.map((p) => ({
				...p,
				raw: p.raw ?? p.value
			}));
			if (target === null || target <= 0) return sourced;
			let total = 0;
			for (const p of sourced) total += p.raw;
			if (total <= 0) return sourced;
			if (total === target) return sourced.map((p) => ({
				...p,
				value: p.raw
			}));
			const scale = target / total;
			return sourced.map((p) => ({
				...p,
				value: Math.round(p.raw * scale)
			}));
		}
		/**
		* The Token card's billed split, by WHAT the tokens are rather than by how
		* the provider cached them: the six composition categories share the
		* provider-reported prompt-side total (uncached + cache read + cache write —
		* the chat stats line's billed input) by the composition card's own
		* estimated ratios, and the provider's exact output count closes the ring as
		* the seventh part. Only the per-category split is estimated — every
		* category's sum and the output figure are provider-reported, so the parts
		* total equals the chat line's whole-session token count by construction. A
		* zero/negative prompt total (or a hostile negative output) never invents a
		* split: the prompt parts zero out / the output clamps at 0.
		*/
		function billedParts(current, breakdown, usage) {
			const input = usage.uncachedInputTokens + usage.cacheReadTokens + usage.cacheWriteTokens;
			const estimated = officialParts(current, breakdown);
			return [...input > 0 ? anchoredParts(estimated, input) : estimated.map((p) => ({
				...p,
				value: 0
			})), {
				key: "output",
				color: "var(--color-pink-500)",
				value: Math.max(0, usage.outputTokens)
			}];
		}
		//#endregion
		//#region src/client/headline.ts
		function headlineOf(data, pressure = null, breakdown = null) {
			const current = data.current;
			const projected = pressure !== null && typeof pressure.projectedTokens === "number" ? pressure.projectedTokens : void 0;
			const last = data.last;
			const requests = data.requests;
			const lastReq = requests.length > 0 ? requests[requests.length - 1] : null;
			const anchor = last !== void 0 ? last : lastReq;
			const derived = anchor !== null && typeof anchor.prompt === "number" ? anchor.prompt + (current.total - anchor.total) : void 0;
			const occupancyTokens = projected ?? derived ?? null;
			const window = pressure !== null && typeof pressure.contextWindow === "number" ? pressure.contextWindow : data.contextWindow;
			const tokens = occupancyTokens ?? current.total;
			return {
				tokens,
				window,
				pct: window !== void 0 && window > 0 ? Math.min(100, Math.round(tokens / window * 100)) : null,
				parts: anchoredParts(officialParts(current, breakdown), occupancyTokens !== null && tokens > 0 ? tokens : null)
			};
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
		const CHARS_PER_TOKEN = 4;
		const ROLE_OVERHEAD = 4;
		/** Price rendered system-prompt text; 0 for absent/empty/non-string input. */
		function estimateSystemTokens(text) {
			if (typeof text !== "string" || text.length === 0) return 0;
			return Math.ceil(text.length / CHARS_PER_TOKEN) + ROLE_OVERHEAD;
		}
		//#endregion
		//#region src/client/services.ts
		/**
		* A session-authorized durable-image loader over the harness conversation
		* face (`uiConversation.imageUrl`), or undefined when the service is not
		* composed — the caller degrades to metadata-only cards. Hostile snapshots
		* and throwing service reads are caught: this helper can never take a
		* render down.
		*/
		function imageLoaderOf(ctx, sessionId) {
			if (typeof sessionId !== "string" || sessionId === "") return void 0;
			try {
				const conversation = ctx.get("uiConversation");
				if (conversation !== void 0 && typeof conversation.imageUrl === "function") {
					const imageUrl = conversation.imageUrl.bind(conversation);
					return (attachment) => imageUrl(sessionId, attachment);
				}
			} catch {}
		}
		/**
		* The conversation-window nodes this plugin joins on, from the `useChat`
		* seat (`ChatSnapshot.legacy.nodes`). Returns undefined when the seat does
		* not deliver a real array (absent seat, foreign harness, hostile snapshot)
		* — callers render without the join, never an error.
		*/
		function conversationNodesOf(props) {
			const useChat = props.useChat;
			if (typeof useChat !== "function") return void 0;
			try {
				const slice = useChat((s) => s !== null && typeof s === "object" ? s.legacy : void 0);
				const nodes = slice !== null && typeof slice === "object" ? slice.nodes : void 0;
				return Array.isArray(nodes) ? nodes : void 0;
			} catch {}
		}
		/**
		* Read one projection key through the standard seat, narrowed at the
		* boundary: null when the seat is absent (a harness without the projection
		* pipeline) or the delivered value fails the narrow. The seat is a real
		* hook — call this unconditionally at the top of the component, one call
		* per key, in a stable order.
		*/
		function projectionOf(props, key, narrow) {
			if (typeof props.useProjection !== "function") return null;
			return narrow(props.useProjection(key));
		}
		/**
		* Narrow an unknown projection value to a string-keyed record, or null when
		* it is not one. The boundary type is Record<string, unknown> on purpose:
		* every field read below must re-prove itself (the no-white-screen
		* guarantee), so no field may borrow the wire type before its check.
		* Shared by every sanitizer here and by the agent-tree derivation
		* (agentTree.ts) — the ONE record guard for the whole client half.
		*/
		function asRecord(value) {
			if (value === null || value === void 0 || typeof value !== "object") return null;
			return value;
		}
		/**
		* Safe finite-number read: a missing/non-numeric/NaN field degrades to 0
		* instead of leaking into the UI as NaN percentages or broken arithmetic.
		*/
		function numOf(value) {
			return typeof value === "number" && Number.isFinite(value) ? value : 0;
		}
		/** Shared per-item collection guard: drop non-object entries, keep the rest. */
		function objectsOf(value) {
			if (!Array.isArray(value)) return [];
			return value.filter((v) => v !== null && typeof v === "object");
		}
		/**
		* The fast path's collection check: a real array whose entries are ALL
		* records. A null/primitive entry would pass a bare Array.isArray yet throw
		* on the first property read downstream (`req.seq` on null), so it sends the
		* value down the sanitizing slow path, where `objectsOf` drops it.
		*/
		function recordsOnly(value) {
			return Array.isArray(value) && value.every((e) => e !== null && typeof e === "object");
		}
		/**
		* Narrow a delivered `unsupported` gate record (the host's baseline gate —
		* see host/fallback.ts): both version strings re-proved, anything else
		* degrades to null (no gate shown) instead of rendering garbage.
		*/
		function unsupportedOf(value) {
			const data = asRecord(value);
			if (data === null) return null;
			if (typeof data.current !== "string" || typeof data.minimum !== "string") return null;
			return {
				current: data.current,
				minimum: data.minimum
			};
		}
		/**
		* The session-cost raw material, re-proved per provider/model/period/bucket
		* (the shape the client's cost.ts prices): a branch, model, or period that
		* is not a plain record drops whole — never a half-proved row — and bucket
		* fields zero out via numOf, so garbage can only price as zero, never as
		* NaN. Absent stays absent.
		*/
		function costOf(value) {
			const data = asRecord(value);
			if (data === null || Array.isArray(data)) return void 0;
			const out = {};
			for (const provider of Object.keys(data)) {
				const models = asRecord(data[provider]);
				if (models === null || Array.isArray(models)) continue;
				const branch = {};
				for (const model of Object.keys(models)) {
					const periods = asRecord(models[model]);
					if (periods === null || Array.isArray(periods)) continue;
					const copy = {};
					for (const period of ["peak", "off"]) {
						const b = asRecord(periods[period]);
						if (b === null || Array.isArray(b)) continue;
						copy[period] = {
							uncached: numOf(b.uncached),
							cacheRead: numOf(b.cacheRead),
							cacheWrite: numOf(b.cacheWrite),
							output: numOf(b.output)
						};
					}
					branch[model] = copy;
				}
				out[provider] = branch;
			}
			return out;
		}
		/** The fast-path structural check for `cost`: every branch is a plain record (bucket fields re-prove in costOf/cost.ts). */
		function costFastOk(value) {
			if (value === void 0) return true;
			const data = asRecord(value);
			if (data === null || Array.isArray(data)) return false;
			return Object.keys(data).every((provider) => {
				const models = asRecord(data[provider]);
				return models !== null && !Array.isArray(models);
			});
		}
		/**
		* Narrow a delivered projection value to a RENDER-SAFE context timeline —
		* the client's no-white-screen guarantee against backend/parse failures.
		*
		* A value that is not a record at all (capability absent, nothing delivered
		* yet) stays `null` and callers show the loading screen. A record that fails
		* the wire shape (corrupt checkpoint restore, a failed/older host payload,
		* plugin drift) is SANITIZED instead of rejected: every collection becomes
		* an array, non-object entries are dropped, `current` becomes a numeric
		* breakdown, and wrong-typed scalars are dropped or zeroed — so the whole
		* tab still renders with every usable piece of data instead of throwing
		* during render and unmounting the conversation view.
		*/
		function timelineOf(value) {
			const data = asRecord(value);
			if (data === null) return null;
			const current = data.current;
			if (current !== null && typeof current === "object" && [
				"system",
				"tools",
				"user",
				"inject",
				"skill",
				"assistant",
				"tool",
				"total"
			].every((k) => typeof current[k] === "number") && recordsOnly(data.requests) && recordsOnly(data.events) && recordsOnly(data.nodes) && recordsOnly(data.archive) && systemsFastOk(data.systems) && timingFastOk(data.timing) && costFastOk(data.cost)) return data;
			const safeCurrent = current !== null && typeof current === "object" ? current : {};
			const cost = costOf(data.cost);
			const timing = timingOf(data.timing);
			const unsupported = unsupportedOf(data.unsupported);
			const counts = countsOf(data.counts);
			const last = lastOf(data.last);
			return {
				ok: true,
				...unsupported !== null ? { unsupported } : {},
				...typeof data.model === "string" ? { model: data.model } : {},
				...typeof data.provider === "string" ? { provider: data.provider } : {},
				...typeof data.contextWindow === "number" ? { contextWindow: data.contextWindow } : {},
				current: {
					system: numOf(safeCurrent.system),
					tools: numOf(safeCurrent.tools),
					user: numOf(safeCurrent.user),
					inject: numOf(safeCurrent.inject),
					skill: numOf(safeCurrent.skill),
					assistant: numOf(safeCurrent.assistant),
					tool: numOf(safeCurrent.tool),
					total: numOf(safeCurrent.total)
				},
				requests: objectsOf(data.requests),
				events: objectsOf(data.events),
				nodes: objectsOf(data.nodes),
				droppedNodes: numOf(data.droppedNodes),
				...typeof data.images === "number" ? { images: data.images } : {},
				...typeof data.toolCalls === "number" ? { toolCalls: data.toolCalls } : {},
				...typeof data.humanInputs === "number" ? { humanInputs: data.humanInputs } : {},
				...typeof data.lastUser === "string" && data.lastUser !== "" ? { lastUser: data.lastUser.slice(0, 200) } : {},
				archive: objectsOf(data.archive),
				...counts !== void 0 ? { counts } : {},
				...last !== void 0 ? { last } : {},
				...typeof data.detailRev === "number" && Number.isFinite(data.detailRev) ? { detailRev: data.detailRev } : {},
				...cost !== void 0 ? { cost } : {},
				...timing !== null ? { timing } : {},
				...data.systems !== void 0 ? { systems: systemsOf(data.systems) } : {},
				...typeof data.surfaceFloor === "number" ? { surfaceFloor: data.surfaceFloor } : {},
				...typeof data.archiveFloor === "number" ? { archiveFloor: data.archiveFloor } : {},
				...data.fileOps !== void 0 ? { fileOps: objectsOf(data.fileOps) } : {},
				...typeof data.fileOpsFloor === "number" ? { fileOpsFloor: data.fileOpsFloor } : {}
			};
		}
		/**
		* The live system-prompt nodes, re-proved per entry and sorted by seq: an
		* entry missing a finite seq/time/tokens drops out (the browser then falls
		* back to the header epoch), so a hostile collection can never produce a NaN
		* prompt figure or an unfetchable seq. Absent or empty stays absent.
		*/
		function systemsOf(value) {
			const list = objectsOf(value);
			const out = [];
			for (const entry of list) {
				const { seq, time, tokens } = entry;
				if (typeof seq !== "number" || !Number.isFinite(seq)) continue;
				if (typeof time !== "number" || !Number.isFinite(time)) continue;
				if (typeof tokens !== "number" || !Number.isFinite(tokens)) continue;
				out.push({
					seq,
					time,
					tokens
				});
			}
			return out.sort((a, b) => a.seq - b.seq);
		}
		/**
		* The fast path's check for the live system-prompt nodes: every entry must
		* carry the three finite numbers the browser reads — `seq` for the per-step
		* resolution, `time` for the DNA band, `tokens` for its width. A primitive
		* entry, or one whose fields are not numbers, sends the payload down the
		* sanitizing slow path (`systemsOf` drops it) instead of leaking `undefined`
		* into the bar math. An absent list is fine.
		*/
		function systemsFastOk(value) {
			if (value === void 0) return true;
			if (!Array.isArray(value)) return false;
			return value.every((entry) => {
				if (entry === null || typeof entry !== "object") return false;
				const { seq, time, tokens } = entry;
				return typeof seq === "number" && Number.isFinite(seq) && typeof time === "number" && Number.isFinite(time) && typeof tokens === "number" && Number.isFinite(tokens);
			});
		}
		/**
		* The split head's count figures, re-proved field by field: a present-but-
		* partial record zeroes its unreadable fields (the stats board's no-NaN
		* guarantee), an absent or non-record value stays absent (legacy generation
		* — callers derive the counts from the collections instead).
		*/
		function countsOf(value) {
			const data = asRecord(value);
			if (data === null) return void 0;
			return {
				turns: numOf(data.turns),
				steps: numOf(data.steps),
				injects: numOf(data.injects),
				compactions: numOf(data.compactions),
				prunes: numOf(data.prunes)
			};
		}
		/** The split head's newest-request summary; absent or shapeless stays absent. */
		function lastOf(value) {
			const data = asRecord(value);
			if (data === null) return void 0;
			if (typeof data.seq !== "number" || !Number.isFinite(data.seq)) return void 0;
			if (typeof data.total !== "number" || !Number.isFinite(data.total)) return void 0;
			return {
				seq: data.seq,
				total: data.total,
				...typeof data.prompt === "number" && Number.isFinite(data.prompt) ? { prompt: data.prompt } : {}
			};
		}
		/**
		* Narrow a delivered projection value to the official token-meter
		* `contextPressure` projection (provider-anchored occupancy of the next
		* request). Absent key or value = the meter's projection is not composed
		* (e.g. a harness without the session-projection registry) — callers fall
		* back to their derived anchor, so the UI degrades gracefully. The three
		* fields are independent last-wins records on the wire (dsh's strict wire
		* schema), so each is re-proved on its own: a wrong-typed field drops out,
		* the readable ones survive.
		*/
		function contextPressureOf(value) {
			const data = asRecord(value);
			if (data === null) return null;
			const out = {};
			if (typeof data.pressureTokens === "number" && Number.isFinite(data.pressureTokens)) out.pressureTokens = data.pressureTokens;
			if (typeof data.projectedTokens === "number" && Number.isFinite(data.projectedTokens)) out.projectedTokens = data.projectedTokens;
			if (typeof data.contextWindow === "number" && Number.isFinite(data.contextWindow)) out.contextWindow = data.contextWindow;
			return out;
		}
		/**
		* Narrow a delivered projection value to the official token-meter
		* `contextBreakdown` projection (the heuristic composition rows of the chat
		* ring's panel). Every figure must be a finite number — a partial/corrupt
		* value degrades to null so the composition card falls back to the fold's
		* own sums instead of mixing sources.
		*/
		function contextBreakdownOf(value) {
			const data = asRecord(value);
			if (data === null) return null;
			const { systemTokens, toolsTokens, messageTokens } = data;
			if (typeof systemTokens !== "number" || !Number.isFinite(systemTokens)) return null;
			if (typeof toolsTokens !== "number" || !Number.isFinite(toolsTokens)) return null;
			if (typeof messageTokens !== "number" || !Number.isFinite(messageTokens)) return null;
			return {
				systemTokens,
				toolsTokens,
				messageTokens
			};
		}
		/**
		* Narrow a delivered projection value to the official token-meter
		* `tokenUsage` projection (durable cumulative provider usage). Absent key or
		* value = the meter's projection is not composed (or no request has reported
		* usage yet) — callers drop the cache-hit cell to a dash. The wire schema is
		* strict with all four buckets REQUIRED (dsh token-meter's projectionSchema),
		* so a partial/corrupt value degrades the whole value to null instead of
		* undercounting the billed total.
		*/
		function tokenUsageOf(value) {
			const data = asRecord(value);
			if (data === null) return null;
			const { uncachedInputTokens, outputTokens, cacheReadTokens, cacheWriteTokens } = data;
			if (typeof uncachedInputTokens !== "number" || !Number.isFinite(uncachedInputTokens)) return null;
			if (typeof outputTokens !== "number" || !Number.isFinite(outputTokens)) return null;
			if (typeof cacheReadTokens !== "number" || !Number.isFinite(cacheReadTokens)) return null;
			if (typeof cacheWriteTokens !== "number" || !Number.isFinite(cacheWriteTokens)) return null;
			return {
				uncachedInputTokens,
				outputTokens,
				cacheReadTokens,
				cacheWriteTokens
			};
		}
		/**
		* A non-negative finite number (the timing totals' every field): NaN or a
		* negative degrades to 0 instead of leaking into donut shares.
		*/
		function msNumOf(value) {
			return typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : 0;
		}
		/**
		* The OPTIONAL timing scalars (the generation split): a real non-negative
		* number passes, anything else — including absence — reads as undefined so the
		* field stays absent on the narrowed value (see `timingOf`).
		*/
		function optMsNumOf(value) {
			return typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : void 0;
		}
		/**
		* Cheap whole-value check for the pass-through path of `timelineOf`: absent
		* timing passes; present timing must already be well-formed (every scalar
		* numeric, every per-name row shaped) — anything else sends the payload down
		* the sanitizing slow path.
		*/
		function timingFastOk(value) {
			if (value === void 0) return true;
			if (value === null || typeof value !== "object" || Array.isArray(value)) return false;
			const t = value;
			for (const k of [
				"wallMs",
				"ttftMs",
				"genMs",
				"calls",
				"toolsMs",
				"toolCalls"
			]) if (typeof t[k] !== "number") return false;
			for (const k of [
				"reasoningMs",
				"textMs",
				"toolArgMs"
			]) {
				const v = t[k];
				if (v !== void 0 && (typeof v !== "number" || !Number.isFinite(v) || v < 0)) return false;
			}
			const tools = t.tools;
			if (tools === null || typeof tools !== "object" || Array.isArray(tools)) return false;
			for (const k in tools) {
				const row = tools[k];
				if (row === null || typeof row !== "object") return false;
				if (typeof row.calls !== "number") return false;
				if (typeof row.ms !== "number") return false;
			}
			return true;
		}
		/**
		* Narrow a delivered timing totals value (see TimingTotals) to a RENDER-SAFE
		* shape — the timing card's no-white-screen guarantee. A value that is not a
		* record stays null (the card renders its empty state); wrong-typed scalars
		* zero out and per-name rows failing the shape drop individually, so one
		* hostile row never blanks the ranking.
		*/
		function timingOf(value) {
			const data = asRecord(value);
			if (data === null) return null;
			const tools = {};
			const rawTools = data.tools;
			if (rawTools !== null && typeof rawTools === "object" && !Array.isArray(rawTools)) for (const k in rawTools) {
				if (k === "__proto__" || !Object.hasOwn(rawTools, k)) continue;
				const row = rawTools[k];
				if (row === null || typeof row !== "object") continue;
				const calls = row.calls;
				const ms = row.ms;
				if (typeof calls !== "number" || !(calls >= 0) || typeof ms !== "number" || !(ms >= 0)) continue;
				tools[k] = {
					calls,
					ms
				};
			}
			const totals = {
				wallMs: msNumOf(data.wallMs),
				ttftMs: msNumOf(data.ttftMs),
				genMs: msNumOf(data.genMs),
				calls: msNumOf(data.calls),
				toolsMs: msNumOf(data.toolsMs),
				toolCalls: msNumOf(data.toolCalls),
				tools
			};
			const reasoning = optMsNumOf(data.reasoningMs);
			if (reasoning !== void 0) totals.reasoningMs = reasoning;
			const textMs = optMsNumOf(data.textMs);
			if (textMs !== void 0) totals.textMs = textMs;
			const toolArgMs = optMsNumOf(data.toolArgMs);
			if (toolArgMs !== void 0) totals.toolArgMs = toolArgMs;
			return totals;
		}
		/**
		* Narrow a delivered projection value to the plugin's `contextHeaders`
		* (request-header epoch METADATA — boundaries, token prices, attribution).
		* Absent key = an older Host half without the companion unit — the Context
		* browser degrades its system/tools sections to a metadata-only note.
		*
		* Entry-level shape is checked too: a malformed epoch (corrupt payload with
		* a missing tools list, a wrong-typed systemTokens, or a tool row whose
		* name/tokens the browser reads blindly — `tool.name.toLowerCase()` and
		* `b.tokens - a.tokens` throw on junk) would crash the browser's
		* tools/sections reads, so the WHOLE projection degrades to null and the
		* card falls back to its metadata-only note. The epoch CONTENT is
		* not part of this value — the browser fetches it per epoch on demand.
		*
		* The pre-#37 wire generation carries the system TEXT instead of its token
		* price (a host still running the old view — stale watch build, an app not
		* restarted since the upgrade — serves it from its cache verbatim), so the
		* two generations are normalized to the metadata shape here: unpriced legacy
		* entries get the shared meter heuristic applied, priced ones and
		* new-shape values pass through untouched.
		*/
		function headersOf(value) {
			const headers = asRecord(value);
			if (headers === null || !Array.isArray(headers.headers)) return null;
			for (const h of headers.headers) {
				if (h === null || typeof h !== "object") return null;
				const entry = h;
				if (!Array.isArray(entry.tools)) return null;
				if (entry.systemTokens !== void 0 && (typeof entry.systemTokens !== "number" || !Number.isFinite(entry.systemTokens))) return null;
				for (const t of entry.tools) {
					if (t === null || typeof t !== "object") return null;
					const tool = t;
					if (typeof tool.name !== "string") return null;
					if (typeof tool.tokens !== "number" || !Number.isFinite(tool.tokens)) return null;
					if (tool.plugin !== void 0 && typeof tool.plugin !== "string") return null;
				}
			}
			let legacy = false;
			for (const entry of headers.headers) if (entry.systemTokens === void 0 && typeof entry.system === "string" && entry.system !== "") {
				legacy = true;
				break;
			}
			if (!legacy) return headers;
			return { headers: headers.headers.map((entry) => {
				if (entry.systemTokens !== void 0) return entry;
				return {
					...entry,
					systemTokens: estimateSystemTokens(entry.system) || void 0
				};
			}) };
		}
		/**
		* Narrow a delivered `contextActivity` value (the per-day ledger the Context
		* Overview's heatmap reads off each session-list row) to a render-safe shape.
		* Absent or non-record stays null (an older host serves no such key — the
		* heatmap renders its empty note). Per-day re-proved: a malformed key or a
		* wrong-typed figure drops just that entry, a hostile day record can never
		* produce a NaN cell, and a well-formed payload passes through untouched
		* (reference-stable for the selector equality).
		*/
		function activityOf$1(value) {
			const data = asRecord(value);
			if (data === null) return null;
			const rawDays = asRecord(data.days);
			if (rawDays === null || Array.isArray(rawDays)) return null;
			const days = {};
			let dirty = false;
			for (const key of Object.keys(rawDays)) {
				const entry = asRecord(rawDays[key]);
				const tokens = entry?.tokens;
				const requests = entry?.requests;
				if (!/^\d{4}-\d{2}-\d{2}$/.test(key) || entry === null || Array.isArray(entry) || typeof tokens !== "number" || !Number.isFinite(tokens) || tokens < 0 || typeof requests !== "number" || !Number.isFinite(requests) || requests < 0) {
					dirty = true;
					continue;
				}
				days[key] = {
					tokens,
					requests
				};
			}
			return dirty ? { days } : data;
		}
		/** The session-namespace workspace-opener remotes, ridden through the generic '/api' channel. */
		const OPEN_CHANNEL = "/api";
		const CAN_OPEN_ENDPOINT = "session/canOpenWorkspacePath";
		const OPEN_ENDPOINT = "session/openWorkspacePath";
		/**
		* The connection's bound generic-RPC caller, or undefined when the service
		* is absent or hostile — every read is guarded, so this can never throw.
		*/
		function rpcCallOf(ctx) {
			try {
				const rpc = asRecord(ctx.get("connection")?.rpc);
				const fn = rpc?.call;
				if (rpc !== null && typeof fn === "function") return fn.bind(rpc);
			} catch {}
		}
		/**
		* The SESSION's workspace root — the `cwd` its session-list row carries (the
		* host session canon, not the host process's own launch directory) — or
		* undefined when the face is absent, the snapshot is malformed, or the row
		* names no cwd. Every field is re-proved — the no-white-screen guarantee.
		*/
		function workspaceOf(ctx, sessionId) {
			if (typeof sessionId !== "string" || sessionId === "") return void 0;
			try {
				const sessions = ctx.get("sessions");
				const snapshot = typeof sessions?.list?.getSnapshot === "function" ? sessions.list.getSnapshot() : void 0;
				const byId = snapshot !== null && typeof snapshot === "object" ? snapshot.byId : void 0;
				const row = byId !== null && typeof byId === "object" ? byId[sessionId] : void 0;
				const cwd = row !== null && typeof row === "object" ? row.cwd : void 0;
				return typeof cwd === "string" && cwd !== "" ? cwd : void 0;
			} catch {
				return;
			}
		}
		/**
		* Whether this deployment can hand a path to the user's native desktop: the
		* page must reach the Host on the operator's own machine (`isLoopback`, the
		* harness's own gate) AND the session controller's opener capability remote
		* must answer true. The capability is an RPC round-trip now (the synchronous
		* host-description fact is gone), so the answer is asynchronous; every
		* absence, hostility, or transport failure resolves false — never a rejection.
		*/
		async function canOpenPathsOf(ctx) {
			const call = rpcCallOf(ctx);
			if (call === void 0) return false;
			try {
				if (ctx.get("connection")?.isLoopback !== true) return false;
				const r = asRecord(await call(OPEN_CHANNEL, CAN_OPEN_ENDPOINT, { args: {} }));
				return r !== null && r.ok === true && r.value === true;
			} catch {
				return false;
			}
		}
		/**
		* The system path opener over the session controller's open remote, or
		* undefined when the connection carries no RPC caller. Fire-and-forget:
		* rejections (unknown path, no desktop, offline) swallow — the affordance
		* is best-effort by nature.
		*/
		function openPathVia(ctx) {
			const call = rpcCallOf(ctx);
			if (call === void 0) return void 0;
			return (path) => {
				try {
					call(OPEN_CHANNEL, OPEN_ENDPOINT, { args: { request: { path } } }).catch(() => {});
				} catch {}
			};
		}
		/**
		* The right Sidebar's resource opener over `ctx.sidebarRight`, or undefined
		* when this harness serves no such column (every line older than 0.1.5-rc.1) or
		* the face is hostile — the caller then keeps its system-open degradation.
		* Synchronous, and it reports whether the column took the address: `openResource`
		* throws for a no-type-claims address or with no session surface mounted, and an
		* unwired preview must fall back rather than become an inert click. The face is
		* re-proved at call time (the service can land or be revoked across an HMR
		* reload), so the returned closure reads it per open.
		*/
		function openResourceVia(ctx) {
			const faceOf = () => {
				try {
					const face = asRecord(ctx.get("sidebarRight"));
					return face !== null && typeof face.openResource === "function" ? face : void 0;
				} catch {
					return;
				}
			};
			if (faceOf() === void 0) return void 0;
			return (address) => {
				const face = faceOf();
				if (face === void 0) return false;
				try {
					face.openResource(address);
					return true;
				} catch {
					return false;
				}
			};
		}
		//#endregion
		//#region src/client/historyPage.ts
		/**
		* Targeted full-content fetch for the Context browser — the fallback that
		* replaces blind tail paging. When a surface node's seq is outside the
		* conversation window, ONE seq-anchored history read returns the page
		* containing that event: the host cuts pages on whole append-origin message
		* boundaries, so the newest group on the page covers `seq` whenever the
		* durable log still holds it. The read rides the harness gateway remotes
		* (`remote.session.page`, with the inclusive cut `throughSeq` pinned to the
		* target seq) and the raw events map into the same conversation-node shapes
		* the window join delivers (a thin display subset of dsh's own fold).
		* Fetched nodes cache per session — history is immutable, so a seq never
		* needs fetching twice.
		*
		* The remote face is resolved through the DECLARED inject
		* (`watchHistoryFaces`): this plugin's module inject lists only slots/
		* locale, and NONDECLARED reads of the traced service proxy throw "cannot
		* get property … without inject" and can take a view down. The injection
		* callback runs under a fiber that declares both `remote` and
		* `remote.session` (the dsh idiom), so the property path resolves there and
		* nowhere else; the resolved face is re-proved and a hostile read leaves
		* the slot unset instead of ever throwing.
		*/
		/** Narrow one served row to a validated durable event envelope, or null. */
		function eventOf(entry) {
			if (entry === null || typeof entry !== "object") return null;
			const inner = entry.event ?? entry;
			if (typeof inner !== "object") return null;
			const e = inner;
			if (typeof e.type !== "string" || typeof e.seq !== "number" || !Number.isFinite(e.seq)) return null;
			const data = e.data !== null && typeof e.data === "object" ? e.data : {};
			return {
				type: e.type,
				seq: e.seq,
				data
			};
		}
		/** All string texts of an event's message-content shape joined (compaction summaries). */
		function textOf(blocks) {
			if (!Array.isArray(blocks)) return null;
			let out = "";
			for (const b of blocks) {
				const text = b !== null && typeof b === "object" ? b.text : void 0;
				if (typeof text === "string") out += text;
			}
			return out.trim() === "" ? null : out;
		}
		/**
		* The system prompt's exact rendered text — every text block joined with NO
		* normalization: a whitespace-only prompt is still the prompt the model
		* received (the host prices it as text), so it must render rather than read
		* as absent. Null when the content carries no text block at all.
		*/
		function systemTextOf(blocks) {
			if (!Array.isArray(blocks)) return null;
			let out = "";
			let seen = false;
			for (const b of blocks) {
				const text = b !== null && typeof b === "object" ? b.text : void 0;
				if (typeof text === "string") {
					out += text;
					seen = true;
				}
			}
			return seen ? out : null;
		}
		/**
		* One assistant content block → the snapshot block vocabulary the browser
		* already renders (`kind`: text/reasoning/image/tool-call); unmappable
		* blocks pass through raw and degrade to the generic JSON section.
		*/
		function assistantBlockOf(block) {
			const b = block !== null && typeof block === "object" ? block : null;
			switch (b?.type) {
				case "text":
				case "reasoning": return {
					kind: b.type,
					...typeof b.text === "string" ? { text: b.text } : {}
				};
				case "image": return {
					kind: "image",
					...b.attachment !== void 0 ? { attachment: b.attachment } : {}
				};
				case "tool-call": return {
					kind: "tool-call",
					name: typeof b.name === "string" ? b.name : "?",
					argsRaw: b.arguments
				};
				default: return block !== null && typeof block === "object" ? block : { value: block };
			}
		}
		/**
		* Map one history page into joined conversation nodes keyed by their event
		* seq — the display subset of the browser's join: user messages, assistant
		* blocks, tool results paired with their in-page call head, and compaction
		* checkpoints paired with their summary event. Everything else (headers,
		* boundaries, chunks, bare calls) projects to nothing.
		*/
		function pageNodesOf(entries) {
			const nodes = /* @__PURE__ */ new Map();
			const calls = /* @__PURE__ */ new Map();
			const summaries = /* @__PURE__ */ new Map();
			for (const entry of entries) {
				const ev = eventOf(entry);
				if (ev === null) continue;
				const { type, seq, data } = ev;
				if (type === "tool/call") {
					if (typeof data.callId === "string") calls.set(data.callId, {
						name: typeof data.name === "string" ? data.name : "?",
						argsRaw: typeof data.arguments === "string" ? data.arguments : ""
					});
					continue;
				}
				if (type === "compaction/summary") {
					if (typeof data.compactionId === "string") {
						const summary = textOf(data.summary);
						if (summary !== null) summaries.set(data.compactionId, summary);
					}
					continue;
				}
				if (type === "user/message") {
					const source = data.source !== null && typeof data.source === "object" ? data.source : null;
					const compactionId = source !== null && source.kind === "plugin" && typeof source.compactionId === "string" ? source.compactionId : null;
					if (compactionId !== null) {
						nodes.set(seq, {
							kind: "compaction",
							seq,
							summary: summaries.get(compactionId) ?? null
						});
						continue;
					}
					nodes.set(seq, {
						kind: "user",
						seq,
						content: Array.isArray(data.content) ? data.content : []
					});
					continue;
				}
				if (type === "assistant/message") {
					const message = data.message !== null && typeof data.message === "object" ? data.message : null;
					const content = message !== null && Array.isArray(message.content) ? message.content : [];
					nodes.set(seq, {
						kind: "assistant",
						seq,
						blocks: content.map(assistantBlockOf)
					});
					continue;
				}
				if (type === "tool/result") {
					const message = data.message !== null && typeof data.message === "object" ? data.message : null;
					const source = message?.source !== null && typeof message?.source === "object" ? message.source : null;
					const first = Array.isArray(message?.content) ? message.content[0] : void 0;
					const block = first !== null && typeof first === "object" ? first : null;
					const callId = typeof source?.callId === "string" ? source.callId : typeof block?.toolCallId === "string" ? block.toolCallId : null;
					const call = callId !== null ? calls.get(callId) ?? null : null;
					nodes.set(seq, {
						kind: "tool-result",
						seq,
						call,
						content: block !== null && Array.isArray(block.content) ? block.content : [],
						isError: block?.isError === true || data.error === true
					});
					continue;
				}
			}
			return nodes;
		}
		/** The `page` verb of a history face, re-proved and bound to its owner.
		* Hostile objects (any accessor backed by host state can throw) degrade to
		* undefined instead of escaping the read. */
		function readPageOf(face) {
			if (face === null || typeof face !== "object") return void 0;
			try {
				const fn = face.page;
				return typeof fn === "function" ? fn.bind(face) : void 0;
			} catch {
				return;
			}
		}
		/**
		* The gateway history page verb, resolved through the DECLARED inject
		* (see {@link watchHistoryFaces}) and bound up front: a method extracted
		* unbound loses `this`, and the traced `remote` proxy that hands it out
		* requires the inject to resolve at all.
		*/
		let declaredPage;
		const faceListeners = /* @__PURE__ */ new Set();
		function setPageFace(page) {
			declaredPage = page;
			for (const listener of [...faceListeners]) listener();
		}
		/** Subscribe to face resolution and revocation (plugin reload/HMR). */
		function subscribeHistoryFace(listener) {
			faceListeners.add(listener);
			return () => {
				faceListeners.delete(listener);
			};
		}
		/** The store snapshot both useSyncExternalStore seats read (client and hydration). */
		function faceSnapshot() {
			return declaredPage;
		}
		/**
		* The React seat over the resolved page face. A mount can RACE the declared
		* inject — a watch rebuild (patchReload) remounts the slot components before
		* the injected fiber re-fires — so the first render may legitimately see no
		* face. Subscribing keeps that transient state from sticking: the fetchers
		* derived downstream rebuild when the face lands (or is revoked), instead of
		* degrading to the static note for the mount's whole lifetime.
		*/
		function useHistoryFace() {
			return (0, react.useSyncExternalStore)(subscribeHistoryFace, faceSnapshot, faceSnapshot);
		}
		/**
		* Register the plugin's history face with the harness through the DECLARED
		* inject — both `remote` AND `remote.session` (the ui-chat idiom) must be in
		* one fiber's requirement list, because the traced `remote` proxy resolves
		* `.session` through the context and each name needs the other's
		* declaration; an undeclared read of the traced proxy throws instead of
		* resolving. The callback re-runs on every unload/remount, so it owns the
		* slot's lifetime. The face itself is re-proven: a never-fired invocation
		* or a hostile property read leaves the slot unset — nothing here can throw.
		*/
		function watchHistoryFaces(ctx) {
			ctx.inject(["remote", "remote.session"], (c) => {
				try {
					const session = c.remote?.session;
					setPageFace(session !== void 0 ? readPageOf(session) : void 0);
				} catch {
					setPageFace(void 0);
				}
				return () => {
					setPageFace(void 0);
				};
			});
		}
		/** The rows array of a successful history page, under the served envelope. */
		function rowsOf(response) {
			let payload = response;
			if (payload !== null && typeof payload === "object" && "ok" in payload) {
				const r = payload;
				if (r.ok !== true || r.value === null || typeof r.value !== "object") throw new Error("history rpc failed");
				payload = r.value;
			}
			if (payload === null || typeof payload !== "object") throw new Error("history rpc failed");
			const rows = payload.records;
			if (!Array.isArray(rows)) throw new Error("history rpc failed");
			return rows;
		}
		/**
		* The session's history reader over the gateway remotes (`remote.session.page`),
		* from the declared-inject slot. The page cuts message-aligned pages, so the
		* returned read covers `seq` whenever the durable log still holds it: the
		* inclusive cut is pinned to the seq itself, the exclusive bound one past
		* it. Undefined when the slot holds no face (the inject never fired or
		* served no usable page verb) — callers keep their static degradation.
		*/
		function pageReaderOf(sessionId) {
			const page = declaredPage;
			if (page === void 0) return void 0;
			return (seq) => {
				return page({
					address: {
						kind: "session",
						sessionId
					},
					throughSeq: seq,
					beforeSeq: seq + 1
				}, new AbortController().signal);
			};
		}
		/**
		* Build the browser's per-session fetcher over the gateway history face
		* (`remote.session.page`): message-aligned pages whose inclusive cut pinned
		* to `seq` (exclusive bound one past it) cover the seq whenever the durable
		* log still holds it. Undefined when no face was resolved at build time —
		* the caller keeps its static preview-plus-hint degradation. Found nodes
		* cache in the closure: one mount re-reading a row never re-fetches.
		*/
		function makeContentFetcher(sessionId) {
			const read = pageReaderOf(sessionId);
			if (read === void 0) return void 0;
			const cache = /* @__PURE__ */ new Map();
			return async (seq) => {
				const hit = cache.get(seq);
				if (hit !== void 0) return hit;
				const node = pageNodesOf(rowsOf(await read(seq))).get(seq) ?? null;
				if (node !== null) cache.set(seq, node);
				return node;
			};
		}
		/**
		* Map one raw durable event into the epoch content the browser renders. A
		* `request/header` yields the full system prompt text (V0/V2 envelope) plus
		* each tool's producer description and raw schema; a V3 `system/message`
		* yields the prompt text alone (its tools live in the request header). Both
		* mirror the host fold's per-entry guards — a null or primitive tool entry
		* degrades to an unnamed row instead of throwing the read. Null when the
		* envelope carries neither.
		*/
		function headerContentOf(event) {
			const { type, data } = event;
			if (type === "system/message") {
				const system = systemTextOf((data.message !== null && typeof data.message === "object" ? data.message : null)?.content);
				return system === null ? null : {
					system,
					tools: []
				};
			}
			const rawHeader = data.header !== null && typeof data.header === "object" ? data.header : null;
			if (rawHeader === null) return null;
			const toolsRaw = Array.isArray(rawHeader.tools) ? rawHeader.tools : [];
			const tools = [];
			for (const t of toolsRaw) {
				const tool = t !== null && typeof t === "object" ? t : null;
				tools.push({
					name: tool !== null && typeof tool.name === "string" ? tool.name : "?",
					...tool !== null && typeof tool.description === "string" && tool.description !== "" ? { description: tool.description } : {},
					schema: t
				});
			}
			return {
				...typeof rawHeader.system === "string" && rawHeader.system !== "" ? { system: rawHeader.system } : {},
				tools
			};
		}
		/**
		* The on-demand CONTENT fetch for the browser's System and Tools sections —
		* the lazy counterpart of the node fetcher above. One seq-anchored history
		* read off the requested seq returns the page holding that event (non-message
		* events ride the page verbatim); a `request/header` maps to the epoch's
		* tools (and its V0/V2 system text), a `system/message` to a V3 prompt's
		* text. Landed content caches per seq (history is immutable), and OLDER
		* epochs sharing the page cache for free — stepping back through epochs walks
		* the same pages. Undefined when no history face exists — the browser keeps a
		* metadata-only degradation instead.
		*/
		function makeHeaderFetcher(sessionId) {
			const read = pageReaderOf(sessionId);
			if (read === void 0) return void 0;
			const cache = /* @__PURE__ */ new Map();
			return async (seq) => {
				const hit = cache.get(seq);
				if (hit !== void 0) return hit;
				const rows = rowsOf(await read(seq));
				let picked = null;
				for (const entry of rows) {
					const ev = eventOf(entry);
					if (ev === null || ev.type !== "request/header" && ev.type !== "system/message") continue;
					const content = headerContentOf(ev);
					if (content === null) continue;
					cache.set(ev.seq, content);
					if (ev.seq === seq) picked = content;
				}
				return picked;
			};
		}
		//#endregion
		//#region src/client/timelineSource.ts
		/**
		* The timeline source behind the Context tab and the /context modal —
		* reconciles the two `contextTimeline` wire generations into the single
		* value the cards have always rendered.
		*
		* Generations (the marker is `detailRev` on the delivered value):
		* - INLINE (older hosts, channel-less deployments, the baseline-gate
		*   fallback): the wire value carries the collections in place. It passes
		*   through untouched — no fetch ever happens.
		* - SPLIT (current host with the detail route live): the wire value is the
		*   slim head (~1KB — every session.list row, control baseline, and push
		*   frame carries it whole). The collections arrive from the plugin's
		*   `/api/dsh-context/detail` fetch route (host/detail.ts): one targeted read
		*   when the tab/modal first opens, then a debounced refetch whenever the
		*   pushed `detailRev` outruns the served detail. Closed tabs fetch nothing.
		*
		* The no-stale-content guarantees: the store is per session and shared by
		* the tab and the modal; a refetch is single-flight with a trailing edge
		* (a rev bumped mid-flight re-reads after settle); responses race-safe by
		* revision (latest wins, with the refold exception — a host that refolded
		* restarts the revision, and a response matching the requested rev is
		* accepted regardless of order); a transport failure keeps the last good
		* detail and backs off; an absent answer (the session left the live set)
		* stops the trailing until the head moves again. With no detail at all,
		* failure surfaces as a retryable note on the detail cards instead of an
		* empty chart.
		*/
		const DETAIL_ROUTE = "/api/dsh-context/detail";
		/**
		* Narrow the detail endpoint's payload to a render-safe value (the same
		* boundary rigor as `timelineOf`): collections re-proved per item, scalars
		* zeroed, a missing/NaN revision rejects the whole payload (the caller then
		* shows the retryable failure note instead of half-merged data).
		*/
		function detailOf(value) {
			const data = asRecord(value);
			if (data === null) return null;
			if (typeof data.rev !== "number" || !Number.isFinite(data.rev) || data.rev < 0) return null;
			const head = timelineOf(data.head);
			return {
				rev: data.rev,
				...head !== null ? { head } : {},
				requests: objectsOf(data.requests),
				events: objectsOf(data.events),
				nodes: objectsOf(data.nodes),
				droppedNodes: numOf(data.droppedNodes),
				archive: objectsOf(data.archive),
				...typeof data.surfaceFloor === "number" ? { surfaceFloor: data.surfaceFloor } : {},
				...typeof data.archiveFloor === "number" ? { archiveFloor: data.archiveFloor } : {},
				...data.fileOps !== void 0 ? { fileOps: objectsOf(data.fileOps) } : {},
				...typeof data.fileOpsFloor === "number" ? { fileOpsFloor: data.fileOpsFloor } : {}
			};
		}
		/**
		* The detail reader over the plugin's own `/api` fetch route (host/detail.ts).
		* Same-origin POST through the harness's authenticated fence; the returned
		* thunk resolves the session's current detail, `null` when the session is not
		* live anymore, and rejects on transport failure or a malformed payload (the
		* store turns the two into the retryable state).
		*/
		function makeDetailFetcher(ctx, sessionId) {
			if (sessionId === "") return void 0;
			return async () => {
				const response = await fetch(DETAIL_ROUTE, {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ sessionId })
				});
				if (!response.ok) throw new Error(`dsh-context: detail route HTTP ${response.status}`);
				const r = asRecord(await response.json());
				if (r === null || r.ok !== true) throw new Error("dsh-context: detail read failed");
				if (r.value === null) return null;
				const detail = detailOf(r.value);
				if (detail === null) throw new Error("dsh-context: detail read malformed");
				return detail;
			};
		}
		const EMPTY_SNAP = {
			detail: null,
			failed: false,
			pending: false
		};
		/** The fetch debounce base; each consecutive failure doubles the wait, capped at 3 doublings. */
		const DETAIL_DEBOUNCE_MS = 300;
		/**
		* One session's detail ledger. Exported for tests (a zero debounce makes the
		* machine synchronous-ish); the app reaches it through `detailStoreOf`.
		*/
		var DetailStore = class {
			fetcher;
			baseDelay;
			detail = null;
			/** The revision of `detail` (latest-wins cursor); -1 before the first landing. */
			acceptedRev = -1;
			/** The newest revision the head has asked for. */
			wantedRev = -1;
			/** The head rev the IN-FLIGHT (or scheduled) read targets — the refold exception's acceptance key. */
			targetRev = -1;
			/** The head rev seen last — a DECREASE means the host refolded (revisions restart). */
			lastHeadRev = -1;
			failed = false;
			inFlight = false;
			timer = null;
			failures = 0;
			listeners = /* @__PURE__ */ new Set();
			snap = EMPTY_SNAP;
			constructor(fetcher, baseDelay = DETAIL_DEBOUNCE_MS) {
				this.fetcher = fetcher;
				this.baseDelay = baseDelay;
			}
			subscribe = (fn) => {
				this.listeners.add(fn);
				return () => this.listeners.delete(fn);
			};
			getSnapshot = () => this.snap;
			/**
			* The head's current revision arrived: schedule the trailing-edge read
			* when it outruns the served detail. A rev DECREASE means the host
			* refolded the session (a discarded checkpoint, a restart): revisions are
			* no longer comparable, so the ledger resets and refetches.
			*/
			request(rev) {
				if (rev < this.lastHeadRev) {
					this.acceptedRev = -1;
					this.wantedRev = -1;
					this.detail = null;
					this.failed = false;
				}
				this.lastHeadRev = rev;
				if (rev <= this.acceptedRev || rev <= this.wantedRev) return;
				this.wantedRev = rev;
				this.schedule();
			}
			/** Re-arm after a failure (the cards' retry note): immediate, backoff reset. */
			retry = () => {
				this.failures = 0;
				if (this.detail !== null) return;
				if (this.timer !== null) {
					clearTimeout(this.timer);
					this.timer = null;
				}
				if (!this.inFlight) this.fire();
			};
			schedule() {
				if (this.timer !== null) return;
				this.timer = setTimeout(() => {
					this.timer = null;
					this.fire();
				}, this.baseDelay * 2 ** Math.min(this.failures, 3));
				this.emit();
			}
			async fire() {
				if (this.inFlight) return;
				if (this.fetcher === void 0) {
					this.failed = true;
					this.emit();
					return;
				}
				this.inFlight = true;
				this.targetRev = this.wantedRev;
				this.emit();
				try {
					const d = await this.fetcher();
					if (d !== null) {
						if (d.rev >= this.acceptedRev || d.rev === this.targetRev) {
							this.detail = d;
							this.acceptedRev = d.rev;
						}
						this.failures = 0;
						this.failed = false;
					} else {
						this.wantedRev = this.acceptedRev;
						this.failed = this.detail === null;
						this.failures++;
					}
				} catch {
					this.failed = this.detail === null;
					this.failures++;
				}
				this.inFlight = false;
				if (this.wantedRev > this.acceptedRev) this.schedule();
				this.emit();
			}
			emit() {
				const pending = this.timer !== null || this.inFlight;
				const next = {
					detail: this.detail,
					failed: this.failed,
					pending
				};
				if (next.detail === this.snap.detail && next.failed === this.snap.failed && next.pending === this.snap.pending) return;
				this.snap = next;
				for (const fn of this.listeners) fn();
			}
		};
		/** Page-lifetime per-session stores (the tab and the modal share one). */
		const stores = /* @__PURE__ */ new Map();
		function detailStoreOf(ctx, sessionId) {
			let store = stores.get(sessionId);
			if (store === void 0) {
				store = new DetailStore(makeDetailFetcher(ctx, sessionId));
				stores.set(sessionId, store);
			}
			return store;
		}
		const noopSubscribe = () => () => {};
		const noopRetry = () => {};
		/**
		* The view's one read of the timeline (see the module header for the
		* generation rules). Hook-order safe: every hook runs unconditionally, the
		* branches below only shape the returned record.
		*/
		function useTimelineSource(ctx, props) {
			const head = projectionOf(props, "contextTimeline", timelineOf);
			const sessionId = typeof props.sessionId === "string" ? props.sessionId : "";
			const headRev = head !== null && typeof head.detailRev === "number" ? head.detailRev : null;
			const slim = headRev !== null;
			const store = (0, react.useMemo)(() => slim ? detailStoreOf(ctx, sessionId) : null, [
				ctx,
				sessionId,
				slim
			]);
			const snap = (0, react.useSyncExternalStore)(store !== null ? store.subscribe : noopSubscribe, store !== null ? store.getSnapshot : () => EMPTY_SNAP);
			(0, react.useEffect)(() => {
				if (store !== null && headRev !== null) store.request(headRev);
			}, [store, headRev]);
			return (0, react.useMemo)(() => {
				if (head === null) return {
					data: null,
					detailState: "loading",
					retryDetail: noopRetry
				};
				if (!slim || store === null) return {
					data: head,
					detailState: "legacy",
					retryDetail: noopRetry
				};
				const detail = snap.detail;
				return {
					data: detail === null ? head : {
						...head,
						requests: detail.requests,
						events: detail.events,
						nodes: detail.nodes,
						droppedNodes: detail.droppedNodes,
						archive: detail.archive,
						...detail.surfaceFloor !== void 0 ? { surfaceFloor: detail.surfaceFloor } : {},
						...detail.archiveFloor !== void 0 ? { archiveFloor: detail.archiveFloor } : {},
						...detail.fileOps !== void 0 ? { fileOps: detail.fileOps } : {},
						...detail.fileOpsFloor !== void 0 ? { fileOpsFloor: detail.fileOpsFloor } : {}
					},
					detailState: detail !== null ? "ready" : snap.failed ? "failed" : "loading",
					retryDetail: store.retry
				};
			}, [
				head,
				slim,
				store,
				snap
			]);
		}
		//#endregion
		//#region src/client/assemble.ts
		/** The header epoch in force at `seq` (last logged before it), or the newest. */
		function headerAt(headers, seq) {
			if (headers === null || headers.headers.length === 0) return null;
			if (seq === null) return headers.headers[headers.headers.length - 1];
			for (let i = headers.headers.length - 1; i >= 0; i--) if (headers.headers[i].seq < seq) return headers.headers[i];
			return null;
		}
		/**
		* The system prompt in force at `seq` (null = none) — the LAST live system
		* node at or before it carrying tokens, which is exactly the host fold's
		* "last nonempty surviving system" rule and therefore agrees with the
		* per-step `system` figure the fold recorded. Rows folded before `systems`
		* existed carry none; the header epoch's envelope figure stands in for them
		* (the pre-V3 wire shape).
		*/
		function systemAt(data, header, seq) {
			const systems = data.systems;
			if (systems !== void 0 && systems.length > 0) {
				for (let i = systems.length - 1; i >= 0; i--) {
					const node = systems[i];
					if (node.tokens <= 0) continue;
					if (seq === null || node.seq < seq) return node;
				}
				return null;
			}
			return header !== null && header.systemTokens !== void 0 ? {
				seq: header.seq,
				time: header.time,
				tokens: header.systemTokens
			} : null;
		}
		function assemble(data, headers, seq) {
			const live = seq === null;
			let nodes;
			if (live) nodes = data.nodes.slice();
			else {
				const picked = [];
				for (const n of data.nodes) if (n.seq < seq) picked.push(n);
				for (const n of data.archive) if (n.seq < seq && n.gone !== void 0 && n.gone > seq) picked.push(n);
				nodes = picked;
			}
			nodes.sort((a, b) => a.seq - b.seq);
			let missingLive = 0;
			if (data.droppedNodes > 0) {
				if (live || data.surfaceFloor !== void 0 && seq > data.surfaceFloor) missingLive = data.droppedNodes;
			}
			const approximate = !live && data.archiveFloor !== void 0 && seq < data.archiveFloor;
			const header = headerAt(headers, seq);
			return {
				live,
				header,
				system: systemAt(data, header, seq),
				nodes,
				missingLive,
				approximate
			};
		}
		//#endregion
		//#region src/client/dna.ts
		function dnaOf(view) {
			const items = [];
			if (view.system !== null) items.push({
				key: "sys",
				cat: "system",
				tokens: view.system.tokens,
				time: view.system.time
			});
			if (view.header !== null) for (const tool of view.header.tools) items.push({
				key: "tool:" + tool.name,
				cat: "tools",
				tokens: tool.tokens
			});
			for (const n of view.nodes) items.push({
				key: "n" + String(n.seq),
				cat: n.cat,
				tokens: n.tokens,
				node: n,
				...n.time !== void 0 ? { time: n.time } : {}
			});
			return items;
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
		//#region src/client/callSummary.ts
		function summaryInArgs(args) {
			if (args === null) return null;
			for (const k of [
				"description",
				"file_path",
				"path",
				"filePath"
			]) {
				const v = args[k];
				if (typeof v === "string" && v !== "") return v;
			}
			return null;
		}
		function callSummaryOf(conv) {
			return summaryInArgs(parseCallArgs(conv?.call?.argsRaw));
		}
		function blockSummaryOf(conv) {
			if (conv === void 0 || !Array.isArray(conv.blocks)) return null;
			for (const b of conv.blocks) {
				const blk = b !== null && typeof b === "object" ? b : null;
				if (blk === null || blk.kind !== "tool-call") continue;
				const s = summaryInArgs(parseCallArgs(blk.argsRaw));
				if (s !== null) return s;
			}
			return null;
		}
		/**
		* All tool-call names in an assistant conversation node, in order. The fold's surface node keeps `calls` only for TEXT-LESS replies,
		* so a reply carrying both text and calls recovers its call breadcrumb here through the conversation join.
		*/
		function callNamesOf(conv) {
			if (conv === void 0 || !Array.isArray(conv.blocks)) return [];
			const names = [];
			for (const b of conv.blocks) {
				const blk = b !== null && typeof b === "object" ? b : null;
				if (blk !== null && blk.kind === "tool-call" && typeof blk.name === "string") names.push(blk.name);
			}
			return names;
		}
		//#endregion
		//#region src/client/components/detailNote.tsx
		/**
		* The detail collections' pending/failed note — the split generation's
		* visible loading story (timelineSource.ts): while the first detail read is
		* in flight the detail-driven cards show this strip instead of a misleading
		* empty state, and a settled-without-data read arms the retry button (never
		* a spinner that never resolves, never a silent empty chart). Callers guard
		* the failed state on a retry callback being wired (an unwired failure keeps
		* the plain text).
		*/
		function makeDetailNote(kit) {
			const { t } = kit;
			return function DetailNote(props) {
				const cls = props.className ?? "lc-empty";
				if (props.state === "loading") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: cls,
					children: t("detail.loading")
				});
				return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: cls,
					children: props.onRetry !== void 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						type: "button",
						className: "lc-br-retry hover:brightness-[1.15]",
						onClick: props.onRetry,
						children: t("detail.loadFailed")
					}) : t("detail.loadFailed")
				});
			};
		}
		//#endregion
		//#region src/client/components/nodes.tsx
		function makeNodeText(kit) {
			const { t } = kit;
			return function nodeText(n) {
				if (n.cat === "tool") return t("node.toolResult") + (n.tool ? " ← " + n.tool : "") + (n.err ? " ⚠" : "");
				if (n.skill) return "Skill: " + n.skill;
				if (n.calls) return t("node.calls") + n.calls.join(", ");
				if (n.text) return n.form === "snapshot" ? t("node.snapshot") + n.text : n.text;
				if (n.cat === "assistant") return t("node.empty");
				if (n.cat === "inject" || n.cat === "skill") return t("form." + (n.form || "context"));
				return t("node.nonText");
			};
		}
		//#endregion
		//#region src/client/overscroll.ts
		/**
		* Stop a horizontal scroller's overscroll from reaching the browser's history navigation — the trackpad
		* swipe-back (left edge) and swipe-forward (right edge) gestures. The spec answer is `overscroll-behavior-x:
		* contain`, the harness's own idiom for its horizontal scrollers and what the sheets beside this module's
		* callers already set; it covers Chromium and Firefox, but WebKit still navigates on horizontal overscroll with
		* the property set (bug 240183), where a canceled wheel is the only lever. Without either, one swipe past the
		* edge of the trend chart or the agent graph leaves the whole app for another page in the tab's history.
		*/
		/**
		* Cancel the horizontal-dominant wheel gestures a scroller cannot consume — the ones the browser would
		* otherwise read as a history swipe. Vertical-dominant gestures are left alone: they belong to the page's own
		* scrolling, and the scrollers this guards only overflow horizontally.
		* @param el - the horizontal scroll container (the listener must be non-passive, so it cannot ride React's passive wheel seat).
		* @returns the disposer removing the listener.
		*/
		function containHorizontalOverscroll(el) {
			const onWheel = (e) => {
				if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
				const atStart = e.deltaX < 0 && el.scrollLeft <= 0;
				const atEnd = e.deltaX > 0 && el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
				if (atStart || atEnd) e.preventDefault();
			};
			el.addEventListener("wheel", onWheel, { passive: false });
			return () => {
				el.removeEventListener("wheel", onWheel);
			};
		}
		//#endregion
		//#region src/client/components/trendChart.tsx
		/**
		* Bespoke per-request history chart — no shared data-viz primitive — styled through the shared `--dsw-alias-*` tokens; helpers
		* aggregateByTurn/attachMarkers are shared with ContextView. On mount each bar rises from its baseline,
		* staggered left to right with the cascade capped for long logs (trendChart.css, `--lc-i` slots below).
		*/
		/**
		* Collapse per-step requests into one bar per turn — each turn is represented by its LAST step's record, tagged `stepCount` for the bar's
		* column width; the log keeps one turn's requests consecutive, so a run of equal turns collapses to its final record.
		*/
		function aggregateByTurn(requests) {
			const out = [];
			let runSteps = 0;
			for (const req of requests) {
				const last = out.length > 0 ? out[out.length - 1] : null;
				if (last !== null && (last.turn ?? 0) === (req.turn ?? 0)) {
					runSteps++;
					out[out.length - 1] = {
						...req,
						stepCount: runSteps
					};
				} else {
					runSteps = 1;
					out.push({
						...req,
						stepCount: 1
					});
				}
			}
			return out;
		}
		/**
		* The per-turn step tallies the step-granularity labels lean on ("第 s 步 (共 n 步)") — the same count a
		* turn-mode bar's `stepCount` carries. Records without a turn stamp pool under 0, the key the labels'
		* `turn ?? 0` fallback reads; the getter answers 1 for a turn outside the list so a caller can never miss.
		*/
		function turnStepsOf(requests) {
			const counts = /* @__PURE__ */ new Map();
			for (const req of requests) {
				const turn = req.turn ?? 0;
				counts.set(turn, (counts.get(turn) ?? 0) + 1);
			}
			return (turn) => counts.get(turn ?? 0) ?? 1;
		}
		/**
		* Attach each boundary event (compaction/prune) to the first request logged after it — one entry per index, for the ✂ marker and the detail
		* chip; shared with the detail panel so both show the SAME event.
		*/
		function attachMarkers(requests, events) {
			const markers = new Array(requests.length);
			for (const ev of events) {
				if (ev.kind !== "compaction" && ev.kind !== "prune") continue;
				for (let r = 0; r < requests.length; r++) if (requests[r].seq >= ev.seq) {
					if (markers[r] === void 0) markers[r] = ev;
					break;
				}
			}
			return markers;
		}
		/**
		* The chat→Context jump's target: the turn bar whose closing reply the user clicked — the relayed seq is a turn's LAST step, exactly the
		* aggregate's record — or, when that turn has aged out of the host's retained window, the oldest retained bar. Resolved against turn
		* aggregates, since the jump pins in turn granularity. Null only on an empty history.
		*/
		function jumpTargetOf(requests, seq) {
			for (const req of requests) if (req.seq === seq) return req;
			return requests.length > 0 ? requests[0] : null;
		}
		function makeTrendChart(kit) {
			const { t, fmt, eventLabel, eventAt, catLabel } = kit;
			const CHART_H = 112;
			const fmtSigned = (v) => (v > 0 ? "+" : "") + fmt(v);
			const BAR_W = 14;
			const BAR_GAP = 2;
			const STAGGER_CAP = 20;
			const TURN_FILLS = ["color-mix(in srgb, var(--color-neutral-500) 12%, transparent)", "color-mix(in srgb, var(--color-neutral-500) 26%, transparent)"];
			const LABEL_OVERHANG = 48;
			const LABEL_GAP = 2;
			const LABEL_FONT = 10;
			const LABEL_FONT_MIN = 6;
			const estTurnLabel = (turn) => 6.5 * String(turn).length;
			/**
			* Focus a bar on one category (the browser's open category): the kept bucket carries its fold figure, the other
			* buckets zero, and `total` IS the plotted figure — the downstream stack/tooltip math reads the derived record
			* unchanged. The raw fold figures are plotted as-is: a per-request rescale against the provider prompt would drift
			* with the heuristic's ratio error and fake growth into constant categories (a never-changing system prompt must
			* plot flat).
			*/
			const focusOf = (req, cat) => {
				const key = cat;
				const out = { ...req };
				const v = req[key] || 0;
				out.total = v;
				for (const c of CATS) out[c.key] = c.key === key ? v : 0;
				return out;
			};
			/**
			* Delta mode: each category keeps the SIGNED change vs the previous record so bars can diverge
			* above/below the zero line; `total` is the churn (summed magnitude), `net` the signed change
			* for the tooltip; the first request starts from zero so the scale is change-driven, and per-request
			* provider prompt/output are dropped (they are not deltas).
			*/
			const deltaOf = (req, prev) => {
				const { prompt: _prompt, output: _output, ...out } = req;
				let churn = 0;
				let net = 0;
				for (const c of CATS) {
					const d = prev !== null ? (req[c.key] || 0) - (prev[c.key] || 0) : 0;
					out[c.key] = d;
					churn += Math.abs(d);
					net += d;
				}
				out.total = churn;
				out.net = net;
				return out;
			};
			const ChartBar = (0, react.memo)(function ChartBar(props) {
				const { req, marker } = props;
				const markerAt = marker !== void 0 ? eventAt(marker) : null;
				const diverge = props.upPx !== void 0 && props.downPx !== void 0 && props.deltaScale !== void 0;
				const enterStyle = { "--lc-i": Math.min(props.enterIndex, STAGGER_CAP) };
				return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "lc-bar hover:bg-(--dsw-alias-bg-layer-2)" + (props.selected ? " lc-bar-selected" : "") + (props.hovered ? " lc-bar-hovered" : "") + (props.inTurn ? " lc-bar-in-turn" : ""),
					"data-seq": req.seq,
					style: { width: `${BAR_W}px` },
					onClick: () => {
						props.onSelect(props.selected ? null : req.seq);
					},
					onMouseEnter: () => {
						props.onHover(req.seq);
					},
					children: [marker !== void 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "lc-bar-marker",
						title: "✂ " + (markerAt !== null ? markerAt + " — " : "") + eventLabel(marker),
						children: "✂"
					}) : null, diverge ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "lc-bar-up animate-lc-bar-in motion-reduce:animate-none",
						style: {
							bottom: `${props.downPx}px`,
							...enterStyle
						},
						children: CATS.map((c) => {
							const d = req[c.key] || 0;
							if (d <= 0) return null;
							return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								"data-cat": c.key,
								className: "lc-cat-seg",
								style: {
									height: `${Math.max(1, Math.round(d * props.deltaScale))}px`,
									background: c.color
								}
							}, c.key);
						})
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "lc-bar-down animate-lc-bar-in motion-reduce:animate-none",
						style: {
							top: `${props.upPx}px`,
							...enterStyle
						},
						children: CATS.map((c) => {
							const d = req[c.key] || 0;
							if (d >= 0) return null;
							return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								"data-cat": c.key,
								className: "lc-cat-seg",
								style: {
									height: `${Math.max(1, Math.round(-d * props.deltaScale))}px`,
									background: c.color
								}
							}, c.key);
						})
					})] }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "lc-bar-stack animate-lc-bar-in motion-reduce:animate-none",
						style: enterStyle,
						children: CATS.map((c) => {
							const v = req[c.key] || 0;
							if (!v) return null;
							return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								"data-cat": c.key,
								className: "lc-cat-seg",
								style: {
									height: `${Math.max(1, Math.round(v / props.maxTotal * CHART_H))}px`,
									background: c.color
								}
							}, c.key);
						})
					})]
				});
			});
			return function TrendChart(props) {
				const delta = props.mode === "delta";
				const focus = props.focusCat !== null && props.focusCat !== void 0 && CATS.some((c) => c.key === props.focusCat) ? props.focusCat : null;
				const requests = (0, react.useMemo)(() => {
					const base = focus !== null ? props.requests.map((req) => focusOf(req, focus)) : props.requests;
					return delta ? base.map((req, i) => deltaOf(req, i > 0 ? base[i - 1] : null)) : base;
				}, [
					props.requests,
					delta,
					focus
				]);
				const markers = props.markers;
				const adaptive = props.adaptive === true;
				const [visMax, setVisMax] = (0, react.useState)(null);
				const measureVisible = (el) => {
					if (!adaptive) return;
					const n = requests.length;
					if (n === 0 || el.clientWidth <= 0) return;
					const pitch = 16;
					const sl = el.scrollLeft;
					const vr = sl + el.clientWidth;
					let total = 0;
					let up = 0;
					let down = 0;
					const from = Math.max(0, Math.floor(sl / pitch));
					const to = Math.min(n - 1, Math.max(from, Math.floor((vr - 1) / pitch)));
					for (let i = from; i <= to; i++) {
						const col = i * pitch;
						if (col >= vr || col + BAR_W <= sl) continue;
						const req = requests[i];
						if (delta) {
							let bu = 0;
							let bd = 0;
							for (const c of CATS) {
								const d = req[c.key] || 0;
								if (d > 0) bu += d;
								else bd -= d;
							}
							if (bu > up) up = bu;
							if (bd > down) down = bd;
						} else if (req.total > total) total = req.total;
					}
					setVisMax((prev) => prev !== null && prev.total === total && prev.up === up && prev.down === down ? prev : {
						total,
						up,
						down
					});
				};
				let maxTotal = 1;
				let maxUp = 0;
				let maxDown = 0;
				if (delta) for (const req of requests) {
					let up = 0;
					let down = 0;
					for (const c of CATS) {
						const d = req[c.key] || 0;
						if (d > 0) up += d;
						else down -= d;
					}
					if (up > maxUp) maxUp = up;
					if (down > maxDown) maxDown = down;
				}
				else for (const req of requests) if (req.total > maxTotal) maxTotal = req.total;
				if (adaptive && visMax !== null) {
					if (delta) {
						if (visMax.up + visMax.down > 0) {
							maxUp = visMax.up;
							maxDown = visMax.down;
						}
					} else maxTotal = Math.max(1, visMax.total);
				}
				const span = Math.max(1, maxUp + maxDown);
				const deltaScale = CHART_H / span;
				const upPx = Math.round(maxUp * deltaScale);
				const downPx = CHART_H - upPx;
				const q3Clear = Math.abs(28 - upPx) >= 11;
				const q1Clear = Math.abs(84 - upPx) >= 11;
				const groups = [];
				for (const req of requests) {
					let grp = groups.length > 0 ? groups[groups.length - 1] : null;
					if (grp === null || grp.turn !== (req.turn ?? 0)) {
						grp = {
							turn: req.turn ?? 0,
							count: 0,
							span: 0,
							agg: req.stepCount !== void 0
						};
						groups.push(grp);
					}
					grp.count++;
					grp.span += req.stepCount ?? 1;
				}
				const turnOffsets = [];
				const turnWidths = [];
				{
					let x = 0;
					for (const grp of groups) {
						const w = grp.agg ? BAR_W : grp.span * 16 - BAR_GAP;
						turnOffsets.push(x);
						turnWidths.push(w);
						x += w + BAR_GAP;
					}
				}
				let labelFont = "";
				{
					let scale = 1;
					for (let i = 0; i + 1 < groups.length; i++) {
						const avail = (turnWidths[i] + turnWidths[i + 1]) / 2 + BAR_GAP;
						const need = (estTurnLabel(groups[i].turn) + estTurnLabel(groups[i + 1].turn)) / 2 + LABEL_GAP;
						if (need > avail) scale = Math.min(scale, avail / need);
					}
					if (scale < 1) labelFont = `${Math.max(LABEL_FONT_MIN, Math.floor(LABEL_FONT * scale))}px`;
				}
				const scrollRef = (0, react.useRef)(null);
				const scrolledOnce = (0, react.useRef)(false);
				const lastGranRef = (0, react.useRef)(props.granularity);
				const lastSeqRef = (0, react.useRef)(0);
				const prevScrollWidthRef = (0, react.useRef)(0);
				/**
				* Keep each turn label centered within its block's VISIBLE slice, then thin colliding labels: a label wider
				* than its block overflows it, so consecutive narrow turns would smear into each other — walking left→right
				* in content coordinates, a label whose box reaches the previous KEPT one drops to visibility:hidden. The
				* render-time font shrink (labelFont) already sizes every label to clear its tightest neighbour, so this
				* chain only fires past the 6px floor or on viewport-edge shifts. Blocks that cannot reach the viewport even
				* overhung by a label skip their reads/writes entirely (their transform/visibility just reset); reads
				* (offsetWidth) batch before the writes to avoid layout thrash, and unchanged styles write nothing.
				*/
				const updateTurnLabels = (el) => {
					const labels = el.querySelectorAll(".lc-turn-label");
					const n = Math.min(labels.length, turnOffsets.length);
					const sl = el.scrollLeft;
					const vr = sl + el.clientWidth;
					const writes = [];
					let chainR = -Infinity;
					for (let i = 0; i < n; i++) {
						const off = turnOffsets[i];
						const w = turnWidths[i];
						let dx = 0;
						let vis = "";
						if (off + w + LABEL_OVERHANG > sl && off - LABEL_OVERHANG < vr) {
							const lw = labels[i].offsetWidth;
							const visL = Math.max(off, sl);
							const visR = Math.min(off + w, vr);
							if (visR > visL && lw < w) {
								const center = (visL + visR) / 2 - off;
								dx = Math.min(Math.max(center, lw / 2), w - lw / 2) - w / 2;
							}
							const left = off + w / 2 + dx - lw / 2;
							if (left < chainR) vis = "hidden";
							else chainR = left + lw + LABEL_GAP;
						}
						const next = dx !== 0 ? `translateX(${dx}px)` : "";
						if (labels[i].style.transform !== next || labels[i].style.visibility !== vis) writes.push([
							labels[i],
							next,
							vis
						]);
					}
					for (const [label, next, vis] of writes) {
						label.style.transform = next;
						label.style.visibility = vis;
					}
				};
				(0, react.useLayoutEffect)(() => {
					const el = scrollRef.current;
					/* v8 ignore next 1 -- the scroll div renders unconditionally and React
					attaches refs before layout effects run; el is never null here. */
					if (el === null) return;
					const newestSeq = requests.length === 0 ? 0 : requests[requests.length - 1].seq;
					const grew = newestSeq !== lastSeqRef.current;
					const widthBeforeAppend = prevScrollWidthRef.current;
					if (props.granularity !== lastGranRef.current) {
						lastGranRef.current = props.granularity;
						scrolledOnce.current = false;
					}
					if (props.focusTurn !== null) {
						const gi = groups.findIndex((g) => g.turn === props.focusTurn);
						if (gi >= 0) {
							scrolledOnce.current = true;
							el.scrollLeft = Math.max(0, gi * 16 + BAR_W / 2 - el.clientWidth / 2);
						}
						props.onFocusTurnHandled();
					} else if (!scrolledOnce.current) {
						scrolledOnce.current = true;
						el.scrollLeft = el.scrollWidth;
					} else if (grew && el.scrollLeft + el.clientWidth >= widthBeforeAppend - 24) el.scrollLeft = el.scrollWidth;
					lastSeqRef.current = newestSeq;
					prevScrollWidthRef.current = el.scrollWidth;
					updateTurnLabels(el);
					syncTip(el);
					measureVisible(el);
				}, [
					props.granularity,
					props.focusTurn,
					requests,
					adaptive
				]);
				const measureRef = (0, react.useRef)(measureVisible);
				(0, react.useLayoutEffect)(() => {
					measureRef.current = measureVisible;
				});
				(0, react.useLayoutEffect)(() => {
					const el = scrollRef.current;
					/* v8 ignore next 1 -- the scroll div renders unconditionally and React
					attaches refs before layout effects run; el is never null here. */
					if (el === null) return;
					if (typeof ResizeObserver !== "function") return;
					const observer = new ResizeObserver(() => {
						measureRef.current(el);
					});
					observer.observe(el);
					return () => {
						observer.disconnect();
					};
				}, []);
				(0, react.useLayoutEffect)(() => {
					const el = scrollRef.current;
					/* v8 ignore next 1 -- the scroll div renders unconditionally and React
					attaches refs before layout effects run; el is never null here. */
					if (el === null) return;
					return containHorizontalOverscroll(el);
				}, []);
				const stepsOf = (0, react.useMemo)(() => turnStepsOf(props.requests), [props.requests]);
				const tipRowsOf = (req) => {
					const n = req.stepCount ?? 1;
					const head = props.granularity === "turn" ? n > 1 ? t("tip.turn", {
						t: req.turn ?? 0,
						n
					}) : t("tip.turn1", { t: req.turn ?? 0 }) : t("tip.step", {
						t: req.turn ?? 0,
						s: req.step ?? 0,
						n: stepsOf(req.turn)
					});
					if (delta) {
						/* v8 ignore next 1 -- delta mode only receives records from
						deltaOf, which always assigns net; the fallback is defensive. */
						const n = req.net ?? 0;
						return [head, t("tip.delta", { n: (n > 0 ? "+" : "") + fmt(n) })];
					}
					return [head, focus !== null ? t("tip.cat", {
						cat: catLabel(focus),
						n: fmt(req.total)
					}) : t("tip.total", { n: fmt(req.total) })];
				};
				const hoveredIdx = props.hoveredSeq !== null ? requests.findIndex((r) => r.seq === props.hoveredSeq) : -1;
				const hoveredReq = hoveredIdx >= 0 ? requests[hoveredIdx] : null;
				const tipColRef = (0, react.useRef)(0);
				/**
				* Glue the hover tip to its bar's VISIBLE slice. The tip deliberately does NOT live inside the scrolling
				* content: an absolutely-positioned child of a scroller contributes to its scrollable overflow, so a wide
				* reply preview on a right-edge bar used to inflate scrollWidth on every hover and flap the horizontal
				* scrollbar open/closed — jumping the whole card. Reads (offsetWidth/clientWidth) batch before the single
				* style write; unchanged transforms write nothing.
				*/
				const syncTip = (el) => {
					/* v8 ignore next 1 -- the scroll div renders unconditionally while mounted, so its parent exists. */
					const tip = (el.parentElement ?? document.body).querySelector(".lc-chart-tip");
					if (tip === null) return;
					const lw = tip.offsetWidth;
					const cw = el.clientWidth;
					const half = Math.min(lw / 2, cw / 2);
					const cx = Math.min(Math.max(tipColRef.current - el.scrollLeft, half), cw - half);
					const next = `translate(${Math.round(cx - lw / 2)}px, 0)`;
					if (tip.style.transform !== next) tip.style.transform = next;
				};
				(0, react.useLayoutEffect)(() => {
					/* v8 ignore next 1 -- the scroll div renders unconditionally and React attaches refs before
					layout effects run; el is never null here. */
					if (scrollRef.current === null) return;
					tipColRef.current = hoveredIdx >= 0 ? hoveredIdx * 16 + BAR_W / 2 : 0;
					syncTip(scrollRef.current);
				});
				return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "lc-chartrow",
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "lc-axis",
						children: delta ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "lc-axis-top",
								children: fmtSigned(maxUp)
							}),
							q3Clear ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "lc-axis-q3",
								children: fmtSigned(Math.round(maxUp - span / 4))
							}) : null,
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "lc-axis-mid",
								style: { top: `${13 + upPx}px` },
								children: "0"
							}),
							q1Clear ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "lc-axis-q1",
								children: fmtSigned(Math.round(maxUp - 3 * span / 4))
							}) : null,
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "lc-axis-bot",
								children: fmtSigned(-maxDown)
							})
						] }) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "lc-axis-top",
								children: fmt(maxTotal)
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "lc-axis-q3",
								children: fmt(Math.round(maxTotal * 3 / 4))
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "lc-axis-mid",
								children: fmt(Math.round(maxTotal / 2))
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "lc-axis-q1",
								children: fmt(Math.round(maxTotal / 4))
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "lc-axis-bot",
								children: "0"
							})
						] })
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "lc-chart-wrap",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "lc-chart-scroll" + (props.activeTurn !== null ? " lc-chart-dim" : ""),
							ref: scrollRef,
							onScroll: (e) => {
								updateTurnLabels(e.currentTarget);
								syncTip(e.currentTarget);
								measureVisible(e.currentTarget);
							},
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "lc-chart",
								"data-catdim": props.hoverCat ?? void 0,
								onMouseLeave: () => {
									props.onHover(null);
								},
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { className: "lc-grid lc-grid-top" }),
									!delta || q3Clear ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { className: "lc-grid lc-grid-q3" }) : null,
									!delta || q1Clear ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { className: "lc-grid lc-grid-q1" }) : null,
									!delta ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { className: "lc-grid lc-grid-mid" }) : null,
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: "lc-grid lc-grid-zero",
										style: delta ? { top: `${18 + upPx}px` } : void 0
									}),
									requests.map((req, i) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChartBar, {
										req,
										marker: markers[i],
										selected: props.selectedSeq === req.seq,
										hovered: props.hoveredSeq === req.seq,
										inTurn: props.activeTurn !== null && (req.turn ?? 0) === props.activeTurn,
										maxTotal,
										upPx: delta ? upPx : void 0,
										downPx: delta ? downPx : void 0,
										deltaScale: delta ? deltaScale : void 0,
										enterIndex: i,
										onSelect: props.onSelect,
										onHover: props.onHover
									}, `${req.seq}:${props.granularity}`))
								]
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: "lc-turns",
								style: labelFont !== "" ? { fontSize: labelFont } : void 0,
								onMouseLeave: () => {
									props.onHoverTurn(null);
								},
								children: groups.map((grp, gi) => {
									const on = props.activeTurn === grp.turn;
									return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: "lc-turn" + (on ? " lc-turn-on" : ""),
										style: {
											width: `${turnWidths[gi]}px`,
											background: TURN_FILLS[gi % TURN_FILLS.length]
										},
										title: `T${grp.turn}`,
										onMouseEnter: () => {
											props.onHoverTurn(grp.turn);
										},
										onClick: () => {
											props.onPickTurn(grp.turn);
										},
										children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: "lc-turn-label",
											children: `${grp.turn}`
										})
									}, `turn-${gi}`);
								})
							})]
						}), hoveredReq !== null ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "lc-chart-tip",
							children: tipRowsOf(hoveredReq).map((row, i) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: row }, i))
						}) : null]
					})]
				});
			};
		}
		//#endregion
		//#region src/client/components/fetchOnMiss.tsx
		/**
		* The fetch-on-miss state machine behind the Context browser's two on-demand
		* reads (a row's full message content and a header epoch's prompt/schemas):
		* one targeted history read per key the local data missed, with a visible
		* terminal state for every outcome — `absent` when the durable log does not
		* hold the key, `failed` arming the retry button, never an unhandled
		* rejection or a spinner that never resolves. Landed values cache by key:
		* history is immutable, so a resolved key never refetches.
		*/
		/**
		* Run one fetch for `key` when it is set and not yet cached. `key` null (no
		* target open) or `fetcher` undefined (older host without the history face)
		* leaves the machine idle; the caller renders the matching note either way.
		*/
		function useFetchOnMiss(key, fetcher, warn) {
			const [values, setValues] = (0, react.useState)(() => /* @__PURE__ */ new Map());
			const [state, setState] = (0, react.useState)("idle");
			const [attempt, setAttempt] = (0, react.useState)(0);
			(0, react.useEffect)(() => {
				if (key === null || fetcher === void 0 || values.has(key)) return;
				let live = true;
				setState("loading");
				fetcher(key).then((value) => {
					if (!live) return;
					if (value === null) {
						setState("absent");
						return;
					}
					setValues((prev) => {
						const next = new Map(prev);
						next.set(key, value);
						return next;
					});
					setState("idle");
				}, (error) => {
					console.warn(warn, error);
					if (live) setState("failed");
				});
				return () => {
					live = false;
				};
			}, [
				key,
				fetcher,
				attempt,
				values
			]);
			return {
				values,
				state,
				retry: () => {
					setAttempt((a) => a + 1);
				}
			};
		}
		/**
		* The note a not-yet-loaded fetch target shows — one expression for both
		* on-demand reads: the legacy static hint (`emptyKey`) when no fetcher is
		* composed, `loading` while the read is in flight (and on the first frame
		* before the effect fires), `notInLog` when the durable log does not hold
		* the key, and a retry button after a failed read.
		*/
		function fetchMissNote(t, fetcher, state, onRetry, emptyKey) {
			if (fetcher === void 0) return t(emptyKey);
			if (state === "absent") return t("browser.notInLog");
			if (state === "failed") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
				type: "button",
				className: "lc-br-retry hover:brightness-[1.15]",
				onClick: onRetry,
				children: t("browser.loadFailed")
			});
			return t("browser.loading");
		}
		//#endregion
		//#region src/client/format.ts
		/** `fmt`: the k/M/B suffix style shared by bars/details/stats; `fmtTime`: local HH:MM:SS. */
		function fmt(n) {
			if (n === void 0 || n === null || isNaN(n)) return "—";
			const sign = n < 0 ? "-" : "";
			const a = Math.abs(n);
			if (a >= 1e9) return sign + (a / 1e9).toFixed(1) + "B";
			if (a >= 1e6) return sign + (a / 1e6).toFixed(1) + "M";
			if (a >= 1e3) return sign + (a / 1e3).toFixed(1) + "k";
			return sign + String(Math.round(a));
		}
		/** Byte sizes for attachment metadata (1 kB = 1000 B, matching the k/M style of `fmt`). */
		function fmtBytes(n) {
			if (n === void 0 || n === null || isNaN(n) || n < 0) return "—";
			if (n >= 1e6) return (n / 1e6).toFixed(1) + " MB";
			if (n >= 1e3) return (n / 1e3).toFixed(1) + " kB";
			return String(Math.round(n)) + " B";
		}
		/**
		* Cache-hit share of billed prompt-side input (`reads` over `billed`),
		* TRUNCATED to `decimals` places (cut, not round) — same formula as the
		* harness chat stats line's '缓存命中' figure and the stats board's cell
		* (which shows two decimals). Null when nothing was billed. The 1e-9 epsilon
		* absorbs only float noise (integer token counts never sit that close to a
		* boundary).
		*/
		function cacheHitPercent(reads, billed, decimals = 2) {
			if (!(billed > 0)) return null;
			const factor = 10 ** decimals;
			const scaled = Math.trunc(reads / billed * 100 * factor + 1e-9);
			return `${Math.floor(scaled / factor)}.${String(scaled % factor).padStart(decimals, "0")}`;
		}
		function fmtTime(t) {
			const d = new Date(t);
			if (isNaN(d.getTime())) return "—";
			return d.toLocaleTimeString("en-GB", { hour12: false });
		}
		/**
		* Share of a whole as a compact leading percentage for the slice rows:
		* '—' when nothing totals, '0.0%' for empty slices, '<0.1%' for non-zero
		* crumbs a 0.1%-precision figure would erase. One decimal everywhere; shares
		* cap at 100% (parallel tool time can over-run the wall it belongs to).
		*/
		function fmtShare(part, total) {
			if (!Number.isFinite(part) || !Number.isFinite(total) || total <= 0) return "—";
			if (part <= 0) return "0.0%";
			const pct = Math.min(1, part / total) * 100;
			if (pct < .1) return "<0.1%";
			return `${pct.toFixed(1)}%`;
		}
		/**
		* Whole-session durations for the timing card, locale-free compact units: raw
		* ms under a second, one-decimal seconds under a minute, then m/s and h/m.
		* Non-finite or non-positive input shows the dash (callers render their empty
		* state anyway).
		*/
		function fmtDuration(ms) {
			if (!Number.isFinite(ms) || ms <= 0) return "—";
			if (ms < 1e3) return `${Math.round(ms)}ms`;
			if (ms < 6e4) return `${(ms / 1e3).toFixed(1)}s`;
			const totalSec = Math.floor(ms / 1e3);
			const m = Math.floor(totalSec / 60);
			const s = totalSec % 60;
			if (ms < 36e5) return `${m}m${s}s`;
			return `${Math.floor(m / 60)}h${m % 60}m`;
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
		//#region src/client/components/images.tsx
		/**
		* dsh's multimodal pipeline stores only a normalized reference per image (never inline bytes); the block carries everything the card needs
		* except the display URL, which comes from the harness `uiConversation` service's `imageUrl` (the same loader the chat history rides on),
		* handed down as `load`; absent loader or failed load degrades to the metadata row alone — the card never throws.
		*/
		/**
		* Narrow an unknown content block to a durable image ref: accepts both raw message blocks (`{ type: 'image', attachment }`) and the
		* snapshot's assistant blocks (`{ kind: 'image', attachment }`); everything else null. Lenient on the optional facts — imageUrl reads
		* only attachmentId.
		*/
		function imageRefOf(block) {
			if (block === null || typeof block !== "object") return null;
			const b = block;
			if (b.type !== "image" && b.kind !== "image") return null;
			const a = b.attachment;
			if (a === null || typeof a !== "object") return null;
			const r = a;
			if (typeof r.attachmentId !== "string" || r.attachmentId === "") return null;
			const num = (v) => typeof v === "number" && Number.isFinite(v) && v > 0 ? v : void 0;
			const orig = r.originalDimensions !== null && typeof r.originalDimensions === "object" ? r.originalDimensions : void 0;
			const origDims = orig !== void 0 && num(orig.width) !== void 0 && num(orig.height) !== void 0 ? {
				width: num(orig.width),
				height: num(orig.height)
			} : void 0;
			return {
				attachmentId: r.attachmentId,
				...typeof r.name === "string" && r.name !== "" ? { name: r.name } : {},
				...num(r.bytes) !== void 0 ? { bytes: num(r.bytes) } : {},
				...num(r.width) !== void 0 ? { width: num(r.width) } : {},
				...num(r.height) !== void 0 ? { height: num(r.height) } : {},
				...origDims !== void 0 ? { originalDimensions: origDims } : {}
			};
		}
		/**
		* Document-level original-image preview — the chat history's ImageLightbox recipe (dsh ui-attachment, which the browser module table does
		* not seed) ported onto the plugin's lc-* classes: body portal (a transformed/filtered ancestor cannot trap the fixed backdrop), blurred
		* mask, contain-fit image, circular close, Escape/mask close, focus restored to the opener.
		*/
		function AttachmentLightbox(props) {
			const { src, alt, labels, onClose } = props;
			const closeRef = (0, react.useRef)(null);
			const restoreRef = (0, react.useRef)(null);
			(0, react.useEffect)(() => {
				restoreRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
				closeRef.current?.focus();
				const onKeyDown = (event) => {
					if (event.key === "Escape") onClose();
				};
				window.addEventListener("keydown", onKeyDown);
				return () => {
					window.removeEventListener("keydown", onKeyDown);
					restoreRef.current?.focus();
				};
			}, [onClose]);
			return (0, react_dom.createPortal)(/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "lc-att-lightbox",
				role: "dialog",
				"aria-modal": "true",
				"aria-label": labels.dialog,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "lc-att-lightbox-mask",
						"aria-hidden": "true",
						onMouseDown: onClose
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("img", {
						className: "lc-att-lightbox-img",
						src,
						alt
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						ref: closeRef,
						type: "button",
						className: "lc-att-lightbox-close",
						"aria-label": labels.close,
						onClick: onClose,
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconCloseOutline16, { size: 16 })
					})
				]
			}), document.body);
		}
		/**
		* One attachment card, the WHOLE card the click target: 64px cover tile + metadata column — Raw (the pre-normalization raster dsh records
		* when normalization reduced the image), Sent (the normalized raster the model receives, with byte size), estimated provider-billed tokens.
		* Click opens the chat-style lightbox; load failures retry on click; unknown facts leave no row.
		*/
		function makeImageCard(kit) {
			const { t, fmt } = kit;
			return function ImageCard(props) {
				const { attachment, load } = props;
				const [src, setSrc] = (0, react.useState)(null);
				const [error, setError] = (0, react.useState)(false);
				const [attempt, setAttempt] = (0, react.useState)(0);
				const [preview, setPreview] = (0, react.useState)(false);
				const closePreview = (0, react.useCallback)(() => {
					setPreview(false);
				}, []);
				(0, react.useEffect)(() => {
					if (load === void 0) return;
					let live = true;
					setError(false);
					setSrc(null);
					load(attachment).then((url) => {
						if (live) setSrc(url);
					}).catch(() => {
						if (live) setError(true);
					});
					return () => {
						live = false;
					};
				}, [
					attachment,
					load,
					attempt
				]);
				const name = attachment.name ?? t("attach.image");
				const dimsOf = (w, h) => w !== void 0 && h !== void 0 ? `${w}×${h}` : null;
				const rows = [];
				const raw = attachment.originalDimensions !== void 0 ? dimsOf(attachment.originalDimensions.width, attachment.originalDimensions.height) : null;
				if (raw !== null) rows.push({
					label: t("attach.raw"),
					value: raw
				});
				const sent = dimsOf(attachment.width, attachment.height);
				if (sent !== null) rows.push({
					label: t("attach.sent"),
					value: attachment.bytes !== void 0 ? `${sent} · ${fmtBytes(attachment.bytes)}` : sent
				});
				const tokens = attachment.width !== void 0 && attachment.height !== void 0 ? estimateImageTokens(attachment.width, attachment.height) : null;
				if (tokens !== null) rows.push({
					label: t("attach.token"),
					value: `≈${fmt(tokens)}`,
					tip: t("attach.tokensTip")
				});
				const activate = () => {
					if (error) {
						setAttempt((a) => a + 1);
						return;
					}
					if (src !== null) setPreview(true);
				};
				return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "lc-att-item hover:border-(--dsw-alias-label-dimmed) hover:bg-[var(--dsw-alias-interactive-bg-hover,var(--dsw-alias-bg-layer-2))]",
					title: error ? t("attach.loadFailed") : t("attach.open"),
					onClick: activate,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "lc-att-thumb",
						children: src !== null ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("img", {
							src,
							alt: name
						}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: error ? "lc-att-err" : "lc-att-ph",
							children: error ? "⚠" : load === void 0 ? "🖼" : t("attach.loading")
						})
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
						className: "lc-att-meta",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "lc-att-name",
							title: name,
							children: name
						}), rows.map((r) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
							className: "lc-att-row",
							title: r.tip,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", {
								className: "lc-att-row-label",
								children: r.label
							}), r.value]
						}, r.label))]
					})]
				}), preview && src !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(AttachmentLightbox, {
					src,
					alt: name,
					labels: {
						dialog: t("attach.preview"),
						close: t("attach.close")
					},
					onClose: closePreview
				})] });
			};
		}
		//#endregion
		//#region src/client/components/richText.tsx
		/**
		* RichText — the raw/markdown body for the Context browser's detail sections. Markdown renders via the harness's shared MarkdownText (GFM,
		* sanitized, resolved from the platform module table — zero plugin-side markdown dependency); raw is a line-numbered `<pre>`. The Raw/MD
		* switch sits at a section head's right edge (RichSwitch; per-card mode via useRichMode), with the copy-raw control (RichCopy) beside it.
		*/
		const Markdown = _deepseek_ai_dsh_client_ui_primitives.MarkdownText;
		function makeRichText(kit) {
			const { t } = kit;
			function useRichMode() {
				const [mode, setMode] = (0, react.useState)("md");
				return [mode, setMode];
			}
			function RichSwitch(props) {
				const seg = (m, label, tip) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
					type: "button",
					className: "lc-rich-seg-btn" + (props.mode === m ? " lc-rich-seg-on" : ""),
					title: tip,
					onClick: () => {
						props.onPick(m);
					},
					children: label
				});
				return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
					className: "lc-rich-seg",
					children: [seg("raw", t("rich.raw"), t("rich.toRaw")), seg("md", t("rich.md"), t("rich.toMd"))]
				});
			}
			function RawText(props) {
				const lines = (0, react.useMemo)(() => {
					const parts = props.text.split("\n");
					return parts.length > 1 && parts[parts.length - 1] === "" ? parts.slice(0, -1) : parts;
				}, [props.text]);
				return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("pre", {
					className: "lc-ts-desc-body lc-ts-lines",
					children: lines.map((line, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "lc-ts-line",
						children: line
					}, index))
				});
			}
			function RichCopy(props) {
				const [copied, setCopied] = (0, react.useState)(false);
				const onCopy = (0, react.useCallback)(() => {
					if (copied) return;
					(0, _deepseek_ai_dsh_client_ui_primitives.writeClipboard)(props.text).then((ok) => {
						if (!ok) return;
						setCopied(true);
						window.setTimeout(() => {
							setCopied(false);
						}, 1200);
					});
				}, [copied, props.text]);
				const label = copied ? t("rich.copied") : t("rich.copy");
				return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
					type: "button",
					className: "lc-rich-copy" + (copied ? " lc-rich-copy-on" : ""),
					title: label,
					"aria-label": label,
					onClick: onCopy,
					children: copied ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconCheckOutline16, { size: 13 }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconCopyOutline16, { size: 13 })
				});
			}
			function RichText(props) {
				const mdLabels = (0, react.useMemo)(() => ({
					code: {
						copyLabel: t("rich.md.copy"),
						copiedLabel: t("rich.md.copied")
					},
					footnotes: t("rich.md.footnotes")
				}), [t]);
				if (props.mode === "md") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "lc-ts-desc-md",
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Markdown, {
						text: props.text,
						labels: mdLabels
					})
				});
				return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(RawText, { text: props.text });
			}
			return {
				RichText,
				RichSwitch,
				RichCopy,
				useRichMode
			};
		}
		//#endregion
		//#region src/client/components/browser.tsx
		function unionTypesOf(p) {
			const branches = [];
			if (Array.isArray(p.anyOf)) branches.push(...p.anyOf);
			if (Array.isArray(p.oneOf)) branches.push(...p.oneOf);
			if (branches.length === 0) return null;
			const parts = [];
			for (const b of branches) if (b !== null && typeof b === "object") parts.push(typeOf(b));
			return parts.length > 0 ? parts.join(" | ") : null;
		}
		function typeOf(p) {
			const u = unionTypesOf(p);
			if (u !== null) return u;
			const t = p.type;
			if (t === "array") {
				const items = p.items;
				if (items !== null && typeof items === "object") return "array<" + typeOf(items) + ">";
				return "array";
			}
			if (typeof t === "string") {
				if (t === "object") {
					const props = p.properties;
					if (props !== null && typeof props === "object" && Object.keys(props).length > 0) return `object{${Object.keys(props).length}}`;
				}
				if (Array.isArray(p.enum) && p.enum.length > 0) return t + " (enum)";
				return t;
			}
			if (Array.isArray(p.enum) && p.enum.length > 0) return "(enum)";
			return "unknown";
		}
		/**
		* Tool schemas nest parameters under `parameters`, `input_schema`, or `inputSchema` (producer-dependent), or bare when `type === 'object'`
		* — `{type:'object', properties}` at the root is itself the parameter object.
		*/
		function paramsOf(schema) {
			if (schema === null || typeof schema !== "object") return null;
			const s = schema;
			const candidate = (v) => v !== null && typeof v === "object" ? v : null;
			const nested = candidate(s.parameters) ?? candidate(s.input_schema) ?? candidate(s.inputSchema);
			if (nested !== null) return nested;
			if (s.type === "object" && s.properties !== void 0 && typeof s.properties === "object") return s;
			return null;
		}
		function ParamRow(props) {
			const typeLabel = typeOf(props.schema);
			const desc = props.schema.description;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "lc-ts-param-row",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "lc-ts-param-name",
						children: props.name
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "lc-ts-param-type",
						children: typeLabel
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: props.required ? "lc-ts-param-req" : "lc-ts-param-req-off",
						children: props.required ? "✓" : "·"
					}),
					typeof desc === "string" && desc !== "" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "lc-ts-param-desc",
						children: desc
					}) : null
				]
			});
		}
		/**
		* Section — the ONE detail chrome of the browser: every expanded element is a stack of these (labeled head + body), so the reader scans one
		* repeating anatomy per content kind.
		*/
		function Section(props) {
			const right = props.actions !== void 0 || props.meta !== void 0;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "lc-ts-card",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "lc-ts-card-head" + (props.foldHead === true ? " lc-ts-card-head-wrap" : ""),
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", {
							className: props.labelClass,
							title: props.label,
							children: props.label
						}),
						right ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
							className: "lc-ts-card-right",
							children: [props.meta, props.actions]
						}) : null,
						props.count !== void 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "lc-ts-card-count",
							children: props.count
						}) : null
					]
				}), props.children]
			});
		}
		function lineCountOf(text) {
			return text.split(/\r\n|\r|\n/).length;
		}
		function TextSection(props) {
			const { rich } = props;
			const [mode, setMode] = rich.useRichMode();
			const lineCount = (0, react.useMemo)(() => lineCountOf(props.text), [props.text]);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Section, {
				label: props.label,
				foldHead: true,
				actions: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(rich.RichSwitch, {
					mode,
					onPick: setMode
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(rich.RichCopy, { text: props.text })] }),
				meta: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "lc-ts-card-meta",
					children: props.lines(lineCount)
				}),
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(rich.RichText, {
					text: props.text,
					mode
				})
			});
		}
		function RawSection(props) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Section, {
				label: props.label,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("pre", {
					className: "lc-ts-desc-body lc-br-dim",
					children: props.text
				})
			});
		}
		/**
		* The search text of one tool's raw schema. The schema is log data this view
		* does not own — a hostile value (cyclic, throwing getters) degrades to no
		* matchable text instead of taking the row, or the browser, down.
		*/
		function schemaTextOf(schema) {
			try {
				return JSON.stringify(schema ?? "");
			} catch {
				return "";
			}
		}
		/**
		* The shared row-filter toolbar of a category body: a text input plus an
		* optional trailing control group (the tools' size/name sort). Stays mounted
		* on an empty match so the filter can always be cleared from the UI.
		*/
		function RowToolbar(props) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "lc-br-toolctl",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
					className: "lc-br-tool-search focus:border-(--dsw-alias-label-dimmed)",
					value: props.value,
					placeholder: props.placeholder,
					onChange: (ev) => {
						props.onChange(ev.target.value);
					}
				}), props.children !== void 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "lc-gran",
					role: "group",
					title: props.tip,
					children: props.children
				}) : null]
			});
		}
		/**
		* Full tool-row body: description, parsed parameter table (when the schema carries one), raw JSON behind a per-row toggle — the JSON open
		* state is per-row so two expanded tools stay independent.
		*/
		function ToolSchema(props) {
			const { rich } = props;
			const [jsonOpen, setJsonOpen] = (0, react.useState)(false);
			const params = (0, react.useMemo)(() => paramsOf(props.schema), [props.schema]);
			const rows = (0, react.useMemo)(() => {
				if (params === null) return [];
				const props = params.properties;
				if (props === null || typeof props !== "object") return [];
				const req = Array.isArray(params.required) ? new Set(params.required.filter((x) => typeof x === "string")) : /* @__PURE__ */ new Set();
				const out = [];
				for (const k of Object.keys(props)) {
					const v = props[k];
					if (v === null || typeof v !== "object") continue;
					out.push({
						name: k,
						schema: v,
						required: req.has(k)
					});
				}
				return out;
			}, [params]);
			const schemaJson = (0, react.useMemo)(() => jsonOpen ? JSON.stringify(props.schema, null, 2) : "", [props.schema, jsonOpen]);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
				props.description !== void 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TextSection, {
					label: props.labels.desc,
					text: props.description,
					rich,
					lines: props.lines
				}) : null,
				params !== null && rows.length > 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Section, {
					label: props.labels.title,
					count: rows.length,
					children: rows.map((r) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ParamRow, {
						name: r.name,
						schema: r.schema,
						required: r.required
					}, r.name))
				}) : params !== null ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "lc-ts-params-empty",
					children: props.labels.empty
				}) : null,
				/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "lc-ts-json",
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						type: "button",
						className: "lc-ts-json-toggle hover:text-(--dsw-alias-label-primary) hover:underline",
						onClick: () => {
							setJsonOpen((o) => !o);
						},
						children: (jsonOpen ? "▾ " : "▸ ") + (jsonOpen ? props.labels.hide : props.labels.show)
					}), jsonOpen ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("pre", {
						className: "lc-ts-desc-body lc-br-dim",
						children: schemaJson
					}) : null]
				})
			] });
		}
		/**
		* Both block vocabularies normalize here — raw durable blocks (`type`: text/reasoning/tool-call/tool-result/image) and snapshot assistant
		* blocks (`kind`: text/reasoning/tool-call/image, argsRaw). Consecutive images group into one grid; every
		* rich text block carries the Raw/MD switch + line count; nested tool-result blocks flatten into the same flow.
		*/
		function BlocksBody(props) {
			const { rich, img, labels } = props;
			const out = [];
			let images = [];
			const flushImages = () => {
				if (images.length === 0) return;
				const group = images;
				images = [];
				out.push(/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Section, {
					label: labels.images,
					count: group.length,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "lc-att-grid",
						children: group.map((a, i) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(img.Card, {
							attachment: a,
							load: img.load
						}, `${a.attachmentId}:${i}`))
					})
				}, "img" + String(out.length)));
			};
			for (const b of props.blocks) {
				const image = imageRefOf(b);
				if (image !== null) {
					images.push(image);
					continue;
				}
				flushImages();
				const blk = b !== null && typeof b === "object" ? b : null;
				const blockKind = blk !== null ? typeof blk.type === "string" ? blk.type : typeof blk.kind === "string" ? blk.kind : "" : "";
				if ((blockKind === "text" || blockKind === "reasoning") && typeof blk?.text === "string") {
					const label = blockKind === "reasoning" ? labels.thinking : props.textLabel;
					out.push(/* @__PURE__ */ (0, react_jsx_runtime.jsx)(TextSection, {
						label,
						text: blk.text,
						rich,
						lines: labels.lines
					}, out.length));
					continue;
				}
				if (blockKind === "tool-call") {
					out.push(/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ToolCallCard, {
						name: typeof blk?.name === "string" ? blk.name : "?",
						argsRaw: blk?.argsRaw ?? blk?.arguments
					}, out.length));
					continue;
				}
				if (blockKind === "tool-result" && Array.isArray(blk?.content)) {
					out.push(/* @__PURE__ */ (0, react_jsx_runtime.jsx)(BlocksBody, {
						blocks: blk.content,
						richable: false,
						textLabel: labels.result,
						rich,
						img,
						labels
					}, out.length));
					continue;
				}
				out.push(/* @__PURE__ */ (0, react_jsx_runtime.jsx)(RawSection, {
					label: labels.other,
					text: JSON.stringify(b, null, 2)
				}, out.length));
			}
			flushImages();
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children: out });
		}
		/**
		* The trailing status markers dsh shell tools append at the END of a result's text while `isError` stays false
		* (the status is result data, per tool-bash's render: "non-zero exits are reported, not errored"):
		* - one-shot bash/pwsh: `[exit code: N]` (non-zero only), `[killed by signal: X]`
		* - persistent shells: `[shell killed by signal: X]`, `[shell exited: code N]` — riding LAST, after the
		*   `[exit code: N]` of the command whose failure killed the shell, so the command marker is re-checked
		*   on the preceding text
		* - job_output: `[status: killed]` / `[status: failed, detail]` — the tool-jobs status line always terminates
		*   the read; a killed/failed background job settles with `isError` false, so only the line flags the loss
		* End-anchored like dsh's own parseExitStatus, so marker text quoted inside the output (e.g. a cat'ed log)
		* is not a failure. A clean shell exit (code 0 or code-less) or a live/completed job status is a notice,
		* not a failure.
		* The parsed exit code feeds the FAILED run-state pill.
		*/
		function tailStatusOf(conv) {
			if (conv === void 0 || !Array.isArray(conv.content)) return {
				fail: false,
				exit: null
			};
			for (const b of conv.content) {
				const text = b?.text;
				if (typeof text !== "string") continue;
				const tail = text.trimEnd();
				const shell = /\[(shell killed by signal: [^\]\n]+|shell exited(?:: code \d+)?)\]$/.exec(tail);
				if (shell !== null) {
					const cmdExit = /\[exit code:\s*(\d+)\]\s*$/.exec(tail.slice(0, shell.index));
					if (cmdExit !== null) return {
						fail: true,
						exit: Number(cmdExit[1])
					};
					const code = /: code (\d+)$/.exec(shell[1]);
					if (code !== null) return {
						fail: code[1] !== "0",
						exit: code[1] === "0" ? null : Number(code[1])
					};
					return {
						fail: shell[1].startsWith("shell killed"),
						exit: null
					};
				}
				const exit = /\[exit code:\s*(\d+)\]$/.exec(tail);
				if (exit !== null) return {
					fail: true,
					exit: Number(exit[1])
				};
				if (/\[killed by signal: [^\]\n]+\]$/.test(tail)) return {
					fail: true,
					exit: null
				};
				if (/\[status: (?:killed|failed)(?:, [^\]\n]*)?\]$/.test(tail)) return {
					fail: true,
					exit: null
				};
			}
			return {
				fail: false,
				exit: null
			};
		}
		/**
		* A tool result's failure: the fold-stamped `err` or the snapshot's `isError` (infrastructure failures — dsh stamps
		* those) OR a trailing status marker (see tailStatusOf). dsh settles a failing COMMAND as a completed call, so the
		* marker is the only failure signal — mirroring the chat row's terminalFailed. A timeout stays a notice, as in the chat.
		*/
		function toolErrOf(node, conv) {
			const tail = tailStatusOf(conv);
			return {
				err: node.err === true || conv?.isError === true || tail.fail,
				exit: tail.exit
			};
		}
		function ToolCallCard(props) {
			const args = (0, react.useMemo)(() => parseCallArgs(props.argsRaw), [props.argsRaw]);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Section, {
				label: (props.arrow ?? "→") + " " + props.name,
				labelClass: "lc-ts-call-name",
				meta: props.status,
				children: args !== null ? Object.keys(args).map((k) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CallArgRow, {
					name: k,
					value: args[k]
				}, k)) : typeof props.argsRaw === "string" && props.argsRaw !== "" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("pre", {
					className: "lc-ts-desc-body lc-br-dim",
					children: props.argsRaw
				}) : null
			});
		}
		function CallArgRow(props) {
			const v = props.value;
			/* v8 ignore next 2 -- the only caller maps Object.keys of a JSON.parse'd
			object, which never holds undefined values; defensive. */
			const text = typeof v === "string" ? v : v === void 0 ? "" : JSON.stringify(v);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "lc-ts-arg-row",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "lc-ts-param-name",
					children: props.name
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "lc-ts-arg-val",
					children: text
				})]
			});
		}
		function NodeContent(props) {
			const { node, conv, rich, img, labels } = props;
			if (conv === void 0) {
				if (node.text === void 0 || node.text === "") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "lc-br-note",
					children: props.hint
				});
				return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(TextSection, {
					label: labels.content,
					text: node.text,
					rich,
					lines: labels.lines
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "lc-br-note",
					children: props.hint
				})] });
			}
			if (conv.kind === "assistant" && Array.isArray(conv.blocks)) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(BlocksBody, {
				blocks: conv.blocks,
				richable: true,
				textLabel: labels.answer,
				rich,
				img,
				labels
			});
			if (conv.kind === "tool-result") {
				const { err, exit } = toolErrOf(node, conv);
				return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [conv.call != null ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ToolCallCard, {
					arrow: "←",
					name: conv.call.name,
					argsRaw: conv.call.argsRaw,
					status: labels.callState(err, exit)
				}) : null, Array.isArray(conv.content) ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(BlocksBody, {
					blocks: conv.content,
					richable: false,
					textLabel: labels.result,
					rich,
					img,
					labels
				}) : null] });
			}
			if (conv.kind === "compaction") return typeof conv.summary === "string" && conv.summary !== "" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TextSection, {
				label: labels.summary,
				text: conv.summary,
				rich,
				lines: labels.lines
			}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, {});
			if (Array.isArray(conv.content)) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(BlocksBody, {
				blocks: conv.content,
				richable: true,
				textLabel: labels.content,
				rich,
				img,
				labels
			});
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "lc-br-note",
				children: props.hint
			});
		}
		function byCatOf(asm) {
			const m = {};
			for (const n of asm.nodes) (m[n.cat] ??= []).push(n);
			return m;
		}
		/**
		* The producer identity a fold-stamped injection node carries
		* (shared/types.ts SurfaceNode.name): '' when absent or drift-typed — the
		* delivered payload is untrusted, so rows re-prove it before rendering.
		*/
		function nodeNameOf(n) {
			return typeof n.name === "string" ? n.name : "";
		}
		function countOf(asm, byCat, c) {
			if (c === "system") return asm.system !== null ? 1 : 0;
			if (c === "tools") return asm.header !== null ? asm.header.tools.length : 0;
			return byCat[c]?.length ?? 0;
		}
		function lastOfTurn(requests, turn) {
			for (let i = requests.length - 1; i >= 0; i--) if ((requests[i].turn ?? 0) === turn) return requests[i];
			return null;
		}
		/**
		* DNA bands keep at least this share of the occupied region, so a tiny item (a 25-token user message in a 40k
		* context) stays a hoverable/clickable filament instead of a sub-pixel sliver. Tooltips still report true shares.
		*/
		const DNA_MIN_BAND = .35;
		function makeContextBrowser(kit, StackedBar, settings) {
			const { t, fmt, fmtTime, catLabel } = kit;
			const DetailNote = makeDetailNote(kit);
			const nodeText = makeNodeText(kit);
			const rich = makeRichText(kit);
			const ImageCard = makeImageCard(kit);
			const lineLabel = (n) => t(n === 1 ? "block.line" : "block.lines", { n });
			return function ContextBrowser(props) {
				const { data, headers } = props;
				const [sel, setSel] = (0, react.useState)("live");
				const [openCat, setOpenCat] = (0, react.useState)(null);
				const [openElem, setOpenElem] = (0, react.useState)(null);
				const [rowQuery, setRowQuery] = (0, react.useState)("");
				const [toolSort, setToolSort] = (0, react.useState)(() => settings.defaultToolSort());
				const [dna, setDna] = (0, react.useState)(false);
				const [dnaKey, setDnaKey] = (0, react.useState)(null);
				const onOpenCat = props.onOpenCat;
				const setCat = (c) => {
					setOpenCat(c);
					if (onOpenCat !== void 0) onOpenCat(c);
				};
				const convNodes = props.convNodes;
				const convBySeq = (0, react.useMemo)(() => {
					const m = /* @__PURE__ */ new Map();
					for (const n of convNodes ?? []) m.set(n.seq, n);
					return m;
				}, [convNodes]);
				const openSeq = openElem !== null && openElem.startsWith("n") ? Number(openElem.slice(1)) : null;
				const fetchContent = props.fetchContent;
				const miss = useFetchOnMiss(openSeq !== null && !convBySeq.has(openSeq) ? openSeq : null, fetchContent, "dsh-context: targeted history read failed");
				const bySeq = (0, react.useMemo)(() => {
					if (miss.values.size === 0) return convBySeq;
					const m = new Map(convBySeq);
					for (const [seq, n] of miss.values) if (!m.has(seq)) m.set(seq, n);
					return m;
				}, [convBySeq, miss.values]);
				const pinSeq = props.pinSeq;
				(0, react.useEffect)(() => {
					setSel(pinSeq === null || pinSeq === void 0 ? "live" : pinSeq);
					setCat(null);
					setOpenElem(null);
				}, [pinSeq, onOpenCat]);
				const rootRef = (0, react.useRef)(null);
				const focusScrollRef = (0, react.useRef)(false);
				const nodeFocus = props.nodeFocus;
				(0, react.useEffect)(() => {
					if (nodeFocus === null || nodeFocus === void 0) return;
					setSel(nodeFocus.step);
					setCat(nodeFocus.cat);
					setOpenElem("n" + String(nodeFocus.seq));
					focusScrollRef.current = true;
					if (props.onNodeFocusHandled !== void 0) props.onNodeFocusHandled();
				}, [
					nodeFocus,
					props.onNodeFocusHandled,
					onOpenCat
				]);
				(0, react.useLayoutEffect)(() => {
					if (!focusScrollRef.current) return;
					focusScrollRef.current = false;
					rootRef.current?.querySelector(".lc-br-elem-on")?.scrollIntoView({ block: "nearest" });
				});
				const missNote = fetchMissNote(t, fetchContent, miss.state, miss.retry, "browser.noContent");
				const requests = data.requests;
				const stepsOf = (0, react.useMemo)(() => turnStepsOf(requests), [requests]);
				const req = (props.previewSeq !== null && props.previewSeq !== void 0 ? requests.find((r) => r.seq === props.previewSeq) ?? null : null) ?? (sel === "live" ? null : requests.find((r) => r.seq === sel) ?? null);
				const actual = req ?? requests.reduce((a, r) => a === null || r.seq > a.seq ? r : a, null);
				const seq = req !== null ? req.seq : null;
				const linked = req === null && props.onHoverKey !== void 0;
				const linkKey = linked && props.hoverKey !== null && props.hoverKey !== "free" ? props.hoverKey : null;
				const view = assemble(data, headers, seq);
				const fetchHeader = props.fetchHeader;
				const headerSeq = view.header !== null ? view.header.seq : null;
				const systemSeq = view.system !== null ? view.system.seq : null;
				const epoch = useFetchOnMiss(openCat === "system" ? systemSeq : openCat === "tools" ? headerSeq : null, fetchHeader, "dsh-context: header content fetch failed");
				const headerContent = epoch.values;
				const headerNote = fetchMissNote(t, fetchHeader, epoch.state, epoch.retry, "browser.headerMetaOnly");
				const breakdown = req !== null ? req : data.current;
				const parts = partsOf(breakdown);
				const total = breakdown.total;
				const pinKey = openCat !== null && (breakdown[openCat] || 0) > 0 ? openCat : null;
				const pick = (v) => {
					setSel(v === "live" ? "live" : Number(v));
					setCat(null);
					setOpenElem(null);
				};
				const refReq = req === null ? requests.length > 0 ? requests[requests.length - 1] : null : lastOfTurn(requests, (req.turn ?? 0) - 1);
				const prevView = refReq !== null ? assemble(data, headers, refReq.seq) : null;
				const prevByCat = prevView !== null ? byCatOf(prevView) : null;
				const byCat = byCatOf(view);
				const toolHits = /* @__PURE__ */ new Map();
				for (const n of view.nodes) if ((n.cat === "tool" || n.cat === "skill") && n.tool !== void 0) toolHits.set(n.tool, (toolHits.get(n.tool) ?? 0) + 1);
				const toolHitsOf = (tool) => toolHits.get(tool.name) ?? 0;
				const dnaLabel = (it) => {
					let base;
					if (!("node" in it)) base = it.cat === "system" ? catLabel("system") : it.key.slice(5);
					else {
						const n = it.node;
						base = n.skill !== void 0 ? t("node.skillTag", { name: n.skill }) : n.cat === "tool" ? n.tool ?? "?" : n.cat === "inject" ? t("form." + (n.form || "context")) : catLabel(n.cat);
					}
					return it.time !== void 0 ? base + " · " + fmtTime(it.time) : base;
				};
				const dnaItems = dna ? dnaOf(view) : null;
				const dnaByKey = new Map(dnaItems?.map((it) => [it.key, it]) ?? []);
				const dnaParts = dnaItems?.map((it) => ({
					key: it.key,
					color: CAT_COLOR[it.cat],
					value: it.tokens,
					label: dnaLabel(it),
					group: it.cat
				})) ?? null;
				const liveDnaKey = dnaKey !== null && dnaByKey.has(dnaKey) ? dnaKey : null;
				const pickDna = (key) => {
					const it = dnaByKey.get(key);
					/* v8 ignore next 1 -- the bar only reports keys of the parts it was handed; defensive. */
					if (it === void 0) return;
					setCat(it.cat);
					setRowQuery("");
					setOpenElem(key);
					focusScrollRef.current = true;
				};
				const toolCount = (c) => countOf(view, byCat, c);
				const singleKeyOf = (c) => {
					if (c === "system") return view.system !== null ? "sys" : null;
					if (c === "tools") {
						const tools = view.header?.tools;
						return tools !== void 0 && tools.length === 1 ? "tool:" + tools[0].name : null;
					}
					/* v8 ignore next 1 -- reached only through toggleCat's openable guard
					(count > 0 ⟺ byCat[c] exists); the fallback is defensive. */
					const nodes = byCat[c] ?? [];
					return nodes.length === 1 ? "n" + String(nodes[0].seq) : null;
				};
				const toggleCat = (c) => {
					if (!(toolCount(c) > 0 || (c === "system" || c === "tools") && view.header === null)) return;
					if (openCat === c) {
						setCat(null);
						setOpenElem(null);
						return;
					}
					setCat(c);
					setRowQuery("");
					setOpenElem(singleKeyOf(c));
				};
				const toggleElem = (key) => {
					setOpenElem(openElem === key ? null : key);
				};
				/**
				* Expandable element row; `err` rows carry the red run-state dot right after the chevron (the chat's failed-tool marker) so a failed
				* result scans while collapsed.
				*/
				const elemRow = (key, tag, preview, tokens, time, body, err = false, trailing = null) => {
					const open = openElem === key;
					return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "lc-br-elem" + (open ? " lc-br-elem-on" : ""),
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "lc-br-elem-row hover:bg-(--dsw-alias-interactive-bg-hover)",
							onClick: () => {
								toggleElem(key);
							},
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { className: "lc-br-chev" + (open ? " lc-br-chev-on" : "") }),
								err ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "lc-br-err-dot",
									title: t("node.failed")
								}) : null,
								tag !== null ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "lc-br-tag",
									children: tag
								}) : null,
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "lc-br-preview",
									children: preview
								}),
								trailing !== null ? trailing : null,
								time !== void 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "lc-br-time",
									children: fmtTime(time)
								}) : null,
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "lc-br-tokens",
									children: "≈" + fmt(tokens)
								})
							]
						}), open ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "lc-br-content",
							children: body
						}) : null]
					}, key);
				};
				const catBody = (c) => {
					if (c === "system") {
						const sys = view.system;
						if (sys === null) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "lc-br-note",
							children: t(headers === null ? "browser.noHeader" : "browser.noEpoch")
						});
						const content = headerContent.get(sys.seq);
						if (content === void 0) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "lc-br-note",
							children: headerNote
						});
						if (content.system === void 0) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "lc-br-note",
							children: t("browser.noSystem")
						});
						return elemRow("sys", null, content.system.replace(/\s+/g, " ").trim().slice(0, 80), breakdown.system, void 0, /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TextSection, {
							label: catLabel("system"),
							text: content.system,
							rich,
							lines: lineLabel
						}));
					}
					if (c === "tools") {
						if (view.header === null) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "lc-br-note",
							children: t(headers === null ? "browser.noHeader" : "browser.noEpoch")
						});
						const labels = {
							desc: t("tool.desc"),
							title: t("tool.params"),
							empty: t("tool.paramsEmpty"),
							show: t("tool.jsonToggle"),
							hide: t("tool.jsonHide")
						};
						const content = headerContent.get(view.header.seq);
						const contentByName = new Map(content?.tools.map((t) => [t.name, t]) ?? []);
						const q = rowQuery.trim().toLowerCase();
						const shown = view.header.tools.filter((tool) => {
							if (q === "") return true;
							if (tool.name.toLowerCase().includes(q)) return true;
							if ((tool.plugin ?? "").toLowerCase().includes(q)) return true;
							const row = contentByName.get(tool.name);
							if (row === void 0) return false;
							return (row.description ?? "").toLowerCase().includes(q) || schemaTextOf(row.schema).toLowerCase().includes(q);
						}).sort((a, b) => toolSort === "count" ? toolHitsOf(b) - toolHitsOf(a) || (a.name < b.name ? -1 : 1) : toolSort === "size" ? b.tokens - a.tokens : a.name < b.name ? -1 : 1);
						const toolctl = /* @__PURE__ */ (0, react_jsx_runtime.jsx)(RowToolbar, {
							value: rowQuery,
							placeholder: t("tool.search"),
							tip: t("tool.sortTip"),
							onChange: setRowQuery,
							children: [
								"size",
								"count",
								"name"
							].map((k) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: "lc-gran-btn" + (toolSort === k ? " lc-gran-on" : ""),
								onClick: () => {
									setToolSort(k);
								},
								children: t("tool.sort." + k)
							}, k))
						});
						if (shown.length === 0) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [toolctl, /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "lc-br-note",
							children: t("tool.noMatch")
						})] });
						const toolBody = (tool) => {
							if (content === void 0) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: "lc-br-note",
								children: headerNote
							});
							const row = contentByName.get(tool.name);
							return row === void 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: "lc-br-note",
								children: t("browser.notInLog")
							}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ToolSchema, {
								description: row.description,
								schema: row.schema,
								rich,
								lines: lineLabel,
								labels
							});
						};
						return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [toolctl, shown.map((tool) => {
							const trailing = /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [tool.plugin !== void 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "lc-br-tag lc-br-tool-plugin",
								title: tool.plugin === "<unknown-plugin>" ? t("tool.unknownTitle") : t("tool.plugin"),
								children: tool.plugin === "<unknown-plugin>" ? t("tool.unknown") : tool.plugin
							}) : null, /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "lc-br-hits",
								title: t("tool.hitsTip"),
								children: "×" + fmt(toolHitsOf(tool))
							})] });
							return elemRow("tool:" + tool.name, null, tool.name, tool.tokens, void 0, toolBody(tool), false, trailing);
						})] });
					}
					const rows = (byCat[c] ?? []).slice().reverse().map((n) => {
						const conv = bySeq.get(n.seq);
						const rowErr = (n.cat === "tool" || n.cat === "skill") && toolErrOf(n, conv).err;
						let tag = null;
						let preview = nodeText(n);
						const id = nodeNameOf(n);
						if (n.cat === "tool") {
							tag = n.tool ?? "?";
							preview = callSummaryOf(conv) ?? t("node.toolResult");
						} else if (n.cat === "skill") {
							tag = n.skill !== void 0 ? t("node.skillTag", { name: n.skill }) : t("form." + (n.form || "context"));
							preview = (n.skill === void 0 && id !== "" ? id : null) ?? (n.text !== void 0 && n.text !== "" ? n.text : null) ?? callSummaryOf(conv) ?? preview;
						} else if (n.cat === "assistant" && Array.isArray(n.calls) && n.calls.length > 0) {
							tag = n.calls.join(" › ");
							preview = (n.text !== void 0 && n.text !== "" ? n.text : null) ?? blockSummaryOf(conv) ?? t("node.empty");
						} else if (n.cat === "assistant" && (n.text === void 0 || n.text === "")) preview = blockSummaryOf(conv) ?? preview;
						else if (n.cat === "user") {
							const imgCount = conv !== void 0 && Array.isArray(conv.content) ? conv.content.filter((b) => imageRefOf(b) !== null).length : 0;
							if (imgCount > 0 && openElem !== `n${n.seq}`) tag = t("attach.image") + (imgCount > 1 ? " ×" + String(imgCount) : "");
						} else if (n.cat === "inject") {
							tag = t("form." + (n.form || "context"));
							if (id !== "") preview = id;
							else if (n.text !== void 0 && n.text !== "") preview = n.form === "snapshot" ? t("node.snapshot") + n.text : n.text;
						}
						return {
							n,
							conv,
							rowErr,
							tag,
							preview
						};
					});
					const q = rowQuery.trim().toLowerCase();
					const shown = q === "" ? rows : rows.filter((r) => (r.tag ?? "").toLowerCase().includes(q) || r.preview.toLowerCase().includes(q) || typeof r.n.text === "string" && r.n.text.toLowerCase().includes(q));
					const rowctl = /* @__PURE__ */ (0, react_jsx_runtime.jsx)(RowToolbar, {
						value: rowQuery,
						placeholder: t("browser.search." + c),
						onChange: setRowQuery
					});
					if (shown.length === 0) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [rowctl, /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "lc-br-note",
						children: t("browser.rowNoMatch")
					})] });
					return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [rowctl, shown.map(({ n, conv, rowErr, tag, preview }) => elemRow(`n${n.seq}`, tag, preview, n.tokens, n.time, /* @__PURE__ */ (0, react_jsx_runtime.jsx)(NodeContent, {
						node: n,
						conv,
						rich,
						img: {
							Card: ImageCard,
							load: props.loadImage
						},
						labels: {
							thinking: t("block.thinking"),
							answer: t("block.answer"),
							content: t("block.content"),
							result: t("block.result"),
							summary: t("block.summary"),
							images: t("attach.images"),
							other: t("attach.other"),
							lines: lineLabel,
							callState: (err, exit) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
								className: "lc-ts-call-state " + (err ? "lc-ts-call-err" : "lc-ts-call-ok"),
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", {}), err ? t("call.fail") + (exit !== null ? " · " + t("call.exit", { n: exit }) : "") : t("call.ok")]
							})
						},
						hint: conv === void 0 ? missNote : t("browser.noContent")
					}), rowErr))] });
				};
				return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "lc-card",
					ref: rootRef,
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "lc-card-title",
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "lc-card-title-text",
									children: t("browser.title")
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "lc-gran lc-br-dna-ctl",
									role: "group",
									title: t("browser.dnaTip"),
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										className: "lc-gran-btn" + (dna ? " lc-gran-on" : ""),
										onClick: () => {
											setDna((on) => !on);
										},
										children: t("browser.dna")
									})
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "lc-br-hint",
									children: t("browser.deltaHint")
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("select", {
									className: "lc-br-pick",
									value: seq === null ? "live" : String(seq),
									onChange: (e) => {
										pick(e.target.value);
									},
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
										value: "live",
										children: t("browser.live")
									}), requests.slice().reverse().map((r) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
										value: String(r.seq),
										children: t("detail.step", {
											t: r.turn ?? 0,
											s: r.step ?? 0,
											n: stepsOf(r.turn)
										}) + " · " + fmtTime(r.time)
									}, r.seq))]
								})
							]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "lc-br-meta",
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: req !== null ? t("detail.step", {
									t: req.turn ?? 0,
									s: req.step ?? 0,
									n: stepsOf(req.turn)
								}) : t("browser.liveNow") }),
								req !== null ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: fmtTime(req.time) }) : null,
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "lc-est",
									children: t("detail.estTotal", { n: fmt(total) })
								}),
								actual !== null && actual.prompt !== void 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("detail.actual", { n: fmt(actual.prompt) }) }) : null
							]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "lc-br-bar" + (dna ? " lc-br-bar-dna" : ""),
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(StackedBar, {
								parts: dnaParts ?? parts,
								height: 10,
								hoverKey: dna ? liveDnaKey ?? linkKey ?? pinKey : linkKey ?? pinKey,
								onHoverKey: dna ? setDnaKey : linked ? props.onHoverKey : void 0,
								tip: dna,
								onPickKey: dna ? pickDna : void 0,
								minBand: dna ? DNA_MIN_BAND : void 0
							})
						}),
						view.missingLive > 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "lc-br-note",
							children: t("browser.missingLive", { n: view.missingLive })
						}) : null,
						view.approximate ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "lc-br-note",
							children: t("browser.approx")
						}) : null,
						props.detailState === "loading" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DetailNote, {
							state: "loading",
							className: "lc-br-note"
						}) : null,
						props.detailState === "failed" && props.onDetailRetry !== void 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DetailNote, {
							state: "failed",
							onRetry: props.onDetailRetry,
							className: "lc-br-note"
						}) : null,
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "lc-br-cats",
							children: CATS.map((c) => {
								const count = toolCount(c.key);
								const v = breakdown[c.key] || 0;
								const prevCount = prevView !== null && prevByCat !== null ? countOf(prevView, prevByCat, c.key) : null;
								const countDelta = prevCount !== null ? count - prevCount : null;
								const prevTokens = refReq !== null ? refReq[c.key] || 0 : null;
								const tokenDelta = prevTokens !== null ? v - prevTokens : null;
								const openable = count > 0 || (c.key === "system" || c.key === "tools") && view.header === null;
								const open = openCat === c.key && openable;
								return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "lc-br-cat" + (openable ? "" : " lc-br-cat-empty"),
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
										type: "button",
										className: "lc-br-cat-row hover:bg-(--dsw-alias-interactive-bg-hover)" + (open ? " lc-br-cat-open" : "") + (linked && props.hoverKey === c.key ? " lc-br-cat-on" : ""),
										/* v8 ignore start -- the handlers exist only when linked,
										and linked already requires onHoverKey defined (above). */
										onMouseEnter: linked ? () => {
											if (props.onHoverKey !== void 0) props.onHoverKey(c.key);
										} : void 0,
										onMouseLeave: linked ? () => {
											if (props.onHoverKey !== void 0) props.onHoverKey(null);
										} : void 0,
										/* v8 ignore stop */
										onClick: () => {
											toggleCat(c.key);
										},
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { className: "lc-br-chev" + (open ? " lc-br-chev-on" : "") }),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", { style: { background: c.color } }),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: "lc-br-cat-label",
												children: catLabel(c.key)
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
												className: "lc-br-count-grp",
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													className: "lc-br-cat-count",
													children: t("browser.items", { n: count })
												}), countDelta !== null && countDelta !== 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													className: "lc-br-delta lc-br-delta-" + (countDelta > 0 ? "up" : "down"),
													children: `${countDelta > 0 ? "+" : ""}${countDelta}`
												}) : null]
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
												className: "lc-br-tokens-grp",
												children: [tokenDelta !== null && tokenDelta !== 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													className: "lc-br-tdelta lc-br-tdelta-" + (tokenDelta > 0 ? "up" : "down"),
													children: (tokenDelta > 0 ? "+" : "") + fmt(tokenDelta)
												}) : null, /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													className: "lc-br-tokens",
													children: "≈" + fmt(v)
												})]
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: "lc-br-pct",
												children: total > 0 ? `${Math.round(v / total * 100)}%` : ""
											})
										]
									}), open ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: "lc-br-body",
										children: catBody(c.key)
									}) : null]
								}, c.key);
							})
						})
					]
				});
			};
		}
		//#endregion
		//#region src/client/components/stackedBar.tsx
		/**
		* Composition bar + legend; the shared hover-link tooltip is bespoke — no shared primitive reproduces the cross-segment/legend linkage —
		* styled through the shared `--dsw-alias-*` tokens. On mount the segments and the free track grow open
		* left to right (stackedBar.css, staggered by the capped per-piece `--lc-i` slots below, so a long DNA
		* band list settles fast); the reserve band stays unanimated.
		*/
		/**
		* Mirror of dsh-compaction-basic's default `thresholdRatio` (0.8): it compacts at step boundaries once `floor(contextWindow × ratio)` is
		* reached; DSH does not publish the configured ratio to plugins/clients, so the reserve band mirrors the default — deployments tuning
		* `thresholdRatio`/`modelPolicies` should adjust it to match.
		*/
		const AUTO_COMPACT_RATIO = .8;
		/**
		* Entrance stagger cap: the browser's DNA bands can list dozens of items, so the grow-in cascade stops
		* widening after this many slots and late bands simply join within the cap (stackedBar.css delays by
		* `--lc-i`); the composition bar's few category segments never reach it.
		*/
		const STAGGER_CAP = 8;
		function makeStackedBar(kit) {
			const { t, fmt, catLabel } = kit;
			return function StackedBar(props) {
				const [reserveOn, setReserveOn] = (0, react.useState)(false);
				let total = 0;
				for (const p of props.parts) total += p.value;
				const scale = props.max !== void 0 && props.max > total ? props.max : total;
				const free = props.max !== void 0 && props.max > total ? props.max - total : 0;
				const usedPct = scale > 0 ? total / scale * 100 : 0;
				const hovering = props.hoverKey !== null && props.hoverKey !== void 0;
				const showBox = free > 0 && hovering;
				const pickKey = props.onPickKey;
				const minBand = props.minBand !== void 0 && props.minBand > 0 ? props.minBand : 0;
				const visible = total > 0 ? props.parts.filter((p) => p.value > 0) : [];
				const widths = (() => {
					if (minBand === 0 || visible.length < 2) return visible.map((p) => p.value / scale * 100);
					const shares = visible.map((p) => p.value / total * 100);
					const floor = Math.min(minBand, 100 / visible.length);
					let pinned = 0;
					let pinnedRaw = 0;
					for (const s of shares) if (s < floor) {
						pinned += 1;
						pinnedRaw += s;
					}
					if (pinned === 0) return visible.map((p) => p.value / scale * 100);
					const restRoom = 100 - pinned * floor;
					const restRaw = 100 - pinnedRaw;
					return shares.map((s) => (s < floor ? floor : s * restRoom / restRaw) * total / scale);
				})();
				const reserve = props.reserve !== void 0 && props.max !== void 0 && props.max > 0 ? {
					...props.reserve,
					max: props.max
				} : null;
				const reserveLeft = reserve !== null ? Math.round(reserve.max * reserve.ratio / scale * 1e3) / 10 : 0;
				const reserveWidth = reserve !== null ? Math.round((1 - reserve.ratio) * reserve.max / scale * 1e3) / 10 : 0;
				let tip = null;
				if (reserveOn && reserve !== null) tip = {
					text: reserve.label,
					leftPct: Math.max(12, Math.min(reserveLeft + reserveWidth / 2, 88))
				};
				else if (props.hoverKey !== null && props.hoverKey !== void 0) {
					if (props.hoverKey === "free" && free > 0) {
						const pct = scale > 0 ? free / scale * 100 : 0;
						tip = {
							text: `${t("overview.free")} ${fmt(free)} (${Math.round(pct)}%)`,
							leftPct: Math.max(12, Math.min(total / scale * 100 + pct / 2, 88))
						};
					} else {
						let acc = 0;
						let rawTotal = 0;
						for (const p of props.parts) rawTotal += p.raw ?? p.value;
						for (let i = 0; i < visible.length; i++) {
							const p = visible[i];
							if (p.key === props.hoverKey) {
								const count = p.raw ?? p.value;
								tip = {
									text: `${p.label ?? catLabel(p.key)} ≈${fmt(count)} (${rawTotal > 0 ? Math.round(count / rawTotal * 100) : 0}%) ` + t("overview.ofUsed"),
									leftPct: Math.max(12, Math.min(acc + widths[i] / 2, 88))
								};
								break;
							}
							acc += widths[i];
						}
					}
				}
				return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "lc-stacked-wrap",
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "lc-stacked" + (hovering ? " lc-stacked-dim" : ""),
						style: { height: `${props.height || 14}px` },
						onMouseLeave: () => {
							if (props.onHoverKey !== void 0) props.onHoverKey(null);
							setReserveOn(false);
						},
						children: [
							visible.map((p, i) => {
								const on = props.hoverKey !== void 0 && (props.hoverKey === p.key || p.group !== void 0 && props.hoverKey === p.group);
								return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: "lc-stacked-seg animate-lc-stacked-in motion-reduce:animate-none" + (on ? " lc-stacked-seg-on" : "") + (pickKey !== void 0 ? " lc-stacked-seg-pick" : ""),
									style: {
										width: `${widths[i]}%`,
										backgroundColor: p.color,
										"--lc-i": Math.min(i, STAGGER_CAP)
									},
									onMouseEnter: () => {
										if (props.onHoverKey !== void 0) props.onHoverKey(p.key);
									},
									onClick: pickKey !== void 0 ? () => {
										pickKey(p.key);
									} : void 0
								}, p.key);
							}),
							free > 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: "lc-stacked-free animate-lc-stacked-in motion-reduce:animate-none" + (props.hoverKey === "free" ? " lc-stacked-free-on" : ""),
								style: {
									width: `${free / scale * 100}%`,
									"--lc-i": Math.min(visible.length, 9)
								},
								onMouseEnter: () => {
									if (props.onHoverKey !== void 0) props.onHoverKey("free");
								}
							}, "free") : null,
							reserve !== null ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: "lc-reserve",
								style: {
									left: `${reserveLeft}%`,
									width: `${reserveWidth}%`
								},
								onMouseEnter: () => {
									setReserveOn(true);
									if (props.onHoverKey !== void 0) props.onHoverKey(null);
								},
								onMouseLeave: () => {
									setReserveOn(false);
								}
							}) : null,
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: "lc-occupied-box" + (showBox ? " lc-occupied-box-on" : ""),
								style: { width: `${usedPct}%` }
							})
						]
					}), props.tip !== false ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "lc-tip lc-bar-tip" + (tip ? " lc-bar-tip-on" : ""),
						style: { left: tip ? `${tip.leftPct}%` : "50%" },
						children: tip ? tip.text : ""
					}) : null]
				});
			};
		}
		function makeLegend(kit) {
			const { t, fmt, catLabel } = kit;
			return function Legend(props) {
				let total = 0;
				for (const p of props.parts) total += p.raw ?? p.value;
				return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "lc-legend",
					children: props.parts.map((p) => {
						const count = p.raw ?? p.value;
						const on = props.hoverKey !== void 0 && props.hoverKey === p.key;
						return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
							className: "lc-chip" + (on ? " lc-chip-on" : ""),
							title: t("overview.ofUsed"),
							onMouseEnter: () => {
								if (props.onHoverKey !== void 0) props.onHoverKey(p.key);
							},
							onMouseLeave: () => {
								if (props.onHoverKey !== void 0) props.onHoverKey(null);
							},
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", { style: { background: p.color } }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "lc-chip-label",
									children: catLabel(p.key)
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
									className: "lc-chip-nums",
									children: ["≈" + fmt(count), total > 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("em", { children: `${Math.round(count / total * 100)}%` }) : null]
								})
							]
						}, p.key);
					})
				});
			};
		}
		//#endregion
		//#region src/client/components/currentComposition.tsx
		function makeCurrentComposition(kit, StackedBar, Legend) {
			const { t, fmt } = kit;
			return function CurrentComposition(props) {
				const head = props.head;
				const reserve = head.window != null && head.window > 0 ? {
					ratio: AUTO_COMPACT_RATIO,
					label: t("overview.compactReserve", { pct: Math.round(AUTO_COMPACT_RATIO * 100) })
				} : void 0;
				return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "lc-card",
					"data-lc-current": true,
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "lc-card-title",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "lc-card-title-text",
								children: t("overview.title")
							}), props.subtitle !== void 0 && props.subtitle !== "" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "lc-card-sub",
								children: props.subtitle
							}) : null]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "lc-overview-num",
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: fmt(head.tokens) }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: head.window ? " / " + fmt(head.window) + " tokens" : " " + t("overview.estimate") }),
								head.pct !== null ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
									className: "lc-overview-pct",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: `${head.pct}%` }), t("overview.used")]
								}) : null
							]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(StackedBar, {
							parts: head.parts,
							height: 16,
							max: head.window,
							hoverKey: props.hoverKey,
							onHoverKey: props.onHoverKey,
							reserve
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Legend, {
							parts: head.parts,
							hoverKey: props.hoverKey,
							onHoverKey: props.onHoverKey
						})
					]
				});
			};
		}
		//#endregion
		//#region src/client/components/errorBoundary.tsx
		/**
		* ErrorBoundary — the tab's no-white-screen guarantee: a render error in the subtree degrades to a styled error card instead of
		* propagating
		* into the harness's slot renderer and unmounting the conversation view. Class component: the only React primitive that can catch a
		* subtree's render errors (no hook-based boundary in React 18); Retry resets the boundary and a healthy value resumes.
		*/
		function makeErrorBoundary(t) {
			return class ErrorBoundary extends react.Component {
				constructor(props) {
					super(props);
					this.state = { error: null };
				}
				static getDerivedStateFromError(error) {
					return { error: error instanceof Error ? error : new Error(String(error)) };
				}
				render() {
					const error = this.state.error;
					if (error === null) return this.props.children;
					return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "lc-root",
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "lc-empty lc-error",
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("error") }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("code", {
									className: "lc-error-msg",
									children: error.message
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: "lc-error-retry hover:border-(--dsw-alias-label-primary)",
									onClick: () => {
										this.setState({ error: null });
									},
									children: t("error.retry")
								})
							]
						})
					});
				}
			};
		}
		//#endregion
		//#region src/client/components/escapeClose.ts
		/**
		* The shared Escape-to-close contract of the plugin's overlays (the /context
		* modal and the baseline-gate dialog): capture-phase keydown on window, so
		* the composer's own key handling never swallows Escape first; on close, focus
		* returns to the element that held it when the overlay opened (skipped when
		* that element left the document).
		*/
		/**
		* Close on Escape while `active`; restores the pre-open focus on cleanup.
		* `onClose` rides a latest-ref so the subscription lives on the `active`
		* transitions alone: every caller passes a render-fresh closure, and a
		* per-render resubscribe would rerun the cleanup's focus restore — yanking
		* focus out of the overlay's own inputs on every keystroke.
		*/
		function useEscapeClose(active, onClose) {
			const close = (0, react.useRef)(onClose);
			close.current = onClose;
			(0, react.useEffect)(() => {
				if (!active) return void 0;
				const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
				const onKey = (ev) => {
					if (ev.key !== "Escape") return;
					ev.preventDefault();
					ev.stopPropagation();
					close.current();
				};
				window.addEventListener("keydown", onKey, true);
				return () => {
					window.removeEventListener("keydown", onKey, true);
					if (previous !== null && document.contains(previous)) previous.focus();
				};
			}, [active]);
		}
		//#endregion
		//#region src/client/components/contextModal.tsx
		/**
		* The /context command's centered dialog — the same data as the Context tab (the pushed `contextTimeline` projection) distilled to the
		* current-composition overview and the shared Context browser; rendered from the `conversation.input.overlay` slot and opened/closed
		* through the per-session modal store, so the trigger flips it and no message ever enters session history.
		*/
		function makeContextModal(ctx, kit, settings) {
			const { t } = kit;
			const StackedBar = makeStackedBar(kit);
			const CurrentComposition = makeCurrentComposition(kit, StackedBar, makeLegend(kit));
			const ContextBrowser = makeContextBrowser(kit, StackedBar, settings);
			const ErrorBoundary = makeErrorBoundary(t);
			function ContextModalBody(props) {
				const sessionId = typeof props.sessionId === "string" ? props.sessionId : "";
				const open = typeof props.useContextModal === "function" ? props.useContextModal((s) => s) : false;
				const source = useTimelineSource(ctx, props);
				const data = source.data;
				const pressure = projectionOf(props, "contextPressure", contextPressureOf);
				const breakdown = projectionOf(props, "contextBreakdown", contextBreakdownOf);
				const headers = projectionOf(props, "contextHeaders", headersOf);
				const convNodes = conversationNodesOf(props);
				const [hoverCat, setHoverCat] = (0, react.useState)(null);
				const [dockLeft, setDockLeft] = (0, react.useState)(0);
				const backdropRef = (0, react.useRef)(null);
				const loadImage = (0, react.useMemo)(() => imageLoaderOf(ctx, sessionId !== "" ? sessionId : void 0), [ctx, sessionId]);
				const historyFace = useHistoryFace();
				const fetchContent = (0, react.useMemo)(() => sessionId !== "" && historyFace !== void 0 ? makeContentFetcher(sessionId) : void 0, [sessionId, historyFace]);
				const fetchHeader = (0, react.useMemo)(() => sessionId !== "" && historyFace !== void 0 ? makeHeaderFetcher(sessionId) : void 0, [sessionId, historyFace]);
				const close = (0, react.useCallback)(() => {
					if (sessionId === "") return;
					modalStoreOf(sessionId).set(false);
					const guard = takePendingConsume(sessionId);
					const sessions = ctx.get("sessions");
					if (guard === void 0 || sessions === void 0) return;
					const scope = sessions.scope(sessionId);
					if (scope !== void 0) scope.bail(scope, "slash/input-consume-token", { guard });
				}, [ctx, sessionId]);
				useEscapeClose(open, close);
				(0, react.useLayoutEffect)(() => {
					if (!open) return void 0;
					const dock = measureDock(backdropRef.current);
					setDockLeft(dock.left);
					if (dock.frame === null) return void 0;
					const observer = new MutationObserver(() => {
						setDockLeft(measureDock(backdropRef.current).left);
					});
					observer.observe(dock.frame, {
						attributes: true,
						attributeFilter: ["style"]
					});
					return () => {
						observer.disconnect();
					};
				}, [open]);
				if (!open) return null;
				const head = data !== null ? headlineOf(data, pressure, breakdown) : null;
				const subtitle = data !== null ? (data.model ? data.model : "") + (data.provider ? " · " + data.provider : "") : "";
				return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					ref: backdropRef,
					className: "lc-modal-backdrop",
					style: { left: dockLeft },
					onClick: close,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "lc-modal-card",
						onClick: (ev) => {
							ev.stopPropagation();
						},
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "lc-modal-head",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "lc-modal-title",
								children: t("tab")
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								className: "lc-modal-close hover:text-(--dsw-alias-label-primary) hover:bg-(--dsw-alias-bg-layer-2)",
								"aria-label": t("cmd.close"),
								onClick: close,
								children: "×"
							})]
						}), data === null || head === null ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "lc-empty",
							children: t("loading")
						}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(CurrentComposition, {
							head,
							subtitle,
							hoverKey: hoverCat,
							onHoverKey: setHoverCat
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ContextBrowser, {
							data,
							headers,
							convNodes,
							fetchContent,
							fetchHeader,
							loadImage,
							hoverKey: hoverCat,
							onHoverKey: setHoverCat,
							detailState: source.detailState,
							onDetailRetry: source.retryDetail
						})] })]
					})
				});
			}
			return function ContextModal(props) {
				return (0, react.createElement)(ErrorBoundary, null, (0, react.createElement)(ContextModalBody, props));
			};
		}
		//#endregion
		//#region src/client/overviewStore.ts
		function createStore() {
			let open = false;
			const listeners = /* @__PURE__ */ new Set();
			return {
				subscribe: (listener) => {
					listeners.add(listener);
					return () => {
						listeners.delete(listener);
					};
				},
				getSnapshot: () => open,
				set: (next) => {
					if (next === open) return;
					open = next;
					for (const listener of listeners) listener();
				}
			};
		}
		const overviewStore = createStore();
		//#endregion
		//#region src/client/components/overviewButton.tsx
		/**
		* The Context Dashboard's sidebar entry: a footer action stacked directly
		* above Settings (the harness's own foot layout: footer actions, then the
		* settings row), mirroring the Settings trigger's geometry in both column
		* widths. The button carries the plugin emblem and, on the wide
		* column, its label. Clicking opens the overview overlay through the shared
		* module store (overviewStore.ts).
		*
		* The per-user `insightsEntry` preference takes the entry down (renders
		* null) without unregistering the seat. The subscription fails open: an
		* absent settings store, an unserved namespace, or a value the plugin
		* cannot understand all leave the entry visible.
		*/
		/** Stable subscription faces for the settings-less degrade (no re-subscribes). */
		const subscribeNever = () => () => {};
		const entryShown = () => "show";
		function makeOverviewButton(kit, settings) {
			const { t } = kit;
			const subscribeEntry = settings === void 0 ? subscribeNever : (listener) => settings.store.subscribe(listener);
			const getEntry = settings === void 0 ? entryShown : () => settings.insightsEntry();
			return function OverviewButton(props) {
				if ((0, react.useSyncExternalStore)(subscribeEntry, getEntry) === "hide") return null;
				return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
					type: "button",
					className: props.wide === true ? "lc-ov-entry" : "lc-ov-entry lc-ov-entry-rail",
					title: t("ov.entry"),
					"aria-label": t("ov.entry"),
					onClick: () => {
						overviewStore.set(true);
					},
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ContextIcon, {
						size: props.wide === true ? 16 : 18,
						className: "lc-ov-entry-icon"
					}), props.wide === true && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "lc-ov-entry-label",
						children: t("ov.entry")
					})]
				});
			};
		}
		//#endregion
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
		//#region src/client/cost.ts
		/** 1 CNY = 0.15 USD — the fixed CNY-display conversion rate. */
		const USD_PER_CNY = .15;
		/** DeepSeek's peak rates are twice the off-peak rates (the official list). */
		const PEAK_FACTOR = 2;
		/** A USD amount in the display currency (CNY divides the fixed rate). */
		function toCurrency(usd, currency) {
			return currency === "cny" ? usd / USD_PER_CNY : usd;
		}
		/** One rate triple at the doubled peak rate (the tooltip's `peak | off` pair). */
		function peakOf(rate) {
			return {
				hit: rate.hit * PEAK_FACTOR,
				miss: rate.miss * PEAK_FACTOR,
				write: rate.write * PEAK_FACTOR,
				out: rate.out * PEAK_FACTOR
			};
		}
		/** One book branch (a provider's models), as far as runtime can prove it. */
		function branchOf(book, id) {
			const v = book[id];
			return v !== null && typeof v === "object" ? v : null;
		}
		/**
		* One branch's model id → rates, as far as runtime can prove it: exact own
		* key first (the book is untrusted wire data), then case-insensitively, then
		* by id SUFFIX — dsh spells some models short (`k3`) where the registry
		* namespaces them (`kimi-k3`). Several suffix candidates (e.g. `k3` vs a
		* hypothetical `other-k3`) are ambiguous and price nothing.
		*/
		function lookup(models, model) {
			if (Object.hasOwn(models, model)) return models[model];
			const m = model.toLowerCase();
			let found = null;
			let seen = null;
			for (const id in models) {
				const lower = id.toLowerCase();
				if (lower !== m && !lower.endsWith("-" + m)) continue;
				if (seen !== null && seen !== lower) return null;
				seen = lower;
				found = models[id];
			}
			return found;
		}
		/**
		* The book's rates for one folded (provider, model) bucket, or null when
		* the book cannot price it: the dsh provider id resolves through
		* modelsDevProviderOf (unmapped ids pass through) and prices by model id —
		* exact, case-insensitive, or suffix; a provider the book does not carry
		* falls back to a cross-provider scan, priced only when exactly one branch
		* carries the model id.
		*/
		function priceOf(prices, provider, model) {
			if (prices === null || prices === void 0) return null;
			const direct = branchOf(prices, modelsDevProviderOf(provider));
			if (direct !== null) return lookup(direct, model);
			let found = null;
			for (const models of Object.values(prices)) {
				const rate = lookup(models, model);
				if (rate === null) continue;
				if (found !== null) return null;
				found = rate;
			}
			return found;
		}
		/**
		* Price the session's cumulative billed-token totals. Cache reads bill at
		* the hit rate, uncached input at the miss rate, cache writes at the write
		* rate, output (reasoning included) at the out rate; `peak` buckets price
		* at twice the book rate for DeepSeek (the book lists that provider's
		* off-peak rates — the Host splits the period-based list at fold time).
		* Null when nothing was priced (no usage folded, no book yet, or no model
		* the book prices), so the cell can show a dash.
		*/
		function estimateSessionCost(usage, prices, currency) {
			if (usage === null || usage === void 0 || prices === null || prices === void 0) return null;
			let total = 0;
			let any = false;
			for (const provider of Object.keys(usage)) {
				const models = asRecord(usage[provider]);
				if (models === null) continue;
				const deepseek = isDeepSeekProvider(provider);
				for (const model of Object.keys(models)) {
					const rate = priceOf(prices, provider, model);
					const periods = asRecord(models[model]);
					if (rate === null || periods === null) continue;
					for (const period of ["peak", "off"]) {
						const bucket = asRecord(periods[period]);
						if (bucket === null) continue;
						const price = (numOf(bucket.cacheRead) * rate.hit + numOf(bucket.uncached) * rate.miss + numOf(bucket.cacheWrite) * rate.write + numOf(bucket.output) * rate.out) / 1e6;
						total += deepseek && period === "peak" ? price * PEAK_FACTOR : price;
						any = true;
					}
				}
			}
			return any ? toCurrency(total, currency) : null;
		}
		/**
		* Accumulate one usage's buckets into `out`, summing per (provider, model,
		* period). Hostile branches skip (the same re-proving the estimator applies
		* — the merge is a boundary too); true when any bucket record merged, even
		* an all-zero one (the estimator prices it as $0, never a dash).
		*/
		function mergeInto(out, usage) {
			if (usage === null || usage === void 0) return false;
			let any = false;
			for (const provider of Object.keys(usage)) {
				const models = asRecord(usage[provider]);
				if (models === null || Array.isArray(models)) continue;
				const branch = out[provider] ?? (out[provider] = {});
				for (const model of Object.keys(models)) {
					const periods = asRecord(models[model]);
					if (periods === null || Array.isArray(periods)) continue;
					const target = branch[model] ?? (branch[model] = {});
					for (const period of ["peak", "off"]) {
						const bucket = asRecord(periods[period]);
						if (bucket === null || Array.isArray(bucket)) continue;
						const prev = target[period] ?? {
							uncached: 0,
							cacheRead: 0,
							cacheWrite: 0,
							output: 0
						};
						target[period] = {
							uncached: prev.uncached + numOf(bucket.uncached),
							cacheRead: prev.cacheRead + numOf(bucket.cacheRead),
							cacheWrite: prev.cacheWrite + numOf(bucket.cacheWrite),
							output: prev.output + numOf(bucket.output)
						};
						any = true;
					}
				}
			}
			return any;
		}
		/**
		* Deep-merge session-cost usages into one — the stats board's total-cost
		* scope (the current agent's usage plus every subagent session's) and the
		* subagent fold's accumulation. Null when NO side carried a bucket record,
		* so the caller keeps its dash.
		*/
		function mergeCostUsage(...usages) {
			const out = {};
			let any = false;
			for (const usage of usages) if (mergeInto(out, usage)) any = true;
			return any ? out : null;
		}
		function formatCost(amount, currency) {
			return (currency === "cny" ? "¥" : "$") + (amount >= 1 ? amount.toFixed(2) : amount.toPrecision(2));
		}
		/** Price-list figure: the same money format as formatCost, trailing zeros trimmed (¥3.00 → ¥3, $0.0070 → $0.007). */
		function formatPriceRate(amount, currency) {
			return formatCost(amount, currency).replace(/0+$/, "").replace(/\.$/, "");
		}
		//#endregion
		//#region node_modules/.pnpm/@opencode-ai+models@0.0.72/node_modules/@opencode-ai/models/dist/error.js
		/**
		* The only error thrown by the models.dev client.
		*
		* - `Transport` — the fetch itself failed (network, DNS, abort). `cause` is the underlying error.
		* - `UnexpectedStatus` — non-2xx response. `cause` is `{ status: number }`.
		* - `MalformedResponse` — the body was empty or not valid JSON. `cause` is the parse error, if any.
		*/
		var ModelsDevError = class extends Error {
			reason;
			name = "ModelsDevError";
			constructor(reason, options) {
				super(reason, options);
				this.reason = reason;
			}
		};
		//#endregion
		//#region node_modules/.pnpm/@opencode-ai+models@0.0.72/node_modules/@opencode-ai/models/dist/client.js
		/**
		* Creates a stateless models.dev client. Every method performs exactly one
		* `GET` and nothing is ever cached — callers who want caching should wrap
		* calls with their own policy. For a no-network alternative, see the
		* `@opencode-ai/models/snapshot` entrypoint.
		*/
		function make(options = {}) {
			const baseUrl = options.baseUrl ?? "https://models.dev";
			const base = baseUrl.endsWith("/") ? baseUrl : baseUrl + "/";
			const request = async (path, requestOptions) => {
				const fetch = options.fetch ?? globalThis.fetch;
				const headers = new Headers();
				for (const [key, value] of new Headers(options.headers)) headers.set(key, value);
				for (const [key, value] of new Headers(requestOptions?.headers)) headers.set(key, value);
				let response;
				try {
					response = await fetch(new URL(path, base), {
						method: "GET",
						headers,
						signal: requestOptions?.signal
					});
				} catch (cause) {
					throw new ModelsDevError("Transport", { cause });
				}
				if (!response.ok) {
					try {
						await response.body?.cancel();
					} catch {}
					throw new ModelsDevError("UnexpectedStatus", { cause: { status: response.status } });
				}
				let text;
				try {
					text = await response.text();
				} catch (cause) {
					throw new ModelsDevError("Transport", { cause });
				}
				if (text === "") throw new ModelsDevError("MalformedResponse");
				try {
					return JSON.parse(text);
				} catch (cause) {
					throw new ModelsDevError("MalformedResponse", { cause });
				}
			};
			return {
				/** All providers with their models, pricing, and limits (`/api.json`). */
				providers: (requestOptions) => request("api.json", requestOptions),
				/** Provider-agnostic model metadata (`/models.json`). */
				models: (requestOptions) => request("models.json", requestOptions),
				/** Providers and model metadata in a single request (`/catalog.json`). */
				catalog: (requestOptions) => request("catalog.json", requestOptions)
			};
		}
		//#endregion
		//#region src/client/modelPrices.ts
		/**
		* The client's model-price book (client/cost.ts prices from it): the
		* models.dev registry, fetched through the official @opencode-ai/models
		* SDK. The registry payload is untrusted wire input, so `pricesBookOf`
		* re-proves every field at the boundary — a non-conforming provider/model/
		* cost entry drops whole. The book keeps EVERY provider that prices (keyed
		* by the registry's own provider id), so a dsh provider id outside the
		* rename table still prices by direct passthrough. One fetch per page load,
		* kicked on first subscribe; a failure degrades to a visible state the cost
		* cell notes, with a backed-off automatic retry — never a spinner, and
		* never an unhandled rejection.
		*/
		/** One finite non-negative registry figure, or null. */
		function rateOf(value) {
			return typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : null;
		}
		/**
		* Extract the whole registry's per-model USD rates from a delivered
		* providers payload (`/api.json`), keyed by the registry's provider ids.
		* Any shape failure skips just that entry; a payload that is not a record
		* at all returns null (the store treats it as a failed fetch and retries).
		*/
		function pricesBookOf(value) {
			const data = asRecord(value);
			if (data === null || Array.isArray(data)) return null;
			const book = {};
			for (const providerId of Object.keys(data)) {
				const provider = asRecord(data[providerId]);
				const modelList = provider !== null ? asRecord(provider.models) : null;
				if (modelList === null) continue;
				const models = {};
				for (const id of Object.keys(modelList)) {
					const model = asRecord(modelList[id]);
					const cost = model !== null ? asRecord(model.cost) : null;
					if (cost === null) continue;
					const miss = rateOf(cost.input);
					const out = rateOf(cost.output);
					if (miss === null || out === null) continue;
					models[id] = {
						hit: rateOf(cost.cache_read) ?? miss,
						miss,
						write: rateOf(cost.cache_write) ?? miss,
						out
					};
				}
				if (Object.keys(models).length > 0) book[providerId] = models;
			}
			return book;
		}
		const defaultLoader = () => make().providers();
		/** The retry backoff base; each consecutive failure doubles the wait, capped at 3 doublings. */
		const RETRY_BASE_MS = 3e4;
		let loader = defaultLoader;
		let snap = {
			prices: null,
			failed: false
		};
		let inFlight = false;
		let failures = 0;
		let timer = null;
		const listeners = /* @__PURE__ */ new Set();
		function fail() {
			snap = {
				...snap,
				failed: true
			};
			failures++;
			timer = setTimeout(() => {
				timer = null;
				fire();
			}, RETRY_BASE_MS * 2 ** Math.min(failures - 1, 3));
		}
		async function fire() {
			inFlight = true;
			try {
				const book = pricesBookOf(await loader());
				if (book !== null) {
					snap = {
						prices: book,
						failed: false
					};
					failures = 0;
				} else fail();
			} catch {
				fail();
			}
			inFlight = false;
			for (const fn of listeners) fn();
		}
		function kick() {
			if (snap.prices !== null || inFlight || timer !== null) return;
			fire();
		}
		/** The useSyncExternalStore seam: subscribing also kicks the first fetch. */
		const subscribeModelPrices = (fn) => {
			listeners.add(fn);
			kick();
			return () => {
				listeners.delete(fn);
			};
		};
		const getModelPricesSnap = () => snap;
		/** The stats board's read of the price book (null until the fetch lands). */
		function useModelPrices() {
			return (0, react.useSyncExternalStore)(subscribeModelPrices, getModelPricesSnap);
		}
		//#endregion
		//#region src/client/balance.ts
		const BALANCE_ROUTE = "/api/dsh-context/balance";
		/** How long a settled answer (including a `null`) serves identical reads. */
		const TTL_MS$1 = 6e4;
		/** One platform amount ('110.00', or an already-numeric producer variant), or null. */
		function amountOf(value) {
			const n = typeof value === "string" ? Number(value) : value;
			return typeof n === "number" && Number.isFinite(n) && n >= 0 ? n : null;
		}
		/**
		* Narrow the delivered payload to a render-safe value (the same boundary
		* rigor as `timelineOf`): each entry's currency and amounts re-proved, an
		* entry failing the shape drops whole, and a payload with no valid entry is
		* no balance — the caller renders nothing rather than half a figure.
		*/
		function platformBalanceOf(value) {
			const data = asRecord(value);
			if (data === null) return null;
			const infos = Array.isArray(data.balances) ? data.balances : [];
			const balances = [];
			for (const info of infos) try {
				const entry = asRecord(info);
				if (entry === null) continue;
				const currency = entry.currency;
				const total = amountOf(entry.total);
				const granted = amountOf(entry.granted);
				const toppedUp = amountOf(entry.toppedUp);
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
				isAvailable: data.isAvailable === true,
				balances
			} : null;
		}
		/**
		* The entry matching the display currency (zh → CNY, en → USD), falling back
		* to the account's first entry when the platform reports none in it — a
		* number in the account's own currency beats no number.
		*/
		function balanceEntryOf(balance, currency) {
			if (balance === null || balance === void 0 || balance.balances.length === 0) return null;
			const want = currency === "cny" ? "CNY" : "USD";
			return balance.balances.find((entry) => entry.currency === want) ?? balance.balances[0];
		}
		let cached$1 = null;
		/**
		* The capsule's read: one route POST, narrowed through
		* `platformBalanceOf`, deduplicated in flight, TTL-cached. Never rejects.
		*/
		function fetchPlatformBalance() {
			if (cached$1 !== null && Date.now() - cached$1.at < TTL_MS$1) return cached$1.promise;
			const at = Date.now();
			const promise = (async () => {
				try {
					const response = await fetch(BALANCE_ROUTE, {
						method: "POST",
						headers: { "content-type": "application/json" }
					});
					if (!response.ok) return null;
					const r = asRecord(await response.json());
					if (r === null || r.ok !== true || r.value === null || r.value === void 0) return null;
					return platformBalanceOf(r.value);
				} catch {
					return null;
				}
			})();
			cached$1 = {
				at,
				promise
			};
			return promise;
		}
		//#endregion
		//#region node_modules/.pnpm/@deepseek-ai+dsh-util-works_eb41412f5320dadc9f93fd95ecbef98b/node_modules/@deepseek-ai/dsh-util-workspace-path/lib/index.js
		/**
		* The `dsh-resource://file/…` address grammar: how a file is named across the
		* Sidebar and the resource model, built and parsed without touching a
		* filesystem.
		* @module
		*/
		/** The scheme and type every file address opens with. */
		const FILE_ADDRESS_PREFIX = "dsh-resource://file/";
		/** Component-encode one id or path segment, keeping `:` literal for drive letters. */
		function encodeSegment(segment) {
			return encodeURIComponent(segment).replace(/%3A/gi, ":");
		}
		/** Encode a `/`-separated path segment by segment. */
		function encodePath(path) {
			return path.split("/").map(encodeSegment).join("/");
		}
		/**
		* Build the address of a file read through one Session.
		* @param sessionId - the Session whose Host workspace resolves the path.
		* @param path - absolute or workspace-relative path; backslashes are normalized to `/`, and leading `./` prefixes are dropped.
		* @returns the `dsh-resource://file/session/<sessionId>/<path>` address.
		*/
		function sessionFileAddress(sessionId, path) {
			const normalized = path.replace(/\\/g, "/").replace(/^(?:\.\/)+/, "");
			return `${FILE_ADDRESS_PREFIX}session/${encodeSegment(sessionId)}/${encodePath(normalized)}`;
		}
		/**
		* Browser-safe Workspace path and display helpers.
		* @module @deepseek-ai/dsh-util-workspace-path
		*/
		/** Whether a path uses a Windows drive or UNC prefix. */
		function isWindowsStylePath(value) {
			return /^[A-Za-z]:[/\\]/.test(value) || value.startsWith("\\\\");
		}
		/**
		* Whether a path is absolute in either spelling the Host accepts: POSIX (`/a/b`) or Windows drive or UNC.
		* @param path - the path to classify.
		* @returns `true` for an absolute path; `false` for a Workspace-relative one.
		*/
		function isAbsoluteWorkspacePath(path) {
			return path.startsWith("/") || isWindowsStylePath(path);
		}
		/**
		* Read the final non-empty segment of a Workspace path for display.
		* Workspace-label surfaces use this helper instead of deriving another basename.
		* @param path - Workspace directory path using POSIX or Windows separators.
		* @returns the final segment, or an empty string for a separator-only path.
		*/
		function workspaceTitleOf(path) {
			const trimmed = path.replace(/[/\\]+$/, "");
			const separator = Math.max(trimmed.lastIndexOf("/"), trimmed.lastIndexOf("\\"));
			return trimmed.slice(separator + 1);
		}
		/**
		* The address for a path as a caller holds it: a relative path, or an absolute
		* path inside the Session's workspace, becomes a `session`-scoped address; an
		* absolute path outside it, or one whose workspace root is unknown, keeps its
		* absolute path in that Session's address.
		* @param sessionId - the Session the path is read in.
		* @param cwd - that Session's workspace root, when known.
		* @param path - absolute or workspace-relative path, in either separator spelling.
		* @returns the `dsh-resource://file/…` address.
		*/
		function fileAddressFor(sessionId, cwd, path) {
			const normalized = path.replace(/\\/g, "/");
			if (!isAbsoluteWorkspacePath(normalized)) return sessionFileAddress(sessionId, normalized);
			const root = cwd === void 0 ? "" : cwd.replace(/\\/g, "/").replace(/\/+$/, "");
			if (root !== "" && normalized === root) return sessionFileAddress(sessionId, "");
			if (root !== "" && normalized.startsWith(`${root}/`)) return sessionFileAddress(sessionId, normalized.slice(root.length + 1));
			return sessionFileAddress(sessionId, normalized);
		}
		//#endregion
		//#region src/client/overview.ts
		/**
		* The Context Dashboard's data layer: everything the panel renders is derived
		* here, off the root-scope `useSessions` standard prop. Each session-list
		* row carries the host-cached projection values — this plugin's
		* `contextTimeline` (composition, counts, cost) and `contextActivity` (the
		* daily ledger) — so the overview joins every session's insight WITHOUT
		* opening a single session log.
		*
		* The list is harness data (untrusted at the boundary): the snapshot is
		* re-proved field by field, every projection value passes its services.ts
		* sanitizer, and each row's derivation is isolated — one hostile row drops
		* to a metadata-only card or out of the list, never an error card. All
		* functions here are pure (the hook-level read lives in
		* {@link sessionsSnapshotOf}), so the panel's rendering stays a trivial map.
		*/
		/**
		* The `useSessions` standard prop read, hook-safe and hostility-proof: the
		* seat must be a function (absent = a harness without the sessions service —
		* the panel renders its unavailable note), and a throwing seat/snapshot
		* reads as null. Called unconditionally at the top of the panel component
		* (the seat is a real hook; the identity selector keeps the raw snapshot so
		* the pure {@link rowsOfSnapshot} derivation can ride useMemo).
		*/
		function sessionsSnapshotOf(props) {
			const useSessions = props.useSessions;
			if (typeof useSessions !== "function") return null;
			try {
				return useSessions((snapshot) => snapshot);
			} catch {
				return null;
			}
		}
		/**
		* The `useWorkspaces` standard prop read — same guarded-hook contract as
		* {@link sessionsSnapshotOf}. The overview joins its session → workspace
		* grouping off this snapshot for the cards' breadcrumb row.
		*/
		function workspacesSnapshotOf(props) {
			const useWorkspaces = props.useWorkspaces;
			if (typeof useWorkspaces !== "function") return null;
			try {
				return useWorkspaces((snapshot) => snapshot);
			} catch {
				return null;
			}
		}
		/**
		* Session id → workspace title, projected off the workspaces snapshot (the
		* registry's own membership lists, not path guessing). Null when the
		* snapshot is unusable — the breadcrumb then shows the project name alone.
		* A session no workspace claims simply has no crumb group (the workspace
		* browser's "Ungrouped" bucket is a container, not a name to print).
		*/
		function sessionGroupsOf(snapshot) {
			const state = asRecord(snapshot);
			if (state === null || !Array.isArray(state.items)) return null;
			const groups = {};
			const claimed = groups;
			for (const item of state.items) {
				const workspace = asRecord(item);
				if (workspace === null) continue;
				const title = typeof workspace.title === "string" && workspace.title !== "" ? workspace.title : void 0;
				if (title === void 0 || !Array.isArray(workspace.sessionIds)) continue;
				for (const id of workspace.sessionIds) if (typeof id === "string" && claimed[id] === void 0) groups[id] = title;
			}
			return groups;
		}
		/** The card's project name: the workspace browser's own basename derivation (both separators). */
		function projectOf(cwd) {
			if (cwd === void 0 || cwd === "") return void 0;
			const title = workspaceTitleOf(cwd);
			return title === "" ? void 0 : title;
		}
		/** The group-filter chip key of the ungrouped bucket (a title can never collide — the registry dedupes names). */
		const UNGROUPED_KEY = "__ungrouped__";
		/**
		* The group chips' counts, in workspace-registry order with the ungrouped
		* bucket last, computed over the ALREADY scoped rows (range/day/query
		* applied) so the chips mirror the scope the user set. Groups with no row
		* in scope drop out (a chip that can yield no card is noise); the panel
		* keeps a vanished selection's chip alive itself.
		*/
		function groupCountsOf(rows, snapshot) {
			const state = asRecord(snapshot);
			if (state === null || !Array.isArray(state.items)) return [];
			const claimed = /* @__PURE__ */ new Map();
			const titles = [];
			for (const item of state.items) {
				const workspace = asRecord(item);
				if (workspace === null) continue;
				const title = typeof workspace.title === "string" && workspace.title !== "" ? workspace.title : void 0;
				if (title === void 0 || !Array.isArray(workspace.sessionIds)) continue;
				titles.push(title);
				for (const id of workspace.sessionIds) if (typeof id === "string" && !claimed.has(id)) claimed.set(id, title);
			}
			const counts = /* @__PURE__ */ new Map();
			let ungrouped = 0;
			for (const row of rows) {
				const title = claimed.get(row.id);
				if (title === void 0) ungrouped++;
				else counts.set(title, (counts.get(title) ?? 0) + 1);
			}
			const groups = [];
			for (const title of titles) {
				const count = counts.get(title) ?? 0;
				if (count > 0) groups.push({
					key: title,
					count
				});
			}
			if (ungrouped > 0) groups.push({
				key: UNGROUPED_KEY,
				count: ungrouped
			});
			return groups;
		}
		/** Whether one row belongs to the group-filter selection (the ungrouped bucket matches claimless rows). */
		function inGroup(row, group, groups) {
			const title = (groups ?? {})[row.id];
			return group === "__ungrouped__" ? title === void 0 : title === group;
		}
		/**
		* The workspace snapshot's archived-session set, re-proved: an absent seat,
		* a hostile shape, or a throwing accessor archives nothing — filtering fail
		* open to the unfiltered list, never fail closed to an empty one.
		*/
		function archivedSetOf(workspaces) {
			try {
				const value = asRecord(workspaces)?.archivedSessionIds;
				if (!Array.isArray(value)) return /* @__PURE__ */ new Set();
				return new Set(value.filter((id) => typeof id === "string"));
			} catch {
				return /* @__PURE__ */ new Set();
			}
		}
		/**
		* Join the raw session-list snapshot into render-ready rows, or null when
		* the snapshot is unusable (absent service, hostile root — the panel's
		* unavailable note, distinct from a real empty list). Blank rows (a
		* never-engaged session's placeholder) are not insight material and drop
		* out; archived rows drop too (the raw list carries every session — the
		* workspace browser hides its archive set, and the overview must not
		* surface ghosts its sibling surface hides); every other row derives in
		* isolation, so one throwing row costs just itself.
		*/
		function rowsOfSnapshot(snapshot, workspaces) {
			const state = asRecord(snapshot);
			if (state === null) return null;
			if (!Array.isArray(state.ids)) return null;
			const ids = state.ids.filter((id) => typeof id === "string");
			const archived = archivedSetOf(workspaces);
			const byId = asRecord(state.byId) ?? {};
			const current = typeof state.current === "string" ? state.current : void 0;
			const rows = [];
			for (const id of ids) {
				if (archived.has(id)) continue;
				try {
					const row = asRecord(byId[id]);
					if (row === null) continue;
					if (row.blank === true) continue;
					if (row.origin === "subagent") continue;
					const displayTitle = typeof row.displayTitle === "string" && row.displayTitle !== "" ? row.displayTitle : void 0;
					const title = typeof row.title === "string" && row.title !== "" ? row.title : void 0;
					const cwd = typeof row.cwd === "string" && row.cwd !== "" ? row.cwd : void 0;
					const values = asRecord(row.projectionValues);
					rows.push({
						id,
						title: displayTitle ?? title ?? id,
						...cwd !== void 0 ? { cwd } : {},
						updatedAt: typeof row.updatedAt === "number" && Number.isFinite(row.updatedAt) ? row.updatedAt : 0,
						running: row.running === true,
						current: id === current,
						timeline: timelineOf(values?.contextTimeline),
						activity: activityOf$1(values?.contextActivity)
					});
				} catch {}
			}
			return rows;
		}
		/** The range window's start instant (epoch ms), or null for "all". */
		function rangeStartOf(range, now) {
			if (range === "7d") return now - 6048e5;
			if (range === "30d") return now - 2592e6;
			return null;
		}
		/**
		* The session's cumulative billed tokens (the host-folded cost buckets'
		* sum), or null when nothing was billed yet — the sort and the card stat
		* share this one figure.
		*/
		function billedOf(timeline) {
			return usageTotalsOf(timeline?.cost)?.total ?? null;
		}
		/** The session's turn tally: the split head's precomputed count, else the retained records' count. */
		function turnsOf(timeline) {
			if (timeline === null) return 0;
			return timeline.counts?.turns ?? timeline.requests.length;
		}
		/**
		* The session's first active day (the ledger's earliest key) — the card's
		* creation-date line. The harness's client-facing list rows carry no
		* per-session creation time, so the first billed day stands in; undefined
		* when the ledger is absent (an older host, or no model requests yet).
		*/
		function createdDayOf(activity) {
			const days = activity?.days;
			if (days === void 0) return void 0;
			let first;
			for (const key of Object.keys(days)) if (first === void 0 || key < first) first = key;
			return first;
		}
		/**
		* The panel's row pipeline: range (by last-activity), then the heatmap's
		* picked day (sessions contributing to that day's merged ledger), then the
		* search box (title or directory substring). Each stage keeps the rows it
		* cannot prove out of the result — never an exception.
		*/
		function filterRows(rows, opts, now) {
			const start = rangeStartOf(opts.range, now);
			const query = opts.query.trim().toLowerCase();
			return rows.filter((row) => {
				if (start !== null && row.updatedAt < start) return false;
				if (opts.day !== null) {
					const entry = row.activity?.days[opts.day];
					if (entry === void 0 || entry.tokens <= 0 && entry.requests <= 0) return false;
				}
				if (query !== "") {
					const inTitle = row.title.toLowerCase().includes(query);
					const inCwd = row.cwd !== void 0 && row.cwd.toLowerCase().includes(query);
					if (!inTitle && !inCwd) return false;
				}
				return true;
			});
		}
		/** Order the filtered rows; the input array is never mutated. */
		function sortRows(rows, sort) {
			const copy = [...rows];
			if (sort === "tokens") copy.sort((a, b) => (billedOf(b.timeline) ?? -1) - (billedOf(a.timeline) ?? -1));
			else if (sort === "context") copy.sort((a, b) => (b.timeline?.current.total ?? -1) - (a.timeline?.current.total ?? -1));
			else copy.sort((a, b) => b.updatedAt - a.updatedAt);
			return copy;
		}
		/**
		* The paged window over the sorted rows: the requested page clamped into
		* the live range, so a list that shrank between renders (a refresh, a
		* narrowed filter) keeps the view valid instead of showing a blank page.
		*/
		function pageOf(rows, page) {
			const count = Math.max(1, Math.ceil(rows.length / 12));
			const index = Math.min(Math.max(0, page), count - 1);
			return {
				items: rows.slice(index * 12, (index + 1) * 12),
				index,
				count
			};
		}
		/**
		* Sum one cost usage's buckets (already sanitized per bucket by the
		* timeline boundary). Null when no side carried a bucket record, so the
		* caller's cells keep their dash instead of a fabricated zero.
		*/
		function usageTotalsOf(usage) {
			if (usage === null || usage === void 0) return null;
			const totals = {
				input: 0,
				cacheRead: 0,
				cacheWrite: 0,
				output: 0,
				total: 0
			};
			let any = false;
			for (const provider of Object.keys(usage)) {
				const models = usage[provider];
				for (const model of Object.keys(models)) {
					const periods = models[model];
					for (const period of ["peak", "off"]) {
						const bucket = periods[period];
						if (bucket === void 0) continue;
						totals.input += bucket.uncached;
						totals.cacheRead += bucket.cacheRead;
						totals.cacheWrite += bucket.cacheWrite;
						totals.output += bucket.output;
						any = true;
					}
				}
			}
			if (!any) return null;
			totals.total = totals.input + totals.cacheRead + totals.cacheWrite + totals.output;
			return totals;
		}
		function kpisOf(rows, listed, prices, currency) {
			const usage = mergeCostUsage(...rows.map((row) => row.timeline?.cost));
			const totals = usageTotalsOf(usage);
			let turns = 0;
			let toolCalls = 0;
			let toolsMs = 0;
			let calls = 0;
			let wallMs = 0;
			let costSessions = 0;
			let usageSessions = 0;
			for (const row of rows) {
				const cost = row.timeline?.cost;
				if (estimateSessionCost(cost, prices, currency) !== null) costSessions++;
				if (usageTotalsOf(cost) !== null) usageSessions++;
				turns += turnsOf(row.timeline);
				const timing = row.timeline?.timing;
				toolCalls += timing?.toolCalls ?? 0;
				toolsMs += timing?.toolsMs ?? 0;
				calls += timing?.calls ?? 0;
				wallMs += timing?.wallMs ?? 0;
			}
			return {
				sessions: rows.length,
				listed,
				tokens: totals?.total ?? 0,
				turns,
				cost: estimateSessionCost(usage, prices, currency),
				costSessions,
				cacheHit: totals === null ? null : cacheHitPercent(totals.cacheRead, totals.input + totals.cacheRead + totals.cacheWrite),
				usageSessions,
				toolCalls,
				toolsMs,
				calls,
				wallMs
			};
		}
		/**
		* Merge every row's daily ledger into one — the heatmap's data. A session
		* counts toward a day only when its own entry carries activity, mirroring
		* the day filter's predicate, so the cell's tooltip previews the click; a
		* zeroed entry is skipped whole. The merged record stays small even over
		* long histories.
		*/
		function aggregateDays(rows) {
			const days = {};
			const byKey = days;
			for (const row of rows) {
				if (row.activity === null) continue;
				for (const key of Object.keys(row.activity.days)) {
					const entry = row.activity.days[key];
					if (entry.tokens <= 0 && entry.requests <= 0) continue;
					const prev = byKey[key];
					if (prev === void 0) days[key] = {
						tokens: entry.tokens,
						requests: entry.requests,
						sessions: 1
					};
					else {
						prev.tokens += entry.tokens;
						prev.requests += entry.requests;
						prev.sessions++;
					}
				}
			}
			return days;
		}
		/**
		* Jump to one session: the harness's own selection verb (`sessions.open`,
		* the sidebar row click's mechanism). The face is re-proved per call and a
		* hostile or absent service swallows silently — the panel still closes, so
		* the gesture never dead-ends on an error.
		*/
		function openSession(ctx, id) {
			try {
				const sessions = ctx.get("sessions");
				if (sessions !== void 0 && typeof sessions.open === "function") sessions.open(id);
			} catch {}
		}
		/**
		* Re-pull the session-list baseline so host-side projection backfills
		* (host/backfill.ts) reach a long-connected browser. Fire-and-forget: the
		* verb is re-proved and every failure swallows — the panel renders off the
		* rows it already has either way.
		*/
		function refreshSessions(ctx) {
			try {
				const sessions = ctx.get("sessions");
				if (sessions === void 0 || typeof sessions.refresh !== "function") return;
				Promise.resolve(sessions.refresh()).catch(() => {});
			} catch {}
		}
		const BACKFILL_ROUTE = "/api/dsh-context/backfill";
		/**
		* Summon the host's projection warm-up (host/backfill.ts): the dashboard is
		* the rows' only reader, so the host defers the corpus-wide cold reads until
		* this surface first opens (one pass per host process — later opens no-op
		* server-side, and the host answers at once). Fire-and-forget: an older host
		* without the route, or a transport hiccup, just leaves the panel on the
		* rows it already has.
		*/
		function requestActivityBackfill() {
			try {
				fetch(BACKFILL_ROUTE, { method: "POST" }).catch(() => {});
			} catch {}
		}
		/**
		* The row's relative-activity label ("3m ago"), unit-stepped: under a
		* minute reads "just now", then minutes, hours, days. A future or invalid
		* timestamp reads as "just now" (clock skew is not an error worth a dash).
		*/
		function relativeTime(t, updatedAt, now) {
			const diff = now - updatedAt;
			if (!Number.isFinite(diff) || diff < 6e4) return t("ov.time.now");
			const minutes = Math.floor(diff / 6e4);
			if (minutes < 60) return t("ov.time.m", { n: minutes });
			const hours = Math.floor(minutes / 60);
			if (hours < 24) return t("ov.time.h", { n: hours });
			return t("ov.time.d", { n: Math.floor(hours / 24) });
		}
		//#endregion
		//#region src/client/components/balanceCapsule.tsx
		/**
		* BalanceCapsule — the DeepSeek open-platform balance pill in the Context
		* Dashboard's header (the plugin's one account-level figure, beside the
		* session-level ones). Mounted only by the dashboard header; it reads the
		* plugin's balance route once per open through client/balance.ts and renders
		* NOTHING while the read is pending, absent, or failed — the pill exists
		* only when there is a live figure to show. The tooltip carries the
		* breakdown (total / granted / topped-up) in the entry's own currency; the
		* entry follows the active locale (zh → CNY) with the account's first
		* currency as the fallback.
		*/
		/** The symbol prefix for the currencies the platform serves; others show their code. */
		function symbolOf(currency) {
			if (currency === "CNY") return "¥";
			if (currency === "USD") return "$";
			return currency + " ";
		}
		function makeBalanceCapsule(ctx, kit) {
			const { t } = kit;
			return function BalanceCapsule() {
				const [balance, setBalance] = (0, react.useState)(null);
				(0, react.useEffect)(() => {
					let on = true;
					fetchPlatformBalance().then((v) => {
						if (on) setBalance(v);
					});
					return () => {
						on = false;
					};
				}, []);
				const locale = ctx.locale;
				const entry = balanceEntryOf(balance, (typeof locale.getLocale === "function" ? locale.getLocale().active : "en") === "zh" ? "cny" : "usd");
				if (entry === null) return null;
				const money = (amount) => symbolOf(entry.currency) + amount.toFixed(2);
				const tip = [
					t("balance.tip.total") + ": " + money(entry.total),
					t("balance.tip.granted") + ": " + money(entry.granted),
					t("balance.tip.toppedUp") + ": " + money(entry.toppedUp)
				].join("\n");
				return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
					className: "lc-ov-balance",
					title: tip,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "lc-ov-balance-label",
						children: t("balance.title")
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "lc-ov-balance-value",
						children: money(entry.total)
					})]
				});
			};
		}
		//#endregion
		//#region src/shared/days.ts
		/**
		* The local-day key (`YYYY-MM-DD`) shared by the activity fold (host) and the
		* overview heatmap (client). Both halves bucket by the machine's OWN local
		* day: the harness host serves the operator's machine, so the host-folded
		* keys and the browser's cells speak the same calendar. Lexicographic order
		* on the key IS chronological order — the fold's retention cap and the
		* heatmap's week math both ride that.
		*/
		/** The strict key shape (round-trip validated on construction too). */
		const DAY_KEY_RE = /^\d{4}-\d{2}-\d{2}$/;
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
		/**
		* Advance a day key by `delta` calendar days (local). Date-field arithmetic
		* keeps DST-short/long days exact (an epoch-ms add would drift an hour into
		* the neighbouring day). Null propagates (the caller's input guard), and a
		* malformed key — including one whose fields would roll over (2026-13-40) —
		* yields null as well.
		*/
		function shiftDayKey(key, delta) {
			if (!DAY_KEY_RE.test(key)) return null;
			const y = Number(key.slice(0, 4));
			const m = Number(key.slice(5, 7));
			const d = Number(key.slice(8, 10));
			const date = new Date(y, m - 1, d);
			if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) return null;
			date.setDate(date.getDate() + delta);
			return dayKeyOf(date.getTime());
		}
		/** The Monday (local) of the week containing `key` — the heatmap's column anchor. */
		function mondayOfWeek(key) {
			if (!DAY_KEY_RE.test(key)) return null;
			const y = Number(key.slice(0, 4));
			const m = Number(key.slice(5, 7));
			const d = Number(key.slice(8, 10));
			const date = new Date(y, m - 1, d);
			if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) return null;
			return shiftDayKey(key, -((date.getDay() + 6) % 7));
		}
		//#endregion
		//#region src/client/components/heatmap.tsx
		/**
		* The Context Dashboard's activity heatmap: a GitHub-style contribution grid
		* (weeks as columns, Monday-first weekdays as rows, a month label over the
		* column where each month begins) over the merged daily
		* ledger (overview.ts). Cell depth is the day's billed-token share of the
		* window's maximum, in four steps; a day with data is a button whose click
		* pins the session list to that day (click again to release). Cells tip
		* through the harness's own Tooltip primitive (instant on hover; native
		* `title` lags a second behind), the bubble carrying the date and the day's
		* active sessions. The grid is computed from the injected `today` key, so
		* the layout is deterministic in tests and follows the browser's local
		* calendar at runtime.
		*/
		/**
		* Lay out the grid: `weeks` columns ending at today's week, each seven
		* Monday-first cells. Returns null when `today` (or its week math) fails —
		* a corrupt injected key degrades the card to its empty note.
		*/
		function gridOf(today, weeks) {
			const lastMonday = mondayOfWeek(today);
			if (lastMonday === null || weeks < 1) return null;
			const firstMonday = shiftDayKey(lastMonday, -7 * (weeks - 1));
			if (firstMonday === null) return null;
			const columns = [];
			for (let w = 0; w < weeks; w++) {
				const monday = shiftDayKey(firstMonday, 7 * w);
				/* v8 ignore next -- monday is bounded by firstMonday and lastMonday (both
				* proven valid), so it can never leave the representable range; kept as a
				* guard so a future shiftDayKey change cannot leak a null into the grid. */
				if (monday === null) return null;
				const column = [];
				for (let d = 0; d < 7; d++) {
					const key = shiftDayKey(monday, d);
					if (key === null) return null;
					column.push({
						key,
						future: key > today,
						entry: void 0
					});
				}
				columns.push(column);
			}
			return columns;
		}
		/** The cell's depth class: empty, then four steps up to the window's maximum. */
		function levelOf(tokens, max) {
			if (tokens <= 0 || max <= 0) return 0;
			const ratio = tokens / max;
			if (ratio <= .25) return 1;
			if (ratio <= .5) return 2;
			if (ratio <= .75) return 3;
			return 4;
		}
		function makeHeatmap(kit) {
			const { t } = kit;
			return function Heatmap(props) {
				const weeks = props.weeks ?? 8;
				const columns = gridOf(props.today, weeks);
				if (columns === null) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "lc-empty",
					children: t("ov.heat.empty")
				});
				const byKey = props.days;
				let max = 0;
				let any = false;
				for (const column of columns) for (const cell of column) {
					const entry = byKey[cell.key];
					if (entry === void 0 || entry.tokens <= 0 && entry.requests <= 0) continue;
					cell.entry = entry;
					any = true;
					if (entry.tokens > max) max = entry.tokens;
				}
				if (!any) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "lc-empty",
					children: t("ov.heat.empty")
				});
				const weekdayLabels = [
					t("ov.heat.wd.1"),
					t("ov.heat.wd.3"),
					t("ov.heat.wd.5")
				];
				return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "lc-heat",
					role: "group",
					"aria-label": t("ov.heat.title"),
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "lc-heat-wds",
						"aria-hidden": "true",
						children: [
							0,
							1,
							2,
							3,
							4,
							5,
							6
						].map((row) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "lc-heat-wd",
							children: row === 1 ? weekdayLabels[0] : row === 3 ? weekdayLabels[1] : row === 5 ? weekdayLabels[2] : ""
						}, row))
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "lc-heat-cols",
						children: columns.map((column, wi) => {
							const opens = column[0].key.slice(0, 7) !== column[6].key.slice(0, 7) || column[0].key.slice(8, 10) === "01";
							return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "lc-heat-col",
								children: [opens && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "lc-heat-mon",
									"aria-hidden": "true",
									children: t("ov.heat.mon." + column[6].key.slice(5, 7))
								}), column.map((cell) => {
									if (cell.future) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: "lc-heat-cell lc-heat-future",
										"aria-hidden": "true"
									}, cell.key);
									const level = cell.entry === void 0 ? 0 : levelOf(cell.entry.tokens, max);
									if (cell.entry === void 0) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Tooltip, {
										label: cell.key,
										side: "top",
										children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { className: "lc-heat-cell lc-heat-0" })
									}, cell.key);
									const picked = props.selected === cell.key;
									const label = `${cell.key}\n${t("ov.heat.sessions", { n: cell.entry.sessions })}`;
									return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Tooltip, {
										label,
										side: "top",
										children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											type: "button",
											className: `lc-heat-cell lc-heat-${String(level)}${picked ? " lc-heat-on" : ""}`,
											"aria-label": label,
											"aria-pressed": picked,
											onClick: () => {
												if (props.onSelect !== void 0) props.onSelect(picked ? null : cell.key);
											}
										})
									}, cell.key);
								})]
							}, wi);
						})
					})]
				});
			};
		}
		/** Re-exported for the panel: today's key at render time (null-safe). */
		function todayKey() {
			/* v8 ignore next -- Date.now() is always a valid local day, so the null
			* arm of dayKeyOf is unreachable here; the '' fallback only types the seam. */
			return dayKeyOf(Date.now()) ?? "";
		}
		//#endregion
		//#region src/client/components/donut.tsx
		/**
		* The stats cards' ring chart: proportional SVG segments (stroke-dasharray
		* over a 100-unit circumference, the same trick as the agent graph's rings)
		* around an HTML center label. Neighbouring segments part on a hairline of the
		* card's own background (each arc gives up a half gap at both ends); segments
		* with no value are skipped; an all-zero ring renders as one neutral track so
		* the card never draws a misleading "100% of nothing" pie. The center type
		* scales with the ring's size, so the label always fits inside the hole the
		* thin stroke leaves. On mount the slices sweep in one after another, growing
		* their dasharcs clockwise from 12 o'clock (stats.css, staggered by the
		* per-slice `--lc-i` slot below).
		*/
		/**
		* The hairline divider between two slices, in dasharray units (1 unit ≈ 1% of
		* the circumference ≈ 2.3px on the 96px card ring, so this reads as ~1px).
		*/
		const SEG_GAP = .5;
		function makeDonut(kit) {
			return function Donut(props) {
				const size = props.size ?? 118;
				let total = 0;
				for (const s of props.segments) if (Number.isFinite(s.value) && s.value > 0) total += s.value;
				const arcs = [];
				let acc = 0;
				if (total > 0) for (const s of props.segments) {
					const v = Number.isFinite(s.value) && s.value > 0 ? s.value : 0;
					if (v === 0) continue;
					const pct = v / total * 100;
					arcs.push({
						key: s.key,
						color: s.color,
						len: pct,
						offset: 100 - acc + 25
					});
					acc += pct;
				}
				if (arcs.length > 1) for (const a of arcs) {
					const cut = Math.min(SEG_GAP / 2, a.len / 4);
					a.len -= cut * 2;
					a.offset -= cut;
				}
				const hovering = props.hoverKey !== null && props.hoverKey !== void 0 && arcs.some((a) => a.key === props.hoverKey);
				return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "lc-donut @max-[240px]/lc-card:mx-auto" + (hovering ? " lc-donut-dim" : ""),
					style: {
						width: size,
						height: size
					},
					onMouseLeave: () => {
						if (props.onHoverKey !== void 0) props.onHoverKey(null);
					},
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
						viewBox: "0 0 42 42",
						width: size,
						height: size,
						"aria-hidden": "true",
						children: arcs.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
							className: "lc-donut-track fill-none stroke-4",
							cx: "21",
							cy: "21",
							r: "15.9155"
						}) : arcs.map((a, i) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
							className: "lc-donut-seg fill-none stroke-4 animate-lc-donut-in motion-reduce:animate-none" + (props.hoverKey === a.key ? " lc-donut-seg-on" : ""),
							cx: "21",
							cy: "21",
							r: "15.9155",
							strokeDasharray: `${a.len} ${100 - a.len}`,
							strokeDashoffset: a.offset,
							style: {
								"--lc-i": i,
								stroke: a.color
							},
							onMouseEnter: () => {
								if (props.onHoverKey !== void 0) props.onHoverKey(a.key);
							}
						}, a.key))
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "lc-donut-center",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", {
							style: { fontSize: Math.max(11, Math.round(size * .13)) },
							children: props.centerTop
						}), props.centerSub !== void 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							style: { fontSize: Math.max(9, Math.round(size * .105)) },
							children: props.centerSub
						}) : null]
					})]
				});
			};
		}
		//#endregion
		//#region src/client/components/overviewCard.tsx
		function makeOverviewCard(kit) {
			const { t } = kit;
			const Donut = makeDonut(kit);
			return function OverviewCard(props) {
				const { row } = props;
				const timeline = row.timeline;
				const billed = billedOf(timeline);
				const occupancy = timeline !== null && typeof timeline.contextWindow === "number" && timeline.contextWindow > 0 ? fmtShare(timeline.current.total, timeline.contextWindow) : null;
				const turns = turnsOf(timeline);
				const steps = timeline?.counts?.steps;
				const turnsLabel = steps === void 0 ? String(turns) : t("ov.card.turns", {
					n: turns,
					s: steps
				});
				const project = projectOf(row.cwd);
				const group = props.group !== void 0 && props.group !== project ? props.group : void 0;
				const created = createdDayOf(row.activity);
				const lastUser = timeline?.lastUser;
				return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "lc-ov-session" + (row.current ? " lc-ov-session-current" : ""),
					onClick: () => {
						props.onOpen(row.id);
					},
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
							className: "lc-ov-session-head",
							children: [
								row.running && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "lc-ov-running",
									title: t("ov.running")
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "lc-ov-session-title",
									title: row.title,
									children: row.title
								}),
								row.current && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "lc-ov-current",
									children: t("ov.current")
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
									className: "lc-ov-session-times",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: "lc-ov-session-time",
										children: relativeTime(t, row.updatedAt, props.now)
									}), created !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: "lc-ov-session-created",
										children: created
									})]
								})
							]
						}),
						(group !== void 0 || project !== void 0) && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
							className: "lc-ov-session-crumb",
							title: row.cwd,
							children: [
								group !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "lc-ov-crumb-group",
									children: group
								}),
								group !== void 0 && project !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "lc-ov-crumb-sep",
									children: "/"
								}),
								project !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "lc-ov-crumb-project",
									children: project
								})
							]
						}),
						timeline === null ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "lc-ov-session-empty",
							children: t("ov.list.noData")
						}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
							className: "lc-ov-session-body",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Donut, {
								size: 64,
								segments: partsOf(timeline.current),
								centerTop: fmt(timeline.current.total),
								centerSub: occupancy ?? void 0
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
								className: "lc-ov-mini-stats",
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
										className: "lc-ov-mini-stat",
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: "lc-ov-mini-label",
											children: t("stats.turns")
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: "lc-ov-mini-value",
											children: turnsLabel
										})]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
										className: "lc-ov-mini-stat",
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: "lc-ov-mini-label",
											children: t("tokens.total")
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: "lc-ov-mini-value",
											children: billed === null ? "—" : fmt(billed)
										})]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
										className: "lc-ov-mini-stat",
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: "lc-ov-mini-label",
											children: t("stats.cost")
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: "lc-ov-mini-value",
											children: props.costLabel
										})]
									})
								]
							})]
						}),
						lastUser !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
							className: "lc-ov-session-preview",
							title: lastUser,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "lc-ov-session-preview-label",
								children: t("ov.card.lastUser")
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "lc-ov-session-preview-text",
								children: lastUser
							})]
						})
					]
				});
			};
		}
		//#endregion
		//#region src/client/components/overviewPanel.tsx
		/**
		* The Context Dashboard panel — the cross-session insight surface opened
		* from the sidebar foot (overviewButton.tsx). Rendered from the frame-wide
		* `shell.overlay` slot behind the module store's flag; data rides the
		* root-scope `useSessions` standard kit (every list row's host-cached
		* projection values), so the panel draws every session's insight without
		* opening one log.
		*
		* The body is a 3:7 column pair: the insight column (the KPI 2×3 block over
		* the activity heatmap) beside the session column (search, group chips, and
		* the card grid); the heatmap keeps its own fixed 8-week window and PINs the
		* list to a picked day (the panel's drill-down gesture). A session card
		* click jumps to that session through the harness's own `sessions.open` and
		* closes the panel.
		*/
		const RANGES = [
			"7d",
			"30d",
			"all"
		];
		const SORTS = [
			"recent",
			"tokens",
			"context"
		];
		function makeOverviewPanel(ctx, kit) {
			const { t, fmtDuration } = kit;
			const Heatmap = makeHeatmap(kit);
			const OverviewCard = makeOverviewCard(kit);
			const BalanceCapsule = makeBalanceCapsule(ctx, kit);
			const ErrorBoundary = makeErrorBoundary(t);
			/** Read the optional codexQuota client service without requiring it. */
			function codexQuotaOf() {
				const probe = ctx;
				if (typeof probe.get !== "function") return null;
				const value = probe.get("codexQuota");
				if (value === null || typeof value !== "object") return null;
				const candidate = value;
				return typeof candidate.snapshot === "function" && typeof candidate.subscribe === "function" ? candidate : null;
			}
			/** Stable fallbacks so the grid subscribes unconditionally. */
			const NO_QUOTA = () => null;
			const NEVER_CHANGES = () => () => {};
			/** Currency symbol for the balance cells the platform serves. */
			function symbolOf(currency) {
				if (currency === "CNY") return String.fromCharCode(165);
				if (currency === "USD") return String.fromCharCode(36);
				return currency + " ";
			}
			/** One rolling window length as a compact label (5h, 7d). */
			function windowLabel(seconds) {
				if (seconds % 86400 === 0) return String(seconds / 86400) + "d";
				if (seconds % 3600 === 0) return String(seconds / 3600) + "h";
				return String(Math.round(seconds / 60)) + "m";
			}
			/** Remaining time until one window resets, or null when unknown. */
			function resetInOf(win) {
				if (win.resetAt === void 0) return null;
				const left = win.resetAt * 1e3 - Date.now();
				return left > 0 ? fmtDuration(left) : null;
			}
			/**
			* The account and quota grid above the KPI band: the platform balance, the
			* signed-in Codex account rolling windows, and the tokens recorded for
			* today. A cell whose figure is absent renders nothing rather than a
			* placeholder.
			*/
			function QuotaGrid({ days, currency }) {
				const [balance, setBalance] = (0, react.useState)(null);
				(0, react.useEffect)(() => {
					let on = true;
					fetchPlatformBalance().then((value) => {
						if (on) setBalance(value);
					});
					return () => {
						on = false;
					};
				}, []);
				const service = codexQuotaOf();
				const quota = (0, react.useSyncExternalStore)(service?.subscribe ?? NEVER_CHANGES, service?.snapshot ?? NO_QUOTA);
				const entry = balanceEntryOf(balance, currency);
				const today = days[todayKey()];
				const cells = [];
				if (entry !== null) cells.push(/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "lc-ov-quota-cell",
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "lc-ov-quota-label",
							children: t("ov.quota.balance")
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "lc-ov-quota-value",
							children: symbolOf(entry.currency) + entry.total.toFixed(2)
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "lc-ov-quota-sub",
							children: t("ov.quota.balanceSub", {
								granted: entry.granted.toFixed(2),
								topped: entry.toppedUp.toFixed(2)
							})
						})
					]
				}, "balance"));
				const windows = [...quota?.windows ?? []].sort((left, right) => left.windowSeconds - right.windowSeconds).slice(0, 2);
				for (const win of windows) {
					const reset = resetInOf(win);
					cells.push(/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "lc-ov-quota-cell",
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "lc-ov-quota-label",
								children: t("ov.quota.codexWindow", { w: windowLabel(win.windowSeconds) })
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "lc-ov-quota-value",
								children: t("ov.quota.remaining", { p: Math.round(win.remainingPercent) })
							}),
							reset !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "lc-ov-quota-sub",
								children: t("ov.quota.resetIn", { d: reset })
							})
						]
					}, win.bucketId + ":" + win.windowSeconds));
				}
				if (today !== void 0 && today.tokens > 0) cells.push(/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "lc-ov-quota-cell",
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "lc-ov-quota-label",
							children: t("ov.quota.today")
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "lc-ov-quota-value",
							children: fmt(today.tokens)
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "lc-ov-quota-sub",
							children: t("ov.kpi.tokens")
						})
					]
				}, "today"));
				return cells.length === 0 ? null : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "lc-ov-quota",
					children: cells
				});
			}
			function activeCurrency() {
				const locale = ctx.locale;
				return (typeof locale.getLocale === "function" ? locale.getLocale().active : "en") === "zh" ? "cny" : "usd";
			}
			function OverviewBody(props) {
				const open = (0, react.useSyncExternalStore)(overviewStore.subscribe, overviewStore.getSnapshot);
				const { prices } = useModelPrices();
				const snapshot = sessionsSnapshotOf(props);
				const wsSnapshot = workspacesSnapshotOf(props);
				const [range, setRange] = (0, react.useState)("30d");
				const [day, setDay] = (0, react.useState)(null);
				const [query, setQuery] = (0, react.useState)("");
				const [group, setGroup] = (0, react.useState)(null);
				const [sort, setSort] = (0, react.useState)("recent");
				const [page, setPage] = (0, react.useState)(0);
				const close = () => {
					overviewStore.set(false);
				};
				useEscapeClose(open, close);
				const rows = (0, react.useMemo)(() => rowsOfSnapshot(snapshot, wsSnapshot), [snapshot, wsSnapshot]);
				const groups = (0, react.useMemo)(() => sessionGroupsOf(wsSnapshot), [wsSnapshot]);
				(0, react.useEffect)(() => {
					if (open) {
						requestActivityBackfill();
						refreshSessions(ctx);
					}
				}, [open]);
				(0, react.useEffect)(() => {
					setPage(0);
				}, [
					range,
					day,
					query,
					group,
					sort
				]);
				if (!open) return null;
				const currency = activeCurrency();
				const now = Date.now();
				const allRows = rows ?? [];
				const ranged = filterRows(allRows, {
					range,
					day: null,
					query: ""
				}, now);
				const scoped = filterRows(ranged, {
					range: "all",
					day,
					query
				}, now);
				const counts = groupCountsOf(scoped, wsSnapshot);
				const chips = group !== null && !counts.some((c) => c.key === group) ? [...counts, {
					key: group,
					count: 0
				}] : counts;
				const visible = sortRows(group === null ? scoped : scoped.filter((row) => inGroup(row, group, groups)), sort);
				const paged = pageOf(visible, page);
				const kpi = kpisOf(ranged, allRows.length, prices, currency);
				const days = aggregateDays(allRows);
				const openOne = (id) => {
					openSession(ctx, id);
					overviewStore.set(false);
				};
				return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "lc-ov-backdrop",
					onClick: close,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "lc-ov-card",
						onClick: (ev) => {
							ev.stopPropagation();
						},
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "lc-ov-head",
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ContextIcon, {
									size: 18,
									className: "lc-ov-head-icon"
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "lc-ov-title",
									children: t("ov.title")
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(BalanceCapsule, {}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: "lc-gran lc-ov-range",
									role: "group",
									"aria-label": t("ov.range.label"),
									children: RANGES.map((r) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										className: "lc-gran-btn" + (range === r ? " lc-gran-on" : ""),
										onClick: () => {
											setRange(r);
										},
										children: t("ov.range." + r)
									}, r))
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: "lc-modal-close hover:text-(--dsw-alias-label-primary) hover:bg-(--dsw-alias-bg-layer-2)",
									"aria-label": t("cmd.close"),
									onClick: close,
									children: "×"
								})
							]
						}), rows === null ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "lc-empty",
							children: t("ov.unavailable")
						}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "lc-ov-body",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "lc-ov-left",
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(QuotaGrid, {
										days,
										currency
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "lc-ov-kpis",
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												className: "lc-stat lc-ov-kpi",
												children: [
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
														className: "lc-stat-label",
														children: t("ov.kpi.sessions")
													}),
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
														className: "lc-stat-value",
														children: kpi.sessions
													}),
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
														className: "lc-stat-sub",
														children: t("ov.kpi.ofTotal", { n: kpi.listed })
													})
												]
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												className: "lc-stat lc-ov-kpi",
												children: [
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
														className: "lc-stat-label",
														children: t("ov.kpi.tokens")
													}),
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
														className: "lc-stat-value",
														children: fmt(kpi.tokens)
													}),
													/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
														className: "lc-stat-sub",
														children: [
															t("stats.turns"),
															" ",
															fmt(kpi.turns)
														]
													})
												]
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												className: "lc-stat lc-ov-kpi",
												children: [
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
														className: "lc-stat-label",
														children: t("stats.cost")
													}),
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
														className: "lc-stat-value",
														children: kpi.cost === null ? "—" : formatCost(kpi.cost, currency)
													}),
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
														className: "lc-stat-sub",
														children: t("ov.kpi.sessionsSub", { n: kpi.costSessions })
													})
												]
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												className: "lc-stat lc-ov-kpi",
												children: [
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
														className: "lc-stat-label",
														children: t("stats.cacheHit")
													}),
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
														className: "lc-stat-value",
														children: kpi.cacheHit === null ? "—" : kpi.cacheHit + "%"
													}),
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
														className: "lc-stat-sub",
														children: t("ov.kpi.sessionsSub", { n: kpi.usageSessions })
													})
												]
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												className: "lc-stat lc-ov-kpi",
												children: [
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
														className: "lc-stat-label",
														children: t("stats.toolCalls")
													}),
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
														className: "lc-stat-value",
														children: fmt(kpi.toolCalls)
													}),
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
														className: "lc-stat-sub",
														children: t("ov.kpi.toolSub", { dur: fmtDuration(kpi.toolsMs) })
													})
												]
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												className: "lc-stat lc-ov-kpi",
												children: [
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
														className: "lc-stat-label",
														children: t("timing.total")
													}),
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
														className: "lc-stat-value",
														children: fmtDuration(kpi.wallMs)
													}),
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
														className: "lc-stat-sub",
														children: t("ov.kpi.wallSub", { n: fmt(kpi.calls) })
													})
												]
											})
										]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "lc-card lc-ov-heat-card",
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											className: "lc-card-title",
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: "lc-card-title-text",
												children: t("ov.heat.title")
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: "lc-card-sub",
												children: t("ov.heat.sub")
											})]
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Heatmap, {
											days,
											selected: day,
											onSelect: setDay,
											today: todayKey()
										})]
									})
								]
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "lc-ov-right",
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "lc-ov-list-head",
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: "lc-ov-list-title",
												children: t("ov.list.title")
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: "lc-ov-list-count",
												children: visible.length
											}),
											day !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
												type: "button",
												className: "lc-ov-day-chip",
												title: t("ov.list.dayClear"),
												onClick: () => {
													setDay(null);
												},
												children: [t("ov.list.dayFilter", { day }), " ×"]
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
												className: "lc-ov-search",
												type: "search",
												value: query,
												placeholder: t("ov.list.search"),
												"aria-label": t("ov.list.search"),
												onChange: (ev) => {
													setQuery(ev.target.value);
												}
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
												className: "lc-gran",
												role: "group",
												"aria-label": t("ov.list.sortLabel"),
												children: SORTS.map((s) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
													type: "button",
													className: "lc-gran-btn" + (sort === s ? " lc-gran-on" : ""),
													onClick: () => {
														setSort(s);
													},
													children: t("ov.list.sort." + s)
												}, s))
											})
										]
									}),
									chips.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "lc-ov-groups",
										role: "group",
										"aria-label": t("ov.group.label"),
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
											type: "button",
											className: "lc-ov-chip" + (group === null ? " lc-ov-chip-on" : ""),
											onClick: () => {
												setGroup(null);
											},
											children: [t("ov.range.all"), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: "lc-ov-chip-n",
												children: scoped.length
											})]
										}), chips.map((c) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
											type: "button",
											className: "lc-ov-chip" + (group === c.key ? " lc-ov-chip-on" : ""),
											onClick: () => {
												setGroup(group === c.key ? null : c.key);
											},
											children: [c.key === "__ungrouped__" ? t("ov.group.ungrouped") : c.key, /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: "lc-ov-chip-n",
												children: c.count
											})]
										}, c.key))]
									}),
									visible.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: "lc-empty",
										children: t(allRows.length === 0 ? "ov.list.empty" : "ov.list.noMatch")
									}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: "lc-ov-grid",
										children: paged.items.map((row) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(OverviewCard, {
											row,
											...groups?.[row.id] !== void 0 ? { group: groups[row.id] } : {},
											costLabel: cardCostOf(row, prices, currency),
											now,
											onOpen: openOne
										}, row.id))
									}), paged.count > 1 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "lc-ov-pager",
										role: "navigation",
										"aria-label": t("ov.list.pager"),
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
												type: "button",
												className: "lc-ov-pager-btn",
												disabled: paged.index === 0,
												"aria-label": t("ov.list.prev"),
												onClick: () => {
													setPage(paged.index - 1);
												},
												children: "‹"
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: "lc-ov-pager-n",
												children: t("ov.list.page", {
													n: paged.index + 1,
													total: paged.count
												})
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
												type: "button",
												className: "lc-ov-pager-btn",
												disabled: paged.index === paged.count - 1,
												"aria-label": t("ov.list.next"),
												onClick: () => {
													setPage(paged.index + 1);
												},
												children: "›"
											})
										]
									})] })
								]
							})]
						})]
					})
				});
			}
			return function OverviewPanel(props) {
				return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ErrorBoundary, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(OverviewBody, { ...props }) });
			};
		}
		/** One card's priced cost label, or the dash (no book yet, nothing billed, unpriceable model). */
		function cardCostOf(row, prices, currency) {
			if (row.timeline?.cost === void 0) return "—";
			const cost = estimateSessionCost(row.timeline.cost, prices, currency);
			return cost === null ? "—" : formatCost(cost, currency);
		}
		//#endregion
		//#region src/client/settingsJump.ts
		/**
		* Best-effort jump to this plugin's settings page (Settings → Plugins →
		* Plugin configuration). The harness settings panel keeps its open state
		* inside the shell component — no plugin-facing open face exists — so the
		* jump drives the real chrome: click the sidebar's settings trigger, then
		* the Plugins section nav row, both found by their shipped attributes and
		* labels. EVERY step is individually guarded: a shell that doesn't match
		* (older host, different layout, missing sidebar) degrades the whole jump
		* to a silent no-op — this path must never throw into the caller's render.
		*
		* The last leg — the card itself — is ours: the module also carries a
		* short-lived in-bundle expand request that the plugin's settings card
		* consumes on mount, so the jump lands on the configuration already open.
		*/
		let requestedAt = 0;
		/** Raise a short-lived request for the plugin's settings card to mount expanded. */
		function requestCardExpand(now = Date.now()) {
			requestedAt = now;
		}
		/** Consume the request once; true only while it is still fresh (younger than maxAgeMs). */
		function consumeCardExpand(now = Date.now(), maxAgeMs = 5e3) {
			const fresh = requestedAt > 0 && now - requestedAt < maxAgeMs;
			requestedAt = 0;
			return fresh;
		}
		/** The Plugins settings section's shipped nav labels (en/zh locales). */
		const SECTION_LABELS = /* @__PURE__ */ new Set(["Plugins", "插件"]);
		/** Buttons the jump may operate on, in document order. */
		function buttonsOf(doc) {
			return [...doc.querySelectorAll("button")];
		}
		/** The sidebar's settings triggers: dialog semantics plus an expanded flag. */
		function findTriggers(doc) {
			return buttonsOf(doc).filter((b) => b.getAttribute("aria-haspopup") === "dialog" && b.hasAttribute("aria-expanded"));
		}
		/** The Plugins section's nav row, matched by its shipped label. */
		function findSectionRow(doc) {
			return buttonsOf(doc).find((b) => SECTION_LABELS.has(b.textContent.trim()));
		}
		function openPluginSettings(doc = document, schedule = (run, ms) => {
			window.setTimeout(run, ms);
		}) {
			try {
				const triggers = findTriggers(doc);
				if (triggers.find((b) => b.getAttribute("aria-expanded") === "true") === void 0 && triggers.length === 0) return;
				triggers.find((b) => b.getAttribute("aria-expanded") !== "true")?.click();
				requestCardExpand();
				schedule(() => {
					try {
						findSectionRow(doc)?.click();
					} catch {}
				}, 80);
			} catch {}
		}
		//#endregion
		//#region src/client/components/settingsCard.tsx
		/**
		* The dsh-context card in Settings → Plugins → Plugin configuration, registered on the framework's `settings.plugin.item` slot keyed on
		* the
		* Host-served `dsh-context` settings namespace — the section itself supplies nothing; it renders nothing while the namespace is
		* unavailable
		* (a deployment without the Host half, or a remote browser, shows no trace).
		* Mounts expanded when the Plugin Info card's "Open in Settings" jump left a
		* fresh expand request (settingsJump.ts), scrolling itself into view.
		*/
		function PrefRow(props) {
			const [open, setOpen] = (0, react.useState)(false);
			const active = props.options.find((o) => o.id === props.value)?.label ?? props.value;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "lc-settings-row",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "lc-settings-label",
					children: props.label
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Menu, {
					open,
					onClose: () => {
						setOpen(false);
					},
					items: props.options,
					selectedId: props.value,
					onSelect: (id) => {
						setOpen(false);
						props.onPick(id);
					},
					align: "end",
					portal: true,
					anchor: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "lc-settings-select hover:enabled:bg-(--dsw-alias-interactive-bg-hover) disabled:opacity-50 disabled:cursor-default",
						disabled: props.disabled,
						"aria-haspopup": "menu",
						"aria-expanded": open,
						onClick: () => {
							setOpen((v) => !v);
						},
						children: [active, /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconChevronDownOutline14, {})]
					})
				})]
			});
		}
		function makeSettingsCard(kit) {
			const { t } = kit;
			return function SettingsCard(props) {
				const [open, setOpen] = (0, react.useState)(false);
				const itemRef = (0, react.useRef)(null);
				(0, react.useEffect)(() => {
					if (!consumeCardExpand()) return;
					setOpen(true);
					try {
						itemRef.current?.scrollIntoView({ block: "nearest" });
					} catch {}
				}, []);
				const state = typeof props.useContextSettings === "function" ? props.useContextSettings((s) => s) : void 0;
				if (state === void 0 || state.status === "unavailable") return null;
				const disabled = state.status !== "ready" || !state.writable;
				return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
					ref: itemRef,
					className: "lc-settings-card" + (open ? " lc-settings-open" : ""),
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "lc-settings-head",
						"aria-expanded": open,
						"aria-label": `${t(open ? "settings.collapse" : "settings.expand")}: ${t("settings.title")}`,
						onClick: () => {
							setOpen(!open);
						},
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
							className: "lc-settings-headtext",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "lc-settings-name",
								children: t("settings.title")
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "lc-settings-desc",
								children: t("settings.desc")
							})]
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconChevronDownOutline14, { className: "lc-settings-chevron" })]
					}), open ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "lc-settings-body",
						children: [
							!state.writable && state.status === "ready" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: "lc-settings-note",
								role: "status",
								children: t("settings.readOnly")
							}) : null,
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(PrefRow, {
								label: t("settings.placement"),
								value: state.placement,
								disabled,
								options: [
									{
										id: "all",
										label: t("placement.all")
									},
									{
										id: "tab",
										label: t("placement.tab")
									},
									{
										id: "sidebar",
										label: t("placement.sidebar")
									}
								],
								onPick: (id) => {
									props.set?.("defaultPlacement", id);
								}
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(PrefRow, {
								label: t("settings.insightsEntry"),
								value: state.insightsEntry,
								disabled,
								options: [{
									id: "show",
									label: t("insightsEntry.show")
								}, {
									id: "hide",
									label: t("insightsEntry.hide")
								}],
								onPick: (id) => {
									props.set?.("insightsEntry", id);
								}
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(PrefRow, {
								label: t("settings.gran"),
								value: state.granularity,
								disabled,
								options: [{
									id: "step",
									label: t("gran.step")
								}, {
									id: "turn",
									label: t("gran.turn")
								}],
								onPick: (id) => {
									props.set?.("defaultGranularity", id);
								}
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(PrefRow, {
								label: t("settings.mode"),
								value: state.mode,
								disabled,
								options: [{
									id: "total",
									label: t("gran.total")
								}, {
									id: "delta",
									label: t("gran.delta")
								}],
								onPick: (id) => {
									props.set?.("defaultTrendMode", id);
								}
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(PrefRow, {
								label: t("settings.toolSort"),
								value: state.toolSort,
								disabled,
								options: [
									{
										id: "size",
										label: t("tool.sort.size")
									},
									{
										id: "count",
										label: t("tool.sort.count")
									},
									{
										id: "name",
										label: t("tool.sort.name")
									}
								],
								onPick: (id) => {
									props.set?.("defaultToolSort", id);
								}
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(PrefRow, {
								label: t("settings.fileSort"),
								value: state.fileSort,
								disabled,
								options: [
									{
										id: "count",
										label: t("files.sort.count")
									},
									{
										id: "latest",
										label: t("files.sort.latest")
									},
									{
										id: "path",
										label: t("files.sort.path")
									}
								],
								onPick: (id) => {
									props.set?.("defaultFileSort", id);
								}
							})
						]
					}) : null]
				});
			};
		}
		//#endregion
		//#region src/client/settings.ts
		function prefsOf(value) {
			if (value === null || typeof value !== "object") return {};
			const v = value;
			return {
				...v.defaultPlacement === "all" || v.defaultPlacement === "tab" || v.defaultPlacement === "sidebar" ? { placement: v.defaultPlacement } : {},
				...v.defaultGranularity === "step" || v.defaultGranularity === "turn" ? { granularity: v.defaultGranularity } : {},
				...v.defaultTrendMode === "total" || v.defaultTrendMode === "delta" ? { mode: v.defaultTrendMode } : {},
				...v.defaultToolSort === "size" || v.defaultToolSort === "count" || v.defaultToolSort === "name" ? { toolSort: v.defaultToolSort } : {},
				...v.defaultFileSort === "count" || v.defaultFileSort === "latest" || v.defaultFileSort === "path" ? { fileSort: v.defaultFileSort } : {},
				...v.insightsEntry === "show" || v.insightsEntry === "hide" ? { insightsEntry: v.insightsEntry } : {}
			};
		}
		function createContextSettings() {
			let state = {
				status: "loading",
				placement: "all",
				granularity: "step",
				mode: "total",
				toolSort: "count",
				fileSort: "count",
				insightsEntry: "show",
				writable: false
			};
			let scope;
			const listeners = /* @__PURE__ */ new Set();
			const publish = (next) => {
				if (next.status === state.status && next.placement === state.placement && next.granularity === state.granularity && next.mode === state.mode && next.toolSort === state.toolSort && next.fileSort === state.fileSort && next.insightsEntry === state.insightsEntry && next.writable === state.writable) return;
				state = next;
				for (const listener of listeners) listener();
			};
			const sync = (bound) => {
				const snap = bound.getSnapshot();
				const prefs = prefsOf(snap.value);
				const raw = snap.value !== null && typeof snap.value === "object" ? snap.value : void 0;
				publish({
					status: snap.status === "ready" || snap.status === "unavailable" ? snap.status : "loading",
					placement: prefs.placement ?? (raw?.defaultPlacement === void 0 ? state.placement : "all"),
					granularity: prefs.granularity ?? state.granularity,
					mode: prefs.mode ?? state.mode,
					toolSort: prefs.toolSort ?? state.toolSort,
					fileSort: prefs.fileSort ?? state.fileSort,
					insightsEntry: prefs.insightsEntry ?? (raw?.insightsEntry === void 0 ? state.insightsEntry : "show"),
					writable: snap.writable
				});
				return {
					placement: prefs.placement,
					insightsEntry: prefs.insightsEntry
				};
			};
			return {
				store: {
					subscribe(listener) {
						listeners.add(listener);
						return () => {
							listeners.delete(listener);
						};
					},
					getSnapshot: () => state
				},
				defaultPlacement: () => state.placement,
				defaultGranularity: () => state.granularity,
				defaultTrendMode: () => state.mode,
				defaultToolSort: () => state.toolSort,
				defaultFileSort: () => state.fileSort,
				insightsEntry: () => state.insightsEntry,
				attach(bound) {
					scope = bound;
					sync(bound);
					return bound.subscribe(() => {
						sync(bound);
					});
				},
				set(field, value) {
					publish({
						...state,
						...prefsOf({ [field]: value })
					});
					const bound = scope;
					if (bound === void 0) return;
					bound.set(field, value).catch(() => {
						const truth = sync(bound);
						if (field === "defaultPlacement" && truth.placement === void 0) publish({
							...state,
							placement: "all"
						});
						if (field === "insightsEntry" && truth.insightsEntry === void 0) publish({
							...state,
							insightsEntry: "show"
						});
					});
				}
			};
		}
		//#endregion
		//#region src/client/brief.ts
		/** Every served node (live tail + removed archive copies), seq-sorted. */
		function briefNodes(data) {
			return [...data.nodes, ...data.archive].sort((a, b) => a.seq - b.seq);
		}
		/** First index whose node seq is >= `seq` (lower bound over the sorted list). */
		function lowerBound(nodes, seq) {
			let lo = 0;
			let hi = nodes.length;
			while (lo < hi) {
				const mid = lo + hi >> 1;
				if (nodes[mid].seq < seq) lo = mid + 1;
				else hi = mid;
			}
			return lo;
		}
		/**
		* Derive the brief for `requests[idx]` (the DISPLAY list — step records or
		* turn aggregates; a turn aggregate is always a turn start, so its inputs row
		* stays hidden and the opener/response carry the narrative).
		*/
		function briefOf(nodes, requests, idx) {
			if (idx < 0 || idx >= requests.length) return null;
			const req = requests[idx];
			const ri = lowerBound(nodes, req.seq);
			const hit = ri < nodes.length && nodes[ri].seq === req.seq ? nodes[ri] : void 0;
			const response = hit !== void 0 && hit.cat === "assistant" ? hit : void 0;
			const turnStart = idx === 0 || (requests[idx - 1].turn ?? 0) !== (req.turn ?? 0);
			let firstIdx = idx;
			while (firstIdx > 0 && (requests[firstIdx - 1].turn ?? 0) === (req.turn ?? 0)) firstIdx--;
			const upper = requests[firstIdx].seq;
			const lower = firstIdx > 0 ? requests[firstIdx - 1].seq : -1;
			let opener;
			for (let i = lowerBound(nodes, upper) - 1; i >= 0; i--) {
				const n = nodes[i];
				if (n.seq <= lower) break;
				if (n.cat === "user") {
					opener = n;
					break;
				}
			}
			const inputs = [];
			if (!turnStart) {
				const prevSeq = requests[idx - 1].seq;
				for (let i = lowerBound(nodes, prevSeq + 1); i < nodes.length && nodes[i].seq < req.seq; i++) inputs.push(nodes[i]);
			}
			return {
				opener,
				inputs,
				response
			};
		}
		//#endregion
		//#region src/client/fileActivity.ts
		/** The file's form — multimodal reads and image extensions scan apart; a trailing slash marks a directory target. */
		function formOf(tool, path) {
			if (tool === "read_image" || IMAGE_EXT.test(path)) return "image";
			if (path.endsWith("/")) return "dir";
			return "text";
		}
		const IMAGE_EXT = /\.(png|jpe?g|gif|webp|svg|bmp|ico|avif)$/i;
		/** Directory buckets, by last path segment (lowercased, explicit plurals). Checked in order, then hidden dirs, then the plain folder. */
		const DIR_BUCKETS = [
			[
				[
					"test",
					"tests",
					"__tests__",
					"spec",
					"specs",
					"e2e"
				],
				"🧪",
				"files.glyph.tests"
			],
			[
				[
					"doc",
					"docs",
					"documentation"
				],
				"📚",
				"files.glyph.docs"
			],
			[
				[
					"node_modules",
					"vendor",
					"third_party",
					"third-party",
					"packages"
				],
				"📦",
				"files.glyph.deps"
			],
			[
				[
					"dist",
					"build",
					"out",
					"target",
					"release",
					"debug",
					"coverage",
					"artifacts"
				],
				"🏗️",
				"files.glyph.build"
			],
			[
				[
					"scripts",
					"tools",
					"bin"
				],
				"🛠️",
				"files.glyph.scripts"
			],
			[
				[
					"config",
					"configs",
					"settings",
					".config"
				],
				"⚙️",
				"files.glyph.config"
			],
			[
				[
					"assets",
					"static",
					"public",
					"images",
					"fonts",
					"icons",
					"media"
				],
				"🎨",
				"files.glyph.assets"
			]
		];
		/** Lockfile base names that do not end in `.lock`. */
		const LOCK_NAMES = [
			"package-lock.json",
			"pnpm-lock.yaml",
			"npm-shrinkwrap.json"
		];
		const MAKE_NAMES = [
			"makefile",
			"justfile",
			"cmakelists.txt"
		];
		/** A test file by name: a standalone or delimited `test`, or an inline `.test.`. */
		const TEST_NAME = /(^|[^a-z0-9])test([^a-z0-9]|$)|\.test\./;
		/**
		* Programming-language files render as letter badges over their language's
		* color (GitHub Linguist shades). Checked before the emoji buckets, so a
		* language file never falls through to one.
		*/
		const CODE_LANGS = [
			[
				["tsx"],
				"TSX",
				"#3178c6",
				"files.glyph.lang.ts"
			],
			[
				["ts"],
				"TS",
				"#3178c6",
				"files.glyph.lang.ts"
			],
			[
				[
					"js",
					"jsx",
					"mjs",
					"cjs"
				],
				"JS",
				"#f7df1e",
				"files.glyph.lang.js"
			],
			[
				[
					"py",
					"pyi",
					"pyw"
				],
				"PY",
				"#3572a5",
				"files.glyph.python"
			],
			[
				["ipynb"],
				"NB",
				"#da5b0b",
				"files.glyph.notebook"
			],
			[
				["go"],
				"GO",
				"#00add8",
				"files.glyph.lang.go"
			],
			[
				["rs"],
				"RS",
				"#dea584",
				"files.glyph.lang.rust"
			],
			[
				["java"],
				"JV",
				"#b07219",
				"files.glyph.lang.java"
			],
			[
				["kt", "kts"],
				"KT",
				"#a97bff",
				"files.glyph.lang.kotlin"
			],
			[
				["rb"],
				"RB",
				"#701516",
				"files.glyph.lang.ruby"
			],
			[
				["php"],
				"PHP",
				"#4f5d95",
				"files.glyph.lang.php"
			],
			[
				["c", "h"],
				"C",
				"#555555",
				"files.glyph.lang.c"
			],
			[
				[
					"cpp",
					"cc",
					"cxx",
					"hpp"
				],
				"C++",
				"#f34b7d",
				"files.glyph.lang.cpp"
			],
			[
				["cs"],
				"C#",
				"#178600",
				"files.glyph.lang.csharp"
			],
			[
				["scala"],
				"SC",
				"#c22d40",
				"files.glyph.lang.scala"
			],
			[
				["lua"],
				"LUA",
				"#000080",
				"files.glyph.lang.lua"
			],
			[
				["dart"],
				"DA",
				"#00b4ab",
				"files.glyph.lang.dart"
			],
			[
				["swift"],
				"SW",
				"#f05138",
				"files.glyph.lang.swift"
			],
			[
				["vue"],
				"VUE",
				"#41b883",
				"files.glyph.lang.vue"
			],
			[
				["svelte"],
				"SV",
				"#ff3e00",
				"files.glyph.lang.svelte"
			],
			[
				[
					"sh",
					"bash",
					"zsh",
					"fish",
					"ps1"
				],
				"SH",
				"#89e051",
				"files.glyph.shell"
			],
			[
				[
					"html",
					"htm",
					"xhtml"
				],
				"HT",
				"#e34c26",
				"files.glyph.lang.html"
			],
			[
				[
					"css",
					"scss",
					"sass",
					"less",
					"styl"
				],
				"CSS",
				"#563d7c",
				"files.glyph.style"
			],
			[
				["sql"],
				"SQL",
				"#e38c00",
				"files.glyph.database"
			]
		];
		/**
		* Badge text by fill luminance: white on dark shades, near-black on light
		* ones (the JS yellow, the shell green) — a fixed dark tone, never pure
		* black, so it sits quietly next to the white badges.
		*/
		function badgeTextColor(hex) {
			const n = parseInt(hex.slice(1), 16);
			return (.299 * (n >> 16 & 255) + .587 * (n >> 8 & 255) + .114 * (n & 255)) / 255 < .6 ? "#ffffff" : "#1f2328";
		}
		/** Extension buckets for non-code files, most specific first. */
		const EXT_BUCKETS = [
			[
				[
					"yaml",
					"yml",
					"toml",
					"ini",
					"conf",
					"cfg",
					"properties",
					"env"
				],
				"⚙️",
				"files.glyph.config"
			],
			[
				[
					"json",
					"jsonc",
					"json5",
					"jsonl",
					"ndjson",
					"xml"
				],
				"🧾",
				"files.glyph.data"
			],
			[
				[
					"md",
					"mdx",
					"markdown",
					"rst",
					"adoc",
					"org"
				],
				"📝",
				"files.glyph.markdown"
			],
			[
				["log"],
				"📜",
				"files.glyph.log"
			],
			[
				[
					"csv",
					"tsv",
					"xls",
					"xlsx",
					"ods"
				],
				"📊",
				"files.glyph.sheet"
			],
			[
				[
					"pdf",
					"doc",
					"docx",
					"odt",
					"rtf"
				],
				"📕",
				"files.glyph.document"
			],
			[
				[
					"zip",
					"gz",
					"tgz",
					"tar",
					"bz2",
					"xz",
					"7z",
					"rar",
					"jar"
				],
				"🗜️",
				"files.glyph.archive"
			],
			[
				[
					"ttf",
					"otf",
					"woff",
					"woff2",
					"eot"
				],
				"🔤",
				"files.glyph.font"
			],
			[
				[
					"mp4",
					"mov",
					"mkv",
					"webm",
					"mp3",
					"wav",
					"flac",
					"ogg"
				],
				"🎬",
				"files.glyph.media"
			]
		];
		function dirGlyph(base) {
			if (base === "" || base === ".") return {
				glyph: "🏠",
				tip: "files.glyph.root"
			};
			const name = base.toLowerCase();
			for (const [names, glyph, tip] of DIR_BUCKETS) if (names.includes(name)) return {
				glyph,
				tip
			};
			if (name.startsWith(".")) return {
				glyph: "🗄️",
				tip: "files.glyph.hidden"
			};
			return {
				glyph: "📁",
				tip: "files.form.dir"
			};
		}
		function fileGlyph(base) {
			const name = base.toLowerCase();
			const dot = name.lastIndexOf(".");
			const ext = dot > 0 ? name.slice(dot + 1) : "";
			if (name.endsWith(".lock") || LOCK_NAMES.includes(name)) return {
				glyph: "🔒",
				tip: "files.glyph.lock"
			};
			if (TEST_NAME.test(name)) return {
				glyph: "🧪",
				tip: "files.glyph.tests"
			};
			if (name === "dockerfile" || name.startsWith("dockerfile.")) return {
				glyph: "🐳",
				tip: "files.glyph.docker"
			};
			if (MAKE_NAMES.includes(name)) return {
				glyph: "🛠️",
				tip: "files.glyph.scripts"
			};
			if (name === ".gitignore" || name === ".gitattributes") return {
				glyph: "🚫",
				tip: "files.glyph.ignore"
			};
			if (name === "license" || name.startsWith("license.") || name === "copying") return {
				glyph: "⚖️",
				tip: "files.glyph.license"
			};
			if (name === ".env" || name.startsWith(".env.")) return {
				glyph: "⚙️",
				tip: "files.glyph.config"
			};
			if (ext !== "") {
				for (const [exts, label, color, tip] of CODE_LANGS) if (exts.includes(ext)) return {
					glyph: label,
					tip,
					color,
					text: badgeTextColor(color)
				};
				for (const [exts, glyph, tip] of EXT_BUCKETS) if (exts.includes(ext)) return {
					glyph,
					tip
				};
			}
			return {
				glyph: "📄",
				tip: "files.form.text"
			};
		}
		/** The row icon for one file entry: form first (image/dir), then the file-name tables. */
		function glyphOf(path, form) {
			if (form === "image") return {
				glyph: "🖼",
				tip: "files.form.image"
			};
			const trimmed = path.endsWith("/") ? path.slice(0, -1) : path;
			const base = trimmed.slice(trimmed.lastIndexOf("/") + 1);
			return form === "dir" ? dirGlyph(base) : fileGlyph(base);
		}
		const DRIVE_PATH = /^[a-zA-Z]:[\\/]/;
		/**
		* The absolute form of a real file path: verbatim when already absolute,
		* resolved against the workspace root when relative, and undefined when a
		* relative path has no root to resolve against (the system open can't reach
		* it). Callers keep search-pattern "paths" away from here.
		*/
		function absPathOf(path, workspace) {
			if (path.startsWith("/") || DRIVE_PATH.test(path)) return path;
			if (workspace === void 0 || workspace === "" || path.startsWith(".")) return void 0;
			return workspace.replace(/\/+$/, "") + "/" + path.replace(/^\/+/, "");
		}
		/**
		* The right-Sidebar preview address of a real file — the session-scoped
		* `dsh-resource://file/…` address the shipped preview type claims, built by
		* the harness's own `fileAddressFor` (the files sidebar's idiom: a path under
		* the workspace collapses to its session-relative spelling, so every route to
		* one file settles on one tab). Undefined for a pathless search's PATTERN, a
		* directory target, a missing session, and any path the encoder rejects — the
		* caller falls back to the system opener or renders the name inert.
		*/
		function previewAddressOf(path, form, pattern, sessionId, workspace) {
			if (pattern === true || form === "dir" || sessionId === void 0 || sessionId === "") return void 0;
			try {
				return fileAddressFor(sessionId, workspace, path);
			} catch {
				return;
			}
		}
		/**
		* The row's display form of a path: inside the workspace (or already
		* workspace-relative) it shortens to a './'-prefixed relative — an absolute
		* path outside the workspace, a Windows drive path, and an already-'.'
		* relative keep their verbatim form.
		*/
		function displayPathOf(path, workspace) {
			const root = workspace !== void 0 && workspace.length > 1 ? workspace.replace(/\/+$/, "") : void 0;
			if (root !== void 0) {
				if (path === root) return "./";
				if (path.startsWith(root + "/")) return "./" + path.slice(root.length + 1);
			}
			if (path.startsWith("/") || DRIVE_PATH.test(path) || path.startsWith(".")) return path;
			return "./" + path;
		}
		/**
		* Fold op records into per-file activity: scope-filtered, aggregated per
		* path, ops newest first. The presentation half of the card — the parsing
		* is the shared parser's (shared/fileOps.ts), however the records arrived.
		*/
		function aggregateOps(ops, before) {
			const totals = {
				read: {
					files: 0,
					ops: 0
				},
				write: {
					files: 0,
					ops: 0
				},
				search: {
					files: 0,
					ops: 0
				},
				image: {
					files: 0,
					ops: 0
				},
				added: 0,
				removed: 0
			};
			const byPath = /* @__PURE__ */ new Map();
			for (const op of ops) {
				const key = op.parent ?? op.seq;
				if (before !== null && key >= before) continue;
				totals[op.kind].ops++;
				let entry = byPath.get(op.path);
				if (entry === void 0) {
					entry = {
						path: op.path,
						form: formOf(op.tool, op.path),
						reads: 0,
						writes: 0,
						searches: 0,
						added: 0,
						removed: 0,
						errs: 0,
						ops: [],
						...op.pattern === true ? { pattern: true } : {}
					};
					byPath.set(op.path, entry);
				}
				if (op.kind === "read") entry.reads++;
				else if (op.kind === "write") entry.writes++;
				else entry.searches++;
				entry.added += op.added;
				entry.removed += op.removed;
				if (op.err) entry.errs++;
				entry.ops.push(op);
			}
			const entries = [...byPath.values()];
			for (const e of entries) {
				e.ops.sort((a, b) => b.seq - a.seq);
				if (e.reads > 0) totals.read.files++;
				if (e.writes > 0) totals.write.files++;
				if (e.searches > 0) totals.search.files++;
				if (e.form === "image") {
					totals.image.files++;
					totals.image.ops += e.ops.length;
				}
				totals.added += e.added;
				totals.removed += e.removed;
			}
			entries.sort((a, b) => b.ops[0].seq - a.ops[0].seq);
			return {
				entries,
				totals
			};
		}
		/**
		* The op-log generation's read of the card: the fold-derived records (the
		* detail payload's `fileOps`), with `gone` joined from the detail's archive
		* at render time (the op's result node leaving the live surface bounds where
		* its content stays viewable — the locate bridge reads it).
		*/
		function activityOfOps(ops, archive, before) {
			const goneBySeq = /* @__PURE__ */ new Map();
			for (const n of archive) if (n.gone !== void 0) goneBySeq.set(n.seq, n.gone);
			return aggregateOps(ops.map((op) => {
				const gone = goneBySeq.get(op.parent ?? op.seq);
				return gone !== void 0 && op.gone === void 0 ? {
					...op,
					gone
				} : op;
			}), before);
		}
		/**
		* Narrow one block of a conversation node's `subCalls` tree to a settled
		* nested call, or null. The join is defensive — a running call has no result
		* kind yet, and any malformed block is dropped, never thrown. (Null and
		* non-object blocks never reach here: the folding loop pre-filters them.)
		*/
		function subCallOf(block) {
			const b = block;
			if (b.kind !== "tool-result") return null;
			if (b.call === null || typeof b.call !== "object") return null;
			const call = b.call;
			if (typeof call.name !== "string" || typeof call.argsRaw !== "string") return null;
			if (typeof b.seq !== "number" || !Number.isFinite(b.seq)) return null;
			return {
				name: call.name,
				argsRaw: call.argsRaw,
				seq: b.seq,
				...typeof b.time === "number" ? { time: b.time } : {},
				...b.isError === true ? { err: true } : { err: false },
				...Array.isArray(b.subCalls) ? { subCalls: b.subCalls } : {}
			};
		}
		/** The run_code call's model-authored description — the nested ops' "why". */
		function programOf(conv) {
			const description = parseCallArgs(conv?.call?.argsRaw)?.description;
			return typeof description === "string" && description !== "" ? description : void 0;
		}
		/**
		* Depth guard for nested Code-Mode trees. The SDK bindings exclude `run_code`
		* itself, so a real tree is one level deep; the cap only bounds defensive
		* re-entry over a malformed join.
		*/
		const SUBCALL_MAX_DEPTH = 8;
		/**
		* The legacy nested walk: every settled sub-dispatch whose arguments resolve
		* to a file target books one op, attributed to the nested tool and located
		* on the parent run_code result. `seen` holds the already-visited blocks, so
		* a malformed (cyclic) join cannot loop.
		*/
		function foldSubCalls(blocks, parent, program, ops, seen, depth) {
			if (depth > SUBCALL_MAX_DEPTH) return;
			for (const block of blocks) {
				if (block === null || typeof block !== "object" || seen.has(block)) continue;
				seen.add(block);
				const sub = subCallOf(block);
				if (sub !== null) {
					ops.push(...opsOfCall({
						seq: sub.seq,
						tool: sub.name,
						argsRaw: sub.argsRaw,
						err: sub.err,
						...sub.time !== void 0 ? { time: sub.time } : {},
						...parent.gone !== void 0 ? { gone: parent.gone } : {},
						parent: parent.seq,
						...program !== void 0 ? { program } : {}
					}));
					if (sub.subCalls !== void 0) foldSubCalls(sub.subCalls, parent, program, ops, seen, depth + 1);
				}
			}
		}
		/**
		* The INLINE generation's derivation: ops from the served tool-result nodes
		* joined with the conversation window (arguments/meta live on the join —
		* window-bound; the op-log generation covers the full session instead).
		* One node's join data can never take the card down: anything that throws
		* while folding it drops that node and the walk carries on.
		*/
		function activityOf(nodes, convOf, before) {
			const ops = [];
			for (const n of nodes) {
				if (n.cat !== "tool") continue;
				if (before !== null && n.seq >= before) continue;
				const tool = n.tool;
				if (tool === void 0) continue;
				try {
					const conv = convOf(n.seq);
					ops.push(...opsOfCall({
						seq: n.seq,
						tool,
						argsRaw: conv?.call?.argsRaw,
						meta: conv?.meta,
						err: n.err === true || conv?.isError === true,
						...n.time !== void 0 ? { time: n.time } : {},
						...n.gone !== void 0 ? { gone: n.gone } : {}
					}));
					const subCalls = conv?.subCalls;
					if (subCalls !== void 0 && subCalls.length > 0) foldSubCalls(subCalls, n, programOf(conv), ops, /* @__PURE__ */ new Set(), 1);
				} catch {}
			}
			return aggregateOps(ops, null);
		}
		/**
		* The browser step whose assembled surface SHOWS an op's result node: the
		* first request dispatched after it while it was still alive (that step's
		* brief is where the result landed). A live node no request has consumed
		* yet reveals on the live surface; an archived node no retained step still
		* contains is not viewable anywhere (null → the row stays inert).
		*/
		function locateStepOf(requests, seq, gone) {
			for (const r of requests) if (r.seq > seq && (gone === void 0 || gone > r.seq)) return r.seq;
			return gone === void 0 ? "live" : null;
		}
		//#endregion
		//#region src/client/agentHeads.ts
		/**
		* The sessions-feed plumbing shared by the session-list consumers — the
		* Agent network card (agentGraph.tsx) and the stats board's subagent-cost
		* cell (statsContext.tsx): the list-snapshot React seat, and the page-scope
		* cache of cold-relative slim-head fetches.
		*
		* The cache: one in-flight-or-settled promise per session id for the
		* factory's lifetime (page scope). A settled null — transport failure,
		* hostile payload, route absent, session left the live set — is sticky, so a
		* broken relative never retries per snapshot tick. One cache serves every
		* consumer, so a relative's head is fetched once no matter how many cards
		* read it.
		*/
		/** One page-scope fetch cache, shared by every consumer the caller wires it into. */
		function makeAgentHeads(ctx) {
			const heads = /* @__PURE__ */ new Map();
			return { headOf(id) {
				const cached = heads.get(id);
				if (cached !== void 0) return cached;
				const fetcher = makeDetailFetcher(ctx, id);
				const pending = fetcher !== void 0 ? fetcher().then((d) => d?.head ?? null) : Promise.resolve(null);
				heads.set(id, pending);
				return pending;
			} };
		}
		/** The session-list snapshot as a React seat (null without the face). */
		function useSessionsSnapshot(face) {
			const subscribe = (0, react.useCallback)((fn) => {
				if (face === null) return () => {};
				/* v8 ignore next 2 -- sessionsFaceOf returns a face only after proving list.subscribe. */
				if (face.list === void 0) return () => {};
				return face.list.subscribe(fn);
			}, [face]);
			const getSnapshot = (0, react.useCallback)(() => {
				if (face === null) return null;
				/* v8 ignore next 2 -- sessionsFaceOf proves list before returning the face. */
				if (face.list === void 0) return null;
				return face.list.getSnapshot();
			}, [face]);
			return (0, react.useSyncExternalStore)(subscribe, getSnapshot);
		}
		const SLOT_MAX = 184;
		const SLOT_MIN = 112;
		const CAPTION_GUTTER = 8;
		const LEVEL_H = 154;
		const CELL_H = 90;
		const PAD_Y = 56;
		/** Narrow one list-row value; null when it is not a row at all. */
		function agentRowOf(value) {
			const rec = asRecord(value);
			if (rec === null) return null;
			const projections = asRecord(rec.projectionValues);
			return {
				...typeof rec.displayTitle === "string" ? { displayTitle: rec.displayTitle } : {},
				...typeof rec.title === "string" ? { title: rec.title } : {},
				...typeof rec.parentId === "string" ? { parentId: rec.parentId } : {},
				...typeof rec.origin === "string" ? { origin: rec.origin } : {},
				running: rec.running === true,
				completed: rec.completed === true,
				blank: rec.blank === true,
				updatedAt: numOf(rec.updatedAt),
				...projections !== null ? { projections } : {}
			};
		}
		/** Narrow the subagent identity projection value (null = not a descriptor-backed subagent). */
		function agentIdentityOf(value) {
			const rec = asRecord(value);
			if (rec === null) return null;
			if (rec.mode !== "one-shot" && rec.mode !== "continuable") return null;
			return {
				mode: rec.mode,
				...typeof rec.label === "string" && rec.label !== "" ? { label: rec.label } : {}
			};
		}
		/** Narrow the subagent timing projection value into a single duration (null = absent/malformed). */
		function agentDurationOf(value) {
			const rec = asRecord(value);
			if (rec === null) return null;
			const settled = numOf(rec.settledMs);
			const active = asRecord(rec.active);
			const total = settled + (active !== null ? Math.max(0, numOf(active.through) - numOf(active.since)) : 0);
			return total > 0 ? total : null;
		}
		/**
		* Fold one row's projection values into render-ready stats. The composition
		* prefers the plugin's own `contextTimeline` (six buckets, provider-anchored
		* by token-meter's pressure/breakdown — the exact headlineOf derivation the
		* overview card shows); a pressure-only row (plugin host half absent for that
		* session) still yields an occupancy ring without slices.
		*/
		function agentStatsOf(values) {
			const timeline = timelineOf(values?.contextTimeline);
			const pressure = contextPressureOf(values?.contextPressure);
			const breakdown = contextBreakdownOf(values?.contextBreakdown);
			const usage = tokenUsageOf(values?.tokenUsage);
			let head = null;
			if (timeline !== null) head = headlineOf(timeline, pressure, breakdown);
			else if (pressure !== null) {
				const tokens = typeof pressure.projectedTokens === "number" ? pressure.projectedTokens : typeof pressure.pressureTokens === "number" ? pressure.pressureTokens : null;
				if (tokens !== null) {
					const window = typeof pressure.contextWindow === "number" && pressure.contextWindow > 0 ? pressure.contextWindow : void 0;
					head = {
						tokens,
						window,
						pct: window !== void 0 ? Math.min(100, Math.round(tokens / window * 100)) : null,
						parts: []
					};
				}
			}
			const billed = usage !== null ? numOf(usage.uncachedInputTokens) + numOf(usage.outputTokens) + numOf(usage.cacheReadTokens) + numOf(usage.cacheWriteTokens) : null;
			return {
				head,
				requests: timeline !== null ? timeline.counts?.steps ?? timeline.requests.length : 0,
				billed,
				durationMs: agentDurationOf(values?.subagentTiming),
				identity: agentIdentityOf(values?.subagent)
			};
		}
		/**
		* Build the current session's agent family from a session-list snapshot:
		* walk up `parentId` to the topmost known ancestor, then DFS its whole
		* subtree (blank placeholder rows excluded). Null when there is no anchor —
		* no current session, or a snapshot without a `byId` table (older harness).
		* The current session synthesizes a row when the list has not delivered it
		* yet, so the card can still show its live self stats.
		* @param fetched - detail-channel heads for COLD rows, keyed by session id.
		*   The host's list block serves projection values only from the projection
		*   cache, so a relative that never attached since the timeline unit last
		*   changed lists pressure-only (no composition row) and its ring would
		*   degrade to the occupancy arc; the card fetches those heads on demand.
		*   A row's own value always wins — the injection lands only on rows whose
		*   `contextTimeline` is absent.
		*/
		function agentForestOf(snapshot, currentId, self, fetched) {
			const byId = asRecord(asRecord(snapshot)?.byId);
			if (byId === null || currentId === void 0 || currentId === "") return null;
			const rows = /* @__PURE__ */ new Map();
			for (const key of Object.keys(byId)) {
				const row = agentRowOf(byId[key]);
				if (row !== null && (!row.blank || key === currentId)) rows.set(key, row);
			}
			if (!rows.has(currentId)) rows.set(currentId, {
				running: false,
				completed: false,
				blank: false,
				updatedAt: 0
			});
			let root = currentId;
			const chain = /* @__PURE__ */ new Set([currentId]);
			for (;;) {
				const parent = rows.get(root)?.parentId;
				if (parent === void 0 || !rows.has(parent) || chain.has(parent)) break;
				chain.add(parent);
				root = parent;
			}
			const rootRow = rows.get(root);
			/* v8 ignore next 2 -- root is currentId (inserted above) or a parent
			verified with rows.has, so its row always exists. */
			if (rootRow === void 0) return null;
			const childrenOf = /* @__PURE__ */ new Map();
			for (const [id, row] of rows) {
				if (row.parentId === void 0 || !rows.has(row.parentId)) continue;
				const list = childrenOf.get(row.parentId) ?? [];
				list.push({
					id,
					row
				});
				childrenOf.set(row.parentId, list);
			}
			for (const kids of childrenOf.values()) kids.sort((a, b) => {
				const runDelta = Number(b.row.running) - Number(a.row.running);
				if (runDelta !== 0) return runDelta;
				const timeDelta = b.row.updatedAt - a.row.updatedAt;
				return timeDelta !== 0 ? timeDelta : a.id < b.id ? -1 : 1;
			});
			const measure = (id, seen) => {
				if (seen.has(id)) return 0;
				seen.add(id);
				let total = 1;
				for (const kid of childrenOf.get(id) ?? []) total += measure(kid.id, seen);
				return total;
			};
			const total = measure(root, /* @__PURE__ */ new Set());
			const nodes = [];
			const edges = [];
			const visit = (id, row, parentId, depth, seen, family) => {
				if (seen.has(id) || nodes.length >= 25) return;
				seen.add(id);
				const values = row.projections;
				const fetchedHead = fetched !== void 0 ? fetched.get(id) : void 0;
				const stats = agentStatsOf(fetchedHead !== void 0 && values?.contextTimeline === void 0 ? {
					...values,
					contextTimeline: fetchedHead
				} : values);
				const identity = stats.identity;
				const node = {
					...stats,
					id,
					label: identity?.label ?? row.title ?? row.displayTitle ?? id,
					...parentId !== void 0 ? { parentId } : {},
					depth,
					family,
					isCurrent: id === currentId,
					running: row.running,
					completed: row.completed,
					subagent: row.origin === "subagent" || identity !== null
				};
				if (node.isCurrent && self !== void 0) {
					node.head = self.head ?? node.head;
					node.billed = self.billed ?? node.billed;
					node.requests = self.requests > 0 ? self.requests : node.requests;
				}
				nodes.push(node);
				if (parentId !== void 0) edges.push({
					from: parentId,
					to: id
				});
				(childrenOf.get(id) ?? []).forEach((kid, ki) => {
					visit(kid.id, kid.row, id, depth + 1, seen, depth === 0 ? ki : family);
				});
			};
			visit(root, rootRow, void 0, 0, /* @__PURE__ */ new Set(), -1);
			return {
				nodes,
				edges,
				overflow: Math.max(0, total - nodes.length),
				solo: nodes.length === 1
			};
		}
		/**
		* Merge the current session's SUBAGENT subtree cost: every descendant
		* session's own cumulative billed-token usage, warm rows' `contextTimeline`
		* cost first, fetched slim heads (the `landed` map, keyed by session id)
		* standing in for rows that carry no timeline value. Blank placeholder rows
		* are not agents (the family forest's rule); a lineage cycle cannot loop the
		* walk (seen-set). The current session itself is never counted — the caller
		* already holds its own usage.
		*/
		function subagentCostFoldOf(snapshot, currentId, landed) {
			const byId = asRecord(asRecord(snapshot)?.byId);
			if (byId === null || currentId === void 0 || currentId === "") return {
				usage: null,
				cold: []
			};
			const childrenOf = /* @__PURE__ */ new Map();
			for (const key of Object.keys(byId)) {
				const row = agentRowOf(byId[key]);
				if (row === null || row.blank || row.parentId === void 0) continue;
				const list = childrenOf.get(row.parentId) ?? [];
				list.push(key);
				childrenOf.set(row.parentId, list);
			}
			const parts = [];
			const cold = [];
			const seen = /* @__PURE__ */ new Set([currentId]);
			const queue = [currentId];
			for (let i = 0; i < queue.length; i++) {
				const id = queue[i];
				for (const kid of childrenOf.get(id) ?? []) {
					if (seen.has(kid)) continue;
					seen.add(kid);
					const head = landed?.get(kid);
					const values = agentRowOf(byId[kid])?.projections;
					if (values?.contextTimeline === void 0) {
						if (head === void 0) cold.push(kid);
						else if (head.cost !== void 0) parts.push(head.cost);
					} else {
						const cost = timelineOf(values.contextTimeline)?.cost;
						if (cost !== void 0) parts.push(cost);
					}
					queue.push(kid);
				}
			}
			return {
				usage: parts.length > 0 ? mergeCostUsage(...parts) : null,
				cold
			};
		}
		/**
		* Tidy top-down tree layout: one row per depth level, siblings claim leaf
		* slots, parents center over their children. Fully responsive to the stage's
		* visible width: the slot pitch stretches up to SLOT_MAX and compresses down
		* to SLOT_MIN (captions wrap tighter); a level that still overflows wraps
		* into bands of at most a per-level node count derived from the stage width —
		* vertical room is cheaper than horizontal scrolling. Links exit a parent at
		* its cell bottom (below the caption zone) and enter the child at its top,
		* so a connector never crosses a label.
		*/
		function layoutForest(forest, stageWidth = 0) {
			const childrenOf = /* @__PURE__ */ new Map();
			for (const n of forest.nodes) {
				if (n.parentId === void 0) continue;
				const kids = childrenOf.get(n.parentId) ?? [];
				kids.push(n);
				childrenOf.set(n.parentId, kids);
			}
			const slotOf = /* @__PURE__ */ new Map();
			let leafSlots = 0;
			const place = (node) => {
				const kids = childrenOf.get(node.id) ?? [];
				if (kids.length === 0) {
					const slot = leafSlots;
					leafSlots++;
					slotOf.set(node.id, slot);
					return slot;
				}
				let first = 0;
				let last = 0;
				kids.forEach((kid, index) => {
					const slot = place(kid);
					if (index === 0) first = slot;
					last = slot;
				});
				const slot = (first + last) / 2;
				slotOf.set(node.id, slot);
				return slot;
			};
			/* v8 ignore next 1 -- a forest always holds at least the (possibly
			synthesized) current node. */
			if (forest.nodes.length > 0) place(forest.nodes[0]);
			const perLevel = stageWidth > 0 ? Math.max(2, Math.floor(stageWidth / SLOT_MIN)) : 0;
			if (perLevel > 0 && leafSlots > perLevel) {
				const bandSlot = Math.min(SLOT_MAX, stageWidth / perLevel);
				const width = perLevel * bandSlot;
				const points = [];
				let row = 0;
				const emitBand = (nodes, depth) => {
					const inset = (width - nodes.length * bandSlot) / 2;
					nodes.forEach((node, i) => {
						points.push({
							id: node.id,
							x: inset + (i + .5) * bandSlot,
							y: PAD_Y + row * LEVEL_H,
							depth
						});
					});
					row++;
					let band = [];
					const flush = () => {
						if (band.length === 0) return;
						const packed = band;
						band = [];
						emitBand(packed, depth + 1);
					};
					for (const node of nodes) {
						const kids = childrenOf.get(node.id) ?? [];
						for (let start = 0; start < kids.length; start += perLevel) {
							const group = kids.slice(start, start + perLevel);
							if (band.length + group.length > perLevel) flush();
							band.push(...group);
							if (band.length === perLevel) flush();
						}
					}
					flush();
				};
				/* v8 ignore next 1 -- a forest always holds at least the current node. */
				if (forest.nodes.length > 0) emitBand([forest.nodes[0]], 0);
				return {
					width,
					height: PAD_Y + (row - 1) * LEVEL_H + CELL_H + 28,
					captionW: bandSlot - CAPTION_GUTTER,
					points,
					links: linksOf(forest, points)
				};
			}
			const slot = stageWidth > 0 && leafSlots > 1 ? Math.min(SLOT_MAX, stageWidth / leafSlots) : SLOT_MAX;
			const points = forest.nodes.map((node) => ({
				id: node.id,
				/* v8 ignore next 1 -- place() visits every node: the forest is exactly
				the root's subtree by construction. */
				x: (slotOf.get(node.id) ?? 0) * slot + slot / 2,
				y: PAD_Y + node.depth * LEVEL_H,
				depth: node.depth
			}));
			const maxDepth = points.reduce((max, p) => Math.max(max, p.depth), 0);
			return {
				width: leafSlots * slot,
				height: PAD_Y + maxDepth * LEVEL_H + CELL_H + 28,
				captionW: slot - CAPTION_GUTTER,
				points,
				links: linksOf(forest, points)
			};
		}
		/**
		* Family hue by level-1 subtree index: the golden angle keeps consecutive
		* families maximally separated on the color wheel without a hand-tuned palette.
		*/
		function familyHue(index) {
			return `hsl(${Math.round(index * 137.508) % 360} 58% 52%)`;
		}
		/** Parent→child links: exit the parent's cell bottom, enter the child's top. */
		function linksOf(forest, points) {
			const pointOf = new Map(points.map((p) => [p.id, p]));
			const nodeOf = new Map(forest.nodes.map((n) => [n.id, n]));
			const runningIds = new Set(forest.nodes.filter((n) => n.running).map((n) => n.id));
			const links = [];
			for (const edge of forest.edges) {
				const from = pointOf.get(edge.from);
				const to = pointOf.get(edge.to);
				/* v8 ignore next 2 -- edges are emitted only for visited parent/child
				pairs, so both points always exist. */
				if (from === void 0 || to === void 0) continue;
				links.push({
					to: edge.to,
					running: runningIds.has(edge.to),
					/* v8 ignore next 1 -- edges only connect visited nodes. */
					color: familyHue(nodeOf.get(edge.to)?.family ?? 0),
					x1: from.x,
					y1: from.y + CELL_H,
					x2: to.x,
					y2: to.y - 26 - 10
				});
			}
			return links;
		}
		/**
		* One fused ring per agent — the exact semantics of the chat composer's own
		* context ring: the composition parts, scaled to the occupancy share of the
		* window, fill the circle, and a neutral remainder marks the free window.
		* With no known window the composition fills the whole circle; with no
		* composition (pressure-only rows) a single threshold-colored arc carries
		* the occupancy; a known window with zero occupancy draws the free outline.
		*/
		function ringSegments(parts, pct, radius, fallbackColor) {
			const circumference = 2 * Math.PI * radius;
			const occ = pct === null ? 1 : Math.min(100, Math.max(0, pct)) / 100;
			let total = 0;
			for (const p of parts) total += p.value > 0 ? p.value : 0;
			const segs = [];
			let offset = 0;
			if (total > 0) for (const p of parts) {
				if (p.value <= 0) continue;
				const len = circumference * (p.value / total) * occ;
				if (len <= 0) continue;
				segs.push({
					key: p.key,
					color: p.color,
					len,
					offset,
					free: false
				});
				offset += len;
			}
			else if (pct !== null && occ > 0) {
				segs.push({
					key: "fill",
					color: fallbackColor,
					len: circumference * occ,
					offset: 0,
					free: false
				});
				offset = circumference * occ;
			}
			if (pct !== null && offset < circumference) segs.push({
				key: "free",
				color: "",
				len: circumference - offset,
				offset,
				free: true
			});
			return segs;
		}
		/** Session-switch navigation, fail-soft: a stale row (list rebuilt between snapshot and click) loses its open() race and is ignored. */
		function openAgentSession(face, id) {
			if (face === null || typeof face.open !== "function") return;
			try {
				face.open(id);
			} catch {}
		}
		/** Narrow `ctx.get('sessions')` to the card's face (null = harness without the outward sessions service). */
		function sessionsFaceOf(ctx) {
			const rec = asRecord(ctx.get("sessions"));
			if (rec === null) return null;
			const list = asRecord(rec.list);
			if (list === null || typeof list.getSnapshot !== "function" || typeof list.subscribe !== "function") return null;
			return rec;
		}
		/**
		* Compact duration: `42s`, `3m05s`, `1h07m` (shared by both locales).
		* Deliberately distinct from format.ts's `fmtDuration` (the timing card's
		* `12.3s` / `3m25s`): the inspector's caption column needs whole-second,
		* fixed-width text.
		*/
		function fmtDurationCompact(ms) {
			if (!Number.isFinite(ms) || ms < 0) return "—";
			const s = Math.round(ms / 1e3);
			if (s < 60) return `${s}s`;
			const m = Math.floor(s / 60);
			if (m < 60) return `${m}m${String(s % 60).padStart(2, "0")}s`;
			return `${Math.floor(m / 60)}h${String(m % 60).padStart(2, "0")}m`;
		}
		//#endregion
		//#region src/client/components/agentGraph.tsx
		/**
		* The Agent network card — the foot of the Context tab: the current agent's
		* whole family (ancestors, siblings, subagents) as a node graph, where every
		* node is a live donut of that session's own context composition ringed by
		* its occupancy, and a click jumps to that agent's session.
		*
		* Data rides the harness's existing planes end to end — the session-list
		* snapshot (`ctx.sessions.list`: lineage rows + per-session projection
		* values) and the tab's own projections for the current node. The list block
		* serves projection values only from the host's projection cache, so a
		* relative that never attached since the timeline unit last changed lists
		* pressure-only (occupancy without composition); those nodes fetch their slim
		* head from the plugin's `/api` detail route (agentHeads.ts — the same
		* page-scope cache the stats board's subagent-cost cell reads) and
		* re-render composed. A harness without the outward sessions service hides
		* the card.
		*/
		/** Caption box height under a node (3 wrapped label lines + the tokens line). */
		const CAPTION_H = 60;
		/** Fallback arc color for pressure-only nodes (no composition data), by fill ratio. */
		function ringColorOf(pct) {
			if (pct === null) return "var(--dsw-alias-border-l1)";
			if (pct >= 90) return "var(--color-red-500)";
			if (pct >= 70) return "var(--color-amber-500)";
			return "var(--color-green-500)";
		}
		function makeAgentGraph(ctx, kit, heads = makeAgentHeads(ctx)) {
			const { t, fmt, catLabel } = kit;
			function AgentGraph(props) {
				const face = (0, react.useMemo)(() => sessionsFaceOf(ctx), []);
				const snapshot = useSessionsSnapshot(face);
				const sessionId = props.sessionId;
				const [hoverId, setHoverId] = (0, react.useState)(null);
				const stageRef = (0, react.useRef)(null);
				const [stageWidth, setStageWidth] = (0, react.useState)(0);
				(0, react.useEffect)(() => {
					/* v8 ignore start -- jsdom has neither ResizeObserver nor layout; tests exercise the natural-pitch fallback (stageWidth 0). */
					const el = stageRef.current;
					if (el === null || typeof ResizeObserver !== "function") return;
					setStageWidth(el.clientWidth);
					const observer = new ResizeObserver(() => {
						setStageWidth(el.clientWidth);
					});
					observer.observe(el);
					return () => {
						observer.disconnect();
					};
					/* v8 ignore stop */
				}, []);
				(0, react.useEffect)(() => {
					const el = stageRef.current;
					/* v8 ignore next 1 -- the stage renders whenever the card does, and React
					attaches refs before effects run; el is never null here. */
					if (el === null) return;
					return containHorizontalOverscroll(el);
				}, []);
				(0, react.useEffect)(() => {
					if (face === null || typeof sessionId !== "string" || sessionId === "") return;
					if (typeof face.refreshSubagents !== "function") return;
					face.refreshSubagents(sessionId).catch(() => {});
				}, [face, sessionId]);
				const [landed, setLanded] = (0, react.useState)(/* @__PURE__ */ new Map());
				const built = (0, react.useMemo)(() => {
					const forest = agentForestOf(snapshot, sessionId, props.self, landed);
					return forest !== null ? {
						forest,
						layout: layoutForest(forest, stageWidth)
					} : null;
				}, [
					snapshot,
					sessionId,
					props.self,
					stageWidth,
					landed
				]);
				(0, react.useEffect)(() => {
					if (built === null) return;
					const attach = (pending, id) => {
						pending.then((head) => {
							if (head !== null) setLanded((prev) => prev.get(id) === head ? prev : new Map(prev).set(id, head));
						}).catch(() => {});
					};
					for (const n of built.forest.nodes) {
						if (n.isCurrent || n.head !== null && n.head.parts.length > 0) continue;
						attach(heads.headOf(n.id), n.id);
					}
				}, [built, heads]);
				if (built === null) return null;
				const { forest, layout } = built;
				const byId = new Map(forest.nodes.map((n) => [n.id, n]));
				/* v8 ignore next 1 -- agentForestOf anchors the forest at the current
				session, so a current node always exists. */
				const current = forest.nodes.find((n) => n.isCurrent) ?? forest.nodes[0];
				const inspected = (hoverId !== null ? byId.get(hoverId) : void 0) ?? current;
				const runningCount = forest.nodes.filter((n) => n.running).length;
				let totalTokens = 0;
				for (const n of forest.nodes) totalTokens += n.head !== null ? n.head.tokens : 0;
				const open = (id) => {
					if (id === current.id) return;
					openAgentSession(face, id);
				};
				const keyOpen = (id) => (ev) => {
					if (ev.key !== "Enter" && ev.key !== " ") return;
					ev.preventDefault();
					open(id);
				};
				return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "lc-card lc-agents",
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "lc-card-title",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "lc-card-title-text",
								children: t("agents.title")
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "lc-card-sub",
								children: t("agents.sub")
							})]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "lc-agents-chips",
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "lc-agents-chip",
									children: t("agents.chip.count", { n: forest.nodes.length + forest.overflow })
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "lc-agents-chip" + (runningCount > 0 ? " lc-agents-chip-on" : ""),
									children: t("agents.chip.running", { n: runningCount })
								}),
								totalTokens > 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "lc-agents-chip",
									children: t("agents.chip.tokens", { n: fmt(totalTokens) })
								}) : null,
								forest.overflow > 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "lc-agents-chip",
									children: t("agents.more", { n: forest.overflow })
								}) : null
							]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "lc-agents-stage",
							ref: stageRef,
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
								className: "lc-agents-svg",
								width: layout.width,
								height: layout.height,
								viewBox: `0 0 ${layout.width} ${layout.height}`,
								children: [layout.links.map((link) => {
									const d = `M ${link.x1} ${link.y1} L ${link.x2} ${link.y2}`;
									return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
										className: "lc-agents-link stroke-[1.5px] stroke-opacity-45" + (link.running ? " lc-agents-link-live" : ""),
										d,
										stroke: link.color,
										fill: "none"
									}), link.running ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
										className: "lc-agents-flow animate-lc-agent-flow fill-none stroke-2",
										d,
										stroke: link.color
									}) : null] }, link.to);
								}), forest.nodes.map((node) => {
									const point = layout.points.find((p) => p.id === node.id);
									/* v8 ignore next 2 -- layoutForest positions every forest node,
									so the lookup never misses. */
									if (point === void 0) return null;
									return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(AgentNodeView, {
										node,
										x: point.x,
										y: point.y,
										captionW: layout.captionW,
										hovered: hoverId === node.id,
										onHover: setHoverId,
										onOpen: open,
										onKeyOpen: keyOpen(node.id),
										t,
										fmt
									}, node.id);
								})]
							})
						}),
						forest.solo ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "lc-empty lc-agents-solo",
							children: t("agents.solo")
						}) : null,
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Inspector, {
							node: inspected,
							t,
							fmt
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "lc-agents-legend",
							children: [
								CATS.map((c) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
									className: "lc-agents-legend-item",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", { style: { background: c.color } }), catLabel(c.key)]
								}, c.key)),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
									className: "lc-agents-legend-item",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", { className: "lc-agents-legend-free" }), t("agents.legend.free")]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
									className: "lc-agents-legend-item",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", { className: "lc-agents-legend-edge" }), t("agents.running")]
								})
							]
						})
					]
				});
			}
			return AgentGraph;
		}
		function AgentNodeView(props) {
			const { node, x, y, captionW } = props;
			const pct = node.head !== null ? node.head.pct : null;
			const ring = 2 * Math.PI * 20;
			const segs = node.head !== null ? ringSegments(node.head.parts, pct, 20, ringColorOf(pct)) : [];
			const cls = "lc-agent-node" + (node.isCurrent ? " lc-agent-self" : "") + (node.running ? " lc-agent-running" : "") + (node.completed && !node.running ? " lc-agent-done" : "") + (props.hovered ? " lc-agent-hover" : "") + (node.isCurrent ? "" : " lc-agent-clickable") + " group/agent";
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("g", {
				className: cls,
				transform: `translate(${x}, ${y})`,
				"data-agent": node.id,
				role: node.isCurrent ? "img" : "button",
				tabIndex: node.isCurrent ? void 0 : 0,
				onClick: () => {
					props.onOpen(node.id);
				},
				onKeyDown: props.onKeyOpen,
				onMouseEnter: () => {
					props.onHover(node.id);
				},
				onMouseLeave: () => {
					props.onHover(null);
				},
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
						className: "lc-agent-halo fill-transparent group-hover/agent:fill-[var(--dsw-alias-interactive-bg-hover,var(--dsw-alias-bg-layer-2))] group-focus-visible/agent:fill-[var(--dsw-alias-interactive-bg-hover,var(--dsw-alias-bg-layer-2))]" + (node.running ? " animate-lc-agent-glow" : ""),
						r: 35
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
						className: "lc-agent-track fill-(--dsw-alias-bg-layer-1) stroke-(--dsw-alias-border-l1) stroke-[1.5px]",
						r: 26
					}),
					segs.map((seg) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
						className: "lc-agent-seg fill-none stroke-9" + (seg.free ? " lc-agent-free" : ""),
						r: 20,
						strokeDasharray: `${seg.len} ${ring - seg.len}`,
						strokeDashoffset: -seg.offset,
						style: { stroke: seg.free ? void 0 : seg.color },
						transform: "rotate(-90)"
					}, seg.key)),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("text", {
						className: "lc-agent-pct fill-(--dsw-alias-label-primary)",
						textAnchor: "middle",
						dy: "0.32em",
						children: pct !== null ? `${pct}%` : node.head !== null ? props.fmt(node.head.tokens) : "—"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("foreignObject", {
						x: -captionW / 2,
						y: 34,
						width: captionW,
						height: CAPTION_H,
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "lc-agent-caption",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "lc-agent-label",
								children: [node.label, node.isCurrent ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "lc-agents-badge lc-agent-self-badge",
									children: props.t("agents.self")
								}) : null]
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: "lc-agent-tokens",
								children: node.head !== null ? props.fmt(node.head.tokens) : "—"
							})]
						})
					})
				]
			});
		}
		/** The detail strip mirroring the hovered (or current) node: identity, occupancy, activity, and the open hint. */
		function Inspector(props) {
			const { node, t, fmt } = props;
			const bits = [];
			if (node.head !== null) {
				const head = node.head;
				const window = head.window !== void 0 ? ` / ${fmt(head.window)}` : "";
				const pct = head.pct !== null ? ` · ${head.pct}%` : "";
				bits.push(`${fmt(head.tokens)}${window}${pct}`);
			}
			if (node.requests > 0) bits.push(t("agents.requests", { n: node.requests }));
			if (node.billed !== null && node.billed > 0) bits.push(t("agents.billed", { n: fmt(node.billed) }));
			if (node.durationMs !== null) bits.push(fmtDurationCompact(node.durationMs));
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "lc-agents-inspector",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", {
						className: "lc-agents-inspector-name",
						children: node.label
					}),
					node.isCurrent ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "lc-agents-badge",
						children: t("agents.self")
					}) : null,
					node.running ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "lc-agents-badge lc-agents-badge-on",
						children: t("agents.running")
					}) : null,
					node.identity !== null ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "lc-agents-badge",
						children: t(node.identity.mode === "one-shot" ? "agents.oneshot" : "agents.continuable")
					}) : null,
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "lc-agents-inspector-stats",
						children: bits.join(" · ")
					}),
					!node.isCurrent ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "lc-agents-inspector-open",
						children: t("agents.open")
					}) : null
				]
			});
		}
		//#endregion
		//#region src/client/components/events.tsx
		/**
		* Glyphs: inject/model-switch reuse the harness's shared icon set (`@deepseek-ai/dsh-client-ui-primitives`, a platform seed word);
		* compaction/prune keep the ✂ marker — no shared glyph exists for it.
		*/
		const EVENT_ICONS = {
			compaction: "✂",
			prune: "✂",
			inject: "＋",
			model: "⇄",
			mode: "⇄"
		};
		function makeEventText(t) {
			function eventLabel(ev) {
				if (ev.kind === "compaction") return t("ev.compaction", { n: ev.count || 0 });
				if (ev.kind === "prune") return t("ev.prune");
				if (ev.kind === "model") return t("ev.model", {
					a: ev.from || "?",
					b: ev.to || "?"
				});
				if (ev.kind === "mode") return t("ev.mode." + (ev.name || "?"));
				if (ev.sub === "skill") return t("ev.skill", { name: ev.name || "?" });
				const base = t("form." + (ev.form || "context"));
				let label = ev.name ? base + " · " + ev.name : base;
				if (ev.detail) label += " · " + ev.detail;
				return label;
			}
			/**
			* Where this event sits in the timeline: boundary events (compaction/prune) label the GAP they sit in — same-turn 'Turn 2 · Step 3→4',
			* cross-turn 'Turn 50 · Step 8 → Turn 51 · Step 1'; other kinds keep their single point; no turn/step (in flight) → null.
			*/
			function eventAt(ev) {
				if (ev.kind === "compaction" || ev.kind === "prune") {
					if (typeof ev.turn === "number" && typeof ev.step === "number") {
						if (typeof ev.fromTurn === "number" && typeof ev.fromStep === "number") {
							if (ev.fromTurn === ev.turn) return t("events.range", {
								t: ev.turn,
								a: ev.fromStep,
								b: ev.step
							});
							return t("events.rangeTo", {
								a: ev.fromTurn,
								as: ev.fromStep,
								b: ev.turn,
								bs: ev.step
							});
						}
						return t("events.at", {
							t: ev.turn,
							s: ev.step
						});
					}
					return null;
				}
				if (typeof ev.turn === "number" && typeof ev.step === "number") return t("events.at", {
					t: ev.turn,
					s: ev.step
				});
				return null;
			}
			return {
				eventLabel,
				eventAt
			};
		}
		/**
		* Set the native `title` on every label whose text overflows its box (the styled tips cover cards, but a plain
		* ellipsis row still needs the native fallback); reads (scrollWidth/clientWidth) and writes (title) stay separate
		* from layout-affecting work, and callers gate WHEN this runs so it never becomes a per-render forced layout.
		*/
		function syncTitles(root) {
			for (const el of root.querySelectorAll(".lc-event-label")) el.title = el.scrollWidth > el.clientWidth ? el.textContent || "" : "";
		}
		function makeEventList(kit) {
			const { t, fmt, fmtTime, eventLabel, eventAt } = kit;
			const DetailNote = makeDetailNote(kit);
			return function EventList(props) {
				const rootRef = (0, react.useRef)(null);
				(0, react.useLayoutEffect)(() => {
					const root = rootRef.current;
					if (!root) return;
					syncTitles(root);
				}, [props.events]);
				(0, react.useEffect)(() => {
					const onResize = () => {
						const root = rootRef.current;
						if (root !== null) syncTitles(root);
					};
					window.addEventListener("resize", onResize);
					return () => {
						window.removeEventListener("resize", onResize);
					};
				}, []);
				if (props.events.length === 0) {
					if (props.state === "loading") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DetailNote, { state: "loading" });
					if (props.state === "failed" && props.onRetry !== void 0) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DetailNote, {
						state: "failed",
						onRetry: props.onRetry
					});
					return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "lc-empty",
						children: t("events.empty")
					});
				}
				const sorted = props.events.slice().reverse();
				return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "lc-events",
					ref: rootRef,
					children: sorted.map((ev) => {
						const label = eventLabel(ev);
						const at = eventAt(ev);
						const glyph = ev.kind === "inject" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconPlusOutline16, {}) : ev.kind === "model" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconBranchOutline16, {}) : EVENT_ICONS[ev.kind] || "•";
						return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "lc-event @max-[380px]/lc-card:flex-wrap",
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "lc-event-icon lc-event-" + ev.kind,
									children: glyph
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "lc-kind lc-kind-" + ev.kind,
									children: t("kind." + ev.kind)
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "lc-event-label flex-1 @max-[380px]/lc-card:basis-[calc(100%-92px)]",
									children: label
								}),
								at !== null ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "lc-event-at",
									children: at
								}) : null,
								ev.tokens ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "lc-event-tokens" + (ev.kind === "inject" ? " lc-up" : " lc-down"),
									children: (ev.kind === "inject" ? "+" : "−") + fmt(ev.tokens)
								}) : null,
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "lc-event-time",
									children: fmtTime(ev.time)
								})
							]
						}, ev.seq);
					})
				});
			};
		}
		//#endregion
		//#region src/client/components/fileCard.tsx
		/**
		* The File Activity card — the user-benefit view of a step range: not what
		* the context is MADE of (messages) but what the agent DID with its tools
		* to the user's files. One row per touched file with per-purpose counts
		* (read/written/searched), an estimated line delta, and multimodal forms
		* (image reads, directory targets) flagged; the header chips double as
		* purpose/form filters and the search box narrows by path.
		*
		* Interaction mirrors the Context browser's element rows: a row click
		* expands the file's own operation log; each operation is itself the click
		* target that jumps to (and reveals) the exact tool result in the browser.
		* The file name opens the file's right-Sidebar preview where that column
		* exists (dsh 0.1.5-rc.1+, the shipped files-sidebar idiom), and the system
		* opener where it does not.
		*/
		function makeFileCard(kit, settings) {
			const { t, fmt, fmtTime } = kit;
			const DetailNote = makeDetailNote(kit);
			function matches(e, f) {
				if (f === "all") return true;
				if (f === "image") return e.form === "image";
				if (f === "read") return e.reads > 0;
				if (f === "write") return e.writes > 0;
				return e.searches > 0;
			}
			/** Signed line pair, harness diff semantics: growth on the success token, shrinkage on the error token. */
			function DeltaPair(props) {
				return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
					className: "lc-fa-delta",
					children: [props.added > 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "lc-fa-up",
						children: "+" + fmt(props.added)
					}) : null, props.removed > 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "lc-fa-down",
						children: "−" + fmt(props.removed)
					}) : null]
				});
			}
			return (0, react.memo)(function FileCard(props) {
				const { activity } = props;
				const [filter, setFilter] = (0, react.useState)("all");
				const [sort, setSort] = (0, react.useState)(() => settings.defaultFileSort());
				const [query, setQuery] = (0, react.useState)("");
				const [openPath, setOpenPath] = (0, react.useState)(null);
				const q = query.trim().toLowerCase();
				const displayOf = (e) => e.pattern === true ? e.path : displayPathOf(e.path, props.workspace);
				const countOf = (e) => filter === "read" ? e.reads : filter === "write" ? e.writes : filter === "search" ? e.searches : e.ops.length;
				const shown = activity.entries.filter((e) => matches(e, filter) && (q === "" || displayOf(e).toLowerCase().includes(q))).sort((a, b) => sort === "count" ? countOf(b) - countOf(a) || b.ops[0].seq - a.ops[0].seq : sort === "latest" ? b.ops[0].seq - a.ops[0].seq : a.path < b.path ? -1 : 1);
				const chips = [
					{
						key: "all",
						files: activity.entries.length,
						ops: activity.totals.read.ops + activity.totals.write.ops + activity.totals.search.ops
					},
					{
						key: "read",
						files: activity.totals.read.files,
						ops: activity.totals.read.ops
					},
					{
						key: "write",
						files: activity.totals.write.files,
						ops: activity.totals.write.ops
					},
					{
						key: "search",
						files: activity.totals.search.files,
						ops: activity.totals.search.ops
					},
					{
						key: "image",
						files: activity.totals.image.files,
						ops: activity.totals.image.ops
					}
				];
				const opLine = (op) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "lc-fa-op-tool",
						title: op.tool,
						children: op.tool
					}),
					op.read !== void 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "lc-fa-read",
						title: "est" in op.read ? t("files.readEst") : t("files.readTip", {
							a: fmt(op.read.start),
							b: fmt(op.read.start + op.read.count - 1)
						}),
						children: ("est" in op.read ? "≈" : ">>") + fmt(op.read.count)
					}) : null,
					op.detail !== void 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "lc-fa-op-detail",
						children: op.detail
					}) : null,
					op.hits !== void 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "lc-fa-op-detail",
						children: t("files.hits", { n: fmt(op.hits) })
					}) : null,
					op.detail === void 0 && op.hits === void 0 && op.program !== void 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "lc-fa-op-detail",
						children: op.program
					}) : null,
					op.added + op.removed > 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DeltaPair, {
						added: op.added,
						removed: op.removed
					}) : null,
					op.err ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "lc-br-err-dot",
						title: t("node.failed")
					}) : null,
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "lc-fa-op-time",
						children: op.time !== void 0 ? fmtTime(op.time) : "—"
					})
				] });
				return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "lc-card lc-col flex-1 min-w-[min(360px,100%)]",
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "lc-card-title",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "lc-card-title-text",
							children: t("files.title")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "lc-card-sub",
							children: props.scope
						})]
					}), activity.entries.length === 0 && props.state === "loading" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DetailNote, { state: "loading" }) : activity.entries.length === 0 && props.state === "failed" && props.onRetry !== void 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DetailNote, {
						state: "failed",
						onRetry: props.onRetry
					}) : activity.entries.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "lc-empty",
						children: t("files.empty")
					}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "lc-fa-ctl",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: "lc-gran @max-[380px]/lc-card:flex-wrap",
								children: chips.map((c) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "lc-gran-btn" + (filter === c.key ? " lc-gran-on" : "") + (c.key === "read" || c.key === "write" || c.key === "search" ? " lc-fa-chip-" + c.key : ""),
									title: t("files.chipTip", {
										files: c.files,
										ops: c.ops
									}),
									onClick: () => {
										setFilter((cur) => cur === c.key ? "all" : c.key);
									},
									children: [t("files.kind." + c.key), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", {
										className: "lc-fa-n",
										children: fmt(c.ops)
									})]
								}, c.key))
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
								className: "lc-fa-search focus:border-(--dsw-alias-label-dimmed)",
								value: query,
								placeholder: t("files.search"),
								onChange: (ev) => {
									setQuery(ev.target.value);
								}
							})]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "lc-fa-meta",
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("files.files", { n: activity.entries.length }) }),
								activity.totals.added + activity.totals.removed > 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
									className: "lc-fa-meta-delta group/tip",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(DeltaPair, {
										added: activity.totals.added,
										removed: activity.totals.removed
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: "lc-tip lc-fa-meta-tip group-hover/tip:opacity-100",
										role: "tooltip",
										children: t("files.deltaTip")
									})]
								}) : null,
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "lc-gran lc-fa-sort",
									role: "group",
									title: t("files.sortTip"),
									children: [
										"count",
										"latest",
										"path"
									].map((k) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										className: "lc-gran-btn" + (sort === k ? " lc-gran-on" : ""),
										onClick: () => {
											setSort(k);
										},
										children: t("files.sort." + k)
									}, k))
								})
							]
						}),
						shown.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "lc-empty",
							children: t("files.noMatch")
						}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "lc-fa-list",
							children: shown.map((e) => {
								const open = openPath === e.path;
								const display = displayOf(e);
								const trimmed = display.endsWith("/") ? display.slice(0, -1) : display;
								const slash = trimmed.lastIndexOf("/");
								const dir = slash >= 0 ? trimmed.slice(0, slash + 1) : "";
								const base = slash >= 0 ? trimmed.slice(slash + 1) : trimmed;
								const glyph = glyphOf(e.path, e.form);
								const abs = e.pattern === true ? void 0 : absPathOf(e.path, props.workspace);
								const previewable = props.onPreview !== void 0 && e.pattern !== true && e.form !== "dir";
								const openable = previewable || abs !== void 0 && props.onOpen !== void 0;
								return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "lc-fa-item" + (open ? " lc-fa-item-on" : ""),
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
										type: "button",
										className: "lc-fa-row hover:bg-(--dsw-alias-interactive-bg-hover) @max-[380px]/lc-card:flex-wrap",
										title: e.path,
										onClick: () => {
											setOpenPath(open ? null : e.path);
										},
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { className: "lc-br-chev" + (open ? " lc-br-chev-on" : "") }),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: "lc-fa-form",
												title: t(glyph.tip),
												children: glyph.color !== void 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													className: "lc-fa-lang",
													style: {
														background: glyph.color,
														color: glyph.text
													},
													children: glyph.glyph
												}) : glyph.glyph
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
												className: "lc-fa-path flex-1 @max-[380px]/lc-card:basis-[calc(100%-46px)]",
												children: [dir !== "" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("em", { children: dir }) : null, openable ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", {
													className: "lc-fa-file hover:underline",
													title: t(previewable ? "files.preview" : "files.open"),
													onClick: (ev) => {
														ev.stopPropagation();
														if (previewable && props.onPreview?.(e) === true) return;
														if (abs !== void 0) props.onOpen?.(abs);
													},
													children: base
												}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: base })]
											}),
											e.reads > 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
												className: "lc-fa-badge lc-fa-b-read",
												title: t("files.kind.read"),
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", {}), fmt(e.reads)]
											}) : null,
											e.writes > 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
												className: "lc-fa-badge lc-fa-b-write",
												title: t("files.kind.write"),
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", {}), fmt(e.writes)]
											}) : null,
											e.searches > 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
												className: "lc-fa-badge lc-fa-b-search",
												title: t("files.kind.search"),
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", {}), fmt(e.searches)]
											}) : null,
											e.added + e.removed > 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DeltaPair, {
												added: e.added,
												removed: e.removed
											}) : null,
											e.errs > 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: "lc-br-err-dot",
												title: t("files.errs", { n: e.errs })
											}) : null,
											e.ops[0].time !== void 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: "lc-fa-time",
												children: fmtTime(e.ops[0].time)
											}) : null
										]
									}), open ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: "lc-fa-ops",
										children: e.ops.map((op, i) => {
											const onLocate = props.onLocate;
											const key = `${op.seq}:${i}`;
											return onLocate !== void 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
												type: "button",
												className: "lc-fa-op lc-fa-op-link hover:bg-(--dsw-alias-interactive-bg-hover)",
												title: t("files.locate"),
												onClick: () => {
													onLocate(op);
												},
												children: opLine(op)
											}, key) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
												className: "lc-fa-op",
												children: opLine(op)
											}, key);
										})
									}) : null]
								}, e.path);
							})
						})
					] })]
				});
			});
		}
		const PLUGIN_REPO = "https://github.com/bowenliang123/dsh-context";
		const PLUGIN_REPO_SHORT = PLUGIN_REPO.replace(/^https?:\/\/github\.com\//, "");
		//#endregion
		//#region src/client/latestVersion.ts
		/**
		* One live check for the Plugin-info card: lazy with 1h TTL; registries
		* are tried strictly in order — official npm first, npmmirror only as a
		* fallback — and one-at-a-time, never in parallel. Each source's failure
		* (non-ok response, missing/non-string version, network error) advances
		* to the next one; only an all-source failure resolves to null so the
		* card silently keeps its static version.
		*/
		const REGISTRY_HOSTS = ["https://registry.npmjs.org", "https://registry.npmmirror.com"];
		const TTL_MS = 36e5;
		let cached = null;
		function readVersion(host) {
			return fetch(host + "/dsh-context/latest").then((res) => res.ok ? res.json() : null).then((body) => body !== null && typeof body.version === "string" ? body.version : null).catch(() => null);
		}
		function fetchLatestVersion() {
			if (!cached || Date.now() - cached.at >= TTL_MS) cached = {
				at: Date.now(),
				promise: (async () => {
					for (const host of REGISTRY_HOSTS) {
						const v = await readVersion(host);
						if (v !== null) return v;
					}
					return null;
				})()
			};
			return cached.promise;
		}
		/** Numeric semver compare (pre-release suffix ignored): is `latest` strictly newer than `current`? */
		function isNewerVersion(latest, current) {
			const parse = (v) => v.replace(/^v/, "").split("-", 1)[0].split(".").map((n) => parseInt(n, 10) || 0);
			const a = parse(latest);
			const b = parse(current);
			for (let i = 0; i < Math.max(a.length, b.length); i++) {
				const x = a[i] || 0;
				const y = b[i] || 0;
				if (x !== y) return x > y;
			}
			return false;
		}
		//#endregion
		//#region src/client/components/pluginInfo.tsx
		/**
		* PluginInfo — the card beside Context stats introducing the plugin. Metadata is baked in from package.json via tsdown `define` (see
		* meta.ts); one live npm-registry check (latestVersion.ts, 1-hour TTL) appends an `↑ vX.Y.Z` chip when newer.
		*/
		function makePluginInfo(kit) {
			const { t } = kit;
			const row = (label, value, href, hint) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("a", {
				className: "lc-pi-row group/pi",
				href,
				target: "_blank",
				rel: "noreferrer",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "lc-pi-label",
					children: label
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "lc-pi-value group-hover/pi:underline",
					title: hint,
					children: value
				})]
			});
			return function PluginInfo() {
				const [latest, setLatest] = (0, react.useState)(null);
				(0, react.useEffect)(() => {
					if ("0.54.0".includes("-dev")) return;
					let on = true;
					fetchLatestVersion().then((v) => {
						if (on && v) setLatest(v);
					});
					return () => {
						on = false;
					};
				}, []);
				const update = latest !== null && isNewerVersion(latest, "0.54.0") ? latest : null;
				const nameText = "dsh-context (v0.54.0)";
				const nameValue = [nameText];
				if (update) nameValue.push(/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "lc-pi-update",
					children: "↑ v" + update
				}, "update"));
				return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "lc-card flex-1 min-w-[min(360px,100%)]",
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "lc-card-title",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "lc-card-title-text",
							children: t("plugin.title")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("a", {
							className: "lc-card-sub lc-pi-hint hover:underline",
							href: PLUGIN_REPO,
							target: "_blank",
							rel: "noreferrer",
							children: t("plugin.hint")
						})]
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "lc-pi-grid",
						children: [
							row(t("plugin.name"), nameValue, PLUGIN_REPO, update !== null ? nameText + " ↑ v" + update : nameText),
							row(t("plugin.github"), PLUGIN_REPO_SHORT, PLUGIN_REPO, PLUGIN_REPO_SHORT),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "lc-pi-row lc-pi-row-btn group/pi",
								onClick: () => {
									openPluginSettings();
								},
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: "lc-pi-label",
									children: t("plugin.settings")
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: "lc-pi-value group-hover/pi:underline",
									title: t("plugin.settingsOpen"),
									children: t("plugin.settingsOpen")
								})]
							})
						]
					})]
				});
			};
		}
		//#endregion
		//#region src/client/components/upgradeGate.tsx
		/**
		* The baseline-gate modal: when the host reports the running harness below
		* the supported baseline (the `unsupported` record on the pushed
		* `contextTimeline` value — see host/fallback.ts), the Context tab keeps
		* rendering its (zeroed) cards and this centered dialog names the detected
		* harness version against the required minimum and urges the upgrade.
		*
		* Dismissal is remembered per session in a module-level ledger: tab remounts
		* do not re-pop it, while a fresh app launch does — the gate stays visible
		* until the harness is actually updated.
		*/
		/** Sessions whose gate the user already dismissed this browser session. */
		const dismissed = /* @__PURE__ */ new Set();
		function makeUpgradeGate(kit) {
			const { t } = kit;
			return function UpgradeGate(props) {
				const sessionId = typeof props.sessionId === "string" ? props.sessionId : "";
				const [closedFor, setClosedFor] = (0, react.useState)(null);
				const closed = closedFor === sessionId || dismissed.has(sessionId);
				const close = (0, react.useCallback)(() => {
					dismissed.add(sessionId);
					setClosedFor(sessionId);
				}, [sessionId]);
				useEscapeClose(!closed, close);
				if (closed) return null;
				return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "lc-modal-backdrop",
					onClick: close,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "lc-modal-card lc-gate-card",
						onClick: (ev) => {
							ev.stopPropagation();
						},
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "lc-modal-head",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "lc-modal-title",
									children: t("gate.title")
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									className: "lc-modal-close hover:text-(--dsw-alias-label-primary) hover:bg-(--dsw-alias-bg-layer-2)",
									"aria-label": t("cmd.close"),
									onClick: close,
									children: "×"
								})]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: "lc-gate-body",
								children: t("gate.body", { minimum: props.minimum })
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "lc-gate-versions",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
									className: "lc-gate-version",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: "lc-gate-version-label",
										children: t("gate.current")
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
										className: "lc-gate-version-value",
										children: ["v", props.current]
									})]
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
									className: "lc-gate-version",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: "lc-gate-version-label",
										children: t("gate.minimum")
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
										className: "lc-gate-version-value",
										children: [
											"v",
											props.minimum,
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: "lc-gate-or-newer",
												children: t("gate.orNewer")
											})
										]
									})]
								})]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: "lc-gate-actions",
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: "lc-gate-ok hover:brightness-110",
									onClick: close,
									children: t("gate.ok")
								})
							})
						]
					})
				});
			};
		}
		//#endregion
		//#region src/client/components/requestDetail.tsx
		function makeRequestDetail(kit, StackedBar) {
			const { t, fmt, fmtTime, catLabel, eventLabel, eventAt } = kit;
			/**
			* One brief row: a fixed-width kind tag plus one glanceable line. The tag carries a styled, instant explanation bubble (the
			* shared `.lc-tip` chrome); the content span keeps the native title (preview + locate hint), so the two never stack.
			* Clickable when the browser linkage is wired AND the row carries a node (the always-present In row's empty state stays inert).
			*/
			function BriefRow(props) {
				const inner = /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
					className: "lc-brief-tag group/tip",
					children: [props.tag, /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "lc-tip lc-brief-tip group-hover/tip:opacity-100",
						role: "tooltip",
						children: props.tagTip
					})]
				}), props.children] });
				if (props.node === void 0 || props.onLocate === void 0) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "lc-brief-row",
					children: inner
				});
				const node = props.node;
				const onLocate = props.onLocate;
				const locate = () => {
					onLocate(node, props.isResponse);
				};
				return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
					type: "button",
					className: "lc-brief-row lc-brief-row-link hover:bg-(--dsw-alias-interactive-bg-hover)",
					onClick: locate,
					children: inner
				});
			}
			/**
			* One line's anatomy — a compact FACT tag plus the preview text, mirroring the Context browser's element rows so a
			* brief line reads exactly like the browser row its click reveals: tool results tag the tool name, skill content
			* the skill name, assistant replies the call breadcrumb, injections the form, user messages image attachments.
			* The branches cover the Category union; a hostile cat degrades into the
			* user tail — a plain text row, never a throw.
			*/
			function chipParts(n, conv) {
				if (n.cat === "tool") {
					const summary = callSummaryOf(conv);
					if (n.tool !== void 0) return {
						tag: n.tool,
						text: summary ?? ""
					};
					return {
						tag: null,
						text: summary ?? t("node.toolResult")
					};
				}
				if (n.cat === "skill") return {
					tag: n.skill !== void 0 ? t("node.skillTag", { name: n.skill }) : t("form." + (n.form ?? "context")),
					text: n.text ?? callSummaryOf(conv) ?? ""
				};
				if (n.cat === "assistant") {
					const names = n.calls !== void 0 && n.calls.length > 0 ? n.calls : callNamesOf(conv);
					const own = n.text !== void 0 && n.text !== "" ? n.text : blockSummaryOf(conv) ?? "";
					return {
						tag: names.length > 0 ? names.join(" › ") : null,
						text: own !== "" ? own : names.length > 0 ? "" : t("node.empty")
					};
				}
				if (n.cat === "inject") {
					const text = n.text !== void 0 && n.text !== "" ? n.form === "snapshot" ? t("node.snapshot") + n.text : n.text : "";
					return {
						tag: t("form." + (n.form ?? "context")),
						text
					};
				}
				const imgs = n.imgs ?? 0;
				return {
					tag: imgs > 0 ? t("attach.image") + (imgs > 1 ? " ×" + String(imgs) : "") : null,
					text: n.text ?? ""
				};
			}
			/** The native-title line for a fact+text pair: 'tag · text', degrading to whichever half exists. */
			function factTitle(tag, text) {
				return tag !== null ? text !== "" ? tag + " · " + text : tag : text;
			}
			/**
			* The brief's container ALWAYS renders — a fixed three-row lane (`.lc-brief`'s min-height) so scrubbing the chart never
			* changes the panel's height; unknown or empty steps just leave parts of the lane blank instead of collapsing it.
			*/
			function BriefSection(props) {
				const { opener, inputs, response } = props.brief ?? { inputs: [] };
				const convOf = props.convOf ?? (() => void 0);
				const hint = props.onLocate !== void 0 ? " — " + t("brief.locate") : "";
				const locateChip = props.onLocate === void 0 ? void 0 : (n) => (e) => {
					e?.stopPropagation();
					props.onLocate?.(n, false);
				};
				const MAX_CHIPS = 3;
				/**
				* The ONE content unit of the brief — inputs and the reply share the same chip anatomy (error dot, fact tag,
				* preview text). Input chips are compact and individually clickable (each locates its own node); the reply is a
				* single chip grown to the row's width, left inert because the row button already locates it.
				*/
				const nodeChip = (n, onClick, grow = false) => {
					const { tag, text } = chipParts(n, convOf(n.seq));
					return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
						className: "lc-brief-chip" + (grow ? " lc-brief-chip-grow" : "") + (onClick !== void 0 ? " lc-brief-chip-link hover:bg-(--dsw-alias-interactive-bg-hover)" : ""),
						title: factTitle(tag, text) + hint,
						onClick,
						children: [
							n.err === true ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { className: "lc-br-err-dot" }) : null,
							tag !== null ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "lc-brief-chip-tag",
								children: tag
							}) : null,
							text !== "" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "lc-brief-chip-text",
								children: text
							}) : null
						]
					}, n.seq);
				};
				const openerParts = opener !== void 0 ? chipParts(opener, convOf(opener.seq)) : null;
				return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "lc-brief",
					children: [
						opener !== void 0 && openerParts !== null ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(BriefRow, {
							tag: t("brief.turn"),
							tagTip: t("brief.turnTip"),
							node: opener,
							isResponse: false,
							onLocate: props.onLocate,
							children: [openerParts.tag !== null ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "lc-brief-fact",
								children: openerParts.tag
							}) : null, openerParts.text !== "" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "lc-brief-text",
								title: factTitle(openerParts.tag, openerParts.text) + hint,
								children: openerParts.text
							}) : null]
						}) : null,
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(BriefRow, {
							tag: t("brief.input"),
							tagTip: t("brief.inputTip"),
							node: inputs[0],
							isResponse: false,
							onLocate: props.onLocate,
							children: inputs.length > 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [inputs.slice(0, MAX_CHIPS).map((n) => nodeChip(n, locateChip?.(n))), inputs.length > MAX_CHIPS ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "lc-brief-more",
								children: t("brief.more", { n: inputs.length - MAX_CHIPS })
							}) : null] }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "lc-brief-empty",
								children: t("brief.noInputs")
							})
						}),
						response !== void 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(BriefRow, {
							tag: t("brief.reply"),
							tagTip: t("brief.replyTip"),
							node: response,
							isResponse: true,
							onLocate: props.onLocate,
							children: nodeChip(response, void 0, true)
						}) : null
					]
				});
			}
			return (0, react.memo)(function RequestDetail(props) {
				const req = props.request;
				if (!req) return null;
				const isTurn = req.stepCount !== void 0 && req.stepCount > 1;
				const head = isTurn ? t("detail.turn", {
					t: req.turn ?? 0,
					/* v8 ignore next -- isTurn already guarantees stepCount !== undefined;
					the fallback is defensive. */
					n: req.stepCount ?? 0
				}) : t("detail.step", {
					t: req.turn ?? 0,
					s: req.step ?? 0,
					n: props.stepsOf?.(req.turn) ?? 1
				});
				const marker = props.marker ?? null;
				const markerAt = marker !== null ? eventAt(marker) : null;
				const delta = props.prev !== void 0;
				const prev = props.prev ?? null;
				const deltas = CATS.map((c) => delta ? (req[c.key] || 0) - (prev !== null ? prev[c.key] || 0 : 0) : 0);
				let net = 0;
				let maxAbs = 0;
				if (delta) for (const d of deltas) {
					net += d;
					if (Math.abs(d) > maxAbs) maxAbs = Math.abs(d);
				}
				const parts = delta ? CATS.map((c, i) => ({
					key: c.key,
					color: c.color,
					value: Math.abs(deltas[i])
				})) : partsOf(req);
				return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "lc-detail",
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "lc-detail-head",
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: head }),
								marker !== null && markerAt !== null ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "lc-detail-marker",
									title: eventLabel(marker),
									children: "✂ " + markerAt
								}) : null,
								isTurn ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "lc-detail-tag",
									children: t("detail.lastStep")
								}) : null,
								delta ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "lc-detail-tag",
									children: t("gran.delta")
								}) : null,
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "lc-detail-time",
									children: fmtTime(req.time)
								}),
								delta ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "lc-detail-metric" + (net > 0 ? " lc-detail-metric-up" : net < 0 ? " lc-detail-metric-down" : ""),
									children: t("tip.delta", { n: (net > 0 ? "+" : "") + fmt(net) })
								}) : null,
								!delta && req.prompt !== void 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "lc-detail-metric",
									children: t("detail.actual", { n: fmt(req.prompt) })
								}) : null,
								!delta && req.output !== void 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "lc-detail-metric",
									children: t("detail.output", { n: fmt(req.output) })
								}) : null,
								!delta && req.prompt !== void 0 && req.cacheRead !== void 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "lc-detail-metric",
									children: t("detail.cache", { n: cacheHitPercent(req.cacheRead, req.prompt) ?? "—" })
								}) : null
							]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(BriefSection, {
							brief: props.brief,
							convOf: props.convOf,
							onLocate: props.onLocate
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(StackedBar, {
							parts,
							height: 10,
							hoverKey: props.hoverKey,
							tip: false
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "lc-detail-rows",
							children: CATS.map((c, i) => {
								const v = delta ? deltas[i] : req[c.key] || 0;
								const mag = Math.abs(v);
								return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "lc-detail-row" + (props.hoverKey === c.key ? " lc-detail-row-on" : ""),
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", { style: { background: c.color } }),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: "lc-detail-label",
											children: catLabel(c.key)
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: "lc-bar-track",
											children: delta ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { className: "lc-bar-zero" }), v !== 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: "lc-bar-fill " + (v > 0 ? "lc-bar-fill-up" : "lc-bar-fill-down"),
												style: {
													width: `${mag / maxAbs * 50}%`,
													background: c.color
												}
											}) : null] }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: "lc-bar-fill",
												style: {
													width: `${req.total > 0 ? v / req.total * 100 : 0}%`,
													background: c.color
												}
											})
										}),
										delta ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: "lc-detail-num" + (v > 0 ? " lc-detail-num-up" : v < 0 ? " lc-detail-num-down" : ""),
											children: (v > 0 ? "+" : "") + fmt(v)
										}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: "lc-detail-num",
											children: "≈" + fmt(v)
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: "lc-detail-pct",
											children: !delta && req.total > 0 ? `${Math.round(v / req.total * 100)}%` : ""
										})
									]
								}, c.key);
							})
						})
					]
				});
			});
		}
		//#endregion
		//#region src/client/components/statsContext.tsx
		/**
		* The Context card: what the session's context IS and how it evolved — a
		* seven-cell grid of the session's shape (turns / steps / human inputs /
		* live tool calls), the whole-session cache-hit rate, and the cost estimate
		* at two scopes: the family total (the current agent plus every subagent
		* session) and the subagents' own share.
		* Count figures only: nothing here is part of a spendable whole, so no pie —
		* proportions live in the composition card, and the context-event tallies
		* live on the events card's kind filters (contextView.tsx). The cache-hit
		* cell reads the official `tokenUsage` projection — the same source and
		* formula as the harness chat stats line under the composer, shown with one
		* decimal — and dashes until a provider reports usage. The cost cells price
		* the host-folded cumulative billed totals (complete session logs, never
		* trimmed; the subagents' usage folds out of the session-list snapshot,
		* `makeSubagentCost` below) from the models.dev price book (modelPrices.ts)
		* in the locale's currency; their hover bubbles (a '?' marker + styled DOM
		* tip) explain each scope and list the per-1M-token rates of the models the
		* family actually billed, straight from the same book (cost.ts), so printed
		* rates can never drift from the math. A book that has not loaded (or
		* failed) dashes the cells and notes the outage.
		*
		* The counts arrive precomputed: the split-generation wire head carries them
		* (shared/types.ts `TimelineCounts` — computed over the retained records),
		* and the caller derives them from the collections on the inline generation
		* (`countsOfRecords`). The card itself never touches the collections.
		*/
		/**
		* The rate rows for the models this session actually billed — the usage
		* keys priced against the book, in fold order. Hostile branches skip;
		* unpriced models drop (their buckets simply do not contribute). The label
		* carries the provider only when the session billed more than one; a model
		* with an off-peak bucket (DeepSeek's period-based list) shows the
		* peak | off-peak pair.
		*/
		function priceRowsOf(usage, prices) {
			if (usage === void 0 || prices === null) return [];
			const rows = [];
			const multi = Object.keys(usage).length > 1;
			for (const provider of Object.keys(usage)) {
				const models = asRecord(usage[provider]);
				/* v8 ignore next 1 -- the fold's inputs are mergeCostUsage's own output
				(hostile branches dropped at the merge), so a non-record branch never
				reaches here; the guard stays for the helper's own contract. */
				if (models === null) continue;
				for (const model of Object.keys(models)) {
					const rate = priceOf(prices, provider, model);
					if (rate === null) continue;
					const periods = asRecord(models[model]);
					const deepseek = isDeepSeekProvider(provider);
					const billedOff = deepseek && periods !== null && periods.off !== void 0;
					rows.push({
						key: provider + "/" + model,
						label: multi && provider !== "" ? `${model} · ${provider}` : model,
						rate: deepseek ? peakOf(rate) : rate,
						...billedOff ? { offRate: rate } : {}
					});
				}
			}
			return rows;
		}
		/**
		* The inline generation's counter derivation — the exact tally the card ran
		* over the served collections before the split (distinct turn values, record
		* count, per-kind event tallies). The host's split-generation counts match
		* it by construction (fold.ts buildTimelineHead).
		*/
		function countsOfRecords(requests, events) {
			const turns = /* @__PURE__ */ new Set();
			for (const req of requests) turns.add(req.turn ?? 0);
			let injects = 0;
			let compactions = 0;
			let prunes = 0;
			for (const ev of events) if (ev.kind === "inject") injects++;
			else if (ev.kind === "compaction") compactions++;
			else if (ev.kind === "prune") prunes++;
			return {
				turns: turns.size,
				steps: requests.length,
				injects,
				compactions,
				prunes
			};
		}
		/**
		* The stats board's subagent-cost seat: the merged billed-token usage of the
		* current session's whole subagent subtree, folded from the session-list
		* snapshot's warm rows (`subagentCostFoldOf`) with fetched slim heads
		* standing in for cold relatives. Null = nothing reported yet (no
		* subagents, no usage, or no sessions face on this harness).
		*/
		function makeSubagentCost(ctx, heads) {
			return function useSubagentCost(sessionId) {
				const snapshot = useSessionsSnapshot((0, react.useMemo)(() => sessionsFaceOf(ctx), []));
				const [landed, setLanded] = (0, react.useState)(/* @__PURE__ */ new Map());
				const fold = (0, react.useMemo)(() => subagentCostFoldOf(snapshot, sessionId, landed), [
					snapshot,
					sessionId,
					landed
				]);
				(0, react.useEffect)(() => {
					for (const id of fold.cold) heads.headOf(id).then((head) => {
						if (head !== null) setLanded((prev) => prev.get(id) === head ? prev : new Map(prev).set(id, head));
					}).catch(() => {});
				}, [fold, heads]);
				return fold.usage;
			};
		}
		function makeStatsContext(kit, useSubagentCost) {
			const { t, fmt } = kit;
			return function StatsContext(props) {
				const currency = props.locale === "zh" ? "cny" : "usd";
				const { prices, failed } = useModelPrices();
				const subUsage = useSubagentCost(props.sessionId);
				const usage = mergeCostUsage(props.cost, subUsage) ?? void 0;
				const cost = estimateSessionCost(usage, prices, currency);
				const subCost = estimateSessionCost(subUsage, prices, currency);
				const fmtRate = (usd) => formatPriceRate(toCurrency(usd, currency), currency);
				const rows = priceRowsOf(usage, prices);
				const deepseek = usage !== void 0 && Object.keys(usage).some((p) => isDeepSeekProvider(p));
				const subDeepseek = subUsage !== null && Object.keys(subUsage).some((p) => isDeepSeekProvider(p));
				const anyPair = rows.some((r) => r.offRate !== void 0);
				const unpriced = rows.length === 0 && usage !== void 0 && Object.keys(usage).length > 0 && (failed || prices !== null);
				const subUnpriced = subUsage !== null && priceRowsOf(subUsage, prices).length === 0 && (failed || prices !== null);
				const costTip = [
					t("stats.costTip") + (deepseek ? " " + t("stats.costTipDeepseek") : ""),
					rows.length > 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
						className: "lc-stat-tip-prices",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "lc-stat-tip-head",
							children: anyPair ? t("stats.costPriceHeadPair") : t("stats.costPriceHead")
						}), rows.map((r) => {
							const cells = [
								[
									t("stats.costHit"),
									r.rate.hit,
									r.offRate?.hit
								],
								[
									t("stats.costMiss"),
									r.rate.miss,
									r.offRate?.miss
								],
								[
									t("stats.costWrite"),
									r.rate.write,
									r.offRate?.write
								],
								[
									t("stats.costOut"),
									r.rate.out,
									r.offRate?.out
								]
							];
							return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
								className: "lc-stat-tip-row",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", {
									className: "lc-stat-tip-model",
									children: r.label
								}), cells.map(([name, peak, off]) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [
									" · ",
									name,
									" ",
									off === void 0 ? fmtRate(peak) : `${fmtRate(peak)}|${fmtRate(off)}`
								] }, name))]
							}, r.key);
						})]
					}, "prices") : null,
					unpriced ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("stats.costUnavailable") }, "unavailable") : null
				];
				const subTip = [t("stats.subCostTip") + (subDeepseek ? " " + t("stats.costTipDeepseek") : ""), subUnpriced ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("stats.costUnavailable") }, "unavailable") : null];
				const hit = props.usage === null ? null : cacheHitPercent(numOf(props.usage.cacheReadTokens), numOf(props.usage.uncachedInputTokens) + numOf(props.usage.cacheReadTokens) + numOf(props.usage.cacheWriteTokens));
				const cell = (label, value, tip) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "lc-stat" + (tip === void 0 ? "" : " lc-stat-tipped group/tip"),
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
							className: "lc-stat-label",
							children: [label, tip !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", {
								className: "lc-stat-q group-hover/tip:text-(--dsw-alias-label-primary) group-hover/tip:border-(--dsw-alias-label-primary)",
								"aria-hidden": "true",
								children: "?"
							})]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", {
							className: "lc-stat-value",
							children: typeof value === "number" ? fmt(value) : value
						}),
						tip !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "lc-tip lc-stat-tip group-hover/tip:opacity-100",
							role: "tooltip",
							children: tip
						})
					]
				});
				return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "lc-card lc-col-stats flex-1 min-w-[min(360px,100%)]",
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "lc-card-title",
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "lc-card-title-text",
							children: t("stats.title")
						})
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "lc-stats grid grid-cols-[repeat(auto-fit,minmax(108px,1fr))] gap-1.5",
						children: [
							cell(t("stats.turns"), props.counts.turns),
							cell(t("stats.steps"), props.counts.steps),
							cell(t("stats.humanInputs"), props.humanInputs ?? 0, t("stats.humanInputsTip")),
							cell(t("stats.toolCalls"), props.toolCalls ?? 0),
							cell(t("stats.cacheHit"), hit === null ? "—" : `${hit}%`, t("stats.cacheHitTip")),
							cell(t("stats.cost"), cost === null ? "—" : formatCost(cost, currency), costTip),
							cell(t("stats.subCost"), subCost === null ? "—" : formatCost(subCost, currency), subTip)
						]
					})]
				});
			};
		}
		//#endregion
		//#region src/client/components/sliceList.tsx
		/**
		* The stats cards' slice rows: the donut's legend with numbers, two tiers
		* per slice — the primary line pairs the color dot and the name with the
		* bold share closing a fixed right column, and the secondary line drops the
		* absolute quantity (plus a qualifier like the call count) under the name in
		* muted small print. Hovering a row lights it and its donut segment together
		* (the shared hover key), and vice versa. No tracks or bars — the donut IS
		* the proportion chart; the rows are its legend. Preformatted strings in,
		* dumb markup out.
		*/
		function makeSliceList(kit) {
			return function SliceList(props) {
				return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "lc-sl flex-auto @max-[240px]/lc-card:basis-full",
					onMouseLeave: () => {
						if (props.onHoverKey !== void 0) props.onHoverKey(null);
					},
					children: props.rows.map((r) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "lc-sl-row" + (r.dim ? " lc-sl-row-dim" : "") + (props.hoverKey !== void 0 && props.hoverKey === r.key ? " lc-sl-row-on" : ""),
						onMouseEnter: () => {
							if (props.onHoverKey !== void 0) props.onHoverKey(r.key);
						},
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "lc-sl-main",
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", {
									className: "lc-sl-dot",
									style: { background: r.color }
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "lc-sl-label",
									title: r.label,
									children: r.label
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "lc-sl-pct",
									children: r.pct
								})
							]
						}), r.count !== "" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "lc-sl-sub",
							title: r.count,
							children: r.count
						}) : null]
					}, r.key))
				});
			};
		}
		//#endregion
		//#region src/client/components/statsTiming.tsx
		/**
		* The Timing card: where the session's ACTIVE time went. The donut splits
		* whole-step wall time into the model-call slices — TTFT (step start → first
		* token, the wait) and LLM generation (first token → assistant message) —
		* and the tool-execution slice, with the residue as overhead; a call whose
		* stream recorded no token delta (legacy or aborted) stays unattributed and
		* lands in the residue. When the host folded the generation split (see
		* TimingTotals), the generation slice expands into what was being decoded:
		* thinking, answer text, and tool-call arguments. The slice rows lead with
		* the true duration and qualify it with the call count on the secondary line —
		* except the decode slices, which count BLOCKS (zero to many per call, so a
		* call count would be a false tally) and therefore carry no qualifier. A slice
		* that never happened (zero time) is omitted entirely — the ring already skips
		* its arc, and a zero row would otherwise borrow the session's call count and
		* read as "no time, many calls". The donut and the rows sit side by side so
		* the head row stays half-height. Parallel tool calls each count, so the tools
		* figure can overlap — the ring clamps it into the post-model window while the
		* row numbers stay true.
		*/
		const COLOR = {
			ttft: "var(--color-blue-500)",
			reasoning: "var(--color-violet-500)",
			text: "var(--color-pink-500)",
			toolarg: "var(--color-amber-500)",
			tools: "var(--color-teal-500)",
			other: "var(--color-slate-400)"
		};
		function makeStatsTiming(kit, Donut) {
			const { t, fmt, fmtDuration, fmtShare } = kit;
			const SliceList = makeSliceList(kit);
			return function StatsTiming(props) {
				const [hoverKey, setHoverKey] = (0, react.useState)(null);
				const timing = props.timing;
				const wall = timing !== null && Number.isFinite(timing.wallMs) && timing.wallMs > 0 ? timing.wallMs : 0;
				let segments = [];
				let rows = [];
				if (timing !== null && (wall > 0 || timing.calls > 0 || timing.toolCalls > 0)) {
					const callTimes = t("timing.callTimes", { n: fmt(timing.calls) });
					const modelSlices = [{
						key: "ttft",
						color: COLOR.ttft,
						label: t("timing.ttft"),
						ms: timing.ttftMs,
						times: callTimes
					}];
					const buckets = [
						[
							"reasoning",
							COLOR.reasoning,
							t("timing.reasoning"),
							timing.reasoningMs ?? 0
						],
						[
							"text",
							COLOR.text,
							t("timing.text"),
							timing.textMs ?? 0
						],
						[
							"toolarg",
							COLOR.toolarg,
							t("timing.toolArgs"),
							timing.toolArgMs ?? 0
						]
					];
					if (buckets.some(([, , , ms]) => ms > 0)) for (const [key, color, label, ms] of buckets) modelSlices.push({
						key,
						color,
						label,
						ms
					});
					else modelSlices.push({
						key: "gen",
						color: COLOR.reasoning,
						label: t("timing.gen"),
						ms: timing.genMs
					});
					const ttftRing = Math.min(timing.ttftMs, wall);
					const genRing = Math.max(0, Math.min(timing.genMs, wall - ttftRing));
					const modelRings = [ttftRing];
					let used = ttftRing;
					const genEnd = ttftRing + genRing;
					for (const slice of modelSlices.slice(1)) {
						const take = Math.max(0, Math.min(slice.ms, genEnd - used));
						modelRings.push(take);
						used += take;
					}
					const toolRing = Math.max(0, Math.min(timing.toolsMs, wall - ttftRing - genRing));
					const other = Math.max(0, wall - ttftRing - genRing - toolRing);
					const share = (ms) => wall > 0 ? ms / wall : 0;
					const countOf = (ms, times) => {
						const dur = fmtDuration(ms);
						if (times === void 0) return dur;
						return ms > 0 ? `${dur} · ${times}` : times;
					};
					const modelSegments = modelSlices.map((slice, index) => ({
						key: slice.key,
						color: slice.color,
						value: share(modelRings[index])
					}));
					const toolSlice = {
						key: "tools",
						color: COLOR.tools,
						label: t("timing.tools"),
						ms: timing.toolsMs,
						times: t("timing.toolTimes", { n: fmt(timing.toolCalls) })
					};
					const otherSlice = {
						key: "other",
						color: COLOR.other,
						label: t("timing.other"),
						ms: other
					};
					segments = [
						...modelSegments,
						{
							key: "tools",
							color: COLOR.tools,
							value: share(toolRing)
						},
						{
							key: "other",
							color: COLOR.other,
							value: share(other)
						}
					];
					const toRow = (slice) => ({
						key: slice.key,
						color: slice.color,
						label: slice.label,
						dim: slice.ms === 0,
						pct: fmtShare(slice.ms, wall),
						count: countOf(slice.ms, slice.times)
					});
					rows = [
						...modelSlices.map(toRow),
						toRow(toolSlice),
						toRow(otherSlice)
					].filter((row) => !row.dim);
				}
				return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "lc-card lc-col-stats lc-col-donut flex-1 min-w-[min(360px,100%)]",
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "lc-card-title",
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "lc-card-title-text",
							children: t("timing.title")
						})
					}), rows.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "lc-empty",
						children: t("timing.empty")
					}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "lc-donut-row flex items-center justify-start gap-3 min-w-0 @max-[320px]/lc-card:gap-2 @max-[240px]/lc-card:flex-wrap",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Donut, {
							segments,
							size: 96,
							centerTop: wall > 0 ? fmtDuration(wall) : "—",
							centerSub: t("timing.total"),
							hoverKey,
							onHoverKey: setHoverKey
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SliceList, {
							rows,
							hoverKey,
							onHoverKey: setHoverKey
						})]
					})]
				});
			};
		}
		//#endregion
		//#region src/client/components/statsTokens.tsx
		/**
		* The Token card: the session's whole billed token usage — the SAME total
		* the harness chat stats line shows under the composer (uncached input +
		* cache read + cache write + output off the official `tokenUsage`
		* projection) — split by WHAT the tokens are, not by how the provider
		* cached them. The six composition categories share the provider-reported
		* prompt-side total by the composition card's own estimated ratios
		* (billedParts), and the provider's exact output count is its own slice, so
		* the ring and the center figure always equal the chat line's figure by
		* construction. The estimated category counts carry the ≈ marker (the
		* composition card's convention); the center total and the output count are
		* exact. Zero parts stay hidden once any usage is reported; the empty state
		* (no provider report yet) keeps all seven rows behind a dash center.
		*/
		const NO_USAGE = {
			uncachedInputTokens: 0,
			outputTokens: 0,
			cacheReadTokens: 0,
			cacheWriteTokens: 0
		};
		function makeStatsTokens(kit, Donut) {
			const { t, fmt, fmtShare, catLabel } = kit;
			const SliceList = makeSliceList(kit);
			return function StatsTokens(props) {
				const [hoverKey, setHoverKey] = (0, react.useState)(null);
				const total = (props.usage !== null ? numOf(props.usage.uncachedInputTokens) + numOf(props.usage.cacheReadTokens) + numOf(props.usage.cacheWriteTokens) : 0) + (props.usage !== null ? numOf(props.usage.outputTokens) : 0);
				const parts = billedParts(props.current, props.breakdown, props.usage ?? NO_USAGE);
				const shown = total > 0 ? parts.filter((p) => p.value > 0) : parts;
				const rows = shown.map((p) => ({
					key: p.key,
					color: p.color,
					label: p.key === "output" ? t("tokens.output") : catLabel(p.key),
					pct: fmtShare(p.value, total),
					count: p.key === "output" ? `${fmt(p.value)} · ${t("tokens.outputNote")}` : "≈" + fmt(p.value)
				}));
				return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "lc-card lc-col-stats lc-col-donut flex-1 min-w-[min(360px,100%)]",
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "lc-card-title",
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "lc-card-title-text",
							children: t("tokens.title")
						})
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "lc-donut-row flex items-center justify-start gap-3 min-w-0 @max-[320px]/lc-card:gap-2 @max-[240px]/lc-card:flex-wrap",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Donut, {
							segments: shown,
							size: 96,
							centerTop: props.usage === null ? "—" : fmt(total),
							centerSub: t("tokens.total"),
							hoverKey,
							onHoverKey: setHoverKey
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SliceList, {
							rows,
							hoverKey,
							onHoverKey: setHoverKey
						})]
					})]
				});
			};
		}
		//#endregion
		//#region src/client/sidebar.ts
		/**
		* The right Sidebar's Context tab (dsh 0.1.5-rc.1+).
		*
		* The tab reuses the Context conversation-view component VERBATIM: the
		* `sidebar.right.pane.tab` seat is session-scoped and delivers the same
		* framework standard kit (`sessionId`, `useProjection`, `useChat`, the locale
		* `t` seat) the `conversation.view` seat does, so the panel and the tab are
		* one component with one data path. The tab type contributes a guide entry, so
		* the sidebar's guide page offers "Context" and picking it opens the panel —
		* the product's own path, exactly as the shipped Files type does: a capsule of
		* glyph, title, and description line, plus the chip-title seat that puts the
		* same glyph beside the label once the tab is open (`icon.tsx`).
		*
		* OPTIONAL BY CONTRACT. `ctx.sidebarRightTabs` and the seat ship only on the
		* 0.1.5 line (0.1.5-rc.1+ supported); the registration therefore rides a
		* DEFERRED inject (the plugin's hard injects stay `slots` + `locale`), so on
		* every older supported line the callback never fires, the plugin fiber never
		* pends, and nothing is registered. The registry is re-proved structurally and
		* the whole registration is guarded: a foreign or hostile registry (a throwing
		* `register`, a taken id/kind) leaves the sidebar without the tab instead of
		* taking the browser down.
		*
		* @module dsh-context/client/sidebar
		*/
		/** The tab type's identity in the sidebar's tab system (also its body-seat key). */
		const SIDEBAR_CONTEXT_ID = "dsh-context";
		/**
		* The kind `openTab` names. Namespaced rather than the bare `context`: the
		* registry THROWS when a kind collides with another registration in a
		* non-coexisting band, and a foreign plugin may well own `context`.
		*/
		const SIDEBAR_CONTEXT_KIND = "dsh-context";
		/** The guide capsule's position: after the shipped Files entry (order 10). */
		const GUIDE_ORDER = 20;
		/**
		* Register the Context tab type, its body, and its chip title on the right
		* Sidebar, if — and only if — this harness serves the sidebar tab registry.
		* @param ctx - client root context carrying `slots` and the locale service.
		* @param view - the Context view component factory result (the same one the
		*   conversation tab mounts).
		* @param t - the plugin-namespace translate; the label thunks read the active
		*   locale at call time, so a language switch relabels the guide entry.
		* @param ns - the plugin's locale namespace, put on the body registration so
		*   the framework synthesizes the `t` seat for the panel too.
		* @returns the deferred inject's disposer (placement toggling calls it to
		*   take the mount down; a no-op on faces that return no handle).
		*/
		function watchSidebarContextTab(ctx, view, t, ns) {
			const handle = ctx.inject(["sidebarRightTabs"], (raw) => {
				const injected = raw;
				const disposers = [];
				const own = (result) => {
					if (typeof result === "function") disposers.push(result);
				};
				try {
					const tabs = injected.sidebarRightTabs;
					if (tabs === void 0 || typeof tabs.register !== "function") return;
					own(tabs.register({
						id: SIDEBAR_CONTEXT_ID,
						kind: SIDEBAR_CONTEXT_KIND,
						title: () => t("tab"),
						guide: [{
							order: GUIDE_ORDER,
							title: () => t("tab"),
							description: () => t("sidebar.guideDescription"),
							icon: ContextIcon
						}]
					}));
					own(injected.slots.inject("sidebar.right.pane.tab", () => injected.slots.register({
						name: "sidebar.right.pane.tab",
						key: SIDEBAR_CONTEXT_ID,
						locale: ns
					}, (props) => view({
						...props,
						host: "sidebar"
					}))));
					own(injected.slots.inject("sidebar.right.pane.tab.title", () => injected.slots.register({
						name: "sidebar.right.pane.tab.title",
						key: SIDEBAR_CONTEXT_ID
					}, makeContextTabTitle(t))));
				} catch {
					for (const dispose of disposers) dispose();
					return;
				}
				return () => {
					for (const dispose of disposers) dispose();
				};
			});
			return () => {
				handle?.dispose?.();
			};
		}
		//#endregion
		//#region src/client/viewFocus.ts
		/**
		* Chat → Context jump relay. The assistant-message action records the clicked
		* reply's request seq here and opens the Context view — the right Sidebar's
		* tab when this harness serves one, else the conversation tab; the view
		* consumes the one-shot focus once its projection data is in. Module-level
		* per-session map — the same life pattern as the modal open-state stores.
		*/
		const pendingFocus = /* @__PURE__ */ new Map();
		/** The mounted Context views re-pinning on later records (repeat jumps). */
		const focusListeners = /* @__PURE__ */ new Set();
		/**
		* Record the Context step (request seq) to reveal for `sessionId` — replaces
		* any unconsumed request and wakes the mounted views.
		*/
		function requestContextFocus(sessionId, seq) {
			pendingFocus.set(sessionId, seq);
			for (const listener of focusListeners) listener();
		}
		/**
		* Wake on every record while subscribed: a Context view that is already
		* mounted (the sidebar landing keeps it mounted across jumps) re-pins when a
		* record lands — the listener takes its OWN session's entry, so other
		* sessions' records leave their entries pending for their views.
		*/
		function subscribeContextFocus(listener) {
			focusListeners.add(listener);
			return () => {
				focusListeners.delete(listener);
			};
		}
		/** Take the pending focus request, if any — one-shot, the map entry is consumed. */
		function takeContextFocus(sessionId) {
			const seq = pendingFocus.get(sessionId);
			if (seq === void 0) return null;
			pendingFocus.delete(sessionId);
			return seq;
		}
		/**
		* Open the Context tab on the right Sidebar over `ctx.sidebarRight.openTab`
		* (the column expands in the same step). OPTIONAL seam, re-proved at call
		* time: a harness without the service (every line older than 0.1.5-rc.1), a
		* placement that registered no tab type, no mounted session surface, or a
		* hostile face all report false so the caller keeps its conversation-tab
		* fallback.
		*/
		function openContextSidebar(ctx) {
			try {
				const face = asRecord(ctx.get("sidebarRight"));
				if (face === null || typeof face.openTab !== "function") return false;
				face.openTab.call(face, SIDEBAR_CONTEXT_KIND);
				return true;
			} catch {
				return false;
			}
		}
		/**
		* Activate the Context tab by clicking its own tab-bar button (the semantic
		* `button[role="tab"]` chrome the conversation shell renders for every view).
		* The harness hands `openView` only to the ACTIVE view entry, so a nested
		* chat action cannot call it — this rides the same button a user click would.
		* Already-active is a no-op that still reports success; no matching tab (any
		* dsh layout without the tab bar) reports failure and nothing happens.
		*/
		function activateContextTab(label) {
			const tabs = document.querySelectorAll("button[role=\"tab\"]");
			for (const tab of tabs) {
				if (tab.textContent.trim() !== label) continue;
				if (tab.getAttribute("aria-selected") !== "true") tab.click();
				return true;
			}
			return false;
		}
		//#endregion
		//#region src/client/revealScroll.ts
		/**
		* Scroll an element's nearest scrollable ancestor so the element tops that
		* scrollport. The jump's landing reveal needs this host-agnostic: the
		* conversation tab scrolls the shared `[data-conversation-scroll]` container
		* while the right Sidebar scrolls dockkit's pane body (a CSS-module class,
		* no stable attribute of its own), so the walk takes whichever ancestor
		* actually scrolls — the rect delta lands the anchor flush regardless of the
		* container's current position. `document.body` ends the walk: the page
		* itself never scrolls. False — never a throw — when no ancestor scrolls (the
		* layout already shows the element) or the chain turns hostile.
		*
		* @module dsh-context/client/revealScroll
		*/
		function revealInScrollParent(anchor) {
			try {
				for (let el = anchor.parentElement; el !== null && el !== document.body; el = el.parentElement) {
					const oy = window.getComputedStyle(el).overflowY;
					if (oy === "auto" || oy === "scroll") {
						el.scrollTop += anchor.getBoundingClientRect().top - el.getBoundingClientRect().top;
						return true;
					}
				}
			} catch {}
			return false;
		}
		//#endregion
		//#region src/client/components/contextView.tsx
		/**
		* Context tab root: renders the `contextTimeline` projection and composes stats, composition, history, events and messages.
		* The data plane is the harness's projection pipeline end to end; the one addition is the split generation's on-demand
		* detail read (timelineSource.ts) — the pushed wire value is the slim head, and the heavy collections arrive from the
		* host's detail endpoint only while the tab (or modal) is open.
		*/
		const viewScroll = /* @__PURE__ */ new Map();
		const EVENT_KINDS = [
			"inject",
			"compaction",
			"prune",
			"model",
			"mode"
		];
		function makeContextView(ctx, kit, settings) {
			const { t } = kit;
			const StackedBar = makeStackedBar(kit);
			const CurrentComposition = makeCurrentComposition(kit, StackedBar, makeLegend(kit));
			const TrendChart = makeTrendChart(kit);
			const RequestDetail = makeRequestDetail(kit, StackedBar);
			const EventList = makeEventList(kit);
			const FileCard = makeFileCard(kit, settings);
			const Donut = makeDonut(kit);
			const heads = makeAgentHeads(ctx);
			const StatsContext = makeStatsContext(kit, makeSubagentCost(ctx, heads));
			const StatsTiming = makeStatsTiming(kit, Donut);
			const StatsTokens = makeStatsTokens(kit, Donut);
			const PluginInfo = makePluginInfo(kit);
			const UpgradeGate = makeUpgradeGate(kit);
			const DetailNote = makeDetailNote(kit);
			const ContextBrowser = makeContextBrowser(kit, StackedBar, settings);
			const AgentGraph = makeAgentGraph(ctx, kit, heads);
			const ErrorBoundary = makeErrorBoundary(t);
			function ContextViewBody(props) {
				const sessionId = props.sessionId;
				const inSidebar = props.host === "sidebar";
				const source = useTimelineSource(ctx, props);
				const data = source.data;
				const pressure = projectionOf(props, "contextPressure", contextPressureOf);
				const usage = projectionOf(props, "tokenUsage", tokenUsageOf);
				const breakdown = projectionOf(props, "contextBreakdown", contextBreakdownOf);
				const headers = projectionOf(props, "contextHeaders", headersOf);
				const [selectedSeq, setSelectedSeq] = (0, react.useState)(null);
				const [hoveredSeq, setHoveredSeq] = (0, react.useState)(null);
				const [hoverTurn, setHoverTurn] = (0, react.useState)(null);
				const [granularity, setGranularity] = (0, react.useState)(() => settings.defaultGranularity());
				const [trendMode, setTrendMode] = (0, react.useState)(() => settings.defaultTrendMode());
				const [adaptive, setAdaptive] = (0, react.useState)(false);
				const [focusTurn, setFocusTurn] = (0, react.useState)(null);
				const [jumpSeq, setJumpSeq] = (0, react.useState)(null);
				const [hoverCat, setHoverCat] = (0, react.useState)(null);
				const [focusCat, setFocusCat] = (0, react.useState)(null);
				const [pickedKinds, setPickedKinds] = (0, react.useState)([...EVENT_KINDS]);
				const toggleKind = (k) => {
					setPickedKinds((p) => {
						if (p.length === EVENT_KINDS.length) return [k];
						if (!p.includes(k)) return [...p, k];
						return p.length === 1 ? [...EVENT_KINDS] : p.filter((x) => x !== k);
					});
				};
				const [nodeFocus, setNodeFocus] = (0, react.useState)(null);
				const clearNodeFocus = (0, react.useCallback)(() => {
					setNodeFocus(null);
				}, []);
				const loadImage = (0, react.useMemo)(() => imageLoaderOf(ctx, typeof sessionId === "string" ? sessionId : void 0), [ctx, sessionId]);
				const historyFace = useHistoryFace();
				const fetchContent = (0, react.useMemo)(() => typeof sessionId === "string" && sessionId !== "" && historyFace !== void 0 ? makeContentFetcher(sessionId) : void 0, [sessionId, historyFace]);
				const fetchHeader = (0, react.useMemo)(() => typeof sessionId === "string" && sessionId !== "" && historyFace !== void 0 ? makeHeaderFetcher(sessionId) : void 0, [sessionId, historyFace]);
				const rootRef = (0, react.useRef)(null);
				const scrollerRef = (0, react.useRef)(null);
				const restoredRef = (0, react.useRef)(null);
				(0, react.useLayoutEffect)(() => {
					if (typeof sessionId !== "string" || sessionId === "" || data === null) return;
					if (restoredRef.current === sessionId) return;
					restoredRef.current = sessionId;
					/* v8 ignore next 3 -- a layout effect body only runs while mounted and
					both render paths attach rootRef, so the null arm cannot fire. */
					const scroller = rootRef.current !== null ? rootRef.current.closest("[data-conversation-scroll]") : null;
					if (scroller === null) return;
					scrollerRef.current = scroller;
					scroller.scrollTop = viewScroll.get(sessionId) ?? 0;
				}, [sessionId, data]);
				(0, react.useLayoutEffect)(() => {
					return () => {
						if (typeof sessionId !== "string" || sessionId === "") return;
						const scroller = scrollerRef.current;
						if (scroller === null) return;
						viewScroll.set(sessionId, scroller.scrollTop);
					};
				}, [sessionId]);
				const requests = data ? data.requests : [];
				const events = data ? data.events : [];
				const counts = data?.counts ?? countsOfRecords(requests, events);
				const kindCounts = {
					inject: counts.injects,
					compaction: counts.compactions,
					prune: counts.prunes
				};
				const shownEvents = pickedKinds.length === EVENT_KINDS.length ? events : events.filter((e) => pickedKinds.includes(e.kind));
				const displayRequests = (0, react.useMemo)(() => granularity === "turn" ? aggregateByTurn(requests) : requests, [requests, granularity]);
				const stepsOf = (0, react.useMemo)(() => turnStepsOf(requests), [requests]);
				const markers = (0, react.useMemo)(() => attachMarkers(displayRequests, events), [displayRequests, events]);
				(0, react.useEffect)(() => {
					if (typeof sessionId !== "string" || sessionId === "") return;
					const take = () => {
						const seq = takeContextFocus(sessionId);
						if (seq !== null) setJumpSeq(seq);
					};
					take();
					return subscribeContextFocus(take);
				}, [sessionId]);
				const detailReady = source.detailState === "ready" || source.detailState === "legacy";
				(0, react.useEffect)(() => {
					if (jumpSeq === null || data === null || !detailReady) return;
					setJumpSeq(null);
					const target = jumpTargetOf(aggregateByTurn(requests), jumpSeq);
					if (target === null) return;
					setGranularity("turn");
					setSelectedSeq(target.seq);
					setFocusTurn(target.turn ?? 0);
					/* v8 ignore next 2 -- the effect only fires while mounted, and both render paths attach
					rootRef and render the composition card. */
					const anchor = rootRef.current?.querySelector("[data-lc-current]") ?? null;
					if (anchor !== null) revealInScrollParent(anchor);
				}, [
					jumpSeq,
					data,
					requests,
					detailReady
				]);
				const briefList = (0, react.useMemo)(() => data ? briefNodes(data) : [], [data]);
				const convNodes = conversationNodesOf(props);
				const bySeq = (0, react.useMemo)(() => {
					const m = /* @__PURE__ */ new Map();
					for (const n of convNodes ?? []) m.set(n.seq, n);
					return m;
				}, [convNodes]);
				let pinnedIdx = -1;
				for (let i = 0; i < displayRequests.length; i++) if (displayRequests[i].seq === selectedSeq) pinnedIdx = i;
				const pinnedReq = pinnedIdx >= 0 ? displayRequests[pinnedIdx] : null;
				let activeIdx = -1;
				if (hoveredSeq !== null) {
					for (let i = 0; i < displayRequests.length; i++) if (displayRequests[i].seq === hoveredSeq) {
						activeIdx = i;
						break;
					}
				}
				if (activeIdx < 0) activeIdx = pinnedIdx;
				if (activeIdx < 0 && displayRequests.length > 0) activeIdx = displayRequests.length - 1;
				const activeReq = activeIdx >= 0 ? displayRequests[activeIdx] : null;
				let filesBefore = null;
				if (activeReq !== null) {
					const ri = requests.findIndex((r) => r.seq === activeReq.seq);
					filesBefore = ri + 1 < requests.length ? requests[ri + 1].seq : null;
				}
				const brief = (0, react.useMemo)(() => activeReq !== null ? briefOf(briefList, displayRequests, activeIdx) : null, [
					activeReq,
					briefList,
					displayRequests,
					activeIdx
				]);
				const convOf = (0, react.useCallback)((seq) => bySeq.get(seq), [bySeq]);
				const fileActivity = (0, react.useMemo)(() => {
					if (data !== null && data.fileOps !== void 0) return activityOfOps(data.fileOps, data.archive, filesBefore);
					return activityOf(briefList, convOf, filesBefore);
				}, [
					data,
					briefList,
					convOf,
					filesBefore
				]);
				const workspace = typeof ctx.get === "function" ? workspaceOf(ctx, typeof sessionId === "string" ? sessionId : void 0) : void 0;
				const [canOpenPaths, setCanOpenPaths] = (0, react.useState)(false);
				(0, react.useEffect)(() => {
					let live = true;
					canOpenPathsOf(ctx).then((can) => {
						if (live) setCanOpenPaths(can);
					});
					return () => {
						live = false;
					};
				}, [ctx]);
				const fileOpener = (0, react.useMemo)(() => canOpenPaths ? openPathVia(ctx) : void 0, [canOpenPaths, ctx]);
				const previewOpener = (0, react.useMemo)(() => openResourceVia(ctx), [ctx]);
				const sessionKey = typeof sessionId === "string" ? sessionId : void 0;
				const previewFile = (0, react.useMemo)(() => previewOpener === void 0 ? void 0 : (entry) => {
					const address = previewAddressOf(entry.path, entry.form, entry.pattern, sessionKey, workspace);
					return address !== void 0 && previewOpener(address);
				}, [
					previewOpener,
					sessionKey,
					workspace
				]);
				const locateFileOp = (0, react.useCallback)((op) => {
					const seq = op.parent ?? op.seq;
					const step = locateStepOf(requests, seq, op.gone);
					if (step === null) return;
					setNodeFocus({
						step,
						seq,
						cat: "tool"
					});
				}, [requests]);
				const locateNode = (0, react.useCallback)((node, isResponse) => {
					/* v8 ignore next 1 -- locateNode is only wired to brief rows, and
					brief !== null guarantees activeReq !== null in the same closure. */
					if (activeReq === null) return;
					const next = isResponse && activeIdx + 1 < displayRequests.length ? displayRequests[activeIdx + 1] : null;
					const step = isResponse ? next !== null ? next.seq : "live" : activeReq.seq;
					setNodeFocus({
						step,
						seq: node.seq,
						cat: node.cat
					});
				}, [
					activeReq,
					activeIdx,
					displayRequests
				]);
				if (!data) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "lc-root",
					ref: rootRef,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "lc-empty",
						children: t("loading")
					})
				});
				const markerOf = (req) => {
					const i = displayRequests.indexOf(req);
					/* v8 ignore next 1 -- the only caller passes displayRequests[activeIdx],
					an element of the very array indexOf scans. */
					return i >= 0 ? markers[i] : void 0;
				};
				const head = headlineOf(data, pressure, breakdown);
				let fileScope = t("files.scopeLatest");
				if (activeReq !== null && filesBefore !== null) fileScope = activeReq.stepCount !== void 0 && activeReq.stepCount > 1 ? t("detail.turn", {
					t: activeReq.turn ?? 0,
					n: activeReq.stepCount
				}) : t("detail.step", {
					t: activeReq.turn ?? 0,
					s: activeReq.step ?? 0,
					n: stepsOf(activeReq.turn)
				});
				let activeTurn = hoverTurn;
				if (activeTurn === null && hoveredSeq !== null) {
					for (const req of displayRequests) if (req.seq === hoveredSeq) {
						activeTurn = req.turn ?? null;
						break;
					}
				}
				const trendHoverCat = hoverCat !== null && hoverCat !== "free" ? hoverCat : null;
				const localeSvc = ctx.get("locale");
				const activeLocale = localeSvc !== void 0 && typeof localeSvc.getLocale === "function" ? localeSvc.getLocale().active : "en";
				const subtitle = (data.model ?? "") + (data.provider ? " · " + data.provider : "");
				const gate = unsupportedOf(data.unsupported);
				const compositionCard = /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CurrentComposition, {
					head,
					subtitle,
					hoverKey: hoverCat,
					onHoverKey: setHoverCat
				});
				const trendCard = /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "lc-card",
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "lc-card-title",
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "lc-card-title-text",
								children: t("trend.title")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "lc-gran lc-trend-adaptive",
								role: "group",
								title: t("trend.adaptiveHint"),
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: "lc-gran-btn" + (adaptive ? " lc-gran-on" : ""),
									onClick: () => {
										setAdaptive((on) => !on);
									},
									children: t("trend.adaptive")
								})
							}),
							focusCat !== null ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "lc-card-sub",
								children: t("trend.focus", { cat: kit.catLabel(focusCat) })
							}) : null,
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "lc-trend-ctl",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "lc-gran",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
										className: "lc-gran-btn" + (granularity === "step" ? " lc-gran-on" : ""),
										onClick: () => {
											setGranularity("step");
										},
										children: t("gran.step")
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
										className: "lc-gran-btn" + (granularity === "turn" ? " lc-gran-on" : ""),
										onClick: () => {
											setGranularity("turn");
										},
										children: t("gran.turn")
									})]
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "lc-gran",
									title: t("gran.modeHint"),
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
										className: "lc-gran-btn" + (trendMode === "total" ? " lc-gran-on" : ""),
										onClick: () => {
											setTrendMode("total");
										},
										children: t("gran.total")
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
										className: "lc-gran-btn" + (trendMode === "delta" ? " lc-gran-on" : ""),
										onClick: () => {
											setTrendMode("delta");
										},
										children: t("gran.delta")
									})]
								})]
							})
						]
					}), displayRequests.length === 0 ? detailReady ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "lc-empty",
						children: t("trend.empty")
					}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DetailNote, {
						state: source.detailState === "failed" ? "failed" : "loading",
						onRetry: source.retryDetail
					}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(TrendChart, {
						requests: displayRequests,
						markers,
						selectedSeq: pinnedReq ? pinnedReq.seq : null,
						hoveredSeq,
						activeTurn,
						granularity,
						mode: trendMode,
						focusTurn,
						hoverCat: trendHoverCat,
						focusCat,
						adaptive,
						onSelect: setSelectedSeq,
						onHover: setHoveredSeq,
						onHoverTurn: setHoverTurn,
						onPickTurn: (turn) => {
							setGranularity("turn");
							setFocusTurn(turn);
						},
						onFocusTurnHandled: () => {
							setFocusTurn(null);
						}
					}, sessionId), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(RequestDetail, {
						request: activeReq,
						prev: trendMode === "delta" && activeIdx >= 0 ? activeIdx > 0 ? displayRequests[activeIdx - 1] : null : void 0,
						/* v8 ignore next 1 -- RequestDetail renders only when
						displayRequests.length > 0, which forces activeReq
						non-null via the activeIdx fallback above. */
						marker: activeReq !== null ? markerOf(activeReq) : void 0,
						brief,
						convOf,
						stepsOf,
						onLocate: locateNode,
						hoverKey: trendHoverCat
					})] })]
				});
				const browserCard = /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ContextBrowser, {
					data,
					headers,
					convNodes,
					fetchContent,
					fetchHeader,
					previewSeq: hoveredSeq,
					pinSeq: pinnedReq !== null ? pinnedReq.seq : null,
					hoverKey: hoverCat,
					onHoverKey: setHoverCat,
					onOpenCat: setFocusCat,
					nodeFocus,
					onNodeFocusHandled: clearNodeFocus,
					loadImage,
					detailState: source.detailState,
					onDetailRetry: source.retryDetail
				});
				return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "lc-root",
					ref: rootRef,
					children: [
						inSidebar ? null : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "lc-cols lc-head",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(StatsContext, {
								counts,
								humanInputs: data.humanInputs,
								toolCalls: data.toolCalls,
								usage,
								cost: data.cost,
								locale: activeLocale,
								sessionId: typeof sessionId === "string" ? sessionId : void 0
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PluginInfo, {})]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "lc-cols lc-head",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(StatsTokens, {
								usage,
								current: data.current,
								breakdown
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(StatsTiming, { timing: data.timing ?? null })]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "lc-cols lc-cols-main",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "lc-col flex-1 min-w-[min(360px,100%)]",
								children: [compositionCard, trendCard]
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: "lc-col lc-col-browser flex-1 min-w-[min(360px,100%)]",
								children: browserCard
							})]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "lc-cols",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "lc-card lc-col flex-1 min-w-[min(360px,100%)]",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "lc-card-title",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: "lc-card-title-text",
										children: t("events.title")
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: "lc-kinds @max-[380px]/lc-card:flex-wrap",
										children: EVENT_KINDS.map((k) => {
											const n = kindCounts[k];
											return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
												"data-kind": k,
												className: "lc-gran-btn" + (pickedKinds.includes(k) ? " lc-gran-on lc-kind-" + k : ""),
												onClick: () => {
													toggleKind(k);
												},
												children: [t("kind." + k), n !== void 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													className: "lc-kind-n",
													children: kit.fmt(n)
												}) : null]
											}, k);
										})
									})]
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(EventList, {
									events: shownEvents,
									state: source.detailState,
									onRetry: source.retryDetail
								})]
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FileCard, {
								activity: fileActivity,
								scope: fileScope,
								workspace,
								onPreview: previewFile,
								onOpen: fileOpener,
								onLocate: locateFileOp,
								state: source.detailState,
								onRetry: source.retryDetail
							})]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(AgentGraph, {
							sessionId: typeof sessionId === "string" ? sessionId : void 0,
							self: {
								head,
								billed: usage !== null ? numOf(usage.uncachedInputTokens) + numOf(usage.outputTokens) + numOf(usage.cacheReadTokens) + numOf(usage.cacheWriteTokens) : null,
								requests: requests.length
							}
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "lc-foot",
							children: t("footer")
						}),
						gate !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(UpgradeGate, {
							sessionId,
							current: gate.current,
							minimum: gate.minimum
						})
					]
				});
			}
			return function ContextView(props) {
				return (0, react.createElement)(ErrorBoundary, null, (0, react.createElement)(ContextViewBody, props));
			};
		}
		//#endregion
		//#region src/client/components/contextJump.tsx
		/**
		* The assistant-message action that opens the Context view at this reply's
		* turn. Registered on the harness `conversation.chat.assistant-actions` seat
		* (the icon row beside copy/branch), it receives the finalized reply's durable
		* message id, resolves the matching assistant node's seq off the `useChat`
		* node seat AT RENDER TIME (the seat is a real React hook — render-only; a
		* click-time read throws the dispatcher guard and the jump would land
		* unpinned), records it in the viewFocus relay on click, and opens the
		* Context tab on the right Sidebar — where the jump pins the reply's TURN
		* (see contextView's leg 2). A harness or placement without the sidebar tab
		* falls back to the conversation tab; an unresolvable seq still opens the
		* view, just without a pin; a message id that is not a plain string renders
		* nothing at all.
		*/
		/**
		* The reply's request seq by its durable message id, or null when no served node proves the pair. Join/log nodes are untrusted input: each
		* element is isolated, so one hostile object that throws on property access is skipped — the jump keeps its pin, never its click.
		*/
		function seqOfMessageId(nodes, messageId) {
			for (const node of nodes ?? []) try {
				if (node.kind !== "assistant" || node.messageId !== messageId) continue;
				return typeof node.seq === "number" && Number.isFinite(node.seq) ? node.seq : null;
			} catch {
				continue;
			}
			return null;
		}
		/** The jump glyph: the plugin's mini stacked composition bars, same 16px outline family as the shipped row icons. */
		function JumpIcon() {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
				width: "16",
				height: "16",
				viewBox: "0 0 16 16",
				className: "fill-none",
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("rect", {
						x: "2",
						y: "3",
						width: "12",
						height: "2",
						rx: "1",
						className: "fill-current"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("rect", {
						x: "2",
						y: "7",
						width: "8.5",
						height: "2",
						rx: "1",
						className: "fill-current"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("rect", {
						x: "2",
						y: "11",
						width: "5.5",
						height: "2",
						rx: "1",
						className: "fill-current"
					})
				]
			});
		}
		function makeContextJumpButton(ctx, kit) {
			const { t } = kit;
			return function ContextJump(props) {
				const nodes = conversationNodesOf(props);
				const messageId = props.messageId;
				if (typeof messageId !== "string" || messageId === "") return null;
				const seq = seqOfMessageId(nodes, messageId);
				const jump = () => {
					const sessionId = props.sessionId;
					if (seq !== null && typeof sessionId === "string" && sessionId !== "") requestContextFocus(sessionId, seq);
					if (!openContextSidebar(ctx)) activateContextTab(t("tab"));
				};
				return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Tooltip, {
					label: t("jump.title"),
					side: "bottom",
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						type: "button",
						className: "lc-jump hover:bg-(--dsw-alias-interactive-bg-hover) hover:text-(--dsw-alias-label-secondary)",
						"aria-label": t("jump.title"),
						onClick: jump,
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(JumpIcon, {})
					})
				});
			};
		}
		//#endregion
		//#region src/client/placement.ts
		/**
		* Mount per the current preference and keep the registrations glued to it
		* until the returned disposer runs.
		*/
		function watchPlacement(settings, mounts) {
			let tab;
			let sidebar;
			const own = (result) => typeof result === "function" ? result : void 0;
			const mount = (placement) => {
				const wantTab = placement !== "sidebar";
				const wantSidebar = placement !== "tab";
				if (wantTab && tab === void 0) tab = own(mounts.tab());
				if (!wantTab && tab !== void 0) {
					tab();
					tab = void 0;
				}
				if (wantSidebar && sidebar === void 0) sidebar = own(mounts.sidebar());
				if (!wantSidebar && sidebar !== void 0) {
					sidebar();
					sidebar = void 0;
				}
			};
			mount(settings.defaultPlacement());
			const unsubscribe = settings.store.subscribe(() => {
				mount(settings.defaultPlacement());
			});
			return () => {
				unsubscribe();
				tab?.();
				sidebar?.();
				tab = void 0;
				sidebar = void 0;
			};
		}
		//#endregion
		//#region src/client/viewkit.ts
		function makeViewKit(t) {
			const { eventLabel, eventAt } = makeEventText(t);
			return {
				t,
				fmt,
				fmtTime,
				fmtDuration,
				fmtShare,
				catLabel: (key) => t("cat." + key),
				eventLabel,
				eventAt
			};
		}
		//#endregion
		//#region \0dsh-global-css:D:\dsh-plugins\dsh-context\src\client\styles\tailwind.css.mjs
		const css$15 = "/*! tailwindcss v4.3.3 | MIT License | https://tailwindcss.com */\n@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-border-style:solid;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-outline-style:solid;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial}}}:root,:host{--spacing:4px;--color-red-500:oklch(63.7% .237 25.331);--color-orange-500:oklch(70.5% .213 47.604);--color-amber-500:oklch(76.9% .188 70.08);--color-green-500:oklch(72.3% .219 149.579);--color-teal-500:oklch(70.4% .14 182.503);--color-blue-500:oklch(62.3% .214 259.815);--color-indigo-500:oklch(58.5% .233 277.117);--color-violet-500:oklch(60.6% .25 292.717);--color-purple-500:oklch(62.7% .265 303.9);--color-pink-500:oklch(65.6% .241 354.308);--color-slate-400:oklch(70.4% .04 256.788);--color-neutral-500:oklch(55.6% 0 none);--animate-lc-donut-in:lc-donut-in .45s cubic-bezier(.4, 0, .2, 1) calc(var(--lc-i,0) * 50ms) backwards;--animate-lc-stacked-in:lc-stacked-in .4s cubic-bezier(.4, 0, .2, 1) calc(var(--lc-i,0) * 40ms) backwards;--animate-lc-bar-in:lc-bar-in .35s cubic-bezier(.4, 0, .2, 1) calc(var(--lc-i,0) * 15ms) backwards;--animate-lc-agent-flow:lc-agent-flow .9s linear infinite;--animate-lc-agent-glow:lc-agent-glow 1.8s ease-in-out infinite}.collapse{visibility:collapse}.visible{visibility:visible}.absolute{position:absolute}.fixed{position:fixed}.relative{position:relative}.static{position:static}.container{width:100%}.block{display:block}.flex{display:flex}.grid{display:grid}.hidden{display:none}.inline{display:inline}.table{display:table}.min-w-0{min-width:0}.min-w-\\[min\\(360px\\,100\\%\\)\\]{min-width:min(360px,100%)}.flex-1{flex:1}.flex-auto{flex:auto}.shrink{flex-shrink:1}.grow{flex-grow:1}.transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.animate-lc-agent-flow{animation:var(--animate-lc-agent-flow)}.animate-lc-agent-glow{animation:var(--animate-lc-agent-glow)}.animate-lc-bar-in{animation:var(--animate-lc-bar-in)}.animate-lc-donut-in{animation:var(--animate-lc-donut-in)}.animate-lc-stacked-in{animation:var(--animate-lc-stacked-in)}.resize{resize:both}.grid-cols-\\[repeat\\(auto-fit\\,minmax\\(108px\\,1fr\\)\\)\\]{grid-template-columns:repeat(auto-fit,minmax(108px,1fr))}.flex-wrap{flex-wrap:wrap}.items-center{align-items:center}.justify-start{justify-content:flex-start}.gap-1\\.5{gap:calc(var(--spacing) * 1.5)}.gap-3{gap:calc(var(--spacing) * 3)}.truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.border{border-style:var(--tw-border-style);border-width:1px}.fill-\\(--dsw-alias-bg-layer-1\\){fill:var(--dsw-alias-bg-layer-1)}.fill-\\(--dsw-alias-label-primary\\){fill:var(--dsw-alias-label-primary)}.fill-current{fill:currentColor}.fill-none{fill:none}.fill-transparent{fill:#0000}.stroke-\\(--dsw-alias-border-l1\\){stroke:var(--dsw-alias-border-l1)}.stroke-2{stroke-width:2px}.stroke-4{stroke-width:4px}.stroke-9{stroke-width:9px}.stroke-\\[1\\.5px\\]{stroke-width:1.5px}.ring{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.outline{outline-style:var(--tw-outline-style);outline-width:1px}.filter{filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,ease);transition-duration:var(--tw-duration,0s)}@media (hover:hover){.group-hover\\/agent\\:fill-\\[var\\(--dsw-alias-interactive-bg-hover\\,var\\(--dsw-alias-bg-layer-2\\)\\)\\]:is(:where(.group\\/agent):hover *){fill:var(--dsw-alias-interactive-bg-hover,var(--dsw-alias-bg-layer-2))}.group-hover\\/pi\\:underline:is(:where(.group\\/pi):hover *){text-decoration-line:underline}.group-hover\\/tip\\:border-\\(--dsw-alias-label-primary\\):is(:where(.group\\/tip):hover *){border-color:var(--dsw-alias-label-primary)}.group-hover\\/tip\\:text-\\(--dsw-alias-label-primary\\):is(:where(.group\\/tip):hover *){color:var(--dsw-alias-label-primary)}.group-hover\\/tip\\:opacity-100:is(:where(.group\\/tip):hover *){opacity:1}}.group-focus-visible\\/agent\\:fill-\\[var\\(--dsw-alias-interactive-bg-hover\\,var\\(--dsw-alias-bg-layer-2\\)\\)\\]:is(:where(.group\\/agent):focus-visible *){fill:var(--dsw-alias-interactive-bg-hover,var(--dsw-alias-bg-layer-2))}@media (hover:hover){.hover\\:border-\\(--dsw-alias-label-dimmed\\):hover{border-color:var(--dsw-alias-label-dimmed)}.hover\\:border-\\(--dsw-alias-label-primary\\):hover{border-color:var(--dsw-alias-label-primary)}.hover\\:bg-\\(--dsw-alias-bg-layer-2\\):hover{background-color:var(--dsw-alias-bg-layer-2)}.hover\\:bg-\\(--dsw-alias-interactive-bg-hover\\):hover{background-color:var(--dsw-alias-interactive-bg-hover)}.hover\\:bg-\\[var\\(--dsw-alias-interactive-bg-hover\\,var\\(--dsw-alias-bg-layer-2\\)\\)\\]:hover{background-color:var(--dsw-alias-interactive-bg-hover,var(--dsw-alias-bg-layer-2))}.hover\\:text-\\(--dsw-alias-label-primary\\):hover{color:var(--dsw-alias-label-primary)}.hover\\:text-\\(--dsw-alias-label-secondary\\):hover{color:var(--dsw-alias-label-secondary)}.hover\\:underline:hover{text-decoration-line:underline}.hover\\:brightness-110:hover{--tw-brightness:brightness(110%);filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.hover\\:brightness-\\[1\\.15\\]:hover{--tw-brightness:brightness(1.15);filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}}.focus\\:border-\\(--dsw-alias-label-dimmed\\):focus{border-color:var(--dsw-alias-label-dimmed)}@media (hover:hover){.hover\\:enabled\\:bg-\\(--dsw-alias-interactive-bg-hover\\):hover:enabled{background-color:var(--dsw-alias-interactive-bg-hover)}}.disabled\\:cursor-default:disabled{cursor:default}.disabled\\:opacity-50:disabled{opacity:.5}@media (prefers-reduced-motion:reduce){.motion-reduce\\:animate-none{animation:none}}@container lc-card (width<380px){.\\@max-\\[380px\\]\\/lc-card\\:basis-\\[calc\\(100\\%-46px\\)\\]{flex-basis:calc(100% - 46px)}.\\@max-\\[380px\\]\\/lc-card\\:basis-\\[calc\\(100\\%-92px\\)\\]{flex-basis:calc(100% - 92px)}.\\@max-\\[380px\\]\\/lc-card\\:flex-wrap{flex-wrap:wrap}}@container lc-card (width<320px){.\\@max-\\[320px\\]\\/lc-card\\:gap-2{gap:calc(var(--spacing) * 2)}}@container lc-card (width<240px){.\\@max-\\[240px\\]\\/lc-card\\:mx-auto{margin-inline:auto}.\\@max-\\[240px\\]\\/lc-card\\:basis-full{flex-basis:100%}.\\@max-\\[240px\\]\\/lc-card\\:flex-wrap{flex-wrap:wrap}}@property --tw-rotate-x{syntax:\"*\";inherits:false}@property --tw-rotate-y{syntax:\"*\";inherits:false}@property --tw-rotate-z{syntax:\"*\";inherits:false}@property --tw-skew-x{syntax:\"*\";inherits:false}@property --tw-skew-y{syntax:\"*\";inherits:false}@property --tw-border-style{syntax:\"*\";inherits:false;initial-value:solid}@property --tw-shadow{syntax:\"*\";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:\"*\";inherits:false}@property --tw-shadow-alpha{syntax:\"<percentage>\";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:\"*\";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:\"*\";inherits:false}@property --tw-inset-shadow-alpha{syntax:\"<percentage>\";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:\"*\";inherits:false}@property --tw-ring-shadow{syntax:\"*\";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:\"*\";inherits:false}@property --tw-inset-ring-shadow{syntax:\"*\";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:\"*\";inherits:false}@property --tw-ring-offset-width{syntax:\"<length>\";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:\"*\";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:\"*\";inherits:false;initial-value:0 0 #0000}@property --tw-outline-style{syntax:\"*\";inherits:false;initial-value:solid}@property --tw-blur{syntax:\"*\";inherits:false}@property --tw-brightness{syntax:\"*\";inherits:false}@property --tw-contrast{syntax:\"*\";inherits:false}@property --tw-grayscale{syntax:\"*\";inherits:false}@property --tw-hue-rotate{syntax:\"*\";inherits:false}@property --tw-invert{syntax:\"*\";inherits:false}@property --tw-opacity{syntax:\"*\";inherits:false}@property --tw-saturate{syntax:\"*\";inherits:false}@property --tw-sepia{syntax:\"*\";inherits:false}@property --tw-drop-shadow{syntax:\"*\";inherits:false}@property --tw-drop-shadow-color{syntax:\"*\";inherits:false}@property --tw-drop-shadow-alpha{syntax:\"<percentage>\";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:\"*\";inherits:false}@keyframes lc-donut-in{0%{stroke-dasharray:0 100}}@keyframes lc-stacked-in{0%{transform:scaleX(0)}}@keyframes lc-bar-in{0%{transform:scaleY(0)}}@keyframes lc-agent-flow{to{stroke-dashoffset:-9px}}@keyframes lc-agent-glow{0%,to{opacity:1}50%{opacity:.4}}";
		const tagId$15 = "dsh-context/tailwind.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$15) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-context";
			tag.dataset.pluginCss = tagId$15;
			tag.textContent = css$15;
			document.head.appendChild(tag);
		}
		//#endregion
		//#region \0dsh-global-css:D:\dsh-plugins\dsh-context\src\client\styles\base.css.mjs
		const css$14 = ".lc-root{box-sizing:border-box;height:100%;color:var(--dsw-alias-label-primary);padding:16px 20px 32px;font-size:13px;overflow-y:auto}[data-sidebar-right-open] .lc-root,[data-sidebar-right-float-host] .lc-root{height:auto;padding:12px;overflow:visible}.lc-title-icon{flex:none}.lc-title-label{padding-right:30px}.lc-card{background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l2);border-radius:10px;margin-bottom:14px;padding:14px 16px}.lc-root .lc-card{box-sizing:border-box;margin-bottom:7px;padding:7px 8px;container:lc-card/inline-size}.lc-root .lc-cols{gap:7px;margin-bottom:7px}.lc-card-title{flex-wrap:wrap;align-items:baseline;gap:8px;margin-bottom:10px;font-weight:600;display:flex}.lc-card-title-text{white-space:nowrap;flex:none}.lc-gran,.lc-kinds{background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l2);border-radius:6px;gap:2px;margin-left:auto;padding:1px;display:flex}.lc-trend-ctl{align-items:center;gap:6px;margin-left:auto;display:flex}.lc-trend-ctl .lc-gran{margin-left:0}.lc-trend-adaptive{flex:none;margin-left:0}.lc-gran-btn{color:var(--dsw-alias-label-secondary);cursor:pointer;transition:color var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out);background:0 0;border:0;border-radius:5px;padding:3px 8px;font-family:inherit;font-size:11px;line-height:1}.lc-gran-btn:hover{color:var(--dsw-alias-label-primary)}.lc-gran-on,.lc-gran-on:hover{background:var(--dsw-alias-button-primary-fill);color:var(--dsw-alias-label-primary-foreground)}.lc-kind-n{font-variant-numeric:tabular-nums;opacity:.65;margin-left:4px}.lc-gran-on .lc-kind-n{opacity:.85}.lc-tip{z-index:6;background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);width:max-content;color:var(--dsw-alias-label-primary);box-shadow:var(--dsw-shadow-lv3,0 2px 8px #0000002e);pointer-events:none;opacity:0;transition:opacity var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out);border-radius:6px;padding:6px 10px;font-size:12px;position:absolute}.lc-events,.lc-fa-list{flex-direction:column;gap:2px;height:320px;display:flex;overflow-y:auto}.lc-cols{flex-wrap:wrap;gap:14px;margin-bottom:14px;display:flex}.lc-cols>.lc-card,.lc-col>.lc-card:last-child{margin-bottom:0}.lc-col-browser{flex-direction:column;display:flex}.lc-col-browser>.lc-card{flex:1}.lc-head>.lc-card:has(.lc-stats){flex-direction:column;display:flex}.lc-head .lc-stats{flex:1;align-content:stretch}.lc-head .lc-stat{justify-content:center}.lc-empty{color:var(--dsw-alias-label-secondary);text-align:center;padding:18px 0}.lc-error{flex-direction:column;align-items:center;gap:8px;padding:40px 16px;display:flex}.lc-error-msg{font-family:var(--ds-font-family-code,ui-monospace, SFMono-Regular, Menlo, monospace);color:var(--dsw-alias-state-error-primary);background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);overflow-wrap:anywhere;border-radius:6px;max-width:100%;padding:4px 8px;font-size:12px}.lc-error-retry{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);font:inherit;cursor:pointer;transition:border-color var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out);border-radius:6px;padding:4px 14px;font-size:12px}.lc-foot{color:var(--dsw-alias-label-secondary);margin-top:4px;font-size:12px}[data-conversation-scroll]:has(.lc-root)>[data-composer-seat]:not(:has([data-approval-key],[data-question-key],[data-plan-review-key])),[data-conversation-scroll]:has(.lc-root,.lc-modal-backdrop)~[data-width-handle]{display:none}";
		const tagId$14 = "dsh-context/base.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$14) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-context";
			tag.dataset.pluginCss = tagId$14;
			tag.textContent = css$14;
			document.head.appendChild(tag);
		}
		//#endregion
		//#region \0dsh-global-css:D:\dsh-plugins\dsh-context\src\client\styles\stats.css.mjs
		const css$13 = ".lc-stat{background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l2);border-radius:8px;flex-direction:column;gap:2px;min-width:0;padding:6px;display:flex}.lc-stats .lc-stat{padding:6px 3px}.lc-stats .lc-stat-q{margin:0;position:absolute;top:3px;right:4px}.lc-stat-label{color:var(--dsw-alias-label-secondary);white-space:nowrap;text-overflow:ellipsis;font-size:11px;font-weight:600;overflow:hidden}.lc-stat-value{color:var(--dsw-alias-label-primary);white-space:nowrap;text-overflow:ellipsis;text-align:center;font-size:14px;font-weight:600;overflow:hidden}.lc-stat-sub{color:var(--dsw-alias-label-secondary);white-space:nowrap;text-overflow:ellipsis;font-size:11px;overflow:hidden}.lc-stat-tipped{position:relative}.lc-stat-q{text-align:center;width:11px;height:11px;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l2);cursor:help;transition:color var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out), border-color var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out);border-radius:50%;margin-left:4px;font-size:9px;font-style:normal;font-weight:700;line-height:11px;display:inline-block}.lc-stat-tip{max-width:280px;font-weight:400;line-height:1.5;top:calc(100% + 6px);left:0}.lc-stat-tip-prices{border-top:1px dashed var(--dsw-alias-border-l1);margin-top:5px;padding-top:5px;display:block}.lc-stat-tip-head{font-weight:600;display:block}.lc-stat-tip-row{margin-top:2px;display:block}.lc-stat-tip-model{color:var(--dsw-alias-label-primary)}.lc-card-sub{color:var(--dsw-alias-label-secondary);margin-left:auto;font-size:12px;font-weight:400}.lc-overview-num{align-items:baseline;gap:6px;margin-bottom:8px;display:flex}.lc-overview-num>b{font-size:20px}.lc-overview-num span{color:var(--dsw-alias-label-secondary)}.lc-overview-pct{margin-left:auto;font-size:11px}.lc-overview-pct b{color:var(--dsw-alias-label-primary);margin-right:4px;font-size:20px}.lc-stat-head{color:var(--dsw-alias-label-secondary);margin:12px 0 8px;font-size:11px;font-weight:600}.lc-col-donut{flex-direction:column;display:flex}.lc-col-donut .lc-donut-row{flex:1}.lc-donut{flex:none;position:relative}.lc-donut svg{display:block}.lc-donut-track{stroke:color-mix(in srgb, var(--color-neutral-500) 18%, transparent)}.lc-donut-seg{transition:opacity var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out)}.lc-donut-dim .lc-donut-seg{opacity:.35}.lc-donut-dim .lc-donut-seg-on{opacity:1}.lc-donut-center{pointer-events:none;text-align:center;box-sizing:border-box;flex-direction:column;justify-content:center;align-items:center;gap:1px;padding:0 7px;display:flex;position:absolute;inset:0}.lc-donut-center b{white-space:nowrap;text-overflow:ellipsis;max-width:100%;line-height:1.15;overflow:hidden}.lc-donut-center span{color:var(--dsw-alias-label-secondary);white-space:nowrap}.lc-sl{grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:4px 20px;min-width:0;display:grid;overflow:hidden}.lc-sl-row{min-width:0;transition:background-color var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out);border-radius:6px;flex-direction:column;gap:1px;margin:0 -6px;padding:1px 6px;font-size:12px;display:flex}.lc-sl-row-on{background:var(--dsw-alias-interactive-bg-hover)}.lc-sl-row-dim{opacity:.55}.lc-sl-main{align-items:center;gap:6px;min-width:0;display:flex}.lc-sl-dot{border-radius:2px;flex:none;width:8px;height:8px}.lc-sl-label{white-space:nowrap;text-overflow:ellipsis;flex:auto;min-width:0;font-weight:600;line-height:1.25;overflow:hidden}.lc-sl-pct{text-align:right;font-variant-numeric:tabular-nums;flex:none;min-width:34px;font-weight:700}.lc-sl-sub{color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;white-space:nowrap;text-overflow:ellipsis;margin-left:14px;font-size:11px;line-height:1.3;overflow:hidden}.lc-pi-grid{grid-template-columns:1fr;gap:8px;display:grid}.lc-pi-row-btn{appearance:none;font:inherit;color:inherit;text-align:left;cursor:pointer;background:0 0;border:0;width:100%;padding:0}.lc-pi-row{min-width:0;color:inherit;flex-direction:row;justify-content:space-between;align-items:baseline;gap:12px;text-decoration:none;display:flex}.lc-pi-hint{text-decoration:none}.lc-pi-update{color:var(--dsw-alias-state-warn-primary);white-space:nowrap;margin-left:6px;font-size:11px}.lc-pi-label{color:var(--dsw-alias-label-secondary);white-space:nowrap;text-overflow:ellipsis;flex:none;font-size:11px;font-weight:600;overflow:hidden}.lc-pi-value{min-width:0;color:var(--dsw-alias-label-primary);white-space:nowrap;text-overflow:ellipsis;text-align:right;font-size:13px;font-weight:600;overflow:hidden}.lc-pi-row-btn .lc-pi-value{font-weight:400}";
		const tagId$13 = "dsh-context/stats.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$13) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-context";
			tag.dataset.pluginCss = tagId$13;
			tag.textContent = css$13;
			document.head.appendChild(tag);
		}
		//#endregion
		//#region \0dsh-global-css:D:\dsh-plugins\dsh-context\src\client\styles\jump.css.mjs
		const css$12 = ".lc-jump{width:calc(28px + var(--dsh-content-font-delta,0px));height:calc(28px + var(--dsh-content-font-delta,0px));color:var(--dsw-alias-label-tertiary);cursor:pointer;transition:background-color var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out), color var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out);background:0 0;border:0;border-radius:28px;justify-content:center;align-items:center;padding:6px;display:inline-flex}.lc-jump svg{width:calc(16px + var(--dsh-content-font-delta,0px));height:calc(16px + var(--dsh-content-font-delta,0px))}";
		const tagId$12 = "dsh-context/jump.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$12) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-context";
			tag.dataset.pluginCss = tagId$12;
			tag.textContent = css$12;
			document.head.appendChild(tag);
		}
		//#endregion
		//#region \0dsh-global-css:D:\dsh-plugins\dsh-context\src\client\styles\settings.css.mjs
		const css$11 = ".lc-settings-card{background:var(--dsw-alias-bg-layer-3);border:1px solid var(--dsw-alias-border-l2);transition:border-color var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out), background-color var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out);border-radius:12px}.lc-settings-card:hover{border-color:var(--dsw-alias-label-dimmed)}.lc-settings-open,.lc-settings-open:hover{background:var(--dsw-alias-bg-layer-2);border-color:var(--dsw-alias-label-dimmed)}.lc-settings-head{appearance:none;width:100%;font:inherit;color:inherit;text-align:left;cursor:pointer;background:0 0;border:0;border-radius:12px;align-items:center;gap:12px;padding:14px 16px;display:flex}.lc-settings-headtext{flex-direction:column;flex:1;gap:4px;min-width:0;display:flex}.lc-settings-name{color:var(--dsw-alias-label-primary);font-size:15px;font-weight:600;line-height:1.4}.lc-settings-desc{color:var(--dsw-alias-label-tertiary);font-size:13px;line-height:1.5}.lc-settings-chevron{color:var(--dsw-alias-label-tertiary);transition:transform var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out);flex:none}.lc-settings-open .lc-settings-chevron{transform:rotate(180deg)}.lc-settings-body{border-top:1px solid var(--dsw-alias-border-l2);margin:0 16px;padding:4px 0 12px}.lc-settings-row{align-items:center;gap:8px;padding:8px 0;display:flex}.lc-settings-label{min-width:0;color:var(--dsw-alias-label-primary);flex:1;font-size:14px}.lc-settings-select{background:var(--dsw-alias-bg-module-platform);height:36px;font:inherit;color:var(--dsw-alias-label-primary);cursor:pointer;transition:background-color var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out);border:none;border-radius:18px;align-items:center;gap:12px;padding:0 14px;font-size:14px;line-height:22px;display:inline-flex}.lc-settings-note{color:var(--dsw-alias-label-tertiary);margin:12px 0 4px;font-size:12px;line-height:1.5}";
		const tagId$11 = "dsh-context/settings.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$11) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-context";
			tag.dataset.pluginCss = tagId$11;
			tag.textContent = css$11;
			document.head.appendChild(tag);
		}
		//#endregion
		//#region \0dsh-global-css:D:\dsh-plugins\dsh-context\src\client\styles\stackedBar.css.mjs
		const css$10 = ".lc-stacked-wrap{width:100%;position:relative}.lc-stacked{background:color-mix(in srgb, var(--color-neutral-500) 18%, transparent);border-radius:5px;width:100%;display:flex;position:relative;overflow:hidden}.lc-occupied-box{border:2px solid var(--dsw-alias-label-tertiary);box-sizing:border-box;pointer-events:none;opacity:0;box-shadow:0 0 0 1px var(--dsw-alias-bg-layer-2);transition:opacity var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out);border-radius:5px;position:absolute;top:0;bottom:0;left:0}.lc-occupied-box-on{opacity:1}.lc-bar-tip{z-index:5;white-space:nowrap;padding:3px 8px;bottom:calc(100% + 6px);transform:translate(-50%)}.lc-bar-tip-on{opacity:1}.lc-stacked>div{height:100%}.lc-stacked-seg-pick{cursor:pointer}.lc-stacked-seg{transition:filter var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out), opacity var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out)}.lc-stacked-free{box-sizing:border-box;transition:box-shadow var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out), opacity var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out)}.lc-stacked-seg,.lc-stacked-free{transform-origin:0}.lc-stacked-seg-on{filter:brightness(1.18)}.lc-reserve{z-index:1;pointer-events:auto;cursor:help;background:repeating-linear-gradient(45deg, color-mix(in srgb, var(--dsw-alias-state-warn-primary) 24%, transparent) 0 5px, transparent 5px 10px);position:absolute;top:0;bottom:0}.lc-stacked-free-on{border:2px dashed var(--dsw-alias-label-secondary);border-radius:3px}.lc-stacked-dim .lc-stacked-seg{opacity:.35}.lc-stacked-dim .lc-stacked-seg-on{opacity:1}.lc-stacked-dim .lc-stacked-free{opacity:.35}.lc-stacked-dim .lc-stacked-free-on{opacity:1}.lc-legend{grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:6px 14px;margin-top:10px;display:grid}.lc-chip{min-width:0;color:var(--dsw-alias-label-primary);cursor:pointer;transition:background-color var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out);border-radius:6px;align-items:center;gap:5px;padding:1px 6px;display:flex}.lc-chip-label{white-space:nowrap;text-overflow:ellipsis;min-width:0;font-weight:600;overflow:hidden}.lc-chip-nums{white-space:nowrap;flex:none;align-items:baseline;gap:6px;margin-left:auto;display:inline-flex}.lc-chip i,.lc-detail-row i{border-radius:2px;width:8px;height:8px;display:inline-block}.lc-chip i{transition:box-shadow var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out)}.lc-chip em{color:var(--dsw-alias-label-secondary);font-style:normal}.lc-chip-on{background:var(--dsw-alias-interactive-bg-hover);font-weight:600}.lc-chip-on i{box-shadow:0 0 0 1px var(--dsw-alias-brand-primary)}";
		const tagId$10 = "dsh-context/stackedBar.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$10) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-context";
			tag.dataset.pluginCss = tagId$10;
			tag.textContent = css$10;
			document.head.appendChild(tag);
		}
		//#endregion
		//#region \0dsh-global-css:D:\dsh-plugins\dsh-context\src\client\styles\trendChart.css.mjs
		const css$9 = ".lc-chartrow{align-items:stretch;gap:6px;display:flex}.lc-axis{box-sizing:border-box;width:40px;height:150px;color:var(--dsw-alias-label-secondary);padding-top:18px;font-size:11px;position:relative}.lc-axis span{line-height:1;position:absolute;right:0}.lc-axis-top{top:13px}.lc-axis-q3{top:41px}.lc-axis-mid{top:69px}.lc-axis-q1{top:97px}.lc-axis-bot{top:125px}.lc-chart-wrap{flex:1;min-width:0;position:relative}.lc-chart-scroll{overscroll-behavior-x:contain;scrollbar-gutter:stable;padding-bottom:var(--dsh-scrollbar-width,8px);overflow:auto hidden}.lc-chart{box-sizing:border-box;align-items:flex-end;gap:2px;width:max-content;min-width:100%;height:130px;padding-top:18px;display:flex;position:relative}.lc-grid{border-top:1px dashed var(--dsw-alias-border-l2);pointer-events:none;position:absolute;left:0;right:0}.lc-grid-top{top:18px}.lc-grid-q3{top:46px}.lc-grid-mid{top:74px}.lc-grid-q1{top:102px}.lc-grid-zero{border-top-style:solid;border-top-color:color-mix(in srgb, var(--color-neutral-500) 50%, transparent);top:130px}.lc-bar{cursor:pointer;outline-offset:1px;width:14px;height:100%;transition:opacity var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out), background-color var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out), outline-color var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out);border-radius:2px;outline:1px dashed #0000;flex:none;align-items:flex-end;display:flex;position:relative}.lc-chart-dim .lc-bar{opacity:.35}.lc-chart-dim .lc-bar-in-turn{opacity:1}.lc-chart-dim .lc-turn{opacity:.35}.lc-chart-dim .lc-turn-on{opacity:1}.lc-chart-tip{z-index:5;box-sizing:border-box;overflow-wrap:break-word;background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);max-width:100%;color:var(--dsw-alias-label-primary);pointer-events:none;border-radius:6px;flex-direction:column;gap:2px;padding:3px 8px;font-size:12px;display:flex;position:absolute;bottom:calc(100% + 4px);left:0;box-shadow:0 2px 8px #0000002e}.lc-chart-tip span+span{color:var(--dsw-alias-label-secondary)}.lc-bar-hovered{outline-color:var(--dsw-alias-brand-primary)}.lc-bar-selected{outline:2px solid var(--dsw-alias-label-primary);outline-offset:1px}.lc-bar-in-turn{background:color-mix(in srgb, var(--color-neutral-500) 14%, transparent)}.lc-bar-stack{flex-direction:column-reverse;width:100%;display:flex}.lc-bar-stack>div{width:100%}.lc-bar-stack,.lc-bar-up,.lc-bar-down{transform-origin:50% 100%}.lc-bar-down{transform-origin:50% 0}.lc-bar-stack>div:first-child{border-radius:0 0 2px 2px}.lc-bar-stack>div:last-child{border-radius:2px 2px 0 0}.lc-bar-stack>div:only-child{border-radius:2px}.lc-bar-up,.lc-bar-down{width:100%;display:flex;position:absolute;left:0}.lc-bar-up{flex-direction:column-reverse}.lc-bar-down{flex-direction:column}.lc-bar-up>div,.lc-bar-down>div{width:100%}.lc-bar-up>div:last-child{border-radius:2px 2px 0 0}.lc-bar-down>div:last-child{border-radius:0 0 2px 2px}.lc-cat-seg{transition:filter var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out), opacity var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out)}.lc-chart[data-catdim] .lc-cat-seg{opacity:.35}.lc-chart[data-catdim=system] .lc-cat-seg[data-cat=system],.lc-chart[data-catdim=tools] .lc-cat-seg[data-cat=tools],.lc-chart[data-catdim=user] .lc-cat-seg[data-cat=user],.lc-chart[data-catdim=inject] .lc-cat-seg[data-cat=inject],.lc-chart[data-catdim=skill] .lc-cat-seg[data-cat=skill],.lc-chart[data-catdim=assistant] .lc-cat-seg[data-cat=assistant],.lc-chart[data-catdim=tool] .lc-cat-seg[data-cat=tool]{opacity:1;filter:brightness(1.18)}.lc-bar-marker{color:var(--dsw-alias-state-warn-primary);font-size:11px;position:absolute;top:-16px;left:50%;transform:translate(-50%)}.lc-turns{gap:2px;width:max-content;min-width:100%;margin-top:4px;display:flex;overflow:hidden}.lc-turn{box-sizing:border-box;text-align:center;color:var(--dsw-alias-label-secondary);white-space:nowrap;cursor:pointer;height:14px;transition:filter var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out), opacity var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out);border-radius:3px;flex:none;font-size:10px;font-weight:600;line-height:14px}.lc-turn-on{filter:brightness(1.35);color:var(--dsw-alias-label-primary)}.lc-turn-label{display:inline-block}";
		const tagId$9 = "dsh-context/trendChart.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$9) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-context";
			tag.dataset.pluginCss = tagId$9;
			tag.textContent = css$9;
			document.head.appendChild(tag);
		}
		//#endregion
		//#region \0dsh-global-css:D:\dsh-plugins\dsh-context\src\client\styles\requestDetail.css.mjs
		const css$8 = ".lc-detail{border-top:1px solid var(--dsw-alias-border-l1);margin-top:12px;padding-top:12px}.lc-detail-head{color:var(--dsw-alias-label-secondary);flex-wrap:wrap;align-items:center;gap:6px 8px;margin-bottom:10px;display:flex}.lc-detail-head b{color:var(--dsw-alias-label-primary);font-size:13px}.lc-detail-time{font-variant-numeric:tabular-nums;white-space:nowrap;margin-left:auto;font-size:12px}.lc-detail-marker{color:var(--dsw-alias-state-warn-primary);background:color-mix(in srgb, var(--dsw-alias-state-warn-primary) 12%, transparent);border-radius:6px;padding:1px 7px;font-size:11px}.lc-detail-tag{background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);color:var(--dsw-alias-label-secondary);border-radius:4px;padding:0 6px;font-size:11px}.lc-detail-metric{font-variant-numeric:tabular-nums;white-space:nowrap;color:var(--dsw-alias-label-primary);background:color-mix(in srgb, var(--dsw-alias-label-secondary) 14%, transparent);border-radius:6px;padding:2px 8px;font-size:12px;font-weight:600}.lc-detail-metric-up{color:var(--dsw-alias-state-success-primary);background:color-mix(in srgb, var(--dsw-alias-state-success-primary) 15%, transparent)}.lc-detail-metric-down{color:var(--dsw-alias-state-error-primary);background:color-mix(in srgb, var(--dsw-alias-state-error-primary) 15%, transparent)}.lc-detail-rows{grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:4px 24px;margin-top:10px;display:grid}.lc-brief{flex-direction:column;gap:2px;min-height:76px;margin:-4px 0 10px;display:flex}.lc-brief-row{min-width:0;color:var(--dsw-alias-label-primary);text-align:left;transition:background-color var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out);background:0 0;border:0;border-radius:6px;align-items:center;gap:8px;margin-left:-6px;margin-right:-6px;padding:3px 6px;font-family:inherit;font-size:12px;line-height:1.5;display:flex}button.lc-brief-row-link{cursor:pointer}.lc-brief-tag{box-sizing:border-box;text-align:center;background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);min-width:56px;color:var(--dsw-alias-label-secondary);border-radius:4px;flex:none;padding:0 6px;font-size:11px;position:relative}.lc-brief-tip{white-space:normal;text-align:left;max-width:240px;font-weight:400;line-height:1.5;bottom:calc(100% + 6px);left:0}.lc-brief-text{text-overflow:ellipsis;white-space:nowrap;flex:1;min-width:0;overflow:hidden}.lc-brief-empty{text-overflow:ellipsis;white-space:nowrap;min-width:0;color:var(--dsw-alias-label-tertiary);flex:1;overflow:hidden}.lc-brief-fact{box-sizing:border-box;text-overflow:ellipsis;white-space:nowrap;background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);max-width:160px;color:var(--dsw-alias-label-secondary);border-radius:4px;flex:none;padding:0 6px;font-size:11px;overflow:hidden}.lc-brief-chip{background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);min-width:0;max-width:260px;color:var(--dsw-alias-label-primary);transition:background-color var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out);border-radius:5px;align-items:center;gap:5px;padding:0 7px;font-size:12px;display:inline-flex;overflow:hidden}.lc-brief-chip-grow{flex:1;max-width:none}.lc-brief-chip-tag{text-overflow:ellipsis;white-space:nowrap;background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1);max-width:120px;color:var(--dsw-alias-label-secondary);border-radius:4px;flex:none;padding:0 6px;font-size:11px;overflow:hidden}.lc-brief-chip-text{text-overflow:ellipsis;white-space:nowrap;flex:1;min-width:0;overflow:hidden}.lc-brief-chip-link{cursor:pointer}.lc-brief-more{color:var(--dsw-alias-label-secondary);flex:none;font-size:11px}.lc-detail-row{transition:background-color var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out);border-radius:4px;align-items:center;gap:8px;margin:-1px -4px;padding:1px 4px;display:flex}.lc-detail-row i{transition:box-shadow var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out)}.lc-detail-row-on{background:var(--dsw-alias-interactive-bg-hover)}.lc-detail-row-on i{box-shadow:0 0 0 1px var(--dsw-alias-brand-primary)}.lc-detail-row-on .lc-detail-label{font-weight:600}.lc-detail-label{white-space:nowrap;min-width:70px;color:var(--dsw-alias-label-secondary)}.lc-bar-track{background:color-mix(in srgb, var(--color-neutral-500) 18%, transparent);border-radius:3px;flex:1;height:5px;display:block;position:relative;overflow:hidden}.lc-bar-fill{border-radius:3px;height:100%;display:block}.lc-bar-zero{border-left:1px solid color-mix(in srgb, var(--color-neutral-500) 45%, transparent);position:absolute;top:0;bottom:0;left:50%}.lc-bar-fill-up,.lc-bar-fill-down{height:100%;display:block;position:absolute;top:0}.lc-bar-fill-up{border-radius:0 3px 3px 0;left:50%}.lc-bar-fill-down{border-radius:3px 0 0 3px;right:50%}.lc-detail-num{text-align:right;font-variant-numeric:tabular-nums;width:52px}.lc-detail-num-up{color:var(--dsw-alias-state-success-primary)}.lc-detail-num-down{color:var(--dsw-alias-state-error-primary)}.lc-detail-pct{text-align:right;width:34px;color:var(--dsw-alias-label-secondary)}";
		const tagId$8 = "dsh-context/requestDetail.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$8) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-context";
			tag.dataset.pluginCss = tagId$8;
			tag.textContent = css$8;
			document.head.appendChild(tag);
		}
		//#endregion
		//#region \0dsh-global-css:D:\dsh-plugins\dsh-context\src\client\styles\events.css.mjs
		const css$7 = ".lc-event{align-items:center;gap:8px;padding:3px 0;display:flex}.lc-event-icon{text-align:center;width:18px;color:var(--dsw-alias-state-warn-primary)}.lc-event-icon.lc-event-inject{color:var(--color-purple-500)}.lc-event-icon.lc-event-model{color:var(--dsw-alias-brand-primary)}.lc-event-icon.lc-event-mode{color:var(--dsw-alias-label-secondary)}.lc-kind{white-space:nowrap;border-radius:4px;flex:none;padding:1px 6px;font-size:10px;font-weight:600}.lc-kind-inject{background:color-mix(in srgb, var(--dsw-alias-state-success-primary) 15%, transparent);color:var(--dsw-alias-state-success-primary)}.lc-kind-compaction{background:color-mix(in srgb, var(--dsw-alias-state-error-primary) 15%, transparent);color:var(--dsw-alias-state-error-primary)}.lc-kind-prune{background:color-mix(in srgb, var(--color-violet-500) 15%, transparent);color:var(--color-violet-500)}.lc-kind-model{background:color-mix(in srgb, var(--dsw-alias-brand-primary) 15%, transparent);color:var(--dsw-alias-brand-primary)}.lc-kind-mode{background:color-mix(in srgb, var(--dsw-alias-label-secondary) 15%, transparent);color:var(--dsw-alias-label-secondary)}.lc-event-label{text-overflow:ellipsis;white-space:nowrap;flex:1;overflow:hidden}.lc-event-at{color:var(--dsw-alias-label-secondary);white-space:nowrap;flex:none;font-size:11px}.lc-event-tokens{color:var(--dsw-alias-state-success-primary);white-space:nowrap;font-weight:600}.lc-event-tokens.lc-up{color:var(--dsw-alias-state-warn-primary)}.lc-event-time{color:var(--dsw-alias-label-secondary);font-size:12px}";
		const tagId$7 = "dsh-context/events.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$7) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-context";
			tag.dataset.pluginCss = tagId$7;
			tag.textContent = css$7;
			document.head.appendChild(tag);
		}
		//#endregion
		//#region \0dsh-global-css:D:\dsh-plugins\dsh-context\src\client\styles\fileCard.css.mjs
		const css$6 = ".lc-fa-ctl,.lc-br-toolctl{flex-wrap:wrap;align-items:center;gap:8px;margin-bottom:8px;display:flex}.lc-fa-ctl .lc-gran{margin-left:0}.lc-fa-n{opacity:.75;margin-left:4px;font-weight:700}.lc-fa-search,.lc-br-tool-search{min-width:80px;font:inherit;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l2);border-radius:6px;outline:none;flex:1;padding:3px 8px;font-size:12px}.lc-fa-meta{color:var(--dsw-alias-label-secondary);flex-wrap:wrap;align-items:center;gap:10px;margin-bottom:6px;font-size:12px;display:flex}.lc-fa-meta .lc-fa-sort{flex:none}.lc-fa-meta-delta{position:relative}.lc-fa-meta-tip{white-space:normal;max-width:260px;line-height:1.5;top:calc(100% + 6px);left:0}.lc-fa-item{transition:background-color var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out), border-color var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out);border:1px solid #0000;border-radius:8px}.lc-fa-item-on{background:var(--dsw-alias-bg-layer-2);border-color:var(--dsw-alias-border-l2)}.lc-fa-row{width:100%;color:var(--dsw-alias-label-primary);font:inherit;cursor:pointer;text-align:left;transition:background-color var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out);background:0 0;border:0;border-radius:7px;align-items:center;gap:7px;padding:6px 8px;font-size:12px;display:flex}.lc-fa-form{opacity:.85;flex:none;justify-content:center;align-items:center;width:20px;height:14px;font-size:11px;display:flex}.lc-fa-lang{border-radius:4px;justify-content:center;align-items:center;min-width:16px;height:13px;padding:0 2px;font-size:8px;font-weight:700;line-height:1;display:inline-flex}.lc-fa-row .lc-br-chev{margin-right:-2px}.lc-fa-path{word-break:break-all;min-width:0}.lc-fa-file{cursor:pointer}.lc-fa-path em{color:var(--dsw-alias-label-secondary);font-style:normal}.lc-fa-badge{font-variant-numeric:tabular-nums;white-space:nowrap;border-radius:999px;flex:none;align-items:center;gap:4px;padding:1px 7px;font-size:11px;font-weight:600;display:inline-flex}.lc-fa-badge i{background:currentColor;border-radius:50%;width:5px;height:5px;display:inline-block}.lc-fa-b-read{color:var(--dsw-alias-brand-primary);background:color-mix(in srgb, var(--dsw-alias-brand-primary) 14%, transparent)}.lc-fa-b-write{color:var(--dsw-alias-state-success-primary);background:color-mix(in srgb, var(--dsw-alias-state-success-primary) 14%, transparent)}.lc-fa-b-search{color:var(--dsw-alias-state-warn-primary);background:color-mix(in srgb, var(--dsw-alias-state-warn-primary) 14%, transparent)}.lc-fa-chip-read,.lc-fa-chip-read:hover{color:var(--dsw-alias-brand-primary)}.lc-fa-chip-write,.lc-fa-chip-write:hover{color:var(--dsw-alias-state-success-primary)}.lc-fa-chip-search,.lc-fa-chip-search:hover{color:var(--dsw-alias-state-warn-primary)}.lc-fa-chip-read.lc-gran-on,.lc-fa-chip-read.lc-gran-on:hover{background:color-mix(in srgb, var(--dsw-alias-brand-primary) 14%, transparent);color:var(--dsw-alias-brand-primary)}.lc-fa-chip-write.lc-gran-on,.lc-fa-chip-write.lc-gran-on:hover{background:color-mix(in srgb, var(--dsw-alias-state-success-primary) 14%, transparent);color:var(--dsw-alias-state-success-primary)}.lc-fa-chip-search.lc-gran-on,.lc-fa-chip-search.lc-gran-on:hover{background:color-mix(in srgb, var(--dsw-alias-state-warn-primary) 14%, transparent);color:var(--dsw-alias-state-warn-primary)}.lc-fa-delta{font-variant-numeric:tabular-nums;white-space:nowrap;flex:none;gap:5px;font-size:11px;font-weight:600;display:inline-flex}.lc-fa-up{color:var(--dsw-alias-state-success-primary)}.lc-fa-down{color:var(--dsw-alias-state-error-primary)}.lc-fa-time{color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;flex:none;font-size:11px}.lc-fa-ops{border-left:2px solid var(--dsw-alias-border-l1);flex-direction:column;gap:1px;margin:0 8px 8px 15px;padding:2px 0 2px 10px;display:flex}.lc-fa-op{min-width:0;color:var(--dsw-alias-label-primary);font:inherit;text-align:left;transition:background-color var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out);background:0 0;border:0;border-radius:5px;align-items:center;gap:8px;padding:3px 6px;font-size:11px;display:flex}.lc-fa-op-link{cursor:pointer}.lc-fa-op-time{color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;flex:none;margin-left:auto}.lc-fa-op-tool{text-overflow:ellipsis;white-space:nowrap;background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1);max-width:220px;color:var(--dsw-alias-label-secondary);border-radius:999px;flex:none;padding:0 6px;font-size:11px;overflow:hidden}.lc-fa-op-detail{text-overflow:ellipsis;white-space:nowrap;min-width:0;color:var(--dsw-alias-label-secondary);flex:1;overflow:hidden}.lc-fa-read{color:var(--dsw-alias-brand-primary);font-variant-numeric:tabular-nums;white-space:nowrap;flex:none;font-size:11px;font-weight:600}";
		const tagId$6 = "dsh-context/fileCard.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$6) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-context";
			tag.dataset.pluginCss = tagId$6;
			tag.textContent = css$6;
			document.head.appendChild(tag);
		}
		//#endregion
		//#region \0dsh-global-css:D:\dsh-plugins\dsh-context\src\client\styles\modal.css.mjs
		const css$5 = ".lc-modal-backdrop{z-index:200;background:var(--dsw-alias-bg-mask-1,#00000073);justify-content:center;align-items:center;display:flex;position:fixed;inset:0}.lc-modal-card{box-sizing:border-box;background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l2);width:min(720px,100vw - 48px);max-height:min(82vh,760px);box-shadow:var(--dsw-shadow-lv3,0 12px 32px #0006);color:var(--dsw-alias-label-primary);border-radius:12px;padding:16px 18px 18px;font-size:13px;overflow-y:auto}.lc-modal-head{align-items:baseline;gap:8px;margin-bottom:12px;display:flex}.lc-modal-title{font-size:14px;font-weight:600}.lc-modal-close{color:var(--dsw-alias-label-secondary);cursor:pointer;transition:color var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out), background-color var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out);background:0 0;border:0;border-radius:6px;margin-left:auto;padding:2px 6px;font-family:inherit;font-size:18px;line-height:1}.lc-gate-card{width:min(440px,100vw - 48px)}.lc-gate-body{color:var(--dsw-alias-label-secondary);line-height:1.7}.lc-gate-versions{gap:24px;margin-top:14px;display:flex}.lc-gate-version{flex-direction:column;gap:2px;display:flex}.lc-gate-version-label{color:var(--dsw-alias-label-secondary);font-size:11px}.lc-gate-version-value{font-weight:600;font-family:var(--dsw-font-family-mono,monospace);color:var(--dsw-alias-label-primary)}.lc-gate-or-newer{color:var(--dsw-alias-label-secondary);margin-left:6px;font-family:inherit;font-size:11px;font-weight:400}.lc-gate-actions{justify-content:flex-end;margin-top:16px;display:flex}.lc-gate-ok{cursor:pointer;background:var(--dsw-alias-button-primary-fill);color:var(--dsw-alias-label-primary-foreground);transition:filter var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out);border:0;border-radius:6px;padding:6px 16px;font-family:inherit;font-size:12px}";
		const tagId$5 = "dsh-context/modal.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$5) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-context";
			tag.dataset.pluginCss = tagId$5;
			tag.textContent = css$5;
			document.head.appendChild(tag);
		}
		//#endregion
		//#region \0dsh-global-css:D:\dsh-plugins\dsh-context\src\client\styles\browser.css.mjs
		const css$4 = ".lc-br-dna-ctl{flex:none;margin-left:0}.lc-br-bar-dna .lc-stacked-seg{background-image:linear-gradient(to right, transparent calc(100% - min(.5px, 12.5%)), var(--dsw-alias-bg-layer-1) 0)}.lc-br-hint{color:var(--dsw-alias-label-secondary);white-space:nowrap;margin-left:auto;font-size:11px;font-weight:400}.lc-br-pick{font:inherit;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l2);border-radius:6px;max-width:240px;padding:3px 6px;font-size:12px}.lc-br-meta{color:var(--dsw-alias-label-secondary);flex-wrap:wrap;gap:6px 16px;margin-bottom:8px;display:flex}.lc-br-meta b{color:var(--dsw-alias-label-primary)}.lc-br-meta .lc-est{margin-left:auto}.lc-br-note{color:var(--dsw-alias-label-secondary);margin-top:8px;font-size:12px}.lc-br-retry{color:var(--dsw-alias-brand-primary);font:inherit;cursor:pointer;text-underline-offset:2px;transition:filter var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out);background:0 0;border:0;padding:0;font-size:12px;text-decoration:underline}.lc-br-cats{flex-direction:column;gap:4px;margin-top:10px;display:flex}.lc-br-cat{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2);border-radius:8px;overflow:hidden}.lc-br-cat-empty{opacity:.55}.lc-br-cat-row{width:100%;color:var(--dsw-alias-label-primary);font:inherit;cursor:pointer;text-align:left;transition:background-color var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out);background:0 0;border:0;align-items:center;gap:8px;padding:7px 10px;display:flex}.lc-br-cat-on{background:var(--dsw-alias-interactive-bg-hover)}.lc-br-cat-on i{box-shadow:0 0 0 1px var(--dsw-alias-brand-primary)}.lc-br-cat-open{background:var(--dsw-alias-interactive-bg-hover)}.lc-br-cat-row i{width:8px;height:8px;transition:box-shadow var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out);border-radius:2px;flex:none;display:inline-block}.lc-br-cat-label{font-weight:600}.lc-br-cat-count{color:var(--dsw-alias-label-secondary);white-space:nowrap;font-size:12px}.lc-br-count-grp{flex:1;align-items:center;gap:4px;min-width:0;display:inline-flex}.lc-br-chev{width:12px;height:14px;color:var(--dsw-alias-label-tertiary);flex:none;justify-content:center;align-items:center;display:flex}.lc-br-chev:before{content:\"\";width:5px;height:5px;transition:transform var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out);border-bottom:1px solid;border-right:1px solid;transform:rotate(-45deg)}.lc-br-chev-on:before{transform:rotate(45deg)}.lc-br-tokens{color:var(--dsw-alias-label-secondary);flex:none;font-size:12px}.lc-br-delta,.lc-br-tdelta{white-space:nowrap;border-radius:4px;flex:none;padding:0 5px;font-size:11px;font-weight:600}.lc-br-delta-up,.lc-br-tdelta-up{color:var(--dsw-alias-state-success-primary);background:color-mix(in srgb, var(--dsw-alias-state-success-primary) 15%, transparent)}.lc-br-delta-down,.lc-br-tdelta-down{color:var(--dsw-alias-state-error-primary);background:color-mix(in srgb, var(--dsw-alias-state-error-primary) 15%, transparent)}.lc-br-tokens-grp{flex:none;align-items:center;gap:4px;min-width:0;display:inline-flex}.lc-br-pct{text-align:right;width:36px;color:var(--dsw-alias-label-secondary);flex:none;font-size:12px}.lc-br-body{border-top:1px solid var(--dsw-alias-border-l1);flex-direction:column;gap:2px;padding:4px 6px;display:flex}.lc-br-elem{border-radius:6px}.lc-br-elem-on{background:var(--dsw-alias-interactive-bg-active)}.lc-br-elem-row{width:100%;color:var(--dsw-alias-label-primary);font:inherit;cursor:pointer;text-align:left;transition:background-color var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out);background:0 0;border:0;border-radius:6px;align-items:center;gap:8px;padding:5px 6px;font-size:12px;display:flex}.lc-br-err-dot{background:var(--dsw-alias-state-error-primary);width:6px;height:6px;box-shadow:0 0 0 2px color-mix(in srgb, var(--dsw-alias-state-error-primary) 10%, transparent);border-radius:50%;flex:none}.lc-br-tag{min-width:0;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1);text-overflow:ellipsis;white-space:nowrap;border-radius:4px;max-width:220px;padding:0 6px;font-size:11px;overflow:hidden}.lc-br-tool-plugin{color:var(--dsw-alias-brand-primary);background:color-mix(in srgb, var(--dsw-alias-brand-primary) 14%, transparent);border-color:#0000;border-radius:6px;font-size:12px}.lc-br-preview{text-overflow:ellipsis;white-space:nowrap;flex:1;min-width:0;overflow:hidden}.lc-br-time,.lc-br-hits{color:var(--dsw-alias-label-secondary);flex:none;font-size:11px}.lc-br-content{flex-direction:column;gap:6px;padding:2px 6px 8px 26px;display:flex}.lc-br-dim{color:var(--dsw-alias-label-secondary)}";
		const tagId$4 = "dsh-context/browser.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$4) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-context";
			tag.dataset.pluginCss = tagId$4;
			tag.textContent = css$4;
			document.head.appendChild(tag);
		}
		//#endregion
		//#region \0dsh-global-css:D:\dsh-plugins\dsh-context\src\client\styles\detailSections.css.mjs
		const css$3 = ".lc-ts-card{background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l2);border-radius:6px;min-width:0;overflow:hidden}.lc-ts-card-head{color:var(--dsw-alias-label-secondary);border-bottom:1px solid var(--dsw-alias-border-l1);align-items:center;gap:8px;padding:6px 10px;font-size:11px;font-weight:600;display:flex}.lc-ts-card-head-wrap{flex-wrap:wrap}.lc-ts-card-head b{color:var(--dsw-alias-label-primary)}.lc-ts-call-name{font-size:13px;font-family:var(--ds-font-family-code,ui-monospace, SFMono-Regular, Menlo, monospace);text-overflow:ellipsis;white-space:nowrap;min-width:0;overflow:hidden}.lc-ts-card-count{margin-left:auto}.lc-ts-card-right{align-items:center;gap:8px;margin-left:auto;display:inline-flex}.lc-ts-card-meta{color:var(--dsw-alias-label-secondary);white-space:nowrap;font-variant-numeric:tabular-nums;font-size:11px;font-weight:400}.lc-ts-call-state{white-space:nowrap;font-size:11px;font-weight:600;line-height:1;font-family:var(--ds-font-family-code,ui-monospace, SFMono-Regular, Menlo, monospace);border-radius:999px;flex:none;align-items:center;gap:4px;padding:2px 7px;display:inline-flex}.lc-ts-call-state i{background:currentColor;border-radius:50%;flex:none;width:6px;height:6px}.lc-ts-call-ok{color:var(--dsw-alias-state-success-primary);background:color-mix(in srgb, var(--dsw-alias-state-success-primary) 12%, transparent)}.lc-ts-call-err{color:var(--dsw-alias-state-error-primary);background:color-mix(in srgb, var(--dsw-alias-state-error-primary) 12%, transparent)}.lc-ts-desc-body{color:var(--dsw-alias-label-primary);white-space:pre-wrap;word-break:break-word;scrollbar-width:thin;max-height:320px;margin:0;padding:8px 10px;font-size:12px;line-height:1.55;overflow-y:auto}.lc-ts-lines{counter-reset:lc-line}.lc-ts-line{padding-left:26px;display:block;position:relative}.lc-ts-line:before{content:counter(lc-line);counter-increment:lc-line;text-align:right;width:20px;color:var(--dsw-alias-label-tertiary);user-select:none;padding-right:6px;font-size:11px;position:absolute;left:0}.lc-ts-line:empty:after{content:\"​\"}.lc-ts-param-row{border-top:1px solid var(--dsw-alias-border-l1);grid-template-columns:minmax(0,140px) minmax(0,90px) 56px minmax(0,1fr);align-items:baseline;gap:2px 10px;padding:6px 10px;font-size:12px;display:grid}.lc-ts-param-row:first-of-type{border-top:0}.lc-ts-param-name{color:var(--dsw-alias-label-primary);text-overflow:ellipsis;white-space:nowrap;font-weight:600;overflow:hidden}.lc-ts-param-type{color:var(--dsw-alias-label-secondary);font-family:var(--ds-font-family-code,ui-monospace, SFMono-Regular, Menlo, monospace);text-overflow:ellipsis;white-space:nowrap;font-size:11px;overflow:hidden}.lc-ts-param-req{color:var(--dsw-alias-state-warn-primary);font-size:11px;font-weight:600}.lc-ts-param-req-off{color:var(--dsw-alias-label-secondary);font-size:11px}.lc-ts-param-desc{color:var(--dsw-alias-label-secondary);overflow-wrap:anywhere;grid-column:1/-1;line-height:1.5}.lc-ts-params-empty{color:var(--dsw-alias-label-secondary);padding:8px 10px;font-size:12px}.lc-ts-arg-row{border-top:1px solid var(--dsw-alias-border-l1);grid-template-columns:minmax(0,96px) 1fr;align-items:start;column-gap:12px;padding:6px 10px;font-size:12px;display:grid}.lc-ts-arg-row:first-of-type{border-top:0}.lc-ts-arg-row .lc-ts-param-name{text-overflow:unset;white-space:normal;overflow-wrap:anywhere;overflow:visible}.lc-ts-arg-val{color:var(--dsw-alias-label-primary);font-family:var(--ds-font-family-code,ui-monospace, SFMono-Regular, Menlo, monospace);white-space:pre-wrap;word-break:break-word;scrollbar-width:thin;max-height:200px;font-size:12px;line-height:1.55;overflow-y:auto}.lc-ts-json{flex-direction:column;gap:4px;display:flex}.lc-ts-json-toggle{color:var(--dsw-alias-label-secondary);font:inherit;cursor:pointer;transition:color var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out);background:0 0;border:0;align-self:flex-start;padding:0;font-size:11px}.lc-rich-seg{background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l2);border-radius:6px;gap:2px;margin-left:auto;padding:1px;display:flex}.lc-rich-seg-btn{color:var(--dsw-alias-label-secondary);cursor:pointer;transition:color var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out);background:0 0;border:0;border-radius:5px;padding:3px 8px;font-family:inherit;font-size:11px;line-height:1}.lc-rich-seg-btn:hover{color:var(--dsw-alias-label-primary)}.lc-rich-seg-on,.lc-rich-seg-on:hover{background:var(--dsw-alias-button-primary-fill);color:var(--dsw-alias-label-primary-foreground)}.lc-rich-copy{color:var(--dsw-alias-label-secondary);cursor:pointer;transition:color var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out);background:0 0;border:0;border-radius:5px;align-items:center;padding:2px;display:inline-flex}.lc-rich-copy:hover{color:var(--dsw-alias-label-primary)}.lc-rich-copy-on,.lc-rich-copy-on:hover{color:var(--dsw-alias-state-success-primary)}.lc-ts-desc-md{color:var(--dsw-alias-label-primary);word-break:break-word;overflow-wrap:anywhere;scrollbar-width:thin;min-width:0;max-height:320px;padding:4px 10px;font-size:12px;line-height:1.55;overflow:hidden auto}.lc-ts-desc-md>div{font-size:13px;line-height:1.55}.lc-ts-desc-md div :is(h1,h2,h3,h4,h5,h6){margin:10px 0 4px;font-size:13px;font-weight:600}.lc-ts-desc-md div p{white-space:pre-line;margin:6px 0}.lc-ts-desc-md div p br{display:none}.lc-ts-desc-md div pre{white-space:pre-wrap;overflow-wrap:anywhere;word-break:break-word;margin:6px 0}.lc-ts-desc-md div :not(pre)>code{box-decoration-break:clone;padding:1px 5px;line-height:1.3;font-size:1em!important}.lc-ts-desc-md div table code{font-size:inherit}";
		const tagId$3 = "dsh-context/detailSections.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$3) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-context";
			tag.dataset.pluginCss = tagId$3;
			tag.textContent = css$3;
			document.head.appendChild(tag);
		}
		//#endregion
		//#region \0dsh-global-css:D:\dsh-plugins\dsh-context\src\client\styles\attachments.css.mjs
		const css$2 = ".lc-att-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;padding:8px 10px;display:grid}.lc-att-item{box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2);width:100%;min-width:0;font:inherit;text-align:left;cursor:pointer;transition:border-color var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out), background-color var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out);background:0 0;border-radius:8px;align-items:center;gap:8px;padding:6px;display:flex}.lc-att-thumb{border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);border-radius:6px;flex:none;justify-content:center;align-items:center;width:64px;height:64px;padding:0;display:flex;overflow:hidden}.lc-att-thumb img{object-fit:cover;width:100%;height:100%;display:block}.lc-att-ph,.lc-att-err{color:var(--dsw-alias-label-secondary);text-align:center;padding:2px;font-size:10px}.lc-att-meta{flex-direction:column;gap:2px;min-width:0;display:flex}.lc-att-name{color:var(--dsw-alias-label-primary);overflow-wrap:anywhere;word-break:break-word;font-size:12px;line-height:1.3}.lc-att-row{color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;font-size:11px}.lc-att-row-label{min-width:3.2em;font-weight:400;display:inline-block}.lc-att-lightbox{z-index:1000;place-items:center;padding:40px;display:grid;position:fixed;inset:0}.lc-att-lightbox-mask{background:var(--dsw-alias-bg-mask-1,#00000073);backdrop-filter:var(--dsw-mask-blur,blur(2px));position:absolute;inset:0}.lc-att-lightbox-img{object-fit:contain;background:var(--dsw-specific-input-major,var(--dsw-alias-bg-layer-1));max-width:min(100%,1600px);max-height:calc(100vh - 80px);box-shadow:var(--dsw-shadow-lv3,0 12px 32px #0006);border-radius:12px;position:relative}.lc-att-lightbox-close{z-index:1;border:1px solid var(--dsw-alias-border-l2-darkmode-thin,var(--dsw-alias-border-l1));background:var(--dsw-specific-input-major,var(--dsw-alias-bg-layer-1));width:36px;height:36px;color:var(--dsw-alias-label-primary);cursor:pointer;border-radius:999px;place-items:center;padding:0;display:grid;position:fixed;top:20px;right:20px}";
		const tagId$2 = "dsh-context/attachments.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$2) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-context";
			tag.dataset.pluginCss = tagId$2;
			tag.textContent = css$2;
			document.head.appendChild(tag);
		}
		//#endregion
		//#region \0dsh-global-css:D:\dsh-plugins\dsh-context\src\client\styles\agentGraph.css.mjs
		const css$1 = ".lc-agents-chips{flex-wrap:wrap;gap:6px;margin-bottom:10px;display:flex}.lc-agents-chip{background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;border-radius:999px;padding:2px 8px;font-size:11px}.lc-agents-chip-on{color:var(--dsw-alias-state-success-primary);border-color:color-mix(in srgb, var(--dsw-alias-state-success-primary) 40%, transparent)}.lc-agents-stage{overscroll-behavior-x:contain;margin:0 -4px;padding:0 4px;overflow-x:auto}.lc-agents-svg{max-width:none;margin:0 auto;display:block}.lc-agents-link-live{stroke-opacity:.85}.lc-agents-flow{stroke-linecap:round;stroke-dasharray:2 7}.lc-agent-node{outline:none}.lc-agent-clickable{cursor:pointer}.lc-agent-halo{transition:fill var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out)}.lc-agent-self .lc-agent-halo{fill:var(--dsw-alias-bg-layer-2)}.lc-agent-running .lc-agent-halo{fill:color-mix(in srgb, var(--dsw-alias-state-success-primary) 12%, transparent)}.lc-agent-done .lc-agent-halo{fill:color-mix(in srgb, var(--dsw-alias-state-success-primary) 7%, transparent)}.lc-agent-seg{transition:stroke-dasharray .3s,stroke-dashoffset .3s}.lc-agent-free{stroke:color-mix(in srgb, var(--dsw-alias-label-secondary) 18%, transparent)}.lc-agent-pct{font-variant-numeric:tabular-nums;pointer-events:none;font-size:11px;font-weight:600}.lc-agent-caption{text-align:center;pointer-events:none;width:100%;line-height:1.25}.lc-agent-label{color:var(--dsw-alias-label-primary);overflow-wrap:break-word;-webkit-line-clamp:3;-webkit-box-orient:vertical;font-size:11px;display:-webkit-box;overflow:hidden}.lc-agent-tokens{color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;font-size:10px}.lc-agents-solo{padding:4px 0 10px}.lc-agents-inspector{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2);border-radius:8px;flex-wrap:wrap;align-items:baseline;gap:4px 8px;min-width:0;margin-top:10px;padding:7px 10px;font-size:12px;display:flex}.lc-agents-inspector-name{color:var(--dsw-alias-label-primary);overflow-wrap:anywhere}.lc-agents-badge{background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1);color:var(--dsw-alias-label-secondary);border-radius:999px;flex:none;padding:1px 6px;font-size:10px}.lc-agent-self-badge{vertical-align:1px;margin-left:5px}.lc-agents-badge-on{color:var(--dsw-alias-state-success-primary);border-color:color-mix(in srgb, var(--dsw-alias-state-success-primary) 40%, transparent)}.lc-agents-inspector-stats{color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.lc-agents-inspector-open{color:var(--dsw-alias-brand-primary,var(--color-blue-500));flex:none;margin-left:auto}.lc-agents-legend{color:var(--dsw-alias-label-secondary);flex-wrap:wrap;gap:4px 14px;margin-top:8px;font-size:11px;display:flex}.lc-agents-legend-item{align-items:center;gap:5px;display:inline-flex}.lc-agents-legend-item i{border-radius:2px;width:8px;height:8px}.lc-agents-legend-free{background:color-mix(in srgb, var(--dsw-alias-label-secondary) 18%, transparent)}.lc-agents-legend-edge{border-top:2px dashed var(--dsw-alias-label-secondary);border-radius:0!important;width:14px!important;height:0!important}";
		const tagId$1 = "dsh-context/agentGraph.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$1) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-context";
			tag.dataset.pluginCss = tagId$1;
			tag.textContent = css$1;
			document.head.appendChild(tag);
		}
		//#endregion
		//#region \0dsh-global-css:D:\dsh-plugins\dsh-context\src\client\styles\overview.css.mjs
		const css = ".lc-ov-entry{box-sizing:border-box;width:calc(100% + 4px);height:42px;color:var(--dsw-alias-label-primary);cursor:pointer;background:0 0;border:0;border-radius:12px;align-items:center;gap:8px;margin:0 -2px;padding:0 10px 0 8px;font-family:inherit;font-size:14px;line-height:22px;display:flex;overflow:hidden}.lc-ov-entry:hover{background:var(--dsw-alias-interactive-bg-hover)}.lc-ov-entry-rail{border-radius:50%;flex:none;justify-content:center;gap:0;width:36px;height:36px;margin:0;padding:0}.lc-ov-entry-icon{flex:none}.lc-ov-entry-label{text-align:left;white-space:nowrap;text-overflow:ellipsis;flex:auto;min-width:0;overflow:hidden}.lc-ov-backdrop{z-index:200;box-sizing:border-box;background:0 0;justify-content:flex-start;align-items:flex-end;padding:0 0 64px 12px;display:flex;position:fixed;inset:0;container:lc-ov/inline-size}.lc-ov-card{box-sizing:border-box;background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l2);width:min(720px,100vw - 96px);max-height:min(76vh,840px);box-shadow:var(--dsw-shadow-lv3,0 12px 32px #0006);color:var(--dsw-alias-label-primary);border-radius:12px;flex-direction:column;padding:16px 18px 18px;font-size:13px;display:flex;overflow:hidden}.lc-ov-head{flex-wrap:wrap;flex:none;align-items:center;gap:10px;margin-bottom:14px;display:flex}.lc-ov-head-icon{flex:none}.lc-ov-title{white-space:nowrap;font-size:15px;font-weight:600}.lc-ov-balance{background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l2);cursor:default;border-radius:999px;flex:none;align-items:center;gap:6px;max-width:100%;padding:2px 10px;font-size:12px;line-height:18px;display:inline-flex}.lc-ov-balance-label{color:var(--dsw-alias-label-secondary);white-space:nowrap}.lc-ov-balance-value{font-variant-numeric:tabular-nums;white-space:nowrap;font-weight:600}.lc-ov-head .lc-modal-close{flex:none;margin-left:0}.lc-ov-body{flex:auto;grid-template-columns:minmax(0,3fr) minmax(0,7fr);gap:10px;min-height:0;display:grid}.lc-ov-left{scrollbar-gutter:stable;flex-direction:column;gap:10px;min-height:0;padding-right:8px;display:flex;overflow-y:auto}.lc-ov-right{scrollbar-gutter:stable;min-height:0;padding-right:8px;overflow-y:auto}@container lc-ov (width<=932px){.lc-ov-card{overflow-y:auto}.lc-ov-body{display:block}.lc-ov-left{margin-bottom:12px}.lc-ov-left,.lc-ov-right{min-height:auto;padding-right:0;overflow:visible}.lc-ov-heat-card{flex:none}}.lc-ov-left>.lc-card{box-sizing:border-box;min-width:0;margin-bottom:0}.lc-ov-kpis{flex:none;grid-template-rows:repeat(3,1fr);grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;display:grid}.lc-ov-kpi{align-items:center;padding:10px 8px}.lc-ov-kpi .lc-stat-value{font-size:20px}.lc-ov-heat-card{flex-direction:column;flex:1 0 auto;display:flex}.lc-heat{flex:1;justify-content:center;align-items:center;gap:4px;display:flex}.lc-heat-wds,.lc-heat-col{padding-top:13px}.lc-heat-wds{flex-direction:column;gap:3px;display:flex}.lc-heat-wd{width:10px;height:20px;color:var(--dsw-alias-label-secondary);text-align:center;flex:none;justify-content:center;align-items:center;font-size:9px;display:flex}.lc-heat-cols{gap:3px;display:flex}.lc-heat-col{flex-direction:column;gap:3px;display:flex;position:relative}.lc-heat-mon{color:var(--dsw-alias-label-secondary);white-space:nowrap;font-size:9px;line-height:13px;position:absolute;top:0;left:0}.lc-heat-cell{box-sizing:border-box;background:var(--dsw-alias-bg-layer-2);cursor:default;border:0;border-radius:20%;width:20px;height:20px;padding:0}button.lc-heat-cell{cursor:pointer}button.lc-heat-cell:hover{box-shadow:0 0 0 1.5px color-mix(in srgb, var(--color-blue-500) 70%, transparent)}.lc-heat-future{background:0 0}.lc-heat-0{background:color-mix(in srgb, var(--dsw-alias-label-secondary) 16%, transparent)}.lc-heat-1{background:color-mix(in srgb, var(--color-blue-500) 28%, transparent)}.lc-heat-2{background:color-mix(in srgb, var(--color-blue-500) 50%, transparent)}.lc-heat-3{background:color-mix(in srgb, var(--color-blue-500) 72%, transparent)}.lc-heat-4{background:color-mix(in srgb, var(--color-blue-500) 92%, transparent)}.lc-heat-on{box-shadow:0 0 0 1.5px var(--color-blue-500)}.lc-ov-list-head{flex-wrap:wrap;align-items:center;gap:10px;margin-bottom:10px;display:flex}.lc-ov-list-title{white-space:nowrap;font-weight:600}.lc-ov-list-count{color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;background:var(--dsw-alias-bg-layer-2);border-radius:8px;padding:1px 7px;font-size:11px}.lc-ov-day-chip{border:1px solid color-mix(in srgb, var(--color-blue-500) 45%, transparent);color:var(--color-blue-500);background:color-mix(in srgb, var(--color-blue-500) 10%, transparent);cursor:pointer;white-space:nowrap;border-radius:999px;padding:1px 10px;font-family:inherit;font-size:11px;line-height:1.4}.lc-ov-search{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2);min-width:110px;font:inherit;color:var(--dsw-alias-label-primary);transition:border-color var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out);border-radius:6px;outline:none;flex:150px;padding:4px 10px;font-size:12px}.lc-ov-search:focus{border-color:var(--dsw-alias-label-secondary)}.lc-ov-search::placeholder{color:var(--dsw-alias-label-secondary)}.lc-ov-groups{flex-wrap:wrap;gap:6px;margin:-2px 0 10px;display:flex}.lc-ov-chip{border:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-secondary);font:inherit;cursor:pointer;white-space:nowrap;text-overflow:ellipsis;max-width:220px;transition:color var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out), border-color var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out), background-color var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out);background:0 0;border-radius:999px;align-items:baseline;gap:5px;padding:2px 10px;font-size:11px;line-height:1.5;display:inline-flex;overflow:hidden}.lc-ov-chip:hover{color:var(--dsw-alias-label-primary);border-color:var(--dsw-alias-label-secondary)}.lc-ov-chip-on,.lc-ov-chip-on:hover{background:var(--dsw-alias-button-primary-fill);color:var(--dsw-alias-label-primary-foreground);border-color:#0000}.lc-ov-chip-n{font-variant-numeric:tabular-nums;opacity:.65;font-size:10px}.lc-ov-chip-on .lc-ov-chip-n{opacity:.85}.lc-ov-grid{grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:10px;display:grid}.lc-ov-session{text-align:left;background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l2);cursor:pointer;font:inherit;color:inherit;transition:border-color var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out), background-color var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out);border-radius:10px;flex-direction:column;gap:6px;padding:10px 12px;display:flex}.lc-ov-session:hover{border-color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-2)}.lc-ov-session-current{border-color:color-mix(in srgb, var(--color-blue-500) 65%, transparent)}.lc-ov-session-head{align-items:flex-start;gap:6px;min-width:0;display:flex}.lc-ov-running{background:var(--color-green-500);border-radius:50%;flex:none;width:7px;height:7px}.lc-ov-session-title{-webkit-line-clamp:2;overflow-wrap:anywhere;-webkit-box-orient:vertical;flex:auto;min-width:0;font-weight:600;display:-webkit-box;overflow:hidden}.lc-ov-current{color:var(--color-blue-500);border:1px solid color-mix(in srgb, var(--color-blue-500) 45%, transparent);border-radius:4px;flex:none;padding:0 4px;font-size:10px;line-height:1.5}.lc-ov-session-times{flex-direction:column;flex:none;align-items:flex-end;gap:1px;display:flex}.lc-ov-session-time{color:var(--dsw-alias-label-secondary);white-space:nowrap;font-size:11px}.lc-ov-session-created{color:var(--dsw-alias-label-secondary);white-space:nowrap;font-variant-numeric:tabular-nums;font-size:10px;line-height:1.4}.lc-ov-session-crumb{min-width:0;color:var(--dsw-alias-label-secondary);white-space:nowrap;align-items:center;gap:5px;font-size:11px;display:flex;overflow:hidden}.lc-ov-crumb-group{text-overflow:ellipsis;flex:none;max-width:55%;overflow:hidden}.lc-ov-crumb-sep{opacity:.55;flex:none}.lc-ov-crumb-project{text-overflow:ellipsis;min-width:0;font-family:var(--ds-font-family-code,ui-monospace, SFMono-Regular, Menlo, monospace);color:var(--dsw-alias-label-primary);background:color-mix(in srgb, var(--dsw-alias-label-secondary) 16%, transparent);border-radius:999px;flex:0 auto;padding:0 8px;font-size:10px;line-height:1.6;overflow:hidden}.lc-ov-session-body{align-items:center;gap:14px;min-width:0;display:flex}.lc-ov-mini-stats{flex-direction:column;flex:auto;gap:3px;min-width:0;display:flex}.lc-ov-mini-stat{justify-content:space-between;align-items:baseline;gap:10px;font-size:11px;display:flex}.lc-ov-mini-label{color:var(--dsw-alias-label-secondary);white-space:nowrap;flex:none}.lc-ov-mini-value{font-variant-numeric:tabular-nums;white-space:nowrap;font-weight:600}.lc-ov-session-empty{color:var(--dsw-alias-label-secondary);padding:6px 0;font-size:11px;line-height:1.5}.lc-ov-session-preview{border-top:1px solid color-mix(in srgb, var(--dsw-alias-border-l2) 60%, transparent);align-items:baseline;gap:6px;min-width:0;margin-top:auto;padding-top:6px;display:flex}.lc-ov-session-preview-label{color:var(--dsw-alias-label-secondary);flex:none;font-size:10px}.lc-ov-session-preview-text{text-overflow:ellipsis;white-space:nowrap;min-width:0;color:var(--dsw-alias-label-primary);flex:0 auto;font-size:11px;line-height:1.5;overflow:hidden}.lc-ov-pager{justify-content:center;align-items:center;gap:10px;margin-top:12px;display:flex}.lc-ov-pager-btn{border:1px solid var(--dsw-alias-border-l2);width:26px;height:22px;color:var(--dsw-alias-label-primary);font:inherit;cursor:pointer;transition:border-color var(--ds-transition-duration,.2s) var(--ds-ease-in-out,ease-in-out);background:0 0;border-radius:6px;flex:none;justify-content:center;align-items:center;line-height:1;display:flex}.lc-ov-pager-btn:hover:enabled{border-color:var(--dsw-alias-label-secondary)}.lc-ov-pager-btn:disabled{opacity:.4;cursor:default}.lc-ov-pager-n{color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;white-space:nowrap;font-size:11px}.lc-ov-quota{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;display:grid}.lc-ov-quota-cell{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2);border-radius:10px;flex-direction:column;gap:2px;min-width:0;padding:8px 10px;display:flex}.lc-ov-quota-label{color:var(--dsw-alias-label-secondary);white-space:nowrap;text-overflow:ellipsis;font-size:12px;overflow:hidden}.lc-ov-quota-value{white-space:nowrap;text-overflow:ellipsis;font-size:15px;font-weight:600;overflow:hidden}.lc-ov-quota-sub{color:var(--dsw-alias-label-tertiary);white-space:nowrap;text-overflow:ellipsis;font-size:12px;overflow:hidden}";
		const tagId = "dsh-context/overview.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-context";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		//#endregion
		//#region src/client/index.ts
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
		const NS = "dsh-context";
		function apply(ctx) {
			ctx.effect(() => {
				return ctx.locale.register(NS, {
					zh: DICT_ZH,
					en: DICT_EN
				});
			}, "dsh-context: dictionaries");
			const t = ctx.locale.bind(NS);
			const kit = makeViewKit(t);
			watchHistoryFaces(ctx);
			const settings = createContextSettings();
			const ContextView = makeContextView(ctx, kit, settings);
			ctx.effect(() => watchPlacement(settings, {
				tab: () => ctx.slots.inject("conversation.view", () => {
					return ctx.slots.register({
						name: "conversation.view",
						id: "context",
						order: 20,
						locale: NS,
						label: () => t("tab")
					}, (props) => (0, react.createElement)(ContextView, props));
				}),
				sidebar: () => watchSidebarContextTab(ctx, ContextView, t, NS)
			}), "dsh-context: placement");
			const ContextJump = makeContextJumpButton(ctx, kit);
			ctx.slots.inject("conversation.chat.assistant-actions", () => {
				return ctx.slots.register({
					name: "conversation.chat.assistant-actions",
					id: "context-jump",
					order: 20,
					locale: NS
				}, (props) => (0, react.createElement)(ContextJump, props));
			});
			registerContextCommand(ctx, kit);
			const ContextModal = makeContextModal(ctx, kit, settings);
			ctx.slots.inject("conversation.input.overlay", () => {
				return ctx.slots.register({
					name: "conversation.input.overlay",
					id: "context-modal",
					order: 10,
					locale: NS,
					inject: (sessionId = "") => ({ hooks: { contextModal: modalStoreOf(sessionId) } })
				}, (props) => (0, react.createElement)(ContextModal, props));
			});
			const OverviewButton = makeOverviewButton(kit, settings);
			ctx.slots.inject("sidebar.footer.action", () => {
				return ctx.slots.register({
					name: "sidebar.footer.action",
					id: "context-overview",
					order: 10,
					locale: NS
				}, (props) => (0, react.createElement)(OverviewButton, props));
			});
			const OverviewPanel = makeOverviewPanel(ctx, kit);
			ctx.slots.inject("shell.overlay", () => {
				return ctx.slots.register({
					name: "shell.overlay",
					id: "context-overview",
					order: 10,
					locale: NS
				}, (props) => (0, react.createElement)(OverviewPanel, props));
			});
			ctx.inject(["settingsScope"], (raw) => {
				const c = raw;
				const binder = c.settingsScope;
				if (binder === void 0) return;
				c.effect(() => settings.attach(binder.bind({ namespace: NS })), "dsh-context: settings scope");
				const SettingsCard = makeSettingsCard(kit);
				c.slots.inject("settings.plugin.item", () => {
					return c.slots.register({
						name: "settings.plugin.item",
						key: NS,
						locale: NS,
						inject: () => ({
							hooks: { contextSettings: settings.store },
							set: (field, value) => {
								settings.set(field, value);
							}
						})
					}, (props) => (0, react.createElement)(SettingsCard, props));
				});
			});
		}
		module.exports = {
			name: "dsh-context",
			inject: ["slots", "locale"],
			apply
		};
		//#endregion
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map