'use client'
// app/auth/login/page.tsx
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useSearchParams()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const callbackUrl = router.get('callbackUrl') || '/dashboard'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    const res = await signIn('credentials', {
      email:    form.email,
      password: form.password,
      redirect: false,
    })
    setLoading(false)
    if (res?.error) { setError('E-posta veya şifre hatalı.'); return }
    window.location.href = callbackUrl
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4"
         style={{ background: 'radial-gradient(ellipse 60% 50% at 30% 30%, rgba(0,194,255,0.04) 0%, transparent 60%)' }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-extrabold tracking-tight">
            Proxy<span className="text-accent">Zen</span>
          </Link>
        </div>

        <div className="card p-8">
          <h1 className="text-2xl font-bold mb-1">Tekrar hoş geldin</h1>
          <p className="text-gray-400 text-sm mb-7">Hesabına giriş yap</p>

          {/* Google */}
          <button onClick={() => signIn('google', { callbackUrl })}
            className="w-full flex items-center justify-center gap-3 bg-surface2 border border-border2
                       text-white py-2.5 rounded-xl text-sm font-semibold hover:border-accent transition-all mb-6">
            <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="" />
            Google ile Giriş Yap
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-border2" /><span className="text-xs text-gray-600">ya da e-posta ile</span><div className="flex-1 h-px bg-border2" />
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-danger/10 border border-danger/20 text-danger px-4 py-2.5 rounded-xl text-sm mb-5">
              <i className="fa fa-exclamation-circle" /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">E-posta</label>
              <input type="email" className="input" placeholder="ornek@mail.com" required
                value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label className="label" style={{marginBottom:0}}>Şifre</label>
                <Link href="/auth/forgot-password" className="text-xs text-accent hover:opacity-80">Unuttum</Link>
              </div>
              <input type="password" className="input" placeholder="••••••••" required
                value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
            </div>
            <button type="submit" disabled={loading}
              className="btn-primary w-full justify-center py-3 rounded-xl mt-2 disabled:opacity-50">
              {loading ? <><i className="fa fa-spinner fa-spin" /> Giriş yapılıyor...</> : 'Giriş Yap'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Hesabın yok mu? <Link href="/auth/register" className="text-accent hover:opacity-80 font-semibold">Kayıt Ol</Link>
          </p>

          <div className="mt-5 p-3 bg-surface2 rounded-xl text-xs text-gray-500 text-center border border-border">
            Demo: <span className="text-accent font-mono">demo@proxyzen.io</span> / <span className="text-neon font-mono">Demo@123456</span>
          </div>
        </div>
      </div>
    </div>
  )
}
