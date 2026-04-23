import { Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from './components/shared/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Home from './pages/Home'
import PerfilPage from './pages/PerfilPage'
import NovaVagaPage from './pages/NovaVagaPage'
import PreviewPage from './pages/PreviewPage'
import HistoricoPage from './pages/HistoricoPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/perfil" element={<PerfilPage />} />
        <Route path="/nova-vaga" element={<NovaVagaPage />} />
        <Route path="/preview/:id" element={<PreviewPage />} />
        <Route path="/historico" element={<HistoricoPage />} />
      </Route>
    </Routes>
  )
}
