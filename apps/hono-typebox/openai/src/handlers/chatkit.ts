import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type, Codec } from 'typebox'
import { OrderEnumSchema, CreateChatSessionBodySchema } from '../components'

export const chatkitHandler = new Hono()
  .post(
    '/chatkit/sessions/:session_id/cancel',
    tbValidator('param', Type.Object({ session_id: Type.String({ examples: ['cksess_123'] }) })),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/chatkit/sessions', tbValidator('json', CreateChatSessionBodySchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/chatkit/threads/:thread_id/items',
    tbValidator('param', Type.Object({ thread_id: Type.String({ examples: ['cthr_123'] }) })),
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 0,
                () => 'must be >= 0',
              ),
              (value) => Number(value) <= 100,
              () => 'must be <= 100',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        order: Type.Optional(OrderEnumSchema),
        after: Type.Optional(
          Type.String({
            description:
              'List items created after this thread item ID. Defaults to null for the first page.',
          }),
        ),
        before: Type.Optional(
          Type.String({
            description:
              'List items created before this thread item ID. Defaults to null for the newest results.',
          }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/chatkit/threads/:thread_id',
    tbValidator('param', Type.Object({ thread_id: Type.String({ examples: ['cthr_123'] }) })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/chatkit/threads/:thread_id',
    tbValidator('param', Type.Object({ thread_id: Type.String({ examples: ['cthr_123'] }) })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/chatkit/threads',
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 0,
                () => 'must be >= 0',
              ),
              (value) => Number(value) <= 100,
              () => 'must be <= 100',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        order: Type.Optional(OrderEnumSchema),
        after: Type.Optional(
          Type.String({
            description:
              'List items created after this thread item ID. Defaults to null for the first page.',
          }),
        ),
        before: Type.Optional(
          Type.String({
            description:
              'List items created before this thread item ID. Defaults to null for the newest results.',
          }),
        ),
        user: Type.Optional(
          Type.String({
            minLength: 1,
            maxLength: 512,
            description:
              'Filter threads that belong to this user identifier. Defaults to null to return all users.',
          }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
