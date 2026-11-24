import { defineConfig } from 'openapi-to-trpc'

export default defineConfig({ input: '../../../openapi/line-channel-access-token.yaml', schema: 'zod' })
