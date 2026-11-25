import { oc } from '@orpc/contract'
import * as v from 'valibot'
import {
  AddLiffAppRequestSchema,
  AddLiffAppResponseSchema,
  GetAllLiffAppsResponseSchema,
  LiffBotPromptSchema,
  LiffFeaturesSchema,
  LiffScopeSchema,
  UpdateLiffViewSchema,
} from './components'

export const contract = {
  getLiffV1Apps: oc
    .route({
      method: 'GET',
      path: '/liff/v1/apps',
      tags: ['liff'],
      summary: 'Get all LIFF apps',
      description: 'Gets information on all the LIFF apps added to the channel.',
    })
    .output(GetAllLiffAppsResponseSchema),
  postLiffV1Apps: oc
    .route({
      method: 'POST',
      path: '/liff/v1/apps',
      tags: ['liff'],
      summary: 'Create LIFF app',
      description: 'Adding the LIFF app to a channel',
    })
    .input(AddLiffAppRequestSchema)
    .output(AddLiffAppResponseSchema),
  putLiffV1AppsLiffId: oc
    .route({
      method: 'PUT',
      path: '/liff/v1/apps/{liffId}',
      tags: ['liff'],
      summary: 'Update LIFF app from a channel',
      description: 'Update LIFF app settings',
    })
    .input(
      v.object({
        liffId: v.string(),
        view: v.optional(UpdateLiffViewSchema),
        description: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'Name of the LIFF app.\n\nThe LIFF app name can\'t include "LINE" or similar strings, or inappropriate strings.\n',
            ),
          ),
        ),
        features: v.optional(LiffFeaturesSchema),
        permanentLinkPattern: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'How additional information in LIFF URLs is handled. Specify `concat`.\n',
            ),
          ),
        ),
        scope: v.optional(v.array(LiffScopeSchema)),
        botPrompt: v.optional(LiffBotPromptSchema),
      }),
    ),
  deleteLiffV1AppsLiffId: oc
    .route({
      method: 'DELETE',
      path: '/liff/v1/apps/{liffId}',
      tags: ['liff'],
      summary: 'Delete LIFF app from a channel',
      description: 'Deletes a LIFF app from a channel.\n',
    })
    .input(v.object({ liffId: v.string() })),
}
