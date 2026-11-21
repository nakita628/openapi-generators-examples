/**
 * Regenerates every app from the OpenAPI documents in openapi/.
 *
 *   bun scripts/generate.ts                     every app, every spec
 *   bun scripts/generate.ts hono-zod            one app (a prefix matches several: hono-openapi)
 *   bun scripts/generate.ts hono-zod petstore   one app, one spec
 *
 * `node scripts/generate.ts` works too; the generators then run on node.
 *
 * For each app × spec it writes apps/<app>/<spec>/<generator>.config.ts from the matrix below and
 * a tsconfig.json for that spec alone, removes the previous src/, and runs the generator with that
 * directory as its working directory.
 * The output is committed; `bazel test //...` type-checks it.
 */
import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')

type Generator = 'wakusei' | 'openapi-to-trpc' | 'takibi-hono' | 'asphodelos'

type App = {
  generator: Generator
  /** The config's properties after `input`, as TypeScript source. */
  options: string
  /** The import specifier of the generator's defineConfig. */
  configModule?: string
}

const wakusei = (mode: 'contract' | 'server', schema: string): App => ({
  generator: 'wakusei',
  options:
    mode === 'contract'
      ? `output: '.', mode: 'contract', schema: '${schema}', template: { output: 'src/handlers' }`
      : `output: '.', mode: 'server', schema: '${schema}'`,
})

const trpc = (schema: string): App => ({
  generator: 'openapi-to-trpc',
  options: `schema: '${schema}'`,
})

const hono = (schema: string, extra = ''): App => ({
  generator: 'takibi-hono',
  configModule: 'takibi-hono/config',
  options: `schema: '${schema}'${extra}`,
})

export const apps: Record<string, App> = {
  'wakusei-contract-zod': wakusei('contract', 'zod'),
  'wakusei-contract-valibot': wakusei('contract', 'valibot'),
  'wakusei-contract-arktype': wakusei('contract', 'arktype'),
  'wakusei-server-zod': wakusei('server', 'zod'),
  'wakusei-server-valibot': wakusei('server', 'valibot'),
  'wakusei-server-arktype': wakusei('server', 'arktype'),

  'openapi-to-trpc-zod': trpc('zod'),
  'openapi-to-trpc-valibot': trpc('valibot'),
  'openapi-to-trpc-arktype': trpc('arktype'),
  'openapi-to-trpc-effect': trpc('effect'),

  'hono-zod': hono('zod'),
  'hono-valibot': hono('valibot'),
  'hono-typebox': hono('typebox'),
  'hono-arktype': hono('arktype'),
  'hono-effect': hono('effect'),

  'hono-openapi-zod': hono('zod', ', openapi: true'),
  'hono-openapi-valibot': hono('valibot', ', openapi: true'),
  'hono-openapi-typebox': hono('typebox', ', openapi: true'),
  'hono-openapi-arktype': hono('arktype', ', openapi: true'),
  'hono-openapi-effect': hono('effect', ', openapi: true'),

  // defineHandler needs a Standard Schema validator, so there is no typebox variant.
  'hono-define-handler-zod': hono('zod', ", defineHandler: { output: 'src/routes.ts', template: true }"),
  'hono-define-handler-valibot': hono('valibot', ", defineHandler: { output: 'src/routes.ts', template: true }"),
  'hono-define-handler-arktype': hono('arktype', ", defineHandler: { output: 'src/routes.ts', template: true }"),
  'hono-define-handler-effect': hono('effect', ", defineHandler: { output: 'src/routes.ts', template: true }"),

  // asphodelos generates Elysia with TypeBox (Elysia's `t`) only.
  'elysia-typebox': { generator: 'asphodelos', options: '' },
}

/** openapi/<name>.{json,yaml}, keyed by <name>. */
const specs = Object.fromEntries(
  readdirSync(join(root, 'openapi'))
    .filter((f) => /\.(json|ya?ml)$/.test(f))
    .map((f) => [f.replace(/\.(json|ya?ml)$/, ''), f] as const),
)

const [appFilter, specFilter] = process.argv.slice(2)
const failures: string[] = []

for (const [name, app] of Object.entries(apps)) {
  if (appFilter && !name.startsWith(appFilter)) continue
  for (const [spec, file] of Object.entries(specs)) {
    if (specFilter && spec !== specFilter) continue
    const dir = join(root, 'apps', name, spec)
    mkdirSync(dir, { recursive: true })
    rmSync(join(dir, 'src'), { recursive: true, force: true })

    const options = app.options ? `, ${app.options}` : ''
    writeFileSync(
      join(dir, `${app.generator}.config.ts`),
      `import { defineConfig } from '${app.configModule ?? app.generator}'\n\n` +
        `export default defineConfig({ input: '../../../openapi/${file}'${options} })\n`,
    )

    // typecheck.ts checks each spec as its own program (see there).
    writeFileSync(
      join(dir, 'tsconfig.json'),
      `${JSON.stringify({ extends: '../tsconfig.json', include: ['src/**/*.ts'] }, null, 2)}\n`,
    )

    const bin = join(root, 'node_modules', '.bin', app.generator)
    // Under bun the generators run on bun too (`--bun` overrides their node shebang): 2-3x faster.
    const [command, args] = process.versions.bun ? [process.execPath, ['--bun', bin]] : [bin, []]
    const started = Date.now()
    const result = spawnSync(command, args, { cwd: dir, encoding: 'utf8', timeout: 15 * 60_000 })
    const seconds = ((Date.now() - started) / 1000).toFixed(1)
    const output = `${result.stdout ?? ''}${result.stderr ?? ''}`.trim()
    if (result.status === 0 && existsSync(join(dir, 'src'))) {
      console.log(`ok    ${name}/${spec} (${seconds}s)`)
    } else {
      failures.push(`${name}/${spec}`)
      console.log(`FAIL  ${name}/${spec} (${seconds}s)\n${output.split('\n').slice(-15).join('\n')}`)
    }
  }
}

if (failures.length > 0) {
  console.log(`\n${failures.length} failed:\n  ${failures.join('\n  ')}`)
  process.exitCode = 1
}
