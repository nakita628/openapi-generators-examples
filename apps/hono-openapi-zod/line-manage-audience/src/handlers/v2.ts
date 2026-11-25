import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import * as z from 'zod'
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
    validator('json', AddAudienceToAudienceGroupRequestSchema),
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
              schema: resolver(CreateAudienceGroupResponseSchema),
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
    validator('json', CreateAudienceGroupRequestSchema),
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
      z
        .object({
          audienceGroupId: z.coerce
            .bigint()
            .pipe(z.int64())
            .meta({ description: 'The audience ID.' })
            .exactOptional(),
          uploadDescription: z
            .string()
            .meta({ description: 'The description to register with the job' })
            .exactOptional(),
          file: z
            .file()
            .meta({
              description:
                'A text file with one user ID or IFA entered per line. Specify text/plain as Content-Type. Max file number: 1\nMax number: 1,500,000\n',
            }),
        })
        .meta({ description: 'Request of the addUserIdsToAudience' }),
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
              schema: resolver(CreateAudienceGroupResponseSchema),
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
      z
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
            .stringbool()
            .meta({
              description:
                'To specify recipients by IFAs: set `true`.\nTo specify recipients by user IDs: set `false` or omit isIfaAudience property.\n',
            })
            .exactOptional(),
          uploadDescription: z
            .string()
            .meta({
              description: 'The description to register for the job (in `jobs[].description`).\n',
            })
            .exactOptional(),
          file: z
            .file()
            .meta({
              description:
                'A text file with one user ID or IFA entered per line. Specify text/plain as Content-Type. Max file number: 1\nMax number: 1,500,000\n',
            }),
        })
        .meta({ description: 'Request for createAudienceForUploadingUserIds' }),
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
              schema: resolver(CreateClickBasedAudienceGroupResponseSchema),
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
    validator('json', CreateClickBasedAudienceGroupRequestSchema),
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
              schema: resolver(CreateImpBasedAudienceGroupResponseSchema),
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
    validator('json', CreateImpBasedAudienceGroupRequestSchema),
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
    validator('param', z.object({ audienceGroupId: z.coerce.bigint().pipe(z.int64()) })),
    validator('json', UpdateAudienceGroupDescriptionRequestSchema),
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
              schema: resolver(GetAudienceDataResponseSchema),
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
              schema: resolver(ErrorResponseSchema),
              example: {
                message: 'audience group not found',
                details: [{ message: 'AUDIENCE_GROUP_NOT_FOUND' }],
              },
            },
          },
        },
      },
    }),
    validator('param', z.object({ audienceGroupId: z.coerce.bigint().pipe(z.int64()) })),
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
    validator('param', z.object({ audienceGroupId: z.coerce.bigint().pipe(z.int64()) })),
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
              schema: resolver(GetAudienceGroupsResponseSchema),
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
      z.object({
        page: z.coerce.bigint().pipe(z.int64().min(1n)),
        description: z.string().exactOptional(),
        status: AudienceGroupStatusSchema.exactOptional(),
        size: z.coerce
          .bigint()
          .pipe(z.int64().max(40n))
          .meta({ examples: [20] })
          .exactOptional(),
        includesExternalPublicGroups: z
          .stringbool()
          .meta({ examples: [true] })
          .exactOptional(),
        createRoute: AudienceGroupCreateRouteSchema.exactOptional(),
      }),
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
              schema: resolver(GetSharedAudienceDataResponseSchema),
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
              schema: resolver(ErrorResponseSchema),
              example: {
                message: 'audience group not found',
                details: [{ message: 'AUDIENCE_GROUP_NOT_FOUND' }],
              },
            },
          },
        },
      },
    }),
    validator('param', z.object({ audienceGroupId: z.coerce.bigint().pipe(z.int64()) })),
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
              schema: resolver(GetSharedAudienceGroupsResponseSchema),
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
      z.object({
        page: z.coerce.bigint().pipe(z.int64().min(1n)),
        description: z.string().exactOptional(),
        status: AudienceGroupStatusSchema.exactOptional(),
        size: z.coerce
          .bigint()
          .pipe(z.int64().max(40n))
          .meta({ examples: [20] })
          .exactOptional(),
        createRoute: AudienceGroupCreateRouteSchema.exactOptional(),
        includesOwnedAudienceGroups: z.stringbool().default(false).exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
