import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getBookings = os.getBookings.handler(async ({ input }) => {})
export const postBookings = os.postBookings.handler(async ({ input }) => {})
export const getBookingsBookingId = os.getBookingsBookingId.handler(async ({ input }) => {})
export const deleteBookingsBookingId = os.deleteBookingsBookingId.handler(async ({ input }) => {})
export const postBookingsBookingIdPayment = os.postBookingsBookingIdPayment.handler(
  async ({ input }) => {},
)
