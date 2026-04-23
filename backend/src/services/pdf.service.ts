import puppeteer from 'puppeteer'

export async function gerarPDF(htmlCurriculo: string): Promise<Buffer> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  })

  try {
    const page = await browser.newPage()
    await page.setContent(htmlCurriculo, { waitUntil: 'networkidle0' })
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
    })
    return Buffer.from(pdf)
  } finally {
    await browser.close()
  }
}

export function gerarHtmlCurriculo(curriculo: Record<string, unknown>): string {
  const dados = curriculo.dadosPessoais as Record<string, string> | undefined
  const skills = curriculo.skillsPrioritarias as Array<{ nome: string }> | undefined
  const skillsSecundarias = curriculo.skillsSecundarias as Array<{ nome: string }> | undefined
  const experiencias = curriculo.experiencias as Array<{
    cargo: string
    empresa: string
    descricao?: string
    tecnologias?: string[]
    atual?: boolean
    periodoInicio?: string
    periodoFim?: string
  }> | undefined
  const projetos = curriculo.projetos as Array<{
    nome: string
    descricao?: string
    tecnologias?: string[]
    link?: string
  }> | undefined

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Currículo — ${dados?.nome ?? ''}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; color: #1f2937; font-size: 11pt; line-height: 1.5; padding: 32px 40px; }
    h1 { font-size: 22pt; color: #111827; margin-bottom: 4px; }
    .contact { color: #6b7280; font-size: 9.5pt; display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 20px; }
    h2 { font-size: 13pt; color: #4f46e5; border-bottom: 2px solid #e5e7eb; margin: 16px 0 8px; padding-bottom: 4px; text-transform: uppercase; letter-spacing: 0.05em; }
    .skills { display: flex; flex-wrap: wrap; gap: 6px; }
    .badge { background: #ede9fe; color: #5b21b6; padding: 3px 10px; border-radius: 12px; font-size: 9pt; font-weight: 500; }
    .badge.secondary { background: #f3f4f6; color: #6b7280; }
    .exp { margin-bottom: 14px; }
    .exp-header { display: flex; justify-content: space-between; align-items: baseline; }
    .exp-header strong { font-size: 11.5pt; }
    .exp-header span { font-size: 9pt; color: #9ca3af; }
    .exp p { color: #4b5563; font-size: 10pt; margin-top: 4px; }
    .techs { margin-top: 4px; display: flex; flex-wrap: wrap; gap: 4px; }
    .tech { background: #f0fdf4; color: #166534; font-size: 8.5pt; padding: 1px 7px; border-radius: 8px; }
  </style>
</head>
<body>
  <h1>${dados?.nome ?? ''}</h1>
  <div class="contact">
    ${dados?.email ? `<span>${dados.email}</span>` : ''}
    ${dados?.telefone ? `<span>${dados.telefone}</span>` : ''}
    ${dados?.cidade ? `<span>${dados.cidade}</span>` : ''}
    ${dados?.linkedin ? `<span>${dados.linkedin}</span>` : ''}
    ${dados?.github ? `<span>${dados.github}</span>` : ''}
  </div>

  ${skills?.length ? `
  <h2>Skills — Destaque para esta vaga</h2>
  <div class="skills">
    ${skills.map((s) => `<span class="badge">${s.nome}</span>`).join('')}
  </div>` : ''}

  ${skillsSecundarias?.length ? `
  <h2>Outras Skills</h2>
  <div class="skills">
    ${skillsSecundarias.map((s) => `<span class="badge secondary">${s.nome}</span>`).join('')}
  </div>` : ''}

  ${experiencias?.length ? `
  <h2>Experiência Profissional</h2>
  ${experiencias.map((e) => `
  <div class="exp">
    <div class="exp-header">
      <strong>${e.cargo} — ${e.empresa}</strong>
      <span>${e.atual ? 'Atual' : (e.periodoFim ?? '')}</span>
    </div>
    ${e.descricao ? `<p>${e.descricao}</p>` : ''}
    ${e.tecnologias?.length ? `<div class="techs">${e.tecnologias.map((t) => `<span class="tech">${t}</span>`).join('')}</div>` : ''}
  </div>`).join('')}` : ''}

  ${projetos?.length ? `
  <h2>Projetos</h2>
  ${projetos.map((p) => `
  <div class="exp">
    <div class="exp-header">
      <strong>${p.nome}</strong>
      ${p.link ? `<span>${p.link}</span>` : ''}
    </div>
    ${p.descricao ? `<p>${p.descricao}</p>` : ''}
    ${p.tecnologias?.length ? `<div class="techs">${p.tecnologias.map((t) => `<span class="tech">${t}</span>`).join('')}</div>` : ''}
  </div>`).join('')}` : ''}
</body>
</html>`
}
