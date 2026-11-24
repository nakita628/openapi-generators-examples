import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'
import { SnowflakeTypeSchema } from '../components'

export const skusHandler = new Hono()
  .get(
    '/skus/:sku_id/subscriptions',
    sValidator('param', z.object({ sku_id: SnowflakeTypeSchema })),
    sValidator(
      'query',
      z.object({
        before: SnowflakeTypeSchema.exactOptional(),
        after: SnowflakeTypeSchema.exactOptional(),
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(1).max(100),
          )
          .exactOptional(),
        user_id: SnowflakeTypeSchema.exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/skus/:sku_id/subscriptions/:subscription_id',
    sValidator(
      'param',
      z.object({ sku_id: SnowflakeTypeSchema, subscription_id: SnowflakeTypeSchema }),
    ),
    sValidator('query', z.object({ user_id: SnowflakeTypeSchema.exactOptional() })),
    (c) => { throw new Error('Not implemented') },
  )
