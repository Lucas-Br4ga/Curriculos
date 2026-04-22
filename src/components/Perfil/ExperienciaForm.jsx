import { useState } from 'react'
import InputField from '../shared/InputField.jsx'
import Button from '../shared/Button.jsx'
import TagInput from '../shared/TagInput.jsx'

const vazio = { empresa: '', cargo: '', periodo: '', descricao: '', tecnologias: [] }

export default function ExperienciaForm({ experiencias, onAdicionar, onRemover }) {
  const [form, setForm] = useState(vazio)
  const [aberto, setAberto] = useState(false)

  function set(campo, valor) {
    setForm(prev => ({ ...prev, [campo]: valor }))
  }

  function addTec(tec) {
    if (!form.tecnologias.includes(tec)) {
      set('tecnologias', [...form.tecnologias, tec])
    }
  }

  function removeTec(tec) {
    set('tecnologias', form.tecnologias.filter(t => t !== tec))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.empresa.trim() || !form.cargo.trim()) return
    onAdicionar(form)
    setForm(vazio)
    setAberto(false)
  }

  return (
    <div className="space-y-4">
      {experiencias.length === 0 && !aberto && (
        <p className="text-sm text-gray-400 py-2">
          Nenhuma experiência adicionada. Suas experiências profissionais serão priorizadas conforme a vaga.
        </p>
      )}

      {experiencias.map(exp => (
        <div key={exp.id} className="border border-gray-200 rounded-lg p-4 bg-white">
          <div className="flex justify-between items-start gap-2">
            <div>
              <p className="font-medium text-gray-900">{exp.cargo}</p>
              <p className="text-sm text-gray-600">{exp.empresa} · {exp.periodo}</p>
              {exp.descricao && <p className="text-sm text-gray-500 mt-1 line-clamp-2">{exp.descricao}</p>}
              {exp.tecnologias.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {exp.tecnologias.map(t => (
                    <span key={t} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{t}</span>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => onRemover(exp.id)}
              className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0 text-sm"
              aria-label="Remover experiência"
            >
              Remover
            </button>
          </div>
        </div>
      ))}

      {aberto ? (
        <form onSubmit={handleSubmit} className="border border-indigo-200 rounded-lg p-4 bg-indigo-50/30 space-y-3">
          <p className="font-medium text-gray-800 text-sm">Nova experiência</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InputField label="Empresa *" id="empresa" value={form.empresa} onChange={e => set('empresa', e.target.value)} placeholder="Empresa X" required />
            <InputField label="Cargo *" id="cargo" value={form.cargo} onChange={e => set('cargo', e.target.value)} placeholder="Dev Júnior" required />
            <InputField label="Período" id="periodo" value={form.periodo} onChange={e => set('periodo', e.target.value)} placeholder="Jan 2023 - Dez 2023" />
          </div>
          <InputField label="Descrição" id="descricao" textarea value={form.descricao} onChange={e => set('descricao', e.target.value)} placeholder="Descreva suas principais responsabilidades e conquistas..." rows={3} />
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Tecnologias usadas</p>
            <TagInput tags={form.tecnologias.map(t => ({ id: t, nome: t }))} onAdd={addTec} onRemove={removeTec} placeholder="React, Node.js, PostgreSQL..." />
          </div>
          <div className="flex gap-2 pt-1">
            <Button type="submit" disabled={!form.empresa.trim() || !form.cargo.trim()}>Salvar experiência</Button>
            <Button type="button" variant="secondary" onClick={() => { setAberto(false); setForm(vazio) }}>Cancelar</Button>
          </div>
        </form>
      ) : (
        <Button variant="secondary" onClick={() => setAberto(true)}>+ Adicionar experiência</Button>
      )}
    </div>
  )
}
