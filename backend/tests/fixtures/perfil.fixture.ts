import type { PerfilParaMatch } from '../../src/services/match.service'

export const mockPerfilCompleto: PerfilParaMatch = {
  skills: [
    { id: 'skl-1', perfilId: 'prf-1', nome: 'React', categoria: 'frontend', nivel: 'avancado', ordem: 0 },
    { id: 'skl-2', perfilId: 'prf-1', nome: 'TypeScript', categoria: 'frontend', nivel: 'avancado', ordem: 1 },
    { id: 'skl-3', perfilId: 'prf-1', nome: 'Node.js', categoria: 'backend', nivel: 'intermediario', ordem: 2 },
    { id: 'skl-4', perfilId: 'prf-1', nome: 'PostgreSQL', categoria: 'backend', nivel: 'intermediario', ordem: 3 },
  ],
  experiencias: [
    {
      id: 'exp-1',
      perfilId: 'prf-1',
      cargo: 'Dev Frontend Pleno',
      empresa: 'Zup',
      periodoInicio: new Date('2023-03-01'),
      periodoFim: null,
      atual: true,
      descricao: 'Desenvolvimento com React e TypeScript',
      tecnologias: ['React', 'TypeScript', 'GraphQL', 'Jest'],
      ordem: 0,
    },
  ],
  projetos: [
    {
      id: 'proj-1',
      perfilId: 'prf-1',
      nome: 'App de finanças',
      descricao: 'App pessoal',
      link: 'github.com/x',
      tecnologias: ['React', 'Node.js', 'PostgreSQL'],
      ordem: 0,
    },
  ],
}

export const mockPerfilVazio: PerfilParaMatch = {
  skills: [],
  experiencias: [],
  projetos: [],
}
