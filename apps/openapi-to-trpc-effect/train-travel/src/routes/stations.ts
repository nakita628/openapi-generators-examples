import { initTRPC, TRPCError } from '@trpc/server'
import { Schema } from 'effect'
import {
  LinksPaginationSchema,
  LinksSelfSchema,
  StationSchema,
  WrapperCollectionSchema,
} from '../components'

const t = initTRPC.create()

export const stationsRouter = t.router({
  getStations: t.procedure
    .output(
      Schema.toStandardSchemaV1(
        WrapperCollectionSchema.check(
          Schema.makeFilter((input) =>
            Schema.is(Schema.Struct({ data: Schema.optional(Schema.Array(StationSchema)) }))(input),
          ),
          Schema.makeFilter((input) =>
            Schema.is(
              Schema.Struct({
                links: Schema.optional(
                  LinksSelfSchema.check(
                    Schema.makeFilter((input) => Schema.is(LinksPaginationSchema)(input)),
                  ),
                ),
              }),
            )(input),
          ),
        ),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
