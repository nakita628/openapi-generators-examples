import { initTRPC } from '@trpc/server'
import { petRouter } from './pet'
import { storeRouter } from './store'
import { userRouter } from './user'

const t = initTRPC.create()

export const appRouter = t.router({ pet: petRouter, store: storeRouter, user: userRouter })
