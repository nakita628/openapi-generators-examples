import { defineConfig } from 'wakusei'

export default defineConfig({ input: '../../../openapi/gitlab.yaml', output: '.', mode: 'contract', schema: 'valibot', template: { output: 'src/handlers' } })
