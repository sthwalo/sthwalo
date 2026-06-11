import { useEffect } from 'react';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Button from '../components/ui/Button';
import SeoMeta from '../components/ui/SeoMeta';
import { getBlogPostBySlug } from '../data/blogPosts';
import { trackBlogView, trackCTAClick } from '../utils/analytics';

export default function BlogPost() {
  const { slug = '' } = useParams();
  const post = getBlogPostBySlug(slug);

  useEffect(() => {
    if (post) trackBlogView(post.slug, post.category);
  }, [post]);

  if (!post) return <section className="section-padding text-center"><h1 className="text-4xl font-bold mb-6">Post not found</h1><Button to="/blog">Back to blog</Button></section>;

  return (
    <>
      <SeoMeta title={`${post.title} | FIN`} description={post.excerpt} url={`/blog/${post.slug}`} type="article" publishedTime={post.date} modifiedTime={post.reviewedDate} author={post.author} section={post.category} />
      <section className="relative pt-32 pb-20 bg-deep-space-800">
        <div className="section-container max-w-5xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-warm-sand-400 mb-8"><ArrowLeft className="w-4 h-4" />Back to knowledge hub</Link>
          <div className="flex flex-wrap gap-2 text-xs mb-5"><span className="px-3 py-1 rounded-full bg-harvest-gold-200 text-deep-space-800">{post.category}</span><span className="px-3 py-1 rounded-full bg-white/10 text-warm-sand-200">For {post.audience}</span></div>
          <h1 className="text-4xl md:text-6xl font-bold text-warm-sand-100 leading-tight">{post.title}</h1>
          <p className="text-warm-sand-400 mt-6 flex items-center gap-2"><Calendar className="w-4 h-4" />Reviewed {new Date(post.reviewedDate).toLocaleDateString()} · {post.readTime}</p>
        </div>
      </section>
      <section className="section-padding bg-warm-sand-50">
        <article className="section-container max-w-4xl">
          <p className="text-xl text-deep-space-600 leading-relaxed mb-10">{post.excerpt}</p>
          <div className="space-y-6">
            {post.blocks.map((block, index) => {
              if (block.type === 'heading') return <h2 key={index} className="text-2xl font-bold text-deep-space-800 pt-5">{block.text}</h2>;
              if (block.type === 'list') return <ul key={index} className="list-disc pl-6 space-y-2 text-deep-space-600">{block.items.map(item => <li key={item}>{item}</li>)}</ul>;
              return <p key={index} className="text-deep-space-600 leading-relaxed">{block.text}</p>;
            })}
          </div>
          <aside className="mt-12 p-6 rounded-xl bg-white border border-warm-sand-300/40">
            <p className="text-xs uppercase tracking-widest text-harvest-gold-600 font-bold">Documentation source</p>
            <p className="text-deep-space-600 mt-2 mb-4">This article is based on the {post.sourceLabel}. Request the full document and we'll send it through.</p>
            <Button to={`/contact?doc=${encodeURIComponent(post.sourceLabel)}`} variant="secondary" size="sm" onClick={() => trackCTAClick('doc_request', `blog-${post.slug}`)}>Request the {post.sourceLabel}</Button>
          </aside>
          <div className="mt-12 p-8 rounded-2xl bg-deep-space-800 text-center">
            <h2 className="text-2xl font-bold text-warm-sand-100">Explore FIN with the boundaries visible</h2>
            <p className="text-warm-sand-400 mt-3 mb-6">Read the manuals, review current capabilities, then decide whether FIN fits your workflow.</p>
            <div className="flex flex-wrap justify-center gap-3"><Button to="/resources" variant="primary">Explore resources</Button><Button href="https://sthwalo.com/fin" variant="outline" className="border-warm-sand-300 text-warm-sand-100" onClick={() => trackCTAClick('trial_signup', `blog-${post.slug}`)}>Access FIN</Button></div>
          </div>
        </article>
      </section>
    </>
  );
}
