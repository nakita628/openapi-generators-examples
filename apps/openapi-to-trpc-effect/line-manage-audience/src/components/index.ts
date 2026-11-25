import { Effect, Schema, SchemaTransformation } from 'effect'

export const AudienceSchema = Schema.Struct({
  id: Schema.optionalKey(
    Schema.String.annotate({ description: 'A user ID or IFA. You can specify an empty array.' }),
  ),
}).annotate({ description: 'Audience' })

export type AudienceSchema = Schema.Schema.Type<typeof AudienceSchema>

export const CreateAudienceGroupRequestSchema = Schema.Struct({
  description: Schema.optionalKey(
    Schema.String.check(
      Schema.makeFilter((input) => [...input].length <= 120, {
        expected: 'a string of at most 120 characters',
      }),
    ).annotate({
      description:
        "The audience's name. This is case-insensitive, meaning AUDIENCE and audience are considered identical.\nMax character limit: 120\n",
    }),
  ),
  isIfaAudience: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        'To specify recipients by IFAs: set true.\nTo specify recipients by user IDs: set false or omit isIfaAudience property.\n',
    }),
  ),
  uploadDescription: Schema.optionalKey(
    Schema.String.annotate({
      description: 'The description to register for the job (in jobs[].description).\n',
    }),
  ),
  audiences: Schema.optionalKey(
    Schema.Array(AudienceSchema)
      .check(Schema.isMaxLength(10000))
      .annotate({ description: 'An array of user IDs or IFAs.\nMax number: 10,000\n' }),
  ),
}).annotate({
  description: 'Create audience for uploading user IDs (by JSON)',
  jsonSchemaExternalDocs: {
    url: 'https://developers.line.biz/en/reference/messaging-api/#create-upload-audience-group',
  },
})

export type CreateAudienceGroupRequestSchema = Schema.Schema.Type<
  typeof CreateAudienceGroupRequestSchema
>

export const AudienceGroupTypeSchema = Schema.Literals([
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
]).annotate({ description: 'Audience group type' })

export type AudienceGroupTypeSchema = Schema.Schema.Type<typeof AudienceGroupTypeSchema>

export const CreateAudienceGroupResponseSchema = Schema.Struct({
  audienceGroupId: Schema.optionalKey(
    Schema.Union([
      Schema.BigInt,
      Schema.Number.check(Schema.isInt()),
      Schema.String.check(Schema.isPattern(/^-?\d+$/)),
    ])
      .pipe(
        Schema.decodeTo(
          Schema.BigInt,
          SchemaTransformation.transform({
            decode: (input) => BigInt(input),
            encode: (output) => output,
          }),
        ),
      )
      .check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({ description: 'The audience ID.' }),
  ),
  createRoute: Schema.optionalKey(
    Schema.Literal('MESSAGING_API').annotate({
      description:
        'How the audience was created.\n\n`MESSAGING_API`: An audience created with Messaging API.\n',
    }),
  ),
  type: Schema.optionalKey(AudienceGroupTypeSchema),
  description: Schema.optionalKey(Schema.String.annotate({ description: "The audience's name." })),
  created: Schema.optionalKey(
    Schema.Union([
      Schema.BigInt,
      Schema.Number.check(Schema.isInt()),
      Schema.String.check(Schema.isPattern(/^-?\d+$/)),
    ])
      .pipe(
        Schema.decodeTo(
          Schema.BigInt,
          SchemaTransformation.transform({
            decode: (input) => BigInt(input),
            encode: (output) => output,
          }),
        ),
      )
      .check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({ description: 'When the audience was created (in UNIX time).' }),
  ),
  permission: Schema.optionalKey(
    Schema.Literals(['READ', 'READ_WRITE']).annotate({
      description:
        "Audience's update permission. Audiences linked to the same channel will be READ_WRITE.\n\n`READ`: Can use only.\n`READ_WRITE`: Can use and update.\n",
    }),
  ),
  expireTimestamp: Schema.optionalKey(
    Schema.Union([
      Schema.BigInt,
      Schema.Number.check(Schema.isInt()),
      Schema.String.check(Schema.isPattern(/^-?\d+$/)),
    ])
      .pipe(
        Schema.decodeTo(
          Schema.BigInt,
          SchemaTransformation.transform({
            decode: (input) => BigInt(input),
            encode: (output) => output,
          }),
        ),
      )
      .check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({
        description: 'Time of audience expiration. Only returned for specific audiences.\n',
      }),
  ),
  isIfaAudience: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        'The value indicating the type of account to be sent, as specified when creating the audience for uploading user IDs. One of:\n\n`true`: Accounts are specified with IFAs.\n`false` (default): Accounts are specified with user IDs.\n',
    }),
  ),
}).annotate({
  description: 'Create audience for uploading user IDs (by JSON)',
  jsonSchemaExternalDocs: {
    url: 'https://developers.line.biz/en/reference/messaging-api/#create-upload-audience-group',
  },
})

