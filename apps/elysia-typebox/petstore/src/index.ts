import { Elysia } from 'elysia'
import { pet } from './modules/pet'
import { store } from './modules/store'
import { user } from './modules/user'

export const app = new Elysia().use(pet).use(store).use(user)

if (import.meta.main) {
  app.listen(3000)
  console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
}
