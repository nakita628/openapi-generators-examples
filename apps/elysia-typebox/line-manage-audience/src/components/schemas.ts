import { t } from 'elysia'

export const AudienceSchema = t.Object(
  {
    id: t.Optional(t.String({ description: 'A user ID or IFA. You can specify an empty array.' })),
  },
  { description: 'Audience' },
)

export const CreateAudienceGroupRequestSchema = t.Object(
  {
    description: t.Optional(
      t.String({
        maxLength: 120,
        description:
          "The audience's name. This is case-insensitive, meaning AUDIENCE and audience are considered identical.\nMax character limit: 120\n",
      }),
    ),
    isIfaAudience: t.Optional(
      t.Boolean({
        description:
          'To specify recipients by IFAs: set true.\nTo specify recipients by user IDs: set false or omit isIfaAudience property.\n',
      }),
    ),
    uploadDescription: t.Optional(
      t.String({
        description: 'The description to register for the job (in jobs[].description).\n',
      }),
    ),
    audiences: t.Optional(
      t.Array(AudienceSchema, {
        maxItems: 10000,
        description: 'An array of user IDs or IFAs.\nMax number: 10,000\n',
      }),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#create-upload-audience-group',
    },
    description: 'Create audience for uploading user IDs (by JSON)',
  },
)

export const AudienceGroupTypeSchema = t.UnionEnum(
  [
    'UPLOAD',
    'CLICK',
    'IMP',
    'CHAT_TAG',
    'FRIEND_PATH',
    'RESERVATION',
    'APP_EVENT',
    'VIDEO_VIEW',
    'WEBTRAFFIC',
    'IMAGE_CLICK',
    'RICHMENU_IMP',
    'RICHMENU_CLICK',
    'POP_AD_IMP',
    'TRACKINGTAG_WEBTRAFFIC',
  ],
  { description: 'Audience group type', default: undefined },
)

export const CreateAudienceGroupResponseSchema = t.Object(
  {
    audienceGroupId: t.Optional(
      t.Integer({ format: 'int64', maximum: 9007199254740991, description: 'The audience ID.' }),
    ),
    createRoute: t.Optional(
      t.Literal('MESSAGING_API', {
        description:
          'How the audience was created.\n\n`MESSAGING_API`: An audience created with Messaging API.\n',
      }),
    ),
    type: t.Optional(AudienceGroupTypeSchema),
    description: t.Optional(t.String({ description: "The audience's name." })),
    created: t.Optional(
      t.Integer({
        format: 'int64',
        maximum: 9007199254740991,
        description: 'When the audience was created (in UNIX time).',
      }),
    ),
    permission: t.Optional(
      t.UnionEnum(['READ', 'READ_WRITE'], {
        description:
          "Audience's update permission. Audiences linked to the same channel will be READ_WRITE.\n\n`READ`: Can use only.\n`READ_WRITE`: Can use and update.\n",
        default: undefined,
      }),
    ),
    expireTimestamp: t.Optional(
      t.Integer({
        format: 'int64',
        maximum: 9007199254740991,
        description: 'Time of audience expiration. Only returned for specific audiences.\n',
      }),
    ),
    isIfaAudience: t.Optional(
      t.Boolean({
        description:
          'The value indicating the type of account to be sent, as specified when creating the audience for uploading user IDs. One of:\n\n`true`: Accounts are specified with IFAs.\n`false` (default): Accounts are specified with user IDs.\n',
      }),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#create-upload-audience-group',
    },
    description: 'Create audience for uploading user IDs (by JSON)',
  },
)

export const AddAudienceToAudienceGroupRequestSchema = t.Object(
  {
    audienceGroupId: t.Optional(
      t.Integer({ format: 'int64', maximum: 9007199254740991, description: 'The audience ID.' }),
    ),
    uploadDescription: t.Optional(t.String({ description: "The audience's name." })),
    audiences: t.Optional(
      t.Array(AudienceSchema, {
        maxItems: 10000,
        description: 'An array of up to 10,000 user IDs or IFAs.',
      }),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#update-upload-audience-group',
    },
    description:
      'Add user IDs or Identifiers for Advertisers (IFAs) to an audience for uploading user IDs (by JSON)',
  },
)

