import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getBookings = os.getBookings.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postBookings = os.postBookings.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getBookingsBookingId = os.getBookingsBookingId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const deleteBookingsBookingId = os.deleteBookingsBookingId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postBookingsBookingIdPayment = os.postBookingsBookingIdPayment.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
