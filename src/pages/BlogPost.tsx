import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Calendar, User, ArrowLeft, Linkedin, Twitter, Facebook } from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';
import Button from '../components/ui/Button';
import { trackBlogView } from '../utils/analytics';

// Mock blog post data - in a real implementation, this would come from a CMS or markdown files
const getBlogPost = (slug: string) => {
  const posts: Record<string, Record<string, unknown>> = {
    'why-i-built-fin': {
      title: 'Why I Built FIN: The Gap Nobody Was Filling for Small Businesses in South Africa',
      excerpt: 'Most small businesses don\'t start with a bookkeeper. They start with a PDF bank statement and the quiet anxiety of not really knowing whether the business is profitable or just busy.',
      category: 'Founder Notes',
      author: 'Immaculate Nyoni',
      date: '2026-05-07',
      slug: 'why-i-built-fin',
      featuredImage: '/images/demo-thumbnails/1.webp',
      readTime: '6 min read',
      content: `
        <p class="text-lg text-deep-space-600 leading-relaxed mb-6">
          Most small businesses don't start with a bookkeeper.
        </p>

        <p class="text-deep-space-600 leading-relaxed mb-6">
          They start with a dream, a hustle, and a PDF bank statement they downloaded from their bank's app at the end of the month.
        </p>

        <p class="text-deep-space-600 leading-relaxed mb-6">
          That's the reality. Not Xero. Not QuickBooks. Not Sage. A PDF. Maybe a handful of receipts stuffed in a folder — physical or WhatsApp — and the quiet anxiety of not really knowing whether the business is profitable or just busy.
        </p>

        <p class="text-deep-space-600 leading-relaxed mb-6">
          I've seen this up close. Business owners who are brilliant at what they do — hair salons, contractors, spaza shops, small retailers, freelancers — completely in the dark about their own finances. Not because they don't care. But because the tools that exist were not built for them.
        </p>

        <h2 class="text-2xl font-bold text-deep-space-800 mt-8 mb-4">Sage is powerful. QuickBooks is capable. But both assume you already think like an accountant.</h2>

        <p class="text-deep-space-600 leading-relaxed mb-6">
          They assume you know what a chart of accounts is. They assume you understand the difference between a debit and a credit. They assume you have time to sit down, open the software, and capture every transaction — one by one — into the right category, the right journal, the right ledger.
        </p>

        <p class="text-deep-space-600 leading-relaxed mb-6">
          For a business owner who is also the salesperson, the delivery driver, the customer service rep, and the HR department? That's not realistic.
        </p>

        <h2 class="text-2xl font-bold text-deep-space-800 mt-8 mb-4">So what actually happens?</h2>

        <p class="text-deep-space-600 leading-relaxed mb-6">
          The bank statement arrives. It sits in the inbox. The business owner either ignores it — or hands it to a bookkeeper they're paying R3,000–R8,000 a month for a service that still takes 3 to 5 days to produce a report they don't fully understand.
        </p>

        <p class="text-deep-space-600 leading-relaxed mb-6">
          Or worse — they try to do it themselves in Excel. Columns get misaligned. Formulas break. And by the time month three arrives, the spreadsheet is a disaster and the owner has no idea what the numbers mean.
        </p>

        <h2 class="text-2xl font-bold text-deep-space-800 mt-8 mb-4">This is exactly why I built FIN.</h2>

        <p class="text-deep-space-600 leading-relaxed mb-6">
          The insight was simple: most small businesses already have their financial data. It lives in their bank statement. The bank captured every transaction — date, amount, description. The raw data exists.
        </p>

        <p class="text-deep-space-600 leading-relaxed mb-6">
          The problem is processing it.
        </p>

        <p class="text-deep-space-600 leading-relaxed mb-6">
          FIN lets you upload that PDF bank statement directly. The system reads it, extracts every transaction, and then asks you one question per transaction type: <em>"What is this?"</em>
        </p>

        <p class="text-deep-space-600 leading-relaxed mb-6">
          You answer once. You create a rule. And that rule runs forever.
        </p>

        <ul class="list-none pl-0 text-deep-space-600 leading-relaxed mb-6 space-y-2">
          <li>→ <em>"Shoprite"</em> always maps to Cost of Sales — Groceries.</li>
          <li>→ <em>"Vodacom"</em> always maps to Communication Expenses.</li>
          <li>→ <em>"Rental deposit"</em> always maps to Deposit Liability.</li>
        </ul>

        <p class="text-deep-space-600 leading-relaxed mb-6">
          The first time takes a few minutes. The second month? Done in minutes. By month three, FIN knows your business better than most bookkeepers do after six months.
        </p>

        <p class="text-deep-space-600 leading-relaxed mb-6">
          Those rules classify every transaction into the correct account in your chart of accounts. They post to your ledgers. They feed your journals. And at the end of it all — FIN generates your Income Statement, Balance Sheet, and Cash Flow Statement automatically.
        </p>

        <h2 class="text-2xl font-bold text-deep-space-800 mt-8 mb-4">What used to take a bookkeeper five days now takes one.</h2>

        <p class="text-deep-space-600 leading-relaxed mb-6">
          What used to cost a business R5,000 a month now costs a fraction of that.
        </p>

        <p class="text-deep-space-600 leading-relaxed mb-6">
          And the business owner — for the first time — actually understands their own numbers.
        </p>

        <p class="text-deep-space-600 leading-relaxed mb-6">
          That's not a feature. That's a shift in power.
        </p>

        <p class="text-deep-space-600 leading-relaxed mb-6">
          Small businesses deserve financial clarity. Not when they can afford an accountant. Not when they learn to use complex software. <strong>Now. From day one.</strong>
        </p>

        <p class="text-deep-space-600 leading-relaxed mb-6">
          That's what FIN is for.
        </p>
      `,
    },
    'you-already-have-your-financial-data': {
      title: 'You Already Have Your Financial Data — You Just Don\'t Know It',
      excerpt: 'Every business that has a bank account has financial data. The problem has never been the data — it\'s been turning it into something useful.',
      category: 'Accounting Automation',
      author: 'Immaculate Nyoni',
      date: '2026-05-07',
      slug: 'you-already-have-your-financial-data',
      featuredImage: '/images/demo-thumbnails/1.webp',
      readTime: '5 min read',
      content: `
        <p class="text-lg text-deep-space-600 leading-relaxed mb-6">
          Every business that has a bank account has financial data.
        </p>

        <p class="text-deep-space-600 leading-relaxed mb-6">
          It's in that PDF statement you download at the end of every month. Every transaction your business made — every payment received, every expense paid — is sitting right there. Date. Amount. Description.
        </p>

        <p class="text-deep-space-600 leading-relaxed mb-6">
          The problem has never been the data. The problem has been turning that data into something useful.
        </p>

        <h2 class="text-2xl font-bold text-deep-space-800 mt-8 mb-4">The Old Way: One Entry at a Time</h2>

        <p class="text-deep-space-600 leading-relaxed mb-6">
          Traditional accounting software like Sage and QuickBooks require you to sit down and capture every transaction manually. Select the date. Choose the account. Enter the amount. Assign a category. Repeat — for every single line item on your statement.
        </p>

        <p class="text-deep-space-600 leading-relaxed mb-6">
          For a business doing 200 transactions a month, that's hours of work. For a business doing 500? That's a full day. Every month. Without fail.
        </p>

        <p class="text-deep-space-600 leading-relaxed mb-6">
          And for most small business owners, that time simply doesn't exist. So the statements pile up. The books fall behind. And by the time the accountant or bookkeeper is called in, there are months of backlog to untangle — at significant cost.
        </p>

        <h2 class="text-2xl font-bold text-deep-space-800 mt-8 mb-4">FIN Takes a Different Approach</h2>

        <p class="text-deep-space-600 leading-relaxed mb-6">
          Upload your bank statement. FIN reads it and presents your transactions in a clean, simple interface. The first time you see a transaction from a supplier, you create a rule:
        </p>

        <blockquote class="border-l-4 border-harvest-gold-200 pl-6 italic text-deep-space-600 my-6">
          "Any transaction containing 'ABSA BANK FEES' → classify as Bank Charges"
        </blockquote>

        <p class="text-deep-space-600 leading-relaxed mb-6">
          Done. That rule runs on every future statement you upload. You never categorise that transaction again.
        </p>

        <p class="text-deep-space-600 leading-relaxed mb-6">
          Over time your rules build up. They get smarter. And your monthly processing time drops from days to hours — then from hours to minutes.
        </p>

        <h2 class="text-2xl font-bold text-deep-space-800 mt-8 mb-4">What FIN Does Behind the Scenes</h2>

        <p class="text-deep-space-600 leading-relaxed mb-6">
          Behind the scenes, FIN is doing what an accountant does manually:
        </p>

        <ul class="list-disc pl-6 text-deep-space-600 leading-relaxed mb-6 space-y-2">
          <li>Posting to the correct accounts in your chart of accounts</li>
          <li>Recording entries in your journals</li>
          <li>Updating your ledgers</li>
          <li>Preparing your trial balance</li>
        </ul>

        <p class="text-deep-space-600 leading-relaxed mb-6">
          So when you open your reports, the numbers are right. The Income Statement reflects reality. The Cash Flow shows you exactly where your money went.
        </p>

        <h2 class="text-2xl font-bold text-deep-space-800 mt-8 mb-4">No Accounting Degree Required</h2>

        <p class="text-deep-space-600 leading-relaxed mb-6">
          No accounting degree required. No bookkeeper needed for the basics.
        </p>

        <p class="text-deep-space-600 leading-relaxed mb-6">
          What took 5 days now takes one. What cost thousands in bookkeeper fees is now in your control — from your phone, on your schedule.
        </p>

        <p class="text-deep-space-600 leading-relaxed mb-6">
          <strong>The gap between "I have a bank statement" and "I understand my business finances" just got a lot smaller.</strong>
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