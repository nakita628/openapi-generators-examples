import { os } from '@orpc/server'
import { type } from 'arktype'
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
  .input(type({ session_id: type('string') }))
  .output(ChatSessionResourceSchema)
  .handler(async ({ input }) => {})

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
  .handler(async ({ input }) => {})

export const getChatkitThreadsThreadIdItems = os
  .route({
    method: 'GET',
    path: '/chatkit/threads/{thread_id}/items',
    summary: 'List ChatKit thread items',
    description: 'List items that belong to a ChatKit thread.',
    successDescription: 'Success',
  })
  .input(
    type({
      thread_id: type('string'),
      'limit?': type('string')
        .pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0 & number.integer <= 100'),
      'order?': OrderEnumSchema,
      'after?': type('string').describe(
        'List items created after this thread item ID. Defaults to null for the first page.',
      ),
      'before?': type('string').describe(
        'List items created before this thread item ID. Defaults to null for the newest results.',
      ),
    }),
  )
  .output(ThreadItemListResourceSchema)
  .handler(async ({ input }) => {})

export const getChatkitThreadsThreadId = os
  .route({
    method: 'GET',
    path: '/chatkit/threads/{thread_id}',
    summary: 'Retrieve a ChatKit thread',
    description: 'Retrieve a ChatKit thread by its identifier.',
    successDescription: 'Success',
  })
  .input(type({ thread_id: type('string') }))
  .output(ThreadResourceSchema)
  .handler(async ({ input }) => {})

export const deleteChatkitThreadsThreadId = os
  .route({
    method: 'DELETE',
    path: '/chatkit/threads/{thread_id}',
    summary: 'Delete a ChatKit thread',
    description: 'Delete a ChatKit thread along with its items and stored attachments.',
    successDescription: 'Success',
  })
  .input(type({ thread_id: type('string') }))
  .output(DeletedThreadResourceSchema)
  .handler(async ({ input }) => {})

export const getChatkitThreads = os
  .route({
    method: 'GET',
    path: '/chatkit/threads',
    summary: 'List ChatKit threads',
    description: 'List ChatKit threads with optional pagination and user filters.',
    successDescription: 'Success',
  })
  .input(
    type({
      'limit?': type('string')
        .pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0 & number.integer <= 100'),
      'order?': OrderEnumSchema,
      'after?': type('string').describe(
        'List items created after this thread item ID. Defaults to null for the first page.',
      ),
      'before?': type('string').describe(
        'List items created before this thread item ID. Defaults to null for the newest results.',
      ),
      'user?': type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 512 || ctx.mustBe('at most 512 characters'))
        .describe(
          'Filter threads that belong to this user identifier. Defaults to null to return all users.',
        ),
    }),
  )
  .output(ThreadListResourceSchema)
  .handler(async ({ input }) => {})
