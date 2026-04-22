import { useState, useCallback } from 'react'

const CHAVE = 'cf_vagas'

function carregar() {
  try {
    const raw = localStorage.getItem(CHAVE)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function salvar(vagas) {
  localStorage.setItem(CHAVE, JSON.stringify(vagas))
}

export function useVagas() {
  const [vagas, setVagas] = useState(() => carregar())

  const salvarVaga = useCallback((vaga) => {
    const atual = carregar()
    const novo = [vaga, ...atual]
    salvar(novo)          // persiste sincronamente antes do navigate()
    setVagas(novo)
  }, [])

  const removerVaga = useCallback((id) => {
    const atual = carregar()
    const novo = atual.filter(v => v.id !== id)
    salvar(novo)
    setVagas(novo)
  }, [])

  const getVaga = useCallback((id) => {
    return carregar().find(v => v.id === id) ?? null
  }, [])

  return { vagas, salvarVaga, removerVaga, getVaga }
}
