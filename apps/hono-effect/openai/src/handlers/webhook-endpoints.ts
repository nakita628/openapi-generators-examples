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
          limit: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(
                Schema.isInt(),
                Schema.isGreaterThanOrEqualTo(1),
                Schema.isLessThanOrEqualTo(100),
              ),
          ),
          after: Schema.optionalKey(
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
                Schema.decodeTo(Schema.Null),
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
