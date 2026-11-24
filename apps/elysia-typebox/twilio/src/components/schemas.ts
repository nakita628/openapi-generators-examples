import { t } from 'elysia'

export const AccountEnumStatusSchema = t.UnionEnum(['active', 'suspended', 'closed'], {
  description: 'The status of this account. Usually `active`, but can be `suspended` or `closed`.',
  default: undefined,
})

export const AccountEnumTypeSchema = t.UnionEnum(['Trial', 'Full'], {
  description: "The type of this account. Either `Trial` or `Full` if it's been upgraded",
  default: undefined,
})

export const ApiV2010AccountSchema = t.Object({
  auth_token: t.Optional(
    t.Union([
      t.String({
        description:
          'The authorization token for this account. This token should be kept a secret, so no sharing.',
      }),
      t.Null(),
    ]),
  ),
  date_created: t.Optional(
    t.Union([
      t.String({
        description: 'The date that this account was created, in GMT in RFC 2822 format',
      }),
      t.Null(),
    ]),
  ),
  date_updated: t.Optional(
    t.Union([
      t.String({
        description: 'The date that this account was last updated, in GMT in RFC 2822 format.',
      }),
      t.Null(),
    ]),
  ),
  friendly_name: t.Optional(
    t.Union([
      t.String({
        description:
          'A human readable description of this account, up to 64 characters long. By default the FriendlyName is your email address.',
      }),
      t.Null(),
    ]),
  ),
  owner_account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          "The unique 34 character id that represents the parent of this account. The OwnerAccountSid of a parent account is it's own sid.",
      }),
      t.Null(),
    ]),
  ),
  sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'A 34 character string that uniquely identifies this resource.',
      }),
      t.Null(),
    ]),
  ),
  status: t.Optional(AccountEnumStatusSchema),
  subresource_uris: t.Optional(
    t.Union([
      t.Object(
        {},
        { description: 'A Map of various subresources available for the given Account Instance' },
      ),
      t.Null(),
    ]),
  ),
  type: t.Optional(AccountEnumTypeSchema),
  uri: t.Optional(
    t.Union([
      t.String({ description: 'The URI for this resource, relative to `https://api.twilio.com`' }),
      t.Null(),
    ]),
  ),
})

export const ApiV2010AccountAddressSchema = t.Object({
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that is responsible for the Address resource.',
      }),
      t.Null(),
    ]),
  ),
  city: t.Optional(
    t.Union([t.String({ description: 'The city in which the address is located.' }), t.Null()]),
  ),
  customer_name: t.Optional(
    t.Union([
      t.String({
        description:
          'The name associated with the address.This property has a maximum length of 16 4-byte characters, or 21 3-byte characters.',
      }),
      t.Null(),
    ]),
  ),
  date_created: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  date_updated: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  friendly_name: t.Optional(
    t.Union([
      t.String({ description: 'The string that you assigned to describe the resource.' }),
      t.Null(),
    ]),
  ),
  iso_country: t.Optional(
    t.Union([t.String({ description: 'The ISO country code of the address.' }), t.Null()]),
  ),
  postal_code: t.Optional(
    t.Union([t.String({ description: 'The postal code of the address.' }), t.Null()]),
  ),
  region: t.Optional(
    t.Union([t.String({ description: 'The state or region of the address.' }), t.Null()]),
  ),
  sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AD[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'The unique string that that we created to identify the Address resource.',
      }),
      t.Null(),
    ]),
  ),
  street: t.Optional(
    t.Union([t.String({ description: 'The number and street address of the address.' }), t.Null()]),
  ),
  uri: t.Optional(
    t.Union([
      t.String({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' }),
      t.Null(),
    ]),
  ),
  emergency_enabled: t.Optional(
    t.Union([
      t.Boolean({ description: 'Whether emergency calling has been enabled on this number.' }),
      t.Null(),
    ]),
  ),
  validated: t.Optional(
    t.Union([
      t.Boolean({
        description:
          "Whether the address has been validated to comply with local regulation. In countries that require valid addresses, an invalid address will not be accepted. `true` indicates the Address has been validated. `false` indicate the country doesn't require validation or the Address is not valid.",
      }),
      t.Null(),
    ]),
  ),
  verified: t.Optional(
    t.Union([
      t.Boolean({
        description:
          "Whether the address has been verified to comply with regulation. In countries that require valid addresses, an invalid address will not be accepted. `true` indicates the Address has been verified. `false` indicate the country doesn't require verified or the Address is not valid.",
      }),
      t.Null(),
    ]),
  ),
  street_secondary: t.Optional(
    t.Union([
      t.String({ description: 'The additional number and street address of the address.' }),
      t.Null(),
    ]),
  ),
})

export const ApiV2010AccountApplicationSchema = t.Object({
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Application resource.',
      }),
      t.Null(),
    ]),
  ),
  api_version: t.Optional(
    t.Union([
      t.String({ description: 'The API version used to start a new TwiML session.' }),
      t.Null(),
    ]),
  ),
  date_created: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  date_updated: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  friendly_name: t.Optional(
    t.Union([
      t.String({ description: 'The string that you assigned to describe the resource.' }),
      t.Null(),
    ]),
  ),
  message_status_callback: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        description:
          'The URL we call using a POST method to send message status information to your application.',
      }),
      t.Null(),
    ]),
  ),
  sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AP[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'The unique string that that we created to identify the Application resource.',
      }),
      t.Null(),
    ]),
  ),
  sms_fallback_method: t.Optional(
    t.Union([
      t.UnionEnum(['GET', 'POST'], {
        description: 'The HTTP method we use to call `sms_fallback_url`. Can be: `GET` or `POST`.',
        default: undefined,
      }),
      t.Null(),
    ]),
  ),
  sms_fallback_url: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        description:
          'The URL that we call when an error occurs while retrieving or executing the TwiML from `sms_url`.',
      }),
      t.Null(),
    ]),
  ),
  sms_method: t.Optional(
    t.Union([
      t.UnionEnum(['GET', 'POST'], {
        description: 'The HTTP method we use to call `sms_url`. Can be: `GET` or `POST`.',
        default: undefined,
      }),
      t.Null(),
    ]),
  ),
  sms_status_callback: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        description:
          'The URL we call using a POST method to send status information to your application about SMS messages that refer to the application.',
      }),
      t.Null(),
    ]),
  ),
  sms_url: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        description: 'The URL we call when the phone number receives an incoming SMS message.',
      }),
      t.Null(),
    ]),
  ),
  status_callback: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        description:
          'The URL we call using the `status_callback_method` to send status information to your application.',
      }),
      t.Null(),
    ]),
  ),
  status_callback_method: t.Optional(
    t.Union([
      t.UnionEnum(['GET', 'POST'], {
        description: 'The HTTP method we use to call `status_callback`. Can be: `GET` or `POST`.',
        default: undefined,
      }),
      t.Null(),
    ]),
  ),
  uri: t.Optional(
    t.Union([
      t.String({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' }),
      t.Null(),
    ]),
  ),
  voice_caller_id_lookup: t.Optional(
    t.Union([
      t.Boolean({
        description:
          "Whether we look up the caller's caller-ID name from the CNAM database (additional charges apply). Can be: `true` or `false`.",
      }),
      t.Null(),
    ]),
  ),
  voice_fallback_method: t.Optional(
    t.Union([
      t.UnionEnum(['GET', 'POST'], {
        description:
          'The HTTP method we use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
        default: undefined,
      }),
      t.Null(),
    ]),
  ),
  voice_fallback_url: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        description:
          'The URL that we call when an error occurs retrieving or executing the TwiML requested by `url`.',
      }),
      t.Null(),
    ]),
  ),
  voice_method: t.Optional(
    t.Union([
      t.UnionEnum(['GET', 'POST'], {
        description: 'The HTTP method we use to call `voice_url`. Can be: `GET` or `POST`.',
        default: undefined,
      }),
      t.Null(),
    ]),
  ),
  voice_url: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        description:
          'The URL we call when the phone number assigned to this application receives a call.',
      }),
      t.Null(),
    ]),
  ),
  public_application_connect_enabled: t.Optional(
    t.Union([
      t.Boolean({
        description:
          'Whether to allow other Twilio accounts to dial this applicaton using Dial verb. Can be: `true` or `false`.',
      }),
      t.Null(),
    ]),
  ),
})

export const AuthorizedConnectAppEnumPermissionSchema = t.UnionEnum(['get-all', 'post-all'], {
  description:
    'The set of permissions that you authorized for the Connect App.  Can be: `get-all` or `post-all`.',
  default: undefined,
})

export const ApiV2010AccountAuthorizedConnectAppSchema = t.Object({
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the AuthorizedConnectApp resource.',
      }),
      t.Null(),
    ]),
  ),
  connect_app_company_name: t.Optional(
    t.Union([t.String({ description: 'The company name set for the Connect App.' }), t.Null()]),
  ),
  connect_app_description: t.Optional(
    t.Union([t.String({ description: 'A detailed description of the Connect App.' }), t.Null()]),
  ),
  connect_app_friendly_name: t.Optional(
    t.Union([t.String({ description: 'The name of the Connect App.' }), t.Null()]),
  ),
  connect_app_homepage_url: t.Optional(
    t.Union([
      t.String({ format: 'uri', description: 'The public URL for the Connect App.' }),
      t.Null(),
    ]),
  ),
  connect_app_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^CN[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'The SID that we assigned to the Connect App.',
      }),
      t.Null(),
    ]),
  ),
  permissions: t.Optional(
    t.Union([
      t.Array(AuthorizedConnectAppEnumPermissionSchema, {
        description:
          'The set of permissions that you authorized for the Connect App.  Can be: `get-all` or `post-all`.',
      }),
      t.Null(),
    ]),
  ),
  uri: t.Optional(
    t.Union([
      t.String({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' }),
      t.Null(),
    ]),
  ),
})

export const ApiV2010AccountAvailablePhoneNumberCountrySchema = t.Object({
  country_code: t.Optional(
    t.Union([
      t.String({
        description:
          'The [ISO-3166-1](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code of the country.',
      }),
      t.Null(),
    ]),
  ),
  country: t.Optional(t.Union([t.String({ description: 'The name of the country.' }), t.Null()])),
  uri: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        description: 'The URI of the Country resource, relative to `https://api.twilio.com`.',
      }),
      t.Null(),
    ]),
  ),
  beta: t.Optional(
    t.Union([
      t.Boolean({
        description:
          'Whether all phone numbers available in the country are new to the Twilio platform. `true` if they are and `false` if all numbers are not in the Twilio Phone Number Beta program.',
      }),
      t.Null(),
    ]),
  ),
  subresource_uris: t.Optional(
    t.Union([
      t.Object(
        {},
        {
          description:
            'A list of related AvailablePhoneNumber resources identified by their URIs relative to `https://api.twilio.com`.',
        },
      ),
      t.Null(),
    ]),
  ),
})

export const ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberLocalSchema = t.Object({
  friendly_name: t.Optional(
    t.Union([t.String({ description: 'A formatted version of the phone number.' }), t.Null()]),
  ),
  phone_number: t.Optional(
    t.Union([
      t.String({
        description:
          'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
      }),
      t.Null(),
    ]),
  ),
  lata: t.Optional(
    t.Union([
      t.String({
        description:
          'The [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) of this phone number. Available for only phone numbers from the US and Canada.',
      }),
      t.Null(),
    ]),
  ),
  locality: t.Optional(
    t.Union([
      t.String({ description: "The locality or city of this phone number's location." }),
      t.Null(),
    ]),
  ),
  rate_center: t.Optional(
    t.Union([
      t.String({
        description:
          'The [rate center](https://en.wikipedia.org/wiki/Telephone_exchange) of this phone number. Available for only phone numbers from the US and Canada.',
      }),
      t.Null(),
    ]),
  ),
  latitude: t.Optional(
    t.Union([
      t.Number({
        description:
          "The latitude of this phone number's location. Available for only phone numbers from the US and Canada.",
      }),
      t.Null(),
    ]),
  ),
  longitude: t.Optional(
    t.Union([
      t.Number({
        description:
          "The longitude of this phone number's location. Available for only phone numbers from the US and Canada.",
      }),
      t.Null(),
    ]),
  ),
  region: t.Optional(
    t.Union([
      t.String({
        description:
          "The two-letter state or province abbreviation of this phone number's location. Available for only phone numbers from the US and Canada.",
      }),
      t.Null(),
    ]),
  ),
  postal_code: t.Optional(
    t.Union([
      t.String({
        description:
          "The postal or ZIP code of this phone number's location. Available for only phone numbers from the US and Canada.",
      }),
      t.Null(),
    ]),
  ),
  iso_country: t.Optional(
    t.Union([
      t.String({
        description:
          'The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of this phone number.',
      }),
      t.Null(),
    ]),
  ),
  address_requirements: t.Optional(
    t.Union([
      t.String({
        description:
          "The type of [Address](https://www.twilio.com/docs/usage/api/address) resource the phone number requires. Can be: `none`, `any`, `local`, or `foreign`. `none` means no address is required. `any` means an address is required, but it can be anywhere in the world. `local` means an address in the phone number's country is required. `foreign` means an address outside of the phone number's country is required.",
      }),
      t.Null(),
    ]),
  ),
  beta: t.Optional(
    t.Union([
      t.Boolean({
        description:
          'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
      }),
      t.Null(),
    ]),
  ),
  capabilities: t.Optional(
    t.Union([
      t.Object(
        {
          mms: t.Optional(t.Boolean()),
          sms: t.Optional(t.Boolean()),
          voice: t.Optional(t.Boolean()),
          fax: t.Optional(t.Boolean()),
        },
        {
          description:
            'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are: `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
        },
      ),
      t.Null(),
    ]),
  ),
})

export const ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMachineToMachineSchema =
  t.Object({
    friendly_name: t.Optional(
      t.Union([t.String({ description: 'A formatted version of the phone number.' }), t.Null()]),
    ),
    phone_number: t.Optional(
      t.Union([
        t.String({
          description:
            'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
        }),
        t.Null(),
      ]),
    ),
    lata: t.Optional(
      t.Union([
        t.String({
          description:
            'The [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) of this phone number. Available for only phone numbers from the US and Canada.',
        }),
        t.Null(),
      ]),
    ),
    locality: t.Optional(
      t.Union([
        t.String({ description: "The locality or city of this phone number's location." }),
        t.Null(),
      ]),
    ),
    rate_center: t.Optional(
      t.Union([
        t.String({
          description:
            'The [rate center](https://en.wikipedia.org/wiki/Telephone_exchange) of this phone number. Available for only phone numbers from the US and Canada.',
        }),
        t.Null(),
      ]),
    ),
    latitude: t.Optional(
      t.Union([
        t.Number({
          description:
            "The latitude of this phone number's location. Available for only phone numbers from the US and Canada.",
        }),
        t.Null(),
      ]),
    ),
    longitude: t.Optional(
      t.Union([
        t.Number({
          description:
            "The longitude of this phone number's location. Available for only phone numbers from the US and Canada.",
        }),
        t.Null(),
      ]),
    ),
    region: t.Optional(
      t.Union([
        t.String({
          description:
            "The two-letter state or province abbreviation of this phone number's location. Available for only phone numbers from the US and Canada.",
        }),
        t.Null(),
      ]),
    ),
    postal_code: t.Optional(
      t.Union([
        t.String({
          description:
            "The postal or ZIP code of this phone number's location. Available for only phone numbers from the US and Canada.",
        }),
        t.Null(),
      ]),
    ),
    iso_country: t.Optional(
      t.Union([
        t.String({
          description:
            'The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of this phone number.',
        }),
        t.Null(),
      ]),
    ),
    address_requirements: t.Optional(
      t.Union([
        t.String({
          description:
            "The type of [Address](https://www.twilio.com/docs/usage/api/address) resource the phone number requires. Can be: `none`, `any`, `local`, or `foreign`. `none` means no address is required. `any` means an address is required, but it can be anywhere in the world. `local` means an address in the phone number's country is required. `foreign` means an address outside of the phone number's country is required.",
        }),
        t.Null(),
      ]),
    ),
    beta: t.Optional(
      t.Union([
        t.Boolean({
          description:
            'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
        }),
        t.Null(),
      ]),
    ),
    capabilities: t.Optional(
      t.Union([
        t.Object(
          {
            mms: t.Optional(t.Boolean()),
            sms: t.Optional(t.Boolean()),
            voice: t.Optional(t.Boolean()),
            fax: t.Optional(t.Boolean()),
          },
          {
            description:
              'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are: `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
          },
        ),
        t.Null(),
      ]),
    ),
  })

export const ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMobileSchema = t.Object({
  friendly_name: t.Optional(
    t.Union([t.String({ description: 'A formatted version of the phone number.' }), t.Null()]),
  ),
  phone_number: t.Optional(
    t.Union([
      t.String({
        description:
          'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
      }),
      t.Null(),
    ]),
  ),
  lata: t.Optional(
    t.Union([
      t.String({
        description:
          'The [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) of this phone number. Available for only phone numbers from the US and Canada.',
      }),
      t.Null(),
    ]),
  ),
  locality: t.Optional(
    t.Union([
      t.String({ description: "The locality or city of this phone number's location." }),
      t.Null(),
    ]),
  ),
  rate_center: t.Optional(
    t.Union([
      t.String({
        description:
          'The [rate center](https://en.wikipedia.org/wiki/Telephone_exchange) of this phone number. Available for only phone numbers from the US and Canada.',
      }),
      t.Null(),
    ]),
  ),
  latitude: t.Optional(
    t.Union([
      t.Number({
        description:
          "The latitude of this phone number's location. Available for only phone numbers from the US and Canada.",
      }),
      t.Null(),
    ]),
  ),
  longitude: t.Optional(
    t.Union([
      t.Number({
        description:
          "The longitude of this phone number's location. Available for only phone numbers from the US and Canada.",
      }),
      t.Null(),
    ]),
  ),
  region: t.Optional(
    t.Union([
      t.String({
        description:
          "The two-letter state or province abbreviation of this phone number's location. Available for only phone numbers from the US and Canada.",
      }),
      t.Null(),
    ]),
  ),
  postal_code: t.Optional(
    t.Union([
      t.String({
        description:
          "The postal or ZIP code of this phone number's location. Available for only phone numbers from the US and Canada.",
      }),
      t.Null(),
    ]),
  ),
  iso_country: t.Optional(
    t.Union([
      t.String({
        description:
          'The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of this phone number.',
      }),
      t.Null(),
    ]),
  ),
  address_requirements: t.Optional(
    t.Union([
      t.String({
        description:
          "The type of [Address](https://www.twilio.com/docs/usage/api/address) resource the phone number requires. Can be: `none`, `any`, `local`, or `foreign`. `none` means no address is required. `any` means an address is required, but it can be anywhere in the world. `local` means an address in the phone number's country is required. `foreign` means an address outside of the phone number's country is required.",
      }),
      t.Null(),
    ]),
  ),
  beta: t.Optional(
    t.Union([
      t.Boolean({
        description:
          'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
      }),
      t.Null(),
    ]),
  ),
  capabilities: t.Optional(
    t.Union([
      t.Object(
        {
          mms: t.Optional(t.Boolean()),
          sms: t.Optional(t.Boolean()),
          voice: t.Optional(t.Boolean()),
          fax: t.Optional(t.Boolean()),
        },
        {
          description:
            'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are: `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
        },
      ),
      t.Null(),
    ]),
  ),
})

export const ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberNationalSchema =
  t.Object({
    friendly_name: t.Optional(
      t.Union([t.String({ description: 'A formatted version of the phone number.' }), t.Null()]),
    ),
    phone_number: t.Optional(
      t.Union([
        t.String({
          description:
            'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
        }),
        t.Null(),
      ]),
    ),
    lata: t.Optional(
      t.Union([
        t.String({
          description:
            'The [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) of this phone number. Available for only phone numbers from the US and Canada.',
        }),
        t.Null(),
      ]),
    ),
    locality: t.Optional(
      t.Union([
        t.String({ description: "The locality or city of this phone number's location." }),
        t.Null(),
      ]),
    ),
    rate_center: t.Optional(
      t.Union([
        t.String({
          description:
            'The [rate center](https://en.wikipedia.org/wiki/Telephone_exchange) of this phone number. Available for only phone numbers from the US and Canada.',
        }),
        t.Null(),
      ]),
    ),
    latitude: t.Optional(
      t.Union([
        t.Number({
          description:
            "The latitude of this phone number's location. Available for only phone numbers from the US and Canada.",
        }),
        t.Null(),
      ]),
    ),
    longitude: t.Optional(
      t.Union([
        t.Number({
          description:
            "The longitude of this phone number's location. Available for only phone numbers from the US and Canada.",
        }),
        t.Null(),
      ]),
    ),
    region: t.Optional(
      t.Union([
        t.String({
          description:
            "The two-letter state or province abbreviation of this phone number's location. Available for only phone numbers from the US and Canada.",
        }),
        t.Null(),
      ]),
    ),
    postal_code: t.Optional(
      t.Union([
        t.String({
          description:
            "The postal or ZIP code of this phone number's location. Available for only phone numbers from the US and Canada.",
        }),
        t.Null(),
      ]),
    ),
    iso_country: t.Optional(
      t.Union([
        t.String({
          description:
            'The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of this phone number.',
        }),
        t.Null(),
      ]),
    ),
    address_requirements: t.Optional(
      t.Union([
        t.String({
          description:
            "The type of [Address](https://www.twilio.com/docs/usage/api/address) resource the phone number requires. Can be: `none`, `any`, `local`, or `foreign`. `none` means no address is required. `any` means an address is required, but it can be anywhere in the world. `local` means an address in the phone number's country is required. `foreign` means an address outside of the phone number's country is required.",
        }),
        t.Null(),
      ]),
    ),
    beta: t.Optional(
      t.Union([
        t.Boolean({
          description:
            'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
        }),
        t.Null(),
      ]),
    ),
    capabilities: t.Optional(
      t.Union([
        t.Object(
          {
            mms: t.Optional(t.Boolean()),
            sms: t.Optional(t.Boolean()),
            voice: t.Optional(t.Boolean()),
            fax: t.Optional(t.Boolean()),
          },
          {
            description:
              'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are: `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
          },
        ),
        t.Null(),
      ]),
    ),
  })

