import { defineConfig } from 'takibi-hono/config'

export default defineConfig({ input: '../../../openapi/gitlab.yaml', schema: 'effect', defineHandler: { output: 'src/routes.ts', template: true } })
