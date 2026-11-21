import { defineConfig } from 'takibi-hono/config'

export default defineConfig({ input: '../../../openapi/petstore.json', schema: 'valibot', defineHandler: { output: 'src/routes.ts', template: true } })
