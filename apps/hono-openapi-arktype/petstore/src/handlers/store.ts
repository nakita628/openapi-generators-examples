import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { type } from 'arktype'
import { OrderSchema } from '../components'

export const storeHandler = new Hono()
  .get(
    '/store/inventory',
    describeRoute({
      tags: ['store'],
      summary: 'Returns pet inventories by status.',
      description: 'Returns a map of status codes to quantities.',
      operationId: 'getInventory',
      responses: {
        '200': {
          description: 'successful operation',
          content: {
            'application/json': {
              schema: resolver(
                type({
                  '[string]': 'number.integer >= -2147483648 & number.integer <= 2147483647',
                }),
              ),
            },
          },
        },
        default: { description: 'Unexpected error' },
      },
      security: [{ api_key: [] }],
    }),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/store/order',
    describeRoute({
      tags: ['store'],
      summary: 'Place an order for a pet.',
      description: 'Place a new order in the store.',
      operationId: 'placeOrder',
      responses: {
        '200': {
          description: 'successful operation',
          content: { 'application/json': { schema: resolver(OrderSchema) } },
        },
        '400': { description: 'Invalid input' },
        '422': { description: 'Validation exception' },
        default: { description: 'Unexpected error' },
      },
    }),
    validator('json', OrderSchema),
    validator(
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
            const value = Number(data)
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
    describeRoute({
      tags: ['store'],
      summary: 'Find purchase order by ID.',
      description:
        'For valid response try integer IDs with value <= 5 or > 10. Other values will generate exceptions.',
      operationId: 'getOrderById',
      responses: {
        '200': {
          description: 'successful operation',
          content: {
            'application/json': { schema: resolver(OrderSchema) },
            'application/xml': { schema: resolver(OrderSchema) },
          },
        },
        '400': { description: 'Invalid ID supplied' },
        '404': { description: 'Order not found' },
        default: { description: 'Unexpected error' },
      },
    }),
    validator(
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
    describeRoute({
      tags: ['store'],
      summary: 'Delete purchase order by identifier.',
      description:
        'For valid response try integer IDs with value < 1000. Anything above 1000 or non-integers will generate API errors.',
      operationId: 'deleteOrder',
      responses: {
        '200': { description: 'order deleted' },
        '400': { description: 'Invalid ID supplied' },
        '404': { description: 'Order not found' },
        default: { description: 'Unexpected error' },
      },
    }),
    validator(
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
