import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { AppShell } from "@/components/layout/app-shell";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Finca Sanro — Equestrian Management",
  description: "Sistema de gestión ecuestre premium para Finca Sanro",
  openGraph: {
    title: "Finca Sanro",
    description: "Sistema de gestión ecuestre premium para Finca Sanro",
    siteName: "Finca Sanro",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Finca Sanro",
    description: "Sistema de gestión ecuestre premium para Finca Sanro",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${dmSans.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
