import type { Metadata } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { AppShell } from "@/components/layout/app-shell";
import { NewsletterProvider } from "@/context/newsletter-context";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_TITLE ?? "MixMaster",
  description: "Cocktail tutorial app with Next.js and TypeScript",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        suppressHydrationWarning
        className={`${dmSans.variable} ${manrope.variable} font-body antialiased`}
      >
        <QueryProvider>
          <NewsletterProvider>
            <div className="app-shell">
              <AppShell>{children}</AppShell>
            </div>
            <Toaster
              position="bottom-right"
              closeButton
              richColors
              toastOptions={{
                className: "bg-transparent border-none shadow-none p-0",
              }}
            />
          </NewsletterProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
