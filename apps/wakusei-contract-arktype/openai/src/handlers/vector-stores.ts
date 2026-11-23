import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getVectorStores = os.getVectorStores.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postVectorStores = os.postVectorStores.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getVectorStoresVectorStoreId = os.getVectorStoresVectorStoreId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postVectorStoresVectorStoreId = os.postVectorStoresVectorStoreId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const deleteVectorStoresVectorStoreId = os.deleteVectorStoresVectorStoreId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postVectorStoresVectorStoreIdFileBatches =
  os.postVectorStoresVectorStoreIdFileBatches.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getVectorStoresVectorStoreIdFileBatchesBatchId =
  os.getVectorStoresVectorStoreIdFileBatchesBatchId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postVectorStoresVectorStoreIdFileBatchesBatchIdCancel =
  os.postVectorStoresVectorStoreIdFileBatchesBatchIdCancel.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getVectorStoresVectorStoreIdFileBatchesBatchIdFiles =
  os.getVectorStoresVectorStoreIdFileBatchesBatchIdFiles.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getVectorStoresVectorStoreIdFiles = os.getVectorStoresVectorStoreIdFiles.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postVectorStoresVectorStoreIdFiles = os.postVectorStoresVectorStoreIdFiles.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getVectorStoresVectorStoreIdFilesFileId =
  os.getVectorStoresVectorStoreIdFilesFileId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postVectorStoresVectorStoreIdFilesFileId =
  os.postVectorStoresVectorStoreIdFilesFileId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const deleteVectorStoresVectorStoreIdFilesFileId =
  os.deleteVectorStoresVectorStoreIdFilesFileId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getVectorStoresVectorStoreIdFilesFileIdContent =
  os.getVectorStoresVectorStoreIdFilesFileIdContent.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postVectorStoresVectorStoreIdSearch = os.postVectorStoresVectorStoreIdSearch.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
