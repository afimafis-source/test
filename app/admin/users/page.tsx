'use client'
// app/admin/users/page.tsx
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const adminLinks = [
  { href: '/admin',               icon: 'fa-gauge',   label: 'Genel Bakış' },
  { href: '/admin/users',         icon: 'fa-users',   label: 'Kullanıcılar' },
  { href: '/admin/subscriptions', icon: 'fa-star',    label: 'Abonelikler' },
  { href: '/admin/tickets',       icon: 'fa-headset', label: 'Destek' },
  { href: '/admin/announcements', icon: 'fa-bell',    label: 'Duyurular' },
]

export default function AdminUsersPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [users, setUsers] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const limit = 15

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/auth/login')
    if (status === 'authenticated' && (session?.user as any)?.role !== 'admin') router.push('/dashboard')
  }, [status, session])

  useEffect(() => {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) })
    if (search) params.set('q', search)
    fetch(`/api/admin/users?${params}`).then(r => r.json()).then(d => {
      setUsers(d.users || [])
      setTotal(d.total || 0)
    })
  }, [page, search])

  const pages = Math.ceil(total / limit)

  return (
    <div className="min-h-screen bg-bg flex">
      <aside className="w-56 flex-shrink-0 bg-surface border-r border-border min-h-screen">
        <div className="p-4 border-b border-border">
          <Link href="/" className="text-xl font-extrabold">Proxy<span className="text-accent">Zen</span></Link>
          <span className="ml-2 text-xs font-bold bg-gold/10 border border-gold/20 text-gold px-2 py-0.5 rounded-full">ADMIN</span>
        </div>
        <div className="p-3 space-y-1 mt-2">
          {adminLinks.map(l => (
            <Link key={l.href} href={l.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                ${l.href === '/admin/users' ? 'bg-surface2 text-accent' : 'text-gray-400 hover:bg-surface2 hover:text-white'}`}>
              <i className={`fa ${l.icon} w-4 text-center text-sm`} />{l.label}
            </Link>
          ))}
          <div className="border-t border-border mt-4 pt-4">
            <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 text-sm hover:text-white hover:bg-surface2 transition-all">
              <i className="fa fa-arrow-left w-4 text-center" /> Siteye Dön
            </Link>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">Kullanıcılar</h1>
            <p className="text-gray-400 text-sm mt-1">Toplam {total} kullanıcı</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <i className="fa fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
              <input type="text" placeholder="Ad veya e-posta ara..."
                className="input pl-9 w-64" value={search}
                onChange={e => { setSearch(e.target.value); setPage(1) }} />
            </div>
            {search && <button onClick={() => setSearch('')} className="btn-ghost text-xs px-3 py-2">Temizle</button>}
          </div>
        </div>

        <div className="card p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs font-bold uppercase tracking-widest text-gray-500 px-5 py-3">Kullanıcı</th>
                  <th className="text-left text-xs font-bold uppercase tracking-widest text-gray-500 px-5 py-3">Rol</th>
                  <th className="text-left text-xs font-bold uppercase tracking-widest text-gray-500 px-5 py-3">Bakiye</th>
                  <th className="text-left text-xs font-bold uppercase tracking-widest text-gray-500 px-5 py-3">Aktif Sub</th>
                  <th className="text-left text-xs font-bold uppercase tracking-widest text-gray-500 px-5 py-3">Kayıt</th>
                  <th className="text-left text-xs font-bold uppercase tracking-widest text-gray-500 px-5 py-3">İşlem</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} className="border-b border-border/50 hover:bg-surface2/50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-black font-bold text-xs flex-shrink-0">
                          {u.name[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{u.name}</p>
                          <p className="text-xs text-gray-500">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className={u.role === 'admin' ? 'badge-yellow' : 'badge-gray'}>{u.role}</span>
                    </td>
                    <td className="px-5 py-3 font-mono text-sm">${parseFloat(u.balance || 0).toFixed(2)}</td>
                    <td className="px-5 py-3">
                      <span className={parseInt(u.active_subs) > 0 ? 'badge-green' : 'badge-gray'}>{u.active_subs}</span>
                    </td>
                    <td className="px-5 py-3 font-mono text-xs text-gray-500">{new Date(u.created_at).toLocaleDateString('tr-TR')}</td>
                    <td className="px-5 py-3">
                      <Link href={`/admin/users/${u.id}`} className="btn-outline text-xs px-3 py-1.5">Detay</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pages > 1 && (
            <div className="flex items-center gap-2 px-5 py-4 border-t border-border">
              {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setPage(p)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                    p === page ? 'bg-accent text-black font-bold' : 'bg-surface2 text-gray-400 hover:text-white border border-border'
                  }`}>{p}</button>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
