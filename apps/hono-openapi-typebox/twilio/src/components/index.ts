import { Type, type Static } from 'typebox'

export const AccountEnumStatusSchema = Type.Union(
  [Type.Literal('active'), Type.Literal('suspended'), Type.Literal('closed')],
  {
    ref: 'account_enum_status',
    description:
      'The status of this account. Usually `active`, but can be `suspended` or `closed`.',
  },
)

export type AccountEnumStatus = Static<typeof AccountEnumStatusSchema>

export const AccountEnumTypeSchema = Type.Union([Type.Literal('Trial'), Type.Literal('Full')], {
  ref: 'account_enum_type',
  description: "The type of this account. Either `Trial` or `Full` if it's been upgraded",
})

export type AccountEnumType = Static<typeof AccountEnumTypeSchema>

export const ApiV2010AccountSchema = Type.Object(
  {
    auth_token: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The authorization token for this account. This token should be kept a secret, so no sharing.',
        }),
        Type.Null(),
      ]),
    ),
    date_created: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The date that this account was created, in GMT in RFC 2822 format',
        }),
        Type.Null(),
      ]),
    ),
    date_updated: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The date that this account was last updated, in GMT in RFC 2822 format.',
        }),
        Type.Null(),
      ]),
    ),
    friendly_name: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'A human readable description of this account, up to 64 characters long. By default the FriendlyName is your email address.',
        }),
        Type.Null(),
      ]),
    ),
    owner_account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            "The unique 34 character id that represents the parent of this account. The OwnerAccountSid of a parent account is it's own sid.",
        }),
        Type.Null(),
      ]),
    ),
    sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'A 34 character string that uniquely identifies this resource.',
        }),
        Type.Null(),
      ]),
    ),
    status: Type.Optional(AccountEnumStatusSchema),
    subresource_uris: Type.Optional(
      Type.Union([
        Type.Object(
          {},
          { description: 'A Map of various subresources available for the given Account Instance' },
        ),
        Type.Null(),
      ]),
    ),
    type: Type.Optional(AccountEnumTypeSchema),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The URI for this resource, relative to `https://api.twilio.com`',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account' },
)

export type ApiV2010Account = Static<typeof ApiV2010AccountSchema>

export const ApiV2010AccountAddressSchema = Type.Object(
  {
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that is responsible for the Address resource.',
        }),
        Type.Null(),
      ]),
    ),
    city: Type.Optional(
      Type.Union([
        Type.String({ description: 'The city in which the address is located.' }),
        Type.Null(),
      ]),
    ),
    customer_name: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The name associated with the address.This property has a maximum length of 16 4-byte characters, or 21 3-byte characters.',
        }),
        Type.Null(),
      ]),
    ),
    date_created: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    date_updated: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    friendly_name: Type.Optional(
      Type.Union([
        Type.String({ description: 'The string that you assigned to describe the resource.' }),
        Type.Null(),
      ]),
    ),
    iso_country: Type.Optional(
      Type.Union([
        Type.String({ description: 'The ISO country code of the address.' }),
        Type.Null(),
      ]),
    ),
    postal_code: Type.Optional(
      Type.Union([Type.String({ description: 'The postal code of the address.' }), Type.Null()]),
    ),
    region: Type.Optional(
      Type.Union([
        Type.String({ description: 'The state or region of the address.' }),
        Type.Null(),
      ]),
    ),
    sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AD[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'The unique string that that we created to identify the Address resource.',
        }),
        Type.Null(),
      ]),
    ),
    street: Type.Optional(
      Type.Union([
        Type.String({ description: 'The number and street address of the address.' }),
        Type.Null(),
      ]),
    ),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The URI of the resource, relative to `https://api.twilio.com`.',
        }),
        Type.Null(),
      ]),
    ),
    emergency_enabled: Type.Optional(
      Type.Union([
        Type.Boolean({ description: 'Whether emergency calling has been enabled on this number.' }),
        Type.Null(),
      ]),
    ),
    validated: Type.Optional(
      Type.Union([
        Type.Boolean({
          description:
            "Whether the address has been validated to comply with local regulation. In countries that require valid addresses, an invalid address will not be accepted. `true` indicates the Address has been validated. `false` indicate the country doesn't require validation or the Address is not valid.",
        }),
        Type.Null(),
      ]),
    ),
    verified: Type.Optional(
      Type.Union([
        Type.Boolean({
          description:
            "Whether the address has been verified to comply with regulation. In countries that require valid addresses, an invalid address will not be accepted. `true` indicates the Address has been verified. `false` indicate the country doesn't require verified or the Address is not valid.",
        }),
        Type.Null(),
      ]),
    ),
    street_secondary: Type.Optional(
      Type.Union([
        Type.String({ description: 'The additional number and street address of the address.' }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.address' },
)

export type ApiV2010AccountAddress = Static<typeof ApiV2010AccountAddressSchema>

export const ApiV2010AccountApplicationSchema = Type.Object(
  {
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Application resource.',
        }),
        Type.Null(),
      ]),
    ),
    api_version: Type.Optional(
      Type.Union([
        Type.String({ description: 'The API version used to start a new TwiML session.' }),
        Type.Null(),
      ]),
    ),
    date_created: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    date_updated: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    friendly_name: Type.Optional(
      Type.Union([
        Type.String({ description: 'The string that you assigned to describe the resource.' }),
        Type.Null(),
      ]),
    ),
    message_status_callback: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          description:
            'The URL we call using a POST method to send message status information to your application.',
        }),
        Type.Null(),
      ]),
    ),
    sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AP[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The unique string that that we created to identify the Application resource.',
        }),
        Type.Null(),
      ]),
    ),
    sms_fallback_method: Type.Optional(
      Type.Union([
        Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
          description:
            'The HTTP method we use to call `sms_fallback_url`. Can be: `GET` or `POST`.',
        }),
        Type.Null(),
      ]),
    ),
    sms_fallback_url: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          description:
            'The URL that we call when an error occurs while retrieving or executing the TwiML from `sms_url`.',
        }),
        Type.Null(),
      ]),
    ),
    sms_method: Type.Optional(
      Type.Union([
        Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
          description: 'The HTTP method we use to call `sms_url`. Can be: `GET` or `POST`.',
        }),
        Type.Null(),
      ]),
    ),
    sms_status_callback: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          description:
            'The URL we call using a POST method to send status information to your application about SMS messages that refer to the application.',
        }),
        Type.Null(),
      ]),
    ),
    sms_url: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          description: 'The URL we call when the phone number receives an incoming SMS message.',
        }),
        Type.Null(),
      ]),
    ),
    status_callback: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          description:
            'The URL we call using the `status_callback_method` to send status information to your application.',
        }),
        Type.Null(),
      ]),
    ),
    status_callback_method: Type.Optional(
      Type.Union([
        Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
          description: 'The HTTP method we use to call `status_callback`. Can be: `GET` or `POST`.',
        }),
        Type.Null(),
      ]),
    ),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The URI of the resource, relative to `https://api.twilio.com`.',
        }),
        Type.Null(),
      ]),
    ),
    voice_caller_id_lookup: Type.Optional(
      Type.Union([
        Type.Boolean({
          description:
            "Whether we look up the caller's caller-ID name from the CNAM database (additional charges apply). Can be: `true` or `false`.",
        }),
        Type.Null(),
      ]),
    ),
    voice_fallback_method: Type.Optional(
      Type.Union([
        Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
          description:
            'The HTTP method we use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
        }),
        Type.Null(),
      ]),
    ),
    voice_fallback_url: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          description:
            'The URL that we call when an error occurs retrieving or executing the TwiML requested by `url`.',
        }),
        Type.Null(),
      ]),
    ),
    voice_method: Type.Optional(
      Type.Union([
        Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
          description: 'The HTTP method we use to call `voice_url`. Can be: `GET` or `POST`.',
        }),
        Type.Null(),
      ]),
    ),
    voice_url: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          description:
            'The URL we call when the phone number assigned to this application receives a call.',
        }),
        Type.Null(),
      ]),
    ),
    public_application_connect_enabled: Type.Optional(
      Type.Union([
        Type.Boolean({
          description:
            'Whether to allow other Twilio accounts to dial this applicaton using Dial verb. Can be: `true` or `false`.',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.application' },
)

export type ApiV2010AccountApplication = Static<typeof ApiV2010AccountApplicationSchema>

export const AuthorizedConnectAppEnumPermissionSchema = Type.Union(
  [Type.Literal('get-all'), Type.Literal('post-all')],
  {
    ref: 'authorized_connect_app_enum_permission',
    description:
      'The set of permissions that you authorized for the Connect App.  Can be: `get-all` or `post-all`.',
  },
)

export type AuthorizedConnectAppEnumPermission = Static<
  typeof AuthorizedConnectAppEnumPermissionSchema
>

export const ApiV2010AccountAuthorizedConnectAppSchema = Type.Object(
  {
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the AuthorizedConnectApp resource.',
        }),
        Type.Null(),
      ]),
    ),
    connect_app_company_name: Type.Optional(
      Type.Union([
        Type.String({ description: 'The company name set for the Connect App.' }),
        Type.Null(),
      ]),
    ),
    connect_app_description: Type.Optional(
      Type.Union([
        Type.String({ description: 'A detailed description of the Connect App.' }),
        Type.Null(),
      ]),
    ),
    connect_app_friendly_name: Type.Optional(
      Type.Union([Type.String({ description: 'The name of the Connect App.' }), Type.Null()]),
    ),
    connect_app_homepage_url: Type.Optional(
      Type.Union([
        Type.String({ format: 'uri', description: 'The public URL for the Connect App.' }),
        Type.Null(),
      ]),
    ),
    connect_app_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^CN[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'The SID that we assigned to the Connect App.',
        }),
        Type.Null(),
      ]),
    ),
    permissions: Type.Optional(
      Type.Union([
        Type.Array(AuthorizedConnectAppEnumPermissionSchema, {
          description:
            'The set of permissions that you authorized for the Connect App.  Can be: `get-all` or `post-all`.',
        }),
        Type.Null(),
      ]),
    ),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The URI of the resource, relative to `https://api.twilio.com`.',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.authorized_connect_app' },
)

export type ApiV2010AccountAuthorizedConnectApp = Static<
  typeof ApiV2010AccountAuthorizedConnectAppSchema
>

