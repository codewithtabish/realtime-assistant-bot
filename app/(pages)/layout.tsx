import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import '../globals.css';
import { Toaster } from "sonner";
import { MobileBottomNav } from "@/components/general/mobile-bottom-nav";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/general/themes/theme-provider";
import AdBanner from "@/components/general/ads/ad-banner";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "XAI Assistant",
  description: "Your personal real-time AI assistant for conversations, tasks, and more",
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/icon-192.png",
  },
  manifest: "/manifest.json",
  themeColor: "#000000",
  openGraph: {
    title: "XAI Assistant",
    description: "Your personal real-time AI assistant",
    images: [{ url: "/icons/icon-512.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
       <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen pb-20">
        <Script
          id="adsense-script"
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3940256099942544"
          crossOrigin="anonymous"
        />

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}

          <Footer />
          <Toaster />
          <AdBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
