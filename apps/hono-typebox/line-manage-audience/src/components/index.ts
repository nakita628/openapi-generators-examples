import { Type, type Static } from 'typebox'

export const AudienceSchema = Type.Object(
  {
    id: Type.Optional(
      Type.String({ description: 'A user ID or IFA. You can specify an empty array.' }),
    ),
  },
  { description: 'Audience' },
)

export type Audience = Static<typeof AudienceSchema>

export const CreateAudienceGroupRequestSchema = Type.Object(
  {
    description: Type.Optional(
      Type.String({
        maxLength: 120,
        description:
          "The audience's name. This is case-insensitive, meaning AUDIENCE and audience are considered identical.\nMax character limit: 120\n",
      }),
    ),
    isIfaAudience: Type.Optional(
      Type.Boolean({
        description:
          'To specify recipients by IFAs: set true.\nTo specify recipients by user IDs: set false or omit isIfaAudience property.\n',
      }),
    ),
    uploadDescription: Type.Optional(
      Type.String({
        description: 'The description to register for the job (in jobs[].description).\n',
      }),
    ),
    audiences: Type.Optional(
      Type.Array(AudienceSchema, {
        maxItems: 10000,
        description: 'An array of user IDs or IFAs.\nMax number: 10,000\n',
      }),
    ),
  },
  {
    description: 'Create audience for uploading user IDs (by JSON)',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#create-upload-audience-group',
    },
  },
)

export type CreateAudienceGroupRequest = Static<typeof CreateAudienceGroupRequestSchema>

export const AudienceGroupTypeSchema = Type.Union(
  [
    Type.Literal('UPLOAD'),
    Type.Literal('CLICK'),
    Type.Literal('IMP'),
    Type.Literal('CHAT_TAG'),
    Type.Literal('FRIEND_PATH'),
    Type.Literal('RESERVATION'),
    Type.Literal('APP_EVENT'),
    Type.Literal('VIDEO_VIEW'),
    Type.Literal('WEBTRAFFIC'),
    Type.Literal('IMAGE_CLICK'),
    Type.Literal('RICHMENU_IMP'),
    Type.Literal('RICHMENU_CLICK'),
    Type.Literal('POP_AD_IMP'),
    Type.Literal('TRACKINGTAG_WEBTRAFFIC'),
  ],
  { description: 'Audience group type' },
)

export type AudienceGroupType = Static<typeof AudienceGroupTypeSchema>

export const CreateAudienceGroupResponseSchema = Type.Object(
  {
    audienceGroupId: Type.Optional(Type.Integer({ description: 'The audience ID.' })),
    createRoute: Type.Optional(
      Type.Literal('MESSAGING_API', {
        description:
          'How the audience was created.\n\n`MESSAGING_API`: An audience created with Messaging API.\n',
      }),
    ),
    type: Type.Optional(AudienceGroupTypeSchema),
    description: Type.Optional(Type.String({ description: "The audience's name." })),
    created: Type.Optional(
      Type.Integer({ description: 'When the audience was created (in UNIX time).' }),
    ),
    permission: Type.Optional(
      Type.Union([Type.Literal('READ'), Type.Literal('READ_WRITE')], {
        description:
          "Audience's update permission. Audiences linked to the same channel will be READ_WRITE.\n\n`READ`: Can use only.\n`READ_WRITE`: Can use and update.\n",
      }),
    ),
    expireTimestamp: Type.Optional(
      Type.Integer({
        description: 'Time of audience expiration. Only returned for specific audiences.\n',
      }),
    ),
    isIfaAudience: Type.Optional(
      Type.Boolean({
        description:
          'The value indicating the type of account to be sent, as specified when creating the audience for uploading user IDs. One of:\n\n`true`: Accounts are specified with IFAs.\n`false` (default): Accounts are specified with user IDs.\n',
      }),
    ),
  },
  {
    description: 'Create audience for uploading user IDs (by JSON)',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#create-upload-audience-group',
    },
  },
)

export type CreateAudienceGroupResponse = Static<typeof CreateAudienceGroupResponseSchema>

