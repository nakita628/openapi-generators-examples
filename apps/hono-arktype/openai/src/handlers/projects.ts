import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'
import {
  PublicAssignOrganizationGroupRoleBodySchema,
  PublicCreateOrganizationRoleBodySchema,
  PublicUpdateOrganizationRoleBodySchema,
} from '../components'

export const projectsHandler = new Hono()
  .get(
    '/projects/:project_id/groups/:group_id/roles',
    sValidator('param', type({ project_id: 'string', group_id: 'string' })),
    sValidator(
      'query',
      type({
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0 & number.integer <= 1000'),
        'after?': 'string',
        'order?': "'asc' | 'desc'",
      }),
    ),
    (c) => {},
  )
  .post(
    '/projects/:project_id/groups/:group_id/roles',
    sValidator('param', type({ project_id: 'string', group_id: 'string' })),
    sValidator('json', PublicAssignOrganizationGroupRoleBodySchema),
    (c) => {},
  )
  .get(
    '/projects/:project_id/groups/:group_id/roles/:role_id',
    sValidator('param', type({ project_id: 'string', group_id: 'string', role_id: 'string' })),
    (c) => {},
  )
  .delete(
    '/projects/:project_id/groups/:group_id/roles/:role_id',
    sValidator('param', type({ project_id: 'string', group_id: 'string', role_id: 'string' })),
    (c) => {},
  )
  .get(
    '/projects/:project_id/roles',
    sValidator('param', type({ project_id: 'string' })),
    sValidator(
      'query',
      type({
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0 & number.integer <= 1000'),
        'after?': 'string',
        'order?': "'asc' | 'desc'",
      }),
    ),
    (c) => {},
  )
  .post(
    '/projects/:project_id/roles',
    sValidator('param', type({ project_id: 'string' })),
    sValidator('json', PublicCreateOrganizationRoleBodySchema),
    (c) => {},
  )
  .get(
    '/projects/:project_id/roles/:role_id',
    sValidator('param', type({ project_id: 'string', role_id: 'string' })),
    (c) => {},
  )
  .post(
    '/projects/:project_id/roles/:role_id',
    sValidator('param', type({ project_id: 'string', role_id: 'string' })),
    sValidator('json', PublicUpdateOrganizationRoleBodySchema),
    (c) => {},
  )
  .delete(
    '/projects/:project_id/roles/:role_id',
    sValidator('param', type({ project_id: 'string', role_id: 'string' })),
    (c) => {},
  )
  .get(
    '/projects/:project_id/users/:user_id/roles',
    sValidator('param', type({ project_id: 'string', user_id: 'string' })),
    sValidator(
      'query',
      type({
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0 & number.integer <= 1000'),
        'after?': 'string',
        'order?': "'asc' | 'desc'",
      }),
    ),
    (c) => {},
  )
  .post(
    '/projects/:project_id/users/:user_id/roles',
    sValidator('param', type({ project_id: 'string', user_id: 'string' })),
    sValidator('json', PublicAssignOrganizationGroupRoleBodySchema),
    (c) => {},
  )
  .get(
    '/projects/:project_id/users/:user_id/roles/:role_id',
    sValidator('param', type({ project_id: 'string', user_id: 'string', role_id: 'string' })),
    (c) => {},
  )
  .delete(
    '/projects/:project_id/users/:user_id/roles/:role_id',
    sValidator('param', type({ project_id: 'string', user_id: 'string', role_id: 'string' })),
    (c) => {},
  )
