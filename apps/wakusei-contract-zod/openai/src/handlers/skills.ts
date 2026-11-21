import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getSkills = os.getSkills.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postSkills = os.postSkills.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getSkillsSkillId = os.getSkillsSkillId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postSkillsSkillId = os.postSkillsSkillId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const deleteSkillsSkillId = os.deleteSkillsSkillId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getSkillsSkillIdContent = os.getSkillsSkillIdContent.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getSkillsSkillIdVersions = os.getSkillsSkillIdVersions.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postSkillsSkillIdVersions = os.postSkillsSkillIdVersions.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getSkillsSkillIdVersionsVersion = os.getSkillsSkillIdVersionsVersion.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const deleteSkillsSkillIdVersionsVersion = os.deleteSkillsSkillIdVersionsVersion.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getSkillsSkillIdVersionsVersionContent =
  os.getSkillsSkillIdVersionsVersionContent.handler(async ({ input }) => { throw new Error('Not implemented') })
