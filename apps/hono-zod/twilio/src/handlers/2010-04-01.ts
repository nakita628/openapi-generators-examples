import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'
import {
  AccountEnumStatusSchema,
  CallEnumStatusSchema,
  CallEnumUpdateStatusSchema,
  CallRecordingEnumStatusSchema,
  ConferenceEnumStatusSchema,
  ConferenceEnumUpdateStatusSchema,
  ConferenceRecordingEnumStatusSchema,
  ConnectAppEnumPermissionSchema,
  IncomingPhoneNumberEnumEmergencyStatusSchema,
  IncomingPhoneNumberEnumVoiceReceiveModeSchema,
  IncomingPhoneNumberLocalEnumEmergencyStatusSchema,
  IncomingPhoneNumberLocalEnumVoiceReceiveModeSchema,
  IncomingPhoneNumberMobileEnumEmergencyStatusSchema,
  IncomingPhoneNumberMobileEnumVoiceReceiveModeSchema,
  IncomingPhoneNumberTollFreeEnumEmergencyStatusSchema,
  IncomingPhoneNumberTollFreeEnumVoiceReceiveModeSchema,
  MessageEnumUpdateStatusSchema,
  MessageEnumContentRetentionSchema,
  MessageEnumAddressRetentionSchema,
  MessageEnumTrafficTypeSchema,
  MessageEnumScheduleTypeSchema,
  MessageEnumRiskCheckSchema,
  MessageFeedbackEnumOutcomeSchema,
  PaymentsEnumPaymentMethodSchema,
  PaymentsEnumBankAccountTypeSchema,
  PaymentsEnumTokenTypeSchema,
  PaymentsEnumCaptureSchema,
  PaymentsEnumStatusSchema,
  RealtimeTranscriptionEnumTrackSchema,
  RealtimeTranscriptionEnumUpdateStatusSchema,
  SiprecEnumTrackSchema,
  SiprecEnumUpdateStatusSchema,
  StreamEnumTrackSchema,
  StreamEnumUpdateStatusSchema,
  UsageTriggerEnumRecurringSchema,
  UsageTriggerEnumTriggerFieldSchema,
} from '../components'

