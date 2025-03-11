import React from 'react'
import { motion } from 'framer-motion'

interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'hover' | 'interactive'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
}) => {
  const baseStyles = 'rounded-lg bg-white dark:bg-gray-800 shadow-sm'

  const variants = {
    default: '',
    hover: 'hover:shadow-md transition-shadow duration-200',
    interactive:
      'hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer',
  }

  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-8',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={`${baseStyles} ${variants[variant]} ${paddings[padding]} ${className}`}
    >
      {children}
    </motion.div>
  )
}

export default Card
