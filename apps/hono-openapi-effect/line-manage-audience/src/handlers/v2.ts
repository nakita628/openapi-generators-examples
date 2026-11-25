import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Effect, Schema, SchemaTransformation } from 'effect'
import {
  CreateAudienceGroupRequestSchema,
  CreateAudienceGroupResponseSchema,
  AddAudienceToAudienceGroupRequestSchema,
  CreateClickBasedAudienceGroupRequestSchema,
  CreateClickBasedAudienceGroupResponseSchema,
  CreateImpBasedAudienceGroupRequestSchema,
  CreateImpBasedAudienceGroupResponseSchema,
  UpdateAudienceGroupDescriptionRequestSchema,
  GetAudienceDataResponseSchema,
  GetSharedAudienceDataResponseSchema,
  AudienceGroupStatusSchema,
  AudienceGroupCreateRouteSchema,
  GetAudienceGroupsResponseSchema,
  GetSharedAudienceGroupsResponseSchema,
  ErrorResponseSchema,
} from '../components'

export const v2Handler = new Hono()
  .put(
    '/v2/bot/audienceGroup/upload',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#update-upload-audience-group',
      },
      tags: ['manage-audience'],
      operationId: 'addAudienceToAudienceGroup',
      description:
        'Add user IDs or Identifiers for Advertisers (IFAs) to an audience for uploading user IDs (by JSON)',
      responses: { '202': { description: 'OK' } },
    }),
    validator('json', Schema.toStandardSchemaV1(AddAudienceToAudienceGroupRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/audienceGroup/upload',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#create-upload-audience-group',
      },
      tags: ['manage-audience'],
      operationId: 'createAudienceGroup',
      description: 'Create audience for uploading user IDs (by JSON)',
      responses: {
        '202': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(CreateAudienceGroupResponseSchema)),
              example: {
                audienceGroupId: 1234567890123,
                createRoute: 'MESSAGING_API',
                type: 'UPLOAD',
                description: 'audienceGroupName_01',
                created: 1613698278,
                permission: 'READ_WRITE',
                expireTimestamp: 1629250278,
                isIfaAudience: false,
              },
            },
          },
        },
      },
    }),
    validator('json', Schema.toStandardSchemaV1(CreateAudienceGroupRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/v2/bot/audienceGroup/upload/byFile',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#update-upload-audience-group-by-file',
      },
      servers: [{ url: 'https://api-data.line.me' }],
      tags: ['manage-audience-blob'],
      operationId: 'addUserIdsToAudience',
      description:
        'Add user IDs or Identifiers for Advertisers (IFAs) to an audience for uploading user IDs (by file).',
      responses: { '202': { description: 'OK' } },
    }),
    validator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          audienceGroupId: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
            ).annotate({ description: 'The audience ID.' }),
          ),
          uploadDescription: Schema.optionalKey(
            Schema.String.annotate({ description: 'The description to register with the job' }),
          ),
          file: Schema.instanceOf(File).annotate({
            description:
              'A text file with one user ID or IFA entered per line. Specify text/plain as Content-Type. Max file number: 1\nMax number: 1,500,000\n',
          }),
        }).annotate({ description: 'Request of the addUserIdsToAudience' }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/audienceGroup/upload/byFile',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#create-upload-audience-group-by-file',
      },
      servers: [{ url: 'https://api-data.line.me' }],
      tags: ['manage-audience-blob'],
      operationId: 'createAudienceForUploadingUserIds',
      description: 'Create audience for uploading user IDs (by file).',
      responses: {
        '202': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(CreateAudienceGroupResponseSchema)),
              example: {
                audienceGroupId: 1234567890123,
                createRoute: 'MESSAGING_API',
                type: 'UPLOAD',
                description: 'audienceGroupName_01',
                created: 1613700237,
                permission: 'READ_WRITE',
                expireTimestamp: 1629252237,
                isIfaAudience: false,
              },
            },
          },
        },
      },
    }),
    validator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
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
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            )
              .pipe(
                Schema.decodeTo(
                  Schema.Boolean,
                  SchemaTransformation.transform({
                    decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                    encode: (output) => (output ? 'true' : 'false'),
                  }),
                ),
              )
              .annotate({
                description:
                  'To specify recipients by IFAs: set `true`.\nTo specify recipients by user IDs: set `false` or omit isIfaAudience property.\n',
              }),
          ),
          uploadDescription: Schema.optionalKey(
            Schema.String.annotate({
              description: 'The description to register for the job (in `jobs[].description`).\n',
            }),
          ),
          file: Schema.instanceOf(File).annotate({
            description:
              'A text file with one user ID or IFA entered per line. Specify text/plain as Content-Type. Max file number: 1\nMax number: 1,500,000\n',
          }),
        }).annotate({ description: 'Request for createAudienceForUploadingUserIds' }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/audienceGroup/click',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#create-click-audience-group',
      },
      tags: ['manage-audience'],
      operationId: 'createClickBasedAudienceGroup',
      description: 'Create audience for click-based retargeting',
      responses: {
        '202': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(
                Schema.toStandardSchemaV1(CreateClickBasedAudienceGroupResponseSchema),
              ),
              example: {
                audienceGroupId: 1234567890123,
                createRoute: 'MESSAGING_API',
                type: 'CLICK',
                description: 'audienceGroupName_01',
                created: 1613705240,
                permission: 'READ_WRITE',
                expireTimestamp: 1629257239,
                isIfaAudience: false,
                requestId: 'bb9744f9-47fa-4a29-941e-1234567890ab',
                clickUrl: 'https://developers.line.biz/',
              },
            },
          },
        },
      },
    }),
    validator('json', Schema.toStandardSchemaV1(CreateClickBasedAudienceGroupRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/audienceGroup/imp',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#create-imp-audience-group',
      },
      tags: ['manage-audience'],
      operationId: 'createImpBasedAudienceGroup',
      description: 'Create audience for impression-based retargeting',
      responses: {
        '202': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(
                Schema.toStandardSchemaV1(CreateImpBasedAudienceGroupResponseSchema),
              ),
              example: {
                audienceGroupId: 1234567890123,
                createRoute: 'MESSAGING_API',
                type: 'IMP',
                description: 'audienceGroupName_01',
                created: 1613707097,
                permission: 'READ_WRITE',
                expireTimestamp: 1629259095,
                isIfaAudience: false,
                requestId: 'bb9744f9-47fa-4a29-941e-1234567890ab',
              },
            },
          },
        },
      },
    }),
    validator('json', Schema.toStandardSchemaV1(CreateImpBasedAudienceGroupRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/v2/bot/audienceGroup/:audienceGroupId/updateDescription',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#set-description-audience-group',
      },
      tags: ['manage-audience'],
      operationId: 'updateAudienceGroupDescription',
      description: 'Renames an existing audience.',
      responses: { '200': { description: 'OK' } },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          audienceGroupId: Schema.BigIntFromString.check(
            Schema.isBetweenBigInt({
              minimum: -9223372036854775808n,
              maximum: 9223372036854775807n,
            }),
          ),
        }),
      ),
    ),
    validator('json', Schema.toStandardSchemaV1(UpdateAudienceGroupDescriptionRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/audienceGroup/:audienceGroupId',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-audience-group',
      },
      tags: ['manage-audience'],
      operationId: 'getAudienceData',
      description: 'Gets audience data.',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(GetAudienceDataResponseSchema)),
              examples: {
                UPLOADING_USER_IDS: {
                  summary: 'Example of an audience used for uploading user IDs',
                  value: {
                    audienceGroup: {
                      audienceGroupId: 1234567890123,
                      createRoute: 'OA_MANAGER',
                      type: 'UPLOAD',
                      description: 'audienceGroupName_01',
                      status: 'READY',
                      audienceCount: 1887,
                      created: 1608617466,
                      permission: 'READ',
                      isIfaAudience: false,
                      expireTimestamp: 1624342266,
                    },
                    jobs: [
                      {
                        audienceGroupJobId: 12345678,
                        audienceGroupId: 1234567890123,
                        description: 'audience_list.txt',
                        type: 'DIFF_ADD',
                        status: 'FINISHED',
                        failedType: 'AUDIENCE_GROUP_AUDIENCE_INSUFFICIENT',
                        audienceCount: 0,
                        created: 1608617472,
                        jobStatus: 'FINISHED',
                      },
                    ],
                  },
                },
                CLICK_BASED: {
                  summary: 'Example of an audience used for click-based retargeting',
                  value: {
                    audienceGroup: {
                      audienceGroupId: 1234567890987,
                      createRoute: 'OA_MANAGER',
                      type: 'CLICK',
                      description: 'audienceGroupName_02',
                      status: 'IN_PROGRESS',
                      audienceCount: 8619,
                      created: 1611114828,
                      permission: 'READ',
                      isIfaAudience: false,
                      expireTimestamp: 1626753228,
                      requestId: 'c10c3d86-f565-...',
                      clickUrl: 'https://example.com/',
                    },
                    jobs: [],
                  },
                },
                APP_EVENTS: {
                  summary: 'Example of an audience used for app events',
                  value: {
                    audienceGroup: {
                      audienceGroupId: 2345678909876,
                      createRoute: 'AD_MANAGER',
                      type: 'APP_EVENT',
                      description: 'audienceGroupName_03',
                      status: 'READY',
                      audienceCount: 8619,
                      created: 1608619802,
                      permission: 'READ',
                      activated: 1610068515,
                      inactiveTimestamp: 1625620516,
                      isIfaAudience: false,
                    },
                    jobs: [],
                    adaccount: { name: 'Ad Account Name' },
                  },
                },
              },
            },
          },
        },
        '400': {
          description: 'Bad request',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
              example: {
                message: 'audience group not found',
                details: [{ message: 'AUDIENCE_GROUP_NOT_FOUND' }],
              },
            },
          },
        },
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          audienceGroupId: Schema.BigIntFromString.check(
            Schema.isBetweenBigInt({
              minimum: -9223372036854775808n,
              maximum: 9223372036854775807n,
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/v2/bot/audienceGroup/:audienceGroupId',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#delete-audience-group',
      },
      tags: ['manage-audience'],
      operationId: 'deleteAudienceGroup',
      description: 'Delete audience',
      responses: { '200': { description: 'OK' } },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          audienceGroupId: Schema.BigIntFromString.check(
            Schema.isBetweenBigInt({
              minimum: -9223372036854775808n,
              maximum: 9223372036854775807n,
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/audienceGroup/list',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-audience-groups',
      },
      tags: ['manage-audience'],
      operationId: 'getAudienceGroups',
      description: 'Gets data for more than one audience.',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(GetAudienceGroupsResponseSchema)),
              examples: {
                TWO_AUDIENCES: {
                  summary:
                    'Example of when there are two audiences that match the specified filter',
                  value: {
                    audienceGroups: [
                      {
                        audienceGroupId: 1234567890123,
                        createRoute: 'OA_MANAGER',
                        type: 'CLICK',
                        description: 'audienceGroupName_01',
                        status: 'IN_PROGRESS',
                        audienceCount: 8619,
                        created: 1611114828,
                        permission: 'READ',
                        isIfaAudience: false,
                        expireTimestamp: 1626753228,
                        requestId: 'c10c3d86-f565-...',
                        clickUrl: 'https://example.com/',
                      },
                      {
                        audienceGroupId: 2345678901234,
                        createRoute: 'AD_MANAGER',
                        type: 'APP_EVENT',
                        description: 'audienceGroupName_02',
                        status: 'READY',
                        audienceCount: 3368,
                        created: 1608619802,
                        permission: 'READ',
                        activated: 1610068515,
                        inactiveTimestamp: 1625620516,
                        isIfaAudience: false,
                      },
                    ],
                    hasNextPage: false,
                    totalCount: 2,
                    readWriteAudienceGroupTotalCount: 0,
                    size: 40,
                    page: 1,
                  },
                },
                NO_AUDIENCE: {
                  summary: 'Example of when there is no audience that matches the specified filter',
                  value: {
                    audienceGroups: [],
                    hasNextPage: false,
                    totalCount: 0,
                    readWriteAudienceGroupTotalCount: 0,
                    size: 40,
                    page: 1,
                  },
                },
              },
            },
          },
        },
      },
    }),
    validator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          page: Schema.BigIntFromString.check(
            Schema.isBetweenBigInt({
              minimum: -9223372036854775808n,
              maximum: 9223372036854775807n,
            }),
            Schema.isGreaterThanOrEqualToBigInt(1n),
          ),
          description: Schema.optionalKey(Schema.String),
          status: Schema.optionalKey(AudienceGroupStatusSchema),
          size: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isLessThanOrEqualToBigInt(40n),
            ).annotate({ jsonSchemaExamples: [20] }),
          ),
          includesExternalPublicGroups: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            )
              .pipe(
                Schema.decodeTo(
                  Schema.Boolean,
                  SchemaTransformation.transform({
                    decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                    encode: (output) => (output ? 'true' : 'false'),
                  }),
                ),
              )
              .annotate({ jsonSchemaExamples: [true] }),
          ),
          createRoute: Schema.optionalKey(AudienceGroupCreateRouteSchema),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/audienceGroup/shared/:audienceGroupId',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-shared-audience',
      },
      tags: ['manage-audience'],
      operationId: 'getSharedAudienceData',
      description: 'Gets audience data.',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(GetSharedAudienceDataResponseSchema)),
              examples: {
                UPLOADING_USER_IDS: {
                  summary: 'Example of an audience used for uploading user IDs',
                  value: {
                    audienceGroup: {
                      audienceGroupId: 1234567890123,
                      createRoute: 'OA_MANAGER',
                      type: 'UPLOAD',
                      description: 'audienceGroupName_01',
                      status: 'READY',
                      audienceCount: 1887,
                      created: 1608617466,
                      permission: 'READ',
                      isIfaAudience: false,
                      expireTimestamp: 1624342266,
                    },
                    jobs: [
                      {
                        audienceGroupJobId: 12345678,
                        audienceGroupId: 1234567890123,
                        description: 'audience_list.txt',
                        type: 'DIFF_ADD',
                        status: 'FINISHED',
                        failedType: 'AUDIENCE_GROUP_AUDIENCE_INSUFFICIENT',
                        audienceCount: 0,
                        created: 1608617472,
                        jobStatus: 'FINISHED',
                      },
                    ],
                  },
                },
                CLICK_BASED: {
                  summary: 'Example of an audience used for click-based retargeting',
                  value: {
                    audienceGroup: {
                      audienceGroupId: 1234567890987,
                      createRoute: 'OA_MANAGER',
                      type: 'CLICK',
                      description: 'audienceGroupName_02',
                      status: 'IN_PROGRESS',
                      audienceCount: 8619,
                      created: 1611114828,
                      permission: 'READ',
                      isIfaAudience: false,
                      expireTimestamp: 1626753228,
                      requestId: 'c10c3d86-f565-...',
                      clickUrl: 'https://example.com/',
                    },
                    jobs: [],
                  },
                },
                APP_EVENTS: {
                  summary: 'Example of an audience used for app events',
                  value: {
                    audienceGroup: {
                      audienceGroupId: 2345678909876,
                      createRoute: 'AD_MANAGER',
                      type: 'APP_EVENT',
                      description: 'audienceGroupName_03',
                      status: 'READY',
                      audienceCount: 8619,
                      created: 1608619802,
                      permission: 'READ',
                      activated: 1610068515,
                      inactiveTimestamp: 1625620516,
                      isIfaAudience: false,
                    },
                    jobs: [],
                    owner: { serviceType: 'lap', id: 'A012345678', name: 'Ad Account Name' },
                  },
                },
              },
            },
          },
        },
        '400': {
          description: 'Bad request',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
              example: {
                message: 'audience group not found',
                details: [{ message: 'AUDIENCE_GROUP_NOT_FOUND' }],
              },
            },
          },
        },
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          audienceGroupId: Schema.BigIntFromString.check(
            Schema.isBetweenBigInt({
              minimum: -9223372036854775808n,
              maximum: 9223372036854775807n,
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/audienceGroup/shared/list',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-shared-audience-list',
      },
      tags: ['manage-audience'],
      operationId: 'getSharedAudienceGroups',
      description:
        'Gets data for more than one audience, including those shared by the Business Manager.',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(GetSharedAudienceGroupsResponseSchema)),
              examples: {
                TWO_AUDIENCES: {
                  summary:
                    'Example of when there are two audiences that match the specified filter',
                  value: {
                    audienceGroups: [
                      {
                        audienceGroupId: 1234567890123,
                        createRoute: 'OA_MANAGER',
                        type: 'CLICK',
                        description: 'audienceGroupName_01',
                        status: 'IN_PROGRESS',
                        audienceCount: 8619,
                        created: 1611114828,
                        permission: 'READ',
                        isIfaAudience: false,
                        expireTimestamp: 1626753228,
                        requestId: 'c10c3d86-f565-...',
                        clickUrl: 'https://example.com/',
                      },
                      {
                        audienceGroupId: 2345678901234,
                        createRoute: 'AD_MANAGER',
                        type: 'APP_EVENT',
                        description: 'audienceGroupName_02',
                        status: 'READY',
                        audienceCount: 3368,
                        created: 1608619802,
                        permission: 'READ',
                        activated: 1610068515,
                        inactiveTimestamp: 1625620516,
                        isIfaAudience: false,
                      },
                    ],
                    hasNextPage: false,
                    totalCount: 2,
                    readWriteAudienceGroupTotalCount: 0,
                    size: 40,
                    page: 1,
                  },
                },
                NO_AUDIENCE: {
                  summary: 'Example of when there is no audience that matches the specified filter',
                  value: {
                    audienceGroups: [],
                    hasNextPage: false,
                    totalCount: 0,
                    readWriteAudienceGroupTotalCount: 0,
                    size: 40,
                    page: 1,
                  },
                },
              },
            },
          },
        },
      },
    }),
    validator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          page: Schema.BigIntFromString.check(
            Schema.isBetweenBigInt({
              minimum: -9223372036854775808n,
              maximum: 9223372036854775807n,
            }),
            Schema.isGreaterThanOrEqualToBigInt(1n),
          ),
          description: Schema.optionalKey(Schema.String),
          status: Schema.optionalKey(AudienceGroupStatusSchema),
          size: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isLessThanOrEqualToBigInt(40n),
            ).annotate({ jsonSchemaExamples: [20] }),
          ),
          createRoute: Schema.optionalKey(AudienceGroupCreateRouteSchema),
          includesOwnedAudienceGroups: Schema.String.check(
            Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          )
            .pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            )
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(false))),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
