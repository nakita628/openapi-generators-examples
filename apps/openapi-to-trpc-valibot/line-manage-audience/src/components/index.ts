import * as v from 'valibot'

export const AudienceSchema = v.pipe(
  v.partial(
    v.object({
      id: v.pipe(v.string(), v.description('A user ID or IFA. You can specify an empty array.')),
    }),
  ),
  v.description('Audience'),
)

export type AudienceSchema = v.InferOutput<typeof AudienceSchema>

export const CreateAudienceGroupRequestSchema = v.pipe(
  v.partial(
    v.object({
      description: v.pipe(
        v.pipe(v.string(), v.maxCodePoints(120)),
        v.description(
          "The audience's name. This is case-insensitive, meaning AUDIENCE and audience are considered identical.\nMax character limit: 120\n",
        ),
      ),
      isIfaAudience: v.pipe(
        v.boolean(),
        v.description(
          'To specify recipients by IFAs: set true.\nTo specify recipients by user IDs: set false or omit isIfaAudience property.\n',
        ),
      ),
      uploadDescription: v.pipe(
        v.string(),
        v.description('The description to register for the job (in jobs[].description).\n'),
      ),
      audiences: v.pipe(
        v.pipe(v.array(AudienceSchema), v.maxLength(10000)),
        v.description('An array of user IDs or IFAs.\nMax number: 10,000\n'),
      ),
    }),
  ),
  v.description('Create audience for uploading user IDs (by JSON)'),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#create-upload-audience-group',
    },
  }),
)

export type CreateAudienceGroupRequestSchema = v.InferOutput<
  typeof CreateAudienceGroupRequestSchema
>

export const AudienceGroupTypeSchema = v.pipe(
  v.picklist([
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
  ]),
  v.description('Audience group type'),
)

export type AudienceGroupTypeSchema = v.InferOutput<typeof AudienceGroupTypeSchema>

export const CreateAudienceGroupResponseSchema = v.pipe(
  v.partial(
    v.object({
      audienceGroupId: v.pipe(
        v.pipe(
          v.union([
            v.bigint(),
            v.pipe(v.number(), v.integer()),
            v.pipe(v.string(), v.regex(/^-?\d+$/)),
          ]),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
        v.description('The audience ID.'),
      ),
      createRoute: v.pipe(
        v.literal('MESSAGING_API'),
        v.description(
          'How the audience was created.\n\n`MESSAGING_API`: An audience created with Messaging API.\n',
        ),
      ),
      type: AudienceGroupTypeSchema,
      description: v.pipe(v.string(), v.description("The audience's name.")),
      created: v.pipe(
        v.pipe(
          v.union([
            v.bigint(),
            v.pipe(v.number(), v.integer()),
            v.pipe(v.string(), v.regex(/^-?\d+$/)),
          ]),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
        v.description('When the audience was created (in UNIX time).'),
      ),
      permission: v.pipe(
        v.picklist(['READ', 'READ_WRITE']),
        v.description(
          "Audience's update permission. Audiences linked to the same channel will be READ_WRITE.\n\n`READ`: Can use only.\n`READ_WRITE`: Can use and update.\n",
        ),
      ),
      expireTimestamp: v.pipe(
        v.pipe(
          v.union([
            v.bigint(),
            v.pipe(v.number(), v.integer()),
            v.pipe(v.string(), v.regex(/^-?\d+$/)),
          ]),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
        v.description('Time of audience expiration. Only returned for specific audiences.\n'),
      ),
      isIfaAudience: v.pipe(
        v.boolean(),
        v.description(
          'The value indicating the type of account to be sent, as specified when creating the audience for uploading user IDs. One of:\n\n`true`: Accounts are specified with IFAs.\n`false` (default): Accounts are specified with user IDs.\n',
        ),
      ),
    }),
  ),
  v.description('Create audience for uploading user IDs (by JSON)'),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#create-upload-audience-group',
    },
  }),
)

export type CreateAudienceGroupResponseSchema = v.InferOutput<
  typeof CreateAudienceGroupResponseSchema
>

