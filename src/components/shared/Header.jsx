import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/',          label: 'Início' },
  { to: '/perfil',    label: 'Meu Perfil' },
  { to: '/nova-vaga', label: 'Nova Vaga' },
  { to: '/historico', label: 'Histórico' },
]

export default function Header() {
  const { pathname } = useLocation()

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-indigo-600 text-lg">
          <span className="text-xl">📄</span>
          CurriculoFit
        </Link>
        <nav className="flex items-center gap-1">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                pathname === to
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
