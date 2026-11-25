import { defineConfig } from 'wakusei'

export default defineConfig({ input: '../../../openapi/line-liff.yaml', output: '.', mode: 'contract', schema: 'valibot', template: { output: 'src/handlers' } })
