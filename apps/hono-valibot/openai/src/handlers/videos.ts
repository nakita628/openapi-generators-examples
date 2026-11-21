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
            v.transform(Number),
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
    (c) => {},
  )
  .post(
    '/videos',
    sValidator('json', CreateVideoJsonBodySchema),
    sValidator('form', CreateVideoMultipartBodySchema),
    (c) => {},
  )
  .post('/videos/characters', sValidator('form', CreateVideoCharacterBodySchema), (c) => {})
  .get(
    '/videos/characters/:character_id',
    sValidator(
      'param',
      v.object({ character_id: v.pipe(v.string(), v.metadata({ examples: ['char_123'] })) }),
    ),
    (c) => {},
  )
  .post(
    '/videos/edits',
    sValidator('json', CreateVideoEditJsonBodySchema),
    sValidator('form', CreateVideoEditMultipartBodySchema),
    (c) => {},
  )
  .post(
    '/videos/extensions',
    sValidator('json', CreateVideoExtendJsonBodySchema),
    sValidator('form', CreateVideoExtendMultipartBodySchema),
    (c) => {},
  )
  .get(
    '/videos/:video_id',
    sValidator(
      'param',
      v.object({ video_id: v.pipe(v.string(), v.metadata({ examples: ['video_123'] })) }),
    ),
    (c) => {},
  )
  .delete(
    '/videos/:video_id',
    sValidator(
      'param',
      v.object({ video_id: v.pipe(v.string(), v.metadata({ examples: ['video_123'] })) }),
    ),
    (c) => {},
  )
  .get(
    '/videos/:video_id/content',
    sValidator(
      'param',
      v.object({ video_id: v.pipe(v.string(), v.metadata({ examples: ['video_123'] })) }),
    ),
    sValidator('query', v.partial(v.object({ variant: VideoContentVariantSchema }))),
    (c) => {},
  )
  .post(
    '/videos/:video_id/remix',
    sValidator(
      'param',
      v.object({ video_id: v.pipe(v.string(), v.metadata({ examples: ['video_123'] })) }),
    ),
    sValidator('json', CreateVideoRemixBodySchema),
    sValidator('form', CreateVideoRemixBodySchema),
    (c) => {},
  )
