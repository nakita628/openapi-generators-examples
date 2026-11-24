import { defineConfig } from 'wakusei'

export default defineConfig({ input: '../../../openapi/line-insight.yaml', output: '.', mode: 'server', schema: 'valibot' })