export const ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberSharedCostSchema =
  t.Object({
    friendly_name: t.Optional(
      t.Union([t.String({ description: 'A formatted version of the phone number.' }), t.Null()]),
    ),
    phone_number: t.Optional(
      t.Union([
        t.String({
          description:
            'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
        }),
        t.Null(),
      ]),
    ),
    lata: t.Optional(
      t.Union([
        t.String({
          description:
            'The [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) of this phone number. Available for only phone numbers from the US and Canada.',
        }),
        t.Null(),
      ]),
    ),
    locality: t.Optional(
      t.Union([
        t.String({ description: "The locality or city of this phone number's location." }),
        t.Null(),
      ]),
    ),
    rate_center: t.Optional(
      t.Union([
        t.String({
          description:
            'The [rate center](https://en.wikipedia.org/wiki/Telephone_exchange) of this phone number. Available for only phone numbers from the US and Canada.',
        }),
        t.Null(),
      ]),
    ),
    latitude: t.Optional(
      t.Union([
        t.Number({
          description:
            "The latitude of this phone number's location. Available for only phone numbers from the US and Canada.",
        }),
        t.Null(),
      ]),
    ),
    longitude: t.Optional(
      t.Union([
        t.Number({
          description:
            "The longitude of this phone number's location. Available for only phone numbers from the US and Canada.",
        }),
        t.Null(),
      ]),
    ),
    region: t.Optional(
      t.Union([
        t.String({
          description:
            "The two-letter state or province abbreviation of this phone number's location. Available for only phone numbers from the US and Canada.",
        }),
        t.Null(),
      ]),
    ),
    postal_code: t.Optional(
      t.Union([
        t.String({
          description:
            "The postal or ZIP code of this phone number's location. Available for only phone numbers from the US and Canada.",
        }),
        t.Null(),
      ]),
    ),
    iso_country: t.Optional(
      t.Union([
        t.String({
          description:
            'The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of this phone number.',
        }),
        t.Null(),
      ]),
    ),
    address_requirements: t.Optional(
      t.Union([
        t.String({
          description:
            "The type of [Address](https://www.twilio.com/docs/usage/api/address) resource the phone number requires. Can be: `none`, `any`, `local`, or `foreign`. `none` means no address is required. `any` means an address is required, but it can be anywhere in the world. `local` means an address in the phone number's country is required. `foreign` means an address outside of the phone number's country is required.",
        }),
        t.Null(),
      ]),
    ),
    beta: t.Optional(
      t.Union([
        t.Boolean({
          description:
            'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
        }),
        t.Null(),
      ]),
    ),
    capabilities: t.Optional(
      t.Union([
        t.Object(
          {
            mms: t.Optional(t.Boolean()),
            sms: t.Optional(t.Boolean()),
            voice: t.Optional(t.Boolean()),
            fax: t.Optional(t.Boolean()),
          },
          {
            description:
              'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are: `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
          },
        ),
        t.Null(),
      ]),
    ),
  })

export const ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberTollFreeSchema =
  t.Object({
    friendly_name: t.Optional(
      t.Union([t.String({ description: 'A formatted version of the phone number.' }), t.Null()]),
    ),
    phone_number: t.Optional(
      t.Union([
        t.String({
          description:
            'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
        }),
        t.Null(),
      ]),
    ),
    lata: t.Optional(
      t.Union([
        t.String({
          description:
            'The [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) of this phone number. Available for only phone numbers from the US and Canada.',
        }),
        t.Null(),
      ]),
    ),
    locality: t.Optional(
      t.Union([
        t.String({ description: "The locality or city of this phone number's location." }),
        t.Null(),
      ]),
    ),
    rate_center: t.Optional(
      t.Union([
        t.String({
          description:
            'The [rate center](https://en.wikipedia.org/wiki/Telephone_exchange) of this phone number. Available for only phone numbers from the US and Canada.',
        }),
        t.Null(),
      ]),
    ),
    latitude: t.Optional(
      t.Union([
        t.Number({
          description:
            "The latitude of this phone number's location. Available for only phone numbers from the US and Canada.",
        }),
        t.Null(),
      ]),
    ),
    longitude: t.Optional(
      t.Union([
        t.Number({
          description:
            "The longitude of this phone number's location. Available for only phone numbers from the US and Canada.",
        }),
        t.Null(),
      ]),
    ),
    region: t.Optional(
      t.Union([
        t.String({
          description:
            "The two-letter state or province abbreviation of this phone number's location. Available for only phone numbers from the US and Canada.",
        }),
        t.Null(),
      ]),
    ),
    postal_code: t.Optional(
      t.Union([
        t.String({
          description:
            "The postal or ZIP code of this phone number's location. Available for only phone numbers from the US and Canada.",
        }),
        t.Null(),
      ]),
    ),
    iso_country: t.Optional(
      t.Union([
        t.String({
          description:
            'The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of this phone number.',
        }),
        t.Null(),
      ]),
    ),
    address_requirements: t.Optional(
      t.Union([
        t.String({
          description:
            "The type of [Address](https://www.twilio.com/docs/usage/api/address) resource the phone number requires. Can be: `none`, `any`, `local`, or `foreign`. `none` means no address is required. `any` means an address is required, but it can be anywhere in the world. `local` means an address in the phone number's country is required. `foreign` means an address outside of the phone number's country is required.",
        }),
        t.Null(),
      ]),
    ),
    beta: t.Optional(
      t.Union([
        t.Boolean({
          description:
            'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
        }),
        t.Null(),
      ]),
    ),
    capabilities: t.Optional(
      t.Union([
        t.Object(
          {
            mms: t.Optional(t.Boolean()),
            sms: t.Optional(t.Boolean()),
            voice: t.Optional(t.Boolean()),
            fax: t.Optional(t.Boolean()),
          },
          {
            description:
              'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are: `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
          },
        ),
        t.Null(),
      ]),
    ),
  })

export const ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberVoipSchema = t.Object({
  friendly_name: t.Optional(
    t.Union([t.String({ description: 'A formatted version of the phone number.' }), t.Null()]),
  ),
  phone_number: t.Optional(
    t.Union([
      t.String({
        description:
          'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
      }),
      t.Null(),
    ]),
  ),
  lata: t.Optional(
    t.Union([
      t.String({
        description:
          'The [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) of this phone number. Available for only phone numbers from the US and Canada.',
      }),
      t.Null(),
    ]),
  ),
  locality: t.Optional(
    t.Union([
      t.String({ description: "The locality or city of this phone number's location." }),
      t.Null(),
    ]),
  ),
  rate_center: t.Optional(
    t.Union([
      t.String({
        description:
          'The [rate center](https://en.wikipedia.org/wiki/Telephone_exchange) of this phone number. Available for only phone numbers from the US and Canada.',
      }),
      t.Null(),
    ]),
  ),
  latitude: t.Optional(
    t.Union([
      t.Number({
        description:
          "The latitude of this phone number's location. Available for only phone numbers from the US and Canada.",
      }),
      t.Null(),
    ]),
  ),
  longitude: t.Optional(
    t.Union([
      t.Number({
        description:
          "The longitude of this phone number's location. Available for only phone numbers from the US and Canada.",
      }),
      t.Null(),
    ]),
  ),
  region: t.Optional(
    t.Union([
      t.String({
        description:
          "The two-letter state or province abbreviation of this phone number's location. Available for only phone numbers from the US and Canada.",
      }),
      t.Null(),
    ]),
  ),
  postal_code: t.Optional(
    t.Union([
      t.String({
        description:
          "The postal or ZIP code of this phone number's location. Available for only phone numbers from the US and Canada.",
      }),
      t.Null(),
    ]),
  ),
  iso_country: t.Optional(
    t.Union([
      t.String({
        description:
          'The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of this phone number.',
      }),
      t.Null(),
    ]),
  ),
  address_requirements: t.Optional(
    t.Union([
      t.String({
        description:
          "The type of [Address](https://www.twilio.com/docs/usage/api/address) resource the phone number requires. Can be: `none`, `any`, `local`, or `foreign`. `none` means no address is required. `any` means an address is required, but it can be anywhere in the world. `local` means an address in the phone number's country is required. `foreign` means an address outside of the phone number's country is required.",
      }),
      t.Null(),
    ]),
  ),
  beta: t.Optional(
    t.Union([
      t.Boolean({
        description:
          'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
      }),
      t.Null(),
    ]),
  ),
  capabilities: t.Optional(
    t.Union([
      t.Object(
        {
          mms: t.Optional(t.Boolean()),
          sms: t.Optional(t.Boolean()),
          voice: t.Optional(t.Boolean()),
          fax: t.Optional(t.Boolean()),
        },
        {
          description:
            'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are: `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
        },
      ),
      t.Null(),
    ]),
  ),
})

export const ApiV2010AccountBalanceSchema = t.Object({
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'The unique SID identifier of the Account.',
      }),
      t.Null(),
    ]),
  ),
  balance: t.Optional(
    t.Union([
      t.String({
        description:
          'The balance of the Account, in units specified by the unit parameter. Balance changes may not be reflected immediately. Child accounts do not contain balance information',
      }),
      t.Null(),
    ]),
  ),
  currency: t.Optional(
    t.Union([t.String({ description: 'The units of currency for the account balance' }), t.Null()]),
  ),
})

export const CallEnumStatusSchema = t.UnionEnum(
  ['queued', 'ringing', 'in-progress', 'completed', 'busy', 'failed', 'no-answer', 'canceled'],
  {
    description:
      'The status of this call. Can be: `queued`, `ringing`, `in-progress`, `canceled`, `completed`, `failed`, `busy` or `no-answer`. See [Call Status Values](https://www.twilio.com/docs/voice/api/call-resource#call-status-values) below for more information.',
    default: undefined,
  },
)

export const ApiV2010AccountCallSchema = t.Object({
  sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^CA[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'The unique string that we created to identify this Call resource.',
      }),
      t.Null(),
    ]),
  ),
  date_created: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in UTC that this resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  date_updated: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in UTC that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  parent_call_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^CA[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'The SID that identifies the call that created this leg.',
      }),
      t.Null(),
    ]),
  ),
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Call resource.',
      }),
      t.Null(),
    ]),
  ),
  to: t.Optional(
    t.Union([
      t.String({
        description:
          'The phone number, SIP address, Client identifier or SIM SID that received this call. Phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +16175551212). SIP addresses are formatted as `name@company.com`. Client identifiers are formatted `client:name`. SIM SIDs are formatted as `sim:sid`.',
      }),
      t.Null(),
    ]),
  ),
  to_formatted: t.Optional(
    t.Union([
      t.String({
        description:
          'The phone number, SIP address or Client identifier that received this call. Formatted for display. Non-North American phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +442071838750).',
      }),
      t.Null(),
    ]),
  ),
  from: t.Optional(
    t.Union([
      t.String({
        description:
          'The phone number, SIP address, Client identifier or SIM SID that made this call. Phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +16175551212). SIP addresses are formatted as `name@company.com`. Client identifiers are formatted `client:name`. SIM SIDs are formatted as `sim:sid`.',
      }),
      t.Null(),
    ]),
  ),
  from_formatted: t.Optional(
    t.Union([
      t.String({
        description:
          'The calling phone number, SIP address, or Client identifier formatted for display. Non-North American phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +442071838750).',
      }),
      t.Null(),
    ]),
  ),
  phone_number_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^PN[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'If the call was inbound, this is the SID of the IncomingPhoneNumber resource that received the call. If the call was outbound, it is the SID of the OutgoingCallerId resource from which the call was placed.',
      }),
      t.Null(),
    ]),
  ),
  status: t.Optional(CallEnumStatusSchema),
  start_time: t.Optional(
    t.Union([
      t.String({
        description:
          'The start time of the call, given as UTC in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format. Empty if the call has not yet been dialed.',
      }),
      t.Null(),
    ]),
  ),
  end_time: t.Optional(
    t.Union([
      t.String({
        description:
          'The time the call ended, given as UTC in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format. Empty if the call did not complete successfully.',
      }),
      t.Null(),
    ]),
  ),
  duration: t.Optional(
    t.Union([
      t.String({
        description:
          'The length of the call in seconds. This value is empty for busy, failed, unanswered, or ongoing calls.',
      }),
      t.Null(),
    ]),
  ),
  price: t.Optional(
    t.Union([
      t.String({
        description:
          'The charge for this call, in the currency associated with the account. Populated after the call is completed. May not be immediately available. The price associated with a call only reflects the charge for connectivity.  Charges for other call-related features such as Answering Machine Detection, Text-To-Speech, and SIP REFER are not included in this value.',
      }),
      t.Null(),
    ]),
  ),
  price_unit: t.Optional(
    t.Union([
      t.String({
        description:
          'The currency in which `Price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format (e.g., `USD`, `EUR`, `JPY`). Always capitalized for calls.',
      }),
      t.Null(),
    ]),
  ),
  direction: t.Optional(
    t.Union([
      t.String({
        description:
          'A string describing the direction of the call. Can be: `inbound` for inbound calls, `outbound-api` for calls initiated via the REST API or `outbound-dial` for calls initiated by a `<Dial>` verb. Using [Elastic SIP Trunking](https://www.twilio.com/docs/sip-trunking), the values can be [`trunking-terminating`](https://www.twilio.com/docs/sip-trunking#termination) for outgoing calls from your communications infrastructure to the PSTN or [`trunking-originating`](https://www.twilio.com/docs/sip-trunking#origination) for incoming calls to your communications infrastructure from the PSTN.',
      }),
      t.Null(),
    ]),
  ),
  answered_by: t.Optional(
    t.Union([
      t.String({
        description:
          'Either `human` or `machine` if this call was initiated with answering machine detection. Empty otherwise.',
      }),
      t.Null(),
    ]),
  ),
  api_version: t.Optional(
    t.Union([t.String({ description: 'The API version used to create the call.' }), t.Null()]),
  ),
  forwarded_from: t.Optional(
    t.Union([
      t.String({
        description:
          'The forwarding phone number if this call was an incoming call forwarded from another number (depends on carrier supporting forwarding). Otherwise, empty.',
      }),
      t.Null(),
    ]),
  ),
  group_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^GP[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The Group SID associated with this call. If no Group is associated with the call, the field is empty.',
      }),
      t.Null(),
    ]),
  ),
  caller_name: t.Optional(
    t.Union([
      t.String({
        description:
          "The caller's name if this call was an incoming call to a phone number with caller ID Lookup enabled. Otherwise, empty.",
      }),
      t.Null(),
    ]),
  ),
  queue_time: t.Optional(
    t.Union([
      t.String({ description: 'The wait time in milliseconds before the call is placed.' }),
      t.Null(),
    ]),
  ),
  stir_verstat: t.Optional(
    t.Union([
      t.String({
        description:
          'The STIR/SHAKEN verification status of the call, for example `TN-Validation-Passed-A`. Empty if the incoming call had no STIR/SHAKEN information.',
      }),
      t.Null(),
    ]),
  ),
  trunk_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^TK[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The unique identifier of the trunk resource that was used for this call. The field is empty if the call was not made using a SIP trunk or if the call is not terminated.',
      }),
      t.Null(),
    ]),
  ),
  uri: t.Optional(
    t.Union([
      t.String({ description: 'The URI of this resource, relative to `https://api.twilio.com`.' }),
      t.Null(),
    ]),
  ),
  subresource_uris: t.Optional(
    t.Union([
      t.Object(
        {},
        {
          description:
            'A list of subresources available to this call, identified by their URIs relative to `https://api.twilio.com`.',
        },
      ),
      t.Null(),
    ]),
  ),
})

export const CallEnumEventSchema = t.UnionEnum(['initiated', 'ringing', 'answered', 'completed'], {
  default: undefined,
})

export const CallEnumUpdateStatusSchema = t.UnionEnum(['canceled', 'completed'], {
  default: undefined,
})

export const ApiV2010AccountCallCallEventSchema = t.Object({
  request: t.Optional(t.Unknown()),
  response: t.Optional(t.Unknown()),
})

export const ApiV2010AccountCallCallNotificationSchema = t.Object({
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Call Notification resource.',
      }),
      t.Null(),
    ]),
  ),
  api_version: t.Optional(
    t.Union([
      t.String({ description: 'The API version used to create the Call Notification resource.' }),
      t.Null(),
    ]),
  ),
  call_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^CA[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Call Notification resource is associated with.',
      }),
      t.Null(),
    ]),
  ),
  date_created: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  date_updated: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  error_code: t.Optional(
    t.Union([
      t.String({
        description:
          'A unique error code for the error condition that is described in our [Error Dictionary](https://www.twilio.com/docs/api/errors).',
      }),
      t.Null(),
    ]),
  ),
  log: t.Optional(
    t.Union([
      t.String({
        description:
          'An integer log level that corresponds to the type of notification: `0` is ERROR, `1` is WARNING.',
      }),
      t.Null(),
    ]),
  ),
  message_date: t.Optional(
    t.Union([
      t.String({
        description:
          'The date the notification was actually generated in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. Message buffering can cause this value to differ from `date_created`.',
      }),
      t.Null(),
    ]),
  ),
  message_text: t.Optional(
    t.Union([t.String({ description: 'The text of the notification.' }), t.Null()]),
  ),
  more_info: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        description:
          'The URL for more information about the error condition. This value is a page in our [Error Dictionary](https://www.twilio.com/docs/api/errors).',
      }),
      t.Null(),
    ]),
  ),
  request_method: t.Optional(
    t.Union([
      t.UnionEnum(['GET', 'POST'], {
        description:
          'The HTTP method used to generate the notification. If the notification was generated during a phone call, this is the HTTP Method used to request the resource on your server. If the notification was generated by your use of our REST API, this is the HTTP method used to call the resource on our servers.',
        default: undefined,
      }),
      t.Null(),
    ]),
  ),
  request_url: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        description:
          'The URL of the resource that generated the notification. If the notification was generated during a phone call, this is the URL of the resource on your server that caused the notification. If the notification was generated by your use of our REST API, this is the URL of the resource you called.',
      }),
      t.Null(),
    ]),
  ),
  sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^NO[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The unique string that that we created to identify the Call Notification resource.',
      }),
      t.Null(),
    ]),
  ),
  uri: t.Optional(
    t.Union([
      t.String({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' }),
      t.Null(),
    ]),
  ),
})

export const ApiV2010AccountCallCallNotificationInstanceSchema = t.Object({
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Call Notification resource.',
      }),
      t.Null(),
    ]),
  ),
  api_version: t.Optional(
    t.Union([
      t.String({ description: 'The API version used to create the Call Notification resource.' }),
      t.Null(),
    ]),
  ),
  call_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^CA[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Call Notification resource is associated with.',
      }),
      t.Null(),
    ]),
  ),
  date_created: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  date_updated: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  error_code: t.Optional(
    t.Union([
      t.String({
        description:
          'A unique error code for the error condition that is described in our [Error Dictionary](https://www.twilio.com/docs/api/errors).',
      }),
      t.Null(),
    ]),
  ),
  log: t.Optional(
    t.Union([
      t.String({
        description:
          'An integer log level that corresponds to the type of notification: `0` is ERROR, `1` is WARNING.',
      }),
      t.Null(),
    ]),
  ),
  message_date: t.Optional(
    t.Union([
      t.String({
        description:
          'The date the notification was actually generated in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. Message buffering can cause this value to differ from `date_created`.',
      }),
      t.Null(),
    ]),
  ),
  message_text: t.Optional(
    t.Union([t.String({ description: 'The text of the notification.' }), t.Null()]),
  ),
  more_info: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        description:
          'The URL for more information about the error condition. This value is a page in our [Error Dictionary](https://www.twilio.com/docs/api/errors).',
      }),
      t.Null(),
    ]),
  ),
  request_method: t.Optional(
    t.Union([
      t.UnionEnum(['GET', 'POST'], {
        description:
          'The HTTP method used to generate the notification. If the notification was generated during a phone call, this is the HTTP Method used to request the resource on your server. If the notification was generated by your use of our REST API, this is the HTTP method used to call the resource on our servers.',
        default: undefined,
      }),
      t.Null(),
    ]),
  ),
  request_url: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        description:
          'The URL of the resource that generated the notification. If the notification was generated during a phone call, this is the URL of the resource on your server that caused the notification. If the notification was generated by your use of our REST API, this is the URL of the resource you called.',
      }),
      t.Null(),
    ]),
  ),
  request_variables: t.Optional(
    t.Union([
      t.String({
        description:
          'The HTTP GET or POST variables we sent to your server. However, if the notification was generated by our REST API, this contains the HTTP POST or PUT variables you sent to our API.',
      }),
      t.Null(),
    ]),
  ),
  response_body: t.Optional(
    t.Union([t.String({ description: 'The HTTP body returned by your server.' }), t.Null()]),
  ),
  response_headers: t.Optional(
    t.Union([t.String({ description: 'The HTTP headers returned by your server.' }), t.Null()]),
  ),
  sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^NO[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The unique string that that we created to identify the Call Notification resource.',
      }),
      t.Null(),
    ]),
  ),
  uri: t.Optional(
    t.Union([
      t.String({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' }),
      t.Null(),
    ]),
  ),
})

