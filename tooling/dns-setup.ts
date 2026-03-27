import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from apps/core-engine/.env
dotenv.config({ path: path.resolve(process.cwd(), 'apps/core-engine/.env') });

const USERNAME = process.env.NAMECOM_USERNAME;
const TOKEN = process.env.NAMECOM_TOKEN;
const DOMAIN = 'tryphantom.dev';

if (!USERNAME || !TOKEN) {
  console.error('ERROR: Missing NAMECOM_USERNAME or NAMECOM_TOKEN in .env');
  process.exit(1);
}

const AUTH_HEADER = 'Basic ' + Buffer.from(`${USERNAME}:${TOKEN}`).toString('base64');
const API_BASE = 'https://api.name.com/v4';

async function dnsSetup() {
  console.log(`\n  ╔══════════════════════════════════════╗`);
  console.log(`  ║  PHANTOM LABS → NAME.COM DNS SETUP   ║`);
  console.log(`  ╚══════════════════════════════════════╝\n`);

  try {
    // 1. Fetch current records
    console.log(`  [1/3] Fetching records for ${DOMAIN}...`);
    const listRes = await fetch(`${API_BASE}/domains/${DOMAIN}/records`, {
      headers: { 'Authorization': AUTH_HEADER }
    });

    if (!listRes.ok) {
      const err = await listRes.text();
      throw new Error(`Failed to list records: ${listRes.status} - ${err}`);
    }

    const { records = [] } = await listRes.json() as { records: any[] };
    console.log(`    Found ${records.length} existing records.`);

    // 2. Define target Vercel records
    const targetRecords = [
      { type: 'A', host: '', answer: '76.76.21.21', ttl: 300 },
      { type: 'CNAME', host: 'www', answer: 'cname.vercel-dns.com', ttl: 300 },
      { type: 'CNAME', host: 'app', answer: 'cname.vercel-dns.com', ttl: 300 }
    ];

    // 3. Upsert records
    console.log(`  [2/3] Validating Vercel records...`);
    for (const target of targetRecords) {
      const exists = records.find(r => 
        r.type === target.type && 
        (r.host === target.host || (r.host === DOMAIN && target.host === '')) &&
        r.answer === target.answer
      );

      if (exists) {
        console.log(`    ✓ ${target.type} record for ${target.host || '@'} already points to ${target.answer}.`);
      } else {
        console.log(`    + Creating ${target.type} record for ${target.host || '@'} -> ${target.answer}...`);
        
        // Caution: Check for conflicting records of the same type/host
        const conflicts = records.filter(r => 
          r.type === target.type && 
          (r.host === target.host || (r.host === DOMAIN && target.host === ''))
        );

        for (const conflict of conflicts) {
          console.log(`      - Deleting conflicting ${conflict.type} record (${conflict.answer})...`);
          await fetch(`${API_BASE}/domains/${DOMAIN}/records/${conflict.id}`, {
            method: 'DELETE',
            headers: { 'Authorization': AUTH_HEADER }
          });
        }

        const createRes = await fetch(`${API_BASE}/domains/${DOMAIN}/records`, {
          method: 'POST',
          headers: { 
            'Authorization': AUTH_HEADER,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(target)
        });

        if (createRes.ok) {
          console.log(`      ✓ Created successfully.`);
        } else {
          const err = await createRes.text();
          console.error(`      ✗ Failed: ${createRes.status} - ${err}`);
        }
      }
    }

    console.log(`\n  [3/3] DNS Configuration complete. Propagation may take 1-24 hours.`);
    console.log(`  Check status at: https://vercel.com/dashboard (Project: Phantom AI)\n`);

  } catch (err: any) {
    console.error(`\n  FATAL ERROR: ${err.message}\n`);
    process.exit(1);
  }
}

dnsSetup();
