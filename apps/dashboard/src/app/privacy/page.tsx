import React from 'react';
import Link from 'next/link';
import { Shield } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | Phantom AI',
  description: 'How Phantom AI collects, uses, and protects your data.',
};

export default function PrivacyPolicy() {
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
          <Shield className="w-6 h-6 text-primary" />
          <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
        </div>
        <p className="text-[12px] text-[#8b949e] mb-12">Last updated: March 27, 2026</p>

        <div className="prose-phantom space-y-8">
          <section>
            <h2 className="text-lg font-bold text-white mb-3">1. Who We Are</h2>
            <p className="text-[13px] text-[#8b949e] leading-relaxed">
              Phantom AI (&ldquo;Phantom,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) operates the website <strong className="text-[#c9d1d9]">tryphantom.dev</strong> and associated services. 
              We provide AI-powered synthetic user simulation infrastructure for software testing and product-market fit analysis.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">2. Data We Collect</h2>
            <p className="text-[13px] text-[#8b949e] leading-relaxed mb-3">We practice <strong className="text-[#c9d1d9]">data minimization</strong>. We only collect what is necessary:</p>
            <ul className="space-y-2 text-[13px] text-[#8b949e]">
              <li className="flex gap-2"><span className="text-primary">•</span><span><strong className="text-[#c9d1d9]">Account Data:</strong> Email address, hashed password (if using credentials login).</span></li>
              <li className="flex gap-2"><span className="text-primary">•</span><span><strong className="text-[#c9d1d9]">Waitlist Data:</strong> Email address, signup timestamp, referral source.</span></li>
              <li className="flex gap-2"><span className="text-primary">•</span><span><strong className="text-[#c9d1d9]">Usage Data:</strong> Simulation configurations, target URLs submitted for analysis (only when you explicitly run a simulation).</span></li>
              <li className="flex gap-2"><span className="text-primary">•</span><span><strong className="text-[#c9d1d9]">Technical Data:</strong> IP address (for rate limiting), browser type (for compatibility), cookie consent preferences.</span></li>
            </ul>
            <p className="text-[13px] text-[#8b949e] leading-relaxed mt-3">
              We do <strong className="text-[#c9d1d9]">not</strong> collect: names, phone numbers, payment card details (handled by Stripe), or any data not listed above.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">3. How We Use Your Data</h2>
            <ul className="space-y-2 text-[13px] text-[#8b949e]">
              <li className="flex gap-2"><span className="text-primary">•</span><span><strong className="text-[#c9d1d9]">Service Delivery:</strong> Running simulations, generating reports, authenticating your session.</span></li>
              <li className="flex gap-2"><span className="text-primary">•</span><span><strong className="text-[#c9d1d9]">Security:</strong> Rate limiting, SSRF prevention, fraud detection.</span></li>
              <li className="flex gap-2"><span className="text-primary">•</span><span><strong className="text-[#c9d1d9]">Product Improvement:</strong> Anonymous usage analytics (only with your consent).</span></li>
              <li className="flex gap-2"><span className="text-primary">•</span><span><strong className="text-[#c9d1d9]">Communication:</strong> Transactional emails (account, security alerts). Marketing only with opt-in.</span></li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">4. Legal Basis for Processing</h2>
            <ul className="space-y-2 text-[13px] text-[#8b949e]">
              <li className="flex gap-2"><span className="text-primary">•</span><span><strong className="text-[#c9d1d9]">Contract:</strong> Processing necessary to provide the service you signed up for.</span></li>
              <li className="flex gap-2"><span className="text-primary">•</span><span><strong className="text-[#c9d1d9]">Legitimate Interest:</strong> Security, fraud prevention, infrastructure monitoring.</span></li>
              <li className="flex gap-2"><span className="text-primary">•</span><span><strong className="text-[#c9d1d9]">Consent:</strong> Analytics cookies, marketing communications. Withdraw anytime via Privacy Settings.</span></li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">5. Data Retention</h2>
            <p className="text-[13px] text-[#8b949e] leading-relaxed">
              <strong className="text-[#c9d1d9]">Account data:</strong> Retained while your account is active + 30 days after deletion.
              <br/><strong className="text-[#c9d1d9]">Simulation data:</strong> Retained for 90 days, then automatically purged.
              <br/><strong className="text-[#c9d1d9]">Waitlist data:</strong> Retained until you unsubscribe or request deletion.
              <br/><strong className="text-[#c9d1d9]">Security logs:</strong> Retained for 12 months for compliance.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">6. Third-Party Processors</h2>
            <ul className="space-y-2 text-[13px] text-[#8b949e]">
              <li className="flex gap-2"><span className="text-primary">•</span><span><strong className="text-[#c9d1d9]">Vercel:</strong> Hosting and edge delivery (US, EU).</span></li>
              <li className="flex gap-2"><span className="text-primary">•</span><span><strong className="text-[#c9d1d9]">Neon:</strong> PostgreSQL database hosting (US).</span></li>
              <li className="flex gap-2"><span className="text-primary">•</span><span><strong className="text-[#c9d1d9]">Google:</strong> OAuth authentication (if you choose Google Sign-In).</span></li>
              <li className="flex gap-2"><span className="text-primary">•</span><span><strong className="text-[#c9d1d9]">Stripe:</strong> Payment processing (when applicable). We never see your card details.</span></li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">7. Your Rights</h2>
            <p className="text-[13px] text-[#8b949e] leading-relaxed mb-3">Under GDPR, CCPA, and equivalent regulations, you have the right to:</p>
            <ul className="space-y-2 text-[13px] text-[#8b949e]">
              <li className="flex gap-2"><span className="text-primary">•</span><span>Access your data</span></li>
              <li className="flex gap-2"><span className="text-primary">•</span><span>Correct inaccurate data</span></li>
              <li className="flex gap-2"><span className="text-primary">•</span><span>Delete your data (&ldquo;right to be forgotten&rdquo;)</span></li>
              <li className="flex gap-2"><span className="text-primary">•</span><span>Export your data (portability)</span></li>
              <li className="flex gap-2"><span className="text-primary">•</span><span>Withdraw consent at any time</span></li>
              <li className="flex gap-2"><span className="text-primary">•</span><span>Object to processing based on legitimate interest</span></li>
            </ul>
            <p className="text-[13px] text-[#8b949e] leading-relaxed mt-3">
              Contact <strong className="text-primary">privacy@tryphantom.dev</strong> for any data requests.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">8. Security</h2>
            <p className="text-[13px] text-[#8b949e] leading-relaxed">
              All data in transit is encrypted via TLS 1.3. Databases use encryption at rest. Passwords are hashed with bcrypt.
              See our <Link href="/security" className="text-primary hover:underline">Security Policy</Link> for full details.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">9. Contact</h2>
            <p className="text-[13px] text-[#8b949e] leading-relaxed">
              Phantom AI<br/>
              Email: <strong className="text-primary">privacy@tryphantom.dev</strong><br/>
              For security issues: <strong className="text-primary">security@tryphantom.dev</strong>
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
