import { create } from 'zustand'
import type { User } from '../types/api.types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  setAuth: (user: User, accessToken: string) => void
  setAccessToken: (token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: !!sessionStorage.getItem('cf_access_token'),

  setAuth(user, accessToken) {
    sessionStorage.setItem('cf_access_token', accessToken)
    set({ user, isAuthenticated: true })
  },

  setAccessToken(token) {
    sessionStorage.setItem('cf_access_token', token)
  },

  logout() {
    sessionStorage.removeItem('cf_access_token')
    set({ user: null, isAuthenticated: false })
  },
}))
