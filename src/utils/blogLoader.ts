// Blog data loader - in production, this would load from a CMS or database
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  slug: string;
  featuredImage: string;
  readTime: string;
  content?: string;
}

export function getBlogPosts(): BlogPost[] {
  return [
    {
      id: 1,
      title: 'How FIN Automates Financial Operations for SMEs',
      excerpt: 'A comprehensive guide to how FIN transforms manual accounting workflows into automated financial visibility, saving SMEs time and reducing errors.',
      category: 'Product Updates',
      author: 'Immaculate Nyoni',
      date: '2025-05-06',
      slug: 'how-fin-automates-financial-operations',
      featuredImage: '/images/blog/fin-dashboard.jpg',
      readTime: '5 min read',
    },
    {
      id: 2,
      title: 'From Bookkeeper to Software Engineer: A Journey in Fintech',
      excerpt: 'The story of how accounting discipline and software engineering principles combined to create FIN, a platform built by someone who understands both worlds.',
      category: 'Founder Notes',
      author: 'Immaculate Nyoni',
      date: '2025-04-15',
      slug: 'bookkeeper-to-software-engineer-journey',
      featuredImage: '/images/blog/founder-story.jpg',
      readTime: '8 min read',
    },
    {
      id: 3,
      title: 'Transaction Classification: The Foundation of Automated Accounting',
      excerpt: 'How FIN uses intelligent algorithms to classify transactions automatically, reducing manual data entry by up to 80% for small businesses.',
      category: 'Accounting Automation',
      author: 'Immaculate Nyoni',
      date: '2025-03-22',
      slug: 'transaction-classification-automated-accounting',
      featuredImage: '/images/blog/transactions.jpg',
      readTime: '6 min read',
    },
  ];
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  const posts = getBlogPosts();
  return posts.find(post => post.slug === slug) || null;
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  const posts = getBlogPosts();
  if (category === 'All') return posts;
  return posts.filter(post => post.category === category);
}