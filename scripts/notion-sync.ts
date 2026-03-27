import fs from 'fs';
import path from 'path';

/**
 * Phantom Labs → Notion Workspace Sync
 * 
 * Creates and maintains a structured Notion workspace with:
 * - Master Strategy (from MASTER_STRATEGY.md)
 * - YC S26 Application (from yc_s26_application_draft.md)
 * - Roadmap Tracker (database)
 * - Simulation Reports (database)
 * - Architecture Docs
 * - Security Posture
 * 
 * Usage:
 *   NOTION_TOKEN=ntn_xxx NOTION_PARENT_PAGE_ID=xxx npx tsx scripts/notion-sync.ts
 *   npx tsx scripts/notion-sync.ts --dry-run
 * 
 * Prerequisites:
 *   npm install @notionhq/client
 */

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_PARENT_PAGE_ID = process.env.NOTION_PARENT_PAGE_ID;
const DRY_RUN = process.argv.includes('--dry-run');

// ─── Document Manifest ────────────────────────────────────────────────

interface SyncDocument {
  title: string;
  emoji: string;
  sourcePath: string;
  type: 'page' | 'database';
}

const SYNC_MANIFEST: SyncDocument[] = [
  {
    title: 'Master Strategy',
    emoji: '🎯',
    sourcePath: 'apps/dashboard/src/content/docs/MASTER_STRATEGY.md',
    type: 'page',
  },
  {
    title: 'YC S26 Application Draft',
    emoji: '🚀',
    sourcePath: 'apps/dashboard/src/content/docs/yc_s26_application_draft.md',
    type: 'page',
  },
  {
    title: 'Architecture & Technical Docs',
    emoji: '🏗️',
    sourcePath: 'apps/dashboard/src/content/docs/architecture.md',
    type: 'page',
  },
  {
    title: 'Security Posture',
    emoji: '🔒',
    sourcePath: 'SECURITY.md',
    type: 'page',
  },
  {
    title: 'Contributing Guidelines',
    emoji: '🤝',
    sourcePath: 'CONTRIBUTING.md',
    type: 'page',
  },
];

const DATABASE_SCHEMAS = [
  {
    title: 'Roadmap Tracker',
    emoji: '📊',
    properties: {
      'Task': { title: {} },
      'Phase': { select: { options: [
        { name: 'Phase 1', color: 'blue' },
        { name: 'Phase 2', color: 'green' },
        { name: 'Phase 3', color: 'purple' },
        { name: 'Phase 4', color: 'orange' },
      ]}},
      'Status': { select: { options: [
        { name: 'Done', color: 'green' },
        { name: 'In Progress', color: 'yellow' },
        { name: 'Planned', color: 'gray' },
      ]}},
      'Owner': { rich_text: {} },
      'Priority': { select: { options: [
        { name: 'P0 - Critical', color: 'red' },
        { name: 'P1 - High', color: 'orange' },
        { name: 'P2 - Medium', color: 'yellow' },
      ]}},
    },
  },
  {
    title: 'Simulation Reports',
    emoji: '👻',
    properties: {
      'Simulation ID': { title: {} },
      'Target URL': { url: {} },
      'PMF Score': { number: { format: 'percent' } },
      'Friction Score': { number: { format: 'percent' } },
      'Ghosts Deployed': { number: {} },
      'Date': { date: {} },
      'Status': { select: { options: [
        { name: 'Completed', color: 'green' },
        { name: 'Running', color: 'blue' },
        { name: 'Failed', color: 'red' },
      ]}},
    },
  },
  {
    title: 'Waitlist Dashboard',
    emoji: '📋',
    properties: {
      'Email': { title: {} },
      'Signup Date': { date: {} },
      'Source': { select: { options: [
        { name: 'Landing Page', color: 'blue' },
        { name: 'Blog', color: 'green' },
        { name: 'Roast Tool', color: 'orange' },
        { name: 'Direct', color: 'gray' },
      ]}},
      'Status': { select: { options: [
        { name: 'Waiting', color: 'gray' },
        { name: 'Invited', color: 'blue' },
        { name: 'Active', color: 'green' },
      ]}},
    },
  },
];

// ─── Markdown → Notion Blocks Converter ───────────────────────────────

