import { useState } from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';
import Button from '../components/ui/Button';
import SeoMeta from '../components/ui/SeoMeta';

// Mock blog posts - in a real implementation, these would come from a CMS or markdown files
const blogPosts = [
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

const categories = ['All', 'Product Updates', 'Founder Notes', 'Accounting Automation', 'Compliance', 'Engineering'];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <>
      <SeoMeta
        title="Blog - Financial Operations Insights | Sthwalo Holdings"
        description="Expert perspectives on accounting automation, compliance, and building better financial systems for growing businesses."
        url="/blog"
      />
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-deep-space-800 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-harvest-gold-200/5 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-60 h-60 rounded-full bg-ember-400/5 blur-3xl" />
        </div>
        <div className="section-container relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block text-sm font-semibold tracking-widest uppercase text-harvest-gold-200 mb-4 animate-fade-in">
              Blog
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-warm-sand-100 leading-tight tracking-tight mb-6 animate-fade-in-up">
              Insights on
              <br />
              <span className="text-harvest-gold-200">Financial Operations</span>
            </h1>
            <p className="text-lg text-warm-sand-400 leading-relaxed max-w-2xl animate-fade-in-up animate-delay-200">
              Expert perspectives on accounting automation, compliance, and building better financial systems for growing businesses.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="section-padding bg-warm-sand-50">
        <div className="section-container">
          {/* Category Filter */}
          <AnimatedSection>
            <div className="flex flex-wrap gap-2 mb-12 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-harvest-gold-200 text-deep-space-800'
                      : 'bg-white text-deep-space-600 hover:bg-deep-space-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* Featured Post */}
          {filteredPosts.length > 0 && (
            <AnimatedSection className="mb-16">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-warm-sand-300/30">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img
                      src={filteredPosts[0].featuredImage}
                      alt={filteredPosts[0].title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-sm text-deep-space-500 mb-4">
                      <span className="px-3 py-1 bg-harvest-gold-100 text-harvest-gold-700 rounded-full">
                        {filteredPosts[0].category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(filteredPosts[0].date).toLocaleDateString()}
                      </span>
                      <span>{filteredPosts[0].readTime}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-deep-space-800 mb-4">
                      {filteredPosts[0].title}
                    </h2>
                    <p className="text-deep-space-600 leading-relaxed mb-6">
                      {filteredPosts[0].excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-deep-space-500">
                        <User className="w-4 h-4" />
                        {filteredPosts[0].author}
                      </div>
                      <Button to={`/blog/${filteredPosts[0].slug}`} variant="secondary" size="sm">
                        Read More
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.slice(1).map((post, index) => (
              <AnimatedSection
                key={post.id}
                animation="fade-in-up"
                delay={`animate-delay-${(index + 1) * 100}`}
              >
                <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-warm-sand-300/30 hover:shadow-md transition-shadow group">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-deep-space-500 mb-3">
                      <span className="px-2 py-1 bg-harvest-gold-100 text-harvest-gold-700 rounded-full text-xs">
                        {post.category}
                      </span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-deep-space-800 mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-deep-space-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-deep-space-500">{post.author}</span>
                      <Button to={`/blog/${post.slug}`} variant="ghost" size="sm" className="p-0 h-auto">
                        Read More
                        <ArrowRight className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>

          {/* CTA Section */}
          <AnimatedSection className="mt-20">
            <div className="rounded-2xl bg-deep-space-800 p-10 md:p-14 text-center relative overflow-hidden">
              <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-60 h-60 rounded-full bg-harvest-gold-200/5 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-oxblood-600/5 blur-3xl" />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold text-warm-sand-100 mb-4">
                  Ready to Transform Your Financial Operations?
                </h3>
                <p className="text-warm-sand-400 max-w-lg mx-auto mb-8 leading-relaxed">
                  Join thousands of businesses using FIN to automate their financial workflows.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button href="https://sthwalo.com/app" variant="primary" size="lg">
                    Start Free 14-Day Trial
                  </Button>
                  <Button to="/demo" variant="outline" size="lg" className="border-warm-sand-400/30 text-warm-sand-200 hover:bg-white/5 hover:text-warm-sand-100 hover:border-warm-sand-300/50">
                    Watch Demo
                  </Button>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}