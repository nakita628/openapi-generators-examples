import { Elysia } from 'elysia'
import {
  ErrorSchema,
  ErrorDetailsSchema,
  ErrorResponseSchema,
  GatewayBotResponseSchema,
  GatewayBotSessionStartLimitResponseSchema,
  GatewayResponseSchema,
  InnerErrorsSchema,
  RatelimitedResponseSchema,
} from '../../components/schemas'
import { GatewayModel } from './model'

export const gateway = new Elysia()
  .model({
    Error: ErrorSchema,
    ErrorDetails: ErrorDetailsSchema,
    ErrorResponse: ErrorResponseSchema,
    GatewayBotResponse: GatewayBotResponseSchema,
    GatewayBotSessionStartLimitResponse: GatewayBotSessionStartLimitResponseSchema,
    GatewayResponse: GatewayResponseSchema,
    InnerErrors: InnerErrorsSchema,
    RatelimitedResponse: RatelimitedResponseSchema,
  })
  .get('/gateway', () => {}, {
    response: { 200: 'GatewayResponse', 429: 'RatelimitedResponse', '4XX': 'ErrorResponse' },
    detail: { tags: [], operationId: 'get_gateway', security: [{}, { BotToken: [] }] },
  })
  .get('/gateway/bot', () => {}, {
    response: { 200: 'GatewayBotResponse', 429: 'RatelimitedResponse', '4XX': 'ErrorResponse' },
    detail: { tags: [], operationId: 'get_bot_gateway', security: [{ BotToken: [] }] },
  })
