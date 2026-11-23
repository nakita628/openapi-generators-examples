/**
 * The result of every app × document, kept in docs/results.json: which generator version wrote
 * the committed output, whether the last attempt failed, the type check, and the cause of a
 * failure or of type errors. scripts/generate.ts and scripts/typecheck.ts record into it;
 * docs/typecheck.md and the Specs table of README.md are written from it.
 *
 *   bun scripts/results.ts note <app> <spec> "<cause>"   the cause: `nakita628/<repo>#<n>`, or a short note
 *   bun scripts/results.ts todo [<spec> ...]             what still needs a check or a cause
 *   bun scripts/results.ts affected <ref> [<ref> ...] [--stale]
 *                                                        app × document whose cause names an issue
 *                                                        (`wakusei#12`, `nakita628/truth#18`);
 *                                                        --stale: only those written by an older
 *                                                        generator than the one installed
 *   bun scripts/results.ts write                         rewrites docs/typecheck.md and README's Specs table
 *
 * A cause stays while the errors keep the same codes (or the generation keeps failing); when the
 * codes change it is dropped, and `todo` lists the result again.
 */
import { existsSync, mkdirSync, readFileSync, realpathSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { apps, root, type Generator } from './apps.ts'
import { loadSources } from './sources.ts'

export type Typecheck =
  | { errors: 0; stale?: true }
  | { errors: number; codes: string; where: string; stale?: true }
  | { errors: null; reason: string; stale?: true }

export type Entry = {
  /** `<generator>@<version>` that wrote the committed output; absent when there is none. */
  generator?: string
  /** The date of that output. */
  date?: string
  /** The last attempt failed. The committed output, if any, is the older one above. */
  failed?: { generator: string; date: string; error: string }
  /** The type check of the committed output; `stale` once it is regenerated, until checked. */
  typecheck?: Typecheck
  /** The cause of the failure or of the type errors: `nakita628/<repo>#<n>`, or a short note. */
  issue?: string
}

/** spec → app → entry */
export type Results = Record<string, Record<string, Entry>>

const resultsPath = join(root, 'docs', 'results.json')

export function loadResults(): Results {
  return existsSync(resultsPath) ? JSON.parse(readFileSync(resultsPath, 'utf8')) : {}
}

const sortKeys = <T>(o: Record<string, T>): Record<string, T> =>
  Object.fromEntries(Object.keys(o).sort().map((k) => [k, o[k]] as const))

export function saveResults(results: Results): void {
  const sorted = Object.fromEntries(Object.keys(results).sort().map((s) => [s, sortKeys(results[s])] as const))
  mkdirSync(dirname(resultsPath), { recursive: true })
  writeFileSync(resultsPath, `${JSON.stringify(sorted, null, 2)}\n`)
}

const today = () => new Date().toISOString().slice(0, 10)

/** The installed version of a generator, as `<generator>@<version>`. */
export function generatorVersion(generator: Generator): string {
  const pkg = realpathSync(join(root, 'node_modules', generator, 'package.json'))
  return `${generator}@${JSON.parse(readFileSync(pkg, 'utf8')).version}`
}

/** A generation of `app` from `spec`: written (error undefined) or failed. */
export function recordGeneration(spec: string, app: string, error?: string): void {
  const results = loadResults()
  const entry: Entry = results[spec]?.[app] ?? {}
  const generator = generatorVersion(apps[app].generator)
  if (error === undefined) {
    entry.generator = generator
    entry.date = today()
    delete entry.failed
    if (entry.typecheck) entry.typecheck.stale = true
  } else {
    entry.failed = { generator, date: today(), error: error.slice(0, 300) }
  }
  ;(results[spec] ??= {})[app] = entry
  saveResults(results)
}

const codeSet = (codes?: string) =>
  (codes ?? '')
    .replace(/ ×\d+/g, '')
    .split(', ')
    .filter(Boolean)
    .sort()
    .join()

/** A type check of `app` × `spec`. A cause of type errors stays while the codes stay the same. */
export function recordTypecheck(spec: string, app: string, result: Typecheck): void {
  const results = loadResults()
  const entry: Entry = results[spec]?.[app] ?? {}
  const previous = entry.typecheck
  entry.typecheck = result
  // A failed generation keeps its cause, and a check that did not finish says nothing new.
  if (entry.issue && !entry.failed && result.errors !== null) {
    const codes = (t?: Typecheck) => (t && 'codes' in t ? codeSet(t.codes) : '')
    if (result.errors === 0 || codes(previous) !== codes(result)) delete entry.issue
  }
  ;(results[spec] ??= {})[app] = entry
  saveResults(results)
}

/**
 * The `error TS2322` lines of a tsc log (run in the spec's directory) → the result, with the five
 * most common codes and files.
 */
export function summarize(log: string): Typecheck {
  const lines = log.split('\n').filter((l) => / error TS\d+/.test(l))
  if (lines.length === 0) return { errors: 0 }
  const codes = new Map<string, number>()
  const files = new Map<string, number>()
  for (const l of lines) {
    const code = l.match(/ error (TS\d+)/)![1]
    codes.set(code, (codes.get(code) ?? 0) + 1)
    const file = l.match(/^(.+?\.tsx?)\(\d+,\d+\)/)?.[1]
    if (file) {
      // One entry for each directory that holds a file per tag (or per client library).
      const where = file.replace(/^(src\/(?:hooks|handlers|modules|routes))\/.*/, '$1/*')
      files.set(where, (files.get(where) ?? 0) + 1)
    }
  }
  const top = (m: Map<string, number>) =>
    [...m.entries()].sort(([a, x], [b, y]) => y - x || a.localeCompare(b)).slice(0, 5)
  return {
    errors: lines.length,
    codes: top(codes)
      .map(([c, n]) => `${c} ×${n}`)
      .join(', '),
    where: top(files)
      .map(([f]) => `\`${f}\``)
      .join(', '),
  }
}

/** The issues a cause names, as `<repo>#<n>`. */
function issuesOf(text: string | undefined): string[] {
  return [...(text ?? '').matchAll(/(?:nakita628\/)?([\w.-]+?)(?:#|\/issues\/)(\d+)/g)].map((m) => `${m[1]}#${m[2]}`)
}

function note(app: string, spec: string, cause: string): void {
  const results = loadResults()
  const entry = results[spec]?.[app]
  if (!entry) throw new Error(`no result for ${app}/${spec}`)
  const t = entry.typecheck
  if (!entry.failed && !(t && t.errors !== 0)) throw new Error(`${app}/${spec} has neither a failure nor type errors`)
  entry.issue = cause
  saveResults(results)
}

function todo(only: string[]): void {
  const results = loadResults()
  for (const [spec, byApp] of Object.entries(results)) {
    if (only.length && !only.includes(spec)) continue
    for (const [app, e] of Object.entries(byApp)) {
      const t = e.typecheck
      if (e.failed && !e.issue) console.log(`${app}\t${spec}\tgeneration failed without a cause`)
      else if (!e.generator) continue
      else if (!t) console.log(`${app}\t${spec}\tnot checked`)
      else if (t.stale) console.log(`${app}\t${spec}\tnot checked since it was regenerated`)
      else if (t.errors === null && !e.issue) console.log(`${app}\t${spec}\t${t.reason} (note why, or check it with more memory and time)`)
      else if (t.errors > 0 && !e.issue) console.log(`${app}\t${spec}\t${t.errors} errors without a cause`)
    }
  }
}

function affected(refs: string[], stale: boolean): void {
  const wanted = new Set(refs.flatMap(issuesOf))
  if (wanted.size === 0) throw new Error('name each issue with its repository: wakusei#12, nakita628/truth#18')
  const installed = new Map<string, string>()
  const results = loadResults()
  for (const [spec, byApp] of Object.entries(results)) {
    for (const [app, e] of Object.entries(byApp)) {
      const hit = issuesOf(e.issue).filter((i) => wanted.has(i))
      if (!hit.length) continue
      const generator = apps[app]?.generator
      if (stale && generator) {
        if (!installed.has(generator)) installed.set(generator, generatorVersion(generator))
        const tried = e.failed?.generator ?? e.generator
        if (tried === installed.get(generator)) continue
      }
      console.log(`${app}\t${spec}\t${hit.join(',')}\t${e.failed?.generator ?? e.generator ?? ''}`)
    }
  }
}

const escape = (s: string) => s.replace(/\|/g, '\\|').replace(/\n/g, ' ')

function write(): void {
  const results = loadResults()
  const sources = loadSources()
  const rows = Object.entries(results).flatMap(([spec, byApp]) =>
    Object.entries(byApp).map(([app, e]) => ({ spec, app, e })),
  )
  const generated = rows.filter((r) => r.e.generator)
  const passing = generated.filter((r) => r.e.typecheck?.errors === 0 && !r.e.typecheck.stale)
  const failing = generated
    .filter((r) => (r.e.typecheck?.errors ?? 0) > 0 && !r.e.typecheck!.stale)
    .sort((a, b) => a.spec.localeCompare(b.spec) || a.app.localeCompare(b.app))
  const unchecked = generated.filter((r) => !r.e.typecheck || r.e.typecheck.stale || r.e.typecheck.errors === null)
  const notGenerated = rows.filter((r) => r.e.failed)

  const versions = new Map<string, number>()
  for (const r of generated) versions.set(r.e.generator!, (versions.get(r.e.generator!) ?? 0) + 1)
  const versionText = [...versions.entries()]
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([v, n]) => `${v} (${n})`)
    .join(', ')

  const doc = (spec: string) => `[${spec}](../openapi/${sources[spec]?.file ?? spec})`
  const out: string[] = []
  out.push('# Typecheck', '')
  out.push(
    'One `tsc -p` per app × document (`bun scripts/typecheck.ts`), over the generated `src/` with the app\'s',
    'tsconfig. There is no CI: `scripts/generate.ts` and `scripts/typecheck.ts` record each result in',
    '[results.json](./results.json), and `bun scripts/results.ts write` writes this file from it.',
    '',
  )
  out.push(
    `${generated.length} outputs of ${Object.keys(results).length} documents: ${passing.length} with no errors, ${failing.length} with errors, ${unchecked.length} not checked; ${notGenerated.length} attempts failed.`,
    '',
    `Generators (outputs): ${versionText}.`,
    '',
  )
  out.push('## Errors', '', '| Document | App | Errors | Where | Codes | Cause |', '| --- | --- | --- | --- | --- | --- |')
  for (const { spec, app, e } of failing) {
    const t = e.typecheck as { errors: number; codes: string; where: string }
    out.push(`| ${doc(spec)} | ${app} | ${t.errors} | ${t.where} | ${t.codes} | ${escape(e.issue ?? '')} |`)
  }
  out.push('')
  if (notGenerated.length) {
    out.push('## Not generated', '')
    out.push('The last attempt failed; an older output, if there is one, is kept.', '')
    out.push('| Document | App | Generator | Error | Cause |', '| --- | --- | --- | --- | --- |')
    for (const { spec, app, e } of notGenerated) {
      out.push(`| ${doc(spec)} | ${app} | ${e.failed!.generator} | ${escape(e.failed!.error)} | ${escape(e.issue ?? '')} |`)
    }
    out.push('')
  }
  if (unchecked.length) {
    out.push('## Not checked', '', '| Document | App | Reason |', '| --- | --- | --- |')
    for (const { spec, app, e } of unchecked) {
      const t = e.typecheck
      const reason = !t ? 'not checked yet' : t.stale ? 'regenerated, not checked since' : (t as { reason: string }).reason
      out.push(`| ${doc(spec)} | ${app} | ${reason} |`)
    }
    out.push('')
  }
  out.push('## No errors', '')
  const bySpec = new Map<string, string[]>()
  for (const r of passing) bySpec.set(r.spec, [...(bySpec.get(r.spec) ?? []), r.app])
  for (const [spec, list] of [...bySpec.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    out.push(`- ${doc(spec)}: ${list.sort().join(', ')}`)
  }
  out.push('')
  writeFileSync(join(root, 'docs', 'typecheck.md'), out.join('\n'))

  // README's Specs table, from openapi/sources.json.
  const readmePath = join(root, 'README.md')
  const readme = readFileSync(readmePath, 'utf8')
  const start = '<!-- specs:start -->'
  const end = '<!-- specs:end -->'
  if (readme.includes(start) && readme.includes(end)) {
    const table = ['| Spec | Document | Source | Added |', '| --- | --- | --- | --- |']
    for (const [spec, s] of Object.entries(sources)) {
      const title = s.title ? `${escape(s.title)}${s.version ? ` ${escape(s.version)}` : ''}` : ''
      const source = s.pinned ? `<${s.url}> ([pinned](${s.pinned}))` : `<${s.url}>`
      table.push(`| [${spec}](./openapi/${s.file}) | ${title} | ${source} | ${s.added} |`)
    }
    const next = `${readme.slice(0, readme.indexOf(start) + start.length)}\n${table.join('\n')}\n${readme.slice(readme.indexOf(end))}`
    if (next !== readme) writeFileSync(readmePath, next)
  }
  console.log(
    `docs/typecheck.md: ${passing.length} with no errors, ${failing.length} with errors, ${unchecked.length} not checked, ${notGenerated.length} not generated`,
  )
}

if (import.meta.main) {
  const [command, ...rest] = process.argv.slice(2)
  if (command === 'note' && rest.length === 3) note(rest[0], rest[1], rest[2])
  else if (command === 'todo') todo(rest)
  else if (command === 'affected' && rest.some((r) => r !== '--stale'))
    affected(
      rest.filter((r) => r !== '--stale'),
      rest.includes('--stale'),
    )
  else if (command === 'write') write()
  else {
    console.error(
      'usage: bun scripts/results.ts note <app> <spec> "<cause>" | todo [<spec> ...] | affected <ref> ... [--stale] | write',
    )
    process.exit(2)
  }
}
