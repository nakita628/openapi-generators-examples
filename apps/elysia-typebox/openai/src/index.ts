import { Elysia } from 'elysia'
import { assistants } from './modules/assistants'
import { audio } from './modules/audio'
import { batches } from './modules/batches'
import { chat } from './modules/chat'
import { completions } from './modules/completions'
import { containers } from './modules/containers'
import { conversations } from './modules/conversations'
import { embeddings } from './modules/embeddings'
import { evals } from './modules/evals'
import { files } from './modules/files'
import { fineTuning } from './modules/fineTuning'
import { images } from './modules/images'
import { live } from './modules/live'
import { models } from './modules/models'
import { moderations } from './modules/moderations'
import { organization } from './modules/organization'
import { projects } from './modules/projects'
import { realtime } from './modules/realtime'
import { responses } from './modules/responses'
import { threads } from './modules/threads'
import { uploads } from './modules/uploads'
import { vectorStores } from './modules/vectorStores'
import { safety } from './modules/safety'
import { contentProvenanceChecks } from './modules/contentProvenanceChecks'
import { videos } from './modules/videos'
import { skills } from './modules/skills'
import { chatkit } from './modules/chatkit'
import { decisions } from './modules/decisions'
import { agents } from './modules/agents'
import { vaults } from './modules/vaults'
import { webhookEndpoints } from './modules/webhookEndpoints'
import { webhookEventTypes } from './modules/webhookEventTypes'
import { responsesBetaTrue } from './modules/responsesBetaTrue'
import { webhooks } from './modules/webhooks'

export const app = new Elysia()
  .use(assistants)
  .use(audio)
  .use(batches)
  .use(chat)
  .use(completions)
  .use(containers)
  .use(conversations)
  .use(embeddings)
  .use(evals)
  .use(files)
  .use(fineTuning)
  .use(images)
  .use(live)
  .use(models)
  .use(moderations)
  .use(organization)
  .use(projects)
  .use(realtime)
  .use(responses)
  .use(threads)
  .use(uploads)
  .use(vectorStores)
  .use(safety)
  .use(contentProvenanceChecks)
  .use(videos)
  .use(skills)
  .use(chatkit)
  .use(decisions)
  .use(agents)
  .use(vaults)
  .use(webhookEndpoints)
  .use(webhookEventTypes)
  .use(responsesBetaTrue)
  .use(webhooks)

if (import.meta.main) {
  app.listen(3000)
  console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
}
