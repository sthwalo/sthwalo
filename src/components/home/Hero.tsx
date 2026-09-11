import { ArrowRight, Sparkles, Briefcase, ClipboardCheck } from 'lucide-react';
import { trackCTAClick } from '../../utils/analytics';

const proofPoints = [
  { value: 'Nothing to chase', label: 'Source documents stay attached to their transaction' },
  { value: 'Reviewed, not retyped', label: 'Confirm and correct classifications instead of capturing them' },
  { value: 'Traceable to the entry', label: 'Every reported figure opens back to the records behind it' },
];

const doors = [
  {
    href: '#for-business',
    icon: Briefcase,
    title: 'I run a business',
    subtitle: 'Hand over a complete set',
    cta: 'audience_business',
    className:
      'bg-harvest-gold-200 text-deep-space-800 hover:bg-harvest-gold-300 shadow-md hover:shadow-lg',
    subtitleClass: 'text-deep-space-800/70',
  },
  {
    href: '#for-reviewers',
    icon: ClipboardCheck,
    title: 'I review the books',
    subtitle: 'Verify faster, sign off sooner',
    cta: 'audience_reviewer',
    className:
      'bg-white/5 border border-white/15 text-warm-sand-100 hover:bg-white/10 hover:border-white/25',
    subtitleClass: 'text-warm-sand-400',
  },
];

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
              For South African businesses and the people who review their books
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-warm-sand-100 leading-[1.08] tracking-tight mb-8 animate-fade-in-up">
            Close the books without{' '}
            <span className="text-harvest-gold-200">chasing a single document</span>
          </h1>

          <p className="text-lg md:text-xl text-warm-sand-400 leading-relaxed max-w-2xl mx-auto mb-10 animate-fade-in-up animate-delay-200">
            FIN keeps every invoice, bank statement, payslip and stock movement filed against the
            transaction it belongs to. So the review before sign-off starts with the evidence
            already in place — not with a list of things to go and find.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14 animate-fade-in-up animate-delay-300">
            {doors.map((door) => (
              <a
                key={door.href}
                href={door.href}
                onClick={() => trackCTAClick(door.cta, 'hero')}
                className={`group inline-flex items-center gap-3 px-7 py-4 rounded-lg font-semibold btn-transition active:scale-[0.96] ${door.className}`}
              >
                <door.icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-left">
                  <span className="block text-base leading-tight">{door.title}</span>
                  <span className={`block text-xs font-normal mt-0.5 ${door.subtitleClass}`}>
                    {door.subtitle}
                  </span>
                </span>
                <ArrowRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </a>
            ))}
          </div>

          <div className="mt-16 pt-10 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto animate-fade-in-up animate-delay-400">
            {proofPoints.map((point) => (
              <div key={point.label}>
                <div className="text-lg md:text-xl font-bold text-harvest-gold-200 mb-1">
                  {point.value}
                </div>
                <div className="text-sm text-warm-sand-500">{point.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
