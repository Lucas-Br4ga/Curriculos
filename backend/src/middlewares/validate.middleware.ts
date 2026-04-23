import { Request, Response, NextFunction } from 'express'
import { ZodSchema, ZodError } from 'zod'

export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body)
      next()
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json({
          error: 'VALIDATION_ERROR',
          message: 'Dados inválidos na requisição',
          details: err.errors.map((e) => ({
            campo: e.path.join('.'),
            mensagem: e.message,
          })),
        })
        return
      }
      next(err)
    }
  }
}
