import { defineHandler } from 'hono/factory'
import { Effect, Schema, SchemaTransformation } from 'effect'

export const AccountEnumStatusSchema = Schema.Literals(['active', 'suspended', 'closed']).annotate({
  description: 'The status of this account. Usually `active`, but can be `suspended` or `closed`.',
})

export type AccountEnumStatus = Schema.Schema.Type<typeof AccountEnumStatusSchema>

export const AccountEnumTypeSchema = Schema.Literals(['Trial', 'Full']).annotate({
  description: "The type of this account. Either `Trial` or `Full` if it's been upgraded",
})

export type AccountEnumType = Schema.Schema.Type<typeof AccountEnumTypeSchema>

export const ApiV2010AccountSchema = Schema.Struct({
  auth_token: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The authorization token for this account. This token should be kept a secret, so no sharing.',
    }),
  ),
  date_created: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The date that this account was created, in GMT in RFC 2822 format',
    }),
  ),
  date_updated: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The date that this account was last updated, in GMT in RFC 2822 format.',
    }),
  ),
  friendly_name: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'A human readable description of this account, up to 64 characters long. By default the FriendlyName is your email address.',
    }),
  ),
  owner_account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        "The unique 34 character id that represents the parent of this account. The OwnerAccountSid of a parent account is it's own sid.",
    }),
  ),
  sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({ description: 'A 34 character string that uniquely identifies this resource.' }),
  ),
  status: Schema.optionalKey(AccountEnumStatusSchema),
  subresource_uris: Schema.optionalKey(
    Schema.NullOr(Schema.Struct({})).annotate({
      description: 'A Map of various subresources available for the given Account Instance',
    }),
  ),
  type: Schema.optionalKey(AccountEnumTypeSchema),
  uri: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The URI for this resource, relative to `https://api.twilio.com`',
    }),
  ),
})

export type ApiV2010Account = Schema.Schema.Type<typeof ApiV2010AccountSchema>

export const ApiV2010AccountAddressSchema = Schema.Struct({
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that is responsible for the Address resource.',
    }),
  ),
  city: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The city in which the address is located.',
    }),
  ),
  customer_name: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The name associated with the address.This property has a maximum length of 16 4-byte characters, or 21 3-byte characters.',
    }),
  ),
  date_created: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  date_updated: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  friendly_name: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The string that you assigned to describe the resource.',
    }),
  ),
  iso_country: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({ description: 'The ISO country code of the address.' }),
  ),
  postal_code: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({ description: 'The postal code of the address.' }),
  ),
  region: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({ description: 'The state or region of the address.' }),
  ),
  sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AD[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description: 'The unique string that that we created to identify the Address resource.',
    }),
  ),
  street: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The number and street address of the address.',
    }),
  ),
  uri: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The URI of the resource, relative to `https://api.twilio.com`.',
    }),
  ),
  emergency_enabled: Schema.optionalKey(
    Schema.NullOr(Schema.Boolean).annotate({
      description: 'Whether emergency calling has been enabled on this number.',
    }),
  ),
  validated: Schema.optionalKey(
    Schema.NullOr(Schema.Boolean).annotate({
      description:
        "Whether the address has been validated to comply with local regulation. In countries that require valid addresses, an invalid address will not be accepted. `true` indicates the Address has been validated. `false` indicate the country doesn't require validation or the Address is not valid.",
    }),
  ),
  verified: Schema.optionalKey(
    Schema.NullOr(Schema.Boolean).annotate({
      description:
        "Whether the address has been verified to comply with regulation. In countries that require valid addresses, an invalid address will not be accepted. `true` indicates the Address has been verified. `false` indicate the country doesn't require verified or the Address is not valid.",
    }),
  ),
  street_secondary: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The additional number and street address of the address.',
    }),
  ),
})

export type ApiV2010AccountAddress = Schema.Schema.Type<typeof ApiV2010AccountAddressSchema>

export const ApiV2010AccountApplicationSchema = Schema.Struct({
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Application resource.',
    }),
  ),
  api_version: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The API version used to start a new TwiML session.',
    }),
  ),
  date_created: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  date_updated: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  friendly_name: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The string that you assigned to describe the resource.',
    }),
  ),
  message_status_callback: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description:
        'The URL we call using a POST method to send message status information to your application.',
    }),
  ),
  sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AP[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description: 'The unique string that that we created to identify the Application resource.',
    }),
  ),
  sms_fallback_method: Schema.optionalKey(
    Schema.NullOr(Schema.Literals(['GET', 'POST'])).annotate({
      description: 'The HTTP method we use to call `sms_fallback_url`. Can be: `GET` or `POST`.',
    }),
  ),
  sms_fallback_url: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description:
        'The URL that we call when an error occurs while retrieving or executing the TwiML from `sms_url`.',
    }),
  ),
  sms_method: Schema.optionalKey(
    Schema.NullOr(Schema.Literals(['GET', 'POST'])).annotate({
      description: 'The HTTP method we use to call `sms_url`. Can be: `GET` or `POST`.',
    }),
  ),
  sms_status_callback: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description:
        'The URL we call using a POST method to send status information to your application about SMS messages that refer to the application.',
    }),
  ),
  sms_url: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description: 'The URL we call when the phone number receives an incoming SMS message.',
    }),
  ),
  status_callback: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description:
        'The URL we call using the `status_callback_method` to send status information to your application.',
    }),
  ),
  status_callback_method: Schema.optionalKey(
    Schema.NullOr(Schema.Literals(['GET', 'POST'])).annotate({
      description: 'The HTTP method we use to call `status_callback`. Can be: `GET` or `POST`.',
    }),
  ),
  uri: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The URI of the resource, relative to `https://api.twilio.com`.',
    }),
  ),
  voice_caller_id_lookup: Schema.optionalKey(
    Schema.NullOr(Schema.Boolean).annotate({
      description:
        "Whether we look up the caller's caller-ID name from the CNAM database (additional charges apply). Can be: `true` or `false`.",
    }),
  ),
  voice_fallback_method: Schema.optionalKey(
    Schema.NullOr(Schema.Literals(['GET', 'POST'])).annotate({
      description: 'The HTTP method we use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
    }),
  ),
  voice_fallback_url: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description:
        'The URL that we call when an error occurs retrieving or executing the TwiML requested by `url`.',
    }),
  ),
  voice_method: Schema.optionalKey(
    Schema.NullOr(Schema.Literals(['GET', 'POST'])).annotate({
      description: 'The HTTP method we use to call `voice_url`. Can be: `GET` or `POST`.',
    }),
  ),
  voice_url: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description:
        'The URL we call when the phone number assigned to this application receives a call.',
    }),
  ),
  public_application_connect_enabled: Schema.optionalKey(
    Schema.NullOr(Schema.Boolean).annotate({
      description:
        'Whether to allow other Twilio accounts to dial this applicaton using Dial verb. Can be: `true` or `false`.',
    }),
  ),
})

export type ApiV2010AccountApplication = Schema.Schema.Type<typeof ApiV2010AccountApplicationSchema>

export const AuthorizedConnectAppEnumPermissionSchema = Schema.Literals([
  'get-all',
  'post-all',
]).annotate({
  description:
    'The set of permissions that you authorized for the Connect App.  Can be: `get-all` or `post-all`.',
})

export type AuthorizedConnectAppEnumPermission = Schema.Schema.Type<
  typeof AuthorizedConnectAppEnumPermissionSchema
>

export const ApiV2010AccountAuthorizedConnectAppSchema = Schema.Struct({
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the AuthorizedConnectApp resource.',
    }),
  ),
  connect_app_company_name: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The company name set for the Connect App.',
    }),
  ),
  connect_app_description: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'A detailed description of the Connect App.',
    }),
  ),
  connect_app_friendly_name: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({ description: 'The name of the Connect App.' }),
  ),
  connect_app_homepage_url: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description: 'The public URL for the Connect App.',
    }),
  ),
  connect_app_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^CN[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({ description: 'The SID that we assigned to the Connect App.' }),
  ),
  permissions: Schema.optionalKey(
    Schema.NullOr(Schema.Array(AuthorizedConnectAppEnumPermissionSchema)).annotate({
      description:
        'The set of permissions that you authorized for the Connect App.  Can be: `get-all` or `post-all`.',
    }),
  ),
  uri: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The URI of the resource, relative to `https://api.twilio.com`.',
    }),
  ),
})

export type ApiV2010AccountAuthorizedConnectApp = Schema.Schema.Type<
  typeof ApiV2010AccountAuthorizedConnectAppSchema
>

export const ApiV2010AccountAvailablePhoneNumberCountrySchema = Schema.Struct({
  country_code: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The [ISO-3166-1](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code of the country.',
    }),
  ),
  country: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({ description: 'The name of the country.' }),
  ),
  uri: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description: 'The URI of the Country resource, relative to `https://api.twilio.com`.',
    }),
  ),
  beta: Schema.optionalKey(
    Schema.NullOr(Schema.Boolean).annotate({
      description:
        'Whether all phone numbers available in the country are new to the Twilio platform. `true` if they are and `false` if all numbers are not in the Twilio Phone Number Beta program.',
    }),
  ),
  subresource_uris: Schema.optionalKey(
    Schema.NullOr(Schema.Struct({})).annotate({
      description:
        'A list of related AvailablePhoneNumber resources identified by their URIs relative to `https://api.twilio.com`.',
    }),
  ),
})

export type ApiV2010AccountAvailablePhoneNumberCountry = Schema.Schema.Type<
  typeof ApiV2010AccountAvailablePhoneNumberCountrySchema
>

export const ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberLocalSchema =
  Schema.Struct({
    friendly_name: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description: 'A formatted version of the phone number.',
      }),
    ),
    phone_number: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
      }),
    ),
    lata: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          'The [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) of this phone number. Available for only phone numbers from the US and Canada.',
      }),
    ),
    locality: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description: "The locality or city of this phone number's location.",
      }),
    ),
    rate_center: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          'The [rate center](https://en.wikipedia.org/wiki/Telephone_exchange) of this phone number. Available for only phone numbers from the US and Canada.',
      }),
    ),
    latitude: Schema.optionalKey(
      Schema.NullOr(Schema.Number).annotate({
        description:
          "The latitude of this phone number's location. Available for only phone numbers from the US and Canada.",
      }),
    ),
    longitude: Schema.optionalKey(
      Schema.NullOr(Schema.Number).annotate({
        description:
          "The longitude of this phone number's location. Available for only phone numbers from the US and Canada.",
      }),
    ),
    region: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          "The two-letter state or province abbreviation of this phone number's location. Available for only phone numbers from the US and Canada.",
      }),
    ),
    postal_code: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          "The postal or ZIP code of this phone number's location. Available for only phone numbers from the US and Canada.",
      }),
    ),
    iso_country: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          'The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of this phone number.',
      }),
    ),
    address_requirements: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          "The type of [Address](https://www.twilio.com/docs/usage/api/address) resource the phone number requires. Can be: `none`, `any`, `local`, or `foreign`. `none` means no address is required. `any` means an address is required, but it can be anywhere in the world. `local` means an address in the phone number's country is required. `foreign` means an address outside of the phone number's country is required.",
      }),
    ),
    beta: Schema.optionalKey(
      Schema.NullOr(Schema.Boolean).annotate({
        description:
          'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
      }),
    ),
    capabilities: Schema.optionalKey(
      Schema.NullOr(
        Schema.Struct({
          mms: Schema.optionalKey(Schema.Boolean),
          sms: Schema.optionalKey(Schema.Boolean),
          voice: Schema.optionalKey(Schema.Boolean),
          fax: Schema.optionalKey(Schema.Boolean),
        }),
      ).annotate({
        description:
          'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are: `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
      }),
    ),
  })

export type ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberLocal =
  Schema.Schema.Type<
    typeof ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberLocalSchema
  >

export const ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMachineToMachineSchema =
  Schema.Struct({
    friendly_name: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description: 'A formatted version of the phone number.',
      }),
    ),
    phone_number: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
      }),
    ),
    lata: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          'The [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) of this phone number. Available for only phone numbers from the US and Canada.',
      }),
    ),
    locality: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description: "The locality or city of this phone number's location.",
      }),
    ),
    rate_center: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          'The [rate center](https://en.wikipedia.org/wiki/Telephone_exchange) of this phone number. Available for only phone numbers from the US and Canada.',
      }),
    ),
    latitude: Schema.optionalKey(
      Schema.NullOr(Schema.Number).annotate({
        description:
          "The latitude of this phone number's location. Available for only phone numbers from the US and Canada.",
      }),
    ),
    longitude: Schema.optionalKey(
      Schema.NullOr(Schema.Number).annotate({
        description:
          "The longitude of this phone number's location. Available for only phone numbers from the US and Canada.",
      }),
    ),
    region: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          "The two-letter state or province abbreviation of this phone number's location. Available for only phone numbers from the US and Canada.",
      }),
    ),
    postal_code: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          "The postal or ZIP code of this phone number's location. Available for only phone numbers from the US and Canada.",
      }),
    ),
    iso_country: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          'The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of this phone number.',
      }),
    ),
    address_requirements: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          "The type of [Address](https://www.twilio.com/docs/usage/api/address) resource the phone number requires. Can be: `none`, `any`, `local`, or `foreign`. `none` means no address is required. `any` means an address is required, but it can be anywhere in the world. `local` means an address in the phone number's country is required. `foreign` means an address outside of the phone number's country is required.",
      }),
    ),
    beta: Schema.optionalKey(
      Schema.NullOr(Schema.Boolean).annotate({
        description:
          'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
      }),
    ),
    capabilities: Schema.optionalKey(
      Schema.NullOr(
        Schema.Struct({
          mms: Schema.optionalKey(Schema.Boolean),
          sms: Schema.optionalKey(Schema.Boolean),
          voice: Schema.optionalKey(Schema.Boolean),
          fax: Schema.optionalKey(Schema.Boolean),
        }),
      ).annotate({
        description:
          'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are: `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
      }),
    ),
  })

export type ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMachineToMachine =
  Schema.Schema.Type<
    typeof ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMachineToMachineSchema
  >

export const ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMobileSchema =
  Schema.Struct({
    friendly_name: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description: 'A formatted version of the phone number.',
      }),
    ),
    phone_number: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
      }),
    ),
    lata: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          'The [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) of this phone number. Available for only phone numbers from the US and Canada.',
      }),
    ),
    locality: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description: "The locality or city of this phone number's location.",
      }),
    ),
    rate_center: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          'The [rate center](https://en.wikipedia.org/wiki/Telephone_exchange) of this phone number. Available for only phone numbers from the US and Canada.',
      }),
    ),
    latitude: Schema.optionalKey(
      Schema.NullOr(Schema.Number).annotate({
        description:
          "The latitude of this phone number's location. Available for only phone numbers from the US and Canada.",
      }),
    ),
    longitude: Schema.optionalKey(
      Schema.NullOr(Schema.Number).annotate({
        description:
          "The longitude of this phone number's location. Available for only phone numbers from the US and Canada.",
      }),
    ),
    region: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          "The two-letter state or province abbreviation of this phone number's location. Available for only phone numbers from the US and Canada.",
      }),
    ),
    postal_code: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          "The postal or ZIP code of this phone number's location. Available for only phone numbers from the US and Canada.",
      }),
    ),
    iso_country: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          'The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of this phone number.',
      }),
    ),
    address_requirements: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          "The type of [Address](https://www.twilio.com/docs/usage/api/address) resource the phone number requires. Can be: `none`, `any`, `local`, or `foreign`. `none` means no address is required. `any` means an address is required, but it can be anywhere in the world. `local` means an address in the phone number's country is required. `foreign` means an address outside of the phone number's country is required.",
      }),
    ),
    beta: Schema.optionalKey(
      Schema.NullOr(Schema.Boolean).annotate({
        description:
          'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
      }),
    ),
    capabilities: Schema.optionalKey(
      Schema.NullOr(
        Schema.Struct({
          mms: Schema.optionalKey(Schema.Boolean),
          sms: Schema.optionalKey(Schema.Boolean),
          voice: Schema.optionalKey(Schema.Boolean),
          fax: Schema.optionalKey(Schema.Boolean),
        }),
      ).annotate({
        description:
          'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are: `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
      }),
    ),
  })

export type ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMobile =
  Schema.Schema.Type<
    typeof ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMobileSchema
  >

export const ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberNationalSchema =
  Schema.Struct({
    friendly_name: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description: 'A formatted version of the phone number.',
      }),
    ),
    phone_number: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
      }),
    ),
    lata: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          'The [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) of this phone number. Available for only phone numbers from the US and Canada.',
      }),
    ),
    locality: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description: "The locality or city of this phone number's location.",
      }),
    ),
    rate_center: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          'The [rate center](https://en.wikipedia.org/wiki/Telephone_exchange) of this phone number. Available for only phone numbers from the US and Canada.',
      }),
    ),
    latitude: Schema.optionalKey(
      Schema.NullOr(Schema.Number).annotate({
        description:
          "The latitude of this phone number's location. Available for only phone numbers from the US and Canada.",
      }),
    ),
    longitude: Schema.optionalKey(
      Schema.NullOr(Schema.Number).annotate({
        description:
          "The longitude of this phone number's location. Available for only phone numbers from the US and Canada.",
      }),
    ),
    region: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          "The two-letter state or province abbreviation of this phone number's location. Available for only phone numbers from the US and Canada.",
      }),
    ),
    postal_code: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          "The postal or ZIP code of this phone number's location. Available for only phone numbers from the US and Canada.",
      }),
    ),
    iso_country: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          'The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of this phone number.',
      }),
    ),
    address_requirements: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          "The type of [Address](https://www.twilio.com/docs/usage/api/address) resource the phone number requires. Can be: `none`, `any`, `local`, or `foreign`. `none` means no address is required. `any` means an address is required, but it can be anywhere in the world. `local` means an address in the phone number's country is required. `foreign` means an address outside of the phone number's country is required.",
      }),
    ),
    beta: Schema.optionalKey(
      Schema.NullOr(Schema.Boolean).annotate({
        description:
          'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
      }),
    ),
    capabilities: Schema.optionalKey(
      Schema.NullOr(
        Schema.Struct({
          mms: Schema.optionalKey(Schema.Boolean),
          sms: Schema.optionalKey(Schema.Boolean),
          voice: Schema.optionalKey(Schema.Boolean),
          fax: Schema.optionalKey(Schema.Boolean),
        }),
      ).annotate({
        description:
          'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are: `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
      }),
    ),
  })

export type ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberNational =
  Schema.Schema.Type<
    typeof ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberNationalSchema
  >

export const ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberSharedCostSchema =
  Schema.Struct({
    friendly_name: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description: 'A formatted version of the phone number.',
      }),
    ),
    phone_number: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
      }),
    ),
    lata: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          'The [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) of this phone number. Available for only phone numbers from the US and Canada.',
      }),
    ),
    locality: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description: "The locality or city of this phone number's location.",
      }),
    ),
    rate_center: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          'The [rate center](https://en.wikipedia.org/wiki/Telephone_exchange) of this phone number. Available for only phone numbers from the US and Canada.',
      }),
    ),
    latitude: Schema.optionalKey(
      Schema.NullOr(Schema.Number).annotate({
        description:
          "The latitude of this phone number's location. Available for only phone numbers from the US and Canada.",
      }),
    ),
    longitude: Schema.optionalKey(
      Schema.NullOr(Schema.Number).annotate({
        description:
          "The longitude of this phone number's location. Available for only phone numbers from the US and Canada.",
      }),
    ),
    region: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          "The two-letter state or province abbreviation of this phone number's location. Available for only phone numbers from the US and Canada.",
      }),
    ),
    postal_code: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          "The postal or ZIP code of this phone number's location. Available for only phone numbers from the US and Canada.",
      }),
    ),
    iso_country: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          'The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of this phone number.',
      }),
    ),
    address_requirements: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          "The type of [Address](https://www.twilio.com/docs/usage/api/address) resource the phone number requires. Can be: `none`, `any`, `local`, or `foreign`. `none` means no address is required. `any` means an address is required, but it can be anywhere in the world. `local` means an address in the phone number's country is required. `foreign` means an address outside of the phone number's country is required.",
      }),
    ),
    beta: Schema.optionalKey(
      Schema.NullOr(Schema.Boolean).annotate({
        description:
          'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
      }),
    ),
    capabilities: Schema.optionalKey(
      Schema.NullOr(
        Schema.Struct({
          mms: Schema.optionalKey(Schema.Boolean),
          sms: Schema.optionalKey(Schema.Boolean),
          voice: Schema.optionalKey(Schema.Boolean),
          fax: Schema.optionalKey(Schema.Boolean),
        }),
      ).annotate({
        description:
          'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are: `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
      }),
    ),
  })

export type ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberSharedCost =
  Schema.Schema.Type<
    typeof ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberSharedCostSchema
  >

export const ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberTollFreeSchema =
  Schema.Struct({
    friendly_name: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description: 'A formatted version of the phone number.',
      }),
    ),
    phone_number: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
      }),
    ),
    lata: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          'The [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) of this phone number. Available for only phone numbers from the US and Canada.',
      }),
    ),
    locality: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description: "The locality or city of this phone number's location.",
      }),
    ),
    rate_center: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          'The [rate center](https://en.wikipedia.org/wiki/Telephone_exchange) of this phone number. Available for only phone numbers from the US and Canada.',
      }),
    ),
    latitude: Schema.optionalKey(
      Schema.NullOr(Schema.Number).annotate({
        description:
          "The latitude of this phone number's location. Available for only phone numbers from the US and Canada.",
      }),
    ),
    longitude: Schema.optionalKey(
      Schema.NullOr(Schema.Number).annotate({
        description:
          "The longitude of this phone number's location. Available for only phone numbers from the US and Canada.",
      }),
    ),
    region: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          "The two-letter state or province abbreviation of this phone number's location. Available for only phone numbers from the US and Canada.",
      }),
    ),
    postal_code: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          "The postal or ZIP code of this phone number's location. Available for only phone numbers from the US and Canada.",
      }),
    ),
    iso_country: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          'The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of this phone number.',
      }),
    ),
    address_requirements: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          "The type of [Address](https://www.twilio.com/docs/usage/api/address) resource the phone number requires. Can be: `none`, `any`, `local`, or `foreign`. `none` means no address is required. `any` means an address is required, but it can be anywhere in the world. `local` means an address in the phone number's country is required. `foreign` means an address outside of the phone number's country is required.",
      }),
    ),
    beta: Schema.optionalKey(
      Schema.NullOr(Schema.Boolean).annotate({
        description:
          'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
      }),
    ),
    capabilities: Schema.optionalKey(
      Schema.NullOr(
        Schema.Struct({
          mms: Schema.optionalKey(Schema.Boolean),
          sms: Schema.optionalKey(Schema.Boolean),
          voice: Schema.optionalKey(Schema.Boolean),
          fax: Schema.optionalKey(Schema.Boolean),
        }),
      ).annotate({
        description:
          'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are: `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
      }),
    ),
  })

export type ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberTollFree =
  Schema.Schema.Type<
    typeof ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberTollFreeSchema
  >

export const ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberVoipSchema =
  Schema.Struct({
    friendly_name: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description: 'A formatted version of the phone number.',
      }),
    ),
    phone_number: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
      }),
    ),
    lata: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          'The [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) of this phone number. Available for only phone numbers from the US and Canada.',
      }),
    ),
    locality: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description: "The locality or city of this phone number's location.",
      }),
    ),
    rate_center: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          'The [rate center](https://en.wikipedia.org/wiki/Telephone_exchange) of this phone number. Available for only phone numbers from the US and Canada.',
      }),
    ),
    latitude: Schema.optionalKey(
      Schema.NullOr(Schema.Number).annotate({
        description:
          "The latitude of this phone number's location. Available for only phone numbers from the US and Canada.",
      }),
    ),
    longitude: Schema.optionalKey(
      Schema.NullOr(Schema.Number).annotate({
        description:
          "The longitude of this phone number's location. Available for only phone numbers from the US and Canada.",
      }),
    ),
    region: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          "The two-letter state or province abbreviation of this phone number's location. Available for only phone numbers from the US and Canada.",
      }),
    ),
    postal_code: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          "The postal or ZIP code of this phone number's location. Available for only phone numbers from the US and Canada.",
      }),
    ),
    iso_country: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          'The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of this phone number.',
      }),
    ),
    address_requirements: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          "The type of [Address](https://www.twilio.com/docs/usage/api/address) resource the phone number requires. Can be: `none`, `any`, `local`, or `foreign`. `none` means no address is required. `any` means an address is required, but it can be anywhere in the world. `local` means an address in the phone number's country is required. `foreign` means an address outside of the phone number's country is required.",
      }),
    ),
    beta: Schema.optionalKey(
      Schema.NullOr(Schema.Boolean).annotate({
        description:
          'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
      }),
    ),
    capabilities: Schema.optionalKey(
      Schema.NullOr(
        Schema.Struct({
          mms: Schema.optionalKey(Schema.Boolean),
          sms: Schema.optionalKey(Schema.Boolean),
          voice: Schema.optionalKey(Schema.Boolean),
          fax: Schema.optionalKey(Schema.Boolean),
        }),
      ).annotate({
        description:
          'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are: `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
      }),
    ),
  })

export type ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberVoip = Schema.Schema.Type<
  typeof ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberVoipSchema
>

export const ApiV2010AccountBalanceSchema = Schema.Struct({
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({ description: 'The unique SID identifier of the Account.' }),
  ),
  balance: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The balance of the Account, in units specified by the unit parameter. Balance changes may not be reflected immediately. Child accounts do not contain balance information',
    }),
  ),
  currency: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The units of currency for the account balance',
    }),
  ),
})

export type ApiV2010AccountBalance = Schema.Schema.Type<typeof ApiV2010AccountBalanceSchema>

export const CallEnumStatusSchema = Schema.Literals([
  'queued',
  'ringing',
  'in-progress',
  'completed',
  'busy',
  'failed',
  'no-answer',
  'canceled',
]).annotate({
  description:
    'The status of this call. Can be: `queued`, `ringing`, `in-progress`, `canceled`, `completed`, `failed`, `busy` or `no-answer`. See [Call Status Values](https://www.twilio.com/docs/voice/api/call-resource#call-status-values) below for more information.',
})

export type CallEnumStatus = Schema.Schema.Type<typeof CallEnumStatusSchema>

