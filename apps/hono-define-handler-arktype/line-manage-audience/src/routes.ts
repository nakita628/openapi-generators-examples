import { defineHandler } from 'hono/factory'
import { type } from 'arktype'

export const AudienceSchema = type({
  'id?': type('string').describe('A user ID or IFA. You can specify an empty array.'),
}).describe('Audience')

export type Audience = typeof AudienceSchema.infer

export const CreateAudienceGroupRequestSchema = type({
  'description?': type('string')
    .narrow((data, ctx) => [...data].length <= 120 || ctx.mustBe('at most 120 characters'))
    .describe(
      "The audience's name. This is case-insensitive, meaning AUDIENCE and audience are considered identical.\nMax character limit: 120\n",
    ),
  'isIfaAudience?': type('boolean').describe(
    'To specify recipients by IFAs: set true.\nTo specify recipients by user IDs: set false or omit isIfaAudience property.\n',
  ),
  'uploadDescription?': type('string').describe(
    'The description to register for the job (in jobs[].description).\n',
  ),
  'audiences?': type(type(AudienceSchema).array())
    .and(type('unknown[] <= 10000'))
    .describe('An array of user IDs or IFAs.\nMax number: 10,000\n'),
}).describe('Create audience for uploading user IDs (by JSON)')

export type CreateAudienceGroupRequest = typeof CreateAudienceGroupRequestSchema.infer

export const AudienceGroupTypeSchema = type(
  "'UPLOAD' | 'CLICK' | 'IMP' | 'CHAT_TAG' | 'FRIEND_PATH' | 'RESERVATION' | 'APP_EVENT' | 'VIDEO_VIEW' | 'WEBTRAFFIC' | 'IMAGE_CLICK' | 'RICHMENU_IMP' | 'RICHMENU_CLICK' | 'POP_AD_IMP' | 'TRACKINGTAG_WEBTRAFFIC'",
).describe('Audience group type')

export type AudienceGroupType = typeof AudienceGroupTypeSchema.infer

export const CreateAudienceGroupResponseSchema = type({
  'audienceGroupId?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe('The audience ID.'),
  'createRoute?': type("'MESSAGING_API'").describe(
    'How the audience was created.\n\n`MESSAGING_API`: An audience created with Messaging API.\n',
  ),
  'type?': AudienceGroupTypeSchema,
  'description?': type('string').describe("The audience's name."),
  'created?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe('When the audience was created (in UNIX time).'),
  'permission?': type("'READ' | 'READ_WRITE'").describe(
    "Audience's update permission. Audiences linked to the same channel will be READ_WRITE.\n\n`READ`: Can use only.\n`READ_WRITE`: Can use and update.\n",
  ),
  'expireTimestamp?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe('Time of audience expiration. Only returned for specific audiences.\n'),
  'isIfaAudience?': type('boolean').describe(
    'The value indicating the type of account to be sent, as specified when creating the audience for uploading user IDs. One of:\n\n`true`: Accounts are specified with IFAs.\n`false` (default): Accounts are specified with user IDs.\n',
  ),
}).describe('Create audience for uploading user IDs (by JSON)')

export type CreateAudienceGroupResponse = typeof CreateAudienceGroupResponseSchema.infer

export const AddAudienceToAudienceGroupRequestSchema = type({
  'audienceGroupId?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe('The audience ID.'),
  'uploadDescription?': type('string').describe("The audience's name."),
  'audiences?': type(type(AudienceSchema).array())
    .and(type('unknown[] <= 10000'))
    .describe('An array of up to 10,000 user IDs or IFAs.'),
}).describe(
  'Add user IDs or Identifiers for Advertisers (IFAs) to an audience for uploading user IDs (by JSON)',
)

export type AddAudienceToAudienceGroupRequest = typeof AddAudienceToAudienceGroupRequestSchema.infer

