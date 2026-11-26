import { Elysia } from 'elysia'
import { v2 } from './modules/v2'
import { bot } from './modules/bot'

export const app = new Elysia().use(v2).use(bot)

if (import.meta.main) {
  app.listen(3000)
  console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
}
