import { initTRPC, TRPCError } from '@trpc/server'
import { type } from 'arktype'
import {
  AccountEnumStatusSchema,
  ApiV2010AccountAddressDependentPhoneNumberSchema,
  ApiV2010AccountAddressSchema,
  ApiV2010AccountApplicationSchema,
  ApiV2010AccountAuthorizedConnectAppSchema,
  ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberLocalSchema,
  ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMachineToMachineSchema,
  ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMobileSchema,
  ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberNationalSchema,
  ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberSharedCostSchema,
  ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberTollFreeSchema,
  ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberVoipSchema,
  ApiV2010AccountAvailablePhoneNumberCountrySchema,
  ApiV2010AccountBalanceSchema,
  ApiV2010AccountCallCallEventSchema,
  ApiV2010AccountCallCallNotificationInstanceSchema,
  ApiV2010AccountCallCallNotificationSchema,
  ApiV2010AccountCallCallRecordingSchema,
  ApiV2010AccountCallPaymentsSchema,
  ApiV2010AccountCallRealtimeTranscriptionSchema,
  ApiV2010AccountCallSchema,
  ApiV2010AccountCallSiprecSchema,
  ApiV2010AccountCallStreamSchema,
  ApiV2010AccountCallUserDefinedMessageSchema,
  ApiV2010AccountCallUserDefinedMessageSubscriptionSchema,
  ApiV2010AccountConferenceConferenceRecordingSchema,
  ApiV2010AccountConferenceParticipantSchema,
  ApiV2010AccountConferenceSchema,
  ApiV2010AccountConnectAppSchema,
  ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtensionSchema,
  ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema,
  ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocalSchema,
  ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobileSchema,
  ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFreeSchema,
  ApiV2010AccountIncomingPhoneNumberSchema,
  ApiV2010AccountKeySchema,
  ApiV2010AccountMessageMediaSchema,
  ApiV2010AccountMessageMessageFeedbackSchema,
  ApiV2010AccountMessageSchema,
  ApiV2010AccountNewKeySchema,
  ApiV2010AccountNewSigningKeySchema,
  ApiV2010AccountNotificationInstanceSchema,
  ApiV2010AccountNotificationSchema,
  ApiV2010AccountOutgoingCallerIdSchema,
  ApiV2010AccountQueueMemberSchema,
  ApiV2010AccountQueueSchema,
  ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadSchema,
  ApiV2010AccountRecordingRecordingAddOnResultSchema,
  ApiV2010AccountRecordingRecordingTranscriptionSchema,
  ApiV2010AccountRecordingSchema,
  ApiV2010AccountSchema,
  ApiV2010AccountShortCodeSchema,
  ApiV2010AccountSigningKeySchema,
  ApiV2010AccountSipSipCredentialListSchema,
  ApiV2010AccountSipSipCredentialListSipCredentialSchema,
  ApiV2010AccountSipSipDomainSchema,
  ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema,
  ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema,
  ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema,
  ApiV2010AccountSipSipDomainSipCredentialListMappingSchema,
  ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema,
  ApiV2010AccountSipSipIpAccessControlListSchema,
  ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema,
  ApiV2010AccountTokenSchema,
  ApiV2010AccountTranscriptionSchema,
  ApiV2010AccountUsageUsageRecordSchema,
  ApiV2010AccountUsageUsageRecordUsageRecordAllTimeSchema,
  ApiV2010AccountUsageUsageRecordUsageRecordDailySchema,
  ApiV2010AccountUsageUsageRecordUsageRecordLastMonthSchema,
  ApiV2010AccountUsageUsageRecordUsageRecordMonthlySchema,
  ApiV2010AccountUsageUsageRecordUsageRecordThisMonthSchema,
  ApiV2010AccountUsageUsageRecordUsageRecordTodaySchema,
  ApiV2010AccountUsageUsageRecordUsageRecordYearlySchema,
  ApiV2010AccountUsageUsageRecordUsageRecordYesterdaySchema,
  ApiV2010AccountUsageUsageTriggerSchema,
  ApiV2010AccountValidationRequestSchema,
  CallEnumStatusSchema,
  ConferenceEnumStatusSchema,
  UsageTriggerEnumRecurringSchema,
  UsageTriggerEnumTriggerFieldSchema,
} from '../components'

const t = initTRPC.create()