export type CreateAudienceGroupResponseSchema = Schema.Schema.Type<
  typeof CreateAudienceGroupResponseSchema
>

export const AddAudienceToAudienceGroupRequestSchema = Schema.Struct({
  audienceGroupId: Schema.optionalKey(
    Schema.Union([
      Schema.BigInt,
      Schema.Number.check(Schema.isInt()),
      Schema.String.check(Schema.isPattern(/^-?\d+$/)),
    ])
      .pipe(
        Schema.decodeTo(
          Schema.BigInt,
          SchemaTransformation.transform({
            decode: (input) => BigInt(input),
            encode: (output) => output,
          }),
        ),
      )
      .check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({ description: 'The audience ID.' }),
  ),
  uploadDescription: Schema.optionalKey(
    Schema.String.annotate({ description: "The audience's name." }),
  ),
  audiences: Schema.optionalKey(
    Schema.Array(AudienceSchema)
      .check(Schema.isMaxLength(10000))
      .annotate({ description: 'An array of up to 10,000 user IDs or IFAs.' }),
  ),
}).annotate({
  description:
    'Add user IDs or Identifiers for Advertisers (IFAs) to an audience for uploading user IDs (by JSON)',
  jsonSchemaExternalDocs: {
    url: 'https://developers.line.biz/en/reference/messaging-api/#update-upload-audience-group',
  },
})

export type AddAudienceToAudienceGroupRequestSchema = Schema.Schema.Type<
  typeof AddAudienceToAudienceGroupRequestSchema
>

export const CreateClickBasedAudienceGroupRequestSchema = Schema.Struct({
  description: Schema.optionalKey(
    Schema.String.check(
      Schema.makeFilter((input) => [...input].length <= 120, {
        expected: 'a string of at most 120 characters',
      }),
    ).annotate({
      description:
        "The audience's name. This is case-insensitive, meaning AUDIENCE and audience are considered identical.\nMax character limit: 120\n",
    }),
  ),
  requestId: Schema.optionalKey(
    Schema.String.annotate({
      description:
        'The request ID of a broadcast or narrowcast message sent in the past 60 days.\nEach Messaging API request has a request ID.\n',
    }),
  ),
  clickUrl: Schema.optionalKey(
    Schema.String.check(
      Schema.makeFilter((input) => URL.canParse(input)),
      Schema.makeFilter((input) => [...input].length <= 2000, {
        expected: 'a string of at most 2000 characters',
      }),
    ).annotate({
      description:
        'The URL clicked by the user. If empty, users who clicked any URL in the message are added to the list of recipients.\nMax character limit: 2,000\n',
    }),
  ),
}).annotate({
  description: 'Create audience for click-based retargeting',
  jsonSchemaExternalDocs: {
    url: 'https://developers.line.biz/en/reference/messaging-api/#create-click-audience-group',
  },
})

export type CreateClickBasedAudienceGroupRequestSchema = Schema.Schema.Type<
  typeof CreateClickBasedAudienceGroupRequestSchema
>

