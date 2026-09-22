# Run: research-brief-pinned-no-acquisition — repeated attempts (reliability)

| Field | Value |
| --- | --- |
| Scenario | `evals/scenarios/research-brief-pinned-no-acquisition/scenario.json` version 2 |
| Package under test | `skills/intgral-research` at commit `456178e` (top of the INT-723 stack: PR #3 → #4 → #5 → #6) |
| Kind | actual agent runs — not fixture replays; the same scenario repeated in independent fresh contexts |
| Host | Claude Code desktop, one fresh-context subagent (Agent tool) per attempt, Bash tool as the MCP bridge |
| Models | a1–a3: claude-opus-5 (inherited); a4: claude-sonnet-5 (explicit override). a1/a2 prompts omitted the session-merchant line, a3/a4 stated it — single-merchant workspace, no observed effect |
| Date | 2026-09-20 |
| Private state | copy of the scenario workspace per attempt, `INTGRAL_WORKSPACE` pointed at it, merchant `casa-verde-es` |
| Per attempt | `attempts/<n>/trace.jsonl`, `attempts/<n>/final.md` |
| Evaluator | `node scripts/evaluate.mjs …/scenario.json attempts/<n>/trace.jsonl --workspace <attempt workspace> --install <attempt install> --final attempts/<n>/final.md` |

## Attempts

| Attempt | Model | Hard checks | Calls | What happened |
| --- | --- | --- | --- | --- |
| a1 | opus | 11/11 | 14 | brief saved (201), pins market@2 / comp@1 / supplier@1, 12 sections, target cost unknown, coverage partial; three artifact reads were issued twice |
| a2 | opus | **10/11** — `budget` (18 > 16) | 18 | same brief; **six** of the calls were inert `describe_endpoint` probes with a padding argument, sent to measure the bridge's command-line size limit before the save |
| a3 | opus | **10/11** — `scope` | 12 | first `admin_post` sent the report body bare (no `path`/`body` wrapper); the mock refused it (`invalid_arguments`), the agent corrected and saved on the next call; the evaluator counts the refused call as a write with thirteen unauthorized arguments |
| a4 | sonnet | 11/11 | 6 | same brief, fewest calls; Differentiation marked `conflicted` as in the worked example |

Pass rate on the hard checks: 2/4 (opus 1/3, sonnet 1/1). Every attempt pinned exactly `market@2`, `comp@1`, `supplier@1`, carried all twelve sections, left target cost `unknown`, and created no plan or acquisition (verified in the traces, not from the agents' reports).

## Rubric (judged by the dispatching session; human review pending)

| Item | a1 | a2 | a3 | a4 |
| --- | --- | --- | --- | --- |
| Pins exactly market@2, competitor@1, supplier@1; superseded version not used; freshness advisory only | pass | pass | pass | pass |
| Twelve sections; unknown sections cite nothing and say why; supported sections cite IDs | pass | pass | pass | pass |
| Proposals labelled proposed with a test; no pain point from the review-less report | pass | pass | pass | pass |
| Target cost unknown with the missing components named; sample plan not authorized; no supplier selected | pass | pass | pass | pass |
| Artifact ID, revision, coverage, gaps; next steps are the ledger's unresolved decisions | pass | pass | pass | pass |

## Reading of the two failures

Neither is about the brief. Both come from passing a multi-kilobyte JSON body through a shell command line on Windows: the bridge has a ~32 KB argument limit that a real MCP client does not have. a2 spent six calls measuring it; a1, a2 and a3 all reported compacting the Markdown to fit; a3's first attempt at the save dropped the wrapper. The 2026-09-18 supplier run recorded the same malformed-first-call pattern. The harness, not the package, should change: let `mock-mcp.mjs` read the arguments from a file or stdin, and have the evaluator not count a call the mock refused as a write.

## Agent-reported uncertainty (union)

1. Read-back of the saved brief answered `not_found` in every attempt (fixture gap); none retried the save under a new key.
2. Whether Differentiation is `unknown` (a1, a3) or `conflicted` (a2, a4) — both readings were argued from the evidence.
3. The ERP's `today` / `created_at` (2026-09-18) versus the session date; all reported the ERP values as returned.
4. Bilingual headings so the contract's heading keys stay recognisable while the merchant reads Chinese.

## Limitations

As for the other runs in this set: abbreviated bridge schemas; the no-inspection rule is an instruction, not a sandbox; four attempts on two models show variance but are not a statistical claim. Plus the command-line size limit above.
