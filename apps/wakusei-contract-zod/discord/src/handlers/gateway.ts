import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getGateway = os.getGateway.handler(async ({ input }) => {})
export const getGatewayBot = os.getGatewayBot.handler(async ({ input }) => {})
