import { initTRPC } from '@trpc/server'
import { v1Router } from './v1'

const t = initTRPC.create()

export const appRouter = t.router({ v1: v1Router })
