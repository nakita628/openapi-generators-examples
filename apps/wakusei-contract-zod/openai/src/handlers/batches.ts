import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getBatches = os.getBatches.handler(async ({ input }) => {})
export const postBatches = os.postBatches.handler(async ({ input }) => {})
export const getBatchesBatchId = os.getBatchesBatchId.handler(async ({ input }) => {})
export const postBatchesBatchIdCancel = os.postBatchesBatchIdCancel.handler(async ({ input }) => {})
