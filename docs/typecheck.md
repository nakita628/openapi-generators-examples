# Typecheck

One `tsc -p` per app × document (`bun scripts/typecheck.ts`), over the generated `src/` with the app's
tsconfig. There is no CI: `scripts/generate.ts` and `scripts/typecheck.ts` record each result in
[results.json](./results.json), and `bun scripts/results.ts write` writes this file from it.

200 outputs of 8 documents: 188 with no errors, 12 with errors, 0 not checked; 0 attempts failed.

Generators (outputs): asphodelos@0.3.1 (3), asphodelos@0.5.1 (5), openapi-to-trpc@0.3.0 (11), openapi-to-trpc@0.3.1 (21), takibi-hono@0.10.2 (112), wakusei@0.1.0 (48).

## Errors

| Document | App | Errors | Where | Codes | Cause |
| --- | --- | --- | --- | --- | --- |
| [discord](../openapi/discord.json) | hono-define-handler-effect | 8 | `src/routes.ts` | TS2304 ×6, TS7006 ×2 | nakita628/takibi-hono#96 |
| [discord](../openapi/discord.json) | hono-effect | 8 | `src/components/index.ts` | TS2304 ×6, TS7006 ×2 | nakita628/takibi-hono#96 |
| [discord](../openapi/discord.json) | hono-openapi-effect | 8 | `src/components/index.ts` | TS2304 ×6, TS7006 ×2 | nakita628/takibi-hono#96 |
| [openai](../openapi/openai.yaml) | elysia-typebox | 284 | `src/hooks/*` | TS2339 ×268, TS7053 ×16 | nakita628/asphodelos#39 |
| [openai](../openapi/openai.yaml) | hono-define-handler-effect | 5097 | `src/routes.ts` | TS2304 ×3738, TS7006 ×1246, TS2345 ×111, TS2322 ×2 | nakita628/takibi-hono#96 |
| [openai](../openapi/openai.yaml) | hono-effect | 5017 | `src/components/index.ts`, `src/handlers/*` | TS2304 ×3738, TS7006 ×1246, TS2345 ×31, TS2322 ×2 | nakita628/takibi-hono#96 |
| [openai](../openapi/openai.yaml) | hono-openapi-effect | 5104 | `src/components/index.ts`, `src/handlers/*` | TS2304 ×3738, TS7006 ×1246, TS2345 ×118, TS2322 ×2 | nakita628/takibi-hono#96 |
| [spotify](../openapi/spotify.yaml) | hono-define-handler-effect | 164 | `src/routes.ts` | TS2304 ×120, TS7006 ×40, TS2345 ×4 | nakita628/takibi-hono#96 |
| [spotify](../openapi/spotify.yaml) | hono-effect | 156 | `src/components/index.ts` | TS2304 ×117, TS7006 ×39 | nakita628/takibi-hono#96 |
| [spotify](../openapi/spotify.yaml) | hono-openapi-effect | 160 | `src/components/index.ts` | TS2304 ×117, TS7006 ×39, TS2345 ×4 | nakita628/takibi-hono#96 |
| [train-travel](../openapi/train-travel.json) | hono-define-handler-effect | 36 | `src/routes.ts` | TS2304 ×27, TS7006 ×9 | nakita628/takibi-hono#96 |
| [train-travel](../openapi/train-travel.json) | hono-openapi-effect | 76 | `src/handlers/*` | TS2304 ×57, TS7006 ×19 | nakita628/takibi-hono#96 |

## No errors

