import { useState, useEffect } from 'react'

// Custom hook to fetch photos from the Lorem Picsum API
export function useFetchPhotos() {
  // Photos array holds fetched photo objects; starts as an empty list
  const [photos, setPhotos] = useState([])
  // Loading indicates fetch status; starts true since fetch triggers immediately on mount
  const [loading, setLoading] = useState(true)
  // Error stores a user-friendly message; null when there is no error
  const [error, setError] = useState(null)

  useEffect(() => {
    // AbortController cancels the active fetch request if the component unmounts
    const controller = new AbortController()

    async function fetchPhotos() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch('https://picsum.photos/v2/list?limit=30', {
          signal: controller.signal,
        })

        // Check response.ok: fetch only rejects on network failure, so we must manually check HTTP status
        if (!response.ok) {
          throw new Error(`Failed to load photos (Status: ${response.status})`)
        }

        const data = await response.json()

        // Success: store fetched photos into state
        setPhotos(data)
      } catch (err) {
        // Ignore abort errors caused by component unmount cleanup
        if (err.name === 'AbortError') {
          return
        }

        // Failure: capture and store a readable error message for the UI
        setError(err.message || 'Failed to fetch photos. Please try again.')
      } finally {
        // Set loading to false once the request completes (unless unmounted)
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchPhotos()

    // Cleanup: abort ongoing fetch if component unmounts to prevent memory leaks / state updates
    return () => {
      controller.abort()
    }
  }, []) // Empty dependency array ensures fetch runs only once on mount

  // Return the required state object
  return { photos, loading, error }
}

export default useFetchPhotos
