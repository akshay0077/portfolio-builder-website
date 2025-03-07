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
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
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
          duration: 4,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'loop',
          repeatDelay: 0.5,
        },
        opacity: {
          duration: 0.5,
        },
      },
    },
  }

  const handleNavigation = (projectSlug: string) => {
    router.push(`/projects/${projectSlug}`)
  }

  return (
    <div className="min-h-screen bg-[#0A0F1C] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto mt-18">
        <div className="flex justify-between items-center mb-12">
          <button
            onClick={() => handleNavigation(prevProject.slug)}
            className="p-4 rounded-full bg-[#1A1F2E] text-white hover:bg-[#1A1F2E]/80 transition-colors hover:scale-110 active:scale-95 transform duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-white text-center"
          >
            {project.projectName}
          </motion.h1>

          <button
            onClick={() => handleNavigation(nextProject.slug)}
            className="p-4 rounded-full bg-[#1A1F2E] text-white hover:bg-[#1A1F2E]/80 transition-colors hover:scale-110 active:scale-95 transform duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          <div className="relative max-w-2xl mx-auto">
            <motion.div
              variants={itemVariants}
              className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#1A1F2E] p-1"
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden">
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
                  width="98"
                  height="98"
                  x="1"
                  y="1"
                  rx="8"
                  stroke="#64FFDA"
                  strokeWidth="0.5"
                  strokeLinecap="round"
                  initial="hidden"
                  animate="visible"
                  variants={borderAnimation}
                  className="w-full h-full"
                />
              </svg>
            </motion.div>
          </div>

          <div className="max-w-2xl mx-auto space-y-8">
            <motion.div
              variants={itemVariants}
              className="bg-[#1A1F2E] rounded-2xl p-8"
            >
              <h2 className="inline-block text-2xl font-semibold text-white mb-6 px-6 py-2 bg-[#64FFDA]/20 rounded-full">
                Summary
              </h2>
              <p className="text-gray-300 leading-relaxed">{project.summary}</p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-[#1A1F2E] rounded-2xl p-8"
            >
              <h2 className="inline-block text-2xl font-semibold text-white mb-6 px-6 py-2 bg-[#64FFDA]/20 rounded-full">
                Project Links
              </h2>
              <div className="flex flex-wrap gap-4">
                {project.projectLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.serviceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-[#0A0F1C] text-[#64FFDA] rounded-full hover:bg-[#0A0F1C]/80 transition-colors"
                  >
                    {link.serviceName === 'Github' ? (
                      <svg
                        className="w-5 h-5"
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
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                        />
                      </svg>
                    )}
                    <span>{link.serviceName}</span>
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-[#1A1F2E] rounded-2xl p-8"
            >
              <h2 className="inline-block text-2xl font-semibold text-white mb-6 px-6 py-2 bg-[#64FFDA]/20 rounded-full">
                Features
              </h2>
              <ul className="grid grid-cols-1 gap-4">
                {project.features.map((feature) => (
                  <motion.li
                    key={feature.id}
                    variants={itemVariants}
                    className="flex items-start gap-3 bg-[#0A0F1C] rounded-xl p-4"
                  >
                    <svg
                      className="w-6 h-6 text-[#64FFDA] mt-0.5 flex-shrink-0"
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
                    <span className="text-gray-300">{feature.feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-[#1A1F2E] rounded-2xl p-8"
            >
              <h2 className="inline-block text-2xl font-semibold text-white mb-6 px-6 py-2 bg-[#64FFDA]/20 rounded-full">
                Tech Stack
              </h2>
              <div className="flex flex-wrap gap-4">
                {project.techStack.map((tech) => (
                  <motion.div
                    key={tech.id}
                    variants={itemVariants}
                    className="flex items-center gap-2 px-6 py-3 bg-[#0A0F1C] text-[#64FFDA] rounded-full"
                  >
                    {tech.technologyIcon && (
                      <Image
                        src={tech.technologyIcon.url}
                        alt={tech.technology}
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                    )}
                    <span>{tech.technology}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
