import { test } from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

// INT-1104: the video scenarios advertise GET /admin/video-generations/:id, so reading back a generation id the scenario hands out must answer, not fall through to not_found.
const repository = fileURLToPath(new URL("..", import.meta.url));
const mock = join(repository, "scripts", "mock-mcp.mjs");
const readBack = (t, scenario, id) => {
  const tmp = mkdtempSync(join(tmpdir(), "intgral-int1104-"));
  t.after(() => rmSync(tmp, { recursive: true, force: true }));
  const run = (tool, args) => JSON.parse(spawnSync(process.execPath, [mock, join(repository, "evals", "scenarios", scenario, "scenario.json"), join(tmp, "trace.jsonl"), "call", tool, JSON.stringify(args)], { encoding: "utf8" }).stdout);
  return { run, generation: run("medusa.admin_get", { path: `/admin/video-generations/${id}` }) };
};

test("video-delegated-draft: the draft it creates can be read back with the same plan_hash and estimate", (t) => {
  const { run, generation } = readBack(t, "video-delegated-draft", "vgen_31");
  const created = run("medusa.admin_post", { path: "/admin/video-generations", body: {} }).video_generation;
  assert.equal(generation.isError, undefined, JSON.stringify(generation));
  const got = generation.video_generation;
  assert.equal(got.id, created.id);
  assert.equal(got.plan_hash, created.plan_hash);
  assert.equal(got.status, created.status);
  assert.deepEqual(got.cost.estimate, { amount: created.estimate.amount, currency: created.estimate.currency, price_source: created.estimate.price_source });
  assert.equal(got.mode, "reference");
  assert.deepEqual(got.input.reference_asset_ids, ["img_cv01_main"]);
  assert.equal(got.approval, null);
});

test("video-delete-version-handoff: the generation a stored version points to can be read", (t) => {
  const { run, generation } = readBack(t, "video-delete-version-handoff", "vgen_01");
  const listed = run("medusa.admin_get", { path: "/admin/products/prod_cv01/videos" }).videos.find((video) => video.kind === "final");
  assert.equal(generation.isError, undefined, JSON.stringify(generation));
  assert.equal(generation.video_generation.id, listed.generation_id);
  assert.equal(generation.video_generation.status, "completed");
  assert.deepEqual(generation.video_generation.media_asset_ids, [listed.id]);
});
