import * as z from 'zod'

export const LiffViewSchema = z
  .object({
    type: z
      .enum(['compact', 'tall', 'full'])
      .meta({
        description:
          'Size of the LIFF app view. Specify one of these values:\n- compact\n- tall\n- full\n',
      }),
    url: z
      .url()
      .meta({
        description:
          "Endpoint URL. This is the URL of the web app that implements the LIFF app\n(e.g. https://example.com).\nUsed when the LIFF app is launched using the LIFF URL.\nThe URL scheme must be https. URL fragments (#URL-fragment) can't be specified.\n",
      }),
    moduleMode: z
      .boolean()
      .meta({
        description:
          '`true` to use the LIFF app in modular mode.\nWhen in modular mode, the action button in the header is not displayed.\n',
      })
      .exactOptional(),
  })
  .meta({
    externalDocs: { url: 'https://developers.line.biz/en/reference/liff-server/#add-liff-app' },
  })

export type LiffView = z.infer<typeof LiffViewSchema>

export const LiffFeaturesSchema = z
  .object({
    ble: z
      .boolean()
      .meta({
        description:
          '`true` if the LIFF app supports Bluetooth® Low Energy for LINE Things. `false` otherwise.\n',
      })
      .exactOptional(),
    qrCode: z
      .boolean()
      .default(false)
      .meta({
        description:
          '`true` to use the 2D code reader in the LIFF app. false otherwise. The default value is `false`.\n',
      })
      .exactOptional(),
  })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/liff-server/#get-all-liff-apps',
    },
  })

export type LiffFeatures = z.infer<typeof LiffFeaturesSchema>

export const LiffScopeSchema = z
  .enum(['openid', 'email', 'profile', 'chat_message.write'])
  .meta({
    description:
      'Array of scopes required for some LIFF SDK methods to function.\nThe default value is `["profile", "chat_message.write"]`.\n\n',
  })

export type LiffScope = z.infer<typeof LiffScopeSchema>

export const LiffBotPromptSchema = z
  .enum(['normal', 'aggressive', 'none'])
  .meta({
    description:
      "Specify the setting for bot link feature with one of the following values:\n\n`normal`: Display the option to add the LINE Official Account as a friend in the channel consent screen.\n`aggressive`: Display a screen with the option to add the LINE Official Account as a friend after the channel consent screen.\n`none`: Don't display the option to add the LINE Official Account as a friend.\n  The default value is none.\n",
  })

export type LiffBotPrompt = z.infer<typeof LiffBotPromptSchema>

export const AddLiffAppRequestSchema = z
  .object({
    view: LiffViewSchema,
    description: z
      .string()
      .meta({
        description:
          'Name of the LIFF app.\n\nThe LIFF app name can\'t include "LINE" or similar strings, or inappropriate strings.\n',
      })
      .exactOptional(),
    features: LiffFeaturesSchema.exactOptional(),
    permanentLinkPattern: z
      .string()
      .meta({
        description: 'How additional information in LIFF URLs is handled. Specify `concat`.\n',
      })
      .exactOptional(),
    scope: z.array(LiffScopeSchema).exactOptional(),
    botPrompt: LiffBotPromptSchema.exactOptional(),
  })
  .meta({
    externalDocs: { url: 'https://developers.line.biz/en/reference/liff-server/#add-liff-app' },
  })

export type AddLiffAppRequest = z.infer<typeof AddLiffAppRequestSchema>

export const UpdateLiffViewSchema = z
  .object({
    type: z
      .enum(['compact', 'tall', 'full'])
      .meta({
        description:
          'Size of the LIFF app view. Specify one of these values:\n- compact\n- tall\n- full\n',
      })
      .exactOptional(),
    url: z
      .url()
      .meta({
        description:
          "Endpoint URL. This is the URL of the web app that implements the LIFF app\n(e.g. https://example.com).\nUsed when the LIFF app is launched using the LIFF URL.\nThe URL scheme must be https. URL fragments (#URL-fragment) can't be specified.\n",
      })
      .exactOptional(),
    moduleMode: z
      .boolean()
      .meta({
        description:
          '`true` to use the LIFF app in modular mode.\nWhen in modular mode, the action button in the header is not displayed.\n',
      })
      .exactOptional(),
  })
  .meta({
    externalDocs: { url: 'https://developers.line.biz/en/reference/liff-server/#update-liff-app' },
  })

export type UpdateLiffView = z.infer<typeof UpdateLiffViewSchema>

export const AddLiffAppResponseSchema = z
  .object({ liffId: z.string() })
  .meta({
    externalDocs: { url: 'https://developers.line.biz/en/reference/liff-server/#add-liff-app' },
  })

export type AddLiffAppResponse = z.infer<typeof AddLiffAppResponseSchema>

export const UpdateLiffAppRequestSchema = z
  .object({
    view: UpdateLiffViewSchema.exactOptional(),
    description: z
      .string()
      .meta({
        description:
          'Name of the LIFF app.\n\nThe LIFF app name can\'t include "LINE" or similar strings, or inappropriate strings.\n',
      })
      .exactOptional(),
    features: LiffFeaturesSchema.exactOptional(),
    permanentLinkPattern: z
      .string()
      .meta({
        description: 'How additional information in LIFF URLs is handled. Specify `concat`.\n',
      })
      .exactOptional(),
    scope: z.array(LiffScopeSchema).exactOptional(),
    botPrompt: LiffBotPromptSchema.exactOptional(),
  })
  .meta({
    externalDocs: { url: 'https://developers.line.biz/en/reference/liff-server/#add-liff-app' },
  })

export type UpdateLiffAppRequest = z.infer<typeof UpdateLiffAppRequestSchema>

export const LiffAppSchema = z
  .object({
    liffId: z.string().meta({ description: 'LIFF app ID' }).exactOptional(),
    view: LiffViewSchema.exactOptional(),
    description: z.string().meta({ description: 'Name of the LIFF app' }).exactOptional(),
    features: LiffFeaturesSchema.exactOptional(),
    permanentLinkPattern: z
      .string()
      .meta({
        description: 'How additional information in LIFF URLs is handled. concat is returned.\n',
      })
      .exactOptional(),
    scope: z.array(LiffScopeSchema).exactOptional(),
    botPrompt: LiffBotPromptSchema.exactOptional(),
  })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/liff-server/#get-all-liff-apps',
    },
  })

export type LiffApp = z.infer<typeof LiffAppSchema>

export const GetAllLiffAppsResponseSchema = z
  .object({ apps: z.array(LiffAppSchema).exactOptional() })
  .meta({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/liff-server/#get-all-liff-apps',
    },
  })

export type GetAllLiffAppsResponse = z.infer<typeof GetAllLiffAppsResponseSchema>

export const BearerSecurityScheme = {
  type: 'http',
  scheme: 'bearer',
  description: 'Channel access token',
}
