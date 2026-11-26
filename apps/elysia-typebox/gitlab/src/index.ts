import { Elysia } from 'elysia'
import { api } from './modules/api'

export const app = new Elysia().use(api)

if (import.meta.main) {
  app.listen(3000)
  console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
}
