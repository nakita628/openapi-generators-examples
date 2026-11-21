import { Elysia, t } from 'elysia'
import { UserSchema } from '../../components/schemas'
import { UserModel } from './model'

export const user = new Elysia()
  .model({ User: UserSchema })
  .post('/user', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'User',
    response: { 200: 'User', default: t.Void() },
    detail: {
      tags: ['user'],
      summary: 'Create user.',
      description: 'This can only be done by the logged in user.',
      operationId: 'createUser',
    },
  })
  .post('/user/createWithList', ({ body }) => { throw new Error('Not implemented') }, {
    body: UserModel.createUsersWithListInputBody,
    response: { 200: 'User', default: t.Void() },
    detail: {
      tags: ['user'],
      summary: 'Creates list of users with given input array.',
      description: 'Creates list of users with given input array.',
      operationId: 'createUsersWithListInput',
    },
  })
  .get('/user/login', ({ query }) => { throw new Error('Not implemented') }, {
    query: UserModel.loginUserQuery,
    response: { 200: UserModel.loginUserResponse200, 400: t.Void(), default: t.Void() },
    detail: {
      tags: ['user'],
      summary: 'Logs user into the system.',
      description: 'Log into the system.',
      operationId: 'loginUser',
    },
  })
  .get('/user/logout', () => { throw new Error('Not implemented') }, {
    response: { 200: t.Void(), default: t.Void() },
    detail: {
      tags: ['user'],
      summary: 'Logs out current logged in user session.',
      description: 'Log user out of the system.',
      operationId: 'logoutUser',
    },
  })
  .get('/user/:username', ({ params }) => { throw new Error('Not implemented') }, {
    params: UserModel.getUserByNameParams,
    response: { 200: 'User', 400: t.Void(), 404: t.Void(), default: t.Void() },
    detail: {
      tags: ['user'],
      summary: 'Get user by user name.',
      description: 'Get user detail based on username.',
      operationId: 'getUserByName',
    },
  })
  .put('/user/:username', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: UserModel.updateUserParams,
    body: 'User',
    response: { 200: t.Void(), 400: t.Void(), 404: t.Void(), default: t.Void() },
    detail: {
      tags: ['user'],
      summary: 'Update user resource.',
      description: 'This can only be done by the logged in user.',
      operationId: 'updateUser',
    },
  })
  .delete('/user/:username', ({ params }) => { throw new Error('Not implemented') }, {
    params: UserModel.deleteUserParams,
    response: { 200: t.Void(), 400: t.Void(), 404: t.Void(), default: t.Void() },
    detail: {
      tags: ['user'],
      summary: 'Delete user resource.',
      description: 'This can only be done by the logged in user.',
      operationId: 'deleteUser',
    },
  })
