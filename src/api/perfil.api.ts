import api from './client'
import type { Perfil, AtualizarPerfilInput } from '../types/perfil.types'

export async function getPerfil(): Promise<Perfil> {
  const { data } = await api.get<Perfil>('/perfil')
  return data
}

export async function atualizarPerfil(input: AtualizarPerfilInput): Promise<Perfil> {
  const { data } = await api.put<Perfil>('/perfil', input)
  return data
}
