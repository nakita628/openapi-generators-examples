import { initTRPC, TRPCError } from '@trpc/server'
import * as z from 'zod'
import {
  ApplicationCommandAutocompleteCallbackRequestSchema,
  CreateMessageInteractionCallbackRequestSchema,
  InteractionCallbackResponseSchema,
  LaunchActivityInteractionCallbackRequestSchema,
  ModalInteractionCallbackRequestSchema,
  PongInteractionCallbackRequestSchema,
  SnowflakeTypeSchema,
  SocialLayerSKUPurchaseEligibilityInteractionCallbackRequestSchema,
  UpdateMessageInteractionCallbackRequestSchema,
} from '../components'

const t = initTRPC.create()

export const interactionsRouter = t.router({
  postInteractionsInteractionIdInteractionTokenCallback: t.procedure
    .input(
      z.object({
        interaction_id: SnowflakeTypeSchema,
        interaction_token: z.string().max(152133),
        with_response: z.boolean().exactOptional(),
        body: z.union([
          ApplicationCommandAutocompleteCallbackRequestSchema,
          CreateMessageInteractionCallbackRequestSchema,
          LaunchActivityInteractionCallbackRequestSchema,
          ModalInteractionCallbackRequestSchema,
          PongInteractionCallbackRequestSchema,
          SocialLayerSKUPurchaseEligibilityInteractionCallbackRequestSchema,
          UpdateMessageInteractionCallbackRequestSchema,
        ]),
      }),
    )
    .output(InteractionCallbackResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
