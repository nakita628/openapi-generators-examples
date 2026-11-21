import { initTRPC, TRPCError } from '@trpc/server'
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

const t = initTRPC.create()

export const chatkitRouter = t.router({
  postChatkitSessionsSessionIdCancel: t.procedure
    .input(v.object({ session_id: v.pipe(v.string(), v.metadata({ examples: ['cksess_123'] })) }))
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
      v.object({
        thread_id: v.pipe(v.string(), v.metadata({ examples: ['cthr_123'] })),
        limit: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(100))),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChatkitThreadsThreadId: t.procedure
    .input(v.object({ thread_id: v.pipe(v.string(), v.metadata({ examples: ['cthr_123'] })) }))
    .output(ThreadResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChatkitThreadsThreadId: t.procedure
    .input(v.object({ thread_id: v.pipe(v.string(), v.metadata({ examples: ['cthr_123'] })) }))
    .output(DeletedThreadResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChatkitThreads: t.procedure
    .input(
      v.partial(
        v.object({
          limit: v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(100)),
          order: OrderEnumSchema,
          after: v.pipe(
            v.string(),
            v.description(
              'List items created after this thread item ID. Defaults to null for the first page.',
            ),
          ),
          before: v.pipe(
            v.string(),
            v.description(
              'List items created before this thread item ID. Defaults to null for the newest results.',
            ),
          ),
          user: v.pipe(
            v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(512)),
            v.description(
              'Filter threads that belong to this user identifier. Defaults to null to return all users.',
            ),
          ),
        }),
      ),
    )
    .output(ThreadListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
