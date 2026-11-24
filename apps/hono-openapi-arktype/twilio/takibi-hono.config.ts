import { defineConfig } from 'takibi-hono/config'

export default defineConfig({ input: '../../../openapi/twilio.json', schema: 'arktype', openapi: true })
