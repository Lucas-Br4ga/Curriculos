import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as perfilApi from '../api/perfil.api'
import type { AtualizarPerfilInput } from '../types/perfil.types'
import { useAuthStore } from '../stores/authStore'

export function usePerfil() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  const query = useQuery({
    queryKey: ['perfil'],
    queryFn: perfilApi.getPerfil,
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000,
  })

  return {
    perfil: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  }
}

export function useAtualizarPerfil() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: AtualizarPerfilInput) => perfilApi.atualizarPerfil(input),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['perfil'] })
    },
  })
}
