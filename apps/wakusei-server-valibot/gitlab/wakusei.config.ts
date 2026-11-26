import { defineConfig } from 'wakusei'

export default defineConfig({ input: '../../../openapi/gitlab.yaml', output: '.', mode: 'server', schema: 'valibot' })
