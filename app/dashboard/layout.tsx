// app/dashboard/layout.tsx
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Navbar from '@/components/Navbar'
import DashboardSidebar from '@/components/DashboardSidebar'
import db from '@/lib/db'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/auth/login')

  const userId = (session.user as any).id
  const { rows } = await db.query(`
    SELECT s.*, p.name as plan_name, p.gb_amount, pr.name as product_name
    FROM subscriptions s
    JOIN plans p ON p.id = s.plan_id
    JOIN products pr ON pr.id = s.product_id
    WHERE s.user_id=$1 AND s.status='active'
    ORDER BY s.created_at DESC LIMIT 1
  `, [userId])

  return (
    <>
      <Navbar />
      <div className="flex pt-16 min-h-screen">
        <DashboardSidebar subscription={rows[0] || null} />
        <main className="flex-1 ml-60 p-8 min-h-screen bg-bg">
          {children}
        </main>
      </div>
    </>
  )
}
