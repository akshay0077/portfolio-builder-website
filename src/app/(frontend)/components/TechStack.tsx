'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface Technology {
  id: string
  name: string
  icon: {
    url: string
    alt: string
  }
}

interface TechStackProps {
  category: string
  technologies: Technology[]
}

export const TechStack: React.FC<TechStackProps> = ({
  category,
  technologies,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative rounded-lg border border-white/10 overflow-hidden"
    >
      {/* Header with Category */}
      <div className="bg-purple-500/20 backdrop-blur-sm px-4 py-2 border-b border-white/10">
        <h3 className="text-lg font-medium text-purple-300">{category}</h3>
      </div>

      {/* Technologies Grid */}
      <div className="p-4 bg-white/5 backdrop-blur-sm">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.2 + index * 0.1,
                type: 'spring',
                stiffness: 100,
              }}
              className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-purple-500/50 transition-colors group"
            >
              <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white/10 p-2">
                {/* <Image
                  src={tech.icon.url}
                  alt={tech.icon.alt}
                  fill
                  className="object-contain p-1"
                  sizes="48px"
                /> */}
              </div>
              <span className="text-sm font-medium text-gray-300 group-hover:text-purple-300 transition-colors">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
