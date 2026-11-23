/**
 * Where each document under openapi/ comes from, kept in openapi/sources.json, so that a document
 * that changes upstream is noticed and regenerated, and new ones are added the same way.
 *
 *   bun scripts/sources.ts next [<n>]           the next candidates (docs/candidates.md), `<name>\t<url>`
 *   bun scripts/sources.ts probe <url>          whether a document can be added (exit codes below)
 *   bun scripts/sources.ts add <name> <url>     vendor it as openapi/<name>.{json,yaml} and record it
 *   bun scripts/sources.ts check [<spec> ...]   the documents that changed upstream, `<spec>\t<reason>`
 *   bun scripts/sources.ts update <spec>        take the document again from its URL and record it
 *   bun scripts/sources.ts record <spec> <url>  record a document that is already under openapi/
 *
 * probe and add exit with 0 (usable), 3 (cannot be fetched or parsed), 4 (not OpenAPI 3.x:
 * Swagger 2.0 is not read by these generators), 5 (over 25 MB) or 6 (references other files:
 * the generators read one local file).
 *
 * A document on raw.githubusercontent.com is pinned to the commit it was taken from (resolved
 * with `git ls-remote`, as api.github.com is not reachable from the sandbox). `check` asks each
 * URL with the recorded ETag (304: unchanged), else compares the bytes, and for JSON a canonical
 * form too (key order, the order of arrays of plain values, ISO date-times ignored).
 */
import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { root, specs } from './apps.ts'

export type Source = {
  /** The URL it is taken from. */
  url: string
  /** The same file at the commit it was taken from, for a document on GitHub. */
  pinned?: string
  /** The file under openapi/. */
  file: string
  title?: string
  version?: string
  openapi?: string
  operations?: number
  /** The date it was added, and the date it was last taken again. */
  added: string
  updated?: string
  /** The response the file is: its ETag, and the sha256 of its bytes and of a canonical form (JSON). */
  etag?: string
  sha256: string
  canonical?: string
}

const sourcesPath = join(root, 'openapi', 'sources.json')
const LIMIT = 25 * 1024 * 1024
const METHODS = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace']

export function loadSources(): Record<string, Source> {
  return existsSync(sourcesPath) ? JSON.parse(readFileSync(sourcesPath, 'utf8')) : {}
}

function saveSources(sources: Record<string, Source>): void {
  const sorted = Object.fromEntries(Object.keys(sources).sort().map((k) => [k, sources[k]] as const))
  writeFileSync(sourcesPath, `${JSON.stringify(sorted, null, 2)}\n`)
}

const sha256 = (buf: Uint8Array | string) => createHash('sha256').update(buf).digest('hex')
const today = () => new Date().toISOString().slice(0, 10)
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

const DATE_TIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:?\d{2})?$/
function canonical(value: unknown): unknown {
  if (Array.isArray(value)) {
    const items = value.map(canonical)
    return items.every((v) => v === null || typeof v !== 'object')
      ? items
          .map((v) => JSON.stringify(v))
          .sort()
          .map((v) => JSON.parse(v))
      : items
  }
  if (value && typeof value === 'object') {
    const o = value as Record<string, unknown>
    return Object.fromEntries(
      Object.keys(o)
        .sort()
        .map((k) => [k, canonical(o[k])]),
    )
  }
  return typeof value === 'string' && DATE_TIME.test(value) ? '<date-time>' : value
}
function canonicalSha256(buf: Uint8Array): string | undefined {
  try {
    return sha256(JSON.stringify(canonical(JSON.parse(new TextDecoder().decode(buf)))))
  } catch {
    return undefined
  }
}

async function fetchRetry(url: string, init: RequestInit = {}): Promise<Response> {
  for (let attempt = 1; ; attempt++) {
    try {
      const res = await fetch(url, { ...init, signal: AbortSignal.timeout(300_000) })
      if ((res.status === 429 || res.status >= 500) && attempt < 4) {
        await sleep(2000 * attempt)
        continue
      }
      return res
    } catch (e) {
      if (attempt >= 4) throw e
      await sleep(2000 * attempt)
    }
  }
}

class Refused extends Error {
  constructor(
    readonly code: 3 | 4 | 5 | 6,
    message: string,
  ) {
    super(message)
  }
}

type Fetched = {
  bytes: Uint8Array
  etag?: string
  ext: 'json' | 'yaml'
  doc: Record<string, any>
}

