import * as z from 'zod'

export const AudienceSchema = z
  .object({
    id: z
      .string()
      .meta({ description: 'A user ID or IFA. You can specify an empty array.' })
      .exactOptional(),
  })
  .meta({ description: 'Audience' })

export type Audience = z.infer<typeof AudienceSchema>

export const CreateAudienceGroupRequestSchema = z
  .object({
    description: z
      .string()
      .max(120)
      .meta({
        description:
          "The audience's name. This is case-insensitive, meaning AUDIENCE and audience are considered identical.\nMax character limit: 120\n",
      })
      .exactOptional(),
    isIfaAudience: z
      .boolean()
      .meta({
        description:
          'To specify recipients by IFAs: set true.\nTo specify recipients by user IDs: set false or omit isIfaAudience property.\n',
      })
      .exactOptional(),
    uploadDescription: z
      .string()
      .meta({ description: 'The description to register for the job (in jobs[].description).\n' })
      .exactOptional(),
    audiences: z
      .array(AudienceSchema)
      .max(10000)
      .meta({ description: 'An array of user IDs or IFAs.\nMax number: 10,000\n' })
      .exactOptional(),
  })
  .meta({
    description: 'Create audience for uploading user IDs (by JSON)',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#create-upload-audience-group',
    },
  })

export type CreateAudienceGroupRequest = z.infer<typeof CreateAudienceGroupRequestSchema>

export const AudienceGroupTypeSchema = z
  .enum([
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
  ])
  .meta({ description: 'Audience group type' })

export type AudienceGroupType = z.infer<typeof AudienceGroupTypeSchema>

export const CreateAudienceGroupResponseSchema = z
  .object({
    audienceGroupId: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({ description: 'The audience ID.' })
      .exactOptional(),
    createRoute: z
      .literal('MESSAGING_API')
      .meta({
        description:
          'How the audience was created.\n\n`MESSAGING_API`: An audience created with Messaging API.\n',
      })
      .exactOptional(),
    type: AudienceGroupTypeSchema.exactOptional(),
    description: z.string().meta({ description: "The audience's name." }).exactOptional(),
    created: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({ description: 'When the audience was created (in UNIX time).' })
      .exactOptional(),
    permission: z
      .enum(['READ', 'READ_WRITE'])
      .meta({
        description:
          "Audience's update permission. Audiences linked to the same channel will be READ_WRITE.\n\n`READ`: Can use only.\n`READ_WRITE`: Can use and update.\n",
      })
      .exactOptional(),
    expireTimestamp: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({ description: 'Time of audience expiration. Only returned for specific audiences.\n' })
      .exactOptional(),
    isIfaAudience: z
      .boolean()
      .meta({
        description:
          'The value indicating the type of account to be sent, as specified when creating the audience for uploading user IDs. One of:\n\n`true`: Accounts are specified with IFAs.\n`false` (default): Accounts are specified with user IDs.\n',
      })
      .exactOptional(),
  })
  .meta({
    description: 'Create audience for uploading user IDs (by JSON)',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#create-upload-audience-group',
    },
  })

export type CreateAudienceGroupResponse = z.infer<typeof CreateAudienceGroupResponseSchema>

export const AddAudienceToAudienceGroupRequestSchema = z
  .object({
    audienceGroupId: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({ description: 'The audience ID.' })
      .exactOptional(),
    uploadDescription: z.string().meta({ description: "The audience's name." }).exactOptional(),
    audiences: z
      .array(AudienceSchema)
      .max(10000)
      .meta({ description: 'An array of up to 10,000 user IDs or IFAs.' })
      .exactOptional(),
  })
  .meta({
    description:
      'Add user IDs or Identifiers for Advertisers (IFAs) to an audience for uploading user IDs (by JSON)',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#update-upload-audience-group',
    },
  })

export type AddAudienceToAudienceGroupRequest = z.infer<
  typeof AddAudienceToAudienceGroupRequestSchema
>

export const CreateClickBasedAudienceGroupRequestSchema = z
  .object({
    description: z
      .string()
      .max(120)
      .meta({
        description:
          "The audience's name. This is case-insensitive, meaning AUDIENCE and audience are considered identical.\nMax character limit: 120\n",
      })
      .exactOptional(),
    requestId: z
      .string()
      .meta({
        description:
          'The request ID of a broadcast or narrowcast message sent in the past 60 days.\nEach Messaging API request has a request ID.\n',
      })
      .exactOptional(),
    clickUrl: z
      .url()
      .max(2000)
      .meta({
        description:
          'The URL clicked by the user. If empty, users who clicked any URL in the message are added to the list of recipients.\nMax character limit: 2,000\n',
      })
      .exactOptional(),
  })
  .meta({
    description: 'Create audience for click-based retargeting',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#create-click-audience-group',
    },
  })

