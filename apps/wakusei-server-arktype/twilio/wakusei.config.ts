import { defineConfig } from 'wakusei'

export default defineConfig({ input: '../../../openapi/twilio.json', output: '.', mode: 'server', schema: 'arktype' })
