import { useEffect } from 'react'
import LocomotiveScroll from 'locomotive-scroll'
import Gallery from './components/Gallery'

function App() {
  useEffect(() => {
    const scroll = new LocomotiveScroll({
      lenisOptions: {
        duration: 1.2,
        smoothWheel: true,
      },
    })

    return () => {
      scroll.destroy()
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Gallery />
    </div>
  )
}

export default App