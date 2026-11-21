import { Elysia } from 'elysia'
import { applications } from './modules/applications'
import { channels } from './modules/channels'
import { gateway } from './modules/gateway'
import { guilds } from './modules/guilds'
import { interactions } from './modules/interactions'
import { invites } from './modules/invites'
import { lobbies } from './modules/lobbies'
import { oauth2 } from './modules/oauth2'
import { partnerSdk } from './modules/partnerSdk'
import { skus } from './modules/skus'
import { soundboardDefaultSounds } from './modules/soundboardDefaultSounds'
import { stageInstances } from './modules/stageInstances'
import { stickerPacks } from './modules/stickerPacks'
import { stickers } from './modules/stickers'
import { users } from './modules/users'
import { voice } from './modules/voice'
import { webhooks } from './modules/webhooks'

export const app = new Elysia()
  .use(applications)
  .use(channels)
  .use(gateway)
  .use(guilds)
  .use(interactions)
  .use(invites)
  .use(lobbies)
  .use(oauth2)
  .use(partnerSdk)
  .use(skus)
  .use(soundboardDefaultSounds)
  .use(stageInstances)
  .use(stickerPacks)
  .use(stickers)
  .use(users)
  .use(voice)
  .use(webhooks)

if (import.meta.main) {
  app.listen(3000)
  console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
}