export const CreateClickBasedAudienceGroupResponseSchema = Schema.Struct({
  audienceGroupId: Schema.optionalKey(
    Schema.Union([
      Schema.BigInt,
      Schema.Number.check(Schema.isInt()),
      Schema.String.check(Schema.isPattern(/^-?\d+$/)),
    ])
      .pipe(
        Schema.decodeTo(
          Schema.BigInt,
          SchemaTransformation.transform({
            decode: (input) => BigInt(input),
            encode: (output) => output,
          }),
        ),
      )
      .check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({ description: 'The audience ID.' }),
  ),
  type: Schema.optionalKey(AudienceGroupTypeSchema),
  description: Schema.optionalKey(Schema.String.annotate({ description: "The audience's name." })),
  created: Schema.optionalKey(
    Schema.Union([
      Schema.BigInt,
      Schema.Number.check(Schema.isInt()),
      Schema.String.check(Schema.isPattern(/^-?\d+$/)),
    ])
      .pipe(
        Schema.decodeTo(
          Schema.BigInt,
          SchemaTransformation.transform({
            decode: (input) => BigInt(input),
            encode: (output) => output,
          }),
        ),
      )
      .check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({ description: 'When the audience was created (in UNIX time).' }),
  ),
  requestId: Schema.optionalKey(
    Schema.String.annotate({
      description: 'The request ID that was specified when the audience was created.',
    }),
  ),
  clickUrl: Schema.optionalKey(
    Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
      description: 'The URL that was specified when the audience was created.',
    }),
  ),
  createRoute: Schema.optionalKey(
    Schema.Literal('MESSAGING_API').annotate({
      description:
        'How the audience was created.\n`MESSAGING_API`: An audience created with Messaging API.\n',
    }),
  ),
  permission: Schema.optionalKey(
    Schema.Literals(['READ', 'READ_WRITE']).annotate({
      description:
        "Audience's update permission. Audiences linked to the same channel will be READ_WRITE.\n\n- `READ`: Can use only.\n- `READ_WRITE`: Can use and update.\n",
    }),
  ),
  expireTimestamp: Schema.optionalKey(
    Schema.Union([
      Schema.BigInt,
      Schema.Number.check(Schema.isInt()),
      Schema.String.check(Schema.isPattern(/^-?\d+$/)),
    ])
      .pipe(
        Schema.decodeTo(
          Schema.BigInt,
          SchemaTransformation.transform({
            decode: (input) => BigInt(input),
            encode: (output) => output,
          }),
        ),
      )
      .check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({
        description: 'Time of audience expiration. Only returned for specific audiences.',
      }),
  ),
  isIfaAudience: Schema.Boolean.pipe(Schema.withDecodingDefault(Effect.succeed(false))).annotate({
    description:
      'The value indicating the type of account to be sent, as specified when creating the audience for uploading user IDs. One of:\n\ntrue: Accounts are specified with IFAs.\nfalse (default): Accounts are specified with user IDs.\n',
  }),
}).annotate({
  description: 'Create audience for click-based retargeting',
  jsonSchemaExternalDocs: {
    url: 'https://developers.line.biz/en/reference/messaging-api/#create-click-audience-group',
  },
})

export type CreateClickBasedAudienceGroupResponseSchema = Schema.Schema.Type<
  typeof CreateClickBasedAudienceGroupResponseSchema
>

export const CreateImpBasedAudienceGroupRequestSchema = Schema.Struct({
  description: Schema.optionalKey(
    Schema.String.check(
      Schema.makeFilter((input) => [...input].length >= 1, {
        expected: 'a string of at least 1 character',
      }),
      Schema.makeFilter((input) => [...input].length <= 120, {
        expected: 'a string of at most 120 characters',
      }),
    ).annotate({
      description:
        "The audience's name.\nThis is case-insensitive, meaning `AUDIENCE` and `audience` are considered identical.\nMax character limit: 120\n",
    }),
  ),
  requestId: Schema.optionalKey(
    Schema.String.annotate({
      description:
        'The request ID of a broadcast or narrowcast message sent in the past 60 days.\nEach Messaging API request has a request ID.\n',
    }),
  ),
}).annotate({
  description: 'Create audience for impression-based retargeting',
  jsonSchemaExternalDocs: {
    url: 'https://developers.line.biz/en/reference/messaging-api/#create-imp-audience-group',
  },
})

export type CreateImpBasedAudienceGroupRequestSchema = Schema.Schema.Type<
  typeof CreateImpBasedAudienceGroupRequestSchema
>

