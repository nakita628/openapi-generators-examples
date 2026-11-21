import { t, type UnwrapSchema } from 'elysia'
import {
  LinksPaginationSchema,
  LinksSelfSchema,
  StationSchema,
  WrapperCollectionSchema,
} from '../../components/schemas'

export const StationsModel = {
  getStationsResponse200: t.Intersect([
    WrapperCollectionSchema,
    t.Object({ data: t.Optional(t.Array(StationSchema)) }),
    t.Object({ links: t.Optional(t.Intersect([LinksSelfSchema, LinksPaginationSchema])) }),
  ]),
} as const

export type StationsModel = {
  [k in keyof typeof StationsModel]: UnwrapSchema<(typeof StationsModel)[k]>
}
