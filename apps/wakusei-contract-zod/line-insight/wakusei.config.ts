import { defineConfig } from 'wakusei'

export default defineConfig({ input: '../../../openapi/line-insight.yaml', output: '.', mode: 'contract', schema: 'zod', template: { output: 'src/handlers' } })
