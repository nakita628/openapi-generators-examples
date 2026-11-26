import { oc } from '@orpc/contract'
import * as z from 'zod'
import { DetachModuleRequestSchema, GetModulesResponseSchema } from './components'

export const contract = {
  postV2BotChannelDetach: oc
    .route({
      method: 'POST',
      path: '/v2/bot/channel/detach',
      tags: ['line-module'],
      description:
        'The module channel admin calls the Detach API to detach the module channel from a LINE Official Account.',
    })
    .input(DetachModuleRequestSchema),
  postV2BotChatChatIdControlAcquire: oc
    .route({
      method: 'POST',
      path: '/v2/bot/chat/{chatId}/control/acquire',
      tags: ['line-module'],
      description:
        'If the Standby Channel wants to take the initiative (Chat Control), it calls the Acquire Control API.\nThe channel that was previously an Active Channel will automatically switch to a Standby Channel.\n',
    })
    .input(
      z.object({
        chatId: z.string(),
        expired: z
          .boolean()
          .meta({
            description:
              "`True`: After the time limit (ttl) has passed, the initiative (Chat Control) will return to the Primary Channel. (Default)\n`False`: There's no time limit and the initiative (Chat Control) doesn't change over time.\n",
            examples: [true],
          })
          .exactOptional(),
        ttl: z
          .int32()
          .max(31536000)
          .meta({
            description:
              'The time it takes for initiative (Chat Control) to return to the Primary Channel (the time that the module channel stays on the Active Channel).\nThe value is specified in seconds. The maximum value is one year (3600 * 24 * 365).\nThe default value is 3600 (1 hour).\n\n* Ignored if the value of expired is false.\n',
            examples: [3600],
          })
          .exactOptional(),
      }),
    ),
  postV2BotChatChatIdControlRelease: oc
    .route({
      method: 'POST',
      path: '/v2/bot/chat/{chatId}/control/release',
      tags: ['line-module'],
      description:
        'To return the initiative (Chat Control) of Active Channel to Primary Channel, call the Release Control API.\n',
    })
    .input(z.object({ chatId: z.string() })),
  getV2BotList: oc
    .route({
      method: 'GET',
      path: '/v2/bot/list',
      tags: ['line-module'],
      description:
        'Gets a list of basic information about the bots of multiple LINE Official Accounts that have attached module channels.',
    })
    .input(
      z.object({
        start: z.string().exactOptional(),
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.int32().max(100),
          )
          .default(100)
          .exactOptional(),
      }),
    )
    .output(GetModulesResponseSchema),
}
