// "use client";

// import { useEffect, useRef } from "react";

// declare global {
//   interface Window {
//     adsbygoogle: unknown[];
//   }
// }

// export default function AdBanner() {
//   const initialized = useRef(false);

//   useEffect(() => {
//     if (initialized.current) return;

//     const timer = setTimeout(() => {
//       try {
//         (window.adsbygoogle = window.adsbygoogle || []).push({});
//         initialized.current = true;
//       } catch (err) {
//         console.error("Adsense:", err);
//       }
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div
//       className="fixed bottom-0 left-0 right-0 z-50 flex justify-center bg-white dark:bg-neutral-900 border-t border-gray-300 dark:border-neutral-700"
//       style={{
//         paddingBottom: "env(safe-area-inset-bottom)",
//       }}
//     >
//       <ins
//         className="adsbygoogle"
//         style={{
//           display: "block",
//           width: "320px",
//           height: "50px",
//         }}
//         data-ad-client="ca-pub-3940256099942544"
//         data-ad-slot="6300978111"
//       />
//     </div>
//   );
// }