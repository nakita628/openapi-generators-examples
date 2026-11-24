import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Schema, SchemaTransformation } from 'effect'
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
      Schema.toStandardSchemaV1(
        Schema.Struct({
          FriendlyName: Schema.optionalKey(Schema.String),
          Status: Schema.optionalKey(AccountEnumStatusSchema),
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts.json',
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          FriendlyName: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'A human readable description of the account to create, defaults to `SubAccount Created at {YYYY-MM-DD HH:MM meridian}`',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          Sid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          Sid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          FriendlyName: Schema.optionalKey(
            Schema.String.annotate({
              description: 'Update the human-readable description of this Account',
            }),
          ),
          Status: Schema.optionalKey(AccountEnumStatusSchema),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Addresses.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          CustomerName: Schema.optionalKey(Schema.String),
          FriendlyName: Schema.optionalKey(Schema.String),
          EmergencyEnabled: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          IsoCountry: Schema.optionalKey(Schema.String),
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Addresses.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          CustomerName: Schema.String.annotate({
            description: 'The name to associate with the new address.',
          }),
          Street: Schema.String.annotate({
            description: 'The number and street address of the new address.',
          }),
          City: Schema.String.annotate({ description: 'The city of the new address.' }),
          Region: Schema.String.annotate({
            description: 'The state or region of the new address.',
          }),
          PostalCode: Schema.String.annotate({
            description: 'The postal code of the new address.',
          }),
          IsoCountry: Schema.String.annotate({
            description: 'The ISO country code of the new address.',
          }),
          FriendlyName: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'A descriptive string that you create to describe the new address. It can be up to 64 characters long for Regulatory Compliance addresses and 32 characters long for Emergency addresses.',
            }),
          ),
          EmergencyEnabled: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            )
              .pipe(
                Schema.decodeTo(
                  Schema.Boolean,
                  SchemaTransformation.transform({
                    decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                    encode: (output) => (output ? 'true' : 'false'),
                  }),
                ),
              )
              .annotate({
                description:
                  'Whether to enable emergency calling on the new address. Can be: `true` or `false`.',
              }),
          ),
          AutoCorrectAddress: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            )
              .pipe(
                Schema.decodeTo(
                  Schema.Boolean,
                  SchemaTransformation.transform({
                    decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                    encode: (output) => (output ? 'true' : 'false'),
                  }),
                ),
              )
              .annotate({
                description:
                  "Whether we should automatically correct the address. Can be: `true` or `false` and the default is `true`. If empty or `true`, we will correct the address you provide if necessary. If `false`, we won't alter the address you provide.",
              }),
          ),
          StreetSecondary: Schema.optionalKey(
            Schema.String.annotate({
              description: 'The additional number and street address of the address.',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Addresses/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^AD[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Addresses/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^AD[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          FriendlyName: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'A descriptive string that you create to describe the new address. It can be up to 64 characters long for Regulatory Compliance addresses and 32 characters long for Emergency addresses.',
            }),
          ),
          CustomerName: Schema.optionalKey(
            Schema.String.annotate({ description: 'The name to associate with the address.' }),
          ),
          Street: Schema.optionalKey(
            Schema.String.annotate({
              description: 'The number and street address of the address.',
            }),
          ),
          City: Schema.optionalKey(
            Schema.String.annotate({ description: 'The city of the address.' }),
          ),
          Region: Schema.optionalKey(
            Schema.String.annotate({ description: 'The state or region of the address.' }),
          ),
          PostalCode: Schema.optionalKey(
            Schema.String.annotate({ description: 'The postal code of the address.' }),
          ),
          EmergencyEnabled: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            )
              .pipe(
                Schema.decodeTo(
                  Schema.Boolean,
                  SchemaTransformation.transform({
                    decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                    encode: (output) => (output ? 'true' : 'false'),
                  }),
                ),
              )
              .annotate({
                description:
                  'Whether to enable emergency calling on the address. Can be: `true` or `false`.',
              }),
          ),
          AutoCorrectAddress: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            )
              .pipe(
                Schema.decodeTo(
                  Schema.Boolean,
                  SchemaTransformation.transform({
                    decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                    encode: (output) => (output ? 'true' : 'false'),
                  }),
                ),
              )
              .annotate({
                description:
                  "Whether we should automatically correct the address. Can be: `true` or `false` and the default is `true`. If empty or `true`, we will correct the address you provide if necessary. If `false`, we won't alter the address you provide.",
              }),
          ),
          StreetSecondary: Schema.optionalKey(
            Schema.String.annotate({
              description: 'The additional number and street address of the address.',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Addresses/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^AD[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Applications.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          FriendlyName: Schema.optionalKey(Schema.String),
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Applications.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ApiVersion: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "The API version to use to start a new TwiML session. Can be: `2010-04-01` or `2008-08-01`. The default value is the account's default API version.",
            }),
          ),
          VoiceUrl: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL we should call when the phone number assigned to this application receives a call.',
            }),
          ),
          VoiceMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method we should use to call `voice_url`. Can be: `GET` or `POST`.',
            }),
          ),
          VoiceFallbackUrl: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL that we should call when an error occurs retrieving or executing the TwiML requested by `url`.',
            }),
          ),
          VoiceFallbackMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method we should use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
            }),
          ),
          StatusCallback: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL we should call using the `status_callback_method` to send status information to your application.',
            }),
          ),
          StatusCallbackMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST`.',
            }),
          ),
          VoiceCallerIdLookup: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            )
              .pipe(
                Schema.decodeTo(
                  Schema.Boolean,
                  SchemaTransformation.transform({
                    decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                    encode: (output) => (output ? 'true' : 'false'),
                  }),
                ),
              )
              .annotate({
                description:
                  "Whether we should look up the caller's caller-ID name from the CNAM database (additional charges apply). Can be: `true` or `false`.",
              }),
          ),
          SmsUrl: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL we should call when the phone number receives an incoming SMS message.',
            }),
          ),
          SmsMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method we should use to call `sms_url`. Can be: `GET` or `POST`.',
            }),
          ),
          SmsFallbackUrl: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL that we should call when an error occurs while retrieving or executing the TwiML from `sms_url`.',
            }),
          ),
          SmsFallbackMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method we should use to call `sms_fallback_url`. Can be: `GET` or `POST`.',
            }),
          ),
          SmsStatusCallback: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL we should call using a POST method to send status information about SMS messages sent by the application.',
            }),
          ),
          MessageStatusCallback: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL we should call using a POST method to send message status information to your application.',
            }),
          ),
          FriendlyName: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'A descriptive string that you create to describe the new application. It can be up to 64 characters long.',
            }),
          ),
          PublicApplicationConnectEnabled: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            )
              .pipe(
                Schema.decodeTo(
                  Schema.Boolean,
                  SchemaTransformation.transform({
                    decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                    encode: (output) => (output ? 'true' : 'false'),
                  }),
                ),
              )
              .annotate({
                description:
                  'Whether to allow other Twilio accounts to dial this applicaton using Dial verb. Can be: `true` or `false`.',
              }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Applications/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^AP[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Applications/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^AP[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          FriendlyName: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
            }),
          ),
          ApiVersion: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "The API version to use to start a new TwiML session. Can be: `2010-04-01` or `2008-08-01`. The default value is your account's default API version.",
            }),
          ),
          VoiceUrl: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL we should call when the phone number assigned to this application receives a call.',
            }),
          ),
          VoiceMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method we should use to call `voice_url`. Can be: `GET` or `POST`.',
            }),
          ),
          VoiceFallbackUrl: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL that we should call when an error occurs retrieving or executing the TwiML requested by `url`.',
            }),
          ),
          VoiceFallbackMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method we should use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
            }),
          ),
          StatusCallback: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL we should call using the `status_callback_method` to send status information to your application.',
            }),
          ),
          StatusCallbackMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST`.',
            }),
          ),
          VoiceCallerIdLookup: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            )
              .pipe(
                Schema.decodeTo(
                  Schema.Boolean,
                  SchemaTransformation.transform({
                    decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                    encode: (output) => (output ? 'true' : 'false'),
                  }),
                ),
              )
              .annotate({
                description:
                  "Whether we should look up the caller's caller-ID name from the CNAM database (additional charges apply). Can be: `true` or `false`.",
              }),
          ),
          SmsUrl: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL we should call when the phone number receives an incoming SMS message.',
            }),
          ),
          SmsMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method we should use to call `sms_url`. Can be: `GET` or `POST`.',
            }),
          ),
          SmsFallbackUrl: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL that we should call when an error occurs while retrieving or executing the TwiML from `sms_url`.',
            }),
          ),
          SmsFallbackMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method we should use to call `sms_fallback_url`. Can be: `GET` or `POST`.',
            }),
          ),
          SmsStatusCallback: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'Same as message_status_callback: The URL we should call using a POST method to send status information about SMS messages sent by the application. Deprecated, included for backwards compatibility.',
            }),
          ),
          MessageStatusCallback: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL we should call using a POST method to send message status information to your application.',
            }),
          ),
          PublicApplicationConnectEnabled: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            )
              .pipe(
                Schema.decodeTo(
                  Schema.Boolean,
                  SchemaTransformation.transform({
                    decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                    encode: (output) => (output ? 'true' : 'false'),
                  }),
                ),
              )
              .annotate({
                description:
                  'Whether to allow other Twilio accounts to dial this applicaton using Dial verb. Can be: `true` or `false`.',
              }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Applications/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^AP[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AuthorizedConnectApps/:ConnectAppSid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          ConnectAppSid: Schema.String.check(
            Schema.isPattern(/^CN[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AuthorizedConnectApps.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          CountryCode: Schema.String,
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/Local.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          CountryCode: Schema.String,
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AreaCode: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt()),
          ),
          Contains: Schema.optionalKey(Schema.String),
          SmsEnabled: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          MmsEnabled: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          VoiceEnabled: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          ExcludeAllAddressRequired: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          ExcludeLocalAddressRequired: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          ExcludeForeignAddressRequired: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          Beta: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          NearNumber: Schema.optionalKey(Schema.String),
          NearLatLong: Schema.optionalKey(Schema.String),
          Distance: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt()),
          ),
          InPostalCode: Schema.optionalKey(Schema.String),
          InRegion: Schema.optionalKey(Schema.String),
          InRateCenter: Schema.optionalKey(Schema.String),
          InLata: Schema.optionalKey(Schema.String),
          InLocality: Schema.optionalKey(Schema.String),
          FaxEnabled: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/MachineToMachine.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          CountryCode: Schema.String,
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AreaCode: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt()),
          ),
          Contains: Schema.optionalKey(Schema.String),
          SmsEnabled: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          MmsEnabled: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          VoiceEnabled: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          ExcludeAllAddressRequired: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          ExcludeLocalAddressRequired: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          ExcludeForeignAddressRequired: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          Beta: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          NearNumber: Schema.optionalKey(Schema.String),
          NearLatLong: Schema.optionalKey(Schema.String),
          Distance: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt()),
          ),
          InPostalCode: Schema.optionalKey(Schema.String),
          InRegion: Schema.optionalKey(Schema.String),
          InRateCenter: Schema.optionalKey(Schema.String),
          InLata: Schema.optionalKey(Schema.String),
          InLocality: Schema.optionalKey(Schema.String),
          FaxEnabled: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/Mobile.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          CountryCode: Schema.String,
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AreaCode: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt()),
          ),
          Contains: Schema.optionalKey(Schema.String),
          SmsEnabled: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          MmsEnabled: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          VoiceEnabled: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          ExcludeAllAddressRequired: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          ExcludeLocalAddressRequired: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          ExcludeForeignAddressRequired: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          Beta: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          NearNumber: Schema.optionalKey(Schema.String),
          NearLatLong: Schema.optionalKey(Schema.String),
          Distance: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt()),
          ),
          InPostalCode: Schema.optionalKey(Schema.String),
          InRegion: Schema.optionalKey(Schema.String),
          InRateCenter: Schema.optionalKey(Schema.String),
          InLata: Schema.optionalKey(Schema.String),
          InLocality: Schema.optionalKey(Schema.String),
          FaxEnabled: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/National.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          CountryCode: Schema.String,
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AreaCode: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt()),
          ),
          Contains: Schema.optionalKey(Schema.String),
          SmsEnabled: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          MmsEnabled: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          VoiceEnabled: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          ExcludeAllAddressRequired: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          ExcludeLocalAddressRequired: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          ExcludeForeignAddressRequired: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          Beta: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          NearNumber: Schema.optionalKey(Schema.String),
          NearLatLong: Schema.optionalKey(Schema.String),
          Distance: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt()),
          ),
          InPostalCode: Schema.optionalKey(Schema.String),
          InRegion: Schema.optionalKey(Schema.String),
          InRateCenter: Schema.optionalKey(Schema.String),
          InLata: Schema.optionalKey(Schema.String),
          InLocality: Schema.optionalKey(Schema.String),
          FaxEnabled: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/SharedCost.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          CountryCode: Schema.String,
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AreaCode: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt()),
          ),
          Contains: Schema.optionalKey(Schema.String),
          SmsEnabled: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          MmsEnabled: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          VoiceEnabled: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          ExcludeAllAddressRequired: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          ExcludeLocalAddressRequired: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          ExcludeForeignAddressRequired: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          Beta: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          NearNumber: Schema.optionalKey(Schema.String),
          NearLatLong: Schema.optionalKey(Schema.String),
          Distance: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt()),
          ),
          InPostalCode: Schema.optionalKey(Schema.String),
          InRegion: Schema.optionalKey(Schema.String),
          InRateCenter: Schema.optionalKey(Schema.String),
          InLata: Schema.optionalKey(Schema.String),
          InLocality: Schema.optionalKey(Schema.String),
          FaxEnabled: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/TollFree.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          CountryCode: Schema.String,
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AreaCode: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt()),
          ),
          Contains: Schema.optionalKey(Schema.String),
          SmsEnabled: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          MmsEnabled: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          VoiceEnabled: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          ExcludeAllAddressRequired: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          ExcludeLocalAddressRequired: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          ExcludeForeignAddressRequired: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          Beta: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          NearNumber: Schema.optionalKey(Schema.String),
          NearLatLong: Schema.optionalKey(Schema.String),
          Distance: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt()),
          ),
          InPostalCode: Schema.optionalKey(Schema.String),
          InRegion: Schema.optionalKey(Schema.String),
          InRateCenter: Schema.optionalKey(Schema.String),
          InLata: Schema.optionalKey(Schema.String),
          InLocality: Schema.optionalKey(Schema.String),
          FaxEnabled: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/Voip.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          CountryCode: Schema.String,
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AreaCode: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt()),
          ),
          Contains: Schema.optionalKey(Schema.String),
          SmsEnabled: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          MmsEnabled: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          VoiceEnabled: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          ExcludeAllAddressRequired: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          ExcludeLocalAddressRequired: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          ExcludeForeignAddressRequired: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          Beta: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          NearNumber: Schema.optionalKey(Schema.String),
          NearLatLong: Schema.optionalKey(Schema.String),
          Distance: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt()),
          ),
          InPostalCode: Schema.optionalKey(Schema.String),
          InRegion: Schema.optionalKey(Schema.String),
          InRateCenter: Schema.optionalKey(Schema.String),
          InLata: Schema.optionalKey(Schema.String),
          InLocality: Schema.optionalKey(Schema.String),
          FaxEnabled: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Balance.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Calls.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          To: Schema.optionalKey(Schema.String),
          From: Schema.optionalKey(Schema.String),
          ParentCallSid: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^CA[0-9a-fA-F]{32}$/),
              Schema.makeFilter((input) => [...input].length === 34, {
                expected: 'a string of 34 characters',
              }),
            ),
          ),
          Status: Schema.optionalKey(CallEnumStatusSchema),
          StartTime: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
              ),
            ),
          ),
          'StartTime<': Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
              ),
            ),
          ),
          'StartTime>': Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
              ),
            ),
          ),
          EndTime: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
              ),
            ),
          ),
          'EndTime<': Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
              ),
            ),
          ),
          'EndTime>': Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
              ),
            ),
          ),
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          To: Schema.String.annotate({
            description: 'The phone number, SIP address, or client identifier to call.',
          }),
          From: Schema.String.annotate({
            description:
              'The phone number or client identifier to use as the caller id. If using a phone number, it must be a Twilio number or a Verified [outgoing caller id](https://www.twilio.com/docs/voice/api/outgoing-caller-ids) for your account. If the `to` parameter is a phone number, `From` must also be a phone number.',
          }),
          Method: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                "The HTTP method we should use when calling the `url` parameter's value. Can be: `GET` or `POST` and the default is `POST`. If an `application_sid` parameter is present, this parameter is ignored.",
            }),
          ),
          FallbackUrl: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL that we call using the `fallback_method` if an error occurs when requesting or executing the TwiML at `url`. If an `application_sid` parameter is present, this parameter is ignored.',
            }),
          ),
          FallbackMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method that we should use to request the `fallback_url`. Can be: `GET` or `POST` and the default is `POST`. If an `application_sid` parameter is present, this parameter is ignored.',
            }),
          ),
          StatusCallback: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL we should call using the `status_callback_method` to send status information to your application. If no `status_callback_event` is specified, we will send the `completed` status. If an `application_sid` parameter is present, this parameter is ignored. URLs must contain a valid hostname (underscores are not permitted).',
            }),
          ),
          StatusCallbackEvent: Schema.optionalKey(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.String)),
            ).annotate({
              description:
                'The call progress events that we will send to the `status_callback` URL. Can be: `initiated`, `ringing`, `answered`, and `completed`. If no event is specified, we send the `completed` status. If you want to receive multiple events, specify each one in a separate `status_callback_event` parameter. See the code sample for [monitoring call progress](https://www.twilio.com/docs/voice/api/call-resource?code-sample=code-create-a-call-resource-and-specify-a-statuscallbackevent&code-sdk-version=json). If an `application_sid` is present, this parameter is ignored.',
            }),
          ),
          StatusCallbackMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method we should use when calling the `status_callback` URL. Can be: `GET` or `POST` and the default is `POST`. If an `application_sid` parameter is present, this parameter is ignored.',
            }),
          ),
          SendDigits: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "The string of keys to dial after connecting to the number, with a maximum length of 32 digits. Valid digits in the string include any digit (`0`-`9`), '`A`', '`B`', '`C`', '`D`', '`#`', and '`*`'. You can also use '`w`' to insert a half-second pause and '`W`' to insert a one-second pause. For example, to pause for one second after connecting and then dial extension 1234 followed by the # key, set this parameter to `W1234#`. Be sure to URL-encode this string because the '`#`' character has special meaning in a URL. If both `SendDigits` and `MachineDetection` parameters are provided, then `MachineDetection` will be ignored.",
            }),
          ),
          Timeout: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt())
              .annotate({
                description:
                  'The integer number of seconds that we should allow the phone to ring before assuming there is no answer. The default is `60` seconds and the maximum is `600` seconds. For some call flows, we will add a 5-second buffer to the timeout value you provide. For this reason, a timeout value of 10 seconds could result in an actual timeout closer to 15 seconds. You can set this to a short time, such as `15` seconds, to hang up before reaching an answering machine or voicemail.',
              }),
          ),
          Record: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            )
              .pipe(
                Schema.decodeTo(
                  Schema.Boolean,
                  SchemaTransformation.transform({
                    decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                    encode: (output) => (output ? 'true' : 'false'),
                  }),
                ),
              )
              .annotate({
                description:
                  'Whether to record the call. Can be `true` to record the phone call, or `false` to not. The default is `false`. The `recording_url` is sent to the `status_callback` URL.',
              }),
          ),
          RecordingChannels: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'The number of channels in the final recording. Can be: `mono` or `dual`. The default is `mono`. `mono` records both legs of the call in a single channel of the recording file. `dual` records each leg to a separate channel of the recording file. The first channel of a dual-channel recording contains the parent call and the second channel contains the child call.',
            }),
          ),
          RecordingStatusCallback: Schema.optionalKey(
            Schema.String.annotate({
              description: 'The URL that we call when the recording is available to be accessed.',
            }),
          ),
          RecordingStatusCallbackMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method we should use when calling the `recording_status_callback` URL. Can be: `GET` or `POST` and the default is `POST`.',
            }),
          ),
          RecordingConfigurationId: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'The identifier of the configuration to be used when creating and processing the recording',
            }),
          ),
          SipAuthUsername: Schema.optionalKey(
            Schema.String.annotate({
              description: 'The username used to authenticate the caller making a SIP call.',
            }),
          ),
          SipAuthPassword: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'The password required to authenticate the user account specified in `sip_auth_username`.',
            }),
          ),
          MachineDetection: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'Whether to detect if a human, answering machine, or fax has picked up the call. Can be: `Enable` or `DetectMessageEnd`. Use `Enable` if you would like us to return `AnsweredBy` as soon as the called party is identified. Use `DetectMessageEnd`, if you would like to leave a message on an answering machine. If `send_digits` is provided, this parameter is ignored. For more information, see [Answering Machine Detection](https://www.twilio.com/docs/voice/answering-machine-detection).',
            }),
          ),
          MachineDetectionTimeout: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt())
              .annotate({
                description:
                  'The number of seconds that we should attempt to detect an answering machine before timing out and sending a voice request with `AnsweredBy` of `unknown`. The default timeout is 30 seconds.',
              }),
          ),
          RecordingStatusCallbackEvent: Schema.optionalKey(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.String)),
            ).annotate({
              description:
                'The recording status events that will trigger calls to the URL specified in `recording_status_callback`. Can be: `in-progress`, `completed` and `absent`. Defaults to `completed`. Separate  multiple values with a space.',
            }),
          ),
          Trim: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'Whether to trim any leading and trailing silence from the recording. Can be: `trim-silence` or `do-not-trim` and the default is `trim-silence`.',
            }),
          ),
          CallerId: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'The phone number, SIP address, or Client identifier that made this call. Phone numbers are in [E.164 format](https://wwnw.twilio.com/docs/glossary/what-e164) (e.g., +16175551212). SIP addresses are formatted as `name@company.com`.',
            }),
          ),
          MachineDetectionSpeechThreshold: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt())
              .annotate({
                description:
                  'The number of milliseconds that is used as the measuring stick for the length of the speech activity, where durations lower than this value will be interpreted as a human and longer than this value as a machine. Possible Values: 1000-6000. Default: 2400.',
              }),
          ),
          MachineDetectionSpeechEndThreshold: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt())
              .annotate({
                description:
                  'The number of milliseconds of silence after speech activity at which point the speech activity is considered complete. Possible Values: 500-5000. Default: 1200.',
              }),
          ),
          MachineDetectionSilenceTimeout: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt())
              .annotate({
                description:
                  'The number of milliseconds of initial silence after which an `unknown` AnsweredBy result will be returned. Possible Values: 2000-10000. Default: 5000.',
              }),
          ),
          AsyncAmd: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'Select whether to perform answering machine detection in the background. Default, blocks the execution of the call until Answering Machine Detection is completed. Can be: `true` or `false`.',
            }),
          ),
          AsyncAmdStatusCallback: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL that we should call using the `async_amd_status_callback_method` to notify customer application whether the call was answered by human, machine or fax.',
            }),
          ),
          AsyncAmdStatusCallbackMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method we should use when calling the `async_amd_status_callback` URL. Can be: `GET` or `POST` and the default is `POST`.',
            }),
          ),
          Passports: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'The STIR/SHAKEN passport for this call, provided as a base64 encoded string. Multiple passports (at max 5) are comma separated and provided as base64 encoded string',
            }),
          ),
          Byoc: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^BY[0-9a-fA-F]{32}$/),
              Schema.makeFilter((input) => [...input].length === 34, {
                expected: 'a string of 34 characters',
              }),
            ).annotate({
              description:
                'The SID of a BYOC (Bring Your Own Carrier) trunk to route this call with. Note that `byoc` is only meaningful when `to` is a phone number; it will otherwise be ignored. (Beta)',
            }),
          ),
          CallReason: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "The Reason for the outgoing call. Use it to specify the purpose of the call that is presented on the called party's phone. (Branded Calls Beta)",
            }),
          ),
          CallToken: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "A token string needed to invoke a forwarded call. A call_token is generated when an incoming call is received on a Twilio number. Pass an incoming call's call_token value to a forwarded call via the call_token parameter when creating a new call. A forwarded call should bear the same CallerID of the original incoming call.",
            }),
          ),
          RecordingTrack: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'The audio track to record for the call. Can be: `inbound`, `outbound` or `both`. The default is `both`. `inbound` records the audio that is received by Twilio. `outbound` records the audio that is generated from Twilio. `both` records the audio that is received and generated by Twilio.',
            }),
          ),
          TimeLimit: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt())
              .annotate({
                description:
                  'The maximum duration of the call in seconds. Constraints depend on account and configuration.',
              }),
          ),
          ClientNotificationUrl: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description: 'The URL that we should use to deliver `push call notification`.',
            }),
          ),
          Url: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The absolute URL that returns the TwiML instructions for the call. We will call this URL using the `method` when the call connects. For more information, see the [Url Parameter](https://www.twilio.com/docs/voice/make-calls#specify-a-url-parameter) section in [Making Calls](https://www.twilio.com/docs/voice/make-calls).',
            }),
          ),
          Twiml: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'TwiML instructions for the call Twilio will use without fetching Twiml from url parameter. If both `twiml` and `url` are provided then `twiml` parameter will be ignored. Max 4000 characters.',
            }),
          ),
          ApplicationSid: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^AP[0-9a-fA-F]{32}$/),
              Schema.makeFilter((input) => [...input].length === 34, {
                expected: 'a string of 34 characters',
              }),
            ).annotate({
              description:
                'The SID of the Application resource that will handle the call, if the call will be handled by an application.',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Calls/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^CA[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^CA[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          Url: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The absolute URL that returns the TwiML instructions for the call. We will call this URL using the `method` when the call connects. For more information, see the [Url Parameter](https://www.twilio.com/docs/voice/make-calls#specify-a-url-parameter) section in [Making Calls](https://www.twilio.com/docs/voice/make-calls).',
            }),
          ),
          Method: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method we should use when calling the `url`. Can be: `GET` or `POST` and the default is `POST`. If an `application_sid` parameter is present, this parameter is ignored.',
            }),
          ),
          Status: Schema.optionalKey(CallEnumUpdateStatusSchema),
          FallbackUrl: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL that we call using the `fallback_method` if an error occurs when requesting or executing the TwiML at `url`. If an `application_sid` parameter is present, this parameter is ignored.',
            }),
          ),
          FallbackMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method that we should use to request the `fallback_url`. Can be: `GET` or `POST` and the default is `POST`. If an `application_sid` parameter is present, this parameter is ignored.',
            }),
          ),
          StatusCallback: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL we should call using the `status_callback_method` to send status information to your application. If no `status_callback_event` is specified, we will send the `completed` status. If an `application_sid` parameter is present, this parameter is ignored. URLs must contain a valid hostname (underscores are not permitted).',
            }),
          ),
          StatusCallbackMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method we should use when requesting the `status_callback` URL. Can be: `GET` or `POST` and the default is `POST`. If an `application_sid` parameter is present, this parameter is ignored.',
            }),
          ),
          Twiml: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'TwiML instructions for the call Twilio will use without fetching Twiml from url. Twiml and url parameters are mutually exclusive',
            }),
          ),
          TimeLimit: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt())
              .annotate({
                description:
                  'The maximum duration of the call in seconds. Constraints depend on account and configuration.',
              }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Calls/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^CA[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Events.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          CallSid: Schema.String.check(
            Schema.isPattern(/^CA[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Notifications/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          CallSid: Schema.String.check(
            Schema.isPattern(/^CA[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^NO[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Notifications.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          CallSid: Schema.String.check(
            Schema.isPattern(/^CA[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          Log: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt()),
          ),
          MessageDate: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
              ),
            ),
          ),
          'MessageDate<': Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
              ),
            ),
          ),
          'MessageDate>': Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
              ),
            ),
          ),
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Recordings.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          CallSid: Schema.String.check(
            Schema.isPattern(/^CA[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          DateCreated: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
              ),
            ),
          ),
          'DateCreated<': Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
              ),
            ),
          ),
          'DateCreated>': Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
              ),
            ),
          ),
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Recordings.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          CallSid: Schema.String.check(
            Schema.isPattern(/^CA[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          RecordingStatusCallbackEvent: Schema.optionalKey(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.String)),
            ).annotate({
              description:
                'The recording status events on which we should call the `recording_status_callback` URL. Can be: `in-progress`, `completed` and `absent` and the default is `completed`. Separate multiple event values with a space.',
            }),
          ),
          RecordingStatusCallback: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL we should call using the `recording_status_callback_method` on each recording event specified in  `recording_status_callback_event`. For more information, see [RecordingStatusCallback parameters](https://www.twilio.com/docs/voice/api/recording#recordingstatuscallback).',
            }),
          ),
          RecordingStatusCallbackMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method we should use to call `recording_status_callback`. Can be: `GET` or `POST` and the default is `POST`.',
            }),
          ),
          Trim: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'Whether to trim any leading and trailing silence in the recording. Can be: `trim-silence` or `do-not-trim` and the default is `do-not-trim`. `trim-silence` trims the silence from the beginning and end of the recording and `do-not-trim` does not.',
            }),
          ),
          RecordingChannels: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'The number of channels used in the recording. Can be: `mono` or `dual` and the default is `mono`. `mono` records all parties of the call into one channel. `dual` records each party of a 2-party call into separate channels.',
            }),
          ),
          RecordingTrack: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'The audio track to record for the call. Can be: `inbound`, `outbound` or `both`. The default is `both`. `inbound` records the audio that is received by Twilio. `outbound` records the audio that is generated from Twilio. `both` records the audio that is received and generated by Twilio.',
            }),
          ),
          RecordingConfigurationId: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'The identifier of the configuration to be used when creating and processing the recording',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Recordings/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          CallSid: Schema.String.check(
            Schema.isPattern(/^CA[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^RE[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Recordings/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          CallSid: Schema.String.check(
            Schema.isPattern(/^CA[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String,
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          Status: CallRecordingEnumStatusSchema,
          PauseBehavior: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'Whether to record during a pause. Can be: `skip` or `silence` and the default is `silence`. `skip` does not record during the pause period, while `silence` will replace the actual audio of the call with silence during the pause period. This parameter only applies when setting `status` is set to `paused`.',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Recordings/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          CallSid: Schema.String.check(
            Schema.isPattern(/^CA[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^RE[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^CF[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String,
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          Status: Schema.optionalKey(ConferenceEnumUpdateStatusSchema),
          AnnounceUrl: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL we should call to announce something into the conference. The URL may return an MP3 file, a WAV file, or a TwiML document that contains `<Play>`, `<Say>`, `<Pause>`, or `<Redirect>` verbs.',
            }),
          ),
          AnnounceMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method used to call `announce_url`. Can be: `GET` or `POST` and the default is `POST`',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Conferences.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          DateCreated: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
              ),
            ),
          ),
          'DateCreated<': Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
              ),
            ),
          ),
          'DateCreated>': Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
              ),
            ),
          ),
          DateUpdated: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
              ),
            ),
          ),
          'DateUpdated<': Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
              ),
            ),
          ),
          'DateUpdated>': Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
              ),
            ),
          ),
          FriendlyName: Schema.optionalKey(Schema.String),
          Status: Schema.optionalKey(ConferenceEnumStatusSchema),
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Recordings.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          ConferenceSid: Schema.String.check(
            Schema.isPattern(/^CF[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          DateCreated: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
              ),
            ),
          ),
          'DateCreated<': Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
              ),
            ),
          ),
          'DateCreated>': Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
              ),
            ),
          ),
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Recordings/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          ConferenceSid: Schema.String.check(
            Schema.isPattern(/^CF[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^RE[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Recordings/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          ConferenceSid: Schema.String.check(
            Schema.isPattern(/^CF[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String,
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          Status: ConferenceRecordingEnumStatusSchema,
          PauseBehavior: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'Whether to record during a pause. Can be: `skip` or `silence` and the default is `silence`. `skip` does not record during the pause period, while `silence` will replace the actual audio of the call with silence during the pause period. This parameter only applies when setting `status` is set to `paused`.',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Recordings/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          ConferenceSid: Schema.String.check(
            Schema.isPattern(/^CF[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^RE[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/ConnectApps/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^CN[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/ConnectApps/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^CN[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AuthorizeRedirectUrl: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL to redirect the user to after we authenticate the user and obtain authorization to access the Connect App.',
            }),
          ),
          CompanyName: Schema.optionalKey(
            Schema.String.annotate({ description: 'The company name to set for the Connect App.' }),
          ),
          DeauthorizeCallbackMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description: 'The HTTP method to use when calling `deauthorize_callback_url`.',
            }),
          ),
          DeauthorizeCallbackUrl: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL to call using the `deauthorize_callback_method` to de-authorize the Connect App.',
            }),
          ),
          Description: Schema.optionalKey(
            Schema.String.annotate({ description: 'A description of the Connect App.' }),
          ),
          FriendlyName: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
            }),
          ),
          HomepageUrl: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'A public URL where users can obtain more information about this Connect App.',
            }),
          ),
          Permissions: Schema.optionalKey(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(ConnectAppEnumPermissionSchema)),
            ).annotate({
              description:
                'A comma-separated list of the permissions you will request from the users of this ConnectApp.  Can include: `get-all` and `post-all`.',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/ConnectApps/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^CN[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/ConnectApps.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Addresses/:AddressSid/DependentPhoneNumbers.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          AddressSid: Schema.String.check(
            Schema.isPattern(/^AD[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^PN[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^PN[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
              Schema.makeFilter((input) => [...input].length === 34, {
                expected: 'a string of 34 characters',
              }),
            ).annotate({
              description:
                'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the IncomingPhoneNumber resource to update.  For more information, see [Exchanging Numbers Between Subaccounts](https://www.twilio.com/docs/iam/api/subaccounts#exchanging-numbers).',
            }),
          ),
          ApiVersion: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'The API version to use for incoming calls made to the phone number. The default is `2010-04-01`.',
            }),
          ),
          FriendlyName: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'A descriptive string that you created to describe this phone number. It can be up to 64 characters long. By default, this is a formatted version of the phone number.',
            }),
          ),
          SmsApplicationSid: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^AP[0-9a-fA-F]{32}$/),
              Schema.makeFilter((input) => [...input].length === 34, {
                expected: 'a string of 34 characters',
              }),
            ).annotate({
              description:
                'The SID of the application that should handle SMS messages sent to the number. If an `sms_application_sid` is present, we ignore all of the `sms_*_url` urls and use those set on the application.',
            }),
          ),
          SmsFallbackMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method that we should use to call `sms_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
            }),
          ),
          SmsFallbackUrl: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL that we should call when an error occurs while requesting or executing the TwiML defined by `sms_url`.',
            }),
          ),
          SmsMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method that we should use to call `sms_url`. Can be: `GET` or `POST` and defaults to `POST`.',
            }),
          ),
          SmsUrl: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL we should call when the phone number receives an incoming SMS message.',
            }),
          ),
          StatusCallback: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL we should call using the `status_callback_method` to send status information to your application.',
            }),
          ),
          StatusCallbackMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST` and defaults to `POST`.',
            }),
          ),
          VoiceApplicationSid: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^AP[0-9a-fA-F]{32}$/),
              Schema.makeFilter((input) => [...input].length === 34, {
                expected: 'a string of 34 characters',
              }),
            ).annotate({
              description:
                'The SID of the application we should use to handle phone calls to the phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use only those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
            }),
          ),
          VoiceCallerIdLookup: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            )
              .pipe(
                Schema.decodeTo(
                  Schema.Boolean,
                  SchemaTransformation.transform({
                    decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                    encode: (output) => (output ? 'true' : 'false'),
                  }),
                ),
              )
              .annotate({
                description:
                  "Whether to lookup the caller's name from the CNAM database and post it to your app. Can be: `true` or `false` and defaults to `false`.",
              }),
          ),
          VoiceFallbackMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method that we should use to call `voice_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
            }),
          ),
          VoiceFallbackUrl: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL that we should call when an error occurs retrieving or executing the TwiML requested by `url`.',
            }),
          ),
          VoiceMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method that we should use to call `voice_url`. Can be: `GET` or `POST` and defaults to `POST`.',
            }),
          ),
          VoiceUrl: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL that we should call to answer a call to the phone number. The `voice_url` will not be called if a `voice_application_sid` or a `trunk_sid` is set.',
            }),
          ),
          EmergencyStatus: Schema.optionalKey(IncomingPhoneNumberEnumEmergencyStatusSchema),
          EmergencyAddressSid: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^AD[0-9a-fA-F]{32}$/),
              Schema.makeFilter((input) => [...input].length === 34, {
                expected: 'a string of 34 characters',
              }),
            ).annotate({
              description:
                'The SID of the emergency address configuration to use for emergency calling from this phone number.',
            }),
          ),
          TrunkSid: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^TK[0-9a-fA-F]{32}$/),
              Schema.makeFilter((input) => [...input].length === 34, {
                expected: 'a string of 34 characters',
              }),
            ).annotate({
              description:
                'The SID of the Trunk we should use to handle phone calls to the phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use only those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
            }),
          ),
          VoiceReceiveMode: Schema.optionalKey(IncomingPhoneNumberEnumVoiceReceiveModeSchema),
          IdentitySid: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^RI[0-9a-fA-F]{32}$/),
              Schema.makeFilter((input) => [...input].length === 34, {
                expected: 'a string of 34 characters',
              }),
            ).annotate({
              description:
                'The SID of the Identity resource that we should associate with the phone number. Some regions require an identity to meet local regulations.',
            }),
          ),
          AddressSid: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^AD[0-9a-fA-F]{32}$/),
              Schema.makeFilter((input) => [...input].length === 34, {
                expected: 'a string of 34 characters',
              }),
            ).annotate({
              description:
                'The SID of the Address resource we should associate with the phone number. Some regions require addresses to meet local regulations.',
            }),
          ),
          BundleSid: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^BU[0-9a-fA-F]{32}$/),
              Schema.makeFilter((input) => [...input].length === 34, {
                expected: 'a string of 34 characters',
              }),
            ).annotate({
              description:
                'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^PN[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          Beta: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          FriendlyName: Schema.optionalKey(Schema.String),
          PhoneNumber: Schema.optionalKey(Schema.String),
          Origin: Schema.optionalKey(Schema.String),
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ApiVersion: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'The API version to use for incoming calls made to the new phone number. The default is `2010-04-01`.',
            }),
          ),
          FriendlyName: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'A descriptive string that you created to describe the new phone number. It can be up to 64 characters long. By default, this is a formatted version of the new phone number.',
            }),
          ),
          SmsApplicationSid: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^AP[0-9a-fA-F]{32}$/),
              Schema.makeFilter((input) => [...input].length === 34, {
                expected: 'a string of 34 characters',
              }),
            ).annotate({
              description:
                'The SID of the application that should handle SMS messages sent to the new phone number. If an `sms_application_sid` is present, we ignore all of the `sms_*_url` urls and use those set on the application.',
            }),
          ),
          SmsFallbackMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method that we should use to call `sms_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
            }),
          ),
          SmsFallbackUrl: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL that we should call when an error occurs while requesting or executing the TwiML defined by `sms_url`.',
            }),
          ),
          SmsMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method that we should use to call `sms_url`. Can be: `GET` or `POST` and defaults to `POST`.',
            }),
          ),
          SmsUrl: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL we should call when the new phone number receives an incoming SMS message.',
            }),
          ),
          StatusCallback: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL we should call using the `status_callback_method` to send status information to your application.',
            }),
          ),
          StatusCallbackMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST` and defaults to `POST`.',
            }),
          ),
          VoiceApplicationSid: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^AP[0-9a-fA-F]{32}$/),
              Schema.makeFilter((input) => [...input].length === 34, {
                expected: 'a string of 34 characters',
              }),
            ).annotate({
              description:
                'The SID of the application we should use to handle calls to the new phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use only those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
            }),
          ),
          VoiceCallerIdLookup: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            )
              .pipe(
                Schema.decodeTo(
                  Schema.Boolean,
                  SchemaTransformation.transform({
                    decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                    encode: (output) => (output ? 'true' : 'false'),
                  }),
                ),
              )
              .annotate({
                description:
                  "Whether to lookup the caller's name from the CNAM database and post it to your app. Can be: `true` or `false` and defaults to `false`.",
              }),
          ),
          VoiceFallbackMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method that we should use to call `voice_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
            }),
          ),
          VoiceFallbackUrl: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL that we should call when an error occurs retrieving or executing the TwiML requested by `url`.',
            }),
          ),
          VoiceMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method that we should use to call `voice_url`. Can be: `GET` or `POST` and defaults to `POST`.',
            }),
          ),
          VoiceUrl: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL that we should call to answer a call to the new phone number. The `voice_url` will not be called if a `voice_application_sid` or a `trunk_sid` is set.',
            }),
          ),
          EmergencyStatus: Schema.optionalKey(IncomingPhoneNumberEnumEmergencyStatusSchema),
          EmergencyAddressSid: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^AD[0-9a-fA-F]{32}$/),
              Schema.makeFilter((input) => [...input].length === 34, {
                expected: 'a string of 34 characters',
              }),
            ).annotate({
              description:
                'The SID of the emergency address configuration to use for emergency calling from the new phone number.',
            }),
          ),
          TrunkSid: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^TK[0-9a-fA-F]{32}$/),
              Schema.makeFilter((input) => [...input].length === 34, {
                expected: 'a string of 34 characters',
              }),
            ).annotate({
              description:
                'The SID of the Trunk we should use to handle calls to the new phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use only those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
            }),
          ),
          IdentitySid: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^RI[0-9a-fA-F]{32}$/),
              Schema.makeFilter((input) => [...input].length === 34, {
                expected: 'a string of 34 characters',
              }),
            ).annotate({
              description:
                'The SID of the Identity resource that we should associate with the new phone number. Some regions require an identity to meet local regulations.',
            }),
          ),
          AddressSid: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^AD[0-9a-fA-F]{32}$/),
              Schema.makeFilter((input) => [...input].length === 34, {
                expected: 'a string of 34 characters',
              }),
            ).annotate({
              description:
                'The SID of the Address resource we should associate with the new phone number. Some regions require addresses to meet local regulations.',
            }),
          ),
          VoiceReceiveMode: Schema.optionalKey(IncomingPhoneNumberEnumVoiceReceiveModeSchema),
          BundleSid: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^BU[0-9a-fA-F]{32}$/),
              Schema.makeFilter((input) => [...input].length === 34, {
                expected: 'a string of 34 characters',
              }),
            ).annotate({
              description:
                'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
            }),
          ),
          PhoneNumber: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'The phone number to purchase specified in [E.164](https://www.twilio.com/docs/glossary/what-e164) format.  E.164 phone numbers consist of a + followed by the country code and subscriber number without punctuation characters. For example, +14155551234.',
            }),
          ),
          AreaCode: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'The desired area code for your new incoming phone number. Can be any three-digit, US or Canada area code. We will provision an available phone number within this area code for you. **You must provide an `area_code` or a `phone_number`.** (US and Canada only).',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:ResourceSid/AssignedAddOns/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          ResourceSid: Schema.String.check(
            Schema.isPattern(/^PN[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^XE[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:ResourceSid/AssignedAddOns/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          ResourceSid: Schema.String.check(
            Schema.isPattern(/^PN[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^XE[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:ResourceSid/AssignedAddOns.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          ResourceSid: Schema.String.check(
            Schema.isPattern(/^PN[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:ResourceSid/AssignedAddOns.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          ResourceSid: Schema.String.check(
            Schema.isPattern(/^PN[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          InstalledAddOnSid: Schema.String.check(
            Schema.isPattern(/^XE[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ).annotate({ description: 'The SID that identifies the Add-on installation.' }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:ResourceSid/AssignedAddOns/:AssignedAddOnSid/Extensions/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          ResourceSid: Schema.String.check(
            Schema.isPattern(/^PN[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          AssignedAddOnSid: Schema.String.check(
            Schema.isPattern(/^XE[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^XF[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:ResourceSid/AssignedAddOns/:AssignedAddOnSid/Extensions.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          ResourceSid: Schema.String.check(
            Schema.isPattern(/^PN[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          AssignedAddOnSid: Schema.String.check(
            Schema.isPattern(/^XE[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/Local.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          Beta: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          FriendlyName: Schema.optionalKey(Schema.String),
          PhoneNumber: Schema.optionalKey(Schema.String),
          Origin: Schema.optionalKey(Schema.String),
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/Local.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          PhoneNumber: Schema.String.annotate({
            description:
              'The phone number to purchase specified in [E.164](https://www.twilio.com/docs/glossary/what-e164) format.  E.164 phone numbers consist of a + followed by the country code and subscriber number without punctuation characters. For example, +14155551234.',
          }),
          ApiVersion: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'The API version to use for incoming calls made to the new phone number. The default is `2010-04-01`.',
            }),
          ),
          FriendlyName: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'A descriptive string that you created to describe the new phone number. It can be up to 64 characters long. By default, this is a formatted version of the phone number.',
            }),
          ),
          SmsApplicationSid: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^AP[0-9a-fA-F]{32}$/),
              Schema.makeFilter((input) => [...input].length === 34, {
                expected: 'a string of 34 characters',
              }),
            ).annotate({
              description:
                'The SID of the application that should handle SMS messages sent to the new phone number. If an `sms_application_sid` is present, we ignore all of the `sms_*_url` urls and use those set on the application.',
            }),
          ),
          SmsFallbackMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method that we should use to call `sms_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
            }),
          ),
          SmsFallbackUrl: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL that we should call when an error occurs while requesting or executing the TwiML defined by `sms_url`.',
            }),
          ),
          SmsMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method that we should use to call `sms_url`. Can be: `GET` or `POST` and defaults to `POST`.',
            }),
          ),
          SmsUrl: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL we should call when the new phone number receives an incoming SMS message.',
            }),
          ),
          StatusCallback: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL we should call using the `status_callback_method` to send status information to your application.',
            }),
          ),
          StatusCallbackMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST` and defaults to `POST`.',
            }),
          ),
          VoiceApplicationSid: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^AP[0-9a-fA-F]{32}$/),
              Schema.makeFilter((input) => [...input].length === 34, {
                expected: 'a string of 34 characters',
              }),
            ).annotate({
              description:
                'The SID of the application we should use to handle calls to the new phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use only those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
            }),
          ),
          VoiceCallerIdLookup: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            )
              .pipe(
                Schema.decodeTo(
                  Schema.Boolean,
                  SchemaTransformation.transform({
                    decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                    encode: (output) => (output ? 'true' : 'false'),
                  }),
                ),
              )
              .annotate({
                description:
                  "Whether to lookup the caller's name from the CNAM database and post it to your app. Can be: `true` or `false` and defaults to `false`.",
              }),
          ),
          VoiceFallbackMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method that we should use to call `voice_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
            }),
          ),
          VoiceFallbackUrl: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL that we should call when an error occurs retrieving or executing the TwiML requested by `url`.',
            }),
          ),
          VoiceMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method that we should use to call `voice_url`. Can be: `GET` or `POST` and defaults to `POST`.',
            }),
          ),
          VoiceUrl: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL that we should call to answer a call to the new phone number. The `voice_url` will not be called if a `voice_application_sid` or a `trunk_sid` is set.',
            }),
          ),
          IdentitySid: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^RI[0-9a-fA-F]{32}$/),
              Schema.makeFilter((input) => [...input].length === 34, {
                expected: 'a string of 34 characters',
              }),
            ).annotate({
              description:
                'The SID of the Identity resource that we should associate with the new phone number. Some regions require an identity to meet local regulations.',
            }),
          ),
          AddressSid: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^AD[0-9a-fA-F]{32}$/),
              Schema.makeFilter((input) => [...input].length === 34, {
                expected: 'a string of 34 characters',
              }),
            ).annotate({
              description:
                'The SID of the Address resource we should associate with the new phone number. Some regions require addresses to meet local regulations.',
            }),
          ),
          EmergencyStatus: Schema.optionalKey(IncomingPhoneNumberLocalEnumEmergencyStatusSchema),
          EmergencyAddressSid: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^AD[0-9a-fA-F]{32}$/),
              Schema.makeFilter((input) => [...input].length === 34, {
                expected: 'a string of 34 characters',
              }),
            ).annotate({
              description:
                'The SID of the emergency address configuration to use for emergency calling from the new phone number.',
            }),
          ),
          TrunkSid: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^TK[0-9a-fA-F]{32}$/),
              Schema.makeFilter((input) => [...input].length === 34, {
                expected: 'a string of 34 characters',
              }),
            ).annotate({
              description:
                'The SID of the Trunk we should use to handle calls to the new phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use only those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
            }),
          ),
          VoiceReceiveMode: Schema.optionalKey(IncomingPhoneNumberLocalEnumVoiceReceiveModeSchema),
          BundleSid: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^BU[0-9a-fA-F]{32}$/),
              Schema.makeFilter((input) => [...input].length === 34, {
                expected: 'a string of 34 characters',
              }),
            ).annotate({
              description:
                'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/Mobile.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          Beta: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          FriendlyName: Schema.optionalKey(Schema.String),
          PhoneNumber: Schema.optionalKey(Schema.String),
          Origin: Schema.optionalKey(Schema.String),
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/Mobile.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          PhoneNumber: Schema.String.annotate({
            description:
              'The phone number to purchase specified in [E.164](https://www.twilio.com/docs/glossary/what-e164) format.  E.164 phone numbers consist of a + followed by the country code and subscriber number without punctuation characters. For example, +14155551234.',
          }),
          ApiVersion: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'The API version to use for incoming calls made to the new phone number. The default is `2010-04-01`.',
            }),
          ),
          FriendlyName: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'A descriptive string that you created to describe the new phone number. It can be up to 64 characters long. By default, the is a formatted version of the phone number.',
            }),
          ),
          SmsApplicationSid: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^AP[0-9a-fA-F]{32}$/),
              Schema.makeFilter((input) => [...input].length === 34, {
                expected: 'a string of 34 characters',
              }),
            ).annotate({
              description:
                'The SID of the application that should handle SMS messages sent to the new phone number. If an `sms_application_sid` is present, we ignore all of the `sms_*_url` urls and use those of the application.',
            }),
          ),
          SmsFallbackMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method that we should use to call `sms_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
            }),
          ),
          SmsFallbackUrl: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL that we should call when an error occurs while requesting or executing the TwiML defined by `sms_url`.',
            }),
          ),
          SmsMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method that we should use to call `sms_url`. Can be: `GET` or `POST` and defaults to `POST`.',
            }),
          ),
          SmsUrl: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL we should call when the new phone number receives an incoming SMS message.',
            }),
          ),
          StatusCallback: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL we should call using the `status_callback_method` to send status information to your application.',
            }),
          ),
          StatusCallbackMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST` and defaults to `POST`.',
            }),
          ),
          VoiceApplicationSid: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^AP[0-9a-fA-F]{32}$/),
              Schema.makeFilter((input) => [...input].length === 34, {
                expected: 'a string of 34 characters',
              }),
            ).annotate({
              description:
                'The SID of the application we should use to handle calls to the new phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use only those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
            }),
          ),
          VoiceCallerIdLookup: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            )
              .pipe(
                Schema.decodeTo(
                  Schema.Boolean,
                  SchemaTransformation.transform({
                    decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                    encode: (output) => (output ? 'true' : 'false'),
                  }),
                ),
              )
              .annotate({
                description:
                  "Whether to lookup the caller's name from the CNAM database and post it to your app. Can be: `true` or `false` and defaults to `false`.",
              }),
          ),
          VoiceFallbackMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method that we should use to call `voice_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
            }),
          ),
          VoiceFallbackUrl: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL that we should call when an error occurs retrieving or executing the TwiML requested by `url`.',
            }),
          ),
          VoiceMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method that we should use to call `voice_url`. Can be: `GET` or `POST` and defaults to `POST`.',
            }),
          ),
          VoiceUrl: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL that we should call to answer a call to the new phone number. The `voice_url` will not be called if a `voice_application_sid` or a `trunk_sid` is set.',
            }),
          ),
          IdentitySid: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^RI[0-9a-fA-F]{32}$/),
              Schema.makeFilter((input) => [...input].length === 34, {
                expected: 'a string of 34 characters',
              }),
            ).annotate({
              description:
                'The SID of the Identity resource that we should associate with the new phone number. Some regions require an identity to meet local regulations.',
            }),
          ),
          AddressSid: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^AD[0-9a-fA-F]{32}$/),
              Schema.makeFilter((input) => [...input].length === 34, {
                expected: 'a string of 34 characters',
              }),
            ).annotate({
              description:
                'The SID of the Address resource we should associate with the new phone number. Some regions require addresses to meet local regulations.',
            }),
          ),
          EmergencyStatus: Schema.optionalKey(IncomingPhoneNumberMobileEnumEmergencyStatusSchema),
          EmergencyAddressSid: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^AD[0-9a-fA-F]{32}$/),
              Schema.makeFilter((input) => [...input].length === 34, {
                expected: 'a string of 34 characters',
              }),
            ).annotate({
              description:
                'The SID of the emergency address configuration to use for emergency calling from the new phone number.',
            }),
          ),
          TrunkSid: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^TK[0-9a-fA-F]{32}$/),
              Schema.makeFilter((input) => [...input].length === 34, {
                expected: 'a string of 34 characters',
              }),
            ).annotate({
              description:
                'The SID of the Trunk we should use to handle calls to the new phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use only those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
            }),
          ),
          VoiceReceiveMode: Schema.optionalKey(IncomingPhoneNumberMobileEnumVoiceReceiveModeSchema),
          BundleSid: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^BU[0-9a-fA-F]{32}$/),
              Schema.makeFilter((input) => [...input].length === 34, {
                expected: 'a string of 34 characters',
              }),
            ).annotate({
              description:
                'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/TollFree.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          Beta: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          FriendlyName: Schema.optionalKey(Schema.String),
          PhoneNumber: Schema.optionalKey(Schema.String),
          Origin: Schema.optionalKey(Schema.String),
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/TollFree.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          PhoneNumber: Schema.String.annotate({
            description:
              'The phone number to purchase specified in [E.164](https://www.twilio.com/docs/glossary/what-e164) format.  E.164 phone numbers consist of a + followed by the country code and subscriber number without punctuation characters. For example, +14155551234.',
          }),
          ApiVersion: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'The API version to use for incoming calls made to the new phone number. The default is `2010-04-01`.',
            }),
          ),
          FriendlyName: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'A descriptive string that you created to describe the new phone number. It can be up to 64 characters long. By default, this is a formatted version of the phone number.',
            }),
          ),
          SmsApplicationSid: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^AP[0-9a-fA-F]{32}$/),
              Schema.makeFilter((input) => [...input].length === 34, {
                expected: 'a string of 34 characters',
              }),
            ).annotate({
              description:
                'The SID of the application that should handle SMS messages sent to the new phone number. If an `sms_application_sid` is present, we ignore all `sms_*_url` values and use those of the application.',
            }),
          ),
          SmsFallbackMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method that we should use to call `sms_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
            }),
          ),
          SmsFallbackUrl: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL that we should call when an error occurs while requesting or executing the TwiML defined by `sms_url`.',
            }),
          ),
          SmsMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method that we should use to call `sms_url`. Can be: `GET` or `POST` and defaults to `POST`.',
            }),
          ),
          SmsUrl: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL we should call when the new phone number receives an incoming SMS message.',
            }),
          ),
          StatusCallback: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL we should call using the `status_callback_method` to send status information to your application.',
            }),
          ),
          StatusCallbackMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST` and defaults to `POST`.',
            }),
          ),
          VoiceApplicationSid: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^AP[0-9a-fA-F]{32}$/),
              Schema.makeFilter((input) => [...input].length === 34, {
                expected: 'a string of 34 characters',
              }),
            ).annotate({
              description:
                'The SID of the application we should use to handle calls to the new phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
            }),
          ),
          VoiceCallerIdLookup: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            )
              .pipe(
                Schema.decodeTo(
                  Schema.Boolean,
                  SchemaTransformation.transform({
                    decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                    encode: (output) => (output ? 'true' : 'false'),
                  }),
                ),
              )
              .annotate({
                description:
                  "Whether to lookup the caller's name from the CNAM database and post it to your app. Can be: `true` or `false` and defaults to `false`.",
              }),
          ),
          VoiceFallbackMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method that we should use to call `voice_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`.',
            }),
          ),
          VoiceFallbackUrl: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL that we should call when an error occurs retrieving or executing the TwiML requested by `url`.',
            }),
          ),
          VoiceMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method that we should use to call `voice_url`. Can be: `GET` or `POST` and defaults to `POST`.',
            }),
          ),
          VoiceUrl: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL that we should call to answer a call to the new phone number. The `voice_url` will not be called if a `voice_application_sid` or a `trunk_sid` is set.',
            }),
          ),
          IdentitySid: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^RI[0-9a-fA-F]{32}$/),
              Schema.makeFilter((input) => [...input].length === 34, {
                expected: 'a string of 34 characters',
              }),
            ).annotate({
              description:
                'The SID of the Identity resource that we should associate with the new phone number. Some regions require an Identity to meet local regulations.',
            }),
          ),
          AddressSid: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^AD[0-9a-fA-F]{32}$/),
              Schema.makeFilter((input) => [...input].length === 34, {
                expected: 'a string of 34 characters',
              }),
            ).annotate({
              description:
                'The SID of the Address resource we should associate with the new phone number. Some regions require addresses to meet local regulations.',
            }),
          ),
          EmergencyStatus: Schema.optionalKey(IncomingPhoneNumberTollFreeEnumEmergencyStatusSchema),
          EmergencyAddressSid: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^AD[0-9a-fA-F]{32}$/),
              Schema.makeFilter((input) => [...input].length === 34, {
                expected: 'a string of 34 characters',
              }),
            ).annotate({
              description:
                'The SID of the emergency address configuration to use for emergency calling from the new phone number.',
            }),
          ),
          TrunkSid: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^TK[0-9a-fA-F]{32}$/),
              Schema.makeFilter((input) => [...input].length === 34, {
                expected: 'a string of 34 characters',
              }),
            ).annotate({
              description:
                'The SID of the Trunk we should use to handle calls to the new phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use only those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
            }),
          ),
          VoiceReceiveMode: Schema.optionalKey(
            IncomingPhoneNumberTollFreeEnumVoiceReceiveModeSchema,
          ),
          BundleSid: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^BU[0-9a-fA-F]{32}$/),
              Schema.makeFilter((input) => [...input].length === 34, {
                expected: 'a string of 34 characters',
              }),
            ).annotate({
              description:
                'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Keys/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^SK[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Keys/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^SK[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          FriendlyName: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Keys/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^SK[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Keys.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Keys.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          FriendlyName: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Messages/:MessageSid/Media/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          MessageSid: Schema.String.check(
            Schema.isPattern(/^(SM|MM)[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^ME[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Messages/:MessageSid/Media/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          MessageSid: Schema.String.check(
            Schema.isPattern(/^(SM|MM)[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^ME[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Messages/:MessageSid/Media.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          MessageSid: Schema.String.check(
            Schema.isPattern(/^(SM|MM)[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          DateCreated: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
              ),
            ),
          ),
          'DateCreated<': Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
              ),
            ),
          ),
          'DateCreated>': Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
              ),
            ),
          ),
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Queues/:QueueSid/Members/:CallSid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          QueueSid: Schema.String.check(
            Schema.isPattern(/^QU[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          CallSid: Schema.String,
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Queues/:QueueSid/Members/:CallSid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          QueueSid: Schema.String.check(
            Schema.isPattern(/^QU[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          CallSid: Schema.String,
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          Url: Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
            description: 'The absolute URL of the Queue resource.',
          }),
          Method: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'How to pass the update request data. Can be `GET` or `POST` and the default is `POST`. `POST` sends the data as encoded form data and `GET` sends the data as query parameters.',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Queues/:QueueSid/Members.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          QueueSid: Schema.String.check(
            Schema.isPattern(/^QU[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Messages.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          To: Schema.optionalKey(Schema.String),
          From: Schema.optionalKey(Schema.String),
          DateSent: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
              ),
            ),
          ),
          'DateSent<': Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
              ),
            ),
          ),
          'DateSent>': Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
              ),
            ),
          ),
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Messages.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          To: Schema.String.annotate({
            description:
              "The recipient's phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (for SMS/MMS) or [channel address](https://www.twilio.com/docs/messaging/channels), e.g. `whatsapp:+15552229999`.",
          }),
          StatusCallback: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL of the endpoint to which Twilio sends [Message status callback requests](https://www.twilio.com/docs/sms/api/message-resource#twilios-request-to-the-statuscallback-url). URL must contain a valid hostname and underscores are not allowed. If you include this parameter with the `messaging_service_sid`, Twilio uses this URL instead of the Status Callback URL of the [Messaging Service](https://www.twilio.com/docs/messaging/api/service-resource). ',
            }),
          ),
          ApplicationSid: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^AP[0-9a-fA-F]{32}$/),
              Schema.makeFilter((input) => [...input].length === 34, {
                expected: 'a string of 34 characters',
              }),
            ).annotate({
              description:
                "The SID of the associated [TwiML Application](https://www.twilio.com/docs/usage/api/applications). [Message status callback requests](https://www.twilio.com/docs/sms/api/message-resource#twilios-request-to-the-statuscallback-url) are sent to the TwiML App's `message_status_callback` URL. Note that the `status_callback` parameter of a request takes priority over the `application_sid` parameter; if both are included `application_sid` is ignored.",
            }),
          ),
          MaxPrice: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .annotate({
                description:
                  '[OBSOLETE] This parameter will no longer have any effect as of 2024-06-03.',
              }),
          ),
          ProvideFeedback: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            )
              .pipe(
                Schema.decodeTo(
                  Schema.Boolean,
                  SchemaTransformation.transform({
                    decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                    encode: (output) => (output ? 'true' : 'false'),
                  }),
                ),
              )
              .annotate({
                description:
                  'Boolean indicating whether or not you intend to provide delivery confirmation feedback to Twilio (used in conjunction with the [Message Feedback subresource](https://www.twilio.com/docs/sms/api/message-feedback-resource)). Default value is `false`.',
              }),
          ),
          Attempt: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt())
              .annotate({
                description:
                  'Total number of attempts made (including this request) to send the message regardless of the provider used',
              }),
          ),
          ValidityPeriod: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt())
              .annotate({
                description:
                  "The maximum length in seconds that the Message can remain in Twilio's outgoing message queue. If a queued Message exceeds the `validity_period`, the Message is not sent. Accepted values are integers from `1` to `36000`. Default value is `36000`. A `validity_period` greater than `5` is recommended. [Learn more about the validity period](https://www.twilio.com/blog/take-more-control-of-outbound-messages-using-validity-period-html)",
              }),
          ),
          ForceDelivery: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            )
              .pipe(
                Schema.decodeTo(
                  Schema.Boolean,
                  SchemaTransformation.transform({
                    decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                    encode: (output) => (output ? 'true' : 'false'),
                  }),
                ),
              )
              .annotate({ description: 'Reserved' }),
          ),
          ContentRetention: Schema.optionalKey(MessageEnumContentRetentionSchema),
          AddressRetention: Schema.optionalKey(MessageEnumAddressRetentionSchema),
          SmartEncoded: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            )
              .pipe(
                Schema.decodeTo(
                  Schema.Boolean,
                  SchemaTransformation.transform({
                    decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                    encode: (output) => (output ? 'true' : 'false'),
                  }),
                ),
              )
              .annotate({
                description:
                  'Whether to detect Unicode characters that have a similar GSM-7 character and replace them. Can be: `true` or `false`.',
              }),
          ),
          PersistentAction: Schema.optionalKey(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.String)),
            ).annotate({
              description:
                'Rich actions for non-SMS/MMS channels. Used for [sending location in WhatsApp messages](https://www.twilio.com/docs/whatsapp/message-features#location-messages-with-whatsapp).',
            }),
          ),
          TrafficType: Schema.optionalKey(MessageEnumTrafficTypeSchema),
          ShortenUrls: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            )
              .pipe(
                Schema.decodeTo(
                  Schema.Boolean,
                  SchemaTransformation.transform({
                    decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                    encode: (output) => (output ? 'true' : 'false'),
                  }),
                ),
              )
              .annotate({
                description:
                  'For Messaging Services with [Link Shortening configured](https://www.twilio.com/docs/messaging/features/link-shortening) only: A Boolean indicating whether or not Twilio should shorten links in the `body` of the Message. Default value is `false`. If `true`, the `messaging_service_sid` parameter must also be provided.',
              }),
          ),
          ScheduleType: Schema.optionalKey(MessageEnumScheduleTypeSchema),
          SendAt: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
              ),
            ).annotate({
              description:
                'The time that Twilio will send the message. Must be in ISO 8601 format.',
            }),
          ),
          SendAsMms: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            )
              .pipe(
                Schema.decodeTo(
                  Schema.Boolean,
                  SchemaTransformation.transform({
                    decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                    encode: (output) => (output ? 'true' : 'false'),
                  }),
                ),
              )
              .annotate({
                description:
                  'If set to `true`, Twilio delivers the message as a single MMS message, regardless of the presence of media.',
              }),
          ),
          ContentVariables: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "For [Content Editor/API](https://www.twilio.com/docs/content) only: Key-value pairs of [Template variables](https://www.twilio.com/docs/content/using-variables-with-content-api) and their substitution values. `content_sid` parameter must also be provided. If values are not defined in the `content_variables` parameter, the [Template's default placeholder values](https://www.twilio.com/docs/content/content-api-resources#create-templates) are used.",
            }),
          ),
          MessageIntent: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "Specifies the purpose or use case of the outbound communication. This parameter is used by Twilio's [Traffic Shaping](https://www.twilio.com/docs/messaging/features/traffic-shaping) and [Compliance Toolkit](https://www.twilio.com/docs/messaging/features/compliance-toolkit) products. Possible values include: `otp`, `notifications`, `marketing`, `fraud`, `security`, `customercare`, `delivery`, `education`, `polling`, `announcements`, and `events`.",
            }),
          ),
          RiskCheck: Schema.optionalKey(MessageEnumRiskCheckSchema),
          From: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "The sender's Twilio phone number (in [E.164](https://en.wikipedia.org/wiki/E.164) format), [alphanumeric sender ID](https://www.twilio.com/docs/sms/quickstart), [Wireless SIM](https://www.twilio.com/docs/iot/wireless/programmable-wireless-send-machine-machine-sms-commands), [short code](https://www.twilio.com/en-us/messaging/channels/sms/short-codes), or [channel address](https://www.twilio.com/docs/messaging/channels) (e.g., `whatsapp:+15554449999`). The value of the `from` parameter must be a sender that is hosted within Twilio and belongs to the Account creating the Message. If you are using `messaging_service_sid`, this parameter can be empty (Twilio assigns a `from` value from the Messaging Service's Sender Pool) or you can provide a specific sender from your Sender Pool.",
            }),
          ),
          FallbackFrom: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'A fallback SMS sender to use when the recipient cannot be reached over RCS. This parameter may only be used when also providing a [Messaging Service](https://twilio.com/docs/messaging/services) containing an RCS sender. The fallback SMS sender must be either a Twilio phone number (in [E.164](https://en.wikipedia.org/wiki/E.164) format), [alphanumeric sender ID](https://www.twilio.com/docs/sms/quickstart), or [short code](https://www.twilio.com/en-us/messaging/channels/sms/short-codes), hosted within Twilio and belong to the Account creating the Message.',
            }),
          ),
          MessagingServiceSid: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^MG[0-9a-fA-F]{32}$/),
              Schema.makeFilter((input) => [...input].length === 34, {
                expected: 'a string of 34 characters',
              }),
            ).annotate({
              description:
                "The SID of the [Messaging Service](https://www.twilio.com/docs/messaging/services) you want to associate with the Message. When this parameter is provided and the `from` parameter is omitted, Twilio selects the optimal sender from the Messaging Service's Sender Pool. You may also provide a `from` parameter if you want to use a specific Sender from the Sender Pool.",
            }),
          ),
          Body: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'The text content of the outgoing message. Can be up to 1,600 characters in length. SMS only: If the `body` contains more than 160 [GSM-7](https://www.twilio.com/docs/glossary/what-is-gsm-7-character-encoding) characters (or 70 [UCS-2](https://www.twilio.com/docs/glossary/what-is-ucs-2-character-encoding) characters), the message is segmented and charged accordingly. For long `body` text, consider using the [send_as_mms parameter](https://www.twilio.com/blog/mms-for-long-text-messages).',
            }),
          ),
          MediaUrl: Schema.optionalKey(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(
                Schema.Array(
                  Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
                ),
              ),
            ).annotate({
              description:
                'The URL of media to include in the Message content. `jpeg`, `jpg`, `gif`, and `png` file types are fully supported by Twilio and content is formatted for delivery on destination devices. The media size limit is 5 MB for supported file types (`jpeg`, `jpg`, `png`, `gif`) and 500 KB for [other types](https://www.twilio.com/docs/messaging/guides/accepted-mime-types) of accepted media. To send more than one image in the message, provide multiple `media_url` parameters in the POST request. You can include up to ten `media_url` parameters per message. [International](https://support.twilio.com/hc/en-us/articles/223179808-Sending-and-receiving-MMS-messages) and [carrier](https://support.twilio.com/hc/en-us/articles/223133707-Is-MMS-supported-for-all-carriers-in-US-and-Canada-) limits apply.',
            }),
          ),
          ContentSid: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^HX[0-9a-fA-F]{32}$/),
              Schema.makeFilter((input) => [...input].length === 34, {
                expected: 'a string of 34 characters',
              }),
            ).annotate({
              description:
                "For [Content Editor/API](https://www.twilio.com/docs/content) only: The SID of the Content Template to be used with the Message, e.g., `HXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`. If this parameter is not provided, a Content Template is not used. Find the SID in the Console on the Content Editor page. For Content API users, the SID is found in Twilio's response when [creating the Template](https://www.twilio.com/docs/content/content-api-resources#create-templates) or by [fetching your Templates](https://www.twilio.com/docs/content/content-api-resources#fetch-all-content-resources).",
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Messages/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^(SM|MM)[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Messages/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^(SM|MM)[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          Body: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "The new `body` of the Message resource. To redact the text content of a Message, this parameter's value must be an empty string",
            }),
          ),
          Status: Schema.optionalKey(MessageEnumUpdateStatusSchema),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Messages/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^(SM|MM)[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Messages/:MessageSid/Feedback.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          MessageSid: Schema.String.check(
            Schema.isPattern(/^(SM|MM)[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({ Outcome: Schema.optionalKey(MessageFeedbackEnumOutcomeSchema) }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SigningKeys.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SigningKeys.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          FriendlyName: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Notifications/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^NO[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Notifications.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          Log: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt()),
          ),
          MessageDate: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
              ),
            ),
          ),
          'MessageDate<': Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
              ),
            ),
          ),
          'MessageDate>': Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
              ),
            ),
          ),
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/OutgoingCallerIds/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^PN[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/OutgoingCallerIds/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^PN[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          FriendlyName: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/OutgoingCallerIds/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^PN[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/OutgoingCallerIds.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          PhoneNumber: Schema.optionalKey(Schema.String),
          FriendlyName: Schema.optionalKey(Schema.String),
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/OutgoingCallerIds.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          PhoneNumber: Schema.String.annotate({
            description:
              'The phone number to verify in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
          }),
          FriendlyName: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'A descriptive string that you create to describe the new caller ID resource. It can be up to 64 characters long. The default value is a formatted version of the phone number.',
            }),
          ),
          CallDelay: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt())
              .annotate({
                description:
                  'The number of seconds to delay before initiating the verification call. Can be an integer between `0` and `60`, inclusive. The default is `0`.',
              }),
          ),
          Extension: Schema.optionalKey(
            Schema.String.annotate({
              description: 'The digits to dial after connecting the verification call.',
            }),
          ),
          StatusCallback: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL we should call using the `status_callback_method` to send status information about the verification process to your application.',
            }),
          ),
          StatusCallbackMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST`, and the default is `POST`.',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Participants/:CallSid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          ConferenceSid: Schema.String.check(
            Schema.isPattern(/^CF[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          CallSid: Schema.String,
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Participants/:CallSid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          ConferenceSid: Schema.String.check(
            Schema.isPattern(/^CF[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          CallSid: Schema.String,
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          Muted: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            )
              .pipe(
                Schema.decodeTo(
                  Schema.Boolean,
                  SchemaTransformation.transform({
                    decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                    encode: (output) => (output ? 'true' : 'false'),
                  }),
                ),
              )
              .annotate({
                description:
                  'Whether the participant should be muted. Can be `true` or `false`. `true` will mute the participant, and `false` will un-mute them. Anything value other than `true` or `false` is interpreted as `false`.',
              }),
          ),
          Hold: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            )
              .pipe(
                Schema.decodeTo(
                  Schema.Boolean,
                  SchemaTransformation.transform({
                    decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                    encode: (output) => (output ? 'true' : 'false'),
                  }),
                ),
              )
              .annotate({
                description:
                  'Whether the participant should be on hold. Can be: `true` or `false`. `true` puts the participant on hold, and `false` lets them rejoin the conference.',
              }),
          ),
          HoldUrl: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL we call using the `hold_method` for music that plays when the participant is on hold. The URL may return an MP3 file, a WAV file, or a TwiML document that contains `<Play>`, `<Say>`, `<Pause>`, or `<Redirect>` verbs.',
            }),
          ),
          HoldMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method we should use to call `hold_url`. Can be: `GET` or `POST` and the default is `GET`.',
            }),
          ),
          AnnounceUrl: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL we call using the `announce_method` for an announcement to the participant. The URL may return an MP3 file, a WAV file, or a TwiML document that contains `<Play>`, `<Say>`, `<Pause>`, or `<Redirect>` verbs.',
            }),
          ),
          AnnounceMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method we should use to call `announce_url`. Can be: `GET` or `POST` and defaults to `POST`.',
            }),
          ),
          WaitUrl: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                "The URL that Twilio calls using the `wait_method` before the conference has started. The URL may return an MP3 file, a WAV file, or a TwiML document. The default value is the URL of our standard hold music. If you do not want anything to play while waiting for the conference to start, specify an empty string by setting `wait_url` to `''`. For more details on the allowable verbs within the `waitUrl`, see the `waitUrl` attribute in the [<Conference> TwiML instruction](https://www.twilio.com/docs/voice/twiml/conference#attributes-waiturl).",
            }),
          ),
          WaitMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method we should use to call `wait_url`. Can be `GET` or `POST` and the default is `POST`. When using a static audio file, this should be `GET` so that we can cache the file.',
            }),
          ),
          BeepOnExit: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            )
              .pipe(
                Schema.decodeTo(
                  Schema.Boolean,
                  SchemaTransformation.transform({
                    decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                    encode: (output) => (output ? 'true' : 'false'),
                  }),
                ),
              )
              .annotate({
                description:
                  'Whether to play a notification beep to the conference when the participant exits. Can be: `true` or `false`.',
              }),
          ),
          EndConferenceOnExit: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            )
              .pipe(
                Schema.decodeTo(
                  Schema.Boolean,
                  SchemaTransformation.transform({
                    decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                    encode: (output) => (output ? 'true' : 'false'),
                  }),
                ),
              )
              .annotate({
                description:
                  'Whether to end the conference when the participant leaves. Can be: `true` or `false` and defaults to `false`.',
              }),
          ),
          Coaching: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            )
              .pipe(
                Schema.decodeTo(
                  Schema.Boolean,
                  SchemaTransformation.transform({
                    decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                    encode: (output) => (output ? 'true' : 'false'),
                  }),
                ),
              )
              .annotate({
                description:
                  'Whether the participant is coaching another call. Can be: `true` or `false`. If not present, defaults to `false` unless `call_sid_to_coach` is defined. If `true`, `call_sid_to_coach` must be defined.',
              }),
          ),
          CallSidToCoach: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^CA[0-9a-fA-F]{32}$/),
              Schema.makeFilter((input) => [...input].length === 34, {
                expected: 'a string of 34 characters',
              }),
            ).annotate({
              description:
                'The SID of the participant who is being `coached`. The participant being coached is the only participant who can hear the participant who is `coaching`.',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Participants/:CallSid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          ConferenceSid: Schema.String.check(
            Schema.isPattern(/^CF[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          CallSid: Schema.String,
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Participants.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          ConferenceSid: Schema.String.check(
            Schema.isPattern(/^CF[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          Muted: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          Hold: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          Coaching: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Participants.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          ConferenceSid: Schema.String,
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          From: Schema.String.annotate({
            description:
              'The phone number, Client identifier, or username portion of SIP address that made this call. Phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +16175551212). Client identifiers are formatted `client:name`. If using a phone number, it must be a Twilio number or a Verified [outgoing caller id](https://www.twilio.com/docs/voice/api/outgoing-caller-ids) for your account. If the `to` parameter is a phone number, `from` must also be a phone number. If `to` is sip address, this value of `from` should be a username portion to be used to populate the P-Asserted-Identity header that is passed to the SIP endpoint.',
          }),
          To: Schema.String.annotate({
            description:
              'The phone number, SIP address, Client, TwiML App identifier that received this call. Phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +16175551212). SIP addresses are formatted as `sip:name@company.com`. Client identifiers are formatted `client:name`. TwiML App identifiers are formatted `app:<APP_SID>`. [Custom parameters](https://www.twilio.com/docs/voice/api/conference-participant-resource#custom-parameters) may also be specified.',
          }),
          StatusCallback: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL we should call using the `status_callback_method` to send status information to your application.',
            }),
          ),
          StatusCallbackMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method we should use to call `status_callback`. Can be: `GET` and `POST` and defaults to `POST`.',
            }),
          ),
          StatusCallbackEvent: Schema.optionalKey(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.String)),
            ).annotate({
              description:
                'The conference state changes that should generate a call to `status_callback`. Can be: `initiated`, `ringing`, `answered`, and `completed`. Separate multiple values with a space. The default value is `completed`.',
            }),
          ),
          Label: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'A label for this participant. If one is supplied, it may subsequently be used to fetch, update or delete the participant.',
            }),
          ),
          Timeout: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt())
              .annotate({
                description:
                  'The number of seconds that we should allow the phone to ring before assuming there is no answer. Can be an integer between `5` and `600`, inclusive. The default value is `60`. We always add a 5-second timeout buffer to outgoing calls, so  value of 10 would result in an actual timeout that was closer to 15 seconds.',
              }),
          ),
          Record: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            )
              .pipe(
                Schema.decodeTo(
                  Schema.Boolean,
                  SchemaTransformation.transform({
                    decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                    encode: (output) => (output ? 'true' : 'false'),
                  }),
                ),
              )
              .annotate({
                description:
                  'Whether to record the participant and their conferences, including the time between conferences. Can be `true` or `false` and the default is `false`.',
              }),
          ),
          Muted: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            )
              .pipe(
                Schema.decodeTo(
                  Schema.Boolean,
                  SchemaTransformation.transform({
                    decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                    encode: (output) => (output ? 'true' : 'false'),
                  }),
                ),
              )
              .annotate({
                description:
                  'Whether the agent is muted in the conference. Can be `true` or `false` and the default is `false`.',
              }),
          ),
          Beep: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'Whether to play a notification beep to the conference when the participant joins. Can be: `true`, `false`, `onEnter`, or `onExit`. The default value is `true`.',
            }),
          ),
          StartConferenceOnEnter: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            )
              .pipe(
                Schema.decodeTo(
                  Schema.Boolean,
                  SchemaTransformation.transform({
                    decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                    encode: (output) => (output ? 'true' : 'false'),
                  }),
                ),
              )
              .annotate({
                description:
                  'Whether to start the conference when the participant joins, if it has not already started. Can be: `true` or `false` and the default is `true`. If `false` and the conference has not started, the participant is muted and hears background music until another participant starts the conference.',
              }),
          ),
          EndConferenceOnExit: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            )
              .pipe(
                Schema.decodeTo(
                  Schema.Boolean,
                  SchemaTransformation.transform({
                    decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                    encode: (output) => (output ? 'true' : 'false'),
                  }),
                ),
              )
              .annotate({
                description:
                  'Whether to end the conference when the participant leaves. Can be: `true` or `false` and defaults to `false`.',
              }),
          ),
          WaitUrl: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                "The URL that Twilio calls using the `wait_method` before the conference has started. The URL may return an MP3 file, a WAV file, or a TwiML document. The default value is the URL of our standard hold music. If you do not want anything to play while waiting for the conference to start, specify an empty string by setting `wait_url` to `''`. For more details on the allowable verbs within the `waitUrl`, see the `waitUrl` attribute in the [<Conference> TwiML instruction](https://www.twilio.com/docs/voice/twiml/conference#attributes-waiturl).",
            }),
          ),
          WaitMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method we should use to call `wait_url`. Can be `GET` or `POST` and the default is `POST`. When using a static audio file, this should be `GET` so that we can cache the file.',
            }),
          ),
          EarlyMedia: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            )
              .pipe(
                Schema.decodeTo(
                  Schema.Boolean,
                  SchemaTransformation.transform({
                    decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                    encode: (output) => (output ? 'true' : 'false'),
                  }),
                ),
              )
              .annotate({
                description:
                  'Whether to allow an agent to hear the state of the outbound call, including ringing or disconnect messages. Can be: `true` or `false` and defaults to `true`.',
              }),
          ),
          MaxParticipants: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt())
              .annotate({
                description:
                  'The maximum number of participants in the conference. Can be a positive integer from `2` to `250`. The default value is `250`.',
              }),
          ),
          ConferenceRecord: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'Whether to record the conference the participant is joining. Can be: `true`, `false`, `record-from-start`, and `do-not-record`. The default value is `false`.',
            }),
          ),
          ConferenceTrim: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'Whether to trim leading and trailing silence from the conference recording. Can be: `trim-silence` or `do-not-trim` and defaults to `trim-silence`.',
            }),
          ),
          ConferenceStatusCallback: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL we should call using the `conference_status_callback_method` when the conference events in `conference_status_callback_event` occur. Only the value set by the first participant to join the conference is used. Subsequent `conference_status_callback` values are ignored.',
            }),
          ),
          ConferenceStatusCallbackMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method we should use to call `conference_status_callback`. Can be: `GET` or `POST` and defaults to `POST`.',
            }),
          ),
          ConferenceStatusCallbackEvent: Schema.optionalKey(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.String)),
            ).annotate({
              description:
                'The conference state changes that should generate a call to `conference_status_callback`. Can be: `start`, `end`, `join`, `leave`, `mute`, `hold`, `modify`, `speaker`, and `announcement`. Separate multiple values with a space. Defaults to `start end`.',
            }),
          ),
          RecordingChannels: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'The recording channels for the final recording. Can be: `mono` or `dual` and the default is `mono`.',
            }),
          ),
          RecordingStatusCallback: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL that we should call using the `recording_status_callback_method` when the recording status changes.',
            }),
          ),
          RecordingStatusCallbackMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method we should use when we call `recording_status_callback`. Can be: `GET` or `POST` and defaults to `POST`.',
            }),
          ),
          SipAuthUsername: Schema.optionalKey(
            Schema.String.annotate({ description: 'The SIP username used for authentication.' }),
          ),
          SipAuthPassword: Schema.optionalKey(
            Schema.String.annotate({ description: 'The SIP password for authentication.' }),
          ),
          Region: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'The [region](https://support.twilio.com/hc/en-us/articles/223132167-How-global-low-latency-routing-and-region-selection-work-for-conferences-and-Client-calls) where we should mix the recorded audio. Can be:`us1`, `us2`, `ie1`, `de1`, `sg1`, `br1`, `au1`, or `jp1`.',
            }),
          ),
          ConferenceRecordingStatusCallback: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL we should call using the `conference_recording_status_callback_method` when the conference recording is available.',
            }),
          ),
          ConferenceRecordingStatusCallbackMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method we should use to call `conference_recording_status_callback`. Can be: `GET` or `POST` and defaults to `POST`.',
            }),
          ),
          RecordingStatusCallbackEvent: Schema.optionalKey(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.String)),
            ).annotate({
              description:
                "The recording state changes that should generate a call to `recording_status_callback`. Can be: `started`, `in-progress`, `paused`, `resumed`, `stopped`, `completed`, `failed`, and `absent`. Separate multiple values with a space, ex: `'in-progress completed failed'`.",
            }),
          ),
          ConferenceRecordingStatusCallbackEvent: Schema.optionalKey(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.String)),
            ).annotate({
              description:
                "The conference recording state changes that generate a call to `conference_recording_status_callback`. Can be: `in-progress`, `completed`, `failed`, and `absent`. Separate multiple values with a space, ex: `'in-progress completed failed'`",
            }),
          ),
          Coaching: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            )
              .pipe(
                Schema.decodeTo(
                  Schema.Boolean,
                  SchemaTransformation.transform({
                    decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                    encode: (output) => (output ? 'true' : 'false'),
                  }),
                ),
              )
              .annotate({
                description:
                  'Whether the participant is coaching another call. Can be: `true` or `false`. If not present, defaults to `false` unless `call_sid_to_coach` is defined. If `true`, `call_sid_to_coach` must be defined.',
              }),
          ),
          CallSidToCoach: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^CA[0-9a-fA-F]{32}$/),
              Schema.makeFilter((input) => [...input].length === 34, {
                expected: 'a string of 34 characters',
              }),
            ).annotate({
              description:
                'The SID of the participant who is being `coached`. The participant being coached is the only participant who can hear the participant who is `coaching`.',
            }),
          ),
          JitterBufferSize: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "Jitter buffer size for the connecting participant. Twilio will use this setting to apply Jitter Buffer before participant's audio is mixed into the conference. Can be: `off`, `small`, `medium`, and `large`. Default to `large`.",
            }),
          ),
          Byoc: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^BY[0-9a-fA-F]{32}$/),
              Schema.makeFilter((input) => [...input].length === 34, {
                expected: 'a string of 34 characters',
              }),
            ).annotate({
              description:
                'The SID of a BYOC (Bring Your Own Carrier) trunk to route this call with. Note that `byoc` is only meaningful when `to` is a phone number; it will otherwise be ignored. (Beta)',
            }),
          ),
          CallerId: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'The phone number, Client identifier, or username portion of SIP address that made this call. Phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +16175551212). Client identifiers are formatted `client:name`. If using a phone number, it must be a Twilio number or a Verified [outgoing caller id](https://www.twilio.com/docs/voice/api/outgoing-caller-ids) for your account. If the `to` parameter is a phone number, `callerId` must also be a phone number. If `to` is sip address, this value of `callerId` should be a username portion to be used to populate the From header that is passed to the SIP endpoint.',
            }),
          ),
          CallReason: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "The Reason for the outgoing call. Use it to specify the purpose of the call that is presented on the called party's phone. (Branded Calls Beta)",
            }),
          ),
          RecordingTrack: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'The audio track to record for the call. Can be: `inbound`, `outbound` or `both`. The default is `both`. `inbound` records the audio that is received by Twilio. `outbound` records the audio that is sent from Twilio. `both` records the audio that is received and sent by Twilio.',
            }),
          ),
          RecordingConfigurationId: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'The identifier of the configuration to be used when creating and processing the recording',
            }),
          ),
          TimeLimit: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt())
              .annotate({
                description:
                  'The maximum duration of the call in seconds. Constraints depend on account and configuration.',
              }),
          ),
          MachineDetection: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'Whether to detect if a human, answering machine, or fax has picked up the call. Can be: `Enable` or `DetectMessageEnd`. Use `Enable` if you would like us to return `AnsweredBy` as soon as the called party is identified. Use `DetectMessageEnd`, if you would like to leave a message on an answering machine. For more information, see [Answering Machine Detection](https://www.twilio.com/docs/voice/answering-machine-detection).',
            }),
          ),
          MachineDetectionTimeout: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt())
              .annotate({
                description:
                  'The number of seconds that we should attempt to detect an answering machine before timing out and sending a voice request with `AnsweredBy` of `unknown`. The default timeout is 30 seconds.',
              }),
          ),
          MachineDetectionSpeechThreshold: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt())
              .annotate({
                description:
                  'The number of milliseconds that is used as the measuring stick for the length of the speech activity, where durations lower than this value will be interpreted as a human and longer than this value as a machine. Possible Values: 1000-6000. Default: 2400.',
              }),
          ),
          MachineDetectionSpeechEndThreshold: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt())
              .annotate({
                description:
                  'The number of milliseconds of silence after speech activity at which point the speech activity is considered complete. Possible Values: 500-5000. Default: 1200.',
              }),
          ),
          MachineDetectionSilenceTimeout: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt())
              .annotate({
                description:
                  'The number of milliseconds of initial silence after which an `unknown` AnsweredBy result will be returned. Possible Values: 2000-10000. Default: 5000.',
              }),
          ),
          AmdStatusCallback: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL that we should call using the `amd_status_callback_method` to notify customer application whether the call was answered by human, machine or fax.',
            }),
          ),
          AmdStatusCallbackMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method we should use when calling the `amd_status_callback` URL. Can be: `GET` or `POST` and the default is `POST`.',
            }),
          ),
          Trim: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'Whether to trim any leading and trailing silence from the participant recording. Can be: `trim-silence` or `do-not-trim` and the default is `trim-silence`.',
            }),
          ),
          CallToken: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "A token string needed to invoke a forwarded call. A call_token is generated when an incoming call is received on a Twilio number. Pass an incoming call's call_token value to a forwarded call via the call_token parameter when creating a new call. A forwarded call should bear the same CallerID of the original incoming call.",
            }),
          ),
          Passports: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'The STIR/SHAKEN passport for this call, provided as a base64 encoded string. Multiple passports (at max 5) are comma separated and provided as base64 encoded string',
            }),
          ),
          ClientNotificationUrl: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description: 'The URL that we should use to deliver `push call notification`.',
            }),
          ),
          CallerDisplayName: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'The name that populates the display name in the From header. Must be between 2 and 255 characters. Only applicable for calls to sip address.',
            }),
          ),
          EmergencyCallerPosition: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'The emergency caller\'s GPS coordinates in decimal degrees format.\nFormat: "latitude longitude" (space-separated)\n- Latitude: decimal degrees, range -90.0 to +90.0 (negative for South, positive for North)\n- Longitude: decimal degrees, range -180.0 to +180.0 (negative for West, positive for East)\n- Precision: up to 6 decimal places recommended for meter-level accuracy\n\nNote: If the value exceeds 150 characters, only the first 150 characters will be used.\n',
            }),
          ),
          EmergencyCallerLocation: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "The emergency caller's physical location description within a building or facility.\n\nNote: If the value exceeds 20 characters, only the first 20 characters will be used.\n",
            }),
          ),
          EmergencyName: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "The emergency caller's organization or entity name.\n\nNote: If the value exceeds 20 characters, only the first 20 characters will be used.\n",
            }),
          ),
          EmergencyAddress: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "The emergency caller's street address including street number and street name.\n\nNote: If the value exceeds 60 characters, only the first 60 characters will be used.\n",
            }),
          ),
          EmergencyZipCode: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "The emergency caller's postal code or ZIP code.\n\nNote: If the value exceeds 20 characters, only the first 20 characters will be used.\n",
            }),
          ),
          EmergencyCity: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "The emergency caller's city or municipality name.\nShould be the official city name as recognized by local authorities.\nUsed in combination with state and country for emergency call routing.\n\nNote: If the value exceeds 20 characters, only the first 20 characters will be used.\n",
            }),
          ),
          EmergencyState: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "The emergency caller's state or province.\n\nNote: If the value exceeds 20 characters, only the first 20 characters will be used.\n",
            }),
          ),
          EmergencyCountry: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "The emergency caller's country. Currently supported US and CA only.\n\nNote: If the value exceeds 20 characters, only the first 20 characters will be used.\n",
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Payments.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          CallSid: Schema.String.check(
            Schema.isPattern(/^CA[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          IdempotencyKey: Schema.String.annotate({
            description:
              'A unique token that will be used to ensure that multiple API calls with the same information do not result in multiple transactions. This should be a unique string value per API call and can be a randomly generated.',
          }),
          StatusCallback: Schema.String.check(
            Schema.makeFilter((input) => URL.canParse(input)),
          ).annotate({
            description:
              'Provide an absolute or relative URL to receive status updates regarding your Pay session. Read more about the [expected StatusCallback values](https://www.twilio.com/docs/voice/api/payment-resource#statuscallback)',
          }),
          BankAccountType: Schema.optionalKey(PaymentsEnumBankAccountTypeSchema),
          ChargeAmount: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .annotate({
                description:
                  'A positive decimal value less than 1,000,000 to charge against the credit card or bank account. Default currency can be overwritten with `currency` field. Leave blank or set to 0 to tokenize.',
              }),
          ),
          Currency: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'The currency of the `charge_amount`, formatted as [ISO 4127](http://www.iso.org/iso/home/standards/currency_codes.htm) format. The default value is `USD` and all values allowed from the Pay Connector are accepted.',
            }),
          ),
          Description: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'The description can be used to provide more details regarding the transaction. This information is submitted along with the payment details to the Payment Connector which are then posted on the transactions.',
            }),
          ),
          Input: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'A list of inputs that should be accepted. Currently only `dtmf` is supported. All digits captured during a pay session are redacted from the logs.',
            }),
          ),
          MinPostalCodeLength: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt())
              .annotate({
                description:
                  'A positive integer that is used to validate the length of the `PostalCode` inputted by the user. User must enter this many digits.',
              }),
          ),
          Parameter: Schema.optionalKey(
            Schema.Unknown.annotate({
              description:
                'A single-level JSON object used to pass custom parameters to payment processors. (Required for ACH payments). The information that has to be included here depends on the <Pay> Connector. [Read more](https://www.twilio.com/console/voice/pay-connectors).',
            }),
          ),
          PaymentConnector: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'This is the unique name corresponding to the Pay Connector installed in the Twilio Add-ons. Learn more about [<Pay> Connectors](https://www.twilio.com/console/voice/pay-connectors). The default value is `Default`.',
            }),
          ),
          PaymentMethod: Schema.optionalKey(PaymentsEnumPaymentMethodSchema),
          PostalCode: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            )
              .pipe(
                Schema.decodeTo(
                  Schema.Boolean,
                  SchemaTransformation.transform({
                    decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                    encode: (output) => (output ? 'true' : 'false'),
                  }),
                ),
              )
              .annotate({
                description:
                  'Indicates whether the credit card postal code (zip code) is a required piece of payment information that must be provided by the caller. The default is `true`.',
              }),
          ),
          SecurityCode: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            )
              .pipe(
                Schema.decodeTo(
                  Schema.Boolean,
                  SchemaTransformation.transform({
                    decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                    encode: (output) => (output ? 'true' : 'false'),
                  }),
                ),
              )
              .annotate({
                description:
                  'Indicates whether the credit card security code is a required piece of payment information that must be provided by the caller. The default is `true`.',
              }),
          ),
          Timeout: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt())
              .annotate({
                description:
                  'The number of seconds that <Pay> should wait for the caller to press a digit between each subsequent digit, after the first one, before moving on to validate the digits captured. The default is `5`, maximum is `600`.',
              }),
          ),
          TokenType: Schema.optionalKey(PaymentsEnumTokenTypeSchema),
          ValidCardTypes: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'Credit card types separated by space that Pay should accept. The default value is `visa mastercard amex`',
            }),
          ),
          RequireMatchingInputs: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'A comma-separated list of payment information fields that require the caller to enter the same value twice for confirmation. Supported values are `payment-card-number`, `expiration-date`, `security-code`, and `postal-code`.',
            }),
          ),
          Confirmation: Schema.optionalKey(
            Schema.Literals(['true', 'false']).annotate({
              description:
                'Whether to prompt the caller to confirm their payment information before submitting to the payment gateway. If `true`, the caller will hear the last 4 digits of their card or account number and must press 1 to confirm or 2 to cancel. Default is `false`.',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Payments/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          CallSid: Schema.String.check(
            Schema.isPattern(/^CA[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^PK[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          IdempotencyKey: Schema.String.annotate({
            description:
              'A unique token that will be used to ensure that multiple API calls with the same information do not result in multiple transactions. This should be a unique string value per API call and can be a randomly generated.',
          }),
          StatusCallback: Schema.String.check(
            Schema.makeFilter((input) => URL.canParse(input)),
          ).annotate({
            description:
              'Provide an absolute or relative URL to receive status updates regarding your Pay session. Read more about the [Update](https://www.twilio.com/docs/voice/api/payment-resource#statuscallback-update) and [Complete/Cancel](https://www.twilio.com/docs/voice/api/payment-resource#statuscallback-cancelcomplete) POST requests.',
          }),
          Capture: Schema.optionalKey(PaymentsEnumCaptureSchema),
          Status: Schema.optionalKey(PaymentsEnumStatusSchema),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Queues/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^QU[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Queues/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^QU[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          FriendlyName: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'A descriptive string that you created to describe this resource. It can be up to 64 characters long.',
            }),
          ),
          MaxSize: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt())
              .annotate({
                description:
                  'The maximum number of calls allowed to be in the queue. The default is 1000. The maximum is 5000.',
              }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Queues/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^QU[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Queues.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Queues.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          FriendlyName: Schema.String.annotate({
            description:
              'A descriptive string that you created to describe this resource. It can be up to 64 characters long.',
          }),
          MaxSize: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt())
              .annotate({
                description:
                  'The maximum number of calls allowed to be in the queue. The default is 1000. The maximum is 5000.',
              }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Transcriptions.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          CallSid: Schema.String.check(
            Schema.isPattern(/^CA[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          Name: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'The user-specified name of this Transcription, if one was given when the Transcription was created. This may be used to stop the Transcription.',
            }),
          ),
          Track: Schema.optionalKey(RealtimeTranscriptionEnumTrackSchema),
          StatusCallbackUrl: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description: 'Absolute URL of the status callback.',
            }),
          ),
          StatusCallbackMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description: 'The http method for the status_callback (one of GET, POST).',
            }),
          ),
          InboundTrackLabel: Schema.optionalKey(
            Schema.String.annotate({ description: 'Friendly name given to the Inbound Track' }),
          ),
          OutboundTrackLabel: Schema.optionalKey(
            Schema.String.annotate({ description: 'Friendly name given to the Outbound Track' }),
          ),
          PartialResults: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            )
              .pipe(
                Schema.decodeTo(
                  Schema.Boolean,
                  SchemaTransformation.transform({
                    decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                    encode: (output) => (output ? 'true' : 'false'),
                  }),
                ),
              )
              .annotate({
                description: 'Indicates if partial results are going to be sent to the customer',
              }),
          ),
          LanguageCode: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'Language code used by the transcription engine, specified in [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt) format',
            }),
          ),
          TranscriptionEngine: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'Definition of the transcription engine to be used, among those supported by Twilio',
            }),
          ),
          ProfanityFilter: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            )
              .pipe(
                Schema.decodeTo(
                  Schema.Boolean,
                  SchemaTransformation.transform({
                    decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                    encode: (output) => (output ? 'true' : 'false'),
                  }),
                ),
              )
              .annotate({
                description:
                  'indicates if the server will attempt to filter out profanities, replacing all but the initial character in each filtered word with asterisks',
              }),
          ),
          SpeechModel: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'Recognition model used by the transcription engine, among those supported by the provider',
            }),
          ),
          Hints: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'A Phrase contains words and phrase "hints" so that the speech recognition engine is more likely to recognize them.',
            }),
          ),
          EnableAutomaticPunctuation: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            )
              .pipe(
                Schema.decodeTo(
                  Schema.Boolean,
                  SchemaTransformation.transform({
                    decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                    encode: (output) => (output ? 'true' : 'false'),
                  }),
                ),
              )
              .annotate({ description: 'The provider will add punctuation to recognition result' }),
          ),
          IntelligenceService: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'The SID or unique name of the [Intelligence Service](https://www.twilio.com/docs/conversational-intelligence/api/service-resource) for persisting transcripts and running post-call Language Operators',
            }),
          ),
          ConversationConfiguration: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'The ID of the Conversations Configuration for customizing conversation behavior in Intelligence Service',
            }),
          ),
          ConversationId: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'The ID of the Conversation for associating this Transcription with an existing Conversation in Intelligence Service',
            }),
          ),
          TranscriptionConfigurationId: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'The ID of the RealTimeTranscription Configuration for configuring all the non-default behaviors in one go.',
            }),
          ),
          EnableProviderData: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            )
              .pipe(
                Schema.decodeTo(
                  Schema.Boolean,
                  SchemaTransformation.transform({
                    decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                    encode: (output) => (output ? 'true' : 'false'),
                  }),
                ),
              )
              .annotate({ description: 'Whether the callback includes raw provider data.' }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Transcriptions/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          CallSid: Schema.String.check(
            Schema.isPattern(/^CA[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String,
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({ Status: RealtimeTranscriptionEnumUpdateStatusSchema }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^RE[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          IncludeSoftDeleted: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^RE[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          DateCreated: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
              ),
            ),
          ),
          'DateCreated<': Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
              ),
            ),
          ),
          'DateCreated>': Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
              ),
            ),
          ),
          CallSid: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^CA[0-9a-fA-F]{32}$/),
              Schema.makeFilter((input) => [...input].length === 34, {
                expected: 'a string of 34 characters',
              }),
            ),
          ),
          ConferenceSid: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^CF[0-9a-fA-F]{32}$/),
              Schema.makeFilter((input) => [...input].length === 34, {
                expected: 'a string of 34 characters',
              }),
            ),
          ),
          IncludeSoftDeleted: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          ReferenceSid: Schema.String.check(
            Schema.isPattern(/^RE[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^XR[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          ReferenceSid: Schema.String.check(
            Schema.isPattern(/^RE[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^XR[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          ReferenceSid: Schema.String.check(
            Schema.isPattern(/^RE[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults/:AddOnResultSid/Payloads/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          ReferenceSid: Schema.String.check(
            Schema.isPattern(/^RE[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          AddOnResultSid: Schema.String.check(
            Schema.isPattern(/^XR[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^XH[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults/:AddOnResultSid/Payloads/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          ReferenceSid: Schema.String.check(
            Schema.isPattern(/^RE[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          AddOnResultSid: Schema.String.check(
            Schema.isPattern(/^XR[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^XH[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults/:AddOnResultSid/Payloads.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          ReferenceSid: Schema.String.check(
            Schema.isPattern(/^RE[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          AddOnResultSid: Schema.String.check(
            Schema.isPattern(/^XR[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults/:AddOnResultSid/Payloads/:PayloadSid/Data.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          ReferenceSid: Schema.String.check(
            Schema.isPattern(/^RE[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          AddOnResultSid: Schema.String.check(
            Schema.isPattern(/^XR[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          PayloadSid: Schema.String.check(
            Schema.isPattern(/^XH[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:RecordingSid/Transcriptions/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          RecordingSid: Schema.String.check(
            Schema.isPattern(/^RE[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^TR[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:RecordingSid/Transcriptions/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          RecordingSid: Schema.String.check(
            Schema.isPattern(/^RE[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^TR[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Recordings/:RecordingSid/Transcriptions.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          RecordingSid: Schema.String.check(
            Schema.isPattern(/^RE[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SMS/ShortCodes/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^SC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SMS/ShortCodes/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^SC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          FriendlyName: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'A descriptive string that you created to describe this resource. It can be up to 64 characters long. By default, the `FriendlyName` is the short code.',
            }),
          ),
          ApiVersion: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'The API version to use to start a new TwiML session. Can be: `2010-04-01` or `2008-08-01`.',
            }),
          ),
          SmsUrl: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL we should call when receiving an incoming SMS message to this short code.',
            }),
          ),
          SmsMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method we should use when calling the `sms_url`. Can be: `GET` or `POST`.',
            }),
          ),
          SmsFallbackUrl: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL that we should call if an error occurs while retrieving or executing the TwiML from `sms_url`.',
            }),
          ),
          SmsFallbackMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method that we should use to call the `sms_fallback_url`. Can be: `GET` or `POST`.',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SMS/ShortCodes.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          FriendlyName: Schema.optionalKey(Schema.String),
          ShortCode: Schema.optionalKey(Schema.String),
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SigningKeys/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^SK[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SigningKeys/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^SK[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          FriendlyName: Schema.optionalKey(Schema.String.annotate({ description: '' })),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SigningKeys/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^SK[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/CredentialListMappings.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          DomainSid: Schema.String.check(
            Schema.isPattern(/^SD[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/CredentialListMappings.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          DomainSid: Schema.String.check(
            Schema.isPattern(/^SD[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          CredentialListSid: Schema.String.check(
            Schema.isPattern(/^CL[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ).annotate({
            description: 'The SID of the CredentialList resource to map to the SIP domain.',
          }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/CredentialListMappings/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          DomainSid: Schema.String.check(
            Schema.isPattern(/^SD[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^CL[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/CredentialListMappings/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          DomainSid: Schema.String.check(
            Schema.isPattern(/^SD[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^CL[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/IpAccessControlListMappings.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          DomainSid: Schema.String.check(
            Schema.isPattern(/^SD[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/IpAccessControlListMappings.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          DomainSid: Schema.String.check(
            Schema.isPattern(/^SD[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          IpAccessControlListSid: Schema.String.check(
            Schema.isPattern(/^AL[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ).annotate({
            description: 'The SID of the IpAccessControlList resource to map to the SIP domain.',
          }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/IpAccessControlListMappings/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          DomainSid: Schema.String.check(
            Schema.isPattern(/^SD[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^AL[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/IpAccessControlListMappings/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          DomainSid: Schema.String.check(
            Schema.isPattern(/^SD[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^AL[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Registrations/CredentialListMappings.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          DomainSid: Schema.String.check(
            Schema.isPattern(/^SD[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Registrations/CredentialListMappings.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          DomainSid: Schema.String.check(
            Schema.isPattern(/^SD[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          CredentialListSid: Schema.String.check(
            Schema.isPattern(/^CL[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ).annotate({
            description: 'The SID of the CredentialList resource to map to the SIP domain.',
          }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Registrations/CredentialListMappings/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          DomainSid: Schema.String.check(
            Schema.isPattern(/^SD[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^CL[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Registrations/CredentialListMappings/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          DomainSid: Schema.String.check(
            Schema.isPattern(/^SD[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^CL[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:CredentialListSid/Credentials.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          CredentialListSid: Schema.String.check(
            Schema.isPattern(/^CL[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:CredentialListSid/Credentials.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          CredentialListSid: Schema.String.check(
            Schema.isPattern(/^CL[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          Username: Schema.String.annotate({
            description:
              "The username that will be passed when authenticating SIP requests. The username should be sent in response to Twilio's challenge of the initial INVITE. It can be up to 32 characters long.",
          }),
          Password: Schema.String.annotate({
            description:
              'The password that the username will use when authenticating SIP requests. The password must be a minimum of 12 characters, contain at least 1 digit, and have mixed case. (eg `IWasAtSignal2018`)',
          }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:CredentialListSid/Credentials/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          CredentialListSid: Schema.String.check(
            Schema.isPattern(/^CL[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^CR[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:CredentialListSid/Credentials/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          CredentialListSid: Schema.String.check(
            Schema.isPattern(/^CL[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^CR[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          Password: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'The password that the username will use when authenticating SIP requests. The password must be a minimum of 12 characters, contain at least 1 digit, and have mixed case. (eg `IWasAtSignal2018`)',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:CredentialListSid/Credentials/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          CredentialListSid: Schema.String.check(
            Schema.isPattern(/^CL[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^CR[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          FriendlyName: Schema.String.annotate({
            description:
              'A human readable descriptive text that describes the CredentialList, up to 64 characters long.',
          }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^CL[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^CL[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          FriendlyName: Schema.String.annotate({
            description:
              'A human readable descriptive text for a CredentialList, up to 64 characters long.',
          }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^CL[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/CredentialListMappings.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          DomainSid: Schema.String.check(
            Schema.isPattern(/^SD[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/CredentialListMappings.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          DomainSid: Schema.String.check(
            Schema.isPattern(/^SD[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          CredentialListSid: Schema.String.check(
            Schema.isPattern(/^CL[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ).annotate({
            description:
              'A 34 character string that uniquely identifies the CredentialList resource to map to the SIP domain.',
          }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/CredentialListMappings/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          DomainSid: Schema.String.check(
            Schema.isPattern(/^SD[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^CL[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/CredentialListMappings/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          DomainSid: Schema.String.check(
            Schema.isPattern(/^SD[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^CL[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          DomainName: Schema.String.annotate({
            description:
              'The unique address you reserve on Twilio to which you route your SIP traffic. Domain names can contain letters, digits, and "-" and must end with `sip.twilio.com`.',
          }),
          FriendlyName: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'A descriptive string that you created to describe the resource. It can be up to 64 characters long.',
            }),
          ),
          VoiceUrl: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description: 'The URL we should when the domain receives a call.',
            }),
          ),
          VoiceMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method we should use to call `voice_url`. Can be: `GET` or `POST`.',
            }),
          ),
          VoiceFallbackUrl: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL that we should call when an error occurs while retrieving or executing the TwiML from `voice_url`.',
            }),
          ),
          VoiceFallbackMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method we should use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
            }),
          ),
          VoiceStatusCallbackUrl: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL that we should call to pass status parameters (such as call ended) to your application.',
            }),
          ),
          VoiceStatusCallbackMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method we should use to call `voice_status_callback_url`. Can be: `GET` or `POST`.',
            }),
          ),
          SipRegistration: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            )
              .pipe(
                Schema.decodeTo(
                  Schema.Boolean,
                  SchemaTransformation.transform({
                    decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                    encode: (output) => (output ? 'true' : 'false'),
                  }),
                ),
              )
              .annotate({
                description:
                  'Whether to allow SIP Endpoints to register with the domain to receive calls. Can be `true` or `false`. `true` allows SIP Endpoints to register with the domain to receive calls, `false` does not.',
              }),
          ),
          EmergencyCallingEnabled: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            )
              .pipe(
                Schema.decodeTo(
                  Schema.Boolean,
                  SchemaTransformation.transform({
                    decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                    encode: (output) => (output ? 'true' : 'false'),
                  }),
                ),
              )
              .annotate({
                description:
                  'Whether emergency calling is enabled for the domain. If enabled, allows emergency calls on the domain from phone numbers with validated addresses.',
              }),
          ),
          Secure: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            )
              .pipe(
                Schema.decodeTo(
                  Schema.Boolean,
                  SchemaTransformation.transform({
                    decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                    encode: (output) => (output ? 'true' : 'false'),
                  }),
                ),
              )
              .annotate({
                description:
                  'Whether secure SIP is enabled for the domain. If enabled, TLS will be enforced and SRTP will be negotiated on all incoming calls to this sip domain.',
              }),
          ),
          ByocTrunkSid: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^BY[0-9a-fA-F]{32}$/),
              Schema.makeFilter((input) => [...input].length === 34, {
                expected: 'a string of 34 characters',
              }),
            ).annotate({
              description:
                'The SID of the BYOC Trunk(Bring Your Own Carrier) resource that the Sip Domain will be associated with.',
            }),
          ),
          EmergencyCallerSid: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^PN[0-9a-fA-F]{32}$/),
              Schema.makeFilter((input) => [...input].length === 34, {
                expected: 'a string of 34 characters',
              }),
            ).annotate({
              description:
                'Whether an emergency caller sid is configured for the domain. If present, this phone number will be used as the callback for the emergency call.',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^SD[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^SD[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          FriendlyName: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'A descriptive string that you created to describe the resource. It can be up to 64 characters long.',
            }),
          ),
          VoiceFallbackMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method we should use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
            }),
          ),
          VoiceFallbackUrl: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL that we should call when an error occurs while retrieving or executing the TwiML requested by `voice_url`.',
            }),
          ),
          VoiceMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description: 'The HTTP method we should use to call `voice_url`',
            }),
          ),
          VoiceStatusCallbackMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method we should use to call `voice_status_callback_url`. Can be: `GET` or `POST`.',
            }),
          ),
          VoiceStatusCallbackUrl: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description:
                'The URL that we should call to pass status parameters (such as call ended) to your application.',
            }),
          ),
          VoiceUrl: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description: 'The URL we should call when the domain receives a call.',
            }),
          ),
          SipRegistration: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            )
              .pipe(
                Schema.decodeTo(
                  Schema.Boolean,
                  SchemaTransformation.transform({
                    decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                    encode: (output) => (output ? 'true' : 'false'),
                  }),
                ),
              )
              .annotate({
                description:
                  'Whether to allow SIP Endpoints to register with the domain to receive calls. Can be `true` or `false`. `true` allows SIP Endpoints to register with the domain to receive calls, `false` does not.',
              }),
          ),
          DomainName: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'The unique address you reserve on Twilio to which you route your SIP traffic. Domain names can contain letters, digits, and "-" and must end with `sip.twilio.com`.',
            }),
          ),
          EmergencyCallingEnabled: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            )
              .pipe(
                Schema.decodeTo(
                  Schema.Boolean,
                  SchemaTransformation.transform({
                    decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                    encode: (output) => (output ? 'true' : 'false'),
                  }),
                ),
              )
              .annotate({
                description:
                  'Whether emergency calling is enabled for the domain. If enabled, allows emergency calls on the domain from phone numbers with validated addresses.',
              }),
          ),
          Secure: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            )
              .pipe(
                Schema.decodeTo(
                  Schema.Boolean,
                  SchemaTransformation.transform({
                    decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                    encode: (output) => (output ? 'true' : 'false'),
                  }),
                ),
              )
              .annotate({
                description:
                  'Whether secure SIP is enabled for the domain. If enabled, TLS will be enforced and SRTP will be negotiated on all incoming calls to this sip domain.',
              }),
          ),
          ByocTrunkSid: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^BY[0-9a-fA-F]{32}$/),
              Schema.makeFilter((input) => [...input].length === 34, {
                expected: 'a string of 34 characters',
              }),
            ).annotate({
              description:
                'The SID of the BYOC Trunk(Bring Your Own Carrier) resource that the Sip Domain will be associated with.',
            }),
          ),
          EmergencyCallerSid: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^PN[0-9a-fA-F]{32}$/),
              Schema.makeFilter((input) => [...input].length === 34, {
                expected: 'a string of 34 characters',
              }),
            ).annotate({
              description:
                'Whether an emergency caller sid is configured for the domain. If present, this phone number will be used as the callback for the emergency call.',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^SD[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          FriendlyName: Schema.String.annotate({
            description:
              'A human readable descriptive text that describes the IpAccessControlList, up to 255 characters long.',
          }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^AL[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^AL[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          FriendlyName: Schema.String.annotate({
            description: 'A human readable descriptive text, up to 255 characters long.',
          }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^AL[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/IpAccessControlListMappings/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          DomainSid: Schema.String.check(
            Schema.isPattern(/^SD[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^AL[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/IpAccessControlListMappings/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          DomainSid: Schema.String.check(
            Schema.isPattern(/^SD[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^AL[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/IpAccessControlListMappings.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          DomainSid: Schema.String.check(
            Schema.isPattern(/^SD[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/IpAccessControlListMappings.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          DomainSid: Schema.String.check(
            Schema.isPattern(/^SD[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          IpAccessControlListSid: Schema.String.check(
            Schema.isPattern(/^AL[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ).annotate({
            description: 'The unique id of the IP access control list to map to the SIP domain.',
          }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:IpAccessControlListSid/IpAddresses.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          IpAccessControlListSid: Schema.String.check(
            Schema.isPattern(/^AL[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:IpAccessControlListSid/IpAddresses.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          IpAccessControlListSid: Schema.String.check(
            Schema.isPattern(/^AL[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          FriendlyName: Schema.String.annotate({
            description:
              'A human readable descriptive text for this resource, up to 255 characters long.',
          }),
          IpAddress: Schema.String.annotate({
            description:
              'An IP address in dotted decimal notation from which you want to accept traffic. Any SIP requests from this IP address will be allowed by Twilio. IPv4 only supported today.',
          }),
          CidrPrefixLength: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt())
              .annotate({
                description:
                  'An integer representing the length of the CIDR prefix to use with this IP address when accepting traffic. By default the entire IP address is used.',
              }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:IpAccessControlListSid/IpAddresses/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          IpAccessControlListSid: Schema.String.check(
            Schema.isPattern(/^AL[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^IP[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:IpAccessControlListSid/IpAddresses/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          IpAccessControlListSid: Schema.String.check(
            Schema.isPattern(/^AL[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^IP[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          IpAddress: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'An IP address in dotted decimal notation from which you want to accept traffic. Any SIP requests from this IP address will be allowed by Twilio. IPv4 only supported today.',
            }),
          ),
          FriendlyName: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'A human readable descriptive text for this resource, up to 255 characters long.',
            }),
          ),
          CidrPrefixLength: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt())
              .annotate({
                description:
                  'An integer representing the length of the CIDR prefix to use with this IP address when accepting traffic. By default the entire IP address is used.',
              }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:IpAccessControlListSid/IpAddresses/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          IpAccessControlListSid: Schema.String.check(
            Schema.isPattern(/^AL[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^IP[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Siprec.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          CallSid: Schema.String.check(
            Schema.isPattern(/^CA[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          Name: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'The user-specified name of this Siprec, if one was given when the Siprec was created. This may be used to stop the Siprec.',
            }),
          ),
          ConnectorName: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'Unique name used when configuring the connector via Marketplace Add-on.',
            }),
          ),
          Track: Schema.optionalKey(SiprecEnumTrackSchema),
          StatusCallback: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description: 'Absolute URL of the status callback.',
            }),
          ),
          StatusCallbackMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description: 'The http method for the status_callback (one of GET, POST).',
            }),
          ),
          'Parameter1.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter1.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter2.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter2.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter3.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter3.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter4.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter4.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter5.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter5.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter6.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter6.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter7.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter7.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter8.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter8.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter9.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter9.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter10.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter10.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter11.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter11.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter12.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter12.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter13.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter13.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter14.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter14.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter15.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter15.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter16.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter16.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter17.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter17.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter18.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter18.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter19.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter19.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter20.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter20.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter21.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter21.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter22.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter22.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter23.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter23.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter24.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter24.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter25.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter25.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter26.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter26.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter27.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter27.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter28.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter28.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter29.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter29.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter30.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter30.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter31.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter31.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter32.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter32.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter33.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter33.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter34.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter34.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter35.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter35.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter36.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter36.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter37.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter37.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter38.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter38.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter39.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter39.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter40.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter40.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter41.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter41.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter42.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter42.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter43.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter43.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter44.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter44.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter45.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter45.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter46.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter46.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter47.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter47.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter48.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter48.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter49.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter49.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter50.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter50.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter51.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter51.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter52.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter52.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter53.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter53.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter54.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter54.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter55.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter55.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter56.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter56.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter57.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter57.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter58.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter58.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter59.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter59.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter60.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter60.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter61.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter61.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter62.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter62.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter63.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter63.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter64.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter64.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter65.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter65.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter66.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter66.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter67.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter67.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter68.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter68.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter69.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter69.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter70.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter70.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter71.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter71.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter72.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter72.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter73.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter73.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter74.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter74.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter75.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter75.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter76.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter76.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter77.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter77.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter78.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter78.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter79.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter79.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter80.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter80.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter81.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter81.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter82.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter82.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter83.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter83.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter84.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter84.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter85.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter85.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter86.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter86.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter87.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter87.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter88.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter88.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter89.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter89.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter90.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter90.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter91.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter91.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter92.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter92.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter93.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter93.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter94.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter94.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter95.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter95.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter96.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter96.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter97.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter97.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter98.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter98.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter99.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter99.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Siprec/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          CallSid: Schema.String.check(
            Schema.isPattern(/^CA[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String,
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(Schema.Struct({ Status: SiprecEnumUpdateStatusSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Streams.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          CallSid: Schema.String.check(
            Schema.isPattern(/^CA[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          Url: Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
            description: 'Relative or absolute URL where WebSocket connection will be established.',
          }),
          Name: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'The user-specified name of this Stream, if one was given when the Stream was created. This can be used to stop the Stream.',
            }),
          ),
          Track: Schema.optionalKey(StreamEnumTrackSchema),
          StatusCallback: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description: 'Absolute URL to which Twilio sends status callback HTTP requests.',
            }),
          ),
          StatusCallbackMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method Twilio uses when sending `status_callback` requests. Possible values are `GET` and `POST`. Default is `POST`.',
            }),
          ),
          'Parameter1.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter1.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter2.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter2.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter3.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter3.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter4.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter4.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter5.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter5.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter6.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter6.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter7.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter7.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter8.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter8.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter9.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter9.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter10.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter10.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter11.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter11.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter12.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter12.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter13.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter13.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter14.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter14.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter15.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter15.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter16.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter16.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter17.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter17.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter18.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter18.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter19.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter19.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter20.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter20.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter21.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter21.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter22.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter22.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter23.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter23.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter24.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter24.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter25.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter25.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter26.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter26.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter27.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter27.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter28.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter28.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter29.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter29.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter30.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter30.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter31.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter31.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter32.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter32.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter33.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter33.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter34.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter34.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter35.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter35.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter36.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter36.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter37.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter37.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter38.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter38.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter39.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter39.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter40.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter40.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter41.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter41.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter42.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter42.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter43.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter43.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter44.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter44.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter45.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter45.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter46.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter46.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter47.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter47.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter48.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter48.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter49.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter49.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter50.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter50.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter51.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter51.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter52.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter52.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter53.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter53.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter54.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter54.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter55.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter55.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter56.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter56.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter57.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter57.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter58.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter58.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter59.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter59.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter60.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter60.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter61.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter61.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter62.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter62.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter63.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter63.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter64.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter64.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter65.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter65.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter66.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter66.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter67.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter67.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter68.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter68.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter69.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter69.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter70.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter70.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter71.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter71.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter72.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter72.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter73.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter73.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter74.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter74.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter75.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter75.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter76.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter76.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter77.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter77.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter78.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter78.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter79.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter79.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter80.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter80.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter81.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter81.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter82.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter82.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter83.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter83.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter84.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter84.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter85.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter85.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter86.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter86.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter87.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter87.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter88.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter88.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter89.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter89.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter90.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter90.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter91.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter91.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter92.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter92.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter93.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter93.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter94.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter94.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter95.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter95.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter96.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter96.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter97.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter97.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter98.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter98.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
          'Parameter99.Name': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter name' }),
          ),
          'Parameter99.Value': Schema.optionalKey(
            Schema.String.annotate({ description: 'Parameter value' }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Streams/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          CallSid: Schema.String.check(
            Schema.isPattern(/^CA[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String,
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(Schema.Struct({ Status: StreamEnumUpdateStatusSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Tokens.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          Ttl: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt())
              .annotate({
                description:
                  'The duration in seconds for which the generated credentials are valid. The default value is 86400 (24 hours).',
              }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Transcriptions/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^TR[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Transcriptions/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^TR[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Transcriptions.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Records.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          Category: Schema.optionalKey(Schema.String),
          StartDate: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
              ),
            ),
          ),
          EndDate: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
              ),
            ),
          ),
          IncludeSubaccounts: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/AllTime.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          Category: Schema.optionalKey(Schema.String),
          StartDate: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
              ),
            ),
          ),
          EndDate: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
              ),
            ),
          ),
          IncludeSubaccounts: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/Daily.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          Category: Schema.optionalKey(Schema.String),
          StartDate: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
              ),
            ),
          ),
          EndDate: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
              ),
            ),
          ),
          IncludeSubaccounts: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/LastMonth.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          Category: Schema.optionalKey(Schema.String),
          StartDate: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
              ),
            ),
          ),
          EndDate: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
              ),
            ),
          ),
          IncludeSubaccounts: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/Monthly.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          Category: Schema.optionalKey(Schema.String),
          StartDate: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
              ),
            ),
          ),
          EndDate: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
              ),
            ),
          ),
          IncludeSubaccounts: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/ThisMonth.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          Category: Schema.optionalKey(Schema.String),
          StartDate: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
              ),
            ),
          ),
          EndDate: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
              ),
            ),
          ),
          IncludeSubaccounts: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/Today.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          Category: Schema.optionalKey(Schema.String),
          StartDate: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
              ),
            ),
          ),
          EndDate: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
              ),
            ),
          ),
          IncludeSubaccounts: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/Yearly.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          Category: Schema.optionalKey(Schema.String),
          StartDate: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
              ),
            ),
          ),
          EndDate: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
              ),
            ),
          ),
          IncludeSubaccounts: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/Yesterday.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          Category: Schema.optionalKey(Schema.String),
          StartDate: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
              ),
            ),
          ),
          EndDate: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
              ),
            ),
          ),
          IncludeSubaccounts: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Triggers/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^UT[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Usage/Triggers/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^UT[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          CallbackMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method we should use to call `callback_url`. Can be: `GET` or `POST` and the default is `POST`.',
            }),
          ),
          CallbackUrl: Schema.optionalKey(
            Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
              description: 'The URL we should call using `callback_method` when the trigger fires.',
            }),
          ),
          FriendlyName: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Usage/Triggers/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^UT[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/2010-04-01/Accounts/:AccountSid/Usage/Triggers.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          Recurring: Schema.optionalKey(UsageTriggerEnumRecurringSchema),
          TriggerBy: Schema.optionalKey(UsageTriggerEnumTriggerFieldSchema),
          UsageCategory: Schema.optionalKey(Schema.String),
          PageSize: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(1000n),
            ),
          ),
          Page: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Usage/Triggers.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          CallbackUrl: Schema.String.check(
            Schema.makeFilter((input) => URL.canParse(input)),
          ).annotate({
            description: 'The URL we should call using `callback_method` when the trigger fires.',
          }),
          TriggerValue: Schema.String.annotate({
            description:
              'The usage value at which the trigger should fire.  For convenience, you can use an offset value such as `+30` to specify a trigger_value that is 30 units more than the current usage value. Be sure to urlencode a `+` as `%2B`.',
          }),
          UsageCategory: Schema.String.annotate({
            description:
              'The usage category that the trigger should watch.  Use one of the supported [usage categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories) for this value.',
          }),
          CallbackMethod: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method we should use to call `callback_url`. Can be: `GET` or `POST` and the default is `POST`.',
            }),
          ),
          FriendlyName: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
            }),
          ),
          Recurring: Schema.optionalKey(UsageTriggerEnumRecurringSchema),
          TriggerBy: Schema.optionalKey(UsageTriggerEnumTriggerFieldSchema),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/UserDefinedMessages.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          CallSid: Schema.String.check(
            Schema.isPattern(/^CA[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          Content: Schema.String.annotate({
            description: 'The User Defined Message in the form of URL-encoded JSON string.',
          }),
          IdempotencyKey: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'A unique string value to identify API call. This should be a unique string value per API call and can be a randomly generated.',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/UserDefinedMessageSubscriptions.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          CallSid: Schema.String.check(
            Schema.isPattern(/^CA[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          Callback: Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate(
            {
              description:
                'The URL we should call using the `method` to send user defined events to your application. URLs must contain a valid hostname (underscores are not permitted).',
            },
          ),
          IdempotencyKey: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'A unique string value to identify API call. This should be a unique string value per API call and can be a randomly generated.',
            }),
          ),
          Method: Schema.optionalKey(
            Schema.Literals(['GET', 'POST']).annotate({
              description:
                'The HTTP method Twilio will use when requesting the above `Url`. Either `GET` or `POST`. Default is `POST`.',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/UserDefinedMessageSubscriptions/:Sid.json',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          CallSid: Schema.String.check(
            Schema.isPattern(/^CA[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Sid: Schema.String.check(
            Schema.isPattern(/^ZY[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
