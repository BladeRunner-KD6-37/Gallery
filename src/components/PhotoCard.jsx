// Presentational card component driven purely by props with no internal state
export function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  // Request a consistent 400x300 thumbnail to ensure fast loading and uniform aspect ratio
  const imageUrl = `https://picsum.photos/id/${photo.id}/400/300`

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
      {/* Photo container with fixed aspect ratio to prevent layout shifts while images load */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Card footer showing author name and favourite toggle button */}
      <div className="flex items-center justify-between gap-3 p-4">
        <span
          className="truncate text-sm font-medium text-gray-800"
          title={photo.author}
        >
          {photo.author}
        </span>

        {/* Heart button: filled red when favourited, outlined otherwise */}
        <button
          type="button"
          onClick={() => onToggleFavourite(photo.id)}
          aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
          aria-pressed={isFavourite}
          className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={isFavourite ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`h-5 w-5 transition-colors ${
              isFavourite ? 'text-red-500' : 'text-gray-400'
            }`}
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default PhotoCard
