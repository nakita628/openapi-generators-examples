import { defineConfig } from 'wakusei'

export default defineConfig({ input: '../../../openapi/stripe.json', output: '.', mode: 'contract', schema: 'zod', template: { output: 'src/handlers' } })
