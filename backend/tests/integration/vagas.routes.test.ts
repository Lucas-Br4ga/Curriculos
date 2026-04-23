import request from 'supertest'
import app from '../../src/app'
import { prisma } from '../../src/lib/prisma'

const testEmail = `vagas-test-${Date.now()}@curriculofit.test`
let accessToken: string
let vagaId: string

beforeAll(async () => {
  const regRes = await request(app).post('/auth/register').send({
    nome: 'Vagas Tester',
    email: testEmail,
    senha: 'Senha@123',
  })
  accessToken = regRes.body.accessToken

  await request(app)
    .put('/perfil')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      skills: [
        { nome: 'React', categoria: 'frontend', nivel: 'avancado' },
        { nome: 'TypeScript', categoria: 'frontend', nivel: 'avancado' },
        { nome: 'Node.js', categoria: 'backend', nivel: 'intermediario' },
      ],
      experiencias: [
        {
          cargo: 'Dev Frontend',
          empresa: 'Empresa X',
          periodoInicio: '2022-01-01',
          atual: true,
          tecnologias: ['React', 'TypeScript', 'GraphQL'],
        },
      ],
      projetos: [],
    })
})

afterAll(async () => {
  await prisma.user.deleteMany({ where: { email: { contains: '@curriculofit.test' } } })
  await prisma.$disconnect()
})

describe('POST /vagas', () => {
  it('cria vaga e retorna currículo gerado', async () => {
    const res = await request(app)
      .post('/vagas')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        titulo: 'Dev Frontend Sênior',
        empresa: 'Nubank',
        descricaoVaga:
          'Precisamos de desenvolvedor com React e TypeScript, conhecimento em Next.js, ' +
          'GraphQL, testes com Jest e Cypress. Experiência com Node.js é um diferencial. ' +
          'Ambiente ágil com Scrum e CI/CD com GitHub Actions.',
      })

    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('pontuacao')
    expect(res.body).toHaveProperty('keywords')
    expect(res.body).toHaveProperty('keywordsMatch')
    expect(res.body.keywords).toContain('react')
    expect(res.body.keywords).toContain('typescript')
    vagaId = res.body.id
  })

  it('retorna 401 sem token', async () => {
    const res = await request(app).post('/vagas').send({ descricaoVaga: 'vaga teste' })
    expect(res.status).toBe(401)
  })

  it('retorna 400 quando descricaoVaga é muito curta', async () => {
    const res = await request(app)
      .post('/vagas')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ descricaoVaga: 'curta' })
    expect(res.status).toBe(400)
    expect(res.body.error).toBe('VALIDATION_ERROR')
  })
})

describe('GET /vagas', () => {
  it('lista vagas do usuário', async () => {
    const res = await request(app)
      .get('/vagas')
      .set('Authorization', `Bearer ${accessToken}`)
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('vagas')
    expect(Array.isArray(res.body.vagas)).toBe(true)
    expect(res.body).toHaveProperty('total')
  })
})

describe('DELETE /vagas/:id', () => {
  it('deleta vaga existente', async () => {
    const res = await request(app)
      .delete(`/vagas/${vagaId}`)
      .set('Authorization', `Bearer ${accessToken}`)
    expect(res.status).toBe(204)
  })

  it('retorna 404 para vaga inexistente', async () => {
    const res = await request(app)
      .delete('/vagas/id-inexistente-000')
      .set('Authorization', `Bearer ${accessToken}`)
    expect(res.status).toBe(404)
  })
})
