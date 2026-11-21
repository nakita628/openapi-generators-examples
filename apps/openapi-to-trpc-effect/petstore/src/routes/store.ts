import { initTRPC, TRPCError } from '@trpc/server'
import { Schema } from 'effect'
import { OrderSchema } from '../components'

const t = initTRPC.create()

export const storeRouter = t.router({
  getStoreInventory: t.procedure
    .output(
      Schema.toStandardSchemaV1(
        Schema.Record(Schema.String, Schema.Number.check(Schema.isInt32())),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postStoreOrder: t.procedure
    .input(Schema.toStandardSchemaV1(OrderSchema))
    .output(Schema.toStandardSchemaV1(OrderSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getStoreOrderOrderId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          orderId: Schema.Union([
            Schema.BigInt,
            Schema.Number.check(Schema.isInt()),
            Schema.String.check(Schema.isPattern(/^-?\d+$/)),
          ])
            .pipe(
              Schema.decodeTo(
                Schema.BigInt,
                SchemaTransformation.transform({
                  decode: (input) => BigInt(input),
                  encode: (output) => output,
                }),
              ),
            )
            .check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
            ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(OrderSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteStoreOrderOrderId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          orderId: Schema.Union([
            Schema.BigInt,
            Schema.Number.check(Schema.isInt()),
            Schema.String.check(Schema.isPattern(/^-?\d+$/)),
          ])
            .pipe(
              Schema.decodeTo(
                Schema.BigInt,
                SchemaTransformation.transform({
                  decode: (input) => BigInt(input),
                  encode: (output) => output,
                }),
              ),
            )
            .check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
            ),
        }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
