const TERMOS_TECNICOS = [
  'react', 'vue', 'angular', 'svelte', 'javascript', 'typescript',
  'node', 'node.js', 'python', 'java', 'php', 'ruby', 'go', 'golang',
  'rust', 'c#', 'c++', 'kotlin', 'swift', 'dart', 'flutter',
  'css', 'html', 'sass', 'scss', 'less', 'tailwind', 'bootstrap',
  'sql', 'mongodb', 'postgresql', 'mysql', 'sqlite', 'redis',
  'graphql', 'rest', 'api', 'docker', 'kubernetes', 'k8s',
  'aws', 'azure', 'gcp', 'firebase', 'supabase', 'vercel', 'netlify',
  'git', 'github', 'gitlab', 'ci/cd', 'jenkins', 'github actions',
  'figma', 'jest', 'vitest', 'cypress', 'testing', 'tdd',
  'next', 'next.js', 'nuxt', 'gatsby', 'remix',
  'express', 'fastapi', 'django', 'flask', 'spring', 'laravel',
  'linux', 'bash', 'shell', 'terraform', 'ansible',
  'machine learning', 'deep learning', 'tensorflow', 'pytorch',
  'pandas', 'numpy', 'scikit-learn', 'data science',
  'agile', 'scrum', 'kanban', 'jira', 'confluence',
  'websocket', 'microservices', 'devops', 'sre',
  'react native', 'expo', 'electron', 'pwa',
]

export function extrairKeywords(textoVaga) {
  const texto = textoVaga.toLowerCase()
  return TERMOS_TECNICOS.filter(termo => texto.includes(termo))
}
