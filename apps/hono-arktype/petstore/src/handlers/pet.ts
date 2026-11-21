import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'
import { PetSchema } from '../components'

export const petHandler = new Hono()
  .put(
    '/pet',
    sValidator('json', PetSchema),
    sValidator(
      'form',
      type({
        'id?': type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          ),
        name: 'string',
        'category?': type({
          'id?': type('string')
            .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
            .narrow(
              (data, ctx) =>
                (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
                ctx.mustBe('an int64'),
            ),
          'name?': 'string',
        }),
        photoUrls: type('unknown')
          .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
          .to('string[]'),
        'tags?': type('unknown').pipe(
          (data) => (data === undefined || Array.isArray(data) ? data : [data]),
          type(
            type({
              'id?': type('string')
                .pipe((data, ctx) =>
                  /^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer'),
                )
                .narrow(
                  (data, ctx) =>
                    (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
                    ctx.mustBe('an int64'),
                ),
              'name?': 'string',
            }),
          ).array(),
        ),
        'status?': type("'available' | 'pending' | 'sold'").describe('pet status in the store'),
      }),
    ),
    (c) => {},
  )
  .post(
    '/pet',
    sValidator('json', PetSchema),
    sValidator(
      'form',
      type({
        'id?': type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          ),
        name: 'string',
        'category?': type({
          'id?': type('string')
            .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
            .narrow(
              (data, ctx) =>
                (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
                ctx.mustBe('an int64'),
            ),
          'name?': 'string',
        }),
        photoUrls: type('unknown')
          .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
          .to('string[]'),
        'tags?': type('unknown').pipe(
          (data) => (data === undefined || Array.isArray(data) ? data : [data]),
          type(
            type({
              'id?': type('string')
                .pipe((data, ctx) =>
                  /^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer'),
                )
                .narrow(
                  (data, ctx) =>
                    (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
                    ctx.mustBe('an int64'),
                ),
              'name?': 'string',
            }),
          ).array(),
        ),
        'status?': type("'available' | 'pending' | 'sold'").describe('pet status in the store'),
      }),
    ),
    (c) => {},
  )
  .get(
    '/pet/findByStatus',
    sValidator('query', type({ status: "'available' | 'pending' | 'sold'" })),
    (c) => {},
  )
  .get(
    '/pet/findByTags',
    sValidator(
      'query',
      type({
        tags: type('unknown')
          .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
          .to('string[]'),
      }),
    ),
    (c) => {},
  )
  .get(
    '/pet/:petId',
    sValidator(
      'param',
      type({
        petId: type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          ),
      }),
    ),
    (c) => {},
  )
  .post(
    '/pet/:petId',
    sValidator(
      'param',
      type({
        petId: type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          ),
      }),
    ),
    sValidator('query', type({ 'name?': 'string', 'status?': 'string' })),
    (c) => {},
  )
  .delete(
    '/pet/:petId',
    sValidator(
      'param',
      type({
        petId: type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          ),
      }),
    ),
    sValidator('header', type({ 'api_key?': 'string' })),
    (c) => {},
  )
  .post(
    '/pet/:petId/uploadImage',
    sValidator(
      'param',
      type({
        petId: type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          ),
      }),
    ),
    sValidator('query', type({ 'additionalMetadata?': 'string' })),
    (c) => {},
  )