export const _20100401Router = t.router({
  get20100401AccountsJson: t.procedure
    .input(
      type({
        'FriendlyName?': 'string',
        'Status?': AccountEnumStatusSchema,
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'accounts?': type(ApiV2010AccountSchema).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsJson: t.procedure.output(ApiV2010AccountSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  get20100401AccountsSidJson: t.procedure
    .input(
      type({
        Sid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsSidJson: t.procedure
    .input(
      type({
        Sid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAddressesJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'CustomerName?': 'string',
        'FriendlyName?': 'string',
        'EmergencyEnabled?': 'boolean',
        'IsoCountry?': 'string',
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'addresses?': type(ApiV2010AccountAddressSchema).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidAddressesJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountAddressSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAddressesSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^AD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountAddressSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidAddressesSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^AD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountAddressSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidAddressesSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^AD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidApplicationsJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'FriendlyName?': 'string',
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'applications?': type(ApiV2010AccountApplicationSchema).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidApplicationsJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountApplicationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidApplicationsSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^AP[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountApplicationSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidApplicationsSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^AP[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountApplicationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidApplicationsSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^AP[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAuthorizedConnectAppsConnectAppSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ConnectAppSid: type('string')
          .and(/^CN[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountAuthorizedConnectAppSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAuthorizedConnectAppsJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'authorized_connect_apps?': type(ApiV2010AccountAuthorizedConnectAppSchema).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAvailablePhoneNumbersJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'countries?': type(ApiV2010AccountAvailablePhoneNumberCountrySchema).array(),
        'uri?': 'string.url | null',
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CountryCode: 'string',
      }),
    )
    .output(ApiV2010AccountAvailablePhoneNumberCountrySchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeLocalJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CountryCode: 'string',
        'AreaCode?': 'number.integer',
        'Contains?': 'string',
        'SmsEnabled?': 'boolean',
        'MmsEnabled?': 'boolean',
        'VoiceEnabled?': 'boolean',
        'ExcludeAllAddressRequired?': 'boolean',
        'ExcludeLocalAddressRequired?': 'boolean',
        'ExcludeForeignAddressRequired?': 'boolean',
        'Beta?': 'boolean',
        'NearNumber?': 'string',
        'NearLatLong?': 'string',
        'Distance?': 'number.integer',
        'InPostalCode?': 'string',
        'InRegion?': 'string',
        'InRateCenter?': 'string',
        'InLata?': 'string',
        'InLocality?': 'string',
        'FaxEnabled?': 'boolean',
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'available_phone_numbers?': type(
          ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberLocalSchema,
        ).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMachineToMachineJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CountryCode: 'string',
        'AreaCode?': 'number.integer',
        'Contains?': 'string',
        'SmsEnabled?': 'boolean',
        'MmsEnabled?': 'boolean',
        'VoiceEnabled?': 'boolean',
        'ExcludeAllAddressRequired?': 'boolean',
        'ExcludeLocalAddressRequired?': 'boolean',
        'ExcludeForeignAddressRequired?': 'boolean',
        'Beta?': 'boolean',
        'NearNumber?': 'string',
        'NearLatLong?': 'string',
        'Distance?': 'number.integer',
        'InPostalCode?': 'string',
        'InRegion?': 'string',
        'InRateCenter?': 'string',
        'InLata?': 'string',
        'InLocality?': 'string',
        'FaxEnabled?': 'boolean',
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'available_phone_numbers?': type(
          ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMachineToMachineSchema,
        ).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMobileJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CountryCode: 'string',
        'AreaCode?': 'number.integer',
        'Contains?': 'string',
        'SmsEnabled?': 'boolean',
        'MmsEnabled?': 'boolean',
        'VoiceEnabled?': 'boolean',
        'ExcludeAllAddressRequired?': 'boolean',
        'ExcludeLocalAddressRequired?': 'boolean',
        'ExcludeForeignAddressRequired?': 'boolean',
        'Beta?': 'boolean',
        'NearNumber?': 'string',
        'NearLatLong?': 'string',
        'Distance?': 'number.integer',
        'InPostalCode?': 'string',
        'InRegion?': 'string',
        'InRateCenter?': 'string',
        'InLata?': 'string',
        'InLocality?': 'string',
        'FaxEnabled?': 'boolean',
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'available_phone_numbers?': type(
          ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMobileSchema,
        ).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeNationalJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CountryCode: 'string',
        'AreaCode?': 'number.integer',
        'Contains?': 'string',
        'SmsEnabled?': 'boolean',
        'MmsEnabled?': 'boolean',
        'VoiceEnabled?': 'boolean',
        'ExcludeAllAddressRequired?': 'boolean',
        'ExcludeLocalAddressRequired?': 'boolean',
        'ExcludeForeignAddressRequired?': 'boolean',
        'Beta?': 'boolean',
        'NearNumber?': 'string',
        'NearLatLong?': 'string',
        'Distance?': 'number.integer',
        'InPostalCode?': 'string',
        'InRegion?': 'string',
        'InRateCenter?': 'string',
        'InLata?': 'string',
        'InLocality?': 'string',
        'FaxEnabled?': 'boolean',
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'available_phone_numbers?': type(
          ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberNationalSchema,
        ).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeSharedCostJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CountryCode: 'string',
        'AreaCode?': 'number.integer',
        'Contains?': 'string',
        'SmsEnabled?': 'boolean',
        'MmsEnabled?': 'boolean',
        'VoiceEnabled?': 'boolean',
        'ExcludeAllAddressRequired?': 'boolean',
        'ExcludeLocalAddressRequired?': 'boolean',
        'ExcludeForeignAddressRequired?': 'boolean',
        'Beta?': 'boolean',
        'NearNumber?': 'string',
        'NearLatLong?': 'string',
        'Distance?': 'number.integer',
        'InPostalCode?': 'string',
        'InRegion?': 'string',
        'InRateCenter?': 'string',
        'InLata?': 'string',
        'InLocality?': 'string',
        'FaxEnabled?': 'boolean',
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'available_phone_numbers?': type(
          ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberSharedCostSchema,
        ).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeTollFreeJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CountryCode: 'string',
        'AreaCode?': 'number.integer',
        'Contains?': 'string',
        'SmsEnabled?': 'boolean',
        'MmsEnabled?': 'boolean',
        'VoiceEnabled?': 'boolean',
        'ExcludeAllAddressRequired?': 'boolean',
        'ExcludeLocalAddressRequired?': 'boolean',
        'ExcludeForeignAddressRequired?': 'boolean',
        'Beta?': 'boolean',
        'NearNumber?': 'string',
        'NearLatLong?': 'string',
        'Distance?': 'number.integer',
        'InPostalCode?': 'string',
        'InRegion?': 'string',
        'InRateCenter?': 'string',
        'InLata?': 'string',
        'InLocality?': 'string',
        'FaxEnabled?': 'boolean',
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'available_phone_numbers?': type(
          ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberTollFreeSchema,
        ).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeVoipJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CountryCode: 'string',
        'AreaCode?': 'number.integer',
        'Contains?': 'string',
        'SmsEnabled?': 'boolean',
        'MmsEnabled?': 'boolean',
        'VoiceEnabled?': 'boolean',
        'ExcludeAllAddressRequired?': 'boolean',
        'ExcludeLocalAddressRequired?': 'boolean',
        'ExcludeForeignAddressRequired?': 'boolean',
        'Beta?': 'boolean',
        'NearNumber?': 'string',
        'NearLatLong?': 'string',
        'Distance?': 'number.integer',
        'InPostalCode?': 'string',
        'InRegion?': 'string',
        'InRateCenter?': 'string',
        'InLata?': 'string',
        'InLocality?': 'string',
        'FaxEnabled?': 'boolean',
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'available_phone_numbers?': type(
          ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberVoipSchema,
        ).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidBalanceJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountBalanceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidCallsJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'To?': 'string',
        'From?': 'string',
        'ParentCallSid?': type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'Status?': CallEnumStatusSchema,
        'StartTime?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
        'StartTime<?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
        'StartTime>?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
        'EndTime?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
        'EndTime<?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
        'EndTime>?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'calls?': type(ApiV2010AccountCallSchema).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountCallSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidCallsSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountCallSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountCallSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidCallsSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidCallsCallSidEventsJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'events?': type(ApiV2010AccountCallCallEventSchema).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidCallsCallSidNotificationsSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^NO[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountCallCallNotificationInstanceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidCallsCallSidNotificationsJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'Log?': 'number.integer',
        'MessageDate?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'MessageDate<?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'MessageDate>?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'notifications?': type(ApiV2010AccountCallCallNotificationSchema).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidCallsCallSidRecordingsJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'DateCreated?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'DateCreated<?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'DateCreated>?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'recordings?': type(ApiV2010AccountCallCallRecordingSchema).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsCallSidRecordingsJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountCallCallRecordingSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidCallsCallSidRecordingsSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^RE[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountCallCallRecordingSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsCallSidRecordingsSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: 'string',
      }),
    )
    .output(ApiV2010AccountCallCallRecordingSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidCallsCallSidRecordingsSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^RE[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidConferencesSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^CF[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountConferenceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidConferencesSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: 'string',
      }),
    )
    .output(ApiV2010AccountConferenceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidConferencesJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'DateCreated?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'DateCreated<?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'DateCreated>?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'DateUpdated?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'DateUpdated<?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'DateUpdated>?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'FriendlyName?': 'string',
        'Status?': ConferenceEnumStatusSchema,
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'conferences?': type(ApiV2010AccountConferenceSchema).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidConferencesConferenceSidRecordingsJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ConferenceSid: type('string')
          .and(/^CF[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'DateCreated?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'DateCreated<?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'DateCreated>?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'recordings?': type(ApiV2010AccountConferenceConferenceRecordingSchema).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ConferenceSid: type('string')
          .and(/^CF[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^RE[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountConferenceConferenceRecordingSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ConferenceSid: type('string')
          .and(/^CF[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: 'string',
      }),
    )
    .output(ApiV2010AccountConferenceConferenceRecordingSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ConferenceSid: type('string')
          .and(/^CF[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^RE[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidConnectAppsSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^CN[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountConnectAppSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidConnectAppsSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^CN[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountConnectAppSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidConnectAppsSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^CN[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidConnectAppsJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'connect_apps?': type(ApiV2010AccountConnectAppSchema).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAddressesAddressSidDependentPhoneNumbersJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        AddressSid: type('string')
          .and(/^AD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'dependent_phone_numbers?': type(ApiV2010AccountAddressDependentPhoneNumberSchema).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidIncomingPhoneNumbersSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^PN[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountIncomingPhoneNumberSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidIncomingPhoneNumbersSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^PN[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountIncomingPhoneNumberSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidIncomingPhoneNumbersSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^PN[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidIncomingPhoneNumbersJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'Beta?': 'boolean',
        'FriendlyName?': 'string',
        'PhoneNumber?': 'string',
        'Origin?': 'string',
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'incoming_phone_numbers?': type(ApiV2010AccountIncomingPhoneNumberSchema).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidIncomingPhoneNumbersJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountIncomingPhoneNumberSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ResourceSid: type('string')
          .and(/^PN[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^XE[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ResourceSid: type('string')
          .and(/^PN[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^XE[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ResourceSid: type('string')
          .and(/^PN[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'assigned_add_ons?': type(
          ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema,
        ).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ResourceSid: type('string')
          .and(/^PN[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsSidJson:
    t.procedure
      .input(
        type({
          AccountSid: type('string')
            .and(/^AC[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
          ResourceSid: type('string')
            .and(/^PN[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
          AssignedAddOnSid: type('string')
            .and(/^XE[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
          Sid: type('string')
            .and(/^XF[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        }),
      )
      .output(
        ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtensionSchema,
      )
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsJson:
    t.procedure
      .input(
        type({
          AccountSid: type('string')
            .and(/^AC[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
          ResourceSid: type('string')
            .and(/^PN[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
          AssignedAddOnSid: type('string')
            .and(/^XE[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
          'PageSize?': type('bigint | number.integer')
            .or(/^-?\d+$/)
            .pipe((data) => BigInt(data))
            .narrow(
              (data, ctx) =>
                (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
                ctx.mustBe('an int64'),
            )
            .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
            .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
          'Page?': 'number.integer >= 0',
          'PageToken?': 'string',
        }),
      )
      .output(
        type({
          'end?': 'number.integer',
          'first_page_uri?': 'string.url',
          'next_page_uri?': 'string.url | null',
          'page?': 'number.integer',
          'page_size?': 'number.integer',
          'previous_page_uri?': 'string.url | null',
          'start?': 'number.integer',
          'uri?': 'string.url',
          'extensions?': type(
            ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtensionSchema,
          ).array(),
        }),
      )
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  get20100401AccountsAccountSidIncomingPhoneNumbersLocalJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'Beta?': 'boolean',
        'FriendlyName?': 'string',
        'PhoneNumber?': 'string',
        'Origin?': 'string',
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'incoming_phone_numbers?': type(
          ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocalSchema,
        ).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidIncomingPhoneNumbersLocalJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocalSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidIncomingPhoneNumbersMobileJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'Beta?': 'boolean',
        'FriendlyName?': 'string',
        'PhoneNumber?': 'string',
        'Origin?': 'string',
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'incoming_phone_numbers?': type(
          ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobileSchema,
        ).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidIncomingPhoneNumbersMobileJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobileSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'Beta?': 'boolean',
        'FriendlyName?': 'string',
        'PhoneNumber?': 'string',
        'Origin?': 'string',
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'incoming_phone_numbers?': type(
          ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFreeSchema,
        ).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFreeSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidKeysSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^SK[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountKeySchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidKeysSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^SK[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountKeySchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidKeysSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^SK[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidKeysJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'keys?': type(ApiV2010AccountKeySchema).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidKeysJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountNewKeySchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidMessagesMessageSidMediaSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        MessageSid: type('string')
          .and(/^(SM|MM)[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^ME[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountMessageMediaSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidMessagesMessageSidMediaSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        MessageSid: type('string')
          .and(/^(SM|MM)[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^ME[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidMessagesMessageSidMediaJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        MessageSid: type('string')
          .and(/^(SM|MM)[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'DateCreated?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
        'DateCreated<?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
        'DateCreated>?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'media_list?': type(ApiV2010AccountMessageMediaSchema).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidQueuesQueueSidMembersCallSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        QueueSid: type('string')
          .and(/^QU[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: 'string',
      }),
    )
    .output(ApiV2010AccountQueueMemberSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidQueuesQueueSidMembersCallSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        QueueSid: type('string')
          .and(/^QU[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: 'string',
      }),
    )
    .output(ApiV2010AccountQueueMemberSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidQueuesQueueSidMembersJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        QueueSid: type('string')
          .and(/^QU[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'queue_members?': type(ApiV2010AccountQueueMemberSchema).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidMessagesJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'To?': 'string',
        'From?': 'string',
        'DateSent?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
        'DateSent<?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
        'DateSent>?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'messages?': type(ApiV2010AccountMessageSchema).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidMessagesJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountMessageSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidMessagesSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^(SM|MM)[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountMessageSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidMessagesSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^(SM|MM)[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountMessageSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidMessagesSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^(SM|MM)[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidMessagesMessageSidFeedbackJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        MessageSid: type('string')
          .and(/^(SM|MM)[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountMessageMessageFeedbackSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSigningKeysJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'signing_keys?': type(ApiV2010AccountSigningKeySchema).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSigningKeysJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountNewSigningKeySchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidNotificationsSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^NO[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountNotificationInstanceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidNotificationsJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'Log?': 'number.integer',
        'MessageDate?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'MessageDate<?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'MessageDate>?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'notifications?': type(ApiV2010AccountNotificationSchema).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidOutgoingCallerIdsSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^PN[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountOutgoingCallerIdSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidOutgoingCallerIdsSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^PN[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountOutgoingCallerIdSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidOutgoingCallerIdsSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^PN[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidOutgoingCallerIdsJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'PhoneNumber?': 'string',
        'FriendlyName?': 'string',
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'outgoing_caller_ids?': type(ApiV2010AccountOutgoingCallerIdSchema).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidOutgoingCallerIdsJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountValidationRequestSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ConferenceSid: type('string')
          .and(/^CF[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: 'string',
      }),
    )
    .output(ApiV2010AccountConferenceParticipantSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ConferenceSid: type('string')
          .and(/^CF[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: 'string',
      }),
    )
    .output(ApiV2010AccountConferenceParticipantSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ConferenceSid: type('string')
          .and(/^CF[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: 'string',
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidConferencesConferenceSidParticipantsJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ConferenceSid: type('string')
          .and(/^CF[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'Muted?': 'boolean',
        'Hold?': 'boolean',
        'Coaching?': 'boolean',
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'participants?': type(ApiV2010AccountConferenceParticipantSchema).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidConferencesConferenceSidParticipantsJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ConferenceSid: 'string',
      }),
    )
    .output(ApiV2010AccountConferenceParticipantSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsCallSidPaymentsJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountCallPaymentsSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsCallSidPaymentsSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^PK[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountCallPaymentsSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidQueuesSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^QU[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountQueueSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidQueuesSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^QU[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountQueueSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidQueuesSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^QU[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidQueuesJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'queues?': type(ApiV2010AccountQueueSchema).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidQueuesJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountQueueSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsCallSidTranscriptionsJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountCallRealtimeTranscriptionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsCallSidTranscriptionsSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: 'string',
      }),
    )
    .output(ApiV2010AccountCallRealtimeTranscriptionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidRecordingsSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^RE[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'IncludeSoftDeleted?': 'boolean',
      }),
    )
    .output(ApiV2010AccountRecordingSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidRecordingsSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^RE[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidRecordingsJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'DateCreated?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
        'DateCreated<?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
        'DateCreated>?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
        'CallSid?': type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'ConferenceSid?': type('string')
          .and(/^CF[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'IncludeSoftDeleted?': 'boolean',
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'recordings?': type(ApiV2010AccountRecordingSchema).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ReferenceSid: type('string')
          .and(/^RE[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^XR[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountRecordingRecordingAddOnResultSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ReferenceSid: type('string')
          .and(/^RE[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^XR[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        ReferenceSid: type('string')
          .and(/^RE[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'add_on_results?': type(ApiV2010AccountRecordingRecordingAddOnResultSchema).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJson:
    t.procedure
      .input(
        type({
          AccountSid: type('string')
            .and(/^AC[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
          ReferenceSid: type('string')
            .and(/^RE[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
          AddOnResultSid: type('string')
            .and(/^XR[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
          Sid: type('string')
            .and(/^XH[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        }),
      )
      .output(ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadSchema)
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  delete20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJson:
    t.procedure
      .input(
        type({
          AccountSid: type('string')
            .and(/^AC[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
          ReferenceSid: type('string')
            .and(/^RE[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
          AddOnResultSid: type('string')
            .and(/^XR[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
          Sid: type('string')
            .and(/^XH[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        }),
      )
      .mutation(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsJson:
    t.procedure
      .input(
        type({
          AccountSid: type('string')
            .and(/^AC[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
          ReferenceSid: type('string')
            .and(/^RE[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
          AddOnResultSid: type('string')
            .and(/^XR[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
          'PageSize?': type('bigint | number.integer')
            .or(/^-?\d+$/)
            .pipe((data) => BigInt(data))
            .narrow(
              (data, ctx) =>
                (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
                ctx.mustBe('an int64'),
            )
            .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
            .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
          'Page?': 'number.integer >= 0',
          'PageToken?': 'string',
        }),
      )
      .output(
        type({
          'end?': 'number.integer',
          'first_page_uri?': 'string.url',
          'next_page_uri?': 'string.url | null',
          'page?': 'number.integer',
          'page_size?': 'number.integer',
          'previous_page_uri?': 'string.url | null',
          'start?': 'number.integer',
          'uri?': 'string.url',
          'payloads?': type(
            ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadSchema,
          ).array(),
        }),
      )
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsPayloadSidDataJson:
    t.procedure
      .input(
        type({
          AccountSid: type('string')
            .and(/^AC[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
          ReferenceSid: type('string')
            .and(/^RE[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
          AddOnResultSid: type('string')
            .and(/^XR[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
          PayloadSid: type('string')
            .and(/^XH[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        }),
      )
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  get20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        RecordingSid: type('string')
          .and(/^RE[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^TR[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountRecordingRecordingTranscriptionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        RecordingSid: type('string')
          .and(/^RE[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^TR[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        RecordingSid: type('string')
          .and(/^RE[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'transcriptions?': type(ApiV2010AccountRecordingRecordingTranscriptionSchema).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSMSShortCodesSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^SC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountShortCodeSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSMSShortCodesSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^SC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountShortCodeSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSMSShortCodesJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'FriendlyName?': 'string',
        'ShortCode?': 'string',
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'short_codes?': type(ApiV2010AccountShortCodeSchema).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSigningKeysSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^SK[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountSigningKeySchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSigningKeysSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^SK[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountSigningKeySchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidSigningKeysSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^SK[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        DomainSid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'contents?': type(
          ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema,
        ).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        DomainSid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJson:
    t.procedure
      .input(
        type({
          AccountSid: type('string')
            .and(/^AC[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
          DomainSid: type('string')
            .and(/^SD[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
          Sid: type('string')
            .and(/^CL[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        }),
      )
      .output(ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema)
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  delete20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJson:
    t.procedure
      .input(
        type({
          AccountSid: type('string')
            .and(/^AC[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
          DomainSid: type('string')
            .and(/^SD[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
          Sid: type('string')
            .and(/^CL[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        }),
      )
      .mutation(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJson:
    t.procedure
      .input(
        type({
          AccountSid: type('string')
            .and(/^AC[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
          DomainSid: type('string')
            .and(/^SD[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
          'PageSize?': type('bigint | number.integer')
            .or(/^-?\d+$/)
            .pipe((data) => BigInt(data))
            .narrow(
              (data, ctx) =>
                (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
                ctx.mustBe('an int64'),
            )
            .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
            .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
          'Page?': 'number.integer >= 0',
          'PageToken?': 'string',
        }),
      )
      .output(
        type({
          'end?': 'number.integer',
          'first_page_uri?': 'string.url',
          'next_page_uri?': 'string.url | null',
          'page?': 'number.integer',
          'page_size?': 'number.integer',
          'previous_page_uri?': 'string.url | null',
          'start?': 'number.integer',
          'uri?': 'string.url',
          'contents?': type(
            ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema,
          ).array(),
        }),
      )
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  post20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJson:
    t.procedure
      .input(
        type({
          AccountSid: type('string')
            .and(/^AC[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
          DomainSid: type('string')
            .and(/^SD[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        }),
      )
      .output(
        ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema,
      )
      .mutation(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJson:
    t.procedure
      .input(
        type({
          AccountSid: type('string')
            .and(/^AC[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
          DomainSid: type('string')
            .and(/^SD[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
          Sid: type('string')
            .and(/^AL[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        }),
      )
      .output(
        ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema,
      )
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  delete20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJson:
    t.procedure
      .input(
        type({
          AccountSid: type('string')
            .and(/^AC[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
          DomainSid: type('string')
            .and(/^SD[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
          Sid: type('string')
            .and(/^AL[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        }),
      )
      .mutation(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  get20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJson:
    t.procedure
      .input(
        type({
          AccountSid: type('string')
            .and(/^AC[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
          DomainSid: type('string')
            .and(/^SD[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
          'PageSize?': type('bigint | number.integer')
            .or(/^-?\d+$/)
            .pipe((data) => BigInt(data))
            .narrow(
              (data, ctx) =>
                (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
                ctx.mustBe('an int64'),
            )
            .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
            .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
          'Page?': 'number.integer >= 0',
          'PageToken?': 'string',
        }),
      )
      .output(
        type({
          'end?': 'number.integer',
          'first_page_uri?': 'string.url',
          'next_page_uri?': 'string.url | null',
          'page?': 'number.integer',
          'page_size?': 'number.integer',
          'previous_page_uri?': 'string.url | null',
          'start?': 'number.integer',
          'uri?': 'string.url',
          'contents?': type(
            ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema,
          ).array(),
        }),
      )
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  post20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJson:
    t.procedure
      .input(
        type({
          AccountSid: type('string')
            .and(/^AC[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
          DomainSid: type('string')
            .and(/^SD[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        }),
      )
      .output(
        ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema,
      )
      .mutation(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  get20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJson:
    t.procedure
      .input(
        type({
          AccountSid: type('string')
            .and(/^AC[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
          DomainSid: type('string')
            .and(/^SD[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
          Sid: type('string')
            .and(/^CL[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        }),
      )
      .output(
        ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema,
      )
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  delete20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJson:
    t.procedure
      .input(
        type({
          AccountSid: type('string')
            .and(/^AC[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
          DomainSid: type('string')
            .and(/^SD[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
          Sid: type('string')
            .and(/^CL[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        }),
      )
      .mutation(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  get20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CredentialListSid: type('string')
          .and(/^CL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'credentials?': type(ApiV2010AccountSipSipCredentialListSipCredentialSchema).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CredentialListSid: type('string')
          .and(/^CL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountSipSipCredentialListSipCredentialSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CredentialListSid: type('string')
          .and(/^CL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^CR[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountSipSipCredentialListSipCredentialSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CredentialListSid: type('string')
          .and(/^CL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^CR[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountSipSipCredentialListSipCredentialSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CredentialListSid: type('string')
          .and(/^CL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^CR[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPCredentialListsJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'credential_lists?': type(ApiV2010AccountSipSipCredentialListSchema).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSIPCredentialListsJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountSipSipCredentialListSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPCredentialListsSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^CL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountSipSipCredentialListSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSIPCredentialListsSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^CL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountSipSipCredentialListSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidSIPCredentialListsSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^CL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        DomainSid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'credential_list_mappings?': type(
          ApiV2010AccountSipSipDomainSipCredentialListMappingSchema,
        ).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        DomainSid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountSipSipDomainSipCredentialListMappingSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        DomainSid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^CL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountSipSipDomainSipCredentialListMappingSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        DomainSid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^CL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPDomainsJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'domains?': type(ApiV2010AccountSipSipDomainSchema).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSIPDomainsJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountSipSipDomainSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPDomainsSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountSipSipDomainSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSIPDomainsSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountSipSipDomainSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidSIPDomainsSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPIpAccessControlListsJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'ip_access_control_lists?': type(ApiV2010AccountSipSipIpAccessControlListSchema).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSIPIpAccessControlListsJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountSipSipIpAccessControlListSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPIpAccessControlListsSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^AL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountSipSipIpAccessControlListSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSIPIpAccessControlListsSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^AL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountSipSipIpAccessControlListSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidSIPIpAccessControlListsSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^AL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        DomainSid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^AL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        DomainSid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^AL[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        DomainSid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'ip_access_control_list_mappings?': type(
          ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema,
        ).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        DomainSid: type('string')
          .and(/^SD[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJson:
    t.procedure
      .input(
        type({
          AccountSid: type('string')
            .and(/^AC[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
          IpAccessControlListSid: type('string')
            .and(/^AL[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
          'PageSize?': type('bigint | number.integer')
            .or(/^-?\d+$/)
            .pipe((data) => BigInt(data))
            .narrow(
              (data, ctx) =>
                (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
                ctx.mustBe('an int64'),
            )
            .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
            .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
          'Page?': 'number.integer >= 0',
          'PageToken?': 'string',
        }),
      )
      .output(
        type({
          'end?': 'number.integer',
          'first_page_uri?': 'string.url',
          'next_page_uri?': 'string.url | null',
          'page?': 'number.integer',
          'page_size?': 'number.integer',
          'previous_page_uri?': 'string.url | null',
          'start?': 'number.integer',
          'uri?': 'string.url',
          'ip_addresses?': type(ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema).array(),
        }),
      )
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  post20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJson:
    t.procedure
      .input(
        type({
          AccountSid: type('string')
            .and(/^AC[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
          IpAccessControlListSid: type('string')
            .and(/^AL[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        }),
      )
      .output(ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema)
      .mutation(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  get20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJson:
    t.procedure
      .input(
        type({
          AccountSid: type('string')
            .and(/^AC[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
          IpAccessControlListSid: type('string')
            .and(/^AL[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
          Sid: type('string')
            .and(/^IP[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        }),
      )
      .output(ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema)
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  post20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJson:
    t.procedure
      .input(
        type({
          AccountSid: type('string')
            .and(/^AC[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
          IpAccessControlListSid: type('string')
            .and(/^AL[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
          Sid: type('string')
            .and(/^IP[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        }),
      )
      .output(ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema)
      .mutation(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  delete20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJson:
    t.procedure
      .input(
        type({
          AccountSid: type('string')
            .and(/^AC[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
          IpAccessControlListSid: type('string')
            .and(/^AL[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
          Sid: type('string')
            .and(/^IP[0-9a-fA-F]{32}$/)
            .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        }),
      )
      .mutation(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  post20100401AccountsAccountSidCallsCallSidSiprecJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountCallSiprecSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsCallSidSiprecSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: 'string',
      }),
    )
    .output(ApiV2010AccountCallSiprecSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsCallSidStreamsJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountCallStreamSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsCallSidStreamsSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: 'string',
      }),
    )
    .output(ApiV2010AccountCallStreamSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidTokensJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountTokenSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidTranscriptionsSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^TR[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountTranscriptionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidTranscriptionsSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^TR[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidTranscriptionsJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'transcriptions?': type(ApiV2010AccountTranscriptionSchema).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidUsageRecordsJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'Category?': 'string',
        'StartDate?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'EndDate?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'IncludeSubaccounts?': 'boolean',
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'usage_records?': type(ApiV2010AccountUsageUsageRecordSchema).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidUsageRecordsAllTimeJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'Category?': 'string',
        'StartDate?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'EndDate?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'IncludeSubaccounts?': 'boolean',
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'usage_records?': type(ApiV2010AccountUsageUsageRecordUsageRecordAllTimeSchema).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidUsageRecordsDailyJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'Category?': 'string',
        'StartDate?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'EndDate?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'IncludeSubaccounts?': 'boolean',
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'usage_records?': type(ApiV2010AccountUsageUsageRecordUsageRecordDailySchema).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidUsageRecordsLastMonthJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'Category?': 'string',
        'StartDate?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'EndDate?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'IncludeSubaccounts?': 'boolean',
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'usage_records?': type(ApiV2010AccountUsageUsageRecordUsageRecordLastMonthSchema).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidUsageRecordsMonthlyJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'Category?': 'string',
        'StartDate?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'EndDate?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'IncludeSubaccounts?': 'boolean',
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'usage_records?': type(ApiV2010AccountUsageUsageRecordUsageRecordMonthlySchema).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidUsageRecordsThisMonthJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'Category?': 'string',
        'StartDate?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'EndDate?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'IncludeSubaccounts?': 'boolean',
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'usage_records?': type(ApiV2010AccountUsageUsageRecordUsageRecordThisMonthSchema).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidUsageRecordsTodayJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'Category?': 'string',
        'StartDate?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'EndDate?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'IncludeSubaccounts?': 'boolean',
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'usage_records?': type(ApiV2010AccountUsageUsageRecordUsageRecordTodaySchema).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidUsageRecordsYearlyJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'Category?': 'string',
        'StartDate?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'EndDate?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'IncludeSubaccounts?': 'boolean',
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'usage_records?': type(ApiV2010AccountUsageUsageRecordUsageRecordYearlySchema).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidUsageRecordsYesterdayJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'Category?': 'string',
        'StartDate?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'EndDate?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
        ),
        'IncludeSubaccounts?': 'boolean',
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'usage_records?': type(ApiV2010AccountUsageUsageRecordUsageRecordYesterdaySchema).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidUsageTriggersSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^UT[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountUsageUsageTriggerSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidUsageTriggersSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^UT[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountUsageUsageTriggerSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidUsageTriggersSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^UT[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidUsageTriggersJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        'Recurring?': UsageTriggerEnumRecurringSchema,
        'TriggerBy?': UsageTriggerEnumTriggerFieldSchema,
        'UsageCategory?': 'string',
        'PageSize?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 1000n || ctx.mustBe('at most 1000')),
        'Page?': 'number.integer >= 0',
        'PageToken?': 'string',
      }),
    )
    .output(
      type({
        'end?': 'number.integer',
        'first_page_uri?': 'string.url',
        'next_page_uri?': 'string.url | null',
        'page?': 'number.integer',
        'page_size?': 'number.integer',
        'previous_page_uri?': 'string.url | null',
        'start?': 'number.integer',
        'uri?': 'string.url',
        'usage_triggers?': type(ApiV2010AccountUsageUsageTriggerSchema).array(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidUsageTriggersJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountUsageUsageTriggerSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsCallSidUserDefinedMessagesJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountCallUserDefinedMessageSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsCallSidUserDefinedMessageSubscriptionsJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .output(ApiV2010AccountCallUserDefinedMessageSubscriptionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidCallsCallSidUserDefinedMessageSubscriptionsSidJson: t.procedure
    .input(
      type({
        AccountSid: type('string')
          .and(/^AC[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        CallSid: type('string')
          .and(/^CA[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
        Sid: type('string')
          .and(/^ZY[0-9a-fA-F]{32}$/)
          .narrow((data, ctx) => [...data].length === 34 || ctx.mustBe('exactly 34 characters')),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
