'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Image from 'next/image'

interface ProjectLink {
  id: string
  serviceName: string
  serviceLink: string
}

interface ProjectImage {
  url: string
  alt: string
}

interface Project {
  id: number
  projectType: 'major' | 'minor'
  projectName: string
  projectImage: ProjectImage
  summary: string
  projectLinks: ProjectLink[]
  slug: string
}

interface ProjectsResponse {
  docs: Project[]
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [visibleMajorProjects, setVisibleMajorProjects] = useState(4)
  const [visibleMinorProjects, setVisibleMinorProjects] = useState(4)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/projects')
        const data: ProjectsResponse = await response.json()
        setProjects(data.docs)
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const majorProjects = projects.filter(
    (project) => project.projectType === 'major'
  )
  const minorProjects = projects.filter(
    (project) => project.projectType === 'minor'
  )

  const loadMoreMajor = () => {
    setVisibleMajorProjects((prev) => Math.min(prev + 4, majorProjects.length))
  }

  const loadMoreMinor = () => {
    setVisibleMinorProjects((prev) => Math.min(prev + 4, minorProjects.length))
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
    hover: {
      y: -10,
      boxShadow: '0 10px 25px -5px rgba(0, 0, 255, 0.1)',
      transition: { duration: 0.2 },
    },
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
        ></motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-[#0A0F1C]">
      {/* Featured Projects Section */}
      <div className="max-w-7xl mx-auto mt-18">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-white mb-2 font-sans tracking-tight"
        >
          Featured Projects<span className="text-blue-500">.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-gray-400 mb-12 font-light tracking-wide"
        >
          Explore my gallery of the latest projects and practical creations
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {majorProjects.slice(0, visibleMajorProjects).map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover="hover"
              className="relative group rounded-xl overflow-hidden bg-gradient-to-br from-[#1A1F2E] to-[#2A2F3E] p-1 shadow-lg"
            >
              <div
                className="cursor-pointer"
                onClick={() =>
                  (window.location.href = `/projects/${project.slug}`)
                }
              >
                <div className="relative h-48 rounded-t-lg overflow-hidden">
                  <Image
                    src={project.projectImage.url}
                    alt={project.projectName}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-white mb-2 font-sans tracking-tight">
                    {project.projectName}
                  </h3>
                  <p className="text-gray-300 text-sm line-clamp-2 font-light leading-relaxed">
                    {project.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {project.projectLinks.map((link) => (
                      <motion.button
                        key={link.id}
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(
                            link.serviceLink,
                            '_blank',
                            'noopener,noreferrer'
                          )
                        }}
                        className="text-blue-400 hover:text-blue-300 text-xs font-medium bg-blue-900/20 px-2 py-1 rounded-full flex items-center gap-1"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {link.serviceName === 'Github' ? (
                          <svg
                            className="w-3 h-3"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-3 h-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        )}
                        {link.serviceName}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {majorProjects.length > 4 &&
          visibleMajorProjects < majorProjects.length && (
            <motion.div
              className="flex justify-center mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                onClick={loadMoreMajor}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium text-sm flex items-center gap-2 shadow-lg shadow-blue-500/20"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Load More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </motion.button>
            </motion.div>
          )}

        {/* Minor Projects Section */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-white mt-20 mb-2 font-sans tracking-tight"
        >
          Minor Projects<span className="text-blue-500">.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-gray-400 mb-12 font-light tracking-wide"
        >
          These modest accomplishments mark my beginnings
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {minorProjects.slice(0, visibleMinorProjects).map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover="hover"
              className="relative group rounded-xl overflow-hidden bg-gradient-to-br from-[#1A1F2E] to-[#2A2F3E] p-1 shadow-lg"
            >
              <div
                className="cursor-pointer"
                onClick={() =>
                  (window.location.href = `/projects/${project.slug}`)
                }
              >
                <div className="relative h-40 rounded-t-lg overflow-hidden">
                  <Image
                    src={project.projectImage.url}
                    alt={project.projectName}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-white mb-2 font-sans tracking-tight">
                    {project.projectName}
                  </h3>
                  <p className="text-gray-300 text-sm line-clamp-2 font-light leading-relaxed">
                    {project.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {project.projectLinks.map((link) => (
                      <motion.button
                        key={link.id}
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(
                            link.serviceLink,
                            '_blank',
                            'noopener,noreferrer'
                          )
                        }}
                        className="text-blue-400 hover:text-blue-300 text-xs font-medium bg-blue-900/20 px-2 py-1 rounded-full flex items-center gap-1"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {link.serviceName === 'Github' ? (
                          <svg
                            className="w-3 h-3"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-3 h-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        )}
                        {link.serviceName}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {minorProjects.length > 4 &&
          visibleMinorProjects < minorProjects.length && (
            <motion.div
              className="flex justify-center mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                onClick={loadMoreMinor}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium text-sm flex items-center gap-2 shadow-lg shadow-blue-500/20"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Load More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </motion.button>
            </motion.div>
          )}
      </div>
    </div>
  )
}
