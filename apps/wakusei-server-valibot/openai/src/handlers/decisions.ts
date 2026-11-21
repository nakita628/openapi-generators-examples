import { os } from '@orpc/server'
import { DecisionRequestSchema, DecisionResponseSchema } from '../components'

export const postDecisions = os
  .route({
    method: 'POST',
    path: '/decisions',
    tags: ['Decisions'],
    summary: 'Create a decision',
    description:
      'Use this endpoint to quickly answer classification or scoring questions about some input. You can ask multiple questions in one request.',
    successDescription: 'The answers and token usage.',
  })
  .input(DecisionRequestSchema)
  .output(DecisionResponseSchema)
  .handler(async ({ input }) => {})
