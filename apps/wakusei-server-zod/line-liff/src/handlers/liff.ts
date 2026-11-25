import { os } from '@orpc/server'
import * as z from 'zod'
import {
  AddLiffAppRequestSchema,
  AddLiffAppResponseSchema,
  GetAllLiffAppsResponseSchema,
  LiffBotPromptSchema,
  LiffFeaturesSchema,
  LiffScopeSchema,
  UpdateLiffViewSchema,
} from '../components'

export const getLiffV1Apps = os
  .route({
    method: 'GET',
    path: '/liff/v1/apps',
    tags: ['liff'],
    summary: 'Get all LIFF apps',
    description: 'Gets information on all the LIFF apps added to the channel.',
  })
  .output(GetAllLiffAppsResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postLiffV1Apps = os
  .route({
    method: 'POST',
    path: '/liff/v1/apps',
    tags: ['liff'],
    summary: 'Create LIFF app',
    description: 'Adding the LIFF app to a channel',
  })
  .input(AddLiffAppRequestSchema)
  .output(AddLiffAppResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putLiffV1AppsLiffId = os
  .route({
    method: 'PUT',
    path: '/liff/v1/apps/{liffId}',
    tags: ['liff'],
    summary: 'Update LIFF app from a channel',
    description: 'Update LIFF app settings',
  })
  .input(
    z.object({
      liffId: z.string(),
      view: UpdateLiffViewSchema.exactOptional(),
      description: z
        .string()
        .meta({
          description:
            'Name of the LIFF app.\n\nThe LIFF app name can\'t include "LINE" or similar strings, or inappropriate strings.\n',
        })
        .exactOptional(),
      features: LiffFeaturesSchema.exactOptional(),
      permanentLinkPattern: z
        .string()
        .meta({
          description: 'How additional information in LIFF URLs is handled. Specify `concat`.\n',
        })
        .exactOptional(),
      scope: z.array(LiffScopeSchema).exactOptional(),
      botPrompt: LiffBotPromptSchema.exactOptional(),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteLiffV1AppsLiffId = os
  .route({
    method: 'DELETE',
    path: '/liff/v1/apps/{liffId}',
    tags: ['liff'],
    summary: 'Delete LIFF app from a channel',
    description: 'Deletes a LIFF app from a channel.\n',
  })
  .input(z.object({ liffId: z.string() }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })
