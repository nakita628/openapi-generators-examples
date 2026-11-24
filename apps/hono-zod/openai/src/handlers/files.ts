import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'

export const filesHandler = new Hono()
  .get(
    '/files',
    sValidator(
      'query',
      z.object({
        purpose: z.string().exactOptional(),
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .default(10000)
          .exactOptional(),
        order: z.enum(['asc', 'desc']).default('desc').exactOptional(),
        after: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/files',
    sValidator(
      'form',
      z.strictObject({
        file: z.file().meta({ description: 'The File object (not file name) to be uploaded.\n' }),
        purpose: z
          .enum(['assistants', 'batch', 'fine-tune', 'vision', 'user_data', 'evals'])
          .meta({
            description:
              'The intended purpose of the uploaded file. One of:\n- `assistants`: Used in the Assistants API\n- `batch`: Used in the Batch API\n- `fine-tune`: Used for fine-tuning\n- `vision`: Images used for vision fine-tuning\n- `user_data`: Flexible file type for any purpose\n- `evals`: Used for eval data sets\n',
          }),
        expires_after: z
          .object({
            anchor: z
              .literal('created_at')
              .meta({
                description:
                  'Anchor timestamp after which the expiration policy applies. Supported anchors: `created_at`.',
              }),
            seconds: z.coerce
              .bigint()
              .pipe(z.int64().min(3600n).max(2592000n))
              .meta({
                description:
                  'The number of seconds after the anchor time that the file will expire. Must be between 3600 (1 hour) and 2592000 (30 days).',
              }),
          })
          .meta({
            description:
              'The expiration policy for a file. By default, files with `purpose=batch` expire after 30 days and all other files are persisted until they are manually deleted.',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/files/:file_id', sValidator('param', z.object({ file_id: z.string() })), (c) => { throw new Error('Not implemented') })
  .delete('/files/:file_id', sValidator('param', z.object({ file_id: z.string() })), (c) => { throw new Error('Not implemented') })
  .get('/files/:file_id/content', sValidator('param', z.object({ file_id: z.string() })), (c) => { throw new Error('Not implemented') })
