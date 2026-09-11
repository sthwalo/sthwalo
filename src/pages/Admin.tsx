import { useCallback, useEffect, useState } from 'react';
import { Eye, LogOut, Plus, Save } from 'lucide-react';
import BlockEditor from '../components/admin/BlockEditor';
import BlockContent from '../components/ui/BlockContent';
import SeoMeta from '../components/ui/SeoMeta';
import { adminApi, type AdminPost } from '../utils/adminApi';
import type { BlogBlock } from '../data/blogPosts';

const EMPTY: AdminPost = {
  id: 0, slug: '', title: '', excerpt: '', category: 'Founder Notes', audience: 'Business owners',
  author: 'Immaculate Nyoni', date: '', reviewedDate: '', featuredImage: '/images/pipeline.gif',
  readTime: '5 min read', sourceLabel: '', sourceHref: '', blocks: [{ type: 'paragraph', text: '' }],
  status: 'draft',
};

const field = 'w-full rounded-lg border border-warm-sand-300 px-3 py-2 text-sm';

export default function Admin() {
  const [signedIn, setSignedIn] = useState(false);
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [editing, setEditing] = useState<AdminPost | null>(null);
  const [preview, setPreview] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setPosts(await adminApi.list());
      setSignedIn(true);
    } catch {
      // A 401 here simply means "not signed in yet" — it is the normal first
      // render, not an error worth showing.
      setSignedIn(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const save = async () => {
    if (!editing) return;
    setBusy(true); setError(null);
    try {
      if (editing.id) await adminApi.update(editing.slug, editing);
      else await adminApi.create(editing);
      setNotice(`Saved “${editing.title}”`);
      setEditing(null);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not save');
    } finally {
      setBusy(false);
    }
  };

  if (!signedIn) return <SignIn onSignedIn={load} />;

  return (
    <>
      <SeoMeta title="Blog admin" description="Write and publish FIN blog posts." url="/admin" noindex />
      <section className="section-padding bg-warm-sand-50 min-h-screen">
        <div className="section-container max-w-4xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-deep-space-800">Blog</h1>
            <div className="flex gap-2">
              {!editing && (
                <button onClick={() => { setEditing({ ...EMPTY }); setPreview(false); }}
                  className="inline-flex items-center gap-2 rounded-lg bg-deep-space-800 text-warm-sand-100 px-4 py-2 text-sm font-semibold">
                  <Plus className="w-4 h-4" /> New post
                </button>
              )}
              <button onClick={async () => { await adminApi.logout(); setSignedIn(false); }}
                className="inline-flex items-center gap-2 rounded-lg border border-warm-sand-300 px-4 py-2 text-sm font-semibold">
                <LogOut className="w-4 h-4" /> Sign out
              </button>
            </div>
          </div>

          {notice && <p className="mb-4 rounded-lg bg-green-50 border border-green-200 px-4 py-2 text-sm text-green-800">{notice}</p>}
          {error && <p className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-2 text-sm text-red-800" role="alert">{error}</p>}

          {!editing ? (
            <ul className="space-y-2">
              {posts.map((p) => (
                <li key={p.slug}>
                  <button onClick={() => { setEditing(p); setPreview(false); }}
                    className="w-full text-left rounded-xl border border-warm-sand-300/60 bg-white px-4 py-3 hover:border-harvest-gold-400">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-semibold text-deep-space-800">{p.title}</span>
                      <span className={`text-xs font-bold uppercase tracking-widest ${p.status === 'published' ? 'text-green-700' : 'text-harvest-gold-600'}`}>
                        {p.status}
                      </span>
                    </div>
                    <span className="text-sm text-deep-space-500">/blog/{p.slug}</span>
                  </button>
                </li>
              ))}
              {posts.length === 0 && <li className="text-deep-space-500">No posts yet.</li>}
            </ul>
          ) : (
            <div className="space-y-4">
              <div className="grid gap-3 md:grid-cols-2">
                <label className="block"><span className="text-xs font-semibold uppercase tracking-widest text-deep-space-500">Title</span>
                  <input className={field} value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></label>
                <label className="block"><span className="text-xs font-semibold uppercase tracking-widest text-deep-space-500">Slug</span>
                  <input className={field} value={editing.slug} disabled={Boolean(editing.id)}
                    onChange={(e) => setEditing({ ...editing, slug: e.target.value })} /></label>
                <label className="block md:col-span-2"><span className="text-xs font-semibold uppercase tracking-widest text-deep-space-500">Excerpt</span>
                  <textarea className={field} rows={2} value={editing.excerpt} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} /></label>
                <label className="block"><span className="text-xs font-semibold uppercase tracking-widest text-deep-space-500">Category</span>
                  <input className={field} value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} /></label>
                <label className="block"><span className="text-xs font-semibold uppercase tracking-widest text-deep-space-500">Audience</span>
                  <input className={field} value={editing.audience} onChange={(e) => setEditing({ ...editing, audience: e.target.value })} /></label>
              </div>

              {preview
                ? <div className="rounded-xl bg-white p-6 border border-warm-sand-300/60"><BlockContent blocks={editing.blocks} /></div>
                : <BlockEditor blocks={editing.blocks} onChange={(blocks: BlogBlock[]) => setEditing({ ...editing, blocks })} />}

              <div className="flex flex-wrap items-center gap-2 pt-2">
                <button onClick={save} disabled={busy}
                  className="inline-flex items-center gap-2 rounded-lg bg-deep-space-800 text-warm-sand-100 px-4 py-2 text-sm font-semibold disabled:opacity-50">
                  <Save className="w-4 h-4" /> {busy ? 'Saving…' : 'Save'}
                </button>
                <button onClick={() => setPreview(!preview)}
                  className="inline-flex items-center gap-2 rounded-lg border border-warm-sand-300 px-4 py-2 text-sm font-semibold">
                  <Eye className="w-4 h-4" /> {preview ? 'Edit' : 'Preview'}
                </button>
                <label className="inline-flex items-center gap-2 text-sm font-semibold ml-2">
                  <input type="checkbox" checked={editing.status === 'published'}
                    onChange={(e) => setEditing({ ...editing, status: e.target.checked ? 'published' : 'draft' })} />
                  Published
                </label>
                <button onClick={() => setEditing(null)} className="ml-auto text-sm font-semibold text-deep-space-500 hover:underline">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function SignIn({ onSignedIn }: { onSignedIn: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setError(null);
    try {
      await adminApi.login(email, password);
      onSignedIn();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not sign in');
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <SeoMeta title="Blog admin" description="Sign in to write FIN blog posts." url="/admin" noindex />
      <section className="section-padding bg-warm-sand-50 min-h-screen">
        <form onSubmit={submit} className="section-container max-w-sm space-y-4">
          <h1 className="text-2xl font-bold text-deep-space-800">Sign in to the blog</h1>
          <p className="text-sm text-deep-space-500">
            This page is for writing and publishing posts. It is not part of the public site.
          </p>
          {error && <p className="rounded-lg bg-red-50 border border-red-200 px-4 py-2 text-sm text-red-800" role="alert">{error}</p>}
          {/* Real labels, not placeholders: a placeholder disappears the moment
              you type, leaving a filled field with nothing saying what it holds. */}
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-widest text-deep-space-500">Email</span>
            <input className={field} type="email" autoComplete="username"
              value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-widest text-deep-space-500">Password</span>
            <input className={field} type="password" autoComplete="current-password"
              value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <button type="submit" disabled={busy}
            className="w-full rounded-lg bg-deep-space-800 text-warm-sand-100 px-4 py-2 text-sm font-semibold disabled:opacity-50">
            {busy ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </section>
    </>
  );
}