export type CreateClickBasedAudienceGroupRequest = z.infer<
  typeof CreateClickBasedAudienceGroupRequestSchema
>

export const CreateClickBasedAudienceGroupResponseSchema = z
  .object({
    audienceGroupId: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({ description: 'The audience ID.' })
      .exactOptional(),
    type: AudienceGroupTypeSchema.exactOptional(),
    description: z.string().meta({ description: "The audience's name." }).exactOptional(),
    created: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({ description: 'When the audience was created (in UNIX time).' })
      .exactOptional(),
    requestId: z
      .string()
      .meta({ description: 'The request ID that was specified when the audience was created.' })
      .exactOptional(),
    clickUrl: z
      .url()
      .meta({ description: 'The URL that was specified when the audience was created.' })
      .exactOptional(),
    createRoute: z
      .literal('MESSAGING_API')
      .meta({
        description:
          'How the audience was created.\n`MESSAGING_API`: An audience created with Messaging API.\n',
      })
      .exactOptional(),
    permission: z
      .enum(['READ', 'READ_WRITE'])
      .meta({
        description:
          "Audience's update permission. Audiences linked to the same channel will be READ_WRITE.\n\n- `READ`: Can use only.\n- `READ_WRITE`: Can use and update.\n",
      })
      .exactOptional(),
    expireTimestamp: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({ description: 'Time of audience expiration. Only returned for specific audiences.' })
      .exactOptional(),
    isIfaAudience: z
      .boolean()
      .default(false)
      .meta({
        description:
          'The value indicating the type of account to be sent, as specified when creating the audience for uploading user IDs. One of:\n\ntrue: Accounts are specified with IFAs.\nfalse (default): Accounts are specified with user IDs.\n',
      })
      .exactOptional(),
  })
  .meta({
    description: 'Create audience for click-based retargeting',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#create-click-audience-group',
    },
  })

export type CreateClickBasedAudienceGroupResponse = z.infer<
  typeof CreateClickBasedAudienceGroupResponseSchema
>

export const CreateImpBasedAudienceGroupRequestSchema = z
  .object({
    description: z
      .string()
      .min(1)
      .max(120)
      .meta({
        description:
          "The audience's name.\nThis is case-insensitive, meaning `AUDIENCE` and `audience` are considered identical.\nMax character limit: 120\n",
      })
      .exactOptional(),
    requestId: z
      .string()
      .meta({
        description:
          'The request ID of a broadcast or narrowcast message sent in the past 60 days.\nEach Messaging API request has a request ID.\n',
      })
      .exactOptional(),
  })
  .meta({
    description: 'Create audience for impression-based retargeting',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#create-imp-audience-group',
    },
  })

export type CreateImpBasedAudienceGroupRequest = z.infer<
  typeof CreateImpBasedAudienceGroupRequestSchema
>

export const CreateImpBasedAudienceGroupResponseSchema = z
  .object({
    audienceGroupId: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({ description: 'The audience ID.' })
      .exactOptional(),
    type: AudienceGroupTypeSchema.exactOptional(),
    description: z.string().meta({ description: "The audience's name." }).exactOptional(),
    created: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({ description: 'When the audience was created (in UNIX time).' })
      .exactOptional(),
    requestId: z
      .string()
      .meta({ description: 'The request ID that was specified when the audience was created.' })
      .exactOptional(),
  })
  .meta({
    description: 'Create audience for impression-based retargeting',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#create-imp-audience-group',
    },
  })

export type CreateImpBasedAudienceGroupResponse = z.infer<
  typeof CreateImpBasedAudienceGroupResponseSchema
>

export const UpdateAudienceGroupDescriptionRequestSchema = z
  .object({
    description: z
      .string()
      .min(1)
      .max(120)
      .meta({
        description:
          "The audience's name. This is case-insensitive, meaning AUDIENCE and audience are considered identical.\nMax character limit: 120\n",
      })
      .exactOptional(),
  })
  .meta({
    description: 'Rename an audience',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#set-description-audience-group',
    },
  })

export type UpdateAudienceGroupDescriptionRequest = z.infer<
  typeof UpdateAudienceGroupDescriptionRequestSchema
>

export const AudienceGroupStatusSchema = z
  .enum(['IN_PROGRESS', 'READY', 'FAILED', 'EXPIRED', 'INACTIVE', 'ACTIVATING'])
  .meta({ description: 'Status' })

export type AudienceGroupStatus = z.infer<typeof AudienceGroupStatusSchema>

export const AudienceGroupFailedTypeSchema = z
  .enum(['AUDIENCE_GROUP_AUDIENCE_INSUFFICIENT', 'INTERNAL_ERROR'])
  .nullable()
  .meta({ description: 'Failed type' })

export type AudienceGroupFailedType = z.infer<typeof AudienceGroupFailedTypeSchema>

