export function calcularMatch(perfil, keywords) {
  if (!keywords.length) return { matched: [], naoMatched: [], pontuacao: 0 }

  const skillsUsuario = perfil.skills.map(s => s.nome.toLowerCase())

  const matched = keywords.filter(k => skillsUsuario.includes(k))
  const naoMatched = keywords.filter(k => !skillsUsuario.includes(k))
  const pontuacao = Math.round((matched.length / keywords.length) * 100)

  return { matched, naoMatched, pontuacao }
}

export function labelMatch(pontuacao) {
  if (pontuacao >= 80) return { texto: 'Ótima compatibilidade', cor: 'green' }
  if (pontuacao >= 60) return { texto: 'Boa compatibilidade', cor: 'blue' }
  if (pontuacao >= 40) return { texto: 'Compatibilidade moderada', cor: 'yellow' }
  return { texto: 'Baixa compatibilidade', cor: 'red' }
}
