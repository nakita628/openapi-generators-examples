import { defineConfig } from 'asphodelos'

export default defineConfig({
  input: '../../../openapi/line-insight.yaml',
  client: { output: 'src/lib/client.ts', baseUrl: { env: 'VITE_API_URL' } },
  swr: { output: 'src/hooks/swr.ts' },
  'tanstack-query': { output: 'src/hooks/tanstack-query.ts' },
  'preact-query': { output: 'src/hooks/preact-query.ts' },
  'solid-query': { output: 'src/hooks/solid-query.ts' },
  'vue-query': { output: 'src/hooks/vue-query.ts' },
  'svelte-query': { output: 'src/hooks/svelte-query.ts' },
  'angular-query': { output: 'src/hooks/angular-query.ts' },
})
