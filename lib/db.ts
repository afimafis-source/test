// lib/db.ts
import { Pool } from 'pg'

declare global {
  var _pgPool: Pool | undefined
}

const pool = global._pgPool ?? new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

if (process.env.NODE_ENV !== 'production') global._pgPool = pool

export const db = {
  query: <T = any>(text: string, params?: any[]) =>
    pool.query<T>(text, params),
  pool,
}

export default db
