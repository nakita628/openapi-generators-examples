import { initTRPC, TRPCError } from '@trpc/server'
import * as v from 'valibot'
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
    .input(v.object({ upload_id: v.pipe(v.string(), v.metadata({ examples: ['upload_abc123'] })) }))
    .output(UploadSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postUploadsUploadIdComplete: t.procedure
    .input(
      v.object({
        upload_id: v.pipe(v.string(), v.metadata({ examples: ['upload_abc123'] })),
        part_ids: v.pipe(v.array(v.string()), v.description('The ordered list of Part IDs.\n')),
        md5: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'The optional md5 checksum for the file contents to verify if the bytes uploaded matches what you expect.\n',
            ),
          ),
        ),
      }),
    )
    .output(UploadSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postUploadsUploadIdParts: t.procedure
    .input(v.object({ upload_id: v.pipe(v.string(), v.metadata({ examples: ['upload_abc123'] })) }))
    .output(UploadPartSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
