import { initTRPC, TRPCError } from '@trpc/server'
import * as v from 'valibot'
import { DetachModuleRequestSchema, GetModulesResponseSchema } from '../components'

const t = initTRPC.create()

export const v2Router = t.router({
  postV2BotChannelDetach: t.procedure.input(DetachModuleRequestSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  postV2BotChatChatIdControlAcquire: t.procedure
    .input(
      v.object({
        chatId: v.string(),
        expired: v.optional(
          v.pipe(
            v.boolean(),
            v.description(
              "`True`: After the time limit (ttl) has passed, the initiative (Chat Control) will return to the Primary Channel. (Default)\n`False`: There's no time limit and the initiative (Chat Control) doesn't change over time.\n",
            ),
            v.metadata({ examples: [true] }),
          ),
        ),
        ttl: v.optional(
          v.pipe(
            v.pipe(
              v.number(),
              v.integer(),
              v.minValue(-2147483648),
              v.maxValue(2147483647),
              v.maxValue(31536000),
            ),
            v.description(
              'The time it takes for initiative (Chat Control) to return to the Primary Channel (the time that the module channel stays on the Active Channel).\nThe value is specified in seconds. The maximum value is one year (3600 * 24 * 365).\nThe default value is 3600 (1 hour).\n\n* Ignored if the value of expired is false.\n',
            ),
            v.metadata({ examples: [3600] }),
          ),
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotChatChatIdControlRelease: t.procedure
    .input(v.object({ chatId: v.string() }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotList: t.procedure
    .input(
      v.object({
        start: v.optional(v.string()),
        limit: v.optional(
          v.pipe(
            v.number(),
            v.integer(),
            v.minValue(-2147483648),
            v.maxValue(2147483647),
            v.maxValue(100),
          ),
          100,
        ),
      }),
    )
    .output(GetModulesResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
