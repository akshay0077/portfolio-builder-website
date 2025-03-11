'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { fetchPageBySlug } from '../utils/api'

interface WorkDetail {
  id: string
  description: {
    root: {
      children: Array<{
        children: Array<{
          text: string
        }>
      }>
    }
  }
}

interface Achievement {
  id: string
  description: string
}

interface Skill {
  id: string
  skill: string
}

interface Experience {
  id: string
  title: string
  company: string
  companyLink: string
  companyLogo?: {
    url: string
    alt: string
  }
  location: string
  startDate: string
  endDate: string | null
  current: boolean
  workDetails: WorkDetail[]
  skills: Skill[]
  achievementsHeading?: string
  achievements: Achievement[]
}

interface ExperiencesData {
  pageLayout: [
    {
      heading: string
      subheading: string
      experiences: Experience[]
    },
  ]
}

export default function ExperiencesPage() {
  const [experiencesData, setExperiencesData] =
    useState<ExperiencesData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchExperiencesData = async () => {
      try {
        setIsLoading(true)
        const data = await fetchPageBySlug('experiences')
        setExperiencesData(data)
        setError(null)
      } catch (error) {
        console.error('Error fetching experiences data:', error)
        setError('Failed to load experiences. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchExperiencesData()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    )
  }

  if (error || !experiencesData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error || 'Failed to load experiences data'}
      </div>
    )
  }

  const experiencesBlock = experiencesData.pageLayout[0]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
      },
    },
  }

  const getTextFromRichText = (richText: WorkDetail['description']) => {
    return richText.root.children[0].children[0].text
  }

  return (
    <div className="min-h-screen bg-[#0F1729] text-white py-16">
      <motion.div
        className="container mx-auto mt-18 px-4 max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h1 className="text-4xl font-bold mb-4">
            {experiencesBlock.heading}
          </h1>
          <p className="text-blue-400">{experiencesBlock.subheading}</p>
        </motion.div>

        <div className="space-y-8">
          {experiencesBlock.experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              className="bg-[#1A2333] rounded-lg p-6 hover:shadow-lg transition-all duration-300"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start gap-4 mb-4">
                {experience.companyLogo && (
                  <div className="w-12 h-12 flex-shrink-0">
                    <Image
                      src={experience.companyLogo.url}
                      alt={experience.companyLogo.alt}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 inline-block text-transparent bg-clip-text">
                    {experience.title}
                  </h2>
                  <div className="mt-1">
                    <Link
                      href={experience.companyLink}
                      target="_blank"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      {experience.company}
                    </Link>
                    <span className="text-gray-400 mx-2">•</span>
                    <span className="text-gray-400">{experience.location}</span>
                  </div>
                  <div className="text-sm text-gray-400 mt-1">
                    {new Date(experience.startDate).toLocaleDateString(
                      'en-US',
                      {
                        month: 'long',
                        year: 'numeric',
                      }
                    )}{' '}
                    -{' '}
                    {experience.current
                      ? 'Present'
                      : experience.endDate
                        ? new Date(experience.endDate).toLocaleDateString(
                            'en-US',
                            {
                              month: 'long',
                              year: 'numeric',
                            }
                          )
                        : ''}
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {experience.workDetails.map((detail) => (
                  <div key={detail.id} className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>{getTextFromRichText(detail.description)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {experience.skills.map((skillItem) => (
                  <span
                    key={skillItem.id}
                    className="px-3 py-1 bg-[#242E42] rounded-full text-sm text-blue-400"
                  >
                    {skillItem.skill}
                  </span>
                ))}
              </div>

              {Array.isArray(experience.achievements) &&
                experience.achievements.length > 0 && (
                  <div className="mt-6 border-t border-[#242E42] pt-4">
                    <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 inline-block text-transparent bg-clip-text">
                      {experience.achievementsHeading || 'Notable Achievements'}
                    </h3>
                    <div className="space-y-4">
                      {experience.achievements.map((achievement) => (
                        <div
                          key={achievement.id}
                          className="bg-[#242E42] rounded-lg p-4 hover:bg-[#2A3754] transition-colors"
                        >
                          <p className="text-gray-400 text-sm">
                            {achievement.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
