'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { fetchHomePage, fetchSiteSettings, fetchBlogs } from './utils/api'

interface SocialLink {
  platform: string
  url: string
  id: string
  icon?: {
    url: string
  }
}

interface MenuLink {
  id: string
  label: string
  link: {
    icon?: {
      url: string
    } | null
    page?: {
      path: string
    } | null
    url?: string
  }
}

interface BlogTag {
  id: string
  tag: string
}

interface Blog {
  id: number
  title: string
  platform: string
  featuredImage: {
    id: number
    url: string
    alt: string
  }
  summary: string
  externalLink: string
  publishedDate: string
  tags: BlogTag[]
}

interface HomeData {
  pageLayout: [
    {
      greetText: string
      name: string
      description: {
        root: {
          children: Array<{
            children: Array<{
              text: string
            }>
          }>
        }
      }
      profileImage: {
        url: string
        filename: string
      }
      socialLinks: SocialLink[]
    },
  ]
  siteSettings: {
    menuLinks: MenuLink[]
    socialLinks: SocialLink[]
  }
  blogs?: Blog[]
}

export default function HomePage() {
  const [homeData, setHomeData] = useState<HomeData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setIsLoading(true)
        const [homePage, siteSettings, blogs] = await Promise.all([
          fetchHomePage(),
          fetchSiteSettings(),
          fetchBlogs(),
        ])

        setHomeData({
          pageLayout: homePage.pageLayout,
          siteSettings,
          blogs: blogs.slice(0, 3),
        })
        setError(null)
      } catch (error) {
        console.error('Error fetching home data:', error)
        setError('Failed to load home page data. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchHomeData()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    )
  }

  if (error || !homeData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error ?? 'Failed to load home page data'}
      </div>
    )
  }

  const homeBlock = homeData.pageLayout[0]
  const descriptionText = homeBlock.description?.root.children.reduce(
    (text, child) => {
      return (
        text +
        child.children.reduce((innerText, innerChild) => {
          return innerText + (innerChild.text || '')
        }, '')
      )
    },
    ''
  )

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  const profileImageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  }

  const socialLinksVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.8,
      },
    },
  }

  const socialItemVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
        duration: 0.5,
      },
    },
    hover: {
      scale: 1.15,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.9 },
  }

  const menuLinksVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 1,
      },
    },
  }

  const menuItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // Function to render social icon based on platform name
  const renderSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-[#1877F2]"
          >
            <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z" />
          </svg>
        )
      case 'github':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-white"
          >
            <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
          </svg>
        )
      case 'linkedin':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-[#0A66C2]"
          >
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
          </svg>
        )
      case 'twitter':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-[#1DA1F2]"
          >
            <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
          </svg>
        )
      case 'instagram':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-[#E4405F]"
          >
            <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
          </svg>
        )
      case 'youtube':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-[#FF0000]"
          >
            <path d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z" />
          </svg>
        )
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-gray-400"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
        )
    }
  }

  return (
    <div className="min-h-screen bg-[#0F1729] text-white overflow-hidden">
      <motion.div
        className="container mx-auto px-4 max-w-4xl min-h-screen flex flex-col items-center justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center space-y-8">
          <motion.div
            className="w-48 h-48 rounded-full overflow-hidden mx-auto mb-8 relative"
            variants={profileImageVariants}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 animate-spin-slow rounded-full" />
            <div className="absolute inset-[3px] bg-[#0F1729] rounded-full" />
            <div className="absolute inset-[6px] rounded-full overflow-hidden">
              <Image
                src={homeBlock.profileImage.url}
                alt={homeBlock.profileImage.filename}
                width={192}
                height={192}
                className="object-cover w-full h-full"
              />
            </div>
          </motion.div>

          <motion.div className="space-y-4" variants={itemVariants}>
            <motion.h1
              className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 inline-block text-transparent bg-clip-text"
              variants={itemVariants}
            >
              {homeBlock.greetText} {homeBlock.name}
            </motion.h1>
            <motion.p
              className="text-xl text-gray-400 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              {descriptionText}
            </motion.p>
          </motion.div>

          <motion.div
            className="flex justify-center gap-4 mt-8"
            variants={socialLinksVariants}
          >
            {homeBlock.socialLinks.map((link) => (
              <motion.div
                key={link.id}
                variants={socialItemVariants}
                whileHover="hover"
                whileTap="tap"
                className="relative"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-75"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                />
                <Link
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex items-center justify-center p-3 bg-[#1A2333] rounded-full hover:bg-[#242E42] transition-colors z-10"
                >
                  {link.icon ? (
                    <Image
                      src={link.icon.url}
                      alt={link.platform}
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  ) : (
                    renderSocialIcon(link.platform)
                  )}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {homeData.blogs && homeData.blogs.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="container mx-auto px-4 max-w-4xl py-20"
        >
          <div className="text-center mb-12">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 inline-block text-transparent bg-clip-text"
            >
              Latest Blog Posts
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gray-400"
            >
              Check out my recent articles and tutorials
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {homeData.blogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="bg-[#1A2333] rounded-lg overflow-hidden shadow-lg h-full flex flex-col"
              >
                <div className="p-5 flex-grow">
                  <div className="flex items-center mb-3">
                    {blog.featuredImage && (
                      <div className="w-8 h-8 mr-3">
                        <Image
                          src={blog.featuredImage.url}
                          alt={blog.featuredImage.alt || blog.title}
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      </div>
                    )}
                    <div>
                      <span className="text-xs text-blue-400">
                        {blog.platform}
                      </span>
                      <p className="text-xs text-gray-500">
                        {formatDate(blog.publishedDate)}
                      </p>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-3 line-clamp-3">
                    {blog.summary}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {blog.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag.id}
                        className="bg-blue-900/30 text-blue-300 text-xs px-2 py-0.5 rounded-full"
                      >
                        {tag.tag}
                      </span>
                    ))}
                    {blog.tags.length > 2 && (
                      <span className="text-xs text-gray-500">
                        +{blog.tags.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    href={blog.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center"
                  >
                    Read Article
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/blogs"
              className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-md hover:opacity-90 transition-opacity"
            >
              View All Blog Posts
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  )
}
