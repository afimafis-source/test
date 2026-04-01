// app/api/proxy/test/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await new Promise(r => setTimeout(r, 600 + Math.random() * 400))
  return NextResponse.json({ ok: true, latency: Math.floor(Math.random() * 180 + 30), ip: '203.45.67.89' })
}
