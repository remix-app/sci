import { Download } from 'lucide-react'
import { Button } from '../ui/button'

export function DownloadBillButton() {
  const handleDownload = () => {
    console.log('Descargando recibo...')
  }

  return (
    <Button onClick={handleDownload} variant="outline" size="sm">
      <Download className="w-4 h-4 mr-2" />
      Descargar
    </Button>
  )
}
