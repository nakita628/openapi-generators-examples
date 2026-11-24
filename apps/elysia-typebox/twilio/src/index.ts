import { Elysia } from 'elysia'
import { _20100401 } from './modules/20100401'

export const app = new Elysia().use(_20100401)

if (import.meta.main) {
  app.listen(3000)
  console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
}
