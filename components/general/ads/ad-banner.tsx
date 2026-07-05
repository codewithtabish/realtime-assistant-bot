'use client';

import Script from 'next/script';
import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdBanner() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdMob push error:", e);
    }
  }, []);

  return (
    <>
      {/* Load AdMob Script Once */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />

      {/* Bottom Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-black border-t border-zinc-700 py-2">
        <div className="max-w-md mx-auto px-4">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-3940256099942544"   // Test Publisher ID
            data-ad-slot="6300978111"                  // Test Banner ID
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      </div>
    </>
  );
}