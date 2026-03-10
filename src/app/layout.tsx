import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Phantom AI — Stress-test your product with AI customers",
  description:
    "Deploy hundreds of AI customers against your live product. Find every friction point, conversion blocker, and confusion point in 30 minutes. CI/CD for customer experience.",
  keywords: [
    "AI testing", "user simulation", "UX testing", "customer simulation",
    "synthetic users", "AI customers", "product testing", "conversion optimization",
  ],
  openGraph: {
    title: "Phantom AI — AI that haunts your product before users do",
    description: "Deploy 500 AI customers against your product. Get a behavior report in 30 minutes.",
    url: "https://tryphantom.dev",
    siteName: "Phantom AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Phantom AI — AI that haunts your product before users do",
    description: "Deploy 500 AI customers against your product. Get a behavior report in 30 minutes.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
