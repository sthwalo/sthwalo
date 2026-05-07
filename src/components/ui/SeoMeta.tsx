import { useEffect } from 'react';

interface SeoMetaProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

export default function SeoMeta({
  title = 'Sthwalo Holdings | Building Foundations with Code',
  description = 'Sthwalo Holdings is a software company building intelligent solutions. Explore our portfolio of dynamic web applications and enterprise-grade systems.',
  image = '/sthwalo.webp',
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
  tags,
}: SeoMetaProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMeta = (name: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Basic meta
    updateMeta('description', description);

    // Open Graph
    updateMeta('og:title', title, true);
    updateMeta('og:description', description, true);
    updateMeta('og:image', image.startsWith('http') ? image : `https://sthwalo.com${image}`, true);
    updateMeta('og:url', url ? `https://sthwalo.com${url}` : 'https://sthwalo.com', true);
    updateMeta('og:type', type, true);
    updateMeta('og:site_name', 'Sthwalo Holdings', true);

    // Twitter
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', image.startsWith('http') ? image : `https://sthwalo.com${image}`);

    // Article specific
    if (type === 'article') {
      if (publishedTime) updateMeta('article:published_time', publishedTime, true);
      if (modifiedTime) updateMeta('article:modified_time', modifiedTime, true);
      if (author) updateMeta('article:author', author, true);
      if (section) updateMeta('article:section', section, true);
      if (tags) {
        tags.forEach(tag => {
          const meta = document.createElement('meta');
          meta.setAttribute('property', 'article:tag');
          meta.content = tag;
          document.head.appendChild(meta);
        });
      }
    }

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url ? `https://sthwalo.com${url}` : 'https://sthwalo.com';

  }, [title, description, image, url, type, publishedTime, modifiedTime, author, section, tags]);

  return null;
}