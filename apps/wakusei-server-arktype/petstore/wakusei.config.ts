import { defineConfig } from 'wakusei'

export default defineConfig({ input: '../../../openapi/petstore.json', output: '.', mode: 'server', schema: 'arktype' })