export const CreateClickBasedAudienceGroupRequestSchema = type({
  'description?': type('string')
    .narrow((data, ctx) => [...data].length <= 120 || ctx.mustBe('at most 120 characters'))
    .describe(
      "The audience's name. This is case-insensitive, meaning AUDIENCE and audience are considered identical.\nMax character limit: 120\n",
    ),
  'requestId?': type('string').describe(
    'The request ID of a broadcast or narrowcast message sent in the past 60 days.\nEach Messaging API request has a request ID.\n',
  ),
  'clickUrl?': type('string.url')
    .narrow((data, ctx) => [...data].length <= 2000 || ctx.mustBe('at most 2000 characters'))
    .describe(
      'The URL clicked by the user. If empty, users who clicked any URL in the message are added to the list of recipients.\nMax character limit: 2,000\n',
    ),
}).describe('Create audience for click-based retargeting')

export type CreateClickBasedAudienceGroupRequest =
  typeof CreateClickBasedAudienceGroupRequestSchema.infer

export const CreateClickBasedAudienceGroupResponseSchema = type({
  'audienceGroupId?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe('The audience ID.'),
  'type?': AudienceGroupTypeSchema,
  'description?': type('string').describe("The audience's name."),
  'created?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe('When the audience was created (in UNIX time).'),
  'requestId?': type('string').describe(
    'The request ID that was specified when the audience was created.',
  ),
  'clickUrl?': type('string.url').describe(
    'The URL that was specified when the audience was created.',
  ),
  'createRoute?': type("'MESSAGING_API'").describe(
    'How the audience was created.\n`MESSAGING_API`: An audience created with Messaging API.\n',
  ),
  'permission?': type("'READ' | 'READ_WRITE'").describe(
    "Audience's update permission. Audiences linked to the same channel will be READ_WRITE.\n\n- `READ`: Can use only.\n- `READ_WRITE`: Can use and update.\n",
  ),
  'expireTimestamp?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe('Time of audience expiration. Only returned for specific audiences.'),
  'isIfaAudience?': type('boolean').describe(
    'The value indicating the type of account to be sent, as specified when creating the audience for uploading user IDs. One of:\n\ntrue: Accounts are specified with IFAs.\nfalse (default): Accounts are specified with user IDs.\n',
  ),
}).describe('Create audience for click-based retargeting')

export type CreateClickBasedAudienceGroupResponse =
  typeof CreateClickBasedAudienceGroupResponseSchema.infer

export const CreateImpBasedAudienceGroupRequestSchema = type({
  'description?': type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 120 || ctx.mustBe('at most 120 characters'))
    .describe(
      "The audience's name.\nThis is case-insensitive, meaning `AUDIENCE` and `audience` are considered identical.\nMax character limit: 120\n",
    ),
  'requestId?': type('string').describe(
    'The request ID of a broadcast or narrowcast message sent in the past 60 days.\nEach Messaging API request has a request ID.\n',
  ),
}).describe('Create audience for impression-based retargeting')

export type CreateImpBasedAudienceGroupRequest =
  typeof CreateImpBasedAudienceGroupRequestSchema.infer

export const CreateImpBasedAudienceGroupResponseSchema = type({
  'audienceGroupId?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe('The audience ID.'),
  'type?': AudienceGroupTypeSchema,
  'description?': type('string').describe("The audience's name."),
  'created?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe('When the audience was created (in UNIX time).'),
  'requestId?': type('string').describe(
    'The request ID that was specified when the audience was created.',
  ),
}).describe('Create audience for impression-based retargeting')

export type CreateImpBasedAudienceGroupResponse =
  typeof CreateImpBasedAudienceGroupResponseSchema.infer

export const UpdateAudienceGroupDescriptionRequestSchema = type({
  'description?': type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 120 || ctx.mustBe('at most 120 characters'))
    .describe(
      "The audience's name. This is case-insensitive, meaning AUDIENCE and audience are considered identical.\nMax character limit: 120\n",
    ),
}).describe('Rename an audience')

export type UpdateAudienceGroupDescriptionRequest =
  typeof UpdateAudienceGroupDescriptionRequestSchema.infer

export const AudienceGroupStatusSchema = type(
  "'IN_PROGRESS' | 'READY' | 'FAILED' | 'EXPIRED' | 'INACTIVE' | 'ACTIVATING'",
).describe('Status')

