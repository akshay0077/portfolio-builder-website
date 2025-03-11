'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { SocialLinks } from './SocialLinks'

interface HeroProps {
  title: string
  description: string
  profileImage?: {
    url: string
    alt: string
  }
  socialLinks?: Array<{
    platform: string
    icon?: {
      url: string
    } | null
    url: string
    id?: string | null
  }>
}

export const ClientHero: React.FC<HeroProps> = ({
  title,
  description,
  profileImage,
  socialLinks,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0B0F1A] text-gray-900 dark:text-white relative overflow-hidden pt-20 transition-all duration-300">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-40 left-10 w-72 h-72 bg-purple-500/20 dark:bg-purple-500/30 rounded-full filter blur-5xl animate-pulse transition-colors duration-300" />
        <div className="absolute bottom-40 right-10 w-72 h-72 bg-pink-500/20 dark:bg-pink-500/30 rounded-full filter blur-5xl animate-pulse transition-colors duration-300" />
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-16">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 text-center md:text-left"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-600 text-transparent bg-clip-text transition-colors duration-300">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 transition-colors duration-300">
              {description}
            </p>
            {socialLinks && (
              <div className="flex justify-center md:justify-start">
                <SocialLinks links={socialLinks} />
              </div>
            )}
          </motion.div>

          {/* Profile Image */}
          {profileImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative flex-1 max-w-md"
            >
              <div className="relative w-72 h-72 mx-auto">
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-600 animate-spin-slow transition-colors duration-300" />

                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/30 to-pink-600/30 dark:from-purple-400/30 dark:to-pink-600/30 filter blur-xl animate-pulse transition-colors duration-300" />

                {/* Image Container */}
                <div className="absolute inset-[3px] rounded-full overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-300">
                  <Image
                    src={profileImage.url}
                    alt={profileImage.alt}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
