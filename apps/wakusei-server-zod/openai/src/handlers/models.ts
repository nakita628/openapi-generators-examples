import { os } from '@orpc/server'
import * as z from 'zod'
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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getModelsModel = os
  .route({
    method: 'GET',
    path: '/models/{model}',
    tags: ['Models'],
    summary: 'Retrieve model',
    description:
      'Retrieves a model instance, providing basic information about the model such as the owner and permissioning.',
  })
  .input(z.object({ model: z.string().meta({ examples: ['gpt-6.2-astra'] }) }))
  .output(ModelSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteModelsModel = os
  .route({
    method: 'DELETE',
    path: '/models/{model}',
    tags: ['Models'],
    summary: 'Delete a fine-tuned model',
    description:
      'Delete a fine-tuned model. You must have the Owner role in your organization to delete a model.',
  })
  .input(
    z.object({
      model: z.string().meta({ examples: ['ft:gpt-4.1-mini-2025-04-14:acemeco:suffix:abc123'] }),
    }),
  )
  .output(DeleteModelResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
