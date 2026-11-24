import { defineConfig } from 'openapi-to-trpc'

export default defineConfig({ input: '../../../openapi/line-insight.yaml', schema: 'arktype' })