/** Download and parse a document; throws Refused when it cannot be added. */
async function fetchDocument(url: string): Promise<Fetched> {
  let res: Response
  try {
    res = await fetchRetry(url)
  } catch (e) {
    throw new Refused(3, `cannot be fetched: ${(e as Error).message}`)
  }
  if (!res.ok) throw new Refused(3, `HTTP ${res.status}`)
  const bytes = new Uint8Array(await res.arrayBuffer())
  if (bytes.length > LIMIT) throw new Refused(5, `${(bytes.length / 2 ** 20).toFixed(1)} MB, over ${LIMIT / 2 ** 20} MB`)
  const text = new TextDecoder().decode(bytes)
  const fromPath = new URL(url).pathname.match(/\.(json|ya?ml)$/i)?.[1].toLowerCase()
  const ext = fromPath ? (fromPath === 'json' ? 'json' : 'yaml') : text.trimStart().startsWith('{') ? 'json' : 'yaml'
  let doc: unknown
  try {
    doc = ext === 'json' ? JSON.parse(text) : Bun.YAML.parse(text)
  } catch (e) {
    throw new Refused(3, `cannot be parsed: ${String((e as Error).message).split('\n')[0]}`)
  }
  if (!doc || typeof doc !== 'object' || Array.isArray(doc)) throw new Refused(3, 'not an object')
  const d = doc as Record<string, any>
  if (d.swagger) throw new Refused(4, `Swagger ${d.swagger}: the generators read OpenAPI 3.x only (not a bug)`)
  if (!String(d.openapi ?? '').startsWith('3.')) throw new Refused(4, `openapi: ${d.openapi ?? '(missing)'}`)
  const external = new Set<string>()
  const walk = (n: unknown): void => {
    if (Array.isArray(n)) n.forEach(walk)
    else if (n && typeof n === 'object') {
      for (const [k, v] of Object.entries(n)) {
        if (k === '$ref' && typeof v === 'string' && !v.startsWith('#')) external.add(v.split('#')[0])
        else walk(v)
      }
    }
  }
  walk(d)
  if (external.size > 0) {
    const some = [...external].slice(0, 3).join(', ')
    throw new Refused(6, `references ${external.size} other file(s) (${some}); the generators read one local file`)
  }
  return { bytes, etag: res.headers.get('etag') ?? undefined, ext, doc: d }
}

/** The commit a raw.githubusercontent.com URL points at, as a github.com blob URL. */
function pin(url: string): string | undefined {
  const m = url.match(/^https:\/\/raw\.githubusercontent\.com\/([^/]+)\/([^/]+)\/(?:refs\/(?:heads|tags)\/)?([^/]+)\/(.+)$/)
  if (!m) return undefined
  const [, owner, repo, ref, path] = m
  if (/^[0-9a-f]{40}$/.test(ref)) return `https://github.com/${owner}/${repo}/blob/${ref}/${path}`
  const out = spawnSync(
    'git',
    ['ls-remote', `https://github.com/${owner}/${repo}.git`, `refs/heads/${ref}`, `refs/tags/${ref}^{}`, `refs/tags/${ref}`],
    { encoding: 'utf8', timeout: 60_000 },
  )
  const sha = out.stdout?.split('\n')[0]?.split('\t')[0]
  return sha && /^[0-9a-f]{40}$/.test(sha) ? `https://github.com/${owner}/${repo}/blob/${sha}/${path}` : undefined
}

function describe(doc: Record<string, any>) {
  const operations = Object.values<Record<string, unknown>>(doc.paths ?? {}).reduce(
    (n, item) => n + METHODS.filter((m) => item && typeof item === 'object' && item[m]).length,
    0,
  )
  return {
    title: doc.info?.title === undefined ? undefined : String(doc.info.title),
    version: doc.info?.version === undefined ? undefined : String(doc.info.version),
    openapi: String(doc.openapi),
    operations,
  }
}

const fingerprint = (f: Fetched) => ({
  ...(f.etag ? { etag: f.etag } : {}),
  sha256: sha256(f.bytes),
  ...(canonicalSha256(f.bytes) ? { canonical: canonicalSha256(f.bytes) } : {}),
})

