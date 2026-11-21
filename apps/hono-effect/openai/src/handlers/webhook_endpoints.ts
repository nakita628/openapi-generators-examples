import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Schema, SchemaTransformation } from 'effect'
import {
  PublicCreateEndpointBodySchema,
  PublicUpdateEndpointBodySchema,
  PublicRotateSecretBodySchema,
  PublicTestEndpointBodySchema,
} from '../components'

export const webhookEndpointsHandler = new Hono()
  .get(
    '/webhook_endpoints',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(1),
              Schema.isLessThanOrEqualTo(100),
            ),
          ),
          after: Schema.optional(
            Schema.Union([
              Schema.String.annotate({ jsonSchemaExamples: ['whe_123'] }),
              Schema.Unknown.pipe(
                Schema.decodeTo(
                  Schema.Unknown,
                  SchemaTransformation.transform<unknown, unknown>({
                    decode: (input) => (input === 'null' ? null : input),
                    encode: (output) => output,
                  }),
                ),
                Schema.decodeTo(Schema.NullOr(Schema.Null)),
              ),
            ]),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/webhook_endpoints',
    sValidator('json', Schema.toStandardSchemaV1(PublicCreateEndpointBodySchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/webhook_endpoints/:webhook_endpoint_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          webhook_endpoint_id: Schema.String.annotate({ jsonSchemaExamples: ['whe_123'] }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/webhook_endpoints/:webhook_endpoint_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          webhook_endpoint_id: Schema.String.annotate({ jsonSchemaExamples: ['whe_123'] }),
        }),
      ),
    ),
    sValidator('json', Schema.toStandardSchemaV1(PublicUpdateEndpointBodySchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/webhook_endpoints/:webhook_endpoint_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          webhook_endpoint_id: Schema.String.annotate({ jsonSchemaExamples: ['whe_123'] }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/webhook_endpoints/:webhook_endpoint_id/rotate_secret',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          webhook_endpoint_id: Schema.String.annotate({ jsonSchemaExamples: ['whe_123'] }),
        }),
      ),
    ),
    sValidator('json', Schema.toStandardSchemaV1(PublicRotateSecretBodySchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/webhook_endpoints/:webhook_endpoint_id/test',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          webhook_endpoint_id: Schema.String.annotate({ jsonSchemaExamples: ['whe_123'] }),
        }),
      ),
    ),
    sValidator('json', Schema.toStandardSchemaV1(PublicTestEndpointBodySchema)),
    (c) => { throw new Error('Not implemented') },
  )
