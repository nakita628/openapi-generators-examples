import { t, type UnwrapSchema } from 'elysia'

export const VectorStoresModel = {
  listVectorStoresQuery: t.Object({
    limit: t.Optional(t.Integer({ maximum: 9007199254740991, default: 20 })),
    order: t.Optional(t.UnionEnum(['asc', 'desc'], { default: 'desc' })),
    after: t.Optional(t.String()),
    before: t.Optional(t.String()),
  }),
  getVectorStoreParams: t.Object({ vector_store_id: t.String() }),
  modifyVectorStoreParams: t.Object({ vector_store_id: t.String() }),
  deleteVectorStoreParams: t.Object({ vector_store_id: t.String() }),
  createVectorStoreFileBatchParams: t.Object({
    vector_store_id: t.String({ example: 'vs_abc123' }),
  }),
  getVectorStoreFileBatchParams: t.Object({
    vector_store_id: t.String({ example: 'vs_abc123' }),
    batch_id: t.String({ example: 'vsfb_abc123' }),
  }),
  cancelVectorStoreFileBatchParams: t.Object({ vector_store_id: t.String(), batch_id: t.String() }),
  listFilesInVectorStoreBatchParams: t.Object({
    vector_store_id: t.String(),
    batch_id: t.String(),
  }),
  listFilesInVectorStoreBatchQuery: t.Object({
    limit: t.Optional(t.Integer({ maximum: 9007199254740991, default: 20 })),
    order: t.Optional(t.UnionEnum(['asc', 'desc'], { default: 'desc' })),
    after: t.Optional(t.String()),
    before: t.Optional(t.String()),
    filter: t.Optional(
      t.UnionEnum(['in_progress', 'completed', 'failed', 'cancelled'], { default: undefined }),
    ),
  }),
  listVectorStoreFilesParams: t.Object({ vector_store_id: t.String() }),
  listVectorStoreFilesQuery: t.Object({
    limit: t.Optional(t.Integer({ maximum: 9007199254740991, default: 20 })),
    order: t.Optional(t.UnionEnum(['asc', 'desc'], { default: 'desc' })),
    after: t.Optional(t.String()),
    before: t.Optional(t.String()),
    filter: t.Optional(
      t.UnionEnum(['in_progress', 'completed', 'failed', 'cancelled'], { default: undefined }),
    ),
  }),
  createVectorStoreFileParams: t.Object({ vector_store_id: t.String({ example: 'vs_abc123' }) }),
  getVectorStoreFileParams: t.Object({
    vector_store_id: t.String({ example: 'vs_abc123' }),
    file_id: t.String({ example: 'file-abc123' }),
  }),
  updateVectorStoreFileAttributesParams: t.Object({
    vector_store_id: t.String({ example: 'vs_abc123' }),
    file_id: t.String({ example: 'file-abc123' }),
  }),
  deleteVectorStoreFileParams: t.Object({ vector_store_id: t.String(), file_id: t.String() }),
  retrieveVectorStoreFileContentParams: t.Object({
    vector_store_id: t.String({ example: 'vs_abc123' }),
    file_id: t.String({ example: 'file-abc123' }),
  }),
  searchVectorStoreParams: t.Object({ vector_store_id: t.String({ example: 'vs_abc123' }) }),
} as const

export type VectorStoresModel = {
  [k in keyof typeof VectorStoresModel]: UnwrapSchema<(typeof VectorStoresModel)[k]>
}
