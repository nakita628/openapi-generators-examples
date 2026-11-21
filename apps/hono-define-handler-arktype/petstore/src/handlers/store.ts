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
    getStoreInventoryHandler(async (c) => {}),
  )
  .post(
    '/store/order',
    postStoreOrderHandler(async (c, { form, json }) => {}),
  )
  .get(
    '/store/order/:orderId',
    getStoreOrderOrderIdHandler(async (c, { param }) => {}),
  )
  .delete(
    '/store/order/:orderId',
    deleteStoreOrderOrderIdHandler(async (c, { param }) => {}),
  )
