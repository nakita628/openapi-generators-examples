import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Schema, SchemaTransformation } from 'effect'
import { SnowflakeTypeSchema } from '../components'

export const skusHandler = new Hono()
  .get(
    '/skus/:sku_id/subscriptions',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ sku_id: SnowflakeTypeSchema }))),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          before: Schema.optionalKey(SnowflakeTypeSchema),
          after: Schema.optionalKey(SnowflakeTypeSchema),
          limit: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(
                Schema.isInt(),
                Schema.isGreaterThanOrEqualTo(1),
                Schema.isLessThanOrEqualTo(100),
              ),
          ),
          user_id: Schema.optionalKey(SnowflakeTypeSchema),
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
      Schema.toStandardSchemaV1(
        Schema.Struct({ user_id: Schema.optionalKey(SnowflakeTypeSchema) }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
