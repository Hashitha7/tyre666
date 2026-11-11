import type { Access, CollectionConfig, FieldAccess } from 'payload'

const isPayloadAdmin: Access = ({ req }) => req.user?.collection === 'admins'
const isPayloadAdminField: FieldAccess = ({ req }) => req.user?.collection === 'admins'

export const NewsletterSubscriptions: CollectionConfig = {
  slug: 'newsletter-subscriptions',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'source', 'status', 'createdAt'],
  },
  access: {
    create: () => true,
    read: isPayloadAdmin,
    update: isPayloadAdmin,
    delete: isPayloadAdmin,
  },
  fields: [
    { name: 'email', type: 'email', required: true, unique: true },
    { name: 'source', type: 'text', defaultValue: 'home' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'subscribed',
      options: [
        { label: 'Subscribed', value: 'subscribed' },
        { label: 'Unsubscribed', value: 'unsubscribed' },
      ],
      access: {
        create: isPayloadAdminField,
        update: isPayloadAdminField,
      },
    },
  ],
  versions: false,
}
