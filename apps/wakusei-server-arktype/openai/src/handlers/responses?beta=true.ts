import { os } from '@orpc/server'
import { BetaCreateResponseSchema, BetaResponseSchema } from '../components'

export const postResponsesBetaTrue = os
  .route({
    method: 'POST',
    path: '/responses?beta=true',
    tags: ['Responses'],
    summary: 'Create a model response',
    description:
      "Creates a model response. Provide [text](https://developers.openai.com/api/docs/guides/text) or\n[image](https://developers.openai.com/api/docs/guides/images-vision) inputs to generate [text](https://developers.openai.com/api/docs/guides/text)\nor [JSON](https://developers.openai.com/api/docs/guides/structured-outputs) outputs. Have the model call\nyour own [custom code](https://developers.openai.com/api/docs/guides/function-calling) or use built-in\n[tools](https://developers.openai.com/api/docs/guides/tools) like [web search](https://developers.openai.com/api/docs/guides/tools-web-search)\nor [file search](https://developers.openai.com/api/docs/guides/tools-file-search) to use your own data\nas input for the model's response.\n",
  })
  .input(BetaCreateResponseSchema)
  .output(BetaResponseSchema)
  .handler(async ({ input }) => {})