export const ApiV2010AccountCallSchema = Schema.Struct({
  sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^CA[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description: 'The unique string that we created to identify this Call resource.',
    }),
  ),
  date_created: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in UTC that this resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  date_updated: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in UTC that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  parent_call_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^CA[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({ description: 'The SID that identifies the call that created this leg.' }),
  ),
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Call resource.',
    }),
  ),
  to: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The phone number, SIP address, Client identifier or SIM SID that received this call. Phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +16175551212). SIP addresses are formatted as `name@company.com`. Client identifiers are formatted `client:name`. SIM SIDs are formatted as `sim:sid`.',
    }),
  ),
  to_formatted: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The phone number, SIP address or Client identifier that received this call. Formatted for display. Non-North American phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +442071838750).',
    }),
  ),
  from: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The phone number, SIP address, Client identifier or SIM SID that made this call. Phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +16175551212). SIP addresses are formatted as `name@company.com`. Client identifiers are formatted `client:name`. SIM SIDs are formatted as `sim:sid`.',
    }),
  ),
  from_formatted: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The calling phone number, SIP address, or Client identifier formatted for display. Non-North American phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +442071838750).',
    }),
  ),
  phone_number_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^PN[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'If the call was inbound, this is the SID of the IncomingPhoneNumber resource that received the call. If the call was outbound, it is the SID of the OutgoingCallerId resource from which the call was placed.',
    }),
  ),
  status: Schema.optionalKey(CallEnumStatusSchema),
  start_time: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The start time of the call, given as UTC in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format. Empty if the call has not yet been dialed.',
    }),
  ),
  end_time: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The time the call ended, given as UTC in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format. Empty if the call did not complete successfully.',
    }),
  ),
  duration: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The length of the call in seconds. This value is empty for busy, failed, unanswered, or ongoing calls.',
    }),
  ),
  price: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The charge for this call, in the currency associated with the account. Populated after the call is completed. May not be immediately available. The price associated with a call only reflects the charge for connectivity.  Charges for other call-related features such as Answering Machine Detection, Text-To-Speech, and SIP REFER are not included in this value.',
    }),
  ),
  price_unit: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The currency in which `Price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format (e.g., `USD`, `EUR`, `JPY`). Always capitalized for calls.',
    }),
  ),
  direction: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'A string describing the direction of the call. Can be: `inbound` for inbound calls, `outbound-api` for calls initiated via the REST API or `outbound-dial` for calls initiated by a `<Dial>` verb. Using [Elastic SIP Trunking](https://www.twilio.com/docs/sip-trunking), the values can be [`trunking-terminating`](https://www.twilio.com/docs/sip-trunking#termination) for outgoing calls from your communications infrastructure to the PSTN or [`trunking-originating`](https://www.twilio.com/docs/sip-trunking#origination) for incoming calls to your communications infrastructure from the PSTN.',
    }),
  ),
  answered_by: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'Either `human` or `machine` if this call was initiated with answering machine detection. Empty otherwise.',
    }),
  ),
  api_version: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The API version used to create the call.',
    }),
  ),
  forwarded_from: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The forwarding phone number if this call was an incoming call forwarded from another number (depends on carrier supporting forwarding). Otherwise, empty.',
    }),
  ),
  group_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^GP[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The Group SID associated with this call. If no Group is associated with the call, the field is empty.',
    }),
  ),
  caller_name: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        "The caller's name if this call was an incoming call to a phone number with caller ID Lookup enabled. Otherwise, empty.",
    }),
  ),
  queue_time: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The wait time in milliseconds before the call is placed.',
    }),
  ),
  stir_verstat: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The STIR/SHAKEN verification status of the call, for example `TN-Validation-Passed-A`. Empty if the incoming call had no STIR/SHAKEN information.',
    }),
  ),
  trunk_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^TK[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The unique identifier of the trunk resource that was used for this call. The field is empty if the call was not made using a SIP trunk or if the call is not terminated.',
    }),
  ),
  uri: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The URI of this resource, relative to `https://api.twilio.com`.',
    }),
  ),
  subresource_uris: Schema.optionalKey(
    Schema.NullOr(Schema.Struct({})).annotate({
      description:
        'A list of subresources available to this call, identified by their URIs relative to `https://api.twilio.com`.',
    }),
  ),
})

export type ApiV2010AccountCall = Schema.Schema.Type<typeof ApiV2010AccountCallSchema>

export const CallEnumEventSchema = Schema.Literals([
  'initiated',
  'ringing',
  'answered',
  'completed',
])

export type CallEnumEvent = Schema.Schema.Type<typeof CallEnumEventSchema>

export const CallEnumUpdateStatusSchema = Schema.Literals(['canceled', 'completed'])

export type CallEnumUpdateStatus = Schema.Schema.Type<typeof CallEnumUpdateStatusSchema>

export const ApiV2010AccountCallCallEventSchema = Schema.Struct({
  request: Schema.optionalKey(
    Schema.NullOr(Schema.Unknown).annotate({
      description: 'Contains a dictionary representing the request of the call.',
    }),
  ),
  response: Schema.optionalKey(
    Schema.NullOr(Schema.Unknown).annotate({
      description:
        'Contains a dictionary representing the call response, including a list of the call events.',
    }),
  ),
})

export type ApiV2010AccountCallCallEvent = Schema.Schema.Type<
  typeof ApiV2010AccountCallCallEventSchema
>

export const ApiV2010AccountCallCallNotificationSchema = Schema.Struct({
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Call Notification resource.',
    }),
  ),
  api_version: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The API version used to create the Call Notification resource.',
    }),
  ),
  call_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^CA[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Call Notification resource is associated with.',
    }),
  ),
  date_created: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  date_updated: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  error_code: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'A unique error code for the error condition that is described in our [Error Dictionary](https://www.twilio.com/docs/api/errors).',
    }),
  ),
  log: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'An integer log level that corresponds to the type of notification: `0` is ERROR, `1` is WARNING.',
    }),
  ),
  message_date: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date the notification was actually generated in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. Message buffering can cause this value to differ from `date_created`.',
    }),
  ),
  message_text: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({ description: 'The text of the notification.' }),
  ),
  more_info: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description:
        'The URL for more information about the error condition. This value is a page in our [Error Dictionary](https://www.twilio.com/docs/api/errors).',
    }),
  ),
  request_method: Schema.optionalKey(
    Schema.NullOr(Schema.Literals(['GET', 'POST'])).annotate({
      description:
        'The HTTP method used to generate the notification. If the notification was generated during a phone call, this is the HTTP Method used to request the resource on your server. If the notification was generated by your use of our REST API, this is the HTTP method used to call the resource on our servers.',
    }),
  ),
  request_url: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description:
        'The URL of the resource that generated the notification. If the notification was generated during a phone call, this is the URL of the resource on your server that caused the notification. If the notification was generated by your use of our REST API, this is the URL of the resource you called.',
    }),
  ),
  sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^NO[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The unique string that that we created to identify the Call Notification resource.',
    }),
  ),
  uri: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The URI of the resource, relative to `https://api.twilio.com`.',
    }),
  ),
})

export type ApiV2010AccountCallCallNotification = Schema.Schema.Type<
  typeof ApiV2010AccountCallCallNotificationSchema
>

export const ApiV2010AccountCallCallNotificationInstanceSchema = Schema.Struct({
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Call Notification resource.',
    }),
  ),
  api_version: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The API version used to create the Call Notification resource.',
    }),
  ),
  call_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^CA[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Call Notification resource is associated with.',
    }),
  ),
  date_created: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  date_updated: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  error_code: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'A unique error code for the error condition that is described in our [Error Dictionary](https://www.twilio.com/docs/api/errors).',
    }),
  ),
  log: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'An integer log level that corresponds to the type of notification: `0` is ERROR, `1` is WARNING.',
    }),
  ),
  message_date: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date the notification was actually generated in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. Message buffering can cause this value to differ from `date_created`.',
    }),
  ),
  message_text: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({ description: 'The text of the notification.' }),
  ),
  more_info: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description:
        'The URL for more information about the error condition. This value is a page in our [Error Dictionary](https://www.twilio.com/docs/api/errors).',
    }),
  ),
  request_method: Schema.optionalKey(
    Schema.NullOr(Schema.Literals(['GET', 'POST'])).annotate({
      description:
        'The HTTP method used to generate the notification. If the notification was generated during a phone call, this is the HTTP Method used to request the resource on your server. If the notification was generated by your use of our REST API, this is the HTTP method used to call the resource on our servers.',
    }),
  ),
  request_url: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description:
        'The URL of the resource that generated the notification. If the notification was generated during a phone call, this is the URL of the resource on your server that caused the notification. If the notification was generated by your use of our REST API, this is the URL of the resource you called.',
    }),
  ),
  request_variables: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The HTTP GET or POST variables we sent to your server. However, if the notification was generated by our REST API, this contains the HTTP POST or PUT variables you sent to our API.',
    }),
  ),
  response_body: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The HTTP body returned by your server.',
    }),
  ),
  response_headers: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The HTTP headers returned by your server.',
    }),
  ),
  sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^NO[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The unique string that that we created to identify the Call Notification resource.',
    }),
  ),
  uri: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The URI of the resource, relative to `https://api.twilio.com`.',
    }),
  ),
})

export type ApiV2010AccountCallCallNotificationInstance = Schema.Schema.Type<
  typeof ApiV2010AccountCallCallNotificationInstanceSchema
>

export const CallRecordingEnumStatusSchema = Schema.Literals([
  'in-progress',
  'paused',
  'stopped',
  'processing',
  'completed',
  'absent',
]).annotate({
  description:
    'The status of the recording. Can be: `processing`, `completed` and `absent`. For more detailed statuses on in-progress recordings, check out how to [Update a Recording Resource](https://www.twilio.com/docs/voice/api/recording#update-a-recording-resource).',
})

export type CallRecordingEnumStatus = Schema.Schema.Type<typeof CallRecordingEnumStatusSchema>

export const CallRecordingEnumSourceSchema = Schema.Literals([
  'DialVerb',
  'Conference',
  'OutboundAPI',
  'Trunking',
  'RecordVerb',
  'StartCallRecordingAPI',
  'StartConferenceRecordingAPI',
]).annotate({
  description:
    'How the recording was created. Can be: `DialVerb`, `Conference`, `OutboundAPI`, `Trunking`, `RecordVerb`, `StartCallRecordingAPI`, and `StartConferenceRecordingAPI`.',
})

export type CallRecordingEnumSource = Schema.Schema.Type<typeof CallRecordingEnumSourceSchema>

export const ApiV2010AccountCallCallRecordingSchema = Schema.Struct({
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording resource.',
    }),
  ),
  api_version: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The API version used to make the recording.',
    }),
  ),
  call_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^CA[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Recording resource is associated with.',
    }),
  ),
  conference_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^CF[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The Conference SID that identifies the conference associated with the recording, if a conference recording.',
    }),
  ),
  date_created: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  date_updated: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  start_time: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The start time of the recording in GMT and in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
    }),
  ),
  duration: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The length of the recording in seconds.',
    }),
  ),
  sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^RE[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description: 'The unique string that that we created to identify the Recording resource.',
    }),
  ),
  price: Schema.optionalKey(
    Schema.NullOr(Schema.Number).annotate({
      description: 'The one-time cost of creating the recording in the `price_unit` currency.',
    }),
  ),
  uri: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The URI of the resource, relative to `https://api.twilio.com`.',
    }),
  ),
  encryption_details: Schema.optionalKey(
    Schema.NullOr(Schema.Unknown).annotate({
      description:
        'How to decrypt the recording if it was encrypted using [Call Recording Encryption](https://www.twilio.com/docs/voice/tutorials/voice-recording-encryption) feature.',
    }),
  ),
  price_unit: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The currency used in the `price` property. Example: `USD`.',
    }),
  ),
  status: Schema.optionalKey(CallRecordingEnumStatusSchema),
  channels: Schema.Number.check(Schema.isInt())
    .pipe(Schema.withDecodingDefault(Effect.succeed(0)))
    .annotate({
      description:
        'The number of channels in the final recording file.  Can be: `1`, or `2`. Separating a two leg call into two separate channels of the recording file is supported in [Dial](https://www.twilio.com/docs/voice/twiml/dial#attributes-record) and [Outbound Rest API](https://www.twilio.com/docs/voice/make-calls) record options.',
    }),
  source: Schema.optionalKey(CallRecordingEnumSourceSchema),
  error_code: Schema.optionalKey(
    Schema.NullOr(Schema.Number.check(Schema.isInt())).annotate({
      description:
        'The error code that describes why the recording is `absent`. The error code is described in our [Error Dictionary](https://www.twilio.com/docs/api/errors). This value is null if the recording `status` is not `absent`.',
    }),
  ),
  track: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The recorded track. Can be: `inbound`, `outbound`, or `both`.',
    }),
  ),
})

export type ApiV2010AccountCallCallRecording = Schema.Schema.Type<
  typeof ApiV2010AccountCallCallRecordingSchema
>

export const ConferenceEnumStatusSchema = Schema.Literals([
  'init',
  'in-progress',
  'completed',
]).annotate({
  description: 'The status of this conference. Can be: `init`, `in-progress`, or `completed`.',
})

export type ConferenceEnumStatus = Schema.Schema.Type<typeof ConferenceEnumStatusSchema>

export const ConferenceEnumReasonConferenceEndedSchema = Schema.Literals([
  'conference-ended-via-api',
  'participant-with-end-conference-on-exit-left',
  'participant-with-end-conference-on-exit-kicked',
  'last-participant-kicked',
  'last-participant-left',
]).annotate({
  description:
    'The reason why a conference ended. When a conference is in progress, will be `null`. When conference is completed, can be: `conference-ended-via-api`, `participant-with-end-conference-on-exit-left`, `participant-with-end-conference-on-exit-kicked`, `last-participant-kicked`, or `last-participant-left`.',
})

export type ConferenceEnumReasonConferenceEnded = Schema.Schema.Type<
  typeof ConferenceEnumReasonConferenceEndedSchema
>

export const ApiV2010AccountConferenceSchema = Schema.Struct({
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Conference resource.',
    }),
  ),
  date_created: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in UTC that this resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  date_updated: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in UTC that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  api_version: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The API version used to create this conference.',
    }),
  ),
  friendly_name: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'A string that you assigned to describe this conference room. Maximum length is 128 characters.',
    }),
  ),
  region: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'A string that represents the Twilio Region where the conference audio was mixed. May be `us1`, `us2`, `ie1`,  `de1`, `sg1`, `br1`, `au1`, and `jp1`. Basic conference audio will always be mixed in `us1`. Global Conference audio will be mixed nearest to the majority of participants.',
    }),
  ),
  sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^CF[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description: 'The unique, Twilio-provided string used to identify this Conference resource.',
    }),
  ),
  status: Schema.optionalKey(ConferenceEnumStatusSchema),
  uri: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The URI of this resource, relative to `https://api.twilio.com`.',
    }),
  ),
  subresource_uris: Schema.optionalKey(
    Schema.NullOr(Schema.Struct({})).annotate({
      description:
        'A list of related resources identified by their URIs relative to `https://api.twilio.com`.',
    }),
  ),
  reason_conference_ended: Schema.optionalKey(ConferenceEnumReasonConferenceEndedSchema),
  call_sid_ending_conference: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^CA[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({ description: 'The call SID that caused the conference to end.' }),
  ),
})

export type ApiV2010AccountConference = Schema.Schema.Type<typeof ApiV2010AccountConferenceSchema>

export const ConferenceEnumUpdateStatusSchema = Schema.Literal('completed')

export type ConferenceEnumUpdateStatus = Schema.Schema.Type<typeof ConferenceEnumUpdateStatusSchema>

export const ConferenceRecordingEnumStatusSchema = Schema.Literals([
  'in-progress',
  'paused',
  'stopped',
  'processing',
  'completed',
  'absent',
]).annotate({
  description:
    'The status of the recording. Can be: `processing`, `completed` and `absent`. For more detailed statuses on in-progress recordings, check out how to [Update a Recording Resource](https://www.twilio.com/docs/voice/api/recording#update-a-recording-resource).',
})

export type ConferenceRecordingEnumStatus = Schema.Schema.Type<
  typeof ConferenceRecordingEnumStatusSchema
>

export const ConferenceRecordingEnumSourceSchema = Schema.Literals([
  'DialVerb',
  'Conference',
  'OutboundAPI',
  'Trunking',
  'RecordVerb',
  'StartCallRecordingAPI',
  'StartConferenceRecordingAPI',
]).annotate({
  description:
    'How the recording was created. Can be: `DialVerb`, `Conference`, `OutboundAPI`, `Trunking`, `RecordVerb`, `StartCallRecordingAPI`, `StartConferenceRecordingAPI`.',
})

export type ConferenceRecordingEnumSource = Schema.Schema.Type<
  typeof ConferenceRecordingEnumSourceSchema
>

export const ApiV2010AccountConferenceConferenceRecordingSchema = Schema.Struct({
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Conference Recording resource.',
    }),
  ),
  api_version: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The API version used to create the recording.',
    }),
  ),
  call_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^CA[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Conference Recording resource is associated with.',
    }),
  ),
  conference_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^CF[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The Conference SID that identifies the conference associated with the recording.',
    }),
  ),
  date_created: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  date_updated: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  start_time: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The start time of the recording in GMT and in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
    }),
  ),
  duration: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The length of the recording in seconds.',
    }),
  ),
  sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^RE[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The unique string that that we created to identify the Conference Recording resource.',
    }),
  ),
  price: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The one-time cost of creating the recording in the `price_unit` currency.',
    }),
  ),
  price_unit: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The currency used in the `price` property. Example: `USD`.',
    }),
  ),
  status: Schema.optionalKey(ConferenceRecordingEnumStatusSchema),
  channels: Schema.Number.check(Schema.isInt())
    .pipe(Schema.withDecodingDefault(Effect.succeed(0)))
    .annotate({
      description:
        'The number of channels in the final recording file.  Can be: `1`, or `2`. Separating a two leg call into two separate channels of the recording file is supported in [Dial](https://www.twilio.com/docs/voice/twiml/dial#attributes-record) and [Outbound Rest API](https://www.twilio.com/docs/voice/make-calls) record options.',
    }),
  source: Schema.optionalKey(ConferenceRecordingEnumSourceSchema),
  error_code: Schema.optionalKey(
    Schema.NullOr(Schema.Number.check(Schema.isInt())).annotate({
      description:
        'The error code that describes why the recording is `absent`. The error code is described in our [Error Dictionary](https://www.twilio.com/docs/api/errors). This value is null if the recording `status` is not `absent`.',
    }),
  ),
  encryption_details: Schema.optionalKey(
    Schema.NullOr(Schema.Unknown).annotate({
      description:
        'How to decrypt the recording if it was encrypted using [Call Recording Encryption](https://www.twilio.com/docs/voice/tutorials/voice-recording-encryption) feature.',
    }),
  ),
  uri: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The URI of the resource, relative to `https://api.twilio.com`.',
    }),
  ),
})

export type ApiV2010AccountConferenceConferenceRecording = Schema.Schema.Type<
  typeof ApiV2010AccountConferenceConferenceRecordingSchema
>

export const ConnectAppEnumPermissionSchema = Schema.Literals(['get-all', 'post-all']).annotate({
  description: 'The set of permissions that your ConnectApp requests.',
})

export type ConnectAppEnumPermission = Schema.Schema.Type<typeof ConnectAppEnumPermissionSchema>

export const ApiV2010AccountConnectAppSchema = Schema.Struct({
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the ConnectApp resource.',
    }),
  ),
  authorize_redirect_url: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description:
        'The URL we redirect the user to after we authenticate the user and obtain authorization to access the Connect App.',
    }),
  ),
  company_name: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The company name set for the Connect App.',
    }),
  ),
  deauthorize_callback_method: Schema.optionalKey(
    Schema.NullOr(Schema.Literals(['GET', 'POST'])).annotate({
      description: 'The HTTP method we use to call `deauthorize_callback_url`.',
    }),
  ),
  deauthorize_callback_url: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description:
        'The URL we call using the `deauthorize_callback_method` to de-authorize the Connect App.',
    }),
  ),
  description: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({ description: 'The description of the Connect App.' }),
  ),
  friendly_name: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The string that you assigned to describe the resource.',
    }),
  ),
  homepage_url: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description: 'The public URL where users can obtain more information about this Connect App.',
    }),
  ),
  permissions: Schema.optionalKey(
    Schema.NullOr(Schema.Array(ConnectAppEnumPermissionSchema)).annotate({
      description: 'The set of permissions that your ConnectApp requests.',
    }),
  ),
  sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^CN[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description: 'The unique string that that we created to identify the ConnectApp resource.',
    }),
  ),
  uri: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The URI of the resource, relative to `https://api.twilio.com`.',
    }),
  ),
})

export type ApiV2010AccountConnectApp = Schema.Schema.Type<typeof ApiV2010AccountConnectAppSchema>

export const DependentPhoneNumberEnumAddressRequirementSchema = Schema.Literals([
  'none',
  'any',
  'local',
  'foreign',
]).annotate({
  description:
    'Whether the phone number requires an [Address](https://www.twilio.com/docs/usage/api/address) registered with Twilio. Can be: `none`, `any`, `local`, or `foreign`.',
})

export type DependentPhoneNumberEnumAddressRequirement = Schema.Schema.Type<
  typeof DependentPhoneNumberEnumAddressRequirementSchema
>

export const DependentPhoneNumberEnumEmergencyStatusSchema = Schema.Literals([
  'Active',
  'Inactive',
]).annotate({ description: 'Whether the phone number is enabled for emergency calling.' })

export type DependentPhoneNumberEnumEmergencyStatus = Schema.Schema.Type<
  typeof DependentPhoneNumberEnumEmergencyStatusSchema
>

export const ApiV2010AccountAddressDependentPhoneNumberSchema = Schema.Struct({
  sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^PN[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The unique string that that we created to identify the DependentPhoneNumber resource.',
    }),
  ),
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the DependentPhoneNumber resource.',
    }),
  ),
  friendly_name: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The string that you assigned to describe the resource.',
    }),
  ),
  phone_number: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
    }),
  ),
  voice_url: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description:
        'The URL we call when the phone number receives a call. The `voice_url` will not be used if a `voice_application_sid` or a `trunk_sid` is set.',
    }),
  ),
  voice_method: Schema.optionalKey(
    Schema.NullOr(Schema.Literals(['GET', 'POST'])).annotate({
      description: 'The HTTP method we use to call `voice_url`. Can be: `GET` or `POST`.',
    }),
  ),
  voice_fallback_method: Schema.optionalKey(
    Schema.NullOr(Schema.Literals(['GET', 'POST'])).annotate({
      description: 'The HTTP method we use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
    }),
  ),
  voice_fallback_url: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description:
        'The URL that we call when an error occurs retrieving or executing the TwiML requested by `url`.',
    }),
  ),
  voice_caller_id_lookup: Schema.optionalKey(
    Schema.NullOr(Schema.Boolean).annotate({
      description:
        "Whether we look up the caller's caller-ID name from the CNAM database. Can be: `true` or `false`. Caller ID lookups can cost $0.01 each.",
    }),
  ),
  date_created: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  date_updated: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  sms_fallback_method: Schema.optionalKey(
    Schema.NullOr(Schema.Literals(['GET', 'POST'])).annotate({
      description: 'The HTTP method we use to call `sms_fallback_url`. Can be: `GET` or `POST`.',
    }),
  ),
  sms_fallback_url: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description:
        'The URL that we call when an error occurs while retrieving or executing the TwiML from `sms_url`.',
    }),
  ),
  sms_method: Schema.optionalKey(
    Schema.NullOr(Schema.Literals(['GET', 'POST'])).annotate({
      description: 'The HTTP method we use to call `sms_url`. Can be: `GET` or `POST`.',
    }),
  ),
  sms_url: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description: 'The URL we call when the phone number receives an incoming SMS message.',
    }),
  ),
  address_requirements: Schema.optionalKey(DependentPhoneNumberEnumAddressRequirementSchema),
  capabilities: Schema.optionalKey(
    Schema.NullOr(Schema.Unknown).annotate({
      description:
        'The set of Boolean properties that indicates whether a phone number can receive calls or messages.  Capabilities are  `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
    }),
  ),
  status_callback: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description:
        'The URL we call using the `status_callback_method` to send status information to your application.',
    }),
  ),
  status_callback_method: Schema.optionalKey(
    Schema.NullOr(Schema.Literals(['GET', 'POST'])).annotate({
      description: 'The HTTP method we use to call `status_callback`. Can be: `GET` or `POST`.',
    }),
  ),
  api_version: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The API version used to start a new TwiML session.',
    }),
  ),
  sms_application_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AP[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the application that handles SMS messages sent to the phone number. If an `sms_application_sid` is present, we ignore all `sms_*_url` values and use those of the application.',
    }),
  ),
  voice_application_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AP[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the application that handles calls to the phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
    }),
  ),
  trunk_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^TK[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the Trunk that handles calls to the phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
    }),
  ),
  emergency_status: Schema.optionalKey(DependentPhoneNumberEnumEmergencyStatusSchema),
  emergency_address_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AD[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the emergency address configuration that we use for emergency calling from the phone number.',
    }),
  ),
  uri: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The URI of the resource, relative to `https://api.twilio.com`.',
    }),
  ),
})

export type ApiV2010AccountAddressDependentPhoneNumber = Schema.Schema.Type<
  typeof ApiV2010AccountAddressDependentPhoneNumberSchema
>

export const IncomingPhoneNumberEnumAddressRequirementSchema = Schema.Literals([
  'none',
  'any',
  'local',
  'foreign',
]).annotate({
  description:
    'Whether the phone number requires an [Address](https://www.twilio.com/docs/usage/api/address) registered with Twilio. Can be: `none`, `any`, `local`, or `foreign`.',
})

export type IncomingPhoneNumberEnumAddressRequirement = Schema.Schema.Type<
  typeof IncomingPhoneNumberEnumAddressRequirementSchema
>

export const IncomingPhoneNumberEnumVoiceReceiveModeSchema = Schema.Literals(['voice', 'fax'])

export type IncomingPhoneNumberEnumVoiceReceiveMode = Schema.Schema.Type<
  typeof IncomingPhoneNumberEnumVoiceReceiveModeSchema
>

export const IncomingPhoneNumberEnumEmergencyStatusSchema = Schema.Literals([
  'Active',
  'Inactive',
]).annotate({
  description:
    'The parameter displays if emergency calling is enabled for this number. Active numbers may place emergency calls by dialing valid emergency numbers for the country.',
})

