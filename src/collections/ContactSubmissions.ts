import type { Access, CollectionConfig, FieldAccess } from 'payload'

const isPayloadAdmin: Access = ({ req }) => req.user?.collection === 'admins'
const isPayloadAdminField: FieldAccess = ({ req }) => req.user?.collection === 'admins'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'status', 'createdAt'],
  },
  access: {
    create: () => true,
    read: isPayloadAdmin,
    update: isPayloadAdmin,
    delete: isPayloadAdmin,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    { name: 'message', type: 'textarea', required: true },
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
