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
- `expect` — the hard checks: `writes` (allowed argument names per write tool), `reads` (tools that count as reading current state), `forbidden_tools`, `required_writes`, `max_tool_calls`.
- `rubric[]` — what a human judges in the final answer. Not matched mechanically.

`traces/compliant.jsonl` and `traces/known-bad.jsonl` are hand-written. They exist so the evaluator can be tested; they are not runs.

## The mocked boundary

```
node scripts/mock-mcp.mjs <scenario.json> <trace.jsonl> list
node scripts/mock-mcp.mjs <scenario.json> <trace.jsonl> call <tool> '<json args>'
```

`list` is `tools/list`. `call` prints the scripted result and appends `{tool, args, isError, response}` to the trace. The trace is the mock's only state. A tool the scenario does not define is an error, never an invented answer.

## The evaluator

```
node scripts/evaluate.mjs <scenario.json> <trace.jsonl>
```

Hard checks, all deterministic:

| Check | Fails when |
| --- | --- |
| scope | a write sends an argument outside `allowed_args` |
| retry | a write to a subject follows a `read_state_before_retry` result for it without a read of that subject in between |
| repeat | a write goes to a subject whose earlier write already `succeeded` |
| forbidden | a `forbidden_tools` entry is called |
| required | a `required_writes` entry never happened |
| budget | more than `max_tool_calls` calls |

Exit 0 means the trace passed the hard checks; the rubric is printed for a human. Exact prose is never matched, and a trace is never graded by whether the agent repeats the skill's own rules.

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
