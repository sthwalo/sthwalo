import { ArrowRight, Sparkles } from 'lucide-react';
import Button from '../ui/Button';

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
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-harvest-gold-200" />
            <span className="text-sm font-medium text-warm-sand-300">
              Finance-First Software Engineering
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-warm-sand-100 leading-[1.08] tracking-tight mb-6 animate-fade-in-up">
            Building{' '}
            <span className="relative">
              <span className="text-harvest-gold-200">foundations</span>
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-harvest-gold-200/30 rounded-full" />
            </span>
            <br />
            with code
          </h1>

          <p className="text-lg md:text-xl text-warm-sand-400 leading-relaxed max-w-2xl mb-10 animate-fade-in-up animate-delay-200">
            Sthwalo Holdings builds reliable platforms and controlled processes
            that enable scalable, compliant growth -- translating business
            requirements into engineering programs with finance-first precision.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animate-delay-300">
            <Button to="/portfolio" variant="primary" size="lg">
              Explore Our Work
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button to="/contact" variant="outline" size="lg" className="border-warm-sand-400/30 text-warm-sand-200 hover:bg-white/5 hover:text-warm-sand-100 hover:border-warm-sand-300/50">
              Start a Conversation
            </Button>
          </div>

          <div className="mt-16 pt-10 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in-up animate-delay-400">
            {[
              { value: '10+', label: 'Years Experience' },
              { value: '7+', label: 'Production Systems' },
              { value: '7,156+', label: 'Transactions Processed' },
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

      </div>
    </section>
  );
}
