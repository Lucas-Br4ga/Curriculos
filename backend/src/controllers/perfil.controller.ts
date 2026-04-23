import { Request, Response, NextFunction } from 'express'
import * as perfilService from '../services/perfil.service'

export async function getPerfil(req: Request, res: Response, next: NextFunction) {
  try {
    const perfil = await perfilService.getPerfil(req.user!.id)
    res.json(perfil)
  } catch (err) {
    next(err)
  }
}

export async function atualizarPerfil(req: Request, res: Response, next: NextFunction) {
  try {
    const perfil = await perfilService.atualizarPerfil(req.user!.id, req.body)
    res.json(perfil)
  } catch (err) {
    next(err)
  }
}
