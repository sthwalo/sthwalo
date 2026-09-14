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
 * <p>`VITE_API_URL` is the relative path `/api`, so these are same-origin
 * requests that a reverse proxy forwards to Express. That is what lets the
 * session cookie keep `SameSite=Strict` — do not relax it to `None` on the
 * assumption that the API is cross-site, because it is not.
 */
async function call<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(init.headers ?? {}) },
  });
  if (res.status === 204) return undefined as T;

  let body: unknown;
  try {
    body = await res.json();
  } catch {
    // A 200 that is not JSON is a failed call, not an empty one. The dev server
    // answers an unproxied /api path with index.html, and treating that as `{}`
    // handed the caller an object where it had asked for an array — which is
    // how /admin came to crash on `posts.map` with the API simply not running.
    throw new Error(
      res.ok
        ? 'The API did not return JSON — is the server running?'
        : `Request failed (${res.status})`,
    );
  }

  if (!res.ok) {
    throw new Error((body as { error?: string }).error ?? `Request failed (${res.status})`);
  }
  return body as T;
}

/** The same call, refusing anything that is not the list it promised. */
async function callList<T>(path: string): Promise<T[]> {
  const body = await call<T[]>(path);
  if (!Array.isArray(body)) {
    throw new Error('The API returned an unexpected response');
  }
  return body;
}

export const adminApi = {
  login: (email: string, password: string) =>
    call<{ email: string }>('/admin/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  logout: () => call<void>('/admin/logout', { method: 'POST' }),
  list: () => callList<AdminPost>('/admin/posts'),
  get: (slug: string) => call<AdminPost>(`/admin/posts/${encodeURIComponent(slug)}`),
  create: (post: Partial<AdminPost>) =>
    call<{ slug: string }>('/admin/posts', { method: 'POST', body: JSON.stringify(post) }),
  update: (slug: string, post: Partial<AdminPost>) =>
    call<{ slug: string }>(`/admin/posts/${encodeURIComponent(slug)}`, { method: 'PUT', body: JSON.stringify(post) }),
  remove: (slug: string) =>
    call<void>(`/admin/posts/${encodeURIComponent(slug)}`, { method: 'DELETE' }),
  revisions: (slug: string) =>
    callList<Revision>(`/admin/posts/${encodeURIComponent(slug)}/revisions`),
};
