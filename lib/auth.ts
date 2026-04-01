// lib/auth.ts
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import bcrypt from 'bcryptjs'
import db from './db'

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  pages: {
    signIn:  '/auth/login',
    error:   '/auth/login',
  },
  providers: [
    // ── Google OAuth ─────────────────────────────────────────
    ...(process.env.GOOGLE_CLIENT_ID ? [
      GoogleProvider({
        clientId:     process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      })
    ] : []),

    // ── Email / Password ─────────────────────────────────────
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email:    { label: 'E-posta', type: 'email' },
        password: { label: 'Şifre',   type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const { rows } = await db.query(
          'SELECT * FROM users WHERE email = $1',
          [credentials.email.toLowerCase().trim()]
        )
        const user = rows[0]
        if (!user) return null
        if (!user.password_hash) return null

        const ok = await bcrypt.compare(credentials.password, user.password_hash)
        if (!ok) return null

        await db.query('UPDATE users SET last_login=NOW() WHERE id=$1', [user.id])

        return {
          id:    user.id,
          email: user.email,
          name:  user.name,
          image: user.avatar_url,
          role:  user.role,
        }
      },
    }),
  ],

  callbacks: {
    // Google ile giriş → DB'ye kaydet / güncelle
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        const { rows } = await db.query(
          'SELECT * FROM users WHERE google_id=$1 OR email=$2',
          [account.providerAccountId, user.email]
        )
        if (rows.length) {
          await db.query(
            'UPDATE users SET google_id=$1, avatar_url=$2, last_login=NOW() WHERE id=$3',
            [account.providerAccountId, user.image, rows[0].id]
          )
          ;(user as any).role = rows[0].role
          user.id = rows[0].id
        } else {
          const ins = await db.query(
            `INSERT INTO users (email, name, avatar_url, google_id, email_verified, role)
             VALUES ($1,$2,$3,$4,true,'user') RETURNING id, role`,
            [user.email, user.name, user.image, account.providerAccountId]
          )
          ;(user as any).role = ins.rows[0].role
          user.id = ins.rows[0].id
        }
      }
      return true
    },

    async jwt({ token, user }) {
      if (user) {
        token.id   = user.id
        token.role = (user as any).role
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id   = token.id
        ;(session.user as any).role = token.role
      }
      return session
    },
  },
}
