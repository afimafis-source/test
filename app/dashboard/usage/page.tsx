'use client'
// app/dashboard/usage/page.tsx
import { useEffect, useState } from 'react'
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'

const tooltipStyle = {
  backgroundColor: '#111318', border: '1px solid #1e2028',
  borderRadius: '10px', color: '#e8eaf0', fontSize: '12px',
}

export default function UsagePage() {
  const [data, setData]     = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/dashboard/usage/monthly')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-border2 border-t-accent rounded-full animate-spin" />
    </div>
  )

  const totalGb   = data.reduce((s, d) => s + parseFloat(d.gb || 0), 0).toFixed(2)
  const totalReqs = data.reduce((s, d) => s + parseInt(d.requests || 0), 0)
  const avgMs     = data.length ? Math.round(data.reduce((s, d) => s + parseInt(d.avg_ms || 0), 0) / data.length) : 0
  const successRate = totalReqs > 0
    ? ((data.reduce((s, d) => s + parseInt(d.success || 0), 0) / totalReqs) * 100).toFixed(1)
    : '0'

  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Kullanım İstatistikleri</h1>
        <p className="text-gray-400 text-sm mt-1">Son 30 günlük detaylı kullanım verisi</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Toplam GB (30 gün)', value: `${totalGb} GB`, color: 'text-accent', border: '' },
          { label: 'Toplam İstek',       value: Number(totalReqs).toLocaleString(), color: 'text-neon', border: 'green' },
          { label: 'Başarı Oranı',       value: `${successRate}%`, color: 'text-gold', border: 'yellow' },
          { label: 'Ort. Yanıt',         value: `${avgMs} ms`, color: 'text-white', border: '' },
        ].map(c => (
          <div key={c.label} className={`stat-card ${c.border}`}>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">{c.label}</p>
            <p className={`text-2xl font-extrabold ${c.color}`}>{c.value}</p>
          </div>
        ))}
      </div>

      {/* GB chart */}
      <div className="card">
        <h3 className="font-bold mb-1">Günlük Bant Genişliği</h3>
        <p className="text-xs text-gray-500 mb-5">Son 30 gün (GB)</p>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={data} margin={{ left: -20, right: 0, top: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="gbGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00c2ff" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#00c2ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e2028" />
            <XAxis dataKey="label" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} formatter={(v: any) => [`${v} GB`, 'Kullanım']} />
            <Area type="monotone" dataKey="gb" stroke="#00c2ff" strokeWidth={2} fill="url(#gbGrad)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Requests chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="card">
          <h3 className="font-bold mb-1">İstek Sayısı</h3>
          <p className="text-xs text-gray-500 mb-5">Başarılı vs. Hatalı</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data} margin={{ left: -20, right: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2028" />
              <XAxis dataKey="label" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: '11px', color: '#9ca3af' }} />
              <Bar dataKey="success" name="Başarılı" stackId="a" fill="#22d3a0" fillOpacity={0.8} radius={[0,0,0,0]} />
              <Bar dataKey="errors"  name="Hatalı"   stackId="a" fill="#f05252" fillOpacity={0.8} radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="font-bold mb-1">Yanıt Süresi</h3>
          <p className="text-xs text-gray-500 mb-5">Günlük ortalama (ms)</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={data} margin={{ left: -20, right: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2028" />
              <XAxis dataKey="label" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: any) => [`${v}ms`, 'Ort. Yanıt']} />
              <Line type="monotone" dataKey="avg_ms" stroke="#f5c842" strokeWidth={2} dot={{ fill: '#f5c842', r: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table */}
      <div className="card">
        <h3 className="font-bold mb-5">Günlük Detay</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {['Tarih','GB','İstek','Başarılı','Hatalı','Ort. ms','Başarı %'].map(h => (
                  <th key={h} className="text-left text-[11px] font-bold uppercase tracking-widest text-gray-600 py-2.5 px-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...data].reverse().map((d: any, i) => {
                const rate = d.requests > 0 ? ((d.success / d.requests) * 100).toFixed(1) : '0'
                const errors = Math.max(0, (d.requests || 0) - (d.success || 0))
                return (
                  <tr key={i} className="border-b border-border/50 hover:bg-surface2/30 transition-colors">
                    <td className="py-2.5 px-3 font-mono text-xs text-gray-400">{new Date(d.day).toLocaleDateString('tr-TR')}</td>
                    <td className="py-2.5 px-3 font-semibold text-accent">{parseFloat(d.gb).toFixed(4)} GB</td>
                    <td className="py-2.5 px-3 font-mono">{Number(d.requests).toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-neon">{Number(d.success).toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-danger">{errors.toLocaleString()}</td>
                    <td className="py-2.5 px-3 font-mono text-gray-400">{d.avg_ms}ms</td>
                    <td className="py-2.5 px-3">
                      <span className={parseFloat(rate) >= 95 ? 'badge-green' : parseFloat(rate) >= 80 ? 'badge-yellow' : 'badge-red'}>
                        {rate}%
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
