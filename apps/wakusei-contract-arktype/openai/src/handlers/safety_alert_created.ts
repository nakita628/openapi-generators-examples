import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const postSafetyAlertCreated = os.postSafetyAlertCreated.handler(async ({ input }) => {})
