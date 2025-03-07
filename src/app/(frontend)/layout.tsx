import React from 'react'
import '../globals.css'
import { Navigation } from './components/Navigation'
import { ThemeProvider } from './context/ThemeContext'

async function getSiteSettings() {
  const res = await fetch('http://localhost:3000/api/globals/site-settings')
  if (!res.ok) {
    throw new Error('Failed to fetch site settings')
  }
  return res.json()
}

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const siteSettings = await getSiteSettings()

  // Transform menu links to handle Media type
  const transformedMenuLinks =
    siteSettings?.menuLinks?.map((item: any) => ({
      ...item,
      link: {
        ...item.link,
        icon:
          item.link.icon && typeof item.link.icon !== 'number'
            ? { url: `http://localhost:3000/api/media/${item.link.icon.id}` }
            : null,
        page:
          typeof item.link.page === 'object'
            ? { path: `/${item.link.page?.slug || ''}` }
            : null,
      },
    })) || []

  // Transform social links to handle Media type
  const transformedSocialLinks =
    siteSettings?.socialLinks?.map((item: any) => ({
      ...item,
      icon:
        item.icon && typeof item.icon !== 'number'
          ? { url: `http://localhost:3000/api/media/${item.icon.id}` }
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
