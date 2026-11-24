import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'
import {
  PublicAssignOrganizationGroupRoleBodySchema,
  PublicCreateOrganizationRoleBodySchema,
  PublicUpdateOrganizationRoleBodySchema,
} from '../components'

export const projectsHandler = new Hono()
  .get(
    '/projects/:project_id/groups/:group_id/roles',
    sValidator('param', v.object({ project_id: v.string(), group_id: v.string() })),
    sValidator(
      'query',
      v.partial(
        v.object({
          limit: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
            v.maxValue(1000),
          ),
          after: v.string(),
          order: v.picklist(['asc', 'desc']),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/projects/:project_id/groups/:group_id/roles',
    sValidator('param', v.object({ project_id: v.string(), group_id: v.string() })),
    sValidator('json', PublicAssignOrganizationGroupRoleBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/projects/:project_id/groups/:group_id/roles/:role_id',
    sValidator(
      'param',
      v.object({ project_id: v.string(), group_id: v.string(), role_id: v.string() }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/projects/:project_id/groups/:group_id/roles/:role_id',
    sValidator(
      'param',
      v.object({ project_id: v.string(), group_id: v.string(), role_id: v.string() }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/projects/:project_id/roles',
    sValidator('param', v.object({ project_id: v.string() })),
    sValidator(
      'query',
      v.object({
        limit: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
            v.maxValue(1000),
          ),
          '1000',
        ),
        after: v.optional(v.string()),
        order: v.optional(v.picklist(['asc', 'desc']), 'asc'),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/projects/:project_id/roles',
    sValidator('param', v.object({ project_id: v.string() })),
    sValidator('json', PublicCreateOrganizationRoleBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/projects/:project_id/roles/:role_id',
    sValidator('param', v.object({ project_id: v.string(), role_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/projects/:project_id/roles/:role_id',
    sValidator('param', v.object({ project_id: v.string(), role_id: v.string() })),
    sValidator('json', PublicUpdateOrganizationRoleBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/projects/:project_id/roles/:role_id',
    sValidator('param', v.object({ project_id: v.string(), role_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/projects/:project_id/users/:user_id/roles',
    sValidator('param', v.object({ project_id: v.string(), user_id: v.string() })),
    sValidator(
      'query',
      v.partial(
        v.object({
          limit: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
            v.maxValue(1000),
          ),
          after: v.string(),
          order: v.picklist(['asc', 'desc']),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/projects/:project_id/users/:user_id/roles',
    sValidator('param', v.object({ project_id: v.string(), user_id: v.string() })),
    sValidator('json', PublicAssignOrganizationGroupRoleBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/projects/:project_id/users/:user_id/roles/:role_id',
    sValidator(
      'param',
      v.object({ project_id: v.string(), user_id: v.string(), role_id: v.string() }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/projects/:project_id/users/:user_id/roles/:role_id',
    sValidator(
      'param',
      v.object({ project_id: v.string(), user_id: v.string(), role_id: v.string() }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
