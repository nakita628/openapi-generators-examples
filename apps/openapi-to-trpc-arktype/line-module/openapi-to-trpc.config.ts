import { defineConfig } from 'openapi-to-trpc'

export default defineConfig({ input: '../../../openapi/line-module.yaml', schema: 'arktype' })
