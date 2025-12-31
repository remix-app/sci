import { useState } from 'react'
import { Button } from '../components/ui/button'

export default function Page() {
  const [data, setData] = useState([])

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Página</h1>
      <Button>Acción</Button>
    </div>
  )
}