export const _20100401Handler = new Hono()
  .get(
    '/2010-04-01/Accounts.json',
    sValidator(
      'query',
      z.object({
        FriendlyName: z.string().exactOptional(),
        Status: AccountEnumStatusSchema.exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts.json',
    sValidator(
      'form',
      z.object({
        FriendlyName: z
          .string()
          .meta({
            description:
              'A human readable description of the account to create, defaults to `SubAccount Created at {YYYY-MM-DD HH:MM meridian}`',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:Sid.json',
    sValidator(
      'param',
      z.object({
        Sid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:Sid.json',
    sValidator(
      'param',
      z.object({
        Sid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'form',
      z.object({
        FriendlyName: z
          .string()
          .meta({ description: 'Update the human-readable description of this Account' })
          .exactOptional(),
        Status: AccountEnumStatusSchema.exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Addresses.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        CustomerName: z.string().exactOptional(),
        FriendlyName: z.string().exactOptional(),
        EmergencyEnabled: z.stringbool().exactOptional(),
        IsoCountry: z.string().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Addresses.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'form',
      z.object({
        CustomerName: z
          .string()
          .meta({ description: 'The name to associate with the new address.' }),
        Street: z
          .string()
          .meta({ description: 'The number and street address of the new address.' }),
        City: z.string().meta({ description: 'The city of the new address.' }),
        Region: z.string().meta({ description: 'The state or region of the new address.' }),
        PostalCode: z.string().meta({ description: 'The postal code of the new address.' }),
        IsoCountry: z.string().meta({ description: 'The ISO country code of the new address.' }),
        FriendlyName: z
          .string()
          .meta({
            description:
              'A descriptive string that you create to describe the new address. It can be up to 64 characters long for Regulatory Compliance addresses and 32 characters long for Emergency addresses.',
          })
          .exactOptional(),
        EmergencyEnabled: z
          .stringbool()
          .meta({
            description:
              'Whether to enable emergency calling on the new address. Can be: `true` or `false`.',
          })
          .exactOptional(),
        AutoCorrectAddress: z
          .stringbool()
          .meta({
            description:
              "Whether we should automatically correct the address. Can be: `true` or `false` and the default is `true`. If empty or `true`, we will correct the address you provide if necessary. If `false`, we won't alter the address you provide.",
          })
          .exactOptional(),
        StreetSecondary: z
          .string()
          .meta({ description: 'The additional number and street address of the address.' })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Addresses/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^AD[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Addresses/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^AD[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'form',
      z.object({
        FriendlyName: z
          .string()
          .meta({
            description:
              'A descriptive string that you create to describe the new address. It can be up to 64 characters long for Regulatory Compliance addresses and 32 characters long for Emergency addresses.',
          })
          .exactOptional(),
        CustomerName: z
          .string()
          .meta({ description: 'The name to associate with the address.' })
          .exactOptional(),
        Street: z
          .string()
          .meta({ description: 'The number and street address of the address.' })
          .exactOptional(),
        City: z.string().meta({ description: 'The city of the address.' }).exactOptional(),
        Region: z
          .string()
          .meta({ description: 'The state or region of the address.' })
          .exactOptional(),
        PostalCode: z
          .string()
          .meta({ description: 'The postal code of the address.' })
          .exactOptional(),
        EmergencyEnabled: z
          .stringbool()
          .meta({
            description:
              'Whether to enable emergency calling on the address. Can be: `true` or `false`.',
          })
          .exactOptional(),
        AutoCorrectAddress: z
          .stringbool()
          .meta({
            description:
              "Whether we should automatically correct the address. Can be: `true` or `false` and the default is `true`. If empty or `true`, we will correct the address you provide if necessary. If `false`, we won't alter the address you provide.",
          })
          .exactOptional(),
        StreetSecondary: z
          .string()
          .meta({ description: 'The additional number and street address of the address.' })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Addresses/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^AD[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Applications.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        FriendlyName: z.string().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Applications.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'form',
      z.object({
        ApiVersion: z
          .string()
          .meta({
            description:
              "The API version to use to start a new TwiML session. Can be: `2010-04-01` or `2008-08-01`. The default value is the account's default API version.",
          })
          .exactOptional(),
        VoiceUrl: z
          .url()
          .meta({
            description:
              'The URL we should call when the phone number assigned to this application receives a call.',
          })
          .exactOptional(),
        VoiceMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method we should use to call `voice_url`. Can be: `GET` or `POST`.',
          })
          .exactOptional(),
        VoiceFallbackUrl: z
          .url()
          .meta({
            description:
              'The URL that we should call when an error occurs retrieving or executing the TwiML requested by `url`.',
          })
          .exactOptional(),
        VoiceFallbackMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method we should use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
          })
          .exactOptional(),
        StatusCallback: z
          .url()
          .meta({
            description:
              'The URL we should call using the `status_callback_method` to send status information to your application.',
          })
          .exactOptional(),
        StatusCallbackMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST`.',
          })
          .exactOptional(),
        VoiceCallerIdLookup: z
          .stringbool()
          .meta({
            description:
              "Whether we should look up the caller's caller-ID name from the CNAM database (additional charges apply). Can be: `true` or `false`.",
          })
          .exactOptional(),
        SmsUrl: z
          .url()
          .meta({
            description:
              'The URL we should call when the phone number receives an incoming SMS message.',
          })
          .exactOptional(),
        SmsMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method we should use to call `sms_url`. Can be: `GET` or `POST`.',
          })
          .exactOptional(),
        SmsFallbackUrl: z
          .url()
          .meta({
            description:
              'The URL that we should call when an error occurs while retrieving or executing the TwiML from `sms_url`.',
          })
          .exactOptional(),
        SmsFallbackMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method we should use to call `sms_fallback_url`. Can be: `GET` or `POST`.',
          })
          .exactOptional(),
        SmsStatusCallback: z
          .url()
          .meta({
            description:
              'The URL we should call using a POST method to send status information about SMS messages sent by the application.',
          })
          .exactOptional(),
        MessageStatusCallback: z
          .url()
          .meta({
            description:
              'The URL we should call using a POST method to send message status information to your application.',
          })
          .exactOptional(),
        FriendlyName: z
          .string()
          .meta({
            description:
              'A descriptive string that you create to describe the new application. It can be up to 64 characters long.',
          })
          .exactOptional(),
        PublicApplicationConnectEnabled: z
          .stringbool()
          .meta({
            description:
              'Whether to allow other Twilio accounts to dial this applicaton using Dial verb. Can be: `true` or `false`.',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Applications/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^AP[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Applications/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^AP[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'form',
      z.object({
        FriendlyName: z
          .string()
          .meta({
            description:
              'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
          })
          .exactOptional(),
        ApiVersion: z
          .string()
          .meta({
            description:
              "The API version to use to start a new TwiML session. Can be: `2010-04-01` or `2008-08-01`. The default value is your account's default API version.",
          })
          .exactOptional(),
        VoiceUrl: z
          .url()
          .meta({
            description:
              'The URL we should call when the phone number assigned to this application receives a call.',
          })
          .exactOptional(),
        VoiceMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method we should use to call `voice_url`. Can be: `GET` or `POST`.',
          })
          .exactOptional(),
        VoiceFallbackUrl: z
          .url()
          .meta({
            description:
              'The URL that we should call when an error occurs retrieving or executing the TwiML requested by `url`.',
          })
          .exactOptional(),
        VoiceFallbackMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method we should use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
          })
          .exactOptional(),
        StatusCallback: z
          .url()
          .meta({
            description:
              'The URL we should call using the `status_callback_method` to send status information to your application.',
          })
          .exactOptional(),
        StatusCallbackMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST`.',
          })
          .exactOptional(),
        VoiceCallerIdLookup: z
          .stringbool()
          .meta({
            description:
              "Whether we should look up the caller's caller-ID name from the CNAM database (additional charges apply). Can be: `true` or `false`.",
          })
          .exactOptional(),
        SmsUrl: z
          .url()
          .meta({
            description:
              'The URL we should call when the phone number receives an incoming SMS message.',
          })
          .exactOptional(),
        SmsMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method we should use to call `sms_url`. Can be: `GET` or `POST`.',
          })
          .exactOptional(),
        SmsFallbackUrl: z
          .url()
          .meta({
            description:
              'The URL that we should call when an error occurs while retrieving or executing the TwiML from `sms_url`.',
          })
          .exactOptional(),
        SmsFallbackMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method we should use to call `sms_fallback_url`. Can be: `GET` or `POST`.',
          })
          .exactOptional(),
        SmsStatusCallback: z
          .url()
          .meta({
            description:
              'Same as message_status_callback: The URL we should call using a POST method to send status information about SMS messages sent by the application. Deprecated, included for backwards compatibility.',
          })
          .exactOptional(),
        MessageStatusCallback: z
          .url()
          .meta({
            description:
              'The URL we should call using a POST method to send message status information to your application.',
          })
          .exactOptional(),
        PublicApplicationConnectEnabled: z
          .stringbool()
          .meta({
            description:
              'Whether to allow other Twilio accounts to dial this applicaton using Dial verb. Can be: `true` or `false`.',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Applications/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^AP[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AuthorizedConnectApps/:ConnectAppSid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        ConnectAppSid: z
          .string()
          .regex(/^CN[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AuthorizedConnectApps.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CountryCode: z.string(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/Local.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CountryCode: z.string(),
      }),
    ),
    sValidator(
      'query',
      z.object({
        AreaCode: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .exactOptional(),
        Contains: z.string().exactOptional(),
        SmsEnabled: z.stringbool().exactOptional(),
        MmsEnabled: z.stringbool().exactOptional(),
        VoiceEnabled: z.stringbool().exactOptional(),
        ExcludeAllAddressRequired: z.stringbool().exactOptional(),
        ExcludeLocalAddressRequired: z.stringbool().exactOptional(),
        ExcludeForeignAddressRequired: z.stringbool().exactOptional(),
        Beta: z.stringbool().exactOptional(),
        NearNumber: z.string().exactOptional(),
        NearLatLong: z.string().exactOptional(),
        Distance: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .exactOptional(),
        InPostalCode: z.string().exactOptional(),
        InRegion: z.string().exactOptional(),
        InRateCenter: z.string().exactOptional(),
        InLata: z.string().exactOptional(),
        InLocality: z.string().exactOptional(),
        FaxEnabled: z.stringbool().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/MachineToMachine.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CountryCode: z.string(),
      }),
    ),
    sValidator(
      'query',
      z.object({
        AreaCode: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .exactOptional(),
        Contains: z.string().exactOptional(),
        SmsEnabled: z.stringbool().exactOptional(),
        MmsEnabled: z.stringbool().exactOptional(),
        VoiceEnabled: z.stringbool().exactOptional(),
        ExcludeAllAddressRequired: z.stringbool().exactOptional(),
        ExcludeLocalAddressRequired: z.stringbool().exactOptional(),
        ExcludeForeignAddressRequired: z.stringbool().exactOptional(),
        Beta: z.stringbool().exactOptional(),
        NearNumber: z.string().exactOptional(),
        NearLatLong: z.string().exactOptional(),
        Distance: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .exactOptional(),
        InPostalCode: z.string().exactOptional(),
        InRegion: z.string().exactOptional(),
        InRateCenter: z.string().exactOptional(),
        InLata: z.string().exactOptional(),
        InLocality: z.string().exactOptional(),
        FaxEnabled: z.stringbool().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/Mobile.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CountryCode: z.string(),
      }),
    ),
    sValidator(
      'query',
      z.object({
        AreaCode: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .exactOptional(),
        Contains: z.string().exactOptional(),
        SmsEnabled: z.stringbool().exactOptional(),
        MmsEnabled: z.stringbool().exactOptional(),
        VoiceEnabled: z.stringbool().exactOptional(),
        ExcludeAllAddressRequired: z.stringbool().exactOptional(),
        ExcludeLocalAddressRequired: z.stringbool().exactOptional(),
        ExcludeForeignAddressRequired: z.stringbool().exactOptional(),
        Beta: z.stringbool().exactOptional(),
        NearNumber: z.string().exactOptional(),
        NearLatLong: z.string().exactOptional(),
        Distance: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .exactOptional(),
        InPostalCode: z.string().exactOptional(),
        InRegion: z.string().exactOptional(),
        InRateCenter: z.string().exactOptional(),
        InLata: z.string().exactOptional(),
        InLocality: z.string().exactOptional(),
        FaxEnabled: z.stringbool().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/National.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CountryCode: z.string(),
      }),
    ),
    sValidator(
      'query',
      z.object({
        AreaCode: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .exactOptional(),
        Contains: z.string().exactOptional(),
        SmsEnabled: z.stringbool().exactOptional(),
        MmsEnabled: z.stringbool().exactOptional(),
        VoiceEnabled: z.stringbool().exactOptional(),
        ExcludeAllAddressRequired: z.stringbool().exactOptional(),
        ExcludeLocalAddressRequired: z.stringbool().exactOptional(),
        ExcludeForeignAddressRequired: z.stringbool().exactOptional(),
        Beta: z.stringbool().exactOptional(),
        NearNumber: z.string().exactOptional(),
        NearLatLong: z.string().exactOptional(),
        Distance: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .exactOptional(),
        InPostalCode: z.string().exactOptional(),
        InRegion: z.string().exactOptional(),
        InRateCenter: z.string().exactOptional(),
        InLata: z.string().exactOptional(),
        InLocality: z.string().exactOptional(),
        FaxEnabled: z.stringbool().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/SharedCost.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CountryCode: z.string(),
      }),
    ),
    sValidator(
      'query',
      z.object({
        AreaCode: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .exactOptional(),
        Contains: z.string().exactOptional(),
        SmsEnabled: z.stringbool().exactOptional(),
        MmsEnabled: z.stringbool().exactOptional(),
        VoiceEnabled: z.stringbool().exactOptional(),
        ExcludeAllAddressRequired: z.stringbool().exactOptional(),
        ExcludeLocalAddressRequired: z.stringbool().exactOptional(),
        ExcludeForeignAddressRequired: z.stringbool().exactOptional(),
        Beta: z.stringbool().exactOptional(),
        NearNumber: z.string().exactOptional(),
        NearLatLong: z.string().exactOptional(),
        Distance: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .exactOptional(),
        InPostalCode: z.string().exactOptional(),
        InRegion: z.string().exactOptional(),
        InRateCenter: z.string().exactOptional(),
        InLata: z.string().exactOptional(),
        InLocality: z.string().exactOptional(),
        FaxEnabled: z.stringbool().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/TollFree.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CountryCode: z.string(),
      }),
    ),
    sValidator(
      'query',
      z.object({
        AreaCode: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .exactOptional(),
        Contains: z.string().exactOptional(),
        SmsEnabled: z.stringbool().exactOptional(),
        MmsEnabled: z.stringbool().exactOptional(),
        VoiceEnabled: z.stringbool().exactOptional(),
        ExcludeAllAddressRequired: z.stringbool().exactOptional(),
        ExcludeLocalAddressRequired: z.stringbool().exactOptional(),
        ExcludeForeignAddressRequired: z.stringbool().exactOptional(),
        Beta: z.stringbool().exactOptional(),
        NearNumber: z.string().exactOptional(),
        NearLatLong: z.string().exactOptional(),
        Distance: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .exactOptional(),
        InPostalCode: z.string().exactOptional(),
        InRegion: z.string().exactOptional(),
        InRateCenter: z.string().exactOptional(),
        InLata: z.string().exactOptional(),
        InLocality: z.string().exactOptional(),
        FaxEnabled: z.stringbool().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/Voip.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CountryCode: z.string(),
      }),
    ),
    sValidator(
      'query',
      z.object({
        AreaCode: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .exactOptional(),
        Contains: z.string().exactOptional(),
        SmsEnabled: z.stringbool().exactOptional(),
        MmsEnabled: z.stringbool().exactOptional(),
        VoiceEnabled: z.stringbool().exactOptional(),
        ExcludeAllAddressRequired: z.stringbool().exactOptional(),
        ExcludeLocalAddressRequired: z.stringbool().exactOptional(),
        ExcludeForeignAddressRequired: z.stringbool().exactOptional(),
        Beta: z.stringbool().exactOptional(),
        NearNumber: z.string().exactOptional(),
        NearLatLong: z.string().exactOptional(),
        Distance: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .exactOptional(),
        InPostalCode: z.string().exactOptional(),
        InRegion: z.string().exactOptional(),
        InRateCenter: z.string().exactOptional(),
        InLata: z.string().exactOptional(),
        InLocality: z.string().exactOptional(),
        FaxEnabled: z.stringbool().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Balance.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Calls.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        To: z.string().exactOptional(),
        From: z.string().exactOptional(),
        ParentCallSid: z
          .string()
          .regex(/^CA[0-9a-fA-F]{32}$/)
          .length(34)
          .exactOptional(),
        Status: CallEnumStatusSchema.exactOptional(),
        StartTime: z.iso.datetime({ offset: true }).exactOptional(),
        'StartTime<': z.iso.datetime({ offset: true }).exactOptional(),
        'StartTime>': z.iso.datetime({ offset: true }).exactOptional(),
        EndTime: z.iso.datetime({ offset: true }).exactOptional(),
        'EndTime<': z.iso.datetime({ offset: true }).exactOptional(),
        'EndTime>': z.iso.datetime({ offset: true }).exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'form',
      z.object({
        To: z
          .string()
          .meta({ description: 'The phone number, SIP address, or client identifier to call.' }),
        From: z
          .string()
          .meta({
            description:
              'The phone number or client identifier to use as the caller id. If using a phone number, it must be a Twilio number or a Verified [outgoing caller id](https://www.twilio.com/docs/voice/api/outgoing-caller-ids) for your account. If the `to` parameter is a phone number, `From` must also be a phone number.',
          }),
        Method: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              "The HTTP method we should use when calling the `url` parameter's value. Can be: `GET` or `POST` and the default is `POST`. If an `application_sid` parameter is present, this parameter is ignored.",
          })
          .exactOptional(),
        FallbackUrl: z
          .url()
          .meta({
            description:
              'The URL that we call using the `fallback_method` if an error occurs when requesting or executing the TwiML at `url`. If an `application_sid` parameter is present, this parameter is ignored.',
          })
          .exactOptional(),
        FallbackMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method that we should use to request the `fallback_url`. Can be: `GET` or `POST` and the default is `POST`. If an `application_sid` parameter is present, this parameter is ignored.',
          })
          .exactOptional(),
        StatusCallback: z
          .url()
          .meta({
            description:
              'The URL we should call using the `status_callback_method` to send status information to your application. If no `status_callback_event` is specified, we will send the `completed` status. If an `application_sid` parameter is present, this parameter is ignored. URLs must contain a valid hostname (underscores are not permitted).',
          })
          .exactOptional(),
        StatusCallbackEvent: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .meta({
            description:
              'The call progress events that we will send to the `status_callback` URL. Can be: `initiated`, `ringing`, `answered`, and `completed`. If no event is specified, we send the `completed` status. If you want to receive multiple events, specify each one in a separate `status_callback_event` parameter. See the code sample for [monitoring call progress](https://www.twilio.com/docs/voice/api/call-resource?code-sample=code-create-a-call-resource-and-specify-a-statuscallbackevent&code-sdk-version=json). If an `application_sid` is present, this parameter is ignored.',
          })
          .exactOptional(),
        StatusCallbackMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method we should use when calling the `status_callback` URL. Can be: `GET` or `POST` and the default is `POST`. If an `application_sid` parameter is present, this parameter is ignored.',
          })
          .exactOptional(),
        SendDigits: z
          .string()
          .meta({
            description:
              "The string of keys to dial after connecting to the number, with a maximum length of 32 digits. Valid digits in the string include any digit (`0`-`9`), '`A`', '`B`', '`C`', '`D`', '`#`', and '`*`'. You can also use '`w`' to insert a half-second pause and '`W`' to insert a one-second pause. For example, to pause for one second after connecting and then dial extension 1234 followed by the # key, set this parameter to `W1234#`. Be sure to URL-encode this string because the '`#`' character has special meaning in a URL. If both `SendDigits` and `MachineDetection` parameters are provided, then `MachineDetection` will be ignored.",
          })
          .exactOptional(),
        Timeout: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .meta({
            description:
              'The integer number of seconds that we should allow the phone to ring before assuming there is no answer. The default is `60` seconds and the maximum is `600` seconds. For some call flows, we will add a 5-second buffer to the timeout value you provide. For this reason, a timeout value of 10 seconds could result in an actual timeout closer to 15 seconds. You can set this to a short time, such as `15` seconds, to hang up before reaching an answering machine or voicemail.',
          })
          .exactOptional(),
        Record: z
          .stringbool()
          .meta({
            description:
              'Whether to record the call. Can be `true` to record the phone call, or `false` to not. The default is `false`. The `recording_url` is sent to the `status_callback` URL.',
          })
          .exactOptional(),
        RecordingChannels: z
          .string()
          .meta({
            description:
              'The number of channels in the final recording. Can be: `mono` or `dual`. The default is `mono`. `mono` records both legs of the call in a single channel of the recording file. `dual` records each leg to a separate channel of the recording file. The first channel of a dual-channel recording contains the parent call and the second channel contains the child call.',
          })
          .exactOptional(),
        RecordingStatusCallback: z
          .string()
          .meta({
            description: 'The URL that we call when the recording is available to be accessed.',
          })
          .exactOptional(),
        RecordingStatusCallbackMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method we should use when calling the `recording_status_callback` URL. Can be: `GET` or `POST` and the default is `POST`.',
          })
          .exactOptional(),
        RecordingConfigurationId: z
          .string()
          .meta({
            description:
              'The identifier of the configuration to be used when creating and processing the recording',
          })
          .exactOptional(),
        SipAuthUsername: z
          .string()
          .meta({ description: 'The username used to authenticate the caller making a SIP call.' })
          .exactOptional(),
        SipAuthPassword: z
          .string()
          .meta({
            description:
              'The password required to authenticate the user account specified in `sip_auth_username`.',
          })
          .exactOptional(),
        MachineDetection: z
          .string()
          .meta({
            description:
              'Whether to detect if a human, answering machine, or fax has picked up the call. Can be: `Enable` or `DetectMessageEnd`. Use `Enable` if you would like us to return `AnsweredBy` as soon as the called party is identified. Use `DetectMessageEnd`, if you would like to leave a message on an answering machine. If `send_digits` is provided, this parameter is ignored. For more information, see [Answering Machine Detection](https://www.twilio.com/docs/voice/answering-machine-detection).',
          })
          .exactOptional(),
        MachineDetectionTimeout: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .meta({
            description:
              'The number of seconds that we should attempt to detect an answering machine before timing out and sending a voice request with `AnsweredBy` of `unknown`. The default timeout is 30 seconds.',
          })
          .exactOptional(),
        RecordingStatusCallbackEvent: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .meta({
            description:
              'The recording status events that will trigger calls to the URL specified in `recording_status_callback`. Can be: `in-progress`, `completed` and `absent`. Defaults to `completed`. Separate  multiple values with a space.',
          })
          .exactOptional(),
        Trim: z
          .string()
          .meta({
            description:
              'Whether to trim any leading and trailing silence from the recording. Can be: `trim-silence` or `do-not-trim` and the default is `trim-silence`.',
          })
          .exactOptional(),
        CallerId: z
          .string()
          .meta({
            description:
              'The phone number, SIP address, or Client identifier that made this call. Phone numbers are in [E.164 format](https://wwnw.twilio.com/docs/glossary/what-e164) (e.g., +16175551212). SIP addresses are formatted as `name@company.com`.',
          })
          .exactOptional(),
        MachineDetectionSpeechThreshold: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .meta({
            description:
              'The number of milliseconds that is used as the measuring stick for the length of the speech activity, where durations lower than this value will be interpreted as a human and longer than this value as a machine. Possible Values: 1000-6000. Default: 2400.',
          })
          .exactOptional(),
        MachineDetectionSpeechEndThreshold: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .meta({
            description:
              'The number of milliseconds of silence after speech activity at which point the speech activity is considered complete. Possible Values: 500-5000. Default: 1200.',
          })
          .exactOptional(),
        MachineDetectionSilenceTimeout: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .meta({
            description:
              'The number of milliseconds of initial silence after which an `unknown` AnsweredBy result will be returned. Possible Values: 2000-10000. Default: 5000.',
          })
          .exactOptional(),
        AsyncAmd: z
          .string()
          .meta({
            description:
              'Select whether to perform answering machine detection in the background. Default, blocks the execution of the call until Answering Machine Detection is completed. Can be: `true` or `false`.',
          })
          .exactOptional(),
        AsyncAmdStatusCallback: z
          .url()
          .meta({
            description:
              'The URL that we should call using the `async_amd_status_callback_method` to notify customer application whether the call was answered by human, machine or fax.',
          })
          .exactOptional(),
        AsyncAmdStatusCallbackMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method we should use when calling the `async_amd_status_callback` URL. Can be: `GET` or `POST` and the default is `POST`.',
          })
          .exactOptional(),
        Passports: z
          .string()
          .meta({
            description:
              'The STIR/SHAKEN passport for this call, provided as a base64 encoded string. Multiple passports (at max 5) are comma separated and provided as base64 encoded string',
          })
          .exactOptional(),
        Byoc: z
          .string()
          .regex(/^BY[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description:
              'The SID of a BYOC (Bring Your Own Carrier) trunk to route this call with. Note that `byoc` is only meaningful when `to` is a phone number; it will otherwise be ignored. (Beta)',
          })
          .exactOptional(),
        CallReason: z
          .string()
          .meta({
            description:
              "The Reason for the outgoing call. Use it to specify the purpose of the call that is presented on the called party's phone. (Branded Calls Beta)",
          })
          .exactOptional(),
        CallToken: z
          .string()
          .meta({
            description:
              "A token string needed to invoke a forwarded call. A call_token is generated when an incoming call is received on a Twilio number. Pass an incoming call's call_token value to a forwarded call via the call_token parameter when creating a new call. A forwarded call should bear the same CallerID of the original incoming call.",
          })
          .exactOptional(),
        RecordingTrack: z
          .string()
          .meta({
            description:
              'The audio track to record for the call. Can be: `inbound`, `outbound` or `both`. The default is `both`. `inbound` records the audio that is received by Twilio. `outbound` records the audio that is generated from Twilio. `both` records the audio that is received and generated by Twilio.',
          })
          .exactOptional(),
        TimeLimit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .meta({
            description:
              'The maximum duration of the call in seconds. Constraints depend on account and configuration.',
          })
          .exactOptional(),
        ClientNotificationUrl: z
          .url()
          .meta({ description: 'The URL that we should use to deliver `push call notification`.' })
          .exactOptional(),
        Url: z
          .url()
          .meta({
            description:
              'The absolute URL that returns the TwiML instructions for the call. We will call this URL using the `method` when the call connects. For more information, see the [Url Parameter](https://www.twilio.com/docs/voice/make-calls#specify-a-url-parameter) section in [Making Calls](https://www.twilio.com/docs/voice/make-calls).',
          })
          .exactOptional(),
        Twiml: z
          .string()
          .meta({
            description:
              'TwiML instructions for the call Twilio will use without fetching Twiml from url parameter. If both `twiml` and `url` are provided then `twiml` parameter will be ignored. Max 4000 characters.',
          })
          .exactOptional(),
        ApplicationSid: z
          .string()
          .regex(/^AP[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description:
              'The SID of the Application resource that will handle the call, if the call will be handled by an application.',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Calls/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^CA[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^CA[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'form',
      z.object({
        Url: z
          .url()
          .meta({
            description:
              'The absolute URL that returns the TwiML instructions for the call. We will call this URL using the `method` when the call connects. For more information, see the [Url Parameter](https://www.twilio.com/docs/voice/make-calls#specify-a-url-parameter) section in [Making Calls](https://www.twilio.com/docs/voice/make-calls).',
          })
          .exactOptional(),
        Method: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method we should use when calling the `url`. Can be: `GET` or `POST` and the default is `POST`. If an `application_sid` parameter is present, this parameter is ignored.',
          })
          .exactOptional(),
        Status: CallEnumUpdateStatusSchema.exactOptional(),
        FallbackUrl: z
          .url()
          .meta({
            description:
              'The URL that we call using the `fallback_method` if an error occurs when requesting or executing the TwiML at `url`. If an `application_sid` parameter is present, this parameter is ignored.',
          })
          .exactOptional(),
        FallbackMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method that we should use to request the `fallback_url`. Can be: `GET` or `POST` and the default is `POST`. If an `application_sid` parameter is present, this parameter is ignored.',
          })
          .exactOptional(),
        StatusCallback: z
          .url()
          .meta({
            description:
              'The URL we should call using the `status_callback_method` to send status information to your application. If no `status_callback_event` is specified, we will send the `completed` status. If an `application_sid` parameter is present, this parameter is ignored. URLs must contain a valid hostname (underscores are not permitted).',
          })
          .exactOptional(),
        StatusCallbackMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method we should use when requesting the `status_callback` URL. Can be: `GET` or `POST` and the default is `POST`. If an `application_sid` parameter is present, this parameter is ignored.',
          })
          .exactOptional(),
        Twiml: z
          .string()
          .meta({
            description:
              'TwiML instructions for the call Twilio will use without fetching Twiml from url. Twiml and url parameters are mutually exclusive',
          })
          .exactOptional(),
        TimeLimit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .meta({
            description:
              'The maximum duration of the call in seconds. Constraints depend on account and configuration.',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Calls/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^CA[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Events.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CallSid: z
          .string()
          .regex(/^CA[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Notifications/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CallSid: z
          .string()
          .regex(/^CA[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^NO[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Notifications.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CallSid: z
          .string()
          .regex(/^CA[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        Log: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .exactOptional(),
        MessageDate: z.iso.date().exactOptional(),
        'MessageDate<': z.iso.date().exactOptional(),
        'MessageDate>': z.iso.date().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Recordings.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CallSid: z
          .string()
          .regex(/^CA[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        DateCreated: z.iso.date().exactOptional(),
        'DateCreated<': z.iso.date().exactOptional(),
        'DateCreated>': z.iso.date().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Recordings.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CallSid: z
          .string()
          .regex(/^CA[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'form',
      z.object({
        RecordingStatusCallbackEvent: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .meta({
            description:
              'The recording status events on which we should call the `recording_status_callback` URL. Can be: `in-progress`, `completed` and `absent` and the default is `completed`. Separate multiple event values with a space.',
          })
          .exactOptional(),
        RecordingStatusCallback: z
          .url()
          .meta({
            description:
              'The URL we should call using the `recording_status_callback_method` on each recording event specified in  `recording_status_callback_event`. For more information, see [RecordingStatusCallback parameters](https://www.twilio.com/docs/voice/api/recording#recordingstatuscallback).',
          })
          .exactOptional(),
        RecordingStatusCallbackMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method we should use to call `recording_status_callback`. Can be: `GET` or `POST` and the default is `POST`.',
          })
          .exactOptional(),
        Trim: z
          .string()
          .meta({
            description:
              'Whether to trim any leading and trailing silence in the recording. Can be: `trim-silence` or `do-not-trim` and the default is `do-not-trim`. `trim-silence` trims the silence from the beginning and end of the recording and `do-not-trim` does not.',
          })
          .exactOptional(),
        RecordingChannels: z
          .string()
          .meta({
            description:
              'The number of channels used in the recording. Can be: `mono` or `dual` and the default is `mono`. `mono` records all parties of the call into one channel. `dual` records each party of a 2-party call into separate channels.',
          })
          .exactOptional(),
        RecordingTrack: z
          .string()
          .meta({
            description:
              'The audio track to record for the call. Can be: `inbound`, `outbound` or `both`. The default is `both`. `inbound` records the audio that is received by Twilio. `outbound` records the audio that is generated from Twilio. `both` records the audio that is received and generated by Twilio.',
          })
          .exactOptional(),
        RecordingConfigurationId: z
          .string()
          .meta({
            description:
              'The identifier of the configuration to be used when creating and processing the recording',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Recordings/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CallSid: z
          .string()
          .regex(/^CA[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^RE[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Recordings/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CallSid: z
          .string()
          .regex(/^CA[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z.string(),
      }),
    ),
    sValidator(
      'form',
      z.object({
        Status: CallRecordingEnumStatusSchema,
        PauseBehavior: z
          .string()
          .meta({
            description:
              'Whether to record during a pause. Can be: `skip` or `silence` and the default is `silence`. `skip` does not record during the pause period, while `silence` will replace the actual audio of the call with silence during the pause period. This parameter only applies when setting `status` is set to `paused`.',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Recordings/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CallSid: z
          .string()
          .regex(/^CA[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^RE[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^CF[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z.string(),
      }),
    ),
    sValidator(
      'form',
      z.object({
        Status: ConferenceEnumUpdateStatusSchema.exactOptional(),
        AnnounceUrl: z
          .url()
          .meta({
            description:
              'The URL we should call to announce something into the conference. The URL may return an MP3 file, a WAV file, or a TwiML document that contains `<Play>`, `<Say>`, `<Pause>`, or `<Redirect>` verbs.',
          })
          .exactOptional(),
        AnnounceMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method used to call `announce_url`. Can be: `GET` or `POST` and the default is `POST`',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Conferences.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        DateCreated: z.iso.date().exactOptional(),
        'DateCreated<': z.iso.date().exactOptional(),
        'DateCreated>': z.iso.date().exactOptional(),
        DateUpdated: z.iso.date().exactOptional(),
        'DateUpdated<': z.iso.date().exactOptional(),
        'DateUpdated>': z.iso.date().exactOptional(),
        FriendlyName: z.string().exactOptional(),
        Status: ConferenceEnumStatusSchema.exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Recordings.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        ConferenceSid: z
          .string()
          .regex(/^CF[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        DateCreated: z.iso.date().exactOptional(),
        'DateCreated<': z.iso.date().exactOptional(),
        'DateCreated>': z.iso.date().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Recordings/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        ConferenceSid: z
          .string()
          .regex(/^CF[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^RE[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Recordings/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        ConferenceSid: z
          .string()
          .regex(/^CF[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z.string(),
      }),
    ),
    sValidator(
      'form',
      z.object({
        Status: ConferenceRecordingEnumStatusSchema,
        PauseBehavior: z
          .string()
          .meta({
            description:
              'Whether to record during a pause. Can be: `skip` or `silence` and the default is `silence`. `skip` does not record during the pause period, while `silence` will replace the actual audio of the call with silence during the pause period. This parameter only applies when setting `status` is set to `paused`.',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Recordings/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        ConferenceSid: z
          .string()
          .regex(/^CF[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^RE[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/ConnectApps/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^CN[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/ConnectApps/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^CN[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'form',
      z.object({
        AuthorizeRedirectUrl: z
          .url()
          .meta({
            description:
              'The URL to redirect the user to after we authenticate the user and obtain authorization to access the Connect App.',
          })
          .exactOptional(),
        CompanyName: z
          .string()
          .meta({ description: 'The company name to set for the Connect App.' })
          .exactOptional(),
        DeauthorizeCallbackMethod: z
          .enum(['GET', 'POST'])
          .meta({ description: 'The HTTP method to use when calling `deauthorize_callback_url`.' })
          .exactOptional(),
        DeauthorizeCallbackUrl: z
          .url()
          .meta({
            description:
              'The URL to call using the `deauthorize_callback_method` to de-authorize the Connect App.',
          })
          .exactOptional(),
        Description: z
          .string()
          .meta({ description: 'A description of the Connect App.' })
          .exactOptional(),
        FriendlyName: z
          .string()
          .meta({
            description:
              'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
          })
          .exactOptional(),
        HomepageUrl: z
          .url()
          .meta({
            description:
              'A public URL where users can obtain more information about this Connect App.',
          })
          .exactOptional(),
        Permissions: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(ConnectAppEnumPermissionSchema),
          )
          .meta({
            description:
              'A comma-separated list of the permissions you will request from the users of this ConnectApp.  Can include: `get-all` and `post-all`.',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/ConnectApps/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^CN[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/ConnectApps.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Addresses/:AddressSid/DependentPhoneNumbers.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        AddressSid: z
          .string()
          .regex(/^AD[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^PN[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^PN[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'form',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description:
              'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the IncomingPhoneNumber resource to update.  For more information, see [Exchanging Numbers Between Subaccounts](https://www.twilio.com/docs/iam/api/subaccounts#exchanging-numbers).',
          })
          .exactOptional(),
        ApiVersion: z
          .string()
          .meta({
            description:
              'The API version to use for incoming calls made to the phone number. The default is `2010-04-01`.',
          })
          .exactOptional(),
        FriendlyName: z
          .string()
          .meta({
            description:
              'A descriptive string that you created to describe this phone number. It can be up to 64 characters long. By default, this is a formatted version of the phone number.',
          })
          .exactOptional(),
        SmsApplicationSid: z
          .string()
          .regex(/^AP[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description:
              'The SID of the application that should handle SMS messages sent to the number. If an `sms_application_sid` is present, we ignore all of the `sms_*_url` urls and use those set on the application.',
          })
          .exactOptional(),
        SmsFallbackMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method that we should use to call `sms_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          })
          .exactOptional(),
        SmsFallbackUrl: z
          .url()
          .meta({
            description:
              'The URL that we should call when an error occurs while requesting or executing the TwiML defined by `sms_url`.',
          })
          .exactOptional(),
        SmsMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method that we should use to call `sms_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          })
          .exactOptional(),
        SmsUrl: z
          .url()
          .meta({
            description:
              'The URL we should call when the phone number receives an incoming SMS message.',
          })
          .exactOptional(),
        StatusCallback: z
          .url()
          .meta({
            description:
              'The URL we should call using the `status_callback_method` to send status information to your application.',
          })
          .exactOptional(),
        StatusCallbackMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST` and defaults to `POST`.',
          })
          .exactOptional(),
        VoiceApplicationSid: z
          .string()
          .regex(/^AP[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description:
              'The SID of the application we should use to handle phone calls to the phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use only those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
          })
          .exactOptional(),
        VoiceCallerIdLookup: z
          .stringbool()
          .meta({
            description:
              "Whether to lookup the caller's name from the CNAM database and post it to your app. Can be: `true` or `false` and defaults to `false`.",
          })
          .exactOptional(),
        VoiceFallbackMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method that we should use to call `voice_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          })
          .exactOptional(),
        VoiceFallbackUrl: z
          .url()
          .meta({
            description:
              'The URL that we should call when an error occurs retrieving or executing the TwiML requested by `url`.',
          })
          .exactOptional(),
        VoiceMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method that we should use to call `voice_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          })
          .exactOptional(),
        VoiceUrl: z
          .url()
          .meta({
            description:
              'The URL that we should call to answer a call to the phone number. The `voice_url` will not be called if a `voice_application_sid` or a `trunk_sid` is set.',
          })
          .exactOptional(),
        EmergencyStatus: IncomingPhoneNumberEnumEmergencyStatusSchema.exactOptional(),
        EmergencyAddressSid: z
          .string()
          .regex(/^AD[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description:
              'The SID of the emergency address configuration to use for emergency calling from this phone number.',
          })
          .exactOptional(),
        TrunkSid: z
          .string()
          .regex(/^TK[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description:
              'The SID of the Trunk we should use to handle phone calls to the phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use only those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
          })
          .exactOptional(),
        VoiceReceiveMode: IncomingPhoneNumberEnumVoiceReceiveModeSchema.exactOptional(),
        IdentitySid: z
          .string()
          .regex(/^RI[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description:
              'The SID of the Identity resource that we should associate with the phone number. Some regions require an identity to meet local regulations.',
          })
          .exactOptional(),
        AddressSid: z
          .string()
          .regex(/^AD[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description:
              'The SID of the Address resource we should associate with the phone number. Some regions require addresses to meet local regulations.',
          })
          .exactOptional(),
        BundleSid: z
          .string()
          .regex(/^BU[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description:
              'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^PN[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        Beta: z.stringbool().exactOptional(),
        FriendlyName: z.string().exactOptional(),
        PhoneNumber: z.string().exactOptional(),
        Origin: z.string().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'form',
      z.object({
        ApiVersion: z
          .string()
          .meta({
            description:
              'The API version to use for incoming calls made to the new phone number. The default is `2010-04-01`.',
          })
          .exactOptional(),
        FriendlyName: z
          .string()
          .meta({
            description:
              'A descriptive string that you created to describe the new phone number. It can be up to 64 characters long. By default, this is a formatted version of the new phone number.',
          })
          .exactOptional(),
        SmsApplicationSid: z
          .string()
          .regex(/^AP[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description:
              'The SID of the application that should handle SMS messages sent to the new phone number. If an `sms_application_sid` is present, we ignore all of the `sms_*_url` urls and use those set on the application.',
          })
          .exactOptional(),
        SmsFallbackMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method that we should use to call `sms_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          })
          .exactOptional(),
        SmsFallbackUrl: z
          .url()
          .meta({
            description:
              'The URL that we should call when an error occurs while requesting or executing the TwiML defined by `sms_url`.',
          })
          .exactOptional(),
        SmsMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method that we should use to call `sms_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          })
          .exactOptional(),
        SmsUrl: z
          .url()
          .meta({
            description:
              'The URL we should call when the new phone number receives an incoming SMS message.',
          })
          .exactOptional(),
        StatusCallback: z
          .url()
          .meta({
            description:
              'The URL we should call using the `status_callback_method` to send status information to your application.',
          })
          .exactOptional(),
        StatusCallbackMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST` and defaults to `POST`.',
          })
          .exactOptional(),
        VoiceApplicationSid: z
          .string()
          .regex(/^AP[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description:
              'The SID of the application we should use to handle calls to the new phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use only those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
          })
          .exactOptional(),
        VoiceCallerIdLookup: z
          .stringbool()
          .meta({
            description:
              "Whether to lookup the caller's name from the CNAM database and post it to your app. Can be: `true` or `false` and defaults to `false`.",
          })
          .exactOptional(),
        VoiceFallbackMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method that we should use to call `voice_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          })
          .exactOptional(),
        VoiceFallbackUrl: z
          .url()
          .meta({
            description:
              'The URL that we should call when an error occurs retrieving or executing the TwiML requested by `url`.',
          })
          .exactOptional(),
        VoiceMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method that we should use to call `voice_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          })
          .exactOptional(),
        VoiceUrl: z
          .url()
          .meta({
            description:
              'The URL that we should call to answer a call to the new phone number. The `voice_url` will not be called if a `voice_application_sid` or a `trunk_sid` is set.',
          })
          .exactOptional(),
        EmergencyStatus: IncomingPhoneNumberEnumEmergencyStatusSchema.exactOptional(),
        EmergencyAddressSid: z
          .string()
          .regex(/^AD[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description:
              'The SID of the emergency address configuration to use for emergency calling from the new phone number.',
          })
          .exactOptional(),
        TrunkSid: z
          .string()
          .regex(/^TK[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description:
              'The SID of the Trunk we should use to handle calls to the new phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use only those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
          })
          .exactOptional(),
        IdentitySid: z
          .string()
          .regex(/^RI[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description:
              'The SID of the Identity resource that we should associate with the new phone number. Some regions require an identity to meet local regulations.',
          })
          .exactOptional(),
        AddressSid: z
          .string()
          .regex(/^AD[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description:
              'The SID of the Address resource we should associate with the new phone number. Some regions require addresses to meet local regulations.',
          })
          .exactOptional(),
        VoiceReceiveMode: IncomingPhoneNumberEnumVoiceReceiveModeSchema.exactOptional(),
        BundleSid: z
          .string()
          .regex(/^BU[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description:
              'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
          })
          .exactOptional(),
        PhoneNumber: z
          .string()
          .meta({
            description:
              'The phone number to purchase specified in [E.164](https://www.twilio.com/docs/glossary/what-e164) format.  E.164 phone numbers consist of a + followed by the country code and subscriber number without punctuation characters. For example, +14155551234.',
          })
          .exactOptional(),
        AreaCode: z
          .string()
          .meta({
            description:
              'The desired area code for your new incoming phone number. Can be any three-digit, US or Canada area code. We will provision an available phone number within this area code for you. **You must provide an `area_code` or a `phone_number`.** (US and Canada only).',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:ResourceSid/AssignedAddOns/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        ResourceSid: z
          .string()
          .regex(/^PN[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^XE[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:ResourceSid/AssignedAddOns/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        ResourceSid: z
          .string()
          .regex(/^PN[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^XE[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:ResourceSid/AssignedAddOns.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        ResourceSid: z
          .string()
          .regex(/^PN[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:ResourceSid/AssignedAddOns.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        ResourceSid: z
          .string()
          .regex(/^PN[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'form',
      z.object({
        InstalledAddOnSid: z
          .string()
          .regex(/^XE[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({ description: 'The SID that identifies the Add-on installation.' }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:ResourceSid/AssignedAddOns/:AssignedAddOnSid/Extensions/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        ResourceSid: z
          .string()
          .regex(/^PN[0-9a-fA-F]{32}$/)
          .length(34),
        AssignedAddOnSid: z
          .string()
          .regex(/^XE[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^XF[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:ResourceSid/AssignedAddOns/:AssignedAddOnSid/Extensions.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        ResourceSid: z
          .string()
          .regex(/^PN[0-9a-fA-F]{32}$/)
          .length(34),
        AssignedAddOnSid: z
          .string()
          .regex(/^XE[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/Local.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        Beta: z.stringbool().exactOptional(),
        FriendlyName: z.string().exactOptional(),
        PhoneNumber: z.string().exactOptional(),
        Origin: z.string().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/Local.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'form',
      z.object({
        PhoneNumber: z
          .string()
          .meta({
            description:
              'The phone number to purchase specified in [E.164](https://www.twilio.com/docs/glossary/what-e164) format.  E.164 phone numbers consist of a + followed by the country code and subscriber number without punctuation characters. For example, +14155551234.',
          }),
        ApiVersion: z
          .string()
          .meta({
            description:
              'The API version to use for incoming calls made to the new phone number. The default is `2010-04-01`.',
          })
          .exactOptional(),
        FriendlyName: z
          .string()
          .meta({
            description:
              'A descriptive string that you created to describe the new phone number. It can be up to 64 characters long. By default, this is a formatted version of the phone number.',
          })
          .exactOptional(),
        SmsApplicationSid: z
          .string()
          .regex(/^AP[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description:
              'The SID of the application that should handle SMS messages sent to the new phone number. If an `sms_application_sid` is present, we ignore all of the `sms_*_url` urls and use those set on the application.',
          })
          .exactOptional(),
        SmsFallbackMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method that we should use to call `sms_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          })
          .exactOptional(),
        SmsFallbackUrl: z
          .url()
          .meta({
            description:
              'The URL that we should call when an error occurs while requesting or executing the TwiML defined by `sms_url`.',
          })
          .exactOptional(),
        SmsMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method that we should use to call `sms_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          })
          .exactOptional(),
        SmsUrl: z
          .url()
          .meta({
            description:
              'The URL we should call when the new phone number receives an incoming SMS message.',
          })
          .exactOptional(),
        StatusCallback: z
          .url()
          .meta({
            description:
              'The URL we should call using the `status_callback_method` to send status information to your application.',
          })
          .exactOptional(),
        StatusCallbackMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST` and defaults to `POST`.',
          })
          .exactOptional(),
        VoiceApplicationSid: z
          .string()
          .regex(/^AP[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description:
              'The SID of the application we should use to handle calls to the new phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use only those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
          })
          .exactOptional(),
        VoiceCallerIdLookup: z
          .stringbool()
          .meta({
            description:
              "Whether to lookup the caller's name from the CNAM database and post it to your app. Can be: `true` or `false` and defaults to `false`.",
          })
          .exactOptional(),
        VoiceFallbackMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method that we should use to call `voice_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          })
          .exactOptional(),
        VoiceFallbackUrl: z
          .url()
          .meta({
            description:
              'The URL that we should call when an error occurs retrieving or executing the TwiML requested by `url`.',
          })
          .exactOptional(),
        VoiceMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method that we should use to call `voice_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          })
          .exactOptional(),
        VoiceUrl: z
          .url()
          .meta({
            description:
              'The URL that we should call to answer a call to the new phone number. The `voice_url` will not be called if a `voice_application_sid` or a `trunk_sid` is set.',
          })
          .exactOptional(),
        IdentitySid: z
          .string()
          .regex(/^RI[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description:
              'The SID of the Identity resource that we should associate with the new phone number. Some regions require an identity to meet local regulations.',
          })
          .exactOptional(),
        AddressSid: z
          .string()
          .regex(/^AD[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description:
              'The SID of the Address resource we should associate with the new phone number. Some regions require addresses to meet local regulations.',
          })
          .exactOptional(),
        EmergencyStatus: IncomingPhoneNumberLocalEnumEmergencyStatusSchema.exactOptional(),
        EmergencyAddressSid: z
          .string()
          .regex(/^AD[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description:
              'The SID of the emergency address configuration to use for emergency calling from the new phone number.',
          })
          .exactOptional(),
        TrunkSid: z
          .string()
          .regex(/^TK[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description:
              'The SID of the Trunk we should use to handle calls to the new phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use only those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
          })
          .exactOptional(),
        VoiceReceiveMode: IncomingPhoneNumberLocalEnumVoiceReceiveModeSchema.exactOptional(),
        BundleSid: z
          .string()
          .regex(/^BU[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description:
              'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/Mobile.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        Beta: z.stringbool().exactOptional(),
        FriendlyName: z.string().exactOptional(),
        PhoneNumber: z.string().exactOptional(),
        Origin: z.string().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/Mobile.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'form',
      z.object({
        PhoneNumber: z
          .string()
          .meta({
            description:
              'The phone number to purchase specified in [E.164](https://www.twilio.com/docs/glossary/what-e164) format.  E.164 phone numbers consist of a + followed by the country code and subscriber number without punctuation characters. For example, +14155551234.',
          }),
        ApiVersion: z
          .string()
          .meta({
            description:
              'The API version to use for incoming calls made to the new phone number. The default is `2010-04-01`.',
          })
          .exactOptional(),
        FriendlyName: z
          .string()
          .meta({
            description:
              'A descriptive string that you created to describe the new phone number. It can be up to 64 characters long. By default, the is a formatted version of the phone number.',
          })
          .exactOptional(),
        SmsApplicationSid: z
          .string()
          .regex(/^AP[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description:
              'The SID of the application that should handle SMS messages sent to the new phone number. If an `sms_application_sid` is present, we ignore all of the `sms_*_url` urls and use those of the application.',
          })
          .exactOptional(),
        SmsFallbackMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method that we should use to call `sms_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          })
          .exactOptional(),
        SmsFallbackUrl: z
          .url()
          .meta({
            description:
              'The URL that we should call when an error occurs while requesting or executing the TwiML defined by `sms_url`.',
          })
          .exactOptional(),
        SmsMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method that we should use to call `sms_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          })
          .exactOptional(),
        SmsUrl: z
          .url()
          .meta({
            description:
              'The URL we should call when the new phone number receives an incoming SMS message.',
          })
          .exactOptional(),
        StatusCallback: z
          .url()
          .meta({
            description:
              'The URL we should call using the `status_callback_method` to send status information to your application.',
          })
          .exactOptional(),
        StatusCallbackMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST` and defaults to `POST`.',
          })
          .exactOptional(),
        VoiceApplicationSid: z
          .string()
          .regex(/^AP[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description:
              'The SID of the application we should use to handle calls to the new phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use only those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
          })
          .exactOptional(),
        VoiceCallerIdLookup: z
          .stringbool()
          .meta({
            description:
              "Whether to lookup the caller's name from the CNAM database and post it to your app. Can be: `true` or `false` and defaults to `false`.",
          })
          .exactOptional(),
        VoiceFallbackMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method that we should use to call `voice_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          })
          .exactOptional(),
        VoiceFallbackUrl: z
          .url()
          .meta({
            description:
              'The URL that we should call when an error occurs retrieving or executing the TwiML requested by `url`.',
          })
          .exactOptional(),
        VoiceMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method that we should use to call `voice_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          })
          .exactOptional(),
        VoiceUrl: z
          .url()
          .meta({
            description:
              'The URL that we should call to answer a call to the new phone number. The `voice_url` will not be called if a `voice_application_sid` or a `trunk_sid` is set.',
          })
          .exactOptional(),
        IdentitySid: z
          .string()
          .regex(/^RI[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description:
              'The SID of the Identity resource that we should associate with the new phone number. Some regions require an identity to meet local regulations.',
          })
          .exactOptional(),
        AddressSid: z
          .string()
          .regex(/^AD[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description:
              'The SID of the Address resource we should associate with the new phone number. Some regions require addresses to meet local regulations.',
          })
          .exactOptional(),
        EmergencyStatus: IncomingPhoneNumberMobileEnumEmergencyStatusSchema.exactOptional(),
        EmergencyAddressSid: z
          .string()
          .regex(/^AD[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description:
              'The SID of the emergency address configuration to use for emergency calling from the new phone number.',
          })
          .exactOptional(),
        TrunkSid: z
          .string()
          .regex(/^TK[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description:
              'The SID of the Trunk we should use to handle calls to the new phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use only those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
          })
          .exactOptional(),
        VoiceReceiveMode: IncomingPhoneNumberMobileEnumVoiceReceiveModeSchema.exactOptional(),
        BundleSid: z
          .string()
          .regex(/^BU[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description:
              'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/TollFree.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        Beta: z.stringbool().exactOptional(),
        FriendlyName: z.string().exactOptional(),
        PhoneNumber: z.string().exactOptional(),
        Origin: z.string().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/TollFree.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'form',
      z.object({
        PhoneNumber: z
          .string()
          .meta({
            description:
              'The phone number to purchase specified in [E.164](https://www.twilio.com/docs/glossary/what-e164) format.  E.164 phone numbers consist of a + followed by the country code and subscriber number without punctuation characters. For example, +14155551234.',
          }),
        ApiVersion: z
          .string()
          .meta({
            description:
              'The API version to use for incoming calls made to the new phone number. The default is `2010-04-01`.',
          })
          .exactOptional(),
        FriendlyName: z
          .string()
          .meta({
            description:
              'A descriptive string that you created to describe the new phone number. It can be up to 64 characters long. By default, this is a formatted version of the phone number.',
          })
          .exactOptional(),
        SmsApplicationSid: z
          .string()
          .regex(/^AP[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description:
              'The SID of the application that should handle SMS messages sent to the new phone number. If an `sms_application_sid` is present, we ignore all `sms_*_url` values and use those of the application.',
          })
          .exactOptional(),
        SmsFallbackMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method that we should use to call `sms_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          })
          .exactOptional(),
        SmsFallbackUrl: z
          .url()
          .meta({
            description:
              'The URL that we should call when an error occurs while requesting or executing the TwiML defined by `sms_url`.',
          })
          .exactOptional(),
        SmsMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method that we should use to call `sms_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          })
          .exactOptional(),
        SmsUrl: z
          .url()
          .meta({
            description:
              'The URL we should call when the new phone number receives an incoming SMS message.',
          })
          .exactOptional(),
        StatusCallback: z
          .url()
          .meta({
            description:
              'The URL we should call using the `status_callback_method` to send status information to your application.',
          })
          .exactOptional(),
        StatusCallbackMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST` and defaults to `POST`.',
          })
          .exactOptional(),
        VoiceApplicationSid: z
          .string()
          .regex(/^AP[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description:
              'The SID of the application we should use to handle calls to the new phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
          })
          .exactOptional(),
        VoiceCallerIdLookup: z
          .stringbool()
          .meta({
            description:
              "Whether to lookup the caller's name from the CNAM database and post it to your app. Can be: `true` or `false` and defaults to `false`.",
          })
          .exactOptional(),
        VoiceFallbackMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method that we should use to call `voice_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          })
          .exactOptional(),
        VoiceFallbackUrl: z
          .url()
          .meta({
            description:
              'The URL that we should call when an error occurs retrieving or executing the TwiML requested by `url`.',
          })
          .exactOptional(),
        VoiceMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method that we should use to call `voice_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          })
          .exactOptional(),
        VoiceUrl: z
          .url()
          .meta({
            description:
              'The URL that we should call to answer a call to the new phone number. The `voice_url` will not be called if a `voice_application_sid` or a `trunk_sid` is set.',
          })
          .exactOptional(),
        IdentitySid: z
          .string()
          .regex(/^RI[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description:
              'The SID of the Identity resource that we should associate with the new phone number. Some regions require an Identity to meet local regulations.',
          })
          .exactOptional(),
        AddressSid: z
          .string()
          .regex(/^AD[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description:
              'The SID of the Address resource we should associate with the new phone number. Some regions require addresses to meet local regulations.',
          })
          .exactOptional(),
        EmergencyStatus: IncomingPhoneNumberTollFreeEnumEmergencyStatusSchema.exactOptional(),
        EmergencyAddressSid: z
          .string()
          .regex(/^AD[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description:
              'The SID of the emergency address configuration to use for emergency calling from the new phone number.',
          })
          .exactOptional(),
        TrunkSid: z
          .string()
          .regex(/^TK[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description:
              'The SID of the Trunk we should use to handle calls to the new phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use only those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
          })
          .exactOptional(),
        VoiceReceiveMode: IncomingPhoneNumberTollFreeEnumVoiceReceiveModeSchema.exactOptional(),
        BundleSid: z
          .string()
          .regex(/^BU[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description:
              'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Keys/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^SK[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Keys/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^SK[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'form',
      z.object({
        FriendlyName: z
          .string()
          .meta({
            description:
              'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Keys/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^SK[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Keys.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Keys.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'form',
      z.object({
        FriendlyName: z
          .string()
          .meta({
            description:
              'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Messages/:MessageSid/Media/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        MessageSid: z
          .string()
          .regex(/^(SM|MM)[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^ME[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Messages/:MessageSid/Media/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        MessageSid: z
          .string()
          .regex(/^(SM|MM)[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^ME[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Messages/:MessageSid/Media.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        MessageSid: z
          .string()
          .regex(/^(SM|MM)[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        DateCreated: z.iso.datetime({ offset: true }).exactOptional(),
        'DateCreated<': z.iso.datetime({ offset: true }).exactOptional(),
        'DateCreated>': z.iso.datetime({ offset: true }).exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Queues/:QueueSid/Members/:CallSid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        QueueSid: z
          .string()
          .regex(/^QU[0-9a-fA-F]{32}$/)
          .length(34),
        CallSid: z.string(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Queues/:QueueSid/Members/:CallSid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        QueueSid: z
          .string()
          .regex(/^QU[0-9a-fA-F]{32}$/)
          .length(34),
        CallSid: z.string(),
      }),
    ),
    sValidator(
      'form',
      z.object({
        Url: z.url().meta({ description: 'The absolute URL of the Queue resource.' }),
        Method: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'How to pass the update request data. Can be `GET` or `POST` and the default is `POST`. `POST` sends the data as encoded form data and `GET` sends the data as query parameters.',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Queues/:QueueSid/Members.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        QueueSid: z
          .string()
          .regex(/^QU[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Messages.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        To: z.string().exactOptional(),
        From: z.string().exactOptional(),
        DateSent: z.iso.datetime({ offset: true }).exactOptional(),
        'DateSent<': z.iso.datetime({ offset: true }).exactOptional(),
        'DateSent>': z.iso.datetime({ offset: true }).exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Messages.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'form',
      z.object({
        To: z
          .string()
          .meta({
            description:
              "The recipient's phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (for SMS/MMS) or [channel address](https://www.twilio.com/docs/messaging/channels), e.g. `whatsapp:+15552229999`.",
          }),
        StatusCallback: z
          .url()
          .meta({
            description:
              'The URL of the endpoint to which Twilio sends [Message status callback requests](https://www.twilio.com/docs/sms/api/message-resource#twilios-request-to-the-statuscallback-url). URL must contain a valid hostname and underscores are not allowed. If you include this parameter with the `messaging_service_sid`, Twilio uses this URL instead of the Status Callback URL of the [Messaging Service](https://www.twilio.com/docs/messaging/api/service-resource). ',
          })
          .exactOptional(),
        ApplicationSid: z
          .string()
          .regex(/^AP[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description:
              "The SID of the associated [TwiML Application](https://www.twilio.com/docs/usage/api/applications). [Message status callback requests](https://www.twilio.com/docs/sms/api/message-resource#twilios-request-to-the-statuscallback-url) are sent to the TwiML App's `message_status_callback` URL. Note that the `status_callback` parameter of a request takes priority over the `application_sid` parameter; if both are included `application_sid` is ignored.",
          })
          .exactOptional(),
        MaxPrice: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
                ? Number(val)
                : val,
            z.number(),
          )
          .meta({
            description:
              '[OBSOLETE] This parameter will no longer have any effect as of 2024-06-03.',
          })
          .exactOptional(),
        ProvideFeedback: z
          .stringbool()
          .meta({
            description:
              'Boolean indicating whether or not you intend to provide delivery confirmation feedback to Twilio (used in conjunction with the [Message Feedback subresource](https://www.twilio.com/docs/sms/api/message-feedback-resource)). Default value is `false`.',
          })
          .exactOptional(),
        Attempt: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .meta({
            description:
              'Total number of attempts made (including this request) to send the message regardless of the provider used',
          })
          .exactOptional(),
        ValidityPeriod: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .meta({
            description:
              "The maximum length in seconds that the Message can remain in Twilio's outgoing message queue. If a queued Message exceeds the `validity_period`, the Message is not sent. Accepted values are integers from `1` to `36000`. Default value is `36000`. A `validity_period` greater than `5` is recommended. [Learn more about the validity period](https://www.twilio.com/blog/take-more-control-of-outbound-messages-using-validity-period-html)",
          })
          .exactOptional(),
        ForceDelivery: z.stringbool().meta({ description: 'Reserved' }).exactOptional(),
        ContentRetention: MessageEnumContentRetentionSchema.exactOptional(),
        AddressRetention: MessageEnumAddressRetentionSchema.exactOptional(),
        SmartEncoded: z
          .stringbool()
          .meta({
            description:
              'Whether to detect Unicode characters that have a similar GSM-7 character and replace them. Can be: `true` or `false`.',
          })
          .exactOptional(),
        PersistentAction: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .meta({
            description:
              'Rich actions for non-SMS/MMS channels. Used for [sending location in WhatsApp messages](https://www.twilio.com/docs/whatsapp/message-features#location-messages-with-whatsapp).',
          })
          .exactOptional(),
        TrafficType: MessageEnumTrafficTypeSchema.exactOptional(),
        ShortenUrls: z
          .stringbool()
          .meta({
            description:
              'For Messaging Services with [Link Shortening configured](https://www.twilio.com/docs/messaging/features/link-shortening) only: A Boolean indicating whether or not Twilio should shorten links in the `body` of the Message. Default value is `false`. If `true`, the `messaging_service_sid` parameter must also be provided.',
          })
          .exactOptional(),
        ScheduleType: MessageEnumScheduleTypeSchema.exactOptional(),
        SendAt: z.iso
          .datetime({ offset: true })
          .meta({
            description: 'The time that Twilio will send the message. Must be in ISO 8601 format.',
          })
          .exactOptional(),
        SendAsMms: z
          .stringbool()
          .meta({
            description:
              'If set to `true`, Twilio delivers the message as a single MMS message, regardless of the presence of media.',
          })
          .exactOptional(),
        ContentVariables: z
          .string()
          .meta({
            description:
              "For [Content Editor/API](https://www.twilio.com/docs/content) only: Key-value pairs of [Template variables](https://www.twilio.com/docs/content/using-variables-with-content-api) and their substitution values. `content_sid` parameter must also be provided. If values are not defined in the `content_variables` parameter, the [Template's default placeholder values](https://www.twilio.com/docs/content/content-api-resources#create-templates) are used.",
          })
          .exactOptional(),
        MessageIntent: z
          .string()
          .meta({
            description:
              "Specifies the purpose or use case of the outbound communication. This parameter is used by Twilio's [Traffic Shaping](https://www.twilio.com/docs/messaging/features/traffic-shaping) and [Compliance Toolkit](https://www.twilio.com/docs/messaging/features/compliance-toolkit) products. Possible values include: `otp`, `notifications`, `marketing`, `fraud`, `security`, `customercare`, `delivery`, `education`, `polling`, `announcements`, and `events`.",
          })
          .exactOptional(),
        RiskCheck: MessageEnumRiskCheckSchema.exactOptional(),
        From: z
          .string()
          .meta({
            description:
              "The sender's Twilio phone number (in [E.164](https://en.wikipedia.org/wiki/E.164) format), [alphanumeric sender ID](https://www.twilio.com/docs/sms/quickstart), [Wireless SIM](https://www.twilio.com/docs/iot/wireless/programmable-wireless-send-machine-machine-sms-commands), [short code](https://www.twilio.com/en-us/messaging/channels/sms/short-codes), or [channel address](https://www.twilio.com/docs/messaging/channels) (e.g., `whatsapp:+15554449999`). The value of the `from` parameter must be a sender that is hosted within Twilio and belongs to the Account creating the Message. If you are using `messaging_service_sid`, this parameter can be empty (Twilio assigns a `from` value from the Messaging Service's Sender Pool) or you can provide a specific sender from your Sender Pool.",
          })
          .exactOptional(),
        FallbackFrom: z
          .string()
          .meta({
            description:
              'A fallback SMS sender to use when the recipient cannot be reached over RCS. This parameter may only be used when also providing a [Messaging Service](https://twilio.com/docs/messaging/services) containing an RCS sender. The fallback SMS sender must be either a Twilio phone number (in [E.164](https://en.wikipedia.org/wiki/E.164) format), [alphanumeric sender ID](https://www.twilio.com/docs/sms/quickstart), or [short code](https://www.twilio.com/en-us/messaging/channels/sms/short-codes), hosted within Twilio and belong to the Account creating the Message.',
          })
          .exactOptional(),
        MessagingServiceSid: z
          .string()
          .regex(/^MG[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description:
              "The SID of the [Messaging Service](https://www.twilio.com/docs/messaging/services) you want to associate with the Message. When this parameter is provided and the `from` parameter is omitted, Twilio selects the optimal sender from the Messaging Service's Sender Pool. You may also provide a `from` parameter if you want to use a specific Sender from the Sender Pool.",
          })
          .exactOptional(),
        Body: z
          .string()
          .meta({
            description:
              'The text content of the outgoing message. Can be up to 1,600 characters in length. SMS only: If the `body` contains more than 160 [GSM-7](https://www.twilio.com/docs/glossary/what-is-gsm-7-character-encoding) characters (or 70 [UCS-2](https://www.twilio.com/docs/glossary/what-is-ucs-2-character-encoding) characters), the message is segmented and charged accordingly. For long `body` text, consider using the [send_as_mms parameter](https://www.twilio.com/blog/mms-for-long-text-messages).',
          })
          .exactOptional(),
        MediaUrl: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.url()),
          )
          .meta({
            description:
              'The URL of media to include in the Message content. `jpeg`, `jpg`, `gif`, and `png` file types are fully supported by Twilio and content is formatted for delivery on destination devices. The media size limit is 5 MB for supported file types (`jpeg`, `jpg`, `png`, `gif`) and 500 KB for [other types](https://www.twilio.com/docs/messaging/guides/accepted-mime-types) of accepted media. To send more than one image in the message, provide multiple `media_url` parameters in the POST request. You can include up to ten `media_url` parameters per message. [International](https://support.twilio.com/hc/en-us/articles/223179808-Sending-and-receiving-MMS-messages) and [carrier](https://support.twilio.com/hc/en-us/articles/223133707-Is-MMS-supported-for-all-carriers-in-US-and-Canada-) limits apply.',
          })
          .exactOptional(),
        ContentSid: z
          .string()
          .regex(/^HX[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description:
              "For [Content Editor/API](https://www.twilio.com/docs/content) only: The SID of the Content Template to be used with the Message, e.g., `HXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`. If this parameter is not provided, a Content Template is not used. Find the SID in the Console on the Content Editor page. For Content API users, the SID is found in Twilio's response when [creating the Template](https://www.twilio.com/docs/content/content-api-resources#create-templates) or by [fetching your Templates](https://www.twilio.com/docs/content/content-api-resources#fetch-all-content-resources).",
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Messages/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^(SM|MM)[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Messages/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^(SM|MM)[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'form',
      z.object({
        Body: z
          .string()
          .meta({
            description:
              "The new `body` of the Message resource. To redact the text content of a Message, this parameter's value must be an empty string",
          })
          .exactOptional(),
        Status: MessageEnumUpdateStatusSchema.exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Messages/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^(SM|MM)[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Messages/:MessageSid/Feedback.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        MessageSid: z
          .string()
          .regex(/^(SM|MM)[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator('form', z.object({ Outcome: MessageFeedbackEnumOutcomeSchema.exactOptional() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SigningKeys.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SigningKeys.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'form',
      z.object({
        FriendlyName: z
          .string()
          .meta({
            description:
              'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Notifications/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^NO[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Notifications.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        Log: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .exactOptional(),
        MessageDate: z.iso.date().exactOptional(),
        'MessageDate<': z.iso.date().exactOptional(),
        'MessageDate>': z.iso.date().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/OutgoingCallerIds/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^PN[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/OutgoingCallerIds/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^PN[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'form',
      z.object({
        FriendlyName: z
          .string()
          .meta({
            description:
              'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/OutgoingCallerIds/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^PN[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/OutgoingCallerIds.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        PhoneNumber: z.string().exactOptional(),
        FriendlyName: z.string().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/OutgoingCallerIds.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'form',
      z.object({
        PhoneNumber: z
          .string()
          .meta({
            description:
              'The phone number to verify in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
          }),
        FriendlyName: z
          .string()
          .meta({
            description:
              'A descriptive string that you create to describe the new caller ID resource. It can be up to 64 characters long. The default value is a formatted version of the phone number.',
          })
          .exactOptional(),
        CallDelay: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .meta({
            description:
              'The number of seconds to delay before initiating the verification call. Can be an integer between `0` and `60`, inclusive. The default is `0`.',
          })
          .exactOptional(),
        Extension: z
          .string()
          .meta({ description: 'The digits to dial after connecting the verification call.' })
          .exactOptional(),
        StatusCallback: z
          .url()
          .meta({
            description:
              'The URL we should call using the `status_callback_method` to send status information about the verification process to your application.',
          })
          .exactOptional(),
        StatusCallbackMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST`, and the default is `POST`.',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Participants/:CallSid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        ConferenceSid: z
          .string()
          .regex(/^CF[0-9a-fA-F]{32}$/)
          .length(34),
        CallSid: z.string(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Participants/:CallSid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        ConferenceSid: z
          .string()
          .regex(/^CF[0-9a-fA-F]{32}$/)
          .length(34),
        CallSid: z.string(),
      }),
    ),
    sValidator(
      'form',
      z.object({
        Muted: z
          .stringbool()
          .meta({
            description:
              'Whether the participant should be muted. Can be `true` or `false`. `true` will mute the participant, and `false` will un-mute them. Anything value other than `true` or `false` is interpreted as `false`.',
          })
          .exactOptional(),
        Hold: z
          .stringbool()
          .meta({
            description:
              'Whether the participant should be on hold. Can be: `true` or `false`. `true` puts the participant on hold, and `false` lets them rejoin the conference.',
          })
          .exactOptional(),
        HoldUrl: z
          .url()
          .meta({
            description:
              'The URL we call using the `hold_method` for music that plays when the participant is on hold. The URL may return an MP3 file, a WAV file, or a TwiML document that contains `<Play>`, `<Say>`, `<Pause>`, or `<Redirect>` verbs.',
          })
          .exactOptional(),
        HoldMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method we should use to call `hold_url`. Can be: `GET` or `POST` and the default is `GET`.',
          })
          .exactOptional(),
        AnnounceUrl: z
          .url()
          .meta({
            description:
              'The URL we call using the `announce_method` for an announcement to the participant. The URL may return an MP3 file, a WAV file, or a TwiML document that contains `<Play>`, `<Say>`, `<Pause>`, or `<Redirect>` verbs.',
          })
          .exactOptional(),
        AnnounceMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method we should use to call `announce_url`. Can be: `GET` or `POST` and defaults to `POST`.',
          })
          .exactOptional(),
        WaitUrl: z
          .url()
          .meta({
            description:
              "The URL that Twilio calls using the `wait_method` before the conference has started. The URL may return an MP3 file, a WAV file, or a TwiML document. The default value is the URL of our standard hold music. If you do not want anything to play while waiting for the conference to start, specify an empty string by setting `wait_url` to `''`. For more details on the allowable verbs within the `waitUrl`, see the `waitUrl` attribute in the [<Conference> TwiML instruction](https://www.twilio.com/docs/voice/twiml/conference#attributes-waiturl).",
          })
          .exactOptional(),
        WaitMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method we should use to call `wait_url`. Can be `GET` or `POST` and the default is `POST`. When using a static audio file, this should be `GET` so that we can cache the file.',
          })
          .exactOptional(),
        BeepOnExit: z
          .stringbool()
          .meta({
            description:
              'Whether to play a notification beep to the conference when the participant exits. Can be: `true` or `false`.',
          })
          .exactOptional(),
        EndConferenceOnExit: z
          .stringbool()
          .meta({
            description:
              'Whether to end the conference when the participant leaves. Can be: `true` or `false` and defaults to `false`.',
          })
          .exactOptional(),
        Coaching: z
          .stringbool()
          .meta({
            description:
              'Whether the participant is coaching another call. Can be: `true` or `false`. If not present, defaults to `false` unless `call_sid_to_coach` is defined. If `true`, `call_sid_to_coach` must be defined.',
          })
          .exactOptional(),
        CallSidToCoach: z
          .string()
          .regex(/^CA[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description:
              'The SID of the participant who is being `coached`. The participant being coached is the only participant who can hear the participant who is `coaching`.',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Participants/:CallSid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        ConferenceSid: z
          .string()
          .regex(/^CF[0-9a-fA-F]{32}$/)
          .length(34),
        CallSid: z.string(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Participants.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        ConferenceSid: z
          .string()
          .regex(/^CF[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        Muted: z.stringbool().exactOptional(),
        Hold: z.stringbool().exactOptional(),
        Coaching: z.stringbool().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Participants.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        ConferenceSid: z.string(),
      }),
    ),
    sValidator(
      'form',
      z.object({
        From: z
          .string()
          .meta({
            description:
              'The phone number, Client identifier, or username portion of SIP address that made this call. Phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +16175551212). Client identifiers are formatted `client:name`. If using a phone number, it must be a Twilio number or a Verified [outgoing caller id](https://www.twilio.com/docs/voice/api/outgoing-caller-ids) for your account. If the `to` parameter is a phone number, `from` must also be a phone number. If `to` is sip address, this value of `from` should be a username portion to be used to populate the P-Asserted-Identity header that is passed to the SIP endpoint.',
          }),
        To: z
          .string()
          .meta({
            description:
              'The phone number, SIP address, Client, TwiML App identifier that received this call. Phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +16175551212). SIP addresses are formatted as `sip:name@company.com`. Client identifiers are formatted `client:name`. TwiML App identifiers are formatted `app:<APP_SID>`. [Custom parameters](https://www.twilio.com/docs/voice/api/conference-participant-resource#custom-parameters) may also be specified.',
          }),
        StatusCallback: z
          .url()
          .meta({
            description:
              'The URL we should call using the `status_callback_method` to send status information to your application.',
          })
          .exactOptional(),
        StatusCallbackMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method we should use to call `status_callback`. Can be: `GET` and `POST` and defaults to `POST`.',
          })
          .exactOptional(),
        StatusCallbackEvent: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .meta({
            description:
              'The conference state changes that should generate a call to `status_callback`. Can be: `initiated`, `ringing`, `answered`, and `completed`. Separate multiple values with a space. The default value is `completed`.',
          })
          .exactOptional(),
        Label: z
          .string()
          .meta({
            description:
              'A label for this participant. If one is supplied, it may subsequently be used to fetch, update or delete the participant.',
          })
          .exactOptional(),
        Timeout: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .meta({
            description:
              'The number of seconds that we should allow the phone to ring before assuming there is no answer. Can be an integer between `5` and `600`, inclusive. The default value is `60`. We always add a 5-second timeout buffer to outgoing calls, so  value of 10 would result in an actual timeout that was closer to 15 seconds.',
          })
          .exactOptional(),
        Record: z
          .stringbool()
          .meta({
            description:
              'Whether to record the participant and their conferences, including the time between conferences. Can be `true` or `false` and the default is `false`.',
          })
          .exactOptional(),
        Muted: z
          .stringbool()
          .meta({
            description:
              'Whether the agent is muted in the conference. Can be `true` or `false` and the default is `false`.',
          })
          .exactOptional(),
        Beep: z
          .string()
          .meta({
            description:
              'Whether to play a notification beep to the conference when the participant joins. Can be: `true`, `false`, `onEnter`, or `onExit`. The default value is `true`.',
          })
          .exactOptional(),
        StartConferenceOnEnter: z
          .stringbool()
          .meta({
            description:
              'Whether to start the conference when the participant joins, if it has not already started. Can be: `true` or `false` and the default is `true`. If `false` and the conference has not started, the participant is muted and hears background music until another participant starts the conference.',
          })
          .exactOptional(),
        EndConferenceOnExit: z
          .stringbool()
          .meta({
            description:
              'Whether to end the conference when the participant leaves. Can be: `true` or `false` and defaults to `false`.',
          })
          .exactOptional(),
        WaitUrl: z
          .url()
          .meta({
            description:
              "The URL that Twilio calls using the `wait_method` before the conference has started. The URL may return an MP3 file, a WAV file, or a TwiML document. The default value is the URL of our standard hold music. If you do not want anything to play while waiting for the conference to start, specify an empty string by setting `wait_url` to `''`. For more details on the allowable verbs within the `waitUrl`, see the `waitUrl` attribute in the [<Conference> TwiML instruction](https://www.twilio.com/docs/voice/twiml/conference#attributes-waiturl).",
          })
          .exactOptional(),
        WaitMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method we should use to call `wait_url`. Can be `GET` or `POST` and the default is `POST`. When using a static audio file, this should be `GET` so that we can cache the file.',
          })
          .exactOptional(),
        EarlyMedia: z
          .stringbool()
          .meta({
            description:
              'Whether to allow an agent to hear the state of the outbound call, including ringing or disconnect messages. Can be: `true` or `false` and defaults to `true`.',
          })
          .exactOptional(),
        MaxParticipants: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .meta({
            description:
              'The maximum number of participants in the conference. Can be a positive integer from `2` to `250`. The default value is `250`.',
          })
          .exactOptional(),
        ConferenceRecord: z
          .string()
          .meta({
            description:
              'Whether to record the conference the participant is joining. Can be: `true`, `false`, `record-from-start`, and `do-not-record`. The default value is `false`.',
          })
          .exactOptional(),
        ConferenceTrim: z
          .string()
          .meta({
            description:
              'Whether to trim leading and trailing silence from the conference recording. Can be: `trim-silence` or `do-not-trim` and defaults to `trim-silence`.',
          })
          .exactOptional(),
        ConferenceStatusCallback: z
          .url()
          .meta({
            description:
              'The URL we should call using the `conference_status_callback_method` when the conference events in `conference_status_callback_event` occur. Only the value set by the first participant to join the conference is used. Subsequent `conference_status_callback` values are ignored.',
          })
          .exactOptional(),
        ConferenceStatusCallbackMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method we should use to call `conference_status_callback`. Can be: `GET` or `POST` and defaults to `POST`.',
          })
          .exactOptional(),
        ConferenceStatusCallbackEvent: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .meta({
            description:
              'The conference state changes that should generate a call to `conference_status_callback`. Can be: `start`, `end`, `join`, `leave`, `mute`, `hold`, `modify`, `speaker`, and `announcement`. Separate multiple values with a space. Defaults to `start end`.',
          })
          .exactOptional(),
        RecordingChannels: z
          .string()
          .meta({
            description:
              'The recording channels for the final recording. Can be: `mono` or `dual` and the default is `mono`.',
          })
          .exactOptional(),
        RecordingStatusCallback: z
          .url()
          .meta({
            description:
              'The URL that we should call using the `recording_status_callback_method` when the recording status changes.',
          })
          .exactOptional(),
        RecordingStatusCallbackMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method we should use when we call `recording_status_callback`. Can be: `GET` or `POST` and defaults to `POST`.',
          })
          .exactOptional(),
        SipAuthUsername: z
          .string()
          .meta({ description: 'The SIP username used for authentication.' })
          .exactOptional(),
        SipAuthPassword: z
          .string()
          .meta({ description: 'The SIP password for authentication.' })
          .exactOptional(),
        Region: z
          .string()
          .meta({
            description:
              'The [region](https://support.twilio.com/hc/en-us/articles/223132167-How-global-low-latency-routing-and-region-selection-work-for-conferences-and-Client-calls) where we should mix the recorded audio. Can be:`us1`, `us2`, `ie1`, `de1`, `sg1`, `br1`, `au1`, or `jp1`.',
          })
          .exactOptional(),
        ConferenceRecordingStatusCallback: z
          .url()
          .meta({
            description:
              'The URL we should call using the `conference_recording_status_callback_method` when the conference recording is available.',
          })
          .exactOptional(),
        ConferenceRecordingStatusCallbackMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method we should use to call `conference_recording_status_callback`. Can be: `GET` or `POST` and defaults to `POST`.',
          })
          .exactOptional(),
        RecordingStatusCallbackEvent: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .meta({
            description:
              "The recording state changes that should generate a call to `recording_status_callback`. Can be: `started`, `in-progress`, `paused`, `resumed`, `stopped`, `completed`, `failed`, and `absent`. Separate multiple values with a space, ex: `'in-progress completed failed'`.",
          })
          .exactOptional(),
        ConferenceRecordingStatusCallbackEvent: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .meta({
            description:
              "The conference recording state changes that generate a call to `conference_recording_status_callback`. Can be: `in-progress`, `completed`, `failed`, and `absent`. Separate multiple values with a space, ex: `'in-progress completed failed'`",
          })
          .exactOptional(),
        Coaching: z
          .stringbool()
          .meta({
            description:
              'Whether the participant is coaching another call. Can be: `true` or `false`. If not present, defaults to `false` unless `call_sid_to_coach` is defined. If `true`, `call_sid_to_coach` must be defined.',
          })
          .exactOptional(),
        CallSidToCoach: z
          .string()
          .regex(/^CA[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description:
              'The SID of the participant who is being `coached`. The participant being coached is the only participant who can hear the participant who is `coaching`.',
          })
          .exactOptional(),
        JitterBufferSize: z
          .string()
          .meta({
            description:
              "Jitter buffer size for the connecting participant. Twilio will use this setting to apply Jitter Buffer before participant's audio is mixed into the conference. Can be: `off`, `small`, `medium`, and `large`. Default to `large`.",
          })
          .exactOptional(),
        Byoc: z
          .string()
          .regex(/^BY[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description:
              'The SID of a BYOC (Bring Your Own Carrier) trunk to route this call with. Note that `byoc` is only meaningful when `to` is a phone number; it will otherwise be ignored. (Beta)',
          })
          .exactOptional(),
        CallerId: z
          .string()
          .meta({
            description:
              'The phone number, Client identifier, or username portion of SIP address that made this call. Phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +16175551212). Client identifiers are formatted `client:name`. If using a phone number, it must be a Twilio number or a Verified [outgoing caller id](https://www.twilio.com/docs/voice/api/outgoing-caller-ids) for your account. If the `to` parameter is a phone number, `callerId` must also be a phone number. If `to` is sip address, this value of `callerId` should be a username portion to be used to populate the From header that is passed to the SIP endpoint.',
          })
          .exactOptional(),
        CallReason: z
          .string()
          .meta({
            description:
              "The Reason for the outgoing call. Use it to specify the purpose of the call that is presented on the called party's phone. (Branded Calls Beta)",
          })
          .exactOptional(),
        RecordingTrack: z
          .string()
          .meta({
            description:
              'The audio track to record for the call. Can be: `inbound`, `outbound` or `both`. The default is `both`. `inbound` records the audio that is received by Twilio. `outbound` records the audio that is sent from Twilio. `both` records the audio that is received and sent by Twilio.',
          })
          .exactOptional(),
        RecordingConfigurationId: z
          .string()
          .meta({
            description:
              'The identifier of the configuration to be used when creating and processing the recording',
          })
          .exactOptional(),
        TimeLimit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .meta({
            description:
              'The maximum duration of the call in seconds. Constraints depend on account and configuration.',
          })
          .exactOptional(),
        MachineDetection: z
          .string()
          .meta({
            description:
              'Whether to detect if a human, answering machine, or fax has picked up the call. Can be: `Enable` or `DetectMessageEnd`. Use `Enable` if you would like us to return `AnsweredBy` as soon as the called party is identified. Use `DetectMessageEnd`, if you would like to leave a message on an answering machine. For more information, see [Answering Machine Detection](https://www.twilio.com/docs/voice/answering-machine-detection).',
          })
          .exactOptional(),
        MachineDetectionTimeout: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .meta({
            description:
              'The number of seconds that we should attempt to detect an answering machine before timing out and sending a voice request with `AnsweredBy` of `unknown`. The default timeout is 30 seconds.',
          })
          .exactOptional(),
        MachineDetectionSpeechThreshold: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .meta({
            description:
              'The number of milliseconds that is used as the measuring stick for the length of the speech activity, where durations lower than this value will be interpreted as a human and longer than this value as a machine. Possible Values: 1000-6000. Default: 2400.',
          })
          .exactOptional(),
        MachineDetectionSpeechEndThreshold: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .meta({
            description:
              'The number of milliseconds of silence after speech activity at which point the speech activity is considered complete. Possible Values: 500-5000. Default: 1200.',
          })
          .exactOptional(),
        MachineDetectionSilenceTimeout: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .meta({
            description:
              'The number of milliseconds of initial silence after which an `unknown` AnsweredBy result will be returned. Possible Values: 2000-10000. Default: 5000.',
          })
          .exactOptional(),
        AmdStatusCallback: z
          .url()
          .meta({
            description:
              'The URL that we should call using the `amd_status_callback_method` to notify customer application whether the call was answered by human, machine or fax.',
          })
          .exactOptional(),
        AmdStatusCallbackMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method we should use when calling the `amd_status_callback` URL. Can be: `GET` or `POST` and the default is `POST`.',
          })
          .exactOptional(),
        Trim: z
          .string()
          .meta({
            description:
              'Whether to trim any leading and trailing silence from the participant recording. Can be: `trim-silence` or `do-not-trim` and the default is `trim-silence`.',
          })
          .exactOptional(),
        CallToken: z
          .string()
          .meta({
            description:
              "A token string needed to invoke a forwarded call. A call_token is generated when an incoming call is received on a Twilio number. Pass an incoming call's call_token value to a forwarded call via the call_token parameter when creating a new call. A forwarded call should bear the same CallerID of the original incoming call.",
          })
          .exactOptional(),
        Passports: z
          .string()
          .meta({
            description:
              'The STIR/SHAKEN passport for this call, provided as a base64 encoded string. Multiple passports (at max 5) are comma separated and provided as base64 encoded string',
          })
          .exactOptional(),
        ClientNotificationUrl: z
          .url()
          .meta({ description: 'The URL that we should use to deliver `push call notification`.' })
          .exactOptional(),
        CallerDisplayName: z
          .string()
          .meta({
            description:
              'The name that populates the display name in the From header. Must be between 2 and 255 characters. Only applicable for calls to sip address.',
          })
          .exactOptional(),
        EmergencyCallerPosition: z
          .string()
          .meta({
            description:
              'The emergency caller\'s GPS coordinates in decimal degrees format.\nFormat: "latitude longitude" (space-separated)\n- Latitude: decimal degrees, range -90.0 to +90.0 (negative for South, positive for North)\n- Longitude: decimal degrees, range -180.0 to +180.0 (negative for West, positive for East)\n- Precision: up to 6 decimal places recommended for meter-level accuracy\n\nNote: If the value exceeds 150 characters, only the first 150 characters will be used.\n',
          })
          .exactOptional(),
        EmergencyCallerLocation: z
          .string()
          .meta({
            description:
              "The emergency caller's physical location description within a building or facility.\n\nNote: If the value exceeds 20 characters, only the first 20 characters will be used.\n",
          })
          .exactOptional(),
        EmergencyName: z
          .string()
          .meta({
            description:
              "The emergency caller's organization or entity name.\n\nNote: If the value exceeds 20 characters, only the first 20 characters will be used.\n",
          })
          .exactOptional(),
        EmergencyAddress: z
          .string()
          .meta({
            description:
              "The emergency caller's street address including street number and street name.\n\nNote: If the value exceeds 60 characters, only the first 60 characters will be used.\n",
          })
          .exactOptional(),
        EmergencyZipCode: z
          .string()
          .meta({
            description:
              "The emergency caller's postal code or ZIP code.\n\nNote: If the value exceeds 20 characters, only the first 20 characters will be used.\n",
          })
          .exactOptional(),
        EmergencyCity: z
          .string()
          .meta({
            description:
              "The emergency caller's city or municipality name.\nShould be the official city name as recognized by local authorities.\nUsed in combination with state and country for emergency call routing.\n\nNote: If the value exceeds 20 characters, only the first 20 characters will be used.\n",
          })
          .exactOptional(),
        EmergencyState: z
          .string()
          .meta({
            description:
              "The emergency caller's state or province.\n\nNote: If the value exceeds 20 characters, only the first 20 characters will be used.\n",
          })
          .exactOptional(),
        EmergencyCountry: z
          .string()
          .meta({
            description:
              "The emergency caller's country. Currently supported US and CA only.\n\nNote: If the value exceeds 20 characters, only the first 20 characters will be used.\n",
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Payments.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CallSid: z
          .string()
          .regex(/^CA[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'form',
      z.object({
        IdempotencyKey: z
          .string()
          .meta({
            description:
              'A unique token that will be used to ensure that multiple API calls with the same information do not result in multiple transactions. This should be a unique string value per API call and can be a randomly generated.',
          }),
        StatusCallback: z
          .url()
          .meta({
            description:
              'Provide an absolute or relative URL to receive status updates regarding your Pay session. Read more about the [expected StatusCallback values](https://www.twilio.com/docs/voice/api/payment-resource#statuscallback)',
          }),
        BankAccountType: PaymentsEnumBankAccountTypeSchema.exactOptional(),
        ChargeAmount: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
                ? Number(val)
                : val,
            z.number(),
          )
          .meta({
            description:
              'A positive decimal value less than 1,000,000 to charge against the credit card or bank account. Default currency can be overwritten with `currency` field. Leave blank or set to 0 to tokenize.',
          })
          .exactOptional(),
        Currency: z
          .string()
          .meta({
            description:
              'The currency of the `charge_amount`, formatted as [ISO 4127](http://www.iso.org/iso/home/standards/currency_codes.htm) format. The default value is `USD` and all values allowed from the Pay Connector are accepted.',
          })
          .exactOptional(),
        Description: z
          .string()
          .meta({
            description:
              'The description can be used to provide more details regarding the transaction. This information is submitted along with the payment details to the Payment Connector which are then posted on the transactions.',
          })
          .exactOptional(),
        Input: z
          .string()
          .meta({
            description:
              'A list of inputs that should be accepted. Currently only `dtmf` is supported. All digits captured during a pay session are redacted from the logs.',
          })
          .exactOptional(),
        MinPostalCodeLength: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .meta({
            description:
              'A positive integer that is used to validate the length of the `PostalCode` inputted by the user. User must enter this many digits.',
          })
          .exactOptional(),
        Parameter: z
          .any()
          .meta({
            description:
              'A single-level JSON object used to pass custom parameters to payment processors. (Required for ACH payments). The information that has to be included here depends on the <Pay> Connector. [Read more](https://www.twilio.com/console/voice/pay-connectors).',
          })
          .exactOptional(),
        PaymentConnector: z
          .string()
          .meta({
            description:
              'This is the unique name corresponding to the Pay Connector installed in the Twilio Add-ons. Learn more about [<Pay> Connectors](https://www.twilio.com/console/voice/pay-connectors). The default value is `Default`.',
          })
          .exactOptional(),
        PaymentMethod: PaymentsEnumPaymentMethodSchema.exactOptional(),
        PostalCode: z
          .stringbool()
          .meta({
            description:
              'Indicates whether the credit card postal code (zip code) is a required piece of payment information that must be provided by the caller. The default is `true`.',
          })
          .exactOptional(),
        SecurityCode: z
          .stringbool()
          .meta({
            description:
              'Indicates whether the credit card security code is a required piece of payment information that must be provided by the caller. The default is `true`.',
          })
          .exactOptional(),
        Timeout: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .meta({
            description:
              'The number of seconds that <Pay> should wait for the caller to press a digit between each subsequent digit, after the first one, before moving on to validate the digits captured. The default is `5`, maximum is `600`.',
          })
          .exactOptional(),
        TokenType: PaymentsEnumTokenTypeSchema.exactOptional(),
        ValidCardTypes: z
          .string()
          .meta({
            description:
              'Credit card types separated by space that Pay should accept. The default value is `visa mastercard amex`',
          })
          .exactOptional(),
        RequireMatchingInputs: z
          .string()
          .meta({
            description:
              'A comma-separated list of payment information fields that require the caller to enter the same value twice for confirmation. Supported values are `payment-card-number`, `expiration-date`, `security-code`, and `postal-code`.',
          })
          .exactOptional(),
        Confirmation: z
          .enum(['true', 'false'])
          .meta({
            description:
              'Whether to prompt the caller to confirm their payment information before submitting to the payment gateway. If `true`, the caller will hear the last 4 digits of their card or account number and must press 1 to confirm or 2 to cancel. Default is `false`.',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Payments/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CallSid: z
          .string()
          .regex(/^CA[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^PK[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'form',
      z.object({
        IdempotencyKey: z
          .string()
          .meta({
            description:
              'A unique token that will be used to ensure that multiple API calls with the same information do not result in multiple transactions. This should be a unique string value per API call and can be a randomly generated.',
          }),
        StatusCallback: z
          .url()
          .meta({
            description:
              'Provide an absolute or relative URL to receive status updates regarding your Pay session. Read more about the [Update](https://www.twilio.com/docs/voice/api/payment-resource#statuscallback-update) and [Complete/Cancel](https://www.twilio.com/docs/voice/api/payment-resource#statuscallback-cancelcomplete) POST requests.',
          }),
        Capture: PaymentsEnumCaptureSchema.exactOptional(),
        Status: PaymentsEnumStatusSchema.exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Queues/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^QU[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Queues/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^QU[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'form',
      z.object({
        FriendlyName: z
          .string()
          .meta({
            description:
              'A descriptive string that you created to describe this resource. It can be up to 64 characters long.',
          })
          .exactOptional(),
        MaxSize: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .meta({
            description:
              'The maximum number of calls allowed to be in the queue. The default is 1000. The maximum is 5000.',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Queues/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^QU[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Queues.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Queues.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'form',
      z.object({
        FriendlyName: z
          .string()
          .meta({
            description:
              'A descriptive string that you created to describe this resource. It can be up to 64 characters long.',
          }),
        MaxSize: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .meta({
            description:
              'The maximum number of calls allowed to be in the queue. The default is 1000. The maximum is 5000.',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Transcriptions.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CallSid: z
          .string()
          .regex(/^CA[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'form',
      z.object({
        Name: z
          .string()
          .meta({
            description:
              'The user-specified name of this Transcription, if one was given when the Transcription was created. This may be used to stop the Transcription.',
          })
          .exactOptional(),
        Track: RealtimeTranscriptionEnumTrackSchema.exactOptional(),
        StatusCallbackUrl: z
          .url()
          .meta({ description: 'Absolute URL of the status callback.' })
          .exactOptional(),
        StatusCallbackMethod: z
          .enum(['GET', 'POST'])
          .meta({ description: 'The http method for the status_callback (one of GET, POST).' })
          .exactOptional(),
        InboundTrackLabel: z
          .string()
          .meta({ description: 'Friendly name given to the Inbound Track' })
          .exactOptional(),
        OutboundTrackLabel: z
          .string()
          .meta({ description: 'Friendly name given to the Outbound Track' })
          .exactOptional(),
        PartialResults: z
          .stringbool()
          .meta({
            description: 'Indicates if partial results are going to be sent to the customer',
          })
          .exactOptional(),
        LanguageCode: z
          .string()
          .meta({
            description:
              'Language code used by the transcription engine, specified in [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt) format',
          })
          .exactOptional(),
        TranscriptionEngine: z
          .string()
          .meta({
            description:
              'Definition of the transcription engine to be used, among those supported by Twilio',
          })
          .exactOptional(),
        ProfanityFilter: z
          .stringbool()
          .meta({
            description:
              'indicates if the server will attempt to filter out profanities, replacing all but the initial character in each filtered word with asterisks',
          })
          .exactOptional(),
        SpeechModel: z
          .string()
          .meta({
            description:
              'Recognition model used by the transcription engine, among those supported by the provider',
          })
          .exactOptional(),
        Hints: z
          .string()
          .meta({
            description:
              'A Phrase contains words and phrase "hints" so that the speech recognition engine is more likely to recognize them.',
          })
          .exactOptional(),
        EnableAutomaticPunctuation: z
          .stringbool()
          .meta({ description: 'The provider will add punctuation to recognition result' })
          .exactOptional(),
        IntelligenceService: z
          .string()
          .meta({
            description:
              'The SID or unique name of the [Intelligence Service](https://www.twilio.com/docs/conversational-intelligence/api/service-resource) for persisting transcripts and running post-call Language Operators',
          })
          .exactOptional(),
        ConversationConfiguration: z
          .string()
          .meta({
            description:
              'The ID of the Conversations Configuration for customizing conversation behavior in Intelligence Service',
          })
          .exactOptional(),
        ConversationId: z
          .string()
          .meta({
            description:
              'The ID of the Conversation for associating this Transcription with an existing Conversation in Intelligence Service',
          })
          .exactOptional(),
        TranscriptionConfigurationId: z
          .string()
          .meta({
            description:
              'The ID of the RealTimeTranscription Configuration for configuring all the non-default behaviors in one go.',
          })
          .exactOptional(),
        EnableProviderData: z
          .stringbool()
          .meta({ description: 'Whether the callback includes raw provider data.' })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Transcriptions/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CallSid: z
          .string()
          .regex(/^CA[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z.string(),
      }),
    ),
    sValidator('form', z.object({ Status: RealtimeTranscriptionEnumUpdateStatusSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^RE[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator('query', z.object({ IncludeSoftDeleted: z.stringbool().exactOptional() })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^RE[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        DateCreated: z.iso.datetime({ offset: true }).exactOptional(),
        'DateCreated<': z.iso.datetime({ offset: true }).exactOptional(),
        'DateCreated>': z.iso.datetime({ offset: true }).exactOptional(),
        CallSid: z
          .string()
          .regex(/^CA[0-9a-fA-F]{32}$/)
          .length(34)
          .exactOptional(),
        ConferenceSid: z
          .string()
          .regex(/^CF[0-9a-fA-F]{32}$/)
          .length(34)
          .exactOptional(),
        IncludeSoftDeleted: z.stringbool().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        ReferenceSid: z
          .string()
          .regex(/^RE[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^XR[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        ReferenceSid: z
          .string()
          .regex(/^RE[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^XR[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        ReferenceSid: z
          .string()
          .regex(/^RE[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults/:AddOnResultSid/Payloads/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        ReferenceSid: z
          .string()
          .regex(/^RE[0-9a-fA-F]{32}$/)
          .length(34),
        AddOnResultSid: z
          .string()
          .regex(/^XR[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^XH[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults/:AddOnResultSid/Payloads/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        ReferenceSid: z
          .string()
          .regex(/^RE[0-9a-fA-F]{32}$/)
          .length(34),
        AddOnResultSid: z
          .string()
          .regex(/^XR[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^XH[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults/:AddOnResultSid/Payloads.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        ReferenceSid: z
          .string()
          .regex(/^RE[0-9a-fA-F]{32}$/)
          .length(34),
        AddOnResultSid: z
          .string()
          .regex(/^XR[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults/:AddOnResultSid/Payloads/:PayloadSid/Data.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        ReferenceSid: z
          .string()
          .regex(/^RE[0-9a-fA-F]{32}$/)
          .length(34),
        AddOnResultSid: z
          .string()
          .regex(/^XR[0-9a-fA-F]{32}$/)
          .length(34),
        PayloadSid: z
          .string()
          .regex(/^XH[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:RecordingSid/Transcriptions/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        RecordingSid: z
          .string()
          .regex(/^RE[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^TR[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:RecordingSid/Transcriptions/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        RecordingSid: z
          .string()
          .regex(/^RE[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^TR[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:RecordingSid/Transcriptions.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        RecordingSid: z
          .string()
          .regex(/^RE[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SMS/ShortCodes/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^SC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SMS/ShortCodes/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^SC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'form',
      z.object({
        FriendlyName: z
          .string()
          .meta({
            description:
              'A descriptive string that you created to describe this resource. It can be up to 64 characters long. By default, the `FriendlyName` is the short code.',
          })
          .exactOptional(),
        ApiVersion: z
          .string()
          .meta({
            description:
              'The API version to use to start a new TwiML session. Can be: `2010-04-01` or `2008-08-01`.',
          })
          .exactOptional(),
        SmsUrl: z
          .url()
          .meta({
            description:
              'The URL we should call when receiving an incoming SMS message to this short code.',
          })
          .exactOptional(),
        SmsMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method we should use when calling the `sms_url`. Can be: `GET` or `POST`.',
          })
          .exactOptional(),
        SmsFallbackUrl: z
          .url()
          .meta({
            description:
              'The URL that we should call if an error occurs while retrieving or executing the TwiML from `sms_url`.',
          })
          .exactOptional(),
        SmsFallbackMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method that we should use to call the `sms_fallback_url`. Can be: `GET` or `POST`.',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SMS/ShortCodes.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        FriendlyName: z.string().exactOptional(),
        ShortCode: z.string().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SigningKeys/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^SK[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SigningKeys/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^SK[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'form',
      z.object({ FriendlyName: z.string().meta({ description: '' }).exactOptional() }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SigningKeys/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^SK[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/CredentialListMappings.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        DomainSid: z
          .string()
          .regex(/^SD[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/CredentialListMappings.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        DomainSid: z
          .string()
          .regex(/^SD[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'form',
      z.object({
        CredentialListSid: z
          .string()
          .regex(/^CL[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description: 'The SID of the CredentialList resource to map to the SIP domain.',
          }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/CredentialListMappings/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        DomainSid: z
          .string()
          .regex(/^SD[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^CL[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/CredentialListMappings/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        DomainSid: z
          .string()
          .regex(/^SD[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^CL[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/IpAccessControlListMappings.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        DomainSid: z
          .string()
          .regex(/^SD[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/IpAccessControlListMappings.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        DomainSid: z
          .string()
          .regex(/^SD[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'form',
      z.object({
        IpAccessControlListSid: z
          .string()
          .regex(/^AL[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description: 'The SID of the IpAccessControlList resource to map to the SIP domain.',
          }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/IpAccessControlListMappings/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        DomainSid: z
          .string()
          .regex(/^SD[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^AL[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/IpAccessControlListMappings/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        DomainSid: z
          .string()
          .regex(/^SD[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^AL[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Registrations/CredentialListMappings.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        DomainSid: z
          .string()
          .regex(/^SD[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Registrations/CredentialListMappings.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        DomainSid: z
          .string()
          .regex(/^SD[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'form',
      z.object({
        CredentialListSid: z
          .string()
          .regex(/^CL[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description: 'The SID of the CredentialList resource to map to the SIP domain.',
          }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Registrations/CredentialListMappings/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        DomainSid: z
          .string()
          .regex(/^SD[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^CL[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Registrations/CredentialListMappings/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        DomainSid: z
          .string()
          .regex(/^SD[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^CL[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:CredentialListSid/Credentials.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CredentialListSid: z
          .string()
          .regex(/^CL[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:CredentialListSid/Credentials.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CredentialListSid: z
          .string()
          .regex(/^CL[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'form',
      z.object({
        Username: z
          .string()
          .meta({
            description:
              "The username that will be passed when authenticating SIP requests. The username should be sent in response to Twilio's challenge of the initial INVITE. It can be up to 32 characters long.",
          }),
        Password: z
          .string()
          .meta({
            description:
              'The password that the username will use when authenticating SIP requests. The password must be a minimum of 12 characters, contain at least 1 digit, and have mixed case. (eg `IWasAtSignal2018`)',
          }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:CredentialListSid/Credentials/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CredentialListSid: z
          .string()
          .regex(/^CL[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^CR[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:CredentialListSid/Credentials/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CredentialListSid: z
          .string()
          .regex(/^CL[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^CR[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'form',
      z.object({
        Password: z
          .string()
          .meta({
            description:
              'The password that the username will use when authenticating SIP requests. The password must be a minimum of 12 characters, contain at least 1 digit, and have mixed case. (eg `IWasAtSignal2018`)',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:CredentialListSid/Credentials/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CredentialListSid: z
          .string()
          .regex(/^CL[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^CR[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'form',
      z.object({
        FriendlyName: z
          .string()
          .meta({
            description:
              'A human readable descriptive text that describes the CredentialList, up to 64 characters long.',
          }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^CL[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^CL[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'form',
      z.object({
        FriendlyName: z
          .string()
          .meta({
            description:
              'A human readable descriptive text for a CredentialList, up to 64 characters long.',
          }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^CL[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/CredentialListMappings.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        DomainSid: z
          .string()
          .regex(/^SD[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/CredentialListMappings.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        DomainSid: z
          .string()
          .regex(/^SD[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'form',
      z.object({
        CredentialListSid: z
          .string()
          .regex(/^CL[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description:
              'A 34 character string that uniquely identifies the CredentialList resource to map to the SIP domain.',
          }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/CredentialListMappings/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        DomainSid: z
          .string()
          .regex(/^SD[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^CL[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/CredentialListMappings/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        DomainSid: z
          .string()
          .regex(/^SD[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^CL[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'form',
      z.object({
        DomainName: z
          .string()
          .meta({
            description:
              'The unique address you reserve on Twilio to which you route your SIP traffic. Domain names can contain letters, digits, and "-" and must end with `sip.twilio.com`.',
          }),
        FriendlyName: z
          .string()
          .meta({
            description:
              'A descriptive string that you created to describe the resource. It can be up to 64 characters long.',
          })
          .exactOptional(),
        VoiceUrl: z
          .url()
          .meta({ description: 'The URL we should when the domain receives a call.' })
          .exactOptional(),
        VoiceMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method we should use to call `voice_url`. Can be: `GET` or `POST`.',
          })
          .exactOptional(),
        VoiceFallbackUrl: z
          .url()
          .meta({
            description:
              'The URL that we should call when an error occurs while retrieving or executing the TwiML from `voice_url`.',
          })
          .exactOptional(),
        VoiceFallbackMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method we should use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
          })
          .exactOptional(),
        VoiceStatusCallbackUrl: z
          .url()
          .meta({
            description:
              'The URL that we should call to pass status parameters (such as call ended) to your application.',
          })
          .exactOptional(),
        VoiceStatusCallbackMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method we should use to call `voice_status_callback_url`. Can be: `GET` or `POST`.',
          })
          .exactOptional(),
        SipRegistration: z
          .stringbool()
          .meta({
            description:
              'Whether to allow SIP Endpoints to register with the domain to receive calls. Can be `true` or `false`. `true` allows SIP Endpoints to register with the domain to receive calls, `false` does not.',
          })
          .exactOptional(),
        EmergencyCallingEnabled: z
          .stringbool()
          .meta({
            description:
              'Whether emergency calling is enabled for the domain. If enabled, allows emergency calls on the domain from phone numbers with validated addresses.',
          })
          .exactOptional(),
        Secure: z
          .stringbool()
          .meta({
            description:
              'Whether secure SIP is enabled for the domain. If enabled, TLS will be enforced and SRTP will be negotiated on all incoming calls to this sip domain.',
          })
          .exactOptional(),
        ByocTrunkSid: z
          .string()
          .regex(/^BY[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description:
              'The SID of the BYOC Trunk(Bring Your Own Carrier) resource that the Sip Domain will be associated with.',
          })
          .exactOptional(),
        EmergencyCallerSid: z
          .string()
          .regex(/^PN[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description:
              'Whether an emergency caller sid is configured for the domain. If present, this phone number will be used as the callback for the emergency call.',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^SD[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^SD[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'form',
      z.object({
        FriendlyName: z
          .string()
          .meta({
            description:
              'A descriptive string that you created to describe the resource. It can be up to 64 characters long.',
          })
          .exactOptional(),
        VoiceFallbackMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method we should use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
          })
          .exactOptional(),
        VoiceFallbackUrl: z
          .url()
          .meta({
            description:
              'The URL that we should call when an error occurs while retrieving or executing the TwiML requested by `voice_url`.',
          })
          .exactOptional(),
        VoiceMethod: z
          .enum(['GET', 'POST'])
          .meta({ description: 'The HTTP method we should use to call `voice_url`' })
          .exactOptional(),
        VoiceStatusCallbackMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method we should use to call `voice_status_callback_url`. Can be: `GET` or `POST`.',
          })
          .exactOptional(),
        VoiceStatusCallbackUrl: z
          .url()
          .meta({
            description:
              'The URL that we should call to pass status parameters (such as call ended) to your application.',
          })
          .exactOptional(),
        VoiceUrl: z
          .url()
          .meta({ description: 'The URL we should call when the domain receives a call.' })
          .exactOptional(),
        SipRegistration: z
          .stringbool()
          .meta({
            description:
              'Whether to allow SIP Endpoints to register with the domain to receive calls. Can be `true` or `false`. `true` allows SIP Endpoints to register with the domain to receive calls, `false` does not.',
          })
          .exactOptional(),
        DomainName: z
          .string()
          .meta({
            description:
              'The unique address you reserve on Twilio to which you route your SIP traffic. Domain names can contain letters, digits, and "-" and must end with `sip.twilio.com`.',
          })
          .exactOptional(),
        EmergencyCallingEnabled: z
          .stringbool()
          .meta({
            description:
              'Whether emergency calling is enabled for the domain. If enabled, allows emergency calls on the domain from phone numbers with validated addresses.',
          })
          .exactOptional(),
        Secure: z
          .stringbool()
          .meta({
            description:
              'Whether secure SIP is enabled for the domain. If enabled, TLS will be enforced and SRTP will be negotiated on all incoming calls to this sip domain.',
          })
          .exactOptional(),
        ByocTrunkSid: z
          .string()
          .regex(/^BY[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description:
              'The SID of the BYOC Trunk(Bring Your Own Carrier) resource that the Sip Domain will be associated with.',
          })
          .exactOptional(),
        EmergencyCallerSid: z
          .string()
          .regex(/^PN[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description:
              'Whether an emergency caller sid is configured for the domain. If present, this phone number will be used as the callback for the emergency call.',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^SD[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'form',
      z.object({
        FriendlyName: z
          .string()
          .meta({
            description:
              'A human readable descriptive text that describes the IpAccessControlList, up to 255 characters long.',
          }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^AL[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^AL[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'form',
      z.object({
        FriendlyName: z
          .string()
          .meta({ description: 'A human readable descriptive text, up to 255 characters long.' }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^AL[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/IpAccessControlListMappings/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        DomainSid: z
          .string()
          .regex(/^SD[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^AL[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/IpAccessControlListMappings/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        DomainSid: z
          .string()
          .regex(/^SD[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^AL[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/IpAccessControlListMappings.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        DomainSid: z
          .string()
          .regex(/^SD[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/IpAccessControlListMappings.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        DomainSid: z
          .string()
          .regex(/^SD[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'form',
      z.object({
        IpAccessControlListSid: z
          .string()
          .regex(/^AL[0-9a-fA-F]{32}$/)
          .length(34)
          .meta({
            description: 'The unique id of the IP access control list to map to the SIP domain.',
          }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:IpAccessControlListSid/IpAddresses.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        IpAccessControlListSid: z
          .string()
          .regex(/^AL[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:IpAccessControlListSid/IpAddresses.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        IpAccessControlListSid: z
          .string()
          .regex(/^AL[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'form',
      z.object({
        FriendlyName: z
          .string()
          .meta({
            description:
              'A human readable descriptive text for this resource, up to 255 characters long.',
          }),
        IpAddress: z
          .string()
          .meta({
            description:
              'An IP address in dotted decimal notation from which you want to accept traffic. Any SIP requests from this IP address will be allowed by Twilio. IPv4 only supported today.',
          }),
        CidrPrefixLength: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .meta({
            description:
              'An integer representing the length of the CIDR prefix to use with this IP address when accepting traffic. By default the entire IP address is used.',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:IpAccessControlListSid/IpAddresses/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        IpAccessControlListSid: z
          .string()
          .regex(/^AL[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^IP[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:IpAccessControlListSid/IpAddresses/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        IpAccessControlListSid: z
          .string()
          .regex(/^AL[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^IP[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'form',
      z.object({
        IpAddress: z
          .string()
          .meta({
            description:
              'An IP address in dotted decimal notation from which you want to accept traffic. Any SIP requests from this IP address will be allowed by Twilio. IPv4 only supported today.',
          })
          .exactOptional(),
        FriendlyName: z
          .string()
          .meta({
            description:
              'A human readable descriptive text for this resource, up to 255 characters long.',
          })
          .exactOptional(),
        CidrPrefixLength: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .meta({
            description:
              'An integer representing the length of the CIDR prefix to use with this IP address when accepting traffic. By default the entire IP address is used.',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:IpAccessControlListSid/IpAddresses/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        IpAccessControlListSid: z
          .string()
          .regex(/^AL[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^IP[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Siprec.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CallSid: z
          .string()
          .regex(/^CA[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'form',
      z.object({
        Name: z
          .string()
          .meta({
            description:
              'The user-specified name of this Siprec, if one was given when the Siprec was created. This may be used to stop the Siprec.',
          })
          .exactOptional(),
        ConnectorName: z
          .string()
          .meta({
            description: 'Unique name used when configuring the connector via Marketplace Add-on.',
          })
          .exactOptional(),
        Track: SiprecEnumTrackSchema.exactOptional(),
        StatusCallback: z
          .url()
          .meta({ description: 'Absolute URL of the status callback.' })
          .exactOptional(),
        StatusCallbackMethod: z
          .enum(['GET', 'POST'])
          .meta({ description: 'The http method for the status_callback (one of GET, POST).' })
          .exactOptional(),
        'Parameter1.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter1.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter2.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter2.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter3.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter3.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter4.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter4.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter5.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter5.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter6.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter6.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter7.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter7.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter8.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter8.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter9.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter9.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter10.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter10.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter11.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter11.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter12.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter12.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter13.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter13.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter14.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter14.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter15.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter15.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter16.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter16.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter17.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter17.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter18.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter18.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter19.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter19.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter20.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter20.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter21.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter21.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter22.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter22.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter23.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter23.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter24.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter24.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter25.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter25.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter26.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter26.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter27.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter27.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter28.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter28.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter29.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter29.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter30.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter30.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter31.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter31.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter32.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter32.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter33.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter33.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter34.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter34.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter35.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter35.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter36.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter36.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter37.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter37.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter38.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter38.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter39.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter39.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter40.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter40.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter41.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter41.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter42.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter42.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter43.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter43.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter44.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter44.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter45.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter45.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter46.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter46.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter47.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter47.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter48.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter48.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter49.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter49.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter50.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter50.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter51.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter51.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter52.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter52.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter53.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter53.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter54.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter54.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter55.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter55.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter56.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter56.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter57.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter57.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter58.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter58.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter59.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter59.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter60.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter60.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter61.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter61.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter62.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter62.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter63.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter63.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter64.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter64.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter65.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter65.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter66.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter66.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter67.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter67.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter68.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter68.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter69.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter69.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter70.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter70.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter71.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter71.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter72.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter72.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter73.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter73.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter74.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter74.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter75.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter75.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter76.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter76.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter77.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter77.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter78.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter78.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter79.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter79.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter80.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter80.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter81.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter81.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter82.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter82.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter83.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter83.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter84.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter84.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter85.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter85.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter86.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter86.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter87.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter87.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter88.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter88.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter89.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter89.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter90.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter90.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter91.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter91.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter92.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter92.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter93.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter93.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter94.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter94.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter95.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter95.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter96.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter96.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter97.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter97.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter98.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter98.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter99.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter99.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Siprec/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CallSid: z
          .string()
          .regex(/^CA[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z.string(),
      }),
    ),
    sValidator('form', z.object({ Status: SiprecEnumUpdateStatusSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Streams.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CallSid: z
          .string()
          .regex(/^CA[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'form',
      z.object({
        Url: z
          .url()
          .meta({
            description: 'Relative or absolute URL where WebSocket connection will be established.',
          }),
        Name: z
          .string()
          .meta({
            description:
              'The user-specified name of this Stream, if one was given when the Stream was created. This can be used to stop the Stream.',
          })
          .exactOptional(),
        Track: StreamEnumTrackSchema.exactOptional(),
        StatusCallback: z
          .url()
          .meta({
            description: 'Absolute URL to which Twilio sends status callback HTTP requests.',
          })
          .exactOptional(),
        StatusCallbackMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method Twilio uses when sending `status_callback` requests. Possible values are `GET` and `POST`. Default is `POST`.',
          })
          .exactOptional(),
        'Parameter1.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter1.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter2.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter2.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter3.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter3.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter4.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter4.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter5.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter5.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter6.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter6.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter7.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter7.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter8.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter8.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter9.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter9.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter10.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter10.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter11.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter11.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter12.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter12.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter13.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter13.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter14.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter14.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter15.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter15.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter16.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter16.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter17.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter17.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter18.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter18.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter19.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter19.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter20.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter20.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter21.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter21.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter22.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter22.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter23.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter23.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter24.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter24.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter25.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter25.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter26.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter26.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter27.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter27.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter28.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter28.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter29.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter29.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter30.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter30.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter31.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter31.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter32.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter32.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter33.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter33.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter34.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter34.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter35.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter35.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter36.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter36.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter37.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter37.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter38.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter38.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter39.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter39.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter40.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter40.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter41.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter41.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter42.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter42.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter43.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter43.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter44.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter44.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter45.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter45.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter46.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter46.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter47.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter47.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter48.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter48.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter49.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter49.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter50.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter50.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter51.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter51.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter52.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter52.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter53.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter53.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter54.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter54.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter55.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter55.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter56.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter56.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter57.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter57.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter58.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter58.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter59.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter59.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter60.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter60.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter61.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter61.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter62.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter62.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter63.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter63.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter64.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter64.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter65.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter65.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter66.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter66.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter67.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter67.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter68.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter68.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter69.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter69.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter70.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter70.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter71.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter71.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter72.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter72.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter73.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter73.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter74.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter74.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter75.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter75.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter76.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter76.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter77.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter77.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter78.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter78.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter79.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter79.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter80.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter80.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter81.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter81.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter82.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter82.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter83.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter83.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter84.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter84.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter85.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter85.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter86.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter86.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter87.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter87.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter88.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter88.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter89.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter89.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter90.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter90.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter91.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter91.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter92.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter92.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter93.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter93.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter94.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter94.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter95.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter95.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter96.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter96.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter97.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter97.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter98.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter98.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
        'Parameter99.Name': z.string().meta({ description: 'Parameter name' }).exactOptional(),
        'Parameter99.Value': z.string().meta({ description: 'Parameter value' }).exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Streams/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CallSid: z
          .string()
          .regex(/^CA[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z.string(),
      }),
    ),
    sValidator('form', z.object({ Status: StreamEnumUpdateStatusSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Tokens.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'form',
      z.object({
        Ttl: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .meta({
            description:
              'The duration in seconds for which the generated credentials are valid. The default value is 86400 (24 hours).',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Transcriptions/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^TR[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Transcriptions/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^TR[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Transcriptions.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Records.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        Category: z.string().exactOptional(),
        StartDate: z.iso.date().exactOptional(),
        EndDate: z.iso.date().exactOptional(),
        IncludeSubaccounts: z.stringbool().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/AllTime.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        Category: z.string().exactOptional(),
        StartDate: z.iso.date().exactOptional(),
        EndDate: z.iso.date().exactOptional(),
        IncludeSubaccounts: z.stringbool().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/Daily.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        Category: z.string().exactOptional(),
        StartDate: z.iso.date().exactOptional(),
        EndDate: z.iso.date().exactOptional(),
        IncludeSubaccounts: z.stringbool().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/LastMonth.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        Category: z.string().exactOptional(),
        StartDate: z.iso.date().exactOptional(),
        EndDate: z.iso.date().exactOptional(),
        IncludeSubaccounts: z.stringbool().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/Monthly.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        Category: z.string().exactOptional(),
        StartDate: z.iso.date().exactOptional(),
        EndDate: z.iso.date().exactOptional(),
        IncludeSubaccounts: z.stringbool().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/ThisMonth.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        Category: z.string().exactOptional(),
        StartDate: z.iso.date().exactOptional(),
        EndDate: z.iso.date().exactOptional(),
        IncludeSubaccounts: z.stringbool().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/Today.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        Category: z.string().exactOptional(),
        StartDate: z.iso.date().exactOptional(),
        EndDate: z.iso.date().exactOptional(),
        IncludeSubaccounts: z.stringbool().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/Yearly.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        Category: z.string().exactOptional(),
        StartDate: z.iso.date().exactOptional(),
        EndDate: z.iso.date().exactOptional(),
        IncludeSubaccounts: z.stringbool().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/Yesterday.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        Category: z.string().exactOptional(),
        StartDate: z.iso.date().exactOptional(),
        EndDate: z.iso.date().exactOptional(),
        IncludeSubaccounts: z.stringbool().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Triggers/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^UT[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Usage/Triggers/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^UT[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'form',
      z.object({
        CallbackMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method we should use to call `callback_url`. Can be: `GET` or `POST` and the default is `POST`.',
          })
          .exactOptional(),
        CallbackUrl: z
          .url()
          .meta({
            description: 'The URL we should call using `callback_method` when the trigger fires.',
          })
          .exactOptional(),
        FriendlyName: z
          .string()
          .meta({
            description:
              'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Usage/Triggers/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^UT[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Triggers.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'query',
      z.object({
        Recurring: UsageTriggerEnumRecurringSchema.exactOptional(),
        TriggerBy: UsageTriggerEnumTriggerFieldSchema.exactOptional(),
        UsageCategory: z.string().exactOptional(),
        PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
        Page: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0),
          )
          .exactOptional(),
        PageToken: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Usage/Triggers.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'form',
      z.object({
        CallbackUrl: z
          .url()
          .meta({
            description: 'The URL we should call using `callback_method` when the trigger fires.',
          }),
        TriggerValue: z
          .string()
          .meta({
            description:
              'The usage value at which the trigger should fire.  For convenience, you can use an offset value such as `+30` to specify a trigger_value that is 30 units more than the current usage value. Be sure to urlencode a `+` as `%2B`.',
          }),
        UsageCategory: z
          .string()
          .meta({
            description:
              'The usage category that the trigger should watch.  Use one of the supported [usage categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories) for this value.',
          }),
        CallbackMethod: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method we should use to call `callback_url`. Can be: `GET` or `POST` and the default is `POST`.',
          })
          .exactOptional(),
        FriendlyName: z
          .string()
          .meta({
            description:
              'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
          })
          .exactOptional(),
        Recurring: UsageTriggerEnumRecurringSchema.exactOptional(),
        TriggerBy: UsageTriggerEnumTriggerFieldSchema.exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/UserDefinedMessages.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CallSid: z
          .string()
          .regex(/^CA[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'form',
      z.object({
        Content: z
          .string()
          .meta({
            description: 'The User Defined Message in the form of URL-encoded JSON string.',
          }),
        IdempotencyKey: z
          .string()
          .meta({
            description:
              'A unique string value to identify API call. This should be a unique string value per API call and can be a randomly generated.',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/UserDefinedMessageSubscriptions.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CallSid: z
          .string()
          .regex(/^CA[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    sValidator(
      'form',
      z.object({
        Callback: z
          .url()
          .meta({
            description:
              'The URL we should call using the `method` to send user defined events to your application. URLs must contain a valid hostname (underscores are not permitted).',
          }),
        IdempotencyKey: z
          .string()
          .meta({
            description:
              'A unique string value to identify API call. This should be a unique string value per API call and can be a randomly generated.',
          })
          .exactOptional(),
        Method: z
          .enum(['GET', 'POST'])
          .meta({
            description:
              'The HTTP method Twilio will use when requesting the above `Url`. Either `GET` or `POST`. Default is `POST`.',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/UserDefinedMessageSubscriptions/:Sid.json',
    sValidator(
      'param',
      z.object({
        AccountSid: z
          .string()
          .regex(/^AC[0-9a-fA-F]{32}$/)
          .length(34),
        CallSid: z
          .string()
          .regex(/^CA[0-9a-fA-F]{32}$/)
          .length(34),
        Sid: z
          .string()
          .regex(/^ZY[0-9a-fA-F]{32}$/)
          .length(34),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
