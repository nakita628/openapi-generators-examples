import { defineHandler } from 'hono/factory'
import { Effect, Schema } from 'effect'

export const LiffViewSchema = Schema.Struct({
  type: Schema.Literals(['compact', 'tall', 'full']).annotate({
    description:
      'Size of the LIFF app view. Specify one of these values:\n- compact\n- tall\n- full\n',
  }),
  url: Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
    description:
      "Endpoint URL. This is the URL of the web app that implements the LIFF app\n(e.g. https://example.com).\nUsed when the LIFF app is launched using the LIFF URL.\nThe URL scheme must be https. URL fragments (#URL-fragment) can't be specified.\n",
  }),
  moduleMode: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        '`true` to use the LIFF app in modular mode.\nWhen in modular mode, the action button in the header is not displayed.\n',
    }),
  ),
}).annotate({
  jsonSchemaExternalDocs: {
    url: 'https://developers.line.biz/en/reference/liff-server/#add-liff-app',
  },
})

export type LiffView = Schema.Schema.Type<typeof LiffViewSchema>

export const LiffFeaturesSchema = Schema.Struct({
  ble: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        '`true` if the LIFF app supports Bluetooth® Low Energy for LINE Things. `false` otherwise.\n',
    }),
  ),
  qrCode: Schema.Boolean.pipe(Schema.withDecodingDefault(Effect.succeed(false))).annotate({
    description:
      '`true` to use the 2D code reader in the LIFF app. false otherwise. The default value is `false`.\n',
  }),
}).annotate({
  jsonSchemaExternalDocs: {
    url: 'https://developers.line.biz/en/reference/liff-server/#get-all-liff-apps',
  },
})

export type LiffFeatures = Schema.Schema.Type<typeof LiffFeaturesSchema>

export const LiffScopeSchema = Schema.Literals([
  'openid',
  'email',
  'profile',
  'chat_message.write',
]).annotate({
  description:
    'Array of scopes required for some LIFF SDK methods to function.\nThe default value is `["profile", "chat_message.write"]`.\n\n',
})

export type LiffScope = Schema.Schema.Type<typeof LiffScopeSchema>

export const LiffBotPromptSchema = Schema.Literals(['normal', 'aggressive', 'none']).annotate({
  description:
    "Specify the setting for bot link feature with one of the following values:\n\n`normal`: Display the option to add the LINE Official Account as a friend in the channel consent screen.\n`aggressive`: Display a screen with the option to add the LINE Official Account as a friend after the channel consent screen.\n`none`: Don't display the option to add the LINE Official Account as a friend.\n  The default value is none.\n",
})

export type LiffBotPrompt = Schema.Schema.Type<typeof LiffBotPromptSchema>

export const AddLiffAppRequestSchema = Schema.Struct({
  view: LiffViewSchema,
  description: Schema.optionalKey(
    Schema.String.annotate({
      description:
        'Name of the LIFF app.\n\nThe LIFF app name can\'t include "LINE" or similar strings, or inappropriate strings.\n',
    }),
  ),
  features: Schema.optionalKey(LiffFeaturesSchema),
  permanentLinkPattern: Schema.optionalKey(
    Schema.String.annotate({
      description: 'How additional information in LIFF URLs is handled. Specify `concat`.\n',
    }),
  ),
  scope: Schema.optionalKey(Schema.Array(LiffScopeSchema)),
  botPrompt: Schema.optionalKey(LiffBotPromptSchema),
}).annotate({
  jsonSchemaExternalDocs: {
    url: 'https://developers.line.biz/en/reference/liff-server/#add-liff-app',
  },
})

export type AddLiffAppRequest = Schema.Schema.Type<typeof AddLiffAppRequestSchema>

export const UpdateLiffViewSchema = Schema.Struct({
  type: Schema.optionalKey(
    Schema.Literals(['compact', 'tall', 'full']).annotate({
      description:
        'Size of the LIFF app view. Specify one of these values:\n- compact\n- tall\n- full\n',
    }),
  ),
  url: Schema.optionalKey(
    Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
      description:
        "Endpoint URL. This is the URL of the web app that implements the LIFF app\n(e.g. https://example.com).\nUsed when the LIFF app is launched using the LIFF URL.\nThe URL scheme must be https. URL fragments (#URL-fragment) can't be specified.\n",
    }),
  ),
  moduleMode: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        '`true` to use the LIFF app in modular mode.\nWhen in modular mode, the action button in the header is not displayed.\n',
    }),
  ),
}).annotate({
  jsonSchemaExternalDocs: {
    url: 'https://developers.line.biz/en/reference/liff-server/#update-liff-app',
  },
})

