# Compatibility

## Host

Required: a client that can load local Agent Skills, read their packaged references and call authenticated MCP tools. Generic directory installation is portable; actual discovery and UI support must be verified per client.

Persistent private preferences need a writable filesystem location outside the install/cache. A host without filesystem access can use an exportable in-chat record but must not claim cross-session persistence. Video image generation, image inspection, video playback and local processing each require actual host capabilities.

## Gateway and ERP

| Package | Capabilities to discover |
| --- | --- |
| listing | Product/listing reads and edits appropriate to the requested fields; import, image and operation tools only for the corresponding task |
| research | Admin endpoint discovery/read/write for research scopes, plans, acquisitions and artifacts |
| video | Admin endpoint discovery/read/write for video generations, reviews, approval, recovery and product video assets |

Tool names in the skills are the logical MCP names. Hosts may display a connector prefix; use the matching connected tool, not a fabricated alias.

Schemas and permissions from the connected deployment govern every request. The public packages do not install modules, enable routes, create accounts or alter the ERP. Missing capabilities leave their dependent stage pending.

Research acquisition examples reflect an ES-limited development baseline; they are not generic marketplace defaults. Another market must be supported by the live deployment. Research schema examples use fictional identities and are never evidence.

Video reference-image support requires a deployment that exposes that mode. Voice-over/dialogue is not supported by the documented video contract. Subtitle preferences are recorded separately from processing capability. Published content does not mean unmerged backend PRs have been deployed.

## Revisions

Repository version 0.1.0 identifies this distribution candidate. New research reports declare runbook `intgral-research@1`, per-function method revisions (`intgral-research/<function>@2` since the worked examples and clarifications of INT-725; `@1` reports keep their identity) and existing report template/schema revisions (`<report_kind>@1` and `<report_kind>/1`). New video tasks declare `intgral-video@1` when supported. Those content identities are not backend deployment versions; historical records retain their original identities.

## Scope of verification

See [validation evidence](validation.md). Package and scenario validation do not establish live ERP behavior, a paid video result or universal host support. End-to-end service acceptance is deliberately separate from building this repository.
