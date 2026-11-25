import { initTRPC, TRPCError } from '@trpc/server'
import { Schema } from 'effect'
import {
  AccountLinkSchema,
  AccountSchema,
  AccountSessionSchema,
  ApplePayDomainSchema,
  ApplicationFeeSchema,
  AppsInstallSchema,
  AppsSecretSchema,
  BalanceSchema,
  BalanceSettingsSchema,
  BalanceTransactionSchema,
  BankAccountSchema,
  BillingAlertSchema,
  BillingCreditBalanceSummarySchema,
  BillingCreditBalanceTransactionSchema,
  BillingCreditGrantSchema,
  BillingFeedbackOptionSchema,
  BillingMeterEventAdjustmentSchema,
  BillingMeterEventSchema,
  BillingMeterEventSummarySchema,
  BillingMeterSchema,
  BillingPortalConfigurationSchema,
  BillingPortalSessionSchema,
  CapabilitySchema,
  CardSchema,
  CashBalanceSchema,
  ChargeSchema,
  CheckoutSessionSchema,
  ClimateOrderSchema,
  ClimateProductSchema,
  ClimateSupplierSchema,
  ConfirmationTokenSchema,
  CountrySpecSchema,
  CouponSchema,
  CreditNoteLineItemSchema,
  CreditNoteSchema,
  CustomerBalanceTransactionSchema,
  CustomerCashBalanceTransactionSchema,
  CustomerSchema,
  CustomerSessionSchema,
  DeletedAccountSchema,
  DeletedApplePayDomainSchema,
  DeletedCouponSchema,
  DeletedCustomerSchema,
  DeletedDiscountSchema,
  DeletedExternalAccountSchema,
  DeletedInvoiceSchema,
  DeletedInvoiceitemSchema,
  DeletedPaymentSourceSchema,
  DeletedPersonSchema,
  DeletedPlanSchema,
  DeletedProductFeatureSchema,
  DeletedProductSchema,
  DeletedRadarValueListItemSchema,
  DeletedRadarValueListSchema,
  DeletedSubscriptionItemSchema,
  DeletedTaxIdSchema,
  DeletedTerminalConfigurationSchema,
  DeletedTerminalLocationSchema,
  DeletedTerminalReaderSchema,
  DeletedTestHelpersTestClockSchema,
  DeletedWebhookEndpointSchema,
  DiscountSchema,
  DisputeSchema,
  EntitlementsActiveEntitlementSchema,
  EntitlementsFeatureSchema,
  EphemeralKeySchema,
  EventSchema,
  ExchangeRateSchema,
  ExternalAccountSchema,
  FeeRefundSchema,
  FileLinkSchema,
  FileSchema,
  FinancialConnectionsAccountOwnerSchema,
  FinancialConnectionsAccountSchema,
  FinancialConnectionsSessionSchema,
  FinancialConnectionsTransactionSchema,
  ForwardingRequestSchema,
  FundingInstructionsSchema,
  IdentityVerificationReportSchema,
  IdentityVerificationSessionSchema,
  InvoicePaymentSchema,
  InvoiceRenderingTemplateSchema,
  InvoiceSchema,
  InvoiceitemSchema,
  IssuingAuthorizationSchema,
  IssuingCardSchema,
  IssuingCardholderSchema,
  IssuingDisputeSchema,
  IssuingPersonalizationDesignSchema,
  IssuingPhysicalBundleSchema,
  IssuingSettlementSchema,
  IssuingTokenSchema,
  IssuingTransactionSchema,
  ItemSchema,
  LineItemSchema,
  LoginLinkSchema,
  MandateSchema,
  PaymentAttemptRecordSchema,
  PaymentIntentAmountDetailsLineItemSchema,
  PaymentIntentSchema,
  PaymentLinkSchema,
  PaymentMethodConfigurationSchema,
  PaymentMethodDomainSchema,
  PaymentMethodSchema,
  PaymentRecordSchema,
  PaymentSourceSchema,
  PayoutSchema,
  PersonSchema,
  PlanSchema,
  PriceSchema,
  ProductCatalogTrialOfferSchema,
  ProductFeatureSchema,
  ProductSchema,
  PromotionCodeSchema,
  QuoteSchema,
  RadarEarlyFraudWarningSchema,
  RadarPaymentEvaluationSchema,
  RadarValueListItemSchema,
  RadarValueListSchema,
  RefundSchema,
  ReportingReportRunSchema,
  ReportingReportTypeSchema,
  ReviewSchema,
  ScheduledQueryRunSchema,
  SetupAttemptSchema,
  SetupIntentSchema,
  ShippingRateSchema,
  SigmaSigmaApiQuerySchema,
  SourceMandateNotificationSchema,
  SourceSchema,
  SourceTransactionSchema,
  SubscriptionItemSchema,
  SubscriptionScheduleSchema,
  SubscriptionSchema,
  TaxAssociationSchema,
  TaxCalculationLineItemSchema,
  TaxCalculationSchema,
  TaxCodeSchema,
  TaxIdSchema,
  TaxLocationSchema,
  TaxRateSchema,
  TaxRegistrationSchema,
  TaxSettingsSchema,
  TaxTransactionLineItemSchema,
  TaxTransactionSchema,
  TerminalConfigurationSchema,
  TerminalConnectionTokenSchema,
  TerminalLocationSchema,
  TerminalOnboardingLinkSchema,
  TerminalReaderSchema,
  TerminalRefundSchema,
  TestHelpersTestClockSchema,
  ThreeDSecureAuthenticationSchema,
  TokenSchema,
  TopupSchema,
  TransferReversalSchema,
  TransferSchema,
  TreasuryCreditReversalSchema,
  TreasuryDebitReversalSchema,
  TreasuryFinancialAccountFeaturesSchema,
  TreasuryFinancialAccountSchema,
  TreasuryInboundTransferSchema,
  TreasuryOutboundPaymentSchema,
  TreasuryOutboundTransferSchema,
  TreasuryReceivedCreditSchema,
  TreasuryReceivedDebitSchema,
  TreasuryTransactionEntrySchema,
  TreasuryTransactionSchema,
  WebhookEndpointSchema,
} from '../components'

const t = initTRPC.create()

