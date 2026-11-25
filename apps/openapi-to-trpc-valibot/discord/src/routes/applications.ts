import { initTRPC, TRPCError } from '@trpc/server'
import * as v from 'valibot'
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
    .input(v.object({ application_id: SnowflakeTypeSchema }))
    .output(PrivateApplicationResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchApplicationsApplicationId: t.procedure
    .input(
      v.object({
        application_id: SnowflakeTypeSchema,
        description: v.optional(
          v.nullable(
            v.object({
              default: v.pipe(v.string(), v.maxCodePoints(400)),
              localizations: v.optional(
                v.nullable(v.record(v.string(), v.pipe(v.string(), v.maxCodePoints(400)))),
              ),
            }),
          ),
        ),
        icon: v.optional(v.nullable(v.string())),
        cover_image: v.optional(v.nullable(v.string())),
        team_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
        flags: v.optional(v.nullable(v.pipe(v.number(), v.integer()))),
        interactions_endpoint_url: v.optional(
          v.nullable(v.pipe(v.string(), v.url(), v.maxCodePoints(2048))),
        ),
        explicit_content_filter: v.optional(
          v.union([v.null(), ApplicationExplicitContentFilterTypesSchema]),
        ),
        max_participants: v.optional(
          v.nullable(
            v.pipe(
              v.number(),
              v.integer(),
              v.minValue(-2147483648),
              v.maxValue(2147483647),
              v.minValue(-1),
            ),
          ),
        ),
        type: v.optional(v.union([v.null(), ApplicationTypesSchema])),
        tags: v.optional(
          v.nullable(
            v.pipe(
              v.array(v.pipe(v.string(), v.maxCodePoints(20))),
              v.maxLength(5),
              v.check((input) => new Set(input).size === input.length),
            ),
          ),
        ),
        custom_install_url: v.optional(
          v.nullable(v.pipe(v.string(), v.url(), v.maxCodePoints(2048))),
        ),
        install_params: v.optional(v.union([v.null(), ApplicationOAuth2InstallParamsSchema])),
        role_connections_verification_url: v.optional(
          v.nullable(v.pipe(v.string(), v.url(), v.maxCodePoints(2048))),
        ),
        integration_types_config: v.optional(
          v.nullable(
            v.record(
              v.string(),
              v.union([v.null(), ApplicationIntegrationTypeConfigurationSchema]),
            ),
          ),
        ),
        event_webhooks_status: v.optional(
          v.union([v.null(), ApplicationEventWebhooksStatusSchema]),
        ),
        event_webhooks_url: v.optional(
          v.pipe(
            v.nullable(v.pipe(v.string(), v.url(), v.maxCodePoints(2048))),
            v.description('Event webhooks URL for the app to receive webhook events'),
          ),
        ),
        event_webhooks_types: v.optional(
          v.nullable(
            v.pipe(
              v.array(ActionTypesSchema),
              v.check((input) => new Set(input).size === input.length),
            ),
          ),
        ),
      }),
    )
    .output(PrivateApplicationResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getApplicationsApplicationIdActivityInstancesInstanceId: t.procedure
    .input(
      v.object({
        application_id: SnowflakeTypeSchema,
        instance_id: v.pipe(v.string(), v.maxCodePoints(152133)),
      }),
    )
    .output(EmbeddedActivityInstanceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postApplicationsApplicationIdAttachment: t.procedure
    .input(v.object({ application_id: SnowflakeTypeSchema }))
    .output(ActivitiesAttachmentResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getApplicationsApplicationIdCommands: t.procedure
    .input(
      v.object({
        application_id: SnowflakeTypeSchema,
        with_localizations: v.optional(v.boolean()),
      }),
    )
    .output(v.nullable(v.array(ApplicationCommandResponseSchema)))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putApplicationsApplicationIdCommands: t.procedure
    .input(
      v.object({
        application_id: SnowflakeTypeSchema,
        body: v.nullable(v.pipe(v.array(ApplicationCommandUpdateRequestSchema), v.maxLength(130))),
      }),
    )
    .output(v.nullable(v.array(ApplicationCommandResponseSchema)))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postApplicationsApplicationIdCommands: t.procedure
    .input(
      v.object({
        application_id: SnowflakeTypeSchema,
        name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)),
        name_localizations: v.optional(
          v.nullable(
            v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32))),
          ),
        ),
        description: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(100)))),
        description_localizations: v.optional(
          v.nullable(
            v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100))),
          ),
        ),
        options: v.optional(
          v.nullable(
            v.pipe(
              v.array(
                v.union([
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
              ),
              v.maxLength(25),
            ),
          ),
        ),
        default_member_permissions: v.optional(
          v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(18014398509481984))),
        ),
        dm_permission: v.optional(v.nullable(v.boolean())),
        contexts: v.optional(
          v.nullable(
            v.pipe(
              v.array(InteractionContextTypeSchema),
              v.minLength(1),
              v.check((input) => new Set(input).size === input.length),
            ),
          ),
        ),
        integration_types: v.optional(
          v.nullable(
            v.pipe(
              v.array(ApplicationIntegrationTypeSchema),
              v.minLength(1),
              v.check((input) => new Set(input).size === input.length),
            ),
          ),
        ),
        handler: v.optional(
          v.pipe(
            v.union([v.null(), ApplicationCommandHandlerSchema]),
            v.description(
              "Determines whether the interaction is handled by the app's interactions handler or by Discord",
            ),
          ),
        ),
        type: v.optional(v.union([v.null(), ApplicationCommandTypeSchema])),
      }),
    )
    .output(ApplicationCommandResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getApplicationsApplicationIdCommandsCommandId: t.procedure
    .input(v.object({ application_id: SnowflakeTypeSchema, command_id: SnowflakeTypeSchema }))
    .output(ApplicationCommandResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteApplicationsApplicationIdCommandsCommandId: t.procedure
    .input(v.object({ application_id: SnowflakeTypeSchema, command_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchApplicationsApplicationIdCommandsCommandId: t.procedure
    .input(
      v.object({
        application_id: SnowflakeTypeSchema,
        command_id: SnowflakeTypeSchema,
        name: v.optional(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32))),
        name_localizations: v.optional(
          v.nullable(
            v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32))),
          ),
        ),
        description: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(100)))),
        description_localizations: v.optional(
          v.nullable(
            v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100))),
          ),
        ),
        options: v.optional(
          v.nullable(
            v.pipe(
              v.array(
                v.union([
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
              ),
              v.maxLength(25),
            ),
          ),
        ),
        default_member_permissions: v.optional(
          v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(18014398509481984))),
        ),
        dm_permission: v.optional(v.nullable(v.boolean())),
        contexts: v.optional(
          v.nullable(
            v.pipe(
              v.array(InteractionContextTypeSchema),
              v.minLength(1),
              v.check((input) => new Set(input).size === input.length),
            ),
          ),
        ),
        integration_types: v.optional(
          v.nullable(
            v.pipe(
              v.array(ApplicationIntegrationTypeSchema),
              v.minLength(1),
              v.check((input) => new Set(input).size === input.length),
            ),
          ),
        ),
        handler: v.optional(
          v.pipe(
            v.union([v.null(), ApplicationCommandHandlerSchema]),
            v.description(
              "Determines whether the interaction is handled by the app's interactions handler or by Discord",
            ),
          ),
        ),
      }),
    )
    .output(ApplicationCommandResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getApplicationsApplicationIdEmojis: t.procedure
    .input(v.object({ application_id: SnowflakeTypeSchema }))
    .output(ListApplicationEmojisResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postApplicationsApplicationIdEmojis: t.procedure
    .input(
      v.object({
        application_id: SnowflakeTypeSchema,
        name: v.pipe(v.string(), v.minCodePoints(2), v.maxCodePoints(32)),
        image: v.string(),
      }),
    )
    .output(EmojiResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getApplicationsApplicationIdEmojisEmojiId: t.procedure
    .input(v.object({ application_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }))
    .output(EmojiResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteApplicationsApplicationIdEmojisEmojiId: t.procedure
    .input(v.object({ application_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchApplicationsApplicationIdEmojisEmojiId: t.procedure
    .input(
      v.object({
        application_id: SnowflakeTypeSchema,
        emoji_id: SnowflakeTypeSchema,
        name: v.optional(v.pipe(v.string(), v.minCodePoints(2), v.maxCodePoints(32))),
      }),
    )
    .output(EmojiResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getApplicationsApplicationIdEntitlements: t.procedure
    .input(
      v.object({
        application_id: SnowflakeTypeSchema,
        user_id: v.optional(SnowflakeTypeSchema),
        sku_ids: v.optional(
          v.union([
            v.string(),
            v.pipe(
              v.array(v.union([v.null(), SnowflakeTypeSchema])),
              v.maxLength(100),
              v.check((input) => new Set(input).size === input.length),
            ),
          ]),
        ),
        guild_id: v.optional(SnowflakeTypeSchema),
        before: v.optional(SnowflakeTypeSchema),
        after: v.optional(SnowflakeTypeSchema),
        limit: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(100))),
        exclude_ended: v.optional(v.boolean()),
        exclude_deleted: v.optional(v.boolean()),
        only_active: v.optional(v.boolean()),
      }),
    )
    .output(v.array(EntitlementResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postApplicationsApplicationIdEntitlements: t.procedure
    .input(
      v.object({
        application_id: SnowflakeTypeSchema,
        sku_id: v.pipe(
          SnowflakeTypeSchema,
          v.description('ID of the SKU to grant the entitlement to'),
        ),
        owner_id: v.pipe(
          SnowflakeTypeSchema,
          v.description('ID of the guild or user to grant the entitlement to'),
        ),
        owner_type: v.pipe(
          EntitlementOwnerTypesSchema,
          v.description('1 for a guild subscription, 2 for a user subscription'),
        ),
      }),
    )
    .output(EntitlementResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getApplicationsApplicationIdEntitlementsEntitlementId: t.procedure
    .input(v.object({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema }))
    .output(EntitlementResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteApplicationsApplicationIdEntitlementsEntitlementId: t.procedure
    .input(v.object({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postApplicationsApplicationIdEntitlementsEntitlementIdConsume: t.procedure
    .input(v.object({ application_id: SnowflakeTypeSchema, entitlement_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getApplicationsApplicationIdGuildsGuildIdCommands: t.procedure
    .input(
      v.object({
        application_id: SnowflakeTypeSchema,
        guild_id: SnowflakeTypeSchema,
        with_localizations: v.optional(v.boolean()),
      }),
    )
    .output(v.nullable(v.array(ApplicationCommandResponseSchema)))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putApplicationsApplicationIdGuildsGuildIdCommands: t.procedure
    .input(
      v.object({
        application_id: SnowflakeTypeSchema,
        guild_id: SnowflakeTypeSchema,
        body: v.nullable(v.pipe(v.array(ApplicationCommandUpdateRequestSchema), v.maxLength(130))),
      }),
    )
    .output(v.nullable(v.array(ApplicationCommandResponseSchema)))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postApplicationsApplicationIdGuildsGuildIdCommands: t.procedure
    .input(
      v.object({
        application_id: SnowflakeTypeSchema,
        guild_id: SnowflakeTypeSchema,
        name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)),
        name_localizations: v.optional(
          v.nullable(
            v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32))),
          ),
        ),
        description: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(100)))),
        description_localizations: v.optional(
          v.nullable(
            v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100))),
          ),
        ),
        options: v.optional(
          v.nullable(
            v.pipe(
              v.array(
                v.union([
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
              ),
              v.maxLength(25),
            ),
          ),
        ),
        default_member_permissions: v.optional(
          v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(18014398509481984))),
        ),
        dm_permission: v.optional(v.nullable(v.boolean())),
        contexts: v.optional(
          v.nullable(
            v.pipe(
              v.array(InteractionContextTypeSchema),
              v.minLength(1),
              v.check((input) => new Set(input).size === input.length),
            ),
          ),
        ),
        integration_types: v.optional(
          v.nullable(
            v.pipe(
              v.array(ApplicationIntegrationTypeSchema),
              v.minLength(1),
              v.check((input) => new Set(input).size === input.length),
            ),
          ),
        ),
        handler: v.optional(
          v.pipe(
            v.union([v.null(), ApplicationCommandHandlerSchema]),
            v.description(
              "Determines whether the interaction is handled by the app's interactions handler or by Discord",
            ),
          ),
        ),
        type: v.optional(v.union([v.null(), ApplicationCommandTypeSchema])),
      }),
    )
    .output(ApplicationCommandResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getApplicationsApplicationIdGuildsGuildIdCommandsPermissions: t.procedure
    .input(v.object({ application_id: SnowflakeTypeSchema, guild_id: SnowflakeTypeSchema }))
    .output(v.array(CommandPermissionsResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getApplicationsApplicationIdGuildsGuildIdCommandsCommandId: t.procedure
    .input(
      v.object({
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
      v.object({
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
      v.object({
        application_id: SnowflakeTypeSchema,
        guild_id: SnowflakeTypeSchema,
        command_id: SnowflakeTypeSchema,
        name: v.optional(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32))),
        name_localizations: v.optional(
          v.nullable(
            v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32))),
          ),
        ),
        description: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(100)))),
        description_localizations: v.optional(
          v.nullable(
            v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100))),
          ),
        ),
        options: v.optional(
          v.nullable(
            v.pipe(
              v.array(
                v.union([
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
              ),
              v.maxLength(25),
            ),
          ),
        ),
        default_member_permissions: v.optional(
          v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(18014398509481984))),
        ),
        dm_permission: v.optional(v.nullable(v.boolean())),
        contexts: v.optional(
          v.nullable(
            v.pipe(
              v.array(InteractionContextTypeSchema),
              v.minLength(1),
              v.check((input) => new Set(input).size === input.length),
            ),
          ),
        ),
        integration_types: v.optional(
          v.nullable(
            v.pipe(
              v.array(ApplicationIntegrationTypeSchema),
              v.minLength(1),
              v.check((input) => new Set(input).size === input.length),
            ),
          ),
        ),
        handler: v.optional(
          v.pipe(
            v.union([v.null(), ApplicationCommandHandlerSchema]),
            v.description(
              "Determines whether the interaction is handled by the app's interactions handler or by Discord",
            ),
          ),
        ),
      }),
    )
    .output(ApplicationCommandResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissions: t.procedure
    .input(
      v.object({
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
      v.object({
        application_id: SnowflakeTypeSchema,
        guild_id: SnowflakeTypeSchema,
        command_id: SnowflakeTypeSchema,
        permissions: v.optional(
          v.nullable(v.pipe(v.array(ApplicationCommandPermissionSchema), v.maxLength(100))),
        ),
      }),
    )
    .output(CommandPermissionsResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getApplicationsApplicationIdRoleConnectionsMetadata: t.procedure
    .input(v.object({ application_id: SnowflakeTypeSchema }))
    .output(v.nullable(v.array(ApplicationRoleConnectionsMetadataItemResponseSchema)))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putApplicationsApplicationIdRoleConnectionsMetadata: t.procedure
    .input(
      v.object({
        application_id: SnowflakeTypeSchema,
        body: v.nullable(
          v.pipe(v.array(ApplicationRoleConnectionsMetadataItemRequestSchema), v.maxLength(5)),
        ),
      }),
    )
    .output(v.nullable(v.array(ApplicationRoleConnectionsMetadataItemResponseSchema)))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