export const AddAudienceToAudienceGroupRequestSchema = Type.Object(
  {
    audienceGroupId: Type.Optional(Type.Integer({ description: 'The audience ID.' })),
    uploadDescription: Type.Optional(Type.String({ description: "The audience's name." })),
    audiences: Type.Optional(
      Type.Array(AudienceSchema, {
        maxItems: 10000,
        description: 'An array of up to 10,000 user IDs or IFAs.',
      }),
    ),
  },
  {
    description:
      'Add user IDs or Identifiers for Advertisers (IFAs) to an audience for uploading user IDs (by JSON)',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#update-upload-audience-group',
    },
  },
)

export type AddAudienceToAudienceGroupRequest = Static<
  typeof AddAudienceToAudienceGroupRequestSchema
>

export const CreateClickBasedAudienceGroupRequestSchema = Type.Object(
  {
    description: Type.Optional(
      Type.String({
        maxLength: 120,
        description:
          "The audience's name. This is case-insensitive, meaning AUDIENCE and audience are considered identical.\nMax character limit: 120\n",
      }),
    ),
    requestId: Type.Optional(
      Type.String({
        description:
          'The request ID of a broadcast or narrowcast message sent in the past 60 days.\nEach Messaging API request has a request ID.\n',
      }),
    ),
    clickUrl: Type.Optional(
      Type.String({
        format: 'uri',
        maxLength: 2000,
        description:
          'The URL clicked by the user. If empty, users who clicked any URL in the message are added to the list of recipients.\nMax character limit: 2,000\n',
      }),
    ),
  },
  {
    description: 'Create audience for click-based retargeting',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#create-click-audience-group',
    },
  },
)

export type CreateClickBasedAudienceGroupRequest = Static<
  typeof CreateClickBasedAudienceGroupRequestSchema
>

export const CreateClickBasedAudienceGroupResponseSchema = Type.Object(
  {
    audienceGroupId: Type.Optional(Type.Integer({ description: 'The audience ID.' })),
    type: Type.Optional(AudienceGroupTypeSchema),
    description: Type.Optional(Type.String({ description: "The audience's name." })),
    created: Type.Optional(
      Type.Integer({ description: 'When the audience was created (in UNIX time).' }),
    ),
    requestId: Type.Optional(
      Type.String({
        description: 'The request ID that was specified when the audience was created.',
      }),
    ),
    clickUrl: Type.Optional(
      Type.String({
        format: 'uri',
        description: 'The URL that was specified when the audience was created.',
      }),
    ),
    createRoute: Type.Optional(
      Type.Literal('MESSAGING_API', {
        description:
          'How the audience was created.\n`MESSAGING_API`: An audience created with Messaging API.\n',
      }),
    ),
    permission: Type.Optional(
      Type.Union([Type.Literal('READ'), Type.Literal('READ_WRITE')], {
        description:
          "Audience's update permission. Audiences linked to the same channel will be READ_WRITE.\n\n- `READ`: Can use only.\n- `READ_WRITE`: Can use and update.\n",
      }),
    ),
    expireTimestamp: Type.Optional(
      Type.Integer({
        description: 'Time of audience expiration. Only returned for specific audiences.',
      }),
    ),
    isIfaAudience: Type.Optional(
      Type.Boolean({
        description:
          'The value indicating the type of account to be sent, as specified when creating the audience for uploading user IDs. One of:\n\ntrue: Accounts are specified with IFAs.\nfalse (default): Accounts are specified with user IDs.\n',
        default: false,
      }),
    ),
  },
  {
    description: 'Create audience for click-based retargeting',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#create-click-audience-group',
    },
  },
)

export type CreateClickBasedAudienceGroupResponse = Static<
  typeof CreateClickBasedAudienceGroupResponseSchema
>

export const CreateImpBasedAudienceGroupRequestSchema = Type.Object(
  {
    description: Type.Optional(
      Type.String({
        minLength: 1,
        maxLength: 120,
        description:
          "The audience's name.\nThis is case-insensitive, meaning `AUDIENCE` and `audience` are considered identical.\nMax character limit: 120\n",
      }),
    ),
    requestId: Type.Optional(
      Type.String({
        description:
          'The request ID of a broadcast or narrowcast message sent in the past 60 days.\nEach Messaging API request has a request ID.\n',
      }),
    ),
  },
  {
    description: 'Create audience for impression-based retargeting',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#create-imp-audience-group',
    },
  },
)