export const CallRecordingEnumStatusSchema = t.UnionEnum(
  ['in-progress', 'paused', 'stopped', 'processing', 'completed', 'absent'],
  {
    description:
      'The status of the recording. Can be: `processing`, `completed` and `absent`. For more detailed statuses on in-progress recordings, check out how to [Update a Recording Resource](https://www.twilio.com/docs/voice/api/recording#update-a-recording-resource).',
    default: undefined,
  },
)

export const CallRecordingEnumSourceSchema = t.UnionEnum(
  [
    'DialVerb',
    'Conference',
    'OutboundAPI',
    'Trunking',
    'RecordVerb',
    'StartCallRecordingAPI',
    'StartConferenceRecordingAPI',
  ],
  {
    description:
      'How the recording was created. Can be: `DialVerb`, `Conference`, `OutboundAPI`, `Trunking`, `RecordVerb`, `StartCallRecordingAPI`, and `StartConferenceRecordingAPI`.',
    default: undefined,
  },
)

export const ApiV2010AccountCallCallRecordingSchema = t.Object({
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording resource.',
      }),
      t.Null(),
    ]),
  ),
  api_version: t.Optional(
    t.Union([t.String({ description: 'The API version used to make the recording.' }), t.Null()]),
  ),
  call_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^CA[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Recording resource is associated with.',
      }),
      t.Null(),
    ]),
  ),
  conference_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^CF[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The Conference SID that identifies the conference associated with the recording, if a conference recording.',
      }),
      t.Null(),
    ]),
  ),
  date_created: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  date_updated: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  start_time: t.Optional(
    t.Union([
      t.String({
        description:
          'The start time of the recording in GMT and in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
      }),
      t.Null(),
    ]),
  ),
  duration: t.Optional(
    t.Union([t.String({ description: 'The length of the recording in seconds.' }), t.Null()]),
  ),
  sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^RE[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'The unique string that that we created to identify the Recording resource.',
      }),
      t.Null(),
    ]),
  ),
  price: t.Optional(
    t.Union([
      t.Number({
        description: 'The one-time cost of creating the recording in the `price_unit` currency.',
      }),
      t.Null(),
    ]),
  ),
  uri: t.Optional(
    t.Union([
      t.String({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' }),
      t.Null(),
    ]),
  ),
  encryption_details: t.Optional(t.Unknown()),
  price_unit: t.Optional(
    t.Union([
      t.String({ description: 'The currency used in the `price` property. Example: `USD`.' }),
      t.Null(),
    ]),
  ),
  status: t.Optional(CallRecordingEnumStatusSchema),
  channels: t.Optional(
    t.Integer({
      maximum: 9007199254740991,
      description:
        'The number of channels in the final recording file.  Can be: `1`, or `2`. Separating a two leg call into two separate channels of the recording file is supported in [Dial](https://www.twilio.com/docs/voice/twiml/dial#attributes-record) and [Outbound Rest API](https://www.twilio.com/docs/voice/make-calls) record options.',
      default: 0,
    }),
  ),
  source: t.Optional(CallRecordingEnumSourceSchema),
  error_code: t.Optional(
    t.Union([
      t.Integer({
        maximum: 9007199254740991,
        description:
          'The error code that describes why the recording is `absent`. The error code is described in our [Error Dictionary](https://www.twilio.com/docs/api/errors). This value is null if the recording `status` is not `absent`.',
      }),
      t.Null(),
    ]),
  ),
  track: t.Optional(
    t.Union([
      t.String({ description: 'The recorded track. Can be: `inbound`, `outbound`, or `both`.' }),
      t.Null(),
    ]),
  ),
})

export const ConferenceEnumStatusSchema = t.UnionEnum(['init', 'in-progress', 'completed'], {
  description: 'The status of this conference. Can be: `init`, `in-progress`, or `completed`.',
  default: undefined,
})

export const ConferenceEnumReasonConferenceEndedSchema = t.UnionEnum(
  [
    'conference-ended-via-api',
    'participant-with-end-conference-on-exit-left',
    'participant-with-end-conference-on-exit-kicked',
    'last-participant-kicked',
    'last-participant-left',
  ],
  {
    description:
      'The reason why a conference ended. When a conference is in progress, will be `null`. When conference is completed, can be: `conference-ended-via-api`, `participant-with-end-conference-on-exit-left`, `participant-with-end-conference-on-exit-kicked`, `last-participant-kicked`, or `last-participant-left`.',
    default: undefined,
  },
)

export const ApiV2010AccountConferenceSchema = t.Object({
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Conference resource.',
      }),
      t.Null(),
    ]),
  ),
  date_created: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in UTC that this resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  date_updated: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in UTC that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  api_version: t.Optional(
    t.Union([
      t.String({ description: 'The API version used to create this conference.' }),
      t.Null(),
    ]),
  ),
  friendly_name: t.Optional(
    t.Union([
      t.String({
        description:
          'A string that you assigned to describe this conference room. Maximum length is 128 characters.',
      }),
      t.Null(),
    ]),
  ),
  region: t.Optional(
    t.Union([
      t.String({
        description:
          'A string that represents the Twilio Region where the conference audio was mixed. May be `us1`, `us2`, `ie1`,  `de1`, `sg1`, `br1`, `au1`, and `jp1`. Basic conference audio will always be mixed in `us1`. Global Conference audio will be mixed nearest to the majority of participants.',
      }),
      t.Null(),
    ]),
  ),
  sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^CF[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The unique, Twilio-provided string used to identify this Conference resource.',
      }),
      t.Null(),
    ]),
  ),
  status: t.Optional(ConferenceEnumStatusSchema),
  uri: t.Optional(
    t.Union([
      t.String({ description: 'The URI of this resource, relative to `https://api.twilio.com`.' }),
      t.Null(),
    ]),
  ),
  subresource_uris: t.Optional(
    t.Union([
      t.Object(
        {},
        {
          description:
            'A list of related resources identified by their URIs relative to `https://api.twilio.com`.',
        },
      ),
      t.Null(),
    ]),
  ),
  reason_conference_ended: t.Optional(ConferenceEnumReasonConferenceEndedSchema),
  call_sid_ending_conference: t.Optional(
    t.Union([
      t.String({
        pattern: '^CA[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'The call SID that caused the conference to end.',
      }),
      t.Null(),
    ]),
  ),
})

export const ConferenceEnumUpdateStatusSchema = t.Literal('completed')

export const ConferenceRecordingEnumStatusSchema = t.UnionEnum(
  ['in-progress', 'paused', 'stopped', 'processing', 'completed', 'absent'],
  {
    description:
      'The status of the recording. Can be: `processing`, `completed` and `absent`. For more detailed statuses on in-progress recordings, check out how to [Update a Recording Resource](https://www.twilio.com/docs/voice/api/recording#update-a-recording-resource).',
    default: undefined,
  },
)

export const ConferenceRecordingEnumSourceSchema = t.UnionEnum(
  [
    'DialVerb',
    'Conference',
    'OutboundAPI',
    'Trunking',
    'RecordVerb',
    'StartCallRecordingAPI',
    'StartConferenceRecordingAPI',
  ],
  {
    description:
      'How the recording was created. Can be: `DialVerb`, `Conference`, `OutboundAPI`, `Trunking`, `RecordVerb`, `StartCallRecordingAPI`, `StartConferenceRecordingAPI`.',
    default: undefined,
  },
)

export const ApiV2010AccountConferenceConferenceRecordingSchema = t.Object({
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Conference Recording resource.',
      }),
      t.Null(),
    ]),
  ),
  api_version: t.Optional(
    t.Union([t.String({ description: 'The API version used to create the recording.' }), t.Null()]),
  ),
  call_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^CA[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Conference Recording resource is associated with.',
      }),
      t.Null(),
    ]),
  ),
  conference_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^CF[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The Conference SID that identifies the conference associated with the recording.',
      }),
      t.Null(),
    ]),
  ),
  date_created: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  date_updated: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  start_time: t.Optional(
    t.Union([
      t.String({
        description:
          'The start time of the recording in GMT and in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
      }),
      t.Null(),
    ]),
  ),
  duration: t.Optional(
    t.Union([t.String({ description: 'The length of the recording in seconds.' }), t.Null()]),
  ),
  sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^RE[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The unique string that that we created to identify the Conference Recording resource.',
      }),
      t.Null(),
    ]),
  ),
  price: t.Optional(
    t.Union([
      t.String({
        description: 'The one-time cost of creating the recording in the `price_unit` currency.',
      }),
      t.Null(),
    ]),
  ),
  price_unit: t.Optional(
    t.Union([
      t.String({ description: 'The currency used in the `price` property. Example: `USD`.' }),
      t.Null(),
    ]),
  ),
  status: t.Optional(ConferenceRecordingEnumStatusSchema),
  channels: t.Optional(
    t.Integer({
      maximum: 9007199254740991,
      description:
        'The number of channels in the final recording file.  Can be: `1`, or `2`. Separating a two leg call into two separate channels of the recording file is supported in [Dial](https://www.twilio.com/docs/voice/twiml/dial#attributes-record) and [Outbound Rest API](https://www.twilio.com/docs/voice/make-calls) record options.',
      default: 0,
    }),
  ),
  source: t.Optional(ConferenceRecordingEnumSourceSchema),
  error_code: t.Optional(
    t.Union([
      t.Integer({
        maximum: 9007199254740991,
        description:
          'The error code that describes why the recording is `absent`. The error code is described in our [Error Dictionary](https://www.twilio.com/docs/api/errors). This value is null if the recording `status` is not `absent`.',
      }),
      t.Null(),
    ]),
  ),
  encryption_details: t.Optional(t.Unknown()),
  uri: t.Optional(
    t.Union([
      t.String({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' }),
      t.Null(),
    ]),
  ),
})

export const ConnectAppEnumPermissionSchema = t.UnionEnum(['get-all', 'post-all'], {
  description: 'The set of permissions that your ConnectApp requests.',
  default: undefined,
})

export const ApiV2010AccountConnectAppSchema = t.Object({
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the ConnectApp resource.',
      }),
      t.Null(),
    ]),
  ),
  authorize_redirect_url: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        description:
          'The URL we redirect the user to after we authenticate the user and obtain authorization to access the Connect App.',
      }),
      t.Null(),
    ]),
  ),
  company_name: t.Optional(
    t.Union([t.String({ description: 'The company name set for the Connect App.' }), t.Null()]),
  ),
  deauthorize_callback_method: t.Optional(
    t.Union([
      t.UnionEnum(['GET', 'POST'], {
        description: 'The HTTP method we use to call `deauthorize_callback_url`.',
        default: undefined,
      }),
      t.Null(),
    ]),
  ),
  deauthorize_callback_url: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        description:
          'The URL we call using the `deauthorize_callback_method` to de-authorize the Connect App.',
      }),
      t.Null(),
    ]),
  ),
  description: t.Optional(
    t.Union([t.String({ description: 'The description of the Connect App.' }), t.Null()]),
  ),
  friendly_name: t.Optional(
    t.Union([
      t.String({ description: 'The string that you assigned to describe the resource.' }),
      t.Null(),
    ]),
  ),
  homepage_url: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        description:
          'The public URL where users can obtain more information about this Connect App.',
      }),
      t.Null(),
    ]),
  ),
  permissions: t.Optional(
    t.Union([
      t.Array(ConnectAppEnumPermissionSchema, {
        description: 'The set of permissions that your ConnectApp requests.',
      }),
      t.Null(),
    ]),
  ),
  sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^CN[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'The unique string that that we created to identify the ConnectApp resource.',
      }),
      t.Null(),
    ]),
  ),
  uri: t.Optional(
    t.Union([
      t.String({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' }),
      t.Null(),
    ]),
  ),
})

export const DependentPhoneNumberEnumAddressRequirementSchema = t.UnionEnum(
  ['none', 'any', 'local', 'foreign'],
  {
    description:
      'Whether the phone number requires an [Address](https://www.twilio.com/docs/usage/api/address) registered with Twilio. Can be: `none`, `any`, `local`, or `foreign`.',
    default: undefined,
  },
)

export const DependentPhoneNumberEnumEmergencyStatusSchema = t.UnionEnum(['Active', 'Inactive'], {
  description: 'Whether the phone number is enabled for emergency calling.',
  default: undefined,
})

export const ApiV2010AccountAddressDependentPhoneNumberSchema = t.Object({
  sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^PN[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The unique string that that we created to identify the DependentPhoneNumber resource.',
      }),
      t.Null(),
    ]),
  ),
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the DependentPhoneNumber resource.',
      }),
      t.Null(),
    ]),
  ),
  friendly_name: t.Optional(
    t.Union([
      t.String({ description: 'The string that you assigned to describe the resource.' }),
      t.Null(),
    ]),
  ),
  phone_number: t.Optional(
    t.Union([
      t.String({
        description:
          'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
      }),
      t.Null(),
    ]),
  ),
  voice_url: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        description:
          'The URL we call when the phone number receives a call. The `voice_url` will not be used if a `voice_application_sid` or a `trunk_sid` is set.',
      }),
      t.Null(),
    ]),
  ),
  voice_method: t.Optional(
    t.Union([
      t.UnionEnum(['GET', 'POST'], {
        description: 'The HTTP method we use to call `voice_url`. Can be: `GET` or `POST`.',
        default: undefined,
      }),
      t.Null(),
    ]),
  ),
  voice_fallback_method: t.Optional(
    t.Union([
      t.UnionEnum(['GET', 'POST'], {
        description:
          'The HTTP method we use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
        default: undefined,
      }),
      t.Null(),
    ]),
  ),
  voice_fallback_url: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        description:
          'The URL that we call when an error occurs retrieving or executing the TwiML requested by `url`.',
      }),
      t.Null(),
    ]),
  ),
  voice_caller_id_lookup: t.Optional(
    t.Union([
      t.Boolean({
        description:
          "Whether we look up the caller's caller-ID name from the CNAM database. Can be: `true` or `false`. Caller ID lookups can cost $0.01 each.",
      }),
      t.Null(),
    ]),
  ),
  date_created: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  date_updated: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  sms_fallback_method: t.Optional(
    t.Union([
      t.UnionEnum(['GET', 'POST'], {
        description: 'The HTTP method we use to call `sms_fallback_url`. Can be: `GET` or `POST`.',
        default: undefined,
      }),
      t.Null(),
    ]),
  ),
  sms_fallback_url: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        description:
          'The URL that we call when an error occurs while retrieving or executing the TwiML from `sms_url`.',
      }),
      t.Null(),
    ]),
  ),
  sms_method: t.Optional(
    t.Union([
      t.UnionEnum(['GET', 'POST'], {
        description: 'The HTTP method we use to call `sms_url`. Can be: `GET` or `POST`.',
        default: undefined,
      }),
      t.Null(),
    ]),
  ),
  sms_url: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        description: 'The URL we call when the phone number receives an incoming SMS message.',
      }),
      t.Null(),
    ]),
  ),
  address_requirements: t.Optional(DependentPhoneNumberEnumAddressRequirementSchema),
  capabilities: t.Optional(t.Unknown()),
  status_callback: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        description:
          'The URL we call using the `status_callback_method` to send status information to your application.',
      }),
      t.Null(),
    ]),
  ),
  status_callback_method: t.Optional(
    t.Union([
      t.UnionEnum(['GET', 'POST'], {
        description: 'The HTTP method we use to call `status_callback`. Can be: `GET` or `POST`.',
        default: undefined,
      }),
      t.Null(),
    ]),
  ),
  api_version: t.Optional(
    t.Union([
      t.String({ description: 'The API version used to start a new TwiML session.' }),
      t.Null(),
    ]),
  ),
  sms_application_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AP[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the application that handles SMS messages sent to the phone number. If an `sms_application_sid` is present, we ignore all `sms_*_url` values and use those of the application.',
      }),
      t.Null(),
    ]),
  ),
  voice_application_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AP[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the application that handles calls to the phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
      }),
      t.Null(),
    ]),
  ),
  trunk_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^TK[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the Trunk that handles calls to the phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
      }),
      t.Null(),
    ]),
  ),
  emergency_status: t.Optional(DependentPhoneNumberEnumEmergencyStatusSchema),
  emergency_address_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AD[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the emergency address configuration that we use for emergency calling from the phone number.',
      }),
      t.Null(),
    ]),
  ),
  uri: t.Optional(
    t.Union([
      t.String({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' }),
      t.Null(),
    ]),
  ),
})

export const IncomingPhoneNumberEnumAddressRequirementSchema = t.UnionEnum(
  ['none', 'any', 'local', 'foreign'],
  {
    description:
      'Whether the phone number requires an [Address](https://www.twilio.com/docs/usage/api/address) registered with Twilio. Can be: `none`, `any`, `local`, or `foreign`.',
    default: undefined,
  },
)

export const IncomingPhoneNumberEnumVoiceReceiveModeSchema = t.UnionEnum(['voice', 'fax'], {
  default: undefined,
})

export const IncomingPhoneNumberEnumEmergencyStatusSchema = t.UnionEnum(['Active', 'Inactive'], {
  description:
    'The parameter displays if emergency calling is enabled for this number. Active numbers may place emergency calls by dialing valid emergency numbers for the country.',
  default: undefined,
})

export const IncomingPhoneNumberEnumEmergencyAddressStatusSchema = t.UnionEnum(
  [
    'registered',
    'unregistered',
    'pending-registration',
    'registration-failure',
    'pending-unregistration',
    'unregistration-failure',
  ],
  {
    description:
      'The status of address registration with emergency services. A registered emergency address will be used during handling of emergency calls from this number.',
    default: undefined,
  },
)

export const ApiV2010AccountIncomingPhoneNumberSchema = t.Object({
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this IncomingPhoneNumber resource.',
      }),
      t.Null(),
    ]),
  ),
  address_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AD[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'The SID of the Address resource associated with the phone number.',
      }),
      t.Null(),
    ]),
  ),
  address_requirements: t.Optional(IncomingPhoneNumberEnumAddressRequirementSchema),
  api_version: t.Optional(
    t.Union([
      t.String({ description: 'The API version used to start a new TwiML session.' }),
      t.Null(),
    ]),
  ),
  beta: t.Optional(
    t.Union([
      t.Boolean({
        description:
          'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
      }),
      t.Null(),
    ]),
  ),
  capabilities: t.Optional(
    t.Union([
      t.Object(
        {
          mms: t.Optional(t.Boolean()),
          sms: t.Optional(t.Boolean()),
          voice: t.Optional(t.Boolean()),
          fax: t.Optional(t.Boolean()),
        },
        {
          description:
            'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are  `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
        },
      ),
      t.Null(),
    ]),
  ),
  date_created: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  date_updated: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  friendly_name: t.Optional(
    t.Union([
      t.String({ description: 'The string that you assigned to describe the resource.' }),
      t.Null(),
    ]),
  ),
  identity_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^RI[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the Identity resource that we associate with the phone number. Some regions require an Identity to meet local regulations.',
      }),
      t.Null(),
    ]),
  ),
  phone_number: t.Optional(
    t.Union([
      t.String({
        description:
          'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
      }),
      t.Null(),
    ]),
  ),
  origin: t.Optional(
    t.Union([
      t.String({
        description:
          "The phone number's origin. `twilio` identifies Twilio-owned phone numbers and `hosted` identifies hosted phone numbers.",
      }),
      t.Null(),
    ]),
  ),
  sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^PN[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The unique string that that we created to identify this IncomingPhoneNumber resource.',
      }),
      t.Null(),
    ]),
  ),
  sms_application_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AP[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the application that handles SMS messages sent to the phone number. If an `sms_application_sid` is present, we ignore all `sms_*_url` values and use those of the application.',
      }),
      t.Null(),
    ]),
  ),
  sms_fallback_method: t.Optional(
    t.Union([
      t.UnionEnum(['GET', 'POST'], {
        description: 'The HTTP method we use to call `sms_fallback_url`. Can be: `GET` or `POST`.',
        default: undefined,
      }),
      t.Null(),
    ]),
  ),
  sms_fallback_url: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        description:
          'The URL that we call when an error occurs while retrieving or executing the TwiML from `sms_url`.',
      }),
      t.Null(),
    ]),
  ),
  sms_method: t.Optional(
    t.Union([
      t.UnionEnum(['GET', 'POST'], {
        description: 'The HTTP method we use to call `sms_url`. Can be: `GET` or `POST`.',
        default: undefined,
      }),
      t.Null(),
    ]),
  ),
  sms_url: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        description: 'The URL we call when the phone number receives an incoming SMS message.',
      }),
      t.Null(),
    ]),
  ),
  status_callback: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        description:
          'The URL we call using the `status_callback_method` to send status information to your application.',
      }),
      t.Null(),
    ]),
  ),
  status_callback_method: t.Optional(
    t.Union([
      t.UnionEnum(['GET', 'POST'], {
        description: 'The HTTP method we use to call `status_callback`. Can be: `GET` or `POST`.',
        default: undefined,
      }),
      t.Null(),
    ]),
  ),
  trunk_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^TK[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the Trunk that handles calls to the phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
      }),
      t.Null(),
    ]),
  ),
  uri: t.Optional(
    t.Union([
      t.String({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' }),
      t.Null(),
    ]),
  ),
  voice_receive_mode: t.Optional(IncomingPhoneNumberEnumVoiceReceiveModeSchema),
  voice_application_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AP[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the application that handles calls to the phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
      }),
      t.Null(),
    ]),
  ),
  voice_caller_id_lookup: t.Optional(
    t.Union([
      t.Boolean({
        description:
          "Whether we look up the caller's caller-ID name from the CNAM database ($0.01 per look up). Can be: `true` or `false`.",
      }),
      t.Null(),
    ]),
  ),
  voice_fallback_method: t.Optional(
    t.Union([
      t.UnionEnum(['GET', 'POST'], {
        description:
          'The HTTP method we use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
        default: undefined,
      }),
      t.Null(),
    ]),
  ),
  voice_fallback_url: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        description:
          'The URL that we call when an error occurs retrieving or executing the TwiML requested by `url`.',
      }),
      t.Null(),
    ]),
  ),
  voice_method: t.Optional(
    t.Union([
      t.UnionEnum(['GET', 'POST'], {
        description: 'The HTTP method we use to call `voice_url`. Can be: `GET` or `POST`.',
        default: undefined,
      }),
      t.Null(),
    ]),
  ),
  voice_url: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        description:
          'The URL we call when the phone number receives a call. The `voice_url` will not be used if a `voice_application_sid` or a `trunk_sid` is set.',
      }),
      t.Null(),
    ]),
  ),
  emergency_status: t.Optional(IncomingPhoneNumberEnumEmergencyStatusSchema),
  emergency_address_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AD[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the emergency address configuration that we use for emergency calling from this phone number.',
      }),
      t.Null(),
    ]),
  ),
  emergency_address_status: t.Optional(IncomingPhoneNumberEnumEmergencyAddressStatusSchema),
  bundle_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^BU[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
      }),
      t.Null(),
    ]),
  ),
  status: t.Optional(t.Union([t.String(), t.Null()])),
  type: t.Optional(t.Union([t.String({ description: 'The phone number type.' }), t.Null()])),
})

