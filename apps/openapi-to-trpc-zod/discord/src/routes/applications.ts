import { initTRPC, TRPCError } from '@trpc/server'
import * as z from 'zod'
import {
  ActionTypesSchema,
  ActivitiesAttachmentResponseSchema,
  ApplicationCommandAttachmentOptionSchema,
  ApplicationCommandBooleanOptionSchema,
  ApplicationCommandChannelOptionSchema,
  ApplicationCommandHandlerSchema,
  ApplicationCommandIntegerOptionSchema,
  ApplicationCommandMentionableOptionSchema,
  ApplicationCommandNumberOptionSchema,
  ApplicationCommandPermissionSchema,
  ApplicationCommandResponseSchema,
  ApplicationCommandRoleOptionSchema,
  ApplicationCommandStringOptionSchema,
  ApplicationCommandSubcommandGroupOptionSchema,
  ApplicationCommandSubcommandOptionSchema,
  ApplicationCommandTypeSchema,
  ApplicationCommandUpdateRequestSchema,
  ApplicationCommandUserOptionSchema,
  ApplicationEventWebhooksStatusSchema,
  ApplicationExplicitContentFilterTypesSchema,
  ApplicationIntegrationTypeConfigurationSchema,
  ApplicationIntegrationTypeSchema,
  ApplicationOAuth2InstallParamsSchema,
  ApplicationRoleConnectionsMetadataItemRequestSchema,
  ApplicationRoleConnectionsMetadataItemResponseSchema,
  ApplicationTypesSchema,
  ApplicationUpdateFormPartialSchema,
  CommandPermissionsResponseSchema,
  EmbeddedActivityInstanceSchema,
  EmojiResponseSchema,
  EntitlementOwnerTypesSchema,
  EntitlementResponseSchema,
  InteractionContextTypeSchema,
  ListApplicationEmojisResponseSchema,
  PrivateApplicationResponseSchema,
  SnowflakeTypeSchema,
} from '../components'

const t = initTRPC.create()

