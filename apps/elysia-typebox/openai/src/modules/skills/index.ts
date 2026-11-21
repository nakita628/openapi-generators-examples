import { Elysia } from 'elysia'
import {
  CreateSkillBodySchema,
  CreateSkillVersionBodySchema,
  DeletedSkillResourceSchema,
  DeletedSkillVersionResourceSchema,
  ErrorSchema,
  ErrorResponseSchema,
  MisalignmentErrorDetailsResourceSchema,
  OrderEnumSchema,
  SetDefaultSkillVersionBodySchema,
  SkillListResourceSchema,
  SkillResourceSchema,
  SkillVersionListResourceSchema,
  SkillVersionResourceSchema,
  MisalignmentErrorTypeSchema,
  MisalignmentSteerSchema,
} from '../../components/schemas'
import { SkillsModel } from './model'

export const skills = new Elysia()
  .model({
    CreateSkillBody: CreateSkillBodySchema,
    CreateSkillVersionBody: CreateSkillVersionBodySchema,
    DeletedSkillResource: DeletedSkillResourceSchema,
    DeletedSkillVersionResource: DeletedSkillVersionResourceSchema,
    Error: ErrorSchema,
    ErrorResponse: ErrorResponseSchema,
    MisalignmentErrorDetailsResource: MisalignmentErrorDetailsResourceSchema,
    OrderEnum: OrderEnumSchema,
    SetDefaultSkillVersionBody: SetDefaultSkillVersionBodySchema,
    SkillListResource: SkillListResourceSchema,
    SkillResource: SkillResourceSchema,
    SkillVersionListResource: SkillVersionListResourceSchema,
    SkillVersionResource: SkillVersionResourceSchema,
    MisalignmentErrorType: MisalignmentErrorTypeSchema,
    MisalignmentSteer: MisalignmentSteerSchema,
  })
  .get('/skills', ({ query }) => {}, {
    query: SkillsModel.ListSkillsQuery,
    response: { 200: 'SkillListResource', 404: 'ErrorResponse', 429: 'ErrorResponse' },
    detail: {
      tags: ['Skills'],
      summary: 'List Skills',
      description: 'List all skills for the current project.',
      operationId: 'ListSkills',
    },
  })
  .post('/skills', ({ body }) => {}, {
    body: 'CreateSkillBody',
    response: {
      200: 'SkillResource',
      400: 'ErrorResponse',
      429: 'ErrorResponse',
      500: 'ErrorResponse',
    },
    detail: {
      tags: ['Skills'],
      summary: 'Create Skill',
      description: 'Create a new skill.',
      operationId: 'CreateSkill',
    },
  })
  .get('/skills/:skill_id', ({ params }) => {}, {
    params: SkillsModel.GetSkillParams,
    response: { 200: 'SkillResource', 404: 'ErrorResponse', 429: 'ErrorResponse' },
    detail: {
      tags: ['Skills'],
      summary: 'Get Skill',
      description: 'Get a skill by its ID.',
      operationId: 'GetSkill',
    },
  })
  .post('/skills/:skill_id', ({ params, body }) => {}, {
    params: SkillsModel.UpdateSkillDefaultVersionParams,
    body: 'SetDefaultSkillVersionBody',
    response: {
      200: 'SkillResource',
      400: 'ErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Skills'],
      summary: 'Update Skill Default Version',
      description: 'Update the default version pointer for a skill.',
      operationId: 'UpdateSkillDefaultVersion',
    },
  })
  .delete('/skills/:skill_id', ({ params }) => {}, {
    params: SkillsModel.DeleteSkillParams,
    response: { 200: 'DeletedSkillResource', 404: 'ErrorResponse', 429: 'ErrorResponse' },
    detail: {
      tags: ['Skills'],
      summary: 'Delete Skill',
      description: 'Delete a skill by its ID.',
      operationId: 'DeleteSkill',
    },
  })
  .get('/skills/:skill_id/content', ({ params }) => {}, {
    params: SkillsModel.GetSkillContentParams,
    response: {
      200: SkillsModel.GetSkillContentResponse200,
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Skills'],
      summary: 'Get Skill Content',
      description: 'Download a skill zip bundle by its ID.',
      operationId: 'GetSkillContent',
    },
  })
  .get('/skills/:skill_id/versions', ({ params, query }) => {}, {
    params: SkillsModel.ListSkillVersionsParams,
    query: SkillsModel.ListSkillVersionsQuery,
    response: {
      200: 'SkillVersionListResource',
      400: 'ErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Skills'],
      summary: 'List Skill Versions',
      description: 'List skill versions for a skill.',
      operationId: 'ListSkillVersions',
    },
  })
  .post('/skills/:skill_id/versions', ({ params, body }) => {}, {
    params: SkillsModel.CreateSkillVersionParams,
    body: 'CreateSkillVersionBody',
    response: {
      200: 'SkillVersionResource',
      400: 'ErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
      500: 'ErrorResponse',
    },
    detail: {
      tags: ['Skills'],
      summary: 'Create Skill Version',
      description: 'Create a new immutable skill version.',
      operationId: 'CreateSkillVersion',
    },
  })
  .get('/skills/:skill_id/versions/:version', ({ params }) => {}, {
    params: SkillsModel.GetSkillVersionParams,
    response: {
      200: 'SkillVersionResource',
      400: 'ErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Skills'],
      summary: 'Get Skill Version',
      description: 'Get a specific skill version.',
      operationId: 'GetSkillVersion',
    },
  })
  .delete('/skills/:skill_id/versions/:version', ({ params }) => {}, {
    params: SkillsModel.DeleteSkillVersionParams,
    response: {
      200: 'DeletedSkillVersionResource',
      400: 'ErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Skills'],
      summary: 'Delete Skill Version',
      description: 'Delete a skill version.',
      operationId: 'DeleteSkillVersion',
    },
  })
  .get('/skills/:skill_id/versions/:version/content', ({ params }) => {}, {
    params: SkillsModel.GetSkillVersionContentParams,
    response: {
      200: SkillsModel.GetSkillVersionContentResponse200,
      400: 'ErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Skills'],
      summary: 'Get Skill Version Content',
      description: 'Download a skill version zip bundle.',
      operationId: 'GetSkillVersionContent',
    },
  })
