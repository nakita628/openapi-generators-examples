import { defineConfig } from 'wakusei'

export default defineConfig({ input: '../../../openapi/stripe.json', output: '.', mode: 'contract', schema: 'valibot', template: { output: 'src/handlers' } })
