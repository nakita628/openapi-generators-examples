import { initTRPC, TRPCError } from '@trpc/server'
import { type } from 'arktype'
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
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
      }),
    )
    .output(AccountSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountLinks: t.procedure.output(AccountLinkSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  postV1AccountSessions: t.procedure.output(AccountSessionSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1Accounts: t.procedure
    .input(
      type({
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'ending_before?': 'string',
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': 'string',
      }),
    )
    .output(
      type({
        data: type(AccountSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/accounts/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Accounts: t.procedure.output(AccountSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1AccountsAccount: t.procedure
    .input(
      type({
        account: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
      }),
    )
    .output(AccountSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccount: t.procedure
    .input(
      type({
        account: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(AccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1AccountsAccount: t.procedure
    .input(
      type({
        account: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(DeletedAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccountBankAccounts: t.procedure
    .input(
      type({
        account: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(ExternalAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1AccountsAccountBankAccountsId: t.procedure
    .input(
      type({
        account: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        id: 'string',
      }),
    )
    .output(ExternalAccountSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccountBankAccountsId: t.procedure
    .input(
      type({
        account: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        id: 'string',
      }),
    )
    .output(ExternalAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1AccountsAccountBankAccountsId: t.procedure
    .input(
      type({
        account: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        id: 'string',
      }),
    )
    .output(DeletedExternalAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1AccountsAccountCapabilities: t.procedure
    .input(
      type({
        account: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
      }),
    )
    .output(
      type({
        data: type(CapabilitySchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1AccountsAccountCapabilitiesCapability: t.procedure
    .input(
      type({
        account: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        capability: 'string',
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
      }),
    )
    .output(CapabilitySchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccountCapabilitiesCapability: t.procedure
    .input(
      type({
        account: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        capability: 'string',
      }),
    )
    .output(CapabilitySchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1AccountsAccountExternalAccounts: t.procedure
    .input(
      type({
        account: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'ending_before?': 'string',
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'object?': "'bank_account' | 'card'",
        'starting_after?': 'string',
      }),
    )
    .output(
      type({
        data: type(type(BankAccountSchema).or(CardSchema))
          .array()
          .describe(
            'The list contains all external accounts that have been attached to the Stripe account. These may be bank accounts or cards.',
          ),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccountExternalAccounts: t.procedure
    .input(
      type({
        account: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(ExternalAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1AccountsAccountExternalAccountsId: t.procedure
    .input(
      type({
        account: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        id: 'string',
      }),
    )
    .output(ExternalAccountSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccountExternalAccountsId: t.procedure
    .input(
      type({
        account: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        id: 'string',
      }),
    )
    .output(ExternalAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1AccountsAccountExternalAccountsId: t.procedure
    .input(
      type({
        account: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        id: 'string',
      }),
    )
    .output(DeletedExternalAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccountLoginLinks: t.procedure
    .input(
      type({
        account: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(LoginLinkSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1AccountsAccountPeople: t.procedure
    .input(
      type({
        account: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'relationship?': type({
          'authorizer?': 'boolean',
          'director?': 'boolean',
          'executive?': 'boolean',
          'legal_guardian?': 'boolean',
          'owner?': 'boolean',
          'representative?': 'boolean',
        }),
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(PersonSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccountPeople: t.procedure
    .input(
      type({
        account: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(PersonSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1AccountsAccountPeoplePerson: t.procedure
    .input(
      type({
        account: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        person: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(PersonSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccountPeoplePerson: t.procedure
    .input(
      type({
        account: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        person: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(PersonSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1AccountsAccountPeoplePerson: t.procedure
    .input(
      type({
        account: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        person: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(DeletedPersonSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1AccountsAccountPersons: t.procedure
    .input(
      type({
        account: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'relationship?': type({
          'authorizer?': 'boolean',
          'director?': 'boolean',
          'executive?': 'boolean',
          'legal_guardian?': 'boolean',
          'owner?': 'boolean',
          'representative?': 'boolean',
        }),
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(PersonSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccountPersons: t.procedure
    .input(
      type({
        account: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(PersonSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1AccountsAccountPersonsPerson: t.procedure
    .input(
      type({
        account: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        person: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(PersonSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccountPersonsPerson: t.procedure
    .input(
      type({
        account: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        person: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(PersonSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1AccountsAccountPersonsPerson: t.procedure
    .input(
      type({
        account: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        person: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(DeletedPersonSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccountReject: t.procedure
    .input(
      type({
        account: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(AccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccountUnreject: t.procedure
    .input(
      type({
        account: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(AccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ApplePayDomains: t.procedure
    .input(
      type({
        'domain_name?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(ApplePayDomainSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/apple_pay\/domains/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ApplePayDomains: t.procedure.output(ApplePayDomainSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1ApplePayDomainsDomain: t.procedure
    .input(
      type({
        domain: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
      }),
    )
    .output(ApplePayDomainSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1ApplePayDomainsDomain: t.procedure
    .input(
      type({
        domain: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(DeletedApplePayDomainSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ApplicationFees: t.procedure
    .input(
      type({
        'charge?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(ApplicationFeeSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/application_fees/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ApplicationFeesFeeRefundsId: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        fee: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(FeeRefundSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ApplicationFeesFeeRefundsId: t.procedure
    .input(
      type({
        fee: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(FeeRefundSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ApplicationFeesId: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(ApplicationFeeSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ApplicationFeesIdRefund: t.procedure
    .input(
      type({
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(ApplicationFeeSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ApplicationFeesIdRefunds: t.procedure
    .input(
      type({
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(FeeRefundSchema).array().describe('Details about each object.'),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ApplicationFeesIdRefunds: t.procedure
    .input(
      type({
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(FeeRefundSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1AppsInstalls: t.procedure
    .input(
      type({
        'account?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'app?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'approval_required?': 'boolean',
        'channel?': "'private_live' | 'private_test' | 'public' | 'testing'",
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'created_by?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'status?':
          "'install_failed' | 'installed' | 'installing' | 'uninstall_failed' | 'uninstalling'",
      }),
    )
    .output(
      type({
        data: type(AppsInstallSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/apps\/installs/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AppsInstalls: t.procedure.output(AppsInstallSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1AppsInstallsId: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(AppsInstallSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AppsInstallsId: t.procedure
    .input(
      type({
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(AppsInstallSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AppsInstallsIdUninstall: t.procedure
    .input(
      type({
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(AppsInstallSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1AppsSecrets: t.procedure
    .input(
      type({
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        scope: type({
          type: "'account' | 'user'",
          'user?': type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        }),
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(AppsSecretSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/apps\/secrets/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AppsSecrets: t.procedure.output(AppsSecretSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  postV1AppsSecretsDelete: t.procedure.output(AppsSecretSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1AppsSecretsFind: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        name: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        scope: type({
          type: "'account' | 'user'",
          'user?': type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        }),
      }),
    )
    .output(AppsSecretSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Balance: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
      }),
    )
    .output(BalanceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BalanceHistory: t.procedure
    .input(
      type({
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'currency?': 'string',
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'payout?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'source?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'type?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(BalanceTransactionSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/balance_transactions/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BalanceHistoryId: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(BalanceTransactionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BalanceSettings: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
      }),
    )
    .output(BalanceSettingsSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BalanceSettings: t.procedure.output(BalanceSettingsSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1BalanceTransactions: t.procedure
    .input(
      type({
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'currency?': 'string',
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'payout?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'source?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'type?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(BalanceTransactionSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/balance_transactions/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BalanceTransactionsId: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(BalanceTransactionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BillingAlerts: t.procedure
    .input(
      type({
        'alert_type?': "'usage_threshold'",
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'meter?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(BillingAlertSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/billing\/alerts/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingAlerts: t.procedure.output(BillingAlertSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1BillingAlertsId: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(BillingAlertSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingAlertsIdActivate: t.procedure
    .input(
      type({
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(BillingAlertSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingAlertsIdArchive: t.procedure
    .input(
      type({
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(BillingAlertSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingAlertsIdDeactivate: t.procedure
    .input(
      type({
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(BillingAlertSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BillingCreditBalanceSummary: t.procedure
    .input(
      type({
        'customer?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'customer_account?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        filter: type({
          'applicability_scope?': type({
            'price_type?': "'metered'",
            'prices?': type(
              type({
                id: type('string').narrow(
                  (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
                ),
              }),
            ).array(),
          }),
          'credit_grant?': type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
          type: "'applicability_scope' | 'credit_grant'",
        }),
      }),
    )
    .output(BillingCreditBalanceSummarySchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BillingCreditBalanceTransactions: t.procedure
    .input(
      type({
        'credit_grant?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'customer?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'customer_account?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(BillingCreditBalanceTransactionSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/billing\/credit_grants/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BillingCreditBalanceTransactionsId: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(BillingCreditBalanceTransactionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BillingCreditGrants: t.procedure
    .input(
      type({
        'customer?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'customer_account?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(BillingCreditGrantSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/billing\/credit_grants/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingCreditGrants: t.procedure.output(BillingCreditGrantSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1BillingCreditGrantsId: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(BillingCreditGrantSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingCreditGrantsId: t.procedure
    .input(
      type({
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(BillingCreditGrantSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingCreditGrantsIdExpire: t.procedure
    .input(
      type({
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(BillingCreditGrantSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingCreditGrantsIdVoid: t.procedure
    .input(
      type({
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(BillingCreditGrantSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BillingFeedbackOptions: t.procedure
    .input(
      type({
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'status?': "'active' | 'inactive'",
      }),
    )
    .output(
      type({
        data: type(BillingFeedbackOptionSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe('Resource for the List Endpoint of Feedback Option.'),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingFeedbackOptions: t.procedure.output(BillingFeedbackOptionSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1BillingFeedbackOptionsId: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(BillingFeedbackOptionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingFeedbackOptionsId: t.procedure
    .input(
      type({
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(BillingFeedbackOptionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingFeedbackOptionsIdDeactivate: t.procedure
    .input(
      type({
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(BillingFeedbackOptionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingMeterEventAdjustments: t.procedure
    .output(BillingMeterEventAdjustmentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingMeterEvents: t.procedure.output(BillingMeterEventSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1BillingMeters: t.procedure
    .input(
      type({
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'status?': "'active' | 'inactive'",
      }),
    )
    .output(
      type({
        data: type(BillingMeterSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/billing\/meters/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingMeters: t.procedure.output(BillingMeterSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1BillingMetersId: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(BillingMeterSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingMetersId: t.procedure
    .input(
      type({
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(BillingMeterSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingMetersIdDeactivate: t.procedure
    .input(
      type({
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(BillingMeterSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BillingMetersIdEventSummaries: t.procedure
    .input(
      type({
        customer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        end_time: 'number.integer',
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'limit?': 'number.integer',
        start_time: 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'value_grouping_window?': "'day' | 'hour'",
      }),
    )
    .output(
      type({
        data: type(BillingMeterEventSummarySchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/billing\/meters\/[^\/]+\/event_summaries/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingMetersIdReactivate: t.procedure
    .input(
      type({
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(BillingMeterSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BillingPortalConfigurations: t.procedure
    .input(
      type({
        'active?': 'boolean',
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'is_default?': 'boolean',
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(BillingPortalConfigurationSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/billing_portal\/configurations/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingPortalConfigurations: t.procedure
    .output(BillingPortalConfigurationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BillingPortalConfigurationsConfiguration: t.procedure
    .input(
      type({
        configuration: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
      }),
    )
    .output(BillingPortalConfigurationSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingPortalConfigurationsConfiguration: t.procedure
    .input(
      type({
        configuration: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(BillingPortalConfigurationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingPortalSessions: t.procedure.output(BillingPortalSessionSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1Charges: t.procedure
    .input(
      type({
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'customer?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'ending_before?': 'string',
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'payment_intent?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'starting_after?': 'string',
        'transfer_group?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(ChargeSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/charges/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Charges: t.procedure.output(ChargeSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1ChargesSearch: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'page?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        query: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(ChargeSchema).array(),
        has_more: 'boolean',
        'next_page?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).or('null'),
        object: type("'search_result'").describe(
          "String representing the object's type. Objects of the same type share the same value.",
        ),
        'total_count?': type('number.integer').describe(
          'The total number of objects that match the query, only accurate up to 10,000.',
        ),
        url: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ChargesCharge: t.procedure
    .input(
      type({
        charge: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
      }),
    )
    .output(ChargeSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ChargesCharge: t.procedure
    .input(
      type({
        charge: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(ChargeSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ChargesChargeCapture: t.procedure
    .input(
      type({
        charge: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(ChargeSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ChargesChargeDispute: t.procedure
    .input(
      type({
        charge: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
      }),
    )
    .output(DisputeSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ChargesChargeDispute: t.procedure
    .input(
      type({
        charge: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(DisputeSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ChargesChargeDisputeClose: t.procedure
    .input(
      type({
        charge: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(DisputeSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ChargesChargeRefund: t.procedure
    .input(
      type({
        charge: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(ChargeSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ChargesChargeRefunds: t.procedure
    .input(
      type({
        charge: 'string',
        'ending_before?': 'string',
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': 'string',
      }),
    )
    .output(
      type({
        data: type(RefundSchema).array().describe('Details about each object.'),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ChargesChargeRefunds: t.procedure
    .input(
      type({
        charge: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(RefundSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ChargesChargeRefundsRefund: t.procedure
    .input(
      type({
        charge: 'string',
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        refund: 'string',
      }),
    )
    .output(RefundSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ChargesChargeRefundsRefund: t.procedure
    .input(type({ charge: 'string', refund: 'string' }))
    .output(RefundSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CheckoutSessions: t.procedure
    .input(
      type({
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'customer?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'customer_account?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'customer_details?': type({ email: 'string' }),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'payment_intent?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'payment_link?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'status?': "'complete' | 'expired' | 'open'",
        'subscription?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(CheckoutSessionSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CheckoutSessions: t.procedure.output(CheckoutSessionSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1CheckoutSessionsSession: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        session: type('string').narrow(
          (data, ctx) => [...data].length <= 66 || ctx.mustBe('at most 66 characters'),
        ),
      }),
    )
    .output(CheckoutSessionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CheckoutSessionsSession: t.procedure
    .input(
      type({
        session: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(CheckoutSessionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CheckoutSessionsSessionExpire: t.procedure
    .input(
      type({
        session: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(CheckoutSessionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CheckoutSessionsSessionLineItems: t.procedure
    .input(
      type({
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        session: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(ItemSchema).array().describe('Details about each object.'),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ClimateOrders: t.procedure
    .input(
      type({
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(ClimateOrderSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/climate\/orders/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ClimateOrders: t.procedure.output(ClimateOrderSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1ClimateOrdersOrder: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        order: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(ClimateOrderSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ClimateOrdersOrder: t.procedure
    .input(
      type({
        order: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(ClimateOrderSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ClimateOrdersOrderCancel: t.procedure
    .input(
      type({
        order: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(ClimateOrderSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ClimateProducts: t.procedure
    .input(
      type({
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(ClimateProductSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/climate\/products/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ClimateProductsProduct: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        product: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(ClimateProductSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ClimateSuppliers: t.procedure
    .input(
      type({
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(ClimateSupplierSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/climate\/suppliers/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ClimateSuppliersSupplier: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        supplier: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(ClimateSupplierSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ConfirmationTokensConfirmationToken: t.procedure
    .input(
      type({
        confirmation_token: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
      }),
    )
    .output(ConfirmationTokenSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CountrySpecs: t.procedure
    .input(
      type({
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(CountrySpecSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/country_specs/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CountrySpecsCountry: t.procedure
    .input(
      type({
        country: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
      }),
    )
    .output(CountrySpecSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Coupons: t.procedure
    .input(
      type({
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(CouponSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/coupons/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Coupons: t.procedure.output(CouponSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1CouponsCoupon: t.procedure
    .input(
      type({
        coupon: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
      }),
    )
    .output(CouponSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CouponsCoupon: t.procedure
    .input(
      type({
        coupon: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(CouponSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1CouponsCoupon: t.procedure
    .input(
      type({
        coupon: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(DeletedCouponSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CreditNotes: t.procedure
    .input(
      type({
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'customer?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'customer_account?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'invoice?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(CreditNoteSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CreditNotes: t.procedure.output(CreditNoteSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1CreditNotesPreview: t.procedure
    .input(
      type({
        'amount?': 'number.integer',
        'credit_amount?': 'number.integer',
        'effective_at?': 'number.integer',
        'email_type?': "'credit_note' | 'none'",
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        invoice: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'lines?': type(
          type({
            'amount?': 'number.integer',
            'description?': type('string').narrow(
              (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
            ),
            'invoice_line_item?': type('string').narrow(
              (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
            ),
            'metadata?': type({ '[string]': 'string' }),
            'quantity?': 'number.integer',
            'tax_amounts?': type(
              type(
                type({
                  amount: 'number.integer',
                  tax_rate: type('string').narrow(
                    (data, ctx) =>
                      [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
                  ),
                  taxable_amount: 'number.integer',
                }),
              ).array(),
            ).or("''"),
            'tax_rates?': type(
              type(
                type('string').narrow(
                  (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
                ),
              ).array(),
            ).or("''"),
            type: "'custom_line_item' | 'invoice_line_item'",
            'unit_amount?': 'number.integer',
            'unit_amount_decimal?': 'string',
          }),
        ).array(),
        'memo?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'metadata?': type({ '[string]': 'string' }),
        'out_of_band_amount?': 'number.integer',
        'reason?': "'duplicate' | 'fraudulent' | 'order_change' | 'product_unsatisfactory'",
        'refund_amount?': 'number.integer',
        'refunds?': type(
          type({
            'amount_refunded?': 'number.integer',
            'payment_record_refund?': type({
              payment_record: type('string').narrow(
                (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
              ),
              refund_group: type('string').narrow(
                (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
              ),
            }),
            'refund?': 'string',
            'type?': "'payment_record_refund' | 'refund'",
          }),
        ).array(),
        'shipping_cost?': type({
          'shipping_rate?': type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        }),
      }),
    )
    .output(CreditNoteSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CreditNotesPreviewLines: t.procedure
    .input(
      type({
        'amount?': 'number.integer',
        'credit_amount?': 'number.integer',
        'effective_at?': 'number.integer',
        'email_type?': "'credit_note' | 'none'",
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        invoice: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'limit?': 'number.integer',
        'lines?': type(
          type({
            'amount?': 'number.integer',
            'description?': type('string').narrow(
              (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
            ),
            'invoice_line_item?': type('string').narrow(
              (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
            ),
            'metadata?': type({ '[string]': 'string' }),
            'quantity?': 'number.integer',
            'tax_amounts?': type(
              type(
                type({
                  amount: 'number.integer',
                  tax_rate: type('string').narrow(
                    (data, ctx) =>
                      [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
                  ),
                  taxable_amount: 'number.integer',
                }),
              ).array(),
            ).or("''"),
            'tax_rates?': type(
              type(
                type('string').narrow(
                  (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
                ),
              ).array(),
            ).or("''"),
            type: "'custom_line_item' | 'invoice_line_item'",
            'unit_amount?': 'number.integer',
            'unit_amount_decimal?': 'string',
          }),
        ).array(),
        'memo?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'metadata?': type({ '[string]': 'string' }),
        'out_of_band_amount?': 'number.integer',
        'reason?': "'duplicate' | 'fraudulent' | 'order_change' | 'product_unsatisfactory'",
        'refund_amount?': 'number.integer',
        'refunds?': type(
          type({
            'amount_refunded?': 'number.integer',
            'payment_record_refund?': type({
              payment_record: type('string').narrow(
                (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
              ),
              refund_group: type('string').narrow(
                (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
              ),
            }),
            'refund?': 'string',
            'type?': "'payment_record_refund' | 'refund'",
          }),
        ).array(),
        'shipping_cost?': type({
          'shipping_rate?': type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        }),
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(CreditNoteLineItemSchema).array().describe('Details about each object.'),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CreditNotesCreditNoteLines: t.procedure
    .input(
      type({
        credit_note: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(CreditNoteLineItemSchema).array().describe('Details about each object.'),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CreditNotesId: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(CreditNoteSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CreditNotesId: t.procedure
    .input(
      type({
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(CreditNoteSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CreditNotesIdVoid: t.procedure
    .input(
      type({
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(CreditNoteSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomerSessions: t.procedure.output(CustomerSessionSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1Customers: t.procedure
    .input(
      type({
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'email?': type('string').narrow(
          (data, ctx) => [...data].length <= 512 || ctx.mustBe('at most 512 characters'),
        ),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'test_clock?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(CustomerSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/customers/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Customers: t.procedure.output(CustomerSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1CustomersSearch: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'page?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        query: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(CustomerSchema).array(),
        has_more: 'boolean',
        'next_page?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).or('null'),
        object: type("'search_result'").describe(
          "String representing the object's type. Objects of the same type share the same value.",
        ),
        'total_count?': type('number.integer').describe(
          'The total number of objects that match the query, only accurate up to 10,000.',
        ),
        url: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomer: t.procedure
    .input(
      type({
        customer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
      }),
    )
    .output(type(CustomerSchema).or(DeletedCustomerSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomer: t.procedure
    .input(
      type({
        customer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(CustomerSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1CustomersCustomer: t.procedure
    .input(
      type({
        customer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(DeletedCustomerSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerBalanceTransactions: t.procedure
    .input(
      type({
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        customer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'invoice?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(CustomerBalanceTransactionSchema).array().describe('Details about each object.'),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerBalanceTransactions: t.procedure
    .input(
      type({
        customer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(CustomerBalanceTransactionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerBalanceTransactionsTransaction: t.procedure
    .input(
      type({
        customer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        transaction: 'string',
      }),
    )
    .output(CustomerBalanceTransactionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerBalanceTransactionsTransaction: t.procedure
    .input(
      type({
        customer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        transaction: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(CustomerBalanceTransactionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerBankAccounts: t.procedure
    .input(
      type({
        customer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'ending_before?': 'string',
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': 'string',
      }),
    )
    .output(
      type({
        data: type(BankAccountSchema).array().describe('Details about each object.'),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerBankAccounts: t.procedure
    .input(
      type({
        customer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(PaymentSourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerBankAccountsId: t.procedure
    .input(
      type({
        customer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(BankAccountSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerBankAccountsId: t.procedure
    .input(
      type({
        customer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(type(type(CardSchema).or(BankAccountSchema)).or(SourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1CustomersCustomerBankAccountsId: t.procedure
    .input(
      type({
        customer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        id: 'string',
      }),
    )
    .output(type(PaymentSourceSchema).or(DeletedPaymentSourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerBankAccountsIdVerify: t.procedure
    .input(
      type({
        customer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(BankAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerCards: t.procedure
    .input(
      type({
        customer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'ending_before?': 'string',
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': 'string',
      }),
    )
    .output(
      type({
        data: type(CardSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerCards: t.procedure
    .input(
      type({
        customer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(PaymentSourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerCardsId: t.procedure
    .input(
      type({
        customer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(CardSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerCardsId: t.procedure
    .input(
      type({
        customer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(type(type(CardSchema).or(BankAccountSchema)).or(SourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1CustomersCustomerCardsId: t.procedure
    .input(
      type({
        customer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        id: 'string',
      }),
    )
    .output(type(PaymentSourceSchema).or(DeletedPaymentSourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerCashBalance: t.procedure
    .input(
      type({
        customer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
      }),
    )
    .output(CashBalanceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerCashBalance: t.procedure
    .input(
      type({
        customer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(CashBalanceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerCashBalanceTransactions: t.procedure
    .input(
      type({
        customer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(CustomerCashBalanceTransactionSchema)
          .array()
          .describe('Details about each object.'),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(
        'Customers with certain payments enabled have a cash balance, representing funds that were paid\nby the customer to a merchant, but have not yet been allocated to a payment. Cash Balance Transactions\nrepresent when funds are moved into or out of this balance. This includes funding by the customer, allocation\nto payments, and refunds to the customer.',
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerCashBalanceTransactionsTransaction: t.procedure
    .input(
      type({
        customer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        transaction: 'string',
      }),
    )
    .output(CustomerCashBalanceTransactionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerDiscount: t.procedure
    .input(
      type({
        customer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
      }),
    )
    .output(DiscountSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1CustomersCustomerDiscount: t.procedure
    .input(
      type({
        customer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(DeletedDiscountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerFundingInstructions: t.procedure
    .input(
      type({
        customer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(FundingInstructionsSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerPaymentMethods: t.procedure
    .input(
      type({
        'allow_redisplay?': "'always' | 'limited' | 'unspecified'",
        customer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'type?': type.enumerated(
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
        ),
      }),
    )
    .output(
      type({
        data: type(PaymentMethodSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerPaymentMethodsPaymentMethod: t.procedure
    .input(
      type({
        customer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        payment_method: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(PaymentMethodSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerSources: t.procedure
    .input(
      type({
        customer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'ending_before?': 'string',
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'object?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'starting_after?': 'string',
      }),
    )
    .output(
      type({
        data: type(type(type(BankAccountSchema).or(CardSchema)).or(SourceSchema))
          .array()
          .describe('Details about each object.'),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerSources: t.procedure
    .input(
      type({
        customer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(PaymentSourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerSourcesId: t.procedure
    .input(
      type({
        customer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 500 || ctx.mustBe('at most 500 characters'),
        ),
      }),
    )
    .output(PaymentSourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerSourcesId: t.procedure
    .input(
      type({
        customer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(type(type(CardSchema).or(BankAccountSchema)).or(SourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1CustomersCustomerSourcesId: t.procedure
    .input(
      type({
        customer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        id: 'string',
      }),
    )
    .output(type(PaymentSourceSchema).or(DeletedPaymentSourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerSourcesIdVerify: t.procedure
    .input(
      type({
        customer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(BankAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerSubscriptions: t.procedure
    .input(
      type({
        customer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(SubscriptionSchema).array().describe('Details about each object.'),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerSubscriptions: t.procedure
    .input(
      type({
        customer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(SubscriptionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerSubscriptionsSubscriptionExposedId: t.procedure
    .input(
      type({
        customer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        subscription_exposed_id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(SubscriptionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerSubscriptionsSubscriptionExposedId: t.procedure
    .input(
      type({
        customer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        subscription_exposed_id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(SubscriptionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1CustomersCustomerSubscriptionsSubscriptionExposedId: t.procedure
    .input(
      type({
        customer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        subscription_exposed_id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(SubscriptionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerSubscriptionsSubscriptionExposedIdDiscount: t.procedure
    .input(
      type({
        customer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        subscription_exposed_id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(DiscountSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1CustomersCustomerSubscriptionsSubscriptionExposedIdDiscount: t.procedure
    .input(
      type({
        customer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        subscription_exposed_id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(DeletedDiscountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerTaxIds: t.procedure
    .input(
      type({
        customer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(TaxIdSchema).array().describe('Details about each object.'),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerTaxIds: t.procedure
    .input(
      type({
        customer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TaxIdSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerTaxIdsId: t.procedure
    .input(
      type({
        customer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        id: 'string',
      }),
    )
    .output(TaxIdSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1CustomersCustomerTaxIdsId: t.procedure
    .input(
      type({
        customer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        id: 'string',
      }),
    )
    .output(DeletedTaxIdSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Disputes: t.procedure
    .input(
      type({
        'charge?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'payment_intent?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(DisputeSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/disputes/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1DisputesDispute: t.procedure
    .input(
      type({
        dispute: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
      }),
    )
    .output(DisputeSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1DisputesDispute: t.procedure
    .input(
      type({
        dispute: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(DisputeSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1DisputesDisputeClose: t.procedure
    .input(
      type({
        dispute: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(DisputeSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1EntitlementsActiveEntitlements: t.procedure
    .input(
      type({
        customer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(EntitlementsActiveEntitlementSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1EntitlementsActiveEntitlementsId: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(EntitlementsActiveEntitlementSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1EntitlementsFeatures: t.procedure
    .input(
      type({
        'archived?': 'boolean',
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'lookup_key?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(EntitlementsFeatureSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/entitlements\/features/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1EntitlementsFeatures: t.procedure.output(EntitlementsFeatureSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1EntitlementsFeaturesId: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(EntitlementsFeatureSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1EntitlementsFeaturesId: t.procedure
    .input(
      type({
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(EntitlementsFeatureSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1EphemeralKeys: t.procedure.output(EphemeralKeySchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  deleteV1EphemeralKeysKey: t.procedure
    .input(
      type({
        key: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(EphemeralKeySchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Events: t.procedure
    .input(
      type({
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'delivery_success?': 'boolean',
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'type?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'types?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
      }),
    )
    .output(
      type({
        data: type(EventSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/events/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1EventsId: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(EventSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ExchangeRates: t.procedure
    .input(
      type({
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(ExchangeRateSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/exchange_rates/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ExchangeRatesRateId: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        rate_id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(ExchangeRateSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ExternalAccountsId: t.procedure
    .input(type({ id: 'string' }))
    .output(ExternalAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1FileLinks: t.procedure
    .input(
      type({
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'ending_before?': 'string',
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'expired?': 'boolean',
        'file?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'limit?': 'number.integer',
        'starting_after?': 'string',
      }),
    )
    .output(
      type({
        data: type(FileLinkSchema).array().describe('Details about each object.'),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/file_links/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1FileLinks: t.procedure.output(FileLinkSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1FileLinksLink: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        link: 'string',
      }),
    )
    .output(FileLinkSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1FileLinksLink: t.procedure
    .input(type({ link: 'string' }))
    .output(FileLinkSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Files: t.procedure
    .input(
      type({
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'purpose?': type.enumerated(
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
        ),
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(FileSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/files/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Files: t.procedure.output(FileSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1FilesFile: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        file: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(FileSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1FinancialConnectionsAccounts: t.procedure
    .input(
      type({
        'account_holder?': type({
          'account?': type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
          'customer?': type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
          'customer_account?': type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        }),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'session?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(FinancialConnectionsAccountSchema)
          .array()
          .describe('Details about each object.'),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/financial_connections\/accounts/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1FinancialConnectionsAccountsAccount: t.procedure
    .input(
      type({
        account: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
      }),
    )
    .output(FinancialConnectionsAccountSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1FinancialConnectionsAccountsAccountDisconnect: t.procedure
    .input(
      type({
        account: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(FinancialConnectionsAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1FinancialConnectionsAccountsAccountOwners: t.procedure
    .input(
      type({
        account: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        ownership: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(FinancialConnectionsAccountOwnerSchema)
          .array()
          .describe('Details about each object.'),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1FinancialConnectionsAccountsAccountRefresh: t.procedure
    .input(
      type({
        account: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(FinancialConnectionsAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1FinancialConnectionsAccountsAccountSubscribe: t.procedure
    .input(
      type({
        account: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(FinancialConnectionsAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1FinancialConnectionsAccountsAccountUnsubscribe: t.procedure
    .input(
      type({
        account: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(FinancialConnectionsAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1FinancialConnectionsSessions: t.procedure
    .output(FinancialConnectionsSessionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1FinancialConnectionsSessionsSession: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        session: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(FinancialConnectionsSessionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1FinancialConnectionsTransactions: t.procedure
    .input(
      type({
        account: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'transacted_at?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'transaction_refresh?': type({
          after: type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        }),
      }),
    )
    .output(
      type({
        data: type(FinancialConnectionsTransactionSchema)
          .array()
          .describe('Details about each object.'),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/financial_connections\/transactions/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1FinancialConnectionsTransactionsTransaction: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        transaction: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(FinancialConnectionsTransactionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ForwardingRequests: t.procedure
    .input(
      type({
        'created?': type({
          'gt?': 'number.integer',
          'gte?': 'number.integer',
          'lt?': 'number.integer',
          'lte?': 'number.integer',
        }),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(ForwardingRequestSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe('List of ForwardingRequest data.'),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ForwardingRequests: t.procedure.output(ForwardingRequestSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1ForwardingRequestsId: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(ForwardingRequestSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IdentityVerificationReports: t.procedure
    .input(
      type({
        'client_reference_id?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'type?': "'document' | 'id_number'",
        'verification_session?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(IdentityVerificationReportSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/identity\/verification_reports/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IdentityVerificationReportsReport: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        report: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(IdentityVerificationReportSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IdentityVerificationSessions: t.procedure
    .input(
      type({
        'client_reference_id?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'related_customer?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'related_customer_account?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'status?': "'canceled' | 'processing' | 'requires_input' | 'verified'",
      }),
    )
    .output(
      type({
        data: type(IdentityVerificationSessionSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/identity\/verification_sessions/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IdentityVerificationSessions: t.procedure
    .output(IdentityVerificationSessionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IdentityVerificationSessionsSession: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        session: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(IdentityVerificationSessionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IdentityVerificationSessionsSession: t.procedure
    .input(
      type({
        session: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(IdentityVerificationSessionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IdentityVerificationSessionsSessionCancel: t.procedure
    .input(
      type({
        session: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(IdentityVerificationSessionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IdentityVerificationSessionsSessionRedact: t.procedure
    .input(
      type({
        session: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(IdentityVerificationSessionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1InvoicePayments: t.procedure
    .input(
      type({
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'invoice?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'limit?': 'number.integer',
        'payment?': type({
          'payment_intent?': type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
          'payment_record?': type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
          type: "'payment_intent' | 'payment_record'",
        }),
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'status?': "'canceled' | 'open' | 'paid'",
      }),
    )
    .output(
      type({
        data: type(InvoicePaymentSchema).array().describe('Details about each object.'),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1InvoicePaymentsInvoicePayment: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        invoice_payment: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(InvoicePaymentSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1InvoiceRenderingTemplates: t.procedure
    .input(
      type({
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'status?': "'active' | 'archived'",
      }),
    )
    .output(
      type({
        data: type(InvoiceRenderingTemplateSchema).array().describe('Details about each object.'),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1InvoiceRenderingTemplatesTemplate: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        template: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'version?': 'number.integer',
      }),
    )
    .output(InvoiceRenderingTemplateSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoiceRenderingTemplatesTemplateArchive: t.procedure
    .input(
      type({
        template: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(InvoiceRenderingTemplateSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoiceRenderingTemplatesTemplateUnarchive: t.procedure
    .input(
      type({
        template: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(InvoiceRenderingTemplateSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Invoiceitems: t.procedure
    .input(
      type({
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'customer?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'customer_account?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'invoice?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'limit?': 'number.integer',
        'pending?': 'boolean',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(InvoiceitemSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/invoiceitems/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Invoiceitems: t.procedure.output(InvoiceitemSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1InvoiceitemsInvoiceitem: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        invoiceitem: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(InvoiceitemSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoiceitemsInvoiceitem: t.procedure
    .input(
      type({
        invoiceitem: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(InvoiceitemSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1InvoiceitemsInvoiceitem: t.procedure
    .input(
      type({
        invoiceitem: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(DeletedInvoiceitemSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Invoices: t.procedure
    .input(
      type({
        'collection_method?': "'charge_automatically' | 'send_invoice'",
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'customer?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'customer_account?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'due_date?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'status?': "'draft' | 'open' | 'paid' | 'uncollectible' | 'void'",
        'subscription?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(InvoiceSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/invoices/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Invoices: t.procedure.output(InvoiceSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  postV1InvoicesCreatePreview: t.procedure.output(InvoiceSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1InvoicesSearch: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'page?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        query: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(InvoiceSchema).array(),
        has_more: 'boolean',
        'next_page?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).or('null'),
        object: type("'search_result'").describe(
          "String representing the object's type. Objects of the same type share the same value.",
        ),
        'total_count?': type('number.integer').describe(
          'The total number of objects that match the query, only accurate up to 10,000.',
        ),
        url: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1InvoicesInvoice: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        invoice: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(InvoiceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoicesInvoice: t.procedure
    .input(
      type({
        invoice: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(InvoiceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1InvoicesInvoice: t.procedure
    .input(
      type({
        invoice: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(DeletedInvoiceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoicesInvoiceAddLines: t.procedure
    .input(
      type({
        invoice: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(InvoiceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoicesInvoiceAttachPayment: t.procedure
    .input(
      type({
        invoice: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(InvoiceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoicesInvoiceFinalize: t.procedure
    .input(
      type({
        invoice: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(InvoiceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1InvoicesInvoiceLines: t.procedure
    .input(
      type({
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        invoice: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(LineItemSchema).array().describe('Details about each object.'),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoicesInvoiceLinesLineItemId: t.procedure
    .input(
      type({
        invoice: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        line_item_id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(LineItemSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoicesInvoiceMarkUncollectible: t.procedure
    .input(
      type({
        invoice: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(InvoiceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoicesInvoicePay: t.procedure
    .input(
      type({
        invoice: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(InvoiceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoicesInvoiceRemoveLines: t.procedure
    .input(
      type({
        invoice: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(InvoiceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoicesInvoiceSend: t.procedure
    .input(
      type({
        invoice: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(InvoiceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoicesInvoiceUpdateLines: t.procedure
    .input(
      type({
        invoice: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(InvoiceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoicesInvoiceVoid: t.procedure
    .input(
      type({
        invoice: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(InvoiceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingAuthorizations: t.procedure
    .input(
      type({
        'card?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'cardholder?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'status?': "'closed' | 'expired' | 'pending' | 'reversed'",
      }),
    )
    .output(
      type({
        data: type(IssuingAuthorizationSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/issuing\/authorizations/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingAuthorizationsAuthorization: t.procedure
    .input(
      type({
        authorization: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
      }),
    )
    .output(IssuingAuthorizationSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingAuthorizationsAuthorization: t.procedure
    .input(
      type({
        authorization: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(IssuingAuthorizationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingAuthorizationsAuthorizationApprove: t.procedure
    .input(
      type({
        authorization: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(IssuingAuthorizationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingAuthorizationsAuthorizationDecline: t.procedure
    .input(
      type({
        authorization: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(IssuingAuthorizationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingCardholders: t.procedure
    .input(
      type({
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'email?': 'string',
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'phone_number?': 'string',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'status?': "'active' | 'blocked' | 'inactive'",
        'type?': "'company' | 'individual'",
      }),
    )
    .output(
      type({
        data: type(IssuingCardholderSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/issuing\/cardholders/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingCardholders: t.procedure.output(IssuingCardholderSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1IssuingCardholdersCardholder: t.procedure
    .input(
      type({
        cardholder: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
      }),
    )
    .output(IssuingCardholderSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingCardholdersCardholder: t.procedure
    .input(
      type({
        cardholder: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(IssuingCardholderSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingCards: t.procedure
    .input(
      type({
        'cardholder?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'exp_month?': 'number.integer',
        'exp_year?': 'number.integer',
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'last4?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'limit?': 'number.integer',
        'personalization_design?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'status?': "'active' | 'canceled' | 'inactive'",
        'type?': "'physical' | 'virtual'",
      }),
    )
    .output(
      type({
        data: type(IssuingCardSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/issuing\/cards/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingCards: t.procedure.output(IssuingCardSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1IssuingCardsCard: t.procedure
    .input(
      type({
        card: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
      }),
    )
    .output(IssuingCardSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingCardsCard: t.procedure
    .input(
      type({
        card: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(IssuingCardSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingDisputes: t.procedure
    .input(
      type({
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'status?': "'expired' | 'lost' | 'submitted' | 'unsubmitted' | 'won'",
        'transaction?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(IssuingDisputeSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/issuing\/disputes/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingDisputes: t.procedure.output(IssuingDisputeSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1IssuingDisputesDispute: t.procedure
    .input(
      type({
        dispute: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
      }),
    )
    .output(IssuingDisputeSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingDisputesDispute: t.procedure
    .input(
      type({
        dispute: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(IssuingDisputeSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingDisputesDisputeSubmit: t.procedure
    .input(
      type({
        dispute: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(IssuingDisputeSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingPersonalizationDesigns: t.procedure
    .input(
      type({
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'lookup_keys?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 200 || ctx.mustBe('at most 200 characters'),
          ),
        ).array(),
        'preferences?': type({ 'is_default?': 'boolean', 'is_platform_default?': 'boolean' }),
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'status?': "'active' | 'inactive' | 'rejected' | 'review'",
      }),
    )
    .output(
      type({
        data: type(IssuingPersonalizationDesignSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/issuing\/personalization_designs/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingPersonalizationDesigns: t.procedure
    .output(IssuingPersonalizationDesignSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingPersonalizationDesignsPersonalizationDesign: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        personalization_design: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(IssuingPersonalizationDesignSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingPersonalizationDesignsPersonalizationDesign: t.procedure
    .input(
      type({
        personalization_design: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(IssuingPersonalizationDesignSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingPhysicalBundles: t.procedure
    .input(
      type({
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'status?': "'active' | 'inactive' | 'review'",
        'type?': "'custom' | 'standard'",
      }),
    )
    .output(
      type({
        data: type(IssuingPhysicalBundleSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/issuing\/physical_bundles/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingPhysicalBundlesPhysicalBundle: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        physical_bundle: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(IssuingPhysicalBundleSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingSettlementsSettlement: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        settlement: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(IssuingSettlementSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingSettlementsSettlement: t.procedure
    .input(
      type({
        settlement: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(IssuingSettlementSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingTokens: t.procedure
    .input(
      type({
        card: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'status?': "'active' | 'deleted' | 'requested' | 'suspended'",
      }),
    )
    .output(
      type({
        data: type(IssuingTokenSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingTokensToken: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        token: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(IssuingTokenSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingTokensToken: t.procedure
    .input(
      type({
        token: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(IssuingTokenSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingTransactions: t.procedure
    .input(
      type({
        'card?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'cardholder?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'type?': "'capture' | 'refund'",
      }),
    )
    .output(
      type({
        data: type(IssuingTransactionSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/issuing\/transactions/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingTransactionsTransaction: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        transaction: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(IssuingTransactionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingTransactionsTransaction: t.procedure
    .input(
      type({
        transaction: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(IssuingTransactionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1LinkAccountSessions: t.procedure.output(FinancialConnectionsSessionSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1LinkAccountSessionsSession: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        session: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(FinancialConnectionsSessionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1LinkedAccounts: t.procedure
    .input(
      type({
        'account_holder?': type({
          'account?': type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
          'customer?': type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
          'customer_account?': type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        }),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'session?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(FinancialConnectionsAccountSchema)
          .array()
          .describe('Details about each object.'),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/financial_connections\/accounts/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1LinkedAccountsAccount: t.procedure
    .input(
      type({
        account: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
      }),
    )
    .output(FinancialConnectionsAccountSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1LinkedAccountsAccountDisconnect: t.procedure
    .input(
      type({
        account: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(FinancialConnectionsAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1LinkedAccountsAccountOwners: t.procedure
    .input(
      type({
        account: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        ownership: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(FinancialConnectionsAccountOwnerSchema)
          .array()
          .describe('Details about each object.'),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1LinkedAccountsAccountRefresh: t.procedure
    .input(
      type({
        account: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(FinancialConnectionsAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1MandatesMandate: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        mandate: 'string',
      }),
    )
    .output(MandateSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentAttemptRecords: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        payment_record: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(PaymentAttemptRecordSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe('A list of PaymentAttemptRecords.'),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentAttemptRecordsId: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(PaymentAttemptRecordSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentIntents: t.procedure
    .input(
      type({
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'customer?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'customer_account?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(PaymentIntentSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/payment_intents/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentIntents: t.procedure.output(PaymentIntentSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1PaymentIntentsSearch: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'page?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        query: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(PaymentIntentSchema).array(),
        has_more: 'boolean',
        'next_page?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).or('null'),
        object: type("'search_result'").describe(
          "String representing the object's type. Objects of the same type share the same value.",
        ),
        'total_count?': type('number.integer').describe(
          'The total number of objects that match the query, only accurate up to 10,000.',
        ),
        url: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentIntentsIntent: t.procedure
    .input(
      type({
        'client_secret?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        intent: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(PaymentIntentSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentIntentsIntent: t.procedure
    .input(
      type({
        intent: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(PaymentIntentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentIntentsIntentAmountDetailsLineItems: t.procedure
    .input(
      type({
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        intent: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(PaymentIntentAmountDetailsLineItemSchema)
          .array()
          .describe('Details about each object.'),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentIntentsIntentApplyCustomerBalance: t.procedure
    .input(
      type({
        intent: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(PaymentIntentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentIntentsIntentCancel: t.procedure
    .input(
      type({
        intent: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(PaymentIntentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentIntentsIntentCapture: t.procedure
    .input(
      type({
        intent: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(PaymentIntentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentIntentsIntentConfirm: t.procedure
    .input(
      type({
        intent: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(PaymentIntentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentIntentsIntentIncrementAuthorization: t.procedure
    .input(
      type({
        intent: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(PaymentIntentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentIntentsIntentVerifyMicrodeposits: t.procedure
    .input(
      type({
        intent: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(PaymentIntentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentLinks: t.procedure
    .input(
      type({
        'active?': 'boolean',
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(PaymentLinkSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/payment_links/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentLinks: t.procedure.output(PaymentLinkSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1PaymentLinksPaymentLink: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        payment_link: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(PaymentLinkSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentLinksPaymentLink: t.procedure
    .input(
      type({
        payment_link: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(PaymentLinkSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentLinksPaymentLinkLineItems: t.procedure
    .input(
      type({
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        payment_link: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(ItemSchema).array().describe('Details about each object.'),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentMethodConfigurations: t.procedure
    .input(
      type({
        'active?': 'boolean',
        'application?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
          ),
        ).or("''"),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(PaymentMethodConfigurationSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/payment_method_configurations/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentMethodConfigurations: t.procedure
    .output(PaymentMethodConfigurationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentMethodConfigurationsConfiguration: t.procedure
    .input(
      type({
        configuration: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
      }),
    )
    .output(PaymentMethodConfigurationSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentMethodConfigurationsConfiguration: t.procedure
    .input(
      type({
        configuration: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(PaymentMethodConfigurationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentMethodDomains: t.procedure
    .input(
      type({
        'domain_name?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'enabled?': 'boolean',
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(PaymentMethodDomainSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/payment_method_domains/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentMethodDomains: t.procedure.output(PaymentMethodDomainSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1PaymentMethodDomainsPaymentMethodDomain: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        payment_method_domain: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(PaymentMethodDomainSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentMethodDomainsPaymentMethodDomain: t.procedure
    .input(
      type({
        payment_method_domain: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(PaymentMethodDomainSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentMethodDomainsPaymentMethodDomainValidate: t.procedure
    .input(
      type({
        payment_method_domain: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(PaymentMethodDomainSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentMethods: t.procedure
    .input(
      type({
        'allow_redisplay?': "'always' | 'limited' | 'unspecified'",
        'customer?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'customer_account?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'type?': type.enumerated(
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
        ),
      }),
    )
    .output(
      type({
        data: type(PaymentMethodSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/payment_methods/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentMethods: t.procedure.output(PaymentMethodSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1PaymentMethodsPaymentMethod: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        payment_method: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(PaymentMethodSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentMethodsPaymentMethod: t.procedure
    .input(
      type({
        payment_method: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(PaymentMethodSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentMethodsPaymentMethodAttach: t.procedure
    .input(
      type({
        payment_method: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(PaymentMethodSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentMethodsPaymentMethodDetach: t.procedure
    .input(
      type({
        payment_method: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(PaymentMethodSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentRecords: t.procedure
    .input(
      type({
        'created_after?': 'number.integer',
        'created_before?': 'number.integer',
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(PaymentRecordSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe('A list of PaymentRecords.'),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentRecordsReportPayment: t.procedure.output(PaymentRecordSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1PaymentRecordsId: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(PaymentRecordSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentRecordsIdReportPaymentAttempt: t.procedure
    .input(
      type({
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(PaymentRecordSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentRecordsIdReportPaymentAttemptCanceled: t.procedure
    .input(
      type({
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(PaymentRecordSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentRecordsIdReportPaymentAttemptFailed: t.procedure
    .input(
      type({
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(PaymentRecordSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentRecordsIdReportPaymentAttemptGuaranteed: t.procedure
    .input(
      type({
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(PaymentRecordSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentRecordsIdReportPaymentAttemptInformational: t.procedure
    .input(
      type({
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(PaymentRecordSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentRecordsIdReportRefund: t.procedure
    .input(
      type({
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(PaymentRecordSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Payouts: t.procedure
    .input(
      type({
        'arrival_date?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'destination?': 'string',
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'status?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(PayoutSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/payouts/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Payouts: t.procedure.output(PayoutSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1PayoutsPayout: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        payout: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(PayoutSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PayoutsPayout: t.procedure
    .input(
      type({
        payout: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(PayoutSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PayoutsPayoutCancel: t.procedure
    .input(
      type({
        payout: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(PayoutSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PayoutsPayoutReverse: t.procedure
    .input(
      type({
        payout: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(PayoutSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Plans: t.procedure
    .input(
      type({
        'active?': 'boolean',
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'product?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(PlanSchema).array().describe('Details about each object.'),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/plans/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Plans: t.procedure.output(PlanSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1PlansPlan: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        plan: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(PlanSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PlansPlan: t.procedure
    .input(
      type({
        plan: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(PlanSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1PlansPlan: t.procedure
    .input(
      type({
        plan: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(DeletedPlanSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Prices: t.procedure
    .input(
      type({
        'active?': 'boolean',
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'currency?': 'string',
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'lookup_keys?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'product?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'recurring?': type({
          'interval?': "'day' | 'month' | 'week' | 'year'",
          'meter?': type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
          'usage_type?': "'licensed' | 'metered'",
        }),
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'type?': "'one_time' | 'recurring'",
      }),
    )
    .output(
      type({
        data: type(PriceSchema).array().describe('Details about each object.'),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/prices/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Prices: t.procedure.output(PriceSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1PricesSearch: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'page?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        query: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(PriceSchema).array(),
        has_more: 'boolean',
        'next_page?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).or('null'),
        object: type("'search_result'").describe(
          "String representing the object's type. Objects of the same type share the same value.",
        ),
        'total_count?': type('number.integer').describe(
          'The total number of objects that match the query, only accurate up to 10,000.',
        ),
        url: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PricesPrice: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        price: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(PriceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PricesPrice: t.procedure
    .input(
      type({
        price: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(PriceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ProductCatalogTrialOffers: t.procedure
    .input(
      type({
        'active?': 'boolean',
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'prices?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(ProductCatalogTrialOfferSchema).array().describe('Details about each object.'),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ProductCatalogTrialOffers: t.procedure
    .output(ProductCatalogTrialOfferSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ProductCatalogTrialOffersId: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(ProductCatalogTrialOfferSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ProductCatalogTrialOffersId: t.procedure
    .input(
      type({
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(ProductCatalogTrialOfferSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Products: t.procedure
    .input(
      type({
        'active?': 'boolean',
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'ids?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'shippable?': 'boolean',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'url?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(ProductSchema).array().describe('Details about each object.'),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/products/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Products: t.procedure.output(ProductSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1ProductsSearch: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'page?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        query: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(ProductSchema).array(),
        has_more: 'boolean',
        'next_page?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).or('null'),
        object: type("'search_result'").describe(
          "String representing the object's type. Objects of the same type share the same value.",
        ),
        'total_count?': type('number.integer').describe(
          'The total number of objects that match the query, only accurate up to 10,000.',
        ),
        url: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ProductsId: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(ProductSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ProductsId: t.procedure
    .input(
      type({
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(ProductSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1ProductsId: t.procedure
    .input(
      type({
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(DeletedProductSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ProductsProductFeatures: t.procedure
    .input(
      type({
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        product: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(ProductFeatureSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ProductsProductFeatures: t.procedure
    .input(
      type({
        product: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(ProductFeatureSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ProductsProductFeaturesId: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        product: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(ProductFeatureSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1ProductsProductFeaturesId: t.procedure
    .input(
      type({
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        product: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(DeletedProductFeatureSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PromotionCodes: t.procedure
    .input(
      type({
        'active?': 'boolean',
        'code?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'coupon?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'customer?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'customer_account?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(PromotionCodeSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/promotion_codes/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PromotionCodes: t.procedure.output(PromotionCodeSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1PromotionCodesPromotionCode: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        promotion_code: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(PromotionCodeSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PromotionCodesPromotionCode: t.procedure
    .input(
      type({
        promotion_code: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(PromotionCodeSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Quotes: t.procedure
    .input(
      type({
        'customer?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'customer_account?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'status?': "'accepted' | 'canceled' | 'draft' | 'open'",
        'test_clock?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(QuoteSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/quotes/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Quotes: t.procedure.output(QuoteSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1QuotesQuote: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        quote: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(QuoteSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1QuotesQuote: t.procedure
    .input(
      type({
        quote: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(QuoteSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1QuotesQuoteAccept: t.procedure
    .input(
      type({
        quote: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(QuoteSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1QuotesQuoteCancel: t.procedure
    .input(
      type({
        quote: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(QuoteSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1QuotesQuoteComputedUpfrontLineItems: t.procedure
    .input(
      type({
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        quote: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(ItemSchema).array().describe('Details about each object.'),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1QuotesQuoteFinalize: t.procedure
    .input(
      type({
        quote: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(QuoteSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1QuotesQuoteLineItems: t.procedure
    .input(
      type({
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        quote: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(ItemSchema).array().describe('Details about each object.'),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1QuotesQuotePdf: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        quote: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1RadarEarlyFraudWarnings: t.procedure
    .input(
      type({
        'charge?': 'string',
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'payment_intent?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(RadarEarlyFraudWarningSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/radar\/early_fraud_warnings/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1RadarEarlyFraudWarningsEarlyFraudWarning: t.procedure
    .input(
      type({
        early_fraud_warning: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
      }),
    )
    .output(RadarEarlyFraudWarningSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1RadarPaymentEvaluations: t.procedure.output(RadarPaymentEvaluationSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1RadarValueListItems: t.procedure
    .input(
      type({
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'value?': type('string').narrow(
          (data, ctx) => [...data].length <= 800 || ctx.mustBe('at most 800 characters'),
        ),
        value_list: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(RadarValueListItemSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/radar\/value_list_items/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1RadarValueListItems: t.procedure.output(RadarValueListItemSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1RadarValueListItemsItem: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        item: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(RadarValueListItemSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1RadarValueListItemsItem: t.procedure
    .input(
      type({
        item: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(DeletedRadarValueListItemSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1RadarValueLists: t.procedure
    .input(
      type({
        'alias?': type('string').narrow(
          (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
        ),
        'contains?': type('string').narrow(
          (data, ctx) => [...data].length <= 800 || ctx.mustBe('at most 800 characters'),
        ),
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(RadarValueListSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/radar\/value_lists/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1RadarValueLists: t.procedure.output(RadarValueListSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1RadarValueListsValueList: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        value_list: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(RadarValueListSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1RadarValueListsValueList: t.procedure
    .input(
      type({
        value_list: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(RadarValueListSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1RadarValueListsValueList: t.procedure
    .input(
      type({
        value_list: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(DeletedRadarValueListSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Refunds: t.procedure
    .input(
      type({
        'charge?': 'string',
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'ending_before?': 'string',
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'payment_intent?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'starting_after?': 'string',
      }),
    )
    .output(
      type({
        data: type(RefundSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/refunds/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Refunds: t.procedure.output(RefundSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1RefundsRefund: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        refund: 'string',
      }),
    )
    .output(RefundSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1RefundsRefund: t.procedure
    .input(type({ refund: 'string' }))
    .output(RefundSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1RefundsRefundCancel: t.procedure
    .input(type({ refund: 'string' }))
    .output(RefundSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ReportingReportRuns: t.procedure
    .input(
      type({
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(ReportingReportRunSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/reporting\/report_runs/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ReportingReportRuns: t.procedure.output(ReportingReportRunSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1ReportingReportRunsReportRun: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        report_run: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(ReportingReportRunSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ReportingReportTypes: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
      }),
    )
    .output(
      type({
        data: type(ReportingReportTypeSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ReportingReportTypesReportType: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        report_type: 'string',
      }),
    )
    .output(ReportingReportTypeSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Reviews: t.procedure
    .input(
      type({
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(ReviewSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ReviewsReview: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        review: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(ReviewSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ReviewsReviewApprove: t.procedure
    .input(
      type({
        review: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(ReviewSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1SetupAttempts: t.procedure
    .input(
      type({
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        setup_intent: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(SetupAttemptSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/setup_attempts/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1SetupIntents: t.procedure
    .input(
      type({
        'attach_to_self?': 'boolean',
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'customer?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'customer_account?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'payment_method?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(SetupIntentSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/setup_intents/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SetupIntents: t.procedure.output(SetupIntentSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1SetupIntentsIntent: t.procedure
    .input(
      type({
        'client_secret?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        intent: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(SetupIntentSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SetupIntentsIntent: t.procedure
    .input(
      type({
        intent: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(SetupIntentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SetupIntentsIntentCancel: t.procedure
    .input(
      type({
        intent: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(SetupIntentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SetupIntentsIntentConfirm: t.procedure
    .input(
      type({
        intent: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(SetupIntentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SetupIntentsIntentVerifyMicrodeposits: t.procedure
    .input(
      type({
        intent: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(SetupIntentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ShippingRates: t.procedure
    .input(
      type({
        'active?': 'boolean',
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'currency?': 'string',
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(ShippingRateSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/shipping_rates/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ShippingRates: t.procedure.output(ShippingRateSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1ShippingRatesShippingRateToken: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        shipping_rate_token: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(ShippingRateSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ShippingRatesShippingRateToken: t.procedure
    .input(
      type({
        shipping_rate_token: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(ShippingRateSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SigmaSavedQueriesId: t.procedure
    .input(
      type({
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(SigmaSigmaApiQuerySchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1SigmaScheduledQueryRuns: t.procedure
    .input(
      type({
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(ScheduledQueryRunSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/sigma\/scheduled_query_runs/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1SigmaScheduledQueryRunsScheduledQueryRun: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        scheduled_query_run: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(ScheduledQueryRunSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Sources: t.procedure.output(SourceSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1SourcesSource: t.procedure
    .input(
      type({
        'client_secret?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        source: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(SourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SourcesSource: t.procedure
    .input(
      type({
        source: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(SourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1SourcesSourceMandateNotificationsMandateNotification: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        mandate_notification: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        source: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(SourceMandateNotificationSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1SourcesSourceSourceTransactions: t.procedure
    .input(
      type({
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        source: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(SourceTransactionSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1SourcesSourceSourceTransactionsSourceTransaction: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        source: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        source_transaction: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(SourceTransactionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SourcesSourceVerify: t.procedure
    .input(
      type({
        source: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(SourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1SubscriptionItems: t.procedure
    .input(
      type({
        'ending_before?': 'string',
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': 'string',
        subscription: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(SubscriptionItemSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/subscription_items/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SubscriptionItems: t.procedure.output(SubscriptionItemSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1SubscriptionItemsItem: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        item: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(SubscriptionItemSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SubscriptionItemsItem: t.procedure
    .input(
      type({
        item: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(SubscriptionItemSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1SubscriptionItemsItem: t.procedure
    .input(
      type({
        item: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(DeletedSubscriptionItemSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1SubscriptionSchedules: t.procedure
    .input(
      type({
        'canceled_at?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'completed_at?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'customer?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'customer_account?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'released_at?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'scheduled?': 'boolean',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(SubscriptionScheduleSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/subscription_schedules/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SubscriptionSchedules: t.procedure.output(SubscriptionScheduleSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1SubscriptionSchedulesSchedule: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        schedule: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(SubscriptionScheduleSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SubscriptionSchedulesSchedule: t.procedure
    .input(
      type({
        schedule: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(SubscriptionScheduleSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SubscriptionSchedulesScheduleCancel: t.procedure
    .input(
      type({
        schedule: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(SubscriptionScheduleSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SubscriptionSchedulesScheduleRelease: t.procedure
    .input(
      type({
        schedule: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(SubscriptionScheduleSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Subscriptions: t.procedure
    .input(
      type({
        'automatic_tax?': type({ enabled: 'boolean' }),
        'collection_method?': "'charge_automatically' | 'send_invoice'",
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'current_period_end?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'current_period_start?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'customer?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'customer_account?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'price?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'status?':
          "'active' | 'all' | 'canceled' | 'ended' | 'incomplete' | 'incomplete_expired' | 'past_due' | 'paused' | 'trialing' | 'unpaid'",
        'test_clock?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(SubscriptionSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/subscriptions/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Subscriptions: t.procedure.output(SubscriptionSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1SubscriptionsSearch: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'page?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        query: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(SubscriptionSchema).array(),
        has_more: 'boolean',
        'next_page?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).or('null'),
        object: type("'search_result'").describe(
          "String representing the object's type. Objects of the same type share the same value.",
        ),
        'total_count?': type('number.integer').describe(
          'The total number of objects that match the query, only accurate up to 10,000.',
        ),
        url: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1SubscriptionsSubscriptionExposedId: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        subscription_exposed_id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(SubscriptionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SubscriptionsSubscriptionExposedId: t.procedure
    .input(
      type({
        subscription_exposed_id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(SubscriptionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1SubscriptionsSubscriptionExposedId: t.procedure
    .input(
      type({
        subscription_exposed_id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(SubscriptionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1SubscriptionsSubscriptionExposedIdDiscount: t.procedure
    .input(
      type({
        subscription_exposed_id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(DeletedDiscountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SubscriptionsSubscriptionMigrate: t.procedure
    .input(
      type({
        subscription: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(SubscriptionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SubscriptionsSubscriptionPause: t.procedure
    .input(
      type({
        subscription: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(SubscriptionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SubscriptionsSubscriptionResume: t.procedure
    .input(
      type({
        subscription: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(SubscriptionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TaxAssociationsFind: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        payment_intent: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TaxAssociationSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TaxCalculations: t.procedure.output(TaxCalculationSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TaxCalculationsCalculation: t.procedure
    .input(
      type({
        calculation: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
      }),
    )
    .output(TaxCalculationSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TaxCalculationsCalculationLineItems: t.procedure
    .input(
      type({
        calculation: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 500 || ctx.mustBe('at most 500 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 500 || ctx.mustBe('at most 500 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(TaxCalculationLineItemSchema).array().describe('Details about each object.'),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/tax\/calculations\/[^\/]+\/line_items/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TaxLocations: t.procedure
    .input(
      type({
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        type: "'performance'",
      }),
    )
    .output(
      type({
        data: type(TaxLocationSchema).array().describe('Details about each object.'),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/tax\/locations/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TaxLocations: t.procedure.output(TaxLocationSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TaxLocationsLocation: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        location: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TaxLocationSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TaxRegistrations: t.procedure
    .input(
      type({
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'status?': "'active' | 'all' | 'expired' | 'scheduled'",
      }),
    )
    .output(
      type({
        data: type(TaxRegistrationSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/tax\/registrations/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TaxRegistrations: t.procedure.output(TaxRegistrationSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TaxRegistrationsId: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TaxRegistrationSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TaxRegistrationsId: t.procedure
    .input(
      type({
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TaxRegistrationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TaxSettings: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
      }),
    )
    .output(TaxSettingsSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TaxSettings: t.procedure.output(TaxSettingsSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  postV1TaxTransactionsCreateFromCalculation: t.procedure
    .output(TaxTransactionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TaxTransactionsCreateReversal: t.procedure.output(TaxTransactionSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TaxTransactionsTransaction: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        transaction: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TaxTransactionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TaxTransactionsTransactionLineItems: t.procedure
    .input(
      type({
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 500 || ctx.mustBe('at most 500 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 500 || ctx.mustBe('at most 500 characters'),
        ),
        transaction: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(TaxTransactionLineItemSchema).array().describe('Details about each object.'),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/tax\/transactions\/[^\/]+\/line_items/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TaxCodes: t.procedure
    .input(
      type({
        'ending_before?': 'string',
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': 'string',
      }),
    )
    .output(
      type({
        data: type(TaxCodeSchema).array().describe('Details about each object.'),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TaxCodesId: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TaxCodeSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TaxIds: t.procedure
    .input(
      type({
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'owner?': type({
          'account?': 'string',
          'customer?': type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
          'customer_account?': type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
          type: "'account' | 'application' | 'customer' | 'self'",
        }),
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(TaxIdSchema).array().describe('Details about each object.'),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TaxIds: t.procedure.output(TaxIdSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TaxIdsId: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TaxIdSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1TaxIdsId: t.procedure
    .input(
      type({
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(DeletedTaxIdSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TaxRates: t.procedure
    .input(
      type({
        'active?': 'boolean',
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'inclusive?': 'boolean',
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(TaxRateSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/tax_rates/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TaxRates: t.procedure.output(TaxRateSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TaxRatesTaxRate: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        tax_rate: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TaxRateSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TaxRatesTaxRate: t.procedure
    .input(
      type({
        tax_rate: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TaxRateSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TerminalConfigurations: t.procedure
    .input(
      type({
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'is_account_default?': 'boolean',
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(TerminalConfigurationSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/terminal\/configurations/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalConfigurations: t.procedure.output(TerminalConfigurationSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TerminalConfigurationsConfiguration: t.procedure
    .input(
      type({
        configuration: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
      }),
    )
    .output(type(TerminalConfigurationSchema).or(DeletedTerminalConfigurationSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalConfigurationsConfiguration: t.procedure
    .input(
      type({
        configuration: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(type(TerminalConfigurationSchema).or(DeletedTerminalConfigurationSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1TerminalConfigurationsConfiguration: t.procedure
    .input(
      type({
        configuration: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(DeletedTerminalConfigurationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalConnectionTokens: t.procedure.output(TerminalConnectionTokenSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TerminalLocations: t.procedure
    .input(
      type({
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(TerminalLocationSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/terminal\/locations/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalLocations: t.procedure.output(TerminalLocationSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TerminalLocationsLocation: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        location: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(type(TerminalLocationSchema).or(DeletedTerminalLocationSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalLocationsLocation: t.procedure
    .input(
      type({
        location: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(type(TerminalLocationSchema).or(DeletedTerminalLocationSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1TerminalLocationsLocation: t.procedure
    .input(
      type({
        location: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(DeletedTerminalLocationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalOnboardingLinks: t.procedure.output(TerminalOnboardingLinkSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TerminalReaders: t.procedure
    .input(
      type({
        'device_type?': type.enumerated(
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
        ),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'location?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'serial_number?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'status?': "'offline' | 'online'",
      }),
    )
    .output(
      type({
        data: type(TerminalReaderSchema).array().describe('A list of readers'),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalReaders: t.procedure.output(TerminalReaderSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TerminalReadersReader: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        reader: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(type(TerminalReaderSchema).or(DeletedTerminalReaderSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalReadersReader: t.procedure
    .input(
      type({
        reader: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(type(TerminalReaderSchema).or(DeletedTerminalReaderSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1TerminalReadersReader: t.procedure
    .input(
      type({
        reader: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(DeletedTerminalReaderSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalReadersReaderCancelAction: t.procedure
    .input(
      type({
        reader: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(type(TerminalReaderSchema).or(DeletedTerminalReaderSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalReadersReaderCollectInputs: t.procedure
    .input(
      type({
        reader: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TerminalReaderSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalReadersReaderCollectPaymentMethod: t.procedure
    .input(
      type({
        reader: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TerminalReaderSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalReadersReaderConfirmPaymentIntent: t.procedure
    .input(
      type({
        reader: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TerminalReaderSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalReadersReaderProcessPaymentIntent: t.procedure
    .input(
      type({
        reader: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TerminalReaderSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalReadersReaderProcessSetupIntent: t.procedure
    .input(
      type({
        reader: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TerminalReaderSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalReadersReaderRefundPayment: t.procedure
    .input(
      type({
        reader: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TerminalReaderSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalReadersReaderSetReaderDisplay: t.procedure
    .input(
      type({
        reader: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TerminalReaderSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalRefunds: t.procedure.output(TerminalRefundSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  postV1TestHelpersConfirmationTokens: t.procedure.output(ConfirmationTokenSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  postV1TestHelpersCustomersCustomerFundCashBalance: t.procedure
    .input(
      type({
        customer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(CustomerCashBalanceTransactionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingAuthorizations: t.procedure
    .output(IssuingAuthorizationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingAuthorizationsAuthorizationCapture: t.procedure
    .input(
      type({
        authorization: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(IssuingAuthorizationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingAuthorizationsAuthorizationExpire: t.procedure
    .input(
      type({
        authorization: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(IssuingAuthorizationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingAuthorizationsAuthorizationFinalizeAmount: t.procedure
    .input(
      type({
        authorization: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(IssuingAuthorizationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingAuthorizationsAuthorizationFraudChallengesRespond: t.procedure
    .input(
      type({
        authorization: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(IssuingAuthorizationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingAuthorizationsAuthorizationIncrement: t.procedure
    .input(
      type({
        authorization: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(IssuingAuthorizationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingAuthorizationsAuthorizationReverse: t.procedure
    .input(
      type({
        authorization: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(IssuingAuthorizationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingCardsCardShippingDeliver: t.procedure
    .input(
      type({
        card: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(IssuingCardSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingCardsCardShippingFail: t.procedure
    .input(
      type({
        card: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(IssuingCardSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingCardsCardShippingReturn: t.procedure
    .input(
      type({
        card: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(IssuingCardSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingCardsCardShippingShip: t.procedure
    .input(
      type({
        card: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(IssuingCardSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingCardsCardShippingSubmit: t.procedure
    .input(
      type({
        card: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(IssuingCardSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingPersonalizationDesignsPersonalizationDesignActivate: t.procedure
    .input(
      type({
        personalization_design: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(IssuingPersonalizationDesignSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingPersonalizationDesignsPersonalizationDesignDeactivate: t.procedure
    .input(
      type({
        personalization_design: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(IssuingPersonalizationDesignSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingPersonalizationDesignsPersonalizationDesignReject: t.procedure
    .input(
      type({
        personalization_design: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(IssuingPersonalizationDesignSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingSettlements: t.procedure.output(IssuingSettlementSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  postV1TestHelpersIssuingSettlementsSettlementComplete: t.procedure
    .input(
      type({
        settlement: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(IssuingSettlementSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingTransactionsCreateForceCapture: t.procedure
    .output(IssuingTransactionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingTransactionsCreateUnlinkedRefund: t.procedure
    .output(IssuingTransactionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingTransactionsTransactionRefund: t.procedure
    .input(
      type({
        transaction: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(IssuingTransactionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersRefundsRefundExpire: t.procedure
    .input(type({ refund: 'string' }))
    .output(RefundSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTerminalReadersReaderPresentPaymentMethod: t.procedure
    .input(
      type({
        reader: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TerminalReaderSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTerminalReadersReaderSucceedInputCollection: t.procedure
    .input(
      type({
        reader: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TerminalReaderSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTerminalReadersReaderTimeoutInputCollection: t.procedure
    .input(
      type({
        reader: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TerminalReaderSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TestHelpersTestClocks: t.procedure
    .input(
      type({
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(TestHelpersTestClockSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/test_helpers\/test_clocks/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTestClocks: t.procedure.output(TestHelpersTestClockSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TestHelpersTestClocksTestClock: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        test_clock: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TestHelpersTestClockSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1TestHelpersTestClocksTestClock: t.procedure
    .input(
      type({
        test_clock: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(DeletedTestHelpersTestClockSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTestClocksTestClockAdvance: t.procedure
    .input(
      type({
        test_clock: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TestHelpersTestClockSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTreasuryInboundTransfersIdFail: t.procedure
    .input(
      type({
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TreasuryInboundTransferSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTreasuryInboundTransfersIdReturn: t.procedure
    .input(
      type({
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TreasuryInboundTransferSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTreasuryInboundTransfersIdSucceed: t.procedure
    .input(
      type({
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TreasuryInboundTransferSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTreasuryOutboundPaymentsId: t.procedure
    .input(
      type({
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TreasuryOutboundPaymentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTreasuryOutboundPaymentsIdFail: t.procedure
    .input(
      type({
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TreasuryOutboundPaymentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTreasuryOutboundPaymentsIdPost: t.procedure
    .input(
      type({
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TreasuryOutboundPaymentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTreasuryOutboundPaymentsIdReturn: t.procedure
    .input(
      type({
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TreasuryOutboundPaymentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTreasuryOutboundTransfersOutboundTransfer: t.procedure
    .input(
      type({
        outbound_transfer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TreasuryOutboundTransferSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTreasuryOutboundTransfersOutboundTransferFail: t.procedure
    .input(
      type({
        outbound_transfer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TreasuryOutboundTransferSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTreasuryOutboundTransfersOutboundTransferPost: t.procedure
    .input(
      type({
        outbound_transfer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TreasuryOutboundTransferSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTreasuryOutboundTransfersOutboundTransferReturn: t.procedure
    .input(
      type({
        outbound_transfer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TreasuryOutboundTransferSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTreasuryReceivedCredits: t.procedure
    .output(TreasuryReceivedCreditSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTreasuryReceivedDebits: t.procedure
    .output(TreasuryReceivedDebitSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ThreeDSecureAuthentications: t.procedure
    .input(
      type({
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'status?':
          "'canceled' | 'error' | 'failed' | 'requires_challenge' | 'requires_submission' | 'succeeded'",
      }),
    )
    .output(
      type({
        data: type(ThreeDSecureAuthenticationSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/three_d_secure\/authentications/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ThreeDSecureAuthentications: t.procedure
    .output(ThreeDSecureAuthenticationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ThreeDSecureAuthenticationsAuthentication: t.procedure
    .input(
      type({
        authentication: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
      }),
    )
    .output(ThreeDSecureAuthenticationSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ThreeDSecureAuthenticationsAuthenticationCancel: t.procedure
    .input(
      type({
        authentication: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(ThreeDSecureAuthenticationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ThreeDSecureAuthenticationsAuthenticationSubmit: t.procedure
    .input(
      type({
        authentication: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(ThreeDSecureAuthenticationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Tokens: t.procedure.output(TokenSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TokensToken: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        token: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TokenSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Topups: t.procedure
    .input(
      type({
        'amount?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'status?': "'canceled' | 'failed' | 'pending' | 'succeeded'",
      }),
    )
    .output(
      type({
        data: type(TopupSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/topups/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Topups: t.procedure.output(TopupSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TopupsTopup: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        topup: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TopupSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TopupsTopup: t.procedure
    .input(
      type({
        topup: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TopupSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TopupsTopupCancel: t.procedure
    .input(
      type({
        topup: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TopupSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Transfers: t.procedure
    .input(
      type({
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'destination?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'transfer_group?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(TransferSchema).array().describe('Details about each object.'),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/transfers/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Transfers: t.procedure.output(TransferSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TransfersIdReversals: t.procedure
    .input(
      type({
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(TransferReversalSchema).array().describe('Details about each object.'),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TransfersIdReversals: t.procedure
    .input(
      type({
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TransferReversalSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TransfersTransfer: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        transfer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TransferSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TransfersTransfer: t.procedure
    .input(
      type({
        transfer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TransferSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TransfersTransferReversalsId: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        transfer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TransferReversalSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TransfersTransferReversalsId: t.procedure
    .input(
      type({
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        transfer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TransferReversalSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryCreditReversals: t.procedure
    .input(
      type({
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        financial_account: 'string',
        'limit?': 'number.integer',
        'received_credit?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'status?': "'canceled' | 'posted' | 'processing'",
      }),
    )
    .output(
      type({
        data: type(TreasuryCreditReversalSchema).array().describe('Details about each object.'),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TreasuryCreditReversals: t.procedure.output(TreasuryCreditReversalSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TreasuryCreditReversalsCreditReversal: t.procedure
    .input(
      type({
        credit_reversal: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
      }),
    )
    .output(TreasuryCreditReversalSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryDebitReversals: t.procedure
    .input(
      type({
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        financial_account: 'string',
        'limit?': 'number.integer',
        'received_debit?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'resolution?': "'lost' | 'won'",
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'status?': "'canceled' | 'completed' | 'processing'",
      }),
    )
    .output(
      type({
        data: type(TreasuryDebitReversalSchema).array().describe('Details about each object.'),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TreasuryDebitReversals: t.procedure.output(TreasuryDebitReversalSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TreasuryDebitReversalsDebitReversal: t.procedure
    .input(
      type({
        debit_reversal: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
      }),
    )
    .output(TreasuryDebitReversalSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryFinancialAccounts: t.procedure
    .input(
      type({
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'status?': "'closed' | 'open'",
      }),
    )
    .output(
      type({
        data: type(TreasuryFinancialAccountSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/treasury\/financial_accounts/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TreasuryFinancialAccounts: t.procedure
    .output(TreasuryFinancialAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryFinancialAccountsFinancialAccount: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        financial_account: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TreasuryFinancialAccountSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TreasuryFinancialAccountsFinancialAccount: t.procedure
    .input(
      type({
        financial_account: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TreasuryFinancialAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TreasuryFinancialAccountsFinancialAccountClose: t.procedure
    .input(
      type({
        financial_account: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TreasuryFinancialAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryFinancialAccountsFinancialAccountFeatures: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        financial_account: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TreasuryFinancialAccountFeaturesSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TreasuryFinancialAccountsFinancialAccountFeatures: t.procedure
    .input(
      type({
        financial_account: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TreasuryFinancialAccountFeaturesSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryInboundTransfers: t.procedure
    .input(
      type({
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        financial_account: 'string',
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'status?': "'canceled' | 'failed' | 'processing' | 'succeeded'",
      }),
    )
    .output(
      type({
        data: type(TreasuryInboundTransferSchema).array().describe('Details about each object.'),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TreasuryInboundTransfers: t.procedure.output(TreasuryInboundTransferSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TreasuryInboundTransfersId: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TreasuryInboundTransferSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TreasuryInboundTransfersInboundTransferCancel: t.procedure
    .input(
      type({
        inbound_transfer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TreasuryInboundTransferSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryOutboundPayments: t.procedure
    .input(
      type({
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'customer?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        financial_account: 'string',
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'status?': "'canceled' | 'failed' | 'posted' | 'processing' | 'returned'",
      }),
    )
    .output(
      type({
        data: type(TreasuryOutboundPaymentSchema).array().describe('Details about each object.'),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/treasury\/outbound_payments/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TreasuryOutboundPayments: t.procedure.output(TreasuryOutboundPaymentSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TreasuryOutboundPaymentsId: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TreasuryOutboundPaymentSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TreasuryOutboundPaymentsIdCancel: t.procedure
    .input(
      type({
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TreasuryOutboundPaymentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryOutboundTransfers: t.procedure
    .input(
      type({
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        financial_account: 'string',
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'status?': "'canceled' | 'failed' | 'posted' | 'processing' | 'returned'",
      }),
    )
    .output(
      type({
        data: type(TreasuryOutboundTransferSchema).array().describe('Details about each object.'),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TreasuryOutboundTransfers: t.procedure
    .output(TreasuryOutboundTransferSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryOutboundTransfersOutboundTransfer: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        outbound_transfer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TreasuryOutboundTransferSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TreasuryOutboundTransfersOutboundTransferCancel: t.procedure
    .input(
      type({
        outbound_transfer: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TreasuryOutboundTransferSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryReceivedCredits: t.procedure
    .input(
      type({
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        financial_account: 'string',
        'limit?': 'number.integer',
        'linked_flows?': type({
          source_flow_type:
            "'credit_reversal' | 'other' | 'outbound_payment' | 'outbound_transfer' | 'payout'",
        }),
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'status?': "'failed' | 'succeeded'",
      }),
    )
    .output(
      type({
        data: type(TreasuryReceivedCreditSchema).array().describe('Details about each object.'),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryReceivedCreditsId: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TreasuryReceivedCreditSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryReceivedDebits: t.procedure
    .input(
      type({
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        financial_account: 'string',
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'status?': "'failed' | 'succeeded'",
      }),
    )
    .output(
      type({
        data: type(TreasuryReceivedDebitSchema).array().describe('Details about each object.'),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryReceivedDebitsId: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TreasuryReceivedDebitSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryTransactionEntries: t.procedure
    .input(
      type({
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'effective_at?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        financial_account: 'string',
        'limit?': 'number.integer',
        'order_by?': "'created' | 'effective_at'",
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'transaction?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(TreasuryTransactionEntrySchema).array().describe('Details about each object.'),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/treasury\/transaction_entries/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryTransactionEntriesId: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TreasuryTransactionEntrySchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryTransactions: t.procedure
    .input(
      type({
        'created?': type(
          type({
            'gt?': 'number.integer',
            'gte?': 'number.integer',
            'lt?': 'number.integer',
            'lte?': 'number.integer',
          }),
        ).or('number.integer'),
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        financial_account: 'string',
        'limit?': 'number.integer',
        'order_by?': "'created' | 'posted_at'",
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'status?': "'open' | 'posted' | 'void'",
        'status_transitions?': type({
          'posted_at?': type(
            type({
              'gt?': 'number.integer',
              'gte?': 'number.integer',
              'lt?': 'number.integer',
              'lte?': 'number.integer',
            }),
          ).or('number.integer'),
        }),
      }),
    )
    .output(
      type({
        data: type(TreasuryTransactionSchema).array().describe('Details about each object.'),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryTransactionsId: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        id: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(TreasuryTransactionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1WebhookEndpoints: t.procedure
    .input(
      type({
        'ending_before?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        'limit?': 'number.integer',
        'starting_after?': type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(
      type({
        data: type(WebhookEndpointSchema).array(),
        has_more: type('boolean').describe(
          'True if this list has another page of items after this one that can be fetched.',
        ),
        object: type("'list'").describe(
          "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
        ),
        url: type('string')
          .and(/^\/v1\/webhook_endpoints/)
          .narrow((data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'))
          .describe('The URL where this list can be accessed.'),
      }).describe(''),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1WebhookEndpoints: t.procedure.output(WebhookEndpointSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1WebhookEndpointsWebhookEndpoint: t.procedure
    .input(
      type({
        'expand?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
          ),
        ).array(),
        webhook_endpoint: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(WebhookEndpointSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1WebhookEndpointsWebhookEndpoint: t.procedure
    .input(
      type({
        webhook_endpoint: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(WebhookEndpointSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1WebhookEndpointsWebhookEndpoint: t.procedure
    .input(
      type({
        webhook_endpoint: type('string').narrow(
          (data, ctx) => [...data].length <= 5000 || ctx.mustBe('at most 5000 characters'),
        ),
      }),
    )
    .output(DeletedWebhookEndpointSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
