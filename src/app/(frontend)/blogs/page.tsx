'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { fetchBlogs } from '../utils/api'

interface BlogTag {
  id: string
  tag: string
}

interface Blog {
  id: number
  title: string
  platform: string
  featuredImage: {
    id: number
    url: string
    alt: string
  }
  summary: string
  externalLink: string
  publishedDate: string
  tags: BlogTag[]
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setIsLoading(true)
        const blogsData = await fetchBlogs()
        setBlogs(blogsData)
        setError(null)
      } catch (error) {
        console.error('Error loading blogs:', error)
        setError('Failed to load blog posts. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    loadBlogs()
  }, [])

  // Format date to a readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F1729]">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F1729] text-red-500">
        {error}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0F1729] text-white py-16">
      <div className="container mx-auto px-4 max-w-5xl mt-18">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">My Blog Posts</h1>
          <p className="text-blue-400">
            Thoughts, tutorials, and insights I&apos;ve shared across the web
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8">
          {blogs.map((blog) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-[#1A2333] rounded-lg overflow-hidden shadow-lg"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    {blog.featuredImage && (
                      <div className="w-12 h-12 mr-4">
                        <Image
                          src={blog.featuredImage.url}
                          alt={blog.featuredImage.alt || blog.title}
                          width={48}
                          height={48}
                          className="object-contain"
                        />
                      </div>
                    )}
                    <div>
                      <span className="text-sm text-blue-400">
                        {blog.platform}
                      </span>
                      <p className="text-xs text-gray-400">
                        {formatDate(blog.publishedDate)}
                      </p>
                    </div>
                  </div>
                </div>

                <h2 className="text-xl font-semibold mb-3">{blog.title}</h2>
                <p className="text-gray-300 mb-4">{blog.summary}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="bg-blue-900/30 text-blue-300 text-xs px-3 py-1 rounded-full"
                    >
                      {tag.tag}
                    </span>
                  ))}
                </div>

                <div className="mt-4">
                  <Link
                    href={blog.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
                  >
                    Read Article
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {blogs.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-400">No blog posts found.</p>
          </div>
        )}
      </div>
    </div>
  )
}
