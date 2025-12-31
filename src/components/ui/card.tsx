import React from 'react'

export function Card({ children, className = '', ...props }: any) {
  return <div className={`bg-white rounded-lg shadow p-4 ${className}`} {...props}>{children}</div>
}

export function CardHeader({ children, className = '' }: any) {
  return <div className={`mb-4 ${className}`}>{children}</div>
}

export function CardContent({ children, className = '' }: any) {
  return <div className={className}>{children}</div>
}

export function CardTitle({ children, className = '' }: any) {
  return <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
}

export function CardDescription({ children, className = '' }: any) {
  return <p className={`text-sm text-gray-500 ${className}`}>{children}</p>
}
