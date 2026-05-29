# CurriculoFit

Gerador de currículos personalizados por vaga. Você cadastra seu perfil uma única vez — skills, experiências, projetos e formação — e, para cada vaga que te interessa, cola a descrição. O sistema extrai as palavras-chave automaticamente, calcula sua compatibilidade e reorganiza o currículo para destacar o que mais importa para aquela posição específica.

## Como funciona

1. **Monte seu perfil** — preencha suas informações pessoais, skills (com nível e categoria), experiências profissionais, projetos e formação acadêmica.
2. **Cole a vaga** — informe o título e a descrição completa da vaga. O sistema identifica as tecnologias e requisitos mencionados.
3. **Receba seu currículo** — um score de compatibilidade é calculado e o currículo é gerado com suas skills mais relevantes em destaque. As experiências são reordenadas por relevância para aquela vaga.
4. **Exporte em PDF** — baixe o currículo pronto para enviar.

## Tecnologias

**Frontend**
- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router v6
- TanStack Query (React Query)
- Zustand
- React Hook Form + Zod
- Axios
- jsPDF + html2canvas

**Backend**
- Node.js (≥ 20) + TypeScript
- Express 5
- Prisma ORM
- PostgreSQL
- Redis (rate limiting e cache)
- JWT (access token + refresh token via cookie)
- Puppeteer (geração de PDF server-side)
- Zod (validação de schemas)
- Helmet, express-rate-limit

**Testes (backend)**
- Jest + ts-jest
- Supertest (testes de integração)

## Pré-requisitos

- Node.js ≥ 20
- PostgreSQL
- Redis
- pnpm, npm ou yarn

## Instalação

Clone o repositório e instale as dependências de cada parte separadamente.

```bash
git clone https://github.com/seu-usuario/curriculofit.git
cd curriculofit
```

**Frontend**
```bash
npm install
```

**Backend**
```bash
cd backend
npm install
```

## Configuração

### Frontend

Crie um arquivo `.env` na raiz do projeto frontend:

```env
VITE_API_URL=http://localhost:3333
```

### Backend

Crie um arquivo `.env` dentro da pasta `backend/`:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/curriculofit"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="sua-chave-secreta-aqui"
JWT_REFRESH_SECRET="sua-chave-refresh-aqui"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"
PORT=3333
```

### Banco de dados

```bash
cd backend
npm run db:migrate     # aplica as migrations
npm run db:generate    # gera o Prisma Client
npm run db:seed        # opcional: popula com dados de exemplo
```

## Rodando o projeto

**Backend** (porta 3333 por padrão)
```bash
cd backend
npm run dev
```

**Frontend** (porta 5173 por padrão)
```bash
# na raiz do projeto
npm run dev
```

Acesse `http://localhost:5173`.

## Scripts disponíveis

### Frontend

| Comando | Descrição |
|---|---|
| `npm run dev` | Sobe o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm run preview` | Visualiza o build localmente |
| `npm run lint` | Roda o ESLint |
| `npm run type-check` | Checa os tipos TypeScript sem compilar |

### Backend

| Comando | Descrição |
|---|---|
| `npm run dev` | Sobe a API em modo watch |
| `npm run build` | Compila o TypeScript |
| `npm run start` | Sobe a API a partir do build |
| `npm run test` | Roda todos os testes |
| `npm run test:watch` | Testes em modo watch |
| `npm run test:coverage` | Testes com relatório de cobertura |
| `npm run lint` | Roda o ESLint |
| `npm run db:migrate` | Aplica migrations em desenvolvimento |
| `npm run db:migrate:prod` | Aplica migrations em produção |
| `npm run db:studio` | Abre o Prisma Studio |
| `npm run db:seed` | Popula o banco com dados de exemplo |

## Estrutura de pastas

```
curriculofit/
├── src/                        # Frontend
│   ├── api/                    # Cliente HTTP (Axios + interceptors JWT)
│   ├── components/
│   │   ├── Curriculo/          # Componentes de visualização do currículo
│   │   ├── Perfil/             # Formulários de perfil (skills, experiências, projetos)
│   │   └── shared/             # Button, InputField, TagInput, Header...
│   ├── hooks/                  # usePerfil, useVagas
│   ├── pages/                  # Home, PerfilPage, NovaVagaPage, PreviewPage, HistoricoPage
│   ├── types/                  # Tipos TypeScript (perfil.types.ts)
│   └── utils/                  # extrairKeywords, calcularMatch, gerarCurriculo, exportarPDF
│
└── backend/
    ├── src/
    │   ├── controllers/        # perfil, vagas, auth
    │   ├── middlewares/        # auth, validate, rateLimiter
    │   ├── routes/             # perfil.routes, vagas.routes, auth.routes
    │   ├── schemas/            # Schemas Zod
    │   ├── services/           # keywords, curriculo, match, pdf, vagas
    │   └── lib/                # prisma client
    ├── tests/
    │   ├── fixtures/           # Mocks reutilizáveis
    │   ├── integration/        # Testes de rotas com Supertest
    │   └── unit/               # Testes unitários de services
    └── prisma/
        ├── schema.prisma
        └── seed.ts
```

## API — Endpoints principais

Todas as rotas abaixo (exceto `/auth/*`) exigem o header `Authorization: Bearer <token>`.

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/auth/register` | Cria uma conta |
| `POST` | `/auth/login` | Autentica e retorna access token |
| `POST` | `/auth/refresh` | Renova o access token via refresh cookie |
| `GET` | `/perfil` | Retorna o perfil completo do usuário |
| `PUT` | `/perfil` | Atualiza perfil (skills, experiências, projetos, formação) |
| `POST` | `/vagas` | Analisa uma vaga e gera o currículo personalizado |
| `GET` | `/vagas` | Lista o histórico de vagas analisadas |
| `GET` | `/vagas/:id` | Retorna uma vaga específica com o currículo gerado |
| `DELETE` | `/vagas/:id` | Remove uma vaga do histórico |
| `GET` | `/vagas/:id/pdf` | Faz download do currículo em PDF |

## Rate limiting

A API aplica limites automáticos para evitar abuso:

- Rotas gerais: 100 requisições por minuto por IP
- Rotas de autenticação (`/auth/*`): 10 tentativas a cada 15 minutos por IP

## Lógica de geração do currículo

O algoritmo de personalização funciona da seguinte forma:

1. **Extração de keywords** — o texto da vaga é normalizado (lowercase, sem acentos) e comparado contra um dicionário de ~150 termos técnicos. Bigramas e trigramas são considerados para capturar termos compostos como "React Native" ou "machine learning". Termos ambíguos como "Java" e "JavaScript" têm tratamento especial para evitar falsos positivos.

2. **Cálculo de match** — o score é baseado na proporção de keywords da vaga que correspondem às skills do perfil. Experiências e projetos que usam as tecnologias pedidas aumentam o peso do candidato.

3. **Ordenação do currículo** — skills que aparecem na vaga ficam no topo. Experiências são reordenadas por relevância (quantidade de tecnologias em comum com a vaga). Os 3 projetos mais relevantes são selecionados.

## Dados de exemplo

O arquivo `teste-dados.md` na raiz do projeto contém um perfil completo de exemplo (Lucas Mendes) e uma vaga de teste (Dev Frontend Sênior — Nubank) com o resultado esperado de compatibilidade (~55%), útil para validar o comportamento do sistema manualmente.

## Licença

MIT
