import { initTRPC, TRPCError } from '@trpc/server'
import { Schema } from 'effect'
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
  getLiffV1Apps: t.procedure
    .output(Schema.toStandardSchemaV1(GetAllLiffAppsResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postLiffV1Apps: t.procedure
    .input(Schema.toStandardSchemaV1(AddLiffAppRequestSchema))
    .output(Schema.toStandardSchemaV1(AddLiffAppResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putLiffV1AppsLiffId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          liffId: Schema.String,
          view: Schema.optionalKey(UpdateLiffViewSchema),
          description: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'Name of the LIFF app.\n\nThe LIFF app name can\'t include "LINE" or similar strings, or inappropriate strings.\n',
            }),
          ),
          features: Schema.optionalKey(LiffFeaturesSchema),
          permanentLinkPattern: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'How additional information in LIFF URLs is handled. Specify `concat`.\n',
            }),
          ),
          scope: Schema.optionalKey(Schema.Array(LiffScopeSchema)),
          botPrompt: Schema.optionalKey(LiffBotPromptSchema),
        }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteLiffV1AppsLiffId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ liffId: Schema.String })))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
