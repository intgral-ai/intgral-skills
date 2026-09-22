# Install, update and remove

Use a client that supports local Agent Skills and an authenticated Intgral MCP connection. The Skills CLI installs files; the host decides how to discover and load them.

## Install from a release tag

Clone the reviewed tag explicitly, then install into your current client workspace:

```bash
git clone --branch v0.1.0 --single-branch https://github.com/intgral-ai/intgral-skills.git intgral-skills-source
npx skills@1.7.0 add ./intgral-skills-source --skill intgral-listing --agent codex --copy
```

Replace the skill name with `intgral-research` or `intgral-video`, or select several. These are independent packages. `--copy` avoids symlink requirements on Windows. Omit `--agent` to use the installer's client selection. The example targets a project; add `--global` only when you want user-wide installation.

Skills CLI 1.7.0 splits a GitHub tree URL at a slash in the ref name, so a branch such as `feat/…` cannot be installed by URL; the clone command above works for any tag or branch. If the source directory already exists, update its checkout deliberately rather than cloning over it.

For a cloned checkout, run from your intended client workspace:

```bash
npx skills@1.7.0 add /path/to/skills-checkout --skill intgral-video --agent codex --copy
```

The path is an example: use the actual checkout. Restart or reload the client as its own skill-discovery mechanism requires, then explicitly select the installed skill for the first task. Confirm it reads the installed entry and references instead of an older copy.

## Fixed versions and upgrades

For reproducible installation, clone this repository, check out a reviewed tag or commit, and install from that local checkout. Record the commit in your private task workspace. Tags are published only after release review; `v0.1.0` is the first, and the [changelog](../CHANGELOG.md) says what each tag carries.

Before upgrading, preserve private preferences and customer-edited rules outside the installed package. Reinstall from the selected checkout, start a fresh client session and confirm that the same private merchant workspace is read. To roll back, install the prior reviewed checkout; keep historical task and report revision identities unchanged.

The installer replaces distribution files. Treat those files as replaceable. Lasting merchant instructions belong in the private workspace; maintain a fork if you intentionally change the public workflow itself.

## Connect

Configure the actual Intgral MCP endpoint using your client's connection settings and your administrator's authentication instructions. Then run the capability check in the [compatibility guide](compatibility.md) before the first task: it takes each workflow from `medusa.get_started` and `tools/list` through endpoint discovery to an execution-ready, preparation-only or unknown outcome. The gateway's own Skill listing is not evidence that your client installed this package, and a listed tool is not evidence that the backend supports it.

No endpoint, tenant, user identity, marketplace or language is inferred from this repository. Missing authentication or routes should produce a precise limitation rather than a direct-provider workaround.

## Remove

Use the installer's `remove` command for the selected skill and scope, or remove only the installed package directory through your client's normal process. Private merchant records outside that directory remain yours. Disconnect MCP separately if you also want to remove service access.

## Without an installer

Copy the entire selected directory under `skills/`, including references, assets and LICENSE, into the local skills location documented by your client. Do not copy only SKILL.md. The repository does not require a custom runtime, npm package publication or an ERP source checkout.