export const ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema = t.Object({
  sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^XE[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'The unique string that that we created to identify the resource.',
      }),
      t.Null(),
    ]),
  ),
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the resource.',
      }),
      t.Null(),
    ]),
  ),
  resource_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^PN[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'The SID of the Phone Number to which the Add-on is assigned.',
      }),
      t.Null(),
    ]),
  ),
  friendly_name: t.Optional(
    t.Union([
      t.String({ description: 'The string that you assigned to describe the resource.' }),
      t.Null(),
    ]),
  ),
  description: t.Optional(
    t.Union([
      t.String({
        description: 'A short description of the functionality that the Add-on provides.',
      }),
      t.Null(),
    ]),
  ),
  configuration: t.Optional(t.Unknown()),
  unique_name: t.Optional(
    t.Union([
      t.String({
        description:
          "An application-defined string that uniquely identifies the resource. It can be used in place of the resource's `sid` in the URL to address the resource.",
      }),
      t.Null(),
    ]),
  ),
  date_created: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  date_updated: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  uri: t.Optional(
    t.Union([
      t.String({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' }),
      t.Null(),
    ]),
  ),
  subresource_uris: t.Optional(
    t.Union([
      t.Object(
        {},
        { description: 'A list of related resources identified by their relative URIs.' },
      ),
      t.Null(),
    ]),
  ),
})

export const ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtensionSchema =
  t.Object({
    sid: t.Optional(
      t.Union([
        t.String({
          pattern: '^XF[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'The unique string that that we created to identify the resource.',
        }),
        t.Null(),
      ]),
    ),
    account_sid: t.Optional(
      t.Union([
        t.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the resource.',
        }),
        t.Null(),
      ]),
    ),
    resource_sid: t.Optional(
      t.Union([
        t.String({
          pattern: '^PN[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'The SID of the Phone Number to which the Add-on is assigned.',
        }),
        t.Null(),
      ]),
    ),
    assigned_add_on_sid: t.Optional(
      t.Union([
        t.String({
          pattern: '^XE[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'The SID that uniquely identifies the assigned Add-on installation.',
        }),
        t.Null(),
      ]),
    ),
    friendly_name: t.Optional(
      t.Union([
        t.String({ description: 'The string that you assigned to describe the resource.' }),
        t.Null(),
      ]),
    ),
    product_name: t.Optional(
      t.Union([
        t.String({
          description:
            'A string that you assigned to describe the Product this Extension is used within.',
        }),
        t.Null(),
      ]),
    ),
    unique_name: t.Optional(
      t.Union([
        t.String({
          description:
            "An application-defined string that uniquely identifies the resource. It can be used in place of the resource's `sid` in the URL to address the resource.",
        }),
        t.Null(),
      ]),
    ),
    uri: t.Optional(
      t.Union([
        t.String({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' }),
        t.Null(),
      ]),
    ),
    enabled: t.Optional(
      t.Union([t.Boolean({ description: 'Whether the Extension will be invoked.' }), t.Null()]),
    ),
  })

export const IncomingPhoneNumberLocalEnumAddressRequirementSchema = t.UnionEnum(
  ['none', 'any', 'local', 'foreign'],
  {
    description:
      'Whether the phone number requires an [Address](https://www.twilio.com/docs/usage/api/address) registered with Twilio. Can be: `none`, `any`, `local`, or `foreign`.',
    default: undefined,
  },
)

export const IncomingPhoneNumberLocalEnumVoiceReceiveModeSchema = t.UnionEnum(['voice', 'fax'], {
  default: undefined,
})

export const IncomingPhoneNumberLocalEnumEmergencyStatusSchema = t.UnionEnum(
  ['Active', 'Inactive'],
  {
    description:
      'The parameter displays if emergency calling is enabled for this number. Active numbers may place emergency calls by dialing valid emergency numbers for the country.',
    default: undefined,
  },
)

export const IncomingPhoneNumberLocalEnumEmergencyAddressStatusSchema = t.UnionEnum(
  [
    'registered',
    'unregistered',
    'pending-registration',
    'registration-failure',
    'pending-unregistration',
    'unregistration-failure',
  ],
  {
    description:
      'The status of address registration with emergency services. A registered emergency address will be used during handling of emergency calls from this number.',
    default: undefined,
  },
)

export const ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocalSchema = t.Object({
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the resource.',
      }),
      t.Null(),
    ]),
  ),
  address_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AD[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'The SID of the Address resource associated with the phone number.',
      }),
      t.Null(),
    ]),
  ),
  address_requirements: t.Optional(IncomingPhoneNumberLocalEnumAddressRequirementSchema),
  api_version: t.Optional(
    t.Union([
      t.String({ description: 'The API version used to start a new TwiML session.' }),
      t.Null(),
    ]),
  ),
  beta: t.Optional(
    t.Union([
      t.Boolean({
        description:
          'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
      }),
      t.Null(),
    ]),
  ),
  capabilities: t.Optional(
    t.Union([
      t.Object(
        {
          mms: t.Optional(t.Boolean()),
          sms: t.Optional(t.Boolean()),
          voice: t.Optional(t.Boolean()),
          fax: t.Optional(t.Boolean()),
        },
        {
          description:
            'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are  `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
        },
      ),
      t.Null(),
    ]),
  ),
  date_created: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  date_updated: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  friendly_name: t.Optional(
    t.Union([
      t.String({ description: 'The string that you assigned to describe the resource.' }),
      t.Null(),
    ]),
  ),
  identity_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^RI[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the Identity resource that we associate with the phone number. Some regions require an Identity to meet local regulations.',
      }),
      t.Null(),
    ]),
  ),
  phone_number: t.Optional(
    t.Union([
      t.String({
        description:
          'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
      }),
      t.Null(),
    ]),
  ),
  origin: t.Optional(
    t.Union([
      t.String({
        description:
          "The phone number's origin. `twilio` identifies Twilio-owned phone numbers and `hosted` identifies hosted phone numbers.",
      }),
      t.Null(),
    ]),
  ),
  sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^PN[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'The unique string that that we created to identify the resource.',
      }),
      t.Null(),
    ]),
  ),
  sms_application_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AP[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the application that handles SMS messages sent to the phone number. If an `sms_application_sid` is present, we ignore all `sms_*_url` values and use those of the application.',
      }),
      t.Null(),
    ]),
  ),
  sms_fallback_method: t.Optional(
    t.Union([
      t.UnionEnum(['GET', 'POST'], {
        description: 'The HTTP method we use to call `sms_fallback_url`. Can be: `GET` or `POST`.',
        default: undefined,
      }),
      t.Null(),
    ]),
  ),
  sms_fallback_url: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        description:
          'The URL that we call when an error occurs while retrieving or executing the TwiML from `sms_url`.',
      }),
      t.Null(),
    ]),
  ),
  sms_method: t.Optional(
    t.Union([
      t.UnionEnum(['GET', 'POST'], {
        description: 'The HTTP method we use to call `sms_url`. Can be: `GET` or `POST`.',
        default: undefined,
      }),
      t.Null(),
    ]),
  ),
  sms_url: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        description: 'The URL we call when the phone number receives an incoming SMS message.',
      }),
      t.Null(),
    ]),
  ),
  status_callback: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        description:
          'The URL we call using the `status_callback_method` to send status information to your application.',
      }),
      t.Null(),
    ]),
  ),
  status_callback_method: t.Optional(
    t.Union([
      t.UnionEnum(['GET', 'POST'], {
        description: 'The HTTP method we use to call `status_callback`. Can be: `GET` or `POST`.',
        default: undefined,
      }),
      t.Null(),
    ]),
  ),
  trunk_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^TK[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the Trunk that handles calls to the phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
      }),
      t.Null(),
    ]),
  ),
  uri: t.Optional(
    t.Union([
      t.String({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' }),
      t.Null(),
    ]),
  ),
  voice_receive_mode: t.Optional(IncomingPhoneNumberLocalEnumVoiceReceiveModeSchema),
  voice_application_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AP[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the application that handles calls to the phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
      }),
      t.Null(),
    ]),
  ),
  voice_caller_id_lookup: t.Optional(
    t.Union([
      t.Boolean({
        description:
          "Whether we look up the caller's caller-ID name from the CNAM database ($0.01 per look up). Can be: `true` or `false`.",
      }),
      t.Null(),
    ]),
  ),
  voice_fallback_method: t.Optional(
    t.Union([
      t.UnionEnum(['GET', 'POST'], {
        description:
          'The HTTP method we use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
        default: undefined,
      }),
      t.Null(),
    ]),
  ),
  voice_fallback_url: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        description:
          'The URL that we call when an error occurs retrieving or executing the TwiML requested by `url`.',
      }),
      t.Null(),
    ]),
  ),
  voice_method: t.Optional(
    t.Union([
      t.UnionEnum(['GET', 'POST'], {
        description: 'The HTTP method we use to call `voice_url`. Can be: `GET` or `POST`.',
        default: undefined,
      }),
      t.Null(),
    ]),
  ),
  voice_url: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        description:
          'The URL we call when this phone number receives a call. The `voice_url` will not be used if a `voice_application_sid` or a `trunk_sid` is set.',
      }),
      t.Null(),
    ]),
  ),
  emergency_status: t.Optional(IncomingPhoneNumberLocalEnumEmergencyStatusSchema),
  emergency_address_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AD[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the emergency address configuration that we use for emergency calling from this phone number.',
      }),
      t.Null(),
    ]),
  ),
  emergency_address_status: t.Optional(IncomingPhoneNumberLocalEnumEmergencyAddressStatusSchema),
  bundle_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^BU[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
      }),
      t.Null(),
    ]),
  ),
  status: t.Optional(t.Union([t.String(), t.Null()])),
})

export const IncomingPhoneNumberMobileEnumAddressRequirementSchema = t.UnionEnum(
  ['none', 'any', 'local', 'foreign'],
  {
    description:
      'Whether the phone number requires an [Address](https://www.twilio.com/docs/usage/api/address) registered with Twilio. Can be: `none`, `any`, `local`, or `foreign`.',
    default: undefined,
  },
)

export const IncomingPhoneNumberMobileEnumVoiceReceiveModeSchema = t.UnionEnum(['voice', 'fax'], {
  default: undefined,
})

export const IncomingPhoneNumberMobileEnumEmergencyStatusSchema = t.UnionEnum(
  ['Active', 'Inactive'],
  {
    description:
      'The parameter displays if emergency calling is enabled for this number. Active numbers may place emergency calls by dialing valid emergency numbers for the country.',
    default: undefined,
  },
)

export const IncomingPhoneNumberMobileEnumEmergencyAddressStatusSchema = t.UnionEnum(
  [
    'registered',
    'unregistered',
    'pending-registration',
    'registration-failure',
    'pending-unregistration',
    'unregistration-failure',
  ],
  {
    description:
      'The status of address registration with emergency services. A registered emergency address will be used during handling of emergency calls from this number.',
    default: undefined,
  },
)

export const ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobileSchema = t.Object({
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the resource.',
      }),
      t.Null(),
    ]),
  ),
  address_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AD[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'The SID of the Address resource associated with the phone number.',
      }),
      t.Null(),
    ]),
  ),
  address_requirements: t.Optional(IncomingPhoneNumberMobileEnumAddressRequirementSchema),
  api_version: t.Optional(
    t.Union([
      t.String({ description: 'The API version used to start a new TwiML session.' }),
      t.Null(),
    ]),
  ),
  beta: t.Optional(
    t.Union([
      t.Boolean({
        description:
          'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
      }),
      t.Null(),
    ]),
  ),
  capabilities: t.Optional(
    t.Union([
      t.Object(
        {
          mms: t.Optional(t.Boolean()),
          sms: t.Optional(t.Boolean()),
          voice: t.Optional(t.Boolean()),
          fax: t.Optional(t.Boolean()),
        },
        {
          description:
            'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are  `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
        },
      ),
      t.Null(),
    ]),
  ),
  date_created: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  date_updated: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  friendly_name: t.Optional(
    t.Union([
      t.String({ description: 'The string that you assigned to describe the resource.' }),
      t.Null(),
    ]),
  ),
  identity_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^RI[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the Identity resource that we associate with the phone number. Some regions require an Identity to meet local regulations.',
      }),
      t.Null(),
    ]),
  ),
  phone_number: t.Optional(
    t.Union([
      t.String({
        description:
          'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
      }),
      t.Null(),
    ]),
  ),
  origin: t.Optional(
    t.Union([
      t.String({
        description:
          "The phone number's origin. `twilio` identifies Twilio-owned phone numbers and `hosted` identifies hosted phone numbers.",
      }),
      t.Null(),
    ]),
  ),
  sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^PN[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'The unique string that that we created to identify the resource.',
      }),
      t.Null(),
    ]),
  ),
  sms_application_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AP[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the application that handles SMS messages sent to the phone number. If an `sms_application_sid` is present, we ignore all `sms_*_url` values and use those of the application.',
      }),
      t.Null(),
    ]),
  ),
  sms_fallback_method: t.Optional(
    t.Union([
      t.UnionEnum(['GET', 'POST'], {
        description: 'The HTTP method we use to call `sms_fallback_url`. Can be: `GET` or `POST`.',
        default: undefined,
      }),
      t.Null(),
    ]),
  ),
  sms_fallback_url: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        description:
          'The URL that we call when an error occurs while retrieving or executing the TwiML from `sms_url`.',
      }),
      t.Null(),
    ]),
  ),
  sms_method: t.Optional(
    t.Union([
      t.UnionEnum(['GET', 'POST'], {
        description: 'The HTTP method we use to call `sms_url`. Can be: `GET` or `POST`.',
        default: undefined,
      }),
      t.Null(),
    ]),
  ),
  sms_url: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        description: 'The URL we call when the phone number receives an incoming SMS message.',
      }),
      t.Null(),
    ]),
  ),
  status_callback: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        description:
          'The URL we call using the `status_callback_method` to send status information to your application.',
      }),
      t.Null(),
    ]),
  ),
  status_callback_method: t.Optional(
    t.Union([
      t.UnionEnum(['GET', 'POST'], {
        description: 'The HTTP method we use to call `status_callback`. Can be: `GET` or `POST`.',
        default: undefined,
      }),
      t.Null(),
    ]),
  ),
  trunk_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^TK[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the Trunk that handles calls to the phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
      }),
      t.Null(),
    ]),
  ),
  uri: t.Optional(
    t.Union([
      t.String({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' }),
      t.Null(),
    ]),
  ),
  voice_receive_mode: t.Optional(IncomingPhoneNumberMobileEnumVoiceReceiveModeSchema),
  voice_application_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AP[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the application that handles calls to the phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
      }),
      t.Null(),
    ]),
  ),
  voice_caller_id_lookup: t.Optional(
    t.Union([
      t.Boolean({
        description:
          "Whether we look up the caller's caller-ID name from the CNAM database ($0.01 per look up). Can be: `true` or `false`.",
      }),
      t.Null(),
    ]),
  ),
  voice_fallback_method: t.Optional(
    t.Union([
      t.UnionEnum(['GET', 'POST'], {
        description:
          'The HTTP method we use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
        default: undefined,
      }),
      t.Null(),
    ]),
  ),
  voice_fallback_url: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        description:
          'The URL that we call when an error occurs retrieving or executing the TwiML requested by `url`.',
      }),
      t.Null(),
    ]),
  ),
  voice_method: t.Optional(
    t.Union([
      t.UnionEnum(['GET', 'POST'], {
        description: 'The HTTP method we use to call `voice_url`. Can be: `GET` or `POST`.',
        default: undefined,
      }),
      t.Null(),
    ]),
  ),
  voice_url: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        description:
          'The URL we call when the phone number receives a call. The `voice_url` will not be used if a `voice_application_sid` or a `trunk_sid` is set.',
      }),
      t.Null(),
    ]),
  ),
  emergency_status: t.Optional(IncomingPhoneNumberMobileEnumEmergencyStatusSchema),
  emergency_address_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AD[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the emergency address configuration that we use for emergency calling from this phone number.',
      }),
      t.Null(),
    ]),
  ),
  emergency_address_status: t.Optional(IncomingPhoneNumberMobileEnumEmergencyAddressStatusSchema),
  bundle_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^BU[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
      }),
      t.Null(),
    ]),
  ),
  status: t.Optional(t.Union([t.String(), t.Null()])),
})

export const IncomingPhoneNumberTollFreeEnumAddressRequirementSchema = t.UnionEnum(
  ['none', 'any', 'local', 'foreign'],
  {
    description:
      'Whether the phone number requires an [Address](https://www.twilio.com/docs/usage/api/address) registered with Twilio. Can be: `none`, `any`, `local`, or `foreign`.',
    default: undefined,
  },
)

export const IncomingPhoneNumberTollFreeEnumVoiceReceiveModeSchema = t.UnionEnum(['voice', 'fax'], {
  default: undefined,
})

export const IncomingPhoneNumberTollFreeEnumEmergencyStatusSchema = t.UnionEnum(
  ['Active', 'Inactive'],
  {
    description:
      'The parameter displays if emergency calling is enabled for this number. Active numbers may place emergency calls by dialing valid emergency numbers for the country.',
    default: undefined,
  },
)

export const IncomingPhoneNumberTollFreeEnumEmergencyAddressStatusSchema = t.UnionEnum(
  [
    'registered',
    'unregistered',
    'pending-registration',
    'registration-failure',
    'pending-unregistration',
    'unregistration-failure',
  ],
  {
    description:
      'The status of address registration with emergency services. A registered emergency address will be used during handling of emergency calls from this number.',
    default: undefined,
  },
)

export const ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFreeSchema = t.Object({
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the resource.',
      }),
      t.Null(),
    ]),
  ),
  address_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AD[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'The SID of the Address resource associated with the phone number.',
      }),
      t.Null(),
    ]),
  ),
  address_requirements: t.Optional(IncomingPhoneNumberTollFreeEnumAddressRequirementSchema),
  api_version: t.Optional(
    t.Union([
      t.String({ description: 'The API version used to start a new TwiML session.' }),
      t.Null(),
    ]),
  ),
  beta: t.Optional(
    t.Union([
      t.Boolean({
        description:
          'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
      }),
      t.Null(),
    ]),
  ),
  capabilities: t.Optional(
    t.Union([
      t.Object(
        {
          mms: t.Optional(t.Boolean()),
          sms: t.Optional(t.Boolean()),
          voice: t.Optional(t.Boolean()),
          fax: t.Optional(t.Boolean()),
        },
        {
          description:
            'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are  `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
        },
      ),
      t.Null(),
    ]),
  ),
  date_created: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  date_updated: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  friendly_name: t.Optional(
    t.Union([
      t.String({ description: 'The string that you assigned to describe the resource.' }),
      t.Null(),
    ]),
  ),
  identity_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^RI[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the Identity resource that we associate with the phone number. Some regions require an Identity to meet local regulations.',
      }),
      t.Null(),
    ]),
  ),
  phone_number: t.Optional(
    t.Union([
      t.String({
        description:
          'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
      }),
      t.Null(),
    ]),
  ),
  origin: t.Optional(
    t.Union([
      t.String({
        description:
          "The phone number's origin. `twilio` identifies Twilio-owned phone numbers and `hosted` identifies hosted phone numbers.",
      }),
      t.Null(),
    ]),
  ),
  sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^PN[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'The unique string that that we created to identify the resource.',
      }),
      t.Null(),
    ]),
  ),
  sms_application_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AP[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the application that handles SMS messages sent to the phone number. If an `sms_application_sid` is present, we ignore all `sms_*_url` values and use those of the application.',
      }),
      t.Null(),
    ]),
  ),
  sms_fallback_method: t.Optional(
    t.Union([
      t.UnionEnum(['GET', 'POST'], {
        description: 'The HTTP method we use to call `sms_fallback_url`. Can be: `GET` or `POST`.',
        default: undefined,
      }),
      t.Null(),
    ]),
  ),
  sms_fallback_url: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        description:
          'The URL that we call when an error occurs while retrieving or executing the TwiML from `sms_url`.',
      }),
      t.Null(),
    ]),
  ),
  sms_method: t.Optional(
    t.Union([
      t.UnionEnum(['GET', 'POST'], {
        description: 'The HTTP method we use to call `sms_url`. Can be: `GET` or `POST`.',
        default: undefined,
      }),
      t.Null(),
    ]),
  ),
  sms_url: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        description: 'The URL we call when the phone number receives an incoming SMS message.',
      }),
      t.Null(),
    ]),
  ),
  status_callback: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        description:
          'The URL we call using the `status_callback_method` to send status information to your application.',
      }),
      t.Null(),
    ]),
  ),
  status_callback_method: t.Optional(
    t.Union([
      t.UnionEnum(['GET', 'POST'], {
        description: 'The HTTP method we use to call `status_callback`. Can be: `GET` or `POST`.',
        default: undefined,
      }),
      t.Null(),
    ]),
  ),
  trunk_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^TK[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the Trunk that handles calls to the phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
      }),
      t.Null(),
    ]),
  ),
  uri: t.Optional(
    t.Union([
      t.String({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' }),
      t.Null(),
    ]),
  ),
  voice_receive_mode: t.Optional(IncomingPhoneNumberTollFreeEnumVoiceReceiveModeSchema),
  voice_application_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AP[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the application that handles calls to the phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
      }),
      t.Null(),
    ]),
  ),
  voice_caller_id_lookup: t.Optional(
    t.Union([
      t.Boolean({
        description:
          "Whether we look up the caller's caller-ID name from the CNAM database ($0.01 per look up). Can be: `true` or `false`.",
      }),
      t.Null(),
    ]),
  ),
  voice_fallback_method: t.Optional(
    t.Union([
      t.UnionEnum(['GET', 'POST'], {
        description:
          'The HTTP method we use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
        default: undefined,
      }),
      t.Null(),
    ]),
  ),
  voice_fallback_url: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        description:
          'The URL that we call when an error occurs retrieving or executing the TwiML requested by `url`.',
      }),
      t.Null(),
    ]),
  ),
  voice_method: t.Optional(
    t.Union([
      t.UnionEnum(['GET', 'POST'], {
        description: 'The HTTP method we use to call `voice_url`. Can be: `GET` or `POST`.',
        default: undefined,
      }),
      t.Null(),
    ]),
  ),
  voice_url: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        description:
          'The URL we call when the phone number receives a call. The `voice_url` will not be used if a `voice_application_sid` or a `trunk_sid` is set.',
      }),
      t.Null(),
    ]),
  ),
  emergency_status: t.Optional(IncomingPhoneNumberTollFreeEnumEmergencyStatusSchema),
  emergency_address_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AD[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the emergency address configuration that we use for emergency calling from this phone number.',
      }),
      t.Null(),
    ]),
  ),
  emergency_address_status: t.Optional(IncomingPhoneNumberTollFreeEnumEmergencyAddressStatusSchema),
  bundle_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^BU[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
      }),
      t.Null(),
    ]),
  ),
  status: t.Optional(t.Union([t.String(), t.Null()])),
})

