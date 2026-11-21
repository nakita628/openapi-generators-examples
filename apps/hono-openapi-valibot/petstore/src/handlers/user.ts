import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import * as v from 'valibot'
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
      v.partial(
        v.object({
          id: v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^-?\d+$/),
              v.transform((input) => BigInt(input)),
              v.minValue(-9223372036854775808n),
              v.maxValue(9223372036854775807n),
            ),
            v.metadata({ examples: [10] }),
          ),
          username: v.pipe(v.string(), v.metadata({ examples: ['theUser'] })),
          firstName: v.pipe(v.string(), v.metadata({ examples: ['John'] })),
          lastName: v.pipe(v.string(), v.metadata({ examples: ['James'] })),
          email: v.pipe(v.string(), v.metadata({ examples: ['john@email.com'] })),
          password: v.pipe(v.string(), v.metadata({ examples: ['12345'] })),
          phone: v.pipe(v.string(), v.metadata({ examples: ['12345'] })),
          userStatus: v.pipe(
            v.pipe(
              v.string(),
              v.transform(Number),
              v.number(),
              v.safeInteger(),
              v.minValue(-2147483648),
              v.maxValue(2147483647),
            ),
            v.description('User Status'),
            v.metadata({ examples: [1] }),
          ),
        }),
      ),
    ),
    (c) => {},
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
    validator('json', v.array(UserSchema)),
    (c) => {},
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
            'application/xml': { schema: resolver(v.string()) },
            'application/json': { schema: resolver(v.string()) },
          },
        },
        '400': { description: 'Invalid username/password supplied' },
        default: { description: 'Unexpected error' },
      },
    }),
    validator('query', v.partial(v.object({ username: v.string(), password: v.string() }))),
    (c) => {},
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
    (c) => {},
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
    validator('param', v.object({ username: v.string() })),
    (c) => {},
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
    validator('param', v.object({ username: v.string() })),
    validator('json', UserSchema),
    validator(
      'form',
      v.partial(
        v.object({
          id: v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^-?\d+$/),
              v.transform((input) => BigInt(input)),
              v.minValue(-9223372036854775808n),
              v.maxValue(9223372036854775807n),
            ),
            v.metadata({ examples: [10] }),
          ),
          username: v.pipe(v.string(), v.metadata({ examples: ['theUser'] })),
          firstName: v.pipe(v.string(), v.metadata({ examples: ['John'] })),
          lastName: v.pipe(v.string(), v.metadata({ examples: ['James'] })),
          email: v.pipe(v.string(), v.metadata({ examples: ['john@email.com'] })),
          password: v.pipe(v.string(), v.metadata({ examples: ['12345'] })),
          phone: v.pipe(v.string(), v.metadata({ examples: ['12345'] })),
          userStatus: v.pipe(
            v.pipe(
              v.string(),
              v.transform(Number),
              v.number(),
              v.safeInteger(),
              v.minValue(-2147483648),
              v.maxValue(2147483647),
            ),
            v.description('User Status'),
            v.metadata({ examples: [1] }),
          ),
        }),
      ),
    ),
    (c) => {},
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
    validator('param', v.object({ username: v.string() })),
    (c) => {},
  )
