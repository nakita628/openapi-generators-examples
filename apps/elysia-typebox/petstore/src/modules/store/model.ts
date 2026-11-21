import { t, type UnwrapSchema } from 'elysia'

export const StoreModel = {
  getInventoryResponse200: t.Record(
    t.String(),
    t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  ),
  getOrderByIdParams: t.Object({
    orderId: t.Integer({ format: 'int64', maximum: 9007199254740991 }),
  }),
  deleteOrderParams: t.Object({
    orderId: t.Integer({ format: 'int64', maximum: 9007199254740991 }),
  }),
} as const

export type StoreModel = { [k in keyof typeof StoreModel]: UnwrapSchema<(typeof StoreModel)[k]> }
