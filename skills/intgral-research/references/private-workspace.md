# Private merchant workspace

Use the user's configured `INTGRAL_WORKSPACE` directory or an explicitly selected persistent private workspace. This is an instruction convention, not an automatically created service or a new ERP setting.

Keep each merchant under a distinct stable identifier confirmed from the user/ERP, not an inferred display-name match. Within that merchant directory keep `preferences.md`, `rules.md` and task records. Read only this merchant's files. Keep this location outside the installed skill, plugin cache and public checkout so replacing or uninstalling a package cannot overwrite customer data.

If no private workspace is configured, ordinary read-only work can continue using the current request. Before promising persistence or creating a video task record, establish one writable private location with the user. Without filesystem capability, explain the limitation and provide an exportable record; do not claim cross-session memory.

Use the bundled [preferences template](../assets/preferences.example.md) only when creating a missing file. Never replace an existing preference file with the template.

## Applying and changing rules

Current user choices control this task; backend facts, permissions and validation remain authoritative. Local brand wording does not establish product facts or authorize external actions.

Only an explicit lasting instruction updates preferences or rules. One-off edits affect the current task only. When persistence intent matters and is ambiguous, ask once. A lasting change does not retroactively change an approved backend snapshot.

Before a change, re-read the current file, preserve unrelated edits, and keep a dated backup outside the package. Explain conflicts with existing rules; use the user's explicit resolution. Write the minimum change, then read it back and report the actual scope. If the file changed during editing, merge or ask about the conflicting part rather than overwriting it. Never claim to remember a failed write.

Store resumable task identities and exact uncertain requests privately. Research evidence and report revisions stay in ERP; local notes point to them. Keep credentials in the host's connection configuration, not preference or task files.
