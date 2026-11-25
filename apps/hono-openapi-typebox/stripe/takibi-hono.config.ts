import { defineConfig } from 'takibi-hono/config'

export default defineConfig({ input: '../../../openapi/stripe.json', schema: 'typebox', openapi: true })
