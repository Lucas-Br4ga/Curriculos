export default function SecaoProjeto({ projeto }) {
  return (
    <div className="mb-4">
      <div className="flex items-baseline gap-2 flex-wrap">
        <p className="font-semibold text-gray-900 text-sm">{projeto.nome}</p>
        {projeto.link && (
          <span className="text-xs text-indigo-600">{projeto.link}</span>
        )}
      </div>
      {projeto.descricao && (
        <p className="text-xs text-gray-600 mt-1 leading-relaxed">{projeto.descricao}</p>
      )}
      {projeto.tecnologias?.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-1.5">
          {projeto.tecnologias.map(t => (
            <span key={t} className="text-[11px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{t}</span>
          ))}
        </div>
      )}
    </div>
  )
}
