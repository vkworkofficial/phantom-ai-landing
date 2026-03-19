import { promises as fs } from 'fs';
import path from 'path';

/**
 * PSEOContext represents the structured metadata for a programmatic SEO page.
 * Using a Discriminated Union ensures type-safety across different categories.
 */
export type PSEOContext = 
  | { category: 'Integration'; techStack: string; keyword: string; industry?: string; competitor?: string }
  | { category: 'Benchmark'; industry: string; keyword: string; techStack?: string; competitor?: string }
  | { category: 'Comparison'; competitor: string; keyword: string; techStack?: string; industry?: string }
  | { category: 'ErrorImpact'; keyword: string; techStack?: string; industry?: string; competitor?: string };

/**
 * In-memory cache to prevent redundant disk IO in high-traffic scenarios.
 * Standard "10-20 years experience" pattern for Node.js optimization.
 */
let cache: PSEOContext[] | null = null;
const CACHE_TTL = 300_000; // 5 minutes
let lastFetch = 0;

/**
 * Internal helper to retrieve and cache keywords asynchronously.
 */
async function getKeywords(): Promise<PSEOContext[]> {
  const now = Date.now();
  if (cache && (now - lastFetch < CACHE_TTL)) {
    return cache;
  }

  try {
    const dataPath = path.join(process.cwd(), "src/data/keywords.json");
    const raw = await fs.readFile(dataPath, 'utf8');
    cache = JSON.parse(raw);
    lastFetch = now;
    return cache || [];
  } catch (error) {
    console.error(`[Forensic pSEO] Failed to resolve keywords substrate: ${error}`);
    return [];
  }
}

/**
 * Retrieves contextual data for a specific pSEO slug.
 */
export async function getPSEOData(slug: string): Promise<PSEOContext | null> {
  const keywords = await getKeywords();
  return keywords.find(item => item.keyword === slug) || null;
}

/**
 * Resolves all active pSEO slugs for static path generation.
 */
export async function getAllPSEOSlugs(): Promise<string[]> {
  const keywords = await getKeywords();
  return keywords.map(item => item.keyword);
}

/**
 * Functional metadata generator.
 * Pure function, zero side-effects, deterministic SEO output.
 */
export function generatePSEOMetadata(context: PSEOContext) {
  const defaults = {
    title: 'Forensic User Simulation Insights | Phantom AI',
    description: 'Deep technical dives into the science of user behavior and PMF velocity.'
  };

  switch (context.category) {
    case 'Integration':
      return {
        title: `How to Simulate User Behavior in ${context.techStack}`,
        description: `High-fidelity behavioral simulation for ${context.techStack} applications using the Substrate Protocol.`
      };
    case 'Benchmark':
      return {
        title: `${context.industry} User Behavior Benchmarks 2026`,
        description: `Forensic data on user friction and intent fracture across the ${context.industry} landscape.`
      };
    case 'Comparison':
      return {
        title: `${context.competitor} vs Phantom AI: The Forensic Choice`,
        description: `A technical audit of why engineering teams choose Phantom's proactive simulation over ${context.competitor}'s reactive recording.`
      };
    case 'ErrorImpact':
      const feature = context.keyword.split('-')[0].toUpperCase();
      return {
        title: `Quantifying the Conversion Impact of ${feature} Errors`,
        description: `How specific technical failures degrade PMF velocity and session coherence.`
      };
    default:
      return defaults;
  }
}
