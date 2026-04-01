// app/api/dashboard/tickets/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import db from '@/lib/db'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json([], { status: 401 })
  const userId = (session.user as any).id
  const { rows } = await db.query(
    'SELECT * FROM tickets WHERE user_id=$1 ORDER BY created_at DESC',
    [userId]
  )
  return NextResponse.json(rows)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = (session.user as any).id
  const { subject, priority, message } = await req.json()

  const { rows } = await db.query(
    'INSERT INTO tickets (user_id, subject, priority) VALUES ($1,$2,$3) RETURNING id',
    [userId, subject, priority || 'normal']
  )
  await db.query(
    'INSERT INTO ticket_messages (ticket_id, user_id, message) VALUES ($1,$2,$3)',
    [rows[0].id, userId, message]
  )
  return NextResponse.json({ ok: true })
}
