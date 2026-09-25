// Google Analytics 4 helpers.
//
// Only the events the site actually fires. `trackConversion` and `trackVideoPlay` were defined
// and never called from anywhere — a conversion event aimed at a signup this site no longer owns,
// and a video tracker for a player that does not exist here.
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export const trackEvent = (eventName: string, parameters: Record<string, unknown> = {}) => {
  if (window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

export const trackCTAClick = (ctaType: string, location: string) => {
  trackEvent('cta_click', {
    cta_type: ctaType,
    page_location: location,
  });
};

export const trackBlogView = (postSlug: string, category: string) => {
  trackEvent('blog_post_view', {
    post_slug: postSlug,
    category: category,
  });
};
