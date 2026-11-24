import { defineHandler } from 'hono/factory'
import * as z from 'zod'

export const AccountEnumStatusSchema = z
  .enum(['active', 'suspended', 'closed'])
  .meta({
    description:
      'The status of this account. Usually `active`, but can be `suspended` or `closed`.',
  })

export type AccountEnumStatus = z.infer<typeof AccountEnumStatusSchema>

export const AccountEnumTypeSchema = z
  .enum(['Trial', 'Full'])
  .meta({ description: "The type of this account. Either `Trial` or `Full` if it's been upgraded" })

export type AccountEnumType = z.infer<typeof AccountEnumTypeSchema>

export const ApiV2010AccountSchema = z.object({
  auth_token: z
    .string()
    .nullable()
    .meta({
      description:
        'The authorization token for this account. This token should be kept a secret, so no sharing.',
    })
    .exactOptional(),
  date_created: z
    .string()
    .nullable()
    .meta({ description: 'The date that this account was created, in GMT in RFC 2822 format' })
    .exactOptional(),
  date_updated: z
    .string()
    .nullable()
    .meta({
      description: 'The date that this account was last updated, in GMT in RFC 2822 format.',
    })
    .exactOptional(),
  friendly_name: z
    .string()
    .nullable()
    .meta({
      description:
        'A human readable description of this account, up to 64 characters long. By default the FriendlyName is your email address.',
    })
    .exactOptional(),
  owner_account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        "The unique 34 character id that represents the parent of this account. The OwnerAccountSid of a parent account is it's own sid.",
    })
    .exactOptional(),
  sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({ description: 'A 34 character string that uniquely identifies this resource.' })
    .exactOptional(),
  status: AccountEnumStatusSchema.exactOptional(),
  subresource_uris: z
    .object({})
    .nullable()
    .meta({ description: 'A Map of various subresources available for the given Account Instance' })
    .exactOptional(),
  type: AccountEnumTypeSchema.exactOptional(),
  uri: z
    .string()
    .nullable()
    .meta({ description: 'The URI for this resource, relative to `https://api.twilio.com`' })
    .exactOptional(),
})

export type ApiV2010Account = z.infer<typeof ApiV2010AccountSchema>

export const ApiV2010AccountAddressSchema = z.object({
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that is responsible for the Address resource.',
    })
    .exactOptional(),
  city: z
    .string()
    .nullable()
    .meta({ description: 'The city in which the address is located.' })
    .exactOptional(),
  customer_name: z
    .string()
    .nullable()
    .meta({
      description:
        'The name associated with the address.This property has a maximum length of 16 4-byte characters, or 21 3-byte characters.',
    })
    .exactOptional(),
  date_created: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  date_updated: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  friendly_name: z
    .string()
    .nullable()
    .meta({ description: 'The string that you assigned to describe the resource.' })
    .exactOptional(),
  iso_country: z
    .string()
    .nullable()
    .meta({ description: 'The ISO country code of the address.' })
    .exactOptional(),
  postal_code: z
    .string()
    .nullable()
    .meta({ description: 'The postal code of the address.' })
    .exactOptional(),
  region: z
    .string()
    .nullable()
    .meta({ description: 'The state or region of the address.' })
    .exactOptional(),
  sid: z
    .string()
    .regex(/^AD[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description: 'The unique string that that we created to identify the Address resource.',
    })
    .exactOptional(),
  street: z
    .string()
    .nullable()
    .meta({ description: 'The number and street address of the address.' })
    .exactOptional(),
  uri: z
    .string()
    .nullable()
    .meta({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' })
    .exactOptional(),
  emergency_enabled: z
    .boolean()
    .nullable()
    .meta({ description: 'Whether emergency calling has been enabled on this number.' })
    .exactOptional(),
  validated: z
    .boolean()
    .nullable()
    .meta({
      description:
        "Whether the address has been validated to comply with local regulation. In countries that require valid addresses, an invalid address will not be accepted. `true` indicates the Address has been validated. `false` indicate the country doesn't require validation or the Address is not valid.",
    })
    .exactOptional(),
  verified: z
    .boolean()
    .nullable()
    .meta({
      description:
        "Whether the address has been verified to comply with regulation. In countries that require valid addresses, an invalid address will not be accepted. `true` indicates the Address has been verified. `false` indicate the country doesn't require verified or the Address is not valid.",
    })
    .exactOptional(),
  street_secondary: z
    .string()
    .nullable()
    .meta({ description: 'The additional number and street address of the address.' })
    .exactOptional(),
})

export type ApiV2010AccountAddress = z.infer<typeof ApiV2010AccountAddressSchema>

export const ApiV2010AccountApplicationSchema = z.object({
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Application resource.',
    })
    .exactOptional(),
  api_version: z
    .string()
    .nullable()
    .meta({ description: 'The API version used to start a new TwiML session.' })
    .exactOptional(),
  date_created: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  date_updated: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  friendly_name: z
    .string()
    .nullable()
    .meta({ description: 'The string that you assigned to describe the resource.' })
    .exactOptional(),
  message_status_callback: z
    .url()
    .nullable()
    .meta({
      description:
        'The URL we call using a POST method to send message status information to your application.',
    })
    .exactOptional(),
  sid: z
    .string()
    .regex(/^AP[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description: 'The unique string that that we created to identify the Application resource.',
    })
    .exactOptional(),
  sms_fallback_method: z
    .enum(['GET', 'POST'])
    .nullable()
    .meta({
      description: 'The HTTP method we use to call `sms_fallback_url`. Can be: `GET` or `POST`.',
    })
    .exactOptional(),
  sms_fallback_url: z
    .url()
    .nullable()
    .meta({
      description:
        'The URL that we call when an error occurs while retrieving or executing the TwiML from `sms_url`.',
    })
    .exactOptional(),
  sms_method: z
    .enum(['GET', 'POST'])
    .nullable()
    .meta({ description: 'The HTTP method we use to call `sms_url`. Can be: `GET` or `POST`.' })
    .exactOptional(),
  sms_status_callback: z
    .url()
    .nullable()
    .meta({
      description:
        'The URL we call using a POST method to send status information to your application about SMS messages that refer to the application.',
    })
    .exactOptional(),
  sms_url: z
    .url()
    .nullable()
    .meta({
      description: 'The URL we call when the phone number receives an incoming SMS message.',
    })
    .exactOptional(),
  status_callback: z
    .url()
    .nullable()
    .meta({
      description:
        'The URL we call using the `status_callback_method` to send status information to your application.',
    })
    .exactOptional(),
  status_callback_method: z
    .enum(['GET', 'POST'])
    .nullable()
    .meta({
      description: 'The HTTP method we use to call `status_callback`. Can be: `GET` or `POST`.',
    })
    .exactOptional(),
  uri: z
    .string()
    .nullable()
    .meta({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' })
    .exactOptional(),
  voice_caller_id_lookup: z
    .boolean()
    .nullable()
    .meta({
      description:
        "Whether we look up the caller's caller-ID name from the CNAM database (additional charges apply). Can be: `true` or `false`.",
    })
    .exactOptional(),
  voice_fallback_method: z
    .enum(['GET', 'POST'])
    .nullable()
    .meta({
      description: 'The HTTP method we use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
    })
    .exactOptional(),
  voice_fallback_url: z
    .url()
    .nullable()
    .meta({
      description:
        'The URL that we call when an error occurs retrieving or executing the TwiML requested by `url`.',
    })
    .exactOptional(),
  voice_method: z
    .enum(['GET', 'POST'])
    .nullable()
    .meta({ description: 'The HTTP method we use to call `voice_url`. Can be: `GET` or `POST`.' })
    .exactOptional(),
  voice_url: z
    .url()
    .nullable()
    .meta({
      description:
        'The URL we call when the phone number assigned to this application receives a call.',
    })
    .exactOptional(),
  public_application_connect_enabled: z
    .boolean()
    .nullable()
    .meta({
      description:
        'Whether to allow other Twilio accounts to dial this applicaton using Dial verb. Can be: `true` or `false`.',
    })
    .exactOptional(),
})

export type ApiV2010AccountApplication = z.infer<typeof ApiV2010AccountApplicationSchema>

export const AuthorizedConnectAppEnumPermissionSchema = z
  .enum(['get-all', 'post-all'])
  .meta({
    description:
      'The set of permissions that you authorized for the Connect App.  Can be: `get-all` or `post-all`.',
  })

export type AuthorizedConnectAppEnumPermission = z.infer<
  typeof AuthorizedConnectAppEnumPermissionSchema
>

