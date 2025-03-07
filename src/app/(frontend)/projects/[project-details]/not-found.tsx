import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0F1C] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-4">
          Project not found
        </h1>
        <p className="text-gray-400 mb-8">
          The project you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Link
          href="/"
          className="px-6 py-2 bg-[#1A1F2E] text-white rounded-full hover:bg-[#1A1F2E]/80 transition-colors inline-block"
        >
          Go back home
        </Link>
      </div>
    </div>
  )
}
