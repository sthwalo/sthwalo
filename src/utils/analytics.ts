// Analytics utility functions for Google Analytics 4
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
  if (window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

export const trackConversion = (conversionType: string, value?: number) => {
  trackEvent('conversion', {
    send_to: 'G-XXXXXXXXXX', // Replace with your GA4 ID
    value: value,
    currency: 'USD',
    conversion_type: conversionType,
  });
};

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