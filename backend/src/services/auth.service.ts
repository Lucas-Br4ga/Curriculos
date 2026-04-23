import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { prisma } from '../lib/prisma'
import { AppError } from '../middlewares/errorHandler.middleware'

const SALT_ROUNDS = 12

export interface RegisterInput {
  nome: string
  email: string
  senha: string
}

export interface LoginInput {
  email: string
  senha: string
}

export interface TokenPair {
  accessToken: string
  refreshToken: string
}

function generateAccessToken(userId: string, email: string): string {
  return jwt.sign({ sub: userId, email }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN ?? '15m',
  })
}

function generateRefreshToken(userId: string): string {
  return jwt.sign({ sub: userId }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN ?? '7d',
  })
}

export async function register(input: RegisterInput) {
  const existing = await prisma.user.findUnique({ where: { email: input.email } })
  if (existing) {
    throw new AppError(409, 'EMAIL_IN_USE', 'E-mail já cadastrado')
  }

  const senhaHash = await bcrypt.hash(input.senha, SALT_ROUNDS)
  const user = await prisma.user.create({
    data: { nome: input.nome, email: input.email, senhaHash },
    select: { id: true, nome: true, email: true, criadoEm: true },
  })

  await prisma.perfil.create({
    data: {
      userId: user.id,
      nome: user.nome,
      email: user.email,
    },
  })

  const accessToken = generateAccessToken(user.id, user.email)
  const refreshToken = generateRefreshToken(user.id)

  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 7)
  await prisma.refreshToken.create({ data: { token: refreshToken, userId: user.id, expiresAt } })

  return { accessToken, refreshToken, user }
}

export async function login(input: LoginInput) {
  const user = await prisma.user.findUnique({ where: { email: input.email } })
  if (!user || !user.ativo) {
    throw new AppError(401, 'INVALID_CREDENTIALS', 'E-mail ou senha incorretos')
  }

  const senhaValida = await bcrypt.compare(input.senha, user.senhaHash)
  if (!senhaValida) {
    throw new AppError(401, 'INVALID_CREDENTIALS', 'E-mail ou senha incorretos')
  }

  const accessToken = generateAccessToken(user.id, user.email)
  const refreshToken = generateRefreshToken(user.id)

  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 7)
  await prisma.refreshToken.create({ data: { token: refreshToken, userId: user.id, expiresAt } })

  return {
    accessToken,
    refreshToken,
    user: { id: user.id, nome: user.nome, email: user.email },
  }
}

export async function refresh(refreshToken: string) {
  let payload: { sub: string }
  try {
    payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as { sub: string }
  } catch {
    throw new AppError(401, 'INVALID_TOKEN', 'Refresh token inválido ou expirado')
  }

  const stored = await prisma.refreshToken.findUnique({ where: { token: refreshToken } })
  if (!stored || stored.expiresAt < new Date()) {
    throw new AppError(401, 'INVALID_TOKEN', 'Refresh token revogado ou expirado')
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.sub },
    select: { id: true, email: true, ativo: true },
  })
  if (!user || !user.ativo) {
    throw new AppError(401, 'UNAUTHORIZED', 'Usuário inativo')
  }

  const newAccessToken = generateAccessToken(user.id, user.email)
  return { accessToken: newAccessToken }
}

export async function logout(userId: string, refreshToken?: string) {
  if (refreshToken) {
    await prisma.refreshToken.deleteMany({ where: { token: refreshToken } })
  } else {
    await prisma.refreshToken.deleteMany({ where: { userId } })
  }
}
