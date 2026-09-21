# Private merchant workspace

Use the user's configured `INTGRAL_WORKSPACE` directory or an explicitly selected persistent private workspace. This is an instruction convention, not an automatically created service or a new ERP setting. It lives outside the installed skill, the plugin cache and any public checkout, so replacing or uninstalling a package cannot touch it.

Layout, one directory per merchant under a stable identifier:

```text
<workspace>/merchants/<stable-id>/preferences.md   lasting preferences and the dated rules table
<workspace>/merchants/<stable-id>/rules.md         optional longer brand or process rules
<workspace>/merchants/<stable-id>/tasks/           task records: resumable identities, exact uncertain requests
<workspace>/merchants/<stable-id>/backups/         dated copies taken before a preference change
```

The stable identifier is confirmed by the user or taken from the ERP — never inferred from a display name. Read only the current merchant's directory. Credentials stay in the host's connection configuration, never in these files. Research evidence and report revisions stay in the ERP; local notes point to them.

## First-time setup

1. Say what the workspace is for and what it is not: a file the agent reads at the start of every task — not the agent's memory, not an ERP setting, not shared with anyone.
2. Confirm the two things nothing else can supply: the stable identifier and the private location. If `INTGRAL_WORKSPACE` is configured and the user names an identifier, both are answered; ask only for what is still missing.
3. Read `merchants/<stable-id>/` first. If preferences exist, use them and do not recreate them. If not, create `preferences.md` from the bundled [preferences template](../assets/preferences.example.md) with the values the user supplied, leaving unknown items unset — never filled in the installed package, never with guessed merchant facts.
4. Record the user's lasting instructions as dated rows in the rules table with their source. Read the file back and report the actual path and contents.
5. Close with what happens next time: the file is read first, and the user can edit it directly.

Ordinary read-only work needs none of this and can proceed from the current request. Before promising persistence or creating a task record, one writable private location must exist.

## Every later task

Read the current merchant's `preferences.md` (and `rules.md` if present) before acting. Current user choices control this task; backend facts, permissions and validation remain authoritative. Local brand wording supplies wording rules, never product facts, and never authorizes an external action.

## Lasting instructions and one-off choices

Only an explicit lasting instruction ("from now on", "always", "remember") updates preferences or rules. A one-off choice ("this time", "just for this") affects the current task only and is not recorded — say so. When the intent matters and is ambiguous, ask once. A lasting change never retroactively changes an approved backend snapshot.

To change a preference file:

1. Re-read the current file.
2. Copy it to `backups/preferences.<date>.md` (or `rules.<date>.md`).
3. Make the minimum change — usually one new dated row — preserving every unrelated line.
4. Read the file back and report exactly what changed.

If the file changed between the read and the write, merge or ask about the conflicting part; never overwrite it. Explain a conflict with an existing rule and use the user's explicit resolution. Never claim to remember a change whose write failed.

## Switching merchants

Each merchant has its own directory. A task names one merchant; read that directory only. Another merchant's rules, identities or task records never enter the current task, even when the operator runs several merchants from one client. When the merchant for a task is unclear, ask which stable identifier applies rather than guessing from context.

## Reinstall and upgrade

Distribution files are replaceable; private files are not. A package replacement or upgrade must leave the workspace untouched — after it, start a fresh session and confirm the same merchant directory is read. Never store merchant data inside the package to survive an upgrade; it will not.

## Without a filesystem

A host that cannot write files cannot persist preferences. Say so before the user relies on memory that does not exist, then give the value that is still possible: an exportable record — the template filled with what the user supplied — that they can save themselves under the layout above. Do not claim cross-session memory, and do not describe an exported record as saved.
