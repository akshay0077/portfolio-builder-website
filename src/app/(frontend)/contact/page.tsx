'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fetchPageBySlug } from '../utils/api'

interface ContactReason {
  id: string
  reason: string
  description: string
}

interface ContactData {
  heading: string
  subheading: string
  email: string
  phone: string
  submitButtonText: string
  contactReasons: ContactReason[]
}

export default function Contact() {
  const [selectedReason, setSelectedReason] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [data, setData] = useState<ContactData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        // Fetch the contact page by slug instead of ID
        const pageData = await fetchPageBySlug('contact')
        setData(pageData.pageLayout[0] as ContactData)
        setError(null)
      } catch (error) {
        console.error('Error fetching contact data:', error)
        setError('Failed to load contact page data. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-red-500">
        {error || 'Failed to load contact page data'}
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log({ ...formData, reason: selectedReason })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            {data.heading}
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {data.subheading}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {data.contactReasons.map((reason: ContactReason, index: number) => (
            <motion.div
              key={reason.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                scale: 1.02,
                boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)',
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedReason(reason.reason)}
              className={`p-8 rounded-2xl cursor-pointer transition-all duration-300 backdrop-blur-sm ${
                selectedReason === reason.reason
                  ? 'bg-blue-600/80 shadow-lg shadow-blue-500/50 border-2 border-blue-400'
                  : 'bg-gray-800/50 hover:bg-gray-700/50 border-2 border-transparent hover:border-blue-500/30'
              }`}
            >
              <h3 className="text-2xl font-semibold mb-3">{reason.reason}</h3>
              <p className="text-gray-300 leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedReason && (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto space-y-8 bg-gray-800/30 p-8 rounded-2xl backdrop-blur-sm border border-gray-700/50"
              onSubmit={handleSubmit}
            >
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300"
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300"
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Message
                </label>
                <textarea
                  className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300 h-32 resize-none"
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                ></textarea>
              </div>
              <motion.button
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)',
                }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium text-lg"
              >
                {data.submitButtonText}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center space-y-4"
        >
          <p className="text-gray-400">Or reach me directly at:</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <motion.a
              whileHover={{ scale: 1.05, color: '#60A5FA' }}
              href={`mailto:${data.email}`}
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-300"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              {data.email}
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05, color: '#60A5FA' }}
              href={`tel:${data.phone}`}
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-300"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {data.phone}
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
