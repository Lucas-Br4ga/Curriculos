import api from './client'
import type { AuthResponse, LoginInput, RegisterInput } from '../types/api.types'

export async function register(input: RegisterInput): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/auth/register', input)
  return data
}

export async function login(input: LoginInput): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/auth/login', input)
  return data
}

export async function logout(): Promise<void> {
  await api.post('/auth/logout')
}

export async function refreshToken(): Promise<{ accessToken: string }> {
  const { data } = await api.post<{ accessToken: string }>('/auth/refresh')
  return data
}