export type IncomingPhoneNumberEnumEmergencyStatus = Schema.Schema.Type<
  typeof IncomingPhoneNumberEnumEmergencyStatusSchema
>

export const IncomingPhoneNumberEnumEmergencyAddressStatusSchema = Schema.Literals([
  'registered',
  'unregistered',
  'pending-registration',
  'registration-failure',
  'pending-unregistration',
  'unregistration-failure',
]).annotate({
  description:
    'The status of address registration with emergency services. A registered emergency address will be used during handling of emergency calls from this number.',
})

export type IncomingPhoneNumberEnumEmergencyAddressStatus = Schema.Schema.Type<
  typeof IncomingPhoneNumberEnumEmergencyAddressStatusSchema
>

export const ApiV2010AccountIncomingPhoneNumberSchema = Schema.Struct({
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this IncomingPhoneNumber resource.',
    }),
  ),
  address_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AD[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description: 'The SID of the Address resource associated with the phone number.',
    }),
  ),
  address_requirements: Schema.optionalKey(IncomingPhoneNumberEnumAddressRequirementSchema),
  api_version: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The API version used to start a new TwiML session.',
    }),
  ),
  beta: Schema.optionalKey(
    Schema.NullOr(Schema.Boolean).annotate({
      description:
        'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
    }),
  ),
  capabilities: Schema.optionalKey(
    Schema.NullOr(
      Schema.Struct({
        mms: Schema.optionalKey(Schema.Boolean),
        sms: Schema.optionalKey(Schema.Boolean),
        voice: Schema.optionalKey(Schema.Boolean),
        fax: Schema.optionalKey(Schema.Boolean),
      }),
    ).annotate({
      description:
        'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are  `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
    }),
  ),
  date_created: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  date_updated: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  friendly_name: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The string that you assigned to describe the resource.',
    }),
  ),
  identity_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^RI[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the Identity resource that we associate with the phone number. Some regions require an Identity to meet local regulations.',
    }),
  ),
  phone_number: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
    }),
  ),
  origin: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        "The phone number's origin. `twilio` identifies Twilio-owned phone numbers and `hosted` identifies hosted phone numbers.",
    }),
  ),
  sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^PN[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The unique string that that we created to identify this IncomingPhoneNumber resource.',
    }),
  ),
  sms_application_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AP[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the application that handles SMS messages sent to the phone number. If an `sms_application_sid` is present, we ignore all `sms_*_url` values and use those of the application.',
    }),
  ),
  sms_fallback_method: Schema.optionalKey(
    Schema.NullOr(Schema.Literals(['GET', 'POST'])).annotate({
      description: 'The HTTP method we use to call `sms_fallback_url`. Can be: `GET` or `POST`.',
    }),
  ),
  sms_fallback_url: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description:
        'The URL that we call when an error occurs while retrieving or executing the TwiML from `sms_url`.',
    }),
  ),
  sms_method: Schema.optionalKey(
    Schema.NullOr(Schema.Literals(['GET', 'POST'])).annotate({
      description: 'The HTTP method we use to call `sms_url`. Can be: `GET` or `POST`.',
    }),
  ),
  sms_url: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description: 'The URL we call when the phone number receives an incoming SMS message.',
    }),
  ),
  status_callback: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description:
        'The URL we call using the `status_callback_method` to send status information to your application.',
    }),
  ),
  status_callback_method: Schema.optionalKey(
    Schema.NullOr(Schema.Literals(['GET', 'POST'])).annotate({
      description: 'The HTTP method we use to call `status_callback`. Can be: `GET` or `POST`.',
    }),
  ),
  trunk_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^TK[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the Trunk that handles calls to the phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
    }),
  ),
  uri: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The URI of the resource, relative to `https://api.twilio.com`.',
    }),
  ),
  voice_receive_mode: Schema.optionalKey(IncomingPhoneNumberEnumVoiceReceiveModeSchema),
  voice_application_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AP[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the application that handles calls to the phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
    }),
  ),
  voice_caller_id_lookup: Schema.optionalKey(
    Schema.NullOr(Schema.Boolean).annotate({
      description:
        "Whether we look up the caller's caller-ID name from the CNAM database ($0.01 per look up). Can be: `true` or `false`.",
    }),
  ),
  voice_fallback_method: Schema.optionalKey(
    Schema.NullOr(Schema.Literals(['GET', 'POST'])).annotate({
      description: 'The HTTP method we use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
    }),
  ),
  voice_fallback_url: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description:
        'The URL that we call when an error occurs retrieving or executing the TwiML requested by `url`.',
    }),
  ),
  voice_method: Schema.optionalKey(
    Schema.NullOr(Schema.Literals(['GET', 'POST'])).annotate({
      description: 'The HTTP method we use to call `voice_url`. Can be: `GET` or `POST`.',
    }),
  ),
  voice_url: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description:
        'The URL we call when the phone number receives a call. The `voice_url` will not be used if a `voice_application_sid` or a `trunk_sid` is set.',
    }),
  ),
  emergency_status: Schema.optionalKey(IncomingPhoneNumberEnumEmergencyStatusSchema),
  emergency_address_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AD[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the emergency address configuration that we use for emergency calling from this phone number.',
    }),
  ),
  emergency_address_status: Schema.optionalKey(IncomingPhoneNumberEnumEmergencyAddressStatusSchema),
  bundle_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^BU[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
    }),
  ),
  status: Schema.optionalKey(Schema.NullOr(Schema.String)),
  type: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({ description: 'The phone number type.' }),
  ),
})

export type ApiV2010AccountIncomingPhoneNumber = Schema.Schema.Type<
  typeof ApiV2010AccountIncomingPhoneNumberSchema
>

export const ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema =
  Schema.Struct({
    sid: Schema.optionalKey(
      Schema.NullOr(
        Schema.String.check(
          Schema.isPattern(/^XE[0-9a-fA-F]{32}$/),
          Schema.makeFilter((input) => [...input].length === 34, {
            expected: 'a string of 34 characters',
          }),
        ),
      ).annotate({
        description: 'The unique string that that we created to identify the resource.',
      }),
    ),
    account_sid: Schema.optionalKey(
      Schema.NullOr(
        Schema.String.check(
          Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
          Schema.makeFilter((input) => [...input].length === 34, {
            expected: 'a string of 34 characters',
          }),
        ),
      ).annotate({
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the resource.',
      }),
    ),
    resource_sid: Schema.optionalKey(
      Schema.NullOr(
        Schema.String.check(
          Schema.isPattern(/^PN[0-9a-fA-F]{32}$/),
          Schema.makeFilter((input) => [...input].length === 34, {
            expected: 'a string of 34 characters',
          }),
        ),
      ).annotate({ description: 'The SID of the Phone Number to which the Add-on is assigned.' }),
    ),
    friendly_name: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description: 'The string that you assigned to describe the resource.',
      }),
    ),
    description: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description: 'A short description of the functionality that the Add-on provides.',
      }),
    ),
    configuration: Schema.optionalKey(
      Schema.NullOr(Schema.Unknown).annotate({
        description:
          'A JSON string that represents the current configuration of this Add-on installation.',
      }),
    ),
    unique_name: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          "An application-defined string that uniquely identifies the resource. It can be used in place of the resource's `sid` in the URL to address the resource.",
      }),
    ),
    date_created: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
    ),
    date_updated: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
    ),
    uri: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description: 'The URI of the resource, relative to `https://api.twilio.com`.',
      }),
    ),
    subresource_uris: Schema.optionalKey(
      Schema.NullOr(Schema.Struct({})).annotate({
        description: 'A list of related resources identified by their relative URIs.',
      }),
    ),
  })

export type ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOn = Schema.Schema.Type<
  typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema
>

export const ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtensionSchema =
  Schema.Struct({
    sid: Schema.optionalKey(
      Schema.NullOr(
        Schema.String.check(
          Schema.isPattern(/^XF[0-9a-fA-F]{32}$/),
          Schema.makeFilter((input) => [...input].length === 34, {
            expected: 'a string of 34 characters',
          }),
        ),
      ).annotate({
        description: 'The unique string that that we created to identify the resource.',
      }),
    ),
    account_sid: Schema.optionalKey(
      Schema.NullOr(
        Schema.String.check(
          Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
          Schema.makeFilter((input) => [...input].length === 34, {
            expected: 'a string of 34 characters',
          }),
        ),
      ).annotate({
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the resource.',
      }),
    ),
    resource_sid: Schema.optionalKey(
      Schema.NullOr(
        Schema.String.check(
          Schema.isPattern(/^PN[0-9a-fA-F]{32}$/),
          Schema.makeFilter((input) => [...input].length === 34, {
            expected: 'a string of 34 characters',
          }),
        ),
      ).annotate({ description: 'The SID of the Phone Number to which the Add-on is assigned.' }),
    ),
    assigned_add_on_sid: Schema.optionalKey(
      Schema.NullOr(
        Schema.String.check(
          Schema.isPattern(/^XE[0-9a-fA-F]{32}$/),
          Schema.makeFilter((input) => [...input].length === 34, {
            expected: 'a string of 34 characters',
          }),
        ),
      ).annotate({
        description: 'The SID that uniquely identifies the assigned Add-on installation.',
      }),
    ),
    friendly_name: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description: 'The string that you assigned to describe the resource.',
      }),
    ),
    product_name: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          'A string that you assigned to describe the Product this Extension is used within.',
      }),
    ),
    unique_name: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          "An application-defined string that uniquely identifies the resource. It can be used in place of the resource's `sid` in the URL to address the resource.",
      }),
    ),
    uri: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description: 'The URI of the resource, relative to `https://api.twilio.com`.',
      }),
    ),
    enabled: Schema.optionalKey(
      Schema.NullOr(Schema.Boolean).annotate({
        description: 'Whether the Extension will be invoked.',
      }),
    ),
  })

export type ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtension =
  Schema.Schema.Type<
    typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtensionSchema
  >

export const IncomingPhoneNumberLocalEnumAddressRequirementSchema = Schema.Literals([
  'none',
  'any',
  'local',
  'foreign',
]).annotate({
  description:
    'Whether the phone number requires an [Address](https://www.twilio.com/docs/usage/api/address) registered with Twilio. Can be: `none`, `any`, `local`, or `foreign`.',
})

export type IncomingPhoneNumberLocalEnumAddressRequirement = Schema.Schema.Type<
  typeof IncomingPhoneNumberLocalEnumAddressRequirementSchema
>

export const IncomingPhoneNumberLocalEnumVoiceReceiveModeSchema = Schema.Literals(['voice', 'fax'])

export type IncomingPhoneNumberLocalEnumVoiceReceiveMode = Schema.Schema.Type<
  typeof IncomingPhoneNumberLocalEnumVoiceReceiveModeSchema
>

export const IncomingPhoneNumberLocalEnumEmergencyStatusSchema = Schema.Literals([
  'Active',
  'Inactive',
]).annotate({
  description:
    'The parameter displays if emergency calling is enabled for this number. Active numbers may place emergency calls by dialing valid emergency numbers for the country.',
})

export type IncomingPhoneNumberLocalEnumEmergencyStatus = Schema.Schema.Type<
  typeof IncomingPhoneNumberLocalEnumEmergencyStatusSchema
>

export const IncomingPhoneNumberLocalEnumEmergencyAddressStatusSchema = Schema.Literals([
  'registered',
  'unregistered',
  'pending-registration',
  'registration-failure',
  'pending-unregistration',
  'unregistration-failure',
]).annotate({
  description:
    'The status of address registration with emergency services. A registered emergency address will be used during handling of emergency calls from this number.',
})

export type IncomingPhoneNumberLocalEnumEmergencyAddressStatus = Schema.Schema.Type<
  typeof IncomingPhoneNumberLocalEnumEmergencyAddressStatusSchema
>

export const ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocalSchema = Schema.Struct({
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the resource.',
    }),
  ),
  address_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AD[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description: 'The SID of the Address resource associated with the phone number.',
    }),
  ),
  address_requirements: Schema.optionalKey(IncomingPhoneNumberLocalEnumAddressRequirementSchema),
  api_version: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The API version used to start a new TwiML session.',
    }),
  ),
  beta: Schema.optionalKey(
    Schema.NullOr(Schema.Boolean).annotate({
      description:
        'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
    }),
  ),
  capabilities: Schema.optionalKey(
    Schema.NullOr(
      Schema.Struct({
        mms: Schema.optionalKey(Schema.Boolean),
        sms: Schema.optionalKey(Schema.Boolean),
        voice: Schema.optionalKey(Schema.Boolean),
        fax: Schema.optionalKey(Schema.Boolean),
      }),
    ).annotate({
      description:
        'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are  `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
    }),
  ),
  date_created: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  date_updated: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  friendly_name: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The string that you assigned to describe the resource.',
    }),
  ),
  identity_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^RI[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the Identity resource that we associate with the phone number. Some regions require an Identity to meet local regulations.',
    }),
  ),
  phone_number: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
    }),
  ),
  origin: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        "The phone number's origin. `twilio` identifies Twilio-owned phone numbers and `hosted` identifies hosted phone numbers.",
    }),
  ),
  sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^PN[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({ description: 'The unique string that that we created to identify the resource.' }),
  ),
  sms_application_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AP[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the application that handles SMS messages sent to the phone number. If an `sms_application_sid` is present, we ignore all `sms_*_url` values and use those of the application.',
    }),
  ),
  sms_fallback_method: Schema.optionalKey(
    Schema.NullOr(Schema.Literals(['GET', 'POST'])).annotate({
      description: 'The HTTP method we use to call `sms_fallback_url`. Can be: `GET` or `POST`.',
    }),
  ),
  sms_fallback_url: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description:
        'The URL that we call when an error occurs while retrieving or executing the TwiML from `sms_url`.',
    }),
  ),
  sms_method: Schema.optionalKey(
    Schema.NullOr(Schema.Literals(['GET', 'POST'])).annotate({
      description: 'The HTTP method we use to call `sms_url`. Can be: `GET` or `POST`.',
    }),
  ),
  sms_url: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description: 'The URL we call when the phone number receives an incoming SMS message.',
    }),
  ),
  status_callback: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description:
        'The URL we call using the `status_callback_method` to send status information to your application.',
    }),
  ),
  status_callback_method: Schema.optionalKey(
    Schema.NullOr(Schema.Literals(['GET', 'POST'])).annotate({
      description: 'The HTTP method we use to call `status_callback`. Can be: `GET` or `POST`.',
    }),
  ),
  trunk_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^TK[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the Trunk that handles calls to the phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
    }),
  ),
  uri: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The URI of the resource, relative to `https://api.twilio.com`.',
    }),
  ),
  voice_receive_mode: Schema.optionalKey(IncomingPhoneNumberLocalEnumVoiceReceiveModeSchema),
  voice_application_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AP[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the application that handles calls to the phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
    }),
  ),
  voice_caller_id_lookup: Schema.optionalKey(
    Schema.NullOr(Schema.Boolean).annotate({
      description:
        "Whether we look up the caller's caller-ID name from the CNAM database ($0.01 per look up). Can be: `true` or `false`.",
    }),
  ),
  voice_fallback_method: Schema.optionalKey(
    Schema.NullOr(Schema.Literals(['GET', 'POST'])).annotate({
      description: 'The HTTP method we use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
    }),
  ),
  voice_fallback_url: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description:
        'The URL that we call when an error occurs retrieving or executing the TwiML requested by `url`.',
    }),
  ),
  voice_method: Schema.optionalKey(
    Schema.NullOr(Schema.Literals(['GET', 'POST'])).annotate({
      description: 'The HTTP method we use to call `voice_url`. Can be: `GET` or `POST`.',
    }),
  ),
  voice_url: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description:
        'The URL we call when this phone number receives a call. The `voice_url` will not be used if a `voice_application_sid` or a `trunk_sid` is set.',
    }),
  ),
  emergency_status: Schema.optionalKey(IncomingPhoneNumberLocalEnumEmergencyStatusSchema),
  emergency_address_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AD[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the emergency address configuration that we use for emergency calling from this phone number.',
    }),
  ),
  emergency_address_status: Schema.optionalKey(
    IncomingPhoneNumberLocalEnumEmergencyAddressStatusSchema,
  ),
  bundle_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^BU[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
    }),
  ),
  status: Schema.optionalKey(Schema.NullOr(Schema.String)),
})

export type ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocal = Schema.Schema.Type<
  typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocalSchema
>

export const IncomingPhoneNumberMobileEnumAddressRequirementSchema = Schema.Literals([
  'none',
  'any',
  'local',
  'foreign',
]).annotate({
  description:
    'Whether the phone number requires an [Address](https://www.twilio.com/docs/usage/api/address) registered with Twilio. Can be: `none`, `any`, `local`, or `foreign`.',
})

export type IncomingPhoneNumberMobileEnumAddressRequirement = Schema.Schema.Type<
  typeof IncomingPhoneNumberMobileEnumAddressRequirementSchema
>

export const IncomingPhoneNumberMobileEnumVoiceReceiveModeSchema = Schema.Literals(['voice', 'fax'])

export type IncomingPhoneNumberMobileEnumVoiceReceiveMode = Schema.Schema.Type<
  typeof IncomingPhoneNumberMobileEnumVoiceReceiveModeSchema
>

export const IncomingPhoneNumberMobileEnumEmergencyStatusSchema = Schema.Literals([
  'Active',
  'Inactive',
]).annotate({
  description:
    'The parameter displays if emergency calling is enabled for this number. Active numbers may place emergency calls by dialing valid emergency numbers for the country.',
})

export type IncomingPhoneNumberMobileEnumEmergencyStatus = Schema.Schema.Type<
  typeof IncomingPhoneNumberMobileEnumEmergencyStatusSchema
>

export const IncomingPhoneNumberMobileEnumEmergencyAddressStatusSchema = Schema.Literals([
  'registered',
  'unregistered',
  'pending-registration',
  'registration-failure',
  'pending-unregistration',
  'unregistration-failure',
]).annotate({
  description:
    'The status of address registration with emergency services. A registered emergency address will be used during handling of emergency calls from this number.',
})

export type IncomingPhoneNumberMobileEnumEmergencyAddressStatus = Schema.Schema.Type<
  typeof IncomingPhoneNumberMobileEnumEmergencyAddressStatusSchema
>

export const ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobileSchema = Schema.Struct({
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the resource.',
    }),
  ),
  address_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AD[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description: 'The SID of the Address resource associated with the phone number.',
    }),
  ),
  address_requirements: Schema.optionalKey(IncomingPhoneNumberMobileEnumAddressRequirementSchema),
  api_version: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The API version used to start a new TwiML session.',
    }),
  ),
  beta: Schema.optionalKey(
    Schema.NullOr(Schema.Boolean).annotate({
      description:
        'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
    }),
  ),
  capabilities: Schema.optionalKey(
    Schema.NullOr(
      Schema.Struct({
        mms: Schema.optionalKey(Schema.Boolean),
        sms: Schema.optionalKey(Schema.Boolean),
        voice: Schema.optionalKey(Schema.Boolean),
        fax: Schema.optionalKey(Schema.Boolean),
      }),
    ).annotate({
      description:
        'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are  `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
    }),
  ),
  date_created: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  date_updated: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  friendly_name: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The string that you assigned to describe the resource.',
    }),
  ),
  identity_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^RI[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the Identity resource that we associate with the phone number. Some regions require an Identity to meet local regulations.',
    }),
  ),
  phone_number: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
    }),
  ),
  origin: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        "The phone number's origin. `twilio` identifies Twilio-owned phone numbers and `hosted` identifies hosted phone numbers.",
    }),
  ),
  sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^PN[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({ description: 'The unique string that that we created to identify the resource.' }),
  ),
  sms_application_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AP[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the application that handles SMS messages sent to the phone number. If an `sms_application_sid` is present, we ignore all `sms_*_url` values and use those of the application.',
    }),
  ),
  sms_fallback_method: Schema.optionalKey(
    Schema.NullOr(Schema.Literals(['GET', 'POST'])).annotate({
      description: 'The HTTP method we use to call `sms_fallback_url`. Can be: `GET` or `POST`.',
    }),
  ),
  sms_fallback_url: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description:
        'The URL that we call when an error occurs while retrieving or executing the TwiML from `sms_url`.',
    }),
  ),
  sms_method: Schema.optionalKey(
    Schema.NullOr(Schema.Literals(['GET', 'POST'])).annotate({
      description: 'The HTTP method we use to call `sms_url`. Can be: `GET` or `POST`.',
    }),
  ),
  sms_url: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description: 'The URL we call when the phone number receives an incoming SMS message.',
    }),
  ),
  status_callback: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description:
        'The URL we call using the `status_callback_method` to send status information to your application.',
    }),
  ),
  status_callback_method: Schema.optionalKey(
    Schema.NullOr(Schema.Literals(['GET', 'POST'])).annotate({
      description: 'The HTTP method we use to call `status_callback`. Can be: `GET` or `POST`.',
    }),
  ),
  trunk_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^TK[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the Trunk that handles calls to the phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
    }),
  ),
  uri: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The URI of the resource, relative to `https://api.twilio.com`.',
    }),
  ),
  voice_receive_mode: Schema.optionalKey(IncomingPhoneNumberMobileEnumVoiceReceiveModeSchema),
  voice_application_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AP[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the application that handles calls to the phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
    }),
  ),
  voice_caller_id_lookup: Schema.optionalKey(
    Schema.NullOr(Schema.Boolean).annotate({
      description:
        "Whether we look up the caller's caller-ID name from the CNAM database ($0.01 per look up). Can be: `true` or `false`.",
    }),
  ),
  voice_fallback_method: Schema.optionalKey(
    Schema.NullOr(Schema.Literals(['GET', 'POST'])).annotate({
      description: 'The HTTP method we use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
    }),
  ),
  voice_fallback_url: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description:
        'The URL that we call when an error occurs retrieving or executing the TwiML requested by `url`.',
    }),
  ),
  voice_method: Schema.optionalKey(
    Schema.NullOr(Schema.Literals(['GET', 'POST'])).annotate({
      description: 'The HTTP method we use to call `voice_url`. Can be: `GET` or `POST`.',
    }),
  ),
  voice_url: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description:
        'The URL we call when the phone number receives a call. The `voice_url` will not be used if a `voice_application_sid` or a `trunk_sid` is set.',
    }),
  ),
  emergency_status: Schema.optionalKey(IncomingPhoneNumberMobileEnumEmergencyStatusSchema),
  emergency_address_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AD[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the emergency address configuration that we use for emergency calling from this phone number.',
    }),
  ),
  emergency_address_status: Schema.optionalKey(
    IncomingPhoneNumberMobileEnumEmergencyAddressStatusSchema,
  ),
  bundle_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^BU[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
    }),
  ),
  status: Schema.optionalKey(Schema.NullOr(Schema.String)),
})

export type ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobile = Schema.Schema.Type<
  typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobileSchema
>

export const IncomingPhoneNumberTollFreeEnumAddressRequirementSchema = Schema.Literals([
  'none',
  'any',
  'local',
  'foreign',
]).annotate({
  description:
    'Whether the phone number requires an [Address](https://www.twilio.com/docs/usage/api/address) registered with Twilio. Can be: `none`, `any`, `local`, or `foreign`.',
})

export type IncomingPhoneNumberTollFreeEnumAddressRequirement = Schema.Schema.Type<
  typeof IncomingPhoneNumberTollFreeEnumAddressRequirementSchema
>

export const IncomingPhoneNumberTollFreeEnumVoiceReceiveModeSchema = Schema.Literals([
  'voice',
  'fax',
])

export type IncomingPhoneNumberTollFreeEnumVoiceReceiveMode = Schema.Schema.Type<
  typeof IncomingPhoneNumberTollFreeEnumVoiceReceiveModeSchema
>

export const IncomingPhoneNumberTollFreeEnumEmergencyStatusSchema = Schema.Literals([
  'Active',
  'Inactive',
]).annotate({
  description:
    'The parameter displays if emergency calling is enabled for this number. Active numbers may place emergency calls by dialing valid emergency numbers for the country.',
})

export type IncomingPhoneNumberTollFreeEnumEmergencyStatus = Schema.Schema.Type<
  typeof IncomingPhoneNumberTollFreeEnumEmergencyStatusSchema
>

export const IncomingPhoneNumberTollFreeEnumEmergencyAddressStatusSchema = Schema.Literals([
  'registered',
  'unregistered',
  'pending-registration',
  'registration-failure',
  'pending-unregistration',
  'unregistration-failure',
]).annotate({
  description:
    'The status of address registration with emergency services. A registered emergency address will be used during handling of emergency calls from this number.',
})

export type IncomingPhoneNumberTollFreeEnumEmergencyAddressStatus = Schema.Schema.Type<
  typeof IncomingPhoneNumberTollFreeEnumEmergencyAddressStatusSchema
>

