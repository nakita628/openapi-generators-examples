import { t, type UnwrapSchema } from 'elysia'

export const UploadsModel = {
  cancelUploadParams: t.Object({ upload_id: t.String({ example: 'upload_abc123' }) }),
  completeUploadParams: t.Object({ upload_id: t.String({ example: 'upload_abc123' }) }),
  addUploadPartParams: t.Object({ upload_id: t.String({ example: 'upload_abc123' }) }),
  addUploadPartBody: t.Form(
    { data: t.File({ description: 'The chunk of bytes for this Part.\n' }) },
    { additionalProperties: false },
  ),
} as const

export type UploadsModel = {
  [k in keyof typeof UploadsModel]: UnwrapSchema<(typeof UploadsModel)[k]>
}
