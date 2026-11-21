import { defineConfig } from 'wakusei'

export default defineConfig({ input: '../../../openapi/openai.yaml', output: '.', mode: 'contract', schema: 'valibot', template: { output: 'src/handlers' } })
