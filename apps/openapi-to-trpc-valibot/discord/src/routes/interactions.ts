import { initTRPC, TRPCError } from '@trpc/server'
import * as v from 'valibot'
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
      v.object({
        interaction_id: SnowflakeTypeSchema,
        interaction_token: v.pipe(v.string(), v.maxCodePoints(152133)),
        with_response: v.optional(v.boolean()),
        body: v.union([
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
