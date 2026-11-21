import { t, type UnwrapSchema } from 'elysia'

export const BatchesModel = {
  listBatchesQuery: t.Object({
    after: t.Optional(t.String()),
    limit: t.Optional(t.Integer({ maximum: 9007199254740991, default: 20 })),
  }),
  retrieveBatchParams: t.Object({ batch_id: t.String() }),
  cancelBatchParams: t.Object({ batch_id: t.String() }),
} as const

export type BatchesModel = {
  [k in keyof typeof BatchesModel]: UnwrapSchema<(typeof BatchesModel)[k]>
}
