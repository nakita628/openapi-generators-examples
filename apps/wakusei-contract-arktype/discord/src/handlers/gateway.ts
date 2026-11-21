import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getGateway = os.getGateway.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getGatewayBot = os.getGatewayBot.handler(async ({ input }) => { throw new Error('Not implemented') })
