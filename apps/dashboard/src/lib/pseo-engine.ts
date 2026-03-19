/**
 * pSEO Engine: The Digital Frustration Mapping Substrate
 * 
 * This engine maps long-tail keywords to forensic simulation data,
 * enabling automated generation of high-intent utility pages.
 */

export interface PSEOContext {
  keyword: string;
  category: 'tool' | 'comparison' | 'industry';
  title: string;
  description: string;
  target_url?: string;
}

export const PSEO_KEYWORDS: PSEOContext[] = [
  {
    keyword: 'rage-click-forensics',
    category: 'tool',
    title: 'Rage-Click Forensics: Quantifying Digital Frustration',
    description: 'Move beyond heatmaps. Analyze the cognitive root cause of rage-clicks with AI-powered forensic simulations.'
  },
  {
    keyword: 'pmf-velocity-calculator',
    category: 'tool',
    title: 'PMF Velocity: Quantifying Your Product-Market Fit',
    description: 'Calculate your PMF velocity score using automated Sean Ellis simulations and retention friction analysis.'
  },
  {
    keyword: 'hotjar-vs-phantom',
    category: 'comparison',
    title: 'Phantom AI vs. Hotjar: Forensic Simulation vs. Passive Recording',
    description: 'Why passive session recording is not enough for YC-scale growth. Choose the Forensic Substrate.'
  },
  {
    keyword: 'fintech-conversion-audit',
    category: 'industry',
    title: 'Fintech Conversion Forensics: Optimizing High-Stakes Onboarding',
    description: 'Eliminate friction in complex fintech flows with automated ghost swarms and KYC behavioral tracing.'
  }
];

export async function getPSEOContext(slug: string): Promise<PSEOContext | null> {
  const context = PSEO_KEYWORDS.find(k => k.keyword === slug);
  return context || null;
}

export async function getAllPSEOKeywords(): Promise<string[]> {
  return PSEO_KEYWORDS.map(k => k.keyword);
}
