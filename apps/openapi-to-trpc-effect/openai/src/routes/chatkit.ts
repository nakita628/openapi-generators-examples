import { initTRPC, TRPCError } from '@trpc/server'
import { Schema } from 'effect'
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
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          session_id: Schema.String.annotate({ jsonSchemaExamples: ['cksess_123'] }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ChatSessionResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postChatkitSessions: t.procedure
    .input(Schema.toStandardSchemaV1(CreateChatSessionBodySchema))
    .output(Schema.toStandardSchemaV1(ChatSessionResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChatkitThreadsThreadIdItems: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          thread_id: Schema.String.annotate({ jsonSchemaExamples: ['cthr_123'] }),
          limit: Schema.optional(
            Schema.Number.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(100),
            ),
          ),
          order: Schema.optional(OrderEnumSchema),
          after: Schema.optional(
            Schema.String.annotate({
              description:
                'List items created after this thread item ID. Defaults to null for the first page.',
            }),
          ),
          before: Schema.optional(
            Schema.String.annotate({
              description:
                'List items created before this thread item ID. Defaults to null for the newest results.',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ThreadItemListResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChatkitThreadsThreadId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ thread_id: Schema.String.annotate({ jsonSchemaExamples: ['cthr_123'] }) }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ThreadResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChatkitThreadsThreadId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ thread_id: Schema.String.annotate({ jsonSchemaExamples: ['cthr_123'] }) }),
      ),
    )
    .output(Schema.toStandardSchemaV1(DeletedThreadResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChatkitThreads: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.optional(
            Schema.Number.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(100),
            ),
          ),
          order: Schema.optional(OrderEnumSchema),
          after: Schema.optional(
            Schema.String.annotate({
              description:
                'List items created after this thread item ID. Defaults to null for the first page.',
            }),
          ),
          before: Schema.optional(
            Schema.String.annotate({
              description:
                'List items created before this thread item ID. Defaults to null for the newest results.',
            }),
          ),
          user: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 1, {
                expected: 'a string of at least 1 character',
              }),
              Schema.makeFilter((input) => [...input].length <= 512, {
                expected: 'a string of at most 512 characters',
              }),
            ).annotate({
              description:
                'Filter threads that belong to this user identifier. Defaults to null to return all users.',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ThreadListResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
