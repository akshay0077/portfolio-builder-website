/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

/**
 * Supported timezones in IANA format.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "supportedTimezones".
 */
export type SupportedTimezones =
  | 'Pacific/Midway'
  | 'Pacific/Niue'
  | 'Pacific/Honolulu'
  | 'Pacific/Rarotonga'
  | 'America/Anchorage'
  | 'Pacific/Gambier'
  | 'America/Los_Angeles'
  | 'America/Tijuana'
  | 'America/Denver'
  | 'America/Phoenix'
  | 'America/Chicago'
  | 'America/Guatemala'
  | 'America/New_York'
  | 'America/Bogota'
  | 'America/Caracas'
  | 'America/Santiago'
  | 'America/Buenos_Aires'
  | 'America/Sao_Paulo'
  | 'Atlantic/South_Georgia'
  | 'Atlantic/Azores'
  | 'Atlantic/Cape_Verde'
  | 'Europe/London'
  | 'Europe/Berlin'
  | 'Africa/Lagos'
  | 'Europe/Athens'
  | 'Africa/Cairo'
  | 'Europe/Moscow'
  | 'Asia/Riyadh'
  | 'Asia/Dubai'
  | 'Asia/Baku'
  | 'Asia/Karachi'
  | 'Asia/Tashkent'
  | 'Asia/Calcutta'
  | 'Asia/Dhaka'
  | 'Asia/Almaty'
  | 'Asia/Jakarta'
  | 'Asia/Bangkok'
  | 'Asia/Shanghai'
  | 'Asia/Singapore'
  | 'Asia/Tokyo'
  | 'Asia/Seoul'
  | 'Australia/Sydney'
  | 'Pacific/Guam'
  | 'Pacific/Noumea'
  | 'Pacific/Auckland'
  | 'Pacific/Fiji'

export interface Config {
  auth: {
    users: UserAuthOperations
  }
  blocks: {}
  collections: {
    users: User
    media: Media
    pages: Page
    projects: Project
    blogs: Blog
    'contact-forms': ContactForm
    'site-settings': SiteSetting
    'payload-locked-documents': PayloadLockedDocument
    'payload-preferences': PayloadPreference
    'payload-migrations': PayloadMigration
  }
  collectionsJoins: {}
  collectionsSelect: {
    users: UsersSelect<false> | UsersSelect<true>
    media: MediaSelect<false> | MediaSelect<true>
    pages: PagesSelect<false> | PagesSelect<true>
    projects: ProjectsSelect<false> | ProjectsSelect<true>
    blogs: BlogsSelect<false> | BlogsSelect<true>
    'contact-forms': ContactFormsSelect<false> | ContactFormsSelect<true>
    'site-settings': SiteSettingsSelect<false> | SiteSettingsSelect<true>
    'payload-locked-documents':
      | PayloadLockedDocumentsSelect<false>
      | PayloadLockedDocumentsSelect<true>
    'payload-preferences':
      | PayloadPreferencesSelect<false>
      | PayloadPreferencesSelect<true>
    'payload-migrations':
      | PayloadMigrationsSelect<false>
      | PayloadMigrationsSelect<true>
  }
  db: {
    defaultIDType: number
  }
  globals: {}
  globalsSelect: {}
  locale: null
  user: User & {
    collection: 'users'
  }
  jobs: {
    tasks: unknown
    workflows: unknown
  }
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string
    password: string
  }
  login: {
    email: string
    password: string
  }
  registerFirstUser: {
    email: string
    password: string
  }
  unlock: {
    email: string
    password: string
  }
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: number
  updatedAt: string
  createdAt: string
  _status?: ('draft' | 'published') | null
  email: string
  resetPasswordToken?: string | null
  resetPasswordExpiration?: string | null
  salt?: string | null
  hash?: string | null
  loginAttempts?: number | null
  lockUntil?: string | null
  password?: string | null
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: number
  alt: string
  updatedAt: string
  createdAt: string
  _status?: ('draft' | 'published') | null
  url?: string | null
  thumbnailURL?: string | null
  filename?: string | null
  mimeType?: string | null
  filesize?: number | null
  width?: number | null
  height?: number | null
  focalX?: number | null
  focalY?: number | null
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages".
 */
