import { initTRPC, TRPCError } from '@trpc/server'
import { WebhookEventTypeListResourceSchema } from '../components'

const t = initTRPC.create()

export const webhookEventTypesRouter = t.router({
  getWebhookEventTypes: t.procedure.output(WebhookEventTypeListResourceSchema).query(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
})
