// app/api/dashboard/proxies/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import db from '@/lib/db'

// GET — kullanıcının proxy listesi
export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json([], { status: 401 })
  const userId = (session.user as any).id

  const { rows } = await db.query(`
    SELECT pc.*, s.status as sub_status, pr.name as product_name
    FROM proxy_credentials pc
    LEFT JOIN subscriptions s ON s.id = pc.subscription_id
    LEFT JOIN products pr ON pr.id = s.product_id
    WHERE pc.user_id = $1
    ORDER BY pc.created_at DESC
  `, [userId])

  return NextResponse.json(rows)
}

// POST — yeni proxy ekle
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = (session.user as any).id

  const { username, password, proxy_host, proxy_port, proxy_type } = await req.json()

  if (!username || !password || !proxy_host || !proxy_port) {
    return NextResponse.json({ error: 'Tüm zorunlu alanları doldurun.' }, { status: 400 })
  }

  // Kullanıcının aktif aboneliğini bul
  const { rows: subs } = await db.query(
    `SELECT id FROM subscriptions WHERE user_id=$1 AND status='active' ORDER BY created_at DESC LIMIT 1`,
    [userId]
  )

  const subscriptionId = subs[0]?.id || null

  const { rows } = await db.query(`
    INSERT INTO proxy_credentials
      (user_id, subscription_id, username, password, proxy_host, proxy_port, proxy_type, is_active)
    VALUES ($1, $2, $3, $4, $5, $6, $7, true)
    RETURNING *
  `, [userId, subscriptionId, username, password, proxy_host, parseInt(proxy_port), proxy_type || 'http'])

  return NextResponse.json(rows[0])
}

// DELETE — proxy sil
export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = (session.user as any).id

  const { id } = await req.json()

  await db.query(
    `DELETE FROM proxy_credentials WHERE id=$1 AND user_id=$2`,
    [id, userId]
  )

  return NextResponse.json({ ok: true })
}

// PATCH — proxy aktif/pasif toggle
export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = (session.user as any).id

  const { id, is_active } = await req.json()

  const { rows } = await db.query(
    `UPDATE proxy_credentials SET is_active=$1 WHERE id=$2 AND user_id=$3 RETURNING *`,
    [is_active, id, userId]
  )

  return NextResponse.json(rows[0])
}
