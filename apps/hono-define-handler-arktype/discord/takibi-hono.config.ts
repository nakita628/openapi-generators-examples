import { defineConfig } from 'takibi-hono/config'

export default defineConfig({ input: '../../../openapi/discord.json', schema: 'arktype', defineHandler: { output: 'src/routes.ts', template: true } })