export const CreateClickBasedAudienceGroupRequestSchema = t.Object(
  {
    description: t.Optional(
      t.String({
        maxLength: 120,
        description:
          "The audience's name. This is case-insensitive, meaning AUDIENCE and audience are considered identical.\nMax character limit: 120\n",
      }),
    ),
    requestId: t.Optional(
      t.String({
        description:
          'The request ID of a broadcast or narrowcast message sent in the past 60 days.\nEach Messaging API request has a request ID.\n',
      }),
    ),
    clickUrl: t.Optional(
      t.String({
        format: 'uri',
        maxLength: 2000,
        description:
          'The URL clicked by the user. If empty, users who clicked any URL in the message are added to the list of recipients.\nMax character limit: 2,000\n',
      }),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#create-click-audience-group',
    },
    description: 'Create audience for click-based retargeting',
  },
)

export const CreateClickBasedAudienceGroupResponseSchema = t.Object(
  {
    audienceGroupId: t.Optional(
      t.Integer({ format: 'int64', maximum: 9007199254740991, description: 'The audience ID.' }),
    ),
    type: t.Optional(AudienceGroupTypeSchema),
    description: t.Optional(t.String({ description: "The audience's name." })),
    created: t.Optional(
      t.Integer({
        format: 'int64',
        maximum: 9007199254740991,
        description: 'When the audience was created (in UNIX time).',
      }),
    ),
    requestId: t.Optional(
      t.String({ description: 'The request ID that was specified when the audience was created.' }),
    ),
    clickUrl: t.Optional(
      t.String({
        format: 'uri',
        description: 'The URL that was specified when the audience was created.',
      }),
    ),
    createRoute: t.Optional(
      t.Literal('MESSAGING_API', {
        description:
          'How the audience was created.\n`MESSAGING_API`: An audience created with Messaging API.\n',
      }),
    ),
    permission: t.Optional(
      t.UnionEnum(['READ', 'READ_WRITE'], {
        description:
          "Audience's update permission. Audiences linked to the same channel will be READ_WRITE.\n\n- `READ`: Can use only.\n- `READ_WRITE`: Can use and update.\n",
        default: undefined,
      }),
    ),
    expireTimestamp: t.Optional(
      t.Integer({
        format: 'int64',
        maximum: 9007199254740991,
        description: 'Time of audience expiration. Only returned for specific audiences.',
      }),
    ),
    isIfaAudience: t.Optional(
      t.Boolean({
        description:
          'The value indicating the type of account to be sent, as specified when creating the audience for uploading user IDs. One of:\n\ntrue: Accounts are specified with IFAs.\nfalse (default): Accounts are specified with user IDs.\n',
        default: false,
      }),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#create-click-audience-group',
    },
    description: 'Create audience for click-based retargeting',
  },
)

export const CreateImpBasedAudienceGroupRequestSchema = t.Object(
  {
    description: t.Optional(
      t.String({
        minLength: 1,
        maxLength: 120,
        description:
          "The audience's name.\nThis is case-insensitive, meaning `AUDIENCE` and `audience` are considered identical.\nMax character limit: 120\n",
      }),
    ),
    requestId: t.Optional(
      t.String({
        description:
          'The request ID of a broadcast or narrowcast message sent in the past 60 days.\nEach Messaging API request has a request ID.\n',
      }),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#create-imp-audience-group',
    },
    description: 'Create audience for impression-based retargeting',
  },
)

export const CreateImpBasedAudienceGroupResponseSchema = t.Object(
  {
    audienceGroupId: t.Optional(
      t.Integer({ format: 'int64', maximum: 9007199254740991, description: 'The audience ID.' }),
    ),
    type: t.Optional(AudienceGroupTypeSchema),
    description: t.Optional(t.String({ description: "The audience's name." })),
    created: t.Optional(
      t.Integer({
        format: 'int64',
        maximum: 9007199254740991,
        description: 'When the audience was created (in UNIX time).',
      }),
    ),
    requestId: t.Optional(
      t.String({ description: 'The request ID that was specified when the audience was created.' }),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#create-imp-audience-group',
    },
    description: 'Create audience for impression-based retargeting',
  },
)

export const UpdateAudienceGroupDescriptionRequestSchema = t.Object(
  {
    description: t.Optional(
      t.String({
        minLength: 1,
        maxLength: 120,
        description:
          "The audience's name. This is case-insensitive, meaning AUDIENCE and audience are considered identical.\nMax character limit: 120\n",
      }),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#set-description-audience-group',
    },
    description: 'Rename an audience',
  },
)

export const AudienceGroupStatusSchema = t.UnionEnum(
  ['IN_PROGRESS', 'READY', 'FAILED', 'EXPIRED', 'INACTIVE', 'ACTIVATING'],
  { description: 'Status', default: undefined },
)

