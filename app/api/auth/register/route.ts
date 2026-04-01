// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import db from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Tüm alanlar zorunludur.' }, { status: 400 })
    }
    if (password.length < 8) {
      return NextResponse.json({ error: 'Şifre en az 8 karakter olmalı.' }, { status: 400 })
    }

    const existing = await db.query('SELECT id FROM users WHERE email=$1', [email.toLowerCase()])
    if (existing.rows.length) {
      return NextResponse.json({ error: 'Bu e-posta zaten kayıtlı.' }, { status: 409 })
    }

    const hash = await bcrypt.hash(password, 12)
    await db.query(
      `INSERT INTO users (name, email, password_hash, email_verified, role)
       VALUES ($1,$2,$3,true,'user')`,
      [name, email.toLowerCase(), hash]
    )

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
