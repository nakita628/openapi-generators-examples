import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import * as z from 'zod'
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
          content: { 'application/json': { schema: resolver(SafetyCaseResourceSchema) } },
        },
        '400': {
          description: 'The safety case ID is too long.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The safety case was not found or is not accessible to the caller.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
        '500': {
          description: 'The safety case lookup failed.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '503': {
          description: 'The safety case lookup is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator(
      'param',
      z.object({ id: z.string().max(128).meta({ description: 'Safety case ID' }) }),
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
          content: { 'application/json': { schema: resolver(SafetyAlertResourceSchema) } },
        },
        '400': {
          description: 'The safety alert ID is too long.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The safety alert was not found or is not accessible to the caller.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
        '503': {
          description: 'The safety alert lookup is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator(
      'param',
      z.object({ id: z.string().max(38).meta({ description: 'Project safety alert ID' }) }),
    ),
    (c) => {},
  )
