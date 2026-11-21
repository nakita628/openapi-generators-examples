import { initTRPC, TRPCError } from '@trpc/server'
import * as z from 'zod'
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
    .input(z.object({ session_id: z.string().meta({ examples: ['cksess_123'] }) }))
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
      z.object({
        thread_id: z.string().meta({ examples: ['cthr_123'] }),
        limit: z.int().min(0).max(100).exactOptional(),
        order: OrderEnumSchema.exactOptional(),
        after: z
          .string()
          .meta({
            description:
              'List items created after this thread item ID. Defaults to null for the first page.',
          })
          .exactOptional(),
        before: z
          .string()
          .meta({
            description:
              'List items created before this thread item ID. Defaults to null for the newest results.',
          })
          .exactOptional(),
      }),
    )
    .output(ThreadItemListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChatkitThreadsThreadId: t.procedure
    .input(z.object({ thread_id: z.string().meta({ examples: ['cthr_123'] }) }))
    .output(ThreadResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChatkitThreadsThreadId: t.procedure
    .input(z.object({ thread_id: z.string().meta({ examples: ['cthr_123'] }) }))
    .output(DeletedThreadResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChatkitThreads: t.procedure
    .input(
      z.object({
        limit: z.int().min(0).max(100).exactOptional(),
        order: OrderEnumSchema.exactOptional(),
        after: z
          .string()
          .meta({
            description:
              'List items created after this thread item ID. Defaults to null for the first page.',
          })
          .exactOptional(),
        before: z
          .string()
          .meta({
            description:
              'List items created before this thread item ID. Defaults to null for the newest results.',
          })
          .exactOptional(),
        user: z
          .string()
          .min(1)
          .max(512)
          .meta({
            description:
              'Filter threads that belong to this user identifier. Defaults to null to return all users.',
          })
          .exactOptional(),
      }),
    )
    .output(ThreadListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
