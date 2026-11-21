import { Elysia, t } from 'elysia'
import {
  ChatCompletionStreamOptionsSchema,
  CompletionUsageSchema,
  CreateCompletionRequestSchema,
  CreateCompletionResponseSchema,
  ErrorSchema,
  ErrorResponseSchema,
  MisalignmentErrorDetailsResourceSchema,
  StopConfigurationSchema,
  MisalignmentErrorTypeSchema,
  MisalignmentSteerSchema,
} from '../../components/schemas'
import { CompletionsModel } from './model'

export const completions = new Elysia()
  .model({
    ChatCompletionStreamOptions: ChatCompletionStreamOptionsSchema,
    CompletionUsage: CompletionUsageSchema,
    CreateCompletionRequest: CreateCompletionRequestSchema,
    CreateCompletionResponse: CreateCompletionResponseSchema,
    Error: ErrorSchema,
    ErrorResponse: ErrorResponseSchema,
    MisalignmentErrorDetailsResource: MisalignmentErrorDetailsResourceSchema,
    StopConfiguration: StopConfigurationSchema,
    MisalignmentErrorType: MisalignmentErrorTypeSchema,
    MisalignmentSteer: MisalignmentSteerSchema,
  })
  .post('/completions', ({ body }) => {}, {
    body: 'CreateCompletionRequest',
    response: {
      200: 'CreateCompletionResponse',
      400: 'ErrorResponse',
      401: 'ErrorResponse',
      403: t.Void(),
      404: 'ErrorResponse',
      429: 'ErrorResponse',
      500: 'ErrorResponse',
      503: 'ErrorResponse',
    },
    detail: {
      tags: ['Completions'],
      summary: 'Create completion',
      description:
        'Creates a completion for the provided prompt and parameters.\n\nReturns a completion object, or a sequence of completion objects if the request is streamed.\n',
      operationId: 'createCompletion',
    },
  })
