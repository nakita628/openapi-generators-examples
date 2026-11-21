import { defineConfig } from 'wakusei'

export default defineConfig({ input: '../../../openapi/train-travel.json', output: '.', mode: 'server', schema: 'arktype' })
