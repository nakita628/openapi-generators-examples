import { Elysia, t } from 'elysia'
import { OrderSchema } from '../../components/schemas'
import { StoreModel } from './model'

export const store = new Elysia()
  .model({ Order: OrderSchema })
  .get('/store/inventory', () => {}, {
    response: { 200: StoreModel.getInventoryResponse200, default: t.Void() },
    detail: {
      tags: ['store'],
      summary: 'Returns pet inventories by status.',
      description: 'Returns a map of status codes to quantities.',
      operationId: 'getInventory',
      security: [{ api_key: [] }],
    },
  })
  .post('/store/order', ({ body }) => {}, {
    body: 'Order',
    response: { 200: 'Order', 400: t.Void(), 422: t.Void(), default: t.Void() },
    detail: {
      tags: ['store'],
      summary: 'Place an order for a pet.',
      description: 'Place a new order in the store.',
      operationId: 'placeOrder',
    },
  })
  .get('/store/order/:orderId', ({ params }) => {}, {
    params: StoreModel.getOrderByIdParams,
    response: { 200: 'Order', 400: t.Void(), 404: t.Void(), default: t.Void() },
    detail: {
      tags: ['store'],
      summary: 'Find purchase order by ID.',
      description:
        'For valid response try integer IDs with value <= 5 or > 10. Other values will generate exceptions.',
      operationId: 'getOrderById',
    },
  })
  .delete('/store/order/:orderId', ({ params }) => {}, {
    params: StoreModel.deleteOrderParams,
    response: { 200: t.Void(), 400: t.Void(), 404: t.Void(), default: t.Void() },
    detail: {
      tags: ['store'],
      summary: 'Delete purchase order by identifier.',
      description:
        'For valid response try integer IDs with value < 1000. Anything above 1000 or non-integers will generate API errors.',
      operationId: 'deleteOrder',
    },
  })
