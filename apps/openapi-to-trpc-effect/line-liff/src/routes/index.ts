import { initTRPC } from '@trpc/server'
import { liffRouter } from './liff'

const t = initTRPC.create()

export const appRouter = t.router({ liff: liffRouter })
