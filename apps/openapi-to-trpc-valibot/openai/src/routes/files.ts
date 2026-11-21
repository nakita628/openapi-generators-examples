import { initTRPC, TRPCError } from '@trpc/server'
import * as v from 'valibot'
import { DeleteFileResponseSchema, ListFilesResponseSchema, OpenAIFileSchema } from '../components'

const t = initTRPC.create()

export const filesRouter = t.router({
  getFiles: t.procedure
    .input(
      v.object({
        purpose: v.optional(v.string()),
        limit: v.optional(v.pipe(v.number(), v.integer()), 10000),
        order: v.optional(v.picklist(['asc', 'desc']), 'desc'),
        after: v.optional(v.string()),
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
    .input(v.object({ file_id: v.string() }))
    .output(OpenAIFileSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteFilesFileId: t.procedure
    .input(v.object({ file_id: v.string() }))
    .output(DeleteFileResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getFilesFileIdContent: t.procedure.input(v.object({ file_id: v.string() })).query(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
})
