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
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .default(20)
          .exactOptional(),
        order: z.enum(['asc', 'desc']).default('desc').exactOptional(),
        after: z.string().exactOptional(),
        name: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/containers', sValidator('json', CreateContainerBodySchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/containers/:container_id',
    sValidator('param', z.object({ container_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/containers/:container_id',
    sValidator('param', z.object({ container_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/containers/:container_id/files',
    sValidator('param', z.object({ container_id: z.string() })),
    sValidator(
      'query',
      z.object({
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .default(20)
          .exactOptional(),
        order: z.enum(['asc', 'desc']).default('desc').exactOptional(),
        after: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/containers/:container_id/files',
    sValidator('param', z.object({ container_id: z.string() })),
    sValidator('json', CreateContainerFileBodySchema),
    sValidator('form', CreateContainerFileBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/containers/:container_id/files/:file_id',
    sValidator('param', z.object({ container_id: z.string(), file_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/containers/:container_id/files/:file_id',
    sValidator('param', z.object({ container_id: z.string(), file_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/containers/:container_id/files/:file_id/content',
    sValidator('param', z.object({ container_id: z.string(), file_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
