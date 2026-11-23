/**
 * The app matrix: the generator, mode and validator of every app under apps/, and which of the
 * documents under openapi/ each one is generated from. scripts/generate.ts writes the configs
 * from it; scripts/typecheck.ts and scripts/results.ts read it too.
 */
import { readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'

export const root = resolve(import.meta.dirname, '..')

export type Generator = 'wakusei' | 'openapi-to-trpc' | 'takibi-hono' | 'asphodelos'

export type App = {
  generator: Generator
  /**
   * The config's properties after `input`, as TypeScript source: a string goes on the line of
   * `input`, an array one property per line.
   */
  options: string | readonly string[]
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

/** The client libraries asphodelos writes hooks for, each into src/hooks/<library>.ts. */
export const HOOKS = [
  'swr',
  'tanstack-query',
  'preact-query',
  'solid-query',
  'vue-query',
  'svelte-query',
  'angular-query',
] as const

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

  // asphodelos generates Elysia with TypeBox (Elysia's `t`) only. The hooks of every client
  // library it supports are generated too, with the Eden Treaty client they import.
  'elysia-typebox': {
    generator: 'asphodelos',
    options: [
      "client: { output: 'src/lib/client.ts', baseUrl: { env: 'VITE_API_URL' } }",
      ...HOOKS.map((h) => `${h.includes('-') ? `'${h}'` : h}: { output: 'src/hooks/${h}.ts' }`),
    ],
  },
}

/** openapi/<name>.{json,yaml}, keyed by <name>. */
export function specs(): Record<string, string> {
  return Object.fromEntries(
    readdirSync(join(root, 'openapi'))
      .filter((f) => /\.(json|ya?ml)$/.test(f) && f !== 'sources.json')
      .sort()
      .map((f) => [f.replace(/\.(json|ya?ml)$/, ''), f] as const),
  )
}
