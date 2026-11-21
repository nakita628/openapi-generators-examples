import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Schema } from 'effect'
import {
  OrderEnumSchema,
  CreateVideoMultipartBodySchema,
  CreateVideoJsonBodySchema,
  CreateVideoCharacterBodySchema,
  CreateVideoEditMultipartBodySchema,
  CreateVideoEditJsonBodySchema,
  CreateVideoExtendMultipartBodySchema,
  CreateVideoExtendJsonBodySchema,
  VideoContentVariantSchema,
  CreateVideoRemixBodySchema,
} from '../components'

export const videosHandler = new Hono()
  .get(
    '/videos',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(100),
            ),
          ),
          order: Schema.optional(OrderEnumSchema),
          after: Schema.optional(
            Schema.String.annotate({
              description: 'Identifier for the last item from the previous pagination request',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/videos',
    sValidator('json', Schema.toStandardSchemaV1(CreateVideoJsonBodySchema)),
    sValidator('form', Schema.toStandardSchemaV1(CreateVideoMultipartBodySchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/videos/characters',
    sValidator('form', Schema.toStandardSchemaV1(CreateVideoCharacterBodySchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/videos/characters/:character_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          character_id: Schema.String.annotate({ jsonSchemaExamples: ['char_123'] }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/videos/edits',
    sValidator('json', Schema.toStandardSchemaV1(CreateVideoEditJsonBodySchema)),
    sValidator('form', Schema.toStandardSchemaV1(CreateVideoEditMultipartBodySchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/videos/extensions',
    sValidator('json', Schema.toStandardSchemaV1(CreateVideoExtendJsonBodySchema)),
    sValidator('form', Schema.toStandardSchemaV1(CreateVideoExtendMultipartBodySchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/videos/:video_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ video_id: Schema.String.annotate({ jsonSchemaExamples: ['video_123'] }) }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/videos/:video_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ video_id: Schema.String.annotate({ jsonSchemaExamples: ['video_123'] }) }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/videos/:video_id/content',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ video_id: Schema.String.annotate({ jsonSchemaExamples: ['video_123'] }) }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({ variant: Schema.optional(VideoContentVariantSchema) }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/videos/:video_id/remix',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ video_id: Schema.String.annotate({ jsonSchemaExamples: ['video_123'] }) }),
      ),
    ),
    sValidator('json', Schema.toStandardSchemaV1(CreateVideoRemixBodySchema)),
    sValidator('form', Schema.toStandardSchemaV1(CreateVideoRemixBodySchema)),
    (c) => { throw new Error('Not implemented') },
  )
