'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface SocialLinksProps {
  links: Array<{
    platform: string
    icon?: {
      url: string
    } | null
    url: string
    id?: string | null
  }>
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ links }) => {
  return (
    <div className="flex items-center gap-4">
      {links.map((link, index) => (
        <motion.a
          key={link.id || index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 transition-colors duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          {link.icon ? (
            <div className="relative w-5 h-5">
              <Image
                src={link.icon.url}
                alt={link.platform}
                fill
                className="object-contain transition-transform duration-300"
                sizes="20px"
              />
            </div>
          ) : (
            <span className="text-sm font-medium">{link.platform}</span>
          )}
        </motion.a>
      ))}
    </div>
  )
}
