import { Elysia, t } from 'elysia'
import {
  AdaccountSchema,
  AddAudienceToAudienceGroupRequestSchema,
  AudienceSchema,
  AudienceGroupSchema,
  AudienceGroupCreateRouteSchema,
  AudienceGroupFailedTypeSchema,
  AudienceGroupJobSchema,
  AudienceGroupJobFailedTypeSchema,
  AudienceGroupJobStatusSchema,
  AudienceGroupJobTypeSchema,
  AudienceGroupPermissionSchema,
  AudienceGroupStatusSchema,
  AudienceGroupTypeSchema,
  CreateAudienceGroupRequestSchema,
  CreateAudienceGroupResponseSchema,
  CreateClickBasedAudienceGroupRequestSchema,
  CreateClickBasedAudienceGroupResponseSchema,
  CreateImpBasedAudienceGroupRequestSchema,
  CreateImpBasedAudienceGroupResponseSchema,
  DetailedOwnerSchema,
  ErrorDetailSchema,
  ErrorResponseSchema,
  GetAudienceDataResponseSchema,
  GetAudienceGroupsResponseSchema,
  GetSharedAudienceDataResponseSchema,
  GetSharedAudienceGroupsResponseSchema,
  UpdateAudienceGroupDescriptionRequestSchema,
} from '../../components/schemas'
import { V2Model } from './model'

