import React from 'react'
import { ClientHero } from './ClientHero'

interface HeroProps {
  title: string
  description: string
  profileImage?: {
    url: string
    alt: string
  }
  socialLinks: Array<{
    id: string
    platform: string
    url: string
  }>
}

export const Hero: React.FC<HeroProps> = (props) => {
  return <ClientHero {...props} />
}
