'use client'
// components/DashboardSidebar.tsx
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import clsx from 'clsx'

const links = [
  { href: '/dashboard',          icon: 'fa-gauge',      label: 'Dashboard' },
  { href: '/dashboard/proxies',  icon: 'fa-server',     label: 'Proxy Bilgileri' },
  { href: '/dashboard/usage',    icon: 'fa-chart-line', label: 'Kullanım' },
  { href: '/dashboard/billing',  icon: 'fa-credit-card',label: 'Faturalar' },
]
const accountLinks = [
  { href: '/dashboard/settings', icon: 'fa-gear',    label: 'Ayarlar' },
  { href: '/dashboard/support',  icon: 'fa-headset', label: 'Destek' },
  { href: '/pricing',            icon: 'fa-arrow-up-right-dots', label: 'Plan Yükselt' },
]

interface Props {
  subscription?: any
}

export default function DashboardSidebar({ subscription }: Props) {
  const path = usePathname()
  const { data: session } = useSession()
  const user = session?.user as any

  const gbUsed  = parseFloat(subscription?.gb_used || 0)
  const gbLimit = parseInt(subscription?.gb_limit || 1)
  const pct     = Math.min(100, (gbUsed / gbLimit) * 100).toFixed(1)

  return (
    <aside className="w-60 flex-shrink-0 bg-surface border-r border-border
                      fixed top-16 bottom-0 left-0 overflow-y-auto scrollbar-hide">
      <div className="p-3 space-y-1 mt-3">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-600 px-3 py-1">Ana Menü</p>
        {links.map(l => (
          <Link key={l.href} href={l.href}
            className={clsx('sidebar-link', path === l.href && 'active')}>
            <i className={`fa ${l.icon} w-4 text-center text-sm`} />
            {l.label}
          </Link>
        ))}
      </div>

      <div className="p-3 space-y-1 mt-2">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-600 px-3 py-1">Hesap</p>
        {accountLinks.map(l => (
          <Link key={l.href} href={l.href}
            className={clsx('sidebar-link', path === l.href && 'active')}>
            <i className={`fa ${l.icon} w-4 text-center text-sm`} />
            {l.label}
          </Link>
        ))}
      </div>

      {/* Bandwidth gauge */}
      {subscription && (
        <div className="mx-3 mt-4 p-4 bg-surface2 border border-border rounded-xl">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Bant Genişliği</p>
          <div className="flex justify-between text-xs mb-2">
            <span className="text-gray-300">{gbUsed.toFixed(1)} GB</span>
            <span className="text-gray-500">{gbLimit} GB</span>
          </div>
          <div className="h-1.5 bg-border2 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent to-purple-500 transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {(gbLimit - gbUsed).toFixed(1)} GB kaldı
          </p>
        </div>
      )}

      {/* User info at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-border">
        <div className="flex items-center gap-3 px-2 py-2">
          {user?.image ? (
            <img src={user.image} className="w-8 h-8 rounded-full object-cover" alt="" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-black font-bold text-xs">
              {user?.name?.[0]?.toUpperCase()}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">{user?.name}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
