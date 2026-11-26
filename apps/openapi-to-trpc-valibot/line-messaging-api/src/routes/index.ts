import { initTRPC } from '@trpc/server'
import { v2Router } from './v2'
import { botRouter } from './bot'

const t = initTRPC.create()

export const appRouter = t.router({ v2: v2Router, bot: botRouter })
