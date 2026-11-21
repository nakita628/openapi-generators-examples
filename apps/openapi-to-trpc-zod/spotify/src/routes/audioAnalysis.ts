import { initTRPC, TRPCError } from '@trpc/server'
import * as z from 'zod'
import { AudioAnalysisObjectSchema } from '../components'

const t = initTRPC.create()

export const audioAnalysisRouter = t.router({
  getAudioAnalysisId: t.procedure
    .input(
      z.object({
        id: z
          .string()
          .meta({
            description:
              'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the track.\n',
            examples: ['11dFghVXANMlKmJXsNCbNl'],
          }),
      }),
    )
    .output(AudioAnalysisObjectSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
