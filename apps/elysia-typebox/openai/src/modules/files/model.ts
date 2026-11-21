import { t, type UnwrapSchema } from 'elysia'

export const FilesModel = {
  listFilesQuery: t.Object({
    purpose: t.Optional(t.String()),
    limit: t.Optional(t.Integer({ maximum: 9007199254740991, default: 10000 })),
    order: t.Optional(t.UnionEnum(['asc', 'desc'], { default: 'desc' })),
    after: t.Optional(t.String()),
  }),
  retrieveFileParams: t.Object({ file_id: t.String() }),
  deleteFileParams: t.Object({ file_id: t.String() }),
  downloadFileParams: t.Object({ file_id: t.String() }),
} as const

export type FilesModel = { [k in keyof typeof FilesModel]: UnwrapSchema<(typeof FilesModel)[k]> }
