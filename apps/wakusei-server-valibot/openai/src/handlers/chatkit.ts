import { os } from '@orpc/server'
import * as v from 'valibot'
import {
  ChatSessionResourceSchema,
  CreateChatSessionBodySchema,
  DeletedThreadResourceSchema,
  OrderEnumSchema,
  ThreadItemListResourceSchema,
  ThreadListResourceSchema,
  ThreadResourceSchema,
} from '../components'

export const postChatkitSessionsSessionIdCancel = os
  .route({
    method: 'POST',
    path: '/chatkit/sessions/{session_id}/cancel',
    summary: 'Cancel a ChatKit session',
    description:
      'Cancel an active ChatKit session and return its most recent metadata.\n\nCancelling prevents new requests from using the issued client secret.',
    successDescription: 'Success',
  })
  .input(v.object({ session_id: v.pipe(v.string(), v.metadata({ examples: ['cksess_123'] })) }))
  .output(ChatSessionResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postChatkitSessions = os
  .route({
    method: 'POST',
    path: '/chatkit/sessions',
    summary: 'Create a ChatKit session',
    description: 'Create a ChatKit session.',
    successDescription: 'Success',
  })
  .input(CreateChatSessionBodySchema)
  .output(ChatSessionResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getChatkitThreadsThreadIdItems = os
  .route({
    method: 'GET',
    path: '/chatkit/threads/{thread_id}/items',
    summary: 'List ChatKit thread items',
    description: 'List items that belong to a ChatKit thread.',
    successDescription: 'Success',
  })
  .input(
    v.object({
      thread_id: v.pipe(v.string(), v.metadata({ examples: ['cthr_123'] })),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
          v.minValue(0),
          v.maxValue(100),
        ),
      ),
      order: v.optional(OrderEnumSchema),
      after: v.optional(
        v.pipe(
          v.string(),
          v.description(
            'List items created after this thread item ID. Defaults to null for the first page.',
          ),
        ),
      ),
      before: v.optional(
        v.pipe(
          v.string(),
          v.description(
            'List items created before this thread item ID. Defaults to null for the newest results.',
          ),
        ),
      ),
    }),
  )
  .output(ThreadItemListResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getChatkitThreadsThreadId = os
  .route({
    method: 'GET',
    path: '/chatkit/threads/{thread_id}',
    summary: 'Retrieve a ChatKit thread',
    description: 'Retrieve a ChatKit thread by its identifier.',
    successDescription: 'Success',
  })
  .input(v.object({ thread_id: v.pipe(v.string(), v.metadata({ examples: ['cthr_123'] })) }))
  .output(ThreadResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteChatkitThreadsThreadId = os
  .route({
    method: 'DELETE',
    path: '/chatkit/threads/{thread_id}',
    summary: 'Delete a ChatKit thread',
    description: 'Delete a ChatKit thread along with its items and stored attachments.',
    successDescription: 'Success',
  })
  .input(v.object({ thread_id: v.pipe(v.string(), v.metadata({ examples: ['cthr_123'] })) }))
  .output(DeletedThreadResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getChatkitThreads = os
  .route({
    method: 'GET',
    path: '/chatkit/threads',
    summary: 'List ChatKit threads',
    description: 'List ChatKit threads with optional pagination and user filters.',
    successDescription: 'Success',
  })
  .input(
    v.object({
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
          v.minValue(0),
          v.maxValue(100),
        ),
      ),
      order: v.optional(OrderEnumSchema),
      after: v.optional(
        v.pipe(
          v.string(),
          v.description(
            'List items created after this thread item ID. Defaults to null for the first page.',
          ),
        ),
      ),
      before: v.optional(
        v.pipe(
          v.string(),
          v.description(
            'List items created before this thread item ID. Defaults to null for the newest results.',
          ),
        ),
      ),
      user: v.optional(
        v.pipe(
          v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(512)),
          v.description(
            'Filter threads that belong to this user identifier. Defaults to null to return all users.',
          ),
        ),
      ),
    }),
  )
  .output(ThreadListResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
