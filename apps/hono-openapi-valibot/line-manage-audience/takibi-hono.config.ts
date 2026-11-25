import { defineConfig } from 'takibi-hono/config'

export default defineConfig({ input: '../../../openapi/line-manage-audience.yaml', schema: 'valibot', openapi: true })
