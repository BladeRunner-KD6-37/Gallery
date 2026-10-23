// Action type constant to prevent typo-related bugs across components
export const TOGGLE_FAVOURITE = 'TOGGLE_FAVOURITE'

// Storage key used in browser localStorage
const STORAGE_KEY = 'favourites'

/**
 * Loads favourites from localStorage safely.
 *
 * Wrapped in try/catch to protect against:
 * - Empty/null initial storage (returns default [])
 * - Corrupted or invalid JSON data (prevents app crash)
 * - Browser privacy settings blocking localStorage access
 */
export function loadFavourites() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) {
      return []
    }
    const parsed = JSON.parse(saved)
    // Verify parsed result is a valid array
    return Array.isArray(parsed) ? parsed : []
  } catch (err) {
    console.error('Failed to load favourites from localStorage:', err)
    return []
  }
}

/**
 * Reducer function for managing the favourites state.
 *
 * Why useReducer is ideal here:
 * 1. Centralized logic: Adding or removing an ID is encapsulated in one pure function,
 *    rather than scattered across click handlers.
 * 2. Separation of concerns: UI components only express user intent by dispatching
 *    an action, without worrying about state structure or immutability rules.
 * 3. Strict immutability: Guarantees a new array reference without mutating existing state.
 */
export function favouritesReducer(state, action) {
  switch (action.type) {
    case TOGGLE_FAVOURITE: {
      const photoId = String(action.payload)
      const isAlreadyFavourite = state.includes(photoId)

      // If already favourited, remove it; otherwise, add it immutably
      if (isAlreadyFavourite) {
        return state.filter((id) => id !== photoId)
      } else {
        return [...state, photoId]
      }
    }

    // Default case preserves current state for any unknown action
    default:
      return state
  }
}

export default favouritesReducer
