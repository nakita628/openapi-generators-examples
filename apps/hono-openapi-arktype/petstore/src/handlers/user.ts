import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { type } from 'arktype'
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
            'application/json': { schema: resolver(UserSchema) },
            'application/xml': { schema: resolver(UserSchema) },
          },
        },
        default: { description: 'Unexpected error' },
      },
    }),
    validator('json', UserSchema),
    validator(
      'form',
      type({
        'id?': type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          ),
        'username?': 'string',
        'firstName?': 'string',
        'lastName?': 'string',
        'email?': 'string',
        'password?': 'string',
        'phone?': 'string',
        'userStatus?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= -2147483648 & number.integer <= 2147483647')
          .describe('User Status'),
      }),
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
            'application/json': { schema: resolver(UserSchema) },
            'application/xml': { schema: resolver(UserSchema) },
          },
        },
        default: { description: 'Unexpected error' },
      },
    }),
    validator('json', type(UserSchema).array()),
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
            'application/xml': { schema: resolver(type('string')) },
            'application/json': { schema: resolver(type('string')) },
          },
        },
        '400': { description: 'Invalid username/password supplied' },
        default: { description: 'Unexpected error' },
      },
    }),
    validator('query', type({ 'username?': 'string', 'password?': 'string' })),
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
            'application/json': { schema: resolver(UserSchema) },
            'application/xml': { schema: resolver(UserSchema) },
          },
        },
        '400': { description: 'Invalid username supplied' },
        '404': { description: 'User not found' },
        default: { description: 'Unexpected error' },
      },
    }),
    validator('param', type({ username: 'string' })),
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
    validator('param', type({ username: 'string' })),
    validator('json', UserSchema),
    validator(
      'form',
      type({
        'id?': type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          ),
        'username?': 'string',
        'firstName?': 'string',
        'lastName?': 'string',
        'email?': 'string',
        'password?': 'string',
        'phone?': 'string',
        'userStatus?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= -2147483648 & number.integer <= 2147483647')
          .describe('User Status'),
      }),
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
    validator('param', type({ username: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
