import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type, Codec } from 'typebox'
import { CreateBatchRequestSchema } from '../components'

export const batchesHandler = new Hono()
  .get(
    '/batches',
    tbValidator(
      'query',
      Type.Object({
        after: Type.Optional(Type.String()),
        limit: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/batches', tbValidator('json', CreateBatchRequestSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/batches/:batch_id',
    tbValidator('param', Type.Object({ batch_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/batches/:batch_id/cancel',
    tbValidator('param', Type.Object({ batch_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
