import { t, type UnwrapSchema } from 'elysia'
import {
  LinksPaginationSchema,
  LinksSelfSchema,
  TripSchema,
  WrapperCollectionSchema,
} from '../../components/schemas'

export const TripsModel = {
  getTripsQuery: t.Object({
    origin: t.String({ format: 'uuid' }),
    destination: t.String({ format: 'uuid' }),
    date: t.Date(),
    bicycles: t.Optional(t.Boolean({ default: false })),
    dogs: t.Optional(t.Boolean({ default: false })),
  }),
  getTripsResponse200: t.Intersect([
    WrapperCollectionSchema,
    t.Object({ data: t.Optional(t.Array(TripSchema)) }),
    t.Object({ links: t.Optional(t.Intersect([LinksSelfSchema, LinksPaginationSchema])) }),
  ]),
} as const

export type TripsModel = { [k in keyof typeof TripsModel]: UnwrapSchema<(typeof TripsModel)[k]> }
