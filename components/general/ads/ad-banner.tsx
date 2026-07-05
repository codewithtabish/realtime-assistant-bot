'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdBanner() {
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdMob Error:", e);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black border-t border-zinc-700 py-2">
      <div className="max-w-md mx-auto px-4 text-center">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-3940256099942544"   // Test ID
          data-ad-slot="6300978111"                  // Test ID
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}