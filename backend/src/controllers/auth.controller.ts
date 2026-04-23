import { Request, Response, NextFunction } from 'express'
import * as authService from '../services/auth.service'

const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: '/',
}

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { accessToken, refreshToken, user } = await authService.register(req.body)
    res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTIONS)
    res.status(201).json({ accessToken, user })
  } catch (err) {
    next(err)
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { accessToken, refreshToken, user } = await authService.login(req.body)
    res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTIONS)
    res.json({ accessToken, user })
  } catch (err) {
    next(err)
  }
}

export async function refresh(req: Request, res: Response, next: NextFunction) {
  try {
    const refreshToken = req.cookies?.refreshToken as string | undefined
    if (!refreshToken) {
      res.status(401).json({ error: 'UNAUTHORIZED', message: 'Refresh token não encontrado' })
      return
    }
    const { accessToken } = await authService.refresh(refreshToken)
    res.json({ accessToken })
  } catch (err) {
    next(err)
  }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    const refreshToken = req.cookies?.refreshToken as string | undefined
    await authService.logout(req.user!.id, refreshToken)
    res.clearCookie('refreshToken', { path: '/' })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
}
