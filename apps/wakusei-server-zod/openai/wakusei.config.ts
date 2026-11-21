import { defineConfig } from 'wakusei'

export default defineConfig({ input: '../../../openapi/openai.yaml', output: '.', mode: 'server', schema: 'zod' })
