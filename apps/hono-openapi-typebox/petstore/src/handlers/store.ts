import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Type, Codec } from 'typebox'
import { Compile } from 'typebox/compile'
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
              schema: resolver(Compile(Type.Record(Type.String(), Type.Integer()))),
            },
          },
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
          content: { 'application/json': { schema: resolver(Compile(OrderSchema)) } },
        },
        '400': { description: 'Invalid input' },
        '422': { description: 'Validation exception' },
        default: { description: 'Unexpected error' },
      },
    }),
    validator('json', Compile(OrderSchema)),
    validator(
      'form',
      Compile(
        Type.Object({
          id: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number.parseInt(value, 10))
              .Encode((value) => String(value)),
          ),
          petId: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number.parseInt(value, 10))
              .Encode((value) => String(value)),
          ),
          quantity: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number.parseInt(value, 10))
              .Encode((value) => String(value)),
          ),
          shipDate: Type.Optional(Type.String({ format: 'date-time' })),
          status: Type.Optional(
            Type.Union(
              [Type.Literal('placed'), Type.Literal('approved'), Type.Literal('delivered')],
              { description: 'Order Status', examples: ['approved'] },
            ),
          ),
          complete: Type.Optional(
            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
              .Decode((value) => value === 'true')
              .Encode((value) => (value ? 'true' : 'false')),
          ),
        }),
      ),
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
            'application/json': { schema: resolver(Compile(OrderSchema)) },
            'application/xml': { schema: resolver(Compile(OrderSchema)) },
          },
        },
        '400': { description: 'Invalid ID supplied' },
        '404': { description: 'Order not found' },
        default: { description: 'Unexpected error' },
      },
    }),
    validator(
      'param',
      Compile(
        Type.Object({
          orderId: Codec(Type.String())
            .Decode((value) => Number.parseInt(value, 10))
            .Encode((value) => String(value)),
        }),
      ),
    ),
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
    validator(
      'param',
      Compile(
        Type.Object({
          orderId: Codec(Type.String())
            .Decode((value) => Number.parseInt(value, 10))
            .Encode((value) => String(value)),
        }),
      ),
    ),
    (c) => {},
  )
