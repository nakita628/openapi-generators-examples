import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Schema, SchemaTransformation } from 'effect'
import {
  ErrorResponseSchema,
  OrderEnumSchema,
  SkillResourceSchema,
  SkillListResourceSchema,
  CreateSkillBodySchema,
  SetDefaultSkillVersionBodySchema,
  DeletedSkillResourceSchema,
  SkillVersionResourceSchema,
  SkillVersionListResourceSchema,
  CreateSkillVersionBodySchema,
  DeletedSkillVersionResourceSchema,
  TooManyRequestsResponse,
} from '../components'

export const skillsHandler = new Hono()
  .get(
    '/skills',
    describeRoute({
      tags: ['Skills'],
      summary: 'List Skills',
      description: 'List all skills for the current project.',
      operationId: 'ListSkills',
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(SkillListResourceSchema)),
            },
          },
        },
        '404': {
          description: 'The skill specified by `after` was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(100),
            ),
          ),
          order: Schema.optional(OrderEnumSchema),
          after: Schema.optional(
            Schema.String.annotate({
              description: 'Identifier for the last item from the previous pagination request',
            }),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/skills',
    describeRoute({
      tags: ['Skills'],
      summary: 'Create Skill',
      description: 'Create a new skill.',
      operationId: 'CreateSkill',
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(SkillResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The uploaded skill files or archive are invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
        '500': {
          description: 'The skill could not be saved.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator('json', Schema.toStandardSchemaV1(CreateSkillBodySchema)),
    validator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          files: Schema.Union([
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.instanceOf(File)).check(Schema.isMaxLength(500))),
            ).annotate({
              description: 'Skill files to upload (directory upload) or a single zip file.',
            }),
            Schema.instanceOf(File).annotate({ description: 'Skill zip file to upload.' }),
          ]),
        }).annotate({
          description:
            'Uploads a skill either as a directory (multipart `files[]`) or as a single zip file.',
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/skills/:skill_id',
    describeRoute({
      tags: ['Skills'],
      summary: 'Get Skill',
      description: 'Get a skill by its ID.',
      operationId: 'GetSkill',
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(SkillResourceSchema)),
            },
          },
        },
        '404': {
          description: 'The skill was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ skill_id: Schema.String.annotate({ jsonSchemaExamples: ['skill_123'] }) }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/skills/:skill_id',
    describeRoute({
      tags: ['Skills'],
      summary: 'Update Skill Default Version',
      description: 'Update the default version pointer for a skill.',
      operationId: 'UpdateSkillDefaultVersion',
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(SkillResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The requested version is invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The skill or requested skill version was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ skill_id: Schema.String.annotate({ jsonSchemaExamples: ['skill_123'] }) }),
      ),
    ),
    validator('json', Schema.toStandardSchemaV1(SetDefaultSkillVersionBodySchema)),
    (c) => {},
  )
  .delete(
    '/skills/:skill_id',
    describeRoute({
      tags: ['Skills'],
      summary: 'Delete Skill',
      description: 'Delete a skill by its ID.',
      operationId: 'DeleteSkill',
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(DeletedSkillResourceSchema)),
            },
          },
        },
        '404': {
          description: 'The skill was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ skill_id: Schema.String.annotate({ jsonSchemaExamples: ['skill_123'] }) }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/skills/:skill_id/content',
    describeRoute({
      tags: ['Skills'],
      summary: 'Get Skill Content',
      description: 'Download a skill zip bundle by its ID.',
      operationId: 'GetSkillContent',
      responses: {
        '200': {
          description: 'The skill zip bundle.',
          content: {
            'application/zip': {
              schema: resolver(Schema.toStandardSchemaV1(Schema.instanceOf(File))),
            },
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(Schema.String)) },
          },
        },
        '404': {
          description: 'The skill was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ skill_id: Schema.String.annotate({ jsonSchemaExamples: ['skill_123'] }) }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/skills/:skill_id/versions',
    describeRoute({
      tags: ['Skills'],
      summary: 'List Skill Versions',
      description: 'List skill versions for a skill.',
      operationId: 'ListSkillVersions',
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(SkillVersionListResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The version specified by `after` does not belong to this skill.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The skill or the version specified by `after` was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ skill_id: Schema.String.annotate({ jsonSchemaExamples: ['skill_123'] }) }),
      ),
    ),
    validator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(100),
            ),
          ),
          order: Schema.optional(OrderEnumSchema),
          after: Schema.optional(Schema.String.annotate({ jsonSchemaExamples: ['skillver_123'] })),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/skills/:skill_id/versions',
    describeRoute({
      tags: ['Skills'],
      summary: 'Create Skill Version',
      description: 'Create a new immutable skill version.',
      operationId: 'CreateSkillVersion',
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(SkillVersionResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The uploaded skill files or archive are invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The skill was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
        '500': {
          description: 'The skill version could not be saved.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ skill_id: Schema.String.annotate({ jsonSchemaExamples: ['skill_123'] }) }),
      ),
    ),
    validator('json', Schema.toStandardSchemaV1(CreateSkillVersionBodySchema)),
    validator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          files: Schema.Union([
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.instanceOf(File)).check(Schema.isMaxLength(500))),
            ).annotate({
              description: 'Skill files to upload (directory upload) or a single zip file.',
            }),
            Schema.instanceOf(File).annotate({ description: 'Skill zip file to upload.' }),
          ]),
          default: Schema.optional(
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
              .annotate({ description: 'Whether to set this version as the default.' }),
          ),
        }).annotate({ description: 'Uploads a new immutable version of a skill.' }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/skills/:skill_id/versions/:version',
    describeRoute({
      tags: ['Skills'],
      summary: 'Get Skill Version',
      description: 'Get a specific skill version.',
      operationId: 'GetSkillVersion',
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(SkillVersionResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The requested version is invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The skill or requested skill version was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          skill_id: Schema.String.annotate({ jsonSchemaExamples: ['skill_123'] }),
          version: Schema.String.annotate({ description: 'The version number to retrieve.' }),
        }),
      ),
    ),
    (c) => {},
  )
  .delete(
    '/skills/:skill_id/versions/:version',
    describeRoute({
      tags: ['Skills'],
      summary: 'Delete Skill Version',
      description: 'Delete a skill version.',
      operationId: 'DeleteSkillVersion',
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(DeletedSkillVersionResourceSchema)),
            },
          },
        },
        '400': {
          description:
            'The requested version is invalid, or it is the default version and other versions remain.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The skill or requested skill version was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          skill_id: Schema.String.annotate({ jsonSchemaExamples: ['skill_123'] }),
          version: Schema.String.annotate({ description: 'The skill version number.' }),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/skills/:skill_id/versions/:version/content',
    describeRoute({
      tags: ['Skills'],
      summary: 'Get Skill Version Content',
      description: 'Download a skill version zip bundle.',
      operationId: 'GetSkillVersionContent',
      responses: {
        '200': {
          description: 'The skill zip bundle.',
          content: {
            'application/zip': {
              schema: resolver(Schema.toStandardSchemaV1(Schema.instanceOf(File))),
            },
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(Schema.String)) },
          },
        },
        '400': {
          description: 'The requested version is invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The skill or requested skill version was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          skill_id: Schema.String.annotate({ jsonSchemaExamples: ['skill_123'] }),
          version: Schema.String.annotate({ description: 'The skill version number.' }),
        }),
      ),
    ),
    (c) => {},
  )
