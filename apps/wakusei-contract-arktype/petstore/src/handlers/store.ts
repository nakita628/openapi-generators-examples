import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getStoreInventory = os.getStoreInventory.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postStoreOrder = os.postStoreOrder.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getStoreOrderOrderId = os.getStoreOrderOrderId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const deleteStoreOrderOrderId = os.deleteStoreOrderOrderId.handler(async ({ input }) => { throw new Error('Not implemented') })
