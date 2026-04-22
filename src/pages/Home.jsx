import { Link } from 'react-router-dom'
import Header from '../components/shared/Header.jsx'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-20 text-center">
        <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full mb-6 uppercase tracking-wider">
          Currículo Inteligente
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-5">
          Destaque-se em cada<br />
          <span className="text-indigo-600">vaga que importa</span>
        </h1>
        <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto leading-relaxed">
          Cole a descrição da vaga, veja sua compatibilidade e exporte um currículo
          personalizado com suas skills mais relevantes em destaque.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
          <Link
            to="/perfil"
            className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors text-base"
          >
            Criar meu perfil
            <span>→</span>
          </Link>
          <Link
            to="/nova-vaga"
            className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors text-base"
          >
            Gerar currículo para vaga
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          {[
            {
              icon: '👤',
              title: '1. Monte seu perfil',
              desc: 'Adicione suas skills, experiências, projetos e formação uma única vez.',
            },
            {
              icon: '🔍',
              title: '2. Cole a vaga',
              desc: 'Colamos a descrição da vaga e identificamos automaticamente as palavras-chave.',
            },
            {
              icon: '📄',
              title: '3. Exporte o currículo',
              desc: 'Seu currículo é reorganizado para destacar o que mais importa para aquela vaga.',
            },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-white rounded-xl border border-gray-200 p-5">
              <span className="text-2xl">{icon}</span>
              <h3 className="font-semibold text-gray-900 mt-3 mb-1">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
