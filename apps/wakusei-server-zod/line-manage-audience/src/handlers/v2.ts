import { os } from '@orpc/server'
import * as z from 'zod'
import {
  AddAudienceToAudienceGroupRequestSchema,
  AudienceGroupCreateRouteSchema,
  AudienceGroupStatusSchema,
  CreateAudienceGroupRequestSchema,
  CreateAudienceGroupResponseSchema,
  CreateClickBasedAudienceGroupRequestSchema,
  CreateClickBasedAudienceGroupResponseSchema,
  CreateImpBasedAudienceGroupRequestSchema,
  CreateImpBasedAudienceGroupResponseSchema,
  GetAudienceDataResponseSchema,
  GetAudienceGroupsResponseSchema,
  GetSharedAudienceDataResponseSchema,
  GetSharedAudienceGroupsResponseSchema,
} from '../components'

export const postV2BotAudienceGroupUpload = os
  .route({
    method: 'POST',
    path: '/v2/bot/audienceGroup/upload',
    tags: ['manage-audience'],
    description: 'Create audience for uploading user IDs (by JSON)',
    successStatus: 202,
  })
  .input(CreateAudienceGroupRequestSchema)
  .output(CreateAudienceGroupResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putV2BotAudienceGroupUpload = os
  .route({
    method: 'PUT',
    path: '/v2/bot/audienceGroup/upload',
    tags: ['manage-audience'],
    description:
      'Add user IDs or Identifiers for Advertisers (IFAs) to an audience for uploading user IDs (by JSON)',
    successStatus: 202,
  })
  .input(AddAudienceToAudienceGroupRequestSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV2BotAudienceGroupUploadByFile = os
  .route({
    method: 'POST',
    path: '/v2/bot/audienceGroup/upload/byFile',
    tags: ['manage-audience-blob'],
    description: 'Create audience for uploading user IDs (by file).',
    successStatus: 202,
  })
  .output(CreateAudienceGroupResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putV2BotAudienceGroupUploadByFile = os
  .route({
    method: 'PUT',
    path: '/v2/bot/audienceGroup/upload/byFile',
    tags: ['manage-audience-blob'],
    description:
      'Add user IDs or Identifiers for Advertisers (IFAs) to an audience for uploading user IDs (by file).',
    successStatus: 202,
  })
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV2BotAudienceGroupClick = os
  .route({
    method: 'POST',
    path: '/v2/bot/audienceGroup/click',
    tags: ['manage-audience'],
    description: 'Create audience for click-based retargeting',
    successStatus: 202,
  })
  .input(CreateClickBasedAudienceGroupRequestSchema)
  .output(CreateClickBasedAudienceGroupResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV2BotAudienceGroupImp = os
  .route({
    method: 'POST',
    path: '/v2/bot/audienceGroup/imp',
    tags: ['manage-audience'],
    description: 'Create audience for impression-based retargeting',
    successStatus: 202,
  })
  .input(CreateImpBasedAudienceGroupRequestSchema)
  .output(CreateImpBasedAudienceGroupResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putV2BotAudienceGroupAudienceGroupIdUpdateDescription = os
  .route({
    method: 'PUT',
    path: '/v2/bot/audienceGroup/{audienceGroupId}/updateDescription',
    tags: ['manage-audience'],
    description: 'Renames an existing audience.',
  })
  .input(
    z.object({
      audienceGroupId: z.coerce.bigint().pipe(z.int64()),
      description: z
        .string()
        .min(1)
        .max(120)
        .meta({
          description:
            "The audience's name. This is case-insensitive, meaning AUDIENCE and audience are considered identical.\nMax character limit: 120\n",
        })
        .exactOptional(),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV2BotAudienceGroupAudienceGroupId = os
  .route({
    method: 'GET',
    path: '/v2/bot/audienceGroup/{audienceGroupId}',
    tags: ['manage-audience'],
    description: 'Gets audience data.',
  })
  .input(z.object({ audienceGroupId: z.coerce.bigint().pipe(z.int64()) }))
  .output(GetAudienceDataResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteV2BotAudienceGroupAudienceGroupId = os
  .route({
    method: 'DELETE',
    path: '/v2/bot/audienceGroup/{audienceGroupId}',
    tags: ['manage-audience'],
    description: 'Delete audience',
  })
  .input(z.object({ audienceGroupId: z.coerce.bigint().pipe(z.int64()) }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV2BotAudienceGroupList = os
  .route({
    method: 'GET',
    path: '/v2/bot/audienceGroup/list',
    tags: ['manage-audience'],
    description: 'Gets data for more than one audience.',
  })
  .input(
    z.object({
      page: z.coerce.bigint().pipe(z.int64().min(1n)),
      description: z.string().exactOptional(),
      status: AudienceGroupStatusSchema.exactOptional(),
      size: z.coerce
        .bigint()
        .pipe(z.int64().max(40n))
        .meta({ examples: [20] })
        .exactOptional(),
      includesExternalPublicGroups: z
        .stringbool()
        .meta({ examples: [true] })
        .exactOptional(),
      createRoute: AudienceGroupCreateRouteSchema.exactOptional(),
    }),
  )
  .output(GetAudienceGroupsResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV2BotAudienceGroupSharedAudienceGroupId = os
  .route({
    method: 'GET',
    path: '/v2/bot/audienceGroup/shared/{audienceGroupId}',
    tags: ['manage-audience'],
    description: 'Gets audience data.',
  })
  .input(z.object({ audienceGroupId: z.coerce.bigint().pipe(z.int64()) }))
  .output(GetSharedAudienceDataResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV2BotAudienceGroupSharedList = os
  .route({
    method: 'GET',
    path: '/v2/bot/audienceGroup/shared/list',
    tags: ['manage-audience'],
    description:
      'Gets data for more than one audience, including those shared by the Business Manager.',
  })
  .input(
    z.object({
      page: z.coerce.bigint().pipe(z.int64().min(1n)),
      description: z.string().exactOptional(),
      status: AudienceGroupStatusSchema.exactOptional(),
      size: z.coerce
        .bigint()
        .pipe(z.int64().max(40n))
        .meta({ examples: [20] })
        .exactOptional(),
      createRoute: AudienceGroupCreateRouteSchema.exactOptional(),
      includesOwnedAudienceGroups: z.stringbool().default(false).exactOptional(),
    }),
  )
  .output(GetSharedAudienceGroupsResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
