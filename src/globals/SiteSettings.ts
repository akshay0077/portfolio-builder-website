import { CollectionConfig } from 'payload'

const SiteSettings: CollectionConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Settings',
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Site Title',
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Site Description',
            },
            {
              name: 'favicon',
              type: 'upload',
              label: 'Favicon',
              relationTo: 'media',
              filterOptions: {
                mimeType: { contains: 'image' },
              },
              admin: {
                description: 'We recommend a maximum size of 256 * 256 pixels',
              },
            },
            {
              name: 'ogImage',
              type: 'upload',
              label: 'OG Image',
              relationTo: 'media',
              filterOptions: {
                mimeType: { contains: 'image' },
              },
              admin: {
                description: 'We recommend a maximum size of 1200 * 630 pixels',
              },
            },
            {
              name: 'keywords',
              type: 'text',
              label: 'Keywords',
              admin: {
                description: 'Separate keywords with commas',
              },
            },
          ],
        },
        {
          label: 'Navbar',
          fields: [
            {
              name: 'logo',
              type: 'group',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  label: 'Logo Image',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'height',
                  type: 'number',
                  label: 'Height',
                  min: 1,
                },
                {
                  name: 'width',
                  type: 'number',
                  label: 'Width',
                  min: 1,
                },
              ],
            },
            {
              name: 'menuLinks',
              type: 'array',
              label: 'Menu Links',
              fields: [
                {
                  name: 'group',
                  type: 'checkbox',
                  label: 'Is Group',
                },
                {
                  type: 'group',
                  name: 'link',
                  fields: [
                    {
                      name: 'type',
                      type: 'radio',
                      options: [
                        {
                          label: 'Internal Link',
                          value: 'internal',
                        },
                        {
                          label: 'Custom URL',
                          value: 'custom',
                        },
                      ],
                      defaultValue: 'internal',
                    },
                    {
                      name: 'openInNewTab',
                      type: 'checkbox',
                      label: 'Open in new tab',
                    },
                    {
                      name: 'icon',
                      type: 'upload',
                      label: 'Icon',
                      relationTo: 'media',
                      admin: {
                        description:
                          'Upload an svg or logo to be displayed with link',
                      },
                    },
                    {
                      name: 'label',
                      type: 'text',
                      required: true,
                      label: 'Label',
                    },
                    {
                      name: 'page',
                      type: 'relationship',
                      relationTo: 'pages',
                      required: true,
                      label: 'Page',
                      admin: {
                        condition: (
                          _: unknown,
                          siblingData: { type?: string }
                        ) => siblingData?.type === 'internal',
                      },
                    },
                    {
                      name: 'url',
                      type: 'text',
                      required: true,
                      label: 'URL',
                      admin: {
                        condition: (
                          _: unknown,
                          siblingData: { type?: string }
                        ) => siblingData?.type === 'custom',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Footer',
          fields: [
            {
              name: 'footerLogo',
              type: 'group',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  label: 'Footer Logo',
                  relationTo: 'media',
                },
                {
                  name: 'height',
                  type: 'number',
                  label: 'Height',
                  min: 1,
                },
                {
                  name: 'width',
                  type: 'number',
                  label: 'Width',
                  min: 1,
                },
              ],
            },
            {
              name: 'footerText',
              type: 'textarea',
              label: 'Footer Text',
            },
            {
              name: 'footerLinks',
              type: 'array',
              label: 'Footer Links',
              fields: [
                {
                  name: 'group',
                  type: 'text',
                  label: 'Group Name',
                },
                {
                  name: 'links',
                  type: 'array',
                  label: 'Links',
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      required: true,
                      label: 'Label',
                    },
                    {
                      name: 'url',
                      type: 'text',
                      required: true,
                      label: 'URL',
                    },
                  ],
                },
              ],
            },
            {
              name: 'socialLinks',
              type: 'array',
              label: 'Social Links',
              fields: [
                {
                  name: 'platform',
                  type: 'text',
                  required: true,
                  label: 'Platform Name',
                },
                {
                  name: 'icon',
                  type: 'upload',
                  label: 'Platform Icon',
                  relationTo: 'media',
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                  label: 'Profile URL',
                },
              ],
            },
          ],
        },
        {
          label: 'Redirection Links',
          fields: [
            {
              name: 'redirects',
              type: 'array',
              label: 'Redirections',
              fields: [
                {
                  name: 'fromPath',
                  type: 'text',
                  required: true,
                  label: 'From Path',
                  admin: {
                    description: 'The path to redirect from (e.g., /old-page)',
                  },
                },
                {
                  name: 'toPath',
                  type: 'text',
                  required: true,
                  label: 'To Path',
                  admin: {
                    description: 'The path to redirect to (e.g., /new-page)',
                  },
                },
                {
                  name: 'isPermanent',
                  type: 'checkbox',
                  label: 'Permanent Redirect (301)',
                  defaultValue: true,
                },
                {
                  name: 'isEnabled',
                  type: 'checkbox',
                  label: 'Enable Redirect',
                  defaultValue: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Monetization',
          fields: [
            {
              name: 'ads',
              type: 'group',
              label: 'Advertisement Settings',
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  label: 'Enable Advertisements',
                },
                {
                  name: 'adsenseId',
                  type: 'text',
                  label: 'Google AdSense ID',
                },
                {
                  name: 'placements',
                  type: 'array',
                  label: 'Ad Placements',
                  fields: [
                    {
                      name: 'type',
                      type: 'select',
                      label: 'Position',
                      options: [
                        { label: 'Header', value: 'header' },
                        { label: 'Sidebar', value: 'sidebar' },
                        { label: 'In Content', value: 'content' },
                        { label: 'Footer', value: 'footer' },
                      ],
                      required: true,
                    },
                    {
                      name: 'code',
                      type: 'textarea',
                      label: 'Advertisement Code',
                    },
                  ],
                },
              ],
            },
            {
              name: 'affiliate',
              type: 'group',
              label: 'Affiliate Settings',
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  label: 'Enable Affiliate Links',
                },
                {
                  name: 'disclosure',
                  type: 'textarea',
                  label: 'Affiliate Disclosure Text',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  versions: {
    drafts: true,
  },
}

export default SiteSettings
