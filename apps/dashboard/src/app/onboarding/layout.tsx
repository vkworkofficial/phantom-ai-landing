import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Initialize Séance · Phantom",
  description: "Configure your first synthetic user simulation.",
};

export default function OnboardingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#0d1117] text-white selection:bg-primary/30 font-sans flex flex-col items-center justify-center p-6 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]">
      <div className="w-full max-w-3xl">
        {children}
      </div>
    </div>
  );
}
