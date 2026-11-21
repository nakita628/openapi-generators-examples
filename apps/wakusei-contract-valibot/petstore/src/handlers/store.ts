import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getStoreInventory = os.getStoreInventory.handler(async ({ input }) => {})
export const postStoreOrder = os.postStoreOrder.handler(async ({ input }) => {})
export const getStoreOrderOrderId = os.getStoreOrderOrderId.handler(async ({ input }) => {})
export const deleteStoreOrderOrderId = os.deleteStoreOrderOrderId.handler(async ({ input }) => {})
