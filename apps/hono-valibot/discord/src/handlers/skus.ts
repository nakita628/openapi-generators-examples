import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'
import { SnowflakeTypeSchema } from '../components'

export const skusHandler = new Hono()
  .get(
    '/skus/:sku_id/subscriptions',
    sValidator('param', v.object({ sku_id: SnowflakeTypeSchema })),
    sValidator(
      'query',
      v.partial(
        v.object({
          before: SnowflakeTypeSchema,
          after: SnowflakeTypeSchema,
          limit: v.pipe(
            v.string(),
            v.transform(Number),
            v.number(),
            v.safeInteger(),
            v.minValue(1),
            v.maxValue(100),
          ),
          user_id: SnowflakeTypeSchema,
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/skus/:sku_id/subscriptions/:subscription_id',
    sValidator(
      'param',
      v.object({ sku_id: SnowflakeTypeSchema, subscription_id: SnowflakeTypeSchema }),
    ),
    sValidator('query', v.partial(v.object({ user_id: SnowflakeTypeSchema }))),
    (c) => {},
  )
