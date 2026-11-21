import { defineConfig } from 'wakusei'

export default defineConfig({ input: '../../../openapi/train-travel.json', output: '.', mode: 'contract', schema: 'zod', template: { output: 'src/handlers' } })