async function probe(url: string): Promise<void> {
  const f = await fetchDocument(url)
  const d = describe(f.doc)
  const mb = f.bytes.length / 2 ** 20
  console.log(`title     : ${JSON.stringify(d.title ?? '')} ${JSON.stringify(d.version ?? '')}`)
  console.log(`openapi   : ${d.openapi}`)
  console.log(`size      : ${mb.toFixed(2)} MB, ${d.operations} operations, ${Object.keys(f.doc.components?.schemas ?? {}).length} schemas`)
  if (mb > 2) console.log('WARN      : over 2 MB: a large document (docs/daily-routine.md limits these)')
  console.log('verdict   : usable')
}

async function add(name: string, url: string): Promise<void> {
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name)) throw new Error(`<name> must be kebab-case: ${name}`)
  const sources = loadSources()
  if (sources[name] || specs()[name]) throw new Error(`openapi/${name} already exists`)
  const taken = Object.entries(sources).find(([, s]) => s.url === url)
  if (taken) throw new Error(`${url} is already openapi/${taken[1].file}`)
  const f = await fetchDocument(url)
  const file = `${name}.${f.ext}`
  writeFileSync(join(root, 'openapi', file), f.bytes)
  const pinned = pin(url)
  sources[name] = { url, ...(pinned ? { pinned } : {}), file, ...describe(f.doc), added: today(), ...fingerprint(f) }
  saveSources(sources)
  console.log(`openapi/${file}: ${sources[name].title} ${sources[name].version} (OpenAPI ${sources[name].openapi}, ${sources[name].operations} operations)`)
  if (pinned) console.log(`pinned: ${pinned}`)
}

async function update(spec: string): Promise<void> {
  const sources = loadSources()
  const s = sources[spec]
  if (!s) throw new Error(`${spec} is not in openapi/sources.json`)
  const f = await fetchDocument(s.url)
  const file = `${spec}.${f.ext}`
  if (file !== s.file) throw new Error(`${s.url} is now ${f.ext}, was openapi/${s.file}`)
  writeFileSync(join(root, 'openapi', file), f.bytes)
  const pinned = pin(s.url)
  const { etag: _e, canonical: _c, pinned: _p, ...rest } = s
  sources[spec] = { ...rest, ...(pinned ? { pinned } : {}), ...describe(f.doc), updated: today(), ...fingerprint(f) }
  saveSources(sources)
  console.log(`openapi/${file}: ${sources[spec].title} ${sources[spec].version}${pinned ? ` (${pinned})` : ''}`)
}

/** Record a document already under openapi/. Its ETag and commit are kept only if it is what the URL serves now. */
async function record(spec: string, url: string, added: string): Promise<void> {
  const file = specs()[spec]
  if (!file) throw new Error(`no openapi/${spec}.{json,yaml}`)
  const bytes = new Uint8Array(readFileSync(join(root, 'openapi', file)))
  const text = new TextDecoder().decode(bytes)
  const doc = (file.endsWith('.json') ? JSON.parse(text) : Bun.YAML.parse(text)) as Record<string, any>
  const local = { sha256: sha256(bytes), ...(canonicalSha256(bytes) ? { canonical: canonicalSha256(bytes) } : {}) }
  let current = false
  let etag: string | undefined
  try {
    const res = await fetchRetry(url)
    const upstream = new Uint8Array(await res.arrayBuffer())
    current = res.ok && (sha256(upstream) === local.sha256 || canonicalSha256(upstream) === local.canonical)
    etag = res.headers.get('etag') ?? undefined
  } catch (e) {
    console.error(`${spec}: ${(e as Error).message}`)
  }
  const pinned = current ? pin(url) : undefined
  const sources = loadSources()
  sources[spec] = {
    url,
    ...(pinned ? { pinned } : {}),
    file,
    ...describe(doc),
    added,
    ...(current && etag ? { etag } : {}),
    ...local,
  }
  saveSources(sources)
  console.log(`${spec}: recorded${current ? '' : ' (differs from what the URL serves now: `check` reports it)'}`)
}

