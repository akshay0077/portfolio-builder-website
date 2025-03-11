'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { fetchPageBySlug } from '../utils/api'

interface Technology {
  id: string
  name: string
  icon: {
    url: string
    alt: string
  }
}

interface TechStack {
  id: string
  category: string
  technologies: Technology[]
}

interface StacksData {
  pageLayout: [
    {
      heading: string
      subheading: string
      techStacks: TechStack[]
    },
  ]
}

export default function StacksPage() {
  const [stacksData, setStacksData] = useState<StacksData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStacksData = async () => {
      try {
        setIsLoading(true)
        // Fetch the stacks page by slug instead of ID
        const data = await fetchPageBySlug('stacks')
        setStacksData(data)
        setError(null)
      } catch (error) {
        console.error('Error fetching stacks data:', error)
        setError('Failed to load stacks data. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchStacksData()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    )
  }

  if (error || !stacksData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error || 'Failed to load stacks data'}
      </div>
    )
  }

  const stacksBlock = stacksData.pageLayout[0]

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

  const stackVariants = {
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
        <motion.div className="text-center mb-12" variants={stackVariants}>
          <h1 className="text-4xl font-bold mb-4">{stacksBlock.heading}</h1>
          <p className="text-blue-400">{stacksBlock.subheading}</p>
        </motion.div>

        <div className="space-y-8">
          {stacksBlock.techStacks.map((stack) => (
            <motion.div
              key={stack.id}
              className="bg-[#1A2333] rounded-lg p-6"
              variants={stackVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <h2 className="text-xl font-semibold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 inline-block text-transparent bg-clip-text">
                {stack.category}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {stack.technologies.map((tech) => (
                  <motion.div
                    key={tech.id}
                    className="flex flex-col items-center space-y-2 p-4 bg-[#242E42] rounded-lg hover:bg-[#2A3754] transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-12 h-12 relative">
                      <Image
                        src={tech.icon.url}
                        alt={tech.icon.alt}
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                    <span className="text-sm text-center">{tech.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
