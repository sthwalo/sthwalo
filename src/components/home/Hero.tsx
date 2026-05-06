import { ArrowRight, Sparkles, Play } from 'lucide-react';
import Button from '../ui/Button';
import { trackCTAClick } from '../../utils/analytics';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-deep-space-800">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-harvest-gold-200/5 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-oxblood-600/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-ember-400/3 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(242,207,99,0.4) 1px, transparent 0)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="section-container relative z-10 pt-28 pb-20">
        <div className="max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Copy */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 animate-fade-in">
                <Sparkles className="w-4 h-4 text-harvest-gold-200" />
                <span className="text-sm font-medium text-warm-sand-300">
                  Financial Operations Platform for SMEs
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-warm-sand-100 leading-[1.08] tracking-tight mb-6 animate-fade-in-up">
                Automate Financial Operations{' '}
                <span className="text-harvest-gold-200">From Transactions To Reporting</span>
              </h1>

              <p className="text-lg md:text-xl text-warm-sand-400 leading-relaxed max-w-2xl mb-10 animate-fade-in-up animate-delay-200">
                FIN helps SMEs, accountants, and growing businesses simplify reconciliation, payroll, financial reporting, and compliance workflows from one secure platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animate-delay-300">
                <Button
                  href="https://sthwalo.com/app"
                  variant="primary"
                  size="lg"
                  onClick={() => trackCTAClick('trial_signup', 'hero')}
                >
                  Start Free 14-Day Trial
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button
                  to="/demo"
                  variant="outline"
                  size="lg"
                  className="border-warm-sand-400/30 text-warm-sand-200 hover:bg-white/5 hover:text-warm-sand-100 hover:border-warm-sand-300/50"
                  onClick={() => trackCTAClick('watch_demo', 'hero')}
                >
                  <Play className="w-4 h-4" />
                  Watch Demo
                </Button>
              </div>

              <div className="mt-16 pt-10 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in-up animate-delay-400">
                {[
                  { value: '7,156+', label: 'Transactions Processed' },
                  { value: '25+', label: 'Business Services' },
                  { value: '24', label: 'REST Controllers' },
                  { value: '2021', label: 'CIPC Registered' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl md:text-3xl font-bold text-harvest-gold-200 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-warm-sand-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Product Visual */}
            <div className="animate-fade-in-up animate-delay-300">
              <div className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 p-1">
                <div className="rounded-xl overflow-hidden">
                  <img
                    src="/fin-dashboard-preview.jpg"
                    alt="FIN Financial Dashboard - Transaction processing and financial reports"
                    className="w-full h-auto object-cover aspect-[4/3]"
                  />
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                  {['Dashboard Analytics', 'Transaction Processing', 'Financial Reports', 'Payroll Automation'].map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-deep-space-800/90 text-warm-sand-200 border border-white/10 backdrop-blur-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-sm text-warm-sand-500 mt-4 text-center">
                Live dashboard showing real-time financial operations and automated reporting
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
