import { defineConfig } from 'openapi-to-trpc'

export default defineConfig({ input: '../../../openapi/openai.yaml', schema: 'valibot' })