export const AddAudienceToAudienceGroupRequestSchema = v.pipe(
  v.partial(
    v.object({
      audienceGroupId: v.pipe(
        v.pipe(
          v.union([
            v.bigint(),
            v.pipe(v.number(), v.integer()),
            v.pipe(v.string(), v.regex(/^-?\d+$/)),
          ]),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
        v.description('The audience ID.'),
      ),
      uploadDescription: v.pipe(v.string(), v.description("The audience's name.")),
      audiences: v.pipe(
        v.pipe(v.array(AudienceSchema), v.maxLength(10000)),
        v.description('An array of up to 10,000 user IDs or IFAs.'),
      ),
    }),
  ),
  v.description(
    'Add user IDs or Identifiers for Advertisers (IFAs) to an audience for uploading user IDs (by JSON)',
  ),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#update-upload-audience-group',
    },
  }),
)

export type AddAudienceToAudienceGroupRequestSchema = v.InferOutput<
  typeof AddAudienceToAudienceGroupRequestSchema
>

export const CreateClickBasedAudienceGroupRequestSchema = v.pipe(
  v.partial(
    v.object({
      description: v.pipe(
        v.pipe(v.string(), v.maxCodePoints(120)),
        v.description(
          "The audience's name. This is case-insensitive, meaning AUDIENCE and audience are considered identical.\nMax character limit: 120\n",
        ),
      ),
      requestId: v.pipe(
        v.string(),
        v.description(
          'The request ID of a broadcast or narrowcast message sent in the past 60 days.\nEach Messaging API request has a request ID.\n',
        ),
      ),
      clickUrl: v.pipe(
        v.pipe(v.string(), v.url(), v.maxCodePoints(2000)),
        v.description(
          'The URL clicked by the user. If empty, users who clicked any URL in the message are added to the list of recipients.\nMax character limit: 2,000\n',
        ),
      ),
    }),
  ),
  v.description('Create audience for click-based retargeting'),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#create-click-audience-group',
    },
  }),
)

export type CreateClickBasedAudienceGroupRequestSchema = v.InferOutput<
  typeof CreateClickBasedAudienceGroupRequestSchema
>

export const CreateClickBasedAudienceGroupResponseSchema = v.pipe(
  v.object({
    audienceGroupId: v.optional(
      v.pipe(
        v.pipe(
          v.union([
            v.bigint(),
            v.pipe(v.number(), v.integer()),
            v.pipe(v.string(), v.regex(/^-?\d+$/)),
          ]),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
        v.description('The audience ID.'),
      ),
    ),
    type: v.optional(AudienceGroupTypeSchema),
    description: v.optional(v.pipe(v.string(), v.description("The audience's name."))),
    created: v.optional(
      v.pipe(
        v.pipe(
          v.union([
            v.bigint(),
            v.pipe(v.number(), v.integer()),
            v.pipe(v.string(), v.regex(/^-?\d+$/)),
          ]),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
        v.description('When the audience was created (in UNIX time).'),
      ),
    ),
    requestId: v.optional(
      v.pipe(
        v.string(),
        v.description('The request ID that was specified when the audience was created.'),
      ),
    ),
    clickUrl: v.optional(
      v.pipe(
        v.pipe(v.string(), v.url()),
        v.description('The URL that was specified when the audience was created.'),
      ),
    ),
    createRoute: v.optional(
      v.pipe(
        v.literal('MESSAGING_API'),
        v.description(
          'How the audience was created.\n`MESSAGING_API`: An audience created with Messaging API.\n',
        ),
      ),
    ),
    permission: v.optional(
      v.pipe(
        v.picklist(['READ', 'READ_WRITE']),
        v.description(
          "Audience's update permission. Audiences linked to the same channel will be READ_WRITE.\n\n- `READ`: Can use only.\n- `READ_WRITE`: Can use and update.\n",
        ),
      ),
    ),
    expireTimestamp: v.optional(
      v.pipe(
        v.pipe(
          v.union([
            v.bigint(),
            v.pipe(v.number(), v.integer()),
            v.pipe(v.string(), v.regex(/^-?\d+$/)),
          ]),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
        v.description('Time of audience expiration. Only returned for specific audiences.'),
      ),
    ),
    isIfaAudience: v.pipe(
      v.optional(v.boolean(), false),
      v.description(
        'The value indicating the type of account to be sent, as specified when creating the audience for uploading user IDs. One of:\n\ntrue: Accounts are specified with IFAs.\nfalse (default): Accounts are specified with user IDs.\n',
      ),
    ),
  }),
  v.description('Create audience for click-based retargeting'),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#create-click-audience-group',
    },
  }),
)

