import { defineConfig } from 'takibi-hono/config'

export default defineConfig({ input: '../../../openapi/spotify.yaml', schema: 'effect', defineHandler: { output: 'src/routes.ts', template: true } })
