// app/api/admin/stats/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import db from '@/lib/db'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session || (session.user as any).role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const [totalUsers, activeSubs, revenue, newUsers, recentUsers, recentPayments, monthlyRevenue] =
    await Promise.all([
      db.query('SELECT COUNT(*) FROM users'),
      db.query("SELECT COUNT(*) FROM subscriptions WHERE status='active'"),
      db.query("SELECT COALESCE(SUM(amount),0) as total FROM payments WHERE status='paid'"),
      db.query("SELECT COUNT(*) FROM users WHERE created_at >= NOW() - INTERVAL '30 days'"),
      db.query(`SELECT id, name, email, role, created_at, last_login,
        (SELECT COUNT(*) FROM subscriptions WHERE user_id=users.id AND status='active') as active_subs
        FROM users ORDER BY created_at DESC LIMIT 8`),
      db.query(`SELECT p.*, u.name as user_name, u.email as user_email
        FROM payments p JOIN users u ON u.id=p.user_id
        ORDER BY p.created_at DESC LIMIT 8`),
      db.query(`SELECT TO_CHAR(DATE_TRUNC('month',created_at),'Mon YY') as month,
        SUM(amount)::NUMERIC(10,2) as revenue, COUNT(*) as count
        FROM payments WHERE status='paid' AND created_at >= NOW() - INTERVAL '6 months'
        GROUP BY 1, DATE_TRUNC('month',created_at)
        ORDER BY DATE_TRUNC('month',created_at)`),
    ])

  return NextResponse.json({
    stats: {
      totalUsers:    totalUsers.rows[0].count,
      activeSubs:    activeSubs.rows[0].count,
      totalRevenue:  parseFloat(revenue.rows[0].total).toFixed(2),
      newUsersMonth: newUsers.rows[0].count,
    },
    recentUsers:    recentUsers.rows,
    recentPayments: recentPayments.rows,
    monthlyRevenue: monthlyRevenue.rows,
  })
}
