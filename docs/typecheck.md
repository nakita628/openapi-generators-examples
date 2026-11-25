# Typecheck

One `tsc -p` per app × document (`bun scripts/typecheck.ts`), over the generated `src/` with the app's
tsconfig. There is no CI: `scripts/generate.ts` and `scripts/typecheck.ts` record each result in
[results.json](./results.json), and `bun scripts/results.ts write` writes this file from it.

274 outputs of 11 documents: 241 with no errors, 31 with errors, 2 not checked; 1 attempts failed.

Generators (outputs): asphodelos@0.3.1 (3), asphodelos@0.5.1 (3), asphodelos@0.5.6 (4), openapi-to-trpc@0.3.0 (9), openapi-to-trpc@0.3.1 (15), openapi-to-trpc@0.4.0 (20), takibi-hono@0.10.2 (84), takibi-hono@0.11.1 (70), wakusei@0.1.0 (36), wakusei@0.1.1 (30).

## Errors

| Document | App | Errors | Where | Codes | Cause |
| --- | --- | --- | --- | --- | --- |
| [discord](../openapi/discord.json) | hono-define-handler-effect | 8 | `src/routes.ts` | TS2304 ×6, TS7006 ×2 | nakita628/takibi-hono#96 |
| [discord](../openapi/discord.json) | hono-effect | 8 | `src/components/index.ts` | TS2304 ×6, TS7006 ×2 | nakita628/takibi-hono#96 |
| [discord](../openapi/discord.json) | hono-openapi-effect | 8 | `src/components/index.ts` | TS2304 ×6, TS7006 ×2 | nakita628/takibi-hono#96 |
| [openai](../openapi/openai.yaml) | hono-define-handler-effect | 5097 | `src/routes.ts` | TS2304 ×3738, TS7006 ×1246, TS2345 ×111, TS2322 ×2 | nakita628/takibi-hono#96 |
| [openai](../openapi/openai.yaml) | hono-effect | 5017 | `src/components/index.ts`, `src/handlers/*` | TS2304 ×3738, TS7006 ×1246, TS2345 ×31, TS2322 ×2 | nakita628/takibi-hono#96 |
| [openai](../openapi/openai.yaml) | hono-openapi-effect | 5104 | `src/components/index.ts`, `src/handlers/*` | TS2304 ×3738, TS7006 ×1246, TS2345 ×118, TS2322 ×2 | nakita628/takibi-hono#96 |
| [spotify](../openapi/spotify.yaml) | hono-define-handler-effect | 164 | `src/routes.ts` | TS2304 ×120, TS7006 ×40, TS2345 ×4 | nakita628/takibi-hono#96 |
| [spotify](../openapi/spotify.yaml) | hono-effect | 156 | `src/components/index.ts` | TS2304 ×117, TS7006 ×39 | nakita628/takibi-hono#96 |
| [spotify](../openapi/spotify.yaml) | hono-openapi-effect | 160 | `src/components/index.ts` | TS2304 ×117, TS7006 ×39, TS2345 ×4 | nakita628/takibi-hono#96 |
| [stripe](../openapi/stripe.json) | hono-arktype | 23572 | `src/components/index.ts` | TS2345 ×23572 | nakita628/truth (not filed yet): arktype writes `type(...).or("Alias")` for a length-narrowed string and a $ref inside a cycle, and the alias is unresolvable |
| [stripe](../openapi/stripe.json) | hono-define-handler-effect | 86 | `src/routes.ts` | TS2322 ×86 | nakita628/truth (not filed yet): the helper type of a recursive declaration drops `\| null` for a nullable enum, anyOf, oneOf or allOf |
| [stripe](../openapi/stripe.json) | hono-define-handler-valibot | 86 | `src/routes.ts` | TS2322 ×86 | nakita628/truth (not filed yet): the helper type of a recursive declaration drops `\| null` for a nullable enum, anyOf, oneOf or allOf |
| [stripe](../openapi/stripe.json) | hono-effect | 86 | `src/components/index.ts` | TS2322 ×86 | nakita628/truth (not filed yet): the helper type of a recursive declaration drops `\| null` for a nullable enum, anyOf, oneOf or allOf |
| [stripe](../openapi/stripe.json) | hono-openapi-arktype | 23572 | `src/components/index.ts` | TS2345 ×23572 | nakita628/truth (not filed yet): arktype writes `type(...).or("Alias")` for a length-narrowed string and a $ref inside a cycle, and the alias is unresolvable |
| [stripe](../openapi/stripe.json) | hono-openapi-effect | 86 | `src/components/index.ts` | TS2322 ×86 | nakita628/truth (not filed yet): the helper type of a recursive declaration drops `\| null` for a nullable enum, anyOf, oneOf or allOf |
| [stripe](../openapi/stripe.json) | hono-openapi-valibot | 86 | `src/components/index.ts` | TS2322 ×86 | nakita628/truth (not filed yet): the helper type of a recursive declaration drops `\| null` for a nullable enum, anyOf, oneOf or allOf |
| [stripe](../openapi/stripe.json) | hono-openapi-zod | 86 | `src/components/index.ts` | TS2322 ×86 | nakita628/truth (not filed yet): the helper type of a recursive declaration drops `\| null` for a nullable enum, anyOf, oneOf or allOf |
| [stripe](../openapi/stripe.json) | hono-valibot | 86 | `src/components/index.ts` | TS2322 ×86 | nakita628/truth (not filed yet): the helper type of a recursive declaration drops `\| null` for a nullable enum, anyOf, oneOf or allOf |
| [stripe](../openapi/stripe.json) | hono-zod | 86 | `src/components/index.ts` | TS2322 ×86 | nakita628/truth (not filed yet): the helper type of a recursive declaration drops `\| null` for a nullable enum, anyOf, oneOf or allOf |
| [stripe](../openapi/stripe.json) | openapi-to-trpc-arktype | 23572 | `src/components/index.ts` | TS2345 ×23572 | nakita628/truth (not filed yet): arktype writes `type(...).or("Alias")` for a length-narrowed string and a $ref inside a cycle, and the alias is unresolvable |
| [stripe](../openapi/stripe.json) | openapi-to-trpc-effect | 86 | `src/components/index.ts` | TS2322 ×86 | nakita628/truth (not filed yet): the helper type of a recursive declaration drops `\| null` for a nullable enum, anyOf, oneOf or allOf |
| [stripe](../openapi/stripe.json) | openapi-to-trpc-valibot | 86 | `src/components/index.ts` | TS2322 ×86 | nakita628/truth (not filed yet): the helper type of a recursive declaration drops `\| null` for a nullable enum, anyOf, oneOf or allOf |
| [stripe](../openapi/stripe.json) | openapi-to-trpc-zod | 86 | `src/components/index.ts` | TS2322 ×86 | nakita628/truth (not filed yet): the helper type of a recursive declaration drops `\| null` for a nullable enum, anyOf, oneOf or allOf |
| [stripe](../openapi/stripe.json) | wakusei-contract-arktype | 23572 | `src/components/index.ts` | TS2345 ×23572 | nakita628/truth (not filed yet): arktype writes `type(...).or("Alias")` for a length-narrowed string and a $ref inside a cycle, and the alias is unresolvable |
| [stripe](../openapi/stripe.json) | wakusei-contract-valibot | 86 | `src/components/index.ts` | TS2322 ×86 | nakita628/truth (not filed yet): the helper type of a recursive declaration drops `\| null` for a nullable enum, anyOf, oneOf or allOf |
| [stripe](../openapi/stripe.json) | wakusei-contract-zod | 86 | `src/components/index.ts` | TS2322 ×86 | nakita628/truth (not filed yet): the helper type of a recursive declaration drops `\| null` for a nullable enum, anyOf, oneOf or allOf |
| [stripe](../openapi/stripe.json) | wakusei-server-arktype | 23572 | `src/components/index.ts` | TS2345 ×23572 | nakita628/truth (not filed yet): arktype writes `type(...).or("Alias")` for a length-narrowed string and a $ref inside a cycle, and the alias is unresolvable |
| [stripe](../openapi/stripe.json) | wakusei-server-valibot | 86 | `src/components/index.ts` | TS2322 ×86 | nakita628/truth (not filed yet): the helper type of a recursive declaration drops `\| null` for a nullable enum, anyOf, oneOf or allOf |
| [stripe](../openapi/stripe.json) | wakusei-server-zod | 86 | `src/components/index.ts` | TS2322 ×86 | nakita628/truth (not filed yet): the helper type of a recursive declaration drops `\| null` for a nullable enum, anyOf, oneOf or allOf |
| [train-travel](../openapi/train-travel.json) | hono-define-handler-effect | 36 | `src/routes.ts` | TS2304 ×27, TS7006 ×9 | nakita628/takibi-hono#96 |
| [train-travel](../openapi/train-travel.json) | hono-openapi-effect | 76 | `src/handlers/*` | TS2304 ×57, TS7006 ×19 | nakita628/takibi-hono#96 |

