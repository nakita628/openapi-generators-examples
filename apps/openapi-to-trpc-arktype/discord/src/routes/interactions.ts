import { initTRPC, TRPCError } from '@trpc/server'
import { type } from 'arktype'
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
      type({
        interaction_id: SnowflakeTypeSchema,
        interaction_token: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
        'with_response?': 'boolean',
        body: type(
          type(
            type(
              type(
                type(
                  type(ApplicationCommandAutocompleteCallbackRequestSchema).or(
                    CreateMessageInteractionCallbackRequestSchema,
                  ),
                ).or(LaunchActivityInteractionCallbackRequestSchema),
              ).or(ModalInteractionCallbackRequestSchema),
            ).or(PongInteractionCallbackRequestSchema),
          ).or(SocialLayerSKUPurchaseEligibilityInteractionCallbackRequestSchema),
        ).or(UpdateMessageInteractionCallbackRequestSchema),
      }),
    )
    .output(InteractionCallbackResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
