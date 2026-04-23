export type NivelSkill = 'basico' | 'intermediario' | 'avancado'
export type CategoriaSkill = 'frontend' | 'backend' | 'devops' | 'dados' | 'mobile' | 'design' | 'outro'

export interface Skill {
  id: string
  perfilId: string
  nome: string
  categoria: CategoriaSkill
  nivel: NivelSkill
  ordem: number
}

export interface Experiencia {
  id: string
  perfilId: string
  cargo: string
  empresa: string
  periodoInicio: string
  periodoFim: string | null
  atual: boolean
  descricao?: string | null
  tecnologias: string[]
  ordem: number
}

export interface Projeto {
  id: string
  perfilId: string
  nome: string
  descricao?: string | null
  link?: string | null
  tecnologias: string[]
  ordem: number
}

export interface Formacao {
  id: string
  perfilId: string
  curso: string
  instituicao: string
  periodoInicio?: string | null
  periodoFim?: string | null
  atual: boolean
}

export interface DadosPessoais {
  nome: string
  email: string
  telefone?: string | null
  cidade?: string | null
  linkedin?: string | null
  github?: string | null
}

export interface Perfil {
  id: string
  userId: string
  nome: string
  email: string
  telefone?: string | null
  cidade?: string | null
  linkedin?: string | null
  github?: string | null
  atualizadoEm: string
  skills: Skill[]
  experiencias: Experiencia[]
  projetos: Projeto[]
  formacoes: Formacao[]
}

export interface AtualizarPerfilInput {
  nome?: string
  email?: string
  telefone?: string
  cidade?: string
  linkedin?: string
  github?: string
  skills?: Omit<Skill, 'id' | 'perfilId'>[]
  experiencias?: Omit<Experiencia, 'id' | 'perfilId'>[]
  projetos?: Omit<Projeto, 'id' | 'perfilId'>[]
  formacoes?: Omit<Formacao, 'id' | 'perfilId'>[]
}
