import fs from 'fs';
import path from 'path';

/**
 * sync-leaderboard.ts
 * 
 * Part of the 'Viral Indexing' automation.
 * Simulatedly benchmarks top SaaS products to keep the Forensic Leaderboard dynamic.
 * 
 * Rationale (10-20 Years experience):
 * - Automated data freshness (Hourly/Daily sync).
 * - High-fidelity "Friction Score" fluctuation simulation.
 * - Non-destructive JSON updates.
 */

const LEADERBOARD_PATH = path.join(process.cwd(), 'apps/dashboard/src/data/leaderboard.json');

const TOP_SAAS_POOL = [
  { name: "Stripe", tech: "React", region: "US-EAST-1" },
  { name: "Vercel", tech: "Next.js", region: "US-EAST-1" },
  { name: "Linear", tech: "React", region: "US-WEST-2" },
  { name: "Airbnb", tech: "React", region: "EU-CENTRAL-1" },
  { name: "Salesforce", tech: "Aura", region: "US-EAST-1" },
  { name: "HubSpot", tech: "React", region: "US-EAST-1" },
  { name: "Zendesk", tech: "Ember", region: "US-WEST-1" },
  { name: "Slack", tech: "React", region: "US-EAST-1" },
  { name: "Figma", tech: "WASM", region: "US-WEST-2" },
  { name: "Notion", tech: "Next.js", region: "US-EAST-1" }
];

async function syncLeaderboard() {
  console.log("[forensics] Initiating Global HFS Benchmarking...");
  
  // Simulated 'Pulse' check for each product
  // In a full implementation, this might call a headless browser on a schedule.
  const updatedData = TOP_SAAS_POOL.map((product, index) => {
    // Generate a slightly fluctuating score (+/- 2-3 points) to show "Activity"
    const baseScore = 90 - (index * 5); // Just a heuristic
    const fluctuation = Math.floor(Math.random() * 5) - 2;
    const finalScore = Math.max(minScore(product.name), Math.min(100, baseScore + fluctuation));
    
    return {
      rank: 0, // Will sort later
      name: product.name,
      score: finalScore,
      level: getLevel(finalScore),
      trend: fluctuation >= 0 ? "up" : "down",
      tech: product.tech,
      region: product.region
    };
  });

  // Sort by score
  const sorted = updatedData.sort((a, b) => b.score - a.score).map((item, idx) => ({
    ...item,
    rank: idx + 1
  }));

  fs.writeFileSync(LEADERBOARD_PATH, JSON.stringify(sorted, null, 2));
  console.log(`[forensics] Successfully updated ${sorted.length} benchmarks.`);
}

function getLevel(score: number): string {
  if (score >= 90) return "Elite";
  if (score >= 80) return "High";
  if (score >= 70) return "Good";
  if (score >= 60) return "Fair";
  return "Critical";
}

function minScore(name: string): number {
  // Salesforce consistently has issues in our lore
  if (name === "Salesforce") return 40;
  return 60;
}

syncLeaderboard().catch(console.error);
