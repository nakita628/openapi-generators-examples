import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'
import { CreateContainerBodySchema, CreateContainerFileBodySchema } from '../components'

export const containersHandler = new Hono()
  .get(
    '/containers',
    sValidator(
      'query',
      v.object({
        limit: v.optional(
          v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
          '20',
        ),
        order: v.optional(v.picklist(['asc', 'desc']), 'desc'),
        after: v.optional(v.string()),
        name: v.optional(v.string()),
      }),
    ),
    (c) => {},
  )
  .post('/containers', sValidator('json', CreateContainerBodySchema), (c) => {})
  .get(
    '/containers/:container_id',
    sValidator('param', v.object({ container_id: v.string() })),
    (c) => {},
  )
  .delete(
    '/containers/:container_id',
    sValidator('param', v.object({ container_id: v.string() })),
    (c) => {},
  )
  .get(
    '/containers/:container_id/files',
    sValidator('param', v.object({ container_id: v.string() })),
    sValidator(
      'query',
      v.object({
        limit: v.optional(
          v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
          '20',
        ),
        order: v.optional(v.picklist(['asc', 'desc']), 'desc'),
        after: v.optional(v.string()),
      }),
    ),
    (c) => {},
  )
  .post(
    '/containers/:container_id/files',
    sValidator('param', v.object({ container_id: v.string() })),
    sValidator('json', CreateContainerFileBodySchema),
    sValidator('form', CreateContainerFileBodySchema),
    (c) => {},
  )
  .get(
    '/containers/:container_id/files/:file_id',
    sValidator('param', v.object({ container_id: v.string(), file_id: v.string() })),
    (c) => {},
  )
  .delete(
    '/containers/:container_id/files/:file_id',
    sValidator('param', v.object({ container_id: v.string(), file_id: v.string() })),
    (c) => {},
  )
  .get(
    '/containers/:container_id/files/:file_id/content',
    sValidator('param', v.object({ container_id: v.string(), file_id: v.string() })),
    (c) => {},
  )