export const CreateImpBasedAudienceGroupResponseSchema = Schema.Struct({
  audienceGroupId: Schema.optionalKey(
    Schema.Union([
      Schema.BigInt,
      Schema.Number.check(Schema.isInt()),
      Schema.String.check(Schema.isPattern(/^-?\d+$/)),
    ])
      .pipe(
        Schema.decodeTo(
          Schema.BigInt,
          SchemaTransformation.transform({
            decode: (input) => BigInt(input),
            encode: (output) => output,
          }),
        ),
      )
      .check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({ description: 'The audience ID.' }),
  ),
  type: Schema.optionalKey(AudienceGroupTypeSchema),
  description: Schema.optionalKey(Schema.String.annotate({ description: "The audience's name." })),
  created: Schema.optionalKey(
    Schema.Union([
      Schema.BigInt,
      Schema.Number.check(Schema.isInt()),
      Schema.String.check(Schema.isPattern(/^-?\d+$/)),
    ])
      .pipe(
        Schema.decodeTo(
          Schema.BigInt,
          SchemaTransformation.transform({
            decode: (input) => BigInt(input),
            encode: (output) => output,
          }),
        ),
      )
      .check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({ description: 'When the audience was created (in UNIX time).' }),
  ),
  requestId: Schema.optionalKey(
    Schema.String.annotate({
      description: 'The request ID that was specified when the audience was created.',
    }),
  ),
}).annotate({
  description: 'Create audience for impression-based retargeting',
  jsonSchemaExternalDocs: {
    url: 'https://developers.line.biz/en/reference/messaging-api/#create-imp-audience-group',
  },
})

export type CreateImpBasedAudienceGroupResponseSchema = Schema.Schema.Type<
  typeof CreateImpBasedAudienceGroupResponseSchema
>

export const UpdateAudienceGroupDescriptionRequestSchema = Schema.Struct({
  description: Schema.optionalKey(
    Schema.String.check(
      Schema.makeFilter((input) => [...input].length >= 1, {
        expected: 'a string of at least 1 character',
      }),
      Schema.makeFilter((input) => [...input].length <= 120, {
        expected: 'a string of at most 120 characters',
      }),
    ).annotate({
      description:
        "The audience's name. This is case-insensitive, meaning AUDIENCE and audience are considered identical.\nMax character limit: 120\n",
    }),
  ),
}).annotate({
  description: 'Rename an audience',
  jsonSchemaExternalDocs: {
    url: 'https://developers.line.biz/en/reference/messaging-api/#set-description-audience-group',
  },
})

export type UpdateAudienceGroupDescriptionRequestSchema = Schema.Schema.Type<
  typeof UpdateAudienceGroupDescriptionRequestSchema
>

export const AudienceGroupStatusSchema = Schema.Literals([
  'IN_PROGRESS',
  'READY',
  'FAILED',
  'EXPIRED',
  'INACTIVE',
  'ACTIVATING',
]).annotate({ description: 'Status' })

export type AudienceGroupStatusSchema = Schema.Schema.Type<typeof AudienceGroupStatusSchema>

export const AudienceGroupFailedTypeSchema = Schema.NullOr(
  Schema.Literals(['AUDIENCE_GROUP_AUDIENCE_INSUFFICIENT', 'INTERNAL_ERROR']),
).annotate({ description: 'Failed type' })

export type AudienceGroupFailedTypeSchema = Schema.Schema.Type<typeof AudienceGroupFailedTypeSchema>

export const AudienceGroupPermissionSchema = Schema.Literals(['READ', 'READ_WRITE']).annotate({
  description: 'Permission',
})

export type AudienceGroupPermissionSchema = Schema.Schema.Type<typeof AudienceGroupPermissionSchema>

export const AudienceGroupCreateRouteSchema = Schema.Literals([
  'OA_MANAGER',
  'MESSAGING_API',
  'POINT_AD',
  'AD_MANAGER',
]).annotate({
  description:
    'How the audience was created. One of:\n\n- `OA_MANAGER`: Audience created with [LINE Official Account Manager](https://manager.line.biz/).\n- `MESSAGING_API`: Audience created with Messaging API.\n- `POINT_AD`: Audience created with [LINE Points Ads](https://www.linebiz.com/jp/service/line-point-ad/) (Japanese only).\n- `AD_MANAGER`: Audience created with [LINE Ads](https://admanager.line.biz/).\n',
})

