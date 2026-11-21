import { defineConfig } from 'takibi-hono/config'

export default defineConfig({ input: '../../../openapi/petstore.json', schema: 'typebox', openapi: true })
