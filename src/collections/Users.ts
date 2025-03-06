import { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    group: 'Auth',
    useAsTitle: 'email',
  },
  versions: {
    drafts: true,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
