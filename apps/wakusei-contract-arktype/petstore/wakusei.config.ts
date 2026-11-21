import { defineConfig } from 'wakusei'

export default defineConfig({ input: '../../../openapi/petstore.json', output: '.', mode: 'contract', schema: 'arktype', template: { output: 'src/handlers' } })
