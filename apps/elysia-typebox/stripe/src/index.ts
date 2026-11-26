import { Elysia } from 'elysia'
import { v1 } from './modules/v1'

export const app = new Elysia().use(v1)

if (import.meta.main) {
  app.listen(3000)
  console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
}
