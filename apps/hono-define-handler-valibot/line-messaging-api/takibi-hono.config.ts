import { defineConfig } from 'takibi-hono/config'

export default defineConfig({ input: '../../../openapi/line-messaging-api.yaml', schema: 'valibot', defineHandler: { output: 'src/routes.ts', template: true } })
