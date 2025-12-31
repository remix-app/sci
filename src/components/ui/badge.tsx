import React from 'react'

export function Badge({ children, variant = 'default', className = '' }: any) {
  const variants: any = {
    default: 'bg-blue-100 text-blue-800',
    secondary: 'bg-gray-100 text-gray-800',
    outline: 'border border-gray-300 text-gray-800',
    destructive: 'bg-red-100 text-red-800',
    success: 'bg-green-100 text-green-800',
  }
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant] || variants.default} ${className}`}>
      {children}
    </span>
  )
}
