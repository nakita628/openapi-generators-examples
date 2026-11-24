import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Type, type StaticDecode, type StaticEncode, type TSchema } from 'typebox'
import { Compile } from 'typebox/compile'
import {
  ErrorResponseSchema,
  SafetyCaseResourceSchema,
  SafetyAlertResourceSchema,
  TooManyRequestsResponse,
} from '../components'

const toStandardSchemaV1 = <T extends TSchema>(schema: T) => {
  const validator = Compile(schema)
  return Object.assign(validator, {
    '~standard': {
      version: 1 as const,
      vendor: 'typebox',
      validate: (value: unknown) =>
        validator.Check(value)
          ? { value: validator.Decode(value) }
          : {
              issues: validator.Errors(value).map((error) => ({
                message: error.message,
                path: error.instancePath
                  .split('/')
                  .slice(1)
                  .map((key) => key.replaceAll('~1', '/').replaceAll('~0', '~')),
              })),
            },
      types: undefined as
        | { readonly input: StaticEncode<T>; readonly output: StaticDecode<T> }
        | undefined,
    },
  })
}

export const safetyHandler = new Hono()
  .get(
    '/safety/cases/:id',
    describeRoute({
      summary: 'Get safety case',
      description: 'Get a safety case by ID.',
      operationId: 'Getsafetycase',
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(SafetyCaseResourceSchema)) },
          },
        },
        '400': {
          description: 'The safety case ID is too long.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '404': {
          description: 'The safety case was not found or is not accessible to the caller.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
        '500': {
          description: 'The safety case lookup failed.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '503': {
          description: 'The safety case lookup is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ id: Type.String({ maxLength: 128, description: 'Safety case ID' }) }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/safety/alerts/:id',
    describeRoute({
      summary: 'Get project safety alert',
      description: 'Get a safety alert belonging to the authenticated API project.',
      operationId: 'Getprojectsafetyalert',
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(SafetyAlertResourceSchema)) },
          },
        },
        '400': {
          description: 'The safety alert ID is too long.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '404': {
          description: 'The safety alert was not found or is not accessible to the caller.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
        '503': {
          description: 'The safety alert lookup is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ id: Type.String({ maxLength: 38, description: 'Project safety alert ID' }) }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
