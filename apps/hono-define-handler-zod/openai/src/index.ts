import { Hono } from 'hono'
import {
  agentsHandler,
  assistantsHandler,
  audioHandler,
  batchesHandler,
  chatHandler,
  chatkitHandler,
  completionsHandler,
  containersHandler,
  contentProvenanceChecksHandler,
  conversationsHandler,
  decisionsHandler,
  embeddingsHandler,
  evalsHandler,
  filesHandler,
  fineTuningHandler,
  imagesHandler,
  liveHandler,
  modelsHandler,
  moderationsHandler,
  organizationHandler,
  projectsHandler,
  realtimeHandler,
  responsesHandler,
  responsesBetaTrueHandler,
  safetyHandler,
  skillsHandler,
  threadsHandler,
  uploadsHandler,
  vaultsHandler,
  vectorStoresHandler,
  videosHandler,
  webhookEndpointsHandler,
  webhookEventTypesHandler,
} from './handlers'

const app = new Hono()

export const api = app
  .route('/', agentsHandler)
  .route('/', assistantsHandler)
  .route('/', audioHandler)
  .route('/', batchesHandler)
  .route('/', chatHandler)
  .route('/', chatkitHandler)
  .route('/', completionsHandler)
  .route('/', containersHandler)
  .route('/', contentProvenanceChecksHandler)
  .route('/', conversationsHandler)
  .route('/', decisionsHandler)
  .route('/', embeddingsHandler)
  .route('/', evalsHandler)
  .route('/', filesHandler)
  .route('/', fineTuningHandler)
  .route('/', imagesHandler)
  .route('/', liveHandler)
  .route('/', modelsHandler)
  .route('/', moderationsHandler)
  .route('/', organizationHandler)
  .route('/', projectsHandler)
  .route('/', realtimeHandler)
  .route('/', responsesHandler)
  .route('/', responsesBetaTrueHandler)
  .route('/', safetyHandler)
  .route('/', skillsHandler)
  .route('/', threadsHandler)
  .route('/', uploadsHandler)
  .route('/', vaultsHandler)
  .route('/', vectorStoresHandler)
  .route('/', videosHandler)
  .route('/', webhookEndpointsHandler)
  .route('/', webhookEventTypesHandler)

export default app
