import { initTRPC } from '@trpc/server'
import { apiRouter } from './api'

const t = initTRPC.create()

export const appRouter = t.router({ api: apiRouter })
