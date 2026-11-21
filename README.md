# openapi-generators-examples

Code generated from the same OpenAPI documents by four generators, one app per generator × mode × validator. Business logic is left out: the point is the generated code and whether it type-checks. The generators leave handler bodies empty, and an empty body returns `void`, which no typed handler accepts, so `scripts/generate.ts` fills each one with `throw new Error('Not implemented')` (its type, `never`, fits every handler).

| Generator | Target |
| --- | --- |
| [wakusei](https://github.com/nakita628/wakusei) | [oRPC](https://orpc.dev/) (contract / server mode) |
| [openapi-to-trpc](https://github.com/nakita628/openapi-to-trpc) | [tRPC](https://trpc.io/) |
| [takibi-hono](https://github.com/nakita628/takibi-hono) | [Hono](https://hono.dev/) (plain, [hono-openapi](https://hono.dev/examples/hono-openapi), [`defineHandler`](https://hono.dev/docs/helpers/factory#definehandler)) |
| [asphodelos](https://github.com/nakita628/asphodelos) | [Elysia](https://elysiajs.com/) |

## Layout

```text
openapi/                       the input documents (vendored, see Specs below)
apps/<app>/<spec>/             one generation: <generator>.config.ts + src/
apps/<app>/package.json        the runtime dependencies of that app's generated code
apps/<app>/BUILD.bazel         typecheck() from tools/typecheck.bzl
scripts/generate.ts            the app matrix; writes each config and runs the generator
```

### Apps

| Generator | Apps |
| --- | --- |
| wakusei | `wakusei-contract-{zod,valibot,arktype}`, `wakusei-server-{zod,valibot,arktype}` |
| openapi-to-trpc | `openapi-to-trpc-{zod,valibot,arktype,effect}` |
| takibi-hono | `hono-{zod,valibot,typebox,arktype,effect}` |
| takibi-hono (`openapi: true`) | `hono-openapi-{zod,valibot,typebox,arktype,effect}` |
| takibi-hono (`defineHandler`, Hono 5) | `hono-define-handler-{zod,valibot,arktype,effect}` |
| asphodelos | `elysia-typebox` |

### Specs

Taken from [hono-takibi-examples](https://github.com/nakita628/hono-takibi-examples). The generators read local files only, so the documents are committed under `openapi/`.

| Spec | Source |
| --- | --- |
| petstore | <https://petstore3.swagger.io/api/v3/openapi.json> |
| train-travel | <https://raw.githubusercontent.com/readmeio/oas-examples/main/3.1/json/train-travel.json> |
| spotify | <https://raw.githubusercontent.com/sonallux/spotify-web-api/main/fixed-spotify-open-api.yml> |
| discord | <https://raw.githubusercontent.com/discord/discord-api-spec/main/specs/openapi.json> |
| openai | <https://raw.githubusercontent.com/openai/openai-openapi/main/openapi.yaml> |

## Commands

The repository is a [bun workspace](https://bun.com/docs/install/workspaces) (`apps/*`); bun installs, generates and type-checks.

```bash
bun install
bun run generate                      # every app × spec
bun scripts/generate.ts hono-zod      # one app (a prefix matches several)
bun scripts/generate.ts "" petstore   # one spec, every app
bun run typecheck                     # tsc in every app, one app at a time
```

Under bun the generators run on bun as well (`bun --bun`), which is 2-3x faster than node for takibi-hono, wakusei and openapi-to-trpc and produces the same output. `node scripts/generate.ts` still works.

The type checks can also run as Bazel tests, `bun run test` (`bazel test //...`). Bazel ([bazelisk](https://github.com/bazelbuild/bazelisk) from the root devDependencies) reads `pnpm-lock.yaml` through [rules_js](https://github.com/aspect-build/rules_js), so a dependency change has to land in both lockfiles: `bun install` and `pnpm install --lockfile-only`. The catalog is likewise listed twice, in `package.json` (bun) and `pnpm-workspace.yaml` (pnpm). A new app needs its `package.json` in `MODULE.bazel`'s `data` list and its `node_modules` line in `.bazelignore`.

## Known issues

Problems found while generating are reported where the code lives: schema generation in [nakita628/truth](https://github.com/nakita628/truth/issues) (schema-truth / oas-truth, which wakusei, openapi-to-trpc and takibi-hono build on), everything else in the generator's own repository.

| Issue | Effect here |
| --- | --- |
| [truth#14](https://github.com/nakita628/truth/issues/14) typebox declaration with `not` is emitted as `export const X=// FIXME` | `hono-typebox/openai`, `hono-openapi-typebox/openai` are not generated |
| [truth#15](https://github.com/nakita628/truth/issues/15) typebox replaces a schema with `not` by `Type.Any()` | constraints lost in TypeBox output |
| [truth#16](https://github.com/nakita628/truth/issues/16) `{ type: "null" }` in `anyOf` is emitted as a doubled null | redundant output on every target |
| [truth#17](https://github.com/nakita628/truth/issues/17) effect `importLine` omits `SchemaTransformation` | `openapi-to-trpc-effect` fails to type-check on every spec |
| [truth#18](https://github.com/nakita628/truth/issues/18) zod applies `not.enum` refine after `.nullable()` | every Zod app fails to type-check on openai |
| [truth#19](https://github.com/nakita628/truth/issues/19) effect emits `Schema.isLengthBetween` (Effect 4: `isBetweenLength`) | Effect apps fail on openai |
| [truth#20](https://github.com/nakita628/truth/issues/20) effect puts `null` into `Schema.Literals` | Effect apps fail on openai |
| [truth#21](https://github.com/nakita628/truth/issues/21) arktype string-DSL union of 25+ literals hits TS2589 | ArkType apps fail on discord and openai |
| [truth#22](https://github.com/nakita628/truth/issues/22) effect recursive declaration annotated `Schema.Codec<T>` | Effect apps fail on openai |
| [takibi-hono#73](https://github.com/nakita628/takibi-hono/issues/73) `openapi: true` + TypeBox passes a non-Standard-Schema validator to hono-openapi | `hono-openapi-typebox` fails on every spec |

The generators depend on `oas-truth ^0.5.1`; some failures (Valibot recursive schemas on openai) are already fixed in oas-truth 0.6.1.
