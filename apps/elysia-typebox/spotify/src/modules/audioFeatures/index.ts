import { Elysia } from 'elysia'
import {
  AudioFeaturesObjectSchema,
  ErrorObjectSchema,
  KeySchema,
  LoudnessSchema,
  ModeSchema,
  TempoSchema,
  TimeSignatureSchema,
} from '../../components/schemas'
import { AudioFeaturesModel } from './model'

export const audioFeatures = new Elysia()
  .model({
    AudioFeaturesObject: AudioFeaturesObjectSchema,
    ErrorObject: ErrorObjectSchema,
    Key: KeySchema,
    Loudness: LoudnessSchema,
    Mode: ModeSchema,
    Tempo: TempoSchema,
    TimeSignature: TimeSignatureSchema,
  })
  .get('/audio-features', ({ query }) => { throw new Error('Not implemented') }, {
    query: AudioFeaturesModel.getSeveralAudioFeaturesQuery,
    response: {
      200: AudioFeaturesModel.getSeveralAudioFeaturesResponse200,
      401: AudioFeaturesModel.getSeveralAudioFeaturesResponse401,
      403: AudioFeaturesModel.getSeveralAudioFeaturesResponse403,
      429: AudioFeaturesModel.getSeveralAudioFeaturesResponse429,
    },
    detail: {
      tags: ['Tracks'],
      summary: "Get Several Tracks' Audio Features\n",
      description: 'Get audio features for multiple tracks based on their Spotify IDs.\n',
      operationId: 'get-several-audio-features',
      security: [{ oauth_2_0: [] }],
    },
  })
  .get('/audio-features/:id', ({ params }) => { throw new Error('Not implemented') }, {
    params: AudioFeaturesModel.getAudioFeaturesParams,
    response: {
      200: 'AudioFeaturesObject',
      401: AudioFeaturesModel.getAudioFeaturesResponse401,
      403: AudioFeaturesModel.getAudioFeaturesResponse403,
      429: AudioFeaturesModel.getAudioFeaturesResponse429,
    },
    detail: {
      tags: ['Tracks'],
      summary: "Get Track's Audio Features\n",
      description:
        'Get audio feature information for a single track identified by its unique\nSpotify ID.\n',
      operationId: 'get-audio-features',
      security: [{ oauth_2_0: [] }],
    },
  })
