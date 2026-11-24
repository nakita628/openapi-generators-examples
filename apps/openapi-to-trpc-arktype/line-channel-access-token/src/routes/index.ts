import { initTRPC } from '@trpc/server'
import { oauth2Router } from './oauth2'
import { v2Router } from './v2'

const t = initTRPC.create()

export const appRouter = t.router({ oauth2: oauth2Router, v2: v2Router })
