import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'
import { PetSchema } from '../components'

export const petHandler = new Hono()
  .put(
    '/pet',
    sValidator('json', PetSchema),
    sValidator(
      'form',
      v.object({
        id: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^-?\d+$/),
              v.transform((input) => BigInt(input)),
              v.minValue(-9223372036854775808n),
              v.maxValue(9223372036854775807n),
            ),
            v.metadata({ examples: [10] }),
          ),
        ),
        name: v.pipe(v.string(), v.metadata({ examples: ['doggie'] })),
        category: v.optional(
          v.partial(
            v.object({
              id: v.pipe(
                v.pipe(
                  v.string(),
                  v.regex(/^-?\d+$/),
                  v.transform((input) => BigInt(input)),
                  v.minValue(-9223372036854775808n),
                  v.maxValue(9223372036854775807n),
                ),
                v.metadata({ examples: [1] }),
              ),
              name: v.pipe(v.string(), v.metadata({ examples: ['Dogs'] })),
            }),
          ),
        ),
        photoUrls: v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.string()),
        ),
        tags: v.optional(
          v.pipe(
            v.unknown(),
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
            v.array(
              v.partial(
                v.object({
                  id: v.pipe(
                    v.string(),
                    v.regex(/^-?\d+$/),
                    v.transform((input) => BigInt(input)),
                    v.minValue(-9223372036854775808n),
                    v.maxValue(9223372036854775807n),
                  ),
                  name: v.string(),
                }),
              ),
            ),
          ),
        ),
        status: v.optional(
          v.pipe(
            v.picklist(['available', 'pending', 'sold']),
            v.description('pet status in the store'),
          ),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/pet',
    sValidator('json', PetSchema),
    sValidator(
      'form',
      v.object({
        id: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^-?\d+$/),
              v.transform((input) => BigInt(input)),
              v.minValue(-9223372036854775808n),
              v.maxValue(9223372036854775807n),
            ),
            v.metadata({ examples: [10] }),
          ),
        ),
        name: v.pipe(v.string(), v.metadata({ examples: ['doggie'] })),
        category: v.optional(
          v.partial(
            v.object({
              id: v.pipe(
                v.pipe(
                  v.string(),
                  v.regex(/^-?\d+$/),
                  v.transform((input) => BigInt(input)),
                  v.minValue(-9223372036854775808n),
                  v.maxValue(9223372036854775807n),
                ),
                v.metadata({ examples: [1] }),
              ),
              name: v.pipe(v.string(), v.metadata({ examples: ['Dogs'] })),
            }),
          ),
        ),
        photoUrls: v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.string()),
        ),
        tags: v.optional(
          v.pipe(
            v.unknown(),
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
            v.array(
              v.partial(
                v.object({
                  id: v.pipe(
                    v.string(),
                    v.regex(/^-?\d+$/),
                    v.transform((input) => BigInt(input)),
                    v.minValue(-9223372036854775808n),
                    v.maxValue(9223372036854775807n),
                  ),
                  name: v.string(),
                }),
              ),
            ),
          ),
        ),
        status: v.optional(
          v.pipe(
            v.picklist(['available', 'pending', 'sold']),
            v.description('pet status in the store'),
          ),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/pet/findByStatus',
    sValidator(
      'query',
      v.object({ status: v.optional(v.picklist(['available', 'pending', 'sold']), 'available') }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/pet/findByTags',
    sValidator(
      'query',
      v.object({
        tags: v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.string()),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/pet/:petId',
    sValidator(
      'param',
      v.object({
        petId: v.pipe(
          v.string(),
          v.regex(/^-?\d+$/),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/pet/:petId',
    sValidator(
      'param',
      v.object({
        petId: v.pipe(
          v.string(),
          v.regex(/^-?\d+$/),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
      }),
    ),
    sValidator('query', v.partial(v.object({ name: v.string(), status: v.string() }))),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/pet/:petId',
    sValidator(
      'param',
      v.object({
        petId: v.pipe(
          v.string(),
          v.regex(/^-?\d+$/),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
      }),
    ),
    sValidator('header', v.partial(v.object({ api_key: v.string() }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/pet/:petId/uploadImage',
    sValidator(
      'param',
      v.object({
        petId: v.pipe(
          v.string(),
          v.regex(/^-?\d+$/),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
      }),
    ),
    sValidator('query', v.partial(v.object({ additionalMetadata: v.string() }))),
    (c) => { throw new Error('Not implemented') },
  )
