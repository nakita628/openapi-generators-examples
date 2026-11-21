import { defineConfig } from 'wakusei'

export default defineConfig({ input: '../../../openapi/spotify.yaml', output: '.', mode: 'contract', schema: 'valibot', template: { output: 'src/handlers' } })
