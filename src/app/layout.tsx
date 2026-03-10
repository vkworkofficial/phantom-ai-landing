import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Phantom AI — Agentic Beta Testing Infrastructure",
  description:
    "Deploy 500 AI customers against your live product. Find every edge case, broken flow, and conversion blocker in 30 minutes — without recruiting human beta testers.",
  keywords: [
    "agentic beta testing", "AI QA", "automated testing", "synthetic users",
    "AI customers", "product testing", "CI/CD testing", "headless browser testing",
  ],
  metadataBase: new URL("https://tryphantom.dev"),
  openGraph: {
    title: "Phantom AI — AI that haunts your product before users do",
    description:
      "Deploy 500 AI customers against your product. Get a behavior report in 30 minutes. No human beta testers required.",
    url: "https://tryphantom.dev",
    siteName: "Phantom AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Phantom AI — Agentic Beta Testing Infrastructure",
    description:
      "Deploy 500 AI customers against your product. Get a behavior report in 30 minutes.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
