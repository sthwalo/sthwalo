import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Calendar, User, ArrowLeft, Linkedin, Twitter, Facebook } from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';
import Button from '../components/ui/Button';
import { trackBlogView } from '../utils/analytics';

// Mock blog post data - in a real implementation, this would come from a CMS or markdown files
const getBlogPost = (slug: string) => {
  const posts: Record<string, any> = {
    'how-fin-automates-financial-operations': {
      title: 'How FIN Automates Financial Operations for SMEs',
      excerpt: 'A comprehensive guide to how FIN transforms manual accounting workflows into automated financial visibility, saving SMEs time and reducing errors.',
      category: 'Product Updates',
      author: 'Immaculate Nyoni',
      date: '2025-05-06',
      slug: 'how-fin-automates-financial-operations',
      featuredImage: '/images/blog/fin-dashboard.jpg',
      readTime: '5 min read',
      content: `
        <p class="text-lg text-deep-space-600 leading-relaxed mb-6">
          In today's fast-paced business environment, small and medium enterprises (SMEs) are increasingly recognizing the need for efficient financial management systems. Manual accounting processes are not only time-consuming but also prone to errors that can have significant consequences for business operations and compliance.
        </p>

        <h2 class="text-2xl font-bold text-deep-space-800 mt-8 mb-4">The Challenge of Manual Financial Operations</h2>

        <p class="text-deep-space-600 leading-relaxed mb-6">
          Traditional accounting methods often involve:
        </p>

        <ul class="list-disc pl-6 text-deep-space-600 leading-relaxed mb-6">
          <li>Manual data entry from bank statements</li>
          <li>Time-consuming transaction categorization</li>
          <li>Error-prone reconciliation processes</li>
          <li>Delayed financial reporting</li>
          <li>Compliance risks from manual oversight</li>
        </ul>

        <p class="text-deep-space-600 leading-relaxed mb-6">
          These challenges not only consume valuable time but also increase the risk of financial errors that can impact business decisions and regulatory compliance.
        </p>

        <h2 class="text-2xl font-bold text-deep-space-800 mt-8 mb-4">How FIN Transforms Financial Operations</h2>

        <p class="text-deep-space-600 leading-relaxed mb-6">
          FIN addresses these challenges through intelligent automation that combines accounting expertise with modern software engineering. Here's how:
        </p>

        <h3 class="text-xl font-semibold text-deep-space-800 mt-6 mb-3">1. Automated Transaction Processing</h3>
        <p class="text-deep-space-600 leading-relaxed mb-6">
          FIN automatically imports transactions from bank feeds and applies intelligent classification algorithms to categorize expenses and income according to standard accounting practices.
        </p>

        <h3 class="text-xl font-semibold text-deep-space-800 mt-6 mb-3">2. Real-Time Financial Dashboard</h3>
        <p class="text-deep-space-600 leading-relaxed mb-6">
          Business owners get instant visibility into their financial position with interactive dashboards showing cash flow, profitability, and key performance indicators.
        </p>

        <h3 class="text-xl font-semibold text-deep-space-800 mt-6 mb-3">3. Automated Reporting</h3>
        <p class="text-deep-space-600 leading-relaxed mb-6">
          Generate professional financial statements, tax reports, and management reports automatically, ensuring compliance and reducing manual reporting efforts.
        </p>

        <h2 class="text-2xl font-bold text-deep-space-800 mt-8 mb-4">Built by Finance Experts</h2>

        <p class="text-deep-space-600 leading-relaxed mb-6">
          Unlike generic accounting software, FIN was built by someone with deep experience in both accounting and software development. This unique perspective ensures that the platform not only automates processes but does so in compliance with accounting standards and business best practices.
        </p>

        <h2 class="text-2xl font-bold text-deep-space-800 mt-8 mb-4">Getting Started with FIN</h2>

        <p class="text-deep-space-600 leading-relaxed mb-6">
          Ready to transform your financial operations? Start with a free 14-day trial and experience the difference automated financial management can make for your business.
        </p>
      `,
    },
    'bookkeeper-to-software-engineer-journey': {
      title: 'From Bookkeeper to Software Engineer: A Journey in Fintech',
      excerpt: 'The story of how accounting discipline and software engineering principles combined to create FIN, a platform built by someone who understands both worlds.',
      category: 'Founder Notes',
      author: 'Immaculate Nyoni',
      date: '2025-04-15',
      slug: 'bookkeeper-to-software-engineer-journey',
      featuredImage: '/images/blog/founder-story.jpg',
      readTime: '8 min read',
      content: `
        <p class="text-lg text-deep-space-600 leading-relaxed mb-6">
          The journey from maintaining physical ledger books to building automated financial systems represents more than a career transition—it's a fundamental shift in how we think about financial data management and business operations.
        </p>

        <h2 class="text-2xl font-bold text-deep-space-800 mt-8 mb-4">The Foundation: Accounting Discipline</h2>

        <p class="text-deep-space-600 leading-relaxed mb-6">
          My journey began with the meticulous world of bookkeeping. For over a decade, I managed financial records for businesses, ensuring every transaction was recorded accurately and every report complied with regulatory requirements. This experience taught me something invaluable: the importance of precision, auditability, and control in financial systems.
        </p>

        <p class="text-deep-space-600 leading-relaxed mb-6">
          Working with spreadsheets, ledger books, and accounting software, I witnessed firsthand the pain points that businesses face when managing their finances manually. The repetitive tasks, the risk of human error, and the time spent on compliance reporting—all of these challenges became opportunities for innovation.
        </p>

        <h2 class="text-2xl font-bold text-deep-space-800 mt-8 mb-4">The Transition: Learning to Code</h2>

        <p class="text-deep-space-600 leading-relaxed mb-6">
          The decision to learn software engineering wasn't driven by a desire to change careers, but by a need to solve real problems. I started with the fundamentals—HTML, CSS, and JavaScript—and gradually moved into more complex technologies.
        </p>

        <p class="text-deep-space-600 leading-relaxed mb-6">
          What surprised me most was how the discipline of accounting translated directly to software development. Both fields require:
        </p>

        <ul class="list-disc pl-6 text-deep-space-600 leading-relaxed mb-6">
          <li>Attention to detail and precision</li>
          <li>Systematic approaches to complex problems</li>
          <li>Rigorous testing and validation</li>
          <li>Clear documentation and audit trails</li>
          <li>Compliance with standards and regulations</li>
        </ul>

        <h2 class="text-2xl font-bold text-deep-space-800 mt-8 mb-4">Building FIN: The Synthesis</h2>

        <p class="text-deep-space-600 leading-relaxed mb-6">
          FIN represents the perfect synthesis of accounting expertise and software engineering. Every feature, every workflow, and every user interface decision is informed by real-world accounting experience.
        </p>

        <p class="text-deep-space-600 leading-relaxed mb-6">
          When we designed the transaction processing system, we didn't just think about technology—we thought about double-entry bookkeeping principles. When we built the reporting engine, we considered not just data visualization, but financial statement accuracy and regulatory compliance.
        </p>

        <h2 class="text-2xl font-bold text-deep-space-800 mt-8 mb-4">The Unique FIN Advantage</h2>

        <p class="text-deep-space-600 leading-relaxed mb-6">
          This background gives FIN a unique advantage in the fintech space. We're not just another accounting software—we're a platform built by someone who understands the nuances of financial operations from both the business and technical perspectives.
        </p>

        <p class="text-deep-space-600 leading-relaxed mb-6">
          Every SME deserves financial management tools that are as reliable and trustworthy as the systems used by large corporations. FIN bridges that gap by combining enterprise-grade technology with deep financial expertise.
        </p>
      `,
    },
    'transaction-classification-automated-accounting': {
      title: 'Transaction Classification: The Foundation of Automated Accounting',
      excerpt: 'How FIN uses intelligent algorithms to classify transactions automatically, reducing manual data entry by up to 80% for small businesses.',
      category: 'Accounting Automation',
      author: 'Immaculate Nyoni',
      date: '2025-03-22',
      slug: 'transaction-classification-automated-accounting',
      featuredImage: '/images/blog/transactions.jpg',
      readTime: '6 min read',
      content: `
        <p class="text-lg text-deep-space-600 leading-relaxed mb-6">
          Transaction classification is the cornerstone of automated accounting. It's the process that transforms raw financial data into meaningful business insights, and it's where FIN's accounting expertise shines brightest.
        </p>

        <h2 class="text-2xl font-bold text-deep-space-800 mt-8 mb-4">The Challenge of Manual Classification</h2>

        <p class="text-deep-space-600 leading-relaxed mb-6">
          For most small businesses, transaction classification is a manual, time-consuming process. Bank statements arrive, and someone—often the business owner—must review each transaction and assign it to the appropriate accounting category.
        </p>

        <p class="text-deep-space-600 leading-relaxed mb-6">
          This process is not only tedious but also prone to errors. Inconsistent categorization can lead to inaccurate financial reports, compliance issues, and poor business decisions.
        </p>

        <h2 class="text-2xl font-bold text-deep-space-800 mt-8 mb-4">How FIN Automates Classification</h2>

        <p class="text-deep-space-600 leading-relaxed mb-6">
          FIN uses a multi-layered approach to transaction classification that combines machine learning with accounting expertise:
        </p>

        <h3 class="text-xl font-semibold text-deep-space-800 mt-6 mb-3">Pattern Recognition</h3>
        <p class="text-deep-space-600 leading-relaxed mb-6">
          Our algorithms analyze transaction descriptions, amounts, and frequencies to identify patterns. A coffee shop purchase at the same location every morning? That's likely "Office Supplies" or "Meals & Entertainment."
        </p>

        <h3 class="text-xl font-semibold text-deep-space-800 mt-6 mb-3">Merchant Database</h3>
        <p class="text-deep-space-600 leading-relaxed mb-6">
          We maintain a comprehensive database of merchants and their typical business categories. When a transaction from "Amazon Web Services" appears, the system knows this is likely "Technology" or "Cloud Services."
        </p>

        <h3 class="text-xl font-semibold text-deep-space-800 mt-6 mb-3">Rule-Based Classification</h3>
        <p class="text-deep-space-600 leading-relaxed mb-6">
          For complex scenarios, FIN applies accounting rules. Recurring payments, tax-related transactions, and inter-company transfers are classified according to standard accounting principles.
        </p>

        <h2 class="text-2xl font-bold text-deep-space-800 mt-8 mb-4">The Human Touch</h2>

        <p class="text-deep-space-600 leading-relaxed mb-6">
          While automation handles the majority of transactions, FIN includes human oversight capabilities. Users can review classifications, correct errors, and teach the system to improve over time.
        </p>

        <p class="text-deep-space-600 leading-relaxed mb-6">
          This hybrid approach ensures accuracy while maintaining the flexibility that businesses need for unique or unusual transactions.
        </p>

        <h2 class="text-2xl font-bold text-deep-space-800 mt-8 mb-4">The Impact on Business Operations</h2>

        <p class="text-deep-space-600 leading-relaxed mb-6">
          Automated transaction classification doesn't just save time—it transforms how businesses operate:
        </p>

        <ul class="list-disc pl-6 text-deep-space-600 leading-relaxed mb-6">
          <li><strong>Real-time financial visibility:</strong> Transactions are classified and reflected in reports immediately</li>
          <li><strong>Reduced errors:</strong> Consistent classification eliminates human mistakes</li>
          <li><strong>Compliance assurance:</strong> Proper categorization ensures regulatory compliance</li>
          <li><strong>Scalability:</strong> Businesses can handle more transactions without increasing headcount</li>
        </ul>

        <h2 class="text-2xl font-bold text-deep-space-800 mt-8 mb-4">Getting Started</h2>

        <p class="text-deep-space-600 leading-relaxed mb-6">
          Ready to experience the power of automated transaction classification? Start your free trial today and see how FIN can transform your financial operations.
        </p>
      `,
    },
  };

  return posts[slug] || null;
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPost(slug) : null;

  useEffect(() => {
    if (post) {
      trackBlogView(post.slug, post.category);
    }
  }, [post]);

  if (!post) {
    return (
      <section className="section-padding bg-warm-sand-50">
        <div className="section-container text-center">
          <h1 className="text-4xl font-bold text-deep-space-800 mb-4">Post Not Found</h1>
          <p className="text-deep-space-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Button to="/blog">Back to Blog</Button>
        </div>
      </section>
    );
  }

  const shareUrl = `${window.location.origin}/blog/${post.slug}`;

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-deep-space-800 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-harvest-gold-200/5 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-60 h-60 rounded-full bg-ember-400/5 blur-3xl" />
        </div>
        <div className="section-container relative z-10">
          <div className="max-w-4xl">
            <Link to="/blog" className="inline-flex items-center gap-2 text-warm-sand-400 hover:text-warm-sand-200 transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
            <span className="inline-block text-sm font-semibold tracking-widest uppercase text-harvest-gold-200 mb-4">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-warm-sand-100 leading-tight tracking-tight mb-6">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-warm-sand-400">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString()}
              </div>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="section-padding bg-warm-sand-50">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover rounded-2xl mb-8"
              />

              <div
                className="prose prose-lg max-w-none prose-headings:text-deep-space-800 prose-p:text-deep-space-600 prose-li:text-deep-space-600 prose-strong:text-deep-space-800"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Share Section */}
              <div className="mt-12 pt-8 border-t border-warm-sand-300/30">
                <h3 className="text-lg font-semibold text-deep-space-800 mb-4">Share this article</h3>
                <div className="flex gap-4">
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                    Twitter
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors"
                  >
                    <Facebook className="w-4 h-4" />
                    Facebook
                  </a>
                </div>
              </div>

              {/* CTA Section */}
              <div className="mt-12 rounded-2xl bg-deep-space-800 p-8 text-center">
                <h3 className="text-xl font-bold text-warm-sand-100 mb-4">
                  Ready to experience FIN?
                </h3>
                <p className="text-warm-sand-400 mb-6">
                  Start your free 14-day trial and transform your financial operations.
                </p>
                <Button href="https://sthwalo.com/app" variant="primary">
                  Start Free Trial
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}