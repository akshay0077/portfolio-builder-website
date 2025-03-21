'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { fetchPageBySlug } from '../utils/api'

interface DetailPoint {
  id: string
  detailPoint: string
}

interface DetailSection {
  id: string
  detailsTitle: string
  detailPoints: DetailPoint[]
}

interface CodeProfile {
  id: string
  title: string
  url: string
  image: {
    url: string
    alt: string
  }
}

interface AboutData {
  pageLayout: [
    {
      heading: string
      subheading: string
      profileImage: {
        url: string
        alt: string
      }
      aboutYourself: {
        root: {
          children: [
            {
              children: [
                {
                  text: string
                },
              ]
            },
          ]
        }
      }
      buttonText: string
      buttonPath: string
      details: DetailSection[]
      codeProfiles: {
        heading: string
        profiles: CodeProfile[]
      }
    },
  ]
}

export default function AboutPage() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setIsLoading(true)
        const data = await fetchPageBySlug('about')
        setAboutData(data)
        setError(null)
      } catch (error) {
        console.error('Error fetching about data:', error)
        setError('Failed to load about page data. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchAboutData()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    )
  }

  if (error || !aboutData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error || 'Failed to load about page data'}
      </div>
    )
  }

  const {
    heading,
    subheading,
    profileImage,
    aboutYourself,
    buttonText,
    buttonPath,
    details,
    codeProfiles,
  } = aboutData.pageLayout[0]

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        staggerChildren: 0.2,
      },
    },
    exit: { opacity: 0, y: -20 },
  }

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      className="min-h-screen bg-[#0F1729] text-white py-16"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <div className="container mx-auto px-4 max-w-4xl mt-18">
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <h1 className="text-4xl font-bold mb-4">{heading}</h1>
          <p className="text-blue-400">{subheading}</p>
        </motion.div>

        <motion.div
          className="flex flex-col items-center mb-12"
          variants={itemVariants}
        >
          <motion.div
            className="w-48 h-48 rounded-full overflow-hidden mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src={profileImage.url}
              alt={profileImage.alt}
              width={192}
              height={192}
              className="object-cover w-full h-full"
            />
          </motion.div>
          <motion.p className="text-center mb-6" variants={itemVariants}>
            {aboutYourself.root.children[0].children[0].text}
          </motion.p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href={`/${buttonPath}`}
              className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity"
            >
              {buttonText}
            </Link>
          </motion.div>
        </motion.div>

        <div className="space-y-8">
          {details.map((section) => (
            <motion.div
              key={section.id}
              className="bg-[#1A2333] rounded-lg p-6"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 inline-block text-transparent bg-clip-text">
                {section.detailsTitle}
              </h2>
              <ul className="space-y-3">
                {section.detailPoints.map((point) => (
                  <motion.li
                    key={point.id}
                    className="flex items-start"
                    variants={itemVariants}
                  >
                    <span className="text-blue-400 mr-2">•</span>
                    <span>{point.detailPoint}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div className="mt-12" variants={itemVariants}>
          <h2 className="text-xl font-semibold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 inline-block text-transparent bg-clip-text">
            {codeProfiles.heading}
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {codeProfiles.profiles.map((profile) => (
              <motion.div
                key={profile.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={profile.url}
                  className="bg-[#1A2333] p-4 rounded-lg hover:bg-[#242E42] transition-colors"
                >
                  <Image
                    src={profile.image.url}
                    alt={profile.title}
                    width={100}
                    height={50}
                    className="object-contain"
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
