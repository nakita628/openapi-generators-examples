import { defineConfig } from 'wakusei'

export default defineConfig({ input: '../../../openapi/line-manage-audience.yaml', output: '.', mode: 'contract', schema: 'zod', template: { output: 'src/handlers' } })
