import { Elysia, t } from 'elysia'
import {
  AddLiffAppRequestSchema,
  AddLiffAppResponseSchema,
  GetAllLiffAppsResponseSchema,
  LiffAppSchema,
  LiffBotPromptSchema,
  LiffFeaturesSchema,
  LiffScopeSchema,
  LiffViewSchema,
  UpdateLiffAppRequestSchema,
  UpdateLiffViewSchema,
} from '../../components/schemas'
import { LiffModel } from './model'

export const liff = new Elysia()
  .model({
    AddLiffAppRequest: AddLiffAppRequestSchema,
    AddLiffAppResponse: AddLiffAppResponseSchema,
    GetAllLiffAppsResponse: GetAllLiffAppsResponseSchema,
    LiffApp: LiffAppSchema,
    LiffBotPrompt: LiffBotPromptSchema,
    LiffFeatures: LiffFeaturesSchema,
    LiffScope: LiffScopeSchema,
    LiffView: LiffViewSchema,
    UpdateLiffAppRequest: UpdateLiffAppRequestSchema,
    UpdateLiffView: UpdateLiffViewSchema,
  })
  .get('/liff/v1/apps', () => { throw new Error('Not implemented') }, {
    response: { 200: 'GetAllLiffAppsResponse', 401: t.Void(), 404: t.Void() },
    detail: {
      tags: ['liff'],
      summary: 'Get all LIFF apps',
      description: 'Gets information on all the LIFF apps added to the channel.',
      operationId: 'getAllLIFFApps',
    },
  })
  .post('/liff/v1/apps', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'AddLiffAppRequest',
    response: { 200: 'AddLiffAppResponse', 400: t.Void(), 401: t.Void() },
    detail: {
      tags: ['liff'],
      summary: 'Create LIFF app',
      description: 'Adding the LIFF app to a channel',
      operationId: 'addLIFFApp',
    },
  })
  .put('/liff/v1/apps/:liffId', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: LiffModel.updateLIFFAppParams,
    body: 'UpdateLiffAppRequest',
    response: { 200: t.Void(), 400: t.Void(), 401: t.Void(), 404: t.Void() },
    detail: {
      tags: ['liff'],
      summary: 'Update LIFF app from a channel',
      description: 'Update LIFF app settings',
      operationId: 'updateLIFFApp',
    },
  })
  .delete('/liff/v1/apps/:liffId', ({ params }) => { throw new Error('Not implemented') }, {
    params: LiffModel.deleteLIFFAppParams,
    response: { 200: t.Void(), 401: t.Void(), 404: t.Void() },
    detail: {
      tags: ['liff'],
      summary: 'Delete LIFF app from a channel',
      description: 'Deletes a LIFF app from a channel.\n',
      operationId: 'deleteLIFFApp',
    },
  })
