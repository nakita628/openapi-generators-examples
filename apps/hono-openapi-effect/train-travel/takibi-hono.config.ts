import { defineConfig } from 'takibi-hono/config'

export default defineConfig({ input: '../../../openapi/train-travel.json', schema: 'effect', openapi: true })
