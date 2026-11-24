import { defineConfig } from 'wakusei'

export default defineConfig({ input: '../../../openapi/twilio.json', output: '.', mode: 'contract', schema: 'zod', template: { output: 'src/handlers' } })
