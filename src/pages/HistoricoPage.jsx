import { Link } from 'react-router-dom'
import Header from '../components/shared/Header.jsx'
import Button from '../components/shared/Button.jsx'
import { useVagas } from '../hooks/useVagas.js'
import { labelMatch } from '../utils/calcularMatch.js'

const corBg = {
  green:  'bg-green-50 text-green-700',
  blue:   'bg-blue-50 text-blue-700',
  yellow: 'bg-yellow-50 text-yellow-700',
  red:    'bg-red-50 text-red-600',
}

function formatarData(iso) {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'short', year: 'numeric',
  })
}

export default function HistoricoPage() {
  const { vagas, removerVaga } = useVagas()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Histórico de Currículos</h1>
            <p className="text-sm text-gray-500 mt-1">
              {vagas.length === 0
                ? 'Nenhum currículo gerado ainda.'
                : `${vagas.length} currículo${vagas.length > 1 ? 's' : ''} gerado${vagas.length > 1 ? 's' : ''}`}
            </p>
          </div>
          <Link to="/nova-vaga">
            <Button>+ Nova vaga</Button>
          </Link>
        </div>

        {vagas.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <span className="text-4xl">📋</span>
            <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2">Nenhum currículo gerado ainda</h3>
            <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
              Cole uma descrição de vaga e gere seu primeiro currículo personalizado em segundos.
            </p>
            <Link to="/nova-vaga">
              <Button>Gerar meu primeiro currículo</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {vagas.map(vaga => {
              const { texto, cor } = labelMatch(vaga.pontuacao)
              return (
                <div key={vaga.id} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
                  {/* Score */}
                  <div className="flex-shrink-0 text-center w-14">
                    <p className="text-2xl font-bold text-gray-900">{vaga.pontuacao}%</p>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${corBg[cor]}`}>
                      {cor === 'green' ? 'Ótimo' : cor === 'blue' ? 'Bom' : cor === 'yellow' ? 'Médio' : 'Baixo'}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{vaga.titulo}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{formatarData(vaga.criadoEm)}</p>
                    {vaga.keywords?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {vaga.keywords.slice(0, 6).map(k => (
                          <span key={k} className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
                            {k}
                          </span>
                        ))}
                        {vaga.keywords.length > 6 && (
                          <span className="text-[10px] text-gray-400">+{vaga.keywords.length - 6}</span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 flex-shrink-0">
                    <Link to={`/preview/${vaga.id}`}>
                      <Button size="sm">Ver currículo</Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        if (window.confirm(`Excluir "${vaga.titulo}"? Esta ação não pode ser desfeita.`)) {
                          removerVaga(vaga.id)
                        }
                      }}
                      className="text-red-500 hover:bg-red-50"
                    >
                      Excluir
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