export const ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFreeSchema = Schema.Struct({
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the resource.',
    }),
  ),
  address_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AD[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description: 'The SID of the Address resource associated with the phone number.',
    }),
  ),
  address_requirements: Schema.optionalKey(IncomingPhoneNumberTollFreeEnumAddressRequirementSchema),
  api_version: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The API version used to start a new TwiML session.',
    }),
  ),
  beta: Schema.optionalKey(
    Schema.NullOr(Schema.Boolean).annotate({
      description:
        'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
    }),
  ),
  capabilities: Schema.optionalKey(
    Schema.NullOr(
      Schema.Struct({
        mms: Schema.optionalKey(Schema.Boolean),
        sms: Schema.optionalKey(Schema.Boolean),
        voice: Schema.optionalKey(Schema.Boolean),
        fax: Schema.optionalKey(Schema.Boolean),
      }),
    ).annotate({
      description:
        'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are  `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
    }),
  ),
  date_created: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  date_updated: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  friendly_name: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The string that you assigned to describe the resource.',
    }),
  ),
  identity_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^RI[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the Identity resource that we associate with the phone number. Some regions require an Identity to meet local regulations.',
    }),
  ),
  phone_number: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
    }),
  ),
  origin: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        "The phone number's origin. `twilio` identifies Twilio-owned phone numbers and `hosted` identifies hosted phone numbers.",
    }),
  ),
  sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^PN[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({ description: 'The unique string that that we created to identify the resource.' }),
  ),
  sms_application_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AP[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the application that handles SMS messages sent to the phone number. If an `sms_application_sid` is present, we ignore all `sms_*_url` values and use those of the application.',
    }),
  ),
  sms_fallback_method: Schema.optionalKey(
    Schema.NullOr(Schema.Literals(['GET', 'POST'])).annotate({
      description: 'The HTTP method we use to call `sms_fallback_url`. Can be: `GET` or `POST`.',
    }),
  ),
  sms_fallback_url: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description:
        'The URL that we call when an error occurs while retrieving or executing the TwiML from `sms_url`.',
    }),
  ),
  sms_method: Schema.optionalKey(
    Schema.NullOr(Schema.Literals(['GET', 'POST'])).annotate({
      description: 'The HTTP method we use to call `sms_url`. Can be: `GET` or `POST`.',
    }),
  ),
  sms_url: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description: 'The URL we call when the phone number receives an incoming SMS message.',
    }),
  ),
  status_callback: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description:
        'The URL we call using the `status_callback_method` to send status information to your application.',
    }),
  ),
  status_callback_method: Schema.optionalKey(
    Schema.NullOr(Schema.Literals(['GET', 'POST'])).annotate({
      description: 'The HTTP method we use to call `status_callback`. Can be: `GET` or `POST`.',
    }),
  ),
  trunk_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^TK[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the Trunk that handles calls to the phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
    }),
  ),
  uri: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The URI of the resource, relative to `https://api.twilio.com`.',
    }),
  ),
  voice_receive_mode: Schema.optionalKey(IncomingPhoneNumberTollFreeEnumVoiceReceiveModeSchema),
  voice_application_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AP[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the application that handles calls to the phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
    }),
  ),
  voice_caller_id_lookup: Schema.optionalKey(
    Schema.NullOr(Schema.Boolean).annotate({
      description:
        "Whether we look up the caller's caller-ID name from the CNAM database ($0.01 per look up). Can be: `true` or `false`.",
    }),
  ),
  voice_fallback_method: Schema.optionalKey(
    Schema.NullOr(Schema.Literals(['GET', 'POST'])).annotate({
      description: 'The HTTP method we use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
    }),
  ),
  voice_fallback_url: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description:
        'The URL that we call when an error occurs retrieving or executing the TwiML requested by `url`.',
    }),
  ),
  voice_method: Schema.optionalKey(
    Schema.NullOr(Schema.Literals(['GET', 'POST'])).annotate({
      description: 'The HTTP method we use to call `voice_url`. Can be: `GET` or `POST`.',
    }),
  ),
  voice_url: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description:
        'The URL we call when the phone number receives a call. The `voice_url` will not be used if a `voice_application_sid` or a `trunk_sid` is set.',
    }),
  ),
  emergency_status: Schema.optionalKey(IncomingPhoneNumberTollFreeEnumEmergencyStatusSchema),
  emergency_address_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AD[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the emergency address configuration that we use for emergency calling from this phone number.',
    }),
  ),
  emergency_address_status: Schema.optionalKey(
    IncomingPhoneNumberTollFreeEnumEmergencyAddressStatusSchema,
  ),
  bundle_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^BU[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
    }),
  ),
  status: Schema.optionalKey(Schema.NullOr(Schema.String)),
})

export type ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFree = Schema.Schema.Type<
  typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFreeSchema
>

export const ApiV2010AccountKeySchema = Schema.Struct({
  sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^SK[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description: 'The unique string that that we created to identify the Key resource.',
    }),
  ),
  friendly_name: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The string that you assigned to describe the resource.',
    }),
  ),
  date_created: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  date_updated: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
})

export type ApiV2010AccountKey = Schema.Schema.Type<typeof ApiV2010AccountKeySchema>

export const ApiV2010AccountMessageMediaSchema = Schema.Struct({
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) associated with this Media resource.',
    }),
  ),
  content_type: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The default [MIME type](https://en.wikipedia.org/wiki/Internet_media_type) of the media, for example `image/jpeg`, `image/png`, or `image/gif`.',
    }),
  ),
  date_created: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT when this Media resource was created, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  date_updated: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT when this Media resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  parent_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^(SM|MM)[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description: 'The SID of the Message resource that is associated with this Media resource.',
    }),
  ),
  sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^ME[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({ description: 'The unique string that identifies this Media resource.' }),
  ),
  uri: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The URI of this Media resource, relative to `https://api.twilio.com`.',
    }),
  ),
})

export type ApiV2010AccountMessageMedia = Schema.Schema.Type<
  typeof ApiV2010AccountMessageMediaSchema
>

export const ApiV2010AccountQueueMemberSchema = Schema.Struct({
  call_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^CA[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Member resource is associated with.',
    }),
  ),
  date_enqueued: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The date that the member was enqueued, given in RFC 2822 format.',
    }),
  ),
  position: Schema.Number.check(Schema.isInt())
    .pipe(Schema.withDecodingDefault(Effect.succeed(0)))
    .annotate({ description: "This member's current position in the queue." }),
  uri: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The URI of the resource, relative to `https://api.twilio.com`.',
    }),
  ),
  wait_time: Schema.Number.check(Schema.isInt())
    .pipe(Schema.withDecodingDefault(Effect.succeed(0)))
    .annotate({ description: 'The number of seconds the member has been in the queue.' }),
  queue_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^QU[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({ description: 'The SID of the Queue the member is in.' }),
  ),
})

export type ApiV2010AccountQueueMember = Schema.Schema.Type<typeof ApiV2010AccountQueueMemberSchema>

export const MessageEnumDirectionSchema = Schema.Literals([
  'inbound',
  'outbound-api',
  'outbound-call',
  'outbound-reply',
]).annotate({
  description:
    'The direction of the message. Can be: `inbound` for incoming messages, `outbound-api` for messages created by the REST API, `outbound-call` for messages created during a call, or `outbound-reply` for messages created in response to an incoming message.',
})

export type MessageEnumDirection = Schema.Schema.Type<typeof MessageEnumDirectionSchema>

export const MessageEnumStatusSchema = Schema.Literals([
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
]).annotate({
  description:
    'The status of the Message. Possible values: `accepted`, `scheduled`, `canceled`, `queued`, `sending`, `sent`, `failed`, `delivered`, `undelivered`, `receiving`, `received`, or `read` (WhatsApp only). For more information, See [detailed descriptions](https://www.twilio.com/docs/sms/api/message-resource#message-status-values).',
})

export type MessageEnumStatus = Schema.Schema.Type<typeof MessageEnumStatusSchema>

export const ApiV2010AccountMessageSchema = Schema.Struct({
  body: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({ description: 'The text content of the message' }),
  ),
  num_segments: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        "The number of segments that make up the complete message. SMS message bodies that exceed the [character limit](https://www.twilio.com/docs/glossary/what-sms-character-limit) are segmented and charged as multiple messages. Note: For messages sent via a Messaging Service, `num_segments` is initially `0`, since a sender hasn't yet been assigned.",
    }),
  ),
  direction: Schema.optionalKey(MessageEnumDirectionSchema),
  from: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        "The sender's phone number (in [E.164](https://en.wikipedia.org/wiki/E.164) format), [alphanumeric sender ID](https://www.twilio.com/docs/sms/quickstart), [Wireless SIM](https://www.twilio.com/docs/iot/wireless/programmable-wireless-send-machine-machine-sms-commands), [short code](https://www.twilio.com/en-us/messaging/channels/sms/short-codes), or  [channel address](https://www.twilio.com/docs/messaging/channels) (e.g., `whatsapp:+15554449999`). For incoming messages, this is the number or channel address of the sender. For outgoing messages, this value is a Twilio phone number, alphanumeric sender ID, short code, or channel address from which the message is sent.",
    }),
  ),
  to: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        "The recipient's phone number (in [E.164](https://en.wikipedia.org/wiki/E.164) format) or [channel address](https://www.twilio.com/docs/messaging/channels) (e.g. `whatsapp:+15552229999`)",
    }),
  ),
  date_updated: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The [RFC 2822](https://datatracker.ietf.org/doc/html/rfc2822#section-3.3) timestamp (in GMT) of when the Message resource was last updated',
    }),
  ),
  price: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The amount billed for the message in the currency specified by `price_unit`. The `price` is populated after the message has been sent/received, and may not be immediately availalble. View the [Pricing page](https://www.twilio.com/en-us/pricing) for more details.',
    }),
  ),
  error_message: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The description of the `error_code` if the Message `status` is `failed` or `undelivered`. If no error was encountered, the value is `null`. The value returned in this field for a specific error cause is subject to change as Twilio improves errors. Users should not use the `error_code` and `error_message` fields programmatically.',
    }),
  ),
  uri: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The URI of the Message resource, relative to `https://api.twilio.com`.',
    }),
  ),
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) associated with the Message resource',
    }),
  ),
  num_media: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The number of media files associated with the Message resource.',
    }),
  ),
  status: Schema.optionalKey(MessageEnumStatusSchema),
  messaging_service_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^MG[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Messaging Service](https://www.twilio.com/docs/messaging/api/service-resource) associated with the Message resource. A unique default value is assigned if a Messaging Service is not used.',
    }),
  ),
  sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^(SM|MM)[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description: 'The unique, Twilio-provided string that identifies the Message resource.',
    }),
  ),
  date_sent: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The [RFC 2822](https://datatracker.ietf.org/doc/html/rfc2822#section-3.3) timestamp (in GMT) of when the Message was sent. For an outgoing message, this is when Twilio sent the message. For an incoming message, this is when Twilio sent the HTTP request to your incoming message webhook URL.',
    }),
  ),
  date_created: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The [RFC 2822](https://datatracker.ietf.org/doc/html/rfc2822#section-3.3) timestamp (in GMT) of when the Message resource was created',
    }),
  ),
  error_code: Schema.optionalKey(
    Schema.NullOr(Schema.Number.check(Schema.isInt())).annotate({
      description:
        'The [error code](https://www.twilio.com/docs/api/errors) returned if the Message `status` is `failed` or `undelivered`. If no error was encountered, the value is `null`. The value returned in this field for a specific error cause is subject to change as Twilio improves errors. Users should not use the `error_code` and `error_message` fields programmatically.',
    }),
  ),
  price_unit: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format (e.g. `usd`, `eur`, `jpy`).',
    }),
  ),
  api_version: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The API version used to process the Message',
    }),
  ),
  subresource_uris: Schema.optionalKey(
    Schema.NullOr(Schema.Struct({})).annotate({
      description:
        'A list of related resources identified by their URIs relative to `https://api.twilio.com`',
    }),
  ),
})

export type ApiV2010AccountMessage = Schema.Schema.Type<typeof ApiV2010AccountMessageSchema>

export const MessageEnumUpdateStatusSchema = Schema.Literal('canceled')

export type MessageEnumUpdateStatus = Schema.Schema.Type<typeof MessageEnumUpdateStatusSchema>

export const MessageEnumContentRetentionSchema = Schema.Literals(['retain', 'discard']).annotate({
  description:
    'Determines if the message content can be stored or redacted based on privacy settings',
})

export type MessageEnumContentRetention = Schema.Schema.Type<
  typeof MessageEnumContentRetentionSchema
>

export const MessageEnumAddressRetentionSchema = Schema.Literals(['retain', 'obfuscate']).annotate({
  description: 'Determines if the address can be stored or obfuscated based on privacy settings',
})

export type MessageEnumAddressRetention = Schema.Schema.Type<
  typeof MessageEnumAddressRetentionSchema
>

export const MessageEnumTrafficTypeSchema = Schema.Literal('free')

export type MessageEnumTrafficType = Schema.Schema.Type<typeof MessageEnumTrafficTypeSchema>

export const MessageEnumScheduleTypeSchema = Schema.Literal('fixed').annotate({
  description:
    'For Messaging Services only: Include this parameter with a value of `fixed` in conjuction with the `send_time` parameter in order to [schedule a Message](https://www.twilio.com/docs/messaging/features/message-scheduling).',
})

export type MessageEnumScheduleType = Schema.Schema.Type<typeof MessageEnumScheduleTypeSchema>

export const MessageEnumRiskCheckSchema = Schema.Literals(['enable', 'disable']).annotate({
  description:
    'Include this parameter with a value of `disable` to skip any kind of risk check on the respective message request.',
})

export type MessageEnumRiskCheck = Schema.Schema.Type<typeof MessageEnumRiskCheckSchema>

export const MessageFeedbackEnumOutcomeSchema = Schema.Literals([
  'confirmed',
  'unconfirmed',
]).annotate({
  description:
    'Reported outcome indicating whether there is confirmation that the Message recipient performed a tracked user action. Can be: `unconfirmed` or `confirmed`. For more details see [How to Optimize Message Deliverability with Message Feedback](https://www.twilio.com/docs/messaging/guides/send-message-feedback-to-twilio).',
})

export type MessageFeedbackEnumOutcome = Schema.Schema.Type<typeof MessageFeedbackEnumOutcomeSchema>

export const ApiV2010AccountMessageMessageFeedbackSchema = Schema.Struct({
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) associated with this MessageFeedback resource.',
    }),
  ),
  message_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^(SM|MM)[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description: 'The SID of the Message resource associated with this MessageFeedback resource.',
    }),
  ),
  outcome: Schema.optionalKey(MessageFeedbackEnumOutcomeSchema),
  date_created: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT when this MessageFeedback resource was created, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  date_updated: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT when this MessageFeedback resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  uri: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The URI of the resource, relative to `https://api.twilio.com`.',
    }),
  ),
})

export type ApiV2010AccountMessageMessageFeedback = Schema.Schema.Type<
  typeof ApiV2010AccountMessageMessageFeedbackSchema
>

export const ApiV2010AccountNewKeySchema = Schema.Struct({
  sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^SK[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The unique string that that we created to identify the NewKey resource. You will use this as the basic-auth `user` when authenticating to the API.',
    }),
  ),
  friendly_name: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The string that you assigned to describe the resource.',
    }),
  ),
  date_created: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the API Key was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  date_updated: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the new API Key was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  secret: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The secret your application uses to sign Access Tokens and to authenticate to the REST API (you will use this as the basic-auth `password`).  **Note that for security reasons, this field is ONLY returned when the API Key is first created.**',
    }),
  ),
})

export type ApiV2010AccountNewKey = Schema.Schema.Type<typeof ApiV2010AccountNewKeySchema>

export const ApiV2010AccountNewSigningKeySchema = Schema.Struct({
  sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^SK[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description: 'The unique string that that we created to identify the NewSigningKey resource.',
    }),
  ),
  friendly_name: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The string that you assigned to describe the resource.',
    }),
  ),
  date_created: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  date_updated: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  secret: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The secret your application uses to sign Access Tokens and to authenticate to the REST API (you will use this as the basic-auth `password`).  **Note that for security reasons, this field is ONLY returned when the API Key is first created.**',
    }),
  ),
})

export type ApiV2010AccountNewSigningKey = Schema.Schema.Type<
  typeof ApiV2010AccountNewSigningKeySchema
>

export const ApiV2010AccountNotificationSchema = Schema.Struct({
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Notification resource.',
    }),
  ),
  api_version: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        "The API version used to generate the notification. Can be empty for events that don't have a specific API version, such as incoming phone calls.",
    }),
  ),
  call_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^CA[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Notification resource is associated with.',
    }),
  ),
  date_created: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  date_updated: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  error_code: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'A unique error code for the error condition that is described in our [Error Dictionary](https://www.twilio.com/docs/api/errors).',
    }),
  ),
  log: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'An integer log level that corresponds to the type of notification: `0` is ERROR, `1` is WARNING.',
    }),
  ),
  message_date: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date the notification was actually generated in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. Message buffering can cause this value to differ from `date_created`.',
    }),
  ),
  message_text: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({ description: 'The text of the notification.' }),
  ),
  more_info: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description:
        'The URL for more information about the error condition. This value is a page in our [Error Dictionary](https://www.twilio.com/docs/api/errors).',
    }),
  ),
  request_method: Schema.optionalKey(
    Schema.NullOr(Schema.Literals(['GET', 'POST'])).annotate({
      description:
        'The HTTP method used to generate the notification. If the notification was generated during a phone call, this is the HTTP Method used to request the resource on your server. If the notification was generated by your use of our REST API, this is the HTTP method used to call the resource on our servers.',
    }),
  ),
  request_url: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description:
        'The URL of the resource that generated the notification. If the notification was generated during a phone call, this is the URL of the resource on your server that caused the notification. If the notification was generated by your use of our REST API, this is the URL of the resource you called.',
    }),
  ),
  sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^NO[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description: 'The unique string that that we created to identify the Notification resource.',
    }),
  ),
  uri: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The URI of the resource, relative to `https://api.twilio.com`.',
    }),
  ),
})

export type ApiV2010AccountNotification = Schema.Schema.Type<
  typeof ApiV2010AccountNotificationSchema
>

export const ApiV2010AccountNotificationInstanceSchema = Schema.Struct({
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Notification resource.',
    }),
  ),
  api_version: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        "The API version used to generate the notification. Can be empty for events that don't have a specific API version, such as incoming phone calls.",
    }),
  ),
  call_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^CA[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Notification resource is associated with.',
    }),
  ),
  date_created: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  date_updated: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  error_code: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'A unique error code for the error condition that is described in our [Error Dictionary](https://www.twilio.com/docs/api/errors).',
    }),
  ),
  log: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'An integer log level that corresponds to the type of notification: `0` is ERROR, `1` is WARNING.',
    }),
  ),
  message_date: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date the notification was actually generated in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. Message buffering can cause this value to differ from `date_created`.',
    }),
  ),
  message_text: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({ description: 'The text of the notification.' }),
  ),
  more_info: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description:
        'The URL for more information about the error condition. This value is a page in our [Error Dictionary](https://www.twilio.com/docs/api/errors).',
    }),
  ),
  request_method: Schema.optionalKey(
    Schema.NullOr(Schema.Literals(['GET', 'POST'])).annotate({
      description:
        'The HTTP method used to generate the notification. If the notification was generated during a phone call, this is the HTTP Method used to request the resource on your server. If the notification was generated by your use of our REST API, this is the HTTP method used to call the resource on our servers.',
    }),
  ),
  request_url: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description:
        'The URL of the resource that generated the notification. If the notification was generated during a phone call, this is the URL of the resource on your server that caused the notification. If the notification was generated by your use of our REST API, this is the URL of the resource you called.',
    }),
  ),
  request_variables: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The HTTP GET or POST variables we sent to your server. However, if the notification was generated by our REST API, this contains the HTTP POST or PUT variables you sent to our API.',
    }),
  ),
  response_body: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The HTTP body returned by your server.',
    }),
  ),
  response_headers: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The HTTP headers returned by your server.',
    }),
  ),
  sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^NO[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description: 'The unique string that that we created to identify the Notification resource.',
    }),
  ),
  uri: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The URI of the resource, relative to `https://api.twilio.com`.',
    }),
  ),
})

export type ApiV2010AccountNotificationInstance = Schema.Schema.Type<
  typeof ApiV2010AccountNotificationInstanceSchema
>

export const ApiV2010AccountOutgoingCallerIdSchema = Schema.Struct({
  sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^PN[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The unique string that that we created to identify the OutgoingCallerId resource.',
    }),
  ),
  date_created: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  date_updated: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  friendly_name: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The string that you assigned to describe the resource.',
    }),
  ),
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the OutgoingCallerId resource.',
    }),
  ),
  phone_number: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
    }),
  ),
  uri: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The URI of the resource, relative to `https://api.twilio.com`.',
    }),
  ),
})

export type ApiV2010AccountOutgoingCallerId = Schema.Schema.Type<
  typeof ApiV2010AccountOutgoingCallerIdSchema
>

export const ParticipantEnumStatusSchema = Schema.Literals([
  'queued',
  'connecting',
  'ringing',
  'connected',
  'complete',
  'failed',
]).annotate({
  description:
    "The status of the participant's call in a session. Can be: `queued`, `connecting`, `ringing`, `connected`, `complete`, or `failed`.",
})

export type ParticipantEnumStatus = Schema.Schema.Type<typeof ParticipantEnumStatusSchema>

export const ApiV2010AccountConferenceParticipantSchema = Schema.Struct({
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Participant resource.',
    }),
  ),
  call_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^CA[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Participant resource is associated with.',
    }),
  ),
  label: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The user-specified label of this participant, if one was given when the participant was created. This may be used to fetch, update or delete the participant.',
    }),
  ),
  call_sid_to_coach: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^CA[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the participant who is being `coached`. The participant being coached is the only participant who can hear the participant who is `coaching`.',
    }),
  ),
  coaching: Schema.optionalKey(
    Schema.NullOr(Schema.Boolean).annotate({
      description:
        'Whether the participant is coaching another call. Can be: `true` or `false`. If not present, defaults to `false` unless `call_sid_to_coach` is defined. If `true`, `call_sid_to_coach` must be defined.',
    }),
  ),
  conference_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^CF[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({ description: 'The SID of the conference the participant is in.' }),
  ),
  date_created: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  date_updated: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  end_conference_on_exit: Schema.optionalKey(
    Schema.NullOr(Schema.Boolean).annotate({
      description:
        'Whether the conference ends when the participant leaves. Can be: `true` or `false` and the default is `false`. If `true`, the conference ends and all other participants drop out when the participant leaves.',
    }),
  ),
  muted: Schema.optionalKey(
    Schema.NullOr(Schema.Boolean).annotate({
      description: 'Whether the participant is muted. Can be `true` or `false`.',
    }),
  ),
  hold: Schema.optionalKey(
    Schema.NullOr(Schema.Boolean).annotate({
      description: 'Whether the participant is on hold. Can be `true` or `false`.',
    }),
  ),
  start_conference_on_enter: Schema.optionalKey(
    Schema.NullOr(Schema.Boolean).annotate({
      description:
        'Whether the conference starts when the participant joins the conference, if it has not already started. Can be: `true` or `false` and the default is `true`. If `false` and the conference has not started, the participant is muted and hears background music until another participant starts the conference.',
    }),
  ),
  status: Schema.optionalKey(ParticipantEnumStatusSchema),
  queue_time: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        "The wait time in milliseconds before participant's call is placed. Only available in the response to a create participant request.",
    }),
  ),
  uri: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The URI of the resource, relative to `https://api.twilio.com`.',
    }),
  ),
})

export type ApiV2010AccountConferenceParticipant = Schema.Schema.Type<
  typeof ApiV2010AccountConferenceParticipantSchema
>

export const ApiV2010AccountCallPaymentsSchema = Schema.Struct({
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Payments resource.',
    }),
  ),
  call_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^CA[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Payments resource is associated with. This will refer to the call sid that is producing the payment card (credit/ACH) information thru DTMF.',
    }),
  ),
  sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^PK[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({ description: 'The SID of the Payments resource.' }),
  ),
  date_created: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  date_updated: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  uri: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The URI of the resource, relative to `https://api.twilio.com`.',
    }),
  ),
})

export type ApiV2010AccountCallPayments = Schema.Schema.Type<
  typeof ApiV2010AccountCallPaymentsSchema
>

export const PaymentsEnumPaymentMethodSchema = Schema.Literals([
  'credit-card',
  'ach-debit',
]).annotate({
  description:
    'Type of payment being captured. One of `credit-card` or `ach-debit`. The default value is `credit-card`.',
})

export type PaymentsEnumPaymentMethod = Schema.Schema.Type<typeof PaymentsEnumPaymentMethodSchema>

export const PaymentsEnumBankAccountTypeSchema = Schema.Literals([
  'consumer-checking',
  'consumer-savings',
  'commercial-checking',
]).annotate({
  description:
    'Type of bank account if payment source is ACH. One of `consumer-checking`, `consumer-savings`, or `commercial-checking`. The default value is `consumer-checking`.',
})

export type PaymentsEnumBankAccountType = Schema.Schema.Type<
  typeof PaymentsEnumBankAccountTypeSchema
>

export const PaymentsEnumTokenTypeSchema = Schema.Literals([
  'one-time',
  'reusable',
  'payment-method',
]).annotate({
  description:
    'Indicates whether the payment method should be tokenized as a `one-time`, `reusable`, or `payment-method` token. The default value is `reusable`. Do not enter a charge amount when tokenizing. If a charge amount is entered, the payment method will be charged and not tokenized.',
})

export type PaymentsEnumTokenType = Schema.Schema.Type<typeof PaymentsEnumTokenTypeSchema>

export const PaymentsEnumCaptureSchema = Schema.Literals([
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
]).annotate({
  description:
    'The piece of payment information that you wish the caller to enter. Must be one of `payment-card-number`, `expiration-date`, `security-code`, `postal-code`, `bank-routing-number`, `bank-account-number`, or their `-matcher` variants for input confirmation when `RequireMatchingInputs` is enabled.',
})

export type PaymentsEnumCapture = Schema.Schema.Type<typeof PaymentsEnumCaptureSchema>

export const PaymentsEnumStatusSchema = Schema.Literals(['complete', 'cancel']).annotate({
  description:
    'Indicates whether the current payment session should be cancelled or completed. When `cancel` the payment session is cancelled. When `complete`, Twilio sends the payment information to the selected Pay Connector for processing.',
})

export type PaymentsEnumStatus = Schema.Schema.Type<typeof PaymentsEnumStatusSchema>

export const ApiV2010AccountQueueSchema = Schema.Struct({
  date_updated: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  current_size: Schema.Number.check(Schema.isInt())
    .pipe(Schema.withDecodingDefault(Effect.succeed(0)))
    .annotate({ description: 'The number of calls currently in the queue.' }),
  friendly_name: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'A string that you assigned to describe this resource.',
    }),
  ),
  uri: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The URI of this resource, relative to `https://api.twilio.com`.',
    }),
  ),
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Queue resource.',
    }),
  ),
  average_wait_time: Schema.Number.check(Schema.isInt())
    .pipe(Schema.withDecodingDefault(Effect.succeed(0)))
    .annotate({
      description:
        ' The average wait time in seconds of the members in this queue. This is calculated at the time of the request.',
    }),
  sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^QU[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description: 'The unique string that that we created to identify this Queue resource.',
    }),
  ),
  date_created: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that this resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  max_size: Schema.Number.check(Schema.isInt())
    .pipe(Schema.withDecodingDefault(Effect.succeed(0)))
    .annotate({
      description:
        ' The maximum number of calls that can be in the queue. The default is 1000 and the maximum is 5000.',
    }),
})

export type ApiV2010AccountQueue = Schema.Schema.Type<typeof ApiV2010AccountQueueSchema>

export const RealtimeTranscriptionEnumStatusSchema = Schema.Literals([
  'in-progress',
  'stopped',
]).annotate({ description: 'The status - one of `stopped`, `in-flight`' })

