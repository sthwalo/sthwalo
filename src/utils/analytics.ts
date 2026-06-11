// Analytics utility functions for Google Analytics 4
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

export const trackConversion = (conversionType: string, value?: number) => {
  trackEvent('conversion', {
    send_to: import.meta.env.VITE_GA_MEASUREMENT_ID,
    value: value,
    currency: 'ZAR',
    conversion_type: conversionType,
  });
};

export const trackResourceView = (resource: string) => trackEvent('resource_view', { resource });
export const trackSocialDemoClick = (channel: string) => trackEvent('social_demo_click', { channel });
export const trackTrustMetricsLoad = (source: string) => trackEvent('trust_metrics_load', { source });

export const trackCTAClick = (ctaType: string, location: string) => {
  trackEvent('cta_click', {
    cta_type: ctaType,
    page_location: location,
  });
};

export const trackVideoPlay = (videoId: string, videoTitle: string) => {
  trackEvent('video_play', {
    video_id: videoId,
    video_title: videoTitle,
  });
};

export const trackBlogView = (postSlug: string, category: string) => {
  trackEvent('blog_post_view', {
    post_slug: postSlug,
    category: category,
  });
};
