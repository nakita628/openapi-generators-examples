import { t, type UnwrapSchema } from 'elysia'

export const UploadsModel = {
  cancelUploadParams: t.Object({ upload_id: t.String({ example: 'upload_abc123' }) }),
  completeUploadParams: t.Object({ upload_id: t.String({ example: 'upload_abc123' }) }),
  addUploadPartParams: t.Object({ upload_id: t.String({ example: 'upload_abc123' }) }),
} as const

export type UploadsModel = {
  [k in keyof typeof UploadsModel]: UnwrapSchema<(typeof UploadsModel)[k]>
}
