'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

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
}

export default function HomePage() {
  const [homeData, setHomeData] = useState<HomeData | null>(null)

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [homeResponse, settingsResponse] = await Promise.all([
          fetch('/api/pages?where[pageSettings.isHomePage][equals]=true'),
          fetch('/api/globals/site-settings'),
        ])

        const homeData = await homeResponse.json()
        const siteSettings = await settingsResponse.json()

        setHomeData({
          pageLayout: homeData.docs[0].pageLayout,
          siteSettings,
        })
      } catch (error) {
        console.error('Error fetching home data:', error)
      }
    }

    fetchHomeData()
  }, [])

  if (!homeData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
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
      },
    },
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
              <motion.div key={link.id} variants={socialItemVariants}>
                <Link
                  href={link.url}
                  target="_blank"
                  className="p-3 bg-[#1A2333] rounded-lg hover:bg-[#242E42] transition-colors transform hover:scale-110 duration-200"
                >
                  {link.icon && (
                    <Image
                      src={link.icon.url}
                      alt={link.platform}
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-4 mt-8"
            variants={menuLinksVariants}
          >
            {homeData.siteSettings.menuLinks.map((item) => (
              <motion.div key={item.id} variants={menuItemVariants}>
                <Link
                  href={item.link.page?.path || item.link.url || '#'}
                  className="px-6 py-2 bg-[#1A2333] rounded-full hover:bg-[#242E42] transition-all duration-300 flex items-center gap-2 hover:scale-105 hover:shadow-lg"
                >
                  {item.link.icon && (
                    <Image
                      src={item.link.icon.url}
                      alt={item.label}
                      width={20}
                      height={20}
                      className="w-5 h-5"
                    />
                  )}
                  <span>{item.label}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
