'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface Technology {
  id: string
  name: string
  icon: {
    url: string
    alt: string
  }
}

interface TechStack {
  id: string
  category: string
  technologies: Technology[]
}

interface StacksData {
  pageLayout: [
    {
      heading: string
      subheading: string
      techStacks: TechStack[]
    },
  ]
}

export default function StacksPage() {
  const [stacksData, setStacksData] = useState<StacksData | null>(null)

  useEffect(() => {
    const fetchStacksData = async () => {
      try {
        const response = await fetch('/api/pages/4')
        const data = await response.json()
        setStacksData(data)
      } catch (error) {
        console.error('Error fetching stacks data:', error)
      }
    }

    fetchStacksData()
  }, [])

  if (!stacksData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    )
  }

  const stacksBlock = stacksData.pageLayout[0]

  return (
    <div className="min-h-screen bg-[#0F1729] text-white py-16">
      <div className="container mx-auto px-4 max-w-4xl mt-18">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{stacksBlock.heading}</h1>
          <p className="text-blue-400">{stacksBlock.subheading}</p>
        </div>

        <div className="space-y-8">
          {stacksBlock.techStacks.map((stack) => (
            <div key={stack.id} className="bg-[#1A2333] rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 inline-block text-transparent bg-clip-text">
                {stack.category}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {stack.technologies.map((tech) => (
                  <div
                    key={tech.id}
                    className="flex flex-col items-center space-y-2 p-4 bg-[#242E42] rounded-lg hover:bg-[#2A3754] transition-colors"
                  >
                    <div className="w-12 h-12 relative">
                      <Image
                        src={tech.icon.url}
                        alt={tech.icon.alt}
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                    <span className="text-sm text-center">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
