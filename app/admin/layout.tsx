// app/admin/layout.tsx
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

const adminLinks = [
  { href: '/admin',               icon: 'fa-gauge',    label: 'Genel Bakış' },
  { href: '/admin/users',         icon: 'fa-users',    label: 'Kullanıcılar' },
  { href: '/admin/subscriptions', icon: 'fa-star',     label: 'Abonelikler' },
  { href: '/admin/tickets',       icon: 'fa-headset',  label: 'Destek' },
  { href: '/admin/announcements', icon: 'fa-bell',     label: 'Duyurular' },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  if (!session || (session.user as any).role !== 'admin') redirect('/dashboard')

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <div className="flex pt-16">
        {/* Admin sidebar */}
        <aside className="w-56 flex-shrink-0 bg-surface border-r border-border fixed top-16 bottom-0 left-0 overflow-y-auto">
          <div className="p-3 mt-3 space-y-1">
            <div className="px-3 py-1 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600">Admin Panel</span>
              <div className="inline-flex items-center gap-1 ml-2 bg-gold/10 text-gold border border-gold/20 px-2 py-0.5 rounded-full text-[9px] font-bold">ADMIN</div>
            </div>
            {adminLinks.map(l => (
              <Link key={l.href} href={l.href} className="sidebar-link">
                <i className={`fa ${l.icon} w-4 text-center text-sm`} />
                {l.label}
              </Link>
            ))}
            <div className="pt-3 mt-3 border-t border-border">
              <Link href="/" className="sidebar-link">
                <i className="fa fa-arrow-left w-4 text-center text-sm" />
                Siteye Dön
              </Link>
            </div>
          </div>
        </aside>
        <main className="flex-1 ml-56 p-8 min-h-[calc(100vh-64px)]">
          {children}
        </main>
      </div>
    </div>
  )
}
