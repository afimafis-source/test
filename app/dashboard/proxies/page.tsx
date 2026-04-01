'use client'
// app/dashboard/proxies/page.tsx — Proxy listesi + yeni proxy ekleme

import { useEffect, useState } from 'react'

const defaultForm = {
  username:   '',
  password:   '',
  proxy_host: '',
  proxy_port: '10000',
  proxy_type: 'http',
}

export default function ProxiesPage() {
  const [creds, setCreds]     = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [revealed, setRevealed] = useState<Record<string, boolean>>({})
  const [copied, setCopied]   = useState<Record<string, boolean>>({})
  const [showForm, setShowForm] = useState(false)
  const [form, setForm]       = useState(defaultForm)
  const [saving, setSaving]   = useState(false)
  const [formError, setFormError] = useState('')
  const [formSuccess, setFormSuccess] = useState('')

  async function loadCreds() {
    const res = await fetch('/api/dashboard/proxies')
    const data = await res.json()
    setCreds(data)
    setLoading(false)
  }

  useEffect(() => { loadCreds() }, [])

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true); setFormError(''); setFormSuccess('')

    const res = await fetch('/api/dashboard/proxies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    setSaving(false)

    if (!res.ok) { setFormError(data.error || 'Hata oluştu.'); return }

    setFormSuccess('✅ Proxy başarıyla eklendi!')
    setForm(defaultForm)
    setShowForm(false)
    await loadCreds()
    setTimeout(() => setFormSuccess(''), 3000)
  }

  async function handleDelete(id: string) {
    if (!confirm('Bu proxy silinsin mi?')) return
    await fetch('/api/dashboard/proxies', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    await loadCreds()
  }

  async function toggleActive(id: string, current: boolean) {
    await fetch('/api/dashboard/proxies', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, is_active: !current }),
    })
    await loadCreds()
  }

  function copy(text: string, key: string) {
    navigator.clipboard.writeText(text)
    setCopied(p => ({ ...p, [key]: true }))
    setTimeout(() => setCopied(p => ({ ...p, [key]: false })), 2000)
  }

  async function testProxy(id: string) { return fetch('/api/proxy/test', { method: 'POST' }).then(r => r.json()) }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-border2 border-t-accent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="space-y-6 animate-fade-up">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Proxy Bağlantı Bilgileri</h1>
          <p className="text-gray-400 text-sm mt-1">Toplam {creds.length} proxy kaydı</p>
        </div>
        <button onClick={() => { setShowForm(!showForm); setFormError('') }}
          className="btn-primary px-5 py-2.5 rounded-xl">
          <i className={`fa ${showForm ? 'fa-times' : 'fa-plus'}`} />
          {showForm ? 'İptal' : 'Yeni Proxy Ekle'}
        </button>
      </div>

      {/* Success banner */}
      {formSuccess && (
        <div className="flex items-center gap-2 bg-neon/10 border border-neon/20 text-neon px-5 py-3 rounded-xl text-sm font-semibold">
          {formSuccess}
        </div>
      )}

      {/* ── Add form ─────────────────────────────────────────── */}
      {showForm && (
        <div className="card border-accent/30 bg-accent/5 animate-fade-up">
          <h3 className="font-bold mb-5 flex items-center gap-2 text-accent">
            <i className="fa fa-plus-circle" /> Yeni Proxy Ekle
          </h3>

          {formError && (
            <div className="flex items-center gap-2 bg-danger/10 border border-danger/20 text-danger px-4 py-2.5 rounded-xl text-sm mb-4">
              <i className="fa fa-exclamation-circle" /> {formError}
            </div>
          )}

          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">Kullanıcı Adı *</label>
                <input className="input" placeholder="proxy_username" required
                  value={form.username} onChange={e => setForm({...form, username: e.target.value})} />
              </div>
              <div>
                <label className="label">Şifre *</label>
                <input className="input" type="password" placeholder="proxy_password" required
                  value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
              </div>
              <div>
                <label className="label">Host *</label>
                <input className="input" placeholder="res.proxyzen.io" required
                  value={form.proxy_host} onChange={e => setForm({...form, proxy_host: e.target.value})} />
              </div>
              <div>
                <label className="label">Port *</label>
                <input className="input" type="number" placeholder="10000" required
                  value={form.proxy_port} onChange={e => setForm({...form, proxy_port: e.target.value})} />
              </div>
              <div>
                <label className="label">Protokol</label>
                <select className="input" value={form.proxy_type}
                  onChange={e => setForm({...form, proxy_type: e.target.value})}>
                  <option value="http">HTTP</option>
                  <option value="https">HTTPS</option>
                  <option value="socks5">SOCKS5</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={saving}
                className="btn-primary px-6 py-2.5 rounded-xl disabled:opacity-50">
                {saving
                  ? <><i className="fa fa-spinner fa-spin" /> Kaydediliyor...</>
                  : <><i className="fa fa-floppy-disk" /> Kaydet</>}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setFormError('') }}
                className="btn-outline px-6 py-2.5 rounded-xl">
                İptal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── Empty state ───────────────────────────────────────── */}
      {creds.length === 0 && !showForm && (
        <div className="card text-center py-16">
          <i className="fa fa-server text-5xl text-gray-700 mb-5 block" />
          <h3 className="text-lg font-bold mb-2">Henüz proxy yok</h3>
          <p className="text-gray-500 text-sm mb-6">
            Bir abonelik satın aldıktan sonra otomatik atanır veya manuel ekleyebilirsiniz.
          </p>
          <button onClick={() => setShowForm(true)} className="btn-primary px-6 py-2.5 rounded-xl">
            <i className="fa fa-plus" /> Proxy Ekle
          </button>
        </div>
      )}

      {/* ── Proxy cards ───────────────────────────────────────── */}
      {creds.map((c: any, i: number) => (
        <div key={c.id} className={`card space-y-5 transition-all ${!c.is_active ? 'opacity-60' : ''}`}>

          {/* Card header */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 className="font-bold flex items-center gap-2">
                <i className="fa fa-server text-accent text-sm" />
                Proxy #{i + 1}
                {c.product_name && <span className="text-gray-500 font-normal">— {c.product_name}</span>}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="badge-blue text-[10px]">{c.proxy_type?.toUpperCase()}</span>
                <span className={c.is_active ? 'badge-green text-[10px]' : 'badge-red text-[10px]'}>
                  {c.is_active ? 'Aktif' : 'Pasif'}
                </span>
                <span className="text-[10px] text-gray-600 font-mono">
                  {new Date(c.created_at).toLocaleDateString('tr-TR')}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <TestButton id={c.id} onTest={testProxy} />
              <button onClick={() => toggleActive(c.id, c.is_active)}
                className={`btn-outline text-xs px-3 py-2 ${c.is_active ? 'hover:border-danger hover:text-danger' : 'hover:border-neon hover:text-neon'}`}>
                <i className={`fa ${c.is_active ? 'fa-pause' : 'fa-play'}`} />
                {c.is_active ? 'Pasifleştir' : 'Aktifleştir'}
              </button>
              <button onClick={() => handleDelete(c.id)}
                className="btn-outline text-xs px-3 py-2 hover:border-danger hover:text-danger">
                <i className="fa fa-trash" />
              </button>
            </div>
          </div>

          {/* Credentials grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Host',     value: c.proxy_host,        color: 'text-accent', key: `host-${c.id}` },
              { label: 'Port',     value: String(c.proxy_port), color: 'text-accent', key: `port-${c.id}` },
              { label: 'Username', value: c.username,           color: 'text-neon',   key: `user-${c.id}` },
            ].map(item => (
              <div key={item.label} className="bg-bg border border-border rounded-xl p-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-2">{item.label}</p>
                <p className={`font-mono text-sm truncate ${item.color}`}>{item.value}</p>
                <button onClick={() => copy(item.value, item.key)}
                  className="mt-2 text-[10px] text-gray-600 hover:text-accent transition-colors">
                  {copied[item.key] ? '✓ Kopyalandı' : 'Kopyala'}
                </button>
              </div>
            ))}

            {/* Password */}
            <div className="bg-bg border border-border rounded-xl p-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-2">Password</p>
              <p className="font-mono text-sm text-gray-400">
                {revealed[c.id] ? c.password : '••••••••••'}
              </p>
              <button onClick={() => setRevealed(p => ({ ...p, [c.id]: !p[c.id] }))}
                className="mt-2 text-[10px] text-gray-600 hover:text-accent transition-colors">
                {revealed[c.id] ? 'Gizle' : 'Göster'}
              </button>
            </div>
          </div>

          {/* Full connection string */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-2">Tam Bağlantı Dizisi</p>
            <div className="code-block flex items-center justify-between gap-4">
              <span className="font-mono text-sm truncate">
                <span className="text-gray-500">{c.proxy_type}://</span>
                <span className="text-neon">{c.username}:••••••</span>
                <span className="text-gray-500">@{c.proxy_host}:{c.proxy_port}</span>
              </span>
              <button onClick={() => copy(`${c.proxy_type}://${c.username}:${c.password}@${c.proxy_host}:${c.proxy_port}`, `full-${c.id}`)}
                className="copy-btn flex-shrink-0">
                {copied[`full-${c.id}`] ? '✓' : 'Kopyala'}
              </button>
            </div>
          </div>

          {/* Code examples */}
          <details className="group">
            <summary className="cursor-pointer text-sm font-semibold text-gray-400 hover:text-white transition-colors list-none flex items-center gap-2">
              <i className="fa fa-code text-xs" /> Kod Örnekleri
              <i className="fa fa-chevron-down text-xs group-open:rotate-180 transition-transform" />
            </summary>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-gray-500 mb-2">Python (requests)</p>
                <div className="code-block text-xs leading-relaxed">
                  <span className="text-neon">proxies</span> = {'{'}<br/>
                  &nbsp;&nbsp;<span className="text-accent">"http"</span>: <span className="text-gold">"http://{c.username}:PASS@{c.proxy_host}:{c.proxy_port}"</span>,<br/>
                  &nbsp;&nbsp;<span className="text-accent">"https"</span>: <span className="text-gold">"http://{c.username}:PASS@{c.proxy_host}:{c.proxy_port}"</span><br/>
                  {'}'}<br/>
                  r = requests.get(<span className="text-gold">"https://example.com"</span>, proxies=proxies)
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-2">Node.js (axios)</p>
                <div className="code-block text-xs leading-relaxed">
                  <span className="text-accent">const</span> axios = require(<span className="text-gold">'axios'</span>);<br/>
                  axios.get(<span className="text-gold">'https://example.com'</span>, {'{'}<br/>
                  &nbsp;&nbsp;proxy: {'{'}<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;host: <span className="text-gold">'{c.proxy_host}'</span>,<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;port: <span className="text-neon">{c.proxy_port}</span>,<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;auth: {'{'} username: <span className="text-gold">'{c.username}'</span> {'}'}<br/>
                  &nbsp;&nbsp;{'}'}<br/>
                  {'}'});
                </div>
              </div>
            </div>
          </details>

        </div>
      ))}
    </div>
  )
}

// ── Test butonu bileşeni ──────────────────────────────────────
function TestButton({ id, onTest }: { id: string; onTest: (id: string) => Promise<any> }) {
  const [state, setState]     = useState<'idle' | 'loading' | 'ok' | 'fail'>('idle')
  const [latency, setLatency] = useState(0)

  async function run() {
    setState('loading')
    try {
      const r = await onTest(id)
      setLatency(r.latency || 0)
      setState(r.ok ? 'ok' : 'fail')
    } catch { setState('fail') }
    setTimeout(() => setState('idle'), 3000)
  }

  return (
    <button onClick={run} disabled={state === 'loading'}
      className="btn-outline text-xs px-3 py-2 disabled:opacity-50">
      {state === 'idle'    && <><i className="fa fa-wifi" /> Test</>}
      {state === 'loading' && <><i className="fa fa-spinner fa-spin" /> Test ediliyor...</>}
      {state === 'ok'      && <><i className="fa fa-check text-neon" /> {latency}ms</>}
      {state === 'fail'    && <><i className="fa fa-times text-danger" /> Başarısız</>}
    </button>
  )
}