export const v1Router = t.router({
  getV1Account: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(AccountSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountLinks: t.procedure
    .output(Schema.toStandardSchemaV1(AccountLinkSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountSessions: t.procedure
    .output(Schema.toStandardSchemaV1(AccountSessionSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Accounts: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          ending_before: Schema.optionalKey(Schema.String),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(AccountSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/accounts/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Accounts: t.procedure.output(Schema.toStandardSchemaV1(AccountSchema)).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1AccountsAccount: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          account: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(AccountSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccount: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          account: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(AccountSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1AccountsAccount: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          account: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(DeletedAccountSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccountBankAccounts: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          account: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ExternalAccountSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1AccountsAccountBankAccountsId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          account: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          id: Schema.String,
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ExternalAccountSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccountBankAccountsId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          account: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          id: Schema.String,
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ExternalAccountSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1AccountsAccountBankAccountsId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          account: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          id: Schema.String,
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(DeletedExternalAccountSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1AccountsAccountCapabilities: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          account: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(CapabilitySchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1AccountsAccountCapabilitiesCapability: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          account: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          capability: Schema.String,
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(CapabilitySchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccountCapabilitiesCapability: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          account: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          capability: Schema.String,
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(CapabilitySchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1AccountsAccountExternalAccounts: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          account: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          ending_before: Schema.optionalKey(Schema.String),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          object: Schema.optionalKey(Schema.Literals(['bank_account', 'card'])),
          starting_after: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(Schema.Union([BankAccountSchema, CardSchema])).annotate({
            description:
              'The list contains all external accounts that have been attached to the Stripe account. These may be bank accounts or cards.',
          }),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccountExternalAccounts: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          account: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ExternalAccountSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1AccountsAccountExternalAccountsId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          account: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          id: Schema.String,
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ExternalAccountSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccountExternalAccountsId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          account: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          id: Schema.String,
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ExternalAccountSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1AccountsAccountExternalAccountsId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          account: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          id: Schema.String,
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(DeletedExternalAccountSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccountLoginLinks: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          account: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(LoginLinkSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1AccountsAccountPeople: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          account: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          relationship: Schema.optionalKey(
            Schema.Struct({
              authorizer: Schema.optionalKey(Schema.Boolean),
              director: Schema.optionalKey(Schema.Boolean),
              executive: Schema.optionalKey(Schema.Boolean),
              legal_guardian: Schema.optionalKey(Schema.Boolean),
              owner: Schema.optionalKey(Schema.Boolean),
              representative: Schema.optionalKey(Schema.Boolean),
            }),
          ),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(PersonSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccountPeople: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          account: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PersonSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1AccountsAccountPeoplePerson: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          account: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          person: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PersonSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccountPeoplePerson: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          account: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          person: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PersonSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1AccountsAccountPeoplePerson: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          account: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          person: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(DeletedPersonSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1AccountsAccountPersons: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          account: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          relationship: Schema.optionalKey(
            Schema.Struct({
              authorizer: Schema.optionalKey(Schema.Boolean),
              director: Schema.optionalKey(Schema.Boolean),
              executive: Schema.optionalKey(Schema.Boolean),
              legal_guardian: Schema.optionalKey(Schema.Boolean),
              owner: Schema.optionalKey(Schema.Boolean),
              representative: Schema.optionalKey(Schema.Boolean),
            }),
          ),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(PersonSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccountPersons: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          account: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PersonSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1AccountsAccountPersonsPerson: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          account: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          person: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PersonSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccountPersonsPerson: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          account: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          person: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PersonSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1AccountsAccountPersonsPerson: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          account: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          person: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(DeletedPersonSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccountReject: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          account: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(AccountSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccountUnreject: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          account: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(AccountSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ApplePayDomains: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          domain_name: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(ApplePayDomainSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/apple_pay\/domains/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ApplePayDomains: t.procedure
    .output(Schema.toStandardSchemaV1(ApplePayDomainSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ApplePayDomainsDomain: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          domain: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ApplePayDomainSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1ApplePayDomainsDomain: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          domain: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(DeletedApplePayDomainSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ApplicationFees: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          charge: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(ApplicationFeeSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/application_fees/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ApplicationFeesFeeRefundsId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          fee: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(FeeRefundSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ApplicationFeesFeeRefundsId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          fee: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(FeeRefundSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ApplicationFeesId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ApplicationFeeSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ApplicationFeesIdRefund: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ApplicationFeeSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ApplicationFeesIdRefunds: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(FeeRefundSchema).annotate({
            description: 'Details about each object.',
          }),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ApplicationFeesIdRefunds: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(FeeRefundSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1AppsInstalls: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          account: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          app: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          approval_required: Schema.optionalKey(Schema.Boolean),
          channel: Schema.optionalKey(
            Schema.Literals(['private_live', 'private_test', 'public', 'testing']),
          ),
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          created_by: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          status: Schema.optionalKey(
            Schema.Literals([
              'install_failed',
              'installed',
              'installing',
              'uninstall_failed',
              'uninstalling',
            ]),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(AppsInstallSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/apps\/installs/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AppsInstalls: t.procedure
    .output(Schema.toStandardSchemaV1(AppsInstallSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1AppsInstallsId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(AppsInstallSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AppsInstallsId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(AppsInstallSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AppsInstallsIdUninstall: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(AppsInstallSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1AppsSecrets: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          scope: Schema.Struct({
            type: Schema.Literals(['account', 'user']),
            user: Schema.optionalKey(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          }),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(AppsSecretSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/apps\/secrets/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AppsSecrets: t.procedure
    .output(Schema.toStandardSchemaV1(AppsSecretSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AppsSecretsDelete: t.procedure
    .output(Schema.toStandardSchemaV1(AppsSecretSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1AppsSecretsFind: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          name: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          scope: Schema.Struct({
            type: Schema.Literals(['account', 'user']),
            user: Schema.optionalKey(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(AppsSecretSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Balance: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(BalanceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BalanceHistory: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          currency: Schema.optionalKey(Schema.String),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          payout: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          source: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          type: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(BalanceTransactionSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/balance_transactions/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BalanceHistoryId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(BalanceTransactionSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BalanceSettings: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(BalanceSettingsSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BalanceSettings: t.procedure
    .output(Schema.toStandardSchemaV1(BalanceSettingsSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BalanceTransactions: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          currency: Schema.optionalKey(Schema.String),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          payout: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          source: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          type: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(BalanceTransactionSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/balance_transactions/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BalanceTransactionsId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(BalanceTransactionSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BillingAlerts: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          alert_type: Schema.optionalKey(Schema.Literal('usage_threshold')),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          meter: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(BillingAlertSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/billing\/alerts/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingAlerts: t.procedure
    .output(Schema.toStandardSchemaV1(BillingAlertSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BillingAlertsId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(BillingAlertSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingAlertsIdActivate: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(BillingAlertSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingAlertsIdArchive: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(BillingAlertSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingAlertsIdDeactivate: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(BillingAlertSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BillingCreditBalanceSummary: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          customer: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          customer_account: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          filter: Schema.Struct({
            applicability_scope: Schema.optionalKey(
              Schema.Struct({
                price_type: Schema.optionalKey(Schema.Literal('metered')),
                prices: Schema.optionalKey(
                  Schema.Array(
                    Schema.Struct({
                      id: Schema.String.check(
                        Schema.makeFilter((input) => [...input].length <= 5000, {
                          expected: 'a string of at most 5000 characters',
                        }),
                      ),
                    }),
                  ),
                ),
              }),
            ),
            credit_grant: Schema.optionalKey(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
            type: Schema.Literals(['applicability_scope', 'credit_grant']),
          }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(BillingCreditBalanceSummarySchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BillingCreditBalanceTransactions: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          credit_grant: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          customer: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          customer_account: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(BillingCreditBalanceTransactionSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/billing\/credit_grants/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BillingCreditBalanceTransactionsId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(BillingCreditBalanceTransactionSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BillingCreditGrants: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          customer: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          customer_account: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(BillingCreditGrantSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/billing\/credit_grants/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingCreditGrants: t.procedure
    .output(Schema.toStandardSchemaV1(BillingCreditGrantSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BillingCreditGrantsId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(BillingCreditGrantSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingCreditGrantsId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(BillingCreditGrantSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingCreditGrantsIdExpire: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(BillingCreditGrantSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingCreditGrantsIdVoid: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(BillingCreditGrantSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BillingFeedbackOptions: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          status: Schema.optionalKey(Schema.Literals(['active', 'inactive'])),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(BillingFeedbackOptionSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: 'Resource for the List Endpoint of Feedback Option.' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingFeedbackOptions: t.procedure
    .output(Schema.toStandardSchemaV1(BillingFeedbackOptionSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BillingFeedbackOptionsId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(BillingFeedbackOptionSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingFeedbackOptionsId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(BillingFeedbackOptionSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingFeedbackOptionsIdDeactivate: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(BillingFeedbackOptionSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingMeterEventAdjustments: t.procedure
    .output(Schema.toStandardSchemaV1(BillingMeterEventAdjustmentSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingMeterEvents: t.procedure
    .output(Schema.toStandardSchemaV1(BillingMeterEventSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BillingMeters: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          status: Schema.optionalKey(Schema.Literals(['active', 'inactive'])),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(BillingMeterSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/billing\/meters/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingMeters: t.procedure
    .output(Schema.toStandardSchemaV1(BillingMeterSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BillingMetersId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(BillingMeterSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingMetersId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(BillingMeterSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingMetersIdDeactivate: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(BillingMeterSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BillingMetersIdEventSummaries: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          customer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          end_time: Schema.Number.check(Schema.isInt()),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          start_time: Schema.Number.check(Schema.isInt()),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          value_grouping_window: Schema.optionalKey(Schema.Literals(['day', 'hour'])),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(BillingMeterEventSummarySchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/billing\/meters\/[^\/]+\/event_summaries/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingMetersIdReactivate: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(BillingMeterSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BillingPortalConfigurations: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          active: Schema.optionalKey(Schema.Boolean),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          is_default: Schema.optionalKey(Schema.Boolean),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(BillingPortalConfigurationSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/billing_portal\/configurations/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingPortalConfigurations: t.procedure
    .output(Schema.toStandardSchemaV1(BillingPortalConfigurationSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BillingPortalConfigurationsConfiguration: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          configuration: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(BillingPortalConfigurationSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingPortalConfigurationsConfiguration: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          configuration: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(BillingPortalConfigurationSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingPortalSessions: t.procedure
    .output(Schema.toStandardSchemaV1(BillingPortalSessionSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Charges: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          customer: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          ending_before: Schema.optionalKey(Schema.String),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          payment_intent: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          starting_after: Schema.optionalKey(Schema.String),
          transfer_group: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(ChargeSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/charges/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Charges: t.procedure.output(Schema.toStandardSchemaV1(ChargeSchema)).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1ChargesSearch: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          page: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          query: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(ChargeSchema),
          has_more: Schema.Boolean,
          next_page: Schema.optionalKey(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          object: Schema.Literal('search_result').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value.",
          }),
          total_count: Schema.optionalKey(
            Schema.Number.check(Schema.isInt()).annotate({
              description:
                'The total number of objects that match the query, only accurate up to 10,000.',
            }),
          ),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ChargesCharge: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          charge: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ChargeSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ChargesCharge: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          charge: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ChargeSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ChargesChargeCapture: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          charge: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ChargeSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ChargesChargeDispute: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          charge: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(DisputeSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ChargesChargeDispute: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          charge: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(DisputeSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ChargesChargeDisputeClose: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          charge: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(DisputeSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ChargesChargeRefund: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          charge: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ChargeSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ChargesChargeRefunds: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          charge: Schema.String,
          ending_before: Schema.optionalKey(Schema.String),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(RefundSchema).annotate({ description: 'Details about each object.' }),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ChargesChargeRefunds: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          charge: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(RefundSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ChargesChargeRefundsRefund: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          charge: Schema.String,
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          refund: Schema.String,
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(RefundSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ChargesChargeRefundsRefund: t.procedure
    .input(
      Schema.toStandardSchemaV1(Schema.Struct({ charge: Schema.String, refund: Schema.String })),
    )
    .output(Schema.toStandardSchemaV1(RefundSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CheckoutSessions: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          customer: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          customer_account: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          customer_details: Schema.optionalKey(Schema.Struct({ email: Schema.String })),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          payment_intent: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          payment_link: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          status: Schema.optionalKey(Schema.Literals(['complete', 'expired', 'open'])),
          subscription: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(CheckoutSessionSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CheckoutSessions: t.procedure
    .output(Schema.toStandardSchemaV1(CheckoutSessionSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CheckoutSessionsSession: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          session: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 66, {
              expected: 'a string of at most 66 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(CheckoutSessionSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CheckoutSessionsSession: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          session: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(CheckoutSessionSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CheckoutSessionsSessionExpire: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          session: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(CheckoutSessionSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CheckoutSessionsSessionLineItems: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          session: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(ItemSchema).annotate({ description: 'Details about each object.' }),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ClimateOrders: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(ClimateOrderSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/climate\/orders/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ClimateOrders: t.procedure
    .output(Schema.toStandardSchemaV1(ClimateOrderSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ClimateOrdersOrder: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          order: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ClimateOrderSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ClimateOrdersOrder: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          order: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ClimateOrderSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ClimateOrdersOrderCancel: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          order: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ClimateOrderSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ClimateProducts: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(ClimateProductSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/climate\/products/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ClimateProductsProduct: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          product: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ClimateProductSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ClimateSuppliers: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(ClimateSupplierSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/climate\/suppliers/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ClimateSuppliersSupplier: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          supplier: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ClimateSupplierSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ConfirmationTokensConfirmationToken: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          confirmation_token: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ConfirmationTokenSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CountrySpecs: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(CountrySpecSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/country_specs/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CountrySpecsCountry: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          country: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(CountrySpecSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Coupons: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(CouponSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/coupons/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Coupons: t.procedure.output(Schema.toStandardSchemaV1(CouponSchema)).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1CouponsCoupon: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          coupon: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(CouponSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CouponsCoupon: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          coupon: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(CouponSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1CouponsCoupon: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          coupon: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(DeletedCouponSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CreditNotes: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          customer: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          customer_account: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          invoice: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(CreditNoteSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CreditNotes: t.procedure
    .output(Schema.toStandardSchemaV1(CreditNoteSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CreditNotesPreview: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          amount: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          credit_amount: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          effective_at: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          email_type: Schema.optionalKey(Schema.Literals(['credit_note', 'none'])),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          invoice: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          lines: Schema.optionalKey(
            Schema.Array(
              Schema.Struct({
                amount: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                description: Schema.optionalKey(
                  Schema.String.check(
                    Schema.makeFilter((input) => [...input].length <= 5000, {
                      expected: 'a string of at most 5000 characters',
                    }),
                  ),
                ),
                invoice_line_item: Schema.optionalKey(
                  Schema.String.check(
                    Schema.makeFilter((input) => [...input].length <= 5000, {
                      expected: 'a string of at most 5000 characters',
                    }),
                  ),
                ),
                metadata: Schema.optionalKey(Schema.Record(Schema.String, Schema.String)),
                quantity: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                tax_amounts: Schema.optionalKey(
                  Schema.Union([
                    Schema.Array(
                      Schema.Struct({
                        amount: Schema.Number.check(Schema.isInt()),
                        tax_rate: Schema.String.check(
                          Schema.makeFilter((input) => [...input].length <= 5000, {
                            expected: 'a string of at most 5000 characters',
                          }),
                        ),
                        taxable_amount: Schema.Number.check(Schema.isInt()),
                      }),
                    ),
                    Schema.Literal(''),
                  ]),
                ),
                tax_rates: Schema.optionalKey(
                  Schema.Union([
                    Schema.Array(
                      Schema.String.check(
                        Schema.makeFilter((input) => [...input].length <= 5000, {
                          expected: 'a string of at most 5000 characters',
                        }),
                      ),
                    ),
                    Schema.Literal(''),
                  ]),
                ),
                type: Schema.Literals(['custom_line_item', 'invoice_line_item']),
                unit_amount: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                unit_amount_decimal: Schema.optionalKey(Schema.String),
              }),
            ),
          ),
          memo: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          metadata: Schema.optionalKey(Schema.Record(Schema.String, Schema.String)),
          out_of_band_amount: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          reason: Schema.optionalKey(
            Schema.Literals(['duplicate', 'fraudulent', 'order_change', 'product_unsatisfactory']),
          ),
          refund_amount: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          refunds: Schema.optionalKey(
            Schema.Array(
              Schema.Struct({
                amount_refunded: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                payment_record_refund: Schema.optionalKey(
                  Schema.Struct({
                    payment_record: Schema.String.check(
                      Schema.makeFilter((input) => [...input].length <= 5000, {
                        expected: 'a string of at most 5000 characters',
                      }),
                    ),
                    refund_group: Schema.String.check(
                      Schema.makeFilter((input) => [...input].length <= 5000, {
                        expected: 'a string of at most 5000 characters',
                      }),
                    ),
                  }),
                ),
                refund: Schema.optionalKey(Schema.String),
                type: Schema.optionalKey(Schema.Literals(['payment_record_refund', 'refund'])),
              }),
            ),
          ),
          shipping_cost: Schema.optionalKey(
            Schema.Struct({
              shipping_rate: Schema.optionalKey(
                Schema.String.check(
                  Schema.makeFilter((input) => [...input].length <= 5000, {
                    expected: 'a string of at most 5000 characters',
                  }),
                ),
              ),
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(CreditNoteSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CreditNotesPreviewLines: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          amount: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          credit_amount: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          effective_at: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          email_type: Schema.optionalKey(Schema.Literals(['credit_note', 'none'])),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          invoice: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          lines: Schema.optionalKey(
            Schema.Array(
              Schema.Struct({
                amount: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                description: Schema.optionalKey(
                  Schema.String.check(
                    Schema.makeFilter((input) => [...input].length <= 5000, {
                      expected: 'a string of at most 5000 characters',
                    }),
                  ),
                ),
                invoice_line_item: Schema.optionalKey(
                  Schema.String.check(
                    Schema.makeFilter((input) => [...input].length <= 5000, {
                      expected: 'a string of at most 5000 characters',
                    }),
                  ),
                ),
                metadata: Schema.optionalKey(Schema.Record(Schema.String, Schema.String)),
                quantity: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                tax_amounts: Schema.optionalKey(
                  Schema.Union([
                    Schema.Array(
                      Schema.Struct({
                        amount: Schema.Number.check(Schema.isInt()),
                        tax_rate: Schema.String.check(
                          Schema.makeFilter((input) => [...input].length <= 5000, {
                            expected: 'a string of at most 5000 characters',
                          }),
                        ),
                        taxable_amount: Schema.Number.check(Schema.isInt()),
                      }),
                    ),
                    Schema.Literal(''),
                  ]),
                ),
                tax_rates: Schema.optionalKey(
                  Schema.Union([
                    Schema.Array(
                      Schema.String.check(
                        Schema.makeFilter((input) => [...input].length <= 5000, {
                          expected: 'a string of at most 5000 characters',
                        }),
                      ),
                    ),
                    Schema.Literal(''),
                  ]),
                ),
                type: Schema.Literals(['custom_line_item', 'invoice_line_item']),
                unit_amount: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                unit_amount_decimal: Schema.optionalKey(Schema.String),
              }),
            ),
          ),
          memo: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          metadata: Schema.optionalKey(Schema.Record(Schema.String, Schema.String)),
          out_of_band_amount: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          reason: Schema.optionalKey(
            Schema.Literals(['duplicate', 'fraudulent', 'order_change', 'product_unsatisfactory']),
          ),
          refund_amount: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          refunds: Schema.optionalKey(
            Schema.Array(
              Schema.Struct({
                amount_refunded: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                payment_record_refund: Schema.optionalKey(
                  Schema.Struct({
                    payment_record: Schema.String.check(
                      Schema.makeFilter((input) => [...input].length <= 5000, {
                        expected: 'a string of at most 5000 characters',
                      }),
                    ),
                    refund_group: Schema.String.check(
                      Schema.makeFilter((input) => [...input].length <= 5000, {
                        expected: 'a string of at most 5000 characters',
                      }),
                    ),
                  }),
                ),
                refund: Schema.optionalKey(Schema.String),
                type: Schema.optionalKey(Schema.Literals(['payment_record_refund', 'refund'])),
              }),
            ),
          ),
          shipping_cost: Schema.optionalKey(
            Schema.Struct({
              shipping_rate: Schema.optionalKey(
                Schema.String.check(
                  Schema.makeFilter((input) => [...input].length <= 5000, {
                    expected: 'a string of at most 5000 characters',
                  }),
                ),
              ),
            }),
          ),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(CreditNoteLineItemSchema).annotate({
            description: 'Details about each object.',
          }),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CreditNotesCreditNoteLines: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          credit_note: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(CreditNoteLineItemSchema).annotate({
            description: 'Details about each object.',
          }),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CreditNotesId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(CreditNoteSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CreditNotesId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(CreditNoteSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CreditNotesIdVoid: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(CreditNoteSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomerSessions: t.procedure
    .output(Schema.toStandardSchemaV1(CustomerSessionSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Customers: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          email: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 512, {
                expected: 'a string of at most 512 characters',
              }),
            ),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          test_clock: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(CustomerSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/customers/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Customers: t.procedure.output(Schema.toStandardSchemaV1(CustomerSchema)).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1CustomersSearch: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          page: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          query: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(CustomerSchema),
          has_more: Schema.Boolean,
          next_page: Schema.optionalKey(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          object: Schema.Literal('search_result').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value.",
          }),
          total_count: Schema.optionalKey(
            Schema.Number.check(Schema.isInt()).annotate({
              description:
                'The total number of objects that match the query, only accurate up to 10,000.',
            }),
          ),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomer: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          customer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(Schema.Union([CustomerSchema, DeletedCustomerSchema])))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomer: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          customer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(CustomerSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1CustomersCustomer: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          customer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(DeletedCustomerSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerBalanceTransactions: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          customer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          invoice: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(CustomerBalanceTransactionSchema).annotate({
            description: 'Details about each object.',
          }),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerBalanceTransactions: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          customer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(CustomerBalanceTransactionSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerBalanceTransactionsTransaction: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          customer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          transaction: Schema.String,
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(CustomerBalanceTransactionSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerBalanceTransactionsTransaction: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          customer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          transaction: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(CustomerBalanceTransactionSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerBankAccounts: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          customer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          ending_before: Schema.optionalKey(Schema.String),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(BankAccountSchema).annotate({
            description: 'Details about each object.',
          }),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerBankAccounts: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          customer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PaymentSourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerBankAccountsId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          customer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(BankAccountSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerBankAccountsId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          customer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(Schema.Union([CardSchema, BankAccountSchema, SourceSchema])))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1CustomersCustomerBankAccountsId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          customer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          id: Schema.String,
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(Schema.Union([PaymentSourceSchema, DeletedPaymentSourceSchema])),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerBankAccountsIdVerify: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          customer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(BankAccountSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerCards: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          customer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          ending_before: Schema.optionalKey(Schema.String),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(CardSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerCards: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          customer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PaymentSourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerCardsId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          customer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(CardSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerCardsId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          customer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(Schema.Union([CardSchema, BankAccountSchema, SourceSchema])))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1CustomersCustomerCardsId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          customer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          id: Schema.String,
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(Schema.Union([PaymentSourceSchema, DeletedPaymentSourceSchema])),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerCashBalance: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          customer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(CashBalanceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerCashBalance: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          customer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(CashBalanceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerCashBalanceTransactions: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          customer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(CustomerCashBalanceTransactionSchema).annotate({
            description: 'Details about each object.',
          }),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({
          description:
            'Customers with certain payments enabled have a cash balance, representing funds that were paid\nby the customer to a merchant, but have not yet been allocated to a payment. Cash Balance Transactions\nrepresent when funds are moved into or out of this balance. This includes funding by the customer, allocation\nto payments, and refunds to the customer.',
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerCashBalanceTransactionsTransaction: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          customer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          transaction: Schema.String,
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(CustomerCashBalanceTransactionSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerDiscount: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          customer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(DiscountSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1CustomersCustomerDiscount: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          customer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(DeletedDiscountSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerFundingInstructions: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          customer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(FundingInstructionsSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerPaymentMethods: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          allow_redisplay: Schema.optionalKey(
            Schema.Literals(['always', 'limited', 'unspecified']),
          ),
          customer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          type: Schema.optionalKey(
            Schema.Literals([
              'acss_debit',
              'affirm',
              'afterpay_clearpay',
              'alipay',
              'alma',
              'amazon_pay',
              'au_becs_debit',
              'bacs_debit',
              'bancontact',
              'billie',
              'bizum',
              'blik',
              'boleto',
              'card',
              'cashapp',
              'crypto',
              'custom',
              'customer_balance',
              'eps',
              'fpx',
              'giropay',
              'grabpay',
              'ideal',
              'kakao_pay',
              'klarna',
              'konbini',
              'kr_card',
              'link',
              'mb_way',
              'mobilepay',
              'multibanco',
              'naver_pay',
              'nz_bank_account',
              'oxxo',
              'p24',
              'pay_by_bank',
              'payco',
              'paynow',
              'paypal',
              'paypay',
              'payto',
              'pix',
              'promptpay',
              'revolut_pay',
              'samsung_pay',
              'satispay',
              'scalapay',
              'sepa_debit',
              'sequra',
              'sofort',
              'sunbit',
              'swish',
              'twint',
              'upi',
              'us_bank_account',
              'wechat_pay',
              'zip',
            ]),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(PaymentMethodSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerPaymentMethodsPaymentMethod: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          customer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          payment_method: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PaymentMethodSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerSources: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          customer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          ending_before: Schema.optionalKey(Schema.String),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          object: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          starting_after: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(Schema.Union([BankAccountSchema, CardSchema, SourceSchema])).annotate({
            description: 'Details about each object.',
          }),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerSources: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          customer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PaymentSourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerSourcesId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          customer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 500, {
              expected: 'a string of at most 500 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PaymentSourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerSourcesId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          customer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(Schema.Union([CardSchema, BankAccountSchema, SourceSchema])))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1CustomersCustomerSourcesId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          customer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          id: Schema.String,
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(Schema.Union([PaymentSourceSchema, DeletedPaymentSourceSchema])),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerSourcesIdVerify: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          customer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(BankAccountSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerSubscriptions: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          customer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(SubscriptionSchema).annotate({
            description: 'Details about each object.',
          }),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerSubscriptions: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          customer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(SubscriptionSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerSubscriptionsSubscriptionExposedId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          customer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          subscription_exposed_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(SubscriptionSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerSubscriptionsSubscriptionExposedId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          customer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          subscription_exposed_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(SubscriptionSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1CustomersCustomerSubscriptionsSubscriptionExposedId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          customer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          subscription_exposed_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(SubscriptionSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerSubscriptionsSubscriptionExposedIdDiscount: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          customer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          subscription_exposed_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(DiscountSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1CustomersCustomerSubscriptionsSubscriptionExposedIdDiscount: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          customer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          subscription_exposed_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(DeletedDiscountSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerTaxIds: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          customer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(TaxIdSchema).annotate({ description: 'Details about each object.' }),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerTaxIds: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          customer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TaxIdSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerTaxIdsId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          customer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          id: Schema.String,
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TaxIdSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1CustomersCustomerTaxIdsId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          customer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          id: Schema.String,
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(DeletedTaxIdSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Disputes: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          charge: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          payment_intent: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(DisputeSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/disputes/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1DisputesDispute: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          dispute: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(DisputeSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1DisputesDispute: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          dispute: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(DisputeSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1DisputesDisputeClose: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          dispute: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(DisputeSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1EntitlementsActiveEntitlements: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          customer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(EntitlementsActiveEntitlementSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1EntitlementsActiveEntitlementsId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(EntitlementsActiveEntitlementSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1EntitlementsFeatures: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          archived: Schema.optionalKey(Schema.Boolean),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          lookup_key: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(EntitlementsFeatureSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/entitlements\/features/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1EntitlementsFeatures: t.procedure
    .output(Schema.toStandardSchemaV1(EntitlementsFeatureSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1EntitlementsFeaturesId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(EntitlementsFeatureSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1EntitlementsFeaturesId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(EntitlementsFeatureSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1EphemeralKeys: t.procedure
    .output(Schema.toStandardSchemaV1(EphemeralKeySchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1EphemeralKeysKey: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          key: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(EphemeralKeySchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Events: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          delivery_success: Schema.optionalKey(Schema.Boolean),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          type: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          types: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(EventSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/events/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1EventsId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(EventSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ExchangeRates: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(ExchangeRateSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/exchange_rates/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ExchangeRatesRateId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          rate_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ExchangeRateSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ExternalAccountsId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ id: Schema.String })))
    .output(Schema.toStandardSchemaV1(ExternalAccountSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1FileLinks: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          ending_before: Schema.optionalKey(Schema.String),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          expired: Schema.optionalKey(Schema.Boolean),
          file: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(FileLinkSchema).annotate({
            description: 'Details about each object.',
          }),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/file_links/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1FileLinks: t.procedure.output(Schema.toStandardSchemaV1(FileLinkSchema)).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1FileLinksLink: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          link: Schema.String,
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(FileLinkSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1FileLinksLink: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ link: Schema.String })))
    .output(Schema.toStandardSchemaV1(FileLinkSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Files: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          purpose: Schema.optionalKey(
            Schema.Literals([
              'account_requirement',
              'additional_verification',
              'business_icon',
              'business_logo',
              'customer_signature',
              'dispute_evidence',
              'document_provider_identity_document',
              'finance_report_run',
              'financial_account_statement',
              'identity_document',
              'identity_document_downloadable',
              'issuing_regulatory_reporting',
              'pci_document',
              'platform_terms_of_service',
              'selfie',
              'sigma_scheduled_query',
              'tax_document_user_upload',
              'terminal_android_apk',
              'terminal_reader_splashscreen',
              'terminal_wifi_certificate',
              'terminal_wifi_private_key',
            ]),
          ),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(FileSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/files/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Files: t.procedure.output(Schema.toStandardSchemaV1(FileSchema)).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1FilesFile: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          file: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(FileSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1FinancialConnectionsAccounts: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          account_holder: Schema.optionalKey(
            Schema.Struct({
              account: Schema.optionalKey(
                Schema.String.check(
                  Schema.makeFilter((input) => [...input].length <= 5000, {
                    expected: 'a string of at most 5000 characters',
                  }),
                ),
              ),
              customer: Schema.optionalKey(
                Schema.String.check(
                  Schema.makeFilter((input) => [...input].length <= 5000, {
                    expected: 'a string of at most 5000 characters',
                  }),
                ),
              ),
              customer_account: Schema.optionalKey(
                Schema.String.check(
                  Schema.makeFilter((input) => [...input].length <= 5000, {
                    expected: 'a string of at most 5000 characters',
                  }),
                ),
              ),
            }),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          session: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(FinancialConnectionsAccountSchema).annotate({
            description: 'Details about each object.',
          }),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/financial_connections\/accounts/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1FinancialConnectionsAccountsAccount: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          account: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(FinancialConnectionsAccountSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1FinancialConnectionsAccountsAccountDisconnect: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          account: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(FinancialConnectionsAccountSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1FinancialConnectionsAccountsAccountOwners: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          account: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          ownership: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(FinancialConnectionsAccountOwnerSchema).annotate({
            description: 'Details about each object.',
          }),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1FinancialConnectionsAccountsAccountRefresh: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          account: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(FinancialConnectionsAccountSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1FinancialConnectionsAccountsAccountSubscribe: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          account: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(FinancialConnectionsAccountSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1FinancialConnectionsAccountsAccountUnsubscribe: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          account: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(FinancialConnectionsAccountSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1FinancialConnectionsSessions: t.procedure
    .output(Schema.toStandardSchemaV1(FinancialConnectionsSessionSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1FinancialConnectionsSessionsSession: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          session: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(FinancialConnectionsSessionSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1FinancialConnectionsTransactions: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          account: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          transacted_at: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          transaction_refresh: Schema.optionalKey(
            Schema.Struct({
              after: Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            }),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(FinancialConnectionsTransactionSchema).annotate({
            description: 'Details about each object.',
          }),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/financial_connections\/transactions/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1FinancialConnectionsTransactionsTransaction: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          transaction: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(FinancialConnectionsTransactionSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ForwardingRequests: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          created: Schema.optionalKey(
            Schema.Struct({
              gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
            }),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(ForwardingRequestSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: 'List of ForwardingRequest data.' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ForwardingRequests: t.procedure
    .output(Schema.toStandardSchemaV1(ForwardingRequestSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ForwardingRequestsId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ForwardingRequestSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IdentityVerificationReports: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          client_reference_id: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          type: Schema.optionalKey(Schema.Literals(['document', 'id_number'])),
          verification_session: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(IdentityVerificationReportSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/identity\/verification_reports/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IdentityVerificationReportsReport: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          report: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(IdentityVerificationReportSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IdentityVerificationSessions: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          client_reference_id: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          related_customer: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          related_customer_account: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          status: Schema.optionalKey(
            Schema.Literals(['canceled', 'processing', 'requires_input', 'verified']),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(IdentityVerificationSessionSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/identity\/verification_sessions/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IdentityVerificationSessions: t.procedure
    .output(Schema.toStandardSchemaV1(IdentityVerificationSessionSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IdentityVerificationSessionsSession: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          session: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(IdentityVerificationSessionSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IdentityVerificationSessionsSession: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          session: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(IdentityVerificationSessionSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IdentityVerificationSessionsSessionCancel: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          session: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(IdentityVerificationSessionSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IdentityVerificationSessionsSessionRedact: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          session: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(IdentityVerificationSessionSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1InvoicePayments: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          invoice: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          payment: Schema.optionalKey(
            Schema.Struct({
              payment_intent: Schema.optionalKey(
                Schema.String.check(
                  Schema.makeFilter((input) => [...input].length <= 5000, {
                    expected: 'a string of at most 5000 characters',
                  }),
                ),
              ),
              payment_record: Schema.optionalKey(
                Schema.String.check(
                  Schema.makeFilter((input) => [...input].length <= 5000, {
                    expected: 'a string of at most 5000 characters',
                  }),
                ),
              ),
              type: Schema.Literals(['payment_intent', 'payment_record']),
            }),
          ),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          status: Schema.optionalKey(Schema.Literals(['canceled', 'open', 'paid'])),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(InvoicePaymentSchema).annotate({
            description: 'Details about each object.',
          }),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1InvoicePaymentsInvoicePayment: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          invoice_payment: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(InvoicePaymentSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1InvoiceRenderingTemplates: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          status: Schema.optionalKey(Schema.Literals(['active', 'archived'])),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(InvoiceRenderingTemplateSchema).annotate({
            description: 'Details about each object.',
          }),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1InvoiceRenderingTemplatesTemplate: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          template: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          version: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(InvoiceRenderingTemplateSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoiceRenderingTemplatesTemplateArchive: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          template: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(InvoiceRenderingTemplateSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoiceRenderingTemplatesTemplateUnarchive: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          template: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(InvoiceRenderingTemplateSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Invoiceitems: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          customer: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          customer_account: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          invoice: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          pending: Schema.optionalKey(Schema.Boolean),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(InvoiceitemSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/invoiceitems/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Invoiceitems: t.procedure
    .output(Schema.toStandardSchemaV1(InvoiceitemSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1InvoiceitemsInvoiceitem: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          invoiceitem: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(InvoiceitemSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoiceitemsInvoiceitem: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          invoiceitem: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(InvoiceitemSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1InvoiceitemsInvoiceitem: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          invoiceitem: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(DeletedInvoiceitemSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Invoices: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          collection_method: Schema.optionalKey(
            Schema.Literals(['charge_automatically', 'send_invoice']),
          ),
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          customer: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          customer_account: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          due_date: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          status: Schema.optionalKey(
            Schema.Literals(['draft', 'open', 'paid', 'uncollectible', 'void']),
          ),
          subscription: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(InvoiceSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/invoices/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Invoices: t.procedure.output(Schema.toStandardSchemaV1(InvoiceSchema)).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  postV1InvoicesCreatePreview: t.procedure
    .output(Schema.toStandardSchemaV1(InvoiceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1InvoicesSearch: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          page: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          query: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(InvoiceSchema),
          has_more: Schema.Boolean,
          next_page: Schema.optionalKey(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          object: Schema.Literal('search_result').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value.",
          }),
          total_count: Schema.optionalKey(
            Schema.Number.check(Schema.isInt()).annotate({
              description:
                'The total number of objects that match the query, only accurate up to 10,000.',
            }),
          ),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1InvoicesInvoice: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          invoice: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(InvoiceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoicesInvoice: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          invoice: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(InvoiceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1InvoicesInvoice: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          invoice: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(DeletedInvoiceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoicesInvoiceAddLines: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          invoice: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(InvoiceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoicesInvoiceAttachPayment: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          invoice: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(InvoiceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoicesInvoiceFinalize: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          invoice: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(InvoiceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1InvoicesInvoiceLines: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          invoice: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(LineItemSchema).annotate({
            description: 'Details about each object.',
          }),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoicesInvoiceLinesLineItemId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          invoice: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          line_item_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(LineItemSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoicesInvoiceMarkUncollectible: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          invoice: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(InvoiceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoicesInvoicePay: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          invoice: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(InvoiceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoicesInvoiceRemoveLines: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          invoice: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(InvoiceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoicesInvoiceSend: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          invoice: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(InvoiceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoicesInvoiceUpdateLines: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          invoice: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(InvoiceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoicesInvoiceVoid: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          invoice: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(InvoiceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingAuthorizations: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          card: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          cardholder: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          status: Schema.optionalKey(Schema.Literals(['closed', 'expired', 'pending', 'reversed'])),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(IssuingAuthorizationSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/issuing\/authorizations/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingAuthorizationsAuthorization: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          authorization: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(IssuingAuthorizationSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingAuthorizationsAuthorization: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          authorization: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(IssuingAuthorizationSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingAuthorizationsAuthorizationApprove: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          authorization: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(IssuingAuthorizationSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingAuthorizationsAuthorizationDecline: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          authorization: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(IssuingAuthorizationSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingCardholders: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          email: Schema.optionalKey(Schema.String),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          phone_number: Schema.optionalKey(Schema.String),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          status: Schema.optionalKey(Schema.Literals(['active', 'blocked', 'inactive'])),
          type: Schema.optionalKey(Schema.Literals(['company', 'individual'])),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(IssuingCardholderSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/issuing\/cardholders/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingCardholders: t.procedure
    .output(Schema.toStandardSchemaV1(IssuingCardholderSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingCardholdersCardholder: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          cardholder: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(IssuingCardholderSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingCardholdersCardholder: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          cardholder: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(IssuingCardholderSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingCards: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          cardholder: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          exp_month: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          exp_year: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          last4: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          personalization_design: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          status: Schema.optionalKey(Schema.Literals(['active', 'canceled', 'inactive'])),
          type: Schema.optionalKey(Schema.Literals(['physical', 'virtual'])),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(IssuingCardSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/issuing\/cards/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingCards: t.procedure
    .output(Schema.toStandardSchemaV1(IssuingCardSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingCardsCard: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          card: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(IssuingCardSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingCardsCard: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          card: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(IssuingCardSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingDisputes: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          status: Schema.optionalKey(
            Schema.Literals(['expired', 'lost', 'submitted', 'unsubmitted', 'won']),
          ),
          transaction: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(IssuingDisputeSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/issuing\/disputes/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingDisputes: t.procedure
    .output(Schema.toStandardSchemaV1(IssuingDisputeSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingDisputesDispute: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          dispute: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(IssuingDisputeSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingDisputesDispute: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          dispute: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(IssuingDisputeSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingDisputesDisputeSubmit: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          dispute: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(IssuingDisputeSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingPersonalizationDesigns: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          lookup_keys: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 200, {
                  expected: 'a string of at most 200 characters',
                }),
              ),
            ),
          ),
          preferences: Schema.optionalKey(
            Schema.Struct({
              is_default: Schema.optionalKey(Schema.Boolean),
              is_platform_default: Schema.optionalKey(Schema.Boolean),
            }),
          ),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          status: Schema.optionalKey(Schema.Literals(['active', 'inactive', 'rejected', 'review'])),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(IssuingPersonalizationDesignSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/issuing\/personalization_designs/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingPersonalizationDesigns: t.procedure
    .output(Schema.toStandardSchemaV1(IssuingPersonalizationDesignSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingPersonalizationDesignsPersonalizationDesign: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          personalization_design: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(IssuingPersonalizationDesignSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingPersonalizationDesignsPersonalizationDesign: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          personalization_design: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(IssuingPersonalizationDesignSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingPhysicalBundles: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          status: Schema.optionalKey(Schema.Literals(['active', 'inactive', 'review'])),
          type: Schema.optionalKey(Schema.Literals(['custom', 'standard'])),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(IssuingPhysicalBundleSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/issuing\/physical_bundles/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingPhysicalBundlesPhysicalBundle: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          physical_bundle: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(IssuingPhysicalBundleSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingSettlementsSettlement: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          settlement: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(IssuingSettlementSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingSettlementsSettlement: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          settlement: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(IssuingSettlementSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingTokens: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          card: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          status: Schema.optionalKey(
            Schema.Literals(['active', 'deleted', 'requested', 'suspended']),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(IssuingTokenSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingTokensToken: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          token: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(IssuingTokenSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingTokensToken: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          token: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(IssuingTokenSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingTransactions: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          card: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          cardholder: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          type: Schema.optionalKey(Schema.Literals(['capture', 'refund'])),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(IssuingTransactionSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/issuing\/transactions/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingTransactionsTransaction: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          transaction: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(IssuingTransactionSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingTransactionsTransaction: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          transaction: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(IssuingTransactionSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1LinkAccountSessions: t.procedure
    .output(Schema.toStandardSchemaV1(FinancialConnectionsSessionSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1LinkAccountSessionsSession: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          session: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(FinancialConnectionsSessionSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1LinkedAccounts: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          account_holder: Schema.optionalKey(
            Schema.Struct({
              account: Schema.optionalKey(
                Schema.String.check(
                  Schema.makeFilter((input) => [...input].length <= 5000, {
                    expected: 'a string of at most 5000 characters',
                  }),
                ),
              ),
              customer: Schema.optionalKey(
                Schema.String.check(
                  Schema.makeFilter((input) => [...input].length <= 5000, {
                    expected: 'a string of at most 5000 characters',
                  }),
                ),
              ),
              customer_account: Schema.optionalKey(
                Schema.String.check(
                  Schema.makeFilter((input) => [...input].length <= 5000, {
                    expected: 'a string of at most 5000 characters',
                  }),
                ),
              ),
            }),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          session: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(FinancialConnectionsAccountSchema).annotate({
            description: 'Details about each object.',
          }),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/financial_connections\/accounts/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1LinkedAccountsAccount: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          account: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(FinancialConnectionsAccountSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1LinkedAccountsAccountDisconnect: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          account: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(FinancialConnectionsAccountSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1LinkedAccountsAccountOwners: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          account: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          ownership: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(FinancialConnectionsAccountOwnerSchema).annotate({
            description: 'Details about each object.',
          }),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1LinkedAccountsAccountRefresh: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          account: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(FinancialConnectionsAccountSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1MandatesMandate: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          mandate: Schema.String,
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(MandateSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentAttemptRecords: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          payment_record: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(PaymentAttemptRecordSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: 'A list of PaymentAttemptRecords.' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentAttemptRecordsId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PaymentAttemptRecordSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentIntents: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          customer: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          customer_account: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(PaymentIntentSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/payment_intents/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentIntents: t.procedure
    .output(Schema.toStandardSchemaV1(PaymentIntentSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentIntentsSearch: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          page: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          query: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(PaymentIntentSchema),
          has_more: Schema.Boolean,
          next_page: Schema.optionalKey(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          object: Schema.Literal('search_result').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value.",
          }),
          total_count: Schema.optionalKey(
            Schema.Number.check(Schema.isInt()).annotate({
              description:
                'The total number of objects that match the query, only accurate up to 10,000.',
            }),
          ),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentIntentsIntent: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          client_secret: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          intent: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PaymentIntentSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentIntentsIntent: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          intent: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PaymentIntentSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentIntentsIntentAmountDetailsLineItems: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          intent: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(PaymentIntentAmountDetailsLineItemSchema).annotate({
            description: 'Details about each object.',
          }),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentIntentsIntentApplyCustomerBalance: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          intent: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PaymentIntentSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentIntentsIntentCancel: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          intent: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PaymentIntentSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentIntentsIntentCapture: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          intent: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PaymentIntentSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentIntentsIntentConfirm: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          intent: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PaymentIntentSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentIntentsIntentIncrementAuthorization: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          intent: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PaymentIntentSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentIntentsIntentVerifyMicrodeposits: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          intent: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PaymentIntentSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentLinks: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          active: Schema.optionalKey(Schema.Boolean),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(PaymentLinkSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/payment_links/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentLinks: t.procedure
    .output(Schema.toStandardSchemaV1(PaymentLinkSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentLinksPaymentLink: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          payment_link: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PaymentLinkSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentLinksPaymentLink: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          payment_link: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PaymentLinkSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentLinksPaymentLinkLineItems: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          payment_link: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(ItemSchema).annotate({ description: 'Details about each object.' }),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentMethodConfigurations: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          active: Schema.optionalKey(Schema.Boolean),
          application: Schema.optionalKey(
            Schema.Union([
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 100, {
                  expected: 'a string of at most 100 characters',
                }),
              ),
              Schema.Literal(''),
            ]),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(PaymentMethodConfigurationSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/payment_method_configurations/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentMethodConfigurations: t.procedure
    .output(Schema.toStandardSchemaV1(PaymentMethodConfigurationSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentMethodConfigurationsConfiguration: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          configuration: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PaymentMethodConfigurationSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentMethodConfigurationsConfiguration: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          configuration: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PaymentMethodConfigurationSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentMethodDomains: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          domain_name: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          enabled: Schema.optionalKey(Schema.Boolean),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(PaymentMethodDomainSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/payment_method_domains/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentMethodDomains: t.procedure
    .output(Schema.toStandardSchemaV1(PaymentMethodDomainSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentMethodDomainsPaymentMethodDomain: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          payment_method_domain: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PaymentMethodDomainSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentMethodDomainsPaymentMethodDomain: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          payment_method_domain: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PaymentMethodDomainSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentMethodDomainsPaymentMethodDomainValidate: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          payment_method_domain: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PaymentMethodDomainSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentMethods: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          allow_redisplay: Schema.optionalKey(
            Schema.Literals(['always', 'limited', 'unspecified']),
          ),
          customer: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          customer_account: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          type: Schema.optionalKey(
            Schema.Literals([
              'acss_debit',
              'affirm',
              'afterpay_clearpay',
              'alipay',
              'alma',
              'amazon_pay',
              'au_becs_debit',
              'bacs_debit',
              'bancontact',
              'billie',
              'bizum',
              'blik',
              'boleto',
              'card',
              'cashapp',
              'crypto',
              'custom',
              'customer_balance',
              'eps',
              'fpx',
              'giropay',
              'grabpay',
              'ideal',
              'kakao_pay',
              'klarna',
              'konbini',
              'kr_card',
              'link',
              'mb_way',
              'mobilepay',
              'multibanco',
              'naver_pay',
              'nz_bank_account',
              'oxxo',
              'p24',
              'pay_by_bank',
              'payco',
              'paynow',
              'paypal',
              'paypay',
              'payto',
              'pix',
              'promptpay',
              'revolut_pay',
              'samsung_pay',
              'satispay',
              'scalapay',
              'sepa_debit',
              'sequra',
              'sofort',
              'sunbit',
              'swish',
              'twint',
              'upi',
              'us_bank_account',
              'wechat_pay',
              'zip',
            ]),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(PaymentMethodSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/payment_methods/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentMethods: t.procedure
    .output(Schema.toStandardSchemaV1(PaymentMethodSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentMethodsPaymentMethod: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          payment_method: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PaymentMethodSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentMethodsPaymentMethod: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          payment_method: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PaymentMethodSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentMethodsPaymentMethodAttach: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          payment_method: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PaymentMethodSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentMethodsPaymentMethodDetach: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          payment_method: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PaymentMethodSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentRecords: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          created_after: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          created_before: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(PaymentRecordSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: 'A list of PaymentRecords.' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentRecordsReportPayment: t.procedure
    .output(Schema.toStandardSchemaV1(PaymentRecordSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentRecordsId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PaymentRecordSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentRecordsIdReportPaymentAttempt: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PaymentRecordSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentRecordsIdReportPaymentAttemptCanceled: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PaymentRecordSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentRecordsIdReportPaymentAttemptFailed: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PaymentRecordSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentRecordsIdReportPaymentAttemptGuaranteed: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PaymentRecordSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentRecordsIdReportPaymentAttemptInformational: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PaymentRecordSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentRecordsIdReportRefund: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PaymentRecordSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Payouts: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          arrival_date: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          destination: Schema.optionalKey(Schema.String),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          status: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(PayoutSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/payouts/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Payouts: t.procedure.output(Schema.toStandardSchemaV1(PayoutSchema)).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1PayoutsPayout: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          payout: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PayoutSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PayoutsPayout: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          payout: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PayoutSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PayoutsPayoutCancel: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          payout: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PayoutSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PayoutsPayoutReverse: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          payout: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PayoutSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Plans: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          active: Schema.optionalKey(Schema.Boolean),
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          product: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(PlanSchema).annotate({ description: 'Details about each object.' }),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/plans/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Plans: t.procedure.output(Schema.toStandardSchemaV1(PlanSchema)).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1PlansPlan: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          plan: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PlanSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PlansPlan: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          plan: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PlanSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1PlansPlan: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          plan: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(DeletedPlanSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Prices: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          active: Schema.optionalKey(Schema.Boolean),
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          currency: Schema.optionalKey(Schema.String),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          lookup_keys: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          product: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          recurring: Schema.optionalKey(
            Schema.Struct({
              interval: Schema.optionalKey(Schema.Literals(['day', 'month', 'week', 'year'])),
              meter: Schema.optionalKey(
                Schema.String.check(
                  Schema.makeFilter((input) => [...input].length <= 5000, {
                    expected: 'a string of at most 5000 characters',
                  }),
                ),
              ),
              usage_type: Schema.optionalKey(Schema.Literals(['licensed', 'metered'])),
            }),
          ),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          type: Schema.optionalKey(Schema.Literals(['one_time', 'recurring'])),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(PriceSchema).annotate({ description: 'Details about each object.' }),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/prices/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Prices: t.procedure.output(Schema.toStandardSchemaV1(PriceSchema)).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1PricesSearch: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          page: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          query: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(PriceSchema),
          has_more: Schema.Boolean,
          next_page: Schema.optionalKey(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          object: Schema.Literal('search_result').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value.",
          }),
          total_count: Schema.optionalKey(
            Schema.Number.check(Schema.isInt()).annotate({
              description:
                'The total number of objects that match the query, only accurate up to 10,000.',
            }),
          ),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PricesPrice: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          price: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PriceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PricesPrice: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          price: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PriceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ProductCatalogTrialOffers: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          active: Schema.optionalKey(Schema.Boolean),
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          prices: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(ProductCatalogTrialOfferSchema).annotate({
            description: 'Details about each object.',
          }),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ProductCatalogTrialOffers: t.procedure
    .output(Schema.toStandardSchemaV1(ProductCatalogTrialOfferSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ProductCatalogTrialOffersId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ProductCatalogTrialOfferSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ProductCatalogTrialOffersId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ProductCatalogTrialOfferSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Products: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          active: Schema.optionalKey(Schema.Boolean),
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          ids: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          shippable: Schema.optionalKey(Schema.Boolean),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          url: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(ProductSchema).annotate({ description: 'Details about each object.' }),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/products/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Products: t.procedure.output(Schema.toStandardSchemaV1(ProductSchema)).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1ProductsSearch: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          page: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          query: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(ProductSchema),
          has_more: Schema.Boolean,
          next_page: Schema.optionalKey(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          object: Schema.Literal('search_result').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value.",
          }),
          total_count: Schema.optionalKey(
            Schema.Number.check(Schema.isInt()).annotate({
              description:
                'The total number of objects that match the query, only accurate up to 10,000.',
            }),
          ),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ProductsId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ProductSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ProductsId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ProductSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1ProductsId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(DeletedProductSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ProductsProductFeatures: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          product: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(ProductFeatureSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ProductsProductFeatures: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          product: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ProductFeatureSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ProductsProductFeaturesId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          product: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ProductFeatureSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1ProductsProductFeaturesId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          product: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(DeletedProductFeatureSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PromotionCodes: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          active: Schema.optionalKey(Schema.Boolean),
          code: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          coupon: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          customer: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          customer_account: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(PromotionCodeSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/promotion_codes/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PromotionCodes: t.procedure
    .output(Schema.toStandardSchemaV1(PromotionCodeSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PromotionCodesPromotionCode: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          promotion_code: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PromotionCodeSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PromotionCodesPromotionCode: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          promotion_code: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PromotionCodeSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Quotes: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          customer: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          customer_account: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          status: Schema.optionalKey(Schema.Literals(['accepted', 'canceled', 'draft', 'open'])),
          test_clock: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(QuoteSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/quotes/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Quotes: t.procedure.output(Schema.toStandardSchemaV1(QuoteSchema)).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1QuotesQuote: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          quote: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(QuoteSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1QuotesQuote: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          quote: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(QuoteSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1QuotesQuoteAccept: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          quote: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(QuoteSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1QuotesQuoteCancel: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          quote: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(QuoteSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1QuotesQuoteComputedUpfrontLineItems: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          quote: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(ItemSchema).annotate({ description: 'Details about each object.' }),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1QuotesQuoteFinalize: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          quote: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(QuoteSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1QuotesQuoteLineItems: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          quote: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(ItemSchema).annotate({ description: 'Details about each object.' }),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1QuotesQuotePdf: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          quote: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1RadarEarlyFraudWarnings: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          charge: Schema.optionalKey(Schema.String),
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          payment_intent: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(RadarEarlyFraudWarningSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/radar\/early_fraud_warnings/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1RadarEarlyFraudWarningsEarlyFraudWarning: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          early_fraud_warning: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(RadarEarlyFraudWarningSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1RadarPaymentEvaluations: t.procedure
    .output(Schema.toStandardSchemaV1(RadarPaymentEvaluationSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1RadarValueListItems: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          value: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 800, {
                expected: 'a string of at most 800 characters',
              }),
            ),
          ),
          value_list: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(RadarValueListItemSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/radar\/value_list_items/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1RadarValueListItems: t.procedure
    .output(Schema.toStandardSchemaV1(RadarValueListItemSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1RadarValueListItemsItem: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          item: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(RadarValueListItemSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1RadarValueListItemsItem: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          item: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(DeletedRadarValueListItemSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1RadarValueLists: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          alias: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 100, {
                expected: 'a string of at most 100 characters',
              }),
            ),
          ),
          contains: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 800, {
                expected: 'a string of at most 800 characters',
              }),
            ),
          ),
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(RadarValueListSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/radar\/value_lists/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1RadarValueLists: t.procedure
    .output(Schema.toStandardSchemaV1(RadarValueListSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1RadarValueListsValueList: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          value_list: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(RadarValueListSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1RadarValueListsValueList: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          value_list: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(RadarValueListSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1RadarValueListsValueList: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          value_list: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(DeletedRadarValueListSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Refunds: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          charge: Schema.optionalKey(Schema.String),
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          ending_before: Schema.optionalKey(Schema.String),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          payment_intent: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          starting_after: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(RefundSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/refunds/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Refunds: t.procedure.output(Schema.toStandardSchemaV1(RefundSchema)).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1RefundsRefund: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          refund: Schema.String,
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(RefundSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1RefundsRefund: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ refund: Schema.String })))
    .output(Schema.toStandardSchemaV1(RefundSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1RefundsRefundCancel: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ refund: Schema.String })))
    .output(Schema.toStandardSchemaV1(RefundSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ReportingReportRuns: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(ReportingReportRunSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/reporting\/report_runs/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ReportingReportRuns: t.procedure
    .output(Schema.toStandardSchemaV1(ReportingReportRunSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ReportingReportRunsReportRun: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          report_run: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ReportingReportRunSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ReportingReportTypes: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(ReportingReportTypeSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ReportingReportTypesReportType: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          report_type: Schema.String,
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ReportingReportTypeSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Reviews: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(ReviewSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ReviewsReview: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          review: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ReviewSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ReviewsReviewApprove: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          review: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ReviewSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1SetupAttempts: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          setup_intent: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(SetupAttemptSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/setup_attempts/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1SetupIntents: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          attach_to_self: Schema.optionalKey(Schema.Boolean),
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          customer: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          customer_account: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          payment_method: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(SetupIntentSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/setup_intents/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SetupIntents: t.procedure
    .output(Schema.toStandardSchemaV1(SetupIntentSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1SetupIntentsIntent: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          client_secret: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          intent: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(SetupIntentSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SetupIntentsIntent: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          intent: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(SetupIntentSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SetupIntentsIntentCancel: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          intent: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(SetupIntentSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SetupIntentsIntentConfirm: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          intent: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(SetupIntentSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SetupIntentsIntentVerifyMicrodeposits: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          intent: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(SetupIntentSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ShippingRates: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          active: Schema.optionalKey(Schema.Boolean),
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          currency: Schema.optionalKey(Schema.String),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(ShippingRateSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/shipping_rates/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ShippingRates: t.procedure
    .output(Schema.toStandardSchemaV1(ShippingRateSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ShippingRatesShippingRateToken: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          shipping_rate_token: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ShippingRateSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ShippingRatesShippingRateToken: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          shipping_rate_token: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ShippingRateSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SigmaSavedQueriesId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(SigmaSigmaApiQuerySchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1SigmaScheduledQueryRuns: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(ScheduledQueryRunSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/sigma\/scheduled_query_runs/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1SigmaScheduledQueryRunsScheduledQueryRun: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          scheduled_query_run: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ScheduledQueryRunSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Sources: t.procedure.output(Schema.toStandardSchemaV1(SourceSchema)).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1SourcesSource: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          client_secret: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          source: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(SourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SourcesSource: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          source: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(SourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1SourcesSourceMandateNotificationsMandateNotification: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          mandate_notification: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          source: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(SourceMandateNotificationSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1SourcesSourceSourceTransactions: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          source: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(SourceTransactionSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1SourcesSourceSourceTransactionsSourceTransaction: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          source: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          source_transaction: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(SourceTransactionSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SourcesSourceVerify: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          source: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(SourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1SubscriptionItems: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ending_before: Schema.optionalKey(Schema.String),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(Schema.String),
          subscription: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(SubscriptionItemSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/subscription_items/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SubscriptionItems: t.procedure
    .output(Schema.toStandardSchemaV1(SubscriptionItemSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1SubscriptionItemsItem: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          item: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(SubscriptionItemSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SubscriptionItemsItem: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          item: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(SubscriptionItemSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1SubscriptionItemsItem: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          item: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(DeletedSubscriptionItemSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1SubscriptionSchedules: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          canceled_at: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          completed_at: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          customer: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          customer_account: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          released_at: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          scheduled: Schema.optionalKey(Schema.Boolean),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(SubscriptionScheduleSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/subscription_schedules/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SubscriptionSchedules: t.procedure
    .output(Schema.toStandardSchemaV1(SubscriptionScheduleSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1SubscriptionSchedulesSchedule: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          schedule: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(SubscriptionScheduleSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SubscriptionSchedulesSchedule: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          schedule: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(SubscriptionScheduleSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SubscriptionSchedulesScheduleCancel: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          schedule: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(SubscriptionScheduleSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SubscriptionSchedulesScheduleRelease: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          schedule: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(SubscriptionScheduleSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Subscriptions: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          automatic_tax: Schema.optionalKey(Schema.Struct({ enabled: Schema.Boolean })),
          collection_method: Schema.optionalKey(
            Schema.Literals(['charge_automatically', 'send_invoice']),
          ),
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          current_period_end: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          current_period_start: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          customer: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          customer_account: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          price: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          status: Schema.optionalKey(
            Schema.Literals([
              'active',
              'all',
              'canceled',
              'ended',
              'incomplete',
              'incomplete_expired',
              'past_due',
              'paused',
              'trialing',
              'unpaid',
            ]),
          ),
          test_clock: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(SubscriptionSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/subscriptions/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Subscriptions: t.procedure
    .output(Schema.toStandardSchemaV1(SubscriptionSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1SubscriptionsSearch: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          page: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          query: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(SubscriptionSchema),
          has_more: Schema.Boolean,
          next_page: Schema.optionalKey(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          object: Schema.Literal('search_result').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value.",
          }),
          total_count: Schema.optionalKey(
            Schema.Number.check(Schema.isInt()).annotate({
              description:
                'The total number of objects that match the query, only accurate up to 10,000.',
            }),
          ),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1SubscriptionsSubscriptionExposedId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          subscription_exposed_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(SubscriptionSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SubscriptionsSubscriptionExposedId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          subscription_exposed_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(SubscriptionSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1SubscriptionsSubscriptionExposedId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          subscription_exposed_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(SubscriptionSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1SubscriptionsSubscriptionExposedIdDiscount: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          subscription_exposed_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(DeletedDiscountSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SubscriptionsSubscriptionMigrate: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          subscription: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(SubscriptionSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SubscriptionsSubscriptionPause: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          subscription: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(SubscriptionSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SubscriptionsSubscriptionResume: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          subscription: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(SubscriptionSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TaxAssociationsFind: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          payment_intent: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TaxAssociationSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TaxCalculations: t.procedure
    .output(Schema.toStandardSchemaV1(TaxCalculationSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TaxCalculationsCalculation: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          calculation: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TaxCalculationSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TaxCalculationsCalculationLineItems: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          calculation: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 500, {
                expected: 'a string of at most 500 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 500, {
                expected: 'a string of at most 500 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(TaxCalculationLineItemSchema).annotate({
            description: 'Details about each object.',
          }),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/tax\/calculations\/[^\/]+\/line_items/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TaxLocations: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          type: Schema.Literal('performance'),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(TaxLocationSchema).annotate({
            description: 'Details about each object.',
          }),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/tax\/locations/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TaxLocations: t.procedure
    .output(Schema.toStandardSchemaV1(TaxLocationSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TaxLocationsLocation: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          location: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TaxLocationSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TaxRegistrations: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          status: Schema.optionalKey(Schema.Literals(['active', 'all', 'expired', 'scheduled'])),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(TaxRegistrationSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/tax\/registrations/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TaxRegistrations: t.procedure
    .output(Schema.toStandardSchemaV1(TaxRegistrationSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TaxRegistrationsId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TaxRegistrationSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TaxRegistrationsId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TaxRegistrationSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TaxSettings: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TaxSettingsSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TaxSettings: t.procedure
    .output(Schema.toStandardSchemaV1(TaxSettingsSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TaxTransactionsCreateFromCalculation: t.procedure
    .output(Schema.toStandardSchemaV1(TaxTransactionSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TaxTransactionsCreateReversal: t.procedure
    .output(Schema.toStandardSchemaV1(TaxTransactionSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TaxTransactionsTransaction: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          transaction: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TaxTransactionSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TaxTransactionsTransactionLineItems: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 500, {
                expected: 'a string of at most 500 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 500, {
                expected: 'a string of at most 500 characters',
              }),
            ),
          ),
          transaction: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(TaxTransactionLineItemSchema).annotate({
            description: 'Details about each object.',
          }),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/tax\/transactions\/[^\/]+\/line_items/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TaxCodes: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ending_before: Schema.optionalKey(Schema.String),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(TaxCodeSchema).annotate({ description: 'Details about each object.' }),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TaxCodesId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TaxCodeSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TaxIds: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          owner: Schema.optionalKey(
            Schema.Struct({
              account: Schema.optionalKey(Schema.String),
              customer: Schema.optionalKey(
                Schema.String.check(
                  Schema.makeFilter((input) => [...input].length <= 5000, {
                    expected: 'a string of at most 5000 characters',
                  }),
                ),
              ),
              customer_account: Schema.optionalKey(
                Schema.String.check(
                  Schema.makeFilter((input) => [...input].length <= 5000, {
                    expected: 'a string of at most 5000 characters',
                  }),
                ),
              ),
              type: Schema.Literals(['account', 'application', 'customer', 'self']),
            }),
          ),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(TaxIdSchema).annotate({ description: 'Details about each object.' }),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TaxIds: t.procedure.output(Schema.toStandardSchemaV1(TaxIdSchema)).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TaxIdsId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TaxIdSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1TaxIdsId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(DeletedTaxIdSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TaxRates: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          active: Schema.optionalKey(Schema.Boolean),
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          inclusive: Schema.optionalKey(Schema.Boolean),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(TaxRateSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/tax_rates/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TaxRates: t.procedure.output(Schema.toStandardSchemaV1(TaxRateSchema)).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TaxRatesTaxRate: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          tax_rate: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TaxRateSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TaxRatesTaxRate: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          tax_rate: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TaxRateSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TerminalConfigurations: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          is_account_default: Schema.optionalKey(Schema.Boolean),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(TerminalConfigurationSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/terminal\/configurations/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalConfigurations: t.procedure
    .output(Schema.toStandardSchemaV1(TerminalConfigurationSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TerminalConfigurationsConfiguration: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          configuration: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Union([TerminalConfigurationSchema, DeletedTerminalConfigurationSchema]),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalConfigurationsConfiguration: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          configuration: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Union([TerminalConfigurationSchema, DeletedTerminalConfigurationSchema]),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1TerminalConfigurationsConfiguration: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          configuration: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(DeletedTerminalConfigurationSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalConnectionTokens: t.procedure
    .output(Schema.toStandardSchemaV1(TerminalConnectionTokenSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TerminalLocations: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(TerminalLocationSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/terminal\/locations/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalLocations: t.procedure
    .output(Schema.toStandardSchemaV1(TerminalLocationSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TerminalLocationsLocation: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          location: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Union([TerminalLocationSchema, DeletedTerminalLocationSchema]),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalLocationsLocation: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          location: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Union([TerminalLocationSchema, DeletedTerminalLocationSchema]),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1TerminalLocationsLocation: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          location: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(DeletedTerminalLocationSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalOnboardingLinks: t.procedure
    .output(Schema.toStandardSchemaV1(TerminalOnboardingLinkSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TerminalReaders: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          device_type: Schema.optionalKey(
            Schema.Literals([
              'bbpos_chipper2x',
              'bbpos_wisepad3',
              'bbpos_wisepos_e',
              'mobile_phone_reader',
              'simulated_stripe_s700',
              'simulated_stripe_s710',
              'simulated_verifone_m425',
              'simulated_verifone_p630',
              'simulated_verifone_ux700',
              'simulated_verifone_v660p',
              'simulated_wisepos_e',
              'stripe_m2',
              'stripe_s700',
              'stripe_s710',
              'verifone_P400',
              'verifone_m425',
              'verifone_p630',
              'verifone_ux700',
              'verifone_v660p',
            ]),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          location: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          serial_number: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          status: Schema.optionalKey(Schema.Literals(['offline', 'online'])),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(TerminalReaderSchema).annotate({ description: 'A list of readers' }),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalReaders: t.procedure
    .output(Schema.toStandardSchemaV1(TerminalReaderSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TerminalReadersReader: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          reader: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(Schema.Union([TerminalReaderSchema, DeletedTerminalReaderSchema])),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalReadersReader: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          reader: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(Schema.Union([TerminalReaderSchema, DeletedTerminalReaderSchema])),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1TerminalReadersReader: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          reader: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(DeletedTerminalReaderSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalReadersReaderCancelAction: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          reader: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(Schema.Union([TerminalReaderSchema, DeletedTerminalReaderSchema])),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalReadersReaderCollectInputs: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          reader: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TerminalReaderSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalReadersReaderCollectPaymentMethod: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          reader: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TerminalReaderSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalReadersReaderConfirmPaymentIntent: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          reader: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TerminalReaderSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalReadersReaderProcessPaymentIntent: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          reader: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TerminalReaderSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalReadersReaderProcessSetupIntent: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          reader: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TerminalReaderSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalReadersReaderRefundPayment: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          reader: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TerminalReaderSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalReadersReaderSetReaderDisplay: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          reader: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TerminalReaderSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalRefunds: t.procedure
    .output(Schema.toStandardSchemaV1(TerminalRefundSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersConfirmationTokens: t.procedure
    .output(Schema.toStandardSchemaV1(ConfirmationTokenSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersCustomersCustomerFundCashBalance: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          customer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(CustomerCashBalanceTransactionSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingAuthorizations: t.procedure
    .output(Schema.toStandardSchemaV1(IssuingAuthorizationSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingAuthorizationsAuthorizationCapture: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          authorization: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(IssuingAuthorizationSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingAuthorizationsAuthorizationExpire: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          authorization: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(IssuingAuthorizationSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingAuthorizationsAuthorizationFinalizeAmount: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          authorization: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(IssuingAuthorizationSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingAuthorizationsAuthorizationFraudChallengesRespond: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          authorization: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(IssuingAuthorizationSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingAuthorizationsAuthorizationIncrement: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          authorization: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(IssuingAuthorizationSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingAuthorizationsAuthorizationReverse: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          authorization: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(IssuingAuthorizationSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingCardsCardShippingDeliver: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          card: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(IssuingCardSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingCardsCardShippingFail: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          card: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(IssuingCardSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingCardsCardShippingReturn: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          card: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(IssuingCardSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingCardsCardShippingShip: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          card: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(IssuingCardSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingCardsCardShippingSubmit: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          card: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(IssuingCardSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingPersonalizationDesignsPersonalizationDesignActivate: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          personalization_design: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(IssuingPersonalizationDesignSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingPersonalizationDesignsPersonalizationDesignDeactivate: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          personalization_design: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(IssuingPersonalizationDesignSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingPersonalizationDesignsPersonalizationDesignReject: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          personalization_design: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(IssuingPersonalizationDesignSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingSettlements: t.procedure
    .output(Schema.toStandardSchemaV1(IssuingSettlementSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingSettlementsSettlementComplete: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          settlement: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(IssuingSettlementSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingTransactionsCreateForceCapture: t.procedure
    .output(Schema.toStandardSchemaV1(IssuingTransactionSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingTransactionsCreateUnlinkedRefund: t.procedure
    .output(Schema.toStandardSchemaV1(IssuingTransactionSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingTransactionsTransactionRefund: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          transaction: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(IssuingTransactionSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersRefundsRefundExpire: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ refund: Schema.String })))
    .output(Schema.toStandardSchemaV1(RefundSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTerminalReadersReaderPresentPaymentMethod: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          reader: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TerminalReaderSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTerminalReadersReaderSucceedInputCollection: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          reader: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TerminalReaderSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTerminalReadersReaderTimeoutInputCollection: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          reader: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TerminalReaderSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TestHelpersTestClocks: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(TestHelpersTestClockSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/test_helpers\/test_clocks/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTestClocks: t.procedure
    .output(Schema.toStandardSchemaV1(TestHelpersTestClockSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TestHelpersTestClocksTestClock: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          test_clock: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TestHelpersTestClockSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1TestHelpersTestClocksTestClock: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          test_clock: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(DeletedTestHelpersTestClockSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTestClocksTestClockAdvance: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          test_clock: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TestHelpersTestClockSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTreasuryInboundTransfersIdFail: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TreasuryInboundTransferSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTreasuryInboundTransfersIdReturn: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TreasuryInboundTransferSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTreasuryInboundTransfersIdSucceed: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TreasuryInboundTransferSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTreasuryOutboundPaymentsId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TreasuryOutboundPaymentSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTreasuryOutboundPaymentsIdFail: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TreasuryOutboundPaymentSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTreasuryOutboundPaymentsIdPost: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TreasuryOutboundPaymentSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTreasuryOutboundPaymentsIdReturn: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TreasuryOutboundPaymentSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTreasuryOutboundTransfersOutboundTransfer: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          outbound_transfer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TreasuryOutboundTransferSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTreasuryOutboundTransfersOutboundTransferFail: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          outbound_transfer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TreasuryOutboundTransferSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTreasuryOutboundTransfersOutboundTransferPost: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          outbound_transfer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TreasuryOutboundTransferSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTreasuryOutboundTransfersOutboundTransferReturn: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          outbound_transfer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TreasuryOutboundTransferSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTreasuryReceivedCredits: t.procedure
    .output(Schema.toStandardSchemaV1(TreasuryReceivedCreditSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTreasuryReceivedDebits: t.procedure
    .output(Schema.toStandardSchemaV1(TreasuryReceivedDebitSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ThreeDSecureAuthentications: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          status: Schema.optionalKey(
            Schema.Literals([
              'canceled',
              'error',
              'failed',
              'requires_challenge',
              'requires_submission',
              'succeeded',
            ]),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(ThreeDSecureAuthenticationSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/three_d_secure\/authentications/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ThreeDSecureAuthentications: t.procedure
    .output(Schema.toStandardSchemaV1(ThreeDSecureAuthenticationSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ThreeDSecureAuthenticationsAuthentication: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          authentication: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ThreeDSecureAuthenticationSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ThreeDSecureAuthenticationsAuthenticationCancel: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          authentication: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ThreeDSecureAuthenticationSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ThreeDSecureAuthenticationsAuthenticationSubmit: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          authentication: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ThreeDSecureAuthenticationSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Tokens: t.procedure.output(Schema.toStandardSchemaV1(TokenSchema)).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TokensToken: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          token: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TokenSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Topups: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          amount: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          status: Schema.optionalKey(
            Schema.Literals(['canceled', 'failed', 'pending', 'succeeded']),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(TopupSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/topups/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Topups: t.procedure.output(Schema.toStandardSchemaV1(TopupSchema)).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TopupsTopup: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          topup: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TopupSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TopupsTopup: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          topup: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TopupSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TopupsTopupCancel: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          topup: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TopupSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Transfers: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          destination: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          transfer_group: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(TransferSchema).annotate({
            description: 'Details about each object.',
          }),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/transfers/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Transfers: t.procedure.output(Schema.toStandardSchemaV1(TransferSchema)).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TransfersIdReversals: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(TransferReversalSchema).annotate({
            description: 'Details about each object.',
          }),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TransfersIdReversals: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TransferReversalSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TransfersTransfer: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          transfer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TransferSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TransfersTransfer: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          transfer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TransferSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TransfersTransferReversalsId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          transfer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TransferReversalSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TransfersTransferReversalsId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          transfer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TransferReversalSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryCreditReversals: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          financial_account: Schema.String,
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          received_credit: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          status: Schema.optionalKey(Schema.Literals(['canceled', 'posted', 'processing'])),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(TreasuryCreditReversalSchema).annotate({
            description: 'Details about each object.',
          }),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TreasuryCreditReversals: t.procedure
    .output(Schema.toStandardSchemaV1(TreasuryCreditReversalSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryCreditReversalsCreditReversal: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          credit_reversal: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TreasuryCreditReversalSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryDebitReversals: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          financial_account: Schema.String,
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          received_debit: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          resolution: Schema.optionalKey(Schema.Literals(['lost', 'won'])),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          status: Schema.optionalKey(Schema.Literals(['canceled', 'completed', 'processing'])),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(TreasuryDebitReversalSchema).annotate({
            description: 'Details about each object.',
          }),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TreasuryDebitReversals: t.procedure
    .output(Schema.toStandardSchemaV1(TreasuryDebitReversalSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryDebitReversalsDebitReversal: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          debit_reversal: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TreasuryDebitReversalSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryFinancialAccounts: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          status: Schema.optionalKey(Schema.Literals(['closed', 'open'])),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(TreasuryFinancialAccountSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/treasury\/financial_accounts/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TreasuryFinancialAccounts: t.procedure
    .output(Schema.toStandardSchemaV1(TreasuryFinancialAccountSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryFinancialAccountsFinancialAccount: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          financial_account: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TreasuryFinancialAccountSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TreasuryFinancialAccountsFinancialAccount: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          financial_account: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TreasuryFinancialAccountSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TreasuryFinancialAccountsFinancialAccountClose: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          financial_account: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TreasuryFinancialAccountSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryFinancialAccountsFinancialAccountFeatures: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          financial_account: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TreasuryFinancialAccountFeaturesSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TreasuryFinancialAccountsFinancialAccountFeatures: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          financial_account: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TreasuryFinancialAccountFeaturesSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryInboundTransfers: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          financial_account: Schema.String,
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          status: Schema.optionalKey(
            Schema.Literals(['canceled', 'failed', 'processing', 'succeeded']),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(TreasuryInboundTransferSchema).annotate({
            description: 'Details about each object.',
          }),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TreasuryInboundTransfers: t.procedure
    .output(Schema.toStandardSchemaV1(TreasuryInboundTransferSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryInboundTransfersId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TreasuryInboundTransferSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TreasuryInboundTransfersInboundTransferCancel: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          inbound_transfer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TreasuryInboundTransferSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryOutboundPayments: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          customer: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          financial_account: Schema.String,
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          status: Schema.optionalKey(
            Schema.Literals(['canceled', 'failed', 'posted', 'processing', 'returned']),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(TreasuryOutboundPaymentSchema).annotate({
            description: 'Details about each object.',
          }),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/treasury\/outbound_payments/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TreasuryOutboundPayments: t.procedure
    .output(Schema.toStandardSchemaV1(TreasuryOutboundPaymentSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryOutboundPaymentsId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TreasuryOutboundPaymentSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TreasuryOutboundPaymentsIdCancel: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TreasuryOutboundPaymentSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryOutboundTransfers: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          financial_account: Schema.String,
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          status: Schema.optionalKey(
            Schema.Literals(['canceled', 'failed', 'posted', 'processing', 'returned']),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(TreasuryOutboundTransferSchema).annotate({
            description: 'Details about each object.',
          }),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TreasuryOutboundTransfers: t.procedure
    .output(Schema.toStandardSchemaV1(TreasuryOutboundTransferSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryOutboundTransfersOutboundTransfer: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          outbound_transfer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TreasuryOutboundTransferSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TreasuryOutboundTransfersOutboundTransferCancel: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          outbound_transfer: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TreasuryOutboundTransferSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryReceivedCredits: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          financial_account: Schema.String,
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          linked_flows: Schema.optionalKey(
            Schema.Struct({
              source_flow_type: Schema.Literals([
                'credit_reversal',
                'other',
                'outbound_payment',
                'outbound_transfer',
                'payout',
              ]),
            }),
          ),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          status: Schema.optionalKey(Schema.Literals(['failed', 'succeeded'])),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(TreasuryReceivedCreditSchema).annotate({
            description: 'Details about each object.',
          }),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryReceivedCreditsId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TreasuryReceivedCreditSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryReceivedDebits: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          financial_account: Schema.String,
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          status: Schema.optionalKey(Schema.Literals(['failed', 'succeeded'])),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(TreasuryReceivedDebitSchema).annotate({
            description: 'Details about each object.',
          }),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryReceivedDebitsId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TreasuryReceivedDebitSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryTransactionEntries: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          effective_at: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          financial_account: Schema.String,
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          order_by: Schema.optionalKey(Schema.Literals(['created', 'effective_at'])),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          transaction: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(TreasuryTransactionEntrySchema).annotate({
            description: 'Details about each object.',
          }),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/treasury\/transaction_entries/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryTransactionEntriesId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TreasuryTransactionEntrySchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryTransactions: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          created: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
              }),
              Schema.Number.check(Schema.isInt()),
            ]),
          ),
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          financial_account: Schema.String,
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          order_by: Schema.optionalKey(Schema.Literals(['created', 'posted_at'])),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          status: Schema.optionalKey(Schema.Literals(['open', 'posted', 'void'])),
          status_transitions: Schema.optionalKey(
            Schema.Struct({
              posted_at: Schema.optionalKey(
                Schema.Union([
                  Schema.Struct({
                    gt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                    gte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                    lt: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                    lte: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
                  }),
                  Schema.Number.check(Schema.isInt()),
                ]),
              ),
            }),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(TreasuryTransactionSchema).annotate({
            description: 'Details about each object.',
          }),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryTransactionsId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TreasuryTransactionSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1WebhookEndpoints: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ending_before: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optionalKey(Schema.Number.check(Schema.isInt())),
          starting_after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 5000, {
                expected: 'a string of at most 5000 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          data: Schema.Array(WebhookEndpointSchema),
          has_more: Schema.Boolean.annotate({
            description:
              'True if this list has another page of items after this one that can be fetched.',
          }),
          object: Schema.Literal('list').annotate({
            description:
              "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
          }),
          url: Schema.String.check(
            Schema.isPattern(/^\/v1\/webhook_endpoints/),
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ).annotate({ description: 'The URL where this list can be accessed.' }),
        }).annotate({ description: '' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1WebhookEndpoints: t.procedure
    .output(Schema.toStandardSchemaV1(WebhookEndpointSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1WebhookEndpointsWebhookEndpoint: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          expand: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 5000, {
                  expected: 'a string of at most 5000 characters',
                }),
              ),
            ),
          ),
          webhook_endpoint: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(WebhookEndpointSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1WebhookEndpointsWebhookEndpoint: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          webhook_endpoint: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(WebhookEndpointSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1WebhookEndpointsWebhookEndpoint: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          webhook_endpoint: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 5000, {
              expected: 'a string of at most 5000 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(DeletedWebhookEndpointSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
