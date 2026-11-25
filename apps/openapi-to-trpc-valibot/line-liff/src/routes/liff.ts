import { initTRPC, TRPCError } from '@trpc/server'
import * as v from 'valibot'
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
      v.object({
        liffId: v.string(),
        view: v.optional(UpdateLiffViewSchema),
        description: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'Name of the LIFF app.\n\nThe LIFF app name can\'t include "LINE" or similar strings, or inappropriate strings.\n',
            ),
          ),
        ),
        features: v.optional(LiffFeaturesSchema),
        permanentLinkPattern: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'How additional information in LIFF URLs is handled. Specify `concat`.\n',
            ),
          ),
        ),
        scope: v.optional(v.array(LiffScopeSchema)),
        botPrompt: v.optional(LiffBotPromptSchema),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteLiffV1AppsLiffId: t.procedure.input(v.object({ liffId: v.string() })).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
})
