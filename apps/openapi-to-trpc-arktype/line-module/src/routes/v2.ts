import { initTRPC, TRPCError } from '@trpc/server'
import { type } from 'arktype'
import { DetachModuleRequestSchema, GetModulesResponseSchema } from '../components'

const t = initTRPC.create()

export const v2Router = t.router({
  postV2BotChannelDetach: t.procedure.input(DetachModuleRequestSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  postV2BotChatChatIdControlAcquire: t.procedure
    .input(
      type({
        chatId: 'string',
        'expired?': type('boolean').describe(
          "`True`: After the time limit (ttl) has passed, the initiative (Chat Control) will return to the Primary Channel. (Default)\n`False`: There's no time limit and the initiative (Chat Control) doesn't change over time.\n",
        ),
        'ttl?': type(
          'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer <= 31536000',
        ).describe(
          'The time it takes for initiative (Chat Control) to return to the Primary Channel (the time that the module channel stays on the Active Channel).\nThe value is specified in seconds. The maximum value is one year (3600 * 24 * 365).\nThe default value is 3600 (1 hour).\n\n* Ignored if the value of expired is false.\n',
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2BotChatChatIdControlRelease: t.procedure.input(type({ chatId: 'string' })).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV2BotList: t.procedure
    .input(
      type({
        'start?': 'string',
        'limit?':
          'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer <= 100',
      }),
    )
    .output(GetModulesResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