export type CreateImpBasedAudienceGroupRequest = Static<
  typeof CreateImpBasedAudienceGroupRequestSchema
>

export const CreateImpBasedAudienceGroupResponseSchema = Type.Object(
  {
    audienceGroupId: Type.Optional(Type.Integer({ description: 'The audience ID.' })),
    type: Type.Optional(AudienceGroupTypeSchema),
    description: Type.Optional(Type.String({ description: "The audience's name." })),
    created: Type.Optional(
      Type.Integer({ description: 'When the audience was created (in UNIX time).' }),
    ),
    requestId: Type.Optional(
      Type.String({
        description: 'The request ID that was specified when the audience was created.',
      }),
    ),
  },
  {
    description: 'Create audience for impression-based retargeting',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#create-imp-audience-group',
    },
  },
)

export type CreateImpBasedAudienceGroupResponse = Static<
  typeof CreateImpBasedAudienceGroupResponseSchema
>

export const UpdateAudienceGroupDescriptionRequestSchema = Type.Object(
  {
    description: Type.Optional(
      Type.String({
        minLength: 1,
        maxLength: 120,
        description:
          "The audience's name. This is case-insensitive, meaning AUDIENCE and audience are considered identical.\nMax character limit: 120\n",
      }),
    ),
  },
  {
    description: 'Rename an audience',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#set-description-audience-group',
    },
  },
)

export type UpdateAudienceGroupDescriptionRequest = Static<
  typeof UpdateAudienceGroupDescriptionRequestSchema
>

export const AudienceGroupStatusSchema = Type.Union(
  [
    Type.Literal('IN_PROGRESS'),
    Type.Literal('READY'),
    Type.Literal('FAILED'),
    Type.Literal('EXPIRED'),
    Type.Literal('INACTIVE'),
    Type.Literal('ACTIVATING'),
  ],
  { description: 'Status' },
)

export type AudienceGroupStatus = Static<typeof AudienceGroupStatusSchema>

export const AudienceGroupFailedTypeSchema = Type.Union([
  Type.Union(
    [Type.Literal('AUDIENCE_GROUP_AUDIENCE_INSUFFICIENT'), Type.Literal('INTERNAL_ERROR')],
    { description: 'Failed type' },
  ),
  Type.Null(),
])

export type AudienceGroupFailedType = Static<typeof AudienceGroupFailedTypeSchema>

export const AudienceGroupPermissionSchema = Type.Union(
  [Type.Literal('READ'), Type.Literal('READ_WRITE')],
  { description: 'Permission' },
)

export type AudienceGroupPermission = Static<typeof AudienceGroupPermissionSchema>

export const AudienceGroupCreateRouteSchema = Type.Union(
  [
    Type.Literal('OA_MANAGER'),
    Type.Literal('MESSAGING_API'),
    Type.Literal('POINT_AD'),
    Type.Literal('AD_MANAGER'),
  ],
  {
    description:
      'How the audience was created. One of:\n\n- `OA_MANAGER`: Audience created with [LINE Official Account Manager](https://manager.line.biz/).\n- `MESSAGING_API`: Audience created with Messaging API.\n- `POINT_AD`: Audience created with [LINE Points Ads](https://www.linebiz.com/jp/service/line-point-ad/) (Japanese only).\n- `AD_MANAGER`: Audience created with [LINE Ads](https://admanager.line.biz/).\n',
  },
)

export type AudienceGroupCreateRoute = Static<typeof AudienceGroupCreateRouteSchema>

