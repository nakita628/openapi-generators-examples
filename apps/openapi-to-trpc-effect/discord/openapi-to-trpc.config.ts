import { defineConfig } from 'openapi-to-trpc'

export default defineConfig({ input: '../../../openapi/discord.json', schema: 'effect' })