export const applicationsRouter = t.router({
  getApplicationsMe: t.procedure.output(PrivateApplicationResponseSchema).query(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  patchApplicationsMe: t.procedure
    .input(ApplicationUpdateFormPartialSchema)
    .output(PrivateApplicationResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getApplicationsApplicationId: t.procedure
    .input(z.object({ application_id: SnowflakeTypeSchema }))
    .output(PrivateApplicationResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchApplicationsApplicationId: t.procedure
    .input(
      z.object({
        application_id: SnowflakeTypeSchema,
        description: z
          .object({
            default: z.string().max(400),
            localizations: z.record(z.string(), z.string().max(400)).nullable().exactOptional(),
          })
          .nullable()
          .exactOptional(),
        icon: z.string().nullable().exactOptional(),
        cover_image: z.string().nullable().exactOptional(),
        team_id: z.xor([z.null(), SnowflakeTypeSchema]).exactOptional(),
        flags: z.int().nullable().exactOptional(),
        interactions_endpoint_url: z.url().max(2048).nullable().exactOptional(),
        explicit_content_filter: z
          .xor([z.null(), ApplicationExplicitContentFilterTypesSchema])
          .exactOptional(),
        max_participants: z.int32().min(-1).nullable().exactOptional(),
        type: z.xor([z.null(), ApplicationTypesSchema]).exactOptional(),
        tags: z
          .array(z.string().max(20))
          .max(5)
          .refine((val) => new Set(val).size === val.length)
          .nullable()
          .exactOptional(),
        custom_install_url: z.url().max(2048).nullable().exactOptional(),
        install_params: z.xor([z.null(), ApplicationOAuth2InstallParamsSchema]).exactOptional(),
        role_connections_verification_url: z.url().max(2048).nullable().exactOptional(),
        integration_types_config: z
          .record(z.string(), z.xor([z.null(), ApplicationIntegrationTypeConfigurationSchema]))
          .nullable()
          .exactOptional(),
        event_webhooks_status: z
          .xor([z.null(), ApplicationEventWebhooksStatusSchema])
          .exactOptional(),
        event_webhooks_url: z
          .url()
          .max(2048)
          .nullable()
          .meta({ description: 'Event webhooks URL for the app to receive webhook events' })
          .exactOptional(),
        event_webhooks_types: z
          .array(ActionTypesSchema)
          .refine((val) => new Set(val).size === val.length)
          .nullable()
          .exactOptional(),
      }),
    )
    .output(PrivateApplicationResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getApplicationsApplicationIdActivityInstancesInstanceId: t.procedure
    .input(z.object({ application_id: SnowflakeTypeSchema, instance_id: z.string().max(152133) }))
    .output(EmbeddedActivityInstanceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postApplicationsApplicationIdAttachment: t.procedure
    .input(z.object({ application_id: SnowflakeTypeSchema }))
    .output(ActivitiesAttachmentResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getApplicationsApplicationIdCommands: t.procedure
    .input(
      z.object({
        application_id: SnowflakeTypeSchema,
        with_localizations: z.boolean().exactOptional(),
      }),
    )
    .output(z.array(ApplicationCommandResponseSchema).nullable())
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putApplicationsApplicationIdCommands: t.procedure
    .input(
      z.object({
        application_id: SnowflakeTypeSchema,
        body: z.array(ApplicationCommandUpdateRequestSchema).max(130).nullable(),
      }),
    )
    .output(z.array(ApplicationCommandResponseSchema).nullable())
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postApplicationsApplicationIdCommands: t.procedure
    .input(
      z.object({
        application_id: SnowflakeTypeSchema,
        name: z.string().min(1).max(32),
        name_localizations: z
          .record(z.string(), z.string().min(1).max(32))
          .nullable()
          .exactOptional(),
        description: z.string().max(100).nullable().exactOptional(),
        description_localizations: z
          .record(z.string(), z.string().min(1).max(100))
          .nullable()
          .exactOptional(),
        options: z
          .array(
            z.xor([
              ApplicationCommandAttachmentOptionSchema,
              ApplicationCommandBooleanOptionSchema,
              ApplicationCommandChannelOptionSchema,
              ApplicationCommandIntegerOptionSchema,
              ApplicationCommandMentionableOptionSchema,
              ApplicationCommandNumberOptionSchema,
              ApplicationCommandRoleOptionSchema,
              ApplicationCommandStringOptionSchema,
              ApplicationCommandSubcommandGroupOptionSchema,
              ApplicationCommandSubcommandOptionSchema,
              ApplicationCommandUserOptionSchema,
            ]),
          )
          .max(25)
          .nullable()
          .exactOptional(),
        default_member_permissions: z
          .int()
          .min(0)
          .max(18014398509481984)
          .nullable()
          .exactOptional(),
        dm_permission: z.boolean().nullable().exactOptional(),
        contexts: z
          .array(InteractionContextTypeSchema)
          .min(1)
          .refine((val) => new Set(val).size === val.length)
          .nullable()
          .exactOptional(),
        integration_types: z
          .array(ApplicationIntegrationTypeSchema)
          .min(1)
          .refine((val) => new Set(val).size === val.length)
          .nullable()
          .exactOptional(),
        handler: z
          .xor([z.null(), ApplicationCommandHandlerSchema])
          .meta({
            description:
              "Determines whether the interaction is handled by the app's interactions handler or by Discord",
          })
          .exactOptional(),
        type: z.xor([z.null(), ApplicationCommandTypeSchema]).exactOptional(),
      }),
    )
    .output(ApplicationCommandResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getApplicationsApplicationIdCommandsCommandId: t.procedure
    .input(z.object({ application_id: SnowflakeTypeSchema, command_id: SnowflakeTypeSchema }))
    .output(ApplicationCommandResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteApplicationsApplicationIdCommandsCommandId: t.procedure
    .input(z.object({ application_id: SnowflakeTypeSchema, command_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchApplicationsApplicationIdCommandsCommandId: t.procedure
    .input(
      z.object({
        application_id: SnowflakeTypeSchema,
        command_id: SnowflakeTypeSchema,
        name: z.string().min(1).max(32).exactOptional(),
        name_localizations: z
          .record(z.string(), z.string().min(1).max(32))
          .nullable()
          .exactOptional(),
        description: z.string().max(100).nullable().exactOptional(),
        description_localizations: z
          .record(z.string(), z.string().min(1).max(100))
          .nullable()
          .exactOptional(),
        options: z
          .array(
            z.xor([
              ApplicationCommandAttachmentOptionSchema,
              ApplicationCommandBooleanOptionSchema,
              ApplicationCommandChannelOptionSchema,
              ApplicationCommandIntegerOptionSchema,
              ApplicationCommandMentionableOptionSchema,
              ApplicationCommandNumberOptionSchema,
              ApplicationCommandRoleOptionSchema,
              ApplicationCommandStringOptionSchema,
              ApplicationCommandSubcommandGroupOptionSchema,
              ApplicationCommandSubcommandOptionSchema,
              ApplicationCommandUserOptionSchema,
            ]),
          )
          .max(25)
          .nullable()
          .exactOptional(),
        default_member_permissions: z
          .int()
          .min(0)
          .max(18014398509481984)
          .nullable()
          .exactOptional(),
        dm_permission: z.boolean().nullable().exactOptional(),
        contexts: z
          .array(InteractionContextTypeSchema)
          .min(1)
          .refine((val) => new Set(val).size === val.length)
          .nullable()
          .exactOptional(),
        integration_types: z
          .array(ApplicationIntegrationTypeSchema)
          .min(1)
          .refine((val) => new Set(val).size === val.length)
          .nullable()
          .exactOptional(),
        handler: z
          .xor([z.null(), ApplicationCommandHandlerSchema])
          .meta({
            description:
              "Determines whether the interaction is handled by the app's interactions handler or by Discord",
          })
          .exactOptional(),
      }),
    )
    .output(ApplicationCommandResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getApplicationsApplicationIdEmojis: t.procedure
    .input(z.object({ application_id: SnowflakeTypeSchema }))
    .output(ListApplicationEmojisResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postApplicationsApplicationIdEmojis: t.procedure
    .input(
      z.object({
        application_id: SnowflakeTypeSchema,
        name: z.string().min(2).max(32),
        image: z.string(),
      }),
    )
    .output(EmojiResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getApplicationsApplicationIdEmojisEmojiId: t.procedure
    .input(z.object({ application_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }))
    .output(EmojiResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteApplicationsApplicationIdEmojisEmojiId: t.procedure
    .input(z.object({ application_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchApplicationsApplicationIdEmojisEmojiId: t.procedure
    .input(
      z.object({
        application_id: SnowflakeTypeSchema,
        emoji_id: SnowflakeTypeSchema,
        name: z.string().min(2).max(32).exactOptional(),
      }),
    )
    .output(EmojiResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getApplicationsApplicationIdEntitlements: t.procedure
    .input(
      z.object({
        application_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema.exactOptional(),
        sku_ids: z
          .xor([
            z.string(),
            z
              .array(z.xor([z.null(), SnowflakeTypeSchema]))
              .max(100)
              .refine((val) => new Set(val).size === val.length),
          ])
          .exactOptional(),
        guild_id: SnowflakeTypeSchema.exactOptional(),
        before: SnowflakeTypeSchema.exactOptional(),
        after: SnowflakeTypeSchema.exactOptional(),
        limit: z.int().min(1).max(100).exactOptional(),
        exclude_ended: z.boolean().exactOptional(),
        exclude_deleted: z.boolean().exactOptional(),
        only_active: z.boolean().exactOptional(),
      }),
    )
    .output(z.array(EntitlementResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postApplicationsApplicationIdEntitlements: t.procedure
    .input(
      z.object({
        application_id: SnowflakeTypeSchema,
        sku_id: SnowflakeTypeSchema.meta({
          description: 'ID of the SKU to grant the entitlement to',
        }),
        owner_id: SnowflakeTypeSchema.meta({
          description: 'ID of the guild or user to grant the entitlement to',
        }),
        owner_type: EntitlementOwnerTypesSchema.meta({
          description: '1 for a guild subscription, 2 for a user subscription',
        }),
      }),
    )
    .output(EntitlementResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getApplicationsApplicationIdEntitlementsEntitlementId: t.procedure
    .input(z.object({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema }))
    .output(EntitlementResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteApplicationsApplicationIdEntitlementsEntitlementId: t.procedure
    .input(z.object({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postApplicationsApplicationIdEntitlementsEntitlementIdConsume: t.procedure
    .input(z.object({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getApplicationsApplicationIdGuildsGuildIdCommands: t.procedure
    .input(
      z.object({
        application_id: SnowflakeTypeSchema,
        guild_id: SnowflakeTypeSchema,
        with_localizations: z.boolean().exactOptional(),
      }),
    )
    .output(z.array(ApplicationCommandResponseSchema).nullable())
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putApplicationsApplicationIdGuildsGuildIdCommands: t.procedure
    .input(
      z.object({
        application_id: SnowflakeTypeSchema,
        guild_id: SnowflakeTypeSchema,
        body: z.array(ApplicationCommandUpdateRequestSchema).max(130).nullable(),
      }),
    )
    .output(z.array(ApplicationCommandResponseSchema).nullable())
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postApplicationsApplicationIdGuildsGuildIdCommands: t.procedure
    .input(
      z.object({
        application_id: SnowflakeTypeSchema,
        guild_id: SnowflakeTypeSchema,
        name: z.string().min(1).max(32),
        name_localizations: z
          .record(z.string(), z.string().min(1).max(32))
          .nullable()
          .exactOptional(),
        description: z.string().max(100).nullable().exactOptional(),
        description_localizations: z
          .record(z.string(), z.string().min(1).max(100))
          .nullable()
          .exactOptional(),
        options: z
          .array(
            z.xor([
              ApplicationCommandAttachmentOptionSchema,
              ApplicationCommandBooleanOptionSchema,
              ApplicationCommandChannelOptionSchema,
              ApplicationCommandIntegerOptionSchema,
              ApplicationCommandMentionableOptionSchema,
              ApplicationCommandNumberOptionSchema,
              ApplicationCommandRoleOptionSchema,
              ApplicationCommandStringOptionSchema,
              ApplicationCommandSubcommandGroupOptionSchema,
              ApplicationCommandSubcommandOptionSchema,
              ApplicationCommandUserOptionSchema,
            ]),
          )
          .max(25)
          .nullable()
          .exactOptional(),
        default_member_permissions: z
          .int()
          .min(0)
          .max(18014398509481984)
          .nullable()
          .exactOptional(),
        dm_permission: z.boolean().nullable().exactOptional(),
        contexts: z
          .array(InteractionContextTypeSchema)
          .min(1)
          .refine((val) => new Set(val).size === val.length)
          .nullable()
          .exactOptional(),
        integration_types: z
          .array(ApplicationIntegrationTypeSchema)
          .min(1)
          .refine((val) => new Set(val).size === val.length)
          .nullable()
          .exactOptional(),
        handler: z
          .xor([z.null(), ApplicationCommandHandlerSchema])
          .meta({
            description:
              "Determines whether the interaction is handled by the app's interactions handler or by Discord",
          })
          .exactOptional(),
        type: z.xor([z.null(), ApplicationCommandTypeSchema]).exactOptional(),
      }),
    )
    .output(ApplicationCommandResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getApplicationsApplicationIdGuildsGuildIdCommandsPermissions: t.procedure
    .input(z.object({ application_id: SnowflakeTypeSchema, guild_id: SnowflakeTypeSchema }))
    .output(z.array(CommandPermissionsResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getApplicationsApplicationIdGuildsGuildIdCommandsCommandId: t.procedure
    .input(
      z.object({
        application_id: SnowflakeTypeSchema,
        guild_id: SnowflakeTypeSchema,
        command_id: SnowflakeTypeSchema,
      }),
    )
    .output(ApplicationCommandResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteApplicationsApplicationIdGuildsGuildIdCommandsCommandId: t.procedure
    .input(
      z.object({
        application_id: SnowflakeTypeSchema,
        guild_id: SnowflakeTypeSchema,
        command_id: SnowflakeTypeSchema,
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchApplicationsApplicationIdGuildsGuildIdCommandsCommandId: t.procedure
    .input(
      z.object({
        application_id: SnowflakeTypeSchema,
        guild_id: SnowflakeTypeSchema,
        command_id: SnowflakeTypeSchema,
        name: z.string().min(1).max(32).exactOptional(),
        name_localizations: z
          .record(z.string(), z.string().min(1).max(32))
          .nullable()
          .exactOptional(),
        description: z.string().max(100).nullable().exactOptional(),
        description_localizations: z
          .record(z.string(), z.string().min(1).max(100))
          .nullable()
          .exactOptional(),
        options: z
          .array(
            z.xor([
              ApplicationCommandAttachmentOptionSchema,
              ApplicationCommandBooleanOptionSchema,
              ApplicationCommandChannelOptionSchema,
              ApplicationCommandIntegerOptionSchema,
              ApplicationCommandMentionableOptionSchema,
              ApplicationCommandNumberOptionSchema,
              ApplicationCommandRoleOptionSchema,
              ApplicationCommandStringOptionSchema,
              ApplicationCommandSubcommandGroupOptionSchema,
              ApplicationCommandSubcommandOptionSchema,
              ApplicationCommandUserOptionSchema,
            ]),
          )
          .max(25)
          .nullable()
          .exactOptional(),
        default_member_permissions: z
          .int()
          .min(0)
          .max(18014398509481984)
          .nullable()
          .exactOptional(),
        dm_permission: z.boolean().nullable().exactOptional(),
        contexts: z
          .array(InteractionContextTypeSchema)
          .min(1)
          .refine((val) => new Set(val).size === val.length)
          .nullable()
          .exactOptional(),
        integration_types: z
          .array(ApplicationIntegrationTypeSchema)
          .min(1)
          .refine((val) => new Set(val).size === val.length)
          .nullable()
          .exactOptional(),
        handler: z
          .xor([z.null(), ApplicationCommandHandlerSchema])
          .meta({
            description:
              "Determines whether the interaction is handled by the app's interactions handler or by Discord",
          })
          .exactOptional(),
      }),
    )
    .output(ApplicationCommandResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissions: t.procedure
    .input(
      z.object({
        application_id: SnowflakeTypeSchema,
        guild_id: SnowflakeTypeSchema,
        command_id: SnowflakeTypeSchema,
      }),
    )
    .output(CommandPermissionsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissions: t.procedure
    .input(
      z.object({
        application_id: SnowflakeTypeSchema,
        guild_id: SnowflakeTypeSchema,
        command_id: SnowflakeTypeSchema,
        permissions: z
          .array(ApplicationCommandPermissionSchema)
          .max(100)
          .nullable()
          .exactOptional(),
      }),
    )
    .output(CommandPermissionsResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getApplicationsApplicationIdRoleConnectionsMetadata: t.procedure
    .input(z.object({ application_id: SnowflakeTypeSchema }))
    .output(z.array(ApplicationRoleConnectionsMetadataItemResponseSchema).nullable())
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putApplicationsApplicationIdRoleConnectionsMetadata: t.procedure
    .input(
      z.object({
        application_id: SnowflakeTypeSchema,
        body: z.array(ApplicationRoleConnectionsMetadataItemRequestSchema).max(5).nullable(),
      }),
    )
    .output(z.array(ApplicationRoleConnectionsMetadataItemResponseSchema).nullable())
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
