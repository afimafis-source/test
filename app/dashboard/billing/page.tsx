'use client'
// app/dashboard/billing/page.tsx
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import DashboardSidebar from '@/components/DashboardSidebar'

export default function BillingPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [payments, setPayments] = useState<any[]>([])
  const [subs, setSubs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/auth/login')
  }, [status])

  useEffect(() => {
    if (status !== 'authenticated') return
    fetch('/api/dashboard/billing')
      .then(r => r.json())
      .then(d => { setPayments(d.payments || []); setSubs(d.subs || []); setLoading(false) })
  }, [status])

  const user = session?.user as any

  return (
    <>
      <Navbar />
      <div className="flex pt-16 min-h-screen">
        <DashboardSidebar />
        <main className="flex-1 ml-60 p-8 min-w-0">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight">Faturalar & Ödemeler</h1>
              <p className="text-gray-500 text-sm mt-1">Tüm ödeme geçmişiniz</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Hesap Bakiyesi</p>
              <p className="text-3xl font-extrabold text-neon">${parseFloat(user?.balance || 0).toFixed(2)}</p>
            </div>
          </div>

          {/* Active subscriptions */}
          {subs.length > 0 && (
            <div className="card mb-6">
              <h3 className="font-bold flex items-center gap-2 mb-5">
                <i className="fa fa-star text-gold" /> Aboneliklerim
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      {['Plan', 'Ürün', 'Durum', 'Aylık Ücret', 'Başlangıç', 'Bitiş'].map(h => (
                        <th key={h} className="text-left text-xs font-bold uppercase tracking-widest text-gray-500 pb-3 pr-4">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {subs.map((s: any) => (
                      <tr key={s.id} className="border-b border-border/50 last:border-0">
                        <td className="py-3 pr-4 font-semibold text-sm">{s.plan_name}</td>
                        <td className="py-3 pr-4 text-gray-400 text-sm">{s.product_name}</td>
                        <td className="py-3 pr-4">
                          <span className={s.status === 'active' ? 'badge-green' : s.status === 'canceled' ? 'badge-red' : 'badge-yellow'}>
                            {s.status}
                          </span>
                        </td>
                        <td className="py-3 pr-4 font-mono font-bold text-accent text-sm">${parseFloat(s.price_monthly||0).toFixed(2)}</td>
                        <td className="py-3 pr-4 text-gray-500 text-xs font-mono">{new Date(s.started_at).toLocaleDateString('tr-TR')}</td>
                        <td className="py-3 text-gray-500 text-xs font-mono">{s.expires_at ? new Date(s.expires_at).toLocaleDateString('tr-TR') : '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Payment history */}
          <div className="card">
            <h3 className="font-bold mb-5">Ödeme Geçmişi</h3>
            {loading ? (
              <div className="flex justify-center py-12"><div className="w-8 h-8 border-2 border-border border-t-accent rounded-full animate-spin" /></div>
            ) : payments.length ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      {['Tarih', 'Açıklama', 'Tutar', 'Yöntem', 'Durum'].map(h => (
                        <th key={h} className="text-left text-xs font-bold uppercase tracking-widest text-gray-500 pb-3 pr-4">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((p: any) => (
                      <tr key={p.id} className="border-b border-border/50 last:border-0 hover:bg-surface2/50 transition-colors">
                        <td className="py-3.5 pr-4 font-mono text-xs text-gray-500">{new Date(p.created_at).toLocaleDateString('tr-TR')}</td>
                        <td className="py-3.5 pr-4 text-sm">{p.description || 'Abonelik ödemesi'}</td>
                        <td className="py-3.5 pr-4 font-mono font-bold text-neon text-sm">${parseFloat(p.amount).toFixed(2)}</td>
                        <td className="py-3.5 pr-4 text-gray-400 text-sm">{p.provider || 'stripe'}</td>
                        <td className="py-3.5">
                          <span className={p.status === 'paid' ? 'badge-green' : p.status === 'failed' ? 'badge-red' : p.status === 'refunded' ? 'badge-yellow' : 'badge-gray'}>
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-16 text-gray-500">
                <i className="fa fa-receipt text-5xl block mb-4 opacity-20" />
                <p className="text-sm">Henüz ödeme kaydı bulunmuyor.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  )
}
