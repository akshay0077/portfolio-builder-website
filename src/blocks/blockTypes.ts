import type { Block } from 'payload'

// Base block interface
export interface BaseBlock {
  blockType: string
}

// Home Block
export const HomeBlock: Block = {
  slug: 'homeBlock',
  labels: {
    singular: 'Home Block',
    plural: 'Home Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Heading',
    },
    {
      name: 'subheading',
      type: 'text',
      label: 'Subheading',
    },
    {
      name: 'profileImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Profile Image',
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Links',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: [
            { label: 'GitHub', value: 'github' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Twitter', value: 'twitter' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'YouTube', value: 'youtube' },
          ],
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}

// Stacks Block
export const StacksBlock: Block = {
  slug: 'stacksBlock',
  labels: {
    singular: 'Stacks Block',
    plural: 'Stacks Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Heading',
    },
    {
      name: 'subheading',
      type: 'text',
      label: 'Subheading',
    },
    {
      name: 'techStacks',
      type: 'array',
      label: 'Tech Stacks',
      fields: [
        {
          name: 'category',
          type: 'text',
          required: true,
          label: 'Category',
        },
        {
          name: 'technologies',
          type: 'array',
          label: 'Technologies',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'icon',
              type: 'upload',
              relationTo: 'media',
              label: 'Icon',
            },
          ],
        },
      ],
    },
  ],
}

// About Block
export const AboutBlock: Block = {
  slug: 'aboutBlock',
  labels: {
    singular: 'About Block',
    plural: 'About Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Heading',
    },
    {
      name: 'subheading',
      type: 'text',
      label: 'Subheading',
    },
    {
      name: 'profileImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Profile Image',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
    },
    {
      name: 'buttonText',
      type: 'text',
      label: 'Button Text',
    },
    {
      name: 'buttonPath',
      type: 'text',
      label: 'Button Path',
    },
    {
      name: 'codeProfiles',
      type: 'group',
      label: 'Code Profiles',
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Code Profiles Heading',
        },
        {
          name: 'profiles',
          type: 'array',
          label: 'Profiles',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Code Profile Title',
            },
            {
              name: 'url',
              type: 'text',
              required: true,
              label: 'Code Profile URL',
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Code Profile Image',
            },
          ],
        },
      ],
    },
  ],
}

// Experiences Block
export const ExperiencesBlock: Block = {
  slug: 'experiencesBlock',
  labels: {
    singular: 'Experiences Block',
    plural: 'Experiences Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Heading',
    },
    {
      name: 'subheading',
      type: 'text',
      label: 'Subheading',
    },
    {
      name: 'experiences',
      type: 'array',
      label: 'Experiences',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Job Title',
        },
        {
          name: 'company',
          type: 'text',
          required: true,
          label: 'Company',
        },
        {
          name: 'companyLogo',
          type: 'upload',
          relationTo: 'media',
          label: 'Company Logo',
        },
        {
          name: 'location',
          type: 'text',
          label: 'Location',
        },
        {
          name: 'startDate',
          type: 'date',
          label: 'Start Date',
        },
        {
          name: 'endDate',
          type: 'date',
          label: 'End Date',
        },
        {
          name: 'current',
          type: 'checkbox',
          label: 'Current Position',
        },
        {
          name: 'description',
          type: 'richText',
          label: 'Description',
        },
        {
          name: 'skills',
          type: 'array',
          label: 'Skills Used',
          fields: [
            {
              name: 'skill',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'achievements',
          type: 'array',
          label: 'Achievements',
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
              label: 'Achievement Heading',
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Achievement Description',
            },
          ],
        },
      ],
    },
  ],
}

// Contact Block
export const ContactBlock: Block = {
  slug: 'contactBlock',
  labels: {
    singular: 'Contact Block',
    plural: 'Contact Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Heading',
    },
    {
      name: 'subheading',
      type: 'text',
      label: 'Subheading',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone',
    },
    {
      name: 'formFields',
      type: 'array',
      label: 'Form Fields',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Text', value: 'text' },
            { label: 'Email', value: 'email' },
            { label: 'Textarea', value: 'textarea' },
            { label: 'Select', value: 'select' },
          ],
          required: true,
        },
        {
          name: 'required',
          type: 'checkbox',
          label: 'Required',
        },
      ],
    },
    {
      name: 'submitButtonText',
      type: 'text',
      label: 'Submit Button Text',
      defaultValue: 'Send Message',
    },
  ],
}

// Form Block
export const FormBlock: Block = {
  slug: 'formBlock',
  labels: {
    singular: 'Form Block',
    plural: 'Form Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Heading',
    },
    {
      name: 'formFields',
      type: 'array',
      label: 'Form Fields',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Text', value: 'text' },
            { label: 'Email', value: 'email' },
            { label: 'Textarea', value: 'textarea' },
            { label: 'Select', value: 'select' },
            { label: 'Checkbox', value: 'checkbox' },
            { label: 'Radio', value: 'radio' },
          ],
          required: true,
        },
        {
          name: 'required',
          type: 'checkbox',
          label: 'Required',
        },
      ],
    },
    {
      name: 'submitButtonText',
      type: 'text',
      label: 'Submit Button Text',
      defaultValue: 'Submit',
    },
  ],
}

// Disqus Comment Block
export const DisqusCommentBlock: Block = {
  slug: 'disqusCommentBlock',
  labels: {
    singular: 'Disqus Comment Block',
    plural: 'Disqus Comment Blocks',
  },
  fields: [
    {
      name: 'disqusShortname',
      type: 'text',
      required: true,
      label: 'Disqus Shortname',
    },
    {
      name: 'identifier',
      type: 'text',
      label: 'Identifier (optional)',
    },
  ],
}

// List Block
export const ListBlock: Block = {
  slug: 'listBlock',
  labels: {
    singular: 'List Block',
    plural: 'List Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Heading',
    },
    {
      name: 'subheading',
      type: 'text',
      label: 'Subheading',
    },
    {
      name: 'items',
      type: 'array',
      label: 'List Items',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'link',
          type: 'text',
          label: 'Link URL',
        },
      ],
    },
    {
      name: 'layout',
      type: 'select',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'List', value: 'list' },
        { label: 'Cards', value: 'cards' },
      ],
      defaultValue: 'grid',
    },
  ],
}

// Export all blocks
export const blocks = {
  homeBlock: HomeBlock,
  stacksBlock: StacksBlock,
  aboutBlock: AboutBlock,
  experiencesBlock: ExperiencesBlock,
  contactBlock: ContactBlock,
  formBlock: FormBlock,
  disqusCommentBlock: DisqusCommentBlock,
  listBlock: ListBlock,
}
