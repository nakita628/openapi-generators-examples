import { t, type UnwrapSchema } from 'elysia'
import {
  BookingSchema,
  BookingPaymentSchema,
  LinksBookingSchema,
  LinksPaginationSchema,
  LinksSelfSchema,
  WrapperCollectionSchema,
} from '../../components/schemas'

export const BookingsModel = {
  getBookingsResponse200: t.Intersect([
    WrapperCollectionSchema,
    t.Object({ data: t.Optional(t.Array(BookingSchema)) }),
    t.Object({ links: t.Optional(t.Intersect([LinksSelfSchema, LinksPaginationSchema])) }),
  ]),
  createBookingResponse201: t.Intersect([
    BookingSchema,
    t.Object({ links: t.Optional(LinksSelfSchema) }),
  ]),
  getBookingParams: t.Object({ bookingId: t.String({ format: 'uuid' }) }),
  getBookingResponse200: t.Intersect([
    BookingSchema,
    t.Object({ links: t.Optional(LinksSelfSchema) }),
  ]),
  deleteBookingParams: t.Object({ bookingId: t.String({ format: 'uuid' }) }),
  createBookingPaymentParams: t.Object({ bookingId: t.String({ format: 'uuid' }) }),
  createBookingPaymentResponse200: t.Intersect([
    BookingPaymentSchema,
    t.Object({ links: t.Optional(LinksBookingSchema) }),
  ]),
} as const

export type BookingsModel = {
  [k in keyof typeof BookingsModel]: UnwrapSchema<(typeof BookingsModel)[k]>
}
