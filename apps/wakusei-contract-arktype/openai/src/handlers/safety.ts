import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getSafetyCasesId = os.getSafetyCasesId.handler(async ({ input }) => {})
export const getSafetyAlertsId = os.getSafetyAlertsId.handler(async ({ input }) => {})
