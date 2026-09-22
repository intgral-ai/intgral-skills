# Resume known work; reconcile unknown submissions

Start a new session by reading the private task record and the existing generation. Backend records are authoritative for status, asset versions, approval hash and spend. Local notes help find identities but do not prove a write succeeded.

| Observed state | Action |
| --- | --- |
| queued or running | Continue reading the same generation; do not recreate or resume active work |
| running with a registered pause | Read until the worker reaches the pause; a held lease can cause resume to conflict |
| paused for cost | Show actual reason, spent/held usage and cap; resume with a higher cap only after explicit authorization |
| paused because the provider refused the account balance | Nothing was submitted or charged; report it to the user or operator, and after the balance is restored resume the same work — this is not a new paid attempt |
| price or provider configuration unavailable | Report the deployment limitation; do not ask for provider keys or bypass Intgral |
| failed with retry_action=resume after a provider rate limit | The backend already retried with backoff; the segment is still queued, nothing was charged; wait, then use the catalogued resume endpoint — not a new attempt |
| failed with retry_action=resume | Read stage and attempts, confirm this resumes known work within the existing authorization, then use the catalogued resume endpoint |
| failed with retry_action=new_attempt or submission_unknown | Explain that provider acceptance/charges may be unknown; a new paid attempt needs the user's explicit authorization |
| failed with retry_action=new_attempt and no provider task ID | The provider rejected the request before creating work; show the returned message, correct the plan, and let the user decide whether to authorize a new attempt |
| failed with retry_action=null | Report the supported limitation; preserve already stored assets and do not repeat an ineffective resume. Segments that cannot be composed because their stored specifications differ stay as product media; a whole video needs a new generation with matching keyframe ratios |
| completed but visually unsuitable | Record the issue if authorized; a new generation is a separately approved paid plan |

Use `segments[].attempts`, provider task IDs and returned error details. Rate limits, refused balance and missing configuration must be supported by backend evidence; an error string alone is not proof of zero charges. Cite the attempts list when reporting how many paid attempts a segment has had.

A downloading/storing failure does not justify paying to regenerate a known provider result. When the provider result can no longer be recovered — a provider record older than its retention window, or a resume that the backend refuses for that reason — explain the loss and obtain authorization before a new attempt. For an ambiguous draft creation, preserve its idempotency key and exact input; never generate a fresh key just to escape uncertainty. Concurrent workers, restarts and lease expiry are handled by the backend; a late provider result is still traceable by its task ID, so a long wait is never a reason to create another generation.

For local preprocessing failures, preserve source media and task notes. Never promise refunds, cancellation of already submitted work, or progress checks that were not performed.
