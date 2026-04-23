import { extrairKeywords } from '../../src/services/keywords.service'

describe('extrairKeywords', () => {
  it('extrai termos técnicos básicos', () => {
    const keywords = extrairKeywords('Vaga para dev com React e TypeScript e Node.js')
    expect(keywords).toContain('react')
    expect(keywords).toContain('typescript')
    expect(keywords).toContain('node.js')
  })

  it('não confunde Java com JavaScript', () => {
    const keywords = extrairKeywords('Experiência com Java e Spring Boot obrigatório')
    expect(keywords).toContain('java')
    expect(keywords).not.toContain('javascript')
  })

  it('não inclui JavaScript quando só tem Java', () => {
    const texto = 'Desenvolvedor Java senior com Spring Boot'
    const keywords = extrairKeywords(texto)
    expect(keywords).toContain('java')
    const temJS = keywords.some(k => k === 'javascript')
    expect(temJS).toBe(false)
  })

  it('captura termos compostos como next.js', () => {
    const keywords = extrairKeywords('Precisamos de alguém com Next.js e React')
    expect(keywords).toContain('next.js')
  })

  it('é case-insensitive', () => {
    const keywords = extrairKeywords('REACT, TYPESCRIPT, DOCKER')
    expect(keywords).toContain('react')
    expect(keywords).toContain('typescript')
    expect(keywords).toContain('docker')
  })

  it('retorna array vazio para texto sem termos técnicos', () => {
    const keywords = extrairKeywords('Empresa de logística precisa de motorista')
    expect(keywords).toHaveLength(0)
  })

  it('remove duplicatas', () => {
    const keywords = extrairKeywords('React e React e React')
    const count = keywords.filter((k) => k === 'react').length
    expect(count).toBe(1)
  })

  it('captura Docker e Kubernetes', () => {
    const keywords = extrairKeywords('Ambiente em Docker e Kubernetes (k8s)')
    expect(keywords).toContain('docker')
    expect(keywords).toContain('kubernetes')
  })
})