export type RealtimeTranscriptionEnumStatus = Schema.Schema.Type<
  typeof RealtimeTranscriptionEnumStatusSchema
>

export const ApiV2010AccountCallRealtimeTranscriptionSchema = Schema.Struct({
  sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^GT[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({ description: 'The SID of the Transcription resource.' }),
  ),
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Transcription resource.',
    }),
  ),
  call_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^CA[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Transcription resource is associated with.',
    }),
  ),
  name: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The user-specified name of this Transcription, if one was given when the Transcription was created. This may be used to stop the Transcription.',
    }),
  ),
  status: Schema.optionalKey(RealtimeTranscriptionEnumStatusSchema),
  date_updated: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  uri: Schema.optionalKey(Schema.NullOr(Schema.String)),
})

export type ApiV2010AccountCallRealtimeTranscription = Schema.Schema.Type<
  typeof ApiV2010AccountCallRealtimeTranscriptionSchema
>

export const RealtimeTranscriptionEnumTrackSchema = Schema.Literals([
  'inbound_track',
  'outbound_track',
  'both_tracks',
]).annotate({ description: 'One of `inbound_track`, `outbound_track`, `both_tracks`.' })

export type RealtimeTranscriptionEnumTrack = Schema.Schema.Type<
  typeof RealtimeTranscriptionEnumTrackSchema
>

export const RealtimeTranscriptionEnumUpdateStatusSchema = Schema.Literal('stopped')

export type RealtimeTranscriptionEnumUpdateStatus = Schema.Schema.Type<
  typeof RealtimeTranscriptionEnumUpdateStatusSchema
>

export const RecordingEnumStatusSchema = Schema.Literals([
  'in-progress',
  'paused',
  'stopped',
  'processing',
  'completed',
  'absent',
  'deleted',
]).annotate({
  description:
    'The status of the recording. Can be: `processing`, `completed`, `absent` or `deleted`. For information about more detailed statuses on in-progress recordings, check out how to [Update a Recording Resource](https://www.twilio.com/docs/voice/api/recording#update-a-recording-resource).',
})

export type RecordingEnumStatus = Schema.Schema.Type<typeof RecordingEnumStatusSchema>

export const RecordingEnumSourceSchema = Schema.Literals([
  'DialVerb',
  'Conference',
  'OutboundAPI',
  'Trunking',
  'RecordVerb',
  'StartCallRecordingAPI',
  'StartConferenceRecordingAPI',
]).annotate({
  description:
    'How the recording was created. Can be: `DialVerb`, `Conference`, `OutboundAPI`, `Trunking`, `RecordVerb`, `StartCallRecordingAPI`, and `StartConferenceRecordingAPI`.',
})

export type RecordingEnumSource = Schema.Schema.Type<typeof RecordingEnumSourceSchema>

export const ApiV2010AccountRecordingSchema = Schema.Struct({
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording resource.',
    }),
  ),
  api_version: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The API version used during the recording.',
    }),
  ),
  call_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^CA[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Recording resource is associated with. This will always refer to the parent leg of a two-leg call.',
    }),
  ),
  conference_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^CF[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The Conference SID that identifies the conference associated with the recording, if a conference recording.',
    }),
  ),
  date_created: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  date_updated: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  start_time: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The start time of the recording in GMT and in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
    }),
  ),
  duration: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The length of the recording in seconds.',
    }),
  ),
  sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^RE[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description: 'The unique string that that we created to identify the Recording resource.',
    }),
  ),
  price: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The one-time cost of creating the recording in the `price_unit` currency.',
    }),
  ),
  price_unit: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The currency used in the `price` property. Example: `USD`.',
    }),
  ),
  status: Schema.optionalKey(RecordingEnumStatusSchema),
  channels: Schema.optionalKey(
    Schema.NullOr(Schema.Number.check(Schema.isInt())).annotate({
      description:
        'The number of channels in the recording resource. For information on specifying the number of channels in the downloaded recording file, check out [Fetch a Recording’s media file](https://www.twilio.com/docs/voice/api/recording#download-dual-channel-media-file).',
    }),
  ),
  source: Schema.optionalKey(RecordingEnumSourceSchema),
  error_code: Schema.optionalKey(
    Schema.NullOr(Schema.Number.check(Schema.isInt())).annotate({
      description:
        'The error code that describes why the recording is `absent`. The error code is described in our [Error Dictionary](https://www.twilio.com/docs/api/errors). This value is null if the recording `status` is not `absent`.',
    }),
  ),
  uri: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The URI of the resource, relative to `https://api.twilio.com`.',
    }),
  ),
  encryption_details: Schema.optionalKey(
    Schema.NullOr(Schema.Unknown).annotate({
      description:
        'How to decrypt the recording if it was encrypted using [Call Recording Encryption](https://www.twilio.com/docs/voice/tutorials/voice-recording-encryption) feature.',
    }),
  ),
  subresource_uris: Schema.optionalKey(
    Schema.NullOr(Schema.Struct({})).annotate({
      description: 'A list of related resources identified by their relative URIs.',
    }),
  ),
  media_url: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description:
        'The URL of the media file associated with this recording resource. When stored externally, this is the full URL location of the media file.',
    }),
  ),
})

export type ApiV2010AccountRecording = Schema.Schema.Type<typeof ApiV2010AccountRecordingSchema>

export const RecordingAddOnResultEnumStatusSchema = Schema.Literals([
  'canceled',
  'completed',
  'deleted',
  'failed',
  'in-progress',
  'init',
  'processing',
  'queued',
]).annotate({
  description:
    'The status of the result. Can be: `canceled`, `completed`, `deleted`, `failed`, `in-progress`, `init`, `processing`, `queued`.',
})

export type RecordingAddOnResultEnumStatus = Schema.Schema.Type<
  typeof RecordingAddOnResultEnumStatusSchema
>

export const ApiV2010AccountRecordingRecordingAddOnResultSchema = Schema.Struct({
  sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^XR[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The unique string that that we created to identify the Recording AddOnResult resource.',
    }),
  ),
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording AddOnResult resource.',
    }),
  ),
  status: Schema.optionalKey(RecordingAddOnResultEnumStatusSchema),
  add_on_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^XB[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({ description: 'The SID of the Add-on to which the result belongs.' }),
  ),
  add_on_configuration_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^XE[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({ description: 'The SID of the Add-on configuration.' }),
  ),
  date_created: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  date_updated: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  date_completed: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the result was completed specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  reference_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^RE[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description: 'The SID of the recording to which the AddOnResult resource belongs.',
    }),
  ),
  subresource_uris: Schema.optionalKey(
    Schema.NullOr(Schema.Struct({})).annotate({
      description: 'A list of related resources identified by their relative URIs.',
    }),
  ),
})

export type ApiV2010AccountRecordingRecordingAddOnResult = Schema.Schema.Type<
  typeof ApiV2010AccountRecordingRecordingAddOnResultSchema
>

export const ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadSchema =
  Schema.Struct({
    sid: Schema.optionalKey(
      Schema.NullOr(
        Schema.String.check(
          Schema.isPattern(/^XH[0-9a-fA-F]{32}$/),
          Schema.makeFilter((input) => [...input].length === 34, {
            expected: 'a string of 34 characters',
          }),
        ),
      ).annotate({
        description:
          'The unique string that that we created to identify the Recording AddOnResult Payload resource.',
      }),
    ),
    add_on_result_sid: Schema.optionalKey(
      Schema.NullOr(
        Schema.String.check(
          Schema.isPattern(/^XR[0-9a-fA-F]{32}$/),
          Schema.makeFilter((input) => [...input].length === 34, {
            expected: 'a string of 34 characters',
          }),
        ),
      ).annotate({ description: 'The SID of the AddOnResult to which the payload belongs.' }),
    ),
    account_sid: Schema.optionalKey(
      Schema.NullOr(
        Schema.String.check(
          Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
          Schema.makeFilter((input) => [...input].length === 34, {
            expected: 'a string of 34 characters',
          }),
        ),
      ).annotate({
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording AddOnResult Payload resource.',
      }),
    ),
    label: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description: 'The string provided by the vendor that describes the payload.',
      }),
    ),
    add_on_sid: Schema.optionalKey(
      Schema.NullOr(
        Schema.String.check(
          Schema.isPattern(/^XB[0-9a-fA-F]{32}$/),
          Schema.makeFilter((input) => [...input].length === 34, {
            expected: 'a string of 34 characters',
          }),
        ),
      ).annotate({ description: 'The SID of the Add-on to which the result belongs.' }),
    ),
    add_on_configuration_sid: Schema.optionalKey(
      Schema.NullOr(
        Schema.String.check(
          Schema.isPattern(/^XE[0-9a-fA-F]{32}$/),
          Schema.makeFilter((input) => [...input].length === 34, {
            expected: 'a string of 34 characters',
          }),
        ),
      ).annotate({ description: 'The SID of the Add-on configuration.' }),
    ),
    content_type: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({ description: 'The MIME type of the payload.' }),
    ),
    date_created: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
    ),
    date_updated: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
    ),
    reference_sid: Schema.optionalKey(
      Schema.NullOr(
        Schema.String.check(
          Schema.isPattern(/^RE[0-9a-fA-F]{32}$/),
          Schema.makeFilter((input) => [...input].length === 34, {
            expected: 'a string of 34 characters',
          }),
        ),
      ).annotate({
        description:
          'The SID of the recording to which the AddOnResult resource that contains the payload belongs.',
      }),
    ),
    subresource_uris: Schema.optionalKey(
      Schema.NullOr(Schema.Struct({})).annotate({
        description: 'A list of related resources identified by their relative URIs.',
      }),
    ),
  })

export type ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayload =
  Schema.Schema.Type<
    typeof ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadSchema
  >

export const ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadRecordingAddOnResultPayloadDataSchema =
  Schema.Struct({
    redirect_to: Schema.optionalKey(
      Schema.NullOr(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ).annotate({
        description:
          'The URL to redirect to to get the data returned by the AddOn that was previously stored.',
      }),
    ),
  })

export type ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadRecordingAddOnResultPayloadData =
  Schema.Schema.Type<
    typeof ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadRecordingAddOnResultPayloadDataSchema
  >

export const RecordingTranscriptionEnumStatusSchema = Schema.Literals([
  'in-progress',
  'completed',
  'failed',
]).annotate({
  description: 'The status of the transcription. Can be: `in-progress`, `completed`, `failed`.',
})

export type RecordingTranscriptionEnumStatus = Schema.Schema.Type<
  typeof RecordingTranscriptionEnumStatusSchema
>

export const ApiV2010AccountRecordingRecordingTranscriptionSchema = Schema.Struct({
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Transcription resource.',
    }),
  ),
  api_version: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The API version used to create the transcription.',
    }),
  ),
  date_created: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  date_updated: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  duration: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The duration of the transcribed audio in seconds.',
    }),
  ),
  price: Schema.optionalKey(
    Schema.NullOr(Schema.Number).annotate({
      description:
        'The charge for the transcript in the currency associated with the account. This value is populated after the transcript is complete so it may not be available immediately.',
    }),
  ),
  price_unit: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format (e.g. `usd`, `eur`, `jpy`).',
    }),
  ),
  recording_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^RE[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Recording](https://www.twilio.com/docs/voice/api/recording) from which the transcription was created.',
    }),
  ),
  sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^TR[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description: 'The unique string that that we created to identify the Transcription resource.',
    }),
  ),
  status: Schema.optionalKey(RecordingTranscriptionEnumStatusSchema),
  transcription_text: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The text content of the transcription.',
    }),
  ),
  type: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({ description: 'The transcription type.' }),
  ),
  uri: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The URI of the resource, relative to `https://api.twilio.com`.',
    }),
  ),
})

export type ApiV2010AccountRecordingRecordingTranscription = Schema.Schema.Type<
  typeof ApiV2010AccountRecordingRecordingTranscriptionSchema
>

export const ApiV2010AccountShortCodeSchema = Schema.Struct({
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this ShortCode resource.',
    }),
  ),
  api_version: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The API version used to start a new TwiML session when an SMS message is sent to this short code.',
    }),
  ),
  date_created: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that this resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  date_updated: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  friendly_name: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'A string that you assigned to describe this resource. By default, the `FriendlyName` is the short code.',
    }),
  ),
  short_code: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({ description: 'The short code. e.g., 894546.' }),
  ),
  sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^SC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description: 'The unique string that that we created to identify this ShortCode resource.',
    }),
  ),
  sms_fallback_method: Schema.optionalKey(
    Schema.NullOr(Schema.Literals(['GET', 'POST'])).annotate({
      description:
        'The HTTP method we use to call the `sms_fallback_url`. Can be: `GET` or `POST`.',
    }),
  ),
  sms_fallback_url: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description:
        'The URL that we call if an error occurs while retrieving or executing the TwiML from `sms_url`.',
    }),
  ),
  sms_method: Schema.optionalKey(
    Schema.NullOr(Schema.Literals(['GET', 'POST'])).annotate({
      description: 'The HTTP method we use to call the `sms_url`. Can be: `GET` or `POST`.',
    }),
  ),
  sms_url: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description: 'The URL we call when receiving an incoming SMS message to this short code.',
    }),
  ),
  uri: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The URI of this resource, relative to `https://api.twilio.com`.',
    }),
  ),
})

export type ApiV2010AccountShortCode = Schema.Schema.Type<typeof ApiV2010AccountShortCodeSchema>

export const ApiV2010AccountSigningKeySchema = Schema.Struct({
  sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^SK[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ),
  ),
  friendly_name: Schema.optionalKey(Schema.NullOr(Schema.String)),
  date_created: Schema.optionalKey(Schema.NullOr(Schema.String)),
  date_updated: Schema.optionalKey(Schema.NullOr(Schema.String)),
})

export type ApiV2010AccountSigningKey = Schema.Schema.Type<typeof ApiV2010AccountSigningKeySchema>

export const ApiV2010AccountSipSchema = Schema.Struct({})

export type ApiV2010AccountSip = Schema.Schema.Type<typeof ApiV2010AccountSipSchema>

export const ApiV2010AccountSipSipDomainSipAuthSchema = Schema.Struct({})

export type ApiV2010AccountSipSipDomainSipAuth = Schema.Schema.Type<
  typeof ApiV2010AccountSipSipDomainSipAuthSchema
>

export const ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSchema = Schema.Struct({})

export type ApiV2010AccountSipSipDomainSipAuthSipAuthCalls = Schema.Schema.Type<
  typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSchema
>

export const ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema =
  Schema.Struct({
    account_sid: Schema.optionalKey(
      Schema.NullOr(
        Schema.String.check(
          Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
          Schema.makeFilter((input) => [...input].length === 34, {
            expected: 'a string of 34 characters',
          }),
        ),
      ).annotate({
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the CredentialListMapping resource.',
      }),
    ),
    date_created: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
    ),
    date_updated: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
    ),
    friendly_name: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description: 'The string that you assigned to describe the resource.',
      }),
    ),
    sid: Schema.optionalKey(
      Schema.NullOr(
        Schema.String.check(
          Schema.isPattern(/^CL[0-9a-fA-F]{32}$/),
          Schema.makeFilter((input) => [...input].length === 34, {
            expected: 'a string of 34 characters',
          }),
        ),
      ).annotate({
        description:
          'The unique string that that we created to identify the CredentialListMapping resource.',
      }),
    ),
  })

export type ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMapping =
  Schema.Schema.Type<
    typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema
  >

export const ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema =
  Schema.Struct({
    account_sid: Schema.optionalKey(
      Schema.NullOr(
        Schema.String.check(
          Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
          Schema.makeFilter((input) => [...input].length === 34, {
            expected: 'a string of 34 characters',
          }),
        ),
      ).annotate({
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the IpAccessControlListMapping resource.',
      }),
    ),
    date_created: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
    ),
    date_updated: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
    ),
    friendly_name: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description: 'The string that you assigned to describe the resource.',
      }),
    ),
    sid: Schema.optionalKey(
      Schema.NullOr(
        Schema.String.check(
          Schema.isPattern(/^AL[0-9a-fA-F]{32}$/),
          Schema.makeFilter((input) => [...input].length === 34, {
            expected: 'a string of 34 characters',
          }),
        ),
      ).annotate({
        description:
          'The unique string that that we created to identify the IpAccessControlListMapping resource.',
      }),
    ),
  })

export type ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMapping =
  Schema.Schema.Type<
    typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema
  >

export const ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSchema = Schema.Struct({})

export type ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrations = Schema.Schema.Type<
  typeof ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSchema
>

export const ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema =
  Schema.Struct({
    account_sid: Schema.optionalKey(
      Schema.NullOr(
        Schema.String.check(
          Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
          Schema.makeFilter((input) => [...input].length === 34, {
            expected: 'a string of 34 characters',
          }),
        ),
      ).annotate({
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the CredentialListMapping resource.',
      }),
    ),
    date_created: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
    ),
    date_updated: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description:
          'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      }),
    ),
    friendly_name: Schema.optionalKey(
      Schema.NullOr(Schema.String).annotate({
        description: 'The string that you assigned to describe the resource.',
      }),
    ),
    sid: Schema.optionalKey(
      Schema.NullOr(
        Schema.String.check(
          Schema.isPattern(/^CL[0-9a-fA-F]{32}$/),
          Schema.makeFilter((input) => [...input].length === 34, {
            expected: 'a string of 34 characters',
          }),
        ),
      ).annotate({
        description:
          'The unique string that that we created to identify the CredentialListMapping resource.',
      }),
    ),
  })

export type ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMapping =
  Schema.Schema.Type<
    typeof ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema
  >

export const ApiV2010AccountSipSipCredentialListSipCredentialSchema = Schema.Struct({
  sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^CR[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({ description: 'A 34 character string that uniquely identifies this resource.' }),
  ),
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description: 'The unique id of the Account that is responsible for this resource.',
    }),
  ),
  credential_list_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^CL[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The unique id that identifies the credential list that includes this credential.',
    }),
  ),
  username: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({ description: 'The username for this credential.' }),
  ),
  date_created: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date that this resource was created, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
    }),
  ),
  date_updated: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date that this resource was last updated, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
    }),
  ),
  uri: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The URI for this resource, relative to `https://api.twilio.com`',
    }),
  ),
})

export type ApiV2010AccountSipSipCredentialListSipCredential = Schema.Schema.Type<
  typeof ApiV2010AccountSipSipCredentialListSipCredentialSchema
>

export const ApiV2010AccountSipSipCredentialListSchema = Schema.Struct({
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The unique id of the [Account](https://www.twilio.com/docs/iam/api/account) that owns this resource.',
    }),
  ),
  date_created: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date that this resource was created, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
    }),
  ),
  date_updated: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date that this resource was last updated, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
    }),
  ),
  friendly_name: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'A human readable descriptive text that describes the CredentialList, up to 64 characters long.',
    }),
  ),
  sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^CL[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({ description: 'A 34 character string that uniquely identifies this resource.' }),
  ),
  subresource_uris: Schema.optionalKey(
    Schema.NullOr(Schema.Struct({})).annotate({
      description: 'A list of credentials associated with this credential list.',
    }),
  ),
  uri: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The URI for this resource, relative to `https://api.twilio.com`.',
    }),
  ),
})

export type ApiV2010AccountSipSipCredentialList = Schema.Schema.Type<
  typeof ApiV2010AccountSipSipCredentialListSchema
>

export const ApiV2010AccountSipSipDomainSipCredentialListMappingSchema = Schema.Struct({
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description: 'The unique id of the Account that is responsible for this resource.',
    }),
  ),
  date_created: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date that this resource was created, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
    }),
  ),
  date_updated: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date that this resource was last updated, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
    }),
  ),
  domain_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^SD[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description: 'The unique string that is created to identify the SipDomain resource.',
    }),
  ),
  friendly_name: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'A human readable descriptive text for this resource, up to 64 characters long.',
    }),
  ),
  sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^CL[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({ description: 'A 34 character string that uniquely identifies this resource.' }),
  ),
  uri: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The URI for this resource, relative to `https://api.twilio.com`',
    }),
  ),
})

export type ApiV2010AccountSipSipDomainSipCredentialListMapping = Schema.Schema.Type<
  typeof ApiV2010AccountSipSipDomainSipCredentialListMappingSchema
>

export const ApiV2010AccountSipSipDomainSchema = Schema.Struct({
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the SipDomain resource.',
    }),
  ),
  api_version: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The API version used to process the call.',
    }),
  ),
  auth_type: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The types of authentication you have mapped to your domain. Can be: `IP_ACL` and `CREDENTIAL_LIST`. If you have both defined for your domain, both will be returned in a comma delimited string. If `auth_type` is not defined, the domain will not be able to receive any traffic.',
    }),
  ),
  date_created: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  date_updated: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  domain_name: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The unique address you reserve on Twilio to which you route your SIP traffic. Domain names can contain letters, digits, and "-" and must end with `sip.twilio.com`.',
    }),
  ),
  friendly_name: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The string that you assigned to describe the resource.',
    }),
  ),
  sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^SD[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description: 'The unique string that that we created to identify the SipDomain resource.',
    }),
  ),
  uri: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The URI of the resource, relative to `https://api.twilio.com`.',
    }),
  ),
  voice_fallback_method: Schema.optionalKey(
    Schema.NullOr(Schema.Literals(['GET', 'POST'])).annotate({
      description: 'The HTTP method we use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
    }),
  ),
  voice_fallback_url: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description:
        'The URL that we call when an error occurs while retrieving or executing the TwiML requested from `voice_url`.',
    }),
  ),
  voice_method: Schema.optionalKey(
    Schema.NullOr(Schema.Literals(['GET', 'POST'])).annotate({
      description: 'The HTTP method we use to call `voice_url`. Can be: `GET` or `POST`.',
    }),
  ),
  voice_status_callback_method: Schema.optionalKey(
    Schema.NullOr(Schema.Literals(['GET', 'POST'])).annotate({
      description:
        'The HTTP method we use to call `voice_status_callback_url`. Either `GET` or `POST`.',
    }),
  ),
  voice_status_callback_url: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description:
        'The URL that we call to pass status parameters (such as call ended) to your application.',
    }),
  ),
  voice_url: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description: 'The URL we call using the `voice_method` when the domain receives a call.',
    }),
  ),
  subresource_uris: Schema.optionalKey(
    Schema.NullOr(Schema.Struct({})).annotate({
      description:
        'A list of mapping resources associated with the SIP Domain resource identified by their relative URIs.',
    }),
  ),
  sip_registration: Schema.optionalKey(
    Schema.NullOr(Schema.Boolean).annotate({
      description: 'Whether to allow SIP Endpoints to register with the domain to receive calls.',
    }),
  ),
  emergency_calling_enabled: Schema.optionalKey(
    Schema.NullOr(Schema.Boolean).annotate({
      description:
        'Whether emergency calling is enabled for the domain. If enabled, allows emergency calls on the domain from phone numbers with validated addresses.',
    }),
  ),
  secure: Schema.optionalKey(
    Schema.NullOr(Schema.Boolean).annotate({
      description:
        'Whether secure SIP is enabled for the domain. If enabled, TLS will be enforced and SRTP will be negotiated on all incoming calls to this sip domain.',
    }),
  ),
  byoc_trunk_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^BY[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the BYOC Trunk(Bring Your Own Carrier) resource that the Sip Domain will be associated with.',
    }),
  ),
  emergency_caller_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^PN[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'Whether an emergency caller sid is configured for the domain. If present, this phone number will be used as the callback for the emergency call.',
    }),
  ),
})

export type ApiV2010AccountSipSipDomain = Schema.Schema.Type<
  typeof ApiV2010AccountSipSipDomainSchema
>

export const ApiV2010AccountSipSipIpAccessControlListSchema = Schema.Struct({
  sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AL[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({ description: 'A 34 character string that uniquely identifies this resource.' }),
  ),
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The unique id of the [Account](https://www.twilio.com/docs/iam/api/account) that owns this resource.',
    }),
  ),
  friendly_name: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'A human readable descriptive text, up to 255 characters long.',
    }),
  ),
  date_created: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date that this resource was created, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
    }),
  ),
  date_updated: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date that this resource was last updated, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
    }),
  ),
  subresource_uris: Schema.optionalKey(
    Schema.NullOr(Schema.Struct({})).annotate({
      description:
        'A list of the IpAddress resources associated with this IP access control list resource.',
    }),
  ),
  uri: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The URI for this resource, relative to `https://api.twilio.com`',
    }),
  ),
})

export type ApiV2010AccountSipSipIpAccessControlList = Schema.Schema.Type<
  typeof ApiV2010AccountSipSipIpAccessControlListSchema
>

export const ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema = Schema.Struct({
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description: 'The unique id of the Account that is responsible for this resource.',
    }),
  ),
  date_created: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date that this resource was created, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
    }),
  ),
  date_updated: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date that this resource was last updated, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
    }),
  ),
  domain_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^SD[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description: 'The unique string that is created to identify the SipDomain resource.',
    }),
  ),
  friendly_name: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'A human readable descriptive text for this resource, up to 64 characters long.',
    }),
  ),
  sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AL[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({ description: 'A 34 character string that uniquely identifies this resource.' }),
  ),
  uri: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The URI for this resource, relative to `https://api.twilio.com`',
    }),
  ),
})

export type ApiV2010AccountSipSipDomainSipIpAccessControlListMapping = Schema.Schema.Type<
  typeof ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema
>

export const ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema = Schema.Struct({
  sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^IP[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({ description: 'A 34 character string that uniquely identifies this resource.' }),
  ),
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description: 'The unique id of the Account that is responsible for this resource.',
    }),
  ),
  friendly_name: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'A human readable descriptive text for this resource, up to 255 characters long.',
    }),
  ),
  ip_address: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'An IP address in dotted decimal notation from which you want to accept traffic. Any SIP requests from this IP address will be allowed by Twilio. IPv4 only supported today.',
    }),
  ),
  cidr_prefix_length: Schema.Number.check(Schema.isInt())
    .pipe(Schema.withDecodingDefault(Effect.succeed(0)))
    .annotate({
      description:
        'An integer representing the length of the CIDR prefix to use with this IP address when accepting traffic. By default the entire IP address is used.',
    }),
  ip_access_control_list_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AL[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description: 'The unique id of the IpAccessControlList resource that includes this resource.',
    }),
  ),
  date_created: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date that this resource was created, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
    }),
  ),
  date_updated: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date that this resource was last updated, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
    }),
  ),
  uri: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The URI for this resource, relative to `https://api.twilio.com`',
    }),
  ),
})

