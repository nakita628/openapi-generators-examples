import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'
import { SnowflakeTypeSchema } from '../components'

export const skusHandler = new Hono()
  .get(
    '/skus/:sku_id/subscriptions',
    sValidator('param', type({ sku_id: SnowflakeTypeSchema })),
    sValidator(
      'query',
      type({
        'before?': SnowflakeTypeSchema,
        'after?': SnowflakeTypeSchema,
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 1 & number.integer <= 100'),
        'user_id?': SnowflakeTypeSchema,
      }),
    ),
    (c) => {},
  )
  .get(
    '/skus/:sku_id/subscriptions/:subscription_id',
    sValidator(
      'param',
      type({ sku_id: SnowflakeTypeSchema, subscription_id: SnowflakeTypeSchema }),
    ),
    sValidator('query', type({ 'user_id?': SnowflakeTypeSchema })),
    (c) => {},
  )
