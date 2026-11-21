import { Hono } from 'hono'
import {
  getStoreInventoryHandler,
  postStoreOrderHandler,
  getStoreOrderOrderIdHandler,
  deleteStoreOrderOrderIdHandler,
} from '../routes'

export const storeHandler = new Hono()
  .get(
    '/store/inventory',
    getStoreInventoryHandler(async (c) => { throw new Error('Not implemented') }),
  )
  .post(
    '/store/order',
    postStoreOrderHandler(async (c, { form, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/store/order/:orderId',
    getStoreOrderOrderIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/store/order/:orderId',
    deleteStoreOrderOrderIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
