import { initTRPC, TRPCError } from '@trpc/server'
import { Schema } from 'effect'
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
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.optionalKey(
            Schema.Number.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(1),
              Schema.isLessThanOrEqualTo(100),
            ),
          ),
          after: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({ jsonSchemaExamples: ['whe_123'] }),
              Schema.Null,
            ]),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(WebhookEndpointListResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postWebhookEndpoints: t.procedure
    .input(Schema.toStandardSchemaV1(PublicCreateEndpointBodySchema))
    .output(Schema.toStandardSchemaV1(WebhookEndpointWithSecretResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getWebhookEndpointsWebhookEndpointId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          webhook_endpoint_id: Schema.String.annotate({ jsonSchemaExamples: ['whe_123'] }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(WebhookEndpointBodySchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postWebhookEndpointsWebhookEndpointId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          webhook_endpoint_id: Schema.String.annotate({ jsonSchemaExamples: ['whe_123'] }),
          name: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 1, {
                expected: 'a string of at least 1 character',
              }),
              Schema.makeFilter((input) => [...input].length <= 256, {
                expected: 'a string of at most 256 characters',
              }),
            ).annotate({ description: 'A new human-readable name for the webhook endpoint.' }),
          ),
          url: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^https:\/\//),
              Schema.makeFilter((input) => [...input].length <= 2048, {
                expected: 'a string of at most 2048 characters',
              }),
            ).annotate({ description: 'A new HTTPS URL that receives webhook deliveries.' }),
          ),
          event_types: Schema.optionalKey(
            Schema.Array(ProjectEventTypeEnumSchema)
              .check(Schema.isMinLength(1))
              .annotate({
                description: 'The complete set of event types that should trigger deliveries.',
              }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(WebhookEndpointBodySchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteWebhookEndpointsWebhookEndpointId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          webhook_endpoint_id: Schema.String.annotate({ jsonSchemaExamples: ['whe_123'] }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(DeletedWebhookEndpointResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postWebhookEndpointsWebhookEndpointIdRotateSecret: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          webhook_endpoint_id: Schema.String.annotate({ jsonSchemaExamples: ['whe_123'] }),
          keep_old_secret_active_for_24_hours: Schema.optionalKey(
            Schema.Boolean.annotate({
              description:
                'Whether to keep the previous signing secret valid for 24 hours after rotation. Defaults to false, which invalidates the previous secret immediately.',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(WebhookEndpointWithSecretResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postWebhookEndpointsWebhookEndpointIdTest: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          webhook_endpoint_id: Schema.String.annotate({ jsonSchemaExamples: ['whe_123'] }),
          event_type: ProjectEventTypeEnumSchema.annotate({
            description: 'The event type to send as a sample delivery.',
          }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(WebhookEndpointTestResultResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
