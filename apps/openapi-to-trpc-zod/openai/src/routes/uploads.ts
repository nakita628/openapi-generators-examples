import { initTRPC, TRPCError } from '@trpc/server'
import * as z from 'zod'
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
    .input(z.object({ upload_id: z.string().meta({ examples: ['upload_abc123'] }) }))
    .output(UploadSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postUploadsUploadIdComplete: t.procedure
    .input(
      z.object({
        upload_id: z.string().meta({ examples: ['upload_abc123'] }),
        part_ids: z.array(z.string()).meta({ description: 'The ordered list of Part IDs.\n' }),
        md5: z
          .string()
          .meta({
            description:
              'The optional md5 checksum for the file contents to verify if the bytes uploaded matches what you expect.\n',
          })
          .exactOptional(),
      }),
    )
    .output(UploadSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postUploadsUploadIdParts: t.procedure
    .input(z.object({ upload_id: z.string().meta({ examples: ['upload_abc123'] }) }))
    .output(UploadPartSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
