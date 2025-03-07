'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface AchievementsProps {
  heading: string
  subheading: string
  achievements: Array<{
    id: string
    description: string
  }>
}

export const Achievements: React.FC<AchievementsProps> = ({
  heading,
  subheading,
  achievements,
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

        {/* Achievements List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative rounded-lg border border-white/10 overflow-hidden">
            <div className="bg-purple-500/20 backdrop-blur-sm px-4 py-2 border-b border-white/10">
              <h3 className="text-lg font-medium text-purple-300">
                Achievements
              </h3>
            </div>
            <div className="p-4 space-y-3 bg-white/5 backdrop-blur-sm">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
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
                    {achievement.description}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
