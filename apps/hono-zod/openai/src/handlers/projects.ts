import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'
import {
  PublicAssignOrganizationGroupRoleBodySchema,
  PublicCreateOrganizationRoleBodySchema,
  PublicUpdateOrganizationRoleBodySchema,
} from '../components'

export const projectsHandler = new Hono()
  .get(
    '/projects/:project_id/groups/:group_id/roles',
    sValidator('param', z.object({ project_id: z.string(), group_id: z.string() })),
    sValidator(
      'query',
      z.object({
        limit: z.coerce.number().int().min(0).max(1000).exactOptional(),
        after: z.string().exactOptional(),
        order: z.enum(['asc', 'desc']).exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/projects/:project_id/groups/:group_id/roles',
    sValidator('param', z.object({ project_id: z.string(), group_id: z.string() })),
    sValidator('json', PublicAssignOrganizationGroupRoleBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/projects/:project_id/groups/:group_id/roles/:role_id',
    sValidator(
      'param',
      z.object({ project_id: z.string(), group_id: z.string(), role_id: z.string() }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/projects/:project_id/groups/:group_id/roles/:role_id',
    sValidator(
      'param',
      z.object({ project_id: z.string(), group_id: z.string(), role_id: z.string() }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/projects/:project_id/roles',
    sValidator('param', z.object({ project_id: z.string() })),
    sValidator(
      'query',
      z.object({
        limit: z.coerce.number().int().min(0).max(1000).default(1000).exactOptional(),
        after: z.string().exactOptional(),
        order: z.enum(['asc', 'desc']).default('asc').exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/projects/:project_id/roles',
    sValidator('param', z.object({ project_id: z.string() })),
    sValidator('json', PublicCreateOrganizationRoleBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/projects/:project_id/roles/:role_id',
    sValidator('param', z.object({ project_id: z.string(), role_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/projects/:project_id/roles/:role_id',
    sValidator('param', z.object({ project_id: z.string(), role_id: z.string() })),
    sValidator('json', PublicUpdateOrganizationRoleBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/projects/:project_id/roles/:role_id',
    sValidator('param', z.object({ project_id: z.string(), role_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/projects/:project_id/users/:user_id/roles',
    sValidator('param', z.object({ project_id: z.string(), user_id: z.string() })),
    sValidator(
      'query',
      z.object({
        limit: z.coerce.number().int().min(0).max(1000).exactOptional(),
        after: z.string().exactOptional(),
        order: z.enum(['asc', 'desc']).exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/projects/:project_id/users/:user_id/roles',
    sValidator('param', z.object({ project_id: z.string(), user_id: z.string() })),
    sValidator('json', PublicAssignOrganizationGroupRoleBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/projects/:project_id/users/:user_id/roles/:role_id',
    sValidator(
      'param',
      z.object({ project_id: z.string(), user_id: z.string(), role_id: z.string() }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/projects/:project_id/users/:user_id/roles/:role_id',
    sValidator(
      'param',
      z.object({ project_id: z.string(), user_id: z.string(), role_id: z.string() }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
