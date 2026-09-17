# Intgral Skills

Install the merchant workflows you need in your AI client, then connect that client to Intgral MCP.

| Skill | Use it for |
| --- | --- |
| [intgral-listing](skills/intgral-listing/SKILL.md) | Query products, import files, edit catalog/listing drafts, work with images and recover partial writes |
| [intgral-research](skills/intgral-research/SKILL.md) | Market, competitor and supplier research; product briefs; retained evidence and report reuse |
| [intgral-video](skills/intgral-video/SKILL.md) | Product video briefs, reference images or keyframes, approval, generation and media versions |

Each package includes its references and templates and can be installed alone. Research includes its analysis methods; no Accio installation is required. Listing guidance is currently in Chinese; research and video guidance is in English. Agents should respond in the user's language.

## Install

After the initial PR is merged, use the open-source [Skills CLI](https://github.com/vercel-labs/skills):

```bash
npx skills@1.7.0 add intgral-ai/intgral-skills --skill intgral-listing
```

The installer lets you select a client and installation scope. See [installation](docs/installation.md) for a fixed release/commit, Windows copies, local installation, updates and rollback.

**Initial delivery is a review branch.** Until [PR #1](https://github.com/intgral-ai/intgral-skills/pull/1) is merged, clone the review branch using the installation guide. The default branch is only a repository bootstrap; no release tag is advertised yet.

Installing a Skill does not connect or authenticate to your ERP. Add your administrator-provided Intgral MCP endpoint in your client's connection settings and authenticate there. Provider credentials stay on the service; do not put them in this repository or a task record.

## Compatibility and private settings

The [compatibility guide](docs/compatibility.md) states required tools and current validation limits. A package may describe a capability that your deployment has not enabled.

Use a persistent private directory outside the installed package for merchant settings and task records. Optionally point `INTGRAL_WORKSPACE` at it; the skills explain this convention and how to handle a host without filesystem access. Installation and updates do not grant filesystem or ERP permissions.

## Contribute

Node 22+ is enough; the validation scripts have no dependencies:

```bash
npm run verify
```

This checks the publication contract, installs each package into an isolated test directory, and validates the behavioral scenario fixtures. It does not call a live ERP, generate paid media or run an agent; recorded agent runs live under [evals](evals/README.md). Read [contributing](CONTRIBUTING.md), [provenance](docs/provenance.md) and [validation evidence](docs/validation.md).

Licensed under [MIT](LICENSE). Public content is independently maintained; no ERP or gateway code is included.
