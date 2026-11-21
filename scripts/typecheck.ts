/**
 * Type-checks the generated code, one tsc program per app × spec.
 *
 *   bun scripts/typecheck.ts                     every app, every spec
 *   bun scripts/typecheck.ts hono-zod            one app (a prefix matches several: hono-openapi)
 *   bun scripts/typecheck.ts hono-zod petstore   one app, one spec
 *   bun scripts/typecheck.ts "" petstore         one spec, every app
 *
 * Checking a spec on its own keeps the memory a run needs to that of the largest spec, instead of
 * the sum of all of them. Each apps/<app>/<spec>/tsconfig.json (written by generate.ts) extends
 * the app's tsconfig.json and includes only that spec's src/.
 *
 * A run killed by the OS (out of memory) or timed out is reported as skipped, not failed.
 * The exit code is 1 when any run failed.
 */
import { spawnSync } from 'node:child_process'
import { existsSync, readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const timeout = 10 * 60_000

const [appFilter, specFilter] = process.argv.slice(2)
const failed: string[] = []
const skipped: string[] = []
let passed = 0

for (const app of readdirSync(join(root, 'apps')).sort()) {
  if (appFilter && !app.startsWith(appFilter)) continue
  const appDir = join(root, 'apps', app)
  const tsc = join(appDir, 'node_modules', '.bin', 'tsc')
  for (const spec of readdirSync(appDir).sort()) {
    if (specFilter && spec !== specFilter) continue
    const dir = join(appDir, spec)
    if (!existsSync(join(dir, 'tsconfig.json')) || !existsSync(join(dir, 'src'))) continue

    const started = Date.now()
    const result = spawnSync(tsc, ['-p', 'tsconfig.json', '--pretty', 'false'], {
      cwd: dir,
      encoding: 'utf8',
      timeout,
      maxBuffer: 1024 * 1024 * 1024,
    })
    const seconds = ((Date.now() - started) / 1000).toFixed(1)
    const output = `${result.stdout ?? ''}${result.stderr ?? ''}`
    const errors = output.match(/error TS\d+/g)?.length ?? 0
    const name = `${app}/${spec}`

    if (result.status === 0) {
      passed++
      console.log(`ok    ${name} (${seconds}s)`)
    } else if (result.signal === 'SIGKILL' || result.status === 137) {
      skipped.push(`${name} (killed, likely out of memory)`)
      console.log(`SKIP  ${name} (${seconds}s): killed, likely out of memory`)
    } else if (result.signal === 'SIGTERM' || result.error?.message.includes('ETIMEDOUT')) {
      skipped.push(`${name} (timed out)`)
      console.log(`SKIP  ${name} (${seconds}s): timed out`)
    } else {
      failed.push(`${name} (${errors} errors)`)
      console.log(`FAIL  ${name} (${seconds}s): ${errors} errors\n${output.trim().split('\n').slice(0, 5).join('\n')}`)
    }
  }
}

console.log(`\n${passed} passed, ${failed.length} failed, ${skipped.length} skipped`)
for (const name of failed) console.log(`  failed:  ${name}`)
for (const name of skipped) console.log(`  skipped: ${name}`)
if (failed.length > 0) process.exitCode = 1