export const AudienceGroupSchema = Type.Object(
  {
    audienceGroupId: Type.Optional(Type.Integer({ description: 'The audience ID.' })),
    type: Type.Optional(AudienceGroupTypeSchema),
    description: Type.Optional(Type.String({ description: "The audience's name." })),
    status: Type.Optional(AudienceGroupStatusSchema),
    failedType: Type.Optional(AudienceGroupFailedTypeSchema),
    audienceCount: Type.Optional(
      Type.Integer({ description: 'The number of users included in the audience.' }),
    ),
    created: Type.Optional(
      Type.Integer({ description: 'When the audience was created (in UNIX time).' }),
    ),
    requestId: Type.Optional(
      Type.String({
        description:
          'The request ID that was specified when the audience was created.\nThis is only included when `audienceGroup.type` is CLICK or IMP.\n',
      }),
    ),
    clickUrl: Type.Optional(
      Type.String({
        format: 'uri',
        description:
          'The URL that was specified when the audience was created.\nThis is only included when `audienceGroup.type` is CLICK and link URL is specified.\n',
      }),
    ),
    isIfaAudience: Type.Optional(
      Type.Boolean({
        description:
          'The value indicating the type of account to be sent, as specified when creating the audience for uploading user IDs.\n',
      }),
    ),
    permission: Type.Optional(AudienceGroupPermissionSchema),
    createRoute: Type.Optional(AudienceGroupCreateRouteSchema),
  },
  { description: 'Audience group' },
)

export type AudienceGroup = Static<typeof AudienceGroupSchema>

export const AudienceGroupJobTypeSchema = Type.Literal('DIFF_ADD', { description: 'Job Type' })

export type AudienceGroupJobType = Static<typeof AudienceGroupJobTypeSchema>

export const AudienceGroupJobStatusSchema = Type.Union(
  [
    Type.Literal('QUEUED'),
    Type.Literal('WORKING'),
    Type.Literal('FINISHED'),
    Type.Literal('FAILED'),
  ],
  { description: 'Job status' },
)

export type AudienceGroupJobStatus = Static<typeof AudienceGroupJobStatusSchema>

export const AudienceGroupJobFailedTypeSchema = Type.Union(
  [Type.Literal('INTERNAL_ERROR'), Type.Literal('AUDIENCE_GROUP_AUDIENCE_INSUFFICIENT')],
  { description: 'Failed type' },
)

export type AudienceGroupJobFailedType = Static<typeof AudienceGroupJobFailedTypeSchema>

export const AudienceGroupJobSchema = Type.Object(
  {
    audienceGroupJobId: Type.Optional(Type.Integer({ description: 'A job ID.' })),
    audienceGroupId: Type.Optional(Type.Integer({ description: 'An audience ID.' })),
    description: Type.Optional(Type.String({ description: "The job's description." })),
    type: Type.Optional(AudienceGroupJobTypeSchema),
    jobStatus: Type.Optional(AudienceGroupJobStatusSchema),
    failedType: Type.Optional(AudienceGroupJobFailedTypeSchema),
    audienceCount: Type.Optional(
      Type.Integer({
        description: 'The number of accounts (recipients) that were added or removed.',
      }),
    ),
    created: Type.Optional(
      Type.Integer({ description: 'When the job was created (in UNIX time).' }),
    ),
  },
  {
    description: 'Audience group job',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-audience-group',
    },
  },
)

export type AudienceGroupJob = Static<typeof AudienceGroupJobSchema>

export const AdaccountSchema = Type.Object(
  { name: Type.Optional(Type.String({ description: 'Ad account name.' })) },
  { description: 'Adaccount' },
)

export type Adaccount = Static<typeof AdaccountSchema>

export const GetAudienceDataResponseSchema = Type.Object(
  {
    audienceGroup: Type.Optional(AudienceGroupSchema),
    jobs: Type.Optional(
      Type.Array(AudienceGroupJobSchema, {
        maxItems: 50,
        description:
          'An array of jobs.\nThis array is used to keep track of each attempt to add new user IDs or IFAs to an audience for uploading user IDs.\nEmpty array is returned for any other type of audience.\nMax: 50\n',
      }),
    ),
    adaccount: Type.Optional(AdaccountSchema),
  },
  {
    description: 'Get audience data',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-audience-group',
    },
  },
)

export type GetAudienceDataResponse = Static<typeof GetAudienceDataResponseSchema>

export const DetailedOwnerSchema = Type.Object(
  {
    serviceType: Type.Optional(
      Type.String({
        description: 'Service name where the audience group has been created.',
        examples: ['lap'],
      }),
    ),
    id: Type.Optional(
      Type.String({ description: 'Owner ID in the service.', examples: ['A012345678'] }),
    ),
    name: Type.Optional(Type.String({ description: 'Owner account name.' })),
  },
  { description: 'Owner of this audience group.' },
)

