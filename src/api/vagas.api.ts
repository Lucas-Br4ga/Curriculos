import api from './client'
import type { CriarVagaInput, ListaVagas, VagaCompleta } from '../types/vaga.types'

export interface ListarVagasParams {
  pagina?: number
  porPagina?: number
  ordem?: 'pontuacao_desc' | 'pontuacao_asc' | 'data_desc' | 'data_asc'
  busca?: string
}

export async function getVagas(params?: ListarVagasParams): Promise<ListaVagas> {
  const { data } = await api.get<ListaVagas>('/vagas', { params })
  return data
}

export async function getVaga(id: string): Promise<VagaCompleta> {
  const { data } = await api.get<VagaCompleta>(`/vagas/${id}`)
  return data
}

export async function criarVaga(input: CriarVagaInput): Promise<VagaCompleta> {
  const { data } = await api.post<VagaCompleta>('/vagas', input)
  return data
}

export async function deletarVaga(id: string): Promise<void> {
  await api.delete(`/vagas/${id}`)
}

export function getVagaPdfUrl(id: string): string {
  const base = import.meta.env.VITE_API_URL ?? 'http://localhost:3333'
  return `${base}/vagas/${id}/pdf`
}
