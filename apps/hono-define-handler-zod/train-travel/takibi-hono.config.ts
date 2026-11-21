import { defineConfig } from 'takibi-hono/config'

export default defineConfig({ input: '../../../openapi/train-travel.json', schema: 'zod', defineHandler: { output: 'src/routes.ts', template: true } })
