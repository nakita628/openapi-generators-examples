import { Elysia, t } from 'elysia'
import {
  ActionSchema,
  ErrorDetailSchema,
  ErrorResponseSchema,
  MessageSchema,
  NotificationDisabledSchema,
  PnpMessagesRequestSchema,
  QuickReplySchema,
  QuickReplyItemSchema,
  SenderSchema,
  SentMessageSchema,
} from '../../components/schemas'
import { BotModel } from './model'

export const bot = new Elysia()
  .model({
    Action: ActionSchema,
    ErrorDetail: ErrorDetailSchema,
    ErrorResponse: ErrorResponseSchema,
    Message: MessageSchema,
    NotificationDisabled: NotificationDisabledSchema,
    PnpMessagesRequest: PnpMessagesRequestSchema,
    QuickReply: QuickReplySchema,
    QuickReplyItem: QuickReplyItemSchema,
    Sender: SenderSchema,
    SentMessage: SentMessageSchema,
  })
  .post('/bot/pnp/push', ({ headers, body }) => { throw new Error('Not implemented') }, {
    headers: BotModel.pushMessagesByPhoneHeaders,
    body: 'PnpMessagesRequest',
    response: { 200: t.Void(), 422: 'ErrorResponse' },
    detail: {
      tags: ['messaging-api'],
      description: 'Send LINE notification message',
      operationId: 'pushMessagesByPhone',
    },
  })
