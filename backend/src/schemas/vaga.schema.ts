import { z } from 'zod'

export const criarVagaSchema = z.object({
  titulo: z.string().min(3).max(200).optional(),
  empresa: z.string().min(1).max(100).optional(),
  descricaoVaga: z
    .string()
    .min(50, 'A descrição precisa ter pelo menos 50 caracteres')
    .max(10_000, 'Descrição muito longa'),
})

export const listarVagasSchema = z.object({
  pagina: z.coerce.number().int().positive().default(1),
  porPagina: z.coerce.number().int().positive().max(100).default(20),
  ordem: z.enum(['pontuacao_desc', 'pontuacao_asc', 'data_desc', 'data_asc']).default('pontuacao_desc'),
  busca: z.string().optional(),
})

export type CriarVagaInput = z.infer<typeof criarVagaSchema>
