import { ArrowRight, Sparkles, BookOpen } from 'lucide-react';
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
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-harvest-gold-200" />
            <span className="text-sm font-medium text-warm-sand-300">
              Financial Operations Platform for SMEs
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-warm-sand-100 leading-[1.08] tracking-tight mb-10 animate-fade-in-up">
            Automate Financial Operations{' '}
            <span className="text-harvest-gold-200">From Transactions To Reporting</span>
          </h1>

          {/* Welcome visual */}
          <div className="mb-10 animate-fade-in-up animate-delay-200">
            <div className="relative rounded-2xl overflow-hidden bg-deep-space-900/80 border border-white/10">
              <img
                src="/images/grand-tour.gif"
                alt="FIN walkthrough touring every module — overview, setup, workbench, inventory, tax, assets, payroll, budgets, and reports"
                className="w-full h-auto block"
                loading="lazy"
              />
            </div>
          </div>

          <p className="text-lg md:text-xl text-warm-sand-400 leading-relaxed max-w-2xl mx-auto mb-10 animate-fade-in-up animate-delay-300">
            FIN helps SMEs, accountants, and growing businesses simplify reconciliation, payroll, financial reporting, and compliance workflows from one secure platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-delay-300">
            <Button
              href="https://sthwalo.com/fin"
              variant="primary"
              size="lg"
              onClick={() => trackCTAClick('trial_signup', 'hero')}
            >
              Start Free 14-Day Trial
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              to="/resources"
              variant="outline"
              size="lg"
              className="border-warm-sand-400/30 text-warm-sand-200 hover:bg-white/5 hover:text-warm-sand-100 hover:border-warm-sand-300/50"
              onClick={() => trackCTAClick('explore_resources', 'hero')}
            >
              <BookOpen className="w-4 h-4" />
              Explore Guides
            </Button>
          </div>

          <div className="mt-16 pt-10 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto animate-fade-in-up animate-delay-400">
            {[
              { value: 'Reviewable', label: 'Classification and corrections' },
              { value: 'Company-scoped', label: 'Workspace access' },
              { value: 'Ledger-backed', label: 'Financial reports' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-lg md:text-xl font-bold text-harvest-gold-200 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-warm-sand-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
