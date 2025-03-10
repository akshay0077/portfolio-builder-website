// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { seoPlugin } from '@payloadcms/plugin-seo'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Projects } from './collections/Projects'
import { Blogs } from './collections/Blogs'
import { ContactForm } from './collections/ContactForm'
import SiteSettings from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Pages, Projects, Blogs, ContactForm],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET ?? '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI ?? '',
    },
  }),
  sharp,
  plugins: [
    // storage-adapter-placeholder
    seoPlugin({
      collections: ['pages'],
      uploadsCollection: 'media',
      tabbedUI: true,
      generateTitle: ({ doc }: { doc: any }) => {
        return `${doc.title} | Portfolio`
      },
      generateDescription: ({ doc }: { doc: any }) => {
        // You can customize this based on your content structure
        return doc.content?.slice(0, 150) || ''
      },
      // Add custom fields to the SEO field group
      fields: ({ defaultFields }) => [
        ...defaultFields,
        {
          name: 'keywords',
          type: 'text',
          label: 'Meta Keywords',
        },
      ],
    }),
  ],
})
