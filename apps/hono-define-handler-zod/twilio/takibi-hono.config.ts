import { defineConfig } from 'takibi-hono/config'

export default defineConfig({ input: '../../../openapi/twilio.json', schema: 'zod', defineHandler: { output: 'src/routes.ts', template: true } })
