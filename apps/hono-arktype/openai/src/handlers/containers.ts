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
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'order?': "'asc' | 'desc'",
        'after?': 'string',
        'name?': 'string',
      }),
    ),
    (c) => {},
  )
  .post('/containers', sValidator('json', CreateContainerBodySchema), (c) => {})
  .get(
    '/containers/:container_id',
    sValidator('param', type({ container_id: 'string' })),
    (c) => {},
  )
  .delete(
    '/containers/:container_id',
    sValidator('param', type({ container_id: 'string' })),
    (c) => {},
  )
  .get(
    '/containers/:container_id/files',
    sValidator('param', type({ container_id: 'string' })),
    sValidator(
      'query',
      type({
        'limit?': type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'order?': "'asc' | 'desc'",
        'after?': 'string',
      }),
    ),
    (c) => {},
  )
  .post(
    '/containers/:container_id/files',
    sValidator('param', type({ container_id: 'string' })),
    sValidator('json', CreateContainerFileBodySchema),
    sValidator('form', CreateContainerFileBodySchema),
    (c) => {},
  )
  .get(
    '/containers/:container_id/files/:file_id',
    sValidator('param', type({ container_id: 'string', file_id: 'string' })),
    (c) => {},
  )
  .delete(
    '/containers/:container_id/files/:file_id',
    sValidator('param', type({ container_id: 'string', file_id: 'string' })),
    (c) => {},
  )
  .get(
    '/containers/:container_id/files/:file_id/content',
    sValidator('param', type({ container_id: 'string', file_id: 'string' })),
    (c) => {},
  )
