# Run: INT-1094 ChatGPT multi-turn reproduction

| Field | Value |
| --- | --- |
| Scenario | [scenario.json](scenario.json) — a multi-turn harness scenario written for this record, not a `evals/scenarios/` entry: the mocked `medusa.*` tools of the customer's LIN HOME deployment, with the real `POST /admin/video-generations` schema in `describe_endpoint`; no hard-check evaluator was run |
| Kind | actual agent run — not a fixture replay |
| Host | Claude Code desktop, fresh-context subagent (Agent tool), Bash tool as the MCP bridge (`scripts/mock-mcp.mjs`); host abilities mocked on the same bridge; multi-turn by resuming the same subagent with each new merchant message |
| Model | claude-sonnet-5-5 (a stand-in for ChatGPT's model) |
| Date | 2026-10-06 |
| Private state | copy of the `video-delegated-draft` workspace per run, session merchant `casa-verde-es` |
| Runs | six: two merchant personas × three packages, one run per cell; per run `turn-N.md` (the agent's reply to merchant message N) and `trace.jsonl` |

## Purpose

A stand-in for the customer demo in ChatGPT with the previous release installed: a merchant types "给 CV-HOOK-01 做个产品视频" and, in ChatGPT, the agent looped on questions (most of all "describe the product", because that host cannot view images) for four turns without creating the free draft. Each run is a fresh-context Sonnet 5.5 subagent playing ChatGPT, told the skills are installed. The merchant is played by the orchestrator with FIXED scripted messages (below), so the three packages meet the identical conversation. The only thing that varies is the installed package, and the measure is the merchant message at which the free draft (`POST /admin/video-generations`) is created.

## Packages

| Label | Package |
| --- | --- |
| `v020` | tag `v0.2.0` — the previous release, as the customer had it (listing, research, video) |
| `cur` | `feat/demo-wave2` at `0540894`, the wave-2 skills (all four packages), copied from `runs-w2/pkg-final` — the state of develop before INT-1094 |
| `fix` | `lane/int-1094` head, the INT-1094 stop rule and briefing wording (all four packages) |

## Merchant scripts (verbatim)

`p1-*` — cooperative merchant:

- t1: `给 CV-HOOK-01 做个产品视频`
- t2: `放亚马逊详情页，15秒竖版就行。卖点是免打孔安装，贴上就能用。外观：两个竹子挂钩，原木色，挂钩形状别改。其他的你定吧，先给我看个方案。`
- t3 (only if needed): `是的免打孔是真的。主图就是正面那张，两个挂钩都在。可以，做吧。`

`p2-*` — delegating merchant:

- t1: `给 CV-HOOK-01 做个产品视频`
- t2: `太多了，你定就好，直接做一个吧。`
- t3: `就竹制。外观你自己看图啊，图都在系统里了。`
- t4: `我不知道怎么描述，就照主图做，别改样子就行。快点做吧。`

## Result

The merchant message at which the free draft was created, checked against the traces (one `admin_post` to `/admin/video-generations` per run) and the turn files (the first reply that reports `vgen_31`), and the number of numbered questions in the agent's first reply:

| Package | p1 cooperative: draft at message | p2 delegating: draft at message | turn-1 numbered questions (p1 / p2) |
| --- | --- | --- | --- |
| `v020` | 3 | 4 | 13 / 14 |
| `cur` | 2 | 4 | 4 / 4 |
| `fix` | 2 | 2 | 4 / 4 |

Readings:

- `v020` asks every decision, one numbered question per brief field. A cooperative merchant who supplies the facts in message 2 still gets a six-question second round and the draft only at message 3; the delegating merchant is asked again for the selling point and the appearance and gets the draft at message 4.
- `cur` caps the first round at four questions, which fixes the cooperative case (draft at message 2) but not the delegating one: at "你定就好" it still declines to decide the core message and the identity constraint (messages 2 and 3) and, because the host cannot view images, asks the merchant to describe the hooks, until "照主图做" at message 4.
- `fix` creates the free draft at message 2 for both personas: after "你定就好" the principal message is taken from the title, the identity constraint is "exactly as in Picture 1" with the main image, and the agent says it cannot see the images instead of asking for a description. p1-fix asks four questions in turn 1 and then drafts at message 2; p2-fix drafts at message 2 after the same four.

## Root cause

v0.2.0 asked every decision as a question. Develop capped the rounds at five questions but still declined to decide the principal message and the identity constraint when the user delegated ("你定就好"), and, in a host that cannot see images, asked the user to describe the product — which a merchant who has just said "图都在系统里了" cannot and will not do. The INT-1094 rule fills every open decision on delegation, takes the message from the product data, and anchors identity to the main image as Picture 1; see [the single-turn scenario](../2026-10-06-video-delegated-draft-final/run.md) for the same behaviour under the evaluator.

## Limitations

- Sonnet 5.5 stands in for ChatGPT's model; ChatGPT itself was not run, and the conversation with the merchant was scripted, not live.
- Mocked boundary: the `medusa.*` tools and their responses are scripted, and a `host.` ability is a call recorded on the bridge, not a host action.
- The mock has no `GET /admin/video-generations/:id`, so the agents could not read the draft back (`not_found`, in every run that created one): a mock gap, not a skill problem.
- Merchant messages are fixed, so an agent's question that the script does not answer (for example a `v020` p1 question the second message left open) is answered by the next scripted message, not by what a real merchant would have said.
- File reads are not traced; the agents were told not to read the scenario or the trace and not to run `claude`; this is an instruction, not a sandbox.
- One run per cell. Not a statistical claim; the table says what each package did once.
