'use client'

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const data = [
  { name: 'Pzt', requests: 120, success: 96 },
  { name: 'Sal', requests: 210, success: 180 },
  { name: 'Çar', requests: 260, success: 231 },
  { name: 'Per', requests: 320, success: 288 },
  { name: 'Cum', requests: 430, success: 402 },
  { name: 'Cmt', requests: 390, success: 351 },
  { name: 'Paz', requests: 520, success: 489 },
]

export default function HeroTrafficChart() {
  return (
    <div className="chart-shell">
      <div className="mb-3 d-flex align-items-center justify-content-between">
        <div>
          <div className="small text-secondary fw-semibold">Canlı Trafik Görünümü</div>
          <div className="fw-bold fs-5 text-dark">Haftalık istek hacmi</div>
        </div>
        <span className="badge rounded-pill text-bg-success px-3 py-2">
          <i className="bi bi-activity me-2" />
          Canlı
        </span>
      </div>

      <div style={{ width: '100%', height: 320 }}>
        <ResponsiveContainer>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="requestsFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0d6efd" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#0d6efd" stopOpacity={0.04} />
              </linearGradient>
              <linearGradient id="successFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#20c997" stopOpacity={0.28} />
                <stop offset="95%" stopColor="#20c997" stopOpacity={0.03} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e9ecef" />
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="requests"
              stroke="#0d6efd"
              fillOpacity={1}
              fill="url(#requestsFill)"
              strokeWidth={3}
            />
            <Area
              type="monotone"
              dataKey="success"
              stroke="#20c997"
              fillOpacity={1}
              fill="url(#successFill)"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}