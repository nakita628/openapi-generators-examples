import { defineConfig } from 'takibi-hono/config'

export default defineConfig({ input: '../../../openapi/gitlab.yaml', schema: 'zod', openapi: true })