export const ApiV2010AccountAvailablePhoneNumberCountrySchema = Type.Object(
  {
    country_code: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The [ISO-3166-1](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code of the country.',
        }),
        Type.Null(),
      ]),
    ),
    country: Type.Optional(
      Type.Union([Type.String({ description: 'The name of the country.' }), Type.Null()]),
    ),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          description: 'The URI of the Country resource, relative to `https://api.twilio.com`.',
        }),
        Type.Null(),
      ]),
    ),
    beta: Type.Optional(
      Type.Union([
        Type.Boolean({
          description:
            'Whether all phone numbers available in the country are new to the Twilio platform. `true` if they are and `false` if all numbers are not in the Twilio Phone Number Beta program.',
        }),
        Type.Null(),
      ]),
    ),
    subresource_uris: Type.Optional(
      Type.Union([
        Type.Object(
          {},
          {
            description:
              'A list of related AvailablePhoneNumber resources identified by their URIs relative to `https://api.twilio.com`.',
          },
        ),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.available_phone_number_country' },
)

export type ApiV2010AccountAvailablePhoneNumberCountry = Static<
  typeof ApiV2010AccountAvailablePhoneNumberCountrySchema
>

export const ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberLocalSchema =
  Type.Object(
    {
      friendly_name: Type.Optional(
        Type.Union([
          Type.String({ description: 'A formatted version of the phone number.' }),
          Type.Null(),
        ]),
      ),
      phone_number: Type.Optional(
        Type.Union([
          Type.String({
            description:
              'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
          }),
          Type.Null(),
        ]),
      ),
      lata: Type.Optional(
        Type.Union([
          Type.String({
            description:
              'The [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) of this phone number. Available for only phone numbers from the US and Canada.',
          }),
          Type.Null(),
        ]),
      ),
      locality: Type.Optional(
        Type.Union([
          Type.String({ description: "The locality or city of this phone number's location." }),
          Type.Null(),
        ]),
      ),
      rate_center: Type.Optional(
        Type.Union([
          Type.String({
            description:
              'The [rate center](https://en.wikipedia.org/wiki/Telephone_exchange) of this phone number. Available for only phone numbers from the US and Canada.',
          }),
          Type.Null(),
        ]),
      ),
      latitude: Type.Optional(
        Type.Union([
          Type.Number({
            description:
              "The latitude of this phone number's location. Available for only phone numbers from the US and Canada.",
          }),
          Type.Null(),
        ]),
      ),
      longitude: Type.Optional(
        Type.Union([
          Type.Number({
            description:
              "The longitude of this phone number's location. Available for only phone numbers from the US and Canada.",
          }),
          Type.Null(),
        ]),
      ),
      region: Type.Optional(
        Type.Union([
          Type.String({
            description:
              "The two-letter state or province abbreviation of this phone number's location. Available for only phone numbers from the US and Canada.",
          }),
          Type.Null(),
        ]),
      ),
      postal_code: Type.Optional(
        Type.Union([
          Type.String({
            description:
              "The postal or ZIP code of this phone number's location. Available for only phone numbers from the US and Canada.",
          }),
          Type.Null(),
        ]),
      ),
      iso_country: Type.Optional(
        Type.Union([
          Type.String({
            description:
              'The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of this phone number.',
          }),
          Type.Null(),
        ]),
      ),
      address_requirements: Type.Optional(
        Type.Union([
          Type.String({
            description:
              "The type of [Address](https://www.twilio.com/docs/usage/api/address) resource the phone number requires. Can be: `none`, `any`, `local`, or `foreign`. `none` means no address is required. `any` means an address is required, but it can be anywhere in the world. `local` means an address in the phone number's country is required. `foreign` means an address outside of the phone number's country is required.",
          }),
          Type.Null(),
        ]),
      ),
      beta: Type.Optional(
        Type.Union([
          Type.Boolean({
            description:
              'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
          }),
          Type.Null(),
        ]),
      ),
      capabilities: Type.Optional(
        Type.Union([
          Type.Object(
            {
              mms: Type.Optional(Type.Boolean()),
              sms: Type.Optional(Type.Boolean()),
              voice: Type.Optional(Type.Boolean()),
              fax: Type.Optional(Type.Boolean()),
            },
            {
              description:
                'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are: `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
            },
          ),
          Type.Null(),
        ]),
      ),
    },
    { ref: 'api.v2010.account.available_phone_number_country.available_phone_number_local' },
  )

export type ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberLocal = Static<
  typeof ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberLocalSchema
>

export const ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMachineToMachineSchema =
  Type.Object(
    {
      friendly_name: Type.Optional(
        Type.Union([
          Type.String({ description: 'A formatted version of the phone number.' }),
          Type.Null(),
        ]),
      ),
      phone_number: Type.Optional(
        Type.Union([
          Type.String({
            description:
              'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
          }),
          Type.Null(),
        ]),
      ),
      lata: Type.Optional(
        Type.Union([
          Type.String({
            description:
              'The [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) of this phone number. Available for only phone numbers from the US and Canada.',
          }),
          Type.Null(),
        ]),
      ),
      locality: Type.Optional(
        Type.Union([
          Type.String({ description: "The locality or city of this phone number's location." }),
          Type.Null(),
        ]),
      ),
      rate_center: Type.Optional(
        Type.Union([
          Type.String({
            description:
              'The [rate center](https://en.wikipedia.org/wiki/Telephone_exchange) of this phone number. Available for only phone numbers from the US and Canada.',
          }),
          Type.Null(),
        ]),
      ),
      latitude: Type.Optional(
        Type.Union([
          Type.Number({
            description:
              "The latitude of this phone number's location. Available for only phone numbers from the US and Canada.",
          }),
          Type.Null(),
        ]),
      ),
      longitude: Type.Optional(
        Type.Union([
          Type.Number({
            description:
              "The longitude of this phone number's location. Available for only phone numbers from the US and Canada.",
          }),
          Type.Null(),
        ]),
      ),
      region: Type.Optional(
        Type.Union([
          Type.String({
            description:
              "The two-letter state or province abbreviation of this phone number's location. Available for only phone numbers from the US and Canada.",
          }),
          Type.Null(),
        ]),
      ),
      postal_code: Type.Optional(
        Type.Union([
          Type.String({
            description:
              "The postal or ZIP code of this phone number's location. Available for only phone numbers from the US and Canada.",
          }),
          Type.Null(),
        ]),
      ),
      iso_country: Type.Optional(
        Type.Union([
          Type.String({
            description:
              'The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of this phone number.',
          }),
          Type.Null(),
        ]),
      ),
      address_requirements: Type.Optional(
        Type.Union([
          Type.String({
            description:
              "The type of [Address](https://www.twilio.com/docs/usage/api/address) resource the phone number requires. Can be: `none`, `any`, `local`, or `foreign`. `none` means no address is required. `any` means an address is required, but it can be anywhere in the world. `local` means an address in the phone number's country is required. `foreign` means an address outside of the phone number's country is required.",
          }),
          Type.Null(),
        ]),
      ),
      beta: Type.Optional(
        Type.Union([
          Type.Boolean({
            description:
              'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
          }),
          Type.Null(),
        ]),
      ),
      capabilities: Type.Optional(
        Type.Union([
          Type.Object(
            {
              mms: Type.Optional(Type.Boolean()),
              sms: Type.Optional(Type.Boolean()),
              voice: Type.Optional(Type.Boolean()),
              fax: Type.Optional(Type.Boolean()),
            },
            {
              description:
                'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are: `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
            },
          ),
          Type.Null(),
        ]),
      ),
    },
    {
      ref: 'api.v2010.account.available_phone_number_country.available_phone_number_machine_to_machine',
    },
  )

export type ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMachineToMachine = Static<
  typeof ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMachineToMachineSchema
>

export const ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMobileSchema =
  Type.Object(
    {
      friendly_name: Type.Optional(
        Type.Union([
          Type.String({ description: 'A formatted version of the phone number.' }),
          Type.Null(),
        ]),
      ),
      phone_number: Type.Optional(
        Type.Union([
          Type.String({
            description:
              'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
          }),
          Type.Null(),
        ]),
      ),
      lata: Type.Optional(
        Type.Union([
          Type.String({
            description:
              'The [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) of this phone number. Available for only phone numbers from the US and Canada.',
          }),
          Type.Null(),
        ]),
      ),
      locality: Type.Optional(
        Type.Union([
          Type.String({ description: "The locality or city of this phone number's location." }),
          Type.Null(),
        ]),
      ),
      rate_center: Type.Optional(
        Type.Union([
          Type.String({
            description:
              'The [rate center](https://en.wikipedia.org/wiki/Telephone_exchange) of this phone number. Available for only phone numbers from the US and Canada.',
          }),
          Type.Null(),
        ]),
      ),
      latitude: Type.Optional(
        Type.Union([
          Type.Number({
            description:
              "The latitude of this phone number's location. Available for only phone numbers from the US and Canada.",
          }),
          Type.Null(),
        ]),
      ),
      longitude: Type.Optional(
        Type.Union([
          Type.Number({
            description:
              "The longitude of this phone number's location. Available for only phone numbers from the US and Canada.",
          }),
          Type.Null(),
        ]),
      ),
      region: Type.Optional(
        Type.Union([
          Type.String({
            description:
              "The two-letter state or province abbreviation of this phone number's location. Available for only phone numbers from the US and Canada.",
          }),
          Type.Null(),
        ]),
      ),
      postal_code: Type.Optional(
        Type.Union([
          Type.String({
            description:
              "The postal or ZIP code of this phone number's location. Available for only phone numbers from the US and Canada.",
          }),
          Type.Null(),
        ]),
      ),
      iso_country: Type.Optional(
        Type.Union([
          Type.String({
            description:
              'The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of this phone number.',
          }),
          Type.Null(),
        ]),
      ),
      address_requirements: Type.Optional(
        Type.Union([
          Type.String({
            description:
              "The type of [Address](https://www.twilio.com/docs/usage/api/address) resource the phone number requires. Can be: `none`, `any`, `local`, or `foreign`. `none` means no address is required. `any` means an address is required, but it can be anywhere in the world. `local` means an address in the phone number's country is required. `foreign` means an address outside of the phone number's country is required.",
          }),
          Type.Null(),
        ]),
      ),
      beta: Type.Optional(
        Type.Union([
          Type.Boolean({
            description:
              'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
          }),
          Type.Null(),
        ]),
      ),
      capabilities: Type.Optional(
        Type.Union([
          Type.Object(
            {
              mms: Type.Optional(Type.Boolean()),
              sms: Type.Optional(Type.Boolean()),
              voice: Type.Optional(Type.Boolean()),
              fax: Type.Optional(Type.Boolean()),
            },
            {
              description:
                'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are: `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
            },
          ),
          Type.Null(),
        ]),
      ),
    },
    { ref: 'api.v2010.account.available_phone_number_country.available_phone_number_mobile' },
  )

export type ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMobile = Static<
  typeof ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMobileSchema
>

export const ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberNationalSchema =
  Type.Object(
    {
      friendly_name: Type.Optional(
        Type.Union([
          Type.String({ description: 'A formatted version of the phone number.' }),
          Type.Null(),
        ]),
      ),
      phone_number: Type.Optional(
        Type.Union([
          Type.String({
            description:
              'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
          }),
          Type.Null(),
        ]),
      ),
      lata: Type.Optional(
        Type.Union([
          Type.String({
            description:
              'The [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) of this phone number. Available for only phone numbers from the US and Canada.',
          }),
          Type.Null(),
        ]),
      ),
      locality: Type.Optional(
        Type.Union([
          Type.String({ description: "The locality or city of this phone number's location." }),
          Type.Null(),
        ]),
      ),
      rate_center: Type.Optional(
        Type.Union([
          Type.String({
            description:
              'The [rate center](https://en.wikipedia.org/wiki/Telephone_exchange) of this phone number. Available for only phone numbers from the US and Canada.',
          }),
          Type.Null(),
        ]),
      ),
      latitude: Type.Optional(
        Type.Union([
          Type.Number({
            description:
              "The latitude of this phone number's location. Available for only phone numbers from the US and Canada.",
          }),
          Type.Null(),
        ]),
      ),
      longitude: Type.Optional(
        Type.Union([
          Type.Number({
            description:
              "The longitude of this phone number's location. Available for only phone numbers from the US and Canada.",
          }),
          Type.Null(),
        ]),
      ),
      region: Type.Optional(
        Type.Union([
          Type.String({
            description:
              "The two-letter state or province abbreviation of this phone number's location. Available for only phone numbers from the US and Canada.",
          }),
          Type.Null(),
        ]),
      ),
      postal_code: Type.Optional(
        Type.Union([
          Type.String({
            description:
              "The postal or ZIP code of this phone number's location. Available for only phone numbers from the US and Canada.",
          }),
          Type.Null(),
        ]),
      ),
      iso_country: Type.Optional(
        Type.Union([
          Type.String({
            description:
              'The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of this phone number.',
          }),
          Type.Null(),
        ]),
      ),
      address_requirements: Type.Optional(
        Type.Union([
          Type.String({
            description:
              "The type of [Address](https://www.twilio.com/docs/usage/api/address) resource the phone number requires. Can be: `none`, `any`, `local`, or `foreign`. `none` means no address is required. `any` means an address is required, but it can be anywhere in the world. `local` means an address in the phone number's country is required. `foreign` means an address outside of the phone number's country is required.",
          }),
          Type.Null(),
        ]),
      ),
      beta: Type.Optional(
        Type.Union([
          Type.Boolean({
            description:
              'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
          }),
          Type.Null(),
        ]),
      ),
      capabilities: Type.Optional(
        Type.Union([
          Type.Object(
            {
              mms: Type.Optional(Type.Boolean()),
              sms: Type.Optional(Type.Boolean()),
              voice: Type.Optional(Type.Boolean()),
              fax: Type.Optional(Type.Boolean()),
            },
            {
              description:
                'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are: `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
            },
          ),
          Type.Null(),
        ]),
      ),
    },
    { ref: 'api.v2010.account.available_phone_number_country.available_phone_number_national' },
  )

export type ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberNational = Static<
  typeof ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberNationalSchema
>

export const ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberSharedCostSchema =
  Type.Object(
    {
      friendly_name: Type.Optional(
        Type.Union([
          Type.String({ description: 'A formatted version of the phone number.' }),
          Type.Null(),
        ]),
      ),
      phone_number: Type.Optional(
        Type.Union([
          Type.String({
            description:
              'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
          }),
          Type.Null(),
        ]),
      ),
      lata: Type.Optional(
        Type.Union([
          Type.String({
            description:
              'The [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) of this phone number. Available for only phone numbers from the US and Canada.',
          }),
          Type.Null(),
        ]),
      ),
      locality: Type.Optional(
        Type.Union([
          Type.String({ description: "The locality or city of this phone number's location." }),
          Type.Null(),
        ]),
      ),
      rate_center: Type.Optional(
        Type.Union([
          Type.String({
            description:
              'The [rate center](https://en.wikipedia.org/wiki/Telephone_exchange) of this phone number. Available for only phone numbers from the US and Canada.',
          }),
          Type.Null(),
        ]),
      ),
      latitude: Type.Optional(
        Type.Union([
          Type.Number({
            description:
              "The latitude of this phone number's location. Available for only phone numbers from the US and Canada.",
          }),
          Type.Null(),
        ]),
      ),
      longitude: Type.Optional(
        Type.Union([
          Type.Number({
            description:
              "The longitude of this phone number's location. Available for only phone numbers from the US and Canada.",
          }),
          Type.Null(),
        ]),
      ),
      region: Type.Optional(
        Type.Union([
          Type.String({
            description:
              "The two-letter state or province abbreviation of this phone number's location. Available for only phone numbers from the US and Canada.",
          }),
          Type.Null(),
        ]),
      ),
      postal_code: Type.Optional(
        Type.Union([
          Type.String({
            description:
              "The postal or ZIP code of this phone number's location. Available for only phone numbers from the US and Canada.",
          }),
          Type.Null(),
        ]),
      ),
      iso_country: Type.Optional(
        Type.Union([
          Type.String({
            description:
              'The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of this phone number.',
          }),
          Type.Null(),
        ]),
      ),
      address_requirements: Type.Optional(
        Type.Union([
          Type.String({
            description:
              "The type of [Address](https://www.twilio.com/docs/usage/api/address) resource the phone number requires. Can be: `none`, `any`, `local`, or `foreign`. `none` means no address is required. `any` means an address is required, but it can be anywhere in the world. `local` means an address in the phone number's country is required. `foreign` means an address outside of the phone number's country is required.",
          }),
          Type.Null(),
        ]),
      ),
      beta: Type.Optional(
        Type.Union([
          Type.Boolean({
            description:
              'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
          }),
          Type.Null(),
        ]),
      ),
      capabilities: Type.Optional(
        Type.Union([
          Type.Object(
            {
              mms: Type.Optional(Type.Boolean()),
              sms: Type.Optional(Type.Boolean()),
              voice: Type.Optional(Type.Boolean()),
              fax: Type.Optional(Type.Boolean()),
            },
            {
              description:
                'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are: `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
            },
          ),
          Type.Null(),
        ]),
      ),
    },
    { ref: 'api.v2010.account.available_phone_number_country.available_phone_number_shared_cost' },
  )

export type ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberSharedCost = Static<
  typeof ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberSharedCostSchema
>

export const ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberTollFreeSchema =
  Type.Object(
    {
      friendly_name: Type.Optional(
        Type.Union([
          Type.String({ description: 'A formatted version of the phone number.' }),
          Type.Null(),
        ]),
      ),
      phone_number: Type.Optional(
        Type.Union([
          Type.String({
            description:
              'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
          }),
          Type.Null(),
        ]),
      ),
      lata: Type.Optional(
        Type.Union([
          Type.String({
            description:
              'The [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) of this phone number. Available for only phone numbers from the US and Canada.',
          }),
          Type.Null(),
        ]),
      ),
      locality: Type.Optional(
        Type.Union([
          Type.String({ description: "The locality or city of this phone number's location." }),
          Type.Null(),
        ]),
      ),
      rate_center: Type.Optional(
        Type.Union([
          Type.String({
            description:
              'The [rate center](https://en.wikipedia.org/wiki/Telephone_exchange) of this phone number. Available for only phone numbers from the US and Canada.',
          }),
          Type.Null(),
        ]),
      ),
      latitude: Type.Optional(
        Type.Union([
          Type.Number({
            description:
              "The latitude of this phone number's location. Available for only phone numbers from the US and Canada.",
          }),
          Type.Null(),
        ]),
      ),
      longitude: Type.Optional(
        Type.Union([
          Type.Number({
            description:
              "The longitude of this phone number's location. Available for only phone numbers from the US and Canada.",
          }),
          Type.Null(),
        ]),
      ),
      region: Type.Optional(
        Type.Union([
          Type.String({
            description:
              "The two-letter state or province abbreviation of this phone number's location. Available for only phone numbers from the US and Canada.",
          }),
          Type.Null(),
        ]),
      ),
      postal_code: Type.Optional(
        Type.Union([
          Type.String({
            description:
              "The postal or ZIP code of this phone number's location. Available for only phone numbers from the US and Canada.",
          }),
          Type.Null(),
        ]),
      ),
      iso_country: Type.Optional(
        Type.Union([
          Type.String({
            description:
              'The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of this phone number.',
          }),
          Type.Null(),
        ]),
      ),
      address_requirements: Type.Optional(
        Type.Union([
          Type.String({
            description:
              "The type of [Address](https://www.twilio.com/docs/usage/api/address) resource the phone number requires. Can be: `none`, `any`, `local`, or `foreign`. `none` means no address is required. `any` means an address is required, but it can be anywhere in the world. `local` means an address in the phone number's country is required. `foreign` means an address outside of the phone number's country is required.",
          }),
          Type.Null(),
        ]),
      ),
      beta: Type.Optional(
        Type.Union([
          Type.Boolean({
            description:
              'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
          }),
          Type.Null(),
        ]),
      ),
      capabilities: Type.Optional(
        Type.Union([
          Type.Object(
            {
              mms: Type.Optional(Type.Boolean()),
              sms: Type.Optional(Type.Boolean()),
              voice: Type.Optional(Type.Boolean()),
              fax: Type.Optional(Type.Boolean()),
            },
            {
              description:
                'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are: `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
            },
          ),
          Type.Null(),
        ]),
      ),
    },
    { ref: 'api.v2010.account.available_phone_number_country.available_phone_number_toll_free' },
  )

export type ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberTollFree = Static<
  typeof ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberTollFreeSchema
>

export const ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberVoipSchema = Type.Object(
  {
    friendly_name: Type.Optional(
      Type.Union([
        Type.String({ description: 'A formatted version of the phone number.' }),
        Type.Null(),
      ]),
    ),
    phone_number: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
        }),
        Type.Null(),
      ]),
    ),
    lata: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) of this phone number. Available for only phone numbers from the US and Canada.',
        }),
        Type.Null(),
      ]),
    ),
    locality: Type.Optional(
      Type.Union([
        Type.String({ description: "The locality or city of this phone number's location." }),
        Type.Null(),
      ]),
    ),
    rate_center: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The [rate center](https://en.wikipedia.org/wiki/Telephone_exchange) of this phone number. Available for only phone numbers from the US and Canada.',
        }),
        Type.Null(),
      ]),
    ),
    latitude: Type.Optional(
      Type.Union([
        Type.Number({
          description:
            "The latitude of this phone number's location. Available for only phone numbers from the US and Canada.",
        }),
        Type.Null(),
      ]),
    ),
    longitude: Type.Optional(
      Type.Union([
        Type.Number({
          description:
            "The longitude of this phone number's location. Available for only phone numbers from the US and Canada.",
        }),
        Type.Null(),
      ]),
    ),
    region: Type.Optional(
      Type.Union([
        Type.String({
          description:
            "The two-letter state or province abbreviation of this phone number's location. Available for only phone numbers from the US and Canada.",
        }),
        Type.Null(),
      ]),
    ),
    postal_code: Type.Optional(
      Type.Union([
        Type.String({
          description:
            "The postal or ZIP code of this phone number's location. Available for only phone numbers from the US and Canada.",
        }),
        Type.Null(),
      ]),
    ),
    iso_country: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of this phone number.',
        }),
        Type.Null(),
      ]),
    ),
    address_requirements: Type.Optional(
      Type.Union([
        Type.String({
          description:
            "The type of [Address](https://www.twilio.com/docs/usage/api/address) resource the phone number requires. Can be: `none`, `any`, `local`, or `foreign`. `none` means no address is required. `any` means an address is required, but it can be anywhere in the world. `local` means an address in the phone number's country is required. `foreign` means an address outside of the phone number's country is required.",
        }),
        Type.Null(),
      ]),
    ),
    beta: Type.Optional(
      Type.Union([
        Type.Boolean({
          description:
            'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
        }),
        Type.Null(),
      ]),
    ),
    capabilities: Type.Optional(
      Type.Union([
        Type.Object(
          {
            mms: Type.Optional(Type.Boolean()),
            sms: Type.Optional(Type.Boolean()),
            voice: Type.Optional(Type.Boolean()),
            fax: Type.Optional(Type.Boolean()),
          },
          {
            description:
              'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are: `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
          },
        ),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.available_phone_number_country.available_phone_number_voip' },
)

export type ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberVoip = Static<
  typeof ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberVoipSchema
>

export const ApiV2010AccountBalanceSchema = Type.Object(
  {
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'The unique SID identifier of the Account.',
        }),
        Type.Null(),
      ]),
    ),
    balance: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The balance of the Account, in units specified by the unit parameter. Balance changes may not be reflected immediately. Child accounts do not contain balance information',
        }),
        Type.Null(),
      ]),
    ),
    currency: Type.Optional(
      Type.Union([
        Type.String({ description: 'The units of currency for the account balance' }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.balance' },
)

export type ApiV2010AccountBalance = Static<typeof ApiV2010AccountBalanceSchema>

export const CallEnumStatusSchema = Type.Union(
  [
    Type.Literal('queued'),
    Type.Literal('ringing'),
    Type.Literal('in-progress'),
    Type.Literal('completed'),
    Type.Literal('busy'),
    Type.Literal('failed'),
    Type.Literal('no-answer'),
    Type.Literal('canceled'),
  ],
  {
    ref: 'call_enum_status',
    description:
      'The status of this call. Can be: `queued`, `ringing`, `in-progress`, `canceled`, `completed`, `failed`, `busy` or `no-answer`. See [Call Status Values](https://www.twilio.com/docs/voice/api/call-resource#call-status-values) below for more information.',
  },
)

export type CallEnumStatus = Static<typeof CallEnumStatusSchema>

export const ApiV2010AccountCallSchema = Type.Object(
  {
    sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^CA[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'The unique string that we created to identify this Call resource.',
        }),
        Type.Null(),
      ]),
    ),
    date_created: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in UTC that this resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    date_updated: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in UTC that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    parent_call_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^CA[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'The SID that identifies the call that created this leg.',
        }),
        Type.Null(),
      ]),
    ),
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Call resource.',
        }),
        Type.Null(),
      ]),
    ),
    to: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The phone number, SIP address, Client identifier or SIM SID that received this call. Phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +16175551212). SIP addresses are formatted as `name@company.com`. Client identifiers are formatted `client:name`. SIM SIDs are formatted as `sim:sid`.',
        }),
        Type.Null(),
      ]),
    ),
    to_formatted: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The phone number, SIP address or Client identifier that received this call. Formatted for display. Non-North American phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +442071838750).',
        }),
        Type.Null(),
      ]),
    ),
    from: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The phone number, SIP address, Client identifier or SIM SID that made this call. Phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +16175551212). SIP addresses are formatted as `name@company.com`. Client identifiers are formatted `client:name`. SIM SIDs are formatted as `sim:sid`.',
        }),
        Type.Null(),
      ]),
    ),
    from_formatted: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The calling phone number, SIP address, or Client identifier formatted for display. Non-North American phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +442071838750).',
        }),
        Type.Null(),
      ]),
    ),
    phone_number_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^PN[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'If the call was inbound, this is the SID of the IncomingPhoneNumber resource that received the call. If the call was outbound, it is the SID of the OutgoingCallerId resource from which the call was placed.',
        }),
        Type.Null(),
      ]),
    ),
    status: Type.Optional(CallEnumStatusSchema),
    start_time: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The start time of the call, given as UTC in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format. Empty if the call has not yet been dialed.',
        }),
        Type.Null(),
      ]),
    ),
    end_time: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The time the call ended, given as UTC in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format. Empty if the call did not complete successfully.',
        }),
        Type.Null(),
      ]),
    ),
    duration: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The length of the call in seconds. This value is empty for busy, failed, unanswered, or ongoing calls.',
        }),
        Type.Null(),
      ]),
    ),
    price: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The charge for this call, in the currency associated with the account. Populated after the call is completed. May not be immediately available. The price associated with a call only reflects the charge for connectivity.  Charges for other call-related features such as Answering Machine Detection, Text-To-Speech, and SIP REFER are not included in this value.',
        }),
        Type.Null(),
      ]),
    ),
    price_unit: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The currency in which `Price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format (e.g., `USD`, `EUR`, `JPY`). Always capitalized for calls.',
        }),
        Type.Null(),
      ]),
    ),
    direction: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'A string describing the direction of the call. Can be: `inbound` for inbound calls, `outbound-api` for calls initiated via the REST API or `outbound-dial` for calls initiated by a `<Dial>` verb. Using [Elastic SIP Trunking](https://www.twilio.com/docs/sip-trunking), the values can be [`trunking-terminating`](https://www.twilio.com/docs/sip-trunking#termination) for outgoing calls from your communications infrastructure to the PSTN or [`trunking-originating`](https://www.twilio.com/docs/sip-trunking#origination) for incoming calls to your communications infrastructure from the PSTN.',
        }),
        Type.Null(),
      ]),
    ),
    answered_by: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'Either `human` or `machine` if this call was initiated with answering machine detection. Empty otherwise.',
        }),
        Type.Null(),
      ]),
    ),
    api_version: Type.Optional(
      Type.Union([
        Type.String({ description: 'The API version used to create the call.' }),
        Type.Null(),
      ]),
    ),
    forwarded_from: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The forwarding phone number if this call was an incoming call forwarded from another number (depends on carrier supporting forwarding). Otherwise, empty.',
        }),
        Type.Null(),
      ]),
    ),
    group_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^GP[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The Group SID associated with this call. If no Group is associated with the call, the field is empty.',
        }),
        Type.Null(),
      ]),
    ),
    caller_name: Type.Optional(
      Type.Union([
        Type.String({
          description:
            "The caller's name if this call was an incoming call to a phone number with caller ID Lookup enabled. Otherwise, empty.",
        }),
        Type.Null(),
      ]),
    ),
    queue_time: Type.Optional(
      Type.Union([
        Type.String({ description: 'The wait time in milliseconds before the call is placed.' }),
        Type.Null(),
      ]),
    ),
    stir_verstat: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The STIR/SHAKEN verification status of the call, for example `TN-Validation-Passed-A`. Empty if the incoming call had no STIR/SHAKEN information.',
        }),
        Type.Null(),
      ]),
    ),
    trunk_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^TK[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The unique identifier of the trunk resource that was used for this call. The field is empty if the call was not made using a SIP trunk or if the call is not terminated.',
        }),
        Type.Null(),
      ]),
    ),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The URI of this resource, relative to `https://api.twilio.com`.',
        }),
        Type.Null(),
      ]),
    ),
    subresource_uris: Type.Optional(
      Type.Union([
        Type.Object(
          {},
          {
            description:
              'A list of subresources available to this call, identified by their URIs relative to `https://api.twilio.com`.',
          },
        ),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.call' },
)

export type ApiV2010AccountCall = Static<typeof ApiV2010AccountCallSchema>

export const CallEnumEventSchema = Type.Union(
  [
    Type.Literal('initiated'),
    Type.Literal('ringing'),
    Type.Literal('answered'),
    Type.Literal('completed'),
  ],
  { ref: 'call_enum_event' },
)

export type CallEnumEvent = Static<typeof CallEnumEventSchema>

export const CallEnumUpdateStatusSchema = Type.Union(
  [Type.Literal('canceled'), Type.Literal('completed')],
  { ref: 'call_enum_update_status' },
)

export type CallEnumUpdateStatus = Static<typeof CallEnumUpdateStatusSchema>

export const ApiV2010AccountCallCallEventSchema = Type.Object(
  {
    request: Type.Optional(
      Type.Union([
        Type.Any({ description: 'Contains a dictionary representing the request of the call.' }),
        Type.Null(),
      ]),
    ),
    response: Type.Optional(
      Type.Union([
        Type.Any({
          description:
            'Contains a dictionary representing the call response, including a list of the call events.',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.call.call_event' },
)

export type ApiV2010AccountCallCallEvent = Static<typeof ApiV2010AccountCallCallEventSchema>

export const ApiV2010AccountCallCallNotificationSchema = Type.Object(
  {
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Call Notification resource.',
        }),
        Type.Null(),
      ]),
    ),
    api_version: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The API version used to create the Call Notification resource.',
        }),
        Type.Null(),
      ]),
    ),
    call_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^CA[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Call Notification resource is associated with.',
        }),
        Type.Null(),
      ]),
    ),
    date_created: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    date_updated: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    error_code: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'A unique error code for the error condition that is described in our [Error Dictionary](https://www.twilio.com/docs/api/errors).',
        }),
        Type.Null(),
      ]),
    ),
    log: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'An integer log level that corresponds to the type of notification: `0` is ERROR, `1` is WARNING.',
        }),
        Type.Null(),
      ]),
    ),
    message_date: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date the notification was actually generated in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. Message buffering can cause this value to differ from `date_created`.',
        }),
        Type.Null(),
      ]),
    ),
    message_text: Type.Optional(
      Type.Union([Type.String({ description: 'The text of the notification.' }), Type.Null()]),
    ),
    more_info: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          description:
            'The URL for more information about the error condition. This value is a page in our [Error Dictionary](https://www.twilio.com/docs/api/errors).',
        }),
        Type.Null(),
      ]),
    ),
    request_method: Type.Optional(
      Type.Union([
        Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
          description:
            'The HTTP method used to generate the notification. If the notification was generated during a phone call, this is the HTTP Method used to request the resource on your server. If the notification was generated by your use of our REST API, this is the HTTP method used to call the resource on our servers.',
        }),
        Type.Null(),
      ]),
    ),
    request_url: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          description:
            'The URL of the resource that generated the notification. If the notification was generated during a phone call, this is the URL of the resource on your server that caused the notification. If the notification was generated by your use of our REST API, this is the URL of the resource you called.',
        }),
        Type.Null(),
      ]),
    ),
    sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^NO[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The unique string that that we created to identify the Call Notification resource.',
        }),
        Type.Null(),
      ]),
    ),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The URI of the resource, relative to `https://api.twilio.com`.',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.call.call_notification' },
)

export type ApiV2010AccountCallCallNotification = Static<
  typeof ApiV2010AccountCallCallNotificationSchema
>

export const ApiV2010AccountCallCallNotificationInstanceSchema = Type.Object(
  {
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Call Notification resource.',
        }),
        Type.Null(),
      ]),
    ),
    api_version: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The API version used to create the Call Notification resource.',
        }),
        Type.Null(),
      ]),
    ),
    call_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^CA[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Call Notification resource is associated with.',
        }),
        Type.Null(),
      ]),
    ),
    date_created: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    date_updated: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    error_code: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'A unique error code for the error condition that is described in our [Error Dictionary](https://www.twilio.com/docs/api/errors).',
        }),
        Type.Null(),
      ]),
    ),
    log: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'An integer log level that corresponds to the type of notification: `0` is ERROR, `1` is WARNING.',
        }),
        Type.Null(),
      ]),
    ),
    message_date: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date the notification was actually generated in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. Message buffering can cause this value to differ from `date_created`.',
        }),
        Type.Null(),
      ]),
    ),
    message_text: Type.Optional(
      Type.Union([Type.String({ description: 'The text of the notification.' }), Type.Null()]),
    ),
    more_info: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          description:
            'The URL for more information about the error condition. This value is a page in our [Error Dictionary](https://www.twilio.com/docs/api/errors).',
        }),
        Type.Null(),
      ]),
    ),
    request_method: Type.Optional(
      Type.Union([
        Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
          description:
            'The HTTP method used to generate the notification. If the notification was generated during a phone call, this is the HTTP Method used to request the resource on your server. If the notification was generated by your use of our REST API, this is the HTTP method used to call the resource on our servers.',
        }),
        Type.Null(),
      ]),
    ),
    request_url: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          description:
            'The URL of the resource that generated the notification. If the notification was generated during a phone call, this is the URL of the resource on your server that caused the notification. If the notification was generated by your use of our REST API, this is the URL of the resource you called.',
        }),
        Type.Null(),
      ]),
    ),
    request_variables: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The HTTP GET or POST variables we sent to your server. However, if the notification was generated by our REST API, this contains the HTTP POST or PUT variables you sent to our API.',
        }),
        Type.Null(),
      ]),
    ),
    response_body: Type.Optional(
      Type.Union([
        Type.String({ description: 'The HTTP body returned by your server.' }),
        Type.Null(),
      ]),
    ),
    response_headers: Type.Optional(
      Type.Union([
        Type.String({ description: 'The HTTP headers returned by your server.' }),
        Type.Null(),
      ]),
    ),
    sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^NO[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The unique string that that we created to identify the Call Notification resource.',
        }),
        Type.Null(),
      ]),
    ),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The URI of the resource, relative to `https://api.twilio.com`.',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.call.call_notification-instance' },
)

export type ApiV2010AccountCallCallNotificationInstance = Static<
  typeof ApiV2010AccountCallCallNotificationInstanceSchema
>

export const CallRecordingEnumStatusSchema = Type.Union(
  [
    Type.Literal('in-progress'),
    Type.Literal('paused'),
    Type.Literal('stopped'),
    Type.Literal('processing'),
    Type.Literal('completed'),
    Type.Literal('absent'),
  ],
  {
    ref: 'call_recording_enum_status',
    description:
      'The status of the recording. Can be: `processing`, `completed` and `absent`. For more detailed statuses on in-progress recordings, check out how to [Update a Recording Resource](https://www.twilio.com/docs/voice/api/recording#update-a-recording-resource).',
  },
)

export type CallRecordingEnumStatus = Static<typeof CallRecordingEnumStatusSchema>

export const CallRecordingEnumSourceSchema = Type.Union(
  [
    Type.Literal('DialVerb'),
    Type.Literal('Conference'),
    Type.Literal('OutboundAPI'),
    Type.Literal('Trunking'),
    Type.Literal('RecordVerb'),
    Type.Literal('StartCallRecordingAPI'),
    Type.Literal('StartConferenceRecordingAPI'),
  ],
  {
    ref: 'call_recording_enum_source',
    description:
      'How the recording was created. Can be: `DialVerb`, `Conference`, `OutboundAPI`, `Trunking`, `RecordVerb`, `StartCallRecordingAPI`, and `StartConferenceRecordingAPI`.',
  },
)

export type CallRecordingEnumSource = Static<typeof CallRecordingEnumSourceSchema>

