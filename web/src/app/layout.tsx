import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SQL Foundry • Physical Execution Order & SQL Mastery",
  description: "Cookieless, zero-latency physical SQL execution simulator and relational mastery platform. Inspired by Kobbe.io.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-background text-foreground min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
