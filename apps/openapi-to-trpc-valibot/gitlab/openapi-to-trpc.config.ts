import { defineConfig } from 'openapi-to-trpc'

export default defineConfig({ input: '../../../openapi/gitlab.yaml', schema: 'valibot' })
