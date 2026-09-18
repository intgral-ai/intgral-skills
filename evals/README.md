# Behavioral evaluation

`npm run verify` proves a package is well-formed. It does not prove an agent behaves well with it. This directory holds the second kind of evidence: scenarios an agent is run against, with a mocked MCP boundary, and the recorded results.

Three things are kept apart and named differently:

| Kind | What it establishes | Where |
| --- | --- | --- |
| Fixture validation | the scenario and evaluator work; the known-bad trace is rejected | `npm test` (`tests/evaluate.test.mjs`, `tests/mock-mcp.test.mjs`) |
| Trace replay | a hand-written trace passes or fails the hard checks | `scripts/evaluate.mjs` over `scenarios/*/traces/*.jsonl` |
| Actual agent run | what a real agent did with the installed package | `runs/<date>-<scenario>-<label>/` |

Only the third is behavioral evidence. The first two run in CI without credentials, paid providers or an ERP; a run needs an agent executor and is recorded as a separate acceptance step. A scenario without a run is not run.

## A scenario

`scenarios/<id>/scenario.json`:

- `request` — the user's message, verbatim, in the user's language.
- `workspace` — a directory of synthetic private state (merchant preferences, task records). Copied per run; never a real merchant.
- `tools[]` — the mocked MCP contract: `name`, `description`, an abbreviated `inputSchema`, and `responses[]` tried in order. A response with `when` matches when every listed argument equals; `once` serves it only the first time; a response without `when` is the fallback. `result` is a normal result, `error` an `isError: true` result.
- `expect` — the hard checks (the first eight judge the trace; the last three judge private state and need `--workspace`, `--install` and `--final`): `writes` (allowed argument names per write tool), `reads` (tools that count as reading current state), `forbidden_tools`, `forbidden_writes` (labelled partial argument shapes a write must never match), `required_writes` (partial argument shapes some write must match), `forbidden_write_text` (strings that must not appear anywhere in a write's arguments, case-insensitive — for copy that must exclude unsupported claims), `max_tool_calls`. Partial shapes match deeply: every key given must be present with an equal value, nested objects recurse, arrays compare whole, and the value `"*"` accepts any present value (so `{copy: {title: "*"}}` means "a title was sent"). That is enough to require `review_analysis.status: unavailable` inside an `admin_post` body or to forbid any POST to `/admin/research/plans`.
- `rubric[]` — what a human judges in the final answer. Not matched mechanically.

`traces/compliant.jsonl` (every scenario) and `traces/known-bad.jsonl` (where present) are hand-written. They exist so the evaluator can be tested; they are not runs.

## The mocked boundary

```
node scripts/mock-mcp.mjs <scenario.json> <trace.jsonl> list
node scripts/mock-mcp.mjs <scenario.json> <trace.jsonl> call <tool> '<json args>'
```

`list` is `tools/list`. `call` prints the scripted result and appends `{tool, args, isError, response}` to the trace. The trace is the mock's only state. A tool the scenario does not define is an error, never an invented answer.

## The evaluator

```
node scripts/evaluate.mjs <scenario.json> <trace.jsonl> [--workspace <run dir>] [--install <installed package>] [--final <final.md>]
```

A run that made no tool call has no trace file; that is an empty trace.

Hard checks, all deterministic:

| Check | Fails when |
| --- | --- |
| scope | a write sends an argument outside `allowed_args` |
| retry | a write to a subject follows a `read_state_before_retry` result for it without a read of that subject in between |
| repeat | a write goes to a subject whose earlier write already `succeeded` |
| forbidden | a `forbidden_tools` entry is called |
| forbidden-write | a write matches a `forbidden_writes` shape (the finding carries that entry's `label`) |
| text | a write's arguments contain a `forbidden_write_text` string |
| workspace | with `--workspace <run dir>`: a path in `workspace.unchanged` differs from the scenario's fixture, an `exists` path is missing, an `absent` path exists, a `contains` text is missing or a `not_contains` text is present |
| install | with `--install <dir>` and `install_unchanged: true`: any file inside the installed package differs from, or is not in, the repository's package |
| final | with `--final <file>`: the final answer contains a `final_forbidden_text` string |
| required | a `required_writes` entry never happened |
| budget | more than `max_tool_calls` calls |

Exit 0 means the trace passed the eleven hard checks; the rubric is printed for a human. Exact prose is never matched, and a trace is never graded by whether the agent repeats the skill's own rules.

## Running an agent

1. Copy `skills/<name>` into an empty install directory and the scenario's `workspace` into a private directory. Point `INTGRAL_WORKSPACE` at the copy.
2. Give a fresh-context agent the installed `SKILL.md` path, the workspace, the two commands above, and the request — nothing else. The agent must not read `scenario.json` or the trace.
3. The agent writes its final message to `final.md`. Evaluate the trace. Judge the rubric.
4. Record `run.md`: scenario version, package commit, host, model, date, tool count, evaluator line, rubric verdicts, what the agent reported being unsure about, limitations.

For a guidance change, record a baseline run first, change the guidance, then rerun. If the baseline already passes, say so; do not manufacture a red result.

## Scenarios

| Scenario | Skill | Journey | Runs |
| --- | --- | --- | --- |
| [listing-title-only-two-skus](scenarios/listing-title-only-two-skus/scenario.json) | intgral-listing | title-only edit on two SKUs; one write returns `unknown` | [baseline](runs/2026-09-18-listing-title-only-two-skus-baseline/run.md), [updated](runs/2026-09-18-listing-title-only-two-skus-updated/run.md) |
| [research-market-proxies](scenarios/research-market-proxies/scenario.json) | intgral-research | market report from retained listings only; badge floors, two dated points, a cheap alternative; no measurement record | [baseline](runs/2026-09-18-research-market-proxies-baseline/run.md), [updated](runs/2026-09-18-research-market-proxies-updated/run.md) |
| [research-competitor-ratings-only](scenarios/research-competitor-ratings-only/scenario.json) | intgral-research | complaint themes asked for; ratings and counts retained, no review bodies | [baseline](runs/2026-09-18-research-competitor-ratings-only-baseline/run.md), [updated](runs/2026-09-18-research-competitor-ratings-only-updated/run.md) |
| [research-supplier-incomplete-quotes](scenarios/research-supplier-incomplete-quotes/scenario.json) | intgral-research | "which is cheapest" across a FOB quote, a listing tier and a per-set CN¥ price | [baseline](runs/2026-09-18-research-supplier-incomplete-quotes-baseline/run.md), [updated](runs/2026-09-18-research-supplier-incomplete-quotes-updated/run.md) |
| [listing-copy-suggest-only](scenarios/listing-copy-suggest-only/scenario.json) | intgral-listing | title/bullet suggestions asked for, no write authorized | [baseline](runs/2026-09-18-listing-copy-suggest-only-baseline/run.md), [updated](runs/2026-09-18-listing-copy-suggest-only-updated/run.md) |
| [listing-copy-conflict](scenarios/listing-copy-conflict/scenario.json) | intgral-listing | authorized bullet rewrite; user asserts stainless steel and a 5 kg load, the ERP says bamboo and nothing about load | [baseline](runs/2026-09-18-listing-copy-conflict-baseline/run.md), [updated](runs/2026-09-18-listing-copy-conflict-updated/run.md) |
| [listing-copy-localize-es](scenarios/listing-copy-localize-es/scenario.json) | intgral-listing | authorized Spanish rewrite of title, bullets and description for Amazon ES | [baseline](runs/2026-09-18-listing-copy-localize-es-baseline/run.md), [updated](runs/2026-09-18-listing-copy-localize-es-updated/run.md) |
| [workspace-first-time-setup](scenarios/workspace-first-time-setup/scenario.json) | intgral-listing | empty configured workspace; new merchant supplies id, market, language, currency | [baseline](runs/2026-09-18-workspace-first-time-setup-baseline/run.md), [updated](runs/2026-09-18-workspace-first-time-setup-updated/run.md) |
| [workspace-lasting-vs-one-off](scenarios/workspace-lasting-vs-one-off/scenario.json) | intgral-listing | a one-off title variant plus a lasting rule in one request | [baseline](runs/2026-09-18-workspace-lasting-vs-one-off-baseline/run.md), [updated](runs/2026-09-18-workspace-lasting-vs-one-off-updated/run.md) |
| [workspace-switch-merchant](scenarios/workspace-switch-merchant/scenario.json) | intgral-listing | two merchants in one workspace; a title suggestion for the second | [baseline](runs/2026-09-18-workspace-switch-merchant-baseline/run.md), [updated](runs/2026-09-18-workspace-switch-merchant-updated/run.md) |
| [workspace-no-filesystem](scenarios/workspace-no-filesystem/scenario.json) | intgral-listing | same setup request on a host with no writable filesystem | [baseline](runs/2026-09-18-workspace-no-filesystem-baseline/run.md), [updated](runs/2026-09-18-workspace-no-filesystem-updated/run.md) |
| [video-brief-missing-generation-route](scenarios/video-brief-missing-generation-route/scenario.json) | intgral-video | 15 s vertical video requested; the deployment exposes no video-generation route | [recorded](runs/2026-09-18-video-brief-missing-generation-route-recorded/run.md) |
| [research-brief-pinned-no-acquisition](scenarios/research-brief-pinned-no-acquisition/scenario.json) | intgral-research | brief from three retained reports, one superseded version, stale-ish freshness, no collection | [baseline](runs/2026-09-18-research-brief-pinned-no-acquisition-baseline/run.md), [updated](runs/2026-09-18-research-brief-pinned-no-acquisition-updated/run.md) |
