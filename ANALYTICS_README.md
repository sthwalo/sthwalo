# Google Analytics 4 Setup

This project includes Google Analytics 4 integration for tracking marketing performance.

## Setup Instructions

1. **Create GA4 Property**: Go to Google Analytics and create a new GA4 property for sthwalo.com

2. **Get Measurement ID**: Copy your GA4 Measurement ID (format: G-XXXXXXXXXX)

3. **Update Code**: Replace `'G-XXXXXXXXXX'` in `src/components/ui/Analytics.tsx` with your actual Measurement ID

4. **Update Conversion Tracking**: In `src/utils/analytics.ts`, update the GA4 ID in the `trackConversion` function

## Tracked Events

### CTA Clicks
- `trial_signup`: When users click "Start Free 14-Day Trial" buttons
- `watch_demo`: When users click "Watch Demo" buttons
- `contact_sales`: When users click contact/sales buttons

### Video Interactions
- `video_play`: When users click on demo video placeholders

### Blog Engagement
- `blog_post_view`: When users view individual blog posts

### Custom Events
- `conversion`: For tracking trial signups and other conversions

## UTM Tracking

All external links to the FIN app should include UTM parameters:

```javascript
// Example link structure
https://sthwalo.com/app?utm_source=linkedin&utm_medium=social&utm_campaign=fin_launch
```

### Supported UTM Sources
- `linkedin`, `twitter`, `youtube`, `instagram`, `facebook`, `x`, `tiktok`

## Testing Analytics

1. Open browser developer tools
2. Go to Network tab
3. Filter for "collect"
4. Events should appear as they're triggered

## Data Studio Reports

Create custom reports in Google Data Studio to track:
- Traffic sources and campaign performance
- Conversion funnel (demo views → trial signups)
- Blog engagement metrics
- Video interaction rates

## Privacy Compliance

- Analytics respects user privacy settings
- No personally identifiable information is collected
- GDPR and CCPA compliant implementation