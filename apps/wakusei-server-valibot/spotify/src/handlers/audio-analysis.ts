import { os } from '@orpc/server'
import * as v from 'valibot'
import { AudioAnalysisObjectSchema } from '../components'

export const getAudioAnalysisId = os
  .route({
    method: 'GET',
    path: '/audio-analysis/{id}',
    tags: ['Tracks'],
    summary: "Get Track's Audio Analysis\n",
    description:
      'Get a low-level audio analysis for a track in the Spotify catalog. The audio analysis describes the track’s structure and musical content, including rhythm, pitch, and timbre.\n',
    deprecated: true,
    successDescription: 'Audio analysis for one track',
  })
  .input(
    v.object({
      id: v.pipe(
        v.string(),
        v.description(
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the track.\n',
        ),
        v.metadata({ examples: ['11dFghVXANMlKmJXsNCbNl'] }),
      ),
    }),
  )
  .output(AudioAnalysisObjectSchema)
  .handler(async ({ input }) => {})