export type UpdateLiffView = Schema.Schema.Type<typeof UpdateLiffViewSchema>

export const AddLiffAppResponseSchema = Schema.Struct({ liffId: Schema.String }).annotate({
  jsonSchemaExternalDocs: {
    url: 'https://developers.line.biz/en/reference/liff-server/#add-liff-app',
  },
})

export type AddLiffAppResponse = Schema.Schema.Type<typeof AddLiffAppResponseSchema>

export const UpdateLiffAppRequestSchema = Schema.Struct({
  view: Schema.optionalKey(UpdateLiffViewSchema),
  description: Schema.optionalKey(
    Schema.String.annotate({
      description:
        'Name of the LIFF app.\n\nThe LIFF app name can\'t include "LINE" or similar strings, or inappropriate strings.\n',
    }),
  ),
  features: Schema.optionalKey(LiffFeaturesSchema),
  permanentLinkPattern: Schema.optionalKey(
    Schema.String.annotate({
      description: 'How additional information in LIFF URLs is handled. Specify `concat`.\n',
    }),
  ),
  scope: Schema.optionalKey(Schema.Array(LiffScopeSchema)),
  botPrompt: Schema.optionalKey(LiffBotPromptSchema),
}).annotate({
  jsonSchemaExternalDocs: {
    url: 'https://developers.line.biz/en/reference/liff-server/#add-liff-app',
  },
})

export type UpdateLiffAppRequest = Schema.Schema.Type<typeof UpdateLiffAppRequestSchema>

export const LiffAppSchema = Schema.Struct({
  liffId: Schema.optionalKey(Schema.String.annotate({ description: 'LIFF app ID' })),
  view: Schema.optionalKey(LiffViewSchema),
  description: Schema.optionalKey(Schema.String.annotate({ description: 'Name of the LIFF app' })),
  features: Schema.optionalKey(LiffFeaturesSchema),
  permanentLinkPattern: Schema.optionalKey(
    Schema.String.annotate({
      description: 'How additional information in LIFF URLs is handled. concat is returned.\n',
    }),
  ),
  scope: Schema.optionalKey(Schema.Array(LiffScopeSchema)),
  botPrompt: Schema.optionalKey(LiffBotPromptSchema),
}).annotate({
  jsonSchemaExternalDocs: {
    url: 'https://developers.line.biz/en/reference/liff-server/#get-all-liff-apps',
  },
})

export type LiffApp = Schema.Schema.Type<typeof LiffAppSchema>

export const GetAllLiffAppsResponseSchema = Schema.Struct({
  apps: Schema.optionalKey(Schema.Array(LiffAppSchema)),
}).annotate({
  jsonSchemaExternalDocs: {
    url: 'https://developers.line.biz/en/reference/liff-server/#get-all-liff-apps',
  },
})

export type GetAllLiffAppsResponse = Schema.Schema.Type<typeof GetAllLiffAppsResponseSchema>

export const BearerSecurityScheme = {
  type: 'http',
  scheme: 'bearer',
  description: 'Channel access token',
}

export const getLiffV1AppsHandler = defineHandler({
  response: Schema.toStandardSchemaV1(GetAllLiffAppsResponseSchema),
})

export const postLiffV1AppsHandler = defineHandler({
  json: Schema.toStandardSchemaV1(AddLiffAppRequestSchema),
  response: Schema.toStandardSchemaV1(AddLiffAppResponseSchema),
})

export const putLiffV1AppsLiffIdHandler = defineHandler({
  param: Schema.toStandardSchemaV1(Schema.Struct({ liffId: Schema.String })),
  json: Schema.toStandardSchemaV1(UpdateLiffAppRequestSchema),
})

export const deleteLiffV1AppsLiffIdHandler = defineHandler({
  param: Schema.toStandardSchemaV1(Schema.Struct({ liffId: Schema.String })),
})
