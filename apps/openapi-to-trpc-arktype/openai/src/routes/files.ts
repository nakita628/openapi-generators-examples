import { initTRPC, TRPCError } from '@trpc/server'
import { type } from 'arktype'
import { DeleteFileResponseSchema, ListFilesResponseSchema, OpenAIFileSchema } from '../components'

const t = initTRPC.create()

export const filesRouter = t.router({
  getFiles: t.procedure
    .input(
      type({
        'purpose?': 'string',
        'limit?': 'number.integer',
        'order?': "'asc' | 'desc'",
        'after?': 'string',
      }),
    )
    .output(ListFilesResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postFiles: t.procedure.output(OpenAIFileSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getFilesFileId: t.procedure
    .input(type({ file_id: 'string' }))
    .output(OpenAIFileSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteFilesFileId: t.procedure
    .input(type({ file_id: 'string' }))
    .output(DeleteFileResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getFilesFileIdContent: t.procedure.input(type({ file_id: 'string' })).query(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
})
