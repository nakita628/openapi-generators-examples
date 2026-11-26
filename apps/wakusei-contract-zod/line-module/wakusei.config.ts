import { defineConfig } from 'wakusei'

export default defineConfig({ input: '../../../openapi/line-module.yaml', output: '.', mode: 'contract', schema: 'zod', template: { output: 'src/handlers' } })
