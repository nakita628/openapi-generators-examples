import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getVectorStores = os.getVectorStores.handler(async ({ input }) => {})
export const postVectorStores = os.postVectorStores.handler(async ({ input }) => {})
export const getVectorStoresVectorStoreId = os.getVectorStoresVectorStoreId.handler(
  async ({ input }) => {},
)
export const postVectorStoresVectorStoreId = os.postVectorStoresVectorStoreId.handler(
  async ({ input }) => {},
)
export const deleteVectorStoresVectorStoreId = os.deleteVectorStoresVectorStoreId.handler(
  async ({ input }) => {},
)
export const postVectorStoresVectorStoreIdFileBatches =
  os.postVectorStoresVectorStoreIdFileBatches.handler(async ({ input }) => {})
export const getVectorStoresVectorStoreIdFileBatchesBatchId =
  os.getVectorStoresVectorStoreIdFileBatchesBatchId.handler(async ({ input }) => {})
export const postVectorStoresVectorStoreIdFileBatchesBatchIdCancel =
  os.postVectorStoresVectorStoreIdFileBatchesBatchIdCancel.handler(async ({ input }) => {})
export const getVectorStoresVectorStoreIdFileBatchesBatchIdFiles =
  os.getVectorStoresVectorStoreIdFileBatchesBatchIdFiles.handler(async ({ input }) => {})
export const getVectorStoresVectorStoreIdFiles = os.getVectorStoresVectorStoreIdFiles.handler(
  async ({ input }) => {},
)
export const postVectorStoresVectorStoreIdFiles = os.postVectorStoresVectorStoreIdFiles.handler(
  async ({ input }) => {},
)
export const getVectorStoresVectorStoreIdFilesFileId =
  os.getVectorStoresVectorStoreIdFilesFileId.handler(async ({ input }) => {})
export const postVectorStoresVectorStoreIdFilesFileId =
  os.postVectorStoresVectorStoreIdFilesFileId.handler(async ({ input }) => {})
export const deleteVectorStoresVectorStoreIdFilesFileId =
  os.deleteVectorStoresVectorStoreIdFilesFileId.handler(async ({ input }) => {})
export const getVectorStoresVectorStoreIdFilesFileIdContent =
  os.getVectorStoresVectorStoreIdFilesFileIdContent.handler(async ({ input }) => {})
export const postVectorStoresVectorStoreIdSearch = os.postVectorStoresVectorStoreIdSearch.handler(
  async ({ input }) => {},
)
