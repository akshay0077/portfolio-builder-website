import { CollectionConfig } from 'payload'

export const ContactForm: CollectionConfig = {
  slug: 'contact-forms',
  admin: {
    group: 'Content',
    useAsTitle: 'subject',
    defaultColumns: ['name', 'email', 'subject', 'status', 'createdAt'],
  },

  access: {
    // Only authenticated users can read contact form submissions
    read: ({ req: { user } }) => Boolean(user),
    // Anyone can create a contact form submission
    create: () => true,
    // Only authenticated users can update or delete
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  timestamps: true, // Adds createdAt and updatedAt fields automatically
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Name of the person submitting the form',
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      admin: {
        description: 'Email address of the sender',
      },
    },
    {
      name: 'phone',
      type: 'text',
      admin: {
        description: 'Phone number (optional)',
      },
    },
    {
      name: 'subject',
      type: 'text',
      required: true,
      admin: {
        description: 'Subject of the message',
      },
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Content of the message',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'UNREAD',
      options: [
        {
          label: 'Unread',
          value: 'UNREAD',
        },
        {
          label: 'Read',
          value: 'READ',
        },
        {
          label: 'In Progress',
          value: 'IN_PROGRESS',
        },
        {
          label: 'Completed',
          value: 'COMPLETED',
        },
        {
          label: 'Archived',
          value: 'ARCHIVED',
        },
      ],
      admin: {
        position: 'sidebar',
        description: 'Current status of this contact form submission',
      },
    },
    {
      name: 'priority',
      type: 'select',
      defaultValue: 'normal',
      options: [
        {
          label: 'High',
          value: 'high',
        },
        {
          label: 'Normal',
          value: 'normal',
        },
        {
          label: 'Low',
          value: 'low',
        },
      ],
      admin: {
        position: 'sidebar',
        description: 'Priority level of this contact request',
      },
    },
    {
      name: 'internalNotes',
      type: 'textarea',
      admin: {
        position: 'sidebar',
        description:
          'Internal notes about this contact (only visible to admin)',
      },
    },
    {
      name: 'source',
      type: 'select',
      defaultValue: 'website',
      options: [
        {
          label: 'Website',
          value: 'website',
        },
        {
          label: 'API',
          value: 'api',
        },
        {
          label: 'Other',
          value: 'other',
        },
      ],
      admin: {
        position: 'sidebar',
        description: 'Source of the contact form submission',
      },
    },
    {
      name: 'ipAddress',
      type: 'text',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'IP address of the sender',
      },
      hooks: {
        beforeChange: [
          ({ req }) => {
            if (req?.headers) {
              const forwardedFor = req.headers.get('x-forwarded-for')
              return forwardedFor || 'Unknown'
            }
            return 'Unknown'
          },
        ],
      },
    },
  ],
  hooks: {
    // You can add email notification hooks here
    afterChange: [
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
      async ({ doc, operation }) => {
        // Here you can implement email notifications when new submissions are received
        if (operation === 'create') {
          // Send email notification to admin
          // You'll need to implement your email sending logic here
        }
      },
    ],
  },
}
