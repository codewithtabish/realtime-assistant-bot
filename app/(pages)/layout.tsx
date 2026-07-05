import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "../globals.css";

import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/general/themes/theme-provider";
// import AdBanner from "@/components/general/ads/ad-banner";
import { Toaster } from "sonner";

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
  description:
    "Your personal real-time AI assistant for conversations, tasks, and more",
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/icon-192.png",
  },
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      {/* <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3940256099942544"
          crossOrigin="anonymous"
        ></script>
      </head> */}

      <body className="min-h-screen ">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}

          <Footer />
          <Toaster />
          {/* <AdBanner /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}