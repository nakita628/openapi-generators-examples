import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Type, Codec, type StaticDecode, type StaticEncode, type TSchema } from 'typebox'
import { Compile } from 'typebox/compile'
import { OrderSchema } from '../components'

const toStandardSchemaV1 = <T extends TSchema>(schema: T) => {
  const validator = Compile(schema)
  return Object.assign(validator, {
    '~standard': {
      version: 1 as const,
      vendor: 'typebox',
      validate: (value: unknown) =>
        validator.Check(value)
          ? { value: validator.Decode(value) }
          : {
              issues: validator.Errors(value).map((error) => ({
                message: error.message,
                path: error.instancePath
                  .split('/')
                  .slice(1)
                  .map((key) => key.replaceAll('~1', '/').replaceAll('~0', '~')),
              })),
            },
      types: undefined as
        | { readonly input: StaticEncode<T>; readonly output: StaticDecode<T> }
        | undefined,
    },
  })
}

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
              schema: resolver(toStandardSchemaV1(Type.Record(Type.String(), Type.Integer()))),
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
          content: { 'application/json': { schema: resolver(toStandardSchemaV1(OrderSchema)) } },
        },
        '400': { description: 'Invalid input' },
        '422': { description: 'Validation exception' },
        default: { description: 'Unexpected error' },
      },
    }),
    validator('json', toStandardSchemaV1(OrderSchema)),
    validator(
      'form',
      toStandardSchemaV1(
        Type.Object({
          id: Type.Optional(
            Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          petId: Type.Optional(
            Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          quantity: Type.Optional(
            Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
              .Decode((value) => Number(value))
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
            Codec(
              Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
            )
              .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
              .Encode((value) => (value ? 'true' : 'false')),
          ),
        }),
      ),
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
            'application/json': { schema: resolver(toStandardSchemaV1(OrderSchema)) },
            'application/xml': { schema: resolver(toStandardSchemaV1(OrderSchema)) },
          },
        },
        '400': { description: 'Invalid ID supplied' },
        '404': { description: 'Order not found' },
        default: { description: 'Unexpected error' },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({
          orderId: Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        }),
      ),
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
      toStandardSchemaV1(
        Type.Object({
          orderId: Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
