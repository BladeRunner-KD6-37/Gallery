// Presentational component that renders an accessible, animated loading spinner
export function Spinner() {
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center p-8 text-gray-600"
    >
      {/* Circular spinner built with Tailwind's animate-spin and border utilities */}
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
      {/* Visually hidden text ensures screen readers announce the loading state */}
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default Spinner
