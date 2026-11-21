import { os } from '@orpc/server'
import { CreateCompletionRequestSchema, CreateCompletionResponseSchema } from '../components'

export const postCompletions = os
  .route({
    method: 'POST',
    path: '/completions',
    tags: ['Completions'],
    summary: 'Create completion',
    description:
      'Creates a completion for the provided prompt and parameters.\n\nReturns a completion object, or a sequence of completion objects if the request is streamed.\n',
  })
  .input(CreateCompletionRequestSchema)
  .output(CreateCompletionResponseSchema)
  .handler(async ({ input }) => {})
