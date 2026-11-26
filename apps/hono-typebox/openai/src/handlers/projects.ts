import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type, Codec } from 'typebox'
import {
  PublicAssignOrganizationGroupRoleBodySchema,
  PublicCreateOrganizationRoleBodySchema,
  PublicUpdateOrganizationRoleBodySchema,
} from '../components'

export const projectsHandler = new Hono()
  .get(
    '/projects/:project_id/groups/:group_id/roles',
    tbValidator('param', Type.Object({ project_id: Type.String(), group_id: Type.String() })),
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.Refine(
                  Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                  (value) => Number.isSafeInteger(Number(value)),
                  () => 'must be a safe integer',
                ),
                (value) => Number(value) >= 0,
                () => 'must be >= 0',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        after: Type.Optional(Type.String()),
        order: Type.Optional(Type.Union([Type.Literal('asc'), Type.Literal('desc')])),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/projects/:project_id/groups/:group_id/roles',
    tbValidator('param', Type.Object({ project_id: Type.String(), group_id: Type.String() })),
    tbValidator('json', PublicAssignOrganizationGroupRoleBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/projects/:project_id/groups/:group_id/roles/:role_id',
    tbValidator(
      'param',
      Type.Object({ project_id: Type.String(), group_id: Type.String(), role_id: Type.String() }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/projects/:project_id/groups/:group_id/roles/:role_id',
    tbValidator(
      'param',
      Type.Object({ project_id: Type.String(), group_id: Type.String(), role_id: Type.String() }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/projects/:project_id/roles',
    tbValidator('param', Type.Object({ project_id: Type.String() })),
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.Refine(
                  Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '1000' }),
                  (value) => Number.isSafeInteger(Number(value)),
                  () => 'must be a safe integer',
                ),
                (value) => Number(value) >= 0,
                () => 'must be >= 0',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        after: Type.Optional(Type.String()),
        order: Type.Optional(
          Type.Union([Type.Literal('asc'), Type.Literal('desc')], { default: 'asc' }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/projects/:project_id/roles',
    tbValidator('param', Type.Object({ project_id: Type.String() })),
    tbValidator('json', PublicCreateOrganizationRoleBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/projects/:project_id/roles/:role_id',
    tbValidator('param', Type.Object({ project_id: Type.String(), role_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/projects/:project_id/roles/:role_id',
    tbValidator('param', Type.Object({ project_id: Type.String(), role_id: Type.String() })),
    tbValidator('json', PublicUpdateOrganizationRoleBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/projects/:project_id/roles/:role_id',
    tbValidator('param', Type.Object({ project_id: Type.String(), role_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/projects/:project_id/users/:user_id/roles',
    tbValidator('param', Type.Object({ project_id: Type.String(), user_id: Type.String() })),
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.Refine(
                  Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                  (value) => Number.isSafeInteger(Number(value)),
                  () => 'must be a safe integer',
                ),
                (value) => Number(value) >= 0,
                () => 'must be >= 0',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        after: Type.Optional(Type.String()),
        order: Type.Optional(Type.Union([Type.Literal('asc'), Type.Literal('desc')])),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/projects/:project_id/users/:user_id/roles',
    tbValidator('param', Type.Object({ project_id: Type.String(), user_id: Type.String() })),
    tbValidator('json', PublicAssignOrganizationGroupRoleBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/projects/:project_id/users/:user_id/roles/:role_id',
    tbValidator(
      'param',
      Type.Object({ project_id: Type.String(), user_id: Type.String(), role_id: Type.String() }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/projects/:project_id/users/:user_id/roles/:role_id',
    tbValidator(
      'param',
      Type.Object({ project_id: Type.String(), user_id: Type.String(), role_id: Type.String() }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
