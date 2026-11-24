# Candidates

Backlog for the [daily routine](./daily-routine.md). [openapi/sources.json](../openapi/sources.json) is the
source of truth for what has been added; this file only holds what to take first and what has been ruled out.

The documents come from the README of [hono-takibi-examples](https://github.com/nakita628/hono-takibi-examples),
in its order: the well-known OpenAPI 3.x documents hono-takibi is checked against (the first five here came
from there too), so one document can be compared across the generators. `bun scripts/sources.ts next 3` prints
the next three as `<name>\t<url>`: Pending first, then the README rows, skipping the documents already in
openapi/sources.json and every name or URL listed under Rejected.

## Pending

Taken before the README rows. One line per document: `- name | URL | note`.

## Rejected

Do not try these again. One line per document: `- name | URL | reason`.

- cloudflare | https://raw.githubusercontent.com/cloudflare/api-schemas/main/openapi.json | 28.3 MB, over the 25 MB limit of scripts/sources.ts (probe exit 5, 2026-11-23)
- github | https://raw.githubusercontent.com/github/rest-api-description/main/descriptions/api.github.com/api.github.com.json | examples hold token-like strings (`ghp_…`, `gho_…`, `ghs_…`, `github_pat_…`, an RSA private key header) that push protection may block; probe exit 0, 13.61 MB (2026-11-24)