export const AudienceGroupFailedTypeSchema = t.Union([
  t.UnionEnum(['AUDIENCE_GROUP_AUDIENCE_INSUFFICIENT', 'INTERNAL_ERROR'], {
    description: 'Failed type',
    default: undefined,
  }),
  t.Null(),
])

export const AudienceGroupPermissionSchema = t.UnionEnum(['READ', 'READ_WRITE'], {
  description: 'Permission',
  default: undefined,
})

export const AudienceGroupCreateRouteSchema = t.UnionEnum(
  ['OA_MANAGER', 'MESSAGING_API', 'POINT_AD', 'AD_MANAGER'],
  {
    description:
      'How the audience was created. One of:\n\n- `OA_MANAGER`: Audience created with [LINE Official Account Manager](https://manager.line.biz/).\n- `MESSAGING_API`: Audience created with Messaging API.\n- `POINT_AD`: Audience created with [LINE Points Ads](https://www.linebiz.com/jp/service/line-point-ad/) (Japanese only).\n- `AD_MANAGER`: Audience created with [LINE Ads](https://admanager.line.biz/).\n',
    default: undefined,
  },
)

export const AudienceGroupSchema = t.Object(
  {
    audienceGroupId: t.Optional(
      t.Integer({ format: 'int64', maximum: 9007199254740991, description: 'The audience ID.' }),
    ),
    type: t.Optional(AudienceGroupTypeSchema),
    description: t.Optional(t.String({ description: "The audience's name." })),
    status: t.Optional(AudienceGroupStatusSchema),
    failedType: t.Optional(AudienceGroupFailedTypeSchema),
    audienceCount: t.Optional(
      t.Integer({
        format: 'int64',
        maximum: 9007199254740991,
        description: 'The number of users included in the audience.',
      }),
    ),
    created: t.Optional(
      t.Integer({
        format: 'int64',
        maximum: 9007199254740991,
        description: 'When the audience was created (in UNIX time).',
      }),
    ),
    requestId: t.Optional(
      t.String({
        description:
          'The request ID that was specified when the audience was created.\nThis is only included when `audienceGroup.type` is CLICK or IMP.\n',
      }),
    ),
    clickUrl: t.Optional(
      t.String({
        format: 'uri',
        description:
          'The URL that was specified when the audience was created.\nThis is only included when `audienceGroup.type` is CLICK and link URL is specified.\n',
      }),
    ),
    isIfaAudience: t.Optional(
      t.Boolean({
        description:
          'The value indicating the type of account to be sent, as specified when creating the audience for uploading user IDs.\n',
      }),
    ),
    permission: t.Optional(AudienceGroupPermissionSchema),
    createRoute: t.Optional(AudienceGroupCreateRouteSchema),
  },
  { description: 'Audience group' },
)

export const AudienceGroupJobTypeSchema = t.Literal('DIFF_ADD', { description: 'Job Type' })

export const AudienceGroupJobStatusSchema = t.UnionEnum(
  ['QUEUED', 'WORKING', 'FINISHED', 'FAILED'],
  { description: 'Job status', default: undefined },
)

export const AudienceGroupJobFailedTypeSchema = t.UnionEnum(
  ['INTERNAL_ERROR', 'AUDIENCE_GROUP_AUDIENCE_INSUFFICIENT'],
  { description: 'Failed type', default: undefined },
)

export const AudienceGroupJobSchema = t.Object(
  {
    audienceGroupJobId: t.Optional(
      t.Integer({ format: 'int64', maximum: 9007199254740991, description: 'A job ID.' }),
    ),
    audienceGroupId: t.Optional(
      t.Integer({ format: 'int64', maximum: 9007199254740991, description: 'An audience ID.' }),
    ),
    description: t.Optional(t.String({ description: "The job's description." })),
    type: t.Optional(AudienceGroupJobTypeSchema),
    jobStatus: t.Optional(AudienceGroupJobStatusSchema),
    failedType: t.Optional(AudienceGroupJobFailedTypeSchema),
    audienceCount: t.Optional(
      t.Integer({
        format: 'int64',
        maximum: 9007199254740991,
        description: 'The number of accounts (recipients) that were added or removed.',
      }),
    ),
    created: t.Optional(
      t.Integer({
        format: 'int64',
        maximum: 9007199254740991,
        description: 'When the job was created (in UNIX time).',
      }),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-audience-group',
    },
    description: 'Audience group job',
  },
)

export const AdaccountSchema = t.Object(
  { name: t.Optional(t.String({ description: 'Ad account name.' })) },
  { description: 'Adaccount' },
)

