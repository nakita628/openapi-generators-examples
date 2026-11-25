import { initTRPC, TRPCError } from '@trpc/server'
import * as z from 'zod'
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
    .input(z.object({ expand: z.array(z.string().max(5000)).exactOptional() }))
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
      z.object({
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        ending_before: z.string().exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(AccountSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/accounts/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Accounts: t.procedure.output(AccountSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1AccountsAccount: t.procedure
    .input(
      z.object({
        account: z.string().max(5000),
        expand: z.array(z.string().max(5000)).exactOptional(),
      }),
    )
    .output(AccountSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccount: t.procedure
    .input(z.object({ account: z.string().max(5000) }))
    .output(AccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1AccountsAccount: t.procedure
    .input(z.object({ account: z.string().max(5000) }))
    .output(DeletedAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccountBankAccounts: t.procedure
    .input(z.object({ account: z.string().max(5000) }))
    .output(ExternalAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1AccountsAccountBankAccountsId: t.procedure
    .input(
      z.object({
        account: z.string().max(5000),
        expand: z.array(z.string().max(5000)).exactOptional(),
        id: z.string(),
      }),
    )
    .output(ExternalAccountSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccountBankAccountsId: t.procedure
    .input(z.object({ account: z.string().max(5000), id: z.string() }))
    .output(ExternalAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1AccountsAccountBankAccountsId: t.procedure
    .input(z.object({ account: z.string().max(5000), id: z.string() }))
    .output(DeletedExternalAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1AccountsAccountCapabilities: t.procedure
    .input(
      z.object({
        account: z.string().max(5000),
        expand: z.array(z.string().max(5000)).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(CapabilitySchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1AccountsAccountCapabilitiesCapability: t.procedure
    .input(
      z.object({
        account: z.string().max(5000),
        capability: z.string(),
        expand: z.array(z.string().max(5000)).exactOptional(),
      }),
    )
    .output(CapabilitySchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccountCapabilitiesCapability: t.procedure
    .input(z.object({ account: z.string().max(5000), capability: z.string() }))
    .output(CapabilitySchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1AccountsAccountExternalAccounts: t.procedure
    .input(
      z.object({
        account: z.string().max(5000),
        ending_before: z.string().exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        object: z.enum(['bank_account', 'card']).exactOptional(),
        starting_after: z.string().exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z
            .array(z.union([BankAccountSchema, CardSchema]))
            .meta({
              description:
                'The list contains all external accounts that have been attached to the Stripe account. These may be bank accounts or cards.',
            }),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccountExternalAccounts: t.procedure
    .input(z.object({ account: z.string().max(5000) }))
    .output(ExternalAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1AccountsAccountExternalAccountsId: t.procedure
    .input(
      z.object({
        account: z.string().max(5000),
        expand: z.array(z.string().max(5000)).exactOptional(),
        id: z.string(),
      }),
    )
    .output(ExternalAccountSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccountExternalAccountsId: t.procedure
    .input(z.object({ account: z.string().max(5000), id: z.string() }))
    .output(ExternalAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1AccountsAccountExternalAccountsId: t.procedure
    .input(z.object({ account: z.string().max(5000), id: z.string() }))
    .output(DeletedExternalAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccountLoginLinks: t.procedure
    .input(z.object({ account: z.string().max(5000) }))
    .output(LoginLinkSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1AccountsAccountPeople: t.procedure
    .input(
      z.object({
        account: z.string().max(5000),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        relationship: z
          .object({
            authorizer: z.boolean().exactOptional(),
            director: z.boolean().exactOptional(),
            executive: z.boolean().exactOptional(),
            legal_guardian: z.boolean().exactOptional(),
            owner: z.boolean().exactOptional(),
            representative: z.boolean().exactOptional(),
          })
          .exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(PersonSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccountPeople: t.procedure
    .input(z.object({ account: z.string().max(5000) }))
    .output(PersonSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1AccountsAccountPeoplePerson: t.procedure
    .input(
      z.object({
        account: z.string().max(5000),
        expand: z.array(z.string().max(5000)).exactOptional(),
        person: z.string().max(5000),
      }),
    )
    .output(PersonSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccountPeoplePerson: t.procedure
    .input(z.object({ account: z.string().max(5000), person: z.string().max(5000) }))
    .output(PersonSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1AccountsAccountPeoplePerson: t.procedure
    .input(z.object({ account: z.string().max(5000), person: z.string().max(5000) }))
    .output(DeletedPersonSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1AccountsAccountPersons: t.procedure
    .input(
      z.object({
        account: z.string().max(5000),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        relationship: z
          .object({
            authorizer: z.boolean().exactOptional(),
            director: z.boolean().exactOptional(),
            executive: z.boolean().exactOptional(),
            legal_guardian: z.boolean().exactOptional(),
            owner: z.boolean().exactOptional(),
            representative: z.boolean().exactOptional(),
          })
          .exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(PersonSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccountPersons: t.procedure
    .input(z.object({ account: z.string().max(5000) }))
    .output(PersonSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1AccountsAccountPersonsPerson: t.procedure
    .input(
      z.object({
        account: z.string().max(5000),
        expand: z.array(z.string().max(5000)).exactOptional(),
        person: z.string().max(5000),
      }),
    )
    .output(PersonSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccountPersonsPerson: t.procedure
    .input(z.object({ account: z.string().max(5000), person: z.string().max(5000) }))
    .output(PersonSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1AccountsAccountPersonsPerson: t.procedure
    .input(z.object({ account: z.string().max(5000), person: z.string().max(5000) }))
    .output(DeletedPersonSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccountReject: t.procedure
    .input(z.object({ account: z.string().max(5000) }))
    .output(AccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AccountsAccountUnreject: t.procedure
    .input(z.object({ account: z.string().max(5000) }))
    .output(AccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ApplePayDomains: t.procedure
    .input(
      z.object({
        domain_name: z.string().max(5000).exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(ApplePayDomainSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/apple_pay\/domains/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ApplePayDomains: t.procedure.output(ApplePayDomainSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1ApplePayDomainsDomain: t.procedure
    .input(
      z.object({
        domain: z.string().max(5000),
        expand: z.array(z.string().max(5000)).exactOptional(),
      }),
    )
    .output(ApplePayDomainSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1ApplePayDomainsDomain: t.procedure
    .input(z.object({ domain: z.string().max(5000) }))
    .output(DeletedApplePayDomainSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ApplicationFees: t.procedure
    .input(
      z.object({
        charge: z.string().max(5000).exactOptional(),
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(ApplicationFeeSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/application_fees/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ApplicationFeesFeeRefundsId: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        fee: z.string().max(5000),
        id: z.string().max(5000),
      }),
    )
    .output(FeeRefundSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ApplicationFeesFeeRefundsId: t.procedure
    .input(z.object({ fee: z.string().max(5000), id: z.string().max(5000) }))
    .output(FeeRefundSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ApplicationFeesId: t.procedure
    .input(
      z.object({ expand: z.array(z.string().max(5000)).exactOptional(), id: z.string().max(5000) }),
    )
    .output(ApplicationFeeSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ApplicationFeesIdRefund: t.procedure
    .input(z.object({ id: z.string().max(5000) }))
    .output(ApplicationFeeSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ApplicationFeesIdRefunds: t.procedure
    .input(
      z.object({
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        id: z.string().max(5000),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(FeeRefundSchema).meta({ description: 'Details about each object.' }),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ApplicationFeesIdRefunds: t.procedure
    .input(z.object({ id: z.string().max(5000) }))
    .output(FeeRefundSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1AppsInstalls: t.procedure
    .input(
      z.object({
        account: z.string().max(5000).exactOptional(),
        app: z.string().max(5000).exactOptional(),
        approval_required: z.boolean().exactOptional(),
        channel: z.enum(['private_live', 'private_test', 'public', 'testing']).exactOptional(),
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        created_by: z.string().max(5000).exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
        status: z
          .enum(['install_failed', 'installed', 'installing', 'uninstall_failed', 'uninstalling'])
          .exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(AppsInstallSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/apps\/installs/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AppsInstalls: t.procedure.output(AppsInstallSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1AppsInstallsId: t.procedure
    .input(
      z.object({ expand: z.array(z.string().max(5000)).exactOptional(), id: z.string().max(5000) }),
    )
    .output(AppsInstallSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AppsInstallsId: t.procedure
    .input(z.object({ id: z.string().max(5000) }))
    .output(AppsInstallSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1AppsInstallsIdUninstall: t.procedure
    .input(z.object({ id: z.string().max(5000) }))
    .output(AppsInstallSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1AppsSecrets: t.procedure
    .input(
      z.object({
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        scope: z.object({
          type: z.enum(['account', 'user']),
          user: z.string().max(5000).exactOptional(),
        }),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(AppsSecretSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/apps\/secrets/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
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
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        name: z.string().max(5000),
        scope: z.object({
          type: z.enum(['account', 'user']),
          user: z.string().max(5000).exactOptional(),
        }),
      }),
    )
    .output(AppsSecretSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Balance: t.procedure
    .input(z.object({ expand: z.array(z.string().max(5000)).exactOptional() }))
    .output(BalanceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BalanceHistory: t.procedure
    .input(
      z.object({
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        currency: z.string().exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        payout: z.string().max(5000).exactOptional(),
        source: z.string().max(5000).exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
        type: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(BalanceTransactionSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/balance_transactions/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BalanceHistoryId: t.procedure
    .input(
      z.object({ expand: z.array(z.string().max(5000)).exactOptional(), id: z.string().max(5000) }),
    )
    .output(BalanceTransactionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BalanceSettings: t.procedure
    .input(z.object({ expand: z.array(z.string().max(5000)).exactOptional() }))
    .output(BalanceSettingsSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BalanceSettings: t.procedure.output(BalanceSettingsSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1BalanceTransactions: t.procedure
    .input(
      z.object({
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        currency: z.string().exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        payout: z.string().max(5000).exactOptional(),
        source: z.string().max(5000).exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
        type: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(BalanceTransactionSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/balance_transactions/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BalanceTransactionsId: t.procedure
    .input(
      z.object({ expand: z.array(z.string().max(5000)).exactOptional(), id: z.string().max(5000) }),
    )
    .output(BalanceTransactionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BillingAlerts: t.procedure
    .input(
      z.object({
        alert_type: z.literal('usage_threshold').exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        meter: z.string().max(5000).exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(BillingAlertSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/billing\/alerts/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingAlerts: t.procedure.output(BillingAlertSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1BillingAlertsId: t.procedure
    .input(
      z.object({ expand: z.array(z.string().max(5000)).exactOptional(), id: z.string().max(5000) }),
    )
    .output(BillingAlertSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingAlertsIdActivate: t.procedure
    .input(z.object({ id: z.string().max(5000) }))
    .output(BillingAlertSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingAlertsIdArchive: t.procedure
    .input(z.object({ id: z.string().max(5000) }))
    .output(BillingAlertSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingAlertsIdDeactivate: t.procedure
    .input(z.object({ id: z.string().max(5000) }))
    .output(BillingAlertSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BillingCreditBalanceSummary: t.procedure
    .input(
      z.object({
        customer: z.string().max(5000).exactOptional(),
        customer_account: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        filter: z.object({
          applicability_scope: z
            .object({
              price_type: z.literal('metered').exactOptional(),
              prices: z.array(z.object({ id: z.string().max(5000) })).exactOptional(),
            })
            .exactOptional(),
          credit_grant: z.string().max(5000).exactOptional(),
          type: z.enum(['applicability_scope', 'credit_grant']),
        }),
      }),
    )
    .output(BillingCreditBalanceSummarySchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BillingCreditBalanceTransactions: t.procedure
    .input(
      z.object({
        credit_grant: z.string().max(5000).exactOptional(),
        customer: z.string().max(5000).exactOptional(),
        customer_account: z.string().max(5000).exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(BillingCreditBalanceTransactionSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/billing\/credit_grants/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BillingCreditBalanceTransactionsId: t.procedure
    .input(
      z.object({ expand: z.array(z.string().max(5000)).exactOptional(), id: z.string().max(5000) }),
    )
    .output(BillingCreditBalanceTransactionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BillingCreditGrants: t.procedure
    .input(
      z.object({
        customer: z.string().max(5000).exactOptional(),
        customer_account: z.string().max(5000).exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(BillingCreditGrantSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/billing\/credit_grants/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingCreditGrants: t.procedure.output(BillingCreditGrantSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1BillingCreditGrantsId: t.procedure
    .input(
      z.object({ expand: z.array(z.string().max(5000)).exactOptional(), id: z.string().max(5000) }),
    )
    .output(BillingCreditGrantSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingCreditGrantsId: t.procedure
    .input(z.object({ id: z.string().max(5000) }))
    .output(BillingCreditGrantSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingCreditGrantsIdExpire: t.procedure
    .input(z.object({ id: z.string().max(5000) }))
    .output(BillingCreditGrantSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingCreditGrantsIdVoid: t.procedure
    .input(z.object({ id: z.string().max(5000) }))
    .output(BillingCreditGrantSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BillingFeedbackOptions: t.procedure
    .input(
      z.object({
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
        status: z.enum(['active', 'inactive']).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(BillingFeedbackOptionSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: 'Resource for the List Endpoint of Feedback Option.' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingFeedbackOptions: t.procedure.output(BillingFeedbackOptionSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1BillingFeedbackOptionsId: t.procedure
    .input(
      z.object({ expand: z.array(z.string().max(5000)).exactOptional(), id: z.string().max(5000) }),
    )
    .output(BillingFeedbackOptionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingFeedbackOptionsId: t.procedure
    .input(z.object({ id: z.string().max(5000) }))
    .output(BillingFeedbackOptionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingFeedbackOptionsIdDeactivate: t.procedure
    .input(z.object({ id: z.string().max(5000) }))
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
      z.object({
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
        status: z.enum(['active', 'inactive']).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(BillingMeterSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/billing\/meters/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingMeters: t.procedure.output(BillingMeterSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1BillingMetersId: t.procedure
    .input(
      z.object({ expand: z.array(z.string().max(5000)).exactOptional(), id: z.string().max(5000) }),
    )
    .output(BillingMeterSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingMetersId: t.procedure
    .input(z.object({ id: z.string().max(5000) }))
    .output(BillingMeterSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingMetersIdDeactivate: t.procedure
    .input(z.object({ id: z.string().max(5000) }))
    .output(BillingMeterSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BillingMetersIdEventSummaries: t.procedure
    .input(
      z.object({
        customer: z.string().max(5000),
        end_time: z.int(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        id: z.string().max(5000),
        limit: z.int().exactOptional(),
        start_time: z.int(),
        starting_after: z.string().max(5000).exactOptional(),
        value_grouping_window: z.enum(['day', 'hour']).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(BillingMeterEventSummarySchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/billing\/meters\/[^\/]+\/event_summaries/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingMetersIdReactivate: t.procedure
    .input(z.object({ id: z.string().max(5000) }))
    .output(BillingMeterSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1BillingPortalConfigurations: t.procedure
    .input(
      z.object({
        active: z.boolean().exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        is_default: z.boolean().exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(BillingPortalConfigurationSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/billing_portal\/configurations/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
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
      z.object({
        configuration: z.string().max(5000),
        expand: z.array(z.string().max(5000)).exactOptional(),
      }),
    )
    .output(BillingPortalConfigurationSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingPortalConfigurationsConfiguration: t.procedure
    .input(z.object({ configuration: z.string().max(5000) }))
    .output(BillingPortalConfigurationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1BillingPortalSessions: t.procedure.output(BillingPortalSessionSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1Charges: t.procedure
    .input(
      z.object({
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        customer: z.string().max(5000).exactOptional(),
        ending_before: z.string().exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        payment_intent: z.string().max(5000).exactOptional(),
        starting_after: z.string().exactOptional(),
        transfer_group: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(ChargeSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/charges/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Charges: t.procedure.output(ChargeSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1ChargesSearch: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        page: z.string().max(5000).exactOptional(),
        query: z.string().max(5000),
      }),
    )
    .output(
      z
        .object({
          data: z.array(ChargeSchema),
          has_more: z.boolean(),
          next_page: z.string().max(5000).nullable().exactOptional(),
          object: z
            .literal('search_result')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value.",
            }),
          total_count: z
            .int()
            .meta({
              description:
                'The total number of objects that match the query, only accurate up to 10,000.',
            })
            .exactOptional(),
          url: z.string().max(5000),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ChargesCharge: t.procedure
    .input(
      z.object({
        charge: z.string().max(5000),
        expand: z.array(z.string().max(5000)).exactOptional(),
      }),
    )
    .output(ChargeSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ChargesCharge: t.procedure
    .input(z.object({ charge: z.string().max(5000) }))
    .output(ChargeSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ChargesChargeCapture: t.procedure
    .input(z.object({ charge: z.string().max(5000) }))
    .output(ChargeSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ChargesChargeDispute: t.procedure
    .input(
      z.object({
        charge: z.string().max(5000),
        expand: z.array(z.string().max(5000)).exactOptional(),
      }),
    )
    .output(DisputeSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ChargesChargeDispute: t.procedure
    .input(z.object({ charge: z.string().max(5000) }))
    .output(DisputeSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ChargesChargeDisputeClose: t.procedure
    .input(z.object({ charge: z.string().max(5000) }))
    .output(DisputeSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ChargesChargeRefund: t.procedure
    .input(z.object({ charge: z.string().max(5000) }))
    .output(ChargeSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ChargesChargeRefunds: t.procedure
    .input(
      z.object({
        charge: z.string(),
        ending_before: z.string().exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(RefundSchema).meta({ description: 'Details about each object.' }),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ChargesChargeRefunds: t.procedure
    .input(z.object({ charge: z.string().max(5000) }))
    .output(RefundSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ChargesChargeRefundsRefund: t.procedure
    .input(
      z.object({
        charge: z.string(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        refund: z.string(),
      }),
    )
    .output(RefundSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ChargesChargeRefundsRefund: t.procedure
    .input(z.object({ charge: z.string(), refund: z.string() }))
    .output(RefundSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CheckoutSessions: t.procedure
    .input(
      z.object({
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        customer: z.string().max(5000).exactOptional(),
        customer_account: z.string().max(5000).exactOptional(),
        customer_details: z.object({ email: z.string() }).exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        payment_intent: z.string().max(5000).exactOptional(),
        payment_link: z.string().max(5000).exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
        status: z.enum(['complete', 'expired', 'open']).exactOptional(),
        subscription: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(CheckoutSessionSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CheckoutSessions: t.procedure.output(CheckoutSessionSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1CheckoutSessionsSession: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        session: z.string().max(66),
      }),
    )
    .output(CheckoutSessionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CheckoutSessionsSession: t.procedure
    .input(z.object({ session: z.string().max(5000) }))
    .output(CheckoutSessionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CheckoutSessionsSessionExpire: t.procedure
    .input(z.object({ session: z.string().max(5000) }))
    .output(CheckoutSessionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CheckoutSessionsSessionLineItems: t.procedure
    .input(
      z.object({
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        session: z.string().max(5000),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(ItemSchema).meta({ description: 'Details about each object.' }),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ClimateOrders: t.procedure
    .input(
      z.object({
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(ClimateOrderSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/climate\/orders/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ClimateOrders: t.procedure.output(ClimateOrderSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1ClimateOrdersOrder: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        order: z.string().max(5000),
      }),
    )
    .output(ClimateOrderSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ClimateOrdersOrder: t.procedure
    .input(z.object({ order: z.string().max(5000) }))
    .output(ClimateOrderSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ClimateOrdersOrderCancel: t.procedure
    .input(z.object({ order: z.string().max(5000) }))
    .output(ClimateOrderSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ClimateProducts: t.procedure
    .input(
      z.object({
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(ClimateProductSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/climate\/products/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ClimateProductsProduct: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        product: z.string().max(5000),
      }),
    )
    .output(ClimateProductSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ClimateSuppliers: t.procedure
    .input(
      z.object({
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(ClimateSupplierSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/climate\/suppliers/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ClimateSuppliersSupplier: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        supplier: z.string().max(5000),
      }),
    )
    .output(ClimateSupplierSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ConfirmationTokensConfirmationToken: t.procedure
    .input(
      z.object({
        confirmation_token: z.string().max(5000),
        expand: z.array(z.string().max(5000)).exactOptional(),
      }),
    )
    .output(ConfirmationTokenSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CountrySpecs: t.procedure
    .input(
      z.object({
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(CountrySpecSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/country_specs/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CountrySpecsCountry: t.procedure
    .input(
      z.object({
        country: z.string().max(5000),
        expand: z.array(z.string().max(5000)).exactOptional(),
      }),
    )
    .output(CountrySpecSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Coupons: t.procedure
    .input(
      z.object({
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(CouponSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/coupons/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Coupons: t.procedure.output(CouponSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1CouponsCoupon: t.procedure
    .input(
      z.object({
        coupon: z.string().max(5000),
        expand: z.array(z.string().max(5000)).exactOptional(),
      }),
    )
    .output(CouponSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CouponsCoupon: t.procedure
    .input(z.object({ coupon: z.string().max(5000) }))
    .output(CouponSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1CouponsCoupon: t.procedure
    .input(z.object({ coupon: z.string().max(5000) }))
    .output(DeletedCouponSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CreditNotes: t.procedure
    .input(
      z.object({
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        customer: z.string().max(5000).exactOptional(),
        customer_account: z.string().max(5000).exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        invoice: z.string().max(5000).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(CreditNoteSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CreditNotes: t.procedure.output(CreditNoteSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1CreditNotesPreview: t.procedure
    .input(
      z.object({
        amount: z.int().exactOptional(),
        credit_amount: z.int().exactOptional(),
        effective_at: z.int().exactOptional(),
        email_type: z.enum(['credit_note', 'none']).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        invoice: z.string().max(5000),
        lines: z
          .array(
            z.object({
              amount: z.int().exactOptional(),
              description: z.string().max(5000).exactOptional(),
              invoice_line_item: z.string().max(5000).exactOptional(),
              metadata: z.record(z.string(), z.string()).exactOptional(),
              quantity: z.int().exactOptional(),
              tax_amounts: z
                .union([
                  z.array(
                    z.object({
                      amount: z.int(),
                      tax_rate: z.string().max(5000),
                      taxable_amount: z.int(),
                    }),
                  ),
                  z.literal(''),
                ])
                .exactOptional(),
              tax_rates: z.union([z.array(z.string().max(5000)), z.literal('')]).exactOptional(),
              type: z.enum(['custom_line_item', 'invoice_line_item']),
              unit_amount: z.int().exactOptional(),
              unit_amount_decimal: z.string().exactOptional(),
            }),
          )
          .exactOptional(),
        memo: z.string().max(5000).exactOptional(),
        metadata: z.record(z.string(), z.string()).exactOptional(),
        out_of_band_amount: z.int().exactOptional(),
        reason: z
          .enum(['duplicate', 'fraudulent', 'order_change', 'product_unsatisfactory'])
          .exactOptional(),
        refund_amount: z.int().exactOptional(),
        refunds: z
          .array(
            z.object({
              amount_refunded: z.int().exactOptional(),
              payment_record_refund: z
                .object({
                  payment_record: z.string().max(5000),
                  refund_group: z.string().max(5000),
                })
                .exactOptional(),
              refund: z.string().exactOptional(),
              type: z.enum(['payment_record_refund', 'refund']).exactOptional(),
            }),
          )
          .exactOptional(),
        shipping_cost: z
          .object({ shipping_rate: z.string().max(5000).exactOptional() })
          .exactOptional(),
      }),
    )
    .output(CreditNoteSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CreditNotesPreviewLines: t.procedure
    .input(
      z.object({
        amount: z.int().exactOptional(),
        credit_amount: z.int().exactOptional(),
        effective_at: z.int().exactOptional(),
        email_type: z.enum(['credit_note', 'none']).exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        invoice: z.string().max(5000),
        limit: z.int().exactOptional(),
        lines: z
          .array(
            z.object({
              amount: z.int().exactOptional(),
              description: z.string().max(5000).exactOptional(),
              invoice_line_item: z.string().max(5000).exactOptional(),
              metadata: z.record(z.string(), z.string()).exactOptional(),
              quantity: z.int().exactOptional(),
              tax_amounts: z
                .union([
                  z.array(
                    z.object({
                      amount: z.int(),
                      tax_rate: z.string().max(5000),
                      taxable_amount: z.int(),
                    }),
                  ),
                  z.literal(''),
                ])
                .exactOptional(),
              tax_rates: z.union([z.array(z.string().max(5000)), z.literal('')]).exactOptional(),
              type: z.enum(['custom_line_item', 'invoice_line_item']),
              unit_amount: z.int().exactOptional(),
              unit_amount_decimal: z.string().exactOptional(),
            }),
          )
          .exactOptional(),
        memo: z.string().max(5000).exactOptional(),
        metadata: z.record(z.string(), z.string()).exactOptional(),
        out_of_band_amount: z.int().exactOptional(),
        reason: z
          .enum(['duplicate', 'fraudulent', 'order_change', 'product_unsatisfactory'])
          .exactOptional(),
        refund_amount: z.int().exactOptional(),
        refunds: z
          .array(
            z.object({
              amount_refunded: z.int().exactOptional(),
              payment_record_refund: z
                .object({
                  payment_record: z.string().max(5000),
                  refund_group: z.string().max(5000),
                })
                .exactOptional(),
              refund: z.string().exactOptional(),
              type: z.enum(['payment_record_refund', 'refund']).exactOptional(),
            }),
          )
          .exactOptional(),
        shipping_cost: z
          .object({ shipping_rate: z.string().max(5000).exactOptional() })
          .exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z
            .array(CreditNoteLineItemSchema)
            .meta({ description: 'Details about each object.' }),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CreditNotesCreditNoteLines: t.procedure
    .input(
      z.object({
        credit_note: z.string().max(5000),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z
            .array(CreditNoteLineItemSchema)
            .meta({ description: 'Details about each object.' }),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CreditNotesId: t.procedure
    .input(
      z.object({ expand: z.array(z.string().max(5000)).exactOptional(), id: z.string().max(5000) }),
    )
    .output(CreditNoteSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CreditNotesId: t.procedure
    .input(z.object({ id: z.string().max(5000) }))
    .output(CreditNoteSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CreditNotesIdVoid: t.procedure
    .input(z.object({ id: z.string().max(5000) }))
    .output(CreditNoteSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomerSessions: t.procedure.output(CustomerSessionSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1Customers: t.procedure
    .input(
      z.object({
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        email: z.string().max(512).exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
        test_clock: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(CustomerSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/customers/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Customers: t.procedure.output(CustomerSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1CustomersSearch: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        page: z.string().max(5000).exactOptional(),
        query: z.string().max(5000),
      }),
    )
    .output(
      z
        .object({
          data: z.array(CustomerSchema),
          has_more: z.boolean(),
          next_page: z.string().max(5000).nullable().exactOptional(),
          object: z
            .literal('search_result')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value.",
            }),
          total_count: z
            .int()
            .meta({
              description:
                'The total number of objects that match the query, only accurate up to 10,000.',
            })
            .exactOptional(),
          url: z.string().max(5000),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomer: t.procedure
    .input(
      z.object({
        customer: z.string().max(5000),
        expand: z.array(z.string().max(5000)).exactOptional(),
      }),
    )
    .output(z.union([CustomerSchema, DeletedCustomerSchema]))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomer: t.procedure
    .input(z.object({ customer: z.string().max(5000) }))
    .output(CustomerSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1CustomersCustomer: t.procedure
    .input(z.object({ customer: z.string().max(5000) }))
    .output(DeletedCustomerSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerBalanceTransactions: t.procedure
    .input(
      z.object({
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        customer: z.string().max(5000),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        invoice: z.string().max(5000).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z
            .array(CustomerBalanceTransactionSchema)
            .meta({ description: 'Details about each object.' }),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerBalanceTransactions: t.procedure
    .input(z.object({ customer: z.string().max(5000) }))
    .output(CustomerBalanceTransactionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerBalanceTransactionsTransaction: t.procedure
    .input(
      z.object({
        customer: z.string().max(5000),
        expand: z.array(z.string().max(5000)).exactOptional(),
        transaction: z.string(),
      }),
    )
    .output(CustomerBalanceTransactionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerBalanceTransactionsTransaction: t.procedure
    .input(z.object({ customer: z.string().max(5000), transaction: z.string().max(5000) }))
    .output(CustomerBalanceTransactionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerBankAccounts: t.procedure
    .input(
      z.object({
        customer: z.string().max(5000),
        ending_before: z.string().exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(BankAccountSchema).meta({ description: 'Details about each object.' }),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerBankAccounts: t.procedure
    .input(z.object({ customer: z.string().max(5000) }))
    .output(PaymentSourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerBankAccountsId: t.procedure
    .input(
      z.object({
        customer: z.string().max(5000),
        expand: z.array(z.string().max(5000)).exactOptional(),
        id: z.string().max(5000),
      }),
    )
    .output(BankAccountSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerBankAccountsId: t.procedure
    .input(z.object({ customer: z.string().max(5000), id: z.string().max(5000) }))
    .output(z.union([CardSchema, BankAccountSchema, SourceSchema]))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1CustomersCustomerBankAccountsId: t.procedure
    .input(z.object({ customer: z.string().max(5000), id: z.string() }))
    .output(z.union([PaymentSourceSchema, DeletedPaymentSourceSchema]))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerBankAccountsIdVerify: t.procedure
    .input(z.object({ customer: z.string().max(5000), id: z.string().max(5000) }))
    .output(BankAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerCards: t.procedure
    .input(
      z.object({
        customer: z.string().max(5000),
        ending_before: z.string().exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(CardSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerCards: t.procedure
    .input(z.object({ customer: z.string().max(5000) }))
    .output(PaymentSourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerCardsId: t.procedure
    .input(
      z.object({
        customer: z.string().max(5000),
        expand: z.array(z.string().max(5000)).exactOptional(),
        id: z.string().max(5000),
      }),
    )
    .output(CardSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerCardsId: t.procedure
    .input(z.object({ customer: z.string().max(5000), id: z.string().max(5000) }))
    .output(z.union([CardSchema, BankAccountSchema, SourceSchema]))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1CustomersCustomerCardsId: t.procedure
    .input(z.object({ customer: z.string().max(5000), id: z.string() }))
    .output(z.union([PaymentSourceSchema, DeletedPaymentSourceSchema]))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerCashBalance: t.procedure
    .input(
      z.object({
        customer: z.string().max(5000),
        expand: z.array(z.string().max(5000)).exactOptional(),
      }),
    )
    .output(CashBalanceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerCashBalance: t.procedure
    .input(z.object({ customer: z.string().max(5000) }))
    .output(CashBalanceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerCashBalanceTransactions: t.procedure
    .input(
      z.object({
        customer: z.string().max(5000),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z
            .array(CustomerCashBalanceTransactionSchema)
            .meta({ description: 'Details about each object.' }),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({
          description:
            'Customers with certain payments enabled have a cash balance, representing funds that were paid\nby the customer to a merchant, but have not yet been allocated to a payment. Cash Balance Transactions\nrepresent when funds are moved into or out of this balance. This includes funding by the customer, allocation\nto payments, and refunds to the customer.',
        }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerCashBalanceTransactionsTransaction: t.procedure
    .input(
      z.object({
        customer: z.string().max(5000),
        expand: z.array(z.string().max(5000)).exactOptional(),
        transaction: z.string(),
      }),
    )
    .output(CustomerCashBalanceTransactionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerDiscount: t.procedure
    .input(
      z.object({
        customer: z.string().max(5000),
        expand: z.array(z.string().max(5000)).exactOptional(),
      }),
    )
    .output(DiscountSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1CustomersCustomerDiscount: t.procedure
    .input(z.object({ customer: z.string().max(5000) }))
    .output(DeletedDiscountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerFundingInstructions: t.procedure
    .input(z.object({ customer: z.string().max(5000) }))
    .output(FundingInstructionsSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerPaymentMethods: t.procedure
    .input(
      z.object({
        allow_redisplay: z.enum(['always', 'limited', 'unspecified']).exactOptional(),
        customer: z.string().max(5000),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
        type: z
          .enum([
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
          ])
          .exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(PaymentMethodSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerPaymentMethodsPaymentMethod: t.procedure
    .input(
      z.object({
        customer: z.string().max(5000),
        expand: z.array(z.string().max(5000)).exactOptional(),
        payment_method: z.string().max(5000),
      }),
    )
    .output(PaymentMethodSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerSources: t.procedure
    .input(
      z.object({
        customer: z.string().max(5000),
        ending_before: z.string().exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        object: z.string().max(5000).exactOptional(),
        starting_after: z.string().exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z
            .array(z.union([BankAccountSchema, CardSchema, SourceSchema]))
            .meta({ description: 'Details about each object.' }),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerSources: t.procedure
    .input(z.object({ customer: z.string().max(5000) }))
    .output(PaymentSourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerSourcesId: t.procedure
    .input(
      z.object({
        customer: z.string().max(5000),
        expand: z.array(z.string().max(5000)).exactOptional(),
        id: z.string().max(500),
      }),
    )
    .output(PaymentSourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerSourcesId: t.procedure
    .input(z.object({ customer: z.string().max(5000), id: z.string().max(5000) }))
    .output(z.union([CardSchema, BankAccountSchema, SourceSchema]))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1CustomersCustomerSourcesId: t.procedure
    .input(z.object({ customer: z.string().max(5000), id: z.string() }))
    .output(z.union([PaymentSourceSchema, DeletedPaymentSourceSchema]))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerSourcesIdVerify: t.procedure
    .input(z.object({ customer: z.string().max(5000), id: z.string().max(5000) }))
    .output(BankAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerSubscriptions: t.procedure
    .input(
      z.object({
        customer: z.string().max(5000),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(SubscriptionSchema).meta({ description: 'Details about each object.' }),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerSubscriptions: t.procedure
    .input(z.object({ customer: z.string().max(5000) }))
    .output(SubscriptionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerSubscriptionsSubscriptionExposedId: t.procedure
    .input(
      z.object({
        customer: z.string().max(5000),
        expand: z.array(z.string().max(5000)).exactOptional(),
        subscription_exposed_id: z.string().max(5000),
      }),
    )
    .output(SubscriptionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerSubscriptionsSubscriptionExposedId: t.procedure
    .input(
      z.object({ customer: z.string().max(5000), subscription_exposed_id: z.string().max(5000) }),
    )
    .output(SubscriptionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1CustomersCustomerSubscriptionsSubscriptionExposedId: t.procedure
    .input(
      z.object({ customer: z.string().max(5000), subscription_exposed_id: z.string().max(5000) }),
    )
    .output(SubscriptionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerSubscriptionsSubscriptionExposedIdDiscount: t.procedure
    .input(
      z.object({
        customer: z.string().max(5000),
        expand: z.array(z.string().max(5000)).exactOptional(),
        subscription_exposed_id: z.string().max(5000),
      }),
    )
    .output(DiscountSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1CustomersCustomerSubscriptionsSubscriptionExposedIdDiscount: t.procedure
    .input(
      z.object({ customer: z.string().max(5000), subscription_exposed_id: z.string().max(5000) }),
    )
    .output(DeletedDiscountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerTaxIds: t.procedure
    .input(
      z.object({
        customer: z.string().max(5000),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(TaxIdSchema).meta({ description: 'Details about each object.' }),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1CustomersCustomerTaxIds: t.procedure
    .input(z.object({ customer: z.string().max(5000) }))
    .output(TaxIdSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1CustomersCustomerTaxIdsId: t.procedure
    .input(
      z.object({
        customer: z.string().max(5000),
        expand: z.array(z.string().max(5000)).exactOptional(),
        id: z.string(),
      }),
    )
    .output(TaxIdSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1CustomersCustomerTaxIdsId: t.procedure
    .input(z.object({ customer: z.string().max(5000), id: z.string() }))
    .output(DeletedTaxIdSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Disputes: t.procedure
    .input(
      z.object({
        charge: z.string().max(5000).exactOptional(),
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        payment_intent: z.string().max(5000).exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(DisputeSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/disputes/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1DisputesDispute: t.procedure
    .input(
      z.object({
        dispute: z.string().max(5000),
        expand: z.array(z.string().max(5000)).exactOptional(),
      }),
    )
    .output(DisputeSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1DisputesDispute: t.procedure
    .input(z.object({ dispute: z.string().max(5000) }))
    .output(DisputeSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1DisputesDisputeClose: t.procedure
    .input(z.object({ dispute: z.string().max(5000) }))
    .output(DisputeSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1EntitlementsActiveEntitlements: t.procedure
    .input(
      z.object({
        customer: z.string().max(5000),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(EntitlementsActiveEntitlementSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1EntitlementsActiveEntitlementsId: t.procedure
    .input(
      z.object({ expand: z.array(z.string().max(5000)).exactOptional(), id: z.string().max(5000) }),
    )
    .output(EntitlementsActiveEntitlementSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1EntitlementsFeatures: t.procedure
    .input(
      z.object({
        archived: z.boolean().exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        lookup_key: z.string().max(5000).exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(EntitlementsFeatureSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/entitlements\/features/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1EntitlementsFeatures: t.procedure.output(EntitlementsFeatureSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1EntitlementsFeaturesId: t.procedure
    .input(
      z.object({ expand: z.array(z.string().max(5000)).exactOptional(), id: z.string().max(5000) }),
    )
    .output(EntitlementsFeatureSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1EntitlementsFeaturesId: t.procedure
    .input(z.object({ id: z.string().max(5000) }))
    .output(EntitlementsFeatureSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1EphemeralKeys: t.procedure.output(EphemeralKeySchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  deleteV1EphemeralKeysKey: t.procedure
    .input(z.object({ key: z.string().max(5000) }))
    .output(EphemeralKeySchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Events: t.procedure
    .input(
      z.object({
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        delivery_success: z.boolean().exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
        type: z.string().max(5000).exactOptional(),
        types: z.array(z.string().max(5000)).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(EventSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/events/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1EventsId: t.procedure
    .input(
      z.object({ expand: z.array(z.string().max(5000)).exactOptional(), id: z.string().max(5000) }),
    )
    .output(EventSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ExchangeRates: t.procedure
    .input(
      z.object({
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(ExchangeRateSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/exchange_rates/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ExchangeRatesRateId: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        rate_id: z.string().max(5000),
      }),
    )
    .output(ExchangeRateSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ExternalAccountsId: t.procedure
    .input(z.object({ id: z.string() }))
    .output(ExternalAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1FileLinks: t.procedure
    .input(
      z.object({
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        ending_before: z.string().exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        expired: z.boolean().exactOptional(),
        file: z.string().max(5000).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(FileLinkSchema).meta({ description: 'Details about each object.' }),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/file_links/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1FileLinks: t.procedure.output(FileLinkSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1FileLinksLink: t.procedure
    .input(z.object({ expand: z.array(z.string().max(5000)).exactOptional(), link: z.string() }))
    .output(FileLinkSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1FileLinksLink: t.procedure
    .input(z.object({ link: z.string() }))
    .output(FileLinkSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Files: t.procedure
    .input(
      z.object({
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        purpose: z
          .enum([
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
          ])
          .exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(FileSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/files/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Files: t.procedure.output(FileSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1FilesFile: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        file: z.string().max(5000),
      }),
    )
    .output(FileSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1FinancialConnectionsAccounts: t.procedure
    .input(
      z.object({
        account_holder: z
          .object({
            account: z.string().max(5000).exactOptional(),
            customer: z.string().max(5000).exactOptional(),
            customer_account: z.string().max(5000).exactOptional(),
          })
          .exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        session: z.string().max(5000).exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z
            .array(FinancialConnectionsAccountSchema)
            .meta({ description: 'Details about each object.' }),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/financial_connections\/accounts/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1FinancialConnectionsAccountsAccount: t.procedure
    .input(
      z.object({
        account: z.string().max(5000),
        expand: z.array(z.string().max(5000)).exactOptional(),
      }),
    )
    .output(FinancialConnectionsAccountSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1FinancialConnectionsAccountsAccountDisconnect: t.procedure
    .input(z.object({ account: z.string().max(5000) }))
    .output(FinancialConnectionsAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1FinancialConnectionsAccountsAccountOwners: t.procedure
    .input(
      z.object({
        account: z.string().max(5000),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        ownership: z.string().max(5000),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z
            .array(FinancialConnectionsAccountOwnerSchema)
            .meta({ description: 'Details about each object.' }),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1FinancialConnectionsAccountsAccountRefresh: t.procedure
    .input(z.object({ account: z.string().max(5000) }))
    .output(FinancialConnectionsAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1FinancialConnectionsAccountsAccountSubscribe: t.procedure
    .input(z.object({ account: z.string().max(5000) }))
    .output(FinancialConnectionsAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1FinancialConnectionsAccountsAccountUnsubscribe: t.procedure
    .input(z.object({ account: z.string().max(5000) }))
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
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        session: z.string().max(5000),
      }),
    )
    .output(FinancialConnectionsSessionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1FinancialConnectionsTransactions: t.procedure
    .input(
      z.object({
        account: z.string().max(5000),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
        transacted_at: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        transaction_refresh: z.object({ after: z.string().max(5000) }).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z
            .array(FinancialConnectionsTransactionSchema)
            .meta({ description: 'Details about each object.' }),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/financial_connections\/transactions/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1FinancialConnectionsTransactionsTransaction: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        transaction: z.string().max(5000),
      }),
    )
    .output(FinancialConnectionsTransactionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ForwardingRequests: t.procedure
    .input(
      z.object({
        created: z
          .object({
            gt: z.int().exactOptional(),
            gte: z.int().exactOptional(),
            lt: z.int().exactOptional(),
            lte: z.int().exactOptional(),
          })
          .exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(ForwardingRequestSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: 'List of ForwardingRequest data.' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ForwardingRequests: t.procedure.output(ForwardingRequestSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1ForwardingRequestsId: t.procedure
    .input(
      z.object({ expand: z.array(z.string().max(5000)).exactOptional(), id: z.string().max(5000) }),
    )
    .output(ForwardingRequestSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IdentityVerificationReports: t.procedure
    .input(
      z.object({
        client_reference_id: z.string().max(5000).exactOptional(),
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
        type: z.enum(['document', 'id_number']).exactOptional(),
        verification_session: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(IdentityVerificationReportSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/identity\/verification_reports/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IdentityVerificationReportsReport: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        report: z.string().max(5000),
      }),
    )
    .output(IdentityVerificationReportSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IdentityVerificationSessions: t.procedure
    .input(
      z.object({
        client_reference_id: z.string().max(5000).exactOptional(),
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        related_customer: z.string().max(5000).exactOptional(),
        related_customer_account: z.string().max(5000).exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
        status: z.enum(['canceled', 'processing', 'requires_input', 'verified']).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(IdentityVerificationSessionSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/identity\/verification_sessions/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
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
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        session: z.string().max(5000),
      }),
    )
    .output(IdentityVerificationSessionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IdentityVerificationSessionsSession: t.procedure
    .input(z.object({ session: z.string().max(5000) }))
    .output(IdentityVerificationSessionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IdentityVerificationSessionsSessionCancel: t.procedure
    .input(z.object({ session: z.string().max(5000) }))
    .output(IdentityVerificationSessionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IdentityVerificationSessionsSessionRedact: t.procedure
    .input(z.object({ session: z.string().max(5000) }))
    .output(IdentityVerificationSessionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1InvoicePayments: t.procedure
    .input(
      z.object({
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        invoice: z.string().max(5000).exactOptional(),
        limit: z.int().exactOptional(),
        payment: z
          .object({
            payment_intent: z.string().max(5000).exactOptional(),
            payment_record: z.string().max(5000).exactOptional(),
            type: z.enum(['payment_intent', 'payment_record']),
          })
          .exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
        status: z.enum(['canceled', 'open', 'paid']).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(InvoicePaymentSchema).meta({ description: 'Details about each object.' }),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1InvoicePaymentsInvoicePayment: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        invoice_payment: z.string().max(5000),
      }),
    )
    .output(InvoicePaymentSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1InvoiceRenderingTemplates: t.procedure
    .input(
      z.object({
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
        status: z.enum(['active', 'archived']).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z
            .array(InvoiceRenderingTemplateSchema)
            .meta({ description: 'Details about each object.' }),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1InvoiceRenderingTemplatesTemplate: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        template: z.string().max(5000),
        version: z.int().exactOptional(),
      }),
    )
    .output(InvoiceRenderingTemplateSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoiceRenderingTemplatesTemplateArchive: t.procedure
    .input(z.object({ template: z.string().max(5000) }))
    .output(InvoiceRenderingTemplateSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoiceRenderingTemplatesTemplateUnarchive: t.procedure
    .input(z.object({ template: z.string().max(5000) }))
    .output(InvoiceRenderingTemplateSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Invoiceitems: t.procedure
    .input(
      z.object({
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        customer: z.string().max(5000).exactOptional(),
        customer_account: z.string().max(5000).exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        invoice: z.string().max(5000).exactOptional(),
        limit: z.int().exactOptional(),
        pending: z.boolean().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(InvoiceitemSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/invoiceitems/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Invoiceitems: t.procedure.output(InvoiceitemSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1InvoiceitemsInvoiceitem: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        invoiceitem: z.string().max(5000),
      }),
    )
    .output(InvoiceitemSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoiceitemsInvoiceitem: t.procedure
    .input(z.object({ invoiceitem: z.string().max(5000) }))
    .output(InvoiceitemSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1InvoiceitemsInvoiceitem: t.procedure
    .input(z.object({ invoiceitem: z.string().max(5000) }))
    .output(DeletedInvoiceitemSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Invoices: t.procedure
    .input(
      z.object({
        collection_method: z.enum(['charge_automatically', 'send_invoice']).exactOptional(),
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        customer: z.string().max(5000).exactOptional(),
        customer_account: z.string().max(5000).exactOptional(),
        due_date: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
        status: z.enum(['draft', 'open', 'paid', 'uncollectible', 'void']).exactOptional(),
        subscription: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(InvoiceSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/invoices/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
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
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        page: z.string().max(5000).exactOptional(),
        query: z.string().max(5000),
      }),
    )
    .output(
      z
        .object({
          data: z.array(InvoiceSchema),
          has_more: z.boolean(),
          next_page: z.string().max(5000).nullable().exactOptional(),
          object: z
            .literal('search_result')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value.",
            }),
          total_count: z
            .int()
            .meta({
              description:
                'The total number of objects that match the query, only accurate up to 10,000.',
            })
            .exactOptional(),
          url: z.string().max(5000),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1InvoicesInvoice: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        invoice: z.string().max(5000),
      }),
    )
    .output(InvoiceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoicesInvoice: t.procedure
    .input(z.object({ invoice: z.string().max(5000) }))
    .output(InvoiceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1InvoicesInvoice: t.procedure
    .input(z.object({ invoice: z.string().max(5000) }))
    .output(DeletedInvoiceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoicesInvoiceAddLines: t.procedure
    .input(z.object({ invoice: z.string().max(5000) }))
    .output(InvoiceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoicesInvoiceAttachPayment: t.procedure
    .input(z.object({ invoice: z.string().max(5000) }))
    .output(InvoiceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoicesInvoiceFinalize: t.procedure
    .input(z.object({ invoice: z.string().max(5000) }))
    .output(InvoiceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1InvoicesInvoiceLines: t.procedure
    .input(
      z.object({
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        invoice: z.string().max(5000),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(LineItemSchema).meta({ description: 'Details about each object.' }),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoicesInvoiceLinesLineItemId: t.procedure
    .input(z.object({ invoice: z.string().max(5000), line_item_id: z.string().max(5000) }))
    .output(LineItemSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoicesInvoiceMarkUncollectible: t.procedure
    .input(z.object({ invoice: z.string().max(5000) }))
    .output(InvoiceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoicesInvoicePay: t.procedure
    .input(z.object({ invoice: z.string().max(5000) }))
    .output(InvoiceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoicesInvoiceRemoveLines: t.procedure
    .input(z.object({ invoice: z.string().max(5000) }))
    .output(InvoiceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoicesInvoiceSend: t.procedure
    .input(z.object({ invoice: z.string().max(5000) }))
    .output(InvoiceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoicesInvoiceUpdateLines: t.procedure
    .input(z.object({ invoice: z.string().max(5000) }))
    .output(InvoiceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1InvoicesInvoiceVoid: t.procedure
    .input(z.object({ invoice: z.string().max(5000) }))
    .output(InvoiceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingAuthorizations: t.procedure
    .input(
      z.object({
        card: z.string().max(5000).exactOptional(),
        cardholder: z.string().max(5000).exactOptional(),
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
        status: z.enum(['closed', 'expired', 'pending', 'reversed']).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(IssuingAuthorizationSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/issuing\/authorizations/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingAuthorizationsAuthorization: t.procedure
    .input(
      z.object({
        authorization: z.string().max(5000),
        expand: z.array(z.string().max(5000)).exactOptional(),
      }),
    )
    .output(IssuingAuthorizationSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingAuthorizationsAuthorization: t.procedure
    .input(z.object({ authorization: z.string().max(5000) }))
    .output(IssuingAuthorizationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingAuthorizationsAuthorizationApprove: t.procedure
    .input(z.object({ authorization: z.string().max(5000) }))
    .output(IssuingAuthorizationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingAuthorizationsAuthorizationDecline: t.procedure
    .input(z.object({ authorization: z.string().max(5000) }))
    .output(IssuingAuthorizationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingCardholders: t.procedure
    .input(
      z.object({
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        email: z.string().exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        phone_number: z.string().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
        status: z.enum(['active', 'blocked', 'inactive']).exactOptional(),
        type: z.enum(['company', 'individual']).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(IssuingCardholderSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/issuing\/cardholders/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingCardholders: t.procedure.output(IssuingCardholderSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1IssuingCardholdersCardholder: t.procedure
    .input(
      z.object({
        cardholder: z.string().max(5000),
        expand: z.array(z.string().max(5000)).exactOptional(),
      }),
    )
    .output(IssuingCardholderSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingCardholdersCardholder: t.procedure
    .input(z.object({ cardholder: z.string().max(5000) }))
    .output(IssuingCardholderSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingCards: t.procedure
    .input(
      z.object({
        cardholder: z.string().max(5000).exactOptional(),
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        exp_month: z.int().exactOptional(),
        exp_year: z.int().exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        last4: z.string().max(5000).exactOptional(),
        limit: z.int().exactOptional(),
        personalization_design: z.string().max(5000).exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
        status: z.enum(['active', 'canceled', 'inactive']).exactOptional(),
        type: z.enum(['physical', 'virtual']).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(IssuingCardSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/issuing\/cards/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingCards: t.procedure.output(IssuingCardSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1IssuingCardsCard: t.procedure
    .input(
      z.object({
        card: z.string().max(5000),
        expand: z.array(z.string().max(5000)).exactOptional(),
      }),
    )
    .output(IssuingCardSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingCardsCard: t.procedure
    .input(z.object({ card: z.string().max(5000) }))
    .output(IssuingCardSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingDisputes: t.procedure
    .input(
      z.object({
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
        status: z.enum(['expired', 'lost', 'submitted', 'unsubmitted', 'won']).exactOptional(),
        transaction: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(IssuingDisputeSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/issuing\/disputes/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingDisputes: t.procedure.output(IssuingDisputeSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1IssuingDisputesDispute: t.procedure
    .input(
      z.object({
        dispute: z.string().max(5000),
        expand: z.array(z.string().max(5000)).exactOptional(),
      }),
    )
    .output(IssuingDisputeSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingDisputesDispute: t.procedure
    .input(z.object({ dispute: z.string().max(5000) }))
    .output(IssuingDisputeSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingDisputesDisputeSubmit: t.procedure
    .input(z.object({ dispute: z.string().max(5000) }))
    .output(IssuingDisputeSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingPersonalizationDesigns: t.procedure
    .input(
      z.object({
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        lookup_keys: z.array(z.string().max(200)).exactOptional(),
        preferences: z
          .object({
            is_default: z.boolean().exactOptional(),
            is_platform_default: z.boolean().exactOptional(),
          })
          .exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
        status: z.enum(['active', 'inactive', 'rejected', 'review']).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(IssuingPersonalizationDesignSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/issuing\/personalization_designs/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
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
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        personalization_design: z.string().max(5000),
      }),
    )
    .output(IssuingPersonalizationDesignSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingPersonalizationDesignsPersonalizationDesign: t.procedure
    .input(z.object({ personalization_design: z.string().max(5000) }))
    .output(IssuingPersonalizationDesignSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingPhysicalBundles: t.procedure
    .input(
      z.object({
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
        status: z.enum(['active', 'inactive', 'review']).exactOptional(),
        type: z.enum(['custom', 'standard']).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(IssuingPhysicalBundleSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/issuing\/physical_bundles/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingPhysicalBundlesPhysicalBundle: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        physical_bundle: z.string().max(5000),
      }),
    )
    .output(IssuingPhysicalBundleSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingSettlementsSettlement: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        settlement: z.string().max(5000),
      }),
    )
    .output(IssuingSettlementSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingSettlementsSettlement: t.procedure
    .input(z.object({ settlement: z.string().max(5000) }))
    .output(IssuingSettlementSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingTokens: t.procedure
    .input(
      z.object({
        card: z.string().max(5000),
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
        status: z.enum(['active', 'deleted', 'requested', 'suspended']).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(IssuingTokenSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingTokensToken: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        token: z.string().max(5000),
      }),
    )
    .output(IssuingTokenSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingTokensToken: t.procedure
    .input(z.object({ token: z.string().max(5000) }))
    .output(IssuingTokenSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingTransactions: t.procedure
    .input(
      z.object({
        card: z.string().max(5000).exactOptional(),
        cardholder: z.string().max(5000).exactOptional(),
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
        type: z.enum(['capture', 'refund']).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(IssuingTransactionSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/issuing\/transactions/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1IssuingTransactionsTransaction: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        transaction: z.string().max(5000),
      }),
    )
    .output(IssuingTransactionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1IssuingTransactionsTransaction: t.procedure
    .input(z.object({ transaction: z.string().max(5000) }))
    .output(IssuingTransactionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1LinkAccountSessions: t.procedure.output(FinancialConnectionsSessionSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1LinkAccountSessionsSession: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        session: z.string().max(5000),
      }),
    )
    .output(FinancialConnectionsSessionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1LinkedAccounts: t.procedure
    .input(
      z.object({
        account_holder: z
          .object({
            account: z.string().max(5000).exactOptional(),
            customer: z.string().max(5000).exactOptional(),
            customer_account: z.string().max(5000).exactOptional(),
          })
          .exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        session: z.string().max(5000).exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z
            .array(FinancialConnectionsAccountSchema)
            .meta({ description: 'Details about each object.' }),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/financial_connections\/accounts/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1LinkedAccountsAccount: t.procedure
    .input(
      z.object({
        account: z.string().max(5000),
        expand: z.array(z.string().max(5000)).exactOptional(),
      }),
    )
    .output(FinancialConnectionsAccountSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1LinkedAccountsAccountDisconnect: t.procedure
    .input(z.object({ account: z.string().max(5000) }))
    .output(FinancialConnectionsAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1LinkedAccountsAccountOwners: t.procedure
    .input(
      z.object({
        account: z.string().max(5000),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        ownership: z.string().max(5000),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z
            .array(FinancialConnectionsAccountOwnerSchema)
            .meta({ description: 'Details about each object.' }),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1LinkedAccountsAccountRefresh: t.procedure
    .input(z.object({ account: z.string().max(5000) }))
    .output(FinancialConnectionsAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1MandatesMandate: t.procedure
    .input(z.object({ expand: z.array(z.string().max(5000)).exactOptional(), mandate: z.string() }))
    .output(MandateSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentAttemptRecords: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        payment_record: z.string().max(5000),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(PaymentAttemptRecordSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: 'A list of PaymentAttemptRecords.' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentAttemptRecordsId: t.procedure
    .input(
      z.object({ expand: z.array(z.string().max(5000)).exactOptional(), id: z.string().max(5000) }),
    )
    .output(PaymentAttemptRecordSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentIntents: t.procedure
    .input(
      z.object({
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        customer: z.string().max(5000).exactOptional(),
        customer_account: z.string().max(5000).exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(PaymentIntentSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/payment_intents/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentIntents: t.procedure.output(PaymentIntentSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1PaymentIntentsSearch: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        page: z.string().max(5000).exactOptional(),
        query: z.string().max(5000),
      }),
    )
    .output(
      z
        .object({
          data: z.array(PaymentIntentSchema),
          has_more: z.boolean(),
          next_page: z.string().max(5000).nullable().exactOptional(),
          object: z
            .literal('search_result')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value.",
            }),
          total_count: z
            .int()
            .meta({
              description:
                'The total number of objects that match the query, only accurate up to 10,000.',
            })
            .exactOptional(),
          url: z.string().max(5000),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentIntentsIntent: t.procedure
    .input(
      z.object({
        client_secret: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        intent: z.string().max(5000),
      }),
    )
    .output(PaymentIntentSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentIntentsIntent: t.procedure
    .input(z.object({ intent: z.string().max(5000) }))
    .output(PaymentIntentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentIntentsIntentAmountDetailsLineItems: t.procedure
    .input(
      z.object({
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        intent: z.string().max(5000),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z
            .array(PaymentIntentAmountDetailsLineItemSchema)
            .meta({ description: 'Details about each object.' }),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentIntentsIntentApplyCustomerBalance: t.procedure
    .input(z.object({ intent: z.string().max(5000) }))
    .output(PaymentIntentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentIntentsIntentCancel: t.procedure
    .input(z.object({ intent: z.string().max(5000) }))
    .output(PaymentIntentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentIntentsIntentCapture: t.procedure
    .input(z.object({ intent: z.string().max(5000) }))
    .output(PaymentIntentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentIntentsIntentConfirm: t.procedure
    .input(z.object({ intent: z.string().max(5000) }))
    .output(PaymentIntentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentIntentsIntentIncrementAuthorization: t.procedure
    .input(z.object({ intent: z.string().max(5000) }))
    .output(PaymentIntentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentIntentsIntentVerifyMicrodeposits: t.procedure
    .input(z.object({ intent: z.string().max(5000) }))
    .output(PaymentIntentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentLinks: t.procedure
    .input(
      z.object({
        active: z.boolean().exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(PaymentLinkSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/payment_links/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentLinks: t.procedure.output(PaymentLinkSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1PaymentLinksPaymentLink: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        payment_link: z.string().max(5000),
      }),
    )
    .output(PaymentLinkSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentLinksPaymentLink: t.procedure
    .input(z.object({ payment_link: z.string().max(5000) }))
    .output(PaymentLinkSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentLinksPaymentLinkLineItems: t.procedure
    .input(
      z.object({
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        payment_link: z.string().max(5000),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(ItemSchema).meta({ description: 'Details about each object.' }),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentMethodConfigurations: t.procedure
    .input(
      z.object({
        active: z.boolean().exactOptional(),
        application: z.union([z.string().max(100), z.literal('')]).exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(PaymentMethodConfigurationSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/payment_method_configurations/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
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
      z.object({
        configuration: z.string().max(5000),
        expand: z.array(z.string().max(5000)).exactOptional(),
      }),
    )
    .output(PaymentMethodConfigurationSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentMethodConfigurationsConfiguration: t.procedure
    .input(z.object({ configuration: z.string().max(5000) }))
    .output(PaymentMethodConfigurationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentMethodDomains: t.procedure
    .input(
      z.object({
        domain_name: z.string().max(5000).exactOptional(),
        enabled: z.boolean().exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(PaymentMethodDomainSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/payment_method_domains/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentMethodDomains: t.procedure.output(PaymentMethodDomainSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1PaymentMethodDomainsPaymentMethodDomain: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        payment_method_domain: z.string().max(5000),
      }),
    )
    .output(PaymentMethodDomainSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentMethodDomainsPaymentMethodDomain: t.procedure
    .input(z.object({ payment_method_domain: z.string().max(5000) }))
    .output(PaymentMethodDomainSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentMethodDomainsPaymentMethodDomainValidate: t.procedure
    .input(z.object({ payment_method_domain: z.string().max(5000) }))
    .output(PaymentMethodDomainSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentMethods: t.procedure
    .input(
      z.object({
        allow_redisplay: z.enum(['always', 'limited', 'unspecified']).exactOptional(),
        customer: z.string().max(5000).exactOptional(),
        customer_account: z.string().max(5000).exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
        type: z
          .enum([
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
          ])
          .exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(PaymentMethodSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/payment_methods/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentMethods: t.procedure.output(PaymentMethodSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1PaymentMethodsPaymentMethod: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        payment_method: z.string().max(5000),
      }),
    )
    .output(PaymentMethodSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentMethodsPaymentMethod: t.procedure
    .input(z.object({ payment_method: z.string().max(5000) }))
    .output(PaymentMethodSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentMethodsPaymentMethodAttach: t.procedure
    .input(z.object({ payment_method: z.string().max(5000) }))
    .output(PaymentMethodSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentMethodsPaymentMethodDetach: t.procedure
    .input(z.object({ payment_method: z.string().max(5000) }))
    .output(PaymentMethodSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PaymentRecords: t.procedure
    .input(
      z.object({
        created_after: z.int().exactOptional(),
        created_before: z.int().exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(PaymentRecordSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: 'A list of PaymentRecords.' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentRecordsReportPayment: t.procedure.output(PaymentRecordSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1PaymentRecordsId: t.procedure
    .input(
      z.object({ expand: z.array(z.string().max(5000)).exactOptional(), id: z.string().max(5000) }),
    )
    .output(PaymentRecordSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentRecordsIdReportPaymentAttempt: t.procedure
    .input(z.object({ id: z.string().max(5000) }))
    .output(PaymentRecordSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentRecordsIdReportPaymentAttemptCanceled: t.procedure
    .input(z.object({ id: z.string().max(5000) }))
    .output(PaymentRecordSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentRecordsIdReportPaymentAttemptFailed: t.procedure
    .input(z.object({ id: z.string().max(5000) }))
    .output(PaymentRecordSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentRecordsIdReportPaymentAttemptGuaranteed: t.procedure
    .input(z.object({ id: z.string().max(5000) }))
    .output(PaymentRecordSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentRecordsIdReportPaymentAttemptInformational: t.procedure
    .input(z.object({ id: z.string().max(5000) }))
    .output(PaymentRecordSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PaymentRecordsIdReportRefund: t.procedure
    .input(z.object({ id: z.string().max(5000) }))
    .output(PaymentRecordSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Payouts: t.procedure
    .input(
      z.object({
        arrival_date: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        destination: z.string().exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
        status: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(PayoutSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/payouts/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Payouts: t.procedure.output(PayoutSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1PayoutsPayout: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        payout: z.string().max(5000),
      }),
    )
    .output(PayoutSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PayoutsPayout: t.procedure
    .input(z.object({ payout: z.string().max(5000) }))
    .output(PayoutSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PayoutsPayoutCancel: t.procedure
    .input(z.object({ payout: z.string().max(5000) }))
    .output(PayoutSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PayoutsPayoutReverse: t.procedure
    .input(z.object({ payout: z.string().max(5000) }))
    .output(PayoutSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Plans: t.procedure
    .input(
      z.object({
        active: z.boolean().exactOptional(),
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        product: z.string().max(5000).exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(PlanSchema).meta({ description: 'Details about each object.' }),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/plans/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Plans: t.procedure.output(PlanSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1PlansPlan: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        plan: z.string().max(5000),
      }),
    )
    .output(PlanSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PlansPlan: t.procedure
    .input(z.object({ plan: z.string().max(5000) }))
    .output(PlanSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1PlansPlan: t.procedure
    .input(z.object({ plan: z.string().max(5000) }))
    .output(DeletedPlanSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Prices: t.procedure
    .input(
      z.object({
        active: z.boolean().exactOptional(),
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        currency: z.string().exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        lookup_keys: z.array(z.string().max(5000)).exactOptional(),
        product: z.string().max(5000).exactOptional(),
        recurring: z
          .object({
            interval: z.enum(['day', 'month', 'week', 'year']).exactOptional(),
            meter: z.string().max(5000).exactOptional(),
            usage_type: z.enum(['licensed', 'metered']).exactOptional(),
          })
          .exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
        type: z.enum(['one_time', 'recurring']).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(PriceSchema).meta({ description: 'Details about each object.' }),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/prices/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Prices: t.procedure.output(PriceSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1PricesSearch: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        page: z.string().max(5000).exactOptional(),
        query: z.string().max(5000),
      }),
    )
    .output(
      z
        .object({
          data: z.array(PriceSchema),
          has_more: z.boolean(),
          next_page: z.string().max(5000).nullable().exactOptional(),
          object: z
            .literal('search_result')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value.",
            }),
          total_count: z
            .int()
            .meta({
              description:
                'The total number of objects that match the query, only accurate up to 10,000.',
            })
            .exactOptional(),
          url: z.string().max(5000),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PricesPrice: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        price: z.string().max(5000),
      }),
    )
    .output(PriceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PricesPrice: t.procedure
    .input(z.object({ price: z.string().max(5000) }))
    .output(PriceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ProductCatalogTrialOffers: t.procedure
    .input(
      z.object({
        active: z.boolean().exactOptional(),
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        prices: z.array(z.string().max(5000)).exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z
            .array(ProductCatalogTrialOfferSchema)
            .meta({ description: 'Details about each object.' }),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
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
      z.object({ expand: z.array(z.string().max(5000)).exactOptional(), id: z.string().max(5000) }),
    )
    .output(ProductCatalogTrialOfferSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ProductCatalogTrialOffersId: t.procedure
    .input(z.object({ id: z.string().max(5000) }))
    .output(ProductCatalogTrialOfferSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Products: t.procedure
    .input(
      z.object({
        active: z.boolean().exactOptional(),
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        ids: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        shippable: z.boolean().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
        url: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(ProductSchema).meta({ description: 'Details about each object.' }),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/products/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Products: t.procedure.output(ProductSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1ProductsSearch: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        page: z.string().max(5000).exactOptional(),
        query: z.string().max(5000),
      }),
    )
    .output(
      z
        .object({
          data: z.array(ProductSchema),
          has_more: z.boolean(),
          next_page: z.string().max(5000).nullable().exactOptional(),
          object: z
            .literal('search_result')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value.",
            }),
          total_count: z
            .int()
            .meta({
              description:
                'The total number of objects that match the query, only accurate up to 10,000.',
            })
            .exactOptional(),
          url: z.string().max(5000),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ProductsId: t.procedure
    .input(
      z.object({ expand: z.array(z.string().max(5000)).exactOptional(), id: z.string().max(5000) }),
    )
    .output(ProductSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ProductsId: t.procedure
    .input(z.object({ id: z.string().max(5000) }))
    .output(ProductSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1ProductsId: t.procedure
    .input(z.object({ id: z.string().max(5000) }))
    .output(DeletedProductSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ProductsProductFeatures: t.procedure
    .input(
      z.object({
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        product: z.string().max(5000),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(ProductFeatureSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ProductsProductFeatures: t.procedure
    .input(z.object({ product: z.string().max(5000) }))
    .output(ProductFeatureSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ProductsProductFeaturesId: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        id: z.string().max(5000),
        product: z.string().max(5000),
      }),
    )
    .output(ProductFeatureSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1ProductsProductFeaturesId: t.procedure
    .input(z.object({ id: z.string().max(5000), product: z.string().max(5000) }))
    .output(DeletedProductFeatureSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1PromotionCodes: t.procedure
    .input(
      z.object({
        active: z.boolean().exactOptional(),
        code: z.string().max(5000).exactOptional(),
        coupon: z.string().max(5000).exactOptional(),
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        customer: z.string().max(5000).exactOptional(),
        customer_account: z.string().max(5000).exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(PromotionCodeSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/promotion_codes/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PromotionCodes: t.procedure.output(PromotionCodeSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1PromotionCodesPromotionCode: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        promotion_code: z.string().max(5000),
      }),
    )
    .output(PromotionCodeSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1PromotionCodesPromotionCode: t.procedure
    .input(z.object({ promotion_code: z.string().max(5000) }))
    .output(PromotionCodeSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Quotes: t.procedure
    .input(
      z.object({
        customer: z.string().max(5000).exactOptional(),
        customer_account: z.string().max(5000).exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
        status: z.enum(['accepted', 'canceled', 'draft', 'open']).exactOptional(),
        test_clock: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(QuoteSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/quotes/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Quotes: t.procedure.output(QuoteSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1QuotesQuote: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        quote: z.string().max(5000),
      }),
    )
    .output(QuoteSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1QuotesQuote: t.procedure
    .input(z.object({ quote: z.string().max(5000) }))
    .output(QuoteSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1QuotesQuoteAccept: t.procedure
    .input(z.object({ quote: z.string().max(5000) }))
    .output(QuoteSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1QuotesQuoteCancel: t.procedure
    .input(z.object({ quote: z.string().max(5000) }))
    .output(QuoteSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1QuotesQuoteComputedUpfrontLineItems: t.procedure
    .input(
      z.object({
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        quote: z.string().max(5000),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(ItemSchema).meta({ description: 'Details about each object.' }),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1QuotesQuoteFinalize: t.procedure
    .input(z.object({ quote: z.string().max(5000) }))
    .output(QuoteSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1QuotesQuoteLineItems: t.procedure
    .input(
      z.object({
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        quote: z.string().max(5000),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(ItemSchema).meta({ description: 'Details about each object.' }),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1QuotesQuotePdf: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        quote: z.string().max(5000),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1RadarEarlyFraudWarnings: t.procedure
    .input(
      z.object({
        charge: z.string().exactOptional(),
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        payment_intent: z.string().max(5000).exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(RadarEarlyFraudWarningSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/radar\/early_fraud_warnings/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1RadarEarlyFraudWarningsEarlyFraudWarning: t.procedure
    .input(
      z.object({
        early_fraud_warning: z.string().max(5000),
        expand: z.array(z.string().max(5000)).exactOptional(),
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
      z.object({
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
        value: z.string().max(800).exactOptional(),
        value_list: z.string().max(5000),
      }),
    )
    .output(
      z
        .object({
          data: z.array(RadarValueListItemSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/radar\/value_list_items/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1RadarValueListItems: t.procedure.output(RadarValueListItemSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1RadarValueListItemsItem: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        item: z.string().max(5000),
      }),
    )
    .output(RadarValueListItemSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1RadarValueListItemsItem: t.procedure
    .input(z.object({ item: z.string().max(5000) }))
    .output(DeletedRadarValueListItemSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1RadarValueLists: t.procedure
    .input(
      z.object({
        alias: z.string().max(100).exactOptional(),
        contains: z.string().max(800).exactOptional(),
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(RadarValueListSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/radar\/value_lists/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1RadarValueLists: t.procedure.output(RadarValueListSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1RadarValueListsValueList: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        value_list: z.string().max(5000),
      }),
    )
    .output(RadarValueListSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1RadarValueListsValueList: t.procedure
    .input(z.object({ value_list: z.string().max(5000) }))
    .output(RadarValueListSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1RadarValueListsValueList: t.procedure
    .input(z.object({ value_list: z.string().max(5000) }))
    .output(DeletedRadarValueListSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Refunds: t.procedure
    .input(
      z.object({
        charge: z.string().exactOptional(),
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        ending_before: z.string().exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        payment_intent: z.string().max(5000).exactOptional(),
        starting_after: z.string().exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(RefundSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/refunds/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Refunds: t.procedure.output(RefundSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1RefundsRefund: t.procedure
    .input(z.object({ expand: z.array(z.string().max(5000)).exactOptional(), refund: z.string() }))
    .output(RefundSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1RefundsRefund: t.procedure
    .input(z.object({ refund: z.string() }))
    .output(RefundSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1RefundsRefundCancel: t.procedure
    .input(z.object({ refund: z.string() }))
    .output(RefundSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ReportingReportRuns: t.procedure
    .input(
      z.object({
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(ReportingReportRunSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/reporting\/report_runs/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ReportingReportRuns: t.procedure.output(ReportingReportRunSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1ReportingReportRunsReportRun: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        report_run: z.string().max(5000),
      }),
    )
    .output(ReportingReportRunSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ReportingReportTypes: t.procedure
    .input(z.object({ expand: z.array(z.string().max(5000)).exactOptional() }))
    .output(
      z
        .object({
          data: z.array(ReportingReportTypeSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ReportingReportTypesReportType: t.procedure
    .input(
      z.object({ expand: z.array(z.string().max(5000)).exactOptional(), report_type: z.string() }),
    )
    .output(ReportingReportTypeSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Reviews: t.procedure
    .input(
      z.object({
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(ReviewSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ReviewsReview: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        review: z.string().max(5000),
      }),
    )
    .output(ReviewSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ReviewsReviewApprove: t.procedure
    .input(z.object({ review: z.string().max(5000) }))
    .output(ReviewSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1SetupAttempts: t.procedure
    .input(
      z.object({
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        setup_intent: z.string().max(5000),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(SetupAttemptSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/setup_attempts/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1SetupIntents: t.procedure
    .input(
      z.object({
        attach_to_self: z.boolean().exactOptional(),
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        customer: z.string().max(5000).exactOptional(),
        customer_account: z.string().max(5000).exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        payment_method: z.string().max(5000).exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(SetupIntentSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/setup_intents/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SetupIntents: t.procedure.output(SetupIntentSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1SetupIntentsIntent: t.procedure
    .input(
      z.object({
        client_secret: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        intent: z.string().max(5000),
      }),
    )
    .output(SetupIntentSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SetupIntentsIntent: t.procedure
    .input(z.object({ intent: z.string().max(5000) }))
    .output(SetupIntentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SetupIntentsIntentCancel: t.procedure
    .input(z.object({ intent: z.string().max(5000) }))
    .output(SetupIntentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SetupIntentsIntentConfirm: t.procedure
    .input(z.object({ intent: z.string().max(5000) }))
    .output(SetupIntentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SetupIntentsIntentVerifyMicrodeposits: t.procedure
    .input(z.object({ intent: z.string().max(5000) }))
    .output(SetupIntentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1ShippingRates: t.procedure
    .input(
      z.object({
        active: z.boolean().exactOptional(),
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        currency: z.string().exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(ShippingRateSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/shipping_rates/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ShippingRates: t.procedure.output(ShippingRateSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1ShippingRatesShippingRateToken: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        shipping_rate_token: z.string().max(5000),
      }),
    )
    .output(ShippingRateSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ShippingRatesShippingRateToken: t.procedure
    .input(z.object({ shipping_rate_token: z.string().max(5000) }))
    .output(ShippingRateSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SigmaSavedQueriesId: t.procedure
    .input(z.object({ id: z.string().max(5000) }))
    .output(SigmaSigmaApiQuerySchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1SigmaScheduledQueryRuns: t.procedure
    .input(
      z.object({
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(ScheduledQueryRunSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/sigma\/scheduled_query_runs/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1SigmaScheduledQueryRunsScheduledQueryRun: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        scheduled_query_run: z.string().max(5000),
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
      z.object({
        client_secret: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        source: z.string().max(5000),
      }),
    )
    .output(SourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SourcesSource: t.procedure
    .input(z.object({ source: z.string().max(5000) }))
    .output(SourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1SourcesSourceMandateNotificationsMandateNotification: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        mandate_notification: z.string().max(5000),
        source: z.string().max(5000),
      }),
    )
    .output(SourceMandateNotificationSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1SourcesSourceSourceTransactions: t.procedure
    .input(
      z.object({
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        source: z.string().max(5000),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(SourceTransactionSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1SourcesSourceSourceTransactionsSourceTransaction: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        source: z.string().max(5000),
        source_transaction: z.string().max(5000),
      }),
    )
    .output(SourceTransactionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SourcesSourceVerify: t.procedure
    .input(z.object({ source: z.string().max(5000) }))
    .output(SourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1SubscriptionItems: t.procedure
    .input(
      z.object({
        ending_before: z.string().exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().exactOptional(),
        subscription: z.string().max(5000),
      }),
    )
    .output(
      z
        .object({
          data: z.array(SubscriptionItemSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/subscription_items/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SubscriptionItems: t.procedure.output(SubscriptionItemSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1SubscriptionItemsItem: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        item: z.string().max(5000),
      }),
    )
    .output(SubscriptionItemSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SubscriptionItemsItem: t.procedure
    .input(z.object({ item: z.string().max(5000) }))
    .output(SubscriptionItemSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1SubscriptionItemsItem: t.procedure
    .input(z.object({ item: z.string().max(5000) }))
    .output(DeletedSubscriptionItemSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1SubscriptionSchedules: t.procedure
    .input(
      z.object({
        canceled_at: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        completed_at: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        customer: z.string().max(5000).exactOptional(),
        customer_account: z.string().max(5000).exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        released_at: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        scheduled: z.boolean().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(SubscriptionScheduleSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/subscription_schedules/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SubscriptionSchedules: t.procedure.output(SubscriptionScheduleSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1SubscriptionSchedulesSchedule: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        schedule: z.string().max(5000),
      }),
    )
    .output(SubscriptionScheduleSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SubscriptionSchedulesSchedule: t.procedure
    .input(z.object({ schedule: z.string().max(5000) }))
    .output(SubscriptionScheduleSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SubscriptionSchedulesScheduleCancel: t.procedure
    .input(z.object({ schedule: z.string().max(5000) }))
    .output(SubscriptionScheduleSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SubscriptionSchedulesScheduleRelease: t.procedure
    .input(z.object({ schedule: z.string().max(5000) }))
    .output(SubscriptionScheduleSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Subscriptions: t.procedure
    .input(
      z.object({
        automatic_tax: z.object({ enabled: z.boolean() }).exactOptional(),
        collection_method: z.enum(['charge_automatically', 'send_invoice']).exactOptional(),
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        current_period_end: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        current_period_start: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        customer: z.string().max(5000).exactOptional(),
        customer_account: z.string().max(5000).exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        price: z.string().max(5000).exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
        status: z
          .enum([
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
          ])
          .exactOptional(),
        test_clock: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(SubscriptionSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/subscriptions/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Subscriptions: t.procedure.output(SubscriptionSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1SubscriptionsSearch: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        page: z.string().max(5000).exactOptional(),
        query: z.string().max(5000),
      }),
    )
    .output(
      z
        .object({
          data: z.array(SubscriptionSchema),
          has_more: z.boolean(),
          next_page: z.string().max(5000).nullable().exactOptional(),
          object: z
            .literal('search_result')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value.",
            }),
          total_count: z
            .int()
            .meta({
              description:
                'The total number of objects that match the query, only accurate up to 10,000.',
            })
            .exactOptional(),
          url: z.string().max(5000),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1SubscriptionsSubscriptionExposedId: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        subscription_exposed_id: z.string().max(5000),
      }),
    )
    .output(SubscriptionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SubscriptionsSubscriptionExposedId: t.procedure
    .input(z.object({ subscription_exposed_id: z.string().max(5000) }))
    .output(SubscriptionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1SubscriptionsSubscriptionExposedId: t.procedure
    .input(z.object({ subscription_exposed_id: z.string().max(5000) }))
    .output(SubscriptionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1SubscriptionsSubscriptionExposedIdDiscount: t.procedure
    .input(z.object({ subscription_exposed_id: z.string().max(5000) }))
    .output(DeletedDiscountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SubscriptionsSubscriptionMigrate: t.procedure
    .input(z.object({ subscription: z.string().max(5000) }))
    .output(SubscriptionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SubscriptionsSubscriptionPause: t.procedure
    .input(z.object({ subscription: z.string().max(5000) }))
    .output(SubscriptionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1SubscriptionsSubscriptionResume: t.procedure
    .input(z.object({ subscription: z.string().max(5000) }))
    .output(SubscriptionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TaxAssociationsFind: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        payment_intent: z.string().max(5000),
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
      z.object({
        calculation: z.string().max(5000),
        expand: z.array(z.string().max(5000)).exactOptional(),
      }),
    )
    .output(TaxCalculationSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TaxCalculationsCalculationLineItems: t.procedure
    .input(
      z.object({
        calculation: z.string().max(5000),
        ending_before: z.string().max(500).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(500).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z
            .array(TaxCalculationLineItemSchema)
            .meta({ description: 'Details about each object.' }),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/tax\/calculations\/[^\/]+\/line_items/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TaxLocations: t.procedure
    .input(
      z.object({
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
        type: z.literal('performance'),
      }),
    )
    .output(
      z
        .object({
          data: z.array(TaxLocationSchema).meta({ description: 'Details about each object.' }),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/tax\/locations/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TaxLocations: t.procedure.output(TaxLocationSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TaxLocationsLocation: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        location: z.string().max(5000),
      }),
    )
    .output(TaxLocationSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TaxRegistrations: t.procedure
    .input(
      z.object({
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
        status: z.enum(['active', 'all', 'expired', 'scheduled']).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(TaxRegistrationSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/tax\/registrations/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TaxRegistrations: t.procedure.output(TaxRegistrationSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TaxRegistrationsId: t.procedure
    .input(
      z.object({ expand: z.array(z.string().max(5000)).exactOptional(), id: z.string().max(5000) }),
    )
    .output(TaxRegistrationSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TaxRegistrationsId: t.procedure
    .input(z.object({ id: z.string().max(5000) }))
    .output(TaxRegistrationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TaxSettings: t.procedure
    .input(z.object({ expand: z.array(z.string().max(5000)).exactOptional() }))
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
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        transaction: z.string().max(5000),
      }),
    )
    .output(TaxTransactionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TaxTransactionsTransactionLineItems: t.procedure
    .input(
      z.object({
        ending_before: z.string().max(500).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(500).exactOptional(),
        transaction: z.string().max(5000),
      }),
    )
    .output(
      z
        .object({
          data: z
            .array(TaxTransactionLineItemSchema)
            .meta({ description: 'Details about each object.' }),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/tax\/transactions\/[^\/]+\/line_items/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TaxCodes: t.procedure
    .input(
      z.object({
        ending_before: z.string().exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(TaxCodeSchema).meta({ description: 'Details about each object.' }),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TaxCodesId: t.procedure
    .input(
      z.object({ expand: z.array(z.string().max(5000)).exactOptional(), id: z.string().max(5000) }),
    )
    .output(TaxCodeSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TaxIds: t.procedure
    .input(
      z.object({
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        owner: z
          .object({
            account: z.string().exactOptional(),
            customer: z.string().max(5000).exactOptional(),
            customer_account: z.string().max(5000).exactOptional(),
            type: z.enum(['account', 'application', 'customer', 'self']),
          })
          .exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(TaxIdSchema).meta({ description: 'Details about each object.' }),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TaxIds: t.procedure.output(TaxIdSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TaxIdsId: t.procedure
    .input(
      z.object({ expand: z.array(z.string().max(5000)).exactOptional(), id: z.string().max(5000) }),
    )
    .output(TaxIdSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1TaxIdsId: t.procedure
    .input(z.object({ id: z.string().max(5000) }))
    .output(DeletedTaxIdSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TaxRates: t.procedure
    .input(
      z.object({
        active: z.boolean().exactOptional(),
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        inclusive: z.boolean().exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(TaxRateSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/tax_rates/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TaxRates: t.procedure.output(TaxRateSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TaxRatesTaxRate: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        tax_rate: z.string().max(5000),
      }),
    )
    .output(TaxRateSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TaxRatesTaxRate: t.procedure
    .input(z.object({ tax_rate: z.string().max(5000) }))
    .output(TaxRateSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TerminalConfigurations: t.procedure
    .input(
      z.object({
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        is_account_default: z.boolean().exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(TerminalConfigurationSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/terminal\/configurations/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalConfigurations: t.procedure.output(TerminalConfigurationSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TerminalConfigurationsConfiguration: t.procedure
    .input(
      z.object({
        configuration: z.string().max(5000),
        expand: z.array(z.string().max(5000)).exactOptional(),
      }),
    )
    .output(z.union([TerminalConfigurationSchema, DeletedTerminalConfigurationSchema]))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalConfigurationsConfiguration: t.procedure
    .input(z.object({ configuration: z.string().max(5000) }))
    .output(z.union([TerminalConfigurationSchema, DeletedTerminalConfigurationSchema]))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1TerminalConfigurationsConfiguration: t.procedure
    .input(z.object({ configuration: z.string().max(5000) }))
    .output(DeletedTerminalConfigurationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalConnectionTokens: t.procedure.output(TerminalConnectionTokenSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TerminalLocations: t.procedure
    .input(
      z.object({
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(TerminalLocationSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/terminal\/locations/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalLocations: t.procedure.output(TerminalLocationSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TerminalLocationsLocation: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        location: z.string().max(5000),
      }),
    )
    .output(z.union([TerminalLocationSchema, DeletedTerminalLocationSchema]))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalLocationsLocation: t.procedure
    .input(z.object({ location: z.string().max(5000) }))
    .output(z.union([TerminalLocationSchema, DeletedTerminalLocationSchema]))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1TerminalLocationsLocation: t.procedure
    .input(z.object({ location: z.string().max(5000) }))
    .output(DeletedTerminalLocationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalOnboardingLinks: t.procedure.output(TerminalOnboardingLinkSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TerminalReaders: t.procedure
    .input(
      z.object({
        device_type: z
          .enum([
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
          ])
          .exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        location: z.string().max(5000).exactOptional(),
        serial_number: z.string().max(5000).exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
        status: z.enum(['offline', 'online']).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(TerminalReaderSchema).meta({ description: 'A list of readers' }),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalReaders: t.procedure.output(TerminalReaderSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TerminalReadersReader: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        reader: z.string().max(5000),
      }),
    )
    .output(z.union([TerminalReaderSchema, DeletedTerminalReaderSchema]))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalReadersReader: t.procedure
    .input(z.object({ reader: z.string().max(5000) }))
    .output(z.union([TerminalReaderSchema, DeletedTerminalReaderSchema]))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1TerminalReadersReader: t.procedure
    .input(z.object({ reader: z.string().max(5000) }))
    .output(DeletedTerminalReaderSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalReadersReaderCancelAction: t.procedure
    .input(z.object({ reader: z.string().max(5000) }))
    .output(z.union([TerminalReaderSchema, DeletedTerminalReaderSchema]))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalReadersReaderCollectInputs: t.procedure
    .input(z.object({ reader: z.string().max(5000) }))
    .output(TerminalReaderSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalReadersReaderCollectPaymentMethod: t.procedure
    .input(z.object({ reader: z.string().max(5000) }))
    .output(TerminalReaderSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalReadersReaderConfirmPaymentIntent: t.procedure
    .input(z.object({ reader: z.string().max(5000) }))
    .output(TerminalReaderSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalReadersReaderProcessPaymentIntent: t.procedure
    .input(z.object({ reader: z.string().max(5000) }))
    .output(TerminalReaderSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalReadersReaderProcessSetupIntent: t.procedure
    .input(z.object({ reader: z.string().max(5000) }))
    .output(TerminalReaderSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalReadersReaderRefundPayment: t.procedure
    .input(z.object({ reader: z.string().max(5000) }))
    .output(TerminalReaderSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TerminalReadersReaderSetReaderDisplay: t.procedure
    .input(z.object({ reader: z.string().max(5000) }))
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
    .input(z.object({ customer: z.string().max(5000) }))
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
    .input(z.object({ authorization: z.string().max(5000) }))
    .output(IssuingAuthorizationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingAuthorizationsAuthorizationExpire: t.procedure
    .input(z.object({ authorization: z.string().max(5000) }))
    .output(IssuingAuthorizationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingAuthorizationsAuthorizationFinalizeAmount: t.procedure
    .input(z.object({ authorization: z.string().max(5000) }))
    .output(IssuingAuthorizationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingAuthorizationsAuthorizationFraudChallengesRespond: t.procedure
    .input(z.object({ authorization: z.string().max(5000) }))
    .output(IssuingAuthorizationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingAuthorizationsAuthorizationIncrement: t.procedure
    .input(z.object({ authorization: z.string().max(5000) }))
    .output(IssuingAuthorizationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingAuthorizationsAuthorizationReverse: t.procedure
    .input(z.object({ authorization: z.string().max(5000) }))
    .output(IssuingAuthorizationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingCardsCardShippingDeliver: t.procedure
    .input(z.object({ card: z.string().max(5000) }))
    .output(IssuingCardSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingCardsCardShippingFail: t.procedure
    .input(z.object({ card: z.string().max(5000) }))
    .output(IssuingCardSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingCardsCardShippingReturn: t.procedure
    .input(z.object({ card: z.string().max(5000) }))
    .output(IssuingCardSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingCardsCardShippingShip: t.procedure
    .input(z.object({ card: z.string().max(5000) }))
    .output(IssuingCardSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingCardsCardShippingSubmit: t.procedure
    .input(z.object({ card: z.string().max(5000) }))
    .output(IssuingCardSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingPersonalizationDesignsPersonalizationDesignActivate: t.procedure
    .input(z.object({ personalization_design: z.string().max(5000) }))
    .output(IssuingPersonalizationDesignSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingPersonalizationDesignsPersonalizationDesignDeactivate: t.procedure
    .input(z.object({ personalization_design: z.string().max(5000) }))
    .output(IssuingPersonalizationDesignSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingPersonalizationDesignsPersonalizationDesignReject: t.procedure
    .input(z.object({ personalization_design: z.string().max(5000) }))
    .output(IssuingPersonalizationDesignSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersIssuingSettlements: t.procedure.output(IssuingSettlementSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  postV1TestHelpersIssuingSettlementsSettlementComplete: t.procedure
    .input(z.object({ settlement: z.string().max(5000) }))
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
    .input(z.object({ transaction: z.string().max(5000) }))
    .output(IssuingTransactionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersRefundsRefundExpire: t.procedure
    .input(z.object({ refund: z.string() }))
    .output(RefundSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTerminalReadersReaderPresentPaymentMethod: t.procedure
    .input(z.object({ reader: z.string().max(5000) }))
    .output(TerminalReaderSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTerminalReadersReaderSucceedInputCollection: t.procedure
    .input(z.object({ reader: z.string().max(5000) }))
    .output(TerminalReaderSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTerminalReadersReaderTimeoutInputCollection: t.procedure
    .input(z.object({ reader: z.string().max(5000) }))
    .output(TerminalReaderSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TestHelpersTestClocks: t.procedure
    .input(
      z.object({
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(TestHelpersTestClockSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/test_helpers\/test_clocks/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTestClocks: t.procedure.output(TestHelpersTestClockSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TestHelpersTestClocksTestClock: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        test_clock: z.string().max(5000),
      }),
    )
    .output(TestHelpersTestClockSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1TestHelpersTestClocksTestClock: t.procedure
    .input(z.object({ test_clock: z.string().max(5000) }))
    .output(DeletedTestHelpersTestClockSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTestClocksTestClockAdvance: t.procedure
    .input(z.object({ test_clock: z.string().max(5000) }))
    .output(TestHelpersTestClockSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTreasuryInboundTransfersIdFail: t.procedure
    .input(z.object({ id: z.string().max(5000) }))
    .output(TreasuryInboundTransferSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTreasuryInboundTransfersIdReturn: t.procedure
    .input(z.object({ id: z.string().max(5000) }))
    .output(TreasuryInboundTransferSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTreasuryInboundTransfersIdSucceed: t.procedure
    .input(z.object({ id: z.string().max(5000) }))
    .output(TreasuryInboundTransferSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTreasuryOutboundPaymentsId: t.procedure
    .input(z.object({ id: z.string().max(5000) }))
    .output(TreasuryOutboundPaymentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTreasuryOutboundPaymentsIdFail: t.procedure
    .input(z.object({ id: z.string().max(5000) }))
    .output(TreasuryOutboundPaymentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTreasuryOutboundPaymentsIdPost: t.procedure
    .input(z.object({ id: z.string().max(5000) }))
    .output(TreasuryOutboundPaymentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTreasuryOutboundPaymentsIdReturn: t.procedure
    .input(z.object({ id: z.string().max(5000) }))
    .output(TreasuryOutboundPaymentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTreasuryOutboundTransfersOutboundTransfer: t.procedure
    .input(z.object({ outbound_transfer: z.string().max(5000) }))
    .output(TreasuryOutboundTransferSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTreasuryOutboundTransfersOutboundTransferFail: t.procedure
    .input(z.object({ outbound_transfer: z.string().max(5000) }))
    .output(TreasuryOutboundTransferSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTreasuryOutboundTransfersOutboundTransferPost: t.procedure
    .input(z.object({ outbound_transfer: z.string().max(5000) }))
    .output(TreasuryOutboundTransferSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TestHelpersTreasuryOutboundTransfersOutboundTransferReturn: t.procedure
    .input(z.object({ outbound_transfer: z.string().max(5000) }))
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
      z.object({
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
        status: z
          .enum([
            'canceled',
            'error',
            'failed',
            'requires_challenge',
            'requires_submission',
            'succeeded',
          ])
          .exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(ThreeDSecureAuthenticationSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/three_d_secure\/authentications/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
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
      z.object({
        authentication: z.string().max(5000),
        expand: z.array(z.string().max(5000)).exactOptional(),
      }),
    )
    .output(ThreeDSecureAuthenticationSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ThreeDSecureAuthenticationsAuthenticationCancel: t.procedure
    .input(z.object({ authentication: z.string().max(5000) }))
    .output(ThreeDSecureAuthenticationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1ThreeDSecureAuthenticationsAuthenticationSubmit: t.procedure
    .input(z.object({ authentication: z.string().max(5000) }))
    .output(ThreeDSecureAuthenticationSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Tokens: t.procedure.output(TokenSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TokensToken: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        token: z.string().max(5000),
      }),
    )
    .output(TokenSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Topups: t.procedure
    .input(
      z.object({
        amount: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
        status: z.enum(['canceled', 'failed', 'pending', 'succeeded']).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(TopupSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/topups/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Topups: t.procedure.output(TopupSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TopupsTopup: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        topup: z.string().max(5000),
      }),
    )
    .output(TopupSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TopupsTopup: t.procedure
    .input(z.object({ topup: z.string().max(5000) }))
    .output(TopupSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TopupsTopupCancel: t.procedure
    .input(z.object({ topup: z.string().max(5000) }))
    .output(TopupSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1Transfers: t.procedure
    .input(
      z.object({
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        destination: z.string().max(5000).exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
        transfer_group: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(TransferSchema).meta({ description: 'Details about each object.' }),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/transfers/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1Transfers: t.procedure.output(TransferSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TransfersIdReversals: t.procedure
    .input(
      z.object({
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        id: z.string().max(5000),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(TransferReversalSchema).meta({ description: 'Details about each object.' }),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TransfersIdReversals: t.procedure
    .input(z.object({ id: z.string().max(5000) }))
    .output(TransferReversalSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TransfersTransfer: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        transfer: z.string().max(5000),
      }),
    )
    .output(TransferSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TransfersTransfer: t.procedure
    .input(z.object({ transfer: z.string().max(5000) }))
    .output(TransferSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TransfersTransferReversalsId: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        id: z.string().max(5000),
        transfer: z.string().max(5000),
      }),
    )
    .output(TransferReversalSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TransfersTransferReversalsId: t.procedure
    .input(z.object({ id: z.string().max(5000), transfer: z.string().max(5000) }))
    .output(TransferReversalSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryCreditReversals: t.procedure
    .input(
      z.object({
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        financial_account: z.string(),
        limit: z.int().exactOptional(),
        received_credit: z.string().max(5000).exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
        status: z.enum(['canceled', 'posted', 'processing']).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z
            .array(TreasuryCreditReversalSchema)
            .meta({ description: 'Details about each object.' }),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TreasuryCreditReversals: t.procedure.output(TreasuryCreditReversalSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TreasuryCreditReversalsCreditReversal: t.procedure
    .input(
      z.object({
        credit_reversal: z.string().max(5000),
        expand: z.array(z.string().max(5000)).exactOptional(),
      }),
    )
    .output(TreasuryCreditReversalSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryDebitReversals: t.procedure
    .input(
      z.object({
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        financial_account: z.string(),
        limit: z.int().exactOptional(),
        received_debit: z.string().max(5000).exactOptional(),
        resolution: z.enum(['lost', 'won']).exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
        status: z.enum(['canceled', 'completed', 'processing']).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z
            .array(TreasuryDebitReversalSchema)
            .meta({ description: 'Details about each object.' }),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TreasuryDebitReversals: t.procedure.output(TreasuryDebitReversalSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TreasuryDebitReversalsDebitReversal: t.procedure
    .input(
      z.object({
        debit_reversal: z.string().max(5000),
        expand: z.array(z.string().max(5000)).exactOptional(),
      }),
    )
    .output(TreasuryDebitReversalSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryFinancialAccounts: t.procedure
    .input(
      z.object({
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
        status: z.enum(['closed', 'open']).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(TreasuryFinancialAccountSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/treasury\/financial_accounts/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
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
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        financial_account: z.string().max(5000),
      }),
    )
    .output(TreasuryFinancialAccountSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TreasuryFinancialAccountsFinancialAccount: t.procedure
    .input(z.object({ financial_account: z.string().max(5000) }))
    .output(TreasuryFinancialAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TreasuryFinancialAccountsFinancialAccountClose: t.procedure
    .input(z.object({ financial_account: z.string().max(5000) }))
    .output(TreasuryFinancialAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryFinancialAccountsFinancialAccountFeatures: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        financial_account: z.string().max(5000),
      }),
    )
    .output(TreasuryFinancialAccountFeaturesSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TreasuryFinancialAccountsFinancialAccountFeatures: t.procedure
    .input(z.object({ financial_account: z.string().max(5000) }))
    .output(TreasuryFinancialAccountFeaturesSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryInboundTransfers: t.procedure
    .input(
      z.object({
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        financial_account: z.string(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
        status: z.enum(['canceled', 'failed', 'processing', 'succeeded']).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z
            .array(TreasuryInboundTransferSchema)
            .meta({ description: 'Details about each object.' }),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TreasuryInboundTransfers: t.procedure.output(TreasuryInboundTransferSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TreasuryInboundTransfersId: t.procedure
    .input(
      z.object({ expand: z.array(z.string().max(5000)).exactOptional(), id: z.string().max(5000) }),
    )
    .output(TreasuryInboundTransferSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TreasuryInboundTransfersInboundTransferCancel: t.procedure
    .input(z.object({ inbound_transfer: z.string().max(5000) }))
    .output(TreasuryInboundTransferSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryOutboundPayments: t.procedure
    .input(
      z.object({
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        customer: z.string().max(5000).exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        financial_account: z.string(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
        status: z.enum(['canceled', 'failed', 'posted', 'processing', 'returned']).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z
            .array(TreasuryOutboundPaymentSchema)
            .meta({ description: 'Details about each object.' }),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/treasury\/outbound_payments/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TreasuryOutboundPayments: t.procedure.output(TreasuryOutboundPaymentSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1TreasuryOutboundPaymentsId: t.procedure
    .input(
      z.object({ expand: z.array(z.string().max(5000)).exactOptional(), id: z.string().max(5000) }),
    )
    .output(TreasuryOutboundPaymentSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TreasuryOutboundPaymentsIdCancel: t.procedure
    .input(z.object({ id: z.string().max(5000) }))
    .output(TreasuryOutboundPaymentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryOutboundTransfers: t.procedure
    .input(
      z.object({
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        financial_account: z.string(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
        status: z.enum(['canceled', 'failed', 'posted', 'processing', 'returned']).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z
            .array(TreasuryOutboundTransferSchema)
            .meta({ description: 'Details about each object.' }),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
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
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        outbound_transfer: z.string().max(5000),
      }),
    )
    .output(TreasuryOutboundTransferSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1TreasuryOutboundTransfersOutboundTransferCancel: t.procedure
    .input(z.object({ outbound_transfer: z.string().max(5000) }))
    .output(TreasuryOutboundTransferSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryReceivedCredits: t.procedure
    .input(
      z.object({
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        financial_account: z.string(),
        limit: z.int().exactOptional(),
        linked_flows: z
          .object({
            source_flow_type: z.enum([
              'credit_reversal',
              'other',
              'outbound_payment',
              'outbound_transfer',
              'payout',
            ]),
          })
          .exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
        status: z.enum(['failed', 'succeeded']).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z
            .array(TreasuryReceivedCreditSchema)
            .meta({ description: 'Details about each object.' }),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryReceivedCreditsId: t.procedure
    .input(
      z.object({ expand: z.array(z.string().max(5000)).exactOptional(), id: z.string().max(5000) }),
    )
    .output(TreasuryReceivedCreditSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryReceivedDebits: t.procedure
    .input(
      z.object({
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        financial_account: z.string(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
        status: z.enum(['failed', 'succeeded']).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z
            .array(TreasuryReceivedDebitSchema)
            .meta({ description: 'Details about each object.' }),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryReceivedDebitsId: t.procedure
    .input(
      z.object({ expand: z.array(z.string().max(5000)).exactOptional(), id: z.string().max(5000) }),
    )
    .output(TreasuryReceivedDebitSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryTransactionEntries: t.procedure
    .input(
      z.object({
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        effective_at: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        financial_account: z.string(),
        limit: z.int().exactOptional(),
        order_by: z.enum(['created', 'effective_at']).exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
        transaction: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z
            .array(TreasuryTransactionEntrySchema)
            .meta({ description: 'Details about each object.' }),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/treasury\/transaction_entries/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryTransactionEntriesId: t.procedure
    .input(
      z.object({ expand: z.array(z.string().max(5000)).exactOptional(), id: z.string().max(5000) }),
    )
    .output(TreasuryTransactionEntrySchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryTransactions: t.procedure
    .input(
      z.object({
        created: z
          .union([
            z.object({
              gt: z.int().exactOptional(),
              gte: z.int().exactOptional(),
              lt: z.int().exactOptional(),
              lte: z.int().exactOptional(),
            }),
            z.int(),
          ])
          .exactOptional(),
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        financial_account: z.string(),
        limit: z.int().exactOptional(),
        order_by: z.enum(['created', 'posted_at']).exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
        status: z.enum(['open', 'posted', 'void']).exactOptional(),
        status_transitions: z
          .object({
            posted_at: z
              .union([
                z.object({
                  gt: z.int().exactOptional(),
                  gte: z.int().exactOptional(),
                  lt: z.int().exactOptional(),
                  lte: z.int().exactOptional(),
                }),
                z.int(),
              ])
              .exactOptional(),
          })
          .exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z
            .array(TreasuryTransactionSchema)
            .meta({ description: 'Details about each object.' }),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1TreasuryTransactionsId: t.procedure
    .input(
      z.object({ expand: z.array(z.string().max(5000)).exactOptional(), id: z.string().max(5000) }),
    )
    .output(TreasuryTransactionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV1WebhookEndpoints: t.procedure
    .input(
      z.object({
        ending_before: z.string().max(5000).exactOptional(),
        expand: z.array(z.string().max(5000)).exactOptional(),
        limit: z.int().exactOptional(),
        starting_after: z.string().max(5000).exactOptional(),
      }),
    )
    .output(
      z
        .object({
          data: z.array(WebhookEndpointSchema),
          has_more: z
            .boolean()
            .meta({
              description:
                'True if this list has another page of items after this one that can be fetched.',
            }),
          object: z
            .literal('list')
            .meta({
              description:
                "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
            }),
          url: z
            .string()
            .regex(/^\/v1\/webhook_endpoints/)
            .max(5000)
            .meta({ description: 'The URL where this list can be accessed.' }),
        })
        .meta({ description: '' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1WebhookEndpoints: t.procedure.output(WebhookEndpointSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV1WebhookEndpointsWebhookEndpoint: t.procedure
    .input(
      z.object({
        expand: z.array(z.string().max(5000)).exactOptional(),
        webhook_endpoint: z.string().max(5000),
      }),
    )
    .output(WebhookEndpointSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV1WebhookEndpointsWebhookEndpoint: t.procedure
    .input(z.object({ webhook_endpoint: z.string().max(5000) }))
    .output(WebhookEndpointSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteV1WebhookEndpointsWebhookEndpoint: t.procedure
    .input(z.object({ webhook_endpoint: z.string().max(5000) }))
    .output(DeletedWebhookEndpointSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
