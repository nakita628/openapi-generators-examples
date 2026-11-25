import { defineConfig } from 'wakusei'

export default defineConfig({ input: '../../../openapi/line-liff.yaml', output: '.', mode: 'server', schema: 'zod' })
