// app/page.tsx
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import db from '@/lib/db'

export default async function HomePage() {
  const { rows: products } = await db.query(
    'SELECT * FROM products WHERE is_active=true ORDER BY sort_order'
  )

  const stats = [
    { value: '54M+',  label: 'Residential IPs', color: 'text-accent' },
    { value: '195+',  label: 'Ülke',             color: 'text-neon' },
    { value: '99.9%', label: 'Uptime SLA',       color: 'text-gold' },
    { value: '$0.49', label: 'En Düşük /GB',     color: 'text-accent2' },
  ]

  const categoryColor: Record<string, string> = {
    residential: 'badge-blue',
    datacenter:  'badge-green',
    mobile:      'badge-yellow',
    static:      'badge-gray',
  }

  return (
    <>
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center text-center pt-16 overflow-hidden">
        {/* Glow bg */}
        <div className="absolute inset-0 bg-hero-glow" />
        {/* Grid */}
        <div className="absolute inset-0 bg-grid bg-grid opacity-100" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-8">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse-dot" />
            Etik & Güvenilir Proxy Ağı
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6">
            Residential Proxy<br />
            sadece <span className="text-accent">$0.49/GB</span>
          </h1>

          <p className="text-lg text-gray-400 leading-relaxed mb-10 max-w-xl mx-auto">
            54M+ etik kaynaklı IP adresi. Botları geçin, veri toplayın, kısıtlamaları aşın — ışık hızında.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <Link href="/auth/register" className="btn-primary px-8 py-3 text-base rounded-xl glow-accent">
              Ücretsiz Başla →
            </Link>
            <Link href="/pricing" className="btn-outline px-8 py-3 text-base rounded-xl">
              Fiyatları Gör
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            {['Para iade garantisi', 'Kredi kartı gerektirmez', '7/24 destek'].map(t => (
              <span key={t} className="flex items-center gap-2">
                <i className="fa fa-check text-neon text-xs" /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────────── */}
      <section className="bg-surface border-y border-border py-8">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-0">
          {stats.map((s, i) => (
            <div key={s.label} className={`text-center px-8 ${i < 3 ? 'border-r border-border' : ''}`}>
              <div className={`text-3xl font-extrabold ${s.color}`}>{s.value}</div>
              <div className="text-gray-500 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Products ─────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center tracking-tight mb-4">Proxy Çözümleri</h2>
          <p className="text-center text-gray-400 mb-14 max-w-md mx-auto">Her ihtiyaca özel proxy türü. Hızlı başla, kolayca ölçeklendir.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((p: any) => {
              const features = Array.isArray(p.features) ? p.features : (p.features ? JSON.parse(p.features) : [])
              return (
                <Link key={p.id} href={`/product/${p.slug}`}
                  className="card hover:border-border2 hover:-translate-y-1 transition-all duration-200 cursor-pointer group block">
                  <div className="mb-4">
                    <span className={categoryColor[p.category] || 'badge-gray'}>{p.category.toUpperCase()}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{p.name}</h3>
                  <p className="text-sm text-gray-400 mb-4">{p.description}</p>
                  <div className="text-3xl font-extrabold text-accent mb-1">
                    ${p.price_per_gb}<span className="text-base text-gray-400 font-medium">/GB</span>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {features.slice(0, 3).map((f: string) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-400">
                        <i className="fa fa-check text-neon text-xs" /> {f}
                      </li>
                    ))}
                  </ul>
                  <span className="btn-outline mt-5 w-full justify-center text-sm py-2 group-hover:border-accent group-hover:text-accent">
                    Başla →
                  </span>
                  </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────── */}
      <section className="bg-surface border-y border-border py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center tracking-tight mb-4">Neden ProxyZen?</h2>
          <p className="text-center text-gray-400 mb-14 max-w-md mx-auto">Rakiplerimizden farkımız sadece fiyat değil.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '⚡', title: 'Işık Hızında', desc: 'Ortalama 50ms bağlantı süresi. Premium ağ altyapısı.' },
              { icon: '🌍', title: '195+ Ülke',    desc: 'Şehir, ASN ve ISP düzeyinde hedefleme imkânı.' },
              { icon: '🛡️', title: 'Etik Kaynak',  desc: 'Tüm IP\'ler etik standartlara uygun olarak temin edilir.' },
            ].map(f => (
              <div key={f.title} className="text-center p-6">
                <div className="text-5xl mb-5">{f.icon}</div>
                <h3 className="text-lg font-bold mb-3">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-4xl font-extrabold tracking-tight mb-4">Hemen Başla</h2>
          <p className="text-gray-400 mb-8">Kredi kartı olmadan ücretsiz deneme. 1 günlük trial mevcut.</p>
          <Link href="/auth/register" className="btn-primary px-10 py-3 text-base rounded-xl glow-accent">
            Ücretsiz Dene →
          </Link>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
            <div className="col-span-2 md:col-span-1">
              <div className="text-xl font-extrabold mb-3">Proxy<span className="text-accent">Zen</span></div>
              <p className="text-sm text-gray-500 leading-relaxed">Etik, hızlı ve güvenilir proxy çözümleri.</p>
            </div>
            {[
              { title: 'Ürünler', links: [['Residential', '/pricing'], ['Datacenter', '/pricing'], ['Mobile', '/pricing']] },
              { title: 'Şirket',  links: [['Hakkımızda', '/about'], ['SSS', '/faq'], ['Lokasyonlar', '/locations']] },
              { title: 'Hesap',   links: [['Giriş Yap', '/auth/login'], ['Kayıt Ol', '/auth/register'], ['Dashboard', '/dashboard']] },
            ].map(col => (
              <div key={col.title}>
                <h4 className="font-bold text-sm mb-4">{col.title}</h4>
                {col.links.map(([label, href]) => (
                  <Link key={label} href={href} className="block text-sm text-gray-500 hover:text-white mb-2 transition-colors">{label}</Link>
                ))}
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-6 flex justify-between items-center text-xs text-gray-600">
            <span>© 2024 ProxyZen. Tüm hakları saklıdır.</span>
            <span>Made with ❤️</span>
          </div>
        </div>
      </footer>
    </>
  )
}
