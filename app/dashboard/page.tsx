'use client'
// app/dashboard/page.tsx
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import DashboardSidebar from '@/components/DashboardSidebar'
import Navbar from '@/components/Navbar'
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [data, setData] = useState<any>(null)
  const [days, setDays] = useState(7)

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/auth/login')
  }, [status])

  useEffect(() => {
    fetch('/api/dashboard/stats').then(r => r.json()).then(setData)
  }, [])

  if (status === 'loading' || !data) return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-gray-500">
        <div className="w-8 h-8 border-2 border-border border-t-accent rounded-full animate-spin" />
        <span className="text-sm">Yükleniyor...</span>
      </div>
    </div>
  )

  const user = session?.user as any
  const { subscription, dailyUsage, hourlyUsage, payments, stats, creds, announcements } = data

  const statCards = [
    { label: 'Bu Ay Kullanım', value: `${stats?.total_gb_month || 0} GB`, icon: 'fa-database', color: 'text-accent', variant: '' },
    { label: 'Başarı Oranı',   value: `${stats?.success_rate || 0}%`,     icon: 'fa-circle-check', color: 'text-neon', variant: 'green' },
    { label: 'Ort. Yanıt',     value: `${stats?.avg_response_ms || 0}ms`, icon: 'fa-bolt', color: 'text-gold', variant: 'yellow' },
    { label: 'Toplam İstek',   value: Number(stats?.total_requests_month || 0).toLocaleString(), icon: 'fa-arrow-pointer', color: 'text-white', variant: '' },
  ]

  const gbUsed  = parseFloat(subscription?.gb_used || 0)
  const gbLimit = parseInt(subscription?.gb_limit || 1)
  const pct     = Math.min(100, (gbUsed / gbLimit) * 100)

  const tooltipStyle = {
    backgroundColor: '#111318', border: '1px solid #1e2028',
    borderRadius: '10px', color: '#e8eaf0', fontSize: '12px',
  }

  return (
    <>
      <Navbar />
      <div className="flex pt-16 min-h-screen">
        <DashboardSidebar subscription={subscription} />

        <main className="ml-60 flex-1 p-8 min-h-screen">
          {/* Announcements */}
          {announcements?.map((a: any) => (
            <div key={a.id} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium mb-4
              ${a.type === 'success' ? 'bg-neon/10 border border-neon/20 text-neon' :
                a.type === 'warning' ? 'bg-gold/10 border border-gold/20 text-gold' :
                'bg-accent/10 border border-accent/20 text-accent'}`}>
              <i className="fa fa-bell" /> <strong>{a.title}</strong> — {a.content}
            </div>
          ))}

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-extrabold tracking-tight">
              Hoş geldin, {user?.name?.split(' ')[0]} 👋
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Bu ay {stats?.total_gb_month || 0} GB kullandın · Başarı oranı: {stats?.success_rate || 0}%
            </p>
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
            {/* Daily usage */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-bold">Günlük Kullanım</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Son {days} gün (GB)</p>
                </div>
                <select value={days} onChange={e => setDays(Number(e.target.value))}
                  className="bg-surface2 border border-border2 text-gray-400 px-3 py-1.5 rounded-lg text-xs outline-none">
                  <option value={7}>7 gün</option>
                  <option value={14}>14 gün</option>
                  <option value={30}>30 gün</option>
                </select>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={dailyUsage}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e2028" />
                  <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} tickFormatter={v => `${v}GB`} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v: any) => [`${v} GB`, 'Kullanım']} />
                  <Bar dataKey="gb" fill="#00c2ff" fillOpacity={0.8} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Hourly */}
            <div className="card">
              <div className="mb-6">
                <h3 className="font-bold">Saatlik Aktivite</h3>
                <p className="text-xs text-gray-500 mt-0.5">Son 24 saat (istek sayısı)</p>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={hourlyUsage}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e2028" />
                  <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="requests" stroke="#22d3a0" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Subscription + Payments */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Subscription */}
            <div className="card">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold flex items-center gap-2">
                  <i className="fa fa-star text-gold text-sm" /> Aktif Abonelik
                </h3>
                <a href="/pricing" className="btn-outline text-xs px-3 py-1.5">Yükselt</a>
              </div>
              {subscription ? (
                <>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="badge-green"><i className="fa fa-circle text-[8px]" /> {subscription.status.toUpperCase()}</span>
                    <span className="font-semibold text-sm">{subscription.plan_name} — {subscription.product_name}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm mb-5">
                    {[
                      ['Kullanılan', `${gbUsed.toFixed(2)} GB`],
                      ['Limit', `${gbLimit} GB`],
                      ['Başlangıç', new Date(subscription.started_at).toLocaleDateString('tr-TR')],
                      ['Bitiş', subscription.expires_at ? new Date(subscription.expires_at).toLocaleDateString('tr-TR') : '—'],
                    ].map(([k, v]) => (
                      <div key={k} className="bg-surface2 rounded-lg p-3">
                        <div className="text-xs text-gray-500 mb-1">{k}</div>
                        <div className="font-bold text-sm">{v}</div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-gray-400">Kullanım</span>
                      <span className="text-gray-500">{pct.toFixed(1)}%</span>
                    </div>
                    <div className="h-2 bg-border2 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-accent to-purple-500 transition-all duration-700"
                           style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-10 text-gray-500">
                  <i className="fa fa-box-open text-4xl mb-4 block opacity-30" />
                  <p className="text-sm mb-4">Aktif abonelik yok.</p>
                  <a href="/pricing" className="btn-primary text-sm px-6 py-2">Abonelik Seç</a>
                </div>
              )}
            </div>

            {/* Payments */}
            <div className="card">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold flex items-center gap-2">
                  <i className="fa fa-receipt text-accent text-sm" /> Son Ödemeler
                </h3>
                <a href="/dashboard/billing" className="text-xs text-gray-500 hover:text-accent transition-colors">Tümü →</a>
              </div>
              {payments?.length ? (
                <div className="space-y-3">
                  {payments.map((p: any) => (
                    <div key={p.id} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
                      <div>
                        <p className="text-sm font-medium">{p.description || 'Abonelik ödemesi'}</p>
                        <p className="text-xs text-gray-500 font-mono mt-0.5">{new Date(p.created_at).toLocaleDateString('tr-TR')}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-neon font-mono">${parseFloat(p.amount).toFixed(2)}</p>
                        <span className={p.status === 'paid' ? 'badge-green' : p.status === 'failed' ? 'badge-red' : 'badge-yellow'} style={{fontSize:'10px', marginTop:'4px', display:'inline-flex'}}>
                          {p.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-gray-500 text-sm">Henüz ödeme yok.</div>
              )}
            </div>
          </div>

          {/* Proxy quick view */}
          {creds?.length > 0 && (
            <div className="card">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold flex items-center gap-2">
                  <i className="fa fa-server text-neon text-sm" /> Proxy Bağlantı Bilgileri
                </h3>
                <a href="/dashboard/proxies" className="btn-outline text-xs px-3 py-1.5">Tümünü Gör</a>
              </div>
              {creds.slice(0, 2).map((c: any) => (
                <div key={c.id} className="bg-bg border border-border rounded-xl p-4 mb-3 last:mb-0 font-mono text-sm">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                    <div><span className="text-xs text-gray-600 block mb-1">HOST:PORT</span>
                      <span className="text-accent">{c.proxy_host}:{c.proxy_port}</span></div>
                    <div><span className="text-xs text-gray-600 block mb-1">USERNAME</span>
                      <span className="text-neon">{c.username}</span></div>
                    <div><span className="text-xs text-gray-600 block mb-1">PASSWORD</span>
                      <span className="text-gray-500">••••••••</span></div>
                    <div className="text-right">
                      <button onClick={() => {
                        navigator.clipboard.writeText(`${c.proxy_type}://${c.username}:${c.password}@${c.proxy_host}:${c.proxy_port}`)
                      }} className="btn-outline text-xs px-3 py-1.5">
                        <i className="fa fa-copy" /> Kopyala
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  )
}
