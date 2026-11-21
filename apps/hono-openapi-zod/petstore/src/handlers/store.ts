import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import * as z from 'zod'
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
          content: { 'application/json': { schema: resolver(z.record(z.string(), z.int32())) } },
        },
        default: { description: 'Unexpected error' },
      },
      security: [{ api_key: [] }],
    }),
    (c) => {},
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
      z.object({
        id: z.coerce
          .bigint()
          .pipe(z.int64())
          .meta({ examples: [10] })
          .exactOptional(),
        petId: z.coerce
          .bigint()
          .pipe(z.int64())
          .meta({ examples: [198772] })
          .exactOptional(),
        quantity: z.coerce
          .number()
          .pipe(z.int32())
          .meta({ examples: [7] })
          .exactOptional(),
        shipDate: z.iso.datetime({ offset: true }).exactOptional(),
        status: z
          .enum(['placed', 'approved', 'delivered'])
          .meta({ description: 'Order Status', examples: ['approved'] })
          .exactOptional(),
        complete: z.stringbool().exactOptional(),
      }),
    ),
    (c) => {},
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
    validator('param', z.object({ orderId: z.coerce.bigint().pipe(z.int64()) })),
    (c) => {},
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
    validator('param', z.object({ orderId: z.coerce.bigint().pipe(z.int64()) })),
    (c) => {},
  )