export type CreateClickBasedAudienceGroupResponseSchema = v.InferOutput<
  typeof CreateClickBasedAudienceGroupResponseSchema
>

export const CreateImpBasedAudienceGroupRequestSchema = v.pipe(
  v.partial(
    v.object({
      description: v.pipe(
        v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(120)),
        v.description(
          "The audience's name.\nThis is case-insensitive, meaning `AUDIENCE` and `audience` are considered identical.\nMax character limit: 120\n",
        ),
      ),
      requestId: v.pipe(
        v.string(),
        v.description(
          'The request ID of a broadcast or narrowcast message sent in the past 60 days.\nEach Messaging API request has a request ID.\n',
        ),
      ),
    }),
  ),
  v.description('Create audience for impression-based retargeting'),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#create-imp-audience-group',
    },
  }),
)

export type CreateImpBasedAudienceGroupRequestSchema = v.InferOutput<
  typeof CreateImpBasedAudienceGroupRequestSchema
>

export const CreateImpBasedAudienceGroupResponseSchema = v.pipe(
  v.partial(
    v.object({
      audienceGroupId: v.pipe(
        v.pipe(
          v.union([
            v.bigint(),
            v.pipe(v.number(), v.integer()),
            v.pipe(v.string(), v.regex(/^-?\d+$/)),
          ]),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
        v.description('The audience ID.'),
      ),
      type: AudienceGroupTypeSchema,
      description: v.pipe(v.string(), v.description("The audience's name.")),
      created: v.pipe(
        v.pipe(
          v.union([
            v.bigint(),
            v.pipe(v.number(), v.integer()),
            v.pipe(v.string(), v.regex(/^-?\d+$/)),
          ]),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
        v.description('When the audience was created (in UNIX time).'),
      ),
      requestId: v.pipe(
        v.string(),
        v.description('The request ID that was specified when the audience was created.'),
      ),
    }),
  ),
  v.description('Create audience for impression-based retargeting'),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#create-imp-audience-group',
    },
  }),
)

export type CreateImpBasedAudienceGroupResponseSchema = v.InferOutput<
  typeof CreateImpBasedAudienceGroupResponseSchema
>

export const UpdateAudienceGroupDescriptionRequestSchema = v.pipe(
  v.partial(
    v.object({
      description: v.pipe(
        v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(120)),
        v.description(
          "The audience's name. This is case-insensitive, meaning AUDIENCE and audience are considered identical.\nMax character limit: 120\n",
        ),
      ),
    }),
  ),
  v.description('Rename an audience'),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#set-description-audience-group',
    },
  }),
)

export type UpdateAudienceGroupDescriptionRequestSchema = v.InferOutput<
  typeof UpdateAudienceGroupDescriptionRequestSchema
>

export const AudienceGroupStatusSchema = v.pipe(
  v.picklist(['IN_PROGRESS', 'READY', 'FAILED', 'EXPIRED', 'INACTIVE', 'ACTIVATING']),
  v.description('Status'),
)

export type AudienceGroupStatusSchema = v.InferOutput<typeof AudienceGroupStatusSchema>

export const AudienceGroupFailedTypeSchema = v.pipe(
  v.nullable(v.picklist(['AUDIENCE_GROUP_AUDIENCE_INSUFFICIENT', 'INTERNAL_ERROR'])),
  v.description('Failed type'),
)

export type AudienceGroupFailedTypeSchema = v.InferOutput<typeof AudienceGroupFailedTypeSchema>

export const AudienceGroupPermissionSchema = v.pipe(
  v.picklist(['READ', 'READ_WRITE']),
  v.description('Permission'),
)

export type AudienceGroupPermissionSchema = v.InferOutput<typeof AudienceGroupPermissionSchema>

