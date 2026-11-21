import { initTRPC, TRPCError } from '@trpc/server'
import { type } from 'arktype'
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
      type({
        'limit?': 'number.integer >= 1 & number.integer <= 100',
        'after?': 'string | null | null',
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
    .input(type({ webhook_endpoint_id: 'string' }))
    .output(WebhookEndpointBodySchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postWebhookEndpointsWebhookEndpointId: t.procedure
    .input(
      type({
        webhook_endpoint_id: 'string',
        'name?': type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 256 || ctx.mustBe('at most 256 characters'))
          .describe('A new human-readable name for the webhook endpoint.'),
        'url?': type('string')
          .and(/^https:\/\//)
          .narrow((data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'))
          .describe('A new HTTPS URL that receives webhook deliveries.'),
        'event_types?': type(type(ProjectEventTypeEnumSchema).array())
          .and(type('unknown[] >= 1'))
          .describe('The complete set of event types that should trigger deliveries.'),
      }),
    )
    .output(WebhookEndpointBodySchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteWebhookEndpointsWebhookEndpointId: t.procedure
    .input(type({ webhook_endpoint_id: 'string' }))
    .output(DeletedWebhookEndpointResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postWebhookEndpointsWebhookEndpointIdRotateSecret: t.procedure
    .input(
      type({
        webhook_endpoint_id: 'string',
        'keep_old_secret_active_for_24_hours?': type('boolean').describe(
          'Whether to keep the previous signing secret valid for 24 hours after rotation. Defaults to false, which invalidates the previous secret immediately.',
        ),
      }),
    )
    .output(WebhookEndpointWithSecretResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postWebhookEndpointsWebhookEndpointIdTest: t.procedure
    .input(
      type({
        webhook_endpoint_id: 'string',
        event_type: ProjectEventTypeEnumSchema.describe(
          'The event type to send as a sample delivery.',
        ),
      }),
    )
    .output(WebhookEndpointTestResultResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
