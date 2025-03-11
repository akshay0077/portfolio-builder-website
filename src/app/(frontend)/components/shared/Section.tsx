import React from 'react'
import { motion } from 'framer-motion'

interface SectionProps {
  children: React.ReactNode
  className?: string
  title?: string
  subtitle?: string
  id?: string
  fullWidth?: boolean
}

const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  title,
  subtitle,
  id,
  fullWidth = false,
}) => {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`}>
      <div
        className={`${fullWidth ? 'w-full' : 'container mx-auto px-4 md:px-6'}`}
      >
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  )
}

export default Section
