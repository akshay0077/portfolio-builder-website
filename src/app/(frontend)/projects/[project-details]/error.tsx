'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-[#0A0F1C] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-4">
          Something went wrong!
        </h1>
        <p className="text-gray-400 mb-8">{error.message}</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-2 bg-[#64FFDA] text-[#0A0F1C] rounded-full hover:bg-[#64FFDA]/90 transition-colors font-medium"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-2 bg-[#1A1F2E] text-white rounded-full hover:bg-[#1A1F2E]/80 transition-colors"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  )
}
