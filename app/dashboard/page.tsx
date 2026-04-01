'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/auth/login')
  }, [status, router])

  useEffect(() => {
    fetch('/api/dashboard/stats').then(r => r.json()).then(setData)
  }, [])

  if (status === 'loading' || !data) {
    return <div>Yükleniyor...</div>
  }

  return (
    <div>
      {/* sadece dashboard kartları, grafikler, tablolar */}
    </div>
  )
}