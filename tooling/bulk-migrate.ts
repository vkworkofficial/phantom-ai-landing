import fs from 'fs';
import path from 'path';
import { Client } from '@notionhq/client';

/**
 * PHANTOM LABS: Sovereign Migration Script
 * Scours the codebase for non-code assets and pushes them to the Notion Wiki.
 */

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const WIKI_ID = "33006593eb2980c59f0ad3aa12e76dc0";

if (!NOTION_TOKEN) {
  console.error("Missing NOTION_TOKEN");
  process.exit(1);
}

const notion = new Client({ auth: NOTION_TOKEN });

function markdownToNotionBlocks(markdown: string): any[] {
  const lines = markdown.split('\n');
  const blocks: any[] = [];

  const parseRichText = (text: string) => {
    const parts: any[] = [];
    let remaining = text;
    while (remaining.length > 0) {
      const boldMatch = remaining.match(/\*\*(.*?)\*\*/);
      const codeMatch = remaining.match(/`(.*?)`/);
      const matches = [
        { index: boldMatch?.index ?? Infinity, type: 'bold', match: boldMatch },
        { index: codeMatch?.index ?? Infinity, type: 'code', match: codeMatch },
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
      }
      remaining = remaining.slice(first.index + matchedText.length);
    }
    return parts.length > 0 ? parts : [{ type: 'text', text: { content: text } }];
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('# ')) {
      blocks.push({ object: 'block', type: 'heading_1', heading_1: { rich_text: parseRichText(trimmed.slice(2)) } });
    } else if (trimmed.startsWith('> ')) {
      blocks.push({ object: 'block', type: 'callout', callout: { rich_text: parseRichText(trimmed.slice(2)), icon: { type: 'emoji', emoji: '💡' } } });
    } else if (trimmed.startsWith('- ')) {
      blocks.push({ object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: parseRichText(trimmed.slice(2)) } });
    } else {
      blocks.push({ object: 'block', type: 'paragraph', paragraph: { rich_text: parseRichText(line) } });
    }
  }
  return blocks;
}

async function migrateFolder(dirPath: string, category: string) {
  console.log(`\n Migrating [${category}] from ${dirPath}...`);
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md') || f.endsWith('.txt'));

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const title = file.replace(/\.(md|txt)$/, '').replace(/_/g, ' ').toUpperCase();

    try {
      await notion.pages.create({
        parent: { type: 'database_id', database_id: WIKI_ID },
        properties: {
          title: { title: [{ text: { content: title } }] },
          Category: { select: { name: category } }
        },
        children: markdownToNotionBlocks(content).slice(0, 100)
      });
      console.log(`  ✓ Migrated: ${title}`);
    } catch (err: any) {
      console.error(`  ✗ Failed: ${title} - ${err.message}`);
    }
  }
}

async function run() {
  await migrateFolder('docs/archive', 'Growth & GTM');
  await migrateFolder('docs/knowledge_base', 'Product & Engineering');
  console.log("\nMigration Complete.");
}

run();
