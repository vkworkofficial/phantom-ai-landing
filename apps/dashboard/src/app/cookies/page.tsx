import React from 'react';
import Link from 'next/link';
import { Cookie } from 'lucide-react';

export const metadata = {
  title: 'Cookie Policy | Phantom AI',
  description: 'How Phantom AI uses cookies and your control over them.',
};

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[#c9d1d9]">
      <header className="border-b border-[#30363d]">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center">
          <Link href="/" className="font-bold text-white tracking-tighter text-lg flex items-center gap-2">
            <div className="w-4 h-4 bg-primary rounded-sm" /> Phantom AI
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <div className="flex items-center gap-3 mb-8">
          <Cookie className="w-6 h-6 text-primary" />
          <h1 className="text-3xl font-bold text-white">Cookie Policy</h1>
        </div>
        <p className="text-[12px] text-[#8b949e] mb-12">Last updated: March 27, 2026</p>

        <div className="space-y-8">
          <section>
            <h2 className="text-lg font-bold text-white mb-3">What Are Cookies</h2>
            <p className="text-[13px] text-[#8b949e] leading-relaxed">
              Cookies are small text files stored on your device when you visit a website. They help us 
              remember your preferences and understand how you use our service. We also use similar technologies 
              like localStorage for consent management.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">Cookies We Use</h2>
            
            <div className="rounded-xl border border-[#30363d] overflow-hidden mb-4">
              <div className="grid grid-cols-[1fr_100px_2fr] gap-4 p-4 bg-[#161b22] border-b border-[#30363d] text-[10px] font-bold text-[#8b949e] uppercase tracking-widest">
                <span>Cookie</span><span>Category</span><span>Purpose</span>
              </div>
              
              <div className="grid grid-cols-[1fr_100px_2fr] gap-4 p-4 border-b border-[#30363d]/50 text-[12px]">
                <code className="text-[#c9d1d9] font-mono text-[11px]">next-auth.session-token</code>
                <span className="text-[#3fb950] text-[10px] font-bold uppercase">Necessary</span>
                <span className="text-[#8b949e]">Authentication session management</span>
              </div>
              <div className="grid grid-cols-[1fr_100px_2fr] gap-4 p-4 border-b border-[#30363d]/50 text-[12px]">
                <code className="text-[#c9d1d9] font-mono text-[11px]">next-auth.csrf-token</code>
                <span className="text-[#3fb950] text-[10px] font-bold uppercase">Necessary</span>
                <span className="text-[#8b949e]">CSRF protection for form submissions</span>
              </div>
              <div className="grid grid-cols-[1fr_100px_2fr] gap-4 p-4 border-b border-[#30363d]/50 text-[12px]">
                <code className="text-[#c9d1d9] font-mono text-[11px]">phantom_consent</code>
                <span className="text-[#3fb950] text-[10px] font-bold uppercase">Necessary</span>
                <span className="text-[#8b949e]">Stores your cookie consent preferences (localStorage)</span>
              </div>
              <div className="grid grid-cols-[1fr_100px_2fr] gap-4 p-4 border-b border-[#30363d]/50 text-[12px]">
                <code className="text-[#c9d1d9] font-mono text-[11px]">phantom_seance_*</code>
                <span className="text-[#3fb950] text-[10px] font-bold uppercase">Necessary</span>
                <span className="text-[#8b949e]">Simulation session recovery data (localStorage)</span>
              </div>
              <div className="grid grid-cols-[1fr_100px_2fr] gap-4 p-4 text-[12px]">
                <code className="text-[#c9d1d9] font-mono text-[11px]">_ga, _gid</code>
                <span className="text-[#d7a22a] text-[10px] font-bold uppercase">Analytics</span>
                <span className="text-[#8b949e]">Google Analytics — only loaded with your explicit consent</span>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">Your Control</h2>
            <p className="text-[13px] text-[#8b949e] leading-relaxed mb-3">
              We respect your choices. Here&rsquo;s how you control cookies:
            </p>
            <ul className="space-y-2 text-[13px] text-[#8b949e]">
              <li className="flex gap-2"><span className="text-primary">•</span><span><strong className="text-[#c9d1d9]">Cookie Banner:</strong> On your first visit, you choose which categories to allow. Analytics and marketing are off by default.</span></li>
              <li className="flex gap-2"><span className="text-primary">•</span><span><strong className="text-[#c9d1d9]">Privacy Settings Button:</strong> Click the shield icon (bottom-left) at any time to change your preferences.</span></li>
              <li className="flex gap-2"><span className="text-primary">•</span><span><strong className="text-[#c9d1d9]">Browser Settings:</strong> You can block or delete cookies through your browser settings.</span></li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">No Pre-Checked Boxes</h2>
            <p className="text-[13px] text-[#8b949e] leading-relaxed">
              We never pre-check optional cookie categories. Analytics and marketing cookies require your 
              explicit, affirmative consent before they are activated. Rejecting them does not affect 
              your ability to use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">Third-Party Scripts</h2>
            <p className="text-[13px] text-[#8b949e] leading-relaxed">
              Third-party scripts (e.g., Google Analytics) are <strong className="text-[#c9d1d9]">blocked entirely</strong> until 
              you grant consent. We do not fire tracking pixels, analytics beacons, or marketing scripts before you 
              explicitly opt in.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">Contact</h2>
            <p className="text-[13px] text-[#8b949e] leading-relaxed">
              Questions? Contact <strong className="text-primary">privacy@tryphantom.dev</strong>.
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-[#30363d] py-8 mt-16">
        <div className="max-w-3xl mx-auto px-6 flex gap-6 text-[11px] text-[#484f58]">
          <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          <Link href="/cookies" className="hover:text-primary transition-colors">Cookie Policy</Link>
          <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
        </div>
      </footer>
    </div>
  );
}
