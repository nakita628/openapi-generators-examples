import { defineConfig } from 'takibi-hono/config'

export default defineConfig({ input: '../../../openapi/openai.yaml', schema: 'effect', openapi: true })