export type AudienceGroupStatus = typeof AudienceGroupStatusSchema.infer

export const AudienceGroupFailedTypeSchema = type(
  "'AUDIENCE_GROUP_AUDIENCE_INSUFFICIENT' | 'INTERNAL_ERROR' | null",
).describe('Failed type')

export type AudienceGroupFailedType = typeof AudienceGroupFailedTypeSchema.infer

export const AudienceGroupPermissionSchema = type("'READ' | 'READ_WRITE'").describe('Permission')

export type AudienceGroupPermission = typeof AudienceGroupPermissionSchema.infer

export const AudienceGroupCreateRouteSchema = type(
  "'OA_MANAGER' | 'MESSAGING_API' | 'POINT_AD' | 'AD_MANAGER'",
).describe(
  'How the audience was created. One of:\n\n- `OA_MANAGER`: Audience created with [LINE Official Account Manager](https://manager.line.biz/).\n- `MESSAGING_API`: Audience created with Messaging API.\n- `POINT_AD`: Audience created with [LINE Points Ads](https://www.linebiz.com/jp/service/line-point-ad/) (Japanese only).\n- `AD_MANAGER`: Audience created with [LINE Ads](https://admanager.line.biz/).\n',
)

export type AudienceGroupCreateRoute = typeof AudienceGroupCreateRouteSchema.infer

export const AudienceGroupSchema = type({
  'audienceGroupId?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe('The audience ID.'),
  'type?': AudienceGroupTypeSchema,
  'description?': type('string').describe("The audience's name."),
  'status?': AudienceGroupStatusSchema,
  'failedType?': AudienceGroupFailedTypeSchema,
  'audienceCount?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe('The number of users included in the audience.'),
  'created?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe('When the audience was created (in UNIX time).'),
  'requestId?': type('string').describe(
    'The request ID that was specified when the audience was created.\nThis is only included when `audienceGroup.type` is CLICK or IMP.\n',
  ),
  'clickUrl?': type('string.url').describe(
    'The URL that was specified when the audience was created.\nThis is only included when `audienceGroup.type` is CLICK and link URL is specified.\n',
  ),
  'isIfaAudience?': type('boolean').describe(
    'The value indicating the type of account to be sent, as specified when creating the audience for uploading user IDs.\n',
  ),
  'permission?': AudienceGroupPermissionSchema,
  'createRoute?': AudienceGroupCreateRouteSchema,
}).describe('Audience group')

export type AudienceGroup = typeof AudienceGroupSchema.infer

export const AudienceGroupJobTypeSchema = type("'DIFF_ADD'").describe('Job Type')

export type AudienceGroupJobType = typeof AudienceGroupJobTypeSchema.infer

export const AudienceGroupJobStatusSchema = type(
  "'QUEUED' | 'WORKING' | 'FINISHED' | 'FAILED'",
).describe('Job status')

export type AudienceGroupJobStatus = typeof AudienceGroupJobStatusSchema.infer

export const AudienceGroupJobFailedTypeSchema = type(
  "'INTERNAL_ERROR' | 'AUDIENCE_GROUP_AUDIENCE_INSUFFICIENT'",
).describe('Failed type')

export type AudienceGroupJobFailedType = typeof AudienceGroupJobFailedTypeSchema.infer

export const AudienceGroupJobSchema = type({
  'audienceGroupJobId?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe('A job ID.'),
  'audienceGroupId?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe('An audience ID.'),
  'description?': type('string').describe("The job's description."),
  'type?': AudienceGroupJobTypeSchema,
  'jobStatus?': AudienceGroupJobStatusSchema,
  'failedType?': AudienceGroupJobFailedTypeSchema,
  'audienceCount?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe('The number of accounts (recipients) that were added or removed.'),
  'created?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe('When the job was created (in UNIX time).'),
}).describe('Audience group job')

export type AudienceGroupJob = typeof AudienceGroupJobSchema.infer

export const AdaccountSchema = type({
  'name?': type('string').describe('Ad account name.'),
}).describe('Adaccount')

export type Adaccount = typeof AdaccountSchema.infer