export const ApiV2010AccountKeySchema = t.Object({
  sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^SK[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'The unique string that that we created to identify the Key resource.',
      }),
      t.Null(),
    ]),
  ),
  friendly_name: t.Optional(
    t.Union([
      t.String({ description: 'The string that you assigned to describe the resource.' }),
      t.Null(),
    ]),
  ),
  date_created: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  date_updated: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
})

export const ApiV2010AccountMessageMediaSchema = t.Object({
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) associated with this Media resource.',
      }),
      t.Null(),
    ]),
  ),
  content_type: t.Optional(
    t.Union([
      t.String({
        description:
          'The default [MIME type](https://en.wikipedia.org/wiki/Internet_media_type) of the media, for example `image/jpeg`, `image/png`, or `image/gif`.',
      }),
      t.Null(),
    ]),
  ),
  date_created: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT when this Media resource was created, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  date_updated: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT when this Media resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  parent_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^(SM|MM)[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'The SID of the Message resource that is associated with this Media resource.',
      }),
      t.Null(),
    ]),
  ),
  sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^ME[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'The unique string that identifies this Media resource.',
      }),
      t.Null(),
    ]),
  ),
  uri: t.Optional(
    t.Union([
      t.String({
        description: 'The URI of this Media resource, relative to `https://api.twilio.com`.',
      }),
      t.Null(),
    ]),
  ),
})

export const ApiV2010AccountQueueMemberSchema = t.Object({
  call_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^CA[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Member resource is associated with.',
      }),
      t.Null(),
    ]),
  ),
  date_enqueued: t.Optional(
    t.Union([
      t.String({ description: 'The date that the member was enqueued, given in RFC 2822 format.' }),
      t.Null(),
    ]),
  ),
  position: t.Optional(
    t.Integer({
      maximum: 9007199254740991,
      description: "This member's current position in the queue.",
      default: 0,
    }),
  ),
  uri: t.Optional(
    t.Union([
      t.String({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' }),
      t.Null(),
    ]),
  ),
  wait_time: t.Optional(
    t.Integer({
      maximum: 9007199254740991,
      description: 'The number of seconds the member has been in the queue.',
      default: 0,
    }),
  ),
  queue_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^QU[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'The SID of the Queue the member is in.',
      }),
      t.Null(),
    ]),
  ),
})

export const MessageEnumDirectionSchema = t.UnionEnum(
  ['inbound', 'outbound-api', 'outbound-call', 'outbound-reply'],
  {
    description:
      'The direction of the message. Can be: `inbound` for incoming messages, `outbound-api` for messages created by the REST API, `outbound-call` for messages created during a call, or `outbound-reply` for messages created in response to an incoming message.',
    default: undefined,
  },
)

export const MessageEnumStatusSchema = t.UnionEnum(
  [
    'queued',
    'sending',
    'sent',
    'failed',
    'delivered',
    'undelivered',
    'receiving',
    'received',
    'accepted',
    'scheduled',
    'read',
    'partially_delivered',
    'canceled',
  ],
  {
    description:
      'The status of the Message. Possible values: `accepted`, `scheduled`, `canceled`, `queued`, `sending`, `sent`, `failed`, `delivered`, `undelivered`, `receiving`, `received`, or `read` (WhatsApp only). For more information, See [detailed descriptions](https://www.twilio.com/docs/sms/api/message-resource#message-status-values).',
    default: undefined,
  },
)

export const ApiV2010AccountMessageSchema = t.Object({
  body: t.Optional(
    t.Union([t.String({ description: 'The text content of the message' }), t.Null()]),
  ),
  num_segments: t.Optional(
    t.Union([
      t.String({
        description:
          "The number of segments that make up the complete message. SMS message bodies that exceed the [character limit](https://www.twilio.com/docs/glossary/what-sms-character-limit) are segmented and charged as multiple messages. Note: For messages sent via a Messaging Service, `num_segments` is initially `0`, since a sender hasn't yet been assigned.",
      }),
      t.Null(),
    ]),
  ),
  direction: t.Optional(MessageEnumDirectionSchema),
  from: t.Optional(
    t.Union([
      t.String({
        description:
          "The sender's phone number (in [E.164](https://en.wikipedia.org/wiki/E.164) format), [alphanumeric sender ID](https://www.twilio.com/docs/sms/quickstart), [Wireless SIM](https://www.twilio.com/docs/iot/wireless/programmable-wireless-send-machine-machine-sms-commands), [short code](https://www.twilio.com/en-us/messaging/channels/sms/short-codes), or  [channel address](https://www.twilio.com/docs/messaging/channels) (e.g., `whatsapp:+15554449999`). For incoming messages, this is the number or channel address of the sender. For outgoing messages, this value is a Twilio phone number, alphanumeric sender ID, short code, or channel address from which the message is sent.",
      }),
      t.Null(),
    ]),
  ),
  to: t.Optional(
    t.Union([
      t.String({
        description:
          "The recipient's phone number (in [E.164](https://en.wikipedia.org/wiki/E.164) format) or [channel address](https://www.twilio.com/docs/messaging/channels) (e.g. `whatsapp:+15552229999`)",
      }),
      t.Null(),
    ]),
  ),
  date_updated: t.Optional(
    t.Union([
      t.String({
        description:
          'The [RFC 2822](https://datatracker.ietf.org/doc/html/rfc2822#section-3.3) timestamp (in GMT) of when the Message resource was last updated',
      }),
      t.Null(),
    ]),
  ),
  price: t.Optional(
    t.Union([
      t.String({
        description:
          'The amount billed for the message in the currency specified by `price_unit`. The `price` is populated after the message has been sent/received, and may not be immediately availalble. View the [Pricing page](https://www.twilio.com/en-us/pricing) for more details.',
      }),
      t.Null(),
    ]),
  ),
  error_message: t.Optional(
    t.Union([
      t.String({
        description:
          'The description of the `error_code` if the Message `status` is `failed` or `undelivered`. If no error was encountered, the value is `null`. The value returned in this field for a specific error cause is subject to change as Twilio improves errors. Users should not use the `error_code` and `error_message` fields programmatically.',
      }),
      t.Null(),
    ]),
  ),
  uri: t.Optional(
    t.Union([
      t.String({
        description: 'The URI of the Message resource, relative to `https://api.twilio.com`.',
      }),
      t.Null(),
    ]),
  ),
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) associated with the Message resource',
      }),
      t.Null(),
    ]),
  ),
  num_media: t.Optional(
    t.Union([
      t.String({ description: 'The number of media files associated with the Message resource.' }),
      t.Null(),
    ]),
  ),
  status: t.Optional(MessageEnumStatusSchema),
  messaging_service_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^MG[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Messaging Service](https://www.twilio.com/docs/messaging/api/service-resource) associated with the Message resource. A unique default value is assigned if a Messaging Service is not used.',
      }),
      t.Null(),
    ]),
  ),
  sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^(SM|MM)[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'The unique, Twilio-provided string that identifies the Message resource.',
      }),
      t.Null(),
    ]),
  ),
  date_sent: t.Optional(
    t.Union([
      t.String({
        description:
          'The [RFC 2822](https://datatracker.ietf.org/doc/html/rfc2822#section-3.3) timestamp (in GMT) of when the Message was sent. For an outgoing message, this is when Twilio sent the message. For an incoming message, this is when Twilio sent the HTTP request to your incoming message webhook URL.',
      }),
      t.Null(),
    ]),
  ),
  date_created: t.Optional(
    t.Union([
      t.String({
        description:
          'The [RFC 2822](https://datatracker.ietf.org/doc/html/rfc2822#section-3.3) timestamp (in GMT) of when the Message resource was created',
      }),
      t.Null(),
    ]),
  ),
  error_code: t.Optional(
    t.Union([
      t.Integer({
        maximum: 9007199254740991,
        description:
          'The [error code](https://www.twilio.com/docs/api/errors) returned if the Message `status` is `failed` or `undelivered`. If no error was encountered, the value is `null`. The value returned in this field for a specific error cause is subject to change as Twilio improves errors. Users should not use the `error_code` and `error_message` fields programmatically.',
      }),
      t.Null(),
    ]),
  ),
  price_unit: t.Optional(
    t.Union([
      t.String({
        description:
          'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format (e.g. `usd`, `eur`, `jpy`).',
      }),
      t.Null(),
    ]),
  ),
  api_version: t.Optional(
    t.Union([t.String({ description: 'The API version used to process the Message' }), t.Null()]),
  ),
  subresource_uris: t.Optional(
    t.Union([
      t.Object(
        {},
        {
          description:
            'A list of related resources identified by their URIs relative to `https://api.twilio.com`',
        },
      ),
      t.Null(),
    ]),
  ),
})

export const MessageEnumUpdateStatusSchema = t.Literal('canceled')

export const MessageEnumContentRetentionSchema = t.UnionEnum(['retain', 'discard'], {
  description:
    'Determines if the message content can be stored or redacted based on privacy settings',
  default: undefined,
})

export const MessageEnumAddressRetentionSchema = t.UnionEnum(['retain', 'obfuscate'], {
  description: 'Determines if the address can be stored or obfuscated based on privacy settings',
  default: undefined,
})

export const MessageEnumTrafficTypeSchema = t.Literal('free')

export const MessageEnumScheduleTypeSchema = t.Literal('fixed', {
  description:
    'For Messaging Services only: Include this parameter with a value of `fixed` in conjuction with the `send_time` parameter in order to [schedule a Message](https://www.twilio.com/docs/messaging/features/message-scheduling).',
})

export const MessageEnumRiskCheckSchema = t.UnionEnum(['enable', 'disable'], {
  description:
    'Include this parameter with a value of `disable` to skip any kind of risk check on the respective message request.',
  default: undefined,
})

export const MessageFeedbackEnumOutcomeSchema = t.UnionEnum(['confirmed', 'unconfirmed'], {
  description:
    'Reported outcome indicating whether there is confirmation that the Message recipient performed a tracked user action. Can be: `unconfirmed` or `confirmed`. For more details see [How to Optimize Message Deliverability with Message Feedback](https://www.twilio.com/docs/messaging/guides/send-message-feedback-to-twilio).',
  default: undefined,
})

export const ApiV2010AccountMessageMessageFeedbackSchema = t.Object({
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) associated with this MessageFeedback resource.',
      }),
      t.Null(),
    ]),
  ),
  message_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^(SM|MM)[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the Message resource associated with this MessageFeedback resource.',
      }),
      t.Null(),
    ]),
  ),
  outcome: t.Optional(MessageFeedbackEnumOutcomeSchema),
  date_created: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT when this MessageFeedback resource was created, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  date_updated: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT when this MessageFeedback resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  uri: t.Optional(
    t.Union([
      t.String({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' }),
      t.Null(),
    ]),
  ),
})

export const ApiV2010AccountNewKeySchema = t.Object({
  sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^SK[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The unique string that that we created to identify the NewKey resource. You will use this as the basic-auth `user` when authenticating to the API.',
      }),
      t.Null(),
    ]),
  ),
  friendly_name: t.Optional(
    t.Union([
      t.String({ description: 'The string that you assigned to describe the resource.' }),
      t.Null(),
    ]),
  ),
  date_created: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the API Key was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  date_updated: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the new API Key was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  secret: t.Optional(
    t.Union([
      t.String({
        description:
          'The secret your application uses to sign Access Tokens and to authenticate to the REST API (you will use this as the basic-auth `password`).  **Note that for security reasons, this field is ONLY returned when the API Key is first created.**',
      }),
      t.Null(),
    ]),
  ),
})

export const ApiV2010AccountNewSigningKeySchema = t.Object({
  sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^SK[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The unique string that that we created to identify the NewSigningKey resource.',
      }),
      t.Null(),
    ]),
  ),
  friendly_name: t.Optional(
    t.Union([
      t.String({ description: 'The string that you assigned to describe the resource.' }),
      t.Null(),
    ]),
  ),
  date_created: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  date_updated: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  secret: t.Optional(
    t.Union([
      t.String({
        description:
          'The secret your application uses to sign Access Tokens and to authenticate to the REST API (you will use this as the basic-auth `password`).  **Note that for security reasons, this field is ONLY returned when the API Key is first created.**',
      }),
      t.Null(),
    ]),
  ),
})

export const ApiV2010AccountNotificationSchema = t.Object({
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Notification resource.',
      }),
      t.Null(),
    ]),
  ),
  api_version: t.Optional(
    t.Union([
      t.String({
        description:
          "The API version used to generate the notification. Can be empty for events that don't have a specific API version, such as incoming phone calls.",
      }),
      t.Null(),
    ]),
  ),
  call_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^CA[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Notification resource is associated with.',
      }),
      t.Null(),
    ]),
  ),
  date_created: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  date_updated: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  error_code: t.Optional(
    t.Union([
      t.String({
        description:
          'A unique error code for the error condition that is described in our [Error Dictionary](https://www.twilio.com/docs/api/errors).',
      }),
      t.Null(),
    ]),
  ),
  log: t.Optional(
    t.Union([
      t.String({
        description:
          'An integer log level that corresponds to the type of notification: `0` is ERROR, `1` is WARNING.',
      }),
      t.Null(),
    ]),
  ),
  message_date: t.Optional(
    t.Union([
      t.String({
        description:
          'The date the notification was actually generated in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. Message buffering can cause this value to differ from `date_created`.',
      }),
      t.Null(),
    ]),
  ),
  message_text: t.Optional(
    t.Union([t.String({ description: 'The text of the notification.' }), t.Null()]),
  ),
  more_info: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        description:
          'The URL for more information about the error condition. This value is a page in our [Error Dictionary](https://www.twilio.com/docs/api/errors).',
      }),
      t.Null(),
    ]),
  ),
  request_method: t.Optional(
    t.Union([
      t.UnionEnum(['GET', 'POST'], {
        description:
          'The HTTP method used to generate the notification. If the notification was generated during a phone call, this is the HTTP Method used to request the resource on your server. If the notification was generated by your use of our REST API, this is the HTTP method used to call the resource on our servers.',
        default: undefined,
      }),
      t.Null(),
    ]),
  ),
  request_url: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        description:
          'The URL of the resource that generated the notification. If the notification was generated during a phone call, this is the URL of the resource on your server that caused the notification. If the notification was generated by your use of our REST API, this is the URL of the resource you called.',
      }),
      t.Null(),
    ]),
  ),
  sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^NO[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The unique string that that we created to identify the Notification resource.',
      }),
      t.Null(),
    ]),
  ),
  uri: t.Optional(
    t.Union([
      t.String({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' }),
      t.Null(),
    ]),
  ),
})

export const ApiV2010AccountNotificationInstanceSchema = t.Object({
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Notification resource.',
      }),
      t.Null(),
    ]),
  ),
  api_version: t.Optional(
    t.Union([
      t.String({
        description:
          "The API version used to generate the notification. Can be empty for events that don't have a specific API version, such as incoming phone calls.",
      }),
      t.Null(),
    ]),
  ),
  call_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^CA[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Notification resource is associated with.',
      }),
      t.Null(),
    ]),
  ),
  date_created: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  date_updated: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  error_code: t.Optional(
    t.Union([
      t.String({
        description:
          'A unique error code for the error condition that is described in our [Error Dictionary](https://www.twilio.com/docs/api/errors).',
      }),
      t.Null(),
    ]),
  ),
  log: t.Optional(
    t.Union([
      t.String({
        description:
          'An integer log level that corresponds to the type of notification: `0` is ERROR, `1` is WARNING.',
      }),
      t.Null(),
    ]),
  ),
  message_date: t.Optional(
    t.Union([
      t.String({
        description:
          'The date the notification was actually generated in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. Message buffering can cause this value to differ from `date_created`.',
      }),
      t.Null(),
    ]),
  ),
  message_text: t.Optional(
    t.Union([t.String({ description: 'The text of the notification.' }), t.Null()]),
  ),
  more_info: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        description:
          'The URL for more information about the error condition. This value is a page in our [Error Dictionary](https://www.twilio.com/docs/api/errors).',
      }),
      t.Null(),
    ]),
  ),
  request_method: t.Optional(
    t.Union([
      t.UnionEnum(['GET', 'POST'], {
        description:
          'The HTTP method used to generate the notification. If the notification was generated during a phone call, this is the HTTP Method used to request the resource on your server. If the notification was generated by your use of our REST API, this is the HTTP method used to call the resource on our servers.',
        default: undefined,
      }),
      t.Null(),
    ]),
  ),
  request_url: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        description:
          'The URL of the resource that generated the notification. If the notification was generated during a phone call, this is the URL of the resource on your server that caused the notification. If the notification was generated by your use of our REST API, this is the URL of the resource you called.',
      }),
      t.Null(),
    ]),
  ),
  request_variables: t.Optional(
    t.Union([
      t.String({
        description:
          'The HTTP GET or POST variables we sent to your server. However, if the notification was generated by our REST API, this contains the HTTP POST or PUT variables you sent to our API.',
      }),
      t.Null(),
    ]),
  ),
  response_body: t.Optional(
    t.Union([t.String({ description: 'The HTTP body returned by your server.' }), t.Null()]),
  ),
  response_headers: t.Optional(
    t.Union([t.String({ description: 'The HTTP headers returned by your server.' }), t.Null()]),
  ),
  sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^NO[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The unique string that that we created to identify the Notification resource.',
      }),
      t.Null(),
    ]),
  ),
  uri: t.Optional(
    t.Union([
      t.String({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' }),
      t.Null(),
    ]),
  ),
})

export const ApiV2010AccountOutgoingCallerIdSchema = t.Object({
  sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^PN[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The unique string that that we created to identify the OutgoingCallerId resource.',
      }),
      t.Null(),
    ]),
  ),
  date_created: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  date_updated: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  friendly_name: t.Optional(
    t.Union([
      t.String({ description: 'The string that you assigned to describe the resource.' }),
      t.Null(),
    ]),
  ),
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the OutgoingCallerId resource.',
      }),
      t.Null(),
    ]),
  ),
  phone_number: t.Optional(
    t.Union([
      t.String({
        description:
          'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
      }),
      t.Null(),
    ]),
  ),
  uri: t.Optional(
    t.Union([
      t.String({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' }),
      t.Null(),
    ]),
  ),
})

export const ParticipantEnumStatusSchema = t.UnionEnum(
  ['queued', 'connecting', 'ringing', 'connected', 'complete', 'failed'],
  {
    description:
      "The status of the participant's call in a session. Can be: `queued`, `connecting`, `ringing`, `connected`, `complete`, or `failed`.",
    default: undefined,
  },
)

