import { Perfil, Skill, Experiencia, Projeto, Formacao } from '@prisma/client'

type PerfilCompleto = Perfil & {
  skills: Skill[]
  experiencias: Experiencia[]
  projetos: Projeto[]
  formacoes: Formacao[]
}

function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function scoreExperiencia(exp: Experiencia, keywords: string[]): number {
  const kwSet = new Set(keywords.map(normalizar))
  const matches = exp.tecnologias.filter((t) => kwSet.has(normalizar(t))).length
  return matches
}

function scoreProjeto(proj: Projeto, keywords: string[]): number {
  const kwSet = new Set(keywords.map(normalizar))
  const matches = proj.tecnologias.filter((t) => kwSet.has(normalizar(t))).length
  return matches
}

export function gerarCurriculo(perfil: PerfilCompleto, keywords: string[]) {
  const kwSet = new Set(keywords.map(normalizar))

  const skillsPrioritarias = perfil.skills
    .filter((s) => kwSet.has(normalizar(s.nome)))
    .sort((a, b) => a.ordem - b.ordem)

  const skillsSecundarias = perfil.skills
    .filter((s) => !kwSet.has(normalizar(s.nome)))
    .sort((a, b) => a.ordem - b.ordem)

  const experienciasOrdenadas = [...perfil.experiencias]
    .sort((a, b) => {
      const diff = scoreExperiencia(b, keywords) - scoreExperiencia(a, keywords)
      if (diff !== 0) return diff
      // Mais recente primeiro como critério de desempate
      return new Date(b.periodoInicio).getTime() - new Date(a.periodoInicio).getTime()
    })

  const projetosOrdenados = [...perfil.projetos]
    .map((p) => ({ ...p, _score: scoreProjeto(p, keywords) }))
    .sort((a, b) => b._score - a._score)
    .slice(0, 3)
    .map(({ _score: _s, ...p }) => p)

  return {
    dadosPessoais: {
      nome: perfil.nome,
      email: perfil.email,
      telefone: perfil.telefone,
      cidade: perfil.cidade,
      linkedin: perfil.linkedin,
      github: perfil.github,
    },
    skillsPrioritarias,
    skillsSecundarias,
    experiencias: experienciasOrdenadas,
    projetos: projetosOrdenados,
    formacao: perfil.formacoes,
  }
}
