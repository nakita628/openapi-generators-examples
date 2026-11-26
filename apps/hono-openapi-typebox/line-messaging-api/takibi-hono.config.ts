import { defineConfig } from 'takibi-hono/config'

export default defineConfig({ input: '../../../openapi/line-messaging-api.yaml', schema: 'typebox', openapi: true })
