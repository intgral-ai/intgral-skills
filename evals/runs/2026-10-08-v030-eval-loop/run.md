# Eval loop on v0.3.0 — all scenarios, Opus and Sonnet

| Field | Value |
| --- | --- |
| Scenarios | all 50 at v0.3.0, plus `listing-image-self-check` and `video-keyframe-self-check` added in this loop (52) |
| Packages under test | `a6db2c8` (v0.3.0 as first tagged) → `d4b4547` → `048a23c` (self-check baseline) → `b16be8d` |
| Kind | actual agent runs, not fixture replays; one run per scenario × model × round |
| Host | Claude Code desktop, one fresh-context workflow subagent per run, Bash as the MCP bridge (`scripts/mock-mcp.mjs`); host abilities mocked on the same bridge |
| Models | claude-opus-5-5, claude-sonnet-5-5 |
| Dates | 2026-10-07 to 2026-10-08 |
| Grading | `scripts/evaluate.mjs` (13 hard checks, with `--workspace`, `--install`, `--final`), then a separate judge agent per run for the rubric |
| Results | [results.md](results.md): per-round tables and the latest verdict per scenario; each run directory holds `final.md`, `trace.jsonl`, `judge.json` |
| Harness | [harness/prep.mjs](harness/prep.mjs) builds each run directory and its prompt; [harness/score.mjs](harness/score.mjs) runs the evaluator for the judge |

## Outcome

| Round | Package | Opus hard / hard + rubric | Sonnet hard / hard + rubric |
| --- | --- | --- | --- |
| r0 (50 scenarios) | `a6db2c8` | 47/50 · 33/50 | 48/50 · 22/50 |
| r1 (50 scenarios) | `d4b4547` | 50/50 · 45/50 | 49/50 · 38/50 |
| r2 (22 scenarios: round-1 failures, scenarios touched by the round-2 edits, the self-check pair) | `b16be8d` | 22/22 · 19/22 | 21/22 · 13/22 |
| Latest per scenario (52) | | **52/52 · 49/52** | **51/52 · 43/52** |

## The loop

1. **Round 0** ran every scenario on both models. Every failing run was triaged by a separate agent into package gap, model miss, stale or over-broad scenario, or judge error, with quoted evidence (63 failed checks: 27 package, 24 scenario, 10 model, 2 judge error).
2. **Fixes** (`d4b4547`): the package gaps became small guidance edits in all four packages (see the CHANGELOG); rubrics that contradicted v0.3.0 guidance were rewritten; fixture defects were fixed (a compliance result that erased a gap, saved-report read-backs and video-generation lists that answered not_found).
3. **Round 1** reran everything. Two failures were regressions caused by the fixes: a "review and publish on this page" note leaked into read-only answers, and four runs walked the whole workspace. Fixed in `fdbad40`, with a research-brief clarification and two rubric corrections.
4. **Image self-check**: two scenarios mock `host.generate_image` (the first image is defective: "Casa Vrede" lettering; a hook cut off at the frame edge) and `host.view_image` (neutral visual descriptions). The **baseline on `048a23c` already passed on both models** — both looked before storing and redid once — except one Opus run over budget from a stray `host.open_url`. The rule went into listing `images.md`, video `keyframes.md` and a stop rule in each SKILL.md (`b16be8d`), so weaker hosts get it in writing; on these two models the scenarios do not discriminate.
5. **Round 2** reran the round-1 failures, every scenario whose guidance changed, and the self-check pair.

## What still fails (latest round), and why

| Scenario | Model | Reading |
| --- | --- | --- |
| video-brief-first-round-cap | both | proposals labelled without a reason; the rule ("one line each with its reason") is in briefing.md — model, persistent across all rounds |
| video-brief-missing-generation-route | both | asks low-value questions instead of recording open decisions; guidance present — model |
| workspace-switch-merchant, start-preferences-offer | Sonnet | walks the workspace with `find` / `ls -R` despite the explicit rule; the harness prompt hands the agent the workspace path up front, which invites it — harness and model |
| start-preferences-existing | Sonnet | a stray probe POST to `/admin/x` (hard fail) — model |
| start-preferences-declined | Sonnet | does not acknowledge the scripted refusal — model |
| start-bearer-token-deployment | Sonnet | ran `set-token.ps1` with its own shell instead of the mocked `host.shell`; the real host's permission check refused it — harness (on a real host that is the right behaviour) |
| research-supplier-incomplete-quotes | Sonnet | re-asks a lead time the quote states (rule present) and did not write final.md — model |
| video-approve-changed-plan-hash | Sonnet | paraphrases the segment prompts — model |
| workspace-first-time-setup | Opus | brand left in the evidence line, not the brand field — model |

## Limitations

- One run per scenario × model × round: these are not reliability rates.
- The rubric is judged by a model, not a human; triage caught two judge errors in round 0. Hard checks are deterministic.
- File reads are not traced; workspace isolation rests on the unchanged-workspace check and the transcripts.
- Harness additions over the 2026-10-06 prompt: no Skill tool and no `mcp__*` tools (a real gateway was connected in the session), no "already connected" line for start scenarios, no session-merchant line where the scenario's merchant is null, prompt variants for no workspace and no filesystem. A transcript scan found no `mcp__*`, Skill or `claude` CLI call by any run agent; one round-0 Sonnet run read its own `trace.jsonl`.
- Weaker models (Haiku) were not run in this loop.
