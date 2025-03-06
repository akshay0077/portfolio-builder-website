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
      name: 'greetText',
      type: 'text',
      label: 'Greet Text',
      admin: {
        description: 'The greeting text displayed on the home page.',
      },
    },
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      required: true,
      admin: {
        description: 'The name to be displayed prominently on the home page.',
      },
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Description',
      admin: {
        description:
          'A short description or tagline to describe yourself or your site.',
      },
    },
    {
      name: 'profileImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Profile Image',
      admin: {
        description: 'A profile picture to display on the home page.',
      },
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Links',
      admin: {
        description:
          'A list of social media links to display on the home page.',
      },
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
          admin: {
            description: 'The social media platform for this link.',
          },
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          admin: {
            description: 'The URL to your profile on this platform.',
          },
        },
      ],
    },
    {
      name: 'button',
      type: 'text',
      label: 'Button',
      admin: {
        description:
          'The text for the main call-to-action button on the home page.',
      },
    },
    {
      name: 'buttonPath',
      type: 'text',
      label: 'Button Path',
      admin: {
        description: 'The URL or path the button navigates to.',
      },
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
      admin: {
        description: 'The main heading for the tech stacks section.',
      },
    },
    {
      name: 'subheading',
      type: 'text',
      label: 'Subheading',
      admin: {
        description:
          'A subheading or brief description for the tech stacks section.',
      },
    },
    {
      name: 'techStacks',
      type: 'array',
      label: 'Tech Stacks',
      admin: {
        description: 'Categories of technologies you are proficient in.',
      },
      fields: [
        {
          name: 'category',
          type: 'text',
          required: true,
          label: 'Category',
          admin: {
            description:
              'The category name (e.g., "Frontend", "Backend", "DevOps").',
          },
        },
        {
          name: 'technologies',
          type: 'array',
          label: 'Technologies',
          admin: {
            description: 'List of technologies in this category.',
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              admin: {
                description: 'The name of the technology.',
              },
            },
            {
              name: 'icon',
              type: 'upload',
              relationTo: 'media',
              label: 'Icon',
              admin: {
                description: 'An icon representing this technology.',
              },
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
      admin: {
        description: 'The main heading for the about section.',
      },
    },
    {
      name: 'subheading',
      type: 'text',
      label: 'Subheading',
      admin: {
        description: 'A subheading or brief description for the about section.',
      },
    },
    {
      name: 'profileImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Profile Image',
      admin: {
        description: 'Your profile image to display in the about section.',
      },
    },
    {
      name: 'aboutYourself',
      type: 'richText',
      label: 'About Your Self',
      admin: {
        description:
          'A detailed description about yourself, your background, and your interests.',
      },
    },
    {
      name: 'details',
      type: 'array',
      label: 'Details',
      admin: {
        description:
          'Additional details about yourself organized by categories.',
      },
      fields: [
        {
          name: 'detailsTitle',
          type: 'text',
          label: 'Details Title',
          required: true,
          admin: {
            description: 'The title or category of these details.',
          },
        },
        {
          name: 'detailPoints',
          type: 'array',
          label: 'Details Points',
          admin: {
            description: 'Points or items under this detail category.',
          },
          fields: [
            {
              name: 'detailPoint',
              type: 'text',
              label: 'Detail Point',
              required: true,
              admin: {
                description: 'A specific point or item of information.',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'buttonText',
      type: 'text',
      label: 'Button Text',
      admin: {
        description: 'Text to display on the button.',
      },
    },
    {
      name: 'buttonPath',
      type: 'text',
      label: 'Button Path',
      admin: {
        description: 'URL or path the button should link to.',
      },
    },
    {
      name: 'codeProfiles',
      type: 'group',
      label: 'Code Profiles',
      admin: {
        description: 'Your coding profiles on various platforms.',
      },
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Code Profiles Heading',
          admin: {
            description: 'Heading for the code profiles section.',
          },
        },
        {
          name: 'profiles',
          type: 'array',
          label: 'Profiles',
          admin: {
            description: 'List of your coding profiles.',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Code Profile Title',
              admin: {
                description: 'Name of the coding platform.',
              },
            },
            {
              name: 'url',
              type: 'text',
              required: true,
              label: 'Code Profile URL',
              admin: {
                description: 'URL to your profile on this platform.',
              },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Code Profile Image',
              admin: {
                description: 'Logo or image for this coding platform.',
              },
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
      admin: {
        description: 'The main heading for the experiences section.',
      },
    },
    {
      name: 'subheading',
      type: 'text',
      label: 'Subheading',
      admin: {
        description:
          'A subheading or brief description for the experiences section.',
      },
    },
    {
      name: 'experiences',
      type: 'array',
      label: 'Experiences',
      admin: {
        description: 'Add your work experiences here.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Job Title',
          admin: {
            description: 'Your job title or position.',
          },
        },
        {
          name: 'company',
          type: 'text',
          required: true,
          label: 'Company',
          admin: {
            description: 'The name of the company you worked for.',
          },
        },
        {
          name: 'companyLink',
          type: 'text',
          label: 'Company Link',
          admin: {
            description: 'URL to the company website.',
          },
        },
        {
          name: 'companyLogo',
          type: 'upload',
          relationTo: 'media',
          label: 'Company Logo',
          admin: {
            description: 'Logo of the company you worked for.',
          },
        },
        {
          name: 'location',
          type: 'text',
          label: 'Location',
          admin: {
            description: 'The location where you worked.',
          },
        },
        {
          name: 'startDate',
          type: 'date',
          label: 'Start Date',
          admin: {
            description: 'When you started working at this position.',
          },
        },
        {
          name: 'endDate',
          type: 'date',
          label: 'End Date',
          admin: {
            description: 'When you finished working at this position.',
          },
        },
        {
          name: 'current',
          type: 'checkbox',
          label: 'Current Position',
          admin: {
            description: 'Check if this is your current job.',
          },
        },
        {
          name: 'workDetails',
          type: 'array',
          label: 'About your work',
          admin: {
            description: 'Details about your work and responsibilities.',
          },
          fields: [
            {
              name: 'description',
              type: 'richText',
              label: 'Description',
              admin: {
                description:
                  'Description of your work responsibilities or projects.',
              },
            },
          ],
        },
        {
          name: 'skills',
          type: 'array',
          label: 'Skills Used',
          admin: {
            description: 'Skills you utilized in this position.',
          },
          fields: [
            {
              name: 'skill',
              type: 'text',
              required: true,
              admin: {
                description: 'A skill you used in this role.',
              },
            },
          ],
        },
        {
          name: 'achievementsHeading',
          type: 'text',
          label: 'Achievements Heading',
          admin: {
            description: 'Heading for the achievements section.',
          },
        },
        {
          name: 'achievements',
          type: 'array',
          label: 'Achievements',
          admin: {
            description: 'Your key achievements in this role.',
          },
          fields: [
            {
              name: 'description',
              type: 'textarea',
              label: 'Achievement Description',
              admin: {
                description: 'Description of your achievement.',
              },
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
      label: 'Contact Heading',
      admin: {
        description: 'The main heading for the contact section.',
      },
    },
    {
      name: 'subheading',
      type: 'text',
      label: 'Contact Description',
      admin: {
        description: 'A description or brief text for the contact section.',
      },
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      admin: {
        description: 'Your contact email address.',
      },
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone',
      admin: {
        description: 'Your contact phone number.',
      },
    },
    {
      name: 'contactReasons',
      type: 'array',
      label: 'Contact Reasons',
      admin: {
        description: 'List of reasons why someone might contact you.',
      },
      fields: [
        {
          name: 'reason',
          type: 'text',
          required: true,
          label: 'Reason',
          admin: {
            description:
              'A reason or category for contact (e.g., "Business Inquiry", "Job Opportunity").',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          admin: {
            description: 'A brief description of this contact reason.',
          },
        },
      ],
    },
    {
      name: 'submitButtonText',
      type: 'text',
      label: 'Submit Button Text',
      defaultValue: 'Send Message',
      admin: {
        description: 'Text to display on the contact form submit button.',
      },
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
      admin: {
        description: 'The main heading for the form section.',
      },
    },
    {
      name: 'formFields',
      type: 'array',
      label: 'Form Fields',
      admin: {
        description: 'Define the fields that will appear in your form.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            description: 'The label for this form field.',
          },
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
          admin: {
            description: 'The type of input field to display.',
          },
        },
        {
          name: 'required',
          type: 'checkbox',
          label: 'Required',
          admin: {
            description: 'Check if this field is required to be filled out.',
          },
        },
      ],
    },
    {
      name: 'submitButtonText',
      type: 'text',
      label: 'Submit Button Text',
      defaultValue: 'Submit',
      admin: {
        description: 'Text to display on the form submit button.',
      },
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
      admin: {
        description: 'Your Disqus shortname from your Disqus account.',
      },
    },
    {
      name: 'identifier',
      type: 'text',
      label: 'Identifier (optional)',
      admin: {
        description: 'A unique identifier for the comment thread (optional).',
      },
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
      label: 'Title',
      admin: {
        description: 'The title for this list section.',
      },
    },
    {
      name: 'collectionSlug',
      type: 'select',
      required: true,
      options: [
        { label: 'Blogs', value: 'blogs' },
        { label: 'Projects', value: 'projects' },
      ],
      label: 'Collection Slug',
      admin: {
        description: 'Select which collection to display items from.',
      },
    },
  ],
}

// Dynamic Content Block
export const DynamicContentBlock: Block = {
  slug: 'dynamicContentBlock',
  labels: {
    singular: 'Dynamic Content Block',
    plural: 'Dynamic Content Blocks',
  },
  fields: [
    {
      name: 'collectionSlug',
      type: 'select',
      required: true,
      options: [
        { label: 'Blogs', value: 'blogs' },
        { label: 'Projects', value: 'projects' },
      ],
      label: 'Collection Slug',
      admin: {
        description: 'Select which collection to display content from.',
      },
    },
  ],
}

// Export all blocks
export const blocks = {
  homeBlock: {
    ...HomeBlock,
    imageURL: 'https://picsum.photos/200/200?random=1',
    admin: {
      ...HomeBlock.admin,
    },
  },
  stacksBlock: {
    ...StacksBlock,
    imageURL: 'https://picsum.photos/200/200?random=2',
    admin: {
      ...StacksBlock.admin,
    },
  },
  aboutBlock: {
    ...AboutBlock,
    imageURL: 'https://picsum.photos/200/200?random=3',
    admin: {
      ...AboutBlock.admin,
    },
  },
  experiencesBlock: {
    ...ExperiencesBlock,
    imageURL: 'https://picsum.photos/200/200?random=4',
    admin: {
      ...ExperiencesBlock.admin,
    },
  },
  contactBlock: {
    ...ContactBlock,
    imageURL: 'https://picsum.photos/200/200?random=5',
    admin: {
      ...ContactBlock.admin,
    },
  },
  formBlock: {
    ...FormBlock,
    imageURL: 'https://picsum.photos/200/200?random=6',
    admin: {
      ...FormBlock.admin,
    },
  },
  disqusCommentBlock: {
    ...DisqusCommentBlock,
    imageURL: 'https://picsum.photos/200/200?random=7',
    admin: {
      ...DisqusCommentBlock.admin,
    },
  },
  listBlock: {
    ...ListBlock,
    imageURL: 'https://picsum.photos/200/200?random=8',
    admin: {
      ...ListBlock.admin,
    },
  },
  dynamicContentBlock: {
    ...DynamicContentBlock,
    imageURL: 'https://picsum.photos/200/200?random=9',
    admin: {
      ...DynamicContentBlock.admin,
    },
  },
}
