import { defineConfig } from 'wakusei'

export default defineConfig({ input: '../../../openapi/line-liff.yaml', output: '.', mode: 'contract', schema: 'zod', template: { output: 'src/handlers' } })
