import { initTRPC } from '@trpc/server'
import { assistantsRouter } from './assistants'
import { audioRouter } from './audio'
import { batchesRouter } from './batches'
import { chatRouter } from './chat'
import { completionsRouter } from './completions'
import { containersRouter } from './containers'
import { conversationsRouter } from './conversations'
import { embeddingsRouter } from './embeddings'
import { evalsRouter } from './evals'
import { filesRouter } from './files'
import { fineTuningRouter } from './fineTuning'
import { imagesRouter } from './images'
import { liveRouter } from './live'
import { modelsRouter } from './models'
import { moderationsRouter } from './moderations'
import { organizationRouter } from './organization'
import { projectsRouter } from './projects'
import { realtimeRouter } from './realtime'
import { responsesRouter } from './responses'
import { threadsRouter } from './threads'
import { uploadsRouter } from './uploads'
import { vectorStoresRouter } from './vectorStores'
import { safetyRouter } from './safety'
import { contentProvenanceChecksRouter } from './contentProvenanceChecks'
import { videosRouter } from './videos'
import { skillsRouter } from './skills'
import { chatkitRouter } from './chatkit'
import { decisionsRouter } from './decisions'
import { agentsRouter } from './agents'
import { vaultsRouter } from './vaults'
import { webhookEndpointsRouter } from './webhookEndpoints'
import { webhookEventTypesRouter } from './webhookEventTypes'
import { responsesBetaTrueRouter } from './responsesBetaTrue'

const t = initTRPC.create()

export const appRouter = t.router({
  assistants: assistantsRouter,
  audio: audioRouter,
  batches: batchesRouter,
  chat: chatRouter,
  completions: completionsRouter,
  containers: containersRouter,
  conversations: conversationsRouter,
  embeddings: embeddingsRouter,
  evals: evalsRouter,
  files: filesRouter,
  fineTuning: fineTuningRouter,
  images: imagesRouter,
  live: liveRouter,
  models: modelsRouter,
  moderations: moderationsRouter,
  organization: organizationRouter,
  projects: projectsRouter,
  realtime: realtimeRouter,
  responses: responsesRouter,
  threads: threadsRouter,
  uploads: uploadsRouter,
  vectorStores: vectorStoresRouter,
  safety: safetyRouter,
  contentProvenanceChecks: contentProvenanceChecksRouter,
  videos: videosRouter,
  skills: skillsRouter,
  chatkit: chatkitRouter,
  decisions: decisionsRouter,
  agents: agentsRouter,
  vaults: vaultsRouter,
  webhookEndpoints: webhookEndpointsRouter,
  webhookEventTypes: webhookEventTypesRouter,
  responsesBetaTrue: responsesBetaTrueRouter,
})