export type AudienceGroupCreateRouteSchema = Schema.Schema.Type<
  typeof AudienceGroupCreateRouteSchema
>

export const AudienceGroupSchema = Schema.Struct({
  audienceGroupId: Schema.optionalKey(
    Schema.Union([
      Schema.BigInt,
      Schema.Number.check(Schema.isInt()),
      Schema.String.check(Schema.isPattern(/^-?\d+$/)),
    ])
      .pipe(
        Schema.decodeTo(
          Schema.BigInt,
          SchemaTransformation.transform({
            decode: (input) => BigInt(input),
            encode: (output) => output,
          }),
        ),
      )
      .check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({ description: 'The audience ID.' }),
  ),
  type: Schema.optionalKey(AudienceGroupTypeSchema),
  description: Schema.optionalKey(Schema.String.annotate({ description: "The audience's name." })),
  status: Schema.optionalKey(AudienceGroupStatusSchema),
  failedType: Schema.optionalKey(AudienceGroupFailedTypeSchema),
  audienceCount: Schema.optionalKey(
    Schema.Union([
      Schema.BigInt,
      Schema.Number.check(Schema.isInt()),
      Schema.String.check(Schema.isPattern(/^-?\d+$/)),
    ])
      .pipe(
        Schema.decodeTo(
          Schema.BigInt,
          SchemaTransformation.transform({
            decode: (input) => BigInt(input),
            encode: (output) => output,
          }),
        ),
      )
      .check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({ description: 'The number of users included in the audience.' }),
  ),
  created: Schema.optionalKey(
    Schema.Union([
      Schema.BigInt,
      Schema.Number.check(Schema.isInt()),
      Schema.String.check(Schema.isPattern(/^-?\d+$/)),
    ])
      .pipe(
        Schema.decodeTo(
          Schema.BigInt,
          SchemaTransformation.transform({
            decode: (input) => BigInt(input),
            encode: (output) => output,
          }),
        ),
      )
      .check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({ description: 'When the audience was created (in UNIX time).' }),
  ),
  requestId: Schema.optionalKey(
    Schema.String.annotate({
      description:
        'The request ID that was specified when the audience was created.\nThis is only included when `audienceGroup.type` is CLICK or IMP.\n',
    }),
  ),
  clickUrl: Schema.optionalKey(
    Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
      description:
        'The URL that was specified when the audience was created.\nThis is only included when `audienceGroup.type` is CLICK and link URL is specified.\n',
    }),
  ),
  isIfaAudience: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        'The value indicating the type of account to be sent, as specified when creating the audience for uploading user IDs.\n',
    }),
  ),
  permission: Schema.optionalKey(AudienceGroupPermissionSchema),
  createRoute: Schema.optionalKey(AudienceGroupCreateRouteSchema),
}).annotate({ description: 'Audience group' })

export type AudienceGroupSchema = Schema.Schema.Type<typeof AudienceGroupSchema>

export const AudienceGroupJobTypeSchema = Schema.Literal('DIFF_ADD').annotate({
  description: 'Job Type',
})

export type AudienceGroupJobTypeSchema = Schema.Schema.Type<typeof AudienceGroupJobTypeSchema>

export const AudienceGroupJobStatusSchema = Schema.Literals([
  'QUEUED',
  'WORKING',
  'FINISHED',
  'FAILED',
]).annotate({ description: 'Job status' })

export type AudienceGroupJobStatusSchema = Schema.Schema.Type<typeof AudienceGroupJobStatusSchema>

export const AudienceGroupJobFailedTypeSchema = Schema.Literals([
  'INTERNAL_ERROR',
  'AUDIENCE_GROUP_AUDIENCE_INSUFFICIENT',
]).annotate({ description: 'Failed type' })

export type AudienceGroupJobFailedTypeSchema = Schema.Schema.Type<
  typeof AudienceGroupJobFailedTypeSchema
>

