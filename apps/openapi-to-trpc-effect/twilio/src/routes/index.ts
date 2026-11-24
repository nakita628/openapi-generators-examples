import { initTRPC } from '@trpc/server'
import { _20100401Router } from './_20100401'

const t = initTRPC.create()

export const appRouter = t.router({ _20100401: _20100401Router })