export const ApiV2010AccountCallCallRecordingSchema = Type.Object(
  {
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording resource.',
        }),
        Type.Null(),
      ]),
    ),
    api_version: Type.Optional(
      Type.Union([
        Type.String({ description: 'The API version used to make the recording.' }),
        Type.Null(),
      ]),
    ),
    call_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^CA[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Recording resource is associated with.',
        }),
        Type.Null(),
      ]),
    ),
    conference_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^CF[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The Conference SID that identifies the conference associated with the recording, if a conference recording.',
        }),
        Type.Null(),
      ]),
    ),
    date_created: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    date_updated: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    start_time: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The start time of the recording in GMT and in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
        }),
        Type.Null(),
      ]),
    ),
    duration: Type.Optional(
      Type.Union([
        Type.String({ description: 'The length of the recording in seconds.' }),
        Type.Null(),
      ]),
    ),
    sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^RE[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'The unique string that that we created to identify the Recording resource.',
        }),
        Type.Null(),
      ]),
    ),
    price: Type.Optional(
      Type.Union([
        Type.Number({
          description: 'The one-time cost of creating the recording in the `price_unit` currency.',
        }),
        Type.Null(),
      ]),
    ),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The URI of the resource, relative to `https://api.twilio.com`.',
        }),
        Type.Null(),
      ]),
    ),
    encryption_details: Type.Optional(
      Type.Union([
        Type.Any({
          description:
            'How to decrypt the recording if it was encrypted using [Call Recording Encryption](https://www.twilio.com/docs/voice/tutorials/voice-recording-encryption) feature.',
        }),
        Type.Null(),
      ]),
    ),
    price_unit: Type.Optional(
      Type.Union([
        Type.String({ description: 'The currency used in the `price` property. Example: `USD`.' }),
        Type.Null(),
      ]),
    ),
    status: Type.Optional(CallRecordingEnumStatusSchema),
    channels: Type.Optional(
      Type.Integer({
        description:
          'The number of channels in the final recording file.  Can be: `1`, or `2`. Separating a two leg call into two separate channels of the recording file is supported in [Dial](https://www.twilio.com/docs/voice/twiml/dial#attributes-record) and [Outbound Rest API](https://www.twilio.com/docs/voice/make-calls) record options.',
        default: 0,
      }),
    ),
    source: Type.Optional(CallRecordingEnumSourceSchema),
    error_code: Type.Optional(
      Type.Union([
        Type.Integer({
          description:
            'The error code that describes why the recording is `absent`. The error code is described in our [Error Dictionary](https://www.twilio.com/docs/api/errors). This value is null if the recording `status` is not `absent`.',
        }),
        Type.Null(),
      ]),
    ),
    track: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The recorded track. Can be: `inbound`, `outbound`, or `both`.',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.call.call_recording' },
)

export type ApiV2010AccountCallCallRecording = Static<typeof ApiV2010AccountCallCallRecordingSchema>

export const ConferenceEnumStatusSchema = Type.Union(
  [Type.Literal('init'), Type.Literal('in-progress'), Type.Literal('completed')],
  {
    ref: 'conference_enum_status',
    description: 'The status of this conference. Can be: `init`, `in-progress`, or `completed`.',
  },
)

export type ConferenceEnumStatus = Static<typeof ConferenceEnumStatusSchema>

export const ConferenceEnumReasonConferenceEndedSchema = Type.Union(
  [
    Type.Literal('conference-ended-via-api'),
    Type.Literal('participant-with-end-conference-on-exit-left'),
    Type.Literal('participant-with-end-conference-on-exit-kicked'),
    Type.Literal('last-participant-kicked'),
    Type.Literal('last-participant-left'),
  ],
  {
    ref: 'conference_enum_reason_conference_ended',
    description:
      'The reason why a conference ended. When a conference is in progress, will be `null`. When conference is completed, can be: `conference-ended-via-api`, `participant-with-end-conference-on-exit-left`, `participant-with-end-conference-on-exit-kicked`, `last-participant-kicked`, or `last-participant-left`.',
  },
)

export type ConferenceEnumReasonConferenceEnded = Static<
  typeof ConferenceEnumReasonConferenceEndedSchema
>

export const ApiV2010AccountConferenceSchema = Type.Object(
  {
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Conference resource.',
        }),
        Type.Null(),
      ]),
    ),
    date_created: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in UTC that this resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    date_updated: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in UTC that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    api_version: Type.Optional(
      Type.Union([
        Type.String({ description: 'The API version used to create this conference.' }),
        Type.Null(),
      ]),
    ),
    friendly_name: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'A string that you assigned to describe this conference room. Maximum length is 128 characters.',
        }),
        Type.Null(),
      ]),
    ),
    region: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'A string that represents the Twilio Region where the conference audio was mixed. May be `us1`, `us2`, `ie1`,  `de1`, `sg1`, `br1`, `au1`, and `jp1`. Basic conference audio will always be mixed in `us1`. Global Conference audio will be mixed nearest to the majority of participants.',
        }),
        Type.Null(),
      ]),
    ),
    sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^CF[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The unique, Twilio-provided string used to identify this Conference resource.',
        }),
        Type.Null(),
      ]),
    ),
    status: Type.Optional(ConferenceEnumStatusSchema),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The URI of this resource, relative to `https://api.twilio.com`.',
        }),
        Type.Null(),
      ]),
    ),
    subresource_uris: Type.Optional(
      Type.Union([
        Type.Object(
          {},
          {
            description:
              'A list of related resources identified by their URIs relative to `https://api.twilio.com`.',
          },
        ),
        Type.Null(),
      ]),
    ),
    reason_conference_ended: Type.Optional(ConferenceEnumReasonConferenceEndedSchema),
    call_sid_ending_conference: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^CA[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'The call SID that caused the conference to end.',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.conference' },
)

export type ApiV2010AccountConference = Static<typeof ApiV2010AccountConferenceSchema>

export const ConferenceEnumUpdateStatusSchema = Type.Literal('completed', {
  ref: 'conference_enum_update_status',
})

export type ConferenceEnumUpdateStatus = Static<typeof ConferenceEnumUpdateStatusSchema>

export const ConferenceRecordingEnumStatusSchema = Type.Union(
  [
    Type.Literal('in-progress'),
    Type.Literal('paused'),
    Type.Literal('stopped'),
    Type.Literal('processing'),
    Type.Literal('completed'),
    Type.Literal('absent'),
  ],
  {
    ref: 'conference_recording_enum_status',
    description:
      'The status of the recording. Can be: `processing`, `completed` and `absent`. For more detailed statuses on in-progress recordings, check out how to [Update a Recording Resource](https://www.twilio.com/docs/voice/api/recording#update-a-recording-resource).',
  },
)

export type ConferenceRecordingEnumStatus = Static<typeof ConferenceRecordingEnumStatusSchema>

export const ConferenceRecordingEnumSourceSchema = Type.Union(
  [
    Type.Literal('DialVerb'),
    Type.Literal('Conference'),
    Type.Literal('OutboundAPI'),
    Type.Literal('Trunking'),
    Type.Literal('RecordVerb'),
    Type.Literal('StartCallRecordingAPI'),
    Type.Literal('StartConferenceRecordingAPI'),
  ],
  {
    ref: 'conference_recording_enum_source',
    description:
      'How the recording was created. Can be: `DialVerb`, `Conference`, `OutboundAPI`, `Trunking`, `RecordVerb`, `StartCallRecordingAPI`, `StartConferenceRecordingAPI`.',
  },
)

export type ConferenceRecordingEnumSource = Static<typeof ConferenceRecordingEnumSourceSchema>

export const ApiV2010AccountConferenceConferenceRecordingSchema = Type.Object(
  {
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Conference Recording resource.',
        }),
        Type.Null(),
      ]),
    ),
    api_version: Type.Optional(
      Type.Union([
        Type.String({ description: 'The API version used to create the recording.' }),
        Type.Null(),
      ]),
    ),
    call_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^CA[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Conference Recording resource is associated with.',
        }),
        Type.Null(),
      ]),
    ),
    conference_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^CF[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The Conference SID that identifies the conference associated with the recording.',
        }),
        Type.Null(),
      ]),
    ),
    date_created: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    date_updated: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    start_time: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The start time of the recording in GMT and in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
        }),
        Type.Null(),
      ]),
    ),
    duration: Type.Optional(
      Type.Union([
        Type.String({ description: 'The length of the recording in seconds.' }),
        Type.Null(),
      ]),
    ),
    sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^RE[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The unique string that that we created to identify the Conference Recording resource.',
        }),
        Type.Null(),
      ]),
    ),
    price: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The one-time cost of creating the recording in the `price_unit` currency.',
        }),
        Type.Null(),
      ]),
    ),
    price_unit: Type.Optional(
      Type.Union([
        Type.String({ description: 'The currency used in the `price` property. Example: `USD`.' }),
        Type.Null(),
      ]),
    ),
    status: Type.Optional(ConferenceRecordingEnumStatusSchema),
    channels: Type.Optional(
      Type.Integer({
        description:
          'The number of channels in the final recording file.  Can be: `1`, or `2`. Separating a two leg call into two separate channels of the recording file is supported in [Dial](https://www.twilio.com/docs/voice/twiml/dial#attributes-record) and [Outbound Rest API](https://www.twilio.com/docs/voice/make-calls) record options.',
        default: 0,
      }),
    ),
    source: Type.Optional(ConferenceRecordingEnumSourceSchema),
    error_code: Type.Optional(
      Type.Union([
        Type.Integer({
          description:
            'The error code that describes why the recording is `absent`. The error code is described in our [Error Dictionary](https://www.twilio.com/docs/api/errors). This value is null if the recording `status` is not `absent`.',
        }),
        Type.Null(),
      ]),
    ),
    encryption_details: Type.Optional(
      Type.Union([
        Type.Any({
          description:
            'How to decrypt the recording if it was encrypted using [Call Recording Encryption](https://www.twilio.com/docs/voice/tutorials/voice-recording-encryption) feature.',
        }),
        Type.Null(),
      ]),
    ),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The URI of the resource, relative to `https://api.twilio.com`.',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.conference.conference_recording' },
)

export type ApiV2010AccountConferenceConferenceRecording = Static<
  typeof ApiV2010AccountConferenceConferenceRecordingSchema
>

export const ConnectAppEnumPermissionSchema = Type.Union(
  [Type.Literal('get-all'), Type.Literal('post-all')],
  {
    ref: 'connect_app_enum_permission',
    description: 'The set of permissions that your ConnectApp requests.',
  },
)

export type ConnectAppEnumPermission = Static<typeof ConnectAppEnumPermissionSchema>

export const ApiV2010AccountConnectAppSchema = Type.Object(
  {
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the ConnectApp resource.',
        }),
        Type.Null(),
      ]),
    ),
    authorize_redirect_url: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          description:
            'The URL we redirect the user to after we authenticate the user and obtain authorization to access the Connect App.',
        }),
        Type.Null(),
      ]),
    ),
    company_name: Type.Optional(
      Type.Union([
        Type.String({ description: 'The company name set for the Connect App.' }),
        Type.Null(),
      ]),
    ),
    deauthorize_callback_method: Type.Optional(
      Type.Union([
        Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
          description: 'The HTTP method we use to call `deauthorize_callback_url`.',
        }),
        Type.Null(),
      ]),
    ),
    deauthorize_callback_url: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          description:
            'The URL we call using the `deauthorize_callback_method` to de-authorize the Connect App.',
        }),
        Type.Null(),
      ]),
    ),
    description: Type.Optional(
      Type.Union([
        Type.String({ description: 'The description of the Connect App.' }),
        Type.Null(),
      ]),
    ),
    friendly_name: Type.Optional(
      Type.Union([
        Type.String({ description: 'The string that you assigned to describe the resource.' }),
        Type.Null(),
      ]),
    ),
    homepage_url: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          description:
            'The public URL where users can obtain more information about this Connect App.',
        }),
        Type.Null(),
      ]),
    ),
    permissions: Type.Optional(
      Type.Union([
        Type.Array(ConnectAppEnumPermissionSchema, {
          description: 'The set of permissions that your ConnectApp requests.',
        }),
        Type.Null(),
      ]),
    ),
    sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^CN[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The unique string that that we created to identify the ConnectApp resource.',
        }),
        Type.Null(),
      ]),
    ),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The URI of the resource, relative to `https://api.twilio.com`.',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.connect_app' },
)

export type ApiV2010AccountConnectApp = Static<typeof ApiV2010AccountConnectAppSchema>

export const DependentPhoneNumberEnumAddressRequirementSchema = Type.Union(
  [Type.Literal('none'), Type.Literal('any'), Type.Literal('local'), Type.Literal('foreign')],
  {
    ref: 'dependent_phone_number_enum_address_requirement',
    description:
      'Whether the phone number requires an [Address](https://www.twilio.com/docs/usage/api/address) registered with Twilio. Can be: `none`, `any`, `local`, or `foreign`.',
  },
)

export type DependentPhoneNumberEnumAddressRequirement = Static<
  typeof DependentPhoneNumberEnumAddressRequirementSchema
>

export const DependentPhoneNumberEnumEmergencyStatusSchema = Type.Union(
  [Type.Literal('Active'), Type.Literal('Inactive')],
  {
    ref: 'dependent_phone_number_enum_emergency_status',
    description: 'Whether the phone number is enabled for emergency calling.',
  },
)

export type DependentPhoneNumberEnumEmergencyStatus = Static<
  typeof DependentPhoneNumberEnumEmergencyStatusSchema
>

export const ApiV2010AccountAddressDependentPhoneNumberSchema = Type.Object(
  {
    sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^PN[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The unique string that that we created to identify the DependentPhoneNumber resource.',
        }),
        Type.Null(),
      ]),
    ),
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the DependentPhoneNumber resource.',
        }),
        Type.Null(),
      ]),
    ),
    friendly_name: Type.Optional(
      Type.Union([
        Type.String({ description: 'The string that you assigned to describe the resource.' }),
        Type.Null(),
      ]),
    ),
    phone_number: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
        }),
        Type.Null(),
      ]),
    ),
    voice_url: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          description:
            'The URL we call when the phone number receives a call. The `voice_url` will not be used if a `voice_application_sid` or a `trunk_sid` is set.',
        }),
        Type.Null(),
      ]),
    ),
    voice_method: Type.Optional(
      Type.Union([
        Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
          description: 'The HTTP method we use to call `voice_url`. Can be: `GET` or `POST`.',
        }),
        Type.Null(),
      ]),
    ),
    voice_fallback_method: Type.Optional(
      Type.Union([
        Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
          description:
            'The HTTP method we use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
        }),
        Type.Null(),
      ]),
    ),
    voice_fallback_url: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          description:
            'The URL that we call when an error occurs retrieving or executing the TwiML requested by `url`.',
        }),
        Type.Null(),
      ]),
    ),
    voice_caller_id_lookup: Type.Optional(
      Type.Union([
        Type.Boolean({
          description:
            "Whether we look up the caller's caller-ID name from the CNAM database. Can be: `true` or `false`. Caller ID lookups can cost $0.01 each.",
        }),
        Type.Null(),
      ]),
    ),
    date_created: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    date_updated: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    sms_fallback_method: Type.Optional(
      Type.Union([
        Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
          description:
            'The HTTP method we use to call `sms_fallback_url`. Can be: `GET` or `POST`.',
        }),
        Type.Null(),
      ]),
    ),
    sms_fallback_url: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          description:
            'The URL that we call when an error occurs while retrieving or executing the TwiML from `sms_url`.',
        }),
        Type.Null(),
      ]),
    ),
    sms_method: Type.Optional(
      Type.Union([
        Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
          description: 'The HTTP method we use to call `sms_url`. Can be: `GET` or `POST`.',
        }),
        Type.Null(),
      ]),
    ),
    sms_url: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          description: 'The URL we call when the phone number receives an incoming SMS message.',
        }),
        Type.Null(),
      ]),
    ),
    address_requirements: Type.Optional(DependentPhoneNumberEnumAddressRequirementSchema),
    capabilities: Type.Optional(
      Type.Union([
        Type.Any({
          description:
            'The set of Boolean properties that indicates whether a phone number can receive calls or messages.  Capabilities are  `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
        }),
        Type.Null(),
      ]),
    ),
    status_callback: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          description:
            'The URL we call using the `status_callback_method` to send status information to your application.',
        }),
        Type.Null(),
      ]),
    ),
    status_callback_method: Type.Optional(
      Type.Union([
        Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
          description: 'The HTTP method we use to call `status_callback`. Can be: `GET` or `POST`.',
        }),
        Type.Null(),
      ]),
    ),
    api_version: Type.Optional(
      Type.Union([
        Type.String({ description: 'The API version used to start a new TwiML session.' }),
        Type.Null(),
      ]),
    ),
    sms_application_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AP[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the application that handles SMS messages sent to the phone number. If an `sms_application_sid` is present, we ignore all `sms_*_url` values and use those of the application.',
        }),
        Type.Null(),
      ]),
    ),
    voice_application_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AP[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the application that handles calls to the phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
        }),
        Type.Null(),
      ]),
    ),
    trunk_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^TK[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the Trunk that handles calls to the phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
        }),
        Type.Null(),
      ]),
    ),
    emergency_status: Type.Optional(DependentPhoneNumberEnumEmergencyStatusSchema),
    emergency_address_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AD[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the emergency address configuration that we use for emergency calling from the phone number.',
        }),
        Type.Null(),
      ]),
    ),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The URI of the resource, relative to `https://api.twilio.com`.',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.address.dependent_phone_number' },
)

export type ApiV2010AccountAddressDependentPhoneNumber = Static<
  typeof ApiV2010AccountAddressDependentPhoneNumberSchema
>

export const IncomingPhoneNumberEnumAddressRequirementSchema = Type.Union(
  [Type.Literal('none'), Type.Literal('any'), Type.Literal('local'), Type.Literal('foreign')],
  {
    ref: 'incoming_phone_number_enum_address_requirement',
    description:
      'Whether the phone number requires an [Address](https://www.twilio.com/docs/usage/api/address) registered with Twilio. Can be: `none`, `any`, `local`, or `foreign`.',
  },
)

export type IncomingPhoneNumberEnumAddressRequirement = Static<
  typeof IncomingPhoneNumberEnumAddressRequirementSchema
>

export const IncomingPhoneNumberEnumVoiceReceiveModeSchema = Type.Union(
  [Type.Literal('voice'), Type.Literal('fax')],
  { ref: 'incoming_phone_number_enum_voice_receive_mode' },
)

export type IncomingPhoneNumberEnumVoiceReceiveMode = Static<
  typeof IncomingPhoneNumberEnumVoiceReceiveModeSchema
>

export const IncomingPhoneNumberEnumEmergencyStatusSchema = Type.Union(
  [Type.Literal('Active'), Type.Literal('Inactive')],
  {
    ref: 'incoming_phone_number_enum_emergency_status',
    description:
      'The parameter displays if emergency calling is enabled for this number. Active numbers may place emergency calls by dialing valid emergency numbers for the country.',
  },
)

export type IncomingPhoneNumberEnumEmergencyStatus = Static<
  typeof IncomingPhoneNumberEnumEmergencyStatusSchema
>

export const IncomingPhoneNumberEnumEmergencyAddressStatusSchema = Type.Union(
  [
    Type.Literal('registered'),
    Type.Literal('unregistered'),
    Type.Literal('pending-registration'),
    Type.Literal('registration-failure'),
    Type.Literal('pending-unregistration'),
    Type.Literal('unregistration-failure'),
  ],
  {
    ref: 'incoming_phone_number_enum_emergency_address_status',
    description:
      'The status of address registration with emergency services. A registered emergency address will be used during handling of emergency calls from this number.',
  },
)

export type IncomingPhoneNumberEnumEmergencyAddressStatus = Static<
  typeof IncomingPhoneNumberEnumEmergencyAddressStatusSchema
>

export const ApiV2010AccountIncomingPhoneNumberSchema = Type.Object(
  {
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this IncomingPhoneNumber resource.',
        }),
        Type.Null(),
      ]),
    ),
    address_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AD[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'The SID of the Address resource associated with the phone number.',
        }),
        Type.Null(),
      ]),
    ),
    address_requirements: Type.Optional(IncomingPhoneNumberEnumAddressRequirementSchema),
    api_version: Type.Optional(
      Type.Union([
        Type.String({ description: 'The API version used to start a new TwiML session.' }),
        Type.Null(),
      ]),
    ),
    beta: Type.Optional(
      Type.Union([
        Type.Boolean({
          description:
            'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
        }),
        Type.Null(),
      ]),
    ),
    capabilities: Type.Optional(
      Type.Union([
        Type.Object(
          {
            mms: Type.Optional(Type.Boolean()),
            sms: Type.Optional(Type.Boolean()),
            voice: Type.Optional(Type.Boolean()),
            fax: Type.Optional(Type.Boolean()),
          },
          {
            description:
              'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are  `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
          },
        ),
        Type.Null(),
      ]),
    ),
    date_created: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    date_updated: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    friendly_name: Type.Optional(
      Type.Union([
        Type.String({ description: 'The string that you assigned to describe the resource.' }),
        Type.Null(),
      ]),
    ),
    identity_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^RI[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the Identity resource that we associate with the phone number. Some regions require an Identity to meet local regulations.',
        }),
        Type.Null(),
      ]),
    ),
    phone_number: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
        }),
        Type.Null(),
      ]),
    ),
    origin: Type.Optional(
      Type.Union([
        Type.String({
          description:
            "The phone number's origin. `twilio` identifies Twilio-owned phone numbers and `hosted` identifies hosted phone numbers.",
        }),
        Type.Null(),
      ]),
    ),
    sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^PN[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The unique string that that we created to identify this IncomingPhoneNumber resource.',
        }),
        Type.Null(),
      ]),
    ),
    sms_application_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AP[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the application that handles SMS messages sent to the phone number. If an `sms_application_sid` is present, we ignore all `sms_*_url` values and use those of the application.',
        }),
        Type.Null(),
      ]),
    ),
    sms_fallback_method: Type.Optional(
      Type.Union([
        Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
          description:
            'The HTTP method we use to call `sms_fallback_url`. Can be: `GET` or `POST`.',
        }),
        Type.Null(),
      ]),
    ),
    sms_fallback_url: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          description:
            'The URL that we call when an error occurs while retrieving or executing the TwiML from `sms_url`.',
        }),
        Type.Null(),
      ]),
    ),
    sms_method: Type.Optional(
      Type.Union([
        Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
          description: 'The HTTP method we use to call `sms_url`. Can be: `GET` or `POST`.',
        }),
        Type.Null(),
      ]),
    ),
    sms_url: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          description: 'The URL we call when the phone number receives an incoming SMS message.',
        }),
        Type.Null(),
      ]),
    ),
    status_callback: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          description:
            'The URL we call using the `status_callback_method` to send status information to your application.',
        }),
        Type.Null(),
      ]),
    ),
    status_callback_method: Type.Optional(
      Type.Union([
        Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
          description: 'The HTTP method we use to call `status_callback`. Can be: `GET` or `POST`.',
        }),
        Type.Null(),
      ]),
    ),
    trunk_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^TK[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the Trunk that handles calls to the phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
        }),
        Type.Null(),
      ]),
    ),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The URI of the resource, relative to `https://api.twilio.com`.',
        }),
        Type.Null(),
      ]),
    ),
    voice_receive_mode: Type.Optional(IncomingPhoneNumberEnumVoiceReceiveModeSchema),
    voice_application_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AP[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the application that handles calls to the phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
        }),
        Type.Null(),
      ]),
    ),
    voice_caller_id_lookup: Type.Optional(
      Type.Union([
        Type.Boolean({
          description:
            "Whether we look up the caller's caller-ID name from the CNAM database ($0.01 per look up). Can be: `true` or `false`.",
        }),
        Type.Null(),
      ]),
    ),
    voice_fallback_method: Type.Optional(
      Type.Union([
        Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
          description:
            'The HTTP method we use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
        }),
        Type.Null(),
      ]),
    ),
    voice_fallback_url: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          description:
            'The URL that we call when an error occurs retrieving or executing the TwiML requested by `url`.',
        }),
        Type.Null(),
      ]),
    ),
    voice_method: Type.Optional(
      Type.Union([
        Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
          description: 'The HTTP method we use to call `voice_url`. Can be: `GET` or `POST`.',
        }),
        Type.Null(),
      ]),
    ),
    voice_url: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          description:
            'The URL we call when the phone number receives a call. The `voice_url` will not be used if a `voice_application_sid` or a `trunk_sid` is set.',
        }),
        Type.Null(),
      ]),
    ),
    emergency_status: Type.Optional(IncomingPhoneNumberEnumEmergencyStatusSchema),
    emergency_address_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AD[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the emergency address configuration that we use for emergency calling from this phone number.',
        }),
        Type.Null(),
      ]),
    ),
    emergency_address_status: Type.Optional(IncomingPhoneNumberEnumEmergencyAddressStatusSchema),
    bundle_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^BU[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
        }),
        Type.Null(),
      ]),
    ),
    status: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    type: Type.Optional(
      Type.Union([Type.String({ description: 'The phone number type.' }), Type.Null()]),
    ),
  },
  { ref: 'api.v2010.account.incoming_phone_number' },
)