export const AudienceGroupPermissionSchema = z
  .enum(['READ', 'READ_WRITE'])
  .meta({ description: 'Permission' })

export type AudienceGroupPermission = z.infer<typeof AudienceGroupPermissionSchema>

export const AudienceGroupCreateRouteSchema = z
  .enum(['OA_MANAGER', 'MESSAGING_API', 'POINT_AD', 'AD_MANAGER'])
  .meta({
    description:
      'How the audience was created. One of:\n\n- `OA_MANAGER`: Audience created with [LINE Official Account Manager](https://manager.line.biz/).\n- `MESSAGING_API`: Audience created with Messaging API.\n- `POINT_AD`: Audience created with [LINE Points Ads](https://www.linebiz.com/jp/service/line-point-ad/) (Japanese only).\n- `AD_MANAGER`: Audience created with [LINE Ads](https://admanager.line.biz/).\n',
  })

export type AudienceGroupCreateRoute = z.infer<typeof AudienceGroupCreateRouteSchema>

export const AudienceGroupSchema = z
  .object({
    audienceGroupId: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({ description: 'The audience ID.' })
      .exactOptional(),
    type: AudienceGroupTypeSchema.exactOptional(),
    description: z.string().meta({ description: "The audience's name." }).exactOptional(),
    status: AudienceGroupStatusSchema.exactOptional(),
    failedType: AudienceGroupFailedTypeSchema.exactOptional(),
    audienceCount: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({ description: 'The number of users included in the audience.' })
      .exactOptional(),
    created: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({ description: 'When the audience was created (in UNIX time).' })
      .exactOptional(),
    requestId: z
      .string()
      .meta({
        description:
          'The request ID that was specified when the audience was created.\nThis is only included when `audienceGroup.type` is CLICK or IMP.\n',
      })
      .exactOptional(),
    clickUrl: z
      .url()
      .meta({
        description:
          'The URL that was specified when the audience was created.\nThis is only included when `audienceGroup.type` is CLICK and link URL is specified.\n',
      })
      .exactOptional(),
    isIfaAudience: z
      .boolean()
      .meta({
        description:
          'The value indicating the type of account to be sent, as specified when creating the audience for uploading user IDs.\n',
      })
      .exactOptional(),
    permission: AudienceGroupPermissionSchema.exactOptional(),
    createRoute: AudienceGroupCreateRouteSchema.exactOptional(),
  })
  .meta({ description: 'Audience group' })

export type AudienceGroup = z.infer<typeof AudienceGroupSchema>

export const AudienceGroupJobTypeSchema = z.literal('DIFF_ADD').meta({ description: 'Job Type' })

export type AudienceGroupJobType = z.infer<typeof AudienceGroupJobTypeSchema>

export const AudienceGroupJobStatusSchema = z
  .enum(['QUEUED', 'WORKING', 'FINISHED', 'FAILED'])
  .meta({ description: 'Job status' })

export type AudienceGroupJobStatus = z.infer<typeof AudienceGroupJobStatusSchema>

export const AudienceGroupJobFailedTypeSchema = z
  .enum(['INTERNAL_ERROR', 'AUDIENCE_GROUP_AUDIENCE_INSUFFICIENT'])
  .meta({ description: 'Failed type' })

export type AudienceGroupJobFailedType = z.infer<typeof AudienceGroupJobFailedTypeSchema>

export const AudienceGroupJobSchema = z
  .object({
    audienceGroupJobId: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({ description: 'A job ID.' })
      .exactOptional(),
    audienceGroupId: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({ description: 'An audience ID.' })
      .exactOptional(),
    description: z.string().meta({ description: "The job's description." }).exactOptional(),
    type: AudienceGroupJobTypeSchema.exactOptional(),
    jobStatus: AudienceGroupJobStatusSchema.exactOptional(),
    failedType: AudienceGroupJobFailedTypeSchema.exactOptional(),
    audienceCount: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({ description: 'The number of accounts (recipients) that were added or removed.' })
      .exactOptional(),
    created: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({ description: 'When the job was created (in UNIX time).' })
      .exactOptional(),
  })
  .meta({
    description: 'Audience group job',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-audience-group',
    },
  })

export type AudienceGroupJob = z.infer<typeof AudienceGroupJobSchema>

export const AdaccountSchema = z
  .object({ name: z.string().meta({ description: 'Ad account name.' }).exactOptional() })
  .meta({ description: 'Adaccount' })

export type Adaccount = z.infer<typeof AdaccountSchema>

export const GetAudienceDataResponseSchema = z
  .object({
    audienceGroup: AudienceGroupSchema.exactOptional(),
    jobs: z
      .array(AudienceGroupJobSchema)
      .max(50)
      .meta({
        description:
          'An array of jobs.\nThis array is used to keep track of each attempt to add new user IDs or IFAs to an audience for uploading user IDs.\nEmpty array is returned for any other type of audience.\nMax: 50\n',
      })
      .exactOptional(),
    adaccount: AdaccountSchema.exactOptional(),
  })
  .meta({
    description: 'Get audience data',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-audience-group',
    },
  })

