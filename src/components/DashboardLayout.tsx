import { useState } from 'react'
import { Menu, X, Home, Settings, LogOut } from 'lucide-react'
import { Button } from './ui/button'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white shadow transition-all`}>
        <div className="p-4 flex justify-between items-center">
          <h1 className={`font-bold ${!sidebarOpen && 'hidden'}`}>CM Pro</h1>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <nav className="mt-8">
          {[
            { icon: Home, label: 'Dashboard' },
            { icon: Settings, label: 'Configuración' },
            { icon: LogOut, label: 'Salir' },
          ].map((item) => (
            <div key={item.label} className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3">
              <item.icon size={20} />
              {sidebarOpen && <span>{item.label}</span>}
            </div>
          ))}
        </nav>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
