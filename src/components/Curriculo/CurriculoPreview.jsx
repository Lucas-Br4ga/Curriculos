import SkillBadge from './SkillBadge.jsx'
import SecaoExperiencia from './SecaoExperiencia.jsx'
import SecaoProjeto from './SecaoProjeto.jsx'

function Divider({ titulo }) {
  return (
    <div className="flex items-center gap-2 mb-3 mt-5">
      <p className="text-xs font-bold uppercase tracking-widest text-indigo-600 whitespace-nowrap">{titulo}</p>
      <div className="flex-1 h-px bg-indigo-100" />
    </div>
  )
}

export default function CurriculoPreview({ curriculo }) {
  if (!curriculo) return null

  const { dadosPessoais: d, skillsPrioritarias, skillsSecundarias, experiencias, projetos, formacao } = curriculo

  return (
    <div
      id="curriculo-preview"
      className="curriculo-a4 bg-white p-10 font-sans text-gray-900"
      style={{ width: 794, minHeight: 1123 }}
    >
      {/* Cabeçalho */}
      <div className="border-b-2 border-indigo-600 pb-5 mb-2">
        <h1 className="text-2xl font-bold text-gray-900">{d.nome}</h1>
        {d.cidade && <p className="text-sm text-gray-500 mt-0.5">{d.cidade}</p>}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-gray-600">
          {d.email    && <span>{d.email}</span>}
          {d.telefone && <span>{d.telefone}</span>}
          {d.linkedin && <span>{d.linkedin}</span>}
          {d.github   && <span>{d.github}</span>}
        </div>
      </div>

      {/* Skills */}
      {(skillsPrioritarias?.length > 0 || skillsSecundarias?.length > 0) && (
        <>
          <Divider titulo="Habilidades" />
          <div className="flex flex-wrap gap-1.5">
            {skillsPrioritarias?.map(s => (
              <SkillBadge key={s.id} nome={s.nome} match={true} />
            ))}
            {skillsSecundarias?.map(s => (
              <SkillBadge key={s.id} nome={s.nome} match={false} />
            ))}
          </div>
        </>
      )}

      {/* Experiências */}
      {experiencias?.length > 0 && (
        <>
          <Divider titulo="Experiência Profissional" />
          {experiencias.map(exp => (
            <SecaoExperiencia key={exp.id} experiencia={exp} />
          ))}
        </>
      )}

      {/* Projetos */}
      {projetos?.length > 0 && (
        <>
          <Divider titulo="Projetos" />
          {projetos.map(proj => (
            <SecaoProjeto key={proj.id} projeto={proj} />
          ))}
        </>
      )}

      {/* Formação */}
      {formacao?.length > 0 && (
        <>
          <Divider titulo="Formação Acadêmica" />
          {formacao.map(f => (
            <div key={f.id} className="mb-3">
              <div className="flex justify-between items-baseline flex-wrap gap-1">
                <p className="font-semibold text-gray-900 text-sm">{f.curso}</p>
                <p className="text-xs text-gray-500">{f.periodo}</p>
              </div>
              <p className="text-sm text-gray-600">{f.instituicao}</p>
            </div>
          ))}
        </>
      )}
    </div>
  )
}
