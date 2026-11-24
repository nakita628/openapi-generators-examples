import { defineConfig } from 'wakusei'

export default defineConfig({ input: '../../../openapi/line-channel-access-token.yaml', output: '.', mode: 'contract', schema: 'valibot', template: { output: 'src/handlers' } })