export type GetAudienceDataResponse = z.infer<typeof GetAudienceDataResponseSchema>

export const DetailedOwnerSchema = z
  .object({
    serviceType: z
      .string()
      .meta({
        description: 'Service name where the audience group has been created.',
        examples: ['lap'],
      })
      .exactOptional(),
    id: z
      .string()
      .meta({ description: 'Owner ID in the service.', examples: ['A012345678'] })
      .exactOptional(),
    name: z.string().meta({ description: 'Owner account name.' }).exactOptional(),
  })
  .meta({ description: 'Owner of this audience group.' })

export type DetailedOwner = z.infer<typeof DetailedOwnerSchema>

export const GetSharedAudienceDataResponseSchema = z
  .object({
    audienceGroup: AudienceGroupSchema.exactOptional(),
    jobs: z
      .array(AudienceGroupJobSchema)
      .max(50)
      .meta({
        description:
          'An array of jobs.\nThis array is used to keep track of each attempt to add new user IDs or IFAs to an audience for uploading user IDs.\nEmpty array is returned for any other type of audience.\nMax: 50\n',
      })
      .exactOptional(),
    owner: DetailedOwnerSchema.exactOptional(),
  })
  .meta({
    description: 'Get audience data',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-audience-group',
    },
  })

export type GetSharedAudienceDataResponse = z.infer<typeof GetSharedAudienceDataResponseSchema>

export const GetAudienceGroupsResponseSchema = z
  .object({
    audienceGroups: z
      .array(AudienceGroupSchema)
      .meta({
        description:
          'An array of audience data. If there are no audiences that match the specified filter, an empty array will be returned.',
      })
      .exactOptional(),
    hasNextPage: z
      .boolean()
      .meta({ description: 'true when this is not the last page.' })
      .exactOptional(),
    totalCount: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({
        description:
          'The total number of audiences that can be returned with the specified filter.',
      })
      .exactOptional(),
    readWriteAudienceGroupTotalCount: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({
        description:
          'Of the audiences you can get with the specified filter, the number of audiences with the update permission set to READ_WRITE.',
      })
      .exactOptional(),
    page: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({ description: 'The current page number.' })
      .exactOptional(),
    size: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({ description: 'The maximum number of audiences on the current page.' })
      .exactOptional(),
  })
  .meta({
    description: 'Gets data for more than one audience.',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-audience-groups',
    },
  })

export type GetAudienceGroupsResponse = z.infer<typeof GetAudienceGroupsResponseSchema>

export const GetSharedAudienceGroupsResponseSchema = z
  .object({
    audienceGroups: z
      .array(AudienceGroupSchema)
      .meta({
        description:
          'An array of audience data. If there are no audiences that match the specified filter, an empty array will be returned.',
      })
      .exactOptional(),
    hasNextPage: z
      .boolean()
      .meta({ description: 'true when this is not the last page.' })
      .exactOptional(),
    totalCount: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({
        description:
          'The total number of audiences that can be returned with the specified filter.',
      })
      .exactOptional(),
    readWriteAudienceGroupTotalCount: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({
        description:
          'Of the audiences you can get with the specified filter, the number of audiences with the update permission set to READ_WRITE.',
      })
      .exactOptional(),
    page: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({ description: 'The current page number.' })
      .exactOptional(),
    size: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({ description: 'The maximum number of audiences on the current page.' })
      .exactOptional(),
  })
  .meta({
    description: 'Gets data for more than one audience.',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-audience-groups',
    },
  })

export type GetSharedAudienceGroupsResponse = z.infer<typeof GetSharedAudienceGroupsResponseSchema>

export const ErrorDetailSchema = z.object({
  message: z
    .string()
    .meta({
      description: 'Details of the error. Not included in the response under certain situations.',
    })
    .exactOptional(),
  property: z
    .string()
    .meta({
      description:
        'Location of where the error occurred. Returns the JSON field name or query parameter name of the request. Not included in the response under certain situations.',
    })
    .exactOptional(),
})

export type ErrorDetail = z.infer<typeof ErrorDetailSchema>

export const ErrorResponseSchema = z
  .object({
    message: z.string().meta({ description: 'Message containing information about the error.' }),
    details: z
      .array(ErrorDetailSchema)
      .meta({
        description:
          'An array of error details. If the array is empty, this property will not be included in the response.',
      })
      .exactOptional(),
  })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#error-responses',
    },
  })

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>

export const BearerSecurityScheme = {
  type: 'http',
  scheme: 'bearer',
  description: 'Channel access token',
}
