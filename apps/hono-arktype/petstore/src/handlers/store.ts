import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'
import { OrderSchema } from '../components'

export const storeHandler = new Hono()
  .get('/store/inventory', (c) => { throw new Error('Not implemented') })
  .post(
    '/store/order',
    sValidator('json', OrderSchema),
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
        'petId?': type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          ),
        'quantity?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= -2147483648 & number.integer <= 2147483647'),
        'shipDate?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
        'status?': type("'placed' | 'approved' | 'delivered'").describe('Order Status'),
        'complete?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe((data) =>
          /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/store/order/:orderId',
    sValidator(
      'param',
      type({
        orderId: type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/store/order/:orderId',
    sValidator(
      'param',
      type({
        orderId: type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
