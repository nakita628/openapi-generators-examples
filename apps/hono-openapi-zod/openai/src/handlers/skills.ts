import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import * as z from 'zod'
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
          content: { 'application/json': { schema: resolver(SkillListResourceSchema) } },
        },
        '404': {
          description: 'The skill specified by `after` was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'query',
      z.object({
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0).max(100),
          )
          .exactOptional(),
        order: OrderEnumSchema.exactOptional(),
        after: z
          .string()
          .meta({
            description: 'Identifier for the last item from the previous pagination request',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
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
          content: { 'application/json': { schema: resolver(SkillResourceSchema) } },
        },
        '400': {
          description: 'The uploaded skill files or archive are invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
        '500': {
          description: 'The skill could not be saved.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator('json', CreateSkillBodySchema),
    validator(
      'form',
      z
        .object({
          files: z.union([
            z
              .preprocess(
                (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                z.array(z.file()).max(500),
              )
              .meta({
                description: 'Skill files to upload (directory upload) or a single zip file.',
              }),
            z.file().meta({ description: 'Skill zip file to upload.' }),
          ]),
        })
        .meta({
          description:
            'Uploads a skill either as a directory (multipart `files[]`) or as a single zip file.',
        }),
    ),
    (c) => { throw new Error('Not implemented') },
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
          content: { 'application/json': { schema: resolver(SkillResourceSchema) } },
        },
        '404': {
          description: 'The skill was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', z.object({ skill_id: z.string().meta({ examples: ['skill_123'] }) })),
    (c) => { throw new Error('Not implemented') },
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
          content: { 'application/json': { schema: resolver(SkillResourceSchema) } },
        },
        '400': {
          description: 'The requested version is invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The skill or requested skill version was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', z.object({ skill_id: z.string().meta({ examples: ['skill_123'] }) })),
    validator('json', SetDefaultSkillVersionBodySchema),
    (c) => { throw new Error('Not implemented') },
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
          content: { 'application/json': { schema: resolver(DeletedSkillResourceSchema) } },
        },
        '404': {
          description: 'The skill was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', z.object({ skill_id: z.string().meta({ examples: ['skill_123'] }) })),
    (c) => { throw new Error('Not implemented') },
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
            'application/zip': { schema: resolver(z.file()) },
            'application/json': { schema: resolver(z.string()) },
          },
        },
        '404': {
          description: 'The skill was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', z.object({ skill_id: z.string().meta({ examples: ['skill_123'] }) })),
    (c) => { throw new Error('Not implemented') },
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
          content: { 'application/json': { schema: resolver(SkillVersionListResourceSchema) } },
        },
        '400': {
          description: 'The version specified by `after` does not belong to this skill.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The skill or the version specified by `after` was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', z.object({ skill_id: z.string().meta({ examples: ['skill_123'] }) })),
    validator(
      'query',
      z.object({
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0).max(100),
          )
          .exactOptional(),
        order: OrderEnumSchema.exactOptional(),
        after: z
          .string()
          .meta({ examples: ['skillver_123'] })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
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
          content: { 'application/json': { schema: resolver(SkillVersionResourceSchema) } },
        },
        '400': {
          description: 'The uploaded skill files or archive are invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The skill was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
        '500': {
          description: 'The skill version could not be saved.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator('param', z.object({ skill_id: z.string().meta({ examples: ['skill_123'] }) })),
    validator('json', CreateSkillVersionBodySchema),
    validator(
      'form',
      z
        .object({
          files: z.union([
            z
              .preprocess(
                (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                z.array(z.file()).max(500),
              )
              .meta({
                description: 'Skill files to upload (directory upload) or a single zip file.',
              }),
            z.file().meta({ description: 'Skill zip file to upload.' }),
          ]),
          default: z
            .stringbool()
            .meta({ description: 'Whether to set this version as the default.' })
            .exactOptional(),
        })
        .meta({ description: 'Uploads a new immutable version of a skill.' }),
    ),
    (c) => { throw new Error('Not implemented') },
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
          content: { 'application/json': { schema: resolver(SkillVersionResourceSchema) } },
        },
        '400': {
          description: 'The requested version is invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The skill or requested skill version was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      z.object({
        skill_id: z.string().meta({ examples: ['skill_123'] }),
        version: z.string().meta({ description: 'The version number to retrieve.' }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
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
          content: { 'application/json': { schema: resolver(DeletedSkillVersionResourceSchema) } },
        },
        '400': {
          description:
            'The requested version is invalid, or it is the default version and other versions remain.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The skill or requested skill version was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      z.object({
        skill_id: z.string().meta({ examples: ['skill_123'] }),
        version: z.string().meta({ description: 'The skill version number.' }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
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
            'application/zip': { schema: resolver(z.file()) },
            'application/json': { schema: resolver(z.string()) },
          },
        },
        '400': {
          description: 'The requested version is invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The skill or requested skill version was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      z.object({
        skill_id: z.string().meta({ examples: ['skill_123'] }),
        version: z.string().meta({ description: 'The skill version number.' }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
