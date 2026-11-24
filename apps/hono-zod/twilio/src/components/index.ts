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
