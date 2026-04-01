// scripts/seed.js
require('dotenv').config({ path: '.env.local' })
const { Pool } = require('pg')
const bcrypt = require('bcryptjs')
const pool = new Pool({ connectionString: process.env.DATABASE_URL })

async function seed() {
  console.log('🌱 Seed başlıyor...')
  const client = await pool.connect()
  try {
    // Admin
    const adminHash = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin@123456', 12)
    await client.query(`INSERT INTO users (email,password_hash,name,role,email_verified) VALUES ($1,$2,'Admin','admin',true) ON CONFLICT (email) DO NOTHING`,
      [process.env.ADMIN_EMAIL || 'admin@proxyzen.io', adminHash])
    console.log('✅ Admin')

    // Products
    const products = [
      { slug:'residential',       name:'Residential Proxies',  desc:'54M+ ethically sourced IPs.', cat:'residential', price:0.49, features:JSON.stringify(['54M+ IPs worldwide','Country, City & ASN targeting','Rotating & Sticky sessions','HTTP/HTTPS/SOCKS5','99.9% uptime SLA']) },
      { slug:'premium-residential',name:'Premium Residential', desc:'Premium quality performance.', cat:'residential', price:1.49, features:JSON.stringify(['Ultra-clean IP pool','Priority routing','Advanced geo-targeting','Dedicated account manager','Custom session control']) },
      { slug:'datacenter',        name:'Datacenter Proxies',   desc:'Blazing fast budget IPs.',    cat:'datacenter',  price:0.09, features:JSON.stringify(['10Gbps bandwidth','Unlimited threads','Shared & dedicated','IPv4 & IPv6','Auto-rotation']) },
      { slug:'mobile',            name:'Mobile Proxies',       desc:'Real 4G/5G mobile IPs.',      cat:'mobile',      price:2.99, features:JSON.stringify(['Real 4G/5G devices','Carrier-level authenticity','Global mobile coverage','Ultra-low detection','Session persistence']) },
      { slug:'static-residential',name:'Static Residential',  desc:'Fixed real residential IPs.', cat:'static',      price:3.49, features:JSON.stringify(['Fixed IP address','ISP-assigned residential','Unlimited bandwidth','Long-term assignment','Perfect for accounts']) },
    ]
    const productIds = {}
    for (const p of products) {
      const r = await client.query(`INSERT INTO products (slug,name,description,category,price_per_gb,features,sort_order) VALUES ($1,$2,$3,$4,$5,$6,$7) ON CONFLICT (slug) DO UPDATE SET name=EXCLUDED.name RETURNING id`,
        [p.slug, p.name, p.desc, p.cat, p.price, p.features, Object.keys(productIds).length])
      productIds[p.slug] = r.rows[0].id
    }
    console.log('✅ Ürünler')

    // Plans
    const plans = [
      { p:'residential', name:'Starter',    gb:5,    price:2.45,   extra:0.49 },
      { p:'residential', name:'Growth',     gb:100,  price:49.99,  extra:0.49, pop:true },
      { p:'residential', name:'Scale',      gb:500,  price:199.99, extra:0.39 },
      { p:'residential', name:'Enterprise', gb:2000, price:699.99, extra:0.29 },
      { p:'datacenter',  name:'Starter',    gb:50,   price:4.50,   extra:0.09 },
      { p:'datacenter',  name:'Business',   gb:500,  price:40.00,  extra:0.08, pop:true },
      { p:'mobile',      name:'Trial',      gb:1,    price:2.99,   extra:2.99 },
      { p:'mobile',      name:'Pro',        gb:20,   price:49.99,  extra:2.50, pop:true },
    ]
    for (const pl of plans) {
      await client.query(`INSERT INTO plans (product_id,name,gb_amount,price_monthly,price_gb_extra,is_popular) VALUES ($1,$2,$3,$4,$5,$6) ON CONFLICT DO NOTHING`,
        [productIds[pl.p], pl.name, pl.gb, pl.price, pl.extra, pl.pop||false])
    }
    console.log('✅ Planlar')

    // Demo user
    const demoHash = await bcrypt.hash('Demo@123456', 12)
    await client.query(`INSERT INTO users (email,password_hash,name,role,email_verified,balance) VALUES ('demo@proxyzen.io',$1,'Demo User','user',true,25.00) ON CONFLICT (email) DO NOTHING`, [demoHash])

    const demoUser = await client.query(`SELECT id FROM users WHERE email='demo@proxyzen.io'`)
    const growthPlan = await client.query(`SELECT id FROM plans WHERE name='Growth' LIMIT 1`)
    const resProd = await client.query(`SELECT id FROM products WHERE slug='residential'`)

    if (demoUser.rows.length && growthPlan.rows.length) {
      const subR = await client.query(`INSERT INTO subscriptions (user_id,plan_id,product_id,status,gb_used,gb_limit,expires_at) VALUES ($1,$2,$3,'active',12.45,100,NOW()+INTERVAL '30 days') ON CONFLICT DO NOTHING RETURNING id`,
        [demoUser.rows[0].id, growthPlan.rows[0].id, resProd.rows[0].id])

      if (subR.rows.length) {
        const subId = subR.rows[0].id
        await client.query(`INSERT INTO proxy_credentials (user_id,subscription_id,username,password) VALUES ($1,$2,'demo_user_1a2b3c','proxy_pass_xyz789') ON CONFLICT DO NOTHING`,
          [demoUser.rows[0].id, subId])

        // 7 days of hourly usage stats
        for (let i = 6; i >= 0; i--) {
          for (let h = 0; h < 24; h++) {
            const gb = (Math.random()*0.8+0.1).toFixed(6)
            const reqs = Math.floor(Math.random()*500+100)
            await client.query(`INSERT INTO usage_stats (user_id,subscription_id,hour_bucket,gb_used,requests_count,success_count,avg_response_ms) VALUES ($1,$2,NOW()-INTERVAL '${i} days'+($3||' hours')::INTERVAL,$4,$5,$6,$7) ON CONFLICT DO NOTHING`,
              [demoUser.rows[0].id, subId, h, gb, reqs, Math.floor(reqs*0.96), Math.floor(Math.random()*200+50)])
          }
        }

        // Payments
        for (const [amount, desc, days] of [[49.99,'Growth Plan - Monthly',30],[49.99,'Growth Plan - Monthly',60],[14.99,'Extra 30GB bandwidth',45]]) {
          await client.query(`INSERT INTO payments (user_id,subscription_id,amount,status,description,created_at) VALUES ($1,$2,$3,'paid',$4,NOW()-INTERVAL '${days} days') ON CONFLICT DO NOTHING`,
            [demoUser.rows[0].id, subId, amount, desc])
        }
      }
    }
    console.log('✅ Demo kullanıcı + veriler')

    await client.query(`INSERT INTO announcements (title,content,type) VALUES ('🚀 ProxyZen''e Hoş Geldin!','Ücretsiz denemenizi başlatın — kredi kartı gerekmez.','success') ON CONFLICT DO NOTHING`)
    console.log('\n🎉 Seed tamamlandı!')
    console.log('   Admin: admin@proxyzen.io / Admin@123456')
    console.log('   Demo:  demo@proxyzen.io / Demo@123456')
  } catch(e) {
    console.error('❌', e.message)
    process.exit(1)
  } finally {
    client.release()
    await pool.end()
  }
}
seed()
