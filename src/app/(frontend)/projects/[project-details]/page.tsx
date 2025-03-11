import { notFound } from 'next/navigation'
import ProjectDetails from './ProjectDetails'
import { Metadata } from 'next'

async function getProjects() {
  try {
    const res = await fetch('http://localhost:3000/api/projects', {
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      throw new Error('Failed to fetch projects')
    }

    const data = await res.json()
    // Check if the response has a docs property (Payload CMS format)
    return Array.isArray(data) ? data : data.docs || []
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: { 'project-details': string }
}): Promise<Metadata> {
  return {
    title: `Project - ${params['project-details']}`,
  }
}

export default async function Page({
  params,
}: {
  params: { 'project-details': string }
}) {
  const projects = await getProjects()

  if (!Array.isArray(projects) || projects.length === 0) {
    console.error('No projects found or invalid projects data')
    notFound()
  }

  const currentProject = projects.find(
    (project) =>
      project.slug.toLowerCase() === params['project-details'].toLowerCase()
  )

  if (!currentProject) {
    notFound()
  }

  return <ProjectDetails project={currentProject} allProjects={projects} />
}
