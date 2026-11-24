import { defineConfig } from 'takibi-hono/config'

export default defineConfig({ input: '../../../openapi/line-insight.yaml', schema: 'valibot', defineHandler: { output: 'src/routes.ts', template: true } })
