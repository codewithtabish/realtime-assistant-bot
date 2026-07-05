'use client';

import Script from 'next/script';

export default function AdBanner() {
  return (
    <>
      {/* Load AdMob Script */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        strategy="afterInteractive"
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

      {/* Initialize the ad */}
      <Script id="ad-init" strategy="afterInteractive">
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </Script>
    </>
  );
}