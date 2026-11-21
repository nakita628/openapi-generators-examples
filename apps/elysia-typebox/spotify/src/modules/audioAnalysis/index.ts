import { Elysia } from 'elysia'
import {
  AudioAnalysisObjectSchema,
  ErrorObjectSchema,
  KeySchema,
  LoudnessSchema,
  ModeSchema,
  SectionObjectSchema,
  SegmentObjectSchema,
  TempoSchema,
  TimeIntervalObjectSchema,
  TimeSignatureSchema,
} from '../../components/schemas'
import { AudioAnalysisModel } from './model'

export const audioAnalysis = new Elysia()
  .model({
    AudioAnalysisObject: AudioAnalysisObjectSchema,
    ErrorObject: ErrorObjectSchema,
    Key: KeySchema,
    Loudness: LoudnessSchema,
    Mode: ModeSchema,
    SectionObject: SectionObjectSchema,
    SegmentObject: SegmentObjectSchema,
    Tempo: TempoSchema,
    TimeIntervalObject: TimeIntervalObjectSchema,
    TimeSignature: TimeSignatureSchema,
  })
  .get('/audio-analysis/:id', ({ params }) => {}, {
    params: AudioAnalysisModel.getAudioAnalysisParams,
    response: {
      200: 'AudioAnalysisObject',
      401: AudioAnalysisModel.getAudioAnalysisResponse401,
      403: AudioAnalysisModel.getAudioAnalysisResponse403,
      429: AudioAnalysisModel.getAudioAnalysisResponse429,
    },
    detail: {
      tags: ['Tracks'],
      summary: "Get Track's Audio Analysis\n",
      description:
        'Get a low-level audio analysis for a track in the Spotify catalog. The audio analysis describes the track’s structure and musical content, including rhythm, pitch, and timbre.\n',
      operationId: 'get-audio-analysis',
      security: [{ oauth_2_0: [] }],
    },
  })