export const ApiV2010AccountAuthorizedConnectAppSchema = z.object({
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the AuthorizedConnectApp resource.',
    })
    .exactOptional(),
  connect_app_company_name: z
    .string()
    .nullable()
    .meta({ description: 'The company name set for the Connect App.' })
    .exactOptional(),
  connect_app_description: z
    .string()
    .nullable()
    .meta({ description: 'A detailed description of the Connect App.' })
    .exactOptional(),
  connect_app_friendly_name: z
    .string()
    .nullable()
    .meta({ description: 'The name of the Connect App.' })
    .exactOptional(),
  connect_app_homepage_url: z
    .url()
    .nullable()
    .meta({ description: 'The public URL for the Connect App.' })
    .exactOptional(),
  connect_app_sid: z
    .string()
    .regex(/^CN[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({ description: 'The SID that we assigned to the Connect App.' })
    .exactOptional(),
  permissions: z
    .array(AuthorizedConnectAppEnumPermissionSchema)
    .nullable()
    .meta({
      description:
        'The set of permissions that you authorized for the Connect App.  Can be: `get-all` or `post-all`.',
    })
    .exactOptional(),
  uri: z
    .string()
    .nullable()
    .meta({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' })
    .exactOptional(),
})

export type ApiV2010AccountAuthorizedConnectApp = z.infer<
  typeof ApiV2010AccountAuthorizedConnectAppSchema
>

export const ApiV2010AccountAvailablePhoneNumberCountrySchema = z.object({
  country_code: z
    .string()
    .nullable()
    .meta({
      description:
        'The [ISO-3166-1](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code of the country.',
    })
    .exactOptional(),
  country: z.string().nullable().meta({ description: 'The name of the country.' }).exactOptional(),
  uri: z
    .url()
    .nullable()
    .meta({ description: 'The URI of the Country resource, relative to `https://api.twilio.com`.' })
    .exactOptional(),
  beta: z
    .boolean()
    .nullable()
    .meta({
      description:
        'Whether all phone numbers available in the country are new to the Twilio platform. `true` if they are and `false` if all numbers are not in the Twilio Phone Number Beta program.',
    })
    .exactOptional(),
  subresource_uris: z
    .object({})
    .nullable()
    .meta({
      description:
        'A list of related AvailablePhoneNumber resources identified by their URIs relative to `https://api.twilio.com`.',
    })
    .exactOptional(),
})

export type ApiV2010AccountAvailablePhoneNumberCountry = z.infer<
  typeof ApiV2010AccountAvailablePhoneNumberCountrySchema
>

export const ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberLocalSchema = z.object({
  friendly_name: z
    .string()
    .nullable()
    .meta({ description: 'A formatted version of the phone number.' })
    .exactOptional(),
  phone_number: z
    .string()
    .nullable()
    .meta({
      description:
        'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
    })
    .exactOptional(),
  lata: z
    .string()
    .nullable()
    .meta({
      description:
        'The [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) of this phone number. Available for only phone numbers from the US and Canada.',
    })
    .exactOptional(),
  locality: z
    .string()
    .nullable()
    .meta({ description: "The locality or city of this phone number's location." })
    .exactOptional(),
  rate_center: z
    .string()
    .nullable()
    .meta({
      description:
        'The [rate center](https://en.wikipedia.org/wiki/Telephone_exchange) of this phone number. Available for only phone numbers from the US and Canada.',
    })
    .exactOptional(),
  latitude: z
    .number()
    .nullable()
    .meta({
      description:
        "The latitude of this phone number's location. Available for only phone numbers from the US and Canada.",
    })
    .exactOptional(),
  longitude: z
    .number()
    .nullable()
    .meta({
      description:
        "The longitude of this phone number's location. Available for only phone numbers from the US and Canada.",
    })
    .exactOptional(),
  region: z
    .string()
    .nullable()
    .meta({
      description:
        "The two-letter state or province abbreviation of this phone number's location. Available for only phone numbers from the US and Canada.",
    })
    .exactOptional(),
  postal_code: z
    .string()
    .nullable()
    .meta({
      description:
        "The postal or ZIP code of this phone number's location. Available for only phone numbers from the US and Canada.",
    })
    .exactOptional(),
  iso_country: z
    .string()
    .nullable()
    .meta({
      description:
        'The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of this phone number.',
    })
    .exactOptional(),
  address_requirements: z
    .string()
    .nullable()
    .meta({
      description:
        "The type of [Address](https://www.twilio.com/docs/usage/api/address) resource the phone number requires. Can be: `none`, `any`, `local`, or `foreign`. `none` means no address is required. `any` means an address is required, but it can be anywhere in the world. `local` means an address in the phone number's country is required. `foreign` means an address outside of the phone number's country is required.",
    })
    .exactOptional(),
  beta: z
    .boolean()
    .nullable()
    .meta({
      description:
        'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
    })
    .exactOptional(),
  capabilities: z
    .object({
      mms: z.boolean().exactOptional(),
      sms: z.boolean().exactOptional(),
      voice: z.boolean().exactOptional(),
      fax: z.boolean().exactOptional(),
    })
    .nullable()
    .meta({
      description:
        'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are: `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
    })
    .exactOptional(),
})

export type ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberLocal = z.infer<
  typeof ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberLocalSchema
>

export const ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMachineToMachineSchema =
  z.object({
    friendly_name: z
      .string()
      .nullable()
      .meta({ description: 'A formatted version of the phone number.' })
      .exactOptional(),
    phone_number: z
      .string()
      .nullable()
      .meta({
        description:
          'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
      })
      .exactOptional(),
    lata: z
      .string()
      .nullable()
      .meta({
        description:
          'The [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) of this phone number. Available for only phone numbers from the US and Canada.',
      })
      .exactOptional(),
    locality: z
      .string()
      .nullable()
      .meta({ description: "The locality or city of this phone number's location." })
      .exactOptional(),
    rate_center: z
      .string()
      .nullable()
      .meta({
        description:
          'The [rate center](https://en.wikipedia.org/wiki/Telephone_exchange) of this phone number. Available for only phone numbers from the US and Canada.',
      })
      .exactOptional(),
    latitude: z
      .number()
      .nullable()
      .meta({
        description:
          "The latitude of this phone number's location. Available for only phone numbers from the US and Canada.",
      })
      .exactOptional(),
    longitude: z
      .number()
      .nullable()
      .meta({
        description:
          "The longitude of this phone number's location. Available for only phone numbers from the US and Canada.",
      })
      .exactOptional(),
    region: z
      .string()
      .nullable()
      .meta({
        description:
          "The two-letter state or province abbreviation of this phone number's location. Available for only phone numbers from the US and Canada.",
      })
      .exactOptional(),
    postal_code: z
      .string()
      .nullable()
      .meta({
        description:
          "The postal or ZIP code of this phone number's location. Available for only phone numbers from the US and Canada.",
      })
      .exactOptional(),
    iso_country: z
      .string()
      .nullable()
      .meta({
        description:
          'The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of this phone number.',
      })
      .exactOptional(),
    address_requirements: z
      .string()
      .nullable()
      .meta({
        description:
          "The type of [Address](https://www.twilio.com/docs/usage/api/address) resource the phone number requires. Can be: `none`, `any`, `local`, or `foreign`. `none` means no address is required. `any` means an address is required, but it can be anywhere in the world. `local` means an address in the phone number's country is required. `foreign` means an address outside of the phone number's country is required.",
      })
      .exactOptional(),
    beta: z
      .boolean()
      .nullable()
      .meta({
        description:
          'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
      })
      .exactOptional(),
    capabilities: z
      .object({
        mms: z.boolean().exactOptional(),
        sms: z.boolean().exactOptional(),
        voice: z.boolean().exactOptional(),
        fax: z.boolean().exactOptional(),
      })
      .nullable()
      .meta({
        description:
          'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are: `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
      })
      .exactOptional(),
  })

export type ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMachineToMachine =
  z.infer<
    typeof ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMachineToMachineSchema
  >

export const ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMobileSchema = z.object({
  friendly_name: z
    .string()
    .nullable()
    .meta({ description: 'A formatted version of the phone number.' })
    .exactOptional(),
  phone_number: z
    .string()
    .nullable()
    .meta({
      description:
        'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
    })
    .exactOptional(),
  lata: z
    .string()
    .nullable()
    .meta({
      description:
        'The [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) of this phone number. Available for only phone numbers from the US and Canada.',
    })
    .exactOptional(),
  locality: z
    .string()
    .nullable()
    .meta({ description: "The locality or city of this phone number's location." })
    .exactOptional(),
  rate_center: z
    .string()
    .nullable()
    .meta({
      description:
        'The [rate center](https://en.wikipedia.org/wiki/Telephone_exchange) of this phone number. Available for only phone numbers from the US and Canada.',
    })
    .exactOptional(),
  latitude: z
    .number()
    .nullable()
    .meta({
      description:
        "The latitude of this phone number's location. Available for only phone numbers from the US and Canada.",
    })
    .exactOptional(),
  longitude: z
    .number()
    .nullable()
    .meta({
      description:
        "The longitude of this phone number's location. Available for only phone numbers from the US and Canada.",
    })
    .exactOptional(),
  region: z
    .string()
    .nullable()
    .meta({
      description:
        "The two-letter state or province abbreviation of this phone number's location. Available for only phone numbers from the US and Canada.",
    })
    .exactOptional(),
  postal_code: z
    .string()
    .nullable()
    .meta({
      description:
        "The postal or ZIP code of this phone number's location. Available for only phone numbers from the US and Canada.",
    })
    .exactOptional(),
  iso_country: z
    .string()
    .nullable()
    .meta({
      description:
        'The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of this phone number.',
    })
    .exactOptional(),
  address_requirements: z
    .string()
    .nullable()
    .meta({
      description:
        "The type of [Address](https://www.twilio.com/docs/usage/api/address) resource the phone number requires. Can be: `none`, `any`, `local`, or `foreign`. `none` means no address is required. `any` means an address is required, but it can be anywhere in the world. `local` means an address in the phone number's country is required. `foreign` means an address outside of the phone number's country is required.",
    })
    .exactOptional(),
  beta: z
    .boolean()
    .nullable()
    .meta({
      description:
        'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
    })
    .exactOptional(),
  capabilities: z
    .object({
      mms: z.boolean().exactOptional(),
      sms: z.boolean().exactOptional(),
      voice: z.boolean().exactOptional(),
      fax: z.boolean().exactOptional(),
    })
    .nullable()
    .meta({
      description:
        'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are: `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
    })
    .exactOptional(),
})

export type ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMobile = z.infer<
  typeof ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMobileSchema
>

export const ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberNationalSchema =
  z.object({
    friendly_name: z
      .string()
      .nullable()
      .meta({ description: 'A formatted version of the phone number.' })
      .exactOptional(),
    phone_number: z
      .string()
      .nullable()
      .meta({
        description:
          'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
      })
      .exactOptional(),
    lata: z
      .string()
      .nullable()
      .meta({
        description:
          'The [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) of this phone number. Available for only phone numbers from the US and Canada.',
      })
      .exactOptional(),
    locality: z
      .string()
      .nullable()
      .meta({ description: "The locality or city of this phone number's location." })
      .exactOptional(),
    rate_center: z
      .string()
      .nullable()
      .meta({
        description:
          'The [rate center](https://en.wikipedia.org/wiki/Telephone_exchange) of this phone number. Available for only phone numbers from the US and Canada.',
      })
      .exactOptional(),
    latitude: z
      .number()
      .nullable()
      .meta({
        description:
          "The latitude of this phone number's location. Available for only phone numbers from the US and Canada.",
      })
      .exactOptional(),
    longitude: z
      .number()
      .nullable()
      .meta({
        description:
          "The longitude of this phone number's location. Available for only phone numbers from the US and Canada.",
      })
      .exactOptional(),
    region: z
      .string()
      .nullable()
      .meta({
        description:
          "The two-letter state or province abbreviation of this phone number's location. Available for only phone numbers from the US and Canada.",
      })
      .exactOptional(),
    postal_code: z
      .string()
      .nullable()
      .meta({
        description:
          "The postal or ZIP code of this phone number's location. Available for only phone numbers from the US and Canada.",
      })
      .exactOptional(),
    iso_country: z
      .string()
      .nullable()
      .meta({
        description:
          'The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of this phone number.',
      })
      .exactOptional(),
    address_requirements: z
      .string()
      .nullable()
      .meta({
        description:
          "The type of [Address](https://www.twilio.com/docs/usage/api/address) resource the phone number requires. Can be: `none`, `any`, `local`, or `foreign`. `none` means no address is required. `any` means an address is required, but it can be anywhere in the world. `local` means an address in the phone number's country is required. `foreign` means an address outside of the phone number's country is required.",
      })
      .exactOptional(),
    beta: z
      .boolean()
      .nullable()
      .meta({
        description:
          'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
      })
      .exactOptional(),
    capabilities: z
      .object({
        mms: z.boolean().exactOptional(),
        sms: z.boolean().exactOptional(),
        voice: z.boolean().exactOptional(),
        fax: z.boolean().exactOptional(),
      })
      .nullable()
      .meta({
        description:
          'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are: `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
      })
      .exactOptional(),
  })

export type ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberNational = z.infer<
  typeof ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberNationalSchema
>

export const ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberSharedCostSchema =
  z.object({
    friendly_name: z
      .string()
      .nullable()
      .meta({ description: 'A formatted version of the phone number.' })
      .exactOptional(),
    phone_number: z
      .string()
      .nullable()
      .meta({
        description:
          'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
      })
      .exactOptional(),
    lata: z
      .string()
      .nullable()
      .meta({
        description:
          'The [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) of this phone number. Available for only phone numbers from the US and Canada.',
      })
      .exactOptional(),
    locality: z
      .string()
      .nullable()
      .meta({ description: "The locality or city of this phone number's location." })
      .exactOptional(),
    rate_center: z
      .string()
      .nullable()
      .meta({
        description:
          'The [rate center](https://en.wikipedia.org/wiki/Telephone_exchange) of this phone number. Available for only phone numbers from the US and Canada.',
      })
      .exactOptional(),
    latitude: z
      .number()
      .nullable()
      .meta({
        description:
          "The latitude of this phone number's location. Available for only phone numbers from the US and Canada.",
      })
      .exactOptional(),
    longitude: z
      .number()
      .nullable()
      .meta({
        description:
          "The longitude of this phone number's location. Available for only phone numbers from the US and Canada.",
      })
      .exactOptional(),
    region: z
      .string()
      .nullable()
      .meta({
        description:
          "The two-letter state or province abbreviation of this phone number's location. Available for only phone numbers from the US and Canada.",
      })
      .exactOptional(),
    postal_code: z
      .string()
      .nullable()
      .meta({
        description:
          "The postal or ZIP code of this phone number's location. Available for only phone numbers from the US and Canada.",
      })
      .exactOptional(),
    iso_country: z
      .string()
      .nullable()
      .meta({
        description:
          'The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of this phone number.',
      })
      .exactOptional(),
    address_requirements: z
      .string()
      .nullable()
      .meta({
        description:
          "The type of [Address](https://www.twilio.com/docs/usage/api/address) resource the phone number requires. Can be: `none`, `any`, `local`, or `foreign`. `none` means no address is required. `any` means an address is required, but it can be anywhere in the world. `local` means an address in the phone number's country is required. `foreign` means an address outside of the phone number's country is required.",
      })
      .exactOptional(),
    beta: z
      .boolean()
      .nullable()
      .meta({
        description:
          'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
      })
      .exactOptional(),
    capabilities: z
      .object({
        mms: z.boolean().exactOptional(),
        sms: z.boolean().exactOptional(),
        voice: z.boolean().exactOptional(),
        fax: z.boolean().exactOptional(),
      })
      .nullable()
      .meta({
        description:
          'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are: `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
      })
      .exactOptional(),
  })

export type ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberSharedCost = z.infer<
  typeof ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberSharedCostSchema
>

export const ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberTollFreeSchema =
  z.object({
    friendly_name: z
      .string()
      .nullable()
      .meta({ description: 'A formatted version of the phone number.' })
      .exactOptional(),
    phone_number: z
      .string()
      .nullable()
      .meta({
        description:
          'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
      })
      .exactOptional(),
    lata: z
      .string()
      .nullable()
      .meta({
        description:
          'The [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) of this phone number. Available for only phone numbers from the US and Canada.',
      })
      .exactOptional(),
    locality: z
      .string()
      .nullable()
      .meta({ description: "The locality or city of this phone number's location." })
      .exactOptional(),
    rate_center: z
      .string()
      .nullable()
      .meta({
        description:
          'The [rate center](https://en.wikipedia.org/wiki/Telephone_exchange) of this phone number. Available for only phone numbers from the US and Canada.',
      })
      .exactOptional(),
    latitude: z
      .number()
      .nullable()
      .meta({
        description:
          "The latitude of this phone number's location. Available for only phone numbers from the US and Canada.",
      })
      .exactOptional(),
    longitude: z
      .number()
      .nullable()
      .meta({
        description:
          "The longitude of this phone number's location. Available for only phone numbers from the US and Canada.",
      })
      .exactOptional(),
    region: z
      .string()
      .nullable()
      .meta({
        description:
          "The two-letter state or province abbreviation of this phone number's location. Available for only phone numbers from the US and Canada.",
      })
      .exactOptional(),
    postal_code: z
      .string()
      .nullable()
      .meta({
        description:
          "The postal or ZIP code of this phone number's location. Available for only phone numbers from the US and Canada.",
      })
      .exactOptional(),
    iso_country: z
      .string()
      .nullable()
      .meta({
        description:
          'The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of this phone number.',
      })
      .exactOptional(),
    address_requirements: z
      .string()
      .nullable()
      .meta({
        description:
          "The type of [Address](https://www.twilio.com/docs/usage/api/address) resource the phone number requires. Can be: `none`, `any`, `local`, or `foreign`. `none` means no address is required. `any` means an address is required, but it can be anywhere in the world. `local` means an address in the phone number's country is required. `foreign` means an address outside of the phone number's country is required.",
      })
      .exactOptional(),
    beta: z
      .boolean()
      .nullable()
      .meta({
        description:
          'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
      })
      .exactOptional(),
    capabilities: z
      .object({
        mms: z.boolean().exactOptional(),
        sms: z.boolean().exactOptional(),
        voice: z.boolean().exactOptional(),
        fax: z.boolean().exactOptional(),
      })
      .nullable()
      .meta({
        description:
          'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are: `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
      })
      .exactOptional(),
  })

export type ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberTollFree = z.infer<
  typeof ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberTollFreeSchema
>

export const ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberVoipSchema = z.object({
  friendly_name: z
    .string()
    .nullable()
    .meta({ description: 'A formatted version of the phone number.' })
    .exactOptional(),
  phone_number: z
    .string()
    .nullable()
    .meta({
      description:
        'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
    })
    .exactOptional(),
  lata: z
    .string()
    .nullable()
    .meta({
      description:
        'The [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) of this phone number. Available for only phone numbers from the US and Canada.',
    })
    .exactOptional(),
  locality: z
    .string()
    .nullable()
    .meta({ description: "The locality or city of this phone number's location." })
    .exactOptional(),
  rate_center: z
    .string()
    .nullable()
    .meta({
      description:
        'The [rate center](https://en.wikipedia.org/wiki/Telephone_exchange) of this phone number. Available for only phone numbers from the US and Canada.',
    })
    .exactOptional(),
  latitude: z
    .number()
    .nullable()
    .meta({
      description:
        "The latitude of this phone number's location. Available for only phone numbers from the US and Canada.",
    })
    .exactOptional(),
  longitude: z
    .number()
    .nullable()
    .meta({
      description:
        "The longitude of this phone number's location. Available for only phone numbers from the US and Canada.",
    })
    .exactOptional(),
  region: z
    .string()
    .nullable()
    .meta({
      description:
        "The two-letter state or province abbreviation of this phone number's location. Available for only phone numbers from the US and Canada.",
    })
    .exactOptional(),
  postal_code: z
    .string()
    .nullable()
    .meta({
      description:
        "The postal or ZIP code of this phone number's location. Available for only phone numbers from the US and Canada.",
    })
    .exactOptional(),
  iso_country: z
    .string()
    .nullable()
    .meta({
      description:
        'The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of this phone number.',
    })
    .exactOptional(),
  address_requirements: z
    .string()
    .nullable()
    .meta({
      description:
        "The type of [Address](https://www.twilio.com/docs/usage/api/address) resource the phone number requires. Can be: `none`, `any`, `local`, or `foreign`. `none` means no address is required. `any` means an address is required, but it can be anywhere in the world. `local` means an address in the phone number's country is required. `foreign` means an address outside of the phone number's country is required.",
    })
    .exactOptional(),
  beta: z
    .boolean()
    .nullable()
    .meta({
      description:
        'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
    })
    .exactOptional(),
  capabilities: z
    .object({
      mms: z.boolean().exactOptional(),
      sms: z.boolean().exactOptional(),
      voice: z.boolean().exactOptional(),
      fax: z.boolean().exactOptional(),
    })
    .nullable()
    .meta({
      description:
        'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are: `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
    })
    .exactOptional(),
})

export type ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberVoip = z.infer<
  typeof ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberVoipSchema
>

export const ApiV2010AccountBalanceSchema = z.object({
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({ description: 'The unique SID identifier of the Account.' })
    .exactOptional(),
  balance: z
    .string()
    .nullable()
    .meta({
      description:
        'The balance of the Account, in units specified by the unit parameter. Balance changes may not be reflected immediately. Child accounts do not contain balance information',
    })
    .exactOptional(),
  currency: z
    .string()
    .nullable()
    .meta({ description: 'The units of currency for the account balance' })
    .exactOptional(),
})

export type ApiV2010AccountBalance = z.infer<typeof ApiV2010AccountBalanceSchema>

export const CallEnumStatusSchema = z
  .enum([
    'queued',
    'ringing',
    'in-progress',
    'completed',
    'busy',
    'failed',
    'no-answer',
    'canceled',
  ])
  .meta({
    description:
      'The status of this call. Can be: `queued`, `ringing`, `in-progress`, `canceled`, `completed`, `failed`, `busy` or `no-answer`. See [Call Status Values](https://www.twilio.com/docs/voice/api/call-resource#call-status-values) below for more information.',
  })

export type CallEnumStatus = z.infer<typeof CallEnumStatusSchema>

export const ApiV2010AccountCallSchema = z.object({
  sid: z
    .string()
    .regex(/^CA[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({ description: 'The unique string that we created to identify this Call resource.' })
    .exactOptional(),
  date_created: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in UTC that this resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  date_updated: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in UTC that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  parent_call_sid: z
    .string()
    .regex(/^CA[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({ description: 'The SID that identifies the call that created this leg.' })
    .exactOptional(),
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Call resource.',
    })
    .exactOptional(),
  to: z
    .string()
    .nullable()
    .meta({
      description:
        'The phone number, SIP address, Client identifier or SIM SID that received this call. Phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +16175551212). SIP addresses are formatted as `name@company.com`. Client identifiers are formatted `client:name`. SIM SIDs are formatted as `sim:sid`.',
    })
    .exactOptional(),
  to_formatted: z
    .string()
    .nullable()
    .meta({
      description:
        'The phone number, SIP address or Client identifier that received this call. Formatted for display. Non-North American phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +442071838750).',
    })
    .exactOptional(),
  from: z
    .string()
    .nullable()
    .meta({
      description:
        'The phone number, SIP address, Client identifier or SIM SID that made this call. Phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +16175551212). SIP addresses are formatted as `name@company.com`. Client identifiers are formatted `client:name`. SIM SIDs are formatted as `sim:sid`.',
    })
    .exactOptional(),
  from_formatted: z
    .string()
    .nullable()
    .meta({
      description:
        'The calling phone number, SIP address, or Client identifier formatted for display. Non-North American phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +442071838750).',
    })
    .exactOptional(),
  phone_number_sid: z
    .string()
    .regex(/^PN[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'If the call was inbound, this is the SID of the IncomingPhoneNumber resource that received the call. If the call was outbound, it is the SID of the OutgoingCallerId resource from which the call was placed.',
    })
    .exactOptional(),
  status: CallEnumStatusSchema.exactOptional(),
  start_time: z
    .string()
    .nullable()
    .meta({
      description:
        'The start time of the call, given as UTC in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format. Empty if the call has not yet been dialed.',
    })
    .exactOptional(),
  end_time: z
    .string()
    .nullable()
    .meta({
      description:
        'The time the call ended, given as UTC in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format. Empty if the call did not complete successfully.',
    })
    .exactOptional(),
  duration: z
    .string()
    .nullable()
    .meta({
      description:
        'The length of the call in seconds. This value is empty for busy, failed, unanswered, or ongoing calls.',
    })
    .exactOptional(),
  price: z
    .string()
    .nullable()
    .meta({
      description:
        'The charge for this call, in the currency associated with the account. Populated after the call is completed. May not be immediately available. The price associated with a call only reflects the charge for connectivity.  Charges for other call-related features such as Answering Machine Detection, Text-To-Speech, and SIP REFER are not included in this value.',
    })
    .exactOptional(),
  price_unit: z
    .string()
    .nullable()
    .meta({
      description:
        'The currency in which `Price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format (e.g., `USD`, `EUR`, `JPY`). Always capitalized for calls.',
    })
    .exactOptional(),
  direction: z
    .string()
    .nullable()
    .meta({
      description:
        'A string describing the direction of the call. Can be: `inbound` for inbound calls, `outbound-api` for calls initiated via the REST API or `outbound-dial` for calls initiated by a `<Dial>` verb. Using [Elastic SIP Trunking](https://www.twilio.com/docs/sip-trunking), the values can be [`trunking-terminating`](https://www.twilio.com/docs/sip-trunking#termination) for outgoing calls from your communications infrastructure to the PSTN or [`trunking-originating`](https://www.twilio.com/docs/sip-trunking#origination) for incoming calls to your communications infrastructure from the PSTN.',
    })
    .exactOptional(),
  answered_by: z
    .string()
    .nullable()
    .meta({
      description:
        'Either `human` or `machine` if this call was initiated with answering machine detection. Empty otherwise.',
    })
    .exactOptional(),
  api_version: z
    .string()
    .nullable()
    .meta({ description: 'The API version used to create the call.' })
    .exactOptional(),
  forwarded_from: z
    .string()
    .nullable()
    .meta({
      description:
        'The forwarding phone number if this call was an incoming call forwarded from another number (depends on carrier supporting forwarding). Otherwise, empty.',
    })
    .exactOptional(),
  group_sid: z
    .string()
    .regex(/^GP[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The Group SID associated with this call. If no Group is associated with the call, the field is empty.',
    })
    .exactOptional(),
  caller_name: z
    .string()
    .nullable()
    .meta({
      description:
        "The caller's name if this call was an incoming call to a phone number with caller ID Lookup enabled. Otherwise, empty.",
    })
    .exactOptional(),
  queue_time: z
    .string()
    .nullable()
    .meta({ description: 'The wait time in milliseconds before the call is placed.' })
    .exactOptional(),
  stir_verstat: z
    .string()
    .nullable()
    .meta({
      description:
        'The STIR/SHAKEN verification status of the call, for example `TN-Validation-Passed-A`. Empty if the incoming call had no STIR/SHAKEN information.',
    })
    .exactOptional(),
  trunk_sid: z
    .string()
    .regex(/^TK[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The unique identifier of the trunk resource that was used for this call. The field is empty if the call was not made using a SIP trunk or if the call is not terminated.',
    })
    .exactOptional(),
  uri: z
    .string()
    .nullable()
    .meta({ description: 'The URI of this resource, relative to `https://api.twilio.com`.' })
    .exactOptional(),
  subresource_uris: z
    .object({})
    .nullable()
    .meta({
      description:
        'A list of subresources available to this call, identified by their URIs relative to `https://api.twilio.com`.',
    })
    .exactOptional(),
})

export type ApiV2010AccountCall = z.infer<typeof ApiV2010AccountCallSchema>

export const CallEnumEventSchema = z.enum(['initiated', 'ringing', 'answered', 'completed'])

export type CallEnumEvent = z.infer<typeof CallEnumEventSchema>

export const CallEnumUpdateStatusSchema = z.enum(['canceled', 'completed'])

export type CallEnumUpdateStatus = z.infer<typeof CallEnumUpdateStatusSchema>

export const ApiV2010AccountCallCallEventSchema = z.object({
  request: z
    .any()
    .nullable()
    .meta({ description: 'Contains a dictionary representing the request of the call.' })
    .exactOptional(),
  response: z
    .any()
    .nullable()
    .meta({
      description:
        'Contains a dictionary representing the call response, including a list of the call events.',
    })
    .exactOptional(),
})

export type ApiV2010AccountCallCallEvent = z.infer<typeof ApiV2010AccountCallCallEventSchema>

export const ApiV2010AccountCallCallNotificationSchema = z.object({
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Call Notification resource.',
    })
    .exactOptional(),
  api_version: z
    .string()
    .nullable()
    .meta({ description: 'The API version used to create the Call Notification resource.' })
    .exactOptional(),
  call_sid: z
    .string()
    .regex(/^CA[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Call Notification resource is associated with.',
    })
    .exactOptional(),
  date_created: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  date_updated: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  error_code: z
    .string()
    .nullable()
    .meta({
      description:
        'A unique error code for the error condition that is described in our [Error Dictionary](https://www.twilio.com/docs/api/errors).',
    })
    .exactOptional(),
  log: z
    .string()
    .nullable()
    .meta({
      description:
        'An integer log level that corresponds to the type of notification: `0` is ERROR, `1` is WARNING.',
    })
    .exactOptional(),
  message_date: z
    .string()
    .nullable()
    .meta({
      description:
        'The date the notification was actually generated in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. Message buffering can cause this value to differ from `date_created`.',
    })
    .exactOptional(),
  message_text: z
    .string()
    .nullable()
    .meta({ description: 'The text of the notification.' })
    .exactOptional(),
  more_info: z
    .url()
    .nullable()
    .meta({
      description:
        'The URL for more information about the error condition. This value is a page in our [Error Dictionary](https://www.twilio.com/docs/api/errors).',
    })
    .exactOptional(),
  request_method: z
    .enum(['GET', 'POST'])
    .nullable()
    .meta({
      description:
        'The HTTP method used to generate the notification. If the notification was generated during a phone call, this is the HTTP Method used to request the resource on your server. If the notification was generated by your use of our REST API, this is the HTTP method used to call the resource on our servers.',
    })
    .exactOptional(),
  request_url: z
    .url()
    .nullable()
    .meta({
      description:
        'The URL of the resource that generated the notification. If the notification was generated during a phone call, this is the URL of the resource on your server that caused the notification. If the notification was generated by your use of our REST API, this is the URL of the resource you called.',
    })
    .exactOptional(),
  sid: z
    .string()
    .regex(/^NO[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The unique string that that we created to identify the Call Notification resource.',
    })
    .exactOptional(),
  uri: z
    .string()
    .nullable()
    .meta({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' })
    .exactOptional(),
})

export type ApiV2010AccountCallCallNotification = z.infer<
  typeof ApiV2010AccountCallCallNotificationSchema
>

export const ApiV2010AccountCallCallNotificationInstanceSchema = z.object({
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Call Notification resource.',
    })
    .exactOptional(),
  api_version: z
    .string()
    .nullable()
    .meta({ description: 'The API version used to create the Call Notification resource.' })
    .exactOptional(),
  call_sid: z
    .string()
    .regex(/^CA[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Call Notification resource is associated with.',
    })
    .exactOptional(),
  date_created: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  date_updated: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  error_code: z
    .string()
    .nullable()
    .meta({
      description:
        'A unique error code for the error condition that is described in our [Error Dictionary](https://www.twilio.com/docs/api/errors).',
    })
    .exactOptional(),
  log: z
    .string()
    .nullable()
    .meta({
      description:
        'An integer log level that corresponds to the type of notification: `0` is ERROR, `1` is WARNING.',
    })
    .exactOptional(),
  message_date: z
    .string()
    .nullable()
    .meta({
      description:
        'The date the notification was actually generated in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. Message buffering can cause this value to differ from `date_created`.',
    })
    .exactOptional(),
  message_text: z
    .string()
    .nullable()
    .meta({ description: 'The text of the notification.' })
    .exactOptional(),
  more_info: z
    .url()
    .nullable()
    .meta({
      description:
        'The URL for more information about the error condition. This value is a page in our [Error Dictionary](https://www.twilio.com/docs/api/errors).',
    })
    .exactOptional(),
  request_method: z
    .enum(['GET', 'POST'])
    .nullable()
    .meta({
      description:
        'The HTTP method used to generate the notification. If the notification was generated during a phone call, this is the HTTP Method used to request the resource on your server. If the notification was generated by your use of our REST API, this is the HTTP method used to call the resource on our servers.',
    })
    .exactOptional(),
  request_url: z
    .url()
    .nullable()
    .meta({
      description:
        'The URL of the resource that generated the notification. If the notification was generated during a phone call, this is the URL of the resource on your server that caused the notification. If the notification was generated by your use of our REST API, this is the URL of the resource you called.',
    })
    .exactOptional(),
  request_variables: z
    .string()
    .nullable()
    .meta({
      description:
        'The HTTP GET or POST variables we sent to your server. However, if the notification was generated by our REST API, this contains the HTTP POST or PUT variables you sent to our API.',
    })
    .exactOptional(),
  response_body: z
    .string()
    .nullable()
    .meta({ description: 'The HTTP body returned by your server.' })
    .exactOptional(),
  response_headers: z
    .string()
    .nullable()
    .meta({ description: 'The HTTP headers returned by your server.' })
    .exactOptional(),
  sid: z
    .string()
    .regex(/^NO[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The unique string that that we created to identify the Call Notification resource.',
    })
    .exactOptional(),
  uri: z
    .string()
    .nullable()
    .meta({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' })
    .exactOptional(),
})

export type ApiV2010AccountCallCallNotificationInstance = z.infer<
  typeof ApiV2010AccountCallCallNotificationInstanceSchema
>

export const CallRecordingEnumStatusSchema = z
  .enum(['in-progress', 'paused', 'stopped', 'processing', 'completed', 'absent'])
  .meta({
    description:
      'The status of the recording. Can be: `processing`, `completed` and `absent`. For more detailed statuses on in-progress recordings, check out how to [Update a Recording Resource](https://www.twilio.com/docs/voice/api/recording#update-a-recording-resource).',
  })

export type CallRecordingEnumStatus = z.infer<typeof CallRecordingEnumStatusSchema>

export const CallRecordingEnumSourceSchema = z
  .enum([
    'DialVerb',
    'Conference',
    'OutboundAPI',
    'Trunking',
    'RecordVerb',
    'StartCallRecordingAPI',
    'StartConferenceRecordingAPI',
  ])
  .meta({
    description:
      'How the recording was created. Can be: `DialVerb`, `Conference`, `OutboundAPI`, `Trunking`, `RecordVerb`, `StartCallRecordingAPI`, and `StartConferenceRecordingAPI`.',
  })

export type CallRecordingEnumSource = z.infer<typeof CallRecordingEnumSourceSchema>

export const ApiV2010AccountCallCallRecordingSchema = z.object({
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording resource.',
    })
    .exactOptional(),
  api_version: z
    .string()
    .nullable()
    .meta({ description: 'The API version used to make the recording.' })
    .exactOptional(),
  call_sid: z
    .string()
    .regex(/^CA[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Recording resource is associated with.',
    })
    .exactOptional(),
  conference_sid: z
    .string()
    .regex(/^CF[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The Conference SID that identifies the conference associated with the recording, if a conference recording.',
    })
    .exactOptional(),
  date_created: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  date_updated: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  start_time: z
    .string()
    .nullable()
    .meta({
      description:
        'The start time of the recording in GMT and in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
    })
    .exactOptional(),
  duration: z
    .string()
    .nullable()
    .meta({ description: 'The length of the recording in seconds.' })
    .exactOptional(),
  sid: z
    .string()
    .regex(/^RE[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description: 'The unique string that that we created to identify the Recording resource.',
    })
    .exactOptional(),
  price: z
    .number()
    .nullable()
    .meta({
      description: 'The one-time cost of creating the recording in the `price_unit` currency.',
    })
    .exactOptional(),
  uri: z
    .string()
    .nullable()
    .meta({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' })
    .exactOptional(),
  encryption_details: z
    .any()
    .nullable()
    .meta({
      description:
        'How to decrypt the recording if it was encrypted using [Call Recording Encryption](https://www.twilio.com/docs/voice/tutorials/voice-recording-encryption) feature.',
    })
    .exactOptional(),
  price_unit: z
    .string()
    .nullable()
    .meta({ description: 'The currency used in the `price` property. Example: `USD`.' })
    .exactOptional(),
  status: CallRecordingEnumStatusSchema.exactOptional(),
  channels: z
    .int()
    .default(0)
    .meta({
      description:
        'The number of channels in the final recording file.  Can be: `1`, or `2`. Separating a two leg call into two separate channels of the recording file is supported in [Dial](https://www.twilio.com/docs/voice/twiml/dial#attributes-record) and [Outbound Rest API](https://www.twilio.com/docs/voice/make-calls) record options.',
    })
    .exactOptional(),
  source: CallRecordingEnumSourceSchema.exactOptional(),
  error_code: z
    .int()
    .nullable()
    .meta({
      description:
        'The error code that describes why the recording is `absent`. The error code is described in our [Error Dictionary](https://www.twilio.com/docs/api/errors). This value is null if the recording `status` is not `absent`.',
    })
    .exactOptional(),
  track: z
    .string()
    .nullable()
    .meta({ description: 'The recorded track. Can be: `inbound`, `outbound`, or `both`.' })
    .exactOptional(),
})

export type ApiV2010AccountCallCallRecording = z.infer<
  typeof ApiV2010AccountCallCallRecordingSchema
>

export const ConferenceEnumStatusSchema = z
  .enum(['init', 'in-progress', 'completed'])
  .meta({
    description: 'The status of this conference. Can be: `init`, `in-progress`, or `completed`.',
  })

export type ConferenceEnumStatus = z.infer<typeof ConferenceEnumStatusSchema>

export const ConferenceEnumReasonConferenceEndedSchema = z
  .enum([
    'conference-ended-via-api',
    'participant-with-end-conference-on-exit-left',
    'participant-with-end-conference-on-exit-kicked',
    'last-participant-kicked',
    'last-participant-left',
  ])
  .meta({
    description:
      'The reason why a conference ended. When a conference is in progress, will be `null`. When conference is completed, can be: `conference-ended-via-api`, `participant-with-end-conference-on-exit-left`, `participant-with-end-conference-on-exit-kicked`, `last-participant-kicked`, or `last-participant-left`.',
  })

export type ConferenceEnumReasonConferenceEnded = z.infer<
  typeof ConferenceEnumReasonConferenceEndedSchema
>

export const ApiV2010AccountConferenceSchema = z.object({
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Conference resource.',
    })
    .exactOptional(),
  date_created: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in UTC that this resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  date_updated: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in UTC that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  api_version: z
    .string()
    .nullable()
    .meta({ description: 'The API version used to create this conference.' })
    .exactOptional(),
  friendly_name: z
    .string()
    .nullable()
    .meta({
      description:
        'A string that you assigned to describe this conference room. Maximum length is 128 characters.',
    })
    .exactOptional(),
  region: z
    .string()
    .nullable()
    .meta({
      description:
        'A string that represents the Twilio Region where the conference audio was mixed. May be `us1`, `us2`, `ie1`,  `de1`, `sg1`, `br1`, `au1`, and `jp1`. Basic conference audio will always be mixed in `us1`. Global Conference audio will be mixed nearest to the majority of participants.',
    })
    .exactOptional(),
  sid: z
    .string()
    .regex(/^CF[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description: 'The unique, Twilio-provided string used to identify this Conference resource.',
    })
    .exactOptional(),
  status: ConferenceEnumStatusSchema.exactOptional(),
  uri: z
    .string()
    .nullable()
    .meta({ description: 'The URI of this resource, relative to `https://api.twilio.com`.' })
    .exactOptional(),
  subresource_uris: z
    .object({})
    .nullable()
    .meta({
      description:
        'A list of related resources identified by their URIs relative to `https://api.twilio.com`.',
    })
    .exactOptional(),
  reason_conference_ended: ConferenceEnumReasonConferenceEndedSchema.exactOptional(),
  call_sid_ending_conference: z
    .string()
    .regex(/^CA[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({ description: 'The call SID that caused the conference to end.' })
    .exactOptional(),
})

export type ApiV2010AccountConference = z.infer<typeof ApiV2010AccountConferenceSchema>

export const ConferenceEnumUpdateStatusSchema = z.literal('completed')

export type ConferenceEnumUpdateStatus = z.infer<typeof ConferenceEnumUpdateStatusSchema>

export const ConferenceRecordingEnumStatusSchema = z
  .enum(['in-progress', 'paused', 'stopped', 'processing', 'completed', 'absent'])
  .meta({
    description:
      'The status of the recording. Can be: `processing`, `completed` and `absent`. For more detailed statuses on in-progress recordings, check out how to [Update a Recording Resource](https://www.twilio.com/docs/voice/api/recording#update-a-recording-resource).',
  })

export type ConferenceRecordingEnumStatus = z.infer<typeof ConferenceRecordingEnumStatusSchema>

export const ConferenceRecordingEnumSourceSchema = z
  .enum([
    'DialVerb',
    'Conference',
    'OutboundAPI',
    'Trunking',
    'RecordVerb',
    'StartCallRecordingAPI',
    'StartConferenceRecordingAPI',
  ])
  .meta({
    description:
      'How the recording was created. Can be: `DialVerb`, `Conference`, `OutboundAPI`, `Trunking`, `RecordVerb`, `StartCallRecordingAPI`, `StartConferenceRecordingAPI`.',
  })

export type ConferenceRecordingEnumSource = z.infer<typeof ConferenceRecordingEnumSourceSchema>

export const ApiV2010AccountConferenceConferenceRecordingSchema = z.object({
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Conference Recording resource.',
    })
    .exactOptional(),
  api_version: z
    .string()
    .nullable()
    .meta({ description: 'The API version used to create the recording.' })
    .exactOptional(),
  call_sid: z
    .string()
    .regex(/^CA[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Conference Recording resource is associated with.',
    })
    .exactOptional(),
  conference_sid: z
    .string()
    .regex(/^CF[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The Conference SID that identifies the conference associated with the recording.',
    })
    .exactOptional(),
  date_created: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  date_updated: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  start_time: z
    .string()
    .nullable()
    .meta({
      description:
        'The start time of the recording in GMT and in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
    })
    .exactOptional(),
  duration: z
    .string()
    .nullable()
    .meta({ description: 'The length of the recording in seconds.' })
    .exactOptional(),
  sid: z
    .string()
    .regex(/^RE[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The unique string that that we created to identify the Conference Recording resource.',
    })
    .exactOptional(),
  price: z
    .string()
    .nullable()
    .meta({
      description: 'The one-time cost of creating the recording in the `price_unit` currency.',
    })
    .exactOptional(),
  price_unit: z
    .string()
    .nullable()
    .meta({ description: 'The currency used in the `price` property. Example: `USD`.' })
    .exactOptional(),
  status: ConferenceRecordingEnumStatusSchema.exactOptional(),
  channels: z
    .int()
    .default(0)
    .meta({
      description:
        'The number of channels in the final recording file.  Can be: `1`, or `2`. Separating a two leg call into two separate channels of the recording file is supported in [Dial](https://www.twilio.com/docs/voice/twiml/dial#attributes-record) and [Outbound Rest API](https://www.twilio.com/docs/voice/make-calls) record options.',
    })
    .exactOptional(),
  source: ConferenceRecordingEnumSourceSchema.exactOptional(),
  error_code: z
    .int()
    .nullable()
    .meta({
      description:
        'The error code that describes why the recording is `absent`. The error code is described in our [Error Dictionary](https://www.twilio.com/docs/api/errors). This value is null if the recording `status` is not `absent`.',
    })
    .exactOptional(),
  encryption_details: z
    .any()
    .nullable()
    .meta({
      description:
        'How to decrypt the recording if it was encrypted using [Call Recording Encryption](https://www.twilio.com/docs/voice/tutorials/voice-recording-encryption) feature.',
    })
    .exactOptional(),
  uri: z
    .string()
    .nullable()
    .meta({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' })
    .exactOptional(),
})

export type ApiV2010AccountConferenceConferenceRecording = z.infer<
  typeof ApiV2010AccountConferenceConferenceRecordingSchema
>

export const ConnectAppEnumPermissionSchema = z
  .enum(['get-all', 'post-all'])
  .meta({ description: 'The set of permissions that your ConnectApp requests.' })

export type ConnectAppEnumPermission = z.infer<typeof ConnectAppEnumPermissionSchema>

export const ApiV2010AccountConnectAppSchema = z.object({
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the ConnectApp resource.',
    })
    .exactOptional(),
  authorize_redirect_url: z
    .url()
    .nullable()
    .meta({
      description:
        'The URL we redirect the user to after we authenticate the user and obtain authorization to access the Connect App.',
    })
    .exactOptional(),
  company_name: z
    .string()
    .nullable()
    .meta({ description: 'The company name set for the Connect App.' })
    .exactOptional(),
  deauthorize_callback_method: z
    .enum(['GET', 'POST'])
    .nullable()
    .meta({ description: 'The HTTP method we use to call `deauthorize_callback_url`.' })
    .exactOptional(),
  deauthorize_callback_url: z
    .url()
    .nullable()
    .meta({
      description:
        'The URL we call using the `deauthorize_callback_method` to de-authorize the Connect App.',
    })
    .exactOptional(),
  description: z
    .string()
    .nullable()
    .meta({ description: 'The description of the Connect App.' })
    .exactOptional(),
  friendly_name: z
    .string()
    .nullable()
    .meta({ description: 'The string that you assigned to describe the resource.' })
    .exactOptional(),
  homepage_url: z
    .url()
    .nullable()
    .meta({
      description: 'The public URL where users can obtain more information about this Connect App.',
    })
    .exactOptional(),
  permissions: z
    .array(ConnectAppEnumPermissionSchema)
    .nullable()
    .meta({ description: 'The set of permissions that your ConnectApp requests.' })
    .exactOptional(),
  sid: z
    .string()
    .regex(/^CN[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description: 'The unique string that that we created to identify the ConnectApp resource.',
    })
    .exactOptional(),
  uri: z
    .string()
    .nullable()
    .meta({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' })
    .exactOptional(),
})

export type ApiV2010AccountConnectApp = z.infer<typeof ApiV2010AccountConnectAppSchema>

export const DependentPhoneNumberEnumAddressRequirementSchema = z
  .enum(['none', 'any', 'local', 'foreign'])
  .meta({
    description:
      'Whether the phone number requires an [Address](https://www.twilio.com/docs/usage/api/address) registered with Twilio. Can be: `none`, `any`, `local`, or `foreign`.',
  })

export type DependentPhoneNumberEnumAddressRequirement = z.infer<
  typeof DependentPhoneNumberEnumAddressRequirementSchema
>

export const DependentPhoneNumberEnumEmergencyStatusSchema = z
  .enum(['Active', 'Inactive'])
  .meta({ description: 'Whether the phone number is enabled for emergency calling.' })

export type DependentPhoneNumberEnumEmergencyStatus = z.infer<
  typeof DependentPhoneNumberEnumEmergencyStatusSchema
>

export const ApiV2010AccountAddressDependentPhoneNumberSchema = z.object({
  sid: z
    .string()
    .regex(/^PN[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The unique string that that we created to identify the DependentPhoneNumber resource.',
    })
    .exactOptional(),
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the DependentPhoneNumber resource.',
    })
    .exactOptional(),
  friendly_name: z
    .string()
    .nullable()
    .meta({ description: 'The string that you assigned to describe the resource.' })
    .exactOptional(),
  phone_number: z
    .string()
    .nullable()
    .meta({
      description:
        'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
    })
    .exactOptional(),
  voice_url: z
    .url()
    .nullable()
    .meta({
      description:
        'The URL we call when the phone number receives a call. The `voice_url` will not be used if a `voice_application_sid` or a `trunk_sid` is set.',
    })
    .exactOptional(),
  voice_method: z
    .enum(['GET', 'POST'])
    .nullable()
    .meta({ description: 'The HTTP method we use to call `voice_url`. Can be: `GET` or `POST`.' })
    .exactOptional(),
  voice_fallback_method: z
    .enum(['GET', 'POST'])
    .nullable()
    .meta({
      description: 'The HTTP method we use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
    })
    .exactOptional(),
  voice_fallback_url: z
    .url()
    .nullable()
    .meta({
      description:
        'The URL that we call when an error occurs retrieving or executing the TwiML requested by `url`.',
    })
    .exactOptional(),
  voice_caller_id_lookup: z
    .boolean()
    .nullable()
    .meta({
      description:
        "Whether we look up the caller's caller-ID name from the CNAM database. Can be: `true` or `false`. Caller ID lookups can cost $0.01 each.",
    })
    .exactOptional(),
  date_created: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  date_updated: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  sms_fallback_method: z
    .enum(['GET', 'POST'])
    .nullable()
    .meta({
      description: 'The HTTP method we use to call `sms_fallback_url`. Can be: `GET` or `POST`.',
    })
    .exactOptional(),
  sms_fallback_url: z
    .url()
    .nullable()
    .meta({
      description:
        'The URL that we call when an error occurs while retrieving or executing the TwiML from `sms_url`.',
    })
    .exactOptional(),
  sms_method: z
    .enum(['GET', 'POST'])
    .nullable()
    .meta({ description: 'The HTTP method we use to call `sms_url`. Can be: `GET` or `POST`.' })
    .exactOptional(),
  sms_url: z
    .url()
    .nullable()
    .meta({
      description: 'The URL we call when the phone number receives an incoming SMS message.',
    })
    .exactOptional(),
  address_requirements: DependentPhoneNumberEnumAddressRequirementSchema.exactOptional(),
  capabilities: z
    .any()
    .nullable()
    .meta({
      description:
        'The set of Boolean properties that indicates whether a phone number can receive calls or messages.  Capabilities are  `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
    })
    .exactOptional(),
  status_callback: z
    .url()
    .nullable()
    .meta({
      description:
        'The URL we call using the `status_callback_method` to send status information to your application.',
    })
    .exactOptional(),
  status_callback_method: z
    .enum(['GET', 'POST'])
    .nullable()
    .meta({
      description: 'The HTTP method we use to call `status_callback`. Can be: `GET` or `POST`.',
    })
    .exactOptional(),
  api_version: z
    .string()
    .nullable()
    .meta({ description: 'The API version used to start a new TwiML session.' })
    .exactOptional(),
  sms_application_sid: z
    .string()
    .regex(/^AP[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the application that handles SMS messages sent to the phone number. If an `sms_application_sid` is present, we ignore all `sms_*_url` values and use those of the application.',
    })
    .exactOptional(),
  voice_application_sid: z
    .string()
    .regex(/^AP[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the application that handles calls to the phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
    })
    .exactOptional(),
  trunk_sid: z
    .string()
    .regex(/^TK[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the Trunk that handles calls to the phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
    })
    .exactOptional(),
  emergency_status: DependentPhoneNumberEnumEmergencyStatusSchema.exactOptional(),
  emergency_address_sid: z
    .string()
    .regex(/^AD[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the emergency address configuration that we use for emergency calling from the phone number.',
    })
    .exactOptional(),
  uri: z
    .string()
    .nullable()
    .meta({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' })
    .exactOptional(),
})

export type ApiV2010AccountAddressDependentPhoneNumber = z.infer<
  typeof ApiV2010AccountAddressDependentPhoneNumberSchema
>

export const IncomingPhoneNumberEnumAddressRequirementSchema = z
  .enum(['none', 'any', 'local', 'foreign'])
  .meta({
    description:
      'Whether the phone number requires an [Address](https://www.twilio.com/docs/usage/api/address) registered with Twilio. Can be: `none`, `any`, `local`, or `foreign`.',
  })

export type IncomingPhoneNumberEnumAddressRequirement = z.infer<
  typeof IncomingPhoneNumberEnumAddressRequirementSchema
>

export const IncomingPhoneNumberEnumVoiceReceiveModeSchema = z.enum(['voice', 'fax'])

export type IncomingPhoneNumberEnumVoiceReceiveMode = z.infer<
  typeof IncomingPhoneNumberEnumVoiceReceiveModeSchema
>

export const IncomingPhoneNumberEnumEmergencyStatusSchema = z
  .enum(['Active', 'Inactive'])
  .meta({
    description:
      'The parameter displays if emergency calling is enabled for this number. Active numbers may place emergency calls by dialing valid emergency numbers for the country.',
  })

export type IncomingPhoneNumberEnumEmergencyStatus = z.infer<
  typeof IncomingPhoneNumberEnumEmergencyStatusSchema
>

export const IncomingPhoneNumberEnumEmergencyAddressStatusSchema = z
  .enum([
    'registered',
    'unregistered',
    'pending-registration',
    'registration-failure',
    'pending-unregistration',
    'unregistration-failure',
  ])
  .meta({
    description:
      'The status of address registration with emergency services. A registered emergency address will be used during handling of emergency calls from this number.',
  })

export type IncomingPhoneNumberEnumEmergencyAddressStatus = z.infer<
  typeof IncomingPhoneNumberEnumEmergencyAddressStatusSchema
>

export const ApiV2010AccountIncomingPhoneNumberSchema = z.object({
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this IncomingPhoneNumber resource.',
    })
    .exactOptional(),
  address_sid: z
    .string()
    .regex(/^AD[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({ description: 'The SID of the Address resource associated with the phone number.' })
    .exactOptional(),
  address_requirements: IncomingPhoneNumberEnumAddressRequirementSchema.exactOptional(),
  api_version: z
    .string()
    .nullable()
    .meta({ description: 'The API version used to start a new TwiML session.' })
    .exactOptional(),
  beta: z
    .boolean()
    .nullable()
    .meta({
      description:
        'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
    })
    .exactOptional(),
  capabilities: z
    .object({
      mms: z.boolean().exactOptional(),
      sms: z.boolean().exactOptional(),
      voice: z.boolean().exactOptional(),
      fax: z.boolean().exactOptional(),
    })
    .nullable()
    .meta({
      description:
        'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are  `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
    })
    .exactOptional(),
  date_created: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  date_updated: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  friendly_name: z
    .string()
    .nullable()
    .meta({ description: 'The string that you assigned to describe the resource.' })
    .exactOptional(),
  identity_sid: z
    .string()
    .regex(/^RI[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the Identity resource that we associate with the phone number. Some regions require an Identity to meet local regulations.',
    })
    .exactOptional(),
  phone_number: z
    .string()
    .nullable()
    .meta({
      description:
        'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
    })
    .exactOptional(),
  origin: z
    .string()
    .nullable()
    .meta({
      description:
        "The phone number's origin. `twilio` identifies Twilio-owned phone numbers and `hosted` identifies hosted phone numbers.",
    })
    .exactOptional(),
  sid: z
    .string()
    .regex(/^PN[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The unique string that that we created to identify this IncomingPhoneNumber resource.',
    })
    .exactOptional(),
  sms_application_sid: z
    .string()
    .regex(/^AP[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the application that handles SMS messages sent to the phone number. If an `sms_application_sid` is present, we ignore all `sms_*_url` values and use those of the application.',
    })
    .exactOptional(),
  sms_fallback_method: z
    .enum(['GET', 'POST'])
    .nullable()
    .meta({
      description: 'The HTTP method we use to call `sms_fallback_url`. Can be: `GET` or `POST`.',
    })
    .exactOptional(),
  sms_fallback_url: z
    .url()
    .nullable()
    .meta({
      description:
        'The URL that we call when an error occurs while retrieving or executing the TwiML from `sms_url`.',
    })
    .exactOptional(),
  sms_method: z
    .enum(['GET', 'POST'])
    .nullable()
    .meta({ description: 'The HTTP method we use to call `sms_url`. Can be: `GET` or `POST`.' })
    .exactOptional(),
  sms_url: z
    .url()
    .nullable()
    .meta({
      description: 'The URL we call when the phone number receives an incoming SMS message.',
    })
    .exactOptional(),
  status_callback: z
    .url()
    .nullable()
    .meta({
      description:
        'The URL we call using the `status_callback_method` to send status information to your application.',
    })
    .exactOptional(),
  status_callback_method: z
    .enum(['GET', 'POST'])
    .nullable()
    .meta({
      description: 'The HTTP method we use to call `status_callback`. Can be: `GET` or `POST`.',
    })
    .exactOptional(),
  trunk_sid: z
    .string()
    .regex(/^TK[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the Trunk that handles calls to the phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
    })
    .exactOptional(),
  uri: z
    .string()
    .nullable()
    .meta({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' })
    .exactOptional(),
  voice_receive_mode: IncomingPhoneNumberEnumVoiceReceiveModeSchema.exactOptional(),
  voice_application_sid: z
    .string()
    .regex(/^AP[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the application that handles calls to the phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
    })
    .exactOptional(),
  voice_caller_id_lookup: z
    .boolean()
    .nullable()
    .meta({
      description:
        "Whether we look up the caller's caller-ID name from the CNAM database ($0.01 per look up). Can be: `true` or `false`.",
    })
    .exactOptional(),
  voice_fallback_method: z
    .enum(['GET', 'POST'])
    .nullable()
    .meta({
      description: 'The HTTP method we use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
    })
    .exactOptional(),
  voice_fallback_url: z
    .url()
    .nullable()
    .meta({
      description:
        'The URL that we call when an error occurs retrieving or executing the TwiML requested by `url`.',
    })
    .exactOptional(),
  voice_method: z
    .enum(['GET', 'POST'])
    .nullable()
    .meta({ description: 'The HTTP method we use to call `voice_url`. Can be: `GET` or `POST`.' })
    .exactOptional(),
  voice_url: z
    .url()
    .nullable()
    .meta({
      description:
        'The URL we call when the phone number receives a call. The `voice_url` will not be used if a `voice_application_sid` or a `trunk_sid` is set.',
    })
    .exactOptional(),
  emergency_status: IncomingPhoneNumberEnumEmergencyStatusSchema.exactOptional(),
  emergency_address_sid: z
    .string()
    .regex(/^AD[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the emergency address configuration that we use for emergency calling from this phone number.',
    })
    .exactOptional(),
  emergency_address_status: IncomingPhoneNumberEnumEmergencyAddressStatusSchema.exactOptional(),
  bundle_sid: z
    .string()
    .regex(/^BU[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
    })
    .exactOptional(),
  status: z.string().nullable().exactOptional(),
  type: z.string().nullable().meta({ description: 'The phone number type.' }).exactOptional(),
})

export type ApiV2010AccountIncomingPhoneNumber = z.infer<
  typeof ApiV2010AccountIncomingPhoneNumberSchema
>

export const ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema = z.object({
  sid: z
    .string()
    .regex(/^XE[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({ description: 'The unique string that that we created to identify the resource.' })
    .exactOptional(),
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the resource.',
    })
    .exactOptional(),
  resource_sid: z
    .string()
    .regex(/^PN[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({ description: 'The SID of the Phone Number to which the Add-on is assigned.' })
    .exactOptional(),
  friendly_name: z
    .string()
    .nullable()
    .meta({ description: 'The string that you assigned to describe the resource.' })
    .exactOptional(),
  description: z
    .string()
    .nullable()
    .meta({ description: 'A short description of the functionality that the Add-on provides.' })
    .exactOptional(),
  configuration: z
    .any()
    .nullable()
    .meta({
      description:
        'A JSON string that represents the current configuration of this Add-on installation.',
    })
    .exactOptional(),
  unique_name: z
    .string()
    .nullable()
    .meta({
      description:
        "An application-defined string that uniquely identifies the resource. It can be used in place of the resource's `sid` in the URL to address the resource.",
    })
    .exactOptional(),
  date_created: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  date_updated: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  uri: z
    .string()
    .nullable()
    .meta({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' })
    .exactOptional(),
  subresource_uris: z
    .object({})
    .nullable()
    .meta({ description: 'A list of related resources identified by their relative URIs.' })
    .exactOptional(),
})

export type ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOn = z.infer<
  typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema
>

export const ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtensionSchema =
  z.object({
    sid: z
      .string()
      .regex(/^XF[0-9a-fA-F]{32}$/)
      .length(34)
      .nullable()
      .meta({ description: 'The unique string that that we created to identify the resource.' })
      .exactOptional(),
    account_sid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34)
      .nullable()
      .meta({
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the resource.',
      })
      .exactOptional(),
    resource_sid: z
      .string()
      .regex(/^PN[0-9a-fA-F]{32}$/)
      .length(34)
      .nullable()
      .meta({ description: 'The SID of the Phone Number to which the Add-on is assigned.' })
      .exactOptional(),
    assigned_add_on_sid: z
      .string()
      .regex(/^XE[0-9a-fA-F]{32}$/)
      .length(34)
      .nullable()
      .meta({ description: 'The SID that uniquely identifies the assigned Add-on installation.' })
      .exactOptional(),
    friendly_name: z
      .string()
      .nullable()
      .meta({ description: 'The string that you assigned to describe the resource.' })
      .exactOptional(),
    product_name: z
      .string()
      .nullable()
      .meta({
        description:
          'A string that you assigned to describe the Product this Extension is used within.',
      })
      .exactOptional(),
    unique_name: z
      .string()
      .nullable()
      .meta({
        description:
          "An application-defined string that uniquely identifies the resource. It can be used in place of the resource's `sid` in the URL to address the resource.",
      })
      .exactOptional(),
    uri: z
      .string()
      .nullable()
      .meta({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' })
      .exactOptional(),
    enabled: z
      .boolean()
      .nullable()
      .meta({ description: 'Whether the Extension will be invoked.' })
      .exactOptional(),
  })

export type ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtension =
  z.infer<
    typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtensionSchema
  >

export const IncomingPhoneNumberLocalEnumAddressRequirementSchema = z
  .enum(['none', 'any', 'local', 'foreign'])
  .meta({
    description:
      'Whether the phone number requires an [Address](https://www.twilio.com/docs/usage/api/address) registered with Twilio. Can be: `none`, `any`, `local`, or `foreign`.',
  })

export type IncomingPhoneNumberLocalEnumAddressRequirement = z.infer<
  typeof IncomingPhoneNumberLocalEnumAddressRequirementSchema
>

export const IncomingPhoneNumberLocalEnumVoiceReceiveModeSchema = z.enum(['voice', 'fax'])

export type IncomingPhoneNumberLocalEnumVoiceReceiveMode = z.infer<
  typeof IncomingPhoneNumberLocalEnumVoiceReceiveModeSchema
>

export const IncomingPhoneNumberLocalEnumEmergencyStatusSchema = z
  .enum(['Active', 'Inactive'])
  .meta({
    description:
      'The parameter displays if emergency calling is enabled for this number. Active numbers may place emergency calls by dialing valid emergency numbers for the country.',
  })

export type IncomingPhoneNumberLocalEnumEmergencyStatus = z.infer<
  typeof IncomingPhoneNumberLocalEnumEmergencyStatusSchema
>

export const IncomingPhoneNumberLocalEnumEmergencyAddressStatusSchema = z
  .enum([
    'registered',
    'unregistered',
    'pending-registration',
    'registration-failure',
    'pending-unregistration',
    'unregistration-failure',
  ])
  .meta({
    description:
      'The status of address registration with emergency services. A registered emergency address will be used during handling of emergency calls from this number.',
  })

export type IncomingPhoneNumberLocalEnumEmergencyAddressStatus = z.infer<
  typeof IncomingPhoneNumberLocalEnumEmergencyAddressStatusSchema
>

export const ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocalSchema = z.object({
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the resource.',
    })
    .exactOptional(),
  address_sid: z
    .string()
    .regex(/^AD[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({ description: 'The SID of the Address resource associated with the phone number.' })
    .exactOptional(),
  address_requirements: IncomingPhoneNumberLocalEnumAddressRequirementSchema.exactOptional(),
  api_version: z
    .string()
    .nullable()
    .meta({ description: 'The API version used to start a new TwiML session.' })
    .exactOptional(),
  beta: z
    .boolean()
    .nullable()
    .meta({
      description:
        'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
    })
    .exactOptional(),
  capabilities: z
    .object({
      mms: z.boolean().exactOptional(),
      sms: z.boolean().exactOptional(),
      voice: z.boolean().exactOptional(),
      fax: z.boolean().exactOptional(),
    })
    .nullable()
    .meta({
      description:
        'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are  `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
    })
    .exactOptional(),
  date_created: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  date_updated: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  friendly_name: z
    .string()
    .nullable()
    .meta({ description: 'The string that you assigned to describe the resource.' })
    .exactOptional(),
  identity_sid: z
    .string()
    .regex(/^RI[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the Identity resource that we associate with the phone number. Some regions require an Identity to meet local regulations.',
    })
    .exactOptional(),
  phone_number: z
    .string()
    .nullable()
    .meta({
      description:
        'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
    })
    .exactOptional(),
  origin: z
    .string()
    .nullable()
    .meta({
      description:
        "The phone number's origin. `twilio` identifies Twilio-owned phone numbers and `hosted` identifies hosted phone numbers.",
    })
    .exactOptional(),
  sid: z
    .string()
    .regex(/^PN[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({ description: 'The unique string that that we created to identify the resource.' })
    .exactOptional(),
  sms_application_sid: z
    .string()
    .regex(/^AP[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the application that handles SMS messages sent to the phone number. If an `sms_application_sid` is present, we ignore all `sms_*_url` values and use those of the application.',
    })
    .exactOptional(),
  sms_fallback_method: z
    .enum(['GET', 'POST'])
    .nullable()
    .meta({
      description: 'The HTTP method we use to call `sms_fallback_url`. Can be: `GET` or `POST`.',
    })
    .exactOptional(),
  sms_fallback_url: z
    .url()
    .nullable()
    .meta({
      description:
        'The URL that we call when an error occurs while retrieving or executing the TwiML from `sms_url`.',
    })
    .exactOptional(),
  sms_method: z
    .enum(['GET', 'POST'])
    .nullable()
    .meta({ description: 'The HTTP method we use to call `sms_url`. Can be: `GET` or `POST`.' })
    .exactOptional(),
  sms_url: z
    .url()
    .nullable()
    .meta({
      description: 'The URL we call when the phone number receives an incoming SMS message.',
    })
    .exactOptional(),
  status_callback: z
    .url()
    .nullable()
    .meta({
      description:
        'The URL we call using the `status_callback_method` to send status information to your application.',
    })
    .exactOptional(),
  status_callback_method: z
    .enum(['GET', 'POST'])
    .nullable()
    .meta({
      description: 'The HTTP method we use to call `status_callback`. Can be: `GET` or `POST`.',
    })
    .exactOptional(),
  trunk_sid: z
    .string()
    .regex(/^TK[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the Trunk that handles calls to the phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
    })
    .exactOptional(),
  uri: z
    .string()
    .nullable()
    .meta({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' })
    .exactOptional(),
  voice_receive_mode: IncomingPhoneNumberLocalEnumVoiceReceiveModeSchema.exactOptional(),
  voice_application_sid: z
    .string()
    .regex(/^AP[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the application that handles calls to the phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
    })
    .exactOptional(),
  voice_caller_id_lookup: z
    .boolean()
    .nullable()
    .meta({
      description:
        "Whether we look up the caller's caller-ID name from the CNAM database ($0.01 per look up). Can be: `true` or `false`.",
    })
    .exactOptional(),
  voice_fallback_method: z
    .enum(['GET', 'POST'])
    .nullable()
    .meta({
      description: 'The HTTP method we use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
    })
    .exactOptional(),
  voice_fallback_url: z
    .url()
    .nullable()
    .meta({
      description:
        'The URL that we call when an error occurs retrieving or executing the TwiML requested by `url`.',
    })
    .exactOptional(),
  voice_method: z
    .enum(['GET', 'POST'])
    .nullable()
    .meta({ description: 'The HTTP method we use to call `voice_url`. Can be: `GET` or `POST`.' })
    .exactOptional(),
  voice_url: z
    .url()
    .nullable()
    .meta({
      description:
        'The URL we call when this phone number receives a call. The `voice_url` will not be used if a `voice_application_sid` or a `trunk_sid` is set.',
    })
    .exactOptional(),
  emergency_status: IncomingPhoneNumberLocalEnumEmergencyStatusSchema.exactOptional(),
  emergency_address_sid: z
    .string()
    .regex(/^AD[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the emergency address configuration that we use for emergency calling from this phone number.',
    })
    .exactOptional(),
  emergency_address_status:
    IncomingPhoneNumberLocalEnumEmergencyAddressStatusSchema.exactOptional(),
  bundle_sid: z
    .string()
    .regex(/^BU[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
    })
    .exactOptional(),
  status: z.string().nullable().exactOptional(),
})

export type ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocal = z.infer<
  typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocalSchema
>

export const IncomingPhoneNumberMobileEnumAddressRequirementSchema = z
  .enum(['none', 'any', 'local', 'foreign'])
  .meta({
    description:
      'Whether the phone number requires an [Address](https://www.twilio.com/docs/usage/api/address) registered with Twilio. Can be: `none`, `any`, `local`, or `foreign`.',
  })

export type IncomingPhoneNumberMobileEnumAddressRequirement = z.infer<
  typeof IncomingPhoneNumberMobileEnumAddressRequirementSchema
>

export const IncomingPhoneNumberMobileEnumVoiceReceiveModeSchema = z.enum(['voice', 'fax'])

export type IncomingPhoneNumberMobileEnumVoiceReceiveMode = z.infer<
  typeof IncomingPhoneNumberMobileEnumVoiceReceiveModeSchema
>

export const IncomingPhoneNumberMobileEnumEmergencyStatusSchema = z
  .enum(['Active', 'Inactive'])
  .meta({
    description:
      'The parameter displays if emergency calling is enabled for this number. Active numbers may place emergency calls by dialing valid emergency numbers for the country.',
  })

export type IncomingPhoneNumberMobileEnumEmergencyStatus = z.infer<
  typeof IncomingPhoneNumberMobileEnumEmergencyStatusSchema
>

export const IncomingPhoneNumberMobileEnumEmergencyAddressStatusSchema = z
  .enum([
    'registered',
    'unregistered',
    'pending-registration',
    'registration-failure',
    'pending-unregistration',
    'unregistration-failure',
  ])
  .meta({
    description:
      'The status of address registration with emergency services. A registered emergency address will be used during handling of emergency calls from this number.',
  })

export type IncomingPhoneNumberMobileEnumEmergencyAddressStatus = z.infer<
  typeof IncomingPhoneNumberMobileEnumEmergencyAddressStatusSchema
>

export const ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobileSchema = z.object({
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the resource.',
    })
    .exactOptional(),
  address_sid: z
    .string()
    .regex(/^AD[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({ description: 'The SID of the Address resource associated with the phone number.' })
    .exactOptional(),
  address_requirements: IncomingPhoneNumberMobileEnumAddressRequirementSchema.exactOptional(),
  api_version: z
    .string()
    .nullable()
    .meta({ description: 'The API version used to start a new TwiML session.' })
    .exactOptional(),
  beta: z
    .boolean()
    .nullable()
    .meta({
      description:
        'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
    })
    .exactOptional(),
  capabilities: z
    .object({
      mms: z.boolean().exactOptional(),
      sms: z.boolean().exactOptional(),
      voice: z.boolean().exactOptional(),
      fax: z.boolean().exactOptional(),
    })
    .nullable()
    .meta({
      description:
        'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are  `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
    })
    .exactOptional(),
  date_created: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  date_updated: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  friendly_name: z
    .string()
    .nullable()
    .meta({ description: 'The string that you assigned to describe the resource.' })
    .exactOptional(),
  identity_sid: z
    .string()
    .regex(/^RI[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the Identity resource that we associate with the phone number. Some regions require an Identity to meet local regulations.',
    })
    .exactOptional(),
  phone_number: z
    .string()
    .nullable()
    .meta({
      description:
        'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
    })
    .exactOptional(),
  origin: z
    .string()
    .nullable()
    .meta({
      description:
        "The phone number's origin. `twilio` identifies Twilio-owned phone numbers and `hosted` identifies hosted phone numbers.",
    })
    .exactOptional(),
  sid: z
    .string()
    .regex(/^PN[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({ description: 'The unique string that that we created to identify the resource.' })
    .exactOptional(),
  sms_application_sid: z
    .string()
    .regex(/^AP[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the application that handles SMS messages sent to the phone number. If an `sms_application_sid` is present, we ignore all `sms_*_url` values and use those of the application.',
    })
    .exactOptional(),
  sms_fallback_method: z
    .enum(['GET', 'POST'])
    .nullable()
    .meta({
      description: 'The HTTP method we use to call `sms_fallback_url`. Can be: `GET` or `POST`.',
    })
    .exactOptional(),
  sms_fallback_url: z
    .url()
    .nullable()
    .meta({
      description:
        'The URL that we call when an error occurs while retrieving or executing the TwiML from `sms_url`.',
    })
    .exactOptional(),
  sms_method: z
    .enum(['GET', 'POST'])
    .nullable()
    .meta({ description: 'The HTTP method we use to call `sms_url`. Can be: `GET` or `POST`.' })
    .exactOptional(),
  sms_url: z
    .url()
    .nullable()
    .meta({
      description: 'The URL we call when the phone number receives an incoming SMS message.',
    })
    .exactOptional(),
  status_callback: z
    .url()
    .nullable()
    .meta({
      description:
        'The URL we call using the `status_callback_method` to send status information to your application.',
    })
    .exactOptional(),
  status_callback_method: z
    .enum(['GET', 'POST'])
    .nullable()
    .meta({
      description: 'The HTTP method we use to call `status_callback`. Can be: `GET` or `POST`.',
    })
    .exactOptional(),
  trunk_sid: z
    .string()
    .regex(/^TK[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the Trunk that handles calls to the phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
    })
    .exactOptional(),
  uri: z
    .string()
    .nullable()
    .meta({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' })
    .exactOptional(),
  voice_receive_mode: IncomingPhoneNumberMobileEnumVoiceReceiveModeSchema.exactOptional(),
  voice_application_sid: z
    .string()
    .regex(/^AP[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the application that handles calls to the phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
    })
    .exactOptional(),
  voice_caller_id_lookup: z
    .boolean()
    .nullable()
    .meta({
      description:
        "Whether we look up the caller's caller-ID name from the CNAM database ($0.01 per look up). Can be: `true` or `false`.",
    })
    .exactOptional(),
  voice_fallback_method: z
    .enum(['GET', 'POST'])
    .nullable()
    .meta({
      description: 'The HTTP method we use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
    })
    .exactOptional(),
  voice_fallback_url: z
    .url()
    .nullable()
    .meta({
      description:
        'The URL that we call when an error occurs retrieving or executing the TwiML requested by `url`.',
    })
    .exactOptional(),
  voice_method: z
    .enum(['GET', 'POST'])
    .nullable()
    .meta({ description: 'The HTTP method we use to call `voice_url`. Can be: `GET` or `POST`.' })
    .exactOptional(),
  voice_url: z
    .url()
    .nullable()
    .meta({
      description:
        'The URL we call when the phone number receives a call. The `voice_url` will not be used if a `voice_application_sid` or a `trunk_sid` is set.',
    })
    .exactOptional(),
  emergency_status: IncomingPhoneNumberMobileEnumEmergencyStatusSchema.exactOptional(),
  emergency_address_sid: z
    .string()
    .regex(/^AD[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the emergency address configuration that we use for emergency calling from this phone number.',
    })
    .exactOptional(),
  emergency_address_status:
    IncomingPhoneNumberMobileEnumEmergencyAddressStatusSchema.exactOptional(),
  bundle_sid: z
    .string()
    .regex(/^BU[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
    })
    .exactOptional(),
  status: z.string().nullable().exactOptional(),
})

export type ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobile = z.infer<
  typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobileSchema
>

export const IncomingPhoneNumberTollFreeEnumAddressRequirementSchema = z
  .enum(['none', 'any', 'local', 'foreign'])
  .meta({
    description:
      'Whether the phone number requires an [Address](https://www.twilio.com/docs/usage/api/address) registered with Twilio. Can be: `none`, `any`, `local`, or `foreign`.',
  })

export type IncomingPhoneNumberTollFreeEnumAddressRequirement = z.infer<
  typeof IncomingPhoneNumberTollFreeEnumAddressRequirementSchema
>

export const IncomingPhoneNumberTollFreeEnumVoiceReceiveModeSchema = z.enum(['voice', 'fax'])

export type IncomingPhoneNumberTollFreeEnumVoiceReceiveMode = z.infer<
  typeof IncomingPhoneNumberTollFreeEnumVoiceReceiveModeSchema
>

export const IncomingPhoneNumberTollFreeEnumEmergencyStatusSchema = z
  .enum(['Active', 'Inactive'])
  .meta({
    description:
      'The parameter displays if emergency calling is enabled for this number. Active numbers may place emergency calls by dialing valid emergency numbers for the country.',
  })

export type IncomingPhoneNumberTollFreeEnumEmergencyStatus = z.infer<
  typeof IncomingPhoneNumberTollFreeEnumEmergencyStatusSchema
>

export const IncomingPhoneNumberTollFreeEnumEmergencyAddressStatusSchema = z
  .enum([
    'registered',
    'unregistered',
    'pending-registration',
    'registration-failure',
    'pending-unregistration',
    'unregistration-failure',
  ])
  .meta({
    description:
      'The status of address registration with emergency services. A registered emergency address will be used during handling of emergency calls from this number.',
  })

export type IncomingPhoneNumberTollFreeEnumEmergencyAddressStatus = z.infer<
  typeof IncomingPhoneNumberTollFreeEnumEmergencyAddressStatusSchema
>

export const ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFreeSchema = z.object({
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the resource.',
    })
    .exactOptional(),
  address_sid: z
    .string()
    .regex(/^AD[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({ description: 'The SID of the Address resource associated with the phone number.' })
    .exactOptional(),
  address_requirements: IncomingPhoneNumberTollFreeEnumAddressRequirementSchema.exactOptional(),
  api_version: z
    .string()
    .nullable()
    .meta({ description: 'The API version used to start a new TwiML session.' })
    .exactOptional(),
  beta: z
    .boolean()
    .nullable()
    .meta({
      description:
        'Whether the phone number is new to the Twilio platform. Can be: `true` or `false`.',
    })
    .exactOptional(),
  capabilities: z
    .object({
      mms: z.boolean().exactOptional(),
      sms: z.boolean().exactOptional(),
      voice: z.boolean().exactOptional(),
      fax: z.boolean().exactOptional(),
    })
    .nullable()
    .meta({
      description:
        'The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are  `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.',
    })
    .exactOptional(),
  date_created: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  date_updated: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  friendly_name: z
    .string()
    .nullable()
    .meta({ description: 'The string that you assigned to describe the resource.' })
    .exactOptional(),
  identity_sid: z
    .string()
    .regex(/^RI[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the Identity resource that we associate with the phone number. Some regions require an Identity to meet local regulations.',
    })
    .exactOptional(),
  phone_number: z
    .string()
    .nullable()
    .meta({
      description:
        'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
    })
    .exactOptional(),
  origin: z
    .string()
    .nullable()
    .meta({
      description:
        "The phone number's origin. `twilio` identifies Twilio-owned phone numbers and `hosted` identifies hosted phone numbers.",
    })
    .exactOptional(),
  sid: z
    .string()
    .regex(/^PN[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({ description: 'The unique string that that we created to identify the resource.' })
    .exactOptional(),
  sms_application_sid: z
    .string()
    .regex(/^AP[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the application that handles SMS messages sent to the phone number. If an `sms_application_sid` is present, we ignore all `sms_*_url` values and use those of the application.',
    })
    .exactOptional(),
  sms_fallback_method: z
    .enum(['GET', 'POST'])
    .nullable()
    .meta({
      description: 'The HTTP method we use to call `sms_fallback_url`. Can be: `GET` or `POST`.',
    })
    .exactOptional(),
  sms_fallback_url: z
    .url()
    .nullable()
    .meta({
      description:
        'The URL that we call when an error occurs while retrieving or executing the TwiML from `sms_url`.',
    })
    .exactOptional(),
  sms_method: z
    .enum(['GET', 'POST'])
    .nullable()
    .meta({ description: 'The HTTP method we use to call `sms_url`. Can be: `GET` or `POST`.' })
    .exactOptional(),
  sms_url: z
    .url()
    .nullable()
    .meta({
      description: 'The URL we call when the phone number receives an incoming SMS message.',
    })
    .exactOptional(),
  status_callback: z
    .url()
    .nullable()
    .meta({
      description:
        'The URL we call using the `status_callback_method` to send status information to your application.',
    })
    .exactOptional(),
  status_callback_method: z
    .enum(['GET', 'POST'])
    .nullable()
    .meta({
      description: 'The HTTP method we use to call `status_callback`. Can be: `GET` or `POST`.',
    })
    .exactOptional(),
  trunk_sid: z
    .string()
    .regex(/^TK[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the Trunk that handles calls to the phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa.',
    })
    .exactOptional(),
  uri: z
    .string()
    .nullable()
    .meta({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' })
    .exactOptional(),
  voice_receive_mode: IncomingPhoneNumberTollFreeEnumVoiceReceiveModeSchema.exactOptional(),
  voice_application_sid: z
    .string()
    .regex(/^AP[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the application that handles calls to the phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa.',
    })
    .exactOptional(),
  voice_caller_id_lookup: z
    .boolean()
    .nullable()
    .meta({
      description:
        "Whether we look up the caller's caller-ID name from the CNAM database ($0.01 per look up). Can be: `true` or `false`.",
    })
    .exactOptional(),
  voice_fallback_method: z
    .enum(['GET', 'POST'])
    .nullable()
    .meta({
      description: 'The HTTP method we use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
    })
    .exactOptional(),
  voice_fallback_url: z
    .url()
    .nullable()
    .meta({
      description:
        'The URL that we call when an error occurs retrieving or executing the TwiML requested by `url`.',
    })
    .exactOptional(),
  voice_method: z
    .enum(['GET', 'POST'])
    .nullable()
    .meta({ description: 'The HTTP method we use to call `voice_url`. Can be: `GET` or `POST`.' })
    .exactOptional(),
  voice_url: z
    .url()
    .nullable()
    .meta({
      description:
        'The URL we call when the phone number receives a call. The `voice_url` will not be used if a `voice_application_sid` or a `trunk_sid` is set.',
    })
    .exactOptional(),
  emergency_status: IncomingPhoneNumberTollFreeEnumEmergencyStatusSchema.exactOptional(),
  emergency_address_sid: z
    .string()
    .regex(/^AD[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the emergency address configuration that we use for emergency calling from this phone number.',
    })
    .exactOptional(),
  emergency_address_status:
    IncomingPhoneNumberTollFreeEnumEmergencyAddressStatusSchema.exactOptional(),
  bundle_sid: z
    .string()
    .regex(/^BU[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations.',
    })
    .exactOptional(),
  status: z.string().nullable().exactOptional(),
})

export type ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFree = z.infer<
  typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFreeSchema
>

export const ApiV2010AccountKeySchema = z.object({
  sid: z
    .string()
    .regex(/^SK[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({ description: 'The unique string that that we created to identify the Key resource.' })
    .exactOptional(),
  friendly_name: z
    .string()
    .nullable()
    .meta({ description: 'The string that you assigned to describe the resource.' })
    .exactOptional(),
  date_created: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  date_updated: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
})

export type ApiV2010AccountKey = z.infer<typeof ApiV2010AccountKeySchema>

export const ApiV2010AccountMessageMediaSchema = z.object({
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) associated with this Media resource.',
    })
    .exactOptional(),
  content_type: z
    .string()
    .nullable()
    .meta({
      description:
        'The default [MIME type](https://en.wikipedia.org/wiki/Internet_media_type) of the media, for example `image/jpeg`, `image/png`, or `image/gif`.',
    })
    .exactOptional(),
  date_created: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT when this Media resource was created, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  date_updated: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT when this Media resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  parent_sid: z
    .string()
    .regex(/^(SM|MM)[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description: 'The SID of the Message resource that is associated with this Media resource.',
    })
    .exactOptional(),
  sid: z
    .string()
    .regex(/^ME[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({ description: 'The unique string that identifies this Media resource.' })
    .exactOptional(),
  uri: z
    .string()
    .nullable()
    .meta({ description: 'The URI of this Media resource, relative to `https://api.twilio.com`.' })
    .exactOptional(),
})

export type ApiV2010AccountMessageMedia = z.infer<typeof ApiV2010AccountMessageMediaSchema>

export const ApiV2010AccountQueueMemberSchema = z.object({
  call_sid: z
    .string()
    .regex(/^CA[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Member resource is associated with.',
    })
    .exactOptional(),
  date_enqueued: z
    .string()
    .nullable()
    .meta({ description: 'The date that the member was enqueued, given in RFC 2822 format.' })
    .exactOptional(),
  position: z
    .int()
    .default(0)
    .meta({ description: "This member's current position in the queue." })
    .exactOptional(),
  uri: z
    .string()
    .nullable()
    .meta({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' })
    .exactOptional(),
  wait_time: z
    .int()
    .default(0)
    .meta({ description: 'The number of seconds the member has been in the queue.' })
    .exactOptional(),
  queue_sid: z
    .string()
    .regex(/^QU[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({ description: 'The SID of the Queue the member is in.' })
    .exactOptional(),
})

export type ApiV2010AccountQueueMember = z.infer<typeof ApiV2010AccountQueueMemberSchema>

export const MessageEnumDirectionSchema = z
  .enum(['inbound', 'outbound-api', 'outbound-call', 'outbound-reply'])
  .meta({
    description:
      'The direction of the message. Can be: `inbound` for incoming messages, `outbound-api` for messages created by the REST API, `outbound-call` for messages created during a call, or `outbound-reply` for messages created in response to an incoming message.',
  })

export type MessageEnumDirection = z.infer<typeof MessageEnumDirectionSchema>

export const MessageEnumStatusSchema = z
  .enum([
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
  .meta({
    description:
      'The status of the Message. Possible values: `accepted`, `scheduled`, `canceled`, `queued`, `sending`, `sent`, `failed`, `delivered`, `undelivered`, `receiving`, `received`, or `read` (WhatsApp only). For more information, See [detailed descriptions](https://www.twilio.com/docs/sms/api/message-resource#message-status-values).',
  })

export type MessageEnumStatus = z.infer<typeof MessageEnumStatusSchema>

export const ApiV2010AccountMessageSchema = z.object({
  body: z
    .string()
    .nullable()
    .meta({ description: 'The text content of the message' })
    .exactOptional(),
  num_segments: z
    .string()
    .nullable()
    .meta({
      description:
        "The number of segments that make up the complete message. SMS message bodies that exceed the [character limit](https://www.twilio.com/docs/glossary/what-sms-character-limit) are segmented and charged as multiple messages. Note: For messages sent via a Messaging Service, `num_segments` is initially `0`, since a sender hasn't yet been assigned.",
    })
    .exactOptional(),
  direction: MessageEnumDirectionSchema.exactOptional(),
  from: z
    .string()
    .nullable()
    .meta({
      description:
        "The sender's phone number (in [E.164](https://en.wikipedia.org/wiki/E.164) format), [alphanumeric sender ID](https://www.twilio.com/docs/sms/quickstart), [Wireless SIM](https://www.twilio.com/docs/iot/wireless/programmable-wireless-send-machine-machine-sms-commands), [short code](https://www.twilio.com/en-us/messaging/channels/sms/short-codes), or  [channel address](https://www.twilio.com/docs/messaging/channels) (e.g., `whatsapp:+15554449999`). For incoming messages, this is the number or channel address of the sender. For outgoing messages, this value is a Twilio phone number, alphanumeric sender ID, short code, or channel address from which the message is sent.",
    })
    .exactOptional(),
  to: z
    .string()
    .nullable()
    .meta({
      description:
        "The recipient's phone number (in [E.164](https://en.wikipedia.org/wiki/E.164) format) or [channel address](https://www.twilio.com/docs/messaging/channels) (e.g. `whatsapp:+15552229999`)",
    })
    .exactOptional(),
  date_updated: z
    .string()
    .nullable()
    .meta({
      description:
        'The [RFC 2822](https://datatracker.ietf.org/doc/html/rfc2822#section-3.3) timestamp (in GMT) of when the Message resource was last updated',
    })
    .exactOptional(),
  price: z
    .string()
    .nullable()
    .meta({
      description:
        'The amount billed for the message in the currency specified by `price_unit`. The `price` is populated after the message has been sent/received, and may not be immediately availalble. View the [Pricing page](https://www.twilio.com/en-us/pricing) for more details.',
    })
    .exactOptional(),
  error_message: z
    .string()
    .nullable()
    .meta({
      description:
        'The description of the `error_code` if the Message `status` is `failed` or `undelivered`. If no error was encountered, the value is `null`. The value returned in this field for a specific error cause is subject to change as Twilio improves errors. Users should not use the `error_code` and `error_message` fields programmatically.',
    })
    .exactOptional(),
  uri: z
    .string()
    .nullable()
    .meta({ description: 'The URI of the Message resource, relative to `https://api.twilio.com`.' })
    .exactOptional(),
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) associated with the Message resource',
    })
    .exactOptional(),
  num_media: z
    .string()
    .nullable()
    .meta({ description: 'The number of media files associated with the Message resource.' })
    .exactOptional(),
  status: MessageEnumStatusSchema.exactOptional(),
  messaging_service_sid: z
    .string()
    .regex(/^MG[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Messaging Service](https://www.twilio.com/docs/messaging/api/service-resource) associated with the Message resource. A unique default value is assigned if a Messaging Service is not used.',
    })
    .exactOptional(),
  sid: z
    .string()
    .regex(/^(SM|MM)[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description: 'The unique, Twilio-provided string that identifies the Message resource.',
    })
    .exactOptional(),
  date_sent: z
    .string()
    .nullable()
    .meta({
      description:
        'The [RFC 2822](https://datatracker.ietf.org/doc/html/rfc2822#section-3.3) timestamp (in GMT) of when the Message was sent. For an outgoing message, this is when Twilio sent the message. For an incoming message, this is when Twilio sent the HTTP request to your incoming message webhook URL.',
    })
    .exactOptional(),
  date_created: z
    .string()
    .nullable()
    .meta({
      description:
        'The [RFC 2822](https://datatracker.ietf.org/doc/html/rfc2822#section-3.3) timestamp (in GMT) of when the Message resource was created',
    })
    .exactOptional(),
  error_code: z
    .int()
    .nullable()
    .meta({
      description:
        'The [error code](https://www.twilio.com/docs/api/errors) returned if the Message `status` is `failed` or `undelivered`. If no error was encountered, the value is `null`. The value returned in this field for a specific error cause is subject to change as Twilio improves errors. Users should not use the `error_code` and `error_message` fields programmatically.',
    })
    .exactOptional(),
  price_unit: z
    .string()
    .nullable()
    .meta({
      description:
        'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format (e.g. `usd`, `eur`, `jpy`).',
    })
    .exactOptional(),
  api_version: z
    .string()
    .nullable()
    .meta({ description: 'The API version used to process the Message' })
    .exactOptional(),
  subresource_uris: z
    .object({})
    .nullable()
    .meta({
      description:
        'A list of related resources identified by their URIs relative to `https://api.twilio.com`',
    })
    .exactOptional(),
})

export type ApiV2010AccountMessage = z.infer<typeof ApiV2010AccountMessageSchema>

export const MessageEnumUpdateStatusSchema = z.literal('canceled')

export type MessageEnumUpdateStatus = z.infer<typeof MessageEnumUpdateStatusSchema>

export const MessageEnumContentRetentionSchema = z
  .enum(['retain', 'discard'])
  .meta({
    description:
      'Determines if the message content can be stored or redacted based on privacy settings',
  })

export type MessageEnumContentRetention = z.infer<typeof MessageEnumContentRetentionSchema>

export const MessageEnumAddressRetentionSchema = z
  .enum(['retain', 'obfuscate'])
  .meta({
    description: 'Determines if the address can be stored or obfuscated based on privacy settings',
  })

export type MessageEnumAddressRetention = z.infer<typeof MessageEnumAddressRetentionSchema>

export const MessageEnumTrafficTypeSchema = z.literal('free')

export type MessageEnumTrafficType = z.infer<typeof MessageEnumTrafficTypeSchema>

export const MessageEnumScheduleTypeSchema = z
  .literal('fixed')
  .meta({
    description:
      'For Messaging Services only: Include this parameter with a value of `fixed` in conjuction with the `send_time` parameter in order to [schedule a Message](https://www.twilio.com/docs/messaging/features/message-scheduling).',
  })

export type MessageEnumScheduleType = z.infer<typeof MessageEnumScheduleTypeSchema>

export const MessageEnumRiskCheckSchema = z
  .enum(['enable', 'disable'])
  .meta({
    description:
      'Include this parameter with a value of `disable` to skip any kind of risk check on the respective message request.',
  })

export type MessageEnumRiskCheck = z.infer<typeof MessageEnumRiskCheckSchema>

export const MessageFeedbackEnumOutcomeSchema = z
  .enum(['confirmed', 'unconfirmed'])
  .meta({
    description:
      'Reported outcome indicating whether there is confirmation that the Message recipient performed a tracked user action. Can be: `unconfirmed` or `confirmed`. For more details see [How to Optimize Message Deliverability with Message Feedback](https://www.twilio.com/docs/messaging/guides/send-message-feedback-to-twilio).',
  })

export type MessageFeedbackEnumOutcome = z.infer<typeof MessageFeedbackEnumOutcomeSchema>

export const ApiV2010AccountMessageMessageFeedbackSchema = z.object({
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) associated with this MessageFeedback resource.',
    })
    .exactOptional(),
  message_sid: z
    .string()
    .regex(/^(SM|MM)[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description: 'The SID of the Message resource associated with this MessageFeedback resource.',
    })
    .exactOptional(),
  outcome: MessageFeedbackEnumOutcomeSchema.exactOptional(),
  date_created: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT when this MessageFeedback resource was created, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  date_updated: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT when this MessageFeedback resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  uri: z
    .string()
    .nullable()
    .meta({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' })
    .exactOptional(),
})

export type ApiV2010AccountMessageMessageFeedback = z.infer<
  typeof ApiV2010AccountMessageMessageFeedbackSchema
>

export const ApiV2010AccountNewKeySchema = z.object({
  sid: z
    .string()
    .regex(/^SK[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The unique string that that we created to identify the NewKey resource. You will use this as the basic-auth `user` when authenticating to the API.',
    })
    .exactOptional(),
  friendly_name: z
    .string()
    .nullable()
    .meta({ description: 'The string that you assigned to describe the resource.' })
    .exactOptional(),
  date_created: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the API Key was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  date_updated: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the new API Key was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  secret: z
    .string()
    .nullable()
    .meta({
      description:
        'The secret your application uses to sign Access Tokens and to authenticate to the REST API (you will use this as the basic-auth `password`).  **Note that for security reasons, this field is ONLY returned when the API Key is first created.**',
    })
    .exactOptional(),
})

export type ApiV2010AccountNewKey = z.infer<typeof ApiV2010AccountNewKeySchema>

export const ApiV2010AccountNewSigningKeySchema = z.object({
  sid: z
    .string()
    .regex(/^SK[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description: 'The unique string that that we created to identify the NewSigningKey resource.',
    })
    .exactOptional(),
  friendly_name: z
    .string()
    .nullable()
    .meta({ description: 'The string that you assigned to describe the resource.' })
    .exactOptional(),
  date_created: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  date_updated: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  secret: z
    .string()
    .nullable()
    .meta({
      description:
        'The secret your application uses to sign Access Tokens and to authenticate to the REST API (you will use this as the basic-auth `password`).  **Note that for security reasons, this field is ONLY returned when the API Key is first created.**',
    })
    .exactOptional(),
})

export type ApiV2010AccountNewSigningKey = z.infer<typeof ApiV2010AccountNewSigningKeySchema>

export const ApiV2010AccountNotificationSchema = z.object({
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Notification resource.',
    })
    .exactOptional(),
  api_version: z
    .string()
    .nullable()
    .meta({
      description:
        "The API version used to generate the notification. Can be empty for events that don't have a specific API version, such as incoming phone calls.",
    })
    .exactOptional(),
  call_sid: z
    .string()
    .regex(/^CA[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Notification resource is associated with.',
    })
    .exactOptional(),
  date_created: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  date_updated: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  error_code: z
    .string()
    .nullable()
    .meta({
      description:
        'A unique error code for the error condition that is described in our [Error Dictionary](https://www.twilio.com/docs/api/errors).',
    })
    .exactOptional(),
  log: z
    .string()
    .nullable()
    .meta({
      description:
        'An integer log level that corresponds to the type of notification: `0` is ERROR, `1` is WARNING.',
    })
    .exactOptional(),
  message_date: z
    .string()
    .nullable()
    .meta({
      description:
        'The date the notification was actually generated in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. Message buffering can cause this value to differ from `date_created`.',
    })
    .exactOptional(),
  message_text: z
    .string()
    .nullable()
    .meta({ description: 'The text of the notification.' })
    .exactOptional(),
  more_info: z
    .url()
    .nullable()
    .meta({
      description:
        'The URL for more information about the error condition. This value is a page in our [Error Dictionary](https://www.twilio.com/docs/api/errors).',
    })
    .exactOptional(),
  request_method: z
    .enum(['GET', 'POST'])
    .nullable()
    .meta({
      description:
        'The HTTP method used to generate the notification. If the notification was generated during a phone call, this is the HTTP Method used to request the resource on your server. If the notification was generated by your use of our REST API, this is the HTTP method used to call the resource on our servers.',
    })
    .exactOptional(),
  request_url: z
    .url()
    .nullable()
    .meta({
      description:
        'The URL of the resource that generated the notification. If the notification was generated during a phone call, this is the URL of the resource on your server that caused the notification. If the notification was generated by your use of our REST API, this is the URL of the resource you called.',
    })
    .exactOptional(),
  sid: z
    .string()
    .regex(/^NO[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description: 'The unique string that that we created to identify the Notification resource.',
    })
    .exactOptional(),
  uri: z
    .string()
    .nullable()
    .meta({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' })
    .exactOptional(),
})

export type ApiV2010AccountNotification = z.infer<typeof ApiV2010AccountNotificationSchema>

export const ApiV2010AccountNotificationInstanceSchema = z.object({
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Notification resource.',
    })
    .exactOptional(),
  api_version: z
    .string()
    .nullable()
    .meta({
      description:
        "The API version used to generate the notification. Can be empty for events that don't have a specific API version, such as incoming phone calls.",
    })
    .exactOptional(),
  call_sid: z
    .string()
    .regex(/^CA[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Notification resource is associated with.',
    })
    .exactOptional(),
  date_created: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  date_updated: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  error_code: z
    .string()
    .nullable()
    .meta({
      description:
        'A unique error code for the error condition that is described in our [Error Dictionary](https://www.twilio.com/docs/api/errors).',
    })
    .exactOptional(),
  log: z
    .string()
    .nullable()
    .meta({
      description:
        'An integer log level that corresponds to the type of notification: `0` is ERROR, `1` is WARNING.',
    })
    .exactOptional(),
  message_date: z
    .string()
    .nullable()
    .meta({
      description:
        'The date the notification was actually generated in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. Message buffering can cause this value to differ from `date_created`.',
    })
    .exactOptional(),
  message_text: z
    .string()
    .nullable()
    .meta({ description: 'The text of the notification.' })
    .exactOptional(),
  more_info: z
    .url()
    .nullable()
    .meta({
      description:
        'The URL for more information about the error condition. This value is a page in our [Error Dictionary](https://www.twilio.com/docs/api/errors).',
    })
    .exactOptional(),
  request_method: z
    .enum(['GET', 'POST'])
    .nullable()
    .meta({
      description:
        'The HTTP method used to generate the notification. If the notification was generated during a phone call, this is the HTTP Method used to request the resource on your server. If the notification was generated by your use of our REST API, this is the HTTP method used to call the resource on our servers.',
    })
    .exactOptional(),
  request_url: z
    .url()
    .nullable()
    .meta({
      description:
        'The URL of the resource that generated the notification. If the notification was generated during a phone call, this is the URL of the resource on your server that caused the notification. If the notification was generated by your use of our REST API, this is the URL of the resource you called.',
    })
    .exactOptional(),
  request_variables: z
    .string()
    .nullable()
    .meta({
      description:
        'The HTTP GET or POST variables we sent to your server. However, if the notification was generated by our REST API, this contains the HTTP POST or PUT variables you sent to our API.',
    })
    .exactOptional(),
  response_body: z
    .string()
    .nullable()
    .meta({ description: 'The HTTP body returned by your server.' })
    .exactOptional(),
  response_headers: z
    .string()
    .nullable()
    .meta({ description: 'The HTTP headers returned by your server.' })
    .exactOptional(),
  sid: z
    .string()
    .regex(/^NO[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description: 'The unique string that that we created to identify the Notification resource.',
    })
    .exactOptional(),
  uri: z
    .string()
    .nullable()
    .meta({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' })
    .exactOptional(),
})

export type ApiV2010AccountNotificationInstance = z.infer<
  typeof ApiV2010AccountNotificationInstanceSchema
>

export const ApiV2010AccountOutgoingCallerIdSchema = z.object({
  sid: z
    .string()
    .regex(/^PN[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The unique string that that we created to identify the OutgoingCallerId resource.',
    })
    .exactOptional(),
  date_created: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  date_updated: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  friendly_name: z
    .string()
    .nullable()
    .meta({ description: 'The string that you assigned to describe the resource.' })
    .exactOptional(),
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the OutgoingCallerId resource.',
    })
    .exactOptional(),
  phone_number: z
    .string()
    .nullable()
    .meta({
      description:
        'The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
    })
    .exactOptional(),
  uri: z
    .string()
    .nullable()
    .meta({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' })
    .exactOptional(),
})

export type ApiV2010AccountOutgoingCallerId = z.infer<typeof ApiV2010AccountOutgoingCallerIdSchema>

export const ParticipantEnumStatusSchema = z
  .enum(['queued', 'connecting', 'ringing', 'connected', 'complete', 'failed'])
  .meta({
    description:
      "The status of the participant's call in a session. Can be: `queued`, `connecting`, `ringing`, `connected`, `complete`, or `failed`.",
  })

export type ParticipantEnumStatus = z.infer<typeof ParticipantEnumStatusSchema>

export const ApiV2010AccountConferenceParticipantSchema = z.object({
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Participant resource.',
    })
    .exactOptional(),
  call_sid: z
    .string()
    .regex(/^CA[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Participant resource is associated with.',
    })
    .exactOptional(),
  label: z
    .string()
    .nullable()
    .meta({
      description:
        'The user-specified label of this participant, if one was given when the participant was created. This may be used to fetch, update or delete the participant.',
    })
    .exactOptional(),
  call_sid_to_coach: z
    .string()
    .regex(/^CA[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the participant who is being `coached`. The participant being coached is the only participant who can hear the participant who is `coaching`.',
    })
    .exactOptional(),
  coaching: z
    .boolean()
    .nullable()
    .meta({
      description:
        'Whether the participant is coaching another call. Can be: `true` or `false`. If not present, defaults to `false` unless `call_sid_to_coach` is defined. If `true`, `call_sid_to_coach` must be defined.',
    })
    .exactOptional(),
  conference_sid: z
    .string()
    .regex(/^CF[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({ description: 'The SID of the conference the participant is in.' })
    .exactOptional(),
  date_created: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  date_updated: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  end_conference_on_exit: z
    .boolean()
    .nullable()
    .meta({
      description:
        'Whether the conference ends when the participant leaves. Can be: `true` or `false` and the default is `false`. If `true`, the conference ends and all other participants drop out when the participant leaves.',
    })
    .exactOptional(),
  muted: z
    .boolean()
    .nullable()
    .meta({ description: 'Whether the participant is muted. Can be `true` or `false`.' })
    .exactOptional(),
  hold: z
    .boolean()
    .nullable()
    .meta({ description: 'Whether the participant is on hold. Can be `true` or `false`.' })
    .exactOptional(),
  start_conference_on_enter: z
    .boolean()
    .nullable()
    .meta({
      description:
        'Whether the conference starts when the participant joins the conference, if it has not already started. Can be: `true` or `false` and the default is `true`. If `false` and the conference has not started, the participant is muted and hears background music until another participant starts the conference.',
    })
    .exactOptional(),
  status: ParticipantEnumStatusSchema.exactOptional(),
  queue_time: z
    .string()
    .nullable()
    .meta({
      description:
        "The wait time in milliseconds before participant's call is placed. Only available in the response to a create participant request.",
    })
    .exactOptional(),
  uri: z
    .string()
    .nullable()
    .meta({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' })
    .exactOptional(),
})

export type ApiV2010AccountConferenceParticipant = z.infer<
  typeof ApiV2010AccountConferenceParticipantSchema
>

export const ApiV2010AccountCallPaymentsSchema = z.object({
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Payments resource.',
    })
    .exactOptional(),
  call_sid: z
    .string()
    .regex(/^CA[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Payments resource is associated with. This will refer to the call sid that is producing the payment card (credit/ACH) information thru DTMF.',
    })
    .exactOptional(),
  sid: z
    .string()
    .regex(/^PK[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({ description: 'The SID of the Payments resource.' })
    .exactOptional(),
  date_created: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  date_updated: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  uri: z
    .string()
    .nullable()
    .meta({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' })
    .exactOptional(),
})

export type ApiV2010AccountCallPayments = z.infer<typeof ApiV2010AccountCallPaymentsSchema>

export const PaymentsEnumPaymentMethodSchema = z
  .enum(['credit-card', 'ach-debit'])
  .meta({
    description:
      'Type of payment being captured. One of `credit-card` or `ach-debit`. The default value is `credit-card`.',
  })

export type PaymentsEnumPaymentMethod = z.infer<typeof PaymentsEnumPaymentMethodSchema>

export const PaymentsEnumBankAccountTypeSchema = z
  .enum(['consumer-checking', 'consumer-savings', 'commercial-checking'])
  .meta({
    description:
      'Type of bank account if payment source is ACH. One of `consumer-checking`, `consumer-savings`, or `commercial-checking`. The default value is `consumer-checking`.',
  })

export type PaymentsEnumBankAccountType = z.infer<typeof PaymentsEnumBankAccountTypeSchema>

export const PaymentsEnumTokenTypeSchema = z
  .enum(['one-time', 'reusable', 'payment-method'])
  .meta({
    description:
      'Indicates whether the payment method should be tokenized as a `one-time`, `reusable`, or `payment-method` token. The default value is `reusable`. Do not enter a charge amount when tokenizing. If a charge amount is entered, the payment method will be charged and not tokenized.',
  })

export type PaymentsEnumTokenType = z.infer<typeof PaymentsEnumTokenTypeSchema>

export const PaymentsEnumCaptureSchema = z
  .enum([
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
  ])
  .meta({
    description:
      'The piece of payment information that you wish the caller to enter. Must be one of `payment-card-number`, `expiration-date`, `security-code`, `postal-code`, `bank-routing-number`, `bank-account-number`, or their `-matcher` variants for input confirmation when `RequireMatchingInputs` is enabled.',
  })

export type PaymentsEnumCapture = z.infer<typeof PaymentsEnumCaptureSchema>

export const PaymentsEnumStatusSchema = z
  .enum(['complete', 'cancel'])
  .meta({
    description:
      'Indicates whether the current payment session should be cancelled or completed. When `cancel` the payment session is cancelled. When `complete`, Twilio sends the payment information to the selected Pay Connector for processing.',
  })

export type PaymentsEnumStatus = z.infer<typeof PaymentsEnumStatusSchema>

export const ApiV2010AccountQueueSchema = z.object({
  date_updated: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  current_size: z
    .int()
    .default(0)
    .meta({ description: 'The number of calls currently in the queue.' })
    .exactOptional(),
  friendly_name: z
    .string()
    .nullable()
    .meta({ description: 'A string that you assigned to describe this resource.' })
    .exactOptional(),
  uri: z
    .string()
    .nullable()
    .meta({ description: 'The URI of this resource, relative to `https://api.twilio.com`.' })
    .exactOptional(),
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Queue resource.',
    })
    .exactOptional(),
  average_wait_time: z
    .int()
    .default(0)
    .meta({
      description:
        ' The average wait time in seconds of the members in this queue. This is calculated at the time of the request.',
    })
    .exactOptional(),
  sid: z
    .string()
    .regex(/^QU[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description: 'The unique string that that we created to identify this Queue resource.',
    })
    .exactOptional(),
  date_created: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that this resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  max_size: z
    .int()
    .default(0)
    .meta({
      description:
        ' The maximum number of calls that can be in the queue. The default is 1000 and the maximum is 5000.',
    })
    .exactOptional(),
})

export type ApiV2010AccountQueue = z.infer<typeof ApiV2010AccountQueueSchema>

export const RealtimeTranscriptionEnumStatusSchema = z
  .enum(['in-progress', 'stopped'])
  .meta({ description: 'The status - one of `stopped`, `in-flight`' })

export type RealtimeTranscriptionEnumStatus = z.infer<typeof RealtimeTranscriptionEnumStatusSchema>

export const ApiV2010AccountCallRealtimeTranscriptionSchema = z.object({
  sid: z
    .string()
    .regex(/^GT[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({ description: 'The SID of the Transcription resource.' })
    .exactOptional(),
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Transcription resource.',
    })
    .exactOptional(),
  call_sid: z
    .string()
    .regex(/^CA[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Transcription resource is associated with.',
    })
    .exactOptional(),
  name: z
    .string()
    .nullable()
    .meta({
      description:
        'The user-specified name of this Transcription, if one was given when the Transcription was created. This may be used to stop the Transcription.',
    })
    .exactOptional(),
  status: RealtimeTranscriptionEnumStatusSchema.exactOptional(),
  date_updated: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  uri: z.string().nullable().exactOptional(),
})

export type ApiV2010AccountCallRealtimeTranscription = z.infer<
  typeof ApiV2010AccountCallRealtimeTranscriptionSchema
>

export const RealtimeTranscriptionEnumTrackSchema = z
  .enum(['inbound_track', 'outbound_track', 'both_tracks'])
  .meta({ description: 'One of `inbound_track`, `outbound_track`, `both_tracks`.' })

export type RealtimeTranscriptionEnumTrack = z.infer<typeof RealtimeTranscriptionEnumTrackSchema>

export const RealtimeTranscriptionEnumUpdateStatusSchema = z.literal('stopped')

export type RealtimeTranscriptionEnumUpdateStatus = z.infer<
  typeof RealtimeTranscriptionEnumUpdateStatusSchema
>

export const RecordingEnumStatusSchema = z
  .enum(['in-progress', 'paused', 'stopped', 'processing', 'completed', 'absent', 'deleted'])
  .meta({
    description:
      'The status of the recording. Can be: `processing`, `completed`, `absent` or `deleted`. For information about more detailed statuses on in-progress recordings, check out how to [Update a Recording Resource](https://www.twilio.com/docs/voice/api/recording#update-a-recording-resource).',
  })

export type RecordingEnumStatus = z.infer<typeof RecordingEnumStatusSchema>

export const RecordingEnumSourceSchema = z
  .enum([
    'DialVerb',
    'Conference',
    'OutboundAPI',
    'Trunking',
    'RecordVerb',
    'StartCallRecordingAPI',
    'StartConferenceRecordingAPI',
  ])
  .meta({
    description:
      'How the recording was created. Can be: `DialVerb`, `Conference`, `OutboundAPI`, `Trunking`, `RecordVerb`, `StartCallRecordingAPI`, and `StartConferenceRecordingAPI`.',
  })

export type RecordingEnumSource = z.infer<typeof RecordingEnumSourceSchema>

export const ApiV2010AccountRecordingSchema = z.object({
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording resource.',
    })
    .exactOptional(),
  api_version: z
    .string()
    .nullable()
    .meta({ description: 'The API version used during the recording.' })
    .exactOptional(),
  call_sid: z
    .string()
    .regex(/^CA[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Recording resource is associated with. This will always refer to the parent leg of a two-leg call.',
    })
    .exactOptional(),
  conference_sid: z
    .string()
    .regex(/^CF[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The Conference SID that identifies the conference associated with the recording, if a conference recording.',
    })
    .exactOptional(),
  date_created: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  date_updated: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  start_time: z
    .string()
    .nullable()
    .meta({
      description:
        'The start time of the recording in GMT and in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
    })
    .exactOptional(),
  duration: z
    .string()
    .nullable()
    .meta({ description: 'The length of the recording in seconds.' })
    .exactOptional(),
  sid: z
    .string()
    .regex(/^RE[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description: 'The unique string that that we created to identify the Recording resource.',
    })
    .exactOptional(),
  price: z
    .string()
    .nullable()
    .meta({
      description: 'The one-time cost of creating the recording in the `price_unit` currency.',
    })
    .exactOptional(),
  price_unit: z
    .string()
    .nullable()
    .meta({ description: 'The currency used in the `price` property. Example: `USD`.' })
    .exactOptional(),
  status: RecordingEnumStatusSchema.exactOptional(),
  channels: z
    .int()
    .nullable()
    .meta({
      description:
        'The number of channels in the recording resource. For information on specifying the number of channels in the downloaded recording file, check out [Fetch a Recording’s media file](https://www.twilio.com/docs/voice/api/recording#download-dual-channel-media-file).',
    })
    .exactOptional(),
  source: RecordingEnumSourceSchema.exactOptional(),
  error_code: z
    .int()
    .nullable()
    .meta({
      description:
        'The error code that describes why the recording is `absent`. The error code is described in our [Error Dictionary](https://www.twilio.com/docs/api/errors). This value is null if the recording `status` is not `absent`.',
    })
    .exactOptional(),
  uri: z
    .string()
    .nullable()
    .meta({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' })
    .exactOptional(),
  encryption_details: z
    .any()
    .nullable()
    .meta({
      description:
        'How to decrypt the recording if it was encrypted using [Call Recording Encryption](https://www.twilio.com/docs/voice/tutorials/voice-recording-encryption) feature.',
    })
    .exactOptional(),
  subresource_uris: z
    .object({})
    .nullable()
    .meta({ description: 'A list of related resources identified by their relative URIs.' })
    .exactOptional(),
  media_url: z
    .url()
    .nullable()
    .meta({
      description:
        'The URL of the media file associated with this recording resource. When stored externally, this is the full URL location of the media file.',
    })
    .exactOptional(),
})

export type ApiV2010AccountRecording = z.infer<typeof ApiV2010AccountRecordingSchema>

export const RecordingAddOnResultEnumStatusSchema = z
  .enum([
    'canceled',
    'completed',
    'deleted',
    'failed',
    'in-progress',
    'init',
    'processing',
    'queued',
  ])
  .meta({
    description:
      'The status of the result. Can be: `canceled`, `completed`, `deleted`, `failed`, `in-progress`, `init`, `processing`, `queued`.',
  })

export type RecordingAddOnResultEnumStatus = z.infer<typeof RecordingAddOnResultEnumStatusSchema>

export const ApiV2010AccountRecordingRecordingAddOnResultSchema = z.object({
  sid: z
    .string()
    .regex(/^XR[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The unique string that that we created to identify the Recording AddOnResult resource.',
    })
    .exactOptional(),
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording AddOnResult resource.',
    })
    .exactOptional(),
  status: RecordingAddOnResultEnumStatusSchema.exactOptional(),
  add_on_sid: z
    .string()
    .regex(/^XB[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({ description: 'The SID of the Add-on to which the result belongs.' })
    .exactOptional(),
  add_on_configuration_sid: z
    .string()
    .regex(/^XE[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({ description: 'The SID of the Add-on configuration.' })
    .exactOptional(),
  date_created: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  date_updated: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  date_completed: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the result was completed specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  reference_sid: z
    .string()
    .regex(/^RE[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({ description: 'The SID of the recording to which the AddOnResult resource belongs.' })
    .exactOptional(),
  subresource_uris: z
    .object({})
    .nullable()
    .meta({ description: 'A list of related resources identified by their relative URIs.' })
    .exactOptional(),
})

export type ApiV2010AccountRecordingRecordingAddOnResult = z.infer<
  typeof ApiV2010AccountRecordingRecordingAddOnResultSchema
>

export const ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadSchema =
  z.object({
    sid: z
      .string()
      .regex(/^XH[0-9a-fA-F]{32}$/)
      .length(34)
      .nullable()
      .meta({
        description:
          'The unique string that that we created to identify the Recording AddOnResult Payload resource.',
      })
      .exactOptional(),
    add_on_result_sid: z
      .string()
      .regex(/^XR[0-9a-fA-F]{32}$/)
      .length(34)
      .nullable()
      .meta({ description: 'The SID of the AddOnResult to which the payload belongs.' })
      .exactOptional(),
    account_sid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34)
      .nullable()
      .meta({
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording AddOnResult Payload resource.',
      })
      .exactOptional(),
    label: z
      .string()
      .nullable()
      .meta({ description: 'The string provided by the vendor that describes the payload.' })
      .exactOptional(),
    add_on_sid: z
      .string()
      .regex(/^XB[0-9a-fA-F]{32}$/)
      .length(34)
      .nullable()
      .meta({ description: 'The SID of the Add-on to which the result belongs.' })
      .exactOptional(),
    add_on_configuration_sid: z
      .string()
      .regex(/^XE[0-9a-fA-F]{32}$/)
      .length(34)
      .nullable()
      .meta({ description: 'The SID of the Add-on configuration.' })
      .exactOptional(),
    content_type: z
      .string()
      .nullable()
      .meta({ description: 'The MIME type of the payload.' })
      .exactOptional(),
    date_created: z
      .string()
      .nullable()
      .meta({
        description:
          'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      })
      .exactOptional(),
    date_updated: z
      .string()
      .nullable()
      .meta({
        description:
          'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      })
      .exactOptional(),
    reference_sid: z
      .string()
      .regex(/^RE[0-9a-fA-F]{32}$/)
      .length(34)
      .nullable()
      .meta({
        description:
          'The SID of the recording to which the AddOnResult resource that contains the payload belongs.',
      })
      .exactOptional(),
    subresource_uris: z
      .object({})
      .nullable()
      .meta({ description: 'A list of related resources identified by their relative URIs.' })
      .exactOptional(),
  })

export type ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayload = z.infer<
  typeof ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadSchema
>

export const ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadRecordingAddOnResultPayloadDataSchema =
  z.object({
    redirect_to: z
      .url()
      .nullable()
      .meta({
        description:
          'The URL to redirect to to get the data returned by the AddOn that was previously stored.',
      })
      .exactOptional(),
  })

export type ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadRecordingAddOnResultPayloadData =
  z.infer<
    typeof ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadRecordingAddOnResultPayloadDataSchema
  >

export const RecordingTranscriptionEnumStatusSchema = z
  .enum(['in-progress', 'completed', 'failed'])
  .meta({
    description: 'The status of the transcription. Can be: `in-progress`, `completed`, `failed`.',
  })

export type RecordingTranscriptionEnumStatus = z.infer<
  typeof RecordingTranscriptionEnumStatusSchema
>

export const ApiV2010AccountRecordingRecordingTranscriptionSchema = z.object({
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Transcription resource.',
    })
    .exactOptional(),
  api_version: z
    .string()
    .nullable()
    .meta({ description: 'The API version used to create the transcription.' })
    .exactOptional(),
  date_created: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  date_updated: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  duration: z
    .string()
    .nullable()
    .meta({ description: 'The duration of the transcribed audio in seconds.' })
    .exactOptional(),
  price: z
    .number()
    .nullable()
    .meta({
      description:
        'The charge for the transcript in the currency associated with the account. This value is populated after the transcript is complete so it may not be available immediately.',
    })
    .exactOptional(),
  price_unit: z
    .string()
    .nullable()
    .meta({
      description:
        'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format (e.g. `usd`, `eur`, `jpy`).',
    })
    .exactOptional(),
  recording_sid: z
    .string()
    .regex(/^RE[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Recording](https://www.twilio.com/docs/voice/api/recording) from which the transcription was created.',
    })
    .exactOptional(),
  sid: z
    .string()
    .regex(/^TR[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description: 'The unique string that that we created to identify the Transcription resource.',
    })
    .exactOptional(),
  status: RecordingTranscriptionEnumStatusSchema.exactOptional(),
  transcription_text: z
    .string()
    .nullable()
    .meta({ description: 'The text content of the transcription.' })
    .exactOptional(),
  type: z.string().nullable().meta({ description: 'The transcription type.' }).exactOptional(),
  uri: z
    .string()
    .nullable()
    .meta({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' })
    .exactOptional(),
})

export type ApiV2010AccountRecordingRecordingTranscription = z.infer<
  typeof ApiV2010AccountRecordingRecordingTranscriptionSchema
>

export const ApiV2010AccountShortCodeSchema = z.object({
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this ShortCode resource.',
    })
    .exactOptional(),
  api_version: z
    .string()
    .nullable()
    .meta({
      description:
        'The API version used to start a new TwiML session when an SMS message is sent to this short code.',
    })
    .exactOptional(),
  date_created: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that this resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  date_updated: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  friendly_name: z
    .string()
    .nullable()
    .meta({
      description:
        'A string that you assigned to describe this resource. By default, the `FriendlyName` is the short code.',
    })
    .exactOptional(),
  short_code: z
    .string()
    .nullable()
    .meta({ description: 'The short code. e.g., 894546.' })
    .exactOptional(),
  sid: z
    .string()
    .regex(/^SC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description: 'The unique string that that we created to identify this ShortCode resource.',
    })
    .exactOptional(),
  sms_fallback_method: z
    .enum(['GET', 'POST'])
    .nullable()
    .meta({
      description:
        'The HTTP method we use to call the `sms_fallback_url`. Can be: `GET` or `POST`.',
    })
    .exactOptional(),
  sms_fallback_url: z
    .url()
    .nullable()
    .meta({
      description:
        'The URL that we call if an error occurs while retrieving or executing the TwiML from `sms_url`.',
    })
    .exactOptional(),
  sms_method: z
    .enum(['GET', 'POST'])
    .nullable()
    .meta({ description: 'The HTTP method we use to call the `sms_url`. Can be: `GET` or `POST`.' })
    .exactOptional(),
  sms_url: z
    .url()
    .nullable()
    .meta({
      description: 'The URL we call when receiving an incoming SMS message to this short code.',
    })
    .exactOptional(),
  uri: z
    .string()
    .nullable()
    .meta({ description: 'The URI of this resource, relative to `https://api.twilio.com`.' })
    .exactOptional(),
})

export type ApiV2010AccountShortCode = z.infer<typeof ApiV2010AccountShortCodeSchema>

export const ApiV2010AccountSigningKeySchema = z.object({
  sid: z
    .string()
    .regex(/^SK[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .exactOptional(),
  friendly_name: z.string().nullable().exactOptional(),
  date_created: z.string().nullable().exactOptional(),
  date_updated: z.string().nullable().exactOptional(),
})

export type ApiV2010AccountSigningKey = z.infer<typeof ApiV2010AccountSigningKeySchema>

export const ApiV2010AccountSipSchema = z.object({})

export type ApiV2010AccountSip = z.infer<typeof ApiV2010AccountSipSchema>

export const ApiV2010AccountSipSipDomainSipAuthSchema = z.object({})

export type ApiV2010AccountSipSipDomainSipAuth = z.infer<
  typeof ApiV2010AccountSipSipDomainSipAuthSchema
>

export const ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSchema = z.object({})

export type ApiV2010AccountSipSipDomainSipAuthSipAuthCalls = z.infer<
  typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSchema
>

export const ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema =
  z.object({
    account_sid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34)
      .nullable()
      .meta({
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the CredentialListMapping resource.',
      })
      .exactOptional(),
    date_created: z
      .string()
      .nullable()
      .meta({
        description:
          'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      })
      .exactOptional(),
    date_updated: z
      .string()
      .nullable()
      .meta({
        description:
          'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      })
      .exactOptional(),
    friendly_name: z
      .string()
      .nullable()
      .meta({ description: 'The string that you assigned to describe the resource.' })
      .exactOptional(),
    sid: z
      .string()
      .regex(/^CL[0-9a-fA-F]{32}$/)
      .length(34)
      .nullable()
      .meta({
        description:
          'The unique string that that we created to identify the CredentialListMapping resource.',
      })
      .exactOptional(),
  })

export type ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMapping =
  z.infer<
    typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema
  >

export const ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema =
  z.object({
    account_sid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34)
      .nullable()
      .meta({
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the IpAccessControlListMapping resource.',
      })
      .exactOptional(),
    date_created: z
      .string()
      .nullable()
      .meta({
        description:
          'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      })
      .exactOptional(),
    date_updated: z
      .string()
      .nullable()
      .meta({
        description:
          'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      })
      .exactOptional(),
    friendly_name: z
      .string()
      .nullable()
      .meta({ description: 'The string that you assigned to describe the resource.' })
      .exactOptional(),
    sid: z
      .string()
      .regex(/^AL[0-9a-fA-F]{32}$/)
      .length(34)
      .nullable()
      .meta({
        description:
          'The unique string that that we created to identify the IpAccessControlListMapping resource.',
      })
      .exactOptional(),
  })

export type ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMapping =
  z.infer<
    typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema
  >

export const ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSchema = z.object({})

export type ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrations = z.infer<
  typeof ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSchema
>

export const ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema =
  z.object({
    account_sid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34)
      .nullable()
      .meta({
        description:
          'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the CredentialListMapping resource.',
      })
      .exactOptional(),
    date_created: z
      .string()
      .nullable()
      .meta({
        description:
          'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      })
      .exactOptional(),
    date_updated: z
      .string()
      .nullable()
      .meta({
        description:
          'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
      })
      .exactOptional(),
    friendly_name: z
      .string()
      .nullable()
      .meta({ description: 'The string that you assigned to describe the resource.' })
      .exactOptional(),
    sid: z
      .string()
      .regex(/^CL[0-9a-fA-F]{32}$/)
      .length(34)
      .nullable()
      .meta({
        description:
          'The unique string that that we created to identify the CredentialListMapping resource.',
      })
      .exactOptional(),
  })

export type ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMapping =
  z.infer<
    typeof ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema
  >

export const ApiV2010AccountSipSipCredentialListSipCredentialSchema = z.object({
  sid: z
    .string()
    .regex(/^CR[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({ description: 'A 34 character string that uniquely identifies this resource.' })
    .exactOptional(),
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({ description: 'The unique id of the Account that is responsible for this resource.' })
    .exactOptional(),
  credential_list_sid: z
    .string()
    .regex(/^CL[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The unique id that identifies the credential list that includes this credential.',
    })
    .exactOptional(),
  username: z
    .string()
    .nullable()
    .meta({ description: 'The username for this credential.' })
    .exactOptional(),
  date_created: z
    .string()
    .nullable()
    .meta({
      description:
        'The date that this resource was created, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
    })
    .exactOptional(),
  date_updated: z
    .string()
    .nullable()
    .meta({
      description:
        'The date that this resource was last updated, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
    })
    .exactOptional(),
  uri: z
    .string()
    .nullable()
    .meta({ description: 'The URI for this resource, relative to `https://api.twilio.com`' })
    .exactOptional(),
})

export type ApiV2010AccountSipSipCredentialListSipCredential = z.infer<
  typeof ApiV2010AccountSipSipCredentialListSipCredentialSchema
>

export const ApiV2010AccountSipSipCredentialListSchema = z.object({
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The unique id of the [Account](https://www.twilio.com/docs/iam/api/account) that owns this resource.',
    })
    .exactOptional(),
  date_created: z
    .string()
    .nullable()
    .meta({
      description:
        'The date that this resource was created, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
    })
    .exactOptional(),
  date_updated: z
    .string()
    .nullable()
    .meta({
      description:
        'The date that this resource was last updated, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
    })
    .exactOptional(),
  friendly_name: z
    .string()
    .nullable()
    .meta({
      description:
        'A human readable descriptive text that describes the CredentialList, up to 64 characters long.',
    })
    .exactOptional(),
  sid: z
    .string()
    .regex(/^CL[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({ description: 'A 34 character string that uniquely identifies this resource.' })
    .exactOptional(),
  subresource_uris: z
    .object({})
    .nullable()
    .meta({ description: 'A list of credentials associated with this credential list.' })
    .exactOptional(),
  uri: z
    .string()
    .nullable()
    .meta({ description: 'The URI for this resource, relative to `https://api.twilio.com`.' })
    .exactOptional(),
})

export type ApiV2010AccountSipSipCredentialList = z.infer<
  typeof ApiV2010AccountSipSipCredentialListSchema
>

export const ApiV2010AccountSipSipDomainSipCredentialListMappingSchema = z.object({
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({ description: 'The unique id of the Account that is responsible for this resource.' })
    .exactOptional(),
  date_created: z
    .string()
    .nullable()
    .meta({
      description:
        'The date that this resource was created, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
    })
    .exactOptional(),
  date_updated: z
    .string()
    .nullable()
    .meta({
      description:
        'The date that this resource was last updated, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
    })
    .exactOptional(),
  domain_sid: z
    .string()
    .regex(/^SD[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({ description: 'The unique string that is created to identify the SipDomain resource.' })
    .exactOptional(),
  friendly_name: z
    .string()
    .nullable()
    .meta({
      description: 'A human readable descriptive text for this resource, up to 64 characters long.',
    })
    .exactOptional(),
  sid: z
    .string()
    .regex(/^CL[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({ description: 'A 34 character string that uniquely identifies this resource.' })
    .exactOptional(),
  uri: z
    .string()
    .nullable()
    .meta({ description: 'The URI for this resource, relative to `https://api.twilio.com`' })
    .exactOptional(),
})

export type ApiV2010AccountSipSipDomainSipCredentialListMapping = z.infer<
  typeof ApiV2010AccountSipSipDomainSipCredentialListMappingSchema
>

export const ApiV2010AccountSipSipDomainSchema = z.object({
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the SipDomain resource.',
    })
    .exactOptional(),
  api_version: z
    .string()
    .nullable()
    .meta({ description: 'The API version used to process the call.' })
    .exactOptional(),
  auth_type: z
    .string()
    .nullable()
    .meta({
      description:
        'The types of authentication you have mapped to your domain. Can be: `IP_ACL` and `CREDENTIAL_LIST`. If you have both defined for your domain, both will be returned in a comma delimited string. If `auth_type` is not defined, the domain will not be able to receive any traffic.',
    })
    .exactOptional(),
  date_created: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  date_updated: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  domain_name: z
    .string()
    .nullable()
    .meta({
      description:
        'The unique address you reserve on Twilio to which you route your SIP traffic. Domain names can contain letters, digits, and "-" and must end with `sip.twilio.com`.',
    })
    .exactOptional(),
  friendly_name: z
    .string()
    .nullable()
    .meta({ description: 'The string that you assigned to describe the resource.' })
    .exactOptional(),
  sid: z
    .string()
    .regex(/^SD[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description: 'The unique string that that we created to identify the SipDomain resource.',
    })
    .exactOptional(),
  uri: z
    .string()
    .nullable()
    .meta({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' })
    .exactOptional(),
  voice_fallback_method: z
    .enum(['GET', 'POST'])
    .nullable()
    .meta({
      description: 'The HTTP method we use to call `voice_fallback_url`. Can be: `GET` or `POST`.',
    })
    .exactOptional(),
  voice_fallback_url: z
    .url()
    .nullable()
    .meta({
      description:
        'The URL that we call when an error occurs while retrieving or executing the TwiML requested from `voice_url`.',
    })
    .exactOptional(),
  voice_method: z
    .enum(['GET', 'POST'])
    .nullable()
    .meta({ description: 'The HTTP method we use to call `voice_url`. Can be: `GET` or `POST`.' })
    .exactOptional(),
  voice_status_callback_method: z
    .enum(['GET', 'POST'])
    .nullable()
    .meta({
      description:
        'The HTTP method we use to call `voice_status_callback_url`. Either `GET` or `POST`.',
    })
    .exactOptional(),
  voice_status_callback_url: z
    .url()
    .nullable()
    .meta({
      description:
        'The URL that we call to pass status parameters (such as call ended) to your application.',
    })
    .exactOptional(),
  voice_url: z
    .url()
    .nullable()
    .meta({
      description: 'The URL we call using the `voice_method` when the domain receives a call.',
    })
    .exactOptional(),
  subresource_uris: z
    .object({})
    .nullable()
    .meta({
      description:
        'A list of mapping resources associated with the SIP Domain resource identified by their relative URIs.',
    })
    .exactOptional(),
  sip_registration: z
    .boolean()
    .nullable()
    .meta({
      description: 'Whether to allow SIP Endpoints to register with the domain to receive calls.',
    })
    .exactOptional(),
  emergency_calling_enabled: z
    .boolean()
    .nullable()
    .meta({
      description:
        'Whether emergency calling is enabled for the domain. If enabled, allows emergency calls on the domain from phone numbers with validated addresses.',
    })
    .exactOptional(),
  secure: z
    .boolean()
    .nullable()
    .meta({
      description:
        'Whether secure SIP is enabled for the domain. If enabled, TLS will be enforced and SRTP will be negotiated on all incoming calls to this sip domain.',
    })
    .exactOptional(),
  byoc_trunk_sid: z
    .string()
    .regex(/^BY[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the BYOC Trunk(Bring Your Own Carrier) resource that the Sip Domain will be associated with.',
    })
    .exactOptional(),
  emergency_caller_sid: z
    .string()
    .regex(/^PN[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'Whether an emergency caller sid is configured for the domain. If present, this phone number will be used as the callback for the emergency call.',
    })
    .exactOptional(),
})

export type ApiV2010AccountSipSipDomain = z.infer<typeof ApiV2010AccountSipSipDomainSchema>

export const ApiV2010AccountSipSipIpAccessControlListSchema = z.object({
  sid: z
    .string()
    .regex(/^AL[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({ description: 'A 34 character string that uniquely identifies this resource.' })
    .exactOptional(),
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The unique id of the [Account](https://www.twilio.com/docs/iam/api/account) that owns this resource.',
    })
    .exactOptional(),
  friendly_name: z
    .string()
    .nullable()
    .meta({ description: 'A human readable descriptive text, up to 255 characters long.' })
    .exactOptional(),
  date_created: z
    .string()
    .nullable()
    .meta({
      description:
        'The date that this resource was created, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
    })
    .exactOptional(),
  date_updated: z
    .string()
    .nullable()
    .meta({
      description:
        'The date that this resource was last updated, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
    })
    .exactOptional(),
  subresource_uris: z
    .object({})
    .nullable()
    .meta({
      description:
        'A list of the IpAddress resources associated with this IP access control list resource.',
    })
    .exactOptional(),
  uri: z
    .string()
    .nullable()
    .meta({ description: 'The URI for this resource, relative to `https://api.twilio.com`' })
    .exactOptional(),
})

export type ApiV2010AccountSipSipIpAccessControlList = z.infer<
  typeof ApiV2010AccountSipSipIpAccessControlListSchema
>

export const ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema = z.object({
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({ description: 'The unique id of the Account that is responsible for this resource.' })
    .exactOptional(),
  date_created: z
    .string()
    .nullable()
    .meta({
      description:
        'The date that this resource was created, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
    })
    .exactOptional(),
  date_updated: z
    .string()
    .nullable()
    .meta({
      description:
        'The date that this resource was last updated, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
    })
    .exactOptional(),
  domain_sid: z
    .string()
    .regex(/^SD[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({ description: 'The unique string that is created to identify the SipDomain resource.' })
    .exactOptional(),
  friendly_name: z
    .string()
    .nullable()
    .meta({
      description: 'A human readable descriptive text for this resource, up to 64 characters long.',
    })
    .exactOptional(),
  sid: z
    .string()
    .regex(/^AL[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({ description: 'A 34 character string that uniquely identifies this resource.' })
    .exactOptional(),
  uri: z
    .string()
    .nullable()
    .meta({ description: 'The URI for this resource, relative to `https://api.twilio.com`' })
    .exactOptional(),
})

export type ApiV2010AccountSipSipDomainSipIpAccessControlListMapping = z.infer<
  typeof ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema
>

export const ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema = z.object({
  sid: z
    .string()
    .regex(/^IP[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({ description: 'A 34 character string that uniquely identifies this resource.' })
    .exactOptional(),
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({ description: 'The unique id of the Account that is responsible for this resource.' })
    .exactOptional(),
  friendly_name: z
    .string()
    .nullable()
    .meta({
      description:
        'A human readable descriptive text for this resource, up to 255 characters long.',
    })
    .exactOptional(),
  ip_address: z
    .string()
    .nullable()
    .meta({
      description:
        'An IP address in dotted decimal notation from which you want to accept traffic. Any SIP requests from this IP address will be allowed by Twilio. IPv4 only supported today.',
    })
    .exactOptional(),
  cidr_prefix_length: z
    .int()
    .default(0)
    .meta({
      description:
        'An integer representing the length of the CIDR prefix to use with this IP address when accepting traffic. By default the entire IP address is used.',
    })
    .exactOptional(),
  ip_access_control_list_sid: z
    .string()
    .regex(/^AL[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description: 'The unique id of the IpAccessControlList resource that includes this resource.',
    })
    .exactOptional(),
  date_created: z
    .string()
    .nullable()
    .meta({
      description:
        'The date that this resource was created, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
    })
    .exactOptional(),
  date_updated: z
    .string()
    .nullable()
    .meta({
      description:
        'The date that this resource was last updated, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format.',
    })
    .exactOptional(),
  uri: z
    .string()
    .nullable()
    .meta({ description: 'The URI for this resource, relative to `https://api.twilio.com`' })
    .exactOptional(),
})

export type ApiV2010AccountSipSipIpAccessControlListSipIpAddress = z.infer<
  typeof ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema
>

export const SiprecEnumStatusSchema = z
  .enum(['in-progress', 'stopped'])
  .meta({ description: 'The status - one of `stopped`, `in-progress`' })

export type SiprecEnumStatus = z.infer<typeof SiprecEnumStatusSchema>

export const ApiV2010AccountCallSiprecSchema = z.object({
  sid: z
    .string()
    .regex(/^SR[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({ description: 'The SID of the Siprec resource.' })
    .exactOptional(),
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Siprec resource.',
    })
    .exactOptional(),
  call_sid: z
    .string()
    .regex(/^CA[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Siprec resource is associated with.',
    })
    .exactOptional(),
  name: z
    .string()
    .nullable()
    .meta({
      description:
        'The user-specified name of this Siprec, if one was given when the Siprec was created. This may be used to stop the Siprec.',
    })
    .exactOptional(),
  status: SiprecEnumStatusSchema.exactOptional(),
  date_updated: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  uri: z
    .string()
    .nullable()
    .meta({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' })
    .exactOptional(),
})

export type ApiV2010AccountCallSiprec = z.infer<typeof ApiV2010AccountCallSiprecSchema>

export const SiprecEnumTrackSchema = z
  .enum(['inbound_track', 'outbound_track', 'both_tracks'])
  .meta({ description: 'One of `inbound_track`, `outbound_track`, `both_tracks`.' })

export type SiprecEnumTrack = z.infer<typeof SiprecEnumTrackSchema>

export const SiprecEnumUpdateStatusSchema = z.literal('stopped')

export type SiprecEnumUpdateStatus = z.infer<typeof SiprecEnumUpdateStatusSchema>

export const SmsFeedbackEnumOutcomeSchema = z.enum([
  'confirmed',
  'unconfirmed',
  'received',
  'not-received',
  'delayed',
])

export type SmsFeedbackEnumOutcome = z.infer<typeof SmsFeedbackEnumOutcomeSchema>

export const SmsMessageEnumStatusSchema = z.enum([
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

export type SmsMessageEnumStatus = z.infer<typeof SmsMessageEnumStatusSchema>

export const SmsMessageEnumUpdateStatusSchema = z.literal('canceled')

export type SmsMessageEnumUpdateStatus = z.infer<typeof SmsMessageEnumUpdateStatusSchema>

export const SmsMessageEnumDirectionSchema = z.enum([
  'inbound',
  'outbound-api',
  'outbound-call',
  'outbound-reply',
])

export type SmsMessageEnumDirection = z.infer<typeof SmsMessageEnumDirectionSchema>

export const StreamEnumStatusSchema = z
  .enum(['in-progress', 'stopped'])
  .meta({
    description: 'The status of the Stream. Possible values are `stopped` and `in-progress`.',
  })

export type StreamEnumStatus = z.infer<typeof StreamEnumStatusSchema>

export const ApiV2010AccountCallStreamSchema = z.object({
  sid: z
    .string()
    .regex(/^MZ[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({ description: 'The SID of the Stream resource.' })
    .exactOptional(),
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Stream resource.',
    })
    .exactOptional(),
  call_sid: z
    .string()
    .regex(/^CA[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Stream resource is associated with.',
    })
    .exactOptional(),
  name: z
    .string()
    .nullable()
    .meta({
      description:
        'The user-specified name of this Stream, if one was given when the Stream was created. This can be used to stop the Stream.',
    })
    .exactOptional(),
  status: StreamEnumStatusSchema.exactOptional(),
  date_updated: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  uri: z
    .string()
    .nullable()
    .meta({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' })
    .exactOptional(),
})

export type ApiV2010AccountCallStream = z.infer<typeof ApiV2010AccountCallStreamSchema>

export const StreamEnumTrackSchema = z
  .enum(['inbound_track', 'outbound_track', 'both_tracks'])
  .meta({
    description:
      'The tracks to be included in the Stream. Possible values are `inbound_track`, `outbound_track`, `both_tracks`. Default value is `inbound_track`.',
  })

export type StreamEnumTrack = z.infer<typeof StreamEnumTrackSchema>

export const StreamEnumUpdateStatusSchema = z.literal('stopped')

export type StreamEnumUpdateStatus = z.infer<typeof StreamEnumUpdateStatusSchema>

export const ApiV2010AccountTokenSchema = z.object({
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Token resource.',
    })
    .exactOptional(),
  date_created: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  date_updated: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  ice_servers: z
    .array(
      z.object({
        credential: z.string().exactOptional(),
        username: z.string().exactOptional(),
        url: z.string().exactOptional(),
        urls: z.string().exactOptional(),
      }),
    )
    .nullable()
    .meta({
      description:
        'An array representing the ephemeral credentials and the STUN and TURN server URIs.',
    })
    .exactOptional(),
  password: z
    .string()
    .nullable()
    .meta({
      description:
        'The temporary password that the username will use when authenticating with Twilio.',
    })
    .exactOptional(),
  ttl: z
    .string()
    .nullable()
    .meta({ description: 'The duration in seconds for which the username and password are valid.' })
    .exactOptional(),
  username: z
    .string()
    .nullable()
    .meta({ description: 'The temporary username that uniquely identifies a Token.' })
    .exactOptional(),
})

export type ApiV2010AccountToken = z.infer<typeof ApiV2010AccountTokenSchema>

export const TranscriptionEnumStatusSchema = z
  .enum(['in-progress', 'completed', 'failed'])
  .meta({
    description: 'The status of the transcription. Can be: `in-progress`, `completed`, `failed`.',
  })

export type TranscriptionEnumStatus = z.infer<typeof TranscriptionEnumStatusSchema>

export const ApiV2010AccountTranscriptionSchema = z.object({
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Transcription resource.',
    })
    .exactOptional(),
  api_version: z
    .string()
    .nullable()
    .meta({ description: 'The API version used to create the transcription.' })
    .exactOptional(),
  date_created: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  date_updated: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  duration: z
    .string()
    .nullable()
    .meta({ description: 'The duration of the transcribed audio in seconds.' })
    .exactOptional(),
  price: z
    .number()
    .nullable()
    .meta({
      description:
        'The charge for the transcript in the currency associated with the account. This value is populated after the transcript is complete so it may not be available immediately.',
    })
    .exactOptional(),
  price_unit: z
    .string()
    .nullable()
    .meta({
      description:
        'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format (e.g. `usd`, `eur`, `jpy`).',
    })
    .exactOptional(),
  recording_sid: z
    .string()
    .regex(/^RE[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Recording](https://www.twilio.com/docs/voice/api/recording) from which the transcription was created.',
    })
    .exactOptional(),
  sid: z
    .string()
    .regex(/^TR[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description: 'The unique string that that we created to identify the Transcription resource.',
    })
    .exactOptional(),
  status: TranscriptionEnumStatusSchema.exactOptional(),
  transcription_text: z
    .string()
    .nullable()
    .meta({ description: 'The text content of the transcription.' })
    .exactOptional(),
  type: z
    .string()
    .nullable()
    .meta({ description: 'The transcription type. Can only be: `fast`.' })
    .exactOptional(),
  uri: z
    .string()
    .nullable()
    .meta({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' })
    .exactOptional(),
})

export type ApiV2010AccountTranscription = z.infer<typeof ApiV2010AccountTranscriptionSchema>

export const ApiV2010AccountUsageSchema = z.object({})

export type ApiV2010AccountUsage = z.infer<typeof ApiV2010AccountUsageSchema>

export const ApiV2010AccountUsageUsageRecordSchema = z.object({
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
    })
    .exactOptional(),
  api_version: z
    .string()
    .nullable()
    .meta({ description: 'The API version used to create the resource.' })
    .exactOptional(),
  as_of: z
    .string()
    .nullable()
    .meta({
      description:
        'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
    })
    .exactOptional(),
  category: z
    .string()
    .nullable()
    .meta({
      description:
        'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
    })
    .exactOptional(),
  count: z
    .string()
    .nullable()
    .meta({ description: 'The number of usage events, such as the number of calls.' })
    .exactOptional(),
  count_unit: z
    .string()
    .nullable()
    .meta({
      description:
        'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
    })
    .exactOptional(),
  description: z
    .string()
    .nullable()
    .meta({ description: 'A plain-language description of the usage category.' })
    .exactOptional(),
  end_date: z.iso
    .date()
    .nullable()
    .meta({
      description:
        'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    })
    .exactOptional(),
  price: z
    .number()
    .nullable()
    .meta({
      description:
        'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
    })
    .exactOptional(),
  price_unit: z
    .string()
    .nullable()
    .meta({
      description:
        'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
    })
    .exactOptional(),
  start_date: z.iso
    .date()
    .nullable()
    .meta({
      description:
        'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    })
    .exactOptional(),
  subresource_uris: z
    .object({})
    .nullable()
    .meta({
      description:
        'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
    })
    .exactOptional(),
  uri: z
    .string()
    .nullable()
    .meta({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' })
    .exactOptional(),
  usage: z
    .string()
    .nullable()
    .meta({
      description: 'The amount used to bill usage and measured in units described in `usage_unit`.',
    })
    .exactOptional(),
  usage_unit: z
    .string()
    .nullable()
    .meta({
      description:
        'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
    })
    .exactOptional(),
})

export type ApiV2010AccountUsageUsageRecord = z.infer<typeof ApiV2010AccountUsageUsageRecordSchema>

export const ApiV2010AccountUsageUsageRecordUsageRecordAllTimeSchema = z.object({
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
    })
    .exactOptional(),
  api_version: z
    .string()
    .nullable()
    .meta({ description: 'The API version used to create the resource.' })
    .exactOptional(),
  as_of: z
    .string()
    .nullable()
    .meta({
      description:
        'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
    })
    .exactOptional(),
  category: z
    .string()
    .nullable()
    .meta({
      description:
        'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
    })
    .exactOptional(),
  count: z
    .string()
    .nullable()
    .meta({ description: 'The number of usage events, such as the number of calls.' })
    .exactOptional(),
  count_unit: z
    .string()
    .nullable()
    .meta({
      description:
        'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
    })
    .exactOptional(),
  description: z
    .string()
    .nullable()
    .meta({ description: 'A plain-language description of the usage category.' })
    .exactOptional(),
  end_date: z.iso
    .date()
    .nullable()
    .meta({
      description:
        'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    })
    .exactOptional(),
  price: z
    .number()
    .nullable()
    .meta({
      description:
        'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
    })
    .exactOptional(),
  price_unit: z
    .string()
    .nullable()
    .meta({
      description:
        'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
    })
    .exactOptional(),
  start_date: z.iso
    .date()
    .nullable()
    .meta({
      description:
        'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    })
    .exactOptional(),
  subresource_uris: z
    .object({})
    .nullable()
    .meta({
      description:
        'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
    })
    .exactOptional(),
  uri: z
    .string()
    .nullable()
    .meta({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' })
    .exactOptional(),
  usage: z
    .string()
    .nullable()
    .meta({
      description: 'The amount used to bill usage and measured in units described in `usage_unit`.',
    })
    .exactOptional(),
  usage_unit: z
    .string()
    .nullable()
    .meta({
      description:
        'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
    })
    .exactOptional(),
})

export type ApiV2010AccountUsageUsageRecordUsageRecordAllTime = z.infer<
  typeof ApiV2010AccountUsageUsageRecordUsageRecordAllTimeSchema
>

export const ApiV2010AccountUsageUsageRecordUsageRecordDailySchema = z.object({
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
    })
    .exactOptional(),
  api_version: z
    .string()
    .nullable()
    .meta({ description: 'The API version used to create the resource.' })
    .exactOptional(),
  as_of: z
    .string()
    .nullable()
    .meta({
      description:
        'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
    })
    .exactOptional(),
  category: z
    .string()
    .nullable()
    .meta({
      description:
        'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
    })
    .exactOptional(),
  count: z
    .string()
    .nullable()
    .meta({ description: 'The number of usage events, such as the number of calls.' })
    .exactOptional(),
  count_unit: z
    .string()
    .nullable()
    .meta({
      description:
        'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
    })
    .exactOptional(),
  description: z
    .string()
    .nullable()
    .meta({ description: 'A plain-language description of the usage category.' })
    .exactOptional(),
  end_date: z.iso
    .date()
    .nullable()
    .meta({
      description:
        'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    })
    .exactOptional(),
  price: z
    .number()
    .nullable()
    .meta({
      description:
        'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
    })
    .exactOptional(),
  price_unit: z
    .string()
    .nullable()
    .meta({
      description:
        'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
    })
    .exactOptional(),
  start_date: z.iso
    .date()
    .nullable()
    .meta({
      description:
        'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    })
    .exactOptional(),
  subresource_uris: z
    .object({})
    .nullable()
    .meta({
      description:
        'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
    })
    .exactOptional(),
  uri: z
    .string()
    .nullable()
    .meta({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' })
    .exactOptional(),
  usage: z
    .string()
    .nullable()
    .meta({
      description: 'The amount used to bill usage and measured in units described in `usage_unit`.',
    })
    .exactOptional(),
  usage_unit: z
    .string()
    .nullable()
    .meta({
      description:
        'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
    })
    .exactOptional(),
})

export type ApiV2010AccountUsageUsageRecordUsageRecordDaily = z.infer<
  typeof ApiV2010AccountUsageUsageRecordUsageRecordDailySchema
>

export const ApiV2010AccountUsageUsageRecordUsageRecordLastMonthSchema = z.object({
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
    })
    .exactOptional(),
  api_version: z
    .string()
    .nullable()
    .meta({ description: 'The API version used to create the resource.' })
    .exactOptional(),
  as_of: z
    .string()
    .nullable()
    .meta({
      description:
        'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
    })
    .exactOptional(),
  category: z
    .string()
    .nullable()
    .meta({
      description:
        'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
    })
    .exactOptional(),
  count: z
    .string()
    .nullable()
    .meta({ description: 'The number of usage events, such as the number of calls.' })
    .exactOptional(),
  count_unit: z
    .string()
    .nullable()
    .meta({
      description:
        'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
    })
    .exactOptional(),
  description: z
    .string()
    .nullable()
    .meta({ description: 'A plain-language description of the usage category.' })
    .exactOptional(),
  end_date: z.iso
    .date()
    .nullable()
    .meta({
      description:
        'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    })
    .exactOptional(),
  price: z
    .number()
    .nullable()
    .meta({
      description:
        'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
    })
    .exactOptional(),
  price_unit: z
    .string()
    .nullable()
    .meta({
      description:
        'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
    })
    .exactOptional(),
  start_date: z.iso
    .date()
    .nullable()
    .meta({
      description:
        'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    })
    .exactOptional(),
  subresource_uris: z
    .object({})
    .nullable()
    .meta({
      description:
        'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
    })
    .exactOptional(),
  uri: z
    .string()
    .nullable()
    .meta({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' })
    .exactOptional(),
  usage: z
    .string()
    .nullable()
    .meta({
      description: 'The amount used to bill usage and measured in units described in `usage_unit`.',
    })
    .exactOptional(),
  usage_unit: z
    .string()
    .nullable()
    .meta({
      description:
        'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
    })
    .exactOptional(),
})

export type ApiV2010AccountUsageUsageRecordUsageRecordLastMonth = z.infer<
  typeof ApiV2010AccountUsageUsageRecordUsageRecordLastMonthSchema
>

export const ApiV2010AccountUsageUsageRecordUsageRecordMonthlySchema = z.object({
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
    })
    .exactOptional(),
  api_version: z
    .string()
    .nullable()
    .meta({ description: 'The API version used to create the resource.' })
    .exactOptional(),
  as_of: z
    .string()
    .nullable()
    .meta({
      description:
        'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
    })
    .exactOptional(),
  category: z
    .string()
    .nullable()
    .meta({
      description:
        'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
    })
    .exactOptional(),
  count: z
    .string()
    .nullable()
    .meta({ description: 'The number of usage events, such as the number of calls.' })
    .exactOptional(),
  count_unit: z
    .string()
    .nullable()
    .meta({
      description:
        'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
    })
    .exactOptional(),
  description: z
    .string()
    .nullable()
    .meta({ description: 'A plain-language description of the usage category.' })
    .exactOptional(),
  end_date: z.iso
    .date()
    .nullable()
    .meta({
      description:
        'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    })
    .exactOptional(),
  price: z
    .number()
    .nullable()
    .meta({
      description:
        'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
    })
    .exactOptional(),
  price_unit: z
    .string()
    .nullable()
    .meta({
      description:
        'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
    })
    .exactOptional(),
  start_date: z.iso
    .date()
    .nullable()
    .meta({
      description:
        'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    })
    .exactOptional(),
  subresource_uris: z
    .object({})
    .nullable()
    .meta({
      description:
        'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
    })
    .exactOptional(),
  uri: z
    .string()
    .nullable()
    .meta({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' })
    .exactOptional(),
  usage: z
    .string()
    .nullable()
    .meta({
      description: 'The amount used to bill usage and measured in units described in `usage_unit`.',
    })
    .exactOptional(),
  usage_unit: z
    .string()
    .nullable()
    .meta({
      description:
        'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
    })
    .exactOptional(),
})

export type ApiV2010AccountUsageUsageRecordUsageRecordMonthly = z.infer<
  typeof ApiV2010AccountUsageUsageRecordUsageRecordMonthlySchema
>

export const ApiV2010AccountUsageUsageRecordUsageRecordThisMonthSchema = z.object({
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
    })
    .exactOptional(),
  api_version: z
    .string()
    .nullable()
    .meta({ description: 'The API version used to create the resource.' })
    .exactOptional(),
  as_of: z
    .string()
    .nullable()
    .meta({
      description:
        'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
    })
    .exactOptional(),
  category: z
    .string()
    .nullable()
    .meta({
      description:
        'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
    })
    .exactOptional(),
  count: z
    .string()
    .nullable()
    .meta({ description: 'The number of usage events, such as the number of calls.' })
    .exactOptional(),
  count_unit: z
    .string()
    .nullable()
    .meta({
      description:
        'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
    })
    .exactOptional(),
  description: z
    .string()
    .nullable()
    .meta({ description: 'A plain-language description of the usage category.' })
    .exactOptional(),
  end_date: z.iso
    .date()
    .nullable()
    .meta({
      description:
        'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    })
    .exactOptional(),
  price: z
    .number()
    .nullable()
    .meta({
      description:
        'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
    })
    .exactOptional(),
  price_unit: z
    .string()
    .nullable()
    .meta({
      description:
        'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
    })
    .exactOptional(),
  start_date: z.iso
    .date()
    .nullable()
    .meta({
      description:
        'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    })
    .exactOptional(),
  subresource_uris: z
    .object({})
    .nullable()
    .meta({
      description:
        'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
    })
    .exactOptional(),
  uri: z
    .string()
    .nullable()
    .meta({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' })
    .exactOptional(),
  usage: z
    .string()
    .nullable()
    .meta({
      description: 'The amount used to bill usage and measured in units described in `usage_unit`.',
    })
    .exactOptional(),
  usage_unit: z
    .string()
    .nullable()
    .meta({
      description:
        'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
    })
    .exactOptional(),
})

export type ApiV2010AccountUsageUsageRecordUsageRecordThisMonth = z.infer<
  typeof ApiV2010AccountUsageUsageRecordUsageRecordThisMonthSchema
>

export const ApiV2010AccountUsageUsageRecordUsageRecordTodaySchema = z.object({
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
    })
    .exactOptional(),
  api_version: z
    .string()
    .nullable()
    .meta({ description: 'The API version used to create the resource.' })
    .exactOptional(),
  as_of: z
    .string()
    .nullable()
    .meta({
      description:
        'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
    })
    .exactOptional(),
  category: z
    .string()
    .nullable()
    .meta({
      description:
        'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
    })
    .exactOptional(),
  count: z
    .string()
    .nullable()
    .meta({ description: 'The number of usage events, such as the number of calls.' })
    .exactOptional(),
  count_unit: z
    .string()
    .nullable()
    .meta({
      description:
        'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
    })
    .exactOptional(),
  description: z
    .string()
    .nullable()
    .meta({ description: 'A plain-language description of the usage category.' })
    .exactOptional(),
  end_date: z.iso
    .date()
    .nullable()
    .meta({
      description:
        'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    })
    .exactOptional(),
  price: z
    .number()
    .nullable()
    .meta({
      description:
        'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
    })
    .exactOptional(),
  price_unit: z
    .string()
    .nullable()
    .meta({
      description:
        'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
    })
    .exactOptional(),
  start_date: z.iso
    .date()
    .nullable()
    .meta({
      description:
        'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    })
    .exactOptional(),
  subresource_uris: z
    .object({})
    .nullable()
    .meta({
      description:
        'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
    })
    .exactOptional(),
  uri: z
    .string()
    .nullable()
    .meta({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' })
    .exactOptional(),
  usage: z
    .string()
    .nullable()
    .meta({
      description: 'The amount used to bill usage and measured in units described in `usage_unit`.',
    })
    .exactOptional(),
  usage_unit: z
    .string()
    .nullable()
    .meta({
      description:
        'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
    })
    .exactOptional(),
})

export type ApiV2010AccountUsageUsageRecordUsageRecordToday = z.infer<
  typeof ApiV2010AccountUsageUsageRecordUsageRecordTodaySchema
>

export const ApiV2010AccountUsageUsageRecordUsageRecordYearlySchema = z.object({
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
    })
    .exactOptional(),
  api_version: z
    .string()
    .nullable()
    .meta({ description: 'The API version used to create the resource.' })
    .exactOptional(),
  as_of: z
    .string()
    .nullable()
    .meta({
      description:
        'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
    })
    .exactOptional(),
  category: z
    .string()
    .nullable()
    .meta({
      description:
        'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
    })
    .exactOptional(),
  count: z
    .string()
    .nullable()
    .meta({ description: 'The number of usage events, such as the number of calls.' })
    .exactOptional(),
  count_unit: z
    .string()
    .nullable()
    .meta({
      description:
        'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
    })
    .exactOptional(),
  description: z
    .string()
    .nullable()
    .meta({ description: 'A plain-language description of the usage category.' })
    .exactOptional(),
  end_date: z.iso
    .date()
    .nullable()
    .meta({
      description:
        'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    })
    .exactOptional(),
  price: z
    .number()
    .nullable()
    .meta({
      description:
        'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
    })
    .exactOptional(),
  price_unit: z
    .string()
    .nullable()
    .meta({
      description:
        'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
    })
    .exactOptional(),
  start_date: z.iso
    .date()
    .nullable()
    .meta({
      description:
        'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    })
    .exactOptional(),
  subresource_uris: z
    .object({})
    .nullable()
    .meta({
      description:
        'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
    })
    .exactOptional(),
  uri: z
    .string()
    .nullable()
    .meta({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' })
    .exactOptional(),
  usage: z
    .string()
    .nullable()
    .meta({
      description: 'The amount used to bill usage and measured in units described in `usage_unit`.',
    })
    .exactOptional(),
  usage_unit: z
    .string()
    .nullable()
    .meta({
      description:
        'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
    })
    .exactOptional(),
})

export type ApiV2010AccountUsageUsageRecordUsageRecordYearly = z.infer<
  typeof ApiV2010AccountUsageUsageRecordUsageRecordYearlySchema
>

export const ApiV2010AccountUsageUsageRecordUsageRecordYesterdaySchema = z.object({
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.',
    })
    .exactOptional(),
  api_version: z
    .string()
    .nullable()
    .meta({ description: 'The API version used to create the resource.' })
    .exactOptional(),
  as_of: z
    .string()
    .nullable()
    .meta({
      description:
        'Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT',
    })
    .exactOptional(),
  category: z
    .string()
    .nullable()
    .meta({
      description:
        'The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
    })
    .exactOptional(),
  count: z
    .string()
    .nullable()
    .meta({ description: 'The number of usage events, such as the number of calls.' })
    .exactOptional(),
  count_unit: z
    .string()
    .nullable()
    .meta({
      description:
        'The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.',
    })
    .exactOptional(),
  description: z
    .string()
    .nullable()
    .meta({ description: 'A plain-language description of the usage category.' })
    .exactOptional(),
  end_date: z.iso
    .date()
    .nullable()
    .meta({
      description:
        'The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    })
    .exactOptional(),
  price: z
    .number()
    .nullable()
    .meta({
      description:
        'The total price of the usage in the currency specified in `price_unit` and associated with the account.',
    })
    .exactOptional(),
  price_unit: z
    .string()
    .nullable()
    .meta({
      description:
        'The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.',
    })
    .exactOptional(),
  start_date: z.iso
    .date()
    .nullable()
    .meta({
      description:
        'The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.',
    })
    .exactOptional(),
  subresource_uris: z
    .object({})
    .nullable()
    .meta({
      description:
        'A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).',
    })
    .exactOptional(),
  uri: z
    .string()
    .nullable()
    .meta({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' })
    .exactOptional(),
  usage: z
    .string()
    .nullable()
    .meta({
      description: 'The amount used to bill usage and measured in units described in `usage_unit`.',
    })
    .exactOptional(),
  usage_unit: z
    .string()
    .nullable()
    .meta({
      description:
        'The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.',
    })
    .exactOptional(),
})

export type ApiV2010AccountUsageUsageRecordUsageRecordYesterday = z.infer<
  typeof ApiV2010AccountUsageUsageRecordUsageRecordYesterdaySchema
>

export const UsageTriggerEnumRecurringSchema = z
  .enum(['daily', 'monthly', 'yearly', 'alltime'])
  .meta({
    description:
      'The frequency of a recurring UsageTrigger.  Can be: `daily`, `monthly`, or `yearly` for recurring triggers or empty for non-recurring triggers. A trigger will only fire once during each period. Recurring times are in GMT.',
  })

export type UsageTriggerEnumRecurring = z.infer<typeof UsageTriggerEnumRecurringSchema>

export const UsageTriggerEnumTriggerFieldSchema = z
  .enum(['count', 'usage', 'price'])
  .meta({
    description:
      'The field in the [UsageRecord](https://www.twilio.com/docs/usage/api/usage-record) resource that fires the trigger.  Can be: `count`, `usage`, or `price`, as described in the [UsageRecords documentation](https://www.twilio.com/docs/usage/api/usage-record#usage-count-price).',
  })

export type UsageTriggerEnumTriggerField = z.infer<typeof UsageTriggerEnumTriggerFieldSchema>

export const ApiV2010AccountUsageUsageTriggerSchema = z.object({
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that the trigger monitors.',
    })
    .exactOptional(),
  api_version: z
    .string()
    .nullable()
    .meta({ description: 'The API version used to create the resource.' })
    .exactOptional(),
  callback_method: z
    .enum(['GET', 'POST'])
    .nullable()
    .meta({
      description: 'The HTTP method we use to call `callback_url`. Can be: `GET` or `POST`.',
    })
    .exactOptional(),
  callback_url: z
    .url()
    .nullable()
    .meta({ description: 'The URL we call using the `callback_method` when the trigger fires.' })
    .exactOptional(),
  current_value: z
    .string()
    .nullable()
    .meta({ description: 'The current value of the field the trigger is watching.' })
    .exactOptional(),
  date_created: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  date_fired: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the trigger was last fired specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  date_updated: z
    .string()
    .nullable()
    .meta({
      description:
        'The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.',
    })
    .exactOptional(),
  friendly_name: z
    .string()
    .nullable()
    .meta({ description: 'The string that you assigned to describe the trigger.' })
    .exactOptional(),
  recurring: UsageTriggerEnumRecurringSchema.exactOptional(),
  sid: z
    .string()
    .regex(/^UT[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description: 'The unique string that that we created to identify the UsageTrigger resource.',
    })
    .exactOptional(),
  trigger_by: UsageTriggerEnumTriggerFieldSchema.exactOptional(),
  trigger_value: z
    .string()
    .nullable()
    .meta({
      description: 'The value at which the trigger will fire.  Must be a positive, numeric value.',
    })
    .exactOptional(),
  uri: z
    .string()
    .nullable()
    .meta({ description: 'The URI of the resource, relative to `https://api.twilio.com`.' })
    .exactOptional(),
  usage_category: z
    .string()
    .nullable()
    .meta({
      description:
        'The usage category the trigger watches. Must be one of the supported [usage categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).',
    })
    .exactOptional(),
  usage_record_uri: z
    .string()
    .nullable()
    .meta({
      description:
        'The URI of the [UsageRecord](https://www.twilio.com/docs/usage/api/usage-record) resource this trigger watches, relative to `https://api.twilio.com`.',
    })
    .exactOptional(),
})

export type ApiV2010AccountUsageUsageTrigger = z.infer<
  typeof ApiV2010AccountUsageUsageTriggerSchema
>

export const ApiV2010AccountCallUserDefinedMessageSchema = z.object({
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created User Defined Message.',
    })
    .exactOptional(),
  call_sid: z
    .string()
    .regex(/^CA[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the User Defined Message is associated with.',
    })
    .exactOptional(),
  sid: z
    .string()
    .regex(/^KX[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({ description: 'The SID that uniquely identifies this User Defined Message.' })
    .exactOptional(),
  date_created: z
    .string()
    .nullable()
    .meta({
      description: 'The date that this User Defined Message was created, given in RFC 2822 format.',
    })
    .exactOptional(),
})

export type ApiV2010AccountCallUserDefinedMessage = z.infer<
  typeof ApiV2010AccountCallUserDefinedMessageSchema
>

export const ApiV2010AccountCallUserDefinedMessageSubscriptionSchema = z.object({
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that subscribed to the User Defined Messages.',
    })
    .exactOptional(),
  call_sid: z
    .string()
    .regex(/^CA[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the User Defined Message Subscription is associated with. This refers to the Call SID that is producing the User Defined Messages.',
    })
    .exactOptional(),
  sid: z
    .string()
    .regex(/^ZY[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description: 'The SID that uniquely identifies this User Defined Message Subscription.',
    })
    .exactOptional(),
  date_created: z
    .string()
    .nullable()
    .meta({
      description:
        'The date that this User Defined Message Subscription was created, given in RFC 2822 format.',
    })
    .exactOptional(),
  uri: z
    .string()
    .nullable()
    .meta({
      description:
        'The URI of the User Defined Message Subscription Resource, relative to `https://api.twilio.com`.',
    })
    .exactOptional(),
})

export type ApiV2010AccountCallUserDefinedMessageSubscription = z.infer<
  typeof ApiV2010AccountCallUserDefinedMessageSubscriptionSchema
>

export const ApiV2010AccountValidationRequestSchema = z.object({
  account_sid: z
    .string()
    .regex(/^AC[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Account](https://www.twilio.com/docs/iam/api/account) responsible for the Caller ID.',
    })
    .exactOptional(),
  call_sid: z
    .string()
    .regex(/^CA[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Caller ID is associated with.',
    })
    .exactOptional(),
  friendly_name: z
    .string()
    .nullable()
    .meta({ description: 'The string that you assigned to describe the resource.' })
    .exactOptional(),
  phone_number: z
    .string()
    .nullable()
    .meta({
      description:
        'The phone number to verify in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.',
    })
    .exactOptional(),
  validation_code: z
    .string()
    .nullable()
    .meta({
      description:
        'The 6 digit validation code that someone must enter to validate the Caller ID  when `phone_number` is called.',
    })
    .exactOptional(),
})

export type ApiV2010AccountValidationRequest = z.infer<
  typeof ApiV2010AccountValidationRequestSchema
>

export const ApiV2010AccountOutgoingCallerIdSmsVerificationSchema = z.object({
  phone_number: z
    .string()
    .nullable()
    .meta({
      description:
        'The phone number being verified in [E.164](https://www.twilio.com/docs/glossary/what-e164) format.',
    })
    .exactOptional(),
  verification_sid: z
    .string()
    .nullable()
    .meta({ description: 'The SID that uniquely identifies the verification.' })
    .exactOptional(),
  send_code_attempts: z
    .array(
      z.object({
        attempt_sid: z
          .string()
          .meta({ description: 'The SID of the verification attempt.' })
          .exactOptional(),
        time: z
          .string()
          .meta({ description: 'The date and time of the attempt in ISO 8601 format.' })
          .exactOptional(),
      }),
    )
    .nullable()
    .meta({
      description:
        'An array of verification attempt objects containing the channel attempted and the channel-specific transaction SID.',
    })
    .exactOptional(),
})

export type ApiV2010AccountOutgoingCallerIdSmsVerification = z.infer<
  typeof ApiV2010AccountOutgoingCallerIdSmsVerificationSchema
>

export const ApiV2010AccountOutgoingCallerIdVerificationCheckSchema = z.object({
  phone_number: z
    .string()
    .nullable()
    .meta({
      description:
        'The phone number being verified in [E.164](https://www.twilio.com/docs/glossary/what-e164) format.',
    })
    .exactOptional(),
  verification_sid: z
    .string()
    .nullable()
    .meta({ description: 'The SID that uniquely identifies the verification.' })
    .exactOptional(),
  status: z
    .string()
    .nullable()
    .meta({
      description: 'The status of the verification. Can be: `pending`, `approved`, or `failed`.',
    })
    .exactOptional(),
  caller_id_sid: z
    .string()
    .regex(/^PN[0-9a-fA-F]{32}$/)
    .length(34)
    .nullable()
    .meta({
      description:
        'The SID of the OutgoingCallerId resource created when verification is approved.',
    })
    .exactOptional(),
})

export type ApiV2010AccountOutgoingCallerIdVerificationCheck = z.infer<
  typeof ApiV2010AccountOutgoingCallerIdVerificationCheckSchema
>

export const AccountSidAuthTokenSecurityScheme = { scheme: 'basic', type: 'http' }

export const get20100401AccountsJsonHandler = defineHandler({
  query: z.object({
    FriendlyName: z.string().exactOptional(),
    Status: AccountEnumStatusSchema.exactOptional(),
    PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
    Page: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(0),
      )
      .exactOptional(),
    PageToken: z.string().exactOptional(),
  }),
  response: z.object({
    end: z.int().exactOptional(),
    first_page_uri: z.url().exactOptional(),
    next_page_uri: z.url().nullable().exactOptional(),
    page: z.int().exactOptional(),
    page_size: z.int().exactOptional(),
    previous_page_uri: z.url().nullable().exactOptional(),
    start: z.int().exactOptional(),
    uri: z.url().exactOptional(),
    accounts: z.array(ApiV2010AccountSchema).exactOptional(),
  }),
})

export const post20100401AccountsJsonHandler = defineHandler({
  form: z.object({
    FriendlyName: z
      .string()
      .meta({
        description:
          'A human readable description of the account to create, defaults to `SubAccount Created at {YYYY-MM-DD HH:MM meridian}`',
      })
      .exactOptional(),
  }),
  response: ApiV2010AccountSchema,
})

export const get20100401AccountsSidJsonHandler = defineHandler({
  param: z.object({
    Sid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  response: ApiV2010AccountSchema,
})

export const post20100401AccountsSidJsonHandler = defineHandler({
  param: z.object({
    Sid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  form: z.object({
    FriendlyName: z
      .string()
      .meta({ description: 'Update the human-readable description of this Account' })
      .exactOptional(),
    Status: AccountEnumStatusSchema.exactOptional(),
  }),
  response: ApiV2010AccountSchema,
})

export const get20100401AccountsAccountSidAddressesJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  query: z.object({
    CustomerName: z.string().exactOptional(),
    FriendlyName: z.string().exactOptional(),
    EmergencyEnabled: z.stringbool().exactOptional(),
    IsoCountry: z.string().exactOptional(),
    PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
    Page: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(0),
      )
      .exactOptional(),
    PageToken: z.string().exactOptional(),
  }),
  response: z.object({
    end: z.int().exactOptional(),
    first_page_uri: z.url().exactOptional(),
    next_page_uri: z.url().nullable().exactOptional(),
    page: z.int().exactOptional(),
    page_size: z.int().exactOptional(),
    previous_page_uri: z.url().nullable().exactOptional(),
    start: z.int().exactOptional(),
    uri: z.url().exactOptional(),
    addresses: z.array(ApiV2010AccountAddressSchema).exactOptional(),
  }),
})

export const post20100401AccountsAccountSidAddressesJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  form: z.object({
    CustomerName: z.string().meta({ description: 'The name to associate with the new address.' }),
    Street: z.string().meta({ description: 'The number and street address of the new address.' }),
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
  response: ApiV2010AccountAddressSchema,
})

export const get20100401AccountsAccountSidAddressesSidJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    Sid: z
      .string()
      .regex(/^AD[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  response: ApiV2010AccountAddressSchema,
})

export const post20100401AccountsAccountSidAddressesSidJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    Sid: z
      .string()
      .regex(/^AD[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  form: z.object({
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
    Region: z.string().meta({ description: 'The state or region of the address.' }).exactOptional(),
    PostalCode: z.string().meta({ description: 'The postal code of the address.' }).exactOptional(),
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
  response: ApiV2010AccountAddressSchema,
})

export const delete20100401AccountsAccountSidAddressesSidJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    Sid: z
      .string()
      .regex(/^AD[0-9a-fA-F]{32}$/)
      .length(34),
  }),
})

export const get20100401AccountsAccountSidApplicationsJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  query: z.object({
    FriendlyName: z.string().exactOptional(),
    PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
    Page: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(0),
      )
      .exactOptional(),
    PageToken: z.string().exactOptional(),
  }),
  response: z.object({
    end: z.int().exactOptional(),
    first_page_uri: z.url().exactOptional(),
    next_page_uri: z.url().nullable().exactOptional(),
    page: z.int().exactOptional(),
    page_size: z.int().exactOptional(),
    previous_page_uri: z.url().nullable().exactOptional(),
    start: z.int().exactOptional(),
    uri: z.url().exactOptional(),
    applications: z.array(ApiV2010AccountApplicationSchema).exactOptional(),
  }),
})

export const post20100401AccountsAccountSidApplicationsJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  form: z.object({
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
        description: 'The HTTP method we should use to call `voice_url`. Can be: `GET` or `POST`.',
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
        description: 'The HTTP method we should use to call `sms_url`. Can be: `GET` or `POST`.',
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
  response: ApiV2010AccountApplicationSchema,
})

export const get20100401AccountsAccountSidApplicationsSidJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    Sid: z
      .string()
      .regex(/^AP[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  response: ApiV2010AccountApplicationSchema,
})

export const post20100401AccountsAccountSidApplicationsSidJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    Sid: z
      .string()
      .regex(/^AP[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  form: z.object({
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
        description: 'The HTTP method we should use to call `voice_url`. Can be: `GET` or `POST`.',
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
        description: 'The HTTP method we should use to call `sms_url`. Can be: `GET` or `POST`.',
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
  response: ApiV2010AccountApplicationSchema,
})

export const delete20100401AccountsAccountSidApplicationsSidJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    Sid: z
      .string()
      .regex(/^AP[0-9a-fA-F]{32}$/)
      .length(34),
  }),
})

export const get20100401AccountsAccountSidAuthorizedConnectAppsConnectAppSidJsonHandler =
  defineHandler({
    param: z.object({
      AccountSid: z
        .string()
        .regex(/^AC[0-9a-fA-F]{32}$/)
        .length(34),
      ConnectAppSid: z
        .string()
        .regex(/^CN[0-9a-fA-F]{32}$/)
        .length(34),
    }),
    response: ApiV2010AccountAuthorizedConnectAppSchema,
  })

export const get20100401AccountsAccountSidAuthorizedConnectAppsJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  query: z.object({
    PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
    Page: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(0),
      )
      .exactOptional(),
    PageToken: z.string().exactOptional(),
  }),
  response: z.object({
    end: z.int().exactOptional(),
    first_page_uri: z.url().exactOptional(),
    next_page_uri: z.url().nullable().exactOptional(),
    page: z.int().exactOptional(),
    page_size: z.int().exactOptional(),
    previous_page_uri: z.url().nullable().exactOptional(),
    start: z.int().exactOptional(),
    uri: z.url().exactOptional(),
    authorized_connect_apps: z.array(ApiV2010AccountAuthorizedConnectAppSchema).exactOptional(),
  }),
})

export const get20100401AccountsAccountSidAvailablePhoneNumbersJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  query: z.object({
    PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
    Page: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(0),
      )
      .exactOptional(),
    PageToken: z.string().exactOptional(),
  }),
  response: z.object({
    countries: z.array(ApiV2010AccountAvailablePhoneNumberCountrySchema).exactOptional(),
    uri: z.url().nullable().exactOptional(),
  }),
})

export const get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeJsonHandler =
  defineHandler({
    param: z.object({
      AccountSid: z
        .string()
        .regex(/^AC[0-9a-fA-F]{32}$/)
        .length(34),
      CountryCode: z.string(),
    }),
    response: ApiV2010AccountAvailablePhoneNumberCountrySchema,
  })

export const get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeLocalJsonHandler =
  defineHandler({
    param: z.object({
      AccountSid: z
        .string()
        .regex(/^AC[0-9a-fA-F]{32}$/)
        .length(34),
      CountryCode: z.string(),
    }),
    query: z.object({
      AreaCode: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
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
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
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
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int().min(0),
        )
        .exactOptional(),
      PageToken: z.string().exactOptional(),
    }),
    response: z.object({
      end: z.int().exactOptional(),
      first_page_uri: z.url().exactOptional(),
      next_page_uri: z.url().nullable().exactOptional(),
      page: z.int().exactOptional(),
      page_size: z.int().exactOptional(),
      previous_page_uri: z.url().nullable().exactOptional(),
      start: z.int().exactOptional(),
      uri: z.url().exactOptional(),
      available_phone_numbers: z
        .array(ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberLocalSchema)
        .exactOptional(),
    }),
  })

export const get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMachineToMachineJsonHandler =
  defineHandler({
    param: z.object({
      AccountSid: z
        .string()
        .regex(/^AC[0-9a-fA-F]{32}$/)
        .length(34),
      CountryCode: z.string(),
    }),
    query: z.object({
      AreaCode: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
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
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
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
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int().min(0),
        )
        .exactOptional(),
      PageToken: z.string().exactOptional(),
    }),
    response: z.object({
      end: z.int().exactOptional(),
      first_page_uri: z.url().exactOptional(),
      next_page_uri: z.url().nullable().exactOptional(),
      page: z.int().exactOptional(),
      page_size: z.int().exactOptional(),
      previous_page_uri: z.url().nullable().exactOptional(),
      start: z.int().exactOptional(),
      uri: z.url().exactOptional(),
      available_phone_numbers: z
        .array(ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMachineToMachineSchema)
        .exactOptional(),
    }),
  })

export const get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMobileJsonHandler =
  defineHandler({
    param: z.object({
      AccountSid: z
        .string()
        .regex(/^AC[0-9a-fA-F]{32}$/)
        .length(34),
      CountryCode: z.string(),
    }),
    query: z.object({
      AreaCode: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
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
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
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
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int().min(0),
        )
        .exactOptional(),
      PageToken: z.string().exactOptional(),
    }),
    response: z.object({
      end: z.int().exactOptional(),
      first_page_uri: z.url().exactOptional(),
      next_page_uri: z.url().nullable().exactOptional(),
      page: z.int().exactOptional(),
      page_size: z.int().exactOptional(),
      previous_page_uri: z.url().nullable().exactOptional(),
      start: z.int().exactOptional(),
      uri: z.url().exactOptional(),
      available_phone_numbers: z
        .array(ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMobileSchema)
        .exactOptional(),
    }),
  })

export const get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeNationalJsonHandler =
  defineHandler({
    param: z.object({
      AccountSid: z
        .string()
        .regex(/^AC[0-9a-fA-F]{32}$/)
        .length(34),
      CountryCode: z.string(),
    }),
    query: z.object({
      AreaCode: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
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
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
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
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int().min(0),
        )
        .exactOptional(),
      PageToken: z.string().exactOptional(),
    }),
    response: z.object({
      end: z.int().exactOptional(),
      first_page_uri: z.url().exactOptional(),
      next_page_uri: z.url().nullable().exactOptional(),
      page: z.int().exactOptional(),
      page_size: z.int().exactOptional(),
      previous_page_uri: z.url().nullable().exactOptional(),
      start: z.int().exactOptional(),
      uri: z.url().exactOptional(),
      available_phone_numbers: z
        .array(ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberNationalSchema)
        .exactOptional(),
    }),
  })

export const get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeSharedCostJsonHandler =
  defineHandler({
    param: z.object({
      AccountSid: z
        .string()
        .regex(/^AC[0-9a-fA-F]{32}$/)
        .length(34),
      CountryCode: z.string(),
    }),
    query: z.object({
      AreaCode: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
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
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
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
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int().min(0),
        )
        .exactOptional(),
      PageToken: z.string().exactOptional(),
    }),
    response: z.object({
      end: z.int().exactOptional(),
      first_page_uri: z.url().exactOptional(),
      next_page_uri: z.url().nullable().exactOptional(),
      page: z.int().exactOptional(),
      page_size: z.int().exactOptional(),
      previous_page_uri: z.url().nullable().exactOptional(),
      start: z.int().exactOptional(),
      uri: z.url().exactOptional(),
      available_phone_numbers: z
        .array(ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberSharedCostSchema)
        .exactOptional(),
    }),
  })

export const get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeTollFreeJsonHandler =
  defineHandler({
    param: z.object({
      AccountSid: z
        .string()
        .regex(/^AC[0-9a-fA-F]{32}$/)
        .length(34),
      CountryCode: z.string(),
    }),
    query: z.object({
      AreaCode: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
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
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
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
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int().min(0),
        )
        .exactOptional(),
      PageToken: z.string().exactOptional(),
    }),
    response: z.object({
      end: z.int().exactOptional(),
      first_page_uri: z.url().exactOptional(),
      next_page_uri: z.url().nullable().exactOptional(),
      page: z.int().exactOptional(),
      page_size: z.int().exactOptional(),
      previous_page_uri: z.url().nullable().exactOptional(),
      start: z.int().exactOptional(),
      uri: z.url().exactOptional(),
      available_phone_numbers: z
        .array(ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberTollFreeSchema)
        .exactOptional(),
    }),
  })

export const get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeVoipJsonHandler =
  defineHandler({
    param: z.object({
      AccountSid: z
        .string()
        .regex(/^AC[0-9a-fA-F]{32}$/)
        .length(34),
      CountryCode: z.string(),
    }),
    query: z.object({
      AreaCode: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
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
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
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
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int().min(0),
        )
        .exactOptional(),
      PageToken: z.string().exactOptional(),
    }),
    response: z.object({
      end: z.int().exactOptional(),
      first_page_uri: z.url().exactOptional(),
      next_page_uri: z.url().nullable().exactOptional(),
      page: z.int().exactOptional(),
      page_size: z.int().exactOptional(),
      previous_page_uri: z.url().nullable().exactOptional(),
      start: z.int().exactOptional(),
      uri: z.url().exactOptional(),
      available_phone_numbers: z
        .array(ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberVoipSchema)
        .exactOptional(),
    }),
  })

export const get20100401AccountsAccountSidBalanceJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  response: ApiV2010AccountBalanceSchema,
})

export const get20100401AccountsAccountSidCallsJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  query: z.object({
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
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(0),
      )
      .exactOptional(),
    PageToken: z.string().exactOptional(),
  }),
  response: z.object({
    end: z.int().exactOptional(),
    first_page_uri: z.url().exactOptional(),
    next_page_uri: z.url().nullable().exactOptional(),
    page: z.int().exactOptional(),
    page_size: z.int().exactOptional(),
    previous_page_uri: z.url().nullable().exactOptional(),
    start: z.int().exactOptional(),
    uri: z.url().exactOptional(),
    calls: z.array(ApiV2010AccountCallSchema).exactOptional(),
  }),
})

export const post20100401AccountsAccountSidCallsJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  form: z.object({
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
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
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
      .meta({ description: 'The URL that we call when the recording is available to be accessed.' })
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
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
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
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int(),
      )
      .meta({
        description:
          'The number of milliseconds that is used as the measuring stick for the length of the speech activity, where durations lower than this value will be interpreted as a human and longer than this value as a machine. Possible Values: 1000-6000. Default: 2400.',
      })
      .exactOptional(),
    MachineDetectionSpeechEndThreshold: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int(),
      )
      .meta({
        description:
          'The number of milliseconds of silence after speech activity at which point the speech activity is considered complete. Possible Values: 500-5000. Default: 1200.',
      })
      .exactOptional(),
    MachineDetectionSilenceTimeout: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
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
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
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
  response: ApiV2010AccountCallSchema,
})

export const get20100401AccountsAccountSidCallsSidJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    Sid: z
      .string()
      .regex(/^CA[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  response: ApiV2010AccountCallSchema,
})

export const post20100401AccountsAccountSidCallsSidJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    Sid: z
      .string()
      .regex(/^CA[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  form: z.object({
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
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int(),
      )
      .meta({
        description:
          'The maximum duration of the call in seconds. Constraints depend on account and configuration.',
      })
      .exactOptional(),
  }),
  response: ApiV2010AccountCallSchema,
})

export const delete20100401AccountsAccountSidCallsSidJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    Sid: z
      .string()
      .regex(/^CA[0-9a-fA-F]{32}$/)
      .length(34),
  }),
})

export const get20100401AccountsAccountSidCallsCallSidEventsJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    CallSid: z
      .string()
      .regex(/^CA[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  query: z.object({
    PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
    Page: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(0),
      )
      .exactOptional(),
    PageToken: z.string().exactOptional(),
  }),
  response: z.object({
    end: z.int().exactOptional(),
    first_page_uri: z.url().exactOptional(),
    next_page_uri: z.url().nullable().exactOptional(),
    page: z.int().exactOptional(),
    page_size: z.int().exactOptional(),
    previous_page_uri: z.url().nullable().exactOptional(),
    start: z.int().exactOptional(),
    uri: z.url().exactOptional(),
    events: z.array(ApiV2010AccountCallCallEventSchema).exactOptional(),
  }),
})

export const get20100401AccountsAccountSidCallsCallSidNotificationsSidJsonHandler = defineHandler({
  param: z.object({
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
  response: ApiV2010AccountCallCallNotificationInstanceSchema,
})

export const get20100401AccountsAccountSidCallsCallSidNotificationsJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    CallSid: z
      .string()
      .regex(/^CA[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  query: z.object({
    Log: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int(),
      )
      .exactOptional(),
    MessageDate: z.iso.date().exactOptional(),
    'MessageDate<': z.iso.date().exactOptional(),
    'MessageDate>': z.iso.date().exactOptional(),
    PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
    Page: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(0),
      )
      .exactOptional(),
    PageToken: z.string().exactOptional(),
  }),
  response: z.object({
    end: z.int().exactOptional(),
    first_page_uri: z.url().exactOptional(),
    next_page_uri: z.url().nullable().exactOptional(),
    page: z.int().exactOptional(),
    page_size: z.int().exactOptional(),
    previous_page_uri: z.url().nullable().exactOptional(),
    start: z.int().exactOptional(),
    uri: z.url().exactOptional(),
    notifications: z.array(ApiV2010AccountCallCallNotificationSchema).exactOptional(),
  }),
})

export const get20100401AccountsAccountSidCallsCallSidRecordingsJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    CallSid: z
      .string()
      .regex(/^CA[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  query: z.object({
    DateCreated: z.iso.date().exactOptional(),
    'DateCreated<': z.iso.date().exactOptional(),
    'DateCreated>': z.iso.date().exactOptional(),
    PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
    Page: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(0),
      )
      .exactOptional(),
    PageToken: z.string().exactOptional(),
  }),
  response: z.object({
    end: z.int().exactOptional(),
    first_page_uri: z.url().exactOptional(),
    next_page_uri: z.url().nullable().exactOptional(),
    page: z.int().exactOptional(),
    page_size: z.int().exactOptional(),
    previous_page_uri: z.url().nullable().exactOptional(),
    start: z.int().exactOptional(),
    uri: z.url().exactOptional(),
    recordings: z.array(ApiV2010AccountCallCallRecordingSchema).exactOptional(),
  }),
})

export const post20100401AccountsAccountSidCallsCallSidRecordingsJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    CallSid: z
      .string()
      .regex(/^CA[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  form: z.object({
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
  response: ApiV2010AccountCallCallRecordingSchema,
})

export const get20100401AccountsAccountSidCallsCallSidRecordingsSidJsonHandler = defineHandler({
  param: z.object({
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
  response: ApiV2010AccountCallCallRecordingSchema,
})

export const post20100401AccountsAccountSidCallsCallSidRecordingsSidJsonHandler = defineHandler({
  param: z.object({
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
  form: z.object({
    Status: CallRecordingEnumStatusSchema,
    PauseBehavior: z
      .string()
      .meta({
        description:
          'Whether to record during a pause. Can be: `skip` or `silence` and the default is `silence`. `skip` does not record during the pause period, while `silence` will replace the actual audio of the call with silence during the pause period. This parameter only applies when setting `status` is set to `paused`.',
      })
      .exactOptional(),
  }),
  response: ApiV2010AccountCallCallRecordingSchema,
})

export const delete20100401AccountsAccountSidCallsCallSidRecordingsSidJsonHandler = defineHandler({
  param: z.object({
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
})

export const get20100401AccountsAccountSidConferencesSidJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    Sid: z
      .string()
      .regex(/^CF[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  response: ApiV2010AccountConferenceSchema,
})

export const post20100401AccountsAccountSidConferencesSidJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    Sid: z.string(),
  }),
  form: z.object({
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
  response: ApiV2010AccountConferenceSchema,
})

export const get20100401AccountsAccountSidConferencesJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  query: z.object({
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
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(0),
      )
      .exactOptional(),
    PageToken: z.string().exactOptional(),
  }),
  response: z.object({
    end: z.int().exactOptional(),
    first_page_uri: z.url().exactOptional(),
    next_page_uri: z.url().nullable().exactOptional(),
    page: z.int().exactOptional(),
    page_size: z.int().exactOptional(),
    previous_page_uri: z.url().nullable().exactOptional(),
    start: z.int().exactOptional(),
    uri: z.url().exactOptional(),
    conferences: z.array(ApiV2010AccountConferenceSchema).exactOptional(),
  }),
})

export const get20100401AccountsAccountSidConferencesConferenceSidRecordingsJsonHandler =
  defineHandler({
    param: z.object({
      AccountSid: z
        .string()
        .regex(/^AC[0-9a-fA-F]{32}$/)
        .length(34),
      ConferenceSid: z
        .string()
        .regex(/^CF[0-9a-fA-F]{32}$/)
        .length(34),
    }),
    query: z.object({
      DateCreated: z.iso.date().exactOptional(),
      'DateCreated<': z.iso.date().exactOptional(),
      'DateCreated>': z.iso.date().exactOptional(),
      PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
      Page: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int().min(0),
        )
        .exactOptional(),
      PageToken: z.string().exactOptional(),
    }),
    response: z.object({
      end: z.int().exactOptional(),
      first_page_uri: z.url().exactOptional(),
      next_page_uri: z.url().nullable().exactOptional(),
      page: z.int().exactOptional(),
      page_size: z.int().exactOptional(),
      previous_page_uri: z.url().nullable().exactOptional(),
      start: z.int().exactOptional(),
      uri: z.url().exactOptional(),
      recordings: z.array(ApiV2010AccountConferenceConferenceRecordingSchema).exactOptional(),
    }),
  })

export const get20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonHandler =
  defineHandler({
    param: z.object({
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
    response: ApiV2010AccountConferenceConferenceRecordingSchema,
  })

export const post20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonHandler =
  defineHandler({
    param: z.object({
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
    form: z.object({
      Status: ConferenceRecordingEnumStatusSchema,
      PauseBehavior: z
        .string()
        .meta({
          description:
            'Whether to record during a pause. Can be: `skip` or `silence` and the default is `silence`. `skip` does not record during the pause period, while `silence` will replace the actual audio of the call with silence during the pause period. This parameter only applies when setting `status` is set to `paused`.',
        })
        .exactOptional(),
    }),
    response: ApiV2010AccountConferenceConferenceRecordingSchema,
  })

export const delete20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonHandler =
  defineHandler({
    param: z.object({
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
  })

export const get20100401AccountsAccountSidConnectAppsSidJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    Sid: z
      .string()
      .regex(/^CN[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  response: ApiV2010AccountConnectAppSchema,
})

export const post20100401AccountsAccountSidConnectAppsSidJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    Sid: z
      .string()
      .regex(/^CN[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  form: z.object({
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
        description: 'A public URL where users can obtain more information about this Connect App.',
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
  response: ApiV2010AccountConnectAppSchema,
})

export const delete20100401AccountsAccountSidConnectAppsSidJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    Sid: z
      .string()
      .regex(/^CN[0-9a-fA-F]{32}$/)
      .length(34),
  }),
})

export const get20100401AccountsAccountSidConnectAppsJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  query: z.object({
    PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
    Page: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(0),
      )
      .exactOptional(),
    PageToken: z.string().exactOptional(),
  }),
  response: z.object({
    end: z.int().exactOptional(),
    first_page_uri: z.url().exactOptional(),
    next_page_uri: z.url().nullable().exactOptional(),
    page: z.int().exactOptional(),
    page_size: z.int().exactOptional(),
    previous_page_uri: z.url().nullable().exactOptional(),
    start: z.int().exactOptional(),
    uri: z.url().exactOptional(),
    connect_apps: z.array(ApiV2010AccountConnectAppSchema).exactOptional(),
  }),
})

export const get20100401AccountsAccountSidAddressesAddressSidDependentPhoneNumbersJsonHandler =
  defineHandler({
    param: z.object({
      AccountSid: z
        .string()
        .regex(/^AC[0-9a-fA-F]{32}$/)
        .length(34),
      AddressSid: z
        .string()
        .regex(/^AD[0-9a-fA-F]{32}$/)
        .length(34),
    }),
    query: z.object({
      PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
      Page: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int().min(0),
        )
        .exactOptional(),
      PageToken: z.string().exactOptional(),
    }),
    response: z.object({
      end: z.int().exactOptional(),
      first_page_uri: z.url().exactOptional(),
      next_page_uri: z.url().nullable().exactOptional(),
      page: z.int().exactOptional(),
      page_size: z.int().exactOptional(),
      previous_page_uri: z.url().nullable().exactOptional(),
      start: z.int().exactOptional(),
      uri: z.url().exactOptional(),
      dependent_phone_numbers: z
        .array(ApiV2010AccountAddressDependentPhoneNumberSchema)
        .exactOptional(),
    }),
  })

export const get20100401AccountsAccountSidIncomingPhoneNumbersSidJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    Sid: z
      .string()
      .regex(/^PN[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  response: ApiV2010AccountIncomingPhoneNumberSchema,
})

export const post20100401AccountsAccountSidIncomingPhoneNumbersSidJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    Sid: z
      .string()
      .regex(/^PN[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  form: z.object({
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
  response: ApiV2010AccountIncomingPhoneNumberSchema,
})

export const delete20100401AccountsAccountSidIncomingPhoneNumbersSidJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    Sid: z
      .string()
      .regex(/^PN[0-9a-fA-F]{32}$/)
      .length(34),
  }),
})

export const get20100401AccountsAccountSidIncomingPhoneNumbersJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  query: z.object({
    Beta: z.stringbool().exactOptional(),
    FriendlyName: z.string().exactOptional(),
    PhoneNumber: z.string().exactOptional(),
    Origin: z.string().exactOptional(),
    PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
    Page: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(0),
      )
      .exactOptional(),
    PageToken: z.string().exactOptional(),
  }),
  response: z.object({
    end: z.int().exactOptional(),
    first_page_uri: z.url().exactOptional(),
    next_page_uri: z.url().nullable().exactOptional(),
    page: z.int().exactOptional(),
    page_size: z.int().exactOptional(),
    previous_page_uri: z.url().nullable().exactOptional(),
    start: z.int().exactOptional(),
    uri: z.url().exactOptional(),
    incoming_phone_numbers: z.array(ApiV2010AccountIncomingPhoneNumberSchema).exactOptional(),
  }),
})

export const post20100401AccountsAccountSidIncomingPhoneNumbersJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  form: z.object({
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
  response: ApiV2010AccountIncomingPhoneNumberSchema,
})

export const get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJsonHandler =
  defineHandler({
    param: z.object({
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
    response: ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema,
  })

export const delete20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJsonHandler =
  defineHandler({
    param: z.object({
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
  })

export const get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJsonHandler =
  defineHandler({
    param: z.object({
      AccountSid: z
        .string()
        .regex(/^AC[0-9a-fA-F]{32}$/)
        .length(34),
      ResourceSid: z
        .string()
        .regex(/^PN[0-9a-fA-F]{32}$/)
        .length(34),
    }),
    query: z.object({
      PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
      Page: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int().min(0),
        )
        .exactOptional(),
      PageToken: z.string().exactOptional(),
    }),
    response: z.object({
      end: z.int().exactOptional(),
      first_page_uri: z.url().exactOptional(),
      next_page_uri: z.url().nullable().exactOptional(),
      page: z.int().exactOptional(),
      page_size: z.int().exactOptional(),
      previous_page_uri: z.url().nullable().exactOptional(),
      start: z.int().exactOptional(),
      uri: z.url().exactOptional(),
      assigned_add_ons: z
        .array(ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema)
        .exactOptional(),
    }),
  })

export const post20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJsonHandler =
  defineHandler({
    param: z.object({
      AccountSid: z
        .string()
        .regex(/^AC[0-9a-fA-F]{32}$/)
        .length(34),
      ResourceSid: z
        .string()
        .regex(/^PN[0-9a-fA-F]{32}$/)
        .length(34),
    }),
    form: z.object({
      InstalledAddOnSid: z
        .string()
        .regex(/^XE[0-9a-fA-F]{32}$/)
        .length(34)
        .meta({ description: 'The SID that identifies the Add-on installation.' }),
    }),
    response: ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema,
  })

export const get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsSidJsonHandler =
  defineHandler({
    param: z.object({
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
    response:
      ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtensionSchema,
  })

export const get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsJsonHandler =
  defineHandler({
    param: z.object({
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
    query: z.object({
      PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
      Page: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int().min(0),
        )
        .exactOptional(),
      PageToken: z.string().exactOptional(),
    }),
    response: z.object({
      end: z.int().exactOptional(),
      first_page_uri: z.url().exactOptional(),
      next_page_uri: z.url().nullable().exactOptional(),
      page: z.int().exactOptional(),
      page_size: z.int().exactOptional(),
      previous_page_uri: z.url().nullable().exactOptional(),
      start: z.int().exactOptional(),
      uri: z.url().exactOptional(),
      extensions: z
        .array(
          ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtensionSchema,
        )
        .exactOptional(),
    }),
  })

export const get20100401AccountsAccountSidIncomingPhoneNumbersLocalJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  query: z.object({
    Beta: z.stringbool().exactOptional(),
    FriendlyName: z.string().exactOptional(),
    PhoneNumber: z.string().exactOptional(),
    Origin: z.string().exactOptional(),
    PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
    Page: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(0),
      )
      .exactOptional(),
    PageToken: z.string().exactOptional(),
  }),
  response: z.object({
    end: z.int().exactOptional(),
    first_page_uri: z.url().exactOptional(),
    next_page_uri: z.url().nullable().exactOptional(),
    page: z.int().exactOptional(),
    page_size: z.int().exactOptional(),
    previous_page_uri: z.url().nullable().exactOptional(),
    start: z.int().exactOptional(),
    uri: z.url().exactOptional(),
    incoming_phone_numbers: z
      .array(ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocalSchema)
      .exactOptional(),
  }),
})

export const post20100401AccountsAccountSidIncomingPhoneNumbersLocalJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  form: z.object({
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
  response: ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocalSchema,
})

export const get20100401AccountsAccountSidIncomingPhoneNumbersMobileJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  query: z.object({
    Beta: z.stringbool().exactOptional(),
    FriendlyName: z.string().exactOptional(),
    PhoneNumber: z.string().exactOptional(),
    Origin: z.string().exactOptional(),
    PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
    Page: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(0),
      )
      .exactOptional(),
    PageToken: z.string().exactOptional(),
  }),
  response: z.object({
    end: z.int().exactOptional(),
    first_page_uri: z.url().exactOptional(),
    next_page_uri: z.url().nullable().exactOptional(),
    page: z.int().exactOptional(),
    page_size: z.int().exactOptional(),
    previous_page_uri: z.url().nullable().exactOptional(),
    start: z.int().exactOptional(),
    uri: z.url().exactOptional(),
    incoming_phone_numbers: z
      .array(ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobileSchema)
      .exactOptional(),
  }),
})

export const post20100401AccountsAccountSidIncomingPhoneNumbersMobileJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  form: z.object({
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
  response: ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobileSchema,
})

export const get20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  query: z.object({
    Beta: z.stringbool().exactOptional(),
    FriendlyName: z.string().exactOptional(),
    PhoneNumber: z.string().exactOptional(),
    Origin: z.string().exactOptional(),
    PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
    Page: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(0),
      )
      .exactOptional(),
    PageToken: z.string().exactOptional(),
  }),
  response: z.object({
    end: z.int().exactOptional(),
    first_page_uri: z.url().exactOptional(),
    next_page_uri: z.url().nullable().exactOptional(),
    page: z.int().exactOptional(),
    page_size: z.int().exactOptional(),
    previous_page_uri: z.url().nullable().exactOptional(),
    start: z.int().exactOptional(),
    uri: z.url().exactOptional(),
    incoming_phone_numbers: z
      .array(ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFreeSchema)
      .exactOptional(),
  }),
})

export const post20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  form: z.object({
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
  response: ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFreeSchema,
})

export const get20100401AccountsAccountSidKeysSidJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    Sid: z
      .string()
      .regex(/^SK[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  response: ApiV2010AccountKeySchema,
})

export const post20100401AccountsAccountSidKeysSidJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    Sid: z
      .string()
      .regex(/^SK[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  form: z.object({
    FriendlyName: z
      .string()
      .meta({
        description:
          'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
      })
      .exactOptional(),
  }),
  response: ApiV2010AccountKeySchema,
})

export const delete20100401AccountsAccountSidKeysSidJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    Sid: z
      .string()
      .regex(/^SK[0-9a-fA-F]{32}$/)
      .length(34),
  }),
})

export const get20100401AccountsAccountSidKeysJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  query: z.object({
    PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
    Page: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(0),
      )
      .exactOptional(),
    PageToken: z.string().exactOptional(),
  }),
  response: z.object({
    end: z.int().exactOptional(),
    first_page_uri: z.url().exactOptional(),
    next_page_uri: z.url().nullable().exactOptional(),
    page: z.int().exactOptional(),
    page_size: z.int().exactOptional(),
    previous_page_uri: z.url().nullable().exactOptional(),
    start: z.int().exactOptional(),
    uri: z.url().exactOptional(),
    keys: z.array(ApiV2010AccountKeySchema).exactOptional(),
  }),
})

export const post20100401AccountsAccountSidKeysJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  form: z.object({
    FriendlyName: z
      .string()
      .meta({
        description:
          'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
      })
      .exactOptional(),
  }),
  response: ApiV2010AccountNewKeySchema,
})

export const get20100401AccountsAccountSidMessagesMessageSidMediaSidJsonHandler = defineHandler({
  param: z.object({
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
  response: ApiV2010AccountMessageMediaSchema,
})

export const delete20100401AccountsAccountSidMessagesMessageSidMediaSidJsonHandler = defineHandler({
  param: z.object({
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
})

export const get20100401AccountsAccountSidMessagesMessageSidMediaJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    MessageSid: z
      .string()
      .regex(/^(SM|MM)[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  query: z.object({
    DateCreated: z.iso.datetime({ offset: true }).exactOptional(),
    'DateCreated<': z.iso.datetime({ offset: true }).exactOptional(),
    'DateCreated>': z.iso.datetime({ offset: true }).exactOptional(),
    PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
    Page: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(0),
      )
      .exactOptional(),
    PageToken: z.string().exactOptional(),
  }),
  response: z.object({
    end: z.int().exactOptional(),
    first_page_uri: z.url().exactOptional(),
    next_page_uri: z.url().nullable().exactOptional(),
    page: z.int().exactOptional(),
    page_size: z.int().exactOptional(),
    previous_page_uri: z.url().nullable().exactOptional(),
    start: z.int().exactOptional(),
    uri: z.url().exactOptional(),
    media_list: z.array(ApiV2010AccountMessageMediaSchema).exactOptional(),
  }),
})

export const get20100401AccountsAccountSidQueuesQueueSidMembersCallSidJsonHandler = defineHandler({
  param: z.object({
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
  response: ApiV2010AccountQueueMemberSchema,
})

export const post20100401AccountsAccountSidQueuesQueueSidMembersCallSidJsonHandler = defineHandler({
  param: z.object({
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
  form: z.object({
    Url: z.url().meta({ description: 'The absolute URL of the Queue resource.' }),
    Method: z
      .enum(['GET', 'POST'])
      .meta({
        description:
          'How to pass the update request data. Can be `GET` or `POST` and the default is `POST`. `POST` sends the data as encoded form data and `GET` sends the data as query parameters.',
      })
      .exactOptional(),
  }),
  response: ApiV2010AccountQueueMemberSchema,
})

export const get20100401AccountsAccountSidQueuesQueueSidMembersJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    QueueSid: z
      .string()
      .regex(/^QU[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  query: z.object({
    PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
    Page: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(0),
      )
      .exactOptional(),
    PageToken: z.string().exactOptional(),
  }),
  response: z.object({
    end: z.int().exactOptional(),
    first_page_uri: z.url().exactOptional(),
    next_page_uri: z.url().nullable().exactOptional(),
    page: z.int().exactOptional(),
    page_size: z.int().exactOptional(),
    previous_page_uri: z.url().nullable().exactOptional(),
    start: z.int().exactOptional(),
    uri: z.url().exactOptional(),
    queue_members: z.array(ApiV2010AccountQueueMemberSchema).exactOptional(),
  }),
})

export const get20100401AccountsAccountSidMessagesJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  query: z.object({
    To: z.string().exactOptional(),
    From: z.string().exactOptional(),
    DateSent: z.iso.datetime({ offset: true }).exactOptional(),
    'DateSent<': z.iso.datetime({ offset: true }).exactOptional(),
    'DateSent>': z.iso.datetime({ offset: true }).exactOptional(),
    PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
    Page: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(0),
      )
      .exactOptional(),
    PageToken: z.string().exactOptional(),
  }),
  response: z.object({
    end: z.int().exactOptional(),
    first_page_uri: z.url().exactOptional(),
    next_page_uri: z.url().nullable().exactOptional(),
    page: z.int().exactOptional(),
    page_size: z.int().exactOptional(),
    previous_page_uri: z.url().nullable().exactOptional(),
    start: z.int().exactOptional(),
    uri: z.url().exactOptional(),
    messages: z.array(ApiV2010AccountMessageSchema).exactOptional(),
  }),
})

export const post20100401AccountsAccountSidMessagesJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  form: z.object({
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
        description: '[OBSOLETE] This parameter will no longer have any effect as of 2024-06-03.',
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
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int(),
      )
      .meta({
        description:
          'Total number of attempts made (including this request) to send the message regardless of the provider used',
      })
      .exactOptional(),
    ValidityPeriod: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
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
  response: ApiV2010AccountMessageSchema,
})

export const get20100401AccountsAccountSidMessagesSidJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    Sid: z
      .string()
      .regex(/^(SM|MM)[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  response: ApiV2010AccountMessageSchema,
})

export const post20100401AccountsAccountSidMessagesSidJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    Sid: z
      .string()
      .regex(/^(SM|MM)[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  form: z.object({
    Body: z
      .string()
      .meta({
        description:
          "The new `body` of the Message resource. To redact the text content of a Message, this parameter's value must be an empty string",
      })
      .exactOptional(),
    Status: MessageEnumUpdateStatusSchema.exactOptional(),
  }),
  response: ApiV2010AccountMessageSchema,
})

export const delete20100401AccountsAccountSidMessagesSidJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    Sid: z
      .string()
      .regex(/^(SM|MM)[0-9a-fA-F]{32}$/)
      .length(34),
  }),
})

export const post20100401AccountsAccountSidMessagesMessageSidFeedbackJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    MessageSid: z
      .string()
      .regex(/^(SM|MM)[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  form: z.object({ Outcome: MessageFeedbackEnumOutcomeSchema.exactOptional() }),
  response: ApiV2010AccountMessageMessageFeedbackSchema,
})

export const get20100401AccountsAccountSidSigningKeysJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  query: z.object({
    PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
    Page: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(0),
      )
      .exactOptional(),
    PageToken: z.string().exactOptional(),
  }),
  response: z.object({
    end: z.int().exactOptional(),
    first_page_uri: z.url().exactOptional(),
    next_page_uri: z.url().nullable().exactOptional(),
    page: z.int().exactOptional(),
    page_size: z.int().exactOptional(),
    previous_page_uri: z.url().nullable().exactOptional(),
    start: z.int().exactOptional(),
    uri: z.url().exactOptional(),
    signing_keys: z.array(ApiV2010AccountSigningKeySchema).exactOptional(),
  }),
})

export const post20100401AccountsAccountSidSigningKeysJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  form: z.object({
    FriendlyName: z
      .string()
      .meta({
        description:
          'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
      })
      .exactOptional(),
  }),
  response: ApiV2010AccountNewSigningKeySchema,
})

export const get20100401AccountsAccountSidNotificationsSidJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    Sid: z
      .string()
      .regex(/^NO[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  response: ApiV2010AccountNotificationInstanceSchema,
})

export const get20100401AccountsAccountSidNotificationsJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  query: z.object({
    Log: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int(),
      )
      .exactOptional(),
    MessageDate: z.iso.date().exactOptional(),
    'MessageDate<': z.iso.date().exactOptional(),
    'MessageDate>': z.iso.date().exactOptional(),
    PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
    Page: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(0),
      )
      .exactOptional(),
    PageToken: z.string().exactOptional(),
  }),
  response: z.object({
    end: z.int().exactOptional(),
    first_page_uri: z.url().exactOptional(),
    next_page_uri: z.url().nullable().exactOptional(),
    page: z.int().exactOptional(),
    page_size: z.int().exactOptional(),
    previous_page_uri: z.url().nullable().exactOptional(),
    start: z.int().exactOptional(),
    uri: z.url().exactOptional(),
    notifications: z.array(ApiV2010AccountNotificationSchema).exactOptional(),
  }),
})

export const get20100401AccountsAccountSidOutgoingCallerIdsSidJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    Sid: z
      .string()
      .regex(/^PN[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  response: ApiV2010AccountOutgoingCallerIdSchema,
})

export const post20100401AccountsAccountSidOutgoingCallerIdsSidJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    Sid: z
      .string()
      .regex(/^PN[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  form: z.object({
    FriendlyName: z
      .string()
      .meta({
        description:
          'A descriptive string that you create to describe the resource. It can be up to 64 characters long.',
      })
      .exactOptional(),
  }),
  response: ApiV2010AccountOutgoingCallerIdSchema,
})

export const delete20100401AccountsAccountSidOutgoingCallerIdsSidJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    Sid: z
      .string()
      .regex(/^PN[0-9a-fA-F]{32}$/)
      .length(34),
  }),
})

export const get20100401AccountsAccountSidOutgoingCallerIdsJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  query: z.object({
    PhoneNumber: z.string().exactOptional(),
    FriendlyName: z.string().exactOptional(),
    PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
    Page: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(0),
      )
      .exactOptional(),
    PageToken: z.string().exactOptional(),
  }),
  response: z.object({
    end: z.int().exactOptional(),
    first_page_uri: z.url().exactOptional(),
    next_page_uri: z.url().nullable().exactOptional(),
    page: z.int().exactOptional(),
    page_size: z.int().exactOptional(),
    previous_page_uri: z.url().nullable().exactOptional(),
    start: z.int().exactOptional(),
    uri: z.url().exactOptional(),
    outgoing_caller_ids: z.array(ApiV2010AccountOutgoingCallerIdSchema).exactOptional(),
  }),
})

export const post20100401AccountsAccountSidOutgoingCallerIdsJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  form: z.object({
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
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
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
  response: ApiV2010AccountValidationRequestSchema,
})

export const get20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonHandler =
  defineHandler({
    param: z.object({
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
    response: ApiV2010AccountConferenceParticipantSchema,
  })

export const post20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonHandler =
  defineHandler({
    param: z.object({
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
    form: z.object({
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
    response: ApiV2010AccountConferenceParticipantSchema,
  })

export const delete20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonHandler =
  defineHandler({
    param: z.object({
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
  })

export const get20100401AccountsAccountSidConferencesConferenceSidParticipantsJsonHandler =
  defineHandler({
    param: z.object({
      AccountSid: z
        .string()
        .regex(/^AC[0-9a-fA-F]{32}$/)
        .length(34),
      ConferenceSid: z
        .string()
        .regex(/^CF[0-9a-fA-F]{32}$/)
        .length(34),
    }),
    query: z.object({
      Muted: z.stringbool().exactOptional(),
      Hold: z.stringbool().exactOptional(),
      Coaching: z.stringbool().exactOptional(),
      PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
      Page: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int().min(0),
        )
        .exactOptional(),
      PageToken: z.string().exactOptional(),
    }),
    response: z.object({
      end: z.int().exactOptional(),
      first_page_uri: z.url().exactOptional(),
      next_page_uri: z.url().nullable().exactOptional(),
      page: z.int().exactOptional(),
      page_size: z.int().exactOptional(),
      previous_page_uri: z.url().nullable().exactOptional(),
      start: z.int().exactOptional(),
      uri: z.url().exactOptional(),
      participants: z.array(ApiV2010AccountConferenceParticipantSchema).exactOptional(),
    }),
  })

export const post20100401AccountsAccountSidConferencesConferenceSidParticipantsJsonHandler =
  defineHandler({
    param: z.object({
      AccountSid: z
        .string()
        .regex(/^AC[0-9a-fA-F]{32}$/)
        .length(34),
      ConferenceSid: z.string(),
    }),
    form: z.object({
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
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
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
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
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
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
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
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int(),
        )
        .meta({
          description:
            'The number of seconds that we should attempt to detect an answering machine before timing out and sending a voice request with `AnsweredBy` of `unknown`. The default timeout is 30 seconds.',
        })
        .exactOptional(),
      MachineDetectionSpeechThreshold: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int(),
        )
        .meta({
          description:
            'The number of milliseconds that is used as the measuring stick for the length of the speech activity, where durations lower than this value will be interpreted as a human and longer than this value as a machine. Possible Values: 1000-6000. Default: 2400.',
        })
        .exactOptional(),
      MachineDetectionSpeechEndThreshold: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int(),
        )
        .meta({
          description:
            'The number of milliseconds of silence after speech activity at which point the speech activity is considered complete. Possible Values: 500-5000. Default: 1200.',
        })
        .exactOptional(),
      MachineDetectionSilenceTimeout: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
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
    response: ApiV2010AccountConferenceParticipantSchema,
  })

export const post20100401AccountsAccountSidCallsCallSidPaymentsJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    CallSid: z
      .string()
      .regex(/^CA[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  form: z.object({
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
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
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
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
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
  response: ApiV2010AccountCallPaymentsSchema,
})

export const post20100401AccountsAccountSidCallsCallSidPaymentsSidJsonHandler = defineHandler({
  param: z.object({
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
  form: z.object({
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
  response: ApiV2010AccountCallPaymentsSchema,
})

export const get20100401AccountsAccountSidQueuesSidJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    Sid: z
      .string()
      .regex(/^QU[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  response: ApiV2010AccountQueueSchema,
})

export const post20100401AccountsAccountSidQueuesSidJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    Sid: z
      .string()
      .regex(/^QU[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  form: z.object({
    FriendlyName: z
      .string()
      .meta({
        description:
          'A descriptive string that you created to describe this resource. It can be up to 64 characters long.',
      })
      .exactOptional(),
    MaxSize: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int(),
      )
      .meta({
        description:
          'The maximum number of calls allowed to be in the queue. The default is 1000. The maximum is 5000.',
      })
      .exactOptional(),
  }),
  response: ApiV2010AccountQueueSchema,
})

export const delete20100401AccountsAccountSidQueuesSidJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    Sid: z
      .string()
      .regex(/^QU[0-9a-fA-F]{32}$/)
      .length(34),
  }),
})

export const get20100401AccountsAccountSidQueuesJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  query: z.object({
    PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
    Page: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(0),
      )
      .exactOptional(),
    PageToken: z.string().exactOptional(),
  }),
  response: z.object({
    end: z.int().exactOptional(),
    first_page_uri: z.url().exactOptional(),
    next_page_uri: z.url().nullable().exactOptional(),
    page: z.int().exactOptional(),
    page_size: z.int().exactOptional(),
    previous_page_uri: z.url().nullable().exactOptional(),
    start: z.int().exactOptional(),
    uri: z.url().exactOptional(),
    queues: z.array(ApiV2010AccountQueueSchema).exactOptional(),
  }),
})

export const post20100401AccountsAccountSidQueuesJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  form: z.object({
    FriendlyName: z
      .string()
      .meta({
        description:
          'A descriptive string that you created to describe this resource. It can be up to 64 characters long.',
      }),
    MaxSize: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int(),
      )
      .meta({
        description:
          'The maximum number of calls allowed to be in the queue. The default is 1000. The maximum is 5000.',
      })
      .exactOptional(),
  }),
  response: ApiV2010AccountQueueSchema,
})

export const post20100401AccountsAccountSidCallsCallSidTranscriptionsJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    CallSid: z
      .string()
      .regex(/^CA[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  form: z.object({
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
      .meta({ description: 'Indicates if partial results are going to be sent to the customer' })
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
  response: ApiV2010AccountCallRealtimeTranscriptionSchema,
})

export const post20100401AccountsAccountSidCallsCallSidTranscriptionsSidJsonHandler = defineHandler(
  {
    param: z.object({
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
    form: z.object({ Status: RealtimeTranscriptionEnumUpdateStatusSchema }),
    response: ApiV2010AccountCallRealtimeTranscriptionSchema,
  },
)

export const get20100401AccountsAccountSidRecordingsSidJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    Sid: z
      .string()
      .regex(/^RE[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  query: z.object({ IncludeSoftDeleted: z.stringbool().exactOptional() }),
  response: ApiV2010AccountRecordingSchema,
})

export const delete20100401AccountsAccountSidRecordingsSidJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    Sid: z
      .string()
      .regex(/^RE[0-9a-fA-F]{32}$/)
      .length(34),
  }),
})

export const get20100401AccountsAccountSidRecordingsJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  query: z.object({
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
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(0),
      )
      .exactOptional(),
    PageToken: z.string().exactOptional(),
  }),
  response: z.object({
    end: z.int().exactOptional(),
    first_page_uri: z.url().exactOptional(),
    next_page_uri: z.url().nullable().exactOptional(),
    page: z.int().exactOptional(),
    page_size: z.int().exactOptional(),
    previous_page_uri: z.url().nullable().exactOptional(),
    start: z.int().exactOptional(),
    uri: z.url().exactOptional(),
    recordings: z.array(ApiV2010AccountRecordingSchema).exactOptional(),
  }),
})

export const get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJsonHandler =
  defineHandler({
    param: z.object({
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
    response: ApiV2010AccountRecordingRecordingAddOnResultSchema,
  })

export const delete20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJsonHandler =
  defineHandler({
    param: z.object({
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
  })

export const get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsJsonHandler =
  defineHandler({
    param: z.object({
      AccountSid: z
        .string()
        .regex(/^AC[0-9a-fA-F]{32}$/)
        .length(34),
      ReferenceSid: z
        .string()
        .regex(/^RE[0-9a-fA-F]{32}$/)
        .length(34),
    }),
    query: z.object({
      PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
      Page: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int().min(0),
        )
        .exactOptional(),
      PageToken: z.string().exactOptional(),
    }),
    response: z.object({
      end: z.int().exactOptional(),
      first_page_uri: z.url().exactOptional(),
      next_page_uri: z.url().nullable().exactOptional(),
      page: z.int().exactOptional(),
      page_size: z.int().exactOptional(),
      previous_page_uri: z.url().nullable().exactOptional(),
      start: z.int().exactOptional(),
      uri: z.url().exactOptional(),
      add_on_results: z.array(ApiV2010AccountRecordingRecordingAddOnResultSchema).exactOptional(),
    }),
  })

export const get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJsonHandler =
  defineHandler({
    param: z.object({
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
    response: ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadSchema,
  })

export const delete20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJsonHandler =
  defineHandler({
    param: z.object({
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
  })

export const get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsJsonHandler =
  defineHandler({
    param: z.object({
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
    query: z.object({
      PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
      Page: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int().min(0),
        )
        .exactOptional(),
      PageToken: z.string().exactOptional(),
    }),
    response: z.object({
      end: z.int().exactOptional(),
      first_page_uri: z.url().exactOptional(),
      next_page_uri: z.url().nullable().exactOptional(),
      page: z.int().exactOptional(),
      page_size: z.int().exactOptional(),
      previous_page_uri: z.url().nullable().exactOptional(),
      start: z.int().exactOptional(),
      uri: z.url().exactOptional(),
      payloads: z
        .array(ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadSchema)
        .exactOptional(),
    }),
  })

export const get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsPayloadSidDataJsonHandler =
  defineHandler({
    param: z.object({
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
  })

export const get20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJsonHandler =
  defineHandler({
    param: z.object({
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
    response: ApiV2010AccountRecordingRecordingTranscriptionSchema,
  })

export const delete20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJsonHandler =
  defineHandler({
    param: z.object({
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
  })

export const get20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsJsonHandler =
  defineHandler({
    param: z.object({
      AccountSid: z
        .string()
        .regex(/^AC[0-9a-fA-F]{32}$/)
        .length(34),
      RecordingSid: z
        .string()
        .regex(/^RE[0-9a-fA-F]{32}$/)
        .length(34),
    }),
    query: z.object({
      PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
      Page: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int().min(0),
        )
        .exactOptional(),
      PageToken: z.string().exactOptional(),
    }),
    response: z.object({
      end: z.int().exactOptional(),
      first_page_uri: z.url().exactOptional(),
      next_page_uri: z.url().nullable().exactOptional(),
      page: z.int().exactOptional(),
      page_size: z.int().exactOptional(),
      previous_page_uri: z.url().nullable().exactOptional(),
      start: z.int().exactOptional(),
      uri: z.url().exactOptional(),
      transcriptions: z.array(ApiV2010AccountRecordingRecordingTranscriptionSchema).exactOptional(),
    }),
  })

export const get20100401AccountsAccountSidSMSShortCodesSidJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    Sid: z
      .string()
      .regex(/^SC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  response: ApiV2010AccountShortCodeSchema,
})

export const post20100401AccountsAccountSidSMSShortCodesSidJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    Sid: z
      .string()
      .regex(/^SC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  form: z.object({
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
  response: ApiV2010AccountShortCodeSchema,
})

export const get20100401AccountsAccountSidSMSShortCodesJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  query: z.object({
    FriendlyName: z.string().exactOptional(),
    ShortCode: z.string().exactOptional(),
    PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
    Page: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(0),
      )
      .exactOptional(),
    PageToken: z.string().exactOptional(),
  }),
  response: z.object({
    end: z.int().exactOptional(),
    first_page_uri: z.url().exactOptional(),
    next_page_uri: z.url().nullable().exactOptional(),
    page: z.int().exactOptional(),
    page_size: z.int().exactOptional(),
    previous_page_uri: z.url().nullable().exactOptional(),
    start: z.int().exactOptional(),
    uri: z.url().exactOptional(),
    short_codes: z.array(ApiV2010AccountShortCodeSchema).exactOptional(),
  }),
})

export const get20100401AccountsAccountSidSigningKeysSidJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    Sid: z
      .string()
      .regex(/^SK[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  response: ApiV2010AccountSigningKeySchema,
})

export const post20100401AccountsAccountSidSigningKeysSidJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    Sid: z
      .string()
      .regex(/^SK[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  form: z.object({ FriendlyName: z.string().meta({ description: '' }).exactOptional() }),
  response: ApiV2010AccountSigningKeySchema,
})

export const delete20100401AccountsAccountSidSigningKeysSidJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    Sid: z
      .string()
      .regex(/^SK[0-9a-fA-F]{32}$/)
      .length(34),
  }),
})

export const get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJsonHandler =
  defineHandler({
    param: z.object({
      AccountSid: z
        .string()
        .regex(/^AC[0-9a-fA-F]{32}$/)
        .length(34),
      DomainSid: z
        .string()
        .regex(/^SD[0-9a-fA-F]{32}$/)
        .length(34),
    }),
    query: z.object({
      PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
      Page: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int().min(0),
        )
        .exactOptional(),
      PageToken: z.string().exactOptional(),
    }),
    response: z.object({
      end: z.int().exactOptional(),
      first_page_uri: z.url().exactOptional(),
      next_page_uri: z.url().nullable().exactOptional(),
      page: z.int().exactOptional(),
      page_size: z.int().exactOptional(),
      previous_page_uri: z.url().nullable().exactOptional(),
      start: z.int().exactOptional(),
      uri: z.url().exactOptional(),
      contents: z
        .array(
          ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema,
        )
        .exactOptional(),
    }),
  })

export const post20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJsonHandler =
  defineHandler({
    param: z.object({
      AccountSid: z
        .string()
        .regex(/^AC[0-9a-fA-F]{32}$/)
        .length(34),
      DomainSid: z
        .string()
        .regex(/^SD[0-9a-fA-F]{32}$/)
        .length(34),
    }),
    form: z.object({
      CredentialListSid: z
        .string()
        .regex(/^CL[0-9a-fA-F]{32}$/)
        .length(34)
        .meta({ description: 'The SID of the CredentialList resource to map to the SIP domain.' }),
    }),
    response: ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema,
  })

export const get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJsonHandler =
  defineHandler({
    param: z.object({
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
    response: ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema,
  })

export const delete20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJsonHandler =
  defineHandler({
    param: z.object({
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
  })

export const get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJsonHandler =
  defineHandler({
    param: z.object({
      AccountSid: z
        .string()
        .regex(/^AC[0-9a-fA-F]{32}$/)
        .length(34),
      DomainSid: z
        .string()
        .regex(/^SD[0-9a-fA-F]{32}$/)
        .length(34),
    }),
    query: z.object({
      PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
      Page: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int().min(0),
        )
        .exactOptional(),
      PageToken: z.string().exactOptional(),
    }),
    response: z.object({
      end: z.int().exactOptional(),
      first_page_uri: z.url().exactOptional(),
      next_page_uri: z.url().nullable().exactOptional(),
      page: z.int().exactOptional(),
      page_size: z.int().exactOptional(),
      previous_page_uri: z.url().nullable().exactOptional(),
      start: z.int().exactOptional(),
      uri: z.url().exactOptional(),
      contents: z
        .array(
          ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema,
        )
        .exactOptional(),
    }),
  })

export const post20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJsonHandler =
  defineHandler({
    param: z.object({
      AccountSid: z
        .string()
        .regex(/^AC[0-9a-fA-F]{32}$/)
        .length(34),
      DomainSid: z
        .string()
        .regex(/^SD[0-9a-fA-F]{32}$/)
        .length(34),
    }),
    form: z.object({
      IpAccessControlListSid: z
        .string()
        .regex(/^AL[0-9a-fA-F]{32}$/)
        .length(34)
        .meta({
          description: 'The SID of the IpAccessControlList resource to map to the SIP domain.',
        }),
    }),
    response:
      ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema,
  })

export const get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJsonHandler =
  defineHandler({
    param: z.object({
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
    response:
      ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema,
  })

export const delete20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJsonHandler =
  defineHandler({
    param: z.object({
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
  })

export const get20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJsonHandler =
  defineHandler({
    param: z.object({
      AccountSid: z
        .string()
        .regex(/^AC[0-9a-fA-F]{32}$/)
        .length(34),
      DomainSid: z
        .string()
        .regex(/^SD[0-9a-fA-F]{32}$/)
        .length(34),
    }),
    query: z.object({
      PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
      Page: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int().min(0),
        )
        .exactOptional(),
      PageToken: z.string().exactOptional(),
    }),
    response: z.object({
      end: z.int().exactOptional(),
      first_page_uri: z.url().exactOptional(),
      next_page_uri: z.url().nullable().exactOptional(),
      page: z.int().exactOptional(),
      page_size: z.int().exactOptional(),
      previous_page_uri: z.url().nullable().exactOptional(),
      start: z.int().exactOptional(),
      uri: z.url().exactOptional(),
      contents: z
        .array(
          ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema,
        )
        .exactOptional(),
    }),
  })

export const post20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJsonHandler =
  defineHandler({
    param: z.object({
      AccountSid: z
        .string()
        .regex(/^AC[0-9a-fA-F]{32}$/)
        .length(34),
      DomainSid: z
        .string()
        .regex(/^SD[0-9a-fA-F]{32}$/)
        .length(34),
    }),
    form: z.object({
      CredentialListSid: z
        .string()
        .regex(/^CL[0-9a-fA-F]{32}$/)
        .length(34)
        .meta({ description: 'The SID of the CredentialList resource to map to the SIP domain.' }),
    }),
    response:
      ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema,
  })

export const get20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJsonHandler =
  defineHandler({
    param: z.object({
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
    response:
      ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema,
  })

export const delete20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJsonHandler =
  defineHandler({
    param: z.object({
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
  })

export const get20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJsonHandler =
  defineHandler({
    param: z.object({
      AccountSid: z
        .string()
        .regex(/^AC[0-9a-fA-F]{32}$/)
        .length(34),
      CredentialListSid: z
        .string()
        .regex(/^CL[0-9a-fA-F]{32}$/)
        .length(34),
    }),
    query: z.object({
      PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
      Page: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int().min(0),
        )
        .exactOptional(),
      PageToken: z.string().exactOptional(),
    }),
    response: z.object({
      end: z.int().exactOptional(),
      first_page_uri: z.url().exactOptional(),
      next_page_uri: z.url().nullable().exactOptional(),
      page: z.int().exactOptional(),
      page_size: z.int().exactOptional(),
      previous_page_uri: z.url().nullable().exactOptional(),
      start: z.int().exactOptional(),
      uri: z.url().exactOptional(),
      credentials: z.array(ApiV2010AccountSipSipCredentialListSipCredentialSchema).exactOptional(),
    }),
  })

export const post20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJsonHandler =
  defineHandler({
    param: z.object({
      AccountSid: z
        .string()
        .regex(/^AC[0-9a-fA-F]{32}$/)
        .length(34),
      CredentialListSid: z
        .string()
        .regex(/^CL[0-9a-fA-F]{32}$/)
        .length(34),
    }),
    form: z.object({
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
    response: ApiV2010AccountSipSipCredentialListSipCredentialSchema,
  })

export const get20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonHandler =
  defineHandler({
    param: z.object({
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
    response: ApiV2010AccountSipSipCredentialListSipCredentialSchema,
  })

export const post20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonHandler =
  defineHandler({
    param: z.object({
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
    form: z.object({
      Password: z
        .string()
        .meta({
          description:
            'The password that the username will use when authenticating SIP requests. The password must be a minimum of 12 characters, contain at least 1 digit, and have mixed case. (eg `IWasAtSignal2018`)',
        })
        .exactOptional(),
    }),
    response: ApiV2010AccountSipSipCredentialListSipCredentialSchema,
  })

export const delete20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonHandler =
  defineHandler({
    param: z.object({
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
  })

export const get20100401AccountsAccountSidSIPCredentialListsJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  query: z.object({
    PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
    Page: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(0),
      )
      .exactOptional(),
    PageToken: z.string().exactOptional(),
  }),
  response: z.object({
    end: z.int().exactOptional(),
    first_page_uri: z.url().exactOptional(),
    next_page_uri: z.url().nullable().exactOptional(),
    page: z.int().exactOptional(),
    page_size: z.int().exactOptional(),
    previous_page_uri: z.url().nullable().exactOptional(),
    start: z.int().exactOptional(),
    uri: z.url().exactOptional(),
    credential_lists: z.array(ApiV2010AccountSipSipCredentialListSchema).exactOptional(),
  }),
})

export const post20100401AccountsAccountSidSIPCredentialListsJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  form: z.object({
    FriendlyName: z
      .string()
      .meta({
        description:
          'A human readable descriptive text that describes the CredentialList, up to 64 characters long.',
      }),
  }),
  response: ApiV2010AccountSipSipCredentialListSchema,
})

export const get20100401AccountsAccountSidSIPCredentialListsSidJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    Sid: z
      .string()
      .regex(/^CL[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  response: ApiV2010AccountSipSipCredentialListSchema,
})

export const post20100401AccountsAccountSidSIPCredentialListsSidJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    Sid: z
      .string()
      .regex(/^CL[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  form: z.object({
    FriendlyName: z
      .string()
      .meta({
        description:
          'A human readable descriptive text for a CredentialList, up to 64 characters long.',
      }),
  }),
  response: ApiV2010AccountSipSipCredentialListSchema,
})

export const delete20100401AccountsAccountSidSIPCredentialListsSidJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    Sid: z
      .string()
      .regex(/^CL[0-9a-fA-F]{32}$/)
      .length(34),
  }),
})

export const get20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJsonHandler =
  defineHandler({
    param: z.object({
      AccountSid: z
        .string()
        .regex(/^AC[0-9a-fA-F]{32}$/)
        .length(34),
      DomainSid: z
        .string()
        .regex(/^SD[0-9a-fA-F]{32}$/)
        .length(34),
    }),
    query: z.object({
      PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
      Page: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int().min(0),
        )
        .exactOptional(),
      PageToken: z.string().exactOptional(),
    }),
    response: z.object({
      end: z.int().exactOptional(),
      first_page_uri: z.url().exactOptional(),
      next_page_uri: z.url().nullable().exactOptional(),
      page: z.int().exactOptional(),
      page_size: z.int().exactOptional(),
      previous_page_uri: z.url().nullable().exactOptional(),
      start: z.int().exactOptional(),
      uri: z.url().exactOptional(),
      credential_list_mappings: z
        .array(ApiV2010AccountSipSipDomainSipCredentialListMappingSchema)
        .exactOptional(),
    }),
  })

export const post20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJsonHandler =
  defineHandler({
    param: z.object({
      AccountSid: z
        .string()
        .regex(/^AC[0-9a-fA-F]{32}$/)
        .length(34),
      DomainSid: z
        .string()
        .regex(/^SD[0-9a-fA-F]{32}$/)
        .length(34),
    }),
    form: z.object({
      CredentialListSid: z
        .string()
        .regex(/^CL[0-9a-fA-F]{32}$/)
        .length(34)
        .meta({
          description:
            'A 34 character string that uniquely identifies the CredentialList resource to map to the SIP domain.',
        }),
    }),
    response: ApiV2010AccountSipSipDomainSipCredentialListMappingSchema,
  })

export const get20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJsonHandler =
  defineHandler({
    param: z.object({
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
    response: ApiV2010AccountSipSipDomainSipCredentialListMappingSchema,
  })

export const delete20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJsonHandler =
  defineHandler({
    param: z.object({
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
  })

export const get20100401AccountsAccountSidSIPDomainsJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  query: z.object({
    PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
    Page: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(0),
      )
      .exactOptional(),
    PageToken: z.string().exactOptional(),
  }),
  response: z.object({
    end: z.int().exactOptional(),
    first_page_uri: z.url().exactOptional(),
    next_page_uri: z.url().nullable().exactOptional(),
    page: z.int().exactOptional(),
    page_size: z.int().exactOptional(),
    previous_page_uri: z.url().nullable().exactOptional(),
    start: z.int().exactOptional(),
    uri: z.url().exactOptional(),
    domains: z.array(ApiV2010AccountSipSipDomainSchema).exactOptional(),
  }),
})

export const post20100401AccountsAccountSidSIPDomainsJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  form: z.object({
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
        description: 'The HTTP method we should use to call `voice_url`. Can be: `GET` or `POST`.',
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
  response: ApiV2010AccountSipSipDomainSchema,
})

export const get20100401AccountsAccountSidSIPDomainsSidJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    Sid: z
      .string()
      .regex(/^SD[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  response: ApiV2010AccountSipSipDomainSchema,
})

export const post20100401AccountsAccountSidSIPDomainsSidJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    Sid: z
      .string()
      .regex(/^SD[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  form: z.object({
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
  response: ApiV2010AccountSipSipDomainSchema,
})

export const delete20100401AccountsAccountSidSIPDomainsSidJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    Sid: z
      .string()
      .regex(/^SD[0-9a-fA-F]{32}$/)
      .length(34),
  }),
})

export const get20100401AccountsAccountSidSIPIpAccessControlListsJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  query: z.object({
    PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
    Page: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(0),
      )
      .exactOptional(),
    PageToken: z.string().exactOptional(),
  }),
  response: z.object({
    end: z.int().exactOptional(),
    first_page_uri: z.url().exactOptional(),
    next_page_uri: z.url().nullable().exactOptional(),
    page: z.int().exactOptional(),
    page_size: z.int().exactOptional(),
    previous_page_uri: z.url().nullable().exactOptional(),
    start: z.int().exactOptional(),
    uri: z.url().exactOptional(),
    ip_access_control_lists: z
      .array(ApiV2010AccountSipSipIpAccessControlListSchema)
      .exactOptional(),
  }),
})

export const post20100401AccountsAccountSidSIPIpAccessControlListsJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  form: z.object({
    FriendlyName: z
      .string()
      .meta({
        description:
          'A human readable descriptive text that describes the IpAccessControlList, up to 255 characters long.',
      }),
  }),
  response: ApiV2010AccountSipSipIpAccessControlListSchema,
})

export const get20100401AccountsAccountSidSIPIpAccessControlListsSidJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    Sid: z
      .string()
      .regex(/^AL[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  response: ApiV2010AccountSipSipIpAccessControlListSchema,
})

export const post20100401AccountsAccountSidSIPIpAccessControlListsSidJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    Sid: z
      .string()
      .regex(/^AL[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  form: z.object({
    FriendlyName: z
      .string()
      .meta({ description: 'A human readable descriptive text, up to 255 characters long.' }),
  }),
  response: ApiV2010AccountSipSipIpAccessControlListSchema,
})

export const delete20100401AccountsAccountSidSIPIpAccessControlListsSidJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    Sid: z
      .string()
      .regex(/^AL[0-9a-fA-F]{32}$/)
      .length(34),
  }),
})

export const get20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJsonHandler =
  defineHandler({
    param: z.object({
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
    response: ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema,
  })

export const delete20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJsonHandler =
  defineHandler({
    param: z.object({
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
  })

export const get20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJsonHandler =
  defineHandler({
    param: z.object({
      AccountSid: z
        .string()
        .regex(/^AC[0-9a-fA-F]{32}$/)
        .length(34),
      DomainSid: z
        .string()
        .regex(/^SD[0-9a-fA-F]{32}$/)
        .length(34),
    }),
    query: z.object({
      PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
      Page: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int().min(0),
        )
        .exactOptional(),
      PageToken: z.string().exactOptional(),
    }),
    response: z.object({
      end: z.int().exactOptional(),
      first_page_uri: z.url().exactOptional(),
      next_page_uri: z.url().nullable().exactOptional(),
      page: z.int().exactOptional(),
      page_size: z.int().exactOptional(),
      previous_page_uri: z.url().nullable().exactOptional(),
      start: z.int().exactOptional(),
      uri: z.url().exactOptional(),
      ip_access_control_list_mappings: z
        .array(ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema)
        .exactOptional(),
    }),
  })

export const post20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJsonHandler =
  defineHandler({
    param: z.object({
      AccountSid: z
        .string()
        .regex(/^AC[0-9a-fA-F]{32}$/)
        .length(34),
      DomainSid: z
        .string()
        .regex(/^SD[0-9a-fA-F]{32}$/)
        .length(34),
    }),
    form: z.object({
      IpAccessControlListSid: z
        .string()
        .regex(/^AL[0-9a-fA-F]{32}$/)
        .length(34)
        .meta({
          description: 'The unique id of the IP access control list to map to the SIP domain.',
        }),
    }),
    response: ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema,
  })

export const get20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJsonHandler =
  defineHandler({
    param: z.object({
      AccountSid: z
        .string()
        .regex(/^AC[0-9a-fA-F]{32}$/)
        .length(34),
      IpAccessControlListSid: z
        .string()
        .regex(/^AL[0-9a-fA-F]{32}$/)
        .length(34),
    }),
    query: z.object({
      PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
      Page: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int().min(0),
        )
        .exactOptional(),
      PageToken: z.string().exactOptional(),
    }),
    response: z.object({
      end: z.int().exactOptional(),
      first_page_uri: z.url().exactOptional(),
      next_page_uri: z.url().nullable().exactOptional(),
      page: z.int().exactOptional(),
      page_size: z.int().exactOptional(),
      previous_page_uri: z.url().nullable().exactOptional(),
      start: z.int().exactOptional(),
      uri: z.url().exactOptional(),
      ip_addresses: z
        .array(ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema)
        .exactOptional(),
    }),
  })

export const post20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJsonHandler =
  defineHandler({
    param: z.object({
      AccountSid: z
        .string()
        .regex(/^AC[0-9a-fA-F]{32}$/)
        .length(34),
      IpAccessControlListSid: z
        .string()
        .regex(/^AL[0-9a-fA-F]{32}$/)
        .length(34),
    }),
    form: z.object({
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
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int(),
        )
        .meta({
          description:
            'An integer representing the length of the CIDR prefix to use with this IP address when accepting traffic. By default the entire IP address is used.',
        })
        .exactOptional(),
    }),
    response: ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema,
  })

export const get20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonHandler =
  defineHandler({
    param: z.object({
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
    response: ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema,
  })

export const post20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonHandler =
  defineHandler({
    param: z.object({
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
    form: z.object({
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
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int(),
        )
        .meta({
          description:
            'An integer representing the length of the CIDR prefix to use with this IP address when accepting traffic. By default the entire IP address is used.',
        })
        .exactOptional(),
    }),
    response: ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema,
  })

export const delete20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonHandler =
  defineHandler({
    param: z.object({
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
  })

export const post20100401AccountsAccountSidCallsCallSidSiprecJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    CallSid: z
      .string()
      .regex(/^CA[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  form: z.object({
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
  response: ApiV2010AccountCallSiprecSchema,
})

export const post20100401AccountsAccountSidCallsCallSidSiprecSidJsonHandler = defineHandler({
  param: z.object({
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
  form: z.object({ Status: SiprecEnumUpdateStatusSchema }),
  response: ApiV2010AccountCallSiprecSchema,
})

export const post20100401AccountsAccountSidCallsCallSidStreamsJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    CallSid: z
      .string()
      .regex(/^CA[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  form: z.object({
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
      .meta({ description: 'Absolute URL to which Twilio sends status callback HTTP requests.' })
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
  response: ApiV2010AccountCallStreamSchema,
})

export const post20100401AccountsAccountSidCallsCallSidStreamsSidJsonHandler = defineHandler({
  param: z.object({
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
  form: z.object({ Status: StreamEnumUpdateStatusSchema }),
  response: ApiV2010AccountCallStreamSchema,
})

export const post20100401AccountsAccountSidTokensJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  form: z.object({
    Ttl: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int(),
      )
      .meta({
        description:
          'The duration in seconds for which the generated credentials are valid. The default value is 86400 (24 hours).',
      })
      .exactOptional(),
  }),
  response: ApiV2010AccountTokenSchema,
})

export const get20100401AccountsAccountSidTranscriptionsSidJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    Sid: z
      .string()
      .regex(/^TR[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  response: ApiV2010AccountTranscriptionSchema,
})

export const delete20100401AccountsAccountSidTranscriptionsSidJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    Sid: z
      .string()
      .regex(/^TR[0-9a-fA-F]{32}$/)
      .length(34),
  }),
})

export const get20100401AccountsAccountSidTranscriptionsJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  query: z.object({
    PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
    Page: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(0),
      )
      .exactOptional(),
    PageToken: z.string().exactOptional(),
  }),
  response: z.object({
    end: z.int().exactOptional(),
    first_page_uri: z.url().exactOptional(),
    next_page_uri: z.url().nullable().exactOptional(),
    page: z.int().exactOptional(),
    page_size: z.int().exactOptional(),
    previous_page_uri: z.url().nullable().exactOptional(),
    start: z.int().exactOptional(),
    uri: z.url().exactOptional(),
    transcriptions: z.array(ApiV2010AccountTranscriptionSchema).exactOptional(),
  }),
})

export const get20100401AccountsAccountSidUsageRecordsJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  query: z.object({
    Category: z.string().exactOptional(),
    StartDate: z.iso.date().exactOptional(),
    EndDate: z.iso.date().exactOptional(),
    IncludeSubaccounts: z.stringbool().exactOptional(),
    PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
    Page: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(0),
      )
      .exactOptional(),
    PageToken: z.string().exactOptional(),
  }),
  response: z.object({
    end: z.int().exactOptional(),
    first_page_uri: z.url().exactOptional(),
    next_page_uri: z.url().nullable().exactOptional(),
    page: z.int().exactOptional(),
    page_size: z.int().exactOptional(),
    previous_page_uri: z.url().nullable().exactOptional(),
    start: z.int().exactOptional(),
    uri: z.url().exactOptional(),
    usage_records: z.array(ApiV2010AccountUsageUsageRecordSchema).exactOptional(),
  }),
})

export const get20100401AccountsAccountSidUsageRecordsAllTimeJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  query: z.object({
    Category: z.string().exactOptional(),
    StartDate: z.iso.date().exactOptional(),
    EndDate: z.iso.date().exactOptional(),
    IncludeSubaccounts: z.stringbool().exactOptional(),
    PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
    Page: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(0),
      )
      .exactOptional(),
    PageToken: z.string().exactOptional(),
  }),
  response: z.object({
    end: z.int().exactOptional(),
    first_page_uri: z.url().exactOptional(),
    next_page_uri: z.url().nullable().exactOptional(),
    page: z.int().exactOptional(),
    page_size: z.int().exactOptional(),
    previous_page_uri: z.url().nullable().exactOptional(),
    start: z.int().exactOptional(),
    uri: z.url().exactOptional(),
    usage_records: z.array(ApiV2010AccountUsageUsageRecordUsageRecordAllTimeSchema).exactOptional(),
  }),
})

export const get20100401AccountsAccountSidUsageRecordsDailyJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  query: z.object({
    Category: z.string().exactOptional(),
    StartDate: z.iso.date().exactOptional(),
    EndDate: z.iso.date().exactOptional(),
    IncludeSubaccounts: z.stringbool().exactOptional(),
    PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
    Page: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(0),
      )
      .exactOptional(),
    PageToken: z.string().exactOptional(),
  }),
  response: z.object({
    end: z.int().exactOptional(),
    first_page_uri: z.url().exactOptional(),
    next_page_uri: z.url().nullable().exactOptional(),
    page: z.int().exactOptional(),
    page_size: z.int().exactOptional(),
    previous_page_uri: z.url().nullable().exactOptional(),
    start: z.int().exactOptional(),
    uri: z.url().exactOptional(),
    usage_records: z.array(ApiV2010AccountUsageUsageRecordUsageRecordDailySchema).exactOptional(),
  }),
})

export const get20100401AccountsAccountSidUsageRecordsLastMonthJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  query: z.object({
    Category: z.string().exactOptional(),
    StartDate: z.iso.date().exactOptional(),
    EndDate: z.iso.date().exactOptional(),
    IncludeSubaccounts: z.stringbool().exactOptional(),
    PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
    Page: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(0),
      )
      .exactOptional(),
    PageToken: z.string().exactOptional(),
  }),
  response: z.object({
    end: z.int().exactOptional(),
    first_page_uri: z.url().exactOptional(),
    next_page_uri: z.url().nullable().exactOptional(),
    page: z.int().exactOptional(),
    page_size: z.int().exactOptional(),
    previous_page_uri: z.url().nullable().exactOptional(),
    start: z.int().exactOptional(),
    uri: z.url().exactOptional(),
    usage_records: z
      .array(ApiV2010AccountUsageUsageRecordUsageRecordLastMonthSchema)
      .exactOptional(),
  }),
})

export const get20100401AccountsAccountSidUsageRecordsMonthlyJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  query: z.object({
    Category: z.string().exactOptional(),
    StartDate: z.iso.date().exactOptional(),
    EndDate: z.iso.date().exactOptional(),
    IncludeSubaccounts: z.stringbool().exactOptional(),
    PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
    Page: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(0),
      )
      .exactOptional(),
    PageToken: z.string().exactOptional(),
  }),
  response: z.object({
    end: z.int().exactOptional(),
    first_page_uri: z.url().exactOptional(),
    next_page_uri: z.url().nullable().exactOptional(),
    page: z.int().exactOptional(),
    page_size: z.int().exactOptional(),
    previous_page_uri: z.url().nullable().exactOptional(),
    start: z.int().exactOptional(),
    uri: z.url().exactOptional(),
    usage_records: z.array(ApiV2010AccountUsageUsageRecordUsageRecordMonthlySchema).exactOptional(),
  }),
})

export const get20100401AccountsAccountSidUsageRecordsThisMonthJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  query: z.object({
    Category: z.string().exactOptional(),
    StartDate: z.iso.date().exactOptional(),
    EndDate: z.iso.date().exactOptional(),
    IncludeSubaccounts: z.stringbool().exactOptional(),
    PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
    Page: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(0),
      )
      .exactOptional(),
    PageToken: z.string().exactOptional(),
  }),
  response: z.object({
    end: z.int().exactOptional(),
    first_page_uri: z.url().exactOptional(),
    next_page_uri: z.url().nullable().exactOptional(),
    page: z.int().exactOptional(),
    page_size: z.int().exactOptional(),
    previous_page_uri: z.url().nullable().exactOptional(),
    start: z.int().exactOptional(),
    uri: z.url().exactOptional(),
    usage_records: z
      .array(ApiV2010AccountUsageUsageRecordUsageRecordThisMonthSchema)
      .exactOptional(),
  }),
})

export const get20100401AccountsAccountSidUsageRecordsTodayJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  query: z.object({
    Category: z.string().exactOptional(),
    StartDate: z.iso.date().exactOptional(),
    EndDate: z.iso.date().exactOptional(),
    IncludeSubaccounts: z.stringbool().exactOptional(),
    PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
    Page: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(0),
      )
      .exactOptional(),
    PageToken: z.string().exactOptional(),
  }),
  response: z.object({
    end: z.int().exactOptional(),
    first_page_uri: z.url().exactOptional(),
    next_page_uri: z.url().nullable().exactOptional(),
    page: z.int().exactOptional(),
    page_size: z.int().exactOptional(),
    previous_page_uri: z.url().nullable().exactOptional(),
    start: z.int().exactOptional(),
    uri: z.url().exactOptional(),
    usage_records: z.array(ApiV2010AccountUsageUsageRecordUsageRecordTodaySchema).exactOptional(),
  }),
})

export const get20100401AccountsAccountSidUsageRecordsYearlyJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  query: z.object({
    Category: z.string().exactOptional(),
    StartDate: z.iso.date().exactOptional(),
    EndDate: z.iso.date().exactOptional(),
    IncludeSubaccounts: z.stringbool().exactOptional(),
    PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
    Page: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(0),
      )
      .exactOptional(),
    PageToken: z.string().exactOptional(),
  }),
  response: z.object({
    end: z.int().exactOptional(),
    first_page_uri: z.url().exactOptional(),
    next_page_uri: z.url().nullable().exactOptional(),
    page: z.int().exactOptional(),
    page_size: z.int().exactOptional(),
    previous_page_uri: z.url().nullable().exactOptional(),
    start: z.int().exactOptional(),
    uri: z.url().exactOptional(),
    usage_records: z.array(ApiV2010AccountUsageUsageRecordUsageRecordYearlySchema).exactOptional(),
  }),
})

export const get20100401AccountsAccountSidUsageRecordsYesterdayJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  query: z.object({
    Category: z.string().exactOptional(),
    StartDate: z.iso.date().exactOptional(),
    EndDate: z.iso.date().exactOptional(),
    IncludeSubaccounts: z.stringbool().exactOptional(),
    PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
    Page: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(0),
      )
      .exactOptional(),
    PageToken: z.string().exactOptional(),
  }),
  response: z.object({
    end: z.int().exactOptional(),
    first_page_uri: z.url().exactOptional(),
    next_page_uri: z.url().nullable().exactOptional(),
    page: z.int().exactOptional(),
    page_size: z.int().exactOptional(),
    previous_page_uri: z.url().nullable().exactOptional(),
    start: z.int().exactOptional(),
    uri: z.url().exactOptional(),
    usage_records: z
      .array(ApiV2010AccountUsageUsageRecordUsageRecordYesterdaySchema)
      .exactOptional(),
  }),
})

