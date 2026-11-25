import { defineConfig } from 'wakusei'

export default defineConfig({ input: '../../../openapi/stripe.json', output: '.', mode: 'server', schema: 'zod' })
