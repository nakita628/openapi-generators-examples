import { os } from '@orpc/server'
import {
  CreateImageRequestSchema,
  EditImageBodyJsonParamSchema,
  ImagesResponseSchema,
} from '../components'

export const postImagesEdits = os
  .route({
    method: 'POST',
    path: '/images/edits',
    tags: ['Images'],
    summary: 'Create image edit',
    description:
      'Creates an edited or extended image given one or more source images and a prompt. This endpoint supports GPT Image models.',
  })
  .input(EditImageBodyJsonParamSchema)
  .output(ImagesResponseSchema)
  .handler(async ({ input }) => {})

export const postImagesGenerations = os
  .route({
    method: 'POST',
    path: '/images/generations',
    tags: ['Images'],
    summary: 'Create image',
    description:
      'Creates an image given a prompt using a GPT Image model. [Learn more](https://developers.openai.com/api/docs/guides/images-vision).\n',
  })
  .input(CreateImageRequestSchema)
  .output(ImagesResponseSchema)
  .handler(async ({ input }) => {})

export const postImagesVariations = os
  .route({
    method: 'POST',
    path: '/images/variations',
    tags: ['Images'],
    summary: 'Create image variation',
    description:
      'This endpoint is retired and no longer available. Use the image edits endpoint with a GPT Image model and a prompt to create a variation of an image. The request and response schemas below describe the legacy contract.',
    deprecated: true,
  })
  .output(ImagesResponseSchema)
  .handler(async ({ input }) => {})
