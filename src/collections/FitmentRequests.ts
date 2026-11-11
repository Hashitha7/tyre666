import type { Access, CollectionConfig, FieldAccess } from 'payload'

const isPayloadAdmin: Access = ({ req }) => req.user?.collection === 'admins'
const isPayloadAdminField: FieldAccess = ({ req }) => req.user?.collection === 'admins'

export const FitmentRequests: CollectionConfig = {
  slug: 'fitment-requests',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['make', 'model', 'year', 'email', 'status', 'createdAt'],
  },
  access: {
    create: () => true,
    read: isPayloadAdmin,
    update: isPayloadAdmin,
    delete: isPayloadAdmin,
  },
  fields: [
    { name: 'make', type: 'text', required: true },
    { name: 'model', type: 'text', required: true },
    { name: 'year', type: 'number', required: true },
    { name: 'variant', type: 'text' },
    { name: 'email', type: 'email', required: true },
    { name: 'notes', type: 'textarea' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'In progress', value: 'in-progress' },
        { label: 'Resolved', value: 'resolved' },
      ],
      access: {
        create: isPayloadAdminField,
        update: isPayloadAdminField,
      },
    },
    {
      name: 'internalNotes',
      type: 'textarea',
      access: {
        read: isPayloadAdminField,
        create: isPayloadAdminField,
        update: isPayloadAdminField,
      },
    },
  ],
  versions: false,
}
