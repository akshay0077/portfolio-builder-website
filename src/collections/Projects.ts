import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'projectName',
    group: 'Collections',
    defaultColumns: ['projectName', 'projectType', 'slug'],
  },
  versions: {
    drafts: true,
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'projectType',
      type: 'radio',
      required: true,
      defaultValue: 'minor',
      options: [
        {
          label: 'Major Project',
          value: 'major',
        },
        {
          label: 'Minor Project',
          value: 'minor',
        },
      ],
      admin: {
        layout: 'horizontal',
      },
    },
    {
      name: 'projectName',
      type: 'text',
      required: true,
      label: 'Project Name',
    },
    {
      name: 'projectImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Project Image',
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      label: 'Project Summary',
    },
    {
      name: 'projectLinks',
      type: 'array',
      label: 'Project Links',
      labels: {
        singular: 'Link',
        plural: 'Links',
      },
      fields: [
        {
          name: 'serviceName',
          type: 'text',
          required: true,
          label: 'Service Name',
          admin: {
            placeholder: 'e.g., GitHub, Live Demo, Documentation',
          },
        },
        {
          name: 'serviceLink',
          type: 'text',
          required: true,
          label: 'Service Link',
          admin: {
            placeholder: 'https://',
          },
        },
      ],
    },
    {
      name: 'features',
      type: 'array',
      label: 'Features',
      labels: {
        singular: 'Feature',
        plural: 'Features',
      },
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
          label: 'Feature',
        },
      ],
    },
    {
      name: 'techStack',
      type: 'array',
      label: 'Tech Stack',
      labels: {
        singular: 'Technology',
        plural: 'Technologies',
      },
      fields: [
        {
          name: 'technology',
          type: 'text',
          required: true,
          label: 'Technology Name',
        },
        {
          name: 'technologyIcon',
          type: 'upload',
          relationTo: 'media',
          label: 'Technology Icon',
        },
      ],
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Auto-generated from Project Name',
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            if (siblingData?.projectName) {
              return siblingData.projectName
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
