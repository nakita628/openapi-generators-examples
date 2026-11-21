import { initTRPC, TRPCError } from '@trpc/server'
import { type } from 'arktype'
import { CreateUploadRequestSchema, UploadPartSchema, UploadSchema } from '../components'

const t = initTRPC.create()

export const uploadsRouter = t.router({
  postUploads: t.procedure
    .input(CreateUploadRequestSchema)
    .output(UploadSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postUploadsUploadIdCancel: t.procedure
    .input(type({ upload_id: 'string' }))
    .output(UploadSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postUploadsUploadIdComplete: t.procedure
    .input(
      type({
        upload_id: 'string',
        part_ids: type('string[]').describe('The ordered list of Part IDs.\n'),
        'md5?': type('string').describe(
          'The optional md5 checksum for the file contents to verify if the bytes uploaded matches what you expect.\n',
        ),
      }),
    )
    .output(UploadSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postUploadsUploadIdParts: t.procedure
    .input(type({ upload_id: 'string' }))
    .output(UploadPartSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
