import { useState, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'

const CHAVE = 'cf_perfil'

const perfilVazio = {
  dadosPessoais: { nome: '', email: '', telefone: '', linkedin: '', github: '', cidade: '' },
  skills: [],
  experiencias: [],
  projetos: [],
  formacao: [],
}

function carregar() {
  try {
    const raw = localStorage.getItem(CHAVE)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function salvar(perfil) {
  localStorage.setItem(CHAVE, JSON.stringify(perfil))
}

export function usePerfil() {
  const [perfil, setPerfil] = useState(() => carregar() ?? perfilVazio)

  const perfilExiste = Boolean(
    perfil.dadosPessoais?.nome?.trim()
  )

  const atualizar = useCallback((novo) => {
    setPerfil(novo)
    salvar(novo)
  }, [])

  const salvarDadosPessoais = useCallback((dados) => {
    atualizar({ ...perfil, dadosPessoais: dados })
  }, [perfil, atualizar])

  const adicionarSkill = useCallback((skill) => {
    const novo = { ...perfil, skills: [...perfil.skills, { id: uuidv4(), ...skill }] }
    atualizar(novo)
  }, [perfil, atualizar])

  const removerSkill = useCallback((id) => {
    atualizar({ ...perfil, skills: perfil.skills.filter(s => s.id !== id) })
  }, [perfil, atualizar])

  const adicionarExperiencia = useCallback((exp) => {
    atualizar({ ...perfil, experiencias: [...perfil.experiencias, { id: uuidv4(), ...exp }] })
  }, [perfil, atualizar])

  const removerExperiencia = useCallback((id) => {
    atualizar({ ...perfil, experiencias: perfil.experiencias.filter(e => e.id !== id) })
  }, [perfil, atualizar])

  const adicionarProjeto = useCallback((proj) => {
    atualizar({ ...perfil, projetos: [...perfil.projetos, { id: uuidv4(), ...proj }] })
  }, [perfil, atualizar])

  const removerProjeto = useCallback((id) => {
    atualizar({ ...perfil, projetos: perfil.projetos.filter(p => p.id !== id) })
  }, [perfil, atualizar])

  const adicionarFormacao = useCallback((form) => {
    atualizar({ ...perfil, formacao: [...perfil.formacao, { id: uuidv4(), ...form }] })
  }, [perfil, atualizar])

  const removerFormacao = useCallback((id) => {
    atualizar({ ...perfil, formacao: perfil.formacao.filter(f => f.id !== id) })
  }, [perfil, atualizar])

  return {
    perfil,
    perfilExiste,
    salvarDadosPessoais,
    adicionarSkill,
    removerSkill,
    adicionarExperiencia,
    removerExperiencia,
    adicionarProjeto,
    removerProjeto,
    adicionarFormacao,
    removerFormacao,
  }
}
