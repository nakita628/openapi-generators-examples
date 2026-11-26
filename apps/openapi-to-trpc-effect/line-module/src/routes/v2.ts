import { initTRPC, TRPCError } from '@trpc/server'
import { Effect, Schema } from 'effect'
import { DetachModuleRequestSchema, GetModulesResponseSchema } from '../components'

const t = initTRPC.create()

export const v2Router = t.router({
  postV2BotChannelDetach: t.procedure
    .input(Schema.toStandardSchemaV1(DetachModuleRequestSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotChatChatIdControlAcquire: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          chatId: Schema.String,
          expired: Schema.optionalKey(
            Schema.Boolean.annotate({
              description:
                "`True`: After the time limit (ttl) has passed, the initiative (Chat Control) will return to the Primary Channel. (Default)\n`False`: There's no time limit and the initiative (Chat Control) doesn't change over time.\n",
              jsonSchemaExamples: [true],
            }),
          ),
          ttl: Schema.optionalKey(
            Schema.Number.check(Schema.isInt32(), Schema.isLessThanOrEqualTo(31536000)).annotate({
              description:
                'The time it takes for initiative (Chat Control) to return to the Primary Channel (the time that the module channel stays on the Active Channel).\nThe value is specified in seconds. The maximum value is one year (3600 * 24 * 365).\nThe default value is 3600 (1 hour).\n\n* Ignored if the value of expired is false.\n',
              jsonSchemaExamples: [3600],
            }),
          ),
        }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotChatChatIdControlRelease: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ chatId: Schema.String })))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotList: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          start: Schema.optionalKey(Schema.String),
          limit: Schema.Number.check(Schema.isInt32(), Schema.isLessThanOrEqualTo(100)).pipe(
            Schema.withDecodingDefault(Effect.succeed(100)),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(GetModulesResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
