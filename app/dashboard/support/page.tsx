'use client'
// app/dashboard/support/page.tsx
import { useState, useEffect } from 'react'

export default function SupportPage() {
  const [tickets, setTickets]   = useState<any[]>([])
  const [loading, setLoading]   = useState(true)
  const [sending, setSending]   = useState(false)
  const [success, setSuccess]   = useState(false)
  const [form, setForm] = useState({ subject: '', priority: 'normal', message: '' })

  useEffect(() => {
    fetch('/api/dashboard/tickets')
      .then(r => r.json())
      .then(d => { setTickets(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    await fetch('/api/dashboard/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setSending(false); setSuccess(true)
    setForm({ subject: '', priority: 'normal', message: '' })
    setTimeout(() => setSuccess(false), 3000)
    const res = await fetch('/api/dashboard/tickets')
    setTickets(await res.json())
  }

  const priorityBadge: Record<string, string> = {
    urgent: 'badge-red', high: 'badge-yellow', normal: 'badge-blue', low: 'badge-gray',
  }
  const statusBadge: Record<string, string> = {
    open: 'badge-blue', in_progress: 'badge-yellow', closed: 'badge-green',
  }

  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Destek Merkezi</h1>
        <p className="text-gray-400 text-sm mt-1">7/24 teknik destek ekibimiz hizmetinizde</p>
      </div>

      {success && (
        <div className="flash flash-success">
          <i className="fa fa-check-circle" /> Destek talebi oluşturuldu!
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* New ticket */}
        <div className="card">
          <h3 className="font-bold mb-5 flex items-center gap-2">
            <i className="fa fa-plus text-accent text-sm" /> Yeni Destek Talebi
          </h3>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="label">Konu</label>
              <input type="text" className="input" placeholder="Sorununuzu kısaca açıklayın" required
                value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} />
            </div>
            <div>
              <label className="label">Öncelik</label>
              <select className="input" value={form.priority}
                onChange={e => setForm({...form, priority: e.target.value})}>
                <option value="low">Düşük</option>
                <option value="normal">Normal</option>
                <option value="high">Yüksek</option>
                <option value="urgent">Acil</option>
              </select>
            </div>
            <div>
              <label className="label">Mesaj</label>
              <textarea className="input resize-none" rows={5}
                placeholder="Sorununuzu detaylı açıklayın..." required
                value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
            </div>
            <button type="submit" disabled={sending} className="btn-primary w-full justify-center py-2.5 rounded-xl disabled:opacity-50">
              {sending ? <><i className="fa fa-spinner fa-spin" /> Gönderiliyor...</> : <><i className="fa fa-paper-plane" /> Talep Oluştur</>}
            </button>
          </form>
        </div>

        {/* Tickets list */}
        <div className="card">
          <h3 className="font-bold mb-5 flex items-center gap-2">
            <i className="fa fa-ticket text-neon text-sm" /> Taleplerim
          </h3>
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="w-6 h-6 border-2 border-border2 border-t-accent rounded-full animate-spin" />
            </div>
          ) : tickets.length === 0 ? (
            <div className="text-center py-10">
              <i className="fa fa-headset text-4xl text-gray-700 mb-4 block" />
              <p className="text-gray-500 text-sm">Henüz destek talebiniz yok.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {tickets.map((t: any) => (
                <div key={t.id} className="bg-bg border border-border rounded-xl p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{t.subject}</p>
                      <p className="text-xs text-gray-500 font-mono mt-1">
                        {new Date(t.created_at).toLocaleDateString('tr-TR')}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                      <span className={`${priorityBadge[t.priority] || 'badge-gray'} text-[10px]`}>{t.priority}</span>
                      <span className={`${statusBadge[t.status] || 'badge-gray'} text-[10px]`}>{t.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
