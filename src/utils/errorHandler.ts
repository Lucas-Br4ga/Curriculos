import type { AxiosError } from 'axios'
import type { ApiError } from '../types/api.types'

export function getErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'isAxiosError' in error) {
    const axiosErr = error as AxiosError<ApiError>
    return axiosErr.response?.data?.message ?? 'Erro de conexão com o servidor'
  }
  if (error instanceof Error) return error.message
  return 'Ocorreu um erro inesperado'
}

export function isAxiosError(error: unknown): error is AxiosError<ApiError> {
  return !!(error && typeof error === 'object' && 'isAxiosError' in error)
}
