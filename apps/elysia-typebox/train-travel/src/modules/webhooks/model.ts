import { t, type UnwrapSchema } from 'elysia'
import { BookingSchema, LinksPaginationSchema, LinksSelfSchema } from '../../components/schemas'

export const WebhooksModel = {
  newBookingBody: t.Intersect([
    BookingSchema,
    t.Object({ links: t.Optional(t.Intersect([LinksSelfSchema, LinksPaginationSchema])) }),
  ]),
} as const

export type WebhooksModel = {
  [k in keyof typeof WebhooksModel]: UnwrapSchema<(typeof WebhooksModel)[k]>
}
