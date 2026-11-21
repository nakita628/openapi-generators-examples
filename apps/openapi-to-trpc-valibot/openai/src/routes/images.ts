import { initTRPC, TRPCError } from '@trpc/server'
import {
  CreateImageRequestSchema,
  EditImageBodyJsonParamSchema,
  ImagesResponseSchema,
} from '../components'

const t = initTRPC.create()

export const imagesRouter = t.router({
  postImagesEdits: t.procedure
    .input(EditImageBodyJsonParamSchema)
    .output(ImagesResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postImagesGenerations: t.procedure
    .input(CreateImageRequestSchema)
    .output(ImagesResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postImagesVariations: t.procedure.output(ImagesResponseSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
})
