import { defineHandler } from 'hono/factory'
import * as v from 'valibot'

export const LiffViewSchema = v.pipe(
  v.object({
    type: v.pipe(
      v.picklist(['compact', 'tall', 'full']),
      v.description(
        'Size of the LIFF app view. Specify one of these values:\n- compact\n- tall\n- full\n',
      ),
    ),
    url: v.pipe(
      v.pipe(v.string(), v.url()),
      v.description(
        "Endpoint URL. This is the URL of the web app that implements the LIFF app\n(e.g. https://example.com).\nUsed when the LIFF app is launched using the LIFF URL.\nThe URL scheme must be https. URL fragments (#URL-fragment) can't be specified.\n",
      ),
    ),
    moduleMode: v.optional(
      v.pipe(
        v.boolean(),
        v.description(
          '`true` to use the LIFF app in modular mode.\nWhen in modular mode, the action button in the header is not displayed.\n',
        ),
      ),
    ),
  }),
  v.metadata({
    externalDocs: { url: 'https://developers.line.biz/en/reference/liff-server/#add-liff-app' },
  }),
)

export type LiffView = v.InferOutput<typeof LiffViewSchema>

export const LiffFeaturesSchema = v.pipe(
  v.object({
    ble: v.optional(
      v.pipe(
        v.boolean(),
        v.description(
          '`true` if the LIFF app supports Bluetooth® Low Energy for LINE Things. `false` otherwise.\n',
        ),
      ),
    ),
    qrCode: v.pipe(
      v.optional(v.boolean(), false),
      v.description(
        '`true` to use the 2D code reader in the LIFF app. false otherwise. The default value is `false`.\n',
      ),
    ),
  }),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/liff-server/#get-all-liff-apps',
    },
  }),
)

export type LiffFeatures = v.InferOutput<typeof LiffFeaturesSchema>

export const LiffScopeSchema = v.pipe(
  v.picklist(['openid', 'email', 'profile', 'chat_message.write']),
  v.description(
    'Array of scopes required for some LIFF SDK methods to function.\nThe default value is `["profile", "chat_message.write"]`.\n\n',
  ),
)

export type LiffScope = v.InferOutput<typeof LiffScopeSchema>

export const LiffBotPromptSchema = v.pipe(
  v.picklist(['normal', 'aggressive', 'none']),
  v.description(
    "Specify the setting for bot link feature with one of the following values:\n\n`normal`: Display the option to add the LINE Official Account as a friend in the channel consent screen.\n`aggressive`: Display a screen with the option to add the LINE Official Account as a friend after the channel consent screen.\n`none`: Don't display the option to add the LINE Official Account as a friend.\n  The default value is none.\n",
  ),
)

export type LiffBotPrompt = v.InferOutput<typeof LiffBotPromptSchema>

export const AddLiffAppRequestSchema = v.pipe(
  v.object({
    view: LiffViewSchema,
    description: v.optional(
      v.pipe(
        v.string(),
        v.description(
          'Name of the LIFF app.\n\nThe LIFF app name can\'t include "LINE" or similar strings, or inappropriate strings.\n',
        ),
      ),
    ),
    features: v.optional(LiffFeaturesSchema),
    permanentLinkPattern: v.optional(
      v.pipe(
        v.string(),
        v.description('How additional information in LIFF URLs is handled. Specify `concat`.\n'),
      ),
    ),
    scope: v.optional(v.array(LiffScopeSchema)),
    botPrompt: v.optional(LiffBotPromptSchema),
  }),
  v.metadata({
    externalDocs: { url: 'https://developers.line.biz/en/reference/liff-server/#add-liff-app' },
  }),
)

export type AddLiffAppRequest = v.InferOutput<typeof AddLiffAppRequestSchema>

