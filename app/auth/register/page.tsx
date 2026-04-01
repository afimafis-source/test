'use client'
// app/auth/register/page.tsx
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    if (!res.ok) { setError(data.error); setLoading(false); return }
    await signIn('credentials', { email: form.email, password: form.password, callbackUrl: '/dashboard' })
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4"
         style={{ background: 'radial-gradient(ellipse 60% 50% at 70% 70%, rgba(123,94,167,0.05) 0%, transparent 60%)' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-extrabold tracking-tight">
            Proxy<span className="text-accent">Zen</span>
          </Link>
        </div>

        <div className="card p-8">
          <h1 className="text-2xl font-bold mb-1">Ücretsiz başla</h1>
          <p className="text-gray-400 text-sm mb-7">Kredi kartı gerekmez · 1 günlük deneme</p>

          <button onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            className="w-full flex items-center justify-center gap-3 bg-surface2 border border-border2
                       text-white py-2.5 rounded-xl text-sm font-semibold hover:border-accent transition-all mb-6">
            <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="" />
            Google ile Kayıt Ol
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-border2" />
            <span className="text-xs text-gray-600">ya da e-posta ile</span>
            <div className="flex-1 h-px bg-border2" />
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-danger/10 border border-danger/20 text-danger px-4 py-2.5 rounded-xl text-sm mb-5">
              <i className="fa fa-exclamation-circle" /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Ad Soyad</label>
              <input type="text" className="input" placeholder="Ahmet Yılmaz" required minLength={2}
                value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            </div>
            <div>
              <label className="label">E-posta</label>
              <input type="email" className="input" placeholder="ornek@mail.com" required
                value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            </div>
            <div>
              <label className="label">Şifre <span className="text-gray-600 font-normal">(min. 8 karakter)</span></label>
              <input type="password" className="input" placeholder="••••••••" required minLength={8}
                value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
            </div>
            <button type="submit" disabled={loading}
              className="btn-primary w-full justify-center py-3 rounded-xl mt-2 disabled:opacity-50">
              {loading ? <><i className="fa fa-spinner fa-spin" /> Hesap oluşturuluyor...</> : 'Hesap Oluştur'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Zaten üye misin? <Link href="/auth/login" className="text-accent hover:opacity-80 font-semibold">Giriş Yap</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
