import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Providers } from "./providers";
import { CookieConsent, PrivacySettingsButton } from "@/components/CookieConsent";

export const metadata: Metadata = {
  title: "Phantom AI — Synthetic User Simulation",
  description:
    "Accelerate Product-Market Fit with high-fidelity synthetic user simulation. Find every edge case and conversion blocker at terminal velocity.",
  keywords: [
    "PMF velocity", "synthetic user simulation", "user testing", "agentic testing",
    "synthetic reality", "product-market fit", "CI/CD testing", "headless browser testing",
  ],
  metadataBase: new URL("https://tryphantom.dev"),
  openGraph: {
    title: "Phantom AI — Synthetic User Simulation",
    description:
      "Accelerate Product-Market Fit with high-fidelity synthetic user simulation. Don't launch blind.",
    url: "https://tryphantom.dev",
    siteName: "Phantom AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Phantom AI — The Synthetic Reality Engine",
    description:
      "Deploy optimized synthetic users against your product. Achieve PMF Velocity 100x faster.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://tryphantom.dev',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Phantom AI",
  "operatingSystem": "Web",
  "applicationCategory": "DevOpsApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Deploy optimized synthetic users against your product. Achieve PMF Velocity 100x faster by finding every edge case, broken flow, and conversion blocker in minutes."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        <Providers>
          {children}
          <CookieConsent />
          <PrivacySettingsButton />
        </Providers>
      </body>
    </html>
  );
}
