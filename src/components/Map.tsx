import { useEffect, useRef } from 'react'

export function Map() {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapRef.current) return
    mapRef.current.innerHTML = '<div class="w-full h-full bg-gray-200 flex items-center justify-center">Mapa</div>'
  }, [])

  return <div ref={mapRef} className="w-full h-96 bg-gray-100" />
}
