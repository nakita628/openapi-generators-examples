import { defineConfig } from 'takibi-hono/config'

export default defineConfig({ input: '../../../openapi/line-channel-access-token.yaml', schema: 'arktype', defineHandler: { output: 'src/routes.ts', template: true } })
