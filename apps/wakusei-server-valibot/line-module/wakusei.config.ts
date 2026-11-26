import { defineConfig } from 'wakusei'

export default defineConfig({ input: '../../../openapi/line-module.yaml', output: '.', mode: 'server', schema: 'valibot' })
