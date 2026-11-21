import { Elysia } from 'elysia'
import {
  ErrorSchema,
  ErrorResponseSchema,
  MisalignmentErrorDetailsResourceSchema,
  SafetyAlertErrorTypeSchema,
  SafetyAlertResourceSchema,
  SafetyCaseNoticeSchema,
  SafetyCaseNoticeTypeSchema,
  SafetyCaseResourceSchema,
  MisalignmentErrorTypeSchema,
  MisalignmentSteerSchema,
} from '../../components/schemas'
import { SafetyModel } from './model'

export const safety = new Elysia()
  .model({
    Error: ErrorSchema,
    ErrorResponse: ErrorResponseSchema,
    MisalignmentErrorDetailsResource: MisalignmentErrorDetailsResourceSchema,
    SafetyAlertErrorType: SafetyAlertErrorTypeSchema,
    SafetyAlertResource: SafetyAlertResourceSchema,
    SafetyCaseNotice: SafetyCaseNoticeSchema,
    SafetyCaseNoticeType: SafetyCaseNoticeTypeSchema,
    SafetyCaseResource: SafetyCaseResourceSchema,
    MisalignmentErrorType: MisalignmentErrorTypeSchema,
    MisalignmentSteer: MisalignmentSteerSchema,
  })
  .get('/safety/cases/:id', ({ params }) => { throw new Error('Not implemented') }, {
    params: SafetyModel.GetsafetycaseParams,
    response: {
      200: 'SafetyCaseResource',
      400: 'ErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
      500: 'ErrorResponse',
      503: 'ErrorResponse',
    },
    detail: {
      tags: [],
      summary: 'Get safety case',
      description: 'Get a safety case by ID.',
      operationId: 'Getsafetycase',
    },
  })
  .get('/safety/alerts/:id', ({ params }) => { throw new Error('Not implemented') }, {
    params: SafetyModel.GetprojectsafetyalertParams,
    response: {
      200: 'SafetyAlertResource',
      400: 'ErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
      503: 'ErrorResponse',
    },
    detail: {
      tags: [],
      summary: 'Get project safety alert',
      description: 'Get a safety alert belonging to the authenticated API project.',
      operationId: 'Getprojectsafetyalert',
    },
  })
