import { defineConfig } from 'wakusei'

export default defineConfig({ input: '../../../openapi/line-manage-audience.yaml', output: '.', mode: 'server', schema: 'valibot' })
