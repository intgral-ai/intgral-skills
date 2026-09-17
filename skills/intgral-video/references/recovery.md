# Resume known work; reconcile unknown submissions

Start a new session by reading the private task record and the existing generation. Backend records are authoritative for status, asset versions, approval hash and spend. Local notes help find identities but do not prove a write succeeded.

| Observed state | Action |
| --- | --- |
| queued or running | Continue reading the same generation; do not recreate or resume active work |
| running with a registered pause | Read until the worker reaches the pause; a held lease can cause resume to conflict |
| paused for cost | Show actual reason, spent/held usage and cap; resume with a higher cap only after explicit authorization |
| price or provider configuration unavailable | Report the deployment limitation; do not ask for provider keys or bypass Intgral |
| failed with retry_action=resume | Read stage and attempts, confirm this resumes known work within the existing authorization, then use the catalogued resume endpoint |
| failed with retry_action=new_attempt or submission_unknown | Explain that provider acceptance/charges may be unknown; a new paid attempt needs the user's explicit authorization |
| failed with retry_action=null | Report the supported limitation; preserve already stored assets and do not repeat an ineffective resume |
| completed but visually unsuitable | Record the issue if authorized; a new generation is a separately approved paid plan |

Use `segments[].attempts`, provider task IDs and returned error details. Rate limits, refused balance and missing configuration must be supported by backend evidence; an error string alone is not proof of zero charges.

A downloading/storing failure does not justify paying to regenerate a known provider result. When the provider result can no longer be recovered, explain the loss and obtain authorization before a new attempt. For an ambiguous draft creation, preserve its idempotency key and exact input; never generate a fresh key just to escape uncertainty.

For local preprocessing failures, preserve source media and task notes. Never promise refunds, cancellation of already submitted work, or progress checks that were not performed.
