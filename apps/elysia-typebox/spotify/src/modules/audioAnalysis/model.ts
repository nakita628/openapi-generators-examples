import { t, type UnwrapSchema } from 'elysia'
import { ErrorObjectSchema } from '../../components/schemas'

export const AudioAnalysisModel = {
  getAudioAnalysisParams: t.Object({
    id: t.String({
      example: '11dFghVXANMlKmJXsNCbNl',
      title: 'Spotify Track ID',
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the track.\n',
    }),
  }),
  getAudioAnalysisResponse401: t.Object({ error: ErrorObjectSchema }),
  getAudioAnalysisResponse403: t.Object({ error: ErrorObjectSchema }),
  getAudioAnalysisResponse429: t.Object({ error: ErrorObjectSchema }),
} as const

export type AudioAnalysisModel = {
  [k in keyof typeof AudioAnalysisModel]: UnwrapSchema<(typeof AudioAnalysisModel)[k]>
}
