import { defineConfig } from 'wakusei'

export default defineConfig({ input: '../../../openapi/line-module.yaml', output: '.', mode: 'contract', schema: 'valibot', template: { output: 'src/handlers' } })
