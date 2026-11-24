import { initTRPC, TRPCError } from '@trpc/server'
import { Schema, SchemaTransformation } from 'effect'
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
      Schema.toStandardSchemaV1(
        Schema.Struct({
          FriendlyName: Schema.optionalKey(Schema.String),
          Status: Schema.optionalKey(AccountEnumStatusSchema),
          PageSize: Schema.optionalKey(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsJson: t.procedure
    .output(Schema.toStandardSchemaV1(ApiV2010AccountSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAddressesJson: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          CustomerName: Schema.optionalKey(Schema.String),
          FriendlyName: Schema.optionalKey(Schema.String),
          EmergencyEnabled: Schema.optionalKey(Schema.Boolean),
          IsoCountry: Schema.optionalKey(Schema.String),
          PageSize: Schema.optionalKey(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidAddressesJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountAddressSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAddressesSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountAddressSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidAddressesSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountAddressSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidAddressesSidJson: t.procedure
    .input(
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
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidApplicationsJson: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          FriendlyName: Schema.optionalKey(Schema.String),
          PageSize: Schema.optionalKey(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidApplicationsJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountApplicationSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidApplicationsSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountApplicationSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidApplicationsSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountApplicationSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidApplicationsSidJson: t.procedure
    .input(
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
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAuthorizedConnectAppsConnectAppSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountAuthorizedConnectAppSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAuthorizedConnectAppsJson: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          PageSize: Schema.optionalKey(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAvailablePhoneNumbersJson: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          PageSize: Schema.optionalKey(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          countries: Schema.optionalKey(
            Schema.Array(ApiV2010AccountAvailablePhoneNumberCountrySchema),
          ),
          uri: Schema.optionalKey(
            Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
          ),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountAvailablePhoneNumberCountrySchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeLocalJson: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          CountryCode: Schema.String,
          AreaCode: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          Contains: Schema.optionalKey(Schema.String),
          SmsEnabled: Schema.optionalKey(Schema.Boolean),
          MmsEnabled: Schema.optionalKey(Schema.Boolean),
          VoiceEnabled: Schema.optionalKey(Schema.Boolean),
          ExcludeAllAddressRequired: Schema.optionalKey(Schema.Boolean),
          ExcludeLocalAddressRequired: Schema.optionalKey(Schema.Boolean),
          ExcludeForeignAddressRequired: Schema.optionalKey(Schema.Boolean),
          Beta: Schema.optionalKey(Schema.Boolean),
          NearNumber: Schema.optionalKey(Schema.String),
          NearLatLong: Schema.optionalKey(Schema.String),
          Distance: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          InPostalCode: Schema.optionalKey(Schema.String),
          InRegion: Schema.optionalKey(Schema.String),
          InRateCenter: Schema.optionalKey(Schema.String),
          InLata: Schema.optionalKey(Schema.String),
          InLocality: Schema.optionalKey(Schema.String),
          FaxEnabled: Schema.optionalKey(Schema.Boolean),
          PageSize: Schema.optionalKey(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMachineToMachineJson: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          CountryCode: Schema.String,
          AreaCode: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          Contains: Schema.optionalKey(Schema.String),
          SmsEnabled: Schema.optionalKey(Schema.Boolean),
          MmsEnabled: Schema.optionalKey(Schema.Boolean),
          VoiceEnabled: Schema.optionalKey(Schema.Boolean),
          ExcludeAllAddressRequired: Schema.optionalKey(Schema.Boolean),
          ExcludeLocalAddressRequired: Schema.optionalKey(Schema.Boolean),
          ExcludeForeignAddressRequired: Schema.optionalKey(Schema.Boolean),
          Beta: Schema.optionalKey(Schema.Boolean),
          NearNumber: Schema.optionalKey(Schema.String),
          NearLatLong: Schema.optionalKey(Schema.String),
          Distance: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          InPostalCode: Schema.optionalKey(Schema.String),
          InRegion: Schema.optionalKey(Schema.String),
          InRateCenter: Schema.optionalKey(Schema.String),
          InLata: Schema.optionalKey(Schema.String),
          InLocality: Schema.optionalKey(Schema.String),
          FaxEnabled: Schema.optionalKey(Schema.Boolean),
          PageSize: Schema.optionalKey(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMobileJson: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          CountryCode: Schema.String,
          AreaCode: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          Contains: Schema.optionalKey(Schema.String),
          SmsEnabled: Schema.optionalKey(Schema.Boolean),
          MmsEnabled: Schema.optionalKey(Schema.Boolean),
          VoiceEnabled: Schema.optionalKey(Schema.Boolean),
          ExcludeAllAddressRequired: Schema.optionalKey(Schema.Boolean),
          ExcludeLocalAddressRequired: Schema.optionalKey(Schema.Boolean),
          ExcludeForeignAddressRequired: Schema.optionalKey(Schema.Boolean),
          Beta: Schema.optionalKey(Schema.Boolean),
          NearNumber: Schema.optionalKey(Schema.String),
          NearLatLong: Schema.optionalKey(Schema.String),
          Distance: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          InPostalCode: Schema.optionalKey(Schema.String),
          InRegion: Schema.optionalKey(Schema.String),
          InRateCenter: Schema.optionalKey(Schema.String),
          InLata: Schema.optionalKey(Schema.String),
          InLocality: Schema.optionalKey(Schema.String),
          FaxEnabled: Schema.optionalKey(Schema.Boolean),
          PageSize: Schema.optionalKey(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
              ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMobileSchema,
            ),
          ),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeNationalJson: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          CountryCode: Schema.String,
          AreaCode: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          Contains: Schema.optionalKey(Schema.String),
          SmsEnabled: Schema.optionalKey(Schema.Boolean),
          MmsEnabled: Schema.optionalKey(Schema.Boolean),
          VoiceEnabled: Schema.optionalKey(Schema.Boolean),
          ExcludeAllAddressRequired: Schema.optionalKey(Schema.Boolean),
          ExcludeLocalAddressRequired: Schema.optionalKey(Schema.Boolean),
          ExcludeForeignAddressRequired: Schema.optionalKey(Schema.Boolean),
          Beta: Schema.optionalKey(Schema.Boolean),
          NearNumber: Schema.optionalKey(Schema.String),
          NearLatLong: Schema.optionalKey(Schema.String),
          Distance: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          InPostalCode: Schema.optionalKey(Schema.String),
          InRegion: Schema.optionalKey(Schema.String),
          InRateCenter: Schema.optionalKey(Schema.String),
          InLata: Schema.optionalKey(Schema.String),
          InLocality: Schema.optionalKey(Schema.String),
          FaxEnabled: Schema.optionalKey(Schema.Boolean),
          PageSize: Schema.optionalKey(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeSharedCostJson: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          CountryCode: Schema.String,
          AreaCode: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          Contains: Schema.optionalKey(Schema.String),
          SmsEnabled: Schema.optionalKey(Schema.Boolean),
          MmsEnabled: Schema.optionalKey(Schema.Boolean),
          VoiceEnabled: Schema.optionalKey(Schema.Boolean),
          ExcludeAllAddressRequired: Schema.optionalKey(Schema.Boolean),
          ExcludeLocalAddressRequired: Schema.optionalKey(Schema.Boolean),
          ExcludeForeignAddressRequired: Schema.optionalKey(Schema.Boolean),
          Beta: Schema.optionalKey(Schema.Boolean),
          NearNumber: Schema.optionalKey(Schema.String),
          NearLatLong: Schema.optionalKey(Schema.String),
          Distance: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          InPostalCode: Schema.optionalKey(Schema.String),
          InRegion: Schema.optionalKey(Schema.String),
          InRateCenter: Schema.optionalKey(Schema.String),
          InLata: Schema.optionalKey(Schema.String),
          InLocality: Schema.optionalKey(Schema.String),
          FaxEnabled: Schema.optionalKey(Schema.Boolean),
          PageSize: Schema.optionalKey(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeTollFreeJson: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          CountryCode: Schema.String,
          AreaCode: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          Contains: Schema.optionalKey(Schema.String),
          SmsEnabled: Schema.optionalKey(Schema.Boolean),
          MmsEnabled: Schema.optionalKey(Schema.Boolean),
          VoiceEnabled: Schema.optionalKey(Schema.Boolean),
          ExcludeAllAddressRequired: Schema.optionalKey(Schema.Boolean),
          ExcludeLocalAddressRequired: Schema.optionalKey(Schema.Boolean),
          ExcludeForeignAddressRequired: Schema.optionalKey(Schema.Boolean),
          Beta: Schema.optionalKey(Schema.Boolean),
          NearNumber: Schema.optionalKey(Schema.String),
          NearLatLong: Schema.optionalKey(Schema.String),
          Distance: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          InPostalCode: Schema.optionalKey(Schema.String),
          InRegion: Schema.optionalKey(Schema.String),
          InRateCenter: Schema.optionalKey(Schema.String),
          InLata: Schema.optionalKey(Schema.String),
          InLocality: Schema.optionalKey(Schema.String),
          FaxEnabled: Schema.optionalKey(Schema.Boolean),
          PageSize: Schema.optionalKey(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeVoipJson: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          CountryCode: Schema.String,
          AreaCode: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          Contains: Schema.optionalKey(Schema.String),
          SmsEnabled: Schema.optionalKey(Schema.Boolean),
          MmsEnabled: Schema.optionalKey(Schema.Boolean),
          VoiceEnabled: Schema.optionalKey(Schema.Boolean),
          ExcludeAllAddressRequired: Schema.optionalKey(Schema.Boolean),
          ExcludeLocalAddressRequired: Schema.optionalKey(Schema.Boolean),
          ExcludeForeignAddressRequired: Schema.optionalKey(Schema.Boolean),
          Beta: Schema.optionalKey(Schema.Boolean),
          NearNumber: Schema.optionalKey(Schema.String),
          NearLatLong: Schema.optionalKey(Schema.String),
          Distance: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          InPostalCode: Schema.optionalKey(Schema.String),
          InRegion: Schema.optionalKey(Schema.String),
          InRateCenter: Schema.optionalKey(Schema.String),
          InLata: Schema.optionalKey(Schema.String),
          InLocality: Schema.optionalKey(Schema.String),
          FaxEnabled: Schema.optionalKey(Schema.Boolean),
          PageSize: Schema.optionalKey(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidBalanceJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountBalanceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidCallsJson: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
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
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountCallSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidCallsSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountCallSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountCallSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidCallsSidJson: t.procedure
    .input(
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
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidCallsCallSidEventsJson: t.procedure
    .input(
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
          PageSize: Schema.optionalKey(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidCallsCallSidNotificationsSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountCallCallNotificationInstanceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidCallsCallSidNotificationsJson: t.procedure
    .input(
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
          Log: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
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
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
          notifications: Schema.optionalKey(
            Schema.Array(ApiV2010AccountCallCallNotificationSchema),
          ),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidCallsCallSidRecordingsJson: t.procedure
    .input(
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
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsCallSidRecordingsJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountCallCallRecordingSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidCallsCallSidRecordingsSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountCallCallRecordingSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsCallSidRecordingsSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountCallCallRecordingSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidCallsCallSidRecordingsSidJson: t.procedure
    .input(
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
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidConferencesSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountConferenceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidConferencesSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountConferenceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidConferencesJson: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
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
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidConferencesConferenceSidRecordingsJson: t.procedure
    .input(
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
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountConferenceConferenceRecordingSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountConferenceConferenceRecordingSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJson: t.procedure
    .input(
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
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidConnectAppsSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountConnectAppSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidConnectAppsSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountConnectAppSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidConnectAppsSidJson: t.procedure
    .input(
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
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidConnectAppsJson: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          PageSize: Schema.optionalKey(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidAddressesAddressSidDependentPhoneNumbersJson: t.procedure
    .input(
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
          PageSize: Schema.optionalKey(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidIncomingPhoneNumbersSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountIncomingPhoneNumberSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidIncomingPhoneNumbersSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountIncomingPhoneNumberSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidIncomingPhoneNumbersSidJson: t.procedure
    .input(
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
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidIncomingPhoneNumbersJson: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Beta: Schema.optionalKey(Schema.Boolean),
          FriendlyName: Schema.optionalKey(Schema.String),
          PhoneNumber: Schema.optionalKey(Schema.String),
          Origin: Schema.optionalKey(Schema.String),
          PageSize: Schema.optionalKey(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidIncomingPhoneNumbersJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountIncomingPhoneNumberSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJson: t.procedure
    .input(
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
    )
    .output(
      Schema.toStandardSchemaV1(
        ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema,
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJson: t.procedure
    .input(
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
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJson: t.procedure
    .input(
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
          PageSize: Schema.optionalKey(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJson: t.procedure
    .input(
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
    )
    .output(
      Schema.toStandardSchemaV1(
        ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema,
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsSidJson:
    t.procedure
      .input(
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
      )
      .output(
        Schema.toStandardSchemaV1(
          ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtensionSchema,
        ),
      )
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsJson:
    t.procedure
      .input(
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
            PageSize: Schema.optionalKey(
              Schema.Union([
                Schema.BigInt,
                Schema.Number.check(Schema.isInt()),
                Schema.String.check(Schema.isPattern(/^-?\d+$/)),
              ])
                .pipe(
                  Schema.decodeTo(
                    Schema.BigInt,
                    SchemaTransformation.transform({
                      decode: (input) => BigInt(input),
                      encode: (output) => output,
                    }),
                  ),
                )
                .check(
                  Schema.isBetweenBigInt({
                    minimum: -9223372036854775808n,
                    maximum: 9223372036854775807n,
                  }),
                  Schema.isGreaterThanOrEqualToBigInt(1n),
                  Schema.isLessThanOrEqualToBigInt(1000n),
                ),
            ),
            Page: Schema.optionalKey(
              Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
            ),
            PageToken: Schema.optionalKey(Schema.String),
          }),
        ),
      )
      .output(
        Schema.toStandardSchemaV1(
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
      )
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  get20100401AccountsAccountSidIncomingPhoneNumbersLocalJson: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Beta: Schema.optionalKey(Schema.Boolean),
          FriendlyName: Schema.optionalKey(Schema.String),
          PhoneNumber: Schema.optionalKey(Schema.String),
          Origin: Schema.optionalKey(Schema.String),
          PageSize: Schema.optionalKey(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidIncomingPhoneNumbersLocalJson: t.procedure
    .input(
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
    )
    .output(
      Schema.toStandardSchemaV1(ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocalSchema),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidIncomingPhoneNumbersMobileJson: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Beta: Schema.optionalKey(Schema.Boolean),
          FriendlyName: Schema.optionalKey(Schema.String),
          PhoneNumber: Schema.optionalKey(Schema.String),
          Origin: Schema.optionalKey(Schema.String),
          PageSize: Schema.optionalKey(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidIncomingPhoneNumbersMobileJson: t.procedure
    .input(
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
    )
    .output(
      Schema.toStandardSchemaV1(ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobileSchema),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJson: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Beta: Schema.optionalKey(Schema.Boolean),
          FriendlyName: Schema.optionalKey(Schema.String),
          PhoneNumber: Schema.optionalKey(Schema.String),
          Origin: Schema.optionalKey(Schema.String),
          PageSize: Schema.optionalKey(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJson: t.procedure
    .input(
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
    )
    .output(
      Schema.toStandardSchemaV1(
        ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFreeSchema,
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidKeysSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountKeySchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidKeysSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountKeySchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidKeysSidJson: t.procedure
    .input(
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
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidKeysJson: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          PageSize: Schema.optionalKey(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidKeysJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountNewKeySchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidMessagesMessageSidMediaSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountMessageMediaSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidMessagesMessageSidMediaSidJson: t.procedure
    .input(
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
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidMessagesMessageSidMediaJson: t.procedure
    .input(
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
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidQueuesQueueSidMembersCallSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountQueueMemberSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidQueuesQueueSidMembersCallSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountQueueMemberSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidQueuesQueueSidMembersJson: t.procedure
    .input(
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
          PageSize: Schema.optionalKey(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidMessagesJson: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
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
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidMessagesJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountMessageSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidMessagesSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountMessageSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidMessagesSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountMessageSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidMessagesSidJson: t.procedure
    .input(
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
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidMessagesMessageSidFeedbackJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountMessageMessageFeedbackSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSigningKeysJson: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          PageSize: Schema.optionalKey(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSigningKeysJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountNewSigningKeySchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidNotificationsSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountNotificationInstanceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidNotificationsJson: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Log: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
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
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidOutgoingCallerIdsSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountOutgoingCallerIdSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidOutgoingCallerIdsSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountOutgoingCallerIdSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidOutgoingCallerIdsSidJson: t.procedure
    .input(
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
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidOutgoingCallerIdsJson: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          PhoneNumber: Schema.optionalKey(Schema.String),
          FriendlyName: Schema.optionalKey(Schema.String),
          PageSize: Schema.optionalKey(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
          outgoing_caller_ids: Schema.optionalKey(
            Schema.Array(ApiV2010AccountOutgoingCallerIdSchema),
          ),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidOutgoingCallerIdsJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountValidationRequestSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountConferenceParticipantSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountConferenceParticipantSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJson: t.procedure
    .input(
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
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidConferencesConferenceSidParticipantsJson: t.procedure
    .input(
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
          Muted: Schema.optionalKey(Schema.Boolean),
          Hold: Schema.optionalKey(Schema.Boolean),
          Coaching: Schema.optionalKey(Schema.Boolean),
          PageSize: Schema.optionalKey(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
          participants: Schema.optionalKey(
            Schema.Array(ApiV2010AccountConferenceParticipantSchema),
          ),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidConferencesConferenceSidParticipantsJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountConferenceParticipantSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsCallSidPaymentsJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountCallPaymentsSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsCallSidPaymentsSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountCallPaymentsSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidQueuesSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountQueueSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidQueuesSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountQueueSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidQueuesSidJson: t.procedure
    .input(
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
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidQueuesJson: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          PageSize: Schema.optionalKey(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidQueuesJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountQueueSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsCallSidTranscriptionsJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountCallRealtimeTranscriptionSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsCallSidTranscriptionsSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountCallRealtimeTranscriptionSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidRecordingsSidJson: t.procedure
    .input(
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
          IncludeSoftDeleted: Schema.optionalKey(Schema.Boolean),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountRecordingSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidRecordingsSidJson: t.procedure
    .input(
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
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidRecordingsJson: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
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
          IncludeSoftDeleted: Schema.optionalKey(Schema.Boolean),
          PageSize: Schema.optionalKey(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountRecordingRecordingAddOnResultSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJson: t.procedure
    .input(
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
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsJson: t.procedure
    .input(
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
          PageSize: Schema.optionalKey(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJson:
    t.procedure
      .input(
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
      )
      .output(
        Schema.toStandardSchemaV1(
          ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadSchema,
        ),
      )
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  delete20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJson:
    t.procedure
      .input(
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
      )
      .mutation(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsJson:
    t.procedure
      .input(
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
            PageSize: Schema.optionalKey(
              Schema.Union([
                Schema.BigInt,
                Schema.Number.check(Schema.isInt()),
                Schema.String.check(Schema.isPattern(/^-?\d+$/)),
              ])
                .pipe(
                  Schema.decodeTo(
                    Schema.BigInt,
                    SchemaTransformation.transform({
                      decode: (input) => BigInt(input),
                      encode: (output) => output,
                    }),
                  ),
                )
                .check(
                  Schema.isBetweenBigInt({
                    minimum: -9223372036854775808n,
                    maximum: 9223372036854775807n,
                  }),
                  Schema.isGreaterThanOrEqualToBigInt(1n),
                  Schema.isLessThanOrEqualToBigInt(1000n),
                ),
            ),
            Page: Schema.optionalKey(
              Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
            ),
            PageToken: Schema.optionalKey(Schema.String),
          }),
        ),
      )
      .output(
        Schema.toStandardSchemaV1(
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
      )
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsPayloadSidDataJson:
    t.procedure
      .input(
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
      )
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  get20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountRecordingRecordingTranscriptionSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJson: t.procedure
    .input(
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
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsJson: t.procedure
    .input(
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
          PageSize: Schema.optionalKey(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSMSShortCodesSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountShortCodeSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSMSShortCodesSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountShortCodeSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSMSShortCodesJson: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          FriendlyName: Schema.optionalKey(Schema.String),
          ShortCode: Schema.optionalKey(Schema.String),
          PageSize: Schema.optionalKey(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSigningKeysSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountSigningKeySchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSigningKeysSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountSigningKeySchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidSigningKeysSidJson: t.procedure
    .input(
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
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJson: t.procedure
    .input(
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
          PageSize: Schema.optionalKey(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJson: t.procedure
    .input(
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
    )
    .output(
      Schema.toStandardSchemaV1(
        ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema,
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJson:
    t.procedure
      .input(
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
      )
      .output(
        Schema.toStandardSchemaV1(
          ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema,
        ),
      )
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  delete20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJson:
    t.procedure
      .input(
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
      )
      .mutation(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJson:
    t.procedure
      .input(
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
            PageSize: Schema.optionalKey(
              Schema.Union([
                Schema.BigInt,
                Schema.Number.check(Schema.isInt()),
                Schema.String.check(Schema.isPattern(/^-?\d+$/)),
              ])
                .pipe(
                  Schema.decodeTo(
                    Schema.BigInt,
                    SchemaTransformation.transform({
                      decode: (input) => BigInt(input),
                      encode: (output) => output,
                    }),
                  ),
                )
                .check(
                  Schema.isBetweenBigInt({
                    minimum: -9223372036854775808n,
                    maximum: 9223372036854775807n,
                  }),
                  Schema.isGreaterThanOrEqualToBigInt(1n),
                  Schema.isLessThanOrEqualToBigInt(1000n),
                ),
            ),
            Page: Schema.optionalKey(
              Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
            ),
            PageToken: Schema.optionalKey(Schema.String),
          }),
        ),
      )
      .output(
        Schema.toStandardSchemaV1(
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
      )
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  post20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJson:
    t.procedure
      .input(
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
      )
      .output(
        Schema.toStandardSchemaV1(
          ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema,
        ),
      )
      .mutation(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJson:
    t.procedure
      .input(
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
      )
      .output(
        Schema.toStandardSchemaV1(
          ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema,
        ),
      )
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  delete20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJson:
    t.procedure
      .input(
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
      )
      .mutation(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  get20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJson:
    t.procedure
      .input(
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
            PageSize: Schema.optionalKey(
              Schema.Union([
                Schema.BigInt,
                Schema.Number.check(Schema.isInt()),
                Schema.String.check(Schema.isPattern(/^-?\d+$/)),
              ])
                .pipe(
                  Schema.decodeTo(
                    Schema.BigInt,
                    SchemaTransformation.transform({
                      decode: (input) => BigInt(input),
                      encode: (output) => output,
                    }),
                  ),
                )
                .check(
                  Schema.isBetweenBigInt({
                    minimum: -9223372036854775808n,
                    maximum: 9223372036854775807n,
                  }),
                  Schema.isGreaterThanOrEqualToBigInt(1n),
                  Schema.isLessThanOrEqualToBigInt(1000n),
                ),
            ),
            Page: Schema.optionalKey(
              Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
            ),
            PageToken: Schema.optionalKey(Schema.String),
          }),
        ),
      )
      .output(
        Schema.toStandardSchemaV1(
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
      )
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  post20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJson:
    t.procedure
      .input(
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
      )
      .output(
        Schema.toStandardSchemaV1(
          ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema,
        ),
      )
      .mutation(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  get20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJson:
    t.procedure
      .input(
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
      )
      .output(
        Schema.toStandardSchemaV1(
          ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema,
        ),
      )
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  delete20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJson:
    t.procedure
      .input(
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
      )
      .mutation(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  get20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJson: t.procedure
    .input(
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
          PageSize: Schema.optionalKey(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountSipSipCredentialListSipCredentialSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountSipSipCredentialListSipCredentialSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountSipSipCredentialListSipCredentialSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJson: t.procedure
    .input(
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
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPCredentialListsJson: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          PageSize: Schema.optionalKey(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
          credential_lists: Schema.optionalKey(
            Schema.Array(ApiV2010AccountSipSipCredentialListSchema),
          ),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSIPCredentialListsJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountSipSipCredentialListSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPCredentialListsSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountSipSipCredentialListSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSIPCredentialListsSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountSipSipCredentialListSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidSIPCredentialListsSidJson: t.procedure
    .input(
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
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJson: t.procedure
    .input(
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
          PageSize: Schema.optionalKey(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountSipSipDomainSipCredentialListMappingSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountSipSipDomainSipCredentialListMappingSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJson: t.procedure
    .input(
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
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPDomainsJson: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          PageSize: Schema.optionalKey(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSIPDomainsJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountSipSipDomainSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPDomainsSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountSipSipDomainSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSIPDomainsSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountSipSipDomainSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidSIPDomainsSidJson: t.procedure
    .input(
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
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPIpAccessControlListsJson: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          PageSize: Schema.optionalKey(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSIPIpAccessControlListsJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountSipSipIpAccessControlListSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPIpAccessControlListsSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountSipSipIpAccessControlListSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSIPIpAccessControlListsSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountSipSipIpAccessControlListSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidSIPIpAccessControlListsSidJson: t.procedure
    .input(
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
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJson: t.procedure
    .input(
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
    )
    .output(
      Schema.toStandardSchemaV1(ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJson: t.procedure
    .input(
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
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJson: t.procedure
    .input(
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
          PageSize: Schema.optionalKey(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJson: t.procedure
    .input(
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
    )
    .output(
      Schema.toStandardSchemaV1(ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJson:
    t.procedure
      .input(
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
            PageSize: Schema.optionalKey(
              Schema.Union([
                Schema.BigInt,
                Schema.Number.check(Schema.isInt()),
                Schema.String.check(Schema.isPattern(/^-?\d+$/)),
              ])
                .pipe(
                  Schema.decodeTo(
                    Schema.BigInt,
                    SchemaTransformation.transform({
                      decode: (input) => BigInt(input),
                      encode: (output) => output,
                    }),
                  ),
                )
                .check(
                  Schema.isBetweenBigInt({
                    minimum: -9223372036854775808n,
                    maximum: 9223372036854775807n,
                  }),
                  Schema.isGreaterThanOrEqualToBigInt(1n),
                  Schema.isLessThanOrEqualToBigInt(1000n),
                ),
            ),
            Page: Schema.optionalKey(
              Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
            ),
            PageToken: Schema.optionalKey(Schema.String),
          }),
        ),
      )
      .output(
        Schema.toStandardSchemaV1(
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
      )
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  post20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJson:
    t.procedure
      .input(
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
      )
      .output(Schema.toStandardSchemaV1(ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema))
      .mutation(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  get20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJson:
    t.procedure
      .input(
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
      )
      .output(Schema.toStandardSchemaV1(ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema))
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  post20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJson:
    t.procedure
      .input(
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
      )
      .output(Schema.toStandardSchemaV1(ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema))
      .mutation(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  delete20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJson:
    t.procedure
      .input(
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
      )
      .mutation(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  post20100401AccountsAccountSidCallsCallSidSiprecJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountCallSiprecSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsCallSidSiprecSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountCallSiprecSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsCallSidStreamsJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountCallStreamSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsCallSidStreamsSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountCallStreamSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidTokensJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountTokenSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidTranscriptionsSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountTranscriptionSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidTranscriptionsSidJson: t.procedure
    .input(
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
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidTranscriptionsJson: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          PageSize: Schema.optionalKey(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidUsageRecordsJson: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
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
          IncludeSubaccounts: Schema.optionalKey(Schema.Boolean),
          PageSize: Schema.optionalKey(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidUsageRecordsAllTimeJson: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
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
          IncludeSubaccounts: Schema.optionalKey(Schema.Boolean),
          PageSize: Schema.optionalKey(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidUsageRecordsDailyJson: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
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
          IncludeSubaccounts: Schema.optionalKey(Schema.Boolean),
          PageSize: Schema.optionalKey(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidUsageRecordsLastMonthJson: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
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
          IncludeSubaccounts: Schema.optionalKey(Schema.Boolean),
          PageSize: Schema.optionalKey(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidUsageRecordsMonthlyJson: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
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
          IncludeSubaccounts: Schema.optionalKey(Schema.Boolean),
          PageSize: Schema.optionalKey(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidUsageRecordsThisMonthJson: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
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
          IncludeSubaccounts: Schema.optionalKey(Schema.Boolean),
          PageSize: Schema.optionalKey(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidUsageRecordsTodayJson: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
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
          IncludeSubaccounts: Schema.optionalKey(Schema.Boolean),
          PageSize: Schema.optionalKey(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidUsageRecordsYearlyJson: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
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
          IncludeSubaccounts: Schema.optionalKey(Schema.Boolean),
          PageSize: Schema.optionalKey(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidUsageRecordsYesterdayJson: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
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
          IncludeSubaccounts: Schema.optionalKey(Schema.Boolean),
          PageSize: Schema.optionalKey(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidUsageTriggersSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountUsageUsageTriggerSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidUsageTriggersSidJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountUsageUsageTriggerSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidUsageTriggersSidJson: t.procedure
    .input(
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
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  get20100401AccountsAccountSidUsageTriggersJson: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          AccountSid: Schema.String.check(
            Schema.isPattern(/^AC[0-9a-fA-F]{32}$/),
            Schema.makeFilter((input) => [...input].length === 34, {
              expected: 'a string of 34 characters',
            }),
          ),
          Recurring: Schema.optionalKey(UsageTriggerEnumRecurringSchema),
          TriggerBy: Schema.optionalKey(UsageTriggerEnumTriggerFieldSchema),
          UsageCategory: Schema.optionalKey(Schema.String),
          PageSize: Schema.optionalKey(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(1n),
                Schema.isLessThanOrEqualToBigInt(1000n),
              ),
          ),
          Page: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          PageToken: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidUsageTriggersJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountUsageUsageTriggerSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsCallSidUserDefinedMessagesJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountCallUserDefinedMessageSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  post20100401AccountsAccountSidCallsCallSidUserDefinedMessageSubscriptionsJson: t.procedure
    .input(
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
    )
    .output(Schema.toStandardSchemaV1(ApiV2010AccountCallUserDefinedMessageSubscriptionSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  delete20100401AccountsAccountSidCallsCallSidUserDefinedMessageSubscriptionsSidJson: t.procedure
    .input(
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
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