export type ApiV2010AccountIncomingPhoneNumber = Static<
  typeof ApiV2010AccountIncomingPhoneNumberSchema
>

export const ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema = Type.Object(
  {
    sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^XE[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'The unique string that that we created to identify the resource.',
        }),
        Type.Null(),
      ]),
    ),
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the resource.',
        }),
        Type.Null(),
      ]),
    ),
    resource_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^PN[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'The SID of the Phone Number to which the Add-on is assigned.',
        }),
        Type.Null(),
      ]),
    ),
    friendly_name: Type.Optional(
      Type.Union([
        Type.String({ description: 'The string that you assigned to describe the resource.' }),
        Type.Null(),
      ]),
    ),
    description: Type.Optional(
      Type.Union([
        Type.String({
          description: 'A short description of the functionality that the Add-on provides.',
        }),
        Type.Null(),
      ]),
    ),
    configuration: Type.Optional(
      Type.Union([
        Type.Any({
          description:
            'A JSON string that represents the current configuration of this Add-on installation.',
        }),
        Type.Null(),
      ]),
    ),
    unique_name: Type.Optional(
      Type.Union([
        Type.String({
          description:
            "An application-defined string that uniquely identifies the resource. It can be used in place of the resource's `sid` in the URL to address the resource.",
        }),
        Type.Null(),
      ]),
    ),
    date_created: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    date_updated: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The URI of the resource, relative to `https://api.twilio.com`.',
        }),
        Type.Null(),
      ]),
    ),
    subresource_uris: Type.Optional(
      Type.Union([
        Type.Object(
          {},
          { description: 'A list of related resources identified by their relative URIs.' },
        ),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.incoming_phone_number.incoming_phone_number_assigned_add_on' },
)

export type ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOn = Static<
  typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema
>

export const ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtensionSchema =
  Type.Object(
    {
      sid: Type.Optional(
        Type.Union([
          Type.String({
            pattern: '^XF[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description: 'The unique string that that we created to identify the resource.',
          }),
          Type.Null(),
        ]),
      ),
      account_sid: Type.Optional(
        Type.Union([
          Type.String({
            pattern: '^AC[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the resource.',
          }),
          Type.Null(),
        ]),
      ),
      resource_sid: Type.Optional(
        Type.Union([
          Type.String({
            pattern: '^PN[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description: 'The SID of the Phone Number to which the Add-on is assigned.',
          }),
          Type.Null(),
        ]),
      ),
      assigned_add_on_sid: Type.Optional(
        Type.Union([
          Type.String({
            pattern: '^XE[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description: 'The SID that uniquely identifies the assigned Add-on installation.',
          }),
          Type.Null(),
        ]),
      ),
      friendly_name: Type.Optional(
        Type.Union([
          Type.String({ description: 'The string that you assigned to describe the resource.' }),
          Type.Null(),
        ]),
      ),
      product_name: Type.Optional(
        Type.Union([
          Type.String({
            description:
              'A string that you assigned to describe the Product this Extension is used within.',
          }),
          Type.Null(),
        ]),
      ),
      unique_name: Type.Optional(
        Type.Union([
          Type.String({
            description:
              "An application-defined string that uniquely identifies the resource. It can be used in place of the resource's `sid` in the URL to address the resource.",
          }),
          Type.Null(),
        ]),
      ),
      uri: Type.Optional(
        Type.Union([
          Type.String({
            description: 'The URI of the resource, relative to `https://api.twilio.com`.',
          }),
          Type.Null(),
        ]),
      ),
      enabled: Type.Optional(
        Type.Union([
          Type.Boolean({ description: 'Whether the Extension will be invoked.' }),
          Type.Null(),
        ]),
      ),
    },
    {
      ref: 'api.v2010.account.incoming_phone_number.incoming_phone_number_assigned_add_on.incoming_phone_number_assigned_add_on_extension',
    },
  )

export type ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtension =
  Static<
    typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtensionSchema
  >

export const IncomingPhoneNumberLocalEnumAddressRequirementSchema = Type.Union(
  [Type.Literal('none'), Type.Literal('any'), Type.Literal('local'), Type.Literal('foreign')],
  {
    ref: 'incoming_phone_number_local_enum_address_requirement',
    description:
      'Whether the phone number requires an [Address](https://www.twilio.com/docs/usage/api/address) registered with Twilio. Can be: `none`, `any`, `local`, or `foreign`.',
  },
)

export type IncomingPhoneNumberLocalEnumAddressRequirement = Static<
  typeof IncomingPhoneNumberLocalEnumAddressRequirementSchema
>

export const IncomingPhoneNumberLocalEnumVoiceReceiveModeSchema = Type.Union(
  [Type.Literal('voice'), Type.Literal('fax')],
  { ref: 'incoming_phone_number_local_enum_voice_receive_mode' },
)

export type IncomingPhoneNumberLocalEnumVoiceReceiveMode = Static<
  typeof IncomingPhoneNumberLocalEnumVoiceReceiveModeSchema
>

export const IncomingPhoneNumberLocalEnumEmergencyStatusSchema = Type.Union(
  [Type.Literal('Active'), Type.Literal('Inactive')],
  {
    ref: 'incoming_phone_number_local_enum_emergency_status',
    description:
      'The parameter displays if emergency calling is enabled for this number. Active numbers may place emergency calls by dialing valid emergency numbers for the country.',
  },
)

export type IncomingPhoneNumberLocalEnumEmergencyStatus = Static<
  typeof IncomingPhoneNumberLocalEnumEmergencyStatusSchema
>

export const IncomingPhoneNumberLocalEnumEmergencyAddressStatusSchema = Type.Union(
  [
    Type.Literal('registered'),
    Type.Literal('unregistered'),
    Type.Literal('pending-registration'),
    Type.Literal('registration-failure'),
    Type.Literal('pending-unregistration'),
    Type.Literal('unregistration-failure'),
  ],
  {
    ref: 'incoming_phone_number_local_enum_emergency_address_status',
    description:
      'The status of address registration with emergency services. A registered emergency address will be used during handling of emergency calls from this number.',
  },
)

export type IncomingPhoneNumberLocalEnumEmergencyAddressStatus = Static<
  typeof IncomingPhoneNumberLocalEnumEmergencyAddressStatusSchema
>

export const ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocalSchema = Type.Object(
  {
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the resource.',
        }),
        Type.Null(),
      ]),
    ),
    address_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AD[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'The SID of the Address resource associated with the phone number.',
        }),
        Type.Null(),
      ]),
    ),
    address_requirements: Type.Optional(IncomingPhoneNumberLocalEnumAddressRequirementSchema),
    api_version: Type.Optional(
      Type.Union([
        Type.String({ description: 'The API version used to start a new TwiML session.' }),
        Type.Null(),
      ]),
    ),
    beta: Type.Optional(
      Type.Union([
        Type.Boolean({
          description:
            'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
        }),
        Type.Null(),
      ]),
    ),
    capabilities: Type.Optional(
      Type.Union([
        Type.Object(
          {
            mms: Type.Optional(Type.Boolean()),
            sms: Type.Optional(Type.Boolean()),
            voice: Type.Optional(Type.Boolean()),
            fax: Type.Optional(Type.Boolean()),
          },
          {
            description:
              'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are  `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
          },
        ),
        Type.Null(),
      ]),
    ),
    date_created: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    date_updated: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    friendly_name: Type.Optional(
      Type.Union([
        Type.String({ description: 'The string that you assigned to describe the resource.' }),
        Type.Null(),
      ]),
    ),
    identity_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^RI[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the Identity resource that we associate with the phone number. Some regions require an Identity to meet local regulations.',
        }),
        Type.Null(),
      ]),
    ),
    phone_number: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
        }),
        Type.Null(),
      ]),
    ),
    origin: Type.Optional(
      Type.Union([
        Type.String({
          description:
            "The phone number's origin. `twilio` identifies Twilio-owned phone numbers and `hosted` identifies hosted phone numbers.",
        }),
        Type.Null(),
      ]),
    ),
    sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^PN[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'The unique string that that we created to identify the resource.',
        }),
        Type.Null(),
      ]),
    ),
    sms_application_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AP[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the application that handles SMS messages sent to the phone number. If an `sms_application_sid` is present, we ignore all `sms_*_url` values and use those of the application.',
        }),
        Type.Null(),
      ]),
    ),
    sms_fallback_method: Type.Optional(
      Type.Union([
        Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
          description:
            'The HTTP method we use to call `sms_fallback_url`. Can be: `GET` or `POST`.',
        }),
        Type.Null(),
      ]),
    ),
    sms_fallback_url: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          description:
            'The URL that we call when an error occurs while retrieving or executing the TwiML from `sms_url`.',
        }),
        Type.Null(),
      ]),
    ),
    sms_method: Type.Optional(
      Type.Union([
        Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
          description: 'The HTTP method we use to call `sms_url`. Can be: `GET` or `POST`.',
        }),
        Type.Null(),
      ]),
    ),
    sms_url: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          description: 'The URL we call when the phone number receives an incoming SMS message.',
        }),
        Type.Null(),
      ]),
    ),
    status_callback: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          description:
            'The URL we call using the `status_callback_method` to send status information to your application.',
        }),
        Type.Null(),
      ]),
    ),
    status_callback_method: Type.Optional(
      Type.Union([
        Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
          description: 'The HTTP method we use to call `status_callback`. Can be: `GET` or `POST`.',
        }),
        Type.Null(),
      ]),
    ),
    trunk_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^TK[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the Trunk that handles calls to the phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
        }),
        Type.Null(),
      ]),
    ),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The URI of the resource, relative to `https://api.twilio.com`.',
        }),
        Type.Null(),
      ]),
    ),
    voice_receive_mode: Type.Optional(IncomingPhoneNumberLocalEnumVoiceReceiveModeSchema),
    voice_application_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AP[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the application that handles calls to the phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
        }),
        Type.Null(),
      ]),
    ),
    voice_caller_id_lookup: Type.Optional(
      Type.Union([
        Type.Boolean({
          description:
            "Whether we look up the caller's caller-ID name from the CNAM database ($0.01 per look up). Can be: `true` or `false`.",
        }),
        Type.Null(),
      ]),
    ),
    voice_fallback_method: Type.Optional(
      Type.Union([
        Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
          description:
            'The HTTP method we use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
        }),
        Type.Null(),
      ]),
    ),
    voice_fallback_url: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          description:
            'The URL that we call when an error occurs retrieving or executing the TwiML requested by `url`.',
        }),
        Type.Null(),
      ]),
    ),
    voice_method: Type.Optional(
      Type.Union([
        Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
          description: 'The HTTP method we use to call `voice_url`. Can be: `GET` or `POST`.',
        }),
        Type.Null(),
      ]),
    ),
    voice_url: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          description:
            'The URL we call when this phone number receives a call. The `voice_url` will not be used if a `voice_application_sid` or a `trunk_sid` is set.',
        }),
        Type.Null(),
      ]),
    ),
    emergency_status: Type.Optional(IncomingPhoneNumberLocalEnumEmergencyStatusSchema),
    emergency_address_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AD[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the emergency address configuration that we use for emergency calling from this phone number.',
        }),
        Type.Null(),
      ]),
    ),
    emergency_address_status: Type.Optional(
      IncomingPhoneNumberLocalEnumEmergencyAddressStatusSchema,
    ),
    bundle_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^BU[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
        }),
        Type.Null(),
      ]),
    ),
    status: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  },
  { ref: 'api.v2010.account.incoming_phone_number.incoming_phone_number_local' },
)

export type ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocal = Static<
  typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocalSchema
>

export const IncomingPhoneNumberMobileEnumAddressRequirementSchema = Type.Union(
  [Type.Literal('none'), Type.Literal('any'), Type.Literal('local'), Type.Literal('foreign')],
  {
    ref: 'incoming_phone_number_mobile_enum_address_requirement',
    description:
      'Whether the phone number requires an [Address](https://www.twilio.com/docs/usage/api/address) registered with Twilio. Can be: `none`, `any`, `local`, or `foreign`.',
  },
)

export type IncomingPhoneNumberMobileEnumAddressRequirement = Static<
  typeof IncomingPhoneNumberMobileEnumAddressRequirementSchema
>

export const IncomingPhoneNumberMobileEnumVoiceReceiveModeSchema = Type.Union(
  [Type.Literal('voice'), Type.Literal('fax')],
  { ref: 'incoming_phone_number_mobile_enum_voice_receive_mode' },
)

export type IncomingPhoneNumberMobileEnumVoiceReceiveMode = Static<
  typeof IncomingPhoneNumberMobileEnumVoiceReceiveModeSchema
>

export const IncomingPhoneNumberMobileEnumEmergencyStatusSchema = Type.Union(
  [Type.Literal('Active'), Type.Literal('Inactive')],
  {
    ref: 'incoming_phone_number_mobile_enum_emergency_status',
    description:
      'The parameter displays if emergency calling is enabled for this number. Active numbers may place emergency calls by dialing valid emergency numbers for the country.',
  },
)

export type IncomingPhoneNumberMobileEnumEmergencyStatus = Static<
  typeof IncomingPhoneNumberMobileEnumEmergencyStatusSchema
>

export const IncomingPhoneNumberMobileEnumEmergencyAddressStatusSchema = Type.Union(
  [
    Type.Literal('registered'),
    Type.Literal('unregistered'),
    Type.Literal('pending-registration'),
    Type.Literal('registration-failure'),
    Type.Literal('pending-unregistration'),
    Type.Literal('unregistration-failure'),
  ],
  {
    ref: 'incoming_phone_number_mobile_enum_emergency_address_status',
    description:
      'The status of address registration with emergency services. A registered emergency address will be used during handling of emergency calls from this number.',
  },
)

export type IncomingPhoneNumberMobileEnumEmergencyAddressStatus = Static<
  typeof IncomingPhoneNumberMobileEnumEmergencyAddressStatusSchema
>

export const ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobileSchema = Type.Object(
  {
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the resource.',
        }),
        Type.Null(),
      ]),
    ),
    address_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AD[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'The SID of the Address resource associated with the phone number.',
        }),
        Type.Null(),
      ]),
    ),
    address_requirements: Type.Optional(IncomingPhoneNumberMobileEnumAddressRequirementSchema),
    api_version: Type.Optional(
      Type.Union([
        Type.String({ description: 'The API version used to start a new TwiML session.' }),
        Type.Null(),
      ]),
    ),
    beta: Type.Optional(
      Type.Union([
        Type.Boolean({
          description:
            'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
        }),
        Type.Null(),
      ]),
    ),
    capabilities: Type.Optional(
      Type.Union([
        Type.Object(
          {
            mms: Type.Optional(Type.Boolean()),
            sms: Type.Optional(Type.Boolean()),
            voice: Type.Optional(Type.Boolean()),
            fax: Type.Optional(Type.Boolean()),
          },
          {
            description:
              'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are  `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
          },
        ),
        Type.Null(),
      ]),
    ),
    date_created: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    date_updated: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    friendly_name: Type.Optional(
      Type.Union([
        Type.String({ description: 'The string that you assigned to describe the resource.' }),
        Type.Null(),
      ]),
    ),
    identity_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^RI[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the Identity resource that we associate with the phone number. Some regions require an Identity to meet local regulations.',
        }),
        Type.Null(),
      ]),
    ),
    phone_number: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
        }),
        Type.Null(),
      ]),
    ),
    origin: Type.Optional(
      Type.Union([
        Type.String({
          description:
            "The phone number's origin. `twilio` identifies Twilio-owned phone numbers and `hosted` identifies hosted phone numbers.",
        }),
        Type.Null(),
      ]),
    ),
    sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^PN[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'The unique string that that we created to identify the resource.',
        }),
        Type.Null(),
      ]),
    ),
    sms_application_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AP[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the application that handles SMS messages sent to the phone number. If an `sms_application_sid` is present, we ignore all `sms_*_url` values and use those of the application.',
        }),
        Type.Null(),
      ]),
    ),
    sms_fallback_method: Type.Optional(
      Type.Union([
        Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
          description:
            'The HTTP method we use to call `sms_fallback_url`. Can be: `GET` or `POST`.',
        }),
        Type.Null(),
      ]),
    ),
    sms_fallback_url: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          description:
            'The URL that we call when an error occurs while retrieving or executing the TwiML from `sms_url`.',
        }),
        Type.Null(),
      ]),
    ),
    sms_method: Type.Optional(
      Type.Union([
        Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
          description: 'The HTTP method we use to call `sms_url`. Can be: `GET` or `POST`.',
        }),
        Type.Null(),
      ]),
    ),
    sms_url: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          description: 'The URL we call when the phone number receives an incoming SMS message.',
        }),
        Type.Null(),
      ]),
    ),
    status_callback: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          description:
            'The URL we call using the `status_callback_method` to send status information to your application.',
        }),
        Type.Null(),
      ]),
    ),
    status_callback_method: Type.Optional(
      Type.Union([
        Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
          description: 'The HTTP method we use to call `status_callback`. Can be: `GET` or `POST`.',
        }),
        Type.Null(),
      ]),
    ),
    trunk_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^TK[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the Trunk that handles calls to the phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
        }),
        Type.Null(),
      ]),
    ),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The URI of the resource, relative to `https://api.twilio.com`.',
        }),
        Type.Null(),
      ]),
    ),
    voice_receive_mode: Type.Optional(IncomingPhoneNumberMobileEnumVoiceReceiveModeSchema),
    voice_application_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AP[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the application that handles calls to the phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
        }),
        Type.Null(),
      ]),
    ),
    voice_caller_id_lookup: Type.Optional(
      Type.Union([
        Type.Boolean({
          description:
            "Whether we look up the caller's caller-ID name from the CNAM database ($0.01 per look up). Can be: `true` or `false`.",
        }),
        Type.Null(),
      ]),
    ),
    voice_fallback_method: Type.Optional(
      Type.Union([
        Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
          description:
            'The HTTP method we use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
        }),
        Type.Null(),
      ]),
    ),
    voice_fallback_url: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          description:
            'The URL that we call when an error occurs retrieving or executing the TwiML requested by `url`.',
        }),
        Type.Null(),
      ]),
    ),
    voice_method: Type.Optional(
      Type.Union([
        Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
          description: 'The HTTP method we use to call `voice_url`. Can be: `GET` or `POST`.',
        }),
        Type.Null(),
      ]),
    ),
    voice_url: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          description:
            'The URL we call when the phone number receives a call. The `voice_url` will not be used if a `voice_application_sid` or a `trunk_sid` is set.',
        }),
        Type.Null(),
      ]),
    ),
    emergency_status: Type.Optional(IncomingPhoneNumberMobileEnumEmergencyStatusSchema),
    emergency_address_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AD[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the emergency address configuration that we use for emergency calling from this phone number.',
        }),
        Type.Null(),
      ]),
    ),
    emergency_address_status: Type.Optional(
      IncomingPhoneNumberMobileEnumEmergencyAddressStatusSchema,
    ),
    bundle_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^BU[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
        }),
        Type.Null(),
      ]),
    ),
    status: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  },
  { ref: 'api.v2010.account.incoming_phone_number.incoming_phone_number_mobile' },
)

export type ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobile = Static<
  typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobileSchema
>

export const IncomingPhoneNumberTollFreeEnumAddressRequirementSchema = Type.Union(
  [Type.Literal('none'), Type.Literal('any'), Type.Literal('local'), Type.Literal('foreign')],
  {
    ref: 'incoming_phone_number_toll_free_enum_address_requirement',
    description:
      'Whether the phone number requires an [Address](https://www.twilio.com/docs/usage/api/address) registered with Twilio. Can be: `none`, `any`, `local`, or `foreign`.',
  },
)

export type IncomingPhoneNumberTollFreeEnumAddressRequirement = Static<
  typeof IncomingPhoneNumberTollFreeEnumAddressRequirementSchema
>

export const IncomingPhoneNumberTollFreeEnumVoiceReceiveModeSchema = Type.Union(
  [Type.Literal('voice'), Type.Literal('fax')],
  { ref: 'incoming_phone_number_toll_free_enum_voice_receive_mode' },
)

export type IncomingPhoneNumberTollFreeEnumVoiceReceiveMode = Static<
  typeof IncomingPhoneNumberTollFreeEnumVoiceReceiveModeSchema
>

export const IncomingPhoneNumberTollFreeEnumEmergencyStatusSchema = Type.Union(
  [Type.Literal('Active'), Type.Literal('Inactive')],
  {
    ref: 'incoming_phone_number_toll_free_enum_emergency_status',
    description:
      'The parameter displays if emergency calling is enabled for this number. Active numbers may place emergency calls by dialing valid emergency numbers for the country.',
  },
)

export type IncomingPhoneNumberTollFreeEnumEmergencyStatus = Static<
  typeof IncomingPhoneNumberTollFreeEnumEmergencyStatusSchema
>

export const IncomingPhoneNumberTollFreeEnumEmergencyAddressStatusSchema = Type.Union(
  [
    Type.Literal('registered'),
    Type.Literal('unregistered'),
    Type.Literal('pending-registration'),
    Type.Literal('registration-failure'),
    Type.Literal('pending-unregistration'),
    Type.Literal('unregistration-failure'),
  ],
  {
    ref: 'incoming_phone_number_toll_free_enum_emergency_address_status',
    description:
      'The status of address registration with emergency services. A registered emergency address will be used during handling of emergency calls from this number.',
  },
)

export type IncomingPhoneNumberTollFreeEnumEmergencyAddressStatus = Static<
  typeof IncomingPhoneNumberTollFreeEnumEmergencyAddressStatusSchema
>