export const GetAudienceDataResponseSchema = t.Object(
  {
    audienceGroup: t.Optional(AudienceGroupSchema),
    jobs: t.Optional(
      t.Array(AudienceGroupJobSchema, {
        maxItems: 50,
        description:
          'An array of jobs.\nThis array is used to keep track of each attempt to add new user IDs or IFAs to an audience for uploading user IDs.\nEmpty array is returned for any other type of audience.\nMax: 50\n',
      }),
    ),
    adaccount: t.Optional(AdaccountSchema),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-audience-group',
    },
    description: 'Get audience data',
  },
)

export const DetailedOwnerSchema = t.Object(
  {
    serviceType: t.Optional(
      t.String({
        example: 'lap',
        description: 'Service name where the audience group has been created.',
      }),
    ),
    id: t.Optional(t.String({ example: 'A012345678', description: 'Owner ID in the service.' })),
    name: t.Optional(t.String({ description: 'Owner account name.' })),
  },
  { description: 'Owner of this audience group.' },
)

export const GetSharedAudienceDataResponseSchema = t.Object(
  {
    audienceGroup: t.Optional(AudienceGroupSchema),
    jobs: t.Optional(
      t.Array(AudienceGroupJobSchema, {
        maxItems: 50,
        description:
          'An array of jobs.\nThis array is used to keep track of each attempt to add new user IDs or IFAs to an audience for uploading user IDs.\nEmpty array is returned for any other type of audience.\nMax: 50\n',
      }),
    ),
    owner: t.Optional(DetailedOwnerSchema),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-audience-group',
    },
    description: 'Get audience data',
  },
)

export const GetAudienceGroupsResponseSchema = t.Object(
  {
    audienceGroups: t.Optional(
      t.Array(AudienceGroupSchema, {
        description:
          'An array of audience data. If there are no audiences that match the specified filter, an empty array will be returned.',
      }),
    ),
    hasNextPage: t.Optional(t.Boolean({ description: 'true when this is not the last page.' })),
    totalCount: t.Optional(
      t.Integer({
        format: 'int64',
        maximum: 9007199254740991,
        description:
          'The total number of audiences that can be returned with the specified filter.',
      }),
    ),
    readWriteAudienceGroupTotalCount: t.Optional(
      t.Integer({
        format: 'int64',
        maximum: 9007199254740991,
        description:
          'Of the audiences you can get with the specified filter, the number of audiences with the update permission set to READ_WRITE.',
      }),
    ),
    page: t.Optional(
      t.Integer({
        format: 'int64',
        maximum: 9007199254740991,
        description: 'The current page number.',
      }),
    ),
    size: t.Optional(
      t.Integer({
        format: 'int64',
        maximum: 9007199254740991,
        description: 'The maximum number of audiences on the current page.',
      }),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-audience-groups',
    },
    description: 'Gets data for more than one audience.',
  },
)

export const GetSharedAudienceGroupsResponseSchema = t.Object(
  {
    audienceGroups: t.Optional(
      t.Array(AudienceGroupSchema, {
        description:
          'An array of audience data. If there are no audiences that match the specified filter, an empty array will be returned.',
      }),
    ),
    hasNextPage: t.Optional(t.Boolean({ description: 'true when this is not the last page.' })),
    totalCount: t.Optional(
      t.Integer({
        format: 'int64',
        maximum: 9007199254740991,
        description:
          'The total number of audiences that can be returned with the specified filter.',
      }),
    ),
    readWriteAudienceGroupTotalCount: t.Optional(
      t.Integer({
        format: 'int64',
        maximum: 9007199254740991,
        description:
          'Of the audiences you can get with the specified filter, the number of audiences with the update permission set to READ_WRITE.',
      }),
    ),
    page: t.Optional(
      t.Integer({
        format: 'int64',
        maximum: 9007199254740991,
        description: 'The current page number.',
      }),
    ),
    size: t.Optional(
      t.Integer({
        format: 'int64',
        maximum: 9007199254740991,
        description: 'The maximum number of audiences on the current page.',
      }),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-audience-groups',
    },
    description: 'Gets data for more than one audience.',
  },
)

export const ErrorDetailSchema = t.Object({
  message: t.Optional(
    t.String({
      description: 'Details of the error. Not included in the response under certain situations.',
    }),
  ),
  property: t.Optional(
    t.String({
      description:
        'Location of where the error occurred. Returns the JSON field name or query parameter name of the request. Not included in the response under certain situations.',
    }),
  ),
})

export const ErrorResponseSchema = t.Object(
  {
    message: t.String({ description: 'Message containing information about the error.' }),
    details: t.Optional(
      t.Array(ErrorDetailSchema, {
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