function markdownToNotionBlocks(markdown: string): any[] {
  const lines = markdown.split('\n');
  const blocks: any[] = [];

  for (const line of lines) {
    if (line.startsWith('# ')) {
      blocks.push({
        object: 'block',
        type: 'heading_1',
        heading_1: { rich_text: [{ type: 'text', text: { content: line.slice(2) } }] },
      });
    } else if (line.startsWith('## ')) {
      blocks.push({
        object: 'block',
        type: 'heading_2',
        heading_2: { rich_text: [{ type: 'text', text: { content: line.slice(3) } }] },
      });
    } else if (line.startsWith('### ')) {
      blocks.push({
        object: 'block',
        type: 'heading_3',
        heading_3: { rich_text: [{ type: 'text', text: { content: line.slice(4) } }] },
      });
    } else if (line.startsWith('- [x] ')) {
      blocks.push({
        object: 'block',
        type: 'to_do',
        to_do: { rich_text: [{ type: 'text', text: { content: line.slice(6) } }], checked: true },
      });
    } else if (line.startsWith('- [ ] ')) {
      blocks.push({
        object: 'block',
        type: 'to_do',
        to_do: { rich_text: [{ type: 'text', text: { content: line.slice(6) } }], checked: false },
      });
    } else if (line.startsWith('- ')) {
      blocks.push({
        object: 'block',
        type: 'bulleted_list_item',
        bulleted_list_item: { rich_text: [{ type: 'text', text: { content: line.slice(2) } }] },
      });
    } else if (line.startsWith('---')) {
      blocks.push({ object: 'block', type: 'divider', divider: {} });
    } else if (line.trim() === '') {
      // Skip empty lines
    } else {
      blocks.push({
        object: 'block',
        type: 'paragraph',
        paragraph: { rich_text: [{ type: 'text', text: { content: line } }] },
      });
    }
  }

  return blocks;
}

// ─── Main Sync Logic ──────────────────────────────────────────────────

async function syncToNotion() {
  console.log('\n  ╔══════════════════════════════════════╗');
  console.log('  ║  PHANTOM LABS → NOTION SYNC          ║');
  console.log('  ╚══════════════════════════════════════╝\n');

  if (DRY_RUN) {
    console.log('  [DRY RUN] No changes will be made to Notion.\n');
  }

  if (!NOTION_TOKEN || !NOTION_PARENT_PAGE_ID) {
    console.error('  ERROR: Missing environment variables.');
    console.error('  Required: NOTION_TOKEN, NOTION_PARENT_PAGE_ID');
    console.error('');
    console.error('  How to set up:');
    console.error('  1. Go to https://www.notion.so/my-integrations');
    console.error('  2. Create a new integration named "Phantom Labs"');
    console.error('  3. Copy the Internal Integration Token');
    console.error('  4. Create a parent page in Notion and share it with the integration');
    console.error('  5. Copy the page ID from the URL');
    console.error('');
    console.error('  Then run:');
    console.error('  $env:NOTION_TOKEN="ntn_xxx"; $env:NOTION_PARENT_PAGE_ID="xxx"; npx tsx scripts/notion-sync.ts');
    process.exit(1);
  }

  // Dynamic import to avoid crashes when @notionhq/client isn't installed
  let Client: any;
  try {
    const notion = await import('@notionhq/client');
    Client = notion.Client;
  } catch {
    console.error('  ERROR: @notionhq/client not installed.');
    console.error('  Run: npm install @notionhq/client');
    process.exit(1);
  }

  const client = new Client({ auth: NOTION_TOKEN });

  // Resolve project root
  const projectRoot = path.resolve(process.cwd());

  // 1. Sync document pages
  console.log('  [1/2] Syncing document pages...');
  for (const doc of SYNC_MANIFEST) {
    const fullPath = path.join(projectRoot, doc.sourcePath);
    if (!fs.existsSync(fullPath)) {
      console.log(`    ⚠ Skipping "${doc.title}" — file not found: ${doc.sourcePath}`);
      continue;
    }

    const content = fs.readFileSync(fullPath, 'utf8');
    const blocks = markdownToNotionBlocks(content);

    if (DRY_RUN) {
      console.log(`    ✓ [DRY] Would create/update: "${doc.title}" (${blocks.length} blocks)`);
      continue;
    }

    try {
      // Create page (in production, search for existing page first for idempotency)
      const page = await client.pages.create({
        parent: { page_id: NOTION_PARENT_PAGE_ID },
        icon: { type: 'emoji', emoji: doc.emoji },
        properties: {
          title: { title: [{ text: { content: doc.title } }] },
        },
        // Notion API limits to 100 blocks per request
        children: blocks.slice(0, 100),
      });

      // Append remaining blocks if > 100
      if (blocks.length > 100) {
        for (let i = 100; i < blocks.length; i += 100) {
          await client.blocks.children.append({
            block_id: page.id,
            children: blocks.slice(i, i + 100),
          });
        }
      }

      console.log(`    ✓ Created: "${doc.title}" (${blocks.length} blocks)`);
    } catch (err: any) {
      console.error(`    ✗ Failed: "${doc.title}" — ${err.message}`);
    }
  }

  // 2. Create databases
  console.log('  [2/2] Creating databases...');
  for (const schema of DATABASE_SCHEMAS) {
    if (DRY_RUN) {
      console.log(`    ✓ [DRY] Would create database: "${schema.title}" (${Object.keys(schema.properties).length} properties)`);
      continue;
    }

    try {
      await client.databases.create({
        parent: { page_id: NOTION_PARENT_PAGE_ID },
        icon: { type: 'emoji', emoji: schema.emoji },
        title: [{ text: { content: schema.title } }],
        properties: schema.properties,
      });
      console.log(`    ✓ Created database: "${schema.title}"`);
    } catch (err: any) {
      console.error(`    ✗ Failed: "${schema.title}" — ${err.message}`);
    }
  }

  console.log('\n  Sync complete.\n');
}

syncToNotion().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