export const get20100401AccountsAccountSidUsageTriggersSidJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    Sid: z
      .string()
      .regex(/^UT[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  response: ApiV2010AccountUsageUsageTriggerSchema,
})

export const post20100401AccountsAccountSidUsageTriggersSidJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    Sid: z
      .string()
      .regex(/^UT[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  form: z.object({
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
  response: ApiV2010AccountUsageUsageTriggerSchema,
})

export const delete20100401AccountsAccountSidUsageTriggersSidJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
    Sid: z
      .string()
      .regex(/^UT[0-9a-fA-F]{32}$/)
      .length(34),
  }),
})

export const get20100401AccountsAccountSidUsageTriggersJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  query: z.object({
    Recurring: UsageTriggerEnumRecurringSchema.exactOptional(),
    TriggerBy: UsageTriggerEnumTriggerFieldSchema.exactOptional(),
    UsageCategory: z.string().exactOptional(),
    PageSize: z.coerce.bigint().pipe(z.int64().min(1n).max(1000n)).exactOptional(),
    Page: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.number().int().min(0),
      )
      .exactOptional(),
    PageToken: z.string().exactOptional(),
  }),
  response: z.object({
    end: z.int().exactOptional(),
    first_page_uri: z.url().exactOptional(),
    next_page_uri: z.url().nullable().exactOptional(),
    page: z.int().exactOptional(),
    page_size: z.int().exactOptional(),
    previous_page_uri: z.url().nullable().exactOptional(),
    start: z.int().exactOptional(),
    uri: z.url().exactOptional(),
    usage_triggers: z.array(ApiV2010AccountUsageUsageTriggerSchema).exactOptional(),
  }),
})

