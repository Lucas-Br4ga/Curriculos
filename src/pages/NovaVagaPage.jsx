import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import Header from '../components/shared/Header.jsx'
import InputField from '../components/shared/InputField.jsx'
import Button from '../components/shared/Button.jsx'
import { usePerfil } from '../hooks/usePerfil.js'
import { useVagas } from '../hooks/useVagas.js'
import { extrairKeywords } from '../utils/extrairKeywords.js'
import { calcularMatch } from '../utils/calcularMatch.js'
import { gerarCurriculo } from '../utils/gerarCurriculo.js'

export default function NovaVagaPage() {
  const navigate = useNavigate()
  const { perfil, perfilExiste } = usePerfil()
  const { salvarVaga } = useVagas()

  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [erro, setErro] = useState('')
  const [gerando, setGerando] = useState(false)

  if (!perfilExiste) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-xl mx-auto px-4 py-20 text-center">
          <span className="text-4xl">👤</span>
          <h2 className="text-xl font-bold text-gray-900 mt-4 mb-2">Complete seu perfil primeiro</h2>
          <p className="text-gray-500 mb-6">
            Precisamos das suas informações para gerar um currículo personalizado para a vaga.
          </p>
          <Link
            to="/perfil"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Criar meu perfil →
          </Link>
        </main>
      </div>
    )
  }

  function handleGerar(e) {
    e.preventDefault()
    setErro('')

    if (!descricao.trim()) {
      setErro('Cole a descrição da vaga antes de continuar.')
      return
    }

    setGerando(true)

    try {
      const keywords = extrairKeywords(descricao)
      const { pontuacao } = calcularMatch(perfil, keywords)
      const curriculoGerado = gerarCurriculo(perfil, keywords)

      const vaga = {
        id: uuidv4(),
        titulo: titulo.trim() || 'Vaga sem título',
        descricaoOriginal: descricao,
        keywords,
        curriculoGerado,
        pontuacao,
        criadoEm: new Date().toISOString(),
      }

      salvarVaga(vaga)
      navigate(`/preview/${vaga.id}`)
    } catch {
      setErro('Algo deu errado ao gerar o currículo. Tente novamente.')
      setGerando(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Nova Vaga</h1>
          <p className="text-sm text-gray-500 mt-1">
            Cole a descrição da vaga e geramos um currículo adaptado ao que a empresa procura.
          </p>
        </div>

        <form onSubmit={handleGerar} className="space-y-5">
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <InputField
              label="Título da vaga"
              id="titulo"
              value={titulo}
              onChange={e => setTitulo(e.target.value)}
              placeholder="Ex: Dev Frontend — Empresa Y"
            />
            <InputField
              label="Descrição da vaga *"
              id="descricao"
              textarea
              value={descricao}
              onChange={e => { setDescricao(e.target.value); setErro('') }}
              placeholder="Cole aqui o texto completo da descrição da vaga. Quanto mais detalhada, melhor a análise de compatibilidade."
              rows={12}
              error={erro}
            />
          </div>

          <div className="flex items-center gap-3">
            <Button type="submit" size="lg" loading={gerando} disabled={gerando}>
              {gerando ? 'Gerando currículo...' : 'Gerar currículo personalizado'}
            </Button>
          </div>

          <p className="text-xs text-gray-400">
            Suas informações ficam salvas apenas no seu navegador. Nenhum dado é enviado para servidores externos.
          </p>
        </form>
      </main>
    </div>
  )
}
