/**
 * API utility functions for fetching data from the Payload CMS API
 */

/**
 * Fetches a page by its slug
 * @param slug The slug of the page to fetch
 * @returns The page data
 */
export async function fetchPageBySlug(slug: string) {
  try {
    const response = await fetch(`/api/pages?where[slug][equals]=${slug}`)
    const data = await response.json()

    if (data.docs && data.docs.length > 0) {
      return data.docs[0]
    }

    throw new Error(`Page with slug "${slug}" not found`)
  } catch (error) {
    console.error(`Error fetching page with slug "${slug}":`, error)
    throw error
  }
}

/**
 * Fetches a page by its path
 * @param path The path of the page to fetch
 * @returns The page data
 */
export async function fetchPageByPath(path: string) {
  try {
    // Remove leading slash if present
    const normalizedPath = path.startsWith('/') ? path.substring(1) : path

    const response = await fetch(
      `/api/pages?where[path][equals]=${encodeURIComponent('/' + normalizedPath)}`
    )
    const data = await response.json()

    if (data.docs && data.docs.length > 0) {
      return data.docs[0]
    }

    throw new Error(`Page with path "${path}" not found`)
  } catch (error) {
    console.error(`Error fetching page with path "${path}":`, error)
    throw error
  }
}

/**
 * Fetches the home page
 * @returns The home page data
 */
export async function fetchHomePage() {
  try {
    const response = await fetch(
      '/api/pages?where[pageSettings.isHomePage][equals]=true'
    )
    const data = await response.json()

    if (data.docs && data.docs.length > 0) {
      return data.docs[0]
    }

    throw new Error('Home page not found')
  } catch (error) {
    console.error('Error fetching home page:', error)
    throw error
  }
}

/**
 * Fetches site settings
 * @returns The site settings data
 */
export async function fetchSiteSettings() {
  try {
    const response = await fetch('/api/globals/site-settings')
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching site settings:', error)
    throw error
  }
}

/**
 * Fetches all blogs
 * @returns Array of blog posts with processed image URLs
 */
export async function fetchBlogs() {
  try {
    const response = await fetch('/api/blogs')
    const data = await response.json()

    if (data.docs) {
      // Process the blogs data to ensure image URLs are correct
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const processedBlogs = data.docs.map((blog: any) => ({
        ...blog,
        featuredImage: blog.featuredImage
          ? {
              ...blog.featuredImage,
              url: blog.featuredImage.url.startsWith('/api/media/')
                ? blog.featuredImage.url
                : `/api/media/${blog.featuredImage.id}`,
            }
          : blog.featuredImage,
      }))

      return processedBlogs
    }

    return []
  } catch (error) {
    console.error('Error fetching blogs:', error)
    throw error
  }
}

/**
 * Fetches a blog by its ID
 * @param id The ID of the blog to fetch
 * @returns The blog data with processed image URLs
 */
export async function fetchBlogById(id: number) {
  try {
    const response = await fetch(`/api/blogs/${id}`)
    const data = await response.json()

    // Process the blog data to ensure image URLs are correct
    if (data.featuredImage) {
      data.featuredImage = {
        ...data.featuredImage,
        url: data.featuredImage.url.startsWith('/api/media/file/')
          ? data.featuredImage.url
          : `/api/media/${data.featuredImage.id}`,
      }
    }

    return data
  } catch (error) {
    console.error(`Error fetching blog with ID ${id}:`, error)
    throw error
  }
}
