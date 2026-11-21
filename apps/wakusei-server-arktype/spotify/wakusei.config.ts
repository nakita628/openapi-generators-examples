import { defineConfig } from 'wakusei'

export default defineConfig({ input: '../../../openapi/spotify.yaml', output: '.', mode: 'server', schema: 'arktype' })
