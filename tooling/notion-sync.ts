import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from apps/core-engine/.env
dotenv.config({ path: path.resolve(process.cwd(), 'apps/core-engine/.env') });

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
    title: 'Mission HUD (Live)',
    emoji: '📈',
    sourcePath: 'apps/dashboard/src/content/docs/MISSION_HUD.md',
    type: 'page',
  },
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
  {
    title: 'Deferred Features Manifest',
    emoji: '📋',
    sourcePath: 'apps/dashboard/src/content/docs/DEFERRED_FEATURES.md',
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
];

// ─── Markdown → Notion Blocks Converter ───────────────────────────────

function markdownToNotionBlocks(markdown: string): any[] {
  const lines = markdown.split('\n');
  const blocks: any[] = [];
  let currentCodeBlock: { content: string, language: string } | null = null;

  const parseRichText = (text: string) => {
    const parts: any[] = [];
    let remaining = text;

    while (remaining.length > 0) {
      const boldMatch = remaining.match(/\*\*(.*?)\*\*/);
      const codeMatch = remaining.match(/`(.*?)`/);
      const linkMatch = remaining.match(/\[(.*?)\]\((.*?)\)/);

      const matches = [
        { index: boldMatch?.index ?? Infinity, type: 'bold', match: boldMatch },
        { index: codeMatch?.index ?? Infinity, type: 'code', match: codeMatch },
        { index: linkMatch?.index ?? Infinity, type: 'link', match: linkMatch },
      ].filter(m => m.index !== Infinity).sort((a, b) => a.index - b.index);

      if (matches.length === 0) {
        parts.push({ type: 'text', text: { content: remaining } });
        break;
      }

      const first = matches[0];
      if (first.index > 0) {
        parts.push({ type: 'text', text: { content: remaining.slice(0, first.index) } });
      }

      const matchedText = first.match![0];
      const innerText = first.match![1];

      if (first.type === 'bold') {
        parts.push({ type: 'text', text: { content: innerText }, annotations: { bold: true } });
      } else if (first.type === 'code') {
        parts.push({ type: 'text', text: { content: innerText }, annotations: { code: true } });
      } else if (first.type === 'link') {
        parts.push({ type: 'text', text: { content: innerText, link: { url: first.match![2] } } });
      }

      remaining = remaining.slice(first.index + matchedText.length);
    }

    return parts.length > 0 ? parts : [{ type: 'text', text: { content: text } }];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // 1. Fenced Code Blocks
    if (trimmed.startsWith('```')) {
      if (!currentCodeBlock) {
        currentCodeBlock = { 
          content: '', 
          language: trimmed.slice(3) || 'plain text' 
        };
      } else {
        blocks.push({
          object: 'block',
          type: 'code',
          code: {
            rich_text: [{ type: 'text', text: { content: currentCodeBlock.content.trim() } }],
            language: currentCodeBlock.language,
          },
        });
        currentCodeBlock = null;
      }
      continue;
    }

    if (currentCodeBlock) {
      currentCodeBlock.content += line + '\n';
      continue;
    }

    // 2. Standard Markdown types
    if (trimmed.startsWith('# ')) {
      blocks.push({
        object: 'block',
        type: 'heading_1',
        heading_1: { rich_text: parseRichText(trimmed.slice(2)) },
      });
    } else if (trimmed.startsWith('## ')) {
      blocks.push({
        object: 'block',
        type: 'heading_2',
        heading_2: { rich_text: parseRichText(trimmed.slice(3)) },
      });
    } else if (trimmed.startsWith('### ')) {
      blocks.push({
        object: 'block',
        type: 'heading_3',
        heading_3: { rich_text: parseRichText(trimmed.slice(4)) },
      });
    } else if (trimmed.startsWith('> ') || trimmed.startsWith('>')) {
      blocks.push({
        object: 'block',
        type: 'callout',
        callout: { 
          rich_text: parseRichText(trimmed.replace(/^>\s*/, '')),
          icon: { type: 'emoji', emoji: '💡' }
        },
      });
    } else if (trimmed.startsWith('- [x] ')) {
      blocks.push({
        object: 'block',
        type: 'to_do',
        to_do: { rich_text: parseRichText(trimmed.slice(6)), checked: true },
      });
    } else if (trimmed.startsWith('- [ ] ')) {
      blocks.push({
        object: 'block',
        type: 'to_do',
        to_do: { rich_text: parseRichText(trimmed.slice(6)), checked: false },
      });
    } else if (trimmed.startsWith('- ')) {
      blocks.push({
        object: 'block',
        type: 'bulleted_list_item',
        bulleted_list_item: { rich_text: parseRichText(trimmed.slice(2)) },
      });
    } else if (trimmed.startsWith('---')) {
      blocks.push({ object: 'block', type: 'divider', divider: {} });
    } else if (trimmed === '') {
      blocks.push({
        object: 'block',
        type: 'paragraph',
        paragraph: { rich_text: [] },
      });
    } else {
      blocks.push({
        object: 'block',
        type: 'paragraph',
        paragraph: { rich_text: parseRichText(line) },
      });
    }
  }

  return blocks;
}

