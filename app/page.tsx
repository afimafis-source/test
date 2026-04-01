import Link from 'next/link'
import Navbar from '@/components/Navbar'
import db from '@/lib/db'
import { ArrowRight, Check, Globe, ShieldCheck, Zap } from 'lucide-react'

export default async function HomePage() {
  const { rows: products } = await db.query(
    'SELECT * FROM products WHERE is_active=true ORDER BY sort_order'
  )

  const stats = [
    { value: '54M+', label: 'Residential IPs', color: 'text-blue-600' },
    { value: '195+', label: 'Ülke', color: 'text-emerald-600' },
    { value: '99.9%', label: 'Uptime SLA', color: 'text-amber-600' },
    { value: '$0.49', label: 'En düşük /GB', color: 'text-violet-600' },
  ]

  const categoryColor: Record<string, string> = {
    residential: 'badge-blue',
    datacenter: 'badge-green',
    mobile: 'badge-yellow',
    static: 'badge-gray',
  }

  return (
    <>
      <Navbar />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow" />
        <div className="absolute inset-0 bg-grid opacity-60" />

        <div className="section relative py-20 md:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              <ShieldCheck className="h-4 w-4" />
              Etik & Güvenilir Proxy Ağı
            </div>

            <h1 className="mx-auto max-w-4xl text-5xl font-extrabold leading-tight text-slate-950 md:text-7xl">
              Premium <span className="text-gradient">Residential Proxy</span> altyapısı
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
              54M+ etik kaynaklı IP ile scraping, otomasyon, çoklu lokasyon testleri ve veri toplama işlemlerini
              kurumsal seviyede yönetin.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/auth/register" className="btn-primary">
                Ücretsiz Başla
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/pricing" className="btn-outline">
                Fiyatları Gör
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {['Para iade garantisi', 'Kredi kartı gerektirmez', '7/24 destek'].map((t) => (
                <div
                  key={t}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-soft"
                >
                  <Check className="h-4 w-4 text-emerald-600" />
                  {t}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 grid gap-4 md:grid-cols-4">
            {stats.map((s, i) => (
              <div key={i} className="stat-card">
                <div className={`text-3xl font-extrabold ${s.color}`}>{s.value}</div>
                <div className="mt-2 text-sm text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Proxy Çözümleri</h2>
          <p className="mt-4 text-lg text-slate-600">
            Her ihtiyaca özel ürün yapısı. Hızlı başla, kolay ölçeklendir, güvenle yönet.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {products.map((p: any) => {
            const features = Array.isArray(p.features)
              ? p.features
              : p.features
                ? JSON.parse(p.features)
                : []

            return (
              <div key={p.id} className="card flex h-full flex-col justify-between rounded-3xl p-7">
                <div>
                  <div className={categoryColor[p.category] || 'badge-gray'}>
                    {p.category?.toUpperCase()}
                  </div>

                  <h3 className="mt-5 text-2xl font-bold text-slate-950">{p.name}</h3>
                  <p className="mt-3 min-h-[56px] text-slate-600">{p.description}</p>

                  <div className="mt-6 flex items-end gap-2">
                    <span className="text-4xl font-extrabold text-slate-950">${p.price_per_gb}</span>
                    <span className="pb-1 text-slate-500">/GB</span>
                  </div>

                  <div className="mt-6 space-y-3">
                    {features.slice(0, 4).map((f: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link href="/auth/register" className="btn-primary mt-8 w-full">
                  Başla
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )
          })}
        </div>
      </section>

      <section className="section py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Neden ProxyZen?</h2>
          <p className="mt-4 text-lg text-slate-600">
            Sadece ucuz değil; premium deneyim, yönetilebilir altyapı ve stabil performans sunar.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: <Zap className="h-6 w-6 text-blue-600" />,
              title: 'Düşük gecikme',
              desc: 'Otomasyon ve scraping senaryoları için optimize edilmiş hızlı çıkış noktaları.',
            },
            {
              icon: <Globe className="h-6 w-6 text-emerald-600" />,
              title: '195+ ülke',
              desc: 'Ülke, şehir, ASN ve ISP seviyesinde daha hassas hedefleme imkânı.',
            },
            {
              icon: <ShieldCheck className="h-6 w-6 text-violet-600" />,
              title: 'Etik kaynak',
              desc: 'Marka güvenini zedelemeyen, daha sürdürülebilir bir proxy tedarik yaklaşımı.',
            },
          ].map((f, i) => (
            <div key={i} className="card rounded-3xl p-7">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-950">{f.title}</h3>
              <p className="mt-3 text-slate-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section pb-20">
        <div className="rounded-[32px] border border-blue-100 bg-gradient-to-br from-blue-600 via-blue-700 to-violet-700 px-8 py-14 text-center text-white shadow-glow md:px-14">
          <h2 className="text-3xl font-bold md:text-5xl">Hemen başla</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-blue-100 md:text-lg">
            Kredi kartı olmadan ücretsiz deneme ile sistemini test et. Dakikalar içinde canlıya geç.
          </p>
          <div className="mt-8">
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 transition hover:-translate-y-0.5"
            >
              Ücretsiz Dene
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-white">
        <div className="section grid gap-10 py-14 md:grid-cols-4">
          <div>
            <div className="text-xl font-extrabold text-slate-950">ProxyZen</div>
            <p className="mt-3 text-sm text-slate-600">
              Etik, hızlı ve güvenilir premium proxy çözümleri.
            </p>
          </div>

          {[
            {
              title: 'Ürünler',
              links: [
                ['Residential', '/pricing'],
                ['Datacenter', '/pricing'],
                ['Mobile', '/pricing'],
              ],
            },
            {
              title: 'Şirket',
              links: [
                ['Hakkımızda', '/about'],
                ['SSS', '/faq'],
                ['Lokasyonlar', '/locations'],
              ],
            },
            {
              title: 'Hesap',
              links: [
                ['Giriş Yap', '/auth/login'],
                ['Kayıt Ol', '/auth/register'],
                ['Dashboard', '/dashboard'],
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-bold uppercase tracking-wide text-slate-900">{col.title}</h4>
              <div className="mt-4 space-y-3">
                {col.links.map(([label, href]) => (
                  <Link key={label} href={href} className="block text-sm text-slate-600 hover:text-slate-950">
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="section border-t border-border py-6 text-sm text-slate-500">
          © 2026 ProxyZen. Tüm hakları saklıdır.
        </div>
      </footer>
    </>
  )
}