export const post20100401AccountsAccountSidUsageTriggersJsonHandler = defineHandler({
  param: z.object({
    AccountSid: z
      .string()
      .regex(/^AC[0-9a-fA-F]{32}$/)
      .length(34),
  }),
  form: z.object({
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
  response: ApiV2010AccountUsageUsageTriggerSchema,
})

export const post20100401AccountsAccountSidCallsCallSidUserDefinedMessagesJsonHandler =
  defineHandler({
    param: z.object({
      AccountSid: z
        .string()
        .regex(/^AC[0-9a-fA-F]{32}$/)
        .length(34),
      CallSid: z
        .string()
        .regex(/^CA[0-9a-fA-F]{32}$/)
        .length(34),
    }),
    form: z.object({
      Content: z
        .string()
        .meta({ description: 'The User Defined Message in the form of URL-encoded JSON string.' }),
      IdempotencyKey: z
        .string()
        .meta({
          description:
            'A unique string value to identify API call. This should be a unique string value per API call and can be a randomly generated.',
        })
        .exactOptional(),
    }),
    response: ApiV2010AccountCallUserDefinedMessageSchema,
  })

export const post20100401AccountsAccountSidCallsCallSidUserDefinedMessageSubscriptionsJsonHandler =
  defineHandler({
    param: z.object({
      AccountSid: z
        .string()
        .regex(/^AC[0-9a-fA-F]{32}$/)
        .length(34),
      CallSid: z
        .string()
        .regex(/^CA[0-9a-fA-F]{32}$/)
        .length(34),
    }),
    form: z.object({
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
    response: ApiV2010AccountCallUserDefinedMessageSubscriptionSchema,
  })

export const delete20100401AccountsAccountSidCallsCallSidUserDefinedMessageSubscriptionsSidJsonHandler =
  defineHandler({
    param: z.object({
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
  })
