import { ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackCTAClick } from '../../utils/analytics';

/**
 * The opening of a portfolio, not a product pitch.
 *
 * This page used to sell FIN: the headline was "Close the books without chasing a single
 * document", and the two buttons asked whether you ran a business or reviewed its books. Both
 * questions belong to FIN's users, and FIN now has its own domain to ask them on — aosfin.com,
 * with a full public site at the apex.
 *
 * So the subject is the engineer, and FIN is the evidence. The audience is a recruiter or a
 * prospective client deciding in about thirty seconds whether to keep reading, which is why the
 * proof points below are things they can verify rather than adjectives about craft.
 */

const proofPoints = [
  { value: '200', label: 'Flyway migrations in production, on PostgreSQL 17' },
  { value: '2,000+', label: 'Automated tests, backend and frontend' },
  { value: 'Multi-tenant', label: 'Company-scoped RBAC with row-level security' },
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
            <span className="text-sm font-medium text-warm-sand-300">
              Immaculate Nyoni &middot; Full-stack engineer &middot; South Africa
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-warm-sand-100 leading-[1.08] tracking-tight mb-8 animate-fade-in-up">
            I build systems that hold up to{' '}
            <span className="text-harvest-gold-200">an audit</span>
          </h1>

          <p className="text-lg md:text-xl text-warm-sand-400 leading-relaxed max-w-2xl mx-auto mb-10 animate-fade-in-up animate-delay-200">
            Accounting discipline and full-stack engineering, in the same head. I designed and
            shipped FIN &mdash; a multi-tenant financial platform running double-entry books,
            payroll, VAT and statutory reporting in production &mdash; from the schema to the
            nginx config.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14 animate-fade-in-up animate-delay-300">
            <a
              href="https://aosfin.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCTAClick('fin_live', 'hero')}
              className="group inline-flex items-center justify-center gap-3 px-7 py-4 rounded-lg font-semibold btn-transition active:scale-[0.96] bg-harvest-gold-200 text-deep-space-800 hover:bg-harvest-gold-300 shadow-md hover:shadow-lg"
            >
              View FIN live
              <ExternalLink className="w-4 h-4 flex-shrink-0" />
            </a>
            <Link
              to="/portfolio"
              onClick={() => trackCTAClick('case_study', 'hero')}
              className="group inline-flex items-center justify-center gap-3 px-7 py-4 rounded-lg font-semibold btn-transition active:scale-[0.96] bg-white/5 border border-white/15 text-warm-sand-100 hover:bg-white/10 hover:border-white/25"
            >
              Read the case study
              <ArrowRight className="w-4 h-4 flex-shrink-0 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto animate-fade-in-up animate-delay-500">
            {proofPoints.map((point) => (
              <div key={point.label} className="text-center">
                <dt className="text-2xl font-bold text-harvest-gold-200 mb-1">{point.value}</dt>
                <dd className="text-sm text-warm-sand-400 leading-snug">{point.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
