import { os } from '@orpc/server'
import { type } from 'arktype'
import { InteractionCallbackResponseSchema, SnowflakeTypeSchema } from '../components'

export const postInteractionsInteractionIdInteractionTokenCallback = os
  .route({
    method: 'POST',
    path: '/interactions/{interaction_id}/{interaction_token}/callback',
    successDescription: '200 response for create_interaction_response',
  })
  .input(
    type({
      interaction_id: SnowflakeTypeSchema,
      interaction_token: type('string').narrow(
        (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
      ),
      'with_response?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
        (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
    }),
  )
  .output(InteractionCallbackResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
