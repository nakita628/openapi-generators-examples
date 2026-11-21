import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'
import { CreateContainerBodySchema, CreateContainerFileBodySchema } from '../components'

export const containersHandler = new Hono()
  .get(
    '/containers',
    sValidator(
      'query',
      z.object({
        limit: z.coerce.number().int().default(20).exactOptional(),
        order: z.enum(['asc', 'desc']).default('desc').exactOptional(),
        after: z.string().exactOptional(),
        name: z.string().exactOptional(),
      }),
    ),
    (c) => {},
  )
  .post('/containers', sValidator('json', CreateContainerBodySchema), (c) => {})
  .get(
    '/containers/:container_id',
    sValidator('param', z.object({ container_id: z.string() })),
    (c) => {},
  )
  .delete(
    '/containers/:container_id',
    sValidator('param', z.object({ container_id: z.string() })),
    (c) => {},
  )
  .get(
    '/containers/:container_id/files',
    sValidator('param', z.object({ container_id: z.string() })),
    sValidator(
      'query',
      z.object({
        limit: z.coerce.number().int().default(20).exactOptional(),
        order: z.enum(['asc', 'desc']).default('desc').exactOptional(),
        after: z.string().exactOptional(),
      }),
    ),
    (c) => {},
  )
  .post(
    '/containers/:container_id/files',
    sValidator('param', z.object({ container_id: z.string() })),
    sValidator('json', CreateContainerFileBodySchema),
    sValidator('form', CreateContainerFileBodySchema),
    (c) => {},
  )
  .get(
    '/containers/:container_id/files/:file_id',
    sValidator('param', z.object({ container_id: z.string(), file_id: z.string() })),
    (c) => {},
  )
  .delete(
    '/containers/:container_id/files/:file_id',
    sValidator('param', z.object({ container_id: z.string(), file_id: z.string() })),
    (c) => {},
  )
  .get(
    '/containers/:container_id/files/:file_id/content',
    sValidator('param', z.object({ container_id: z.string(), file_id: z.string() })),
    (c) => {},
  )
