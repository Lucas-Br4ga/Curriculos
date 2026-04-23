import request from 'supertest'
import app from '../../src/app'
import { prisma } from '../../src/lib/prisma'

const testUser = {
  nome: 'Teste User',
  email: `test-${Date.now()}@curriculofit.test`,
  senha: 'Senha@123',
}

afterAll(async () => {
  await prisma.user.deleteMany({ where: { email: { contains: '@curriculofit.test' } } })
  await prisma.$disconnect()
})

describe('POST /auth/register', () => {
  it('cria conta e retorna accessToken', async () => {
    const res = await request(app).post('/auth/register').send(testUser)
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('accessToken')
    expect(res.body.user.email).toBe(testUser.email)
  })

  it('retorna 409 para e-mail já cadastrado', async () => {
    const res = await request(app).post('/auth/register').send(testUser)
    expect(res.status).toBe(409)
    expect(res.body.error).toBe('EMAIL_IN_USE')
  })

  it('retorna 400 para e-mail inválido', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ ...testUser, email: 'invalido' })
    expect(res.status).toBe(400)
    expect(res.body.error).toBe('VALIDATION_ERROR')
  })

  it('retorna 400 para senha fraca', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ ...testUser, email: 'outro@test.com', senha: '123' })
    expect(res.status).toBe(400)
    expect(res.body.error).toBe('VALIDATION_ERROR')
  })
})

describe('POST /auth/login', () => {
  it('retorna accessToken com credenciais válidas', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: testUser.email, senha: testUser.senha })
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('accessToken')
  })

  it('retorna 401 com senha incorreta', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: testUser.email, senha: 'senhaErrada' })
    expect(res.status).toBe(401)
    expect(res.body.error).toBe('INVALID_CREDENTIALS')
  })

  it('retorna 401 para e-mail inexistente', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'naoexiste@test.com', senha: 'Qualquer@1' })
    expect(res.status).toBe(401)
  })
})

describe('GET /perfil (autenticação)', () => {
  let accessToken: string

  beforeAll(async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: testUser.email, senha: testUser.senha })
    accessToken = res.body.accessToken
  })

  it('retorna 401 sem token', async () => {
    const res = await request(app).get('/perfil')
    expect(res.status).toBe(401)
    expect(res.body.error).toBe('UNAUTHORIZED')
  })

  it('retorna perfil com token válido', async () => {
    const res = await request(app)
      .get('/perfil')
      .set('Authorization', `Bearer ${accessToken}`)
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('email', testUser.email)
  })
})
