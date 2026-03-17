import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Phantom AI — The Synthetic Reality Engine",
  description:
    "Deploy infinite AI Ghosts against your product. Achieve PMF Velocity 100x faster by finding every edge case, broken flow, and conversion blocker in minutes.",
  keywords: [
    "PMF velocity", "synthetic reality engine", "AI ghosts", "agentic testing",
    "AI customers", "product-market fit", "CI/CD testing", "headless browser testing",
  ],
  metadataBase: new URL("https://tryphantom.dev"),
  openGraph: {
    title: "Phantom AI — The Synthetic Reality Engine",
    description:
      "Deploy infinite AI Ghosts against your product. Achieve PMF Velocity 100x faster. Don't launch blind.",
    url: "https://tryphantom.dev",
    siteName: "Phantom AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Phantom AI — The Synthetic Reality Engine",
    description:
      "Deploy infinite AI Ghosts against your product. Achieve PMF Velocity 100x faster.",
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
  "description": "Deploy infinite AI Ghosts against your product. Achieve PMF Velocity 100x faster by finding every edge case, broken flow, and conversion blocker in minutes.",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "127"
  }
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
