import { defineConfig } from 'wakusei'

export default defineConfig({ input: '../../../openapi/discord.json', output: '.', mode: 'contract', schema: 'zod', template: { output: 'src/handlers' } })
