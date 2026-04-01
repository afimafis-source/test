// app/api/dashboard/usage/monthly/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import db from '@/lib/db'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = (session.user as any).id

  const { rows } = await db.query(`
    SELECT
      DATE_TRUNC('day', hour_bucket) as day,
      TO_CHAR(DATE_TRUNC('day', hour_bucket), 'DD Mon') as label,
      SUM(gb_used)::NUMERIC(10,4) as gb,
      SUM(requests_count) as requests,
      SUM(success_count) as success,
      SUM(error_count) as errors,
      AVG(avg_response_ms)::INTEGER as avg_ms
    FROM usage_stats
    WHERE user_id=$1 AND hour_bucket >= NOW() - INTERVAL '30 days'
    GROUP BY DATE_TRUNC('day', hour_bucket)
    ORDER BY 1
  `, [userId])

  return NextResponse.json(rows)
}
