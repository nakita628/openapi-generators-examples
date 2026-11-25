import { initTRPC, TRPCError } from '@trpc/server'
import { type } from 'arktype'
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
      type({
        liffId: 'string',
        'view?': UpdateLiffViewSchema,
        'description?': type('string').describe(
          'Name of the LIFF app.\n\nThe LIFF app name can\'t include "LINE" or similar strings, or inappropriate strings.\n',
        ),
        'features?': LiffFeaturesSchema,
        'permanentLinkPattern?': type('string').describe(
          'How additional information in LIFF URLs is handled. Specify `concat`.\n',
        ),
        'scope?': type(LiffScopeSchema).array(),
        'botPrompt?': LiffBotPromptSchema,
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteLiffV1AppsLiffId: t.procedure.input(type({ liffId: 'string' })).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
})
