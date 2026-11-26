import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'
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
      v.partial(
        v.object({
          limit: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.metadata({ type: 'integer', minimum: 0, maximum: 100 }),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
            v.maxValue(100),
          ),
          order: OrderEnumSchema,
          after: v.pipe(
            v.string(),
            v.description('Identifier for the last item from the previous pagination request'),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/videos',
    sValidator('json', CreateVideoJsonBodySchema),
    sValidator('form', CreateVideoMultipartBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/videos/characters', sValidator('form', CreateVideoCharacterBodySchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/videos/characters/:character_id',
    sValidator(
      'param',
      v.object({ character_id: v.pipe(v.string(), v.metadata({ examples: ['char_123'] })) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/videos/edits',
    sValidator('json', CreateVideoEditJsonBodySchema),
    sValidator('form', CreateVideoEditMultipartBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/videos/extensions',
    sValidator('json', CreateVideoExtendJsonBodySchema),
    sValidator('form', CreateVideoExtendMultipartBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/videos/:video_id',
    sValidator(
      'param',
      v.object({ video_id: v.pipe(v.string(), v.metadata({ examples: ['video_123'] })) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/videos/:video_id',
    sValidator(
      'param',
      v.object({ video_id: v.pipe(v.string(), v.metadata({ examples: ['video_123'] })) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/videos/:video_id/content',
    sValidator(
      'param',
      v.object({ video_id: v.pipe(v.string(), v.metadata({ examples: ['video_123'] })) }),
    ),
    sValidator('query', v.partial(v.object({ variant: VideoContentVariantSchema }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/videos/:video_id/remix',
    sValidator(
      'param',
      v.object({ video_id: v.pipe(v.string(), v.metadata({ examples: ['video_123'] })) }),
    ),
    sValidator('json', CreateVideoRemixBodySchema),
    sValidator('form', CreateVideoRemixBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