async function check(only: string[]): Promise<void> {
  const sources = loadSources()
  const reasons = new Map<string, string>()
  await Promise.all(
    Object.entries(sources)
      .filter(([spec]) => only.length === 0 || only.includes(spec))
      .map(async ([spec, s]) => {
        const path = join(root, 'openapi', s.file)
        if (!existsSync(path) || sha256(readFileSync(path)) !== s.sha256) {
          reasons.set(spec, `openapi/${s.file} differs from the record`)
          return
        }
        try {
          const res = await fetchRetry(s.url, s.etag ? { headers: { 'If-None-Match': s.etag } } : {})
          if (res.status === 304) return
          if (!res.ok) {
            console.error(`${spec}\tHTTP ${res.status}\t${s.url}`)
            return
          }
          const same = (buf: Uint8Array) =>
            sha256(buf) === s.sha256 || (s.canonical !== undefined && canonicalSha256(buf) === s.canonical)
          if (same(new Uint8Array(await res.arrayBuffer()))) return
          // Some hosts serve different builds in turn. Ask again before calling it a change.
          for (let i = 0; i < 3; i++) {
            const again = await fetchRetry(s.url)
            if (again.ok && same(new Uint8Array(await again.arrayBuffer()))) {
              console.error(`${spec}\tvaries between requests (the recorded content came back)\t${s.url}`)
              return
            }
          }
          reasons.set(spec, `source changed: ${s.url}`)
        } catch (e) {
          console.error(`${spec}\t${(e as Error).message}\t${s.url}`)
        }
      }),
  )
  for (const spec of Object.keys(sources)) if (reasons.has(spec)) console.log(`${spec}\t${reasons.get(spec)}`)
}

const HTE_README = 'https://raw.githubusercontent.com/nakita628/hono-takibi-examples/main/README.md'

/** The next candidates: Pending in docs/candidates.md, then the README of hono-takibi-examples, in order. */
async function next(n: number): Promise<void> {
  const md = readFileSync(join(root, 'docs', 'candidates.md'), 'utf8')
  const section = (title: string) => md.split(/^## /m).find((s) => s.startsWith(title)) ?? ''
  const item = /^- ([a-z0-9-]+) \| (\S+)/
  const pending = section('Pending')
    .split('\n')
    .map((l) => l.match(item))
    .filter((m): m is RegExpMatchArray => m !== null && /^https?:\/\//.test(m[2]))
    .map((m) => ({ name: m[1], url: m[2] }))
  const rejected = new Set<string>()
  for (const line of section('Rejected').split('\n')) {
    const m = line.match(/^- ([a-z0-9-]+)/)
    if (m) rejected.add(m[1])
    for (const u of line.match(/https?:\/\/\S+?(?=[\s|)>]|$)/g) ?? []) rejected.add(u)
  }
  const res = await fetchRetry(HTE_README)
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${HTE_README}`)
  const rows = (await res.text())
    .split('\n')
    .map((l) => l.match(/^\| \[([^\]]+)\]\(\.\/apps\/[^)]+\)(?: · ([^|]+?))? \| \[[^\]]*\]\(([^)]+)\) \|/))
    .filter((m): m is RegExpMatchArray => m !== null)
    .map((m) => ({
      name: [m[1], m[2]?.trim()]
        .filter(Boolean)
        .join('-')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, ''),
      url: m[3],
    }))
  const sources = loadSources()
  const taken = new Set([...Object.keys(sources), ...Object.values(sources).map((s) => s.url), ...Object.keys(specs())])
  const seen = new Set<string>()
  const out: string[] = []
  for (const c of [...pending, ...rows]) {
    if (out.length >= n) break
    if (taken.has(c.name) || taken.has(c.url) || rejected.has(c.name) || rejected.has(c.url) || seen.has(c.url)) continue
    seen.add(c.url)
    out.push(`${c.name}\t${c.url}`)
  }
  console.log(out.join('\n'))
}

if (import.meta.main) {
  const [command, ...rest] = process.argv.slice(2)
  try {
    if (command === 'next') await next(Number(rest[0] ?? 3))
    else if (command === 'probe' && rest.length === 1) await probe(rest[0])
    else if (command === 'add' && rest.length === 2) await add(rest[0], rest[1])
    else if (command === 'check') await check(rest)
    else if (command === 'update' && rest.length === 1) await update(rest[0])
    else if (command === 'record' && (rest.length === 2 || rest.length === 3)) await record(rest[0], rest[1], rest[2] ?? today())
    else {
      console.error(
        'usage: bun scripts/sources.ts next [<n>] | probe <url> | add <name> <url> | check [<spec> ...] | update <spec> | record <spec> <url> [<added>]',
      )
      process.exit(2)
    }
  } catch (e) {
    console.error(`verdict   : ${(e as Error).message}`)
    process.exit(e instanceof Refused ? e.code : 1)
  }
}
