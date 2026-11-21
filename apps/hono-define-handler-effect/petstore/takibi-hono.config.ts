import { defineConfig } from 'takibi-hono/config'

export default defineConfig({ input: '../../../openapi/petstore.json', schema: 'effect', defineHandler: { output: 'src/routes.ts', template: true } })
