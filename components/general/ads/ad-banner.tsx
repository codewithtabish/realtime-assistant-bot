'use client';

import { ADMOB_CONFIG } from '@/lib/admob';
import Script from 'next/script';

export default function AdBanner() {
  return (
    <>
      {/* Load Google AdMob Script */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        strategy="afterInteractive"
      />

      {/* Bottom Banner Ad */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-black border-t border-zinc-700 py-2 shadow-lg">
        <div className="max-w-md mx-auto px-4 text-center">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client={ADMOB_CONFIG.PUBLISHER_ID}
            data-ad-slot={ADMOB_CONFIG.BANNER_ID}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      </div>

      {/* Initialize Ads */}
      <Script id="ad-init" strategy="afterInteractive">
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </Script>
    </>
  );
}