export const ApiV2010AccountConferenceParticipantSchema = t.Object({
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Participant resource.',
      }),
      t.Null(),
    ]),
  ),
  call_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^CA[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Participant resource is associated with.',
      }),
      t.Null(),
    ]),
  ),
  label: t.Optional(
    t.Union([
      t.String({
        description:
          'The user-specified label of this participant, if one was given when the participant was created. This may be used to fetch, update or delete the participant.',
      }),
      t.Null(),
    ]),
  ),
  call_sid_to_coach: t.Optional(
    t.Union([
      t.String({
        pattern: '^CA[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the participant who is being `coached`. The participant being coached is the only participant who can hear the participant who is `coaching`.',
      }),
      t.Null(),
    ]),
  ),
  coaching: t.Optional(
    t.Union([
      t.Boolean({
        description:
          'Whether the participant is coaching another call. Can be: `true` or `false`. If not present, defaults to `false` unless `call_sid_to_coach` is defined. If `true`, `call_sid_to_coach` must be defined.',
      }),
      t.Null(),
    ]),
  ),
  conference_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^CF[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'The SID of the conference the participant is in.',
      }),
      t.Null(),
    ]),
  ),
  date_created: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  date_updated: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  end_conference_on_exit: t.Optional(
    t.Union([
      t.Boolean({
        description:
          'Whether the conference ends when the participant leaves. Can be: `true` or `false` and the default is `false`. If `true`, the conference ends and all other participants drop out when the participant leaves.',
      }),
      t.Null(),
    ]),
  ),
  muted: t.Optional(
    t.Union([
      t.Boolean({ description: 'Whether the participant is muted. Can be `true` or `false`.' }),
      t.Null(),
    ]),
  ),
  hold: t.Optional(
    t.Union([
      t.Boolean({ description: 'Whether the participant is on hold. Can be `true` or `false`.' }),
      t.Null(),
    ]),
  ),
  start_conference_on_enter: t.Optional(
    t.Union([
      t.Boolean({
        description:
          'Whether the conference starts when the participant joins the conference, if it has not already started. Can be: `true` or `false` and the default is `true`. If `false` and the conference has not started, the participant is muted and hears background music until another participant starts the conference.',
      }),
      t.Null(),
    ]),
  ),
  status: t.Optional(ParticipantEnumStatusSchema),
  queue_time: t.Optional(
    t.Union([
      t.String({
        description:
          "The wait time in milliseconds before participant's call is placed. Only available in the response to a create participant request.",
      }),
      t.Null(),
    ]),
  ),
  uri: t.Optional(
    t.Union([
      t.String({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' }),
      t.Null(),
    ]),
  ),
})

export const ApiV2010AccountCallPaymentsSchema = t.Object({
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Payments resource.',
      }),
      t.Null(),
    ]),
  ),
  call_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^CA[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Payments resource is associated with. This will refer to the call sid that is producing the payment card (credit/ACH) information thru DTMF.',
      }),
      t.Null(),
    ]),
  ),
  sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^PK[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'The SID of the Payments resource.',
      }),
      t.Null(),
    ]),
  ),
  date_created: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  date_updated: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  uri: t.Optional(
    t.Union([
      t.String({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' }),
      t.Null(),
    ]),
  ),
})

export const PaymentsEnumPaymentMethodSchema = t.UnionEnum(['credit-card', 'ach-debit'], {
  description:
    'Type of payment being captured. One of `credit-card` or `ach-debit`. The default value is `credit-card`.',
  default: undefined,
})

export const PaymentsEnumBankAccountTypeSchema = t.UnionEnum(
  ['consumer-checking', 'consumer-savings', 'commercial-checking'],
  {
    description:
      'Type of bank account if payment source is ACH. One of `consumer-checking`, `consumer-savings`, or `commercial-checking`. The default value is `consumer-checking`.',
    default: undefined,
  },
)

export const PaymentsEnumTokenTypeSchema = t.UnionEnum(['one-time', 'reusable', 'payment-method'], {
  description:
    'Indicates whether the payment method should be tokenized as a `one-time`, `reusable`, or `payment-method` token. The default value is `reusable`. Do not enter a charge amount when tokenizing. If a charge amount is entered, the payment method will be charged and not tokenized.',
  default: undefined,
})

export const PaymentsEnumCaptureSchema = t.UnionEnum(
  [
    'payment-card-number',
    'expiration-date',
    'security-code',
    'postal-code',
    'bank-routing-number',
    'bank-account-number',
    'payment-card-number-matcher',
    'expiration-date-matcher',
    'security-code-matcher',
    'postal-code-matcher',
  ],
  {
    description:
      'The piece of payment information that you wish the caller to enter. Must be one of `payment-card-number`, `expiration-date`, `security-code`, `postal-code`, `bank-routing-number`, `bank-account-number`, or their `-matcher` variants for input confirmation when `RequireMatchingInputs` is enabled.',
    default: undefined,
  },
)

export const PaymentsEnumStatusSchema = t.UnionEnum(['complete', 'cancel'], {
  description:
    'Indicates whether the current payment session should be cancelled or completed. When `cancel` the payment session is cancelled. When `complete`, Twilio sends the payment information to the selected Pay Connector for processing.',
  default: undefined,
})

export const ApiV2010AccountQueueSchema = t.Object({
  date_updated: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  current_size: t.Optional(
    t.Integer({
      maximum: 9007199254740991,
      description: 'The number of calls currently in the queue.',
      default: 0,
    }),
  ),
  friendly_name: t.Optional(
    t.Union([
      t.String({ description: 'A string that you assigned to describe this resource.' }),
      t.Null(),
    ]),
  ),
  uri: t.Optional(
    t.Union([
      t.String({ description: 'The URI of this resource, relative to `https://api.twilio.com`.' }),
      t.Null(),
    ]),
  ),
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Queue resource.',
      }),
      t.Null(),
    ]),
  ),
  average_wait_time: t.Optional(
    t.Integer({
      maximum: 9007199254740991,
      description:
        ' The average wait time in seconds of the members in this queue. This is calculated at the time of the request.',
      default: 0,
    }),
  ),
  sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^QU[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'The unique string that that we created to identify this Queue resource.',
      }),
      t.Null(),
    ]),
  ),
  date_created: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that this resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  max_size: t.Optional(
    t.Integer({
      maximum: 9007199254740991,
      description:
        ' The maximum number of calls that can be in the queue. The default is 1000 and the maximum is 5000.',
      default: 0,
    }),
  ),
})

export const RealtimeTranscriptionEnumStatusSchema = t.UnionEnum(['in-progress', 'stopped'], {
  description: 'The status - one of `stopped`, `in-flight`',
  default: undefined,
})

export const ApiV2010AccountCallRealtimeTranscriptionSchema = t.Object({
  sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^GT[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'The SID of the Transcription resource.',
      }),
      t.Null(),
    ]),
  ),
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Transcription resource.',
      }),
      t.Null(),
    ]),
  ),
  call_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^CA[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Transcription resource is associated with.',
      }),
      t.Null(),
    ]),
  ),
  name: t.Optional(
    t.Union([
      t.String({
        description:
          'The user-specified name of this Transcription, if one was given when the Transcription was created. This may be used to stop the Transcription.',
      }),
      t.Null(),
    ]),
  ),
  status: t.Optional(RealtimeTranscriptionEnumStatusSchema),
  date_updated: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  uri: t.Optional(t.Union([t.String(), t.Null()])),
})

export const RealtimeTranscriptionEnumTrackSchema = t.UnionEnum(
  ['inbound_track', 'outbound_track', 'both_tracks'],
  { description: 'One of `inbound_track`, `outbound_track`, `both_tracks`.', default: undefined },
)

export const RealtimeTranscriptionEnumUpdateStatusSchema = t.Literal('stopped')

export const RecordingEnumStatusSchema = t.UnionEnum(
  ['in-progress', 'paused', 'stopped', 'processing', 'completed', 'absent', 'deleted'],
  {
    description:
      'The status of the recording. Can be: `processing`, `completed`, `absent` or `deleted`. For information about more detailed statuses on in-progress recordings, check out how to [Update a Recording Resource](https://www.twilio.com/docs/voice/api/recording#update-a-recording-resource).',
    default: undefined,
  },
)

export const RecordingEnumSourceSchema = t.UnionEnum(
  [
    'DialVerb',
    'Conference',
    'OutboundAPI',
    'Trunking',
    'RecordVerb',
    'StartCallRecordingAPI',
    'StartConferenceRecordingAPI',
  ],
  {
    description:
      'How the recording was created. Can be: `DialVerb`, `Conference`, `OutboundAPI`, `Trunking`, `RecordVerb`, `StartCallRecordingAPI`, and `StartConferenceRecordingAPI`.',
    default: undefined,
  },
)

export const ApiV2010AccountRecordingSchema = t.Object({
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording resource.',
      }),
      t.Null(),
    ]),
  ),
  api_version: t.Optional(
    t.Union([t.String({ description: 'The API version used during the recording.' }), t.Null()]),
  ),
  call_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^CA[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Recording resource is associated with. This will always refer to the parent leg of a two-leg call.',
      }),
      t.Null(),
    ]),
  ),
  conference_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^CF[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The Conference SID that identifies the conference associated with the recording, if a conference recording.',
      }),
      t.Null(),
    ]),
  ),
  date_created: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  date_updated: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  start_time: t.Optional(
    t.Union([
      t.String({
        description:
          'The start time of the recording in GMT and in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
      }),
      t.Null(),
    ]),
  ),
  duration: t.Optional(
    t.Union([t.String({ description: 'The length of the recording in seconds.' }), t.Null()]),
  ),
  sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^RE[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'The unique string that that we created to identify the Recording resource.',
      }),
      t.Null(),
    ]),
  ),
  price: t.Optional(
    t.Union([
      t.String({
        description: 'The one-time cost of creating the recording in the `price_unit` currency.',
      }),
      t.Null(),
    ]),
  ),
  price_unit: t.Optional(
    t.Union([
      t.String({ description: 'The currency used in the `price` property. Example: `USD`.' }),
      t.Null(),
    ]),
  ),
  status: t.Optional(RecordingEnumStatusSchema),
  channels: t.Optional(
    t.Union([
      t.Integer({
        maximum: 9007199254740991,
        description:
          'The number of channels in the recording resource. For information on specifying the number of channels in the downloaded recording file, check out [Fetch a Recording’s media file](https://www.twilio.com/docs/voice/api/recording#download-dual-channel-media-file).',
      }),
      t.Null(),
    ]),
  ),
  source: t.Optional(RecordingEnumSourceSchema),
  error_code: t.Optional(
    t.Union([
      t.Integer({
        maximum: 9007199254740991,
        description:
          'The error code that describes why the recording is `absent`. The error code is described in our [Error Dictionary](https://www.twilio.com/docs/api/errors). This value is null if the recording `status` is not `absent`.',
      }),
      t.Null(),
    ]),
  ),
  uri: t.Optional(
    t.Union([
      t.String({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' }),
      t.Null(),
    ]),
  ),
  encryption_details: t.Optional(t.Unknown()),
  subresource_uris: t.Optional(
    t.Union([
      t.Object(
        {},
        { description: 'A list of related resources identified by their relative URIs.' },
      ),
      t.Null(),
    ]),
  ),
  media_url: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        description:
          'The URL of the media file associated with this recording resource. When stored externally, this is the full URL location of the media file.',
      }),
      t.Null(),
    ]),
  ),
})

export const RecordingAddOnResultEnumStatusSchema = t.UnionEnum(
  ['canceled', 'completed', 'deleted', 'failed', 'in-progress', 'init', 'processing', 'queued'],
  {
    description:
      'The status of the result. Can be: `canceled`, `completed`, `deleted`, `failed`, `in-progress`, `init`, `processing`, `queued`.',
    default: undefined,
  },
)

export const ApiV2010AccountRecordingRecordingAddOnResultSchema = t.Object({
  sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^XR[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The unique string that that we created to identify the Recording AddOnResult resource.',
      }),
      t.Null(),
    ]),
  ),
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording AddOnResult resource.',
      }),
      t.Null(),
    ]),
  ),
  status: t.Optional(RecordingAddOnResultEnumStatusSchema),
  add_on_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^XB[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'The SID of the Add-on to which the result belongs.',
      }),
      t.Null(),
    ]),
  ),
  add_on_configuration_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^XE[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'The SID of the Add-on configuration.',
      }),
      t.Null(),
    ]),
  ),
  date_created: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  date_updated: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  date_completed: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the result was completed specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  reference_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^RE[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'The SID of the recording to which the AddOnResult resource belongs.',
      }),
      t.Null(),
    ]),
  ),
  subresource_uris: t.Optional(
    t.Union([
      t.Object(
        {},
        { description: 'A list of related resources identified by their relative URIs.' },
      ),
      t.Null(),
    ]),
  ),
})

export const ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadSchema =
  t.Object({
    sid: t.Optional(
      t.Union([
        t.String({
          pattern: '^XH[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The unique string that that we created to identify the Recording AddOnResult Payload resource.',
        }),
        t.Null(),
      ]),
    ),
    add_on_result_sid: t.Optional(
      t.Union([
        t.String({
          pattern: '^XR[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'The SID of the AddOnResult to which the payload belongs.',
        }),
        t.Null(),
      ]),
    ),
    account_sid: t.Optional(
      t.Union([
        t.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording AddOnResult Payload resource.',
        }),
        t.Null(),
      ]),
    ),
    label: t.Optional(
      t.Union([
        t.String({ description: 'The string provided by the vendor that describes the payload.' }),
        t.Null(),
      ]),
    ),
    add_on_sid: t.Optional(
      t.Union([
        t.String({
          pattern: '^XB[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'The SID of the Add-on to which the result belongs.',
        }),
        t.Null(),
      ]),
    ),
    add_on_configuration_sid: t.Optional(
      t.Union([
        t.String({
          pattern: '^XE[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description: 'The SID of the Add-on configuration.',
        }),
        t.Null(),
      ]),
    ),
    content_type: t.Optional(
      t.Union([t.String({ description: 'The MIME type of the payload.' }), t.Null()]),
    ),
    date_created: t.Optional(
      t.Union([
        t.String({
          description:
            'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        t.Null(),
      ]),
    ),
    date_updated: t.Optional(
      t.Union([
        t.String({
          description:
            'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        t.Null(),
      ]),
    ),
    reference_sid: t.Optional(
      t.Union([
        t.String({
          pattern: '^RE[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the recording to which the AddOnResult resource that contains the payload belongs.',
        }),
        t.Null(),
      ]),
    ),
    subresource_uris: t.Optional(
      t.Union([
        t.Object(
          {},
          { description: 'A list of related resources identified by their relative URIs.' },
        ),
        t.Null(),
      ]),
    ),
  })

export const ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadRecordingAddOnResultPayloadDataSchema =
  t.Object({
    redirect_to: t.Optional(
      t.Union([
        t.String({
          format: 'uri',
          description:
            'The URL to redirect to to get the data returned by the AddOn that was previously stored.',
        }),
        t.Null(),
      ]),
    ),
  })

export const RecordingTranscriptionEnumStatusSchema = t.UnionEnum(
  ['in-progress', 'completed', 'failed'],
  {
    description: 'The status of the transcription. Can be: `in-progress`, `completed`, `failed`.',
    default: undefined,
  },
)

export const ApiV2010AccountRecordingRecordingTranscriptionSchema = t.Object({
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Transcription resource.',
      }),
      t.Null(),
    ]),
  ),
  api_version: t.Optional(
    t.Union([
      t.String({ description: 'The API version used to create the transcription.' }),
      t.Null(),
    ]),
  ),
  date_created: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  date_updated: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  duration: t.Optional(
    t.Union([
      t.String({ description: 'The duration of the transcribed audio in seconds.' }),
      t.Null(),
    ]),
  ),
  price: t.Optional(
    t.Union([
      t.Number({
        description:
          'The charge for the transcript in the currency associated with the account. This value is populated after the transcript is complete so it may not be available immediately.',
      }),
      t.Null(),
    ]),
  ),
  price_unit: t.Optional(
    t.Union([
      t.String({
        description:
          'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format (e.g. `usd`, `eur`, `jpy`).',
      }),
      t.Null(),
    ]),
  ),
  recording_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^RE[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Recording](https://www.twilio.com/docs/voice/api/recording) from which the transcription was created.',
      }),
      t.Null(),
    ]),
  ),
  sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^TR[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The unique string that that we created to identify the Transcription resource.',
      }),
      t.Null(),
    ]),
  ),
  status: t.Optional(RecordingTranscriptionEnumStatusSchema),
  transcription_text: t.Optional(
    t.Union([t.String({ description: 'The text content of the transcription.' }), t.Null()]),
  ),
  type: t.Optional(t.Union([t.String({ description: 'The transcription type.' }), t.Null()])),
  uri: t.Optional(
    t.Union([
      t.String({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' }),
      t.Null(),
    ]),
  ),
})

export const ApiV2010AccountShortCodeSchema = t.Object({
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this ShortCode resource.',
      }),
      t.Null(),
    ]),
  ),
  api_version: t.Optional(
    t.Union([
      t.String({
        description:
          'The API version used to start a new TwiML session when an SMS message is sent to this short code.',
      }),
      t.Null(),
    ]),
  ),
  date_created: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that this resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  date_updated: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  friendly_name: t.Optional(
    t.Union([
      t.String({
        description:
          'A string that you assigned to describe this resource. By default, the `FriendlyName` is the short code.',
      }),
      t.Null(),
    ]),
  ),
  short_code: t.Optional(
    t.Union([t.String({ description: 'The short code. e.g., 894546.' }), t.Null()]),
  ),
  sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^SC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'The unique string that that we created to identify this ShortCode resource.',
      }),
      t.Null(),
    ]),
  ),
  sms_fallback_method: t.Optional(
    t.Union([
      t.UnionEnum(['GET', 'POST'], {
        description:
          'The HTTP method we use to call the `sms_fallback_url`. Can be: `GET` or `POST`.',
        default: undefined,
      }),
      t.Null(),
    ]),
  ),
  sms_fallback_url: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        description:
          'The URL that we call if an error occurs while retrieving or executing the TwiML from `sms_url`.',
      }),
      t.Null(),
    ]),
  ),
  sms_method: t.Optional(
    t.Union([
      t.UnionEnum(['GET', 'POST'], {
        description: 'The HTTP method we use to call the `sms_url`. Can be: `GET` or `POST`.',
        default: undefined,
      }),
      t.Null(),
    ]),
  ),
  sms_url: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        description: 'The URL we call when receiving an incoming SMS message to this short code.',
      }),
      t.Null(),
    ]),
  ),
  uri: t.Optional(
    t.Union([
      t.String({ description: 'The URI of this resource, relative to `https://api.twilio.com`.' }),
      t.Null(),
    ]),
  ),
})

export const ApiV2010AccountSigningKeySchema = t.Object({
  sid: t.Optional(
    t.Union([t.String({ pattern: '^SK[0-9a-fA-F]{32}$', minLength: 34, maxLength: 34 }), t.Null()]),
  ),
  friendly_name: t.Optional(t.Union([t.String(), t.Null()])),
  date_created: t.Optional(t.Union([t.String(), t.Null()])),
  date_updated: t.Optional(t.Union([t.String(), t.Null()])),
})

export const ApiV2010AccountSipSchema = t.Object({})

export const ApiV2010AccountSipSipDomainSipAuthSchema = t.Object({})

export const ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSchema = t.Object({})

export const ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema =
  t.Object({
    account_sid: t.Optional(
      t.Union([
        t.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the CredentialListMapping resource.',
        }),
        t.Null(),
      ]),
    ),
    date_created: t.Optional(
      t.Union([
        t.String({
          description:
            'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        t.Null(),
      ]),
    ),
    date_updated: t.Optional(
      t.Union([
        t.String({
          description:
            'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        t.Null(),
      ]),
    ),
    friendly_name: t.Optional(
      t.Union([
        t.String({ description: 'The string that you assigned to describe the resource.' }),
        t.Null(),
      ]),
    ),
    sid: t.Optional(
      t.Union([
        t.String({
          pattern: '^CL[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The unique string that that we created to identify the CredentialListMapping resource.',
        }),
        t.Null(),
      ]),
    ),
  })

export const ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema =
  t.Object({
    account_sid: t.Optional(
      t.Union([
        t.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the IpAccessControlListMapping resource.',
        }),
        t.Null(),
      ]),
    ),
    date_created: t.Optional(
      t.Union([
        t.String({
          description:
            'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        t.Null(),
      ]),
    ),
    date_updated: t.Optional(
      t.Union([
        t.String({
          description:
            'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        t.Null(),
      ]),
    ),
    friendly_name: t.Optional(
      t.Union([
        t.String({ description: 'The string that you assigned to describe the resource.' }),
        t.Null(),
      ]),
    ),
    sid: t.Optional(
      t.Union([
        t.String({
          pattern: '^AL[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The unique string that that we created to identify the IpAccessControlListMapping resource.',
        }),
        t.Null(),
      ]),
    ),
  })

export const ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSchema = t.Object({})

export const ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema =
  t.Object({
    account_sid: t.Optional(
      t.Union([
        t.String({
          pattern: '^AC[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the CredentialListMapping resource.',
        }),
        t.Null(),
      ]),
    ),
    date_created: t.Optional(
      t.Union([
        t.String({
          description:
            'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        t.Null(),
      ]),
    ),
    date_updated: t.Optional(
      t.Union([
        t.String({
          description:
            'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
        }),
        t.Null(),
      ]),
    ),
    friendly_name: t.Optional(
      t.Union([
        t.String({ description: 'The string that you assigned to describe the resource.' }),
        t.Null(),
      ]),
    ),
    sid: t.Optional(
      t.Union([
        t.String({
          pattern: '^CL[0-9a-fA-F]{32}$',
          minLength: 34,
          maxLength: 34,
          description:
            'The unique string that that we created to identify the CredentialListMapping resource.',
        }),
        t.Null(),
      ]),
    ),
  })

export const ApiV2010AccountSipSipCredentialListSipCredentialSchema = t.Object({
  sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^CR[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'A 34 character string that uniquely identifies this resource.',
      }),
      t.Null(),
    ]),
  ),
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'The unique id of the Account that is responsible for this resource.',
      }),
      t.Null(),
    ]),
  ),
  credential_list_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^CL[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The unique id that identifies the credential list that includes this credential.',
      }),
      t.Null(),
    ]),
  ),
  username: t.Optional(
    t.Union([t.String({ description: 'The username for this credential.' }), t.Null()]),
  ),
  date_created: t.Optional(
    t.Union([
      t.String({
        description:
          'The date that this resource was created, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
      }),
      t.Null(),
    ]),
  ),
  date_updated: t.Optional(
    t.Union([
      t.String({
        description:
          'The date that this resource was last updated, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
      }),
      t.Null(),
    ]),
  ),
  uri: t.Optional(
    t.Union([
      t.String({ description: 'The URI for this resource, relative to `https://api.twilio.com`' }),
      t.Null(),
    ]),
  ),
})

