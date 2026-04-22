import { useState } from 'react'
import Button from '../shared/Button.jsx'

const categorias = ['frontend', 'backend', 'dados', 'devops', 'mobile', 'design', 'outro']

export default function SkillForm({ skills, onAdicionar, onRemover }) {
  const [nome, setNome] = useState('')
  const [categoria, setCategoria] = useState('frontend')

  function handleAdd(e) {
    e.preventDefault()
    if (!nome.trim()) return
    onAdicionar({ nome: nome.trim(), categoria })
    setNome('')
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleAdd} className="flex gap-2 flex-wrap sm:flex-nowrap">
        <input
          type="text"
          value={nome}
          onChange={e => setNome(e.target.value)}
          placeholder="Ex: React, Python, Docker..."
          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-w-0"
        />
        <select
          value={categoria}
          onChange={e => setCategoria(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
        >
          {categorias.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <Button type="submit" disabled={!nome.trim()}>Adicionar</Button>
      </form>

      {skills.length === 0 ? (
        <p className="text-sm text-gray-400 py-2">
          Nenhuma skill adicionada ainda. Adicione suas habilidades técnicas para melhorar a compatibilidade com vagas.
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {skills.map(skill => (
            <span
              key={skill.id}
              className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 text-sm font-medium px-3 py-1 rounded-full"
            >
              {skill.nome}
              <span className="text-indigo-400 text-xs">({skill.categoria})</span>
              <button
                type="button"
                onClick={() => onRemover(skill.id)}
                className="text-indigo-400 hover:text-red-500 ml-0.5 transition-colors"
                aria-label={`Remover ${skill.nome}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
