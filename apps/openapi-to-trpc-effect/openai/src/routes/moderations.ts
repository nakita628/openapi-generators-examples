import { initTRPC, TRPCError } from '@trpc/server'
import { Schema } from 'effect'
import {
  CreateCSAMModerationResponseSchema,
  CreateModerationRequestSchema,
  CreateModerationResponseSchema,
} from '../components'

const t = initTRPC.create()

export const moderationsRouter = t.router({
  postModerations: t.procedure
    .input(Schema.toStandardSchemaV1(CreateModerationRequestSchema))
    .output(
      Schema.toStandardSchemaV1(
        Schema.Union([CreateModerationResponseSchema, CreateCSAMModerationResponseSchema]),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
