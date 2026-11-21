import { Elysia } from 'elysia'
import {
  CSAMCategoryAppliedInputTypesSchema,
  CSAMCategoryFlagsSchema,
  CSAMCategoryScoresSchema,
  CSAMModerationResultSchema,
  CreateCSAMModerationResponseSchema,
  CreateModerationRequestSchema,
  CreateModerationResponseSchema,
  ErrorSchema,
  ErrorResponseSchema,
  MisalignmentErrorDetailsResourceSchema,
  MisalignmentErrorTypeSchema,
  MisalignmentSteerSchema,
} from '../../components/schemas'
import { ModerationsModel } from './model'

export const moderations = new Elysia()
  .model({
    CSAMCategoryAppliedInputTypes: CSAMCategoryAppliedInputTypesSchema,
    CSAMCategoryFlags: CSAMCategoryFlagsSchema,
    CSAMCategoryScores: CSAMCategoryScoresSchema,
    CSAMModerationResult: CSAMModerationResultSchema,
    CreateCSAMModerationResponse: CreateCSAMModerationResponseSchema,
    CreateModerationRequest: CreateModerationRequestSchema,
    CreateModerationResponse: CreateModerationResponseSchema,
    Error: ErrorSchema,
    ErrorResponse: ErrorResponseSchema,
    MisalignmentErrorDetailsResource: MisalignmentErrorDetailsResourceSchema,
    MisalignmentErrorType: MisalignmentErrorTypeSchema,
    MisalignmentSteer: MisalignmentSteerSchema,
  })
  .post('/moderations', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'CreateModerationRequest',
    response: {
      200: ModerationsModel.createModerationResponse200,
      400: 'ErrorResponse',
      403: 'ErrorResponse',
      429: 'ErrorResponse',
      500: 'ErrorResponse',
      503: 'ErrorResponse',
    },
    detail: {
      tags: ['Moderations'],
      summary: 'Create moderation',
      description:
        'Classifies if text and/or image inputs are potentially harmful. Learn\nmore in the [moderation guide](https://developers.openai.com/api/docs/guides/moderation).\n',
      operationId: 'createModeration',
    },
  })