export const AudienceGroupJobSchema = Schema.Struct({
  audienceGroupJobId: Schema.optionalKey(
    Schema.Union([
      Schema.BigInt,
      Schema.Number.check(Schema.isInt()),
      Schema.String.check(Schema.isPattern(/^-?\d+$/)),
    ])
      .pipe(
        Schema.decodeTo(
          Schema.BigInt,
          SchemaTransformation.transform({
            decode: (input) => BigInt(input),
            encode: (output) => output,
          }),
        ),
      )
      .check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({ description: 'A job ID.' }),
  ),
  audienceGroupId: Schema.optionalKey(
    Schema.Union([
      Schema.BigInt,
      Schema.Number.check(Schema.isInt()),
      Schema.String.check(Schema.isPattern(/^-?\d+$/)),
    ])
      .pipe(
        Schema.decodeTo(
          Schema.BigInt,
          SchemaTransformation.transform({
            decode: (input) => BigInt(input),
            encode: (output) => output,
          }),
        ),
      )
      .check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({ description: 'An audience ID.' }),
  ),
  description: Schema.optionalKey(
    Schema.String.annotate({ description: "The job's description." }),
  ),
  type: Schema.optionalKey(AudienceGroupJobTypeSchema),
  jobStatus: Schema.optionalKey(AudienceGroupJobStatusSchema),
  failedType: Schema.optionalKey(AudienceGroupJobFailedTypeSchema),
  audienceCount: Schema.optionalKey(
    Schema.Union([
      Schema.BigInt,
      Schema.Number.check(Schema.isInt()),
      Schema.String.check(Schema.isPattern(/^-?\d+$/)),
    ])
      .pipe(
        Schema.decodeTo(
          Schema.BigInt,
          SchemaTransformation.transform({
            decode: (input) => BigInt(input),
            encode: (output) => output,
          }),
        ),
      )
      .check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({ description: 'The number of accounts (recipients) that were added or removed.' }),
  ),
  created: Schema.optionalKey(
    Schema.Union([
      Schema.BigInt,
      Schema.Number.check(Schema.isInt()),
      Schema.String.check(Schema.isPattern(/^-?\d+$/)),
    ])
      .pipe(
        Schema.decodeTo(
          Schema.BigInt,
          SchemaTransformation.transform({
            decode: (input) => BigInt(input),
            encode: (output) => output,
          }),
        ),
      )
      .check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({ description: 'When the job was created (in UNIX time).' }),
  ),
}).annotate({
  description: 'Audience group job',
  jsonSchemaExternalDocs: {
    url: 'https://developers.line.biz/en/reference/messaging-api/#get-audience-group',
  },
})

export type AudienceGroupJobSchema = Schema.Schema.Type<typeof AudienceGroupJobSchema>

export const AdaccountSchema = Schema.Struct({
  name: Schema.optionalKey(Schema.String.annotate({ description: 'Ad account name.' })),
}).annotate({ description: 'Adaccount' })

export type AdaccountSchema = Schema.Schema.Type<typeof AdaccountSchema>

export const GetAudienceDataResponseSchema = Schema.Struct({
  audienceGroup: Schema.optionalKey(AudienceGroupSchema),
  jobs: Schema.optionalKey(
    Schema.Array(AudienceGroupJobSchema)
      .check(Schema.isMaxLength(50))
      .annotate({
        description:
          'An array of jobs.\nThis array is used to keep track of each attempt to add new user IDs or IFAs to an audience for uploading user IDs.\nEmpty array is returned for any other type of audience.\nMax: 50\n',
      }),
  ),
  adaccount: Schema.optionalKey(AdaccountSchema),
}).annotate({
  description: 'Get audience data',
  jsonSchemaExternalDocs: {
    url: 'https://developers.line.biz/en/reference/messaging-api/#get-audience-group',
  },
})

export type GetAudienceDataResponseSchema = Schema.Schema.Type<typeof GetAudienceDataResponseSchema>

