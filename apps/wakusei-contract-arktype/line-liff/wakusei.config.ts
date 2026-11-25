import { defineConfig } from 'wakusei'

export default defineConfig({ input: '../../../openapi/line-liff.yaml', output: '.', mode: 'contract', schema: 'arktype', template: { output: 'src/handlers' } })
