import { defineConfig } from 'openapi-to-trpc'

export default defineConfig({ input: '../../../openapi/train-travel.json', schema: 'arktype' })
