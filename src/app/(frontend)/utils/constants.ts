export const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  slideInFromLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  },
}

export const TRANSITION_DEFAULTS = {
  duration: 0.3,
  ease: [0.43, 0.13, 0.23, 0.96],
}

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  PROJECTS: '/projects',
  BLOG: '/blog',
  CONTACT: '/contact',
}

export const API_ENDPOINTS = {
  SITE_SETTINGS: '/api/globals/site-settings',
  MEDIA: '/api/media',
  PROJECTS: '/api/projects',
  BLOGS: '/api/blogs',
  CONTACT: '/api/contact',
}

export const META = {
  title: 'Your Portfolio',
  description: 'Professional portfolio showcasing my work and experience',
  author: 'Your Name',
  keywords: ['portfolio', 'developer', 'projects', 'skills'],
  ogImage: '/og-image.jpg',
}
