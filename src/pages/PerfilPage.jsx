import { useState } from 'react'
import Header from '../components/shared/Header.jsx'
import DadosPessoaisForm from '../components/Perfil/DadosPessoaisForm.jsx'
import SkillForm from '../components/Perfil/SkillForm.jsx'
import ExperienciaForm from '../components/Perfil/ExperienciaForm.jsx'
import ProjetoForm from '../components/Perfil/ProjetoForm.jsx'
import { usePerfil } from '../hooks/usePerfil.js'
import InputField from '../components/shared/InputField.jsx'
import Button from '../components/shared/Button.jsx'

const abas = [
  { id: 'dados',       label: 'Dados Pessoais' },
  { id: 'skills',      label: 'Skills' },
  { id: 'experiencias',label: 'Experiências' },
  { id: 'projetos',    label: 'Projetos' },
  { id: 'formacao',    label: 'Formação' },
]

function FormacaoSection({ formacao, onAdicionar, onRemover }) {
  const [form, setForm] = useState({ instituicao: '', curso: '', periodo: '' })
  const [aberto, setAberto] = useState(false)

  function set(campo, valor) {
    setForm(prev => ({ ...prev, [campo]: valor }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.instituicao.trim() || !form.curso.trim()) return
    onAdicionar(form)
    setForm({ instituicao: '', curso: '', periodo: '' })
    setAberto(false)
  }

  return (
    <div className="space-y-4">
      {formacao.length === 0 && !aberto && (
        <p className="text-sm text-gray-400 py-2">Nenhuma formação adicionada.</p>
      )}
      {formacao.map(f => (
        <div key={f.id} className="border border-gray-200 rounded-lg p-4 bg-white flex justify-between items-start gap-2">
          <div>
            <p className="font-medium text-gray-900">{f.curso}</p>
            <p className="text-sm text-gray-600">{f.instituicao} · {f.periodo}</p>
          </div>
          <button
            onClick={() => onRemover(f.id)}
            className="text-gray-400 hover:text-red-500 transition-colors text-sm flex-shrink-0"
          >
            Remover
          </button>
        </div>
      ))}
      {aberto ? (
        <form onSubmit={handleSubmit} className="border border-indigo-200 rounded-lg p-4 bg-indigo-50/30 space-y-3">
          <p className="font-medium text-gray-800 text-sm">Nova formação</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InputField label="Instituição *" id="inst" value={form.instituicao} onChange={e => set('instituicao', e.target.value)} placeholder="PUC Minas" required />
            <InputField label="Curso *" id="curso" value={form.curso} onChange={e => set('curso', e.target.value)} placeholder="Sistemas de Informação" required />
            <InputField label="Período" id="form-periodo" value={form.periodo} onChange={e => set('periodo', e.target.value)} placeholder="2022 - 2025" />
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={!form.instituicao.trim() || !form.curso.trim()}>Salvar formação</Button>
            <Button type="button" variant="secondary" onClick={() => setAberto(false)}>Cancelar</Button>
          </div>
        </form>
      ) : (
        <Button variant="secondary" onClick={() => setAberto(true)}>+ Adicionar formação</Button>
      )}
    </div>
  )
}

export default function PerfilPage() {
  const [aba, setAba] = useState('dados')
  const {
    perfil,
    salvarDadosPessoais,
    adicionarSkill, removerSkill,
    adicionarExperiencia, removerExperiencia,
    adicionarProjeto, removerProjeto,
    adicionarFormacao, removerFormacao,
  } = usePerfil()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Meu Perfil</h1>
          <p className="text-sm text-gray-500 mt-1">
            Preencha suas informações uma vez e gere currículos para quantas vagas quiser.
          </p>
        </div>

        {/* Abas */}
        <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 mb-6 overflow-x-auto">
          {abas.map(a => (
            <button
              key={a.id}
              onClick={() => setAba(a.id)}
              className={`flex-shrink-0 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                aba === a.id
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          {aba === 'dados' && (
            <DadosPessoaisForm dados={perfil.dadosPessoais} onSalvar={salvarDadosPessoais} />
          )}
          {aba === 'skills' && (
            <SkillForm skills={perfil.skills} onAdicionar={adicionarSkill} onRemover={removerSkill} />
          )}
          {aba === 'experiencias' && (
            <ExperienciaForm experiencias={perfil.experiencias} onAdicionar={adicionarExperiencia} onRemover={removerExperiencia} />
          )}
          {aba === 'projetos' && (
            <ProjetoForm projetos={perfil.projetos} onAdicionar={adicionarProjeto} onRemover={removerProjeto} />
          )}
          {aba === 'formacao' && (
            <FormacaoSection formacao={perfil.formacao} onAdicionar={adicionarFormacao} onRemover={removerFormacao} />
          )}
        </div>
      </main>
    </div>
  )
}
