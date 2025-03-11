'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

interface NavigationProps {
  menuLinks: Array<{
    group?: boolean | null
    link: {
      type?: 'internal' | 'custom' | null
      openInNewTab?: boolean | null
      icon?: {
        url: string
      } | null
      label: string
      page?: {
        path: string
      } | null
      url?: string | null
    }
    id?: string | null
  }>
  socialLinks?: Array<{
    platform: string
    icon?: {
      url: string
    } | null
    url: string
    id?: string | null
  }>
}

export const Navigation: React.FC<NavigationProps> = ({ menuLinks }) => {
  const { theme, toggleTheme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()

  // Check if blogs link already exists in menuLinks
  const hasBlogs = menuLinks.some(
    (item) =>
      (item.link.type === 'internal' && item.link.page?.path === '/blogs') ||
      item.link.label.toLowerCase() === 'blogs' ||
      item.link.label.toLowerCase() === 'blog'
  )

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <motion.nav
        className="bg-[#1a1f2e]/90 backdrop-blur-lg rounded-full border border-gray-800 px-3"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center h-14">
          {/* Left Icon */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/')}
            className="w-10 h-10 rounded-full cursor-pointer bg-purple-500/20 flex items-center justify-center text-purple-400 mr-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M17.004 10.407c.138.435-.216.842-.672.842h-3.465a.75.75 0 01-.65-.375l-1.732-3c-.229-.396-.053-.907.393-1.004a5.252 5.252 0 016.126 3.537zM8.12 8.464c.307-.338.838-.235 1.066.16l1.732 3a.75.75 0 010 .75l-1.732 3c-.229.396-.76.498-1.067.16A5.231 5.231 0 016.75 12c0-1.362.519-2.603 1.37-3.536zM10.878 17.13c-.447-.097-.623-.608-.394-1.003l1.733-3.003a.75.75 0 01.65-.375h3.465c.457 0 .81.408.672.843a5.252 5.252 0 01-6.126 3.538z" />
            </svg>
          </motion.button>

          {/* Menu Links */}
          <div className="flex items-center gap-8">
            {menuLinks.map((item) => {
              const linkUrl =
                item.link.type === 'internal' && item.link.page
                  ? item.link.page.path
                  : (item.link.url ?? '#')

              return (
                <motion.div
                  key={item.id ?? item.link.label}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <Link
                    href={linkUrl}
                    target={item.link.openInNewTab ? '_blank' : undefined}
                    rel={
                      item.link.openInNewTab ? 'noopener noreferrer' : undefined
                    }
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm font-medium"
                  >
                    {item.link.label}
                  </Link>
                </motion.div>
              )
            })}

            {/* Add Blogs link if it doesn't exist in menuLinks */}
            {!hasBlogs && (
              <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                <Link
                  href="/blogs"
                  className={`text-gray-400 hover:text-white transition-colors duration-300 text-sm font-medium ${
                    pathname === '/blogs' ? 'text-white' : ''
                  }`}
                >
                  Blogs
                </Link>
              </motion.div>
            )}
          </div>

          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors duration-300 ml-6"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {theme === 'dark' ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>
            )}
          </motion.button>
        </div>
      </motion.nav>
    </div>
  )
}
