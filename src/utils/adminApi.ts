import type { BlogPost } from '../data/blogPosts';

// VITE_API_URL already ends in /api (see .env and the contact form), so paths
// here are relative to that — '/admin/posts', not '/api/admin/posts'.
const API = import.meta.env.VITE_API_URL ?? '';

/** A post as the admin sees it — drafts included, so status is always present. */
export type AdminPost = BlogPost & { status: 'draft' | 'published' };

export interface Revision {
  id: number;
  title: string;
  blocks: BlogPost['blocks'];
  saved_at: string;
  saved_by: string | null;
}

/**
 * Every admin call sends the session cookie and surfaces the server's message.
 *
 * <p>`credentials: 'include'` is not optional: the site and the API are
 * different origins in production, so without it the browser sends no cookie
 * and every write returns 401 while looking like a bug in the form.
 */
async function call<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(init.headers ?? {}) },
  });
  if (res.status === 204) return undefined as T;
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((body as { error?: string }).error ?? `Request failed (${res.status})`);
  }
  return body as T;
}

export const adminApi = {
  login: (email: string, password: string) =>
    call<{ email: string }>('/admin/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  logout: () => call<void>('/admin/logout', { method: 'POST' }),
  list: () => call<AdminPost[]>('/admin/posts'),
  get: (slug: string) => call<AdminPost>(`/admin/posts/${encodeURIComponent(slug)}`),
  create: (post: Partial<AdminPost>) =>
    call<{ slug: string }>('/admin/posts', { method: 'POST', body: JSON.stringify(post) }),
  update: (slug: string, post: Partial<AdminPost>) =>
    call<{ slug: string }>(`/admin/posts/${encodeURIComponent(slug)}`, { method: 'PUT', body: JSON.stringify(post) }),
  remove: (slug: string) =>
    call<void>(`/admin/posts/${encodeURIComponent(slug)}`, { method: 'DELETE' }),
  revisions: (slug: string) =>
    call<Revision[]>(`/admin/posts/${encodeURIComponent(slug)}/revisions`),
};
