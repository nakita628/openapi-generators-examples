import { defineConfig } from 'wakusei'

export default defineConfig({ input: '../../../openapi/discord.json', output: '.', mode: 'server', schema: 'arktype' })
