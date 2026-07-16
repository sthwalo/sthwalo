import { useEffect } from 'react';

// Google Analytics 4 Measurement ID.
//
// DO NOT set VITE_GA_MEASUREMENT_ID without adding a consent banner first. The published Cookie
// Policy (this site and the app, version 2026-07-16) states we do not use analytics and that
// analytics cookies require consent before being set; FIN's Data Processing Agreement makes the
// same commitment (section 8.4). Enabling GA via this env var without consent falsifies both the
// moment the build ships. See acc repo: docs/legal/POLICY_GROUNDING_REVIEW.md section 3.7.
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export default function Analytics() {
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return undefined;
    // Load Google Analytics script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}');
    `;
    document.head.appendChild(script2);

    // Track page views on route changes
    const handleRouteChange = () => {
      if (window.gtag) {
        window.gtag('config', GA_MEASUREMENT_ID, {
          page_path: window.location.pathname,
        });
      }
    };

    // Listen for route changes (React Router)
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return null;
}
