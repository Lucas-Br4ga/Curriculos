import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import PerfilPage from './pages/PerfilPage.jsx'
import NovaVagaPage from './pages/NovaVagaPage.jsx'
import PreviewPage from './pages/PreviewPage.jsx'
import HistoricoPage from './pages/HistoricoPage.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/"             element={<Home />} />
      <Route path="/perfil"       element={<PerfilPage />} />
      <Route path="/nova-vaga"    element={<NovaVagaPage />} />
      <Route path="/preview/:id"  element={<PreviewPage />} />
      <Route path="/historico"    element={<HistoricoPage />} />
    </Routes>
  )
}
