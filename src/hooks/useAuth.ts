import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import * as authApi from '../api/auth.api'
import type { LoginInput, RegisterInput } from '../types/api.types'
import { getErrorMessage } from '../utils/errorHandler'

export function useLogin() {
  const { setAuth } = useAuthStore()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (input: LoginInput) => authApi.login(input),
    onSuccess(data) {
      setAuth(data.user, data.accessToken)
      navigate('/perfil')
    },
  })
}

export function useRegister() {
  const { setAuth } = useAuthStore()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (input: RegisterInput) => authApi.register(input),
    onSuccess(data) {
      setAuth(data.user, data.accessToken)
      navigate('/perfil')
    },
  })
}

export function useLogout() {
  const { logout } = useAuthStore()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: authApi.logout,
    onSettled() {
      logout()
      navigate('/login')
    },
  })
}

export { getErrorMessage }
