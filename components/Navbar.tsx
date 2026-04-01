'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'
import { ChevronDown, Shield, LayoutDashboard, Settings, LogOut } from 'lucide-react'

export default function Navbar() {
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)
  const user = session?.user as any

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-white/80 backdrop-blur-xl">
      <div className="section flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 text-sm font-bold text-white shadow-glow">
            PZ
          </div>
          <div>
            <div className="text-base font-extrabold tracking-tight text-slate-950">ProxyZen</div>
            <div className="text-xs text-slate-500">Premium Proxy Infrastructure</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/pricing" className="text-sm font-medium text-slate-600 hover:text-slate-950">
            Fiyatlar
          </Link>
          <Link href="/locations" className="text-sm font-medium text-slate-600 hover:text-slate-950">
            Lokasyonlar
          </Link>
          <Link href="/faq" className="text-sm font-medium text-slate-600 hover:text-slate-950">
            SSS
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {session ? (
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-3 rounded-2xl border border-border bg-white px-3 py-2 shadow-soft hover:border-blue-200"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                  {user?.image ? (
                    <img src={user.image} alt={user?.name || 'User'} className="h-9 w-9 rounded-full object-cover" />
                  ) : (
                    user?.name?.[0]?.toUpperCase() || 'U'
                  )}
                </div>
                <div className="hidden text-left sm:block">
                  <div className="text-sm font-semibold text-slate-900">
                    {user?.name?.split(' ')[0] || 'Kullanıcı'}
                  </div>
                  <div className="text-xs text-slate-500">{user?.email}</div>
                </div>
                <ChevronDown className="h-4 w-4 text-slate-500" />
              </button>

              {open && (
                <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-border bg-white p-2 shadow-2xl">
                  {user?.role === 'admin' && (
                    <Link
                      href="/admin"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <Shield className="h-4 w-4" />
                      Admin
                    </Link>
                  )}

                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>

                  <Link
                    href="/settings"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <Settings className="h-4 w-4" />
                    Ayarlar
                  </Link>

                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="flex w-full items-center gap-2 rounded-xl px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Çıkış Yap
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/auth/login" className="btn-ghost">
                Giriş Yap
              </Link>
              <Link href="/auth/register" className="btn-primary">
                Ücretsiz Dene
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}