export const GetAudienceDataResponseSchema = type({
  'audienceGroup?': AudienceGroupSchema,
  'jobs?': type(type(AudienceGroupJobSchema).array())
    .and(type('unknown[] <= 50'))
    .describe(
      'An array of jobs.\nThis array is used to keep track of each attempt to add new user IDs or IFAs to an audience for uploading user IDs.\nEmpty array is returned for any other type of audience.\nMax: 50\n',
    ),
  'adaccount?': AdaccountSchema,
}).describe('Get audience data')

export type GetAudienceDataResponse = typeof GetAudienceDataResponseSchema.infer

export const DetailedOwnerSchema = type({
  'serviceType?': type('string').describe(
    'Service name where the audience group has been created.',
  ),
  'id?': type('string').describe('Owner ID in the service.'),
  'name?': type('string').describe('Owner account name.'),
}).describe('Owner of this audience group.')

export type DetailedOwner = typeof DetailedOwnerSchema.infer

export const GetSharedAudienceDataResponseSchema = type({
  'audienceGroup?': AudienceGroupSchema,
  'jobs?': type(type(AudienceGroupJobSchema).array())
    .and(type('unknown[] <= 50'))
    .describe(
      'An array of jobs.\nThis array is used to keep track of each attempt to add new user IDs or IFAs to an audience for uploading user IDs.\nEmpty array is returned for any other type of audience.\nMax: 50\n',
    ),
  'owner?': DetailedOwnerSchema,
}).describe('Get audience data')

export type GetSharedAudienceDataResponse = typeof GetSharedAudienceDataResponseSchema.infer

export const GetAudienceGroupsResponseSchema = type({
  'audienceGroups?': type(AudienceGroupSchema)
    .array()
    .describe(
      'An array of audience data. If there are no audiences that match the specified filter, an empty array will be returned.',
    ),
  'hasNextPage?': type('boolean').describe('true when this is not the last page.'),
  'totalCount?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe('The total number of audiences that can be returned with the specified filter.'),
  'readWriteAudienceGroupTotalCount?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe(
      'Of the audiences you can get with the specified filter, the number of audiences with the update permission set to READ_WRITE.',
    ),
  'page?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe('The current page number.'),
  'size?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe('The maximum number of audiences on the current page.'),
}).describe('Gets data for more than one audience.')

export type GetAudienceGroupsResponse = typeof GetAudienceGroupsResponseSchema.infer

export const GetSharedAudienceGroupsResponseSchema = type({
  'audienceGroups?': type(AudienceGroupSchema)
    .array()
    .describe(
      'An array of audience data. If there are no audiences that match the specified filter, an empty array will be returned.',
    ),
  'hasNextPage?': type('boolean').describe('true when this is not the last page.'),
  'totalCount?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe('The total number of audiences that can be returned with the specified filter.'),
  'readWriteAudienceGroupTotalCount?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe(
      'Of the audiences you can get with the specified filter, the number of audiences with the update permission set to READ_WRITE.',
    ),
  'page?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe('The current page number.'),
  'size?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe('The maximum number of audiences on the current page.'),
}).describe('Gets data for more than one audience.')

export type GetSharedAudienceGroupsResponse = typeof GetSharedAudienceGroupsResponseSchema.infer

export const ErrorDetailSchema = type({
  'message?': type('string').describe(
    'Details of the error. Not included in the response under certain situations.',
  ),
  'property?': type('string').describe(
    'Location of where the error occurred. Returns the JSON field name or query parameter name of the request. Not included in the response under certain situations.',
  ),
})

export type ErrorDetail = typeof ErrorDetailSchema.infer

export const ErrorResponseSchema = type({
  message: type('string').describe('Message containing information about the error.'),
  'details?': type(ErrorDetailSchema)
    .array()
    .describe(
      'An array of error details. If the array is empty, this property will not be included in the response.',
    ),
})

export type ErrorResponse = typeof ErrorResponseSchema.infer

export const BearerSecurityScheme = {
  type: 'http',
  scheme: 'bearer',
  description: 'Channel access token',
}

export const putV2BotAudienceGroupUploadHandler = defineHandler({
  json: { '~standard': AddAudienceToAudienceGroupRequestSchema['~standard'] },
})

