import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type, Codec } from 'typebox'
import { CreateContainerBodySchema, CreateContainerFileBodySchema } from '../components'

export const containersHandler = new Hono()
  .get(
    '/containers',
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        order: Type.Optional(
          Type.Union([Type.Literal('asc'), Type.Literal('desc')], { default: 'desc' }),
        ),
        after: Type.Optional(Type.String()),
        name: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/containers', tbValidator('json', CreateContainerBodySchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/containers/:container_id',
    tbValidator('param', Type.Object({ container_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/containers/:container_id',
    tbValidator('param', Type.Object({ container_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/containers/:container_id/files',
    tbValidator('param', Type.Object({ container_id: Type.String() })),
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        order: Type.Optional(
          Type.Union([Type.Literal('asc'), Type.Literal('desc')], { default: 'desc' }),
        ),
        after: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/containers/:container_id/files',
    tbValidator('param', Type.Object({ container_id: Type.String() })),
    tbValidator('json', CreateContainerFileBodySchema),
    tbValidator('form', CreateContainerFileBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/containers/:container_id/files/:file_id',
    tbValidator('param', Type.Object({ container_id: Type.String(), file_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/containers/:container_id/files/:file_id',
    tbValidator('param', Type.Object({ container_id: Type.String(), file_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/containers/:container_id/files/:file_id/content',
    tbValidator('param', Type.Object({ container_id: Type.String(), file_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
