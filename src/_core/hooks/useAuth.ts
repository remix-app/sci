import { useQuery } from '@tanstack/react-query'

export function useAuth() {
  const { data: user, isLoading } = useQuery({
    queryKey: ['auth', 'user'],
    queryFn: async () => {
      const response = await fetch('/api/auth/me')
      if (!response.ok) return null
      return response.json()
    },
  })

  return { user, isLoading, isAuthenticated: !!user }
}

export function useLogout() {
  return async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    window.location.href = '/'
  }
}
