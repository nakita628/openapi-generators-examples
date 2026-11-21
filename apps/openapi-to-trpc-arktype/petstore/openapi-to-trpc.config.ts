import { defineConfig } from 'openapi-to-trpc'

export default defineConfig({ input: '../../../openapi/petstore.json', schema: 'arktype' })
