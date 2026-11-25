import { defineConfig } from 'openapi-to-trpc'

export default defineConfig({ input: '../../../openapi/stripe.json', schema: 'effect' })
