# ProxyZen — Next.js + Tailwind CSS

Evomi benzeri proxy SaaS platformu. Next.js 14 App Router + Tailwind CSS + PostgreSQL + NextAuth.js

## Kurulum

```bash
# 1. Paketleri kur
npm install

# 2. .env.local oluştur
cp .env.example .env.local
# Sonra .env.local dosyasını aç ve DATABASE_URL, NEXTAUTH_SECRET doldur

# 3. Veritabanı tablolarını oluştur
node scripts/migrate.js

# 4. Demo veriyi ekle
node scripts/seed.js

# 5. Başlat
npm run dev
```

Tarayıcıda aç: **http://localhost:3000**

## Giriş Bilgileri

| Hesap | E-posta | Şifre |
|-------|---------|-------|
| Admin | admin@proxyzen.io | Admin@123456 |
| Demo  | demo@proxyzen.io  | Demo@123456  |

## .env.local içeriği

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=herhangi_32_karakterlik_rastgele_yazi

DATABASE_URL=postgresql://postgres:SIFREN@localhost:5432/proxyzen

# Google OAuth (opsiyonel)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

ADMIN_EMAIL=admin@proxyzen.io
ADMIN_PASSWORD=Admin@123456
```

## Stack

- **Next.js 14** — App Router
- **Tailwind CSS** — Styling
- **NextAuth.js** — Auth (Credentials + Google OAuth)
- **PostgreSQL** — Veritabanı
- **Recharts** — Grafikler
- **Lucide React** — İkonlar
