import React from 'react'

export function Card({ children, ...props }: any) {
  return <div className="bg-white rounded-lg shadow p-4" {...props}>{children}</div>
}

export function CardHeader({ children }: any) {
  return <div className="mb-4">{children}</div>
}

export function CardContent({ children }: any) {
  return <div>{children}</div>
}
