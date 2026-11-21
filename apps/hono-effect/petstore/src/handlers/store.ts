import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Schema, SchemaTransformation } from 'effect'
import { OrderSchema } from '../components'

export const storeHandler = new Hono()
  .get('/store/inventory', (c) => {})
  .post(
    '/store/order',
    sValidator('json', Schema.toStandardSchemaV1(OrderSchema)),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.optional(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
            ).annotate({ jsonSchemaExamples: [10] }),
          ),
          petId: Schema.optional(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
            ).annotate({ jsonSchemaExamples: [198772] }),
          ),
          quantity: Schema.optional(
            Schema.FiniteFromString.check(Schema.isInt32()).annotate({ jsonSchemaExamples: [7] }),
          ),
          shipDate: Schema.optional(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
              ),
            ),
          ),
          status: Schema.optional(
            Schema.Literals(['placed', 'approved', 'delivered']).annotate({
              description: 'Order Status',
              jsonSchemaExamples: ['approved'],
            }),
          ),
          complete: Schema.optional(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/store/order/:orderId',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          orderId: Schema.BigIntFromString.check(
            Schema.isBetweenBigInt({
              minimum: -9223372036854775808n,
              maximum: 9223372036854775807n,
            }),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .delete(
    '/store/order/:orderId',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          orderId: Schema.BigIntFromString.check(
            Schema.isBetweenBigInt({
              minimum: -9223372036854775808n,
              maximum: 9223372036854775807n,
            }),
          ),
        }),
      ),
    ),
    (c) => {},
  )
