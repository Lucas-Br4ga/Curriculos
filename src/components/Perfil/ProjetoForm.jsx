import { useState } from 'react'
import InputField from '../shared/InputField.jsx'
import Button from '../shared/Button.jsx'
import TagInput from '../shared/TagInput.jsx'

const vazio = { nome: '', descricao: '', tecnologias: [], link: '' }

export default function ProjetoForm({ projetos, onAdicionar, onRemover }) {
  const [form, setForm] = useState(vazio)
  const [aberto, setAberto] = useState(false)

  function set(campo, valor) {
    setForm(prev => ({ ...prev, [campo]: valor }))
  }

  function addTec(tec) {
    if (!form.tecnologias.includes(tec)) set('tecnologias', [...form.tecnologias, tec])
  }

  function removeTec(tec) {
    set('tecnologias', form.tecnologias.filter(t => t !== tec))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.nome.trim()) return
    onAdicionar(form)
    setForm(vazio)
    setAberto(false)
  }

  return (
    <div className="space-y-4">
      {projetos.length === 0 && !aberto && (
        <p className="text-sm text-gray-400 py-2">
          Nenhum projeto adicionado. Até 3 projetos mais relevantes para a vaga serão incluídos no currículo.
        </p>
      )}

      {projetos.map(proj => (
        <div key={proj.id} className="border border-gray-200 rounded-lg p-4 bg-white">
          <div className="flex justify-between items-start gap-2">
            <div>
              <p className="font-medium text-gray-900">{proj.nome}</p>
              {proj.descricao && <p className="text-sm text-gray-500 mt-1 line-clamp-2">{proj.descricao}</p>}
              {proj.link && <p className="text-xs text-indigo-600 mt-1">{proj.link}</p>}
              {proj.tecnologias.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {proj.tecnologias.map(t => (
                    <span key={t} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{t}</span>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => onRemover(proj.id)}
              className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0 text-sm"
            >
              Remover
            </button>
          </div>
        </div>
      ))}

      {aberto ? (
        <form onSubmit={handleSubmit} className="border border-indigo-200 rounded-lg p-4 bg-indigo-50/30 space-y-3">
          <p className="font-medium text-gray-800 text-sm">Novo projeto</p>
          <InputField label="Nome do projeto *" id="proj-nome" value={form.nome} onChange={e => set('nome', e.target.value)} placeholder="Sistema de Agendamento" required />
          <InputField label="Descrição" id="proj-desc" textarea value={form.descricao} onChange={e => set('descricao', e.target.value)} placeholder="Descreva o projeto, seu objetivo e impacto..." rows={3} />
          <InputField label="Link (GitHub, deploy, etc.)" id="proj-link" value={form.link} onChange={e => set('link', e.target.value)} placeholder="github.com/usuario/projeto" />
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Tecnologias</p>
            <TagInput tags={form.tecnologias.map(t => ({ id: t, nome: t }))} onAdd={addTec} onRemove={removeTec} placeholder="React, Firebase..." />
          </div>
          <div className="flex gap-2 pt-1">
            <Button type="submit" disabled={!form.nome.trim()}>Salvar projeto</Button>
            <Button type="button" variant="secondary" onClick={() => { setAberto(false); setForm(vazio) }}>Cancelar</Button>
          </div>
        </form>
      ) : (
        <Button variant="secondary" onClick={() => setAberto(true)}>+ Adicionar projeto</Button>
      )}
    </div>
  )
}
