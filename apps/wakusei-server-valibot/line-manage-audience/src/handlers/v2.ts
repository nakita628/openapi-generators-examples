import { os } from '@orpc/server'
import * as v from 'valibot'
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
    v.object({
      audienceGroupId: v.pipe(
        v.string(),
        v.regex(/^-?\d+$/),
        v.transform((input) => BigInt(input)),
        v.minValue(-9223372036854775808n),
        v.maxValue(9223372036854775807n),
      ),
      description: v.optional(
        v.pipe(
          v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(120)),
          v.description(
            "The audience's name. This is case-insensitive, meaning AUDIENCE and audience are considered identical.\nMax character limit: 120\n",
          ),
        ),
      ),
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
  .input(
    v.object({
      audienceGroupId: v.pipe(
        v.string(),
        v.regex(/^-?\d+$/),
        v.transform((input) => BigInt(input)),
        v.minValue(-9223372036854775808n),
        v.maxValue(9223372036854775807n),
      ),
    }),
  )
  .output(GetAudienceDataResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteV2BotAudienceGroupAudienceGroupId = os
  .route({
    method: 'DELETE',
    path: '/v2/bot/audienceGroup/{audienceGroupId}',
    tags: ['manage-audience'],
    description: 'Delete audience',
  })
  .input(
    v.object({
      audienceGroupId: v.pipe(
        v.string(),
        v.regex(/^-?\d+$/),
        v.transform((input) => BigInt(input)),
        v.minValue(-9223372036854775808n),
        v.maxValue(9223372036854775807n),
      ),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV2BotAudienceGroupList = os
  .route({
    method: 'GET',
    path: '/v2/bot/audienceGroup/list',
    tags: ['manage-audience'],
    description: 'Gets data for more than one audience.',
  })
  .input(
    v.object({
      page: v.pipe(
        v.string(),
        v.regex(/^-?\d+$/),
        v.transform((input) => BigInt(input)),
        v.minValue(-9223372036854775808n),
        v.maxValue(9223372036854775807n),
        v.minValue(1n),
      ),
      description: v.optional(v.string()),
      status: v.optional(AudienceGroupStatusSchema),
      size: v.optional(
        v.pipe(
          v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.maxValue(40n),
          ),
          v.metadata({ examples: [20] }),
        ),
      ),
      includesExternalPublicGroups: v.optional(
        v.pipe(
          v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          v.metadata({ examples: [true] }),
        ),
      ),
      createRoute: v.optional(AudienceGroupCreateRouteSchema),
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
  .input(
    v.object({
      audienceGroupId: v.pipe(
        v.string(),
        v.regex(/^-?\d+$/),
        v.transform((input) => BigInt(input)),
        v.minValue(-9223372036854775808n),
        v.maxValue(9223372036854775807n),
      ),
    }),
  )
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
    v.object({
      page: v.pipe(
        v.string(),
        v.regex(/^-?\d+$/),
        v.transform((input) => BigInt(input)),
        v.minValue(-9223372036854775808n),
        v.maxValue(9223372036854775807n),
        v.minValue(1n),
      ),
      description: v.optional(v.string()),
      status: v.optional(AudienceGroupStatusSchema),
      size: v.optional(
        v.pipe(
          v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.maxValue(40n),
          ),
          v.metadata({ examples: [20] }),
        ),
      ),
      createRoute: v.optional(AudienceGroupCreateRouteSchema),
      includesOwnedAudienceGroups: v.optional(
        v.optional(
          v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          'false',
        ),
      ),
    }),
  )
  .output(GetSharedAudienceGroupsResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
