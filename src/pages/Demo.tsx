import { Play, ArrowRight } from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';
import Button from '../components/ui/Button';
import SeoMeta from '../components/ui/SeoMeta';
import { trackVideoPlay, trackCTAClick } from '../utils/analytics';

const demoSequence = [
  {
    id: 1,
    title: '1. Create Your FIN Account',
    description: 'See how users sign up, access the platform, and begin their 14-day trial.',
    videoUrl: '/videos/fin-demo-01-signup.mp4',
    thumbnail: '/images/demo-thumbnails/signup.jpg',
  },
  {
    id: 2,
    title: '2. Set Up Your Company',
    description: 'Create a company profile and prepare the workspace for financial operations.',
    videoUrl: '/videos/fin-demo-02-company-setup.mp4',
    thumbnail: '/images/demo-thumbnails/company-setup.jpg',
  },
  {
    id: 3,
    title: '3. View Your Financial Dashboard',
    description: 'Get instant visibility into business performance, activity, and financial indicators.',
    videoUrl: '/videos/fin-demo-03-dashboard.mp4',
    thumbnail: '/images/demo-thumbnails/dashboard.jpg',
  },
  {
    id: 4,
    title: '4. Process Transactions',
    description: 'Move from raw financial activity to organized transaction records and accounting workflows.',
    videoUrl: '/videos/fin-demo-04-transactions.mp4',
    thumbnail: '/images/demo-thumbnails/transactions.jpg',
  },
  {
    id: 5,
    title: '5. Generate Financial Reports',
    description: 'Create trial balances, income statements, balance sheets, and business reports.',
    videoUrl: '/videos/fin-demo-05-reports.mp4',
    thumbnail: '/images/demo-thumbnails/reports.jpg',
  },
  {
    id: 6,
    title: '6. Manage Payroll',
    description: 'Process employee payroll information and generate payroll-related outputs.',
    videoUrl: '/videos/fin-demo-06-payroll.mp4',
    thumbnail: '/images/demo-thumbnails/payroll.jpg',
  },
  {
    id: 7,
    title: '7. Track Compliance And Audit Trails',
    description: 'Review transaction traceability, audit logs, and compliance-aware records.',
    videoUrl: '/videos/fin-demo-07-audit-trail.mp4',
    thumbnail: '/images/demo-thumbnails/audit.jpg',
  },
  {
    id: 8,
    title: '8. Manage Multiple Businesses',
    description: 'Switch between companies and manage financial operations across multiple entities.',
    videoUrl: '/videos/fin-demo-08-multi-company.mp4',
    thumbnail: '/images/demo-thumbnails/multi-company.jpg',
  },
];

export default function Demo() {
  return (
    <>
      <SeoMeta
        title="FIN Product Walkthrough - See How It Works | Sthwalo Holdings"
        description="Explore the full FIN workflow in short 30-second demos, from signup to advanced features. Watch how FIN transforms financial operations for SMEs."
        url="/demo"
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
              Product Walkthrough
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-warm-sand-100 leading-tight tracking-tight mb-6 animate-fade-in-up">
              FIN Product
              <br />
              <span className="text-harvest-gold-200">Walkthrough</span>
            </h1>
            <p className="text-lg text-warm-sand-400 leading-relaxed max-w-2xl animate-fade-in-up animate-delay-200">
              Explore the full FIN workflow in short 30-second demos, from signup to advanced features.
            </p>
          </div>
        </div>
      </section>

      {/* Demo Sequence */}
      <section className="section-padding bg-warm-sand-50">
        <div className="section-container">
          <div className="space-y-16">
            {demoSequence.map((demo, index) => (
              <AnimatedSection
                key={demo.id}
                animation="fade-in-up"
                delay={`animate-delay-${(index % 4) * 100}`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                  {/* Video Section */}
                  <div className={`order-2 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div
                      className="relative rounded-2xl overflow-hidden bg-deep-space-800 p-1 group cursor-pointer"
                      onClick={() => trackVideoPlay(`demo-${demo.id}`, demo.title)}
                    >
                      <div className="rounded-xl overflow-hidden aspect-video bg-deep-space-900 flex items-center justify-center">
                        {/* Placeholder for video - will be replaced with actual video embed */}
                        <div className="text-center text-warm-sand-400">
                          <Play className="w-16 h-16 mx-auto mb-4 text-harvest-gold-200" />
                          <p className="text-sm">Video: {demo.title}</p>
                          <p className="text-xs mt-2 opacity-75">Coming Soon</p>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Play className="w-12 h-12 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className={`order-1 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="max-w-lg">
                      <h2 className="text-2xl md:text-3xl font-bold text-deep-space-800 mb-4">
                        {demo.title}
                      </h2>
                      <p className="text-lg text-deep-space-600 leading-relaxed mb-6">
                        {demo.description}
                      </p>
                      <Button
                        href="https://sthwalo.com/app"
                        variant="secondary"
                        onClick={() => trackCTAClick('trial_signup', `demo-step-${demo.id}`)}
                      >
                        Try FIN Now
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Final CTA */}
          <AnimatedSection className="mt-20">
            <div className="rounded-2xl bg-deep-space-800 p-10 md:p-14 text-center relative overflow-hidden">
              <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-60 h-60 rounded-full bg-harvest-gold-200/5 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-oxblood-600/5 blur-3xl" />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold text-warm-sand-100 mb-4">
                  Ready to Experience FIN?
                </h3>
                <p className="text-warm-sand-400 max-w-lg mx-auto mb-8 leading-relaxed">
                  Start your free 14-day trial and see how FIN transforms your financial operations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    href="https://sthwalo.com/app"
                    variant="primary"
                    size="lg"
                    onClick={() => trackCTAClick('trial_signup', 'demo-final-cta')}
                  >
                    Start Free 14-Day Trial
                  </Button>
                  <Button
                    to="/contact"
                    variant="outline"
                    size="lg"
                    className="border-warm-sand-400/30 text-warm-sand-200 hover:bg-white/5 hover:text-warm-sand-100 hover:border-warm-sand-300/50"
                    onClick={() => trackCTAClick('contact_sales', 'demo-final-cta')}
                  >
                    Contact Sales
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