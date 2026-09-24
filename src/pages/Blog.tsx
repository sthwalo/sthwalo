import { useState } from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';
import Button from '../components/ui/Button';
import SeoMeta from '../components/ui/SeoMeta';
import { blogCategories } from '../data/blogPosts';
import { useBlogPosts } from '../hooks/useBlogPosts';

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { posts: allPosts } = useBlogPosts();
  const posts = selectedCategory === 'All' ? allPosts : allPosts.filter(post => post.category === selectedCategory);

  return (
    <>
      <SeoMeta title="Engineering journal | Immaculate Nyoni" description="Notes from building and running production systems — architecture decisions, multi-tenancy, PostgreSQL, deployment, and what the FIN platform taught along the way." url="/blog" />
      <section className="relative pt-32 pb-20 bg-deep-space-800">
        <div className="section-container">
          <span className="text-sm font-semibold tracking-widest uppercase text-harvest-gold-200">Engineering journal</span>
          <h1 className="text-4xl md:text-6xl font-bold text-warm-sand-100 mt-4 mb-6">What building it<br /><span className="text-harvest-gold-200">actually taught me.</span></h1>
          <p className="text-lg text-warm-sand-400 max-w-2xl">Notes from designing and running production systems — the decisions, the things that broke, and what I would do differently. Written while the work was still fresh, not reconstructed afterwards.</p>
        </div>
      </section>
      <section className="section-padding bg-warm-sand-50">
        <div className="section-container">
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {blogCategories.map(category => (
              <button key={category} onClick={() => setSelectedCategory(category)} className={`px-4 py-2 rounded-full text-sm font-medium ${selectedCategory === category ? 'bg-harvest-gold-200 text-deep-space-800' : 'bg-white text-deep-space-600'}`}>{category}</button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <AnimatedSection key={post.slug} delay={`animate-delay-${(index % 4) * 100}`}>
                <article className="bg-white rounded-2xl overflow-hidden border border-warm-sand-300/30 h-full flex flex-col">
                  <img src={post.featuredImage} alt="" className="w-full h-44 object-cover" />
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex flex-wrap gap-2 text-xs text-deep-space-500 mb-4">
                      <span className="px-2 py-1 rounded-full bg-harvest-gold-100">{post.category}</span>
                      <span className="px-2 py-1 rounded-full bg-warm-sand-100">{post.audience}</span>
                    </div>
                    <h2 className="text-xl font-bold text-deep-space-800 mb-3">{post.title}</h2>
                    <p className="text-sm text-deep-space-600 leading-relaxed flex-1">{post.excerpt}</p>
                    <div className="flex items-center justify-between mt-6 text-xs text-deep-space-500">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />Reviewed {new Date(post.reviewedDate).toLocaleDateString()}</span>
                      <Button to={`/blog/${post.slug}`} variant="ghost" size="sm">Read guide <ArrowRight className="w-3 h-3" /></Button>
                    </div>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
