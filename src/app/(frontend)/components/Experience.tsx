'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { format } from 'date-fns'

interface ExperienceProps {
  experience: {
    title: string
    company: string
    companyLink: string
    companyLogo?: {
      url: string
      alt: string
    }
    location: string
    startDate: string
    endDate?: string | null
    current: boolean
    workDetails: Array<{
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
    }>
    skills: Array<{
      id: string
      skill: string
    }>
  }
}

export const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  const formatDate = (date: string) => {
    return format(new Date(date), 'MMM yyyy')
  }

  // Extract text from rich text description
  const getDescriptionText = (description: any) => {
    return description.root.children[0].children[0].text
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative rounded-lg border border-white/10 overflow-hidden"
    >
      {/* Header with Title */}
      <div className="bg-purple-500/20 backdrop-blur-sm px-4 py-2 border-b border-white/10">
        <h3 className="text-lg font-medium text-purple-300">
          {experience.title}
        </h3>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4 bg-white/5 backdrop-blur-sm">
        {/* Company Info */}
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <circle cx="10" cy="10" r="3" />
            </svg>
            <span>{experience.location}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <circle cx="10" cy="10" r="3" />
            </svg>
            <span>
              {formatDate(experience.startDate)} -{' '}
              {experience.current
                ? 'Present'
                : experience.endDate && formatDate(experience.endDate)}
            </span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <circle cx="10" cy="10" r="3" />
            </svg>
            <a
              href={experience.companyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              {experience.company}
            </a>
          </div>
        </div>

        {/* Work Details */}
        <div className="space-y-3">
          {experience.workDetails.map((detail, index) => (
            <motion.div
              key={detail.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="flex items-start gap-2"
            >
              <span className="mt-1.5 flex-shrink-0">
                <svg
                  className="w-2 h-2 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 8 8"
                >
                  <circle cx="4" cy="4" r="3" />
                </svg>
              </span>
              <span className="text-gray-300 text-sm">
                {getDescriptionText(detail.description)}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 pt-2">
          {experience.skills.map((skill, index) => (
            <motion.span
              key={skill.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="px-3 py-1 text-xs font-medium rounded-full bg-purple-400/10 text-purple-300 border border-purple-400/20"
            >
              {skill.skill}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
