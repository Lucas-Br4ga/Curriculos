import { z } from 'zod'

const skillSchema = z.object({
  id: z.string().optional(),
  nome: z.string().min(1).max(60),
  categoria: z.enum(['frontend', 'backend', 'devops', 'dados', 'mobile', 'design', 'outro']),
  nivel: z.enum(['basico', 'intermediario', 'avancado']).default('intermediario'),
  ordem: z.number().int().default(0),
})

const experienciaSchema = z.object({
  id: z.string().optional(),
  cargo: z.string().min(2).max(100),
  empresa: z.string().min(2).max(100),
  periodoInicio: z.string().datetime({ offset: true }).or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
  periodoFim: z.string().datetime({ offset: true }).or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).nullable().optional(),
  atual: z.boolean().default(false),
  descricao: z.string().max(2000).optional(),
  tecnologias: z.array(z.string()).default([]),
  ordem: z.number().int().default(0),
})

const projetoSchema = z.object({
  id: z.string().optional(),
  nome: z.string().min(1).max(100),
  descricao: z.string().max(1000).optional(),
  link: z.string().url().optional().or(z.literal('')),
  tecnologias: z.array(z.string()).default([]),
  ordem: z.number().int().default(0),
})

const formacaoSchema = z.object({
  id: z.string().optional(),
  curso: z.string().min(2).max(150),
  instituicao: z.string().min(2).max(150),
  periodoInicio: z.string().datetime({ offset: true }).or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).nullable().optional(),
  periodoFim: z.string().datetime({ offset: true }).or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).nullable().optional(),
  atual: z.boolean().default(false),
})

export const atualizarPerfilSchema = z.object({
  nome: z.string().min(2).max(100).optional(),
  email: z.string().email().optional(),
  telefone: z.string().max(20).optional(),
  cidade: z.string().max(100).optional(),
  linkedin: z.string().max(200).optional(),
  github: z.string().max(200).optional(),
  skills: z.array(skillSchema).optional(),
  experiencias: z.array(experienciaSchema).optional(),
  projetos: z.array(projetoSchema).optional(),
  formacoes: z.array(formacaoSchema).optional(),
})

export type AtualizarPerfilInput = z.infer<typeof atualizarPerfilSchema>
