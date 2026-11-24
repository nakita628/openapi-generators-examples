import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'
import { CreateContainerBodySchema, CreateContainerFileBodySchema } from '../components'

export const containersHandler = new Hono()
  .get(
    '/containers',
    sValidator(
      'query',
      type({
        'limit?': type('string').pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'order?': "'asc' | 'desc'",
        'after?': 'string',
        'name?': 'string',
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/containers', sValidator('json', CreateContainerBodySchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/containers/:container_id',
    sValidator('param', type({ container_id: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/containers/:container_id',
    sValidator('param', type({ container_id: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/containers/:container_id/files',
    sValidator('param', type({ container_id: 'string' })),
    sValidator(
      'query',
      type({
        'limit?': type('string').pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'order?': "'asc' | 'desc'",
        'after?': 'string',
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/containers/:container_id/files',
    sValidator('param', type({ container_id: 'string' })),
    sValidator('json', CreateContainerFileBodySchema),
    sValidator('form', CreateContainerFileBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/containers/:container_id/files/:file_id',
    sValidator('param', type({ container_id: 'string', file_id: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/containers/:container_id/files/:file_id',
    sValidator('param', type({ container_id: 'string', file_id: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/containers/:container_id/files/:file_id/content',
    sValidator('param', type({ container_id: 'string', file_id: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