export const DetailedOwnerSchema = Schema.Struct({
  serviceType: Schema.optionalKey(
    Schema.String.annotate({
      description: 'Service name where the audience group has been created.',
      jsonSchemaExamples: ['lap'],
    }),
  ),
  id: Schema.optionalKey(
    Schema.String.annotate({
      description: 'Owner ID in the service.',
      jsonSchemaExamples: ['A012345678'],
    }),
  ),
  name: Schema.optionalKey(Schema.String.annotate({ description: 'Owner account name.' })),
}).annotate({ description: 'Owner of this audience group.' })

export type DetailedOwnerSchema = Schema.Schema.Type<typeof DetailedOwnerSchema>

export const GetSharedAudienceDataResponseSchema = Schema.Struct({
  audienceGroup: Schema.optionalKey(AudienceGroupSchema),
  jobs: Schema.optionalKey(
    Schema.Array(AudienceGroupJobSchema)
      .check(Schema.isMaxLength(50))
      .annotate({
        description:
          'An array of jobs.\nThis array is used to keep track of each attempt to add new user IDs or IFAs to an audience for uploading user IDs.\nEmpty array is returned for any other type of audience.\nMax: 50\n',
      }),
  ),
  owner: Schema.optionalKey(DetailedOwnerSchema),
}).annotate({
  description: 'Get audience data',
  jsonSchemaExternalDocs: {
    url: 'https://developers.line.biz/en/reference/messaging-api/#get-audience-group',
  },
})

export type GetSharedAudienceDataResponseSchema = Schema.Schema.Type<
  typeof GetSharedAudienceDataResponseSchema
>

export const GetAudienceGroupsResponseSchema = Schema.Struct({
  audienceGroups: Schema.optionalKey(
    Schema.Array(AudienceGroupSchema).annotate({
      description:
        'An array of audience data. If there are no audiences that match the specified filter, an empty array will be returned.',
    }),
  ),
  hasNextPage: Schema.optionalKey(
    Schema.Boolean.annotate({ description: 'true when this is not the last page.' }),
  ),
  totalCount: Schema.optionalKey(
    Schema.Union([
      Schema.BigInt,
      Schema.Number.check(Schema.isInt()),
      Schema.String.check(Schema.isPattern(/^-?\d+$/)),
    ])
      .pipe(
        Schema.decodeTo(
          Schema.BigInt,
          SchemaTransformation.transform({
            decode: (input) => BigInt(input),
            encode: (output) => output,
          }),
        ),
      )
      .check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({
        description:
          'The total number of audiences that can be returned with the specified filter.',
      }),
  ),
  readWriteAudienceGroupTotalCount: Schema.optionalKey(
    Schema.Union([
      Schema.BigInt,
      Schema.Number.check(Schema.isInt()),
      Schema.String.check(Schema.isPattern(/^-?\d+$/)),
    ])
      .pipe(
        Schema.decodeTo(
          Schema.BigInt,
          SchemaTransformation.transform({
            decode: (input) => BigInt(input),
            encode: (output) => output,
          }),
        ),
      )
      .check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({
        description:
          'Of the audiences you can get with the specified filter, the number of audiences with the update permission set to READ_WRITE.',
      }),
  ),
  page: Schema.optionalKey(
    Schema.Union([
      Schema.BigInt,
      Schema.Number.check(Schema.isInt()),
      Schema.String.check(Schema.isPattern(/^-?\d+$/)),
    ])
      .pipe(
        Schema.decodeTo(
          Schema.BigInt,
          SchemaTransformation.transform({
            decode: (input) => BigInt(input),
            encode: (output) => output,
          }),
        ),
      )
      .check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({ description: 'The current page number.' }),
  ),
  size: Schema.optionalKey(
    Schema.Union([
      Schema.BigInt,
      Schema.Number.check(Schema.isInt()),
      Schema.String.check(Schema.isPattern(/^-?\d+$/)),
    ])
      .pipe(
        Schema.decodeTo(
          Schema.BigInt,
          SchemaTransformation.transform({
            decode: (input) => BigInt(input),
            encode: (output) => output,
          }),
        ),
      )
      .check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({ description: 'The maximum number of audiences on the current page.' }),
  ),
}).annotate({
  description: 'Gets data for more than one audience.',
  jsonSchemaExternalDocs: {
    url: 'https://developers.line.biz/en/reference/messaging-api/#get-audience-groups',
  },
})

