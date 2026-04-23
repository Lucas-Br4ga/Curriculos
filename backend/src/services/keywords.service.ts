const TERMOS_TECNICOS = new Set([
  // Frontend
  'react', 'vue', 'angular', 'svelte', 'next.js', 'nuxt', 'remix', 'gatsby',
  'typescript', 'javascript', 'html', 'css', 'sass', 'scss', 'less',
  'tailwind', 'bootstrap', 'material ui', 'chakra ui', 'styled-components',
  'redux', 'zustand', 'mobx', 'recoil', 'tanstack query', 'react query',
  'webpack', 'vite', 'parcel', 'rollup', 'esbuild',
  'jest', 'vitest', 'testing library', 'cypress', 'playwright',
  'graphql', 'apollo', 'rest', 'axios', 'fetch',
  'pwa', 'websocket', 'webrtc', 'canvas', 'svg',
  // Backend
  'node.js', 'express', 'fastify', 'nestjs', 'koa', 'hapi',
  'python', 'django', 'flask', 'fastapi',
  'java', 'spring', 'spring boot', 'quarkus',
  'go', 'gin', 'fiber',
  'rust', 'actix',
  'php', 'laravel', 'symfony',
  'ruby', 'rails',
  'c#', '.net', 'asp.net',
  'c++', 'c',
  // Banco de dados
  'postgresql', 'mysql', 'sqlite', 'mongodb', 'redis', 'elasticsearch',
  'dynamodb', 'cassandra', 'neo4j', 'supabase', 'firebase',
  'prisma', 'typeorm', 'sequelize', 'mongoose', 'knex',
  'sql', 'nosql',
  // DevOps
  'docker', 'kubernetes', 'k8s', 'terraform', 'ansible', 'vagrant',
  'aws', 'gcp', 'azure', 'heroku', 'vercel', 'netlify', 'railway',
  'ec2', 's3', 'lambda', 'rds', 'cloudfront',
  'ci/cd', 'github actions', 'gitlab ci', 'jenkins', 'circleci',
  'nginx', 'apache', 'caddy',
  'linux', 'bash', 'shell',
  // Dados
  'machine learning', 'deep learning', 'nlp', 'llm',
  'tensorflow', 'pytorch', 'keras', 'scikit-learn',
  'pandas', 'numpy', 'matplotlib', 'seaborn',
  'spark', 'hadoop', 'kafka', 'airflow', 'dbt',
  'power bi', 'tableau', 'looker',
  'data science', 'data engineering', 'analytics',
  // Mobile
  'react native', 'flutter', 'dart', 'swift', 'kotlin', 'ionic',
  'expo', 'android', 'ios',
  // Ferramentas
  'git', 'github', 'gitlab', 'bitbucket',
  'jira', 'confluence', 'notion', 'figma',
  'postman', 'insomnia', 'swagger', 'openapi',
  'agile', 'scrum', 'kanban',
  // Soft skills técnicas
  'tdd', 'bdd', 'ddd', 'solid', 'clean code', 'design patterns',
  'microservices', 'monolith', 'api', 'sdk',
  'segurança', 'security', 'oauth', 'jwt', 'sso',
  'performance', 'escalabilidade', 'disponibilidade',
])

const TERMOS_AMBIGUOS = new Set(['go', 'c', 'r', 'java', 'rust', 'node.js'])

function gerarBigramas(texto: string): Set<string> {
  const bigramas = new Set<string>()
  const palavras = texto.split(/\s+/)
  for (let i = 0; i < palavras.length - 1; i++) {
    bigramas.add(`${palavras[i]} ${palavras[i + 1]}`)
  }
  // Trigramas para termos como "react native", "machine learning"
  for (let i = 0; i < palavras.length - 2; i++) {
    bigramas.add(`${palavras[i]} ${palavras[i + 1]} ${palavras[i + 2]}`)
  }
  return bigramas
}

export function extrairKeywords(textoVaga: string): string[] {
  const texto = textoVaga
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[,;.()\[\]{}"']/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  const palavras = new Set(texto.split(/\s+/))
  const ngramas = gerarBigramas(texto)
  const resultado = new Set<string>()

  for (const termo of TERMOS_TECNICOS) {
    if (TERMOS_AMBIGUOS.has(termo)) {
      if (new RegExp(`\\b${termo.replace('.', '\\.')}\\b`).test(texto)) {
        resultado.add(termo)
      }
    } else if (termo.includes(' ')) {
      if (ngramas.has(termo)) resultado.add(termo)
    } else if (palavras.has(termo)) {
      resultado.add(termo)
    }
  }

  return Array.from(resultado).sort()
}