export const AudienceGroupCreateRouteSchema = v.pipe(
  v.picklist(['OA_MANAGER', 'MESSAGING_API', 'POINT_AD', 'AD_MANAGER']),
  v.description(
    'How the audience was created. One of:\n\n- `OA_MANAGER`: Audience created with [LINE Official Account Manager](https://manager.line.biz/).\n- `MESSAGING_API`: Audience created with Messaging API.\n- `POINT_AD`: Audience created with [LINE Points Ads](https://www.linebiz.com/jp/service/line-point-ad/) (Japanese only).\n- `AD_MANAGER`: Audience created with [LINE Ads](https://admanager.line.biz/).\n',
  ),
)

export type AudienceGroupCreateRouteSchema = v.InferOutput<typeof AudienceGroupCreateRouteSchema>

export const AudienceGroupSchema = v.pipe(
  v.partial(
    v.object({
      audienceGroupId: v.pipe(
        v.pipe(
          v.union([
            v.bigint(),
            v.pipe(v.number(), v.integer()),
            v.pipe(v.string(), v.regex(/^-?\d+$/)),
          ]),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
        v.description('The audience ID.'),
      ),
      type: AudienceGroupTypeSchema,
      description: v.pipe(v.string(), v.description("The audience's name.")),
      status: AudienceGroupStatusSchema,
      failedType: AudienceGroupFailedTypeSchema,
      audienceCount: v.pipe(
        v.pipe(
          v.union([
            v.bigint(),
            v.pipe(v.number(), v.integer()),
            v.pipe(v.string(), v.regex(/^-?\d+$/)),
          ]),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
        v.description('The number of users included in the audience.'),
      ),
      created: v.pipe(
        v.pipe(
          v.union([
            v.bigint(),
            v.pipe(v.number(), v.integer()),
            v.pipe(v.string(), v.regex(/^-?\d+$/)),
          ]),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
        v.description('When the audience was created (in UNIX time).'),
      ),
      requestId: v.pipe(
        v.string(),
        v.description(
          'The request ID that was specified when the audience was created.\nThis is only included when `audienceGroup.type` is CLICK or IMP.\n',
        ),
      ),
      clickUrl: v.pipe(
        v.pipe(v.string(), v.url()),
        v.description(
          'The URL that was specified when the audience was created.\nThis is only included when `audienceGroup.type` is CLICK and link URL is specified.\n',
        ),
      ),
      isIfaAudience: v.pipe(
        v.boolean(),
        v.description(
          'The value indicating the type of account to be sent, as specified when creating the audience for uploading user IDs.\n',
        ),
      ),
      permission: AudienceGroupPermissionSchema,
      createRoute: AudienceGroupCreateRouteSchema,
    }),
  ),
  v.description('Audience group'),
)

export type AudienceGroupSchema = v.InferOutput<typeof AudienceGroupSchema>

export const AudienceGroupJobTypeSchema = v.pipe(v.literal('DIFF_ADD'), v.description('Job Type'))

export type AudienceGroupJobTypeSchema = v.InferOutput<typeof AudienceGroupJobTypeSchema>

export const AudienceGroupJobStatusSchema = v.pipe(
  v.picklist(['QUEUED', 'WORKING', 'FINISHED', 'FAILED']),
  v.description('Job status'),
)

export type AudienceGroupJobStatusSchema = v.InferOutput<typeof AudienceGroupJobStatusSchema>

export const AudienceGroupJobFailedTypeSchema = v.pipe(
  v.picklist(['INTERNAL_ERROR', 'AUDIENCE_GROUP_AUDIENCE_INSUFFICIENT']),
  v.description('Failed type'),
)

export type AudienceGroupJobFailedTypeSchema = v.InferOutput<
  typeof AudienceGroupJobFailedTypeSchema
>

export const AudienceGroupJobSchema = v.pipe(
  v.partial(
    v.object({
      audienceGroupJobId: v.pipe(
        v.pipe(
          v.union([
            v.bigint(),
            v.pipe(v.number(), v.integer()),
            v.pipe(v.string(), v.regex(/^-?\d+$/)),
          ]),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
        v.description('A job ID.'),
      ),
      audienceGroupId: v.pipe(
        v.pipe(
          v.union([
            v.bigint(),
            v.pipe(v.number(), v.integer()),
            v.pipe(v.string(), v.regex(/^-?\d+$/)),
          ]),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
        v.description('An audience ID.'),
      ),
      description: v.pipe(v.string(), v.description("The job's description.")),
      type: AudienceGroupJobTypeSchema,
      jobStatus: AudienceGroupJobStatusSchema,
      failedType: AudienceGroupJobFailedTypeSchema,
      audienceCount: v.pipe(
        v.pipe(
          v.union([
            v.bigint(),
            v.pipe(v.number(), v.integer()),
            v.pipe(v.string(), v.regex(/^-?\d+$/)),
          ]),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
        v.description('The number of accounts (recipients) that were added or removed.'),
      ),
      created: v.pipe(
        v.pipe(
          v.union([
            v.bigint(),
            v.pipe(v.number(), v.integer()),
            v.pipe(v.string(), v.regex(/^-?\d+$/)),
          ]),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
        v.description('When the job was created (in UNIX time).'),
      ),
    }),
  ),
  v.description('Audience group job'),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-audience-group',
    },
  }),
)

export type AudienceGroupJobSchema = v.InferOutput<typeof AudienceGroupJobSchema>

export const AdaccountSchema = v.pipe(
  v.partial(v.object({ name: v.pipe(v.string(), v.description('Ad account name.')) })),
  v.description('Adaccount'),
)

export type AdaccountSchema = v.InferOutput<typeof AdaccountSchema>

export const GetAudienceDataResponseSchema = v.pipe(
  v.partial(
    v.object({
      audienceGroup: AudienceGroupSchema,
      jobs: v.pipe(
        v.pipe(v.array(AudienceGroupJobSchema), v.maxLength(50)),
        v.description(
          'An array of jobs.\nThis array is used to keep track of each attempt to add new user IDs or IFAs to an audience for uploading user IDs.\nEmpty array is returned for any other type of audience.\nMax: 50\n',
        ),
      ),
      adaccount: AdaccountSchema,
    }),
  ),
  v.description('Get audience data'),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-audience-group',
    },
  }),
)

export type GetAudienceDataResponseSchema = v.InferOutput<typeof GetAudienceDataResponseSchema>

export const DetailedOwnerSchema = v.pipe(
  v.partial(
    v.object({
      serviceType: v.pipe(
        v.string(),
        v.description('Service name where the audience group has been created.'),
        v.metadata({ examples: ['lap'] }),
      ),
      id: v.pipe(
        v.string(),
        v.description('Owner ID in the service.'),
        v.metadata({ examples: ['A012345678'] }),
      ),
      name: v.pipe(v.string(), v.description('Owner account name.')),
    }),
  ),
  v.description('Owner of this audience group.'),
)

export type DetailedOwnerSchema = v.InferOutput<typeof DetailedOwnerSchema>

export const GetSharedAudienceDataResponseSchema = v.pipe(
  v.partial(
    v.object({
      audienceGroup: AudienceGroupSchema,
      jobs: v.pipe(
        v.pipe(v.array(AudienceGroupJobSchema), v.maxLength(50)),
        v.description(
          'An array of jobs.\nThis array is used to keep track of each attempt to add new user IDs or IFAs to an audience for uploading user IDs.\nEmpty array is returned for any other type of audience.\nMax: 50\n',
        ),
      ),
      owner: DetailedOwnerSchema,
    }),
  ),
  v.description('Get audience data'),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-audience-group',
    },
  }),
)

