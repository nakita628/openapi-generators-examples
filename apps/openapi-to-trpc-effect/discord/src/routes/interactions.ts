import { initTRPC, TRPCError } from '@trpc/server'
import { Schema } from 'effect'
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
      Schema.toStandardSchemaV1(
        Schema.Struct({
          interaction_id: SnowflakeTypeSchema,
          interaction_token: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 152133, {
              expected: 'a string of at most 152133 characters',
            }),
          ),
          with_response: Schema.optionalKey(Schema.Boolean),
          body: Schema.Union([
            ApplicationCommandAutocompleteCallbackRequestSchema,
            CreateMessageInteractionCallbackRequestSchema,
            LaunchActivityInteractionCallbackRequestSchema,
            ModalInteractionCallbackRequestSchema,
            PongInteractionCallbackRequestSchema,
            SocialLayerSKUPurchaseEligibilityInteractionCallbackRequestSchema,
            UpdateMessageInteractionCallbackRequestSchema,
          ]),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(InteractionCallbackResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
