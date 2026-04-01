// app/pricing/page.tsx
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import db from '@/lib/db'

export const metadata = { title: 'Fiyatlandırma' }

export default async function PricingPage() {
  const { rows: products } = await db.query(
    "SELECT * FROM products WHERE is_active=true ORDER BY sort_order"
  )
  const { rows: plans } = await db.query(`
    SELECT pl.*, pr.name as product_name, pr.slug as product_slug, pr.features as product_features
    FROM plans pl JOIN products pr ON pr.id=pl.product_id
    WHERE pl.is_active=true ORDER BY pr.sort_order, pl.gb_amount
  `)

  const grouped = products.map((p: any) => ({
    ...p,
    plans: plans.filter((pl: any) => pl.product_id === p.id),
  }))

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-bg pt-24 pb-20 px-6">
        {/* Header */}
        <div className="text-center mb-16"
          style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0, rgba(0,194,255,0.07) 0%, transparent 60%)' }}>
          <h1 className="text-5xl font-extrabold tracking-tight mb-4">Şeffaf Fiyatlandırma</h1>
          <p className="text-gray-400 max-w-md mx-auto mb-8">Gizli ücret yok. İhtiyacın kadar öde.</p>
          <div className="inline-flex items-center gap-6 bg-surface border border-border rounded-2xl px-6 py-3 text-sm">
            {['Para iade garantisi', 'Deneme ücretsiz', '7/24 Destek'].map(t => (
              <span key={t} className="flex items-center gap-2 text-gray-400">
                <i className="fa fa-check text-neon text-xs" /> {t}
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto space-y-16">
          {grouped.map((product: any) => {
            const features = Array.isArray(product.features) ? product.features : (product.features ? JSON.parse(product.features) : [])
            return (
              <div key={product.id}>
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="text-2xl font-extrabold">{product.name}</h2>
                  <span className="badge-blue text-xs">{product.category}</span>
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-sm text-gray-500">${product.price_per_gb}/GB'dan başlayan</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {product.plans.map((plan: any) => (
                    <div key={plan.id}
                      className={`relative bg-surface border rounded-2xl p-6 transition-all hover:-translate-y-1
                        ${plan.is_popular ? 'border-accent shadow-lg shadow-accent/10' : 'border-border hover:border-border2'}`}>
                      {plan.is_popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-black text-[10px] font-bold px-3 py-1 rounded-full">
                          En Popüler
                        </div>
                      )}
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">{plan.name}</p>
                      <div className="mb-4">
                        <span className="text-4xl font-extrabold">${parseFloat(plan.price_monthly).toFixed(2)}</span>
                        <span className="text-gray-400 text-sm">/ay</span>
                      </div>
                      <p className="text-sm text-gray-400 mb-4">
                        <strong className="text-white">{plan.gb_amount} GB</strong> dahil
                        <br />Ekstra: ${plan.price_gb_extra}/GB
                      </p>
                      <ul className="space-y-2 mb-6">
                        {features.slice(0, 4).map((f: string) => (
                          <li key={f} className="flex items-center gap-2 text-xs text-gray-400">
                            <i className="fa fa-check text-neon text-[10px]" /> {f}
                          </li>
                        ))}
                      </ul>
                      <Link href="/auth/register"
                        className={`block text-center py-2.5 rounded-xl text-sm font-semibold transition-all
                          ${plan.is_popular
                            ? 'bg-accent text-black hover:bg-cyan-400'
                            : 'border border-border2 text-white hover:border-accent hover:text-accent'}`}>
                        Başla →
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
