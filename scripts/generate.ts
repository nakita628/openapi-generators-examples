/**
 * Regenerates the apps from the OpenAPI documents in openapi/.
 *
 *   bun scripts/generate.ts                     every app, every spec
 *   bun scripts/generate.ts wakusei             the apps whose name starts with it
 *   bun scripts/generate.ts wakusei-server-zod petstore
 *                                               one app, one spec
 *   bun scripts/generate.ts "" petstore         one spec, every app
 *
 * `node scripts/generate.ts` works too; the generators then run on node.
 *
 * For each app × spec it writes apps/<app>/<spec>/<generator>.config.ts from the matrix in
 * apps.ts and a tsconfig.json for that spec alone, moves the previous src/ aside, and runs the
 * generator with that directory as its working directory. Empty handler stubs are then filled
 * with a placeholder (see fillStubs). When the generator fails, the previous src/ is put back.
 * Each result goes into docs/results.json (scripts/results.ts).
 * The output is committed; `bun run typecheck` (or `bazel test //...`) type-checks it.
 */
import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, readdirSync, renameSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { apps, root, specs } from './apps.ts'
import { recordGeneration } from './results.ts'

/** The body every empty handler stub gets. */
const PLACEHOLDER = "{ throw new Error('Not implemented') }"

/**
 * The generators leave handler bodies empty (`(c) => {}`, `async ({ input }) => {}`), and an
 * empty body returns `void`, which no typed handler accepts. This repository has no business
 * logic, so each stub gets a placeholder that throws instead: `never` fits every handler type
 * (Hono, oRPC, Elysia, defineHandler), whereas a dummy response would have to match each
 * operation's declared output. The type check then shows the generators' own problems only.
 *
 * Only the handler files are touched (src/handlers/, src/modules/), where `=> {}` is only ever
 * a stub. Returns the number of stubs filled.
 */
function fillStubs(src: string): number {
  let count = 0
  for (const sub of ['handlers', 'modules']) {
    const base = join(src, sub)
    if (!existsSync(base)) continue
    for (const file of readdirSync(base, { recursive: true, encoding: 'utf8' })) {
      if (!file.endsWith('.ts')) continue
      const path = join(base, file)
      const code = readFileSync(path, 'utf8')
      const filled = code.replace(/=>\s*\{\s*\}/g, () => {
        count++
        return `=> ${PLACEHOLDER}`
      })
      if (filled !== code) writeFileSync(path, filled)
    }
  }
  return count
}

/** The config file: `input` and the options on one line, or one property per line. */
function config(module: string, input: string, options: string | readonly string[]): string {
  const head = `import { defineConfig } from '${module}'\n\n`
  if (typeof options === 'string') {
    return `${head}export default defineConfig({ input: '${input}'${options ? `, ${options}` : ''} })\n`
  }
  return `${head}export default defineConfig({\n${[`input: '${input}'`, ...options].map((p) => `  ${p},\n`).join('')}})\n`
}

const all = specs()
const [appFilter, specFilter] = process.argv.slice(2)
const failures: string[] = []

for (const [name, app] of Object.entries(apps)) {
  if (appFilter && !name.startsWith(appFilter)) continue
  for (const [spec, file] of Object.entries(all)) {
    if (specFilter && spec !== specFilter) continue
    const dir = join(root, 'apps', name, spec)
    mkdirSync(dir, { recursive: true })
    const src = join(dir, 'src')
    const previous = join(dir, '.src-previous')
    rmSync(previous, { recursive: true, force: true })
    if (existsSync(src)) renameSync(src, previous)

    writeFileSync(
      join(dir, `${app.generator}.config.ts`),
      config(app.configModule ?? app.generator, `../../../openapi/${file}`, app.options),
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
    const result = spawnSync(command, args, {
      cwd: dir,
      encoding: 'utf8',
      timeout: 15 * 60_000,
      maxBuffer: 256 * 1024 * 1024,
    })
    const seconds = ((Date.now() - started) / 1000).toFixed(1)
    const output = `${result.stdout ?? ''}${result.stderr ?? ''}`.trim()
    if (result.status === 0 && existsSync(src)) {
      rmSync(previous, { recursive: true, force: true })
      const stubs = fillStubs(src)
      recordGeneration(spec, name)
      console.log(`ok    ${name}/${spec} (${seconds}s, ${stubs} stubs filled)`)
    } else {
      rmSync(src, { recursive: true, force: true })
      if (existsSync(previous)) renameSync(previous, src)
      const reason =
        result.error?.message.includes('ETIMEDOUT') || result.signal === 'SIGTERM'
          ? 'timed out after 15 minutes'
          : (output
              .split('\n')
              .map((l) => l.trim())
              .find((l) => /error|fail|cannot|invalid|unexpected|not /i.test(l)) ??
            output.split('\n').find((l) => l.trim()) ??
            `exit code ${result.status}`)
      recordGeneration(spec, name, reason)
      failures.push(`${name}/${spec}`)
      console.log(`FAIL  ${name}/${spec} (${seconds}s)${existsSync(src) ? ', previous output kept' : ''}`)
      console.log(output.split('\n').slice(-15).join('\n'))
    }
  }
}

if (failures.length > 0) {
  console.log(`\n${failures.length} failed:\n  ${failures.join('\n  ')}`)
  process.exitCode = 1
}
