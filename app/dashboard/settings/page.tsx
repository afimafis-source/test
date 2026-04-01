'use client'
// app/dashboard/settings/page.tsx
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import DashboardSidebar from '@/components/DashboardSidebar'

export default function SettingsPage() {
  const { data: session, status, update } = useSession()
  const router = useRouter()
  const user = session?.user as any
  const [name, setName] = useState(user?.name || '')
  const [pwForm, setPwForm] = useState({ current: '', next: '' })
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  async function updateProfile(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/dashboard/settings/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })
    if (res.ok) { setMsg({ type: 'success', text: 'Profil güncellendi.' }); await update({ name }) }
    else setMsg({ type: 'error', text: 'Güncelleme başarısız.' })
    setTimeout(() => setMsg(null), 3000)
  }

  async function updatePassword(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/dashboard/settings/password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ current_password: pwForm.current, new_password: pwForm.next }),
    })
    const d = await res.json()
    if (res.ok) { setMsg({ type: 'success', text: 'Şifre güncellendi.' }); setPwForm({ current: '', next: '' }) }
    else setMsg({ type: 'error', text: d.error || 'Hata oluştu.' })
    setTimeout(() => setMsg(null), 3000)
  }

  return (
    <>
      <Navbar />
      <div className="flex pt-16 min-h-screen">
        <DashboardSidebar />
        <main className="flex-1 ml-60 p-8 min-w-0">
          <div className="mb-8">
            <h1 className="text-2xl font-extrabold tracking-tight">Hesap Ayarları</h1>
          </div>

          {msg && (
            <div className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm mb-6 border ${msg.type === 'success' ? 'bg-neon/10 border-neon/20 text-neon' : 'bg-danger/10 border-danger/20 text-danger'}`}>
              <i className={`fa ${msg.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`} /> {msg.text}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Profile */}
            <div className="card">
              <h3 className="font-bold flex items-center gap-2 mb-6">
                <i className="fa fa-user text-accent" /> Profil Bilgileri
              </h3>
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                {user?.image ? (
                  <img src={user.image} className="w-16 h-16 rounded-2xl object-cover" alt="" />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center text-black font-bold text-2xl">
                    {user?.name?.[0]?.toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="font-bold">{user?.name}</p>
                  <p className="text-gray-400 text-sm">{user?.email}</p>
                  <span className="badge-green mt-1">E-posta doğrulandı</span>
                </div>
              </div>
              <form onSubmit={updateProfile} className="space-y-4">
                <div>
                  <label className="label">Ad Soyad</label>
                  <input type="text" className="input" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div>
                  <label className="label">E-posta <span className="text-gray-600 font-normal text-xs">(değiştirilemez)</span></label>
                  <input type="email" className="input opacity-50 cursor-not-allowed" value={user?.email || ''} disabled />
                </div>
                <button type="submit" className="btn-primary">Profili Güncelle</button>
              </form>
            </div>

            {/* Password */}
            <div className="card">
              <h3 className="font-bold flex items-center gap-2 mb-6">
                <i className="fa fa-lock text-gold" /> Şifre Değiştir
              </h3>
              <form onSubmit={updatePassword} className="space-y-4">
                <div>
                  <label className="label">Mevcut Şifre</label>
                  <input type="password" className="input" required value={pwForm.current} onChange={e => setPwForm({ ...pwForm, current: e.target.value })} />
                </div>
                <div>
                  <label className="label">Yeni Şifre</label>
                  <input type="password" className="input" required minLength={8} value={pwForm.next} onChange={e => setPwForm({ ...pwForm, next: e.target.value })} />
                  <p className="text-xs text-gray-600 mt-1">En az 8 karakter.</p>
                </div>
                <button type="submit" className="btn-primary">Şifreyi Güncelle</button>
              </form>

              {/* Danger zone */}
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-sm font-bold text-danger mb-2">⚠️ Tehlikeli Bölge</p>
                <p className="text-xs text-gray-500 mb-4">Hesabınızı silmek geri alınamaz. Tüm veriler kalıcı silinir.</p>
                <button className="btn-danger text-sm px-4 py-2"
                  onClick={() => alert('Demo modunda devre dışı.')}>
                  Hesabı Sil
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
