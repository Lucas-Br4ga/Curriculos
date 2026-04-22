import { calcularMatch } from './calcularMatch.js'

export function gerarCurriculo(perfil, keywords) {
  const { matched } = calcularMatch(perfil, keywords)

  const skillsPrioritarias = perfil.skills.filter(s =>
    matched.includes(s.nome.toLowerCase())
  )
  const skillsSecundarias = perfil.skills.filter(s =>
    !matched.includes(s.nome.toLowerCase())
  )

  const scoreExp = (exp) =>
    (exp.tecnologias || []).filter(t => keywords.includes(t.toLowerCase())).length

  const experienciasOrdenadas = [...perfil.experiencias].sort(
    (a, b) => scoreExp(b) - scoreExp(a)
  )

  const scoreProj = (proj) =>
    (proj.tecnologias || []).filter(t => keywords.includes(t.toLowerCase())).length

  const projetosOrdenados = [...perfil.projetos]
    .sort((a, b) => scoreProj(b) - scoreProj(a))
    .slice(0, 3)

  return {
    dadosPessoais: perfil.dadosPessoais,
    formacao: perfil.formacao,
    skillsPrioritarias,
    skillsSecundarias,
    experiencias: experienciasOrdenadas,
    projetos: projetosOrdenados,
  }
}
