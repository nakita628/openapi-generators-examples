import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'
import { OrderSchema } from '../components'

export const storeHandler = new Hono()
  .get('/store/inventory', (c) => { throw new Error('Not implemented') })
  .post(
    '/store/order',
    sValidator('json', OrderSchema),
    sValidator(
      'form',
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
            v.metadata({ examples: [10] }),
          ),
          petId: v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^-?\d+$/),
              v.transform((input) => BigInt(input)),
              v.minValue(-9223372036854775808n),
              v.maxValue(9223372036854775807n),
            ),
            v.metadata({ examples: [198772] }),
          ),
          quantity: v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
              v.minValue(-2147483648),
              v.maxValue(2147483647),
            ),
            v.metadata({ examples: [7] }),
          ),
          shipDate: v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
            ),
          ),
          status: v.pipe(
            v.picklist(['placed', 'approved', 'delivered']),
            v.description('Order Status'),
            v.metadata({ examples: ['approved'] }),
          ),
          complete: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/store/order/:orderId',
    sValidator(
      'param',
      v.object({
        orderId: v.pipe(
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
  .delete(
    '/store/order/:orderId',
    sValidator(
      'param',
      v.object({
        orderId: v.pipe(
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