export interface Page {
  id: number
  title: string
  pageLayout?:
    | (
        | {
            heading: string
            subheading?: string | null
            profileImage?: (number | null) | Media
            socialLinks?:
              | {
                  platform:
                    | 'github'
                    | 'linkedin'
                    | 'twitter'
                    | 'instagram'
                    | 'facebook'
                    | 'youtube'
                  url: string
                  id?: string | null
                }[]
              | null
            id?: string | null
            blockName?: string | null
            blockType: 'homeBlock'
          }
        | {
            heading: string
            subheading?: string | null
            techStacks?:
              | {
                  category: string
                  technologies?:
                    | {
                        name: string
                        icon?: (number | null) | Media
                        id?: string | null
                      }[]
                    | null
                  id?: string | null
                }[]
              | null
            id?: string | null
            blockName?: string | null
            blockType: 'stacksBlock'
          }
        | {
            heading: string
            subheading?: string | null
            profileImage?: (number | null) | Media
            content?: {
              root: {
                type: string
                children: {
                  type: string
                  version: number
                  [k: string]: unknown
                }[]
                direction: ('ltr' | 'rtl') | null
                format:
                  | 'left'
                  | 'start'
                  | 'center'
                  | 'right'
                  | 'end'
                  | 'justify'
                  | ''
                indent: number
                version: number
              }
              [k: string]: unknown
            } | null
            buttonText?: string | null
            buttonPath?: string | null
            codeProfiles?: {
              heading?: string | null
              profiles?:
                | {
                    title: string
                    url: string
                    image?: (number | null) | Media
                    id?: string | null
                  }[]
                | null
            }
            id?: string | null
            blockName?: string | null
            blockType: 'aboutBlock'
          }
        | {
            heading: string
            subheading?: string | null
            experiences?:
              | {
                  title: string
                  company: string
                  companyLogo?: (number | null) | Media
                  location?: string | null
                  startDate?: string | null
                  endDate?: string | null
                  current?: boolean | null
                  description?: {
                    root: {
                      type: string
                      children: {
                        type: string
                        version: number
                        [k: string]: unknown
                      }[]
                      direction: ('ltr' | 'rtl') | null
                      format:
                        | 'left'
                        | 'start'
                        | 'center'
                        | 'right'
                        | 'end'
                        | 'justify'
                        | ''
                      indent: number
                      version: number
                    }
                    [k: string]: unknown
                  } | null
                  skills?:
                    | {
                        skill: string
                        id?: string | null
                      }[]
                    | null
                  achievements?:
                    | {
                        heading: string
                        description?: string | null
                        id?: string | null
                      }[]
                    | null
                  id?: string | null
                }[]
              | null
            id?: string | null
            blockName?: string | null
            blockType: 'experiencesBlock'
          }
        | {
            heading: string
            subheading?: string | null
            email?: string | null
            phone?: string | null
            formFields?:
              | {
                  label: string
                  type: 'text' | 'email' | 'textarea' | 'select'
                  required?: boolean | null
                  id?: string | null
                }[]
              | null
            submitButtonText?: string | null
            id?: string | null
            blockName?: string | null
            blockType: 'contactBlock'
          }
        | {
            heading: string
            formFields?:
              | {
                  label: string
                  type:
                    | 'text'
                    | 'email'
                    | 'textarea'
                    | 'select'
                    | 'checkbox'
                    | 'radio'
                  required?: boolean | null
                  id?: string | null
                }[]
              | null
            submitButtonText?: string | null
            id?: string | null
            blockName?: string | null
            blockType: 'formBlock'
          }
        | {
            disqusShortname: string
            identifier?: string | null
            id?: string | null
            blockName?: string | null
            blockType: 'disqusCommentBlock'
          }
        | {
            heading: string
            subheading?: string | null
            items?:
              | {
                  title: string
                  description?: string | null
                  image?: (number | null) | Media
                  link?: string | null
                  id?: string | null
                }[]
              | null
            layout?: ('grid' | 'list' | 'cards') | null
            id?: string | null
            blockName?: string | null
            blockType: 'listBlock'
          }
      )[]
    | null
  meta?: {
    title?: string | null
    description?: string | null
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media
    keywords?: string | null
  }
  slugMode?: ('generate' | 'custom') | null
  slug?: string | null
  pathMode?: ('generate' | 'custom') | null
  path?: string | null
  parent?: (number | null) | Page
  breadcrumbs?:
    | {
        label: string
        url: string
        id?: string | null
      }[]
    | null
  status?: ('draft' | 'published') | null
  /**
   * Is this the home page?
   */
  isHomePage?: boolean | null
  updatedAt: string
  createdAt: string
  _status?: ('draft' | 'published') | null
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "projects".
 */
export interface Project {
  id: number
  projectType: 'major' | 'minor'
  projectName: string
  projectImage: number | Media
  summary: string
  projectLinks?:
    | {
        serviceName: string
        serviceLink: string
        id?: string | null
      }[]
    | null
  features?:
    | {
        feature: string
        id?: string | null
      }[]
    | null
  techStack?:
    | {
        technology: string
        technologyIcon?: (number | null) | Media
        id?: string | null
      }[]
    | null
  /**
   * Auto-generated from Project Name
   */
  slug?: string | null
  updatedAt: string
  createdAt: string
  _status?: ('draft' | 'published') | null
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "blogs".
 */
export interface Blog {
  id: number
  title: string
  /**
   * Select the platform where the blog is published
   */
  platform: 'medium' | 'devto' | 'hashnode' | 'other'
  /**
   * This image will be displayed as the blog preview
   */
  featuredImage: number | Media
  /**
   * A brief description of what the blog is about
   */
  summary: string
  /**
   * The full URL to your blog post
   */
  externalLink: string
  /**
   * When was this blog published?
   */
  publishedDate: string
  /**
   * Add up to 5 tags to categorize your blog
   */
  tags?:
    | {
        tag: string
        id?: string | null
      }[]
    | null
  /**
   * Auto-generated from Blog Title
   */
  slug?: string | null
  updatedAt: string
  createdAt: string
  _status?: ('draft' | 'published') | null
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "contact-forms".
 */
export interface ContactForm {
  id: number
  /**
   * Name of the person submitting the form
   */
  name: string
  /**
   * Email address of the sender
   */
  email: string
  /**
   * Phone number (optional)
   */
  phone?: string | null
  /**
   * Subject of the message
   */
  subject: string
  /**
   * Content of the message
   */
  message: string
  /**
   * Current status of this contact form submission
   */
  status?: ('UNREAD' | 'READ' | 'IN_PROGRESS' | 'COMPLETED' | 'ARCHIVED') | null
  /**
   * Priority level of this contact request
   */
  priority?: ('high' | 'normal' | 'low') | null
  /**
   * Internal notes about this contact (only visible to admin)
   */
  internalNotes?: string | null
  /**
   * Source of the contact form submission
   */
  source?: ('website' | 'api' | 'other') | null
  /**
   * IP address of the sender
   */
  ipAddress?: string | null
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "site-settings".
 */
export interface SiteSetting {
  id: number
  title: string
  description?: string | null
  /**
   * We recommend a maximum size of 256 * 256 pixels
   */
  favicon?: (number | null) | Media
  /**
   * We recommend a maximum size of 1200 * 630 pixels
   */
  ogImage?: (number | null) | Media
  /**
   * Separate keywords with commas
   */
  keywords?: string | null
  logo: {
    image: number | Media
    height?: number | null
    width?: number | null
  }
  menuLinks?:
    | {
        group?: boolean | null
        link: {
          type?: ('internal' | 'custom') | null
          openInNewTab?: boolean | null
          /**
           * Upload an svg or logo to be displayed with link
           */
          icon?: (number | null) | Media
          label: string
          page?: (number | null) | Page
          url?: string | null
        }
        id?: string | null
      }[]
    | null
  footerLogo?: {
    image?: (number | null) | Media
    height?: number | null
    width?: number | null
  }
  footerText?: string | null
  footerLinks?:
    | {
        group?: string | null
        links?:
          | {
              label: string
              url: string
              id?: string | null
            }[]
          | null
        id?: string | null
      }[]
    | null
  socialLinks?:
    | {
        platform: string
        icon?: (number | null) | Media
        url: string
        id?: string | null
      }[]
    | null
  redirects?:
    | {
        /**
         * The path to redirect from (e.g., /old-page)
         */
        fromPath: string
        /**
         * The path to redirect to (e.g., /new-page)
         */
        toPath: string
        isPermanent?: boolean | null
        isEnabled?: boolean | null
        id?: string | null
      }[]
    | null
  ads?: {
    enabled?: boolean | null
    adsenseId?: string | null
    placements?:
      | {
          type: 'header' | 'sidebar' | 'content' | 'footer'
          code?: string | null
          id?: string | null
        }[]
      | null
  }
  affiliate?: {
    enabled?: boolean | null
    disclosure?: string | null
  }
  updatedAt: string
  createdAt: string
  _status?: ('draft' | 'published') | null
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: number
  document?:
    | ({
        relationTo: 'users'
        value: number | User
      } | null)
    | ({
        relationTo: 'media'
        value: number | Media
      } | null)
    | ({
        relationTo: 'pages'
        value: number | Page
      } | null)
    | ({
        relationTo: 'projects'
        value: number | Project
      } | null)
    | ({
        relationTo: 'blogs'
        value: number | Blog
      } | null)
    | ({
        relationTo: 'contact-forms'
        value: number | ContactForm
      } | null)
    | ({
        relationTo: 'site-settings'
        value: number | SiteSetting
      } | null)
  globalSlug?: string | null
  user: {
    relationTo: 'users'
    value: number | User
  }
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: number
  user: {
    relationTo: 'users'
    value: number | User
  }
  key?: string | null
  value?:
    | {
        [k: string]: unknown
      }
    | unknown[]
    | string
    | number
    | boolean
    | null
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: number
  name?: string | null
  batch?: number | null
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  updatedAt?: T
  createdAt?: T
  _status?: T
  email?: T
  resetPasswordToken?: T
  resetPasswordExpiration?: T
  salt?: T
  hash?: T
  loginAttempts?: T
  lockUntil?: T
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
  alt?: T
  updatedAt?: T
  createdAt?: T
  _status?: T
  url?: T
  thumbnailURL?: T
  filename?: T
  mimeType?: T
  filesize?: T
  width?: T
  height?: T
  focalX?: T
  focalY?: T
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages_select".
 */
export interface PagesSelect<T extends boolean = true> {
  title?: T
  pageLayout?:
    | T
    | {
        homeBlock?:
          | T
          | {
              heading?: T
              subheading?: T
              profileImage?: T
              socialLinks?:
                | T
                | {
                    platform?: T
                    url?: T
                    id?: T
                  }
              id?: T
              blockName?: T
            }
        stacksBlock?:
          | T
          | {
              heading?: T
              subheading?: T
              techStacks?:
                | T
                | {
                    category?: T
                    technologies?:
                      | T
                      | {
                          name?: T
                          icon?: T
                          id?: T
                        }
                    id?: T
                  }
              id?: T
              blockName?: T
            }
        aboutBlock?:
          | T
          | {
              heading?: T
              subheading?: T
              profileImage?: T
              content?: T
              buttonText?: T
              buttonPath?: T
              codeProfiles?:
                | T
                | {
                    heading?: T
                    profiles?:
                      | T
                      | {
                          title?: T
                          url?: T
                          image?: T
                          id?: T
                        }
                  }
              id?: T
              blockName?: T
            }
        experiencesBlock?:
          | T
          | {
              heading?: T
              subheading?: T
              experiences?:
                | T
                | {
                    title?: T
                    company?: T
                    companyLogo?: T
                    location?: T
                    startDate?: T
                    endDate?: T
                    current?: T
                    description?: T
                    skills?:
                      | T
                      | {
                          skill?: T
                          id?: T
                        }
                    achievements?:
                      | T
                      | {
                          heading?: T
                          description?: T
                          id?: T
                        }
                    id?: T
                  }
              id?: T
              blockName?: T
            }
        contactBlock?:
          | T
          | {
              heading?: T
              subheading?: T
              email?: T
              phone?: T
              formFields?:
                | T
                | {
                    label?: T
                    type?: T
                    required?: T
                    id?: T
                  }
              submitButtonText?: T
              id?: T
              blockName?: T
            }
        formBlock?:
          | T
          | {
              heading?: T
              formFields?:
                | T
                | {
                    label?: T
                    type?: T
                    required?: T
                    id?: T
                  }
              submitButtonText?: T
              id?: T
              blockName?: T
            }
        disqusCommentBlock?:
          | T
          | {
              disqusShortname?: T
              identifier?: T
              id?: T
              blockName?: T
            }
        listBlock?:
          | T
          | {
              heading?: T
              subheading?: T
              items?:
                | T
                | {
                    title?: T
                    description?: T
                    image?: T
                    link?: T
                    id?: T
                  }
              layout?: T
              id?: T
              blockName?: T
            }
      }
  meta?:
    | T
    | {
        title?: T
        description?: T
        image?: T
        keywords?: T
      }
  slugMode?: T
  slug?: T
  pathMode?: T
  path?: T
  parent?: T
  breadcrumbs?:
    | T
    | {
        label?: T
        url?: T
        id?: T
      }
  status?: T
  isHomePage?: T
  updatedAt?: T
  createdAt?: T
  _status?: T
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "projects_select".
 */
export interface ProjectsSelect<T extends boolean = true> {
  projectType?: T
  projectName?: T
  projectImage?: T
  summary?: T
  projectLinks?:
    | T
    | {
        serviceName?: T
        serviceLink?: T
        id?: T
      }
  features?:
    | T
    | {
        feature?: T
        id?: T
      }
  techStack?:
    | T
    | {
        technology?: T
        technologyIcon?: T
        id?: T
      }
  slug?: T
  updatedAt?: T
  createdAt?: T
  _status?: T
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "blogs_select".
 */
export interface BlogsSelect<T extends boolean = true> {
  title?: T
  platform?: T
  featuredImage?: T
  summary?: T
  externalLink?: T
  publishedDate?: T
  tags?:
    | T
    | {
        tag?: T
        id?: T
      }
  slug?: T
  updatedAt?: T
  createdAt?: T
  _status?: T
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "contact-forms_select".
 */
export interface ContactFormsSelect<T extends boolean = true> {
  name?: T
  email?: T
  phone?: T
  subject?: T
  message?: T
  status?: T
  priority?: T
  internalNotes?: T
  source?: T
  ipAddress?: T
  updatedAt?: T
  createdAt?: T
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "site-settings_select".
 */
export interface SiteSettingsSelect<T extends boolean = true> {
  title?: T
  description?: T
  favicon?: T
  ogImage?: T
  keywords?: T
  logo?:
    | T
    | {
        image?: T
        height?: T
        width?: T
      }
  menuLinks?:
    | T
    | {
        group?: T
        link?:
          | T
          | {
              type?: T
              openInNewTab?: T
              icon?: T
              label?: T
              page?: T
              url?: T
            }
        id?: T
      }
  footerLogo?:
    | T
    | {
        image?: T
        height?: T
        width?: T
      }
  footerText?: T
  footerLinks?:
    | T
    | {
        group?: T
        links?:
          | T
          | {
              label?: T
              url?: T
              id?: T
            }
        id?: T
      }
  socialLinks?:
    | T
    | {
        platform?: T
        icon?: T
        url?: T
        id?: T
      }
  redirects?:
    | T
    | {
        fromPath?: T
        toPath?: T
        isPermanent?: T
        isEnabled?: T
        id?: T
      }
  ads?:
    | T
    | {
        enabled?: T
        adsenseId?: T
        placements?:
          | T
          | {
              type?: T
              code?: T
              id?: T
            }
      }
  affiliate?:
    | T
    | {
        enabled?: T
        disclosure?: T
      }
  updatedAt?: T
  createdAt?: T
  _status?: T
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T
  globalSlug?: T
  user?: T
  updatedAt?: T
  createdAt?: T
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T
  key?: T
  value?: T
  updatedAt?: T
  createdAt?: T
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T
  batch?: T
  updatedAt?: T
  createdAt?: T
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown
}

declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}
