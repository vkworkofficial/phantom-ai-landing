import fs from 'fs';
import path from 'path';

/**
 * Programmatic SEO Engine for Phantom AI
 * This logic handles the mapping of long-tail keywords to dynamic page templates.
 */

export interface PSEOContext {
  keyword: string;
  category: 'Integration' | 'Benchmark' | 'Comparison' | 'ErrorImpact';
  techStack?: string;
  industry?: string;
  competitor?: string;
}

function getKeywordsSync(): PSEOContext[] {
  try {
    const dataPath = path.join(process.cwd(), "src/data/keywords.json");
    if (fs.existsSync(dataPath)) {
      return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    }
  } catch (e) {
    console.error("Error reading keywords.json", e);
  }
  return [];
}

export async function getPSEOData(slug: string): Promise<PSEOContext | null> {
  const keywords = getKeywordsSync();
  return keywords.find(item => item.keyword === slug) || null;
}

export async function getAllPSEOSlugs(): Promise<string[]> {
  const keywords = getKeywordsSync();
  return keywords.map(item => item.keyword);
}

/**
 * Generates dynamic SEO metadata based on the pSEO context
 */
export function generatePSEOMetadata(context: PSEOContext) {
  switch (context.category) {
    case 'Integration':
      return {
        title: `How to Simulate User Behavior in ${context.techStack}`,
        description: `Deep dive into using Phantom AI to simulate high-fidelity user interactions in ${context.techStack} applications.`
      };
    case 'Benchmark':
      return {
        title: `${context.industry} User Behavior Benchmarks 2026`,
        description: `Forensic data on user friction and conversion rates for top ${context.industry} products.`
      };
    case 'Comparison':
      return {
        title: `${context.competitor} vs Phantom AI: The Forensic Choice`,
        description: `Why leading engineering teams are moving from ${context.competitor} to Phantom AI for forensic-level user simulation.`
      };
    case 'ErrorImpact':
      return {
        title: `Quantifying the Conversion Impact of ${context.keyword.split('-')[0].toUpperCase()} Errors`,
        description: `Forensic analysis of how specific application errors degrade PMF velocity and user retention.`
      };
    default:
      return {
        title: 'Forensic User Simulation Insights',
        description: 'Deep technical dives into the science of user behavior.'
      };
  }
}
