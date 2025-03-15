import React from 'react'
import '../globals.css'
import { Navigation } from './components/Navigation'
import { ThemeProvider } from './context/ThemeContext'

interface MenuLink {
  link: {
    icon?: {
      id: string
    } | null
    page?: {
      slug?: string
    } | null
  }
}

interface SocialLink {
  icon?: {
    id: string
  } | null
}

async function getSiteSettings() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/globals/site-settings`
  )
  if (!res.ok) {
    throw new Error('Failed to fetch site settings')
  }
  return res.json()
}

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Portfolio Website Builder',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const siteSettings = await getSiteSettings()

  // Transform menu links to handle Media type
  const transformedMenuLinks =
    siteSettings?.menuLinks?.map((item: MenuLink) => ({
      ...item,
      link: {
        ...item.link,
        icon:
          item.link.icon && typeof item.link.icon !== 'number'
            ? {
                url: `${process.env.NEXT_PUBLIC_API_URL}/api/media/${item.link.icon.id}`,
              }
            : null,
        page:
          typeof item.link.page === 'object'
            ? { path: `/${item.link.page?.slug ?? ''}` }
            : null,
      },
    })) || []

  // Transform social links to handle Media type
  const transformedSocialLinks =
    siteSettings?.socialLinks?.map((item: SocialLink) => ({
      ...item,
      icon:
        item.icon && typeof item.icon !== 'number'
          ? {
              url: `${process.env.NEXT_PUBLIC_API_URL}/api/media/${item.icon.id}`,
            }
          : null,
    })) || []

  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Navigation
            menuLinks={transformedMenuLinks}
            socialLinks={transformedSocialLinks}
          />
          <div className="min-h-screen bg-gray-50 dark:bg-[#0B0F1A] transition-colors duration-300">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
