import React from 'react'

export function Button({ children, onClick, variant = 'default', size = 'md', ...props }: any) {
  const baseClass = 'px-4 py-2 rounded font-medium transition'
  const variantClass = variant === 'outline' ? 'border border-gray-300' : 'bg-blue-600 text-white'
  return <button className={`${baseClass} ${variantClass}`} onClick={onClick} {...props}>{children}</button>
}
