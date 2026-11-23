# openapi-generators-examples

Code generated from the same OpenAPI documents by four generators, one app per generator × mode × validator. Business logic is left out: the point is the generated code and whether it type-checks. The generators leave handler bodies empty, and an empty body returns `void`, which no typed handler accepts, so `scripts/generate.ts` fills each one with `throw new Error('Not implemented')` (its type, `never`, fits every handler).

New documents are added every day by the routine in [docs/daily-routine.md](./docs/daily-routine.md). The result of every app × document, with the cause of each failure, is in [docs/typecheck.md](./docs/typecheck.md).

| Generator | Target |
| --- | --- |
| [wakusei](https://github.com/nakita628/wakusei) | [oRPC](https://orpc.dev/) (contract / server mode) |
| [openapi-to-trpc](https://github.com/nakita628/openapi-to-trpc) | [tRPC](https://trpc.io/) |
| [takibi-hono](https://github.com/nakita628/takibi-hono) | [Hono](https://hono.dev/) (plain, [hono-openapi](https://hono.dev/examples/hono-openapi), [`defineHandler`](https://hono.dev/docs/helpers/factory#definehandler)) |
| [asphodelos](https://github.com/nakita628/asphodelos) | [Elysia](https://elysiajs.com/), with the [Eden Treaty](https://elysiajs.com/eden/treaty/overview.html) client and the hooks of seven client libraries |

## Layout

```text
openapi/                       the input documents (vendored, see Specs below)
openapi/sources.json           where each document comes from: URL, pinned commit, ETag, sha256
apps/<app>/<spec>/             one generation: <generator>.config.ts + src/
apps/<app>/package.json        the runtime dependencies of that app's generated code
apps/<app>/BUILD.bazel         typecheck() from tools/typecheck.bzl
scripts/apps.ts                the app matrix: generator, mode, validator and documents of each app
scripts/generate.ts            writes each config and runs the generator
scripts/typecheck.ts           tsc for each app × document
scripts/sources.ts             adds documents and notices the ones that changed upstream
scripts/results.ts             docs/results.json, and docs/typecheck.md written from it
docs/                          the daily routine, its candidates, and the results
```

### Apps

| Generator | Apps |
| --- | --- |
| wakusei | `wakusei-contract-{zod,valibot,arktype}`, `wakusei-server-{zod,valibot,arktype}` |
| openapi-to-trpc | `openapi-to-trpc-{zod,valibot,arktype,effect}` |
| takibi-hono | `hono-{zod,valibot,typebox,arktype,effect}` |
| takibi-hono (`openapi: true`) | `hono-openapi-{zod,valibot,typebox,arktype,effect}` |
| takibi-hono (`defineHandler`, Hono 5) | `hono-define-handler-{zod,valibot,arktype,effect}` |
| asphodelos | `elysia-typebox`: the app and modules, `src/lib/client.ts` (Eden Treaty) and `src/hooks/{swr,tanstack-query,preact-query,solid-query,vue-query,svelte-query,angular-query}.ts` |

### Specs

The first five came from hono-takibi-examples, and the daily routine takes the next ones from its README, in order ([docs/candidates.md](./docs/candidates.md)). The generators read local files only, so the documents are committed under `openapi/`. [openapi/sources.json](./openapi/sources.json) records where each one comes from, and `bun scripts/sources.ts check` lists the ones that changed upstream. The table is written by `bun scripts/results.ts write`.

<!-- specs:start -->
| Spec | Document | Source | Added |
| --- | --- | --- | --- |
| [discord](./openapi/discord.json) | Discord HTTP API (Preview) 10 | <https://raw.githubusercontent.com/discord/discord-api-spec/main/specs/openapi.json> ([pinned](https://github.com/discord/discord-api-spec/blob/3a21a01249a763cd47f1dfec3da91c5ba71bb974/specs/openapi.json)) | 2026-11-21 |
| [openai](./openapi/openai.yaml) | OpenAI API 2.3.0 | <https://raw.githubusercontent.com/openai/openai-openapi/main/openapi.yaml> ([pinned](https://github.com/openai/openai-openapi/blob/2a24deae6f89f84d0e88ce3c9d96c00304dca0b8/openapi.yaml)) | 2026-11-21 |
| [petstore](./openapi/petstore.json) | Swagger Petstore - OpenAPI 3.0 1.0.27 | <https://petstore3.swagger.io/api/v3/openapi.json> | 2026-11-21 |
| [spotify](./openapi/spotify.yaml) | Spotify Web API with fixes and improvements from sonallux 2026.5.31 | <https://raw.githubusercontent.com/sonallux/spotify-web-api/main/fixed-spotify-open-api.yml> ([pinned](https://github.com/sonallux/spotify-web-api/blob/f02c40936c591459617491c62fef0b555b8fd63e/fixed-spotify-open-api.yml)) | 2026-11-21 |
| [train-travel](./openapi/train-travel.json) | Train Travel API 1.0.0 | <https://raw.githubusercontent.com/readmeio/oas-examples/main/3.1/json/train-travel.json> ([pinned](https://github.com/readmeio/oas-examples/blob/060d4ffbbe63003f923c8cd7268ee39a495cf21f/3.1/json/train-travel.json)) | 2026-11-21 |
<!-- specs:end -->

## Commands

The repository is a [bun workspace](https://bun.com/docs/install/workspaces) (`apps/*`); bun installs, generates and type-checks.

```bash
bun install
bun run generate                      # every app × spec
bun scripts/generate.ts wakusei       # the apps whose name starts with it
bun scripts/generate.ts "" petstore   # one spec, every app
bun run typecheck                     # tsc in every app × spec, one at a time; recorded in docs/results.json
bun scripts/results.ts write          # docs/typecheck.md and the Specs table above
bun scripts/sources.ts check          # the documents that changed upstream
```

Under bun the generators run on bun as well (`bun --bun`), which is 2-3x faster than node for takibi-hono, wakusei and openapi-to-trpc and produces the same output. `node scripts/generate.ts` still works.

The type checks can also run as Bazel tests, `bun run test` (`bazel test //...`). Bazel ([bazelisk](https://github.com/bazelbuild/bazelisk) from the root devDependencies) reads `pnpm-lock.yaml` through [rules_js](https://github.com/aspect-build/rules_js), so a dependency change has to land in both lockfiles: `bun install` and `pnpm install --lockfile-only`. The catalog is likewise listed twice, in `package.json` (bun) and `pnpm-workspace.yaml` (pnpm). A new app needs its `package.json` in `MODULE.bazel`'s `data` list and its `node_modules` line in `.bazelignore`.

## Known issues

Problems found while generating are reported where the code lives: schema generation in [nakita628/truth](https://github.com/nakita628/truth/issues) (schema-truth / oas-truth, which wakusei, openapi-to-trpc and takibi-hono build on), everything else in the generator's own repository. [docs/typecheck.md](./docs/typecheck.md) lists every failing app × document with its cause.

| Issue | Effect here |
| --- | --- |
| [openapi-to-trpc#54](https://github.com/nakita628/openapi-to-trpc/issues/54) 0.3.0 resolves oas-truth 0.5.1 and schema-truth 0.7.0, without the truth fixes since 2026-11-21 | 9 of the 20 openapi-to-trpc outputs fail: Effect on every document, ArkType on Discord and OpenAI, Zod and Valibot on OpenAI |
| [truth#58](https://github.com/nakita628/truth/issues/58) arktype nullable enum of 12 to 16 members is one string-DSL union and hits TS2589 | ArkType apps fail on OpenAI |
| [truth#59](https://github.com/nakita628/truth/issues/59) arktype array of a union inside a recursive scope uses the global `type()` | ArkType apps fail on OpenAI |
| [truth#60](https://github.com/nakita628/truth/issues/60) effect empty closed object emits `[].includes(key)` | the Effect app on OpenAI, once openapi-to-trpc#54 is fixed |
| [asphodelos#38](https://github.com/nakita628/asphodelos/issues/38) the hooks of a fetch-fallback operation import a component type that is not exported | `elysia-typebox` fails on Discord and OpenAI |
| [asphodelos#39](https://github.com/nakita628/asphodelos/issues/39) a path key with a query string after a parameter becomes an optional Elysia parameter | `elysia-typebox` fails on OpenAI |
| [asphodelos#40](https://github.com/nakita628/asphodelos/issues/40) the fetch fallback requests a relative URL | wrong at run time, not a type error |
| [asphodelos#41](https://github.com/nakita628/asphodelos/issues/41) angular-query imports the deprecated `@tanstack/angular-query-experimental` | a deprecation warning on install |

Until the daily routine regenerates them with the latest takibi-hono ([docs/daily-routine.md](./docs/daily-routine.md), 1c), the takibi-hono apps show what takibi-hono 0.8.0 produced on 2026-11-21: [truth#14](https://github.com/nakita628/truth/issues/14) to [truth#22](https://github.com/nakita628/truth/issues/22) (fixed in truth since) and [takibi-hono#73](https://github.com/nakita628/takibi-hono/issues/73) (`hono-openapi-typebox` fails on every spec).
