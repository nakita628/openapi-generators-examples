import { os } from '@orpc/server'
import * as z from 'zod'
import { InteractionCallbackResponseSchema, SnowflakeTypeSchema } from '../components'

export const postInteractionsInteractionIdInteractionTokenCallback = os
  .route({
    method: 'POST',
    path: '/interactions/{interaction_id}/{interaction_token}/callback',
    successDescription: '200 response for create_interaction_response',
  })
  .input(
    z.object({
      interaction_id: SnowflakeTypeSchema,
      interaction_token: z.string().max(152133),
      with_response: z.stringbool().exactOptional(),
    }),
  )
  .output(InteractionCallbackResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
