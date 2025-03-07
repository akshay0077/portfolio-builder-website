'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Experience } from './Experience'

interface ExperiencesProps {
  heading: string
  subheading: string
  experiences: Array<{
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
  }>
}

export const Experiences: React.FC<ExperiencesProps> = ({
  heading,
  subheading,
  experiences,
}) => {
  return (
    <section className="py-20 bg-[#0B0F1A] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-40 left-10 w-96 h-96 bg-blue-500/5 rounded-full filter blur-5xl animate-pulse" />
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-purple-500/5 rounded-full filter blur-5xl animate-pulse" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold mb-4 text-white"
          >
            {heading}
            <span className="text-blue-400">.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-blue-400 text-lg"
          >
            {subheading}
          </motion.p>
        </motion.div>

        {/* Experiences List */}
        <div className="max-w-4xl mx-auto space-y-6">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            >
              <Experience experience={experience} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
