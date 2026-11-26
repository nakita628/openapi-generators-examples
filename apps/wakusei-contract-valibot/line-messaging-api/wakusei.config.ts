import { defineConfig } from 'wakusei'

export default defineConfig({ input: '../../../openapi/line-messaging-api.yaml', output: '.', mode: 'contract', schema: 'valibot', template: { output: 'src/handlers' } })
