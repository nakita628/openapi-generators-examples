import { defineConfig } from 'takibi-hono/config'

export default defineConfig({ input: '../../../openapi/stripe.json', schema: 'effect', defineHandler: { output: 'src/routes.ts', template: true } })
