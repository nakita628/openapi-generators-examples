import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Type, Codec } from 'typebox'
import { Compile } from 'typebox/compile'
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
            'application/json': { schema: resolver(Compile(UserSchema)) },
            'application/xml': { schema: resolver(Compile(UserSchema)) },
          },
        },
        default: { description: 'Unexpected error' },
      },
    }),
    validator('json', Compile(UserSchema)),
    validator(
      'form',
      Compile(
        Type.Object({
          id: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number.parseInt(value, 10))
              .Encode((value) => String(value)),
          ),
          username: Type.Optional(Type.String({ examples: ['theUser'] })),
          firstName: Type.Optional(Type.String({ examples: ['John'] })),
          lastName: Type.Optional(Type.String({ examples: ['James'] })),
          email: Type.Optional(Type.String({ examples: ['john@email.com'] })),
          password: Type.Optional(Type.String({ examples: ['12345'] })),
          phone: Type.Optional(Type.String({ examples: ['12345'] })),
          userStatus: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number.parseInt(value, 10))
              .Encode((value) => String(value)),
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
            'application/json': { schema: resolver(Compile(UserSchema)) },
            'application/xml': { schema: resolver(Compile(UserSchema)) },
          },
        },
        default: { description: 'Unexpected error' },
      },
    }),
    validator('json', Compile(Type.Array(UserSchema))),
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
            'application/xml': { schema: resolver(Compile(Type.String())) },
            'application/json': { schema: resolver(Compile(Type.String())) },
          },
        },
        '400': { description: 'Invalid username/password supplied' },
        default: { description: 'Unexpected error' },
      },
    }),
    validator(
      'query',
      Compile(
        Type.Object({
          username: Type.Optional(Type.String()),
          password: Type.Optional(Type.String()),
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
            'application/json': { schema: resolver(Compile(UserSchema)) },
            'application/xml': { schema: resolver(Compile(UserSchema)) },
          },
        },
        '400': { description: 'Invalid username supplied' },
        '404': { description: 'User not found' },
        default: { description: 'Unexpected error' },
      },
    }),
    validator('param', Compile(Type.Object({ username: Type.String() }))),
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
    validator('param', Compile(Type.Object({ username: Type.String() }))),
    validator('json', Compile(UserSchema)),
    validator(
      'form',
      Compile(
        Type.Object({
          id: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number.parseInt(value, 10))
              .Encode((value) => String(value)),
          ),
          username: Type.Optional(Type.String({ examples: ['theUser'] })),
          firstName: Type.Optional(Type.String({ examples: ['John'] })),
          lastName: Type.Optional(Type.String({ examples: ['James'] })),
          email: Type.Optional(Type.String({ examples: ['john@email.com'] })),
          password: Type.Optional(Type.String({ examples: ['12345'] })),
          phone: Type.Optional(Type.String({ examples: ['12345'] })),
          userStatus: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number.parseInt(value, 10))
              .Encode((value) => String(value)),
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
    validator('param', Compile(Type.Object({ username: Type.String() }))),
    (c) => { throw new Error('Not implemented') },
  )
