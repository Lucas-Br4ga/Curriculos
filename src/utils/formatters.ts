export function formatarData(isoString: string | null | undefined): string {
  if (!isoString) return ''
  const date = new Date(isoString)
  return date.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })
}

export function formatarPeriodo(inicio: string, fim: string | null, atual: boolean): string {
  const inicioStr = formatarData(inicio)
  if (atual) return `${inicioStr} – Presente`
  return `${inicioStr} – ${formatarData(fim)}`
}

export function pontuacaoParaCor(pontuacao: number): string {
  if (pontuacao >= 70) return 'text-green-600 bg-green-50'
  if (pontuacao >= 50) return 'text-blue-600 bg-blue-50'
  if (pontuacao >= 30) return 'text-yellow-600 bg-yellow-50'
  return 'text-red-600 bg-red-50'
}

export function truncar(texto: string, max: number): string {
  if (texto.length <= max) return texto
  return `${texto.slice(0, max)}...`
}
