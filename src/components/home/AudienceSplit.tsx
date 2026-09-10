import { ArrowRight, Briefcase, ClipboardCheck, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../ui/AnimatedSection';
import SectionHeading from '../ui/SectionHeading';
import { trackCTAClick } from '../../utils/analytics';

const audiences = [
  {
    id: 'for-business',
    icon: Briefcase,
    label: 'If you run the business',
    heading: 'Hand over a complete set, not a shoebox',
    intro:
      'Your records are filed as you go, so month-end and year-end start from something finished.',
    points: [
      'Invoices, bank statements, payslips and stock movements are kept against the transactions they support.',
      'Originals are retained in private, encrypted South African storage you can download from.',
      'When your accountant asks for backup, it is already attached — no inbox archaeology.',
      'Your books stay in a state someone else can pick up and review without a handover meeting.',
    ],
    cta: { label: 'See how the workflow runs', to: '/resources', event: 'audience_business_detail' },
    className: 'bg-white/[0.03] border-white/10',
  },
  {
    id: 'for-reviewers',
    icon: ClipboardCheck,
    label: 'If you review or sign off',
    heading: 'Spend the time on judgement, not on hunting',
    intro:
      'For accountants, bookkeepers and auditors: the verification work is the job. FIN shortens the part of it that is just retrieval.',
    points: [
      'Open a transaction and its source document is already there — no request list, no waiting.',
      'Review and correct proposed classifications instead of capturing them line by line.',
      'Corrections leave an audit-linked trail, so a reversal explains itself later.',
      'Every figure in a report traces back to the journals and records behind it before you sign.',
    ],
    cta: { label: 'Read the reviewer guide', to: '/blog/ledger-backed-reporting-for-accountants', event: 'audience_reviewer_detail' },
    className: 'bg-harvest-gold-200/[0.06] border-harvest-gold-200/20',
  },
];

export default function AudienceSplit() {
  return (
    <section className="section-padding bg-deep-space-800 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-80 h-80 rounded-full bg-harvest-gold-200/3 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-oxblood-600/3 blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        <AnimatedSection>
          <SectionHeading
            label="Who it's for"
            title="The same records, from two sides of the desk"
            description="Owners stop being chased for paperwork. Reviewers stop chasing it. Both get the sign-off sooner."
            light
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {audiences.map((audience, index) => (
            <AnimatedSection
              key={audience.id}
              animation="fade-in-up"
              delay={`animate-delay-${(index + 1) * 100}`}
            >
              <div
                id={audience.id}
                className={`scroll-mt-24 h-full flex flex-col p-8 md:p-10 rounded-2xl border ${audience.className}`}
              >
                <div className="w-12 h-12 rounded-xl bg-harvest-gold-200/15 text-harvest-gold-200 flex items-center justify-center mb-5">
                  <audience.icon className="w-6 h-6" />
                </div>

                <span className="text-xs font-semibold tracking-widest uppercase text-harvest-gold-300 mb-3">
                  {audience.label}
                </span>
                <h3 className="text-2xl font-bold text-warm-sand-100 mb-3 leading-snug">
                  {audience.heading}
                </h3>
                <p className="text-warm-sand-400 leading-relaxed mb-6">{audience.intro}</p>

                <ul className="space-y-3 mb-8">
                  {audience.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-harvest-gold-200 flex-shrink-0 mt-0.5" />
                      <span className="text-warm-sand-300 leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={audience.cta.to}
                  onClick={() => trackCTAClick(audience.cta.event, 'audience_split')}
                  className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-harvest-gold-200 hover:gap-2.5 transition-[gap] duration-200 ease-out"
                >
                  {audience.cta.label}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
