import { prisma } from '../lib/prisma'
import { AppError } from '../middlewares/errorHandler.middleware'
import { extrairKeywords } from './keywords.service'
import { calcularMatch } from './match.service'
import { gerarCurriculo } from './curriculo.service'

export interface CriarVagaInput {
  titulo?: string
  empresa?: string
  descricaoVaga: string
}

export interface ListarVagasQuery {
  pagina?: number
  porPagina?: number
  ordem?: string
  busca?: string
}

export async function listarVagas(userId: string, query: ListarVagasQuery) {
  const pagina = query.pagina ?? 1
  const porPagina = Math.min(query.porPagina ?? 20, 100)
  const skip = (pagina - 1) * porPagina

  const where = {
    userId,
    ...(query.busca
      ? {
          OR: [
            { titulo: { contains: query.busca, mode: 'insensitive' as const } },
            { empresa: { contains: query.busca, mode: 'insensitive' as const } },
          ],
        }
      : {}),
  }

  const orderBy = query.ordem === 'data_desc'
    ? { criadoEm: 'desc' as const }
    : query.ordem === 'data_asc'
    ? { criadoEm: 'asc' as const }
    : query.ordem === 'pontuacao_asc'
    ? { pontuacao: 'asc' as const }
    : { pontuacao: 'desc' as const }

  const [total, vagas] = await Promise.all([
    prisma.vaga.count({ where }),
    prisma.vaga.findMany({
      where,
      orderBy,
      skip,
      take: porPagina,
      select: {
        id: true,
        titulo: true,
        empresa: true,
        pontuacao: true,
        keywords: true,
        keywordsMatch: true,
        keywordsFaltantes: true,
        breakdown: true,
        criadoEm: true,
      },
    }),
  ])

  return { total, pagina, porPagina, vagas }
}

export async function getVaga(userId: string, vagaId: string) {
  const vaga = await prisma.vaga.findFirst({ where: { id: vagaId, userId } })
  if (!vaga) throw new AppError(404, 'NOT_FOUND', 'Vaga não encontrada')
  return vaga
}

export async function criarVaga(userId: string, input: CriarVagaInput) {
  const perfil = await prisma.perfil.findUnique({
    where: { userId },
    include: {
      skills: true,
      experiencias: true,
      projetos: true,
      formacoes: true,
    },
  })

  if (!perfil) throw new AppError(404, 'NOT_FOUND', 'Perfil não encontrado. Complete seu perfil antes de analisar vagas.')

  const keywords = extrairKeywords(input.descricaoVaga)
  const matchResult = calcularMatch(perfil, keywords)
  const curriculoGerado = gerarCurriculo(perfil, keywords)

  const vaga = await prisma.vaga.create({
    data: {
      userId,
      titulo: input.titulo ?? 'Vaga sem título',
      empresa: input.empresa,
      descricaoOriginal: input.descricaoVaga,
      keywords,
      keywordsMatch: matchResult.keywordsMatch,
      keywordsFaltantes: matchResult.keywordsFaltantes,
      pontuacao: matchResult.pontuacao,
      breakdown: matchResult.breakdown,
      curriculoJson: curriculoGerado,
    },
  })

  return {
    ...vaga,
    curriculoGerado,
  }
}

export async function deletarVaga(userId: string, vagaId: string) {
  const vaga = await prisma.vaga.findFirst({ where: { id: vagaId, userId } })
  if (!vaga) throw new AppError(404, 'NOT_FOUND', 'Vaga não encontrada')
  await prisma.vaga.delete({ where: { id: vagaId } })
}
