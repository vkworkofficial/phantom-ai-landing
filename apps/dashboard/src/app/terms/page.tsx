import React from 'react';
import Link from 'next/link';
import { FileText } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | Phantom AI',
  description: 'Terms and conditions for using Phantom AI services.',
};

export default function TermsOfService() {
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
          <FileText className="w-6 h-6 text-primary" />
          <h1 className="text-3xl font-bold text-white">Terms of Service</h1>
        </div>
        <p className="text-[12px] text-[#8b949e] mb-12">Last updated: March 27, 2026</p>

        <div className="space-y-8">
          <section>
            <h2 className="text-lg font-bold text-white mb-3">1. Acceptance of Terms</h2>
            <p className="text-[13px] text-[#8b949e] leading-relaxed">
              By accessing or using Phantom AI (&ldquo;the Service&rdquo;), you agree to be bound by these Terms of Service. 
              If you do not agree, do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">2. Description of Service</h2>
            <p className="text-[13px] text-[#8b949e] leading-relaxed">
              Phantom AI provides AI-powered synthetic user simulation. Our service deploys autonomous browser agents 
              (&ldquo;Ghosts&rdquo;) to navigate and analyze web applications you submit, generating friction analysis and 
              product-market fit assessments.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">3. Permitted Use</h2>
            <p className="text-[13px] text-[#8b949e] leading-relaxed mb-3">You may only use the Service to test applications you own or have explicit authorization to test. You agree not to:</p>
            <ul className="space-y-2 text-[13px] text-[#8b949e]">
              <li className="flex gap-2"><span className="text-[#ff7b72]">•</span>Use the Service to attack, disrupt, or test third-party systems without authorization</li>
              <li className="flex gap-2"><span className="text-[#ff7b72]">•</span>Attempt to bypass rate limits or access controls</li>
              <li className="flex gap-2"><span className="text-[#ff7b72]">•</span>Use the Service for any illegal activity</li>
              <li className="flex gap-2"><span className="text-[#ff7b72]">•</span>Reverse-engineer or extract the underlying models or algorithms</li>
              <li className="flex gap-2"><span className="text-[#ff7b72]">•</span>Resell or redistribute the Service without prior written agreement</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">4. Your Content & Data</h2>
            <p className="text-[13px] text-[#8b949e] leading-relaxed">
              You retain ownership of all URLs, configurations, and data you provide. We process this data solely to 
              deliver the simulation service. We do not sell your data to third parties. Simulation results are available 
              to you for 90 days and then automatically purged. See our{" "}
              <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link> for details.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">5. Service Availability</h2>
            <p className="text-[13px] text-[#8b949e] leading-relaxed">
              We aim for high availability but do not guarantee uninterrupted service. We may perform maintenance, 
              updates, or changes at any time. We will provide reasonable notice for planned downtime.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">6. Accounts & Security</h2>
            <p className="text-[13px] text-[#8b949e] leading-relaxed">
              You are responsible for maintaining the security of your account credentials and API keys. 
              Notify us immediately at <strong className="text-primary">security@tryphantom.dev</strong> if you 
              suspect unauthorized access. We are not liable for actions taken with compromised credentials.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">7. Limitation of Liability</h2>
            <p className="text-[13px] text-[#8b949e] leading-relaxed">
              THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; WITHOUT WARRANTY OF ANY KIND. PHANTOM AI SHALL NOT BE LIABLE 
              FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING FROM USE OF THE SERVICE. 
              Our total liability is limited to the amount you paid us in the 12 months preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">8. Termination</h2>
            <p className="text-[13px] text-[#8b949e] leading-relaxed">
              Either party may terminate at any time. Upon termination, your access to the dashboard and API will be revoked. 
              Simulation data will be purged per our retention schedule. You may request a data export before termination.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">9. Changes to Terms</h2>
            <p className="text-[13px] text-[#8b949e] leading-relaxed">
              We may update these terms. Material changes will be communicated via email or in-app notification 
              at least 30 days before they take effect. Continued use after changes constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">10. Contact</h2>
            <p className="text-[13px] text-[#8b949e] leading-relaxed">
              Questions about these terms? Contact <strong className="text-primary">legal@tryphantom.dev</strong>.
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
