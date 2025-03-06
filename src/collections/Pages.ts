import type { CollectionConfig } from 'payload'
import { blocks } from '../blocks/blockTypes'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'],
  },
  versions: {
    drafts: true,
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Page',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'pageLayout',
              type: 'blocks',
              label: 'Page Layout',
              blocks: Object.values(blocks),
            },
          ],
        },
        // The SEO tab will be automatically added by the SEO plugin
        // because we've set tabbedUI: true in the plugin config
      ],
    },
    {
      name: 'slugMode',
      type: 'radio',
      defaultValue: 'generate',
      admin: {
        position: 'sidebar',
        layout: 'horizontal',
      },
      options: [
        {
          label: 'Generate',
          value: 'generate',
        },
        {
          label: 'Custom',
          value: 'custom',
        },
      ],
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        position: 'sidebar',
        condition: (data) => data.slugMode === 'custom',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (data.slugMode === 'generate' && data?.title) {
              return data.title
                .toLowerCase()
                .replace(/[^\w\s]/gi, '')
                .replace(/\s+/g, '-')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'pathMode',
      type: 'radio',
      defaultValue: 'generate',
      admin: {
        position: 'sidebar',
        layout: 'horizontal',
      },
      options: [
        {
          label: 'Generate',
          value: 'generate',
        },
        {
          label: 'Custom',
          value: 'custom',
        },
      ],
    },
    {
      name: 'path',
      type: 'text',
      admin: {
        position: 'sidebar',
        condition: (data) => data.pathMode === 'custom',
      },
      hooks: {
        beforeValidate: [
          ({ value, data, siblingData }) => {
            if (data.pathMode === 'generate') {
              const segments = []
              if (siblingData.parent) {
                // You would need to fetch the parent's path here
                segments.push('parent-path')
              }
              segments.push(siblingData.slug || '')
              return '/' + segments.join('/')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'pages',
      label: 'Parent',
      admin: {
        position: 'sidebar',
      },
      filterOptions: ({ id }) => {
        return {
          id: {
            not_equals: id,
          },
        }
      },
    },
    {
      name: 'breadcrumbs',
      type: 'array',
      label: 'Breadcrumbs',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Published',
          value: 'published',
        },
      ],
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'isHomePage',
      type: 'checkbox',
      label: 'Home Page',
      admin: {
        position: 'sidebar',
        description: 'Is this the home page?',
      },
    },
  ],
}
