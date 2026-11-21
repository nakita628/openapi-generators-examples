import { os } from '@orpc/server'
import * as v from 'valibot'
import { InteractionCallbackResponseSchema, SnowflakeTypeSchema } from '../components'

export const postInteractionsInteractionIdInteractionTokenCallback = os
  .route({
    method: 'POST',
    path: '/interactions/{interaction_id}/{interaction_token}/callback',
    successDescription: '200 response for create_interaction_response',
  })
  .input(
    v.object({
      interaction_id: SnowflakeTypeSchema,
      interaction_token: v.pipe(v.string(), v.maxCodePoints(152133)),
      with_response: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
    }),
  )
  .output(InteractionCallbackResponseSchema)
  .handler(async ({ input }) => {})