// ─── Utility Functions ───────────────────────────────────────────────

async function findPageByTitle(client: any, title: string, parentId: string) {
  const response = await client.search({
    query: title,
    filter: { property: 'object', value: 'page' },
  });
  
  // Verify it's in the same parent to avoid across-workspace collisions
  return response.results.find((page: any) => {
    const parent = page.parent;
    return (parent.type === 'page_id' && parent.page_id === parentId) ||
           (parent.type === 'database_id' && parent.database_id === parentId);
  });
}

async function clearPageBlocks(client: any, pageId: string) {
  const response = await client.blocks.children.list({ block_id: pageId });
  for (const block of response.results) {
    await client.blocks.delete({ block_id: block.id });
  }
}

// ─── Main Sync Logic ──────────────────────────────────────────────────

async function syncToNotion() {
  console.log('\n  ╔══════════════════════════════════════╗');
  console.log('  ║  PHANTOM LABS → NOTION SYNC (v2.0)   ║');
  console.log('  ╚══════════════════════════════════════╝\n');

  if (DRY_RUN) {
    console.log('  [DRY RUN] Performance: Simulation Mode Active.\n');
  }

  if (!NOTION_TOKEN || !NOTION_PARENT_PAGE_ID) {
    console.error('  ERROR: Missing Notion credentials in environment.');
    console.error('  Check apps/core-engine/.env for NOTION_TOKEN and NOTION_PARENT_PAGE_ID.');
    process.exit(1);
  }

  const { Client } = await import('@notionhq/client');
  const client = new Client({ auth: NOTION_TOKEN });

  const projectRoot = path.resolve(process.cwd());

  // 1. Sync document pages (with Upsert logic)
  console.log('  [1/2] Syncing document pages (Idempotent)...');
  for (const doc of SYNC_MANIFEST) {
    const fullPath = path.join(projectRoot, doc.sourcePath);
    if (!fs.existsSync(fullPath)) continue;

    const content = fs.readFileSync(fullPath, 'utf8');
    const blocks = markdownToNotionBlocks(content);

    if (DRY_RUN) {
      console.log(`    ✓ [DRY] Would update: "${doc.title}"`);
      continue;
    }

    try {
      const existingPage = await findPageByTitle(client, doc.title, NOTION_PARENT_PAGE_ID);

      if (existingPage) {
        console.log(`    ↻ Updating: "${doc.title}"...`);
        await clearPageBlocks(client, existingPage.id);
        await client.blocks.children.append({
          block_id: existingPage.id,
          children: blocks.slice(0, 100),
        });
        
        if (blocks.length > 100) {
          for (let i = 100; i < blocks.length; i += 100) {
            await client.blocks.children.append({
              block_id: existingPage.id,
              children: blocks.slice(i, i + 100),
            });
          }
        }
        console.log(`      ✓ Refreshed successfully.`);
      } else {
        console.log(`    + Creating: "${doc.title}"...`);
        await client.pages.create({
          parent: { type: 'page_id', page_id: NOTION_PARENT_PAGE_ID },
          icon: { type: 'emoji', emoji: doc.emoji },
          properties: { title: { title: [{ text: { content: doc.title } }] } },
          children: blocks.slice(0, 100),
        });
        console.log(`      ✓ Initialized successfully.`);
      }
    } catch (err: any) {
      console.error(`    ✗ Failed: "${doc.title}" — ${err.message}`);
    }
  }

  // 2. Sync Databases
  console.log('\n  [2/2] Syncing databases...');
  for (const schema of DATABASE_SCHEMAS) {
    if (DRY_RUN) {
      console.log(`    ✓ [DRY] Would verify database: "${schema.title}"`);
      continue;
    }

    try {
      const existingDb = await findPageByTitle(client, schema.title, NOTION_PARENT_PAGE_ID);
      if (!existingDb) {
        console.log(`    + Initializing Database: "${schema.title}"...`);
        await client.databases.create({
          parent: { type: 'page_id', page_id: NOTION_PARENT_PAGE_ID },
          icon: { type: 'emoji', emoji: schema.emoji },
          title: [{ text: { content: schema.title } }],
          properties: schema.properties as any,
        });
        console.log(`      ✓ Database ready.`);
      } else {
        console.log(`    ✓ Database "${schema.title}" already verified.`);
      }
    } catch (err: any) {
      console.error(`    ✗ Failed: "${schema.title}" — ${err.message}`);
    }
  }

  console.log('\n  Substrate synchronization complete.\n');
}

syncToNotion().catch(err => {
  console.error('Fatal sync error:', err);
  process.exit(1);
});