export type ApiV2010AccountSipSipIpAccessControlListSipIpAddress = Schema.Schema.Type<
  typeof ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema
>

export const SiprecEnumStatusSchema = Schema.Literals(['in-progress', 'stopped']).annotate({
  description: 'The status - one of `stopped`, `in-progress`',
})

export type SiprecEnumStatus = Schema.Schema.Type<typeof SiprecEnumStatusSchema>

export const ApiV2010AccountCallSiprecSchema = Schema.Struct({
  sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^SR[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({ description: 'The SID of the Siprec resource.' }),
  ),
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Siprec resource.',
    }),
  ),
  call_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^CA[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Siprec resource is associated with.',
    }),
  ),
  name: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The user-specified name of this Siprec, if one was given when the Siprec was created. This may be used to stop the Siprec.',
    }),
  ),
  status: Schema.optionalKey(SiprecEnumStatusSchema),
  date_updated: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  uri: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The URI of the resource, relative to `https://api.twilio.com`.',
    }),
  ),
})

export type ApiV2010AccountCallSiprec = Schema.Schema.Type<typeof ApiV2010AccountCallSiprecSchema>

export const SiprecEnumTrackSchema = Schema.Literals([
  'inbound_track',
  'outbound_track',
  'both_tracks',
]).annotate({ description: 'One of `inbound_track`, `outbound_track`, `both_tracks`.' })

export type SiprecEnumTrack = Schema.Schema.Type<typeof SiprecEnumTrackSchema>

export const SiprecEnumUpdateStatusSchema = Schema.Literal('stopped')

export type SiprecEnumUpdateStatus = Schema.Schema.Type<typeof SiprecEnumUpdateStatusSchema>

export const SmsFeedbackEnumOutcomeSchema = Schema.Literals([
  'confirmed',
  'unconfirmed',
  'received',
  'not-received',
  'delayed',
])

export type SmsFeedbackEnumOutcome = Schema.Schema.Type<typeof SmsFeedbackEnumOutcomeSchema>

export const SmsMessageEnumStatusSchema = Schema.Literals([
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
])

export type SmsMessageEnumStatus = Schema.Schema.Type<typeof SmsMessageEnumStatusSchema>

export const SmsMessageEnumUpdateStatusSchema = Schema.Literal('canceled')

export type SmsMessageEnumUpdateStatus = Schema.Schema.Type<typeof SmsMessageEnumUpdateStatusSchema>

export const SmsMessageEnumDirectionSchema = Schema.Literals([
  'inbound',
  'outbound-api',
  'outbound-call',
  'outbound-reply',
])

export type SmsMessageEnumDirection = Schema.Schema.Type<typeof SmsMessageEnumDirectionSchema>

export const StreamEnumStatusSchema = Schema.Literals(['in-progress', 'stopped']).annotate({
  description: 'The status of the Stream. Possible values are `stopped` and `in-progress`.',
})

export type StreamEnumStatus = Schema.Schema.Type<typeof StreamEnumStatusSchema>

export const ApiV2010AccountCallStreamSchema = Schema.Struct({
  sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^MZ[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({ description: 'The SID of the Stream resource.' }),
  ),
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Stream resource.',
    }),
  ),
  call_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^CA[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Stream resource is associated with.',
    }),
  ),
  name: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The user-specified name of this Stream, if one was given when the Stream was created. This can be used to stop the Stream.',
    }),
  ),
  status: Schema.optionalKey(StreamEnumStatusSchema),
  date_updated: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  uri: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The URI of the resource, relative to `https://api.twilio.com`.',
    }),
  ),
})

export type ApiV2010AccountCallStream = Schema.Schema.Type<typeof ApiV2010AccountCallStreamSchema>

export const StreamEnumTrackSchema = Schema.Literals([
  'inbound_track',
  'outbound_track',
  'both_tracks',
]).annotate({
  description:
    'The tracks to be included in the Stream. Possible values are `inbound_track`, `outbound_track`, `both_tracks`. Default value is `inbound_track`.',
})

export type StreamEnumTrack = Schema.Schema.Type<typeof StreamEnumTrackSchema>

export const StreamEnumUpdateStatusSchema = Schema.Literal('stopped')

export type StreamEnumUpdateStatus = Schema.Schema.Type<typeof StreamEnumUpdateStatusSchema>

export const ApiV2010AccountTokenSchema = Schema.Struct({
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Token resource.',
    }),
  ),
  date_created: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  date_updated: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  ice_servers: Schema.optionalKey(
    Schema.NullOr(
      Schema.Array(
        Schema.Struct({
          credential: Schema.optionalKey(Schema.String),
          username: Schema.optionalKey(Schema.String),
          url: Schema.optionalKey(Schema.String),
          urls: Schema.optionalKey(Schema.String),
        }),
      ),
    ).annotate({
      description:
        'An array representing the ephemeral credentials and the STUN and TURN server URIs.',
    }),
  ),
  password: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The temporary password that the username will use when authenticating with Twilio.',
    }),
  ),
  ttl: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The duration in seconds for which the username and password are valid.',
    }),
  ),
  username: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The temporary username that uniquely identifies a Token.',
    }),
  ),
})

export type ApiV2010AccountToken = Schema.Schema.Type<typeof ApiV2010AccountTokenSchema>

export const TranscriptionEnumStatusSchema = Schema.Literals([
  'in-progress',
  'completed',
  'failed',
]).annotate({
  description: 'The status of the transcription. Can be: `in-progress`, `completed`, `failed`.',
})

export type TranscriptionEnumStatus = Schema.Schema.Type<typeof TranscriptionEnumStatusSchema>

export const ApiV2010AccountTranscriptionSchema = Schema.Struct({
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Transcription resource.',
    }),
  ),
  api_version: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The API version used to create the transcription.',
    }),
  ),
  date_created: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  date_updated: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  duration: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The duration of the transcribed audio in seconds.',
    }),
  ),
  price: Schema.optionalKey(
    Schema.NullOr(Schema.Number).annotate({
      description:
        'The charge for the transcript in the currency associated with the account. This value is populated after the transcript is complete so it may not be available immediately.',
    }),
  ),
  price_unit: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format (e.g. `usd`, `eur`, `jpy`).',
    }),
  ),
  recording_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^RE[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Recording](https://www.twilio.com/docs/voice/api/recording) from which the transcription was created.',
    }),
  ),
  sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^TR[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description: 'The unique string that that we created to identify the Transcription resource.',
    }),
  ),
  status: Schema.optionalKey(TranscriptionEnumStatusSchema),
  transcription_text: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The text content of the transcription.',
    }),
  ),
  type: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The transcription type. Can only be: `fast`.',
    }),
  ),
  uri: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The URI of the resource, relative to `https://api.twilio.com`.',
    }),
  ),
})

export type ApiV2010AccountTranscription = Schema.Schema.Type<
  typeof ApiV2010AccountTranscriptionSchema
>

export const ApiV2010AccountUsageSchema = Schema.Struct({})

export type ApiV2010AccountUsage = Schema.Schema.Type<typeof ApiV2010AccountUsageSchema>

export const ApiV2010AccountUsageUsageRecordSchema = Schema.Struct({
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
    }),
  ),
  api_version: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The API version used to create the resource.',
    }),
  ),
  as_of: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
    }),
  ),
  category: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
    }),
  ),
  count: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The number of usage events, such as the number of calls.',
    }),
  ),
  count_unit: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
    }),
  ),
  description: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'A plain-language description of the usage category.',
    }),
  ),
  end_date: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
      ),
    ).annotate({
      description:
        'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    }),
  ),
  price: Schema.optionalKey(
    Schema.NullOr(Schema.Number).annotate({
      description:
        'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
    }),
  ),
  price_unit: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
    }),
  ),
  start_date: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
      ),
    ).annotate({
      description:
        'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    }),
  ),
  subresource_uris: Schema.optionalKey(
    Schema.NullOr(Schema.Struct({})).annotate({
      description:
        'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
    }),
  ),
  uri: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The URI of the resource, relative to `https://api.twilio.com`.',
    }),
  ),
  usage: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The amount used to bill usage and measured in units described in `usage_unit`.',
    }),
  ),
  usage_unit: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
    }),
  ),
})

export type ApiV2010AccountUsageUsageRecord = Schema.Schema.Type<
  typeof ApiV2010AccountUsageUsageRecordSchema
>

export const ApiV2010AccountUsageUsageRecordUsageRecordAllTimeSchema = Schema.Struct({
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
    }),
  ),
  api_version: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The API version used to create the resource.',
    }),
  ),
  as_of: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
    }),
  ),
  category: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
    }),
  ),
  count: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The number of usage events, such as the number of calls.',
    }),
  ),
  count_unit: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
    }),
  ),
  description: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'A plain-language description of the usage category.',
    }),
  ),
  end_date: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
      ),
    ).annotate({
      description:
        'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    }),
  ),
  price: Schema.optionalKey(
    Schema.NullOr(Schema.Number).annotate({
      description:
        'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
    }),
  ),
  price_unit: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
    }),
  ),
  start_date: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
      ),
    ).annotate({
      description:
        'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    }),
  ),
  subresource_uris: Schema.optionalKey(
    Schema.NullOr(Schema.Struct({})).annotate({
      description:
        'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
    }),
  ),
  uri: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The URI of the resource, relative to `https://api.twilio.com`.',
    }),
  ),
  usage: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The amount used to bill usage and measured in units described in `usage_unit`.',
    }),
  ),
  usage_unit: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
    }),
  ),
})

export type ApiV2010AccountUsageUsageRecordUsageRecordAllTime = Schema.Schema.Type<
  typeof ApiV2010AccountUsageUsageRecordUsageRecordAllTimeSchema
>

export const ApiV2010AccountUsageUsageRecordUsageRecordDailySchema = Schema.Struct({
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
    }),
  ),
  api_version: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The API version used to create the resource.',
    }),
  ),
  as_of: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
    }),
  ),
  category: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
    }),
  ),
  count: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The number of usage events, such as the number of calls.',
    }),
  ),
  count_unit: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
    }),
  ),
  description: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'A plain-language description of the usage category.',
    }),
  ),
  end_date: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
      ),
    ).annotate({
      description:
        'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    }),
  ),
  price: Schema.optionalKey(
    Schema.NullOr(Schema.Number).annotate({
      description:
        'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
    }),
  ),
  price_unit: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
    }),
  ),
  start_date: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
      ),
    ).annotate({
      description:
        'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    }),
  ),
  subresource_uris: Schema.optionalKey(
    Schema.NullOr(Schema.Struct({})).annotate({
      description:
        'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
    }),
  ),
  uri: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The URI of the resource, relative to `https://api.twilio.com`.',
    }),
  ),
  usage: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The amount used to bill usage and measured in units described in `usage_unit`.',
    }),
  ),
  usage_unit: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
    }),
  ),
})

export type ApiV2010AccountUsageUsageRecordUsageRecordDaily = Schema.Schema.Type<
  typeof ApiV2010AccountUsageUsageRecordUsageRecordDailySchema
>

export const ApiV2010AccountUsageUsageRecordUsageRecordLastMonthSchema = Schema.Struct({
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
    }),
  ),
  api_version: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The API version used to create the resource.',
    }),
  ),
  as_of: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
    }),
  ),
  category: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
    }),
  ),
  count: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The number of usage events, such as the number of calls.',
    }),
  ),
  count_unit: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
    }),
  ),
  description: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'A plain-language description of the usage category.',
    }),
  ),
  end_date: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
      ),
    ).annotate({
      description:
        'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    }),
  ),
  price: Schema.optionalKey(
    Schema.NullOr(Schema.Number).annotate({
      description:
        'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
    }),
  ),
  price_unit: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
    }),
  ),
  start_date: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
      ),
    ).annotate({
      description:
        'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    }),
  ),
  subresource_uris: Schema.optionalKey(
    Schema.NullOr(Schema.Struct({})).annotate({
      description:
        'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
    }),
  ),
  uri: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The URI of the resource, relative to `https://api.twilio.com`.',
    }),
  ),
  usage: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The amount used to bill usage and measured in units described in `usage_unit`.',
    }),
  ),
  usage_unit: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
    }),
  ),
})

export type ApiV2010AccountUsageUsageRecordUsageRecordLastMonth = Schema.Schema.Type<
  typeof ApiV2010AccountUsageUsageRecordUsageRecordLastMonthSchema
>

export const ApiV2010AccountUsageUsageRecordUsageRecordMonthlySchema = Schema.Struct({
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
    }),
  ),
  api_version: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The API version used to create the resource.',
    }),
  ),
  as_of: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
    }),
  ),
  category: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
    }),
  ),
  count: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The number of usage events, such as the number of calls.',
    }),
  ),
  count_unit: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
    }),
  ),
  description: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'A plain-language description of the usage category.',
    }),
  ),
  end_date: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
      ),
    ).annotate({
      description:
        'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    }),
  ),
  price: Schema.optionalKey(
    Schema.NullOr(Schema.Number).annotate({
      description:
        'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
    }),
  ),
  price_unit: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
    }),
  ),
  start_date: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
      ),
    ).annotate({
      description:
        'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    }),
  ),
  subresource_uris: Schema.optionalKey(
    Schema.NullOr(Schema.Struct({})).annotate({
      description:
        'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
    }),
  ),
  uri: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The URI of the resource, relative to `https://api.twilio.com`.',
    }),
  ),
  usage: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The amount used to bill usage and measured in units described in `usage_unit`.',
    }),
  ),
  usage_unit: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
    }),
  ),
})

export type ApiV2010AccountUsageUsageRecordUsageRecordMonthly = Schema.Schema.Type<
  typeof ApiV2010AccountUsageUsageRecordUsageRecordMonthlySchema
>

export const ApiV2010AccountUsageUsageRecordUsageRecordThisMonthSchema = Schema.Struct({
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
    }),
  ),
  api_version: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The API version used to create the resource.',
    }),
  ),
  as_of: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
    }),
  ),
  category: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
    }),
  ),
  count: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The number of usage events, such as the number of calls.',
    }),
  ),
  count_unit: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
    }),
  ),
  description: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'A plain-language description of the usage category.',
    }),
  ),
  end_date: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
      ),
    ).annotate({
      description:
        'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    }),
  ),
  price: Schema.optionalKey(
    Schema.NullOr(Schema.Number).annotate({
      description:
        'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
    }),
  ),
  price_unit: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
    }),
  ),
  start_date: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
      ),
    ).annotate({
      description:
        'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    }),
  ),
  subresource_uris: Schema.optionalKey(
    Schema.NullOr(Schema.Struct({})).annotate({
      description:
        'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
    }),
  ),
  uri: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The URI of the resource, relative to `https://api.twilio.com`.',
    }),
  ),
  usage: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The amount used to bill usage and measured in units described in `usage_unit`.',
    }),
  ),
  usage_unit: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
    }),
  ),
})

export type ApiV2010AccountUsageUsageRecordUsageRecordThisMonth = Schema.Schema.Type<
  typeof ApiV2010AccountUsageUsageRecordUsageRecordThisMonthSchema
>

export const ApiV2010AccountUsageUsageRecordUsageRecordTodaySchema = Schema.Struct({
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
    }),
  ),
  api_version: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The API version used to create the resource.',
    }),
  ),
  as_of: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
    }),
  ),
  category: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
    }),
  ),
  count: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The number of usage events, such as the number of calls.',
    }),
  ),
  count_unit: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
    }),
  ),
  description: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'A plain-language description of the usage category.',
    }),
  ),
  end_date: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
      ),
    ).annotate({
      description:
        'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    }),
  ),
  price: Schema.optionalKey(
    Schema.NullOr(Schema.Number).annotate({
      description:
        'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
    }),
  ),
  price_unit: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
    }),
  ),
  start_date: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
      ),
    ).annotate({
      description:
        'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    }),
  ),
  subresource_uris: Schema.optionalKey(
    Schema.NullOr(Schema.Struct({})).annotate({
      description:
        'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
    }),
  ),
  uri: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The URI of the resource, relative to `https://api.twilio.com`.',
    }),
  ),
  usage: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The amount used to bill usage and measured in units described in `usage_unit`.',
    }),
  ),
  usage_unit: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
    }),
  ),
})

export type ApiV2010AccountUsageUsageRecordUsageRecordToday = Schema.Schema.Type<
  typeof ApiV2010AccountUsageUsageRecordUsageRecordTodaySchema
>

export const ApiV2010AccountUsageUsageRecordUsageRecordYearlySchema = Schema.Struct({
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
    }),
  ),
  api_version: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The API version used to create the resource.',
    }),
  ),
  as_of: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
    }),
  ),
  category: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
    }),
  ),
  count: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The number of usage events, such as the number of calls.',
    }),
  ),
  count_unit: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
    }),
  ),
  description: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'A plain-language description of the usage category.',
    }),
  ),
  end_date: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
      ),
    ).annotate({
      description:
        'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    }),
  ),
  price: Schema.optionalKey(
    Schema.NullOr(Schema.Number).annotate({
      description:
        'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
    }),
  ),
  price_unit: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
    }),
  ),
  start_date: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
      ),
    ).annotate({
      description:
        'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    }),
  ),
  subresource_uris: Schema.optionalKey(
    Schema.NullOr(Schema.Struct({})).annotate({
      description:
        'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
    }),
  ),
  uri: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The URI of the resource, relative to `https://api.twilio.com`.',
    }),
  ),
  usage: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The amount used to bill usage and measured in units described in `usage_unit`.',
    }),
  ),
  usage_unit: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
    }),
  ),
})

export type ApiV2010AccountUsageUsageRecordUsageRecordYearly = Schema.Schema.Type<
  typeof ApiV2010AccountUsageUsageRecordUsageRecordYearlySchema
>

export const ApiV2010AccountUsageUsageRecordUsageRecordYesterdaySchema = Schema.Struct({
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
    }),
  ),
  api_version: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The API version used to create the resource.',
    }),
  ),
  as_of: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
    }),
  ),
  category: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
    }),
  ),
  count: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The number of usage events, such as the number of calls.',
    }),
  ),
  count_unit: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
    }),
  ),
  description: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'A plain-language description of the usage category.',
    }),
  ),
  end_date: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
      ),
    ).annotate({
      description:
        'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    }),
  ),
  price: Schema.optionalKey(
    Schema.NullOr(Schema.Number).annotate({
      description:
        'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
    }),
  ),
  price_unit: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
    }),
  ),
  start_date: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
      ),
    ).annotate({
      description:
        'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    }),
  ),
  subresource_uris: Schema.optionalKey(
    Schema.NullOr(Schema.Struct({})).annotate({
      description:
        'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
    }),
  ),
  uri: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The URI of the resource, relative to `https://api.twilio.com`.',
    }),
  ),
  usage: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The amount used to bill usage and measured in units described in `usage_unit`.',
    }),
  ),
  usage_unit: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
    }),
  ),
})

export type ApiV2010AccountUsageUsageRecordUsageRecordYesterday = Schema.Schema.Type<
  typeof ApiV2010AccountUsageUsageRecordUsageRecordYesterdaySchema
>

export const UsageTriggerEnumRecurringSchema = Schema.Literals([
  'daily',
  'monthly',
  'yearly',
  'alltime',
]).annotate({
  description:
    'The frequency of a recurring UsageTrigger.  Can be: `daily`, `monthly`, or `yearly` for recurring triggers or empty for non-recurring triggers. A trigger will only fire once during each period. Recurring times are in GMT.',
})

export type UsageTriggerEnumRecurring = Schema.Schema.Type<typeof UsageTriggerEnumRecurringSchema>

export const UsageTriggerEnumTriggerFieldSchema = Schema.Literals([
  'count',
  'usage',
  'price',
]).annotate({
  description:
    'The field in the [UsageRecord](https://www.twilio.com/docs/usage/api/usage-record) resource that fires the trigger.  Can be: `count`, `usage`, or `price`, as described in the [UsageRecords documentation](https://www.twilio.com/docs/usage/api/usage-record#usage-count-price).',
})

export type UsageTriggerEnumTriggerField = Schema.Schema.Type<
  typeof UsageTriggerEnumTriggerFieldSchema
>

export const ApiV2010AccountUsageUsageTriggerSchema = Schema.Struct({
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that the trigger monitors.',
    }),
  ),
  api_version: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The API version used to create the resource.',
    }),
  ),
  callback_method: Schema.optionalKey(
    Schema.NullOr(Schema.Literals(['GET', 'POST'])).annotate({
      description: 'The HTTP method we use to call `callback_url`. Can be: `GET` or `POST`.',
    }),
  ),
  callback_url: Schema.optionalKey(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))).annotate({
      description: 'The URL we call using the `callback_method` when the trigger fires.',
    }),
  ),
  current_value: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The current value of the field the trigger is watching.',
    }),
  ),
  date_created: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  date_fired: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the trigger was last fired specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  date_updated: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    }),
  ),
  friendly_name: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The string that you assigned to describe the trigger.',
    }),
  ),
  recurring: Schema.optionalKey(UsageTriggerEnumRecurringSchema),
  sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^UT[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description: 'The unique string that that we created to identify the UsageTrigger resource.',
    }),
  ),
  trigger_by: Schema.optionalKey(UsageTriggerEnumTriggerFieldSchema),
  trigger_value: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The value at which the trigger will fire.  Must be a positive, numeric value.',
    }),
  ),
  uri: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The URI of the resource, relative to `https://api.twilio.com`.',
    }),
  ),
  usage_category: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The usage category the trigger watches. Must be one of the supported [usage categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
    }),
  ),
  usage_record_uri: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The URI of the [UsageRecord](https://www.twilio.com/docs/usage/api/usage-record) resource this trigger watches, relative to `https://api.twilio.com`.',
    }),
  ),
})

export type ApiV2010AccountUsageUsageTrigger = Schema.Schema.Type<
  typeof ApiV2010AccountUsageUsageTriggerSchema
>

export const ApiV2010AccountCallUserDefinedMessageSchema = Schema.Struct({
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created User Defined Message.',
    }),
  ),
  call_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^CA[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the User Defined Message is associated with.',
    }),
  ),
  sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^KX[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({ description: 'The SID that uniquely identifies this User Defined Message.' }),
  ),
  date_created: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The date that this User Defined Message was created, given in RFC 2822 format.',
    }),
  ),
})

export type ApiV2010AccountCallUserDefinedMessage = Schema.Schema.Type<
  typeof ApiV2010AccountCallUserDefinedMessageSchema
>

export const ApiV2010AccountCallUserDefinedMessageSubscriptionSchema = Schema.Struct({
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that subscribed to the User Defined Messages.',
    }),
  ),
  call_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^CA[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the User Defined Message Subscription is associated with. This refers to the Call SID that is producing the User Defined Messages.',
    }),
  ),
  sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^ZY[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description: 'The SID that uniquely identifies this User Defined Message Subscription.',
    }),
  ),
  date_created: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The date that this User Defined Message Subscription was created, given in RFC 2822 format.',
    }),
  ),
  uri: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The URI of the User Defined Message Subscription Resource, relative to `https://api.twilio.com`.',
    }),
  ),
})

export type ApiV2010AccountCallUserDefinedMessageSubscription = Schema.Schema.Type<
  typeof ApiV2010AccountCallUserDefinedMessageSubscriptionSchema
>

export const ApiV2010AccountValidationRequestSchema = Schema.Struct({
  account_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) responsible for the Caller ID.',
    }),
  ),
  call_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^CA[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Caller ID is associated with.',
    }),
  ),
  friendly_name: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The string that you assigned to describe the resource.',
    }),
  ),
  phone_number: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The phone number to verify in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
    }),
  ),
  validation_code: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The 6 digit validation code that someone must enter to validate the Caller ID  when `phone_number` is called.',
    }),
  ),
})

export type ApiV2010AccountValidationRequest = Schema.Schema.Type<
  typeof ApiV2010AccountValidationRequestSchema
>

export const ApiV2010AccountOutgoingCallerIdSmsVerificationSchema = Schema.Struct({
  phone_number: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The phone number being verified in [E.164](https://www.twilio.com/docs/glossary/what-e164) format.',
    }),
  ),
  verification_sid: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The SID that uniquely identifies the verification.',
    }),
  ),
  send_code_attempts: Schema.optionalKey(
    Schema.NullOr(
      Schema.Array(
        Schema.Struct({
          attempt_sid: Schema.optionalKey(
            Schema.String.annotate({ description: 'The SID of the verification attempt.' }),
          ),
          time: Schema.optionalKey(
            Schema.String.annotate({
              description: 'The date and time of the attempt in ISO 8601 format.',
            }),
          ),
        }),
      ),
    ).annotate({
      description:
        'An array of verification attempt objects containing the channel attempted and the channel-specific transaction SID.',
    }),
  ),
})

export type ApiV2010AccountOutgoingCallerIdSmsVerification = Schema.Schema.Type<
  typeof ApiV2010AccountOutgoingCallerIdSmsVerificationSchema
>

export const ApiV2010AccountOutgoingCallerIdVerificationCheckSchema = Schema.Struct({
  phone_number: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description:
        'The phone number being verified in [E.164](https://www.twilio.com/docs/glossary/what-e164) format.',
    }),
  ),
  verification_sid: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The SID that uniquely identifies the verification.',
    }),
  ),
  status: Schema.optionalKey(
    Schema.NullOr(Schema.String).annotate({
      description: 'The status of the verification. Can be: `pending`, `approved`, or `failed`.',
    }),
  ),
  caller_id_sid: Schema.optionalKey(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^PN[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    ).annotate({
      description:
        'The SID of the OutgoingCallerId resource created when verification is approved.',
    }),
  ),
})

export type ApiV2010AccountOutgoingCallerIdVerificationCheck = Schema.Schema.Type<
  typeof ApiV2010AccountOutgoingCallerIdVerificationCheckSchema
>

export const AccountSidAuthTokenSecurityScheme = { scheme: 'basic', type: 'http' }

