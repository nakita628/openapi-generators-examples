import { defineConfig } from 'takibi-hono/config'

export default defineConfig({ input: '../../../openapi/twilio.json', schema: 'typebox', openapi: true })
