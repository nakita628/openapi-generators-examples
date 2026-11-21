import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'
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
      type({
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0 & number.integer <= 100'),
        'order?': OrderEnumSchema,
        'after?': type('string').describe(
          'Identifier for the last item from the previous pagination request',
        ),
      }),
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
    sValidator('param', type({ character_id: 'string' })),
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
  .get('/videos/:video_id', sValidator('param', type({ video_id: 'string' })), (c) => {})
  .delete('/videos/:video_id', sValidator('param', type({ video_id: 'string' })), (c) => {})
  .get(
    '/videos/:video_id/content',
    sValidator('param', type({ video_id: 'string' })),
    sValidator('query', type({ 'variant?': VideoContentVariantSchema })),
    (c) => {},
  )
  .post(
    '/videos/:video_id/remix',
    sValidator('param', type({ video_id: 'string' })),
    sValidator('json', CreateVideoRemixBodySchema),
    sValidator('form', CreateVideoRemixBodySchema),
    (c) => {},
  )
