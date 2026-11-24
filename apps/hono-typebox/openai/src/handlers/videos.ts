import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type, Codec } from 'typebox'
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
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 0,
                () => 'must be >= 0',
              ),
              (value) => Number(value) <= 100,
              () => 'must be <= 100',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        order: Type.Optional(OrderEnumSchema),
        after: Type.Optional(
          Type.String({
            description: 'Identifier for the last item from the previous pagination request',
          }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/videos',
    tbValidator('json', CreateVideoJsonBodySchema),
    tbValidator('form', CreateVideoMultipartBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/videos/characters', tbValidator('form', CreateVideoCharacterBodySchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/videos/characters/:character_id',
    tbValidator('param', Type.Object({ character_id: Type.String({ examples: ['char_123'] }) })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/videos/edits',
    tbValidator('json', CreateVideoEditJsonBodySchema),
    tbValidator('form', CreateVideoEditMultipartBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/videos/extensions',
    tbValidator('json', CreateVideoExtendJsonBodySchema),
    tbValidator('form', CreateVideoExtendMultipartBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/videos/:video_id',
    tbValidator('param', Type.Object({ video_id: Type.String({ examples: ['video_123'] }) })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/videos/:video_id',
    tbValidator('param', Type.Object({ video_id: Type.String({ examples: ['video_123'] }) })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/videos/:video_id/content',
    tbValidator('param', Type.Object({ video_id: Type.String({ examples: ['video_123'] }) })),
    tbValidator('query', Type.Object({ variant: Type.Optional(VideoContentVariantSchema) })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/videos/:video_id/remix',
    tbValidator('param', Type.Object({ video_id: Type.String({ examples: ['video_123'] }) })),
    tbValidator('json', CreateVideoRemixBodySchema),
    tbValidator('form', CreateVideoRemixBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
