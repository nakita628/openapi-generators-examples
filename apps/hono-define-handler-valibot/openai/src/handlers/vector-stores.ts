import { Hono } from 'hono'
import {
  getVectorStoresHandler,
  postVectorStoresHandler,
  getVectorStoresVectorStoreIdHandler,
  postVectorStoresVectorStoreIdHandler,
  deleteVectorStoresVectorStoreIdHandler,
  postVectorStoresVectorStoreIdFileBatchesHandler,
  getVectorStoresVectorStoreIdFileBatchesBatchIdHandler,
  postVectorStoresVectorStoreIdFileBatchesBatchIdCancelHandler,
  getVectorStoresVectorStoreIdFileBatchesBatchIdFilesHandler,
  getVectorStoresVectorStoreIdFilesHandler,
  postVectorStoresVectorStoreIdFilesHandler,
  getVectorStoresVectorStoreIdFilesFileIdHandler,
  postVectorStoresVectorStoreIdFilesFileIdHandler,
  deleteVectorStoresVectorStoreIdFilesFileIdHandler,
  getVectorStoresVectorStoreIdFilesFileIdContentHandler,
  postVectorStoresVectorStoreIdSearchHandler,
} from '../routes'

export const vectorStoresHandler = new Hono()
  .get(
    '/vector_stores',
    getVectorStoresHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/vector_stores',
    postVectorStoresHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/vector_stores/:vector_store_id',
    getVectorStoresVectorStoreIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/vector_stores/:vector_store_id',
    postVectorStoresVectorStoreIdHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/vector_stores/:vector_store_id',
    deleteVectorStoresVectorStoreIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/vector_stores/:vector_store_id/file_batches',
    postVectorStoresVectorStoreIdFileBatchesHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/vector_stores/:vector_store_id/file_batches/:batch_id',
    getVectorStoresVectorStoreIdFileBatchesBatchIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/vector_stores/:vector_store_id/file_batches/:batch_id/cancel',
    postVectorStoresVectorStoreIdFileBatchesBatchIdCancelHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/vector_stores/:vector_store_id/file_batches/:batch_id/files',
    getVectorStoresVectorStoreIdFileBatchesBatchIdFilesHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/vector_stores/:vector_store_id/files',
    getVectorStoresVectorStoreIdFilesHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/vector_stores/:vector_store_id/files',
    postVectorStoresVectorStoreIdFilesHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/vector_stores/:vector_store_id/files/:file_id',
    getVectorStoresVectorStoreIdFilesFileIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/vector_stores/:vector_store_id/files/:file_id',
    postVectorStoresVectorStoreIdFilesFileIdHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/vector_stores/:vector_store_id/files/:file_id',
    deleteVectorStoresVectorStoreIdFilesFileIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/vector_stores/:vector_store_id/files/:file_id/content',
    getVectorStoresVectorStoreIdFilesFileIdContentHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/vector_stores/:vector_store_id/search',
    postVectorStoresVectorStoreIdSearchHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