export const UpdateLiffViewSchema = v.pipe(
  v.partial(
    v.object({
      type: v.pipe(
        v.picklist(['compact', 'tall', 'full']),
        v.description(
          'Size of the LIFF app view. Specify one of these values:\n- compact\n- tall\n- full\n',
        ),
      ),
      url: v.pipe(
        v.pipe(v.string(), v.url()),
        v.description(
          "Endpoint URL. This is the URL of the web app that implements the LIFF app\n(e.g. https://example.com).\nUsed when the LIFF app is launched using the LIFF URL.\nThe URL scheme must be https. URL fragments (#URL-fragment) can't be specified.\n",
        ),
      ),
      moduleMode: v.pipe(
        v.boolean(),
        v.description(
          '`true` to use the LIFF app in modular mode.\nWhen in modular mode, the action button in the header is not displayed.\n',
        ),
      ),
    }),
  ),
  v.metadata({
    externalDocs: { url: 'https://developers.line.biz/en/reference/liff-server/#update-liff-app' },
  }),
)

export type UpdateLiffView = v.InferOutput<typeof UpdateLiffViewSchema>

export const AddLiffAppResponseSchema = v.pipe(
  v.object({ liffId: v.string() }),
  v.metadata({
    externalDocs: { url: 'https://developers.line.biz/en/reference/liff-server/#add-liff-app' },
  }),
)

export type AddLiffAppResponse = v.InferOutput<typeof AddLiffAppResponseSchema>

export const UpdateLiffAppRequestSchema = v.pipe(
  v.partial(
    v.object({
      view: UpdateLiffViewSchema,
      description: v.pipe(
        v.string(),
        v.description(
          'Name of the LIFF app.\n\nThe LIFF app name can\'t include "LINE" or similar strings, or inappropriate strings.\n',
        ),
      ),
      features: LiffFeaturesSchema,
      permanentLinkPattern: v.pipe(
        v.string(),
        v.description('How additional information in LIFF URLs is handled. Specify `concat`.\n'),
      ),
      scope: v.array(LiffScopeSchema),
      botPrompt: LiffBotPromptSchema,
    }),
  ),
  v.metadata({
    externalDocs: { url: 'https://developers.line.biz/en/reference/liff-server/#add-liff-app' },
  }),
)

export type UpdateLiffAppRequest = v.InferOutput<typeof UpdateLiffAppRequestSchema>

export const LiffAppSchema = v.pipe(
  v.partial(
    v.object({
      liffId: v.pipe(v.string(), v.description('LIFF app ID')),
      view: LiffViewSchema,
      description: v.pipe(v.string(), v.description('Name of the LIFF app')),
      features: LiffFeaturesSchema,
      permanentLinkPattern: v.pipe(
        v.string(),
        v.description('How additional information in LIFF URLs is handled. concat is returned.\n'),
      ),
      scope: v.array(LiffScopeSchema),
      botPrompt: LiffBotPromptSchema,
    }),
  ),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/liff-server/#get-all-liff-apps',
    },
  }),
)

export type LiffApp = v.InferOutput<typeof LiffAppSchema>

export const GetAllLiffAppsResponseSchema = v.pipe(
  v.partial(v.object({ apps: v.array(LiffAppSchema) })),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/liff-server/#get-all-liff-apps',
    },
  }),
)

export type GetAllLiffAppsResponse = v.InferOutput<typeof GetAllLiffAppsResponseSchema>

export const BearerSecurityScheme = {
  type: 'http',
  scheme: 'bearer',
  description: 'Channel access token',
}

export const getLiffV1AppsHandler = defineHandler({ response: GetAllLiffAppsResponseSchema })

export const postLiffV1AppsHandler = defineHandler({
  json: AddLiffAppRequestSchema,
  response: AddLiffAppResponseSchema,
})

export const putLiffV1AppsLiffIdHandler = defineHandler({
  param: v.object({ liffId: v.string() }),
  json: UpdateLiffAppRequestSchema,
})

export const deleteLiffV1AppsLiffIdHandler = defineHandler({
  param: v.object({ liffId: v.string() }),
})
