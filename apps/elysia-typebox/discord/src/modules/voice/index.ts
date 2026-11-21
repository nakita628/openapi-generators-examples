import { Elysia } from 'elysia'
import {
  ErrorSchema,
  ErrorDetailsSchema,
  ErrorResponseSchema,
  InnerErrorsSchema,
  RatelimitedResponseSchema,
  VoiceRegionResponseSchema,
} from '../../components/schemas'
import { VoiceModel } from './model'

export const voice = new Elysia()
  .model({
    Error: ErrorSchema,
    ErrorDetails: ErrorDetailsSchema,
    ErrorResponse: ErrorResponseSchema,
    InnerErrors: InnerErrorsSchema,
    RatelimitedResponse: RatelimitedResponseSchema,
    VoiceRegionResponse: VoiceRegionResponseSchema,
  })
  .get('/voice/regions', () => { throw new Error('Not implemented') }, {
    response: {
      200: VoiceModel.list_voice_regionsResponse200,
      429: 'RatelimitedResponse',
      '4XX': 'ErrorResponse',
    },
    detail: { tags: [], operationId: 'list_voice_regions', security: [{ BotToken: [] }] },
  })