export type GetAudienceGroupsResponseSchema = Schema.Schema.Type<
  typeof GetAudienceGroupsResponseSchema
>

export const GetSharedAudienceGroupsResponseSchema = Schema.Struct({
  audienceGroups: Schema.optionalKey(
    Schema.Array(AudienceGroupSchema).annotate({
      description:
        'An array of audience data. If there are no audiences that match the specified filter, an empty array will be returned.',
    }),
  ),
  hasNextPage: Schema.optionalKey(
    Schema.Boolean.annotate({ description: 'true when this is not the last page.' }),
  ),
  totalCount: Schema.optionalKey(
    Schema.Union([
      Schema.BigInt,
      Schema.Number.check(Schema.isInt()),
      Schema.String.check(Schema.isPattern(/^-?\d+$/)),
    ])
      .pipe(
        Schema.decodeTo(
          Schema.BigInt,
          SchemaTransformation.transform({
            decode: (input) => BigInt(input),
            encode: (output) => output,
          }),
        ),
      )
      .check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({
        description:
          'The total number of audiences that can be returned with the specified filter.',
      }),
  ),
  readWriteAudienceGroupTotalCount: Schema.optionalKey(
    Schema.Union([
      Schema.BigInt,
      Schema.Number.check(Schema.isInt()),
      Schema.String.check(Schema.isPattern(/^-?\d+$/)),
    ])
      .pipe(
        Schema.decodeTo(
          Schema.BigInt,
          SchemaTransformation.transform({
            decode: (input) => BigInt(input),
            encode: (output) => output,
          }),
        ),
      )
      .check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({
        description:
          'Of the audiences you can get with the specified filter, the number of audiences with the update permission set to READ_WRITE.',
      }),
  ),
  page: Schema.optionalKey(
    Schema.Union([
      Schema.BigInt,
      Schema.Number.check(Schema.isInt()),
      Schema.String.check(Schema.isPattern(/^-?\d+$/)),
    ])
      .pipe(
        Schema.decodeTo(
          Schema.BigInt,
          SchemaTransformation.transform({
            decode: (input) => BigInt(input),
            encode: (output) => output,
          }),
        ),
      )
      .check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({ description: 'The current page number.' }),
  ),
  size: Schema.optionalKey(
    Schema.Union([
      Schema.BigInt,
      Schema.Number.check(Schema.isInt()),
      Schema.String.check(Schema.isPattern(/^-?\d+$/)),
    ])
      .pipe(
        Schema.decodeTo(
          Schema.BigInt,
          SchemaTransformation.transform({
            decode: (input) => BigInt(input),
            encode: (output) => output,
          }),
        ),
      )
      .check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({ description: 'The maximum number of audiences on the current page.' }),
  ),
}).annotate({
  description: 'Gets data for more than one audience.',
  jsonSchemaExternalDocs: {
    url: 'https://developers.line.biz/en/reference/messaging-api/#get-audience-groups',
  },
})

export type GetSharedAudienceGroupsResponseSchema = Schema.Schema.Type<
  typeof GetSharedAudienceGroupsResponseSchema
>

export const ErrorDetailSchema = Schema.Struct({
  message: Schema.optionalKey(
    Schema.String.annotate({
      description: 'Details of the error. Not included in the response under certain situations.',
    }),
  ),
  property: Schema.optionalKey(
    Schema.String.annotate({
      description:
        'Location of where the error occurred. Returns the JSON field name or query parameter name of the request. Not included in the response under certain situations.',
    }),
  ),
})

export type ErrorDetailSchema = Schema.Schema.Type<typeof ErrorDetailSchema>

export const ErrorResponseSchema = Schema.Struct({
  message: Schema.String.annotate({
    description: 'Message containing information about the error.',
  }),
  details: Schema.optionalKey(
    Schema.Array(ErrorDetailSchema).annotate({
      description:
        'An array of error details. If the array is empty, this property will not be included in the response.',
    }),
  ),
}).annotate({
  jsonSchemaExternalDocs: {
    url: 'https://developers.line.biz/en/reference/messaging-api/#error-responses',
  },
})

export type ErrorResponseSchema = Schema.Schema.Type<typeof ErrorResponseSchema>
