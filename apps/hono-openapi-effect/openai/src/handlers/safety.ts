import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Schema } from 'effect'
import {
  ErrorResponseSchema,
  SafetyCaseResourceSchema,
  SafetyAlertResourceSchema,
  TooManyRequestsResponse,
} from '../components'

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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(SafetyCaseResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The safety case ID is too long.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The safety case was not found or is not accessible to the caller.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
        '500': {
          description: 'The safety case lookup failed.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '503': {
          description: 'The safety case lookup is temporarily unavailable.',
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
        Schema.Struct({
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 128, {
              expected: 'a string of at most 128 characters',
            }),
          ).annotate({ description: 'Safety case ID' }),
        }),
      ),
    ),
    (c) => {},
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(SafetyAlertResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The safety alert ID is too long.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The safety alert was not found or is not accessible to the caller.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
        '503': {
          description: 'The safety alert lookup is temporarily unavailable.',
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
        Schema.Struct({
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 38, {
              expected: 'a string of at most 38 characters',
            }),
          ).annotate({ description: 'Project safety alert ID' }),
        }),
      ),
    ),
    (c) => {},
  )