export const ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFreeSchema = Type.Object(
  {
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the resource.',
        }),
        Type.Null(),
      ]),
    ),
    address_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AD[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'The SID of the Address resource associated with the phone number.',
        }),
        Type.Null(),
      ]),
    ),
    address_requirements: Type.Optional(IncomingPhoneNumberTollFreeEnumAddressRequirementSchema),
    api_version: Type.Optional(
      Type.Union([
        Type.String({ description: 'The API version used to start a new TwiML session.' }),
        Type.Null(),
      ]),
    ),
    beta: Type.Optional(
      Type.Union([
        Type.Boolean({
          description:
            'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
        }),
        Type.Null(),
      ]),
    ),
    capabilities: Type.Optional(
      Type.Union([
        Type.Object(
          {
            mms: Type.Optional(Type.Boolean()),
            sms: Type.Optional(Type.Boolean()),
            voice: Type.Optional(Type.Boolean()),
            fax: Type.Optional(Type.Boolean()),
          },
          {
            description:
              'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are  `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
          },
        ),
        Type.Null(),
      ]),
    ),
    date_created: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    date_updated: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    friendly_name: Type.Optional(
      Type.Union([
        Type.String({ description: 'The string that you assigned to describe the resource.' }),
        Type.Null(),
      ]),
    ),
    identity_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^RI[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the Identity resource that we associate with the phone number. Some regions require an Identity to meet local regulations.',
        }),
        Type.Null(),
      ]),
    ),
    phone_number: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
        }),
        Type.Null(),
      ]),
    ),
    origin: Type.Optional(
      Type.Union([
        Type.String({
          description:
            "The phone number's origin. `twilio` identifies Twilio-owned phone numbers and `hosted` identifies hosted phone numbers.",
        }),
        Type.Null(),
      ]),
    ),
    sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^PN[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'The unique string that that we created to identify the resource.',
        }),
        Type.Null(),
      ]),
    ),
    sms_application_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AP[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the application that handles SMS messages sent to the phone number. If an `sms_application_sid` is present, we ignore all `sms_*_url` values and use those of the application.',
        }),
        Type.Null(),
      ]),
    ),
    sms_fallback_method: Type.Optional(
      Type.Union([
        Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
          description:
            'The HTTP method we use to call `sms_fallback_url`. Can be: `GET` or `POST`.',
        }),
        Type.Null(),
      ]),
    ),
    sms_fallback_url: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          description:
            'The URL that we call when an error occurs while retrieving or executing the TwiML from `sms_url`.',
        }),
        Type.Null(),
      ]),
    ),
    sms_method: Type.Optional(
      Type.Union([
        Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
          description: 'The HTTP method we use to call `sms_url`. Can be: `GET` or `POST`.',
        }),
        Type.Null(),
      ]),
    ),
    sms_url: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          description: 'The URL we call when the phone number receives an incoming SMS message.',
        }),
        Type.Null(),
      ]),
    ),
    status_callback: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          description:
            'The URL we call using the `status_callback_method` to send status information to your application.',
        }),
        Type.Null(),
      ]),
    ),
    status_callback_method: Type.Optional(
      Type.Union([
        Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
          description: 'The HTTP method we use to call `status_callback`. Can be: `GET` or `POST`.',
        }),
        Type.Null(),
      ]),
    ),
    trunk_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^TK[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the Trunk that handles calls to the phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
        }),
        Type.Null(),
      ]),
    ),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The URI of the resource, relative to `https://api.twilio.com`.',
        }),
        Type.Null(),
      ]),
    ),
    voice_receive_mode: Type.Optional(IncomingPhoneNumberTollFreeEnumVoiceReceiveModeSchema),
    voice_application_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AP[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the application that handles calls to the phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
        }),
        Type.Null(),
      ]),
    ),
    voice_caller_id_lookup: Type.Optional(
      Type.Union([
        Type.Boolean({
          description:
            "Whether we look up the caller's caller-ID name from the CNAM database ($0.01 per look up). Can be: `true` or `false`.",
        }),
        Type.Null(),
      ]),
    ),
    voice_fallback_method: Type.Optional(
      Type.Union([
        Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
          description:
            'The HTTP method we use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
        }),
        Type.Null(),
      ]),
    ),
    voice_fallback_url: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          description:
            'The URL that we call when an error occurs retrieving or executing the TwiML requested by `url`.',
        }),
        Type.Null(),
      ]),
    ),
    voice_method: Type.Optional(
      Type.Union([
        Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
          description: 'The HTTP method we use to call `voice_url`. Can be: `GET` or `POST`.',
        }),
        Type.Null(),
      ]),
    ),
    voice_url: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          description:
            'The URL we call when the phone number receives a call. The `voice_url` will not be used if a `voice_application_sid` or a `trunk_sid` is set.',
        }),
        Type.Null(),
      ]),
    ),
    emergency_status: Type.Optional(IncomingPhoneNumberTollFreeEnumEmergencyStatusSchema),
    emergency_address_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AD[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the emergency address configuration that we use for emergency calling from this phone number.',
        }),
        Type.Null(),
      ]),
    ),
    emergency_address_status: Type.Optional(
      IncomingPhoneNumberTollFreeEnumEmergencyAddressStatusSchema,
    ),
    bundle_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^BU[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
        }),
        Type.Null(),
      ]),
    ),
    status: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  },
  { ref: 'api.v2010.account.incoming_phone_number.incoming_phone_number_toll_free' },
)

export type ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFree = Static<
  typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFreeSchema
>

export const ApiV2010AccountKeySchema = Type.Object(
  {
    sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^SK[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'The unique string that that we created to identify the Key resource.',
        }),
        Type.Null(),
      ]),
    ),
    friendly_name: Type.Optional(
      Type.Union([
        Type.String({ description: 'The string that you assigned to describe the resource.' }),
        Type.Null(),
      ]),
    ),
    date_created: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    date_updated: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.key' },
)

export type ApiV2010AccountKey = Static<typeof ApiV2010AccountKeySchema>

export const ApiV2010AccountMessageMediaSchema = Type.Object(
  {
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) associated with this Media resource.',
        }),
        Type.Null(),
      ]),
    ),
    content_type: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The default [MIME type](https://en.wikipedia.org/wiki/Internet_media_type) of the media, for example `image/jpeg`, `image/png`, or `image/gif`.',
        }),
        Type.Null(),
      ]),
    ),
    date_created: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT when this Media resource was created, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    date_updated: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT when this Media resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    parent_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^(SM|MM)[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the Message resource that is associated with this Media resource.',
        }),
        Type.Null(),
      ]),
    ),
    sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^ME[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'The unique string that identifies this Media resource.',
        }),
        Type.Null(),
      ]),
    ),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The URI of this Media resource, relative to `https://api.twilio.com`.',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.message.media' },
)

export type ApiV2010AccountMessageMedia = Static<typeof ApiV2010AccountMessageMediaSchema>

export const ApiV2010AccountQueueMemberSchema = Type.Object(
  {
    call_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^CA[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Member resource is associated with.',
        }),
        Type.Null(),
      ]),
    ),
    date_enqueued: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The date that the member was enqueued, given in RFC 2822 format.',
        }),
        Type.Null(),
      ]),
    ),
    position: Type.Optional(
      Type.Integer({ description: "This member's current position in the queue.", default: 0 }),
    ),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The URI of the resource, relative to `https://api.twilio.com`.',
        }),
        Type.Null(),
      ]),
    ),
    wait_time: Type.Optional(
      Type.Integer({
        description: 'The number of seconds the member has been in the queue.',
        default: 0,
      }),
    ),
    queue_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^QU[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'The SID of the Queue the member is in.',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.queue.member' },
)

export type ApiV2010AccountQueueMember = Static<typeof ApiV2010AccountQueueMemberSchema>

export const MessageEnumDirectionSchema = Type.Union(
  [
    Type.Literal('inbound'),
    Type.Literal('outbound-api'),
    Type.Literal('outbound-call'),
    Type.Literal('outbound-reply'),
  ],
  {
    ref: 'message_enum_direction',
    description:
      'The direction of the message. Can be: `inbound` for incoming messages, `outbound-api` for messages created by the REST API, `outbound-call` for messages created during a call, or `outbound-reply` for messages created in response to an incoming message.',
  },
)

export type MessageEnumDirection = Static<typeof MessageEnumDirectionSchema>

export const MessageEnumStatusSchema = Type.Union(
  [
    Type.Literal('queued'),
    Type.Literal('sending'),
    Type.Literal('sent'),
    Type.Literal('failed'),
    Type.Literal('delivered'),
    Type.Literal('undelivered'),
    Type.Literal('receiving'),
    Type.Literal('received'),
    Type.Literal('accepted'),
    Type.Literal('scheduled'),
    Type.Literal('read'),
    Type.Literal('partially_delivered'),
    Type.Literal('canceled'),
  ],
  {
    ref: 'message_enum_status',
    description:
      'The status of the Message. Possible values: `accepted`, `scheduled`, `canceled`, `queued`, `sending`, `sent`, `failed`, `delivered`, `undelivered`, `receiving`, `received`, or `read` (WhatsApp only). For more information, See [detailed descriptions](https://www.twilio.com/docs/sms/api/message-resource#message-status-values).',
  },
)

export type MessageEnumStatus = Static<typeof MessageEnumStatusSchema>

export const ApiV2010AccountMessageSchema = Type.Object(
  {
    body: Type.Optional(
      Type.Union([Type.String({ description: 'The text content of the message' }), Type.Null()]),
    ),
    num_segments: Type.Optional(
      Type.Union([
        Type.String({
          description:
            "The number of segments that make up the complete message. SMS message bodies that exceed the [character limit](https://www.twilio.com/docs/glossary/what-sms-character-limit) are segmented and charged as multiple messages. Note: For messages sent via a Messaging Service, `num_segments` is initially `0`, since a sender hasn't yet been assigned.",
        }),
        Type.Null(),
      ]),
    ),
    direction: Type.Optional(MessageEnumDirectionSchema),
    from: Type.Optional(
      Type.Union([
        Type.String({
          description:
            "The sender's phone number (in [E.164](https://en.wikipedia.org/wiki/E.164) format), [alphanumeric sender ID](https://www.twilio.com/docs/sms/quickstart), [Wireless SIM](https://www.twilio.com/docs/iot/wireless/programmable-wireless-send-machine-machine-sms-commands), [short code](https://www.twilio.com/en-us/messaging/channels/sms/short-codes), or  [channel address](https://www.twilio.com/docs/messaging/channels) (e.g., `whatsapp:+15554449999`). For incoming messages, this is the number or channel address of the sender. For outgoing messages, this value is a Twilio phone number, alphanumeric sender ID, short code, or channel address from which the message is sent.",
        }),
        Type.Null(),
      ]),
    ),
    to: Type.Optional(
      Type.Union([
        Type.String({
          description:
            "The recipient's phone number (in [E.164](https://en.wikipedia.org/wiki/E.164) format) or [channel address](https://www.twilio.com/docs/messaging/channels) (e.g. `whatsapp:+15552229999`)",
        }),
        Type.Null(),
      ]),
    ),
    date_updated: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The [RFC 2822](https://datatracker.ietf.org/doc/html/rfc2822#section-3.3) timestamp (in GMT) of when the Message resource was last updated',
        }),
        Type.Null(),
      ]),
    ),
    price: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The amount billed for the message in the currency specified by `price_unit`. The `price` is populated after the message has been sent/received, and may not be immediately availalble. View the [Pricing page](https://www.twilio.com/en-us/pricing) for more details.',
        }),
        Type.Null(),
      ]),
    ),
    error_message: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The description of the `error_code` if the Message `status` is `failed` or `undelivered`. If no error was encountered, the value is `null`. The value returned in this field for a specific error cause is subject to change as Twilio improves errors. Users should not use the `error_code` and `error_message` fields programmatically.',
        }),
        Type.Null(),
      ]),
    ),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The URI of the Message resource, relative to `https://api.twilio.com`.',
        }),
        Type.Null(),
      ]),
    ),
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) associated with the Message resource',
        }),
        Type.Null(),
      ]),
    ),
    num_media: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The number of media files associated with the Message resource.',
        }),
        Type.Null(),
      ]),
    ),
    status: Type.Optional(MessageEnumStatusSchema),
    messaging_service_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^MG[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Messaging Service](https://www.twilio.com/docs/messaging/api/service-resource) associated with the Message resource. A unique default value is assigned if a Messaging Service is not used.',
        }),
        Type.Null(),
      ]),
    ),
    sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^(SM|MM)[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'The unique, Twilio-provided string that identifies the Message resource.',
        }),
        Type.Null(),
      ]),
    ),
    date_sent: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The [RFC 2822](https://datatracker.ietf.org/doc/html/rfc2822#section-3.3) timestamp (in GMT) of when the Message was sent. For an outgoing message, this is when Twilio sent the message. For an incoming message, this is when Twilio sent the HTTP request to your incoming message webhook URL.',
        }),
        Type.Null(),
      ]),
    ),
    date_created: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The [RFC 2822](https://datatracker.ietf.org/doc/html/rfc2822#section-3.3) timestamp (in GMT) of when the Message resource was created',
        }),
        Type.Null(),
      ]),
    ),
    error_code: Type.Optional(
      Type.Union([
        Type.Integer({
          description:
            'The [error code](https://www.twilio.com/docs/api/errors) returned if the Message `status` is `failed` or `undelivered`. If no error was encountered, the value is `null`. The value returned in this field for a specific error cause is subject to change as Twilio improves errors. Users should not use the `error_code` and `error_message` fields programmatically.',
        }),
        Type.Null(),
      ]),
    ),
    price_unit: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format (e.g. `usd`, `eur`, `jpy`).',
        }),
        Type.Null(),
      ]),
    ),
    api_version: Type.Optional(
      Type.Union([
        Type.String({ description: 'The API version used to process the Message' }),
        Type.Null(),
      ]),
    ),
    subresource_uris: Type.Optional(
      Type.Union([
        Type.Object(
          {},
          {
            description:
              'A list of related resources identified by their URIs relative to `https://api.twilio.com`',
          },
        ),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.message' },
)

export type ApiV2010AccountMessage = Static<typeof ApiV2010AccountMessageSchema>

export const MessageEnumUpdateStatusSchema = Type.Literal('canceled', {
  ref: 'message_enum_update_status',
})

export type MessageEnumUpdateStatus = Static<typeof MessageEnumUpdateStatusSchema>

export const MessageEnumContentRetentionSchema = Type.Union(
  [Type.Literal('retain'), Type.Literal('discard')],
  {
    ref: 'message_enum_content_retention',
    description:
      'Determines if the message content can be stored or redacted based on privacy settings',
  },
)

export type MessageEnumContentRetention = Static<typeof MessageEnumContentRetentionSchema>

export const MessageEnumAddressRetentionSchema = Type.Union(
  [Type.Literal('retain'), Type.Literal('obfuscate')],
  {
    ref: 'message_enum_address_retention',
    description: 'Determines if the address can be stored or obfuscated based on privacy settings',
  },
)

export type MessageEnumAddressRetention = Static<typeof MessageEnumAddressRetentionSchema>

export const MessageEnumTrafficTypeSchema = Type.Literal('free', {
  ref: 'message_enum_traffic_type',
})

export type MessageEnumTrafficType = Static<typeof MessageEnumTrafficTypeSchema>

export const MessageEnumScheduleTypeSchema = Type.Literal('fixed', {
  ref: 'message_enum_schedule_type',
  description:
    'For Messaging Services only: Include this parameter with a value of `fixed` in conjuction with the `send_time` parameter in order to [schedule a Message](https://www.twilio.com/docs/messaging/features/message-scheduling).',
})

export type MessageEnumScheduleType = Static<typeof MessageEnumScheduleTypeSchema>

export const MessageEnumRiskCheckSchema = Type.Union(
  [Type.Literal('enable'), Type.Literal('disable')],
  {
    ref: 'message_enum_risk_check',
    description:
      'Include this parameter with a value of `disable` to skip any kind of risk check on the respective message request.',
  },
)

export type MessageEnumRiskCheck = Static<typeof MessageEnumRiskCheckSchema>

export const MessageFeedbackEnumOutcomeSchema = Type.Union(
  [Type.Literal('confirmed'), Type.Literal('unconfirmed')],
  {
    ref: 'message_feedback_enum_outcome',
    description:
      'Reported outcome indicating whether there is confirmation that the Message recipient performed a tracked user action. Can be: `unconfirmed` or `confirmed`. For more details see [How to Optimize Message Deliverability with Message Feedback](https://www.twilio.com/docs/messaging/guides/send-message-feedback-to-twilio).',
  },
)

export type MessageFeedbackEnumOutcome = Static<typeof MessageFeedbackEnumOutcomeSchema>

export const ApiV2010AccountMessageMessageFeedbackSchema = Type.Object(
  {
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) associated with this MessageFeedback resource.',
        }),
        Type.Null(),
      ]),
    ),
    message_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^(SM|MM)[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the Message resource associated with this MessageFeedback resource.',
        }),
        Type.Null(),
      ]),
    ),
    outcome: Type.Optional(MessageFeedbackEnumOutcomeSchema),
    date_created: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT when this MessageFeedback resource was created, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    date_updated: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT when this MessageFeedback resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The URI of the resource, relative to `https://api.twilio.com`.',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.message.message_feedback' },
)

export type ApiV2010AccountMessageMessageFeedback = Static<
  typeof ApiV2010AccountMessageMessageFeedbackSchema
>

export const ApiV2010AccountNewKeySchema = Type.Object(
  {
    sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^SK[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The unique string that that we created to identify the NewKey resource. You will use this as the basic-auth `user` when authenticating to the API.',
        }),
        Type.Null(),
      ]),
    ),
    friendly_name: Type.Optional(
      Type.Union([
        Type.String({ description: 'The string that you assigned to describe the resource.' }),
        Type.Null(),
      ]),
    ),
    date_created: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the API Key was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    date_updated: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the new API Key was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    secret: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The secret your application uses to sign Access Tokens and to authenticate to the REST API (you will use this as the basic-auth `password`).  **Note that for security reasons, this field is ONLY returned when the API Key is first created.**',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.new_key' },
)

export type ApiV2010AccountNewKey = Static<typeof ApiV2010AccountNewKeySchema>

export const ApiV2010AccountNewSigningKeySchema = Type.Object(
  {
    sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^SK[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The unique string that that we created to identify the NewSigningKey resource.',
        }),
        Type.Null(),
      ]),
    ),
    friendly_name: Type.Optional(
      Type.Union([
        Type.String({ description: 'The string that you assigned to describe the resource.' }),
        Type.Null(),
      ]),
    ),
    date_created: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    date_updated: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    secret: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The secret your application uses to sign Access Tokens and to authenticate to the REST API (you will use this as the basic-auth `password`).  **Note that for security reasons, this field is ONLY returned when the API Key is first created.**',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.new_signing_key' },
)

export type ApiV2010AccountNewSigningKey = Static<typeof ApiV2010AccountNewSigningKeySchema>

export const ApiV2010AccountNotificationSchema = Type.Object(
  {
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Notification resource.',
        }),
        Type.Null(),
      ]),
    ),
    api_version: Type.Optional(
      Type.Union([
        Type.String({
          description:
            "The API version used to generate the notification. Can be empty for events that don't have a specific API version, such as incoming phone calls.",
        }),
        Type.Null(),
      ]),
    ),
    call_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^CA[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Notification resource is associated with.',
        }),
        Type.Null(),
      ]),
    ),
    date_created: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    date_updated: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    error_code: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'A unique error code for the error condition that is described in our [Error Dictionary](https://www.twilio.com/docs/api/errors).',
        }),
        Type.Null(),
      ]),
    ),
    log: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'An integer log level that corresponds to the type of notification: `0` is ERROR, `1` is WARNING.',
        }),
        Type.Null(),
      ]),
    ),
    message_date: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date the notification was actually generated in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. Message buffering can cause this value to differ from `date_created`.',
        }),
        Type.Null(),
      ]),
    ),
    message_text: Type.Optional(
      Type.Union([Type.String({ description: 'The text of the notification.' }), Type.Null()]),
    ),
    more_info: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          description:
            'The URL for more information about the error condition. This value is a page in our [Error Dictionary](https://www.twilio.com/docs/api/errors).',
        }),
        Type.Null(),
      ]),
    ),
    request_method: Type.Optional(
      Type.Union([
        Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
          description:
            'The HTTP method used to generate the notification. If the notification was generated during a phone call, this is the HTTP Method used to request the resource on your server. If the notification was generated by your use of our REST API, this is the HTTP method used to call the resource on our servers.',
        }),
        Type.Null(),
      ]),
    ),
    request_url: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          description:
            'The URL of the resource that generated the notification. If the notification was generated during a phone call, this is the URL of the resource on your server that caused the notification. If the notification was generated by your use of our REST API, this is the URL of the resource you called.',
        }),
        Type.Null(),
      ]),
    ),
    sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^NO[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The unique string that that we created to identify the Notification resource.',
        }),
        Type.Null(),
      ]),
    ),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The URI of the resource, relative to `https://api.twilio.com`.',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.notification' },
)

export type ApiV2010AccountNotification = Static<typeof ApiV2010AccountNotificationSchema>

export const ApiV2010AccountNotificationInstanceSchema = Type.Object(
  {
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Notification resource.',
        }),
        Type.Null(),
      ]),
    ),
    api_version: Type.Optional(
      Type.Union([
        Type.String({
          description:
            "The API version used to generate the notification. Can be empty for events that don't have a specific API version, such as incoming phone calls.",
        }),
        Type.Null(),
      ]),
    ),
    call_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^CA[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Notification resource is associated with.',
        }),
        Type.Null(),
      ]),
    ),
    date_created: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    date_updated: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    error_code: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'A unique error code for the error condition that is described in our [Error Dictionary](https://www.twilio.com/docs/api/errors).',
        }),
        Type.Null(),
      ]),
    ),
    log: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'An integer log level that corresponds to the type of notification: `0` is ERROR, `1` is WARNING.',
        }),
        Type.Null(),
      ]),
    ),
    message_date: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date the notification was actually generated in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. Message buffering can cause this value to differ from `date_created`.',
        }),
        Type.Null(),
      ]),
    ),
    message_text: Type.Optional(
      Type.Union([Type.String({ description: 'The text of the notification.' }), Type.Null()]),
    ),
    more_info: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          description:
            'The URL for more information about the error condition. This value is a page in our [Error Dictionary](https://www.twilio.com/docs/api/errors).',
        }),
        Type.Null(),
      ]),
    ),
    request_method: Type.Optional(
      Type.Union([
        Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
          description:
            'The HTTP method used to generate the notification. If the notification was generated during a phone call, this is the HTTP Method used to request the resource on your server. If the notification was generated by your use of our REST API, this is the HTTP method used to call the resource on our servers.',
        }),
        Type.Null(),
      ]),
    ),
    request_url: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          description:
            'The URL of the resource that generated the notification. If the notification was generated during a phone call, this is the URL of the resource on your server that caused the notification. If the notification was generated by your use of our REST API, this is the URL of the resource you called.',
        }),
        Type.Null(),
      ]),
    ),
    request_variables: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The HTTP GET or POST variables we sent to your server. However, if the notification was generated by our REST API, this contains the HTTP POST or PUT variables you sent to our API.',
        }),
        Type.Null(),
      ]),
    ),
    response_body: Type.Optional(
      Type.Union([
        Type.String({ description: 'The HTTP body returned by your server.' }),
        Type.Null(),
      ]),
    ),
    response_headers: Type.Optional(
      Type.Union([
        Type.String({ description: 'The HTTP headers returned by your server.' }),
        Type.Null(),
      ]),
    ),
    sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^NO[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The unique string that that we created to identify the Notification resource.',
        }),
        Type.Null(),
      ]),
    ),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The URI of the resource, relative to `https://api.twilio.com`.',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.notification-instance' },
)

export type ApiV2010AccountNotificationInstance = Static<
  typeof ApiV2010AccountNotificationInstanceSchema
>

export const ApiV2010AccountOutgoingCallerIdSchema = Type.Object(
  {
    sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^PN[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The unique string that that we created to identify the OutgoingCallerId resource.',
        }),
        Type.Null(),
      ]),
    ),
    date_created: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    date_updated: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    friendly_name: Type.Optional(
      Type.Union([
        Type.String({ description: 'The string that you assigned to describe the resource.' }),
        Type.Null(),
      ]),
    ),
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the OutgoingCallerId resource.',
        }),
        Type.Null(),
      ]),
    ),
    phone_number: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
        }),
        Type.Null(),
      ]),
    ),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The URI of the resource, relative to `https://api.twilio.com`.',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.outgoing_caller_id' },
)

export type ApiV2010AccountOutgoingCallerId = Static<typeof ApiV2010AccountOutgoingCallerIdSchema>

export const ParticipantEnumStatusSchema = Type.Union(
  [
    Type.Literal('queued'),
    Type.Literal('connecting'),
    Type.Literal('ringing'),
    Type.Literal('connected'),
    Type.Literal('complete'),
    Type.Literal('failed'),
  ],
  {
    ref: 'participant_enum_status',
    description:
      "The status of the participant's call in a session. Can be: `queued`, `connecting`, `ringing`, `connected`, `complete`, or `failed`.",
  },
)

export type ParticipantEnumStatus = Static<typeof ParticipantEnumStatusSchema>

