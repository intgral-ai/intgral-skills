# Contributing

Keep each skill independently installable. Entry descriptions identify user tasks; references contain only task-specific detail. Use relative inline Markdown links and single-line name/description frontmatter; the zero-dependency validator intentionally supports this repository convention rather than all Markdown/YAML syntax.

Test externally visible validator/installation behavior before changing validation code. Run `npm run verify` on Node 22 or newer. The publication gate rejects missing references, cross-package dependencies, invalid names and old remote Skill dependencies. It is not a complete secret scanner or license audit.

Use private synthetic test workspaces. Real merchant preferences, product observations, task records, credentials and unrelated upstream skill history do not belong here. Research examples are schema illustrations, never retained evidence.

Changes to methods update their declared method/runbook revisions. Endpoint/schema changes require checking the actual backend contract; do not repair a backend mismatch by weakening evidence or approval rules. Record supported deployments and limitations in the compatibility guide.

Open a PR against `develop`. The initial branch is a publication candidate; maintainers merge and tag releases after review. This repository can be reviewed independently of outstanding ERP PRs, and does not modify ERP startup, CI or Skill serving.