export const ApiV2010AccountSipSipCredentialListSchema = t.Object({
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The unique id of the [Account](https://www.twilio.com/docs/iam/api/account) that owns this resource.',
      }),
      t.Null(),
    ]),
  ),
  date_created: t.Optional(
    t.Union([
      t.String({
        description:
          'The date that this resource was created, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
      }),
      t.Null(),
    ]),
  ),
  date_updated: t.Optional(
    t.Union([
      t.String({
        description:
          'The date that this resource was last updated, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
      }),
      t.Null(),
    ]),
  ),
  friendly_name: t.Optional(
    t.Union([
      t.String({
        description:
          'A human readable descriptive text that describes the CredentialList, up to 64 characters long.',
      }),
      t.Null(),
    ]),
  ),
  sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^CL[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'A 34 character string that uniquely identifies this resource.',
      }),
      t.Null(),
    ]),
  ),
  subresource_uris: t.Optional(
    t.Union([
      t.Object({}, { description: 'A list of credentials associated with this credential list.' }),
      t.Null(),
    ]),
  ),
  uri: t.Optional(
    t.Union([
      t.String({ description: 'The URI for this resource, relative to `https://api.twilio.com`.' }),
      t.Null(),
    ]),
  ),
})

export const ApiV2010AccountSipSipDomainSipCredentialListMappingSchema = t.Object({
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'The unique id of the Account that is responsible for this resource.',
      }),
      t.Null(),
    ]),
  ),
  date_created: t.Optional(
    t.Union([
      t.String({
        description:
          'The date that this resource was created, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
      }),
      t.Null(),
    ]),
  ),
  date_updated: t.Optional(
    t.Union([
      t.String({
        description:
          'The date that this resource was last updated, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
      }),
      t.Null(),
    ]),
  ),
  domain_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^SD[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'The unique string that is created to identify the SipDomain resource.',
      }),
      t.Null(),
    ]),
  ),
  friendly_name: t.Optional(
    t.Union([
      t.String({
        description:
          'A human readable descriptive text for this resource, up to 64 characters long.',
      }),
      t.Null(),
    ]),
  ),
  sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^CL[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'A 34 character string that uniquely identifies this resource.',
      }),
      t.Null(),
    ]),
  ),
  uri: t.Optional(
    t.Union([
      t.String({ description: 'The URI for this resource, relative to `https://api.twilio.com`' }),
      t.Null(),
    ]),
  ),
})

export const ApiV2010AccountSipSipDomainSchema = t.Object({
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the SipDomain resource.',
      }),
      t.Null(),
    ]),
  ),
  api_version: t.Optional(
    t.Union([t.String({ description: 'The API version used to process the call.' }), t.Null()]),
  ),
  auth_type: t.Optional(
    t.Union([
      t.String({
        description:
          'The types of authentication you have mapped to your domain. Can be: `IP_ACL` and `CREDENTIAL_LIST`. If you have both defined for your domain, both will be returned in a comma delimited string. If `auth_type` is not defined, the domain will not be able to receive any traffic.',
      }),
      t.Null(),
    ]),
  ),
  date_created: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  date_updated: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  domain_name: t.Optional(
    t.Union([
      t.String({
        description:
          'The unique address you reserve on Twilio to which you route your SIP traffic. Domain names can contain letters, digits, and "-" and must end with `sip.twilio.com`.',
      }),
      t.Null(),
    ]),
  ),
  friendly_name: t.Optional(
    t.Union([
      t.String({ description: 'The string that you assigned to describe the resource.' }),
      t.Null(),
    ]),
  ),
  sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^SD[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'The unique string that that we created to identify the SipDomain resource.',
      }),
      t.Null(),
    ]),
  ),
  uri: t.Optional(
    t.Union([
      t.String({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' }),
      t.Null(),
    ]),
  ),
  voice_fallback_method: t.Optional(
    t.Union([
      t.UnionEnum(['GET', 'POST'], {
        description:
          'The HTTP method we use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
        default: undefined,
      }),
      t.Null(),
    ]),
  ),
  voice_fallback_url: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        description:
          'The URL that we call when an error occurs while retrieving or executing the TwiML requested from `voice_url`.',
      }),
      t.Null(),
    ]),
  ),
  voice_method: t.Optional(
    t.Union([
      t.UnionEnum(['GET', 'POST'], {
        description: 'The HTTP method we use to call `voice_url`. Can be: `GET` or `POST`.',
        default: undefined,
      }),
      t.Null(),
    ]),
  ),
  voice_status_callback_method: t.Optional(
    t.Union([
      t.UnionEnum(['GET', 'POST'], {
        description:
          'The HTTP method we use to call `voice_status_callback_url`. Either `GET` or `POST`.',
        default: undefined,
      }),
      t.Null(),
    ]),
  ),
  voice_status_callback_url: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        description:
          'The URL that we call to pass status parameters (such as call ended) to your application.',
      }),
      t.Null(),
    ]),
  ),
  voice_url: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        description: 'The URL we call using the `voice_method` when the domain receives a call.',
      }),
      t.Null(),
    ]),
  ),
  subresource_uris: t.Optional(
    t.Union([
      t.Object(
        {},
        {
          description:
            'A list of mapping resources associated with the SIP Domain resource identified by their relative URIs.',
        },
      ),
      t.Null(),
    ]),
  ),
  sip_registration: t.Optional(
    t.Union([
      t.Boolean({
        description: 'Whether to allow SIP Endpoints to register with the domain to receive calls.',
      }),
      t.Null(),
    ]),
  ),
  emergency_calling_enabled: t.Optional(
    t.Union([
      t.Boolean({
        description:
          'Whether emergency calling is enabled for the domain. If enabled, allows emergency calls on the domain from phone numbers with validated addresses.',
      }),
      t.Null(),
    ]),
  ),
  secure: t.Optional(
    t.Union([
      t.Boolean({
        description:
          'Whether secure SIP is enabled for the domain. If enabled, TLS will be enforced and SRTP will be negotiated on all incoming calls to this sip domain.',
      }),
      t.Null(),
    ]),
  ),
  byoc_trunk_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^BY[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the BYOC Trunk(Bring Your Own Carrier) resource that the Sip Domain will be associated with.',
      }),
      t.Null(),
    ]),
  ),
  emergency_caller_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^PN[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'Whether an emergency caller sid is configured for the domain. If present, this phone number will be used as the callback for the emergency call.',
      }),
      t.Null(),
    ]),
  ),
})

export const ApiV2010AccountSipSipIpAccessControlListSchema = t.Object({
  sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AL[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'A 34 character string that uniquely identifies this resource.',
      }),
      t.Null(),
    ]),
  ),
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The unique id of the [Account](https://www.twilio.com/docs/iam/api/account) that owns this resource.',
      }),
      t.Null(),
    ]),
  ),
  friendly_name: t.Optional(
    t.Union([
      t.String({ description: 'A human readable descriptive text, up to 255 characters long.' }),
      t.Null(),
    ]),
  ),
  date_created: t.Optional(
    t.Union([
      t.String({
        description:
          'The date that this resource was created, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
      }),
      t.Null(),
    ]),
  ),
  date_updated: t.Optional(
    t.Union([
      t.String({
        description:
          'The date that this resource was last updated, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
      }),
      t.Null(),
    ]),
  ),
  subresource_uris: t.Optional(
    t.Union([
      t.Object(
        {},
        {
          description:
            'A list of the IpAddress resources associated with this IP access control list resource.',
        },
      ),
      t.Null(),
    ]),
  ),
  uri: t.Optional(
    t.Union([
      t.String({ description: 'The URI for this resource, relative to `https://api.twilio.com`' }),
      t.Null(),
    ]),
  ),
})

export const ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema = t.Object({
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'The unique id of the Account that is responsible for this resource.',
      }),
      t.Null(),
    ]),
  ),
  date_created: t.Optional(
    t.Union([
      t.String({
        description:
          'The date that this resource was created, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
      }),
      t.Null(),
    ]),
  ),
  date_updated: t.Optional(
    t.Union([
      t.String({
        description:
          'The date that this resource was last updated, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
      }),
      t.Null(),
    ]),
  ),
  domain_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^SD[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'The unique string that is created to identify the SipDomain resource.',
      }),
      t.Null(),
    ]),
  ),
  friendly_name: t.Optional(
    t.Union([
      t.String({
        description:
          'A human readable descriptive text for this resource, up to 64 characters long.',
      }),
      t.Null(),
    ]),
  ),
  sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AL[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'A 34 character string that uniquely identifies this resource.',
      }),
      t.Null(),
    ]),
  ),
  uri: t.Optional(
    t.Union([
      t.String({ description: 'The URI for this resource, relative to `https://api.twilio.com`' }),
      t.Null(),
    ]),
  ),
})

export const ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema = t.Object({
  sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^IP[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'A 34 character string that uniquely identifies this resource.',
      }),
      t.Null(),
    ]),
  ),
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'The unique id of the Account that is responsible for this resource.',
      }),
      t.Null(),
    ]),
  ),
  friendly_name: t.Optional(
    t.Union([
      t.String({
        description:
          'A human readable descriptive text for this resource, up to 255 characters long.',
      }),
      t.Null(),
    ]),
  ),
  ip_address: t.Optional(
    t.Union([
      t.String({
        description:
          'An IP address in dotted decimal notation from which you want to accept traffic. Any SIP requests from this IP address will be allowed by Twilio. IPv4 only supported today.',
      }),
      t.Null(),
    ]),
  ),
  cidr_prefix_length: t.Optional(
    t.Integer({
      maximum: 9007199254740991,
      description:
        'An integer representing the length of the CIDR prefix to use with this IP address when accepting traffic. By default the entire IP address is used.',
      default: 0,
    }),
  ),
  ip_access_control_list_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AL[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The unique id of the IpAccessControlList resource that includes this resource.',
      }),
      t.Null(),
    ]),
  ),
  date_created: t.Optional(
    t.Union([
      t.String({
        description:
          'The date that this resource was created, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
      }),
      t.Null(),
    ]),
  ),
  date_updated: t.Optional(
    t.Union([
      t.String({
        description:
          'The date that this resource was last updated, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
      }),
      t.Null(),
    ]),
  ),
  uri: t.Optional(
    t.Union([
      t.String({ description: 'The URI for this resource, relative to `https://api.twilio.com`' }),
      t.Null(),
    ]),
  ),
})

export const SiprecEnumStatusSchema = t.UnionEnum(['in-progress', 'stopped'], {
  description: 'The status - one of `stopped`, `in-progress`',
  default: undefined,
})

export const ApiV2010AccountCallSiprecSchema = t.Object({
  sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^SR[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'The SID of the Siprec resource.',
      }),
      t.Null(),
    ]),
  ),
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Siprec resource.',
      }),
      t.Null(),
    ]),
  ),
  call_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^CA[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Siprec resource is associated with.',
      }),
      t.Null(),
    ]),
  ),
  name: t.Optional(
    t.Union([
      t.String({
        description:
          'The user-specified name of this Siprec, if one was given when the Siprec was created. This may be used to stop the Siprec.',
      }),
      t.Null(),
    ]),
  ),
  status: t.Optional(SiprecEnumStatusSchema),
  date_updated: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  uri: t.Optional(
    t.Union([
      t.String({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' }),
      t.Null(),
    ]),
  ),
})

export const SiprecEnumTrackSchema = t.UnionEnum(
  ['inbound_track', 'outbound_track', 'both_tracks'],
  { description: 'One of `inbound_track`, `outbound_track`, `both_tracks`.', default: undefined },
)

export const SiprecEnumUpdateStatusSchema = t.Literal('stopped')

export const SmsFeedbackEnumOutcomeSchema = t.UnionEnum(
  ['confirmed', 'unconfirmed', 'received', 'not-received', 'delayed'],
  { default: undefined },
)

export const SmsMessageEnumStatusSchema = t.UnionEnum(
  [
    'queued',
    'sending',
    'sent',
    'failed',
    'delivered',
    'undelivered',
    'receiving',
    'received',
    'accepted',
    'scheduled',
    'read',
    'partially_delivered',
    'canceled',
  ],
  { default: undefined },
)

export const SmsMessageEnumUpdateStatusSchema = t.Literal('canceled')

export const SmsMessageEnumDirectionSchema = t.UnionEnum(
  ['inbound', 'outbound-api', 'outbound-call', 'outbound-reply'],
  { default: undefined },
)

export const StreamEnumStatusSchema = t.UnionEnum(['in-progress', 'stopped'], {
  description: 'The status of the Stream. Possible values are `stopped` and `in-progress`.',
  default: undefined,
})

export const ApiV2010AccountCallStreamSchema = t.Object({
  sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^MZ[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'The SID of the Stream resource.',
      }),
      t.Null(),
    ]),
  ),
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Stream resource.',
      }),
      t.Null(),
    ]),
  ),
  call_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^CA[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Stream resource is associated with.',
      }),
      t.Null(),
    ]),
  ),
  name: t.Optional(
    t.Union([
      t.String({
        description:
          'The user-specified name of this Stream, if one was given when the Stream was created. This can be used to stop the Stream.',
      }),
      t.Null(),
    ]),
  ),
  status: t.Optional(StreamEnumStatusSchema),
  date_updated: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  uri: t.Optional(
    t.Union([
      t.String({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' }),
      t.Null(),
    ]),
  ),
})

export const StreamEnumTrackSchema = t.UnionEnum(
  ['inbound_track', 'outbound_track', 'both_tracks'],
  {
    description:
      'The tracks to be included in the Stream. Possible values are `inbound_track`, `outbound_track`, `both_tracks`. Default value is `inbound_track`.',
    default: undefined,
  },
)

export const StreamEnumUpdateStatusSchema = t.Literal('stopped')

export const ApiV2010AccountTokenSchema = t.Object({
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Token resource.',
      }),
      t.Null(),
    ]),
  ),
  date_created: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  date_updated: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  ice_servers: t.Optional(
    t.Union([
      t.Array(
        t.Object({
          credential: t.Optional(t.String()),
          username: t.Optional(t.String()),
          url: t.Optional(t.String()),
          urls: t.Optional(t.String()),
        }),
        {
          description:
            'An array representing the ephemeral credentials and the STUN and TURN server URIs.',
        },
      ),
      t.Null(),
    ]),
  ),
  password: t.Optional(
    t.Union([
      t.String({
        description:
          'The temporary password that the username will use when authenticating with Twilio.',
      }),
      t.Null(),
    ]),
  ),
  ttl: t.Optional(
    t.Union([
      t.String({
        description: 'The duration in seconds for which the username and password are valid.',
      }),
      t.Null(),
    ]),
  ),
  username: t.Optional(
    t.Union([
      t.String({ description: 'The temporary username that uniquely identifies a Token.' }),
      t.Null(),
    ]),
  ),
})

export const TranscriptionEnumStatusSchema = t.UnionEnum(['in-progress', 'completed', 'failed'], {
  description: 'The status of the transcription. Can be: `in-progress`, `completed`, `failed`.',
  default: undefined,
})

export const ApiV2010AccountTranscriptionSchema = t.Object({
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Transcription resource.',
      }),
      t.Null(),
    ]),
  ),
  api_version: t.Optional(
    t.Union([
      t.String({ description: 'The API version used to create the transcription.' }),
      t.Null(),
    ]),
  ),
  date_created: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  date_updated: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  duration: t.Optional(
    t.Union([
      t.String({ description: 'The duration of the transcribed audio in seconds.' }),
      t.Null(),
    ]),
  ),
  price: t.Optional(
    t.Union([
      t.Number({
        description:
          'The charge for the transcript in the currency associated with the account. This value is populated after the transcript is complete so it may not be available immediately.',
      }),
      t.Null(),
    ]),
  ),
  price_unit: t.Optional(
    t.Union([
      t.String({
        description:
          'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format (e.g. `usd`, `eur`, `jpy`).',
      }),
      t.Null(),
    ]),
  ),
  recording_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^RE[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Recording](https://www.twilio.com/docs/voice/api/recording) from which the transcription was created.',
      }),
      t.Null(),
    ]),
  ),
  sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^TR[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The unique string that that we created to identify the Transcription resource.',
      }),
      t.Null(),
    ]),
  ),
  status: t.Optional(TranscriptionEnumStatusSchema),
  transcription_text: t.Optional(
    t.Union([t.String({ description: 'The text content of the transcription.' }), t.Null()]),
  ),
  type: t.Optional(
    t.Union([t.String({ description: 'The transcription type. Can only be: `fast`.' }), t.Null()]),
  ),
  uri: t.Optional(
    t.Union([
      t.String({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' }),
      t.Null(),
    ]),
  ),
})

export const ApiV2010AccountUsageSchema = t.Object({})

export const ApiV2010AccountUsageUsageRecordSchema = t.Object({
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
      }),
      t.Null(),
    ]),
  ),
  api_version: t.Optional(
    t.Union([t.String({ description: 'The API version used to create the resource.' }), t.Null()]),
  ),
  as_of: t.Optional(
    t.Union([
      t.String({
        description:
          'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
      }),
      t.Null(),
    ]),
  ),
  category: t.Optional(
    t.Union([
      t.String({
        description:
          'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
      }),
      t.Null(),
    ]),
  ),
  count: t.Optional(
    t.Union([
      t.String({ description: 'The number of usage events, such as the number of calls.' }),
      t.Null(),
    ]),
  ),
  count_unit: t.Optional(
    t.Union([
      t.String({
        description:
          'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
      }),
      t.Null(),
    ]),
  ),
  description: t.Optional(
    t.Union([
      t.String({ description: 'A plain-language description of the usage category.' }),
      t.Null(),
    ]),
  ),
  end_date: t.Optional(
    t.Union([
      t.Date({
        description:
          'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
      }),
      t.Null(),
    ]),
  ),
  price: t.Optional(
    t.Union([
      t.Number({
        description:
          'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
      }),
      t.Null(),
    ]),
  ),
  price_unit: t.Optional(
    t.Union([
      t.String({
        description:
          'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
      }),
      t.Null(),
    ]),
  ),
  start_date: t.Optional(
    t.Union([
      t.Date({
        description:
          'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
      }),
      t.Null(),
    ]),
  ),
  subresource_uris: t.Optional(
    t.Union([
      t.Object(
        {},
        {
          description:
            'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
        },
      ),
      t.Null(),
    ]),
  ),
  uri: t.Optional(
    t.Union([
      t.String({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' }),
      t.Null(),
    ]),
  ),
  usage: t.Optional(
    t.Union([
      t.String({
        description:
          'The amount used to bill usage and measured in units described in `usage_unit`.',
      }),
      t.Null(),
    ]),
  ),
  usage_unit: t.Optional(
    t.Union([
      t.String({
        description:
          'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
      }),
      t.Null(),
    ]),
  ),
})

export const ApiV2010AccountUsageUsageRecordUsageRecordAllTimeSchema = t.Object({
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
      }),
      t.Null(),
    ]),
  ),
  api_version: t.Optional(
    t.Union([t.String({ description: 'The API version used to create the resource.' }), t.Null()]),
  ),
  as_of: t.Optional(
    t.Union([
      t.String({
        description:
          'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
      }),
      t.Null(),
    ]),
  ),
  category: t.Optional(
    t.Union([
      t.String({
        description:
          'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
      }),
      t.Null(),
    ]),
  ),
  count: t.Optional(
    t.Union([
      t.String({ description: 'The number of usage events, such as the number of calls.' }),
      t.Null(),
    ]),
  ),
  count_unit: t.Optional(
    t.Union([
      t.String({
        description:
          'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
      }),
      t.Null(),
    ]),
  ),
  description: t.Optional(
    t.Union([
      t.String({ description: 'A plain-language description of the usage category.' }),
      t.Null(),
    ]),
  ),
  end_date: t.Optional(
    t.Union([
      t.Date({
        description:
          'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
      }),
      t.Null(),
    ]),
  ),
  price: t.Optional(
    t.Union([
      t.Number({
        description:
          'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
      }),
      t.Null(),
    ]),
  ),
  price_unit: t.Optional(
    t.Union([
      t.String({
        description:
          'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
      }),
      t.Null(),
    ]),
  ),
  start_date: t.Optional(
    t.Union([
      t.Date({
        description:
          'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
      }),
      t.Null(),
    ]),
  ),
  subresource_uris: t.Optional(
    t.Union([
      t.Object(
        {},
        {
          description:
            'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
        },
      ),
      t.Null(),
    ]),
  ),
  uri: t.Optional(
    t.Union([
      t.String({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' }),
      t.Null(),
    ]),
  ),
  usage: t.Optional(
    t.Union([
      t.String({
        description:
          'The amount used to bill usage and measured in units described in `usage_unit`.',
      }),
      t.Null(),
    ]),
  ),
  usage_unit: t.Optional(
    t.Union([
      t.String({
        description:
          'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
      }),
      t.Null(),
    ]),
  ),
})

