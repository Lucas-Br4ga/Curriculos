import { prisma } from '../lib/prisma'
import { AppError } from '../middlewares/errorHandler.middleware'

export interface AtualizarPerfilInput {
  nome?: string
  email?: string
  telefone?: string
  cidade?: string
  linkedin?: string
  github?: string
  skills?: Array<{
    id?: string
    nome: string
    categoria: string
    nivel?: string
    ordem?: number
  }>
  experiencias?: Array<{
    id?: string
    cargo: string
    empresa: string
    periodoInicio: string
    periodoFim?: string | null
    atual?: boolean
    descricao?: string
    tecnologias?: string[]
    ordem?: number
  }>
  projetos?: Array<{
    id?: string
    nome: string
    descricao?: string
    link?: string
    tecnologias?: string[]
    ordem?: number
  }>
  formacoes?: Array<{
    id?: string
    curso: string
    instituicao: string
    periodoInicio?: string | null
    periodoFim?: string | null
    atual?: boolean
  }>
}

export async function getPerfil(userId: string) {
  const perfil = await prisma.perfil.findUnique({
    where: { userId },
    include: {
      skills: { orderBy: { ordem: 'asc' } },
      experiencias: { orderBy: { ordem: 'asc' } },
      projetos: { orderBy: { ordem: 'asc' } },
      formacoes: true,
    },
  })

  if (!perfil) throw new AppError(404, 'NOT_FOUND', 'Perfil não encontrado')
  return perfil
}

export async function atualizarPerfil(userId: string, input: AtualizarPerfilInput) {
  const perfil = await prisma.perfil.findUnique({ where: { userId } })
  if (!perfil) throw new AppError(404, 'NOT_FOUND', 'Perfil não encontrado')

  return prisma.$transaction(async (tx) => {
    await tx.perfil.update({
      where: { userId },
      data: {
        nome: input.nome,
        email: input.email,
        telefone: input.telefone,
        cidade: input.cidade,
        linkedin: input.linkedin,
        github: input.github,
      },
    })

    if (input.skills !== undefined) {
      await tx.skill.deleteMany({ where: { perfilId: perfil.id } })
      if (input.skills.length > 0) {
        await tx.skill.createMany({
          data: input.skills.map((s, i) => ({
            perfilId: perfil.id,
            nome: s.nome,
            categoria: s.categoria,
            nivel: s.nivel ?? 'intermediario',
            ordem: s.ordem ?? i,
          })),
        })
      }
    }

    if (input.experiencias !== undefined) {
      await tx.experiencia.deleteMany({ where: { perfilId: perfil.id } })
      if (input.experiencias.length > 0) {
        await tx.experiencia.createMany({
          data: input.experiencias.map((e, i) => ({
            perfilId: perfil.id,
            cargo: e.cargo,
            empresa: e.empresa,
            periodoInicio: new Date(e.periodoInicio),
            periodoFim: e.periodoFim ? new Date(e.periodoFim) : null,
            atual: e.atual ?? false,
            descricao: e.descricao,
            tecnologias: e.tecnologias ?? [],
            ordem: e.ordem ?? i,
          })),
        })
      }
    }

    if (input.projetos !== undefined) {
      await tx.projeto.deleteMany({ where: { perfilId: perfil.id } })
      if (input.projetos.length > 0) {
        await tx.projeto.createMany({
          data: input.projetos.map((p, i) => ({
            perfilId: perfil.id,
            nome: p.nome,
            descricao: p.descricao,
            link: p.link,
            tecnologias: p.tecnologias ?? [],
            ordem: p.ordem ?? i,
          })),
        })
      }
    }

    if (input.formacoes !== undefined) {
      await tx.formacao.deleteMany({ where: { perfilId: perfil.id } })
      if (input.formacoes.length > 0) {
        await tx.formacao.createMany({
          data: input.formacoes.map((f) => ({
            perfilId: perfil.id,
            curso: f.curso,
            instituicao: f.instituicao,
            periodoInicio: f.periodoInicio ? new Date(f.periodoInicio) : null,
            periodoFim: f.periodoFim ? new Date(f.periodoFim) : null,
            atual: f.atual ?? false,
          })),
        })
      }
    }

    return getPerfil(userId)
  })
}
