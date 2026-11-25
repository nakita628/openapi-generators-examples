import { Elysia } from 'elysia'
import { liff } from './modules/liff'

export const app = new Elysia().use(liff)

if (import.meta.main) {
  app.listen(3000)
  console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
}
