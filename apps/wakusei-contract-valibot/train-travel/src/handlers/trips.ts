import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getTrips = os.getTrips.handler(async ({ input }) => {})
