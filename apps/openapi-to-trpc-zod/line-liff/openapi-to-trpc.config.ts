import { defineConfig } from 'openapi-to-trpc'

export default defineConfig({ input: '../../../openapi/line-liff.yaml', schema: 'zod' })
