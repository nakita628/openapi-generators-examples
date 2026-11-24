import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type, Codec } from 'typebox'
import { SnowflakeTypeSchema } from '../components'

export const skusHandler = new Hono()
  .get(
    '/skus/:sku_id/subscriptions',
    tbValidator('param', Type.Object({ sku_id: SnowflakeTypeSchema })),
    tbValidator(
      'query',
      Type.Object({
        before: Type.Optional(SnowflakeTypeSchema),
        after: Type.Optional(SnowflakeTypeSchema),
        limit: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 100,
              () => 'must be <= 100',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        user_id: Type.Optional(SnowflakeTypeSchema),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/skus/:sku_id/subscriptions/:subscription_id',
    tbValidator(
      'param',
      Type.Object({ sku_id: SnowflakeTypeSchema, subscription_id: SnowflakeTypeSchema }),
    ),
    tbValidator('query', Type.Object({ user_id: Type.Optional(SnowflakeTypeSchema) })),
    (c) => { throw new Error('Not implemented') },
  )
