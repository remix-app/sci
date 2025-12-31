import { useState } from 'react'
import { Button } from './ui/button'

export function AIChatBox() {
  const [messages, setMessages] = useState<string[]>([])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, input])
      setInput('')
    }
  }

  return (
    <div className="flex flex-col gap-4 p-4 border rounded">
      <div className="flex-1 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className="mb-2 p-2 bg-gray-100 rounded">{msg}</div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 px-3 py-2 border rounded"
          placeholder="Escribe un mensaje..."
        />
        <Button onClick={handleSend}>Enviar</Button>
      </div>
    </div>
  )
}
