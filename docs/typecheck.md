# Typecheck

One `tsc -p` per app × document (`bun scripts/typecheck.ts`), over the generated `src/` with the app's
tsconfig. There is no CI: `scripts/generate.ts` and `scripts/typecheck.ts` record each result in
[results.json](./results.json), and `bun scripts/results.ts write` writes this file from it.

55 outputs of 5 documents: 42 with no errors, 13 with errors, 0 not checked; 0 attempts failed.

Generators (outputs): asphodelos@0.3.1 (5), openapi-to-trpc@0.3.0 (20), wakusei@0.1.0 (30).

## Errors

| Document | App | Errors | Where | Codes | Cause |
| --- | --- | --- | --- | --- | --- |
| [discord](../openapi/discord.json) | elysia-typebox | 7 | `src/hooks/*` | TS2305 ×7 | nakita628/asphodelos#38 |
| [discord](../openapi/discord.json) | openapi-to-trpc-arktype | 1 | `src/components/index.ts` | TS2589 ×1 | nakita628/openapi-to-trpc#54 |
| [discord](../openapi/discord.json) | openapi-to-trpc-effect | 27 | `src/components/index.ts`, `src/routes/*` | TS7006 ×18, TS2304 ×9 | nakita628/openapi-to-trpc#54 |
| [openai](../openapi/openai.yaml) | elysia-typebox | 291 | `src/hooks/*` | TS2339 ×268, TS7053 ×16, TS2305 ×7 | nakita628/asphodelos#39, nakita628/asphodelos#38 |
| [openai](../openapi/openai.yaml) | openapi-to-trpc-arktype | 8 | `src/components/index.ts` | TS2589 ×8 | nakita628/openapi-to-trpc#54, then nakita628/truth#59, nakita628/truth#58 |
| [openai](../openapi/openai.yaml) | openapi-to-trpc-effect | 1661 | `src/components/index.ts`, `src/routes/*` | TS2304 ×1305, TS7006 ×186, TS2345 ×144, TS2322 ×18, TS2339 ×8 | nakita628/openapi-to-trpc#54, then nakita628/truth#60 |
| [openai](../openapi/openai.yaml) | openapi-to-trpc-valibot | 2 | `src/components/index.ts` | TS2322 ×2 | nakita628/openapi-to-trpc#54 |
| [openai](../openapi/openai.yaml) | openapi-to-trpc-zod | 2 | `src/components/index.ts` | TS2345 ×2 | nakita628/openapi-to-trpc#54 |
| [openai](../openapi/openai.yaml) | wakusei-contract-arktype | 5 | `src/components/index.ts` | TS2322 ×4, TS2589 ×1 | nakita628/truth#59, nakita628/truth#58 |
| [openai](../openapi/openai.yaml) | wakusei-server-arktype | 5 | `src/components/index.ts` | TS2322 ×4, TS2589 ×1 | nakita628/truth#59, nakita628/truth#58 |
| [petstore](../openapi/petstore.json) | openapi-to-trpc-effect | 41 | `src/routes/*`, `src/components/index.ts` | TS7006 ×26, TS2304 ×14, TS2345 ×1 | nakita628/openapi-to-trpc#54 |
| [spotify](../openapi/spotify.yaml) | openapi-to-trpc-effect | 54 | `src/routes/*`, `src/components/index.ts` | TS2304 ×48, TS7006 ×6 | nakita628/openapi-to-trpc#54 |
| [train-travel](../openapi/train-travel.json) | openapi-to-trpc-effect | 15 | `src/routes/*`, `src/components/index.ts` | TS7006 ×8, TS2304 ×6, TS2345 ×1 | nakita628/openapi-to-trpc#54 |

## No errors

- [discord](../openapi/discord.json): openapi-to-trpc-valibot, openapi-to-trpc-zod, wakusei-contract-arktype, wakusei-contract-valibot, wakusei-contract-zod, wakusei-server-arktype, wakusei-server-valibot, wakusei-server-zod
- [openai](../openapi/openai.yaml): wakusei-contract-valibot, wakusei-contract-zod, wakusei-server-valibot, wakusei-server-zod
- [petstore](../openapi/petstore.json): elysia-typebox, openapi-to-trpc-arktype, openapi-to-trpc-valibot, openapi-to-trpc-zod, wakusei-contract-arktype, wakusei-contract-valibot, wakusei-contract-zod, wakusei-server-arktype, wakusei-server-valibot, wakusei-server-zod
- [spotify](../openapi/spotify.yaml): elysia-typebox, openapi-to-trpc-arktype, openapi-to-trpc-valibot, openapi-to-trpc-zod, wakusei-contract-arktype, wakusei-contract-valibot, wakusei-contract-zod, wakusei-server-arktype, wakusei-server-valibot, wakusei-server-zod
- [train-travel](../openapi/train-travel.json): elysia-typebox, openapi-to-trpc-arktype, openapi-to-trpc-valibot, openapi-to-trpc-zod, wakusei-contract-arktype, wakusei-contract-valibot, wakusei-contract-zod, wakusei-server-arktype, wakusei-server-valibot, wakusei-server-zod
