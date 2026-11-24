import { defineConfig } from 'wakusei'

export default defineConfig({ input: '../../../openapi/line-channel-access-token.yaml', output: '.', mode: 'contract', schema: 'zod', template: { output: 'src/handlers' } })
