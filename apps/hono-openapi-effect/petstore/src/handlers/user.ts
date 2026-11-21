import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Schema } from 'effect'
import { UserSchema } from '../components'

export const userHandler = new Hono()
  .post(
    '/user',
    describeRoute({
      tags: ['user'],
      summary: 'Create user.',
      description: 'This can only be done by the logged in user.',
      operationId: 'createUser',
      responses: {
        '200': {
          description: 'successful operation',
          content: {
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(UserSchema)) },
            'application/xml': { schema: resolver(Schema.toStandardSchemaV1(UserSchema)) },
          },
        },
        default: { description: 'Unexpected error' },
      },
    }),
    validator('json', Schema.toStandardSchemaV1(UserSchema)),
    validator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.optional(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
            ).annotate({ jsonSchemaExamples: [10] }),
          ),
          username: Schema.optional(Schema.String.annotate({ jsonSchemaExamples: ['theUser'] })),
          firstName: Schema.optional(Schema.String.annotate({ jsonSchemaExamples: ['John'] })),
          lastName: Schema.optional(Schema.String.annotate({ jsonSchemaExamples: ['James'] })),
          email: Schema.optional(
            Schema.String.annotate({ jsonSchemaExamples: ['john@email.com'] }),
          ),
          password: Schema.optional(Schema.String.annotate({ jsonSchemaExamples: ['12345'] })),
          phone: Schema.optional(Schema.String.annotate({ jsonSchemaExamples: ['12345'] })),
          userStatus: Schema.optional(
            Schema.FiniteFromString.check(Schema.isInt32()).annotate({
              description: 'User Status',
              jsonSchemaExamples: [1],
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/user/createWithList',
    describeRoute({
      tags: ['user'],
      summary: 'Creates list of users with given input array.',
      description: 'Creates list of users with given input array.',
      operationId: 'createUsersWithListInput',
      responses: {
        '200': {
          description: 'Successful operation',
          content: {
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(UserSchema)) },
            'application/xml': { schema: resolver(Schema.toStandardSchemaV1(UserSchema)) },
          },
        },
        default: { description: 'Unexpected error' },
      },
    }),
    validator('json', Schema.toStandardSchemaV1(Schema.Array(UserSchema))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/user/login',
    describeRoute({
      tags: ['user'],
      summary: 'Logs user into the system.',
      description: 'Log into the system.',
      operationId: 'loginUser',
      responses: {
        '200': {
          description: 'successful operation',
          headers: {
            'X-Rate-Limit': {
              description: 'calls per hour allowed by the user',
              schema: { type: 'integer', format: 'int32' },
            },
            'X-Expires-After': {
              description: 'date in UTC when token expires',
              schema: { type: 'string', format: 'date-time' },
            },
          },
          content: {
            'application/xml': { schema: resolver(Schema.toStandardSchemaV1(Schema.String)) },
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(Schema.String)) },
          },
        },
        '400': { description: 'Invalid username/password supplied' },
        default: { description: 'Unexpected error' },
      },
    }),
    validator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          username: Schema.optional(Schema.String),
          password: Schema.optional(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/user/logout',
    describeRoute({
      tags: ['user'],
      summary: 'Logs out current logged in user session.',
      description: 'Log user out of the system.',
      operationId: 'logoutUser',
      responses: {
        '200': { description: 'successful operation' },
        default: { description: 'Unexpected error' },
      },
    }),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/user/:username',
    describeRoute({
      tags: ['user'],
      summary: 'Get user by user name.',
      description: 'Get user detail based on username.',
      operationId: 'getUserByName',
      responses: {
        '200': {
          description: 'successful operation',
          content: {
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(UserSchema)) },
            'application/xml': { schema: resolver(Schema.toStandardSchemaV1(UserSchema)) },
          },
        },
        '400': { description: 'Invalid username supplied' },
        '404': { description: 'User not found' },
        default: { description: 'Unexpected error' },
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ username: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/user/:username',
    describeRoute({
      tags: ['user'],
      summary: 'Update user resource.',
      description: 'This can only be done by the logged in user.',
      operationId: 'updateUser',
      responses: {
        '200': { description: 'successful operation' },
        '400': { description: 'bad request' },
        '404': { description: 'user not found' },
        default: { description: 'Unexpected error' },
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ username: Schema.String }))),
    validator('json', Schema.toStandardSchemaV1(UserSchema)),
    validator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.optional(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
            ).annotate({ jsonSchemaExamples: [10] }),
          ),
          username: Schema.optional(Schema.String.annotate({ jsonSchemaExamples: ['theUser'] })),
          firstName: Schema.optional(Schema.String.annotate({ jsonSchemaExamples: ['John'] })),
          lastName: Schema.optional(Schema.String.annotate({ jsonSchemaExamples: ['James'] })),
          email: Schema.optional(
            Schema.String.annotate({ jsonSchemaExamples: ['john@email.com'] }),
          ),
          password: Schema.optional(Schema.String.annotate({ jsonSchemaExamples: ['12345'] })),
          phone: Schema.optional(Schema.String.annotate({ jsonSchemaExamples: ['12345'] })),
          userStatus: Schema.optional(
            Schema.FiniteFromString.check(Schema.isInt32()).annotate({
              description: 'User Status',
              jsonSchemaExamples: [1],
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/user/:username',
    describeRoute({
      tags: ['user'],
      summary: 'Delete user resource.',
      description: 'This can only be done by the logged in user.',
      operationId: 'deleteUser',
      responses: {
        '200': { description: 'User deleted' },
        '400': { description: 'Invalid username supplied' },
        '404': { description: 'User not found' },
        default: { description: 'Unexpected error' },
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ username: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