export const postV2BotAudienceGroupUploadHandler = defineHandler({
  json: { '~standard': CreateAudienceGroupRequestSchema['~standard'] },
  response: { '~standard': CreateAudienceGroupResponseSchema['~standard'] },
})

export const putV2BotAudienceGroupUploadByFileHandler = defineHandler({
  form: {
    '~standard': type({
      'audienceGroupId?': type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        )
        .describe('The audience ID.'),
      'uploadDescription?': type('string').describe('The description to register with the job'),
      file: type('File').describe(
        'A text file with one user ID or IFA entered per line. Specify text/plain as Content-Type. Max file number: 1\nMax number: 1,500,000\n',
      ),
    }).describe('Request of the addUserIdsToAudience')['~standard'],
  },
})

export const postV2BotAudienceGroupUploadByFileHandler = defineHandler({
  form: {
    '~standard': type({
      'description?': type('string')
        .narrow((data, ctx) => [...data].length <= 120 || ctx.mustBe('at most 120 characters'))
        .describe(
          "The audience's name. This is case-insensitive, meaning AUDIENCE and audience are considered identical.\nMax character limit: 120\n",
        ),
      'isIfaAudience?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i)
        .pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data))
        .describe(
          'To specify recipients by IFAs: set `true`.\nTo specify recipients by user IDs: set `false` or omit isIfaAudience property.\n',
        ),
      'uploadDescription?': type('string').describe(
        'The description to register for the job (in `jobs[].description`).\n',
      ),
      file: type('File').describe(
        'A text file with one user ID or IFA entered per line. Specify text/plain as Content-Type. Max file number: 1\nMax number: 1,500,000\n',
      ),
    }).describe('Request for createAudienceForUploadingUserIds')['~standard'],
  },
  response: { '~standard': CreateAudienceGroupResponseSchema['~standard'] },
})

export const postV2BotAudienceGroupClickHandler = defineHandler({
  json: { '~standard': CreateClickBasedAudienceGroupRequestSchema['~standard'] },
  response: { '~standard': CreateClickBasedAudienceGroupResponseSchema['~standard'] },
})

export const postV2BotAudienceGroupImpHandler = defineHandler({
  json: { '~standard': CreateImpBasedAudienceGroupRequestSchema['~standard'] },
  response: { '~standard': CreateImpBasedAudienceGroupResponseSchema['~standard'] },
})

export const putV2BotAudienceGroupAudienceGroupIdUpdateDescriptionHandler = defineHandler({
  param: {
    '~standard': type({
      audienceGroupId: type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        ),
    })['~standard'],
  },
  json: { '~standard': UpdateAudienceGroupDescriptionRequestSchema['~standard'] },
})

export const getV2BotAudienceGroupAudienceGroupIdHandler = defineHandler({
  param: {
    '~standard': type({
      audienceGroupId: type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        ),
    })['~standard'],
  },
  response: { '~standard': GetAudienceDataResponseSchema['~standard'] },
})

export const deleteV2BotAudienceGroupAudienceGroupIdHandler = defineHandler({
  param: {
    '~standard': type({
      audienceGroupId: type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        ),
    })['~standard'],
  },
})

export const getV2BotAudienceGroupListHandler = defineHandler({
  query: {
    '~standard': type({
      page: type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        )
        .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1')),
      'description?': 'string',
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
    })['~standard'],
  },
  response: { '~standard': GetAudienceGroupsResponseSchema['~standard'] },
})

export const getV2BotAudienceGroupSharedAudienceGroupIdHandler = defineHandler({
  param: {
    '~standard': type({
      audienceGroupId: type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        ),
    })['~standard'],
  },
  response: { '~standard': GetSharedAudienceDataResponseSchema['~standard'] },
})

export const getV2BotAudienceGroupSharedListHandler = defineHandler({
  query: {
    '~standard': type({
      page: type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        )
        .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1')),
      'description?': 'string',
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
    })['~standard'],
  },
  response: { '~standard': GetSharedAudienceGroupsResponseSchema['~standard'] },
})
