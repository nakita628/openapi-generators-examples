import { defineConfig } from 'takibi-hono/config'

export default defineConfig({ input: '../../../openapi/discord.json', schema: 'zod', openapi: true })
