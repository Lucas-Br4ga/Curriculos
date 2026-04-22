import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import Header from '../components/shared/Header.jsx'
import CurriculoPreview from '../components/Curriculo/CurriculoPreview.jsx'
import Button from '../components/shared/Button.jsx'
import { useVagas } from '../hooks/useVagas.js'
import { exportarPDF } from '../utils/exportarPDF.js'
import { labelMatch } from '../utils/calcularMatch.js'

const corBg = {
  green:  'bg-green-50 border-green-200 text-green-700',
  blue:   'bg-blue-50 border-blue-200 text-blue-700',
  yellow: 'bg-yellow-50 border-yellow-200 text-yellow-700',
  red:    'bg-red-50 border-red-200 text-red-700',
}

export default function PreviewPage() {
  const { id } = useParams()
  const { getVaga } = useVagas()
  const vaga = getVaga(id)
  const [exportando, setExportando] = useState(false)

  if (!vaga) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-xl mx-auto px-4 py-20 text-center">
          <span className="text-4xl">🔍</span>
          <h2 className="text-xl font-bold text-gray-900 mt-4 mb-2">Currículo não encontrado</h2>
          <p className="text-gray-500 mb-6">Este currículo pode ter sido excluído ou o link está incorreto.</p>
          <Link to="/historico" className="text-indigo-600 hover:underline font-medium">Ver histórico →</Link>
        </main>
      </div>
    )
  }

  const { texto, cor } = labelMatch(vaga.pontuacao)

  async function handleExportar() {
    setExportando(true)
    try {
      const nomeArquivo = `curriculo-${vaga.titulo.toLowerCase().replace(/\s+/g, '-').slice(0, 40)}`
      await exportarPDF('curriculo-preview', nomeArquivo)
    } catch (e) {
      alert('Erro ao exportar PDF. Tente novamente.')
    } finally {
      setExportando(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-6">

        {/* Painel lateral */}
        <aside className="lg:w-72 flex-shrink-0 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-sm text-gray-500 mb-1">Compatibilidade com a vaga</p>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-bold text-gray-900">{vaga.pontuacao}%</span>
            </div>
            <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${corBg[cor]}`}>
              {texto}
            </div>

            <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  cor === 'green' ? 'bg-green-500' :
                  cor === 'blue'  ? 'bg-blue-500' :
                  cor === 'yellow'? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${vaga.pontuacao}%` }}
              />
            </div>
          </div>

          {/* Skills que batem */}
          {vaga.curriculoGerado.skillsPrioritarias?.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <p className="text-sm font-semibold text-green-700 mb-2">✓ Skills que batem</p>
              <div className="flex flex-wrap gap-1.5">
                {vaga.curriculoGerado.skillsPrioritarias.map(s => (
                  <span key={s.id} className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-1 rounded-full">
                    {s.nome}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Skills que faltam */}
          {vaga.keywords?.filter(k =>
            !vaga.curriculoGerado.skillsPrioritarias?.some(s => s.nome.toLowerCase() === k)
          ).length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <p className="text-sm font-semibold text-red-600 mb-2">✗ Skills para estudar</p>
              <div className="flex flex-wrap gap-1.5">
                {vaga.keywords
                  .filter(k => !vaga.curriculoGerado.skillsPrioritarias?.some(s => s.nome.toLowerCase() === k))
                  .map(k => (
                    <span key={k} className="text-xs bg-red-50 text-red-600 border border-red-200 px-2 py-1 rounded-full">
                      {k}
                    </span>
                  ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Button className="w-full" onClick={handleExportar} loading={exportando} disabled={exportando}>
              {exportando ? 'Gerando PDF...' : '⬇ Exportar PDF'}
            </Button>
            <Link to="/historico">
              <Button variant="secondary" className="w-full">← Voltar ao histórico</Button>
            </Link>
            <Link to="/nova-vaga">
              <Button variant="ghost" className="w-full text-sm">+ Gerar para outra vaga</Button>
            </Link>
          </div>
        </aside>

        {/* Currículo */}
        <div className="flex-1 overflow-x-auto">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="bg-gray-50 border-b border-gray-200 px-4 py-2.5 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <p className="text-xs text-gray-500 ml-2">{vaga.titulo}</p>
            </div>
            <div className="overflow-auto">
              <CurriculoPreview curriculo={vaga.curriculoGerado} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
