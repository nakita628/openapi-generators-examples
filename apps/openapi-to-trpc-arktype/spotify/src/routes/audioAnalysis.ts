import { initTRPC, TRPCError } from '@trpc/server'
import { type } from 'arktype'
import { AudioAnalysisObjectSchema } from '../components'

const t = initTRPC.create()

export const audioAnalysisRouter = t.router({
  getAudioAnalysisId: t.procedure
    .input(
      type({
        id: type('string').describe(
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the track.\n',
        ),
      }),
    )
    .output(AudioAnalysisObjectSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