export const v2 = new Elysia()
  .model({
    Adaccount: AdaccountSchema,
    AddAudienceToAudienceGroupRequest: AddAudienceToAudienceGroupRequestSchema,
    Audience: AudienceSchema,
    AudienceGroup: AudienceGroupSchema,
    AudienceGroupCreateRoute: AudienceGroupCreateRouteSchema,
    AudienceGroupFailedType: AudienceGroupFailedTypeSchema,
    AudienceGroupJob: AudienceGroupJobSchema,
    AudienceGroupJobFailedType: AudienceGroupJobFailedTypeSchema,
    AudienceGroupJobStatus: AudienceGroupJobStatusSchema,
    AudienceGroupJobType: AudienceGroupJobTypeSchema,
    AudienceGroupPermission: AudienceGroupPermissionSchema,
    AudienceGroupStatus: AudienceGroupStatusSchema,
    AudienceGroupType: AudienceGroupTypeSchema,
    CreateAudienceGroupRequest: CreateAudienceGroupRequestSchema,
    CreateAudienceGroupResponse: CreateAudienceGroupResponseSchema,
    CreateClickBasedAudienceGroupRequest: CreateClickBasedAudienceGroupRequestSchema,
    CreateClickBasedAudienceGroupResponse: CreateClickBasedAudienceGroupResponseSchema,
    CreateImpBasedAudienceGroupRequest: CreateImpBasedAudienceGroupRequestSchema,
    CreateImpBasedAudienceGroupResponse: CreateImpBasedAudienceGroupResponseSchema,
    DetailedOwner: DetailedOwnerSchema,
    ErrorDetail: ErrorDetailSchema,
    ErrorResponse: ErrorResponseSchema,
    GetAudienceDataResponse: GetAudienceDataResponseSchema,
    GetAudienceGroupsResponse: GetAudienceGroupsResponseSchema,
    GetSharedAudienceDataResponse: GetSharedAudienceDataResponseSchema,
    GetSharedAudienceGroupsResponse: GetSharedAudienceGroupsResponseSchema,
    UpdateAudienceGroupDescriptionRequest: UpdateAudienceGroupDescriptionRequestSchema,
  })
  .put('/v2/bot/audienceGroup/upload', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'AddAudienceToAudienceGroupRequest',
    response: { 202: t.Void() },
    detail: {
      tags: ['manage-audience'],
      description:
        'Add user IDs or Identifiers for Advertisers (IFAs) to an audience for uploading user IDs (by JSON)',
      operationId: 'addAudienceToAudienceGroup',
    },
  })
  .post('/v2/bot/audienceGroup/upload', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'CreateAudienceGroupRequest',
    response: { 202: 'CreateAudienceGroupResponse' },
    detail: {
      tags: ['manage-audience'],
      description: 'Create audience for uploading user IDs (by JSON)',
      operationId: 'createAudienceGroup',
    },
  })
  .put('/v2/bot/audienceGroup/upload/byFile', ({ body }) => { throw new Error('Not implemented') }, {
    body: V2Model.addUserIdsToAudienceBody,
    response: { 202: t.Void() },
    detail: {
      tags: ['manage-audience-blob'],
      description:
        'Add user IDs or Identifiers for Advertisers (IFAs) to an audience for uploading user IDs (by file).',
      operationId: 'addUserIdsToAudience',
    },
  })
  .post('/v2/bot/audienceGroup/upload/byFile', ({ body }) => { throw new Error('Not implemented') }, {
    body: V2Model.createAudienceForUploadingUserIdsBody,
    response: { 202: 'CreateAudienceGroupResponse' },
    detail: {
      tags: ['manage-audience-blob'],
      description: 'Create audience for uploading user IDs (by file).',
      operationId: 'createAudienceForUploadingUserIds',
    },
  })
  .post('/v2/bot/audienceGroup/click', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'CreateClickBasedAudienceGroupRequest',
    response: { 202: 'CreateClickBasedAudienceGroupResponse' },
    detail: {
      tags: ['manage-audience'],
      description: 'Create audience for click-based retargeting',
      operationId: 'createClickBasedAudienceGroup',
    },
  })
  .post('/v2/bot/audienceGroup/imp', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'CreateImpBasedAudienceGroupRequest',
    response: { 202: 'CreateImpBasedAudienceGroupResponse' },
    detail: {
      tags: ['manage-audience'],
      description: 'Create audience for impression-based retargeting',
      operationId: 'createImpBasedAudienceGroup',
    },
  })
  .put('/v2/bot/audienceGroup/:audienceGroupId/updateDescription', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: V2Model.updateAudienceGroupDescriptionParams,
    body: 'UpdateAudienceGroupDescriptionRequest',
    response: { 200: t.Void() },
    detail: {
      tags: ['manage-audience'],
      description: 'Renames an existing audience.',
      operationId: 'updateAudienceGroupDescription',
    },
  })
  .get('/v2/bot/audienceGroup/:audienceGroupId', ({ params }) => { throw new Error('Not implemented') }, {
    params: V2Model.getAudienceDataParams,
    response: { 200: 'GetAudienceDataResponse', 400: 'ErrorResponse' },
    detail: {
      tags: ['manage-audience'],
      description: 'Gets audience data.',
      operationId: 'getAudienceData',
    },
  })
  .delete('/v2/bot/audienceGroup/:audienceGroupId', ({ params }) => { throw new Error('Not implemented') }, {
    params: V2Model.deleteAudienceGroupParams,
    response: { 200: t.Void() },
    detail: {
      tags: ['manage-audience'],
      description: 'Delete audience',
      operationId: 'deleteAudienceGroup',
    },
  })
  .get('/v2/bot/audienceGroup/list', ({ query }) => { throw new Error('Not implemented') }, {
    query: V2Model.getAudienceGroupsQuery,
    response: { 200: 'GetAudienceGroupsResponse' },
    detail: {
      tags: ['manage-audience'],
      description: 'Gets data for more than one audience.',
      operationId: 'getAudienceGroups',
    },
  })
  .get('/v2/bot/audienceGroup/shared/:audienceGroupId', ({ params }) => { throw new Error('Not implemented') }, {
    params: V2Model.getSharedAudienceDataParams,
    response: { 200: 'GetSharedAudienceDataResponse', 400: 'ErrorResponse' },
    detail: {
      tags: ['manage-audience'],
      description: 'Gets audience data.',
      operationId: 'getSharedAudienceData',
    },
  })
  .get('/v2/bot/audienceGroup/shared/list', ({ query }) => { throw new Error('Not implemented') }, {
    query: V2Model.getSharedAudienceGroupsQuery,
    response: { 200: 'GetSharedAudienceGroupsResponse' },
    detail: {
      tags: ['manage-audience'],
      description:
        'Gets data for more than one audience, including those shared by the Business Manager.',
      operationId: 'getSharedAudienceGroups',
    },
  })
