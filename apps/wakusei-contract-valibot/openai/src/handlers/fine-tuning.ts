import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const postFineTuningAlphaGradersRun = os.postFineTuningAlphaGradersRun.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postFineTuningAlphaGradersValidate = os.postFineTuningAlphaGradersValidate.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getFineTuningCheckpointsFineTunedModelCheckpointPermissions =
  os.getFineTuningCheckpointsFineTunedModelCheckpointPermissions.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postFineTuningCheckpointsFineTunedModelCheckpointPermissions =
  os.postFineTuningCheckpointsFineTunedModelCheckpointPermissions.handler(async ({ input }) => { throw new Error('Not implemented') })
export const deleteFineTuningCheckpointsFineTunedModelCheckpointPermissionsPermissionId =
  os.deleteFineTuningCheckpointsFineTunedModelCheckpointPermissionsPermissionId.handler(
    async ({ input }) => { throw new Error('Not implemented') },
  )
export const getFineTuningJobs = os.getFineTuningJobs.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postFineTuningJobs = os.postFineTuningJobs.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getFineTuningJobsFineTuningJobId = os.getFineTuningJobsFineTuningJobId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postFineTuningJobsFineTuningJobIdCancel =
  os.postFineTuningJobsFineTuningJobIdCancel.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getFineTuningJobsFineTuningJobIdCheckpoints =
  os.getFineTuningJobsFineTuningJobIdCheckpoints.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getFineTuningJobsFineTuningJobIdEvents =
  os.getFineTuningJobsFineTuningJobIdEvents.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postFineTuningJobsFineTuningJobIdPause =
  os.postFineTuningJobsFineTuningJobIdPause.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postFineTuningJobsFineTuningJobIdResume =
  os.postFineTuningJobsFineTuningJobIdResume.handler(async ({ input }) => { throw new Error('Not implemented') })
