import { oc } from '@orpc/contract'
import { type } from 'arktype'
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
} from './components'

export const contract = {
  postV2BotAudienceGroupUpload: oc
    .route({
      method: 'POST',
      path: '/v2/bot/audienceGroup/upload',
      tags: ['manage-audience'],
      description: 'Create audience for uploading user IDs (by JSON)',
      successStatus: 202,
    })
    .input(CreateAudienceGroupRequestSchema)
    .output(CreateAudienceGroupResponseSchema),
  putV2BotAudienceGroupUpload: oc
    .route({
      method: 'PUT',
      path: '/v2/bot/audienceGroup/upload',
      tags: ['manage-audience'],
      description:
        'Add user IDs or Identifiers for Advertisers (IFAs) to an audience for uploading user IDs (by JSON)',
      successStatus: 202,
    })
    .input(AddAudienceToAudienceGroupRequestSchema),
  postV2BotAudienceGroupUploadByFile: oc
    .route({
      method: 'POST',
      path: '/v2/bot/audienceGroup/upload/byFile',
      tags: ['manage-audience-blob'],
      description: 'Create audience for uploading user IDs (by file).',
      successStatus: 202,
    })
    .output(CreateAudienceGroupResponseSchema),
  putV2BotAudienceGroupUploadByFile: oc.route({
    method: 'PUT',
    path: '/v2/bot/audienceGroup/upload/byFile',
    tags: ['manage-audience-blob'],
    description:
      'Add user IDs or Identifiers for Advertisers (IFAs) to an audience for uploading user IDs (by file).',
    successStatus: 202,
  }),
  postV2BotAudienceGroupClick: oc
    .route({
      method: 'POST',
      path: '/v2/bot/audienceGroup/click',
      tags: ['manage-audience'],
      description: 'Create audience for click-based retargeting',
      successStatus: 202,
    })
    .input(CreateClickBasedAudienceGroupRequestSchema)
    .output(CreateClickBasedAudienceGroupResponseSchema),
  postV2BotAudienceGroupImp: oc
    .route({
      method: 'POST',
      path: '/v2/bot/audienceGroup/imp',
      tags: ['manage-audience'],
      description: 'Create audience for impression-based retargeting',
      successStatus: 202,
    })
    .input(CreateImpBasedAudienceGroupRequestSchema)
    .output(CreateImpBasedAudienceGroupResponseSchema),
  putV2BotAudienceGroupAudienceGroupIdUpdateDescription: oc
    .route({
      method: 'PUT',
      path: '/v2/bot/audienceGroup/{audienceGroupId}/updateDescription',
      tags: ['manage-audience'],
      description: 'Renames an existing audience.',
    })
    .input(
      type({
        audienceGroupId: type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          ),
        'description?': type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 120 || ctx.mustBe('at most 120 characters'))
          .describe(
            "The audience's name. This is case-insensitive, meaning AUDIENCE and audience are considered identical.\nMax character limit: 120\n",
          ),
      }),
    ),
  getV2BotAudienceGroupAudienceGroupId: oc
    .route({
      method: 'GET',
      path: '/v2/bot/audienceGroup/{audienceGroupId}',
      tags: ['manage-audience'],
      description: 'Gets audience data.',
    })
    .input(
      type({
        audienceGroupId: type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          ),
      }),
    )
    .output(GetAudienceDataResponseSchema),
  deleteV2BotAudienceGroupAudienceGroupId: oc
    .route({
      method: 'DELETE',
      path: '/v2/bot/audienceGroup/{audienceGroupId}',
      tags: ['manage-audience'],
      description: 'Delete audience',
    })
    .input(
      type({
        audienceGroupId: type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          ),
      }),
    ),
  getV2BotAudienceGroupList: oc
    .route({
      method: 'GET',
      path: '/v2/bot/audienceGroup/list',
      tags: ['manage-audience'],
      description: 'Gets data for more than one audience.',
    })
    .input(
      type({
        page: type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1')),
        'description?': type('string'),
        'status?': AudienceGroupStatusSchema,
        'size?': type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data <= 40n || ctx.mustBe('at most 40')),
        'includesExternalPublicGroups?': type(
          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
        ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
        'createRoute?': AudienceGroupCreateRouteSchema,
      }),
    )
    .output(GetAudienceGroupsResponseSchema),
  getV2BotAudienceGroupSharedAudienceGroupId: oc
    .route({
      method: 'GET',
      path: '/v2/bot/audienceGroup/shared/{audienceGroupId}',
      tags: ['manage-audience'],
      description: 'Gets audience data.',
    })
    .input(
      type({
        audienceGroupId: type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          ),
      }),
    )
    .output(GetSharedAudienceDataResponseSchema),
  getV2BotAudienceGroupSharedList: oc
    .route({
      method: 'GET',
      path: '/v2/bot/audienceGroup/shared/list',
      tags: ['manage-audience'],
      description:
        'Gets data for more than one audience, including those shared by the Business Manager.',
    })
    .input(
      type({
        page: type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1')),
        'description?': type('string'),
        'status?': AudienceGroupStatusSchema,
        'size?': type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data <= 40n || ctx.mustBe('at most 40')),
        'createRoute?': AudienceGroupCreateRouteSchema,
        'includesOwnedAudienceGroups?': type(
          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
        ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
      }),
    )
    .output(GetSharedAudienceGroupsResponseSchema),
}
