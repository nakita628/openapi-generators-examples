import { initTRPC, TRPCError } from '@trpc/server'
import { Schema } from 'effect'
import { WebhookEventTypeListResourceSchema } from '../components'

const t = initTRPC.create()

export const webhookEventTypesRouter = t.router({
  getWebhookEventTypes: t.procedure
    .output(Schema.toStandardSchemaV1(WebhookEventTypeListResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
