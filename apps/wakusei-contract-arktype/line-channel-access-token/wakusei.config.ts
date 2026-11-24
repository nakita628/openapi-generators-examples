import { defineConfig } from 'wakusei'

export default defineConfig({ input: '../../../openapi/line-channel-access-token.yaml', output: '.', mode: 'contract', schema: 'arktype', template: { output: 'src/handlers' } })
