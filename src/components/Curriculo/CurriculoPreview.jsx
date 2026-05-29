// src/components/Curriculo/CurriculoPreview.jsx
import { useRef, useEffect, useState } from 'react'
import SkillBadge from './SkillBadge.jsx'
import SecaoExperiencia from './SecaoExperiencia.jsx'
import SecaoProjeto from './SecaoProjeto.jsx'

const A4_WIDTH = 794

function Divider({ titulo }) {
  return (
    <div className="flex items-center gap-2 mb-3 mt-5">
      <p className="text-xs font-bold uppercase tracking-widest text-indigo-600 whitespace-nowrap">
        {titulo}
      </p>
      <div className="flex-1 h-px bg-indigo-100" />
    </div>
  )
}

export default function CurriculoPreview({ curriculo }) {
  const wrapperRef = useRef(null)
  const [escala, setEscala] = useState(1)

  useEffect(() => {
    if (!wrapperRef.current) return

    const observer = new ResizeObserver(([entry]) => {
      const larguraDisponivel = entry.contentRect.width
      if (larguraDisponivel > 0) {
        setEscala(Math.min(1, larguraDisponivel / A4_WIDTH))
      }
    })

    observer.observe(wrapperRef.current)
    return () => observer.disconnect()
  }, [])

  if (!curriculo) return null

  const {
    dadosPessoais: d,
    skillsPrioritarias,
    skillsSecundarias,
    experiencias,
    projetos,
    formacao,
  } = curriculo

  // Altura escalada para o wrapper externo não colapsar
  const alturaEscalada = 1123 * escala

  return (
    /* Wrapper externo: ocupa 100% da largura disponível e altura proporcional */
    <div ref={wrapperRef} style={{ width: '100%', height: alturaEscalada, position: 'relative' }}>
      {/* Elemento real A4 — sempre 794px, escalado via transform */}
      <div
        id="curriculo-preview"
        className="bg-white p-10 font-sans text-gray-900"
        style={{
          width: A4_WIDTH,
          minHeight: 1123,
          transformOrigin: 'top left',
          transform: `scale(${escala})`,
          position: 'absolute',
          top: 0,
          left: 0,
        }}
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
                  <p className="text-xs text-gray-500">
                    {f.periodoInicio
                      ? `${f.periodoInicio}${f.periodoFim ? ` – ${f.periodoFim}` : f.atual ? ' – Atual' : ''}`
                      : f.periodo ?? ''}
                  </p>
                </div>
                <p className="text-sm text-gray-600">{f.instituicao}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}