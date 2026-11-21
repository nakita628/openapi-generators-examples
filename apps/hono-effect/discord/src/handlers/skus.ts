import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Schema } from 'effect'
import { SnowflakeTypeSchema } from '../components'

export const skusHandler = new Hono()
  .get(
    '/skus/:sku_id/subscriptions',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ sku_id: SnowflakeTypeSchema }))),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          before: Schema.optional(SnowflakeTypeSchema),
          after: Schema.optional(SnowflakeTypeSchema),
          limit: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(1),
              Schema.isLessThanOrEqualTo(100),
            ),
          ),
          user_id: Schema.optional(SnowflakeTypeSchema),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/skus/:sku_id/subscriptions/:subscription_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ sku_id: SnowflakeTypeSchema, subscription_id: SnowflakeTypeSchema }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(Schema.Struct({ user_id: Schema.optional(SnowflakeTypeSchema) })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
