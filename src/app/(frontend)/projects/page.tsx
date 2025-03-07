'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
    hover: {
      y: -10,
      transition: { duration: 0.2 },
    },
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
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
          className="text-4xl font-bold text-white mb-2"
        >
          Featured Projects<span className="text-blue-500">.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-gray-400 mb-12"
        >
          Explore my gallery of the latest projects and practical creations
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {majorProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover="hover"
              className="relative group rounded-xl overflow-hidden bg-gradient-to-br from-[#1A1F2E] to-[#2A2F3E] p-1"
            >
              <Link href={`/projects/${project.slug}`}>
                <div className="relative h-64 rounded-t-lg overflow-hidden">
                  <Image
                    src={project.projectImage.url}
                    alt={project.projectName}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {project.projectName}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2">
                    {project.summary}
                  </p>
                  <div className="mt-4 flex gap-4">
                    {project.projectLinks.map((link) => (
                      <a
                        key={link.id}
                        href={link.serviceLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        {link.serviceName}
                      </a>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Minor Projects Section */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white mt-20 mb-2"
        >
          Minor Projects<span className="text-blue-500">.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-gray-400 mb-12"
        >
          These modest accomplishments mark my beginnings
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {minorProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover="hover"
              className="relative group rounded-xl overflow-hidden bg-gradient-to-br from-[#1A1F2E] to-[#2A2F3E] p-1"
            >
              <Link href={`/projects/${project.slug}`}>
                <div className="relative h-48 rounded-t-lg overflow-hidden">
                  <Image
                    src={project.projectImage.url}
                    alt={project.projectName}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {project.projectName}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2">
                    {project.summary}
                  </p>
                  <div className="mt-4 flex gap-4">
                    {project.projectLinks.map((link) => (
                      <a
                        key={link.id}
                        href={link.serviceLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        {link.serviceName}
                      </a>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
