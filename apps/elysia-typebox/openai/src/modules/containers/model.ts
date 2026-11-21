import { t, type UnwrapSchema } from 'elysia'

export const ContainersModel = {
  ListContainersQuery: t.Object({
    limit: t.Optional(t.Integer({ maximum: 9007199254740991, default: 20 })),
    order: t.Optional(t.UnionEnum(['asc', 'desc'], { default: 'desc' })),
    after: t.Optional(t.String()),
    name: t.Optional(t.String()),
  }),
  RetrieveContainerParams: t.Object({ container_id: t.String() }),
  DeleteContainerParams: t.Object({ container_id: t.String() }),
  DeleteContainerResponse200: t.Object({
    object: t.Literal('container.deleted'),
    deleted: t.Boolean(),
    id: t.String(),
  }),
  ListContainerFilesParams: t.Object({ container_id: t.String() }),
  ListContainerFilesQuery: t.Object({
    limit: t.Optional(t.Integer({ maximum: 9007199254740991, default: 20 })),
    order: t.Optional(t.UnionEnum(['asc', 'desc'], { default: 'desc' })),
    after: t.Optional(t.String()),
  }),
  CreateContainerFileParams: t.Object({ container_id: t.String() }),
  RetrieveContainerFileParams: t.Object({ container_id: t.String(), file_id: t.String() }),
  DeleteContainerFileParams: t.Object({ container_id: t.String(), file_id: t.String() }),
  DeleteContainerFileResponse200: t.Object({
    object: t.Literal('container.file.deleted'),
    deleted: t.Boolean(),
    id: t.String(),
  }),
  RetrieveContainerFileContentParams: t.Object({ container_id: t.String(), file_id: t.String() }),
} as const

export type ContainersModel = {
  [k in keyof typeof ContainersModel]: UnwrapSchema<(typeof ContainersModel)[k]>
}
