import { os } from '@orpc/server'
import { type } from 'arktype'
import { DetachModuleRequestSchema, GetModulesResponseSchema } from '../components'

export const postV2BotChannelDetach = os
  .route({
    method: 'POST',
    path: '/v2/bot/channel/detach',
    tags: ['line-module'],
    description:
      'The module channel admin calls the Detach API to detach the module channel from a LINE Official Account.',
  })
  .input(DetachModuleRequestSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV2BotChatChatIdControlAcquire = os
  .route({
    method: 'POST',
    path: '/v2/bot/chat/{chatId}/control/acquire',
    tags: ['line-module'],
    description:
      'If the Standby Channel wants to take the initiative (Chat Control), it calls the Acquire Control API.\nThe channel that was previously an Active Channel will automatically switch to a Standby Channel.\n',
  })
  .input(
    type({
      chatId: type('string'),
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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV2BotChatChatIdControlRelease = os
  .route({
    method: 'POST',
    path: '/v2/bot/chat/{chatId}/control/release',
    tags: ['line-module'],
    description:
      'To return the initiative (Chat Control) of Active Channel to Primary Channel, call the Release Control API.\n',
  })
  .input(type({ chatId: type('string') }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV2BotList = os
  .route({
    method: 'GET',
    path: '/v2/bot/list',
    tags: ['line-module'],
    description:
      'Gets a list of basic information about the bots of multiple LINE Official Accounts that have attached module channels.',
  })
  .input(
    type({
      'start?': type('string'),
      'limit?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer <= 100'),
    }),
  )
  .output(GetModulesResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
