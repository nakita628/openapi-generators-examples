import { initTRPC, TRPCError } from '@trpc/server'
import * as v from 'valibot'
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
      v.partial(
        v.object({
          FriendlyName: v.string(),
          Status: AccountEnumStatusSchema,
          PageSize: v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
          Page: v.pipe(v.number(), v.integer(), v.minValue(0)),
          PageToken: v.string(),
        }),
      ),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          accounts: v.array(ApiV2010AccountSchema),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsJson: t.procedure.output(ApiV2010AccountSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  get20100401AccountsSidJson: t.procedure
    .input(v.object({ Sid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)) }))
    .output(ApiV2010AccountSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsSidJson: t.procedure
    .input(v.object({ Sid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)) }))
    .output(ApiV2010AccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAddressesJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CustomerName: v.optional(v.string()),
        FriendlyName: v.optional(v.string()),
        EmergencyEnabled: v.optional(v.boolean()),
        IsoCountry: v.optional(v.string()),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          addresses: v.array(ApiV2010AccountAddressSchema),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidAddressesJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountAddressSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAddressesSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^AD[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountAddressSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidAddressesSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^AD[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountAddressSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidAddressesSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^AD[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidApplicationsJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        FriendlyName: v.optional(v.string()),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          applications: v.array(ApiV2010AccountApplicationSchema),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidApplicationsJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountApplicationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidApplicationsSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^AP[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountApplicationSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidApplicationsSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^AP[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountApplicationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidApplicationsSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^AP[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAuthorizedConnectAppsConnectAppSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        ConnectAppSid: v.pipe(v.string(), v.regex(/^CN[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountAuthorizedConnectAppSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAuthorizedConnectAppsJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          authorized_connect_apps: v.array(ApiV2010AccountAuthorizedConnectAppSchema),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAvailablePhoneNumbersJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          countries: v.array(ApiV2010AccountAvailablePhoneNumberCountrySchema),
          uri: v.nullable(v.pipe(v.string(), v.url())),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CountryCode: v.string(),
      }),
    )
    .output(ApiV2010AccountAvailablePhoneNumberCountrySchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeLocalJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CountryCode: v.string(),
        AreaCode: v.optional(v.pipe(v.number(), v.integer())),
        Contains: v.optional(v.string()),
        SmsEnabled: v.optional(v.boolean()),
        MmsEnabled: v.optional(v.boolean()),
        VoiceEnabled: v.optional(v.boolean()),
        ExcludeAllAddressRequired: v.optional(v.boolean()),
        ExcludeLocalAddressRequired: v.optional(v.boolean()),
        ExcludeForeignAddressRequired: v.optional(v.boolean()),
        Beta: v.optional(v.boolean()),
        NearNumber: v.optional(v.string()),
        NearLatLong: v.optional(v.string()),
        Distance: v.optional(v.pipe(v.number(), v.integer())),
        InPostalCode: v.optional(v.string()),
        InRegion: v.optional(v.string()),
        InRateCenter: v.optional(v.string()),
        InLata: v.optional(v.string()),
        InLocality: v.optional(v.string()),
        FaxEnabled: v.optional(v.boolean()),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          available_phone_numbers: v.array(
            ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberLocalSchema,
          ),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMachineToMachineJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CountryCode: v.string(),
        AreaCode: v.optional(v.pipe(v.number(), v.integer())),
        Contains: v.optional(v.string()),
        SmsEnabled: v.optional(v.boolean()),
        MmsEnabled: v.optional(v.boolean()),
        VoiceEnabled: v.optional(v.boolean()),
        ExcludeAllAddressRequired: v.optional(v.boolean()),
        ExcludeLocalAddressRequired: v.optional(v.boolean()),
        ExcludeForeignAddressRequired: v.optional(v.boolean()),
        Beta: v.optional(v.boolean()),
        NearNumber: v.optional(v.string()),
        NearLatLong: v.optional(v.string()),
        Distance: v.optional(v.pipe(v.number(), v.integer())),
        InPostalCode: v.optional(v.string()),
        InRegion: v.optional(v.string()),
        InRateCenter: v.optional(v.string()),
        InLata: v.optional(v.string()),
        InLocality: v.optional(v.string()),
        FaxEnabled: v.optional(v.boolean()),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          available_phone_numbers: v.array(
            ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMachineToMachineSchema,
          ),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMobileJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CountryCode: v.string(),
        AreaCode: v.optional(v.pipe(v.number(), v.integer())),
        Contains: v.optional(v.string()),
        SmsEnabled: v.optional(v.boolean()),
        MmsEnabled: v.optional(v.boolean()),
        VoiceEnabled: v.optional(v.boolean()),
        ExcludeAllAddressRequired: v.optional(v.boolean()),
        ExcludeLocalAddressRequired: v.optional(v.boolean()),
        ExcludeForeignAddressRequired: v.optional(v.boolean()),
        Beta: v.optional(v.boolean()),
        NearNumber: v.optional(v.string()),
        NearLatLong: v.optional(v.string()),
        Distance: v.optional(v.pipe(v.number(), v.integer())),
        InPostalCode: v.optional(v.string()),
        InRegion: v.optional(v.string()),
        InRateCenter: v.optional(v.string()),
        InLata: v.optional(v.string()),
        InLocality: v.optional(v.string()),
        FaxEnabled: v.optional(v.boolean()),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          available_phone_numbers: v.array(
            ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMobileSchema,
          ),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeNationalJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CountryCode: v.string(),
        AreaCode: v.optional(v.pipe(v.number(), v.integer())),
        Contains: v.optional(v.string()),
        SmsEnabled: v.optional(v.boolean()),
        MmsEnabled: v.optional(v.boolean()),
        VoiceEnabled: v.optional(v.boolean()),
        ExcludeAllAddressRequired: v.optional(v.boolean()),
        ExcludeLocalAddressRequired: v.optional(v.boolean()),
        ExcludeForeignAddressRequired: v.optional(v.boolean()),
        Beta: v.optional(v.boolean()),
        NearNumber: v.optional(v.string()),
        NearLatLong: v.optional(v.string()),
        Distance: v.optional(v.pipe(v.number(), v.integer())),
        InPostalCode: v.optional(v.string()),
        InRegion: v.optional(v.string()),
        InRateCenter: v.optional(v.string()),
        InLata: v.optional(v.string()),
        InLocality: v.optional(v.string()),
        FaxEnabled: v.optional(v.boolean()),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          available_phone_numbers: v.array(
            ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberNationalSchema,
          ),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeSharedCostJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CountryCode: v.string(),
        AreaCode: v.optional(v.pipe(v.number(), v.integer())),
        Contains: v.optional(v.string()),
        SmsEnabled: v.optional(v.boolean()),
        MmsEnabled: v.optional(v.boolean()),
        VoiceEnabled: v.optional(v.boolean()),
        ExcludeAllAddressRequired: v.optional(v.boolean()),
        ExcludeLocalAddressRequired: v.optional(v.boolean()),
        ExcludeForeignAddressRequired: v.optional(v.boolean()),
        Beta: v.optional(v.boolean()),
        NearNumber: v.optional(v.string()),
        NearLatLong: v.optional(v.string()),
        Distance: v.optional(v.pipe(v.number(), v.integer())),
        InPostalCode: v.optional(v.string()),
        InRegion: v.optional(v.string()),
        InRateCenter: v.optional(v.string()),
        InLata: v.optional(v.string()),
        InLocality: v.optional(v.string()),
        FaxEnabled: v.optional(v.boolean()),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          available_phone_numbers: v.array(
            ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberSharedCostSchema,
          ),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeTollFreeJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CountryCode: v.string(),
        AreaCode: v.optional(v.pipe(v.number(), v.integer())),
        Contains: v.optional(v.string()),
        SmsEnabled: v.optional(v.boolean()),
        MmsEnabled: v.optional(v.boolean()),
        VoiceEnabled: v.optional(v.boolean()),
        ExcludeAllAddressRequired: v.optional(v.boolean()),
        ExcludeLocalAddressRequired: v.optional(v.boolean()),
        ExcludeForeignAddressRequired: v.optional(v.boolean()),
        Beta: v.optional(v.boolean()),
        NearNumber: v.optional(v.string()),
        NearLatLong: v.optional(v.string()),
        Distance: v.optional(v.pipe(v.number(), v.integer())),
        InPostalCode: v.optional(v.string()),
        InRegion: v.optional(v.string()),
        InRateCenter: v.optional(v.string()),
        InLata: v.optional(v.string()),
        InLocality: v.optional(v.string()),
        FaxEnabled: v.optional(v.boolean()),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          available_phone_numbers: v.array(
            ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberTollFreeSchema,
          ),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeVoipJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CountryCode: v.string(),
        AreaCode: v.optional(v.pipe(v.number(), v.integer())),
        Contains: v.optional(v.string()),
        SmsEnabled: v.optional(v.boolean()),
        MmsEnabled: v.optional(v.boolean()),
        VoiceEnabled: v.optional(v.boolean()),
        ExcludeAllAddressRequired: v.optional(v.boolean()),
        ExcludeLocalAddressRequired: v.optional(v.boolean()),
        ExcludeForeignAddressRequired: v.optional(v.boolean()),
        Beta: v.optional(v.boolean()),
        NearNumber: v.optional(v.string()),
        NearLatLong: v.optional(v.string()),
        Distance: v.optional(v.pipe(v.number(), v.integer())),
        InPostalCode: v.optional(v.string()),
        InRegion: v.optional(v.string()),
        InRateCenter: v.optional(v.string()),
        InLata: v.optional(v.string()),
        InLocality: v.optional(v.string()),
        FaxEnabled: v.optional(v.boolean()),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          available_phone_numbers: v.array(
            ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberVoipSchema,
          ),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidBalanceJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountBalanceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidCallsJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        To: v.optional(v.string()),
        From: v.optional(v.string()),
        ParentCallSid: v.optional(
          v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
        ),
        Status: v.optional(CallEnumStatusSchema),
        StartTime: v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
            ),
          ),
        ),
        'StartTime<': v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
            ),
          ),
        ),
        'StartTime>': v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
            ),
          ),
        ),
        EndTime: v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
            ),
          ),
        ),
        'EndTime<': v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
            ),
          ),
        ),
        'EndTime>': v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
            ),
          ),
        ),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          calls: v.array(ApiV2010AccountCallSchema),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountCallSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidCallsSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountCallSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountCallSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidCallsSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidCallsCallSidEventsJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          events: v.array(ApiV2010AccountCallCallEventSchema),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidCallsCallSidNotificationsSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^NO[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountCallCallNotificationInstanceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidCallsCallSidNotificationsJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Log: v.optional(v.pipe(v.number(), v.integer())),
        MessageDate: v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
        ),
        'MessageDate<': v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
        ),
        'MessageDate>': v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
        ),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          notifications: v.array(ApiV2010AccountCallCallNotificationSchema),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidCallsCallSidRecordingsJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
        DateCreated: v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
        ),
        'DateCreated<': v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
        ),
        'DateCreated>': v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
        ),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          recordings: v.array(ApiV2010AccountCallCallRecordingSchema),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsCallSidRecordingsJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountCallCallRecordingSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidCallsCallSidRecordingsSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountCallCallRecordingSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsCallSidRecordingsSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.string(),
      }),
    )
    .output(ApiV2010AccountCallCallRecordingSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidCallsCallSidRecordingsSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidConferencesSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^CF[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountConferenceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidConferencesSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.string(),
      }),
    )
    .output(ApiV2010AccountConferenceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidConferencesJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        DateCreated: v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
        ),
        'DateCreated<': v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
        ),
        'DateCreated>': v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
        ),
        DateUpdated: v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
        ),
        'DateUpdated<': v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
        ),
        'DateUpdated>': v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
        ),
        FriendlyName: v.optional(v.string()),
        Status: v.optional(ConferenceEnumStatusSchema),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          conferences: v.array(ApiV2010AccountConferenceSchema),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidConferencesConferenceSidRecordingsJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        ConferenceSid: v.pipe(v.string(), v.regex(/^CF[0-9a-fA-F]{32}$/), v.codePoints(34)),
        DateCreated: v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
        ),
        'DateCreated<': v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
        ),
        'DateCreated>': v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
        ),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          recordings: v.array(ApiV2010AccountConferenceConferenceRecordingSchema),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        ConferenceSid: v.pipe(v.string(), v.regex(/^CF[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountConferenceConferenceRecordingSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        ConferenceSid: v.pipe(v.string(), v.regex(/^CF[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.string(),
      }),
    )
    .output(ApiV2010AccountConferenceConferenceRecordingSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        ConferenceSid: v.pipe(v.string(), v.regex(/^CF[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidConnectAppsSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^CN[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountConnectAppSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidConnectAppsSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^CN[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountConnectAppSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidConnectAppsSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^CN[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidConnectAppsJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          connect_apps: v.array(ApiV2010AccountConnectAppSchema),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAddressesAddressSidDependentPhoneNumbersJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        AddressSid: v.pipe(v.string(), v.regex(/^AD[0-9a-fA-F]{32}$/), v.codePoints(34)),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          dependent_phone_numbers: v.array(ApiV2010AccountAddressDependentPhoneNumberSchema),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidIncomingPhoneNumbersSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^PN[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountIncomingPhoneNumberSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidIncomingPhoneNumbersSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^PN[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountIncomingPhoneNumberSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidIncomingPhoneNumbersSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^PN[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidIncomingPhoneNumbersJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Beta: v.optional(v.boolean()),
        FriendlyName: v.optional(v.string()),
        PhoneNumber: v.optional(v.string()),
        Origin: v.optional(v.string()),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          incoming_phone_numbers: v.array(ApiV2010AccountIncomingPhoneNumberSchema),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidIncomingPhoneNumbersJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountIncomingPhoneNumberSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        ResourceSid: v.pipe(v.string(), v.regex(/^PN[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^XE[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        ResourceSid: v.pipe(v.string(), v.regex(/^PN[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^XE[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        ResourceSid: v.pipe(v.string(), v.regex(/^PN[0-9a-fA-F]{32}$/), v.codePoints(34)),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          assigned_add_ons: v.array(
            ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema,
          ),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        ResourceSid: v.pipe(v.string(), v.regex(/^PN[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsSidJson:
    t.procedure
      .input(
        v.object({
          AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
          ResourceSid: v.pipe(v.string(), v.regex(/^PN[0-9a-fA-F]{32}$/), v.codePoints(34)),
          AssignedAddOnSid: v.pipe(v.string(), v.regex(/^XE[0-9a-fA-F]{32}$/), v.codePoints(34)),
          Sid: v.pipe(v.string(), v.regex(/^XF[0-9a-fA-F]{32}$/), v.codePoints(34)),
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
        v.object({
          AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
          ResourceSid: v.pipe(v.string(), v.regex(/^PN[0-9a-fA-F]{32}$/), v.codePoints(34)),
          AssignedAddOnSid: v.pipe(v.string(), v.regex(/^XE[0-9a-fA-F]{32}$/), v.codePoints(34)),
          PageSize: v.optional(
            v.pipe(
              v.union([
                v.bigint(),
                v.pipe(v.number(), v.integer()),
                v.pipe(v.string(), v.regex(/^-?\d+$/)),
              ]),
              v.transform((input) => BigInt(input)),
              v.minValue(-9223372036854775808n),
              v.maxValue(9223372036854775807n),
              v.minValue(1n),
              v.maxValue(1000n),
            ),
          ),
          Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
          PageToken: v.optional(v.string()),
        }),
      )
      .output(
        v.partial(
          v.object({
            end: v.pipe(v.number(), v.integer()),
            first_page_uri: v.pipe(v.string(), v.url()),
            next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
            page: v.pipe(v.number(), v.integer()),
            page_size: v.pipe(v.number(), v.integer()),
            previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
            start: v.pipe(v.number(), v.integer()),
            uri: v.pipe(v.string(), v.url()),
            extensions: v.array(
              ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtensionSchema,
            ),
          }),
        ),
      )
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  get20100401AccountsAccountSidIncomingPhoneNumbersLocalJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Beta: v.optional(v.boolean()),
        FriendlyName: v.optional(v.string()),
        PhoneNumber: v.optional(v.string()),
        Origin: v.optional(v.string()),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          incoming_phone_numbers: v.array(
            ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocalSchema,
          ),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidIncomingPhoneNumbersLocalJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocalSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidIncomingPhoneNumbersMobileJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Beta: v.optional(v.boolean()),
        FriendlyName: v.optional(v.string()),
        PhoneNumber: v.optional(v.string()),
        Origin: v.optional(v.string()),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          incoming_phone_numbers: v.array(
            ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobileSchema,
          ),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidIncomingPhoneNumbersMobileJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobileSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Beta: v.optional(v.boolean()),
        FriendlyName: v.optional(v.string()),
        PhoneNumber: v.optional(v.string()),
        Origin: v.optional(v.string()),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          incoming_phone_numbers: v.array(
            ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFreeSchema,
          ),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFreeSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidKeysSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^SK[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountKeySchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidKeysSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^SK[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountKeySchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidKeysSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^SK[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidKeysJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          keys: v.array(ApiV2010AccountKeySchema),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidKeysJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountNewKeySchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidMessagesMessageSidMediaSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        MessageSid: v.pipe(v.string(), v.regex(/^(SM|MM)[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^ME[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountMessageMediaSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidMessagesMessageSidMediaSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        MessageSid: v.pipe(v.string(), v.regex(/^(SM|MM)[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^ME[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidMessagesMessageSidMediaJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        MessageSid: v.pipe(v.string(), v.regex(/^(SM|MM)[0-9a-fA-F]{32}$/), v.codePoints(34)),
        DateCreated: v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
            ),
          ),
        ),
        'DateCreated<': v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
            ),
          ),
        ),
        'DateCreated>': v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
            ),
          ),
        ),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          media_list: v.array(ApiV2010AccountMessageMediaSchema),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidQueuesQueueSidMembersCallSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        QueueSid: v.pipe(v.string(), v.regex(/^QU[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CallSid: v.string(),
      }),
    )
    .output(ApiV2010AccountQueueMemberSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidQueuesQueueSidMembersCallSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        QueueSid: v.pipe(v.string(), v.regex(/^QU[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CallSid: v.string(),
      }),
    )
    .output(ApiV2010AccountQueueMemberSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidQueuesQueueSidMembersJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        QueueSid: v.pipe(v.string(), v.regex(/^QU[0-9a-fA-F]{32}$/), v.codePoints(34)),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          queue_members: v.array(ApiV2010AccountQueueMemberSchema),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidMessagesJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        To: v.optional(v.string()),
        From: v.optional(v.string()),
        DateSent: v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
            ),
          ),
        ),
        'DateSent<': v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
            ),
          ),
        ),
        'DateSent>': v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
            ),
          ),
        ),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          messages: v.array(ApiV2010AccountMessageSchema),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidMessagesJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountMessageSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidMessagesSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^(SM|MM)[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountMessageSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidMessagesSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^(SM|MM)[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountMessageSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidMessagesSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^(SM|MM)[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidMessagesMessageSidFeedbackJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        MessageSid: v.pipe(v.string(), v.regex(/^(SM|MM)[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountMessageMessageFeedbackSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSigningKeysJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          signing_keys: v.array(ApiV2010AccountSigningKeySchema),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSigningKeysJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountNewSigningKeySchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidNotificationsSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^NO[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountNotificationInstanceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidNotificationsJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Log: v.optional(v.pipe(v.number(), v.integer())),
        MessageDate: v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
        ),
        'MessageDate<': v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
        ),
        'MessageDate>': v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
        ),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          notifications: v.array(ApiV2010AccountNotificationSchema),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidOutgoingCallerIdsSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^PN[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountOutgoingCallerIdSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidOutgoingCallerIdsSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^PN[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountOutgoingCallerIdSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidOutgoingCallerIdsSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^PN[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidOutgoingCallerIdsJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        PhoneNumber: v.optional(v.string()),
        FriendlyName: v.optional(v.string()),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          outgoing_caller_ids: v.array(ApiV2010AccountOutgoingCallerIdSchema),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidOutgoingCallerIdsJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountValidationRequestSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        ConferenceSid: v.pipe(v.string(), v.regex(/^CF[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CallSid: v.string(),
      }),
    )
    .output(ApiV2010AccountConferenceParticipantSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        ConferenceSid: v.pipe(v.string(), v.regex(/^CF[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CallSid: v.string(),
      }),
    )
    .output(ApiV2010AccountConferenceParticipantSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        ConferenceSid: v.pipe(v.string(), v.regex(/^CF[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CallSid: v.string(),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidConferencesConferenceSidParticipantsJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        ConferenceSid: v.pipe(v.string(), v.regex(/^CF[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Muted: v.optional(v.boolean()),
        Hold: v.optional(v.boolean()),
        Coaching: v.optional(v.boolean()),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          participants: v.array(ApiV2010AccountConferenceParticipantSchema),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidConferencesConferenceSidParticipantsJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        ConferenceSid: v.string(),
      }),
    )
    .output(ApiV2010AccountConferenceParticipantSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsCallSidPaymentsJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountCallPaymentsSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsCallSidPaymentsSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^PK[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountCallPaymentsSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidQueuesSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^QU[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountQueueSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidQueuesSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^QU[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountQueueSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidQueuesSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^QU[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidQueuesJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          queues: v.array(ApiV2010AccountQueueSchema),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidQueuesJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountQueueSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsCallSidTranscriptionsJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountCallRealtimeTranscriptionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsCallSidTranscriptionsSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.string(),
      }),
    )
    .output(ApiV2010AccountCallRealtimeTranscriptionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidRecordingsSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34)),
        IncludeSoftDeleted: v.optional(v.boolean()),
      }),
    )
    .output(ApiV2010AccountRecordingSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidRecordingsSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidRecordingsJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        DateCreated: v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
            ),
          ),
        ),
        'DateCreated<': v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
            ),
          ),
        ),
        'DateCreated>': v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
            ),
          ),
        ),
        CallSid: v.optional(v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34))),
        ConferenceSid: v.optional(
          v.pipe(v.string(), v.regex(/^CF[0-9a-fA-F]{32}$/), v.codePoints(34)),
        ),
        IncludeSoftDeleted: v.optional(v.boolean()),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          recordings: v.array(ApiV2010AccountRecordingSchema),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        ReferenceSid: v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^XR[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountRecordingRecordingAddOnResultSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        ReferenceSid: v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^XR[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        ReferenceSid: v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34)),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          add_on_results: v.array(ApiV2010AccountRecordingRecordingAddOnResultSchema),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJson:
    t.procedure
      .input(
        v.object({
          AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
          ReferenceSid: v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34)),
          AddOnResultSid: v.pipe(v.string(), v.regex(/^XR[0-9a-fA-F]{32}$/), v.codePoints(34)),
          Sid: v.pipe(v.string(), v.regex(/^XH[0-9a-fA-F]{32}$/), v.codePoints(34)),
        }),
      )
      .output(ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadSchema)
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  delete20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJson:
    t.procedure
      .input(
        v.object({
          AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
          ReferenceSid: v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34)),
          AddOnResultSid: v.pipe(v.string(), v.regex(/^XR[0-9a-fA-F]{32}$/), v.codePoints(34)),
          Sid: v.pipe(v.string(), v.regex(/^XH[0-9a-fA-F]{32}$/), v.codePoints(34)),
        }),
      )
      .mutation(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsJson:
    t.procedure
      .input(
        v.object({
          AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
          ReferenceSid: v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34)),
          AddOnResultSid: v.pipe(v.string(), v.regex(/^XR[0-9a-fA-F]{32}$/), v.codePoints(34)),
          PageSize: v.optional(
            v.pipe(
              v.union([
                v.bigint(),
                v.pipe(v.number(), v.integer()),
                v.pipe(v.string(), v.regex(/^-?\d+$/)),
              ]),
              v.transform((input) => BigInt(input)),
              v.minValue(-9223372036854775808n),
              v.maxValue(9223372036854775807n),
              v.minValue(1n),
              v.maxValue(1000n),
            ),
          ),
          Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
          PageToken: v.optional(v.string()),
        }),
      )
      .output(
        v.partial(
          v.object({
            end: v.pipe(v.number(), v.integer()),
            first_page_uri: v.pipe(v.string(), v.url()),
            next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
            page: v.pipe(v.number(), v.integer()),
            page_size: v.pipe(v.number(), v.integer()),
            previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
            start: v.pipe(v.number(), v.integer()),
            uri: v.pipe(v.string(), v.url()),
            payloads: v.array(
              ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadSchema,
            ),
          }),
        ),
      )
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsPayloadSidDataJson:
    t.procedure
      .input(
        v.object({
          AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
          ReferenceSid: v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34)),
          AddOnResultSid: v.pipe(v.string(), v.regex(/^XR[0-9a-fA-F]{32}$/), v.codePoints(34)),
          PayloadSid: v.pipe(v.string(), v.regex(/^XH[0-9a-fA-F]{32}$/), v.codePoints(34)),
        }),
      )
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  get20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        RecordingSid: v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^TR[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountRecordingRecordingTranscriptionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        RecordingSid: v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^TR[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        RecordingSid: v.pipe(v.string(), v.regex(/^RE[0-9a-fA-F]{32}$/), v.codePoints(34)),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          transcriptions: v.array(ApiV2010AccountRecordingRecordingTranscriptionSchema),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSMSShortCodesSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^SC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountShortCodeSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSMSShortCodesSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^SC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountShortCodeSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSMSShortCodesJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        FriendlyName: v.optional(v.string()),
        ShortCode: v.optional(v.string()),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          short_codes: v.array(ApiV2010AccountShortCodeSchema),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSigningKeysSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^SK[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountSigningKeySchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSigningKeysSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^SK[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountSigningKeySchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidSigningKeysSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^SK[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          contents: v.array(
            ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema,
          ),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJson:
    t.procedure
      .input(
        v.object({
          AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
          DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
          Sid: v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34)),
        }),
      )
      .output(ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema)
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  delete20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJson:
    t.procedure
      .input(
        v.object({
          AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
          DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
          Sid: v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34)),
        }),
      )
      .mutation(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJson:
    t.procedure
      .input(
        v.object({
          AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
          DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
          PageSize: v.optional(
            v.pipe(
              v.union([
                v.bigint(),
                v.pipe(v.number(), v.integer()),
                v.pipe(v.string(), v.regex(/^-?\d+$/)),
              ]),
              v.transform((input) => BigInt(input)),
              v.minValue(-9223372036854775808n),
              v.maxValue(9223372036854775807n),
              v.minValue(1n),
              v.maxValue(1000n),
            ),
          ),
          Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
          PageToken: v.optional(v.string()),
        }),
      )
      .output(
        v.partial(
          v.object({
            end: v.pipe(v.number(), v.integer()),
            first_page_uri: v.pipe(v.string(), v.url()),
            next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
            page: v.pipe(v.number(), v.integer()),
            page_size: v.pipe(v.number(), v.integer()),
            previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
            start: v.pipe(v.number(), v.integer()),
            uri: v.pipe(v.string(), v.url()),
            contents: v.array(
              ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema,
            ),
          }),
        ),
      )
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  post20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJson:
    t.procedure
      .input(
        v.object({
          AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
          DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
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
        v.object({
          AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
          DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
          Sid: v.pipe(v.string(), v.regex(/^AL[0-9a-fA-F]{32}$/), v.codePoints(34)),
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
        v.object({
          AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
          DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
          Sid: v.pipe(v.string(), v.regex(/^AL[0-9a-fA-F]{32}$/), v.codePoints(34)),
        }),
      )
      .mutation(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  get20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJson:
    t.procedure
      .input(
        v.object({
          AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
          DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
          PageSize: v.optional(
            v.pipe(
              v.union([
                v.bigint(),
                v.pipe(v.number(), v.integer()),
                v.pipe(v.string(), v.regex(/^-?\d+$/)),
              ]),
              v.transform((input) => BigInt(input)),
              v.minValue(-9223372036854775808n),
              v.maxValue(9223372036854775807n),
              v.minValue(1n),
              v.maxValue(1000n),
            ),
          ),
          Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
          PageToken: v.optional(v.string()),
        }),
      )
      .output(
        v.partial(
          v.object({
            end: v.pipe(v.number(), v.integer()),
            first_page_uri: v.pipe(v.string(), v.url()),
            next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
            page: v.pipe(v.number(), v.integer()),
            page_size: v.pipe(v.number(), v.integer()),
            previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
            start: v.pipe(v.number(), v.integer()),
            uri: v.pipe(v.string(), v.url()),
            contents: v.array(
              ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema,
            ),
          }),
        ),
      )
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  post20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJson:
    t.procedure
      .input(
        v.object({
          AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
          DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
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
        v.object({
          AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
          DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
          Sid: v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34)),
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
        v.object({
          AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
          DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
          Sid: v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34)),
        }),
      )
      .mutation(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  get20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CredentialListSid: v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34)),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          credentials: v.array(ApiV2010AccountSipSipCredentialListSipCredentialSchema),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CredentialListSid: v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountSipSipCredentialListSipCredentialSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CredentialListSid: v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^CR[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountSipSipCredentialListSipCredentialSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CredentialListSid: v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^CR[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountSipSipCredentialListSipCredentialSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CredentialListSid: v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^CR[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPCredentialListsJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          credential_lists: v.array(ApiV2010AccountSipSipCredentialListSchema),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSIPCredentialListsJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountSipSipCredentialListSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPCredentialListsSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountSipSipCredentialListSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSIPCredentialListsSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountSipSipCredentialListSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidSIPCredentialListsSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          credential_list_mappings: v.array(
            ApiV2010AccountSipSipDomainSipCredentialListMappingSchema,
          ),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountSipSipDomainSipCredentialListMappingSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountSipSipDomainSipCredentialListMappingSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^CL[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPDomainsJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          domains: v.array(ApiV2010AccountSipSipDomainSchema),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSIPDomainsJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountSipSipDomainSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPDomainsSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountSipSipDomainSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSIPDomainsSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountSipSipDomainSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidSIPDomainsSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPIpAccessControlListsJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          ip_access_control_lists: v.array(ApiV2010AccountSipSipIpAccessControlListSchema),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSIPIpAccessControlListsJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountSipSipIpAccessControlListSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPIpAccessControlListsSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^AL[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountSipSipIpAccessControlListSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSIPIpAccessControlListsSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^AL[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountSipSipIpAccessControlListSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidSIPIpAccessControlListsSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^AL[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^AL[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^AL[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          ip_access_control_list_mappings: v.array(
            ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema,
          ),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        DomainSid: v.pipe(v.string(), v.regex(/^SD[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJson:
    t.procedure
      .input(
        v.object({
          AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
          IpAccessControlListSid: v.pipe(
            v.string(),
            v.regex(/^AL[0-9a-fA-F]{32}$/),
            v.codePoints(34),
          ),
          PageSize: v.optional(
            v.pipe(
              v.union([
                v.bigint(),
                v.pipe(v.number(), v.integer()),
                v.pipe(v.string(), v.regex(/^-?\d+$/)),
              ]),
              v.transform((input) => BigInt(input)),
              v.minValue(-9223372036854775808n),
              v.maxValue(9223372036854775807n),
              v.minValue(1n),
              v.maxValue(1000n),
            ),
          ),
          Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
          PageToken: v.optional(v.string()),
        }),
      )
      .output(
        v.partial(
          v.object({
            end: v.pipe(v.number(), v.integer()),
            first_page_uri: v.pipe(v.string(), v.url()),
            next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
            page: v.pipe(v.number(), v.integer()),
            page_size: v.pipe(v.number(), v.integer()),
            previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
            start: v.pipe(v.number(), v.integer()),
            uri: v.pipe(v.string(), v.url()),
            ip_addresses: v.array(ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema),
          }),
        ),
      )
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  post20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJson:
    t.procedure
      .input(
        v.object({
          AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
          IpAccessControlListSid: v.pipe(
            v.string(),
            v.regex(/^AL[0-9a-fA-F]{32}$/),
            v.codePoints(34),
          ),
        }),
      )
      .output(ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema)
      .mutation(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  get20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJson:
    t.procedure
      .input(
        v.object({
          AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
          IpAccessControlListSid: v.pipe(
            v.string(),
            v.regex(/^AL[0-9a-fA-F]{32}$/),
            v.codePoints(34),
          ),
          Sid: v.pipe(v.string(), v.regex(/^IP[0-9a-fA-F]{32}$/), v.codePoints(34)),
        }),
      )
      .output(ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema)
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  post20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJson:
    t.procedure
      .input(
        v.object({
          AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
          IpAccessControlListSid: v.pipe(
            v.string(),
            v.regex(/^AL[0-9a-fA-F]{32}$/),
            v.codePoints(34),
          ),
          Sid: v.pipe(v.string(), v.regex(/^IP[0-9a-fA-F]{32}$/), v.codePoints(34)),
        }),
      )
      .output(ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema)
      .mutation(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  delete20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJson:
    t.procedure
      .input(
        v.object({
          AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
          IpAccessControlListSid: v.pipe(
            v.string(),
            v.regex(/^AL[0-9a-fA-F]{32}$/),
            v.codePoints(34),
          ),
          Sid: v.pipe(v.string(), v.regex(/^IP[0-9a-fA-F]{32}$/), v.codePoints(34)),
        }),
      )
      .mutation(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  post20100401AccountsAccountSidCallsCallSidSiprecJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountCallSiprecSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsCallSidSiprecSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.string(),
      }),
    )
    .output(ApiV2010AccountCallSiprecSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsCallSidStreamsJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountCallStreamSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsCallSidStreamsSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.string(),
      }),
    )
    .output(ApiV2010AccountCallStreamSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidTokensJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountTokenSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidTranscriptionsSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^TR[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountTranscriptionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidTranscriptionsSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^TR[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidTranscriptionsJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          transcriptions: v.array(ApiV2010AccountTranscriptionSchema),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidUsageRecordsJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Category: v.optional(v.string()),
        StartDate: v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
        ),
        EndDate: v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
        ),
        IncludeSubaccounts: v.optional(v.boolean()),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          usage_records: v.array(ApiV2010AccountUsageUsageRecordSchema),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidUsageRecordsAllTimeJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Category: v.optional(v.string()),
        StartDate: v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
        ),
        EndDate: v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
        ),
        IncludeSubaccounts: v.optional(v.boolean()),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          usage_records: v.array(ApiV2010AccountUsageUsageRecordUsageRecordAllTimeSchema),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidUsageRecordsDailyJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Category: v.optional(v.string()),
        StartDate: v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
        ),
        EndDate: v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
        ),
        IncludeSubaccounts: v.optional(v.boolean()),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          usage_records: v.array(ApiV2010AccountUsageUsageRecordUsageRecordDailySchema),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidUsageRecordsLastMonthJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Category: v.optional(v.string()),
        StartDate: v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
        ),
        EndDate: v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
        ),
        IncludeSubaccounts: v.optional(v.boolean()),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          usage_records: v.array(ApiV2010AccountUsageUsageRecordUsageRecordLastMonthSchema),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidUsageRecordsMonthlyJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Category: v.optional(v.string()),
        StartDate: v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
        ),
        EndDate: v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
        ),
        IncludeSubaccounts: v.optional(v.boolean()),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          usage_records: v.array(ApiV2010AccountUsageUsageRecordUsageRecordMonthlySchema),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidUsageRecordsThisMonthJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Category: v.optional(v.string()),
        StartDate: v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
        ),
        EndDate: v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
        ),
        IncludeSubaccounts: v.optional(v.boolean()),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          usage_records: v.array(ApiV2010AccountUsageUsageRecordUsageRecordThisMonthSchema),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidUsageRecordsTodayJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Category: v.optional(v.string()),
        StartDate: v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
        ),
        EndDate: v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
        ),
        IncludeSubaccounts: v.optional(v.boolean()),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          usage_records: v.array(ApiV2010AccountUsageUsageRecordUsageRecordTodaySchema),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidUsageRecordsYearlyJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Category: v.optional(v.string()),
        StartDate: v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
        ),
        EndDate: v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
        ),
        IncludeSubaccounts: v.optional(v.boolean()),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          usage_records: v.array(ApiV2010AccountUsageUsageRecordUsageRecordYearlySchema),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidUsageRecordsYesterdayJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Category: v.optional(v.string()),
        StartDate: v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
        ),
        EndDate: v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))$/,
            ),
          ),
        ),
        IncludeSubaccounts: v.optional(v.boolean()),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          usage_records: v.array(ApiV2010AccountUsageUsageRecordUsageRecordYesterdaySchema),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidUsageTriggersSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^UT[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountUsageUsageTriggerSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidUsageTriggersSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^UT[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountUsageUsageTriggerSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidUsageTriggersSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^UT[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidUsageTriggersJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Recurring: v.optional(UsageTriggerEnumRecurringSchema),
        TriggerBy: v.optional(UsageTriggerEnumTriggerFieldSchema),
        UsageCategory: v.optional(v.string()),
        PageSize: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(1000n),
          ),
        ),
        Page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
        PageToken: v.optional(v.string()),
      }),
    )
    .output(
      v.partial(
        v.object({
          end: v.pipe(v.number(), v.integer()),
          first_page_uri: v.pipe(v.string(), v.url()),
          next_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          page: v.pipe(v.number(), v.integer()),
          page_size: v.pipe(v.number(), v.integer()),
          previous_page_uri: v.nullable(v.pipe(v.string(), v.url())),
          start: v.pipe(v.number(), v.integer()),
          uri: v.pipe(v.string(), v.url()),
          usage_triggers: v.array(ApiV2010AccountUsageUsageTriggerSchema),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidUsageTriggersJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountUsageUsageTriggerSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsCallSidUserDefinedMessagesJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountCallUserDefinedMessageSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsCallSidUserDefinedMessageSubscriptionsJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .output(ApiV2010AccountCallUserDefinedMessageSubscriptionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidCallsCallSidUserDefinedMessageSubscriptionsSidJson: t.procedure
    .input(
      v.object({
        AccountSid: v.pipe(v.string(), v.regex(/^AC[0-9a-fA-F]{32}$/), v.codePoints(34)),
        CallSid: v.pipe(v.string(), v.regex(/^CA[0-9a-fA-F]{32}$/), v.codePoints(34)),
        Sid: v.pipe(v.string(), v.regex(/^ZY[0-9a-fA-F]{32}$/), v.codePoints(34)),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