export const get20100401AccountsJsonHandler = defineHandler({
  query: Schema.toStandardSchemaV1(
    Schema.Struct({
      FriendlyName: Schema.optionalKey(Schema.String),
      Status: Schema.optionalKey(AccountEnumStatusSchema),
      PageSize: Schema.optionalKey(
        Schema.BigIntFromString.check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
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
  response: Schema.toStandardSchemaV1(
    Schema.Struct({
      end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      first_page_uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      next_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      previous_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      accounts: Schema.optionalKey(Schema.Array(ApiV2010AccountSchema)),
    }),
  ),
})

export const post20100401AccountsJsonHandler = defineHandler({
  form: Schema.toStandardSchemaV1(
    Schema.Struct({
      FriendlyName: Schema.optionalKey(
        Schema.String.annotate({
          description:
            'A human readable description of the account to create, defaults to `SubAccount Created at {YYYY-MM-DD HH:MM meridian}`',
        }),
      ),
    }),
  ),
  response: Schema.toStandardSchemaV1(ApiV2010AccountSchema),
})

export const get20100401AccountsSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      Sid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  response: Schema.toStandardSchemaV1(ApiV2010AccountSchema),
})

export const post20100401AccountsSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      Sid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  form: Schema.toStandardSchemaV1(
    Schema.Struct({
      FriendlyName: Schema.optionalKey(
        Schema.String.annotate({
          description: 'Update the human-readable description of this Account',
        }),
      ),
      Status: Schema.optionalKey(AccountEnumStatusSchema),
    }),
  ),
  response: Schema.toStandardSchemaV1(ApiV2010AccountSchema),
})

export const get20100401AccountsAccountSidAddressesJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      AccountSid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  query: Schema.toStandardSchemaV1(
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
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
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
  response: Schema.toStandardSchemaV1(
    Schema.Struct({
      end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      first_page_uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      next_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      previous_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      addresses: Schema.optionalKey(Schema.Array(ApiV2010AccountAddressSchema)),
    }),
  ),
})

export const post20100401AccountsAccountSidAddressesJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      AccountSid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  form: Schema.toStandardSchemaV1(
    Schema.Struct({
      CustomerName: Schema.String.annotate({
        description: 'The name to associate with the new address.',
      }),
      Street: Schema.String.annotate({
        description: 'The number and street address of the new address.',
      }),
      City: Schema.String.annotate({ description: 'The city of the new address.' }),
      Region: Schema.String.annotate({ description: 'The state or region of the new address.' }),
      PostalCode: Schema.String.annotate({ description: 'The postal code of the new address.' }),
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountAddressSchema),
})

export const get20100401AccountsAccountSidAddressesSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountAddressSchema),
})

export const post20100401AccountsAccountSidAddressesSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  form: Schema.toStandardSchemaV1(
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
        Schema.String.annotate({ description: 'The number and street address of the address.' }),
      ),
      City: Schema.optionalKey(Schema.String.annotate({ description: 'The city of the address.' })),
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountAddressSchema),
})

export const delete20100401AccountsAccountSidAddressesSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
})

export const get20100401AccountsAccountSidApplicationsJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      AccountSid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  query: Schema.toStandardSchemaV1(
    Schema.Struct({
      FriendlyName: Schema.optionalKey(Schema.String),
      PageSize: Schema.optionalKey(
        Schema.BigIntFromString.check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
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
  response: Schema.toStandardSchemaV1(
    Schema.Struct({
      end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      first_page_uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      next_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      previous_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      applications: Schema.optionalKey(Schema.Array(ApiV2010AccountApplicationSchema)),
    }),
  ),
})

export const post20100401AccountsAccountSidApplicationsJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      AccountSid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  form: Schema.toStandardSchemaV1(
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
          description: 'The HTTP method we should use to call `sms_url`. Can be: `GET` or `POST`.',
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountApplicationSchema),
})

export const get20100401AccountsAccountSidApplicationsSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountApplicationSchema),
})

export const post20100401AccountsAccountSidApplicationsSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  form: Schema.toStandardSchemaV1(
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
          description: 'The HTTP method we should use to call `sms_url`. Can be: `GET` or `POST`.',
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountApplicationSchema),
})

export const delete20100401AccountsAccountSidApplicationsSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
})

export const get20100401AccountsAccountSidAuthorizedConnectAppsConnectAppSidJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    response: Schema.toStandardSchemaV1(ApiV2010AccountAuthorizedConnectAppSchema),
  })

export const get20100401AccountsAccountSidAuthorizedConnectAppsJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      AccountSid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  query: Schema.toStandardSchemaV1(
    Schema.Struct({
      PageSize: Schema.optionalKey(
        Schema.BigIntFromString.check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
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
  response: Schema.toStandardSchemaV1(
    Schema.Struct({
      end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      first_page_uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      next_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      previous_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      authorized_connect_apps: Schema.optionalKey(
        Schema.Array(ApiV2010AccountAuthorizedConnectAppSchema),
      ),
    }),
  ),
})

export const get20100401AccountsAccountSidAvailablePhoneNumbersJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      AccountSid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  query: Schema.toStandardSchemaV1(
    Schema.Struct({
      PageSize: Schema.optionalKey(
        Schema.BigIntFromString.check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
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
  response: Schema.toStandardSchemaV1(
    Schema.Struct({
      countries: Schema.optionalKey(Schema.Array(ApiV2010AccountAvailablePhoneNumberCountrySchema)),
      uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
    }),
  ),
})

export const get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    response: Schema.toStandardSchemaV1(ApiV2010AccountAvailablePhoneNumberCountrySchema),
  })

export const get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeLocalJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    query: Schema.toStandardSchemaV1(
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
    response: Schema.toStandardSchemaV1(
      Schema.Struct({
        end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        first_page_uri: Schema.optionalKey(
          Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
        ),
        next_page_uri: Schema.optionalKey(
          Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
        ),
        page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        previous_page_uri: Schema.optionalKey(
          Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
        ),
        start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        uri: Schema.optionalKey(
          Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
        ),
        available_phone_numbers: Schema.optionalKey(
          Schema.Array(ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberLocalSchema),
        ),
      }),
    ),
  })

export const get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMachineToMachineJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    query: Schema.toStandardSchemaV1(
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
    response: Schema.toStandardSchemaV1(
      Schema.Struct({
        end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        first_page_uri: Schema.optionalKey(
          Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
        ),
        next_page_uri: Schema.optionalKey(
          Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
        ),
        page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        previous_page_uri: Schema.optionalKey(
          Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
        ),
        start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        uri: Schema.optionalKey(
          Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
        ),
        available_phone_numbers: Schema.optionalKey(
          Schema.Array(
            ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMachineToMachineSchema,
          ),
        ),
      }),
    ),
  })

export const get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMobileJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    query: Schema.toStandardSchemaV1(
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
    response: Schema.toStandardSchemaV1(
      Schema.Struct({
        end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        first_page_uri: Schema.optionalKey(
          Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
        ),
        next_page_uri: Schema.optionalKey(
          Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
        ),
        page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        previous_page_uri: Schema.optionalKey(
          Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
        ),
        start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        uri: Schema.optionalKey(
          Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
        ),
        available_phone_numbers: Schema.optionalKey(
          Schema.Array(ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMobileSchema),
        ),
      }),
    ),
  })

export const get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeNationalJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    query: Schema.toStandardSchemaV1(
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
    response: Schema.toStandardSchemaV1(
      Schema.Struct({
        end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        first_page_uri: Schema.optionalKey(
          Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
        ),
        next_page_uri: Schema.optionalKey(
          Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
        ),
        page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        previous_page_uri: Schema.optionalKey(
          Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
        ),
        start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        uri: Schema.optionalKey(
          Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
        ),
        available_phone_numbers: Schema.optionalKey(
          Schema.Array(
            ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberNationalSchema,
          ),
        ),
      }),
    ),
  })

export const get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeSharedCostJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    query: Schema.toStandardSchemaV1(
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
    response: Schema.toStandardSchemaV1(
      Schema.Struct({
        end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        first_page_uri: Schema.optionalKey(
          Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
        ),
        next_page_uri: Schema.optionalKey(
          Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
        ),
        page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        previous_page_uri: Schema.optionalKey(
          Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
        ),
        start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        uri: Schema.optionalKey(
          Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
        ),
        available_phone_numbers: Schema.optionalKey(
          Schema.Array(
            ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberSharedCostSchema,
          ),
        ),
      }),
    ),
  })

export const get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeTollFreeJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    query: Schema.toStandardSchemaV1(
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
    response: Schema.toStandardSchemaV1(
      Schema.Struct({
        end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        first_page_uri: Schema.optionalKey(
          Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
        ),
        next_page_uri: Schema.optionalKey(
          Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
        ),
        page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        previous_page_uri: Schema.optionalKey(
          Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
        ),
        start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        uri: Schema.optionalKey(
          Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
        ),
        available_phone_numbers: Schema.optionalKey(
          Schema.Array(
            ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberTollFreeSchema,
          ),
        ),
      }),
    ),
  })

export const get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeVoipJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    query: Schema.toStandardSchemaV1(
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
    response: Schema.toStandardSchemaV1(
      Schema.Struct({
        end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        first_page_uri: Schema.optionalKey(
          Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
        ),
        next_page_uri: Schema.optionalKey(
          Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
        ),
        page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        previous_page_uri: Schema.optionalKey(
          Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
        ),
        start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        uri: Schema.optionalKey(
          Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
        ),
        available_phone_numbers: Schema.optionalKey(
          Schema.Array(ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberVoipSchema),
        ),
      }),
    ),
  })

export const get20100401AccountsAccountSidBalanceJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      AccountSid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  response: Schema.toStandardSchemaV1(ApiV2010AccountBalanceSchema),
})

export const get20100401AccountsAccountSidCallsJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      AccountSid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  query: Schema.toStandardSchemaV1(
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
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
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
  response: Schema.toStandardSchemaV1(
    Schema.Struct({
      end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      first_page_uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      next_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      previous_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      calls: Schema.optionalKey(Schema.Array(ApiV2010AccountCallSchema)),
    }),
  ),
})

export const post20100401AccountsAccountSidCallsJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      AccountSid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  form: Schema.toStandardSchemaV1(
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
              decode: (input) => (input === undefined || Array.isArray(input) ? input : [input]),
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
              decode: (input) => (input === undefined || Array.isArray(input) ? input : [input]),
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountCallSchema),
})

export const get20100401AccountsAccountSidCallsSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountCallSchema),
})

export const post20100401AccountsAccountSidCallsSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  form: Schema.toStandardSchemaV1(
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountCallSchema),
})

export const delete20100401AccountsAccountSidCallsSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
})

export const get20100401AccountsAccountSidCallsCallSidEventsJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  query: Schema.toStandardSchemaV1(
    Schema.Struct({
      PageSize: Schema.optionalKey(
        Schema.BigIntFromString.check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
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
  response: Schema.toStandardSchemaV1(
    Schema.Struct({
      end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      first_page_uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      next_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      previous_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      events: Schema.optionalKey(Schema.Array(ApiV2010AccountCallCallEventSchema)),
    }),
  ),
})

export const get20100401AccountsAccountSidCallsCallSidNotificationsSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountCallCallNotificationInstanceSchema),
})

export const get20100401AccountsAccountSidCallsCallSidNotificationsJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  query: Schema.toStandardSchemaV1(
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
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
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
  response: Schema.toStandardSchemaV1(
    Schema.Struct({
      end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      first_page_uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      next_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      previous_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      notifications: Schema.optionalKey(Schema.Array(ApiV2010AccountCallCallNotificationSchema)),
    }),
  ),
})

export const get20100401AccountsAccountSidCallsCallSidRecordingsJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  query: Schema.toStandardSchemaV1(
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
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
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
  response: Schema.toStandardSchemaV1(
    Schema.Struct({
      end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      first_page_uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      next_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      previous_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      recordings: Schema.optionalKey(Schema.Array(ApiV2010AccountCallCallRecordingSchema)),
    }),
  ),
})

export const post20100401AccountsAccountSidCallsCallSidRecordingsJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  form: Schema.toStandardSchemaV1(
    Schema.Struct({
      RecordingStatusCallbackEvent: Schema.optionalKey(
        Schema.Unknown.pipe(
          Schema.decodeTo(
            Schema.Unknown,
            SchemaTransformation.transform<unknown, unknown>({
              decode: (input) => (input === undefined || Array.isArray(input) ? input : [input]),
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountCallCallRecordingSchema),
})

export const get20100401AccountsAccountSidCallsCallSidRecordingsSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountCallCallRecordingSchema),
})

export const post20100401AccountsAccountSidCallsCallSidRecordingsSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  form: Schema.toStandardSchemaV1(
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountCallCallRecordingSchema),
})

export const delete20100401AccountsAccountSidCallsCallSidRecordingsSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
})

export const get20100401AccountsAccountSidConferencesSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountConferenceSchema),
})

export const post20100401AccountsAccountSidConferencesSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  form: Schema.toStandardSchemaV1(
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountConferenceSchema),
})

export const get20100401AccountsAccountSidConferencesJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      AccountSid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  query: Schema.toStandardSchemaV1(
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
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
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
  response: Schema.toStandardSchemaV1(
    Schema.Struct({
      end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      first_page_uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      next_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      previous_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      conferences: Schema.optionalKey(Schema.Array(ApiV2010AccountConferenceSchema)),
    }),
  ),
})

export const get20100401AccountsAccountSidConferencesConferenceSidRecordingsJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    query: Schema.toStandardSchemaV1(
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
    response: Schema.toStandardSchemaV1(
      Schema.Struct({
        end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        first_page_uri: Schema.optionalKey(
          Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
        ),
        next_page_uri: Schema.optionalKey(
          Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
        ),
        page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        previous_page_uri: Schema.optionalKey(
          Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
        ),
        start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        uri: Schema.optionalKey(
          Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
        ),
        recordings: Schema.optionalKey(
          Schema.Array(ApiV2010AccountConferenceConferenceRecordingSchema),
        ),
      }),
    ),
  })

export const get20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    response: Schema.toStandardSchemaV1(ApiV2010AccountConferenceConferenceRecordingSchema),
  })

export const post20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    form: Schema.toStandardSchemaV1(
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
    response: Schema.toStandardSchemaV1(ApiV2010AccountConferenceConferenceRecordingSchema),
  })

export const delete20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
  })

export const get20100401AccountsAccountSidConnectAppsSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountConnectAppSchema),
})

export const post20100401AccountsAccountSidConnectAppsSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  form: Schema.toStandardSchemaV1(
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
              decode: (input) => (input === undefined || Array.isArray(input) ? input : [input]),
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountConnectAppSchema),
})

export const delete20100401AccountsAccountSidConnectAppsSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
})

export const get20100401AccountsAccountSidConnectAppsJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      AccountSid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  query: Schema.toStandardSchemaV1(
    Schema.Struct({
      PageSize: Schema.optionalKey(
        Schema.BigIntFromString.check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
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
  response: Schema.toStandardSchemaV1(
    Schema.Struct({
      end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      first_page_uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      next_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      previous_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      connect_apps: Schema.optionalKey(Schema.Array(ApiV2010AccountConnectAppSchema)),
    }),
  ),
})

export const get20100401AccountsAccountSidAddressesAddressSidDependentPhoneNumbersJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    query: Schema.toStandardSchemaV1(
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
    response: Schema.toStandardSchemaV1(
      Schema.Struct({
        end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        first_page_uri: Schema.optionalKey(
          Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
        ),
        next_page_uri: Schema.optionalKey(
          Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
        ),
        page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        previous_page_uri: Schema.optionalKey(
          Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
        ),
        start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        uri: Schema.optionalKey(
          Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
        ),
        dependent_phone_numbers: Schema.optionalKey(
          Schema.Array(ApiV2010AccountAddressDependentPhoneNumberSchema),
        ),
      }),
    ),
  })

export const get20100401AccountsAccountSidIncomingPhoneNumbersSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountIncomingPhoneNumberSchema),
})

export const post20100401AccountsAccountSidIncomingPhoneNumbersSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  form: Schema.toStandardSchemaV1(
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountIncomingPhoneNumberSchema),
})

export const delete20100401AccountsAccountSidIncomingPhoneNumbersSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
})

export const get20100401AccountsAccountSidIncomingPhoneNumbersJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      AccountSid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  query: Schema.toStandardSchemaV1(
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
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
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
  response: Schema.toStandardSchemaV1(
    Schema.Struct({
      end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      first_page_uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      next_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      previous_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      incoming_phone_numbers: Schema.optionalKey(
        Schema.Array(ApiV2010AccountIncomingPhoneNumberSchema),
      ),
    }),
  ),
})

export const post20100401AccountsAccountSidIncomingPhoneNumbersJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      AccountSid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  form: Schema.toStandardSchemaV1(
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountIncomingPhoneNumberSchema),
})

export const get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    response: Schema.toStandardSchemaV1(
      ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema,
    ),
  })

export const delete20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
  })

export const get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    query: Schema.toStandardSchemaV1(
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
    response: Schema.toStandardSchemaV1(
      Schema.Struct({
        end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        first_page_uri: Schema.optionalKey(
          Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
        ),
        next_page_uri: Schema.optionalKey(
          Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
        ),
        page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        previous_page_uri: Schema.optionalKey(
          Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
        ),
        start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        uri: Schema.optionalKey(
          Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
        ),
        assigned_add_ons: Schema.optionalKey(
          Schema.Array(ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema),
        ),
      }),
    ),
  })

export const post20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    form: Schema.toStandardSchemaV1(
      Schema.Struct({
        InstalledAddOnSid: Schema.String.check(
          Schema.isPattern(/^XE[0-9a-fA-F]{32}$/),
          Schema.makeFilter((input) => [...input].length === 34, {
            expected: 'a string of 34 characters',
          }),
        ).annotate({ description: 'The SID that identifies the Add-on installation.' }),
      }),
    ),
    response: Schema.toStandardSchemaV1(
      ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema,
    ),
  })

export const get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsSidJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    response: Schema.toStandardSchemaV1(
      ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtensionSchema,
    ),
  })

export const get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    query: Schema.toStandardSchemaV1(
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
    response: Schema.toStandardSchemaV1(
      Schema.Struct({
        end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        first_page_uri: Schema.optionalKey(
          Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
        ),
        next_page_uri: Schema.optionalKey(
          Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
        ),
        page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        previous_page_uri: Schema.optionalKey(
          Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
        ),
        start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        uri: Schema.optionalKey(
          Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
        ),
        extensions: Schema.optionalKey(
          Schema.Array(
            ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtensionSchema,
          ),
        ),
      }),
    ),
  })

export const get20100401AccountsAccountSidIncomingPhoneNumbersLocalJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      AccountSid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  query: Schema.toStandardSchemaV1(
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
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
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
  response: Schema.toStandardSchemaV1(
    Schema.Struct({
      end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      first_page_uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      next_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      previous_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      incoming_phone_numbers: Schema.optionalKey(
        Schema.Array(ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocalSchema),
      ),
    }),
  ),
})

export const post20100401AccountsAccountSidIncomingPhoneNumbersLocalJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      AccountSid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  form: Schema.toStandardSchemaV1(
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
  response: Schema.toStandardSchemaV1(
    ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocalSchema,
  ),
})

export const get20100401AccountsAccountSidIncomingPhoneNumbersMobileJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      AccountSid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  query: Schema.toStandardSchemaV1(
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
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
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
  response: Schema.toStandardSchemaV1(
    Schema.Struct({
      end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      first_page_uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      next_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      previous_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      incoming_phone_numbers: Schema.optionalKey(
        Schema.Array(ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobileSchema),
      ),
    }),
  ),
})

export const post20100401AccountsAccountSidIncomingPhoneNumbersMobileJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      AccountSid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  form: Schema.toStandardSchemaV1(
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
  response: Schema.toStandardSchemaV1(
    ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobileSchema,
  ),
})

export const get20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      AccountSid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  query: Schema.toStandardSchemaV1(
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
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
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
  response: Schema.toStandardSchemaV1(
    Schema.Struct({
      end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      first_page_uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      next_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      previous_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      incoming_phone_numbers: Schema.optionalKey(
        Schema.Array(ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFreeSchema),
      ),
    }),
  ),
})

export const post20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      AccountSid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  form: Schema.toStandardSchemaV1(
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
      VoiceReceiveMode: Schema.optionalKey(IncomingPhoneNumberTollFreeEnumVoiceReceiveModeSchema),
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
  response: Schema.toStandardSchemaV1(
    ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFreeSchema,
  ),
})

export const get20100401AccountsAccountSidKeysSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountKeySchema),
})

export const post20100401AccountsAccountSidKeysSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  form: Schema.toStandardSchemaV1(
    Schema.Struct({
      FriendlyName: Schema.optionalKey(
        Schema.String.annotate({
          description:
            'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
        }),
      ),
    }),
  ),
  response: Schema.toStandardSchemaV1(ApiV2010AccountKeySchema),
})

export const delete20100401AccountsAccountSidKeysSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
})

export const get20100401AccountsAccountSidKeysJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      AccountSid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  query: Schema.toStandardSchemaV1(
    Schema.Struct({
      PageSize: Schema.optionalKey(
        Schema.BigIntFromString.check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
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
  response: Schema.toStandardSchemaV1(
    Schema.Struct({
      end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      first_page_uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      next_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      previous_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      keys: Schema.optionalKey(Schema.Array(ApiV2010AccountKeySchema)),
    }),
  ),
})

export const post20100401AccountsAccountSidKeysJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      AccountSid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  form: Schema.toStandardSchemaV1(
    Schema.Struct({
      FriendlyName: Schema.optionalKey(
        Schema.String.annotate({
          description:
            'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
        }),
      ),
    }),
  ),
  response: Schema.toStandardSchemaV1(ApiV2010AccountNewKeySchema),
})

export const get20100401AccountsAccountSidMessagesMessageSidMediaSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountMessageMediaSchema),
})

export const delete20100401AccountsAccountSidMessagesMessageSidMediaSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
})

export const get20100401AccountsAccountSidMessagesMessageSidMediaJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  query: Schema.toStandardSchemaV1(
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
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
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
  response: Schema.toStandardSchemaV1(
    Schema.Struct({
      end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      first_page_uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      next_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      previous_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      media_list: Schema.optionalKey(Schema.Array(ApiV2010AccountMessageMediaSchema)),
    }),
  ),
})

export const get20100401AccountsAccountSidQueuesQueueSidMembersCallSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountQueueMemberSchema),
})

export const post20100401AccountsAccountSidQueuesQueueSidMembersCallSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  form: Schema.toStandardSchemaV1(
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountQueueMemberSchema),
})

export const get20100401AccountsAccountSidQueuesQueueSidMembersJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  query: Schema.toStandardSchemaV1(
    Schema.Struct({
      PageSize: Schema.optionalKey(
        Schema.BigIntFromString.check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
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
  response: Schema.toStandardSchemaV1(
    Schema.Struct({
      end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      first_page_uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      next_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      previous_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      queue_members: Schema.optionalKey(Schema.Array(ApiV2010AccountQueueMemberSchema)),
    }),
  ),
})

export const get20100401AccountsAccountSidMessagesJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      AccountSid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  query: Schema.toStandardSchemaV1(
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
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
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
  response: Schema.toStandardSchemaV1(
    Schema.Struct({
      end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      first_page_uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      next_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      previous_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      messages: Schema.optionalKey(Schema.Array(ApiV2010AccountMessageSchema)),
    }),
  ),
})

export const post20100401AccountsAccountSidMessagesJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      AccountSid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  form: Schema.toStandardSchemaV1(
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
              decode: (input) => (input === undefined || Array.isArray(input) ? input : [input]),
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
          description: 'The time that Twilio will send the message. Must be in ISO 8601 format.',
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
              decode: (input) => (input === undefined || Array.isArray(input) ? input : [input]),
              encode: (output) => output,
            }),
          ),
          Schema.decodeTo(
            Schema.Array(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountMessageSchema),
})

export const get20100401AccountsAccountSidMessagesSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountMessageSchema),
})

export const post20100401AccountsAccountSidMessagesSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  form: Schema.toStandardSchemaV1(
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountMessageSchema),
})

export const delete20100401AccountsAccountSidMessagesSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
})

export const post20100401AccountsAccountSidMessagesMessageSidFeedbackJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  form: Schema.toStandardSchemaV1(
    Schema.Struct({ Outcome: Schema.optionalKey(MessageFeedbackEnumOutcomeSchema) }),
  ),
  response: Schema.toStandardSchemaV1(ApiV2010AccountMessageMessageFeedbackSchema),
})

export const get20100401AccountsAccountSidSigningKeysJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      AccountSid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  query: Schema.toStandardSchemaV1(
    Schema.Struct({
      PageSize: Schema.optionalKey(
        Schema.BigIntFromString.check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
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
  response: Schema.toStandardSchemaV1(
    Schema.Struct({
      end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      first_page_uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      next_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      previous_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      signing_keys: Schema.optionalKey(Schema.Array(ApiV2010AccountSigningKeySchema)),
    }),
  ),
})

export const post20100401AccountsAccountSidSigningKeysJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      AccountSid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  form: Schema.toStandardSchemaV1(
    Schema.Struct({
      FriendlyName: Schema.optionalKey(
        Schema.String.annotate({
          description:
            'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
        }),
      ),
    }),
  ),
  response: Schema.toStandardSchemaV1(ApiV2010AccountNewSigningKeySchema),
})

export const get20100401AccountsAccountSidNotificationsSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountNotificationInstanceSchema),
})

export const get20100401AccountsAccountSidNotificationsJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      AccountSid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  query: Schema.toStandardSchemaV1(
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
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
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
  response: Schema.toStandardSchemaV1(
    Schema.Struct({
      end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      first_page_uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      next_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      previous_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      notifications: Schema.optionalKey(Schema.Array(ApiV2010AccountNotificationSchema)),
    }),
  ),
})

export const get20100401AccountsAccountSidOutgoingCallerIdsSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountOutgoingCallerIdSchema),
})

export const post20100401AccountsAccountSidOutgoingCallerIdsSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  form: Schema.toStandardSchemaV1(
    Schema.Struct({
      FriendlyName: Schema.optionalKey(
        Schema.String.annotate({
          description:
            'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
        }),
      ),
    }),
  ),
  response: Schema.toStandardSchemaV1(ApiV2010AccountOutgoingCallerIdSchema),
})

export const delete20100401AccountsAccountSidOutgoingCallerIdsSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
})

export const get20100401AccountsAccountSidOutgoingCallerIdsJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      AccountSid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  query: Schema.toStandardSchemaV1(
    Schema.Struct({
      PhoneNumber: Schema.optionalKey(Schema.String),
      FriendlyName: Schema.optionalKey(Schema.String),
      PageSize: Schema.optionalKey(
        Schema.BigIntFromString.check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
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
  response: Schema.toStandardSchemaV1(
    Schema.Struct({
      end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      first_page_uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      next_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      previous_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      outgoing_caller_ids: Schema.optionalKey(Schema.Array(ApiV2010AccountOutgoingCallerIdSchema)),
    }),
  ),
})

export const post20100401AccountsAccountSidOutgoingCallerIdsJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      AccountSid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  form: Schema.toStandardSchemaV1(
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountValidationRequestSchema),
})

