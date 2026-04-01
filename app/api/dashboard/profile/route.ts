// app/api/dashboard/profile/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import bcrypt from 'bcryptjs'
import db from '@/lib/db'

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = (session.user as any).id
  const { name } = await req.json()
  await db.query('UPDATE users SET name=$1 WHERE id=$2', [name, userId])
  return NextResponse.json({ ok: true })
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = (session.user as any).id
  const { currentPassword, newPassword } = await req.json()

  const { rows } = await db.query('SELECT password_hash FROM users WHERE id=$1', [userId])
  if (!rows[0]?.password_hash) return NextResponse.json({ error: 'Google hesabında şifre değiştirilemez.' }, { status: 400 })

  const ok = await bcrypt.compare(currentPassword, rows[0].password_hash)
  if (!ok) return NextResponse.json({ error: 'Mevcut şifre hatalı.' }, { status: 400 })

  const hash = await bcrypt.hash(newPassword, 12)
  await db.query('UPDATE users SET password_hash=$1 WHERE id=$2', [hash, userId])
  return NextResponse.json({ ok: true })
}
