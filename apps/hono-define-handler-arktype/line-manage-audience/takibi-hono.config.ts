import { defineConfig } from 'takibi-hono/config'

export default defineConfig({ input: '../../../openapi/line-manage-audience.yaml', schema: 'arktype', defineHandler: { output: 'src/routes.ts', template: true } })
