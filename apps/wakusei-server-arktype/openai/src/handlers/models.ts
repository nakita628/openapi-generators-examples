import { os } from '@orpc/server'
import { type } from 'arktype'
import { DeleteModelResponseSchema, ListModelsResponseSchema, ModelSchema } from '../components'

export const getModels = os
  .route({
    method: 'GET',
    path: '/models',
    tags: ['Models'],
    summary: 'List models',
    description:
      'Lists the currently available models, and provides basic information about each one such as the owner and availability.',
  })
  .output(ListModelsResponseSchema)
  .handler(async ({ input }) => {})

export const getModelsModel = os
  .route({
    method: 'GET',
    path: '/models/{model}',
    tags: ['Models'],
    summary: 'Retrieve model',
    description:
      'Retrieves a model instance, providing basic information about the model such as the owner and permissioning.',
  })
  .input(type({ model: type('string') }))
  .output(ModelSchema)
  .handler(async ({ input }) => {})

export const deleteModelsModel = os
  .route({
    method: 'DELETE',
    path: '/models/{model}',
    tags: ['Models'],
    summary: 'Delete a fine-tuned model',
    description:
      'Delete a fine-tuned model. You must have the Owner role in your organization to delete a model.',
  })
  .input(type({ model: type('string') }))
  .output(DeleteModelResponseSchema)
  .handler(async ({ input }) => {})
