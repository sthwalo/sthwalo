import { getBlogPosts } from './blogLoader';

export function generateRSSFeed() {
  const posts = getBlogPosts();

  const rssItems = posts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt}]]></description>
      <link>https://sthwalo.com/blog/${post.slug}</link>
      <guid>https://sthwalo.com/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category><![CDATA[${post.category}]]></category>
      <author><![CDATA[${post.author}]]></author>
    </item>
  `).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>FIN Blog - Financial Operations Platform</title>
    <description>Insights on financial automation, accounting technology, and business growth for SMEs</description>
    <link>https://sthwalo.com/blog</link>
    <atom:link href="https://sthwalo.com/rss.xml" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>Sthwalo Holdings</generator>
    ${rssItems}
  </channel>
</rss>`;
}