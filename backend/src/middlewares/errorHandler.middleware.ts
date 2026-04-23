import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'
import { Prisma } from '@prisma/client'

export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly error: string,
    message: string,
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof ZodError) {
    res.status(400).json({
      error: 'VALIDATION_ERROR',
      message: 'Dados inválidos na requisição',
      details: err.errors.map((e) => ({ campo: e.path.join('.'), mensagem: e.message })),
    })
    return
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.error, message: err.message })
    return
  }

  if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err.code === 'P2002'
  ) {
    res.status(409).json({ error: 'CONFLICT', message: 'Registro já existe' })
    return
  }

  if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err.code === 'P2025'
  ) {
    res.status(404).json({ error: 'NOT_FOUND', message: 'Registro não encontrado' })
    return
  }

  console.error('[ERROR]', err)
  res.status(500).json({
    error: 'INTERNAL_ERROR',
    message: 'Ocorreu um erro interno. Nossa equipe foi notificada.',
  })
}
