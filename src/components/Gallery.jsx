import { useState, useReducer, useEffect, useMemo, useCallback } from 'react'
import useFetchPhotos from '../hooks/useFetchPhotos'
import {
  favouritesReducer,
  loadFavourites,
  TOGGLE_FAVOURITE,
} from '../reducers/favouritesReducer'
import Spinner from './Spinner'
import PhotoCard from './PhotoCard'

export function Gallery() {
  // Fetch photos via custom hook — Gallery does not fetch data directly
  const { photos, loading, error } = useFetchPhotos()

  // Manage favourites with useReducer, using loadFavourites as lazy initializer to read from localStorage once
  const [favourites, dispatch] = useReducer(favouritesReducer, [], loadFavourites)

  // Local state for search query string
  const [query, setQuery] = useState('')

  // Sync favourites to localStorage whenever the favourites state updates
  useEffect(() => {
    try {
      localStorage.setItem('favourites', JSON.stringify(favourites))
    } catch (err) {
      console.error('Failed to save favourites to localStorage:', err)
    }
  }, [favourites])

  // useCallback memoizes this input change handler so its function reference stays stable across renders
  const handleSearchChange = useCallback((e) => {
    setQuery(e.target.value)
  }, [])

  // useCallback keeps the toggle function reference stable so child PhotoCards don't receive new references unnecessarily
  const handleToggleFavourite = useCallback((id) => {
    dispatch({ type: TOGGLE_FAVOURITE, payload: id })
  }, [])

  // useMemo computes the filtered list and only re-filters when photos or query change.
  // This prevents expensive array filtering whenever unrelated state updates (like toggling a favourite).
  const filteredPhotos = useMemo(() => {
    const trimmed = query.trim().toLowerCase()
    if (!trimmed) {
      return photos
    }
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(trimmed)
    )
  }, [photos, query])

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Page Title */}
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Photo Gallery
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Discover photos and save your favourites
        </p>
      </header>

      {/* Real-time Search Input Filter */}
      <div className="mx-auto mb-8 max-w-md">
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Search by author..."
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      {/* Content States in strict order: loading -> error -> grid or empty state */}
      {loading && <Spinner />}

      {!loading && error && (
        <div className="mx-auto max-w-md rounded-lg border border-red-200 bg-red-50 p-4 text-center text-sm font-medium text-red-700 shadow-sm">
          {error}
        </div>
      )}

      {!loading && !error && filteredPhotos.length === 0 && (
        <p className="py-12 text-center text-sm text-gray-500">
          No photos found
        </p>
      )}

      {!loading && !error && filteredPhotos.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourite={favourites.includes(String(photo.id))}
              onToggleFavourite={handleToggleFavourite}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Gallery
