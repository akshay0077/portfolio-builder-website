// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { s3Storage } from '@payloadcms/storage-s3'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Projects } from './collections/Projects'
import { Blogs } from './collections/Blogs'
import { ContactForm } from './collections/ContactForm'
import SiteSettings from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const { PAYLOAD_SECRET, DATABASE_URI, MEDIA_BUCKET_NAME, AWS_ENDPOINT } =
  process.env

// Validate required environment variables
if (!PAYLOAD_SECRET) {
  throw new Error('env var PAYLOAD_SECRET is required!')
}
if (!DATABASE_URI) {
  throw new Error('env var DATABASE_URI is required!')
}
if (!MEDIA_BUCKET_NAME) {
  throw new Error('env var MEDIA_BUCKET_NAME is required')
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      url: 'http://localhost:3000',
      collections: ['pages'],
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
    s3Storage({
      enabled: true,
      bucket: MEDIA_BUCKET_NAME,
      config: {
        ...(AWS_ENDPOINT
          ? {
              endpoint: AWS_ENDPOINT,
              forcePathStyle: true,
            }
          : {}),
      },
      collections: {
        media: true,
      },
    }),
    seoPlugin({
      collections: ['pages'],
      uploadsCollection: 'media',
      tabbedUI: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      generateTitle: ({ doc }: { doc: any }) => {
        return `${doc.title} | Portfolio`
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