export type DetailedOwner = Static<typeof DetailedOwnerSchema>

export const GetSharedAudienceDataResponseSchema = Type.Object(
  {
    audienceGroup: Type.Optional(AudienceGroupSchema),
    jobs: Type.Optional(
      Type.Array(AudienceGroupJobSchema, {
        maxItems: 50,
        description:
          'An array of jobs.\nThis array is used to keep track of each attempt to add new user IDs or IFAs to an audience for uploading user IDs.\nEmpty array is returned for any other type of audience.\nMax: 50\n',
      }),
    ),
    owner: Type.Optional(DetailedOwnerSchema),
  },
  {
    description: 'Get audience data',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-audience-group',
    },
  },
)

export type GetSharedAudienceDataResponse = Static<typeof GetSharedAudienceDataResponseSchema>

export const GetAudienceGroupsResponseSchema = Type.Object(
  {
    audienceGroups: Type.Optional(
      Type.Array(AudienceGroupSchema, {
        description:
          'An array of audience data. If there are no audiences that match the specified filter, an empty array will be returned.',
      }),
    ),
    hasNextPage: Type.Optional(
      Type.Boolean({ description: 'true when this is not the last page.' }),
    ),
    totalCount: Type.Optional(
      Type.Integer({
        description:
          'The total number of audiences that can be returned with the specified filter.',
      }),
    ),
    readWriteAudienceGroupTotalCount: Type.Optional(
      Type.Integer({
        description:
          'Of the audiences you can get with the specified filter, the number of audiences with the update permission set to READ_WRITE.',
      }),
    ),
    page: Type.Optional(Type.Integer({ description: 'The current page number.' })),
    size: Type.Optional(
      Type.Integer({ description: 'The maximum number of audiences on the current page.' }),
    ),
  },
  {
    description: 'Gets data for more than one audience.',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-audience-groups',
    },
  },
)

export type GetAudienceGroupsResponse = Static<typeof GetAudienceGroupsResponseSchema>

export const GetSharedAudienceGroupsResponseSchema = Type.Object(
  {
    audienceGroups: Type.Optional(
      Type.Array(AudienceGroupSchema, {
        description:
          'An array of audience data. If there are no audiences that match the specified filter, an empty array will be returned.',
      }),
    ),
    hasNextPage: Type.Optional(
      Type.Boolean({ description: 'true when this is not the last page.' }),
    ),
    totalCount: Type.Optional(
      Type.Integer({
        description:
          'The total number of audiences that can be returned with the specified filter.',
      }),
    ),
    readWriteAudienceGroupTotalCount: Type.Optional(
      Type.Integer({
        description:
          'Of the audiences you can get with the specified filter, the number of audiences with the update permission set to READ_WRITE.',
      }),
    ),
    page: Type.Optional(Type.Integer({ description: 'The current page number.' })),
    size: Type.Optional(
      Type.Integer({ description: 'The maximum number of audiences on the current page.' }),
    ),
  },
  {
    description: 'Gets data for more than one audience.',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-audience-groups',
    },
  },
)

export type GetSharedAudienceGroupsResponse = Static<typeof GetSharedAudienceGroupsResponseSchema>

export const ErrorDetailSchema = Type.Object({
  message: Type.Optional(
    Type.String({
      description: 'Details of the error. Not included in the response under certain situations.',
    }),
  ),
  property: Type.Optional(
    Type.String({
      description:
        'Location of where the error occurred. Returns the JSON field name or query parameter name of the request. Not included in the response under certain situations.',
    }),
  ),
})

export type ErrorDetail = Static<typeof ErrorDetailSchema>

export const ErrorResponseSchema = Type.Object(
  {
    message: Type.String({ description: 'Message containing information about the error.' }),
    details: Type.Optional(
      Type.Array(ErrorDetailSchema, {
        description:
          'An array of error details. If the array is empty, this property will not be included in the response.',
      }),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#error-responses',
    },
  },
)

export type ErrorResponse = Static<typeof ErrorResponseSchema>

export const BearerSecurityScheme = {
  type: 'http',
  scheme: 'bearer',
  description: 'Channel access token',
}
