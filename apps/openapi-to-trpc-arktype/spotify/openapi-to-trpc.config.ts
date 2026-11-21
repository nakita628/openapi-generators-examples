import { defineConfig } from 'openapi-to-trpc'

export default defineConfig({ input: '../../../openapi/spotify.yaml', schema: 'arktype' })
