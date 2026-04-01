// app/api/dashboard/stats/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import db from '@/lib/db'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const userId = (session.user as any).id

  const [subscription, dailyUsage, hourlyUsage, payments, stats, creds, announcements] =
    await Promise.all([
      db.query(`
        SELECT s.*, p.name as plan_name, p.gb_amount, pr.name as product_name, pr.category
        FROM subscriptions s
        JOIN plans p ON p.id = s.plan_id
        JOIN products pr ON pr.id = s.product_id
        WHERE s.user_id=$1 AND s.status='active'
        ORDER BY s.created_at DESC LIMIT 1`, [userId]),

      db.query(`
        SELECT TO_CHAR(DATE_TRUNC('day',hour_bucket),'DD Mon') as label,
               SUM(gb_used)::NUMERIC(10,4) as gb,
               SUM(requests_count) as requests,
               SUM(success_count) as success,
               AVG(avg_response_ms)::INTEGER as avg_ms
        FROM usage_stats
        WHERE user_id=$1 AND hour_bucket >= NOW() - INTERVAL '7 days'
        GROUP BY DATE_TRUNC('day',hour_bucket) ORDER BY 1`, [userId]),

      db.query(`
        SELECT TO_CHAR(hour_bucket,'HH24:00') as label,
               SUM(gb_used)::NUMERIC(10,4) as gb,
               SUM(requests_count) as requests
        FROM usage_stats
        WHERE user_id=$1 AND hour_bucket >= NOW() - INTERVAL '24 hours'
        GROUP BY hour_bucket ORDER BY hour_bucket`, [userId]),

      db.query(`SELECT * FROM payments WHERE user_id=$1 ORDER BY created_at DESC LIMIT 5`, [userId]),

      db.query(`
        SELECT COALESCE(SUM(gb_used),0)::NUMERIC(10,4) as total_gb_month,
               COALESCE(SUM(requests_count),0) as total_requests_month,
               COALESCE(AVG(avg_response_ms),0)::INTEGER as avg_response_ms,
               COALESCE(SUM(success_count)::FLOAT/NULLIF(SUM(requests_count),0)*100,0)::NUMERIC(5,1) as success_rate
        FROM usage_stats
        WHERE user_id=$1 AND hour_bucket >= DATE_TRUNC('month',NOW())`, [userId]),

      db.query(`SELECT pc.*, s.status as sub_status, pr.name as product_name
        FROM proxy_credentials pc
        JOIN subscriptions s ON s.id=pc.subscription_id
        JOIN products pr ON pr.id=s.product_id
        WHERE pc.user_id=$1 AND pc.is_active=true LIMIT 3`, [userId]),

      db.query(`SELECT * FROM announcements WHERE is_active=true ORDER BY created_at DESC LIMIT 3`),
    ])

  return NextResponse.json({
    subscription: subscription.rows[0] || null,
    dailyUsage:   dailyUsage.rows,
    hourlyUsage:  hourlyUsage.rows,
    payments:     payments.rows,
    stats:        stats.rows[0],
    creds:        creds.rows,
    announcements: announcements.rows,
  })
}
