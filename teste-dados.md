# CurriculoFit — Dados de Teste

## Perfil: Lucas Mendes

### Dados Pessoais

| Campo     | Valor                          |
|-----------|--------------------------------|
| Nome      | Lucas Mendes                   |
| E-mail    | lucas.mendes@gmail.com         |
| Telefone  | (31) 99812-4477                |
| Cidade    | Belo Horizonte, MG             |
| LinkedIn  | linkedin.com/in/lucasmendes    |
| GitHub    | github.com/lucasmendes         |

---

### Skills

| Skill        | Categoria |
|--------------|-----------|
| React        | frontend  |
| TypeScript   | frontend  |
| Next.js      | frontend  |
| Tailwind     | frontend  |
| Node.js      | backend   |
| PostgreSQL   | backend   |
| Jest         | backend   |
| GraphQL      | backend   |
| Python       | backend   |
| Docker       | devops    |
| Git          | devops    |
| AWS          | devops    |

---

### Experiências

**Desenvolvedor Frontend Pleno — Zup Innovation**
- Período: Mar 2023 – Presente
- Descrição: Desenvolvimento de micro-frontends com React e TypeScript, integração com APIs REST e GraphQL, testes automatizados com Jest e Cypress. Redução de 40% no tempo de carregamento por meio de code splitting e lazy loading.
- Tecnologias: React, TypeScript, GraphQL, Jest, Docker

**Desenvolvedor Frontend Júnior — Hotmart**
- Período: Jan 2021 – Fev 2023
- Descrição: Construção de interfaces responsivas com React e Tailwind CSS, manutenção de design system interno, colaboração direta com designers via Figma.
- Tecnologias: React, Tailwind, Node.js, Git

---

### Projetos

**DevBoard** — `github.com/lucasmendes/devboard`
- Descrição: Dashboard de monitoramento de deploys em tempo real usando Next.js, WebSockets e PostgreSQL. Suporta múltiplos ambientes (dev/staging/prod).
- Tecnologias: Next.js, PostgreSQL, Docker, TypeScript

**APIShield** — `github.com/lucasmendes/apishield`
- Descrição: Middleware de rate-limiting e autenticação JWT para APIs Node.js, com painel administrativo em React.
- Tecnologias: Node.js, React, JWT, Redis

**MLPrice** — `github.com/lucasmendes/mlprice`
- Descrição: Modelo de previsão de preços de imóveis usando Python e scikit-learn, com API FastAPI e deploy na AWS.
- Tecnologias: Python, scikit-learn, FastAPI, AWS

---

### Formação

**Sistemas de Informação — PUC Minas**
- Período: 2019 – 2023

---

## Vaga de Teste: Dev Frontend Sênior — Nubank

**Título:** Dev Frontend Sênior — Nubank

**Descrição:**

```
Nubank — Engenheiro(a) de Software Frontend Sênior

Sobre a vaga:
Estamos buscando um(a) engenheiro(a) frontend sênior apaixonado(a) por criar
produtos financeiros que transformam a vida das pessoas.

Responsabilidades:
- Desenvolver e manter aplicações web de alta performance usando React e TypeScript
- Trabalhar com Next.js para SSR e geração de páginas estáticas
- Colaborar com designers usando Figma para garantir fidelidade ao design system
- Escrever testes automatizados com Jest e Cypress
- Participar de code reviews e disseminar boas práticas de frontend
- Integrar com APIs REST e GraphQL
- Contribuir com o design system interno baseado em Tailwind CSS
- Otimizar performance, acessibilidade e SEO das aplicações

Requisitos obrigatórios:
- Sólida experiência com React e TypeScript (3+ anos)
- Domínio de Next.js e conceitos de SSR/SSG
- Experiência com testes (Jest, Cypress ou similares)
- Conhecimento de GraphQL e REST APIs
- Versionamento com Git e GitHub
- Familiaridade com Docker para ambientes de desenvolvimento

Diferenciais:
- Experiência com AWS ou outros provedores de cloud
- Conhecimento de Node.js para BFFs (Backend for Frontend)
- Experiência com PostgreSQL
- Conhecimento de CI/CD e GitHub Actions

Benefícios:
- Salário competitivo + equity
- 100% remoto
- Plano de saúde e odontológico premium
- Auxílio home-office
```

---

## Resultado Esperado

| Métrica               | Valor                        |
|-----------------------|------------------------------|
| Score de match        | ~55%                         |
| Label                 | Compatibilidade moderada     |
| Skills que batem      | React, TypeScript, Next.js, Tailwind, Node.js, PostgreSQL, Docker, Git, Jest, GraphQL, AWS |
| Skills para estudar   | Cypress, Figma, CI/CD        |
| Projetos no currículo | DevBoard, APIShield, MLPrice |
| Experiência 1ª        | Zup Innovation (mais relevante) |


Tudo tem que rodos no wsl


cd /mnt/c/Users/Lucas/OneDrive/Desktop/Projects/My/CurriculoFit
docker compose up -d postgres redis


cd /mnt/c/Users/Lucas/OneDrive/Desktop/Projects/My/CurriculoFit
docker compose down




# Sobe banco + redis
docker compose up -d postgres redis

# Backend

cd backend && npm install && npx prisma migrate dev && npm run dev

# Frontend (em outro terminal)

cp .env.example .env && npm install && npm run dev
