import type { Perfil } from './perfil.types'

export interface VagaResumo {
  id: string
  titulo: string
  empresa?: string | null
  pontuacao: number
  keywords: string[]
  keywordsMatch: string[]
  keywordsFaltantes: string[]
  breakdown: {
    skills: number
    experiencias: number
    projetos: number
  }
  criadoEm: string
}

export interface CurriculoGerado {
  dadosPessoais: Pick<Perfil, 'nome' | 'email' | 'telefone' | 'cidade' | 'linkedin' | 'github'>
  skillsPrioritarias: Perfil['skills']
  skillsSecundarias: Perfil['skills']
  experiencias: Perfil['experiencias']
  projetos: Perfil['projetos']
  formacao: Perfil['formacoes']
}

export interface VagaCompleta extends VagaResumo {
  descricaoOriginal: string
  curriculoJson: CurriculoGerado
}

export interface CriarVagaInput {
  titulo?: string
  empresa?: string
  descricaoVaga: string
}

export interface ListaVagas {
  total: number
  pagina: number
  porPagina: number
  vagas: VagaResumo[]
}
