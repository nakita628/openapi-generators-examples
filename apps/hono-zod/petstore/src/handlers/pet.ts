import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'
import { PetSchema } from '../components'

export const petHandler = new Hono()
  .put(
    '/pet',
    sValidator('json', PetSchema),
    sValidator(
      'form',
      z.object({
        id: z.coerce
          .bigint()
          .pipe(z.int64())
          .meta({ examples: [10] })
          .exactOptional(),
        name: z.string().meta({ examples: ['doggie'] }),
        category: z
          .object({
            id: z.coerce
              .bigint()
              .pipe(z.int64())
              .meta({ examples: [1] })
              .exactOptional(),
            name: z
              .string()
              .meta({ examples: ['Dogs'] })
              .exactOptional(),
          })
          .exactOptional(),
        photoUrls: z.preprocess(
          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
          z.array(z.string()),
        ),
        tags: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(
              z.object({
                id: z.coerce.bigint().pipe(z.int64()).exactOptional(),
                name: z.string().exactOptional(),
              }),
            ),
          )
          .exactOptional(),
        status: z
          .enum(['available', 'pending', 'sold'])
          .meta({ description: 'pet status in the store' })
          .exactOptional(),
      }),
    ),
    (c) => {},
  )
  .post(
    '/pet',
    sValidator('json', PetSchema),
    sValidator(
      'form',
      z.object({
        id: z.coerce
          .bigint()
          .pipe(z.int64())
          .meta({ examples: [10] })
          .exactOptional(),
        name: z.string().meta({ examples: ['doggie'] }),
        category: z
          .object({
            id: z.coerce
              .bigint()
              .pipe(z.int64())
              .meta({ examples: [1] })
              .exactOptional(),
            name: z
              .string()
              .meta({ examples: ['Dogs'] })
              .exactOptional(),
          })
          .exactOptional(),
        photoUrls: z.preprocess(
          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
          z.array(z.string()),
        ),
        tags: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(
              z.object({
                id: z.coerce.bigint().pipe(z.int64()).exactOptional(),
                name: z.string().exactOptional(),
              }),
            ),
          )
          .exactOptional(),
        status: z
          .enum(['available', 'pending', 'sold'])
          .meta({ description: 'pet status in the store' })
          .exactOptional(),
      }),
    ),
    (c) => {},
  )
  .get(
    '/pet/findByStatus',
    sValidator(
      'query',
      z.object({ status: z.enum(['available', 'pending', 'sold']).default('available') }),
    ),
    (c) => {},
  )
  .get(
    '/pet/findByTags',
    sValidator(
      'query',
      z.object({
        tags: z.preprocess(
          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
          z.array(z.string()),
        ),
      }),
    ),
    (c) => {},
  )
  .get(
    '/pet/:petId',
    sValidator('param', z.object({ petId: z.coerce.bigint().pipe(z.int64()) })),
    (c) => {},
  )
  .post(
    '/pet/:petId',
    sValidator('param', z.object({ petId: z.coerce.bigint().pipe(z.int64()) })),
    sValidator(
      'query',
      z.object({ name: z.string().exactOptional(), status: z.string().exactOptional() }),
    ),
    (c) => {},
  )
  .delete(
    '/pet/:petId',
    sValidator('param', z.object({ petId: z.coerce.bigint().pipe(z.int64()) })),
    sValidator('header', z.object({ api_key: z.string().exactOptional() })),
    (c) => {},
  )
  .post(
    '/pet/:petId/uploadImage',
    sValidator('param', z.object({ petId: z.coerce.bigint().pipe(z.int64()) })),
    sValidator('query', z.object({ additionalMetadata: z.string().exactOptional() })),
    (c) => {},
  )
