import { t, type UnwrapSchema } from 'elysia'
import {
  ApplicationCommandAutocompleteCallbackRequestSchema,
  CreateMessageInteractionCallbackRequestSchema,
  LaunchActivityInteractionCallbackRequestSchema,
  ModalInteractionCallbackRequestSchema,
  PongInteractionCallbackRequestSchema,
  SocialLayerSKUPurchaseEligibilityInteractionCallbackRequestSchema,
  UpdateMessageInteractionCallbackRequestSchema,
} from '../../components/schemas'

export const InteractionsModel = {
  create_interaction_responseParams: t.Object({
    interaction_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    interaction_token: t.String({ maxLength: 152133 }),
  }),
  create_interaction_responseQuery: t.Object({ with_response: t.Optional(t.Boolean()) }),
  create_interaction_responseBody: t.Union([
    ApplicationCommandAutocompleteCallbackRequestSchema,
    CreateMessageInteractionCallbackRequestSchema,
    LaunchActivityInteractionCallbackRequestSchema,
    ModalInteractionCallbackRequestSchema,
    PongInteractionCallbackRequestSchema,
    SocialLayerSKUPurchaseEligibilityInteractionCallbackRequestSchema,
    UpdateMessageInteractionCallbackRequestSchema,
  ]),
} as const

export type InteractionsModel = {
  [k in keyof typeof InteractionsModel]: UnwrapSchema<(typeof InteractionsModel)[k]>
}
