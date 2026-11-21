import { Elysia, t } from 'elysia'
import {
  ErrorSchema,
  ErrorDetailsSchema,
  ErrorResponseSchema,
  InnerErrorsSchema,
  RatelimitedResponseSchema,
  SnowflakeTypeSchema,
  StageInstanceResponseSchema,
  StageInstancesPrivacyLevelsSchema,
} from '../../components/schemas'
import { StageInstancesModel } from './model'

export const stageInstances = new Elysia()
  .model({
    Error: ErrorSchema,
    ErrorDetails: ErrorDetailsSchema,
    ErrorResponse: ErrorResponseSchema,
    InnerErrors: InnerErrorsSchema,
    RatelimitedResponse: RatelimitedResponseSchema,
    SnowflakeType: SnowflakeTypeSchema,
    StageInstanceResponse: StageInstanceResponseSchema,
    StageInstancesPrivacyLevels: StageInstancesPrivacyLevelsSchema,
  })
  .post('/stage-instances', ({ body }) => { throw new Error('Not implemented') }, {
    body: StageInstancesModel.create_stage_instanceBody,
    response: { 200: 'StageInstanceResponse', 429: 'RatelimitedResponse', '4XX': 'ErrorResponse' },
    detail: { tags: [], operationId: 'create_stage_instance', security: [{ BotToken: [] }] },
  })
  .get('/stage-instances/:channel_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: StageInstancesModel.get_stage_instanceParams,
    response: { 200: 'StageInstanceResponse', 429: 'RatelimitedResponse', '4XX': 'ErrorResponse' },
    detail: { tags: [], operationId: 'get_stage_instance', security: [{ BotToken: [] }] },
  })
  .delete('/stage-instances/:channel_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: StageInstancesModel.delete_stage_instanceParams,
    response: { 204: t.Void(), 429: 'RatelimitedResponse', '4XX': 'ErrorResponse' },
    detail: { tags: [], operationId: 'delete_stage_instance', security: [{ BotToken: [] }] },
  })
  .patch('/stage-instances/:channel_id', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: StageInstancesModel.update_stage_instanceParams,
    body: StageInstancesModel.update_stage_instanceBody,
    response: { 200: 'StageInstanceResponse', 429: 'RatelimitedResponse', '4XX': 'ErrorResponse' },
    detail: { tags: [], operationId: 'update_stage_instance', security: [{ BotToken: [] }] },
  })
