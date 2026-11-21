import { os } from '@orpc/server'
import { type } from 'arktype'
import {
  CreateCSAMModerationResponseSchema,
  CreateModerationRequestSchema,
  CreateModerationResponseSchema,
} from '../components'

export const postModerations = os
  .route({
    method: 'POST',
    path: '/moderations',
    tags: ['Moderations'],
    summary: 'Create moderation',
    description:
      'Classifies if text and/or image inputs are potentially harmful. Learn\nmore in the [moderation guide](https://developers.openai.com/api/docs/guides/moderation).\n',
  })
  .input(CreateModerationRequestSchema)
  .output(type(CreateModerationResponseSchema).or(CreateCSAMModerationResponseSchema))
  .handler(async ({ input }) => { throw new Error('Not implemented') })
