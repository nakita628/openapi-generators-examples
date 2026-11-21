import { initTRPC, TRPCError } from '@trpc/server'
import { Schema } from 'effect'
import {
  CreateImageRequestSchema,
  EditImageBodyJsonParamSchema,
  ImagesResponseSchema,
} from '../components'

const t = initTRPC.create()

export const imagesRouter = t.router({
  postImagesEdits: t.procedure
    .input(Schema.toStandardSchemaV1(EditImageBodyJsonParamSchema))
    .output(Schema.toStandardSchemaV1(ImagesResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postImagesGenerations: t.procedure
    .input(Schema.toStandardSchemaV1(CreateImageRequestSchema))
    .output(Schema.toStandardSchemaV1(ImagesResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postImagesVariations: t.procedure
    .output(Schema.toStandardSchemaV1(ImagesResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
