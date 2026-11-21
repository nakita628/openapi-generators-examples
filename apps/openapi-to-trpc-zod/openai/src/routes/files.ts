import { initTRPC, TRPCError } from '@trpc/server'
import * as z from 'zod'
import { DeleteFileResponseSchema, ListFilesResponseSchema, OpenAIFileSchema } from '../components'

const t = initTRPC.create()

export const filesRouter = t.router({
  getFiles: t.procedure
    .input(
      z.object({
        purpose: z.string().exactOptional(),
        limit: z.int().default(10000).exactOptional(),
        order: z.enum(['asc', 'desc']).default('desc').exactOptional(),
        after: z.string().exactOptional(),
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
    .input(z.object({ file_id: z.string() }))
    .output(OpenAIFileSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteFilesFileId: t.procedure
    .input(z.object({ file_id: z.string() }))
    .output(DeleteFileResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getFilesFileIdContent: t.procedure.input(z.object({ file_id: z.string() })).query(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
})
