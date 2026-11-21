import { initTRPC, TRPCError } from '@trpc/server'
import * as v from 'valibot'
import { AudioAnalysisObjectSchema } from '../components'

const t = initTRPC.create()

export const audioAnalysisRouter = t.router({
  getAudioAnalysisId: t.procedure
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
