import { useState } from 'react'

export default function TagInput({ tags = [], onAdd, onRemove, placeholder = 'Digite e pressione Enter' }) {
  const [valor, setValor] = useState('')

  function handleKey(e) {
    if ((e.key === 'Enter' || e.key === ',') && valor.trim()) {
      e.preventDefault()
      onAdd(valor.trim())
      setValor('')
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {tags.map((tag) => (
          <span
            key={tag.id ?? tag}
            className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 text-xs font-medium px-2.5 py-1 rounded-full"
          >
            {tag.nome ?? tag}
            <button
              type="button"
              onClick={() => onRemove(tag.id ?? tag)}
              className="text-indigo-400 hover:text-indigo-700 leading-none"
              aria-label={`Remover ${tag.nome ?? tag}`}
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={valor}
        onChange={e => setValor(e.target.value)}
        onKeyDown={handleKey}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />
      <p className="text-xs text-gray-400 mt-1">Pressione Enter ou vírgula para adicionar</p>
    </div>
  )
}
