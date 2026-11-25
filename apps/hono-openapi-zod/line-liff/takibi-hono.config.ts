import { defineConfig } from 'takibi-hono/config'

export default defineConfig({ input: '../../../openapi/line-liff.yaml', schema: 'zod', openapi: true })
