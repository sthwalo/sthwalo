import { useEffect, useState } from 'react';
import { blogPosts, type BlogPost } from '../data/blogPosts';

const API = import.meta.env.VITE_API_URL ?? '';

/**
 * The published posts, from the API, falling back to the bundled copy.
 *
 * <p>The same shape as `useTrustMetrics`: the site must render its writing even
 * when the API is unreachable. `blogPosts.ts` is still the seed source and the
 * typed contract, so the fallback is the content as at the last deploy — stale
 * by a post or two at worst, rather than an empty page.
 */
export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>(blogPosts);
  const [source, setSource] = useState<'live' | 'bundled'>('bundled');

  useEffect(() => {
    let cancelled = false;
    fetch(`${API}/posts`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((rows: BlogPost[]) => {
        if (cancelled || !Array.isArray(rows) || rows.length === 0) return;
        setPosts(rows);
        setSource('live');
      })
      .catch(() => {
        // Deliberately silent: the bundled copy is already rendering, and a
        // console error on every page load trains people to ignore the console.
      });
    return () => { cancelled = true; };
  }, []);

  return { posts, source };
}

/** One post by slug, from the same source, with the bundled copy as fallback. */
export function useBlogPost(slug: string) {
  const { posts } = useBlogPosts();
  return posts.find((p) => p.slug === slug);
}
