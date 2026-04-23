export interface ApiError {
  error: string
  message: string
  details?: Array<{ campo: string; mensagem: string }>
}

export interface User {
  id: string
  nome: string
  email: string
}

export interface AuthResponse {
  accessToken: string
  user: User
}

export interface RegisterInput {
  nome: string
  email: string
  senha: string
}

export interface LoginInput {
  email: string
  senha: string
}
