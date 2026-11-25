import { initTRPC, TRPCError } from '@trpc/server'
import * as z from 'zod'
import {
  AddLiffAppRequestSchema,
  AddLiffAppResponseSchema,
  GetAllLiffAppsResponseSchema,
  LiffBotPromptSchema,
  LiffFeaturesSchema,
  LiffScopeSchema,
  UpdateLiffViewSchema,
} from '../components'

const t = initTRPC.create()

export const liffRouter = t.router({
  getLiffV1Apps: t.procedure.output(GetAllLiffAppsResponseSchema).query(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  postLiffV1Apps: t.procedure
    .input(AddLiffAppRequestSchema)
    .output(AddLiffAppResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putLiffV1AppsLiffId: t.procedure
    .input(
      z.object({
        liffId: z.string(),
        view: UpdateLiffViewSchema.exactOptional(),
        description: z
          .string()
          .meta({
            description:
              'Name of the LIFF app.\n\nThe LIFF app name can\'t include "LINE" or similar strings, or inappropriate strings.\n',
          })
          .exactOptional(),
        features: LiffFeaturesSchema.exactOptional(),
        permanentLinkPattern: z
          .string()
          .meta({
            description: 'How additional information in LIFF URLs is handled. Specify `concat`.\n',
          })
          .exactOptional(),
        scope: z.array(LiffScopeSchema).exactOptional(),
        botPrompt: LiffBotPromptSchema.exactOptional(),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteLiffV1AppsLiffId: t.procedure.input(z.object({ liffId: z.string() })).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
})
