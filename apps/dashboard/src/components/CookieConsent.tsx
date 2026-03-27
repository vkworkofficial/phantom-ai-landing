"use client";

import React, { useState, useEffect, useCallback } from "react";
import { X, Shield, Cookie } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────

interface ConsentState {
  necessary: boolean;   // Always true, can't be disabled
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
  version: string;
}

const CONSENT_KEY = "phantom_consent";
const CONSENT_VERSION = "1.0";

// ─── Cookie Consent Banner ───────────────────────────────────────────

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<ConsentState>({
    necessary: true,
    analytics: false,
    marketing: false,
    timestamp: "",
    version: CONSENT_VERSION,
  });

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      // No prior consent — show banner
      setVisible(true);
    } else {
      try {
        const parsed: ConsentState = JSON.parse(stored);
        if (parsed.version !== CONSENT_VERSION) {
          // Consent version changed — re-ask
          setVisible(true);
        }
        // Don't show banner; consent already recorded
      } catch {
        setVisible(true);
      }
    }
  }, []);

  const saveConsent = useCallback((state: ConsentState) => {
    const final: ConsentState = {
      ...state,
      necessary: true, // Enforce
      timestamp: new Date().toISOString(),
      version: CONSENT_VERSION,
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(final));
    setVisible(false);

    // Dispatch event so other components can react
    window.dispatchEvent(new CustomEvent("phantom:consent", { detail: final }));
  }, []);

  const handleAcceptAll = () => {
    saveConsent({ ...consent, analytics: true, marketing: true });
  };

  const handleRejectAll = () => {
    saveConsent({ ...consent, analytics: false, marketing: false });
  };

  const handleSavePreferences = () => {
    saveConsent(consent);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-modal="false"
      className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
    >
      <div className="max-w-2xl mx-auto bg-[#0d1117] border border-[#30363d] rounded-2xl shadow-[0_-4px_40px_rgba(0,0,0,0.6)] p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Cookie className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Privacy & Cookies</h2>
              <p className="text-[11px] text-[#8b949e]">We respect your choices.</p>
            </div>
          </div>
        </div>

        <p className="text-[12px] text-[#8b949e] leading-relaxed mb-5">
          We use cookies to keep the site functional. Analytics and marketing cookies are
          {" "}<strong className="text-[#c9d1d9]">off by default</strong> and only enabled with your explicit consent.
          Read our{" "}
          <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
          {" "}and{" "}
          <a href="/cookies" className="text-primary hover:underline">Cookie Policy</a>.
        </p>

        {/* Detail toggle */}
        {showDetails && (
          <div className="space-y-3 mb-5 p-4 bg-[#010409] rounded-xl border border-[#30363d]">
            {/* Necessary */}
            <label className="flex items-center justify-between">
              <div>
                <span className="text-[12px] font-bold text-white">Necessary</span>
                <span className="text-[10px] text-[#5c646c] ml-2">Authentication, security, core functionality</span>
              </div>
              <input
                type="checkbox"
                checked
                disabled
                className="w-4 h-4 rounded accent-primary cursor-not-allowed opacity-50"
                aria-label="Necessary cookies (always active)"
              />
            </label>

            {/* Analytics */}
            <label className="flex items-center justify-between cursor-pointer group">
              <div>
                <span className="text-[12px] font-bold text-[#c9d1d9] group-hover:text-white transition-colors">Analytics</span>
                <span className="text-[10px] text-[#5c646c] ml-2">Anonymous usage data to improve the product</span>
              </div>
              <input
                type="checkbox"
                checked={consent.analytics}
                onChange={(e) => setConsent(c => ({ ...c, analytics: e.target.checked }))}
                className="w-4 h-4 rounded accent-primary cursor-pointer"
                aria-label="Analytics cookies"
              />
            </label>

            {/* Marketing */}
            <label className="flex items-center justify-between cursor-pointer group">
              <div>
                <span className="text-[12px] font-bold text-[#c9d1d9] group-hover:text-white transition-colors">Marketing</span>
                <span className="text-[10px] text-[#5c646c] ml-2">Personalization and attribution</span>
              </div>
              <input
                type="checkbox"
                checked={consent.marketing}
                onChange={(e) => setConsent(c => ({ ...c, marketing: e.target.checked }))}
                className="w-4 h-4 rounded accent-primary cursor-pointer"
                aria-label="Marketing cookies"
              />
            </label>
          </div>
        )}

        {/* Actions — equal prominence for Accept and Reject */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleRejectAll}
            className="flex-1 px-4 py-2.5 text-[12px] font-bold text-[#c9d1d9] bg-transparent border border-[#30363d] rounded-lg hover:border-white/30 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label="Reject all optional cookies"
          >
            Reject All
          </button>
          {showDetails ? (
            <button
              onClick={handleSavePreferences}
              className="flex-1 px-4 py-2.5 text-[12px] font-bold text-white bg-[#30363d] rounded-lg hover:bg-[#484f58] transition-all focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-label="Save cookie preferences"
            >
              Save Preferences
            </button>
          ) : (
            <button
              onClick={() => setShowDetails(true)}
              className="flex-1 px-4 py-2.5 text-[12px] font-bold text-[#c9d1d9] bg-transparent border border-[#30363d] rounded-lg hover:border-white/30 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-label="Customize cookie preferences"
            >
              Customize
            </button>
          )}
          <button
            onClick={handleAcceptAll}
            className="flex-1 px-4 py-2.5 text-[12px] font-bold text-white bg-primary rounded-lg hover:bg-[#ff7a2d] transition-all shadow-[0_0_15px_rgba(234,88,12,0.2)] focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label="Accept all cookies"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Privacy Settings Button (persistent, for withdrawing consent) ───

export function PrivacySettingsButton() {
  const reopenBanner = () => {
    localStorage.removeItem(CONSENT_KEY);
    window.location.reload();
  };

  return (
    <button
      onClick={reopenBanner}
      className="fixed bottom-4 left-4 z-[9998] w-10 h-10 rounded-full bg-[#0d1117] border border-[#30363d] flex items-center justify-center hover:border-primary/50 transition-all group focus:outline-none focus:ring-2 focus:ring-primary/50"
      aria-label="Privacy settings"
      title="Privacy Settings"
    >
      <Shield className="w-4 h-4 text-[#8b949e] group-hover:text-primary transition-colors" />
    </button>
  );
}

// ─── Consent-Gated Script Loader ─────────────────────────────────────

export function useConsentState(): ConsentState | null {
  const [state, setState] = useState<ConsentState | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored) {
      try {
        setState(JSON.parse(stored));
      } catch {
        setState(null);
      }
    }

    const handler = (e: Event) => {
      const detail = (e as CustomEvent<ConsentState>).detail;
      setState(detail);
    };
    window.addEventListener("phantom:consent", handler);
    return () => window.removeEventListener("phantom:consent", handler);
  }, []);

  return state;
}