export const ApiV2010AccountUsageUsageRecordUsageRecordDailySchema = t.Object({
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
      }),
      t.Null(),
    ]),
  ),
  api_version: t.Optional(
    t.Union([t.String({ description: 'The API version used to create the resource.' }), t.Null()]),
  ),
  as_of: t.Optional(
    t.Union([
      t.String({
        description:
          'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
      }),
      t.Null(),
    ]),
  ),
  category: t.Optional(
    t.Union([
      t.String({
        description:
          'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
      }),
      t.Null(),
    ]),
  ),
  count: t.Optional(
    t.Union([
      t.String({ description: 'The number of usage events, such as the number of calls.' }),
      t.Null(),
    ]),
  ),
  count_unit: t.Optional(
    t.Union([
      t.String({
        description:
          'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
      }),
      t.Null(),
    ]),
  ),
  description: t.Optional(
    t.Union([
      t.String({ description: 'A plain-language description of the usage category.' }),
      t.Null(),
    ]),
  ),
  end_date: t.Optional(
    t.Union([
      t.Date({
        description:
          'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
      }),
      t.Null(),
    ]),
  ),
  price: t.Optional(
    t.Union([
      t.Number({
        description:
          'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
      }),
      t.Null(),
    ]),
  ),
  price_unit: t.Optional(
    t.Union([
      t.String({
        description:
          'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
      }),
      t.Null(),
    ]),
  ),
  start_date: t.Optional(
    t.Union([
      t.Date({
        description:
          'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
      }),
      t.Null(),
    ]),
  ),
  subresource_uris: t.Optional(
    t.Union([
      t.Object(
        {},
        {
          description:
            'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
        },
      ),
      t.Null(),
    ]),
  ),
  uri: t.Optional(
    t.Union([
      t.String({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' }),
      t.Null(),
    ]),
  ),
  usage: t.Optional(
    t.Union([
      t.String({
        description:
          'The amount used to bill usage and measured in units described in `usage_unit`.',
      }),
      t.Null(),
    ]),
  ),
  usage_unit: t.Optional(
    t.Union([
      t.String({
        description:
          'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
      }),
      t.Null(),
    ]),
  ),
})

export const ApiV2010AccountUsageUsageRecordUsageRecordLastMonthSchema = t.Object({
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
      }),
      t.Null(),
    ]),
  ),
  api_version: t.Optional(
    t.Union([t.String({ description: 'The API version used to create the resource.' }), t.Null()]),
  ),
  as_of: t.Optional(
    t.Union([
      t.String({
        description:
          'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
      }),
      t.Null(),
    ]),
  ),
  category: t.Optional(
    t.Union([
      t.String({
        description:
          'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
      }),
      t.Null(),
    ]),
  ),
  count: t.Optional(
    t.Union([
      t.String({ description: 'The number of usage events, such as the number of calls.' }),
      t.Null(),
    ]),
  ),
  count_unit: t.Optional(
    t.Union([
      t.String({
        description:
          'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
      }),
      t.Null(),
    ]),
  ),
  description: t.Optional(
    t.Union([
      t.String({ description: 'A plain-language description of the usage category.' }),
      t.Null(),
    ]),
  ),
  end_date: t.Optional(
    t.Union([
      t.Date({
        description:
          'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
      }),
      t.Null(),
    ]),
  ),
  price: t.Optional(
    t.Union([
      t.Number({
        description:
          'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
      }),
      t.Null(),
    ]),
  ),
  price_unit: t.Optional(
    t.Union([
      t.String({
        description:
          'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
      }),
      t.Null(),
    ]),
  ),
  start_date: t.Optional(
    t.Union([
      t.Date({
        description:
          'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
      }),
      t.Null(),
    ]),
  ),
  subresource_uris: t.Optional(
    t.Union([
      t.Object(
        {},
        {
          description:
            'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
        },
      ),
      t.Null(),
    ]),
  ),
  uri: t.Optional(
    t.Union([
      t.String({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' }),
      t.Null(),
    ]),
  ),
  usage: t.Optional(
    t.Union([
      t.String({
        description:
          'The amount used to bill usage and measured in units described in `usage_unit`.',
      }),
      t.Null(),
    ]),
  ),
  usage_unit: t.Optional(
    t.Union([
      t.String({
        description:
          'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
      }),
      t.Null(),
    ]),
  ),
})

export const ApiV2010AccountUsageUsageRecordUsageRecordMonthlySchema = t.Object({
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
      }),
      t.Null(),
    ]),
  ),
  api_version: t.Optional(
    t.Union([t.String({ description: 'The API version used to create the resource.' }), t.Null()]),
  ),
  as_of: t.Optional(
    t.Union([
      t.String({
        description:
          'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
      }),
      t.Null(),
    ]),
  ),
  category: t.Optional(
    t.Union([
      t.String({
        description:
          'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
      }),
      t.Null(),
    ]),
  ),
  count: t.Optional(
    t.Union([
      t.String({ description: 'The number of usage events, such as the number of calls.' }),
      t.Null(),
    ]),
  ),
  count_unit: t.Optional(
    t.Union([
      t.String({
        description:
          'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
      }),
      t.Null(),
    ]),
  ),
  description: t.Optional(
    t.Union([
      t.String({ description: 'A plain-language description of the usage category.' }),
      t.Null(),
    ]),
  ),
  end_date: t.Optional(
    t.Union([
      t.Date({
        description:
          'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
      }),
      t.Null(),
    ]),
  ),
  price: t.Optional(
    t.Union([
      t.Number({
        description:
          'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
      }),
      t.Null(),
    ]),
  ),
  price_unit: t.Optional(
    t.Union([
      t.String({
        description:
          'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
      }),
      t.Null(),
    ]),
  ),
  start_date: t.Optional(
    t.Union([
      t.Date({
        description:
          'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
      }),
      t.Null(),
    ]),
  ),
  subresource_uris: t.Optional(
    t.Union([
      t.Object(
        {},
        {
          description:
            'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
        },
      ),
      t.Null(),
    ]),
  ),
  uri: t.Optional(
    t.Union([
      t.String({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' }),
      t.Null(),
    ]),
  ),
  usage: t.Optional(
    t.Union([
      t.String({
        description:
          'The amount used to bill usage and measured in units described in `usage_unit`.',
      }),
      t.Null(),
    ]),
  ),
  usage_unit: t.Optional(
    t.Union([
      t.String({
        description:
          'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
      }),
      t.Null(),
    ]),
  ),
})

export const ApiV2010AccountUsageUsageRecordUsageRecordThisMonthSchema = t.Object({
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
      }),
      t.Null(),
    ]),
  ),
  api_version: t.Optional(
    t.Union([t.String({ description: 'The API version used to create the resource.' }), t.Null()]),
  ),
  as_of: t.Optional(
    t.Union([
      t.String({
        description:
          'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
      }),
      t.Null(),
    ]),
  ),
  category: t.Optional(
    t.Union([
      t.String({
        description:
          'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
      }),
      t.Null(),
    ]),
  ),
  count: t.Optional(
    t.Union([
      t.String({ description: 'The number of usage events, such as the number of calls.' }),
      t.Null(),
    ]),
  ),
  count_unit: t.Optional(
    t.Union([
      t.String({
        description:
          'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
      }),
      t.Null(),
    ]),
  ),
  description: t.Optional(
    t.Union([
      t.String({ description: 'A plain-language description of the usage category.' }),
      t.Null(),
    ]),
  ),
  end_date: t.Optional(
    t.Union([
      t.Date({
        description:
          'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
      }),
      t.Null(),
    ]),
  ),
  price: t.Optional(
    t.Union([
      t.Number({
        description:
          'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
      }),
      t.Null(),
    ]),
  ),
  price_unit: t.Optional(
    t.Union([
      t.String({
        description:
          'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
      }),
      t.Null(),
    ]),
  ),
  start_date: t.Optional(
    t.Union([
      t.Date({
        description:
          'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
      }),
      t.Null(),
    ]),
  ),
  subresource_uris: t.Optional(
    t.Union([
      t.Object(
        {},
        {
          description:
            'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
        },
      ),
      t.Null(),
    ]),
  ),
  uri: t.Optional(
    t.Union([
      t.String({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' }),
      t.Null(),
    ]),
  ),
  usage: t.Optional(
    t.Union([
      t.String({
        description:
          'The amount used to bill usage and measured in units described in `usage_unit`.',
      }),
      t.Null(),
    ]),
  ),
  usage_unit: t.Optional(
    t.Union([
      t.String({
        description:
          'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
      }),
      t.Null(),
    ]),
  ),
})

export const ApiV2010AccountUsageUsageRecordUsageRecordTodaySchema = t.Object({
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
      }),
      t.Null(),
    ]),
  ),
  api_version: t.Optional(
    t.Union([t.String({ description: 'The API version used to create the resource.' }), t.Null()]),
  ),
  as_of: t.Optional(
    t.Union([
      t.String({
        description:
          'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
      }),
      t.Null(),
    ]),
  ),
  category: t.Optional(
    t.Union([
      t.String({
        description:
          'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
      }),
      t.Null(),
    ]),
  ),
  count: t.Optional(
    t.Union([
      t.String({ description: 'The number of usage events, such as the number of calls.' }),
      t.Null(),
    ]),
  ),
  count_unit: t.Optional(
    t.Union([
      t.String({
        description:
          'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
      }),
      t.Null(),
    ]),
  ),
  description: t.Optional(
    t.Union([
      t.String({ description: 'A plain-language description of the usage category.' }),
      t.Null(),
    ]),
  ),
  end_date: t.Optional(
    t.Union([
      t.Date({
        description:
          'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
      }),
      t.Null(),
    ]),
  ),
  price: t.Optional(
    t.Union([
      t.Number({
        description:
          'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
      }),
      t.Null(),
    ]),
  ),
  price_unit: t.Optional(
    t.Union([
      t.String({
        description:
          'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
      }),
      t.Null(),
    ]),
  ),
  start_date: t.Optional(
    t.Union([
      t.Date({
        description:
          'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
      }),
      t.Null(),
    ]),
  ),
  subresource_uris: t.Optional(
    t.Union([
      t.Object(
        {},
        {
          description:
            'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
        },
      ),
      t.Null(),
    ]),
  ),
  uri: t.Optional(
    t.Union([
      t.String({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' }),
      t.Null(),
    ]),
  ),
  usage: t.Optional(
    t.Union([
      t.String({
        description:
          'The amount used to bill usage and measured in units described in `usage_unit`.',
      }),
      t.Null(),
    ]),
  ),
  usage_unit: t.Optional(
    t.Union([
      t.String({
        description:
          'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
      }),
      t.Null(),
    ]),
  ),
})

export const ApiV2010AccountUsageUsageRecordUsageRecordYearlySchema = t.Object({
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
      }),
      t.Null(),
    ]),
  ),
  api_version: t.Optional(
    t.Union([t.String({ description: 'The API version used to create the resource.' }), t.Null()]),
  ),
  as_of: t.Optional(
    t.Union([
      t.String({
        description:
          'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
      }),
      t.Null(),
    ]),
  ),
  category: t.Optional(
    t.Union([
      t.String({
        description:
          'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
      }),
      t.Null(),
    ]),
  ),
  count: t.Optional(
    t.Union([
      t.String({ description: 'The number of usage events, such as the number of calls.' }),
      t.Null(),
    ]),
  ),
  count_unit: t.Optional(
    t.Union([
      t.String({
        description:
          'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
      }),
      t.Null(),
    ]),
  ),
  description: t.Optional(
    t.Union([
      t.String({ description: 'A plain-language description of the usage category.' }),
      t.Null(),
    ]),
  ),
  end_date: t.Optional(
    t.Union([
      t.Date({
        description:
          'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
      }),
      t.Null(),
    ]),
  ),
  price: t.Optional(
    t.Union([
      t.Number({
        description:
          'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
      }),
      t.Null(),
    ]),
  ),
  price_unit: t.Optional(
    t.Union([
      t.String({
        description:
          'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
      }),
      t.Null(),
    ]),
  ),
  start_date: t.Optional(
    t.Union([
      t.Date({
        description:
          'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
      }),
      t.Null(),
    ]),
  ),
  subresource_uris: t.Optional(
    t.Union([
      t.Object(
        {},
        {
          description:
            'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
        },
      ),
      t.Null(),
    ]),
  ),
  uri: t.Optional(
    t.Union([
      t.String({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' }),
      t.Null(),
    ]),
  ),
  usage: t.Optional(
    t.Union([
      t.String({
        description:
          'The amount used to bill usage and measured in units described in `usage_unit`.',
      }),
      t.Null(),
    ]),
  ),
  usage_unit: t.Optional(
    t.Union([
      t.String({
        description:
          'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
      }),
      t.Null(),
    ]),
  ),
})

export const ApiV2010AccountUsageUsageRecordUsageRecordYesterdaySchema = t.Object({
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
      }),
      t.Null(),
    ]),
  ),
  api_version: t.Optional(
    t.Union([t.String({ description: 'The API version used to create the resource.' }), t.Null()]),
  ),
  as_of: t.Optional(
    t.Union([
      t.String({
        description:
          'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
      }),
      t.Null(),
    ]),
  ),
  category: t.Optional(
    t.Union([
      t.String({
        description:
          'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
      }),
      t.Null(),
    ]),
  ),
  count: t.Optional(
    t.Union([
      t.String({ description: 'The number of usage events, such as the number of calls.' }),
      t.Null(),
    ]),
  ),
  count_unit: t.Optional(
    t.Union([
      t.String({
        description:
          'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
      }),
      t.Null(),
    ]),
  ),
  description: t.Optional(
    t.Union([
      t.String({ description: 'A plain-language description of the usage category.' }),
      t.Null(),
    ]),
  ),
  end_date: t.Optional(
    t.Union([
      t.Date({
        description:
          'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
      }),
      t.Null(),
    ]),
  ),
  price: t.Optional(
    t.Union([
      t.Number({
        description:
          'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
      }),
      t.Null(),
    ]),
  ),
  price_unit: t.Optional(
    t.Union([
      t.String({
        description:
          'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
      }),
      t.Null(),
    ]),
  ),
  start_date: t.Optional(
    t.Union([
      t.Date({
        description:
          'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
      }),
      t.Null(),
    ]),
  ),
  subresource_uris: t.Optional(
    t.Union([
      t.Object(
        {},
        {
          description:
            'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
        },
      ),
      t.Null(),
    ]),
  ),
  uri: t.Optional(
    t.Union([
      t.String({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' }),
      t.Null(),
    ]),
  ),
  usage: t.Optional(
    t.Union([
      t.String({
        description:
          'The amount used to bill usage and measured in units described in `usage_unit`.',
      }),
      t.Null(),
    ]),
  ),
  usage_unit: t.Optional(
    t.Union([
      t.String({
        description:
          'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
      }),
      t.Null(),
    ]),
  ),
})

export const UsageTriggerEnumRecurringSchema = t.UnionEnum(
  ['daily', 'monthly', 'yearly', 'alltime'],
  {
    description:
      'The frequency of a recurring UsageTrigger.  Can be: `daily`, `monthly`, or `yearly` for recurring triggers or empty for non-recurring triggers. A trigger will only fire once during each period. Recurring times are in GMT.',
    default: undefined,
  },
)

export const UsageTriggerEnumTriggerFieldSchema = t.UnionEnum(['count', 'usage', 'price'], {
  description:
    'The field in the [UsageRecord](https://www.twilio.com/docs/usage/api/usage-record) resource that fires the trigger.  Can be: `count`, `usage`, or `price`, as described in the [UsageRecords documentation](https://www.twilio.com/docs/usage/api/usage-record#usage-count-price).',
  default: undefined,
})

export const ApiV2010AccountUsageUsageTriggerSchema = t.Object({
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that the trigger monitors.',
      }),
      t.Null(),
    ]),
  ),
  api_version: t.Optional(
    t.Union([t.String({ description: 'The API version used to create the resource.' }), t.Null()]),
  ),
  callback_method: t.Optional(
    t.Union([
      t.UnionEnum(['GET', 'POST'], {
        description: 'The HTTP method we use to call `callback_url`. Can be: `GET` or `POST`.',
        default: undefined,
      }),
      t.Null(),
    ]),
  ),
  callback_url: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        description: 'The URL we call using the `callback_method` when the trigger fires.',
      }),
      t.Null(),
    ]),
  ),
  current_value: t.Optional(
    t.Union([
      t.String({ description: 'The current value of the field the trigger is watching.' }),
      t.Null(),
    ]),
  ),
  date_created: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  date_fired: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the trigger was last fired specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  date_updated: t.Optional(
    t.Union([
      t.String({
        description:
          'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
      t.Null(),
    ]),
  ),
  friendly_name: t.Optional(
    t.Union([
      t.String({ description: 'The string that you assigned to describe the trigger.' }),
      t.Null(),
    ]),
  ),
  recurring: t.Optional(UsageTriggerEnumRecurringSchema),
  sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^UT[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The unique string that that we created to identify the UsageTrigger resource.',
      }),
      t.Null(),
    ]),
  ),
  trigger_by: t.Optional(UsageTriggerEnumTriggerFieldSchema),
  trigger_value: t.Optional(
    t.Union([
      t.String({
        description:
          'The value at which the trigger will fire.  Must be a positive, numeric value.',
      }),
      t.Null(),
    ]),
  ),
  uri: t.Optional(
    t.Union([
      t.String({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' }),
      t.Null(),
    ]),
  ),
  usage_category: t.Optional(
    t.Union([
      t.String({
        description:
          'The usage category the trigger watches. Must be one of the supported [usage categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
      }),
      t.Null(),
    ]),
  ),
  usage_record_uri: t.Optional(
    t.Union([
      t.String({
        description:
          'The URI of the [UsageRecord](https://www.twilio.com/docs/usage/api/usage-record) resource this trigger watches, relative to `https://api.twilio.com`.',
      }),
      t.Null(),
    ]),
  ),
})

export const ApiV2010AccountCallUserDefinedMessageSchema = t.Object({
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created User Defined Message.',
      }),
      t.Null(),
    ]),
  ),
  call_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^CA[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the User Defined Message is associated with.',
      }),
      t.Null(),
    ]),
  ),
  sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^KX[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'The SID that uniquely identifies this User Defined Message.',
      }),
      t.Null(),
    ]),
  ),
  date_created: t.Optional(
    t.Union([
      t.String({
        description:
          'The date that this User Defined Message was created, given in RFC 2822 format.',
      }),
      t.Null(),
    ]),
  ),
})

export const ApiV2010AccountCallUserDefinedMessageSubscriptionSchema = t.Object({
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that subscribed to the User Defined Messages.',
      }),
      t.Null(),
    ]),
  ),
  call_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^CA[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the User Defined Message Subscription is associated with. This refers to the Call SID that is producing the User Defined Messages.',
      }),
      t.Null(),
    ]),
  ),
  sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^ZY[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description: 'The SID that uniquely identifies this User Defined Message Subscription.',
      }),
      t.Null(),
    ]),
  ),
  date_created: t.Optional(
    t.Union([
      t.String({
        description:
          'The date that this User Defined Message Subscription was created, given in RFC 2822 format.',
      }),
      t.Null(),
    ]),
  ),
  uri: t.Optional(
    t.Union([
      t.String({
        description:
          'The URI of the User Defined Message Subscription Resource, relative to `https://api.twilio.com`.',
      }),
      t.Null(),
    ]),
  ),
})

export const ApiV2010AccountValidationRequestSchema = t.Object({
  account_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^AC[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) responsible for the Caller ID.',
      }),
      t.Null(),
    ]),
  ),
  call_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^CA[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Caller ID is associated with.',
      }),
      t.Null(),
    ]),
  ),
  friendly_name: t.Optional(
    t.Union([
      t.String({ description: 'The string that you assigned to describe the resource.' }),
      t.Null(),
    ]),
  ),
  phone_number: t.Optional(
    t.Union([
      t.String({
        description:
          'The phone number to verify in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
      }),
      t.Null(),
    ]),
  ),
  validation_code: t.Optional(
    t.Union([
      t.String({
        description:
          'The 6 digit validation code that someone must enter to validate the Caller ID  when `phone_number` is called.',
      }),
      t.Null(),
    ]),
  ),
})

export const ApiV2010AccountOutgoingCallerIdSmsVerificationSchema = t.Object({
  phone_number: t.Optional(
    t.Union([
      t.String({
        description:
          'The phone number being verified in [E.164](https://www.twilio.com/docs/glossary/what-e164) format.',
      }),
      t.Null(),
    ]),
  ),
  verification_sid: t.Optional(
    t.Union([
      t.String({ description: 'The SID that uniquely identifies the verification.' }),
      t.Null(),
    ]),
  ),
  send_code_attempts: t.Optional(
    t.Union([
      t.Array(
        t.Object({
          attempt_sid: t.Optional(
            t.String({ description: 'The SID of the verification attempt.' }),
          ),
          time: t.Optional(
            t.String({ description: 'The date and time of the attempt in ISO 8601 format.' }),
          ),
        }),
        {
          description:
            'An array of verification attempt objects containing the channel attempted and the channel-specific transaction SID.',
        },
      ),
      t.Null(),
    ]),
  ),
})

export const ApiV2010AccountOutgoingCallerIdVerificationCheckSchema = t.Object({
  phone_number: t.Optional(
    t.Union([
      t.String({
        description:
          'The phone number being verified in [E.164](https://www.twilio.com/docs/glossary/what-e164) format.',
      }),
      t.Null(),
    ]),
  ),
  verification_sid: t.Optional(
    t.Union([
      t.String({ description: 'The SID that uniquely identifies the verification.' }),
      t.Null(),
    ]),
  ),
  status: t.Optional(
    t.Union([
      t.String({
        description: 'The status of the verification. Can be: `pending`, `approved`, or `failed`.',
      }),
      t.Null(),
    ]),
  ),
  caller_id_sid: t.Optional(
    t.Union([
      t.String({
        pattern: '^PN[0-9a-fA-F]{32}$',
        minLength: 34,
        maxLength: 34,
        description:
          'The SID of the OutgoingCallerId resource created when verification is approved.',
      }),
      t.Null(),
    ]),
  ),
})
