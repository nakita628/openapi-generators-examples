import { defineConfig } from 'wakusei'

export default defineConfig({ input: '../../../openapi/spotify.yaml', output: '.', mode: 'contract', schema: 'arktype', template: { output: 'src/handlers' } })
