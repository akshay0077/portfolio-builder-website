import { CollectionConfig } from 'payload'

export const Blogs: CollectionConfig = {
  slug: 'blogs',
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'platform', 'publishedDate', 'status'],
  },
  versions: {
    drafts: true,
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Blog Title',
    },
    {
      name: 'platform',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Medium',
          value: 'medium',
        },
        {
          label: 'Dev.to',
          value: 'devto',
        },
        {
          label: 'Hashnode',
          value: 'hashnode',
        },
        {
          label: 'Other',
          value: 'other',
        },
      ],
      defaultValue: 'medium',
      admin: {
        description: 'Select the platform where the blog is published',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Featured Image',
      admin: {
        description: 'This image will be displayed as the blog preview',
      },
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      label: 'Blog Summary',
      admin: {
        description: 'A brief description of what the blog is about',
      },
    },
    {
      name: 'externalLink',
      type: 'text',
      required: true,
      label: 'Blog URL',
      admin: {
        placeholder: 'https://',
        description: 'The full URL to your blog post',
      },
      validate: (
        val: string | string[] | null | undefined
      ): boolean | string => {
        if (!val || typeof val !== 'string' || !/^https?:\/\/.+/.test(val)) {
          return 'Please enter a valid URL starting with http:// or https://'
        }
        return true
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description: 'When was this blog published?',
      },
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      minRows: 1,
      maxRows: 5,
      labels: {
        singular: 'Tag',
        plural: 'Tags',
      },
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'Add up to 5 tags to categorize your blog',
      },
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Auto-generated from Blog Title',
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            if (siblingData?.blogTitle) {
              return siblingData.blogTitle
                .toLowerCase()
                .replace(/[^\w\s]/gi, '')
                .replace(/\s+/g, '-')
            }
            return undefined
          },
        ],
      },
    },
  ],
}
