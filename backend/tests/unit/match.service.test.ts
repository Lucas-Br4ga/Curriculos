import { calcularMatch } from '../../src/services/match.service'
import { mockPerfilCompleto, mockPerfilVazio } from '../fixtures/perfil.fixture'

describe('calcularMatch', () => {
  it('retorna pontuacao 0 quando não há keywords', () => {
    const result = calcularMatch(mockPerfilCompleto, [])
    expect(result.pontuacao).toBe(0)
    expect(result.keywordsMatch).toHaveLength(0)
    expect(result.keywordsFaltantes).toHaveLength(0)
  })

  it('retorna pontuacao 0 com perfil vazio', () => {
    const result = calcularMatch(mockPerfilVazio, ['react', 'typescript'])
    expect(result.pontuacao).toBe(0)
    expect(result.keywordsMatch).toHaveLength(0)
  })

  it('identifica keywords que batem com skills', () => {
    const result = calcularMatch(mockPerfilCompleto, ['react', 'typescript', 'python'])
    expect(result.keywordsMatch).toContain('react')
    expect(result.keywordsMatch).toContain('typescript')
    expect(result.keywordsFaltantes).toContain('python')
  })

  it('identifica keywords que batem com tecnologias de experiências', () => {
    const result = calcularMatch(mockPerfilCompleto, ['graphql', 'jest'])
    expect(result.keywordsMatch).toContain('graphql')
    expect(result.keywordsMatch).toContain('jest')
  })

  it('identifica keywords que batem com tecnologias de projetos', () => {
    const result = calcularMatch(mockPerfilCompleto, ['postgresql'])
    expect(result.keywordsMatch).toContain('postgresql')
  })

  it('pontuacao máxima de 100 quando perfil tem todas as keywords', () => {
    const result = calcularMatch(mockPerfilCompleto, ['react', 'typescript'])
    expect(result.pontuacao).toBeGreaterThan(0)
    expect(result.pontuacao).toBeLessThanOrEqual(100)
  })

  it('breakdown tem skills, experiencias e projetos', () => {
    const result = calcularMatch(mockPerfilCompleto, ['react', 'typescript'])
    expect(result.breakdown).toHaveProperty('skills')
    expect(result.breakdown).toHaveProperty('experiencias')
    expect(result.breakdown).toHaveProperty('projetos')
  })

  it('é case-insensitive', () => {
    const result = calcularMatch(mockPerfilCompleto, ['REACT', 'TYPESCRIPT'])
    expect(result.keywordsMatch.map(k => k.toLowerCase())).toContain('react')
  })
})
