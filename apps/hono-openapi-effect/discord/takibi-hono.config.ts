import { defineConfig } from 'takibi-hono/config'

export default defineConfig({ input: '../../../openapi/discord.json', schema: 'effect', openapi: true })
