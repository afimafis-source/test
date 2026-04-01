'use client'
// app/admin/page.tsx
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts'

const adminLinks = [
  { href: '/admin',                icon: 'fa-gauge',    label: 'Genel Bakış' },
  { href: '/admin/users',          icon: 'fa-users',    label: 'Kullanıcılar' },
  { href: '/admin/subscriptions',  icon: 'fa-star',     label: 'Abonelikler' },
  { href: '/admin/tickets',        icon: 'fa-headset',  label: 'Destek' },
  { href: '/admin/announcements',  icon: 'fa-bell',     label: 'Duyurular' },
]

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [data, setData] = useState<any>(null)
  const [clock, setClock] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/auth/login')
    if (status === 'authenticated' && (session?.user as any)?.role !== 'admin') router.push('/dashboard')
  }, [status, session])

  useEffect(() => {
    fetch('/api/admin/stats').then(r => r.json()).then(setData)
    const t = setInterval(() => setClock(new Date().toLocaleString('tr-TR')), 1000)
    return () => clearInterval(t)
  }, [])

  if (!data) return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-border border-t-accent rounded-full animate-spin" />
    </div>
  )

  const { stats, recentUsers, recentPayments, monthlyRevenue } = data

  const statCards = [
    { label: 'Toplam Kullanıcı', value: stats.totalUsers,    icon: 'fa-users',       color: 'text-accent',  variant: '' },
    { label: 'Aktif Abonelik',   value: stats.activeSubs,    icon: 'fa-star',        color: 'text-neon',    variant: 'green' },
    { label: 'Toplam Gelir',     value: `$${stats.totalRevenue}`, icon: 'fa-dollar-sign', color: 'text-gold', variant: 'yellow' },
    { label: 'Yeni Üye (30g)',   value: stats.newUsersMonth, icon: 'fa-user-plus',   color: 'text-white',   variant: '' },
  ]

  const tooltipStyle = {
    backgroundColor: '#111318', border: '1px solid #1e2028',
    borderRadius: '10px', color: '#e8eaf0', fontSize: '12px',
  }

  return (
    <div className="min-h-screen bg-bg flex pt-0">
      {/* Admin Sidebar */}
      <aside className="w-56 flex-shrink-0 bg-surface border-r border-border min-h-screen">
        <div className="p-4 border-b border-border">
          <Link href="/" className="text-xl font-extrabold tracking-tight">
            Proxy<span className="text-accent">Zen</span>
          </Link>
          <div className="inline-flex items-center gap-1 bg-gold/10 border border-gold/20 text-gold text-xs font-bold px-2 py-0.5 rounded-full ml-2">
            ADMIN
          </div>
        </div>
        <div className="p-3 space-y-1 mt-2">
          {adminLinks.map(l => (
            <Link key={l.href} href={l.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 text-sm font-medium hover:bg-surface2 hover:text-white transition-all">
              <i className={`fa ${l.icon} w-4 text-center text-sm`} />
              {l.label}
            </Link>
          ))}
          <div className="border-t border-border mt-4 pt-4">
            <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 text-sm hover:text-white hover:bg-surface2 transition-all">
              <i className="fa fa-arrow-left w-4 text-center text-sm" /> Siteye Dön
            </Link>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight flex items-center gap-3">
              Admin Panel
              <span className="text-sm font-bold bg-gold/10 border border-gold/20 text-gold px-3 py-1 rounded-full">ADMIN</span>
            </h1>
            <p className="text-gray-400 text-sm mt-1">Genel bakış ve hızlı istatistikler</p>
          </div>
          <div className="font-mono text-xs text-gray-500 bg-surface border border-border px-4 py-2 rounded-xl">
            {clock}
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map(s => (
            <div key={s.label} className={`stat-card ${s.variant}`}>
              <i className={`fa ${s.icon} absolute right-5 top-5 text-2xl opacity-10`} />
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">{s.label}</p>
              <p className={`text-3xl font-extrabold tracking-tight ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="card">
            <h3 className="font-bold mb-1">Aylık Gelir</h3>
            <p className="text-xs text-gray-500 mb-5">Son 6 ay ($)</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e2028" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v: any) => [`$${v}`, 'Gelir']} />
                <Bar dataKey="revenue" fill="#f5c842" fillOpacity={0.8} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="card">
            <h3 className="font-bold mb-1">Abonelik Dağılımı</h3>
            <p className="text-xs text-gray-500 mb-5">Durum bazlı</p>
            <div className="flex items-center justify-center h-[220px]">
              <div className="space-y-3 w-full">
                {[
                  { label: 'Aktif', color: 'bg-neon', pct: 72 },
                  { label: 'İptal', color: 'bg-danger', pct: 18 },
                  { label: 'Süresi Dolmuş', color: 'bg-gold', pct: 10 },
                ].map(item => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-gray-400">{item.label}</span>
                      <span className="text-gray-500">{item.pct}%</span>
                    </div>
                    <div className="h-2 bg-border2 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Users */}
          <div className="card">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold">Son Kayıt Olan Kullanıcılar</h3>
              <Link href="/admin/users" className="text-xs text-gray-500 hover:text-accent transition-colors">Tümü →</Link>
            </div>
            <div className="space-y-3">
              {recentUsers.map((u: any) => (
                <div key={u.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-black font-bold text-xs flex-shrink-0">
                      {u.name[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{u.name}</p>
                      <p className="text-xs text-gray-500">{u.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={u.role === 'admin' ? 'badge-yellow' : 'badge-gray'}>{u.role}</span>
                    <span className="text-xs text-gray-600 font-mono">{new Date(u.created_at).toLocaleDateString('tr-TR')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Payments */}
          <div className="card">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold">Son Ödemeler</h3>
              <span className="text-xs text-gray-500">Son 8 işlem</span>
            </div>
            <div className="space-y-3">
              {recentPayments.map((p: any) => (
                <div key={p.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-semibold">{p.user_name}</p>
                    <p className="text-xs text-gray-500">{p.description || 'Abonelik ödemesi'}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-neon font-mono text-sm">${parseFloat(p.amount).toFixed(2)}</p>
                    <span className={`text-[10px] mt-0.5 inline-flex ${p.status === 'paid' ? 'badge-green' : p.status === 'failed' ? 'badge-red' : 'badge-yellow'}`}>
                      {p.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
