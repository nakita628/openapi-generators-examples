import { defineConfig } from 'wakusei'

export default defineConfig({ input: '../../../openapi/petstore.json', output: '.', mode: 'contract', schema: 'zod', template: { output: 'src/handlers' } })
