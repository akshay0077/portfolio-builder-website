'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface ProjectLink {
  id: string
  serviceName: string
  serviceLink: string
}

interface Feature {
  id: string
  feature: string
}

interface Technology {
  id: string
  technology: string
  technologyIcon?: {
    url: string
  } | null
}

interface Project {
  id: number
  projectType: 'major' | 'minor'
  projectName: string
  projectImage: {
    url: string
    alt: string
  }
  summary: string
  projectLinks: ProjectLink[]
  features: Feature[]
  techStack: Technology[]
  slug: string
}

interface Props {
  project: Project
  allProjects: Project[]
}

export default function ProjectDetails({ project, allProjects }: Props) {
  const router = useRouter()

  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug)
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length]
  const prevProject =
    allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
      },
    },
  }

  const borderAnimation = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          duration: 8, // Slower animation
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'loop',
          repeatDelay: 1,
        },
        opacity: {
          duration: 1,
        },
      },
    },
  }

  const navButtonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1, backgroundColor: 'rgba(26, 31, 46, 0.9)' },
    tap: { scale: 0.95 },
  }

  const handleNavigation = (projectSlug: string) => {
    router.push(`/projects/${projectSlug}`)
  }

  return (
    <div className="min-h-screen bg-[#0A0F1C] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto mt-18">
        <div className="flex justify-between items-center mb-10">
          <motion.button
            onClick={() => handleNavigation(prevProject.slug)}
            className="p-3 rounded-full bg-[#1A1F2E] text-white transition-colors transform"
            variants={navButtonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </motion.button>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-white text-center tracking-tight"
          >
            {project.projectName}
          </motion.h1>

          <motion.button
            onClick={() => handleNavigation(nextProject.slug)}
            className="p-3 rounded-full bg-[#1A1F2E] text-white transition-colors transform"
            variants={navButtonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </motion.button>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-10"
        >
          <div className="relative max-w-xl mx-auto">
            <motion.div
              variants={itemVariants}
              className="relative aspect-[16/9] rounded-lg overflow-hidden bg-[#1A1F2E] p-2"
              whileHover={{
                boxShadow: '0 0 25px rgba(100, 255, 218, 0.2)',
                transition: { duration: 0.5 },
              }}
            >
              <div className="relative w-full h-full rounded-md overflow-hidden">
                <Image
                  src={project.projectImage.url}
                  alt={project.projectName}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </div>
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.rect
                  width="176"
                  height="100"
                  x="-38"
                  y="0"
                  rx="4"
                  stroke="#64FFDA"
                  strokeWidth="1"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  initial="hidden"
                  animate="visible"
                  variants={borderAnimation}
                  className="w-44 h-full"
                />
              </svg>
            </motion.div>
          </div>

          <div className="max-w-2xl mx-auto space-y-6">
            <motion.div
              variants={itemVariants}
              className="bg-[#1A1F2E] rounded-lg p-6 shadow-lg"
              whileHover={{
                y: -5,
                transition: { duration: 0.3 },
              }}
            >
              <h2 className="inline-block text-xl font-semibold text-white mb-4 px-4 py-1.5 bg-[#64FFDA]/20 rounded-md">
                Summary
              </h2>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                {project.summary}
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-[#1A1F2E] rounded-lg p-6 shadow-lg"
              whileHover={{
                y: -5,
                transition: { duration: 0.3 },
              }}
            >
              <h2 className="inline-block text-xl font-semibold text-white mb-4 px-4 py-1.5 bg-[#64FFDA]/20 rounded-md">
                Project Links
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.projectLinks.map((link) => (
                  <motion.a
                    key={link.id}
                    href={link.serviceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-[#0A0F1C] text-[#64FFDA] rounded-md hover:bg-[#0A0F1C]/80 transition-colors text-sm"
                    whileHover={{ scale: 1.05, x: 3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {link.serviceName === 'Github' ? (
                      <svg
                        className="w-4 h-4"
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
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                        />
                      </svg>
                    )}
                    {link.serviceName}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {project.features && project.features.length > 0 && (
              <motion.div
                variants={itemVariants}
                className="bg-[#1A1F2E] rounded-lg p-6 shadow-lg"
                whileHover={{
                  y: -5,
                  transition: { duration: 0.3 },
                }}
              >
                <h2 className="inline-block text-xl font-semibold text-white mb-4 px-4 py-1.5 bg-[#64FFDA]/20 rounded-md">
                  Key Features
                </h2>
                <ul className="space-y-2 pl-4">
                  {project.features.map((feature) => (
                    <motion.li
                      key={feature.id}
                      className="text-gray-300 text-sm md:text-base flex items-start gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <span className="text-[#64FFDA] mt-1">
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
                            d="M9 12l2 2 4-4"
                          />
                        </svg>
                      </span>
                      {feature.feature}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}

            {project.techStack && project.techStack.length > 0 && (
              <motion.div
                variants={itemVariants}
                className="bg-[#1A1F2E] rounded-lg p-6 shadow-lg"
                whileHover={{
                  y: -5,
                  transition: { duration: 0.3 },
                }}
              >
                <h2 className="inline-block text-xl font-semibold text-white mb-4 px-4 py-1.5 bg-[#64FFDA]/20 rounded-md">
                  Tech Stack
                </h2>
                <div className="flex flex-wrap gap-3">
                  {project.techStack.map((tech) => (
                    <motion.div
                      key={tech.id}
                      className="flex items-center gap-2 px-3 py-1.5 bg-[#0A0F1C] text-gray-300 rounded-md text-sm"
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: 'rgba(10, 15, 28, 0.8)',
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {tech.technologyIcon && (
                        <div className="relative w-4 h-4">
                          <Image
                            src={tech.technologyIcon.url}
                            alt={tech.technology}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                      {tech.technology}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            <motion.div
              variants={itemVariants}
              className="pt-8 flex justify-center"
            >
              <Link href="/projects">
                <motion.button
                  className="px-6 py-2 bg-[#1A1F2E] text-[#64FFDA] rounded-md flex items-center gap-2 hover:bg-[#1A1F2E]/80 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                    />
                  </svg>
                  Back to Projects
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
