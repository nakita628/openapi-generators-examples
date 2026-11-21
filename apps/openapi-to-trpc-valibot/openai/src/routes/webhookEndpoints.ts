import { initTRPC, TRPCError } from '@trpc/server'
import * as v from 'valibot'
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
      v.partial(
        v.object({
          limit: v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(100)),
          after: v.union([
            v.pipe(v.string(), v.metadata({ examples: ['whe_123'] })),
            v.nullable(v.null()),
          ]),
        }),
      ),
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
    .input(
      v.object({ webhook_endpoint_id: v.pipe(v.string(), v.metadata({ examples: ['whe_123'] })) }),
    )
    .output(WebhookEndpointBodySchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postWebhookEndpointsWebhookEndpointId: t.procedure
    .input(
      v.object({
        webhook_endpoint_id: v.pipe(v.string(), v.metadata({ examples: ['whe_123'] })),
        name: v.optional(
          v.pipe(
            v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(256)),
            v.description('A new human-readable name for the webhook endpoint.'),
          ),
        ),
        url: v.optional(
          v.pipe(
            v.pipe(v.string(), v.regex(/^https:\/\//), v.maxCodePoints(2048)),
            v.description('A new HTTPS URL that receives webhook deliveries.'),
          ),
        ),
        event_types: v.optional(
          v.pipe(
            v.pipe(v.array(ProjectEventTypeEnumSchema), v.minLength(1)),
            v.description('The complete set of event types that should trigger deliveries.'),
          ),
        ),
      }),
    )
    .output(WebhookEndpointBodySchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteWebhookEndpointsWebhookEndpointId: t.procedure
    .input(
      v.object({ webhook_endpoint_id: v.pipe(v.string(), v.metadata({ examples: ['whe_123'] })) }),
    )
    .output(DeletedWebhookEndpointResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postWebhookEndpointsWebhookEndpointIdRotateSecret: t.procedure
    .input(
      v.object({
        webhook_endpoint_id: v.pipe(v.string(), v.metadata({ examples: ['whe_123'] })),
        keep_old_secret_active_for_24_hours: v.optional(
          v.pipe(
            v.boolean(),
            v.description(
              'Whether to keep the previous signing secret valid for 24 hours after rotation. Defaults to false, which invalidates the previous secret immediately.',
            ),
          ),
        ),
      }),
    )
    .output(WebhookEndpointWithSecretResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postWebhookEndpointsWebhookEndpointIdTest: t.procedure
    .input(
      v.object({
        webhook_endpoint_id: v.pipe(v.string(), v.metadata({ examples: ['whe_123'] })),
        event_type: v.pipe(
          ProjectEventTypeEnumSchema,
          v.description('The event type to send as a sample delivery.'),
        ),
      }),
    )
    .output(WebhookEndpointTestResultResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
