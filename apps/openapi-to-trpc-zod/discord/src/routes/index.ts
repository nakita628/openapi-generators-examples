import { initTRPC } from '@trpc/server'
import { applicationsRouter } from './applications'
import { channelsRouter } from './channels'
import { gatewayRouter } from './gateway'
import { guildsRouter } from './guilds'
import { interactionsRouter } from './interactions'
import { invitesRouter } from './invites'
import { lobbiesRouter } from './lobbies'
import { oauth2Router } from './oauth2'
import { partnerSdkRouter } from './partnerSdk'
import { skusRouter } from './skus'
import { soundboardDefaultSoundsRouter } from './soundboardDefaultSounds'
import { stageInstancesRouter } from './stageInstances'
import { stickerPacksRouter } from './stickerPacks'
import { stickersRouter } from './stickers'
import { usersRouter } from './users'
import { voiceRouter } from './voice'
import { webhooksRouter } from './webhooks'

const t = initTRPC.create()

export const appRouter = t.router({
  applications: applicationsRouter,
  channels: channelsRouter,
  gateway: gatewayRouter,
  guilds: guildsRouter,
  interactions: interactionsRouter,
  invites: invitesRouter,
  lobbies: lobbiesRouter,
  oauth2: oauth2Router,
  partnerSdk: partnerSdkRouter,
  skus: skusRouter,
  soundboardDefaultSounds: soundboardDefaultSoundsRouter,
  stageInstances: stageInstancesRouter,
  stickerPacks: stickerPacksRouter,
  stickers: stickersRouter,
  users: usersRouter,
  voice: voiceRouter,
  webhooks: webhooksRouter,
})
