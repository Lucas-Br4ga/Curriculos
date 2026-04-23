import { Skill, Experiencia, Projeto } from '@prisma/client'

export interface PerfilParaMatch {
  skills: Skill[]
  experiencias: Experiencia[]
  projetos: Projeto[]
}

export interface MatchResult {
  pontuacao: number
  keywordsMatch: string[]
  keywordsFaltantes: string[]
  breakdown: {
    skills: number
    experiencias: number
    projetos: number
  }
}

function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function emptyResult(): MatchResult {
  return {
    pontuacao: 0,
    keywordsMatch: [],
    keywordsFaltantes: [],
    breakdown: { skills: 0, experiencias: 0, projetos: 0 },
  }
}

export function calcularMatch(perfil: PerfilParaMatch, keywords: string[]): MatchResult {
  if (!keywords.length) return emptyResult()

  const skillsSet = new Set(perfil.skills.map((s) => normalizar(s.nome)))
  const tecnosExp = new Set(
    perfil.experiencias.flatMap((e) => e.tecnologias.map(normalizar)),
  )
  const tecnosProj = new Set(
    perfil.projetos.flatMap((p) => p.tecnologias.map(normalizar)),
  )

  const kwNorm = keywords.map(normalizar)

  const matchSkills = kwNorm.filter((k) => skillsSet.has(k))
  const matchExp = kwNorm.filter((k) => tecnosExp.has(k))
  const matchProj = kwNorm.filter((k) => tecnosProj.has(k))

  const scoreSkills = (matchSkills.length / kwNorm.length) * 100
  const scoreExp = (matchExp.length / kwNorm.length) * 100
  const scoreProj = (matchProj.length / kwNorm.length) * 100

  const pontuacao = Math.round(scoreSkills * 0.5 + scoreExp * 0.3 + scoreProj * 0.2)

  const keywordsMatchSet = new Set([...matchSkills, ...matchExp, ...matchProj])
  const keywordsMatch = keywords.filter((k) => keywordsMatchSet.has(normalizar(k)))
  const keywordsFaltantes = keywords.filter((k) => !skillsSet.has(normalizar(k)))

  return {
    pontuacao: Math.min(pontuacao, 100),
    keywordsMatch,
    keywordsFaltantes,
    breakdown: {
      skills: Math.round(scoreSkills),
      experiencias: Math.round(scoreExp),
      projetos: Math.round(scoreProj),
    },
  }
}
