import { initTRPC, TRPCError } from '@trpc/server'
import * as z from 'zod'
import {
  DeletedWebhookEndpointResourceSchema,
  ProjectEventTypeEnumSchema,
  PublicCreateEndpointBodySchema,
  WebhookEndpointBodySchema,
  WebhookEndpointListResourceSchema,
  WebhookEndpointTestResultResourceSchema,
  WebhookEndpointWithSecretResourceSchema,
} from '../components'

const t = initTRPC.create()

export const webhookEndpointsRouter = t.router({
  getWebhookEndpoints: t.procedure
    .input(
      z.object({
        limit: z.int().min(1).max(100).exactOptional(),
        after: z
          .union([z.string().meta({ examples: ['whe_123'] }), z.null().nullable()])
          .exactOptional(),
      }),
    )
    .output(WebhookEndpointListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postWebhookEndpoints: t.procedure
    .input(PublicCreateEndpointBodySchema)
    .output(WebhookEndpointWithSecretResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getWebhookEndpointsWebhookEndpointId: t.procedure
    .input(z.object({ webhook_endpoint_id: z.string().meta({ examples: ['whe_123'] }) }))
    .output(WebhookEndpointBodySchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postWebhookEndpointsWebhookEndpointId: t.procedure
    .input(
      z.object({
        webhook_endpoint_id: z.string().meta({ examples: ['whe_123'] }),
        name: z
          .string()
          .min(1)
          .max(256)
          .meta({ description: 'A new human-readable name for the webhook endpoint.' })
          .exactOptional(),
        url: z
          .string()
          .regex(/^https:\/\//)
          .max(2048)
          .meta({ description: 'A new HTTPS URL that receives webhook deliveries.' })
          .exactOptional(),
        event_types: z
          .array(ProjectEventTypeEnumSchema)
          .min(1)
          .meta({ description: 'The complete set of event types that should trigger deliveries.' })
          .exactOptional(),
      }),
    )
    .output(WebhookEndpointBodySchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteWebhookEndpointsWebhookEndpointId: t.procedure
    .input(z.object({ webhook_endpoint_id: z.string().meta({ examples: ['whe_123'] }) }))
    .output(DeletedWebhookEndpointResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postWebhookEndpointsWebhookEndpointIdRotateSecret: t.procedure
    .input(
      z.object({
        webhook_endpoint_id: z.string().meta({ examples: ['whe_123'] }),
        keep_old_secret_active_for_24_hours: z
          .boolean()
          .meta({
            description:
              'Whether to keep the previous signing secret valid for 24 hours after rotation. Defaults to false, which invalidates the previous secret immediately.',
          })
          .exactOptional(),
      }),
    )
    .output(WebhookEndpointWithSecretResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postWebhookEndpointsWebhookEndpointIdTest: t.procedure
    .input(
      z.object({
        webhook_endpoint_id: z.string().meta({ examples: ['whe_123'] }),
        event_type: ProjectEventTypeEnumSchema.meta({
          description: 'The event type to send as a sample delivery.',
        }),
      }),
    )
    .output(WebhookEndpointTestResultResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
