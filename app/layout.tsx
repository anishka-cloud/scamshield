import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Is This a Scam? Free Scam Checker — ScamShield",
  description:
    "Paste any suspicious email, text, DM, or listing. Get an instant scam risk analysis with specific red flags and a shareable safety score.",
  openGraph: {
    title: "Is This a Scam? Free Scam Checker — ScamShield",
    description:
      "Paste any suspicious email, text, DM, or listing. Get an instant scam risk analysis with specific red flags and a shareable safety score.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Is This a Scam? Free Scam Checker — ScamShield",
    description:
      "Paste any suspicious email, text, DM, or listing. Get an instant scam risk analysis with specific red flags and a shareable safety score.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-slate-950 text-slate-200 antialiased">
        {children}
      </body>
    </html>
  );
}
