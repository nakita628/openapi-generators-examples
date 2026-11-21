import { Elysia } from 'elysia'
import {
  DeleteModelResponseSchema,
  ErrorSchema,
  ErrorResponseSchema,
  ListModelsResponseSchema,
  MisalignmentErrorDetailsResourceSchema,
  ModelSchema,
  PermissionErrorResponseSchema,
  MisalignmentErrorTypeSchema,
  MisalignmentSteerSchema,
} from '../../components/schemas'
import { ModelsModel } from './model'

export const models = new Elysia()
  .model({
    DeleteModelResponse: DeleteModelResponseSchema,
    Error: ErrorSchema,
    ErrorResponse: ErrorResponseSchema,
    ListModelsResponse: ListModelsResponseSchema,
    MisalignmentErrorDetailsResource: MisalignmentErrorDetailsResourceSchema,
    Model: ModelSchema,
    PermissionErrorResponse: PermissionErrorResponseSchema,
    MisalignmentErrorType: MisalignmentErrorTypeSchema,
    MisalignmentSteer: MisalignmentSteerSchema,
  })
  .get('/models', () => {}, {
    response: { 200: 'ListModelsResponse', 403: 'PermissionErrorResponse' },
    detail: {
      tags: ['Models'],
      summary: 'List models',
      description:
        'Lists the currently available models, and provides basic information about each one such as the owner and availability.',
      operationId: 'listModels',
    },
  })
  .get('/models/:model', ({ params }) => {}, {
    params: ModelsModel.retrieveModelParams,
    response: { 200: 'Model', 403: 'PermissionErrorResponse', 404: 'ErrorResponse' },
    detail: {
      tags: ['Models'],
      summary: 'Retrieve model',
      description:
        'Retrieves a model instance, providing basic information about the model such as the owner and permissioning.',
      operationId: 'retrieveModel',
    },
  })
  .delete('/models/:model', ({ params }) => {}, {
    params: ModelsModel.deleteModelParams,
    response: { 200: 'DeleteModelResponse', 403: 'PermissionErrorResponse', 404: 'ErrorResponse' },
    detail: {
      tags: ['Models'],
      summary: 'Delete a fine-tuned model',
      description:
        'Delete a fine-tuned model. You must have the Owner role in your organization to delete a model.',
      operationId: 'deleteModel',
    },
  })
