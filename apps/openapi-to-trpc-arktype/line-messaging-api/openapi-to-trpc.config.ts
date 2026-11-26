import { defineConfig } from 'openapi-to-trpc'

export default defineConfig({ input: '../../../openapi/line-messaging-api.yaml', schema: 'arktype' })