export type GetSharedAudienceDataResponseSchema = v.InferOutput<
  typeof GetSharedAudienceDataResponseSchema
>

export const GetAudienceGroupsResponseSchema = v.pipe(
  v.partial(
    v.object({
      audienceGroups: v.pipe(
        v.array(AudienceGroupSchema),
        v.description(
          'An array of audience data. If there are no audiences that match the specified filter, an empty array will be returned.',
        ),
      ),
      hasNextPage: v.pipe(v.boolean(), v.description('true when this is not the last page.')),
      totalCount: v.pipe(
        v.pipe(
          v.union([
            v.bigint(),
            v.pipe(v.number(), v.integer()),
            v.pipe(v.string(), v.regex(/^-?\d+$/)),
          ]),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
        v.description(
          'The total number of audiences that can be returned with the specified filter.',
        ),
      ),
      readWriteAudienceGroupTotalCount: v.pipe(
        v.pipe(
          v.union([
            v.bigint(),
            v.pipe(v.number(), v.integer()),
            v.pipe(v.string(), v.regex(/^-?\d+$/)),
          ]),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
        v.description(
          'Of the audiences you can get with the specified filter, the number of audiences with the update permission set to READ_WRITE.',
        ),
      ),
      page: v.pipe(
        v.pipe(
          v.union([
            v.bigint(),
            v.pipe(v.number(), v.integer()),
            v.pipe(v.string(), v.regex(/^-?\d+$/)),
          ]),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
        v.description('The current page number.'),
      ),
      size: v.pipe(
        v.pipe(
          v.union([
            v.bigint(),
            v.pipe(v.number(), v.integer()),
            v.pipe(v.string(), v.regex(/^-?\d+$/)),
          ]),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
        v.description('The maximum number of audiences on the current page.'),
      ),
    }),
  ),
  v.description('Gets data for more than one audience.'),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-audience-groups',
    },
  }),
)

export type GetAudienceGroupsResponseSchema = v.InferOutput<typeof GetAudienceGroupsResponseSchema>

export const GetSharedAudienceGroupsResponseSchema = v.pipe(
  v.partial(
    v.object({
      audienceGroups: v.pipe(
        v.array(AudienceGroupSchema),
        v.description(
          'An array of audience data. If there are no audiences that match the specified filter, an empty array will be returned.',
        ),
      ),
      hasNextPage: v.pipe(v.boolean(), v.description('true when this is not the last page.')),
      totalCount: v.pipe(
        v.pipe(
          v.union([
            v.bigint(),
            v.pipe(v.number(), v.integer()),
            v.pipe(v.string(), v.regex(/^-?\d+$/)),
          ]),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
        v.description(
          'The total number of audiences that can be returned with the specified filter.',
        ),
      ),
      readWriteAudienceGroupTotalCount: v.pipe(
        v.pipe(
          v.union([
            v.bigint(),
            v.pipe(v.number(), v.integer()),
            v.pipe(v.string(), v.regex(/^-?\d+$/)),
          ]),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
        v.description(
          'Of the audiences you can get with the specified filter, the number of audiences with the update permission set to READ_WRITE.',
        ),
      ),
      page: v.pipe(
        v.pipe(
          v.union([
            v.bigint(),
            v.pipe(v.number(), v.integer()),
            v.pipe(v.string(), v.regex(/^-?\d+$/)),
          ]),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
        v.description('The current page number.'),
      ),
      size: v.pipe(
        v.pipe(
          v.union([
            v.bigint(),
            v.pipe(v.number(), v.integer()),
            v.pipe(v.string(), v.regex(/^-?\d+$/)),
          ]),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
        v.description('The maximum number of audiences on the current page.'),
      ),
    }),
  ),
  v.description('Gets data for more than one audience.'),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-audience-groups',
    },
  }),
)

export type GetSharedAudienceGroupsResponseSchema = v.InferOutput<
  typeof GetSharedAudienceGroupsResponseSchema
>

export const ErrorDetailSchema = v.partial(
  v.object({
    message: v.pipe(
      v.string(),
      v.description('Details of the error. Not included in the response under certain situations.'),
    ),
    property: v.pipe(
      v.string(),
      v.description(
        'Location of where the error occurred. Returns the JSON field name or query parameter name of the request. Not included in the response under certain situations.',
      ),
    ),
  }),
)

export type ErrorDetailSchema = v.InferOutput<typeof ErrorDetailSchema>

export const ErrorResponseSchema = v.pipe(
  v.object({
    message: v.pipe(v.string(), v.description('Message containing information about the error.')),
    details: v.optional(
      v.pipe(
        v.array(ErrorDetailSchema),
        v.description(
          'An array of error details. If the array is empty, this property will not be included in the response.',
        ),
      ),
    ),
  }),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#error-responses',
    },
  }),
)

export type ErrorResponseSchema = v.InferOutput<typeof ErrorResponseSchema>
