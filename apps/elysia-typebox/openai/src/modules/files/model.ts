import { t, type UnwrapSchema } from 'elysia'
import { FileExpirationAfterSchema } from '../../components/schemas'

export const FilesModel = {
  listFilesQuery: t.Object({
    purpose: t.Optional(t.String()),
    limit: t.Optional(t.Integer({ maximum: 9007199254740991, default: 10000 })),
    order: t.Optional(t.UnionEnum(['asc', 'desc'], { default: 'desc' })),
    after: t.Optional(t.String()),
  }),
  createFileBody: t.Form(
    {
      file: t.File({ description: 'The File object (not file name) to be uploaded.\n' }),
      purpose: t.UnionEnum(['assistants', 'batch', 'fine-tune', 'vision', 'user_data', 'evals'], {
        description:
          'The intended purpose of the uploaded file. One of:\n- `assistants`: Used in the Assistants API\n- `batch`: Used in the Batch API\n- `fine-tune`: Used for fine-tuning\n- `vision`: Images used for vision fine-tuning\n- `user_data`: Flexible file type for any purpose\n- `evals`: Used for eval data sets\n',
        default: undefined,
      }),
      expires_after: t.Optional(FileExpirationAfterSchema),
    },
    { additionalProperties: false },
  ),
  retrieveFileParams: t.Object({ file_id: t.String() }),
  deleteFileParams: t.Object({ file_id: t.String() }),
  downloadFileParams: t.Object({ file_id: t.String() }),
} as const

export type FilesModel = { [k in keyof typeof FilesModel]: UnwrapSchema<(typeof FilesModel)[k]> }