export const ApiV2010AccountConferenceParticipantSchema = Type.Object(
  {
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Participant resource.',
        }),
        Type.Null(),
      ]),
    ),
    call_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^CA[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Participant resource is associated with.',
        }),
        Type.Null(),
      ]),
    ),
    label: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The user-specified label of this participant, if one was given when the participant was created. This may be used to fetch, update or delete the participant.',
        }),
        Type.Null(),
      ]),
    ),
    call_sid_to_coach: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^CA[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the participant who is being `coached`. The participant being coached is the only participant who can hear the participant who is `coaching`.',
        }),
        Type.Null(),
      ]),
    ),
    coaching: Type.Optional(
      Type.Union([
        Type.Boolean({
          description:
            'Whether the participant is coaching another call. Can be: `true` or `false`. If not present, defaults to `false` unless `call_sid_to_coach` is defined. If `true`, `call_sid_to_coach` must be defined.',
        }),
        Type.Null(),
      ]),
    ),
    conference_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^CF[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'The SID of the conference the participant is in.',
        }),
        Type.Null(),
      ]),
    ),
    date_created: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    date_updated: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    end_conference_on_exit: Type.Optional(
      Type.Union([
        Type.Boolean({
          description:
            'Whether the conference ends when the participant leaves. Can be: `true` or `false` and the default is `false`. If `true`, the conference ends and all other participants drop out when the participant leaves.',
        }),
        Type.Null(),
      ]),
    ),
    muted: Type.Optional(
      Type.Union([
        Type.Boolean({
          description: 'Whether the participant is muted. Can be `true` or `false`.',
        }),
        Type.Null(),
      ]),
    ),
    hold: Type.Optional(
      Type.Union([
        Type.Boolean({
          description: 'Whether the participant is on hold. Can be `true` or `false`.',
        }),
        Type.Null(),
      ]),
    ),
    start_conference_on_enter: Type.Optional(
      Type.Union([
        Type.Boolean({
          description:
            'Whether the conference starts when the participant joins the conference, if it has not already started. Can be: `true` or `false` and the default is `true`. If `false` and the conference has not started, the participant is muted and hears background music until another participant starts the conference.',
        }),
        Type.Null(),
      ]),
    ),
    status: Type.Optional(ParticipantEnumStatusSchema),
    queue_time: Type.Optional(
      Type.Union([
        Type.String({
          description:
            "The wait time in milliseconds before participant's call is placed. Only available in the response to a create participant request.",
        }),
        Type.Null(),
      ]),
    ),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The URI of the resource, relative to `https://api.twilio.com`.',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.conference.participant' },
)

export type ApiV2010AccountConferenceParticipant = Static<
  typeof ApiV2010AccountConferenceParticipantSchema
>

export const ApiV2010AccountCallPaymentsSchema = Type.Object(
  {
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Payments resource.',
        }),
        Type.Null(),
      ]),
    ),
    call_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^CA[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Payments resource is associated with. This will refer to the call sid that is producing the payment card (credit/ACH) information thru DTMF.',
        }),
        Type.Null(),
      ]),
    ),
    sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^PK[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'The SID of the Payments resource.',
        }),
        Type.Null(),
      ]),
    ),
    date_created: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    date_updated: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The URI of the resource, relative to `https://api.twilio.com`.',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.call.payments' },
)

export type ApiV2010AccountCallPayments = Static<typeof ApiV2010AccountCallPaymentsSchema>

export const PaymentsEnumPaymentMethodSchema = Type.Union(
  [Type.Literal('credit-card'), Type.Literal('ach-debit')],
  {
    ref: 'payments_enum_payment_method',
    description:
      'Type of payment being captured. One of `credit-card` or `ach-debit`. The default value is `credit-card`.',
  },
)

export type PaymentsEnumPaymentMethod = Static<typeof PaymentsEnumPaymentMethodSchema>

export const PaymentsEnumBankAccountTypeSchema = Type.Union(
  [
    Type.Literal('consumer-checking'),
    Type.Literal('consumer-savings'),
    Type.Literal('commercial-checking'),
  ],
  {
    ref: 'payments_enum_bank_account_type',
    description:
      'Type of bank account if payment source is ACH. One of `consumer-checking`, `consumer-savings`, or `commercial-checking`. The default value is `consumer-checking`.',
  },
)

export type PaymentsEnumBankAccountType = Static<typeof PaymentsEnumBankAccountTypeSchema>

export const PaymentsEnumTokenTypeSchema = Type.Union(
  [Type.Literal('one-time'), Type.Literal('reusable'), Type.Literal('payment-method')],
  {
    ref: 'payments_enum_token_type',
    description:
      'Indicates whether the payment method should be tokenized as a `one-time`, `reusable`, or `payment-method` token. The default value is `reusable`. Do not enter a charge amount when tokenizing. If a charge amount is entered, the payment method will be charged and not tokenized.',
  },
)

export type PaymentsEnumTokenType = Static<typeof PaymentsEnumTokenTypeSchema>

export const PaymentsEnumCaptureSchema = Type.Union(
  [
    Type.Literal('payment-card-number'),
    Type.Literal('expiration-date'),
    Type.Literal('security-code'),
    Type.Literal('postal-code'),
    Type.Literal('bank-routing-number'),
    Type.Literal('bank-account-number'),
    Type.Literal('payment-card-number-matcher'),
    Type.Literal('expiration-date-matcher'),
    Type.Literal('security-code-matcher'),
    Type.Literal('postal-code-matcher'),
  ],
  {
    ref: 'payments_enum_capture',
    description:
      'The piece of payment information that you wish the caller to enter. Must be one of `payment-card-number`, `expiration-date`, `security-code`, `postal-code`, `bank-routing-number`, `bank-account-number`, or their `-matcher` variants for input confirmation when `RequireMatchingInputs` is enabled.',
  },
)

export type PaymentsEnumCapture = Static<typeof PaymentsEnumCaptureSchema>

export const PaymentsEnumStatusSchema = Type.Union(
  [Type.Literal('complete'), Type.Literal('cancel')],
  {
    ref: 'payments_enum_status',
    description:
      'Indicates whether the current payment session should be cancelled or completed. When `cancel` the payment session is cancelled. When `complete`, Twilio sends the payment information to the selected Pay Connector for processing.',
  },
)

export type PaymentsEnumStatus = Static<typeof PaymentsEnumStatusSchema>

export const ApiV2010AccountQueueSchema = Type.Object(
  {
    date_updated: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    current_size: Type.Optional(
      Type.Integer({ description: 'The number of calls currently in the queue.', default: 0 }),
    ),
    friendly_name: Type.Optional(
      Type.Union([
        Type.String({ description: 'A string that you assigned to describe this resource.' }),
        Type.Null(),
      ]),
    ),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The URI of this resource, relative to `https://api.twilio.com`.',
        }),
        Type.Null(),
      ]),
    ),
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Queue resource.',
        }),
        Type.Null(),
      ]),
    ),
    average_wait_time: Type.Optional(
      Type.Integer({
        description:
          ' The average wait time in seconds of the members in this queue. This is calculated at the time of the request.',
        default: 0,
      }),
    ),
    sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^QU[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'The unique string that that we created to identify this Queue resource.',
        }),
        Type.Null(),
      ]),
    ),
    date_created: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that this resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    max_size: Type.Optional(
      Type.Integer({
        description:
          ' The maximum number of calls that can be in the queue. The default is 1000 and the maximum is 5000.',
        default: 0,
      }),
    ),
  },
  { ref: 'api.v2010.account.queue' },
)

export type ApiV2010AccountQueue = Static<typeof ApiV2010AccountQueueSchema>

export const RealtimeTranscriptionEnumStatusSchema = Type.Union(
  [Type.Literal('in-progress'), Type.Literal('stopped')],
  {
    ref: 'realtime_transcription_enum_status',
    description: 'The status - one of `stopped`, `in-flight`',
  },
)

export type RealtimeTranscriptionEnumStatus = Static<typeof RealtimeTranscriptionEnumStatusSchema>

export const ApiV2010AccountCallRealtimeTranscriptionSchema = Type.Object(
  {
    sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^GT[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'The SID of the Transcription resource.',
        }),
        Type.Null(),
      ]),
    ),
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Transcription resource.',
        }),
        Type.Null(),
      ]),
    ),
    call_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^CA[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Transcription resource is associated with.',
        }),
        Type.Null(),
      ]),
    ),
    name: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The user-specified name of this Transcription, if one was given when the Transcription was created. This may be used to stop the Transcription.',
        }),
        Type.Null(),
      ]),
    ),
    status: Type.Optional(RealtimeTranscriptionEnumStatusSchema),
    date_updated: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    uri: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  },
  { ref: 'api.v2010.account.call.realtime_transcription' },
)

export type ApiV2010AccountCallRealtimeTranscription = Static<
  typeof ApiV2010AccountCallRealtimeTranscriptionSchema
>

export const RealtimeTranscriptionEnumTrackSchema = Type.Union(
  [Type.Literal('inbound_track'), Type.Literal('outbound_track'), Type.Literal('both_tracks')],
  {
    ref: 'realtime_transcription_enum_track',
    description: 'One of `inbound_track`, `outbound_track`, `both_tracks`.',
  },
)

export type RealtimeTranscriptionEnumTrack = Static<typeof RealtimeTranscriptionEnumTrackSchema>

export const RealtimeTranscriptionEnumUpdateStatusSchema = Type.Literal('stopped', {
  ref: 'realtime_transcription_enum_update_status',
})

export type RealtimeTranscriptionEnumUpdateStatus = Static<
  typeof RealtimeTranscriptionEnumUpdateStatusSchema
>

export const RecordingEnumStatusSchema = Type.Union(
  [
    Type.Literal('in-progress'),
    Type.Literal('paused'),
    Type.Literal('stopped'),
    Type.Literal('processing'),
    Type.Literal('completed'),
    Type.Literal('absent'),
    Type.Literal('deleted'),
  ],
  {
    ref: 'recording_enum_status',
    description:
      'The status of the recording. Can be: `processing`, `completed`, `absent` or `deleted`. For information about more detailed statuses on in-progress recordings, check out how to [Update a Recording Resource](https://www.twilio.com/docs/voice/api/recording#update-a-recording-resource).',
  },
)

export type RecordingEnumStatus = Static<typeof RecordingEnumStatusSchema>

export const RecordingEnumSourceSchema = Type.Union(
  [
    Type.Literal('DialVerb'),
    Type.Literal('Conference'),
    Type.Literal('OutboundAPI'),
    Type.Literal('Trunking'),
    Type.Literal('RecordVerb'),
    Type.Literal('StartCallRecordingAPI'),
    Type.Literal('StartConferenceRecordingAPI'),
  ],
  {
    ref: 'recording_enum_source',
    description:
      'How the recording was created. Can be: `DialVerb`, `Conference`, `OutboundAPI`, `Trunking`, `RecordVerb`, `StartCallRecordingAPI`, and `StartConferenceRecordingAPI`.',
  },
)

export type RecordingEnumSource = Static<typeof RecordingEnumSourceSchema>

export const ApiV2010AccountRecordingSchema = Type.Object(
  {
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording resource.',
        }),
        Type.Null(),
      ]),
    ),
    api_version: Type.Optional(
      Type.Union([
        Type.String({ description: 'The API version used during the recording.' }),
        Type.Null(),
      ]),
    ),
    call_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^CA[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Recording resource is associated with. This will always refer to the parent leg of a two-leg call.',
        }),
        Type.Null(),
      ]),
    ),
    conference_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^CF[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The Conference SID that identifies the conference associated with the recording, if a conference recording.',
        }),
        Type.Null(),
      ]),
    ),
    date_created: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    date_updated: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    start_time: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The start time of the recording in GMT and in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
        }),
        Type.Null(),
      ]),
    ),
    duration: Type.Optional(
      Type.Union([
        Type.String({ description: 'The length of the recording in seconds.' }),
        Type.Null(),
      ]),
    ),
    sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^RE[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'The unique string that that we created to identify the Recording resource.',
        }),
        Type.Null(),
      ]),
    ),
    price: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The one-time cost of creating the recording in the `price_unit` currency.',
        }),
        Type.Null(),
      ]),
    ),
    price_unit: Type.Optional(
      Type.Union([
        Type.String({ description: 'The currency used in the `price` property. Example: `USD`.' }),
        Type.Null(),
      ]),
    ),
    status: Type.Optional(RecordingEnumStatusSchema),
    channels: Type.Optional(
      Type.Union([
        Type.Integer({
          description:
            'The number of channels in the recording resource. For information on specifying the number of channels in the downloaded recording file, check out [Fetch a Recording’s media file](https://www.twilio.com/docs/voice/api/recording#download-dual-channel-media-file).',
        }),
        Type.Null(),
      ]),
    ),
    source: Type.Optional(RecordingEnumSourceSchema),
    error_code: Type.Optional(
      Type.Union([
        Type.Integer({
          description:
            'The error code that describes why the recording is `absent`. The error code is described in our [Error Dictionary](https://www.twilio.com/docs/api/errors). This value is null if the recording `status` is not `absent`.',
        }),
        Type.Null(),
      ]),
    ),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The URI of the resource, relative to `https://api.twilio.com`.',
        }),
        Type.Null(),
      ]),
    ),
    encryption_details: Type.Optional(
      Type.Union([
        Type.Any({
          description:
            'How to decrypt the recording if it was encrypted using [Call Recording Encryption](https://www.twilio.com/docs/voice/tutorials/voice-recording-encryption) feature.',
        }),
        Type.Null(),
      ]),
    ),
    subresource_uris: Type.Optional(
      Type.Union([
        Type.Object(
          {},
          { description: 'A list of related resources identified by their relative URIs.' },
        ),
        Type.Null(),
      ]),
    ),
    media_url: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          description:
            'The URL of the media file associated with this recording resource. When stored externally, this is the full URL location of the media file.',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.recording' },
)

export type ApiV2010AccountRecording = Static<typeof ApiV2010AccountRecordingSchema>

export const RecordingAddOnResultEnumStatusSchema = Type.Union(
  [
    Type.Literal('canceled'),
    Type.Literal('completed'),
    Type.Literal('deleted'),
    Type.Literal('failed'),
    Type.Literal('in-progress'),
    Type.Literal('init'),
    Type.Literal('processing'),
    Type.Literal('queued'),
  ],
  {
    ref: 'recording_add_on_result_enum_status',
    description:
      'The status of the result. Can be: `canceled`, `completed`, `deleted`, `failed`, `in-progress`, `init`, `processing`, `queued`.',
  },
)

export type RecordingAddOnResultEnumStatus = Static<typeof RecordingAddOnResultEnumStatusSchema>

export const ApiV2010AccountRecordingRecordingAddOnResultSchema = Type.Object(
  {
    sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^XR[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The unique string that that we created to identify the Recording AddOnResult resource.',
        }),
        Type.Null(),
      ]),
    ),
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording AddOnResult resource.',
        }),
        Type.Null(),
      ]),
    ),
    status: Type.Optional(RecordingAddOnResultEnumStatusSchema),
    add_on_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^XB[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'The SID of the Add-on to which the result belongs.',
        }),
        Type.Null(),
      ]),
    ),
    add_on_configuration_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^XE[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'The SID of the Add-on configuration.',
        }),
        Type.Null(),
      ]),
    ),
    date_created: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    date_updated: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    date_completed: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the result was completed specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    reference_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^RE[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'The SID of the recording to which the AddOnResult resource belongs.',
        }),
        Type.Null(),
      ]),
    ),
    subresource_uris: Type.Optional(
      Type.Union([
        Type.Object(
          {},
          { description: 'A list of related resources identified by their relative URIs.' },
        ),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.recording.recording_add_on_result' },
)

export type ApiV2010AccountRecordingRecordingAddOnResult = Static<
  typeof ApiV2010AccountRecordingRecordingAddOnResultSchema
>

export const ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadSchema =
  Type.Object(
    {
      sid: Type.Optional(
        Type.Union([
          Type.String({
            pattern: '^XH[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The unique string that that we created to identify the Recording AddOnResult Payload resource.',
          }),
          Type.Null(),
        ]),
      ),
      add_on_result_sid: Type.Optional(
        Type.Union([
          Type.String({
            pattern: '^XR[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description: 'The SID of the AddOnResult to which the payload belongs.',
          }),
          Type.Null(),
        ]),
      ),
      account_sid: Type.Optional(
        Type.Union([
          Type.String({
            pattern: '^AC[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording AddOnResult Payload resource.',
          }),
          Type.Null(),
        ]),
      ),
      label: Type.Optional(
        Type.Union([
          Type.String({
            description: 'The string provided by the vendor that describes the payload.',
          }),
          Type.Null(),
        ]),
      ),
      add_on_sid: Type.Optional(
        Type.Union([
          Type.String({
            pattern: '^XB[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description: 'The SID of the Add-on to which the result belongs.',
          }),
          Type.Null(),
        ]),
      ),
      add_on_configuration_sid: Type.Optional(
        Type.Union([
          Type.String({
            pattern: '^XE[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description: 'The SID of the Add-on configuration.',
          }),
          Type.Null(),
        ]),
      ),
      content_type: Type.Optional(
        Type.Union([Type.String({ description: 'The MIME type of the payload.' }), Type.Null()]),
      ),
      date_created: Type.Optional(
        Type.Union([
          Type.String({
            description:
              'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
          }),
          Type.Null(),
        ]),
      ),
      date_updated: Type.Optional(
        Type.Union([
          Type.String({
            description:
              'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
          }),
          Type.Null(),
        ]),
      ),
      reference_sid: Type.Optional(
        Type.Union([
          Type.String({
            pattern: '^RE[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The SID of the recording to which the AddOnResult resource that contains the payload belongs.',
          }),
          Type.Null(),
        ]),
      ),
      subresource_uris: Type.Optional(
        Type.Union([
          Type.Object(
            {},
            { description: 'A list of related resources identified by their relative URIs.' },
          ),
          Type.Null(),
        ]),
      ),
    },
    { ref: 'api.v2010.account.recording.recording_add_on_result.recording_add_on_result_payload' },
  )

export type ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayload = Static<
  typeof ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadSchema
>

export const ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadRecordingAddOnResultPayloadDataSchema =
  Type.Object(
    {
      redirect_to: Type.Optional(
        Type.Union([
          Type.String({
            format: 'uri',
            description:
              'The URL to redirect to to get the data returned by the AddOn that was previously stored.',
          }),
          Type.Null(),
        ]),
      ),
    },
    {
      ref: 'api.v2010.account.recording.recording_add_on_result.recording_add_on_result_payload.recording_add_on_result_payload_data',
    },
  )

export type ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadRecordingAddOnResultPayloadData =
  Static<
    typeof ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadRecordingAddOnResultPayloadDataSchema
  >

export const RecordingTranscriptionEnumStatusSchema = Type.Union(
  [Type.Literal('in-progress'), Type.Literal('completed'), Type.Literal('failed')],
  {
    ref: 'recording_transcription_enum_status',
    description: 'The status of the transcription. Can be: `in-progress`, `completed`, `failed`.',
  },
)

export type RecordingTranscriptionEnumStatus = Static<typeof RecordingTranscriptionEnumStatusSchema>

export const ApiV2010AccountRecordingRecordingTranscriptionSchema = Type.Object(
  {
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Transcription resource.',
        }),
        Type.Null(),
      ]),
    ),
    api_version: Type.Optional(
      Type.Union([
        Type.String({ description: 'The API version used to create the transcription.' }),
        Type.Null(),
      ]),
    ),
    date_created: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    date_updated: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    duration: Type.Optional(
      Type.Union([
        Type.String({ description: 'The duration of the transcribed audio in seconds.' }),
        Type.Null(),
      ]),
    ),
    price: Type.Optional(
      Type.Union([
        Type.Number({
          description:
            'The charge for the transcript in the currency associated with the account. This value is populated after the transcript is complete so it may not be available immediately.',
        }),
        Type.Null(),
      ]),
    ),
    price_unit: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format (e.g. `usd`, `eur`, `jpy`).',
        }),
        Type.Null(),
      ]),
    ),
    recording_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^RE[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Recording](https://www.twilio.com/docs/voice/api/recording) from which the transcription was created.',
        }),
        Type.Null(),
      ]),
    ),
    sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^TR[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The unique string that that we created to identify the Transcription resource.',
        }),
        Type.Null(),
      ]),
    ),
    status: Type.Optional(RecordingTranscriptionEnumStatusSchema),
    transcription_text: Type.Optional(
      Type.Union([
        Type.String({ description: 'The text content of the transcription.' }),
        Type.Null(),
      ]),
    ),
    type: Type.Optional(
      Type.Union([Type.String({ description: 'The transcription type.' }), Type.Null()]),
    ),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The URI of the resource, relative to `https://api.twilio.com`.',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.recording.recording_transcription' },
)

export type ApiV2010AccountRecordingRecordingTranscription = Static<
  typeof ApiV2010AccountRecordingRecordingTranscriptionSchema
>

export const ApiV2010AccountShortCodeSchema = Type.Object(
  {
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this ShortCode resource.',
        }),
        Type.Null(),
      ]),
    ),
    api_version: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The API version used to start a new TwiML session when an SMS message is sent to this short code.',
        }),
        Type.Null(),
      ]),
    ),
    date_created: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that this resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    date_updated: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    friendly_name: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'A string that you assigned to describe this resource. By default, the `FriendlyName` is the short code.',
        }),
        Type.Null(),
      ]),
    ),
    short_code: Type.Optional(
      Type.Union([Type.String({ description: 'The short code. e.g., 894546.' }), Type.Null()]),
    ),
    sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^SC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The unique string that that we created to identify this ShortCode resource.',
        }),
        Type.Null(),
      ]),
    ),
    sms_fallback_method: Type.Optional(
      Type.Union([
        Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
          description:
            'The HTTP method we use to call the `sms_fallback_url`. Can be: `GET` or `POST`.',
        }),
        Type.Null(),
      ]),
    ),
    sms_fallback_url: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          description:
            'The URL that we call if an error occurs while retrieving or executing the TwiML from `sms_url`.',
        }),
        Type.Null(),
      ]),
    ),
    sms_method: Type.Optional(
      Type.Union([
        Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
          description: 'The HTTP method we use to call the `sms_url`. Can be: `GET` or `POST`.',
        }),
        Type.Null(),
      ]),
    ),
    sms_url: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          description: 'The URL we call when receiving an incoming SMS message to this short code.',
        }),
        Type.Null(),
      ]),
    ),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The URI of this resource, relative to `https://api.twilio.com`.',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.short_code' },
)

export type ApiV2010AccountShortCode = Static<typeof ApiV2010AccountShortCodeSchema>

