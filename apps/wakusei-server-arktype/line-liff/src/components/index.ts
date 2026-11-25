import { type } from 'arktype'

export const LiffViewSchema = type({
  type: type("'compact' | 'tall' | 'full'").describe(
    'Size of the LIFF app view. Specify one of these values:\n- compact\n- tall\n- full\n',
  ),
  url: type('string.url').describe(
    "Endpoint URL. This is the URL of the web app that implements the LIFF app\n(e.g. https://example.com).\nUsed when the LIFF app is launched using the LIFF URL.\nThe URL scheme must be https. URL fragments (#URL-fragment) can't be specified.\n",
  ),
  'moduleMode?': type('boolean').describe(
    '`true` to use the LIFF app in modular mode.\nWhen in modular mode, the action button in the header is not displayed.\n',
  ),
})

export type LiffViewSchema = typeof LiffViewSchema.infer

export const LiffFeaturesSchema = type({
  'ble?': type('boolean').describe(
    '`true` if the LIFF app supports Bluetooth® Low Energy for LINE Things. `false` otherwise.\n',
  ),
  'qrCode?': type('boolean').describe(
    '`true` to use the 2D code reader in the LIFF app. false otherwise. The default value is `false`.\n',
  ),
})

export type LiffFeaturesSchema = typeof LiffFeaturesSchema.infer

export const LiffScopeSchema = type(
  "'openid' | 'email' | 'profile' | 'chat_message.write'",
).describe(
  'Array of scopes required for some LIFF SDK methods to function.\nThe default value is `["profile", "chat_message.write"]`.\n\n',
)

export type LiffScopeSchema = typeof LiffScopeSchema.infer

export const LiffBotPromptSchema = type("'normal' | 'aggressive' | 'none'").describe(
  "Specify the setting for bot link feature with one of the following values:\n\n`normal`: Display the option to add the LINE Official Account as a friend in the channel consent screen.\n`aggressive`: Display a screen with the option to add the LINE Official Account as a friend after the channel consent screen.\n`none`: Don't display the option to add the LINE Official Account as a friend.\n  The default value is none.\n",
)

export type LiffBotPromptSchema = typeof LiffBotPromptSchema.infer

export const AddLiffAppRequestSchema = type({
  view: LiffViewSchema,
  'description?': type('string').describe(
    'Name of the LIFF app.\n\nThe LIFF app name can\'t include "LINE" or similar strings, or inappropriate strings.\n',
  ),
  'features?': LiffFeaturesSchema,
  'permanentLinkPattern?': type('string').describe(
    'How additional information in LIFF URLs is handled. Specify `concat`.\n',
  ),
  'scope?': type(LiffScopeSchema).array(),
  'botPrompt?': LiffBotPromptSchema,
})

export type AddLiffAppRequestSchema = typeof AddLiffAppRequestSchema.infer

export const UpdateLiffViewSchema = type({
  'type?': type("'compact' | 'tall' | 'full'").describe(
    'Size of the LIFF app view. Specify one of these values:\n- compact\n- tall\n- full\n',
  ),
  'url?': type('string.url').describe(
    "Endpoint URL. This is the URL of the web app that implements the LIFF app\n(e.g. https://example.com).\nUsed when the LIFF app is launched using the LIFF URL.\nThe URL scheme must be https. URL fragments (#URL-fragment) can't be specified.\n",
  ),
  'moduleMode?': type('boolean').describe(
    '`true` to use the LIFF app in modular mode.\nWhen in modular mode, the action button in the header is not displayed.\n',
  ),
})

export type UpdateLiffViewSchema = typeof UpdateLiffViewSchema.infer

export const AddLiffAppResponseSchema = type({ liffId: 'string' })

export type AddLiffAppResponseSchema = typeof AddLiffAppResponseSchema.infer

export const UpdateLiffAppRequestSchema = type({
  'view?': UpdateLiffViewSchema,
  'description?': type('string').describe(
    'Name of the LIFF app.\n\nThe LIFF app name can\'t include "LINE" or similar strings, or inappropriate strings.\n',
  ),
  'features?': LiffFeaturesSchema,
  'permanentLinkPattern?': type('string').describe(
    'How additional information in LIFF URLs is handled. Specify `concat`.\n',
  ),
  'scope?': type(LiffScopeSchema).array(),
  'botPrompt?': LiffBotPromptSchema,
})

export type UpdateLiffAppRequestSchema = typeof UpdateLiffAppRequestSchema.infer

export const LiffAppSchema = type({
  'liffId?': type('string').describe('LIFF app ID'),
  'view?': LiffViewSchema,
  'description?': type('string').describe('Name of the LIFF app'),
  'features?': LiffFeaturesSchema,
  'permanentLinkPattern?': type('string').describe(
    'How additional information in LIFF URLs is handled. concat is returned.\n',
  ),
  'scope?': type(LiffScopeSchema).array(),
  'botPrompt?': LiffBotPromptSchema,
})

export type LiffAppSchema = typeof LiffAppSchema.infer

export const GetAllLiffAppsResponseSchema = type({ 'apps?': type(LiffAppSchema).array() })

export type GetAllLiffAppsResponseSchema = typeof GetAllLiffAppsResponseSchema.infer
