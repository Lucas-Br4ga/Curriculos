import { useState } from 'react'
import InputField from '../shared/InputField.jsx'
import Button from '../shared/Button.jsx'

export default function DadosPessoaisForm({ dados, onSalvar }) {
  const [form, setForm] = useState(dados)
  const [salvo, setSalvo] = useState(false)

  function set(campo, valor) {
    setForm(prev => ({ ...prev, [campo]: valor }))
    setSalvo(false)
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSalvar(form)
    setSalvo(true)
    setTimeout(() => setSalvo(false), 3000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          label="Nome completo *"
          id="nome"
          value={form.nome}
          onChange={e => set('nome', e.target.value)}
          placeholder="João Silva"
          required
        />
        <InputField
          label="E-mail *"
          id="email"
          type="email"
          value={form.email}
          onChange={e => set('email', e.target.value)}
          placeholder="joao@email.com"
          required
        />
        <InputField
          label="Telefone"
          id="telefone"
          value={form.telefone}
          onChange={e => set('telefone', e.target.value)}
          placeholder="(31) 99999-9999"
        />
        <InputField
          label="Cidade"
          id="cidade"
          value={form.cidade}
          onChange={e => set('cidade', e.target.value)}
          placeholder="Belo Horizonte, MG"
        />
        <InputField
          label="LinkedIn"
          id="linkedin"
          value={form.linkedin}
          onChange={e => set('linkedin', e.target.value)}
          placeholder="linkedin.com/in/joaosilva"
        />
        <InputField
          label="GitHub"
          id="github"
          value={form.github}
          onChange={e => set('github', e.target.value)}
          placeholder="github.com/joaosilva"
        />
      </div>
      <div className="flex items-center gap-3">
        <Button type="submit">Salvar dados pessoais</Button>
        {salvo && <span className="text-sm text-green-600 font-medium">✓ Dados salvos com sucesso!</span>}
      </div>
    </form>
  )
}