export const ApiV2010AccountSigningKeySchema = Type.Object(
  {
    sid: Type.Optional(
      Type.Union([
        Type.String({ pattern: '^SK[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }),
        Type.Null(),
      ]),
    ),
    friendly_name: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    date_created: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    date_updated: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  },
  { ref: 'api.v2010.account.signing_key' },
)

export type ApiV2010AccountSigningKey = Static<typeof ApiV2010AccountSigningKeySchema>

export const ApiV2010AccountSipSchema = Type.Object({}, { ref: 'api.v2010.account.sip' })

export type ApiV2010AccountSip = Static<typeof ApiV2010AccountSipSchema>

export const ApiV2010AccountSipSipDomainSipAuthSchema = Type.Object(
  {},
  { ref: 'api.v2010.account.sip.sip_domain.sip_auth' },
)

export type ApiV2010AccountSipSipDomainSipAuth = Static<
  typeof ApiV2010AccountSipSipDomainSipAuthSchema
>

export const ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSchema = Type.Object(
  {},
  { ref: 'api.v2010.account.sip.sip_domain.sip_auth.sip_auth_calls' },
)

export type ApiV2010AccountSipSipDomainSipAuthSipAuthCalls = Static<
  typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSchema
>

export const ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema =
  Type.Object(
    {
      account_sid: Type.Optional(
        Type.Union([
          Type.String({
            pattern: '^AC[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the CredentialListMapping resource.',
          }),
          Type.Null(),
        ]),
      ),
      date_created: Type.Optional(
        Type.Union([
          Type.String({
            description:
              'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
          }),
          Type.Null(),
        ]),
      ),
      date_updated: Type.Optional(
        Type.Union([
          Type.String({
            description:
              'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
          }),
          Type.Null(),
        ]),
      ),
      friendly_name: Type.Optional(
        Type.Union([
          Type.String({ description: 'The string that you assigned to describe the resource.' }),
          Type.Null(),
        ]),
      ),
      sid: Type.Optional(
        Type.Union([
          Type.String({
            pattern: '^CL[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The unique string that that we created to identify the CredentialListMapping resource.',
          }),
          Type.Null(),
        ]),
      ),
    },
    {
      ref: 'api.v2010.account.sip.sip_domain.sip_auth.sip_auth_calls.sip_auth_calls_credential_list_mapping',
    },
  )

export type ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMapping =
  Static<
    typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema
  >

export const ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema =
  Type.Object(
    {
      account_sid: Type.Optional(
        Type.Union([
          Type.String({
            pattern: '^AC[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the IpAccessControlListMapping resource.',
          }),
          Type.Null(),
        ]),
      ),
      date_created: Type.Optional(
        Type.Union([
          Type.String({
            description:
              'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
          }),
          Type.Null(),
        ]),
      ),
      date_updated: Type.Optional(
        Type.Union([
          Type.String({
            description:
              'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
          }),
          Type.Null(),
        ]),
      ),
      friendly_name: Type.Optional(
        Type.Union([
          Type.String({ description: 'The string that you assigned to describe the resource.' }),
          Type.Null(),
        ]),
      ),
      sid: Type.Optional(
        Type.Union([
          Type.String({
            pattern: '^AL[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The unique string that that we created to identify the IpAccessControlListMapping resource.',
          }),
          Type.Null(),
        ]),
      ),
    },
    {
      ref: 'api.v2010.account.sip.sip_domain.sip_auth.sip_auth_calls.sip_auth_calls_ip_access_control_list_mapping',
    },
  )

export type ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMapping =
  Static<
    typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema
  >

export const ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSchema = Type.Object(
  {},
  { ref: 'api.v2010.account.sip.sip_domain.sip_auth.sip_auth_registrations' },
)

export type ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrations = Static<
  typeof ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSchema
>

export const ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema =
  Type.Object(
    {
      account_sid: Type.Optional(
        Type.Union([
          Type.String({
            pattern: '^AC[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the CredentialListMapping resource.',
          }),
          Type.Null(),
        ]),
      ),
      date_created: Type.Optional(
        Type.Union([
          Type.String({
            description:
              'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
          }),
          Type.Null(),
        ]),
      ),
      date_updated: Type.Optional(
        Type.Union([
          Type.String({
            description:
              'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
          }),
          Type.Null(),
        ]),
      ),
      friendly_name: Type.Optional(
        Type.Union([
          Type.String({ description: 'The string that you assigned to describe the resource.' }),
          Type.Null(),
        ]),
      ),
      sid: Type.Optional(
        Type.Union([
          Type.String({
            pattern: '^CL[0-9a-fA-F]{32}$',
            minLength: 34,
            maxLength: 34,
            description:
              'The unique string that that we created to identify the CredentialListMapping resource.',
          }),
          Type.Null(),
        ]),
      ),
    },
    {
      ref: 'api.v2010.account.sip.sip_domain.sip_auth.sip_auth_registrations.sip_auth_registrations_credential_list_mapping',
    },
  )

export type ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMapping =
  Static<
    typeof ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema
  >

export const ApiV2010AccountSipSipCredentialListSipCredentialSchema = Type.Object(
  {
    sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^CR[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'A 34 character string that uniquely identifies this resource.',
        }),
        Type.Null(),
      ]),
    ),
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'The unique id of the Account that is responsible for this resource.',
        }),
        Type.Null(),
      ]),
    ),
    credential_list_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^CL[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The unique id that identifies the credential list that includes this credential.',
        }),
        Type.Null(),
      ]),
    ),
    username: Type.Optional(
      Type.Union([Type.String({ description: 'The username for this credential.' }), Type.Null()]),
    ),
    date_created: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date that this resource was created, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
        }),
        Type.Null(),
      ]),
    ),
    date_updated: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date that this resource was last updated, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
        }),
        Type.Null(),
      ]),
    ),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The URI for this resource, relative to `https://api.twilio.com`',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.sip.sip_credential_list.sip_credential' },
)

export type ApiV2010AccountSipSipCredentialListSipCredential = Static<
  typeof ApiV2010AccountSipSipCredentialListSipCredentialSchema
>

export const ApiV2010AccountSipSipCredentialListSchema = Type.Object(
  {
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The unique id of the [Account](https://www.twilio.com/docs/iam/api/account) that owns this resource.',
        }),
        Type.Null(),
      ]),
    ),
    date_created: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date that this resource was created, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
        }),
        Type.Null(),
      ]),
    ),
    date_updated: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date that this resource was last updated, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
        }),
        Type.Null(),
      ]),
    ),
    friendly_name: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'A human readable descriptive text that describes the CredentialList, up to 64 characters long.',
        }),
        Type.Null(),
      ]),
    ),
    sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^CL[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'A 34 character string that uniquely identifies this resource.',
        }),
        Type.Null(),
      ]),
    ),
    subresource_uris: Type.Optional(
      Type.Union([
        Type.Object(
          {},
          { description: 'A list of credentials associated with this credential list.' },
        ),
        Type.Null(),
      ]),
    ),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The URI for this resource, relative to `https://api.twilio.com`.',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.sip.sip_credential_list' },
)

export type ApiV2010AccountSipSipCredentialList = Static<
  typeof ApiV2010AccountSipSipCredentialListSchema
>

export const ApiV2010AccountSipSipDomainSipCredentialListMappingSchema = Type.Object(
  {
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'The unique id of the Account that is responsible for this resource.',
        }),
        Type.Null(),
      ]),
    ),
    date_created: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date that this resource was created, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
        }),
        Type.Null(),
      ]),
    ),
    date_updated: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date that this resource was last updated, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
        }),
        Type.Null(),
      ]),
    ),
    domain_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^SD[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'The unique string that is created to identify the SipDomain resource.',
        }),
        Type.Null(),
      ]),
    ),
    friendly_name: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'A human readable descriptive text for this resource, up to 64 characters long.',
        }),
        Type.Null(),
      ]),
    ),
    sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^CL[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'A 34 character string that uniquely identifies this resource.',
        }),
        Type.Null(),
      ]),
    ),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The URI for this resource, relative to `https://api.twilio.com`',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.sip.sip_domain.sip_credential_list_mapping' },
)

export type ApiV2010AccountSipSipDomainSipCredentialListMapping = Static<
  typeof ApiV2010AccountSipSipDomainSipCredentialListMappingSchema
>

export const ApiV2010AccountSipSipDomainSchema = Type.Object(
  {
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the SipDomain resource.',
        }),
        Type.Null(),
      ]),
    ),
    api_version: Type.Optional(
      Type.Union([
        Type.String({ description: 'The API version used to process the call.' }),
        Type.Null(),
      ]),
    ),
    auth_type: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The types of authentication you have mapped to your domain. Can be: `IP_ACL` and `CREDENTIAL_LIST`. If you have both defined for your domain, both will be returned in a comma delimited string. If `auth_type` is not defined, the domain will not be able to receive any traffic.',
        }),
        Type.Null(),
      ]),
    ),
    date_created: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    date_updated: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    domain_name: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The unique address you reserve on Twilio to which you route your SIP traffic. Domain names can contain letters, digits, and "-" and must end with `sip.twilio.com`.',
        }),
        Type.Null(),
      ]),
    ),
    friendly_name: Type.Optional(
      Type.Union([
        Type.String({ description: 'The string that you assigned to describe the resource.' }),
        Type.Null(),
      ]),
    ),
    sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^SD[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'The unique string that that we created to identify the SipDomain resource.',
        }),
        Type.Null(),
      ]),
    ),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The URI of the resource, relative to `https://api.twilio.com`.',
        }),
        Type.Null(),
      ]),
    ),
    voice_fallback_method: Type.Optional(
      Type.Union([
        Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
          description:
            'The HTTP method we use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
        }),
        Type.Null(),
      ]),
    ),
    voice_fallback_url: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          description:
            'The URL that we call when an error occurs while retrieving or executing the TwiML requested from `voice_url`.',
        }),
        Type.Null(),
      ]),
    ),
    voice_method: Type.Optional(
      Type.Union([
        Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
          description: 'The HTTP method we use to call `voice_url`. Can be: `GET` or `POST`.',
        }),
        Type.Null(),
      ]),
    ),
    voice_status_callback_method: Type.Optional(
      Type.Union([
        Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
          description:
            'The HTTP method we use to call `voice_status_callback_url`. Either `GET` or `POST`.',
        }),
        Type.Null(),
      ]),
    ),
    voice_status_callback_url: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          description:
            'The URL that we call to pass status parameters (such as call ended) to your application.',
        }),
        Type.Null(),
      ]),
    ),
    voice_url: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          description: 'The URL we call using the `voice_method` when the domain receives a call.',
        }),
        Type.Null(),
      ]),
    ),
    subresource_uris: Type.Optional(
      Type.Union([
        Type.Object(
          {},
          {
            description:
              'A list of mapping resources associated with the SIP Domain resource identified by their relative URIs.',
          },
        ),
        Type.Null(),
      ]),
    ),
    sip_registration: Type.Optional(
      Type.Union([
        Type.Boolean({
          description:
            'Whether to allow SIP Endpoints to register with the domain to receive calls.',
        }),
        Type.Null(),
      ]),
    ),
    emergency_calling_enabled: Type.Optional(
      Type.Union([
        Type.Boolean({
          description:
            'Whether emergency calling is enabled for the domain. If enabled, allows emergency calls on the domain from phone numbers with validated addresses.',
        }),
        Type.Null(),
      ]),
    ),
    secure: Type.Optional(
      Type.Union([
        Type.Boolean({
          description:
            'Whether secure SIP is enabled for the domain. If enabled, TLS will be enforced and SRTP will be negotiated on all incoming calls to this sip domain.',
        }),
        Type.Null(),
      ]),
    ),
    byoc_trunk_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^BY[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the BYOC Trunk(Bring Your Own Carrier) resource that the Sip Domain will be associated with.',
        }),
        Type.Null(),
      ]),
    ),
    emergency_caller_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^PN[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'Whether an emergency caller sid is configured for the domain. If present, this phone number will be used as the callback for the emergency call.',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.sip.sip_domain' },
)

export type ApiV2010AccountSipSipDomain = Static<typeof ApiV2010AccountSipSipDomainSchema>

export const ApiV2010AccountSipSipIpAccessControlListSchema = Type.Object(
  {
    sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AL[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'A 34 character string that uniquely identifies this resource.',
        }),
        Type.Null(),
      ]),
    ),
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The unique id of the [Account](https://www.twilio.com/docs/iam/api/account) that owns this resource.',
        }),
        Type.Null(),
      ]),
    ),
    friendly_name: Type.Optional(
      Type.Union([
        Type.String({
          description: 'A human readable descriptive text, up to 255 characters long.',
        }),
        Type.Null(),
      ]),
    ),
    date_created: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date that this resource was created, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
        }),
        Type.Null(),
      ]),
    ),
    date_updated: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date that this resource was last updated, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
        }),
        Type.Null(),
      ]),
    ),
    subresource_uris: Type.Optional(
      Type.Union([
        Type.Object(
          {},
          {
            description:
              'A list of the IpAddress resources associated with this IP access control list resource.',
          },
        ),
        Type.Null(),
      ]),
    ),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The URI for this resource, relative to `https://api.twilio.com`',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.sip.sip_ip_access_control_list' },
)

export type ApiV2010AccountSipSipIpAccessControlList = Static<
  typeof ApiV2010AccountSipSipIpAccessControlListSchema
>

export const ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema = Type.Object(
  {
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'The unique id of the Account that is responsible for this resource.',
        }),
        Type.Null(),
      ]),
    ),
    date_created: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date that this resource was created, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
        }),
        Type.Null(),
      ]),
    ),
    date_updated: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date that this resource was last updated, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
        }),
        Type.Null(),
      ]),
    ),
    domain_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^SD[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'The unique string that is created to identify the SipDomain resource.',
        }),
        Type.Null(),
      ]),
    ),
    friendly_name: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'A human readable descriptive text for this resource, up to 64 characters long.',
        }),
        Type.Null(),
      ]),
    ),
    sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AL[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'A 34 character string that uniquely identifies this resource.',
        }),
        Type.Null(),
      ]),
    ),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The URI for this resource, relative to `https://api.twilio.com`',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.sip.sip_domain.sip_ip_access_control_list_mapping' },
)

export type ApiV2010AccountSipSipDomainSipIpAccessControlListMapping = Static<
  typeof ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema
>

export const ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema = Type.Object(
  {
    sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^IP[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'A 34 character string that uniquely identifies this resource.',
        }),
        Type.Null(),
      ]),
    ),
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'The unique id of the Account that is responsible for this resource.',
        }),
        Type.Null(),
      ]),
    ),
    friendly_name: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'A human readable descriptive text for this resource, up to 255 characters long.',
        }),
        Type.Null(),
      ]),
    ),
    ip_address: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'An IP address in dotted decimal notation from which you want to accept traffic. Any SIP requests from this IP address will be allowed by Twilio. IPv4 only supported today.',
        }),
        Type.Null(),
      ]),
    ),
    cidr_prefix_length: Type.Optional(
      Type.Integer({
        description:
          'An integer representing the length of the CIDR prefix to use with this IP address when accepting traffic. By default the entire IP address is used.',
        default: 0,
      }),
    ),
    ip_access_control_list_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AL[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The unique id of the IpAccessControlList resource that includes this resource.',
        }),
        Type.Null(),
      ]),
    ),
    date_created: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date that this resource was created, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
        }),
        Type.Null(),
      ]),
    ),
    date_updated: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date that this resource was last updated, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
        }),
        Type.Null(),
      ]),
    ),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The URI for this resource, relative to `https://api.twilio.com`',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.sip.sip_ip_access_control_list.sip_ip_address' },
)

export type ApiV2010AccountSipSipIpAccessControlListSipIpAddress = Static<
  typeof ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema
>

export const SiprecEnumStatusSchema = Type.Union(
  [Type.Literal('in-progress'), Type.Literal('stopped')],
  { ref: 'siprec_enum_status', description: 'The status - one of `stopped`, `in-progress`' },
)

export type SiprecEnumStatus = Static<typeof SiprecEnumStatusSchema>

export const ApiV2010AccountCallSiprecSchema = Type.Object(
  {
    sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^SR[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'The SID of the Siprec resource.',
        }),
        Type.Null(),
      ]),
    ),
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Siprec resource.',
        }),
        Type.Null(),
      ]),
    ),
    call_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^CA[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Siprec resource is associated with.',
        }),
        Type.Null(),
      ]),
    ),
    name: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The user-specified name of this Siprec, if one was given when the Siprec was created. This may be used to stop the Siprec.',
        }),
        Type.Null(),
      ]),
    ),
    status: Type.Optional(SiprecEnumStatusSchema),
    date_updated: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The URI of the resource, relative to `https://api.twilio.com`.',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.call.siprec' },
)

export type ApiV2010AccountCallSiprec = Static<typeof ApiV2010AccountCallSiprecSchema>

export const SiprecEnumTrackSchema = Type.Union(
  [Type.Literal('inbound_track'), Type.Literal('outbound_track'), Type.Literal('both_tracks')],
  {
    ref: 'siprec_enum_track',
    description: 'One of `inbound_track`, `outbound_track`, `both_tracks`.',
  },
)

export type SiprecEnumTrack = Static<typeof SiprecEnumTrackSchema>

export const SiprecEnumUpdateStatusSchema = Type.Literal('stopped', {
  ref: 'siprec_enum_update_status',
})

export type SiprecEnumUpdateStatus = Static<typeof SiprecEnumUpdateStatusSchema>

export const SmsFeedbackEnumOutcomeSchema = Type.Union(
  [
    Type.Literal('confirmed'),
    Type.Literal('unconfirmed'),
    Type.Literal('received'),
    Type.Literal('not-received'),
    Type.Literal('delayed'),
  ],
  { ref: 'sms_feedback_enum_outcome' },
)

export type SmsFeedbackEnumOutcome = Static<typeof SmsFeedbackEnumOutcomeSchema>

export const SmsMessageEnumStatusSchema = Type.Union(
  [
    Type.Literal('queued'),
    Type.Literal('sending'),
    Type.Literal('sent'),
    Type.Literal('failed'),
    Type.Literal('delivered'),
    Type.Literal('undelivered'),
    Type.Literal('receiving'),
    Type.Literal('received'),
    Type.Literal('accepted'),
    Type.Literal('scheduled'),
    Type.Literal('read'),
    Type.Literal('partially_delivered'),
    Type.Literal('canceled'),
  ],
  { ref: 'sms_message_enum_status' },
)

export type SmsMessageEnumStatus = Static<typeof SmsMessageEnumStatusSchema>

export const SmsMessageEnumUpdateStatusSchema = Type.Literal('canceled', {
  ref: 'sms_message_enum_update_status',
})

export type SmsMessageEnumUpdateStatus = Static<typeof SmsMessageEnumUpdateStatusSchema>

export const SmsMessageEnumDirectionSchema = Type.Union(
  [
    Type.Literal('inbound'),
    Type.Literal('outbound-api'),
    Type.Literal('outbound-call'),
    Type.Literal('outbound-reply'),
  ],
  { ref: 'sms_message_enum_direction' },
)

export type SmsMessageEnumDirection = Static<typeof SmsMessageEnumDirectionSchema>

export const StreamEnumStatusSchema = Type.Union(
  [Type.Literal('in-progress'), Type.Literal('stopped')],
  {
    ref: 'stream_enum_status',
    description: 'The status of the Stream. Possible values are `stopped` and `in-progress`.',
  },
)

export type StreamEnumStatus = Static<typeof StreamEnumStatusSchema>

export const ApiV2010AccountCallStreamSchema = Type.Object(
  {
    sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^MZ[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'The SID of the Stream resource.',
        }),
        Type.Null(),
      ]),
    ),
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Stream resource.',
        }),
        Type.Null(),
      ]),
    ),
    call_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^CA[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Stream resource is associated with.',
        }),
        Type.Null(),
      ]),
    ),
    name: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The user-specified name of this Stream, if one was given when the Stream was created. This can be used to stop the Stream.',
        }),
        Type.Null(),
      ]),
    ),
    status: Type.Optional(StreamEnumStatusSchema),
    date_updated: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The URI of the resource, relative to `https://api.twilio.com`.',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.call.stream' },
)

export type ApiV2010AccountCallStream = Static<typeof ApiV2010AccountCallStreamSchema>

export const StreamEnumTrackSchema = Type.Union(
  [Type.Literal('inbound_track'), Type.Literal('outbound_track'), Type.Literal('both_tracks')],
  {
    ref: 'stream_enum_track',
    description:
      'The tracks to be included in the Stream. Possible values are `inbound_track`, `outbound_track`, `both_tracks`. Default value is `inbound_track`.',
  },
)

export type StreamEnumTrack = Static<typeof StreamEnumTrackSchema>

export const StreamEnumUpdateStatusSchema = Type.Literal('stopped', {
  ref: 'stream_enum_update_status',
})

export type StreamEnumUpdateStatus = Static<typeof StreamEnumUpdateStatusSchema>

export const ApiV2010AccountTokenSchema = Type.Object(
  {
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Token resource.',
        }),
        Type.Null(),
      ]),
    ),
    date_created: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    date_updated: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    ice_servers: Type.Optional(
      Type.Union([
        Type.Array(
          Type.Object({
            credential: Type.Optional(Type.String()),
            username: Type.Optional(Type.String()),
            url: Type.Optional(Type.String()),
            urls: Type.Optional(Type.String()),
          }),
          {
            description:
              'An array representing the ephemeral credentials and the STUN and TURN server URIs.',
          },
        ),
        Type.Null(),
      ]),
    ),
    password: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The temporary password that the username will use when authenticating with Twilio.',
        }),
        Type.Null(),
      ]),
    ),
    ttl: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The duration in seconds for which the username and password are valid.',
        }),
        Type.Null(),
      ]),
    ),
    username: Type.Optional(
      Type.Union([
        Type.String({ description: 'The temporary username that uniquely identifies a Token.' }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.token' },
)

export type ApiV2010AccountToken = Static<typeof ApiV2010AccountTokenSchema>

export const TranscriptionEnumStatusSchema = Type.Union(
  [Type.Literal('in-progress'), Type.Literal('completed'), Type.Literal('failed')],
  {
    ref: 'transcription_enum_status',
    description: 'The status of the transcription. Can be: `in-progress`, `completed`, `failed`.',
  },
)

export type TranscriptionEnumStatus = Static<typeof TranscriptionEnumStatusSchema>

export const ApiV2010AccountTranscriptionSchema = Type.Object(
  {
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Transcription resource.',
        }),
        Type.Null(),
      ]),
    ),
    api_version: Type.Optional(
      Type.Union([
        Type.String({ description: 'The API version used to create the transcription.' }),
        Type.Null(),
      ]),
    ),
    date_created: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    date_updated: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    duration: Type.Optional(
      Type.Union([
        Type.String({ description: 'The duration of the transcribed audio in seconds.' }),
        Type.Null(),
      ]),
    ),
    price: Type.Optional(
      Type.Union([
        Type.Number({
          description:
            'The charge for the transcript in the currency associated with the account. This value is populated after the transcript is complete so it may not be available immediately.',
        }),
        Type.Null(),
      ]),
    ),
    price_unit: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format (e.g. `usd`, `eur`, `jpy`).',
        }),
        Type.Null(),
      ]),
    ),
    recording_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^RE[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Recording](https://www.twilio.com/docs/voice/api/recording) from which the transcription was created.',
        }),
        Type.Null(),
      ]),
    ),
    sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^TR[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The unique string that that we created to identify the Transcription resource.',
        }),
        Type.Null(),
      ]),
    ),
    status: Type.Optional(TranscriptionEnumStatusSchema),
    transcription_text: Type.Optional(
      Type.Union([
        Type.String({ description: 'The text content of the transcription.' }),
        Type.Null(),
      ]),
    ),
    type: Type.Optional(
      Type.Union([
        Type.String({ description: 'The transcription type. Can only be: `fast`.' }),
        Type.Null(),
      ]),
    ),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The URI of the resource, relative to `https://api.twilio.com`.',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.transcription' },
)

export type ApiV2010AccountTranscription = Static<typeof ApiV2010AccountTranscriptionSchema>

export const ApiV2010AccountUsageSchema = Type.Object({}, { ref: 'api.v2010.account.usage' })

export type ApiV2010AccountUsage = Static<typeof ApiV2010AccountUsageSchema>

export const ApiV2010AccountUsageUsageRecordSchema = Type.Object(
  {
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
        }),
        Type.Null(),
      ]),
    ),
    api_version: Type.Optional(
      Type.Union([
        Type.String({ description: 'The API version used to create the resource.' }),
        Type.Null(),
      ]),
    ),
    as_of: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
        }),
        Type.Null(),
      ]),
    ),
    category: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
        }),
        Type.Null(),
      ]),
    ),
    count: Type.Optional(
      Type.Union([
        Type.String({ description: 'The number of usage events, such as the number of calls.' }),
        Type.Null(),
      ]),
    ),
    count_unit: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
        }),
        Type.Null(),
      ]),
    ),
    description: Type.Optional(
      Type.Union([
        Type.String({ description: 'A plain-language description of the usage category.' }),
        Type.Null(),
      ]),
    ),
    end_date: Type.Optional(
      Type.Union([
        Type.String({
          format: 'date',
          description:
            'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
        }),
        Type.Null(),
      ]),
    ),
    price: Type.Optional(
      Type.Union([
        Type.Number({
          description:
            'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
        }),
        Type.Null(),
      ]),
    ),
    price_unit: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
        }),
        Type.Null(),
      ]),
    ),
    start_date: Type.Optional(
      Type.Union([
        Type.String({
          format: 'date',
          description:
            'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
        }),
        Type.Null(),
      ]),
    ),
    subresource_uris: Type.Optional(
      Type.Union([
        Type.Object(
          {},
          {
            description:
              'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
          },
        ),
        Type.Null(),
      ]),
    ),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The URI of the resource, relative to `https://api.twilio.com`.',
        }),
        Type.Null(),
      ]),
    ),
    usage: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The amount used to bill usage and measured in units described in `usage_unit`.',
        }),
        Type.Null(),
      ]),
    ),
    usage_unit: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.usage.usage_record' },
)

export type ApiV2010AccountUsageUsageRecord = Static<typeof ApiV2010AccountUsageUsageRecordSchema>

