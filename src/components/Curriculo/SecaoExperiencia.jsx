export default function SecaoExperiencia({ experiencia }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-baseline flex-wrap gap-1">
        <p className="font-semibold text-gray-900 text-sm">{experiencia.cargo}</p>
        <p className="text-xs text-gray-500">{experiencia.periodo}</p>
      </div>
      <p className="text-sm text-gray-600 font-medium">{experiencia.empresa}</p>
      {experiencia.descricao && (
        <p className="text-xs text-gray-600 mt-1 leading-relaxed">{experiencia.descricao}</p>
      )}
      {experiencia.tecnologias?.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-1.5">
          {experiencia.tecnologias.map(t => (
            <span key={t} className="text-[11px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{t}</span>
          ))}
        </div>
      )}
    </div>
  )
}
