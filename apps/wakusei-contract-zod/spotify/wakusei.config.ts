import { defineConfig } from 'wakusei'

export default defineConfig({ input: '../../../openapi/spotify.yaml', output: '.', mode: 'contract', schema: 'zod', template: { output: 'src/handlers' } })