export const ApiV2010AccountUsageUsageRecordUsageRecordAllTimeSchema = Type.Object(
  {
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
        }),
        Type.Null(),
      ]),
    ),
    api_version: Type.Optional(
      Type.Union([
        Type.String({ description: 'The API version used to create the resource.' }),
        Type.Null(),
      ]),
    ),
    as_of: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
        }),
        Type.Null(),
      ]),
    ),
    category: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
        }),
        Type.Null(),
      ]),
    ),
    count: Type.Optional(
      Type.Union([
        Type.String({ description: 'The number of usage events, such as the number of calls.' }),
        Type.Null(),
      ]),
    ),
    count_unit: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
        }),
        Type.Null(),
      ]),
    ),
    description: Type.Optional(
      Type.Union([
        Type.String({ description: 'A plain-language description of the usage category.' }),
        Type.Null(),
      ]),
    ),
    end_date: Type.Optional(
      Type.Union([
        Type.String({
          format: 'date',
          description:
            'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
        }),
        Type.Null(),
      ]),
    ),
    price: Type.Optional(
      Type.Union([
        Type.Number({
          description:
            'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
        }),
        Type.Null(),
      ]),
    ),
    price_unit: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
        }),
        Type.Null(),
      ]),
    ),
    start_date: Type.Optional(
      Type.Union([
        Type.String({
          format: 'date',
          description:
            'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
        }),
        Type.Null(),
      ]),
    ),
    subresource_uris: Type.Optional(
      Type.Union([
        Type.Object(
          {},
          {
            description:
              'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
          },
        ),
        Type.Null(),
      ]),
    ),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The URI of the resource, relative to `https://api.twilio.com`.',
        }),
        Type.Null(),
      ]),
    ),
    usage: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The amount used to bill usage and measured in units described in `usage_unit`.',
        }),
        Type.Null(),
      ]),
    ),
    usage_unit: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.usage.usage_record.usage_record_all_time' },
)

export type ApiV2010AccountUsageUsageRecordUsageRecordAllTime = Static<
  typeof ApiV2010AccountUsageUsageRecordUsageRecordAllTimeSchema
>

export const ApiV2010AccountUsageUsageRecordUsageRecordDailySchema = Type.Object(
  {
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
        }),
        Type.Null(),
      ]),
    ),
    api_version: Type.Optional(
      Type.Union([
        Type.String({ description: 'The API version used to create the resource.' }),
        Type.Null(),
      ]),
    ),
    as_of: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
        }),
        Type.Null(),
      ]),
    ),
    category: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
        }),
        Type.Null(),
      ]),
    ),
    count: Type.Optional(
      Type.Union([
        Type.String({ description: 'The number of usage events, such as the number of calls.' }),
        Type.Null(),
      ]),
    ),
    count_unit: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
        }),
        Type.Null(),
      ]),
    ),
    description: Type.Optional(
      Type.Union([
        Type.String({ description: 'A plain-language description of the usage category.' }),
        Type.Null(),
      ]),
    ),
    end_date: Type.Optional(
      Type.Union([
        Type.String({
          format: 'date',
          description:
            'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
        }),
        Type.Null(),
      ]),
    ),
    price: Type.Optional(
      Type.Union([
        Type.Number({
          description:
            'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
        }),
        Type.Null(),
      ]),
    ),
    price_unit: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
        }),
        Type.Null(),
      ]),
    ),
    start_date: Type.Optional(
      Type.Union([
        Type.String({
          format: 'date',
          description:
            'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
        }),
        Type.Null(),
      ]),
    ),
    subresource_uris: Type.Optional(
      Type.Union([
        Type.Object(
          {},
          {
            description:
              'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
          },
        ),
        Type.Null(),
      ]),
    ),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The URI of the resource, relative to `https://api.twilio.com`.',
        }),
        Type.Null(),
      ]),
    ),
    usage: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The amount used to bill usage and measured in units described in `usage_unit`.',
        }),
        Type.Null(),
      ]),
    ),
    usage_unit: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.usage.usage_record.usage_record_daily' },
)

export type ApiV2010AccountUsageUsageRecordUsageRecordDaily = Static<
  typeof ApiV2010AccountUsageUsageRecordUsageRecordDailySchema
>

export const ApiV2010AccountUsageUsageRecordUsageRecordLastMonthSchema = Type.Object(
  {
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
        }),
        Type.Null(),
      ]),
    ),
    api_version: Type.Optional(
      Type.Union([
        Type.String({ description: 'The API version used to create the resource.' }),
        Type.Null(),
      ]),
    ),
    as_of: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
        }),
        Type.Null(),
      ]),
    ),
    category: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
        }),
        Type.Null(),
      ]),
    ),
    count: Type.Optional(
      Type.Union([
        Type.String({ description: 'The number of usage events, such as the number of calls.' }),
        Type.Null(),
      ]),
    ),
    count_unit: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
        }),
        Type.Null(),
      ]),
    ),
    description: Type.Optional(
      Type.Union([
        Type.String({ description: 'A plain-language description of the usage category.' }),
        Type.Null(),
      ]),
    ),
    end_date: Type.Optional(
      Type.Union([
        Type.String({
          format: 'date',
          description:
            'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
        }),
        Type.Null(),
      ]),
    ),
    price: Type.Optional(
      Type.Union([
        Type.Number({
          description:
            'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
        }),
        Type.Null(),
      ]),
    ),
    price_unit: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
        }),
        Type.Null(),
      ]),
    ),
    start_date: Type.Optional(
      Type.Union([
        Type.String({
          format: 'date',
          description:
            'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
        }),
        Type.Null(),
      ]),
    ),
    subresource_uris: Type.Optional(
      Type.Union([
        Type.Object(
          {},
          {
            description:
              'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
          },
        ),
        Type.Null(),
      ]),
    ),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The URI of the resource, relative to `https://api.twilio.com`.',
        }),
        Type.Null(),
      ]),
    ),
    usage: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The amount used to bill usage and measured in units described in `usage_unit`.',
        }),
        Type.Null(),
      ]),
    ),
    usage_unit: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.usage.usage_record.usage_record_last_month' },
)

export type ApiV2010AccountUsageUsageRecordUsageRecordLastMonth = Static<
  typeof ApiV2010AccountUsageUsageRecordUsageRecordLastMonthSchema
>

export const ApiV2010AccountUsageUsageRecordUsageRecordMonthlySchema = Type.Object(
  {
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
        }),
        Type.Null(),
      ]),
    ),
    api_version: Type.Optional(
      Type.Union([
        Type.String({ description: 'The API version used to create the resource.' }),
        Type.Null(),
      ]),
    ),
    as_of: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
        }),
        Type.Null(),
      ]),
    ),
    category: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
        }),
        Type.Null(),
      ]),
    ),
    count: Type.Optional(
      Type.Union([
        Type.String({ description: 'The number of usage events, such as the number of calls.' }),
        Type.Null(),
      ]),
    ),
    count_unit: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
        }),
        Type.Null(),
      ]),
    ),
    description: Type.Optional(
      Type.Union([
        Type.String({ description: 'A plain-language description of the usage category.' }),
        Type.Null(),
      ]),
    ),
    end_date: Type.Optional(
      Type.Union([
        Type.String({
          format: 'date',
          description:
            'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
        }),
        Type.Null(),
      ]),
    ),
    price: Type.Optional(
      Type.Union([
        Type.Number({
          description:
            'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
        }),
        Type.Null(),
      ]),
    ),
    price_unit: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
        }),
        Type.Null(),
      ]),
    ),
    start_date: Type.Optional(
      Type.Union([
        Type.String({
          format: 'date',
          description:
            'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
        }),
        Type.Null(),
      ]),
    ),
    subresource_uris: Type.Optional(
      Type.Union([
        Type.Object(
          {},
          {
            description:
              'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
          },
        ),
        Type.Null(),
      ]),
    ),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The URI of the resource, relative to `https://api.twilio.com`.',
        }),
        Type.Null(),
      ]),
    ),
    usage: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The amount used to bill usage and measured in units described in `usage_unit`.',
        }),
        Type.Null(),
      ]),
    ),
    usage_unit: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.usage.usage_record.usage_record_monthly' },
)

export type ApiV2010AccountUsageUsageRecordUsageRecordMonthly = Static<
  typeof ApiV2010AccountUsageUsageRecordUsageRecordMonthlySchema
>

export const ApiV2010AccountUsageUsageRecordUsageRecordThisMonthSchema = Type.Object(
  {
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
        }),
        Type.Null(),
      ]),
    ),
    api_version: Type.Optional(
      Type.Union([
        Type.String({ description: 'The API version used to create the resource.' }),
        Type.Null(),
      ]),
    ),
    as_of: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
        }),
        Type.Null(),
      ]),
    ),
    category: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
        }),
        Type.Null(),
      ]),
    ),
    count: Type.Optional(
      Type.Union([
        Type.String({ description: 'The number of usage events, such as the number of calls.' }),
        Type.Null(),
      ]),
    ),
    count_unit: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
        }),
        Type.Null(),
      ]),
    ),
    description: Type.Optional(
      Type.Union([
        Type.String({ description: 'A plain-language description of the usage category.' }),
        Type.Null(),
      ]),
    ),
    end_date: Type.Optional(
      Type.Union([
        Type.String({
          format: 'date',
          description:
            'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
        }),
        Type.Null(),
      ]),
    ),
    price: Type.Optional(
      Type.Union([
        Type.Number({
          description:
            'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
        }),
        Type.Null(),
      ]),
    ),
    price_unit: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
        }),
        Type.Null(),
      ]),
    ),
    start_date: Type.Optional(
      Type.Union([
        Type.String({
          format: 'date',
          description:
            'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
        }),
        Type.Null(),
      ]),
    ),
    subresource_uris: Type.Optional(
      Type.Union([
        Type.Object(
          {},
          {
            description:
              'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
          },
        ),
        Type.Null(),
      ]),
    ),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The URI of the resource, relative to `https://api.twilio.com`.',
        }),
        Type.Null(),
      ]),
    ),
    usage: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The amount used to bill usage and measured in units described in `usage_unit`.',
        }),
        Type.Null(),
      ]),
    ),
    usage_unit: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.usage.usage_record.usage_record_this_month' },
)

export type ApiV2010AccountUsageUsageRecordUsageRecordThisMonth = Static<
  typeof ApiV2010AccountUsageUsageRecordUsageRecordThisMonthSchema
>

export const ApiV2010AccountUsageUsageRecordUsageRecordTodaySchema = Type.Object(
  {
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
        }),
        Type.Null(),
      ]),
    ),
    api_version: Type.Optional(
      Type.Union([
        Type.String({ description: 'The API version used to create the resource.' }),
        Type.Null(),
      ]),
    ),
    as_of: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
        }),
        Type.Null(),
      ]),
    ),
    category: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
        }),
        Type.Null(),
      ]),
    ),
    count: Type.Optional(
      Type.Union([
        Type.String({ description: 'The number of usage events, such as the number of calls.' }),
        Type.Null(),
      ]),
    ),
    count_unit: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
        }),
        Type.Null(),
      ]),
    ),
    description: Type.Optional(
      Type.Union([
        Type.String({ description: 'A plain-language description of the usage category.' }),
        Type.Null(),
      ]),
    ),
    end_date: Type.Optional(
      Type.Union([
        Type.String({
          format: 'date',
          description:
            'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
        }),
        Type.Null(),
      ]),
    ),
    price: Type.Optional(
      Type.Union([
        Type.Number({
          description:
            'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
        }),
        Type.Null(),
      ]),
    ),
    price_unit: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
        }),
        Type.Null(),
      ]),
    ),
    start_date: Type.Optional(
      Type.Union([
        Type.String({
          format: 'date',
          description:
            'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
        }),
        Type.Null(),
      ]),
    ),
    subresource_uris: Type.Optional(
      Type.Union([
        Type.Object(
          {},
          {
            description:
              'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
          },
        ),
        Type.Null(),
      ]),
    ),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The URI of the resource, relative to `https://api.twilio.com`.',
        }),
        Type.Null(),
      ]),
    ),
    usage: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The amount used to bill usage and measured in units described in `usage_unit`.',
        }),
        Type.Null(),
      ]),
    ),
    usage_unit: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.usage.usage_record.usage_record_today' },
)

export type ApiV2010AccountUsageUsageRecordUsageRecordToday = Static<
  typeof ApiV2010AccountUsageUsageRecordUsageRecordTodaySchema
>

export const ApiV2010AccountUsageUsageRecordUsageRecordYearlySchema = Type.Object(
  {
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
        }),
        Type.Null(),
      ]),
    ),
    api_version: Type.Optional(
      Type.Union([
        Type.String({ description: 'The API version used to create the resource.' }),
        Type.Null(),
      ]),
    ),
    as_of: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
        }),
        Type.Null(),
      ]),
    ),
    category: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
        }),
        Type.Null(),
      ]),
    ),
    count: Type.Optional(
      Type.Union([
        Type.String({ description: 'The number of usage events, such as the number of calls.' }),
        Type.Null(),
      ]),
    ),
    count_unit: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
        }),
        Type.Null(),
      ]),
    ),
    description: Type.Optional(
      Type.Union([
        Type.String({ description: 'A plain-language description of the usage category.' }),
        Type.Null(),
      ]),
    ),
    end_date: Type.Optional(
      Type.Union([
        Type.String({
          format: 'date',
          description:
            'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
        }),
        Type.Null(),
      ]),
    ),
    price: Type.Optional(
      Type.Union([
        Type.Number({
          description:
            'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
        }),
        Type.Null(),
      ]),
    ),
    price_unit: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
        }),
        Type.Null(),
      ]),
    ),
    start_date: Type.Optional(
      Type.Union([
        Type.String({
          format: 'date',
          description:
            'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
        }),
        Type.Null(),
      ]),
    ),
    subresource_uris: Type.Optional(
      Type.Union([
        Type.Object(
          {},
          {
            description:
              'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
          },
        ),
        Type.Null(),
      ]),
    ),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The URI of the resource, relative to `https://api.twilio.com`.',
        }),
        Type.Null(),
      ]),
    ),
    usage: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The amount used to bill usage and measured in units described in `usage_unit`.',
        }),
        Type.Null(),
      ]),
    ),
    usage_unit: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.usage.usage_record.usage_record_yearly' },
)

export type ApiV2010AccountUsageUsageRecordUsageRecordYearly = Static<
  typeof ApiV2010AccountUsageUsageRecordUsageRecordYearlySchema
>

export const ApiV2010AccountUsageUsageRecordUsageRecordYesterdaySchema = Type.Object(
  {
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
        }),
        Type.Null(),
      ]),
    ),
    api_version: Type.Optional(
      Type.Union([
        Type.String({ description: 'The API version used to create the resource.' }),
        Type.Null(),
      ]),
    ),
    as_of: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
        }),
        Type.Null(),
      ]),
    ),
    category: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
        }),
        Type.Null(),
      ]),
    ),
    count: Type.Optional(
      Type.Union([
        Type.String({ description: 'The number of usage events, such as the number of calls.' }),
        Type.Null(),
      ]),
    ),
    count_unit: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
        }),
        Type.Null(),
      ]),
    ),
    description: Type.Optional(
      Type.Union([
        Type.String({ description: 'A plain-language description of the usage category.' }),
        Type.Null(),
      ]),
    ),
    end_date: Type.Optional(
      Type.Union([
        Type.String({
          format: 'date',
          description:
            'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
        }),
        Type.Null(),
      ]),
    ),
    price: Type.Optional(
      Type.Union([
        Type.Number({
          description:
            'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
        }),
        Type.Null(),
      ]),
    ),
    price_unit: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
        }),
        Type.Null(),
      ]),
    ),
    start_date: Type.Optional(
      Type.Union([
        Type.String({
          format: 'date',
          description:
            'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
        }),
        Type.Null(),
      ]),
    ),
    subresource_uris: Type.Optional(
      Type.Union([
        Type.Object(
          {},
          {
            description:
              'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
          },
        ),
        Type.Null(),
      ]),
    ),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The URI of the resource, relative to `https://api.twilio.com`.',
        }),
        Type.Null(),
      ]),
    ),
    usage: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The amount used to bill usage and measured in units described in `usage_unit`.',
        }),
        Type.Null(),
      ]),
    ),
    usage_unit: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.usage.usage_record.usage_record_yesterday' },
)

export type ApiV2010AccountUsageUsageRecordUsageRecordYesterday = Static<
  typeof ApiV2010AccountUsageUsageRecordUsageRecordYesterdaySchema
>

export const UsageTriggerEnumRecurringSchema = Type.Union(
  [Type.Literal('daily'), Type.Literal('monthly'), Type.Literal('yearly'), Type.Literal('alltime')],
  {
    ref: 'usage_trigger_enum_recurring',
    description:
      'The frequency of a recurring UsageTrigger.  Can be: `daily`, `monthly`, or `yearly` for recurring triggers or empty for non-recurring triggers. A trigger will only fire once during each period. Recurring times are in GMT.',
  },
)

export type UsageTriggerEnumRecurring = Static<typeof UsageTriggerEnumRecurringSchema>

export const UsageTriggerEnumTriggerFieldSchema = Type.Union(
  [Type.Literal('count'), Type.Literal('usage'), Type.Literal('price')],
  {
    ref: 'usage_trigger_enum_trigger_field',
    description:
      'The field in the [UsageRecord](https://www.twilio.com/docs/usage/api/usage-record) resource that fires the trigger.  Can be: `count`, `usage`, or `price`, as described in the [UsageRecords documentation](https://www.twilio.com/docs/usage/api/usage-record#usage-count-price).',
  },
)

export type UsageTriggerEnumTriggerField = Static<typeof UsageTriggerEnumTriggerFieldSchema>

export const ApiV2010AccountUsageUsageTriggerSchema = Type.Object(
  {
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that the trigger monitors.',
        }),
        Type.Null(),
      ]),
    ),
    api_version: Type.Optional(
      Type.Union([
        Type.String({ description: 'The API version used to create the resource.' }),
        Type.Null(),
      ]),
    ),
    callback_method: Type.Optional(
      Type.Union([
        Type.Union([Type.Literal('GET'), Type.Literal('POST')], {
          description: 'The HTTP method we use to call `callback_url`. Can be: `GET` or `POST`.',
        }),
        Type.Null(),
      ]),
    ),
    callback_url: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          description: 'The URL we call using the `callback_method` when the trigger fires.',
        }),
        Type.Null(),
      ]),
    ),
    current_value: Type.Optional(
      Type.Union([
        Type.String({ description: 'The current value of the field the trigger is watching.' }),
        Type.Null(),
      ]),
    ),
    date_created: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    date_fired: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the trigger was last fired specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    date_updated: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        Type.Null(),
      ]),
    ),
    friendly_name: Type.Optional(
      Type.Union([
        Type.String({ description: 'The string that you assigned to describe the trigger.' }),
        Type.Null(),
      ]),
    ),
    recurring: Type.Optional(UsageTriggerEnumRecurringSchema),
    sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^UT[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The unique string that that we created to identify the UsageTrigger resource.',
        }),
        Type.Null(),
      ]),
    ),
    trigger_by: Type.Optional(UsageTriggerEnumTriggerFieldSchema),
    trigger_value: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The value at which the trigger will fire.  Must be a positive, numeric value.',
        }),
        Type.Null(),
      ]),
    ),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          description: 'The URI of the resource, relative to `https://api.twilio.com`.',
        }),
        Type.Null(),
      ]),
    ),
    usage_category: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The usage category the trigger watches. Must be one of the supported [usage categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
        }),
        Type.Null(),
      ]),
    ),
    usage_record_uri: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The URI of the [UsageRecord](https://www.twilio.com/docs/usage/api/usage-record) resource this trigger watches, relative to `https://api.twilio.com`.',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.usage.usage_trigger' },
)

export type ApiV2010AccountUsageUsageTrigger = Static<typeof ApiV2010AccountUsageUsageTriggerSchema>

export const ApiV2010AccountCallUserDefinedMessageSchema = Type.Object(
  {
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created User Defined Message.',
        }),
        Type.Null(),
      ]),
    ),
    call_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^CA[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the User Defined Message is associated with.',
        }),
        Type.Null(),
      ]),
    ),
    sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^KX[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'The SID that uniquely identifies this User Defined Message.',
        }),
        Type.Null(),
      ]),
    ),
    date_created: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date that this User Defined Message was created, given in RFC 2822 format.',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.call.user_defined_message' },
)

export type ApiV2010AccountCallUserDefinedMessage = Static<
  typeof ApiV2010AccountCallUserDefinedMessageSchema
>

export const ApiV2010AccountCallUserDefinedMessageSubscriptionSchema = Type.Object(
  {
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that subscribed to the User Defined Messages.',
        }),
        Type.Null(),
      ]),
    ),
    call_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^CA[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the User Defined Message Subscription is associated with. This refers to the Call SID that is producing the User Defined Messages.',
        }),
        Type.Null(),
      ]),
    ),
    sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^ZY[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'The SID that uniquely identifies this User Defined Message Subscription.',
        }),
        Type.Null(),
      ]),
    ),
    date_created: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The date that this User Defined Message Subscription was created, given in RFC 2822 format.',
        }),
        Type.Null(),
      ]),
    ),
    uri: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The URI of the User Defined Message Subscription Resource, relative to `https://api.twilio.com`.',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.call.user_defined_message_subscription' },
)

export type ApiV2010AccountCallUserDefinedMessageSubscription = Static<
  typeof ApiV2010AccountCallUserDefinedMessageSubscriptionSchema
>

export const ApiV2010AccountValidationRequestSchema = Type.Object(
  {
    account_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) responsible for the Caller ID.',
        }),
        Type.Null(),
      ]),
    ),
    call_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^CA[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Caller ID is associated with.',
        }),
        Type.Null(),
      ]),
    ),
    friendly_name: Type.Optional(
      Type.Union([
        Type.String({ description: 'The string that you assigned to describe the resource.' }),
        Type.Null(),
      ]),
    ),
    phone_number: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The phone number to verify in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
        }),
        Type.Null(),
      ]),
    ),
    validation_code: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The 6 digit validation code that someone must enter to validate the Caller ID  when `phone_number` is called.',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.validation_request' },
)

export type ApiV2010AccountValidationRequest = Static<typeof ApiV2010AccountValidationRequestSchema>

export const ApiV2010AccountOutgoingCallerIdSmsVerificationSchema = Type.Object(
  {
    phone_number: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The phone number being verified in [E.164](https://www.twilio.com/docs/glossary/what-e164) format.',
        }),
        Type.Null(),
      ]),
    ),
    verification_sid: Type.Optional(
      Type.Union([
        Type.String({ description: 'The SID that uniquely identifies the verification.' }),
        Type.Null(),
      ]),
    ),
    send_code_attempts: Type.Optional(
      Type.Union([
        Type.Array(
          Type.Object({
            attempt_sid: Type.Optional(
              Type.String({ description: 'The SID of the verification attempt.' }),
            ),
            time: Type.Optional(
              Type.String({ description: 'The date and time of the attempt in ISO 8601 format.' }),
            ),
          }),
          {
            description:
              'An array of verification attempt objects containing the channel attempted and the channel-specific transaction SID.',
          },
        ),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.outgoing_caller_id.sms_verification' },
)

export type ApiV2010AccountOutgoingCallerIdSmsVerification = Static<
  typeof ApiV2010AccountOutgoingCallerIdSmsVerificationSchema
>

export const ApiV2010AccountOutgoingCallerIdVerificationCheckSchema = Type.Object(
  {
    phone_number: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The phone number being verified in [E.164](https://www.twilio.com/docs/glossary/what-e164) format.',
        }),
        Type.Null(),
      ]),
    ),
    verification_sid: Type.Optional(
      Type.Union([
        Type.String({ description: 'The SID that uniquely identifies the verification.' }),
        Type.Null(),
      ]),
    ),
    status: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'The status of the verification. Can be: `pending`, `approved`, or `failed`.',
        }),
        Type.Null(),
      ]),
    ),
    caller_id_sid: Type.Optional(
      Type.Union([
        Type.String({
          pattern: '^PN[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the OutgoingCallerId resource created when verification is approved.',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'api.v2010.account.outgoing_caller_id.verification_check' },
)

export type ApiV2010AccountOutgoingCallerIdVerificationCheck = Static<
  typeof ApiV2010AccountOutgoingCallerIdVerificationCheckSchema
>

export const AccountSidAuthTokenSecurityScheme = { scheme: 'basic', type: 'http' }
