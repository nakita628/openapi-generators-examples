import { Elysia } from 'elysia'
import {
  CreateImageRequestSchema,
  CreateImageVariationRequestSchema,
  EditImageBodyJsonParamSchema,
  ErrorSchema,
  ErrorResponseSchema,
  ImageSchema,
  ImageGenInputUsageDetailsSchema,
  ImageGenOutputTokensDetailsSchema,
  ImageGenUsageSchema,
  ImageRefParamSchema,
  ImagesApiOutputFormatSchema,
  ImagesResponseSchema,
  MisalignmentErrorDetailsResourceSchema,
  PartialImagesSchema,
  ReasoningEffortEnumSchema,
  SvgParamSchema,
  SvgReasoningParamSchema,
  SvgUsageSchema,
  MisalignmentErrorTypeSchema,
  MisalignmentSteerSchema,
  ComplexitySchema,
  FrameCountSchema,
  FrameDurationMsSchema,
  SvgSchema,
} from '../../components/schemas'
import { ImagesModel } from './model'

export const images = new Elysia()
  .model({
    CreateImageRequest: CreateImageRequestSchema,
    CreateImageVariationRequest: CreateImageVariationRequestSchema,
    EditImageBodyJsonParam: EditImageBodyJsonParamSchema,
    Error: ErrorSchema,
    ErrorResponse: ErrorResponseSchema,
    Image: ImageSchema,
    ImageGenInputUsageDetails: ImageGenInputUsageDetailsSchema,
    ImageGenOutputTokensDetails: ImageGenOutputTokensDetailsSchema,
    ImageGenUsage: ImageGenUsageSchema,
    ImageRefParam: ImageRefParamSchema,
    ImagesApiOutputFormat: ImagesApiOutputFormatSchema,
    ImagesResponse: ImagesResponseSchema,
    MisalignmentErrorDetailsResource: MisalignmentErrorDetailsResourceSchema,
    PartialImages: PartialImagesSchema,
    ReasoningEffortEnum: ReasoningEffortEnumSchema,
    SvgParam: SvgParamSchema,
    SvgReasoningParam: SvgReasoningParamSchema,
    SvgUsage: SvgUsageSchema,
    MisalignmentErrorType: MisalignmentErrorTypeSchema,
    MisalignmentSteer: MisalignmentSteerSchema,
    Complexity: ComplexitySchema,
    FrameCount: FrameCountSchema,
    FrameDurationMs: FrameDurationMsSchema,
    Svg: SvgSchema,
  })
  .post('/images/edits', ({ body }) => {}, {
    body: 'EditImageBodyJsonParam',
    response: {
      200: 'ImagesResponse',
      400: 'ErrorResponse',
      403: 'ErrorResponse',
      410: 'ErrorResponse',
      429: 'ErrorResponse',
      500: 'ErrorResponse',
      503: 'ErrorResponse',
    },
    detail: {
      tags: ['Images'],
      summary: 'Create image edit',
      description:
        'Creates an edited or extended image given one or more source images and a prompt. This endpoint supports GPT Image models.',
      operationId: 'createImageEdit',
    },
  })
  .post('/images/generations', ({ body }) => {}, {
    body: 'CreateImageRequest',
    response: {
      200: 'ImagesResponse',
      400: 'ErrorResponse',
      403: 'ErrorResponse',
      410: 'ErrorResponse',
      429: 'ErrorResponse',
      500: 'ErrorResponse',
      503: 'ErrorResponse',
    },
    detail: {
      tags: ['Images'],
      summary: 'Create image',
      description:
        'Creates an image given a prompt using a GPT Image model. [Learn more](https://developers.openai.com/api/docs/guides/images-vision).\n',
      operationId: 'createImage',
    },
  })
  .post('/images/variations', ({ body }) => {}, {
    body: 'CreateImageVariationRequest',
    response: {
      200: 'ImagesResponse',
      400: 'ErrorResponse',
      403: 'ErrorResponse',
      410: 'ErrorResponse',
      429: 'ErrorResponse',
      500: 'ErrorResponse',
    },
    detail: {
      tags: ['Images'],
      summary: 'Create image variation',
      description:
        'This endpoint is retired and no longer available. Use the image edits endpoint with a GPT Image model and a prompt to create a variation of an image. The request and response schemas below describe the legacy contract.',
      operationId: 'createImageVariation',
    },
  })
