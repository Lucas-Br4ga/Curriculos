import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as vagasApi from '../api/vagas.api'
import type { CriarVagaInput } from '../types/vaga.types'
import type { ListarVagasParams } from '../api/vagas.api'
import { useAuthStore } from '../stores/authStore'

export function useVagas(params?: ListarVagasParams) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  return useQuery({
    queryKey: ['vagas', params],
    queryFn: () => vagasApi.getVagas(params),
    enabled: isAuthenticated,
    staleTime: 2 * 60 * 1000,
  })
}

export function useVaga(id: string) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  return useQuery({
    queryKey: ['vagas', id],
    queryFn: () => vagasApi.getVaga(id),
    enabled: isAuthenticated && !!id,
    staleTime: 5 * 60 * 1000,
  })
}

export function useCriarVaga() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CriarVagaInput) => vagasApi.criarVaga(input),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['vagas'] })
    },
  })
}

export function useDeletarVaga() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: vagasApi.deletarVaga,
    onSuccess(_, id) {
      queryClient.setQueryData(
        ['vagas'],
        (old: vagasApi.ListarVagasParams | undefined) => old,
      )
      queryClient.invalidateQueries({ queryKey: ['vagas'] })
      queryClient.removeQueries({ queryKey: ['vagas', id] })
    },
  })
}
