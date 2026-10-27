import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SQL Foundry • 2026 AI-SaaS SQL Mastery Platform",
  description: "Next-generation SQL learning and relational execution platform inspired by Slite, Cluster, Kobbe, and Lev8.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-[#07080c]">{children}</body>
    </html>
  );
}
