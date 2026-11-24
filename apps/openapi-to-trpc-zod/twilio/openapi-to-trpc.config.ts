import { defineConfig } from 'openapi-to-trpc'

export default defineConfig({ input: '../../../openapi/twilio.json', schema: 'zod' })
