import { initTRPC, TRPCError } from '@trpc/server'
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

const t = initTRPC.create()

export const chatkitRouter = t.router({
  postChatkitSessionsSessionIdCancel: t.procedure
    .input(type({ session_id: 'string' }))
    .output(ChatSessionResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postChatkitSessions: t.procedure
    .input(CreateChatSessionBodySchema)
    .output(ChatSessionResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChatkitThreadsThreadIdItems: t.procedure
    .input(
      type({
        thread_id: 'string',
        'limit?': 'number.integer >= 0 & number.integer <= 100',
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChatkitThreadsThreadId: t.procedure
    .input(type({ thread_id: 'string' }))
    .output(ThreadResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChatkitThreadsThreadId: t.procedure
    .input(type({ thread_id: 'string' }))
    .output(DeletedThreadResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChatkitThreads: t.procedure
    .input(
      type({
        'limit?': 'number.integer >= 0 & number.integer <= 100',
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