- [discord](../openapi/discord.json): elysia-typebox, hono-arktype, hono-define-handler-arktype, hono-define-handler-valibot, hono-define-handler-zod, hono-openapi-arktype, hono-openapi-typebox, hono-openapi-valibot, hono-openapi-zod, hono-typebox, hono-valibot, hono-zod, openapi-to-trpc-arktype, openapi-to-trpc-effect, openapi-to-trpc-valibot, openapi-to-trpc-zod, wakusei-contract-arktype, wakusei-contract-valibot, wakusei-contract-zod, wakusei-server-arktype, wakusei-server-valibot, wakusei-server-zod
- [line-channel-access-token](../openapi/line-channel-access-token.yaml): elysia-typebox, hono-arktype, hono-define-handler-arktype, hono-define-handler-effect, hono-define-handler-valibot, hono-define-handler-zod, hono-effect, hono-openapi-arktype, hono-openapi-effect, hono-openapi-typebox, hono-openapi-valibot, hono-openapi-zod, hono-typebox, hono-valibot, hono-zod, openapi-to-trpc-arktype, openapi-to-trpc-effect, openapi-to-trpc-valibot, openapi-to-trpc-zod, wakusei-contract-arktype, wakusei-contract-valibot, wakusei-contract-zod, wakusei-server-arktype, wakusei-server-valibot, wakusei-server-zod
- [line-insight](../openapi/line-insight.yaml): elysia-typebox, hono-arktype, hono-define-handler-arktype, hono-define-handler-effect, hono-define-handler-valibot, hono-define-handler-zod, hono-effect, hono-openapi-arktype, hono-openapi-effect, hono-openapi-typebox, hono-openapi-valibot, hono-openapi-zod, hono-typebox, hono-valibot, hono-zod, openapi-to-trpc-arktype, openapi-to-trpc-effect, openapi-to-trpc-valibot, openapi-to-trpc-zod, wakusei-contract-arktype, wakusei-contract-valibot, wakusei-contract-zod, wakusei-server-arktype, wakusei-server-valibot, wakusei-server-zod
- [openai](../openapi/openai.yaml): hono-arktype, hono-define-handler-arktype, hono-define-handler-valibot, hono-define-handler-zod, hono-openapi-arktype, hono-openapi-typebox, hono-openapi-valibot, hono-openapi-zod, hono-typebox, hono-valibot, hono-zod, openapi-to-trpc-arktype, openapi-to-trpc-effect, openapi-to-trpc-valibot, openapi-to-trpc-zod, wakusei-contract-arktype, wakusei-contract-valibot, wakusei-contract-zod, wakusei-server-arktype, wakusei-server-valibot, wakusei-server-zod
- [petstore](../openapi/petstore.json): elysia-typebox, hono-arktype, hono-define-handler-arktype, hono-define-handler-effect, hono-define-handler-valibot, hono-define-handler-zod, hono-effect, hono-openapi-arktype, hono-openapi-effect, hono-openapi-typebox, hono-openapi-valibot, hono-openapi-zod, hono-typebox, hono-valibot, hono-zod, openapi-to-trpc-arktype, openapi-to-trpc-effect, openapi-to-trpc-valibot, openapi-to-trpc-zod, wakusei-contract-arktype, wakusei-contract-valibot, wakusei-contract-zod, wakusei-server-arktype, wakusei-server-valibot, wakusei-server-zod
- [spotify](../openapi/spotify.yaml): elysia-typebox, hono-arktype, hono-define-handler-arktype, hono-define-handler-valibot, hono-define-handler-zod, hono-openapi-arktype, hono-openapi-typebox, hono-openapi-valibot, hono-openapi-zod, hono-typebox, hono-valibot, hono-zod, openapi-to-trpc-arktype, openapi-to-trpc-effect, openapi-to-trpc-valibot, openapi-to-trpc-zod, wakusei-contract-arktype, wakusei-contract-valibot, wakusei-contract-zod, wakusei-server-arktype, wakusei-server-valibot, wakusei-server-zod
- [train-travel](../openapi/train-travel.json): elysia-typebox, hono-arktype, hono-define-handler-arktype, hono-define-handler-valibot, hono-define-handler-zod, hono-effect, hono-openapi-arktype, hono-openapi-typebox, hono-openapi-valibot, hono-openapi-zod, hono-typebox, hono-valibot, hono-zod, openapi-to-trpc-arktype, openapi-to-trpc-effect, openapi-to-trpc-valibot, openapi-to-trpc-zod, wakusei-contract-arktype, wakusei-contract-valibot, wakusei-contract-zod, wakusei-server-arktype, wakusei-server-valibot, wakusei-server-zod
- [twilio](../openapi/twilio.json): elysia-typebox, hono-arktype, hono-define-handler-arktype, hono-define-handler-effect, hono-define-handler-valibot, hono-define-handler-zod, hono-effect, hono-openapi-arktype, hono-openapi-effect, hono-openapi-typebox, hono-openapi-valibot, hono-openapi-zod, hono-typebox, hono-valibot, hono-zod, openapi-to-trpc-arktype, openapi-to-trpc-effect, openapi-to-trpc-valibot, openapi-to-trpc-zod, wakusei-contract-arktype, wakusei-contract-valibot, wakusei-contract-zod, wakusei-server-arktype, wakusei-server-valibot, wakusei-server-zod