## Not generated

The last attempt failed; an older output, if there is one, is kept.

| Document | App | Generator | Error | Cause |
| --- | --- | --- | --- | --- |
| [stripe](../openapi/stripe.json) | elysia-typebox | asphodelos@0.5.6 | Expected `,` or `}` but found `.` | nakita628/asphodelos#65 |

## Not checked

| Document | App | Reason |
| --- | --- | --- |
| [stripe](../openapi/stripe.json) | hono-define-handler-arktype | killed, likely out of memory (16 GB) |
| [stripe](../openapi/stripe.json) | hono-define-handler-zod | killed, likely out of memory (16 GB) |

## No errors

- [discord](../openapi/discord.json): elysia-typebox, hono-arktype, hono-define-handler-arktype, hono-define-handler-valibot, hono-define-handler-zod, hono-openapi-arktype, hono-openapi-typebox, hono-openapi-valibot, hono-openapi-zod, hono-typebox, hono-valibot, hono-zod, openapi-to-trpc-arktype, openapi-to-trpc-effect, openapi-to-trpc-valibot, openapi-to-trpc-zod, wakusei-contract-arktype, wakusei-contract-valibot, wakusei-contract-zod, wakusei-server-arktype, wakusei-server-valibot, wakusei-server-zod
- [line-channel-access-token](../openapi/line-channel-access-token.yaml): elysia-typebox, hono-arktype, hono-define-handler-arktype, hono-define-handler-effect, hono-define-handler-valibot, hono-define-handler-zod, hono-effect, hono-openapi-arktype, hono-openapi-effect, hono-openapi-typebox, hono-openapi-valibot, hono-openapi-zod, hono-typebox, hono-valibot, hono-zod, openapi-to-trpc-arktype, openapi-to-trpc-effect, openapi-to-trpc-valibot, openapi-to-trpc-zod, wakusei-contract-arktype, wakusei-contract-valibot, wakusei-contract-zod, wakusei-server-arktype, wakusei-server-valibot, wakusei-server-zod
- [line-insight](../openapi/line-insight.yaml): elysia-typebox, hono-arktype, hono-define-handler-arktype, hono-define-handler-effect, hono-define-handler-valibot, hono-define-handler-zod, hono-effect, hono-openapi-arktype, hono-openapi-effect, hono-openapi-typebox, hono-openapi-valibot, hono-openapi-zod, hono-typebox, hono-valibot, hono-zod, openapi-to-trpc-arktype, openapi-to-trpc-effect, openapi-to-trpc-valibot, openapi-to-trpc-zod, wakusei-contract-arktype, wakusei-contract-valibot, wakusei-contract-zod, wakusei-server-arktype, wakusei-server-valibot, wakusei-server-zod
- [line-liff](../openapi/line-liff.yaml): elysia-typebox, hono-arktype, hono-define-handler-arktype, hono-define-handler-effect, hono-define-handler-valibot, hono-define-handler-zod, hono-effect, hono-openapi-arktype, hono-openapi-effect, hono-openapi-typebox, hono-openapi-valibot, hono-openapi-zod, hono-typebox, hono-valibot, hono-zod, openapi-to-trpc-arktype, openapi-to-trpc-effect, openapi-to-trpc-valibot, openapi-to-trpc-zod, wakusei-contract-arktype, wakusei-contract-valibot, wakusei-contract-zod, wakusei-server-arktype, wakusei-server-valibot, wakusei-server-zod
- [line-manage-audience](../openapi/line-manage-audience.yaml): elysia-typebox, hono-arktype, hono-define-handler-arktype, hono-define-handler-effect, hono-define-handler-valibot, hono-define-handler-zod, hono-effect, hono-openapi-arktype, hono-openapi-effect, hono-openapi-typebox, hono-openapi-valibot, hono-openapi-zod, hono-typebox, hono-valibot, hono-zod, openapi-to-trpc-arktype, openapi-to-trpc-effect, openapi-to-trpc-valibot, openapi-to-trpc-zod, wakusei-contract-arktype, wakusei-contract-valibot, wakusei-contract-zod, wakusei-server-arktype, wakusei-server-valibot, wakusei-server-zod
- [openai](../openapi/openai.yaml): elysia-typebox, hono-arktype, hono-define-handler-arktype, hono-define-handler-valibot, hono-define-handler-zod, hono-openapi-arktype, hono-openapi-typebox, hono-openapi-valibot, hono-openapi-zod, hono-typebox, hono-valibot, hono-zod, openapi-to-trpc-arktype, openapi-to-trpc-effect, openapi-to-trpc-valibot, openapi-to-trpc-zod, wakusei-contract-arktype, wakusei-contract-valibot, wakusei-contract-zod, wakusei-server-arktype, wakusei-server-valibot, wakusei-server-zod
- [petstore](../openapi/petstore.json): elysia-typebox, hono-arktype, hono-define-handler-arktype, hono-define-handler-effect, hono-define-handler-valibot, hono-define-handler-zod, hono-effect, hono-openapi-arktype, hono-openapi-effect, hono-openapi-typebox, hono-openapi-valibot, hono-openapi-zod, hono-typebox, hono-valibot, hono-zod, openapi-to-trpc-arktype, openapi-to-trpc-effect, openapi-to-trpc-valibot, openapi-to-trpc-zod, wakusei-contract-arktype, wakusei-contract-valibot, wakusei-contract-zod, wakusei-server-arktype, wakusei-server-valibot, wakusei-server-zod
- [spotify](../openapi/spotify.yaml): elysia-typebox, hono-arktype, hono-define-handler-arktype, hono-define-handler-valibot, hono-define-handler-zod, hono-openapi-arktype, hono-openapi-typebox, hono-openapi-valibot, hono-openapi-zod, hono-typebox, hono-valibot, hono-zod, openapi-to-trpc-arktype, openapi-to-trpc-effect, openapi-to-trpc-valibot, openapi-to-trpc-zod, wakusei-contract-arktype, wakusei-contract-valibot, wakusei-contract-zod, wakusei-server-arktype, wakusei-server-valibot, wakusei-server-zod
- [stripe](../openapi/stripe.json): hono-openapi-typebox, hono-typebox
- [train-travel](../openapi/train-travel.json): elysia-typebox, hono-arktype, hono-define-handler-arktype, hono-define-handler-valibot, hono-define-handler-zod, hono-effect, hono-openapi-arktype, hono-openapi-typebox, hono-openapi-valibot, hono-openapi-zod, hono-typebox, hono-valibot, hono-zod, openapi-to-trpc-arktype, openapi-to-trpc-effect, openapi-to-trpc-valibot, openapi-to-trpc-zod, wakusei-contract-arktype, wakusei-contract-valibot, wakusei-contract-zod, wakusei-server-arktype, wakusei-server-valibot, wakusei-server-zod
- [twilio](../openapi/twilio.json): elysia-typebox, hono-arktype, hono-define-handler-arktype, hono-define-handler-effect, hono-define-handler-valibot, hono-define-handler-zod, hono-effect, hono-openapi-arktype, hono-openapi-effect, hono-openapi-typebox, hono-openapi-valibot, hono-openapi-zod, hono-typebox, hono-valibot, hono-zod, openapi-to-trpc-arktype, openapi-to-trpc-effect, openapi-to-trpc-valibot, openapi-to-trpc-zod, wakusei-contract-arktype, wakusei-contract-valibot, wakusei-contract-zod, wakusei-server-arktype, wakusei-server-valibot, wakusei-server-zod
