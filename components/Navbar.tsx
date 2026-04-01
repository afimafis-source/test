'use client'
// components/Navbar.tsx
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'

export default function Navbar() {
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)
  const user = session?.user as any

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 md:px-10
                    bg-bg/80 backdrop-blur-xl border-b border-border">
      {/* Brand */}
      <Link href="/" className="text-xl font-extrabold tracking-tight">
        Proxy<span className="text-accent">Zen</span>
      </Link>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-1">
        <Link href="/pricing" className="px-3 py-1.5 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-surface transition-all">Fiyatlar</Link>
        <Link href="/locations" className="px-3 py-1.5 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-surface transition-all">Lokasyonlar</Link>
        <Link href="/faq" className="px-3 py-1.5 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-surface transition-all">SSS</Link>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {session ? (
          <>
            {user?.role === 'admin' && (
              <Link href="/admin" className="hidden md:flex px-3 py-1.5 text-xs font-bold rounded-lg bg-gold/10 text-gold border border-gold/20 hover:bg-gold/20 transition-all">
                Admin
              </Link>
            )}
            <div className="relative">
              <button onClick={() => setOpen(!open)} className="flex items-center gap-2 p-1 rounded-xl hover:bg-surface transition-all">
                {user?.image ? (
                  <img src={user.image} className="w-8 h-8 rounded-full object-cover" alt="" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-black font-bold text-sm">
                    {user?.name?.[0]?.toUpperCase()}
                  </div>
                )}
                <span className="hidden md:block text-sm font-semibold">{user?.name?.split(' ')[0]}</span>
                <i className="fa fa-chevron-down text-xs text-gray-500" />
              </button>

              {open && (
                <div className="absolute right-0 top-12 w-48 bg-surface border border-border rounded-xl shadow-2xl overflow-hidden z-50">
                  <Link href="/dashboard" onClick={() => setOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-surface2 transition-all">
                    <i className="fa fa-gauge w-4 text-accent" /> Dashboard
                  </Link>
                  <Link href="/dashboard/settings" onClick={() => setOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-surface2 transition-all">
                    <i className="fa fa-gear w-4 text-gray-400" /> Ayarlar
                  </Link>
                  <div className="border-t border-border my-1" />
                  <button onClick={() => signOut({ callbackUrl: '/' })} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-danger hover:bg-surface2 transition-all">
                    <i className="fa fa-right-from-bracket w-4" /> Çıkış Yap
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link href="/auth/login" className="hidden md:block text-sm text-gray-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-surface transition-all">
              Giriş Yap
            </Link>
            <Link href="/auth/register" className="btn-primary text-sm px-4 py-2">
              Ücretsiz Dene
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
