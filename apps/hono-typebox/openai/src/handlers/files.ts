import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type, Codec } from 'typebox'

export const filesHandler = new Hono()
  .get(
    '/files',
    tbValidator(
      'query',
      Type.Object({
        purpose: Type.Optional(Type.String()),
        limit: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '10000' }))
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
    '/files',
    tbValidator(
      'form',
      Type.Object(
        {
          file: Type.String({ description: 'The File object (not file name) to be uploaded.\n' }),
          purpose: Type.Union(
            [
              Type.Literal('assistants'),
              Type.Literal('batch'),
              Type.Literal('fine-tune'),
              Type.Literal('vision'),
              Type.Literal('user_data'),
              Type.Literal('evals'),
            ],
            {
              description:
                'The intended purpose of the uploaded file. One of:\n- `assistants`: Used in the Assistants API\n- `batch`: Used in the Batch API\n- `fine-tune`: Used for fine-tuning\n- `vision`: Images used for vision fine-tuning\n- `user_data`: Flexible file type for any purpose\n- `evals`: Used for eval data sets\n',
            },
          ),
          expires_after: Type.Optional(
            Type.Object(
              {
                anchor: Type.Literal('created_at', {
                  description:
                    'Anchor timestamp after which the expiration policy applies. Supported anchors: `created_at`.',
                }),
                seconds: Codec(
                  Type.Refine(
                    Type.Refine(
                      Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                      (value) => Number(value) >= 3600,
                      () => 'must be >= 3600',
                    ),
                    (value) => Number(value) <= 2592000,
                    () => 'must be <= 2592000',
                  ),
                )
                  .Decode((value) => Number(value))
                  .Encode((value) => String(value)),
              },
              {
                description:
                  'The expiration policy for a file. By default, files with `purpose=batch` expire after 30 days and all other files are persisted until they are manually deleted.',
              },
            ),
          ),
        },
        { additionalProperties: false },
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/files/:file_id', tbValidator('param', Type.Object({ file_id: Type.String() })), (c) => { throw new Error('Not implemented') })
  .delete(
    '/files/:file_id',
    tbValidator('param', Type.Object({ file_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/files/:file_id/content',
    tbValidator('param', Type.Object({ file_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