export const get20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    response: Schema.toStandardSchemaV1(ApiV2010AccountConferenceParticipantSchema),
  })

export const post20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    form: Schema.toStandardSchemaV1(
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
    response: Schema.toStandardSchemaV1(ApiV2010AccountConferenceParticipantSchema),
  })

export const delete20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
  })

export const get20100401AccountsAccountSidConferencesConferenceSidParticipantsJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    query: Schema.toStandardSchemaV1(
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
    response: Schema.toStandardSchemaV1(
      Schema.Struct({
        end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        first_page_uri: Schema.optionalKey(
          Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
        ),
        next_page_uri: Schema.optionalKey(
          Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
        ),
        page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        previous_page_uri: Schema.optionalKey(
          Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
        ),
        start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        uri: Schema.optionalKey(
          Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
        ),
        participants: Schema.optionalKey(Schema.Array(ApiV2010AccountConferenceParticipantSchema)),
      }),
    ),
  })

export const post20100401AccountsAccountSidConferencesConferenceSidParticipantsJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    form: Schema.toStandardSchemaV1(
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
                decode: (input) => (input === undefined || Array.isArray(input) ? input : [input]),
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
                decode: (input) => (input === undefined || Array.isArray(input) ? input : [input]),
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
                decode: (input) => (input === undefined || Array.isArray(input) ? input : [input]),
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
                decode: (input) => (input === undefined || Array.isArray(input) ? input : [input]),
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
    response: Schema.toStandardSchemaV1(ApiV2010AccountConferenceParticipantSchema),
  })

export const post20100401AccountsAccountSidCallsCallSidPaymentsJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  form: Schema.toStandardSchemaV1(
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountCallPaymentsSchema),
})

export const post20100401AccountsAccountSidCallsCallSidPaymentsSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  form: Schema.toStandardSchemaV1(
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountCallPaymentsSchema),
})

export const get20100401AccountsAccountSidQueuesSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountQueueSchema),
})

export const post20100401AccountsAccountSidQueuesSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  form: Schema.toStandardSchemaV1(
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountQueueSchema),
})

export const delete20100401AccountsAccountSidQueuesSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
})

export const get20100401AccountsAccountSidQueuesJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      AccountSid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  query: Schema.toStandardSchemaV1(
    Schema.Struct({
      PageSize: Schema.optionalKey(
        Schema.BigIntFromString.check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
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
  response: Schema.toStandardSchemaV1(
    Schema.Struct({
      end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      first_page_uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      next_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      previous_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      queues: Schema.optionalKey(Schema.Array(ApiV2010AccountQueueSchema)),
    }),
  ),
})

export const post20100401AccountsAccountSidQueuesJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      AccountSid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  form: Schema.toStandardSchemaV1(
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountQueueSchema),
})

export const post20100401AccountsAccountSidCallsCallSidTranscriptionsJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  form: Schema.toStandardSchemaV1(
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountCallRealtimeTranscriptionSchema),
})

export const post20100401AccountsAccountSidCallsCallSidTranscriptionsSidJsonHandler = defineHandler(
  {
    param: Schema.toStandardSchemaV1(
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
    form: Schema.toStandardSchemaV1(
      Schema.Struct({ Status: RealtimeTranscriptionEnumUpdateStatusSchema }),
    ),
    response: Schema.toStandardSchemaV1(ApiV2010AccountCallRealtimeTranscriptionSchema),
  },
)

export const get20100401AccountsAccountSidRecordingsSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  query: Schema.toStandardSchemaV1(
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountRecordingSchema),
})

export const delete20100401AccountsAccountSidRecordingsSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
})

export const get20100401AccountsAccountSidRecordingsJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      AccountSid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  query: Schema.toStandardSchemaV1(
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
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
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
  response: Schema.toStandardSchemaV1(
    Schema.Struct({
      end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      first_page_uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      next_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      previous_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      recordings: Schema.optionalKey(Schema.Array(ApiV2010AccountRecordingSchema)),
    }),
  ),
})

export const get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    response: Schema.toStandardSchemaV1(ApiV2010AccountRecordingRecordingAddOnResultSchema),
  })

export const delete20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
  })

export const get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    query: Schema.toStandardSchemaV1(
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
    response: Schema.toStandardSchemaV1(
      Schema.Struct({
        end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        first_page_uri: Schema.optionalKey(
          Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
        ),
        next_page_uri: Schema.optionalKey(
          Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
        ),
        page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        previous_page_uri: Schema.optionalKey(
          Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
        ),
        start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        uri: Schema.optionalKey(
          Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
        ),
        add_on_results: Schema.optionalKey(
          Schema.Array(ApiV2010AccountRecordingRecordingAddOnResultSchema),
        ),
      }),
    ),
  })

export const get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    response: Schema.toStandardSchemaV1(
      ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadSchema,
    ),
  })

export const delete20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
  })

export const get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    query: Schema.toStandardSchemaV1(
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
    response: Schema.toStandardSchemaV1(
      Schema.Struct({
        end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        first_page_uri: Schema.optionalKey(
          Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
        ),
        next_page_uri: Schema.optionalKey(
          Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
        ),
        page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        previous_page_uri: Schema.optionalKey(
          Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
        ),
        start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        uri: Schema.optionalKey(
          Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
        ),
        payloads: Schema.optionalKey(
          Schema.Array(
            ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadSchema,
          ),
        ),
      }),
    ),
  })

export const get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsPayloadSidDataJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
  })

export const get20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    response: Schema.toStandardSchemaV1(ApiV2010AccountRecordingRecordingTranscriptionSchema),
  })

export const delete20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
  })

export const get20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    query: Schema.toStandardSchemaV1(
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
    response: Schema.toStandardSchemaV1(
      Schema.Struct({
        end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        first_page_uri: Schema.optionalKey(
          Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
        ),
        next_page_uri: Schema.optionalKey(
          Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
        ),
        page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        previous_page_uri: Schema.optionalKey(
          Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
        ),
        start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        uri: Schema.optionalKey(
          Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
        ),
        transcriptions: Schema.optionalKey(
          Schema.Array(ApiV2010AccountRecordingRecordingTranscriptionSchema),
        ),
      }),
    ),
  })

export const get20100401AccountsAccountSidSMSShortCodesSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountShortCodeSchema),
})

export const post20100401AccountsAccountSidSMSShortCodesSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  form: Schema.toStandardSchemaV1(
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountShortCodeSchema),
})

export const get20100401AccountsAccountSidSMSShortCodesJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      AccountSid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  query: Schema.toStandardSchemaV1(
    Schema.Struct({
      FriendlyName: Schema.optionalKey(Schema.String),
      ShortCode: Schema.optionalKey(Schema.String),
      PageSize: Schema.optionalKey(
        Schema.BigIntFromString.check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
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
  response: Schema.toStandardSchemaV1(
    Schema.Struct({
      end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      first_page_uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      next_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      previous_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      short_codes: Schema.optionalKey(Schema.Array(ApiV2010AccountShortCodeSchema)),
    }),
  ),
})

export const get20100401AccountsAccountSidSigningKeysSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountSigningKeySchema),
})

export const post20100401AccountsAccountSidSigningKeysSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  form: Schema.toStandardSchemaV1(
    Schema.Struct({
      FriendlyName: Schema.optionalKey(Schema.String.annotate({ description: '' })),
    }),
  ),
  response: Schema.toStandardSchemaV1(ApiV2010AccountSigningKeySchema),
})

export const delete20100401AccountsAccountSidSigningKeysSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
})

export const get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    query: Schema.toStandardSchemaV1(
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
    response: Schema.toStandardSchemaV1(
      Schema.Struct({
        end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        first_page_uri: Schema.optionalKey(
          Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
        ),
        next_page_uri: Schema.optionalKey(
          Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
        ),
        page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        previous_page_uri: Schema.optionalKey(
          Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
        ),
        start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        uri: Schema.optionalKey(
          Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
        ),
        contents: Schema.optionalKey(
          Schema.Array(
            ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema,
          ),
        ),
      }),
    ),
  })

export const post20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    form: Schema.toStandardSchemaV1(
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
    response: Schema.toStandardSchemaV1(
      ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema,
    ),
  })

export const get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    response: Schema.toStandardSchemaV1(
      ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema,
    ),
  })

export const delete20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
  })

export const get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    query: Schema.toStandardSchemaV1(
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
    response: Schema.toStandardSchemaV1(
      Schema.Struct({
        end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        first_page_uri: Schema.optionalKey(
          Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
        ),
        next_page_uri: Schema.optionalKey(
          Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
        ),
        page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        previous_page_uri: Schema.optionalKey(
          Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
        ),
        start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        uri: Schema.optionalKey(
          Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
        ),
        contents: Schema.optionalKey(
          Schema.Array(
            ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema,
          ),
        ),
      }),
    ),
  })

export const post20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    form: Schema.toStandardSchemaV1(
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
    response: Schema.toStandardSchemaV1(
      ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema,
    ),
  })

export const get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    response: Schema.toStandardSchemaV1(
      ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema,
    ),
  })

export const delete20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
  })

export const get20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    query: Schema.toStandardSchemaV1(
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
    response: Schema.toStandardSchemaV1(
      Schema.Struct({
        end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        first_page_uri: Schema.optionalKey(
          Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
        ),
        next_page_uri: Schema.optionalKey(
          Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
        ),
        page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        previous_page_uri: Schema.optionalKey(
          Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
        ),
        start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        uri: Schema.optionalKey(
          Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
        ),
        contents: Schema.optionalKey(
          Schema.Array(
            ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema,
          ),
        ),
      }),
    ),
  })

export const post20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    form: Schema.toStandardSchemaV1(
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
    response: Schema.toStandardSchemaV1(
      ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema,
    ),
  })

export const get20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    response: Schema.toStandardSchemaV1(
      ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema,
    ),
  })

export const delete20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
  })

export const get20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    query: Schema.toStandardSchemaV1(
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
    response: Schema.toStandardSchemaV1(
      Schema.Struct({
        end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        first_page_uri: Schema.optionalKey(
          Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
        ),
        next_page_uri: Schema.optionalKey(
          Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
        ),
        page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        previous_page_uri: Schema.optionalKey(
          Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
        ),
        start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        uri: Schema.optionalKey(
          Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
        ),
        credentials: Schema.optionalKey(
          Schema.Array(ApiV2010AccountSipSipCredentialListSipCredentialSchema),
        ),
      }),
    ),
  })

export const post20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    form: Schema.toStandardSchemaV1(
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
    response: Schema.toStandardSchemaV1(ApiV2010AccountSipSipCredentialListSipCredentialSchema),
  })

export const get20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    response: Schema.toStandardSchemaV1(ApiV2010AccountSipSipCredentialListSipCredentialSchema),
  })

export const post20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    form: Schema.toStandardSchemaV1(
      Schema.Struct({
        Password: Schema.optionalKey(
          Schema.String.annotate({
            description:
              'The password that the username will use when authenticating SIP requests. The password must be a minimum of 12 characters, contain at least 1 digit, and have mixed case. (eg `IWasAtSignal2018`)',
          }),
        ),
      }),
    ),
    response: Schema.toStandardSchemaV1(ApiV2010AccountSipSipCredentialListSipCredentialSchema),
  })

export const delete20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
  })

export const get20100401AccountsAccountSidSIPCredentialListsJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      AccountSid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  query: Schema.toStandardSchemaV1(
    Schema.Struct({
      PageSize: Schema.optionalKey(
        Schema.BigIntFromString.check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
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
  response: Schema.toStandardSchemaV1(
    Schema.Struct({
      end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      first_page_uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      next_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      previous_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      credential_lists: Schema.optionalKey(Schema.Array(ApiV2010AccountSipSipCredentialListSchema)),
    }),
  ),
})

export const post20100401AccountsAccountSidSIPCredentialListsJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      AccountSid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  form: Schema.toStandardSchemaV1(
    Schema.Struct({
      FriendlyName: Schema.String.annotate({
        description:
          'A human readable descriptive text that describes the CredentialList, up to 64 characters long.',
      }),
    }),
  ),
  response: Schema.toStandardSchemaV1(ApiV2010AccountSipSipCredentialListSchema),
})

export const get20100401AccountsAccountSidSIPCredentialListsSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountSipSipCredentialListSchema),
})

export const post20100401AccountsAccountSidSIPCredentialListsSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  form: Schema.toStandardSchemaV1(
    Schema.Struct({
      FriendlyName: Schema.String.annotate({
        description:
          'A human readable descriptive text for a CredentialList, up to 64 characters long.',
      }),
    }),
  ),
  response: Schema.toStandardSchemaV1(ApiV2010AccountSipSipCredentialListSchema),
})

export const delete20100401AccountsAccountSidSIPCredentialListsSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
})

export const get20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    query: Schema.toStandardSchemaV1(
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
    response: Schema.toStandardSchemaV1(
      Schema.Struct({
        end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        first_page_uri: Schema.optionalKey(
          Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
        ),
        next_page_uri: Schema.optionalKey(
          Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
        ),
        page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        previous_page_uri: Schema.optionalKey(
          Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
        ),
        start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        uri: Schema.optionalKey(
          Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
        ),
        credential_list_mappings: Schema.optionalKey(
          Schema.Array(ApiV2010AccountSipSipDomainSipCredentialListMappingSchema),
        ),
      }),
    ),
  })

export const post20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    form: Schema.toStandardSchemaV1(
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
    response: Schema.toStandardSchemaV1(ApiV2010AccountSipSipDomainSipCredentialListMappingSchema),
  })

export const get20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    response: Schema.toStandardSchemaV1(ApiV2010AccountSipSipDomainSipCredentialListMappingSchema),
  })

export const delete20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
  })

export const get20100401AccountsAccountSidSIPDomainsJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      AccountSid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  query: Schema.toStandardSchemaV1(
    Schema.Struct({
      PageSize: Schema.optionalKey(
        Schema.BigIntFromString.check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
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
  response: Schema.toStandardSchemaV1(
    Schema.Struct({
      end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      first_page_uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      next_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      previous_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      domains: Schema.optionalKey(Schema.Array(ApiV2010AccountSipSipDomainSchema)),
    }),
  ),
})

export const post20100401AccountsAccountSidSIPDomainsJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      AccountSid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  form: Schema.toStandardSchemaV1(
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountSipSipDomainSchema),
})

export const get20100401AccountsAccountSidSIPDomainsSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountSipSipDomainSchema),
})

export const post20100401AccountsAccountSidSIPDomainsSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  form: Schema.toStandardSchemaV1(
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountSipSipDomainSchema),
})

export const delete20100401AccountsAccountSidSIPDomainsSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
})

export const get20100401AccountsAccountSidSIPIpAccessControlListsJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      AccountSid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  query: Schema.toStandardSchemaV1(
    Schema.Struct({
      PageSize: Schema.optionalKey(
        Schema.BigIntFromString.check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
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
  response: Schema.toStandardSchemaV1(
    Schema.Struct({
      end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      first_page_uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      next_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      previous_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      ip_access_control_lists: Schema.optionalKey(
        Schema.Array(ApiV2010AccountSipSipIpAccessControlListSchema),
      ),
    }),
  ),
})

export const post20100401AccountsAccountSidSIPIpAccessControlListsJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      AccountSid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  form: Schema.toStandardSchemaV1(
    Schema.Struct({
      FriendlyName: Schema.String.annotate({
        description:
          'A human readable descriptive text that describes the IpAccessControlList, up to 255 characters long.',
      }),
    }),
  ),
  response: Schema.toStandardSchemaV1(ApiV2010AccountSipSipIpAccessControlListSchema),
})

export const get20100401AccountsAccountSidSIPIpAccessControlListsSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountSipSipIpAccessControlListSchema),
})

export const post20100401AccountsAccountSidSIPIpAccessControlListsSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  form: Schema.toStandardSchemaV1(
    Schema.Struct({
      FriendlyName: Schema.String.annotate({
        description: 'A human readable descriptive text, up to 255 characters long.',
      }),
    }),
  ),
  response: Schema.toStandardSchemaV1(ApiV2010AccountSipSipIpAccessControlListSchema),
})

export const delete20100401AccountsAccountSidSIPIpAccessControlListsSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
})

export const get20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    response: Schema.toStandardSchemaV1(
      ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema,
    ),
  })

export const delete20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
  })

export const get20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    query: Schema.toStandardSchemaV1(
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
    response: Schema.toStandardSchemaV1(
      Schema.Struct({
        end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        first_page_uri: Schema.optionalKey(
          Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
        ),
        next_page_uri: Schema.optionalKey(
          Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
        ),
        page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        previous_page_uri: Schema.optionalKey(
          Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
        ),
        start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        uri: Schema.optionalKey(
          Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
        ),
        ip_access_control_list_mappings: Schema.optionalKey(
          Schema.Array(ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema),
        ),
      }),
    ),
  })

export const post20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    form: Schema.toStandardSchemaV1(
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
    response: Schema.toStandardSchemaV1(
      ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema,
    ),
  })

export const get20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    query: Schema.toStandardSchemaV1(
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
    response: Schema.toStandardSchemaV1(
      Schema.Struct({
        end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        first_page_uri: Schema.optionalKey(
          Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
        ),
        next_page_uri: Schema.optionalKey(
          Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
        ),
        page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        previous_page_uri: Schema.optionalKey(
          Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
        ),
        start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        uri: Schema.optionalKey(
          Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
        ),
        ip_addresses: Schema.optionalKey(
          Schema.Array(ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema),
        ),
      }),
    ),
  })

export const post20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    form: Schema.toStandardSchemaV1(
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
    response: Schema.toStandardSchemaV1(ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema),
  })

export const get20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    response: Schema.toStandardSchemaV1(ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema),
  })

export const post20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    form: Schema.toStandardSchemaV1(
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
    response: Schema.toStandardSchemaV1(ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema),
  })

export const delete20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
  })

export const post20100401AccountsAccountSidCallsCallSidSiprecJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  form: Schema.toStandardSchemaV1(
    Schema.Struct({
      Name: Schema.optionalKey(
        Schema.String.annotate({
          description:
            'The user-specified name of this Siprec, if one was given when the Siprec was created. This may be used to stop the Siprec.',
        }),
      ),
      ConnectorName: Schema.optionalKey(
        Schema.String.annotate({
          description: 'Unique name used when configuring the connector via Marketplace Add-on.',
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountCallSiprecSchema),
})

export const post20100401AccountsAccountSidCallsCallSidSiprecSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  form: Schema.toStandardSchemaV1(Schema.Struct({ Status: SiprecEnumUpdateStatusSchema })),
  response: Schema.toStandardSchemaV1(ApiV2010AccountCallSiprecSchema),
})

export const post20100401AccountsAccountSidCallsCallSidStreamsJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  form: Schema.toStandardSchemaV1(
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountCallStreamSchema),
})

export const post20100401AccountsAccountSidCallsCallSidStreamsSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  form: Schema.toStandardSchemaV1(Schema.Struct({ Status: StreamEnumUpdateStatusSchema })),
  response: Schema.toStandardSchemaV1(ApiV2010AccountCallStreamSchema),
})

export const post20100401AccountsAccountSidTokensJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      AccountSid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  form: Schema.toStandardSchemaV1(
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountTokenSchema),
})

export const get20100401AccountsAccountSidTranscriptionsSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountTranscriptionSchema),
})

export const delete20100401AccountsAccountSidTranscriptionsSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
})

export const get20100401AccountsAccountSidTranscriptionsJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      AccountSid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  query: Schema.toStandardSchemaV1(
    Schema.Struct({
      PageSize: Schema.optionalKey(
        Schema.BigIntFromString.check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
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
  response: Schema.toStandardSchemaV1(
    Schema.Struct({
      end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      first_page_uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      next_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      previous_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      transcriptions: Schema.optionalKey(Schema.Array(ApiV2010AccountTranscriptionSchema)),
    }),
  ),
})

export const get20100401AccountsAccountSidUsageRecordsJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      AccountSid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  query: Schema.toStandardSchemaV1(
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
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
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
  response: Schema.toStandardSchemaV1(
    Schema.Struct({
      end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      first_page_uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      next_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      previous_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      usage_records: Schema.optionalKey(Schema.Array(ApiV2010AccountUsageUsageRecordSchema)),
    }),
  ),
})

export const get20100401AccountsAccountSidUsageRecordsAllTimeJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      AccountSid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  query: Schema.toStandardSchemaV1(
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
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
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
  response: Schema.toStandardSchemaV1(
    Schema.Struct({
      end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      first_page_uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      next_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      previous_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      usage_records: Schema.optionalKey(
        Schema.Array(ApiV2010AccountUsageUsageRecordUsageRecordAllTimeSchema),
      ),
    }),
  ),
})

export const get20100401AccountsAccountSidUsageRecordsDailyJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      AccountSid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  query: Schema.toStandardSchemaV1(
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
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
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
  response: Schema.toStandardSchemaV1(
    Schema.Struct({
      end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      first_page_uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      next_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      previous_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      usage_records: Schema.optionalKey(
        Schema.Array(ApiV2010AccountUsageUsageRecordUsageRecordDailySchema),
      ),
    }),
  ),
})

export const get20100401AccountsAccountSidUsageRecordsLastMonthJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      AccountSid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  query: Schema.toStandardSchemaV1(
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
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
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
  response: Schema.toStandardSchemaV1(
    Schema.Struct({
      end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      first_page_uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      next_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      previous_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      usage_records: Schema.optionalKey(
        Schema.Array(ApiV2010AccountUsageUsageRecordUsageRecordLastMonthSchema),
      ),
    }),
  ),
})

export const get20100401AccountsAccountSidUsageRecordsMonthlyJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      AccountSid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  query: Schema.toStandardSchemaV1(
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
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
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
  response: Schema.toStandardSchemaV1(
    Schema.Struct({
      end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      first_page_uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      next_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      previous_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      usage_records: Schema.optionalKey(
        Schema.Array(ApiV2010AccountUsageUsageRecordUsageRecordMonthlySchema),
      ),
    }),
  ),
})

export const get20100401AccountsAccountSidUsageRecordsThisMonthJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      AccountSid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  query: Schema.toStandardSchemaV1(
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
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
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
  response: Schema.toStandardSchemaV1(
    Schema.Struct({
      end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      first_page_uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      next_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      previous_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      usage_records: Schema.optionalKey(
        Schema.Array(ApiV2010AccountUsageUsageRecordUsageRecordThisMonthSchema),
      ),
    }),
  ),
})

export const get20100401AccountsAccountSidUsageRecordsTodayJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      AccountSid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  query: Schema.toStandardSchemaV1(
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
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
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
  response: Schema.toStandardSchemaV1(
    Schema.Struct({
      end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      first_page_uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      next_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      previous_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      usage_records: Schema.optionalKey(
        Schema.Array(ApiV2010AccountUsageUsageRecordUsageRecordTodaySchema),
      ),
    }),
  ),
})

export const get20100401AccountsAccountSidUsageRecordsYearlyJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      AccountSid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  query: Schema.toStandardSchemaV1(
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
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
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
  response: Schema.toStandardSchemaV1(
    Schema.Struct({
      end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      first_page_uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      next_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      previous_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      usage_records: Schema.optionalKey(
        Schema.Array(ApiV2010AccountUsageUsageRecordUsageRecordYearlySchema),
      ),
    }),
  ),
})

export const get20100401AccountsAccountSidUsageRecordsYesterdayJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      AccountSid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  query: Schema.toStandardSchemaV1(
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
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
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
  response: Schema.toStandardSchemaV1(
    Schema.Struct({
      end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      first_page_uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      next_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      previous_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      usage_records: Schema.optionalKey(
        Schema.Array(ApiV2010AccountUsageUsageRecordUsageRecordYesterdaySchema),
      ),
    }),
  ),
})

export const get20100401AccountsAccountSidUsageTriggersSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountUsageUsageTriggerSchema),
})

export const post20100401AccountsAccountSidUsageTriggersSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
  form: Schema.toStandardSchemaV1(
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountUsageUsageTriggerSchema),
})

export const delete20100401AccountsAccountSidUsageTriggersSidJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
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
})

export const get20100401AccountsAccountSidUsageTriggersJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      AccountSid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  query: Schema.toStandardSchemaV1(
    Schema.Struct({
      Recurring: Schema.optionalKey(UsageTriggerEnumRecurringSchema),
      TriggerBy: Schema.optionalKey(UsageTriggerEnumTriggerFieldSchema),
      UsageCategory: Schema.optionalKey(Schema.String),
      PageSize: Schema.optionalKey(
        Schema.BigIntFromString.check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
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
  response: Schema.toStandardSchemaV1(
    Schema.Struct({
      end: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      first_page_uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      next_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      page: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      page_size: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      previous_page_uri: Schema.optionalKey(
        Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
      ),
      start: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
      uri: Schema.optionalKey(
        Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
      ),
      usage_triggers: Schema.optionalKey(Schema.Array(ApiV2010AccountUsageUsageTriggerSchema)),
    }),
  ),
})

export const post20100401AccountsAccountSidUsageTriggersJsonHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      AccountSid: Schema.String.check(
        Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
        Schema.makeFilter((input) => [...input].length === 34, {
          expected: 'a string of 34 characters',
        }),
      ),
    }),
  ),
  form: Schema.toStandardSchemaV1(
    Schema.Struct({
      CallbackUrl: Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
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
  response: Schema.toStandardSchemaV1(ApiV2010AccountUsageUsageTriggerSchema),
})

export const post20100401AccountsAccountSidCallsCallSidUserDefinedMessagesJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    form: Schema.toStandardSchemaV1(
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
    response: Schema.toStandardSchemaV1(ApiV2010AccountCallUserDefinedMessageSchema),
  })

export const post20100401AccountsAccountSidCallsCallSidUserDefinedMessageSubscriptionsJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
    form: Schema.toStandardSchemaV1(
      Schema.Struct({
        Callback: Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))).annotate({
          description:
            'The URL we should call using the `method` to send user defined events to your application. URLs must contain a valid hostname (underscores are not permitted).',
        }),
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
    response: Schema.toStandardSchemaV1(ApiV2010AccountCallUserDefinedMessageSubscriptionSchema),
  })

export const delete20100401AccountsAccountSidCallsCallSidUserDefinedMessageSubscriptionsSidJsonHandler =
  defineHandler({
    param: Schema.toStandardSchemaV1(
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
  })
